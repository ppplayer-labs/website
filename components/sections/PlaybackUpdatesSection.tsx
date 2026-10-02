import { Airplay, ListMusic, Music2, Smartphone } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getPlaybackUpdates } from '@/lib/playback-updates';
import { FadeIn } from '@/components/ui/FadeIn';
import { SpotlightText } from '@/components/ui/SpotlightText';

const icons = [Music2, Airplay, ListMusic, Smartphone];

export default function PlaybackUpdatesSection({ locale, compact = false }: { locale: string; compact?: boolean }) {
  const content = getPlaybackUpdates(locale);
  return (
    <section id="playback-updates" lang={content.lang} dir="ltr" aria-labelledby="playback-updates-title" className={compact ? 'mb-20 overflow-hidden' : 'py-20 md:py-28 border-y border-white/10 overflow-hidden bg-[var(--color-bg-base)]'}>
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
                className="group relative rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 min-w-0 hover:bg-white/[0.04] transition-all duration-300 hover:border-white/20 hover:-translate-y-1 shadow-lg shadow-black/20"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative">
                  <Icon aria-hidden="true" className="w-8 h-8 text-red-400 mb-6 group-hover:text-red-300 transition-colors" />
                  <h3 className="text-xl font-bold tracking-tight text-white">{item.title}</h3>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-400 mt-3 group-hover:text-slate-300 transition-colors">{item.description}</p>
                </div>
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
