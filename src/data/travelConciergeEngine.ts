/**
 * Vizamigo - Hyper-Localized Travel Concierge Engine
 * Dynamically maps and ranks travel utility & affiliate partners per country context:
 *   1. Chronological Travel Flow:
 *      - Stage 1: Flight Booking (Skyscanner via Impact network, WayAway via Travelpayouts)
 *      - Stage 2: Accommodation (Agoda prioritized in Asia; Booking.com / Expedia in Europe/Americas; Hostelworld for budget/nomad)
 *      - Stage 3: On-Arrival Transit (Kiwitaxi / GetTransfer for airport pickup + hyper-local ride-hailing leaders: Grab/Bolt in Thailand, Uber/Cabify/Bolt in Europe, Careem in MENA, GO in Japan, Kakao T in South Korea, BiTaksi in Turkey)
 *      - Stage 4: Essentials (Airalo eSIM pre-mapped to the country's network slug + Preply affiliate banner mapped to the country's spoken language)
 *   2. Restricted / Banned Brand Algorithm:
 *      - Domestic/Regional Restrictions (e.g. Booking.com in Turkey, or browsing from a restricted IP/route):
 *        Do NOT remove if it works post-arrival or via VPN/roaming. Push to 3rd priority slot (index 2) and attach the subtle tooltip:
 *        "May require a VPN or international SIM when operating inside this region."
 *      - Permanently Folded / Non-Operating Platforms (e.g. Uber in Thailand, Vietnam, Indonesia, Malaysia, Singapore, Philippines, China, Russia, etc.):
 *        Completely purge from the partner list and replace with active local leaders (e.g. Grab / Bolt in Thailand).
 */

import { GEO_DATA } from './geoData';
import { getCountryName } from './passportData';

export type ConciergeStageId = 'flights' | 'accommodation' | 'transit' | 'essentials';

export interface ConciergePartnerNode {
  id: string;
  brand: string;
  stage: ConciergeStageId;
  badgeTr: string;
  badgeEn: string;
  taglineTr: string;
  taglineEn: string;
  ctaTr: string;
  ctaEn: string;
  url: string;
  networkTag: string;
  priority: number;
  isRestrictedInRegion?: boolean;
  restrictionNoticeTr?: string;
  restrictionNoticeEn?: string;
  accentTone: 'teal' | 'coral' | 'amber' | 'slate';
}

export interface ConciergeStageGroup {
  stage: ConciergeStageId;
  stepNumber: string;
  titleTr: string;
  titleEn: string;
  subtitleTr: string;
  subtitleEn: string;
  primaryPartner: ConciergePartnerNode;
  partners: ConciergePartnerNode[];
}

export interface CountryConciergePlan {
  countryCode: string;
  countryNameEn: string;
  regionCluster: 'asia_pacific' | 'europe' | 'mena' | 'americas' | 'caucasus_central_asia' | 'africa';
  hasRegionalRestrictionAlert: boolean;
  stages: ConciergeStageGroup[];
}

// Countries in Asia-Pacific where Agoda is the indisputable #1 accommodation leader
const ASIAN_DESTINATIONS = new Set([
  'TH', 'VN', 'ID', 'MY', 'SG', 'PH', 'JP', 'KR', 'TW', 'HK', 'MO', 'CN',
  'KH', 'LA', 'MM', 'BN', 'LK', 'MV', 'IN', 'NP', 'BD', 'PK', 'MN', 'AU', 'NZ', 'FJ'
]);

// Caucasus & Central Asia cluster (Yandex Go / Bolt / Wolt dominance)
const CAUCASUS_CENTRAL_ASIA = new Set([
  'GE', 'AZ', 'AM', 'KZ', 'UZ', 'KG', 'TJ', 'TM'
]);

// Middle East & North Africa cluster (Careem / Uber / Talabat dominance)
const MENA_DESTINATIONS = new Set([
  'AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'JO', 'EG', 'MA', 'TN', 'DZ', 'LB', 'IQ', 'IL'
]);

// Americas cluster
const AMERICAS_DESTINATIONS = new Set([
  'US', 'CA', 'MX', 'BR', 'AR', 'CL', 'CO', 'PE', 'CR', 'PA', 'UY', 'EC', 'DO', 'JM', 'BS', 'CU', 'GT', 'BO', 'PY', 'VE'
]);

// Sub-Saharan Africa cluster
const AFRICA_DESTINATIONS = new Set([
  'ZA', 'KE', 'TZ', 'NG', 'GH', 'SN', 'ET', 'UG', 'RW', 'MU', 'SC', 'NA', 'BW', 'ZM', 'ZW', 'MZ', 'MG', 'CV'
]);

/**
 * Countries where Uber has permanently folded / exited operations or does not operate.
 * Rule 2: Completely hide Uber in these target destinations and replace with local market leaders.
 */
const UBER_FOLDED_OR_INACTIVE_COUNTRIES = new Set([
  // Southeast Asia (Sold operations to Grab in 2018)
  'TH', 'VN', 'ID', 'MY', 'SG', 'PH', 'KH', 'LA', 'MM', 'BN',
  // China & CIS / Eurasia where Uber exited
  'CN', 'RU', 'BY', 'KZ', 'UZ', 'KG', 'TJ', 'TM', 'AZ', 'AM', 'GE', 'MD',
  // Balkan & European markets without Uber ride-hailing
  'AL', 'BA', 'ME', 'MK', 'XK', 'RS', 'BG', 'CY', 'IS', 'LU', 'LI', 'AD', 'MC', 'SM',
  // MENA / Others without Uber
  'IR', 'SY', 'IQ', 'YE', 'LY', 'DZ', 'TN', 'CU', 'KP'
]);

/**
 * Country-specific legal/regulatory domestic restrictions map.
 * Rule 2: Do NOT remove the brand if it works post-arrival or with international SIM / VPN.
 * Push it to the 3rd priority slot (index 2) and attach the subtle VPN/international SIM tooltip.
 */
interface BrandRestrictionRule {
  brandId: string;
  restrictedInTargetCountries: Set<string>;
  restrictedWhenOriginIs?: Set<string>;
  tooltipTr: string;
  tooltipEn: string;
}

const RESTRICTED_BRAND_RULES: BrandRestrictionRule[] = [
  {
    brandId: 'booking',
    // Booking.com faces domestic Turkish court block for domestic IP bookings inside TR
    restrictedInTargetCountries: new Set(['TR']),
    restrictedWhenOriginIs: new Set(['TR']),
    tooltipTr: 'Bu bölgede kullanılırken VPN veya uluslararası SIM (eSIM) gerektirebilir.',
    tooltipEn: 'May require a VPN or international SIM when operating inside this region.'
  },
  {
    brandId: 'airbnb',
    restrictedInTargetCountries: new Set(['TR', 'SG']),
    tooltipTr: 'Bu bölgede kullanılırken VPN veya uluslararası SIM (eSIM) gerektirebilir.',
    tooltipEn: 'May require a VPN or international SIM when operating inside this region.'
  },
  {
    brandId: 'uber',
    // In Turkey, Uber only dispatches yellow/turquoise municipal taxis and has historical regulatory blocks
    restrictedInTargetCountries: new Set(['TR']),
    tooltipTr: 'Bu bölgede kullanılırken VPN veya uluslararası SIM (eSIM) gerektirebilir.',
    tooltipEn: 'May require a VPN or international SIM when operating inside this region.'
  }
];

/**
 * Maps ISO country codes to Airalo country store slugs
 */
const AIRALO_SLUG_OVERRIDES: Record<string, string> = {
  TR: 'turkey',
  TH: 'thailand',
  GR: 'greece',
  IT: 'italy',
  ES: 'spain',
  FR: 'france',
  DE: 'germany',
  GB: 'united-kingdom',
  US: 'united-states',
  JP: 'japan',
  KR: 'south-korea',
  ID: 'indonesia',
  VN: 'vietnam',
  MY: 'malaysia',
  SG: 'singapore',
  PH: 'philippines',
  AE: 'united-arab-emirates',
  EG: 'egypt',
  GE: 'georgia',
  AZ: 'azerbaijan',
  AL: 'albania',
  BA: 'bosnia-and-herzegovina',
  ME: 'montenegro',
  RS: 'serbia',
  MK: 'north-macedonia',
  XK: 'kosovo',
  HR: 'croatia',
  NL: 'netherlands',
  PT: 'portugal',
  CH: 'switzerland',
  AT: 'austria',
  CZ: 'czech-republic',
  HU: 'hungary',
  PL: 'poland',
  RO: 'romania',
  BG: 'bulgaria',
  MA: 'morocco',
  ZA: 'south-africa',
  BR: 'brazil',
  AR: 'argentina',
  MX: 'mexico',
  CO: 'colombia',
  CA: 'canada',
  AU: 'australia',
  NZ: 'new-zealand',
  CN: 'china',
  HK: 'hong-kong',
  TW: 'taiwan',
  IN: 'india',
  LK: 'sri-lanka',
  MV: 'maldives',
  KZ: 'kazakhstan',
  UZ: 'uzbekistan',
  QA: 'qatar',
  SA: 'saudi-arabia',
  JO: 'jordan'
};

/**
 * Maps ISO country codes to their primary spoken language for Preply 1-on-1 tutor links
 */
interface PreplyLanguageMapping {
  slug: string;
  langNameTr: string;
  langNameEn: string;
}

const PREPLY_LANGUAGE_MAP: Record<string, PreplyLanguageMapping> = {
  TH: { slug: 'thai', langNameTr: 'Tayca', langNameEn: 'Thai' },
  JP: { slug: 'japanese', langNameTr: 'Japonca', langNameEn: 'Japanese' },
  KR: { slug: 'korean', langNameTr: 'Korece', langNameEn: 'Korean' },
  CN: { slug: 'chinese', langNameTr: 'Çince (Mandarin)', langNameEn: 'Mandarin Chinese' },
  TW: { slug: 'chinese', langNameTr: 'Çince (Mandarin)', langNameEn: 'Mandarin Chinese' },
  HK: { slug: 'chinese', langNameTr: 'Kantonca / Çince', langNameEn: 'Cantonese / Chinese' },
  VN: { slug: 'vietnamese', langNameTr: 'Vietnamca', langNameEn: 'Vietnamese' },
  ID: { slug: 'indonesian', langNameTr: 'Endonezce', langNameEn: 'Indonesian' },
  MY: { slug: 'malay', langNameTr: 'Malayca / İngilizce', langNameEn: 'Malay / English' },
  DE: { slug: 'german', langNameTr: 'Almanca', langNameEn: 'German' },
  AT: { slug: 'german', langNameTr: 'Almanca', langNameEn: 'German' },
  CH: { slug: 'german', langNameTr: 'Almanca / Fransızca', langNameEn: 'German / French' },
  FR: { slug: 'french', langNameTr: 'Fransızca', langNameEn: 'French' },
  BE: { slug: 'french', langNameTr: 'Fransızca / Felemenkçe', langNameEn: 'French / Dutch' },
  ES: { slug: 'spanish', langNameTr: 'İspanyolca', langNameEn: 'Spanish' },
  MX: { slug: 'spanish', langNameTr: 'İspanyolca', langNameEn: 'Spanish' },
  AR: { slug: 'spanish', langNameTr: 'İspanyolca', langNameEn: 'Spanish' },
  CO: { slug: 'spanish', langNameTr: 'İspanyolca', langNameEn: 'Spanish' },
  CL: { slug: 'spanish', langNameTr: 'İspanyolca', langNameEn: 'Spanish' },
  PE: { slug: 'spanish', langNameTr: 'İspanyolca', langNameEn: 'Spanish' },
  IT: { slug: 'italian', langNameTr: 'İtalyanca', langNameEn: 'Italian' },
  PT: { slug: 'portuguese', langNameTr: 'Portekizce', langNameEn: 'Portuguese' },
  BR: { slug: 'portuguese', langNameTr: 'Portekizce', langNameEn: 'Portuguese' },
  GR: { slug: 'greek', langNameTr: 'Yunanca', langNameEn: 'Greek' },
  CY: { slug: 'greek', langNameTr: 'Yunanca', langNameEn: 'Greek' },
  RU: { slug: 'russian', langNameTr: 'Rusça', langNameEn: 'Russian' },
  KZ: { slug: 'russian', langNameTr: 'Rusça / Kazakça', langNameEn: 'Russian / Kazakh' },
  UZ: { slug: 'russian', langNameTr: 'Özbekçe / Rusça', langNameEn: 'Uzbek / Russian' },
  GE: { slug: 'georgian', langNameTr: 'Gürcüce / Rusça', langNameEn: 'Georgian' },
  AZ: { slug: 'turkish', langNameTr: 'Azerbaycan Türkçesi', langNameEn: 'Azerbaijani' },
  TR: { slug: 'turkish', langNameTr: 'Türkçe', langNameEn: 'Turkish' },
  AE: { slug: 'arabic', langNameTr: 'Arapça / İngilizce', langNameEn: 'Arabic' },
  SA: { slug: 'arabic', langNameTr: 'Arapça', langNameEn: 'Arabic' },
  EG: { slug: 'arabic', langNameTr: 'Arapça', langNameEn: 'Arabic' },
  MA: { slug: 'arabic', langNameTr: 'Arapça / Fransızca', langNameEn: 'Arabic / French' },
  QA: { slug: 'arabic', langNameTr: 'Arapça', langNameEn: 'Arabic' },
  JO: { slug: 'arabic', langNameTr: 'Arapça', langNameEn: 'Arabic' },
  NL: { slug: 'dutch', langNameTr: 'Felemenkçe', langNameEn: 'Dutch' },
  PL: { slug: 'polish', langNameTr: 'Lehçe', langNameEn: 'Polish' },
  CZ: { slug: 'czech', langNameTr: 'Çekçe', langNameEn: 'Czech' },
  HU: { slug: 'hungarian', langNameTr: 'Macarca', langNameEn: 'Hungarian' },
  RO: { slug: 'romanian', langNameTr: 'Rumence', langNameEn: 'Romanian' },
  BG: { slug: 'bulgarian', langNameTr: 'Bulgarca', langNameEn: 'Bulgarian' },
  RS: { slug: 'serbian', langNameTr: 'Sırpça', langNameEn: 'Serbian' },
  BA: { slug: 'serbian', langNameTr: 'Boşnakça', langNameEn: 'Bosnian' },
  ME: { slug: 'serbian', langNameTr: 'Karadağca', langNameEn: 'Montenegrin' },
  HR: { slug: 'croatian', langNameTr: 'Hırvatça', langNameEn: 'Croatian' },
  AL: { slug: 'albanian', langNameTr: 'Arnavutça', langNameEn: 'Albanian' },
  XK: { slug: 'albanian', langNameTr: 'Arnavutça', langNameEn: 'Albanian' },
  SE: { slug: 'swedish', langNameTr: 'İsveççe', langNameEn: 'Swedish' },
  NO: { slug: 'norwegian', langNameTr: 'Norveççe', langNameEn: 'Norwegian' },
  DK: { slug: 'danish', langNameTr: 'Danca', langNameEn: 'Danish' },
  FI: { slug: 'finnish', langNameTr: 'Fince', langNameEn: 'Finnish' },
  UA: { slug: 'ukrainian', langNameTr: 'Ukraynaca', langNameEn: 'Ukrainian' },
  IL: { slug: 'hebrew', langNameTr: 'İbranice', langNameEn: 'Hebrew' },
  IN: { slug: 'hindi', langNameTr: 'Hintçe / İngilizce', langNameEn: 'Hindi / English' }
};

function getRegionCluster(code: string): CountryConciergePlan['regionCluster'] {
  const c = code.toUpperCase();
  if (ASIAN_DESTINATIONS.has(c)) return 'asia_pacific';
  if (CAUCASUS_CENTRAL_ASIA.has(c)) return 'caucasus_central_asia';
  if (MENA_DESTINATIONS.has(c)) return 'mena';
  if (AMERICAS_DESTINATIONS.has(c)) return 'americas';
  if (AFRICA_DESTINATIONS.has(c)) return 'africa';
  return 'europe';
}

function getAiraloCountrySlug(code: string, countryNameEn: string): string {
  const c = code.toUpperCase();
  if (AIRALO_SLUG_OVERRIDES[c]) return AIRALO_SLUG_OVERRIDES[c];
  return countryNameEn
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Applies the Restricted/Banned Brand Algorithm (Rule 2):
 * 1. Permanently folded platforms (e.g. Uber in Thailand) are stripped out before or during assembly.
 * 2. Regionally restricted brands (e.g. Booking.com in Turkey or when browsing from a restricted IP/passport)
 *    are NEVER deleted if they work post-arrival; instead they are moved to the 3rd priority slot (index 2)
 *    with the required VPN / international SIM tooltip.
 */
function applyRestrictedBrandAlgorithm(
  nodes: ConciergePartnerNode[],
  targetCountryCode: string,
  originPassportCode: string
): ConciergePartnerNode[] {
  const target = targetCountryCode.toUpperCase();
  const origin = originPassportCode.toUpperCase();

  // Step 1: Filter out permanently folded platforms in the target destination
  const activeNodes = nodes.filter((node) => {
    if (node.id === 'uber' && UBER_FOLDED_OR_INACTIVE_COUNTRIES.has(target)) {
      return false;
    }
    return true;
  });

  // Step 2: Check for regional/domestic legal restrictions (e.g., Booking.com in TR)
  const annotatedNodes = activeNodes.map((node) => {
    const rule = RESTRICTED_BRAND_RULES.find((r) => r.brandId === node.id);
    if (!rule) return node;

    const isRestrictedByTarget = rule.restrictedInTargetCountries.has(target);
    const isRestrictedByOrigin =
      Boolean(rule.restrictedWhenOriginIs?.has(origin)) && target === 'TR';

    if (isRestrictedByTarget || isRestrictedByOrigin) {
      return {
        ...node,
        isRestrictedInRegion: true,
        restrictionNoticeTr: rule.tooltipTr,
        restrictionNoticeEn: rule.tooltipEn
      };
    }
    return node;
  });

  // Step 3: Sort unrestricted nodes by priority first, and push any restricted brand to the 3rd priority slot (index 2)
  const unrestricted = annotatedNodes
    .filter((n) => !n.isRestrictedInRegion)
    .sort((a, b) => a.priority - b.priority);
  const restricted = annotatedNodes
    .filter((n) => n.isRestrictedInRegion)
    .sort((a, b) => a.priority - b.priority);

  if (restricted.length === 0) {
    return unrestricted;
  }

  const finalOrder: ConciergePartnerNode[] = [...unrestricted];
  for (const rNode of restricted) {
    // Push restricted brand to 3rd priority slot (index 2) if at least 2 unrestricted alternatives exist
    const insertIndex = Math.min(2, finalOrder.length);
    finalOrder.splice(insertIndex, 0, {
      ...rNode,
      priority: insertIndex + 1
    });
  }

  return finalOrder;
}

/**
 * Generates the Hyper-Localized Travel Concierge Plan for a given destination country and user passport/origin.
 */
export function getCountryConciergePlan(
  countryCode: string,
  originPassport: string = 'TR'
): CountryConciergePlan {
  const code = countryCode.toUpperCase();
  const origin = originPassport.toUpperCase();
  const countryNameEn = getCountryName(code, 'en');
  const countryNameTr = getCountryName(code, 'tr');
  const geo = GEO_DATA[code];
  const mainHub = (geo?.mainHub || code).split('/')[0];
  const capitalEn = geo?.capital || countryNameEn;
  const regionCluster = getRegionCluster(code);

  // ============================================================================
  // STAGE 1: FLIGHT, RAIL & FERRY BOOKING (WayAway, Aviasales, Trip.com & Omio)
  // ============================================================================
  const flightPartnersRaw: ConciergePartnerNode[] = [
    {
      id: 'wayaway',
      brand: 'WayAway & Aviasales',
      stage: 'flights',
      badgeTr: '%5 Nakit İadeli Uçuş',
      badgeEn: '5% Cashback Flights',
      taglineTr: `${mainHub} Havalimanı En Ucuz Ay Boyu Uçuş Radarı & Cashback`,
      taglineEn: `Cheapest Month Radar & Cashback to ${mainHub} (${capitalEn})`,
      ctaTr: `${countryNameTr} Uçuşlarını Tara`,
      ctaEn: `Search ${countryNameEn} Flights`,
      url: `https://wayaway.io/flights?destination=${encodeURIComponent(mainHub)}&utm_source=vizamigo&utm_medium=travelpayouts&utm_campaign=concierge_${code.toLowerCase()}`,
      networkTag: 'Travelpayouts',
      priority: 1,
      accentTone: 'teal'
    },
    {
      id: 'tripcom',
      brand: 'Trip.com (Uçuş & Hızlı Tren)',
      stage: 'flights',
      badgeTr: 'Uçak + Tren + Otel İndirimi',
      badgeEn: 'Flight + Rail + Hotel Deals',
      taglineTr: `${mainHub} direkt uçuşlar, hızlı tren biletleri ve VIP lounge ödülleri`,
      taglineEn: `Direct flights, high-speed rail tickets & VIP lounge perks to ${mainHub}`,
      ctaTr: 'Trip.com Fiyatlarını Gör',
      ctaEn: 'Check Trip.com Deals',
      url: `https://www.trip.com/flights/?utm_source=vizamigo&utm_campaign=concierge_${code.toLowerCase()}`,
      networkTag: 'Trip.com Partner',
      priority: 2,
      accentTone: 'slate'
    },
    {
      id: 'omio_ferry',
      brand: 'Omio & Ferryhopper (Tren/Feribot)',
      stage: 'flights',
      badgeTr: 'Tren, Feribot & Otobüs',
      badgeEn: 'Rail, Ferry & Coach',
      taglineTr: `${countryNameTr} içi ve komşu ülkelerden hızlı tren, ada feribotu ve otobüs biletleri`,
      taglineEn: `High-speed trains, island ferries & intercity buses across ${countryNameEn}`,
      ctaTr: 'Tren & Feribot Biletleri',
      ctaEn: 'Search Rail & Ferries',
      url: `https://www.omio.com/?utm_source=vizamigo`,
      networkTag: 'Omio Rail & Ferry',
      priority: 3,
      accentTone: 'coral'
    }
  ];

  const flightPartners = applyRestrictedBrandAlgorithm(flightPartnersRaw, code, origin);

  // ============================================================================
  // STAGE 2: ACCOMMODATION (Agoda for Asia, Booking/Expedia for Europe, Hostelworld for budget)
  // ============================================================================
  const isAsia = regionCluster === 'asia_pacific';

  const accommodationPartnersRaw: ConciergePartnerNode[] = [
    {
      id: 'agoda',
      brand: 'Agoda',
      stage: 'accommodation',
      badgeTr: isAsia ? 'Asya #1 Lideri' : 'Asya & Global İndirim',
      badgeEn: isAsia ? '#1 Asia Market Leader' : 'Global Secret Deals',
      taglineTr: isAsia
        ? `${countryNameTr} genelinde yerel otel ve rezidanslarda en derin indirim`
        : `${capitalEn} otellerinde mobil özel fiyatlar`,
      taglineEn: isAsia
        ? `Deepest local hotel & resort inventory across ${countryNameEn}`
        : `Exclusive mobile rates in ${capitalEn}`,
      ctaTr: 'Agoda’da Otelleri Gör',
      ctaEn: 'Explore on Agoda',
      url: `https://www.agoda.com/search?text=${encodeURIComponent(countryNameEn)}&cid=vizamigo_${code.toLowerCase()}`,
      networkTag: 'Agoda Partners',
      priority: isAsia ? 1 : 3,
      accentTone: isAsia ? 'teal' : 'slate'
    },
    {
      id: 'booking',
      brand: 'Booking.com',
      stage: 'accommodation',
      badgeTr: isAsia ? 'Esnek İptal' : 'Avrupa & Global #1',
      badgeEn: isAsia ? 'Free Cancellation' : '#1 Europe & Global Leader',
      taglineTr: `${capitalEn} ve turistik bölgelerde ücretsiz iptalli konaklama`,
      taglineEn: `Verified stays with free cancellation in ${capitalEn}`,
      ctaTr: 'Booking.com’da İncele',
      ctaEn: 'Book on Booking.com',
      url: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(countryNameEn)}&aid=vizamigo_${code.toLowerCase()}`,
      networkTag: 'Booking Affiliate',
      priority: isAsia ? 2 : 1,
      accentTone: isAsia ? 'slate' : 'teal'
    },
    {
      id: 'expedia',
      brand: 'Expedia',
      stage: 'accommodation',
      badgeTr: 'Uçak + Otel Paketi',
      badgeEn: 'Bundle & Save',
      taglineTr: `${countryNameTr} butik otelleri ve üye indirimleri`,
      taglineEn: `Member-only hotel discounts across ${countryNameEn}`,
      ctaTr: 'Expedia Fırsatları',
      ctaEn: 'View Expedia Stays',
      url: `https://www.expedia.com/Hotel-Search?destination=${encodeURIComponent(countryNameEn)}&affcid=vizamigo_${code.toLowerCase()}`,
      networkTag: 'Expedia Group',
      priority: isAsia ? 4 : 2,
      accentTone: 'slate'
    },
    {
      id: 'hostelworld',
      brand: 'Hostelworld',
      stage: 'accommodation',
      badgeTr: 'Bütçe & Dijital Göçebe',
      badgeEn: 'Budget & Nomad Social',
      taglineTr: `${capitalEn} sosyal hostelleri ve ortak çalışma alanlı konaklama`,
      taglineEn: `Top-rated social hostels & coworking stays in ${capitalEn}`,
      ctaTr: 'Hostelworld’de Keşfet',
      ctaEn: 'Find Hostels',
      url: `https://www.hostelworld.com/st/hostels/${encodeURIComponent(countryNameEn.toLowerCase().replace(/\s+/g, '-'))}/?affiliate=vizamigo`,
      networkTag: 'Hostelworld Partner',
      priority: isAsia ? 3 : 4,
      accentTone: 'coral'
    }
  ];

  // If target is Turkey (TR), Booking.com is domestically restricted -> pushed to 3rd priority slot automatically
  const accommodationPartners = applyRestrictedBrandAlgorithm(accommodationPartnersRaw, code, origin);

  // ============================================================================
  // STAGE 3: ON-ARRIVAL TRANSIT (Kiwitaxi/GetTransfer + Hyper-Local Ride-Hailing)
  // ============================================================================
  const transitPartnersRaw: ConciergePartnerNode[] = [
    {
      id: 'kiwitaxi',
      brand: 'Kiwitaxi',
      stage: 'transit',
      badgeTr: `${mainHub} Havalimanı Karşılama`,
      badgeEn: `${mainHub} Airport Pickup`,
      taglineTr: `${mainHub} çıkışında isminizle karşılama ve sabit fiyatlı transfer`,
      taglineEn: `Fixed-price meet & greet transfer from ${mainHub} Airport`,
      ctaTr: 'Havalimanı Transferi Ayarla',
      ctaEn: 'Book Airport Pickup',
      url: `https://kiwitaxi.com/search?from=${encodeURIComponent(mainHub + ' Airport')}&to=${encodeURIComponent(capitalEn)}&utm_source=vizamigo`,
      networkTag: 'Travelpayouts Transit',
      priority: 2,
      accentTone: 'slate'
    },
    {
      id: 'gettransfer',
      brand: 'GetTransfer',
      stage: 'transit',
      badgeTr: 'VIP & Şehirlerarası Teklif',
      badgeEn: 'Bidded Private Transfers',
      taglineTr: `${countryNameTr} içi özel şoförlü transferlerde sürücü tekliflerini seçin`,
      taglineEn: `Compare local driver bids for airport & intercity rides`,
      ctaTr: 'Transfer Tekliflerini Gör',
      ctaEn: 'Get Transfer Bids',
      url: `https://gettransfer.com/en?from=${encodeURIComponent(mainHub)}&utm_source=vizamigo`,
      networkTag: 'GetTransfer Partner',
      priority: 4,
      accentTone: 'slate'
    }
  ];

  // Inject Hyper-Local Ride-Hailing Leaders per country/region
  if (['TH', 'VN', 'MY', 'SG', 'PH', 'KH', 'LA', 'MM'].includes(code)) {
    // Southeast Asia: Grab (#1) + Bolt (#2 in Thailand)
    transitPartnersRaw.push({
      id: 'grab',
      brand: 'Grab',
      stage: 'transit',
      badgeTr: 'Bölge #1 Süper Uygulaması',
      badgeEn: '#1 SEA Ride Superapp',
      taglineTr: `${countryNameTr} içinde Uber yerine kullanılan resmi sabit fiyatlı taksi & ulaşım`,
      taglineEn: `Replaces Uber in ${countryNameEn}: upfront fares & cashless rides`,
      ctaTr: 'Grab ile Araç Çağır',
      ctaEn: 'Open Grab Ride',
      url: 'https://www.grab.com/global/transport/',
      networkTag: 'Local Market Leader',
      priority: 1,
      accentTone: 'teal'
    });
    if (code === 'TH') {
      transitPartnersRaw.push({
        id: 'bolt',
        brand: 'Bolt Thailand',
        stage: 'transit',
        badgeTr: 'Bangkok & Phuket Favorisi',
        badgeEn: 'Top Value in Thailand',
        taglineTr: 'Bangkok, Phuket ve Chiang Mai’de Grab’e göre %20 daha ekonomik alternatif',
        taglineEn: 'Up to 20% cheaper rides in Bangkok, Phuket & Pattaya',
        ctaTr: 'Bolt’u İndir / Aç',
        ctaEn: 'Open Bolt App',
        url: 'https://bolt.eu/en/cities/',
        networkTag: 'Local Market Leader',
        priority: 3,
        accentTone: 'coral'
      });
    }
  } else if (code === 'ID') {
    // Indonesia: Gojek + Grab
    transitPartnersRaw.push(
      {
        id: 'gojek',
        brand: 'Gojek',
        stage: 'transit',
        badgeTr: 'Endonezya & Bali #1',
        badgeEn: '#1 Indonesia & Bali App',
        taglineTr: 'Bali ve Cakarta’da motosiklet/araç taksi ve yemek için vazgeçilmez uygulama',
        taglineEn: 'Essential motorbike & car taxi superapp across Bali & Jakarta',
        ctaTr: 'Gojek’i Aç',
        ctaEn: 'Launch Gojek',
        url: 'https://www.gojek.com/',
        networkTag: 'Local Market Leader',
        priority: 1,
        accentTone: 'teal'
      },
      {
        id: 'grab',
        brand: 'Grab Indonesia',
        stage: 'transit',
        badgeTr: 'Havalimanı Resmi Çıkış',
        badgeEn: 'Official Airport Lounge',
        taglineTr: 'Denpasar (DPS) ve Cakarta havalimanlarında özel Grab kalkış noktaları',
        taglineEn: 'Dedicated airport pickup zones in Bali & Jakarta',
        ctaTr: 'Grab’i Aç',
        ctaEn: 'Open Grab',
        url: 'https://www.grab.com/id/en/',
        networkTag: 'Local Market Leader',
        priority: 3,
        accentTone: 'slate'
      }
    );
  } else if (code === 'JP') {
    // Japan: GO Taxi + Uber
    transitPartnersRaw.push(
      {
        id: 'go_japan',
        brand: 'GO Taxi Japan',
        stage: 'transit',
        badgeTr: 'Japonya #1 Resmi Taksi',
        badgeEn: '#1 Licensed Japan Taxi',
        taglineTr: 'Tokyo, Kyoto ve Osaka’da en geniş lisanslı taksi ağı',
        taglineEn: 'Largest licensed taxi dispatch network across Japan',
        ctaTr: 'GO Taxi’yi Aç',
        ctaEn: 'Open GO Taxi',
        url: 'https://go.goinc.jp/lp/inbound',
        networkTag: 'Local Market Leader',
        priority: 1,
        accentTone: 'teal'
      },
      {
        id: 'uber',
        brand: 'Uber Japan',
        stage: 'transit',
        badgeTr: 'Uluslararası Hesap',
        badgeEn: 'Global Account Sync',
        taglineTr: 'Tokyo ve Kyoto’da resmi taksileri mevcut Uber hesabınızla çağırın',
        taglineEn: 'Hail licensed Japanese taxis with your existing Uber app',
        ctaTr: 'Uber’i Aç',
        ctaEn: 'Open Uber',
        url: 'https://www.uber.com/jp/en/ride/',
        networkTag: 'Global Ride Partner',
        priority: 3,
        accentTone: 'slate'
      }
    );
  } else if (code === 'KR') {
    // South Korea: Kakao T
    transitPartnersRaw.push({
      id: 'kakao_t',
      brand: 'Kakao T',
      stage: 'transit',
      badgeTr: 'Güney Kore #1 Taksi',
      badgeEn: '#1 Korea Mobility App',
      taglineTr: 'Seul ve Busan’da yabancı kredi kartı destekli resmi taksi uygulaması',
      taglineEn: 'Essential South Korea taxi app with foreign card support',
      ctaTr: 'Kakao T’yi İncele',
      ctaEn: 'Open Kakao T',
      url: 'https://www.kakaomobility.com/',
      networkTag: 'Local Market Leader',
      priority: 1,
      accentTone: 'teal'
    });
  } else if (CAUCASUS_CENTRAL_ASIA.has(code)) {
    // Georgia, Azerbaijan, Kazakhstan, Uzbekistan: Bolt + Yandex Go
    transitPartnersRaw.push(
      {
        id: 'bolt',
        brand: 'Bolt',
        stage: 'transit',
        badgeTr: `${countryNameTr} #1 Favori`,
        badgeEn: `#1 Rated in ${countryNameEn}`,
        taglineTr: `${capitalEn} genelinde en hızlı araç bulma ve sabit kartlı ödeme`,
        taglineEn: `Fastest dispatch and fixed card fares across ${capitalEn}`,
        ctaTr: 'Bolt ile Araç Çağır',
        ctaEn: 'Ride with Bolt',
        url: 'https://bolt.eu/',
        networkTag: 'Local Market Leader',
        priority: 1,
        accentTone: 'teal'
      },
      {
        id: 'yandex_go',
        brand: 'Yandex Go',
        stage: 'transit',
        badgeTr: 'En Geniş Araç Filosu',
        badgeEn: 'Largest Local Fleet',
        taglineTr: 'Kafkaslar ve Orta Asya’da en düşük bekleme süreli taksi ağı',
        taglineEn: 'Lowest wait times and budget fares across the region',
        ctaTr: 'Yandex Go’yu Aç',
        ctaEn: 'Open Yandex Go',
        url: 'https://go.yandex.com/',
        networkTag: 'Regional Leader',
        priority: 3,
        accentTone: 'slate'
      }
    );
  } else if (MENA_DESTINATIONS.has(code)) {
    // MENA: Careem + Uber
    transitPartnersRaw.push(
      {
        id: 'careem',
        brand: 'Careem',
        stage: 'transit',
        badgeTr: 'Orta Doğu #1 Resmi Taksi',
        badgeEn: '#1 Middle East Superapp',
        taglineTr: `${capitalEn} resmi taksileri ve özel araçlar için sabit fiyat garantisi`,
        taglineEn: `Official Hala taxi & private car dispatch in ${capitalEn}`,
        ctaTr: 'Careem’i Aç',
        ctaEn: 'Open Careem',
        url: 'https://www.careem.com/',
        networkTag: 'Local Market Leader',
        priority: 1,
        accentTone: 'teal'
      },
      {
        id: 'uber',
        brand: 'Uber',
        stage: 'transit',
        badgeTr: 'Global Standart',
        badgeEn: 'Global Ride Standard',
        taglineTr: `${capitalEn} genelinde uluslararası Uber hesabınızla kesintisiz ulaşım`,
        taglineEn: `Seamless airport and city rides with your Uber account`,
        ctaTr: 'Uber’i Aç',
        ctaEn: 'Open Uber',
        url: 'https://www.uber.com/',
        networkTag: 'Global Ride Partner',
        priority: 3,
        accentTone: 'slate'
      }
    );
  } else if (code === 'TR') {
    // Turkey: BiTaksi (#1) + Kiwitaxi (#2) + Uber (Restricted / 3rd slot)
    transitPartnersRaw.push(
      {
        id: 'bitaksi',
        brand: 'BiTaksi',
        stage: 'transit',
        badgeTr: 'Türkiye #1 Resmi Taksi',
        badgeEn: '#1 Turkey Official Taxi',
        taglineTr: 'İstanbul, Ankara ve Antalya’da resmi sarı/turkuaz taksi çağırma',
        taglineEn: 'Official metered yellow & turquoise taxis with card payment',
        ctaTr: 'BiTaksi’yi Aç',
        ctaEn: 'Open BiTaksi',
        url: 'https://www.bitaksi.com/',
        networkTag: 'Local Market Leader',
        priority: 1,
        accentTone: 'teal'
      },
      {
        id: 'uber',
        brand: 'Uber Türkiye',
        stage: 'transit',
        badgeTr: 'Sarı & Siyah Taksi Ağı',
        badgeEn: 'Licensed Taxi Dispatch',
        taglineTr: 'Uluslararası Uber uygulamasıyla İstanbul ve Antalya’da taksi çağırın',
        taglineEn: 'Hail licensed municipal taxis via your global Uber app',
        ctaTr: 'Uber’i Aç',
        ctaEn: 'Open Uber',
        url: 'https://www.uber.com/tr/en/ride/',
        networkTag: 'Global Ride Partner',
        priority: 3,
        accentTone: 'slate'
      }
    );
  } else if (['ES', 'PT', 'AR', 'CL', 'CO', 'PE', 'UY', 'MX'].includes(code)) {
    // Iberia & LatAm: Cabify + Uber + Bolt
    transitPartnersRaw.push(
      {
        id: 'uber',
        brand: 'Uber',
        stage: 'transit',
        badgeTr: 'Avrupa & LatAm Lideri',
        badgeEn: 'Primary Ride Network',
        taglineTr: `${capitalEn} havalimanı ve şehir içinde anında sabit fiyatlı araç`,
        taglineEn: `Instant upfront-fare rides across ${capitalEn}`,
        ctaTr: 'Uber ile Çağır',
        ctaEn: 'Ride with Uber',
        url: 'https://www.uber.com/',
        networkTag: 'Global Ride Partner',
        priority: 1,
        accentTone: 'teal'
      },
      {
        id: 'cabify',
        brand: 'Cabify',
        stage: 'transit',
        badgeTr: 'İspanya & LatAm Yerel Lider',
        badgeEn: 'Iberia & LatAm Leader',
        taglineTr: `${countryNameTr} genelinde lisanslı yerel sürücüler ve sabit tarife`,
        taglineEn: `Top local ride-hailing leader across ${countryNameEn}`,
        ctaTr: 'Cabify’ı Aç',
        ctaEn: 'Open Cabify',
        url: 'https://cabify.com/',
        networkTag: 'Local Market Leader',
        priority: 3,
        accentTone: 'coral'
      }
    );
  } else {
    // Rest of Europe, Americas, Africa: Uber (if operating) + Bolt / FREENOW
    transitPartnersRaw.push(
      {
        id: 'uber',
        brand: 'Uber',
        stage: 'transit',
        badgeTr: 'Uluslararası Araç Ağı',
        badgeEn: 'Global Ride Standard',
        taglineTr: `${capitalEn} genelinde mevcut Uber hesabınızla sabit fiyatlı ulaşım`,
        taglineEn: `Direct cashless rides across ${capitalEn}`,
        ctaTr: 'Uber’i Aç',
        ctaEn: 'Open Uber',
        url: 'https://www.uber.com/',
        networkTag: 'Global Ride Partner',
        priority: 1,
        accentTone: 'teal'
      },
      {
        id: 'bolt',
        brand: 'Bolt',
        stage: 'transit',
        badgeTr: 'Avrupa Hızlı Taksi',
        badgeEn: 'Fast European Dispatch',
        taglineTr: `${countryNameTr} şehirlerinde hızlı araç bulma ve ekonomik tarife`,
        taglineEn: `Fast driver dispatch and competitive fares in ${countryNameEn}`,
        ctaTr: 'Bolt’u Aç',
        ctaEn: 'Open Bolt',
        url: 'https://bolt.eu/',
        networkTag: 'Regional Leader',
        priority: 2,
        accentTone: 'coral'
      }
    );
  }

  // Apply Restricted/Banned Brand Algorithm (automatically strips Uber if in UBER_FOLDED_OR_INACTIVE_COUNTRIES)
  const transitPartners = applyRestrictedBrandAlgorithm(transitPartnersRaw, code, origin);

  // ============================================================================
  // STAGE 4: ESSENTIALS (Airalo eSIM pre-mapped to country + Preply Language Tutor)
  // ============================================================================
  const airaloSlug = getAiraloCountrySlug(code, countryNameEn);
  const preplyLang = PREPLY_LANGUAGE_MAP[code] || {
    slug: 'english',
    langNameTr: 'Seyahat İngilizcesi',
    langNameEn: 'Travel English'
  };

  const essentialsPartnersRaw: ConciergePartnerNode[] = [
    {
      id: 'airalo',
      brand: `Airalo ${countryNameEn} eSIM`,
      stage: 'essentials',
      badgeTr: 'Anında 5G/LTE eSIM',
      badgeEn: 'Instant 5G/LTE eSIM',
      taglineTr: `${countryNameTr} yerel operatör ağına havalimanına inmeden QR kodla bağlanın`,
      taglineEn: `Pre-mapped to ${countryNameEn} local carrier networks—activate before takeoff`,
      ctaTr: `${countryNameTr} eSIM Paketini Al`,
      ctaEn: `Get ${countryNameEn} eSIM`,
      url: `https://www.airalo.com/${airaloSlug}-esim?utm_source=vizamigo&utm_medium=affiliate&utm_campaign=esim_${code.toLowerCase()}`,
      networkTag: 'Airalo Partner',
      priority: 1,
      accentTone: 'teal'
    },
    {
      id: 'preply',
      brand: `Preply · ${preplyLang.langNameEn}`,
      stage: 'essentials',
      badgeTr: `1’e 1 ${preplyLang.langNameTr} Pratiği`,
      badgeEn: `1-on-1 ${preplyLang.langNameEn} Tutors`,
      taglineTr: `Seyahat öncesi ana dili ${preplyLang.langNameTr} olan eğitmenlerle konuşma pratiği`,
      taglineEn: `Practice real-world ${preplyLang.langNameEn} conversation with native tutors`,
      ctaTr: `${preplyLang.langNameTr} Eğitmenlerini Gör`,
      ctaEn: `Practice ${preplyLang.langNameEn} on Preply`,
      url: `https://preply.com/en/online/${preplyLang.slug}-tutors?utm_source=vizamigo&utm_medium=affiliate&utm_campaign=lang_${code.toLowerCase()}`,
      networkTag: 'Preply Affiliate',
      priority: 2,
      accentTone: 'coral'
    }
  ];

  const essentialsPartners = applyRestrictedBrandAlgorithm(essentialsPartnersRaw, code, origin);

  const stages: ConciergeStageGroup[] = [
    {
      stage: 'flights',
      stepNumber: '01',
      titleTr: 'Uçuş & Rota Biletleme',
      titleEn: 'Flight Booking',
      subtitleTr: `${mainHub} Havalimanı doğrudan ve esnek tarihli uçuşlar`,
      subtitleEn: `Direct & flexible-date airfare to ${mainHub}`,
      primaryPartner: flightPartners[0],
      partners: flightPartners
    },
    {
      stage: 'accommodation',
      stepNumber: '02',
      titleTr: 'Konaklama & Otel Liderleri',
      titleEn: 'Accommodation Leaders',
      subtitleTr: isAsia
        ? 'Asya pazar lideri Agoda öncelikli konaklama ağı'
        : 'Bölgesel pazar lideri otel ve göçebe konaklamaları',
      subtitleEn: isAsia
        ? 'Prioritized for Asia: Agoda + verified stays'
        : 'Regional market leaders & budget nomad hostels',
      primaryPartner: accommodationPartners[0],
      partners: accommodationPartners
    },
    {
      stage: 'transit',
      stepNumber: '03',
      titleTr: 'Varış Transferi & Yerel Taksi',
      titleEn: 'On-Arrival Transit',
      subtitleTr: `${mainHub} karşılama ve ülkede aktif çalışan araç uygulamaları`,
      subtitleEn: `Airport pickup & active local ride-hailing leaders`,
      primaryPartner: transitPartners[0],
      partners: transitPartners
    },
    {
      stage: 'essentials',
      stepNumber: '04',
      titleTr: 'Dijital Hat (eSIM) & Dil Pratiği',
      titleEn: 'Connectivity & Language',
      subtitleTr: `${countryNameTr} eSIM paketi ve yerel dil konuşma pratiği`,
      subtitleEn: `Pre-mapped ${countryNameEn} eSIM & native language practice`,
      primaryPartner: essentialsPartners[0],
      partners: essentialsPartners
    }
  ];

  const hasRegionalRestrictionAlert = stages.some((s) =>
    s.partners.some((p) => p.isRestrictedInRegion)
  );

  return {
    countryCode: code,
    countryNameEn,
    regionCluster,
    hasRegionalRestrictionAlert,
    stages
  };
}
