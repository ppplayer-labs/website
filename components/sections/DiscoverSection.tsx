import Image from 'next/image';
import React from 'react'
import {useTranslations} from 'next-intl'
import { FadeIn } from '@/components/ui/FadeIn'
import { SpotlightText } from '@/components/ui/SpotlightText'
import { MacOSWindowFrame } from '@/components/ui/MacOSWindowFrame'

export default function DiscoverSection() {
  const common = useTranslations('common');
  const t = useTranslations('discover');
  return (
    <section id="features" className="py-32 md:py-48 bg-white text-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Asymmetric editorial composition */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-center">
          
          <FadeIn
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 md:col-start-1"
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.9] cursor-default">
              <SpotlightText>{t.rich("title", { br: () => <br /> })}</SpotlightText>
            </h2>
          </FadeIn>
          
          <FadeIn
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 w-full flex items-center justify-center relative -translate-y-8 md:translate-y-16"
          >
            <MacOSWindowFrame title="PPPlayer">
              <Image
                src="/images/screenshot-discover.png"
                alt={common("home")}
                width={1024}
                height={576}
                className="w-full h-auto"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 100vw, 50vw"
              />
            </MacOSWindowFrame>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
