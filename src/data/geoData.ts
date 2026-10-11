/**
 * Coğrafi Koordinatlar, Merkezler & Mesafe Hesaplama Veri Tabanı
 * Rota planlamasında mantıksal coğrafi sıralama, mesafe (km) ve seyahat süresi tahminleri için kullanılır.
 */

export interface CountryGeo {
  code: string;
  lat: number;
  lng: number;
  capital: string;
  mainHub: string;
  hasRailConnectionWith?: string[]; // neighbor codes with high-speed / main rail
  ferryConnectionWith?: string[]; // water connections
}

// 199 ülkenin yaklaşık coğrafi merkez/başkent koordinatları
export const GEO_DATA: Record<string, CountryGeo> = {
  // Avrupa & Çevresi
  TR: { code: 'TR', lat: 39.93, lng: 32.85, capital: 'Ankara', mainHub: 'IST', hasRailConnectionWith: ['BG', 'GR'] },
  GR: { code: 'GR', lat: 37.98, lng: 23.72, capital: 'Atina', mainHub: 'ATH', hasRailConnectionWith: ['MK', 'BG', 'TR'], ferryConnectionWith: ['IT', 'TR', 'AL'] },
  BG: { code: 'BG', lat: 42.69, lng: 23.32, capital: 'Sofya', mainHub: 'SOF', hasRailConnectionWith: ['TR', 'RO', 'RS', 'GR'] },
  RO: { code: 'RO', lat: 44.42, lng: 26.10, capital: 'Bükreş', mainHub: 'OTP', hasRailConnectionWith: ['BG', 'HU', 'MD', 'UA'] },
  RS: { code: 'RS', lat: 44.78, lng: 20.44, capital: 'Belgrad', mainHub: 'BEG', hasRailConnectionWith: ['HU', 'ME', 'MK', 'BG', 'HR'] },
  BA: { code: 'BA', lat: 43.85, lng: 18.41, capital: 'Saraybosna', mainHub: 'SJJ', hasRailConnectionWith: ['HR', 'RS'] },
  ME: { code: 'ME', lat: 42.43, lng: 19.26, capital: 'Podgorica', mainHub: 'TGD', hasRailConnectionWith: ['RS'], ferryConnectionWith: ['IT'] },
  AL: { code: 'AL', lat: 41.32, lng: 19.81, capital: 'Tiran', mainHub: 'TIA', ferryConnectionWith: ['IT', 'GR'] },
  MK: { code: 'MK', lat: 41.99, lng: 21.42, capital: 'Üsküp', mainHub: 'SKP', hasRailConnectionWith: ['RS', 'GR'] },
  XK: { code: 'XK', lat: 42.66, lng: 21.16, capital: 'Priştine', mainHub: 'PRN', hasRailConnectionWith: ['MK'] },
  HR: { code: 'HR', lat: 45.81, lng: 15.98, capital: 'Zagreb', mainHub: 'ZAG', hasRailConnectionWith: ['SI', 'HU', 'RS', 'BA'], ferryConnectionWith: ['IT'] },
  SI: { code: 'SI', lat: 46.05, lng: 14.50, capital: 'Ljubljana', mainHub: 'LJU', hasRailConnectionWith: ['IT', 'AT', 'HR'] },
  HU: { code: 'HU', lat: 47.49, lng: 19.04, capital: 'Budapeşte', mainHub: 'BUD', hasRailConnectionWith: ['AT', 'SK', 'RO', 'RS', 'HR', 'UA'] },
  SK: { code: 'SK', lat: 48.14, lng: 17.10, capital: 'Bratislava', mainHub: 'BTS', hasRailConnectionWith: ['AT', 'CZ', 'HU', 'PL'] },
  AT: { code: 'AT', lat: 48.20, lng: 16.37, capital: 'Viyana', mainHub: 'VIE', hasRailConnectionWith: ['DE', 'CZ', 'SK', 'HU', 'SI', 'IT', 'CH', 'LI'] },
  CZ: { code: 'CZ', lat: 50.07, lng: 14.43, capital: 'Prag', mainHub: 'PRG', hasRailConnectionWith: ['DE', 'AT', 'SK', 'PL'] },
  PL: { code: 'PL', lat: 52.22, lng: 21.01, capital: 'Varşova', mainHub: 'WAW', hasRailConnectionWith: ['DE', 'CZ', 'SK', 'LT', 'UA', 'BY'] },
  DE: { code: 'DE', lat: 52.52, lng: 13.40, capital: 'Berlin', mainHub: 'FRA/BER', hasRailConnectionWith: ['FR', 'NL', 'BE', 'AT', 'CH', 'CZ', 'PL', 'DK'] },
  FR: { code: 'FR', lat: 48.85, lng: 2.35, capital: 'Paris', mainHub: 'CDG', hasRailConnectionWith: ['GB', 'BE', 'DE', 'CH', 'IT', 'ES', 'LU'] },
  IT: { code: 'IT', lat: 41.90, lng: 12.49, capital: 'Roma', mainHub: 'FCO', hasRailConnectionWith: ['FR', 'CH', 'AT', 'SI'], ferryConnectionWith: ['GR', 'HR', 'AL', 'ME'] },
  ES: { code: 'ES', lat: 40.41, lng: -3.70, capital: 'Madrid', mainHub: 'MAD', hasRailConnectionWith: ['FR', 'PT'] },
  PT: { code: 'PT', lat: 38.72, lng: -9.13, capital: 'Lizbon', mainHub: 'LIS', hasRailConnectionWith: ['ES'] },
  NL: { code: 'NL', lat: 52.36, lng: 4.90, capital: 'Amsterdam', mainHub: 'AMS', hasRailConnectionWith: ['BE', 'DE', 'GB', 'FR'] },
  BE: { code: 'BE', lat: 50.85, lng: 4.35, capital: 'Brüksel', mainHub: 'BRU', hasRailConnectionWith: ['FR', 'NL', 'DE', 'GB', 'LU'] },
  LU: { code: 'LU', lat: 49.61, lng: 6.13, capital: 'Lüksemburg', mainHub: 'LUX', hasRailConnectionWith: ['FR', 'BE', 'DE'] },
  CH: { code: 'CH', lat: 46.94, lng: 7.44, capital: 'Bern', mainHub: 'ZRH', hasRailConnectionWith: ['FR', 'DE', 'IT', 'AT', 'LI'] },
  GB: { code: 'GB', lat: 51.50, lng: -0.12, capital: 'Londra', mainHub: 'LHR', hasRailConnectionWith: ['FR', 'BE', 'NL'] },
  IE: { code: 'IE', lat: 53.34, lng: -6.26, capital: 'Dublin', mainHub: 'DUB', ferryConnectionWith: ['GB', 'FR'] },
  DK: { code: 'DK', lat: 55.67, lng: 12.56, capital: 'Kopenhag', mainHub: 'CPH', hasRailConnectionWith: ['DE', 'SE'] },
  SE: { code: 'SE', lat: 59.32, lng: 18.06, capital: 'Stockholm', mainHub: 'ARN', hasRailConnectionWith: ['DK', 'NO'] },
  NO: { code: 'NO', lat: 59.91, lng: 10.75, capital: 'Oslo', mainHub: 'OSL', hasRailConnectionWith: ['SE'] },
  FI: { code: 'FI', lat: 60.16, lng: 24.93, capital: 'Helsinki', mainHub: 'HEL', ferryConnectionWith: ['EE', 'SE'] },
  EE: { code: 'EE', lat: 59.43, lng: 24.75, capital: 'Tallinn', mainHub: 'TLL', hasRailConnectionWith: ['LV'], ferryConnectionWith: ['FI', 'SE'] },
  LV: { code: 'LV', lat: 56.94, lng: 24.10, capital: 'Riga', mainHub: 'RIX', hasRailConnectionWith: ['EE', 'LT'] },
  LT: { code: 'LT', lat: 54.68, lng: 25.27, capital: 'Vilnius', mainHub: 'VNO', hasRailConnectionWith: ['LV', 'PL'] },
  MD: { code: 'MD', lat: 47.01, lng: 28.86, capital: 'Kişinev', mainHub: 'KIV', hasRailConnectionWith: ['RO', 'UA'] },
  UA: { code: 'UA', lat: 50.45, lng: 30.52, capital: 'Kiev', mainHub: 'KBP', hasRailConnectionWith: ['PL', 'SK', 'HU', 'RO', 'MD'] },
  BY: { code: 'BY', lat: 53.90, lng: 27.56, capital: 'Minsk', mainHub: 'MSQ', hasRailConnectionWith: ['RU', 'PL'] },
  RU: { code: 'RU', lat: 55.75, lng: 37.61, capital: 'Moskova', mainHub: 'SVO', hasRailConnectionWith: ['BY', 'KZ', 'MN', 'CN'] },
  CY: { code: 'CY', lat: 35.18, lng: 33.38, capital: 'Lefkoşa', mainHub: 'LCA' },
  MT: { code: 'MT', lat: 35.89, lng: 14.51, capital: 'Valletta', mainHub: 'MLA', ferryConnectionWith: ['IT'] },
  IS: { code: 'IS', lat: 64.14, lng: -21.94, capital: 'Reykjavik', mainHub: 'KEF' },
  GE: { code: 'GE', lat: 41.71, lng: 44.78, capital: 'Tiflis', mainHub: 'TBS', hasRailConnectionWith: ['AZ', 'AM', 'TR'] },
  AZ: { code: 'AZ', lat: 40.40, lng: 49.86, capital: 'Bakü', mainHub: 'GYD', hasRailConnectionWith: ['GE', 'RU'] },
  AM: { code: 'AM', lat: 40.18, lng: 44.51, capital: 'Erivan', mainHub: 'EVN', hasRailConnectionWith: ['GE'] },

  // Asya & Kafkaslar & Orta Doğu
  AE: { code: 'AE', lat: 25.20, lng: 55.27, capital: 'Abu Dabi', mainHub: 'DXB/AUH' },
  QA: { code: 'QA', lat: 25.28, lng: 51.53, capital: 'Doha', mainHub: 'DOH' },
  SA: { code: 'SA', lat: 24.71, lng: 46.67, capital: 'Riyad', mainHub: 'RUH' },
  OM: { code: 'OM', lat: 23.58, lng: 58.40, capital: 'Maskat', mainHub: 'MCT' },
  KW: { code: 'KW', lat: 29.37, lng: 47.97, capital: 'Kuveyt', mainHub: 'KWI' },
  BH: { code: 'BH', lat: 26.22, lng: 50.58, capital: 'Manama', mainHub: 'BAH' },
  JO: { code: 'JO', lat: 31.95, lng: 35.93, capital: 'Amman', mainHub: 'AMM' },
  LB: { code: 'LB', lat: 33.89, lng: 35.50, capital: 'Beyrut', mainHub: 'BEY' },
  IL: { code: 'IL', lat: 31.76, lng: 35.21, capital: 'Kudüs', mainHub: 'TLV' },
  EG: { code: 'EG', lat: 30.04, lng: 31.23, capital: 'Kahire', mainHub: 'CAI' },
  KZ: { code: 'KZ', lat: 51.16, lng: 71.47, capital: 'Astana', mainHub: 'NQZ', hasRailConnectionWith: ['RU', 'UZ', 'KG', 'CN'] },
  UZ: { code: 'UZ', lat: 41.29, lng: 69.24, capital: 'Taşkent', mainHub: 'TAS', hasRailConnectionWith: ['KZ', 'TJ', 'KG', 'TM'] },
  KG: { code: 'KG', lat: 42.87, lng: 74.59, capital: 'Bişkek', mainHub: 'FRU', hasRailConnectionWith: ['KZ'] },
  TJ: { code: 'TJ', lat: 38.55, lng: 68.78, capital: 'Duşanbe', mainHub: 'DYU' },
  TM: { code: 'TM', lat: 37.96, lng: 58.32, capital: 'Aşkabat', mainHub: 'ASB' },
  MN: { code: 'MN', lat: 47.91, lng: 106.91, capital: 'Ulan Batur', mainHub: 'UBN', hasRailConnectionWith: ['RU', 'CN'] },
  IN: { code: 'IN', lat: 28.61, lng: 77.20, capital: 'Yeni Delhi', mainHub: 'DEL' },
  PK: { code: 'PK', lat: 33.68, lng: 73.04, capital: 'İslamabad', mainHub: 'ISB' },
  BD: { code: 'BD', lat: 23.81, lng: 90.41, capital: 'Dakka', mainHub: 'DAC' },
  LK: { code: 'LK', lat: 6.92, lng: 79.86, capital: 'Kolombo', mainHub: 'CMB' },
  MV: { code: 'MV', lat: 4.17, lng: 73.50, capital: 'Male', mainHub: 'MLE' },
  NP: { code: 'NP', lat: 27.71, lng: 85.32, capital: 'Katmandu', mainHub: 'KTM' },
  CN: { code: 'CN', lat: 39.90, lng: 116.40, capital: 'Pekin', mainHub: 'PEK/PVG', hasRailConnectionWith: ['HK', 'RU', 'MN', 'VN', 'LA'] },
  HK: { code: 'HK', lat: 22.31, lng: 114.16, capital: 'Hong Kong', mainHub: 'HKG', hasRailConnectionWith: ['CN'] },
  MO: { code: 'MO', lat: 22.19, lng: 113.54, capital: 'Makao', mainHub: 'MFM', ferryConnectionWith: ['HK'] },
  TW: { code: 'TW', lat: 25.03, lng: 121.56, capital: 'Taipei', mainHub: 'TPE' },
  JP: { code: 'JP', lat: 35.67, lng: 139.65, capital: 'Tokyo', mainHub: 'HND/NRT' },
  KR: { code: 'KR', lat: 37.56, lng: 126.97, capital: 'Seul', mainHub: 'ICN' },
  TH: { code: 'TH', lat: 13.75, lng: 100.50, capital: 'Bangkok', mainHub: 'BKK', hasRailConnectionWith: ['MY', 'LA', 'KH'] },
  VN: { code: 'VN', lat: 21.02, lng: 105.83, capital: 'Hanoi', mainHub: 'HAN/SGN', hasRailConnectionWith: ['CN'] },
  KH: { code: 'KH', lat: 11.55, lng: 104.92, capital: 'Phnom Penh', mainHub: 'PNH', hasRailConnectionWith: ['TH'] },
  LA: { code: 'LA', lat: 17.97, lng: 102.63, capital: 'Vientiane', mainHub: 'VTE', hasRailConnectionWith: ['CN', 'TH'] },
  MM: { code: 'MM', lat: 19.76, lng: 96.07, capital: 'Naypyidaw', mainHub: 'RGN' },
  MY: { code: 'MY', lat: 3.13, lng: 101.68, capital: 'Kuala Lumpur', mainHub: 'KUL', hasRailConnectionWith: ['SG', 'TH'] },
  SG: { code: 'SG', lat: 1.35, lng: 103.81, capital: 'Singapur', mainHub: 'SIN', hasRailConnectionWith: ['MY'], ferryConnectionWith: ['ID'] },
  ID: { code: 'ID', lat: -6.20, lng: 106.84, capital: 'Cakarta', mainHub: 'CGK/DPS', ferryConnectionWith: ['SG', 'MY'] },
  PH: { code: 'PH', lat: 14.59, lng: 120.98, capital: 'Manila', mainHub: 'MNL' },

  // Kuzey & Güney Amerika
  US: { code: 'US', lat: 38.90, lng: -77.03, capital: 'Washington, D.C.', mainHub: 'JFK/IAD', hasRailConnectionWith: ['CA'] },
  CA: { code: 'CA', lat: 45.42, lng: -75.69, capital: 'Ottawa', mainHub: 'YYZ', hasRailConnectionWith: ['US'] },
  MX: { code: 'MX', lat: 19.43, lng: -99.13, capital: 'Mexico City', mainHub: 'MEX' },
  BR: { code: 'BR', lat: -15.79, lng: -47.88, capital: 'Brasília', mainHub: 'GRU' },
  AR: { code: 'AR', lat: -34.60, lng: -58.38, capital: 'Buenos Aires', mainHub: 'EZE', ferryConnectionWith: ['UY'] },
  CL: { code: 'CL', lat: -33.44, lng: -70.66, capital: 'Santiago', mainHub: 'SCL' },
  CO: { code: 'CO', lat: 4.71, lng: -74.07, capital: 'Bogota', mainHub: 'BOG' },
  PE: { code: 'PE', lat: -12.04, lng: -77.04, capital: 'Lima', mainHub: 'LIM' },
  UY: { code: 'UY', lat: -34.90, lng: -56.16, capital: 'Montevideo', mainHub: 'MVD', ferryConnectionWith: ['AR'] },
  CR: { code: 'CR', lat: 9.92, lng: -84.09, capital: 'San Jose', mainHub: 'SJO' },
  PA: { code: 'PA', lat: 8.98, lng: -79.51, capital: 'Panama City', mainHub: 'PTY' },
  CU: { code: 'CU', lat: 23.11, lng: -82.36, capital: 'Havana', mainHub: 'HAV' },

  // Okyanusya & Afrika
  AU: { code: 'AU', lat: -35.28, lng: 149.13, capital: 'Canberra', mainHub: 'SYD' },
  NZ: { code: 'NZ', lat: -41.28, lng: 174.77, capital: 'Wellington', mainHub: 'AKL' },
  FJ: { code: 'FJ', lat: -18.14, lng: 178.44, capital: 'Suva', mainHub: 'NAN' },
  ZA: { code: 'ZA', lat: -25.74, lng: 28.22, capital: 'Pretoria', mainHub: 'JNB/CPT' },
  MA: { code: 'MA', lat: 34.02, lng: -6.83, capital: 'Rabat', mainHub: 'CMN', hasRailConnectionWith: [], ferryConnectionWith: ['ES'] },
  TN: { code: 'TN', lat: 36.80, lng: 10.18, capital: 'Tunus', mainHub: 'TUN', ferryConnectionWith: ['IT', 'FR'] },
  KE: { code: 'KE', lat: -1.29, lng: 36.82, capital: 'Nairobi', mainHub: 'NBO' },
  TZ: { code: 'TZ', lat: -6.16, lng: 35.74, capital: 'Dodoma', mainHub: 'DAR/ZNZ' },
  MU: { code: 'MU', lat: -20.16, lng: 57.50, capital: 'Port Louis', mainHub: 'MRU' },
  SC: { code: 'SC', lat: -4.61, lng: 55.45, capital: 'Victoria', mainHub: 'SEZ' },

  // Avrupa Mikro Devletler
  AD: { code: 'AD', lat: 42.50, lng: 1.52, capital: 'Andorra la Vella', mainHub: 'ALV' },
  LI: { code: 'LI', lat: 47.14, lng: 9.52, capital: 'Vaduz', mainHub: 'VAD' },
  MC: { code: 'MC', lat: 43.73, lng: 7.42, capital: 'Monako', mainHub: 'MCM' },
  SM: { code: 'SM', lat: 43.94, lng: 12.45, capital: 'San Marino', mainHub: 'SMR' },
  VA: { code: 'VA', lat: 41.90, lng: 12.45, capital: 'Vatikan', mainHub: 'CIA' },

  // Asya & Kafkaslar
  AF: { code: 'AF', lat: 34.55, lng: 69.20, capital: 'Kabil', mainHub: 'KBL' },
  BN: { code: 'BN', lat: 4.90, lng: 114.94, capital: 'Bandar Seri Begawan', mainHub: 'BWN' },
  BT: { code: 'BT', lat: 27.47, lng: 89.63, capital: 'Thimphu', mainHub: 'PBH' },
  KP: { code: 'KP', lat: 39.03, lng: 125.76, capital: 'Pyongyang', mainHub: 'FNJ' },
  TL: { code: 'TL', lat: -8.55, lng: 125.57, capital: 'Dili', mainHub: 'DIL' },

  // Orta Doğu
  IQ: { code: 'IQ', lat: 33.31, lng: 44.36, capital: 'Bağdat', mainHub: 'BGW' },
  IR: { code: 'IR', lat: 35.68, lng: 51.38, capital: 'Tahran', mainHub: 'IKA/THR' },
  PS: { code: 'PS', lat: 31.90, lng: 35.20, capital: 'Doğu Kudüs / Ramallah', mainHub: 'JRS' },
  SY: { code: 'SY', lat: 33.51, lng: 36.27, capital: 'Şam', mainHub: 'DAM' },
  YE: { code: 'YE', lat: 15.36, lng: 44.19, capital: 'Sana', mainHub: 'SAH' },

  // Afrika
  AO: { code: 'AO', lat: -8.83, lng: 13.23, capital: 'Luanda', mainHub: 'LAD' },
  BF: { code: 'BF', lat: 12.37, lng: -1.52, capital: 'Ouagadougou', mainHub: 'OUA' },
  BI: { code: 'BI', lat: -3.38, lng: 29.36, capital: 'Gitega', mainHub: 'BJM' },
  BJ: { code: 'BJ', lat: 6.49, lng: 2.62, capital: 'Porto-Novo', mainHub: 'COO' },
  BW: { code: 'BW', lat: -24.65, lng: 25.90, capital: 'Gaborone', mainHub: 'GBE' },
  CD: { code: 'CD', lat: -4.32, lng: 15.31, capital: 'Kinşasa', mainHub: 'FIH' },
  CF: { code: 'CF', lat: 4.39, lng: 18.55, capital: 'Bangui', mainHub: 'BGF' },
  CG: { code: 'CG', lat: -4.26, lng: 15.28, capital: 'Brazzaville', mainHub: 'BZV' },
  CI: { code: 'CI', lat: 6.82, lng: -5.27, capital: 'Yamoussoukro', mainHub: 'ABJ' },
  CM: { code: 'CM', lat: 3.84, lng: 11.50, capital: 'Yaounde', mainHub: 'DLA' },
  CV: { code: 'CV', lat: 14.93, lng: -23.51, capital: 'Praia', mainHub: 'RAI' },
  DJ: { code: 'DJ', lat: 11.58, lng: 43.14, capital: 'Cibuti', mainHub: 'JIB' },
  DZ: { code: 'DZ', lat: 36.75, lng: 3.05, capital: 'Cezayir', mainHub: 'ALG' },
  ER: { code: 'ER', lat: 15.32, lng: 38.92, capital: 'Asmara', mainHub: 'ASM' },
  ET: { code: 'ET', lat: 9.03, lng: 38.74, capital: 'Addis Ababa', mainHub: 'ADD' },
  GA: { code: 'GA', lat: 0.41, lng: 9.46, capital: 'Libreville', mainHub: 'LBV' },
  GH: { code: 'GH', lat: 5.60, lng: -0.18, capital: 'Akra', mainHub: 'ACC' },
  GM: { code: 'GM', lat: 13.45, lng: -16.57, capital: 'Banjul', mainHub: 'BJL' },
  GN: { code: 'GN', lat: 9.64, lng: -13.57, capital: 'Konakri', mainHub: 'CKY' },
  GQ: { code: 'GQ', lat: 3.75, lng: 8.78, capital: 'Malabo', mainHub: 'SSG' },
  GW: { code: 'GW', lat: 11.86, lng: -15.59, capital: 'Bissau', mainHub: 'OXB' },
  KM: { code: 'KM', lat: -11.71, lng: 43.25, capital: 'Moroni', mainHub: 'HAH' },
  LR: { code: 'LR', lat: 6.30, lng: -10.79, capital: 'Monrovia', mainHub: 'ROB' },
  LS: { code: 'LS', lat: -29.31, lng: 27.48, capital: 'Maseru', mainHub: 'MSU' },
  LY: { code: 'LY', lat: 32.88, lng: 13.19, capital: 'Trablus', mainHub: 'TIP' },
  MG: { code: 'MG', lat: -18.87, lng: 47.50, capital: 'Antananarivo', mainHub: 'TNR' },
  ML: { code: 'ML', lat: 12.63, lng: -8.00, capital: 'Bamako', mainHub: 'BKO' },
  MR: { code: 'MR', lat: 18.07, lng: -15.95, capital: 'Nuakşot', mainHub: 'NKC' },
  MW: { code: 'MW', lat: -13.96, lng: 33.78, capital: 'Lilongwe', mainHub: 'LLW' },
  MZ: { code: 'MZ', lat: -25.96, lng: 32.57, capital: 'Maputo', mainHub: 'MPM' },
  NA: { code: 'NA', lat: -22.56, lng: 17.06, capital: 'Windhoek', mainHub: 'WDH' },
  NE: { code: 'NE', lat: 13.51, lng: 2.12, capital: 'Niamey', mainHub: 'NIM' },
  NG: { code: 'NG', lat: 9.07, lng: 7.39, capital: 'Abuja', mainHub: 'ABV' },
  RW: { code: 'RW', lat: -1.97, lng: 30.10, capital: 'Kigali', mainHub: 'KGL' },
  SD: { code: 'SD', lat: 15.50, lng: 32.55, capital: 'Hartum', mainHub: 'KRT' },
  SL: { code: 'SL', lat: 8.48, lng: -13.23, capital: 'Freetown', mainHub: 'FNA' },
  SN: { code: 'SN', lat: 14.71, lng: -17.46, capital: 'Dakar', mainHub: 'DSS' },
  SO: { code: 'SO', lat: 2.04, lng: 45.34, capital: 'Mogadişu', mainHub: 'MGQ' },
  SS: { code: 'SS', lat: 4.85, lng: 31.58, capital: 'Juba', mainHub: 'JUB' },
  ST: { code: 'ST', lat: 0.33, lng: 6.73, capital: 'Sao Tome', mainHub: 'TMS' },
  SZ: { code: 'SZ', lat: -26.30, lng: 31.13, capital: 'Mbabane', mainHub: 'SHO' },
  TD: { code: 'TD', lat: 12.13, lng: 15.05, capital: "N'Djamena", mainHub: 'NDJ' },
  TG: { code: 'TG', lat: 6.13, lng: 1.22, capital: 'Lome', mainHub: 'LFW' },
  UG: { code: 'UG', lat: 0.34, lng: 32.58, capital: 'Kampala', mainHub: 'EBB' },
  ZM: { code: 'ZM', lat: -15.38, lng: 28.32, capital: 'Lusaka', mainHub: 'LUN' },
  ZW: { code: 'ZW', lat: -17.82, lng: 31.05, capital: 'Harare', mainHub: 'HRE' },

  // Kuzey & Orta Amerika & Karayipler
  AG: { code: 'AG', lat: 17.12, lng: -61.84, capital: "Saint John's", mainHub: 'ANU' },
  BB: { code: 'BB', lat: 13.19, lng: -59.54, capital: 'Bridgetown', mainHub: 'BGI' },
  BS: { code: 'BS', lat: 25.04, lng: -77.39, capital: 'Nassau', mainHub: 'NAS' },
  BZ: { code: 'BZ', lat: 17.25, lng: -88.76, capital: 'Belmopan', mainHub: 'BZE' },
  DM: { code: 'DM', lat: 15.30, lng: -61.38, capital: 'Roseau', mainHub: 'DOM' },
  DO: { code: 'DO', lat: 18.48, lng: -69.93, capital: 'Santo Domingo', mainHub: 'SDQ' },
  GD: { code: 'GD', lat: 12.05, lng: -61.75, capital: "Saint George's", mainHub: 'GND' },
  GT: { code: 'GT', lat: 14.63, lng: -90.50, capital: 'Guatemala City', mainHub: 'GUA' },
  HN: { code: 'HN', lat: 14.07, lng: -87.19, capital: 'Tegucigalpa', mainHub: 'TGU' },
  HT: { code: 'HT', lat: 18.59, lng: -72.30, capital: 'Port-au-Prince', mainHub: 'PAP' },
  JM: { code: 'JM', lat: 18.01, lng: -76.80, capital: 'Kingston', mainHub: 'KIN' },
  KN: { code: 'KN', lat: 17.30, lng: -62.73, capital: 'Basseterre', mainHub: 'SKB' },
  LC: { code: 'LC', lat: 14.01, lng: -60.98, capital: 'Castries', mainHub: 'UVF' },
  NI: { code: 'NI', lat: 12.11, lng: -86.23, capital: 'Managua', mainHub: 'MGA' },
  SV: { code: 'SV', lat: 13.69, lng: -89.21, capital: 'San Salvador', mainHub: 'SAL' },
  TT: { code: 'TT', lat: 10.65, lng: -61.51, capital: 'Port of Spain', mainHub: 'POS' },
  VC: { code: 'VC', lat: 13.16, lng: -61.22, capital: 'Kingstown', mainHub: 'SVD' },

  // Güney Amerika
  BO: { code: 'BO', lat: -16.50, lng: -68.15, capital: 'La Paz & Sucre', mainHub: 'LPB' },
  EC: { code: 'EC', lat: -0.18, lng: -78.46, capital: 'Quito', mainHub: 'UIO' },
  GY: { code: 'GY', lat: 6.80, lng: -58.15, capital: 'Georgetown', mainHub: 'GEO' },
  PY: { code: 'PY', lat: -25.26, lng: -57.57, capital: 'Asuncion', mainHub: 'ASU' },
  SR: { code: 'SR', lat: 5.85, lng: -55.20, capital: 'Paramaribo', mainHub: 'PBM' },
  VE: { code: 'VE', lat: 10.48, lng: -66.90, capital: 'Caracas', mainHub: 'CCS' },

  // Okyanusya
  FM: { code: 'FM', lat: 6.92, lng: 158.15, capital: 'Palikir', mainHub: 'PNI' },
  KI: { code: 'KI', lat: 1.45, lng: 172.98, capital: 'Tarawa', mainHub: 'TRW' },
  MH: { code: 'MH', lat: 7.11, lng: 171.18, capital: 'Majuro', mainHub: 'MAJ' },
  NR: { code: 'NR', lat: -0.52, lng: 166.93, capital: 'Yaren', mainHub: 'INU' },
  PG: { code: 'PG', lat: -9.44, lng: 147.18, capital: 'Port Moresby', mainHub: 'POM' },
  PW: { code: 'PW', lat: 7.50, lng: 134.62, capital: 'Ngerulmud', mainHub: 'ROR' },
  SB: { code: 'SB', lat: -9.43, lng: 159.95, capital: 'Honiara', mainHub: 'HIR' },
  TO: { code: 'TO', lat: -21.13, lng: -175.20, capital: "Nuku'alofa", mainHub: 'TBU' },
  TV: { code: 'TV', lat: -8.52, lng: 179.20, capital: 'Funafuti', mainHub: 'FUN' },
  VU: { code: 'VU', lat: -17.73, lng: 168.32, capital: 'Port Vila', mainHub: 'VLI' },
  WS: { code: 'WS', lat: -13.83, lng: -171.76, capital: 'Apia', mainHub: 'APW' }
};

// Fallback koordinat sağlayıcı
export function getCountryGeo(code: string): CountryGeo {
  if (GEO_DATA[code]) return GEO_DATA[code];
  return {
    code,
    lat: 20.0,
    lng: 0.0,
    capital: 'Başkent',
    mainHub: code
  };
}

/**
 * Haversine formülü: İki koordinat arası kuş uçuşu mesafeyi (kilometre cinsinden) hesaplar.
 */
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Dünya yarıçapı km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export type TravelMode = 'flight' | 'train' | 'bus_car' | 'ferry';

export interface TravelLegEstimate {
  fromCode: string;
  toCode: string;
  distanceKm: number;
  recommendedMode: TravelMode;
  estimatedTransitHours: number; // door-to-door approximate
  flightHoursNet?: number;
  modeLabel: string;
  modeIcon: string;
  tips: string;
}

/**
 * İki ülke arasındaki tahmini seyahat süresi ve en mantıklı ulaşım modunu belirler.
 */
export function estimateTravelLeg(fromCode: string, toCode: string): TravelLegEstimate {
  const geo1 = getCountryGeo(fromCode);
  const geo2 = getCountryGeo(toCode);
  const dist = calculateDistanceKm(geo1.lat, geo1.lng, geo2.lat, geo2.lng);

  // 1. Feribot bağlantısı var mı?
  if (geo1.ferryConnectionWith?.includes(toCode) || geo2.ferryConnectionWith?.includes(fromCode)) {
    if (dist <= 600) {
      return {
        fromCode,
        toCode,
        distanceKm: dist,
        recommendedMode: 'ferry',
        estimatedTransitHours: Math.round(Math.max(2, dist / 40 + 1)),
        modeLabel: 'Feribot / Denizyolu',
        modeIcon: '🚢',
        tips: `${geo1.capital} ile ${geo2.capital} arasında popüler feribot veya deniz otobüsü hattı bulunur.`
      };
    }
  }

  // 2. Demiryolu / Hızlı Tren bağlantısı var mı? (veya komşu & kısa mesafe)
  const hasDirectRail = geo1.hasRailConnectionWith?.includes(toCode) || geo2.hasRailConnectionWith?.includes(fromCode);
  if (hasDirectRail && dist <= 800) {
    const hours = Math.round((dist / 140 + 0.8) * 10) / 10;
    return {
      fromCode,
      toCode,
      distanceKm: dist,
      recommendedMode: 'train',
      estimatedTransitHours: Math.max(1.5, hours),
      modeLabel: 'Hızlı Tren / Demiryolu',
      modeIcon: '🚆',
      tips: 'Havalimanı güvenliği ve transferi yerine doğrudan şehir merkezinden merkeze hızlı tren en konforlu seçenektir.'
    };
  }

  // 3. Çok yakın kara sınırı (Otobüs / Araç)
  if (dist <= 350) {
    const hours = Math.round((dist / 75 + 1.2) * 10) / 10;
    return {
      fromCode,
      toCode,
      distanceKm: dist,
      recommendedMode: 'bus_car',
      estimatedTransitHours: hours,
      modeLabel: 'Karayolu / Otobüs / Araç',
      modeIcon: '🚌',
      tips: 'Mesafe kısa olduğundan doğrudan otobüs, araç kiralama veya taksi transferi pratiktir.'
    };
  }

  // 4. Uçuş (Flight)
  const netFlightHours = Math.round((dist / 750 + 0.6) * 10) / 10;
  // Total door to door includes check-in (2 hours) + baggage/customs (1 hour)
  const totalDoorToDoor = Math.round((netFlightHours + 3.0) * 10) / 10;

  return {
    fromCode,
    toCode,
    distanceKm: dist,
    recommendedMode: 'flight',
    flightHoursNet: netFlightHours,
    estimatedTransitHours: totalDoorToDoor,
    modeLabel: `Direkt Uçuş (~${netFlightHours} sa)`,
    modeIcon: '✈️',
    tips: `Havalimanı transferi ve pasaport kontrolü dahil kapıdan kapıya yaklaşık ${totalDoorToDoor} saat ayrılmalıdır.`
  };
}

/**
 * Mantıksal Coğrafi Rota Optimizasyonu (TSP / Nearest Neighbor Heuristic)
 * Kullanıcının seçtiği ülkeleri birbiri ardına zikzak çizmeden, en kısa toplam mesafe ve
 * mantıklı coğrafi akışta sıralar.
 */
export function optimizeRouteOrder(countryCodes: string[], startCode?: string): {
  optimizedCodes: string[];
  originalDistanceKm: number;
  optimizedDistanceKm: number;
  savedDistanceKm: number;
  savedHoursEstimate: number;
} {
  if (countryCodes.length <= 2) {
    const d = countryCodes.length === 2
      ? calculateDistanceKm(
          getCountryGeo(countryCodes[0]).lat,
          getCountryGeo(countryCodes[0]).lng,
          getCountryGeo(countryCodes[1]).lat,
          getCountryGeo(countryCodes[1]).lng
        )
      : 0;
    return {
      optimizedCodes: [...countryCodes],
      originalDistanceKm: d,
      optimizedDistanceKm: d,
      savedDistanceKm: 0,
      savedHoursEstimate: 0
    };
  }

  // Orijinal mesafe hesabı
  let originalDistance = 0;
  for (let i = 0; i < countryCodes.length - 1; i++) {
    const g1 = getCountryGeo(countryCodes[i]);
    const g2 = getCountryGeo(countryCodes[i + 1]);
    originalDistance += calculateDistanceKm(g1.lat, g1.lng, g2.lat, g2.lng);
  }

  // En Yakın Komşu (Nearest Neighbor) Algoritması
  const remaining = [...countryCodes];
  const start = startCode && remaining.includes(startCode) ? startCode : remaining[0];
  const route: string[] = [start];
  remaining.splice(remaining.indexOf(start), 1);

  while (remaining.length > 0) {
    const currentCode = route[route.length - 1];
    const currentGeo = getCountryGeo(currentCode);

    let nearestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < remaining.length; i++) {
      const candidateGeo = getCountryGeo(remaining[i]);
      const dist = calculateDistanceKm(currentGeo.lat, currentGeo.lng, candidateGeo.lat, candidateGeo.lng);
      if (dist < minDistance) {
        minDistance = dist;
        nearestIndex = i;
      }
    }

    route.push(remaining[nearestIndex]);
    remaining.splice(nearestIndex, 1);
  }

  // 2-Opt Basit Yerel İyileştirme (Kesişen yolları çözmek için)
  let improved = true;
  let optimized = [...route];
  let iter = 0;
  while (improved && iter < 15) {
    improved = false;
    iter++;
    for (let i = 1; i < optimized.length - 1; i++) {
      for (let k = i + 1; k < optimized.length; k++) {
        const dCurrent =
          calculateDistanceKm(getCountryGeo(optimized[i - 1]).lat, getCountryGeo(optimized[i - 1]).lng, getCountryGeo(optimized[i]).lat, getCountryGeo(optimized[i]).lng) +
          (k + 1 < optimized.length
            ? calculateDistanceKm(getCountryGeo(optimized[k]).lat, getCountryGeo(optimized[k]).lng, getCountryGeo(optimized[k + 1]).lat, getCountryGeo(optimized[k + 1]).lng)
            : 0);

        const dReversed =
          calculateDistanceKm(getCountryGeo(optimized[i - 1]).lat, getCountryGeo(optimized[i - 1]).lng, getCountryGeo(optimized[k]).lat, getCountryGeo(optimized[k]).lng) +
          (k + 1 < optimized.length
            ? calculateDistanceKm(getCountryGeo(optimized[i]).lat, getCountryGeo(optimized[i]).lng, getCountryGeo(optimized[k + 1]).lat, getCountryGeo(optimized[k + 1]).lng)
            : 0);

        if (dReversed < dCurrent) {
          // reverse slice
          const slice = optimized.slice(i, k + 1).reverse();
          optimized = [...optimized.slice(0, i), ...slice, ...optimized.slice(k + 1)];
          improved = true;
        }
      }
    }
  }

  let optimizedDistance = 0;
  for (let i = 0; i < optimized.length - 1; i++) {
    const g1 = getCountryGeo(optimized[i]);
    const g2 = getCountryGeo(optimized[i + 1]);
    optimizedDistance += calculateDistanceKm(g1.lat, g1.lng, g2.lat, g2.lng);
  }

  const savedKm = Math.max(0, originalDistance - optimizedDistance);
  const savedHours = Math.round((savedKm / 550) * 10) / 10;

  return {
    optimizedCodes: optimized,
    originalDistanceKm: originalDistance,
    optimizedDistanceKm: optimizedDistance,
    savedDistanceKm: savedKm,
    savedHoursEstimate: savedHours
  };
}
