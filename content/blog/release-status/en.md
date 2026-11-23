---
title: "PPPlayer 4.0.2 Release Status"
excerpt: "PPPlayer 4.0.2 is now available on GitHub Releases with desktop mini-video recovery, smoother Home scrolling, Android SAF/lifecycle fixes, and an ads-free build."
date: "2026-11-23"
author: "PPPlayer Team"
category: "Updates"
readTime: "3"
isDraft: false
---

PPPlayer 4.0.2 is the latest published GitHub app release, dated November 23, 2026. [GitHub Release v4.0.2](https://github.com/ppplayer-labs/app/releases/tag/v4.0.2) is the authoritative public download source.

**PPPlayer 4.0.2 is officially published on GitHub Releases.** Build metadata: Application `4.0.2+14`, Windows MSIX `4.0.2.0` (Microsoft Store submission package), Publisher: `Devflier`. This release ships **temporarily ads-free** (Google Mobile Ads SDK, UMP consent, and Advertising ID permission removed).

## What's new in 4.0.2

- **Desktop mini-video surface recovery & settings persistence:** Fixed intermittent black mini-video rendering after rapid Hide/Show toggling by eliminating Chromium/CEF resize storms (`160×90` constant surface, off-screen parking on desktop, pointer and accessibility exclusion when hidden), and serialized Hive settings updates.
- **Smoother Home scrolling & Retina artwork caching:** Eliminated repeated section shimmers and card entry animations, preserved Home vertical and horizontal scroll positions across navigation, introduced shared artwork decode-width bucketing and a bounded lazy `80 MB / 300 entries` desktop image cache, improved offline stale-while-revalidate cached-content resilience, and hardened Spotify artwork URL parsing and missing-artwork fallbacks.
- **Chromium `0.5.7` & desktop lifecycle:** Upgraded to hosted `flutter_chromium_webview ^0.5.7`, added lazy desktop startup restoration, inactive rendering throttling (`setRenderingActive`), persistent Chromium sessions, and clean ordered desktop shutdown (`AppShutdownCoordinator`).
- **Android fixes:** Fixed Activity-detach disposal crashes during active Chromium playback, restored Storage Access Framework (SAF) folder import for music and videos, aligned `minSdk` to API 24, and hardened R8 and Picture-in-Picture behavior.
- **Linux packaging:** Bundled desktop, AppStream, and icon metadata inside portable `x86_64` tarballs, shipped a narrowly scoped `.deb` AppArmor `userns` profile, and hardened release checksums.

## Platform compatibility & distribution

| Platform | Target & availability |
| --- | --- |
| macOS | macOS 13.0+, **Apple Silicon (`arm64`) only** (signed, notarized, and stapled DMG/ZIP on GitHub Releases). Intel/universal builds are not qualified. |
| Windows | Windows 10+ `x64`, distributed via the **Microsoft Store** (unsigned Partner Center MSIX is not offered as a direct GitHub download). |
| Linux | `x86_64` AppImage, `.deb`, and portable `.tar.gz` available on GitHub Releases. Snap Store and Flathub updates are tracked independently (Flathub submission pending review). |
| Android | Android 7.0 (API 24)+, `ARM64` and `x86_64` (signed ads-free APK available on GitHub Releases; Google Play update handled separately). |
| iOS | iOS 15.0+, iPhone/iPad (currently in development; no public App Store release yet). |

## Known limitations

Background YouTube playback on Android remains unsupported in this version. Download PPPlayer 4.0.2 from [GitHub Release v4.0.2](https://github.com/ppplayer-labs/app/releases/tag/v4.0.2) or the Microsoft Store for Windows.
