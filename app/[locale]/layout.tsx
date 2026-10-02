import type { Metadata } from 'next'
import { Inter, Noto_Sans_Arabic } from 'next/font/google'
import Script from 'next/script'
import '../globals.css'
import CookieBanner from '@/components/CookieBanner'
import { Preloader } from '@/components/ui/Preloader'
import TrustedTypesScript from '@/components/TrustedTypesScript'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
  weight: ['400', '500', '600', '700', '900'],
})

const RTL_LOCALES = new Set(['ar', 'fa', 'ur'])

export const metadata: Metadata = {
  title: {
    default: 'PPPlayer: Free & Open-Source Music Player',
    template: '%s | PPPlayer',
  },
  description:
    'PPPlayer is a free, open-source music player. Discover music, explore the source code, and contribute. No account or subscription required.',
  keywords: [
    'free music app',
    'open source music player',
    'music app no account',
    'music app for iPhone',
    'music app for Android',
    'music player Windows',
    'artist discovery app',
    'free music player',
    'ppplayer',
  ],
  metadataBase: new URL('https://ppplayer.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://ppplayer.com',
    siteName: 'PPPlayer',
    title: 'PPPlayer: Free & Open-Source Music Player',
    description: 'Discover PPPlayer, a free, open-source music player. Explore the code, contribute, or download an available release.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PPPlayer: Free & Open-Source Music Player',
    description: 'Free and open source. No account. No subscription. Just play.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/logo.png?v=2',
    shortcut: '/logo.png?v=2',
    apple: '/logo.png?v=2',
  },
  // other: {
  //   'google-adsense-account': 'ca-pub-3432071939645868',
  // },
}

import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import { headers } from 'next/headers';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const isRTL = RTL_LOCALES.has(locale);
  
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const headersList = await headers();
  const nonce = headersList.get('x-nonce') || undefined;
  
  const analyticsProvider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || 'gtm';
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-5SV2DX2';

  return (
    <html
      lang={locale}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${notoSansArabic.variable}`}
    >
      <head>
        {process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true' && process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <script
          id="schema-org"
          type="application/ld+json"
          nonce={nonce}
          suppressHydrationWarning
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PPPlayer",
            "operatingSystem": "Android, iOS, macOS, Windows, Linux",
            "applicationCategory": "MultimediaApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "Free and open-source music player. Discover music, explore the source code, and contribute. No account or subscription required."
          })}
        </script>
      </head>
      <body className={isRTL ? notoSansArabic.className : inter.className}>
        {analyticsProvider === 'gtm' && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <TrustedTypesScript nonce={nonce} />
        {analyticsProvider === 'gtm' && (
          <>
            <Script id="google-analytics-consent" nonce={nonce} strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                
                gtag('consent', 'default', {
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied',
                  'analytics_storage': 'denied'
                });
              `}
            </Script>
            <Script id="google-tag-manager" nonce={nonce} strategy="afterInteractive">
              {`
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `}
            </Script>
          </>
        )}
        <NextIntlClientProvider messages={messages}>
          <Preloader />
          {children}
          {process.env.NEXT_PUBLIC_USE_CUSTOM_COOKIE_BANNER === 'true' && <CookieBanner />}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
