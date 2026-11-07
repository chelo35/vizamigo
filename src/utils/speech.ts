/**
 * Ücretsiz sesli okuma: tarayıcının/cihazın kendi sesleri. Her dil için cihazdaki EN İYİ sesi seçer
 * (Edge'in "Natural" sinir ağı sesleri, Google sesleri, Apple'ın Siri/Premium/Enhanced sesleri),
 * metni okunacak hâle getirir ve cümle cümle okur (uzun metinde kesilmesin diye).
 * Kullanıcı istediği sesi seçebilir; seçim dile göre cihazda saklanır.
 */
export type SpeechLang = 'tr' | 'en' | 'de' | 'es' | 'ru';
const LOCALE: Record<SpeechLang, string> = { tr: 'tr-TR', en: 'en-GB', de: 'de-DE', es: 'es-ES', ru: 'ru-RU' };
const KEY = (l: string) => `vz_voice2_${l}`;
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
  // "Vizamigo" tek kelime olunca sesler robotik okuyor: her dil için kulağa doğru gelen yazım
  const brand = { tr: 'Viza migo', en: 'Veeza meego', de: 'Wisa Migo', es: 'Visa migo', ru: 'Виза миго' }[lang];
  return text
    .replace(/vizamigo(\.com)?/gi, (_m, com) => brand + (com ? (lang === 'tr' ? ' nokta kom' : lang === 'ru' ? ' точка ком' : lang === 'de' ? ' Punkt com' : lang === 'es' ? ' punto com' : ' dot com') : ''))
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
/* Doğal ses: sitenin /api/tts uç noktası (Edge sinir ağı sesleri).     */
/* Ziyaretçi hiçbir ayar yapmaz; hata olursa cihaz sesine geçilir.      */
/* ------------------------------------------------------------------ */
type Status = { lang: SpeechLang; state: 'idle' | 'loading' | 'ready' | 'error'; pct: number };
const listeners = new Set<(s: Status) => void>();
export function onNaturalStatus(fn: (s: Status) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
export const naturalStatus = (lang: SpeechLang): Status => ({ lang, state: 'ready', pct: 100 });
export function naturalSupported(): boolean {
  return typeof window !== 'undefined' && typeof Audio !== 'undefined' && typeof fetch !== 'undefined';
}
/** eski arayüzle uyum: sunucu sesi hazırlık gerektirmez */
export function prepareNatural(_lang: SpeechLang): Promise<boolean> {
  return Promise.resolve(naturalSupported());
}
let naturalDown = 0; // art arda hata olursa bir süre cihaz sesi kullan

let audioEl: HTMLAudioElement | null = null;
let playToken = 0;

const ttsUrl = (lang: SpeechLang, t: string) => `/api/tts?l=${lang}&t=${encodeURIComponent(t)}`;

function chunks(text: string): string[] {
  // 400 karakteri aşmayan cümle grupları (ilk parça kısa olsun ki ses hemen başlasın)
  const sent = text.match(/[^.!?]+[.!?]?/g)?.map((x) => x.trim()).filter((x) => x.length > 1) || [text];
  const out: string[] = [];
  let cur = '';
  for (const x of sent) {
    const limit = out.length === 0 ? 160 : 380;
    if (cur && (cur + ' ' + x).length > limit) {
      out.push(cur);
      cur = x;
    } else cur = cur ? `${cur} ${x}` : x;
  }
  if (cur) out.push(cur);
  return out.map((x) => x.slice(0, 400));
}

async function speakNatural(text: string, lang: SpeechLang, onEnd?: () => void): Promise<boolean> {
  if (!naturalSupported() || Date.now() < naturalDown) return false;
  const token = ++playToken;
  const parts = chunks(speakable(text, lang).slice(0, 1600));
  if (!parts.length) return true;
  const load = (t: string) =>
    fetch(ttsUrl(lang, t)).then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.blob();
    });
  let next: Promise<Blob> | null = load(parts[0]);
  for (let i = 0; i < parts.length; i++) {
    let blob: Blob;
    try {
      blob = await next!;
    } catch {
      if (i === 0) {
        naturalDown = Date.now() + 5 * 60 * 1000;
        return false; // ilk parça gelmediyse cihaz sesiyle oku
      }
      return true;
    }
    if (token !== playToken) return true;
    next = i + 1 < parts.length ? load(parts[i + 1]) : null;
    next?.catch(() => {});
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

/** Mobil tarayıcılar sesi yalnızca dokunuşla başlatır: ilk dokunuşta ses öğesini "uyandır" */
export function unlockAudio() {
  try {
    audioEl = audioEl || new Audio();
    audioEl.muted = true;
    audioEl.src = 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQxAADB8AhSmxhIIEVCSiJrDCQBTcu3UrAIwUdkRgQbFAZC1CQEwTJ9mjRvBA4UOLD8nKVOWfh+UlK3z/177OXrfOdKl7pyn3Xf//WreyTRUoAWgBgkOAGbZHBgG1OF6zM82DWbZaUmMBptgQhGjsyYqc9ae9XFz280948NMBWInljyzsNRFLPWdnZGWrddDsjK1unuSrVN9jJsK8KuQtQCtMBjCEtImISdNKJOopIpBFpNSMbIHCSRpRR5iakjTiyzLhchUUBwCgyKiweBv/7UsQbg8isVNoMPMjAAAA0gAAABEVFGmgqK////9bP/6XCykxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq';
    audioEl.play().then(() => { if (audioEl) audioEl.muted = false; }).catch(() => { if (audioEl) audioEl.muted = false; });
  } catch {}
}
