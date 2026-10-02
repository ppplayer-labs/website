'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { SpotlightButton } from '@/components/ui/SpotlightButton'
import { SpotlightText } from '@/components/ui/SpotlightText'
import { SpotlightLogo } from '@/components/ui/SpotlightLogo'
import { PLATFORMS, getPlatformOptions } from '@/lib/constants'
import { DownloadOptionsModal } from '@/components/ui/DownloadOptionsModal'
import { Monitor, Smartphone, Apple, Laptop } from 'lucide-react'

// Helper to get platform icon
const getPlatformIcon = (id: string, className?: string) => {
  switch (id) {
    case 'macos':
    case 'ios':
      return <Apple className={className} strokeWidth={1.5} />;
    case 'windows':
      return <Monitor className={className} strokeWidth={1.5} />;
    case 'android':
      return <Smartphone className={className} strokeWidth={1.5} />;
    case 'linux':
      return <Laptop className={className} strokeWidth={1.5} />;
    default:
      return null;
  }
}

export default function DownloadCTA() {
  const t = useTranslations('downloadCTA');
  const tPlatform = useTranslations('platformCards');
  
  const [activePlatformId, setActivePlatformId] = useState<string>('macos');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const activePlatform = PLATFORMS.find(p => p.id === activePlatformId) || PLATFORMS[0];

  return (
    <>
      <section id="download" className="relative py-32 md:py-48 bg-[var(--color-bg-base)] text-white overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-red-600/5 rounded-[100%] blur-[120px]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 w-full">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-16 cursor-default">
              <SpotlightText className="text-white">{t("title")}</SpotlightText>
            </h2>

            {/* Platform Selector */}
            <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mb-12">
              {PLATFORMS.map((platform) => {
                const isActive = activePlatformId === platform.id;
                return (
                  <button
                    key={platform.id}
                    onClick={() => setActivePlatformId(platform.id)}
                    className={`relative flex items-center gap-2 px-5 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 outline-none
                      ${isActive 
                        ? 'text-white bg-white/10 border border-white/20' 
                        : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                      }
                    `}
                  >
                    {getPlatformIcon(platform.id, 'w-5 h-5')}
                    {platform.name}
                    {!platform.isAvailable && !platform.secondaryHref && (
                       <span className="ml-1 text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-white/10 text-white/50 hidden md:inline-block">
                         {t('comingSoon')}
                       </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* System Requirements & Download Button Container */}
            <div className="relative min-h-[300px] max-w-2xl mx-auto bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePlatform.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="flex flex-col items-center text-center"
                >
                  
                  <div className="mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                      {t('reqTitle', { platform: activePlatform.name })}
                    </h3>
                    <p className="text-white/50">
                      {tPlatform(`${activePlatform.id}.desc`)}
                    </p>
                  </div>

                  <div className="w-full text-left grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 mb-10 pt-8 border-t border-white/5">
                    
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-1">
                        {t('os')}
                      </span>
                      <span className="text-white/90 font-medium text-sm">
                        {t(`reqs.${activePlatform.id}.os`)}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-1">
                        {t('arch')}
                      </span>
                      <span className="text-white/90 font-medium text-sm">
                        {t(`reqs.${activePlatform.id}.arch`)}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-1">
                        {t('memory')}
                      </span>
                      <span className="text-white/90 font-medium text-sm">
                        {t(`reqs.${activePlatform.id}.mem`)}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-1">
                        {t('internet')}
                      </span>
                      <span className="text-white/90 font-medium text-sm">
                        {t('reqStreaming')}
                      </span>
                    </div>

                  </div>

                  <SpotlightButton 
                    href="#" 
                    variant="light"
                    onClick={handleDownloadClick}
                  >
                    {t('downloadFor', { platform: activePlatform.name })}
                  </SpotlightButton>
                  
                </motion.div>
              </AnimatePresence>
            </div>

          </motion.div>

          {/* Subtle Logo representation at the end */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 0.15, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mt-24 md:mt-32 pointer-events-none flex justify-center"
          >
            <SpotlightLogo 
              src="/logo.png" 
              alt=""
              className="w-48 h-48 md:w-64 md:h-64 pointer-events-auto"
              imageClassName="rounded-[3rem] filter grayscale mix-blend-screen"
            />
          </motion.div>

        </div>
      </section>

      <DownloadOptionsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={t('modalTitle', { platform: activePlatform.name })}
        description={t('modalDesc', { platform: activePlatform.name })}
        cancelText={t('cancel')}
        options={getPlatformOptions(activePlatform.id, {
          primaryDownload: t('primaryDownload'),
          directDownload: t('directDownload'),
          comingSoon: t('comingSoon'),
        })}
      />
    </>
  )
}
