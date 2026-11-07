/**
 * Ücretsiz sesli okuma: tarayıcının/cihazın kendi sesleri. Her dil için cihazdaki EN İYİ sesi seçer
 * (Edge'in "Natural" sinir ağı sesleri, Google sesleri, Apple'ın Siri/Premium/Enhanced sesleri),
 * metni okunacak hâle getirir ve cümle cümle okur (uzun metinde kesilmesin diye).
 * Kullanıcı istediği sesi seçebilir; seçim dile göre cihazda saklanır.
 */
export type SpeechLang = 'tr' | 'en' | 'de' | 'es' | 'ru';
const LOCALE: Record<SpeechLang, string> = { tr: 'tr-TR', en: 'en-GB', de: 'de-DE', es: 'es-ES', ru: 'ru-RU' };
const KEY = (l: string) => `vz_voice_${l}`;
/** ses listesinde doğal (Piper) sesin adı */
export const NATURAL_KEY = 'vizamigo-natural';

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
  playToken++;
  try {
    audioEl?.pause();
  } catch {}
  if (!canSpeak()) return;
  queue = [];
  window.speechSynthesis.cancel();
}

export async function speak(text: string, lang: SpeechLang, onEnd?: () => void) {
  stopSpeech();
  // doğal ses hazırsa onu kullan; değilse arka planda hazırlamaya başla, bu cevabı cihaz sesiyle oku
  if (savedVoice(lang) === '' || savedVoice(lang) === NATURAL_KEY) {
    if (await speakNatural(text, lang, onEnd).catch(() => false)) return;
    void prepareNatural(lang);
  }
  if (!canSpeak()) return;
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


/* ------------------------------------------------------------------ */
/* Doğal ses (açık kaynak Piper, MIT): ziyaretçinin cihazında çalışır,  */
/* hiçbir ayar istemez. Model ilk kullanımda bir kez indirilir ve       */
/* tarayıcıda saklanır; hazır olana kadar cihaz sesi kullanılır.         */
/* ------------------------------------------------------------------ */
export const NATURAL_VOICE: Record<SpeechLang, string> = {
  tr: 'tr_TR-dfki-medium',
  en: 'en_US-hfc_female-medium',
  de: 'de_DE-kerstin-low',
  es: 'es_ES-sharvard-medium',
  ru: 'ru_RU-irina-medium'
};
type Status = { lang: SpeechLang; state: 'idle' | 'loading' | 'ready' | 'error'; pct: number };
const status: Record<string, Status> = {};
const listeners = new Set<(s: Status) => void>();
export function onNaturalStatus(fn: (s: Status) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
const emit = (s: Status) => {
  status[s.lang] = s;
  listeners.forEach((f) => f(s));
};
export const naturalStatus = (lang: SpeechLang): Status => status[lang] || { lang, state: 'idle', pct: 0 };

export function naturalSupported(): boolean {
  try {
    return typeof window !== 'undefined' && typeof WebAssembly === 'object' && !!navigator.storage?.getDirectory && typeof Worker !== 'undefined';
  } catch {
    return false;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let piper: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let session: any = null;
let sessionVoice = '';
const loading: Record<string, Promise<boolean>> = {};

/** Dil için doğal sesi hazırla (indir + yükle). Hata olursa false döner, cihaz sesi kullanılır. */
export function prepareNatural(lang: SpeechLang): Promise<boolean> {
  if (!naturalSupported()) return Promise.resolve(false);
  const id = NATURAL_VOICE[lang];
  if (session && sessionVoice === id) return Promise.resolve(true);
  if (lang in loading) return loading[lang];
  emit({ lang, state: 'loading', pct: 0 });
  loading[lang] = (async () => {
    try {
      piper = piper || (await import('@mintplex-labs/piper-tts-web'));
      const have: string[] = await piper.stored().catch(() => []);
      if (!have.includes(id)) {
        await piper.download(id, (p: { loaded: number; total: number; url: string }) => {
          if (p.total && /\.onnx$/.test(p.url)) emit({ lang, state: 'loading', pct: Math.min(99, Math.round((p.loaded * 100) / p.total)) });
        });
      }
      piper.TtsSession._instance = null;
      const s = await piper.TtsSession.create({ voiceId: id });
      session = s;
      sessionVoice = id;
      emit({ lang, state: 'ready', pct: 100 });
      return true;
    } catch {
      emit({ lang, state: 'error', pct: 0 });
      return false;
    } finally {
      delete loading[lang];
    }
  })();
  return loading[lang];
}

let audioEl: HTMLAudioElement | null = null;
let playToken = 0;

async function speakNatural(text: string, lang: SpeechLang, onEnd?: () => void): Promise<boolean> {
  if (!(session && sessionVoice === NATURAL_VOICE[lang])) return false;
  const token = ++playToken;
  const clean = speakable(text, lang).slice(0, 1400);
  const parts = clean.match(/[^.!?]+[.!?]?/g)?.map((x) => x.trim()).filter((x) => x.length > 1) || [clean];
  // ilk cümle hemen, sonrakiler çalarken hazırlanır
  let next: Promise<Blob> | null = session.predict(parts[0]);
  for (let i = 0; i < parts.length; i++) {
    const blob = await next!;
    if (token !== playToken) return true;
    next = i + 1 < parts.length ? session.predict(parts[i + 1]) : null;
    const url = URL.createObjectURL(blob);
    await new Promise<void>((res) => {
      audioEl = audioEl || new Audio();
      audioEl.src = url;
      audioEl.onended = () => res();
      audioEl.onerror = () => res();
      audioEl.play().catch(() => res());
    });
    URL.revokeObjectURL(url);
    if (token !== playToken) return true;
  }
  onEnd?.();
  return true;
}
