/**
 * Scalable International Multilingual SEO Routing Engine for Vizamigo
 * Provides clean URL path routing (e.g. /:lang, /:lang/:tab, /:lang/country/:code)
 * with zero-dependency HTML5 History API synchronization, 404 validation, and full Mobile-First crawlability.
 */

import { useState, useEffect, useCallback } from 'react';
import { SupportedLanguage } from '../i18n/types';
import { SUPPORTED_LANGUAGES, getStoredLanguage, saveStoredLanguage } from '../i18n';
import { TabKey } from '../components/Navigation';
import { GEO_DATA } from '../data/geoData';

export const BASE_URL = 'https://vizamigo.com';

export const VALID_LANG_CODES = new Set(SUPPORTED_LANGUAGES.map(l => l.code));
export const VALID_TABS = new Set<TabKey>(['explore', 'plan', 'track', 'nomad', 'profile', 'consular']);

export interface ParsedRoute {
  language: SupportedLanguage;
  tab: TabKey;
  countryCode: string | null;
  is404?: boolean;
}

/**
 * Parses window.location.pathname into clean route parameters.
 * Validates country codes against GEO_DATA (199 destinations) and tabs against VALID_TABS.
 * Flags is404=true for invalid countries or unknown paths to prevent Google Soft-404 indexation.
 */
export function parseCurrentRoute(): ParsedRoute {
  if (typeof window === 'undefined') {
    return { language: 'tr', tab: 'explore', countryCode: null, is404: false };
  }

  const rawPath = window.location.pathname.replace(/\/+$/, '');
  const segments = rawPath.split('/').filter(Boolean);

  let language: SupportedLanguage = getStoredLanguage();
  let tab: TabKey = 'explore';
  let countryCode: string | null = null;
  let is404 = false;

  if (segments.length > 0) {
    const firstSegment = segments[0].toLowerCase();
    if (VALID_LANG_CODES.has(firstSegment as SupportedLanguage)) {
      language = firstSegment as SupportedLanguage;
      segments.shift();
    } else if (firstSegment === 'country' || VALID_TABS.has(firstSegment as TabKey)) {
      // Direct path without lang prefix (e.g. /country/AL or /plan) - keep default language
    } else {
      is404 = true;
    }
  }

  if (segments.length > 0) {
    const next = segments[0].toLowerCase();
    if (next === 'country') {
      if (segments[1]) {
        const potentialCode = segments[1].toUpperCase();
        if (GEO_DATA[potentialCode]) {
          countryCode = potentialCode;
        } else {
          is404 = true;
          countryCode = potentialCode;
        }
      } else {
        is404 = true;
      }
    } else if (VALID_TABS.has(next as TabKey)) {
      tab = next as TabKey;
    } else {
      is404 = true;
    }
  }

  return { language, tab, countryCode, is404 };
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
      countryCode: targetCountry,
      is404: false
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
