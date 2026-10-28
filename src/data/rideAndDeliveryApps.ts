/**
 * Vizamigo - Curated Global & Local Super-App Ecosystem Registry
 * Covers: Taxi & Ride-Hailing, Motorbike & Scooter, Train & Ferry, Bike Sharing,
 * Food Delivery, Money Transfer, Travel Insurance, eSIM, Language, Social/Friendship,
 * Luggage Storage, and Alternative Flight/Hotel Booking with Brand Logo Badges.
 */

export type SuperAppCategory =
  | 'ride'
  | 'micromobility'
  | 'rail_ferry'
  | 'flights_hotels'
  | 'car_rental'
  | 'fintech'
  | 'insurance'
  | 'esim_vpn'
  | 'social_dating'
  | 'language'
  | 'luggage_vip'
  | 'navigation'
  | 'delivery'
  | 'both';

export interface NomadAppInfo {
  id?: string;
  name: string;
  category: SuperAppCategory;
  categoryLabelTr: string;
  categoryLabelEn: string;
  url: string;
  taglineTr: string;
  taglineEn: string;
  recommendedReasonTr: string;
  recommendedReasonEn: string;
  logoText: string;
  logoBg: string;
  logoColor: string;
  regions?: string[];
}

// Master Directory of International & Local Travel Super-Apps (with Visual Logo Badges)
export const MASTER_APPS_DIRECTORY: Record<string, NomadAppInfo> = {
  // =========================================================================
  // 1. TAKSİ, ARAÇ & SÜPER UYGULAMALAR (RIDE-HAILING & DELIVERY)
  // =========================================================================
  Grab: {
    id: 'grab',
    name: 'Grab',
    category: 'both',
    categoryLabelTr: 'Taksi, Motor & Yemek',
    categoryLabelEn: 'Ride, Bike & Food Superapp',
    url: 'https://www.grab.com',
    taglineTr: 'Güneydoğu Asya’nın 1 Numaralı Süper Uygulaması',
    taglineEn: 'Southeast Asia’s #1 Superapp',
    recommendedReasonTr: 'Taksimetre pazarlığına son verir; kartla sabit fiyata taksi, motor ve yemek çağırır.',
    recommendedReasonEn: 'Upfront fares, cashless card payment, motorbike taxis and food delivery.',
    logoText: 'Grab',
    logoBg: 'linear-gradient(135deg, #00B14F 0%, #059669 100%)',
    logoColor: '#FFFFFF'
  },
  Bolt: {
    id: 'bolt',
    name: 'Bolt',
    category: 'both',
    categoryLabelTr: 'Taksi, Scooter & Yemek',
    categoryLabelEn: 'Rides, Scooters & Food',
    url: 'https://bolt.eu',
    taglineTr: 'Avrupa, Kafkaslar, Tayland ve Afrika’da Hızlı & Ekonomik',
    taglineEn: 'Fast & Affordable Rides & Scooters Across 45+ Countries',
    recommendedReasonTr: 'Uber’den %20 daha ekonomik tarife, elektrikli scooter kiralama ve hızlı araç bulma.',
    recommendedReasonEn: 'Up to 20% cheaper than competitors with built-in electric scooter rentals.',
    logoText: 'Bolt',
    logoBg: 'linear-gradient(135deg, #34D186 0%, #10B981 100%)',
    logoColor: '#042F2E'
  },
  Uber: {
    id: 'uber',
    name: 'Uber',
    category: 'both',
    categoryLabelTr: 'Global Taksi & Uber Eats',
    categoryLabelEn: 'Global Rides & Uber Eats',
    url: 'https://www.uber.com',
    taglineTr: '70+ Ülkede Uluslararası Standart Araç & Scooter',
    taglineEn: 'Global Ride Standard in 70+ Countries',
    recommendedReasonTr: 'Mevcut hesabınızla yeni uygulama kurmadan 70+ ülkede sabit fiyatlı ulaşım.',
    recommendedReasonEn: 'Works seamlessly worldwide with your existing account and payment methods.',
    logoText: 'Uber',
    logoBg: 'linear-gradient(135deg, #0F172A 0%, #334155 100%)',
    logoColor: '#FFFFFF'
  },
  Gojek: {
    id: 'gojek',
    name: 'Gojek',
    category: 'both',
    categoryLabelTr: 'Motor Taksi & Yemek (Bali)',
    categoryLabelEn: 'Moto Taxi & Food (Indonesia)',
    url: 'https://www.gojek.com',
    taglineTr: 'Endonezya ve Bali’nin Milli Süper Uygulaması',
    taglineEn: 'Indonesia & Bali’s Iconic Daily Superapp',
    recommendedReasonTr: 'Bali trafiğini GoRide motosiklet taksi ile aşın; GoFood ile yerel lezzet söyleyin.',
    recommendedReasonEn: 'Beat Bali traffic with GoRide motorbike taxis and cheap GoFood delivery.',
    logoText: 'Gojek',
    logoBg: 'linear-gradient(135deg, #00AA13 0%, #15803D 100%)',
    logoColor: '#FFFFFF'
  },
  Careem: {
    id: 'careem',
    name: 'Careem',
    category: 'both',
    categoryLabelTr: 'Resmi Taksi, Bisiklet & Yemek',
    categoryLabelEn: 'Official Hala Taxi & Bike',
    url: 'https://www.careem.com',
    taglineTr: 'Orta Doğu & Körfez’in Resmi Süper Uygulaması',
    taglineEn: 'Middle East & Gulf Official Superapp',
    recommendedReasonTr: 'Dubai, Katar, Suudi Arabistan ve Ürdün’de resmi Hala taksileri ve Careem Bike kiralama.',
    recommendedReasonEn: 'Direct integration with official Hala Taxis, Careem Bike, and food delivery.',
    logoText: 'Careem',
    logoBg: 'linear-gradient(135deg, #22C55E 0%, #0D9488 100%)',
    logoColor: '#FFFFFF'
  },
  'Yandex Go': {
    id: 'yandex',
    name: 'Yandex Go',
    category: 'both',
    categoryLabelTr: 'Taksi, Scooter & Kurye',
    categoryLabelEn: 'Rides, Scooters & Delivery',
    url: 'https://go.yandex.com',
    taglineTr: 'Kafkaslar, Orta Asya & Balkanlar’da En Geniş Filo',
    taglineEn: 'Largest Fleet Across Caucasus & Central Asia',
    recommendedReasonTr: 'Gürcistan, Kazakistan, Özbekistan ve Sırbistan’da en hızlı ve en ucuz taksi ağı.',
    recommendedReasonEn: 'Largest vehicle fleet across Georgia, Kazakhstan, Uzbekistan, and Serbia.',
    logoText: 'Yandex',
    logoBg: 'linear-gradient(135deg, #EF4444 0%, #F59E0B 100%)',
    logoColor: '#FFFFFF'
  },
  'Kakao T': {
    id: 'kakaot',
    name: 'Kakao T',
    category: 'ride',
    categoryLabelTr: 'Güney Kore Resmi Taksi & Bisiklet',
    categoryLabelEn: 'Official Korea Taxi & Bike',
    url: 'https://www.kakaomobility.com',
    taglineTr: 'Güney Kore’de Taksi, E-Bisiklet ve Tren Bileti',
    taglineEn: 'Essential Mobility App for South Korea',
    recommendedReasonTr: 'Seul ve Busan’da uluslararası kredi kartıyla taksi ve elektrikli bisiklet çağırır.',
    recommendedReasonEn: 'Supports international cards for Korean taxis and electric bikes.',
    logoText: 'KakaoT',
    logoBg: 'linear-gradient(135deg, #FACC15 0%, #EAB308 100%)',
    logoColor: '#0F172A'
  },
  'GO (GO Inc.)': {
    id: 'gotaxi',
    name: 'GO Taxi Japan',
    category: 'ride',
    categoryLabelTr: 'Japonya Lisanslı Resmi Taksi',
    categoryLabelEn: 'Licensed Japan Taxi',
    url: 'https://go.goinc.jp',
    taglineTr: 'Tokyo, Kyoto ve Osaka’da 1 Numaralı Taksi Ağı',
    taglineEn: '#1 Licensed Taxi Dispatch in Japan',
    recommendedReasonTr: 'Japonya’da resmi lisanslı taksileri yabancı numara ve kartla tek tuşla çağırır.',
    recommendedReasonEn: 'Dispatches strictly licensed official Japanese cabs with fixed meters.',
    logoText: 'GO 🚕',
    logoBg: 'linear-gradient(135deg, #0284C7 0%, #1D4ED8 100%)',
    logoColor: '#FFFFFF'
  },
  FreeNow: {
    id: 'freenow',
    name: 'FREENOW',
    category: 'ride',
    categoryLabelTr: 'Avrupa Taksi, Scooter & E-Bike',
    categoryLabelEn: 'Europe Taxi, Scooter & eBike',
    url: 'https://free-now.com',
    taglineTr: 'Almanya, İspanya, İtalya & İngiltere’de Lider',
    taglineEn: 'Leading Mobility App in Western Europe',
    recommendedReasonTr: 'Avrupa’da resmi taksileri, Tier/Dott scooterları ve elektrikli bisikletleri tek ekranda birleştirir.',
    recommendedReasonEn: 'Combines official city taxis, e-scooters, and e-bikes in one European app.',
    logoText: 'FREE',
    logoBg: 'linear-gradient(135deg, #E11D48 0%, #9F1239 100%)',
    logoColor: '#FFFFFF'
  },
  Cabify: {
    id: 'cabify',
    name: 'Cabify',
    category: 'ride',
    categoryLabelTr: 'İspanya & Latin Amerika Taksi',
    categoryLabelEn: 'Spain & LatAm Ride Leader',
    url: 'https://cabify.com',
    taglineTr: 'İspanya ve Güney Amerika’da Güvenli Sabit Fiyat',
    taglineEn: 'Top-Rated Rides Across Spain & Latin America',
    recommendedReasonTr: 'Madrid, Barselona, Buenos Aires, Bogota ve Lima’da lisanslı ve güvenli ulaşım.',
    recommendedReasonEn: 'Vetted drivers and fixed upfront rates across Spain and Latin America.',
    logoText: 'Cabify',
    logoBg: 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
    logoColor: '#FFFFFF'
  },
  InDrive: {
    id: 'indrive',
    name: 'inDrive',
    category: 'ride',
    categoryLabelTr: 'Pazarlıklı Taksi & Şehirlerarası',
    categoryLabelEn: 'Bid Your Own Fare Rides',
    url: 'https://indrive.com',
    taglineTr: 'Ücreti Sizin Belirlediğiniz Ekonomik Taksi',
    taglineEn: 'Negotiate Fares Directly with Drivers',
    recommendedReasonTr: 'Yolculuk ücretini siz teklif edersiniz, sürücüler kabul eder; bütçe dostudur.',
    recommendedReasonEn: 'Set your own fare and choose from driver bids based on ratings.',
    logoText: 'inDrive',
    logoBg: 'linear-gradient(135deg, #84CC16 0%, #16A34A 100%)',
    logoColor: '#042F2E'
  },
  BiTaksi: {
    id: 'bitaksi',
    name: 'BiTaksi',
    category: 'ride',
    categoryLabelTr: 'Türkiye Resmi Sarı/Turkuaz Taksi',
    categoryLabelEn: 'Turkey Official Taxi App',
    url: 'https://www.bitaksi.com',
    taglineTr: 'Türkiye’nin Resmi Taksi Çağırma Platformu',
    taglineEn: 'Turkey’s Pioneer Taxi-Hailing Service',
    recommendedReasonTr: 'Kartla güvenli ödeme, rota takibi ve sürücü puanlama imkanı sağlar.',
    recommendedReasonEn: 'Card payment with driver rating and live GPS route tracking.',
    logoText: 'BiTaksi',
    logoBg: 'linear-gradient(135deg, #FACC15 0%, #F59E0B 100%)',
    logoColor: '#0F172A'
  },
  Wolt: {
    id: 'wolt',
    name: 'Wolt',
    category: 'delivery',
    categoryLabelTr: 'Restoran & Market Teslimatı',
    categoryLabelEn: 'Restaurant & Grocery Delivery',
    url: 'https://wolt.com',
    taglineTr: 'Avrupa, Kafkaslar ve Japonya’da Hızlı Yemek & Market',
    taglineEn: 'Top-Tier Food & Grocery Delivery in 25+ Countries',
    recommendedReasonTr: 'İngilizce menü desteği ve canlı kurye takibiyle 25 dakikada sıcak yemek ve market teslimatı.',
    recommendedReasonEn: 'English menus, live courier tracking, and 25-min restaurant/grocery delivery.',
    logoText: 'Wolt',
    logoBg: 'linear-gradient(135deg, #009DE0 0%, #0284C7 100%)',
    logoColor: '#FFFFFF'
  },
  Talabat: {
    id: 'talabat',
    name: 'Talabat',
    category: 'delivery',
    categoryLabelTr: 'Orta Doğu Yemek & Market',
    categoryLabelEn: 'MENA Food & Mart Delivery',
    url: 'https://www.talabat.com',
    taglineTr: 'BAE, Katar, Mısır ve Ürdün’de 1 Numara',
    taglineEn: '#1 Food & Grocery App in MENA',
    recommendedReasonTr: 'Orta Doğu’da 7/24 restoran ve 20 dakikada Talabat Mart market siparişi.',
    recommendedReasonEn: '24/7 food and 20-minute Talabat Mart grocery delivery across MENA.',
    logoText: 'talabat',
    logoBg: 'linear-gradient(135deg, #FF5A00 0%, #EA580C 100%)',
    logoColor: '#FFFFFF'
  },
  Deliveroo: {
    id: 'deliveroo',
    name: 'Deliveroo',
    category: 'delivery',
    categoryLabelTr: 'Gurme Restoran & Market',
    categoryLabelEn: 'Gourmet Food Delivery',
    url: 'https://deliveroo.com',
    taglineTr: 'İngiltere, Fransa, İtalya, Singapur & BAE’de Yaygın',
    taglineEn: 'Leading Restaurant Delivery in UK, Europe & UAE',
    recommendedReasonTr: 'Seçkin restoranlar ve süpermarketlerden otele hızlı teslimat.',
    recommendedReasonEn: 'Curated local restaurants and supermarkets delivered straight to your hotel.',
    logoText: 'Roo',
    logoBg: 'linear-gradient(135deg, #00CCBC 0%, #0D9488 100%)',
    logoColor: '#042F2E'
  },

  // =========================================================================
  // 2. MOTOR, SCOOTER & BİSİKLET KİRALAMA (MICROMOBILITY & BIKES)
  // =========================================================================
  Lime: {
    id: 'lime',
    name: 'Lime (Scooter & E-Bike)',
    category: 'micromobility',
    categoryLabelTr: 'Elektrikli Scooter & Bisiklet',
    categoryLabelEn: 'Electric Scooter & e-Bike',
    url: 'https://www.li.me',
    taglineTr: '250+ Şehirde QR Kodla Anında Scooter & E-Bisiklet',
    taglineEn: 'Instant E-Scooter & E-Bike Sharing in 250+ Cities',
    recommendedReasonTr: 'Avrupa, Amerika ve Avustralya şehirlerinde trafiğe girmeden sahil ve merkez gezisi.',
    recommendedReasonEn: 'Scan and ride electric scooters and e-bikes across 250+ global cities.',
    logoText: 'Lime 🛴',
    logoBg: 'linear-gradient(135deg, #00DD00 0%, #16A34A 100%)',
    logoColor: '#042F2E'
  },
  BikesBooking: {
    id: 'bikesbooking',
    name: 'BikesBooking',
    category: 'micromobility',
    categoryLabelTr: 'Motor, Scooter & Bisiklet Kiralama',
    categoryLabelEn: 'Motorcycle, Scooter & Bike Rental',
    url: 'https://bikesbooking.com',
    taglineTr: '100+ Ülkede Günlük Vespa, Scooter, Motor & Bisiklet',
    taglineEn: 'Rent Scooters, Motorcycles, Quads & Bicycles Worldwide',
    recommendedReasonTr: 'Pasaportunuzu rehin bırakmadan sigortalı scooter, motosiklet ve bisiklet rezerve edin.',
    recommendedReasonEn: 'Compare local rental shops and book scooters, motorbikes, and bicycles online.',
    logoText: 'Moto 🛵',
    logoBg: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
    logoColor: '#FFFFFF'
  },
  DonkeyRepublic: {
    id: 'donkey',
    name: 'Donkey Republic & Nextbike',
    category: 'micromobility',
    categoryLabelTr: '7/24 Paylaşımlı Şehir Bisikleti',
    categoryLabelEn: '24/7 City Bike Sharing',
    url: 'https://www.donkey.bike',
    taglineTr: 'Avrupa Şehirlerinde Uygulamayla Kilit Açılan Bisikletler',
    taglineEn: 'App-Unlocked City Bikes Across Europe',
    recommendedReasonTr: 'Amsterdam, Kopenhag, Berlin, Barselona ve Viyana’da saatlik veya günlük ekonomik bisiklet.',
    recommendedReasonEn: 'Unlock sturdy city bikes 24/7 via Bluetooth across major European cities.',
    logoText: 'Bike 🚲',
    logoBg: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
    logoColor: '#FFFFFF'
  },

  // =========================================================================
  // 3. TREN, FERİBOT & OTOBÜS BİLETİ (RAIL, FERRY & BUS)
  // =========================================================================
  Omio: {
    id: 'omio',
    name: 'Omio (Tren, Otobüs & Feribot)',
    category: 'rail_ferry',
    categoryLabelTr: 'Tren, Otobüs, Feribot & Uçuş',
    categoryLabelEn: 'Trains, Buses, Ferries & Flights',
    url: 'https://www.omio.com',
    taglineTr: 'Avrupa ve Amerika’da 1000+ Tren & Otobüs Firması Tek Ekranda',
    taglineEn: 'Compare Trains, Buses, Ferries & Flights in One Search',
    recommendedReasonTr: 'Tren garı otomatlarıyla uğraşmadan dijital QR biletinizi Türkçe/İngilizce anında alın.',
    recommendedReasonEn: 'Book high-speed rail, regional buses, and ferries with mobile QR tickets.',
    logoText: 'Omio 🚆',
    logoBg: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
    logoColor: '#FFFFFF'
  },
  Trainline: {
    id: 'trainline',
    name: 'Trainline & Eurail',
    category: 'rail_ferry',
    categoryLabelTr: 'Avrupa Hızlı Tren & Interrail',
    categoryLabelEn: 'European High-Speed Rail',
    url: 'https://www.thetrainline.com',
    taglineTr: 'Eurostar, TGV, Trenitalia, DB ve Renfe Resmi Bilet Platformu',
    taglineEn: 'Europe’s #1 Train & Coach App (45 Countries)',
    recommendedReasonTr: 'Erken rezervasyonda %60’a varan tren bileti indirimi ve canlı peron bildirimleri.',
    recommendedReasonEn: 'Save up to 60% on European rail tickets with live platform alerts.',
    logoText: 'Rail 🚄',
    logoBg: 'linear-gradient(135deg, #0D9488 0%, #059669 100%)',
    logoColor: '#FFFFFF'
  },
  Ferryhopper: {
    id: 'ferryhopper',
    name: 'Ferryhopper & Direct Ferries',
    category: 'rail_ferry',
    categoryLabelTr: 'Feribot & Ada Geçiş Biletleri',
    categoryLabelEn: 'Island Hopping & Ferry Tickets',
    url: 'https://www.ferryhopper.com',
    taglineTr: 'Yunan Adaları, İtalya, İspanya & Akdeniz Feribot Biletleri',
    taglineEn: 'Zero-Fee Ferry Tickets & Island Hopping Planner',
    recommendedReasonTr: 'Gizli komisyon olmadan tüm feribot şirketlerini karşılaştırır, e-bilet verir.',
    recommendedReasonEn: 'Compare all ferry operators and plan multi-island hopping routes with e-boarding.',
    logoText: 'Ferry ⛴️',
    logoBg: 'linear-gradient(135deg, #0284C7 0%, #06B6D4 100%)',
    logoColor: '#FFFFFF'
  },
  '12GoAsia': {
    id: '12go',
    name: '12Go (Tren, Feribot & Van)',
    category: 'rail_ferry',
    categoryLabelTr: 'Asya & Global Tren / Feribot / Otobüs',
    categoryLabelEn: 'Trains, Ferries, Buses & Transfers',
    url: 'https://12go.asia',
    taglineTr: 'Tayland, Japonya, Vietnam, Mısır ve Avrupa’da Ada/Tren Geçişi',
    taglineEn: 'Book Trains, Ferries, Speedboats & Night Buses',
    recommendedReasonTr: 'Phuket/Koh Samui feribotları, gece trenleri ve VIP minivanlar için en güvenilir bilet ağı.',
    recommendedReasonEn: 'Essential for island speedboats, sleeper trains, and intercity buses.',
    logoText: '12Go 🚤',
    logoBg: 'linear-gradient(135deg, #059669 0%, #0D9488 100%)',
    logoColor: '#FFFFFF'
  },
  FlixBus: {
    id: 'flixbus',
    name: 'FlixBus & FlixTrain',
    category: 'rail_ferry',
    categoryLabelTr: 'Ekonomik Şehirlerarası Otobüs & Tren',
    categoryLabelEn: 'Budget Intercity Bus & Train',
    url: 'https://global.flixbus.com',
    taglineTr: '40+ Ülkede 5€’dan Başlayan Wi-Fi’lı Otobüs Rotaları',
    taglineEn: 'Low-Cost Intercity Buses with Free Wi-Fi in 40+ Countries',
    recommendedReasonTr: 'Avrupa, Amerika ve Türkiye çıkışlı uluslararası rotalarda en ekonomik ulaşım.',
    recommendedReasonEn: 'Budget-friendly city-to-city travel with free Wi-Fi and power outlets.',
    logoText: 'Flix 🚌',
    logoBg: 'linear-gradient(135deg, #73D700 0%, #16A34A 100%)',
    logoColor: '#042F2E'
  },

  // =========================================================================
  // 4. UÇUŞ & ALTERNATİF KONAKLAMA (FLIGHTS & ALTERNATIVE STAYS)
  // =========================================================================
  WayAway: {
    id: 'aviasales',
    name: 'Aviasales',
    category: 'flights_hotels',
    categoryLabelTr: 'Ucuz Uçak Bileti',
    categoryLabelEn: 'Cheap Flights',
    url: 'https://www.aviasales.com/',
    taglineTr: 'Yüzlerce Havayolunu Tek Aramada Karşılaştırır',
    taglineEn: 'Compares Hundreds of Airlines in One Search',
    recommendedReasonTr: 'Esnek tarihli en ucuz uçuş takvimi ve fiyat alarmı.',
    recommendedReasonEn: 'Cheapest-date calendar and price alerts across 700+ airlines.',
    logoText: 'Fly ✈️',
    logoBg: 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)',
    logoColor: '#FFFFFF'
  },
  TripCom: {
    id: 'tripcom',
    name: 'Trip.com',
    category: 'flights_hotels',
    categoryLabelTr: 'Global Uçak, Otel & Hızlı Tren',
    categoryLabelEn: 'Global Flights, Hotels & Trains',
    url: 'https://www.trip.com',
    taglineTr: '7/24 Canlı Müşteri Desteği & Özel Havayolu/Otel İndirimleri',
    taglineEn: 'All-in-One Flights, Hotels & High-Speed Rail Deals',
    recommendedReasonTr: 'Uçuş + otel paketlerinde ek indirim ve havalimanı VIP lounge ödülleri sunar.',
    recommendedReasonEn: 'Bundle discounts on flights and hotels with 24/7 customer support.',
    logoText: 'Trip 🌏',
    logoBg: 'linear-gradient(135deg, #2563EB 0%, #0284C7 100%)',
    logoColor: '#FFFFFF'
  },
  Booking: {
    id: 'booking',
    name: 'Booking.com',
    category: 'flights_hotels',
    categoryLabelTr: 'Ücretsiz İptalli Otel & Rezidans',
    categoryLabelEn: 'Free Cancellation Hotels & Stays',
    url: 'https://www.booking.com',
    taglineTr: 'Dünya Çapında 28 Milyon+ Otel, Ev ve Butik Konaklama',
    taglineEn: 'World’s #1 Accommodation Platform with Genius Perks',
    recommendedReasonTr: 'Vize başvuruları ve sınır geçişleri için ön ödemesiz, ücretsiz iptalli rezervasyon.',
    recommendedReasonEn: 'Book now, pay at property with free cancellation for visa applications.',
    logoText: 'Booking',
    logoBg: 'linear-gradient(135deg, #003580 0%, #0284C7 100%)',
    logoColor: '#FFFFFF'
  },
  Agoda: {
    id: 'agoda',
    name: 'Agoda',
    category: 'flights_hotels',
    categoryLabelTr: 'Asya & Global İndirimli Otel/Villa',
    categoryLabelEn: 'Secret Deals on Hotels & Villas',
    url: 'https://www.agoda.com',
    taglineTr: 'Asya, Orta Doğu ve Avrupa’da %35’e Varan Mobil Özel Fiyatlar',
    taglineEn: 'Deepest Hotel & Resort Discounts Especially in Asia',
    recommendedReasonTr: 'Lüks resortlarda, tatil villalarında ve şehir otellerinde en agresif kupon indirimleri.',
    recommendedReasonEn: 'Unbeatable secret deals and flash discounts on hotels and resorts.',
    logoText: 'Agoda',
    logoBg: 'linear-gradient(135deg, #0D9488 0%, #0284C7 100%)',
    logoColor: '#FFFFFF'
  },
  Hostelworld: {
    id: 'hostelworld',
    name: 'Hostelworld & Airbnb',
    category: 'flights_hotels',
    categoryLabelTr: 'Alternatif Konaklama & Sosyal Hostel',
    categoryLabelEn: 'Social Hostels & Local Apartments',
    url: 'https://www.hostelworld.com',
    taglineTr: 'Bütçe Dostu Tasarım Hosteller & Gezgin Sohbet Grupları',
    taglineEn: 'Connect with Solo Travelers in Top-Rated Hostels',
    recommendedReasonTr: 'Rezervasyon yaptığınız anda aynı şehirdeki diğer gezginlerle uygulama içi grup sohbeti açılır.',
    recommendedReasonEn: 'Unlocks city chatrooms with fellow travelers the moment you book.',
    logoText: 'Hostel',
    logoBg: 'linear-gradient(135deg, #F97316 0%, #E11D48 100%)',
    logoColor: '#FFFFFF'
  },

  // =========================================================================
  // 5. PARA TRANSFERİ & DÖVİZ KARTLARI (MONEY TRANSFER & FINTECH)
  // =========================================================================
  Wise: {
    id: 'wise',
    name: 'Wise (Para Transferi & Kart)',
    category: 'fintech',
    categoryLabelTr: 'Uluslararası Para Transferi & Döviz Kartı',
    categoryLabelEn: 'Multi-Currency Card & Money Transfer',
    url: 'https://wise.com',
    taglineTr: '40+ Para Biriminde Reel Piyasa Kuruyla 0 Gizli Komisyon',
    taglineEn: 'Send & Spend in 40+ Currencies at the Real Exchange Rate',
    recommendedReasonTr: 'Yurt dışında banka kur farkı ödemeden harcama yapın ve saniyeler içinde uluslararası para gönderin.',
    recommendedReasonEn: 'Save up to 6x vs traditional banks on international transfers and card spending.',
    logoText: 'Wise 💸',
    logoBg: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
    logoColor: '#FFFFFF'
  },
  Revolut: {
    id: 'revolut',
    name: 'Revolut & Remitly',
    category: 'fintech',
    categoryLabelTr: 'Dijital Seyahat Bankası & Hızlı Transfer',
    categoryLabelEn: 'Global Travel Banking & Fast Remittance',
    url: 'https://www.revolut.com',
    taglineTr: 'Tek Kullanımlık Sanal Kart, ATM Nakit Çekim & Anında Transfer',
    taglineEn: 'Disposable Virtual Cards, Fee-Free FX & Global Transfers',
    recommendedReasonTr: 'Şüpheli POS cihazlarına karşı tek kullanımlık sanal kart ve 150+ ülkede komisyonsuz kur çevrimi.',
    recommendedReasonEn: 'Protect your money abroad with disposable virtual cards and instant FX.',
    logoText: 'Rev 💳',
    logoBg: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
    logoColor: '#FFFFFF'
  },

  // =========================================================================
  // 6. SEYAHAT SAĞLIK SİGORTASI & UÇUŞ TAZMİNATI (INSURANCE & CLAIMS)
  // =========================================================================
  SafetyWing: {
    id: 'safetywing',
    name: 'SafetyWing & EKTA Sigorta',
    category: 'insurance',
    categoryLabelTr: 'Seyahat Sağlık & Vize Sigortası',
    categoryLabelEn: 'Visa-Compliant Travel Medical Insurance',
    url: 'https://safetywing.com/nomad-insurance',
    taglineTr: '185+ Ülkede Hastane, Kaza, Diş ve Kayıp Bagaj Güvencesi',
    taglineEn: 'Global Travel & Nomad Medical Coverage in 185+ Countries',
    recommendedReasonTr: 'Schengen ve tüm dünya sınır kontrollerinde geçerli; seyahat başladıktan sonra bile online alınabilir.',
    recommendedReasonEn: 'Can be purchased even after you’ve already departed; covers medical & lost luggage.',
    logoText: 'Safe 🛡️',
    logoBg: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)',
    logoColor: '#FFFFFF'
  },
  AirHelp: {
    id: 'airhelp',
    name: 'AirHelp & Compensair',
    category: 'insurance',
    categoryLabelTr: 'Uçuş Rötar / İptal 600€ Tazminat',
    categoryLabelEn: 'Up to €600 Flight Delay Compensation',
    url: 'https://www.airhelp.com',
    taglineTr: 'Geciken, İptal Olan veya Fazla Satılan Uçuşlarda 600€’ya Kadar Nakit Hak',
    taglineEn: 'Claim Up to €600 for Delayed, Cancelled or Overbooked Flights',
    recommendedReasonTr: 'Son 3 yıldaki rötarlı uçuşlarınız için ön ücret ödemeden havayolundan yasal tazminatınızı alır.',
    recommendedReasonEn: 'No win, no fee legal claim service for delayed or cancelled flights.',
    logoText: '€600 ⚖️',
    logoBg: 'linear-gradient(135deg, #0284C7 0%, #1D4ED8 100%)',
    logoColor: '#FFFFFF'
  },

  // =========================================================================
  // 7. eSIM, İNTERNET & VPN (CONNECTIVITY)
  // =========================================================================
  Airalo: {
    id: 'airalo',
    name: 'Airalo & Holafly eSIM',
    category: 'esim_vpn',
    categoryLabelTr: 'Anında 5G/LTE Yurt Dışı eSIM',
    categoryLabelEn: 'Instant 5G/LTE Travel eSIM',
    url: 'https://www.airalo.com',
    taglineTr: '200+ Ülkede Fiziksel SIM Değiştirmeden Uçaktan İner İnmez İnternet',
    taglineEn: 'Instant Digital eSIM Packs in 200+ Countries & Regions',
    recommendedReasonTr: 'Fahiş operatör dolaşım (roaming) ücretlerinden kurtulun; QR kodla 2 dakikada 5G interneti açın.',
    recommendedReasonEn: 'Skip airport SIM queues and roaming charges with instant QR activation.',
    logoText: 'eSIM 📶',
    logoBg: 'linear-gradient(135deg, #06B6D4 0%, #0D9488 100%)',
    logoColor: '#FFFFFF'
  },

  // =========================================================================
  // 8. ARKADAŞLIK, SOSYAL & ETKİNLİK (FRIENDSHIP, DATING & COMMUNITY)
  // =========================================================================
  MeetupSocial: {
    id: 'meetup',
    name: 'Meetup, Bumble BFF & Timeleft',
    category: 'social_dating',
    categoryLabelTr: 'Arkadaşlık, Sosyal & Etkinlik',
    categoryLabelEn: 'Friendship, Social Events & Dating',
    url: 'https://www.meetup.com',
    taglineTr: 'Gittiğiniz Şehirde Yerel Halkla ve Gezginlerle Tanışma & Akşam Yemeği',
    taglineEn: 'Meet Locals, Expat Communities & Fellow Travelers Abroad',
    recommendedReasonTr: 'Dil değişim geceleri, yabancı gezgin buluşmaları, Bumble BFF arkadaşlık modu ve Timeleft akşam yemekleri.',
    recommendedReasonEn: 'Join language exchanges, expat mixers, Bumble BFF, and Timeleft dinners.',
    logoText: 'Social 🤝',
    logoBg: 'linear-gradient(135deg, #EC4899 0%, #E11D48 100%)',
    logoColor: '#FFFFFF'
  },

  // =========================================================================
  // 9. DİL ÖĞRENME & CANLI ÇEVİRİ (LANGUAGE & TRANSLATION)
  // =========================================================================
  PreplyLang: {
    id: 'preply',
    name: 'Preply, DeepL & Kamera Çeviri',
    category: 'language',
    categoryLabelTr: 'Dil Öğrenme & Menü/Ses Çevirisi',
    categoryLabelEn: '1-on-1 Language Tutors & AI Translation',
    url: 'https://preply.com',
    taglineTr: 'Ana Dili Olan Eğitmenlerle Konuşma Pratiği & Anlık Kamera Çevirisi',
    taglineEn: 'Practice Local Languages with Native Tutors Before You Fly',
    recommendedReasonTr: 'Seyahat öncesi gideceğiniz ülkenin dilini konuşan yerel eğitmenlerden 1’e 1 pratik ders alın.',
    recommendedReasonEn: 'Book affordable 1-on-1 lessons with native speakers and master travel phrases.',
    logoText: 'Dil 🗣️',
    logoBg: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    logoColor: '#FFFFFF'
  },

  // =========================================================================
  // 10. BAGAJ EMANET, HAVALİMANI TRANSFER & VIP LOUNGE (LUGGAGE & VIP)
  // =========================================================================
  BounceLuggage: {
    id: 'bounce',
    name: 'Bounce & Radical Storage',
    category: 'luggage_vip',
    categoryLabelTr: '7/24 Sigortalı Bagaj Emanet Ağı',
    categoryLabelEn: 'Insured Luggage Storage Network',
    url: 'https://usebounce.com',
    taglineTr: '4.000+ Şehirde Bavulunuzu Güvenle Bırakıp Eller Serbest Gezin',
    taglineEn: 'Store Bags Safely at 10,000+ Verified Locations Worldwide',
    recommendedReasonTr: 'Otelden çıkış yaptıktan sonra uçuş saatine kadar ağır bavulları tren garı veya merkezde sigortalı emanete bırakın.',
    recommendedReasonEn: 'Drop off heavy bags after hotel check-out with $10,000 bag protection.',
    logoText: 'Bagaj 🧳',
    logoBg: 'linear-gradient(135deg, #0EA5E9 0%, #0D9488 100%)',
    logoColor: '#FFFFFF'
  },
  KiwitaxiVIP: {
    id: 'kiwitaxi',
    name: 'Kiwitaxi & Priority Pass VIP',
    category: 'luggage_vip',
    categoryLabelTr: 'Havalimanı VIP Transfer & Lounge',
    categoryLabelEn: 'Airport Pickup & VIP Lounges',
    url: 'https://kiwitaxi.com',
    taglineTr: 'Havalimanı Çıkışında İsimle Karşılama & 1400+ VIP Lounge',
    taglineEn: 'Fixed-Price Airport Meet & Greet + 1400+ Airport Lounges',
    recommendedReasonTr: 'Uçuşunuz rötar yapsa bile şoförünüz ücretsiz bekler ve sabit fiyatla doğrudan otelinize götürür.',
    recommendedReasonEn: 'Driver waits free of charge if your flight is delayed; fixed upfront fare.',
    logoText: 'VIP 🚖',
    logoBg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    logoColor: '#FFFFFF'
  },
  GetYourGuide: {
    id: 'getyourguide',
    name: 'GetYourGuide & Tiqets',
    category: 'luggage_vip',
    categoryLabelTr: 'Şehir Turları & Müze Biletleri',
    categoryLabelEn: 'Tours, Activities & Fast-Track Tickets',
    url: 'https://www.getyourguide.com',
    taglineTr: 'Sıra Beklemeden Müze Girişi, Tekne Turları & Günübirlik Geziler',
    taglineEn: 'Skip-the-line museum tickets, day tours, and outdoor adventures',
    recommendedReasonTr: 'Popüler saray ve müze sıralarını atlayın, yerel rehberli turlara anında rezervasyon yapın.',
    recommendedReasonEn: 'Book fast-track museum entries and top-rated local guided experiences.',
    logoText: 'Tur 🎟️',
    logoBg: 'linear-gradient(135deg, #FF5533 0%, #E63946 100%)',
    logoColor: '#FFFFFF'
  },
  DiscoverCars: {
    id: 'discovercars',
    name: 'DiscoverCars & EconomyBookings',
    category: 'car_rental',
    categoryLabelTr: 'Uluslararası Araç Kiralama',
    categoryLabelEn: 'Global Car Rental Comparison',
    url: 'https://www.discovercars.com',
    taglineTr: '150+ Ülkede 500+ Güvenilir Kiralama Şirketini Karşılaştırın',
    taglineEn: 'Compare 500+ trusted rental companies across 150+ countries',
    recommendedReasonTr: 'Havalimanında teslim araçlarda sıfır gizli masraf ve ücretsiz iptal güvencesi.',
    recommendedReasonEn: 'Full coverage insurance with no hidden fees and free cancellation.',
    logoText: 'Car 🚗',
    logoBg: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    logoColor: '#FFFFFF'
  },
  Rentalcars: {
    id: 'rentalcars',
    name: 'Rentalcars.com',
    category: 'car_rental',
    categoryLabelTr: 'Havalimanı Rent-a-Car',
    categoryLabelEn: 'Airport Car Hire Global',
    url: 'https://www.rentalcars.com',
    taglineTr: 'Hertz, Avis, Sixt ve Enterprise Tek Ekranda En İyi Fiyat',
    taglineEn: 'Compare Hertz, Avis, Sixt, Enterprise in One Place',
    recommendedReasonTr: 'Uçaktan iner inmez terminalden araç teslimi, tam kasko seçenekleri ve esnek iade.',
    recommendedReasonEn: 'Terminal pick-up at major airports with full protection and free cancellation.',
    logoText: 'Rental 🚙',
    logoBg: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
    logoColor: '#FFFFFF'
  },
  Turo: {
    id: 'turo',
    name: 'Turo & Getaround',
    category: 'car_rental',
    categoryLabelTr: 'Kişiden Kişiye Araç Paylaşımı',
    categoryLabelEn: 'Peer-to-Peer Car Sharing',
    url: 'https://turo.com',
    taglineTr: 'Yerel Sahiplerden Özel Araç Kiralama (ABD, İngiltere, Avrupa)',
    taglineEn: 'Rent Unique Cars from Trusted Local Hosts',
    recommendedReasonTr: 'Klasik kiralama şirketlerinden %30 daha uygun; spor arabadan SUV ve elektrikliye geniş seçenek.',
    recommendedReasonEn: 'Skip the rental counter and book unique cars directly from local hosts.',
    logoText: 'Turo 🔑',
    logoBg: 'linear-gradient(135deg, #5B21B6 0%, #7C3AED 100%)',
    logoColor: '#FFFFFF'
  },
  Skyscanner: {
    id: 'skyscanner',
    name: 'Skyscanner & Google Flights',
    category: 'flights_hotels',
    categoryLabelTr: 'Global Uçak Bileti & Fiyat Alarmı',
    categoryLabelEn: 'Global Flights & Price Alerts',
    url: 'https://www.skyscanner.com',
    taglineTr: '1200+ Havayolu ve Acenteyi Tarar, En Ucuz Tarihleri Bulur',
    taglineEn: 'Search 1,200+ Airlines & OTAs with Month View',
    recommendedReasonTr: '"Her Yere" (Everywhere) arama özelliğiyle pasaportunuza en ucuz kaçış rotasını listeler.',
    recommendedReasonEn: 'Explore Everywhere feature reveals the cheapest destinations from your home airport.',
    logoText: 'Sky ✈️',
    logoBg: 'linear-gradient(135deg, #0284C7 0%, #00B2D6 100%)',
    logoColor: '#FFFFFF'
  },
  RadicalStorage: {
    id: 'radical',
    name: 'Radical Storage',
    category: 'luggage_vip',
    categoryLabelTr: 'Sabit Fiyatlı Bagaj Emaneti',
    categoryLabelEn: 'Flat-Rate Luggage Storage',
    url: 'https://radicalstorage.com',
    taglineTr: 'Avrupa ve Asya’da Kafe/Otellerde Günlük 5€ Sabit Ücrete Emanet',
    taglineEn: '5,000+ City Center Drop-Off Points at €5/day Flat Rate',
    recommendedReasonTr: 'Bavul boyutu veya ağırlığı fark etmeksizin sabit fiyat ve 3.000€ sigorta güvencesi.',
    recommendedReasonEn: 'No size or weight restrictions; flat daily fee with €3,000 guarantee per bag.',
    logoText: 'Radical 🧳',
    logoBg: 'linear-gradient(135deg, #F97316 0%, #C2410C 100%)',
    logoColor: '#FFFFFF'
  },
  LuggageHero: {
    id: 'luggagehero',
    name: 'LuggageHero & Nannybag',
    category: 'luggage_vip',
    categoryLabelTr: 'Saatlik / Günlük Bagaj Kilidi',
    categoryLabelEn: 'Hourly & Daily Luggage Lockers',
    url: 'https://luggagehero.com',
    taglineTr: 'Merkezi İstasyonlar ve Turistik Noktalarda Saatlik Güvenli Bırakma',
    taglineEn: 'Certified Local Shops & Lockers Near Major Train Stations',
    recommendedReasonTr: 'Sadece kaldığınız saat kadar ödeyin, güvenlik mührüyle kilitlenen bavulunuzu rahatça teslim edin.',
    recommendedReasonEn: 'Pay by the hour or day; includes security seal and damage protection.',
    logoText: 'Hero 🎒',
    logoBg: 'linear-gradient(135deg, #E11D48 0%, #BE123C 100%)',
    logoColor: '#FFFFFF'
  },
  MayaMobile: {
    id: 'mayamobile',
    name: 'Maya Mobile & Nomad eSIM',
    category: 'esim_vpn',
    categoryLabelTr: 'Sınırsız İnternet & Hotspot eSIM',
    categoryLabelEn: 'Unlimited Data Travel eSIM with Hotspot',
    url: 'https://maya.net',
    taglineTr: '190+ Ülkede Sınırsız Veri Paketleri ve Ücretsiz Hotspot Paylaşımı',
    taglineEn: 'High-Speed 5G Unlimited Travel Data with Tethering',
    recommendedReasonTr: 'Laptop veya tabletinize sınırsız internet dağıtın (hotspot serbest), otomatik bağlantı sağlar.',
    recommendedReasonEn: 'Keep all your travel devices connected with unlimited 5G plans and mobile hotspot.',
    logoText: 'Maya 📶',
    logoBg: 'linear-gradient(135deg, #8B5CF6 0%, #4C1D95 100%)',
    logoColor: '#FFFFFF'
  },
  Citymapper: {
    id: 'citymapper',
    name: 'Citymapper & Maps.me',
    category: 'navigation',
    categoryLabelTr: 'Şehir İçi Metro, Otobüs & Çevrimdışı Harita',
    categoryLabelEn: 'Live Transit & Offline Maps',
    url: 'https://citymapper.com',
    taglineTr: 'Metrolar, Aktarmalar ve İnternetsiz Detaylı Şehir Haritası',
    taglineEn: 'The Ultimate Urban Transit & Offline Navigation Tool',
    recommendedReasonTr: 'Hangi metro vagonuna binmeniz gerektiğini bile söyler; haritaları önceden indirip çevrimdışı gezin.',
    recommendedReasonEn: 'Tells you which subway carriage to board and provides 100% offline navigation.',
    logoText: 'Maps 🗺️',
    logoBg: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
    logoColor: '#FFFFFF'
  },
  Heymondo: {
    id: 'heymondo',
    name: 'Heymondo & Allianz Global',
    category: 'insurance',
    categoryLabelTr: '7/24 Doktorlu Seyahat Sağlık Sigortası',
    categoryLabelEn: '24/7 App-Based Travel Medical Insurance',
    url: 'https://heymondo.com',
    taglineTr: 'Cepten 7/24 Canlı Doktor Görüşmesi & 10 Milyon €’ya Varan Teminat',
    taglineEn: '24/7 In-App Medical Chat & Up to €10M Medical Coverage',
    recommendedReasonTr: 'Önceden cebinizden para ödemeden hastane masraflarını karşılar; anında vize sertifikası üretir.',
    recommendedReasonEn: 'Direct direct-billing medical network with instant PDF certificate for visa entry.',
    logoText: 'Mondo 🩺',
    logoBg: 'linear-gradient(135deg, #0EA5E9 0%, #0369A1 100%)',
    logoColor: '#FFFFFF'
  }
};

// Countries where Uber permanently folded or does not operate (e.g. Southeast Asia, CIS, Balkans)
const UBER_INACTIVE_COUNTRIES = new Set([
  'TH', 'VN', 'ID', 'MY', 'SG', 'PH', 'KH', 'LA', 'MM', 'BN',
  'CN', 'RU', 'BY', 'KZ', 'UZ', 'KG', 'TJ', 'TM', 'AZ', 'AM', 'GE', 'MD',
  'AL', 'BA', 'ME', 'MK', 'XK', 'RS', 'BG', 'CY', 'IS'
]);

/**
 * Returns prioritized local & global apps for a given country code
 * Includes Ride-Hailing, Micromobility (Bike/Scooter/Moto), Rail/Ferry, Fintech, eSIM, Insurance, Luggage, Social & Language!
 */
export function getCountryNomadApps(code: string, knownRideApps: string[] = []): NomadAppInfo[] {
  const result: NomadAppInfo[] = [];
  const addedNames = new Set<string>();
  const c = code.toUpperCase();

  const tryAdd = (key: string) => {
    if (key.toLowerCase().includes('uber') && UBER_INACTIVE_COUNTRIES.has(c)) {
      return;
    }
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
  knownRideApps.forEach((appName) => tryAdd(appName));

  // 2. Add region-specific delivery & ride apps
  if (['TH', 'VN', 'MY', 'SG', 'ID', 'PH', 'KH', 'LA'].includes(c)) {
    tryAdd('Grab');
    if (c === 'TH') tryAdd('Bolt');
    if (c === 'ID') tryAdd('Gojek');
    tryAdd('12GoAsia');
    tryAdd('BikesBooking');
    tryAdd('Agoda');
  } else if (['GE', 'AZ', 'KZ', 'UZ', 'AM', 'RS', 'ME', 'BA', 'AL', 'MK'].includes(c)) {
    tryAdd('Bolt');
    tryAdd('Yandex Go');
    tryAdd('Wolt');
    tryAdd('BikesBooking');
  } else if (['AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'JO', 'EG', 'MA'].includes(c)) {
    tryAdd('Careem');
    tryAdd('Talabat');
    tryAdd('Uber');
  } else if (c === 'JP') {
    tryAdd('GO (GO Inc.)');
    tryAdd('Uber');
    tryAdd('Wolt');
    tryAdd('TripCom');
  } else if (c === 'KR') {
    tryAdd('Kakao T');
    tryAdd('TripCom');
  } else if (['GR', 'IT', 'ES', 'HR', 'PT', 'MT', 'CY'].includes(c)) {
    tryAdd('Uber');
    tryAdd('Bolt');
    tryAdd('Omio');
    tryAdd('BikesBooking');
    tryAdd('Lime');
  } else {
    tryAdd('Bolt');
    if (!UBER_INACTIVE_COUNTRIES.has(c)) {
      tryAdd('Uber');
    } else {
      tryAdd('InDrive');
    }
    tryAdd('Omio');
    tryAdd('Lime');
    tryAdd('DonkeyRepublic');
  }

  // 3. Always enrich with essential cross-border services so every country card/modal shows the full ecosystem
  // Yalnızca Travelpayouts ortakları (her tıklama gelir sağlar)
  tryAdd('WayAway');
  tryAdd('TripCom');
  tryAdd('Booking');
  tryAdd('Airalo');
  tryAdd('GetYourGuide');
  tryAdd('DiscoverCars');
  tryAdd('KiwitaxiVIP');
  tryAdd('AirHelp');
  tryAdd('Radical');

  return result;
}

/**
 * Returns travel & nomad apps filtered by category
 */
export function getAppsByCategory(
  category: string,
  countryCode?: string
): NomadAppInfo[] {
  const all = Object.values(MASTER_APPS_DIRECTORY);
  if (!category || category === 'all') {
    return countryCode ? getCountryNomadApps(countryCode) : all;
  }
  return all.filter((app) => {
    if (category === 'flights' || category === 'flights_hotels') {
      return app.category === 'flights_hotels';
    }
    if (category === 'hotels') {
      return app.category === 'flights_hotels' && (app.id?.includes('agoda') || app.id?.includes('booking') || app.id?.includes('hostel') || app.id?.includes('trip'));
    }
    if (category === 'car_rental') {
      return app.category === 'car_rental';
    }
    if (category === 'rail_ferry') {
      return app.category === 'rail_ferry';
    }
    if (category === 'ride' || category === 'micromobility') {
      return app.category === 'ride' || app.category === 'micromobility' || app.category === 'both';
    }
    if (category === 'luggage_vip') {
      return app.category === 'luggage_vip';
    }
    if (category === 'insurance') {
      return app.category === 'insurance';
    }
    if (category === 'esim_vpn') {
      return app.category === 'esim_vpn';
    }
    if (category === 'navigation') {
      return app.category === 'navigation';
    }
    if (category === 'delivery') {
      return app.category === 'delivery' || app.category === 'both';
    }
    return app.category === category;
  });
}
