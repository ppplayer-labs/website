import Image from 'next/image';
import React from 'react'
import {useTranslations} from 'next-intl'
import { FadeIn } from '@/components/ui/FadeIn'
import { SpotlightText } from '@/components/ui/SpotlightText'
import { MacOSWindowFrame } from '@/components/ui/MacOSWindowFrame'

export default function ArtistRadioSection() {
  const common = useTranslations('common');
  const t = useTranslations('artistRadio');
  return (
    <section className="py-32 md:py-48 bg-[#fcfcfc] text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          
          <FadeIn
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 md:mb-24"
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight cursor-default">
              <SpotlightText>{t("title")}</SpotlightText>
            </h2>
          </FadeIn>
          
          <FadeIn
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl flex items-center justify-center relative"
          >
            <MacOSWindowFrame title="PPPlayer">
              <Image
                src="/images/screenshot-search-artists.png"
                alt={common("radio")}
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
