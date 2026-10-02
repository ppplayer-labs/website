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
- `lib/playback-updates.ts`: English and Brazilian Portuguese copy for that section. Other locales use English with a matching `lang` attribute until translated; this does not alter existing locale messages.
- `content/blog/play-on-local-files-ios/{en,pt-BR}.md`: usage guide for local files, Play On, queue and iPhone system controls. Existing article routes fall back to English when a translation is missing.
- `messages/*.json`: existing localized UI and released changelog entries.
- `lib/constants.ts`: platform availability and download links.
- `public/llms-full.txt`: machine-readable product information; keep it consistent with the visible site.

Mark working-tree features **upcoming** until a public release includes them. Do not invent a release number or claim that existing downloads include development changes. Keep iOS availability distinct from physical-device development testing. Cast/DLNA implementation and fake-receiver tests do not establish physical receiver compatibility.

New guides need frontmatter (`title`, `excerpt`, `date`, `author`, `category`, `readTime`, `isDraft`). The blog and sitemap discover them automatically. Use the reader's locale in localized internal links.

## Deployment

`npm run build` creates the standalone output configured in `next.config.ts`. The Dockerfile packages it together with public assets and Markdown content. A local content update does not deploy or publish the website; follow the project's release/deployment process separately.
