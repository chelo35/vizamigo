/** Çerez izni: yalnızca AB/AEA, İngiltere ve İsviçre'deki ziyaretçilerden istenir (saat dilimine göre). */
const KEY = 'vz_consent';
const NON_EU = new Set(['Europe/Istanbul', 'Europe/Moscow', 'Europe/Minsk', 'Europe/Kaliningrad', 'Europe/Samara', 'Europe/Volgograd', 'Europe/Saratov', 'Europe/Ulyanovsk', 'Europe/Astrakhan', 'Europe/Kirov', 'Europe/Simferopol', 'Europe/Kiev', 'Europe/Kyiv', 'Europe/Chisinau', 'Europe/Belgrade', 'Europe/Sarajevo', 'Europe/Skopje', 'Europe/Podgorica', 'Europe/Tirane']);
export const consentRegion = (): boolean => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    return (tz.startsWith('Europe/') && !NON_EU.has(tz)) || tz === 'Atlantic/Canary' || tz === 'Atlantic/Madeira' || tz === 'Atlantic/Azores' || tz === 'Atlantic/Reykjavik';
  } catch {
    return false;
  }
};
export const consentValue = (): 'all' | 'essential' | null => {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'all' || v === 'essential' ? v : null;
  } catch {
    return null;
  }
};
/** Üçüncü taraf çerezleri (ortaklık izleme, gömülü vitrinler) kullanılabilir mi? */
export const thirdPartyAllowed = (): boolean => !consentRegion() || consentValue() === 'all';
export const setConsent = (v: 'all' | 'essential') => {
  try {
    localStorage.setItem(KEY, v);
  } catch {}
  window.dispatchEvent(new CustomEvent('vz:consent', { detail: v }));
  if (v === 'all') (window as unknown as { __vzLoadDrive?: () => void }).__vzLoadDrive?.();
};
