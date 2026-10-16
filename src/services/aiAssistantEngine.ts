/**
 * Vizamigo AI Copilot & Travel Concierge Intelligence Engine
 * Multi-lingual natural language processor, destination mapper,
 * site action dispatcher, and Web Speech API (STT/TTS) voice controller.
 */

import { getCountryName, getFlag, getCategoryBadgeLabel, getPracticalInfo } from '../data/passportData';
import { getPassportItems } from '../utils/calculator';
import { getCountryGeography } from '../data/countryGeography';
import { getCountryInsights } from '../data/countryInsights';
import { getCountryItinerary } from '../data/countryItineraries';
import { getCountryConciergePlan, ConciergePartnerNode } from '../data/travelConciergeEngine';
import { getCrossRate } from '../data/currencyRates';
import { TabKey } from '../components/Navigation';

export interface AssistantActionPill {
  id: string;
  type: 'open_country' | 'switch_tab' | 'open_tool' | 'affiliate';
  label: string;
  icon?: string;
  countryCode?: string;
  tabKey?: TabKey;
  toolKey?: 'packing' | 'tipping' | 'overlap' | 'radar' | 'audit';
  radarMode?: 'all' | 'clock' | 'weather' | 'currency';
  url?: string;
  badge?: string;
  accentTone?: 'teal' | 'coral' | 'amber' | 'slate' | 'sky';
}

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  actions?: AssistantActionPill[];
  detectedCountry?: {
    code: string;
    name: string;
    flag: string;
  };
}

// ============================================================================
// MULTI-LINGUAL DESTINATION & CITY MAPPING DICTIONARY
// ============================================================================
const COUNTRY_NAME_SYNONYMS: Record<string, string> = {
  // Southeast Asia
  'tayland': 'TH', 'thailand': 'TH', 'bangkok': 'TH', 'phuket': 'TH', 'chiang mai': 'TH', 'pattaya': 'TH',
  'vietnam': 'VN', 'hanoi': 'VN', 'ho chi minh': 'VN', 'da nang': 'VN',
  'endonezya': 'ID', 'indonesia': 'ID', 'bali': 'ID', 'cakarta': 'ID', 'jakarta': 'ID', 'ubud': 'ID',
  'malezya': 'MY', 'malaysia': 'MY', 'kuala lumpur': 'MY',
  'singapur': 'SG', 'singapore': 'SG',
  'filipinler': 'PH', 'philippines': 'PH', 'manila': 'PH', 'cebu': 'PH',
  'kambocya': 'KH', 'kamboçya': 'KH', 'cambodia': 'KH',

  // East Asia
  'japonya': 'JP', 'japan': 'JP', 'tokyo': 'JP', 'kyoto': 'JP', 'osaka': 'JP',
  'guney kore': 'KR', 'güney kore': 'KR', 'south korea': 'KR', 'korea': 'KR', 'seul': 'KR', 'seoul': 'KR',
  'cin': 'CN', 'çin': 'CN', 'china': 'CN', 'pekin': 'CN', 'beijing': 'CN', 'sanghay': 'CN', 'shanghai': 'CN',
  'tayvan': 'TW', 'taiwan': 'TW', 'taipei': 'TW',
  'hong kong': 'HK',

  // Europe
  'almanya': 'DE', 'germany': 'DE', 'deutschland': 'DE', 'berlin': 'DE', 'munih': 'DE', 'münih': 'DE', 'frankfurt': 'DE',
  'fransa': 'FR', 'france': 'FR', 'paris': 'FR', 'nice': 'FR', 'lyon': 'FR',
  'italya': 'IT', 'italy': 'IT', 'italien': 'IT', 'roma': 'IT', 'rome': 'IT', 'milano': 'IT', 'florensa': 'IT', 'floransa': 'IT', 'venedik': 'IT',
  'ispanya': 'ES', 'spain': 'ES', 'spanien': 'ES', 'madrid': 'ES', 'barselona': 'ES', 'barcelona': 'ES', 'sevilla': 'ES',
  'ingiltere': 'GB', 'birlesik krallik': 'GB', 'birleşik krallık': 'GB', 'united kingdom': 'GB', 'uk': 'GB', 'londra': 'GB', 'london': 'GB',
  'hollanda': 'NL', 'netherlands': 'NL', 'amsterdam': 'NL',
  'yunanistan': 'GR', 'greece': 'GR', 'atina': 'GR', 'athens': 'GR', 'selanik': 'GR', 'santorini': 'GR', 'mikonos': 'GR',
  'portekiz': 'PT', 'portugal': 'PT', 'lizbon': 'PT', 'lisbon': 'PT', 'porto': 'PT',
  'isvicre': 'CH', 'isviçre': 'CH', 'switzerland': 'CH', 'zurih': 'CH', 'zürich': 'CH', 'cenevre': 'CH',
  'avusturya': 'AT', 'austria': 'AT', 'viyana': 'AT', 'vienna': 'AT',
  'cekya': 'CZ', 'çekya': 'CZ', 'czechia': 'CZ', 'prag': 'CZ', 'prague': 'CZ',
  'macaristan': 'HU', 'hungary': 'HU', 'budapeste': 'HU', 'budapeşte': 'HU', 'budapest': 'HU',
  'polonya': 'PL', 'poland': 'PL', 'varsova': 'PL', 'varşova': 'PL', 'krakow': 'PL',
  'gurcistan': 'GE', 'gürcistan': 'GE', 'georgia': 'GE', 'tiflis': 'GE', 'tbilisi': 'GE', 'batum': 'GE', 'batumi': 'GE',
  'sirbistan': 'RS', 'sırbistan': 'RS', 'serbia': 'RS', 'belgrad': 'RS', 'belgrade': 'RS',
  'karadag': 'ME', 'karadağ': 'ME', 'montenegro': 'ME', 'kotor': 'ME', 'budva': 'ME',
  'arnavutluk': 'AL', 'albania': 'AL', 'tiran': 'AL', 'tirana': 'AL',
  'bosna': 'BA', 'bosna hersek': 'BA', 'bosnia': 'BA', 'saraybosna': 'BA', 'sarajevo': 'BA',
  'hirvatistan': 'HR', 'hırvatistan': 'HR', 'croatia': 'HR', 'zagreb': 'HR', 'dubrovnik': 'HR', 'split': 'HR',

  // Middle East & Africa
  'bae': 'AE', 'birlesik arap emirlikleri': 'AE', 'uae': 'AE', 'dubai': 'AE', 'abu dabi': 'AE', 'abu dhabi': 'AE',
  'misir': 'EG', 'mısır': 'EG', 'egypt': 'EG', 'kahire': 'EG', 'cairo': 'EG', 'sarm': 'EG', 'şarm': 'EG', 'hurghada': 'EG',
  'fas': 'MA', 'morocco': 'MA', 'marakes': 'MA', 'marakeş': 'MA', 'kazablanka': 'MA',
  'katar': 'QA', 'qatar': 'QA', 'doha': 'QA',
  'suudi': 'SA', 'suudi arabistan': 'SA', 'saudi': 'SA', 'riyad': 'SA', 'cidde': 'SA',
  'umman': 'OM', 'oman': 'OM', 'maskat': 'OM',
  'urfa': 'TR', 'turkiye': 'TR', 'türkiye': 'TR', 'turkey': 'TR', 'istanbul': 'TR', 'antalya': 'TR',

  // Americas
  'amerika': 'US', 'abd': 'US', 'usa': 'US', 'united states': 'US', 'new york': 'US', 'los angeles': 'US', 'miami': 'US',
  'kanada': 'CA', 'canada': 'CA', 'toronto': 'CA', 'vancouver': 'CA',
  'meksika': 'MX', 'mexico': 'MX', 'cancun': 'MX', 'mexico city': 'MX',
  'brezilya': 'BR', 'brazil': 'BR', 'rio': 'BR', 'sao paulo': 'BR',
  'arjantin': 'AR', 'argentina': 'AR', 'buenos aires': 'AR',
  'kolombiya': 'CO', 'colombia': 'CO', 'medellin': 'CO', 'bogota': 'CO'
};

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[ç]/g, 'c')
    .replace(/[ğ]/g, 'g')
    .replace(/[ıİ]/g, 'i')
    .replace(/[ö]/g, 'o')
    .replace(/[ş]/g, 's')
    .replace(/[ü]/g, 'u')
    .trim();
}

/**
 * Extracts a destination country ISO-2 code from natural language text
 */
export function extractDestinationCountry(query: string): string | null {
  const norm = normalizeText(query);
  
  // 1. Direct synonym matching (multi-word first, then single words)
  const sortedKeys = Object.keys(COUNTRY_NAME_SYNONYMS).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    const keyNorm = normalizeText(key);
    // Boundary match
    const regex = new RegExp(`\\b${keyNorm}\\b`, 'i');
    if (regex.test(norm)) {
      return COUNTRY_NAME_SYNONYMS[key];
    }
  }

  // 2. Direct ISO-2 uppercase match (e.g., "TH", "DE", "JP")
  const words = query.split(/\s+/);
  for (const w of words) {
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
// INTENT PROCESSOR & RESPONSE GENERATOR
// ============================================================================
export async function processAssistantQuery(
  rawQuery: string,
  currentPassport: string = 'TR',
  lang: string = 'tr'
): Promise<AssistantMessage> {
  const norm = normalizeText(rawQuery);
  const targetCountry = extractDestinationCountry(rawQuery);
  const isTr = lang === 'tr';
  const isDe = lang === 'de';

  const actions: AssistantActionPill[] = [];

  // Helper to format currency symbol
  const usdRate = getCrossRate('USD', 'TRY').toFixed(2);
  const eurRate = getCrossRate('EUR', 'TRY').toFixed(2);

  // --------------------------------------------------------------------------
  // INTENT 1: SITE TOOL NAVIGATION REQUESTS (Packing, Tipping, Timezone, Radar)
  // --------------------------------------------------------------------------
  if (norm.includes('valiz') || norm.includes('bavul') || norm.includes('packing') || norm.includes('koffer')) {
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
        : 'Use our **Global Tipping Calculator** to calculate customary gratuity for dining, rides, and hotels according to local cultural norms.',
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
        : 'Explore live timezone differences between global hubs and coordinate overlapping meeting hours with our dedicated tools:',
      timestamp: new Date(),
      actions
    };
  }

  if (norm.includes('doviz') || norm.includes('kur') || norm.includes('currency') || norm.includes('para cevir') || norm.includes('wechselkurs')) {
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
        : `Live baseline travel rates: **1 USD = ${usdRate} TRY** | **1 EUR = ${eurRate} TRY**.\n\nWe recommend a multi-currency travel debit card like Wise to avoid high ATM/foreign exchange markups.`,
      timestamp: new Date(),
      actions
    };
  }

  // --------------------------------------------------------------------------
  // INTENT 2: TARGET COUNTRY SPECIFIC QUERY (Visa, Route, Plugs, Apps, Deals)
  // --------------------------------------------------------------------------
  if (targetCountry) {
    const cName = getCountryName(targetCountry, lang);
    const flag = getFlag(targetCountry);
    const passportItems = getPassportItems(currentPassport);
    const item = passportItems.find((i) => i.c === targetCountry);
    const geo = getCountryGeography(targetCountry, lang);
    const insights = getCountryInsights(targetCountry, lang);
    const itinerary = getCountryItinerary(targetCountry, lang);
    const concierge = getCountryConciergePlan(targetCountry, currentPassport);
    const practical = getPracticalInfo(targetCountry, lang);
    const originName = getCountryName(currentPassport, lang);

    // Primary action: Always allow opening the full 360 Country Dossier
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
      norm.includes('gezi') ||
      norm.includes('itinerary') ||
      norm.includes('kac gun') ||
      norm.includes('kaç gün') ||
      norm.includes('plan') ||
      norm.includes('durak') ||
      norm.includes('route')
    ) {
      actions.push({
        id: `tab-route`,
        type: 'switch_tab',
        tabKey: 'route_planner',
        label: isTr ? '🗺️ Rota Planlayıcıda Özelleştir' : '🗺️ Customize in Route Planner',
        accentTone: 'sky'
      });

      // Add local transit/train affiliate
      const isAsia = ['TH', 'VN', 'ID', 'MY', 'JP', 'KR', 'KH'].includes(targetCountry);
      if (isAsia) {
        actions.push({
          id: `aff-12go`,
          type: 'affiliate',
          url: 'https://12go.asia',
          badge: isTr ? 'Asya Tren & Otobüs' : 'Asia Transit Leader',
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

      const stopsSummary = itinerary.stops.slice(0, 3).map((s, idx) => `${idx + 1}. **${s.name}** (${s.durationBadge})`).join('\n');

      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        detectedCountry: { code: targetCountry, name: cName, flag },
        text: isTr
          ? `🗺️ **${flag} ${cName} İçin Önerilen Rota (${itinerary.idealDurationText}):**\n\n${itinerary.routeSummary}\n\n**Öne Çıkan Duraklar:**\n${stopsSummary}\n\n*İdeal Gezi Dönemi:* ${itinerary.bestSeason}\n*Ulaşım Şekli:* ${itinerary.transportMode}`
          : `🗺️ **${flag} Recommended ${cName} Itinerary (${itinerary.idealDurationText}):**\n\n${itinerary.routeSummary}\n\n**Key Stops:**\n${stopsSummary}\n\n*Best Months:* ${itinerary.bestSeason}\n*Transit Mode:* ${itinerary.transportMode}`,
        timestamp: new Date(),
        actions
      };
    }

    // Sub-intent: PLUG / VOLTAGE / PRACTICAL
    if (norm.includes('priz') || norm.includes('fis') || norm.includes('fiş') || norm.includes('voltaj') || norm.includes('plug') || norm.includes('stecker') || norm.includes('elektrik')) {
      actions.push({
        id: `tool-packing`,
        type: 'open_tool',
        toolKey: 'packing',
        label: isTr ? '🧳 Valizine Adaptör Ekle' : '🧳 Add Adapter to Packing List',
        accentTone: 'teal'
      });

      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        detectedCountry: { code: targetCountry, name: cName, flag },
        text: isTr
          ? `🔌 **${flag} ${cName} Elektrik & Priz Standartları:**\n\n- **Priz Tipleri:** ${geo.plugTypes.join(', ')}\n- **Voltaj & Frekans:** ${geo.voltage} / ${geo.frequency}\n- **Pratik Bilgi:** ${practical.plugType}\n\nTürkiye standart C/F tipi fişleriniz bazı ülkelerde doğrudan uymayabilir; üniversal priz adaptörü bulundurmanız önerilir.`
          : `🔌 **${flag} ${cName} Electrical & Plug Standards:**\n\n- **Plug Types:** ${geo.plugTypes.join(', ')}\n- **Voltage & Frequency:** ${geo.voltage} / ${geo.frequency}\n- **Practical Guidance:** ${practical.plugType}`,
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
          : `📱 **${flag} ${cName} Mobile Internet & eSIM:**\n\n${practical.esimTip}\n\nAvoid expensive home-carrier roaming fees by setting up an Airalo digital eSIM before arrival.`,
        timestamp: new Date(),
        actions
      };
    }

    // Default targetCountry intent: VISA & ESSENTIAL TRAVEL BRIEF
    const badgeLabel = getCategoryBadgeLabel(item, lang);
    const stayLimitText = item?.v === 'vf' ? (isTr ? 'Süresiz' : 'Indefinite') : /^\d+$/.test(item?.v || '') ? `${item?.v} ${isTr ? 'Gün' : 'Days'}` : '';

    // Add relevant affiliate links
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

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      detectedCountry: { code: targetCountry, name: cName, flag },
      text: isTr
        ? `🌍 **${flag} ${cName} Vize & Seyahat Durumu (${originName} Pasaportu İle):**\n\n` +
          `• **Vize Durumu:** **${badgeLabel}** ${stayLimitText ? `(${stayLimitText})` : ''}\n` +
          `• **Başkent:** ${geo.capital}\n` +
          `• **Para Birimi:** ${geo.currency} (${geo.currencyCode})\n` +
          `• **Priz Tipi:** ${geo.plugTypes.join(', ')} (${geo.voltage})\n` +
          `• **Güvenlik İndeksi:** ${insights.safetyRating.ratingText} (${insights.safetyRating.score}/100)\n` +
          `• **İdeal Seyahat Zamanı:** ${practical.bestMonths}\n\n` +
          `Aşağıdaki butonları kullanarak ülkenin 360° detaylı rehberini açabilir veya seyahat ihtiyaçlarınızı doğrudan temin edebilirsiniz:`
        : `🌍 **${flag} ${cName} Visa & Travel Brief (for ${originName} Passport):**\n\n` +
          `• **Visa Status:** **${badgeLabel}** ${stayLimitText ? `(${stayLimitText})` : ''}\n` +
          `• **Capital:** ${geo.capital}\n` +
          `• **Currency:** ${geo.currency} (${geo.currencyCode})\n` +
          `• **Power Plugs:** ${geo.plugTypes.join(', ')} (${geo.voltage})\n` +
          `• **Safety Score:** ${insights.safetyRating.score}/100 (${insights.safetyRating.ratingText})\n` +
          `• **Best Season:** ${practical.bestMonths}\n\n` +
          `Explore the buttons below to open the complete 360° dossier or book essential travel services:`,
      timestamp: new Date(),
      actions
    };
  }

  // --------------------------------------------------------------------------
  // INTENT 3: GENERAL TRAVEL / WELCOME INQUIRIES
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
    label: isTr ? '🗺️ Çoklu Ülke Rota Planlayıcı' : '🗺️ Multi-Country Route Planner',
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
      ? `Merhaba! Ben **Vizamigo AI Seyahat Danışmanınız**. ✈️\n\nSitedeki tüm **199 ülke vize şartlarına**, gün gün gezi rotalarına, priz/elektrik standartlarına, canlı döviz kurlarına ve taksi/eSIM uygulamalarına tam hakimim.\n\nBana mikrofondan konuşarak veya yazarak şu konularda soru sorabilirsiniz:\n- *"Tayland vizesi nasıl?"*\n- *"7 günlük İtalya rotası hazırla"*\n- *"Japonya priz tipi nedir?"*\n- *"En ucuz yurt dışı internetini nereden alırım?"*`
      : `Hello! I am your **Vizamigo AI Travel Concierge**. ✈️\n\nI have complete access to **199 country visa requirements**, curated multi-day itineraries, power plug types, live exchange rates, and local transit tools.\n\nYou can speak or type to ask me:\n- *"Do I need a visa for Thailand?"*\n- *"Plan a 7-day trip to Italy"*\n- *"What plug type does Japan use?"*\n- *"Where do I buy a cheap travel eSIM?"*`,
    timestamp: new Date(),
    actions
  };
}

// ============================================================================
// WEB SPEECH API CONTROLLER (VOICE INPUT & OUTPUT)
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

export function speakResponse(text: string, lang: string, onEnd?: () => void): void {
  if (!isSpeechSynthesisSupported()) return;

  try {
    window.speechSynthesis.cancel(); // Stop any pending speech

    // Clean markdown asterisks and links before reading
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
    utterance.rate = 1.05; // Pleasant conversational speed
    utterance.pitch = 1.0;

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
