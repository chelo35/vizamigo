/**
 * Dynamic Multilingual SEO Head Manager for Vizamigo
 * Automatically generates and maintains canonical tags, dynamic 5-language hreflang alternates,
 * x-default fallbacks, and mobile indexing metadata in compliance with Google Search Console standards.
 */

import React, { useEffect } from 'react';
import { SupportedLanguage } from '../i18n/types';
import { SUPPORTED_LANGUAGES } from '../i18n';
import { TabKey } from './Navigation';
import { buildAbsoluteLocalizedUrl, BASE_URL } from '../utils/seoRouter';
import { getCountryName } from '../data/passportData';

interface SeoHeadProps {
  language: SupportedLanguage;
  tab: TabKey;
  countryCode: string | null;
  currentPassport?: string;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  language,
  tab,
  countryCode,
  currentPassport = 'TR'
}) => {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // 1. Update HTML language and text direction attributes
    document.documentElement.lang = language;
    document.documentElement.dir = 'ltr';

    // 2. Compute dynamic title and description
    let pageTitle = 'Vizamigo - Akıllı Pasaport, Vize & Küresel Seyahat Rehberi';
    let metaDescription = '199 ülkenin güncel vize rejimleri, çifte pasaport mukayesesi, Schengen 90/180 gün kuralı hesaplayıcı, konsolosluk acil durum kriz masaları ve dijital göçebe rehberi.';

    if (countryCode) {
      const countryName = getCountryName(countryCode, language);
      if (language === 'en') {
        pageTitle = `${countryName} Visa Requirements & Travel Dossier 2026 | Vizamigo`;
        metaDescription = `Comprehensive 2026 visa regulations, entry requirements, local emergency contacts, transit rules, and cultural travel dossier for ${countryName}.`;
      } else if (language === 'de') {
        pageTitle = `${countryName} Visabestimmungen & Reiseführer 2026 | Vizamigo`;
        metaDescription = `Offizielle Einreisebestimmungen, Visa-Regelungen, Notfallkontakte, Transitregeln und Kulturführer 2026 für ${countryName}.`;
      } else if (language === 'es') {
        pageTitle = `${countryName} Requisitos de Visado y Guía de Viaje 2026 | Vizamigo`;
        metaDescription = `Normativas oficiales de visado, requisitos de entrada, teléfonos consulares de emergencia y dossier de viaje 2026 para ${countryName}.`;
      } else if (language === 'ru') {
        pageTitle = `${countryName} Визовые Требования и Гид 2026 | Vizamigo`;
        metaDescription = `Актуальные визовые правила, требования к въезду, экстренные консульские контакты и досье путешественника 2026 для: ${countryName}.`;
      } else {
        pageTitle = `${countryName} Vize Şartları & 360° Seyahat Rehberi 2026 | Vizamigo`;
        metaDescription = `${countryName} için 2026 vize rejimleri, giriş şartları, transit kuralları, konsolosluk acil hatları ve gezgin rehberi.`;
      }
    } else {
      switch (tab) {
        case 'plan':
          pageTitle = language === 'en'
            ? 'Route Planner & Passport Comparison | Vizamigo'
            : language === 'de'
            ? 'Routenplaner & Passvergleich | Vizamigo'
            : language === 'es'
            ? 'Planificador de Rutas y Comparador de Pasaportes | Vizamigo'
            : language === 'ru'
            ? 'Планировщик Маршрутов и Сравнение Паспортов | Vizamigo'
            : 'Rota Planlayıcı, Sinerji & Pasaport Kıyaslama | Vizamigo';
          break;
        case 'track':
          pageTitle = language === 'en'
            ? 'Schengen 90/180 Day Calculator & Rule Tracker | Vizamigo'
            : language === 'de'
            ? 'Schengen 90/180 Tage-Rechner | Vizamigo'
            : language === 'es'
            ? 'Calculadora Schengen 90/180 Días | Vizamigo'
            : language === 'ru'
            ? 'Калькулятор Шенгена 90/180 Дней | Vizamigo'
            : 'Schengen 90/180 Gün Sayacı & İhlal Takip Aracı | Vizamigo';
          break;
        case 'profile':
        case 'consular':
          pageTitle = language === 'en'
            ? 'Consular Crisis Desk & Emergency Hotlines | Vizamigo'
            : language === 'de'
            ? 'Konsularische Krisenhilfe & Notfallzentrale | Vizamigo'
            : language === 'es'
            ? 'Mesa de Crisis Consular y Teléfonos de Emergencia | Vizamigo'
            : language === 'ru'
            ? 'Консульская Помощь и Экстренные Службы | Vizamigo'
            : 'Konsolosluk Acil Durum Kriz Masası & Gezgin Kasası | Vizamigo';
          break;
        default:
          break;
      }
    }

    document.title = pageTitle;

    // 3. Update Meta Description
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', metaDescription);

    // 4. Update Canonical Tag
    const currentCanonicalUrl = buildAbsoluteLocalizedUrl(language, tab, countryCode);
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentCanonicalUrl);

    // 5. Update or Inject Dynamic Multilingual Hreflang Alternates
    // Remove old dynamic alternates to prevent accumulation
    const existingHreflangs = document.querySelectorAll('link[rel="alternate"][data-dynamic-hreflang="true"]');
    existingHreflangs.forEach(el => el.remove());

    // Loop through all supported languages
    SUPPORTED_LANGUAGES.forEach(langOpt => {
      const altUrl = buildAbsoluteLocalizedUrl(langOpt.code, tab, countryCode);
      const linkEl = document.createElement('link');
      linkEl.setAttribute('rel', 'alternate');
      linkEl.setAttribute('hreflang', langOpt.code);
      linkEl.setAttribute('href', altUrl);
      linkEl.setAttribute('data-dynamic-hreflang', 'true');
      document.head.appendChild(linkEl);
    });

    // Default Fallback x-default (International English representation)
    const xDefaultUrl = buildAbsoluteLocalizedUrl('en', tab, countryCode);
    const xDefaultLink = document.createElement('link');
    xDefaultLink.setAttribute('rel', 'alternate');
    xDefaultLink.setAttribute('hreflang', 'x-default');
    xDefaultLink.setAttribute('href', xDefaultUrl);
    xDefaultLink.setAttribute('data-dynamic-hreflang', 'true');
    document.head.appendChild(xDefaultLink);

  }, [language, tab, countryCode, currentPassport]);

  return null;
};
