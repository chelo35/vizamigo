import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

export const GOOGLE_MAPS_API_KEY =
  (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) ||
  'AIzaSyAzDaV9ICj1tYBuUHQSeMXWaZNm7dEaIfE';

let loadPromise: Promise<void> | null = null;
let optionsSet = false;

/**
 * Loads the Google Maps JS API exactly once and shares it across all map surfaces
 * (country map, route planner, global radar).
 * Rejects if the key is invalid / referrer-restricted so callers can show a clear message.
 */
export function loadGoogleMaps(): Promise<void> {
  if (typeof window !== 'undefined' && window.google?.maps?.Map) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise<void>((resolve, reject) => {
    try {
      if (!optionsSet) {
        setOptions({ key: GOOGLE_MAPS_API_KEY, v: 'weekly' });
        optionsSet = true;
      }
      // Google calls this global when the key is rejected (e.g. RefererNotAllowedMapError)
      (window as unknown as { gm_authFailure?: () => void }).gm_authFailure = () => {
        window.dispatchEvent(new CustomEvent('vizamigo:gmaps-auth-failure'));
      };
      Promise.all([importLibrary('maps'), importLibrary('geometry')])
        .then(() => resolve())
        .catch((err: unknown) => {
          loadPromise = null;
          reject(err);
        });
    } catch (err) {
      loadPromise = null;
      reject(err);
    }
  });
  return loadPromise;
}

// Shared dark map palette that keeps country borders and city labels readable
export const DARK_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#172033' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0b0f17' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#a5b4cb' }] },
  { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: '#5b7194' }, { weight: 1.3 }] },
  { featureType: 'administrative.country', elementType: 'labels.text.fill', stylers: [{ color: '#e2e8f0' }] },
  { featureType: 'administrative.province', elementType: 'geometry.stroke', stylers: [{ color: '#2c3a52' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#cbd5e1' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#24324a' }] },
  { featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: '#1a2438' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0a1220' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#4b6080' }] }
];
