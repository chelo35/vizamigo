/**
 * Havalimanı → şehir transfer rotaları (Kiwitaxi rota sayfaları).
 * from: Kiwitaxi'nin o rotadaki en düşük araç fiyatı (USD, araç başı, sabit).
 * Fiyatlar elle alınmış anlık değerlerdir; sayfada "yaklaşık, başlayan" diye gösterilir.
 * Son kontrol: 2026-11-11
 */
/** usd: fiyat; cur 'EUR' ise değer euro'dur (Kiwitaxi o ülke sayfasında fiyatı euro gösteriyor) */
export type TransferRoute = { slug: string; from: string; to: string; iata: string; usd: number; cur?: 'EUR'; city?: string };

export const KIWI_COUNTRY: Record<string, string> = { TH: 'thailand', FR: 'france', ES: 'spain', US: 'usa', TR: 'turkey', IT: 'italy' };

export const TRANSFER_ROUTES: Record<string, TransferRoute[]> = {
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
