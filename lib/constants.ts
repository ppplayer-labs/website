// Site configuration
export const SITE_URL = 'https://ppplayer.com'
export const SITE_NAME = 'PPPlayer'
export const SITE_TAGLINE = 'A free, open-source music player. No account. Just play.'

export const PROJECT_LINKS = {
  organization: 'https://github.com/ppplayer-labs',
  source: 'https://github.com/ppplayer-labs/app',
  contribute: 'https://github.com/ppplayer-labs/.github/blob/main/CONTRIBUTING.md',
  issues: 'https://github.com/ppplayer-labs/app/issues',
  license: 'https://github.com/ppplayer-labs/ppplayer/blob/main/LICENSE',
}

// Download links: update when store listings are live
export const DOWNLOAD_LINKS = {
  ios: 'https://apps.apple.com/app/ppplayer',
  android: 'https://play.google.com/store/apps/details?id=com.ppplayer.app&pcampaignid=web_share',
  windows: 'https://apps.microsoft.com/store/detail/9NKNDF67BG4X?cid=DevShareMCLPCS',
  macos: 'https://github.com/ppplayer-labs/app/releases/latest/download/PPPlayer-macOS.dmg',
  androidApk: 'https://github.com/ppplayer-labs/app/releases/latest/download/PPPlayer-Android.apk',
}

export type PlatformConfig = {
  id: string;
  name: string;
  label: string;
  description: string;
  badge: string;
  href: string;
  color: string;
  isAvailable: boolean;
  requirements: {
    os: string;
    architecture: string;
    memory: string;
  };
  secondaryHref?: string;
  secondaryBadge?: string;
  secondaryIsAvailable?: boolean;
};

// Platform data
export const PLATFORMS: PlatformConfig[] = [
  {
    id: 'macos',
    name: 'macOS',
    label: 'Mac',
    description: 'Direct download for macOS. Apple Silicon & Intel supported.',
    badge: 'Direct Download',
    href: DOWNLOAD_LINKS.macos,
    color: 'from-gray-400 to-gray-200',
    isAvailable: true,
    requirements: {
      os: 'macOS 10.15 Catalina or newer',
      architecture: 'Apple Silicon & Intel (Universal)',
      memory: '4 GB RAM (Recommended)',
    }
  },
  {
    id: 'windows',
    name: 'Windows',
    label: 'Windows 10+',
    description: 'Available on the Microsoft Store for Windows 10 and later.',
    badge: 'Microsoft Store',
    href: DOWNLOAD_LINKS.windows,
    color: 'from-blue-400 to-cyan-300',
    isAvailable: true,
    requirements: {
      os: 'Windows 10 or later (64-bit)',
      architecture: 'x64',
      memory: '4 GB RAM (Recommended)',
    },
    secondaryHref: '#',
    secondaryBadge: 'Direct Download',
    secondaryIsAvailable: false,
  },
  {
    id: 'linux',
    name: 'Linux',
    label: 'Linux',
    description: 'Available for modern Linux distributions.',
    badge: 'Direct Download',
    href: '#',
    color: 'from-yellow-400 to-amber-300',
    isAvailable: false,
    requirements: {
      os: 'Ubuntu 20.04 or newer (Experimental)',
      architecture: 'x86_64',
      memory: '4 GB RAM (Recommended)',
    }
  },
  {
    id: 'ios',
    name: 'iOS',
    label: 'iPhone & iPad',
    description: 'PPPlayer for iOS is currently in development.',
    badge: 'Coming Soon',
    href: DOWNLOAD_LINKS.ios,
    color: 'from-slate-400 to-slate-200',
    isAvailable: false,
    requirements: {
      os: 'iOS 13.0 or newer',
      architecture: 'ARM64',
      memory: '2 GB RAM (Recommended)',
    }
  },
  {
    id: 'android',
    name: 'Android',
    label: 'Android',
    description: 'Available on Google Play for Android phones and tablets.',
    badge: 'Google Play',
    href: DOWNLOAD_LINKS.android,
    color: 'from-green-400 to-emerald-300',
    isAvailable: true,
    requirements: {
      os: 'Android 7.0 (API 24) or newer',
      architecture: 'ARM64 / ARM / x86_64',
      memory: '2 GB RAM (Recommended)',
    },
    secondaryHref: DOWNLOAD_LINKS.androidApk,
    secondaryBadge: 'APK',
  },
];

// Feature cards
export const FEATURES = [
  {
    id: 'discovery',
    icon: 'Compass',
    title: 'Artist Discovery',
    description: 'Find new artists you\'ve never heard of. Browse profiles and go deep into full discographies.',
  },
  {
    id: 'related',
    icon: 'GitBranch',
    title: 'Related Artists',
    description: 'Explore artists connected to the ones you already love. Always know who to listen to next.',
  },
  {
    id: 'radio',
    icon: 'Radio',
    title: 'Artist Radio',
    description: 'Start an infinite radio from any artist. Sit back and let PPPlayer take over.',
  },
  {
    id: 'playlists',
    icon: 'ListMusic',
    title: 'Artist Playlists',
    description: 'Browse curated playlists built around your favorite artists. Handpicked, not algorithmic.',
  },
  {
    id: 'genres',
    icon: 'LayoutGrid',
    title: 'Genre Exploration',
    description: 'Browse music by genre and discover what\'s trending globally right now.',
  },
  {
    id: 'player',
    icon: 'Music2',
    title: 'Beautiful Player',
    description: 'A clean, immersive full-screen player with rich artwork, track info, and smooth controls.',
  },
]


export const getPlatformOptions = (
  platformId: string | null,
  t?: { primaryDownload: string; directDownload: string; comingSoon: string }
) => {
  if (!platformId) return [];
  const p = PLATFORMS.find((p) => p.id === platformId);
  if (!p) return [];

  const opts = [
    {
      id: `${p.id}-primary`,
      name: p.badge || t?.primaryDownload || 'Download',
      badge: p.isAvailable ? undefined : (t?.comingSoon || 'Coming Soon'),
      isAvailable: p.isAvailable,
      href: p.href,
      isExternal: p.badge?.includes('Store') || p.badge?.includes('Play'),
    }
  ];

  if (p.secondaryHref && p.secondaryBadge) {
    opts.push({
      id: `${p.id}-secondary`,
      name: t?.directDownload || 'Direct Download',
      badge: p.secondaryIsAvailable === false ? (t?.comingSoon || 'Coming Soon') : p.secondaryBadge,
      isAvailable: p.secondaryIsAvailable !== false,
      href: p.secondaryHref,
      isExternal: false,
    });
  }

  return opts;
};
