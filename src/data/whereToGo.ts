/**
 * "Bu ay nereye gidilir?" rehberleri (/:lang/info/where_to_go_<ay>).
 * En iyi aylar, sitedeki ülke sayfalarının "en iyi seyahat dönemi" notlarından türetildi (yeni iklim bilgisi uydurulmadı);
 * resmî uyarılarda "tüm seyahatlerden kaçının" seviyesindeki ülkeler ve festival rehberinde atlanan çatışma bölgeleri listeye alınmaz.
 * Ülke başına sezon metni ve festival listesi derlemede üretilir: /data/where-to-go/<dil>/<ay>.json
 */
import { getCountryName } from './passportData';

export const WTG_SLUGS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'] as const;
export type WtgId = `where_to_go_${(typeof WTG_SLUGS)[number]}`;
export const WTG_IDS: WtgId[] = WTG_SLUGS.map((s) => `where_to_go_${s}` as WtgId);
/** where_to_go_<ay> → 1–12, değilse 0 */
export const wtgMonth = (id: string): number => WTG_IDS.indexOf(id as WtgId) + 1;
export const isWtgId = (id: string): id is WtgId => wtgMonth(id) > 0;
export const wtgIdFor = (m: number): WtgId => WTG_IDS[(m + 11) % 12];

export const BEST_MONTHS: Record<string, number[]> = {
  AD: [1, 2, 3, 6, 7, 8, 9, 12],
  AE: [1, 2, 3, 11, 12],
  AG: [1, 2, 3, 4, 12],
  AL: [5, 6, 7, 8, 9, 10],
  AM: [5, 6, 9, 10],
  AO: [5, 6, 7, 8, 9],
  AR: [1, 2, 3, 4, 5, 9, 10, 11, 12],
  AT: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12],
  AU: [3, 4, 5, 9, 10, 11],
  AZ: [4, 5, 6, 9, 10],
  BA: [1, 2, 3, 5, 6, 7, 8, 9, 10, 12],
  BB: [1, 2, 3, 4, 12],
  BD: [1, 2, 11, 12],
  BE: [4, 5, 6, 9],
  BG: [1, 2, 3, 5, 6, 7, 8, 9, 12],
  BH: [1, 2, 3, 11, 12],
  BJ: [1, 2, 11, 12],
  BN: [2, 3, 4],
  BO: [5, 6, 7, 8, 9, 10],
  BR: [4, 5, 6, 7, 8, 9, 10],
  BS: [1, 2, 3, 4, 12],
  BT: [3, 4, 5, 9, 10, 11],
  BW: [5, 6, 7, 8, 9, 10],
  BZ: [1, 2, 3, 4, 12],
  CA: [1, 2, 3, 6, 7, 8, 9, 10, 12],
  CH: [1, 2, 3, 6, 7, 8, 9, 12],
  CI: [1, 2, 3, 11, 12],
  CL: [1, 2, 3, 6, 7, 8, 9, 11, 12],
  CM: [1, 2, 11, 12],
  CN: [4, 5, 9, 10],
  CO: [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12],
  CR: [1, 2, 3, 4, 12],
  CV: [1, 2, 3, 4, 5, 6, 11, 12],
  CY: [4, 5, 6, 9, 10, 11],
  CZ: [4, 5, 9, 10, 12],
  DE: [5, 6, 7, 8, 9, 12],
  DJ: [1, 2, 11, 12],
  DK: [5, 6, 7, 8],
  DM: [2, 3, 4, 5],
  DO: [1, 2, 3, 4, 12],
  DZ: [1, 2, 3, 4, 5, 10, 11, 12],
  EC: [1, 2, 3, 4, 5, 6, 7, 8, 9, 12],
  EE: [5, 6, 7, 8, 9, 12],
  EG: [1, 2, 3, 4, 10, 11, 12],
  ER: [1, 2, 3, 10, 11, 12],
  ES: [4, 5, 6, 9, 10],
  ET: [1, 2, 3, 10, 11, 12],
  FI: [1, 2, 3, 6, 7, 8, 12],
  FJ: [5, 6, 7, 8, 9, 10],
  FM: [1, 2, 3, 4],
  FR: [4, 5, 6, 7, 8, 9, 10],
  GA: [6, 7, 8, 9],
  GB: [5, 6, 7, 8, 9],
  GD: [1, 2, 3, 4, 5],
  GE: [5, 6, 9, 10],
  GH: [1, 2, 3, 11, 12],
  GM: [1, 2, 3, 4, 5, 11, 12],
  GN: [1, 2, 3, 4, 11, 12],
  GQ: [1, 2, 12],
  GR: [5, 6, 7, 8, 9, 10],
  GT: [1, 2, 3, 4, 11, 12],
  GW: [1, 2, 3, 4, 5, 11, 12],
  GY: [2, 3, 4, 9, 10, 11],
  HK: [10, 11, 12],
  HN: [2, 3, 4, 5],
  HR: [4, 5, 9, 10, 12],
  HU: [1, 2, 4, 5, 9, 10, 12],
  ID: [4, 5, 6, 7, 8, 9, 10],
  IE: [5, 6, 7, 8, 9],
  IL: [3, 4, 5, 9, 10, 11],
  IN: [1, 2, 3, 6, 7, 8, 9, 10, 11, 12],
  IS: [1, 2, 3, 6, 7, 8, 9, 10, 11, 12],
  IT: [4, 5, 6, 9, 10],
  JM: [1, 2, 3, 4, 12],
  JO: [3, 4, 5, 9, 10, 11],
  JP: [3, 4, 5, 10, 11],
  KE: [1, 2, 6, 7, 8, 9, 10],
  KG: [6, 7, 8, 9],
  KH: [1, 2, 3, 11, 12],
  KI: [5, 6, 7, 8, 9, 10],
  KM: [5, 6, 7, 8, 9, 10],
  KN: [1, 2, 3, 4, 12],
  KR: [4, 5, 9, 10, 11],
  KW: [1, 2, 3, 11, 12],
  KZ: [1, 2, 3, 5, 6, 9, 12],
  LA: [1, 2, 11, 12],
  LC: [1, 2, 3, 4, 12],
  LI: [1, 2, 3, 5, 6, 7, 8, 9, 12],
  LK: [1, 2, 3, 5, 6, 7, 8, 9, 12],
  LR: [1, 2, 3, 4, 11, 12],
  LS: [3, 4, 5, 9, 10, 11],
  LT: [5, 6, 7, 8, 9, 12],
  LU: [5, 6, 7, 8, 9, 12],
  LV: [5, 6, 7, 8, 9, 12],
  MA: [3, 4, 5, 9, 10, 11],
  MC: [5, 6, 9, 10],
  MD: [5, 6, 9, 10],
  ME: [1, 2, 3, 5, 6, 7, 8, 9, 10, 12],
  MG: [4, 5, 6, 7, 8, 9, 10, 11],
  MH: [1, 2, 3, 4, 12],
  MK: [1, 2, 3, 5, 6, 7, 8, 9, 12],
  MN: [6, 7, 8, 9],
  MO: [10, 11, 12],
  MR: [1, 2, 3, 11, 12],
  MT: [4, 5, 6, 9, 10],
  MU: [5, 6, 7, 8, 9, 10, 11, 12],
  MV: [1, 2, 3, 4, 12],
  MW: [5, 6, 7, 8, 9, 10],
  MX: [1, 2, 3, 4, 10, 11, 12],
  MY: [1, 2, 3, 4, 5, 6, 7, 8, 9, 12],
  MZ: [5, 6, 7, 8, 9, 10, 11],
  NA: [5, 6, 7, 8, 9, 10],
  NG: [1, 2, 11, 12],
  NI: [1, 2, 3, 4, 12],
  NL: [4, 5, 6, 7, 8],
  NO: [5, 6, 7, 8],
  NP: [3, 4, 10, 11],
  NR: [3, 4, 5, 6, 7, 8, 9, 10],
  NZ: [1, 2, 3, 4, 6, 7, 8, 12],
  OM: [1, 2, 3, 4, 10, 11, 12],
  PA: [1, 2, 3, 4, 12],
  PE: [5, 6, 7, 8, 9],
  PG: [5, 6, 7, 8, 9, 10],
  PH: [1, 2, 3, 4, 5, 12],
  PK: [2, 3, 10, 11],
  PL: [1, 2, 3, 4, 5, 6, 7, 8, 12],
  PT: [4, 5, 6, 7, 8, 9, 10],
  PW: [1, 2, 3, 4, 11, 12],
  PY: [4, 5, 6, 7, 8, 9, 10],
  QA: [1, 2, 3, 11, 12],
  RO: [5, 6, 9, 10],
  RS: [1, 2, 3, 5, 6, 9, 10, 12],
  RW: [1, 2, 6, 7, 8, 9, 12],
  SA: [1, 2, 3, 11, 12],
  SB: [5, 6, 7, 8, 9, 10],
  SC: [4, 5, 10, 11],
  SE: [6, 7, 8],
  SG: [2, 3, 4],
  SI: [5, 6, 9, 10],
  SK: [5, 6, 7, 8, 9],
  SL: [1, 2, 3, 4, 11, 12],
  SM: [5, 6, 9, 10, 12],
  SN: [1, 2, 3, 4, 5, 11, 12],
  SR: [8, 9, 10, 11],
  ST: [6, 7, 8, 9],
  SV: [1, 2, 3, 4, 11, 12],
  SZ: [5, 6, 7, 8, 9],
  TG: [1, 2, 7, 8, 11, 12],
  TH: [1, 2, 11, 12],
  TJ: [6, 7, 8, 9],
  TL: [5, 6, 7, 8, 9, 10, 11],
  TM: [4, 5, 9, 10],
  TN: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  TO: [5, 6, 7, 8, 9, 10],
  TR: [4, 5, 6, 7, 8, 9, 10, 11],
  TT: [1, 2, 3, 4, 5],
  TV: [5, 6, 7, 8, 9, 10],
  TW: [3, 4, 5, 10, 11, 12],
  TZ: [1, 2, 6, 7, 8, 9, 10, 12],
  UG: [1, 2, 6, 7, 8, 9, 12],
  US: [4, 5, 6, 9, 10, 11],
  UY: [1, 2, 3, 12],
  UZ: [4, 5, 6, 9, 10],
  VA: [1, 2, 4, 5, 10, 11, 12],
  VC: [1, 2, 3, 4, 5, 12],
  VN: [1, 2, 3, 4, 12],
  VU: [5, 6, 7, 8, 9, 10],
  WS: [5, 6, 7, 8, 9, 10],
  XK: [1, 2, 3, 5, 6, 7, 8, 9, 12],
  ZA: [1, 2, 3, 5, 6, 7, 8, 9, 11, 12],
  ZM: [5, 6, 7, 8, 9, 10],
  ZW: [5, 6, 7, 8, 9, 10]
};

/** Örnek olarak öne çıkarılan bilinen rotalar (sıralama için) */
const POPULAR = ['TH', 'AE', 'EG', 'ES', 'IT', 'FR', 'GR', 'TR', 'JP', 'MV', 'ID', 'VN', 'MX', 'US', 'PT', 'MA', 'LK', 'ZA', 'BR', 'AU', 'NZ', 'DE', 'GB', 'HR', 'GE', 'AL', 'ME', 'CZ', 'AT', 'KE', 'TZ', 'IN', 'PH', 'MY', 'SG', 'DO', 'JO', 'OM', 'QA', 'KR', 'CN', 'PE', 'AR', 'CL', 'IS', 'NO', 'FI', 'CH', 'NL', 'HU'];
const rank = (c: string) => { const i = POPULAR.indexOf(c); return i < 0 ? 999 : i; };

/** O ay en iyi döneminde olan ülkeler (bilinen rotalar önce) */
export const wtgCountries = (m: number): string[] => Object.keys(BEST_MONTHS).filter((c) => BEST_MONTHS[c].includes(m)).sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
/** Bilinen rotalardan o ay mevsiminde OLMAYANLAR (SSS'de "X ayında Y'ye gidilir mi?" için) */
export const wtgOffSeason = (m: number): string[] => POPULAR.filter((c) => BEST_MONTHS[c] && !BEST_MONTHS[c].includes(m));

const IDX: Record<string, number> = { en: 0, tr: 1, de: 2, es: 3, ru: 4, pt: 5 };
const LOC: Record<string, string> = { en: 'en-GB', tr: 'tr-TR', de: 'de-DE', es: 'es-ES', ru: 'ru-RU', pt: 'pt-BR' };
const RU_IN = ['январе', 'феврале', 'марте', 'апреле', 'мае', 'июне', 'июле', 'августе', 'сентябре', 'октябре', 'ноябре', 'декабре'];

export const wtgMonthName = (m: number, lang: string): string => {
  try {
    const s = new Intl.DateTimeFormat(LOC[lang] || 'en-GB', { month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2027, m - 1, 15)));
    return lang === 'es' || lang === 'pt' ? s : s.charAt(0).toUpperCase() + s.slice(1);
  } catch { return String(m); }
};

const joinNames = (xs: string[], lang: string) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')}${[' and ', ' ve ', ' und ', ' y ', ' и ', ' e '][IDX[lang] ?? 0]}${xs[xs.length - 1]}`);

export interface WtgText { title: string; short: string; metaDesc: string; answer: string; sections: { h: string; list: string[] }[]; faq: { q: string; a: string }[] }

/** Başlık ve kısa cevap (veri olmadan da çalışır); bölümler ve SSS derlemede doldurulur. */
export function buildWhereToGo(lang: string, m: number): WtgText {
  const L = (en: string, tr: string, de: string, es: string, ru: string, pt: string) => [en, tr, de, es, ru, pt][IDX[lang] ?? 0];
  const M = wtgMonthName(m, lang);
  const list = wtgCountries(m);
  const n = list.length;
  const ex = joinNames(list.slice(0, 5).map((c) => getCountryName(c, lang)), lang);
  const ruM = RU_IN[m - 1];
  return {
    title: L(`Where to go in ${M}: ${n} countries in their best season`, `${M} ayında nereye gidilir? En iyi dönemindeki ${n} ülke`, `Wohin im ${M}? ${n} Länder in ihrer besten Reisezeit`, `¿Dónde viajar en ${M}? ${n} países en su mejor temporada`, `Куда поехать в ${ruM}: ${n} стран в лучший сезон`),
    short: L(`Where to go in ${M}`, `${M} ayında nereye gidilir?`, `Wohin im ${M}?`, `Dónde viajar en ${M}`, `Куда поехать в ${ruM}`),
    metaDesc: L(
      `${M} is one of the best months to visit ${ex}. See all ${n} countries in season, visa rules for your passport and ${M} festivals.`,
      `${M} ayı ${ex} için en iyi seyahat dönemlerinden. Mevsimindeki ${n} ülke, pasaportuna göre vize durumu ve ${M} festivalleri.`,
      `Der ${M} ist eine der besten Reisezeiten für ${ex}. Alle ${n} Länder in Saison, Visaregeln für Ihren Pass und Feste im ${M}.`,
      `${M.charAt(0).toUpperCase() + M.slice(1)} es uno de los mejores meses para visitar ${ex}. Los ${n} países en temporada, visados según tu pasaporte y fiestas de ${M}.`,
      `В ${ruM} — один из лучших сезонов для поездки: ${ex}. Все ${n} стран в сезон, визовые правила для вашего паспорта и праздники месяца.`
    ),
    answer: L(
      `In ${M}, ${n} countries are in their best travel season — among them ${ex}. Below, each country is listed with its ideal season and the visa rule for your passport, followed by the festivals held in ${M}. Season notes come from our country guides; countries under “avoid all travel” government warnings are left out.`,
      `${M} ayında ${n} ülke en iyi seyahat dönemini yaşıyor; başlıcaları ${ex}. Aşağıda her ülke ideal sezonu ve pasaportuna göre vize durumuyla, ardından ${M} ayında yapılan festivallerle listelenmiştir. Mevsim notları ülke rehberlerimizden alınmıştır; resmî “tüm seyahatlerden kaçının” uyarısı bulunan ülkeler listeye alınmadı.`,
      `Im ${M} haben ${n} Länder ihre beste Reisezeit – darunter ${ex}. Unten steht jedes Land mit seiner idealen Saison und der Visaregel für Ihren Pass, danach die Feste im ${M}. Die Saisonangaben stammen aus unseren Länderguides; Länder mit offizieller Warnung vor allen Reisen sind nicht aufgeführt.`,
      `En ${M}, ${n} países están en su mejor temporada de viaje, entre ellos ${ex}. Abajo aparece cada país con su temporada ideal y la norma de visado para tu pasaporte, y después las fiestas de ${M}. Las notas de temporada provienen de nuestras guías de país; no se incluyen países con advertencia oficial de evitar todo viaje.`,
      `В ${ruM} у ${n} стран лучший туристический сезон — среди них ${ex}. Ниже — каждая страна с идеальным сезоном и визовым режимом для вашего паспорта, а затем праздники месяца. Сведения о сезонах взяты из наших гидов по странам; страны с официальной рекомендацией воздержаться от любых поездок не включены.`
    ),
    sections: [],
    faq: []
  };
}

/** Bölüm başlıkları */
export const wtgHeads = (lang: string, m: number) => {
  const L = (en: string, tr: string, de: string, es: string, ru: string, pt: string) => [en, tr, de, es, ru, pt][IDX[lang] ?? 0];
  const M = wtgMonthName(m, lang);
  const ruM = RU_IN[m - 1];
  return {
    countries: L(`Countries in their best season in ${M}`, `${M} ayında en iyi dönemindeki ülkeler`, `Länder mit bester Reisezeit im ${M}`, `Países en su mejor temporada en ${M}`, `Страны в лучший сезон в ${ruM}`),
    fest: L(`Festivals in ${M}`, `${M} ayındaki festivaller`, `Feste im ${M}`, `Fiestas en ${M}`, `Праздники в ${ruM}`),
    months: L('Other months', 'Diğer aylar', 'Andere Monate', 'Otros meses', 'Другие месяцы')
  };
};

export interface WtgData { m: number; countries: [string, string, string][]; fest: string[]; faq: { q: string; a: string }[] }

/** SSS (derlemede): vizesiz seçenekler, festivaller, bilinen rotalar için "bu ay gidilir mi?" */
export function buildWtgFaq(lang: string, m: number, season: Record<string, string>, fest: string[], visaFree: string[], passName: string): { q: string; a: string }[] {
  const L = (en: string, tr: string, de: string, es: string, ru: string, pt: string) => [en, tr, de, es, ru, pt][IDX[lang] ?? 0];
  const M = wtgMonthName(m, lang);
  const ruM = RU_IN[m - 1];
  const faq: { q: string; a: string }[] = [];
  if (visaFree.length) {
    const names = joinNames(visaFree.slice(0, 10).map((c) => getCountryName(c, lang)), lang);
    faq.push({
      q: L(`Where can I go in ${M} without a visa?`, `${M} ayında vizesiz nereye gidilir?`, `Wohin im ${M} ohne Visum?`, `¿Adónde viajar sin visado en ${M}?`, `Куда поехать без визы в ${ruM}?`),
      a: L(`With a ${passName} passport, countries in their best season in ${M} that need no visa include ${names}. Check the list above for your own passport.`, `${passName} pasaportuyla ${M} ayında en iyi döneminde olup vize istemeyen ülkeler arasında ${names} var. Kendi pasaportuna göre durumu yukarıdaki listede görebilirsin.`, `Mit Pass aus ${passName} sind im ${M} unter anderem ${names} visumfrei und in bester Reisezeit. Ihre eigene Passlage sehen Sie in der Liste oben.`, `Con pasaporte de ${passName}, entre los países en temporada en ${M} sin visado están ${names}. Consulta la lista de arriba para tu pasaporte.`, `С паспортом (${passName}) без визы и в лучший сезон в ${ruM}: ${names}. Режим для вашего паспорта — в списке выше.`)
    });
  }
  if (fest.length) {
    const top = fest.slice(0, 6).map((f) => f.split(':')[0]).join('; ');
    faq.push({ q: L(`Which festivals take place in ${M}?`, `${M} ayında hangi festivaller var?`, `Welche Feste gibt es im ${M}?`, `¿Qué fiestas hay en ${M}?`, `Какие праздники проходят в ${ruM}?`), a: `${top}.` });
  }
  const inSeason = wtgCountries(m).slice(0, 3);
  for (const c of [...inSeason, ...wtgOffSeason(m).slice(0, 2)]) {
    if (!season[c]) continue;
    const C = getCountryName(c, lang);
    const yes = BEST_MONTHS[c].includes(m);
    faq.push({
      q: L(`Is ${M} a good time to visit ${C}?`, `${C} için ${M} uygun bir dönem mi?`, `${C}: Ist der ${M} eine gute Reisezeit?`, `¿Es ${M} buen momento para visitar ${C}?`, `${C}: стоит ли ехать в ${ruM}?`),
      a: `${yes ? L('Yes. ', 'Evet. ', 'Ja. ', 'Sí. ', 'Да. ') : L(`${M} is not its best season. `, `${M} en iyi dönemi değil. `, `Der ${M} ist nicht die beste Reisezeit. `, `${M.charAt(0).toUpperCase() + M.slice(1)} no es su mejor temporada. `, `${ruM.charAt(0).toUpperCase() + ruM.slice(1)} — не лучший сезон. `)}${L('Best time to visit', 'En iyi dönem', 'Beste Reisezeit', 'Mejor época', 'Лучшее время')}: ${season[c]}`
    });
  }
  return faq;
}
