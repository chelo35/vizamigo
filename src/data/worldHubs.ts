// Comprehensive global travel hubs for live world clock and widgets
export interface WorldHub {
  city: string;
  flag: string;
  tz: string;
  country: {
    tr: string;
    en: string;
    de: string;
    es: string;
    ru: string;
  };
  region: 'Europe' | 'Americas' | 'Asia' | 'Middle East' | 'Africa';
}

export const ALL_WORLD_HUBS: WorldHub[] = [
  // Europe
  { city: 'London', flag: '🇬🇧', tz: 'Europe/London', country: { tr: 'Birleşik Krallık', en: 'United Kingdom', de: 'Großbritannien', es: 'Reino Unido', ru: 'Великобритания' }, region: 'Europe' },
  { city: 'Istanbul', flag: '🇹🇷', tz: 'Europe/Istanbul', country: { tr: 'Türkiye', en: 'Turkey', de: 'Türkei', es: 'Turquía', ru: 'Турция' }, region: 'Europe' },
  { city: 'Frankfurt', flag: '🇩🇪', tz: 'Europe/Berlin', country: { tr: 'Almanya', en: 'Germany', de: 'Deutschland', es: 'Alemania', ru: 'Германия' }, region: 'Europe' },
  { city: 'Paris', flag: '🇫🇷', tz: 'Europe/Paris', country: { tr: 'Fransa', en: 'France', de: 'Frankreich', es: 'Francia', ru: 'Франция' }, region: 'Europe' },
  { city: 'Rome', flag: '🇮🇹', tz: 'Europe/Rome', country: { tr: 'İtalya', en: 'Italy', de: 'Italien', es: 'Italia', ru: 'Италия' }, region: 'Europe' },
  { city: 'Madrid', flag: '🇪🇸', tz: 'Europe/Madrid', country: { tr: 'İspanya', en: 'Spain', de: 'Spanien', es: 'España', ru: 'Испания' }, region: 'Europe' },
  { city: 'Amsterdam', flag: '🇳🇱', tz: 'Europe/Amsterdam', country: { tr: 'Hollanda', en: 'Netherlands', de: 'Niederlande', es: 'Países Bajos', ru: 'Нидерланды' }, region: 'Europe' },
  { city: 'Athens', flag: '🇬🇷', tz: 'Europe/Athens', country: { tr: 'Yunanistan', en: 'Greece', de: 'Griechenland', es: 'Grecia', ru: 'Греция' }, region: 'Europe' },
  { city: 'Vienna', flag: '🇦🇹', tz: 'Europe/Vienna', country: { tr: 'Avusturya', en: 'Austria', de: 'Österreich', es: 'Austria', ru: 'Австрия' }, region: 'Europe' },
  { city: 'Zurich', flag: '🇨🇭', tz: 'Europe/Zurich', country: { tr: 'İsviçre', en: 'Switzerland', de: 'Schweiz', es: 'Suiza', ru: 'Швейцария' }, region: 'Europe' },
  { city: 'Prague', flag: '🇨🇿', tz: 'Europe/Prague', country: { tr: 'Çekya', en: 'Czech Republic', de: 'Tschechien', es: 'Chequia', ru: 'Чехия' }, region: 'Europe' },
  { city: 'Warsaw', flag: '🇵🇱', tz: 'Europe/Warsaw', country: { tr: 'Polonya', en: 'Poland', de: 'Polen', es: 'Polonia', ru: 'Польша' }, region: 'Europe' },
  { city: 'Lisbon', flag: '🇵🇹', tz: 'Europe/Lisbon', country: { tr: 'Portekiz', en: 'Portugal', de: 'Portugal', es: 'Portugal', ru: 'Португалия' }, region: 'Europe' },
  { city: 'Dublin', flag: '🇮🇪', tz: 'Europe/Dublin', country: { tr: 'İrlanda', en: 'Ireland', de: 'Irland', es: 'Irlanda', ru: 'Ирландия' }, region: 'Europe' },
  { city: 'Belgrade', flag: '🇷🇸', tz: 'Europe/Belgrade', country: { tr: 'Sırbistan', en: 'Serbia', de: 'Serbien', es: 'Serbia', ru: 'Сербия' }, region: 'Europe' },
  { city: 'Sarajevo', flag: '🇧🇦', tz: 'Europe/Sarajevo', country: { tr: 'Bosna-Hersek', en: 'Bosnia & Herzegovina', de: 'Bosnien-Herzegowina', es: 'Bosnia y Herzegovina', ru: 'Босния и Герцеговина' }, region: 'Europe' },
  { city: 'Tirana', flag: '🇦🇱', tz: 'Europe/Tirane', country: { tr: 'Arnavutluk', en: 'Albania', de: 'Albanien', es: 'Albania', ru: 'Албания' }, region: 'Europe' },
  { city: 'Tbilisi', flag: '🇬🇪', tz: 'Asia/Tbilisi', country: { tr: 'Gürcistan', en: 'Georgia', de: 'Georgien', es: 'Georgia', ru: 'Грузия' }, region: 'Europe' },
  { city: 'Baku', flag: '🇦🇿', tz: 'Asia/Baku', country: { tr: 'Azerbaycan', en: 'Azerbaijan', de: 'Aserbaidschan', es: 'Azerbaiyán', ru: 'Азербайджан' }, region: 'Europe' },
  { city: 'Yerevan', flag: '🇦🇲', tz: 'Asia/Yerevan', country: { tr: 'Ermenistan', en: 'Armenia', de: 'Armenien', es: 'Armenia', ru: 'Армения' }, region: 'Europe' },

  // Americas
  { city: 'New York', flag: '🇺🇸', tz: 'America/New_York', country: { tr: 'ABD (Doğu)', en: 'USA (East)', de: 'USA (Ost)', es: 'EE. UU. (Este)', ru: 'США (Восток)' }, region: 'Americas' },
  { city: 'Los Angeles', flag: '🇺🇸', tz: 'America/Los_Angeles', country: { tr: 'ABD (Batı)', en: 'USA (West)', de: 'USA (West)', es: 'EE. UU. (Oeste)', ru: 'США (Запад)' }, region: 'Americas' },
  { city: 'Toronto', flag: '🇨🇦', tz: 'America/Toronto', country: { tr: 'Kanada', en: 'Canada', de: 'Kanada', es: 'Canadá', ru: 'Канада' }, region: 'Americas' },
  { city: 'Mexico City', flag: '🇲🇽', tz: 'America/Mexico_City', country: { tr: 'Meksika', en: 'Mexico', de: 'Mexiko', es: 'México', ru: 'Мексика' }, region: 'Americas' },
  { city: 'São Paulo', flag: '🇧🇷', tz: 'America/Sao_Paulo', country: { tr: 'Brezilya', en: 'Brazil', de: 'Brasilien', es: 'Brasil', ru: 'Бразилия' }, region: 'Americas' },
  { city: 'Buenos Aires', flag: '🇦🇷', tz: 'America/Argentina/Buenos_Aires', country: { tr: 'Arjantin', en: 'Argentina', de: 'Argentinien', es: 'Argentina', ru: 'Аргентина' }, region: 'Americas' },
  { city: 'Bogota', flag: '🇨🇴', tz: 'America/Bogota', country: { tr: 'Kolombiya', en: 'Colombia', de: 'Kolumbien', es: 'Colombia', ru: 'Колумбия' }, region: 'Americas' },

  // Asia & Pacific
  { city: 'Tokyo', flag: '🇯🇵', tz: 'Asia/Tokyo', country: { tr: 'Japonya', en: 'Japan', de: 'Japan', es: 'Japón', ru: 'Япония' }, region: 'Asia' },
  { city: 'Seoul', flag: '🇰🇷', tz: 'Asia/Seoul', country: { tr: 'Güney Kore', en: 'South Korea', de: 'Südkorea', es: 'Corea del Sur', ru: 'Южная Корея' }, region: 'Asia' },
  { city: 'Singapore', flag: '🇸🇬', tz: 'Asia/Singapore', country: { tr: 'Singapur', en: 'Singapore', de: 'Singapur', es: 'Singapur', ru: 'Сингапур' }, region: 'Asia' },
  { city: 'Bangkok', flag: '🇹🇭', tz: 'Asia/Bangkok', country: { tr: 'Tayland', en: 'Thailand', de: 'Thailand', es: 'Tailandia', ru: 'Таиланд' }, region: 'Asia' },
  { city: 'Hong Kong', flag: '🇭🇰', tz: 'Asia/Hong_Kong', country: { tr: 'Hong Kong', en: 'Hong Kong', de: 'Hongkong', es: 'Hong Kong', ru: 'Гонконг' }, region: 'Asia' },
  { city: 'Kuala Lumpur', flag: '🇲🇾', tz: 'Asia/Kuala_Lumpur', country: { tr: 'Malezya', en: 'Malaysia', de: 'Malaysia', es: 'Malasia', ru: 'Малайзия' }, region: 'Asia' },
  { city: 'Bali (Denpasar)', flag: '🇮🇩', tz: 'Asia/Makassar', country: { tr: 'Endonezya', en: 'Indonesia', de: 'Indonesien', es: 'Indonesia', ru: 'Индонезия' }, region: 'Asia' },
  { city: 'Sydney', flag: '🇦🇺', tz: 'Australia/Sydney', country: { tr: 'Avustralya', en: 'Australia', de: 'Australien', es: 'Australia', ru: 'Австралия' }, region: 'Asia' },
  { city: 'Auckland', flag: '🇳🇿', tz: 'Pacific/Auckland', country: { tr: 'Yeni Zelanda', en: 'New Zealand', de: 'Neuseeland', es: 'Nueva Zelanda', ru: 'Новая Зеландия' }, region: 'Asia' },
  { city: 'Delhi / Mumbai', flag: '🇮🇳', tz: 'Asia/Kolkata', country: { tr: 'Hindistan', en: 'India', de: 'Indien', es: 'India', ru: 'Индия' }, region: 'Asia' },
  { city: 'Almaty', flag: '🇰🇿', tz: 'Asia/Almaty', country: { tr: 'Kazakistan', en: 'Kazakhstan', de: 'Kasachstan', es: 'Kazajistán', ru: 'Казахстан' }, region: 'Asia' },
  { city: 'Tashkent', flag: '🇺🇿', tz: 'Asia/Tashkent', country: { tr: 'Özbekistan', en: 'Uzbekistan', de: 'Usbekistan', es: 'Uzbekistán', ru: 'Узбекистан' }, region: 'Asia' },

  // Middle East & Africa
  { city: 'Dubai', flag: '🇦🇪', tz: 'Asia/Dubai', country: { tr: 'Birleşik Arap Emirlikleri', en: 'UAE', de: 'VAE', es: 'EAU', ru: 'ОАЭ' }, region: 'Middle East' },
  { city: 'Doha', flag: '🇶🇦', tz: 'Asia/Qatar', country: { tr: 'Katar', en: 'Qatar', de: 'Katar', es: 'Catar', ru: 'Катар' }, region: 'Middle East' },
  { city: 'Riyadh', flag: '🇸🇦', tz: 'Asia/Riyadh', country: { tr: 'Suudi Arabistan', en: 'Saudi Arabia', de: 'Saudi-Arabien', es: 'Arabia Saudita', ru: 'Саудовская Аравия' }, region: 'Middle East' },
  { city: 'Cairo', flag: '🇪🇬', tz: 'Africa/Cairo', country: { tr: 'Mısır', en: 'Egypt', de: 'Ägypten', es: 'Egipto', ru: 'Египет' }, region: 'Africa' },
  { city: 'Cape Town', flag: '🇿🇦', tz: 'Africa/Johannesburg', country: { tr: 'Güney Afrika', en: 'South Africa', de: 'Südafrika', es: 'Sudáfrica', ru: 'ЮАР' }, region: 'Africa' }
];

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
