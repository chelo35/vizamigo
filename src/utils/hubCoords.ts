import { WorldHub } from '../data/worldHubs';
import { GEO_DATA } from '../data/geoData';

// Aynı ülkede birden fazla şehir varken pinlerin üst üste binmemesi için kesin koordinatlar
const SPECIAL_CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  Istanbul: { lat: 41.01, lng: 28.98 }, Ankara: { lat: 39.93, lng: 32.85 }, Antalya: { lat: 36.89, lng: 30.71 },
  Frankfurt: { lat: 50.11, lng: 8.68 }, Munich: { lat: 48.14, lng: 11.58 }, Berlin: { lat: 52.52, lng: 13.4 },
  Milan: { lat: 45.46, lng: 9.19 }, Rome: { lat: 41.9, lng: 12.5 }, Barcelona: { lat: 41.39, lng: 2.17 },
  Madrid: { lat: 40.42, lng: -3.7 }, Zurich: { lat: 47.38, lng: 8.54 }, Geneva: { lat: 46.2, lng: 6.14 },
  Bern: { lat: 46.95, lng: 7.45 }, Dubrovnik: { lat: 42.65, lng: 18.09 }, Zagreb: { lat: 45.81, lng: 15.98 },
  Budva: { lat: 42.29, lng: 18.84 }, Podgorica: { lat: 42.43, lng: 19.26 }, Almaty: { lat: 43.24, lng: 76.91 },
  Astana: { lat: 51.17, lng: 71.43 }, Samarkand: { lat: 39.65, lng: 66.96 }, Tashkent: { lat: 41.31, lng: 69.24 },
  Jeddah: { lat: 21.54, lng: 39.17 }, Riyadh: { lat: 24.71, lng: 46.68 }, Dubai: { lat: 25.2, lng: 55.27 },
  'Abu Dhabi': { lat: 24.45, lng: 54.38 }, Alexandria: { lat: 31.2, lng: 29.92 }, Cairo: { lat: 30.04, lng: 31.24 },
  'Sharm El-Sheikh': { lat: 27.92, lng: 34.33 }, Hurghada: { lat: 27.26, lng: 33.81 }, Casablanca: { lat: 33.57, lng: -7.59 },
  Marrakech: { lat: 31.63, lng: -8.01 }, Rabat: { lat: 34.02, lng: -6.83 }, Kyoto: { lat: 35.01, lng: 135.77 },
  Osaka: { lat: 34.69, lng: 135.5 }, Tokyo: { lat: 35.68, lng: 139.77 }, Shanghai: { lat: 31.23, lng: 121.47 },
  Beijing: { lat: 39.9, lng: 116.41 }, 'Hong Kong': { lat: 22.32, lng: 114.17 }, Phuket: { lat: 7.88, lng: 98.39 },
  'Chiang Mai': { lat: 18.79, lng: 98.98 }, Bangkok: { lat: 13.76, lng: 100.5 }, Bali: { lat: -8.65, lng: 115.22 },
  Denpasar: { lat: -8.65, lng: 115.22 }, Jakarta: { lat: -6.2, lng: 106.85 }, 'Ho Chi Minh': { lat: 10.82, lng: 106.63 },
  Hanoi: { lat: 21.03, lng: 105.83 }, Mumbai: { lat: 19.08, lng: 72.88 }, 'New Delhi': { lat: 28.61, lng: 77.21 },
  'New York': { lat: 40.71, lng: -74.01 }, 'Los Angeles': { lat: 34.05, lng: -118.24 }, Chicago: { lat: 41.88, lng: -87.63 },
  Miami: { lat: 25.76, lng: -80.19 }, 'San Francisco': { lat: 37.77, lng: -122.42 }, Toronto: { lat: 43.65, lng: -79.38 },
  Vancouver: { lat: 49.28, lng: -123.12 }, Montreal: { lat: 45.5, lng: -73.57 }, Ottawa: { lat: 45.42, lng: -75.7 },
  Cancun: { lat: 21.16, lng: -86.85 }, 'Mexico City': { lat: 19.43, lng: -99.13 }, Medellin: { lat: 6.24, lng: -75.58 },
  Bogota: { lat: 4.71, lng: -74.07 }, 'São Paulo': { lat: -23.55, lng: -46.63 }, 'Rio de Janeiro': { lat: -22.91, lng: -43.17 },
  Brasilia: { lat: -15.79, lng: -47.88 }, 'Cape Town': { lat: -33.92, lng: 18.42 }, Johannesburg: { lat: -26.2, lng: 28.04 },
  Pretoria: { lat: -25.75, lng: 28.19 }, Zanzibar: { lat: -6.16, lng: 39.2 }, Melbourne: { lat: -37.81, lng: 144.96 },
  Sydney: { lat: -33.87, lng: 151.21 }, Canberra: { lat: -35.28, lng: 149.13 }, Auckland: { lat: -36.85, lng: 174.76 },
  Wellington: { lat: -41.29, lng: 174.78 }, Washington: { lat: 38.9, lng: -77.04 }, London: { lat: 51.51, lng: -0.13 },
  Paris: { lat: 48.86, lng: 2.35 }, Lagos: { lat: 6.52, lng: 3.38 }, Abuja: { lat: 9.08, lng: 7.4 },
  Karachi: { lat: 24.86, lng: 67.0 }, Islamabad: { lat: 33.68, lng: 73.05 }, Lahore: { lat: 31.55, lng: 74.34 }
};

export function flagToCountryCode(flag: string): string {
  const chars = [...flag];
  if (chars.length < 2) return '';
  const cp1 = chars[0].codePointAt(0);
  const cp2 = chars[1].codePointAt(0);
  if (!cp1 || !cp2) return '';
  return String.fromCharCode(cp1 - 127397, cp2 - 127397);
}

export function getHubCoords(hub: WorldHub): { lat: number; lng: number } {
  if (typeof hub.lat === 'number' && typeof hub.lng === 'number') return { lat: hub.lat, lng: hub.lng };
  const special = SPECIAL_CITY_COORDS[hub.city];
  if (special) return special;
  const geo = GEO_DATA[flagToCountryCode(hub.flag)];
  return geo ? { lat: geo.lat, lng: geo.lng } : { lat: 0, lng: 0 };
}
