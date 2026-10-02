---
title: "Coming Next: Local Music, Play On, and Clearer Playback Controls"
excerpt: "A guide to the upcoming local-file improvements, iPhone AirPlay selection, dedicated queue button, and system playback controls."
date: "2026-10-02"
author: "PPPlayer Team"
category: "Guides"
readTime: "4"
isDraft: false
---

The next PPPlayer update improves how you play your own files, choose a listening device, and manage the queue. These changes are currently in development. They are not a new public release, and the iOS app is not yet publicly available.

## Your imported music stays available

In the iOS development build, imported music is copied into the app’s local library. Close and reopen the app, then play the song from **Local Music** without relying on a temporary import file.

If an older import points to a temporary file that has already disappeared, import the original file again. The update cannot recover a deleted source file. Files held in the app are removed when the app and its data are deleted, so keep your original copies.

Local songs also show their own artwork or the audio fallback instead of a thumbnail left over from an earlier video.

## Choose a device with Play On

Start a song and open **Play On** from the player. In the iOS development build, choose **AirPlay**, then select an available receiver in Apple’s routing picker. The selected receiver’s name appears in Play On, so it is clear where the audio is going.

Local music has been tested from a physical iPhone to a MacBook over AirPlay. If the route is selected but silent, check the volume on both devices and make sure the receiver is available for AirPlay.

To move audio back to the iPhone, tap **This device** and select the iPhone in Apple’s AirPlay picker. The indicator reflects the active route; selecting it opens the system picker rather than directly disconnecting an AirPlay receiver.

### AirPlay, Cast, and DLNA have different requirements

- **AirPlay:** uses Apple’s system routing UI on iPhone. The new in-app picker is for iOS; macOS audio routing continues through system controls.
- **Google Cast:** implemented for Android and iOS. Local-file acquisition and handoff have automated coverage with a simulated receiver; physical Chromecast testing is still pending. YouTube playback cannot be handed off through this media-URL path.
- **DLNA/UPnP:** requires a receiver on a reachable local network and a format that it can play. On iOS, discovery additionally requires Apple multicast approval and an enabled build configuration. Physical DLNA validation is still pending.

For Cast and DLNA, the receiver reads a temporary HTTP media URL from the app. Keep the app and receiver on a reachable network. PPPlayer does not transcode the file, and an offline or inaccessible receiver cannot read it. AirPlay uses Apple’s audio route instead of this HTTP server.

## Find the queue without hunting for an icon

The video player now has a dedicated **Queue** button beside the main playback controls. Open it to inspect and manage what plays next. Opening the queue keeps the video player mounted.

On narrow screens, play/pause and track navigation stay prominent. Secondary actions such as shuffle, repeat, autoplay, subtitles, audio selection, and video fit are grouped in an options menu when available. The layout also adapts to landscape and larger text settings.

## Pause from the iPhone’s system controls

In the updated iOS build, the lock screen and Control Center send play and pause commands into the same playback intent used by the app. A deliberate system pause cancels automatic recovery rather than letting the song restart.

This has been checked on a physical iPhone: the system pause reached the player, playback stayed paused, and an explicit system play command resumed it. Background pause recovery remains available for interruptions caused by moving the app into the background.

## Availability

Use the [download page](/download) for currently available builds and the [changelog](/changelog) for release history. The features described here are marked as upcoming until a release includes them. No App Store or TestFlight availability is implied by this guide.
