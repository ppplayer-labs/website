import Image from 'next/image';
import React from 'react'
import {useTranslations} from 'next-intl'
import { FadeIn } from '@/components/ui/FadeIn'
import { SpotlightText } from '@/components/ui/SpotlightText'
import { MacOSWindowFrame } from '@/components/ui/MacOSWindowFrame'

export default function GoDeeperSection() {
  const common = useTranslations('common');
  const t = useTranslations('goDeeper');
  return (
    <section className="py-24 md:py-32 bg-[#fcfcfc] text-black border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        
        {/* Oversized typography behind the UI */}
        <FadeIn
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 select-none"
        >
          <h2 className="text-[12rem] md:text-[20rem] font-black tracking-tighter whitespace-nowrap">
            {t("bgText")}
          </h2>
        </FadeIn>

        <div className="relative z-10 flex flex-col items-center">
          <FadeIn
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 text-center"
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight cursor-default">
              <SpotlightText>{t("title")}</SpotlightText>
            </h2>
          </FadeIn>

          <FadeIn
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="w-full max-w-5xl flex items-center justify-center relative"
          >
            <MacOSWindowFrame title="PPPlayer">
              <Image
                src="/images/screenshot-library-artists.png"
                alt={common("artist")}
                width={1024}
                height={576}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 100vw, 50vw"
              />
            </MacOSWindowFrame>
          </FadeIn>
        </div>

      </div>
    </section>
  )
}
