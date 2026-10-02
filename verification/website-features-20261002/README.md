# Website and documentation update — October 2, 2026

The homepage and changelog share an upcoming playback section covering durable local imports, Play On, active AirPlay routes, dedicated queue controls and iPhone system play/pause. English and Brazilian Portuguese have editorial copy and a usage guide; other locales use English fallback with explicit language/direction on the new section. Existing release numbers and download availability are unchanged.

App documentation now includes current playback guidance, Cast/DLNA/AirPlay platform boundaries, Apple bookmark acquisition, security-scope/HTTP read lifetime and physical versus simulated validation. The historical discovery document is labeled as a snapshot. Machine-readable website product information reflects the same scope and unreleased status.

Browser verification exposed the existing preloader's dependency on the window load event, which can remain pending on desktop. It now dismisses after hydration plus its short delay and clears its timer on unmount. The browser regression checks dismissal before inspecting the updated section.

## Checks

- `npm run lint`: passed; existing outdated Browserslist data warning.
- `npx tsc --noEmit`: passed.
- `npm run build`: passed; existing middleware-to-proxy deprecation warning. The build fetched the existing Google Fonts dependencies with network approval.
- Production standalone browser checks: 18 homepage/changelog combinations at 320, 390 and 1280 px, across English, Portuguese, French fallback and Arabic fallback.
- English, Portuguese and French-fallback guides render without horizontal overflow at 390 px.
- All 38 locale changelogs return successful responses and include the new section without missing-message output.
- No local browser runtime errors or failed Next.js assets in the final check. External advertising/analytics requests are blocked in the test browser to keep rendering checks independent of third-party services.
- Relative app documentation links and Git whitespace checks pass.

Logs are saved alongside this file. Screenshots show the homepage section in English/Portuguese on mobile and desktop. The screenshot capture scrolls to the new section in the normal viewport; it does not modify product UI.

## Reproduce

Run from `website/` after building and packaging the standalone output with `public` and `.next/static`, as the Dockerfile does:

```bash
PORT=3110 HOSTNAME=localhost node .next/standalone/server.js
node verification/website-features-20261002/website-smoke.mjs
```

Override `PP_WEBSITE_PREVIEW_URL` for a different local preview address. `npm run dev` is also usable. The unsupported `next start` preview showed a redirect loop; final production checks use the correctly packaged standalone server.

No website deployment or app release was performed. Physical Chromecast and DLNA validation remain pending; physical iPhone AirPlay and system-pause results are linked from the app documentation.
