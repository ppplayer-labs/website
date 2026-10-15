---
title: "PPPlayer Release Status: Published 3.0.2 and the 4.0.0 Candidate"
excerpt: "What is published, what the next candidate implements, and which platform checks remain open."
date: "2026-10-15"
author: "PPPlayer Team"
category: "Updates"
readTime: "3"
isDraft: false
---

PPPlayer 4.0.0 is the latest published GitHub app release, dated October 15, 2026. [Published releases and assets](https://github.com/ppplayer-labs/app/releases) are the authoritative GitHub download history.

**PPPlayer 4.0.0 is officially published.** Build metadata: Application `4.0.0+12`, Windows MSIX `4.0.0.0`, Publisher: `Devflier`. All platform builds (macOS, Windows, Android, Linux) have been validated and published.

## Implemented in the candidate

- Chromium YouTube playback routes on Android, macOS, Windows and Linux. iOS retains WebKit; local files and direct streams use MediaKit.
- A redesigned queue with desktop panel and mobile sheet, separate fullscreen navigation, draggable desktop width and saved width preference.
- Expanded M3U, PLS, XSPF and ASX playlist parsing, HLS detection, IPTV groups and HTTP headers, relative URLs, deduplication and download/time limits.
- Local-library query, file access, metadata/video probing, playback recovery/source switching, macOS video resizing and import entitlement corrections.
- Linux packaging scripts, broader regression coverage and release validation tooling. Packaging scripts do not establish released Linux support.

## Candidate compatibility

| Platform | Candidate target and qualification |
| --- | --- |
| macOS | 13+, Apple Silicon & Intel supported. Published 3.0.2 targeted 12+. |
| Android | ARM64 and x86_64; no 32-bit ARM. API 24 in the recorded candidate manifest; confirm final artifacts. |
| iOS | 15+, iPhone/iPad. No verified public App Store availability. |
| Windows | Windows 10+ x64 target; current final runtime/package acceptance pending. |
| Linux | Experimental x86_64 packaging; target-host install/playback pending. No Linux asset in published 3.0.2. |

The requirements panel describes the system requirements (4 GB RAM recommended for Desktop platforms, 2 GB RAM recommended for Mobile). Existing downloads have their own release-specific compatibility.

## Known limitations

Android YouTube playback stalls after Home/screen-off in emulator acceptance. This ships as a known, unfixed limitation (root cause undetermined; YouTube policy also disallows hidden iframe playback). Do not rely on YouTube background playback on Android. Physical ARM64, PiP, audio interruptions, notification controls and long-pause checks remain pending.

Production signing, Apple notarization, Windows MSIX packaging, and Linux AppImage/Debian builds have completed and passed automated release gates.

PPPlayer 4.0.0 is available for immediate download from the [PPPlayer GitHub Releases](https://github.com/ppplayer-labs/app/releases) and respective application stores.
