/**
 * Havalimanı → şehir transfer rotaları (Kiwitaxi rota sayfaları).
 * from: Kiwitaxi'nin o rotadaki en düşük araç fiyatı (USD, araç başı, sabit).
 * Fiyatlar elle alınmış anlık değerlerdir; sayfada "yaklaşık, başlayan" diye gösterilir.
 * Son kontrol: 2026-11-11
 */
/** usd: fiyat; cur 'EUR' ise değer euro'dur (Kiwitaxi o ülke sayfasında fiyatı euro gösteriyor) */
export type TransferRoute = { slug: string; from: string; to: string; iata: string; usd: number; cur?: 'EUR'; city?: string };

export const KIWI_COUNTRY: Record<string, string> = { TH: 'thailand', FR: 'france', ES: 'spain', US: 'usa', TR: 'turkey', IT: 'italy', MX: 'mexico', GB: 'united-kingdom', DE: 'germany', JP: 'japan', GR: 'greece', SA: 'saudi-arabia', AT: 'austria', CN: 'china', AE: 'uae', PT: 'portugal', CA: 'canada', MY: 'malaysia', PL: 'poland', HR: 'croatia', HU: 'hungary', EG: 'egypt', MA: 'morocco', VN: 'vietnam', ID: 'indonesia', CH: 'switzerland', CZ: 'czech-republic', SG: 'singapore', IN: 'india', DK: 'denmark', IE: 'ireland', HK: 'hong-kong', BR: 'brazil', PH: 'philippines', AU: 'australia', NZ: 'new-zealand', DO: 'dominican-republic', JO: 'jordan', TN: 'tunisia', GE: 'georgia', ME: 'montenegro', AL: 'albania', CY: 'cyprus', NO: 'norway', IS: 'iceland', QA: 'qatar', ZA: 'south-africa', SE: 'sweden', FI: 'finland', RO: 'romania', BG: 'bulgaria', SI: 'slovenia', RS: 'serbia', EE: 'estonia', AZ: 'azerbaijan', UZ: 'uzbekistan', KZ: 'kazakhstan', OM: 'oman', TW: 'taiwan', KH: 'cambodia', KE: 'kenya', TZ: 'tanzania' };

export const TRANSFER_ROUTES: Record<string, TransferRoute[]> = {
  PH: [
    { city: 'manila', slug: 'ninoy-aquino-airport-makati', iata: 'MNL', from: 'Manila', to: 'Makati', usd: 35 }
  ],
  AU: [
    { city: 'sydney', slug: 'sydney-airport-sydney', iata: 'SYD', from: 'Sidney', to: 'Sidney', usd: 73 }
  ],
  NZ: [
    { city: 'auckland', slug: 'auckland-airport-auckland', iata: 'AKL', from: 'Auckland', to: 'Auckland', usd: 85 },
    { city: 'queenstown', slug: 'queenstown-airport-queenstown', iata: 'ZQN', from: 'Queenstown', to: 'Queenstown', usd: 80 }
  ],
  DO: [
    { city: 'punta-cana', slug: 'punta-cana-airport-punta-cana', iata: 'PUJ', from: 'Punta Cana', to: 'Punta Cana', usd: 34 }
  ],
  JO: [
    { city: 'amman', slug: 'amman-civil-airport-amman', iata: 'AMM', from: 'Amman', to: 'Amman', usd: 50 },
    { city: 'petra', slug: 'taxi-from-amman-civil-airport-to-petra', iata: 'AMM', from: 'Amman', to: 'Petra', usd: 50 }
  ],
  TN: [
    { city: 'tunis', slug: 'tunis-airport-tunis', iata: 'TUN', from: 'Tunus', to: 'Tunus', usd: 45 },
    { city: 'djerba', slug: 'djerba-airport-djerba', iata: 'DJE', from: 'Cerbe', to: 'Cerbe', usd: 73 }
  ],
  GE: [
    { city: 'tbilisi', slug: 'tbilisi-airport-tbilisi', iata: 'TBS', from: 'Tiflis', to: 'Tiflis', usd: 35 },
    { city: 'batumi', slug: 'batumi-airport-batumi', iata: 'BUS', from: 'Batum', to: 'Batum', usd: 37 }
  ],
  ME: [
    { city: 'budva', slug: 'taxi-from-tivat-airport-to-budva', iata: 'TIV', from: 'Tivat', to: 'Budva', usd: 62, cur: 'EUR' },
    { city: 'podgorica', slug: 'podgorica-airport-podgorica', iata: 'TGD', from: 'Podgorica', to: 'Podgorica', usd: 29, cur: 'EUR' }
  ],
  AL: [
    { city: 'tirana', slug: 'tirana-airport-tirana', iata: 'TIA', from: 'Tiran', to: 'Tiran', usd: 30, cur: 'EUR' }
  ],
  CY: [
    { city: 'ayia-napa', slug: 'larnaca-airport-ayia-napa', iata: 'LCA', from: 'Larnaka', to: 'Ayia Napa', usd: 81, cur: 'EUR' },
    { city: 'paphos', slug: 'paphos-airport-paphos', iata: 'PFO', from: 'Baf', to: 'Baf', usd: 48, cur: 'EUR' }
  ],
  NO: [
    { city: 'oslo', slug: 'gardermoen-airport-oslo', iata: 'OSL', from: 'Oslo', to: 'Oslo', usd: 144, cur: 'EUR' }
  ],
  IS: [
    { city: 'reykjavik', slug: 'keflavik-airport-reykjavik', iata: 'KEF', from: 'Keflavik', to: 'Reykjavik', usd: 138, cur: 'EUR' }
  ],
  QA: [
    { city: 'doha', slug: 'hamad-airport-doha', iata: 'DOH', from: 'Doha', to: 'Doha', usd: 40 }
  ],
  ZA: [
    { city: 'cape-town', slug: 'cape-town-airport-cape-town', iata: 'CPT', from: 'Cape Town', to: 'Cape Town', usd: 64 },
    { city: 'johannesburg', slug: 'johannesburg-airport-sandton', iata: 'JNB', from: 'Johannesburg', to: 'Sandton', usd: 64 }
  ],
  SE: [
    { city: 'stockholm', slug: 'taxi-from-stockholm-arlanda-airport-to-stockholm', iata: 'ARN', from: 'Arlanda', to: 'Stockholm', usd: 75, cur: 'EUR' },
    { city: 'gothenburg', slug: 'taxi-from-gothenburg-airport-to-gothenburg', iata: 'GOT', from: 'Göteborg', to: 'Göteborg', usd: 83, cur: 'EUR' }
  ],
  FI: [
    { city: 'helsinki', slug: 'helsinki-airport-helsinki', iata: 'HEL', from: 'Helsinki', to: 'Helsinki', usd: 68, cur: 'EUR' }
  ],
  RO: [
    { city: 'bucharest', slug: 'bucharest-henri-coanda-airport-bucharest', iata: 'OTP', from: 'Bükreş', to: 'Bükreş', usd: 48, cur: 'EUR' }
  ],
  BG: [
    { city: 'sofia', slug: 'taxi-from-sofia-airport-to-sofia', iata: 'SOF', from: 'Sofya', to: 'Sofya', usd: 36, cur: 'EUR' },
    { city: 'varna', slug: 'taxi-from-varna-airport-to-varna', iata: 'VAR', from: 'Varna', to: 'Varna', usd: 39, cur: 'EUR' },
    { city: 'burgas', slug: 'taxi-from-burgas-airport-to-nessebar', iata: 'BOJ', from: 'Burgaz', to: 'Nessebar', usd: 53, cur: 'EUR' }
  ],
  SI: [
    { city: 'ljubljana', slug: 'ljubljana-airport-ljubljana', iata: 'LJU', from: 'Ljubljana', to: 'Ljubljana', usd: 53, cur: 'EUR' },
    { city: 'bled', slug: 'ljubljana-airport-bled', iata: 'LJU', from: 'Ljubljana', to: 'Bled', usd: 77, cur: 'EUR' }
  ],
  RS: [
    { city: 'belgrade', slug: 'belgrade-airport-nikola-tesla-belgrade', iata: 'BEG', from: 'Belgrad', to: 'Belgrad', usd: 41, cur: 'EUR' }
  ],
  EE: [
    { city: 'tallinn', slug: 'tallinn-airport-tallinn', iata: 'TLL', from: 'Tallinn', to: 'Tallinn', usd: 38, cur: 'EUR' }
  ],
  AZ: [
    { city: 'baku', slug: 'taxi-from-baku-airport-to-baku', iata: 'GYD', from: 'Bakü', to: 'Bakü', usd: 30 }
  ],
  UZ: [
    { city: 'tashkent', slug: 'tashkent-airport-tashkent', iata: 'TAS', from: 'Taşkent', to: 'Taşkent', usd: 37 },
    { city: 'samarkand', slug: 'samarkand-airport-samarkand', iata: 'SKD', from: 'Semerkant', to: 'Semerkant', usd: 37 }
  ],
  KZ: [
    { city: 'almaty', slug: 'almaty-airport-almaty', iata: 'ALA', from: 'Almatı', to: 'Almatı', usd: 32 },
    { city: 'astana', slug: 'nur-sultan-astana-airport-nur-sultan-astana', iata: 'NQZ', from: 'Astana', to: 'Astana', usd: 38 }
  ],
  OM: [
    { city: 'muscat', slug: 'muscat-airport-muscat', iata: 'MCT', from: 'Maskat', to: 'Maskat', usd: 63 }
  ],
  TW: [
    { city: 'taipei', slug: 'taxi-from-taoyuan-airport-to-taipei', iata: 'TPE', from: 'Taoyuan', to: 'Taipei', usd: 75 }
  ],
  KH: [
    { city: 'siem-reap', slug: 'angkor-international-airport-siem-reap', iata: 'SAI', from: 'Siem Reap', to: 'Siem Reap', usd: 55 },
    { city: 'phnom-penh', slug: 'phnom-penh-airport-kh-phnom-penh', iata: 'KTI', from: 'Phnom Penh', to: 'Phnom Penh', usd: 60 }
  ],
  KE: [
    { city: 'nairobi', slug: 'nairobi-airport-jomo-kenyatta-nairobi', iata: 'NBO', from: 'Nairobi', to: 'Nairobi', usd: 75 },
    { city: 'mombasa', slug: 'moi-airport-mombasa', iata: 'MBA', from: 'Mombasa', to: 'Mombasa', usd: 64 }
  ],
  TZ: [
    { city: 'zanzibar', slug: 'zanzibar-city-airport-zanzibar', iata: 'ZNZ', from: 'Zanzibar', to: 'Zanzibar', usd: 35 },
    { city: 'arusha', slug: 'arusha-airport-arusha', iata: 'ARK', from: 'Arusha', to: 'Arusha', usd: 58 }
  ],
  CA: [
    { city: 'toronto', slug: 'toronto-billy-bishop-airport-toronto', iata: 'YTZ', from: 'Billy Bishop', to: 'Toronto', usd: 75 },
    { city: 'vancouver', slug: 'vancouver-airport-vancouver', iata: 'YVR', from: 'Vancouver', to: 'Vancouver', usd: 75 }
  ],
  MY: [
    { city: 'kuala-lumpur', slug: 'taxi-from-kuala-lumpur-airport-to-kuala-lumpur', iata: 'KUL', from: 'Kuala Lumpur', to: 'Kuala Lumpur', usd: 45 },
    { city: 'langkawi', slug: 'langkawi-airport-langkawi', iata: 'LGK', from: 'Langkawi', to: 'Langkawi', usd: 45 },
    { city: 'penang', slug: 'penang-airport-penang', iata: 'PEN', from: 'Penang', to: 'George Town', usd: 41 }
  ],
  PL: [
    { city: 'warsaw', slug: 'taxi-from-chopin-airport-to-warsaw', iata: 'WAW', from: 'Varşova', to: 'Varşova', usd: 41, cur: 'EUR' },
    { city: 'krakow', slug: 'taxi-from-krakow-airport-to-krakow', iata: 'KRK', from: 'Krakov', to: 'Krakov', usd: 38, cur: 'EUR' }
  ],
  HR: [
    { city: 'dubrovnik', slug: 'taxi-from-dubrovnik-airport-to-dubrovnik', iata: 'DBV', from: 'Dubrovnik', to: 'Dubrovnik', usd: 53, cur: 'EUR' },
    { city: 'split', slug: 'taxi-from-split-airport-to-split', iata: 'SPU', from: 'Split', to: 'Split', usd: 45, cur: 'EUR' }
  ],
  HU: [
    { city: 'budapest', slug: 'taxi-from-budapest-airport-to-budapest', iata: 'BUD', from: 'Budapeşte', to: 'Budapeşte', usd: 55, cur: 'EUR' }
  ],
  EG: [
    { city: 'cairo', slug: 'cairo-airport-cairo', iata: 'CAI', from: 'Kahire', to: 'Kahire', usd: 44 },
    { city: 'hurghada', slug: 'hurghada-airport-hurghada', iata: 'HRG', from: 'Hurgada', to: 'Hurgada', usd: 26 },
    { city: 'sharm', slug: 'sharm-el-sheikh-airport-sharm-el-sheikh', iata: 'SSH', from: 'Şarm El Şeyh', to: 'Şarm El Şeyh', usd: 28 }
  ],
  MA: [
    { city: 'marrakech', slug: 'menara-airport-marrakech', iata: 'RAK', from: 'Marakeş', to: 'Marakeş', usd: 29 },
    { city: 'casablanca', slug: 'casablanca-mohammed-v-airport-casablanca', iata: 'CMN', from: 'Kazablanka', to: 'Kazablanka', usd: 38 }
  ],
  VN: [
    { city: 'hanoi', slug: 'hanoi-noi-bai-airport-hanoi', iata: 'HAN', from: 'Hanoi', to: 'Hanoi', usd: 29 },
    { city: 'ho-chi-minh', slug: 'ho-chi-minh-airport-ho-chi-minh', iata: 'SGN', from: 'Ho Chi Minh', to: 'Ho Chi Minh', usd: 30 },
    { city: 'da-nang', slug: 'da-nang-airport-da-nang', iata: 'DAD', from: 'Da Nang', to: 'Da Nang', usd: 29 }
  ],
  ID: [
    { city: 'bali', slug: 'taxi-from-bali-airport-to-kuta', iata: 'DPS', from: 'Bali', to: 'Kuta', usd: 21 },
    { city: 'jakarta', slug: 'soekarno-hatta-airport-jakarta', iata: 'CGK', from: 'Cakarta', to: 'Cakarta', usd: 39 }
  ],
  CH: [
    { city: 'zurich', slug: 'zurich-airport-zurich', iata: 'ZRH', from: 'Zürih', to: 'Zürih', usd: 90, cur: 'EUR' },
    { city: 'geneva', slug: 'taxi-from-geneva-airport-to-geneva', iata: 'GVA', from: 'Cenevre', to: 'Cenevre', usd: 77, cur: 'EUR' }
  ],
  CZ: [
    { city: 'prague', slug: 'taxi-from-prague-airport-to-prague', iata: 'PRG', from: 'Prag', to: 'Prag', usd: 43, cur: 'EUR' }
  ],
  SG: [
    { city: 'singapore', slug: 'singapore-airport-singapore', iata: 'SIN', from: 'Changi', to: 'Singapur', usd: 60 }
  ],
  IN: [
    { city: 'delhi', slug: 'delhi-airport-delhi', iata: 'DEL', from: 'Delhi', to: 'Yeni Delhi', usd: 93 },
    { city: 'mumbai', slug: 'mumbai-airport-mumbai', iata: 'BOM', from: 'Mumbai', to: 'Mumbai', usd: 45 },
    { city: 'goa', slug: 'taxi-from-goa-airport-to-baga', iata: 'GOI', from: 'Goa', to: 'Baga', usd: 48 }
  ],
  DK: [
    { city: 'copenhagen', slug: 'copenhagen-kastrup-airport-copenhagen', iata: 'CPH', from: 'Kopenhag', to: 'Kopenhag', usd: 84, cur: 'EUR' }
  ],
  IE: [
    { city: 'dublin', slug: 'taxi-from-dublin-airport-to-dublin', iata: 'DUB', from: 'Dublin', to: 'Dublin', usd: 71, cur: 'EUR' }
  ],
  HK: [
    { city: 'hong-kong', slug: 'hong-kong-airport-hong-kong', iata: 'HKG', from: 'Hong Kong', to: 'Hong Kong', usd: 65 }
  ],
  BR: [
    { city: 'sao-paulo', slug: 'guarulhos-guarulhos-airport-sao-paulo', iata: 'GRU', from: 'São Paulo', to: 'São Paulo', usd: 53 }
  ],
  SA: [
    { city: 'jeddah', slug: 'jeddah-airport-medina', iata: 'JED', from: 'Cidde', to: 'Medine', usd: 136 }
  ],
  AT: [
    { city: 'vienna', slug: 'taxi-from-vienna-airport-to-vienna', iata: 'VIE', from: 'Viyana', to: 'Viyana', usd: 62, cur: 'EUR' },
    { city: 'innsbruck', slug: 'innsbruck-airport-innsbruck', iata: 'INN', from: 'Innsbruck', to: 'Innsbruck', usd: 56, cur: 'EUR' }
  ],
  CN: [
    { city: 'beijing', slug: 'beijing-airport-beijing', iata: 'PEK', from: 'Pekin', to: 'Pekin', usd: 41 },
    { city: 'shanghai', slug: 'shanghai-hongqiao-airport-shanghai', iata: 'SHA', from: 'Hongqiao', to: 'Şanghay', usd: 43 },
    { city: 'guangzhou', slug: 'guangzhou-baiyun-airport-guangzhou', iata: 'CAN', from: 'Guangzhou', to: 'Guangzhou', usd: 43 }
  ],
  AE: [
    { city: 'dubai', slug: 'taxi-from-dubai-airport-to-downtown', iata: 'DXB', from: 'Dubai', to: 'Downtown Dubai', usd: 37 },
    { city: 'dubai', slug: 'taxi-from-dubai-airport-to-dubai-marina', iata: 'DXB', from: 'Dubai', to: 'Dubai Marina', usd: 38 },
    { city: 'abu-dhabi', slug: 'taxi-from-dubai-airport-to-abu-dhabi', iata: 'DXB', from: 'Dubai', to: 'Abu Dabi', usd: 73 }
  ],
  PT: [
    { city: 'lisbon', slug: 'humberto-delgado-airport-lisbon', iata: 'LIS', from: 'Lizbon', to: 'Lizbon', usd: 34, cur: 'EUR' },
    { city: 'lisbon', slug: 'humberto-delgado-airport-sintra', iata: 'LIS', from: 'Lizbon', to: 'Sintra', usd: 49, cur: 'EUR' },
    { city: 'lisbon', slug: 'taxi-from-lisbon-airport-to-cascais', iata: 'LIS', from: 'Lizbon', to: 'Cascais', usd: 50, cur: 'EUR' },
    { city: 'porto', slug: 'porto-airport-porto', iata: 'OPO', from: 'Porto', to: 'Porto', usd: 42, cur: 'EUR' },
    { city: 'algarve', slug: 'faro-airport-albufeira', iata: 'FAO', from: 'Faro', to: 'Albufeira', usd: 38, cur: 'EUR' },
    { city: 'madeira', slug: 'madeira-airport-funchal', iata: 'FNC', from: 'Madeira', to: 'Funchal', usd: 33, cur: 'EUR' }
  ],
  MX: [
    { city: 'cancun', slug: 'cancun-airport-playa-del-carmen', iata: 'CUN', from: 'Cancún', to: 'Playa del Carmen', usd: 80 },
    { city: 'cancun', slug: 'cancun-airport-tulum', iata: 'CUN', from: 'Cancún', to: 'Tulum', usd: 96 },
    { city: 'mexico-city', slug: 'mexico-city-airport-condesa-district-mexico-city', iata: 'MEX', from: 'Mexico City', to: 'Condesa', usd: 47 }
  ],
  GB: [
    { city: 'london', slug: 'taxi-from-heathrow-airport-to-central-london', iata: 'LHR', from: 'Heathrow', to: 'Central London', usd: 85, cur: 'EUR' },
    { city: 'london', slug: 'taxi-from-gatwick-airport-to-central-london', iata: 'LGW', from: 'Gatwick', to: 'Central London', usd: 111, cur: 'EUR' },
    { city: 'edinburgh', slug: 'edinburgh-airport-edinburgh', iata: 'EDI', from: 'Edinburgh', to: 'Edinburgh', usd: 69, cur: 'EUR' },
    { city: 'glasgow', slug: 'glasgow-airport-glasgow', iata: 'GLA', from: 'Glasgow', to: 'Glasgow', usd: 84, cur: 'EUR' },
    { city: 'manchester', slug: 'taxi-from-manchester-airport-to-manchester', iata: 'MAN', from: 'Manchester', to: 'Manchester', usd: 52, cur: 'EUR' }
  ],
  DE: [
    { city: 'berlin', slug: 'berlin-airport-berlin', iata: 'BER', from: 'Berlin', to: 'Berlin', usd: 73, cur: 'EUR' },
    { city: 'munich', slug: 'taxi-from-munich-airport-to-munich', iata: 'MUC', from: 'München', to: 'München', usd: 104, cur: 'EUR' },
    { city: 'frankfurt', slug: 'frankfurt-airport-frankfurt-am-main', iata: 'FRA', from: 'Frankfurt', to: 'Frankfurt', usd: 55, cur: 'EUR' },
    { city: 'hamburg', slug: 'hamburg-airport-hamburg', iata: 'HAM', from: 'Hamburg', to: 'Hamburg', usd: 89, cur: 'EUR' }
  ],
  JP: [
    { city: 'tokyo', slug: 'narita-airport-tokyo-shinjuku-train-station', iata: 'NRT', from: 'Narita', to: 'Shinjuku', usd: 183 },
    { city: 'osaka', slug: 'kansai-airport-shin-osaka-train-station-train-station', iata: 'KIX', from: 'Kansai', to: 'Shin-Osaka', usd: 197 },
    { city: 'sapporo', slug: 'new-chitose-airport-sapporo', iata: 'CTS', from: 'New Chitose', to: 'Sapporo', usd: 205 },
    { city: 'fukuoka', slug: 'fukuoka-airport-fukuoka', iata: 'FUK', from: 'Fukuoka', to: 'Fukuoka', usd: 131 },
    { city: 'okinawa', slug: 'naha-airport-naha', iata: 'OKA', from: 'Naha', to: 'Naha', usd: 103 }
  ],
  GR: [
    { city: 'athens', slug: 'taxi-from-athens-airport-to-athens', iata: 'ATH', from: 'Atina', to: 'Atina', usd: 48, cur: 'EUR' },
    { city: 'athens', slug: 'taxi-from-athens-airport-to-piraeus-port', iata: 'ATH', from: 'Atina', to: 'Pire Limanı', usd: 38, cur: 'EUR' },
    { city: 'santorini', slug: 'santorini-airport-oia-santorini', iata: 'JTR', from: 'Santorini', to: 'Oia', usd: 47, cur: 'EUR' },
    { city: 'mykonos', slug: 'mykonos-airport-mykonos-town', iata: 'JMK', from: 'Mikonos', to: 'Mikonos Kasabası', usd: 48, cur: 'EUR' },
    { city: 'crete', slug: 'heraklion-airport-heraklion', iata: 'HER', from: 'Kandiye', to: 'Kandiye', usd: 32, cur: 'EUR' },
    { city: 'crete', slug: 'chania-airport-chania-town', iata: 'CHQ', from: 'Hanya', to: 'Hanya', usd: 38, cur: 'EUR' },
    { city: 'thessaloniki', slug: 'thessaloniki-airport-thessaloniki', iata: 'SKG', from: 'Selanik', to: 'Selanik', usd: 39, cur: 'EUR' }
  ],
  FR: [
    { city: 'paris', slug: 'taxi-from-paris-airport-to-paris', iata: 'CDG', from: 'Charles de Gaulle', to: 'Paris', usd: 84, cur: 'EUR' },
    { city: 'paris', slug: 'orly-airport-paris', iata: 'ORY', from: 'Orly', to: 'Paris', usd: 71, cur: 'EUR' },
    { city: 'paris', slug: 'taxi-from-charles-de-gaulle-airport-to-disneyland-paris', iata: 'CDG', from: 'Charles de Gaulle', to: 'Disneyland Paris', usd: 72, cur: 'EUR' },
    { city: 'nice', slug: 'taxi-from-nice-airport-to-nice', iata: 'NCE', from: 'Nice', to: 'Nice', usd: 50, cur: 'EUR' },
    { city: 'nice', slug: 'taxi-from-nice-airport-to-cannes', iata: 'NCE', from: 'Nice', to: 'Cannes', usd: 87, cur: 'EUR' },
    { city: 'nice', slug: 'nice-airport-monaco', iata: 'NCE', from: 'Nice', to: 'Monaco', usd: 113, cur: 'EUR' },
    { city: 'lyon', slug: 'lyon-airport-lyon', iata: 'LYS', from: 'Lyon', to: 'Lyon', usd: 78, cur: 'EUR' },
    { city: 'marseille', slug: 'marseille-airport-marseille', iata: 'MRS', from: 'Marseille', to: 'Marseille', usd: 85, cur: 'EUR' }
  ],
  ES: [
    { city: 'madrid', slug: 'madrid-airport-madrid', iata: 'MAD', from: 'Madrid Barajas', to: 'Madrid', usd: 71, cur: 'EUR' },
    { city: 'barcelona', slug: 'taxi-from-el-prat-airport-to-barcelona', iata: 'BCN', from: 'Barcelona El Prat', to: 'Barcelona', usd: 60, cur: 'EUR' },
    { city: 'malaga', slug: 'taxi-from-malaga-airport-to-city-centre', iata: 'AGP', from: 'Málaga', to: 'Málaga', usd: 43, cur: 'EUR' },
    { city: 'malaga', slug: 'taxi-from-malaga-airport-to-marbella', iata: 'AGP', from: 'Málaga', to: 'Marbella', usd: 92, cur: 'EUR' },
    { city: 'palma', slug: 'palma-de-mallorca-airport-palma-palma-de-mallorca', iata: 'PMI', from: 'Palma', to: 'Palma', usd: 57, cur: 'EUR' },
    { city: 'tenerife', slug: 'tenerife-south-airport-los-cristianos', iata: 'TFS', from: 'Tenerife Sur', to: 'Los Cristianos', usd: 51, cur: 'EUR' },
    { city: 'alicante', slug: 'taxi-from-alicante-airport-to-benidorm', iata: 'ALC', from: 'Alicante', to: 'Benidorm', usd: 96, cur: 'EUR' },
    { city: 'seville', slug: 'sevilla-airport-seville', iata: 'SVQ', from: 'Sevilla', to: 'Sevilla', usd: 43, cur: 'EUR' }
  ],
  US: [
    { city: 'new-york', slug: 'new-york-airport-kennedy-manhattan', iata: 'JFK', from: 'JFK', to: 'Manhattan', usd: 102 },
    { city: 'new-york', slug: 'newark-liberty-airport-manhattan', iata: 'EWR', from: 'Newark', to: 'Manhattan', usd: 87 },
    { city: 'los-angeles', slug: 'taxi-from-los-angeles-airport-to-los-angeles-downtown', iata: 'LAX', from: 'Los Angeles', to: 'Downtown LA', usd: 80 },
    { city: 'miami', slug: 'miami-airport-miami-south-beach', iata: 'MIA', from: 'Miami', to: 'South Beach', usd: 65 },
    { city: 'las-vegas', slug: 'mccarran-airport-strip-district-las-vegas', iata: 'LAS', from: 'Las Vegas', to: 'Las Vegas Strip', usd: 60 }
  ],
  TR: [
    { city: 'istanbul', slug: 'new-istanbul-airport-airport-istanbul-sultanahmet', iata: 'IST', from: 'İstanbul Havalimanı', to: 'Sultanahmet', usd: 46, cur: 'EUR' },
    { city: 'istanbul', slug: 'sabiha-gokcen-airport-istanbul-istanbul-sultanahmet', iata: 'SAW', from: 'Sabiha Gökçen', to: 'Sultanahmet', usd: 57, cur: 'EUR' },
    { city: 'antalya', slug: 'antalya-airport-konyaalti', iata: 'AYT', from: 'Antalya', to: 'Konyaaltı', usd: 36, cur: 'EUR' },
    { city: 'bodrum', slug: 'bodrum-airport-bodrum', iata: 'BJV', from: 'Bodrum', to: 'Bodrum', usd: 50, cur: 'EUR' },
    { city: 'dalaman', slug: 'taxi-from-dalaman-airport-to-fethiye', iata: 'DLM', from: 'Dalaman', to: 'Fethiye', usd: 55, cur: 'EUR' },
    { city: 'dalaman', slug: 'dalaman-airport-kidrak-oludeniz', iata: 'DLM', from: 'Dalaman', to: 'Ölüdeniz', usd: 62, cur: 'EUR' },
    { city: 'izmir', slug: 'izmir-airport-cesme', iata: 'ADB', from: 'İzmir', to: 'Çeşme', usd: 68, cur: 'EUR' },
    { city: 'cappadocia', slug: 'nevsehir-airport-goreme', iata: 'NAV', from: 'Nevşehir Kapadokya', to: 'Göreme', usd: 65, cur: 'EUR' }
  ],
  IT: [
    { city: 'rome', slug: 'fiumicino-rome', iata: 'FCO', from: 'Fiumicino', to: 'Roma', usd: 81, cur: 'EUR' },
    { city: 'milan', slug: 'milan-linate-airport-milan', iata: 'LIN', from: 'Linate', to: 'Milano', usd: 75, cur: 'EUR' },
    { city: 'milan', slug: 'taxi-from-malpensa-airport-to-milan', iata: 'MXP', from: 'Malpensa', to: 'Milano', usd: 131, cur: 'EUR' },
    { city: 'venice', slug: 'venice-airport-venice', iata: 'VCE', from: 'Venezia', to: 'Venezia', usd: 68, cur: 'EUR' },
    { city: 'naples', slug: 'taxi-from-naples-airport-to-naples', iata: 'NAP', from: 'Napoli', to: 'Napoli', usd: 48, cur: 'EUR' },
    { city: 'naples', slug: 'taxi-from-naples-airport-to-sorrento', iata: 'NAP', from: 'Napoli', to: 'Sorrento', usd: 142, cur: 'EUR' }
  ],
  TH: [
    { city: 'bangkok', slug: 'suvarnabhumi-airport-bangkok-city', iata: 'BKK', from: 'Suvarnabhumi', to: 'Bangkok', usd: 32 },
    { city: 'bangkok', slug: 'don-mueang-airport-bangkok-city', iata: 'DMK', from: 'Don Mueang', to: 'Bangkok', usd: 32 },
    { city: 'pattaya', slug: 'taxi-from-suvarnabhumi-airport-to-pattaya', iata: 'BKK', from: 'Suvarnabhumi', to: 'Pattaya', usd: 49 },
    { city: 'phuket', slug: 'taxi-from-phuket-airport-to-patong', iata: 'HKT', from: 'Phuket', to: 'Patong', usd: 33 },
    { city: 'chiang-mai', slug: 'chiang-mai-airport-chiang-mai', iata: 'CNX', from: 'Chiang Mai', to: 'Chiang Mai', usd: 29 },
    { city: 'krabi', slug: 'krabi-airport-ao-nang', iata: 'KBV', from: 'Krabi', to: 'Ao Nang', usd: 35 }
  ]
};

const KIWI_LANGS = new Set(['en', 'de', 'es', 'ru']);
export const kiwiRouteUrl = (code: string, slug: string, lang: string) =>
  `https://kiwitaxi.com/${KIWI_LANGS.has(lang) ? lang : 'en'}/${KIWI_COUNTRY[code]}/${slug}`;

/** Motor/scooter kiralama: Rentalmotorbike (Daisycon) şehir sayfaları; tıklayınca o şehrin kiralama listesi açılır */
export const SCOOTER_CITIES: Record<string, { slug: string; name: string }[]> = {
  TH: [
    { slug: 'phuket', name: 'Phuket' },
    { slug: 'bangkok', name: 'Bangkok' },
    { slug: 'chiang-mai', name: 'Chiang Mai' },
    { slug: 'pattaya', name: 'Pattaya' }
  ]
};
export const scooterUrl = (slug: string) => `https://partners.rentalmotorbike.com/c/?si=22012&li=1928984&wi=442794&dl=${encodeURIComponent(`motorcycle-rental-${slug}`)}`;
