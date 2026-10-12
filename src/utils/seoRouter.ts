/**
 * Scalable International Multilingual SEO Routing Engine for Vizamigo
 * Provides clean URL path routing (e.g. /:lang, /:lang/:tab, /:lang/country/:code)
 * with zero-dependency HTML5 History API synchronization and full Mobile-First crawlability.
 */

import { useState, useEffect, useCallback } from 'react';
import { SupportedLanguage } from '../i18n/types';
import { SUPPORTED_LANGUAGES, getStoredLanguage, saveStoredLanguage } from '../i18n';
import { TabKey } from '../components/Navigation';

export const BASE_URL = 'https://vizamigo.com';

export const VALID_LANG_CODES = new Set(SUPPORTED_LANGUAGES.map(l => l.code));
export const VALID_TABS = new Set<TabKey>(['explore', 'plan', 'track', 'profile', 'consular']);

export interface ParsedRoute {
  language: SupportedLanguage;
  tab: TabKey;
  countryCode: string | null;
}

/**
 * Parses window.location.pathname into clean route parameters.
 * Examples:
 *   /                     -> { language: 'tr', tab: 'explore', countryCode: null }
 *   /en                   -> { language: 'en', tab: 'explore', countryCode: null }
 *   /es/plan              -> { language: 'es', tab: 'plan', countryCode: null }
 *   /ru/country/JP        -> { language: 'ru', tab: 'explore', countryCode: 'JP' }
 *   /de/country/FR/       -> { language: 'de', tab: 'explore', countryCode: 'FR' }
 */
export function parseCurrentRoute(): ParsedRoute {
  if (typeof window === 'undefined') {
    return { language: 'tr', tab: 'explore', countryCode: null };
  }

  const rawPath = window.location.pathname.replace(/\/+$/, '');
  const segments = rawPath.split('/').filter(Boolean);

  let language: SupportedLanguage = getStoredLanguage();
  let tab: TabKey = 'explore';
  let countryCode: string | null = null;

  if (segments.length > 0) {
    const firstSegment = segments[0].toLowerCase();
    if (VALID_LANG_CODES.has(firstSegment as SupportedLanguage)) {
      language = firstSegment as SupportedLanguage;
      segments.shift();
    }
  }

  if (segments.length > 0) {
    const next = segments[0].toLowerCase();
    if (next === 'country' && segments[1]) {
      countryCode = segments[1].toUpperCase();
    } else if (VALID_TABS.has(next as TabKey)) {
      tab = next as TabKey;
    }
  }

  return { language, tab, countryCode };
}

/**
 * Builds a clean localized relative path.
 */
export function buildLocalizedPath(
  lang: SupportedLanguage,
  tab: TabKey = 'explore',
  countryCode: string | null = null
): string {
  if (countryCode) {
    return `/${lang}/country/${countryCode.toUpperCase()}`;
  }
  if (tab !== 'explore') {
    return `/${lang}/${tab}`;
  }
  return `/${lang}`;
}

/**
 * Builds absolute URL for canonical and hreflang links.
 */
export function buildAbsoluteLocalizedUrl(
  lang: SupportedLanguage,
  tab: TabKey = 'explore',
  countryCode: string | null = null
): string {
  const path = buildLocalizedPath(lang, tab, countryCode);
  return `${BASE_URL}${path}`;
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
      countryCode: targetCountry
    });
    saveStoredLanguage(targetLang);
  }, [route]);

  return {
    route,
    navigate,
    setLanguageInUrl: (lang: SupportedLanguage) => navigate(lang, undefined, undefined, false),
    setTabInUrl: (tab: TabKey) => navigate(undefined, tab, null, false),
    setCountryInUrl: (code: string | null) => navigate(undefined, 'explore', code, false)
  };
}
