/**
 * Vizamigo Country Slug & Localized URL Name Registry
 * 
 * Provides deterministic, search-optimized country slug generation and bidirectional
 * lookup across all 5 supported languages (TR, EN, DE, RU, ES) + ISO-3166-1 alpha-2 codes.
 * Ensures URL structures like `/tr/arnavutluk`, `/en/albania`, `/de/albanien`, `/ru/albaniya`, `/es/albania`.
 */

import { SupportedLanguage } from '../i18n/types';
import { getCountryName } from '../data/passportData';
import { GEO_DATA } from '../data/geoData';
import { D } from '../data/passportData';

const CYRILLIC_TO_LATIN: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo',
  ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm',
  н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u',
  ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch',
  ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya'
};

/**
 * Normalizes any unicode string into a clean, search-engine-friendly ASCII slug.
 * Handles Turkish characters, German umlauts/eszett, Spanish accents, and Russian Cyrillic.
 */
export function slugify(text: string): string {
  if (!text) return '';
  let s = text.toLowerCase().trim();

  // 1. Cyrillic transliteration
  s = s.split('').map((char) => CYRILLIC_TO_LATIN[char] || char).join('');

  // 2. Language-specific character normalizations
  s = s
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/ß/g, 'ss')
    .replace(/ä/g, 'ae')
    .replace(/ñ/g, 'n');

  // 3. Strip remaining combining diacritics
  s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // 4. Clean non-alphanumeric and compact hyphens
  return s
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Pre-warmed bidirectional lookup caches
const CODE_TO_SLUG: Record<SupportedLanguage, Map<string, string>> = {
  tr: new Map(),
  en: new Map(),
  de: new Map(),
  ru: new Map(),
  es: new Map()
};

const SLUG_TO_CODE: Record<SupportedLanguage, Map<string, string>> = {
  tr: new Map(),
  en: new Map(),
  de: new Map(),
  ru: new Map(),
  es: new Map()
};

const GLOBAL_SLUG_FALLBACK = new Map<string, string>();

let isInitialized = false;

function initSlugRegistry(): void {
  if (isInitialized) return;

  const codeSet = new Set<string>([
    ...Object.keys(GEO_DATA),
    ...Object.keys(D)
  ]);

  const allCodes = Array.from(codeSet)
    .map((c) => c.toUpperCase())
    .filter((c) => /^[A-Z]{2}$/.test(c))
    .sort();

  const langs: SupportedLanguage[] = ['tr', 'en', 'de', 'ru', 'es'];

  for (const code of allCodes) {
    for (const lang of langs) {
      const rawName = getCountryName(code, lang);
      const slug = slugify(rawName) || code.toLowerCase();

      CODE_TO_SLUG[lang].set(code, slug);
      SLUG_TO_CODE[lang].set(slug, code);

      if (!GLOBAL_SLUG_FALLBACK.has(slug)) {
        GLOBAL_SLUG_FALLBACK.set(slug, code);
      }
    }

    // Direct ISO code fallback (e.g. "th", "al", "de")
    const lowerCode = code.toLowerCase();
    if (!GLOBAL_SLUG_FALLBACK.has(lowerCode)) {
      GLOBAL_SLUG_FALLBACK.set(lowerCode, code);
    }
  }

  isInitialized = true;
}

/**
 * Returns the exact localized SEO URL slug for a given ISO country code.
 * Example:
 *   getCountrySlug('AL', 'tr') => "arnavutluk"
 *   getCountrySlug('AL', 'en') => "albania"
 *   getCountrySlug('AL', 'de') => "albanien"
 *   getCountrySlug('AL', 'ru') => "albaniya"
 *   getCountrySlug('AL', 'es') => "albania"
 */
export function getCountrySlug(countryCode: string, lang: SupportedLanguage = 'en'): string {
  initSlugRegistry();
  const upper = countryCode.toUpperCase();
  const cached = CODE_TO_SLUG[lang]?.get(upper);
  if (cached) return cached;

  const raw = getCountryName(upper, lang);
  return slugify(raw) || upper.toLowerCase();
}

/**
 * Resolves an incoming URL segment (localized slug or ISO code) back to its ISO-3166-1 alpha-2 code.
 * Example:
 *   getCountryCodeFromSlug('arnavutluk', 'tr') => "AL"
 *   getCountryCodeFromSlug('albania', 'en') => "AL"
 *   getCountryCodeFromSlug('albanien') => "AL"
 *   getCountryCodeFromSlug('AL') => "AL"
 */
export function getCountryCodeFromSlug(slug: string, lang?: SupportedLanguage): string | null {
  if (!slug) return null;
  initSlugRegistry();

  const normalized = slugify(slug);

  // 1. Language-specific lookup if language is provided
  if (lang && SLUG_TO_CODE[lang]?.has(normalized)) {
    return SLUG_TO_CODE[lang].get(normalized)!;
  }

  // 2. Global slug fallback (handles cross-language visits like visiting /tr/albania)
  if (GLOBAL_SLUG_FALLBACK.has(normalized)) {
    return GLOBAL_SLUG_FALLBACK.get(normalized)!;
  }

  // 3. Direct ISO-2 match
  const upper = slug.toUpperCase();
  if (/^[A-Z]{2}$/.test(upper) && (GEO_DATA[upper] || (D as Record<string, unknown>)[upper])) {
    return upper;
  }

  return null;
}
