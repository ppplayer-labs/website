# PPPlayer website

The PPPlayer product website uses Next.js 16, React, next-intl and Tailwind CSS. It includes localized product pages, downloads, release history and Markdown guides.

## Local development

```bash
npm ci
npm run dev
```

Open http://localhost:3000. Copy `.env.example` to `.env.local` only when optional integrations such as advertising or cookie-banner configuration are needed.

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Read `AGENTS.md` and the installed Next.js guides in `node_modules/next/dist/docs/` before changing framework behavior.

## Product content

- `components/sections/PlaybackUpdatesSection.tsx`: upcoming playback features, shared by the homepage and changelog.
- `messages/*.json` → `playbackUpdates`: playback feature copy in all 38 supported languages, with shared interface terminology in `common`. The section inherits the page’s text direction.
- `content/blog/play-on-local-files-ios/{en,pt-BR}.md`: usage guide for local files, Play On, queue and iPhone system controls. Existing article routes fall back to English when a translation is missing.
- `messages/*.json`: localized UI, released changelog entries and system requirements. iOS requires 14.0 or later.
- `scripts/localization/`: explicit playback/requirements translations and a repeatable catalog updater. Shared terms come from the app catalogs; there is no automatic English fallback.
- `lib/constants.ts`: platform availability and download links.
- `public/llms-full.txt`: machine-readable product information; keep it consistent with the visible site.

Mark working-tree features **upcoming** until a public release includes them. Do not invent a release number or claim that existing downloads include development changes. Keep iOS availability distinct from physical-device development testing. Cast/DLNA implementation and fake-receiver tests do not establish physical receiver compatibility.

New guides need frontmatter (`title`, `excerpt`, `date`, `author`, `category`, `readTime`, `isDraft`). The blog and sitemap discover them automatically. Use the reader's locale in localized internal links.

## Deployment

`npm run build` creates the standalone output configured in `next.config.ts`. The Dockerfile packages it together with public assets and Markdown content. A local content update does not deploy or publish the website; follow the project's release/deployment process separately.

## IndexNow

The automatic workflow lives in this repository at `.github/workflows/indexnow.yml`, because Coolify deploys `ppplayer-labs/website` directly. It runs for relevant pushes to `main` and can be started manually from the Actions tab. The former parent-repository workflow is removed to avoid misplaced or duplicate notifications.

`npm run build` first generates `public/indexnow-revision.txt` from website source, translations, content and public assets. The generated file is ignored by Git and included by the Dockerfile's existing public-folder copy. The workflow checks the corresponding live marker every 15 seconds, for up to ten minutes, before reading the production key and sitemap. An older deployment, failed deployment or missing marker fails the job without submitting URLs. No Coolify secret or fixed deployment delay is required. Coolify must build through `npm run build`, as the checked-in Dockerfile already does.

```bash
npm run test:indexnow
npm run indexnow -- --dry-run
npm run indexnow -- --wait-for-deployment
```

The dry run only reads the live verification file and sitemap; it sends no notification and does not certify deployment readiness. The submission command verifies the deployed source, validates and deduplicates page URLs, and sends batches of at most 10,000 URLs. Failures return a nonzero exit code. HTTP 202 means key validation is pending; neither 200 nor 202 guarantees indexing. Rejected requests are not automatically retried, including HTTP 429. The provider may return HTTP 403 with `SiteVerificationNotCompleted` before its first site verification finishes, even when our public-key check passes. This remains a failing job with clear guidance to rerun after provider verification; it is not treated as an accepted notification.

Commit and push the website changes to activate the workflow and deploy its first marker. Commit the parent workflow removal in the parent repository too. Until the first marker-enabled build is live, the new workflow deliberately waits rather than submitting an older deployment. Do not submit automatically from pull-request previews or forks.

Current scope: every page in the live sitemap is submitted, including localized routes. URLs removed from the sitemap are not automatically retained or notified as deletions; explicit deleted-URL tracking would be a separate addition. A sitemap index is rejected rather than mistakenly submitted as page URLs.

Protocol reference: [IndexNow documentation](https://www.indexnow.org/documentation).
