'use client'

import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/routing';
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
// Import handled
import { Button } from '@/components/ui/Button'
import { SpotlightLogo } from '@/components/ui/SpotlightLogo'
import { PROJECT_LINKS } from '@/lib/constants'
import { LanguageSelector } from '@/components/ui/LanguageSelector'

const navLinks = [
  { label: 'features', href: '/#features', isRaw: false },
  { label: 'blog', href: '/blog', isRaw: false },
  { label: 'changelog', href: '/changelog', isRaw: true },
  { label: 'support', href: '/support', isRaw: false }
]

export default function Navbar() {
  const t = useTranslations('nav');
  const common = useTranslations('common');
  const footer = useTranslations('footer');
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    
    // Check initial scroll position on mount
    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-2xl bg-[var(--color-bg-base)]/70 border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <SpotlightLogo
              src="/logo.png"
              alt=""
              width={28}
              height={28}
              className="rounded-lg group-hover:scale-105 transition-transform duration-300"
              imageClassName="rounded-lg"
              priority={true}
            />
            <span className="text-white font-semibold text-lg tracking-tight">
              PPPlayer
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-5">
            {navLinks.map((link) => {
              const isHashLink = link.href.startsWith('/#');
              if (isHashLink && isHome) {
                return (
                  <a
                    key={link.href}
                    href={link.href.substring(1)}
                    className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
                  >
                    {link.isRaw ? footer(link.label) : t(link.label)}
                  </a>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
                >
                  {link.isRaw ? footer(link.label) : t(link.label)}
                </Link>
              );
            })}
            <a href={PROJECT_LINKS.contribute} className="text-slate-400 hover:text-white transition-colors text-sm font-medium">{t("contribute")}</a>
            <LanguageSelector />
          </nav>

          {/* Desktop CTA & Socials */}
          <div className="hidden xl:flex items-center gap-4">
            <div className="flex items-center gap-3 border-e border-white/10 pe-4">
              <a href="https://www.instagram.com/ppplayermusic/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/ppplayer/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://www.facebook.com/ppplayermusic" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://github.com/ppplayer-labs" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-slate-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
            </div>
            <Button href="/download" size="sm" className="h-8 text-xs px-4 rounded-full bg-white text-black hover:bg-slate-200">
              {t("download")}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center gap-2">
            <LanguageSelector />
            <button
              className="p-2 text-slate-400 hover:text-white transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={common('menu')} aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden overflow-hidden backdrop-blur-2xl bg-[var(--color-bg-base)]/95 border-b border-white/5"
          >
            <div className="px-4 py-6 flex flex-col gap-6">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => {
                  const isHashLink = link.href.startsWith('/#');
                  if (isHashLink && isHome) {
                    return (
                      <a
                        key={link.href}
                        href={link.href.substring(1)}
                        className="text-slate-300 hover:text-white text-lg font-medium transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.isRaw ? footer(link.label) : t(link.label)}
                      </a>
                    );
                  }
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-slate-300 hover:text-white text-lg font-medium transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.isRaw ? footer(link.label) : t(link.label)}
                    </Link>
                  );
                })}
                <a href={PROJECT_LINKS.contribute} onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white text-lg font-medium transition-colors">{t("contribute")}</a>
              </nav>
              <div className="pt-4 border-t border-white/5 flex flex-col gap-6">
                <div className="flex items-center justify-center gap-6">
                  <a href="https://www.instagram.com/ppplayermusic/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none"/></svg>
                  </a>
                  <a href="https://www.linkedin.com/company/ppplayer/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                  <a href="https://www.facebook.com/ppplayermusic" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  <a href="https://github.com/ppplayer-labs" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-slate-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                  </a>
                </div>
                <Button href="/download" size="md" className="w-full bg-white text-black rounded-full" onClick={() => setIsOpen(false)}>
                  {t("download")}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

