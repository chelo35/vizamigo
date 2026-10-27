/**
 * Pasaport kapak görünümleri: renk + kapaktaki yazı (ülkenin kendi dilinde).
 * Arma kullanılmaz; tüm kapaklarda aynı genel dünya amblemi çizilir.
 * Listede olmayan ülkeler: lacivert kapak + İngilizce ülke adı ve "PASSPORT".
 */

export type CoverTone = 'burgundy' | 'navy' | 'green' | 'black' | 'red' | 'blue';

export const COVER_COLORS: Record<CoverTone, { from: string; to: string; ink: string }> = {
  burgundy: { from: '#8E2638', to: '#5A1420', ink: '#F2D28B' },
  navy: { from: '#22396B', to: '#132447', ink: '#E9D08C' },
  blue: { from: '#2B5C8F', to: '#173B63', ink: '#EED596' },
  green: { from: '#1F5E45', to: '#123B2B', ink: '#EBD08E' },
  black: { from: '#2B2B2E', to: '#141416', ink: '#E6CF95' },
  red: { from: '#B3262E', to: '#7C151B', ink: '#F4DA9C' }
};

const EU_BURGUNDY = 'AT BE BG CY CZ DE DK EE ES FI FR GR HR HU IE IT LT LU LV MT NL PL PT RO SE SI SK'.split(' ');

const TONE_OVERRIDES: Record<string, CoverTone> = {
  TR: 'burgundy', RU: 'burgundy', UA: 'blue', GE: 'burgundy', AM: 'blue', AZ: 'burgundy', RS: 'burgundy',
  AL: 'burgundy', MK: 'burgundy', ME: 'burgundy', BA: 'blue', NO: 'red', IS: 'blue', CH: 'red', LI: 'blue',
  GB: 'navy', US: 'navy', CA: 'navy', AU: 'navy', NZ: 'black', MX: 'green', BR: 'navy', AR: 'navy',
  CL: 'burgundy', CO: 'burgundy', PE: 'burgundy', JP: 'burgundy', KR: 'blue', CN: 'burgundy', TW: 'green',
  IN: 'navy', PK: 'green', BD: 'green', ID: 'green', MY: 'red', SG: 'red', TH: 'burgundy', VN: 'green',
  PH: 'burgundy', SA: 'green', AE: 'navy', QA: 'burgundy', KW: 'navy', EG: 'green', MA: 'green', DZ: 'green',
  TN: 'burgundy', IR: 'burgundy', IQ: 'navy', JO: 'black', IL: 'navy', NG: 'green', KE: 'navy', ZA: 'green'
};

/** Kapakta ülkenin kendi dilinde yazan iki satır: ülke adı ve "pasaport" kelimesi. */
const NATIVE: Record<string, [string, string]> = {
  TR: ['TÜRKİYE CUMHURİYETİ', 'PASAPORT'],
  DE: ['BUNDESREPUBLIK DEUTSCHLAND', 'REISEPASS'],
  AT: ['REPUBLIK ÖSTERREICH', 'REISEPASS'],
  CH: ['SCHWEIZ · SUISSE · SVIZZERA', 'PASS · PASSEPORT'],
  FR: ['RÉPUBLIQUE FRANÇAISE', 'PASSEPORT'],
  BE: ['ROYAUME DE BELGIQUE', 'PASSEPORT'],
  NL: ['KONINKRIJK DER NEDERLANDEN', 'PASPOORT'],
  ES: ['REINO DE ESPAÑA', 'PASAPORTE'],
  IT: ['REPUBBLICA ITALIANA', 'PASSAPORTO'],
  PT: ['REPÚBLICA PORTUGUESA', 'PASSAPORTE'],
  GR: ['ΕΛΛΗΝΙΚΗ ΔΗΜΟΚΡΑΤΙΑ', 'ΔΙΑΒΑΤΗΡΙΟ'],
  PL: ['RZECZPOSPOLITA POLSKA', 'PASZPORT'],
  SE: ['SVERIGE', 'PASS'],
  NO: ['NORGE', 'PASS'],
  DK: ['DANMARK', 'PAS'],
  FI: ['SUOMI · FINLAND', 'PASSI · PASS'],
  RU: ['РОССИЙСКАЯ ФЕДЕРАЦИЯ', 'ПАСПОРТ'],
  UA: ['УКРАЇНА', 'ПАСПОРТ'],
  GE: ['საქართველო', 'პასპორტი'],
  AZ: ['AZƏRBAYCAN RESPUBLİKASI', 'PASPORT'],
  GB: ['UNITED KINGDOM', 'PASSPORT'],
  US: ['UNITED STATES OF AMERICA', 'PASSPORT'],
  CA: ['CANADA', 'PASSPORT · PASSEPORT'],
  AU: ['AUSTRALIA', 'PASSPORT'],
  NZ: ['NEW ZEALAND', 'PASSPORT'],
  IE: ['ÉIRE · IRELAND', 'PAS · PASSPORT'],
  MX: ['ESTADOS UNIDOS MEXICANOS', 'PASAPORTE'],
  AR: ['REPÚBLICA ARGENTINA', 'PASAPORTE'],
  BR: ['REPÚBLICA FEDERATIVA DO BRASIL', 'PASSAPORTE'],
  CO: ['REPÚBLICA DE COLOMBIA', 'PASAPORTE'],
  CL: ['REPÚBLICA DE CHILE', 'PASAPORTE'],
  JP: ['日本国', '旅券'],
  KR: ['대한민국', '여권'],
  CN: ['中华人民共和国', '护照'],
  TW: ['中華民國', '護照'],
  TH: ['ประเทศไทย', 'หนังสือเดินทาง'],
  VN: ['VIỆT NAM', 'HỘ CHIẾU'],
  ID: ['REPUBLIK INDONESIA', 'PASPOR'],
  MY: ['MALAYSIA', 'PASPORT'],
  IN: ['भारत गणराज्य', 'पासपोर्ट'],
  PK: ['PAKISTAN', 'PASSPORT'],
  SA: ['المملكة العربية السعودية', 'جواز سفر'],
  AE: ['الإمارات العربية المتحدة', 'جواز سفر'],
  EG: ['جمهورية مصر العربية', 'جواز سفر'],
  MA: ['المملكة المغربية', 'جواز سفر'],
  IR: ['جمهوری اسلامی ایران', 'گذرنامه'],
  IL: ['מדינת ישראל', 'דרכון']
};

const RTL = new Set(['SA', 'AE', 'EG', 'MA', 'IR', 'IL']);

export function getCover(code: string, englishName: string) {
  const c = (code || '').toUpperCase();
  const tone: CoverTone = TONE_OVERRIDES[c] || (EU_BURGUNDY.includes(c) ? 'burgundy' : 'navy');
  const [line1, line2] = NATIVE[c] || [englishName.toUpperCase(), 'PASSPORT'];
  return { tone, colors: COVER_COLORS[tone], line1, line2, rtl: RTL.has(c) };
}
