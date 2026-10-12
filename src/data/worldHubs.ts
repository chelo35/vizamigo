// Comprehensive global travel hubs & world capitals for live world clock, weather, and widgets
export interface WorldHub {
  city: string;
  cityTr?: string;
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
}

export const ALL_WORLD_HUBS: WorldHub[] = [
  // ==========================================
  // TÜRKİYE & AVRUPA BAŞKENTLERİ VE HUB'LARI
  // ==========================================
  { city: 'Ankara', cityTr: 'Ankara', flag: '🇹🇷', tz: 'Europe/Istanbul', country: { tr: 'Türkiye', en: 'Turkey', de: 'Türkei', es: 'Turquía', ru: 'Турция' }, region: 'Europe' },
  { city: 'Istanbul', cityTr: 'İstanbul', flag: '🇹🇷', tz: 'Europe/Istanbul', country: { tr: 'Türkiye', en: 'Turkey', de: 'Türkei', es: 'Turquía', ru: 'Турция' }, region: 'Europe' },
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
