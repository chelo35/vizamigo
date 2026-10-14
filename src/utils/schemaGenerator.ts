/**
 * Programmatic Schema.org (JSON-LD) Generator for Vizamigo
 * Combines @type: 'TouristDestination', @type: 'TouristTrip', @type: 'FAQPage', and @type: 'BreadcrumbList'
 * Generates valid semantic structured microdata for Google Mobile Search, Rich Results, and Featured Snippets.
 */

import { SupportedLanguage } from '../i18n/types';
import { getCountryName } from '../data/passportData';
import { getPassportItems } from '../utils/calculator';
import { buildAbsoluteLocalizedUrl, BASE_URL } from './seoRouter';
import { INFO } from '../data/passportData';

export interface SchemaGeneratorOptions {
  countryCode: string;
  language: SupportedLanguage;
  currentPassport?: string;
}

/**
 * Returns formatted stay duration based on country item and dataset
 */
export function getStayDurationText(
  vRaw: string,
  cat: string,
  language: SupportedLanguage
): string {
  // If v is a number, e.g. "90", "30", "180"
  if (/^\d+$/.test(vRaw)) {
    const days = vRaw;
    switch (language) {
      case 'tr': return `${days} Gün`;
      case 'en': return `${days} Days`;
      case 'de': return `${days} Tage`;
      case 'es': return `${days} Días`;
      case 'ru': return `${days} дней`;
    }
  }

  if (cat === 'id') {
    switch (language) {
      case 'tr': return '90 Gün (Çipli Kimlikle)';
      case 'en': return '90 Days (National ID Card)';
      case 'de': return '90 Tage (Personalausweis)';
      case 'es': return '90 Días (DNI / Tarjeta de Identidad)';
      case 'ru': return '90 дней (по удостоверению личности)';
    }
  }

  if (cat === 'free') {
    switch (language) {
      case 'tr': return '90 Güne Kadar Vizesiz';
      case 'en': return 'Up to 90 Days Visa-Free';
      case 'de': return 'Bis zu 90 Tage Visumfrei';
      case 'es': return 'Hasta 90 Días Sin Visado';
      case 'ru': return 'До 90 дней без визы';
    }
  }

  if (cat === 'voa') {
    switch (language) {
      case 'tr': return '30 Gün (Kapıda Vize)';
      case 'en': return '30 Days (Visa on Arrival)';
      case 'de': return '30 Tage (Visum bei Ankunft)';
      case 'es': return '30 Días (Visado a la Llegada)';
      case 'ru': return '30 дней (виза по прибытии)';
    }
  }

  if (cat === 'evisa') {
    switch (language) {
      case 'tr': return '30-90 Gün (Online e-Vize)';
      case 'en': return '30-90 Days (Online eVisa)';
      case 'de': return '30-90 Tage (Elektronisches Visum)';
      case 'es': return '30-90 Días (Visado Electrónico)';
      case 'ru': return '30-90 дней (электронная виза)';
    }
  }

  if (cat === 'eta') {
    switch (language) {
      case 'tr': return '90 Gün (Elektronik İzin - ETA)';
      case 'en': return '90 Days (Electronic Travel Authorization)';
      case 'de': return '90 Tage (Elektronische Einreiseerlaubnis)';
      case 'es': return '90 Días (Autorización Electrónica - ETA)';
      case 'ru': return '90 дней (электронное разрешение - ETA)';
    }
  }

  // Fallback for visa required
  switch (language) {
    case 'tr': return 'Konsolosluk Vizesi ile';
    case 'en': return 'Consular Visa Required';
    case 'de': return 'Konsularvisum erforderlich';
    case 'es': return 'Visado Consular Requerido';
    case 'ru': return 'Требуется консульская виза';
  }
}

/**
 * Generates concise direct answer text targeted at Google Mobile Featured Snippet position 0
 */
export function generateDirectAnswerSnippet(
  countryName: string,
  passportName: string,
  cat: string,
  stayDurationText: string,
  hasIdEntry: boolean,
  language: SupportedLanguage
): string {
  switch (language) {
    case 'tr': {
      if (cat === 'free' || cat === 'id') {
        const idClause = hasIdEntry ? ' ve yeni tip çipli kimlik kartıyla' : '';
        return `2026 yılı güncel sınır kurallarına göre ${countryName}, ${passportName} pasaportu sahipleri için vizesizdir${idClause}. Ziyaretçiler tek seferde ${stayDurationText} boyunca vizesiz kalabilir. Giriş için en az 6 ay geçerli pasaport ve dönüş seyahat bileti ibraz edilmelidir.`;
      }
      if (cat === 'voa') {
        return `2026 yılı kurallarına göre ${countryName}, ${passportName} pasaportu sahiplerine sınır kapısında veya havalimanında varışta vize (Visa on Arrival) vermektedir. İzin verilen kalış süresi ${stayDurationText} olup geçerli pasaport ve harç bedeli gereklidir.`;
      }
      if (cat === 'evisa') {
        return `2026 yılı kurallarına göre ${countryName}, ${passportName} vatandaşları için resmi internet portalı üzerinden online e-Vize uygulamaktadır. Başvuru ortalama 24-72 saatte sonuçlanır ve ${stayDurationText} seyahat izni tanır.`;
      }
      if (cat === 'eta') {
        return `2026 yılı kurallarına göre ${countryName}, ${passportName} vatandaşları için uçuştan en az 72 saat önce alınması gereken Elektronik Seyahat İzni (ETA) şartı aramaktadır. İzin verilen süre ${stayDurationText} kadardır.`;
      }
      return `2026 yılı kurallarına göre ${countryName}, ${passportName} pasaportu sahiplerinden seyahat öncesinde diplomatik misyon veya vize başvuru merkezi üzerinden konsolosluk vizesi talep etmektedir. Randevu seyahatten 4-6 hafta önce planlanmalıdır.`;
    }

    case 'de': {
      if (cat === 'free' || cat === 'id') {
        return `Stand 2026 ist die Einreise nach ${countryName} für Inhaber eines ${passportName}-Reisepasses visumfrei. Reisende dürfen sich bis zu ${stayDurationText} ohne Visum im Land aufhalten. Bei der Einreise ist ein mindestens 6 Monate gültiger Reisepass sowie ein Rückflugticket vorzulegen.`;
      }
      if (cat === 'voa') {
        return `Stand 2026 erhalten Inhaber eines ${passportName}-Reisepasses für ${countryName} ein Visum bei der Ankunft (Visa on Arrival). Der erlaubte Aufenthalt beträgt ${stayDurationText}; ein gültiger Reisepass sowie Bargeld/Karte für die Gebühr sind erforderlich.`;
      }
      if (cat === 'evisa') {
        return `Stand 2026 verlangt ${countryName} von ${passportName}-Staatsbürgern ein Online-eVisa vor Reiseantritt. Die Genehmigung erfolgt in der Regel innerhalb von 24–72 Stunden und ermöglicht einen Aufenthalt von ${stayDurationText}.`;
      }
      if (cat === 'eta') {
        return `Stand 2026 benötigen ${passportName}-Staatsbürger eine elektronische Reisegenehmigung (ETA) mindestens 72 Stunden vor dem Abflug nach ${countryName}. Der erlaubte Aufenthalt beträgt ${stayDurationText}.`;
      }
      return `Stand 2026 ist für die Einreise nach ${countryName} mit einem ${passportName}-Pass ein reguläres Konsularvisum erforderlich. Der Antrag sollte 4–6 Wochen vor Reisebeginn bei der zuständigen Auslandsvertretung gestellt werden.`;
    }

    case 'es': {
      if (cat === 'free' || cat === 'id') {
        return `A partir de 2026, la entrada a ${countryName} para titulares de pasaporte de ${passportName} está exenta de visado. Los viajeros pueden permanecer hasta ${stayDurationText} sin visa. Se requiere pasaporte con vigencia mínima de 6 meses y billete de regreso.`;
      }
      if (cat === 'voa') {
        return `A partir de 2026, ${countryName} otorga visado a la llegada (Visa on Arrival) a los ciudadanos con pasaporte de ${passportName}. La estancia autorizada es de ${stayDurationText}, requiriendo pasaporte vigente y pago de tasa en frontera.`;
      }
      if (cat === 'evisa') {
        return `A partir de 2026, ${countryName} exige a los ciudadanos con pasaporte de ${passportName} tramitar un visado electrónico (eVisa) en línea antes del viaje. La autorización permite estancias de ${stayDurationText}.`;
      }
      if (cat === 'eta') {
        return `A partir de 2026, ${countryName} requiere una Autorización Electrónica de Viaje (ETA) solicitada al menos 72 horas antes del vuelo. El periodo máximo de estancia es de ${stayDurationText}.`;
      }
      return `A partir de 2026, ${countryName} exige a los titulares de pasaporte de ${passportName} tramitar un visado consular antes del viaje a través de la embajada o centro oficial de visados.`;
    }

    case 'ru': {
      if (cat === 'free' || cat === 'id') {
        return `По состоянию на 2026 год въезд в ${countryName} для владельцев паспортов (${passportName}) является безвизовым. Разрешенный срок пребывания составляет до ${stayDurationText}. При въезде требуется паспорт со сроком действия не менее 6 месяцев и обратный билет.`;
      }
      if (cat === 'voa') {
        return `По состоянию на 2026 год граждане с паспортом (${passportName}) могут получить визу по прибытии (Visa on Arrival) в ${countryName}. Разрешенный срок пребывания составляет ${stayDurationText}.`;
      }
      if (cat === 'evisa') {
        return `По состоянию на 2026 год для въезда в ${countryName} гражданам с паспортом (${passportName}) требуется оформить электронную визу (eVisa) онлайн. Разрешенный срок пребывания: ${stayDurationText}.`;
      }
      if (cat === 'eta') {
        return `По состоянию на 2026 год для поездки в ${countryName} требуется электронное разрешение (ETA), оформленное минимум за 72 часа до вылета. Срок пребывания: ${stayDurationText}.`;
      }
      return `По состоянию на 2026 год для въезда в ${countryName} с паспортом (${passportName}) необходимо заранее получить консульскую визу через посольство или визовый центр.`;
    }

    // Default English
    default: {
      if (cat === 'free' || cat === 'id') {
        return `As of 2026, travel to ${countryName} is visa-free for ${passportName} passport holders. Eligible travelers may stay up to ${stayDurationText} without a visa. A passport valid for at least 6 months and proof of return travel are required upon entry.`;
      }
      if (cat === 'voa') {
        return `As of 2026, ${countryName} grants a Visa on Arrival to ${passportName} passport holders at authorized border checkpoints. The permitted stay is ${stayDurationText}, requiring a valid passport and entry fee payment.`;
      }
      if (cat === 'evisa') {
        return `As of 2026, ${countryName} requires ${passportName} passport holders to obtain an official electronic visa (eVisa) prior to departure. Processing takes 24-72 hours and grants up to ${stayDurationText} stay.`;
      }
      if (cat === 'eta') {
        return `As of 2026, ${countryName} enforces an Electronic Travel Authorization (ETA) required at least 72 hours prior to boarding. Permitted duration of stay is up to ${stayDurationText}.`;
      }
      return `As of 2026, a traditional consular visa is required for ${passportName} passport holders traveling to ${countryName}. Applications should be submitted to the embassy or visa center 4-6 weeks prior to travel.`;
    }
  }
}

export interface CountrySeoMeta {
  title: string;
  description: string;
  h1: string;
  voiceQuestion: string;
}

export interface CountrySectionHeadings {
  h1: string;
  currencyH2: string;
  clockWeatherH2: string;
  internetEsimH2: string;
  transportTaxiH2: string;
  itineraryRouteH2: string;
  practicalEtiquetteH2: string;
  budgetAccommodationH2: string;
  transitRulesH2: string;
  passportSynergyH2: string;
  geographyMapH2: string;
}

/**
 * Returns natural search H1, Title, and Meta Description for country detail across 5 languages
 */
export function getCountrySeoMeta(
  countryCode: string,
  language: SupportedLanguage,
  currentPassport: string = 'TR'
): CountrySeoMeta {
  const code = countryCode.toUpperCase();
  const countryName = getCountryName(code, language);
  const passportName = getCountryName(currentPassport, language);
  const voiceQuestion = getMobileVoiceQuestion(countryName, passportName, language);
  const h1 = getCountryNaturalH1(countryName, language);

  const passportItems = getPassportItems(currentPassport);
  const item = passportItems.find(i => i.c === code) || { c: code, v: 'v', cat: 'visa' as const, id: false };
  const stayDuration = getStayDurationText(item.v, item.cat, language);
  const directAnswer = generateDirectAnswerSnippet(
    countryName,
    passportName,
    item.cat,
    stayDuration,
    item.id,
    language
  );

  return {
    title: `${voiceQuestion} | Vizamigo`,
    description: directAnswer,
    h1,
    voiceQuestion
  };
}

/**
 * Returns natural mobile question & search-intent H2 headings for all country detail widgets
 */
export function getCountrySectionHeadings(
  countryName: string,
  language: SupportedLanguage
): CountrySectionHeadings {
  const h1 = getCountryNaturalH1(countryName, language);

  switch (language) {
    case 'tr':
      return {
        h1,
        currencyH2: `${countryName} Para Birimi ve Güncel Döviz Kurları (USD/EUR/TRY)`,
        clockWeatherH2: `${countryName} Yerel Saati, Hava Durumu ve İklim Rehberi`,
        internetEsimH2: `${countryName} İnternet Hızı, eSIM ve Mobil Hat Rehberi`,
        transportTaxiH2: `${countryName} Ulaşım, Havalimanı Transferi ve Taksi Uygulamaları`,
        itineraryRouteH2: `${countryName} Gezi Rotası, Popüler Şehirler ve Turistik Duraklar`,
        practicalEtiquetteH2: `${countryName} Priz Tipi, Bahşiş Kültürü ve Yerel Kurallar`,
        budgetAccommodationH2: `${countryName} Günlük Seyahat Bütçesi, Konaklama ve Uçuş Rehberi`,
        transitRulesH2: `${countryName} Havalimanı Transit Geçiş ve Aktarma Vizesi Kuralları`,
        passportSynergyH2: `${countryName} Vize Politikası ve Pasaport Karşılaştırma Matrisi`,
        geographyMapH2: `${countryName} Coğrafi Konumu, Başkenti ve Harita Rehberi`
      };
    case 'de':
      return {
        h1,
        currencyH2: `${countryName} Währung und Aktuelle Wechselkurse (USD/EUR/TRY)`,
        clockWeatherH2: `${countryName} Ortszeit, Zeitzone und Aktuelles Wetter`,
        internetEsimH2: `${countryName} Internetgeschwindigkeit, eSIM & Mobilfunk`,
        transportTaxiH2: `${countryName} Transport, Flughafentransfer & Taxi-Apps`,
        itineraryRouteH2: `${countryName} Reiseroute, Top-Städte & Sehenswürdigkeiten`,
        practicalEtiquetteH2: `${countryName} Steckdosentyp, Trinkgeld & Lokale Etikette`,
        budgetAccommodationH2: `${countryName} Reisebudget, Unterkunft & Flugoptionen`,
        transitRulesH2: `${countryName} Flughafentransit & Umsteigebestimmungen`,
        passportSynergyH2: `${countryName} Visapolitik & Reisepass-Vergleichsmatrix`,
        geographyMapH2: `${countryName} Geografische Lage, Hauptstadt & Karte`
      };
    case 'es':
      return {
        h1,
        currencyH2: `Moneda de ${countryName} y Tipos de Cambio Actuales (USD/EUR/TRY)`,
        clockWeatherH2: `Hora Local, Zona Horaria y Clima en ${countryName}`,
        internetEsimH2: `Velocidad de Internet, eSIM y Datos Móviles en ${countryName}`,
        transportTaxiH2: `Transporte, Traslado al Aeropuerto y Apps de Taxi en ${countryName}`,
        itineraryRouteH2: `Itinerario de Viaje, Ciudades Populares y Ruta por ${countryName}`,
        practicalEtiquetteH2: `Enchufes, Propinas y Costumbres Locales en ${countryName}`,
        budgetAccommodationH2: `Presupuesto Diario, Alojamiento y Vuelos a ${countryName}`,
        transitRulesH2: `Reglas de Tránsito Aeroportuario y Escalas en ${countryName}`,
        passportSynergyH2: `Política de Visados y Comparativa de Pasaportes para ${countryName}`,
        geographyMapH2: `Ubicación Geográfica, Capital y Mapa de ${countryName}`
      };
    case 'ru':
      return {
        h1,
        currencyH2: `Валюта ${countryName} и актуальные курсы обмена (USD/EUR/TRY)`,
        clockWeatherH2: `Местное время, часовой пояс и погода в ${countryName}`,
        internetEsimH2: `Скорость интернета, eSIM и мобильная связь в ${countryName}`,
        transportTaxiH2: `Транспорт, трансфер из аэропорта и такси в ${countryName}`,
        itineraryRouteH2: `Маршрут путешествия, популярные города и гид по ${countryName}`,
        practicalEtiquetteH2: `Розетки, чаевые и местные правила в ${countryName}`,
        budgetAccommodationH2: `Дневной бюджет, проживание и авиабилеты в ${countryName}`,
        transitRulesH2: `Правила транзита в аэропорту и пересадки в ${countryName}`,
        passportSynergyH2: `Визовая политика и сравнение паспортов для ${countryName}`,
        geographyMapH2: `Географическое положение, столица и карта ${countryName}`
      };
    default:
      return {
        h1,
        currencyH2: `${countryName} Currency & Live Exchange Rates (USD/EUR/TRY)`,
        clockWeatherH2: `${countryName} Local Time, Timezone & Weather Guide`,
        internetEsimH2: `${countryName} Internet Speed, eSIM & Mobile Connectivity`,
        transportTaxiH2: `${countryName} Airport Transit, Ride-Hailing & Taxi Apps`,
        itineraryRouteH2: `${countryName} Travel Itinerary, Popular Cities & Route Guide`,
        practicalEtiquetteH2: `${countryName} Power Plugs, Tipping & Cultural Etiquette`,
        budgetAccommodationH2: `${countryName} Daily Travel Costs, Hotels & Flights`,
        transitRulesH2: `${countryName} Airport Transit & Layover Visa Rules`,
        passportSynergyH2: `${countryName} Visa Policy & Passport Comparison Matrix`,
        geographyMapH2: `${countryName} Geographic Location, Capital & Map Intelligence`
      };
  }
}

/**
 * Returns voice-intent mobile search question for country
 */
export function getMobileVoiceQuestion(
  countryName: string,
  passportName: string,
  language: SupportedLanguage,
  currentPassport: string = 'TR'
): string {
  switch (language) {
    case 'tr': {
      const nationalityTerm = currentPassport === 'TR' ? 'Türk Vatandaşlarından' : `${passportName} Vatandaşlarından`;
      return `${countryName} ${nationalityTerm} Vize İstiyor mu? (2026)`;
    }
    case 'en':
      return `Do I Need a Visa for ${countryName}? (2026 Entry Rules)`;
    case 'de':
      return `Brauche ich ein Visum für ${countryName}? (2026 Einreisebestimmungen)`;
    case 'es':
      return `¿Necesito Visa para ${countryName}? (Requisitos de Entrada 2026)`;
    case 'ru':
      return `Нужна ли виза в ${countryName}? (Правила въезда 2026)`;
  }
}

/**
 * Returns natural search H1 for country detail
 */
export function getCountryNaturalH1(
  countryName: string,
  language: SupportedLanguage
): string {
  switch (language) {
    case 'tr':
      return `${countryName} Vize Rejimi, Kalış Süreleri ve Rota Rehberi`;
    case 'en':
      return `${countryName} Visa Policy, Nomad Stay Limits & Itinerary`;
    case 'de':
      return `${countryName} Visabestimmungen, Aufenthaltsdauer & Reiseführer`;
    case 'es':
      return `Política de Visados, Límites de Estancia e Itinerario de ${countryName}`;
    case 'ru':
      return `Визовый режим в ${countryName}, сроки пребывания и гид`;
  }
}

/**
 * Generates portal fallback schema when no specific country is selected
 */
export function generatePortalJsonLd(language: SupportedLanguage): object {
  const portalUrl = `${BASE_URL}/${language}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${portalUrl}#website`,
        url: portalUrl,
        name: 'Vizamigo',
        inLanguage: language,
        description: 'Global Visa Policy, Passport Comparison & Digital Nomad Intelligence Platform',
        publisher: {
          '@type': 'Organization',
          name: 'Vizamigo',
          url: BASE_URL,
          logo: `${BASE_URL}/favicon.ico`
        }
      },
      {
        '@type': 'Organization',
        '@id': `${BASE_URL}#organization`,
        name: 'Vizamigo',
        url: BASE_URL,
        logo: `${BASE_URL}/favicon.ico`
      }
    ]
  };
}

/**
 * Dynamically updates or injects the localized Schema.org JSON-LD tag inside HTML <head>
 * Dynamically imports countrySchemaGenerator so heavy itineraries and encyclopedias
 * are never included in the initial entry bundle!
 */
export function injectCountrySchema(
  countryCode: string | null,
  language: SupportedLanguage,
  currentPassport: string = 'TR'
): void {
  if (typeof document === 'undefined') return;

  const SCRIPT_ID = 'vizamigo-jsonld-schema';
  let scriptEl = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

  if (!countryCode) {
    // Portal/Root: Fallback schema already exists in static index.html.
    // If a country-specific schema was injected earlier, remove it cleanly.
    if (scriptEl) {
      scriptEl.remove();
    }
    return;
  }

  // Load heavy country schema asynchronously
  import('./countrySchemaGenerator').then(({ generateCountryJsonLd }) => {
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = SCRIPT_ID;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    const schemaData = generateCountryJsonLd({ countryCode, language, currentPassport });
    scriptEl.textContent = JSON.stringify(schemaData, null, 2);
  }).catch(() => {});
}
