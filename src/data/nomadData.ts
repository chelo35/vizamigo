/**
 * Kapsamlı Küresel Dijital Göçebe (Digital Nomad) Hub & Vize Veri Tabanı
 * Asya, Avrupa, Latin Amerika, Balkanlar ve Kafkaslar genelinde
 * hem popüler hem de ultra ekonomik, kolay ikamet edilebilir göçebe rotaları.
 * 
 * Çok dilli (TR / EN / DE) tam desteklidir.
 */

import { getCountryName } from './passportData';
import { lText } from '../i18n';

export interface DigitalNomadHub {
  id: string;
  countryCode: string;
  countryName: string;
  region: 'Güneydoğu Asya & Pasifik' | 'Balkanlar & Kafkaslar' | 'Latin Amerika' | 'Avrupa & Akdeniz' | 'Orta Doğu & Afrika';
  visaName: string;
  budgetLevel: 'Ultra Ekonomik (600-1100$)' | 'Ekonomik (1100-1600$)' | 'Orta Seviye (1600-2400$)' | 'Premium (2500$+)';
  monthlyLivingCost: string;
  incomeRequired: string;
  duration: string;
  taxRegime: string;
  residencePathway: string;
  popularHubs: string[];
  internetAndCoworking: string;
  lifestyleVibe: string;
  processingTime: string;
  keyRequirements: string[];
  officialUrl: string;
  googleMapsQuery: string;
  // Multi-language overrides
  en?: Partial<DigitalNomadHub>;
  de?: Partial<DigitalNomadHub>;
}

export const NOMAD_HUBS: DigitalNomadHub[] = [
  {
    id: 'thailand-dtv',
    countryCode: 'TH',
    countryName: 'Tayland',
    region: 'Güneydoğu Asya & Pasifik',
    visaName: 'Destination Thailand Visa (DTV) & 30 Gün Vizesiz',
    budgetLevel: 'Ultra Ekonomik (600-1100$)',
    monthlyLivingCost: '750 - 1.300 $ / ay (Konaklama, yeme-içme ve coworking dahil)',
    incomeRequired: 'Maaş şartı yok! Yalnızca bankada 500.000 THB (~13.500 $) bakiye gösterimi yeterlidir.',
    duration: '5 Yıl Geçerli (Her girişte 180 gün kalış + 180 gün uzatma = Yılda 360 gün!)',
    taxRegime: '180 günden fazla kalanlar vergi mukimi sayılır. 2024 Tayland Gelir İdaresi düzenlemesiyle ülkeye transfer edilen yurt dışı gelirler vergilendirilebilir; yerel vergi uzmanı rehberliği önerilir.',
    residencePathway: 'DTV e-vizesi online alınır; harç sadece ~10.000 THB (~300 $). Ayrıca Türk pasaportuna 30 gün vizesiz giriş (TDAC ile) hakkı mevcuttur.',
    popularHubs: ['Chiang Mai (Dünya Göçebe Başkenti)', 'Bangkok', 'Ko Pha Ngan', 'Phuket', 'Krabi'],
    internetAndCoworking: 'Ortalama 250+ Mbps fiber hız. Chiang Mai (Punspace, Yellow, Hub53), Ko Pha Ngan (Koh Space).',
    lifestyleVibe: 'Dünyanın en büyük dijital göçebe komünitesi, ucuz sokak lezzetleri, tapınaklar ve tropik ada yaşamı.',
    processingTime: '5-10 iş günü (Resmi Tayland E-Vize portalından)',
    keyRequirements: [
      'Banka hesabında minimum 500.000 THB (~13.500 $) bakiye dökümü',
      'Uzaktan çalışma sözleşmesi, şirket evrağı veya dijital portföy',
      'Pasaportun en az 6 ay geçerli olması'
    ],
    officialUrl: 'https://thaievisa.go.th',
    googleMapsQuery: 'Chiang Mai coworking spaces',
    en: {
      countryName: 'Thailand',
      visaName: 'Destination Thailand Visa (DTV) & 30-Day Visa-Free',
      monthlyLivingCost: '$750 - $1,300 / mo (All-inclusive: rent, food, coworking)',
      incomeRequired: 'No monthly salary threshold! Bank balance of 500,000 THB (~$13,500) required.',
      duration: '5-Year Multi-Entry (180 days per entry + 180-day extension = up to 360 days/year!)',
      taxRegime: 'Stays >180 days trigger tax residency. Under 2024 Thai Revenue Dept rules, remitted foreign income may be taxable. Consult a tax professional.',
      residencePathway: 'Online DTV eVisa application (~$300 fee). 30 days visa-free entry (with TDAC) also available.',
      popularHubs: ['Chiang Mai (Nomad Capital)', 'Bangkok', 'Ko Pha Ngan', 'Phuket', 'Krabi'],
      internetAndCoworking: '250+ Mbps fiber. Punspace, Yellow Coworking, Hub53, Koh Space.',
      lifestyleVibe: 'Vibrant nomad community, world-class street food, temples, and tropical island living.',
      processingTime: '5-10 business days (Official Thai eVisa Portal)',
      keyRequirements: [
        'Proof of funds: 500,000 THB (~$13,500) in bank account',
        'Remote employment contract, freelancing portfolio, or company registration',
        'Passport valid for at least 6 months'
      ]
    },
    de: {
      countryName: 'Thailand',
      visaName: 'Destination Thailand Visa (DTV) & 30 Tage visumfrei',
      monthlyLivingCost: '750 - 1.300 $ / Monat (Inkl. Miete, Verpflegung, Coworking)',
      incomeRequired: 'Kein monatlicher Gehaltsnachweis! Bankguthaben von 500.000 THB (~13.500 $) genügt.',
      duration: '5 Jahre gültig (180 Tage Aufenthalt + 180 Tage Verlängerung pro Einreise)',
      taxRegime: 'Aufenthalte >180 Tage begründen Steueransässigkeit. Nach den Regeln von 2024 können nach Thailand überwiesene Einkünfte steuerpflichtig sein.',
      residencePathway: 'Online-DTV-Visum (~300 $ Gebühr). Zudem 30 Tage visumfreie Einreise (mit TDAC) möglich.',
      popularHubs: ['Chiang Mai (Nomaden-Hauptstadt)', 'Bangkok', 'Ko Pha Ngan', 'Phuket', 'Krabi'],
      internetAndCoworking: '250+ Mbit/s Glasfaser. Punspace, Yellow Coworking, Hub53, Koh Space.',
      lifestyleVibe: 'Größte globale Nomaden-Community, günstiges Streetfood, Tempel und tropisches Inselleben.',
      processingTime: '5-10 Werktage (Offizielles E-Visum-Portal)',
      keyRequirements: [
        'Bankguthaben von mindestens 500.000 THB (~13.500 $)',
        'Remote-Arbeitsvertrag, Freiberufler-Portfolio oder Handelsregisterauszug',
        'Reisepass mit mindestens 6 Monaten Restgültigkeit'
      ]
    }
  },
  {
    id: 'indonesia-bali',
    countryCode: 'ID',
    countryName: 'Endonezya (Bali)',
    region: 'Güneydoğu Asya & Pasifik',
    visaName: 'E33G Uzaktan Çalışan Vizesi & B211A Ziyaretçi İzni',
    budgetLevel: 'Ekonomik (1100-1600$)',
    monthlyLivingCost: '950 - 1.700 $ / ay (Havuzlu villa odası, kafe bütçesi dahil)',
    incomeRequired: 'B211A/C1 için asgari gelir şartı aranmaz! E33G için yıllık 60.000 $ işveren geliri.',
    duration: 'B211A ile 180 güne kadar (60 gün + 2x uzatma); E33G ile 1 tam yıl.',
    taxRegime: 'Endonezya kaynaklı olmayan yabancı gelirler için tam vergi muafiyeti.',
    residencePathway: 'C1/B211A turizm ve iş vizesi online alınarak Bali\'de 6 aya kadar yasal olarak kalınabilir.',
    popularHubs: ['Canggu (Canlı göçebe merkezi)', 'Ubud (Yoga, doğa & odaklanma)', 'Uluwatu (Sörf & plajlar)', 'Sanur'],
    internetAndCoworking: 'Canggu & Ubud genelinde 75-150 Mbps. Popüler mekanlar: Dojo Bali, Tropical Nomad, Outpost Ubud, BWork.',
    lifestyleVibe: 'Tropik sörf kültürü, sonsuz pirinç tarlaları, sağlıklı yaşam, smoothie bowllar ve yoğun expat ağı.',
    processingTime: '3-7 iş günü (Resmi Endonezya E-Vize portalı - evisa.imigrasi.go.id)',
    keyRequirements: [
      'B211A için en az 2.000 $ banka bakiyesi ve dönüş bileti',
      'Pasaportun en az 6 ay geçerli olması',
      'E33G için Endonezya dışındaki bir şirketten uzaktan çalışma bordrosu'
    ],
    officialUrl: 'https://evisa.imigrasi.go.id/',
    googleMapsQuery: 'Canggu Bali coworking cafe',
    en: {
      countryName: 'Indonesia (Bali)',
      visaName: 'E33G Remote Worker Visa & B211A Visit Permit',
      monthlyLivingCost: '$950 - $1,700 / mo (Private pool villa room, cafes & coworking)',
      incomeRequired: 'No income threshold for B211A! E33G requires $60,000/yr salary.',
      duration: 'Up to 180 days via B211A (60 days + 2 extensions); 1 year via E33G.',
      taxRegime: 'Zero local tax on foreign-sourced earnings from clients abroad.',
      residencePathway: 'Obtain B211A/C1 online via official eVisa portal (evisa.imigrasi.go.id) for up to 6 months stay.',
      popularHubs: ['Canggu (Nomad Hub)', 'Ubud (Yoga, Nature & Focus)', 'Uluwatu (Surfing)', 'Sanur'],
      internetAndCoworking: '75-150 Mbps fiber. Dojo Bali, Tropical Nomad, Outpost Ubud, BWork.',
      lifestyleVibe: 'Surfing culture, lush rice paddies, wellness cafes, and dense international expat network.',
      processingTime: '3-7 business days (Official eVisa Portal - evisa.imigrasi.go.id)',
      keyRequirements: [
        'Proof of $2,000+ bank balance and onward travel ticket',
        'Passport valid for at least 6 months',
        'Proof of remote employment outside Indonesia (for E33G)'
      ]
    },
    de: {
      countryName: 'Indonesien (Bali)',
      visaName: 'E33G Remote Worker Visum & B211A Besuchervisum',
      monthlyLivingCost: '950 - 1.700 $ / Monat (Poolvilla-Zimmer, Cafés & Coworking)',
      incomeRequired: 'Kein Mindesteinkommen für B211A! E33G verlangt 60.000 $/Jahr Einkommen.',
      duration: 'Bis zu 180 Tage mit B211A (60 Tage + 2 Verlängerungen); 1 ganzes Jahr mit E33G.',
      taxRegime: 'Vollständige Steuerbefreiung für ausländische Einkünfte außerhalb Indonesiens.',
      residencePathway: 'B211A/C1 online über das offizielle eVisa-Portal (evisa.imigrasi.go.id) beantragen für bis zu 6 Monate Aufenthalt.',
      popularHubs: ['Canggu (Nomadenzentrum)', 'Ubud (Yoga, Natur & Ruhe)', 'Uluwatu (Surfen & Strände)', 'Sanur'],
      internetAndCoworking: '75-150 Mbit/s. Dojo Bali, Tropical Nomad, Outpost Ubud, BWork.',
      lifestyleVibe: 'Tropische Surfkultur, Reisterrassen, gesunde Ernährung und weltweites Expat-Netzwerk.',
      processingTime: '3-7 Werktage (Offizielles eVisa-Portal - evisa.imigrasi.go.id)',
      keyRequirements: [
        'Mindestens 2.000 $ Bankguthaben und Weiterreiseticket (B211A)',
        'Reisepass mit mind. 6 Monaten Gültigkeit',
        'Gehaltsnachweis eines ausländischen Arbeitgebers (E33G)'
      ]
    }
  },
  {
    id: 'vietnam-danang',
    countryCode: 'VN',
    countryName: 'Vietnam',
    region: 'Güneydoğu Asya & Pasifik',
    visaName: '90 Günlük Çok Girişli E-Vize (Sınırsız Yenilenebilir)',
    budgetLevel: 'Ultra Ekonomik (600-1100$)',
    monthlyLivingCost: '600 - 1.100 $ / ay (Dünyanın en ucuz yaşanabilir sahil şehirleri)',
    incomeRequired: 'Asgari gelir veya banka şartı YOKTUR!',
    duration: '90 gün (Süre bitiminde komşu Laos/Tayland üzerinden hızlı çıkış-giriş ile yenilenir)',
    taxRegime: '90 güne kadar olan kalışlarda yerel vergi mükellefiyeti doğmaz.',
    residencePathway: 'Resmi e-vize portalından 25 $ karşılığında 90 günlük çok girişli vize anında alınır.',
    popularHubs: ['Da Nang (Modern sahil kenti & köprüler)', 'Hoi An (Tarihi nehir kasabası)', 'Ho Chi Minh (Saygon)', 'Hanoi'],
    internetAndCoworking: 'Dünyanın en hızlı ve ucuz fiber internetlerinden biri (100-200 Mbps). Enki Coworking, DNC Da Nang, The Workshop.',
    lifestyleVibe: 'Geleneksel Vietnam kahve kültürü (cà phê sữa đá), enfes sokak mutfağı (Phở, Bánh mì) ve tertemiz kumsallar.',
    processingTime: '3-5 iş günü',
    keyRequirements: [
      'Resmi e-vize online başvuru formu ve 25 $ harç',
      'Pasaport fotoğrafı ve biyometrik fotoğraf'
    ],
    officialUrl: 'https://evisa.xuatnhapcanh.gov.vn',
    googleMapsQuery: 'Da Nang coworking space',
    en: {
      countryName: 'Vietnam',
      visaName: '90-Day Multi-Entry eVisa (Renewable via Border Run)',
      monthlyLivingCost: '$600 - $1,100 / mo (Among the world\'s most affordable beach cities)',
      incomeRequired: 'Zero minimum income or bank balance requirement!',
      duration: '90 Days (Easily renewed with quick border run to Laos or Thailand)',
      taxRegime: 'Stays under 90 days trigger no local tax residency liability.',
      residencePathway: 'Instant online multi-entry 90-day eVisa for just $25.',
      popularHubs: ['Da Nang (Modern beach city)', 'Hoi An (Historic river town)', 'Ho Chi Minh (Saigon)', 'Hanoi'],
      internetAndCoworking: 'Ultra-fast 100-200 Mbps fiber. Enki Coworking, DNC Da Nang, The Workshop.',
      lifestyleVibe: 'Legendary Vietnamese coffee culture, incredible street cuisine (Phở, Bánh mì), and pristine coastline.',
      processingTime: '3-5 business days',
      keyRequirements: [
        'Official online eVisa application and $25 fee',
        'Valid passport scan and digital portrait'
      ]
    },
    de: {
      countryName: 'Vietnam',
      visaName: '90-Tage Mehrfacheinreise e-Visum (Verlängerbar)',
      monthlyLivingCost: '600 - 1.100 $ / Monat (Eine der günstigsten Küstenstädte weltweit)',
      incomeRequired: 'KEINE Mindesteinkommens- oder Bankauflagen!',
      duration: '90 Tage (Verlängerbar durch Visa-Run nach Laos oder Thailand)',
      taxRegime: 'Keine steuerliche Ansässigkeit bei Aufenthalten unter 90 Tagen.',
      residencePathway: 'Offizielles 90-Tage e-Visum online für 25 $ beantragen.',
      popularHubs: ['Da Nang (Moderne Küstenstadt)', 'Hoi An (Historische Altstadt)', 'Ho-Chi-Minh-Stadt', 'Hanoi'],
      internetAndCoworking: '100-200 Mbit/s Glasfaser. Enki Coworking, DNC Da Nang, The Workshop.',
      lifestyleVibe: 'Vietnamesische Kaffeekultur (cà phê sữa đá), exzellentes Streetfood und lange Strände.',
      processingTime: '3-5 Werktage',
      keyRequirements: [
        'Offizieller Online-Antrag und 25 $ Gebühr',
        'Reisepass-Kopie und biometrisches Passfoto'
      ]
    }
  },
  {
    id: 'georgia-tbilisi',
    countryCode: 'GE',
    countryName: 'Gürcistan',
    region: 'Balkanlar & Kafkaslar',
    visaName: '365 Gün Vizesiz Kalış & Bireysel Girişimci %1 Vergi',
    budgetLevel: 'Ultra Ekonomik (600-1100$)',
    monthlyLivingCost: '700 - 1.250 $ / ay (Tiflis ve Batum merkezde uygun kiralar)',
    incomeRequired: 'Vizesiz giriş için hiçbir gelir şartı yoktur! Dilediğiniz gibi yerleşebilirsiniz.',
    duration: '365 Gün (1 Tam Yıl Kesintisiz Vizesiz Kalış - Türk vatandaşlarına kimlikle giriş)',
    taxRegime: 'Küçük İşletme (Small Business Status) ile yıllık ~180.000 $\'a kadar olan ciroya SADECE %1 GELİR VERGİSİ!',
    residencePathway: 'T.C. kimlik kartınızla doğrudan Gürcistan\'a girin, Adalet Sarayı\'nda 1 günde şahıs şirketi açıp %1 vergiye geçin.',
    popularHubs: ['Tiflis (Vake, Vera, Fabrika bölgesi)', 'Batum (Karadeniz sahili & gökdelenler)'],
    internetAndCoworking: 'Magti ve Silknet fiber 50-100 Mbps. Fabrika Tbilisi, Terminal Coworking, DBlock.',
    lifestyleVibe: 'Tarihi kafeler, sıcak Kafkas misafirperverliği, leziz şarap ve mutfak kültürü, 2$ Bolt taksi konforu.',
    processingTime: 'Anında (Sınır kapısından doğrudan giriş)',
    keyRequirements: [
      'Yeni tip çipli T.C. kimlik kartı veya Türk pasaportu',
      '%1 vergi için Tiflis Adalet Sarayı\'nda bireysel girişimci kaydı (1 gün sürer)'
    ],
    officialUrl: 'https://www.geoconsul.gov.ge',
    googleMapsQuery: 'Tbilisi coworking space Fabrika',
    en: {
      countryName: 'Georgia',
      visaName: '365-Day Visa-Free Stay & 1% Small Business Tax',
      monthlyLivingCost: '$700 - $1,250 / mo (Affordable rentals in central Tbilisi & Batumi)',
      incomeRequired: 'Zero income requirement for visa-free entry! Stay and work freely.',
      duration: '365 Days (1 Full Year Continuous Stay - ID card entry for Turkish citizens)',
      taxRegime: 'Small Business Status grants 1% flat turnover tax on up to ~$180,000/yr gross revenue!',
      residencePathway: 'Enter visa-free, register sole proprietorship at Public Service Hall in 1 day.',
      popularHubs: ['Tbilisi (Fabrika, Vake, Vera districts)', 'Batumi (Black Sea coast)'],
      internetAndCoworking: 'Magti & Silknet 50-100 Mbps fiber. Fabrika Tbilisi, Terminal Coworking, DBlock.',
      lifestyleVibe: 'Historic cafes, warm Caucasian hospitality, world-class wine, and $2 Bolt rides.',
      processingTime: 'Instant upon arrival',
      keyRequirements: [
        'National ID card or passport',
        '1-day registration at Public Service Hall for 1% tax status'
      ]
    },
    de: {
      countryName: 'Georgien',
      visaName: '365 Tage visumfrei & 1% Kleinunternehmer-Steuer',
      monthlyLivingCost: '700 - 1.250 $ / Monat (Günstige Mieten in Tiflis und Batumi)',
      incomeRequired: 'Keinerlei Einkommensnachweis für visumfreie Einreise!',
      duration: '365 Tage (1 ganzes Jahr ununterbrochener Aufenthalt ohne Visum)',
      taxRegime: 'Nur 1% Pauschalsteuer auf Umsätze bis zu ~180.000 $/Jahr mit Kleinunternehmer-Status!',
      residencePathway: 'Visumfrei einreisen und Einzelunternehmen im Justizpalast in 1 Tag anmelden.',
      popularHubs: ['Tiflis (Vake, Vera, Fabrika-Areal)', 'Batumi (Schwarzmeerküste)'],
      internetAndCoworking: '50-100 Mbit/s. Fabrika Tbilisi, Terminal Coworking, DBlock.',
      lifestyleVibe: 'Kaukasische Gastfreundschaft, historische Cafés, Weinbaukultur und günstige Bolt-Fahrten.',
      processingTime: 'Sofort bei Grenzübertritt',
      keyRequirements: [
        'Gültiger Personalausweis oder Reisepass',
        'Gewerbeanmeldung im Justizpalast Tiflis für 1%-Steuerstatus'
      ]
    }
  },
  {
    id: 'albania-tirana',
    countryCode: 'AL',
    countryName: 'Arnavutluk',
    region: 'Balkanlar & Kafkaslar',
    visaName: 'Dijital Göçebe İkamet İzni (Unique Permit)',
    budgetLevel: 'Ultra Ekonomik (600-1100$)',
    monthlyLivingCost: '650 - 1.200 $ / ay (Avrupa\'nın en ucuz Akdeniz kıyısı)',
    incomeRequired: 'Yıllık yaklaşık 9.800 $ (~aylık 800 $ gelir kanıtı)',
    duration: '1 Yıl Oturum İzni (Uzatılabilir); Türk vatandaşları 90 gün vizesiz girebilir.',
    taxRegime: 'İlk 12 ay boyunca yabancı kaynaklı gelirlerde gelir vergisi muafiyeti.',
    residencePathway: 'Vizesiz 90 gün girip Tiran veya sahil kasabalarında e-Albania portalı üzerinden oturuma başvuru yapılır.',
    popularHubs: ['Tiran (Başkent & Blloku bölgesi)', 'Saranda (İyon Denizi sahili)', 'Vlora', 'Durres'],
    internetAndCoworking: 'Vodafone ve One Albania 4G/fiber 50-80 Mbps. Innospace Tirana, Coolab Coworking.',
    lifestyleVibe: 'İtalyan esintili Akdeniz mutfağı, turkuaz plajlar, son derece cana yakın halk ve çok ucuz yaşam.',
    processingTime: '3-4 hafta',
    keyRequirements: [
      'Yabancı şirket sözleşmesi veya uzaktan serbest çalışan sözleşmesi',
      'Arnavutluk\'ta geçerli kira sözleşmesi',
      'Adli sicil kaydı ve yerel sağlık sigortası'
    ],
    officialUrl: 'https://e-albania.al',
    googleMapsQuery: 'Tirana coworking space',
    en: {
      countryName: 'Albania',
      visaName: 'Digital Nomad Residence Permit (Unique Permit)',
      monthlyLivingCost: '$650 - $1,200 / mo (Europe\'s most affordable Mediterranean coast)',
      incomeRequired: 'Approx. $9,800/yr (~$800/mo income proof)',
      duration: '1-Year Renewable Residence Permit; 90 days visa-free for Turkish citizens.',
      taxRegime: '0% income tax on foreign-sourced income for the first 12 months.',
      residencePathway: 'Enter visa-free for 90 days and apply via e-Albania government portal.',
      popularHubs: ['Tirana (Capital & Blloku)', 'Saranda (Ionian Coast)', 'Vlora', 'Durres'],
      internetAndCoworking: '50-80 Mbps fiber. Innospace Tirana, Coolab Coworking.',
      lifestyleVibe: 'Italian-influenced Mediterranean cuisine, turquoise waters, and very low living expenses.',
      processingTime: '3-4 weeks',
      keyRequirements: [
        'Remote employment contract or client agreements',
        'Valid lease agreement in Albania',
        'Clean police record and health insurance'
      ]
    },
    de: {
      countryName: 'Albanien',
      visaName: 'Aufenthaltserlaubnis für digitale Nomaden (Unique Permit)',
      monthlyLivingCost: '650 - 1.200 $ / Monat (Europas günstigste Mittelmeerküste)',
      incomeRequired: 'Ca. 9.800 $/Jahr (~800 $/Monat Einkommensnachweis)',
      duration: '1 Jahr Aufenthaltstitel (Verlängerbar); 90 Tage visumfrei für türkische Staatsbürger.',
      taxRegime: '12 Monate Steuerbefreiung auf ausländische Einkünfte.',
      residencePathway: 'Visumfrei einreisen und online über das e-Albania-Portal beantragen.',
      popularHubs: ['Tirana (Hauptstadt & Blloku)', 'Saranda (Ionisches Meer)', 'Vlora', 'Durres'],
      internetAndCoworking: '50-80 Mbit/s. Innospace Tirana, Coolab Coworking.',
      lifestyleVibe: 'Mediterrane Küche, türkisblaues Wasser, herzliche Gastfreundschaft und sehr günstige Lebenshaltung.',
      processingTime: '3-4 Wochen',
      keyRequirements: [
        'Vertrag mit ausländischem Arbeitgeber oder Kunden',
        'Wohnungsmietvertrag in Albanien',
        'Polizeiliches Führungszeugnis und Krankenversicherung'
      ]
    }
  },
  {
    id: 'colombia-medellin',
    countryCode: 'CO',
    countryName: 'Kolombiya',
    region: 'Latin Amerika',
    visaName: 'Visa V Nómadas Digitales (Dijital Göçebe Vizesi)',
    budgetLevel: 'Ultra Ekonomik (600-1100$)',
    monthlyLivingCost: '800 - 1.350 $ / ay (El Poblado ve Laureles gibi lüks semtler dahil)',
    incomeRequired: 'Aylık minimum ~1.400 $ (Kolombiya asgari ücretinin 3 katı - Latin Amerika\'nın en düşüğü)',
    duration: '2 Yıla Kadar Oturum İzni (Türk pasaportu ayrıca 90 gün vizesiz girer)',
    taxRegime: 'Yılda 183 günden az kalanlar için yabancı gelir vergisi %0.',
    residencePathway: 'Online Dışişleri portalından başvurulur; vize ücreti ~250-300 $ civarındadır.',
    popularHubs: ['Medellin (Sonsuz Bahar Şehri - Poblado & Laureles)', 'Bogota', 'Santa Marta (Karayip sahili)'],
    internetAndCoworking: 'Claro ve Tigo fiber 100-300 Mbps. Selina Cowork, Semilla Cafe Coworking, WeWork Medellin.',
    lifestyleVibe: 'Yıl boyu 24°C bahar iklimi, Latin dans ve salsa kültürü, zengin kahve çiftlikleri ve canlı göçebe topluluğu.',
    processingTime: '2-4 hafta (Online başvuru)',
    keyRequirements: [
      'Son 3 aya ait banka hesap dökümü (aylık 1.400 $ gelir gösteren)',
      'Uzaktan çalışma sözleşmesi veya şirket ortaklık belgesi',
      'Uluslararası sağlık sigortası poliçesi'
    ],
    officialUrl: 'https://www.cancilleria.gov.co',
    googleMapsQuery: 'Medellin Poblado coworking space',
    en: {
      countryName: 'Colombia',
      visaName: 'Visa V Nómadas Digitales (Digital Nomad Visa)',
      monthlyLivingCost: '$800 - $1,350 / mo (Upscale El Poblado & Laureles neighborhoods)',
      incomeRequired: 'Min. ~$1,400/mo (3x Colombian minimum wage - lowest in the Americas)',
      duration: 'Up to 2 Years Residence (90 days visa-free entry for Turkish passport holders)',
      taxRegime: '0% tax on foreign income if residing less than 183 days per year.',
      residencePathway: 'Online application via Cancillería portal; visa fee ~$250-$300.',
      popularHubs: ['Medellin (City of Eternal Spring)', 'Bogota', 'Santa Marta (Caribbean coast)'],
      internetAndCoworking: '100-300 Mbps fiber. Selina Cowork, Semilla Cafe, WeWork Medellin.',
      lifestyleVibe: 'Year-round 24°C spring weather, salsa dancing, coffee estates, and massive nomad crowd.',
      processingTime: '2-4 weeks',
      keyRequirements: [
        'Bank statements from past 3 months showing $1,400+/mo income',
        'Remote work contract or proof of freelancing clients',
        'International health insurance coverage'
      ]
    },
    de: {
      countryName: 'Kolumbien',
      visaName: 'Visa V Nómadas Digitales (Digitales Nomadenvisum)',
      monthlyLivingCost: '800 - 1.350 $ / Monat (Inkl. beliebter Viertel El Poblado & Laureles)',
      incomeRequired: 'Mind. ~1.400 $/Monat (3x Mindestlohn - niedrigste Schwelle in Amerika)',
      duration: 'Bis zu 2 Jahre Aufenthalt (90 Tage visumfrei für türkische Staatsbürger)',
      taxRegime: '0% Steuer auf Auslandseinkünfte bei unter 183 Tagen Aufenthalt pro Jahr.',
      residencePathway: 'Online-Antrag über das Außenministerium (~250-300 $ Gebühr).',
      popularHubs: ['Medellin (Stadt des ewigen Frühlings)', 'Bogota', 'Santa Marta (Karibik)'],
      internetAndCoworking: '100-300 Mbit/s. Selina Cowork, Semilla Cafe, WeWork Medellin.',
      lifestyleVibe: 'Ganzjährig 24°C, Salsa-Kultur, Kaffee-Fincas und lebendige globale Nomaden-Szene.',
      processingTime: '2-4 Wochen',
      keyRequirements: [
        'Kontoauszüge der letzten 3 Monate mit mind. 1.400 $/Monat',
        'Remote-Arbeitsvertrag oder Nachweis über Freiberuflichkeit',
        'Internationale Reisekrankenversicherung'
      ]
    }
  },
  {
    id: 'malaysia-derantau',
    countryCode: 'MY',
    countryName: 'Malezya',
    region: 'Güneydoğu Asya & Pasifik',
    visaName: 'DE Rantau Nomad Pass (MDEC)',
    budgetLevel: 'Ekonomik (1100-1600$)',
    monthlyLivingCost: '900 - 1.500 $ / ay (Gökdelen havuzlu daireler, metro ağı)',
    incomeRequired: 'Yıllık minimum 24.000 $ (~aylık 2.000 $)',
    duration: '12 Ay (Ek 12 ay uzatılabilir - Toplam 2 Yıl)',
    taxRegime: 'Malezya kaynaklı olmayan uzaktan kazançlar yerel gelir vergisinden muaftır.',
    residencePathway: 'MDEC DE Rantau portalı üzerinden online onay alınır; Türk vatandaşları ayrıca 90 gün vizesiz seyahat edebilir.',
    popularHubs: ['Kuala Lumpur (KLCC & Bangsar)', 'Penang (George Town sokak lezzetleri)', 'Langkawi (Vergisiz ada)'],
    internetAndCoworking: 'TIME ve Maxis ultra hızlı 300-500 Mbps fiber. Colony Coworking, Common Ground, WORQ.',
    lifestyleVibe: 'Herkesin akıcı İngilizce konuştuğu, Güneydoğu Asya\'nın en modern, düzenli ve güvenli metropol hayatı.',
    processingTime: '4-6 hafta',
    keyRequirements: [
      'Yazılım, dijital pazarlama, tasarım veya içerik üreticiliği alanında çalışma kanıtı',
      'Yıllık 24.000 $ kazanç bordrosu veya faturaları',
      'Malezya sağlık sigortası'
    ],
    officialUrl: 'https://mdec.my/derantau',
    googleMapsQuery: 'Kuala Lumpur coworking space',
    en: {
      countryName: 'Malaysia',
      visaName: 'DE Rantau Nomad Pass (MDEC)',
      monthlyLivingCost: '$900 - $1,500 / mo (High-rise condo with infinity pool & metro)',
      incomeRequired: 'Min. $24,000/yr (~$2,000/mo income)',
      duration: '12 Months (Renewable for another 12 months = 2 years total)',
      taxRegime: 'Foreign-sourced remote income is exempt from Malaysian personal tax.',
      residencePathway: 'Online approval via MDEC portal; 90 days visa-free entry for Turkish citizens.',
      popularHubs: ['Kuala Lumpur (KLCC, Bangsar)', 'Penang (Culinary capital)', 'Langkawi (Duty-free island)'],
      internetAndCoworking: 'Ultra-fast 300-500 Mbps fiber. Colony, Common Ground, WORQ.',
      lifestyleVibe: 'Widespread fluent English, modern metropolitan infrastructure, safe and clean.',
      processingTime: '4-6 weeks',
      keyRequirements: [
        'Tech, software, digital marketing, or creator profession proof',
        'Invoices or payroll showing $24,000+/yr earnings',
        'Valid health insurance policy'
      ]
    },
    de: {
      countryName: 'Malaysia',
      visaName: 'DE Rantau Nomad Pass (MDEC)',
      monthlyLivingCost: '900 - 1.500 $ / Monat (Hochhaus-Apartment mit Pool & Metro)',
      incomeRequired: 'Mind. 24.000 $/Jahr (~2.000 $/Monat)',
      duration: '12 Monate (Verlängerbar um weitere 12 Monate = 2 Jahre gesamt)',
      taxRegime: 'Ausländische Einkünfte sind in Malaysia steuerfrei.',
      residencePathway: 'Online-Zulassung über das MDEC-Portal; 90 Tage visumfrei für türkische Staatsbürger.',
      popularHubs: ['Kuala Lumpur (KLCC & Bangsar)', 'Penang (Streetfood-Paradies)', 'Langkawi (Zollfreie Insel)'],
      internetAndCoworking: '300-500 Mbit/s. Colony, Common Ground, WORQ.',
      lifestyleVibe: 'Flächendeckendes Englisch, hochmoderne Infrastruktur, sehr sicher und geordnet.',
      processingTime: '4-6 Wochen',
      keyRequirements: [
        'Tätigkeitsnachweis im Bereich Tech, Digital Marketing oder Content Creation',
        'Gehaltsabrechnungen oder Rechnungen über 24.000 $/Jahr',
        'Krankenversicherung'
      ]
    }
  },
  {
    id: 'mexico-playa',
    countryCode: 'MX',
    countryName: 'Meksika',
    region: 'Latin Amerika',
    visaName: 'Geçici Oturum İzni (Temporary Resident Visa)',
    budgetLevel: 'Ekonomik (1100-1600$)',
    monthlyLivingCost: '1.100 - 1.800 $ / ay',
    incomeRequired: 'Aylık ~2.600 $ gelir veya bankada son 12 ayda ~43.000 $ birikim kanıtı.',
    duration: '1 Yıl (4 yıla kadar yenilenebilir; 4. yıl sonunda kalıcı oturum hakkı verir)',
    taxRegime: 'Yabancı müşterilerden elde edilen gelirler için vergi muafiyeti seçenekleri.',
    residencePathway: 'Konsolosluk üzerinden geçici oturum vizesi alınır; 180 güne kadar olan seyahatlerde elektronik onay (SAE) ile vizesiz kalınabilir.',
    popularHubs: ['Playa del Carmen (Karayip sahili)', 'Mexico City (Roma & Condesa semtleri)', 'Puerto Escondido (Sörf kasabası)', 'Oaxaca'],
    internetAndCoworking: 'Telmex ve Totalplay 100-200 Mbps. Nest Coworking Playa, Selina CDMX, Publico.',
    lifestyleVibe: 'Karayip Denizi, taco kültürü, zengin Aztek/Maya tarihi, sıcakkanlı insanlar ve devasa uluslararası komünite.',
    processingTime: '2-3 hafta',
    keyRequirements: [
      'Son 6 aya ait aylık 2.600 $ gelir dökümü veya 12 aylık banka birikim özeti',
      'Uzaktan iş sözleşmesi',
      'Konsolosluk mülakatı'
    ],
    officialUrl: 'https://www.gob.mx/inm',
    googleMapsQuery: 'Playa del Carmen coworking space',
    en: {
      countryName: 'Mexico',
      visaName: 'Temporary Resident Visa (Residente Temporal)',
      monthlyLivingCost: '$1,100 - $1,800 / mo',
      incomeRequired: '~$2,600/mo income or ~$43,000 bank savings over past 12 months.',
      duration: '1 Year (Renewable up to 4 years; leads to permanent residence)',
      taxRegime: 'Favorable non-resident tax frameworks on offshore earnings.',
      residencePathway: 'Apply via Mexican consulate; electronic visa SAE covers stays up to 180 days.',
      popularHubs: ['Playa del Carmen (Caribbean)', 'Mexico City (Roma & Condesa)', 'Puerto Escondido (Surf)', 'Oaxaca'],
      internetAndCoworking: '100-200 Mbps fiber. Nest Coworking Playa, Selina CDMX, Publico.',
      lifestyleVibe: 'Caribbean beaches, world-renowned gastronomy, vibrant culture, and massive nomad base.',
      processingTime: '2-3 weeks',
      keyRequirements: [
        'Past 6 months bank statements ($2,600/mo) or $43,000 savings',
        'Remote employment or client documentation',
        'Consular interview'
      ]
    },
    de: {
      countryName: 'Mexiko',
      visaName: 'Befristete Aufenthaltserlaubnis (Residente Temporal)',
      monthlyLivingCost: '1.100 - 1.800 $ / Monat',
      incomeRequired: '~2.600 $/Monat Einkommen oder ~43.000 $ Ersparnisse der letzten 12 Monate.',
      duration: '1 Jahr (Verlängerbar auf bis zu 4 Jahre; danach Daueraufenthalt möglich)',
      taxRegime: 'Attraktive steuerliche Regelungen für ausländische Einkünfte.',
      residencePathway: 'Beantragung über Konsulat; bis zu 180 Tage mit elektronischer Autorisierung.',
      popularHubs: ['Playa del Carmen (Karibik)', 'Mexiko-Stadt (Roma & Condesa)', 'Puerto Escondido (Surfen)', 'Oaxaca'],
      internetAndCoworking: '100-200 Mbit/s. Nest Coworking Playa, Selina CDMX, Publico.',
      lifestyleVibe: 'Karibisches Meer, weltberühmte Taco-Kultur, reiche Geschichte und riesige Expat-Community.',
      processingTime: '2-3 Wochen',
      keyRequirements: [
        'Einkommensnachweis (2.600 $/Monat) oder Ersparnisse (43.000 $)',
        'Remote-Arbeitsvertrag',
        'Konsulatstermin'
      ]
    }
  },
  {
    id: 'costarica-nomad',
    countryCode: 'CR',
    countryName: 'Kosta Rika',
    region: 'Latin Amerika',
    visaName: 'Estancia para Nómadas Digitales',
    budgetLevel: 'Orta Seviye (1600-2400$)',
    monthlyLivingCost: '1.400 - 2.200 $ / ay',
    incomeRequired: 'Aylık minimum 3.000 $ (aile ile başvurulursa 4.000 $)',
    duration: '1 Yıl (Yılda en az 180 gün Kosta Rika\'da kalınırsa 1 yıl daha uzatılır)',
    taxRegime: 'Kosta Rika\'da tam gelir vergisi muafiyeti, ithal ekipmanlarda gümrük vergisi muafiyeti.',
    residencePathway: 'Tramite Ya resmi portalı üzerinden belgeler online yüklenir.',
    popularHubs: ['Santa Teresa (Sörf cenneti)', 'Tamarindo', 'Puerto Viejo (Karayip kıyısı)', 'San Jose'],
    internetAndCoworking: 'Kolbi ve Liberty fiber 50-150 Mbps. Selina Santa Teresa, Outpost Tamarindo.',
    lifestyleVibe: '"Pura Vida" saf yaşam felsefesi, yağmur ormanları, volkanlar, sörf ve vahşi doğa içinde çalışma.',
    processingTime: '2-4 hafta',
    keyRequirements: [
      'Son 12 aya ait aylık 3.000 $ düzenli gelir kanıtı',
      'Kosta Rika sınırları içinde geçerli 50.000 $ teminatlı sağlık sigortası',
      'Yeminli tercümeli başvuru evrakları'
    ],
    officialUrl: 'https://migracion.go.cr',
    googleMapsQuery: 'Santa Teresa Costa Rica coworking',
    en: {
      countryName: 'Costa Rica',
      visaName: 'Estancia para Nómadas Digitales',
      monthlyLivingCost: '$1,400 - $2,200 / mo',
      incomeRequired: 'Min. $3,000/mo ($4,000/mo with family)',
      duration: '1 Year (Extendable for another year if staying 180+ days)',
      taxRegime: 'Complete local income tax exemption and duty-free import on work gear.',
      residencePathway: 'Online document submission via Trámite Ya government portal.',
      popularHubs: ['Santa Teresa (Surf hotspot)', 'Tamarindo', 'Puerto Viejo (Caribbean)', 'San Jose'],
      internetAndCoworking: '50-150 Mbps fiber. Selina Santa Teresa, Outpost Tamarindo.',
      lifestyleVibe: '"Pura Vida" lifestyle, rainforests, volcanoes, surfing, and biodiverse nature.',
      processingTime: '2-4 weeks',
      keyRequirements: [
        'Proof of regular $3,000/mo income for past 12 months',
        'Health insurance policy covering $50,000+ in Costa Rica',
        'Official translations of application files'
      ]
    },
    de: {
      countryName: 'Costa Rica',
      visaName: 'Estancia para Nómadas Digitales',
      monthlyLivingCost: '1.400 - 2.200 $ / Monat',
      incomeRequired: 'Mind. 3.000 $/Monat (4.000 $/Monat mit Familie)',
      duration: '1 Jahr (Verlängerbar um 1 Jahr bei mind. 180 Tagen Aufenthalt)',
      taxRegime: 'Vollständige Einkommensteuerbefreiung und zollfreie Einfuhr von Arbeitsgeräten.',
      residencePathway: 'Online-Einreichung über das offizielle Portal Trámite Ya.',
      popularHubs: ['Santa Teresa (Surfer-Paradies)', 'Tamarindo', 'Puerto Viejo (Karibik)', 'San José'],
      internetAndCoworking: '50-150 Mbit/s. Selina Santa Teresa, Outpost Tamarindo.',
      lifestyleVibe: '„Pura Vida“-Lebensphilosophie, Regenwälder, Vulkane, Surfen und Artenvielfalt.',
      processingTime: '2-4 Wochen',
      keyRequirements: [
        'Einkommensnachweis über 3.000 $/Monat der letzten 12 Monate',
        'Krankenversicherung mit mind. 50.000 $ Deckung in Costa Rica',
        'Beglaubigte Übersetzungen der Unterlagen'
      ]
    }
  },
  {
    id: 'brazil-vitem',
    countryCode: 'BR',
    countryName: 'Brezilya',
    region: 'Latin Amerika',
    visaName: 'VITEM XIV Digital Nomad Visa',
    budgetLevel: 'Ekonomik (1100-1600$)',
    monthlyLivingCost: '850 - 1.500 $ / ay (Floripa ve Rio sahillerinde çok uygun)',
    incomeRequired: 'Aylık minimum 1.500 $ gelir VEYA bankada 18.000 $ birikim kanıtı (Dünyanın en kolay şartlarından biri!).',
    duration: '1 Yıl (1 yıl daha uzatılabilir; toplam 2 yıl)',
    taxRegime: 'Yılda 183 günden az kalanlar Brezilya vergi mukimi sayılmaz.',
    residencePathway: 'Konsolosluk üzerinden veya Brezilya\'ya 90 gün vizesiz girdikten sonra Adalet Bakanlığı portalından başvurulabilir.',
    popularHubs: ['Florianopolis ("Floripa" - Brezilya\'nın Silikon Adası)', 'Rio de Janeiro (Ipanema/Leblon)', 'Sao Paulo (Vila Madalena)'],
    internetAndCoworking: 'Vivo ve Claro fiber 150-300 Mbps. O Sitıo Floripa, Selina Lapa Rio.',
    lifestyleVibe: '42 beyaz kumlu plaj, sörf, samba, caipirinha ve Latin Amerika\'nın en canlı teknoloji ekosistemi.',
    processingTime: '2-4 hafta',
    keyRequirements: [
      'Aylık 1.500 $ gelir bordrosu veya bankada 18.000 $ bakiye',
      'Brezilya dışı işverenle uzaktan çalışma sözleşmesi',
      'Temiz adli sicil kaydı'
    ],
    officialUrl: 'https://www.gov.br/mre',
    googleMapsQuery: 'Florianopolis coworking space',
    en: {
      countryName: 'Brazil',
      visaName: 'VITEM XIV Digital Nomad Visa',
      monthlyLivingCost: '$850 - $1,500 / mo (Superb value in Floripa & Rio coast)',
      incomeRequired: 'Min. $1,500/mo income OR $18,000 bank savings (Among the world\'s easiest terms!).',
      duration: '1 Year (Renewable for another year = 2 years total)',
      taxRegime: 'Stays under 183 days do not trigger Brazilian tax residency.',
      residencePathway: 'Apply via consulate or from inside Brazil after entering 90 days visa-free.',
      popularHubs: ['Florianópolis ("Floripa" - Silicon Island)', 'Rio de Janeiro (Ipanema/Leblon)', 'São Paulo'],
      internetAndCoworking: '150-300 Mbps fiber. O Sítio Floripa, Selina Lapa Rio.',
      lifestyleVibe: '42 white sandy beaches, surf, samba, and Latin America\'s most dynamic tech hub.',
      processingTime: '2-4 weeks',
      keyRequirements: [
        '$1,500/mo paystubs or $18,000 bank savings statement',
        'Remote employment contract with offshore employer',
        'Clean police criminal background check'
      ]
    },
    de: {
      countryName: 'Brasilien',
      visaName: 'VITEM XIV Digital Nomad Visa',
      monthlyLivingCost: '850 - 1.500 $ / Monat (Hervorragendes Preis-Leistungs-Verhältnis)',
      incomeRequired: 'Mind. 1.500 $/Monat ODER 18.000 $ Ersparnisse (Eine der einfachsten Hürden weltweit!).',
      duration: '1 Jahr (Verlängerbar um 1 weiteres Jahr = 2 Jahre gesamt)',
      taxRegime: 'Keine steuerliche Ansässigkeit bei weniger als 183 Tagen im Land.',
      residencePathway: 'Über Konsulat oder nach 90-tägiger visumfreier Einreise direkt im Land beantragen.',
      popularHubs: ['Florianópolis („Floripa“ - Silicon Island)', 'Rio de Janeiro (Ipanema/Leblon)', 'São Paulo'],
      internetAndCoworking: '150-300 Mbit/s. O Sítio Floripa, Selina Lapa Rio.',
      lifestyleVibe: '42 weiße Sandstrände, Surfen, Samba und Südamerikas dynamischste Tech-Szene.',
      processingTime: '2-4 Wochen',
      keyRequirements: [
        'Gehaltsnachweis (1.500 $/Monat) oder 18.000 $ Bankguthaben',
        'Remote-Vertrag mit ausländischem Arbeitgeber',
        'Einwandfreies polizeiliches Führungszeugnis'
      ]
    }
  },
  {
    id: 'hungary-whitecard',
    countryCode: 'HU',
    countryName: 'Macaristan',
    region: 'Avrupa & Akdeniz',
    visaName: 'White Card (Beyaz Kart) Dijital Göçebe İzni',
    budgetLevel: 'Ekonomik (1100-1600$)',
    monthlyLivingCost: '1.100 - 1.700 $ / ay (Orta Avrupa\'nın en uygun başkenti Budapeşte)',
    incomeRequired: 'Aylık minimum 2.000 € (Avrupa Birliği genelindeki en düşük gelir şartı!)',
    duration: '1 Yıl (1 yıl daha uzatılabilir - Toplam 2 Yıl Schengen oturumu)',
    taxRegime: 'İlk 6 ay boyunca Macaristan\'da vergi ödenmez; çifte vergilendirmeyi önleme anlaşması geçerlidir.',
    residencePathway: 'Macaristan konsolosluğundan başvurulur; tüm Schengen ülkelerinde serbest dolaşım hakkı sağlar.',
    popularHubs: ['Budapeşte (7. Bölge Yahudi Mahallesi & Tuna Kıyısı)', 'Szeged', 'Debrecen'],
    internetAndCoworking: 'Telekom ve Yettel fiber 150-300 Mbps. Kaptár Coworking, Loffice Budapest, Impact Hub.',
    lifestyleVibe: 'Tarihi termal kaplıcalar, ruin barlar, muazzam neo-gotik mimari ve Avrupa\'nın göbeğinde ekonomik yaşam.',
    processingTime: '30 gün',
    keyRequirements: [
      'Son 6 aya ait aylık en az 2.000 € gelir dökümü',
      'Macaristan dışındaki bir şirket için uzaktan çalışma kanıtı',
      'Budapeşte\'de konaklama/kira sözleşmesi ve sağlık sigortası'
    ],
    officialUrl: 'https://oif.gov.hu',
    googleMapsQuery: 'Budapest coworking space Kaptar',
    en: {
      countryName: 'Hungary',
      visaName: 'White Card Digital Nomad Residence Permit',
      monthlyLivingCost: '$1,100 - $1,700 / mo (Central Europe\'s most affordable capital Budapest)',
      incomeRequired: 'Min. €2,000/mo (Lowest income requirement across the European Union!)',
      duration: '1 Year (Extendable by 1 year = 2 years Schengen residency)',
      taxRegime: 'Exempt from Hungarian taxes for the first 6 months under DTAA rules.',
      residencePathway: 'Apply via Hungarian consulate; grants full freedom of movement across Schengen.',
      popularHubs: ['Budapest (Jewish Quarter, Danube riverside)', 'Szeged', 'Debrecen'],
      internetAndCoworking: '150-300 Mbps fiber. Kaptár Coworking, Loffice Budapest, Impact Hub.',
      lifestyleVibe: 'Historic thermal baths, ruin bars, grand neo-gothic architecture, and low European living costs.',
      processingTime: '30 days',
      keyRequirements: [
        'Proof of €2,000+/mo income over the past 6 months',
        'Remote employment proof for an offshore company',
        'Lease agreement in Budapest and comprehensive health insurance'
      ]
    },
    de: {
      countryName: 'Ungarn',
      visaName: 'White Card Digitale Nomaden-Aufenthaltserlaubnis',
      monthlyLivingCost: '1.100 - 1.700 $ / Monat (Mitteleuropas erschwinglichste Hauptstadt Budapest)',
      incomeRequired: 'Mind. 2.000 €/Monat (Niedrigste Einkommensgrenze in der gesamten EU!)',
      duration: '1 Jahr (Verlängerbar um 1 Jahr = 2 Jahre Schengen-Aufenthalt)',
      taxRegime: 'Steuerbefreiung in Ungarn für die ersten 6 Monate.',
      residencePathway: 'Beantragung über ungarische Botschaft; freie Bewegung im gesamten Schengen-Raum.',
      popularHubs: ['Budapest (Jüdisches Viertel & Donau-Ufer)', 'Szeged', 'Debrecen'],
      internetAndCoworking: '150-300 Mbit/s. Kaptár Coworking, Loffice Budapest, Impact Hub.',
      lifestyleVibe: 'Historische Thermalbäder, Ruinenbars, neugotische Architektur und günstiges Leben in Mitteleuropa.',
      processingTime: '30 Tage',
      keyRequirements: [
        'Nachweis über mind. 2.000 €/Monat der letzten 6 Monate',
        'Remote-Arbeitsnachweis für ein Unternehmen außerhalb Ungarns',
        'Mietvertrag in Budapest und Krankenversicherung'
      ]
    }
  },
  {
    id: 'spain-nomad',
    countryCode: 'ES',
    countryName: 'İspanya (Kanarya Adaları & Valensiya)',
    region: 'Avrupa & Akdeniz',
    visaName: 'Ley de Startups Dijital Göçebe Vizesi',
    budgetLevel: 'Orta Seviye (1600-2400$)',
    monthlyLivingCost: '1.500 - 2.400 $ / ay (Kanaryalar ve Valensiya Madrid/Barselona\'dan çok daha ucuzdur)',
    incomeRequired: 'Aylık minimum ~2.646 € (~İspanya asgari ücretinin %200\'ü)',
    duration: '3 Yıl (İspanya içinden başvurulduğunda doğrudan 3 yıllık oturum kartı verilir)',
    taxRegime: 'Beckham Kanunu ile 5 yıl boyunca %24 indirimli sabit gelir vergisi ve Kanarya Adaları\'nda %7 düşük KDV (IGIC).',
    residencePathway: 'İspanya\'ya turist olarak gidip ülke içinden UGE göç idaresine başvurarak 3 yıllık kart alınabilir.',
    popularHubs: ['Gran Canaria & Tenerife (Kışın 23°C yaz havası)', 'Valensiya (Akdeniz sahil kenti)', 'Malaga (Avrupa Teknoloji Hub\'ı)'],
    internetAndCoworking: 'Movistar ve Orange fiber 300-600 Mbps. The House Gran Canaria, Wayco Valencia.',
    lifestyleVibe: 'Yıl boyu güneş, siesta kültürü, tapas barları, sörf ve binlerce Avrupalı göçebenin oluşturduğu dev komünite.',
    processingTime: '20 iş günü (İspanya içinden hızlı onay)',
    keyRequirements: [
      'En az 3 aydır uzaktan çalışılan sözleşme ve üniversite diploması veya 3 yıl iş tecrübesi',
      'İspanya\'da geçerli özel sağlık sigortası',
      'Apostilli temiz adli sicil kaydı'
    ],
    officialUrl: 'https://www.exteriores.gob.es',
    googleMapsQuery: 'Gran Canaria coworking space',
    en: {
      countryName: 'Spain (Canary Islands & Valencia)',
      visaName: 'Ley de Startups Digital Nomad Visa',
      monthlyLivingCost: '$1,500 - $2,400 / mo (Canary Islands & Valencia are much cheaper than Madrid)',
      incomeRequired: 'Min. ~€2,646/mo (200% of Spanish minimum wage)',
      duration: '3 Years (Direct 3-year residence card when applying from within Spain)',
      taxRegime: 'Beckham Law grants 24% flat tax rate for 5 years; 7% reduced VAT in Canary Islands.',
      residencePathway: 'Enter as tourist and apply directly to UGE immigration for a 3-year permit.',
      popularHubs: ['Gran Canaria & Tenerife (Winter 23°C)', 'Valencia (Mediterranean coast)', 'Málaga (Tech Hub)'],
      internetAndCoworking: '300-600 Mbps fiber. The House Gran Canaria, Wayco Valencia.',
      lifestyleVibe: 'Year-round sunshine, tapas culture, surfing, and thousands of European nomad peers.',
      processingTime: '20 business days (Fast-track within Spain)',
      keyRequirements: [
        'Remote work contract active for at least 3 months + university degree or 3 years experience',
        'Private healthcare insurance valid in Spain',
        'Apostilled clean criminal record'
      ]
    },
    de: {
      countryName: 'Spanien (Kanaren & Valencia)',
      visaName: 'Ley de Startups Digital Nomad Visum',
      monthlyLivingCost: '1.500 - 2.400 $ / Monat (Kanaren & Valencia deutlich günstiger als Madrid/Barcelona)',
      incomeRequired: 'Mind. ~2.646 €/Monat (200% des spanischen Mindestlohns)',
      duration: '3 Jahre (Direkt 3-jährige Aufenthaltskarte bei Antragstellung in Spanien)',
      taxRegime: 'Beckham-Gesetz mit 24% Pauschalsteuer für 5 Jahre; nur 7% reduzierter Mehrwertsteuersatz (IGIC) auf den Kanaren.',
      residencePathway: 'Als Tourist einreisen und bei der UGE-Behörde direkt eine 3-jährige Karte beantragen.',
      popularHubs: ['Gran Canaria & Teneriffa (Winter 23°C)', 'Valencia (Mittelmeerstadt)', 'Málaga (Tech-Zentrum)'],
      internetAndCoworking: '300-600 Mbit/s. The House Gran Canaria, Wayco Valencia.',
      lifestyleVibe: 'Ganzjährig Sonne, Siesta- und Tapas-Kultur, Surfen und riesige europäische Nomaden-Community.',
      processingTime: '20 Werktage (Schnellverfahren in Spanien)',
      keyRequirements: [
        'Remote-Vertrag seit mindestens 3 Monaten + Hochschulabschluss oder 3 Jahre Berufserfahrung',
        'Private spanische Krankenversicherung ohne Zuzahlung',
        'Apostilliertes polizeiliches Führungszeugnis'
      ]
    }
  },
  {
    id: 'portugal-madeira',
    countryCode: 'PT',
    countryName: 'Portekiz (Madeira & Lizbon)',
    region: 'Avrupa & Akdeniz',
    visaName: 'D8 Digital Nomad Visa & Madeira Nomad Village',
    budgetLevel: 'Orta Seviye (1600-2400$)',
    monthlyLivingCost: '1.600 - 2.500 $ / ay (Madeira adası Lizbon\'a göre çok daha uygundur)',
    incomeRequired: 'Aylık minimum ~3.280 € (Portekiz asgari ücretinin 4 katı)',
    duration: '1 Yıl (Geçici) veya 2 Yıl (Oturum Kartı, 5 yılda AB vatandaşlığına başvurulabilir)',
    taxRegime: 'IFI / NHR 2.0 teşvikleri ile belirli alanlarda %20 sabit vergi veya muafiyet.',
    residencePathway: 'D8 vizesi ile girilip AIMA üzerinden 2 yıllık ikamet kartı alınır.',
    popularHubs: ['Ponta do Sol (Dünyanın İlk Resmi Göçebe Köyü - Madeira)', 'Funchal', 'Porto', 'Lizbon'],
    internetAndCoworking: 'MEO ve NOS 200-500 Mbps fiber. Digital Nomads Madeira Free Coworking, LACS Lisbon.',
    lifestyleVibe: 'Okyanus manzaralı uçurumlar, levada doğa yürüyüşleri, sörf ve dünyanın en organize göçebe ağı.',
    processingTime: '30-60 gün',
    keyRequirements: [
      'Son 3 aya ait aylık 3.280 € gelir bordrosu',
      'Portekiz NIF vergi numarası ve banka hesabı',
      '12 aylık kira sözleşmesi'
    ],
    officialUrl: 'https://vistos.mne.gov.pt',
    googleMapsQuery: 'Digital Nomads Madeira Ponta do Sol',
    en: {
      countryName: 'Portugal (Madeira & Lisbon)',
      visaName: 'D8 Digital Nomad Visa & Madeira Nomad Village',
      monthlyLivingCost: '$1,600 - $2,500 / mo (Madeira island is significantly cheaper than Lisbon)',
      incomeRequired: 'Min. ~€3,280/mo (4x Portuguese minimum wage)',
      duration: '1 Year (Temporary) or 2 Years (Residence Card; leads to EU citizenship in 5 years)',
      taxRegime: 'IFI / NHR 2.0 frameworks offer 20% flat tax on eligible qualifying activities.',
      residencePathway: 'Enter with D8 visa and obtain 2-year residence permit via AIMA.',
      popularHubs: ['Ponta do Sol (First Official Nomad Village in the world)', 'Funchal', 'Porto', 'Lisbon'],
      internetAndCoworking: '200-500 Mbps fiber. Free Coworking at Ponta do Sol, LACS Lisbon.',
      lifestyleVibe: 'Ocean cliffs, levada nature trails, surfing, and Europe\'s best-organized nomad community.',
      processingTime: '30-60 days',
      keyRequirements: [
        'Paystubs showing €3,280+/mo income over past 3 months',
        'Portuguese NIF tax number and bank account',
        '12-month lease agreement'
      ]
    },
    de: {
      countryName: 'Portugal (Madeira & Lissabon)',
      visaName: 'D8 Digital Nomad Visum & Madeira Nomad Village',
      monthlyLivingCost: '1.600 - 2.500 $ / Monat (Madeira ist deutlich günstiger als Lissabon)',
      incomeRequired: 'Mind. ~3.280 €/Monat (4x portugiesischer Mindestlohn)',
      duration: '1 Jahr (Vorübergehend) oder 2 Jahre (Aufenthaltstitel; EU-Pass nach 5 Jahren)',
      taxRegime: '20% Pauschalsteuer im Rahmen von IFI / NHR 2.0 für qualifizierte Berufe.',
      residencePathway: 'Mit D8-Visum einreisen und 2-jährigen Aufenthaltstitel bei der AIMA abholen.',
      popularHubs: ['Ponta do Sol (Erstes offizielles Nomadendorf weltweit)', 'Funchal', 'Porto', 'Lissabon'],
      internetAndCoworking: '200-500 Mbit/s. Kostenloses Coworking Ponta do Sol, LACS Lissabon.',
      lifestyleVibe: 'Steilklippen über dem Atlantik, Levada-Wanderungen, Surfen und top organisiertes Netzwerk.',
      processingTime: '30-60 Tage',
      keyRequirements: [
        'Gehaltsnachweise über mind. 3.280 €/Monat der letzten 3 Monate',
        'Portugiesische Steuernummer (NIF) und Bankkonto',
        '12-monatiger Mietvertrag'
      ]
    }
  },
  {
    id: 'uae-dubai',
    countryCode: 'AE',
    countryName: 'Birleşik Arap Emirlikleri (Dubai)',
    region: 'Orta Doğu & Afrika',
    visaName: 'Virtual Working Programme (Dubai Uzaktan Çalışma Vizesi)',
    budgetLevel: 'Premium (2500$+)',
    monthlyLivingCost: '2.400 - 4.200 $ / ay',
    incomeRequired: 'Aylık minimum 3.500 $ (Eski 5.000 $\'dan düşürüldü)',
    duration: '1 Yıl (Her yıl kolayca yenilenebilir)',
    taxRegime: '%0 Kişisel Gelir Vergisi (Dünyanın en avantajlı sıfır vergi rejimi).',
    residencePathway: 'GDRFA portalından 5-7 günde onay alınır; Emirates ID kartı ve Dubai banka hesabı açılabilir.',
    popularHubs: ['Dubai Marina', 'Downtown', 'JLT (Jumeirah Lakes Towers)', 'DIFC'],
    internetAndCoworking: 'Dünyanın en hızlı mobil ve sabit interneti (300+ Mbps). Astrolabs, Nasab, A4 Space.',
    lifestyleVibe: 'Sıfır suç, fütüristik gökdelenler, Michelin restoranları, lüks plaj kulüpleri ve küresel iş bağlantıları.',
    processingTime: '5-7 iş günü',
    keyRequirements: [
      'Son 1 yıllık uzaktan iş sözleşmesi ve son 3 aylık maaş bordrosu (3.500 $+)',
      'BAE\'de geçerli sağlık sigortası',
      'Son aya ait banka hesap özeti'
    ],
    officialUrl: 'https://www.visitdubai.com',
    googleMapsQuery: 'Dubai JLT coworking space',
    en: {
      countryName: 'United Arab Emirates (Dubai)',
      visaName: 'Virtual Working Programme (Dubai Remote Work Visa)',
      monthlyLivingCost: '$2,400 - $4,200 / mo',
      incomeRequired: 'Min. $3,500/mo (Lowered from previous $5,000 threshold)',
      duration: '1 Year (Easily renewable annually)',
      taxRegime: '0% Personal Income Tax (Global premier zero-tax hub).',
      residencePathway: 'Approved in 5-7 days via GDRFA portal; includes Emirates ID and local bank access.',
      popularHubs: ['Dubai Marina', 'Downtown', 'JLT (Jumeirah Lakes Towers)', 'DIFC'],
      internetAndCoworking: 'World-leading 300+ Mbps fiber and 5G. AstroLabs, Nasab, A4 Space.',
      lifestyleVibe: 'Near-zero crime, futuristic skyline, Michelin dining, luxury beach clubs, and global dealmaking.',
      processingTime: '5-7 business days',
      keyRequirements: [
        '1-year employment contract and past 3 months paystubs ($3,500+/mo)',
        'Valid health insurance policy with UAE coverage',
        'Recent bank statement'
      ]
    },
    de: {
      countryName: 'Vereinigte Arabische Emirate (Dubai)',
      visaName: 'Virtual Working Programme (Dubai Remote-Work-Visum)',
      monthlyLivingCost: '2.400 - 4.200 $ / Monat',
      incomeRequired: 'Mind. 3.500 $/Monat (Gesunken von ehemals 5.000 $)',
      duration: '1 Jahr (Jährlich unkompliziert verlängerbar)',
      taxRegime: '0% persönliche Einkommensteuer (Führende steuerfreie Oase).',
      residencePathway: 'Genehmigung in 5-7 Tagen über GDRFA; inkl. Emirates ID und Bankkontoeröffnung.',
      popularHubs: ['Dubai Marina', 'Downtown', 'JLT (Jumeirah Lakes Towers)', 'DIFC'],
      internetAndCoworking: '300+ Mbit/s 5G und Glasfaser. AstroLabs, Nasab, A4 Space.',
      lifestyleVibe: 'Keine Kriminalität, futuristische Wolkenkratzer, Michelin-Gastronomie und weltweites Networking.',
      processingTime: '5-7 Werktage',
      keyRequirements: [
        '1-Jahres-Arbeitsvertrag und Gehaltsnachweise der letzten 3 Monate (3.500 $+)',
        'Gültige Auslandskrankenversicherung für die VAE',
        'Aktueller Bankkontoauszug'
      ]
    }
  }
];

export function getLocalizedNomadHub(hub: DigitalNomadHub, lang: string = 'tr'): DigitalNomadHub {
  if (lang === 'de' && hub.de) {
    return { ...hub, ...hub.de };
  }
  if (lang === 'en' && hub.en) {
    return { ...hub, ...hub.en };
  }
  if (lang === 'es' || lang === 'ru') {
    const base = hub.en ? { ...hub, ...hub.en } : hub;
    return {
      ...base,
      countryName: getCountryName(hub.countryCode, lang),
      budgetLevel: (lText(lang, hub.budgetLevel, hub.en?.budgetLevel || hub.budgetLevel)) as any,
      region: (lText(lang, hub.region, hub.en?.region || hub.region)) as any,
      visaName: lText(lang, hub.visaName, hub.en?.visaName || hub.visaName),
      monthlyLivingCost: lText(lang, hub.monthlyLivingCost, hub.en?.monthlyLivingCost || hub.monthlyLivingCost),
      incomeRequired: lText(lang, hub.incomeRequired, hub.en?.incomeRequired || hub.incomeRequired),
      duration: lText(lang, hub.duration, hub.en?.duration || hub.duration),
      taxRegime: lText(lang, hub.taxRegime, hub.en?.taxRegime || hub.taxRegime),
      residencePathway: lText(lang, hub.residencePathway, hub.en?.residencePathway || hub.residencePathway),
      popularHubs: hub.popularHubs.map((hTr, i) => lText(lang, hTr, hub.en?.popularHubs?.[i] || hTr)),
      internetAndCoworking: lText(lang, hub.internetAndCoworking, hub.en?.internetAndCoworking || hub.internetAndCoworking),
      lifestyleVibe: lText(lang, hub.lifestyleVibe, hub.en?.lifestyleVibe || hub.lifestyleVibe),
      processingTime: lText(lang, hub.processingTime, hub.en?.processingTime || hub.processingTime),
      keyRequirements: hub.keyRequirements.map((rTr, i) => lText(lang, rTr, hub.en?.keyRequirements?.[i] || rTr))
    };
  }
  return hub;
}
