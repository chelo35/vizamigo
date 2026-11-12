/**
 * Ülke içi şehirler ve şehir bazlı yaklaşık fiyatlar (ortak sitelerin kendi sayfalarından elle/haftalık toplanır).
 * Fiyatlar "yaklaşık, başlayan" olarak gösterilir; kesin fiyat ortak sitede.
 */
export const PRICES_CHECKED = '2026-11-11';

/** SafetyWing Nomad Insurance Essential, 10–39 yaş, 4 hafta (ABD hariç), USD — safetywing.com/nomad-insurance */
export const SAFETYWING_4W_USD = 62.72;

export type CarClass = 'mini' | 'economy' | 'compact' | 'intermediate' | 'standard';
export type City = {
  id: string;
  en: string;
  /** Türkçe ad (farklıysa) */
  tr?: string;
  /** en yakın havalimanı (uçuş fiyatları için) */
  iata?: string;
  /** EconomyBookings şehir sayfası yolu ve sınıf başına günlük USD */
  car?: { path: string; usd?: Partial<Record<CarClass, number>> };
  /** Localrent şehir sayfası (localrent.com/en/{path}/) ve günlük başlayan fiyat, EUR */
  lr?: { path: string; eur?: number };
  /** Rentalmotorbike şehir adı ve günlük en düşük EUR */
  moto?: { slug: string; eur?: number };
};

export const CITIES: Record<string, City[]> = {
  NL: [
    { id: 'amsterdam', en: 'Amsterdam', iata: 'AMS' },
    { id: 'rotterdam', en: 'Rotterdam', iata: 'RTM' },
    { id: 'utrecht', en: 'Utrecht', iata: 'AMS' },
    { id: 'the-hague', en: 'The Hague', iata: 'AMS', tr: 'Lahey' }
  ],
  CA: [
    { id: 'toronto', en: 'Toronto', iata: 'YYZ' },
    { id: 'vancouver', en: 'Vancouver', iata: 'YVR' },
    { id: 'montreal', en: 'Montreal', iata: 'YUL' },
    { id: 'banff', en: 'Banff', iata: 'YYC' },
    { id: 'quebec', en: 'Quebec City', iata: 'YQB', tr: 'Quebec' }
  ],
  MY: [
    { id: 'kuala-lumpur', en: 'Kuala Lumpur', iata: 'KUL', lr: { path: 'malaysia/kuala-lumpur', eur: 33.36 } },
    { id: 'langkawi', en: 'Langkawi', iata: 'LGK', lr: { path: 'malaysia/langkawi' } },
    { id: 'penang', en: 'Penang', iata: 'PEN', lr: { path: 'malaysia/penang' } },
    { id: 'kota-kinabalu', en: 'Kota Kinabalu', iata: 'BKI' }
  ],
  PL: [
    { id: 'warsaw', en: 'Warsaw', iata: 'WAW', tr: 'Varşova', lr: { path: 'poland/warsaw', eur: 12.84 } },
    { id: 'krakow', en: 'Krakow', iata: 'KRK', tr: 'Krakov', lr: { path: 'poland/krakow', eur: 12.84 } },
    { id: 'gdansk', en: 'Gdansk', iata: 'GDN', tr: 'Gdańsk' },
    { id: 'wroclaw', en: 'Wroclaw', iata: 'WRO', tr: 'Wrocław' }
  ],
  HR: [
    { id: 'dubrovnik', en: 'Dubrovnik', iata: 'DBV', lr: { path: 'croatia/dubrovnik' } },
    { id: 'split', en: 'Split', iata: 'SPU', lr: { path: 'croatia/split', eur: 12.5 } },
    { id: 'zagreb', en: 'Zagreb', iata: 'ZAG', lr: { path: 'croatia/zagreb' }, moto: { slug: 'zagreb', eur: 50 } },
    { id: 'zadar', en: 'Zadar', iata: 'ZAD' }
  ],
  HU: [
    { id: 'budapest', en: 'Budapest', iata: 'BUD', tr: 'Budapeşte', lr: { path: 'hungary/budapest', eur: 16.83 } },
    { id: 'balaton', en: 'Lake Balaton', iata: 'BUD', tr: 'Balaton Gölü' }
  ],
  EG: [
    { id: 'cairo', en: 'Cairo', iata: 'CAI', tr: 'Kahire', lr: { path: 'egypt/cairo' } },
    { id: 'hurghada', en: 'Hurghada', iata: 'HRG', tr: 'Hurgada', lr: { path: 'egypt/hurghada' } },
    { id: 'sharm', en: 'Sharm El Sheikh', iata: 'SSH', tr: 'Şarm El Şeyh', lr: { path: 'egypt/sharm-el-sheikh' } },
    { id: 'luxor', en: 'Luxor', iata: 'LXR', tr: 'Luksor' }
  ],
  MA: [
    { id: 'marrakech', en: 'Marrakech', iata: 'RAK', tr: 'Marakeş', lr: { path: 'morocco/marrakech', eur: 22 }, moto: { slug: 'marrakech', eur: 11.5 } },
    { id: 'casablanca', en: 'Casablanca', iata: 'CMN', tr: 'Kazablanka', lr: { path: 'morocco/casablanca', eur: 20.86 } },
    { id: 'agadir', en: 'Agadir', iata: 'AGA', lr: { path: 'morocco/agadir', eur: 28.08 } },
    { id: 'fes', en: 'Fes', iata: 'FEZ', tr: 'Fas' },
    { id: 'chefchaouen', en: 'Chefchaouen', iata: 'TNG', tr: 'Şafşavan' }
  ],
  VN: [
    { id: 'hanoi', en: 'Hanoi', iata: 'HAN', lr: { path: 'vietnam/hanoi', eur: 33 } },
    { id: 'ho-chi-minh', en: 'Ho Chi Minh City', iata: 'SGN', tr: 'Ho Chi Minh', lr: { path: 'vietnam/ho-chi-minh-city' } },
    { id: 'da-nang', en: 'Da Nang', iata: 'DAD', lr: { path: 'vietnam/da-nang' } },
    { id: 'phu-quoc', en: 'Phu Quoc', iata: 'PQC' }
  ],
  KR: [
    { id: 'seoul', en: 'Seoul', iata: 'ICN', tr: 'Seul' },
    { id: 'busan', en: 'Busan', iata: 'PUS' },
    { id: 'jeju', en: 'Jeju', iata: 'CJU', lr: { path: 'korea/jeju', eur: 35 } }
  ],
  ID: [
    { id: 'bali', en: 'Bali', iata: 'DPS', lr: { path: 'indonesia/bali', eur: 16 }, moto: { slug: 'bali', eur: 10 } },
    { id: 'jakarta', en: 'Jakarta', iata: 'CGK', tr: 'Cakarta' },
    { id: 'lombok', en: 'Lombok', iata: 'LOP' },
    { id: 'yogyakarta', en: 'Yogyakarta', iata: 'YIA' }
  ],
  CH: [
    { id: 'zurich', en: 'Zurich', iata: 'ZRH', tr: 'Zürih' },
    { id: 'geneva', en: 'Geneva', iata: 'GVA', tr: 'Cenevre' },
    { id: 'interlaken', en: 'Interlaken', iata: 'ZRH' },
    { id: 'lucerne', en: 'Lucerne', iata: 'ZRH', tr: 'Luzern' },
    { id: 'zermatt', en: 'Zermatt', iata: 'GVA' }
  ],
  CZ: [
    { id: 'prague', en: 'Prague', iata: 'PRG', tr: 'Prag', lr: { path: 'czech/prague' } },
    { id: 'cesky-krumlov', en: 'Cesky Krumlov', iata: 'PRG', tr: 'Český Krumlov' },
    { id: 'brno', en: 'Brno', iata: 'BRQ' }
  ],
  SG: [
    { id: 'singapore', en: 'Singapore', iata: 'SIN', tr: 'Singapur' },
    { id: 'sentosa', en: 'Sentosa', iata: 'SIN' }
  ],
  IN: [
    { id: 'delhi', en: 'New Delhi', iata: 'DEL', tr: 'Yeni Delhi' },
    { id: 'mumbai', en: 'Mumbai', iata: 'BOM' },
    { id: 'goa', en: 'Goa', iata: 'GOI' },
    { id: 'agra', en: 'Agra', iata: 'DEL' },
    { id: 'jaipur', en: 'Jaipur', iata: 'JAI' }
  ],
  DK: [
    { id: 'copenhagen', en: 'Copenhagen', iata: 'CPH', tr: 'Kopenhag' },
    { id: 'aarhus', en: 'Aarhus', iata: 'AAR' }
  ],
  IE: [
    { id: 'dublin', en: 'Dublin', iata: 'DUB' },
    { id: 'galway', en: 'Galway', iata: 'SNN' },
    { id: 'cork', en: 'Cork', iata: 'ORK' }
  ],
  BE: [
    { id: 'brussels', en: 'Brussels', iata: 'BRU', tr: 'Brüksel' },
    { id: 'bruges', en: 'Bruges', iata: 'BRU', tr: 'Brugge' },
    { id: 'antwerp', en: 'Antwerp', iata: 'BRU', tr: 'Anvers' },
    { id: 'ghent', en: 'Ghent', iata: 'BRU', tr: 'Gent' }
  ],
  HK: [
    { id: 'hong-kong', en: 'Hong Kong', iata: 'HKG' },
    { id: 'kowloon', en: 'Kowloon', iata: 'HKG' }
  ],
  BR: [
    { id: 'rio', en: 'Rio de Janeiro', iata: 'GIG' },
    { id: 'sao-paulo', en: 'Sao Paulo', iata: 'GRU', tr: 'São Paulo' },
    { id: 'salvador', en: 'Salvador', iata: 'SSA' },
    { id: 'florianopolis', en: 'Florianopolis', iata: 'FLN', tr: 'Florianópolis' },
    { id: 'foz-do-iguacu', en: 'Foz do Iguacu', iata: 'IGU', tr: 'Iguazu Şelaleleri' }
  ],
  SA: [
    { id: 'riyadh', en: 'Riyadh', iata: 'RUH', tr: 'Riyad' },
    { id: 'jeddah', en: 'Jeddah', iata: 'JED', tr: 'Cidde' },
    { id: 'mecca', en: 'Mecca', iata: 'JED', tr: 'Mekke' },
    { id: 'medina', en: 'Medina', iata: 'MED', tr: 'Medine' },
    { id: 'alula', en: 'AlUla', iata: 'ULH' },
    { id: 'dammam', en: 'Dammam', iata: 'DMM' }
  ],
  AT: [
    { id: 'vienna', en: 'Vienna', iata: 'VIE', tr: 'Viyana', lr: { path: 'austria/vienna', eur: 31.25 } },
    { id: 'salzburg', en: 'Salzburg', iata: 'SZG', lr: { path: 'austria/salzburg' } },
    { id: 'innsbruck', en: 'Innsbruck', iata: 'INN', lr: { path: 'austria/innsbruck' } },
    { id: 'hallstatt', en: 'Hallstatt', iata: 'SZG' },
    { id: 'graz', en: 'Graz', iata: 'GRZ' }
  ],
  CN: [
    { id: 'beijing', en: 'Beijing', iata: 'PEK', tr: 'Pekin', lr: { path: 'china/beijing' } },
    { id: 'shanghai', en: 'Shanghai', iata: 'PVG', tr: 'Şanghay', lr: { path: 'china/shanghai' } },
    { id: 'guangzhou', en: 'Guangzhou', iata: 'CAN' },
    { id: 'xian', en: 'Xi’an', iata: 'XIY', tr: 'Şian' },
    { id: 'chengdu', en: 'Chengdu', iata: 'TFU' },
    { id: 'guilin', en: 'Guilin', iata: 'KWL' }
  ],
  AE: [
    { id: 'dubai', en: 'Dubai', iata: 'DXB', lr: { path: 'uae/dubai', eur: 25 } },
    { id: 'abu-dhabi', en: 'Abu Dhabi', iata: 'AUH', tr: 'Abu Dabi', lr: { path: 'uae/abu-dhabi', eur: 29.29 } },
    { id: 'sharjah', en: 'Sharjah', iata: 'SHJ', tr: 'Şarika' },
    { id: 'ras-al-khaimah', en: 'Ras Al Khaimah', iata: 'DXB' }
  ],
  PT: [
    { id: 'lisbon', en: 'Lisbon', iata: 'LIS', tr: 'Lizbon', lr: { path: 'portugal/lisbon' }, moto: { slug: 'lisboa', eur: 15.47 } },
    { id: 'porto', en: 'Porto', iata: 'OPO', lr: { path: 'portugal/porto', eur: 8.96 } },
    { id: 'algarve', en: 'Algarve', iata: 'FAO', lr: { path: 'portugal/faro' } },
    { id: 'madeira', en: 'Madeira', iata: 'FNC', lr: { path: 'portugal/madeira', eur: 9.86 } },
    { id: 'azores', en: 'Azores', iata: 'PDL', tr: 'Azor Adaları' }
  ],
  MX: [
    { id: 'cancun', en: 'Cancun', iata: 'CUN', tr: 'Cancún', lr: { path: 'mexico/cancun' }, moto: { slug: 'quintana-roo', eur: 26.04 } },
    { id: 'mexico-city', en: 'Mexico City', iata: 'MEX', lr: { path: 'mexico/mexico-city' } },
    { id: 'tulum', en: 'Tulum', iata: 'CUN' },
    { id: 'playa-del-carmen', en: 'Playa del Carmen', iata: 'CUN' },
    { id: 'puerto-vallarta', en: 'Puerto Vallarta', iata: 'PVR' },
    { id: 'los-cabos', en: 'Los Cabos', iata: 'SJD' }
  ],
  GB: [
    { id: 'london', en: 'London', iata: 'LHR', tr: 'Londra' },
    { id: 'edinburgh', en: 'Edinburgh', iata: 'EDI', tr: 'Edinburg' },
    { id: 'manchester', en: 'Manchester', iata: 'MAN' },
    { id: 'glasgow', en: 'Glasgow', iata: 'GLA' },
    { id: 'liverpool', en: 'Liverpool', iata: 'LPL' },
    { id: 'birmingham', en: 'Birmingham', iata: 'BHX' }
  ],
  DE: [
    { id: 'berlin', en: 'Berlin', iata: 'BER', lr: { path: 'germany/berlin' } },
    { id: 'munich', en: 'Munich', iata: 'MUC', tr: 'Münih' },
    { id: 'frankfurt', en: 'Frankfurt', iata: 'FRA', lr: { path: 'germany/frankfurt', eur: 30.69 } },
    { id: 'hamburg', en: 'Hamburg', iata: 'HAM', lr: { path: 'germany/hamburg', eur: 31.19 } },
    { id: 'cologne', en: 'Cologne', iata: 'CGN', tr: 'Köln', lr: { path: 'germany/cologne', eur: 36.34 } }
  ],
  JP: [
    { id: 'tokyo', en: 'Tokyo', iata: 'HND', car: { path: 'asia/japan/tokyo', usd: { mini: 44, economy: 48, standard: 49, compact: 64, intermediate: 67 } }, moto: { slug: 'kanto', eur: 17.42 } },
    { id: 'osaka', en: 'Osaka', iata: 'KIX' },
    { id: 'kyoto', en: 'Kyoto', iata: 'KIX' },
    { id: 'sapporo', en: 'Sapporo', iata: 'CTS' },
    { id: 'fukuoka', en: 'Fukuoka', iata: 'FUK' },
    { id: 'okinawa', en: 'Okinawa', iata: 'OKA' }
  ],
  GR: [
    { id: 'athens', en: 'Athens', iata: 'ATH', tr: 'Atina', lr: { path: 'greece/athens' }, moto: { slug: 'attica', eur: 17 } },
    { id: 'santorini', en: 'Santorini', iata: 'JTR', lr: { path: 'greece/santorini' }, moto: { slug: 'cyclades', eur: 11 } },
    { id: 'mykonos', en: 'Mykonos', iata: 'JMK', tr: 'Mikonos', lr: { path: 'greece/mykonos' } },
    { id: 'crete', en: 'Crete', iata: 'HER', tr: 'Girit', lr: { path: 'greece/heraklion' }, moto: { slug: 'crete', eur: 15 } },
    { id: 'rhodes', en: 'Rhodes', iata: 'RHO', tr: 'Rodos', lr: { path: 'greece/rhodes', eur: 12.83 } },
    { id: 'corfu', en: 'Corfu', iata: 'CFU', tr: 'Korfu', lr: { path: 'greece/corfu' } },
    { id: 'thessaloniki', en: 'Thessaloniki', iata: 'SKG', tr: 'Selanik', lr: { path: 'greece/thessaloniki' } }
  ],
  FR: [
    { id: 'paris', en: 'Paris', iata: 'CDG', car: { path: 'europe/france/paris', usd: { mini: 15, economy: 17, compact: 27, intermediate: 29, standard: 44 } }, lr: { path: 'france/paris' }, moto: { slug: 'ile-de-france', eur: 16.42 } },
    { id: 'nice', en: 'Nice', iata: 'NCE', car: { path: 'europe/france/nice', usd: { mini: 10, economy: 14, compact: 16, intermediate: 22, standard: 25 } }, lr: { path: 'france/nice', eur: 15.21 } },
    { id: 'lyon', en: 'Lyon', iata: 'LYS', lr: { path: 'france/lyon', eur: 21.36 } },
    { id: 'marseille', en: 'Marseille', iata: 'MRS', tr: 'Marsilya', lr: { path: 'france/marseille', eur: 19.89 } },
    { id: 'bordeaux', en: 'Bordeaux', iata: 'BOD', lr: { path: 'france/bordeaux', eur: 14.74 } },
    { id: 'strasbourg', en: 'Strasbourg', iata: 'SXB', tr: 'Strazburg' }
  ],
  ES: [
    { id: 'madrid', en: 'Madrid', iata: 'MAD', lr: { path: 'spain/madrid', eur: 36.33 }, moto: { slug: 'madrid' } },
    { id: 'barcelona', en: 'Barcelona', iata: 'BCN', lr: { path: 'spain/barcelona' }, moto: { slug: 'barcelona', eur: 14 } },
    { id: 'malaga', en: 'Malaga', iata: 'AGP', lr: { path: 'spain/malaga', eur: 14.81 }, moto: { slug: 'malaga', eur: 20 } },
    { id: 'palma', en: 'Palma de Mallorca', iata: 'PMI', tr: 'Mallorca', lr: { path: 'spain/palma' }, moto: { slug: 'mallorca', eur: 16 } },
    { id: 'tenerife', en: 'Tenerife', iata: 'TFS', lr: { path: 'spain/tenerife', eur: 35.35 }, moto: { slug: 'tenerife', eur: 10 } },
    { id: 'alicante', en: 'Alicante', iata: 'ALC', lr: { path: 'spain/alicante', eur: 21.34 } },
    { id: 'seville', en: 'Seville', iata: 'SVQ', tr: 'Sevilla', lr: { path: 'spain/seville', eur: 25.64 } }
  ],
  US: [
    { id: 'new-york', en: 'New York', iata: 'JFK', moto: { slug: 'new-york', eur: 64.22 } },
    { id: 'los-angeles', en: 'Los Angeles', iata: 'LAX', car: { path: 'north-america/usa-california/los-angeles', usd: { economy: 27, compact: 28, intermediate: 29, standard: 30 } }, moto: { slug: 'california', eur: 60.75 } },
    { id: 'miami', en: 'Miami', iata: 'MIA', car: { path: 'north-america/usa-florida/miami' }, moto: { slug: 'florida', eur: 64.22 } },
    { id: 'orlando', en: 'Orlando', iata: 'MCO', car: { path: 'north-america/usa-florida/orlando' }, moto: { slug: 'florida', eur: 64.22 } },
    { id: 'las-vegas', en: 'Las Vegas', iata: 'LAS', car: { path: 'north-america/usa-nevada/las-vegas' }, moto: { slug: 'nevada', eur: 64.22 } },
    { id: 'san-francisco', en: 'San Francisco', iata: 'SFO', car: { path: 'north-america/usa-california/san-francisco', usd: { economy: 27, compact: 28, intermediate: 29, standard: 32 } }, moto: { slug: 'california', eur: 60.75 } }
  ],
  TR: [
    { id: 'istanbul', en: 'Istanbul', iata: 'IST', tr: 'İstanbul', lr: { path: 'turkey/istanbul', eur: 23 } },
    { id: 'antalya', en: 'Antalya', iata: 'AYT', lr: { path: 'turkey/antalya', eur: 12.96 }, moto: { slug: 'antalya', eur: 18 } },
    { id: 'bodrum', en: 'Bodrum', iata: 'BJV', lr: { path: 'turkey/bodrum', eur: 26.25 } },
    { id: 'dalaman', en: 'Fethiye', iata: 'DLM', lr: { path: 'turkey/fethiye', eur: 25.58 } },
    { id: 'izmir', en: 'Izmir', iata: 'ADB', tr: 'İzmir', lr: { path: 'turkey/izmir', eur: 17.6 } },
    { id: 'cappadocia', en: 'Cappadocia', iata: 'NAV', tr: 'Kapadokya', lr: { path: 'turkey/kayseri', eur: 20 } }
  ],
  IT: [
    { id: 'rome', en: 'Rome', iata: 'FCO', tr: 'Roma', lr: { path: 'italy/rome', eur: 10.63 }, moto: { slug: 'roma', eur: 20 } },
    { id: 'milan', en: 'Milan', iata: 'MXP', tr: 'Milano', lr: { path: 'italy/milan', eur: 22 }, moto: { slug: 'milano', eur: 9 } },
    { id: 'venice', en: 'Venice', iata: 'VCE', tr: 'Venedik', lr: { path: 'italy/venice' } },
    { id: 'florence', en: 'Florence', iata: 'FLR', tr: 'Floransa', lr: { path: 'italy/florence' } },
    { id: 'naples', en: 'Naples', iata: 'NAP', tr: 'Napoli', lr: { path: 'italy/naples' } }
  ],
  TH: [
    { id: 'bangkok', en: 'Bangkok', iata: 'BKK', car: { path: 'asia/thailand/bangkok', usd: { mini: 19, economy: 21, compact: 22, intermediate: 33, standard: 45 } }, moto: { slug: 'bangkok', eur: 27.77 } },
    { id: 'phuket', en: 'Phuket', iata: 'HKT', car: { path: 'asia/thailand/phuket' }, moto: { slug: 'phuket', eur: 5 } },
    { id: 'chiang-mai', en: 'Chiang Mai', iata: 'CNX', car: { path: 'asia/thailand/chiang-mai', usd: { mini: 18, economy: 18, compact: 25, intermediate: 27, standard: 45 } }, moto: { slug: 'chiang-mai', eur: 43.39 } },
    { id: 'pattaya', en: 'Pattaya', iata: 'BKK', moto: { slug: 'pattaya' } },
    { id: 'krabi', en: 'Krabi', iata: 'KBV', car: { path: 'asia/thailand/krabi', usd: { economy: 17, compact: 18, mini: 19, intermediate: 29, standard: 32 } } },
    { id: 'koh-samui', en: 'Koh Samui', iata: 'USM', car: { path: 'asia/thailand/koh-samui' } }
  ]
};

export const carCityUrl = (path: string) => `https://www.economybookings.com/car-rental/${path}`;
