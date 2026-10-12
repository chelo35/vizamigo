export interface HubWeather {
  city: string;
  flag: string;
  country: {
    tr: string;
    en: string;
    de: string;
    es: string;
    ru: string;
  };
  tempC: number;
  condition: {
    tr: string;
    en: string;
    de: string;
    es: string;
    ru: string;
  };
  icon: string; // Emoji icon for fast render
  feelsLikeC: number;
  humidity: number;
  windKmh: number;
}

export const WORLD_WEATHER_DATA: Record<string, HubWeather> = {
  Istanbul: {
    city: 'Istanbul',
    flag: '🇹🇷',
    country: { tr: 'Türkiye', en: 'Turkey', de: 'Türkei', es: 'Turquía', ru: 'Турция' },
    tempC: 18,
    condition: { tr: 'Parçalı Bulutlu', en: 'Partly Cloudy', de: 'Teils bewölkt', es: 'Parcialmente nublado', ru: 'Переменная облачность' },
    icon: '⛅',
    feelsLikeC: 18,
    humidity: 62,
    windKmh: 14
  },
  London: {
    city: 'London',
    flag: '🇬🇧',
    country: { tr: 'Birleşik Krallık', en: 'United Kingdom', de: 'Großbritannien', es: 'Reino Unido', ru: 'Великобритания' },
    tempC: 14,
    condition: { tr: 'Hafif Yağmurlu', en: 'Light Rain', de: 'Leichter Regen', es: 'Lluvia ligera', ru: 'Небольшой дождь' },
    icon: '🌧️',
    feelsLikeC: 13,
    humidity: 78,
    windKmh: 19
  },
  'New York': {
    city: 'New York',
    flag: '🇺🇸',
    country: { tr: 'ABD (Doğu)', en: 'USA (East)', de: 'USA (Ost)', es: 'EE. UU. (Este)', ru: 'США (Восток)' },
    tempC: 16,
    condition: { tr: 'Açık & Güneşli', en: 'Sunny & Clear', de: 'Sonnig & Klar', es: 'Soleado y despejado', ru: 'Ясно и солнечно' },
    icon: '☀️',
    feelsLikeC: 16,
    humidity: 48,
    windKmh: 16
  },
  Tokyo: {
    city: 'Tokyo',
    flag: '🇯🇵',
    country: { tr: 'Japonya', en: 'Japan', de: 'Japan', es: 'Japón', ru: 'Япония' },
    tempC: 21,
    condition: { tr: 'Ilık & Açık', en: 'Mild & Clear', de: 'Mild & Klar', es: 'Templado y claro', ru: 'Тепло и ясно' },
    icon: '🌤️',
    feelsLikeC: 21,
    humidity: 55,
    windKmh: 11
  },
  Paris: {
    city: 'Paris',
    flag: '🇫🇷',
    country: { tr: 'Fransa', en: 'France', de: 'Frankreich', es: 'Francia', ru: 'Франция' },
    tempC: 15,
    condition: { tr: 'Bulutlu', en: 'Cloudy', de: 'Bewölkt', es: 'Nublado', ru: 'Пасмурно' },
    icon: '☁️',
    feelsLikeC: 14,
    humidity: 71,
    windKmh: 13
  },
  Dubai: {
    city: 'Dubai',
    flag: '🇦🇪',
    country: { tr: 'BAE', en: 'UAE', de: 'VAE', es: 'EAU', ru: 'ОАЭ' },
    tempC: 32,
    condition: { tr: 'Güneşli & Sıcak', en: 'Hot & Sunny', de: 'Heiß & Sonnig', es: 'Caluroso y soleado', ru: 'Жарко и солнечно' },
    icon: '☀️',
    feelsLikeC: 34,
    humidity: 45,
    windKmh: 15
  },
  Rome: {
    city: 'Rome',
    flag: '🇮🇹',
    country: { tr: 'İtalya', en: 'Italy', de: 'Italien', es: 'Italia', ru: 'Италия' },
    tempC: 22,
    condition: { tr: 'Güneşli & Ilık', en: 'Sunny & Warm', de: 'Sonnig & Warm', es: 'Soleado y templado', ru: 'Солнечно и тепло' },
    icon: '☀️',
    feelsLikeC: 22,
    humidity: 58,
    windKmh: 9
  },
  Frankfurt: {
    city: 'Frankfurt',
    flag: '🇩🇪',
    country: { tr: 'Almanya', en: 'Germany', de: 'Deutschland', es: 'Alemania', ru: 'Германия' },
    tempC: 13,
    condition: { tr: 'Sisli & Serin', en: 'Misty & Cool', de: 'Neblig & Kühl', es: 'Neblinoso y fresco', ru: 'Туманно и прохладно' },
    icon: '🌫️',
    feelsLikeC: 12,
    humidity: 82,
    windKmh: 10
  },
  Amsterdam: {
    city: 'Amsterdam',
    flag: '🇳🇱',
    country: { tr: 'Hollanda', en: 'Netherlands', de: 'Niederlande', es: 'Países Bajos', ru: 'Нидерланды' },
    tempC: 14,
    condition: { tr: 'Rüzgarlı & Çisenti', en: 'Windy & Drizzle', de: 'Windig & Nieselregen', es: 'Ventoso con llovizna', ru: 'Ветрено с моросью' },
    icon: '🌦️',
    feelsLikeC: 12,
    humidity: 80,
    windKmh: 24
  },
  Bangkok: {
    city: 'Bangkok',
    flag: '🇹🇭',
    country: { tr: 'Tayland', en: 'Thailand', de: 'Thailand', es: 'Tailandia', ru: 'Таиланд' },
    tempC: 31,
    condition: { tr: 'Tropikal & Nemli', en: 'Tropical & Humid', de: 'Tropisch & Feucht', es: 'Tropical y húmedo', ru: 'Тропическая жара' },
    icon: '⛅',
    feelsLikeC: 36,
    humidity: 75,
    windKmh: 8
  },
  Sarajevo: {
    city: 'Sarajevo',
    flag: '🇧🇦',
    country: { tr: 'Bosna-Hersek', en: 'Bosnia & Herzegovina', de: 'Bosnien-Herzegowina', es: 'Bosnia y Herzegovina', ru: 'Босния и Герцеговина' },
    tempC: 15,
    condition: { tr: 'Dağ Havası & Açık', en: 'Fresh & Clear', de: 'Frisch & Klar', es: 'Fresco de montaña', ru: 'Горная свежесть' },
    icon: '🌤️',
    feelsLikeC: 14,
    humidity: 60,
    windKmh: 9
  },
  Tirana: {
    city: 'Tirana',
    flag: '🇦🇱',
    country: { tr: 'Arnavutluk', en: 'Albania', de: 'Albanien', es: 'Albania', ru: 'Албания' },
    tempC: 21,
    condition: { tr: 'Güneşli Akdeniz', en: 'Sunny Mediterranean', de: 'Sonniges Mittelmeer', es: 'Mediterráneo soleado', ru: 'Средиземноморское солнце' },
    icon: '☀️',
    feelsLikeC: 21,
    humidity: 53,
    windKmh: 10
  },
  Athens: {
    city: 'Athens',
    flag: '🇬🇷',
    country: { tr: 'Yunanistan', en: 'Greece', de: 'Griechenland', es: 'Grecia', ru: 'Греция' },
    tempC: 23,
    condition: { tr: 'Güneşli', en: 'Sunny', de: 'Sonnig', es: 'Soleado', ru: 'Солнечно' },
    icon: '☀️',
    feelsLikeC: 23,
    humidity: 49,
    windKmh: 14
  },
  Madrid: {
    city: 'Madrid',
    flag: '🇪🇸',
    country: { tr: 'İspanya', en: 'Spain', de: 'Spanien', es: 'España', ru: 'Испания' },
    tempC: 20,
    condition: { tr: 'Açık & Kuru', en: 'Clear & Dry', de: 'Klar & Trocken', es: 'Despejado y seco', ru: 'Ясно и сухо' },
    icon: '☀️',
    feelsLikeC: 20,
    humidity: 42,
    windKmh: 11
  },
  Singapore: {
    city: 'Singapore',
    flag: '🇸🇬',
    country: { tr: 'Singapur', en: 'Singapore', de: 'Singapur', es: 'Singapur', ru: 'Сингапур' },
    tempC: 30,
    condition: { tr: 'Ilık & Sağanak', en: 'Passing Shower', de: 'Kurzer Schauer', es: 'Chubascos pasajeros', ru: 'Кратковременный ливень' },
    icon: '🌦️',
    feelsLikeC: 35,
    humidity: 84,
    windKmh: 10
  },
  Sydney: {
    city: 'Sydney',
    flag: '🇦🇺',
    country: { tr: 'Avustralya', en: 'Australia', de: 'Australien', es: 'Australia', ru: 'Австралия' },
    tempC: 19,
    condition: { tr: 'Ilık İlkbahar', en: 'Pleasant Spring', de: 'Angenehmer Frühling', es: 'Primavera agradable', ru: 'Приятная весна' },
    icon: '🌤️',
    feelsLikeC: 19,
    humidity: 62,
    windKmh: 18
  }
};
