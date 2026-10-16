/**
 * Vizamigo AI Copilot & Travel Concierge Intelligence Engine
 * Comprehensive multi-lingual natural language processor, destination mapper,
 * site action dispatcher, and high-fidelity Web Speech API controller.
 */

import { getCountryName, getFlag, getCategoryBadgeLabel, getPracticalInfo } from '../data/passportData';
import { getPassportItems } from '../utils/calculator';
import { getCountryGeography } from '../data/countryGeography';
import { getCountryInsights } from '../data/countryInsights';
import { getCountryItinerary } from '../data/countryItineraries';
import { getCrossRate } from '../data/currencyRates';
import { TabKey } from '../components/Navigation';

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
}

// ============================================================================
// COMPREHENSIVE MULTI-LINGUAL DESTINATION & CITY MAPPING DICTIONARY
// ============================================================================
const COUNTRY_NAME_SYNONYMS: Record<string, string> = {
  // Southeast Asia & Far East
  'tayland': 'TH', 'thailand': 'TH', 'bangkok': 'TH', 'phuket': 'TH', 'chiang mai': 'TH', 'pattaya': 'TH', 'krabi': 'TH', 'samui': 'TH',
  'vietnam': 'VN', 'hanoi': 'VN', 'ho chi minh': 'VN', 'da nang': 'VN',
  'endonezya': 'ID', 'indonesia': 'ID', 'bali': 'ID', 'cakarta': 'ID', 'jakarta': 'ID', 'ubud': 'ID', 'lombok': 'ID',
  'malezya': 'MY', 'malaysia': 'MY', 'kuala lumpur': 'MY', 'penang': 'MY', 'langkawi': 'MY',
  'singapur': 'SG', 'singapore': 'SG',
  'filipinler': 'PH', 'philippines': 'PH', 'manila': 'PH', 'cebu': 'PH', 'boracay': 'PH',
  'kambocya': 'KH', 'kamboçya': 'KH', 'cambodia': 'KH', 'siem reap': 'KH',
  'japonya': 'JP', 'japan': 'JP', 'tokyo': 'JP', 'kyoto': 'JP', 'osaka': 'JP',
  'guney kore': 'KR', 'güney kore': 'KR', 'south korea': 'KR', 'korea': 'KR', 'kore': 'KR', 'seul': 'KR', 'seoul': 'KR', 'busan': 'KR',
  'cin': 'CN', 'çin': 'CN', 'china': 'CN', 'pekin': 'CN', 'beijing': 'CN', 'sanghay': 'CN', 'shanghai': 'CN',
  'tayvan': 'TW', 'taiwan': 'TW', 'taipei': 'TW',
  'hong kong': 'HK',

  // Europe & Balkans
  'almanya': 'DE', 'germany': 'DE', 'deutschland': 'DE', 'berlin': 'DE', 'munih': 'DE', 'münih': 'DE', 'frankfurt': 'DE',
  'fransa': 'FR', 'france': 'FR', 'paris': 'FR', 'nice': 'FR', 'lyon': 'FR',
  'italya': 'IT', 'italy': 'IT', 'italien': 'IT', 'roma': 'IT', 'rome': 'IT', 'milano': 'IT', 'florensa': 'IT', 'floransa': 'IT', 'venedik': 'IT', 'napoli': 'IT',
  'ispanya': 'ES', 'spain': 'ES', 'spanien': 'ES', 'madrid': 'ES', 'barselona': 'ES', 'barcelona': 'ES', 'sevilla': 'ES', 'valensiya': 'ES', 'ibiza': 'ES',
  'ingiltere': 'GB', 'birlesik krallik': 'GB', 'birleşik krallık': 'GB', 'united kingdom': 'GB', 'uk': 'GB', 'londra': 'GB', 'london': 'GB',
  'hollanda': 'NL', 'netherlands': 'NL', 'amsterdam': 'NL', 'rotterdam': 'NL',
  'yunanistan': 'GR', 'greece': 'GR', 'atina': 'GR', 'athens': 'GR', 'selanik': 'GR', 'santorini': 'GR', 'mikonos': 'GR', 'rodos': 'GR', 'girit': 'GR',
  'portekiz': 'PT', 'portugal': 'PT', 'lizbon': 'PT', 'lisbon': 'PT', 'porto': 'PT',
  'isvicre': 'CH', 'isviçre': 'CH', 'switzerland': 'CH', 'zurih': 'CH', 'zürich': 'CH', 'cenevre': 'CH',
  'avusturya': 'AT', 'austria': 'AT', 'viyana': 'AT', 'vienna': 'AT', 'salzburg': 'AT',
  'cekya': 'CZ', 'çekya': 'CZ', 'czechia': 'CZ', 'prag': 'CZ', 'prague': 'CZ',
  'macaristan': 'HU', 'hungary': 'HU', 'budapeste': 'HU', 'budapeşte': 'HU', 'budapest': 'HU',
  'polonya': 'PL', 'poland': 'PL', 'varsova': 'PL', 'varşova': 'PL', 'krakow': 'PL',
  'gurcistan': 'GE', 'gürcistan': 'GE', 'georgia': 'GE', 'tiflis': 'GE', 'tbilisi': 'GE', 'batum': 'GE', 'batumi': 'GE',
  'sirbistan': 'RS', 'sırbistan': 'RS', 'serbia': 'RS', 'belgrad': 'RS', 'belgrade': 'RS',
  'karadag': 'ME', 'karadağ': 'ME', 'montenegro': 'ME', 'kotor': 'ME', 'budva': 'ME', 'tivat': 'ME',
  'arnavutluk': 'AL', 'albania': 'AL', 'tiran': 'AL', 'tirana': 'AL', 'sarande': 'AL',
  'bosna': 'BA', 'bosna hersek': 'BA', 'bosnia': 'BA', 'saraybosna': 'BA', 'sarajevo': 'BA', 'mostar': 'BA',
  'kuzey makedonya': 'MK', 'makedonya': 'MK', 'macedonia': 'MK', 'uskup': 'MK', 'üsküp': 'MK', 'ohrid': 'MK',
  'kosova': 'XK', 'kosovo': 'XK', 'pristine': 'XK', 'priştine': 'XK', 'prizren': 'XK',
  'hirvatistan': 'HR', 'hırvatistan': 'HR', 'croatia': 'HR', 'zagreb': 'HR', 'dubrovnik': 'HR', 'split': 'HR',
  'romanya': 'RO', 'romania': 'RO', 'bukres': 'RO', 'bükreş': 'RO',
  'bulgaristan': 'BG', 'bulgaria': 'BG', 'sofya': 'BG', 'varna': 'BG',

  // Middle East & Africa
  'bae': 'AE', 'birlesik arap emirlikleri': 'AE', 'uae': 'AE', 'dubai': 'AE', 'abu dabi': 'AE', 'abu dhabi': 'AE',
  'misir': 'EG', 'mısır': 'EG', 'egypt': 'EG', 'kahire': 'EG', 'cairo': 'EG', 'sarm': 'EG', 'şarm': 'EG', 'hurghada': 'EG',
  'fas': 'MA', 'morocco': 'MA', 'marakes': 'MA', 'marakeş': 'MA', 'kazablanka': 'MA',
  'katar': 'QA', 'qatar': 'QA', 'doha': 'QA',
  'suudi': 'SA', 'suudi arabistan': 'SA', 'saudi': 'SA', 'riyad': 'SA', 'cidde': 'SA',
  'umman': 'OM', 'oman': 'OM', 'maskat': 'OM',
  'maldivler': 'MV', 'maldives': 'MV', 'male': 'MV',
  'seyseller': 'SC', 'seyşeller': 'SC', 'seychelles': 'SC',
  'mauritius': 'MU',
  'guney afrika': 'ZA', 'güney afrika': 'ZA', 'south africa': 'ZA', 'cape town': 'ZA',
  'turkiye': 'TR', 'türkiye': 'TR', 'turkey': 'TR', 'istanbul': 'TR', 'antalya': 'TR', 'izmir': 'TR',
  'kktc': 'CY', 'kibris': 'CY', 'kıbrıs': 'CY',

  // Americas
  'amerika': 'US', 'abd': 'US', 'usa': 'US', 'united states': 'US', 'new york': 'US', 'los angeles': 'US', 'miami': 'US', 'san francisco': 'US',
  'kanada': 'CA', 'canada': 'CA', 'toronto': 'CA', 'vancouver': 'CA', 'montreal': 'CA',
  'meksika': 'MX', 'mexico': 'MX', 'cancun': 'MX', 'mexico city': 'MX',
  'brezilya': 'BR', 'brazil': 'BR', 'rio': 'BR', 'sao paulo': 'BR',
  'arjantin': 'AR', 'argentina': 'AR', 'buenos aires': 'AR',
  'kolombiya': 'CO', 'colombia': 'CO', 'medellin': 'CO', 'bogota': 'CO'
};

function normalizeText(text: string): string {
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
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractDestinationCountry(query: string): string | null {
  const norm = normalizeText(query);
  if (!norm) return null;

  // 1. Direct synonym matching (multi-word first, then single words) with suffix support
  const sortedKeys = Object.keys(COUNTRY_NAME_SYNONYMS).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    const keyNorm = normalizeText(key);
    // Matches root word plus optional Turkish grammatical suffixes (e.g. baliye, taylanda, italyada, japonyanin)
    const regex = new RegExp(`(^|\\s)${keyNorm}(ye|ya|e|a|de|da|den|dan|in|un|nin|nun|lar|ler)?(\\s|$)`, 'i');
    if (regex.test(norm)) {
      return COUNTRY_NAME_SYNONYMS[key];
    }
  }

  // 2. Word prefix matching for roots of length >= 4
  const words = norm.split(' ');
  for (const key of sortedKeys) {
    const keyNorm = normalizeText(key);
    if (keyNorm.length >= 4) {
      if (words.some((w) => w.startsWith(keyNorm))) {
        return COUNTRY_NAME_SYNONYMS[key];
      }
    }
  }

  // 3. Direct ISO-2 uppercase match
  const rawWords = query.split(/\s+/);
  for (const w of rawWords) {
    const upper = w.toUpperCase().replace(/[^A-Z]/g, '');
    if (upper.length === 2) {
      const name = getCountryName(upper, 'en');
      if (name && name !== upper) {
        return upper;
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
  const norm = normalizeText(rawQuery);
  const targetCountry = extractDestinationCountry(rawQuery);
  const isTr = lang === 'tr';

  const actions: AssistantActionPill[] = [];
  const passportItems = getPassportItems(currentPassport);
  const originName = getCountryName(currentPassport, lang);

  // Live Rates
  const usdRate = getCrossRate('USD', 'TRY').toFixed(2);
  const eurRate = getCrossRate('EUR', 'TRY').toFixed(2);

  // --------------------------------------------------------------------------
  // BROAD SCENARIO 1: PASSPORT POWER & STATS ("Kaç ülkeye vizesiz gidebilirim?", "Pasaportumun gücü")
  // --------------------------------------------------------------------------
  if (
    norm.includes('kac ulke') ||
    norm.includes('kac ulkeye') ||
    norm.includes('pasaport gucu') ||
    norm.includes('vizesiz kac') ||
    norm.includes('pasaportumla kac')
  ) {
    const freeCount = passportItems.filter((it) => it.cat === 'free').length;
    const evisaCount = passportItems.filter((it) => it.cat === 'evisa' || it.cat === 'voa' || it.cat === 'eta').length;
    const idCount = passportItems.filter((it) => it.id).length;
    const totalEasy = freeCount + evisaCount;

    actions.push({
      id: 'tab-where',
      type: 'switch_tab',
      tabKey: 'where_can_i_go',
      label: isTr ? '🌍 Vizesiz Ülkeler Haritasını Aç' : '🌍 Open Visa-Free Map',
      accentTone: 'teal'
    });
    actions.push({
      id: 'tab-compare',
      type: 'switch_tab',
      tabKey: 'compare',
      label: isTr ? '⚖️ Pasaportları Karşılaştır' : '⚖️ Compare Passports',
      accentTone: 'sky'
    });

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: isTr
        ? `🛂 **${originName} Pasaport Gücü & Seyahat İstatistikleri:**\n\n` +
          `• **Tamamen Vizesiz:** **${freeCount} Ülke**\n` +
          `• **Kapıda Vize / E-Vize Kolaylığı:** **${evisaCount} Ülke**\n` +
          `• **Çipli Kimlikle (Pasaportsus) Giriş:** **${idCount} Ülke**\n` +
          `• **Toplam Vizesiz & Kolay Seyahat:** **${totalEasy} Ülke**\n\n` +
          `Dünya haritası üzerinde gidebileceğiniz tüm ülkeleri filtrelemek için aşağıdaki harita butonuna basabilirsiniz.`
        : `🛂 **${originName} Passport Power & Travel Metrics:**\n\n` +
          `• **Visa-Free Access:** **${freeCount} Countries**\n` +
          `• **Visa on Arrival / eVisa:** **${evisaCount} Countries**\n` +
          `• **Total Easy Access:** **${totalEasy} Destinations**`,
      spokenText: isTr
        ? `${originName} pasaportuyla ${freeCount} ülkeye vizesiz, toplam ${totalEasy} ülkeye kolayca gidebilirsiniz.`
        : `With a ${originName} passport, you have visa-free access to ${freeCount} countries.`,
      timestamp: new Date(),
      actions
    };
  }

  // --------------------------------------------------------------------------
  // BROAD SCENARIO 2: ID CARD TRAVEL ("Kimlikle hangi ülkelere gidilir?", "Pasaportsuz seyahat")
  // --------------------------------------------------------------------------
  if (
    norm.includes('kimlik') ||
    norm.includes('kimlikle') ||
    norm.includes('pasaportsus') ||
    norm.includes('pasaportsuz') ||
    norm.includes('nufus cuzdani')
  ) {
    const idCountries = passportItems
      .filter((it) => it.id)
      .map((it) => `${getFlag(it.c)} **${getCountryName(it.c, lang)}** (${it.v === 'vf' ? 'Süresiz' : `${it.v} Gün`})`);

    actions.push({
      id: 'open-ge',
      type: 'open_country',
      countryCode: 'GE',
      label: '🇬🇪 Gürcistan Rehberi',
      accentTone: 'teal'
    });
    actions.push({
      id: 'open-rs',
      type: 'open_country',
      countryCode: 'RS',
      label: '🇷🇸 Sırbistan Rehberi',
      accentTone: 'sky'
    });
    actions.push({
      id: 'open-ba',
      type: 'open_country',
      countryCode: 'BA',
      label: '🇧🇦 Bosna Hersek Rehberi',
      accentTone: 'amber'
    });

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: isTr
        ? `🆔 **${originName} Vatandaşlarının Yalnızca Çipli Kimlikle Gidebildiği Ülkeler:**\n\n` +
          `${idCountries.join('\n')}\n\n` +
          `*Ayrıca KKTC'ye de yeni çipli kimlik kartınızla doğrudan giriş yapabilirsiniz.*\n\n` +
          `⚠️ **Önemli Not:** Seyahatte kimlik kartınızın yeni çipli kimlik olması ve fotoğraflı olması zorunludur. Eski tip nüfus cüzdanları geçerli değildir.`
        : `🆔 **Countries you can enter using only your National ID card:**\n\n${idCountries.join('\n')}`,
      spokenText: isTr
        ? 'Gürcistan, Sırbistan, Bosna Hersek, Azerbaycan ve Moldova dahil 6 ülkeye pasaportsuz çipli kimlikle gidebilirsiniz.'
        : 'You can travel to several neighboring countries using only your national ID card.',
      timestamp: new Date(),
      actions
    };
  }

  // --------------------------------------------------------------------------
  // BROAD SCENARIO 3: WHERE CAN I GO? / BALKANS / WARM PLACES ("Nereye gidebilirim?", "Balkanlar vizesiz mi?")
  // --------------------------------------------------------------------------
  if (
    !targetCountry &&
    (norm.includes('nereye') ||
      norm.includes('nerelere') ||
      norm.includes('vizesiz ulke') ||
      norm.includes('balkan') ||
      norm.includes('avrupa vizesiz') ||
      norm.includes('sicak yer') ||
      norm.includes('tatil yeri'))
  ) {
    actions.push({
      id: 'tab-where',
      type: 'switch_tab',
      tabKey: 'where_can_i_go',
      label: isTr ? '🌍 Dünya Radarında Vizesiz Yerleri Gör' : '🌍 View Visa-Free Radar',
      accentTone: 'teal'
    });
    actions.push({
      id: 'open-th',
      type: 'open_country',
      countryCode: 'TH',
      label: '🇹🇭 Tayland (Sıcak/Tropik)',
      accentTone: 'coral'
    });
    actions.push({
      id: 'open-me',
      type: 'open_country',
      countryCode: 'ME',
      label: '🇲🇪 Karadağ (Balkan/Adriyatik)',
      accentTone: 'sky'
    });
    actions.push({
      id: 'open-rs',
      type: 'open_country',
      countryCode: 'RS',
      label: '🇷🇸 Sırbistan (Kültür/Şehir)',
      accentTone: 'amber'
    });

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: isTr
        ? `✈️ **${originName} Pasaportu İle En Popüler Vizesiz Rotalar:**\n\n` +
          `🌴 **Sıcak & Tropik Tatil:** Tayland (30-60 Gün), Bali/Endonezya (Kapıda Vize), Malezya (90 Gün), Maldivler (30 Gün)\n\n` +
          `🏰 **Vizesiz Balkanlar & Avrupa:** Karadağ (90 Gün), Sırbistan (90 Gün), Arnavutluk (90 Gün), Bosna-Hersek (90 Gün), Kuzey Makedonya (90 Gün)\n\n` +
          `🏔️ **Yakın & Kimlikle Gidilen:** Gürcistan (1 Yıl), Azerbaycan (90 Gün)\n\n` +
          `Aşağıdaki butonları kullanarak doğrudan ülke rehberlerini inceleyebilir veya Dünya Radarı'ndan filtreleme yapabilirsiniz.`
        : `✈️ **Top Visa-Free Destination Categories for ${originName} Passport:**\n\n` +
          `🌴 **Tropical Beach:** Thailand, Indonesia, Malaysia, Maldives\n` +
          `🏰 **Balkans & Europe:** Montenegro, Serbia, Albania, Bosnia\n` +
          `🏔️ **Neighboring:** Georgia, Azerbaijan`,
      spokenText: isTr
        ? 'Balkanlar, Tayland, Gürcistan ve Karadağ dahil popüler vizesiz rotaları ekranda listeledim.'
        : 'I have displayed the top visa-free destinations categorized by region on your screen.',
      timestamp: new Date(),
      actions
    };
  }

  // --------------------------------------------------------------------------
  // BROAD SCENARIO 4: SCHENGEN CALCULATOR & 90/180 RULE ("Schengen günümü hesapla", "Kaç gün kalabilirim?")
  // --------------------------------------------------------------------------
  if (norm.includes('schengen') || norm.includes('90 180') || norm.includes('gun sayac') || norm.includes('gunum kaldi')) {
    actions.push({
      id: 'tab-counter',
      type: 'switch_tab',
      tabKey: 'day_counter',
      label: isTr ? '📅 90/180 Gün Sayacını Aç' : '📅 Open 90/180 Day Counter',
      accentTone: 'teal'
    });

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: isTr
        ? `🇪🇺 **Schengen 90/180 Kuralı Nasıl Çalışır?**\n\n` +
          `Schengen bölgesinde (veya kural uygulayan ülkelerde) herhangi bir **180 günlük geriye dönük zaman diliminde toplam en fazla 90 gün** kalabilirsiniz.\n\n` +
          `• Giriş ve çıkış yaptığınız günler tam gün sayılır.\n` +
          `• Kural takvim yılına göre değil, her seyahat gününden geriye doğru son 180 gün taranarak hesaplanır.\n\n` +
          `İhlal riskine girmemek ve kalan gününüzü kesin hesaplamak için **90/180 Gün Sayacı** sekmemizi kullanabilirsiniz.`
        : `🇪🇺 **How the Schengen 90/180-Day Rule Works:**\n\nYou may stay a maximum of 90 days within any rolling 180-day window. Use our 90/180 Day Counter to verify compliance.`,
      spokenText: isTr
        ? 'Schengen bölgesinde son 180 gün içinde en fazla 90 gün kalabilirsiniz. Gün sayacını ekrana getirdim.'
        : 'The Schengen rule allows a maximum of 90 days in any 180-day rolling window.',
      timestamp: new Date(),
      actions
    };
  }

  // --------------------------------------------------------------------------
  // BROAD SCENARIO 5: TRANSIT VISA & AIRPORT LAYOVER ("Transit vize gerekir mi?", "Aktarmalı uçuş")
  // --------------------------------------------------------------------------
  if (norm.includes('transit') || norm.includes('aktarma') || norm.includes('aktarmali') || norm.includes('layover')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: isTr
        ? `✈️ **Aktarmalı Uçuşlarda Transit Vize Kuralları:**\n\n` +
          `1. **Hava Tarafı (Airside Transit):** Tek biletle (aynı rezervasyon koduyla) uçuyorsanız, bagajınızı aktarma noktasında teslim almıyorsanız ve uluslararası transit salonundan dışarı çıkmıyorsanız (Doha, Dubai, İstanbul gibi büyük merkezlerde) çoğu ülke transit vize istemez.\n` +
          `2. **Kara Tarafı (Landside Transit):** Farklı havayollarından ayrı ayrı bilet aldıysanız, bagajınızı alıp yeniden check-in yapmanız gerekiyorsa ülkeye resmi giriş sayılır ve normal vize gerekir.\n` +
          `3. **Özel Durumlar:** ABD ve Kanada'da hava tarafı transit kavramı yoktur; sadece uçak değiştirecek olsanız dahi C-1 Transit Vizesi veya eTA zorunludur.`
        : `✈️ **Transit Visa & Airport Layover Rules:**\n\nAirside transit usually does not require a visa if travelling on a single ticket without claiming luggage. USA and Canada require transit visas even for brief stopovers.`,
      spokenText: isTr
        ? 'Tek biletle aktarma yapıyorsanız ve uluslararası transit alandan çıkmıyorsanız genelde transit vize gerekmez.'
        : 'Airside transit on a single ticket generally does not require a visa.',
      timestamp: new Date()
    };
  }

  // --------------------------------------------------------------------------
  // BROAD SCENARIO 6: PASSPORT VALIDITY ("Pasaport süresi kaç ay olmalı?")
  // --------------------------------------------------------------------------
  if (norm.includes('pasaport sure') || norm.includes('gecerlilik') || norm.includes('6 ay')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: isTr
        ? `🛂 **Yurt Dışı Seyahatlerinde Pasaport Geçerlilik Süresi Kuralı:**\n\n` +
          `Dünya genelindeki ülkelerin %90'ından fazlası, planlanan **seyahat bitiş veya ülkeye giriş tarihinden itibaren en az 6 ay** (bazı Avrupa/Schengen ülkelerinde en az 3 ay) geçerli pasaport şartı koşar.\n\n` +
          `Pasaport süreniz 6 aydan az ise havalimanında uçağa binişiniz havayolu şirketi tarafından reddedilebilir. Yola çıkmadan önce pasaportunuzu yenilemeniz önemle tavsiye edilir.`
        : `🛂 **Passport Validity Requirements:**\n\nMost countries require at least 6 months of validity beyond your planned return date.`,
      spokenText: isTr
        ? 'Uluslararası uçuşlarda pasaportunuzun en az 6 ay geçerlilik süresinin bulunması şarttır.'
        : 'Most international destinations require at least six months of passport validity.',
      timestamp: new Date()
    };
  }

  // --------------------------------------------------------------------------
  // BROAD SCENARIO 7: TRAVEL UTILITY GENERAL QUERIES (Packing, Tipping, Timezone, FX, Flights, Hotels)
  // --------------------------------------------------------------------------
  if (norm.includes('valiz') || norm.includes('bavul') || norm.includes('packing') || norm.includes('koffer') || norm.includes('ne almali')) {
    actions.push({
      id: 'tool-packing',
      type: 'open_tool',
      toolKey: 'packing',
      label: isTr ? '🧳 Akıllı Valiz Listesini Aç' : '🧳 Open Smart Packing List',
      accentTone: 'teal'
    });
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: isTr
        ? 'Seyahat valizinizi iklime, destinasyona ve seyahat sürenize göre eksiksiz hazırlamak için **Akıllı Valiz Kontrol Listesi** aracımızı kullanabilirsiniz.'
        : 'You can use our **Smart Packing List** tool to generate a tailored packing checklist based on climate, destination, and trip duration.',
      spokenText: isTr
        ? 'Valizinizi eksiksiz hazırlayabilmeniz için Akıllı Valiz Kontrol Listesi hazır.'
        : 'I have opened the packing checklist tool for you.',
      timestamp: new Date(),
      actions
    };
  }

  if (norm.includes('bahsis') || norm.includes('tipping') || norm.includes('trinkgeld')) {
    actions.push({
      id: 'tool-tipping',
      type: 'open_tool',
      toolKey: 'tipping',
      label: isTr ? '💵 Bahşiş Hesaplayıcıyı Aç' : '💵 Open Tipping Calculator',
      accentTone: 'amber'
    });
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: isTr
        ? 'Restoran, taksi ve otellerde ülkeye özgü bahşiş kurallarını ve faturaya eklenecek ideal tutarı hesaplamak için **Global Bahşiş Hesaplayıcı** emrinizde.'
        : 'Use our **Global Tipping Calculator** to calculate customary gratuity according to local cultural norms.',
      spokenText: isTr
        ? 'Gideceğiniz ülkenin bahşiş standartlarını hesaplamak için Bahşiş Hesaplayıcı hazır.'
        : 'The Tipping Calculator is ready on your screen.',
      timestamp: new Date(),
      actions
    };
  }

  if (norm.includes('saat fark') || norm.includes('timezone') || norm.includes('zeitzone') || norm.includes('dunya saat')) {
    actions.push({
      id: 'tool-timezone',
      type: 'open_tool',
      toolKey: 'overlap',
      label: isTr ? '⏰ Saat Farkı & Çakışma Matrisini Aç' : '⏰ Open Timezone Overlap Tool',
      accentTone: 'sky'
    });
    actions.push({
      id: 'radar-clock',
      type: 'open_tool',
      toolKey: 'radar',
      radarMode: 'clock',
      label: isTr ? '🌍 Canlı Dünya Saatleri Radarı' : '🌍 Live World Clock Radar',
      accentTone: 'teal'
    });
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: isTr
        ? 'İki şehir arasındaki canlı saat farkını görmek, ortak online toplantı saati bulmak veya seyahat planlamak için zaman araçlarımız hazır:'
        : 'Explore live timezone differences between global hubs with our dedicated tools:',
      spokenText: isTr
        ? 'Şehirler arası saat farkı ve dünya saatleri araçlarımızı ekrana getirdim.'
        : 'Live world clocks and timezone tools are ready on screen.',
      timestamp: new Date(),
      actions
    };
  }

  if (norm.includes('doviz') || norm.includes('kur') || norm.includes('currency') || norm.includes('para cevir') || norm.includes('wechselkurs') || norm.includes('dolar') || norm.includes('euro')) {
    actions.push({
      id: 'radar-fx',
      type: 'open_tool',
      toolKey: 'radar',
      radarMode: 'currency',
      label: isTr ? '💱 Canlı Döviz & Kur Radarı' : '💱 Live FX & Currency Radar',
      accentTone: 'teal'
    });
    actions.push({
      id: 'aff-wise',
      type: 'affiliate',
      url: 'https://wise.com',
      badge: isTr ? 'Sıfır Komisyon' : 'Zero Markup',
      label: isTr ? '💳 Wise Çok Para Birimli Kart Al' : '💳 Get Wise Multi-Currency Card',
      accentTone: 'sky'
    });
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: isTr
        ? `Güncel canlı seyahat kurlarımız: **1 USD = ${usdRate} TRY** | **1 EUR = ${eurRate} TRY**.\n\nYurt dışı harcamalarınızda yüksek banka döviz komisyonlarından kaçınmak için Wise çok para birimli dijital kartını öneriyoruz.`
        : `Live baseline travel rates: **1 USD = ${usdRate} TRY** | **1 EUR = ${eurRate} TRY**.\n\nWe recommend a multi-currency travel debit card like Wise to avoid high markups.`,
      spokenText: isTr
        ? `Canlı kurlar: 1 Dolar ${usdRate} lira, 1 Euro ${eurRate} lira seviyesindedir.`
        : `Current travel exchange rates are 1 US Dollar at ${usdRate} Lira, and 1 Euro at ${eurRate} Lira.`,
      timestamp: new Date(),
      actions
    };
  }

  if (norm.includes('ucak') || norm.includes('uçak') || norm.includes('flight') || norm.includes('skyscanner') || norm.includes('bilet')) {
    actions.push({
      id: 'aff-flights',
      type: 'affiliate',
      url: 'https://wayaway.io',
      badge: isTr ? 'En İyi Fiyat' : 'Best Flight Deals',
      label: isTr ? '✈️ Ucuz Uçak Bileti Karşılaştır (WayAway)' : '✈️ Compare Cheap Flights',
      accentTone: 'coral'
    });
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: isTr
        ? 'Yurt dışı uçuşlarında en uygun fiyatları bulmak için hafta ortası (Salı/Çarşamba) uçuşlarını tercih etmenizi ve en az 3-6 hafta önceden karşılaştırma yapmanızı öneririz.'
        : 'For the best international airfares, mid-week flights booked 3-6 weeks ahead generally offer the highest savings.',
      spokenText: isTr
        ? 'En uygun uçak biletlerini karşılaştırabileceğiniz uçuş arama aracını ekrana getirdim.'
        : 'I have displayed flight search options for you.',
      timestamp: new Date(),
      actions
    };
  }

  if (norm.includes('otel') || norm.includes('hotel') || norm.includes('konaklama') || norm.includes('agoda') || norm.includes('booking')) {
    actions.push({
      id: 'aff-agoda',
      type: 'affiliate',
      url: 'https://www.agoda.com',
      badge: isTr ? '%35 İndirim' : '35% Discount',
      label: isTr ? '🏨 Agoda Otel Fırsatları' : '🏨 Agoda Hotel Deals',
      accentTone: 'teal'
    });
    actions.push({
      id: 'aff-booking',
      type: 'affiliate',
      url: 'https://www.booking.com',
      badge: isTr ? 'Ücretsiz İptal' : 'Free Cancellation',
      label: isTr ? '🏨 Booking.com Rezervasyonu' : '🏨 Booking.com Hotels',
      accentTone: 'sky'
    });
    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: isTr
        ? 'Asya ve Uzak Doğu seyahatlerinde Agoda %35\'e varan özel bölgesel indirimler sunar. Avrupa ve Amerika için Booking.com geniş iptal esnekliği sağlar.'
        : 'Agoda offers deep regional discounts in Asia, while Booking.com provides exceptional flexibility in Europe and the Americas.',
      spokenText: isTr
        ? 'Otel rezervasyonlarında indirimli Agoda ve Booking bağlantılarını ekrana hazırladım.'
        : 'Hotel booking options are ready on your screen.',
      timestamp: new Date(),
      actions
    };
  }

  // --------------------------------------------------------------------------
  // BROAD SCENARIO 8: TARGET COUNTRY SPECIFIC QUERY (Visa, Route, Plugs, Apps, Cost, Safety)
  // --------------------------------------------------------------------------
  if (targetCountry) {
    const cName = getCountryName(targetCountry, lang);
    const flag = getFlag(targetCountry);
    const item = passportItems.find((i) => i.c === targetCountry);
    const geo = getCountryGeography(targetCountry, lang);
    const insights = getCountryInsights(targetCountry, lang);
    const itinerary = getCountryItinerary(targetCountry, lang);
    const practical = getPracticalInfo(targetCountry, lang);

    // Primary action: Always open full 360 Country Dossier
    actions.push({
      id: `open-${targetCountry}`,
      type: 'open_country',
      countryCode: targetCountry,
      label: isTr ? `${flag} ${cName} 360° Dosyasını Aç` : `${flag} Open ${cName} 360° Dossier`,
      accentTone: 'teal'
    });

    // Sub-intent: ITINERARY / ROUTE
    if (
      norm.includes('rota') ||
      norm.includes('roto') ||
      norm.includes('gezi') ||
      norm.includes('itinerary') ||
      norm.includes('kac gun') ||
      norm.includes('plan') ||
      norm.includes('durak') ||
      norm.includes('route') ||
      norm.includes('nereleri')
    ) {
      actions.push({
        id: `tab-route`,
        type: 'switch_tab',
        tabKey: 'route_planner',
        label: isTr ? '🗺️ Rota Planlayıcıda Özelleştir' : '🗺️ Customize in Route Planner',
        accentTone: 'sky'
      });

      const isAsia = ['TH', 'VN', 'ID', 'MY', 'JP', 'KR', 'KH'].includes(targetCountry);
      if (isAsia) {
        actions.push({
          id: `aff-12go`,
          type: 'affiliate',
          url: 'https://12go.asia',
          badge: isTr ? 'Asya Ulaşım' : 'Asia Transit',
          label: isTr ? '🚆 12Go ile Tren & Otobüs Biletleri' : '🚆 12Go Train & Bus Booking',
          accentTone: 'coral'
        });
      } else {
        actions.push({
          id: `aff-omio`,
          type: 'affiliate',
          url: 'https://www.omio.com',
          badge: isTr ? 'Tren & Otobüs' : 'Trains & Buses',
          label: isTr ? '🚆 Omio ile Tren & Otobüs Karşılaştır' : '🚆 Compare Transit on Omio',
          accentTone: 'coral'
        });
      }

      actions.push({
        id: `aff-agoda`,
        type: 'affiliate',
        url: 'https://www.agoda.com',
        badge: isTr ? '%35 İndirim' : 'Up to 35% Off',
        label: isTr ? `🏨 ${cName} Otelleri (Agoda)` : `🏨 ${cName} Hotels (Agoda)`,
        accentTone: 'teal'
      });

      const stopsSummary = (itinerary?.stops || [])
        .slice(0, 3)
        .map((s, idx) => `${idx + 1}. **${s.name}** (${s.durationBadge})`)
        .join('\n');

      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        detectedCountry: { code: targetCountry, name: cName, flag },
        text: isTr
          ? `🗺️ **${flag} ${cName} İçin Önerilen Rota (${itinerary.idealDurationText}):**\n\n` +
            `${itinerary.routeSummary}\n\n` +
            `**Öne Çıkan Duraklar:**\n${stopsSummary}\n\n` +
            `• *İdeal Gezi Dönemi:* ${itinerary.bestSeason}\n` +
            `• *Ulaşım Şekli:* ${itinerary.transportMode}`
          : `🗺️ **${flag} Recommended ${cName} Itinerary (${itinerary.idealDurationText}):**\n\n` +
            `${itinerary.routeSummary}\n\n` +
            `**Key Stops:**\n${stopsSummary}\n\n` +
            `• *Best Months:* ${itinerary.bestSeason}\n` +
            `• *Transit Mode:* ${itinerary.transportMode}`,
        spokenText: isTr
          ? `${cName} için ${itinerary.idealDurationText} rota planınızı hazırladım. Detayları ekranda görebilirsiniz.`
          : `I have prepared your ${itinerary.idealDurationText} itinerary for ${cName}.`,
        timestamp: new Date(),
        actions
      };
    }

    // Sub-intent: PLUG / VOLTAGE / PRACTICAL
    if (
      norm.includes('priz') ||
      norm.includes('fis') ||
      norm.includes('fiş') ||
      norm.includes('voltaj') ||
      norm.includes('plug') ||
      norm.includes('stecker') ||
      norm.includes('elektrik') ||
      norm.includes('adaptor')
    ) {
      actions.push({
        id: `tool-packing`,
        type: 'open_tool',
        toolKey: 'packing',
        label: isTr ? '🧳 Valizine Adaptör Ekle' : '🧳 Add Adapter to Packing List',
        accentTone: 'teal'
      });

      const plugText = typeof geo.plugTypes === 'string' ? geo.plugTypes : 'Standart priz';

      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        detectedCountry: { code: targetCountry, name: cName, flag },
        text: isTr
          ? `🔌 **${flag} ${cName} Elektrik & Priz Standartları:**\n\n` +
            `• **Priz Tipleri:** ${plugText}\n` +
            `• **Pratik Bilgi:** ${practical.plugType}\n\n` +
            `Türkiye standart C/F tipi fişleriniz bazı ülkelerde doğrudan uymayabilir; seyahatinizden önce üniversal bir priz adaptörü bulundurmanız önerilir.`
          : `🔌 **${flag} ${cName} Electrical & Plug Standards:**\n\n` +
            `• **Plug Types:** ${plugText}\n` +
            `• **Practical Guidance:** ${practical.plugType}`,
        spokenText: isTr
          ? `${cName} priz standartları: ${plugText}. Detayları ekranda inceleyebilirsiniz.`
          : `${cName} uses ${plugText}. Full specs are displayed on screen.`,
        timestamp: new Date(),
        actions
      };
    }

    // Sub-intent: LIVING COST & EXPENSES ("Pahalı mı?", "Ne kadar harcanır?")
    if (
      norm.includes('pahali') ||
      norm.includes('pahalı') ||
      norm.includes('ucuz') ||
      norm.includes('maliyet') ||
      norm.includes('butce') ||
      norm.includes('bütçe') ||
      norm.includes('fiyat') ||
      norm.includes('harcarim')
    ) {
      const costs = insights?.livingCosts;
      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        detectedCountry: { code: targetCountry, name: cName, flag },
        text: isTr
          ? `💰 **${flag} ${cName} Seyahat & Yaşam Maliyetleri:**\n\n` +
            `• **Sırt Çantalı Günlük Bütçe:** ${costs?.dailyBudgetBackpackerUsd || '25 - 40 $'}\n` +
            `• **Standart Günlük Bütçe:** ${costs?.dailyBudgetMidrangeUsd || '60 - 100 $'}\n` +
            `• **Yemek Maliyeti:** ${costs?.budgetMealUsd || '3 - 8 $'}\n` +
            `• **3 Yıldızlı Otel Gecelik:** ${costs?.hotel3StarUsd || '30 - 60 $'}\n` +
            `• **Uçuş Tavsiyesi:** ${costs?.flightTip || 'Kampanyaları takip ediniz.'}`
          : `💰 **${flag} ${cName} Travel & Living Costs:**\n\n` +
            `• **Daily Budget:** ${costs?.dailyBudgetMidrangeUsd || '60 - 100 $'}\n` +
            `• **Average Meal:** ${costs?.budgetMealUsd || '5 - 10 $'}`,
        spokenText: isTr
          ? `${cName} için günlük ortalama bütçe ${costs?.dailyBudgetMidrangeUsd || '60 - 90 dolar'} seviyesindedir.`
          : `Average daily budget for ${cName} is around ${costs?.dailyBudgetMidrangeUsd || '60 - 90 dollars'}.`,
        timestamp: new Date(),
        actions
      };
    }

    // Sub-intent: ESIM / INTERNET
    if (norm.includes('esim') || norm.includes('internet') || norm.includes('sim kart') || norm.includes('roaming') || norm.includes('data')) {
      actions.push({
        id: `aff-airalo`,
        type: 'affiliate',
        url: 'https://www.airalo.com',
        badge: isTr ? 'Önerilen 5G eSIM' : 'Recommended 5G',
        label: isTr ? `📱 Airalo ${cName} eSIM Paketi Al` : `📱 Get Airalo ${cName} eSIM`,
        accentTone: 'coral'
      });

      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        detectedCountry: { code: targetCountry, name: cName, flag },
        text: isTr
          ? `📱 **${flag} ${cName} İnternet & eSIM Önerisi:**\n\n${practical.esimTip}\n\nYurt dışı operatör dolaşım (roaming) ücretlerinden kaçınmak için Airalo yerel veya bölgesel eSIM paketini uçağa binmeden önce kurabilirsiniz.`
          : `📱 **${flag} ${cName} Mobile Internet & eSIM:**\n\n${practical.esimTip}`,
        spokenText: isTr
          ? `${cName} için Airalo dijital e sim paketini öneriyoruz. İndirimli bağlantıyı ekrana bıraktım.`
          : `For ${cName}, we recommend setting up an Airalo digital eSIM.`,
        timestamp: new Date(),
        actions
      };
    }

    // DEFAULT COUNTRY INTENT: Comprehensive 360 Visa & Travel Overview
    // Handles queries like "Tayland vizesi", "Tayland füzesi", "Bali vize istiyor mu", "Almanya vize"
    const badgeLabel = getCategoryBadgeLabel(item, lang);
    const stayLimitText = item?.v === 'vf' ? (isTr ? 'Süresiz' : 'Indefinite') : /^\d+$/.test(item?.v || '') ? `${item?.v} ${isTr ? 'Gün' : 'Days'}` : '';

    actions.push({
      id: `aff-airalo`,
      type: 'affiliate',
      url: 'https://www.airalo.com',
      badge: '5G eSIM',
      label: isTr ? '📱 Airalo 5G İnternet' : '📱 Airalo 5G eSIM',
      accentTone: 'sky'
    });

    actions.push({
      id: `aff-agoda`,
      type: 'affiliate',
      url: 'https://www.agoda.com',
      badge: isTr ? 'İndirimli Otel' : 'Hotels',
      label: isTr ? `🏨 ${cName} Otel Rezervasyonu` : `🏨 Book ${cName} Hotels`,
      accentTone: 'teal'
    });

    actions.push({
      id: `aff-insurance`,
      type: 'affiliate',
      url: 'https://safetywing.com',
      badge: 'Nomad & Seyahat',
      label: isTr ? '🛡️ SafetyWing Seyahat Sigortası' : '🛡️ SafetyWing Nomad Insurance',
      accentTone: 'slate'
    });

    const safetyScore = insights?.safety?.safetyScore || 80;
    const safetyLevel = insights?.safety?.safetyLevel || 'Güvenli';
    const plugText = typeof geo.plugTypes === 'string' ? geo.plugTypes : 'C, F';

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
          `• **Güvenlik Derecesi:** ${safetyLevel} (${safetyScore}/100)\n` +
          `• **İdeal Ziyaret Dönemi:** ${practical.bestMonths}\n\n` +
          `Aşağıdaki butonları kullanarak ülkenin 360° detaylı dosyasını açabilir, rota oluşturabilir veya seyahat ihtiyaçlarınızı temin edebilirsiniz:`
        : `🌍 **${flag} ${cName} Visa & Travel Brief (for ${originName} Passport):**\n\n` +
          `• **Visa Status:** **${badgeLabel}** ${stayLimitText ? `(${stayLimitText})` : ''}\n` +
          `• **Capital:** ${geo.capital}\n` +
          `• **Currency:** ${geo.currencyName} (${geo.currencyCode})\n` +
          `• **Power Plugs:** ${plugText}\n` +
          `• **Safety Score:** ${safetyScore}/100 (${safetyLevel})\n` +
          `• **Best Season:** ${practical.bestMonths}`,
      spokenText: isTr
        ? `${originName} pasaportu ile ${cName} için vize durumu: ${badgeLabel} ${stayLimitText ? `, ${stayLimitText} kalış süresi` : ''}. Seyahat detaylarını ekrana getirdim.`
        : `For ${originName} passport holders, ${cName} visa status is ${badgeLabel} ${stayLimitText ? `with up to ${stayLimitText}` : ''}. Details are on screen.`,
      timestamp: new Date(),
      actions
    };
  }

  // --------------------------------------------------------------------------
  // FALLBACK: INTELLIGENT GUIDED ASSISTANCE
  // --------------------------------------------------------------------------
  actions.push({
    id: 'tab-where',
    type: 'switch_tab',
    tabKey: 'where_can_i_go',
    label: isTr ? '🌍 Nereye Gidebilirim? (Dünya Radarı)' : '🌍 Where Can I Go? (Radar)',
    accentTone: 'teal'
  });
  actions.push({
    id: 'tab-route',
    type: 'switch_tab',
    tabKey: 'route_planner',
    label: isTr ? '🗺️ Çoklu Ülke Rota Planlayıcı' : '🗺️ Route Planner',
    accentTone: 'sky'
  });
  actions.push({
    id: 'tool-packing',
    type: 'open_tool',
    toolKey: 'packing',
    label: isTr ? '🧳 Valiz Kontrol Listesi' : '🧳 Packing Checklist',
    accentTone: 'amber'
  });

  return {
    id: `msg-${Date.now()}`,
    sender: 'assistant',
    text: isTr
      ? `Tam olarak hangi ülke veya seyahat aracını araştırmak istediğinizi belirtir misiniz?\n\n` +
        `Örnek sorular:\n` +
        `• *"Vizesiz gidebileceğim ülkeler neresi?"*\n` +
        `• *"Kimlikle hangi ülkelere gidebilirim?"*\n` +
        `• *"Tayland vizesi nasıl?"*\n` +
        `• *"İtalya 7 günlük rota hazırla"*\n` +
        `• *"Japonya priz tipi nedir?"*\n` +
        `• *"Schengen 90 gün kuralı nasıl hesaplanır?"*`
      : `Could you specify which country or travel tool you would like to explore?\n\n` +
        `Sample inquiries:\n` +
        `• *"Where can I travel visa-free?"*\n` +
        `• *"Do I need a visa for Thailand?"*\n` +
        `• *"Plan a 7-day itinerary for Italy"*`,
    spokenText: isTr
      ? 'Araştırmak istediğiniz bir ülke adı veya seyahat sorusu söyleyebilirsiniz.'
      : 'You can ask about any country or travel destination.',
    timestamp: new Date(),
    actions
  };
}

// ============================================================================
// WEB SPEECH API CONTROLLER (HIGH-FIDELITY VOICE INPUT & NATURAL TTS)
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

/**
 * Searches for the most natural human voice available in the client browser
 */
function getBestVoiceForLanguage(lang: string): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const targetLang = (lang || 'tr').toLowerCase();
  const langVoices = voices.filter((v) => v.lang.toLowerCase().startsWith(targetLang));
  if (langVoices.length === 0) return null;

  // Search for modern neural/natural high-fidelity voices
  const preferredKeywords = [
    'natural',
    'google',
    'premium',
    'enhanced',
    'siri',
    'yelda',
    'cem',
    'filiz',
    'ahmet',
    'emel',
    'online'
  ];

  for (const keyword of preferredKeywords) {
    const match = langVoices.find((v) => v.name.toLowerCase().includes(keyword));
    if (match) return match;
  }

  // Fallback to default or first voice for that language
  return langVoices.find((v) => v.default) || langVoices[0];
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
      ru: 'ru-RU'
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
 * Speaks a concise, warm conversational summary using the best available voice
 */
export function speakResponse(text: string, lang: string, onEnd?: () => void): void {
  if (!isSpeechSynthesisSupported()) return;

  try {
    window.speechSynthesis.cancel(); // Stop any pending speech

    // Ensure clean natural prose without markdown symbols
    const cleanedText = text
      .replace(/[*_#`~]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanedText);

    const langCodeMap: Record<string, string> = {
      tr: 'tr-TR',
      en: 'en-US',
      de: 'de-DE',
      es: 'es-ES',
      ru: 'ru-RU'
    };
    utterance.lang = langCodeMap[lang] || 'tr-TR';
    utterance.rate = 0.95; // Calm, natural human cadence
    utterance.pitch = 1.0;

    const bestVoice = getBestVoiceForLanguage(lang);
    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    if (onEnd) {
      utterance.onend = () => onEnd();
      utterance.onerror = () => onEnd();
    }

    window.speechSynthesis.speak(utterance);
  } catch {
    // Ignore speech synthesis errors gracefully
  }
}

export function stopSpeaking(): void {
  if (isSpeechSynthesisSupported()) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignored
    }
  }
}
