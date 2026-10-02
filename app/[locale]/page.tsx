import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/sections/HeroSection'
import DiscoverSection from '@/components/sections/DiscoverSection'
import GoDeeperSection from '@/components/sections/GoDeeperSection'
import PressPlaySection from '@/components/sections/PressPlaySection'
import ArtistRadioSection from '@/components/sections/ArtistRadioSection'
import NoAccountSection from '@/components/sections/NoAccountSection'
import PlatformsSection from '@/components/sections/PlatformsSection'
import FeatureGallerySection from '@/components/sections/FeatureGallerySection'
import PlaybackUpdatesSection from '@/components/sections/PlaybackUpdatesSection'
import DownloadCTA from '@/components/sections/DownloadCTA'
import OpenSourceSection from '@/components/sections/OpenSourceSection'

import {setRequestLocale} from 'next-intl/server';
import { routing } from '@/i18n/routing';
import {getTranslations} from 'next-intl/server';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'metadata'});
  return {
    title: t('homeTitle'),
    description: t('homeDesc'),
    openGraph: {
      title: t('homeTitle'),
      description: t('homeDesc'),
    },
    twitter: {
      title: t('homeTitle'),
      description: t('homeDesc'),
    },
    alternates: {
      canonical: locale === 'en' ? '/' : `/${locale}`,
            languages: routing.locales.reduce((acc, l) => {
        acc[l] = l === 'en' ? '/' : `/${l}`;
        return acc;
      }, {} as Record<string, string>)
    }
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Navbar />
      <main className="bg-[var(--color-bg-base)]">
        <HeroSection />
        <DiscoverSection />
        <GoDeeperSection />
        <PressPlaySection />
        <ArtistRadioSection />
        <FeatureGallerySection />
        <PlaybackUpdatesSection locale={locale} />
        <NoAccountSection />
        <PlatformsSection />
        <OpenSourceSection />
        <DownloadCTA />
      </main>
      <Footer />
    </>
  )
}
