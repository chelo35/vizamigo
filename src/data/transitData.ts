/**
 * Transit Vize Kuralları Veri Tabanı
 * Dünyadaki tüm 199 ülke ve aktarma merkezleri için transit vize rejimleri,
 * hava tarafı (airside) kuralları, stopover hakları ve bagaj koşulları.
 */

import { getCountryName, resolveVisaCategory, D, idEligibleSet } from './passportData';

export type TransitStatusType =
  | 'airside_free'       // Uluslararası transit alanında vizesiz aktarma
  | 'visa_required'      // Havalimanından çıkılmasa bile transit vize zorunlu
  | 'no_airside_zone'    // Havalimanında transit bölge yok, gümrükten geçmek (giriş vizesi) şart
  | 'entry_visa_free'    // Pasaport zaten ülkeye vizesiz girebiliyor (hem transit hem şehre çıkış serbest)
  | 'special_hub_stopover'; // Özel vizesiz transit / stopover programı mevcut

export interface CountryTransitRule {
  countryCode: string;
  countryName: string;
  statusType: TransitStatusType;
  badgeTitle: string;
  badgeClass: string;
  maxHours: string;
  airsideTransitAllowed: boolean;
  cityExitAllowed: boolean;
  ruleTitle: string;
  summary: string;
  keyConditions: string[];
  exemptions: string[];
  baggageAndTransferTip: string;
  officialUrl?: string;
}

// Schengen Bölgesi Ülkeleri
export const SCHENGEN_COUNTRIES = new Set([
  'AT', 'BE', 'BG', 'CH', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GR',
  'HR', 'HU', 'IS', 'IT', 'LI', 'LT', 'LU', 'LV', 'MT', 'NL', 'NO', 'PL', 'PT',
  'RO', 'SE', 'SI', 'SK', 'AD', 'MC', 'SM', 'VA'
]);

// Özel Detaylı Tanımlanmış Aktarma Merkezleri ve Ülkeler
const CURATED_TRANSIT_RULES: Record<string, {
  ruleTitle: string;
  summary: string;
  maxHours: string;
  statusType: TransitStatusType;
  airsideTransitAllowed: boolean;
  cityExitAllowed: boolean;
  keyConditions: string[];
  exemptions: string[];
  baggageAndTransferTip: string;
  officialUrl?: string;
}> = {
  'GB': {
    ruleTitle: 'Direct Airside Transit Visa (DATV) & Visitor in Transit',
    summary: 'Birleşik Krallık (Heathrow, Gatwick vb.) havalimanlarında aktarma yapacak yolcular için sıkı kurallar uygulanır.',
    maxHours: '24-48 saat',
    statusType: 'visa_required',
    airsideTransitAllowed: true,
    cityExitAllowed: false,
    keyConditions: [
      'Bordo Türk pasaportu taşıyanların havalimanından ayrılmasalar dahi normalde online DATV (Doğrudan Hava Tarafı Transit Vizesi) almaları zorunludur.',
      'Farklı bir havalimanına transfer yapılacaksa (örn. Heathrow\'dan Gatwick\'e) veya bagaj alımı için pasaport kontrolünden geçilecekse "Visitor in Transit" vizesi gerekir.',
      'Uçuşların tek bilet altında ve 24 saat içinde olması beklenir.'
    ],
    exemptions: [
      'Geçerli ABD, Kanada, Avustralya veya Yeni Zelanda giriş vizesi bulunanlar DATV transit vizesinden MUAFTIR (TWOV Muafiyeti).',
      'Geçerli bir AB / AEA veya İsviçre oturum izni olanlar transit vizeden muaftır.',
      'İrlanda biyometrik vizesine sahip olup İrlanda\'ya uçan yolcular vizesiz transit geçebilir.'
    ],
    baggageAndTransferTip: 'Self-transfer (ayrı bilet) uçuşlarda bagaj almak için pasaport kontrolünden geçmeniz gerekeceğinden DATV yetersiz kalır, standart İngiltere vizesi aranır.',
    officialUrl: 'https://www.gov.uk/check-uk-visa'
  },
  'US': {
    ruleTitle: 'C-1 Transit Vizesi (Hava Tarafı Transit Alanı Bulunmaz)',
    summary: 'ABD havalimanlarında uluslararası transit alanı (sterile transit zone) bulunmaz; tüm yolcular ABD sınır kontrolünden geçmek zorundadır.',
    maxHours: 'Kurala tabi (max 29 gün)',
    statusType: 'no_airside_zone',
    airsideTransitAllowed: false,
    cityExitAllowed: true,
    keyConditions: [
      'Yalnızca aktarma yapacak olsanız bile geçerli bir C-1 Transit Vizesi veya B1/B2 Turist Vizesi sahibi olmak ZORUNLUDUR.',
      'İlk ABD havalimanında uçaktan inip gümrük ve pasaport kontrolünden geçmeli, bagajınızı teslim alıp aktarma bandına vermelisiniz.'
    ],
    exemptions: [
      'Vize Muafiyet Programı (ESTA) üyesi ülke pasaportu (örn. Almanya, Fransa, Japonya) taşıyanlar ESTA onayı ile vizesiz transit geçebilir.',
      'Kanada vatandaşları vizesiz transit geçebilir.'
    ],
    baggageAndTransferTip: 'Bagajınızı mutlaka ilk iniş noktasında teslim alıp gümrükten geçirmeniz gerekir. Minimum 3 saat aktarma süresi bırakılması önerilir.',
    officialUrl: 'https://travel.state.gov/content/travel/en/us-visas/other-visa-categories/transit.html'
  },
  'CA': {
    ruleTitle: 'Kanada Transit Vizesi veya eTA',
    summary: 'Kanada havalimanları üzerinden aktarma yapacak tüm yolcuların önceden onaylı vize veya seyahat izni alması gerekir.',
    maxHours: '48 saate kadar',
    statusType: 'visa_required',
    airsideTransitAllowed: true,
    cityExitAllowed: false,
    keyConditions: [
      'Türk pasaportu sahipleri için Kanada Transit Vizesi ZORUNLUDUR.',
      'Transit vize başvurusu harçtan (ücretten) muaftır ancak online başvuru, biyometri ve pasaport gönderimi gerektirir.',
      'Transit süresi 48 saati aşmamalıdır.'
    ],
    exemptions: [
      'Geçerli Kanada turist vizesi veya ABD vizesiyle Kanada eTA muafiyet programında olanlar hariçtir.',
      'Yeşil/Gri pasaportlar da transit vizeye tabidir.'
    ],
    baggageAndTransferTip: 'Toronto Pearson ve Vancouver havalimanlarında ABD\'ye devam eden uçuşlar için özel ABD ön gümrük (US Pre-clearance) mevcuttur.',
    officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/transit.html'
  },
  'AU': {
    ruleTitle: 'Avustralya Transit Visa (Subclass 771)',
    summary: 'Avustralya havalimanlarında 8 saatten az kalacak olsanız bile önceden izin şarttır.',
    maxHours: '72 saate kadar',
    statusType: 'visa_required',
    airsideTransitAllowed: true,
    cityExitAllowed: false,
    keyConditions: [
      'Türk vatandaşları havalimanı transit salonunda 8 saatten az kalacak olsalar dahi Subclass 771 Transit Vizesi almak zorundadır.',
      'Başvuru Avustralya İçişleri Bakanlığı ImmiAccount üzerinden online ve ücretsiz yapılır; seyahatten en az 3-4 hafta önce başvurulmalıdır.'
    ],
    exemptions: [
      'Avustralya "Transit Without Visa (TWOV)" muafiyet listesindeki ülkeler hariç Türk pasaportuna vizesiz geçiş tanınmaz.'
    ],
    baggageAndTransferTip: 'Bagajların doğrudan nihai noktaya etiketlendiğinden emin olunmalıdır.',
    officialUrl: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/transit-771'
  },
  'NZ': {
    ruleTitle: 'Yeni Zelanda Transit NZeTA',
    summary: 'Auckland Havalimanı üzerinden aktarma yapacak yolcular için elektronik izin gereksinimi.',
    maxHours: '24 saate kadar',
    statusType: 'visa_required',
    airsideTransitAllowed: true,
    cityExitAllowed: false,
    keyConditions: [
      'Auckland üzerinden transit geçecek yolcuların seyahatten önce mobil uygulama veya web üzerinden Transit NZeTA (Elektronik Seyahat Yetkisi) alması zorunludur.',
      'Transit süresi 24 saati aşamaz ve Auckland Havalimanı transit alanından çıkılamaz.'
    ],
    exemptions: [
      'Avustralya vatandaşları ve daimi oturum kartı sahipleri muaftır.'
    ],
    baggageAndTransferTip: 'Yalnızca Auckland Uluslararası Havalimanı uluslararası transit alanı sunmaktadır.',
    officialUrl: 'https://www.immigration.govt.nz'
  },
  'AE': {
    ruleTitle: 'BAE Havalimanı Transit Alanı & Stopover (Dubai / Abu Dabi)',
    summary: 'Dünyanın en yoğun transit merkezlerinden Dubai (DXB) ve Abu Dabi (AUH) aktarma dostu kurallara sahiptir.',
    maxHours: '24 saate kadar (Transit alanda)',
    statusType: 'special_hub_stopover',
    airsideTransitAllowed: true,
    cityExitAllowed: false,
    keyConditions: [
      'Aynı havalimanında 24 saat içinde devam eden dış hat bağlantınız varsa transit vizeye gerek yoktur.',
      'Bagajınız nihai varış noktasına etiketlendiyse pasaport kontrolüne girmeden doğrudan aktarma güvenlik kontrolünden geçebilirsiniz.',
      'Havalimanından çıkıp şehre inmek isterseniz: Bordo pasaport için önceden BAE e-vizesi gereklidir. Yeşil pasaport sahipleri vizesiz şehre çıkabilir.'
    ],
    exemptions: [
      'Emirates ile 8-26 saat arası, Etihad ile 10-24 saat arası aktarmalarda havayolu tarafından ücretsiz "Dubai Connect / Abu Dhabi Stopover" otel ve vize hizmeti sağlanabilir.'
    ],
    baggageAndTransferTip: 'Terminal 1-2-3 arası (Emirates ve flydubai) transferler içeriden sağlanır. DWC Havalimanı\'na transfer gerekiyorsa ülkeye giriş vizesi zorunludur.',
    officialUrl: 'https://www.emirates.com/tr/turkish/before-you-fly/dubai-international-airport/transit-passengers/'
  },
  'QA': {
    ruleTitle: 'Doha Hamad Uluslararası Havalimanı (DOH) Transit & Serbest Giriş',
    summary: 'Katar, Türk vatandaşlarına hem vizesiz transit hem de vizesiz şehre çıkış hakkı tanıyan mükemmel bir aktarma merkezidir.',
    maxHours: '24 saat transit / 90 gün vizesiz giriş',
    statusType: 'entry_visa_free',
    airsideTransitAllowed: true,
    cityExitAllowed: true,
    keyConditions: [
      'Havalimanı transit alanında kalmak kaydıyla 24 saate kadar herhangi bir vize gerekmez.',
      'Türk vatandaşları Katar\'a 90 güne kadar vizesiz girebildiğinden, uzun aktarmalarda serbestçe pasaporttan geçip şehri gezebilir.',
      'Qatar Airways "Discover Qatar" stopover programıyla sembolik ücretlerle 4-5 yıldızlı lüks otellerde konaklama imkanı sunar.'
    ],
    exemptions: [
      'Tüm pasaport türleri için aktarma alanı 7/24 açıktır.'
    ],
    baggageAndTransferTip: 'Bagajlar doğrudan son varış noktasına aktarılır. Şehre çıkarken kabin bagajınızla rahatça çıkabilirsiniz.',
    officialUrl: 'https://dohahamadairport.com'
  },
  'SA': {
    ruleTitle: 'Suudi Arabistan Ücretsiz Stopover / Transit Vizesi (96 Saat)',
    summary: 'Saudia veya Flynas ile uçan yolculara anında 96 saatlik vizesiz giriş ve Umre imkanı.',
    maxHours: '96 saate kadar',
    statusType: 'special_hub_stopover',
    airsideTransitAllowed: true,
    cityExitAllowed: true,
    keyConditions: [
      'Saudia veya Flynas havayolu ile uçarken biletleme esnasında ücretsiz 96 saatlik Transit / Stopover Vizesi otomatik oluşturulur.',
      'Bu vize ile havalimanından çıkıp Mekke ve Medine\'de Umre yapabilir, Riyad ve Cidde\'yi gezebilirsiniz.',
      'Farklı yabancı havayolları ile uçuşlarda havalimanı transit alanında 12 saate kadar vizesiz kalınabilir.'
    ],
    exemptions: [
      'Geçerli ABD, İngiltere veya Schengen vizesi olanlar Suudi Arabistan sınır kapısında varışta vize (VoA) alarak da şehre çıkabilir.'
    ],
    baggageAndTransferTip: '12 saatten uzun aktarmalarda transit vize başvurusu havayolu portalı üzerinden yapılmalıdır.',
    officialUrl: 'https://www.visitsaudi.com'
  },
  'SG': {
    ruleTitle: 'Singapur Changi (SIN) Transit & Vizesiz Şehir İzni',
    summary: 'Dünyanın en iyi aktarma havalimanı olan Changi, Türk vatandaşlarına tam vize serbestisi sunar.',
    maxHours: '24 saat transit / 30 gün vizesiz giriş',
    statusType: 'entry_visa_free',
    airsideTransitAllowed: true,
    cityExitAllowed: true,
    keyConditions: [
      'Terminal 1, 2, 3 ve 4 arasında 24 saat boyunca vizesiz serbestçe transit yapılabilir.',
      'Türk vatandaşları Singapur\'a 30 gün vizesiz girebildiğinden, pasaport kontrolünden geçerek ünlü Jewel Changi şelalesini ve şehri vizesiz gezebilir.',
      '5.5 saatten uzun aktarması olan yolcular için Changi Havalimanı ücretsiz "Free Singapore Tour" otobüs turları sunar.'
    ],
    exemptions: [
      'Transit alanında kalındığı sürece tüm pasaportlar için vizesizdir.'
    ],
    baggageAndTransferTip: 'Jewel Changi genel (kara) tarafında yer alır; Jewel\'i gezmek için pasaport kontrolünden geçilmesi gerekir.',
    officialUrl: 'https://www.changiairport.com'
  },
  'CN': {
    ruleTitle: 'Çin 24 Saatlik Transit & 72/144 Saatlik Vizesiz Şehir İzni (TWOV)',
    summary: 'Çin havalimanlarında 24 saat içinde aktarma vizesizdir; Pekin, Şanghay ve Guangzhou\'da 144 saate kadar vizesiz şehre çıkış hakkı mevcuttur.',
    maxHours: '24 - 144 saat',
    statusType: 'special_hub_stopover',
    airsideTransitAllowed: true,
    cityExitAllowed: true,
    keyConditions: [
      '24 saat içinde 3. bir ülkeye devam bileti olan tüm yolcular için uluslararası transit alanında vizesiz aktarma serbesttir.',
      'Pekin (PEK/PKX), Şanghay (PVG), Guangzhou (CAN) gibi ana merkezlerde 144 saatlik Transit Without Visa (TWOV) kapsamında sınır polisine başvurarak vizesiz şehre çıkış izin pulu alınabilir.',
      'Seyahat planının A Ülkesi -> Çin -> C Ülkesi formatında olması şarttır (A -> Çin -> A dönüş uçuşları kabul edilmez).'
    ],
    exemptions: [
      'Bordo Türk pasaportu taşıyanların 144 saatlik geçici izin başvurularında sınır polisinin takdir hakkı bulunur; onay için onaylı otel rezervasyonu ve çıkış bileti ibraz edilmelidir.'
    ],
    baggageAndTransferTip: 'Çin\'de iç hat aktarması yapılacaksa (örn. Şanghay -> Pekin -> Seul) ilk iniş noktasında sınır kontrolünden geçilmesi zorunludur.',
    officialUrl: 'https://www.nia.gov.cn'
  },
  'JP': {
    ruleTitle: 'Japonya Havalimanı Transit Alanı & Shore Pass İzni',
    summary: 'Tokyo (Haneda, Narita) ve Osaka (KIX) üzerinden aktarma kuralları.',
    maxHours: 'Aynı takvim günü (veya 72 saat Shore Pass)',
    statusType: 'airside_free',
    airsideTransitAllowed: true,
    cityExitAllowed: false,
    keyConditions: [
      'Aynı takvim günü içinde devam eden uluslararası bağlantılarda havalimanı transit alanından çıkmamak şartıyla vizesiz aktarma serbesttir.',
      'Narita Havalimanı (NRT) gece 23:00 - 06:00 arası kapatıldığından, geceyi havalimanında geçirmek mümkün değildir; uçuşunuz ertesi günse sınır polisinin "Shore Pass" (72 saatlik acil durum geçici giriş izni) vermesi gerekir.',
      'Haneda (HND) ve Narita (NRT) arasında havalimanı değişimi yapılacaksa Japonya vizesi ZORUNLUDUR.'
    ],
    exemptions: [
      'Geçerli Japonya turist vizesi olanlar serbestçe havalimanları arası transfer yapabilir ve şehre çıkabilir.'
    ],
    baggageAndTransferTip: 'Haneda 7/24 açıktır; Narita geceleme gerektiren aktarmalarda havayolu ve sınır polisi prosedürlerine dikkat edilmelidir.',
    officialUrl: 'https://www.mofa.go.jp'
  },
  'KR': {
    ruleTitle: 'Güney Kore Incheon (ICN) Transit & 30 Günlük Vizesiz Giriş Muafiyeti',
    summary: 'Seul Incheon üzerinden aktarmalarda hem havalimanı içi vizesiz aktarma hem de 3. ülke vizesiyle 30 güne kadar şehre giriş hakkı.',
    maxHours: '24 saat transit / 30 gün özel muafiyet',
    statusType: 'special_hub_stopover',
    airsideTransitAllowed: true,
    cityExitAllowed: true,
    keyConditions: [
      'Incheon Havalimanı uluslararası transit alanında 24 saate kadar vizesiz aktarma serbesttir.',
      'ÖZEL FIRSAT: ABD, Kanada, Avustralya, Yeni Zelanda veya 32 Avrupa ülkesine seyahat eden ya da bu ülkelerden dönen Türk vatandaşları, Incheon üzerinden geçerken 30 güne kadar VİZESİZ Güney Kore\'ye giriş yapabilir!',
      'Incheon Havalimanı transit yolcular için ücretsiz Seul şehir turları (K-Culture, Tapınak ve Alışveriş turları) sunar.'
    ],
    exemptions: [
      'Doğrudan Güney Kore\'ye turistik girişte K-ETA veya vize gerekirken, 3. ülke transit kuralında vize aranmaz.'
    ],
    baggageAndTransferTip: 'Incheon Terminal 1 ve Terminal 2 arasında aktarma treniyle güvenli alandan çıkmadan geçiş yapılabilir.',
    officialUrl: 'https://www.airport.kr'
  },
  'MY': {
    ruleTitle: 'Malezya KLIA Transit & 90 Gün Vizesiz Giriş',
    summary: 'Kuala Lumpur Uluslararası Havalimanı (KLIA1 ve KLIA2) aktarma kuralları.',
    maxHours: '24 saat transit / 90 gün vizesiz giriş',
    statusType: 'entry_visa_free',
    airsideTransitAllowed: true,
    cityExitAllowed: true,
    keyConditions: [
      'KLIA havalimanı transit alanında 24 saate kadar vizesiz aktarma yapılabilir.',
      'Türk vatandaşları Malezya\'ya 90 güne kadar vizesiz girebildiğinden, KLIA1 ve KLIA2 (AirAsia terminali) arasında geçiş yapmak veya şehre çıkmak için vize engeli yoktur.',
      'Sadece pasaport kontrolünden geçmeden önce Malezya Dijital Varış Kartı (MDAC) online doldurulmalıdır.'
    ],
    exemptions: [
      'Tüm pasaport türleri için aktarma alanı açıktır.'
    ],
    baggageAndTransferTip: 'KLIA1 ve KLIA2 arasında geçiş için KLIA Ekspres treni kullanılır.',
    officialUrl: 'https://www.imi.gov.my'
  },
  'TH': {
    ruleTitle: 'Tayland Bangkok (BKK) Transit & 30 Gün Vizesiz Giriş',
    summary: 'Bangkok Suvarnabhumi üzerinden Güneydoğu Asya aktarmaları.',
    maxHours: '12 saat transit / 30 gün vizesiz giriş',
    statusType: 'entry_visa_free',
    airsideTransitAllowed: true,
    cityExitAllowed: true,
    keyConditions: [
      'Suvarnabhumi (BKK) havalimanında 12 saate kadar uluslararası transit alanında vizesiz aktarma yapılabilir.',
      'Türk vatandaşlarına Tayland 30 güne kadar vizesiz giriş hakkı tanımaktadır (Seyahat öncesi resmi TDAC dijital varış kartı doldurulmalıdır).',
      'Don Mueang (DMK) ve Suvarnabhumi (BKK) arasında havalimanı transferi için ücretsiz servis otobüsü kullanılır; ülkeye vizesiz giriş yapılır.'
    ],
    exemptions: [
      'Transit alanında kalmak için devam biletinin ve bagaj etiketinin hazır olması gerekir.'
    ],
    baggageAndTransferTip: 'Ayrı biletli (self-transfer) uçuşlarda bagajınızı almak için vizesiz olarak pasaport kontrolünden geçebilirsiniz.',
    officialUrl: 'https://www.immigration.go.th'
  },
  'HK': {
    ruleTitle: 'Hong Kong Uluslararası Havalimanı (HKG) Transit & Serbest Giriş',
    summary: 'Cathay Pacific ana merkezi olan HKG üzerinden Asya ve Pasifik aktarmaları.',
    maxHours: '24 saat transit / 90 gün vizesiz giriş',
    statusType: 'entry_visa_free',
    airsideTransitAllowed: true,
    cityExitAllowed: true,
    keyConditions: [
      '24 saat içinde devam eden uçuşlarda uluslararası transit alanında vizesiz aktarma serbesttir.',
      'Türk pasaportuna 90 gün vizesiz giriş hakkı tanındığından pasaport kontrolünden geçip şehre çıkmak tamamen serbesttir.',
      'Aynı gün içinde Hong Kong üzerinden ayrılan yolcular için ödenen havalimanı kalkış vergisi (HKD 120) nakit olarak geri iade alınabilir!'
    ],
    exemptions: [
      'Tüm pasaportlar için 24 saat hava tarafı aktarma açıktır.'
    ],
    baggageAndTransferTip: 'Havalimanı kalkış vergisi iadesi için havalimanındaki vergi iade gişesine başvurulabilir.',
    officialUrl: 'https://www.hongkongairport.com'
  },
  'TR': {
    ruleTitle: 'Türkiye Havalimanları (İstanbul IST & Sabiha Gökçen SAW) Transit',
    summary: 'THY ve Pegasus ana merkezlerinde 24 saat kesintisiz uluslararası transit.',
    maxHours: '24 saate kadar transit',
    statusType: 'special_hub_stopover',
    airsideTransitAllowed: true,
    cityExitAllowed: true,
    keyConditions: [
      'Uluslararası transit alanından ayrılmamak şartıyla yabancı yolcular için vizesiz aktarma serbesttir.',
      'Türk vatandaşları kendi ülkeleri olduğundan hiçbir kısıtlamaya tabi değildir.',
      'Türk Hava Yolları (THY) ile 6-24 saat aktarması olan yolcular için ücretsiz "Touristanbul" rehberli şehir turları veya otel konaklaması sunulur.'
    ],
    exemptions: [
      'Uluslararası transit salonu 7/24 hizmet verir.'
    ],
    baggageAndTransferTip: 'İstanbul Havalimanı (IST) çok büyük bir terminale sahip olduğundan kapılar arası yürüyüş süresi 20-25 dakikayı bulabilir.',
    officialUrl: 'https://www.istairport.com'
  },
  'RU': {
    ruleTitle: 'Rusya Havalimanı Transit Alanı (Moskova SVO, DME, VKO)',
    summary: 'Moskova üzerinden Asya aktarmaları ve kritik Belarus uyarısı.',
    maxHours: '24 saate kadar',
    statusType: 'airside_free',
    airsideTransitAllowed: true,
    cityExitAllowed: false,
    keyConditions: [
      '24 saat içinde uluslararası transit alanından çıkmamak şartıyla vizesiz aktarma yapılabilir (Şeremetyevo, Domodedovo, Vnukovo).',
      'KRİTİK UYARI: Rusya üzerinden Belarus\'a (Minsk) uçulacaksa iki ülke arasındaki uçuşlar "iç hat" sayılır; bu nedenle Rusya Transit Vizesi ZORUNLUDUR!',
      'Havalimanı değişikliği gerektiren aktarmalarda Rusya vizesi şarttır.'
    ],
    exemptions: [
      'Geçerli Rusya vizesi olanlar şehre çıkabilir.'
    ],
    baggageAndTransferTip: 'Farklı terminaller arasında hava tarafı geçişinin açık olduğundan emin olunmalıdır.',
    officialUrl: 'https://www.kdmid.ru'
  },
  'PA': {
    ruleTitle: 'Panama Tocumen (PTY) "Hub of the Americas" Transit & Vizesiz Giriş',
    summary: 'Copa Airlines ana aktarma merkezi; Amerika ve Karayipler arası köprü.',
    maxHours: '12 saat transit / 90 gün vizesiz giriş',
    statusType: 'entry_visa_free',
    airsideTransitAllowed: true,
    cityExitAllowed: true,
    keyConditions: [
      '12 saate kadar uluslararası transit alanında vizesiz aktarma serbesttir.',
      'Türk vatandaşları Panama\'ya 90 güne kadar vizesiz girebildiğinden pasaport kontrolünden geçerek şehre ve Panama Kanalı\'na çıkabilir.',
      'Copa Airlines ile Panama City stopover programı uygulanabilir.'
    ],
    exemptions: [
      'Transit alanında ek güvenlik taraması yapılır.'
    ],
    baggageAndTransferTip: 'ABD aktarmalı Latin Amerika uçuşlarına göre ABD vizesi gerektirmediği için en pratik alternatif rotadır.',
    officialUrl: 'https://www.tocumenpanama.net'
  },
  'EG': {
    ruleTitle: 'Mısır Kahire (CAI) Havalimanı Transit Alanı',
    summary: 'EgyptAir ana merkezi üzerinden Afrika ve Orta Doğu aktarmaları.',
    maxHours: '48 saate kadar',
    statusType: 'airside_free',
    airsideTransitAllowed: true,
    cityExitAllowed: false,
    keyConditions: [
      '48 saate kadar uluslararası transit alanından ayrılmamak şartıyla vizesiz aktarma serbesttir.',
      '6 saatten uzun aktarmalarda havayolu ve polis gözetiminde ücretsiz veya sembolik ücretli Piramitler turu düzenlenebilir.',
      'Havalimanından bireysel olarak çıkmak için Mısır kapıda vizesi veya e-vizesi gereklidir.'
    ],
    exemptions: [
      'Yeşil pasaport sahipleri vizesiz şehre çıkabilir.'
    ],
    baggageAndTransferTip: 'Terminaller arası geçiş havalimanı içi shuttle treniyle sağlanır.',
    officialUrl: 'https://www.cairo-airport.info'
  },
  'ET': {
    ruleTitle: 'Etiyopya Addis Ababa Bole (ADD) Transit & Stopover',
    summary: 'Afrika kıtasının en büyük aktarma merkezi; Ethiopian Airlines ana üssü.',
    maxHours: '12 saat transit / Ücretsiz Stopover Oteli',
    statusType: 'special_hub_stopover',
    airsideTransitAllowed: true,
    cityExitAllowed: true,
    keyConditions: [
      '12 saate kadar uluslararası transit salonunda vizesiz aktarma serbesttir.',
      'Ethiopian Airlines ile 8-24 saat arası aktarması olan yolculara havayolu tarafından ücretsiz transit vizesi, havalimanı transferi ve 4-5 yıldızlı otel konaklaması sağlanır.',
      'Havalimanından ayrılmak için sarıhumma aşı kartı sorulabilir (bölgeye göre).'
    ],
    exemptions: [
      'Aktarma oteli hakkı bilet sınıfına ve bekleme süresine göre kontuardan verilir.'
    ],
    baggageAndTransferTip: 'Transit otel kuponu Addis Ababa varışında transfer masasından (Interline Desk) alınır.',
    officialUrl: 'https://www.ethiopianairlines.com'
  },
  'GE': {
    ruleTitle: 'Gürcistan (Tiflis TBS, Batum BUS) - Kimlikle Serbest Geçiş',
    summary: 'Türk vatandaşları için hem vizesiz hem pasaportsuz tam serbesti.',
    maxHours: '360 gün (Sınırsız serbesti)',
    statusType: 'entry_visa_free',
    airsideTransitAllowed: true,
    cityExitAllowed: true,
    keyConditions: [
      'Uluslararası transit için hiçbir vize gerekmez.',
      'Türk vatandaşları çipli ulusal kimlik kartıyla bile 360 güne kadar Gürcistan\'a giriş yapabildiğinden aktarmalarda sınırsız hareket serbestisi mevcuttur.'
    ],
    exemptions: [
      'Kimlik veya pasaportla tam muafiyet.'
    ],
    baggageAndTransferTip: 'Batum Havalimanı HOP kodlu iç hat uçuşlarında Hopa yolcuları pasaportsuz transfer edilir.',
    officialUrl: 'https://www.geoconsul.gov.ge'
  },
  'AZ': {
    ruleTitle: 'Azerbaycan Bakü Haydar Aliyev (GYD) - Kimlikle Serbest Geçiş',
    summary: 'Türk vatandaşları için kimlikle 90 gün serbest giriş ve transit.',
    maxHours: '90 gün serbest giriş',
    statusType: 'entry_visa_free',
    airsideTransitAllowed: true,
    cityExitAllowed: true,
    keyConditions: [
      'Bakü üzerinden Orta Asya ve Rusya aktarmalarında havalimanı içi vizesizdir.',
      'Türk vatandaşları yeni tip çipli kimlik kartıyla 90 güne kadar vizesiz girebildiğinden istedikleri an şehre çıkabilirler.'
    ],
    exemptions: [
      'Kimlikle giriş imkanı mevcuttur.'
    ],
    baggageAndTransferTip: 'GYD Terminal 1 dünyanın en modern ve konforlu terminallerinden biridir.',
    officialUrl: 'https://www.mfa.gov.az'
  },
  'RS': {
    ruleTitle: 'Sırbistan Belgrad Nikola Tesla (BEG) - Kimlikle Serbest Geçiş',
    summary: 'Air Serbia ana merkezi üzerinden Balkanlar ve Avrupa aktarmaları.',
    maxHours: '90 gün serbest giriş',
    statusType: 'entry_visa_free',
    airsideTransitAllowed: true,
    cityExitAllowed: true,
    keyConditions: [
      'Uluslararası alanda aktarma vizesizdir.',
      'Türk vatandaşları kimlikle/pasaportla 90 gün vizesiz giriş hakkına sahip olduğundan şehre çıkışta hiçbir engel yoktur.'
    ],
    exemptions: [
      'Kimlikle seyahat protokolü yürürlüktedir.'
    ],
    baggageAndTransferTip: 'Belgrad Havalimanı Avrupa aktarmalarında Schengen vizesi gerektirmeyen en popüler aktarma noktasıdır.',
    officialUrl: 'https://www.mfa.gov.rs'
  },
  'ME': {
    ruleTitle: 'Karadağ (Podgorica TGD, Tivat TIV) Transit & Vizesiz Giriş',
    summary: 'Balkanlar aktarma rotası.',
    maxHours: '90 gün serbest giriş (Bordo pasaport)',
    statusType: 'entry_visa_free',
    airsideTransitAllowed: true,
    cityExitAllowed: true,
    keyConditions: [
      'Havalimanı aktarması vizesizdir.',
      'Türk vatandaşları 90 güne kadar vizesiz seyahat edebilir ve şehre çıkabilir.'
    ],
    exemptions: [
      'Standart vize muafiyeti geçerlidir.'
    ],
    baggageAndTransferTip: 'Havalimanları kompakt ve hızlı geçiş imkanı sağlar.',
    officialUrl: 'https://www.gov.me'
  },
  'BA': {
    ruleTitle: 'Bosna-Hersek (Saraybosna SJJ) - Kimlikle Serbest Giriş & Transit',
    summary: 'Balkanlar aktarmalarında tam vize muafiyeti.',
    maxHours: '90 gün serbest giriş',
    statusType: 'entry_visa_free',
    airsideTransitAllowed: true,
    cityExitAllowed: true,
    keyConditions: [
      'Uluslararası transit vizesizdir.',
      'Kimlikle veya pasaportla 90 gün vizesiz giriş yapılabilir.'
    ],
    exemptions: [
      'Tam muafiyet mevcuttur.'
    ],
    baggageAndTransferTip: 'Saraybosna kompakt bir terminale sahiptir.',
    officialUrl: 'https://www.mvp.gov.ba'
  },
  'MK': {
    ruleTitle: 'Kuzey Makedonya (Üsküp SKP) Transit & Vizesiz Giriş',
    summary: 'Wizz Air ve bölgesel aktarmalar için popüler vizesiz merkez.',
    maxHours: '90 gün serbest giriş',
    statusType: 'entry_visa_free',
    airsideTransitAllowed: true,
    cityExitAllowed: true,
    keyConditions: [
      'Havalimanı içi transit vizesizdir.',
      'Türk vatandaşları 90 gün vizesiz şehre çıkabilir.'
    ],
    exemptions: [
      'Tam muafiyet mevcuttur.'
    ],
    baggageAndTransferTip: 'Schengen dışı ekonomik aktarma noktasıdır.',
    officialUrl: 'https://www.mfa.gov.mk'
  },
  'AL': {
    ruleTitle: 'Arnavutluk (Tiran TIA) Transit & Vizesiz Giriş',
    summary: 'Tiran üzerinden aktarmalarda tam vize muafiyeti.',
    maxHours: '90 gün serbest giriş',
    statusType: 'entry_visa_free',
    airsideTransitAllowed: true,
    cityExitAllowed: true,
    keyConditions: [
      'Uluslararası alanda aktarma vizesizdir.',
      'Türk vatandaşları 90 gün vizesiz giriş hakkına sahiptir.'
    ],
    exemptions: [
      'Tam muafiyet mevcuttur.'
    ],
    baggageAndTransferTip: 'Tiran Havalimanı son yıllarda yenilenmiş ve büyütülmüştür.',
    officialUrl: 'https://punetejashtme.gov.al'
  },
  'JO': {
    ruleTitle: 'Ürdün Amman Queen Alia (AMM) Transit & 90 Gün Vizesiz Giriş',
    summary: 'Royal Jordanian ana merkezi üzerinden Orta Doğu aktarmaları.',
    maxHours: '24 saat transit / 90 gün vizesiz giriş',
    statusType: 'entry_visa_free',
    airsideTransitAllowed: true,
    cityExitAllowed: true,
    keyConditions: [
      'Havalimanı transit alanında 24 saate kadar vizesiz aktarma serbesttir.',
      'Türk vatandaşları Ürdün\'e 90 güne kadar vizesiz girebildiğinden dileyenler şehre ve Petra rotasına vizesiz çıkabilir.',
      'Royal Jordanian ile 8 saatten uzun aktarmalarda otel konaklaması sağlanabilir.'
    ],
    exemptions: [
      'Standart vize muafiyeti geçerlidir.'
    ],
    baggageAndTransferTip: 'AMM modern ve transit dostu bir havalimanıdır.',
    officialUrl: 'https://www.visitjordan.com'
  },
  'LB': {
    ruleTitle: 'Lübnan Beyrut Refik Hariri (BEY) Transit & Vizesiz Giriş',
    summary: 'Orta Doğu aktarmaları.',
    maxHours: '24 saat transit / 90 gün vizesiz giriş',
    statusType: 'entry_visa_free',
    airsideTransitAllowed: true,
    cityExitAllowed: true,
    keyConditions: [
      'Havalimanı transit alanında vizesiz aktarma serbesttir.',
      'Türk vatandaşları 90 gün vizesiz şehre çıkabilir (Pasaporta İsrail mührü olmaması şarttır).'
    ],
    exemptions: [
      'Vizesiz giriş mevcuttur.'
    ],
    baggageAndTransferTip: 'Pasaportta İsrail giriş/çıkış mührü bulunması durumunda ülkeye giriş reddedilir.',
    officialUrl: 'https://www.general-security.gov.lb'
  },
  'OM': {
    ruleTitle: 'Umman Maskat (MCT) Transit & Vizesiz Giriş',
    summary: 'Oman Air ana merkezi üzerinden Körfez aktarmaları.',
    maxHours: '24 saat transit / 14 gün vizesiz giriş',
    statusType: 'entry_visa_free',
    airsideTransitAllowed: true,
    cityExitAllowed: true,
    keyConditions: [
      'Havalimanı transit alanında 24 saate kadar vizesiz aktarma serbesttir.',
      'Türk vatandaşları Umman\'a 14 güne kadar vizesiz girebildiğinden serbestçe şehre çıkabilir.'
    ],
    exemptions: [
      '14 güne kadar vize aranmaz.'
    ],
    baggageAndTransferTip: 'Maskat Havalimanı yeni terminaliyle konforlu transit imkanı sunar.',
    officialUrl: 'https://www.rop.gov.om'
  },
  'KW': {
    ruleTitle: 'Kuveyt (KWI) Havalimanı Transit Alanı & Kapıda Vize',
    summary: 'Kuveyt üzerinden aktarmalar.',
    maxHours: '24 saate kadar',
    statusType: 'airside_free',
    airsideTransitAllowed: true,
    cityExitAllowed: false,
    keyConditions: [
      '24 saat içinde devam eden bağlantılarda havalimanı transit alanından çıkmamak şartıyla vizesiz aktarma serbesttir.',
      'Şehre çıkmak isteyen Türk vatandaşları havalimanı vize bankosundan veya online e-vize alarak giriş yapabilir.'
    ],
    exemptions: [
      'Yeşil pasaport sahipleri vizesiz şehre çıkabilir.'
    ],
    baggageAndTransferTip: 'Terminal 1 ve Terminal 4 arası transferlerde havayolu talimatlarına uyulmalıdır.',
    officialUrl: 'https://evisa.moi.gov.kw'
  },
  'BH': {
    ruleTitle: 'Bahreyn (BAH) Havalimanı Transit & E-Vize/Kapıda Vize',
    summary: 'Gulf Air ana merkezi üzerinden aktarmalar.',
    maxHours: '24 saate kadar transit',
    statusType: 'airside_free',
    airsideTransitAllowed: true,
    cityExitAllowed: false,
    keyConditions: [
      '8-24 saat arası aktarmalarda transit alanından ayrılmamak şartıyla vizesizdir.',
      'Şehre çıkmak için sınır kapısında kolayca kapıda vize (VoA) veya e-vize alınabilir.'
    ],
    exemptions: [
      'Yeşil pasaport sahipleri vizesiz şehre çıkabilir.'
    ],
    baggageAndTransferTip: 'Gulf Air ile uzun aktarmalarda otel konaklaması sağlanabilir.',
    officialUrl: 'https://www.evisa.gov.bh'
  },
  'IN': {
    ruleTitle: 'Hindistan (Delhi DEL, Mumbai BOM) Transit Kuralları',
    summary: 'Hindistan havalimanlarında hava tarafı transit ve e-Transit vize gereksinimi.',
    maxHours: '24 saate kadar',
    statusType: 'airside_free',
    airsideTransitAllowed: true,
    cityExitAllowed: false,
    keyConditions: [
      'Aynı havalimanında 24 saat içinde devam eden uçuşlarda, bagaj aktarımı yapılmışsa ve uluslararası transit alanından çıkılmıyorsa vizesiz aktarma yapılabilir.',
      'Havalimanı değişikliği veya iç hat bağlantısı yapılacaksa (örn. Delhi\'den Mumbai aktarmasıyla Nepal\'e) standart Hindistan vizesi veya e-Vize zorunludur.'
    ],
    exemptions: [
      'Hava tarafında kalındığı sürece transit vize aranmaz.'
    ],
    baggageAndTransferTip: 'Ayrı biletli (self-transfer) uçuşlarda bagaj almak için Hindistan vizesi şarttır.',
    officialUrl: 'https://indianvisaonline.gov.in'
  },
  'ID': {
    ruleTitle: 'Endonezya Cakarta (CGK) / Bali (DPS) Transit & Kapıda Vize',
    summary: 'Güneydoğu Asya aktarmaları.',
    maxHours: '24 saate kadar',
    statusType: 'airside_free',
    airsideTransitAllowed: true,
    cityExitAllowed: false,
    keyConditions: [
      'Uluslararası transit alanından ayrılmamak şartıyla 24 saat vizesiz aktarma yapılabilir.',
      'Şehre çıkmak veya iç hat uçuşuna geçmek için kapıda e-VoA vizesi (35$) alınarak 30 gün kalınabilir.'
    ],
    exemptions: [
      'Hava tarafı aktarma serbesttir.'
    ],
    baggageAndTransferTip: 'Cakarta Terminal 3 uluslararası uçuşların ana merkezidir.',
    officialUrl: 'https://evisa.imigrasi.go.id/'
  },
  'VN': {
    ruleTitle: 'Vietnam (Hanoi HAN, Ho Chi Minh SGN) Transit Kuralları',
    summary: 'Vietnam üzerinden aktarma.',
    maxHours: '24 saate kadar',
    statusType: 'airside_free',
    airsideTransitAllowed: true,
    cityExitAllowed: false,
    keyConditions: [
      '24 saat içinde onaylı devam bileti olan ve hava tarafı transit salonundan çıkmayan yolcular vizesiz aktarma yapabilir.',
      'Şehre çıkmak veya yerel iç hatta geçmek için e-Vize alınması zorunludur.'
    ],
    exemptions: [
      'Phu Quoc adasına doğrudan uluslararası aktarmalarda 30 gün vize muafiyeti mevcuttur.'
    ],
    baggageAndTransferTip: 'Bagajların son noktaya kadar etiketlendiğini başlangıç kontuarında teyit ediniz.',
    officialUrl: 'https://evisa.xuatnhapcanh.gov.vn'
  },
  'BR': {
    ruleTitle: 'Brezilya Sao Paulo Guarulhos (GRU) Transit & 90 Gün Vizesiz Giriş',
    summary: 'Güney Amerika aktarmalarının ana kavşağı; tam vize muafiyeti.',
    maxHours: '24 saat transit / 90 gün vizesiz giriş',
    statusType: 'entry_visa_free',
    airsideTransitAllowed: true,
    cityExitAllowed: true,
    keyConditions: [
      'Havalimanı transit salonunda vizesiz aktarma serbesttir.',
      'Türk vatandaşları Brezilya\'ya 90 güne kadar vizesiz girebildiğinden dileyenler pasaport kontrolünden geçerek şehre rahatça çıkabilir.'
    ],
    exemptions: [
      'Tam vize muafiyeti geçerlidir.'
    ],
    baggageAndTransferTip: 'GRU Terminal 3 uluslararası uçuşların modern merkezidir.',
    officialUrl: 'https://www.gov.br/mre'
  },
  'MX': {
    ruleTitle: 'Meksika (Mexico City MEX, Cancun CUN) Transit & Elektronik Onay',
    summary: 'Meksika havalimanlarında aktarma kuralları.',
    maxHours: '24 saate kadar',
    statusType: 'airside_free',
    airsideTransitAllowed: true,
    cityExitAllowed: false,
    keyConditions: [
      'Aynı havalimanında 24 saat içinde devam eden bağlantılarda hava tarafı transit alanından çıkılmadığı sürece transit vize gerekmez.',
      'Şehre çıkmak veya iç hat uçuşuna bağlanmak için Türk vatandaşlarının ücretsiz online SAE (Elektronik Seyahat Onayı) alması gerekir.',
      'Geçerli ABD, Kanada, Japonya, İngiltere veya Schengen vizesi olanlar SAE almadan doğrudan Meksika\'ya giriş yapabilir.'
    ],
    exemptions: [
      'ABD/Schengen vizesi olanlara koşulsuz giriş hakkı tanınır.'
    ],
    baggageAndTransferTip: 'Mexico City (MEX) havalimanında terminaller arası aerotrén ile geçiş yapılır.',
    officialUrl: 'https://www.gob.mx/inm'
  },
  'CO': {
    ruleTitle: 'Kolombiya Bogota El Dorado (BOG) Transit & 90 Gün Vizesiz Giriş',
    summary: 'Avianca ana merkezi; Güney Amerika aktarmaları.',
    maxHours: '24 saat transit / 90 gün vizesiz giriş',
    statusType: 'entry_visa_free',
    airsideTransitAllowed: true,
    cityExitAllowed: true,
    keyConditions: [
      '24 saate kadar havalimanı transit alanında vizesiz aktarma serbesttir.',
      'Türk pasaportu hamilleri Kolombiya\'ya 90 güne kadar vizesiz girebildiğinden dileyenler serbestçe şehre çıkabilir.'
    ],
    exemptions: [
      'Tam vize muafiyeti mevcuttur.'
    ],
    baggageAndTransferTip: 'Check-Mig online formu seyahatten önce doldurulmalıdır.',
    officialUrl: 'https://www.migracioncolombia.gov.co'
  },
  'ZA': {
    ruleTitle: 'Güney Afrika (Johannesburg JNB, Cape Town CPT) Transit & Vizesiz Giriş',
    summary: 'Afrika kıtasının güney aktarma kapısı.',
    maxHours: '24 saat transit / 30 gün vizesiz giriş',
    statusType: 'entry_visa_free',
    airsideTransitAllowed: true,
    cityExitAllowed: true,
    keyConditions: [
      'Havalimanı uluslararası transit alanında vizesiz aktarma serbesttir.',
      'Türk vatandaşları Güney Afrika\'ya 30 güne kadar vizesiz giriş yapabildiğinden pasaport kontrolünden geçerek şehre serbestçe çıkabilir.'
    ],
    exemptions: [
      'Vizesiz giriş mevcuttur.'
    ],
    baggageAndTransferTip: 'Komşu ülkelere (Namibya, Botsvana vb.) geçişlerde en popüler aktarma noktasıdır.',
    officialUrl: 'http://www.dha.gov.za'
  }
};

/**
 * Belirli bir ülke ve pasaport için akıllı ve dinamik Transit Kuralı hesaplar.
 * Dünyadaki TÜM 199 ülke için IATA Timatic ve uluslararası havacılık standartlarına uygun yanıt döner.
 */
function getLocalizedTransitRuleTitle(countryCode: string, countryName: string, lang: string, fallbackTr: string): string {
  if (lang === 'tr') return fallbackTr;
  const isDe = lang === 'de';
  const isEs = lang === 'es';
  const isRu = lang === 'ru';
  switch (countryCode) {
    case 'QA':
      return isEs
        ? `Catar Hamad (DOH) Programa de Tránsito y Escala de 24h`
        : isRu
        ? `Катар Хамад (DOH) 24-часовая транзитная программа и стоповер`
        : isDe
        ? `Katar Hamad (DOH) 24h Transit- & Stopover-Programm`
        : `Qatar Hamad (DOH) 24-Hour Transit & Stopover Scheme`;
    case 'SA':
      return isEs
        ? `Arabia Saudí Visado de Escala / Tránsito Gratuito (96 Horas)`
        : isRu
        ? `Саудовская Аравия Бесплатная транзитная виза (96 часов)`
        : isDe
        ? `Saudi-Arabien Kostenloses Stopover- & Transitvisum (96 Std.)`
        : `Saudi Arabia Free Stopover / Transit Visa (96 Hours)`;
    case 'SG':
      return isEs
        ? `Singapur Changi (SIN) Tránsito y Salida a la Ciudad sin Visado`
        : isRu
        ? `Сингапур Чанги (SIN) Транзит и безвизовый выход в город`
        : isDe
        ? `Singapur Changi (SIN) Transit & Visumfreier Stadtbesuch`
        : `Singapore Changi (SIN) Transit & Visa-Free City Layover`;
    case 'CN':
      return isEs
        ? `China Tránsito de 24h y Escala sin Visado de 72/144 Horas (TWOV)`
        : isRu
        ? `Китай 24-часовой транзит и 72/144-часовой безвизовый стоповер (TWOV)`
        : isDe
        ? `China 24h Transit & 144h Visumfreier Stadtbesuch (TWOV)`
        : `China 24-Hour Transit & 72/144-Hour Visa-Free Stopover (TWOV)`;
    case 'JP':
      return isEs
        ? `Japón Área de Tránsito Aeroportuario y Permiso Shore Pass`
        : isRu
        ? `Япония Транзитная зона аэропорта и разрешение Shore Pass`
        : isDe
        ? `Japan Flughafen-Transitzone & Shore Pass-Genehmigung`
        : `Japan Airport Transit Area & Shore Pass Layover Rules`;
    case 'AE':
      return isEs
        ? `EAU Dubái y Abu Dabi (DXB/AUH) Tránsito y Visado de 48-96h`
        : isRu
        ? `ОАЭ Дубай и Абу-Даби (DXB/AUH) Транзит и виза на 48-96 часов`
        : isDe
        ? `VAE Dubai & Abu Dhabi (DXB/AUH) Transit & 48-96h Visum`
        : `UAE Dubai & Abu Dhabi (DXB/AUH) Transit & 48-96h Stopover Visa`;
    case 'GB':
      return isEs
        ? `Reino Unido Londres Heathrow (LHR) - Obligatoriedad de Visado DATV`
        : isRu
        ? `Великобритания Лондон Хитроу (LHR) - Обязательная транзитная виза DATV`
        : isDe
        ? `Großbritannien London Heathrow (LHR) - DATV Transitvisum-Pflicht`
        : `United Kingdom London Heathrow (LHR) - DATV Transit Visa Requirement`;
    case 'US':
      return isEs
        ? `Estados Unidos (EE. UU.) - Visado de Tránsito C-1 Obligatorio`
        : isRu
        ? `США - Обязательная транзитная виза C-1`
        : isDe
        ? `Vereinigte Staaten (USA) - C-1 Transitvisum erforderlich`
        : `United States (USA) - Mandatory C-1 Transit Visa`;
    case 'CA':
      return isEs
        ? `Canadá (YVR/YYZ/YUL) - Visado de Tránsito y Normativa TWOV`
        : isRu
        ? `Канада (YVR/YYZ/YUL) - Транзитная виза и правила TWOV`
        : isDe
        ? `Kanada (YVR/YYZ/YUL) - Transitvisum & TWOV-Bestimmungen`
        : `Canada (YVR/YYZ/YUL) - Transit Visa & TWOV Regulations`;
    case 'DE':
      return isEs
        ? `Alemania Fráncfort y Múnich (FRA/MUC) - Normativa de Visado de Tránsito`
        : isRu
        ? `Германия Франкфурт и Мюнхен (FRA/MUC) - Правила транзитной визы (ATV)`
        : isDe
        ? `Deutschland Frankfurt & München (FRA/MUC) - Transitvisum-Regeln`
        : `Germany Frankfurt & Munich (FRA/MUC) - Airport Transit Visa Policy`;
    case 'FR':
      return isEs
        ? `Francia París CDG - Visado de Tránsito Aeroportuario (ATV)`
        : isRu
        ? `Франция Париж CDG - Аэропортовая транзитная виза (ATV)`
        : isDe
        ? `Frankreich Paris CDG - Flughafen-Transitvisum (ATV)`
        : `France Paris Charles de Gaulle (CDG) - Airport Transit Visa (ATV)`;
    case 'NL':
      return isEs
        ? `Países Bajos Ámsterdam Schiphol (AMS) - Política de Visado ATV`
        : isRu
        ? `Нидерланды Амстердам Схипхол (AMS) - Правила транзитной визы ATV`
        : isDe
        ? `Niederlande Amsterdam Schiphol (AMS) - ATV Transitvisum-Regeln`
        : `Netherlands Amsterdam Schiphol (AMS) - ATV Transit Visa Policy`;
    case 'CH':
      return isEs
        ? `Suiza Zúrich y Ginebra (ZRH/GVA) - Visado de Tránsito Aeroportuario`
        : isRu
        ? `Швейцария Цюрих и Женева (ZRH/GVA) - Аэропортовая транзитная виза`
        : isDe
        ? `Schweiz Zürich & Genf (ZRH/GVA) - Flughafen-Transitvisum`
        : `Switzerland Zurich & Geneva (ZRH/GVA) - Airport Transit Visa`;
    case 'AZ':
      return isEs
        ? `Azerbaiyán Bakú (GYD) - Tránsito Abierto con DNI`
        : isRu
        ? `Азербайджан Баку (GYD) - Свободный транзит по удостоверению личности`
        : isDe
        ? `Aserbaidschan Baku (GYD) - Freier Transit mit Personalausweis`
        : `Azerbaijan Baku Heydar Aliyev (GYD) - Free Transit with ID Card`;
    case 'GE':
      return isEs
        ? `Georgia Tiflis y Batumi - Tránsito Abierto con DNI Biométrico`
        : isRu
        ? `Грузия Тбилиси и Батуми - Свободный транзит по биометрическому ID`
        : isDe
        ? `Georgien Tiflis & Batumi - Freier Transit mit Personalausweis`
        : `Georgia Tbilisi & Batumi - Open Transit with Biometric ID Card`;
    case 'ME':
      return isEs
        ? `Montenegro Podgorica y Tivat - Conexión Directa y Tránsito`
        : isRu
        ? `Черногория Подгорица и Тиват - Прямой трансфер и транзит`
        : isDe
        ? `Montenegro Podgorica & Tivat - Direkter Transfer & Transit`
        : `Montenegro Podgorica & Tivat - Direct Connection & Transit`;
    case 'RS':
      return isEs
        ? `Serbia Belgrado Nikola Tesla (BEG) - Tránsito Abierto y Conexión`
        : isRu
        ? `Сербия Белград Никола Тесла (BEG) - Свободный транзит и пересадка`
        : isDe
        ? `Serbien Belgrad Nikola Tesla (BEG) - Freier Transit`
        : `Serbia Belgrade Nikola Tesla (BEG) - Open Transit & Transfer`;
    default:
      return isEs
        ? `Normas Internacionales de Tránsito Aeroportuario - ${countryName}`
        : isRu
        ? `Международные правила аэропортового транзита - ${countryName}`
        : isDe
        ? `Internationale Flughafen-Transitregeln - ${countryName}`
        : `International Airport Transit Rules - ${countryName}`;
  }
}

export function getCountryTransitRule(
  countryCode: string,
  passportCode: string = 'TR',
  lang: string = 'tr'
): CountryTransitRule {
  const isDe = lang === 'de';
  const isEn = lang === 'en';
  const isEs = lang === 'es';
  const isRu = lang === 'ru';
  const isIntl = isDe || isEn || isEs || isRu;
  const countryName = getCountryName(countryCode, lang);

  // 1. Kullanıcının pasaportunun bu ülkeye olan giriş rejimini kontrol et
  let visaRaw = 'v';
  const passportMap = D[passportCode];
  if (passportMap) {
    for (const [key, val] of Object.entries(passportMap)) {
      if (val.split(' ').includes(countryCode)) {
        visaRaw = key;
        break;
      }
    }
  }
  const cat = resolveVisaCategory(visaRaw);
  const idEligible = idEligibleSet(passportCode).has(countryCode);

  // Eğer ülke curated (özel hazırlanmış) listede varsa
  if (CURATED_TRANSIT_RULES[countryCode]) {
    const curated = CURATED_TRANSIT_RULES[countryCode];

    let adjustedStatus = curated.statusType;
    let adjustedCityExit = curated.cityExitAllowed;
    let badgeTitle = isEs
      ? 'Tránsito sin Visado en Zona Internacional'
      : isRu
      ? 'Безвизовый транзит в чистой зоне'
      : isDe
      ? 'Visumfreier Airside-Transit'
      : isEn
      ? 'Airside Visa-Free Transit'
      : 'Havalimanı İçi Vizesiz (Airside)';
    let badgeClass = 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/60';

    if (idEligible || cat === 'free') {
      adjustedStatus = 'entry_visa_free';
      adjustedCityExit = true;
      badgeTitle = idEligible
        ? (isEs ? 'Entrada con DNI y Libre Tránsito' : isRu ? 'Въезд по ID-карте и свободный транзит' : isDe ? 'Personalausweis-Einreise & Freier Transit' : isEn ? 'National ID Entry & Free Transit' : 'Kimlikle Giriş & Serbest Transit')
        : (isEs ? 'Entrada sin Visado y Libre Tránsito' : isRu ? 'Безвизовый въезд и свободный транзит' : isDe ? 'Visumfreie Einreise & Freier Transit' : isEn ? 'Visa-Free Entry & Free Transit' : 'Vizesiz Giriş & Serbest Transit');
      badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/60';
    } else if (curated.statusType === 'visa_required') {
      badgeTitle = isEs
        ? 'Visado de Tránsito Directo (DATV) Obligatorio'
        : isRu
        ? 'Требуется транзитная виза (DATV)'
        : isDe
        ? 'Direktes Airside-Transitvisum (DATV) erforderlich'
        : isEn
        ? 'Direct Airside Transit Visa (DATV) Required'
        : 'Transit Vizesi Zorunlu';
      badgeClass = 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900/60';
    } else if (curated.statusType === 'no_airside_zone') {
      badgeTitle = isEs
        ? 'Sin Zona de Tránsito Aislada (Visado Obligatorio)'
        : isRu
        ? 'Нет изолированной транзитной зоны (нужна виза)'
        : isDe
        ? 'Keine Transitzone (Einreisevisum Pflicht)'
        : isEn
        ? 'No Airside Transit Area (Visa Mandatory)'
        : 'Transit Alanı Yok (Vize Şart)';
      badgeClass = 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900/60';
    } else if (curated.statusType === 'special_hub_stopover') {
      badgeTitle = isEs
        ? 'Programa Especial de Escala y Tránsito en Hub'
        : isRu
        ? 'Специальная программа стоповера и транзита'
        : isDe
        ? 'Spezielles Stopover- & Transitprogramm'
        : isEn
        ? 'Special Hub Stopover & Transit Scheme'
        : 'Özel Stopover & Transit Kolaylığı';
      badgeClass = 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900/60';
    }

    if (isIntl) {
      return {
        countryCode,
        countryName,
        statusType: adjustedStatus,
        badgeTitle,
        badgeClass,
        maxHours: curated.maxHours
          .replace('saate kadar', isEs ? 'horas' : isRu ? 'часов' : isDe ? 'Stunden' : 'hours')
          .replace('saat', isEs ? 'horas' : isRu ? 'часов' : isDe ? 'Stunden' : 'hours')
          .replace('Gün', isEs ? 'Días' : isRu ? 'Дней' : isDe ? 'Tage' : 'Days')
          .replace('Aynı gün aktarma', isEs ? 'Conexión el mismo día' : isRu ? 'Пересадка в тот же день' : isDe ? 'Transfer am selben Tag' : 'Same-day connection'),
        airsideTransitAllowed: curated.airsideTransitAllowed,
        cityExitAllowed: adjustedCityExit,
        ruleTitle: getLocalizedTransitRuleTitle(countryCode, countryName, lang, curated.ruleTitle),
        summary: adjustedStatus === 'entry_visa_free'
          ? (isEs
              ? `Los titulares de pasaporte ${passportCode} disfrutan de entrada sin visado a ${countryName}. Tanto la transferencia en el aeropuerto como salir a la ciudad están totalmente autorizados.`
              : isRu
              ? `Владельцы паспорта ${passportCode} пользуются правом безвизового въезда в ${countryName}. Пересадка в аэропорту и выход в город разрешены без ограничений.`
              : isDe
              ? `Inhaber eines ${passportCode}-Reisepasses genießen visumfreie Einreise nach ${countryName}. Flughafentransfer und Stadtbesuch sind uneingeschränkt gestattet.`
              : `${passportCode} passport holders enjoy full visa-free entry to ${countryName}. Both airside transfer and entering the city are completely unrestricted.`)
          : curated.statusType === 'visa_required'
          ? (isEs
              ? `Los viajeros requieren obligatoriamente un visado de tránsito directo en aeropuerto (DATV) o visado consular antes de abordar vuelos de conexión en ${countryName}.`
              : isRu
              ? `Пассажирам строго требуется заблаговременная прямая аэропортовая транзитная виза (DATV) или консульская виза перед посадкой на стыковочные рейсы в ${countryName}.`
              : isDe
              ? `Reisende benötigen zwingend vor Abflug ein Transitvisum (DATV) für Umsteigeverbindungen in ${countryName}.`
              : `Turkish and designated passport holders strictly require an advance Direct Airside Transit Visa (DATV) or consular transit visa before boarding connecting flights in ${countryName}.`)
          : curated.statusType === 'no_airside_zone'
          ? (isEs
              ? `Los aeropuertos de ${countryName} no disponen de una zona internacional de tránsito aislada. Todos los pasajeros deben pasar el control de pasaportes, lo que requiere visado.`
              : isRu
              ? `Аэропорты в ${countryName} не имеют изолированной международной транзитной зоны. Все пассажиры должны пройти пограничный контроль, требующий визу.`
              : isDe
              ? `Flughäfen in ${countryName} verfügen über keine isolierte internationale Transitzone. Alle Umsteiger müssen die Passkontrolle passieren.`
              : `${countryName} airports have no isolated international transit zone. All connecting passengers must clear immigration and customs, requiring an entry visa or pre-authorization.`)
          : (isEs
              ? `Se permite el tránsito sin visado de entrada permaneciendo dentro de la zona de transferencia internacional y conectando dentro de ${curated.maxHours}.`
              : isRu
              ? `Безвизовый транзит разрешен при нахождении в международной трансферной зоне аэропорта и вылете стыковочным рейсом в течение ${curated.maxHours}.`
              : isDe
              ? `Visumfreier Transit im internationalen Transferbereich bei Weiterreise innerhalb von ${curated.maxHours} gestattet.`
              : `Airside transit without an entry visa is permitted when remaining within the international transfer area and connecting on a confirmed onward ticket within ${curated.maxHours}.`),
        keyConditions: isEs
          ? [
              'Permanecer estrictamente dentro del área internacional de tránsito (Airside) sin pasar el control de pasaportes.',
              'El vuelo de conexión debe estar confirmado en un billete único con equipaje facturado hasta el destino final.',
              'Debe presentarse pasaporte válido y permisos de entrada para el país de destino final al momento del embarque.'
            ]
          : isRu
          ? [
              'Находиться строго в международной чистой зоне аэропорта (Airside), не проходя паспортный контроль.',
              'Стыковочный рейс должен быть оформлен единым билетом, а багаж зарегистрирован до конечного пункта назначения.',
              'При посадке необходимо предъявить действующий паспорт и въездные документы в конечную страну назначения.'
            ]
          : isDe
          ? [
              'Ausschließlich im internationalen Transferbereich (Airside) aufhalten und nicht durch die Grenzkontrolle gehen.',
              'Der Weiterflug muss auf einem durchgehenden Ticket bestätigt sein und das Gepäck bis zum Zielort durchgecheckt sein.',
              'Gültiger Reisepass und Einreiseerlaubnis für das Zielland müssen beim Boarding vorgelegt werden.'
            ]
          : [
              'Must remain strictly within the international airside transit area and not pass through border passport control.',
              'Onward flight must be confirmed on a through-ticket with baggage checked through to the final destination.',
              'Valid passport and entry visas/permissions for the final country of destination must be presented upon boarding.'
            ],
        exemptions: isEs
          ? [
              'Los titulares de visados válidos o tarjetas de residencia expedidas por EE. UU., Canadá, Japón o el Espacio Schengen están exentos del visado de tránsito.',
              'Los titulares de pasaportes diplomáticos u oficiales están exentos según los acuerdos bilaterales vigentes.'
            ]
          : isRu
          ? [
              'Владельцы действующих виз или ВНЖ США, Канады, Японии или Шенгенской зоны освобождены от транзитных виз.',
              'Владельцы дипломатических и служебных паспортов освобождены в рамках двусторонних соглашений.'
            ]
          : isDe
          ? [
              'Inhaber gültiger Visa oder Aufenthaltstitel aus den USA, Kanada, Japan oder dem Schengen-Raum sind vom Transitvisum befreit.',
              'Inhaber von Diplomaten-, Dienst- oder Sonderpässen sind im Rahmen gegenseitiger Abkommen befreit.'
            ]
          : [
              'Holders of valid visas or permanent residence cards issued by the USA, Canada, Japan, or the Schengen Area are exempt from airport transit visas.',
              'Holders of diplomatic, official, or Turkish Special (Green) passports are exempt where reciprocal agreements exist.'
            ],
        baggageAndTransferTip: isEs
          ? 'AVISO IMPORTANTE: En vuelos con autotransfer (billetes separados) en aerolíneas de bajo coste, se debe salir de la zona de tránsito para recoger equipaje; en tales casos es legalmente obligatorio un visado de entrada.'
          : isRu
          ? 'ВАЖНОЕ ПРИМЕЧАНИЕ: При раздельных билетах (самостоятельная пересадка) лоукостерами необходимо выходить из транзитной зоны для получения багажа; в таких случаях въездная виза обязательна.'
          : isDe
          ? 'WICHTIGER HINWEIS: Bei getrennten Tickets (Self-Transfer) mit Billigfliegern muss die Transitzone zur Gepäckabholung verlassen werden; hierfür ist ein Einreisevisum erforderlich.'
          : 'CRITICAL NOTICE: On self-transfer (separate ticket) flights with budget airlines, passengers must exit airside to retrieve luggage and re-check bags; an entry visa is legally required in such cases.',
        officialUrl: curated.officialUrl
      };
    }

    return {
      countryCode,
      countryName,
      statusType: adjustedStatus,
      badgeTitle,
      badgeClass,
      maxHours: curated.maxHours,
      airsideTransitAllowed: curated.airsideTransitAllowed,
      cityExitAllowed: adjustedCityExit,
      ruleTitle: curated.ruleTitle,
      summary: curated.summary,
      keyConditions: curated.keyConditions,
      exemptions: curated.exemptions,
      baggageAndTransferTip: curated.baggageAndTransferTip,
      officialUrl: curated.officialUrl
    };
  }

  // 2. Schengen Bölgesi Kontrolü
  if (SCHENGEN_COUNTRIES.has(countryCode)) {
    const isFree = cat === 'free' || idEligible;
    return {
      countryCode,
      countryName,
      statusType: isFree ? 'entry_visa_free' : 'airside_free',
      badgeTitle: isFree
        ? (isEs ? 'Libre Circulación / Espacio Schengen' : isRu ? 'Свободное перемещение / Шенгенская зона' : isDe ? 'Freizügigkeit / Schengen-Raum' : isEn ? 'Freedom of Movement / Schengen Area' : 'Schengen İçi Serbest Dolaşım')
        : (isEs ? 'Tránsito Airside sin Visado (Exento de ATV)' : isRu ? 'Безвизовый транзит в чистой зоне (без ATV)' : isDe ? 'Airside visumfrei (ATV-befreit)' : isEn ? 'Airside Visa-Free (ATV Exempt)' : 'Havalimanı İçi Vizesiz (ATV Muaf)'),
      badgeClass: isFree
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/60'
        : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/60',
      maxHours: isEs ? 'Hasta 24 horas (Conexión el mismo día)' : isRu ? 'До 24 часов (Пересадка в тот же день)' : isDe ? 'Bis zu 24 Stunden (gleichtägiger Transfer)' : isEn ? 'Up to 24 hours (Same-day connection)' : '24 saate kadar (Aynı gün aktarma)',
      airsideTransitAllowed: true,
      cityExitAllowed: isFree,
      ruleTitle: isEs
        ? `Visado de Tránsito Aeroportuario Schengen (ATV / Categoría A) - ${countryName}`
        : isRu
        ? `Шенгенская аэропортовая транзитная виза (ATV / Категория A) - ${countryName}`
        : isDe
        ? `Schengen-Flughafentransitvisum (ATV / Kategorie A) - ${countryName}`
        : isEn
        ? `Schengen Airport Transit Visa (ATV / Category A) - ${countryName}`
        : `Schengen Havalimanı Transit Vizesi (ATV / Kategori A) - ${countryName}`,
      summary: isFree
        ? (isEs
            ? `Los titulares de pasaporte ${passportCode} disfrutan de acceso libre sin visado a ${countryName}; tanto la transferencia en aeropuerto como la salida a la ciudad están permitidas.`
            : isRu
            ? `Владельцы паспорта ${passportCode} пользуются полным безвизовым доступом в ${countryName}; как пересадка в аэропорту, так и выход в город разрешены.`
            : isDe
            ? `Inhaber eines ${passportCode}-Reisepasses genießen visumfreien Zugang zu ${countryName}; Flughafentransfer und Stadtbesuch sind uneingeschränkt gestattet.`
            : isEn
            ? `${passportCode} passport holders enjoy full visa-free access to this country; both international airport transfer and city exit are unrestricted.`
            : `${passportCode} pasaportu bu ülkeye vizesiz giriş hakkına sahip olduğundan hem havalimanı içi aktarma hem de şehre çıkış serbesttir.`)
        : (isEs
            ? `Al transitar por ${countryName} hacia un tercer país fuera de Schengen, por lo general no se requiere visado de tránsito aeroportuario (ATV) siempre que no se abandone la zona de tránsito.`
            : isRu
            ? `При транзите через ${countryName} в третью страну за пределами Шенгена транзитная виза (ATV) обычно не требуется при условии нахождения в транзитной зоне.`
            : isDe
            ? `Bei Transit über ${countryName} in ein Drittland außerhalb des Schengen-Raums ist kein Flughafentransitvisum (ATV) erforderlich, solange die Transitzone nicht verlassen wird.`
            : isEn
            ? `Turkish and standard non-EU passport holders do not require an Airport Transit Visa (ATV) when connecting via ${countryName} to a non-Schengen 3rd country, provided they do not leave the international transit area.`
            : `${countryName} havalimanında uluslararası transit alanından ayrılmadan Schengen dışı 3. bir ülkeye tek aktarma yaparken genel olarak transit vize aranmaz.`),
      keyConditions: isEs
        ? [
            'Permanecer estrictamente dentro del área internacional de tránsito (Airside) y no pasar el control fronterizo.',
            'ADVERTENCIA CRÍTICA: En conexiones entre DOS aeropuertos Schengen (p. ej., Estambul -> Fráncfort -> ' + countryName + ' -> Nueva York), el control de pasaportes se realiza en el primer aeropuerto Schengen. ¡Se requiere obligatoriamente un visado Schengen de Categoría C!',
            'El vuelo de conexión debe salir del mismo aeropuerto dentro de las 24 horas con billete único.'
          ]
        : isRu
        ? [
            'Не покидать международную чистую зону (Airside) и не проходить пограничный контроль.',
            'КРИТИЧЕСКОЕ ПРЕДУПРЕЖДЕНИЕ: При пересадке между ДВУМЯ аэропортами Шенгена (напр., Стамбул -> Франкфурт -> ' + countryName + ' -> Нью-Йорк) паспортный контроль проходит в первом аэропорту Шенгена. Требуется полноценная шенгенская виза категории C!',
            'Стыковочный рейс должен вылетать из того же аэропорта в течение 24 часов по единому билету.'
          ]
        : isDe
        ? [
            'Ausschließlich im internationalen Transferbereich (Airside) aufhalten und nicht durch die Grenzkontrolle gehen.',
            'KRITISCHER HINWEIS: Bei Umstieg zwischen ZWEI Schengen-Flughäfen (z. B. Istanbul -> Frankfurt -> ' + countryName + ' -> New York) erfolgt die Passkontrolle am ersten Schengen-Flughafen. Ein reguläres Schengen-Visum (Kategorie C) ist ZWINGEND erforderlich!',
            'Der Weiterflug muss vom selben Flughafen innerhalb von 24 Stunden auf einem Ticket erfolgen.'
          ]
        : isEn
        ? [
            'Must not leave the international transit area (Airside) and must not pass border control.',
            'CRITICAL WARNING: If connecting between TWO Schengen airports (e.g. Istanbul -> Frankfurt -> ' + countryName + ' -> New York), passport control occurs at the first Schengen airport. A standard Category C Schengen Visa is MANDATORY, not a transit visa!',
            'Connecting flight must depart from the same airport within 24 hours on a single through-ticket.'
          ]
        : [
            'Uluslararası transit bölgesinden (Airside) dışarı çıkılmamalı ve pasaport kontrolünden geçilmemelidir.',
            'KRİTİK UYARI: İki farklı Schengen ülkesi arasında iç hat uçuşu yapacaksanız (örn: İstanbul -> Frankfurt -> ' + countryName + ' -> New York), ilk Schengen havalimanında sınır kontrolünden geçilir; dolayısıyla transit vize değil, standart C Tipi Schengen Vizesi ZORUNLUDUR!',
            'Aynı havalimanında ve tercihen 24 saat içinde devam eden tek biletli dış hat uçuşu olmalıdır.'
          ],
      exemptions: isEs
        ? [
            'Los titulares de visados válidos o tarjetas de residencia de EE. UU., Canadá, Japón o el Espacio Schengen están exentos.',
            'Los titulares de un permiso de residencia válido de la UE / EEE o Suiza están exentos.',
            'Los titulares de pasaportes oficiales o especiales están exentos según los acuerdos aplicables.'
          ]
        : isRu
        ? [
            'Владельцы действующих виз или ВНЖ США, Канады, Японии или Шенгенской зоны освобождены от транзитных виз.',
            'Владельцы действующего ВНЖ ЕС / ЕЭЗ или Швейцарии освобождены.',
            'Владельцы специальных или служебных паспортов освобождены в соответствии с соглашениями.'
          ]
        : isDe
        ? [
            'Inhaber gültiger Visa oder Aufenthaltstitel aus den USA, Kanada, Japan oder dem Schengen-Raum sind vom Transitvisum befreit.',
            'Inhaber eines gültigen EU- / EWR- oder Schweizer Aufenthaltstitels sind befreit.',
            'Inhaber von Spezialpässen können visumfrei einreisen und unterliegen keinen Transitbeschränkungen.'
          ]
        : isEn
        ? [
            'Holders of valid Schengen, US, Canadian, or Japanese visas are exempt from all transit visas.',
            'Holders of a valid EU / EEA or Swiss residence permit are exempt.',
            'Holders of Turkish Special (Green) or Service (Grey) passports enter the Schengen Area visa-free for up to 90 days and face no transit restrictions.'
          ]
        : [
            'Geçerli Schengen, ABD, Kanada veya Japonya vizeniz varsa her türlü transit vizeden muafsınız.',
            'Geçerli bir AB / AEA veya İsviçre oturum izni olanlar muaftır.',
            'Türk Yeşil (hususi) veya Gri (hizmet) pasaport sahipleri Schengen bölgesine 90 güne kadar vizesiz girebildiğinden hiçbir transit kısıtlamasına tabi değildir.'
          ],
      baggageAndTransferTip: isEs
        ? 'En billetes separados con aerolíneas de bajo coste (como Ryanair o Wizz Air), se debe pasar el control de inmigración para recoger equipaje; en este caso es obligatorio un visado Schengen válido.'
        : isRu
        ? 'При перелетах раздельными билетами лоукостерами (Ryanair, Wizz Air и др.) необходимо проходить пограничный контроль для получения багажа; в этом случае действующая шенгенская виза обязательна.'
        : isDe
        ? 'Bei getrennten Tickets mit Billigfluggesellschaften (z. B. Ryanair, Wizz Air) muss zur Gepäckabholung die Passkontrolle passiert werden; hierfür ist ein gültiges Schengen-Visum erforderlich.'
        : isEn
        ? 'Traveling on separate tickets with low-cost carriers (e.g. Ryanair, Wizz Air) requires passing immigration to retrieve baggage; a valid Schengen visa is mandatory in this case.'
        : 'Low-cost (Wizz Air, Ryanair vb.) havayolları ile ayrı biletli seyahatlerde bagaj teslim almak için gümrükten geçilmesi gerekeceğinden geçerli Schengen vizesi şart olur.',
      officialUrl: 'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en'
    };
  }

  // 3. Pasaport zaten ülkeye vizesiz veya kimlikle girebiliyorsa
  if (cat === 'free' || idEligible) {
    return {
      countryCode,
      countryName,
      statusType: 'entry_visa_free',
      badgeTitle: idEligible
        ? (isEs ? 'Entrada con DNI y Libre Tránsito' : isRu ? 'Въезд по ID-карте и свободный транзит' : isDe ? 'Personalausweis & Freier Transit' : isEn ? 'National ID Entry & Free Transit' : 'Kimlikle Giriş & Serbest Transit')
        : (isEs ? 'Entrada sin Visado y Libre Tránsito' : isRu ? 'Безвизовый въезд и свободный транзит' : isDe ? 'Visumfreie Einreise & Freier Transit' : isEn ? 'Visa-Free Entry & Free Transit' : 'Vizesiz Giriş & Serbest Transit'),
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/60',
      maxHours: idEligible
        ? (isEs ? 'Ilimitado / Larga estancia' : isRu ? 'Бессрочно / Долгосрочно' : isDe ? 'Unbegrenzt / Langzeitaufenthalt' : isEn ? 'Unrestricted / Long stay' : 'Süresiz / Uzun süreli')
        : /^\d+$/.test(visaRaw)
        ? (isEs ? `${visaRaw} días sin visado` : isRu ? `${visaRaw} дн. без визы` : isDe ? `${visaRaw} Tage visumfrei` : isEn ? `${visaRaw} days visa-free` : `${visaRaw} gün serbest giriş`)
        : (isEs ? 'Hasta 90 días' : isRu ? 'До 90 дней' : isDe ? 'Bis zu 90 Tage' : isEn ? 'Up to 90 days' : '90 güne kadar'),
      airsideTransitAllowed: true,
      cityExitAllowed: true,
      ruleTitle: isEs
        ? `Entrada sin Visado y Tránsito Abierto - ${countryName}`
        : isRu
        ? `Безвизовый въезд и свободный транзит - ${countryName}`
        : isDe
        ? `Visumfreie Einreise und offener Transit - ${countryName}`
        : isEn
        ? `Visa-Free Entry and Open Transit - ${countryName}`
        : `Vizesiz Giriş ve Transit Serbestisi - ${countryName}`,
      summary: isEs
        ? `Los titulares de pasaporte ${passportCode} tienen derecho a entrar en ${countryName} sin visado ${idEligible ? 'o con documento nacional de identidad' : ''}. Tanto el transbordo dentro del aeropuerto como salir a recorrer la ciudad están completamente permitidos.`
        : isRu
        ? `Владельцы паспорта ${passportCode} имеют право безвизового въезда в ${countryName} ${idEligible ? 'или по удостоверению личности' : ''}. Во время пересадки можно как оставаться в аэропорту, так и свободно выходить в город.`
        : isDe
        ? `Inhaber eines ${passportCode}-Reisepasses können nach ${countryName} visumfrei ${idEligible ? 'oder mit Personalausweis ' : ''}einreisen. Sowohl Flughafentransfer als auch Stadtbesuch während des Zwischenstopps sind uneingeschränkt gestattet.`
        : isEn
        ? `${passportCode} passport holders are entitled to enter ${countryName} visa-free ${idEligible ? 'or with a national biometric ID card' : ''}. Transferring airside or exploring the city during layovers is completely unrestricted.`
        : `${passportCode} pasaportu hamilleri ${countryName} sınırlarına vizesiz ${idEligible ? 'veya kimlikle ' : ''}giriş hakkına sahiptir. Dolayısıyla aktarma esnasında hem havalimanı içi transfer hem de dışarı çıkıp şehri gezmek tamamen serbesttir.`,
      keyConditions: isEs
        ? [
            'Puede salir libremente del aeropuerto durante la escala, alojarse en hoteles o visitar el centro urbano.',
            'El pasaporte debe ser válido por al menos 6 meses a partir de la fecha de viaje.',
            'Tenga a mano el billete de vuelo de conexión y la reserva de alojamiento en el control de fronteras.'
          ]
        : isRu
        ? [
            'Вы можете свободно выходить из аэропорта во время пересадки, останавливаться в отелях или осматривать город.',
            'Паспорт должен быть действителен не менее 6 месяцев с даты поездки.',
            'Держите при себе билет на следующий рейс и подтверждение бронирования жилья на пограничном контроле.'
          ]
        : isDe
        ? [
            'Sie können den Flughafen während des Zwischenstopps frei verlassen, Hotels nutzen oder die Stadt erkunden.',
            'Der Reisepass sollte ab Reisedatum mindestens 6 Monate gültig sein.',
            'Weiterreiseticket und Unterkunftsdaten bei der Grenzkontrolle bereithalten.'
          ]
        : isEn
        ? [
            'You may freely leave the airport, stay in hotels, or visit city centers throughout your layover.',
            'Passport should be valid for at least 6 months from the date of travel.',
            'Keep your onward flight ticket and accommodation details accessible at border control.'
          ]
        : [
            'Aktarma süresi boyunca dilediğiniz gibi havalimanından ayrılabilir, otele gidebilir veya şehri keşfedebilirsiniz.',
            'Pasaportunuzun seyahat tarihinden itibaren en az 6 ay geçerli olması önerilir.',
            'Devam biletinizi ve konaklama rezervasyonunuzu sınır kapısında hazır bulundurunuz.'
          ],
      exemptions: isEs
        ? ['Se aplican derechos directos de entrada sin visado; no se requiere permiso de tránsito ni tasa consular.']
        : isRu
        ? ['Действует право прямого безвизового въезда; никаких транзитных разрешений или консульских сборов не требуется.']
        : isDe
        ? ['Direkte visumfreie Einreiseberechtigung; keine Transitgenehmigung oder Gebühr erforderlich.']
        : isEn
        ? ['Direct visa-free entry rights apply; no transit permit or consular fee is required.']
        : ['Ülkeye doğrudan vizesiz giriş hakkı mevcuttur; hiçbir transit vizesi veya ek izin gerekmez.'],
      baggageAndTransferTip: isEs
        ? 'En vuelos con billetes separados (autotransfer), puede recoger su equipaje en la recogida de maletas y volver a facturarlo sin inconvenientes legales.'
        : isRu
        ? 'При перелетах по раздельным билетам (самостоятельная пересадка) вы можете получить багаж на выдаче и зарегистрировать его снова без ограничений.'
        : isDe
        ? 'Bei separaten Tickets (Self-Transfer) können Sie Ihr Gepäck an der Gepäckausgabe abholen und am Abflugschalter neu einchecken.'
        : isEn
        ? 'On separate-ticket (self-transfer) flights, you can legally collect your luggage at baggage claim and re-check it at departures.'
        : 'Ayrı biletli (self-transfer) uçuşlarda bagajınızı teslim alıp yeniden check-in kontuarına vermenizde yasal bir engel bulunmaz.',
      officialUrl: undefined
    };
  }

  // 4. E-vize, Kapıda vize veya Konsolosluk vizesi gerektiren diğer tüm dünya ülkeleri
  // IATA Timatic Evrensel Standart Transit Kuralı
  const requiresVisaForEntry = cat === 'visa' || cat === 'evisa' || cat === 'voa' || cat === 'eta';

  return {
    countryCode,
    countryName,
    statusType: 'airside_free',
    badgeTitle: isEs
      ? 'Tránsito sin Visado en Zona Internacional'
      : isRu
      ? 'Безвизовый транзит в чистой зоне'
      : isDe
      ? 'Visumfreier Airside-Transit'
      : isEn
      ? 'Airside Visa-Free Transit'
      : 'Havalimanı İçi Vizesiz (Airside)',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/60',
    maxHours: isEs ? 'De 12 a 24 horas' : isRu ? 'От 12 до 24 часов' : isDe ? '12 - 24 Stunden' : isEn ? '12 - 24 hours' : '12 - 24 saat arası',
    airsideTransitAllowed: true,
    cityExitAllowed: false,
    ruleTitle: isEs
      ? `Normas Internacionales de Tránsito Aeroportuario (TWOV) - ${countryName}`
      : isRu
      ? `Международные правила транзита через аэропорт (TWOV) - ${countryName}`
      : isDe
      ? `Internationale Flughafentransit-Regeln (TWOV) - ${countryName}`
      : isEn
      ? `International Airport Transit Rules (TWOV) - ${countryName}`
      : `Uluslararası Havalimanı Transit Kuralları (TWOV) - ${countryName}`,
    summary: isEs
      ? `Para escalas en ${countryName}, por lo general no se requiere visado de tránsito aeroportuario siempre que los viajeros permanezcan en la zona internacional y continúen viaje dentro de las 24 horas.`
      : isRu
      ? `При стыковках через ${countryName} транзитная виза обычно не требуется при условии, что пассажиры остаются в международной транзитной зоне и вылетают в течение 24 часов.`
      : isDe
      ? `Für Zwischenstopps in ${countryName} ist in der Regel kein Transitvisum erforderlich, sofern Reisende im internationalen Transitbereich verbleiben und innerhalb von 24 Stunden weiterfliegen.`
      : isEn
      ? `For layovers connecting in ${countryName}, an airport transit visa is generally not required provided passengers remain strictly within the international transit area and depart on a confirmed onward flight within 24 hours.`
      : `${countryName} üzerinden aktarmalarda, uluslararası transit alanından çıkmamak, aynı havalimanında 24 saat içinde 3. bir ülkeye devam etmek ve bagajın doğrudan aktarılmış olması şartıyla standart olarak transit vize aranmaz.`,
    keyConditions: isEs
      ? [
          'Permanecer estrictamente en la sala internacional de tránsito sin pasar por control migratorio.',
          'Los vuelos de llegada y salida deben estar idealmente bajo un mismo código de reserva (PNR).',
          'Debe presentarse billete válido y documentación de visado para el tercer país de destino.',
          `Salir del aeropuerto o ingresar a la ciudad requiere obligatoriamente un ${requiresVisaForEntry ? 'visado de entrada' : 'permiso oficial'}.`
        ]
      : isRu
      ? [
          'Находиться исключительно в международном зале вылета/транзита без прохождения иммиграционного контроля.',
          'Рейсы прибытия и вылета должны быть оформлены под единым кодом бронирования (PNR).',
          'Необходимо иметь при себе действующий билет и визовые документы для третьей страны назначения.',
          `Выход из аэропорта в город требует ${requiresVisaForEntry ? 'оформления въездной визы' : 'официального разрешения'}.`
        ]
      : isDe
      ? [
          'Ausschließlich im internationalen Transferbereich (Airside) aufhalten und nicht durch die Grenzkontrolle gehen.',
          'Ankunfts- und Abflüge sollten idealerweise unter einem Buchungscode (PNR) gebucht sein.',
          'Gültiges Ticket und Einreisedokumente für das Drittland müssen vorgelegt werden.',
          `Das Verlassen des Flughafens erfordert zwingend ein ${requiresVisaForEntry ? 'Einreisevisum' : 'offizielle Genehmigung'}.`
        ]
      : isEn
      ? [
          'Must strictly stay in the international airside transit lounge without passing immigration.',
          'Arrival and departure flights should ideally be booked under a single PNR booking code.',
          'Valid ticket and visa documentation for the 3rd country destination must be presented.',
          `Leaving the airport or entering the city strictly requires an ${requiresVisaForEntry ? 'entry visa' : 'official entry permit'}.`
        ]
      : [
          'Uluslararası aktarma bölgesinden (Airside) kesinlikle ayrılmamalı ve pasaport kontrolünden geçilmemelidir.',
          'Varış ve kalkış uçuşlarının aynı havalimanından ve tek rezervasyon (PNR) altında olması tavsiye edilir.',
          'Devam edilecek 3. ülkeye ait geçerli bilet ve gerekli vize/belgeler hazır bulunmalıdır.',
          `Havalimanını terk etmek veya şehre çıkmak için ${requiresVisaForEntry ? 'ülkeye giriş vizesi alınması' : 'resmi izin'} zorunludur.`
        ],
    exemptions: isEs
      ? [
          'El tránsito sin visado (TWOV) se aplica en aeropuertos internacionales con zonas de tránsito 24h dedicadas.',
          'Algunos países conceden pases temporales de emergencia ante la presentación de visados válidos de EE. UU., Reino Unido o Schengen.'
        ]
      : isRu
      ? [
          'Транзит без визы (TWOV) действует в международных аэропортах с круглосуточной транзитной зоной.',
          'Некоторые страны выдают экстренные временные пропуска при наличии действующих виз США, Великобритании или Шенгена.'
        ]
      : isDe
      ? [
          'Transit Without Visa (TWOV) gilt an internationalen Flughäfen mit 24h-Transitzone.',
          'Einige Länder erteilen Notfall-Shore-Pässe bei Vorlage gültiger USA-, UK- oder Schengen-Visa.'
        ]
      : isEn
      ? [
          'Transit without visa (TWOV) applies at international airports with dedicated 24-hour airside transit zones.',
          'Some destinations grant emergency shore passes to travelers with valid US, UK, or Schengen visas.'
        ]
      : [
          'Uluslararası transit salonu bulunan havalimanlarında hava tarafında kalındığı sürece transit vizeden muaf tutulur.',
          'Bazı ülkelerde geçerli ABD, İngiltere veya Schengen vizesine sahip olan yolculara acil durumda kısa süreli geçici çıkış izni verilebilir.'
        ],
    baggageAndTransferTip: isEs
      ? 'ATENCIÓN: En itinerarios con billetes separados (autotransfer), debe pasar el control de pasaportes para recoger equipaje. En este caso el visado de entrada es obligatorio; asegúrese de que sus maletas estén etiquetadas hasta el destino final.'
      : isRu
      ? 'ВНИМАНИЕ: При перелете по раздельным билетам (самостоятельная пересадка) вы должны пройти паспортный контроль для получения багажа. В этом случае въездная виза обязательна; убедитесь, что багаж оформлен до конечного пункта при первой регистрации.'
      : isDe
      ? 'ACHTUNG: Bei separaten Tickets (Self-Transfer) müssen Sie die Passkontrolle passieren, um das Gepäck abzuholen. In diesem Fall ist ein Einreisevisum erforderlich.'
      : isEn
      ? 'ATTENTION: On self-transfer (separate ticket) itineraries, you must pass passport control to retrieve baggage. In this case an entry visa is mandatory; ensure your bags are tagged through to the final destination upon initial check-in.'
      : 'DİKKAT: Ayrı ayrı bilet alınmışsa (self-transfer), bagajınızı almak için pasaport kontrolünden geçmeniz gerekecektir. Bu durumda ülkeye giriş vizesi aranır; bagajınızın ilk biniş noktasında nihai varış noktasına kadar etiketlendiğinden emin olunuz.',
    officialUrl: undefined
  };
}
