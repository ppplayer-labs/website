import Image from 'next/image';
import React from 'react'
import {useTranslations} from 'next-intl'
import { FadeIn } from '@/components/ui/FadeIn'
import { SpotlightText } from '@/components/ui/SpotlightText'
import { MacOSWindowFrame } from '@/components/ui/MacOSWindowFrame'

export default function FeatureGallerySection() {
  const t = useTranslations('featureGallery');
  return (
    <section className="py-24 md:py-32 bg-[var(--color-bg-base)] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight cursor-default">
            <SpotlightText>{t("title")}</SpotlightText>
          </h2>
          <p className="mt-6 text-xl text-slate-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Item 1 */}
          <FadeIn
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <MacOSWindowFrame title={t("searchTitle")}>
              <Image src="/images/screenshot-search-albums.png" alt={t("searchTitle")} width={1024} height={576} className="w-full h-auto" sizes="(max-width: 768px) 50vw, (max-width: 1024px) 100vw, 50vw" />
            </MacOSWindowFrame>
            <h3 className="text-3xl font-bold mt-8 tracking-tight">{t("searchTitle")}</h3>
            <p className="mt-3 text-lg text-slate-400">{t("searchDesc")}</p>
          </FadeIn>

          {/* Item 2 */}
          <FadeIn
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <MacOSWindowFrame title={t("queueTitle")}>
              <Image src="/images/screenshot-queue.png" alt={t("queueTitle")} width={1024} height={576} className="w-full h-auto" sizes="(max-width: 768px) 50vw, (max-width: 1024px) 100vw, 50vw" />
            </MacOSWindowFrame>
            <h3 className="text-3xl font-bold mt-8 tracking-tight">{t("queueTitle")}</h3>
            <p className="mt-3 text-lg text-slate-400">{t("queueDesc")}</p>
          </FadeIn>

          {/* Item 3 */}
          <FadeIn
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <MacOSWindowFrame title={t("favTitle")}>
              <Image src="/images/screenshot-favorites.png" alt={t("favTitle")} width={1024} height={576} className="w-full h-auto" sizes="(max-width: 768px) 50vw, (max-width: 1024px) 100vw, 50vw" />
            </MacOSWindowFrame>
            <h3 className="text-3xl font-bold mt-8 tracking-tight">{t("favTitle")}</h3>
            <p className="mt-3 text-lg text-slate-400">{t("favDesc")}</p>
          </FadeIn>

          {/* Item 4 */}
          <FadeIn
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <MacOSWindowFrame title={t("contextTitle")}>
              <Image src="/images/screenshot-context-menu.png" alt={t("contextTitle")} width={1024} height={576} className="w-full h-auto" sizes="(max-width: 768px) 50vw, (max-width: 1024px) 100vw, 50vw" />
            </MacOSWindowFrame>
            <h3 className="text-3xl font-bold mt-8 tracking-tight">{t("contextTitle")}</h3>
            <p className="mt-3 text-lg text-slate-400">{t("contextDesc")}</p>
          </FadeIn>

          {/* Item 5 */}
          <FadeIn
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            <MacOSWindowFrame title={t("videoTitle")}>
              <Image src="/images/screenshot-video.png" alt={t("videoTitle")} width={1024} height={576} className="w-full h-auto" sizes="(max-width: 768px) 50vw, (max-width: 1024px) 100vw, 50vw" />
            </MacOSWindowFrame>
            <h3 className="text-3xl font-bold mt-8 tracking-tight">{t("videoTitle")}</h3>
            <p className="mt-3 text-lg text-slate-400">{t("videoDesc")}</p>
          </FadeIn>

          {/* Item 6 */}
          <FadeIn
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          >
            <MacOSWindowFrame title={t("streamsTitle")}>
              <Image src="/images/screenshot-streams.png" alt={t("streamsTitle")} width={1024} height={576} className="w-full h-auto" sizes="(max-width: 768px) 50vw, (max-width: 1024px) 100vw, 50vw" />
            </MacOSWindowFrame>
            <h3 className="text-3xl font-bold mt-8 tracking-tight">{t("streamsTitle")}</h3>
            <p className="mt-3 text-lg text-slate-400">{t("streamsDesc")}</p>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
