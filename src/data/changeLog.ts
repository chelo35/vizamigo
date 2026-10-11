/**
 * Vize Politikası Değişiklikleri, Bildirimler ve Mevzuat Takip Kaydı
 * Çok Dilli (TR / EN) Resmi kaynaklarla doğrulanmış ve yaklaşan kural değişiklikleri.
 */

export interface VisaChangeAlert {
  id: string;
  countryCode: string;
  countryName: string;
  effectiveDate: string;
  category: 'critical' | 'info' | 'positive';
  title: string;
  summary: string;
  officialSource: string;
  officialUrl: string;
  verifiedDate: string;
  impactPassport: string[];
  // Localization properties
  countryNameEn?: string;
  countryNameDe?: string;
  effectiveDateEn?: string;
  effectiveDateDe?: string;
  titleEn?: string;
  titleDe?: string;
  summaryEn?: string;
  summaryDe?: string;
  officialSourceEn?: string;
  officialSourceDe?: string;
}

export const VISA_CHANGE_ALERTS: VisaChangeAlert[] = [
  {
    id: 'alert-me-2026',
    countryCode: 'ME',
    countryName: 'Karadağ',
    countryNameEn: 'Montenegro',
    countryNameDe: 'Montenegro',
    effectiveDate: '1 Kasım 2026',
    effectiveDateEn: 'November 1, 2026',
    effectiveDateDe: '1. November 2026',
    category: 'critical',
    title: 'Türk Vatandaşlarına Vize Zorunluluğu Başlıyor',
    titleEn: 'Visa Requirement Starting for Turkish Citizens',
    titleDe: 'Visumpflicht für türkische Staatsbürger tritt in Kraft',
    summary: 'Karadağ hükümeti kararıyla 31 Ekim 2026 tarihine kadar 30 günlük vizesiz rejim devam etmektedir. 1 Kasım 2026 tarihinden itibaren Türk umuma mahsus (bordo) pasaport sahipleri için önceden vize zorunlu hale gelecektir. Başvuruların VFS Global üzerinden alınması planlanmaktadır.',
    summaryEn: 'Under the Montenegro government resolution, the 30-day visa-free regime remains valid through October 31, 2026. Effective November 1, 2026, standard Turkish ordinary passport holders will require an advance consular visa. Applications are planned to be handled via VFS Global.',
    summaryDe: 'Gemäß Beschluss der montenegrinischen Regierung gilt das 30-tägige visumfreie Regime bis zum 31. Oktober 2026. Ab dem 1. November 2026 benötigen Inhaber regulärer türkischer Reisepässe ein Visum vor Reiseantritt. Die Antragsstellung soll über VFS Global abgewickelt werden.',
    officialSource: 'Karadağ Hükümeti (gov.me) ve Dışişleri Bakanlığı',
    officialSourceEn: 'Government of Montenegro (gov.me) & Ministry of Foreign Affairs',
    officialSourceDe: 'Regierung von Montenegro (gov.me) & Außenministerium',
    officialUrl: 'https://www.gov.me',
    verifiedDate: 'Ekim 2026',
    impactPassport: ['TR']
  },
  {
    id: 'alert-th-2026',
    countryCode: 'TH',
    countryName: 'Tayland',
    countryNameEn: 'Thailand',
    countryNameDe: 'Thailand',
    effectiveDate: '15 Eylül 2026',
    effectiveDateEn: 'September 15, 2026',
    effectiveDateDe: '15. September 2026',
    category: 'info',
    title: 'Vizesiz Kalış Süresi 30 Gün Olarak Güncellendi',
    titleEn: 'Visa-Free Stay Confirmed at 30 Days',
    titleDe: 'Visumfreier Aufenthalt auf 30 Tage bestätigt',
    summary: 'Tayland Kraliyeti yeni sınır düzenlemesiyle Türk vatandaşlarına tanınan vizesiz kalış süresi 30 gün olarak teyit edilmiştir. Ülkeye girişten önce resmi TDAC (Thailand Digital Arrival Card) çevrimiçi varış kartının doldurulması zorunludur.',
    summaryEn: 'Under the Kingdom of Thailand revised border regulations, the visa-free tourist stay for Turkish nationals is confirmed at 30 days. All arriving travelers must complete the mandatory official TDAC (Thailand Digital Arrival Card) online prior to arrival.',
    summaryDe: 'Gemäß den überarbeiteten Einreisebestimmungen Thailands wird der visumfreie touristische Aufenthalt für türkische Staatsbürger auf 30 Tage festgelegt. Vor der Einreise muss zwingend die digitale Ankunftskarte TDAC (Thailand Digital Arrival Card) ausgefüllt werden.',
    officialSource: 'Tayland Göç İdaresi Bürosu (immigration.go.th)',
    officialSourceEn: 'Royal Thai Immigration Bureau (immigration.go.th)',
    officialSourceDe: 'Königliche thailändische Einwanderungsbehörde (immigration.go.th)',
    officialUrl: 'https://tdac.immigration.go.th',
    verifiedDate: 'Ekim 2026',
    impactPassport: ['TR', 'ALL']
  },
  {
    id: 'alert-tj-2024',
    countryCode: 'TJ',
    countryName: 'Tacikistan',
    countryNameEn: 'Tajikistan',
    countryNameDe: 'Tadschikistan',
    effectiveDate: '20 Nisan 2024 (Devam Ediyor)',
    effectiveDateEn: 'April 20, 2024 (Ongoing)',
    effectiveDateDe: '20. April 2024 (Fortlaufend)',
    category: 'critical',
    title: 'Mütekabiliyet Kapsamında Vize Zorunluluğu',
    titleEn: 'Reciprocal Visa Requirement Enacted',
    titleDe: 'Gegenseitige Visumpflicht eingeführt',
    summary: 'Tacikistan, Türk umuma mahsus pasaport sahipleri için vizesiz giriş hakkını sonlandırmıştır. Seyahat öncesinde Tacikistan e-vize portalı veya büyükelçilikler üzerinden vize alınması şarttır.',
    summaryEn: 'Tajikistan terminated visa-free entry privileges for Turkish ordinary passport holders under reciprocity rules. An advance eVisa via the official Tajikistan portal or consular mission is mandatory prior to travel.',
    summaryDe: 'Tadschikistan hat die visumfreie Einreise für Inhaber regulärer türkischer Reisepässe im Rahmen der Gegenseitigkeit beendet. Vor Reiseantritt muss ein e-Visum über das offizielle Portal oder eine Botschaft beantragt werden.',
    officialSource: 'Tacikistan Dışişleri Bakanlığı',
    officialSourceEn: 'Ministry of Foreign Affairs of Tajikistan',
    officialSourceDe: 'Außenministerium Tadschikistans',
    officialUrl: 'https://mfa.tj',
    verifiedDate: 'Ekim 2026',
    impactPassport: ['TR']
  },
  {
    id: 'alert-eg-2023',
    countryCode: 'EG',
    countryName: 'Mısır',
    countryNameEn: 'Egypt',
    countryNameDe: 'Ägypten',
    effectiveDate: '2023 - 2026 (Aktif)',
    effectiveDateEn: '2023 - 2026 (Active)',
    effectiveDateDe: '2023 - 2026 (Aktiv)',
    category: 'positive',
    title: 'Kapıda Vize Kolaylığı Devam Ediyor',
    titleEn: 'Visa on Arrival Facility Continues',
    titleDe: 'Visum bei Ankunft weiterhin verfügbar',
    summary: '20 yaş altı ve 45 yaş üstü sınırlaması kaldırılmış olup; Türk vatandaşları Kahire, Şarm El Şeyh, Hurgada dahil tüm uluslararası havalimanlarında 25 USD harç ödeyerek 30 günlük turistik kapıda vize (VOA) alabilmektedir.',
    summaryEn: 'Age restrictions (previously under 20 / over 45) have been abolished; Turkish citizens can obtain a 30-day tourist Visa on Arrival (VOA) for a $25 fee across all international airports including Cairo, Sharm El Sheikh, and Hurghada.',
    summaryDe: 'Altersbeschränkungen wurden aufgehoben; türkische Staatsbürger können an allen internationalen Flughäfen (Kairo, Scharm El-Scheich, Hurghada) gegen eine Gebühr von 25 USD ein 30-tägiges Touristenvisum bei Ankunft (VOA) erhalten.',
    officialSource: 'Mısır Turizm ve Tarihi Eserler Bakanlığı',
    officialSourceEn: 'Egyptian Ministry of Tourism and Antiquities',
    officialSourceDe: 'Ägyptisches Ministerium für Tourismus und Altertümer',
    officialUrl: 'https://visa2egypt.gov.eg',
    verifiedDate: 'Ekim 2026',
    impactPassport: ['TR']
  },
  {
    id: 'alert-sa-2024',
    countryCode: 'SA',
    countryName: 'Suudi Arabistan',
    countryNameEn: 'Saudi Arabia',
    countryNameDe: 'Saudi-Arabien',
    effectiveDate: 'Aktif',
    effectiveDateEn: 'Active',
    effectiveDateDe: 'Aktiv',
    category: 'positive',
    title: 'Türk Vatandaşlarına Çevrimiçi E-Vize & Kapıda Vize',
    titleEn: 'Instant Online eVisa & Visa on Arrival for Turkish Citizens',
    titleDe: 'Sofortiges Online-eVisa & Visum bei Ankunft für türkische Staatsbürger',
    summary: 'Suudi Arabistan turizm açılımı kapsamında Türk vatandaşları MOFA KSA platformu üzerinden anında çok girişli 1 yıllık (kalış başına 90 gün) e-vize alabilmekte ya da havalimanı kiosklarında kapıda vize yaptırabilmektedir.',
    summaryEn: 'Under Saudi Arabia tourism reforms, Turkish passport holders can obtain an instant 1-year multiple-entry eVisa (up to 90 days per stay) via MOFA KSA or via airport automated kiosks upon arrival.',
    summaryDe: 'Im Rahmen der saudi-arabischen Tourismusreformen können türkische Staatsbürger über MOFA KSA ein sofortiges 1-Jahres-Mehrfachvisum (bis zu 90 Tage pro Aufenthalt) oder ein Visum an Flughafen-Kiosken bei Ankunft erhalten.',
    officialSource: 'Suudi Arabistan Turizm Otoritesi (visitsaudi.com)',
    officialSourceEn: 'Saudi Tourism Authority (visitsaudi.com)',
    officialSourceDe: 'Saudi Tourism Authority (visitsaudi.com)',
    officialUrl: 'https://visa.visitsaudi.com',
    verifiedDate: 'Ekim 2026',
    impactPassport: ['TR']
  },
  {
    id: 'alert-ge-2021',
    countryCode: 'GE',
    countryName: 'Gürcistan',
    countryNameEn: 'Georgia',
    countryNameDe: 'Georgien',
    effectiveDate: 'Süresiz Aktif',
    effectiveDateEn: 'Permanently Active',
    effectiveDateDe: 'Dauerhaft aktiv',
    category: 'positive',
    title: '365 Gün Kesintisiz Vizesiz Kalış & Çipli Kimlikle Giriş',
    titleEn: '365-Day Continuous Visa-Free Stay & National ID Card Entry',
    titleDe: '365 Tage ununterbrochener visumfreier Aufenthalt & Einreise mit Personalausweis',
    summary: 'Türk vatandaşları Gürcistan’a pasaporta ihtiyaç duymadan yeni tip çipli T.C. kimlik kartıyla giriş yapabilmekte ve 1 tam yıl (365 gün) boyunca kesintisiz vizesiz kalabilmektedir.',
    summaryEn: 'Turkish citizens can enter Georgia without a passport using their biometric National ID card, and enjoy a full 365 days (1 continuous year) of visa-free residence.',
    summaryDe: 'Türkische Staatsbürger können ohne Reisepass mit dem biometrischen Personalausweis nach Georgien einreisen und volle 365 Tage (1 durchgehendes Jahr) visumfrei bleiben.',
    officialSource: 'Gürcistan Dışişleri Bakanlığı (geoconsul.gov.ge)',
    officialSourceEn: 'Ministry of Foreign Affairs of Georgia (geoconsul.gov.ge)',
    officialSourceDe: 'Außenministerium von Georgien (geoconsul.gov.ge)',
    officialUrl: 'https://www.geoconsul.gov.ge',
    verifiedDate: 'Ekim 2026',
    impactPassport: ['TR']
  },
  {
    id: 'alert-az-2021',
    countryCode: 'AZ',
    countryName: 'Azerbaycan',
    countryNameEn: 'Azerbaijan',
    countryNameDe: 'Aserbaidschan',
    effectiveDate: 'Süresiz Aktif',
    effectiveDateEn: 'Permanently Active',
    effectiveDateDe: 'Dauerhaft aktiv',
    category: 'positive',
    title: 'Çipli Kimlik Kartı ile 90 Güne Kadar Doğrudan Giriş',
    titleEn: 'Direct Entry with Biometric ID Card Up to 90 Days',
    titleDe: 'Direkte Einreise mit biometrischem Personalausweis bis zu 90 Tage',
    summary: 'Türkiye ile Azerbaycan arasındaki protokol uyarınca iki ülke vatandaşları doğrudan hava veya kara yoluyla pasaportsuz, sadece çipli kimlik kartıyla 90 güne kadar seyahat edebilmektedir.',
    summaryEn: 'Under the bilateral protocol between Turkey and Azerbaijan, citizens can travel visa-free using exclusively their biometric National ID card on direct travel for stays up to 90 days.',
    summaryDe: 'Gemäß dem bilateralen Abkommen zwischen der Türkei und Aserbaidschan können Bürger bei direkter Reise ohne Pass nur mit dem biometrischen Personalausweis bis zu 90 Tage visumfrei einreisen.',
    officialSource: 'Azerbaycan Dışişleri Bakanlığı (mfa.gov.az)',
    officialSourceEn: 'Ministry of Foreign Affairs of Azerbaijan (mfa.gov.az)',
    officialSourceDe: 'Außenministerium von Aserbaidschan (mfa.gov.az)',
    officialUrl: 'https://mfa.gov.az',
    verifiedDate: 'Ekim 2026',
    impactPassport: ['TR']
  },
  {
    id: 'alert-kr-2023',
    countryCode: 'KR',
    countryName: 'Güney Kore',
    countryNameEn: 'South Korea',
    countryNameDe: 'Südkorea',
    effectiveDate: 'Aktif',
    effectiveDateEn: 'Active',
    effectiveDateDe: 'Aktiv',
    category: 'info',
    title: 'K-ETA Zorunluluğu Hatırlatması',
    titleEn: 'Mandatory K-ETA Requirement Reminder',
    titleDe: 'Erinnerung an verpflichtende K-ETA-Genehmigung',
    summary: 'Güney Kore Türk vatandaşlarına 90 gün vizesiz rejim uygulamakta ancak uçuştan en az 72 saat önce K-ETA elektronik izni alınmasını zorunlu tutmaktadır. Türkiye, geçici K-ETA muafiyeti tanınan ülkeler arasında yer almamaktadır.',
    summaryEn: 'South Korea grants 90 days visa-free stay to Turkish citizens but strictly requires an approved K-ETA (Korea Electronic Travel Authorization) at least 72 hours before flight departure. Turkey is not on the temporary K-ETA exemption list.',
    summaryDe: 'Südkorea gewährt türkischen Staatsbürgern 90 Tage visumfreien Aufenthalt, verlangt jedoch zwingend eine K-ETA (Korea Electronic Travel Authorization) mindestens 72 Stunden vor Abflug. Die Türkei ist nicht von der K-ETA befreit.',
    officialSource: 'Kore Göç İdaresi (k-eta.go.kr)',
    officialSourceEn: 'Korea Immigration Service (k-eta.go.kr)',
    officialSourceDe: 'Koreanische Einwanderungsbehörde (k-eta.go.kr)',
    officialUrl: 'https://www.k-eta.go.kr',
    verifiedDate: 'Ekim 2026',
    impactPassport: ['TR']
  }
];
