import {Link} from '@/i18n/routing'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PlaybackUpdatesSection from '@/components/sections/PlaybackUpdatesSection'

import {setRequestLocale, getTranslations} from 'next-intl/server';
import { routing } from '@/i18n/routing';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'changelog'});
  return {
    title: `${t('title')} | PPPlayer`,
    description: t('subtitle'),
    openGraph: {
      title: `${t('title')} | PPPlayer`,
      description: t('subtitle')
    },
    twitter: {
      title: `${t('title')} | PPPlayer`,
      description: t('subtitle')
    },
    alternates: {
      canonical: locale === 'en' ? '/changelog' : `/${locale}/changelog`,
            languages: routing.locales.reduce((acc, l) => {
        acc[l] = l === 'en' ? '/changelog' : `/${l}/changelog`;
        return acc;
      }, {} as Record<string, string>)
    }
  };
}

export default async function ChangelogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('changelog');
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
          <div className="mb-20">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">{t('title')}</h1>
            <p className="text-slate-400 text-lg">{t('subtitle')}</p>
          </div>

          <PlaybackUpdatesSection locale={locale} compact />

          <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-24">



            {/* Version 2.0.1 */}
            <div className="relative pl-8 md:pl-16 mb-24">
              <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-white/20" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight opacity-70">{t('v2_0_1.version')}</h2>
                <span className="text-slate-500 font-medium">{t('v2_0_1.date')}</span>
              </div>
              
              <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-2xl">
                {t('v2_0_1.desc')}
              </p>

              <div className="space-y-10">
                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v2_0_1.added')}</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-emerald-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v2_0_1.languagesTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v2_0_1.languagesDesc')}</span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-emerald-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v2_0_1.quickPlayTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v2_0_1.quickPlayDesc')}</span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-emerald-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v2_0_1.socialsTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v2_0_1.socialsDesc')}</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v2_0_1.changed')}</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-blue-400 mt-0.5">◈</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v2_0_1.uiTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v2_0_1.uiDesc')}</span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-blue-400 mt-0.5">◈</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v2_0_1.cleanupTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v2_0_1.cleanupDesc')}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Version 2.0.0 */}
            <div className="relative pl-8 md:pl-16 mb-24">
              <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-white/20" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight opacity-70">{t('v2_0_0.version')}</h2>
                <span className="text-slate-500 font-medium">{t('v2_0_0.date')}</span>
              </div>
              
              <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-2xl">
                {t('v2_0_0.desc')}
              </p>

              <div className="space-y-10">
                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v2_0_0.added')}</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-emerald-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v2_0_0.videoTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v2_0_0.videoDesc')}</span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-emerald-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v2_0_0.streamTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v2_0_0.streamDesc')}</span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-emerald-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v2_0_0.subtitleTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v2_0_0.subtitleDesc')}</span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-emerald-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v2_0_0.speedTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v2_0_0.speedDesc')}</span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-emerald-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v2_0_0.exportTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v2_0_0.exportDesc')}</span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-emerald-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v2_0_0.languagesTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v2_0_0.languagesDesc')}</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v2_0_0.changed')}</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-blue-400 mt-0.5">◈</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v2_0_0.stabilityTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v2_0_0.stabilityDesc')}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Version 1.3.5 */}
            <div className="relative pl-8 md:pl-16 mb-24">
              <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-white/20" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight opacity-70">{t('v1_3_5.version')}</h2>
                <span className="text-slate-500 font-medium">{t('v1_3_5.date')}</span>
              </div>
              
              <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-2xl">
                {t('v1_3_5.desc')}
              </p>

              <div className="space-y-10">
                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v1_3_5.added')}</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-emerald-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_3_5.libraryTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_3_5.libraryDesc')}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Version 1.3.4 */}
            <div className="relative pl-8 md:pl-16 mb-24">
              <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-white/20" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight opacity-70">{t('v1_3_4.version')}</h2>
                <span className="text-slate-500 font-medium">{t('v1_3_4.date')}</span>
              </div>
              
              <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-2xl">
                {t('v1_3_4.desc')}
              </p>

              <div className="space-y-10">
                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v1_3_4.added')}</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-emerald-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_3_4.pipTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_3_4.pipDesc')}</span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-emerald-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_3_4.splashTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_3_4.splashDesc')}</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v1_3_4.fixed')}</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-blue-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_3_4.uiTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_3_4.uiDesc')}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Version 1.3.3 */}
            <div className="relative pl-8 md:pl-16 mb-24">
              <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-white/20" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight opacity-70">{t('v1_3_3.version')}</h2>
                <span className="text-slate-500 font-medium">{t('v1_3_3.date')}</span>
              </div>
              
              <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-2xl">
                {t('v1_3_3.desc')}
              </p>

              <div className="space-y-10">
                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v1_3_3.added')}</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-emerald-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_3_3.ciTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_3_3.ciDesc')}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Version 1.3.2 */}
            <div className="relative pl-8 md:pl-16 mb-24">
              <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-white/20" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight opacity-70">{t('v1_3_2.version')}</h2>
                <span className="text-slate-500 font-medium">{t('v1_3_2.date')}</span>
              </div>
              
              <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-2xl">
                {t('v1_3_2.desc')}
              </p>

              <div className="space-y-10">
                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v1_3_2.added')}</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-emerald-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_3_2.syncTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_3_2.syncDesc')}</span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-emerald-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_3_2.libraryTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_3_2.libraryDesc')}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Version 1.3.1 */}
            <div className="relative pl-8 md:pl-16 mb-24">
              <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-white/20" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight opacity-70">{t('v1_3_1.version')}</h2>
                <span className="text-slate-500 font-medium">{t('v1_3_1.date')}</span>
              </div>
              
              <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-2xl">
                {t('v1_3_1.desc')}
              </p>

              <div className="space-y-10">
                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v1_3_1.added')}</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-emerald-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_3_1.syncTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_3_1.syncDesc')}</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v1_3_1.fixed')}</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-blue-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_3_1.uiTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_3_1.uiDesc')}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            
            {/* Version 1.3.0 */}
            <div className="relative pl-8 md:pl-16 mb-24">
              <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-white/20" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight opacity-70">{t('v1_3_0.version')}</h2>
                <span className="text-slate-500 font-medium">{t('v1_3_0.date')}</span>
              </div>
              
              <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-2xl">
                {t('v1_3_0.desc')}
              </p>

              <div className="space-y-10">
                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v1_3_0.added')}</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-blue-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_3_0.localizationTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_3_0.localizationDesc')}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Version 1.1.2 */}
            <div className="relative pl-8 md:pl-16">
              <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight">{t('v1_1_2.version')}</h2>
                <span className="text-slate-500 font-medium">{t('v1_1_2.date')}</span>
              </div>
              
              <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-2xl">
                {t('v1_1_2.desc')}
              </p>

              <div className="space-y-10">
                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v1_1_2.added')}</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-blue-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_1_2.localizationTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_1_2.localizationDesc')}</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v1_1_2.fixed')}</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-blue-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_1_2.layoutTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_1_2.layoutDesc')}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Version 1.1.1 */}
            <div className="relative pl-8 md:pl-16">
              <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-white/20" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight opacity-70">{t('v1_1_1.version')}</h2>
                <span className="text-slate-500 font-medium">{t('v1_1_1.date')}</span>
              </div>
              
              <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-2xl">
                {t('v1_1_1.desc')}
              </p>

              <div className="space-y-10">
                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v1_1_1.fixed')}</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-blue-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_1_1.snapTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_1_1.snapDesc')}</span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-blue-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_1_1.durationTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_1_1.durationDesc')}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Version 1.1.0 */}
            <div className="relative pl-8 md:pl-16">
              <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-white/20" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight opacity-70">{t('v1_1_0.version')}</h2>
                <span className="text-slate-500 font-medium">{t('v1_1_0.date')}</span>
              </div>
              
              <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-2xl">
                {t('v1_1_0.desc')}
              </p>

              <div className="space-y-10">
                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v1_1_0.new')}</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-emerald-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_1_0.langTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_1_0.langDesc')}</span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-emerald-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_1_0.pickerTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_1_0.pickerDesc')}</span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-emerald-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_1_0.osTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_1_0.osDesc')}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Version 1.0.6 */}
            <div className="relative pl-8 md:pl-16">
              <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-white/20" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight opacity-70">{t('v1_0_6.version')}</h2>
                <span className="text-slate-500 font-medium">{t('v1_0_6.date')}</span>
              </div>
              
              <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-2xl">
                {t('v1_0_6.desc')}
              </p>

              <div className="space-y-10">
                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v1_0_6.fixed')}</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-blue-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_0_6.crashTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_0_6.crashDesc')}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Version 1.0.5 */}
            <div className="relative pl-8 md:pl-16">
              <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-white/20" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight opacity-70">{t('v1_0_5.version')}</h2>
                <span className="text-slate-500 font-medium">{t('v1_0_5.date')}</span>
              </div>
              
              <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-2xl">
                {t('v1_0_5.desc')}
              </p>

              <div className="space-y-10">
                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v1_0_5.fixed')}</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-blue-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_0_5.appNapTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_0_5.appNapDesc')}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Version 1.0.4 */}
            <div className="relative pl-8 md:pl-16">
              <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-white/20" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight opacity-70">{t('v1_0_4.version')}</h2>
                <span className="text-slate-500 font-medium">{t('v1_0_4.date')}</span>
              </div>
              
              <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-2xl">
                {t('v1_0_4.desc')}
              </p>

              <div className="space-y-10">
                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v1_0_4.new')}</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-blue-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_0_4.ciTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_0_4.ciDesc')}</span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-blue-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_0_4.signedTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_0_4.signedDesc')}</span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-blue-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_0_4.licenseTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_0_4.licenseDesc')}</span>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v1_0_4.fixed')}</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-4 items-center">
                      <span className="text-emerald-400 text-sm">✦</span>
                      <span className="text-slate-300 text-sm font-medium">{t('v1_0_4.submoduleFix')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Version 1.0.3 */}
            <div className="relative pl-8 md:pl-16">
              <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-white/20" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight opacity-70">{t('v1_0_3.version')}</h2>
                <span className="text-slate-500 font-medium">{t('v1_0_3.date')}</span>
              </div>
              
              <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-2xl">
                {t('v1_0_3.desc')}
              </p>

              <div className="space-y-10">
                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v1_0_3.new')}</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-blue-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_0_3.hybridEngineTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_0_3.hybridEngineDesc')}</span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-blue-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_0_3.dedupTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_0_3.dedupDesc')}</span>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v1_0_3.fixed')}</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-4 items-center">
                      <span className="text-emerald-400 text-sm">✦</span>
                      <span className="text-slate-300 text-sm font-medium">{t('v1_0_3.queueAdvance')}</span>
                    </li>
                    <li className="flex gap-4 items-center">
                      <span className="text-emerald-400 text-sm">✦</span>
                      <span className="text-slate-300 text-sm font-medium">{t('v1_0_3.resumeBug')}</span>
                    </li>
                    <li className="flex gap-4 items-center">
                      <span className="text-emerald-400 text-sm">✦</span>
                      <span className="text-slate-300 text-sm font-medium">{t('v1_0_3.precision')}</span>
                    </li>
                    <li className="flex gap-4 items-center">
                      <span className="text-emerald-400 text-sm">✦</span>
                      <span className="text-slate-300 text-sm font-medium">{t('v1_0_3.linter')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Version 1.0.2 */}
            <div className="relative pl-8 md:pl-16">
              <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-white/20" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight opacity-70">{t('v1_0_2.version')}</h2>
                <span className="text-slate-500 font-medium">{t('v1_0_2.date')}</span>
              </div>
              
              <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-2xl">
                {t('v1_0_2.desc')}
              </p>

              <div className="space-y-10">
                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v1_0_1.improved')}</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-blue-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_0_2.autoplayContextTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_0_2.autoplayContextDesc')}</span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-blue-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_0_2.tieredRecsTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_0_2.tieredRecsDesc')}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Version 1.0.1 */}
            <div className="relative pl-8 md:pl-16">
              <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-white/20" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight opacity-70">{t('v1_0_1.version')}</h2>
                <span className="text-slate-500 font-medium">{t('v1_0_1.date')}</span>
              </div>
              
              <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-2xl">
                {t('v1_0_1.desc')}
              </p>

              <div className="space-y-10">
                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v1_0_1.new')}</h3>
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <span className="text-red-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_0_1.autoplayTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_0_1.autoplayDesc')}</span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-red-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_0_1.discoverTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_0_1.discoverDesc')}</span>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-red-400 mt-0.5">✦</span>
                      <div>
                        <strong className="block text-white mb-1">{t('v1_0_1.tooltipsTitle')}</strong>
                        <span className="text-slate-400 text-sm leading-relaxed block max-w-lg">{t('v1_0_1.tooltipsDesc')}</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v1_0_1.improved')}</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-4 items-center">
                      <span className="text-blue-400 text-sm">✦</span>
                      <span className="text-slate-300 text-sm font-medium">{t('v1_0_1.startup')}</span>
                    </li>
                    <li className="flex gap-4 items-center">
                      <span className="text-blue-400 text-sm">✦</span>
                      <span className="text-slate-300 text-sm font-medium">{t('v1_0_1.recovery')}</span>
                    </li>
                    <li className="flex gap-4 items-center">
                      <span className="text-blue-400 text-sm">✦</span>
                      <span className="text-slate-300 text-sm font-medium">{t('v1_0_1.macosMedia')}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white text-xs font-semibold uppercase tracking-widest mb-5">{t('v1_0_1.fixed')}</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-4 items-center">
                      <span className="text-emerald-400 text-sm">✦</span>
                      <span className="text-slate-300 text-sm font-medium">{t('v1_0_1.duplicateMedia')}</span>
                    </li>
                    <li className="flex gap-4 items-center">
                      <span className="text-emerald-400 text-sm">✦</span>
                      <span className="text-slate-300 text-sm font-medium">{t('v1_0_1.stationHighlight')}</span>
                    </li>
                    <li className="flex gap-4 items-center">
                      <span className="text-emerald-400 text-sm">✦</span>
                      <span className="text-slate-300 text-sm font-medium">{t('v1_0_1.seekbarPause')}</span>
                    </li>
                    <li className="flex gap-4 items-center">
                      <span className="text-emerald-400 text-sm">✦</span>
                      <span className="text-slate-300 text-sm font-medium">{t('v1_0_1.bottomBar')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Version 1.0.0 */}
            <div className="relative pl-8 md:pl-16">
              <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-white/20" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight opacity-70">{t('v1_0_0.version')}</h2>
                <span className="text-slate-500 font-medium">{t('v1_0_0.date')}</span>
              </div>
              
              <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-2xl">
                {t('v1_0_0.desc')}
              </p>
              
              <ul className="space-y-4">
                <li className="flex gap-4 items-center">
                  <span className="text-white/40 text-sm">✦</span>
                  <span className="text-slate-400 text-sm font-medium">{t('v1_0_0.spotify')}</span>
                </li>
                <li className="flex gap-4 items-center">
                  <span className="text-white/40 text-sm">✦</span>
                  <span className="text-slate-400 text-sm font-medium">{t('v1_0_0.youtube')}</span>
                </li>
                <li className="flex gap-4 items-center">
                  <span className="text-white/40 text-sm">✦</span>
                  <span className="text-slate-400 text-sm font-medium">{t('v1_0_0.playlists')}</span>
                </li>
                <li className="flex gap-4 items-center">
                  <span className="text-white/40 text-sm">✦</span>
                  <span className="text-slate-400 text-sm font-medium">{t('v1_0_0.platforms')}</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-24 pt-8 border-t border-white/10">
            <Link href="/" className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
              {t('back')}
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
