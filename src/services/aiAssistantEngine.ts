/**
 * Vizamigo AI Copilot & Travel Concierge Intelligence Engine
 * Comprehensive multi-lingual natural language processor, destination mapper,
 * site action dispatcher, dynamic language auto-detector, and speech recognition coordinator.
 *
 * 100% mapped to Vizamigo's real navigation tabs:
 * - 'explore': Keşfet & Pano (Dashboard + Country Directory)
 * - 'plan': Rota & Sinerji (Route Planner + Passport Comparator)
 * - 'track': Cüzdan & Gün Sayacı (Wallet + 90/180 Day Counter)
 * - 'nomad': Gezgin Araçları & Göçebe (Nomad Hubs & DNV Tools)
 * - 'profile': Profil & SOS (Emergency Consular Support)
 * - 'consular': Diplomatik Kriz Masası (Consular Emergency)
 *
 * 100% mapped to Vizamigo's real modals:
 * - 'open_country': 360° Country Dossier Modal
 * - 'packing': Packing List Modal
 * - 'tipping': Tipping Calculator Modal
 * - 'overlap': Timezone Overlap Modal
 * - 'radar': Global Radar Modal ('all' | 'clock' | 'weather' | 'currency')
 */

import {
  getCountryName,
  getFlag,
  getCategoryBadgeLabel,
  getPracticalInfo,
  REGIONS,
  DIGITAL_NOMAD_VISAS
} from '../data/passportData';
import { getPassportItems } from '../utils/calculator';
import { getCountryGeography } from '../data/countryGeography';
import { getCountryInsights } from '../data/countryInsights';
import { getCountryItinerary } from '../data/countryItineraries';
import { getCrossRate } from '../data/currencyRates';
import { GEO_DATA } from '../data/geoData';
import { getConsularEmergencyInfo } from '../data/consularEmergencyData';
import { TabKey } from '../components/Navigation';
import { answerCountryQuestion } from './assistantCountryAnswer';
import {
  playNaturalSpeech,
  stopAllPlayback
} from './aiVoiceService';

export interface AssistantActionPill {
  id: string;
  type: 'open_country' | 'switch_tab' | 'open_tool' | 'affiliate';
  label: string;
  icon?: string;
  countryCode?: string;
  tabKey?: TabKey;
  toolKey?: 'packing' | 'tipping' | 'overlap' | 'radar';
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
  spokenText?: string;
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
// DYNAMIC QUERY LANGUAGE DETECTOR (Auto-detects TR, EN, DE, ES, RU)
// ============================================================================
export function detectQueryLanguage(rawQuery: string, fallbackLang: string = 'tr'): string {
  if (!rawQuery) return fallbackLang;

  // 1. Cyrillic script -> Russian
  if (/[\u0400-\u04FF]/.test(rawQuery)) {
    return 'ru';
  }

  const q = rawQuery.toLowerCase();
  // Her dil için ipucu ara; sitenin dili de eşleşiyorsa onu koru (ör. "Budapest visa" İngilizce sayfada İngilizce kalsın)
  const hits: string[] = [];
  if (/[¿¡ñ]/.test(rawQuery) || /\b(visado|visados|viajar|viaje|puedo|necesito|donde|cuanto|cuantos|pais|paises|espana|como|abrir|mostrar|tiempo|clima|propinas|propina|enchufe|enchufes|seguro|idioma|pasaporte|gratis|vuelo|tarjeta|requisitos|dias)\b/i.test(q)) hits.push('es');
  if ((/[äöüß]/.test(rawQuery) && (q.includes('ä') || q.includes('ß') || q.includes('und') || q.includes('wie') || q.includes('für') || q.includes('fuer'))) || /\b(visum|einreise|reise|reisen|nach|brauche|kann|ich|wie|viele|tage|kosten|stecker|trinkgeld|wetter|fluege|wann|welche|deutschland|ohne|sicher|waehrung|offnen|oeffnen|zeigen|bitte)\b/i.test(q)) hits.push('de');
  if (/[çğşı]/.test(rawQuery) || /\b(vize|vizesiz|pasaport|kimlik|kimlikle|kac|kaç|nasil|nasıl|nerede|nereye|nerelere|priz|prizi|bahsis|bahşiş|rota|rotasi|taksi|ac|aç|goster|göster|para|doviz|döviz|kur|kurlar|bavul|valiz|sigorta|kayip|kayıp|calinti|çalıntı|ucak|uçak|bilet|gun|gün|otel|oteller|guvenli|güvenli|pahali|pahalı|ucuz|var|mi|mı|mu|mü|gerekir|istiyor|mu|müyüm|hazirla|hazırla|bilgi)\b/i.test(q)) hits.push('tr');
  if (/\b(visa|visas|passport|travel|can|do|i|need|how|what|where|when|which|days|stay|plug|plugs|adapter|tipping|tip|taxi|ride|cost|safe|safety|route|itinerary|weather|best|time|flights|flight|hotel|hotels|lost|stolen|currency|open|show|compare)\b/i.test(q)) hits.push('en');
  if (hits.includes(fallbackLang)) return fallbackLang;
  if (hits.length) return hits[0];
  return fallbackLang;
}

// ============================================================================
// 199-COUNTRY DYNAMIC KNOWLEDGE INDEX & SYNONYM DICTIONARY
// ============================================================================

const POPULAR_DESTINATION_ALIASES: Record<string, string> = {
  // Southeast Asia & Far East
  'bosna': 'BA', 'makedonya': 'MK', 'amerika': 'US', 'karadag': 'ME', 'cekya': 'CZ', 'emirlikler': 'AE', 'hurgada': 'EG', 'sarm el seyh': 'EG',
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
    .replace(/[^a-z0-9\u0400-\u04ff\s]/g, ' ')
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
  let origin: string | null = null;

  // Suffix patterns for Turkish, Russian, German, Spanish, English inflections
  const suffixPattern = '(?:ye|ya|e|a|de|da|te|ta|den|dan|ten|tan|in|un|nin|nun|i|ı|u|ü|yi|yı|yu|yü|si|sı|su|sü|lar|ler|ю|и|е|ей|ем|я|s|es|n|en)';

  for (const key of sortedKeys) {
    if (key.length < 3) continue;
    const regex = new RegExp(`(?:^|\\s)${key}(${suffixPattern})?(?:\\s|$)`, 'i');
    const m = norm.match(regex);
    if (m) {
      // "Türkiye'den Rusya'ya": çıkış yeri (-den/-dan/-ten/-tan) varış ülkesi sayılmaz, başka eşleşme aranır
      if (/^(den|dan|ten|tan)$/.test(m[1] || '') && origin === null) { origin = countryMap[key]; continue; }
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

  // Rusça hâl ekleri: "Грузию", "Турции", "Италии" → ad kökü (son harf veya "ия" düşer)
  const words = norm.split(' ');
  for (const w of words) {
    if (!/[\u0400-\u04ff]/.test(w) || w.length < 4) continue;
    for (const key of sortedKeys) {
      if (!/[\u0400-\u04ff]/.test(key) || key.includes(' ') || key.length < 4) continue;
      const stem = key.replace(/(ия|ая|а|я|ь|й|ы)$/, '');
      if (stem.length >= 3 && w.startsWith(stem) && w.length - stem.length <= 3) return countryMap[key];
    }
  }

  // Prefix matching for longer root names (length >= 4)
  for (const w of words) {
    if (w.length >= 4) {
      for (const key of sortedKeys) {
        if (key.length >= 4 && w.startsWith(key)) {
          return countryMap[key];
        }
      }
    }
  }

  return origin;
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

  // ülke soruları: doğrulanmış ülke verisinden, sorunun konusuna göre 5 dilde cevap
  const countryMsg = async (code: string): Promise<AssistantMessage> => {
    const ans = await answerCountryQuestion(code, norm, activeLang, currentPassport);
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      detectedCountry: { code, name: getCountryName(code, activeLang), flag: getFlag(code) },
      text: ans.text,
      timestamp: new Date(),
      actions: ans.actions,
      detectedLang: activeLang,
      autoTriggerAction: /(^| )(ac|goster|open|show|offnen|abrir|mostrar|открыть|покажи)( |$)/.test(norm) ? ans.actions[0] : undefined
    };
  };
  // ülke adı geçen sorular önce buraya gelir; Schengen sayacı, transit, pasaport kaybı, dijital göçebe gibi araç konuları hariç
  if (targetCountry && !/(schengen|90 180|transit|aktarma|layover|umsteig|escala|пересадк|pasaport kay|pasaportumu kay|kaybettim|calindi|lost passport|stolen|konsolos|buyukelci|consul|embassy|botschaft|embajada|консульств|посольств|nomad|gocebe|remote work|saat farki|time zone|timezone|zeitzone)/.test(norm)) return countryMsg(targetCountry);

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

    // Correct valid site action: Opens Global Radar Modal
    const mapAction: AssistantActionPill = {
      id: 'open-radar',
      type: 'open_tool',
      toolKey: 'radar',
      radarMode: 'all',
      label: isTr ? '🌍 Dünya Vize Radarı (Harita)' : '🌍 Open Visa-Free Map',
      accentTone: 'teal'
    };
    // Correct valid site action: Switches to 'plan' tab (contains Passport Comparator)
    const compareAction: AssistantActionPill = {
      id: 'tab-plan-compare',
      type: 'switch_tab',
      tabKey: 'plan',
      label: isTr ? '⚖️ Pasaportları Karşılaştır (Sinerji)' : '⚖️ Compare Passports',
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
      : `🛂 **${originName} Passport Power & Travel Metrics:**\n\n` +
        `• **Visa-Free Destinations:** **${freeCount} countries**\n` +
        `• **Visa on Arrival / eVisa:** **${evisaCount} countries**\n` +
        `• **ID-Card Travel Eligible:** **${idCount} countries**\n` +
        `• **Total Easy Access:** **${totalEasy} destinations**`;

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: localizedText,
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

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text,
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
      label: isTr ? '🧳 Akıllı Valiz Listesi (Adaptör Ekle)' : '🧳 Add Adapter to Packing List',
      accentTone: 'teal'
    };
    actions.push(packingAction);

    const text = isTr
      ? `🔌 **Dünya Priz & Elektrik Standartları Rehberi:**\n\n` +
        `• **Avrupa & Türkiye:** Tip C ve F (230V, 50Hz)\n` +
        `• **İngiltere & Körfez Ülkeleri:** Tip G (Üç köşeli pimler)\n` +
        `• **ABD, Kanada & Japonya:** Tip A ve B (İki düz pim, 100-120V)\n` +
        `• **Avustralya & Yeni Zelanda:** Tip I (Açılı iki pim)\n\n` +
        `Gideceğiniz ülkenin priz tipini öğrenmek için doğrudan ülke adını (örneğin *"Japonya priz"*) yazabilirsiniz.`
      : `🔌 **Global Electrical & Plug Standards:**\n\n• **Europe:** Type C / F (230V)\n• **UK & Gulf:** Type G\n• **USA & Japan:** Type A / B (110-120V)\n• **Australia:** Type I`;

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text,
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

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text,
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

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text,
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
    actions.push(fxAction);

    const text = isTr
      ? `💱 **Canlı Seyahat Döviz Kurları:**\n\n• **1 USD = ${usdRate} TRY**\n• **1 EUR = ${eurRate} TRY**`
      : `💱 **Live Baseline Travel Rates:**\n\n• **1 USD = ${usdRate} TRY**\n• **1 EUR = ${eurRate} TRY**`;

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text,
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
    // Correct valid site action: switches to 'track' tab (contains DayCounterTab)
    const counterAction: AssistantActionPill = {
      id: 'tab-track',
      type: 'switch_tab',
      tabKey: 'track',
      label: isTr ? '📅 90/180 Gün Sayacını Aç' : '📅 Open 90/180 Day Counter',
      accentTone: 'teal'
    };
    actions.push(counterAction);

    const text = isTr
      ? `🇪🇺 **Schengen 90/180 Kuralı Nasıl Çalışır?**\n\n` +
        `Schengen bölgesinde herhangi bir **180 günlük geriye dönük zaman diliminde en fazla 90 gün** kalabilirsiniz.\n\n` +
        `• Giriş ve çıkış yaptığınız günler tam gün sayılır.\n` +
        `• Kural takvim yılına göre değil, her seyahat gününden geriye doğru son 180 gün taranarak hesaplanır.\n\n` +
        `İhlal riskine girmemek ve kalan gününüzü kesin hesaplamak için **Cüzdan & 90/180 Gün Sayacı** sekmemizi kullanabilirsiniz.`
      : `🇪🇺 **Schengen 90/180-Day Rule:**\n\nYou may stay a maximum of 90 days within any rolling 180-day window. Use our Day Counter to compute your remaining days accurately.`;

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text,
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
      id: 'open-radar',
      type: 'open_tool',
      toolKey: 'radar',
      radarMode: 'all',
      label: isTr ? '🌍 Dünya Vize Radarı' : '🌍 Check Visa Radar',
      accentTone: 'teal'
    };
    actions.push(radarAction);

    const text = isTr
      ? `✈️ **Aktarmalı Uçuşlarda Transit Vize Kuralları:**\n\n` +
        `1. **Hava Tarafı Transit (Airside):** Tek biletle (aynı rezervasyon koduyla) seyahat ediyorsanız, bagajınızı aktarma noktasında teslim almıyorsanız ve transit alandan çıkmıyorsanız (Doha, Dubai, Frankfurt vb.) çoğu ülke transit vize istemez.\n` +
        `2. **Kara Tarafı Transit (Landside):** Ayrı ayrı bilet aldıysanız ve bavulunuzu alıp yeniden kontuara vermeniz gerekiyorsa ülkeye resmi giriş sayılır ve standart vize gerekir.\n` +
        `3. **Özel İstisna:** ABD ve Kanada'da hava tarafı transit yoktur; sadece aktarma yapacak olsanız dahi C-1 Transit Vizesi veya eTA zorunludur.`
      : `✈️ **Transit Visa & Airport Layover Rules:**\n\nAirside transit usually requires no visa if on a single ticket without claiming baggage. Note that the US and Canada require transit visas even for brief airport layovers.`;

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text,
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
      id: 'open-radar',
      type: 'open_tool',
      toolKey: 'radar',
      radarMode: 'all',
      label: isTr ? '🌍 Dünya Vize Radarı (Harita)' : '🌍 Visa-Free World Radar',
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

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text,
      timestamp: new Date(),
      actions: actions.slice(0, 2),
      detectedLang: activeLang,
      autoTriggerAction: isOpenIntent ? radarAction : undefined
    };
  }

  // --------------------------------------------------------------------------
  // BROAD INTENT 11: TIMEZONE OVERLAP & WORLD CLOCK
  // --------------------------------------------------------------------------
  if (norm.includes('saat') || norm.includes('saat farki') || norm.includes('zaman') || norm.includes('timezone')) {
    const overlapAction: AssistantActionPill = {
      id: 'tool-overlap',
      type: 'open_tool',
      toolKey: 'overlap',
      label: isTr ? '⏰ Saat Dilimi Çakışma Aracı' : '⏰ Timezone Overlap Tool',
      accentTone: 'sky'
    };
    actions.push(overlapAction);

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: isTr
        ? '⏰ **Küresel Saat Farkı & İletişim Planlayıcı:**\n\nFarklı zaman dilimlerindeki seyahat duraklarınız ve uzaktaki sevdiklerinizle en uygun görüşme saatlerini bulmak için Saat Dilimi Çakışma aracımızı kullanabilirsiniz.'
        : '⏰ **Timezone Overlap & World Clock:**\n\nFind mutually convenient hours across different world timezones for smooth calls and flight planning.',
      timestamp: new Date(),
      actions: actions.slice(0, 2),
      detectedLang: activeLang,
      autoTriggerAction: isOpenIntent ? overlapAction : undefined
    };
  }

  // --------------------------------------------------------------------------
  // BROAD INTENT 12: CONSULAR EMERGENCY & LOST PASSPORT (General)
  // --------------------------------------------------------------------------
  if (norm.includes('kayip') || norm.includes('kayıp') || norm.includes('calinti') || norm.includes('çalıntı') || norm.includes('konsolosluk') || norm.includes('buyukelcilik') || norm.includes('kriz')) {
    const consularAction: AssistantActionPill = {
      id: 'tab-consular',
      type: 'switch_tab',
      tabKey: 'consular',
      label: isTr ? '🚨 Diplomatik Kriz Masası & SOS' : '🚨 Consular Crisis Desk',
      accentTone: 'coral'
    };
    actions.push(consularAction);

    const consular = getConsularEmergencyInfo(currentPassport || 'TR', activeLang);
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: isTr
        ? `🚨 **Yurt Dışında Pasaport Kaybı & Acil Durum Adımları:**\n\n` +
          `1. **Yerel Polis Tutanağı:** En yakın yerel polis karakoluna giderek derhal resmi kayıp/çalıntı tutanağı (Police Report) tutturun.\n` +
          `2. **24/7 Nöbetçi Konsolosluk Hattı:** ${consular.ministryName.tr} ${consular.crisisCenterTitle.tr}: **${consular.hotline247 || "—"}**\n` +
          `3. **Geçici Seyahat Belgesi:** 2 adet biyometrik fotoğraf ve kimliğinizle en yakın ${consular.countryName.tr} temsilciliğine başvurup ülkenize dönüş belgenizi (${consular.emergencyDocName.tr}) temin edin.`
        : `🚨 **Lost Passport & Consular Emergency:**\n\n1. Obtain an official Police Report from the nearest local police station.\n2. **24/7 Hotline (${consular.ministryName.en}):** **${consular.hotline247 || "—"}**\n3. Apply for an Emergency Travel Document (${consular.emergencyDocName.en}) at your nearest embassy.`,
      timestamp: new Date(),
      actions: actions.slice(0, 2),
      detectedLang: activeLang,
      autoTriggerAction: isOpenIntent ? consularAction : undefined
    };
  }

  // --------------------------------------------------------------------------
  // BROAD INTENT 13: DIGITAL NOMAD VISAS (General)
  // --------------------------------------------------------------------------
  if (norm.includes('nomad') || norm.includes('gocebe') || norm.includes('göçebe') || norm.includes('uzaktan calisma')) {
    const nomadAction: AssistantActionPill = {
      id: 'tab-nomad',
      type: 'switch_tab',
      tabKey: 'nomad',
      label: isTr ? '💻 Gezgin & Nomad Araçları' : '💻 Nomad Tools Hub',
      accentTone: 'teal'
    };
    actions.push(nomadAction);

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: isTr
        ? '💻 **Dünya Dijital Göçebe Vizeleri (DNV) Rehberi:**\n\nAvrupa (İspanya, Portekiz, Yunanistan, Malta), Latin Amerika (Kosta Rika, Kolombiya) ve Asya\'da uzaktan çalışanlar için gelir şartları, vergi avantajları ve başvuru adımları sitemizin Göçebe Araçları sekmesinde listelenmiştir.'
        : '💻 **Global Digital Nomad Visas Guide:**\n\nExplore income thresholds, tax perks, and official application portals for verified digital nomad visa destinations.',
      timestamp: new Date(),
      actions: actions.slice(0, 2),
      detectedLang: activeLang,
      autoTriggerAction: isOpenIntent ? nomadAction : undefined
    };
  }

  // ==========================================================================
  // TARGET COUNTRY FOUND (ANY OF 199 COUNTRIES)
  // ==========================================================================
  if (targetCountry) return countryMsg(targetCountry);

  // --------------------------------------------------------------------------
  // GENERAL FALLBACK: HIGH-PRECISION GUIDED SUGGESTIONS
  // --------------------------------------------------------------------------
  const radarFallback: AssistantActionPill = {
    id: 'open-radar',
    type: 'open_tool',
    toolKey: 'radar',
    radarMode: 'all',
    label: isTr ? '🌍 Dünya Vize Radarı (Harita)' : '🌍 Where Can I Go? (Radar)',
    accentTone: 'teal'
  };
  const routeFallback: AssistantActionPill = {
    id: 'tab-plan',
    type: 'switch_tab',
    tabKey: 'plan',
    label: isTr ? '🗺️ Rota & Sinerji Planlayıcı' : '🗺️ Route Planner',
    accentTone: 'sky'
  };
  actions.push(radarFallback, routeFallback);

  return {
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    text: isTr
      ? `Sormak istediğiniz ülke adını veya seyahat konusunu belirtebilirsiniz:\n\n` +
        `• **Tek Kelime Ülkeler:** *"Norveç"*, *"Tayland"*, *"İtalya"*, *"Japonya"*, *"Brezilya"*\n` +
        `• **Site Konuları:** *"Prizler"*, *"Bahşiş"*, *"Taksiler"*, *"Döviz Kurları"*, *"90 Gün Schengen"*, *"Valiz"*`
      : `Please mention a country or travel topic:\n\n• Countries: *"Norway"*, *"Thailand"*, *"Japan"*\n• Topics: *"Plugs"*, *"Tipping"*, *"Taxis"*, *"Currencies"*, *"90-Day Schengen"*`,
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
