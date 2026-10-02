import { Airplay, ListMusic, Music2, Smartphone } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/ui/FadeIn';
import { SpotlightText } from '@/components/ui/SpotlightText';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

const icons = [Music2, Airplay, ListMusic, Smartphone];

export default function PlaybackUpdatesSection({ locale, compact = false }: { locale: string; compact?: boolean }) {
  const t = useTranslations('playbackUpdates');
  const shared = useTranslations();
  const content = {
    badge: shared('downloadCTA.comingSoon'),
    title: shared('platforms.title'),
    description: shared('changelog.subtitle'),
    items: ['local', 'output', 'queue', 'pause'].map(key => ({ title: t(`${key}Title`), description: t(key) })),
    note: t('note'),
    guide: shared('blog.readMore'),
    changelog: shared('footer.changelog'),
  };
  return (
    <section id="playback-updates" lang={locale} aria-labelledby="playback-updates-title" className={compact ? 'mb-20 overflow-hidden' : 'py-20 md:py-28 border-y border-white/10 overflow-hidden bg-[var(--color-bg-base)]'}>
      <div className={compact ? '' : 'max-w-7xl mx-auto px-4 sm:px-6'}>
        <FadeIn
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">{content.badge}</p>
          <h2 id="playback-updates-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            <SpotlightText>{content.title}</SpotlightText>
          </h2>
          <p className="mt-5 max-w-2xl text-lg sm:text-xl text-slate-400">{content.description}</p>
        </FadeIn>
        
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${compact ? '' : 'lg:grid-cols-4'} gap-6 mt-12`}>
          {content.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <FadeIn
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                className="group relative h-full min-w-0"
              >
                <SpotlightCard className="h-full p-6 sm:p-8 hover:-translate-y-1 transition-transform duration-300" spotlightColor="rgba(248, 113, 113, 0.1)">
                  <Icon aria-hidden="true" className="w-8 h-8 text-red-400 mb-6 group-hover:text-red-300 transition-colors" />
                  <h3 className="text-xl font-bold tracking-tight text-white relative z-10">{item.title}</h3>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-400 mt-3 group-hover:text-slate-300 transition-colors relative z-10">{item.description}</p>
                </SpotlightCard>
              </FadeIn>
            );
          })}
        </div>
        
        <FadeIn
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/5"
        >
          <p className="max-w-3xl text-sm leading-relaxed text-slate-500">{content.note}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 mt-4 text-sm font-semibold">
            <Link href="/blog/play-on-local-files-ios" className="text-white hover:text-red-400 transition-colors inline-flex items-center gap-1 group">
              {content.guide}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
            {!compact && (
              <Link href="/changelog" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                {content.changelog}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
