/**
 * Vizamigo Mobile Intent-Driven Meta & Semantic Structure Engine
 * 
 * Automates semantic question-based titles targeting mobile voice search & SERP snippets:
 *   - TR: "Arnavutluk Türk Vatandaşlarından Vize İstiyor mu? (2026)"
 *   - EN: "Do I Need a Visa for Albania? (2026 Entry Rules)"
 *   - DE: "Brauche ich ein Visum für Albanien? (2026 Einreisebestimmungen)"
 *   - ES: "¿Necesito Visa para Albania? (Requisitos de Entrada 2026)"
 *   - RU: "Нужна ли виза в Албанию? (Правила въезда 2026)"
 * 
 * Injects structured JSON-LD schemas compiling:
 *   - `@type: TouristDestination`
 *   - `@type: TouristTrip`
 *   - `@type: FAQPage` (Rich Snippet Instant Answer)
 *   - `@type: BreadcrumbList`
 * 
 * Elegantly maps currency pairs, internet speeds, and visa validities so AI web crawlers
 * (Perplexity, ChatGPT, Google AI Overviews) instantly source Vizamigo.
 */

import { SupportedLanguage } from '../i18n/types';
import { TabKey } from '../components/Navigation';
import { getCountryName, VisaCategory } from '../data/passportData';
import { getPassportItems } from './calculator';
import { GEO_DATA } from '../data/geoData';
import { getCountryInsights } from '../data/countryInsights';
import { getVerifiedCountryRecord } from '../data/verifiedCountryData';
import {
  BASE_URL,
  buildAbsoluteLocalizedUrl,
  getHreflangAlternatesForRoute
} from './seoRouter';

export interface SeoMetaOptions {
  lang: SupportedLanguage;
  tab: TabKey;
  countryCode: string | null;
  passportCode: string;
}

const CURRENT_YEAR = new Date().getFullYear();

/**
 * Returns a human-friendly visa status label for search snippets.
 */
function getVisaStatusSummary(cat: VisaCategory, v: string | undefined, lang: SupportedLanguage): { label: string; stay: string } {
  const stayText = v && /^\d+$/.test(v)
    ? `${v} ${lang === 'tr' ? 'Gün' : lang === 'de' ? 'Tage' : lang === 'es' ? 'Días' : lang === 'ru' ? 'дней' : 'Days'}`
    : '';

  switch (cat) {
    case 'free':
    case 'id':
      return {
        label: lang === 'tr' ? 'Vizesiz Giriş' : lang === 'de' ? 'Visafrei' : lang === 'es' ? 'Sin Visa' : lang === 'ru' ? 'Безвизовый въезд' : 'Visa-Free',
        stay: stayText || (lang === 'tr' ? '90 Gün' : '90 Days')
      };
    case 'evisa':
      return {
        label: lang === 'tr' ? 'Elektronik Vize (e-Vize)' : lang === 'de' ? 'Elektronisches Visum (e-Visum)' : lang === 'es' ? 'Visa Electrónica (eVisa)' : lang === 'ru' ? 'Электронная виза (e-Visa)' : 'Electronic Visa (eVisa)',
        stay: stayText || (lang === 'tr' ? 'Online Başvuru' : 'Online Application')
      };
    case 'voa':
      return {
        label: lang === 'tr' ? 'Kapıda Vize (VoA)' : lang === 'de' ? 'Visum bei Ankunft (VoA)' : lang === 'es' ? 'Visa a la Llegada (VoA)' : lang === 'ru' ? 'Виза по прибытии' : 'Visa on Arrival (VoA)',
        stay: stayText || (lang === 'tr' ? 'Sınır Kapısında' : 'At Border')
      };
    case 'eta':
      return {
        label: lang === 'tr' ? 'Elektronik Seyahat İzni (eTA)' : lang === 'de' ? 'Elektronische Einreisegenehmigung (eTA)' : lang === 'es' ? 'Autorización Electrónica (eTA)' : lang === 'ru' ? 'Разрешение eTA' : 'Electronic Travel Authority (eTA)',
        stay: stayText || (lang === 'tr' ? 'Ön Onaylı' : 'Pre-Approval')
      };
    case 'visa':
    default:
      return {
        label: lang === 'tr' ? 'Konsolosluk Vizesi Zorunlu' : lang === 'de' ? 'Botschaftsvisum erforderlich' : lang === 'es' ? 'Requiere Visa Consular' : lang === 'ru' ? 'Требуется виза' : 'Consular Visa Required',
        stay: lang === 'tr' ? 'Önceden Vize Alınmalı' : 'Advance Visa Required'
      };
  }
}

/**
 * Builds semantic, question-based titles targeting mobile voice and search intents.
 */
export function buildSemanticTitle({ lang, tab, countryCode, passportCode }: SeoMetaOptions): string {
  if (countryCode) {
    const countryName = getCountryName(countryCode, lang);
    const isTurkishPassport = passportCode === 'TR';

    switch (lang) {
      case 'tr':
        return isTurkishPassport
          ? `${countryName} Türk Vatandaşlarından Vize İstiyor mu? (${CURRENT_YEAR}) | Vizamigo`
          : `${countryName} ${getCountryName(passportCode, 'tr')} Pasaportundan Vize İstiyor mu? (${CURRENT_YEAR}) | Vizamigo`;
      case 'de':
        return `Brauche ich ein Visum für ${countryName}? (${CURRENT_YEAR} Einreisebestimmungen) | Vizamigo`;
      case 'es':
        return `¿Necesito Visa para ${countryName}? (Requisitos de Entrada ${CURRENT_YEAR}) | Vizamigo`;
      case 'ru':
        return `Нужна ли виза в ${countryName}? (Правила въезда ${CURRENT_YEAR}) | Vizamigo`;
      case 'en':
      default:
        return `Do I Need a Visa for ${countryName}? (${CURRENT_YEAR} Entry Rules) | Vizamigo`;
    }
  }

  // Tool Tabs
  switch (tab) {
    case 'track':
      return lang === 'tr'
        ? `Schengen 90/180 Gün Kuralı Hesaplayıcı (${CURRENT_YEAR} Kalan Gün Sayacı) | Vizamigo`
        : lang === 'de'
        ? `Schengen 90/180-Tage-Rechner (${CURRENT_YEAR} Aufenthaltsrechner) | Vizamigo`
        : lang === 'es'
        ? `Calculadora Regla Schengen 90/180 Días (${CURRENT_YEAR}) | Vizamigo`
        : lang === 'ru'
        ? `Калькулятор Шенген 90/180 дней (${CURRENT_YEAR}) | Vizamigo`
        : `Schengen 90/180 Day Rule Calculator (${CURRENT_YEAR} Stay Tracker) | Vizamigo`;

    case 'plan':
      return lang === 'tr'
        ? `Çifte Pasaport Vize Gücü Kıyaslama & Seyahat Rota Planlayıcı | Vizamigo`
        : lang === 'de'
        ? `Doppelpass-Synergie & Globaler Routenplaner | Vizamigo`
        : lang === 'es'
        ? `Sinergia de Doble Pasaporte y Planificador de Rutas | Vizamigo`
        : lang === 'ru'
        ? `Сравнение силы паспортов и планировщик маршрутов | Vizamigo`
        : `Dual Passport Synergy & Global Route Planner | Vizamigo`;

    case 'nomad':
      return lang === 'tr'
        ? `Dijital Göçebe Vizeleri & Uzaktan Çalışma Gelir Şartları (${CURRENT_YEAR}) | Vizamigo`
        : lang === 'de'
        ? `Digital-Nomaden-Visa & Einkommensanforderungen (${CURRENT_YEAR}) | Vizamigo`
        : lang === 'es'
        ? `Visas para Nómadas Digitales y Requisitos de Ingresos (${CURRENT_YEAR}) | Vizamigo`
        : lang === 'ru'
        ? `Визы для цифровых кочевников и требования к доходу (${CURRENT_YEAR}) | Vizamigo`
        : `Digital Nomad Visas & Remote Work Income Guide (${CURRENT_YEAR}) | Vizamigo`;

    case 'consular':
      return lang === 'tr'
        ? `Konsolosluk Kriz Masası, Acil Yardım & Kayıp Pasaport Hattı | Vizamigo`
        : lang === 'de'
        ? `Konsularischer Krisenstab & Notruf-Hotline | Vizamigo`
        : lang === 'es'
        ? `Mesa de Crisis Consular y Teléfonos de Emergencia | Vizamigo`
        : lang === 'ru'
        ? `Консульский кризисный центр и экстренная помощь | Vizamigo`
        : `Consular Emergency Crisis Desk & Lost Passport Hotline | Vizamigo`;

    case 'profile':
      return lang === 'tr'
        ? `Gezgin Cüzdanı, Pasaport Profilleri & Güvenlik Kasası | Vizamigo`
        : lang === 'de'
        ? `Reise-Wallet & Pass-Profile | Vizamigo`
        : `Traveler Vault & Passport Profiles | Vizamigo`;

    case 'explore':
    default:
      return lang === 'tr'
        ? `Vizamigo - Akıllı Pasaport, Vize & Küresel Seyahat Rehberi (199 Ülke)`
        : lang === 'de'
        ? `Vizamigo - Intelligenter Pass- & Visum-Reiseführer (199 Länder)`
        : lang === 'es'
        ? `Vizamigo - Inteligencia Global de Pasaportes y Visas (199 Países)`
        : lang === 'ru'
        ? `Vizamigo - Умный гид по паспортам и визам (199 стран)`
        : `Vizamigo - Smart Passport, Visa & Global Travel Intelligence (199 Countries)`;
  }
}

/**
 * Builds semantic, mobile voice search and TL;DR snippet descriptions.
 */
export function buildSemanticDescription({ lang, tab, countryCode, passportCode }: SeoMetaOptions): string {
  if (countryCode) {
    const countryName = getCountryName(countryCode, lang);
    const passportName = getCountryName(passportCode, lang);

    let cat: VisaCategory = 'visa';
    let stayValue: string | undefined;
    try {
      const items = getPassportItems(passportCode);
      const matched = items.find((it: { c: string; cat: VisaCategory; v?: string }) => it.c === countryCode.toUpperCase());
      if (matched) {
        cat = matched.cat;
        stayValue = matched.v;
      }
    } catch {}

    const status = getVisaStatusSummary(cat, stayValue, lang);
    const insights = getCountryInsights(countryCode, lang);
    const speed = insights.internet.mobileSpeedMbps;
    const currency = insights.currency;
    const plug = insights.plugType;

    switch (lang) {
      case 'tr':
        return `${countryName} için ${passportName} pasaportu vize şartı: ${status.label} (${status.stay}). Para birimi ${currency}, priz ${plug}, mobil internet ~${speed} Mbps ve acil durum hatları.`;
      case 'de':
        return `Einreisebestimmungen für ${countryName} mit ${passportName}-Pass: ${status.label} (${status.stay}). Währung ${currency}, Steckdosen ${plug}, mobiles Internet ~${speed} Mbps und Notrufnummern.`;
      case 'es':
        return `Requisitos de entrada para ${countryName} con pasaporte ${passportName}: ${status.label} (${status.stay}). Moneda ${currency}, enchufes ${plug}, velocidad móvil ~${speed} Mbps y números de emergencia.`;
      case 'ru':
        return `Правила въезда в ${countryName} для владельцев паспорта ${passportName}: ${status.label} (${status.stay}). Валюта ${currency}, розетки ${plug}, мобильный интернет ~${speed} Мбит/с.`;
      case 'en':
      default:
        return `Entry requirements for ${countryName} with ${passportName} passport: ${status.label} (${status.stay}). Currency ${currency}, sockets ${plug}, mobile speed ~${speed} Mbps and emergency hotlines.`;
    }
  }

  return lang === 'tr'
    ? '199 ülkenin güncel vize rejimleri, çifte pasaport sinerjisi, Schengen 90/180 gün kuralı hesaplayıcı ve konsolosluk acil durum kriz masaları.'
    : 'Real-time entry rules for 199 destinations, dual passport synergy calculator, Schengen 90/180 stay tracker, and consular emergency support.';
}

/**
 * Builds rich structured JSON-LD schemas compiling:
 *   - `@type: TouristDestination`
 *   - `@type: TouristTrip`
 *   - `@type: FAQPage` (Voice search & Rich Snippet answer)
 *   - `@type: BreadcrumbList`
 */
export function buildStructuredDataJsonLd({ lang, tab, countryCode, passportCode }: SeoMetaOptions): string {
  const canonicalUrl = buildAbsoluteLocalizedUrl(lang, tab, countryCode);

  if (countryCode) {
    const countryName = getCountryName(countryCode, lang);
    const passportName = getCountryName(passportCode, lang);
    const geo = GEO_DATA[countryCode.toUpperCase()];
    const insights = getCountryInsights(countryCode, lang);
    const verified = getVerifiedCountryRecord(countryCode);

    let cat: VisaCategory = 'visa';
    let stayValue: string | undefined;
    try {
      const items = getPassportItems(passportCode);
      const matched = items.find((it: { c: string; cat: VisaCategory; v?: string }) => it.c === countryCode.toUpperCase());
      if (matched) {
        cat = matched.cat;
        stayValue = matched.v;
      }
    } catch {}

    const status = getVisaStatusSummary(cat, stayValue, lang);
    const mobileSpeed = verified?.connectivity?.mobile_down_mbps?.value || insights.internet.mobileSpeedMbps;
    const currencyCode = verified?.currency?.value || insights.currency;
    const plugType = verified ? verified.electricity.plug_types.value.join(', ') : insights.plugType;
    const emergencyPolice = verified?.emergency?.police?.value || insights.safety.emergencyNumbers.police;

    const questionTitle = lang === 'tr'
      ? `${countryName} Türk vatandaşlarından vize istiyor mu? (2026)`
      : `Do I need a visa for ${countryName}? (2026 Entry Rules)`;

    const answerText = lang === 'tr'
      ? `${countryName} için ${passportName} pasaportu kuralı: ${status.label} (${status.stay}). Yerel para birimi ${currencyCode}, elektrik ${plugType} ve acil polis hattı ${emergencyPolice}.`
      : `Entry requirements for ${countryName} with ${passportName} passport: ${status.label} (${status.stay}). Local currency ${currencyCode}, socket type ${plugType}, emergency police ${emergencyPolice}.`;

    const schemaGraph = {
      '@context': 'https://schema.org',
      '@graph': [
        // 1. TouristDestination Schema
        {
          '@type': 'TouristDestination',
          '@id': `${canonicalUrl}#destination`,
          name: countryName,
          description: buildSemanticDescription({ lang, tab, countryCode, passportCode }),
          touristType: 'International Travelers',
          currenciesAccepted: currencyCode,
          publicAccess: true,
          address: {
            '@type': 'PostalAddress',
            addressCountry: countryCode.toUpperCase()
          },
          ...(geo ? {
            geo: {
              '@type': 'GeoCoordinates',
              latitude: geo.lat,
              longitude: geo.lng
            }
          } : {})
        },

        // 2. TouristTrip Schema mapping itinerary, internet speed & visa duration
        {
          '@type': 'TouristTrip',
          '@id': `${canonicalUrl}#trip`,
          name: `${countryName} Travel & Visa Intelligence ${CURRENT_YEAR}`,
          touristType: `${passportName} Passport Holders`,
          itinerary: {
            '@type': 'ItemList',
            numberOfItems: 4,
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: `Visa Status: ${status.label}`
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: `Maximum Stay: ${status.stay}`
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: `Mobile Connectivity: ~${mobileSpeed} Mbps`
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: `Power & Sockets: ${plugType}`
              }
            ]
          }
        },

        // 3. FAQPage Schema for Google Rich Snippets & Voice Search
        {
          '@type': 'FAQPage',
          '@id': `${canonicalUrl}#faq`,
          mainEntity: [
            {
              '@type': 'Question',
              name: questionTitle,
              acceptedAnswer: {
                '@type': 'Answer',
                text: answerText
              }
            }
          ]
        },

        // 4. BreadcrumbList Schema
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonicalUrl}#breadcrumbs`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Vizamigo',
              item: `${BASE_URL}/`
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: lang.toUpperCase(),
              item: `${BASE_URL}/${lang}`
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: countryName,
              item: canonicalUrl
            }
          ]
        }
      ]
    };

    return JSON.stringify(schemaGraph, null, 2);
  }

  // Generic Application & Website Schema for root / tools
  const defaultSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${BASE_URL}/#app`,
        name: 'Vizamigo',
        url: canonicalUrl,
        applicationCategory: 'TravelApplication',
        operatingSystem: 'All'
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE_URL}/#website`,
        url: `${BASE_URL}/`,
        name: 'Vizamigo',
        inLanguage: ['tr-TR', 'en-US', 'de-DE', 'es-ES', 'ru-RU']
      }
    ]
  };

  return JSON.stringify(defaultSchema, null, 2);
}

/**
 * Injects and updates all dynamic metadata, canonical links, hreflang tags,
 * and JSON-LD structured data scripts in the document <head>.
 */
export function injectDynamicSeoMeta(options: SeoMetaOptions): void {
  if (typeof document === 'undefined') return;

  const title = buildSemanticTitle(options);
  const description = buildSemanticDescription(options);
  const canonicalUrl = buildAbsoluteLocalizedUrl(options.lang, options.tab, options.countryCode);
  const alternates = getHreflangAlternatesForRoute(options.tab, options.countryCode);
  const jsonLd = buildStructuredDataJsonLd(options);

  // 1. Update Title
  document.title = title;

  // 2. Update Primary Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // 3. Update Open Graph Meta
  const setOgMeta = (prop: string, val: string) => {
    let el = document.querySelector(`meta[property="${prop}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', prop);
      document.head.appendChild(el);
    }
    el.setAttribute('content', val);
  };

  setOgMeta('og:title', title);
  setOgMeta('og:description', description);
  setOgMeta('og:url', canonicalUrl);

  // 4. Update Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  // 5. Update Hreflang Alternate Links
  document.querySelectorAll('link[rel="alternate"][data-dynamic-hreflang="true"]').forEach((el) => el.remove());

  alternates.forEach((alt) => {
    const linkEl = document.createElement('link');
    linkEl.setAttribute('rel', 'alternate');
    linkEl.setAttribute('hreflang', alt.hreflang);
    linkEl.setAttribute('href', alt.href);
    linkEl.setAttribute('data-dynamic-hreflang', 'true');
    document.head.appendChild(linkEl);
  });

  // 6. Update JSON-LD Structured Data Script
  let jsonLdScript = document.getElementById('vizamigo-seo-jsonld') as HTMLScriptElement | null;
  if (!jsonLdScript) {
    jsonLdScript = document.createElement('script');
    jsonLdScript.id = 'vizamigo-seo-jsonld';
    jsonLdScript.type = 'application/ld+json';
    document.head.appendChild(jsonLdScript);
  }
  jsonLdScript.textContent = jsonLd;

  // 7. Update HTML lang attribute
  document.documentElement.lang = options.lang;
}
