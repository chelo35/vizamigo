import React, { useState, useMemo } from 'react';
import {
  Plane,
  Building2,
  Car,
  Wifi,
  Shield,
  CreditCard,
  UtensilsCrossed,
  Coffee,
  Languages,
  Heart,
  Luggage,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Compass,
  ArrowRight,
  Info,
  Clock,
  Layers
} from 'lucide-react';
import { useI18n } from '../data/i18n';
import { getCountryName } from '../data/passportData';
import { getCountryNomadApps } from '../data/rideAndDeliveryApps';

interface EasyVacationAssistantProps {
  countryCode: string;
  originPassport?: string;
}

type PhaseFilter = 'all' | 'before' | 'during' | 'return';

interface AssistantToolItem {
  id: string;
  name: string;
  categoryLabel: { tr: string; en: string; de: string };
  phase: 'before' | 'during' | 'return';
  icon: React.ReactNode;
  tagline: { tr: string; en: string; de: string };
  desc: { tr: string; en: string; de: string };
  url: string;
  badge: { tr: string; en: string; de: string };
  badgeTone: 'emerald' | 'cyan' | 'amber' | 'rose' | 'indigo';
  isLocalDominant?: boolean;
}

export const EasyVacationAssistant: React.FC<EasyVacationAssistantProps> = ({
  countryCode,
  originPassport = 'TR'
}) => {
  const { language, l } = useI18n();
  const [selectedPhase, setSelectedPhase] = useState<PhaseFilter>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const countryName = useMemo(() => getCountryName(countryCode, language), [countryCode, language]);
  const code = countryCode.toUpperCase();

  // Southeast Asia cluster
  const isSEA = ['TH', 'VN', 'ID', 'MY', 'SG', 'PH', 'KH', 'LA', 'MM'].includes(code);
  // Caucasus & Central Asia cluster
  const isEurasia = ['GE', 'AZ', 'AM', 'KZ', 'UZ', 'KG'].includes(code);
  // Gulf & Middle East
  const isMENA = ['AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'EG', 'JO'].includes(code);
  // Europe
  const isEurope = [
    'DE', 'FR', 'IT', 'ES', 'NL', 'GR', 'PT', 'AT', 'CH', 'BE', 'CZ', 'PL', 'HU',
    'HR', 'AL', 'ME', 'BA', 'RS', 'MK', 'BG', 'RO', 'SE', 'NO', 'DK', 'FI', 'GB', 'IE'
  ].includes(code);

  // Dynamic Tools & Affiliate Catalog
  const allTools = useMemo<AssistantToolItem[]>(() => {
    // 1. Taxis & Rides
    const taxiTool: AssistantToolItem = isSEA
      ? {
          id: 'grab-taxi',
          name: 'Grab & Bolt',
          categoryLabel: { tr: 'Taksi & Araç Çağırma', en: 'Ride-Hailing & Taxi', de: 'Taxi & Fahrdienst' },
          phase: 'during',
          icon: <Car className="w-4 h-4 text-emerald-400" />,
          tagline: {
            tr: `${countryName}'de En Çok Kullanılan Resmi Taksi`,
            en: `Leading Ride-Hailing in ${countryName}`,
            de: `Führender Fahrdienst in ${countryName}`
          },
          desc: {
            tr: 'Taksimetre pazarlığına girmeyin; kredi kartı ile sabit fiyatla araç çağırın ve canlı GPS takibiyle güvenle seyahat edin.',
            en: 'Avoid street meter haggling. Book upfront fixed-price rides with card payment and live GPS tracking.',
            de: 'Feste Preise ohne Feilschen mit Kartenzahlung und Live-GPS-Verfolgung.'
          },
          url: 'https://www.grab.com',
          badge: { tr: `🇹🇭 ${countryName}'de 1 Numara`, en: 'Top Local Pick', de: 'Top-Empfehlung' },
          badgeTone: 'emerald',
          isLocalDominant: true
        }
      : isMENA
      ? {
          id: 'careem-taxi',
          name: 'Careem (Hala Taxi)',
          categoryLabel: { tr: 'Resmi Taksi & Araç', en: 'Official Hala Taxi', de: 'Offizielles Taxi' },
          phase: 'during',
          icon: <Car className="w-4 h-4 text-emerald-400" />,
          tagline: {
            tr: 'Körfez & Orta Doğu Resmi Ulaşım Uygulaması',
            en: 'Middle East & Gulf Official Taxi App',
            de: 'Offizielle Taxi-App im Nahen Osten'
          },
          desc: {
            tr: 'Resmi taksiler dahil sabit tarifeyle araç çağırın, havaalanı transferlerinde sürpriz ücret yaşamayın.',
            en: 'Regulated official city taxi bookings with upfront metered estimates and zero surprises.',
            de: 'Offizielle Stadttaxis mit Festpreis und regulierten Tarifen buchen.'
          },
          url: 'https://www.careem.com',
          badge: { tr: 'Orta Doğu Lideri', en: 'MENA Leader', de: 'Nahost-Marktführer' },
          badgeTone: 'emerald',
          isLocalDominant: true
        }
      : isEurope
      ? {
          id: 'bolt-taxi',
          name: 'Bolt & FreeNow',
          categoryLabel: { tr: 'Taksi & Şehir İçi Ulaşım', en: 'City Taxi & Rides', de: 'Stadttaxi & Fahrten' },
          phase: 'during',
          icon: <Car className="w-4 h-4 text-cyan-400" />,
          tagline: {
            tr: 'Avrupa Genelinde En Hızlı & Uygun Araç Çağırma',
            en: 'Fastest & Most Affordable in Europe',
            de: 'Schnellste & günstigste Fahrten in Europa'
          },
          desc: {
            tr: 'Uber’den daha uygun komisyon oranları ve dakikalar içinde kapınıza gelen lisanslı taksiler.',
            en: 'Competitive rates, rapid pickup times, and licensed city drivers across Europe.',
            de: 'Günstige Tarife und schnelle Abholung in europäischen Großstädten.'
          },
          url: 'https://bolt.eu',
          badge: { tr: 'Avrupa Geneli Popüler', en: 'Europe Wide', de: 'Europaweit' },
          badgeTone: 'cyan',
          isLocalDominant: true
        }
      : {
          id: 'uber-taxi',
          name: 'Uber / Cabify',
          categoryLabel: { tr: 'Taksi & Araç Çağırma', en: 'Ride-Hailing', de: 'Fahrdienst' },
          phase: 'during',
          icon: <Car className="w-4 h-4 text-slate-300" />,
          tagline: {
            tr: 'Güvenilir Küresel Şehir Ulaşımı',
            en: 'Reliable Global Rides',
            de: 'Zuverlässige weltweite Fahrten'
          },
          desc: {
            tr: 'Tek hesapla dünyanın her yerinde güvenli araç çağırma ve otomatik döviz kuruyla ödeme imkanı.',
            en: 'Seamless ride-hailing with automatic currency conversion and vetted drivers.',
            de: 'Nahtlose Fahrtenbuchung mit automatischer Währungsumrechnung.'
          },
          url: 'https://www.uber.com',
          badge: { tr: 'Global Ağ', en: 'Global Network', de: 'Weltweit' },
          badgeTone: 'cyan'
        };

    // 2. Food Delivery Leader
    const foodDeliveryTool: AssistantToolItem = isSEA
      ? {
          id: 'food-sea',
          name: 'GrabFood & Foodpanda',
          categoryLabel: { tr: 'Yeme-İçme & Sipariş', en: 'Food & Dining Delivery', de: 'Essen & Lieferservice' },
          phase: 'during',
          icon: <UtensilsCrossed className="w-4 h-4 text-amber-400" />,
          tagline: {
            tr: 'Sokak Lezzetleri & Restoran Siparişi',
            en: 'Local Street Food & Restaurants',
            de: 'Lokales Streetfood & Restaurants'
          },
          desc: {
            tr: 'Otel odanıza veya kafenize meşhur yerel yemekleri ve taze meyveleri uygun fiyatla sipariş edin.',
            en: 'Order famous local dishes and fresh fruits straight to your stay or cafe with live driver tracking.',
            de: 'Berühmte lokale Gerichte direkt zu Ihrer Unterkunft bestellen.'
          },
          url: 'https://food.grab.com',
          badge: { tr: 'Yerel Menüler', en: 'Local Menus', de: 'Lokale Küche' },
          badgeTone: 'amber'
        }
      : isEurope
      ? {
          id: 'food-europe',
          name: 'Wolt & Deliveroo',
          categoryLabel: { tr: 'Yeme-İçme & Sipariş', en: 'Food & Dining Delivery', de: 'Essen & Lieferservice' },
          phase: 'during',
          icon: <UtensilsCrossed className="w-4 h-4 text-amber-400" />,
          tagline: {
            tr: 'En İyi Restoranlardan Kapıya Teslimat',
            en: 'Top Curated Restaurant Delivery',
            de: 'Lieferung von Top-Restaurants'
          },
          desc: {
            tr: 'Şehrin en iyi kafe ve restoranlarından dakikalar içinde sıcak teslimat.',
            en: 'Fast deliveries from top-rated restaurants, cafes, and bakeries in town.',
            de: 'Schnelle Lieferung von erstklassigen Restaurants und Bäckereien.'
          },
          url: 'https://wolt.com',
          badge: { tr: 'Hızlı Teslimat', en: 'Fast Delivery', de: 'Schnell' },
          badgeTone: 'amber'
        }
      : {
          id: 'food-global',
          name: 'Uber Eats',
          categoryLabel: { tr: 'Yeme-İçme & Sipariş', en: 'Food Delivery', de: 'Essenslieferung' },
          phase: 'during',
          icon: <UtensilsCrossed className="w-4 h-4 text-amber-400" />,
          tagline: {
            tr: 'Dünya Çapında Yemek Siparişi',
            en: 'Global Dining Delivery',
            de: 'Weltweiter Lieferservice'
          },
          desc: {
            tr: 'Binlerce restoran seçeneğiyle yurt dışında acıktığınızda yabancılık çekmeyin.',
            en: 'Comfort food and local favorites delivered to your door wherever you travel.',
            de: 'Ihre Lieblingsgerichte weltweit bequem an die Tür geliefert.'
          },
          url: 'https://www.ubereats.com',
          badge: { tr: 'Küresel', en: 'Global', de: 'Global' },
          badgeTone: 'amber'
        };

    return [
      // ==========================================
      // PHASE 1: GİDERKEN (Planlama & Rezervasyon)
      // ==========================================
      {
        id: 'skyscanner-flights',
        name: 'Skyscanner & WayAway',
        categoryLabel: { tr: 'Uçak Bileti', en: 'Flight Booking', de: 'Flugbuchung' },
        phase: 'before',
        icon: <Plane className="w-4 h-4 text-cyan-400" />,
        tagline: {
          tr: 'En Ucuz Uçuşlar & Nakit Para İadesi (Cashback)',
          en: 'Cheapest Flights & Cashback Deals',
          de: 'Günstigste Flüge & Cashback'
        },
        desc: {
          tr: 'Yüzlerce havayolunu tarar, en uygun aktarmalı ve direkt uçuşları karşılaştırarak tasarruf sağlar.',
          en: 'Scans hundreds of airlines and OTAs to uncover the lowest fares and smartest flight connections.',
          de: 'Vergleicht hunderte Fluggesellschaften für günstigste Verbindungen.'
        },
        url: `https://www.skyscanner.net/transport/flights/?destination=${code}`,
        badge: { tr: 'Fiyat Alarmı', en: 'Price Tracker', de: 'Preis-Alarm' },
        badgeTone: 'cyan'
      },
      {
        id: 'booking-hotel',
        name: isSEA ? 'Agoda & Booking.com' : 'Booking.com & Expedia',
        categoryLabel: { tr: 'Otel & Konaklama', en: 'Hotels & Resorts', de: 'Hotels & Unterkünfte' },
        phase: 'before',
        icon: <Building2 className="w-4 h-4 text-indigo-400" />,
        tagline: {
          tr: isSEA ? 'Asya’da En Düşük Fiyat Garantisi ve Gizli İndirimler' : 'Ücretsiz İptalli Otel & Daire Seçenekleri',
          en: isSEA ? 'Best Price Guarantee Across Asia' : 'Free Cancellation Stays Worldwide',
          de: isSEA ? 'Beste Hotelpreise in Asien' : 'Kostenlose Stornierung weltweit'
        },
        desc: {
          tr: `${countryName}'de merkezi oteller, tatil villaları ve resortlarda en geniş seçenek ve güvenli rezervasyon.`,
          en: `Wide selection of vetted hotels, boutique villas, and resorts in ${countryName} with flexible policies.`,
          de: `Große Auswahl an Hotels und Ferienwohnungen in ${countryName}.`
        },
        url: isSEA
          ? `https://www.agoda.com/search?country=${code}`
          : `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(countryName)}`,
        badge: { tr: isSEA ? 'Asya’da %15 Ekstra İndirim' : 'Ücretsiz İptal', en: 'Top Hotel Deal', de: 'Top-Hoteldeal' },
        badgeTone: 'indigo'
      },
      {
        id: 'hostelworld',
        name: 'Hostelworld',
        categoryLabel: { tr: 'Hostel & Genç Gezgin', en: 'Hostels & Budget Stays', de: 'Hostels & Budget' },
        phase: 'before',
        icon: <Compass className="w-4 h-4 text-emerald-400" />,
        tagline: {
          tr: 'Sırt Çantalı Gezginler & Sosyal Hosteller',
          en: 'Social Hostels for Solo Travelers',
          de: 'Soziale Hostels für Alleinreisende'
        },
        desc: {
          tr: 'Yalnız seyahat edenler için yeni arkadaşlar edinme, ortak etkinliklere katılma ve bütçe dostu konaklama.',
          en: 'Connect with fellow solo travelers, join local walking tours, and book vetted budget dorms.',
          de: 'Günstig übernachten und Kontakte mit anderen Reisenden knüpfen.'
        },
        url: `https://www.hostelworld.com/search?search_keywords=${encodeURIComponent(countryName)}`,
        badge: { tr: 'Genç & Göçebe', en: 'Backpacker Favorite', de: 'Budget-Tipp' },
        badgeTone: 'emerald'
      },
      {
        id: 'safetywing-insurance',
        name: 'SafetyWing & EKTA',
        categoryLabel: { tr: 'Seyahat Sağlık Sigortası', en: 'Travel Medical Insurance', de: 'Reisekrankenversicherung' },
        phase: 'before',
        icon: <Shield className="w-4 h-4 text-rose-400" />,
        tagline: {
          tr: 'Dünya Çapında Acil Sağlık, Kaza ve Bagaj Koruması',
          en: 'Worldwide Nomad Medical & Baggage Protection',
          de: 'Weltweiter medizinischer Schutz'
        },
        desc: {
          tr: 'Sınırlarda ve vize başvurularında %100 geçerli; yurt dışında hastane, ambulans ve kayıp bavul masraflarını karşılar.',
          en: 'Accepted for visa audits and border controls. Covers emergency health care, delays, and lost luggage.',
          de: 'Deckt Notfallbehandlungen, Flugausfälle und Gepäckverlust zuverlässig ab.'
        },
        url: 'https://safetywing.com/nomad-insurance',
        badge: { tr: 'Vize & Sınır Uyumlu', en: 'Visa & Border Compliant', de: 'Visum-Konform' },
        badgeTone: 'rose'
      },
      {
        id: 'kiwitaxi-transfer',
        name: 'Kiwitaxi & GetTransfer',
        categoryLabel: { tr: 'Havalimanı VIP Transferi', en: 'Airport Private Transfer', de: 'Flughafentransfer' },
        phase: 'before',
        icon: <Car className="w-4 h-4 text-amber-400" />,
        tagline: {
          tr: 'İsim Tabelasıyla Karşılama & Sabit Fiyatlı Transfer',
          en: 'Meet & Greet Fixed Price Airport Pickup',
          de: 'Flughafen-Abholung mit Namensschild'
        },
        desc: {
          tr: 'Uçaktan indiğinizde şoförünüz kapıda bekler; bavullarınızla toplu taşıma aramadan doğrudan otelinize ulaşırsınız.',
          en: 'Professional driver waiting in the arrivals hall with a name sign. Fixed transparent fare.',
          de: 'Fahrer wartet mit Namensschild in der Ankunftshalle zum Festpreis.'
        },
        url: `https://kiwitaxi.com/?country=${code}`,
        badge: { tr: 'Sabit Fiyat', en: 'Fixed Rate', de: 'Festpreis' },
        badgeTone: 'amber'
      },

      // ==========================================
      // PHASE 2: GİDİNCE (Ülkedeyken & Günlük Yaşam)
      // ==========================================
      taxiTool,
      {
        id: 'airalo-esim',
        name: 'Airalo & Holafly eSIM',
        categoryLabel: { tr: 'eSIM & Mobil İnternet', en: 'eSIM & Mobile Data', de: 'eSIM & Mobiles Internet' },
        phase: 'during',
        icon: <Wifi className="w-4 h-4 text-teal-400" />,
        tagline: {
          tr: 'Havalimanında Hat Kuyruğuna Girmeden Anında İnternet',
          en: 'Instant Local 5G Data Without Roaming Fees',
          de: 'Sofortiges lokales 5G ohne Roaming-Gebühren'
        },
        desc: {
          tr: 'Uçağınız piste teker koyduğu an internetiniz aktif olur. Fiziksel SIM kart takıp çıkarmaya gerek yoktur.',
          en: 'Instantly connects to local networks upon landing via QR code. Zero physical SIM swapping required.',
          de: 'Direkte Aktivierung per QR-Code bei Ankunft ohne physischen SIM-Wechsel.'
        },
        url: `https://www.airalo.com/${countryName.toLowerCase()}-esim`,
        badge: { tr: 'Anında Aktivasyon', en: 'Instant QR Active', de: 'Sofort-Aktivierung' },
        badgeTone: 'cyan'
      },
      {
        id: 'wise-banking',
        name: 'Wise & Revolut',
        categoryLabel: { tr: 'Para Transferi & Döviz Kartı', en: 'Multi-Currency & FX Card', de: 'Währungskonto & Transfer' },
        phase: 'during',
        icon: <CreditCard className="w-4 h-4 text-emerald-400" />,
        tagline: {
          tr: 'Piyasa Kuruyla Komisyonsuz Harcama & Anında Transfer',
          en: 'Real Mid-Market Rate Card Spending & Transfers',
          de: 'Reale Wechselkurse ohne Bankgebühren'
        },
        desc: {
          tr: 'Banka komisyonu ödemeden yerel para biriminde ödeme yapın, ATM’lerden düşük ücretle yerel nakit çekin.',
          en: 'Spend in local currency at mid-market rates without hidden bank markups. Low-fee ATM withdrawals.',
          de: 'Zahlen in Landeswährung zum fairen Devisenkurs ohne Wechselgebühren.'
        },
        url: 'https://wise.com',
        badge: { tr: '0 Gizli Komisyon', en: 'Zero Hidden Fees', de: 'Keine versteckten Gebühren' },
        badgeTone: 'emerald'
      },
      foodDeliveryTool,
      {
        id: 'nomad-cafes',
        name: 'Nomad List & Workfrom',
        categoryLabel: { tr: 'Göçebe Kafeleri & Coworking', en: 'Nomad Cafes & Workspaces', de: 'Nomaden-Cafés & Coworking' },
        phase: 'during',
        icon: <Coffee className="w-4 h-4 text-amber-300" />,
        tagline: {
          tr: 'Hızlı Wi-Fi ve Prizli Laptop Çalışma Noktaları',
          en: 'Verified High-Speed Wi-Fi Workspaces',
          de: 'Geprüfte Cafés mit schnellem WLAN'
        },
        desc: {
          tr: 'Gittiğiniz şehirde uzaktan çalışmak için en ideal kafeleri, ortak çalışma ofislerini ve göçebe topluluklarını listeler.',
          en: 'Discover laptop-friendly cafes, ergonomic coworking spaces, and digital nomad hubs with speed tests.',
          de: 'Finden Sie Arbeitsplätze mit schnellem Internet und Steckdosen für Remote Work.'
        },
        url: `https://nomadlist.com/${countryName.toLowerCase()}`,
        badge: { tr: '100+ Mbps Wi-Fi', en: 'Fast Wi-Fi Tested', de: 'Geprüftes WLAN' },
        badgeTone: 'amber'
      },
      {
        id: 'language-preply',
        name: 'Preply & Google Çeviri',
        categoryLabel: { tr: 'Dil Öğrenme & Çeviri', en: 'Language & Live Translation', de: 'Sprache & Übersetzung' },
        phase: 'during',
        icon: <Languages className="w-4 h-4 text-indigo-400" />,
        tagline: {
          tr: 'Yerel Halkla İletişim & Menü Çevirisi',
          en: 'Local Native Tutoring & Visual Translation',
          de: 'Sprachunterricht & Sofort-Übersetzung'
        },
        desc: {
          tr: 'Kamera çevirisi ile restoran menülerini anında okuyun; seyahat öncesi ana dilini konuşan eğitmenlerle temel kalıpları öğrenin.',
          en: 'Translate food menus visually with your camera and book affordable native tutors for travel phrases.',
          de: 'Speisekarten mit der Kamera übersetzen und Grundbegriffe mit Muttersprachlern lernen.'
        },
        url: 'https://preply.com',
        badge: { tr: 'Kamera Çevirisi', en: 'Camera Translation', de: 'Live-Kamera' },
        badgeTone: 'indigo'
      },
      {
        id: 'dating-social',
        name: 'Tinder, Bumble & Meetup',
        categoryLabel: { tr: 'Flört & Sosyal Arkadaşlık', en: 'Social, Dating & Meetups', de: 'Dating & Soziale Treffen' },
        phase: 'during',
        icon: <Heart className="w-4 h-4 text-rose-400" />,
        tagline: {
          tr: 'Yerel Halk ve Diğer Gezginlerle Tanışma',
          en: 'Meet Locals & Fellow Travelers',
          de: 'Einheimische & Reisende kennenlernen'
        },
        desc: {
          tr: 'Gittiğiniz şehirde yeni insanlarla tanışın, dil değişimi (language exchange) akşamlarına ve kültürel şehir turlarına katılın.',
          en: 'Connect with locals for insider city tips, language exchange nights, and dating while abroad.',
          de: 'Lokal Kontakte knüpfen, Sprachaustausch besuchen und Kulturabende erleben.'
        },
        url: 'https://www.meetup.com',
        badge: { tr: 'Topluluk & Etkinlik', en: 'Events & Dating', de: 'Events & Treffen' },
        badgeTone: 'rose'
      },

      // ==========================================
      // PHASE 3: DÖNERKEN (Havalimanı & Konfor)
      // ==========================================
      {
        id: 'priority-pass',
        name: 'Priority Pass Lounge',
        categoryLabel: { tr: 'Havalimanı Lounge & Dinlenme', en: 'Airport Lounge Access', de: 'Flughafen-Lounge' },
        phase: 'return',
        icon: <Luggage className="w-4 h-4 text-amber-400" />,
        tagline: {
          tr: '1400+ Havalimanında VIP Salon, Duş & Yemek',
          en: 'VIP Lounges Across 1400+ Airports',
          de: 'Zugang zu über 1400 VIP-Lounges'
        },
        desc: {
          tr: 'Dönüş uçuşunuzu beklerken kalabalık kapılardan uzaklaşın; ücretsiz açık büfe, hızlı internet ve sessiz dinlenme alanlarından yararlanın.',
          en: 'Escape busy airport gates before your return flight with complimentary dining, quiet pods, and showers.',
          de: 'Entspanntes Warten vor dem Rückflug mit kostenlosem Buffet, Duschen und Ruhezonen.'
        },
        url: 'https://www.prioritypass.com',
        badge: { tr: 'VIP Konfor', en: 'VIP Comfort', de: 'VIP-Zugang' },
        badgeTone: 'amber'
      },
      {
        id: 'taxfree-globalblue',
        name: 'Global Blue & Planet',
        categoryLabel: { tr: 'Tax-Free Vergi İadesi', en: 'Tax-Free VAT Refund', de: 'Steuerrückerstattung (Tax-Free)' },
        phase: 'return',
        icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
        tagline: {
          tr: 'Alışveriş Vergilerini (KDV) Havalimanında Nakit Geri Alın',
          en: 'Claim Back Retail VAT at the Airport',
          de: 'Mehrwertsteuer am Flughafen zurückholen'
        },
        desc: {
          tr: 'Yurt dışından aldığınız elektronik, parfüm ve giyim ürünlerinin faturasıyla havalimanı gümrüğünden nakit veya karta vergi iadesi alın.',
          en: 'Validate tax-free export forms at airport customs to claim refund payouts back to your credit card or cash.',
          de: 'Sparen Sie bares Geld durch die Rückerstattung der Mehrwertsteuer auf Einkäufe.'
        },
        url: 'https://www.globalblue.com',
        badge: { tr: '%8 - %22 İade', en: '8% - 22% Refund', de: 'Bis zu 22% Ersparnis' },
        badgeTone: 'cyan'
      },
      {
        id: 'bounce-luggage',
        name: 'Bounce & Radical Storage',
        categoryLabel: { tr: 'Emanet Bagaj Hizmeti', en: 'Luggage Storage Network', de: 'Gepäckaufbewahrung' },
        phase: 'return',
        icon: <Luggage className="w-4 h-4 text-indigo-400" />,
        tagline: {
          tr: 'Otel Çıkışından Sonra Bavulsuz Özgürce Gezin',
          en: 'Store Luggage Safely on Departure Day',
          de: 'Gepäck sicher lagern am Abreisetag'
        },
        desc: {
          tr: 'Otelden check-out yaptıktan sonra akşam uçuşunuza kadar bavul taşımayın; tren garları ve merkezi dükkanlara güvenle emanet edin.',
          en: 'Store heavy bags at secure shops and hotels near central transit hubs so you can explore unburdened.',
          de: 'Koffer nach dem Check-out sicher an zentralen Stationen abgeben und den Tag genießen.'
        },
        url: `https://usebounce.com/city/${countryName.toLowerCase()}`,
        badge: { tr: 'Sigortalı Emanet', en: 'Insured Storage', de: 'Versichert' },
        badgeTone: 'indigo'
      }
    ];
  }, [countryName, code, isSEA, isMENA, isEurope]);

  // Filter tools by phase & search
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
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-teal-900/20 via-slate-900/60 to-slate-950 border border-teal-500/30 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{l('360° Seyahat Asistanı & Ortaklıklar', '360° Travel Assistant & Utilities', '360° Reiseassistent')}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-white/10 text-cyan-300 border border-white/10">
                {countryName} ({code})
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {l(
                `${countryName} Kolay Tatil & Süper Uygulama Rehberi`,
                `${countryName} Easy Vacation & Travel Superapp Hub`,
                `${countryName} Urlaubsassistent & Reise-Apps`
              )}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {l(
                `Giderken, oradayken ve dönerken ${countryName}'de aktif olan tüm yardımcı uygulamalar, taksi/ulaşım ağları, oteller, eSIM ve dijital göçebe araçları tek ekranda.`,
                `All active ride-hailing networks, hotels, flights, eSIMs, and nomad hubs operating in ${countryName} organized across departure, stay, and return phases.`,
                `Alle nützlichen Apps, Taxis, Hotels, eSIMs und Nomaden-Tools für ${countryName} auf einen Blick.`
              )}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-teal-500/30 text-right">
              <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">{l('Aktif Araç Sayısı', 'Active Utilities', 'Aktive Tools')}</div>
              <div className="text-lg font-black text-teal-300 font-mono">{allTools.length} Platform</div>
            </div>
          </div>
        </div>

        {/* Phase Filter Tabs (Chronological Flow) */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-5 pt-4 border-t border-white/10 overflow-x-auto scrollbar-none text-xs">
          <button
            type="button"
            onClick={() => setSelectedPhase('all')}
            className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedPhase === 'all'
                ? 'bg-teal-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{l('Tüm Aşamalar', 'All Phases', 'Alle Phasen')}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">{allTools.length}</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedPhase('before')}
            className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedPhase === 'before'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-white/5'
            }`}
          >
            <Plane className="w-3.5 h-3.5" />
            <span>{l('🛫 1. Giderken (Planlama & Rezervasyon)', '🛫 1. Before Departure (Booking)', '🛫 1. Vorbereitung & Buchung')}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">{beforeCount}</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedPhase('during')}
            className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedPhase === 'during'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-white/5'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{l('📍 2. Gidince (Ülkedeyken & Yaşam)', '📍 2. On Arrival (In Country)', '📍 2. Vor Ort & Alltag')}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">{duringCount}</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedPhase('return')}
            className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedPhase === 'return'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-white/5'
            }`}
          >
            <Luggage className="w-3.5 h-3.5" />
            <span>{l('🛬 3. Dönerken (Havalimanı & Tax-Free)', '🛬 3. Departure & Airport', '🛬 3. Rückreise & Airport')}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">{returnCount}</span>
          </button>
        </div>
      </div>

      {/* Grid of Categorized Assistant Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => {
          const catLabel = tool.categoryLabel[language as keyof typeof tool.categoryLabel] || tool.categoryLabel.tr;
          const tagline = tool.tagline[language as keyof typeof tool.tagline] || tool.tagline.tr;
          const desc = tool.desc[language as keyof typeof tool.desc] || tool.desc.tr;
          const badgeText = tool.badge[language as keyof typeof tool.badge] || tool.badge.tr;

          let badgeColor = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
          if (tool.badgeTone === 'emerald') badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
          if (tool.badgeTone === 'amber') badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
          if (tool.badgeTone === 'rose') badgeColor = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
          if (tool.badgeTone === 'indigo') badgeColor = 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';

          return (
            <div
              key={tool.id}
              className="flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 hover:border-teal-500/40 dark:hover:border-teal-500/40 shadow-sm hover:shadow-md transition-all group"
            >
              <div>
                {/* Header: Icon + Category + Badge */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 shrink-0">
                      {tool.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 truncate">
                        {catLabel}
                      </div>
                      <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight truncate">
                        {tool.name}
                      </h3>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${badgeColor}`}>
                    {badgeText}
                  </span>
                </div>

                {/* Tagline */}
                <div className="text-xs font-bold text-teal-600 dark:text-teal-400 mb-1.5 leading-snug">
                  {tagline}
                </div>

                {/* Concise Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {desc}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/5">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3.5 rounded-xl bg-slate-100 hover:bg-teal-600 dark:bg-slate-800 dark:hover:bg-teal-600 text-slate-800 hover:text-white dark:text-slate-200 dark:hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs group-hover:bg-teal-600 group-hover:text-white cursor-pointer no-underline"
                >
                  <span>{l('Uygulamayı Aç / Fiyatları Gör', 'Open App / View Deals', 'App öffnen / Angebote ansehen')}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Safe Travel Disclaimer */}
      <div className="p-3.5 rounded-xl bg-slate-100/60 dark:bg-slate-950/60 border border-slate-200/60 dark:border-white/5 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2.5">
        <Info className="w-4 h-4 text-teal-500 shrink-0" />
        <span>
          {l(
            'Vizamigo seyahat konsiyerj linkleri doğrudan resmi ortaklık ağları üzerinden çalışır; fiyatlara ek komisyon eklenmez ve en iyi resmi fiyat garantisi sunulur.',
            'Vizamigo concierge partner links operate directly via verified official networks with zero price markup and official price guarantees.',
            'Alle Links führen zu verifizierten Partnernetzwerken ohne Zusatzgebühren.'
          )}
        </span>
      </div>
    </div>
  );
};
