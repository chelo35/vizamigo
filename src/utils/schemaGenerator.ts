import { enArticle } from './passportBrief';
import { LANG_PASS } from '../data/passportPages';
import { ruIn, ruOf } from '../data/ruCases';
/**
 * Programmatic Schema.org (JSON-LD) Generator for Vizamigo
 * Combines @type: 'TouristDestination', @type: 'TouristTrip', @type: 'FAQPage', and @type: 'BreadcrumbList'
 * Generates valid semantic structured microdata for Google Mobile Search, Rich Results, and Featured Snippets.
 */

import { SupportedLanguage } from '../i18n/types';
import { getCountryName, etaName } from '../data/passportData';
import { getPassportItems } from '../utils/calculator';
import { buildAbsoluteLocalizedUrl, BASE_URL } from './seoRouter';
import { INFO } from '../data/passportData';
import { GEO_DATA } from '../data/geoData';
import { capitalName } from '../data/capitalNames';
import { SOCIALS, CONTACT_EMAIL } from '../data/socials';
import { topPlaces } from '../data/topPlaces';

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
      case 'pt': return `${days} dias`;
      case 'ru': return `${days} дней`;
    }
  }

  if (cat === 'id') {
    switch (language) {
      case 'tr': return '90 Gün (Çipli Kimlikle)';
      case 'en': return '90 Days (National ID Card)';
      case 'de': return '90 Tage (Personalausweis)';
      case 'es': return '90 Días (DNI / Tarjeta de Identidad)';
      case 'pt': return '90 dias (com documento de identidade)';
      case 'ru': return '90 дней (по удостоверению личности)';
    }
  }

  if (cat === 'free') {
    switch (language) {
      case 'tr': return '90 Güne Kadar Vizesiz';
      case 'en': return 'Up to 90 Days Visa-Free';
      case 'de': return 'Bis zu 90 Tage Visumfrei';
      case 'es': return 'Hasta 90 Días Sin Visado';
      case 'pt': return 'Até 90 dias sem visto';
      case 'ru': return 'До 90 дней без визы';
    }
  }

  if (cat === 'voa') {
    switch (language) {
      case 'tr': return '30 Gün (Kapıda Vize)';
      case 'en': return '30 Days (Visa on Arrival)';
      case 'de': return '30 Tage (Visum bei Ankunft)';
      case 'es': return '30 Días (Visado a la Llegada)';
      case 'pt': return '30 dias (visto na chegada)';
      case 'ru': return '30 дней (виза по прибытии)';
    }
  }

  if (cat === 'evisa') {
    switch (language) {
      case 'tr': return '30-90 Gün (Online e-Vize)';
      case 'en': return '30-90 Days (Online eVisa)';
      case 'de': return '30-90 Tage (Elektronisches Visum)';
      case 'es': return '30-90 Días (Visado Electrónico)';
      case 'pt': return '30-90 dias (visto eletrônico)';
      case 'ru': return '30-90 дней (электронная виза)';
    }
  }

  if (cat === 'eta') {
    switch (language) {
      case 'tr': return '90 Gün (Elektronik İzin - ETA)';
      case 'en': return '90 Days (Electronic Travel Authorization)';
      case 'de': return '90 Tage (Elektronische Einreiseerlaubnis)';
      case 'es': return '90 Días (Autorización Electrónica - ETA)';
      case 'pt': return '90 dias (autorização eletrônica - ETA)';
      case 'ru': return '90 дней (электронное разрешение - ETA)';
    }
  }

  // Fallback for visa required
  switch (language) {
    case 'tr': return 'Konsolosluk Vizesi ile';
    case 'en': return 'Consular Visa Required';
    case 'de': return 'Konsularvisum erforderlich';
    case 'es': return 'Visado Consular Requerido';
    case 'pt': return 'Visto consular obrigatório';
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
        return `2026 yılı güncel sınır kurallarına göre ${countryName}, ${passportName} pasaportu sahipleri için vizesizdir${idClause}. Ziyaretçiler tek seferde ${stayDurationText} boyunca vizesiz kalabilir. Pasaportun kalan geçerlilik süresi ve dönüş bileti şartı ülkeye göre değişir; yola çıkmadan resmî kaynaktan kontrol edin.`;
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
        return `Stand 2026 ist die Einreise nach ${countryName} für Inhaber eines ${passportName}-Reisepasses visumfrei. Reisende dürfen sich bis zu ${stayDurationText} ohne Visum im Land aufhalten. Wie lange der Reisepass noch gültig sein muss und ob ein Rückflugticket verlangt wird, ist je nach Land verschieden; prüfe es vor der Reise bei der offiziellen Stelle.`;
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
        return `A partir de 2026, la entrada a ${countryName} para titulares de pasaporte de ${passportName} está exenta de visado. Los viajeros pueden permanecer hasta ${stayDurationText} sin visa. La validez mínima del pasaporte y la exigencia de billete de regreso varían según el país; compruébelo en la fuente oficial antes de viajar.`;
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

    case 'pt': {
      if (cat === 'free' || cat === 'id') {
        return `Em 2026, quem tem passaporte de ${passportName} pode entrar em ${countryName} sem visto e ficar até ${stayDurationText}. A validade mínima do passaporte e a exigência de passagem de volta variam de país para país; confira na fonte oficial antes de viajar.`;
      }
      if (cat === 'voa') {
        return `Em 2026, ${countryName} concede visto na chegada a quem tem passaporte de ${passportName}. A permanência autorizada é de ${stayDurationText}; é preciso passaporte válido e pagar a taxa na fronteira.`;
      }
      if (cat === 'evisa') {
        return `Em 2026, ${countryName} exige que quem tem passaporte de ${passportName} solicite um visto eletrônico (e-Visa) on-line antes da viagem. A autorização permite permanências de ${stayDurationText}.`;
      }
      if (cat === 'eta') {
        return `Em 2026, ${countryName} exige uma autorização eletrônica de viagem (ETA), solicitada pelo menos 72 horas antes do voo. A permanência máxima é de ${stayDurationText}.`;
      }
      return `Em 2026, ${countryName} exige que quem tem passaporte de ${passportName} tire um visto consular antes da viagem, na embaixada ou em um centro oficial de vistos.`;
    }

    case 'ru': {
      if (cat === 'free' || cat === 'id') {
        return `По состоянию на 2026 год въезд ${ruIn(countryName, 'acc')} для владельцев паспортов (${passportName}) является безвизовым. Разрешенный срок пребывания составляет до ${stayDurationText}. Требования к сроку действия паспорта и обратному билету зависят от страны; уточните их в официальном источнике перед поездкой.`;
      }
      if (cat === 'voa') {
        return `По состоянию на 2026 год граждане с паспортом (${passportName}) могут получить визу по прибытии (Visa on Arrival) ${ruIn(countryName, 'acc')}. Разрешенный срок пребывания составляет ${stayDurationText}.`;
      }
      if (cat === 'evisa') {
        return `По состоянию на 2026 год для въезда ${ruIn(countryName, 'acc')} гражданам с паспортом (${passportName}) требуется оформить электронную визу (eVisa) онлайн. Разрешенный срок пребывания: ${stayDurationText}.`;
      }
      if (cat === 'eta') {
        return `По состоянию на 2026 год для поездки ${ruIn(countryName, 'acc')} требуется электронное разрешение (ETA), оформленное минимум за 72 часа до вылета. Срок пребывания: ${stayDurationText}.`;
      }
      return `По состоянию на 2026 год для въезда ${ruIn(countryName, 'acc')} с паспортом (${passportName}) необходимо заранее получить консульскую визу через посольство или визовый центр.`;
    }

    // Default English
    default: {
      if (cat === 'free' || cat === 'id') {
        return `As of 2026, travel to ${countryName} is visa-free for ${passportName} passport holders. Eligible travelers may stay up to ${stayDurationText} without a visa. Passport validity and return-ticket rules vary by country; check the official source before you travel.`;
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
  const voiceQuestion = getMobileVoiceQuestion(countryName, passportName, language, currentPassport);
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

  const ans = getSerpAnswer(code, countryName, passportName, currentPassport, item.cat, item.v, language);
  return {
    title: ans.title,
    description: ans.description || directAnswer,
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
        currencyH2: `${countryName} Währung und Aktuelle Wechselkurse (USD/EUR/GBP)`,
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
        currencyH2: `Moneda de ${countryName} y Tipos de Cambio Actuales (USD/EUR/GBP)`,
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
    case 'pt':
      return {
        h1,
        currencyH2: `Moeda de ${countryName} e câmbio atual (USD/EUR/GBP)`,
        clockWeatherH2: `Horário local, fuso horário e clima em ${countryName}`,
        internetEsimH2: `Velocidade da internet, eSIM e dados móveis em ${countryName}`,
        transportTaxiH2: `Transporte, traslado do aeroporto e apps de táxi em ${countryName}`,
        itineraryRouteH2: `Roteiro de viagem, cidades populares e rota por ${countryName}`,
        practicalEtiquetteH2: `Tomadas, gorjetas e costumes locais em ${countryName}`,
        budgetAccommodationH2: `Orçamento diário, hospedagem e voos para ${countryName}`,
        transitRulesH2: `Regras de trânsito no aeroporto e conexões em ${countryName}`,
        passportSynergyH2: `Política de vistos e comparação de passaportes para ${countryName}`,
        geographyMapH2: `Localização, capital e mapa de ${countryName}`
      };
    case 'ru':
      return {
        h1,
        currencyH2: `Валюта ${countryName} и актуальные курсы обмена (USD/EUR/GBP)`,
        clockWeatherH2: `Местное время, часовой пояс и погода ${ruIn(countryName, 'loc')}`,
        internetEsimH2: `Скорость интернета, eSIM и мобильная связь ${ruIn(countryName, 'loc')}`,
        transportTaxiH2: `Транспорт, трансфер из аэропорта и такси ${ruIn(countryName, 'loc')}`,
        itineraryRouteH2: `Маршрут путешествия, популярные города и гид по ${countryName}`,
        practicalEtiquetteH2: `Розетки, чаевые и местные правила ${ruIn(countryName, 'loc')}`,
        budgetAccommodationH2: `Дневной бюджет, проживание и авиабилеты ${ruIn(countryName, 'loc')}`,
        transitRulesH2: `Правила транзита в аэропорту и пересадки ${ruIn(countryName, 'loc')}`,
        passportSynergyH2: `Визовая политика и сравнение паспортов для ${ruOf(countryName)}`,
        geographyMapH2: `Географическое положение, столица и карта ${countryName}`
      };
    default:
      return {
        h1,
        currencyH2: `${countryName} Currency & Live Exchange Rates (USD/EUR/GBP)`,
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

/** Google sonuçlarında kesilmesin: başlık ≤ 60, açıklama ≤ 158 karakter; sığan ilk seçenek kullanılır. */
const fitT = (opts: string[]): string => opts.find((t) => t.length <= 60) || opts[opts.length - 1];
const fitD = (main: string, tails: string[]): string => {
  for (const t of tails) if (main.length + 1 + t.length <= 158) return `${main} ${t}`;
  return main.length <= 158 ? main : `${main.slice(0, main.lastIndexOf(' ', 155))}…`;
};

/**
 * Arama sonucunda tıklanma için: başlık sorunun cevabını içerir ("Malezya Vize İstiyor mu? Türklere 90 Gün Vizesiz"),
 * açıklama cevapla başlar. Gün sayısı yalnızca veride sayı olarak varsa yazılır; genel/doğrulanmamış iddia eklenmez.
 */
function getSerpAnswer(
  code: string,
  C: string,
  P: string,
  pass: string,
  cat: string,
  v: string | undefined,
  lang: SupportedLanguage
): { title: string; description: string } {
  const days = v && /^\d+$/.test(v) ? v : '';
  const free = cat === 'free' || cat === 'id';
  // Kendi ülkesi: vize sorusu yok, vatandaş kimlik ya da pasaportla girer
  if (code === pass) {
    const OWN: Record<string, { title: string; description: string }> = {
      tr: { title: `${C} Seyahat Rehberi 2026: Gezilecek Yerler, Rota ve Fiyatlar`, description: `${C} için gezi rotası, şehirler, uçuş–otel fiyatları, acil numaralar ve pratik bilgiler. Kendi ülken olduğu için vize gerekmez.` },
      en: { title: `${C} Travel Guide 2026: Places, Routes and Prices`, description: `${C} trip ideas, cities, flight and hotel prices, emergency numbers and practical tips. Your own country: no visa needed.` },
      de: { title: `${C} Reiseführer 2026: Orte, Routen und Preise`, description: `${C}: Reiseideen, Städte, Flug- und Hotelpreise, Notrufnummern und praktische Tipps. Dein eigenes Land: kein Visum nötig.` },
      es: { title: `Guía de viaje de ${C} 2026: lugares, rutas y precios`, description: `${C}: ideas de viaje, ciudades, precios de vuelos y hoteles, teléfonos de emergencia y consejos. Tu propio país: no necesitas visa.` },
      pt: { title: `Guia de viagem de ${C} 2026: lugares, roteiros e preços`, description: `${C}: ideias de viagem, cidades, preços de voos e hotéis, telefones de emergência e dicas. É o seu próprio país: você não precisa de visto.` },
      ru: { title: `${C}: путеводитель 2026 — места, маршруты и цены`, description: `${C}: идеи поездок, города, цены на билеты и отели, экстренные номера и советы. Это ваша страна: виза не нужна.` }
    };
    return OWN[lang] || OWN.en;
  }
  const eta = etaName(code);
  const geo = GEO_DATA[code];
  const cap = geo?.capital ? capitalName(code, lang, geo.capital) : '';
  const CC = cap && cap !== C ? `${C} (${cap})` : C;
  // Çok gösterim alan pasaport + ülke sayfaları: insanların aradığı şehir adlarıyla, resmî kaynaklı özel başlık/açıklama
  // (Search Console: "krakow / warsaw visa requirements", "cappadocia visa requirements" — Hindistan'dan aramalar)
  const PAIR: Record<string, { title: string; description: string }> = {
    'en:PL:IN': {
      title: 'Poland Visa for Indians 2026: Schengen Visa for Warsaw & Kraków',
      description: 'Indian passport holders need a C-type Schengen visa for Poland, including Warsaw and Kraków. Apply at VFS Global 15 days to 6 months before travel; €30,000 travel insurance required.'
    },
    'en:TR:IN': {
      title: 'Türkiye Visa for Indians 2026: Cappadocia, Istanbul & e-Visa Rules',
      description: 'Indian citizens need a visa for Türkiye, including Cappadocia and Istanbul. With a valid Schengen, US, UK or Irish visa or residence permit you may get a one-month e-Visa online.'
    }
  };
  if (PAIR[`${lang}:${code}:${pass}`]) return PAIR[`${lang}:${code}:${pass}`];
  switch (lang) {
    case 'tr': {
      const short = cat === 'id' ? `Kimlikle Vizesiz${days ? ` ${days} Gün` : ''}` : free ? (days ? `${days} Gün Vizesiz` : 'Vizesiz') : cat === 'voa' ? 'Kapıda Vize' : cat === 'evisa' ? 'e-Vize Gerekli' : cat === 'eta' ? `${eta} Gerekli` : 'Vize Gerekli';
      const who = pass === 'TR' ? 'Türklere' : `${P} Pasaportuna`;
      const long = cat === 'id' ? `${P} vatandaşları vizesiz, çipli kimlik kartıyla da girebilir${days ? ` (${days} güne kadar)` : ''}`
        : free ? `${P} pasaportuyla vize gerekmez${days ? `, ${days} güne kadar kalınabilir` : ''}`
        : cat === 'voa' ? `${P} pasaportuyla vize varışta, havalimanında veya sınır kapısında alınır${days ? ` (${days} gün)` : ''}`
        : cat === 'evisa' ? `${P} pasaportuyla yola çıkmadan önce online e-Vize alınmalı${days ? ` (${days} gün)` : ''}`
        : cat === 'eta' ? `${P} pasaportuyla yola çıkmadan önce elektronik seyahat izni (${eta}) alınmalı`
        : `${P} pasaportuyla yola çıkmadan önce konsolosluk vizesi alınmalı`;
      return {
        title: cat === 'id' && pass === 'TR' ? fitT([`${C} Kimlikle Gidilir mi? Vize İstiyor mu? (2026)`, `${C} Kimlikle Gidilir mi? (2026)`]) : fitT([`${C} Vize İstiyor mu? ${who} ${short} (2026)`, `${C} Vizesi: ${who} ${short} (2026)`, `${C}: ${short} (2026)`]),
        description: fitD(`${CC}: ${long}.`, ['Resmî kaynak, güvenlik seviyesi, acil numaralar, gezi rotası ve uçuş–otel fiyatları.', 'Resmî kaynak, acil numaralar, rota ve fiyatlar.', 'Resmî kaynak ve fiyatlar.'])
      };
    }
    case 'de': {
      const short = free ? `visumfrei${days ? ` (${days} Tage)` : ''}` : cat === 'voa' ? 'Visum bei Ankunft' : cat === 'evisa' ? 'e-Visum nötig' : cat === 'eta' ? `${eta} nötig` : 'Visum nötig';
      const dem = DE_DEMONYM[pass] || `Pass aus ${P}`;
      const PP = ({ CH: 'Schweizer Pass', AT: 'österreichischem Pass', DE: 'deutschem Pass' } as Record<string, string>)[pass] || `${P}-Pass`;
      const long = free ? `Mit ${PP} visumfrei${days ? `, bis zu ${days} Tage` : ''}${cat === 'id' ? ', auch mit Personalausweis' : ''}`
        : cat === 'voa' ? `Mit ${PP} gibt es das Visum bei der Ankunft${days ? ` (${days} Tage)` : ''}`
        : cat === 'evisa' ? `Mit ${PP} vor der Reise online ein e-Visum beantragen${days ? ` (${days} Tage)` : ''}`
        : cat === 'eta' ? `Mit ${PP} vor der Reise eine elektronische Reisegenehmigung (${eta}) beantragen`
        : `Mit ${PP} vor der Reise ein Visum bei der Botschaft beantragen`;
      return {
        // Search Console (CH/DE/AT): "einreise simbabwe für schweizer", "visum argentinien für schweizer", "argentinien einreise"
        title: DE_DEMONYM[pass] && pass !== LANG_PASS.de
          ? fitT([`Einreise & Visum ${C} für ${dem} 2026: ${short}`, `Einreise ${C} für ${dem} 2026: ${short}`, `Einreise ${C} für ${dem}: ${short}`, `${C} für ${dem} 2026: ${short}`])
          : fitT([`Einreise ${C} 2026: Visum nötig? ${DE_DEMONYM[pass] ? `${dem}: ` : ''}${short}`, `Einreise ${C} 2026${DE_DEMONYM[pass] ? ` für ${dem}` : ''}: ${short}`, `Einreise & Visum ${C} 2026: ${short}`, `Einreise ${C} 2026: ${short}`, `${C} 2026: ${short}`]),
        description: fitD(`Einreisebestimmungen ${CC}${DE_DEMONYM[pass] && pass !== LANG_PASS.de ? ` für ${dem}` : ''} 2026: ${long}.`, ['Offizielle Quelle, Reisewarnung, Notrufnummern, Reiseroute, günstige Flüge und Hotels.', 'Offizielle Quelle, Reisewarnung, Notrufnummern, Flüge und Hotels.', 'Offizielle Quelle, Notrufnummern und Preise.', 'Offizielle Quelle und Preise.'])
      };
    }
    case 'es': {
      const short = free ? `sin visa${days ? ` ${days} días` : ''}` : cat === 'voa' ? 'visa a la llegada' : cat === 'evisa' ? 'e-Visa obligatoria' : cat === 'eta' ? `${eta} obligatoria` : 'visa obligatoria';
      const long = free ? `con pasaporte de ${P} no se necesita visa${days ? `, estancia de hasta ${days} días` : ''}`
        : cat === 'voa' ? `con pasaporte de ${P} la visa se obtiene a la llegada${days ? ` (${days} días)` : ''}`
        : cat === 'evisa' ? `con pasaporte de ${P} hay que tramitar una e-Visa en línea antes del viaje`
        : cat === 'eta' ? `con pasaporte de ${P} hay que tramitar una autorización electrónica (${eta}) antes del viaje`
        : `con pasaporte de ${P} hay que solicitar la visa en el consulado antes del viaje`;
      return {
        title: fitT([`Requisitos para viajar a ${C} 2026: ${short} con pasaporte de ${P}`, `Viajar a ${C} 2026: ${short} con pasaporte de ${P}`, `Viajar a ${C} 2026: ${short}`, `${C} 2026: ${short}`]),
        description: fitD(`${CC}: ${long}.`, ['Fuente oficial, nivel de seguridad, teléfonos de emergencia, itinerario, vuelos y hoteles baratos.', 'Fuente oficial, emergencias, ruta y precios.', 'Fuente oficial y precios.'])
      };
    }
    case 'pt': {
      const short = free ? `sem visto${days ? ` ${days} dias` : ''}` : cat === 'voa' ? 'visto na chegada' : cat === 'evisa' ? 'e-Visa obrigatório' : cat === 'eta' ? `${eta} obrigatória` : 'visto obrigatório';
      const long = free ? `com passaporte de ${P} não é preciso visto${days ? `, permanência de até ${days} dias` : ''}`
        : cat === 'voa' ? `com passaporte de ${P} o visto é emitido na chegada${days ? ` (${days} dias)` : ''}`
        : cat === 'evisa' ? `com passaporte de ${P} é preciso tirar um e-Visa on-line antes da viagem`
        : cat === 'eta' ? `com passaporte de ${P} é preciso solicitar uma autorização eletrônica (${eta}) antes da viagem`
        : `com passaporte de ${P} é preciso pedir o visto no consulado antes da viagem`;
      return {
        title: fitT([`Precisa de visto para ${C}? 2026: ${short} com passaporte de ${P}`, `Viagem para ${C} 2026: ${short} com passaporte de ${P}`, `Viagem para ${C} 2026: ${short}`, `${C} 2026: ${short}`]),
        description: fitD(`${CC}: ${long}.`, ['Fonte oficial, nível de segurança, telefones de emergência, roteiro, voos e hotéis baratos.', 'Fonte oficial, emergências, roteiro e preços.', 'Fonte oficial e preços.'])
      };
    }
    case 'ru': {
      const short = free ? `без визы${days ? ` ${days} дней` : ''}` : cat === 'voa' ? 'виза по прилёте' : cat === 'evisa' ? 'нужна e-Visa' : cat === 'eta' ? `нужна ${eta}` : 'нужна виза';
      const who = pass === 'RU' ? 'Россиянам' : `Гражданам ${ruOf(P)}`;
      const long = free ? `для граждан ${ruOf(P)} виза не нужна${days ? `, до ${days} дней` : ''}`
        : cat === 'voa' ? `гражданам ${ruOf(P)} виза ставится по прилёте${days ? ` (${days} дней)` : ''}`
        : cat === 'evisa' ? `гражданам ${ruOf(P)} нужно заранее оформить электронную визу`
        : cat === 'eta' ? `гражданам ${ruOf(P)} нужно заранее оформить электронное разрешение (${eta})`
        : `гражданам ${ruOf(P)} нужна виза, оформляется в консульстве до поездки`;
      return {
        title: fitT([`Нужна ли виза ${ruIn(C, 'acc')}? ${who}: ${short} (2026)`, `Виза ${ruIn(C, 'acc')}: ${who.toLowerCase()} ${short} (2026)`, `Виза ${ruIn(C, 'acc')}: ${short} (2026)`]),
        description: fitD(`${CC}: ${long}.`, ['Официальный источник, уровень безопасности, экстренные номера, маршрут, дешёвые билеты и отели.', 'Официальный источник, экстренные номера, маршрут и цены.', 'Официальный источник и цены.'])
      };
    }
    case 'en':
    default: {
      const short = free ? `Visa-Free${days ? ` ${days} Days` : ''}` : cat === 'voa' ? 'Visa on Arrival' : cat === 'evisa' ? 'eVisa Required' : cat === 'eta' ? `${eta} Required` : 'Visa Required';
      const dem = EN_DEMONYM[pass] ? `${EN_DEMONYM[pass]} Citizens` : `${P} Passport`;
      const long = free ? `no visa needed with ${enArticle(P)} ${P} passport${days ? `, stay up to ${days} days` : ''}`
        : cat === 'voa' ? `${P} passport holders get a visa on arrival${days ? ` (${days} days)` : ''}`
        : cat === 'evisa' ? `${P} passport holders must get an eVisa online before travel`
        : cat === 'eta' ? `${P} passport holders need an electronic travel authorisation (${eta}) before travel`
        : `${P} passport holders must apply for a visa at an embassy before travel`;
      return {
        // Başkent başlıkta: ABD/Kanada aramalarında "budapest / vienna / vilnius visa requirements" kalıbı sık (Search Console)
        // Search Console (ABD/İngiltere/Kanada): "krakow / cappadocia / machu picchu / budapest visa requirements" —
        // aranan ifade "visa requirements" + turistik yer adı. Başlık ve açıklama bunu içerir (64 karakter sınırı).
        title: (() => {
          const pl = topPlaces(code, 1).filter((x) => x !== C)[0] || (cap && cap !== C ? cap : '');
          const opts = [
            pl && `${C} Visa Requirements 2026 (${pl}): ${short} for ${dem}`,
            pl && `${pl} & ${C} Visa Requirements 2026: ${short}`,
            pl && `${C} Visa Requirements 2026 (${pl}): ${short}`,
            `${C} Visa Requirements 2026: ${short} for ${dem}`,
            `${C} Visa Requirements 2026: ${short}`,
            `${C} Visa 2026: ${short}`
          ].filter(Boolean) as string[];
          return opts.find((t) => t.length <= 64) || opts[opts.length - 1];
        })(),
        description: (() => {
          const pls = topPlaces(code, 3).filter((x) => x !== C);
          return fitD(`Visa requirements for ${C}${pls.length ? ` (${pls.join(', ')})` : cap && cap !== C ? ` (${cap})` : ''}: ${long}.`, ['Official sources, travel advisory, emergency numbers, flight and hotel deals.', 'Official sources, emergency numbers and prices.', 'Official sources.']);
        })()
      };
    }
  }
}

// Pasaporta özel sayfa başlıkları insanların aradığı gibi olsun ("Einreise Argentinien für Schweizer")
const DE_DEMONYM: Record<string, string> = { CH: 'Schweizer', AT: 'Österreicher', DE: 'Deutsche', TR: 'Türken' };
const EN_DEMONYM: Record<string, string> = { GB: 'British', IN: 'Indian', CA: 'Canadian', AU: 'Australian', US: 'US', TR: 'Turkish' };

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
      return currentPassport === LANG_PASS.en || currentPassport === 'TR'
        ? `Do I Need a Visa for ${countryName}? (2026 Entry Rules)`
        : `${countryName} Visa Requirements for ${EN_DEMONYM[currentPassport] || passportName} Citizens (2026)`;
    case 'de':
      return currentPassport === LANG_PASS.de || currentPassport === 'TR'
        ? `Brauche ich ein Visum für ${countryName}? (2026 Einreisebestimmungen)`
        : DE_DEMONYM[currentPassport]
          ? `Einreise ${countryName} für ${DE_DEMONYM[currentPassport]}: Visum nötig? (2026)`
          : `Einreise ${countryName} mit Pass aus ${passportName}: Visum nötig? (2026)`;
    case 'es':
      return currentPassport === LANG_PASS.es || currentPassport === 'TR'
        ? `¿Necesito Visa para ${countryName}? (Requisitos de Entrada 2026)`
        : `¿${countryName} pide visa a ciudadanos de ${passportName}? Requisitos 2026`;
    case 'pt':
      return currentPassport === LANG_PASS.pt || currentPassport === 'TR'
        ? `Preciso de visto para ${countryName}? (Regras de entrada 2026)`
        : `${countryName} exige visto de quem tem passaporte de ${passportName}? Regras 2026`;
    case 'ru':
      return currentPassport === LANG_PASS.ru || currentPassport === 'TR'
        ? `Нужна ли виза ${ruIn(countryName, 'acc')}? (Правила въезда 2026)`
        : `Нужна ли виза ${ruIn(countryName, 'acc')} гражданам ${ruOf(passportName)}? Правила 2026`;
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
    case 'pt':
      return `Política de vistos, tempo de permanência e roteiro para ${countryName}`;
    case 'ru':
      return `Визовый режим ${ruIn(countryName, 'loc')}, сроки пребывания и гид`;
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
        logo: `${BASE_URL}/favicon.ico`,
        email: CONTACT_EMAIL,
        sameAs: SOCIALS.map((x) => x.url)
      }
    ]
  };
}

/**
 * Dynamically updates or injects the localized Schema.org JSON-LD tag inside HTML <head>
 * Dynamically imports countrySchemaGenerator so heavy itineraries and encyclopedias
 * are never included in the initial entry bundle!
 */
// Sayfanın ilk açıldığı adres: derlemede yazılmış şema yalnız bu adreste geçerlidir
const INITIAL_PATH = typeof location !== 'undefined' ? location.pathname : '';

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
    // Açılışta ülke kodu henüz çözülmeden gelen boş çağrı, derlemede yazılmış şemayı silmesin
    // (silinirse ağır şema modülü gereksiz yere yüklenir); başka sayfaya geçildiyse ya da şema tarayıcıda üretildiyse kaldır.
    if (scriptEl && (scriptEl.dataset.client === '1' || location.pathname !== INITIAL_PATH)) {
      scriptEl.remove();
    }
    return;
  }

  // Derlemede hazır yazılmış şema bu sayfa içinse ağır modülü hiç yükleme
  if (scriptEl && scriptEl.dataset.code === countryCode && scriptEl.dataset.lang === language && scriptEl.dataset.pass === currentPassport) return;

  // Ağır şema modülünü sayfa açıldıktan ve tarayıcı boşaldıktan sonra yükle (hızı etkilemesin)
  const run = () => import('./countrySchemaGenerator').then(({ generateCountryJsonLd }) => {
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = SCRIPT_ID;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    const schemaData = generateCountryJsonLd({ countryCode, language, currentPassport });
    scriptEl.textContent = JSON.stringify(schemaData, null, 2);
    scriptEl.dataset.code = countryCode;
    scriptEl.dataset.lang = language;
    scriptEl.dataset.pass = currentPassport;
    scriptEl.dataset.client = '1';
  }).catch(() => {});
  const idle = () => {
    const w = window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void };
    if (w.requestIdleCallback) w.requestIdleCallback(run, { timeout: 6000 });
    else setTimeout(run, 2500);
  };
  if (document.readyState === 'complete') idle();
  else window.addEventListener('load', idle, { once: true });
}
