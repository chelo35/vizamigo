/**
 * Festival rehberi (veri: src/data/festival-guide/<KOD>.json — derlemede okunur, tarayıcıya ülke JSON'u içinde gider): ülke sayfasındaki mevcut festival listesini (country-fixes, doğrulanmış) zenginleştirir.
 * Festival ADLARI değişmez — `i`, sitedeki festival listesindeki sıra numarasıdır (5 dilde aynı sıra).
 * Her giriş: ne zaman (ay / sabit gün / 2027 tarihi), nerede, kısa tarihçe ve gezgin ipucu.
 * Ay takvimine bağlı tarihler `lunar: true` ile "yaklaşık" işaretlenir.
 * Metin sırası: [en, tr, de, es, ru]
 */
type L5 = [string, string, string, string, string];

export interface FestivalGuideEntry {
  i: number;            // sitedeki festival listesindeki sıra
  m: number[];          // ay(lar), 1–12
  d?: string;           // sabit gün(ler), ör. '14' ya da '6–14' (ilk aya göre)
  y27?: [string, string?]; // 2027 tarihi (ISO), tek gün ya da aralık
  lunar?: boolean;      // ay takvimi: tarih her yıl değişir
  place?: string;       // şehir / bölge (özel ad)
  about: L5;
  tip: L5;
}

const IDX: Record<string, number> = { en: 0, tr: 1, de: 2, es: 3, ru: 4 };
const LOC: Record<string, string> = { en: 'en-GB', tr: 'tr-TR', de: 'de-DE', es: 'es-ES', ru: 'ru-RU' };

const monthName = (m: number, lang: string, ctx: 'standalone' | 'format' = 'standalone'): string => {
  try {
    const d = new Date(Date.UTC(2027, m - 1, 15));
    if (ctx === 'format') {
      // "14 July" biçiminde ay adı (Rusça'da tamlama hâli: "14 июля")
      return new Intl.DateTimeFormat(LOC[lang] || 'en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' }).formatToParts(d).find((p) => p.type === 'month')?.value || '';
    }
    const s = new Intl.DateTimeFormat(LOC[lang] || 'en-GB', { month: 'long', timeZone: 'UTC' }).format(d);
    return s.charAt(0).toUpperCase() + s.slice(1);
  } catch { return String(m); }
};

const fmtIso = (iso: string, lang: string): string => {
  try { return new Intl.DateTimeFormat(LOC[lang] || 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso + 'T00:00:00Z')); } catch { return iso; }
};

/** "Ne zaman" metni: sabit gün → "14 Temmuz", aylar → "Temmuz – Ağustos", + 2027 tarihi. */
export function festivalWhen(e: FestivalGuideEntry, lang: string): string {
  const L = (en: string, tr: string, de: string, es: string, ru: string) => [en, tr, de, es, ru][IDX[lang] ?? 0];
  let base: string;
  if (e.d && e.m.length === 1) base = lang === 'en' ? `${e.d} ${monthName(e.m[0], lang, 'format')}` : lang === 'de' ? `${e.d.replace(/(\d+)$/, '$1.')} ${monthName(e.m[0], lang, 'format')}`.replace(/^(\d+)–/, '$1.–') : lang === 'es' ? `${e.d} de ${monthName(e.m[0], lang, 'format')}` : `${e.d} ${monthName(e.m[0], lang, 'format')}`;
  else if (e.d) base = e.m.map((m) => (lang === 'es' ? `${e.d} de ${monthName(m, lang, 'format')}` : lang === 'de' ? `${e.d}. ${monthName(m, lang, 'format')}` : `${e.d} ${monthName(m, lang, 'format')}`)).join(L(' & ', ' ve ', ' und ', ' y ', ' и '));
  else base = e.m.length > 1 ? `${monthName(e.m[0], lang)} – ${monthName(e.m[e.m.length - 1], lang)}` : monthName(e.m[0], lang);
  if (e.lunar) base += L(' (lunar calendar, changes yearly)', ' (ay takvimi, her yıl değişir)', ' (Mondkalender, jährlich wechselnd)', ' (calendario lunar, cambia cada año)', ' (по лунному календарю, дата меняется)');
  if (e.y27) {
    let r = fmtIso(e.y27[0], lang);
    if (e.y27[1]) {
      try {
        const f = new Intl.DateTimeFormat(LOC[lang] || 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) as Intl.DateTimeFormat & { formatRange?: (a: Date, b: Date) => string };
        r = f.formatRange ? f.formatRange(new Date(e.y27[0] + 'T00:00:00Z'), new Date(e.y27[1] + 'T00:00:00Z')) : `${r} – ${fmtIso(e.y27[1], lang)}`;
      } catch { r = `${r} – ${fmtIso(e.y27[1], lang)}`; }
    }
    base += ` · 2027: ${e.lunar ? L('approx. ', 'yaklaşık ', 'ca. ', 'aprox. ', 'ок. ') : ''}${r}`;
  }
  return base;
}

export interface FestivalCardData { name: string; when: string; place?: string; about: string; tip: string; months: number[]; d1?: string; d2?: string }

const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (s: string, n: number) => { const d = new Date(s + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return iso(d); };
/** Otel araması için tarih: kesin tarih varsa bir gün önce giriş, bir gün sonra çıkış; yoksa boş. */
function stayDates(e: FestivalGuideEntry, today = new Date()): { d1?: string; d2?: string } {
  const now = iso(today);
  if (e.y27 && e.y27[0] >= now) return { d1: addDays(e.y27[0], -1), d2: addDays(e.y27[1] || e.y27[0], 1) };
  if (e.d && e.m.length === 1 && !e.lunar) {
    const nums = e.d.match(/\d+/g); if (!nums) return {};
    const a = +nums[0], b = +nums[nums.length - 1];
    for (const y of [today.getUTCFullYear(), today.getUTCFullYear() + 1]) {
      const start = iso(new Date(Date.UTC(y, e.m[0] - 1, a)));
      if (start >= now) return { d1: addDays(start, -1), d2: addDays(iso(new Date(Date.UTC(y, e.m[0] - 1, b))), 1) };
    }
  }
  return {};
}

/** Ülkenin festival listesini (sitedeki adlarla) rehber bilgisiyle eşleştirir; rehberde olmayanlar `rest` olarak döner. */
export function getFestivalGuide(entries: FestivalGuideEntry[] | undefined, lang: string, names: string[]): { cards: FestivalCardData[]; rest: string[] } {
  const g = entries;
  if (!g || !names?.length) return { cards: [], rest: names || [] };
  const k = IDX[lang] ?? 0;
  const used = new Set<number>();
  const cards: FestivalCardData[] = [];
  for (const e of g) {
    if (!names[e.i]) continue;
    used.add(e.i);
    cards.push({ name: names[e.i], when: festivalWhen(e, lang), place: e.place, about: e.about[k], tip: e.tip[k], months: e.m, ...stayDates(e) });
  }
  return { cards, rest: names.filter((_, i) => !used.has(i)) };
}

// ── Festival takvimi rehberi (/:lang/info/festival_calendar) ─────────────────────────────
// Bölümler derlemede üretilir (/data/festival-calendar/<dil>.json); tarayıcı sayfası bu dosyayı yükler.
import FEST_CODES from './festival-guide/index.json';
import { getCountryName } from './passportData';

export const FESTIVAL_COUNTRIES: string[] = FEST_CODES as string[];

interface CalSection { h: string; list: string[] }
export interface FestivalCalendarText { title: string; short: string; metaDesc: string; answer: string; sections: CalSection[]; faq: { q: string; a: string }[] }

export function buildFestivalCalendar(lang: string, data?: { entries: Record<string, FestivalGuideEntry[]>; names: Record<string, string[]> }): FestivalCalendarText {
  const L = (en: string, tr: string, de: string, es: string, ru: string) => [en, tr, de, es, ru][IDX[lang] ?? 0];
  const byMonth: string[][] = Array.from({ length: 12 }, () => []);
  const faq: { q: string; a: string }[] = [];
  if (data) {
    for (const [code, list] of Object.entries(data.entries)) {
      const country = getCountryName(code, lang);
      for (const e of list) {
        const n = data.names[code]?.[e.i];
        if (!n) continue;
        byMonth[e.m[0] - 1].push(`${n} — ${country}${e.place ? ` (${e.place})` : ''}: ${festivalWhen(e, lang)}`);
        if (e.y27 && faq.length < 15) {
          const short = n.replace(/\s*\(.*$/, '').replace(/\s*[:–].*$/, '').trim();
          faq.push({
            q: L(`When is ${short} in 2027?`, `${short} 2027’de ne zaman?`, `Wann ist ${short} 2027?`, `¿Cuándo es ${short} en 2027?`, `Когда ${short} в 2027 году?`),
            a: `${n} (${country}): ${festivalWhen(e, lang)}. ${e.tip[IDX[lang] ?? 0]}`
          });
        }
      }
    }
  }
  const monthH = (i: number) => {
    try { const s = new Intl.DateTimeFormat(LOC[lang] || 'en-GB', { month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2027, i, 15))); return s.charAt(0).toUpperCase() + s.slice(1); } catch { return String(i + 1); }
  };
  return {
    title: L('Festival calendar 2027: the world’s best festivals month by month', '2027 Festival Takvimi: Dünyanın en ünlü festivalleri ay ay', 'Festivalkalender 2027: die besten Feste der Welt Monat für Monat', 'Calendario de festivales 2027: las mejores fiestas del mundo mes a mes', 'Календарь фестивалей 2027: лучшие праздники мира по месяцам'),
    short: L('Festival calendar', 'Festival takvimi', 'Festivalkalender', 'Calendario de festivales', 'Календарь фестивалей'),
    metaDesc: L(
      'Plan your trip around the world’s famous festivals: Songkran, Oktoberfest, Rio Carnival, La Tomatina, Día de Muertos and more — dates for 2027, history and travel tips.',
      'Seyahatinizi dünyanın ünlü festivallerine göre planlayın: Songkran, Oktoberfest, Rio Karnavalı, La Tomatina, Ölüler Günü ve daha fazlası — 2027 tarihleri, tarihçe ve gezgin ipuçları.',
      'Planen Sie Ihre Reise rund um die berühmtesten Feste der Welt: Songkran, Oktoberfest, Karneval in Rio, La Tomatina, Día de Muertos und mehr – Termine 2027, Geschichte und Reisetipps.',
      'Planifique su viaje en torno a las fiestas más famosas del mundo: Songkran, Oktoberfest, Carnaval de Río, La Tomatina, Día de Muertos y más: fechas de 2027, historia y consejos.',
      'Планируйте поездку под знаменитые праздники мира: Сонгкран, Октоберфест, карнавал в Рио, Ла Томатина, День мёртвых и другие — даты 2027 года, история и советы.'
    ),
    answer: L(
      'Many of the world’s biggest festivals fall on fixed dates (San Fermín 6–14 July, Bastille Day 14 July), while others follow the lunar calendar or Easter and move every year. Below, each festival is listed under the month it starts, with its 2027 date where it is already fixed. Hotels near major festivals fill up months ahead, so book early.',
      'Dünyanın en büyük festivallerinin bir kısmı sabit tarihlidir (San Fermín 6–14 Temmuz, Bastille Günü 14 Temmuz); diğerleri ay takvimine ya da Paskalya’ya bağlıdır ve her yıl değişir. Aşağıda her festival başladığı ayın altında, tarihi belli olanlarda 2027 tarihiyle listelenmiştir. Büyük festivallerin çevresindeki oteller aylar önce dolar; erken rezervasyon yapın.',
      'Viele große Feste haben feste Termine (San Fermín 6.–14. Juli, Nationalfeiertag in Frankreich 14. Juli), andere folgen dem Mondkalender oder Ostern und wandern jedes Jahr. Unten steht jedes Fest unter seinem Startmonat, mit dem Termin 2027, sofern er feststeht. Hotels bei großen Festen sind Monate vorher ausgebucht – früh buchen.',
      'Muchas de las grandes fiestas tienen fecha fija (San Fermín, 6–14 de julio; 14 de julio en Francia), mientras que otras siguen el calendario lunar o la Pascua y cambian cada año. Abajo aparece cada fiesta en el mes en que empieza, con su fecha de 2027 cuando ya se conoce. Los hoteles cercanos se llenan con meses de antelación: reserve pronto.',
      'Многие крупные праздники проходят в фиксированные даты (Сан-Фермин 6–14 июля, День взятия Бастилии 14 июля), другие зависят от лунного календаря или Пасхи и меняются каждый год. Ниже каждый праздник указан в месяце начала, с датой 2027 года, если она уже известна. Отели рядом с крупными праздниками заполняются за месяцы — бронируйте заранее.'
    ),
    sections: byMonth.map((list, i) => ({ h: monthH(i), list })).filter((s) => s.list.length),
    faq
  };
}
