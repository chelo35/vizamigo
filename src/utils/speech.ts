/**
 * Ücretsiz sesli okuma: tarayıcının/cihazın kendi sesleri. Her dil için cihazdaki EN İYİ sesi seçer
 * (Edge'in "Natural" sinir ağı sesleri, Google sesleri, Apple'ın Siri/Premium/Enhanced sesleri),
 * metni okunacak hâle getirir ve cümle cümle okur (uzun metinde kesilmesin diye).
 * Kullanıcı istediği sesi seçebilir; seçim dile göre cihazda saklanır.
 */
export type SpeechLang = 'tr' | 'en' | 'de' | 'es' | 'ru';
const LOCALE: Record<SpeechLang, string> = { tr: 'tr-TR', en: 'en-GB', de: 'de-DE', es: 'es-ES', ru: 'ru-RU' };
const KEY = (l: string) => `vz_voice_${l}`;

export const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

/** Sesler bazı tarayıcılarda geç yüklenir; hazır olunca döner */
export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (!canSpeak()) return Promise.resolve([]);
  const v = window.speechSynthesis.getVoices();
  if (v.length) return Promise.resolve(v);
  return new Promise((res) => {
    const done = () => res(window.speechSynthesis.getVoices());
    window.speechSynthesis.addEventListener('voiceschanged', done, { once: true });
    setTimeout(done, 1500);
  });
}

function score(v: SpeechSynthesisVoice, lang: SpeechLang): number {
  const n = v.name;
  let s = 0;
  if (/natural|neural|online/i.test(n)) s += 50; // Edge / Windows sinir ağı sesleri (en doğal olanlar)
  if (/premium|enhanced|siri/i.test(n)) s += 40; // Apple yüksek kaliteli sesler
  if (/google/i.test(n)) s += 30; // Chrome / Android
  if (v.lang.replace('_', '-').toLowerCase() === LOCALE[lang].toLowerCase()) s += 8;
  if (lang === 'en' && /en-(GB|US)/i.test(v.lang)) s += 4;
  if (/compact|eloquence|novelty|bad news|bells|boing|bubbles|cellos|jester|organ|superstar|trinoids|whisper|wobble|zarvox|albert|fred|junior|ralph|kathy/i.test(n)) s -= 100;
  if (v.localService === false) s += 2;
  return s;
}

export function voicesFor(all: SpeechSynthesisVoice[], lang: SpeechLang): SpeechSynthesisVoice[] {
  return all.filter((v) => v.lang.replace('_', '-').toLowerCase().startsWith(lang)).sort((a, b) => score(b, lang) - score(a, lang));
}

export function savedVoice(lang: SpeechLang): string {
  try {
    return localStorage.getItem(KEY(lang)) || '';
  } catch {
    return '';
  }
}
export function saveVoice(lang: SpeechLang, name: string) {
  try {
    localStorage.setItem(KEY(lang), name);
  } catch {}
}

/** Ekrandaki metni kulağa doğal gelecek hâle getirir */
export function speakable(text: string, lang: SpeechLang): string {
  const per = { tr: 'yüz üzerinden', en: 'out of 100', de: 'von 100', es: 'sobre 100', ru: 'из ста' }[lang];
  const four = { tr: 'dört üzerinden', en: 'out of 4', de: 'von 4', es: 'sobre 4', ru: 'из четырёх' }[lang];
  return text
    .replace(/[\p{Extended_Pictographic}\p{Regional_Indicator}\u{FE0F}\u{200D}]/gu, '')
    .replace(/\*\*|[#*_>`]/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/(\d+)\/100/g, `$1 ${per}`)
    .replace(/(\d)\/4\b/g, `$1 ${four}`)
    .replace(/\((\d{4})-(\d{2})-(\d{2})\)/g, '')
    .replace(/^\s*[•-]\s*/gm, '')
    .replace(/\s*·\s*/g, ', ')
    .replace(/\s*–\s*/g, ', ')
    .replace(/\n+/g, '. ')
    .replace(/\.\s*\./g, '.')
    .replace(/:\s*\./g, ':')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

let queue: SpeechSynthesisUtterance[] = [];

export function stopSpeech() {
  if (!canSpeak()) return;
  queue = [];
  window.speechSynthesis.cancel();
}

export async function speak(text: string, lang: SpeechLang, onEnd?: () => void) {
  if (!canSpeak()) return;
  stopSpeech();
  const all = await loadVoices();
  const list = voicesFor(all, lang);
  const want = savedVoice(lang);
  const voice = list.find((v) => v.name === want) || list[0];
  const clean = speakable(text, lang).slice(0, 1400);
  // cümlelere böl: Chrome uzun metni ~15 sn sonra kesiyor
  const parts = clean.match(/[^.!?。]+[.!?。]?/g)?.map((x) => x.trim()).filter(Boolean) || [clean];
  queue = parts.map((p, i) => {
    const u = new SpeechSynthesisUtterance(p);
    u.lang = voice?.lang || LOCALE[lang];
    if (voice) u.voice = voice;
    u.rate = 0.96;
    u.pitch = 1;
    if (i === parts.length - 1 && onEnd) u.onend = onEnd;
    return u;
  });
  queue.forEach((u) => window.speechSynthesis.speak(u));
}
