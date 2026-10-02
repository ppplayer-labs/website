import Image from 'next/image';
import React from 'react'
import {useTranslations} from 'next-intl'
import { FadeIn } from '@/components/ui/FadeIn'
import { SpotlightText } from '@/components/ui/SpotlightText'
import { MacOSWindowFrame } from '@/components/ui/MacOSWindowFrame'

export default function PressPlaySection() {
  const common = useTranslations('common');
  const t = useTranslations('pressPlay');
  return (
    <section className="py-24 md:py-32 bg-[var(--color-bg-base)] text-white overflow-hidden">
      <div className="flex flex-col items-center">
        
        <FadeIn
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24 px-4"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight cursor-default">
            <SpotlightText>{t("title")}</SpotlightText>
          </h2>
        </FadeIn>

        {/* Cinematic Player UI in a large window */}
        <div className="w-full max-w-7xl px-4 md:px-8 mx-auto">
          <FadeIn
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex items-center justify-center relative"
          >
            <MacOSWindowFrame title="PPPlayer">
              <Image
                src="/images/screenshot-video.png"
                alt={common("player")}
                width={1024}
                height={576}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </MacOSWindowFrame>
          </FadeIn>
        </div>
        
      </div>
    </section>
  )
}
