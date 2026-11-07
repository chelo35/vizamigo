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
  lang: string = 'tr',
  forceLang: boolean = false
): Promise<AssistantMessage> {
  // forceLang: kullanıcı konuşma dilini seçtiyse (ör. sesle soruyorsa) cevap o dilde olur
  const detectedLang = forceLang ? lang : detectQueryLanguage(rawQuery, lang);
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

  // Genel (ülkesiz) sorular: hepsi 5 dilde. Sayılar pasaport verisinden hesaplanır.
  const L5 = (tr: string, en: string, de: string, es: string, ru: string) => ({ tr, en, de, es, ru } as Record<string, string>)[activeLang] ?? en;
  const days = (v: string) => (v === 'vf' ? L5('süresiz', 'no limit', 'unbegrenzt', 'sin límite', 'без ограничений') : /^\d+$/.test(v) ? `${v} ${L5('gün', 'days', 'Tage', 'días', 'дн.')}` : '');
  const reply = (text: string, acts: AssistantActionPill[], auto?: AssistantActionPill): AssistantMessage => ({
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    text,
    timestamp: new Date(),
    actions: acts.slice(0, 3),
    detectedLang: activeLang,
    autoTriggerAction: isOpenIntent && /(^| )(ac|goster|open|show|offnen|abrir|mostrar|открыть|покажи)( |$)/.test(norm) ? auto : undefined
  });
  const radarPill: AssistantActionPill = { id: 'open-radar', type: 'open_tool', toolKey: 'radar', radarMode: 'all', label: L5('Vizesiz ülkeler haritası', 'Visa-free map', 'Karte visumfreier Länder', 'Mapa sin visado', 'Карта безвизовых стран'), accentTone: 'teal' };
  const countryPill = (c: string): AssistantActionPill => ({ id: `open-${c}`, type: 'open_country', countryCode: c, label: `${getFlag(c)} ${getCountryName(c, activeLang)}`, accentTone: 'sky' });

  // 1) Pasaport gücü
  if (!targetCountry && (/^(vize|vizesiz|vizeler|visa|visas|visum|visado|виза|визы)$/.test(norm) || /(kac ulke|pasaport gucu|vizesiz kac|pasaportumla kac|how many countries|passport power|wie viele lander|cuantos paises|сколько стран|сила паспорта)/.test(norm))) {
    const free = passportItems.filter((it) => it.cat === 'free').length;
    const easy = passportItems.filter((it) => it.cat === 'evisa' || it.cat === 'voa' || it.cat === 'eta').length;
    const idN = passportItems.filter((it) => it.id).length;
    const compare: AssistantActionPill = { id: 'tab-plan-compare', type: 'switch_tab', tabKey: 'plan', label: L5('Pasaportları karşılaştır', 'Compare passports', 'Pässe vergleichen', 'Comparar pasaportes', 'Сравнить паспорта'), accentTone: 'sky' };
    return reply(
      `**${L5(`${originName} pasaportu`, `${originName} passport`, `Reisepass ${originName}`, `Pasaporte de ${originName}`, `Паспорт: ${originName}`)}**\n` +
        `• **${L5('Vizesiz', 'Visa-free', 'Visumfrei', 'Sin visado', 'Без визы')}:** ${free}\n` +
        `• **${L5('Kapıda vize / e-vize / eTA', 'Visa on arrival / eVisa / eTA', 'Visum bei Ankunft / e-Visum / eTA', 'Visa a la llegada / e-Visa / eTA', 'Виза по прилёте / e-Visa / eTA')}:** ${easy}\n` +
        (idN ? `• **${L5('Kimlik kartıyla', 'With ID card', 'Mit Personalausweis', 'Con DNI', 'По ID-карте')}:** ${idN}\n` : '') +
        `• **${L5('Toplam kolay giriş', 'Easy access in total', 'Einfache Einreise gesamt', 'Acceso fácil en total', 'Всего с простым въездом')}:** ${free + easy}`,
      [radarPill, compare], radarPill
    );
  }

  // 2) Kimlikle seyahat
  if (!targetCountry && /(kimlik|pasaportsuz|id card|national id|personalausweis|ausweis|sin pasaporte|dni|удостоверени|по id)/.test(norm)) {
    const list = passportItems.filter((it) => it.id);
    const text = list.length
      ? `**${L5(`${originName} vatandaşlarının kimlik kartıyla gidebildiği ülkeler`, `Countries ${originName} citizens can enter with an ID card`, `Länder, in die Bürger von ${originName} mit Personalausweis reisen können`, `Países a los que los ciudadanos de ${originName} pueden ir con DNI`, `Страны, куда граждане (${originName}) могут въехать по ID-карте`)}**\n` +
        list.map((it) => `• ${getFlag(it.c)} **${getCountryName(it.c, activeLang)}** – ${days(it.v)}`).join('\n') +
        (currentPassport === 'TR' ? `\n\n${L5('Yalnızca yeni tip çipli kimlik kartı geçerlidir; eski nüfus cüzdanıyla gidilmez. KKTC’ye de çipli kimlikle girilebilir.', 'Only the new chip ID card is accepted, not the old paper one. Northern Cyprus also accepts the chip ID card.', 'Nur der neue Chip-Ausweis gilt, nicht der alte. Auch Nordzypern akzeptiert ihn.', 'Solo vale el nuevo DNI con chip, no el antiguo. El norte de Chipre también lo acepta.', 'Действует только новая ID-карта с чипом. Её принимает и Северный Кипр.')}` : '')
      : L5('Bu pasaportla kimlik kartıyla gidilebilen ülke kaydı yok.', 'No ID-card-only destinations are listed for this passport.', 'Für diesen Pass sind keine Länder mit Ausweis-Einreise gelistet.', 'No hay destinos con DNI para este pasaporte.', 'Для этого паспорта нет стран с въездом по ID-карте.');
    return reply(text, list.slice(0, 3).map((it) => countryPill(it.c)), list[0] ? countryPill(list[0].c) : undefined);
  }

  // 3) Priz (genel)
  if (!targetCountry && (/^(priz|prizler|voltaj|adaptor|plug|plugs|stecker|steckdose|enchufe|enchufes|розетка|розетки)$/.test(norm) || /(priz tipi|plug type|steckertyp|tipo de enchufe|тип розетки)/.test(norm))) {
    const pack: AssistantActionPill = { id: 'tool-packing', type: 'open_tool', toolKey: 'packing', label: L5('Bavul listesi', 'Packing list', 'Packliste', 'Lista de equipaje', 'Список вещей'), accentTone: 'teal' };
    return reply(
      `**${L5('Dünyada priz tipleri', 'Plug types around the world', 'Steckertypen weltweit', 'Tipos de enchufe en el mundo', 'Типы розеток в мире')}**\n` +
        `• **${L5('Avrupa ve Türkiye', 'Europe and Türkiye', 'Europa und Türkei', 'Europa y Turquía', 'Европа и Турция')}:** C / F, 230V\n` +
        `• **${L5('İngiltere, İrlanda, BAE, Katar, Malta, Kıbrıs', 'UK, Ireland, UAE, Qatar, Malta, Cyprus', 'Großbritannien, Irland, VAE, Katar, Malta, Zypern', 'Reino Unido, Irlanda, EAU, Catar, Malta, Chipre', 'Великобритания, Ирландия, ОАЭ, Катар, Мальта, Кипр')}:** G\n` +
        `• **${L5('ABD, Kanada, Meksika, Japonya', 'USA, Canada, Mexico, Japan', 'USA, Kanada, Mexiko, Japan', 'EE. UU., Canadá, México, Japón', 'США, Канада, Мексика, Япония')}:** A / B, 100–120V\n` +
        `• **${L5('Avustralya, Yeni Zelanda, Çin', 'Australia, New Zealand, China', 'Australien, Neuseeland, China', 'Australia, Nueva Zelanda, China', 'Австралия, Новая Зеландия, Китай')}:** I\n\n` +
        L5('Bir ülke için sor: "Japonya priz".', 'Ask for a country: "Japan plugs".', 'Frag nach einem Land: „Japan Steckdose“.', 'Pregunta por un país: "enchufe Japón".', 'Спросите про страну: «Япония розетки».'),
      [pack], pack
    );
  }

  // 4) Bahşiş (genel)
  if (!targetCountry && /^(bahsis|tip|tips|tipping|trinkgeld|propina|propinas|чаевые)$/.test(norm)) {
    const tip: AssistantActionPill = { id: 'tool-tipping', type: 'open_tool', toolKey: 'tipping', label: L5('Bahşiş hesapla', 'Tip calculator', 'Trinkgeldrechner', 'Calculadora de propinas', 'Калькулятор чаевых'), accentTone: 'amber' };
    return reply(
      `**${L5('Dünyada bahşiş', 'Tipping around the world', 'Trinkgeld weltweit', 'Propinas en el mundo', 'Чаевые в мире')}**\n` +
        `• **${L5('ABD ve Kanada', 'USA and Canada', 'USA und Kanada', 'EE. UU. y Canadá', 'США и Канада')}:** ${L5('%15–20, neredeyse zorunlu', '15–20%, practically expected', '15–20 %, praktisch erwartet', '15–20 %, prácticamente obligatoria', '15–20%, фактически обязательно')}\n` +
        `• **${L5('Avrupa', 'Europe', 'Europa', 'Europa', 'Европа')}:** ${L5('%5–10 ya da hesabı yuvarlamak', '5–10% or round up', '5–10 % oder aufrunden', '5–10 % o redondear', '5–10% или округлить')}\n` +
        `• **${L5('Japonya, Güney Kore', 'Japan, South Korea', 'Japan, Südkorea', 'Japón, Corea del Sur', 'Япония, Южная Корея')}:** ${L5('beklenmez', 'not expected', 'nicht üblich', 'no se espera', 'не принято')}\n\n` +
        L5('Bir ülke için sor: "Mısır bahşiş".', 'Ask for a country: "Egypt tipping".', 'Frag nach einem Land: „Ägypten Trinkgeld“.', 'Pregunta por un país: "propinas Egipto".', 'Спросите про страну: «Египет чаевые».'),
      [tip], tip
    );
  }

  // 5) Taksi (genel)
  if (!targetCountry && (/^(taksi|taxi|ulasim|такси|transporte|transport)$/.test(norm) || /(taksi uygulama|ride app|taxi app|fahrdienst|app de taxi|приложени\S* такси)/.test(norm))) {
    return reply(
      `**${L5('Bölgelere göre taksi uygulamaları', 'Ride-hailing apps by region', 'Taxi-Apps nach Region', 'Apps de taxi por región', 'Приложения такси по регионам')}**\n` +
        `• **${L5('Güneydoğu Asya', 'Southeast Asia', 'Südostasien', 'Sudeste asiático', 'Юго-Восточная Азия')}:** Grab, Bolt\n` +
        `• **${L5('Avrupa', 'Europe', 'Europa', 'Europa', 'Европа')}:** Bolt, Uber, FreeNow\n` +
        `• **${L5('Körfez ve Orta Doğu', 'Gulf and Middle East', 'Golfstaaten und Nahost', 'Golfo y Oriente Medio', 'Персидский залив и Ближний Восток')}:** Careem, Uber\n` +
        `• **${L5('Kafkasya ve Orta Asya', 'Caucasus and Central Asia', 'Kaukasus und Zentralasien', 'Cáucaso y Asia Central', 'Кавказ и Центральная Азия')}:** Bolt, Yandex Go\n\n` +
        L5('Bir ülke için sor: "Tayland taksi".', 'Ask for a country: "Thailand taxi".', 'Frag nach einem Land: „Thailand Taxi“.', 'Pregunta por un país: "taxi Tailandia".', 'Спросите про страну: «Таиланд такси».'),
      []
    );
  }

  // 6) Döviz
  if (!targetCountry && (/^(doviz|kur|kurlar|para|currency|dolar|dollar|euro|wahrung|moneda|валюта|курс)$/.test(norm) || /(doviz|wechselkurs|exchange rate|tipo de cambio|курс валют)/.test(norm))) {
    const fx: AssistantActionPill = { id: 'radar-fx', type: 'open_tool', toolKey: 'radar', radarMode: 'currency', label: L5('Döviz çevirici', 'Currency converter', 'Währungsrechner', 'Conversor de divisas', 'Конвертер валют'), accentTone: 'teal' };
    return reply(`**${L5('Güncel kurlar', 'Current rates', 'Aktuelle Kurse', 'Tipos actuales', 'Текущие курсы')}**\n• 1 USD = ${usdRate} TRY\n• 1 EUR = ${eurRate} TRY`, [fx], fx);
  }

  // 7) Schengen 90/180
  if (/(schengen|90 180|gun sayac|90 gun|kac gunum|90 tage|90 dias|90 дней)/.test(norm)) {
    const counter: AssistantActionPill = { id: 'tab-track', type: 'switch_tab', tabKey: 'track', label: L5('90/180 gün sayacı', '90/180-day counter', '90/180-Tage-Rechner', 'Contador 90/180', 'Счётчик 90/180'), accentTone: 'teal' };
    return reply(
      `**${L5('Schengen 90/180 kuralı', 'Schengen 90/180 rule', 'Schengen-Regel 90/180', 'Regla Schengen 90/180', 'Правило Шенгена 90/180')}**\n` +
        L5(
          'Herhangi bir 180 günlük dönemde Schengen bölgesinde en fazla 90 gün kalınabilir. Giriş ve çıkış günleri tam gün sayılır. Hesap takvim yılına göre değil, her gün için geriye doğru son 180 güne bakılarak yapılır.',
          'You can stay up to 90 days in any 180-day period. Entry and exit days count as full days. The window rolls: for each day, look back over the previous 180 days.',
          'In jedem Zeitraum von 180 Tagen sind höchstens 90 Tage erlaubt. Ein- und Ausreisetag zählen voll. Der Zeitraum rollt: für jeden Tag werden die vorherigen 180 Tage betrachtet.',
          'Puedes quedarte hasta 90 días en cualquier periodo de 180. Los días de entrada y salida cuentan completos. El periodo es móvil: para cada día se miran los 180 anteriores.',
          'В любой период 180 дней можно находиться не более 90 дней. Дни въезда и выезда считаются полностью. Период скользящий: для каждого дня смотрят на предыдущие 180 дней.'
        ),
      [counter], counter
    );
  }

  // 8) Transit
  if (/(transit|aktarma|layover|umsteig|escala|пересадк|транзит)/.test(norm)) {
    return reply(
      `**${L5('Aktarmalı uçuşta vize', 'Visas for connecting flights', 'Visum beim Umsteigen', 'Visado en escalas', 'Виза при пересадке')}**\n` +
        `• ${L5('Tek biletle uçuyor, bagajı almıyor ve havalimanının transit alanından çıkmıyorsanız çoğu ülke transit vize istemez.', 'On a single ticket, without collecting bags or leaving the transit area, most countries require no transit visa.', 'Mit einem Ticket, ohne Gepäckabholung und ohne den Transitbereich zu verlassen, ist meist kein Transitvisum nötig.', 'Con un solo billete, sin recoger equipaje ni salir de la zona de tránsito, la mayoría de países no exige visado de tránsito.', 'С единым билетом, без получения багажа и выхода из транзитной зоны, транзитная виза обычно не нужна.')}\n` +
        `• ${L5('Ayrı biletlerle bagajı alıp yeniden check-in yapacaksanız ülkeye giriş sayılır; o ülkenin vizesi gerekir.', 'With separate tickets, collecting bags and checking in again counts as entering the country; you need its visa.', 'Bei getrennten Tickets mit erneutem Check-in gilt das als Einreise; dann ist das Visum des Landes nötig.', 'Con billetes separados, recoger el equipaje y volver a facturar cuenta como entrada; necesitas su visado.', 'При раздельных билетах получение багажа и повторная регистрация считаются въездом; нужна виза страны.')}\n` +
        `• ${L5('ABD ve Kanada’da havalimanı içi transit yoktur; sadece aktarma için bile vize ya da elektronik izin gerekir. Bazı Schengen ülkeleri de bazı pasaportlara havalimanı transit vizesi şartı koyar.', 'The US and Canada have no airside transit; even a connection needs a visa or electronic authorisation. Some Schengen countries also require an airport transit visa for certain passports.', 'USA und Kanada haben keinen Transitbereich; selbst zum Umsteigen braucht man Visum oder elektronische Genehmigung. Manche Schengen-Staaten verlangen für bestimmte Pässe ein Flughafentransitvisum.', 'EE. UU. y Canadá no tienen tránsito sin entrada; incluso una escala exige visado o autorización electrónica. Algunos países Schengen piden visado de tránsito aeroportuario a ciertos pasaportes.', 'В США и Канаде нет транзитной зоны: даже для пересадки нужна виза или электронное разрешение. Некоторые страны Шенгена требуют аэропортовую транзитную визу для отдельных паспортов.')}`,
      [radarPill]
    );
  }

  // 9) Bavul
  if (/(valiz|bavul|packing|pack list|packliste|koffer|equipaje|maleta|чемодан|список вещей)/.test(norm)) {
    const pack: AssistantActionPill = { id: 'tool-packing', type: 'open_tool', toolKey: 'packing', label: L5('Bavul listesini aç', 'Open packing list', 'Packliste öffnen', 'Abrir lista de equipaje', 'Открыть список вещей'), accentTone: 'teal' };
    return reply(L5('Bavul listesi gideceğin ülkenin iklimine, priz tipine ve seyahat türüne göre hazırlanır; işaretlediklerin cihazında saklanır.', 'The packing list adapts to your destination’s climate, plug type and trip style; your ticks are saved on your device.', 'Die Packliste passt sich Klima, Steckertyp und Reiseart an; Häkchen bleiben auf deinem Gerät gespeichert.', 'La lista se adapta al clima, el enchufe y el tipo de viaje; lo que marques se guarda en tu dispositivo.', 'Список подстраивается под климат, тип розеток и формат поездки; отметки сохраняются на устройстве.'), [pack], pack);
  }

  // 10) Nereye gidebilirim
  if (!targetCountry && (/^(radar|harita|map|karte|mapa|карта)$/.test(norm) || /(nereye|nerelere|tatil yeri|where can i go|where to go|wohin|a donde|adonde|куда поехать|куда можно)/.test(norm))) {
    const groups: Array<[string, string[]]> = [
      [L5('Sıcak ve tropik', 'Warm and tropical', 'Warm und tropisch', 'Cálido y tropical', 'Тёплые и тропические'), ['TH', 'MY', 'ID', 'MV']],
      [L5('Balkanlar', 'Balkans', 'Balkan', 'Balcanes', 'Балканы'), ['ME', 'RS', 'AL', 'BA', 'MK']],
      [L5('Yakın', 'Nearby', 'In der Nähe', 'Cerca', 'Рядом'), ['GE', 'AZ', 'UZ']]
    ];
    const text = `**${L5(`${originName} pasaportuyla kolay gidilen yerler`, `Easy destinations with a ${originName} passport`, `Einfache Ziele mit Pass aus ${originName}`, `Destinos fáciles con pasaporte de ${originName}`, `Простые направления (паспорт: ${originName})`)}**\n` +
      groups.map(([g, cs]) => `• **${g}:** ${cs.map((c) => { const it = passportItems.find((x) => x.c === c); return it && it.cat !== 'visa' ? `${getCountryName(c, activeLang)}${days(it.v) ? ` (${days(it.v)})` : ''}` : ''; }).filter(Boolean).join(', ')}`).filter((x) => !/\*\*: $/.test(x)).join('\n');
    return reply(text, [radarPill, countryPill('GE')], radarPill);
  }

  // 11) Saat farkı
  if (/(saat farki|timezone|time zone|zeitzone|zona horaria|часов\S* пояс|разница во времени)/.test(norm)) {
    const tz: AssistantActionPill = { id: 'tool-overlap', type: 'open_tool', toolKey: 'overlap', label: L5('Saat farkı aracı', 'Time zone tool', 'Zeitzonen-Tool', 'Herramienta de husos horarios', 'Часовые пояса'), accentTone: 'sky' };
    return reply(L5('Saat farkı aracı, farklı ülkelerdeki kişilerle ortak uygun saatleri gösterir.', 'The time zone tool shows hours that suit people in different countries.', 'Das Zeitzonen-Tool zeigt passende gemeinsame Uhrzeiten.', 'La herramienta muestra horas que convienen en distintos países.', 'Инструмент показывает удобные часы для людей в разных странах.'), [tz], tz);
  }

  // 12) Pasaport kaybı ve konsolosluk
  if (/(kayip|kaybettim|calinti|calindi|konsolosluk|buyukelcilik|lost passport|stolen|consulate|embassy|pass verloren|botschaft|konsulat|perdi el pasaporte|embajada|consulado|потерял паспорт|консульств|посольств)/.test(norm)) {
    const sos: AssistantActionPill = { id: 'tab-consular', type: 'switch_tab', tabKey: 'consular', label: L5('Acil durum ve konsolosluk', 'Emergency & consulate', 'Notfall & Konsulat', 'Emergencia y consulado', 'Экстренная помощь'), accentTone: 'coral' };
    const c = getConsularEmergencyInfo(currentPassport || 'TR', activeLang);
    const pick = (o: Record<string, string | undefined>) => o[activeLang] || o.en || o.tr || '';
    return reply(
      `**${L5('Yurt dışında pasaport kaybı', 'Lost passport abroad', 'Pass im Ausland verloren', 'Pasaporte perdido en el extranjero', 'Потеря паспорта за границей')}**\n` +
        `1. ${L5('En yakın polis merkezinden kayıp/çalıntı tutanağı alın.', 'Get a loss/theft report from the nearest police station.', 'Verlust-/Diebstahlanzeige bei der nächsten Polizei machen.', 'Pide una denuncia de pérdida o robo en la comisaría más cercana.', 'Получите справку о потере/краже в ближайшем отделении полиции.')}\n` +
        `2. ${pick(c.ministryName as never)} – ${L5('7/24 hat', '24/7 line', '24/7-Hotline', 'línea 24/7', 'круглосуточно')}: **${c.hotline247 || '—'}**\n` +
        `3. ${L5('İki biyometrik fotoğrafla en yakın temsilciliğe başvurup dönüş belgesi alın', 'Apply at the nearest mission with two biometric photos for an emergency travel document', 'Mit zwei biometrischen Fotos bei der nächsten Vertretung ein Notreisedokument beantragen', 'Solicita en la representación más cercana, con dos fotos biométricas, un documento de viaje de emergencia', 'Обратитесь в ближайшее представительство с двумя биометрическими фото за документом на возвращение')}: ${pick(c.emergencyDocName as never)}.`,
      [sos], sos
    );
  }

  // 13) Dijital göçebe
  if (/(nomad|gocebe|uzaktan calis|remote work|digitale nomaden|nomada digital|цифров\S* кочев|удалённ)/.test(norm)) {
    const nomad: AssistantActionPill = { id: 'tab-nomad', type: 'switch_tab', tabKey: 'nomad', label: L5('Dijital göçebe vizeleri', 'Digital nomad visas', 'Visa für digitale Nomaden', 'Visados de nómada digital', 'Визы цифровых кочевников'), accentTone: 'teal' };
    return reply(L5('Dijital göçebe vizelerinin gelir şartları, süreleri ve resmî başvuru bağlantıları araçlar bölümünde ülke ülke listeleniyor.', 'Income requirements, durations and official application links for digital nomad visas are listed country by country in the tools section.', 'Einkommensgrenzen, Laufzeiten und offizielle Antragslinks der Nomaden-Visa stehen Land für Land im Tools-Bereich.', 'Requisitos de ingresos, duración y enlaces oficiales de los visados de nómada digital están en la sección de herramientas, país por país.', 'Требования к доходу, сроки и официальные ссылки на визы цифровых кочевников собраны по странам в разделе инструментов.'), [nomad], nomad);
  }

  if (targetCountry) return countryMsg(targetCountry);

  // Anlaşılmadıysa: örnek sorular
  return reply(
    L5(
      'Bir ülke adı ve konu yazabilirsin. Örneğin:\n• "Gürcistan kimlikle gidilir mi"\n• "Dubai güvenli mi"\n• "Mısır acil numara"\n• "Tayland bahşiş"\n• "İtalya priz"\n• "Bosna tax free"',
      'Type a country and a topic. For example:\n• "Do I need a visa for Japan"\n• "Is Dubai safe"\n• "Egypt emergency number"\n• "Thailand tipping"\n• "Italy plugs"',
      'Schreib ein Land und ein Thema. Zum Beispiel:\n• „Visum Japan“\n• „Ist Dubai sicher“\n• „Ägypten Notruf“\n• „Thailand Trinkgeld“\n• „Italien Steckdose“',
      'Escribe un país y un tema. Por ejemplo:\n• "visado Japón"\n• "¿es seguro Dubái?"\n• "Egipto emergencias"\n• "propinas Tailandia"\n• "enchufe Italia"',
      'Напишите страну и тему. Например:\n• «Нужна ли виза в Японию»\n• «Безопасно ли в Дубае»\n• «Египет экстренные номера»\n• «Таиланд чаевые»\n• «Италия розетки»'
    ),
    [radarPill]
  );
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
  /** uzun cümleler için: kısa duraklamada kesilmez, tüm konuşma birleştirilerek verilir */
  continuous?: boolean;
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
    recognition.continuous = Boolean(options.continuous);
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      if (options.continuous) {
        // tüm sonuçları baştan birleştir (kesinleşmiş + o an duyulan)
        let all = '';
        let allFinal = true;
        for (let i = 0; i < event.results.length; ++i) {
          all += event.results[i][0].transcript;
          if (!event.results[i].isFinal) allFinal = false;
        }
        if (all.trim()) options.onResult(all.replace(/\s+/g, ' ').trim(), allFinal);
        return;
      }
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
