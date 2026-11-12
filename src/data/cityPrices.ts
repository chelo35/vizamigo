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
  PH: [
    { id: 'manila', en: "Manila", iata: 'MNL' },
    { id: 'cebu', en: "Cebu", iata: 'CEB' },
    { id: 'boracay', en: "Boracay", iata: 'MPH' },
    { id: 'el-nido', en: "El Nido", iata: 'ENI' },
    { id: 'bohol', en: "Bohol", iata: 'TAG' }
  ],
  AU: [
    { id: 'sydney', en: "Sydney", iata: 'SYD', tr: 'Sidney' },
    { id: 'melbourne', en: "Melbourne", iata: 'MEL' },
    { id: 'gold-coast', en: "Gold Coast", iata: 'OOL' },
    { id: 'cairns', en: "Cairns", iata: 'CNS' },
    { id: 'perth', en: "Perth", iata: 'PER' }
  ],
  NZ: [
    { id: 'auckland', en: "Auckland", iata: 'AKL' },
    { id: 'queenstown', en: "Queenstown", iata: 'ZQN' },
    { id: 'christchurch', en: "Christchurch", iata: 'CHC' },
    { id: 'rotorua', en: "Rotorua", iata: 'ROT' }
  ],
  LK: [
    { id: 'colombo', en: "Colombo", iata: 'CMB', tr: 'Kolombo' },
    { id: 'kandy', en: "Kandy", iata: 'CMB' },
    { id: 'ella', en: "Ella", iata: 'CMB' },
    { id: 'galle', en: "Galle", iata: 'CMB' }
  ],
  MV: [
    { id: 'male', en: "Male", iata: 'MLE' },
    { id: 'maafushi', en: "Maafushi", iata: 'MLE' }
  ],
  AR: [
    { id: 'buenos-aires', en: "Buenos Aires", iata: 'EZE', lr: { path: 'argentina/buenos-aires' } },
    { id: 'el-calafate', en: "El Calafate", iata: 'FTE' },
    { id: 'bariloche', en: "Bariloche", iata: 'BRC' },
    { id: 'iguazu', en: "Puerto Iguazu", iata: 'IGR', tr: 'Iguazu' },
    { id: 'mendoza', en: "Mendoza", iata: 'MDZ' }
  ],
  PE: [
    { id: 'lima', en: "Lima", iata: 'LIM' },
    { id: 'cusco', en: "Cusco", iata: 'CUZ' },
    { id: 'arequipa', en: "Arequipa", iata: 'AQP' }
  ],
  CO: [
    { id: 'cartagena', en: "Cartagena", iata: 'CTG' },
    { id: 'bogota', en: "Bogota", iata: 'BOG' },
    { id: 'medellin', en: "Medellin", iata: 'MDE', tr: 'Medellín' },
    { id: 'santa-marta', en: "Santa Marta", iata: 'SMR' }
  ],
  DO: [
    { id: 'punta-cana', en: "Punta Cana", iata: 'PUJ' },
    { id: 'santo-domingo', en: "Santo Domingo", iata: 'SDQ' },
    { id: 'puerto-plata', en: "Puerto Plata", iata: 'POP' }
  ],
  CU: [
    { id: 'havana', en: "Havana", iata: 'HAV', tr: 'Havana' },
    { id: 'varadero', en: "Varadero", iata: 'VRA' },
    { id: 'trinidad', en: "Trinidad", iata: 'HAV' }
  ],
  JO: [
    { id: 'amman', en: "Amman", iata: 'AMM', lr: { path: 'jordan/amman', eur: 15.88 } },
    { id: 'petra', en: "Petra", iata: 'AMM' },
    { id: 'aqaba', en: "Aqaba", iata: 'AQJ', tr: 'Akabe', lr: { path: 'jordan/aqaba', eur: 24.38 } },
    { id: 'wadi-rum', en: "Wadi Rum", iata: 'AQJ' }
  ],
  TN: [
    { id: 'tunis', en: "Tunis", iata: 'TUN', tr: 'Tunus', lr: { path: 'tunisia/tunis' } },
    { id: 'djerba', en: "Djerba", iata: 'DJE', tr: 'Cerbe', lr: { path: 'tunisia/djerba' } },
    { id: 'hammamet', en: "Hammamet", iata: 'NBE' },
    { id: 'sousse', en: "Sousse", iata: 'MIR', tr: 'Susa' }
  ],
  GE: [
    { id: 'tbilisi', en: "Tbilisi", iata: 'TBS', tr: 'Tiflis', lr: { path: 'georgia/tbilisi', eur: 21 } },
    { id: 'batumi', en: "Batumi", iata: 'BUS', tr: 'Batum', lr: { path: 'georgia/batumi', eur: 26 } },
    { id: 'kutaisi', en: "Kutaisi", iata: 'KUT', lr: { path: 'georgia/kutaisi', eur: 25 } }
  ],
  ME: [
    { id: 'budva', en: "Budva", iata: 'TIV', lr: { path: 'montenegro/budva', eur: 14 } },
    { id: 'kotor', en: "Kotor", iata: 'TIV', lr: { path: 'montenegro/tivat', eur: 14 } },
    { id: 'podgorica', en: "Podgorica", iata: 'TGD', lr: { path: 'montenegro/podgorica', eur: 12.15 } }
  ],
  AL: [
    { id: 'tirana', en: "Tirana", iata: 'TIA', tr: 'Tiran', lr: { path: 'albania/tirana' } },
    { id: 'saranda', en: "Saranda", iata: 'TIA', tr: 'Sarande', lr: { path: 'albania/saranda', eur: 15 } },
    { id: 'durres', en: "Durres", iata: 'TIA', tr: 'Dıraç', lr: { path: 'albania/durres', eur: 11 } }
  ],
  CY: [
    { id: 'ayia-napa', en: "Ayia Napa", iata: 'LCA', lr: { path: 'cyprus/ayia-napa', eur: 14.58 } },
    { id: 'paphos', en: "Paphos", iata: 'PFO', tr: 'Baf', lr: { path: 'cyprus/paphos' } },
    { id: 'larnaca', en: "Larnaca", iata: 'LCA', tr: 'Larnaka', lr: { path: 'cyprus/larnaca', eur: 10.67 } },
    { id: 'limassol', en: "Limassol", iata: 'LCA', tr: 'Limasol' }
  ],
  NO: [
    { id: 'oslo', en: "Oslo", iata: 'OSL' },
    { id: 'bergen', en: "Bergen", iata: 'BGO' },
    { id: 'tromso', en: "Tromso", iata: 'TOS', tr: 'Tromsø' },
    { id: 'lofoten', en: "Lofoten", iata: 'BOO' }
  ],
  IS: [
    { id: 'reykjavik', en: "Reykjavik", iata: 'KEF', tr: 'Reykjavík', lr: { path: 'iceland/reykjavik' } },
    { id: 'vik', en: "Vik", iata: 'KEF' }
  ],
  QA: [
    { id: 'doha', en: "Doha", iata: 'DOH', lr: { path: 'qatar/doha', eur: 22 } }
  ],
  ZA: [
    { id: 'cape-town', en: "Cape Town", iata: 'CPT' },
    { id: 'johannesburg', en: "Johannesburg", iata: 'JNB' },
    { id: 'durban', en: "Durban", iata: 'DUR' },
    { id: 'kruger', en: "Kruger Park", iata: 'MQP', tr: 'Kruger Parkı' }
  ],
  MU: [
    { id: 'grand-baie', en: "Grand Baie", iata: 'MRU', lr: { path: 'mauritius/grand-baie' } },
    { id: 'flic-en-flac', en: "Flic en Flac", iata: 'MRU', lr: { path: 'mauritius/flic-en-flac' } }
  ],
  CR: [
    { id: 'san-jose', en: "San José", iata: 'SJO' },
    { id: 'la-fortuna', en: "La Fortuna", iata: 'SJO' },
    { id: 'liberia', en: "Liberia", iata: 'LIR' }
  ],
  PA: [
    { id: 'panama-city', en: "Panama City", iata: 'PTY' },
    { id: 'bocas-del-toro', en: "Bocas del Toro", iata: 'BOC' }
  ],
  CL: [
    { id: 'santiago', en: "Santiago", iata: 'SCL', lr: { path: 'chile/santiago', eur: 18.48 } },
    { id: 'san-pedro', en: "San Pedro de Atacama", iata: 'CJC' },
    { id: 'puerto-natales', en: "Puerto Natales", iata: 'PNT' }
  ],
  UY: [
    { id: 'montevideo', en: "Montevideo", iata: 'MVD' },
    { id: 'punta-del-este', en: "Punta del Este", iata: 'PDP' }
  ],
  JM: [
    { id: 'montego-bay', en: "Montego Bay", iata: 'MBJ', lr: { path: 'jamaica/montego-bay' } },
    { id: 'kingston', en: "Kingston", iata: 'KIN' }
  ],
  FJ: [
    { id: 'nadi', en: "Nadi", iata: 'NAN', lr: { path: 'fiji/nadi' } }
  ],
  SC: [
    { id: 'mahe', en: "Mahé", iata: 'SEZ', lr: { path: 'seychelles/mahe', eur: 45 } },
    { id: 'praslin', en: "Praslin", iata: 'PRI' }
  ],
  MK: [
    { id: 'skopje', en: "Skopje", iata: 'SKP', tr: "Üsküp", lr: { path: 'macedonia/skopje', eur: 11.75 } },
    { id: 'ohrid', en: "Ohrid", iata: 'OHD', tr: "Ohri" }
  ],
  SK: [
    { id: 'bratislava', en: "Bratislava", iata: 'BTS' },
    { id: 'high-tatras', en: "High Tatras", iata: 'TAT', tr: "Yüksek Tatra" }
  ],
  LV: [
    { id: 'riga', en: "Riga", iata: 'RIX' }
  ],
  LT: [
    { id: 'vilnius', en: "Vilnius", iata: 'VNO' }
  ],
  LU: [
    { id: 'luxembourg', en: "Luxembourg", iata: 'LUX', tr: "Lüksemburg" }
  ],
  AM: [
    { id: 'yerevan', en: "Yerevan", iata: 'EVN', tr: "Erivan", lr: { path: 'armenia/yerevan', eur: 28.05 } }
  ],
  KG: [
    { id: 'bishkek', en: "Bishkek", iata: 'FRU', tr: "Bişkek", lr: { path: 'kyrgyzstan/bishkek' } }
  ],
  MN: [
    { id: 'ulaanbaatar', en: "Ulaanbaatar", iata: 'UBN', tr: "Ulan Batur" }
  ],
  EC: [
    { id: 'quito', en: "Quito", iata: 'UIO' },
    { id: 'guayaquil', en: "Guayaquil", iata: 'GYE' },
    { id: 'galapagos', en: "Galápagos", iata: 'GPS' }
  ],
  BS: [
    { id: 'nassau', en: "Nassau", iata: 'NAS' },
    { id: 'exuma', en: "Exuma", iata: 'GGT' }
  ],
  NA: [
    { id: 'windhoek', en: "Windhoek", iata: 'WDH' }
  ],
  BO: [
    { id: 'la-paz', en: "La Paz", iata: 'LPB' },
    { id: 'uyuni', en: "Uyuni", iata: 'UYU' }
  ],
  SE: [
    { id: 'stockholm', en: "Stockholm", iata: 'ARN' },
    { id: 'gothenburg', en: "Gothenburg", iata: 'GOT', tr: "Göteborg" },
    { id: 'malmo', en: "Malmö", iata: 'MMX' }
  ],
  FI: [
    { id: 'helsinki', en: "Helsinki", iata: 'HEL', lr: { path: 'finland/helsinki' } },
    { id: 'rovaniemi', en: "Rovaniemi", iata: 'RVN', lr: { path: 'finland/rovaniemi' } }
  ],
  RO: [
    { id: 'bucharest', en: "Bucharest", iata: 'OTP', tr: "Bükreş", lr: { path: 'romania/bucharest', eur: 15 } },
    { id: 'brasov', en: "Brasov", iata: 'OTP', tr: "Braşov", lr: { path: 'romania/brasov' } },
    { id: 'cluj', en: "Cluj-Napoca", iata: 'CLJ', lr: { path: 'romania/cluj-napoca' } }
  ],
  BG: [
    { id: 'sofia', en: "Sofia", iata: 'SOF', tr: "Sofya", lr: { path: 'bulgaria/sofia' } },
    { id: 'varna', en: "Varna", iata: 'VAR', lr: { path: 'bulgaria/varna' } },
    { id: 'burgas', en: "Burgas", iata: 'BOJ', tr: "Burgaz", lr: { path: 'bulgaria/burgas' } }
  ],
  SI: [
    { id: 'ljubljana', en: "Ljubljana", iata: 'LJU', lr: { path: 'slovenia/ljubljana', eur: 9.58 } },
    { id: 'bled', en: "Bled", iata: 'LJU' }
  ],
  RS: [
    { id: 'belgrade', en: "Belgrade", iata: 'BEG', tr: "Belgrad", lr: { path: 'serbia/belgrade', eur: 14.4 } },
    { id: 'novi-sad', en: "Novi Sad", iata: 'BEG', lr: { path: 'serbia/novi-sad' } }
  ],
  BA: [
    { id: 'sarajevo', en: "Sarajevo", iata: 'SJJ', tr: "Saraybosna" },
    { id: 'mostar', en: "Mostar", iata: 'OMO' }
  ],
  MT: [
    { id: 'valletta', en: "Valletta", iata: 'MLA', lr: { path: 'malta/valletta' } },
    { id: 'sliema', en: "Sliema", iata: 'MLA', lr: { path: 'malta/sliema' } }
  ],
  EE: [
    { id: 'tallinn', en: "Tallinn", iata: 'TLL' }
  ],
  AZ: [
    { id: 'baku', en: "Baku", iata: 'GYD', tr: "Bakü", lr: { path: 'azerbaijan/baku', eur: 19 } }
  ],
  UZ: [
    { id: 'tashkent', en: "Tashkent", iata: 'TAS', tr: "Taşkent", lr: { path: 'uzbekistan/tashkent' } },
    { id: 'samarkand', en: "Samarkand", iata: 'SKD', tr: "Semerkant" },
    { id: 'bukhara', en: "Bukhara", iata: 'BHK', tr: "Buhara" }
  ],
  KZ: [
    { id: 'almaty', en: "Almaty", iata: 'ALA', tr: "Almatı", lr: { path: 'kazakhstan/almaty' } },
    { id: 'astana', en: "Astana", iata: 'NQZ' }
  ],
  OM: [
    { id: 'muscat', en: "Muscat", iata: 'MCT', tr: "Maskat", lr: { path: 'oman/muscat', eur: 16 } },
    { id: 'salalah', en: "Salalah", iata: 'SLL', lr: { path: 'oman/salalah' } }
  ],
  BH: [
    { id: 'manama', en: "Manama", iata: 'BAH' }
  ],
  TW: [
    { id: 'taipei', en: "Taipei", iata: 'TPE' },
    { id: 'kaohsiung', en: "Kaohsiung", iata: 'KHH' }
  ],
  KH: [
    { id: 'siem-reap', en: "Siem Reap", iata: 'SAI' },
    { id: 'phnom-penh', en: "Phnom Penh", iata: 'KTI' }
  ],
  LA: [
    { id: 'vientiane', en: "Vientiane", iata: 'VTE' },
    { id: 'luang-prabang', en: "Luang Prabang", iata: 'LPQ' }
  ],
  NP: [
    { id: 'kathmandu', en: "Kathmandu", iata: 'KTM', tr: "Katmandu" },
    { id: 'pokhara', en: "Pokhara", iata: 'PKR' }
  ],
  KE: [
    { id: 'nairobi', en: "Nairobi", iata: 'NBO' },
    { id: 'mombasa', en: "Mombasa", iata: 'MBA' }
  ],
  TZ: [
    { id: 'zanzibar', en: "Zanzibar", iata: 'ZNZ', lr: { path: 'tanzania/zanzibar', eur: 16.88 } },
    { id: 'arusha', en: "Arusha", iata: 'ARK' }
  ],
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
