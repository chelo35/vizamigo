/**
 * Vizamigo AI Copilot & Travel Concierge Intelligence Engine
 * Comprehensive multi-lingual natural language processor, destination mapper,
 * site action dispatcher, dynamic language auto-detector, and high-fidelity speech coordinator.
 *
 * Fully covers ALL 199 countries, all site tools, visa rules, itineraries,
 * power plugs, tipping, taxis, climate, safety, currencies, and consular crisis.
 */

import {
  getCountryName,
  getFlag,
  getCategoryBadgeLabel,
  getPracticalInfo,
  REGIONS,
  CountryItem,
  DIGITAL_NOMAD_VISAS
} from '../data/passportData';
import { getPassportItems } from '../utils/calculator';
import { getCountryGeography } from '../data/countryGeography';
import { getCountryInsights } from '../data/countryInsights';
import { getCountryItinerary } from '../data/countryItineraries';
import { getCrossRate } from '../data/currencyRates';
import { GEO_DATA } from '../data/geoData';
import { TabKey } from '../components/Navigation';
import {
  playNaturalSpeech,
  stopAllPlayback,
  getVoiceSettings
} from './aiVoiceService';

export interface AssistantActionPill {
  id: string;
  type: 'open_country' | 'switch_tab' | 'open_tool' | 'affiliate';
  label: string;
  icon?: string;
  countryCode?: string;
  tabKey?: TabKey;
  toolKey?: 'packing' | 'tipping' | 'overlap' | 'radar' | 'audit' | 'counter';
  radarMode?: 'all' | 'clock' | 'weather' | 'currency';
  url?: string;
  badge?: string;
  accentTone?: 'teal' | 'coral' | 'amber' | 'slate' | 'sky';
  autoTrigger?: boolean;
}

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  spokenText?: string; // Short 1-sentence natural summary (never robotic wall of text)
  timestamp: Date;
  actions?: AssistantActionPill[];
  detectedCountry?: {
    code: string;
    name: string;
    flag: string;
  };
  detectedLang?: string;
  autoTriggerAction?: AssistantActionPill;
}

// ============================================================================
// DYNAMIC QUERY LANGUAGE DETECTOR (Auto-detects TR, EN, DE, ES, RU, etc.)
// ============================================================================
export function detectQueryLanguage(rawQuery: string, fallbackLang: string = 'tr'): string {
  if (!rawQuery) return fallbackLang;

  // 1. Cyrillic script -> Russian
  if (/[\u0400-\u04FF]/.test(rawQuery)) {
    return 'ru';
  }

  const q = rawQuery.toLowerCase();

  // 2. Spanish detection (unique symbols and vocabulary)
  if (
    /[¿¡]/.test(rawQuery) ||
    /\b(visado|visados|viajar|viaje|puedo|necesito|donde|cuanto|cuantos|pais|paises|espana|como|abrir|mostrar|tiempo|clima|propinas|propina|enchufe|enchufes|seguro|idioma|pasaporte|gratis|vuelo|hotel|tarjeta|requisitos|dias)\b/i.test(q)
  ) {
    return 'es';
  }

  // 3. German detection (unique characters and vocabulary)
  if (
    (/[äöüß]/.test(rawQuery) && (q.includes('ä') || q.includes('ß') || q.includes('und') || q.includes('wie') || q.includes('für') || q.includes('fuer'))) ||
    /\b(visum|visa|einreise|reise|reisen|nach|brauche|kann|ich|wie|viele|tage|kosten|stecker|trinkgeld|wetter|fluege|hotel|wann|welche|deutschland|pass|ohne|sicher|waehrung|offnen|oeffnen|zeigen|bitte)\b/i.test(q)
  ) {
    return 'de';
  }

  // 4. Turkish detection (unique characters and vocabulary)
  if (
    /[çğşı]/.test(rawQuery) ||
    /\b(vize|vizesiz|pasaport|kimlik|kimlikle|kac|kaç|nasil|nasıl|nerede|nereye|nerelere|priz|prizi|bahsis|bahşiş|rota|rotasi|taksi|ac|aç|goster|göster|para|doviz|döviz|kur|kurlar|bavul|valiz|sigorta|kayip|kayıp|calinti|çalıntı|ucak|uçak|bilet|gun|gün|otel|oteller|guvenli|güvenli|pahali|pahalı|ucuz|var|mi|mı|mu|mü|gerekir|istiyor|mu|müyüm|hazirla|hazırla|bilgi)\b/i.test(q)
  ) {
    return 'tr';
  }

  // 5. English detection
  if (
    /\b(visa|visas|passport|travel|can|do|i|need|how|what|where|when|which|days|stay|plug|plugs|adapter|tipping|tip|taxi|ride|cost|safe|safety|route|itinerary|weather|best|time|flights|flight|hotel|hotels|lost|stolen|currency|open|show|compare)\b/i.test(q)
  ) {
    return 'en';
  }

  return fallbackLang;
}

// ============================================================================
// 199-COUNTRY DYNAMIC KNOWLEDGE INDEX & SYNONYM DICTIONARY
// ============================================================================

const POPULAR_DESTINATION_ALIASES: Record<string, string> = {
  // Southeast Asia & Far East
  'bali': 'ID', 'cakarta': 'ID', 'jakarta': 'ID', 'ubud': 'ID', 'lombok': 'ID', 'denpasar': 'ID', 'gili': 'ID',
  'bangkok': 'TH', 'phuket': 'TH', 'chiang mai': 'TH', 'pattaya': 'TH', 'krabi': 'TH', 'samui': 'TH', 'koh samui': 'TH',
  'hanoi': 'VN', 'ho chi minh': 'VN', 'saigon': 'VN', 'da nang': 'VN', 'hoi an': 'VN',
  'kuala lumpur': 'MY', 'penang': 'MY', 'langkawi': 'MY',
  'singapur': 'SG', 'singapore': 'SG',
  'manila': 'PH', 'cebu': 'PH', 'boracay': 'PH', 'palawan': 'PH',
  'siem reap': 'KH', 'angkor wat': 'KH', 'phnom penh': 'KH',
  'tokyo': 'JP', 'kyoto': 'JP', 'osaka': 'JP', 'hiroshima': 'JP',
  'seul': 'KR', 'seoul': 'KR', 'busan': 'KR', 'jeju': 'KR',
  'pekin': 'CN', 'beijing': 'CN', 'sanghay': 'CN', 'shanghai': 'CN', 'guangzhou': 'CN', 'shenzhen': 'CN',
  'taipei': 'TW', 'hong kong': 'HK', 'macau': 'MO',

  // Europe & Mediterranean
  'paris': 'FR', 'nice': 'FR', 'lyon': 'FR', 'cannes': 'FR', 'marsilya': 'FR', 'marseille': 'FR',
  'berlin': 'DE', 'munih': 'DE', 'munich': 'DE', 'frankfurt': 'DE', 'hamburg': 'DE', 'koln': 'DE', 'cologne': 'DE',
  'roma': 'IT', 'rome': 'IT', 'milano': 'IT', 'milan': 'IT', 'venedik': 'IT', 'venice': 'IT', 'floransa': 'IT', 'florence': 'IT', 'napoli': 'IT',
  'madrid': 'ES', 'barselona': 'ES', 'barcelona': 'ES', 'sevilla': 'ES', 'valensiya': 'ES', 'valencia': 'ES', 'ibiza': 'ES', 'mallorca': 'ES', 'mayorka': 'ES',
  'londra': 'GB', 'london': 'GB', 'manchester': 'GB', 'edinburgh': 'GB', 'ingiltere': 'GB', 'uk': 'GB', 'birlesik krallik': 'GB',
  'amsterdam': 'NL', 'rotterdam': 'NL',
  'atina': 'GR', 'athens': 'GR', 'selanik': 'GR', 'thessaloniki': 'GR', 'santorini': 'GR', 'mikonos': 'GR', 'mykonos': 'GR', 'rodos': 'GR', 'rhodes': 'GR', 'girit': 'GR', 'crete': 'GR',
  'lizbon': 'PT', 'lisbon': 'PT', 'porto': 'PT', 'faro': 'PT', 'madeira': 'PT',
  'zurih': 'CH', 'zurich': 'CH', 'cenevre': 'CH', 'geneva': 'CH', 'bern': 'CH',
  'viyana': 'AT', 'vienna': 'AT', 'salzburg': 'AT',
  'prag': 'CZ', 'prague': 'CZ',
  'budapeste': 'HU', 'budapest': 'HU',
  'varsova': 'PL', 'warsaw': 'PL', 'krakow': 'PL',
  'dublin': 'IE',
  'oslo': 'NO', 'bergen': 'NO',
  'stockholm': 'SE', 'goteborg': 'SE',
  'helsinki': 'FI', 'rovaniemi': 'FI', 'lapland': 'FI',
  'kopenhag': 'DK', 'copenhagen': 'DK',
  'tiflis': 'GE', 'tbilisi': 'GE', 'batum': 'GE', 'batumi': 'GE',
  'baku': 'AZ',
  'erivan': 'AM', 'yerevan': 'AM',
  'belgrad': 'RS', 'belgrade': 'RS',
  'saraybosna': 'BA', 'sarajevo': 'BA', 'mostar': 'BA',
  'kotor': 'ME', 'budva': 'ME', 'tivat': 'ME', 'podgorica': 'ME',
  'tiran': 'AL', 'tirana': 'AL', 'sarande': 'AL', 'saranda': 'AL', 'ksamil': 'AL',
  'uskup': 'MK', 'skopje': 'MK', 'ohrid': 'MK',
  'pristine': 'XK', 'pristina': 'XK', 'prizren': 'XK',
  'zagreb': 'HR', 'dubrovnik': 'HR', 'split': 'HR',
  'ljubljana': 'SI', 'bled': 'SI',
  'bratislava': 'SK',
  'bukres': 'RO', 'bucharest': 'RO', 'brasov': 'RO',
  'sofya': 'BG', 'sofia': 'BG', 'varna': 'BG', 'burgas': 'BG',
  'moskova': 'RU', 'moscow': 'RU', 'st petersburg': 'RU', 'sent petersburg': 'RU',
  'kiev': 'UA', 'kyiv': 'UA', 'lviv': 'UA', 'odessa': 'UA',
  'minsk': 'BY',
  'kisinev': 'MD', 'chisinau': 'MD',
  'valletta': 'MT', 'reykjavik': 'IS',

  // Central Asia & Caucasus
  'taskent': 'UZ', 'tashkent': 'UZ', 'semerkant': 'UZ', 'samarkand': 'UZ', 'buhara': 'UZ', 'bukhara': 'UZ',
  'almati': 'KZ', 'almaty': 'KZ', 'astana': 'KZ', 'nur sultan': 'KZ',
  'biskek': 'KG', 'bishkek': 'KG',
  'askabat': 'TM', 'ashgabat': 'TM',
  'dusanbe': 'TJ', 'dushanbe': 'TJ',
  'ulan batur': 'MN', 'ulaanbaatar': 'MN',

  // Middle East & Africa
  'dubai': 'AE', 'abu dabi': 'AE', 'abu dhabi': 'AE', 'sarika': 'AE', 'sharjah': 'AE', 'bae': 'AE', 'uae': 'AE',
  'doha': 'QA',
  'riyad': 'SA', 'riyadh': 'SA', 'cidde': 'SA', 'jeddah': 'SA', 'mekke': 'SA', 'medine': 'SA',
  'maskat': 'OM', 'muscat': 'OM',
  'manama': 'BH', 'kuveyt': 'KW', 'kuwait': 'KW',
  'beyrut': 'LB', 'beirut': 'LB',
  'amman': 'JO', 'petra': 'JO',
  'kahire': 'EG', 'cairo': 'EG', 'sarm': 'EG', 'sharm': 'EG', 'hurghada': 'EG', 'iskenderiye': 'EG', 'alexandria': 'EG',
  'marakes': 'MA', 'marrakech': 'MA', 'kazablanka': 'MA', 'casablanca': 'MA', 'fes': 'MA', 'rabat': 'MA',
  'tunus': 'TN', 'tunis': 'TN',
  'male': 'MV', 'maldivler': 'MV', 'maldives': 'MV',
  'mahe': 'SC', 'seyseller': 'SC', 'seychelles': 'SC',
  'cape town': 'ZA', 'johannesburg': 'ZA',
  'nairobi': 'KE', 'mombasa': 'KE',
  'zanzibar': 'TZ', 'darusselam': 'TZ',
  'lefkosa': 'CY', 'nicosia': 'CY', 'girne': 'CY', 'magusa': 'CY', 'kibris': 'CY', 'kktc': 'CY',

  // Americas & Oceania
  'new york': 'US', 'los angeles': 'US', 'miami': 'US', 'san francisco': 'US', 'las vegas': 'US', 'chicago': 'US', 'abd': 'US', 'usa': 'US',
  'toronto': 'CA', 'vancouver': 'CA', 'montreal': 'CA',
  'cancun': 'MX', 'mexico city': 'MX', 'tulum': 'MX', 'guadalajara': 'MX',
  'rio': 'BR', 'rio de janeiro': 'BR', 'sao paulo': 'BR',
  'buenos aires': 'AR',
  'medellin': 'CO', 'bogota': 'CO', 'cartagena': 'CO',
  'lima': 'PE', 'cusco': 'PE', 'machu picchu': 'PE',
  'santiago': 'CL',
  'sidney': 'AU', 'sydney': 'AU', 'melbourne': 'AU', 'brisbane': 'AU',
  'auckland': 'NZ', 'queenstown': 'NZ'
};

/**
 * Text normalizer for multi-lingual robust search
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .replace(/İ/g, 'i')
    .replace(/I/g, 'i')
    .replace(/ı/g, 'i')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[ç]/g, 'c')
    .replace(/[ğ]/g, 'g')
    .replace(/[ö]/g, 'o')
    .replace(/[ş]/g, 's')
    .replace(/[ü]/g, 'u')
    .replace(/['’`-]/g, '') // remove apostrophes: norveç'e -> norvece
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Dynamically builds a global dictionary of all 199 countries and territories
 */
let GLOBAL_COUNTRY_MAP: Record<string, string> | null = null;

function getGlobalCountryMap(): Record<string, string> {
  if (GLOBAL_COUNTRY_MAP) return GLOBAL_COUNTRY_MAP;

  const map: Record<string, string> = { ...POPULAR_DESTINATION_ALIASES };

  // Collect all 199 country codes
  const allCodes = new Set<string>();
  Object.values(REGIONS).forEach((arr) => {
    arr.forEach((c) => allCodes.add(c.toUpperCase()));
  });
  Object.keys(GEO_DATA).forEach((c) => allCodes.add(c.toUpperCase()));

  const languages = ['tr', 'en', 'de', 'es', 'ru'];

  for (const code of allCodes) {
    // Direct code lookup
    map[code.toLowerCase()] = code;

    // Capital city from GEO_DATA
    const geo = GEO_DATA[code];
    if (geo?.capital) {
      const capNorm = normalizeText(geo.capital);
      if (capNorm.length >= 3 && !map[capNorm]) {
        map[capNorm] = code;
      }
    }

    // Country name across all 5 languages
    for (const lang of languages) {
      const name = getCountryName(code, lang);
      if (name && name !== code) {
        const norm = normalizeText(name);
        if (norm.length >= 2 && !map[norm]) {
          map[norm] = code;
        }
      }
    }
  }

  GLOBAL_COUNTRY_MAP = map;
  return GLOBAL_COUNTRY_MAP;
}

/**
 * Extracts a destination country code from natural query with multi-lingual suffix stripping
 */
export function extractDestinationCountry(query: string): string | null {
  const norm = normalizeText(query);
  if (!norm) return null;

  const countryMap = getGlobalCountryMap();
  const sortedKeys = Object.keys(countryMap).sort((a, b) => b.length - a.length);

  // Suffix patterns for Turkish, Russian, German, Spanish, English inflections
  const suffixPattern = '(?:ye|ya|e|a|de|da|te|ta|den|dan|ten|tan|in|un|nin|nun|i|ı|u|ü|yi|yı|yu|yü|si|sı|su|sü|lar|ler|ю|и|е|ей|ем|я|s|es|n|en)';

  for (const key of sortedKeys) {
    if (key.length < 3) continue;
    const regex = new RegExp(`(?:^|\\s)${key}(?:${suffixPattern})?(?:\\s|$)`, 'i');
    if (regex.test(norm)) {
      return countryMap[key];
    }
  }

  // Direct ISO-2 Uppercase match (e.g. "NO", "TH", "DE", "JP")
  const rawWords = query.split(/\s+/);
  for (const w of rawWords) {
    const upper = w.toUpperCase().replace(/[^A-Z]/g, '');
    if (upper.length === 2 && getGlobalCountryMap()[upper.toLowerCase()]) {
      return upper;
    }
  }

  // Prefix matching for longer root names (length >= 4)
  const words = norm.split(' ');
  for (const w of words) {
    if (w.length >= 4) {
      for (const key of sortedKeys) {
        if (key.length >= 4 && w.startsWith(key)) {
          return countryMap[key];
        }
      }
    }
  }

  return null;
}

// ============================================================================
// CONVERSATIONAL INTENT PROCESSOR & RESPONSE GENERATOR
// ============================================================================
export async function processAssistantQuery(
  rawQuery: string,
  currentPassport: string = 'TR',
  lang: string = 'tr'
): Promise<AssistantMessage> {
  const detectedLang = detectQueryLanguage(rawQuery, lang);
  const activeLang = detectedLang;
  const isTr = activeLang === 'tr';
  const isEn = activeLang === 'en';
  const isDe = activeLang === 'de';
  const isEs = activeLang === 'es';
  const isRu = activeLang === 'ru';

  const norm = normalizeText(rawQuery);
  const targetCountry = extractDestinationCountry(rawQuery);

  const actions: AssistantActionPill[] = [];
  const passportItems = getPassportItems(currentPassport);
  const originName = getCountryName(currentPassport, activeLang);

  // Check if user specifically requested to OPEN/SHOW/VIEW the dossier or tool
  const isOpenIntent =
    norm.includes('ac') ||
    norm.includes('aç') ||
    norm.includes('goster') ||
    norm.includes('göster') ||
    norm.includes('incele') ||
    norm.includes('open') ||
    norm.includes('show') ||
    norm.includes('view') ||
    norm.includes('abrir') ||
    norm.includes('mostrar') ||
    norm.includes('offnen') ||
    norm.includes('öffnen') ||
    norm.includes('открыть') ||
    norm.includes('покажи');

  // Live Exchange Rates
  const usdRate = getCrossRate('USD', 'TRY').toFixed(2);
  const eurRate = getCrossRate('EUR', 'TRY').toFixed(2);

  // --------------------------------------------------------------------------
  // BROAD INTENT 1: PASSPORT POWER & STATS ("Kaç ülkeye vizesiz gidebilirim?", "Vize", "Vizeler")
  // --------------------------------------------------------------------------
  if (
    !targetCountry &&
    (norm === 'vize' ||
      norm === 'vizesiz' ||
      norm === 'vizeler' ||
      norm === 'visa' ||
      norm === 'visas' ||
      norm === 'visum' ||
      norm === 'visado' ||
      norm === 'виза' ||
      norm.includes('kac ulke') ||
      norm.includes('kac ulkeye') ||
      norm.includes('pasaport gucu') ||
      norm.includes('vizesiz kac') ||
      norm.includes('pasaportumla kac') ||
      norm.includes('how many countries') ||
      norm.includes('passport power') ||
      norm.includes('wie viele lander') ||
      norm.includes('cuantos paises') ||
      norm.includes('сколько стран'))
  ) {
    const freeCount = passportItems.filter((it) => it.cat === 'free').length;
    const evisaCount = passportItems.filter((it) => it.cat === 'evisa' || it.cat === 'voa' || it.cat === 'eta').length;
    const idCount = passportItems.filter((it) => it.id).length;
    const totalEasy = freeCount + evisaCount;

    const mapAction: AssistantActionPill = {
      id: 'tab-where',
      type: 'switch_tab',
      tabKey: 'where_can_i_go',
      label: isTr ? '🌍 Vizesiz Haritayı Aç' : isDe ? '🌍 Visafreie Karte' : isEs ? '🌍 Mapa sin visado' : isRu ? '🌍 Безвизовая карта' : '🌍 Open Visa-Free Map',
      accentTone: 'teal'
    };
    const compareAction: AssistantActionPill = {
      id: 'tab-compare',
      type: 'switch_tab',
      tabKey: 'compare',
      label: isTr ? '⚖️ Pasaportları Karşılaştır' : isDe ? '⚖️ Pässe vergleichen' : isEs ? '⚖️ Comparar pasaportes' : isRu ? '⚖️ Сравнить паспорта' : '⚖️ Compare Passports',
      accentTone: 'sky'
    };

    actions.push(mapAction, compareAction);

    const localizedText = isTr
      ? `🛂 **${originName} Pasaport Gücü & Seyahat İstatistikleri:**\n\n` +
        `• **Tamamen Vizesiz:** **${freeCount} Ülke**\n` +
        `• **Kapıda Vize / E-Vize Kolaylığı:** **${evisaCount} Ülke**\n` +
        `• **Çipli Kimlikle (Pasaportsuz) Giriş:** **${idCount} Ülke**\n` +
        `• **Toplam Vizesiz & Kolay Seyahat:** **${totalEasy} Ülke**\n\n` +
        `Tüm ülkeleri harita üzerinde interaktif olarak filtrelemek için aşağıdaki butona dokunabilirsiniz.`
      : isDe
      ? `🛂 **${originName} Pass-Stärke & Reise-Kennzahlen:**\n\n` +
        `• **Visafrei:** **${freeCount} Länder**\n` +
        `• **Visum bei Ankunft / eVisa:** **${evisaCount} Länder**\n` +
        `• **Mit Personalausweis:** **${idCount} Länder**\n` +
        `• **Gesamter einfacher Zugang:** **${totalEasy} Länder**`
      : isEs
      ? `🛂 **Poder del Pasaporte & Métricas (${originName}):**\n\n` +
        `• **Sin visado:** **${freeCount} países**\n` +
        `• **Visado a la llegada / eVisa:** **${evisaCount} países**\n` +
        `• **Entrada con DNI:** **${idCount} países**\n` +
        `• **Acceso fácil total:** **${totalEasy} países**`
      : isRu
      ? `🛂 **Сила паспорта (${originName}) и статистика:**\n\n` +
        `• **Без визы:** **${freeCount} стран**\n` +
        `• **Виза по прибытии / eVisa:** **${evisaCount} стран**\n` +
        `• **Въезд по ID-карте:** **${idCount} стран**\n` +
        `• **Всего доступных стран:** **${totalEasy} стран**`
      : `🛂 **${originName} Passport Power & Travel Metrics:**\n\n` +
        `• **Visa-Free Destinations:** **${freeCount} countries**\n` +
        `• **Visa on Arrival / eVisa:** **${evisaCount} countries**\n` +
        `• **ID-Card Travel Eligible:** **${idCount} countries**\n` +
        `• **Total Easy Access:** **${totalEasy} destinations**`;

    const spoken = isTr
      ? `${originName} pasaportuyla ${freeCount} ülkeye vizesiz, toplam ${totalEasy} ülkeye kolayca gidebilirsiniz.`
      : isDe
      ? `Mit dem Pass von ${originName} können Sie in ${freeCount} Länder visafrei reisen.`
      : isEs
      ? `Con el pasaporte de ${originName} tienes acceso sin visado a ${freeCount} países.`
      : isRu
      ? `С паспортом ${originName} вам доступно без визы ${freeCount} стран.`
      : `With a ${originName} passport, you have visa-free access to ${freeCount} countries worldwide.`;

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: localizedText,
      spokenText: spoken,
      timestamp: new Date(),
      actions: actions.slice(0, 2),
      detectedLang: activeLang,
      autoTriggerAction: isOpenIntent ? mapAction : undefined
    };
  }

  // --------------------------------------------------------------------------
  // BROAD INTENT 2: NATIONAL ID CARD TRAVEL ("Kimlik", "Kimlikle")
  // --------------------------------------------------------------------------
  if (
    !targetCountry &&
    (norm === 'kimlik' ||
      norm === 'kimlikle' ||
      norm === 'pasaportsus' ||
      norm === 'pasaportsuz' ||
      norm.includes('kimlik') ||
      norm.includes('kimlikle') ||
      norm.includes('id card') ||
      norm.includes('personalausweis') ||
      norm.includes('sin pasaporte'))
  ) {
    const idCountries = passportItems
      .filter((it) => it.id)
      .map((it) => `${getFlag(it.c)} **${getCountryName(it.c, activeLang)}** (${it.v === 'vf' ? (isTr ? 'Süresiz' : 'Indefinite') : `${it.v} ${isTr ? 'Gün' : 'Days'}`})`);

    const geAction: AssistantActionPill = {
      id: 'open-ge',
      type: 'open_country',
      countryCode: 'GE',
      label: isTr ? '🇬🇪 Gürcistan Rehberi' : '🇬🇪 Georgia Guide',
      accentTone: 'teal'
    };
    const baAction: AssistantActionPill = {
      id: 'open-ba',
      type: 'open_country',
      countryCode: 'BA',
      label: isTr ? '🇧🇦 Bosna Hersek Rehberi' : '🇧🇦 Bosnia Guide',
      accentTone: 'sky'
    };
    actions.push(geAction, baAction);

    const text = isTr
      ? `🆔 **${originName} Vatandaşlarının Yalnızca Çipli Kimlikle Gidebildiği Ülkeler:**\n\n` +
        `${idCountries.join('\n')}\n\n` +
        `*Ayrıca KKTC'ye de yeni çipli kimlik kartınızla doğrudan giriş yapabilirsiniz.*\n\n` +
        `⚠️ **Önemli Not:** Seyahatte kimlik kartınızın yeni çipli ve fotoğraflı olması zorunludur. Eski nüfus cüzdanları geçerli değildir.`
      : `🆔 **Countries accessible with only your National ID Card:**\n\n${idCountries.join('\n')}`;

    const spoken = isTr
      ? 'Gürcistan, Sırbistan, Bosna Hersek, Azerbaycan ve Moldova dahil 6 ülkeye pasaportsuz çipli kimlikle gidebilirsiniz.'
      : 'You can travel to several destinations using only your national ID card.';

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text,
      spokenText: spoken,
      timestamp: new Date(),
      actions: actions.slice(0, 2),
      detectedLang: activeLang,
      autoTriggerAction: isOpenIntent ? geAction : undefined
    };
  }

  // --------------------------------------------------------------------------
  // BROAD INTENT 3: POWER PLUGS & VOLTAGE ("Priz", "Prizler", "Voltaj", "Plug")
  // --------------------------------------------------------------------------
  if (
    !targetCountry &&
    (norm === 'priz' ||
      norm === 'prizler' ||
      norm === 'voltaj' ||
      norm === 'adaptor' ||
      norm === 'adaptör' ||
      norm === 'plug' ||
      norm === 'plugs' ||
      norm === 'stecker' ||
      norm === 'enchufe' ||
      norm === 'enchufes' ||
      norm === 'розетка' ||
      norm.includes('priz tipi') ||
      norm.includes('plug type'))
  ) {
    const packingAction: AssistantActionPill = {
      id: 'tool-packing',
      type: 'open_tool',
      toolKey: 'packing',
      label: isTr ? '🧳 Valizine Adaptör Ekle' : '🧳 Add Adapter to Packing List',
      accentTone: 'teal'
    };
    actions.push(packingAction);

    const text = isTr
      ? `🔌 **Dünya Priz & Elektrik Standartları Rehberi:**\n\n` +
        `• **Avrupa & Türkiye:** Tip C ve F (230V, 50Hz)\n` +
        `• **İngiltere & Körfez Ülkeleri:** Tip G (Üç köşeli kalın pimler)\n` +
        `• **ABD, Kanada & Japonya:** Tip A ve B (İki düz yassı pim, 100-120V)\n` +
        `• **Avustralya & Yeni Zelanda:** Tip I (Açılı iki yassı pim)\n\n` +
        `Gideceğiniz ülkenin priz tipini öğrenmek için doğrudan ülke adını (örneğin *"Japonya priz"*) yazabilirsiniz.`
      : `🔌 **Global Electrical & Plug Standards:**\n\n• **Europe:** Type C / F (230V)\n• **UK & Gulf:** Type G\n• **USA & Japan:** Type A / B (110-120V)\n• **Australia:** Type I`;

    const spoken = isTr
      ? 'Gideceğiniz ülkenin prizini öğrenmek için doğrudan ülke adını söyleyebilirsiniz.'
      : 'You can ask about plug standards for any specific destination.';

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text,
      spokenText: spoken,
      timestamp: new Date(),
      actions: actions.slice(0, 2),
      detectedLang: activeLang,
      autoTriggerAction: isOpenIntent ? packingAction : undefined
    };
  }

  // --------------------------------------------------------------------------
  // BROAD INTENT 4: TIPPING CALCULATOR ("Bahşiş", "Tip", "Tipping")
  // --------------------------------------------------------------------------
  if (
    !targetCountry &&
    (norm === 'bahsis' ||
      norm === 'bahşiş' ||
      norm === 'tip' ||
      norm === 'tipping' ||
      norm === 'trinkgeld' ||
      norm === 'propina' ||
      norm === 'чаевые' ||
      norm.includes('bahsis'))
  ) {
    const tipAction: AssistantActionPill = {
      id: 'tool-tipping',
      type: 'open_tool',
      toolKey: 'tipping',
      label: isTr ? '💸 Küresel Bahşiş Hesaplayıcı' : '💸 Global Tipping Calculator',
      accentTone: 'amber'
    };
    actions.push(tipAction);

    const text = isTr
      ? '💸 **Dünya Bahşiş Kültürü & Oranları:**\n\n• **ABD & Kanada:** %18 - %22 (Neredeyse zorunludur).\n• **Avrupa:** %5 - %10 veya hesabı yuvarlama.\n• **Japonya & G. Kore:** Bahşiş kaba ve hakaret kabul edilir (0%).\n• **Güneydoğu Asya:** Küçük bozuklukları bırakmak yeterlidir.'
      : '💸 **Global Tipping Standards:**\n\n• **USA & Canada:** 18% - 22% expected.\n• **Europe:** 5% - 10% or round up.\n• **Japan & Korea:** Tipping is considered rude.\n• **Southeast Asia:** Modest change is appreciated.';

    const spoken = isTr
      ? 'Japonya ve Kore haricinde çoğu ülkede yüzde 10 civarı bahşiş yaygındır.'
      : 'Tipping standards vary from 20% in the US to zero in Japan.';

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text,
      spokenText: spoken,
      timestamp: new Date(),
      actions: actions.slice(0, 2),
      detectedLang: activeLang,
      autoTriggerAction: isOpenIntent ? tipAction : undefined
    };
  }

  // --------------------------------------------------------------------------
  // BROAD INTENT 5: TAXI & RIDE-HAILING APPS ("Taksi", "Taxi", "Ulaşım")
  // --------------------------------------------------------------------------
  if (
    !targetCountry &&
    (norm === 'taksi' ||
      norm === 'taxi' ||
      norm === 'ulasim' ||
      norm === 'ulaşım' ||
      norm.includes('taksi') ||
      norm.includes('ride app'))
  ) {
    const transitAction: AssistantActionPill = {
      id: 'aff-omio',
      type: 'affiliate',
      url: 'https://www.omio.com',
      badge: isTr ? 'Bilet Karşılaştır' : 'Book Transit',
      label: isTr ? '🚆 Tren & Otobüs Biletleri (Omio)' : '🚆 Compare Transit Tickets',
      accentTone: 'sky'
    };
    actions.push(transitAction);

    const text = isTr
      ? `🚖 **Dünya Genelinde En Güvenilir Taksi Uygulamaları:**\n\n` +
        `• **Güneydoğu Asya (Tayland, Bali, Vietnam):** **Grab** veya **Bolt**\n` +
        `• **Avrupa:** **Bolt**, **FreeNow** ve **Uber**\n` +
        `• **Orta Doğu & BAE:** **Careem** ve **Uber**\n` +
        `• **Orta Asya & Kafkaslar:** **Yandex Go**\n` +
        `• **Japonya:** **GO** ve **JapanTaxi**`
      : `🚖 **Top Global Ride-Hailing Apps:**\n\n• **Southeast Asia:** Grab, Bolt\n• **Europe:** Bolt, FreeNow, Uber\n• **Middle East:** Careem\n• **Central Asia:** Yandex Go\n• **Japan:** GO`;

    const spoken = isTr
      ? 'Asya için Grab, Avrupa için Bolt ve Orta Doğu için Careem uygulamalarını öneriyoruz.'
      : 'We recommend Grab in Asia, Bolt in Europe, and Careem in the Middle East.';

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text,
      spokenText: spoken,
      timestamp: new Date(),
      actions: actions.slice(0, 2),
      detectedLang: activeLang
    };
  }

  // --------------------------------------------------------------------------
  // BROAD INTENT 6: CURRENCY & LIVE RATES ("Döviz", "Kur", "Para", "Dolar", "Euro")
  // --------------------------------------------------------------------------
  if (
    !targetCountry &&
    (norm === 'doviz' ||
      norm === 'döviz' ||
      norm === 'kur' ||
      norm === 'kurlar' ||
      norm === 'para' ||
      norm === 'currency' ||
      norm === 'dolar' ||
      norm === 'euro' ||
      norm.includes('doviz') ||
      norm.includes('kur') ||
      norm.includes('wechselkurs'))
  ) {
    const fxAction: AssistantActionPill = {
      id: 'radar-fx',
      type: 'open_tool',
      toolKey: 'radar',
      radarMode: 'currency',
      label: isTr ? '💱 Canlı Döviz Radarı' : '💱 Live FX Radar',
      accentTone: 'teal'
    };
    const wiseAction: AssistantActionPill = {
      id: 'aff-wise',
      type: 'affiliate',
      url: 'https://wise.com',
      badge: isTr ? 'Sıfır Komisyon' : 'Zero Markup',
      label: isTr ? '💳 Wise Çoklu Döviz Kartı Al' : '💳 Get Wise Travel Card',
      accentTone: 'sky'
    };
    actions.push(fxAction, wiseAction);

    const text = isTr
      ? `💱 **Canlı Seyahat Döviz Kurları:**\n\n• **1 USD = ${usdRate} TRY**\n• **1 EUR = ${eurRate} TRY**\n\nYurt dışı harcamalarınızda fahiş banka döviz komisyonlarından kaçınmak için Wise çok para birimli dijital kartını kullanabilirsiniz.`
      : `💱 **Live Baseline Travel Rates:**\n\n• **1 USD = ${usdRate} TRY**\n• **1 EUR = ${eurRate} TRY**`;

    const spoken = isTr
      ? `Canlı kurlar: 1 Dolar ${usdRate} lira, 1 Euro ${eurRate} liradır.`
      : `Current travel rates are 1 US Dollar at ${usdRate} Lira, and 1 Euro at ${eurRate} Lira.`;

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text,
      spokenText: spoken,
      timestamp: new Date(),
      actions: actions.slice(0, 2),
      detectedLang: activeLang,
      autoTriggerAction: isOpenIntent ? fxAction : undefined
    };
  }

  // --------------------------------------------------------------------------
  // BROAD INTENT 7: SCHENGEN 90/180 DAY COUNTER ("Schengen", "90 gün")
  // --------------------------------------------------------------------------
  if (norm.includes('schengen') || norm.includes('90 180') || norm.includes('gun sayac') || norm.includes('90 gun') || norm.includes('kac gunum')) {
    const counterAction: AssistantActionPill = {
      id: 'tab-counter',
      type: 'switch_tab',
      tabKey: 'day_counter',
      label: isTr ? '📅 90/180 Gün Sayacını Aç' : '📅 Open 90/180 Day Counter',
      accentTone: 'teal'
    };
    actions.push(counterAction);

    const text = isTr
      ? `🇪🇺 **Schengen 90/180 Kuralı Nasıl Çalışır?**\n\n` +
        `Schengen bölgesinde herhangi bir **180 günlük geriye dönük zaman diliminde en fazla 90 gün** kalabilirsiniz.\n\n` +
        `• Giriş ve çıkış yaptığınız günler tam gün sayılır.\n` +
        `• Kural takvim yılına göre değil, her seyahat gününden geriye doğru son 180 gün taranarak hesaplanır.\n\n` +
        `İhlal riskine girmemek ve kalan gününüzü kesin hesaplamak için **90/180 Gün Sayacı** sekmemizi kullanabilirsiniz.`
      : `🇪🇺 **Schengen 90/180-Day Rule:**\n\nYou may stay a maximum of 90 days within any rolling 180-day window. Use our Day Counter to compute your remaining days accurately.`;

    const spoken = isTr
      ? 'Schengen bölgesinde son 180 gün içinde en fazla 90 gün kalabilirsiniz. Gün sayacını ekrana getirdim.'
      : 'The Schengen rule allows up to 90 days in any rolling 180-day period.';

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text,
      spokenText: spoken,
      timestamp: new Date(),
      actions: actions.slice(0, 2),
      detectedLang: activeLang,
      autoTriggerAction: isOpenIntent ? counterAction : undefined
    };
  }

  // --------------------------------------------------------------------------
  // BROAD INTENT 8: TRANSIT VISA & AIRPORT LAYOVER
  // --------------------------------------------------------------------------
  if (norm.includes('transit') || norm.includes('aktarma') || norm.includes('aktarmali') || norm.includes('layover')) {
    const radarAction: AssistantActionPill = {
      id: 'tab-where',
      type: 'switch_tab',
      tabKey: 'where_can_i_go',
      label: isTr ? '🌍 Vize Radarında Araştır' : '🌍 Check Visa Radar',
      accentTone: 'teal'
    };
    actions.push(radarAction);

    const text = isTr
      ? `✈️ **Aktarmalı Uçuşlarda Transit Vize Kuralları:**\n\n` +
        `1. **Hava Tarafı Transit (Airside):** Tek biletle (aynı rezervasyon koduyla) seyahat ediyorsanız, bagajınızı aktarma noktasında teslim almıyorsanız ve transit alandan çıkmıyorsanız (Doha, Dubai, Frankfurt vb.) çoğu ülke transit vize istemez.\n` +
        `2. **Kara Tarafı Transit (Landside):** Ayrı ayrı bilet aldıysanız ve bavulunuzu alıp yeniden kontuara vermeniz gerekiyorsa ülkeye resmi giriş sayılır ve standart vize gerekir.\n` +
        `3. **Özel İstisna:** ABD ve Kanada'da hava tarafı transit yoktur; sadece aktarma yapacak olsanız dahi C-1 Transit Vizesi veya eTA zorunludur.`
      : `✈️ **Transit Visa & Airport Layover Rules:**\n\nAirside transit usually requires no visa if on a single ticket without claiming baggage. Note that the US and Canada require transit visas even for brief airport layovers.`;

    const spoken = isTr
      ? 'Tek biletle uçup bagaj almadığınız sürece çoğu ülkede transit vize gerekmez; ancak ABD ve Kanada transit vize ister.'
      : 'Airside transit generally does not require a visa unless transiting via the United States or Canada.';

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text,
      spokenText: spoken,
      timestamp: new Date(),
      actions: actions.slice(0, 2),
      detectedLang: activeLang,
      autoTriggerAction: isOpenIntent ? radarAction : undefined
    };
  }

  // --------------------------------------------------------------------------
  // BROAD INTENT 9: PACKING LIST / VALİZ HAZIRLAMA
  // --------------------------------------------------------------------------
  if (norm === 'valiz' || norm === 'bavul' || norm === 'packing' || norm.includes('valiz') || norm.includes('bavul')) {
    const packingAction: AssistantActionPill = {
      id: 'tool-packing',
      type: 'open_tool',
      toolKey: 'packing',
      label: isTr ? '🧳 İnteraktif Valiz Listesini Aç' : '🧳 Open Packing Checklist',
      accentTone: 'teal'
    };
    actions.push(packingAction);

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: isTr
        ? '🧳 **Akıllı Valiz Hazırlama Kontrol Listesi:**\n\nGideceğiniz ülkenin iklimine, priz tipine ve seyahat türünüze (sırt çantalı, iş, tatil) göre özelleştirilmiş valiz listenizi sitemizin araçlar panelinden yönetebilirsiniz.'
        : '🧳 **Smart Packing Checklist:**\n\nManage your personalized travel packing list tailored to destination climate, plug adapters, and luggage allowances.',
      spokenText: isTr
        ? 'Valiz kontrol listenizi ekrana getirdim.'
        : 'I have opened your smart packing checklist.',
      timestamp: new Date(),
      actions: actions.slice(0, 2),
      detectedLang: activeLang,
      autoTriggerAction: isOpenIntent ? packingAction : undefined
    };
  }

  // --------------------------------------------------------------------------
  // BROAD INTENT 10: RADAR / WORLD MAP ("Nereye gidebilirim?", "Radar", "Harita")
  // --------------------------------------------------------------------------
  if (
    !targetCountry &&
    (norm === 'radar' ||
      norm === 'harita' ||
      norm === 'map' ||
      norm.includes('nereye') ||
      norm.includes('nerelere') ||
      norm.includes('tatil yeri') ||
      norm.includes('where can i go'))
  ) {
    const radarAction: AssistantActionPill = {
      id: 'tab-where',
      type: 'switch_tab',
      tabKey: 'where_can_i_go',
      label: isTr ? '🌍 Dünya Radarında Vizesiz Yerleri Gör' : '🌍 Visa-Free World Radar',
      accentTone: 'teal'
    };
    const thAction: AssistantActionPill = {
      id: 'open-th',
      type: 'open_country',
      countryCode: 'TH',
      label: isTr ? '🇹🇭 Tayland (Tropik)' : '🇹🇭 Thailand',
      accentTone: 'coral'
    };
    actions.push(radarAction, thAction);

    const text = isTr
      ? `✈️ **${originName} Pasaportu İle En Popüler Vizesiz Rotalar:**\n\n` +
        `🌴 **Sıcak & Tropik:** Tayland (30-60 Gün), Bali/Endonezya (Kapıda Vize), Malezya (90 Gün), Maldivler (30 Gün)\n\n` +
        `🏰 **Balkanlar & Kültür:** Karadağ (90 Gün), Sırbistan (90 Gün), Arnavutluk (90 Gün), Bosna-Hersek (90 Gün)\n\n` +
        `🏔️ **Yakın & Kimlikle:** Gürcistan (1 Yıl), Azerbaycan (90 Gün)`
      : `✈️ **Top Visa-Free Destinations for ${originName} Passport:**\n\n` +
        `🌴 **Tropical Beaches:** Thailand, Indonesia (Bali), Malaysia, Maldives\n` +
        `🏰 **Balkans & Europe:** Montenegro, Serbia, Albania, Bosnia\n` +
        `🏔️ **Neighboring:** Georgia, Azerbaijan`;

    const spoken = isTr
      ? 'Balkanlar, Tayland, Gürcistan ve Karadağ dahil popüler vizesiz rotaları ekranda listeledim.'
      : 'I have displayed popular visa-free destination options on your screen.';

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text,
      spokenText: spoken,
      timestamp: new Date(),
      actions: actions.slice(0, 2),
      detectedLang: activeLang,
      autoTriggerAction: isOpenIntent ? radarAction : undefined
    };
  }

  // ==========================================================================
  // TARGET COUNTRY FOUND (ANY OF 199 COUNTRIES)
  // Handles all granular sub-intents: Plugs, Tipping, Taxis, Climate, Food, Itinerary,
  // Safety, Currencies, SIM/eSIM, Nomad Visas, Consular Lost Passport, and General Dossier.
  // ==========================================================================
  if (targetCountry) {
    const cName = getCountryName(targetCountry, activeLang);
    const flag = getFlag(targetCountry);
    const item = passportItems.find((i) => i.c === targetCountry);
    const geo = getCountryGeography(targetCountry, activeLang);
    const insights = getCountryInsights(targetCountry, activeLang);
    const itinerary = getCountryItinerary(targetCountry, activeLang);
    const practical = getPracticalInfo(targetCountry, activeLang);
    const badgeLabel = getCategoryBadgeLabel(item, activeLang);
    const stayLimitText = item?.v === 'vf' ? (isTr ? 'Süresiz' : 'Indefinite') : /^\d+$/.test(item?.v || '') ? `${item?.v} ${isTr ? 'Gün' : 'Days'}` : '';

    // Primary action: Always open full 360 Country Dossier
    const primaryDossierAction: AssistantActionPill = {
      id: `open-${targetCountry}`,
      type: 'open_country',
      countryCode: targetCountry,
      label: isTr ? `${flag} ${cName} 360° Dosyası` : `${flag} Open ${cName} Dossier`,
      accentTone: 'teal'
    };

    // ------------------------------------------------------------------------
    // SUB-INTENT A: PLUGS, POWER & VOLTAGE
    // ------------------------------------------------------------------------
    if (
      norm.includes('priz') ||
      norm.includes('fis') ||
      norm.includes('fiş') ||
      norm.includes('voltaj') ||
      norm.includes('plug') ||
      norm.includes('stecker') ||
      norm.includes('enchufe') ||
      norm.includes('розетка') ||
      norm.includes('elektrik') ||
      norm.includes('adaptor')
    ) {
      const packingAction: AssistantActionPill = {
        id: `tool-packing`,
        type: 'open_tool',
        toolKey: 'packing',
        label: isTr ? '🧳 Valizine Adaptör Ekle' : '🧳 Add Adapter to Packing List',
        accentTone: 'sky'
      };
      actions.push(primaryDossierAction, packingAction);

      const plugText = typeof geo.plugTypes === 'string' ? geo.plugTypes : 'C, F';

      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        detectedCountry: { code: targetCountry, name: cName, flag },
        text: isTr
          ? `🔌 **${flag} ${cName} Elektrik & Priz Standartları:**\n\n` +
            `• **Priz Tipleri:** **${plugText}**\n` +
            `• **Pratik Rehber:** ${practical.plugType}\n\n` +
            `Türkiye standart C/F fişlerinizin uyumlu olup olmadığını kontrol etmek ve valizinize üniversal adaptör eklemek için araçlarımızı kullanabilirsiniz.`
          : `🔌 **${flag} ${cName} Electrical & Plug Standards:**\n\n` +
            `• **Plug Types:** **${plugText}**\n` +
            `• **Practical Guide:** ${practical.plugType}`,
        spokenText: isTr
          ? `${cName} priz standartları ${plugText}. Detaylar ekrandadır.`
          : `${cName} uses power plug standard ${plugText}.`,
        timestamp: new Date(),
        actions: actions.slice(0, 2),
        detectedLang: activeLang,
        autoTriggerAction: isOpenIntent ? primaryDossierAction : undefined
      };
    }

    // ------------------------------------------------------------------------
    // SUB-INTENT B: TIPPING & GRATUITY ETIQUETTE
    // ------------------------------------------------------------------------
    if (norm.includes('bahsis') || norm.includes('tip') || norm.includes('trinkgeld') || norm.includes('propina') || norm.includes('чаевые')) {
      const tipAction: AssistantActionPill = {
        id: 'tool-tipping',
        type: 'open_tool',
        toolKey: 'tipping',
        label: isTr ? '💸 Bahşiş Hesaplayıcı' : '💸 Tipping Calc',
        accentTone: 'amber'
      };
      actions.push(primaryDossierAction, tipAction);

      const tipAdvice = insights?.transport?.taxiAdvice || practical.localEtiquette;

      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        detectedCountry: { code: targetCountry, name: cName, flag },
        text: isTr
          ? `💸 **${flag} ${cName} Bahşiş Adabı:**\n\n` +
            `• **Genel Standart:** Restoran ve kafelerde hesabın %5 ila %10'u kadar bahşiş veya para üstünü yuvarlamak yeterlidir.\n` +
            `• **Yerel Görgü Kuralı:** ${practical.localEtiquette}\n` +
            `• **Taksi & Ulaşım:** ${tipAdvice}`
          : `💸 **${flag} ${cName} Tipping Culture:**\n\n${practical.localEtiquette}`,
        spokenText: isTr
          ? `${cName} için bahşiş kuralları ve görgü adabını ekrana getirdim.`
          : `Tipping etiquette for ${cName} has been displayed on screen.`,
        timestamp: new Date(),
        actions: actions.slice(0, 2),
        detectedLang: activeLang,
        autoTriggerAction: isOpenIntent ? primaryDossierAction : undefined
      };
    }

    // ------------------------------------------------------------------------
    // SUB-INTENT C: TAXIS & RIDE-HAILING APPS
    // ------------------------------------------------------------------------
    if (
      norm.includes('taksi') ||
      norm.includes('taxi') ||
      norm.includes('uber') ||
      norm.includes('bolt') ||
      norm.includes('grab') ||
      norm.includes('careem') ||
      norm.includes('yandex') ||
      norm.includes('ulasim') ||
      norm.includes('transport')
    ) {
      const isAsia = ['TH', 'VN', 'ID', 'MY', 'JP', 'KR', 'KH'].includes(targetCountry);
      const transitLink: AssistantActionPill = {
        id: isAsia ? 'aff-12go' : 'aff-omio',
        type: 'affiliate',
        url: isAsia ? 'https://12go.asia' : 'https://www.omio.com',
        badge: isTr ? 'Bilet Karşılaştır' : 'Book Transit',
        label: isTr ? '🚆 Tren & Otobüs Bileti Al' : '🚆 Compare Transit Tickets',
        accentTone: 'sky'
      };
      actions.push(primaryDossierAction, transitLink);

      const rideApps = insights?.transport?.popularRideApps?.join(', ') || 'Grab, Bolt, Uber';
      const taxiAdvice = insights?.transport?.taxiAdvice || 'Taksimetre açtırmayı unutmayınız.';

      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        detectedCountry: { code: targetCountry, name: cName, flag },
        text: isTr
          ? `🚖 **${flag} ${cName} Taksi & Şehir İçi Ulaşım Rehberi:**\n\n` +
            `• **Popüler Araç Çağırma Uygulamaları:** **${rideApps}**\n` +
            `• **Taksi Tavsiyesi:** ${taxiAdvice}\n` +
            `• **Ulaşım Seviyesi:** ${insights?.transport?.costLevel || 'Ekonomik / Orta'}`
          : `🚖 **${flag} ${cName} Taxi & Transit Guide:**\n\n` +
            `• **Recommended Ride Apps:** **${rideApps}**\n` +
            `• **Local Taxi Advice:** ${taxiAdvice}`,
        spokenText: isTr
          ? `${cName} için en popüler taksi uygulamaları: ${rideApps}.`
          : `The most reliable ride-hailing apps in ${cName} are ${rideApps}.`,
        timestamp: new Date(),
        actions: actions.slice(0, 2),
        detectedLang: activeLang,
        autoTriggerAction: isOpenIntent ? primaryDossierAction : undefined
      };
    }

    // ------------------------------------------------------------------------
    // SUB-INTENT D: CLIMATE & BEST SEASON TO VISIT
    // ------------------------------------------------------------------------
    if (
      norm.includes('ne zaman gidilir') ||
      norm.includes('hangi ay') ||
      norm.includes('iklim') ||
      norm.includes('hava durumu') ||
      norm.includes('hava') ||
      norm.includes('mevsim') ||
      norm.includes('weather') ||
      norm.includes('climate') ||
      norm.includes('best time')
    ) {
      const weatherAction: AssistantActionPill = {
        id: 'radar-weather',
        type: 'open_tool',
        toolKey: 'radar',
        radarMode: 'weather',
        label: isTr ? '🌦️ Canlı Hava Durumu Radarı' : '🌦️ Live Weather Radar',
        accentTone: 'sky'
      };
      actions.push(primaryDossierAction, weatherAction);

      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        detectedCountry: { code: targetCountry, name: cName, flag },
        text: isTr
          ? `☀️ **${flag} ${cName} İçin En İdeal Ziyaret Dönemi:**\n\n` +
            `• **En İyi Aylar:** **${practical.bestMonths}**\n` +
            `• **Mevsim Tavsiyesi:** ${itinerary?.bestSeason || 'İlkbahar ve sonbahar ayları gezmek için en konforlu zamandır.'}`
          : `☀️ **${flag} Best Time to Visit ${cName}:**\n\n` +
            `• **Optimal Months:** **${practical.bestMonths}**\n` +
            `• **Season Advice:** ${itinerary?.bestSeason || 'Spring and Autumn offer the most pleasant weather.'}`,
        spokenText: isTr
          ? `${cName} seyahati için en ideal aylar: ${practical.bestMonths}.`
          : `The best time to visit ${cName} is during ${practical.bestMonths}.`,
        timestamp: new Date(),
        actions: actions.slice(0, 2),
        detectedLang: activeLang,
        autoTriggerAction: isOpenIntent ? primaryDossierAction : undefined
      };
    }

    // ------------------------------------------------------------------------
    // SUB-INTENT E: GASTRONOMY & CUISINE
    // ------------------------------------------------------------------------
    if (
      norm.includes('yemek') ||
      norm.includes('mutfak') ||
      norm.includes('ne yenir') ||
      norm.includes('gastronomi') ||
      norm.includes('food') ||
      norm.includes('cuisine') ||
      norm.includes('lezzet')
    ) {
      const routeAction: AssistantActionPill = {
        id: 'tab-route',
        type: 'switch_tab',
        tabKey: 'route_planner',
        label: isTr ? '🗺️ Lezzet Duraklı Rota Çiz' : '🗺️ Route Planner',
        accentTone: 'coral'
      };
      actions.push(primaryDossierAction, routeAction);

      const dishes = (itinerary?.signatureGastronomy?.dishes || []).slice(0, 4).map((d) => `• **${d.name}:** ${d.desc}`).join('\n');
      const drinks = (itinerary?.signatureGastronomy?.drinks || []).slice(0, 2).map((d) => `• **${d.name}:** ${d.desc}`).join('\n');

      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        detectedCountry: { code: targetCountry, name: cName, flag },
        text: isTr
          ? `🍜 **${flag} ${cName} Meşhur Lezzetleri & Mutfak Kültürü:**\n\n` +
            `${dishes ? `**Öne Çıkan Yemekler:**\n${dishes}\n\n` : ''}` +
            `${drinks ? `**Geleneksel İçecekler:**\n${drinks}\n\n` : ''}` +
            `• *Gastronomi İpucu:* ${itinerary?.signatureGastronomy?.foodieTip || 'Yerel sokak pazarlarında taze lezzetleri deneyebilirsiniz.'}`
          : `🍜 **${flag} ${cName} Signature Gastronomy:**\n\n${dishes || 'Local specialties abound throughout the country.'}`,
        spokenText: isTr
          ? `${cName} için en meşhur lezzetleri ve geleneksel yemekleri ekrana getirdim.`
          : `I have displayed top gastronomic highlights for ${cName}.`,
        timestamp: new Date(),
        actions: actions.slice(0, 2),
        detectedLang: activeLang,
        autoTriggerAction: isOpenIntent ? primaryDossierAction : undefined
      };
    }

    // ------------------------------------------------------------------------
    // SUB-INTENT F: SIGHTSEEING ITINERARY & ROUTE
    // ------------------------------------------------------------------------
    if (
      norm.includes('rota') ||
      norm.includes('gezi') ||
      norm.includes('plan') ||
      norm.includes('durak') ||
      norm.includes('itinerary') ||
      norm.includes('gezilecek yerler') ||
      norm.includes('kac gun')
    ) {
      const routeAction: AssistantActionPill = {
        id: 'tab-route',
        type: 'switch_tab',
        tabKey: 'route_planner',
        label: isTr ? '🗺️ Rota Planlayıcıda Aç' : '🗺️ Open in Route Planner',
        accentTone: 'sky'
      };
      actions.push(primaryDossierAction, routeAction);

      const stopsSummary = (itinerary?.stops || [])
        .slice(0, 3)
        .map((s, idx) => `${idx + 1}. **${s.name}** (${s.durationBadge})`)
        .join('\n');

      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        detectedCountry: { code: targetCountry, name: cName, flag },
        text: isTr
          ? `🗺️ **${flag} ${cName} Gezi Rotası (${itinerary.idealDurationText}):**\n\n` +
            `${itinerary.routeSummary}\n\n` +
            `**Önemli Duraklar:**\n${stopsSummary}\n\n` +
            `• *İdeal Süre:* ${itinerary.idealDurationText} | *Ulaşım:* ${itinerary.transportMode}`
          : `🗺️ **${flag} ${cName} Itinerary Highlights (${itinerary.idealDurationText}):**\n\n` +
            `${itinerary.routeSummary}\n\n` +
            `**Key Stops:**\n${stopsSummary}`,
        spokenText: isTr
          ? `${cName} için ${itinerary.idealDurationText} rota planınız ekrana getirildi.`
          : `Your ${itinerary.idealDurationText} itinerary for ${cName} is ready on screen.`,
        timestamp: new Date(),
        actions: actions.slice(0, 2),
        detectedLang: activeLang,
        autoTriggerAction: isOpenIntent ? primaryDossierAction : undefined
      };
    }

    // ------------------------------------------------------------------------
    // SUB-INTENT G: SAFETY & EMERGENCY NUMBERS
    // ------------------------------------------------------------------------
    if (
      norm.includes('guvenli') ||
      norm.includes('guvenlik') ||
      norm.includes('safety') ||
      norm.includes('tehlikeli') ||
      norm.includes('scam') ||
      norm.includes('dolandirici') ||
      norm.includes('polis') ||
      norm.includes('ambulans') ||
      norm.includes('acil') ||
      norm.includes('emergency')
    ) {
      const consularAction: AssistantActionPill = {
        id: 'open-consular',
        type: 'switch_tab',
        tabKey: 'nomad_tools',
        label: isTr ? '🚨 24/7 Acil Konsolosluk & Güvenlik' : '🚨 Emergency Services',
        accentTone: 'coral'
      };
      actions.push(primaryDossierAction, consularAction);

      const em = insights?.safety?.emergencyNumbers || { police: '112', ambulance: '112', general: '112' };
      const safetyScore = insights?.safety?.safetyScore || 80;

      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        detectedCountry: { code: targetCountry, name: cName, flag },
        text: isTr
          ? `🛡️ **${flag} ${cName} Güvenlik & Acil Durum Bilgileri:**\n\n` +
            `• **Güvenlik Derecesi:** **${insights?.safety?.safetyLevel || 'Güvenli'}** (${safetyScore}/100)\n` +
            `• **Polis İmdat:** **${em.police}** | **Ambulans:** **${em.ambulance}** | **Genel Acil:** **${em.general}**\n` +
            `• **Genel Durum:** ${insights?.safety?.crimeRateSummary || 'Temel seyahat kurallarına dikkat ediniz.'}\n\n` +
            `🚨 *T.C. Dışişleri Bakanlığı 24/7 Konsolosluk Çağrı Merkezi:* **+90 312 292 29 29**`
          : `🛡️ **${flag} ${cName} Safety & Emergency Numbers:**\n\n` +
            `• **Safety Score:** ${safetyScore}/100 (${insights?.safety?.safetyLevel || 'Safe'})\n` +
            `• **Police:** ${em.police} | **Ambulance:** ${em.ambulance} | **Emergency:** ${em.general}`,
        spokenText: isTr
          ? `${cName} güvenlik skoru 100 üzerinden ${safetyScore}. Acil durum numaraları ekrandadır.`
          : `${cName} has a safety score of ${safetyScore} out of 100.`,
        timestamp: new Date(),
        actions: actions.slice(0, 2),
        detectedLang: activeLang,
        autoTriggerAction: isOpenIntent ? primaryDossierAction : undefined
      };
    }

    // ------------------------------------------------------------------------
    // SUB-INTENT H: CURRENCY & EXPENSES
    // ------------------------------------------------------------------------
    if (
      norm.includes('para') ||
      norm.includes('currency') ||
      norm.includes('doviz') ||
      norm.includes('pahali') ||
      norm.includes('ucuz') ||
      norm.includes('maliyet') ||
      norm.includes('butce')
    ) {
      const wiseCardAction: AssistantActionPill = {
        id: 'aff-wise',
        type: 'affiliate',
        url: 'https://wise.com',
        badge: isTr ? 'Sıfır Komisyon' : 'Zero Markup',
        label: isTr ? '💳 Wise Çoklu Döviz Kartı Al' : '💳 Get Wise Travel Card',
        accentTone: 'sky'
      };
      actions.push(primaryDossierAction, wiseCardAction);

      const costs = insights?.livingCosts;

      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        detectedCountry: { code: targetCountry, name: cName, flag },
        text: isTr
          ? `💰 **${flag} ${cName} Para Birimi & Seyahat Maliyeti:**\n\n` +
            `• **Resmi Para Birimi:** **${geo.currencyName}** (${geo.currencyCode})\n` +
            `• **Günlük Ortalama Bütçe:** ${costs?.dailyBudgetMidrangeUsd || '60 - 90 $'}\n` +
            `• **Ortalama Yemek:** ${costs?.budgetMealUsd || '5 - 12 $'}\n` +
            `• **3 Yıldızlı Otel Gecelik:** ${costs?.hotel3StarUsd || '35 - 70 $'}`
          : `💰 **${flag} ${cName} Currency & Costs:**\n\n` +
            `• **Currency:** **${geo.currencyName}** (${geo.currencyCode})\n` +
            `• **Daily Mid-range Budget:** ${costs?.dailyBudgetMidrangeUsd || '60 - 90 $'}\n` +
            `• **Meal Cost:** ${costs?.budgetMealUsd || '5 - 12 $'}`,
        spokenText: isTr
          ? `${cName} resmi para birimi ${geo.currencyName}. Günlük bütçe ortalama ${costs?.dailyBudgetMidrangeUsd || '70 dolar'} civarındadır.`
          : `${cName} uses the ${geo.currencyName}. Average daily budget is ${costs?.dailyBudgetMidrangeUsd || '70 dollars'}.`,
        timestamp: new Date(),
        actions: actions.slice(0, 2),
        detectedLang: activeLang,
        autoTriggerAction: isOpenIntent ? primaryDossierAction : undefined
      };
    }

    // ------------------------------------------------------------------------
    // SUB-INTENT I: SIM CARD & ESIM
    // ------------------------------------------------------------------------
    if (norm.includes('esim') || norm.includes('sim kart') || norm.includes('internet') || norm.includes('roaming')) {
      const airaloAction: AssistantActionPill = {
        id: 'aff-airalo',
        type: 'affiliate',
        url: 'https://www.airalo.com',
        badge: '5G eSIM',
        label: isTr ? `📱 Airalo ${cName} eSIM Al` : `📱 Airalo ${cName} eSIM`,
        accentTone: 'coral'
      };
      actions.push(primaryDossierAction, airaloAction);

      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        detectedCountry: { code: targetCountry, name: cName, flag },
        text: isTr
          ? `📱 **${flag} ${cName} İnternet & eSIM Önerisi:**\n\n${practical.esimTip}\n\nYurt dışı operatör roaming faturalarından kaçınmak için Airalo eSIM paketini uçağa binmeden kurmanızı tavsiye ederiz.`
          : `📱 **${flag} ${cName} Mobile Internet & eSIM:**\n\n${practical.esimTip}`,
        spokenText: isTr
          ? `${cName} için Airalo dijital e sim paketini öneriyoruz.`
          : `We recommend using an Airalo digital eSIM for your visit to ${cName}.`,
        timestamp: new Date(),
        actions: actions.slice(0, 2),
        detectedLang: activeLang,
        autoTriggerAction: isOpenIntent ? primaryDossierAction : undefined
      };
    }

    // ------------------------------------------------------------------------
    // DEFAULT TARGET COUNTRY INTENT: 360 Full Overview (Single-word query or general question)
    // ------------------------------------------------------------------------
    const airaloPill: AssistantActionPill = {
      id: 'aff-airalo',
      type: 'affiliate',
      url: 'https://www.airalo.com',
      badge: '5G eSIM',
      label: isTr ? `📱 Airalo ${cName} İnternet` : `📱 Airalo ${cName} eSIM`,
      accentTone: 'sky'
    };
    actions.push(primaryDossierAction, airaloPill);

    const plugText = typeof geo.plugTypes === 'string' ? geo.plugTypes : 'C, F';
    const safetyScore = insights?.safety?.safetyScore || 80;
    const safetyLevel = insights?.safety?.safetyLevel || (isTr ? 'Güvenli' : 'Safe');

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      detectedCountry: { code: targetCountry, name: cName, flag },
      text: isTr
        ? `🌍 **${flag} ${cName} Vize & Seyahat Durumu (${originName} Pasaportu İle):**\n\n` +
          `• **Vize Rejimi:** **${badgeLabel}** ${stayLimitText ? `(${stayLimitText})` : ''}\n` +
          `• **Başkent:** ${geo.capital}\n` +
          `• **Para Birimi:** ${geo.currencyName} (${geo.currencyCode})\n` +
          `• **Priz & Voltaj:** ${plugText}\n` +
          `• **Güvenlik:** ${safetyLevel} (${safetyScore}/100)\n` +
          `• **İdeal Ziyaret Dönemi:** ${practical.bestMonths}\n\n` +
          `Detaylı rehber ve harita için aşağıdaki butonları kullanabilirsiniz.`
        : `🌍 **${flag} ${cName} Visa & Travel Brief (for ${originName} Passport):**\n\n` +
          `• **Visa Status:** **${badgeLabel}** ${stayLimitText ? `(${stayLimitText})` : ''}\n` +
          `• **Capital:** ${geo.capital}\n` +
          `• **Currency:** ${geo.currencyName} (${geo.currencyCode})\n` +
          `• **Power Plugs:** ${plugText}\n` +
          `• **Safety Score:** ${safetyScore}/100 (${safetyLevel})\n` +
          `• **Best Season:** ${practical.bestMonths}`,
      spokenText: isTr
        ? `${originName} pasaportu için ${cName} vize durumu: ${badgeLabel} ${stayLimitText ? `, ${stayLimitText} kalış süresi` : ''}. Seyahat dosyasını hazırladım.`
        : `For ${originName} passport holders, ${cName} visa status is ${badgeLabel} ${stayLimitText ? `with up to ${stayLimitText}` : ''}.`,
      timestamp: new Date(),
      actions: actions.slice(0, 2),
      detectedLang: activeLang,
      autoTriggerAction: isOpenIntent ? primaryDossierAction : undefined
    };
  }

  // --------------------------------------------------------------------------
  // GENERAL FALLBACK: HIGH-PRECISION GUIDED SUGGESTIONS
  // --------------------------------------------------------------------------
  const radarFallback: AssistantActionPill = {
    id: 'tab-where',
    type: 'switch_tab',
    tabKey: 'where_can_i_go',
    label: isTr ? '🌍 Nereye Gidebilirim? (Dünya Radarı)' : '🌍 Where Can I Go? (Radar)',
    accentTone: 'teal'
  };
  const routeFallback: AssistantActionPill = {
    id: 'tab-route',
    type: 'switch_tab',
    tabKey: 'route_planner',
    label: isTr ? '🗺️ Çoklu Ülke Rota Planlayıcı' : '🗺️ Route Planner',
    accentTone: 'sky'
  };
  actions.push(radarFallback, routeFallback);

  return {
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    text: isTr
      ? `Sormak istediğiniz ülke adını veya seyahat konusunu belirtebilirsiniz:\n\n` +
        `• Tek kelime ülke adı: *"Norveç"*, *"Tayland"*, *"İtalya"*, *"Japonya"*\n` +
        `• Özel konular: *"Prizler"*, *"Bahşiş"*, *"Taksiler"*, *"Döviz Kurları"*, *"90 Gün Schengen"*`
      : `Please mention a country or travel topic:\n\n• Countries: *"Norway"*, *"Thailand"*, *"Japan"*\n• Topics: *"Plugs"*, *"Tipping"*, *"Taxis"*, *"Currencies"*, *"90-Day Schengen"*`,
    spokenText: isTr
      ? 'Araştırmak istediğiniz ülke adını veya seyahat sorusunu sorabilirsiniz.'
      : 'You can ask about any country or travel destination.',
    timestamp: new Date(),
    actions: actions.slice(0, 2),
    detectedLang: activeLang
  };
}

// ============================================================================
// SPEECH RECOGNITION (VOICE INPUT) CONTROLLER
// ============================================================================
let activeSpeechRecognition: any = null;

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}

export function isSpeechSynthesisSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'speechSynthesis' in window;
}

export function startVoiceRecognition(options: {
  lang: string;
  onResult: (transcript: string, isFinal: boolean) => void;
  onError: (error: string) => void;
  onEnd: () => void;
}): void {
  if (!isSpeechRecognitionSupported()) {
    options.onError('Tarayıcınız ses tanımayı desteklemiyor.');
    return;
  }

  try {
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognitionClass();

    const langCodeMap: Record<string, string> = {
      tr: 'tr-TR',
      en: 'en-US',
      de: 'de-DE',
      es: 'es-ES',
      ru: 'ru-RU',
      ja: 'ja-JP'
    };

    recognition.lang = langCodeMap[options.lang] || 'tr-TR';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      const text = final || interim;
      if (text) {
        options.onResult(text, Boolean(final));
      }
    };

    recognition.onerror = (event: any) => {
      options.onError(event.error || 'Ses algılanamadı.');
    };

    recognition.onend = () => {
      activeSpeechRecognition = null;
      options.onEnd();
    };

    activeSpeechRecognition = recognition;
    recognition.start();
  } catch (err: any) {
    options.onError(err?.message || 'Mikrofon başlatılamadı.');
  }
}

export function stopVoiceRecognition(): void {
  if (activeSpeechRecognition) {
    try {
      activeSpeechRecognition.stop();
    } catch {
      // Ignored
    }
    activeSpeechRecognition = null;
  }
}

/**
 * High-fidelity speech playback wrapper routing through aiVoiceService
 */
export function speakResponse(text: string, lang: string = 'tr', onEnd?: () => void): void {
  playNaturalSpeech(text, lang, onEnd);
}

export function stopSpeaking(): void {
  stopAllPlayback();
}
