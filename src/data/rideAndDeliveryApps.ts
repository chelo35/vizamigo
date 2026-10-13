/**
 * Vizamigo - Curated Ride-Hailing & Local Delivery Apps Registry
 * Provides verified local taxi, rideshare, and delivery apps with direct URLs and nomad tips.
 */

export interface NomadAppInfo {
  name: string;
  category: 'ride' | 'delivery' | 'both';
  categoryLabelTr: string;
  categoryLabelEn: string;
  url: string;
  taglineTr: string;
  taglineEn: string;
  recommendedReasonTr: string;
  recommendedReasonEn: string;
}

// Master Directory of International Ride & Delivery Ecosystems
export const MASTER_APPS_DIRECTORY: Record<string, NomadAppInfo> = {
  // Southeast Asia
  Grab: {
    name: 'Grab',
    category: 'both',
    categoryLabelTr: 'Taksi, Araç & Yemek',
    categoryLabelEn: 'Ride-Hailing & Food',
    url: 'https://www.grab.com',
    taglineTr: 'Güneydoğu Asya’nın 1 Numaralı Süper Uygulaması',
    taglineEn: 'Southeast Asia’s Leading Superapp',
    recommendedReasonTr: 'Taksimetre pazarlığına girmeyin; kartla ödeyin, fiyatı baştan sabitleyin.',
    recommendedReasonEn: 'Upfront fares, cashless card payment, and live GPS safety tracking.'
  },
  Bolt: {
    name: 'Bolt',
    category: 'both',
    categoryLabelTr: 'Taksi, Scooter & Yemek',
    categoryLabelEn: 'Ride-Hailing & Food Delivery',
    url: 'https://bolt.eu',
    taglineTr: 'Avrupa, Kafkaslar ve Afrika’da Hızlı & Uygun Fiyatlı',
    taglineEn: 'Fast & Affordable Rides Across Europe & Caucasus',
    recommendedReasonTr: 'Uber’den daha uygun komisyon ve çok hızlı araç bulma imkanı sunar.',
    recommendedReasonEn: 'Often cheaper than Uber with rapid driver dispatch.'
  },
  Careem: {
    name: 'Careem',
    category: 'both',
    categoryLabelTr: 'Hala Taksi & Yemek Teslimatı',
    categoryLabelEn: 'Official Hala Taxi & Food',
    url: 'https://www.careem.com',
    taglineTr: 'Orta Doğu & Körfez’in Resmi Taksi ve Yaşam Uygulaması',
    taglineEn: 'Middle East & Gulf Official Taxi App',
    recommendedReasonTr: 'Dubai, Suudi Arabistan ve Ürdün’de resmi taksiler dahil sabit fiyatla çağrılır.',
    recommendedReasonEn: 'Direct integration with Dubai RTA Hala Taxis with regulated fares.'
  },
  'Kakao T': {
    name: 'Kakao T (Kakao Taxi)',
    category: 'ride',
    categoryLabelTr: 'Güney Kore Resmi Taksi',
    categoryLabelEn: 'Official Korea Taxi App',
    url: 'https://www.kakaomobility.com',
    taglineTr: 'Kore’de Sokaktan Taksi Aramaya Son',
    taglineEn: 'The Essential Ride-Hailing App for South Korea',
    recommendedReasonTr: 'Kore’de sokakta taksi durdurmak zordur; Kakao T yabancı kartları da destekler.',
    recommendedReasonEn: 'Crucial in Korea where street hailing is difficult; supports international cards.'
  },
  'Yandex Go': {
    name: 'Yandex Go',
    category: 'both',
    categoryLabelTr: 'Taksi, Kurye & Market',
    categoryLabelEn: 'Ride-Hailing & Delivery',
    url: 'https://go.yandex.com',
    taglineTr: 'Kafkaslar & Orta Asya’da En Yaygın Filo',
    taglineEn: 'Ubiquitous Across Caucasus & Central Asia',
    recommendedReasonTr: 'Gürcistan, Kazakistan, Özbekistan ve Ermenistan’da en yoğun araç ağına sahiptir.',
    recommendedReasonEn: 'Largest vehicle fleet across Georgia, Kazakhstan, and Uzbekistan.'
  },
  'GO (GO Inc.)': {
    name: 'GO Taxi Japan',
    category: 'ride',
    categoryLabelTr: 'Japonya Lisanslı Taksi',
    categoryLabelEn: 'Licensed Japan Taxi',
    url: 'https://go.goinc.jp',
    taglineTr: 'Tokyo ve Kyoto’da En Hızlı Çağırma',
    taglineEn: 'Fastest Taxi Dispatch in Tokyo & Kyoto',
    recommendedReasonTr: 'Japonya’da korsan taksi yasaktır; GO lisanslı taksileri tek tuşla çağırır.',
    recommendedReasonEn: 'Dispatches strictly licensed official Japanese cabs with fixed meters.'
  },
  Gojek: {
    name: 'Gojek',
    category: 'both',
    categoryLabelTr: 'Motosiklet Taksi & Yemek (Bali/Cakarta)',
    categoryLabelEn: 'Bike Taxi & Food (Bali/Jakarta)',
    url: 'https://www.gojek.com',
    taglineTr: 'Endonezya’nın Milli Yaşam Uygulaması',
    taglineEn: 'Indonesia’s Iconic Daily Superapp',
    recommendedReasonTr: 'Bali trafiğini motosiklet taksi (GoRide) ile aşın; GoFood ile sipariş verin.',
    recommendedReasonEn: 'Beat Bali traffic with GoRide motorbike taxis and cheap GoFood orders.'
  },
  Uber: {
    name: 'Uber',
    category: 'both',
    categoryLabelTr: 'Global Araç & Uber Eats',
    categoryLabelEn: 'Global Rides & Uber Eats',
    url: 'https://www.uber.com',
    taglineTr: '70+ Ülkede Uluslararası Standart',
    taglineEn: 'Global Standard in 70+ Countries',
    recommendedReasonTr: 'Uluslararası hesabınızla yeni uygulama indirmeden doğrudan kullanın.',
    recommendedReasonEn: 'Works seamlessly worldwide with existing account and payment methods.'
  },
  InDrive: {
    name: 'InDrive',
    category: 'ride',
    categoryLabelTr: 'Pazarlıklı / Teklifli Taksi',
    categoryLabelEn: 'Bid Your Own Fare',
    url: 'https://indrive.com',
    taglineTr: 'Fiyatı Sizin Belirlediğiniz Model',
    taglineEn: 'Negotiate Fares Directly with Drivers',
    recommendedReasonTr: 'Yolculuk ücretini siz teklif edersiniz, sürücüler kabul eder. Çok ekonomiktir.',
    recommendedReasonEn: 'Set your own fare and choose from driver bids. Very economical.'
  },
  FreeNow: {
    name: 'FREENOW',
    category: 'ride',
    categoryLabelTr: 'Avrupa Resmi Taksi & Ride',
    categoryLabelEn: 'Europe Official Taxi & Rides',
    url: 'https://free-now.com',
    taglineTr: 'Almanya, İspanya, İrlanda & İngiltere’de Lider',
    taglineEn: 'Leading Taxi App in Germany, Spain & UK',
    recommendedReasonTr: 'Avrupa şehirlerinde resmi taksi duraklarına bağlanır, fiş garantisi sunar.',
    recommendedReasonEn: 'Direct integration with European city taxi fleets with VAT receipts.'
  },
  BiTaksi: {
    name: 'BiTaksi',
    category: 'ride',
    categoryLabelTr: 'Türkiye Resmi Sarı/Turkuaz Taksi',
    categoryLabelEn: 'Turkey Official Taxi App',
    url: 'https://www.bitaksi.com',
    taglineTr: 'Türkiye’nin İlk Taksi Çağırma Platformu',
    taglineEn: 'Turkey’s Pioneer Taxi-Hailing Service',
    recommendedReasonTr: 'Kartla güvenli ödeme, rota takibi ve sürücü puanlama imkanı sağlar.',
    recommendedReasonEn: 'Card payment in Turkish Lira with driver rating and route tracking.'
  },
  Wolt: {
    name: 'Wolt',
    category: 'delivery',
    categoryLabelTr: 'Restoran & Market Teslimatı',
    categoryLabelEn: 'Restaurant & Grocery Delivery',
    url: 'https://wolt.com',
    taglineTr: 'Kafkaslar, Doğu Avrupa ve İskandinavya’da Popüler',
    taglineEn: 'Top-tier Delivery in Georgia, Nordics & CEE',
    recommendedReasonTr: 'Tiflis, Bakü ve Avrupa şehirlerinde en kaliteli restoranları kapıya getirir.',
    recommendedReasonEn: 'Flawless UI, multi-language support, and swift courier delivery.'
  },
  Talabat: {
    name: 'Talabat',
    category: 'delivery',
    categoryLabelTr: 'Körfez & Orta Doğu Yemek Siparişi',
    categoryLabelEn: 'Gulf & Middle East Food Delivery',
    url: 'https://www.talabat.com',
    taglineTr: 'BAE, Katar, Kuveyt & Mısır’da Lider',
    taglineEn: 'Leader Across UAE, Qatar, Kuwait & Egypt',
    recommendedReasonTr: 'Orta Doğu’da yüz binlerce restoran ve 20 dakikada market teslimatı.',
    recommendedReasonEn: 'Extensive restaurant network and 20-min grocery delivery in the Gulf.'
  },
  Deliveroo: {
    name: 'Deliveroo',
    category: 'delivery',
    categoryLabelTr: 'Premium Restoran Teslimatı',
    categoryLabelEn: 'Gourmet Food Delivery',
    url: 'https://deliveroo.com',
    taglineTr: 'İngiltere, Fransa, İtalya & BAE’de Yaygın',
    taglineEn: 'Popular in UK, France, Italy & UAE',
    recommendedReasonTr: 'Gurme restoranlar ve hızlı kurye takibi.',
    recommendedReasonEn: 'High-end dining options and live courier tracking.'
  }
};

// Countries where Uber permanently folded or does not operate (e.g. Southeast Asia, CIS, Balkans)
const UBER_INACTIVE_COUNTRIES = new Set([
  'TH', 'VN', 'ID', 'MY', 'SG', 'PH', 'KH', 'LA', 'MM', 'BN',
  'CN', 'RU', 'BY', 'KZ', 'UZ', 'KG', 'TJ', 'TM', 'AZ', 'AM', 'GE', 'MD',
  'AL', 'BA', 'ME', 'MK', 'XK', 'RS', 'BG', 'CY', 'IS'
]);

/**
 * Returns prioritized local apps for a given country code
 */
export function getCountryNomadApps(code: string, knownRideApps: string[] = []): NomadAppInfo[] {
  const result: NomadAppInfo[] = [];
  const addedNames = new Set<string>();
  const c = code.toUpperCase();

  // Helper to add from master directory
  const tryAdd = (key: string) => {
    // Never add Uber if it has folded or does not operate in this country
    if (key.toLowerCase().includes('uber') && UBER_INACTIVE_COUNTRIES.has(c)) {
      return;
    }
    // Exact or loose match
    for (const [dirKey, app] of Object.entries(MASTER_APPS_DIRECTORY)) {
      if (
        (dirKey.toLowerCase() === key.toLowerCase() ||
          key.toLowerCase().includes(dirKey.toLowerCase()) ||
          dirKey.toLowerCase().includes(key.toLowerCase())) &&
        !addedNames.has(app.name)
      ) {
        if (app.name.toLowerCase().includes('uber') && UBER_INACTIVE_COUNTRIES.has(c)) {
          return;
        }
        result.push(app);
        addedNames.add(app.name);
        return;
      }
    }
  };

  // 1. First add known ride apps passed from insights
  knownRideApps.forEach(appName => tryAdd(appName));

  // 2. Add region-specific delivery & ride apps
  if (['GE', 'AZ', 'KZ', 'PL', 'CZ', 'HU', 'HR', 'RS', 'GR', 'CY', 'IL', 'NO', 'SE', 'FI', 'DK', 'EE', 'LV', 'LT'].includes(c)) {
    tryAdd('Wolt');
  }
  if (['AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'JO', 'EG'].includes(c)) {
    tryAdd('Careem');
    tryAdd('Talabat');
  }
  if (['TH', 'VN', 'MY', 'SG', 'ID', 'PH'].includes(c)) {
    tryAdd('Grab');
    if (c === 'TH') tryAdd('Bolt');
    if (c === 'ID') tryAdd('Gojek');
  }
  if (['GB', 'FR', 'IT', 'BE', 'NL', 'IE'].includes(c)) {
    tryAdd('Deliveroo');
  }

  // 3. Fallbacks if list is too small
  if (result.length < 2) {
    tryAdd('Bolt');
    if (!UBER_INACTIVE_COUNTRIES.has(c)) {
      tryAdd('Uber');
    } else {
      tryAdd('InDrive');
    }
  }

  return result.slice(0, 4);
}
