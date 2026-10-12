/**
 * Dynamic Multilingual SEO Head Manager for Vizamigo
 * Automatically generates and maintains canonical tags, dynamic 5-language hreflang alternates,
 * x-default fallbacks, mobile voice search titles, intent-driven meta descriptions,
 * and Schema.org JSON-LD structured data in compliance with Google Search Console standards.
 */

import React, { useEffect } from 'react';
import { SupportedLanguage } from '../i18n/types';
import { SUPPORTED_LANGUAGES } from '../i18n';
import { TabKey } from './Navigation';
import { buildAbsoluteLocalizedUrl, BASE_URL } from '../utils/seoRouter';
import { getCountryName } from '../data/passportData';
import { injectCountrySchema } from '../utils/schemaGenerator';

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
      const code = countryCode.toUpperCase();
      const countryName = getCountryName(code, language);
      const passportName = getCountryName(currentPassport, language);

      if (language === 'en') {
        pageTitle = `Do I Need a Visa for ${countryName}? (2026 Entry Rules) | Vizamigo`;
        metaDescription = `Do you need a visa for ${countryName} in 2026? Check official visa requirements, maximum stay duration, passport validity rules, and complete travel guide.`;
      } else if (language === 'de') {
        pageTitle = `Braucht man ein Visum für ${countryName}? (Einreisebestimmungen 2026) | Vizamigo`;
        metaDescription = `Braucht man 2026 ein Visum für ${countryName}? Offizielle Visabestimmungen, maximale Aufenthaltsdauer, Gültigkeitsregeln für Reisepässe und Reiseführer.`;
      } else if (language === 'es') {
        pageTitle = `¿Se necesita visa para ${countryName}? (Reglas de Entrada 2026) | Vizamigo`;
        metaDescription = `¿Se necesita visado para ${countryName} en 2026? Requisitos oficiales, duración máxima de estancia, validez del pasaporte y guía de viaje.`;
      } else if (language === 'ru') {
        pageTitle = `Нужна ли виза в ${countryName}? (Правила въезда 2026) | Vizamigo`;
        metaDescription = `Нужна ли виза в ${countryName} в 2026 году? Актуальные правила въезда, разрешенный срок пребывания, требования к паспорту и гид.`;
      } else {
        const nationalityTerm = currentPassport === 'TR' ? 'Türk Vatandaşlarından' : `${passportName} Vatandaşlarından`;
        pageTitle = `${countryName} ${nationalityTerm} Vize İstiyor mu? (2026 Kuralları) | Vizamigo`;
        metaDescription = `2026 güncel kurallarıyla ${countryName} vize istiyor mu? Kalış süreleri, pasaport geçerlilik şartı, sınır kapısı kuralları ve 360° seyahat rehberi.`;
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
          pageTitle = language === 'en'
            ? 'Vizamigo - Global Visa Policy & Passport Mobility Guide'
            : language === 'de'
            ? 'Vizamigo - Weltweite Visabestimmungen & Reisepass-Guide'
            : language === 'es'
            ? 'Vizamigo - Política Global de Visados y Guía de Pasaportes'
            : language === 'ru'
            ? 'Vizamigo - Глобальный визовый режим и гид по паспортам'
            : 'Vizamigo - 199 Ülke Vize Rejimi ve Küresel Pasaport Rehberi';
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

    // 6. Inject or Update Schema.org (JSON-LD) Microdata
    injectCountrySchema(countryCode, language, currentPassport);

  }, [language, tab, countryCode, currentPassport]);

  return null;
};
