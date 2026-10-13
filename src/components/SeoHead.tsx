/**
 * Dynamic Head Manager for International SEO, Hreflang, Canonical & JSON-LD Schema
 * Ensures Google Mobile-First Indexing crawls localized titles, descriptions,
 * explicit <link rel="alternate" hreflang="..." href="..."> across all 5 languages (TR, EN, DE, RU, ES),
 * <link rel="alternate" hreflang="x-default" href="..."> fallback, and 404 Soft-404 protection.
 */

import React, { useEffect } from 'react';
import { SupportedLanguage } from '../i18n/types';
import { TabKey } from './Navigation';
import {
  buildAbsoluteLocalizedUrl,
  getHreflangAlternatesForRoute
} from '../utils/seoRouter';
import { getCountryName } from '../data/passportData';
import { injectCountrySchema, getCountrySeoMeta } from '../utils/schemaGenerator';

interface SeoHeadProps {
  language: SupportedLanguage;
  tab: TabKey;
  countryCode: string | null;
  currentPassport: string;
  is404?: boolean;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  language,
  tab,
  countryCode,
  currentPassport,
  is404 = false
}) => {
  useEffect(() => {
    // 1. Update HTML lang attribute for screen readers and Mobile Googlebot
    document.documentElement.lang = language;
    document.documentElement.dir = 'ltr';

    // 2. Ensure Robots Meta Tag (Prevent Google Soft-404 on invalid routes)
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }

    if (is404) {
      const notFoundTitle =
        language === 'en'
          ? '404 Destination Not Found | Vizamigo'
          : language === 'de'
          ? '404 Reiseziel Nicht Gefunden | Vizamigo'
          : language === 'es'
          ? '404 Destino No Encontrado | Vizamigo'
          : language === 'ru'
          ? '404 Направление Не Найдено | Vizamigo'
          : '404 Rota veya Ülke Bulunamadı | Vizamigo';

      const notFoundDesc =
        language === 'en'
          ? 'The requested destination or travel dossier could not be found.'
          : language === 'de'
          ? 'Das angeforderte Reiseziel konnte nicht gefunden werden.'
          : language === 'es'
          ? 'El destino o dossier solicitado no se ha encontrado.'
          : language === 'ru'
          ? 'Запрошенная страница или страна не найдена.'
          : 'Aradığınız rota veya ülke dosyası sistemimizde bulunamadı.';

      document.title = notFoundTitle;
      robotsMeta.setAttribute('content', 'noindex, follow');

      const descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) {
        descMeta.setAttribute('content', notFoundDesc);
      }

      // Clean up all hreflang alternate tags on 404
      const existingHreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
      existingHreflangs.forEach((el) => el.remove());

      // Fallback portal schema
      injectCountrySchema(null, language, currentPassport);
      return;
    }

    // Live Page: Guarantee Indexability for Mobile Googlebot
    robotsMeta.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // 3. Compute dynamic title and description
    let pageTitle = 'Vizamigo - Akıllı Pasaport, Vize & Küresel Seyahat Rehberi';
    let metaDescription = '199 ülkenin güncel vize rejimleri, çifte pasaport mukayesesi, Schengen 90/180 gün kuralı hesaplayıcı, konsolosluk acil durum kriz masaları ve dijital göçebe rehberi.';

    if (countryCode) {
      const seoMeta = getCountrySeoMeta(countryCode, language, currentPassport);
      pageTitle = seoMeta.title;
      metaDescription = seoMeta.description;
    } else {
      switch (tab) {
        case 'plan':
          pageTitle = language === 'en'
            ? 'Dual Passport Synergy & Global Route Planner | Vizamigo'
            : language === 'de'
            ? 'Doppelpass-Synergie & Globaler Routenplaner | Vizamigo'
            : language === 'es'
            ? 'Sinergia de Doble Pasaporte y Planificador de Rutas | Vizamigo'
            : language === 'ru'
            ? 'Сравнение силы паспортов и планировщик маршрутов | Vizamigo'
            : 'Çifte Pasaport Vize Gücü Kıyaslama & Seyahat Rota Planlayıcı | Vizamigo';
          break;
        case 'track':
          pageTitle = language === 'en'
            ? 'Schengen 90/180 Day Rule Calculator (2026 Stay Tracker) | Vizamigo'
            : language === 'de'
            ? 'Schengen 90/180-Tage-Rechner (2026 Aufenthaltsrechner) | Vizamigo'
            : language === 'es'
            ? 'Calculadora Regla Schengen 90/180 Días (2026) | Vizamigo'
            : language === 'ru'
            ? 'Калькулятор Шенген 90/180 дней (2026) | Vizamigo'
            : 'Schengen 90/180 Gün Kuralı Hesaplayıcı (2026 Kalan Gün Sayacı) | Vizamigo';
          break;
        case 'nomad':
          pageTitle = language === 'en'
            ? 'Digital Nomad Visas & Remote Work Income Guide (2026) | Vizamigo'
            : language === 'de'
            ? 'Digital-Nomaden-Visa & Einkommensanforderungen (2026) | Vizamigo'
            : language === 'es'
            ? 'Visas para Nómadas Digitales y Requisitos de Ingresos (2026) | Vizamigo'
            : language === 'ru'
            ? 'Визы для цифровых кочевников и требования к доходу (2026) | Vizamigo'
            : 'Dijital Göçebe Vizeleri & Uzaktan Çalışma Gelir Şartları (2026) | Vizamigo';
          break;
        case 'profile':
        case 'consular':
          pageTitle = language === 'en'
            ? 'Consular Emergency Crisis Desk & Lost Passport Hotline | Vizamigo'
            : language === 'de'
            ? 'Konsularischer Krisenstab & Notruf-Hotline | Vizamigo'
            : language === 'es'
            ? 'Mesa de Crisis Consular y Teléfonos de Emergencia | Vizamigo'
            : language === 'ru'
            ? 'Консульский кризисный центр и экстренная помощь | Vizamigo'
            : 'Konsolosluk Kriz Masası, Acil Yardım & Kayıp Pasaport Hattı | Vizamigo';
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

    // 4. Update Meta Description
    let descMeta = document.querySelector('meta[name="description"]');
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', metaDescription);

    // 5. Update Canonical Tag & OpenGraph URL
    const currentCanonicalUrl = buildAbsoluteLocalizedUrl(language, tab, countryCode);
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentCanonicalUrl);

    const ogUrlMeta = document.querySelector('meta[property="og:url"]');
    if (ogUrlMeta) {
      ogUrlMeta.setAttribute('content', currentCanonicalUrl);
    }

    // 6. Replace ALL <link rel="alternate" hreflang="..."> tags in <head>
    // so there are zero stale root tags when navigating to /tr/country/TH, /ru/country/TH, etc.
    const existingHreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflangs.forEach((el) => el.remove());

    const hreflangAlternates = getHreflangAlternatesForRoute(tab, countryCode);
    hreflangAlternates.forEach((alt) => {
      const linkEl = document.createElement('link');
      linkEl.setAttribute('rel', 'alternate');
      linkEl.setAttribute('hreflang', alt.hreflang);
      linkEl.setAttribute('href', alt.href);
      linkEl.setAttribute('data-dynamic-hreflang', 'true');
      document.head.appendChild(linkEl);
    });

    // 7. Inject or Update Schema.org (JSON-LD) Microdata
    injectCountrySchema(countryCode, language, currentPassport);

  }, [language, tab, countryCode, currentPassport, is404]);

  return null;
};
