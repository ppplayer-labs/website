'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Monitor, Smartphone, Apple, Laptop } from 'lucide-react'
import { DOWNLOAD_LINKS, getPlatformOptions } from '@/lib/constants'
import { DownloadOptionsModal } from '@/components/ui/DownloadOptionsModal'
import { SpotlightCard } from '@/components/ui/SpotlightCard'

export default function PlatformCardsSection() {
  const t = useTranslations('platformCards');
  const tCTA = useTranslations('downloadCTA');
  const [activeModalPlatform, setActiveModalPlatform] = useState<string | null>(null);

  const handleDownloadClick = (platformId: string) => {
    setActiveModalPlatform(platformId);
  };

  const platforms = [
    {
      id: 'macos',
      icon: <Apple className="w-10 h-10 text-white" strokeWidth={1.5} />,
      name: t('macos.name'),
      label: t('macos.label'),
      description: t('macos.desc'),
      badge: t('macos.badge'),
      href: DOWNLOAD_LINKS.macos,
      color: 'rgba(255, 255, 255, 0.1)',
      gradient: 'from-white/10 to-transparent',
      isAvailable: true,
    },
    {
      id: 'windows',
      icon: <Monitor className="w-10 h-10 text-white" strokeWidth={1.5} />,
      name: t('windows.name'),
      label: t('windows.label'),
      description: t('windows.desc'),
      badge: t('windows.badge'),
      href: DOWNLOAD_LINKS.windows,
      color: 'rgba(6, 182, 212, 0.1)',
      gradient: 'from-cyan-500/10 to-transparent',
      isAvailable: true,
      secondaryHref: '#',
      secondaryBadge: tCTA('directDownload'),
      secondaryIsAvailable: false,
    },
    {
      id: 'ios',
      icon: <Smartphone className="w-10 h-10 text-white" strokeWidth={1.5} />,
      name: t('ios.name'),
      label: t('ios.label'),
      description: t('ios.desc'),
      badge: t('ios.badge'),
      href: DOWNLOAD_LINKS.ios,
      color: 'rgba(255, 255, 255, 0.05)',
      gradient: 'from-slate-500/10 to-transparent',
      isAvailable: false,
    },
    {
      id: 'android',
      icon: <Smartphone className="w-10 h-10 text-white" strokeWidth={1.5} />,
      name: t('android.name'),
      label: t('android.label'),
      description: t('android.desc'),
      badge: t('android.badge'),
      href: DOWNLOAD_LINKS.android,
      color: 'rgba(34, 197, 94, 0.1)',
      gradient: 'from-green-500/10 to-transparent',
      isAvailable: false,
      secondaryHref: DOWNLOAD_LINKS.androidApk,
      secondaryBadge: 'APK',
    },
    {
      id: 'linux',
      icon: <Laptop className="w-10 h-10 text-white" strokeWidth={1.5} />,
      name: t('linux.name'),
      label: t('linux.label'),
      description: t('linux.desc'),
      badge: t('linux.badge'),
      href: "#",
      color: 'rgba(234, 179, 8, 0.1)',
      gradient: 'from-yellow-500/10 to-transparent',
      isAvailable: false,
    },
  ];

  return (
    <>
      <section className="py-16 md:py-24 bg-[var(--color-bg-base)] text-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {platforms.map((platform, i) => (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group outline-none h-full"
              >
                <SpotlightCard 
                  spotlightColor={platform.color}
                  className={`h-full relative flex flex-col p-8 transition-transform duration-500 ease-out group-hover:scale-[1.02] ${(platform.isAvailable || platform.secondaryHref) ? '' : 'opacity-70 group-hover:opacity-100'}`}
                >
                  {/* Primary Link Overlay - catches clicks on the whole card */}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDownloadClick(platform.id);
                    }}
                    className="absolute inset-0 z-0 cursor-pointer"
                    aria-label={tCTA("downloadFor", {platform: platform.name})}
                  />
                  
                  <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${platform.gradient} opacity-50 pointer-events-none`} />
                  
                  <div className="relative z-10 mb-6 pointer-events-none">
                    <div className="p-3 bg-white/5 rounded-2xl w-fit border border-white/10 backdrop-blur-md shadow-2xl">
                      {platform.icon}
                    </div>
                  </div>
                  
                  <div className="relative z-10 flex-grow pointer-events-none">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold tracking-tight text-white">{platform.name}</h3>
                      {!platform.isAvailable && !platform.secondaryHref && (
                        <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                          {tCTA('comingSoon')}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium tracking-wide text-white/50 block mb-4">
                      {platform.label}
                    </span>
                    <p className="text-base text-white/70 leading-relaxed font-light">
                      {platform.description}
                    </p>
                  </div>
                  
                  <div className="relative z-20 mt-8 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/80 group-hover:bg-white/10 group-hover:text-white transition-all duration-300 pointer-events-none">
                      {platform.badge}
                      {(platform.badge?.includes('Store') || platform.badge?.includes('Play')) ? (
                        <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      )}
                    </span>
                    
                    {platform.secondaryHref && platform.secondaryBadge && (
                      <span
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-sm font-medium transition-all duration-300 pointer-events-none shadow-sm ${
                          platform.secondaryIsAvailable === false
                            ? 'bg-white/5 text-white/50'
                            : 'bg-white/5 text-white/80 group-hover:bg-white/10 group-hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          {platform.secondaryBadge}
                          {platform.secondaryIsAvailable === false && (
                            <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-white/10 text-white/70 whitespace-nowrap">
                              {tCTA('comingSoon')}
                            </span>
                          )}
                        </span>
                        <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </span>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DownloadOptionsModal 
        isOpen={!!activeModalPlatform} 
        onClose={() => setActiveModalPlatform(null)}
        title={tCTA('modalTitle', { platform: platforms.find(p => p.id === activeModalPlatform)?.name || '' })}
        description={tCTA('modalDesc', { platform: platforms.find(p => p.id === activeModalPlatform)?.name || '' })}
        cancelText={tCTA('cancel')}
        options={getPlatformOptions(activeModalPlatform, {
          primaryDownload: tCTA('primaryDownload'),
          directDownload: tCTA('directDownload'),
          comingSoon: tCTA('comingSoon'),
        })}
      />
    </>
  );
}
