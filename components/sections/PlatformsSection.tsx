import Image from 'next/image';
import React from 'react'
import {useTranslations} from 'next-intl'
import { FadeIn } from '@/components/ui/FadeIn'
import { SpotlightText } from '@/components/ui/SpotlightText'
import { MacOSWindowFrame } from '@/components/ui/MacOSWindowFrame'
import { AndroidFrame, IPhoneFrame } from '@/components/ui/DeviceFrames'

export default function PlatformsSection() {
  const t = useTranslations('platforms');
  return (
    <section className="py-24 md:py-32 bg-[var(--color-bg-base)] text-white overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <FadeIn
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 cursor-default">
            <SpotlightText>{t("title")}</SpotlightText>
          </h2>
          <p className="text-slate-400 text-lg">
            {t("subtitle")}
          </p>
        </FadeIn>

        {/* Device Composition */}
        <div className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[600px] flex items-center justify-center">
          
          {/* Desktop Behind */}
          <FadeIn
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 w-[80%] md:w-[70%] flex items-center justify-center -translate-y-8"
          >
            <MacOSWindowFrame title="PPPlayer" className="w-full">
              <Image
                src="/images/screenshot-artist.png"
                alt="PPPlayer · macOS"
                width={1920}
                height={1080}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </MacOSWindowFrame>
          </FadeIn>

          {/* Android Left */}
          <FadeIn
            initial={{ opacity: 0, x: -40, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-[8%] md:left-[18%] bottom-0 w-[30%] md:w-[22%] z-10 flex items-center justify-center"
          >
            <AndroidFrame>
              <Image
                src="/images/mobile-screenshot-android.png"
                alt="PPPlayer Android"
                fill
                sizes="(max-width: 768px) 30vw, 22vw"
                className="object-cover object-top"
              />
            </AndroidFrame>
          </FadeIn>

          {/* iOS Right */}
          <FadeIn
            initial={{ opacity: 0, x: 40, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-[8%] md:right-[18%] bottom-0 w-[30%] md:w-[22%] z-10 translate-y-8"
          >
            <IPhoneFrame>
              <Image
                src="/images/mobile-screenshot-queue.png"
                alt="PPPlayer iOS"
                fill
                sizes="(max-width: 768px) 30vw, 22vw"
                className="object-cover object-top"
              />
            </IPhoneFrame>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
