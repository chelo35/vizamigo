import { GEO_DATA } from './geoData';
import { getCountryName, countryToRegion } from './passportData';

// Comprehensive global travel hubs, world capitals & tourist regions for live world clock, weather, and radar map
export interface WorldHub {
  city: string;
  cityTr?: string;
  iso?: string;
  flag: string;
  tz: string;
  country: {
    tr: string;
    en: string;
    de: string;
    es: string;
    ru: string;
  };
  region: 'Europe' | 'Americas' | 'Asia' | 'Middle East' | 'Africa' | 'Oceania';
  lat?: number;
  lng?: number;
}

const isoToFlag = (iso: string) =>
  String.fromCodePoint(...iso.toUpperCase().split('').map((c) => 127397 + c.charCodeAt(0)));

export function flagToIso(flag: string): string {
  const chars = [...flag];
  if (chars.length < 2) return '';
  const cp1 = chars[0].codePointAt(0);
  const cp2 = chars[1].codePointAt(0);
  if (!cp1 || !cp2) return '';
  return String.fromCharCode(cp1 - 127397, cp2 - 127397);
}

// Exact coordinates for multi-city hubs in BASE_WORLD_HUBS
const BASE_CITY_COORDS: Record<string, [number, number]> = {
  Istanbul: [41.01, 28.98],
  Ankara: [39.93, 32.85],
  Antalya: [36.89, 30.71],
  London: [51.51, -0.13],
  Paris: [48.86, 2.35],
  Berlin: [52.52, 13.4],
  Frankfurt: [50.11, 8.68],
  Munich: [48.14, 11.58],
  Rome: [41.9, 12.5],
  Milan: [45.46, 9.19],
  Madrid: [40.42, -3.7],
  Barcelona: [41.39, 2.17],
  Amsterdam: [52.37, 4.9],
  Brussels: [50.85, 4.35],
  Vienna: [48.21, 16.37],
  Bern: [46.95, 7.45],
  Zurich: [47.38, 8.54],
  Geneva: [46.2, 6.14],
  Athens: [37.98, 23.73],
  Lisbon: [38.72, -9.14],
  Dublin: [53.35, -6.26],
  Prague: [50.08, 14.44],
  Warsaw: [52.23, 21.01],
  Budapest: [47.5, 19.04],
  Bratislava: [48.15, 17.11],
  Ljubljana: [46.06, 14.51],
  Zagreb: [45.81, 15.98],
  Dubrovnik: [42.65, 18.09],
  Belgrade: [44.79, 20.45],
  Sarajevo: [43.86, 18.41],
  Podgorica: [42.43, 19.26],
  Budva: [42.29, 18.84],
  Tirana: [41.33, 19.82],
  Skopje: [42.0, 21.43],
  Pristina: [42.66, 21.17],
  Sofia: [42.7, 23.32],
  Bucharest: [44.43, 26.1],
  Chisinau: [47.01, 28.86],
  Kyiv: [50.45, 30.52],
  Minsk: [53.9, 27.57],
  Moscow: [55.76, 37.62],
  Stockholm: [59.33, 18.07],
  Oslo: [59.91, 10.75],
  Copenhagen: [55.68, 12.57],
  Helsinki: [60.17, 24.94],
  Tallinn: [59.44, 24.75],
  Riga: [56.95, 24.11],
  Vilnius: [54.69, 25.28],
  Reykjavik: [64.15, -21.94],
  Nicosia: [35.19, 33.38],
  Valletta: [35.9, 14.51],
  Tbilisi: [41.72, 44.83],
  Batumi: [41.64, 41.63],
  Baku: [40.41, 49.87],
  Yerevan: [40.18, 44.51],
  Astana: [51.17, 71.43],
  Almaty: [43.24, 76.91],
  Tashkent: [41.31, 69.24],
  Samarkand: [39.65, 66.96],
  Bishkek: [42.87, 74.59],
  Dushanbe: [38.56, 68.77],
  Ashgabat: [37.96, 58.33],
  Dubai: [25.2, 55.27],
  'Abu Dhabi': [24.45, 54.38],
  Doha: [25.29, 51.53],
  Riyadh: [24.71, 46.68],
  Jeddah: [21.54, 39.17],
  'Kuwait City': [29.38, 47.98],
  Manama: [26.22, 50.59],
  Muscat: [23.59, 58.38],
  Amman: [31.95, 35.93],
  Beirut: [33.89, 35.5],
  Jerusalem: [31.77, 35.21],
  'Tel Aviv': [32.09, 34.78],
  Baghdad: [33.31, 44.37],
  Tehran: [35.69, 51.39],
  Cairo: [30.04, 31.24],
  'Sharm El Sheikh': [27.92, 34.33],
  Rabat: [34.02, -6.83],
  Casablanca: [33.57, -7.59],
  Marrakech: [31.63, -8.01],
  Tunis: [36.81, 10.18],
  Algiers: [36.75, 3.06],
  Tokyo: [35.68, 139.77],
  Kyoto: [35.01, 135.77],
  Osaka: [34.69, 135.5],
  Seoul: [37.57, 126.98],
  Beijing: [39.9, 116.41],
  Shanghai: [31.23, 121.47],
  'Hong Kong': [22.32, 114.17],
  Taipei: [25.03, 121.57],
  Bangkok: [13.76, 100.5],
  Phuket: [7.88, 98.39],
  'Chiang Mai': [18.79, 98.98],
  Singapore: [1.35, 103.82],
  'Kuala Lumpur': [3.14, 101.69],
  Jakarta: [-6.2, 106.85],
  'Bali (Denpasar)': [-8.65, 115.22],
  Manila: [14.6, 120.98],
  Hanoi: [21.03, 105.83],
  'Ho Chi Minh City': [10.82, 106.63],
  'Phnom Penh': [11.56, 104.93],
  'New Delhi': [28.61, 77.21],
  Mumbai: [19.08, 72.88],
  Islamabad: [33.68, 73.05],
  Dhaka: [23.81, 90.41],
  Colombo: [6.93, 79.86],
  Kathmandu: [27.72, 85.32],
  Male: [4.18, 73.51],
  Ulaanbaatar: [47.92, 106.92],
  'Washington D.C.': [38.91, -77.04],
  'New York': [40.71, -74.01],
  'Los Angeles': [34.05, -118.24],
  Chicago: [41.88, -87.63],
  Miami: [25.76, -80.19],
  'San Francisco': [37.77, -122.42],
  Ottawa: [45.42, -75.7],
  Toronto: [43.65, -79.38],
  Vancouver: [49.28, -123.12],
  Montreal: [45.5, -73.57],
  'Mexico City': [19.43, -99.13],
  Cancun: [21.16, -86.85],
  Havana: [23.11, -82.37],
  'Santo Domingo': [18.49, -69.93],
  'San Jose': [9.93, -84.09],
  'Panama City': [8.98, -79.52],
  Bogota: [4.71, -74.07],
  Medellin: [6.24, -75.58],
  Lima: [-12.05, -77.04],
  Santiago: [-33.45, -70.67],
  'Buenos Aires': [-34.6, -58.38],
  Brasilia: [-15.79, -47.88],
  'São Paulo': [-23.55, -46.63],
  'Rio de Janeiro': [-22.91, -43.17],
  Montevideo: [-34.9, -56.16],
  Asuncion: [-25.26, -57.58],
  Caracas: [10.48, -66.9],
  Quito: [-0.18, -78.47],
  Pretoria: [-25.75, 28.19],
  'Cape Town': [-33.92, 18.42],
  Johannesburg: [-26.2, 28.04],
  Nairobi: [-1.29, 36.82],
  'Addis Ababa': [9.03, 38.75],
  Abuja: [9.08, 7.4],
  Lagos: [6.52, 3.38],
  Accra: [5.6, -0.19],
  Kigali: [-1.94, 30.06],
  Zanzibar: [-6.16, 39.2],
  Dakar: [14.72, -17.47],
  Canberra: [-35.28, 149.13],
  Sydney: [-33.87, 151.21],
  Melbourne: [-37.81, 144.96],
  Wellington: [-41.29, 174.78],
  Auckland: [-36.85, 174.76]
};

const BASE_WORLD_HUBS: WorldHub[] = [
  // ==========================================
  // TÜRKİYE & AVRUPA BAŞKENTLERİ VE HUB'LARI
  // ==========================================
  { city: 'Istanbul', cityTr: 'İstanbul', flag: '🇹🇷', tz: 'Europe/Istanbul', country: { tr: 'Türkiye', en: 'Turkey', de: 'Türkei', es: 'Turquía', ru: 'Турция' }, region: 'Europe' },
  { city: 'Ankara', cityTr: 'Ankara', flag: '🇹🇷', tz: 'Europe/Istanbul', country: { tr: 'Türkiye', en: 'Turkey', de: 'Türkei', es: 'Turquía', ru: 'Турция' }, region: 'Europe' },
  { city: 'Antalya', cityTr: 'Antalya', flag: '🇹🇷', tz: 'Europe/Istanbul', country: { tr: 'Türkiye', en: 'Turkey', de: 'Türkei', es: 'Turquía', ru: 'Турция' }, region: 'Europe' },
  { city: 'London', cityTr: 'Londra', flag: '🇬🇧', tz: 'Europe/London', country: { tr: 'Birleşik Krallık', en: 'United Kingdom', de: 'Großbritannien', es: 'Reino Unido', ru: 'Великобритания' }, region: 'Europe' },
  { city: 'Paris', cityTr: 'Paris', flag: '🇫🇷', tz: 'Europe/Paris', country: { tr: 'Fransa', en: 'France', de: 'Frankreich', es: 'Francia', ru: 'Франция' }, region: 'Europe' },
  { city: 'Berlin', cityTr: 'Berlin', flag: '🇩🇪', tz: 'Europe/Berlin', country: { tr: 'Almanya', en: 'Germany', de: 'Deutschland', es: 'Alemania', ru: 'Германия' }, region: 'Europe' },
  { city: 'Frankfurt', cityTr: 'Frankfurt', flag: '🇩🇪', tz: 'Europe/Berlin', country: { tr: 'Almanya', en: 'Germany', de: 'Deutschland', es: 'Alemania', ru: 'Германия' }, region: 'Europe' },
  { city: 'Munich', cityTr: 'Münih', flag: '🇩🇪', tz: 'Europe/Berlin', country: { tr: 'Almanya', en: 'Germany', de: 'Deutschland', es: 'Alemania', ru: 'Германия' }, region: 'Europe' },
  { city: 'Rome', cityTr: 'Roma', flag: '🇮🇹', tz: 'Europe/Rome', country: { tr: 'İtalya', en: 'Italy', de: 'Italien', es: 'Italia', ru: 'Италия' }, region: 'Europe' },
  { city: 'Milan', cityTr: 'Milano', flag: '🇮🇹', tz: 'Europe/Rome', country: { tr: 'İtalya', en: 'Italy', de: 'Italien', es: 'Italia', ru: 'Италия' }, region: 'Europe' },
  { city: 'Madrid', cityTr: 'Madrid', flag: '🇪🇸', tz: 'Europe/Madrid', country: { tr: 'İspanya', en: 'Spain', de: 'Spanien', es: 'España', ru: 'Испания' }, region: 'Europe' },
  { city: 'Barcelona', cityTr: 'Barselona', flag: '🇪🇸', tz: 'Europe/Madrid', country: { tr: 'İspanya', en: 'Spain', de: 'Spanien', es: 'España', ru: 'Испания' }, region: 'Europe' },
  { city: 'Amsterdam', cityTr: 'Amsterdam', flag: '🇳🇱', tz: 'Europe/Amsterdam', country: { tr: 'Hollanda', en: 'Netherlands', de: 'Niederlande', es: 'Países Bajos', ru: 'Нидерланды' }, region: 'Europe' },
  { city: 'Brussels', cityTr: 'Brüksel', flag: '🇧🇪', tz: 'Europe/Brussels', country: { tr: 'Belçika', en: 'Belgium', de: 'Belgien', es: 'Bélgica', ru: 'Бельгия' }, region: 'Europe' },
  { city: 'Vienna', cityTr: 'Viyana', flag: '🇦🇹', tz: 'Europe/Vienna', country: { tr: 'Avusturya', en: 'Austria', de: 'Österreich', es: 'Austria', ru: 'Австрия' }, region: 'Europe' },
  { city: 'Bern', cityTr: 'Bern', flag: '🇨🇭', tz: 'Europe/Zurich', country: { tr: 'İsviçre', en: 'Switzerland', de: 'Schweiz', es: 'Suiza', ru: 'Швейцария' }, region: 'Europe' },
  { city: 'Zurich', cityTr: 'Zürih', flag: '🇨🇭', tz: 'Europe/Zurich', country: { tr: 'İsviçre', en: 'Switzerland', de: 'Schweiz', es: 'Suiza', ru: 'Швейцария' }, region: 'Europe' },
  { city: 'Geneva', cityTr: 'Cenevre', flag: '🇨🇭', tz: 'Europe/Zurich', country: { tr: 'İsviçre', en: 'Switzerland', de: 'Schweiz', es: 'Suiza', ru: 'Швейцария' }, region: 'Europe' },
  { city: 'Athens', cityTr: 'Atina', flag: '🇬🇷', tz: 'Europe/Athens', country: { tr: 'Yunanistan', en: 'Greece', de: 'Griechenland', es: 'Grecia', ru: 'Греция' }, region: 'Europe' },
  { city: 'Lisbon', cityTr: 'Lizbon', flag: '🇵🇹', tz: 'Europe/Lisbon', country: { tr: 'Portekiz', en: 'Portugal', de: 'Portugal', es: 'Portugal', ru: 'Португалия' }, region: 'Europe' },
  { city: 'Dublin', cityTr: 'Dublin', flag: '🇮🇪', tz: 'Europe/Dublin', country: { tr: 'İrlanda', en: 'Ireland', de: 'Irland', es: 'Irlanda', ru: 'Ирландия' }, region: 'Europe' },
  { city: 'Prague', cityTr: 'Prag', flag: '🇨🇿', tz: 'Europe/Prague', country: { tr: 'Çekya', en: 'Czech Republic', de: 'Tschechien', es: 'Chequia', ru: 'Чехия' }, region: 'Europe' },
  { city: 'Warsaw', cityTr: 'Varşova', flag: '🇵🇱', tz: 'Europe/Warsaw', country: { tr: 'Polonya', en: 'Poland', de: 'Polen', es: 'Polonia', ru: 'Польша' }, region: 'Europe' },
  { city: 'Budapest', cityTr: 'Budapeşte', flag: '🇭🇺', tz: 'Europe/Budapest', country: { tr: 'Macaristan', en: 'Hungary', de: 'Ungarn', es: 'Hungría', ru: 'Венгрия' }, region: 'Europe' },
  { city: 'Bratislava', cityTr: 'Bratislava', flag: '🇸🇰', tz: 'Europe/Bratislava', country: { tr: 'Slovakya', en: 'Slovakia', de: 'Slowakei', es: 'Eslovaquia', ru: 'Словакия' }, region: 'Europe' },
  { city: 'Ljubljana', cityTr: 'Ljubljana', flag: '🇸🇮', tz: 'Europe/Ljubljana', country: { tr: 'Slovenya', en: 'Slovenia', de: 'Slowenien', es: 'Eslovenia', ru: 'Словения' }, region: 'Europe' },
  { city: 'Zagreb', cityTr: 'Zagreb', flag: '🇭🇷', tz: 'Europe/Zagreb', country: { tr: 'Hırvatistan', en: 'Croatia', de: 'Kroatien', es: 'Croacia', ru: 'Хорватия' }, region: 'Europe' },
  { city: 'Dubrovnik', cityTr: 'Dubrovnik', flag: '🇭🇷', tz: 'Europe/Zagreb', country: { tr: 'Hırvatistan', en: 'Croatia', de: 'Kroatien', es: 'Croacia', ru: 'Хорватия' }, region: 'Europe' },
  { city: 'Belgrade', cityTr: 'Belgrad', flag: '🇷🇸', tz: 'Europe/Belgrade', country: { tr: 'Sırbistan', en: 'Serbia', de: 'Serbien', es: 'Serbia', ru: 'Сербия' }, region: 'Europe' },
  { city: 'Sarajevo', cityTr: 'Saraybosna', flag: '🇧🇦', tz: 'Europe/Sarajevo', country: { tr: 'Bosna-Hersek', en: 'Bosnia & Herzegovina', de: 'Bosnien-Herzegowina', es: 'Bosnia y Herzegovina', ru: 'Босния и Герцеговина' }, region: 'Europe' },
  { city: 'Podgorica', cityTr: 'Podgorica', flag: '🇲🇪', tz: 'Europe/Podgorica', country: { tr: 'Karadağ', en: 'Montenegro', de: 'Montenegro', es: 'Montenegro', ru: 'Черногория' }, region: 'Europe' },
  { city: 'Budva', cityTr: 'Budva', flag: '🇲🇪', tz: 'Europe/Podgorica', country: { tr: 'Karadağ', en: 'Montenegro', de: 'Montenegro', es: 'Montenegro', ru: 'Черногория' }, region: 'Europe' },
  { city: 'Tirana', cityTr: 'Tiran', flag: '🇦🇱', tz: 'Europe/Tirane', country: { tr: 'Arnavutluk', en: 'Albania', de: 'Albanien', es: 'Albania', ru: 'Албания' }, region: 'Europe' },
  { city: 'Skopje', cityTr: 'Üsküp', flag: '🇲🇰', tz: 'Europe/Skopje', country: { tr: 'Kuzey Makedonya', en: 'North Macedonia', de: 'Nordmazedonien', es: 'Macedonia del Norte', ru: 'Северная Македония' }, region: 'Europe' },
  { city: 'Pristina', cityTr: 'Priştine', flag: '🇽🇰', tz: 'Europe/Belgrade', country: { tr: 'Kosova', en: 'Kosovo', de: 'Kosovo', es: 'Kosovo', ru: 'Косово' }, region: 'Europe' },
  { city: 'Sofia', cityTr: 'Sofya', flag: '🇧🇬', tz: 'Europe/Sofia', country: { tr: 'Bulgaristan', en: 'Bulgaria', de: 'Bulgarien', es: 'Bulgaria', ru: 'Болгария' }, region: 'Europe' },
  { city: 'Bucharest', cityTr: 'Bükreş', flag: '🇷🇴', tz: 'Europe/Bucharest', country: { tr: 'Romanya', en: 'Romania', de: 'Rumänien', es: 'Rumania', ru: 'Румыния' }, region: 'Europe' },
  { city: 'Chisinau', cityTr: 'Kişinev', flag: '🇲🇩', tz: 'Europe/Chisinau', country: { tr: 'Moldova', en: 'Moldova', de: 'Moldawien', es: 'Moldavia', ru: 'Молдова' }, region: 'Europe' },
  { city: 'Kyiv', cityTr: 'Kiev', flag: '🇺🇦', tz: 'Europe/Kyiv', country: { tr: 'Ukrayna', en: 'Ukraine', de: 'Ukraine', es: 'Ucrania', ru: 'Украина' }, region: 'Europe' },
  { city: 'Minsk', cityTr: 'Minsk', flag: '🇧🇾', tz: 'Europe/Minsk', country: { tr: 'Belarus', en: 'Belarus', de: 'Belarus', es: 'Bielorrusia', ru: 'Беларусь' }, region: 'Europe' },
  { city: 'Moscow', cityTr: 'Moskova', flag: '🇷🇺', tz: 'Europe/Moscow', country: { tr: 'Rusya', en: 'Russia', de: 'Russland', es: 'Rusia', ru: 'Россия' }, region: 'Europe' },
  { city: 'Stockholm', cityTr: 'Stokholm', flag: '🇸🇪', tz: 'Europe/Stockholm', country: { tr: 'İsveç', en: 'Sweden', de: 'Schweden', es: 'Suecia', ru: 'Швеция' }, region: 'Europe' },
  { city: 'Oslo', cityTr: 'Oslo', flag: '🇳🇴', tz: 'Europe/Oslo', country: { tr: 'Norveç', en: 'Norway', de: 'Norwegen', es: 'Noruega', ru: 'Норвегия' }, region: 'Europe' },
  { city: 'Copenhagen', cityTr: 'Kopenhag', flag: '🇩🇰', tz: 'Europe/Copenhagen', country: { tr: 'Danimarka', en: 'Denmark', de: 'Dänemark', es: 'Dinamarca', ru: 'Дания' }, region: 'Europe' },
  { city: 'Helsinki', cityTr: 'Helsinki', flag: '🇫🇮', tz: 'Europe/Helsinki', country: { tr: 'Finlandiya', en: 'Finland', de: 'Finnland', es: 'Finlandia', ru: 'Финляндия' }, region: 'Europe' },
  { city: 'Tallinn', cityTr: 'Tallinn', flag: '🇪🇪', tz: 'Europe/Tallinn', country: { tr: 'Estonya', en: 'Estonia', de: 'Estland', es: 'Estonia', ru: 'Эстония' }, region: 'Europe' },
  { city: 'Riga', cityTr: 'Riga', flag: '🇱🇻', tz: 'Europe/Riga', country: { tr: 'Letonya', en: 'Latvia', de: 'Lettland', es: 'Letonia', ru: 'Латвия' }, region: 'Europe' },
  { city: 'Vilnius', cityTr: 'Vilnius', flag: '🇱🇹', tz: 'Europe/Vilnius', country: { tr: 'Litvanya', en: 'Lithuania', de: 'Litauen', es: 'Lituania', ru: 'Литва' }, region: 'Europe' },
  { city: 'Reykjavik', cityTr: 'Reykjavik', flag: '🇮🇸', tz: 'Atlantic/Reykjavik', country: { tr: 'İzlanda', en: 'Iceland', de: 'Island', es: 'Islandia', ru: 'Исландия' }, region: 'Europe' },
  { city: 'Nicosia', cityTr: 'Lefkoşa', flag: '🇨🇾', tz: 'Asia/Nicosia', country: { tr: 'Kıbrıs', en: 'Cyprus', de: 'Zypern', es: 'Chipre', ru: 'Кипр' }, region: 'Europe' },
  { city: 'Valletta', cityTr: 'Valletta', flag: '🇲🇹', tz: 'Europe/Malta', country: { tr: 'Malta', en: 'Malta', de: 'Malta', es: 'Malta', ru: 'Мальта' }, region: 'Europe' },
  { city: 'Tbilisi', cityTr: 'Tiflis', flag: '🇬🇪', tz: 'Asia/Tbilisi', country: { tr: 'Gürcistan', en: 'Georgia', de: 'Georgien', es: 'Georgia', ru: 'Грузия' }, region: 'Europe' },
  { city: 'Batumi', cityTr: 'Batum', flag: '🇬🇪', tz: 'Asia/Tbilisi', country: { tr: 'Gürcistan', en: 'Georgia', de: 'Georgien', es: 'Georgia', ru: 'Грузия' }, region: 'Europe' },
  { city: 'Baku', cityTr: 'Bakü', flag: '🇦🇿', tz: 'Asia/Baku', country: { tr: 'Azerbaycan', en: 'Azerbaijan', de: 'Aserbaidschan', es: 'Azerbaiyán', ru: 'Азербайджан' }, region: 'Europe' },
  { city: 'Yerevan', cityTr: 'Erivan', flag: '🇦🇲', tz: 'Asia/Yerevan', country: { tr: 'Ermenistan', en: 'Armenia', de: 'Armenien', es: 'Armenia', ru: 'Армения' }, region: 'Europe' },

  // ==========================================
  // ORTA ASYA & KAFKASLAR
  // ==========================================
  { city: 'Astana', cityTr: 'Astana', flag: '🇰🇿', tz: 'Asia/Almaty', country: { tr: 'Kazakistan', en: 'Kazakhstan', de: 'Kasachstan', es: 'Kazajistán', ru: 'Казахстан' }, region: 'Asia' },
  { city: 'Almaty', cityTr: 'Almatı', flag: '🇰🇿', tz: 'Asia/Almaty', country: { tr: 'Kazakistan', en: 'Kazakhstan', de: 'Kasachstan', es: 'Kazajistán', ru: 'Казахстан' }, region: 'Asia' },
  { city: 'Tashkent', cityTr: 'Taşkent', flag: '🇺🇿', tz: 'Asia/Tashkent', country: { tr: 'Özbekistan', en: 'Uzbekistan', de: 'Usbekistan', es: 'Uzbekistán', ru: 'Узбекистан' }, region: 'Asia' },
  { city: 'Samarkand', cityTr: 'Semerkant', flag: '🇺🇿', tz: 'Asia/Tashkent', country: { tr: 'Özbekistan', en: 'Uzbekistan', de: 'Usbekistan', es: 'Uzbekistán', ru: 'Узбекистан' }, region: 'Asia' },
  { city: 'Bishkek', cityTr: 'Bişkek', flag: '🇰🇬', tz: 'Asia/Bishkek', country: { tr: 'Kırgızistan', en: 'Kyrgyzstan', de: 'Kirgisistan', es: 'Kirguistán', ru: 'Кыргызстан' }, region: 'Asia' },
  { city: 'Dushanbe', cityTr: 'Duşanbe', flag: '🇹🇯', tz: 'Asia/Dushanbe', country: { tr: 'Tacikistan', en: 'Tajikistan', de: 'Tadschikistan', es: 'Tayikistán', ru: 'Таджикистан' }, region: 'Asia' },
  { city: 'Ashgabat', cityTr: 'Aşkabat', flag: '🇹🇲', tz: 'Asia/Ashgabat', country: { tr: 'Türkmenistan', en: 'Turkmenistan', de: 'Turkmenistan', es: 'Turkmenistán', ru: 'Туркменистан' }, region: 'Asia' },

  // ==========================================
  // ORTA DOĞU & KUZEY AFRİKA
  // ==========================================
  { city: 'Dubai', cityTr: 'Dubai', flag: '🇦🇪', tz: 'Asia/Dubai', country: { tr: 'Birleşik Arap Emirlikleri', en: 'UAE', de: 'VAE', es: 'EAU', ru: 'ОАЭ' }, region: 'Middle East' },
  { city: 'Abu Dhabi', cityTr: 'Abu Dabi', flag: '🇦🇪', tz: 'Asia/Dubai', country: { tr: 'Birleşik Arap Emirlikleri', en: 'UAE', de: 'VAE', es: 'EAU', ru: 'ОАЭ' }, region: 'Middle East' },
  { city: 'Doha', cityTr: 'Doha', flag: '🇶🇦', tz: 'Asia/Qatar', country: { tr: 'Katar', en: 'Qatar', de: 'Katar', es: 'Catar', ru: 'Катар' }, region: 'Middle East' },
  { city: 'Riyadh', cityTr: 'Riyad', flag: '🇸🇦', tz: 'Asia/Riyadh', country: { tr: 'Suudi Arabistan', en: 'Saudi Arabia', de: 'Saudi-Arabien', es: 'Arabia Saudita', ru: 'Саудовская Аравия' }, region: 'Middle East' },
  { city: 'Jeddah', cityTr: 'Cidde', flag: '🇸🇦', tz: 'Asia/Riyadh', country: { tr: 'Suudi Arabistan', en: 'Saudi Arabia', de: 'Saudi-Arabien', es: 'Arabia Saudita', ru: 'Саудовская Аравия' }, region: 'Middle East' },
  { city: 'Kuwait City', cityTr: 'Kuveyt', flag: '🇰🇼', tz: 'Asia/Kuwait', country: { tr: 'Kuveyt', en: 'Kuwait', de: 'Kuwait', es: 'Kuwait', ru: 'Кувейт' }, region: 'Middle East' },
  { city: 'Manama', cityTr: 'Manama', flag: '🇧🇭', tz: 'Asia/Bahrain', country: { tr: 'Bahreyn', en: 'Bahrain', de: 'Bahrain', es: 'Baréin', ru: 'Бахрейн' }, region: 'Middle East' },
  { city: 'Muscat', cityTr: 'Muskat', flag: '🇴🇲', tz: 'Asia/Muscat', country: { tr: 'Umman', en: 'Oman', de: 'Oman', es: 'Omán', ru: 'Оман' }, region: 'Middle East' },
  { city: 'Amman', cityTr: 'Amman', flag: '🇯🇴', tz: 'Asia/Amman', country: { tr: 'Ürdün', en: 'Jordan', de: 'Jordanien', es: 'Jordania', ru: 'Иордания' }, region: 'Middle East' },
  { city: 'Beirut', cityTr: 'Beyrut', flag: '🇱🇧', tz: 'Asia/Beirut', country: { tr: 'Lübnan', en: 'Lebanon', de: 'Libanon', es: 'Líbano', ru: 'Ливан' }, region: 'Middle East' },
  { city: 'Jerusalem', cityTr: 'Kudüs', flag: '🇮🇱', tz: 'Asia/Jerusalem', country: { tr: 'İsrail', en: 'Israel', de: 'Israel', es: 'Israel', ru: 'Израиль' }, region: 'Middle East' },
  { city: 'Tel Aviv', cityTr: 'Tel Aviv', flag: '🇮🇱', tz: 'Asia/Jerusalem', country: { tr: 'İsrail', en: 'Israel', de: 'Israel', es: 'Israel', ru: 'Израиль' }, region: 'Middle East' },
  { city: 'Baghdad', cityTr: 'Bağdat', flag: '🇮🇶', tz: 'Asia/Baghdad', country: { tr: 'Irak', en: 'Iraq', de: 'Irak', es: 'Irak', ru: 'Ирак' }, region: 'Middle East' },
  { city: 'Tehran', cityTr: 'Tahran', flag: '🇮🇷', tz: 'Asia/Tehran', country: { tr: 'İran', en: 'Iran', de: 'Iran', es: 'Irán', ru: 'Иран' }, region: 'Middle East' },
  { city: 'Cairo', cityTr: 'Kahire', flag: '🇪🇬', tz: 'Africa/Cairo', country: { tr: 'Mısır', en: 'Egypt', de: 'Ägypten', es: 'Egipto', ru: 'Египет' }, region: 'Africa' },
  { city: 'Sharm El Sheikh', cityTr: 'Şarm El-Şeyh', flag: '🇪🇬', tz: 'Africa/Cairo', country: { tr: 'Mısır', en: 'Egypt', de: 'Ägypten', es: 'Egipto', ru: 'Египет' }, region: 'Africa' },
  { city: 'Rabat', cityTr: 'Rabat', flag: '🇲🇦', tz: 'Africa/Casablanca', country: { tr: 'Fas', en: 'Morocco', de: 'Marokko', es: 'Marruecos', ru: 'Марокко' }, region: 'Africa' },
  { city: 'Casablanca', cityTr: 'Kazablanka', flag: '🇲🇦', tz: 'Africa/Casablanca', country: { tr: 'Fas', en: 'Morocco', de: 'Marokko', es: 'Marruecos', ru: 'Марокко' }, region: 'Africa' },
  { city: 'Marrakech', cityTr: 'Marakeş', flag: '🇲🇦', tz: 'Africa/Casablanca', country: { tr: 'Fas', en: 'Morocco', de: 'Marokko', es: 'Marruecos', ru: 'Марокко' }, region: 'Africa' },
  { city: 'Tunis', cityTr: 'Tunus', flag: '🇹🇳', tz: 'Africa/Tunis', country: { tr: 'Tunus', en: 'Tunisia', de: 'Tunesien', es: 'Túnez', ru: 'Тунис' }, region: 'Africa' },
  { city: 'Algiers', cityTr: 'Cezayir', flag: '🇩🇿', tz: 'Africa/Algiers', country: { tr: 'Cezayir', en: 'Algeria', de: 'Algerien', es: 'Argelia', ru: 'Алжир' }, region: 'Africa' },

  // ==========================================
  // ASYA & PASİFİK
  // ==========================================
  { city: 'Tokyo', cityTr: 'Tokyo', flag: '🇯🇵', tz: 'Asia/Tokyo', country: { tr: 'Japonya', en: 'Japan', de: 'Japan', es: 'Japón', ru: 'Япония' }, region: 'Asia' },
  { city: 'Kyoto', cityTr: 'Kyoto', flag: '🇯🇵', tz: 'Asia/Tokyo', country: { tr: 'Japonya', en: 'Japan', de: 'Japan', es: 'Japón', ru: 'Япония' }, region: 'Asia' },
  { city: 'Osaka', cityTr: 'Osaka', flag: '🇯🇵', tz: 'Asia/Tokyo', country: { tr: 'Japonya', en: 'Japan', de: 'Japan', es: 'Japón', ru: 'Япония' }, region: 'Asia' },
  { city: 'Seoul', cityTr: 'Seul', flag: '🇰🇷', tz: 'Asia/Seoul', country: { tr: 'Güney Kore', en: 'South Korea', de: 'Südkorea', es: 'Corea del Sur', ru: 'Южная Корея' }, region: 'Asia' },
  { city: 'Beijing', cityTr: 'Pekin', flag: '🇨🇳', tz: 'Asia/Shanghai', country: { tr: 'Çin', en: 'China', de: 'China', es: 'China', ru: 'Китай' }, region: 'Asia' },
  { city: 'Shanghai', cityTr: 'Şanghay', flag: '🇨🇳', tz: 'Asia/Shanghai', country: { tr: 'Çin', en: 'China', de: 'China', es: 'China', ru: 'Китай' }, region: 'Asia' },
  { city: 'Hong Kong', cityTr: 'Hong Kong', flag: '🇭🇰', tz: 'Asia/Hong_Kong', country: { tr: 'Hong Kong', en: 'Hong Kong', de: 'Hongkong', es: 'Hong Kong', ru: 'Гонконг' }, region: 'Asia' },
  { city: 'Taipei', cityTr: 'Taipei', flag: '🇹🇼', tz: 'Asia/Taipei', country: { tr: 'Tayvan', en: 'Taiwan', de: 'Taiwan', es: 'Taiwán', ru: 'Тайвань' }, region: 'Asia' },
  { city: 'Bangkok', cityTr: 'Bangkok', flag: '🇹🇭', tz: 'Asia/Bangkok', country: { tr: 'Tayland', en: 'Thailand', de: 'Thailand', es: 'Tailandia', ru: 'Таиланд' }, region: 'Asia' },
  { city: 'Phuket', cityTr: 'Phuket', flag: '🇹🇭', tz: 'Asia/Bangkok', country: { tr: 'Tayland', en: 'Thailand', de: 'Thailand', es: 'Tailandia', ru: 'Таиланд' }, region: 'Asia' },
  { city: 'Chiang Mai', cityTr: 'Chiang Mai', flag: '🇹🇭', tz: 'Asia/Bangkok', country: { tr: 'Tayland', en: 'Thailand', de: 'Thailand', es: 'Tailandia', ru: 'Таиланд' }, region: 'Asia' },
  { city: 'Singapore', cityTr: 'Singapur', flag: '🇸🇬', tz: 'Asia/Singapore', country: { tr: 'Singapur', en: 'Singapore', de: 'Singapur', es: 'Singapur', ru: 'Сингапур' }, region: 'Asia' },
  { city: 'Kuala Lumpur', cityTr: 'Kuala Lumpur', flag: '🇲🇾', tz: 'Asia/Kuala_Lumpur', country: { tr: 'Malezya', en: 'Malaysia', de: 'Malaysia', es: 'Malasia', ru: 'Малайзия' }, region: 'Asia' },
  { city: 'Jakarta', cityTr: 'Cakarta', flag: '🇮🇩', tz: 'Asia/Jakarta', country: { tr: 'Endonezya', en: 'Indonesia', de: 'Indonesien', es: 'Indonesia', ru: 'Индонезия' }, region: 'Asia' },
  { city: 'Bali (Denpasar)', cityTr: 'Bali', flag: '🇮🇩', tz: 'Asia/Makassar', country: { tr: 'Endonezya', en: 'Indonesia', de: 'Indonesien', es: 'Indonesia', ru: 'Индонезия' }, region: 'Asia' },
  { city: 'Manila', cityTr: 'Manila', flag: '🇵🇭', tz: 'Asia/Manila', country: { tr: 'Filipinler', en: 'Philippines', de: 'Philippinen', es: 'Filipinas', ru: 'Филиппины' }, region: 'Asia' },
  { city: 'Hanoi', cityTr: 'Hanoi', flag: '🇻🇳', tz: 'Asia/Bangkok', country: { tr: 'Vietnam', en: 'Vietnam', de: 'Vietnam', es: 'Vietnam', ru: 'Вьетнам' }, region: 'Asia' },
  { city: 'Ho Chi Minh City', cityTr: 'Ho Chi Minh', flag: '🇻🇳', tz: 'Asia/Bangkok', country: { tr: 'Vietnam', en: 'Vietnam', de: 'Vietnam', es: 'Vietnam', ru: 'Вьетнам' }, region: 'Asia' },
  { city: 'Phnom Penh', cityTr: 'Phnom Penh', flag: '🇰🇭', tz: 'Asia/Bangkok', country: { tr: 'Kamboçya', en: 'Cambodia', de: 'Kambodscha', es: 'Camboya', ru: 'Камбоджа' }, region: 'Asia' },
  { city: 'New Delhi', cityTr: 'Yeni Delhi', flag: '🇮🇳', tz: 'Asia/Kolkata', country: { tr: 'Hindistan', en: 'India', de: 'Indien', es: 'India', ru: 'Индия' }, region: 'Asia' },
  { city: 'Mumbai', cityTr: 'Mumbai', flag: '🇮🇳', tz: 'Asia/Kolkata', country: { tr: 'Hindistan', en: 'India', de: 'Indien', es: 'India', ru: 'Индия' }, region: 'Asia' },
  { city: 'Islamabad', cityTr: 'İslamabad', flag: '🇵🇰', tz: 'Asia/Karachi', country: { tr: 'Pakistan', en: 'Pakistan', de: 'Pakistan', es: 'Pakistán', ru: 'Пакистан' }, region: 'Asia' },
  { city: 'Dhaka', cityTr: 'Dakka', flag: '🇧🇩', tz: 'Asia/Dhaka', country: { tr: 'Bangladeş', en: 'Bangladesh', de: 'Bangladesch', es: 'Bangladés', ru: 'Бангладеш' }, region: 'Asia' },
  { city: 'Colombo', cityTr: 'Kolombo', flag: '🇱🇰', tz: 'Asia/Colombo', country: { tr: 'Sri Lanka', en: 'Sri Lanka', de: 'Sri Lanka', es: 'Sri Lanka', ru: 'Шри-Ланка' }, region: 'Asia' },
  { city: 'Kathmandu', cityTr: 'Katmandu', flag: '🇳🇵', tz: 'Asia/Kathmandu', country: { tr: 'Nepal', en: 'Nepal', de: 'Nepal', es: 'Nepal', ru: 'Непал' }, region: 'Asia' },
  { city: 'Male', cityTr: 'Male', flag: '🇲🇻', tz: 'Indian/Maldives', country: { tr: 'Maldivler', en: 'Maldives', de: 'Malediven', es: 'Maldivas', ru: 'Мальдивы' }, region: 'Asia' },
  { city: 'Ulaanbaatar', cityTr: 'Ulan Batur', flag: '🇲🇳', tz: 'Asia/Ulaanbaatar', country: { tr: 'Moğolistan', en: 'Mongolia', de: 'Mongolei', es: 'Mongolia', ru: 'Монголия' }, region: 'Asia' },

  // ==========================================
  // AMERİKA KITASI (KUZEY, ORTA, GÜNEY)
  // ==========================================
  { city: 'Washington D.C.', cityTr: 'Vaşington', flag: '🇺🇸', tz: 'America/New_York', country: { tr: 'ABD', en: 'USA', de: 'USA', es: 'EE. UU.', ru: 'США' }, region: 'Americas' },
  { city: 'New York', cityTr: 'New York', flag: '🇺🇸', tz: 'America/New_York', country: { tr: 'ABD', en: 'USA', de: 'USA', es: 'EE. UU.', ru: 'США' }, region: 'Americas' },
  { city: 'Los Angeles', cityTr: 'Los Angeles', flag: '🇺🇸', tz: 'America/Los_Angeles', country: { tr: 'ABD', en: 'USA', de: 'USA', es: 'EE. UU.', ru: 'США' }, region: 'Americas' },
  { city: 'Chicago', cityTr: 'Şikago', flag: '🇺🇸', tz: 'America/Chicago', country: { tr: 'ABD', en: 'USA', de: 'USA', es: 'EE. UU.', ru: 'США' }, region: 'Americas' },
  { city: 'Miami', cityTr: 'Miami', flag: '🇺🇸', tz: 'America/New_York', country: { tr: 'ABD', en: 'USA', de: 'USA', es: 'EE. UU.', ru: 'США' }, region: 'Americas' },
  { city: 'San Francisco', cityTr: 'San Francisco', flag: '🇺🇸', tz: 'America/Los_Angeles', country: { tr: 'ABD', en: 'USA', de: 'USA', es: 'EE. UU.', ru: 'США' }, region: 'Americas' },
  { city: 'Ottawa', cityTr: 'Ottawa', flag: '🇨🇦', tz: 'America/Toronto', country: { tr: 'Kanada', en: 'Canada', de: 'Kanada', es: 'Canadá', ru: 'Канада' }, region: 'Americas' },
  { city: 'Toronto', cityTr: 'Toronto', flag: '🇨🇦', tz: 'America/Toronto', country: { tr: 'Kanada', en: 'Canada', de: 'Kanada', es: 'Canadá', ru: 'Канада' }, region: 'Americas' },
  { city: 'Vancouver', cityTr: 'Vancouver', flag: '🇨🇦', tz: 'America/Vancouver', country: { tr: 'Kanada', en: 'Canada', de: 'Kanada', es: 'Canadá', ru: 'Канада' }, region: 'Americas' },
  { city: 'Montreal', cityTr: 'Montreal', flag: '🇨🇦', tz: 'America/Toronto', country: { tr: 'Kanada', en: 'Canada', de: 'Kanada', es: 'Canadá', ru: 'Канада' }, region: 'Americas' },
  { city: 'Mexico City', cityTr: 'Meksiko', flag: '🇲🇽', tz: 'America/Mexico_City', country: { tr: 'Meksika', en: 'Mexico', de: 'Mexiko', es: 'México', ru: 'Мексика' }, region: 'Americas' },
  { city: 'Cancun', cityTr: 'Kankun', flag: '🇲🇽', tz: 'America/Cancun', country: { tr: 'Meksika', en: 'Mexico', de: 'Mexiko', es: 'México', ru: 'Мексика' }, region: 'Americas' },
  { city: 'Havana', cityTr: 'Havana', flag: '🇨🇺', tz: 'America/Havana', country: { tr: 'Küba', en: 'Cuba', de: 'Kuba', es: 'Cuba', ru: 'Куба' }, region: 'Americas' },
  { city: 'Santo Domingo', cityTr: 'Santo Domingo', flag: '🇩🇴', tz: 'America/Santo_Domingo', country: { tr: 'Dominik Cumhuriyeti', en: 'Dominican Republic', de: 'Dominikanische Republik', es: 'República Dominicana', ru: 'Доминиканская Республика' }, region: 'Americas' },
  { city: 'San Jose', cityTr: 'San Jose', flag: '🇨🇷', tz: 'America/Costa_Rica', country: { tr: 'Kosta Rika', en: 'Costa Rica', de: 'Costa Rica', es: 'Costa Rica', ru: 'Коста-Рика' }, region: 'Americas' },
  { city: 'Panama City', cityTr: 'Panama', flag: '🇵🇦', tz: 'America/Panama', country: { tr: 'Panama', en: 'Panama', de: 'Panama', es: 'Panamá', ru: 'Панама' }, region: 'Americas' },
  { city: 'Bogota', cityTr: 'Bogota', flag: '🇨🇴', tz: 'America/Bogota', country: { tr: 'Kolombiya', en: 'Colombia', de: 'Kolumbien', es: 'Colombia', ru: 'Колумбия' }, region: 'Americas' },
  { city: 'Medellin', cityTr: 'Medellin', flag: '🇨🇴', tz: 'America/Bogota', country: { tr: 'Kolombiya', en: 'Colombia', de: 'Kolumbien', es: 'Colombia', ru: 'Колумбия' }, region: 'Americas' },
  { city: 'Lima', cityTr: 'Lima', flag: '🇵🇪', tz: 'America/Lima', country: { tr: 'Peru', en: 'Peru', de: 'Peru', es: 'Perú', ru: 'Перу' }, region: 'Americas' },
  { city: 'Santiago', cityTr: 'Santiago', flag: '🇨🇱', tz: 'America/Santiago', country: { tr: 'Şili', en: 'Chile', de: 'Chile', es: 'Chile', ru: 'Чили' }, region: 'Americas' },
  { city: 'Buenos Aires', cityTr: 'Buenos Aires', flag: '🇦🇷', tz: 'America/Argentina/Buenos_Aires', country: { tr: 'Arjantin', en: 'Argentina', de: 'Argentinien', es: 'Argentina', ru: 'Аргентина' }, region: 'Americas' },
  { city: 'Brasilia', cityTr: 'Brezilya', flag: '🇧🇷', tz: 'America/Sao_Paulo', country: { tr: 'Brezilya', en: 'Brazil', de: 'Brasilien', es: 'Brasil', ru: 'Бразилия' }, region: 'Americas' },
  { city: 'São Paulo', cityTr: 'Sao Paulo', flag: '🇧🇷', tz: 'America/Sao_Paulo', country: { tr: 'Brezilya', en: 'Brazil', de: 'Brasilien', es: 'Brasil', ru: 'Бразилия' }, region: 'Americas' },
  { city: 'Rio de Janeiro', cityTr: 'Rio de Janeiro', flag: '🇧🇷', tz: 'America/Sao_Paulo', country: { tr: 'Brezilya', en: 'Brazil', de: 'Brasilien', es: 'Brasil', ru: 'Бразилия' }, region: 'Americas' },
  { city: 'Montevideo', cityTr: 'Montevideo', flag: '🇺🇾', tz: 'America/Montevideo', country: { tr: 'Uruguay', en: 'Uruguay', de: 'Uruguay', es: 'Uruguay', ru: 'Уругвай' }, region: 'Americas' },
  { city: 'Asuncion', cityTr: 'Asuncion', flag: '🇵🇾', tz: 'America/Asuncion', country: { tr: 'Paraguay', en: 'Paraguay', de: 'Paraguay', es: 'Paraguay', ru: 'Парагвай' }, region: 'Americas' },
  { city: 'Caracas', cityTr: 'Karakas', flag: '🇻🇪', tz: 'America/Caracas', country: { tr: 'Venezuela', en: 'Venezuela', de: 'Venezuela', es: 'Venezuela', ru: 'Венесуэла' }, region: 'Americas' },
  { city: 'Quito', cityTr: 'Kito', flag: '🇪🇨', tz: 'America/Guayaquil', country: { tr: 'Ekvador', en: 'Ecuador', de: 'Ecuador', es: 'Ecuador', ru: 'Эквадор' }, region: 'Americas' },

  // ==========================================
  // AFRİKA KITASI
  // ==========================================
  { city: 'Pretoria', cityTr: 'Pretoria', flag: '🇿🇦', tz: 'Africa/Johannesburg', country: { tr: 'Güney Afrika', en: 'South Africa', de: 'Südafrika', es: 'Sudáfrica', ru: 'ЮАР' }, region: 'Africa' },
  { city: 'Cape Town', cityTr: 'Cape Town', flag: '🇿🇦', tz: 'Africa/Johannesburg', country: { tr: 'Güney Afrika', en: 'South Africa', de: 'Südafrika', es: 'Sudáfrica', ru: 'ЮАР' }, region: 'Africa' },
  { city: 'Johannesburg', cityTr: 'Johannesburg', flag: '🇿🇦', tz: 'Africa/Johannesburg', country: { tr: 'Güney Afrika', en: 'South Africa', de: 'Südafrika', es: 'Sudáfrica', ru: 'ЮАР' }, region: 'Africa' },
  { city: 'Nairobi', cityTr: 'Nairobi', flag: '🇰🇪', tz: 'Africa/Nairobi', country: { tr: 'Kenya', en: 'Kenya', de: 'Kenia', es: 'Kenia', ru: 'Кения' }, region: 'Africa' },
  { city: 'Addis Ababa', cityTr: 'Addis Ababa', flag: '🇪🇹', tz: 'Africa/Addis_Ababa', country: { tr: 'Etiyopya', en: 'Ethiopia', de: 'Äthiopien', es: 'Etiopía', ru: 'Эфиопия' }, region: 'Africa' },
  { city: 'Abuja', cityTr: 'Abuja', flag: '🇳🇬', tz: 'Africa/Lagos', country: { tr: 'Nijerya', en: 'Nigeria', de: 'Nigeria', es: 'Nigeria', ru: 'Нигерия' }, region: 'Africa' },
  { city: 'Lagos', cityTr: 'Lagos', flag: '🇳🇬', tz: 'Africa/Lagos', country: { tr: 'Nijerya', en: 'Nigeria', de: 'Nigeria', es: 'Nigeria', ru: 'Нигерия' }, region: 'Africa' },
  { city: 'Accra', cityTr: 'Akra', flag: '🇬🇭', tz: 'Africa/Accra', country: { tr: 'Gana', en: 'Ghana', de: 'Ghana', es: 'Ghana', ru: 'Гана' }, region: 'Africa' },
  { city: 'Kigali', cityTr: 'Kigali', flag: '🇷🇼', tz: 'Africa/Kigali', country: { tr: 'Ruanda', en: 'Rwanda', de: 'Ruanda', es: 'Ruanda', ru: 'Руанда' }, region: 'Africa' },
  { city: 'Zanzibar', cityTr: 'Zanzibar', flag: '🇹🇿', tz: 'Africa/Dar_es_Salaam', country: { tr: 'Tanzanya', en: 'Tanzania', de: 'Tansania', es: 'Tanzania', ru: 'Танзания' }, region: 'Africa' },
  { city: 'Dakar', cityTr: 'Dakar', flag: '🇸🇳', tz: 'Africa/Dakar', country: { tr: 'Senegal', en: 'Senegal', de: 'Senegal', es: 'Senegal', ru: 'Сенегал' }, region: 'Africa' },

  // ==========================================
  // OKYANUSYA & PASİFİK
  // ==========================================
  { city: 'Canberra', cityTr: 'Canberra', flag: '🇦🇺', tz: 'Australia/Sydney', country: { tr: 'Avustralya', en: 'Australia', de: 'Australien', es: 'Australia', ru: 'Австралия' }, region: 'Oceania' },
  { city: 'Sydney', cityTr: 'Sidney', flag: '🇦🇺', tz: 'Australia/Sydney', country: { tr: 'Avustralya', en: 'Australia', de: 'Australien', es: 'Australia', ru: 'Австралия' }, region: 'Oceania' },
  { city: 'Melbourne', cityTr: 'Melbourne', flag: '🇦🇺', tz: 'Australia/Melbourne', country: { tr: 'Avustralya', en: 'Australia', de: 'Australien', es: 'Australia', ru: 'Австралия' }, region: 'Oceania' },
  { city: 'Wellington', cityTr: 'Wellington', flag: '🇳🇿', tz: 'Pacific/Auckland', country: { tr: 'Yeni Zelanda', en: 'New Zealand', de: 'Neuseeland', es: 'Nueva Zelanda', ru: 'Новая Зеландия' }, region: 'Oceania' },
  { city: 'Auckland', cityTr: 'Auckland', flag: '🇳🇿', tz: 'Pacific/Auckland', country: { tr: 'Yeni Zelanda', en: 'New Zealand', de: 'Neuseeland', es: 'Nueva Zelanda', ru: 'Новая Зеландия' }, region: 'Oceania' }
];

// ==========================================
// EN POPÜLER TURİSTİK ŞEHİRLER, ADALAR & TATİL BÖLGELERİ
// [Şehir, Türkçe Ad, ISO, lat, lng, (opsiyonel tz)]
// ==========================================
type TouristRow = [string, string, string, number, number, string?];
const TOURIST_ROWS: TouristRow[] = [
  // Türkiye (En popüler turizm merkezleri, sahiller ve kültür şehirleri)
  ['Izmir', 'İzmir', 'TR', 38.42, 27.14], ['Mugla', 'Muğla', 'TR', 37.22, 28.36],
  ['Bodrum', 'Bodrum', 'TR', 37.03, 27.43], ['Marmaris', 'Marmaris', 'TR', 36.85, 28.27],
  ['Fethiye', 'Fethiye (Ölüdeniz)', 'TR', 36.62, 29.12], ['Alanya', 'Alanya', 'TR', 36.54, 32.0],
  ['Kas', 'Kaş', 'TR', 36.2, 29.64], ['Kalkan', 'Kalkan', 'TR', 36.26, 29.41],
  ['Side', 'Side (Manavgat)', 'TR', 36.77, 31.39], ['Kemer', 'Kemer', 'TR', 36.6, 30.56],
  ['Belek', 'Belek', 'TR', 36.86, 31.05], ['Cesme', 'Çeşme', 'TR', 38.32, 26.3],
  ['Alacati', 'Alaçatı', 'TR', 38.28, 26.37], ['Kusadasi', 'Kuşadası', 'TR', 37.86, 27.26],
  ['Didim', 'Didim', 'TR', 37.37, 27.27], ['Gocek', 'Göcek', 'TR', 36.75, 28.94],
  ['Dalyan', 'Dalyan', 'TR', 36.83, 28.64], ['Datca', 'Datça', 'TR', 36.73, 27.68],
  ['Dalaman', 'Dalaman', 'TR', 36.77, 28.8], ['Cappadocia', 'Kapadokya (Göreme)', 'TR', 38.64, 34.83],
  ['Pamukkale', 'Pamukkale (Denizli)', 'TR', 37.92, 29.12], ['Trabzon', 'Trabzon', 'TR', 41.0, 39.72],
  ['Rize', 'Rize (Çamlıhemşin)', 'TR', 41.02, 40.52], ['Uzungol', 'Uzungöl', 'TR', 40.62, 40.29],
  ['Bursa', 'Bursa (Uludağ)', 'TR', 40.19, 29.06], ['Eskisehir', 'Eskişehir', 'TR', 39.77, 30.52],
  ['Gaziantep', 'Gaziantep', 'TR', 37.07, 37.38], ['Sanliurfa', 'Şanlıurfa (Göbeklitepe)', 'TR', 37.16, 38.79],
  ['Mardin', 'Mardin', 'TR', 37.31, 40.74], ['Kars', 'Kars (Sarıkamış)', 'TR', 40.6, 43.09],
  ['Van', 'Van', 'TR', 38.49, 43.38], ['Bozcaada', 'Bozcaada', 'TR', 39.83, 26.07],
  ['Ayvalik', 'Ayvalık (Cunda)', 'TR', 39.32, 26.69], ['Sapanca', 'Sapanca', 'TR', 40.69, 30.27],
  ['Adana', 'Adana', 'TR', 37.0, 35.32], ['Mersin', 'Mersin', 'TR', 36.8, 34.64],
  ['Konya', 'Konya', 'TR', 37.87, 32.48], ['Kayseri', 'Kayseri (Erciyes)', 'TR', 38.73, 35.48],

  // Tayland (En popüler sahiller, adalar ve turistik merkezler)
  ['Pattaya', 'Pattaya', 'TH', 12.93, 100.88], ['Krabi', 'Krabi (Ao Nang)', 'TH', 8.09, 98.91],
  ['Koh Samui', 'Koh Samui', 'TH', 9.51, 100.01], ['Koh Phangan', 'Koh Phangan', 'TH', 9.73, 100.01],
  ['Koh Tao', 'Koh Tao', 'TH', 10.09, 99.84], ['Koh Phi Phi', 'Phi Phi Adaları', 'TH', 7.74, 98.77],
  ['Koh Lanta', 'Koh Lanta', 'TH', 7.62, 99.04], ['Khao Lak', 'Khao Lak', 'TH', 8.64, 98.25],
  ['Hua Hin', 'Hua Hin', 'TH', 12.57, 99.96], ['Chiang Rai', 'Chiang Rai', 'TH', 19.91, 99.84],
  ['Pai', 'Pai', 'TH', 19.36, 98.44], ['Ayutthaya', 'Ayutthaya', 'TH', 14.35, 100.57],
  ['Kanchanaburi', 'Kanchanaburi', 'TH', 14.02, 99.53], ['Koh Chang', 'Koh Chang', 'TH', 12.05, 102.33],

  // İtalya
  ['Venice', 'Venedik', 'IT', 45.44, 12.32], ['Florence', 'Floransa', 'IT', 43.77, 11.26],
  ['Naples', 'Napoli', 'IT', 40.85, 14.27], ['Amalfi', 'Amalfi Sahili', 'IT', 40.63, 14.6],
  ['Positano', 'Positano', 'IT', 40.63, 14.48], ['Capri', 'Capri Adası', 'IT', 40.55, 14.24],
  ['Sicily (Palermo)', 'Sicilya (Palermo)', 'IT', 38.12, 13.36], ['Catania', 'Katanya (Taormina)', 'IT', 37.5, 15.09],
  ['Sardinia (Cagliari)', 'Sardinya', 'IT', 39.22, 9.12], ['Lake Como', 'Como Gölü', 'IT', 45.98, 9.26],
  ['Cinque Terre', 'Cinque Terre', 'IT', 44.13, 9.71], ['Bologna', 'Bolonya', 'IT', 44.49, 11.34],
  ['Pisa', 'Pisa', 'IT', 43.72, 10.4], ['Verona', 'Verona', 'IT', 45.44, 10.99],
  ['Turin', 'Torino', 'IT', 45.07, 7.69], ['Bari', 'Bari (Puglia)', 'IT', 41.12, 16.87],

  // İspanya
  ['Seville', 'Sevilla', 'ES', 37.39, -5.98], ['Valencia', 'Valensiya', 'ES', 39.47, -0.38],
  ['Malaga', 'Malaga', 'ES', 36.72, -4.42], ['Ibiza', 'İbiza', 'ES', 38.91, 1.43],
  ['Mallorca', 'Mallorca (Palma)', 'ES', 39.57, 2.65], ['Tenerife', 'Tenerife', 'ES', 28.29, -16.63, 'Atlantic/Canary'],
  ['Gran Canaria', 'Gran Canaria', 'ES', 27.92, -15.55, 'Atlantic/Canary'], ['Granada', 'Granada', 'ES', 37.18, -3.6],
  ['Marbella', 'Marbella', 'ES', 36.51, -4.88], ['Bilbao', 'Bilbao', 'ES', 43.26, -2.93],
  ['San Sebastian', 'San Sebastian', 'ES', 43.32, -1.98], ['Cordoba', 'Kurtuba (Cordoba)', 'ES', 37.88, -4.78],
  ['Alicante', 'Alicante', 'ES', 38.35, -0.48],

  // Fransa & Monako
  ['Nice', 'Nice', 'FR', 43.7, 7.27], ['Cannes', 'Cannes', 'FR', 43.55, 7.02],
  ['Monaco', 'Monako (Monte Carlo)', 'MC', 43.74, 7.42, 'Europe/Monaco'],
  ['Saint-Tropez', 'Saint-Tropez', 'FR', 43.27, 6.64], ['Marseille', 'Marsilya', 'FR', 43.3, 5.37],
  ['Lyon', 'Lyon', 'FR', 45.76, 4.84], ['Bordeaux', 'Bordeaux', 'FR', 44.84, -0.58],
  ['Chamonix', 'Chamonix (Mont Blanc)', 'FR', 45.92, 6.87], ['Strasbourg', 'Strazburg', 'FR', 48.57, 7.75],
  ['Colmar', 'Colmar', 'FR', 48.08, 7.36], ['Toulouse', 'Toulouse', 'FR', 43.6, 1.44],

  // Yunanistan
  ['Santorini', 'Santorini', 'GR', 36.39, 25.46], ['Mykonos', 'Mikonos', 'GR', 37.45, 25.33],
  ['Crete (Heraklion)', 'Girit (Kandiye)', 'GR', 35.34, 25.13], ['Chania', 'Hanya (Girit)', 'GR', 35.51, 24.02],
  ['Rhodes', 'Rodos', 'GR', 36.43, 28.22], ['Corfu', 'Korfu', 'GR', 39.62, 19.92],
  ['Thessaloniki', 'Selanik', 'GR', 40.64, 22.94], ['Kos', 'İstanköy (Kos)', 'GR', 36.89, 27.29],
  ['Zakynthos', 'Zakintos', 'GR', 37.79, 20.9], ['Chios', 'Sakız Adası', 'GR', 38.37, 26.14],
  ['Lesbos (Mytilene)', 'Midilli', 'GR', 39.1, 26.55], ['Samos', 'Sisam (Samos)', 'GR', 37.75, 26.98],
  ['Meteora', 'Meteora', 'GR', 39.72, 21.63],

  // Portekiz
  ['Porto', 'Porto', 'PT', 41.15, -8.61], ['Algarve (Faro)', 'Algarve (Faro)', 'PT', 37.02, -7.93],
  ['Lagos (Algarve)', 'Lagos (Algarve)', 'PT', 37.1, -8.67], ['Sintra', 'Sintra', 'PT', 38.8, -9.39],
  ['Madeira (Funchal)', 'Madeira', 'PT', 32.65, -16.91, 'Atlantic/Madeira'],
  ['Azores (Ponta Delgada)', 'Azorlar', 'PT', 37.74, -25.67, 'Atlantic/Azores'],

  // Almanya, Avusturya, İsviçre
  ['Hamburg', 'Hamburg', 'DE', 53.55, 9.99], ['Cologne', 'Köln', 'DE', 50.94, 6.96],
  ['Dusseldorf', 'Düsseldorf', 'DE', 51.23, 6.77], ['Stuttgart', 'Stuttgart', 'DE', 48.78, 9.18],
  ['Dresden', 'Dresden', 'DE', 51.05, 13.74], ['Heidelberg', 'Heidelberg', 'DE', 49.4, 8.67],
  ['Nuremberg', 'Nürnberg', 'DE', 49.45, 11.08], ['Salzburg', 'Salzburg', 'AT', 47.81, 13.06],
  ['Hallstatt', 'Hallstatt', 'AT', 47.56, 13.65], ['Innsbruck', 'Innsbruck', 'AT', 47.27, 11.4],
  ['Graz', 'Graz', 'AT', 47.07, 15.44], ['Interlaken', 'Interlaken', 'CH', 46.69, 7.86],
  ['Lucerne', 'Luzern', 'CH', 47.05, 8.31], ['Zermatt', 'Zermatt (Matterhorn)', 'CH', 46.02, 7.75],
  ['Basel', 'Basel', 'CH', 47.56, 7.59], ['Lausanne', 'Lozan', 'CH', 46.52, 6.63],

  // Birleşik Krallık & İrlanda
  ['Edinburgh', 'Edinburgh', 'GB', 55.95, -3.19], ['Manchester', 'Manchester', 'GB', 53.48, -2.24],
  ['Liverpool', 'Liverpool', 'GB', 53.41, -2.98], ['Oxford', 'Oxford', 'GB', 51.75, -1.26],
  ['Cambridge', 'Cambridge', 'GB', 52.21, 0.12], ['Bath', 'Bath', 'GB', 51.38, -2.36],
  ['Birmingham', 'Birmingham', 'GB', 52.49, -1.9], ['Glasgow', 'Glasgow', 'GB', 55.86, -4.25],
  ['Belfast', 'Belfast', 'GB', 54.6, -5.93], ['Galway', 'Galway', 'IE', 53.27, -9.06],
  ['Cork', 'Cork', 'IE', 51.9, -8.47],

  // Hollanda, Belçika, Orta & Doğu Avrupa, Balkanlar, İskandinavya
  ['Rotterdam', 'Rotterdam', 'NL', 51.92, 4.48], ['The Hague', 'Lahey', 'NL', 52.08, 4.3],
  ['Utrecht', 'Utrecht', 'NL', 52.09, 5.12], ['Bruges', 'Brugge', 'BE', 51.21, 3.22],
  ['Ghent', 'Gent', 'BE', 51.05, 3.72], ['Antwerp', 'Anvers', 'BE', 51.22, 4.4],
  ['Cesky Krumlov', 'Çeski Krumlov', 'CZ', 48.81, 14.32], ['Karlovy Vary', 'Karlovy Vary', 'CZ', 50.23, 12.87],
  ['Split', 'Split', 'HR', 43.51, 16.44], ['Hvar', 'Hvar Adası', 'HR', 43.17, 16.44],
  ['Zadar', 'Zadar', 'HR', 44.12, 15.23], ['Rovinj', 'Rovinj', 'HR', 45.08, 13.64],
  ['Bled', 'Bled Gölü', 'SI', 46.37, 14.11], ['Krakow', 'Krakov', 'PL', 50.06, 19.94],
  ['Gdansk', 'Gdansk', 'PL', 54.35, 18.65], ['Wroclaw', 'Wroclaw', 'PL', 51.11, 17.04],
  ['Zakopane', 'Zakopane', 'PL', 49.3, 19.95], ['Kotor', 'Kotor', 'ME', 42.42, 18.77],
  ['Tivat', 'Tivat', 'ME', 42.43, 18.7], ['Herceg Novi', 'Herceg Novi', 'ME', 42.45, 18.54],
  ['Ohrid', 'Ohri', 'MK', 41.12, 20.8], ['Sarande', 'Saranda (Ksamil)', 'AL', 39.88, 20.0],
  ['Vlore', 'Avlonya (Vlore)', 'AL', 40.47, 19.49], ['Mostar', 'Mostar', 'BA', 43.34, 17.81],
  ['Novi Sad', 'Novi Sad', 'RS', 45.27, 19.83], ['Nis', 'Niş', 'RS', 43.32, 21.9],
  ['Prizren', 'Prizren', 'XK', 42.21, 20.74], ['Varna', 'Varna', 'BG', 43.21, 27.91],
  ['Burgas', 'Burgaz (Sunny Beach)', 'BG', 42.5, 27.46], ['Bansko', 'Bansko', 'BG', 41.84, 23.49],
  ['Plovdiv', 'Filibe (Plovdiv)', 'BG', 42.14, 24.75], ['Brasov', 'Braşov (Transilvanya)', 'RO', 45.66, 25.61],
  ['Cluj-Napoca', 'Cluj-Napoca', 'RO', 46.77, 23.62], ['Constanta', 'Köstence', 'RO', 44.16, 28.63],
  ['Kyrenia', 'Girne', 'CY', 35.34, 33.32], ['Famagusta', 'Gazimağusa', 'CY', 35.12, 33.94],
  ['Paphos', 'Baf', 'CY', 34.77, 32.42], ['Limassol', 'Limasol', 'CY', 34.71, 33.02],
  ['Ayia Napa', 'Ayia Napa', 'CY', 34.99, 34.0], ['Saint Petersburg', 'St. Petersburg', 'RU', 59.93, 30.34],
  ['Sochi', 'Soçi', 'RU', 43.6, 39.73], ['Kazan', 'Kazan', 'RU', 55.79, 49.12],
  ['Lviv', 'Lviv', 'UA', 49.84, 24.03], ['Odessa', 'Odessa', 'UA', 46.48, 30.73],
  ['Bergen', 'Bergen', 'NO', 60.39, 5.32], ['Tromso', 'Tromsø', 'NO', 69.65, 18.96],
  ['Lofoten', 'Lofoten Adaları', 'NO', 68.21, 13.88], ['Gothenburg', 'Göteborg', 'SE', 57.71, 11.97],
  ['Malmo', 'Malmö', 'SE', 55.61, 13.0], ['Rovaniemi', 'Rovaniemi (Lapland)', 'FI', 66.5, 25.73],
  ['Kutaisi', 'Kutaisi', 'GE', 42.27, 42.71], ['Gudauri', 'Gudauri (Kazbegi)', 'GE', 42.48, 44.48],
  ['Gabala', 'Gabala', 'AZ', 40.98, 47.85], ['Sheki', 'Şeki', 'AZ', 41.19, 47.17],
  ['Bukhara', 'Buhara', 'UZ', 39.77, 64.42], ['Khiva', 'Hive', 'UZ', 41.38, 60.36],
  ['Issyk-Kul (Karakol)', 'Issık Göl', 'KG', 42.49, 78.39],

  // Orta Doğu & Kuzey Afrika
  ['Sharjah', 'Şarika', 'AE', 25.35, 55.42], ['Ras Al Khaimah', 'Ras El Hayme', 'AE', 25.8, 55.98],
  ['Fujairah', 'Füceyre', 'AE', 25.13, 56.33], ['Medina', 'Medine', 'SA', 24.47, 39.61],
  ['Mecca', 'Mekke', 'SA', 21.42, 39.83], ['AlUla', 'AlUla', 'SA', 26.62, 37.92],
  ['Dammam', 'Dammam', 'SA', 26.42, 50.09], ['Petra', 'Petra', 'JO', 30.33, 35.44],
  ['Wadi Rum', 'Vadi Rum', 'JO', 29.58, 35.42], ['Aqaba', 'Akabe', 'JO', 29.53, 35.01],
  ['Hurghada', 'Hurgada', 'EG', 27.26, 33.81], ['Alexandria', 'İskenderiye', 'EG', 31.2, 29.92],
  ['Luxor', 'Luksor', 'EG', 25.69, 32.64], ['Aswan', 'Asvan', 'EG', 24.09, 32.9],
  ['Dahab', 'Dahab', 'EG', 28.5, 34.51], ['Marsa Alam', 'Marsa Alam', 'EG', 25.07, 34.9],
  ['Fes', 'Fes', 'MA', 34.03, -5.0], ['Agadir', 'Agadir', 'MA', 30.43, -9.6],
  ['Chefchaouen', 'Şefşavan', 'MA', 35.17, -5.27], ['Tangier', 'Tanca', 'MA', 35.76, -5.83],
  ['Essaouira', 'Suveyre (Essaouira)', 'MA', 31.51, -9.77], ['Djerba', 'Cerbe', 'TN', 33.81, 10.85],
  ['Hammamet', 'Hammamet (Sousse)', 'TN', 36.4, 10.62], ['Salalah', 'Salala', 'OM', 17.02, 54.09],
  ['Isfahan', 'İsfahan', 'IR', 32.65, 51.67], ['Shiraz', 'Şiraz', 'IR', 29.59, 52.58],
  ['Tabriz', 'Tebriz', 'IR', 38.08, 46.29], ['Erbil', 'Erbil', 'IQ', 36.19, 44.01],
  ['Eilat', 'Eilat', 'IL', 29.56, 34.95],

  // Asya & Pasifik
  ['Hokkaido (Sapporo)', 'Sapporo (Hokkaido)', 'JP', 43.06, 141.35], ['Okinawa (Naha)', 'Okinawa', 'JP', 26.21, 127.68],
  ['Hiroshima', 'Hiroşima', 'JP', 34.39, 132.46], ['Nara', 'Nara', 'JP', 34.69, 135.8],
  ['Fukuoka', 'Fukuoka', 'JP', 33.59, 130.4], ['Nagoya', 'Nagoya', 'JP', 35.18, 136.91],
  ['Yokohama', 'Yokohama', 'JP', 35.44, 139.64], ['Hakone (Mt. Fuji)', 'Fuji / Hakone', 'JP', 35.23, 139.11],
  ['Busan', 'Busan', 'KR', 35.18, 129.08], ['Jeju', 'Jeju Adası', 'KR', 33.5, 126.53],
  ['Incheon', 'İncheon', 'KR', 37.46, 126.71], ['Xian', 'Şian (Xi’an)', 'CN', 34.34, 108.94],
  ['Guilin', 'Guilin (Yangshuo)', 'CN', 25.27, 110.29], ['Chengdu', 'Chengdu', 'CN', 30.57, 104.07],
  ['Guangzhou', 'Guangzhou (Kanton)', 'CN', 23.13, 113.26], ['Shenzhen', 'Shenzhen', 'CN', 22.54, 114.06],
  ['Hangzhou', 'Hangzhou', 'CN', 30.27, 120.15], ['Sanya (Hainan)', 'Sanya (Hainan)', 'CN', 18.25, 109.51],
  ['Macau', 'Makao', 'CN', 22.2, 113.54, 'Asia/Macau'], ['Kaohsiung', 'Kaohsiung', 'TW', 22.63, 120.3],
  ['Ubud', 'Ubud (Bali)', 'ID', -8.51, 115.26], ['Seminyak', 'Seminyak / Canggu (Bali)', 'ID', -8.69, 115.16],
  ['Uluwatu', 'Uluwatu / Nusa Dua (Bali)', 'ID', -8.81, 115.17], ['Lombok', 'Lombok (Gili)', 'ID', -8.65, 116.32],
  ['Yogyakarta', 'Yogyakarta', 'ID', -7.8, 110.36, 'Asia/Jakarta'], ['Komodo (Labuan Bajo)', 'Komodo', 'ID', -8.5, 119.89],
  ['Surabaya', 'Surabaya', 'ID', -7.26, 112.75, 'Asia/Jakarta'], ['Langkawi', 'Langkawi', 'MY', 6.35, 99.8],
  ['Penang', 'Penang (George Town)', 'MY', 5.41, 100.33], ['Kota Kinabalu', 'Kota Kinabalu', 'MY', 5.98, 116.07],
  ['Johor Bahru', 'Johor Bahru', 'MY', 1.49, 103.74], ['Boracay', 'Boracay', 'PH', 11.97, 121.92],
  ['Cebu', 'Cebu', 'PH', 10.32, 123.89], ['Palawan (El Nido)', 'Palawan (El Nido)', 'PH', 11.2, 119.42],
  ['Siargao', 'Siargao', 'PH', 9.85, 126.05], ['Da Nang', 'Da Nang', 'VN', 16.05, 108.2],
  ['Hoi An', 'Hoi An', 'VN', 15.88, 108.33], ['Ha Long Bay', 'Ha Long Körfezi', 'VN', 20.95, 107.08],
  ['Nha Trang', 'Nha Trang', 'VN', 12.24, 109.19], ['Phu Quoc', 'Phu Quoc', 'VN', 10.29, 103.98],
  ['Sapa', 'Sapa', 'VN', 22.34, 103.84], ['Siem Reap', 'Siem Reap (Angkor Wat)', 'KH', 13.36, 103.86],
  ['Luang Prabang', 'Luang Prabang', 'LA', 19.89, 102.13, 'Asia/Vientiane'],
  ['Goa', 'Goa', 'IN', 15.3, 74.12], ['Jaipur', 'Jaipur', 'IN', 26.91, 75.79],
  ['Agra', 'Agra (Tac Mahal)', 'IN', 27.18, 78.01], ['Kerala (Kochi)', 'Kerala (Kochi)', 'IN', 9.93, 76.27],
  ['Bangalore', 'Bangalor', 'IN', 12.97, 77.59], ['Varanasi', 'Varanasi', 'IN', 25.32, 82.97],
  ['Udaipur', 'Udaipur', 'IN', 24.59, 73.71], ['Kolkata', 'Kalküta', 'IN', 22.57, 88.36],
  ['Chennai', 'Çennai', 'IN', 13.08, 80.27], ['Karachi', 'Karaçi', 'PK', 24.86, 67.01],
  ['Lahore', 'Lahor', 'PK', 31.52, 74.36], ['Pokhara', 'Pokhara', 'NP', 28.21, 83.99],
  ['Galle', 'Galle / Mirissa', 'LK', 6.03, 80.22], ['Kandy', 'Kandy', 'LK', 7.29, 80.63],
  ['Ella', 'Ella', 'LK', 6.87, 81.05], ['Maafushi', 'Maafushi (Maldivler)', 'MV', 3.94, 73.49],

  // Amerika Kıtası
  ['Las Vegas', 'Las Vegas', 'US', 36.17, -115.14, 'America/Los_Angeles'],
  ['Orlando', 'Orlando', 'US', 28.54, -81.38, 'America/New_York'],
  ['Honolulu', 'Honolulu (Hawaii)', 'US', 21.31, -157.86, 'Pacific/Honolulu'],
  ['Maui', 'Maui (Hawaii)', 'US', 20.8, -156.33, 'Pacific/Honolulu'],
  ['Boston', 'Boston', 'US', 42.36, -71.06, 'America/New_York'],
  ['Seattle', 'Seattle', 'US', 47.61, -122.33, 'America/Los_Angeles'],
  ['San Diego', 'San Diego', 'US', 32.72, -117.16, 'America/Los_Angeles'],
  ['New Orleans', 'New Orleans', 'US', 29.95, -90.07, 'America/Chicago'],
  ['Houston', 'Houston', 'US', 29.76, -95.37, 'America/Chicago'],
  ['Dallas', 'Dallas', 'US', 32.78, -96.8, 'America/Chicago'],
  ['Austin', 'Austin', 'US', 30.27, -97.74, 'America/Chicago'],
  ['Atlanta', 'Atlanta', 'US', 33.75, -84.39, 'America/New_York'],
  ['Denver', 'Denver (Aspen)', 'US', 39.74, -104.99, 'America/Denver'],
  ['Grand Canyon', 'Büyük Kanyon', 'US', 36.1, -112.11, 'America/Phoenix'],
  ['Banff', 'Banff', 'CA', 51.18, -115.57, 'America/Edmonton'],
  ['Calgary', 'Calgary', 'CA', 51.05, -114.07, 'America/Edmonton'],
  ['Quebec City', 'Quebec', 'CA', 46.81, -71.21, 'America/Toronto'],
  ['Playa del Carmen', 'Playa del Carmen', 'MX', 20.63, -87.08, 'America/Cancun'],
  ['Tulum', 'Tulum', 'MX', 20.21, -87.47, 'America/Cancun'],
  ['Cozumel', 'Cozumel', 'MX', 20.51, -86.95, 'America/Cancun'],
  ['Puerto Vallarta', 'Puerto Vallarta', 'MX', 20.65, -105.23, 'America/Mexico_City'],
  ['Los Cabos', 'Los Cabos', 'MX', 22.89, -109.91, 'America/Mazatlan'],
  ['Guadalajara', 'Guadalajara', 'MX', 20.66, -103.35, 'America/Mexico_City'],
  ['Oaxaca', 'Oaxaca', 'MX', 17.07, -96.73, 'America/Mexico_City'],
  ['Punta Cana', 'Punta Cana', 'DO', 18.58, -68.4],
  ['Varadero', 'Varadero', 'CU', 23.15, -81.25],
  ['Montego Bay', 'Montego Bay (Jamaika)', 'JM', 18.47, -77.92, 'America/Jamaica'],
  ['Nassau', 'Nassau (Bahamalar)', 'BS', 25.05, -77.35, 'America/Nassau'],
  ['Cartagena', 'Cartagena', 'CO', 10.39, -75.48],
  ['Cali', 'Cali', 'CO', 3.45, -76.53],
  ['Cusco', 'Cusco', 'PE', -13.53, -71.97],
  ['Machu Picchu', 'Machu Picchu', 'PE', -13.16, -72.55],
  ['Galapagos', 'Galapagos Adaları', 'EC', -0.74, -90.31, 'Pacific/Galapagos'],
  ['Florianopolis', 'Florianopolis', 'BR', -27.6, -48.55],
  ['Salvador', 'Salvador da Bahia', 'BR', -12.97, -38.5],
  ['Foz do Iguacu', 'Iguazu Şelaleleri', 'BR', -25.52, -54.59],
  ['Bariloche', 'Bariloche (Patagonya)', 'AR', -41.13, -71.31],
  ['Mendoza', 'Mendoza', 'AR', -32.89, -68.83],
  ['Ushuaia', 'Ushuaia', 'AR', -54.8, -68.3],
  ['Punta del Este', 'Punta del Este', 'UY', -34.96, -54.94],

  // Afrika & Okyanusya
  ['Mombasa', 'Mombasa', 'KE', -4.04, 39.67],
  ['Masai Mara', 'Masai Mara', 'KE', -1.49, 35.14],
  ['Dar es Salaam', 'Darüsselam', 'TZ', -6.79, 39.21],
  ['Serengeti', 'Serengeti', 'TZ', -2.33, 34.83],
  ['Kilimanjaro (Arusha)', 'Kilimanjaro (Arusha)', 'TZ', -3.37, 36.68],
  ['Durban', 'Durban', 'ZA', -29.86, 31.02],
  ['Kruger Park', 'Kruger Ulusal Parkı', 'ZA', -24.01, 31.49],
  ['Victoria Falls', 'Victoria Şelaleleri', 'ZW', -17.93, 25.83, 'Africa/Harare'],
  ['Port Louis (Mauritius)', 'Mauritius', 'MU', -20.16, 57.5, 'Indian/Mauritius'],
  ['Mahe (Seychelles)', 'Seyşeller (Mahe)', 'SC', -4.68, 55.49, 'Indian/Mahe'],
  ['Gold Coast', 'Gold Coast', 'AU', -28.02, 153.4, 'Australia/Brisbane'],
  ['Brisbane', 'Brisbane', 'AU', -27.47, 153.03, 'Australia/Brisbane'],
  ['Perth', 'Perth', 'AU', -31.95, 115.86, 'Australia/Perth'],
  ['Adelaide', 'Adelaide', 'AU', -34.93, 138.6, 'Australia/Adelaide'],
  ['Cairns', 'Cairns (Büyük Set Resifi)', 'AU', -16.92, 145.77, 'Australia/Brisbane'],
  ['Queenstown', 'Queenstown', 'NZ', -45.03, 168.66],
  ['Christchurch', 'Christchurch', 'NZ', -43.53, 172.64],
  ['Rotorua', 'Rotorua', 'NZ', -38.14, 176.25],
  ['Nadi (Fiji)', 'Fiji (Nadi)', 'FJ', -17.78, 177.44, 'Pacific/Fiji'],
  ['Bora Bora', 'Bora Bora (Tahiti)', 'PF', -16.5, -151.74, 'Pacific/Tahiti']
];

function mapRegionName(trRegion?: string): WorldHub['region'] {
  if (!trRegion) return 'Europe';
  if (trRegion === 'Avrupa') return 'Europe';
  if (trRegion === 'Orta Doğu') return 'Middle East';
  if (trRegion === 'Asya') return 'Asia';
  if (trRegion === 'Afrika') return 'Africa';
  if (trRegion === 'Okyanusya') return 'Oceania';
  return 'Americas';
}

function estimateTimezone(lat: number, lng: number, region: WorldHub['region'], iso: string): string {
  // Known overrides for common countries not in BASE_WORLD_HUBS
  const tzMap: Record<string, string> = {
    LU: 'Europe/Luxembourg', MC: 'Europe/Monaco', AD: 'Europe/Andorra', SM: 'Europe/San_Marino',
    VA: 'Europe/Rome', LI: 'Europe/Vaduz', JM: 'America/Jamaica', BS: 'America/Nassau',
    BB: 'America/Barbados', TT: 'America/Port_of_Spain', GT: 'America/Guatemala', HN: 'America/Tegucigalpa',
    SV: 'America/El_Salvador', NI: 'America/Managua', BZ: 'America/Belize', BO: 'America/La_Paz',
    GY: 'America/Guyana', SR: 'America/Paramaribo', LA: 'Asia/Vientiane', MM: 'Asia/Yangon',
    BN: 'Asia/Brunei', TL: 'Asia/Dili', BT: 'Asia/Thimphu', AF: 'Asia/Kabul', SY: 'Asia/Damascus',
    YE: 'Asia/Aden', PS: 'Asia/Hebron', LY: 'Africa/Tripoli', SD: 'Africa/Khartoum',
    SN: 'Africa/Dakar', CI: 'Africa/Abidjan', CM: 'Africa/Douala', UG: 'Africa/Kampala',
    TZ: 'Africa/Dar_es_Salaam', ZM: 'Africa/Lusaka', ZW: 'Africa/Harare', BW: 'Africa/Gaborone',
    NA: 'Africa/Windhoek', MZ: 'Africa/Maputo', AO: 'Africa/Luanda', MG: 'Indian/Antananarivo',
    MU: 'Indian/Mauritius', SC: 'Indian/Mahe', FJ: 'Pacific/Fiji', PG: 'Pacific/Port_Moresby',
    WS: 'Pacific/Apia', TO: 'Pacific/Tongatapu', VU: 'Pacific/Efate', PF: 'Pacific/Tahiti'
  };
  if (tzMap[iso]) return tzMap[iso];
  if (region === 'Europe') return 'Europe/Berlin';
  if (region === 'Middle East') return 'Asia/Dubai';
  if (region === 'Africa') return lng > 25 ? 'Africa/Nairobi' : 'Africa/Lagos';
  if (region === 'Asia') return lng > 115 ? 'Asia/Tokyo' : lng > 95 ? 'Asia/Bangkok' : 'Asia/Kolkata';
  if (region === 'Oceania') return 'Australia/Sydney';
  return lng < -90 ? 'America/Mexico_City' : 'America/New_York';
}

// 1. Enrich BASE_WORLD_HUBS with guaranteed iso, lat, lng
const ENRICHED_BASE_HUBS: WorldHub[] = BASE_WORLD_HUBS.map((hub) => {
  const iso = hub.iso || flagToIso(hub.flag);
  const exact = BASE_CITY_COORDS[hub.city];
  const geo = GEO_DATA[iso];
  const lat = hub.lat ?? exact?.[0] ?? geo?.lat ?? 0;
  const lng = hub.lng ?? exact?.[1] ?? geo?.lng ?? 0;
  return { ...hub, iso, lat, lng };
});

// 2. Build tourist hubs (supporting both countries in BASE_WORLD_HUBS and any country in GEO_DATA)
const TOURIST_HUBS: WorldHub[] = TOURIST_ROWS.flatMap(([city, cityTr, iso, lat, lng, tz]) => {
  const flag = isoToFlag(iso);
  const base = ENRICHED_BASE_HUBS.find((h) => h.iso === iso || h.flag === flag);
  if (base) {
    return [{
      city,
      cityTr,
      iso,
      flag,
      tz: tz || base.tz,
      country: base.country,
      region: base.region,
      lat,
      lng
    }];
  }
  const region = mapRegionName(countryToRegion[iso]);
  return [{
    city,
    cityTr,
    iso,
    flag,
    tz: tz || estimateTimezone(lat, lng, region, iso),
    country: {
      tr: getCountryName(iso, 'tr'),
      en: getCountryName(iso, 'en'),
      de: getCountryName(iso, 'de'),
      es: getCountryName(iso, 'es'),
      ru: getCountryName(iso, 'ru')
    },
    region,
    lat,
    lng
  }];
});

// 3. Ensure every single country in GEO_DATA (all 199 countries) has its capital represented
const coveredIsos = new Set<string>([
  ...ENRICHED_BASE_HUBS.map((h) => h.iso || ''),
  ...TOURIST_HUBS.map((h) => h.iso || '')
]);

const EXTRA_CAPITAL_HUBS: WorldHub[] = Object.values(GEO_DATA)
  .filter((geo) => !coveredIsos.has(geo.code))
  .map((geo) => {
    const iso = geo.code;
    const region = mapRegionName(countryToRegion[iso]);
    return {
      city: geo.capital,
      cityTr: geo.capital,
      iso,
      flag: isoToFlag(iso),
      tz: estimateTimezone(geo.lat, geo.lng, region, iso),
      country: {
        tr: getCountryName(iso, 'tr'),
        en: getCountryName(iso, 'en'),
        de: getCountryName(iso, 'de'),
        es: getCountryName(iso, 'es'),
        ru: getCountryName(iso, 'ru')
      },
      region,
      lat: geo.lat,
      lng: geo.lng
    };
  });

// Deduplicate by city name while preserving order
const seenCities = new Set<string>();
export const ALL_WORLD_HUBS: WorldHub[] = [...ENRICHED_BASE_HUBS, ...TOURIST_HUBS, ...EXTRA_CAPITAL_HUBS].filter((h) => {
  const key = `${h.city.toLowerCase()}_${h.iso || ''}`;
  if (seenCities.has(key)) return false;
  seenCities.add(key);
  return true;
});

export const POPULAR_CURRENCIES = [
  { code: 'GBP', symbol: '£', flag: '🇬🇧', name: 'GBP - British Pound' },
  { code: 'EUR', symbol: '€', flag: '🇪🇺', name: 'EUR - Euro' },
  { code: 'USD', symbol: '$', flag: '🇺🇸', name: 'USD - US Dollar' },
  { code: 'TRY', symbol: '₺', flag: '🇹🇷', name: 'TRY - Türk Lirası' },
  { code: 'GEL', symbol: '₾', flag: '🇬🇪', name: 'GEL - Georgian Lari' },
  { code: 'AED', symbol: 'د.إ', flag: '🇦🇪', name: 'AED - UAE Dirham' },
  { code: 'JPY', symbol: '¥', flag: '🇯🇵', name: 'JPY - Japanese Yen' },
  { code: 'THB', symbol: '฿', flag: '🇹🇭', name: 'THB - Thai Baht' },
  { code: 'CHF', symbol: 'CHF', flag: '🇨🇭', name: 'CHF - Swiss Franc' },
  { code: 'CAD', symbol: 'C$', flag: '🇨🇦', name: 'CAD - Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', flag: '🇦🇺', name: 'AUD - Australian Dollar' },
  { code: 'RSD', symbol: 'дин', flag: '🇷🇸', name: 'RSD - Serbian Dinar' },
  { code: 'BAM', symbol: 'KM', flag: '🇧🇦', name: 'BAM - Bosnian Mark' },
  { code: 'ALL', symbol: 'L', flag: '🇦🇱', name: 'ALL - Albanian Lek' },
  { code: 'BGN', symbol: 'лв', flag: '🇧🇬', name: 'BGN - Bulgarian Lev' },
  { code: 'AZN', symbol: '₼', flag: '🇦🇿', name: 'AZN - Azerbaijani Manat' },
  { code: 'KZT', symbol: '₸', flag: '🇰🇿', name: 'KZT - Kazakhstani Tenge' },
  { code: 'UZS', symbol: 'soʻm', flag: '🇺🇿', name: 'UZS - Uzbek Som' },
  { code: 'EGP', symbol: 'E£', flag: '🇪🇬', name: 'EGP - Egyptian Pound' },
  { code: 'MAD', symbol: 'DH', flag: '🇲🇦', name: 'MAD - Moroccan Dirham' },
  { code: 'SGD', symbol: 'S$', flag: '🇸🇬', name: 'SGD - Singapore Dollar' },
  { code: 'KRW', symbol: '₩', flag: '🇰🇷', name: 'KRW - South Korean Won' },
  { code: 'INR', symbol: '₹', flag: '🇮🇳', name: 'INR - Indian Rupee' },
  { code: 'IDR', symbol: 'Rp', flag: '🇮🇩', name: 'IDR - Indonesian Rupiah' },
  { code: 'BRL', symbol: 'R$', flag: '🇧🇷', name: 'BRL - Brazilian Real' },
  { code: 'MXN', symbol: 'Mex$', flag: '🇲🇽', name: 'MXN - Mexican Peso' },
  { code: 'SAR', symbol: '﷼', flag: '🇸🇦', name: 'SAR - Saudi Riyal' },
  { code: 'QAR', symbol: 'QR', flag: '🇶🇦', name: 'QAR - Qatari Riyal' },
  { code: 'PLN', symbol: 'zł', flag: '🇵🇱', name: 'PLN - Polish Zloty' },
  { code: 'CZK', symbol: 'Kč', flag: '🇨🇿', name: 'CZK - Czech Koruna' },
  { code: 'HUF', symbol: 'Ft', flag: '🇭🇺', name: 'HUF - Hungarian Forint' },
  { code: 'SEK', symbol: 'kr', flag: '🇸🇪', name: 'SEK - Swedish Krona' },
  { code: 'NOK', symbol: 'kr', flag: '🇳🇴', name: 'NOK - Norwegian Krone' }
];
