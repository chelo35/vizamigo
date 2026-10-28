/**
 * Scalable International Multilingual SEO Routing Engine for Vizamigo
 * 
 * Provides clean, search-engine-optimized sub-directory URL path routing:
 *   - Localized Country Dossiers: `/tr/arnavutluk`, `/en/albania`, `/de/albanien`, `/ru/albaniya`, `/es/albania`
 *   - Localized Travel Tools: `/tr/plan`, `/en/track`, `/de/nomad`, etc.
 *   - International Gateways: `/tr`, `/en`, `/de`, `/ru`, `/es`
 * 
 * Fully backwards-compatible with `/country/:code` and direct ISO-2 paths.
 * Powers zero-dependency HTML5 History API synchronization, 404 validation, and Mobile-First crawling.
 */

import { useState, useEffect, useCallback } from 'react';
import { SupportedLanguage } from '../i18n/types';
import { SUPPORTED_LANGUAGES, getStoredLanguage, saveStoredLanguage } from '../i18n';
import { TabKey } from '../components/Navigation';
import { GEO_DATA } from '../data/geoData';
import { D } from '../data/passportData';
import { getCountrySlug, getCountryCodeFromSlug } from './countrySlugs';

export const BASE_URL = 'https://vizamigo.com';

export const CORE_SEO_LANGUAGES: readonly SupportedLanguage[] = ['tr', 'en', 'de', 'ru', 'es'] as const;

export const VALID_LANG_CODES = new Set(SUPPORTED_LANGUAGES.map((l) => l.code));
export const VALID_TABS = new Set<TabKey>(['explore', 'plan', 'track', 'nomad', 'profile', 'consular']);

export const TAB_ALIASES: Record<string, TabKey> = {
  explore: 'explore',
  kesfet: 'explore',
  home: 'explore',
  radar: 'explore',
  weather: 'explore',
  clocks: 'explore',
  currency: 'explore',

  plan: 'plan',
  rota: 'plan',
  itinerary: 'plan',
  compare: 'plan',

  track: 'track',
  schengen: 'track',
  sayac: 'track',
  calculator: 'track',
  'schengen-calculator': 'track',

  nomad: 'nomad',
  'dijital-gocebe': 'nomad',
  nomadhub: 'nomad',
  tools: 'nomad',

  profile: 'profile',
  profil: 'profile',
  cuzdan: 'profile',
  wallet: 'profile',
  emergency: 'profile',

  consular: 'consular',
  audit: 'consular',
  mevzuat: 'consular',
  konsolosluk: 'consular'
};

export interface ParsedRoute {
  language: SupportedLanguage;
  tab: TabKey;
  countryCode: string | null;
  is404?: boolean;
  /** /:lang/info/:page — bilgi merkezi sayfası */
  infoPage?: string | null;
}

export interface HreflangAlternateDescriptor {
  hreflang: SupportedLanguage | 'x-default';
  href: string;
  ogLocale: string;
}

const OG_LOCALE_BY_LANG: Record<SupportedLanguage, string> = {
  tr: 'tr_TR',
  en: 'en_US',
  de: 'de_DE',
  ru: 'ru_RU',
  es: 'es_ES'
};

/**
 * Validates if an ISO-2 string exists in Vizamigo country records.
 */
export function isValidCountryCode(code: string): boolean {
  if (!code || typeof code !== 'string') return false;
  const upper = code.toUpperCase();
  return Boolean(GEO_DATA[upper] || (D as Record<string, unknown>)[upper]);
}

/**
 * Parses window.location.pathname into clean route parameters.
 * Supports:
 *   - `/:lang/:countrySlug` (e.g. `/tr/arnavutluk`, `/en/albania`, `/de/albanien`)
 *   - `/:lang/country/:code` (legacy e.g. `/tr/country/AL`)
 *   - `/:lang/:tab` (e.g. `/en/track`, `/tr/plan`)
 *   - `/:lang` (e.g. `/tr`, `/en`)
 *   - Root `/` fallback
 */
export function parseCurrentRoute(): ParsedRoute {
  if (typeof window === 'undefined') {
    return { language: 'tr', tab: 'explore', countryCode: null, is404: false };
  }

  const rawPath = window.location.pathname.replace(/\/+$/, '');
  const segments = rawPath
    .split('/')
    .map((s) => s.trim().replace(/\.(html|php|htm)$/i, ''))
    .filter((s) => Boolean(s) && s.toLowerCase() !== 'index.html');

  let language: SupportedLanguage = getStoredLanguage();
  let tab: TabKey = 'explore';
  let countryCode: string | null = null;
  let is404 = false;
  let infoPage: string | null = null;

  if (segments.length > 0) {
    const firstSegment = segments[0].toLowerCase();
    if (VALID_LANG_CODES.has(firstSegment as SupportedLanguage)) {
      language = firstSegment as SupportedLanguage;
      segments.shift();
    } else if (
      firstSegment === 'country' || firstSegment === 'info' ||
      VALID_TABS.has(firstSegment as TabKey) ||
      TAB_ALIASES[firstSegment] ||
      isValidCountryCode(firstSegment) ||
      getCountryCodeFromSlug(firstSegment)
    ) {
      // Direct path without lang prefix (e.g. /albania or /plan) - keep stored/default language
    } else {
      is404 = true;
    }
  }

  if (segments.length > 0 && !is404) {
    const next = segments[0].toLowerCase();

    // 0. Bilgi merkezi: `/:lang/info/:page`
    if (next === 'info' || next === 'bilgi') {
      infoPage = (segments[1] || 'terms').toLowerCase().replace(/[^a-z_]/g, '') || 'terms';
    }
    // 1. Check legacy `/country/:code`
    else if (next === 'country') {
      if (segments[1]) {
        const potentialCode = segments[1].toUpperCase();
        if (isValidCountryCode(potentialCode)) {
          countryCode = potentialCode;
          tab = 'explore';
        } else {
          is404 = true;
        }
      } else {
        is404 = true;
      }
    }
    // 2. Check tab name or alias (e.g. `track`, `plan`, `nomad`)
    else if (VALID_TABS.has(next as TabKey)) {
      tab = next as TabKey;
    } else if (TAB_ALIASES[next]) {
      tab = TAB_ALIASES[next];
    }
    // 3. Check localized country slug (e.g. `arnavutluk`, `albania`, `albanien`, `tayland`)
    else {
      const resolvedFromSlug = getCountryCodeFromSlug(next, language);
      if (resolvedFromSlug && isValidCountryCode(resolvedFromSlug)) {
        countryCode = resolvedFromSlug;
        tab = 'explore';
      } else if (isValidCountryCode(next)) {
        countryCode = next.toUpperCase();
        tab = 'explore';
      } else {
        is404 = true;
      }
    }
  }

  return { language, tab, countryCode, is404, infoPage };
}

/**
 * Builds a clean, localized search-engine-optimized relative path:
 *   - Country Dossier: `/${lang}/${countrySlug}` (e.g. `/tr/arnavutluk`, `/en/albania`, `/de/albanien`)
 *   - Tool Tab: `/${lang}/${tab}` (e.g. `/tr/track`, `/en/plan`)
 *   - International Home: `/${lang}` (e.g. `/tr`, `/en`)
 */
export function buildLocalizedPath(
  lang: SupportedLanguage,
  tab: TabKey = 'explore',
  countryCode: string | null = null
): string {
  if (countryCode) {
    const slug = getCountrySlug(countryCode, lang);
    return `/${lang}/${slug}`;
  }
  if (tab !== 'explore') {
    return `/${lang}/${tab}`;
  }
  return `/${lang}`;
}

/**
 * Builds an absolute URL for canonical, hreflang, and sitemap entries.
 */
export function buildAbsoluteLocalizedUrl(
  lang: SupportedLanguage,
  tab: TabKey = 'explore',
  countryCode: string | null = null
): string {
  const path = buildLocalizedPath(lang, tab, countryCode);
  return `${BASE_URL}${path}`;
}

/**
 * Programmatically builds the complete set of 5 localized hreflang alternate links
 * (TR, EN, DE, RU, ES) plus the mandatory `x-default` international fallback tag.
 * Cross-references precise sub-directory URLs (e.g. /tr/arnavutluk <-> /en/albania <-> /de/albanien).
 */
export function getHreflangAlternatesForRoute(
  tab: TabKey = 'explore',
  countryCode: string | null = null
): HreflangAlternateDescriptor[] {
  const descriptors: HreflangAlternateDescriptor[] = CORE_SEO_LANGUAGES.map((code) => ({
    hreflang: code,
    href: buildAbsoluteLocalizedUrl(code, tab, countryCode),
    ogLocale: OG_LOCALE_BY_LANG[code]
  }));

  // Mandatory x-default international fallback pointing to English path
  descriptors.push({
    hreflang: 'x-default',
    href: buildAbsoluteLocalizedUrl('en', tab, countryCode),
    ogLocale: 'en_US'
  });

  return descriptors;
}

export function useSeoRouter() {
  const [route, setRoute] = useState<ParsedRoute>(() => parseCurrentRoute());

  // Listen to browser Back/Forward (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseCurrentRoute();
      setRoute(parsed);
      saveStoredLanguage(parsed.language);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((
    newLang?: SupportedLanguage,
    newTab?: TabKey,
    newCountryCode?: string | null,
    replace: boolean = false
  ) => {
    const targetLang = newLang || route.language;
    const targetTab = newTab !== undefined ? newTab : route.tab;
    const targetCountry = newCountryCode !== undefined ? newCountryCode : route.countryCode;

    const nextPath = buildLocalizedPath(targetLang, targetTab, targetCountry);
    const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';

    if (nextPath !== currentPath) {
      if (replace) {
        window.history.replaceState({ lang: targetLang, tab: targetTab, country: targetCountry }, '', nextPath);
      } else {
        window.history.pushState({ lang: targetLang, tab: targetTab, country: targetCountry }, '', nextPath);
      }
    }

    setRoute({
      language: targetLang,
      tab: targetTab,
      countryCode: targetCountry,
      is404: false
    });
    saveStoredLanguage(targetLang);
  }, [route]);

  const openInfo = useCallback((page: string, replace: boolean = false) => {
    const lang = route.language;
    const path = `/${lang}/info/${page}`;
    if (replace) window.history.replaceState({ lang, info: page }, '', path);
    else window.history.pushState({ lang, info: page }, '', path);
    setRoute({ language: lang, tab: 'explore', countryCode: null, is404: false, infoPage: page });
  }, [route]);

  return {
    route,
    navigate,
    openInfo,
    setLanguageInUrl: (lang: SupportedLanguage) => navigate(lang, undefined, undefined, false),
    setTabInUrl: (tab: TabKey) => navigate(undefined, tab, null, false),
    setCountryInUrl: (code: string | null) => navigate(undefined, 'explore', code, false)
  };
}
