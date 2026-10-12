import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupportedLanguage, LanguageOption, AppTranslations } from './types';
import { tr } from './locales/tr';
import { en } from './locales/en';
import { de } from './locales/de';
import { es } from './locales/es';
import { ru } from './locales/ru';

export type Language = SupportedLanguage;
export type { AppTranslations };

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷', nativeName: 'Türkçe' },
  { code: 'en', name: 'English', flag: '🇬🇧', nativeName: 'English' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'es', name: 'Español', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', nativeName: 'Русский' }
];

export const LOCALES: Record<SupportedLanguage, AppTranslations> = {
  tr,
  en,
  de,
  es,
  ru
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

import { AUTO_TRANSLATE_ES, AUTO_TRANSLATE_RU, AUTO_TRANSLATE_DE } from './autoTranslateMap';

export function lText(
  lang: string,
  trText: string,
  enText: string,
  deText?: string,
  esText?: string,
  ruText?: string
): string {
  if (lang === 'es') {
    if (esText) return esText;
    const lookup = AUTO_TRANSLATE_ES[trText] || AUTO_TRANSLATE_ES[enText];
    if (lookup) return lookup;
    if (trText) {
      if (trText.includes('Vatandaşlığı & Küresel Mobilite')) {
        const country = trText.replace(' Vatandaşlığı & Küresel Mobilite', '').trim();
        return `Ciudadanía y Movilidad Global de ${country}`;
      }
      if (trText.includes('Saat İleri')) {
        const num = trText.replace(/[^0-9]/g, '');
        return `+${num} Horas Adelante`;
      }
      if (trText.includes('Saat Geri')) {
        const num = trText.replace(/[^0-9]/g, '');
        return `-${num} Horas Atrás`;
      }
      if (trText.includes('Aynı Saat Dilimi')) {
        return 'Misma Zona Horaria';
      }
    }
    return enText || trText;
  }
  if (lang === 'ru') {
    if (ruText) return ruText;
    const lookup = AUTO_TRANSLATE_RU[trText] || AUTO_TRANSLATE_RU[enText];
    if (lookup) return lookup;
    if (trText) {
      if (trText.includes('Vatandaşlığı & Küresel Mobilite')) {
        const country = trText.replace(' Vatandaşlığı & Küresel Mobilite', '').trim();
        return `Гражданство и глобальная мобильность: ${country}`;
      }
      if (trText.includes('Saat İleri')) {
        const num = trText.replace(/[^0-9]/g, '');
        return `+${num} ч вперед`;
      }
      if (trText.includes('Saat Geri')) {
        const num = trText.replace(/[^0-9]/g, '');
        return `-${num} ч назад`;
      }
      if (trText.includes('Aynı Saat Dilimi')) {
        return 'Тот же часовой пояс';
      }
    }
    return enText || trText;
  }
  if (lang === 'de') {
    if (deText) return deText;
    const lookup = AUTO_TRANSLATE_DE[trText] || AUTO_TRANSLATE_DE[enText];
    if (lookup) return lookup;
    if (trText) {
      if (trText.includes('Saat İleri')) {
        const num = trText.replace(/[^0-9]/g, '');
        return `+${num} Std voraus`;
      }
      if (trText.includes('Saat Geri')) {
        const num = trText.replace(/[^0-9]/g, '');
        return `-${num} Std zurück`;
      }
      if (trText.includes('Aynı Saat Dilimi')) {
        return 'Gleiche Zeitzone';
      }
    }
    return enText || trText;
  }
  if (lang === 'en') return enText || trText;
  return trText;
}

export interface I18nContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  toggleLanguage: () => void;
  t: AppTranslations;
  languages: LanguageOption[];
  l: (tr: string, en: string, de?: string, es?: string, ru?: string) => string;
}

const defaultL = (tr: string, en: string, de?: string, es?: string, ru?: string) => tr;

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
    // Cycle through tr -> en -> de -> es -> ru -> tr
    const order: SupportedLanguage[] = ['tr', 'en', 'de', 'es', 'ru'];
    const nextIdx = (order.indexOf(language) + 1) % order.length;
    setLanguage(order[nextIdx]);
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const l = (trText: string, enText: string, deText?: string, esText?: string, ruText?: string): string => {
    return lText(language, trText, enText, deText, esText, ruText);
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
