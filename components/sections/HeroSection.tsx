'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import {useTranslations} from 'next-intl'
import { PROJECT_LINKS, PLATFORMS, getPlatformOptions } from '@/lib/constants'
import { SpotlightText } from '@/components/ui/SpotlightText'
import { SpotlightButton } from '@/components/ui/SpotlightButton'
import { MacOSWindowFrame } from '@/components/ui/MacOSWindowFrame'
import { DownloadOptionsModal } from '@/components/ui/DownloadOptionsModal'

export default function HeroSection() {
  const common = useTranslations('common');
  const t = useTranslations('hero');
  const tCTA = useTranslations('downloadCTA');
  const [activeModalPlatform, setActiveModalPlatform] = useState<string | null>(null);
  const [detectedOS, setDetectedOS] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ua = navigator.userAgent.toLowerCase();
      if (/android/.test(ua)) setDetectedOS('android');
      else if (/iphone|ipad|ipod/.test(ua)) setDetectedOS('ios');
      else if (/mac/.test(ua)) setDetectedOS('macos');
      else if (/win/.test(ua)) setDetectedOS('windows');
      else if (/linux/.test(ua)) setDetectedOS('linux');
      else setDetectedOS('macos'); // fallback to macOS
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>, platformId: string) => {
    e.preventDefault();
    setActiveModalPlatform(platformId);
  };

  const activePlatformData = activeModalPlatform ? PLATFORMS.find(p => p.id === activeModalPlatform) : null;

  return (
    <>
      <section className="relative pt-32 md:pt-40 pb-16 overflow-hidden flex flex-col items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full text-center z-10">
          
          <div className="max-w-4xl mx-auto">
            <a href="#open-source" className="inline-block mb-6 text-sm font-semibold text-red-500 hover:text-red-400">{t('badge')}</a>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6 leading-[0.9] cursor-default">
              <SpotlightText className="text-white">{t("title1")}</SpotlightText><br />
              <span className="text-slate-400">
                <SpotlightText>{t("title2")}</SpotlightText>
              </span>
            </h1>
            <p className="text-slate-300 text-xl md:text-2xl font-medium mb-10 max-w-2xl mx-auto">
              {t("desc")}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
              <SpotlightButton href="#" variant={detectedOS === 'ios' ? 'light' : 'dark'} onClick={(e) => handleDownloadClick(e, 'ios')}>
                {t("getIos")}
              </SpotlightButton>
              <SpotlightButton href="#" variant={detectedOS === 'android' ? 'light' : 'dark'} onClick={(e) => handleDownloadClick(e, 'android')}>
                {t("getAndroid")}
              </SpotlightButton>
              <SpotlightButton href="#" variant={detectedOS === 'macos' ? 'light' : 'dark'} onClick={(e) => handleDownloadClick(e, 'macos')}>
                {t("getMac")}
              </SpotlightButton>
              <SpotlightButton href="#" variant={detectedOS === 'windows' ? 'light' : 'dark'} onClick={(e) => handleDownloadClick(e, 'windows')}>
                {t("getWindows")}
              </SpotlightButton>
              <SpotlightButton href="#" variant={detectedOS === 'linux' ? 'light' : 'dark'} onClick={(e) => handleDownloadClick(e, 'linux')}>
                {t("getLinux")}
              </SpotlightButton>
            </div>
            <a href={PROJECT_LINKS.source} className="inline-block mt-6 text-sm text-slate-400 underline underline-offset-4 hover:text-white">{t('source')}</a>
          </div>
        </div>

        {/* Enormous desktop interface, partially extending beyond the viewport */}
        <div className="w-full flex justify-center px-4 md:px-0" style={{ perspective: '2000px' }}>
          <div
            style={{ transformOrigin: "top center" }}
            className="w-full max-w-5xl mt-16 md:mt-24 translate-y-12 md:translate-y-24"
          >
            <MacOSWindowFrame title="PPPlayer">
              <Image
                src="/images/screenshot-home.png"
                alt={common("home")}
                width={1920}
                height={1080}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                priority={true}
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </MacOSWindowFrame>
          </div>
        </div>
      </section>

      <DownloadOptionsModal 
        isOpen={!!activeModalPlatform} 
        onClose={() => setActiveModalPlatform(null)}
        title={tCTA('modalTitle', { platform: activePlatformData?.name || '' })}
        description={tCTA('modalDesc', { platform: activePlatformData?.name || '' })}
        cancelText={tCTA('cancel')}
        options={getPlatformOptions(activeModalPlatform, {
          primaryDownload: tCTA('primaryDownload'),
          directDownload: tCTA('directDownload'),
          comingSoon: tCTA('comingSoon'),
        })}
      />
    </>
  )
}
