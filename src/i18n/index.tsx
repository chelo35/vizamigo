import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupportedLanguage, LanguageOption, AppTranslations } from './types';
import { tr } from './locales/tr';
import { en } from './locales/en';
import { de } from './locales/de';

export type Language = SupportedLanguage;
export type { AppTranslations };

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷', nativeName: 'Türkçe' },
  { code: 'en', name: 'English', flag: '🇬🇧', nativeName: 'English' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', nativeName: 'Deutsch' }
];

export const LOCALES: Record<SupportedLanguage, AppTranslations> = {
  tr,
  en,
  de
};

export function getStoredLanguage(): SupportedLanguage {
  try {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('vr_lang') as SupportedLanguage;
      if (saved && LOCALES[saved]) return saved;
    }
  } catch {}
  return 'tr';
}

export function saveStoredLanguage(lang: SupportedLanguage): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('vr_lang', lang);
    }
  } catch {}
}

export function lText(
  lang: string,
  trText: string,
  enText: string,
  deText?: string
): string {
  if (lang === 'de') return deText || enText || trText;
  if (lang === 'en') return enText || trText;
  return trText;
}

export interface I18nContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  toggleLanguage: () => void;
  t: AppTranslations;
  languages: LanguageOption[];
  l: (tr: string, en: string, de?: string) => string;
}

const defaultL = (tr: string, en: string, de?: string) => tr;

const I18nContext = createContext<I18nContextType>({
  language: 'tr',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: tr,
  languages: SUPPORTED_LANGUAGES,
  l: defaultL
});

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => getStoredLanguage());

  const setLanguage = (lang: SupportedLanguage) => {
    if (!LOCALES[lang]) return;
    setLanguageState(lang);
    saveStoredLanguage(lang);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('languagechange', { detail: lang }));
    }
  };

  const toggleLanguage = () => {
    // Cycle through tr -> en -> de -> tr
    const order: SupportedLanguage[] = ['tr', 'en', 'de'];
    const nextIdx = (order.indexOf(language) + 1) % order.length;
    setLanguage(order[nextIdx]);
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const l = (trText: string, enText: string, deText?: string): string => {
    return lText(language, trText, enText, deText);
  };

  const value: I18nContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: LOCALES[language] || tr,
    languages: SUPPORTED_LANGUAGES,
    l
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18nContextType => {
  return useContext(I18nContext);
};
