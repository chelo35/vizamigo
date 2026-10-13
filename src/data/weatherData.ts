import { useEffect, useState } from 'react';
import { ALL_WORLD_HUBS, WorldHub } from './worldHubs';

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

// Comprehensive weather observations for global capitals and primary hubs
export const WORLD_WEATHER_DATA: Record<string, HubWeather> = {
  // --- Türkiye & Avrupa ---
  Istanbul: {
    city: 'Istanbul',
    flag: '🇹🇷',
    country: { tr: 'Türkiye', en: 'Turkey', de: 'Türkei', es: 'Turquía', ru: 'Турция' },
    tempC: 19,
    condition: { tr: 'Parçalı Bulutlu', en: 'Partly Cloudy', de: 'Teils bewölkt', es: 'Parcialmente nublado', ru: 'Переменная облачность' },
    icon: '⛅',
    feelsLikeC: 19,
    humidity: 62,
    windKmh: 14
  },
  Ankara: {
    city: 'Ankara',
    flag: '🇹🇷',
    country: { tr: 'Türkiye', en: 'Turkey', de: 'Türkei', es: 'Turquía', ru: 'Турция' },
    tempC: 16,
    condition: { tr: 'Açık & Güneşli', en: 'Sunny & Clear', de: 'Sonnig & Klar', es: 'Soleado y despejado', ru: 'Ясно и солнечно' },
    icon: '☀️',
    feelsLikeC: 15,
    humidity: 45,
    windKmh: 11
  },
  Antalya: {
    city: 'Antalya',
    flag: '🇹🇷',
    country: { tr: 'Türkiye', en: 'Turkey', de: 'Türkei', es: 'Turquía', ru: 'Турция' },
    tempC: 25,
    condition: { tr: 'Ilık & Güneşli', en: 'Warm & Sunny', de: 'Warm & Sonnig', es: 'Cálido y soleado', ru: 'Тепло и солнечно' },
    icon: '☀️',
    feelsLikeC: 26,
    humidity: 50,
    windKmh: 10
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
  Paris: {
    city: 'Paris',
    flag: '🇫🇷',
    country: { tr: 'Fransa', en: 'France', de: 'Frankreich', es: 'Francia', ru: 'Франция' },
    tempC: 15,
    condition: { tr: 'Bulutlu', en: 'Cloudy', de: 'Bewölkt', es: 'Nublado', ru: 'Облачно' },
    icon: '☁️',
    feelsLikeC: 15,
    humidity: 65,
    windKmh: 12
  },
  Berlin: {
    city: 'Berlin',
    flag: '🇩🇪',
    country: { tr: 'Almanya', en: 'Germany', de: 'Deutschland', es: 'Alemania', ru: 'Германия' },
    tempC: 13,
    condition: { tr: 'Serin & Parçalı', en: 'Cool & Partly Cloudy', de: 'Kühl & Teils bewölkt', es: 'Fresco y parcialmente nublado', ru: 'Прохладно и облачно' },
    icon: '⛅',
    feelsLikeC: 12,
    humidity: 68,
    windKmh: 17
  },
  Frankfurt: {
    city: 'Frankfurt',
    flag: '🇩🇪',
    country: { tr: 'Almanya', en: 'Germany', de: 'Deutschland', es: 'Alemania', ru: 'Германия' },
    tempC: 14,
    condition: { tr: 'Parçalı Bulutlu', en: 'Partly Cloudy', de: 'Teils bewölkt', es: 'Parcialmente nublado', ru: 'Переменная облачность' },
    icon: '⛅',
    feelsLikeC: 13,
    humidity: 66,
    windKmh: 14
  },
  Munich: {
    city: 'Munich',
    flag: '🇩🇪',
    country: { tr: 'Almanya', en: 'Germany', de: 'Deutschland', es: 'Alemania', ru: 'Германия' },
    tempC: 12,
    condition: { tr: 'Serin & Açık', en: 'Cool & Clear', de: 'Kühl & Klar', es: 'Fresco y claro', ru: 'Прохладно и ясно' },
    icon: '🌤️',
    feelsLikeC: 11,
    humidity: 70,
    windKmh: 10
  },
  Rome: {
    city: 'Rome',
    flag: '🇮🇹',
    country: { tr: 'İtalya', en: 'Italy', de: 'Italien', es: 'Italia', ru: 'Италия' },
    tempC: 22,
    condition: { tr: 'Güneşli & Sıcak', en: 'Sunny & Pleasant', de: 'Sonnig & Angenehm', es: 'Soleado y agradable', ru: 'Солнечно и приятно' },
    icon: '☀️',
    feelsLikeC: 23,
    humidity: 54,
    windKmh: 9
  },
  Milan: {
    city: 'Milan',
    flag: '🇮🇹',
    country: { tr: 'İtalya', en: 'Italy', de: 'Italien', es: 'Italia', ru: 'Италия' },
    tempC: 17,
    condition: { tr: 'Hafif Sisli & Açık', en: 'Hazy & Clear', de: 'Dunstig & Klar', es: 'Neblina y despejado', ru: 'Легкая дымка' },
    icon: '🌤️',
    feelsLikeC: 17,
    humidity: 68,
    windKmh: 6
  },
  Madrid: {
    city: 'Madrid',
    flag: '🇪🇸',
    country: { tr: 'İspanya', en: 'Spain', de: 'Spanien', es: 'España', ru: 'Испания' },
    tempC: 23,
    condition: { tr: 'Güneşli & Kuru', en: 'Sunny & Dry', de: 'Sonnig & Trocken', es: 'Soleado y seco', ru: 'Солнечно и сухо' },
    icon: '☀️',
    feelsLikeC: 22,
    humidity: 38,
    windKmh: 11
  },
  Barcelona: {
    city: 'Barcelona',
    flag: '🇪🇸',
    country: { tr: 'İspanya', en: 'Spain', de: 'Spanien', es: 'España', ru: 'Испания' },
    tempC: 22,
    condition: { tr: 'Ilık Akdeniz Esintisi', en: 'Pleasant Coastal Breeze', de: 'Milde Meeresbrise', es: 'Brisa marina suave', ru: 'Приятный морской бриз' },
    icon: '🌤️',
    feelsLikeC: 22,
    humidity: 58,
    windKmh: 14
  },
  Amsterdam: {
    city: 'Amsterdam',
    flag: '🇳🇱',
    country: { tr: 'Hollanda', en: 'Netherlands', de: 'Niederlande', es: 'Países Bajos', ru: 'Нидерланды' },
    tempC: 13,
    condition: { tr: 'Hafif Çisenti & Rüzgarlı', en: 'Drizzle & Breezy', de: 'Nieselregen & Windig', es: 'Llovizna y viento', ru: 'Морось и ветер' },
    icon: '🌧️',
    feelsLikeC: 11,
    humidity: 82,
    windKmh: 24
  },
  Brussels: {
    city: 'Brussels',
    flag: '🇧🇪',
    country: { tr: 'Belçika', en: 'Belgium', de: 'Belgien', es: 'Bélgica', ru: 'Бельгия' },
    tempC: 14,
    condition: { tr: 'Bulutlu', en: 'Cloudy', de: 'Bewölkt', es: 'Nublado', ru: 'Облачно' },
    icon: '☁️',
    feelsLikeC: 13,
    humidity: 75,
    windKmh: 16
  },
  Vienna: {
    city: 'Vienna',
    flag: '🇦🇹',
    country: { tr: 'Avusturya', en: 'Austria', de: 'Österreich', es: 'Austria', ru: 'Австрия' },
    tempC: 15,
    condition: { tr: 'Açık & Serin', en: 'Crisp & Clear', de: 'Frisch & Klar', es: 'Fresco y claro', ru: 'Свежо и ясно' },
    icon: '🌤️',
    feelsLikeC: 14,
    humidity: 58,
    windKmh: 12
  },
  Bern: {
    city: 'Bern',
    flag: '🇨🇭',
    country: { tr: 'İsviçre', en: 'Switzerland', de: 'Schweiz', es: 'Suiza', ru: 'Швейцария' },
    tempC: 13,
    condition: { tr: 'Dağ Havası & Açık', en: 'Alpine Fresh & Sunny', de: 'Alpenfrisch & Sonnig', es: 'Fresco alpino y soleado', ru: 'Альпийская свежесть' },
    icon: '🌤️',
    feelsLikeC: 12,
    humidity: 62,
    windKmh: 8
  },
  Zurich: {
    city: 'Zurich',
    flag: '🇨🇭',
    country: { tr: 'İsviçre', en: 'Switzerland', de: 'Schweiz', es: 'Suiza', ru: 'Швейцария' },
    tempC: 14,
    condition: { tr: 'Parçalı Bulutlu', en: 'Partly Cloudy', de: 'Teils bewölkt', es: 'Parcialmente nublado', ru: 'Переменная облачность' },
    icon: '⛅',
    feelsLikeC: 13,
    humidity: 64,
    windKmh: 10
  },
  Athens: {
    city: 'Athens',
    flag: '🇬🇷',
    country: { tr: 'Yunanistan', en: 'Greece', de: 'Griechenland', es: 'Grecia', ru: 'Греция' },
    tempC: 24,
    condition: { tr: 'Güneşli & Sıcak', en: 'Sunny & Warm', de: 'Sonnig & Warm', es: 'Soleado y cálido', ru: 'Солнечно и тепло' },
    icon: '☀️',
    feelsLikeC: 24,
    humidity: 46,
    windKmh: 16
  },
  Lisbon: {
    city: 'Lisbon',
    flag: '🇵🇹',
    country: { tr: 'Portekiz', en: 'Portugal', de: 'Portugal', es: 'Portugal', ru: 'Португалия' },
    tempC: 22,
    condition: { tr: 'Açık & Okyanus Esintili', en: 'Clear & Ocean Breeze', de: 'Klar & Meeresbrise', es: 'Despejado y brisa marina', ru: 'Ясно и свежо' },
    icon: '☀️',
    feelsLikeC: 22,
    humidity: 60,
    windKmh: 18
  },
  Dublin: {
    city: 'Dublin',
    flag: '🇮🇪',
    country: { tr: 'İrlanda', en: 'Ireland', de: 'Irland', es: 'Irlanda', ru: 'Ирландия' },
    tempC: 13,
    condition: { tr: 'Serin & Yağmurlu', en: 'Showery & Mild', de: 'Schauer & Kühl', es: 'Chubascos y fresco', ru: 'Кратковременные дожди' },
    icon: '🌧️',
    feelsLikeC: 12,
    humidity: 80,
    windKmh: 22
  },
  Prague: {
    city: 'Prague',
    flag: '🇨🇿',
    country: { tr: 'Çekya', en: 'Czech Republic', de: 'Tschechien', es: 'Chequia', ru: 'Чехия' },
    tempC: 13,
    condition: { tr: 'Parçalı Bulutlu', en: 'Partly Cloudy', de: 'Teils bewölkt', es: 'Parcialmente nublado', ru: 'Переменная облачность' },
    icon: '⛅',
    feelsLikeC: 12,
    humidity: 64,
    windKmh: 13
  },
  Warsaw: {
    city: 'Warsaw',
    flag: '🇵🇱',
    country: { tr: 'Polonya', en: 'Poland', de: 'Polen', es: 'Polonia', ru: 'Польша' },
    tempC: 11,
    condition: { tr: 'Serin & Bulutlu', en: 'Cool & Overcast', de: 'Kühl & Bedeckt', es: 'Fresco y nublado', ru: 'Прохладно и пасмурно' },
    icon: '☁️',
    feelsLikeC: 10,
    humidity: 70,
    windKmh: 15
  },
  Budapest: {
    city: 'Budapest',
    flag: '🇭🇺',
    country: { tr: 'Macaristan', en: 'Hungary', de: 'Ungarn', es: 'Hungría', ru: 'Венгрия' },
    tempC: 16,
    condition: { tr: 'Ilık & Açık', en: 'Mild & Sunny', de: 'Mild & Sonnig', es: 'Templado y soleado', ru: 'Умеренно и солнечно' },
    icon: '🌤️',
    feelsLikeC: 16,
    humidity: 55,
    windKmh: 11
  },
  Zagreb: {
    city: 'Zagreb',
    flag: '🇭🇷',
    country: { tr: 'Hırvatistan', en: 'Croatia', de: 'Kroatien', es: 'Croacia', ru: 'Хорватия' },
    tempC: 17,
    condition: { tr: 'Parçalı Bulutlu', en: 'Partly Cloudy', de: 'Teils bewölkt', es: 'Parcialmente nublado', ru: 'Переменная облачность' },
    icon: '⛅',
    feelsLikeC: 17,
    humidity: 60,
    windKmh: 8
  },
  Belgrade: {
    city: 'Belgrade',
    flag: '🇷🇸',
    country: { tr: 'Sırbistan', en: 'Serbia', de: 'Serbien', es: 'Serbia', ru: 'Сербия' },
    tempC: 18,
    condition: { tr: 'Güneşli', en: 'Sunny', de: 'Sonnig', es: 'Soleado', ru: 'Солнечно' },
    icon: '☀️',
    feelsLikeC: 18,
    humidity: 52,
    windKmh: 10
  },
  Sarajevo: {
    city: 'Sarajevo',
    flag: '🇧🇦',
    country: { tr: 'Bosna-Hersek', en: 'Bosnia & Herzegovina', de: 'Bosnien-Herzegowina', es: 'Bosnia y Herzegovina', ru: 'Босния и Герцеговина' },
    tempC: 15,
    condition: { tr: 'Serin & Açık', en: 'Crisp & Clear', de: 'Frisch & Klar', es: 'Fresco y claro', ru: 'Свежо и ясно' },
    icon: '🌤️',
    feelsLikeC: 14,
    humidity: 58,
    windKmh: 7
  },
  Podgorica: {
    city: 'Podgorica',
    flag: '🇲🇪',
    country: { tr: 'Karadağ', en: 'Montenegro', de: 'Montenegro', es: 'Montenegro', ru: 'Черногория' },
    tempC: 21,
    condition: { tr: 'Güneşli & Sıcak', en: 'Sunny & Pleasant', de: 'Sonnig & Angenehm', es: 'Soleado y agradable', ru: 'Солнечно и тепло' },
    icon: '☀️',
    feelsLikeC: 21,
    humidity: 48,
    windKmh: 9
  },
  Tirana: {
    city: 'Tirana',
    flag: '🇦🇱',
    country: { tr: 'Arnavutluk', en: 'Albania', de: 'Albanien', es: 'Albania', ru: 'Албания' },
    tempC: 22,
    condition: { tr: 'Ilık & Güneşli', en: 'Mild & Sunny', de: 'Mild & Sonnig', es: 'Templado y soleado', ru: 'Тепло и солнечно' },
    icon: '☀️',
    feelsLikeC: 22,
    humidity: 52,
    windKmh: 8
  },
  Skopje: {
    city: 'Skopje',
    flag: '🇲🇰',
    country: { tr: 'Kuzey Makedonya', en: 'North Macedonia', de: 'Nordmazedonien', es: 'Macedonia del Norte', ru: 'Северная Македония' },
    tempC: 18,
    condition: { tr: 'Açık & Güneşli', en: 'Sunny & Clear', de: 'Sonnig & Klar', es: 'Soleado y claro', ru: 'Ясно и солнечно' },
    icon: '☀️',
    feelsLikeC: 18,
    humidity: 50,
    windKmh: 9
  },
  Sofia: {
    city: 'Sofia',
    flag: '🇧🇬',
    country: { tr: 'Bulgaristan', en: 'Bulgaria', de: 'Bulgarien', es: 'Bulgaria', ru: 'Болгария' },
    tempC: 16,
    condition: { tr: 'Parçalı Bulutlu', en: 'Partly Cloudy', de: 'Teils bewölkt', es: 'Parcialmente nublado', ru: 'Переменная облачность' },
    icon: '⛅',
    feelsLikeC: 15,
    humidity: 55,
    windKmh: 11
  },
  Bucharest: {
    city: 'Bucharest',
    flag: '🇷🇴',
    country: { tr: 'Romanya', en: 'Romania', de: 'Rumänien', es: 'Rumania', ru: 'Румыния' },
    tempC: 17,
    condition: { tr: 'Açık', en: 'Clear', de: 'Klar', es: 'Despejado', ru: 'Ясно' },
    icon: '☀️',
    feelsLikeC: 17,
    humidity: 56,
    windKmh: 12
  },
  Chisinau: {
    city: 'Chisinau',
    flag: '🇲🇩',
    country: { tr: 'Moldova', en: 'Moldova', de: 'Moldawien', es: 'Moldavia', ru: 'Молдова' },
    tempC: 15,
    condition: { tr: 'Parçalı Bulutlu', en: 'Partly Cloudy', de: 'Teils bewölkt', es: 'Parcialmente nublado', ru: 'Переменная облачность' },
    icon: '⛅',
    feelsLikeC: 14,
    humidity: 59,
    windKmh: 13
  },
  Kyiv: {
    city: 'Kyiv',
    flag: '🇺🇦',
    country: { tr: 'Ukrayna', en: 'Ukraine', de: 'Ukraine', es: 'Ucrania', ru: 'Украина' },
    tempC: 12,
    condition: { tr: 'Serin & Bulutlu', en: 'Cool & Overcast', de: 'Kühl & Bedeckt', es: 'Fresco y nublado', ru: 'Прохладно и пасмурно' },
    icon: '☁️',
    feelsLikeC: 11,
    humidity: 68,
    windKmh: 14
  },
  Moscow: {
    city: 'Moscow',
    flag: '🇷🇺',
    country: { tr: 'Rusya', en: 'Russia', de: 'Russland', es: 'Rusia', ru: 'Россия' },
    tempC: 8,
    condition: { tr: 'Soğuk & Bulutlu', en: 'Chilly & Cloudy', de: 'Kalt & Bewölkt', es: 'Frío y nublado', ru: 'Холодно и облачно' },
    icon: '☁️',
    feelsLikeC: 6,
    humidity: 74,
    windKmh: 16
  },
  Stockholm: {
    city: 'Stockholm',
    flag: '🇸🇪',
    country: { tr: 'İsveç', en: 'Sweden', de: 'Schweden', es: 'Suecia', ru: 'Швеция' },
    tempC: 9,
    condition: { tr: 'Serin İskandinav Havası', en: 'Crisp Nordic Breeze', de: 'Frische Nordische Luft', es: 'Fresco nórdico', ru: 'Скандинавская прохлада' },
    icon: '🌤️',
    feelsLikeC: 7,
    humidity: 65,
    windKmh: 18
  },
  Oslo: {
    city: 'Oslo',
    flag: '🇳🇴',
    country: { tr: 'Norveç', en: 'Norway', de: 'Norwegen', es: 'Noruega', ru: 'Норвегия' },
    tempC: 8,
    condition: { tr: 'Serin & Parçalı', en: 'Brisk & Partly Cloudy', de: 'Frisch & Bewölkt', es: 'Fresco y nublado', ru: 'Свежо и облачно' },
    icon: '⛅',
    feelsLikeC: 6,
    humidity: 72,
    windKmh: 12
  },
  Copenhagen: {
    city: 'Copenhagen',
    flag: '🇩🇰',
    country: { tr: 'Danimarka', en: 'Denmark', de: 'Dänemark', es: 'Dinamarca', ru: 'Дания' },
    tempC: 12,
    condition: { tr: 'Rüzgarlı & Açık', en: 'Breezy & Clear', de: 'Windig & Klar', es: 'Ventoso y claro', ru: 'Ветрено и ясно' },
    icon: '🌤️',
    feelsLikeC: 10,
    humidity: 68,
    windKmh: 22
  },
  Helsinki: {
    city: 'Helsinki',
    flag: '🇫🇮',
    country: { tr: 'Finlandiya', en: 'Finland', de: 'Finnland', es: 'Finlandia', ru: 'Финляндия' },
    tempC: 8,
    condition: { tr: 'Serin & Açık', en: 'Cool & Clear', de: 'Kühl & Klar', es: 'Fresco y despejado', ru: 'Прохладно и ясно' },
    icon: '🌤️',
    feelsLikeC: 6,
    humidity: 66,
    windKmh: 16
  },
  Tallinn: {
    city: 'Tallinn',
    flag: '🇪🇪',
    country: { tr: 'Estonya', en: 'Estonia', de: 'Estland', es: 'Estonia', ru: 'Эстония' },
    tempC: 9,
    condition: { tr: 'Serin & Parçalı', en: 'Cool & Partly Cloudy', de: 'Kühl & Teils bewölkt', es: 'Fresco y parcialmente nublado', ru: 'Прохладно и облачно' },
    icon: '⛅',
    feelsLikeC: 7,
    humidity: 70,
    windKmh: 17
  },
  Riga: {
    city: 'Riga',
    flag: '🇱🇻',
    country: { tr: 'Letonya', en: 'Latvia', de: 'Lettland', es: 'Letonia', ru: 'Латвия' },
    tempC: 10,
    condition: { tr: 'Bulutlu', en: 'Cloudy', de: 'Bewölkt', es: 'Nublado', ru: 'Облачно' },
    icon: '☁️',
    feelsLikeC: 8,
    humidity: 73,
    windKmh: 15
  },
  Vilnius: {
    city: 'Vilnius',
    flag: '🇱🇹',
    country: { tr: 'Litvanya', en: 'Lithuania', de: 'Litauen', es: 'Lituania', ru: 'Литва' },
    tempC: 10,
    condition: { tr: 'Parçalı Bulutlu', en: 'Partly Cloudy', de: 'Teils bewölkt', es: 'Parcialmente nublado', ru: 'Переменная облачность' },
    icon: '⛅',
    feelsLikeC: 9,
    humidity: 69,
    windKmh: 14
  },
  Reykjavik: {
    city: 'Reykjavik',
    flag: '🇮🇸',
    country: { tr: 'İzlanda', en: 'Iceland', de: 'Island', es: 'Islandia', ru: 'Исландия' },
    tempC: 5,
    condition: { tr: 'Rüzgarlı & Soğuk', en: 'Windy & Cold', de: 'Windig & Kalt', es: 'Ventoso y frío', ru: 'Ветрено и холодно' },
    icon: '💨',
    feelsLikeC: 1,
    humidity: 78,
    windKmh: 32
  },
  Tbilisi: {
    city: 'Tbilisi',
    flag: '🇬🇪',
    country: { tr: 'Gürcistan', en: 'Georgia', de: 'Georgien', es: 'Georgia', ru: 'Грузия' },
    tempC: 19,
    condition: { tr: 'Ilık & Güneşli', en: 'Mild & Sunny', de: 'Mild & Sonnig', es: 'Templado y soleado', ru: 'Тепло и солнечно' },
    icon: '☀️',
    feelsLikeC: 19,
    humidity: 50,
    windKmh: 10
  },
  Batumi: {
    city: 'Batumi',
    flag: '🇬🇪',
    country: { tr: 'Gürcistan', en: 'Georgia', de: 'Georgien', es: 'Georgia', ru: 'Грузия' },
    tempC: 20,
    condition: { tr: 'Ilık Sahil Havası', en: 'Mild Coastal Air', de: 'Milde Küstenluft', es: 'Templado costero', ru: 'Мягкий морской климат' },
    icon: '🌤️',
    feelsLikeC: 20,
    humidity: 65,
    windKmh: 12
  },
  Baku: {
    city: 'Baku',
    flag: '🇦🇿',
    country: { tr: 'Azerbaycan', en: 'Azerbaijan', de: 'Aserbaidschan', es: 'Azerbaiyán', ru: 'Азербайджан' },
    tempC: 18,
    condition: { tr: 'Hazar Rüzgarı & Açık', en: 'Caspian Breeze & Clear', de: 'Kaspische Brise & Klar', es: 'Brisa del Caspio y despejado', ru: 'Каспийский бриз и ясно' },
    icon: '🌤️',
    feelsLikeC: 18,
    humidity: 58,
    windKmh: 24
  },
  Yerevan: {
    city: 'Yerevan',
    flag: '🇦🇲',
    country: { tr: 'Ermenistan', en: 'Armenia', de: 'Armenien', es: 'Armenia', ru: 'Армения' },
    tempC: 17,
    condition: { tr: 'Güneşli & Kuru', en: 'Sunny & Dry', de: 'Sonnig & Trocken', es: 'Soleado y seco', ru: 'Солнечно и сухо' },
    icon: '☀️',
    feelsLikeC: 17,
    humidity: 45,
    windKmh: 9
  },

  // --- Orta Asya ---
  Astana: {
    city: 'Astana',
    flag: '🇰🇿',
    country: { tr: 'Kazakistan', en: 'Kazakhstan', de: 'Kasachstan', es: 'Kazajistán', ru: 'Казахстан' },
    tempC: 8,
    condition: { tr: 'Serin Bozkır Rüzgarı', en: 'Brisk Steppe Wind', de: 'Frischer Steppenwind', es: 'Viento fresco de estepa', ru: 'Степной ветер' },
    icon: '💨',
    feelsLikeC: 5,
    humidity: 62,
    windKmh: 22
  },
  Almaty: {
    city: 'Almaty',
    flag: '🇰🇿',
    country: { tr: 'Kazakistan', en: 'Kazakhstan', de: 'Kasachstan', es: 'Kazajistán', ru: 'Казахстан' },
    tempC: 14,
    condition: { tr: 'Dağ Eteği & Açık', en: 'Mountain Vista & Sunny', de: 'Bergblick & Sonnig', es: 'Vistas a la montaña y soleado', ru: 'Ясно, вид на горы' },
    icon: '☀️',
    feelsLikeC: 14,
    humidity: 48,
    windKmh: 7
  },
  Tashkent: {
    city: 'Tashkent',
    flag: '🇺🇿',
    country: { tr: 'Özbekistan', en: 'Uzbekistan', de: 'Usbekistan', es: 'Uzbekistán', ru: 'Узбекистан' },
    tempC: 20,
    condition: { tr: 'Güneşli & Ilık', en: 'Sunny & Warm', de: 'Sonnig & Warm', es: 'Soleado y cálido', ru: 'Солнечно и тепло' },
    icon: '☀️',
    feelsLikeC: 20,
    humidity: 40,
    windKmh: 8
  },
  Samarkand: {
    city: 'Samarkand',
    flag: '🇺🇿',
    country: { tr: 'Özbekistan', en: 'Uzbekistan', de: 'Usbekistan', es: 'Uzbekistán', ru: 'Узбекистан' },
    tempC: 19,
    condition: { tr: 'Açık & Güneşli', en: 'Clear & Bright', de: 'Klar & Sonnig', es: 'Despejado y luminoso', ru: 'Ясно и солнечно' },
    icon: '☀️',
    feelsLikeC: 19,
    humidity: 38,
    windKmh: 9
  },
  Bishkek: {
    city: 'Bishkek',
    flag: '🇰🇬',
    country: { tr: 'Kırgızistan', en: 'Kyrgyzstan', de: 'Kirgisistan', es: 'Kirguistán', ru: 'Кыргызстан' },
    tempC: 15,
    condition: { tr: 'Açık & Serin', en: 'Clear & Crisp', de: 'Klar & Frisch', es: 'Despejado y fresco', ru: 'Ясно и свежо' },
    icon: '🌤️',
    feelsLikeC: 14,
    humidity: 45,
    windKmh: 6
  },
  Dushanbe: {
    city: 'Dushanbe',
    flag: '🇹🇯',
    country: { tr: 'Tacikistan', en: 'Tajikistan', de: 'Tadschikistan', es: 'Tayikistán', ru: 'Таджикистан' },
    tempC: 18,
    condition: { tr: 'Güneşli', en: 'Sunny', de: 'Sonnig', es: 'Soleado', ru: 'Солнечно' },
    icon: '☀️',
    feelsLikeC: 18,
    humidity: 42,
    windKmh: 7
  },
  Ashgabat: {
    city: 'Ashgabat',
    flag: '🇹🇲',
    country: { tr: 'Türkmenistan', en: 'Turkmenistan', de: 'Turkmenistan', es: 'Turkmenistán', ru: 'Туркменистан' },
    tempC: 22,
    condition: { tr: 'Sıcak & Kuru', en: 'Warm & Dry', de: 'Warm & Trocken', es: 'Cálido y seco', ru: 'Тепло и сухо' },
    icon: '☀️',
    feelsLikeC: 22,
    humidity: 32,
    windKmh: 10
  },

  // --- Orta Doğu & Körfez ---
  Dubai: {
    city: 'Dubai',
    flag: '🇦🇪',
    country: { tr: 'Birleşik Arap Emirlikleri', en: 'UAE', de: 'VAE', es: 'EAU', ru: 'ОАЭ' },
    tempC: 32,
    condition: { tr: 'Sıcak & Güneşli', en: 'Sunny & Hot', de: 'Heiß & Sonnig', es: 'Caluroso y soleado', ru: 'Жарко и солнечно' },
    icon: '☀️',
    feelsLikeC: 35,
    humidity: 58,
    windKmh: 14
  },
  'Abu Dhabi': {
    city: 'Abu Dhabi',
    flag: '🇦🇪',
    country: { tr: 'Birleşik Arap Emirlikleri', en: 'UAE', de: 'VAE', es: 'EAU', ru: 'ОАЭ' },
    tempC: 32,
    condition: { tr: 'Güneşli', en: 'Sunny', de: 'Sonnig', es: 'Soleado', ru: 'Солнечно' },
    icon: '☀️',
    feelsLikeC: 34,
    humidity: 55,
    windKmh: 12
  },
  Doha: {
    city: 'Doha',
    flag: '🇶🇦',
    country: { tr: 'Katar', en: 'Qatar', de: 'Katar', es: 'Catar', ru: 'Катар' },
    tempC: 31,
    condition: { tr: 'Açık & Sıcak', en: 'Clear & Hot', de: 'Klar & Heiß', es: 'Despejado y caluroso', ru: 'Ясно и жарко' },
    icon: '☀️',
    feelsLikeC: 33,
    humidity: 54,
    windKmh: 16
  },
  Riyadh: {
    city: 'Riyadh',
    flag: '🇸🇦',
    country: { tr: 'Suudi Arabistan', en: 'Saudi Arabia', de: 'Saudi-Arabien', es: 'Arabia Saudita', ru: 'Саудовская Аравия' },
    tempC: 30,
    condition: { tr: 'Sıcak & Çöl Havası', en: 'Warm Desert Air', de: 'Heiße Wüstenluft', es: 'Aire cálido del desierto', ru: 'Пустынный зной' },
    icon: '☀️',
    feelsLikeC: 29,
    humidity: 20,
    windKmh: 13
  },
  'Kuwait City': {
    city: 'Kuwait City',
    flag: '🇰🇼',
    country: { tr: 'Kuveyt', en: 'Kuwait', de: 'Kuwait', es: 'Kuwait', ru: 'Кувейт' },
    tempC: 29,
    condition: { tr: 'Güneşli & Açık', en: 'Sunny & Clear', de: 'Sonnig & Klar', es: 'Soleado y despejado', ru: 'Солнечно и ясно' },
    icon: '☀️',
    feelsLikeC: 28,
    humidity: 28,
    windKmh: 15
  },
  Muscat: {
    city: 'Muscat',
    flag: '🇴🇲',
    country: { tr: 'Umman', en: 'Oman', de: 'Oman', es: 'Omán', ru: 'Оман' },
    tempC: 30,
    condition: { tr: 'Ilık & Güneşli', en: 'Sunny & Pleasant', de: 'Sonnig & Angenehm', es: 'Soleado y agradable', ru: 'Солнечно и приятно' },
    icon: '☀️',
    feelsLikeC: 32,
    humidity: 60,
    windKmh: 11
  },
  Amman: {
    city: 'Amman',
    flag: '🇯🇴',
    country: { tr: 'Ürdün', en: 'Jordan', de: 'Jordanien', es: 'Jordania', ru: 'Иордания' },
    tempC: 22,
    condition: { tr: 'Güneşli & Ferah', en: 'Sunny & Mild', de: 'Sonnig & Mild', es: 'Soleado y templado', ru: 'Солнечно и умеренно' },
    icon: '☀️',
    feelsLikeC: 22,
    humidity: 40,
    windKmh: 12
  },
  Beirut: {
    city: 'Beirut',
    flag: '🇱🇧',
    country: { tr: 'Lübnan', en: 'Lebanon', de: 'Libanon', es: 'Líbano', ru: 'Ливан' },
    tempC: 24,
    condition: { tr: 'Akdeniz Güneşi', en: 'Mediterranean Sunshine', de: 'Mittelmeersonne', es: 'Sol mediterráneo', ru: 'Средиземноморское солнце' },
    icon: '☀️',
    feelsLikeC: 24,
    humidity: 62,
    windKmh: 14
  },
  Cairo: {
    city: 'Cairo',
    flag: '🇪🇬',
    country: { tr: 'Mısır', en: 'Egypt', de: 'Ägypten', es: 'Egipto', ru: 'Египет' },
    tempC: 28,
    condition: { tr: 'Sıcak & Güneşli', en: 'Sunny & Warm', de: 'Sonnig & Warm', es: 'Soleado y cálido', ru: 'Солнечно и тепло' },
    icon: '☀️',
    feelsLikeC: 28,
    humidity: 45,
    windKmh: 12
  },
  'Sharm El Sheikh': {
    city: 'Sharm El Sheikh',
    flag: '🇪🇬',
    country: { tr: 'Mısır', en: 'Egypt', de: 'Ägypten', es: 'Egipto', ru: 'Египет' },
    tempC: 29,
    condition: { tr: 'Kızıldeniz Güneşi', en: 'Red Sea Sun', de: 'Rotes Meer Sonne', es: 'Sol del Mar Rojo', ru: 'Солнце Красного моря' },
    icon: '☀️',
    feelsLikeC: 29,
    humidity: 48,
    windKmh: 15
  },
  Rabat: {
    city: 'Rabat',
    flag: '🇲🇦',
    country: { tr: 'Fas', en: 'Morocco', de: 'Marokko', es: 'Marruecos', ru: 'Марокко' },
    tempC: 23,
    condition: { tr: 'Ilık & Açık', en: 'Mild & Sunny', de: 'Mild & Sonnig', es: 'Templado y soleado', ru: 'Тепло и солнечно' },
    icon: '🌤️',
    feelsLikeC: 23,
    humidity: 65,
    windKmh: 14
  },
  Marrakech: {
    city: 'Marrakech',
    flag: '🇲🇦',
    country: { tr: 'Fas', en: 'Morocco', de: 'Marokko', es: 'Marruecos', ru: 'Марокко' },
    tempC: 26,
    condition: { tr: 'Güneşli & Sıcak', en: 'Warm & Sunny', de: 'Warm & Sonnig', es: 'Cálido y soleado', ru: 'Тепло и солнечно' },
    icon: '☀️',
    feelsLikeC: 26,
    humidity: 38,
    windKmh: 9
  },

  // --- Asya & Pasifik ---
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
  Kyoto: {
    city: 'Kyoto',
    flag: '🇯🇵',
    country: { tr: 'Japonya', en: 'Japan', de: 'Japan', es: 'Japón', ru: 'Япония' },
    tempC: 20,
    condition: { tr: 'Hafif Bulutlu', en: 'Fair & Mild', de: 'Mild & Heiter', es: 'Templado y despejado', ru: 'Тепло и ясно' },
    icon: '🌤️',
    feelsLikeC: 20,
    humidity: 58,
    windKmh: 8
  },
  Seoul: {
    city: 'Seoul',
    flag: '🇰🇷',
    country: { tr: 'Güney Kore', en: 'South Korea', de: 'Südkorea', es: 'Corea del Sur', ru: 'Южная Корея' },
    tempC: 17,
    condition: { tr: 'Açık & Serin', en: 'Crisp & Sunny', de: 'Frisch & Sonnig', es: 'Fresco y soleado', ru: 'Свежо и солнечно' },
    icon: '☀️',
    feelsLikeC: 17,
    humidity: 50,
    windKmh: 13
  },
  Beijing: {
    city: 'Beijing',
    flag: '🇨🇳',
    country: { tr: 'Çin', en: 'China', de: 'China', es: 'China', ru: 'Китай' },
    tempC: 16,
    condition: { tr: 'Açık Sonbahar Havası', en: 'Autumn Breeze & Clear', de: 'Herbstlich & Klar', es: 'Otoñal y despejado', ru: 'Осенняя свежесть' },
    icon: '☀️',
    feelsLikeC: 15,
    humidity: 42,
    windKmh: 14
  },
  Shanghai: {
    city: 'Shanghai',
    flag: '🇨🇳',
    country: { tr: 'Çin', en: 'China', de: 'China', es: 'China', ru: 'Китай' },
    tempC: 22,
    condition: { tr: 'Parçalı Bulutlu', en: 'Partly Cloudy', de: 'Teils bewölkt', es: 'Parcialmente nublado', ru: 'Переменная облачность' },
    icon: '⛅',
    feelsLikeC: 22,
    humidity: 62,
    windKmh: 16
  },
  'Hong Kong': {
    city: 'Hong Kong',
    flag: '🇭🇰',
    country: { tr: 'Hong Kong', en: 'Hong Kong', de: 'Hongkong', es: 'Hong Kong', ru: 'Гонконг' },
    tempC: 27,
    condition: { tr: 'Ilık & Hafif Nemli', en: 'Warm & Balmy', de: 'Warm & Angenehm', es: 'Cálido y agradable', ru: 'Тепло и комфортно' },
    icon: '🌤️',
    feelsLikeC: 28,
    humidity: 68,
    windKmh: 18
  },
  Taipei: {
    city: 'Taipei',
    flag: '🇹🇼',
    country: { tr: 'Tayvan', en: 'Taiwan', de: 'Taiwan', es: 'Taiwán', ru: 'Тайвань' },
    tempC: 26,
    condition: { tr: 'Ilık & Parçalı', en: 'Mild & Partly Cloudy', de: 'Mild & Bewölkt', es: 'Templado y nublado', ru: 'Умеренно и облачно' },
    icon: '⛅',
    feelsLikeC: 27,
    humidity: 72,
    windKmh: 14
  },
  Bangkok: {
    city: 'Bangkok',
    flag: '🇹🇭',
    country: { tr: 'Tayland', en: 'Thailand', de: 'Thailand', es: 'Tailandia', ru: 'Таиланд' },
    tempC: 31,
    condition: { tr: 'Tropik & Güneşli', en: 'Tropical & Humid', de: 'Tropisch & Feucht', es: 'Tropical y húmedo', ru: 'Тропическая жара' },
    icon: '☀️',
    feelsLikeC: 36,
    humidity: 72,
    windKmh: 9
  },
  Phuket: {
    city: 'Phuket',
    flag: '🇹🇭',
    country: { tr: 'Tayland', en: 'Thailand', de: 'Thailand', es: 'Tailandia', ru: 'Таиланд' },
    tempC: 30,
    condition: { tr: 'Ada Güneşi & Tropik', en: 'Tropical Beach Sun', de: 'Tropische Strandsonne', es: 'Sol de playa tropical', ru: 'Тропическое солнце' },
    icon: '☀️',
    feelsLikeC: 34,
    humidity: 75,
    windKmh: 12
  },
  Singapore: {
    city: 'Singapore',
    flag: '🇸🇬',
    country: { tr: 'Singapur', en: 'Singapore', de: 'Singapur', es: 'Singapur', ru: 'Сингапур' },
    tempC: 30,
    condition: { tr: 'Tropik & Nemli', en: 'Tropical & Humid', de: 'Tropisch & Feucht', es: 'Tropical y húmedo', ru: 'Тропическая влажность' },
    icon: '⛅',
    feelsLikeC: 35,
    humidity: 78,
    windKmh: 10
  },
  'Kuala Lumpur': {
    city: 'Kuala Lumpur',
    flag: '🇲🇾',
    country: { tr: 'Malezya', en: 'Malaysia', de: 'Malaysia', es: 'Malasia', ru: 'Малайзия' },
    tempC: 31,
    condition: { tr: 'Tropik & Sıcak', en: 'Warm & Tropical', de: 'Warm & Tropisch', es: 'Cálido y tropical', ru: 'Тепло и влажно' },
    icon: '⛅',
    feelsLikeC: 35,
    humidity: 76,
    windKmh: 8
  },
  Jakarta: {
    city: 'Jakarta',
    flag: '🇮🇩',
    country: { tr: 'Endonezya', en: 'Indonesia', de: 'Indonesien', es: 'Indonesia', ru: 'Индонезия' },
    tempC: 32,
    condition: { tr: 'Sıcak & Parçalı', en: 'Hot & Partly Cloudy', de: 'Heiß & Teils bewölkt', es: 'Caluroso y nublado', ru: 'Жарко и облачно' },
    icon: '⛅',
    feelsLikeC: 37,
    humidity: 70,
    windKmh: 11
  },
  'Bali (Denpasar)': {
    city: 'Bali (Denpasar)',
    flag: '🇮🇩',
    country: { tr: 'Endonezya', en: 'Indonesia', de: 'Indonesien', es: 'Indonesia', ru: 'Индонезия' },
    tempC: 29,
    condition: { tr: 'Tropik Ada Esintisi', en: 'Tropical Island Breeze', de: 'Tropische Inselbrise', es: 'Brisa de isla tropical', ru: 'Тропический островной бриз' },
    icon: '🌤️',
    feelsLikeC: 32,
    humidity: 74,
    windKmh: 14
  },
  Manila: {
    city: 'Manila',
    flag: '🇵🇭',
    country: { tr: 'Filipinler', en: 'Philippines', de: 'Philippinen', es: 'Filipinas', ru: 'Филиппины' },
    tempC: 30,
    condition: { tr: 'Sıcak & Nemli', en: 'Warm & Humid', de: 'Warm & Feucht', es: 'Cálido y húmedo', ru: 'Жарко и влажно' },
    icon: '⛅',
    feelsLikeC: 35,
    humidity: 75,
    windKmh: 13
  },
  Hanoi: {
    city: 'Hanoi',
    flag: '🇻🇳',
    country: { tr: 'Vietnam', en: 'Vietnam', de: 'Vietnam', es: 'Vietnam', ru: 'Вьетнам' },
    tempC: 27,
    condition: { tr: 'Ilık & Parçalı', en: 'Pleasant & Mild', de: 'Angenehm & Mild', es: 'Agradable y templado', ru: 'Приятно и умеренно' },
    icon: '🌤️',
    feelsLikeC: 28,
    humidity: 68,
    windKmh: 10
  },
  'New Delhi': {
    city: 'New Delhi',
    flag: '🇮🇳',
    country: { tr: 'Hindistan', en: 'India', de: 'Indien', es: 'India', ru: 'Индия' },
    tempC: 28,
    condition: { tr: 'Sıcak & Açık', en: 'Warm & Clear', de: 'Warm & Klar', es: 'Cálido y despejado', ru: 'Тепло и ясно' },
    icon: '☀️',
    feelsLikeC: 29,
    humidity: 48,
    windKmh: 9
  },
  Mumbai: {
    city: 'Mumbai',
    flag: '🇮🇳',
    country: { tr: 'Hindistan', en: 'India', de: 'Indien', es: 'India', ru: 'Индия' },
    tempC: 31,
    condition: { tr: 'Sahil Havası & Sıcak', en: 'Coastal Warmth', de: 'Küstenwärme', es: 'Calidez costera', ru: 'Прибрежное тепло' },
    icon: '🌤️',
    feelsLikeC: 35,
    humidity: 70,
    windKmh: 12
  },
  Islamabad: {
    city: 'Islamabad',
    flag: '🇵🇰',
    country: { tr: 'Pakistan', en: 'Pakistan', de: 'Pakistan', es: 'Pakistán', ru: 'Пакистан' },
    tempC: 24,
    condition: { tr: 'Güneşli & Ferah', en: 'Sunny & Pleasant', de: 'Sonnig & Angenehm', es: 'Soleado y agradable', ru: 'Солнечно и приятно' },
    icon: '☀️',
    feelsLikeC: 24,
    humidity: 45,
    windKmh: 8
  },
  Colombo: {
    city: 'Colombo',
    flag: '🇱🇰',
    country: { tr: 'Sri Lanka', en: 'Sri Lanka', de: 'Sri Lanka', es: 'Sri Lanka', ru: 'Шри-Ланка' },
    tempC: 29,
    condition: { tr: 'Tropik Hint Okyanusu', en: 'Indian Ocean Tropical', de: 'Indischer Ozean Tropisch', es: 'Tropical del Índico', ru: 'Тропики Индийского океана' },
    icon: '⛅',
    feelsLikeC: 33,
    humidity: 78,
    windKmh: 15
  },
  Kathmandu: {
    city: 'Kathmandu',
    flag: '🇳🇵',
    country: { tr: 'Nepal', en: 'Nepal', de: 'Nepal', es: 'Nepal', ru: 'Непал' },
    tempC: 19,
    condition: { tr: 'Himalaya Temiz Havası', en: 'Himalayan Clean Air', de: 'Himalaya-Höhenluft', es: 'Aire puro del Himalaya', ru: 'Гималайская свежесть' },
    icon: '☀️',
    feelsLikeC: 19,
    humidity: 50,
    windKmh: 7
  },
  Male: {
    city: 'Male',
    flag: '🇲🇻',
    country: { tr: 'Maldivler', en: 'Maldives', de: 'Malediven', es: 'Maldivas', ru: 'Мальдивы' },
    tempC: 30,
    condition: { tr: 'Atol Güneşi & Ilık', en: 'Atoll Sun & Ocean Breeze', de: 'Atollsonne & Meeresbrise', es: 'Sol de atolón y brisa marina', ru: 'Солнце атолла' },
    icon: '☀️',
    feelsLikeC: 34,
    humidity: 75,
    windKmh: 16
  },

  // --- Amerika Kıtası ---
  'Washington D.C.': {
    city: 'Washington D.C.',
    flag: '🇺🇸',
    country: { tr: 'ABD', en: 'USA', de: 'USA', es: 'EE. UU.', ru: 'США' },
    tempC: 17,
    condition: { tr: 'Açık & Ferah', en: 'Clear & Crisp', de: 'Klar & Frisch', es: 'Despejado y fresco', ru: 'Ясно и свежо' },
    icon: '☀️',
    feelsLikeC: 17,
    humidity: 50,
    windKmh: 14
  },
  'New York': {
    city: 'New York',
    flag: '🇺🇸',
    country: { tr: 'ABD', en: 'USA', de: 'USA', es: 'EE. UU.', ru: 'США' },
    tempC: 16,
    condition: { tr: 'Açık & Güneşli', en: 'Sunny & Clear', de: 'Sonnig & Klar', es: 'Soleado y despejado', ru: 'Ясно и солнечно' },
    icon: '☀️',
    feelsLikeC: 16,
    humidity: 48,
    windKmh: 16
  },
  'Los Angeles': {
    city: 'Los Angeles',
    flag: '🇺🇸',
    country: { tr: 'ABD', en: 'USA', de: 'USA', es: 'EE. UU.', ru: 'США' },
    tempC: 24,
    condition: { tr: 'Güneşli Pasifik Havası', en: 'Sunny Pacific Breeze', de: 'Sonnige Pazifikbrise', es: 'Soleado y brisa del Pacífico', ru: 'Солнечный бриз' },
    icon: '☀️',
    feelsLikeC: 24,
    humidity: 45,
    windKmh: 11
  },
  Chicago: {
    city: 'Chicago',
    flag: '🇺🇸',
    country: { tr: 'ABD', en: 'USA', de: 'USA', es: 'EE. UU.', ru: 'США' },
    tempC: 13,
    condition: { tr: 'Rüzgarlı & Açık', en: 'Windy & Crisp', de: 'Windig & Frisch', es: 'Ventoso y fresco', ru: 'Ветрено и свежо' },
    icon: '💨',
    feelsLikeC: 11,
    humidity: 55,
    windKmh: 28
  },
  Miami: {
    city: 'Miami',
    flag: '🇺🇸',
    country: { tr: 'ABD', en: 'USA', de: 'USA', es: 'EE. UU.', ru: 'США' },
    tempC: 28,
    condition: { tr: 'Sıcak & Tropik Sahil', en: 'Warm & Tropical Beach', de: 'Warm & Tropischer Strand', es: 'Cálido y playa tropical', ru: 'Тепло и солнечно' },
    icon: '☀️',
    feelsLikeC: 30,
    humidity: 70,
    windKmh: 16
  },
  'San Francisco': {
    city: 'San Francisco',
    flag: '🇺🇸',
    country: { tr: 'ABD', en: 'USA', de: 'USA', es: 'EE. UU.', ru: 'США' },
    tempC: 17,
    condition: { tr: 'Körfez Havası & Açık', en: 'Bay Breeze & Sunny', de: 'Buchtbrise & Sonnig', es: 'Brisa de la bahía y soleado', ru: 'Бриз залива' },
    icon: '🌤️',
    feelsLikeC: 17,
    humidity: 62,
    windKmh: 19
  },
  Ottawa: {
    city: 'Ottawa',
    flag: '🇨🇦',
    country: { tr: 'Kanada', en: 'Canada', de: 'Kanada', es: 'Canadá', ru: 'Канада' },
    tempC: 11,
    condition: { tr: 'Serin & Parçalı', en: 'Cool & Partly Cloudy', de: 'Kühl & Teils bewölkt', es: 'Fresco y parcialmente nublado', ru: 'Прохладно и облачно' },
    icon: '⛅',
    feelsLikeC: 9,
    humidity: 60,
    windKmh: 17
  },
  Toronto: {
    city: 'Toronto',
    flag: '🇨🇦',
    country: { tr: 'Kanada', en: 'Canada', de: 'Kanada', es: 'Canadá', ru: 'Канада' },
    tempC: 13,
    condition: { tr: 'Açık & Serin', en: 'Crisp & Clear', de: 'Frisch & Klar', es: 'Fresco y despejado', ru: 'Свежо и ясно' },
    icon: '🌤️',
    feelsLikeC: 12,
    humidity: 58,
    windKmh: 18
  },
  Vancouver: {
    city: 'Vancouver',
    flag: '🇨🇦',
    country: { tr: 'Kanada', en: 'Canada', de: 'Kanada', es: 'Canadá', ru: 'Канада' },
    tempC: 12,
    condition: { tr: 'Hafif Yağmurlu', en: 'Light Coastal Rain', de: 'Leichter Küstenregen', es: 'Lluvia ligera costera', ru: 'Небольшой дождь' },
    icon: '🌧️',
    feelsLikeC: 11,
    humidity: 78,
    windKmh: 14
  },
  'Mexico City': {
    city: 'Mexico City',
    flag: '🇲🇽',
    country: { tr: 'Meksika', en: 'Mexico', de: 'Mexiko', es: 'México', ru: 'Мексика' },
    tempC: 22,
    condition: { tr: 'Ilık & Güneşli', en: 'Mild & Sunny', de: 'Mild & Sonnig', es: 'Templado y soleado', ru: 'Тепло и солнечно' },
    icon: '☀️',
    feelsLikeC: 22,
    humidity: 48,
    windKmh: 10
  },
  Cancun: {
    city: 'Cancun',
    flag: '🇲🇽',
    country: { tr: 'Meksika', en: 'Mexico', de: 'Mexiko', es: 'México', ru: 'Мексика' },
    tempC: 29,
    condition: { tr: 'Karayip Güneşi', en: 'Caribbean Sun', de: 'Karibiksonne', es: 'Sol del Caribe', ru: 'Карибское солнце' },
    icon: '☀️',
    feelsLikeC: 32,
    humidity: 72,
    windKmh: 18
  },
  Havana: {
    city: 'Havana',
    flag: '🇨🇺',
    country: { tr: 'Küba', en: 'Cuba', de: 'Kuba', es: 'Cuba', ru: 'Куба' },
    tempC: 28,
    condition: { tr: 'Tropik & Sıcak', en: 'Tropical Warmth', de: 'Tropische Wärme', es: 'Calidez tropical', ru: 'Тропическое тепло' },
    icon: '☀️',
    feelsLikeC: 30,
    humidity: 70,
    windKmh: 14
  },
  Bogota: {
    city: 'Bogota',
    flag: '🇨🇴',
    country: { tr: 'Kolombiya', en: 'Colombia', de: 'Kolumbien', es: 'Colombia', ru: 'Колумбия' },
    tempC: 17,
    condition: { tr: 'Bahar Havası & Bulutlu', en: 'Spring-like & Cloudy', de: 'Frühlingshaft & Bewölkt', es: 'Primaveral y nublado', ru: 'Весенняя прохлада' },
    icon: '⛅',
    feelsLikeC: 17,
    humidity: 68,
    windKmh: 10
  },
  Lima: {
    city: 'Lima',
    flag: '🇵🇪',
    country: { tr: 'Peru', en: 'Peru', de: 'Peru', es: 'Perú', ru: 'Перу' },
    tempC: 20,
    condition: { tr: 'Pasifik Esintili', en: 'Mild Pacific Air', de: 'Milde Pazifikluft', es: 'Suave del Pacífico', ru: 'Тихоокеанский бриз' },
    icon: '⛅',
    feelsLikeC: 20,
    humidity: 74,
    windKmh: 13
  },
  Santiago: {
    city: 'Santiago',
    flag: '🇨🇱',
    country: { tr: 'Şili', en: 'Chile', de: 'Chile', es: 'Chile', ru: 'Чили' },
    tempC: 22,
    condition: { tr: 'Açık & Güneşli', en: 'Clear & Sunny', de: 'Klar & Sonnig', es: 'Despejado y soleado', ru: 'Ясно и солнечно' },
    icon: '☀️',
    feelsLikeC: 22,
    humidity: 45,
    windKmh: 10
  },
  'Buenos Aires': {
    city: 'Buenos Aires',
    flag: '🇦🇷',
    country: { tr: 'Arjantin', en: 'Argentina', de: 'Argentinien', es: 'Argentina', ru: 'Аргентина' },
    tempC: 21,
    condition: { tr: 'Bahar Güneşi', en: 'Spring Sun', de: 'Frühlingssonne', es: 'Sol primaveral', ru: 'Весеннее солнце' },
    icon: '☀️',
    feelsLikeC: 21,
    humidity: 56,
    windKmh: 14
  },
  Brasilia: {
    city: 'Brasilia',
    flag: '🇧🇷',
    country: { tr: 'Brezilya', en: 'Brazil', de: 'Brasilien', es: 'Brasil', ru: 'Бразилия' },
    tempC: 27,
    condition: { tr: 'Ilık & Güneşli', en: 'Warm & Sunny', de: 'Warm & Sonnig', es: 'Cálido y soleado', ru: 'Тепло и солнечно' },
    icon: '☀️',
    feelsLikeC: 28,
    humidity: 55,
    windKmh: 12
  },
  'São Paulo': {
    city: 'São Paulo',
    flag: '🇧🇷',
    country: { tr: 'Brezilya', en: 'Brazil', de: 'Brasilien', es: 'Brasil', ru: 'Бразилия' },
    tempC: 24,
    condition: { tr: 'Ilık & Parçalı', en: 'Mild & Partly Cloudy', de: 'Mild & Teils bewölkt', es: 'Templado y nublado', ru: 'Тепло и переменная облачность' },
    icon: '⛅',
    feelsLikeC: 24,
    humidity: 65,
    windKmh: 12
  },
  'Rio de Janeiro': {
    city: 'Rio de Janeiro',
    flag: '🇧🇷',
    country: { tr: 'Brezilya', en: 'Brazil', de: 'Brasilien', es: 'Brasil', ru: 'Бразилия' },
    tempC: 28,
    condition: { tr: 'Tropik Plaj Güneşi', en: 'Tropical Beach Day', de: 'Tropischer Strandtag', es: 'Día de playa tropical', ru: 'Тропический пляж' },
    icon: '☀️',
    feelsLikeC: 30,
    humidity: 68,
    windKmh: 15
  },

  // --- Afrika & Okyanusya ---
  Pretoria: {
    city: 'Pretoria',
    flag: '🇿🇦',
    country: { tr: 'Güney Afrika', en: 'South Africa', de: 'Südafrika', es: 'Sudáfrica', ru: 'ЮАР' },
    tempC: 24,
    condition: { tr: 'Güneşli & Sıcak', en: 'Sunny & Pleasant', de: 'Sonnig & Angenehm', es: 'Soleado y agradable', ru: 'Солнечно и тепло' },
    icon: '☀️',
    feelsLikeC: 24,
    humidity: 40,
    windKmh: 10
  },
  'Cape Town': {
    city: 'Cape Town',
    flag: '🇿🇦',
    country: { tr: 'Güney Afrika', en: 'South Africa', de: 'Südafrika', es: 'Sudáfrica', ru: 'ЮАР' },
    tempC: 20,
    condition: { tr: 'Okyanus Esintili', en: 'Breezy & Sunny', de: 'Windig & Sonnig', es: 'Ventoso y soleado', ru: 'Ветрено и солнечно' },
    icon: '🌤️',
    feelsLikeC: 20,
    humidity: 62,
    windKmh: 24
  },
  Nairobi: {
    city: 'Nairobi',
    flag: '🇰🇪',
    country: { tr: 'Kenya', en: 'Kenya', de: 'Kenia', es: 'Kenia', ru: 'Кения' },
    tempC: 23,
    condition: { tr: 'Ilık Yayla Havası', en: 'Pleasant Highland Air', de: 'Angenehme Hochlandluft', es: 'Agradable aire de tierras altas', ru: 'Горная свежесть' },
    icon: '🌤️',
    feelsLikeC: 23,
    humidity: 54,
    windKmh: 11
  },
  Canberra: {
    city: 'Canberra',
    flag: '🇦🇺',
    country: { tr: 'Avustralya', en: 'Australia', de: 'Australien', es: 'Australia', ru: 'Австралия' },
    tempC: 18,
    condition: { tr: 'Bahar Güneşi & Açık', en: 'Crisp Spring Sun', de: 'Frische Frühlingssonne', es: 'Sol primaveral fresco', ru: 'Весеннее солнце' },
    icon: '☀️',
    feelsLikeC: 18,
    humidity: 45,
    windKmh: 14
  },
  Sydney: {
    city: 'Sydney',
    flag: '🇦🇺',
    country: { tr: 'Avustralya', en: 'Australia', de: 'Australien', es: 'Australia', ru: 'Австралия' },
    tempC: 22,
    condition: { tr: 'Ilık & Güneşli', en: 'Sunny & Pleasant', de: 'Sonnig & Angenehm', es: 'Soleado y agradable', ru: 'Солнечно и приятно' },
    icon: '☀️',
    feelsLikeC: 22,
    humidity: 58,
    windKmh: 16
  },
  Melbourne: {
    city: 'Melbourne',
    flag: '🇦🇺',
    country: { tr: 'Avustralya', en: 'Australia', de: 'Australien', es: 'Australia', ru: 'Австралия' },
    tempC: 19,
    condition: { tr: 'Parçalı Bulutlu', en: 'Partly Cloudy', de: 'Teils bewölkt', es: 'Parcialmente nublado', ru: 'Переменная облачность' },
    icon: '⛅',
    feelsLikeC: 19,
    humidity: 55,
    windKmh: 18
  },
  Wellington: {
    city: 'Wellington',
    flag: '🇳🇿',
    country: { tr: 'Yeni Zelanda', en: 'New Zealand', de: 'Neuseeland', es: 'Nueva Zelanda', ru: 'Новая Зеландия' },
    tempC: 15,
    condition: { tr: 'Rüzgarlı & Açık', en: 'Breezy & Sunny', de: 'Windig & Sonnig', es: 'Ventoso y soleado', ru: 'Ветрено и солнечно' },
    icon: '🌤️',
    feelsLikeC: 13,
    humidity: 68,
    windKmh: 28
  },
  Auckland: {
    city: 'Auckland',
    flag: '🇳🇿',
    country: { tr: 'Yeni Zelanda', en: 'New Zealand', de: 'Neuseeland', es: 'Nueva Zelanda', ru: 'Новая Зеландия' },
    tempC: 18,
    condition: { tr: 'Ilık & Parçalı', en: 'Mild & Partly Cloudy', de: 'Mild & Teils bewölkt', es: 'Templado y parcialmente nublado', ru: 'Тепло и переменная облачность' },
    icon: '⛅',
    feelsLikeC: 18,
    humidity: 65,
    windKmh: 20
  }
};

const WEATHER_CACHE_KEY = 'vizamigo_live_weather_v1';
const WEATHER_TTL_MS = 20 * 60 * 1000; // 20 minutes

interface CachedWeatherEntry {
  tempC: number;
  feelsLikeC: number;
  humidity: number;
  windKmh: number;
  code: number;
  ts: number;
}

const liveCache: Record<string, CachedWeatherEntry> = {};
const weatherListeners = new Set<() => void>();
const pendingCities = new Set<string>();

try {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem(WEATHER_CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, CachedWeatherEntry>;
      const now = Date.now();
      Object.entries(parsed).forEach(([city, entry]) => {
        if (entry && now - entry.ts < WEATHER_TTL_MS) {
          liveCache[city] = entry;
        }
      });
    }
  }
} catch {}

function wmoCodeToCondition(code: number): { icon: string; condition: HubWeather['condition'] } {
  if (code === 0) {
    return {
      icon: '☀️',
      condition: { tr: 'Açık & Güneşli', en: 'Sunny & Clear', de: 'Sonnig & Klar', es: 'Soleado y despejado', ru: 'Ясно и солнечно' }
    };
  }
  if (code === 1 || code === 2) {
    return {
      icon: '⛅',
      condition: { tr: 'Parçalı Bulutlu', en: 'Partly Cloudy', de: 'Teils bewölkt', es: 'Parcialmente nublado', ru: 'Переменная облачность' }
    };
  }
  if (code === 3) {
    return {
      icon: '☁️',
      condition: { tr: 'Çok Bulutlu', en: 'Overcast', de: 'Bewölkt', es: 'Nublado', ru: 'Пасмурно' }
    };
  }
  if (code === 45 || code === 48) {
    return {
      icon: '🌫️',
      condition: { tr: 'Sisli & Puslu', en: 'Foggy', de: 'Neblig', es: 'Niebla', ru: 'Туман' }
    };
  }
  if (code >= 51 && code <= 67) {
    return {
      icon: '🌧️',
      condition: { tr: 'Yağmurlu', en: 'Rainy', de: 'Regnerisch', es: 'Lluvioso', ru: 'Дождливо' }
    };
  }
  if (code >= 71 && code <= 77) {
    return {
      icon: '❄️',
      condition: { tr: 'Kar Yağışlı', en: 'Snowy', de: 'Schneefall', es: 'Nevando', ru: 'Снег' }
    };
  }
  if (code >= 80 && code <= 82) {
    return {
      icon: '🌦️',
      condition: { tr: 'Sağanak Yağışlı', en: 'Rain Showers', de: 'Regenschauer', es: 'Chubascos', ru: 'Ливень' }
    };
  }
  if (code >= 95) {
    return {
      icon: '⛈️',
      condition: { tr: 'Fırtına & Gök Gürültülü', en: 'Thunderstorm', de: 'Gewitter', es: 'Tormenta', ru: 'Гроза' }
    };
  }
  return {
    icon: '🌤️',
    condition: { tr: 'Açık & Ilık', en: 'Mild & Clear', de: 'Mild & Klar', es: 'Templado', ru: 'Ясно' }
  };
}

function notifyWeatherListeners() {
  weatherListeners.forEach((cb) => {
    try {
      cb();
    } catch {}
  });
}

/**
 * Batch-fetches live current weather from Open-Meteo for the given hubs (up to 40 per request).
 */
export async function fetchLiveWeatherForHubs(hubs: WorldHub[]): Promise<void> {
  if (typeof window === 'undefined' || hubs.length === 0) return;

  const now = Date.now();
  const toFetch = hubs
    .filter((h) => {
      if (typeof h.lat !== 'number' || typeof h.lng !== 'number') return false;
      if (pendingCities.has(h.city)) return false;
      const cached = liveCache[h.city];
      return !cached || now - cached.ts >= WEATHER_TTL_MS;
    })
    .slice(0, 40);

  if (toFetch.length === 0) return;

  toFetch.forEach((h) => pendingCities.add(h.city));

  try {
    const lats = toFetch.map((h) => h.lat!.toFixed(2)).join(',');
    const lngs = toFetch.map((h) => h.lng!.toFixed(2)).join(',');
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lngs}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code`;
    const res = await fetch(url);
    if (!res.ok) return;
    const data = await res.json();
    const list = Array.isArray(data) ? data : [data];

    list.forEach((item, idx) => {
      const hub = toFetch[idx];
      if (!hub || !item || !item.current) return;
      const cur = item.current;
      liveCache[hub.city] = {
        tempC: Math.round(cur.temperature_2m ?? 20),
        feelsLikeC: Math.round(cur.apparent_temperature ?? cur.temperature_2m ?? 20),
        humidity: Math.round(cur.relative_humidity_2m ?? 55),
        windKmh: Math.round(cur.wind_speed_10m ?? 12),
        code: Number(cur.weather_code ?? 0),
        ts: Date.now()
      };
    });

    try {
      localStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(liveCache));
    } catch {}
    notifyWeatherListeners();
  } catch {
    // Silent fallback to baseline
  } finally {
    toFetch.forEach((h) => pendingCities.delete(h.city));
  }
}

/**
 * React hook that fetches live weather for the given hubs and re-renders when live observations arrive.
 */
export function useLiveWeather(hubs: WorldHub[]) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const onUpdate = () => setTick((t) => t + 1);
    weatherListeners.add(onUpdate);
    fetchLiveWeatherForHubs(hubs);
    return () => {
      weatherListeners.delete(onUpdate);
    };
  }, [hubs.map((h) => h.city).slice(0, 40).join(',')]);
}

export function getHubWeather(cityName: string, hub?: WorldHub): HubWeather {
  const targetHub =
    hub ||
    ALL_WORLD_HUBS.find(
      (h) =>
        h.city.toLowerCase() === cityName.toLowerCase() ||
        (h.cityTr && h.cityTr.toLowerCase() === cityName.toLowerCase())
    );

  const canonicalCity = targetHub?.city || cityName;

  // 1. Live Open-Meteo observation if available
  const live = liveCache[canonicalCity];
  if (live) {
    const { icon, condition } = wmoCodeToCondition(live.code);
    const base = WORLD_WEATHER_DATA[canonicalCity];
    return {
      city: canonicalCity,
      flag: targetHub?.flag || base?.flag || '🌍',
      country: targetHub?.country || base?.country || { tr: 'Dünya', en: 'Global', de: 'Weltweit', es: 'Global', ru: 'Мир' },
      tempC: live.tempC,
      feelsLikeC: live.feelsLikeC,
      humidity: live.humidity,
      windKmh: live.windKmh,
      icon,
      condition
    };
  }

  // 2. Curated baseline if present
  if (WORLD_WEATHER_DATA[canonicalCity]) {
    return WORLD_WEATHER_DATA[canonicalCity];
  }

  if (!targetHub) {
    return {
      city: cityName,
      flag: '🌍',
      country: { tr: 'Dünya', en: 'Global', de: 'Weltweit', es: 'Global', ru: 'Мир' },
      tempC: 20,
      condition: { tr: 'Açık & Ilık', en: 'Clear & Mild', de: 'Klar & Mild', es: 'Despejado y templado', ru: 'Ясно и тепло' },
      icon: '☀️',
      feelsLikeC: 20,
      humidity: 50,
      windKmh: 12
    };
  }

  // 3. Latitude & city-specific climate estimate before live fetch resolves
  const absLat = Math.abs(targetHub.lat ?? 35);
  let hash = 0;
  for (let i = 0; i < targetHub.city.length; i++) {
    hash = (hash * 31 + targetHub.city.charCodeAt(i)) % 97;
  }
  const offset = (hash % 5) - 2; // -2..+2 C city micro-variation
  const baseTemp = Math.round(31 - absLat * 0.42 + offset);
  const tempC = Math.max(-5, Math.min(36, baseTemp));

  let condition = { tr: 'Açık & Güneşli', en: 'Sunny & Clear', de: 'Sonnig & Klar', es: 'Soleado y despejado', ru: 'Ясно и солнечно' };
  let icon = '☀️';
  if (tempC >= 27) {
    condition = { tr: 'Sıcak & Güneşli', en: 'Warm & Sunny', de: 'Warm & Sonnig', es: 'Cálido y soleado', ru: 'Тепло и солнечно' };
    icon = '☀️';
  } else if (tempC >= 20) {
    condition = { tr: 'Güneşli & Ilık', en: 'Sunny & Pleasant', de: 'Sonnig & Angenehm', es: 'Soleado y agradable', ru: 'Солнечно и приятно' };
    icon = '🌤️';
  } else if (tempC >= 13) {
    condition = { tr: 'Parçalı Bulutlu', en: 'Partly Cloudy', de: 'Teils bewölkt', es: 'Parcialmente nublado', ru: 'Переменная облачность' };
    icon = '⛅';
  } else {
    condition = { tr: 'Serin & Bulutlu', en: 'Cool & Cloudy', de: 'Kühl & Bewölkt', es: 'Fresco y nublado', ru: 'Прохладно и облачно' };
    icon = '☁️';
  }

  return {
    city: targetHub.city,
    flag: targetHub.flag,
    country: targetHub.country,
    tempC,
    condition,
    icon,
    feelsLikeC: tempC + (hash % 2 === 0 ? 1 : 0),
    humidity: 48 + (hash % 28),
    windKmh: 9 + (hash % 15)
  };
}

