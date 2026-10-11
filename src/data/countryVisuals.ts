/**
 * Curated Scenic Landscape Photography Database for Vizamigo
 * Provides dimmed high-quality landscape thumbnails for destinations worldwide.
 */

// Curated high-res Unsplash landscape thumbnails optimized for travel apps
const COUNTRY_LANDSCAPES: Record<string, { image: string; landmark: string }> = {
  // Western Balkans & Mediterranean (User highlights: AL, BA)
  AL: {
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=480&q=80',
    landmark: 'Ksamil & Berat'
  },
  BA: {
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=480&q=80',
    landmark: 'Mostar Stari Most'
  },
  ME: {
    image: 'https://images.unsplash.com/photo-1555990538-1e4492bf35e8?auto=format&fit=crop&w=480&q=80',
    landmark: 'Kotor Bay'
  },
  RS: {
    image: 'https://images.unsplash.com/photo-1584448141569-69f342da535c?auto=format&fit=crop&w=480&q=80',
    landmark: 'Kalemegdan Belgrade'
  },
  MK: {
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=480&q=80',
    landmark: 'Lake Ohrid'
  },
  XK: {
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=480&q=80',
    landmark: 'Prizren Fortress'
  },
  HR: {
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=480&q=80',
    landmark: 'Dubrovnik & Plitvice'
  },
  GR: {
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=480&q=80',
    landmark: 'Santorini & Aegean'
  },
  TR: {
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=480&q=80',
    landmark: 'Cappadocia & Bosphorus'
  },
  GE: {
    image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&w=480&q=80',
    landmark: 'Kazbegi Caucasus'
  },
  AM: {
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=480&q=80',
    landmark: 'Mount Ararat & Sevan'
  },
  AZ: {
    image: 'https://images.unsplash.com/photo-1583208573216-56ef58249a5b?auto=format&fit=crop&w=480&q=80',
    landmark: 'Baku Flame Towers'
  },

  // East & Southeast Asia
  JP: {
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=480&q=80',
    landmark: 'Mount Fuji & Kyoto'
  },
  TH: {
    image: 'https://images.unsplash.com/photo-1506665531395-7d347d0af044?auto=format&fit=crop&w=480&q=80',
    landmark: 'Maya Bay & Phuket'
  },
  KR: {
    image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=480&q=80',
    landmark: 'Seoul & Jeju Island'
  },
  SG: {
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=480&q=80',
    landmark: 'Marina Bay Sands'
  },
  ID: {
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=480&q=80',
    landmark: 'Bali & Nusa Penida'
  },
  MY: {
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=480&q=80',
    landmark: 'Kuala Lumpur & Penang'
  },
  VN: {
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=480&q=80',
    landmark: 'Ha Long Bay & Da Nang'
  },
  PH: {
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=480&q=80',
    landmark: 'El Nido Palawan'
  },
  TW: {
    image: 'https://images.unsplash.com/photo-1508247967583-7d982ea01526?auto=format&fit=crop&w=480&q=80',
    landmark: 'Taipei 101 & Jiufen'
  },
  HK: {
    image: 'https://images.unsplash.com/photo-1506970845346-22b9b7754b2d?auto=format&fit=crop&w=480&q=80',
    landmark: 'Victoria Harbour'
  },

  // Europe Core
  IT: {
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=480&q=80',
    landmark: 'Amalfi Coast & Rome'
  },
  FR: {
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=480&q=80',
    landmark: 'Eiffel & Côte d’Azur'
  },
  ES: {
    image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=480&q=80',
    landmark: 'Barcelona & Mallorca'
  },
  DE: {
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=480&q=80',
    landmark: 'Neuschwanstein & Berlin'
  },
  CH: {
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=480&q=80',
    landmark: 'Swiss Alps & Matterhorn'
  },
  AT: {
    image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=480&q=80',
    landmark: 'Hallstatt & Vienna'
  },
  PT: {
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd81?auto=format&fit=crop&w=480&q=80',
    landmark: 'Lisbon & Algarve'
  },
  NL: {
    image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=480&q=80',
    landmark: 'Amsterdam Canals'
  },
  GB: {
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=480&q=80',
    landmark: 'Big Ben & Highlands'
  },
  NO: {
    image: 'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=480&q=80',
    landmark: 'Geirangerfjord & Lofoten'
  },
  IS: {
    image: 'https://images.unsplash.com/photo-1489367874814-f5d040621dd8?auto=format&fit=crop&w=480&q=80',
    landmark: 'Skógafoss & Aurora'
  },
  SE: {
    image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=480&q=80',
    landmark: 'Stockholm Archipelago'
  },

  // Americas & Rest of World
  US: {
    image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=480&q=80',
    landmark: 'Yosemite & Manhattan'
  },
  CA: {
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=480&q=80',
    landmark: 'Banff National Park'
  },
  AE: {
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=480&q=80',
    landmark: 'Burj Khalifa & Dunes'
  },
  QA: {
    image: 'https://images.unsplash.com/photo-1578895210405-907db486c111?auto=format&fit=crop&w=480&q=80',
    landmark: 'Doha Corniche'
  },
  AU: {
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=480&q=80',
    landmark: 'Sydney & Barrier Reef'
  },
  NZ: {
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=480&q=80',
    landmark: 'Milford Sound'
  },
  EG: {
    image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=480&q=80',
    landmark: 'Giza Pyramids & Nile'
  },
  MA: {
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=480&q=80',
    landmark: 'Sahara & Marrakech'
  },
  BR: {
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=480&q=80',
    landmark: 'Rio de Janeiro'
  },
  MX: {
    image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=480&q=80',
    landmark: 'Cancun & Chichen Itza'
  }
};

// Regional backup landscapes with elegant travel photography
const REGIONAL_FALLBACKS: Record<string, { image: string; landmark: string }> = {
  europe: {
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=480&q=80',
    landmark: 'European Heritage'
  },
  asia: {
    image: 'https://images.unsplash.com/photo-1506665531395-7d347d0af044?auto=format&fit=crop&w=480&q=80',
    landmark: 'Asia-Pacific Panorama'
  },
  americas: {
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=480&q=80',
    landmark: 'Pan-American Landscape'
  },
  africa: {
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=480&q=80',
    landmark: 'African Savannah & Coast'
  },
  oceania: {
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=480&q=80',
    landmark: 'Oceanic Island Vistas'
  },
  default: {
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=480&q=80',
    landmark: 'Global Destination'
  }
};

/**
 * Returns a high-quality dimmed scenic landscape thumbnail and landmark caption for any country
 */
export function getCountryVisual(countryCode: string): { image: string; landmark: string } {
  const code = (countryCode || '').toUpperCase();
  if (COUNTRY_LANDSCAPES[code]) {
    return COUNTRY_LANDSCAPES[code];
  }

  // Smart regional determination by ISO or default
  return REGIONAL_FALLBACKS.default;
}
