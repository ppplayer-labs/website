'use client'

import {Link, usePathname} from '@/i18n/routing'
import {useTranslations} from 'next-intl'
import { SpotlightLogo } from '@/components/ui/SpotlightLogo'
import { PROJECT_LINKS } from '@/lib/constants'

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <footer className="border-t border-white/5 bg-[var(--color-bg-base)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <SpotlightLogo
                src="/logo.png"
                alt="PPPlayer Logo"
                width={32}
                height={32}
                className="opacity-75 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="text-white font-medium text-lg tracking-tight">
                PPPlayer
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
              {t("desc")}
            </p>
            <a href={PROJECT_LINKS.source} className="text-slate-400 hover:text-white text-sm underline underline-offset-4">{t('source')}</a>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-12 md:gap-16">
            <div className="flex flex-col gap-3">
              <span className="text-white text-xs font-semibold uppercase tracking-widest mb-4">{t("product")}</span>
              {isHome ? (
                <>
                  <a href="#features" className="text-slate-400 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 w-fit">{t("features")}</a>
                  <a href="#download" className="text-slate-400 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 w-fit">{t("download")}</a>
                </>
              ) : (
                <>
                  <Link href="/#features" className="text-slate-400 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 w-fit">{t("features")}</Link>
                  <Link href="/#download" className="text-slate-400 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 w-fit">{t("download")}</Link>
                </>
              )}
              <Link href="/changelog" className="text-slate-400 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 w-fit">{t('changelog')}</Link>
              <Link href="/blog" className="text-slate-400 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 w-fit">{t('blog')}</Link>
              <a href={PROJECT_LINKS.contribute} className="text-slate-400 hover:text-white text-sm transition-colors">{t("contribute")}</a>
              <Link href="/support" className="text-slate-400 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 w-fit">{tNav("support")}</Link>
            </div>
            
            <div className="flex flex-col gap-3">
              <span className="text-white text-xs font-semibold uppercase tracking-widest mb-4">{t("platforms")}</span>
              <Link href="/download" className="text-slate-400 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 w-fit">{t.has('macos') ? t('macos') : 'macOS'}</Link>
              <Link href="/download" className="text-slate-400 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 w-fit">{t("windows")}</Link>
              <Link href="/download" className="text-slate-400 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 w-fit">{t('linux')}</Link>
              <Link href="/download" className="text-slate-400 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 w-fit">{t("ios")}</Link>
              <Link href="/download" className="text-slate-400 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 w-fit">{t("android")}</Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-white text-xs font-semibold uppercase tracking-widest mb-4">{t("social")}</span>
              <a href="https://www.instagram.com/ppplayermusic/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 w-fit">{t("instagram")}</a>
              <a href="https://www.linkedin.com/company/ppplayer/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 w-fit">{t("linkedin")}</a>
              <a href="https://www.facebook.com/ppplayermusic" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 w-fit">{t("facebook")}</a>
              <a href="https://github.com/ppplayer-labs" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 w-fit">{t("github")}</a>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-white text-xs font-semibold uppercase tracking-widest mb-4">{t("legal")}</span>
              <Link href="/privacy" className="text-slate-400 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 w-fit">{t("privacy")}</Link>
              <Link href="/terms" className="text-slate-400 hover:text-white text-sm transition-all duration-300 hover:translate-x-1 w-fit">{t("terms")}</Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 relative flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Gradient Divider */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <p className="text-slate-400 text-sm">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/ppplayermusic/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="PPPlayer on Instagram"
              className="p-2.5 rounded-full text-slate-400 hover:bg-white/5 hover:text-white hover:scale-110 transition-all duration-300"
            >
              {/* Instagram */}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/ppplayer/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="PPPlayer on LinkedIn"
              className="p-2.5 rounded-full text-slate-400 hover:bg-white/5 hover:text-white hover:scale-110 transition-all duration-300"
            >
              {/* LinkedIn */}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/ppplayermusic"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="PPPlayer on Facebook"
              className="p-2.5 rounded-full text-slate-400 hover:bg-white/5 hover:text-white hover:scale-110 transition-all duration-300"
            >
              {/* Facebook */}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a
              href="https://github.com/ppplayer-labs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="PPPlayer on GitHub"
              className="p-2.5 rounded-full text-slate-400 hover:bg-white/5 hover:text-white hover:scale-110 transition-all duration-300"
            >
              {/* GitHub */}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
