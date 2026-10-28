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
import { TP, tpLinks, type TpId } from './tpPartners';

export type ConciergeStageId = 'flights' | 'accommodation' | 'transit' | 'activities' | 'essentials';

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

  const isAsia = regionCluster === 'asia_pacific';
  const isEurope = regionCluster === 'europe';
  const homeHub = (GEO_DATA[origin]?.mainHub || '').split('/')[0];
    const node = (
    id: TpId,
    stage: ConciergeStageId,
    priority: number,
    url: string,
    t: { bTr: string; bEn: string; tTr: string; tEn: string; cTr: string; cEn: string },
    brand?: string,
    accentTone: ConciergePartnerNode['accentTone'] = 'teal'
  ): ConciergePartnerNode => ({
    id,
    brand: brand || TP[id].name,
    stage,
    badgeTr: t.bTr,
    badgeEn: t.bEn,
    taglineTr: t.tTr,
    taglineEn: t.tEn,
    ctaTr: t.cTr,
    ctaEn: t.cEn,
    url,
    networkTag: 'Travelpayouts',
    priority,
    accentTone
  });

  // ============================================================================
  // 1. UÇUŞ, TREN, OTOBÜS (Aviasales, Trip.com, Kiwi.com, Omio / 12Go)
  // ============================================================================
  const groundId: TpId = isAsia ? 'twelvego' : 'omio';
  const flightPartnersRaw: ConciergePartnerNode[] = [
    node('aviasales', 'flights', 1, tpLinks.flights(homeHub, mainHub), {
      bTr: 'En ucuz uçuş', bEn: 'Cheapest flights',
      tTr: `${homeHub ? homeHub + ' → ' : ''}${mainHub} uçuşlarını yüzlerce havayolu arasında karşılaştır`,
      tEn: `Compare ${homeHub ? homeHub + ' → ' : ''}${mainHub} fares across hundreds of airlines`,
      cTr: `${countryNameTr} uçuşlarını ara`, cEn: `Search ${countryNameEn} flights`
    }),
    node('tripcom', 'flights', 2, tpLinks.tripFlights(), {
      bTr: 'Uçak + otel', bEn: 'Flight + hotel',
      tTr: `${mainHub} uçuşları, paket indirimleri ve esnek bilet seçenekleri`,
      tEn: `Flights to ${mainHub}, bundle deals and flexible tickets`,
      cTr: 'Trip.com fiyatlarını gör', cEn: 'Check Trip.com deals'
    }, undefined, 'slate'),
    node('kiwi', 'flights', 3, tpLinks.kiwi(), {
      bTr: 'Akıllı aktarma', bEn: 'Smart layovers',
      tTr: 'Farklı havayollarını birleştirip daha ucuz aktarmalı rotalar bulur',
      tEn: 'Combines different airlines into cheaper multi-carrier routes',
      cTr: 'Kiwi.com’da ara', cEn: 'Search on Kiwi.com'
    }, undefined, 'amber'),
    node(groundId, 'flights', 4, groundId === 'twelvego' ? 'https://12go.asia/en' : 'https://www.omio.com/', {
      bTr: 'Tren, otobüs, feribot', bEn: 'Rail, bus & ferry',
      tTr: `${countryNameTr} içinde ve komşu ülkelere tren, otobüs ve feribot biletleri`,
      tEn: `Trains, buses and ferries within and around ${countryNameEn}`,
      cTr: 'Kara yolu biletleri', cEn: 'Ground transport tickets'
    }, undefined, 'coral')
  ];
  const flightPartners = applyRestrictedBrandAlgorithm(flightPartnersRaw, code, origin);

  // ============================================================================
  // 2. KONAKLAMA (Asya'da Agoda önde; diğer yerlerde Booking.com)
  // ============================================================================
  const accommodationPartnersRaw: ConciergePartnerNode[] = [
    node('booking', 'accommodation', isAsia ? 2 : 1, tpLinks.booking(`${capitalEn}, ${countryNameEn}`), {
      bTr: 'Ücretsiz iptal', bEn: 'Free cancellation',
      tTr: `${capitalEn} otelleri; vize başvurusunda konaklama kanıtı olarak da işe yarar`,
      tEn: `Hotels in ${capitalEn}; also handy as proof of stay for visa applications`,
      cTr: 'Otel ara', cEn: 'Find hotels'
    }),
    node('agoda', 'accommodation', isAsia ? 1 : 2, tpLinks.agoda(), {
      bTr: isAsia ? 'Asya’nın 1 numarası' : 'Gizli indirimler', bEn: isAsia ? '#1 in Asia' : 'Secret deals',
      tTr: isAsia ? `${countryNameTr} genelinde otel ve rezidanslarda en derin indirimler` : `${capitalEn} otellerinde mobil özel fiyatlar`,
      tEn: isAsia ? `Deepest hotel and residence discounts across ${countryNameEn}` : `Mobile-only hotel prices in ${capitalEn}`,
      cTr: 'Agoda fiyatları', cEn: 'Agoda prices'
    }, undefined, 'coral'),
    node('tripcom', 'accommodation', 3, tpLinks.tripHotels(), {
      bTr: 'Uçakla birlikte al', bEn: 'Bundle with flights',
      tTr: 'Uçuşla birlikte alınca ekstra indirimli oteller',
      tEn: 'Extra hotel discounts when booked with a flight',
      cTr: 'Trip.com otelleri', cEn: 'Trip.com hotels'
    }, undefined, 'slate'),
    node('expedia', 'accommodation', 4, tpLinks.expedia(`${capitalEn}, ${countryNameEn}`), {
      bTr: 'Paket tatil', bEn: 'Package deals',
      tTr: 'Otel + uçuş paketleri ve üye fiyatları',
      tEn: 'Hotel + flight packages and member prices',
      cTr: 'Expedia’da ara', cEn: 'Search Expedia'
    }, undefined, 'amber'),
    node('hostelworld', 'accommodation', 5, tpLinks.hostelworld(), {
      bTr: 'Bütçe dostu', bEn: 'Budget friendly',
      tTr: 'Hostel ve sosyal konaklamalar; yalnız gezginler ve göçebeler için',
      tEn: 'Hostels and social stays for solo travellers and nomads',
      cTr: 'Hostel bul', cEn: 'Find hostels'
    }, undefined, 'teal')
  ];
  const accommodationPartners = applyRestrictedBrandAlgorithm(accommodationPartnersRaw, code, origin);

  // ============================================================================
  // 3. VARIŞ: HAVALİMANI TRANSFERİ VE ARAÇ KİRALAMA
  // ============================================================================
  const transitPartnersRaw: ConciergePartnerNode[] = [
    node('kiwitaxi', 'transit', 1, tpLinks.kiwitaxi(), {
      bTr: 'Sabit fiyatlı transfer', bEn: 'Fixed-price transfer',
      tTr: `${mainHub} havalimanından otele isimli karşılama, sabit fiyat`,
      tEn: `Meet & greet from ${mainHub} airport to your hotel at a fixed price`,
      cTr: 'Transfer ayarla', cEn: 'Book a transfer'
    }),
    node('discovercars', 'transit', 2, tpLinks.discovercars(countryNameEn), {
      bTr: 'Araç kiralama', bEn: 'Car rental',
      tTr: `${countryNameTr} genelinde yüzlerce kiralama şirketini karşılaştır`,
      tEn: `Compare hundreds of rental companies across ${countryNameEn}`,
      cTr: 'Araç kirala', cEn: 'Rent a car'
    }, undefined, 'coral'),
    node(isEurope ? 'welcomepickups' : 'gettransfer', 'transit', 3, isEurope ? tpLinks.welcomePickups() : tpLinks.gettransfer(), {
      bTr: isEurope ? 'Yerel şoför' : 'Teklif al', bEn: isEurope ? 'Local driver' : 'Get offers',
      tTr: isEurope ? 'Yerel şoförle havalimanı karşılama ve şehir rehberliği' : 'Şoförlerden teklif alarak en uygun transferi seç',
      tEn: isEurope ? 'Airport pickup with a local driver and city tips' : 'Get offers from drivers and pick the best transfer',
      cTr: 'Transfer seçenekleri', cEn: 'Transfer options'
    }, undefined, 'slate'),
    node('localrent', 'transit', 4, tpLinks.localrent(), {
      bTr: 'Yerel kiralama', bEn: 'Local rentals',
      tTr: 'Yerel firmalardan depozitosuz veya kartsız araç kiralama seçenekleri',
      tEn: 'Local rental firms, often without deposit or credit card',
      cTr: 'Yerel kiralama', cEn: 'Local rentals'
    }, undefined, 'amber')
  ];
  const transitPartners = applyRestrictedBrandAlgorithm(transitPartnersRaw, code, origin);

  // ============================================================================
  // 4. TUR, MÜZE VE AKTİVİTE
  // ============================================================================
  const activityPartnersRaw: ConciergePartnerNode[] = [
    node('getyourguide', 'activities', 1, tpLinks.getyourguide(countryNameEn), {
      bTr: 'Ücretsiz iptal', bEn: 'Free cancellation',
      tTr: `${countryNameTr} turları, müze biletleri ve günübirlik geziler`,
      tEn: `Tours, museum tickets and day trips in ${countryNameEn}`,
      cTr: 'Turlara bak', cEn: 'Browse tours'
    }),
    node('viator', 'activities', 2, tpLinks.viator(countryNameEn), {
      bTr: 'Tripadvisor güvencesi', bEn: 'By Tripadvisor',
      tTr: 'Gezgin yorumlarıyla seçilmiş deneyimler',
      tEn: 'Experiences picked by traveller reviews',
      cTr: 'Viator deneyimleri', cEn: 'Viator experiences'
    }, undefined, 'coral'),
    node(isAsia ? 'klook' : 'tiqets', 'activities', 3, isAsia ? tpLinks.klook() : tpLinks.tiqets(), {
      bTr: isAsia ? 'Asya’da güçlü' : 'Sırasız giriş', bEn: isAsia ? 'Strong in Asia' : 'Skip the line',
      tTr: isAsia ? 'Tema parkları, ulaşım kartları ve yerel aktiviteler' : 'Müze ve gezilecek yerlere sırasız, mobil bilet',
      tEn: isAsia ? 'Theme parks, transport passes and local activities' : 'Skip-the-line mobile tickets to museums and sights',
      cTr: isAsia ? 'Klook’a bak' : 'Tiqets biletleri', cEn: isAsia ? 'Browse Klook' : 'Tiqets tickets'
    }, undefined, 'amber')
  ];
  const activityPartners = applyRestrictedBrandAlgorithm(activityPartnersRaw, code, origin);

  // ============================================================================
  // 5. İNTERNET (eSIM) VE GÜVENCE
  // ============================================================================
  const airaloSlug = getAiraloCountrySlug(code, countryNameEn);
  const essentialsPartnersRaw: ConciergePartnerNode[] = [
    node('yesim', 'essentials', 1, tpLinks.yesim(), {
      bTr: 'Anında eSIM', bEn: 'Instant eSIM',
      tTr: `${countryNameTr} için uçağa binmeden QR kodla kurulan internet paketi`,
      tEn: `Data plan for ${countryNameEn}, installed by QR code before you fly`,
      cTr: 'Yesim paketleri', cEn: 'Yesim plans'
    }),
    node('airalo', 'essentials', 2, tpLinks.airalo(airaloSlug), {
      bTr: `${countryNameTr} eSIM`, bEn: `${countryNameEn} eSIM`,
      tTr: `${countryNameTr} yerel operatör ağına bağlanan eSIM`,
      tEn: `eSIM on ${countryNameEn} local carrier networks`,
      cTr: `${countryNameTr} eSIM al`, cEn: `Get ${countryNameEn} eSIM`
    }, `Airalo ${countryNameEn} eSIM`, 'coral'),
    node('saily', 'essentials', 3, tpLinks.saily(), {
      bTr: 'Reklam engelli', bEn: 'Ad-blocking',
      tTr: 'NordVPN ekibinden, güvenlik özellikli eSIM',
      tEn: 'eSIM with built-in security, by the NordVPN team',
      cTr: 'Saily paketleri', cEn: 'Saily plans'
    }, undefined, 'slate'),
    node('airhelp', 'essentials', 4, tpLinks.airhelp(), {
      bTr: '600 €’ya kadar', bEn: 'Up to €600',
      tTr: 'Uçuşun gecikti, iptal oldu ya da bagajın kayboldu mu? Tazminatını talep et',
      tEn: 'Flight delayed, cancelled or bag lost? Claim your compensation',
      cTr: 'Tazminat sorgula', cEn: 'Check compensation'
    }, undefined, 'amber'),
    node('radicalstorage', 'essentials', 5, tpLinks.radicalStorage(), {
      bTr: 'Bavul emanet', bEn: 'Luggage storage',
      tTr: 'Otele girmeden ya da çıkıştan sonra şehirde bavulunu güvenle bırak',
      tEn: 'Store your bags in the city before check-in or after check-out',
      cTr: 'Emanet yeri bul', cEn: 'Find storage'
    }, undefined, 'teal')
  ];
  const essentialsPartners = applyRestrictedBrandAlgorithm(essentialsPartnersRaw, code, origin);

  const stages: ConciergeStageGroup[] = [
    {
      stage: 'flights',
      stepNumber: '01',
      titleTr: 'Uçuş ve yol biletleri',
      titleEn: 'Flights & tickets',
      subtitleTr: `${mainHub} havalimanına uçuşlar ve kara yolu biletleri`,
      subtitleEn: `Flights to ${mainHub} and ground transport tickets`,
      primaryPartner: flightPartners[0],
      partners: flightPartners
    },
    {
      stage: 'accommodation',
      stepNumber: '02',
      titleTr: 'Konaklama',
      titleEn: 'Accommodation',
      subtitleTr: isAsia ? 'Asya’da Agoda önde; ücretsiz iptalli seçenekler' : 'Ücretsiz iptalli oteller ve bütçe dostu hosteller',
      subtitleEn: isAsia ? 'Agoda leads in Asia; free-cancellation options' : 'Free-cancellation hotels and budget hostels',
      primaryPartner: accommodationPartners[0],
      partners: accommodationPartners
    },
    {
      stage: 'transit',
      stepNumber: '03',
      titleTr: 'Transfer ve araç',
      titleEn: 'Transfers & cars',
      subtitleTr: `${mainHub} karşılama ve araç kiralama`,
      subtitleEn: `${mainHub} airport pickup and car rental`,
      primaryPartner: transitPartners[0],
      partners: transitPartners
    },
    {
      stage: 'activities',
      stepNumber: '04',
      titleTr: 'Turlar ve biletler',
      titleEn: 'Tours & tickets',
      subtitleTr: `${countryNameTr} turları, müzeler ve aktiviteler`,
      subtitleEn: `Tours, museums and activities in ${countryNameEn}`,
      primaryPartner: activityPartners[0],
      partners: activityPartners
    },
    {
      stage: 'essentials',
      stepNumber: '05',
      titleTr: 'İnternet ve güvence',
      titleEn: 'Data & peace of mind',
      subtitleTr: `${countryNameTr} eSIM, uçuş tazminatı ve bavul emanet`,
      subtitleEn: `${countryNameEn} eSIM, flight compensation and luggage storage`,
      primaryPartner: essentialsPartners[0],
      partners: essentialsPartners
    }
  ];

  const hasRegionalRestrictionAlert = stages.some((s) => s.partners.some((p) => p.isRestrictedInRegion));

  return {
    countryCode: code,
    countryNameEn,
    regionCluster,
    hasRegionalRestrictionAlert,
    stages
  };
}
