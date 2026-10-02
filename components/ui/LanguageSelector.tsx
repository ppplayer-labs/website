'use client'

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'en', label: 'English', flag: 'us' },
  { code: 'pt-BR', label: 'Português', flag: 'br' },
  { code: 'es', label: 'Español', flag: 'es' },
  { code: 'ru', label: 'Русский', flag: 'ru' },
  { code: 'tr', label: 'Türkçe', flag: 'tr' },
  { code: 'fr', label: 'Français', flag: 'fr' },
  { code: 'de', label: 'Deutsch', flag: 'de' },
  { code: 'hi', label: 'हिन्दी', flag: 'in' },
  { code: 'it', label: 'Italiano', flag: 'it' },
  { code: 'ja', label: '日本語', flag: 'jp' },
  { code: 'ko', label: '한국어', flag: 'kr' },
  { code: 'ar', label: 'العربية', flag: 'sa' },
  { code: 'zh', label: '中文', flag: 'cn' },
  { code: 'id', label: 'Bahasa Indonesia', flag: 'id' },
  { code: 'my', label: 'မြန်မာ', flag: 'mm' },
  { code: 'pl', label: 'Polski', flag: 'pl' },
  { code: 'da', label: 'Dansk', flag: 'dk' },
  { code: 'kk', label: 'Қазақша', flag: 'kz' },
  { code: 'cs', label: 'Čeština', flag: 'cz' },
  { code: 'hu', label: 'Magyar', flag: 'hu' },
  { code: 'ka', label: 'ქართული', flag: 'ge' },
  { code: 'sv', label: 'Svenska', flag: 'se' },
  { code: 'uz', label: 'O\'zbekcha', flag: 'uz' },
  { code: 'fil', label: 'Filipino', flag: 'ph' },
  { code: 'lv', label: 'Latviešu', flag: 'lv' },
  { code: 'bn', label: 'বাংলা', flag: 'bd' },
  { code: 'pcm', label: 'Naija', flag: 'ng' },
  { code: 'hr', label: 'Hrvatski', flag: 'hr' },
  { code: 'ms', label: 'Bahasa Melayu', flag: 'my' },
  { code: 'fa', label: 'فارسی', flag: 'ir' },
  { code: 'et', label: 'Eesti', flag: 'ee' },
  { code: 'gn', label: 'Avañe\'ẽ', flag: 'py' },
  { code: 'vi', label: 'Tiếng Việt', flag: 'vn' },
  { code: 'th', label: 'ไทย', flag: 'th' },
  { code: 'ur', label: 'اردو', flag: 'pk' },
  { code: 'uk', label: 'Українська', flag: 'ua' },
  { code: 'nl', label: 'Nederlands', flag: 'nl' },
  { code: 'ro', label: 'Română', flag: 'ro' }
];

export function LanguageSelector() {
  const locale = useLocale();
  const t = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function onSelect(nextLocale: string) {
    setIsOpen(false);
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-transparent text-slate-400 hover:text-white text-sm font-medium py-1 outline-none transition-colors"
        aria-label={t('language')} aria-expanded={isOpen}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://flagcdn.com/${activeLanguage.flag}.svg`}
          alt={activeLanguage.label}
          className="w-4 h-4 rounded-full object-cover"
        />
        <span className="hidden sm:inline-block">{activeLanguage.label}</span>
        <svg
          className={`fill-current h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute end-0 mt-2 w-44 max-h-64 overflow-y-auto rounded-xl bg-[var(--color-bg-base)] border border-white/10 shadow-xl z-50 backdrop-blur-xl"
          >
            <div className="flex flex-col py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onSelect(lang.code)}
                  className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors text-start ${
                    locale === lang.code
                      ? 'bg-white/10 text-white'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://flagcdn.com/${lang.flag}.svg`}
                    alt={lang.label}
                    className="w-4 h-4 rounded-full object-cover flex-shrink-0"
                  />
                  {lang.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
