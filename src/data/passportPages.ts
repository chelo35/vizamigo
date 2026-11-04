// Pasaporta özel ülke sayfaları (SEO): /:lang/:ülke/:pasaport
// Her dilin bir "ana pasaportu" var; o dilin düz ülke sayfası bu pasaporta göre yazılır.
// Diğer büyük pasaportlar için aynı dilde ayrı sayfa üretilir (ör. /de/argentinien/schweiz).
import type { SupportedLanguage } from '../i18n/types';

/** Dilin varsayılan pasaportu: düz ülke sayfası ve yeni ziyaretçi için başlangıç. */
export const LANG_PASS: Record<SupportedLanguage, string> = { tr: 'TR', en: 'US', de: 'DE', es: 'ES', ru: 'RU' };

/** Ayrı sayfası olan pasaportlar (dilin konuşulduğu büyük ülkeler). */
export const PASSPORT_PAGES: Record<SupportedLanguage, string[]> = {
  tr: [],
  en: ['GB', 'IN', 'CA', 'AU'],
  de: ['AT', 'CH'],
  es: ['MX', 'AR', 'CO'],
  ru: ['KZ', 'UA']
};

export const hasPassportPage = (lang: SupportedLanguage, pass: string) => PASSPORT_PAGES[lang]?.includes(pass.toUpperCase());

/** Yeni ziyaretçi için başlangıç pasaportu: tarayıcı dili sayfa diliyle aynıysa bölgesi, değilse dilin ana pasaportu. */
export function defaultPassportFor(lang: SupportedLanguage, isValid: (c: string) => boolean): string {
  try {
    const langs = (typeof navigator !== 'undefined' && (navigator.languages?.length ? navigator.languages : [navigator.language])) || [];
    for (const l of langs) {
      const [base, region] = String(l).split('-');
      if (base?.toLowerCase() === lang && region && region.length === 2) {
        const r = region.toUpperCase();
        if (isValid(r)) return r;
      }
    }
  } catch {}
  return LANG_PASS[lang] || 'TR';
}
