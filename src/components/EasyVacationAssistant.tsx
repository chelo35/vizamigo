import React, { useState, useMemo } from 'react';
import {
  Plane,
  Compass,
  Luggage,
  Sparkles,
  ExternalLink,
  Info,
  Layers,
  Search
} from 'lucide-react';
import { useI18n } from '../data/i18n';
import { getCountryName } from '../data/passportData';

interface EasyVacationAssistantProps {
  countryCode: string;
  originPassport?: string;
}

type PhaseFilter = 'all' | 'before' | 'during' | 'return';

interface AssistantToolItem {
  id: string;
  name: string;
  logoText: string;
  logoBg: string;
  categoryLabel: { tr: string; en: string; de: string };
  phase: 'before' | 'during' | 'return';
  tagline: { tr: string; en: string; de: string };
  desc: { tr: string; en: string; de: string };
  url: string;
  badge: { tr: string; en: string; de: string };
}

export const EasyVacationAssistant: React.FC<EasyVacationAssistantProps> = ({
  countryCode
}) => {
  const { language, l } = useI18n();
  const [selectedPhase, setSelectedPhase] = useState<PhaseFilter>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const countryName = useMemo(() => getCountryName(countryCode, language), [countryCode, language]);
  const code = countryCode.toUpperCase();

  const isSEA = ['TH', 'VN', 'ID', 'MY', 'SG', 'PH', 'KH', 'LA', 'MM'].includes(code);
  const isMENA = ['AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'EG', 'JO', 'MA'].includes(code);
  const isEurope = [
    'DE', 'FR', 'IT', 'ES', 'NL', 'GR', 'PT', 'AT', 'CH', 'BE', 'CZ', 'PL', 'HU',
    'HR', 'AL', 'ME', 'BA', 'RS', 'MK', 'BG', 'RO', 'SE', 'NO', 'DK', 'FI', 'GB', 'IE'
  ].includes(code);

  const allTools = useMemo<AssistantToolItem[]>(() => {
    const taxiTool: AssistantToolItem = isSEA
      ? {
          id: 'grab-taxi',
          name: 'Grab & Bolt (Taksi & Motor)',
          logoText: 'Grab',
          logoBg: 'linear-gradient(135deg, #00B14F 0%, #059669 100%)',
          categoryLabel: { tr: 'Taksi & Motor Çağırma', en: 'Ride-Hailing & Moto Taxi', de: 'Taxi & Fahrdienst' },
          phase: 'during',
          tagline: {
            tr: `${countryName} Genelinde 1 Numaralı Sabit Fiyatlı Taksi & Motor`,
            en: `#1 Fixed-Fare Taxi & Moto App in ${countryName}`,
            de: `Führender Fahrdienst in ${countryName}`
          },
          desc: {
            tr: 'Taksimetre pazarlığına girmeyin; kredi kartı ile sabit fiyata araç veya motosiklet taksi çağırın.',
            en: 'Avoid meter haggling. Book upfront fixed-price car or motorbike rides with card payment.',
            de: 'Feste Preise ohne Feilschen mit Kartenzahlung und Live-GPS.'
          },
          url: 'https://www.grab.com',
          badge: { tr: `${countryName} Lideri`, en: 'Local #1', de: 'Lokal Nr. 1' }
        }
      : isMENA
      ? {
          id: 'careem-taxi',
          name: 'Careem & Uber (Hala Taksi)',
          logoText: 'Careem',
          logoBg: 'linear-gradient(135deg, #10B981 0%, #0D9488 100%)',
          categoryLabel: { tr: 'Resmi Taksi & Bisiklet', en: 'Official Hala Taxi & Bike', de: 'Offizielles Taxi' },
          phase: 'during',
          tagline: {
            tr: 'Orta Doğu & Körfez Resmi Taksi ve Bisiklet Uygulaması',
            en: 'Middle East & Gulf Official Superapp',
            de: 'Offizielle Taxi-App im Nahen Osten'
          },
          desc: {
            tr: 'Resmi şehir taksilerini ve Careem Bike bisikletlerini sabit tarifeyle anında çağırın.',
            en: 'Regulated official city taxi bookings and Careem Bike sharing with upfront fares.',
            de: 'Offizielle Stadttaxis und Fahrräder zum Festpreis buchen.'
          },
          url: 'https://www.careem.com',
          badge: { tr: 'Bölge Lideri', en: 'MENA Leader', de: 'Marktführer' }
        }
      : {
          id: 'bolt-freenow',
          name: 'Bolt, Uber & FREENOW',
          logoText: 'Bolt',
          logoBg: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
          categoryLabel: { tr: 'Taksi & Şehir İçi Araç', en: 'City Taxi & Rides', de: 'Stadttaxi & Fahrten' },
          phase: 'during',
          tagline: {
            tr: `${countryName} Şehirlerinde En Hızlı & Ekonomik Araç Çağırma`,
            en: `Fastest & Most Affordable Rides in ${countryName}`,
            de: 'Schnellste & günstigste Fahrten'
          },
          desc: {
            tr: 'Dakikalar içinde kapınıza gelen lisanslı taksiler, sabit fiyat garantisi ve kartla güvenli ödeme.',
            en: 'Competitive rates, rapid pickup times, and licensed drivers with cashless card payment.',
            de: 'Günstige Tarife und schnelle Abholung mit Kartenzahlung.'
          },
          url: 'https://bolt.eu',
          badge: { tr: 'En Ekonomik', en: 'Best Value', de: 'Top-Preis' }
        };

    return [
      // =========================================================================
      // PHASE 1: GİDERKEN (Uçuş, Alternatif Otel, Tren/Feribot, Sigorta, Transfer)
      // =========================================================================
      {
        id: 'wayaway-flights',
        name: 'WayAway, Aviasales & Trip.com',
        logoText: 'Fly ✈️',
        logoBg: 'linear-gradient(135deg, #0284C7 0%, #0D9488 100%)',
        categoryLabel: { tr: 'Uçak Bileti & Alternatif Uçuşlar', en: 'Flight Booking & Cashback', de: 'Flugbuchung & Cashback' },
        phase: 'before',
        tagline: {
          tr: 'Tüm Havayollarını Tarar + %5 Nakit İade (Cashback) Verir',
          en: 'Compares All Airlines with Up to 5% Cashback',
          de: 'Günstigste Flüge & bis zu 5% Cashback'
        },
        desc: {
          tr: `${countryName} uçuşlarında esnek tarihli en ucuz biletleri bulur, aktarmalı rotaları karşılaştırır ve nakit para iadesi sağlar.`,
          en: `Finds the lowest airfares to ${countryName} across 700+ airlines with instant cashback rewards.`,
          de: 'Vergleicht hunderte Airlines für die günstigsten Verbindungen.'
        },
        url: `https://wayaway.io/flights?destination=${encodeURIComponent(code)}`,
        badge: { tr: '%5 Nakit İade', en: '5% Cashback', de: '5% Cashback' }
      },
      {
        id: 'booking-agoda-hotels',
        name: isSEA ? 'Agoda, Booking.com & Expedia' : 'Booking.com, Agoda & Hotels.com',
        logoText: 'Otel 🏨',
        logoBg: 'linear-gradient(135deg, #0369A1 0%, #0EA5E9 100%)',
        categoryLabel: { tr: 'Otel, Villa & Alternatif Konaklama', en: 'Hotels, Villas & Stays', de: 'Hotels & Unterkünfte' },
        phase: 'before',
        tagline: {
          tr: 'Ücretsiz İptalli Oteller, Tatil Villaları ve %35 Mobil İndirim',
          en: 'Free Cancellation Hotels, Resorts & Up to 35% Mobile Deals',
          de: 'Kostenlose Stornierung & exklusive Rabatte'
        },
        desc: {
          tr: `${countryName} vize ve sınır kontrolünde geçerli ücretsiz iptal edilebilir otel, rezidans ve butik daire seçenekleri.`,
          en: `Border-compliant free cancellation hotels, resorts, and apartments across ${countryName}.`,
          de: `Große Auswahl an Hotels und Apartments in ${countryName}.`
        },
        url: isSEA
          ? `https://www.agoda.com/search?country=${code}`
          : `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(countryName)}`,
        badge: { tr: 'Ücretsiz İptal', en: 'Free Cancel', de: 'Gratis Storno' }
      },
      {
        id: 'hostelworld-airbnb',
        name: 'Hostelworld, Airbnb & Couchsurfing',
        logoText: 'Hostel',
        logoBg: 'linear-gradient(135deg, #0D9488 0%, #10B981 100%)',
        categoryLabel: { tr: 'Sosyal Hostel & Alternatif Evler', en: 'Hostels & Alternative Stays', de: 'Hostels & Ferienwohnungen' },
        phase: 'before',
        tagline: {
          tr: 'Bütçe Dostu Tasarım Hosteller, Yerel Evler & Gezgin Sohbetleri',
          en: 'Social Hostels, Local Homes & Traveler Group Chats',
          de: 'Soziale Hostels und lokale Unterkünfte'
        },
        desc: {
          tr: 'Rezervasyon yaptığınız anda aynı şehirdeki gezginlerle uygulama içi sohbet grubunu açar; yalnız gezginler için idealdir.',
          en: 'Unlocks city chatrooms with fellow solo travelers the moment you book your stay.',
          de: 'Ideal für Alleinreisende und digitale Nomaden.'
        },
        url: `https://www.hostelworld.com/search?search_keywords=${encodeURIComponent(countryName)}`,
        badge: { tr: 'Gezgin Favorisi', en: 'Solo Favorite', de: 'Budget-Tipp' }
      },
      {
        id: 'train-ferry-omio',
        name: isSEA ? '12Go, Omio & Ferryhopper' : 'Omio, Trainline & Ferryhopper',
        logoText: 'Tren/Feribot',
        logoBg: 'linear-gradient(135deg, #0284C7 0%, #06B6D4 100%)',
        categoryLabel: { tr: 'Tren, Feribot & Otobüs Biletleri', en: 'Trains, Ferries & Buses', de: 'Zug, Fähre & Bus' },
        phase: 'before',
        tagline: {
          tr: 'Hızlı Trenler, Ada Feribotları ve Şehirlerarası Otobüsler Tek Ekranda',
          en: 'High-Speed Rail, Island Ferries & Intercity Coaches',
          de: 'Hochgeschwindigkeitszüge, Fähren und Fernbusse'
        },
        desc: {
          tr: `${countryName} içi ve komşu ülkelere hızlı tren (Eurail/Trainline), ada feribotu (Ferryhopper/12Go) ve FlixBus biletleri.`,
          en: `Book high-speed trains, island-hopping ferries, and FlixBus coaches across ${countryName} with mobile QR tickets.`,
          de: 'Digitale QR-Tickets für Züge, Fähren und Fernbusse.'
        },
        url: isSEA ? 'https://12go.asia' : 'https://www.omio.com',
        badge: { tr: 'Tren & Feribot', en: 'Rail & Ferry', de: 'Bahn & Fähre' }
      },
      {
        id: 'safetywing-insurance',
        name: 'SafetyWing, EKTA & World Nomads',
        logoText: 'Sigorta 🛡️',
        logoBg: 'linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)',
        categoryLabel: { tr: 'Seyahat Sağlık & Vize Sigortası', en: 'Travel Medical Insurance', de: 'Reisekrankenversicherung' },
        phase: 'before',
        tagline: {
          tr: '185+ Ülkede Hastane, Kaza, Diş ve Kayıp Bagaj Güvencesi',
          en: 'Visa & Border Compliant Medical & Baggage Protection',
          de: 'Weltweiter medizinischer Schutz'
        },
        desc: {
          tr: 'Sınır kontrollerinde ve vize başvurularında %100 geçerli; yola çıktıktan sonra bile 2 dakikada online poliçe oluşturur.',
          en: 'Accepted at all border controls. Covers emergency hospitals, dental, delays, and lost luggage.',
          de: 'Deckt Notfallbehandlungen und Gepäckverlust zuverlässig ab.'
        },
        url: 'https://safetywing.com/nomad-insurance',
        badge: { tr: 'Sınır & Vize Uyumlu', en: 'Visa Compliant', de: 'Visum-Konform' }
      },
      {
        id: 'kiwitaxi-transfer',
        name: 'Kiwitaxi, GetTransfer & Welcome',
        logoText: 'VIP 🚖',
        logoBg: 'linear-gradient(135deg, #0D9488 0%, #0284C7 100%)',
        categoryLabel: { tr: 'Havalimanı VIP Karşılama & Transfer', en: 'Airport Pickup & Transfer', de: 'Flughafentransfer' },
        phase: 'before',
        tagline: {
          tr: 'Çıkış Kapısında İsim Tabelasıyla Karşılama & Sabit Fiyat',
          en: 'Meet & Greet Fixed-Price Airport Pickup',
          de: 'Flughafen-Abholung mit Namensschild'
        },
        desc: {
          tr: 'Uçağınız rötar yapsa bile şoförünüz ücretsiz bekler; döviz bozdurmadan veya taksi kuyruğuna girmeden otele ulaşırsınız.',
          en: 'Driver waits at arrivals with a name sign even if your flight is delayed. Fixed transparent rate.',
          de: 'Fahrer wartet mit Namensschild zum garantierten Festpreis.'
        },
        url: `https://kiwitaxi.com/?country=${code}`,
        badge: { tr: 'Sabit Fiyat', en: 'Fixed Rate', de: 'Festpreis' }
      },

      // =========================================================================
      // PHASE 2: GİDİNCE (Taksi, Motor/Scooter, Bisiklet, Para Transferi, eSIM, Arkadaşlık, Dil, Yemek)
      // =========================================================================
      taxiTool,
      {
        id: 'scooter-moto-bike',
        name: 'BikesBooking, Lime & Donkey Bike',
        logoText: 'Motor/Bisiklet',
        logoBg: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        categoryLabel: { tr: 'Motor, Scooter & Bisiklet Kiralama', en: 'Moto, Scooter & Bike Rental', de: 'Roller, Motorrad & Fahrrad' },
        phase: 'during',
        tagline: {
          tr: 'Günlük Vespa/Motosiklet, Elektrikli Scooter & Şehir Bisikleti',
          en: 'Rent Scooters, Motorcycles, E-Bikes & City Bicycles',
          de: 'Roller, Motorräder, E-Scooter und Fahrräder mieten'
        },
        desc: {
          tr: `${countryName} içinde pasaportunuzu rehin bırakmadan sigortalı motosiklet/scooter kiralayın veya QR kodla anında bisiklet/scooter açın.`,
          en: `Book insured motorcycles and scooters online via BikesBooking or unlock Lime/Donkey city bikes via QR.`,
          de: 'Versicherte Roller online buchen oder Stadt-Fahrräder per App entsperren.'
        },
        url: 'https://bikesbooking.com',
        badge: { tr: 'Scooter & Bisiklet', en: 'Moto & Bike', de: 'Roller & Rad' }
      },
      {
        id: 'wise-revolut-money',
        name: 'Wise, Revolut & Remitly',
        logoText: 'Wise 💸',
        logoBg: 'linear-gradient(135deg, #059669 0%, #0D9488 100%)',
        categoryLabel: { tr: 'Para Transferi & Çoklu Döviz Kartı', en: 'Money Transfer & Multi-Currency Card', de: 'Geldtransfer & Währungskarte' },
        phase: 'during',
        tagline: {
          tr: 'Reel Merkez Bankası Kuruyla 0 Gizli Komisyonlu Harcama & Transfer',
          en: 'Real Mid-Market FX Rate Spending & Instant Money Transfers',
          de: 'Reale Wechselkurse ohne versteckte Bankgebühren'
        },
        desc: {
          tr: 'Yurt dışında %7 banka kur farkı ödemeden yerel para biriminde ödeme yapın, ATM’den nakit çekin ve anında uluslararası para gönderin.',
          en: 'Spend in 40+ local currencies without bank markups, withdraw from ATMs, and send money globally.',
          de: 'Zahlen in Landeswährung zum echten Devisenkurs ohne Aufschläge.'
        },
        url: 'https://wise.com',
        badge: { tr: '0 Kur Komisyonu', en: 'Zero FX Markup', de: '0% Aufschlag' }
      },
      {
        id: 'airalo-holafly-esim',
        name: 'Airalo, Holafly & Yesim (5G eSIM)',
        logoText: 'eSIM 📶',
        logoBg: 'linear-gradient(135deg, #06B6D4 0%, #0284C7 100%)',
        categoryLabel: { tr: 'Yurt Dışı eSIM & Sınırsız İnternet', en: 'Instant 5G Travel eSIM', de: 'eSIM & Mobiles Internet' },
        phase: 'during',
        tagline: {
          tr: 'Havalimanında SIM Kuyruğuna Girmeden QR Kodla Anında 5G İnternet',
          en: 'Instant Local 5G Data Upon Landing Without Physical SIM Swap',
          de: 'Sofortiges 5G bei Ankunft ohne physischen SIM-Wechsel'
        },
        desc: {
          tr: `Uçağınız ${countryName} havalimanına indiği saniye internetiniz çalışır; kendi WhatsApp numaranız açık kalır.`,
          en: `Connects to top local networks in ${countryName} the moment you land while keeping your WhatsApp number.`,
          de: 'Direkte Aktivierung per QR-Code bei der Landung.'
        },
        url: 'https://www.airalo.com',
        badge: { tr: 'Anında 5G QR', en: 'Instant 5G', de: 'Sofort-5G' }
      },
      {
        id: 'social-friendship-dating',
        name: 'Meetup, Bumble BFF, Tinder & Timeleft',
        logoText: 'Arkadaş 🤝',
        logoBg: 'linear-gradient(135deg, #0EA5E9 0%, #14B8A6 100%)',
        categoryLabel: { tr: 'Arkadaşlık, Sosyal Etkinlik & Topluluk', en: 'Friendship, Social & Meetups', de: 'Freundschaft & Events' },
        phase: 'during',
        tagline: {
          tr: 'Yerel Halkla, Expatlarla ve Diğer Gezginlerle Tanışma & Etkinlikler',
          en: 'Meet Locals, Expats & Fellow Travelers for Coffee or Dinner',
          de: 'Einheimische und Reisende vor Ort kennenlernen'
        },
        desc: {
          tr: 'Dil değişim (language exchange) gecelerine katılın, Timeleft ile çarşamba akşam yemeklerinde 5 yeni insanla tanışın veya gezi arkadaşı bulun.',
          en: 'Join language exchange nights, Timeleft group dinners, Bumble BFF friend-finding, and Couchsurfing hangouts.',
          de: 'Sprachaustausch, Gruppen-Abendessen und Reisepartner finden.'
        },
        url: 'https://www.meetup.com',
        badge: { tr: 'Sosyal & Arkadaşlık', en: 'Social & Friends', de: 'Community' }
      },
      {
        id: 'preply-language-translate',
        name: 'Preply, DeepL & Google Lens Çeviri',
        logoText: 'Dil 🗣️',
        logoBg: 'linear-gradient(135deg, #0284C7 0%, #0D9488 100%)',
        categoryLabel: { tr: 'Dil Öğrenme & Kamera Menü Çevirisi', en: 'Language Tutors & Live Translation', de: 'Sprache & Übersetzung' },
        phase: 'during',
        tagline: {
          tr: '1’e 1 Yerel Öğretmenlerle Pratik & Restoran Menüsü Kamera Çevirisi',
          en: '1-on-1 Native Tutors & Instant Camera Menu Translation',
          de: 'Sprachlehrer & Kamera-Menüübersetzung'
        },
        desc: {
          tr: `${countryName} seyahati öncesi yerel eğitmenlerle konuşma pratiği yapın; sokakta tabelaları ve menüleri kamerayla anında çevirin.`,
          en: `Practice local phrases with native tutors on Preply and translate menus visually with your phone camera.`,
          de: 'Grundbegriffe mit Muttersprachlern lernen und Speisekarten übersetzen.'
        },
        url: 'https://preply.com',
        badge: { tr: '1’e 1 Dil & Çeviri', en: 'Native Tutors', de: 'Sprachpraxis' }
      },
      {
        id: 'food-delivery-wolt',
        name: isSEA ? 'GrabFood & Foodpanda' : isEurope ? 'Wolt, Deliveroo & Uber Eats' : 'Wolt & Uber Eats',
        logoText: 'Yemek 🍲',
        logoBg: 'linear-gradient(135deg, #0D9488 0%, #10B981 100%)',
        categoryLabel: { tr: 'Yemek & Market Siparişi', en: 'Food & Grocery Delivery', de: 'Essen & Supermarkt' },
        phase: 'during',
        tagline: {
          tr: '25 Dakikada Otel Odanıza Sıcak Yerel Lezzetler & Süpermarket',
          en: 'Local Dishes & Groceries Delivered to Your Hotel in 25 Mins',
          de: 'Lokale Gerichte direkt ins Hotel geliefert'
        },
        desc: {
          tr: 'İngilizce menü desteğiyle en yüksek puanlı yerel restoranlardan ve marketlerden otele hızlı sipariş.',
          en: 'Order from top-rated local restaurants and pharmacies with English menus and live courier tracking.',
          de: 'Schnelle Lieferung von Top-Restaurants mit Live-Tracking.'
        },
        url: isSEA ? 'https://food.grab.com' : 'https://wolt.com',
        badge: { tr: '25 Dk Teslimat', en: 'Fast Delivery', de: 'Schnell' }
      },

      // =========================================================================
      // PHASE 3: DÖNERKEN (Bagaj Emanet, Uçuş Tazminatı, VIP Lounge, Tax-Free)
      // =========================================================================
      {
        id: 'bounce-luggage-storage',
        name: 'Bounce, Radical Storage & LuggageHero',
        logoText: 'Bagaj 🧳',
        logoBg: 'linear-gradient(135deg, #0284C7 0%, #0D9488 100%)',
        categoryLabel: { tr: '7/24 Sigortalı Bagaj Emanet Hizmeti', en: 'Insured Luggage Storage Network', de: 'Gepäckaufbewahrung' },
        phase: 'return',
        tagline: {
          tr: 'Otel Çıkışından Sonra Uçuş Saatine Kadar Bavulsuz Özgürce Gezin',
          en: 'Drop Off Heavy Bags Safely After Hotel Check-Out',
          de: 'Gepäck nach dem Check-out sicher lagern'
        },
        desc: {
          tr: 'Tren garları, meydanlar ve havalimanı yakınındaki onaylı noktalara bavulunuzu 10.000$ sigorta güvencesiyle saatlik/günlük bırakın.',
          en: 'Store bags at thousands of verified shops and hotels near transit hubs with $10,000 bag protection.',
          de: 'Koffer an zentralen Stationen versichert abgeben und frei erkunden.'
        },
        url: 'https://usebounce.com',
        badge: { tr: '10.000$ Sigortalı', en: 'Insured Storage', de: 'Versichert' }
      },
      {
        id: 'airhelp-compensation',
        name: 'AirHelp & Compensair (Uçuş Tazminatı)',
        logoText: '600€ ⚖️',
        logoBg: 'linear-gradient(135deg, #0369A1 0%, #0EA5E9 100%)',
        categoryLabel: { tr: 'Rötar & İptal Uçuş Tazminatı', en: 'Flight Delay Compensation', de: 'Flugentschädigung' },
        phase: 'return',
        tagline: {
          tr: '3 Saatten Fazla Rötar veya İptal Olan Uçuşlarda 600€ Nakit Hak',
          en: 'Claim Up to €600 Cash for Delayed or Cancelled Flights',
          de: 'Bis zu 600€ Entschädigung bei Flugverspätung'
        },
        desc: {
          tr: 'Uçuşunuz geciktiyse veya iptal edildiyse ön ödeme yapmadan bilet numaranızı girin; yasal tazminatınızı havayolundan tahsil etsin.',
          en: 'Check eligibility in 2 minutes. Zero upfront fees—only pays out when your airline compensation is won.',
          de: 'Kein Kostenrisiko – schnelle Prüfung Ihres Entschädigungsanspruchs.'
        },
        url: 'https://www.airhelp.com',
        badge: { tr: '600€’ya Kadar Hak', en: 'Up to €600', de: 'Bis zu 600€' }
      },
      {
        id: 'priority-pass-taxfree',
        name: 'Priority Pass VIP & Global Blue Tax-Free',
        logoText: 'VIP & KDV',
        logoBg: 'linear-gradient(135deg, #0F766E 0%, #10B981 100%)',
        categoryLabel: { tr: 'Havalimanı VIP Lounge & KDV İadesi', en: 'Airport VIP Lounge & VAT Refund', de: 'VIP-Lounge & Tax-Free' },
        phase: 'return',
        tagline: {
          tr: '1400+ Havalimanı VIP Lounge + Alışverişlerde %20’ye Varan KDV İadesi',
          en: '1400+ Airport VIP Lounges & Instant Retail VAT Refunds',
          de: 'Zugang zu 1400+ Lounges & Mehrwertsteuer-Rückerstattung'
        },
        desc: {
          tr: 'Dönüş uçuşunuzu açık büfe VIP salonda bekleyin ve yurt dışı alışverişlerinizin vergisini (Tax-Free) havalimanında geri alın.',
          en: 'Relax in quiet airport lounges with buffet dining and claim back retail VAT before boarding.',
          de: 'Entspannt vor dem Rückflug warten und Mehrwertsteuer zurückholen.'
        },
        url: 'https://www.prioritypass.com',
        badge: { tr: 'VIP & %20 İade', en: 'VIP & Tax-Free', de: 'VIP & Steuerfrei' }
      }
    ];
  }, [countryName, code, isSEA, isMENA, isEurope]);

  const filteredTools = useMemo(() => {
    return allTools.filter((t) => {
      const matchPhase = selectedPhase === 'all' || t.phase === selectedPhase;
      if (!matchPhase) return false;
      if (!searchFilter.trim()) return true;
      const q = searchFilter.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.categoryLabel.tr.toLowerCase().includes(q) ||
        t.categoryLabel.en.toLowerCase().includes(q) ||
        t.desc.tr.toLowerCase().includes(q) ||
        t.tagline.tr.toLowerCase().includes(q)
      );
    });
  }, [allTools, selectedPhase, searchFilter]);

  const beforeCount = allTools.filter((t) => t.phase === 'before').length;
  const duringCount = allTools.filter((t) => t.phase === 'during').length;
  const returnCount = allTools.filter((t) => t.phase === 'return').length;

  return (
    <div className="space-y-6">
      {/* Harmonious Turquoise & Ocean Blue Header Banner */}
      <div className="relative overflow-hidden rounded-[26px] p-5 sm:p-7 bg-gradient-to-r from-[#0C4A6E] via-[#0F766E] to-[#0D9488] text-white border-2 border-[#5EEAD4]/60 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs sm:text-sm font-black bg-[#5EEAD4] text-[#042F2E] flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-4 h-4" />
                <span>{l('360° Süper Uygulama & Hizmet Ekosistemi', '360° Super-App & Service Ecosystem', '360° Reise-Ökosystem')}</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-white/15 text-[#CCFBF1] border border-white/25">
                {countryName} ({code}) · {allTools.length} {l('Kategori', 'Categories', 'Kategorien')}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {l(
                `${countryName} İçin Tüm Seyahat Uygulamaları & Hizmetler`,
                `All Essential Travel Apps & Services for ${countryName}`,
                `Alle Reise-Apps & Services für ${countryName}`
              )}
            </h2>
            <p className="text-sm sm:text-base text-[#CCFBF1] max-w-3xl leading-relaxed font-medium">
              {l(
                'Uçuş, alternatif otel, taksi, motor/scooter, bisiklet, tren/feribot, para transferi, sigorta, eSIM, arkadaşlık, dil ve bagaj emanet uygulamaları logolarıyla tek ekranda.',
                'Flights, alternative stays, taxi, scooter/moto, bike, train/ferry, money transfer, insurance, eSIM, friendship, language, and luggage storage with official links.',
                'Flüge, Hotels, Taxis, Roller/Fahrräder, Züge/Fähren, Geldtransfer, Versicherung, eSIM, Sprache und Gepäck.'
              )}
            </p>
          </div>

          {/* Search input inside apps */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="w-4 h-4 text-[#042F2E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder={l('Taksi, tren, bisiklet, para, dil ara...', 'Search taxi, train, bike, money...')}
              className="w-full pl-10 pr-4 py-2.5 rounded-full text-sm font-bold bg-[#F0FDFA] text-[#042F2E] placeholder:text-[#0F766E] border-2 border-[#5EEAD4] focus:outline-none"
            />
          </div>
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/20 overflow-x-auto no-scrollbar">
          {[
            { key: 'all' as const, icon: Layers, label: l('Tüm Hizmetler', 'All Services', 'Alle Services'), count: allTools.length },
            { key: 'before' as const, icon: Plane, label: l('🛫 1. Giderken (Uçuş, Otel, Tren, Sigorta)', '🛫 1. Before Trip (Flight, Stay, Rail, Insure)', '🛫 1. Vor der Reise'), count: beforeCount },
            { key: 'during' as const, icon: Compass, label: l('📍 2. Gidince (Taksi, Scooter, Bisiklet, Para, Arkadaş, Dil)', '📍 2. In Country (Ride, Bike, FX, Social, Language)', '📍 2. Vor Ort'), count: duringCount },
            { key: 'return' as const, icon: Luggage, label: l('🛬 3. Dönerken (Bagaj Emanet, 600€ Tazminat, VIP)', '🛬 3. Return (Luggage, €600 Claim, VIP)', '🛬 3. Rückreise'), count: returnCount }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedPhase === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedPhase(tab.key)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#5EEAD4] text-[#042F2E] shadow-lg'
                    : 'bg-white/15 text-white hover:bg-white/25 border border-white/25'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
                <span className="px-2 py-0.5 rounded-full text-xs bg-black/20 font-mono">{tab.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Symmetrical Grid of Super-App Cards with Visible Brand Logos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredTools.map((tool) => {
          const catLabel = tool.categoryLabel[language as keyof typeof tool.categoryLabel] || tool.categoryLabel.tr;
          const tagline = tool.tagline[language as keyof typeof tool.tagline] || tool.tagline.tr;
          const desc = tool.desc[language as keyof typeof tool.desc] || tool.desc.tr;
          const badgeText = tool.badge[language as keyof typeof tool.badge] || tool.badge.tr;

          return (
            <div
              key={tool.id}
              className="flex flex-col justify-between p-5 rounded-[24px] bg-[#F0FDFA] dark:bg-[#0B3B4C] border-2 border-[#5EEAD4]/60 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <div className="space-y-3">
                {/* Brand Logo Avatar + Category + Title */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      style={{ background: tool.logoBg }}
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xs sm:text-sm text-center px-1.5 shadow-md shrink-0 border border-white/40 leading-tight"
                    >
                      {tool.logoText}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-extrabold uppercase tracking-wider text-[#0F766E] dark:text-[#5EEAD4] truncate">
                        {catLabel}
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-[#042F2E] dark:text-white leading-snug">
                        {tool.name}
                      </h3>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-black bg-[#CCFBF1] dark:bg-[#064E3B] text-[#042F2E] dark:text-[#5EEAD4] border border-[#2DD4BF] shrink-0">
                    {badgeText}
                  </span>
                </div>

                {/* Tagline */}
                <div className="text-sm font-extrabold text-[#0369A1] dark:text-[#7DD3FC] leading-snug">
                  {tagline}
                </div>

                {/* Readable Description */}
                <p className="text-sm text-[#064E3B] dark:text-[#E2E8F0] leading-relaxed font-medium">
                  {desc}
                </p>
              </div>

              {/* Action CTA */}
              <div className="pt-4 mt-4 border-t border-[#5EEAD4]/40">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#0284C7] hover:from-[#0F766E] hover:to-[#0369A1] text-white font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer no-underline"
                >
                  <span>{l('Uygulamayı Aç & İncele', 'Open App & Explore', 'App öffnen & ansehen')}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="p-4 rounded-2xl bg-[#F0FDFA]/90 dark:bg-[#0B3B4C]/90 border border-[#5EEAD4]/50 text-xs sm:text-sm font-bold text-[#042F2E] dark:text-[#CCFBF1] flex items-center gap-3">
        <Info className="w-5 h-5 text-[#0D9488] dark:text-[#5EEAD4] shrink-0" />
        <span>
          {l(
            'Tüm uygulama bağlantıları ilgili ülkede aktif çalışan resmi platformlara yönlendirir; Vizamigo üzerinden ek komisyon alınmaz.',
            'All app links direct to official platforms actively operating in the destination country with zero extra commission.',
            'Alle Links führen direkt zu offiziellen Plattformen ohne Zusatzgebühren.'
          )}
        </span>
      </div>
    </div>
  );
};
