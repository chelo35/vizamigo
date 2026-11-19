/**
 * Pasaporta özel özet ("bu pasaportla bu ülke"): her pasaport–ülke sayfasını gerçekten farklı kılan,
 * yalnızca o ikiliye ait doğrulanabilir bilgiler. Hiçbir şey tahmin edilmez; veri yoksa satır yazılmaz.
 *  - giriş durumu (Passport Index + resmî kontroller)
 *  - ters yön: o ülkenin vatandaşları bu pasaportun ülkesine nasıl girer
 *  - başkentler arası kuş uçuşu mesafe ve ana havalimanları
 *  - döviz kuru (pasaportun ülkesinin parası → gidilen ülkenin parası)
 *  - pasaportu veren hükümetin resmî seyahat uyarısı (ABD, Birleşik Krallık, Kanada)
 *  - pasaportu veren ülkenin dışişleri acil hattı ve resmî portalı
 *  - vize gerekiyorsa başvuru yeri (o ülkenin pasaport ülkesindeki temsilciliği)
 *  - aynı dildeki diğer pasaportlarla karşılaştırma
 * Hem uygulama (CountryPage) hem önceden yazılan HTML (prerender) aynı veriyi kullanır.
 */
import { getPassportItems } from './calculator';
import { getCountryName, getCategoryBadgeLabel } from '../data/passportData';
import { GEO_DATA, calculateDistanceKm } from '../data/geoData';
import { capitalName } from '../data/capitalNames';
import { GLOBAL_CURRENCIES } from '../data/countryGeography';
import { USD_RATES } from '../data/currencyRates';
import { getOfficialAdvisories } from '../data/officialAdvisories';
import { advisoryLabel, advisoryAgencyName } from '../data/officialAdvisoryLabels';
import { CONSULAR_EMERGENCY_DATA } from '../data/consularEmergencyData';
import { LANG_PASS, PASSPORT_PAGES } from '../data/passportPages';
import { topPlaces } from '../data/topPlaces';

type L5 = [string, string, string, string, string];
const LI: Record<string, number> = { tr: 0, en: 1, de: 2, es: 3, ru: 4 };
const pick = (lang: string, v: L5) => v[LI[lang] ?? 1];

export interface BriefRow { k: string; v: string; href?: string; linkText?: string }
export interface BriefCompare { pass: string; name: string; label: string; current: boolean }
export interface PassportBrief { title: string; intro: string; rows: BriefRow[]; compare: BriefCompare[]; compareTitle: string }

const DE_DEM: Record<string, string> = { CH: 'Schweizer', AT: 'Österreicher', DE: 'Deutsche' };
const AGENCY_OF: Record<string, 'us' | 'uk' | 'ca'> = { US: 'us', GB: 'uk', CA: 'ca' };

const fmt = (n: number, lang: string, d = 0) => {
  try { return n.toLocaleString(lang === 'tr' ? 'tr-TR' : lang, { maximumFractionDigits: d, minimumFractionDigits: 0 }); } catch { return String(Math.round(n)); }
};
const dateStr = (iso: string, lang: string) => {
  const d = new Date(`${iso}T12:00:00Z`);
  if (isNaN(d.getTime())) return iso;
  try { return d.toLocaleDateString(lang === 'tr' ? 'tr-TR' : lang, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }); } catch { return iso; }
};
const stay = (v: string, lang: string) => (/^\d+$/.test(v) ? pick(lang, [`${v} gün`, `${v} days`, `${v} Tage`, `${v} días`, `${v} дн.`]) : '');

export function getPassportBrief(code: string, pass: string, lang: string): PassportBrief | null {
  if (!code || !pass || code === pass) return null;
  const C = getCountryName(code, lang);
  const P = getCountryName(pass, lang);
  const item = getPassportItems(pass).find((x) => x.c === code);
  const rows: BriefRow[] = [];
  const dem = lang === 'de' ? DE_DEM[pass] : '';

  // 1) giriş durumu
  if (item) {
    const s = stay(item.v, lang);
    const badge = getCategoryBadgeLabel(item as never, lang);
    rows.push({ k: pick(lang, ['Giriş', 'Entry', 'Einreise', 'Entrada', 'Въезд']), v: s && !badge.includes(item.v) ? `${badge} · ${s}` : badge });
  }

  // 2) ters yön (karşılıklılık)
  const rev = getPassportItems(code).find((x) => x.c === pass);
  if (rev) {
    rows.push({
      k: pick(lang, [`${C} pasaportuyla ${P}`, `${C} passport → ${P}`, `Pass aus ${C} → ${P}`, `Pasaporte de ${C} → ${P}`, `Паспорт ${C} → ${P}`]),
      v: getCategoryBadgeLabel(rev as never, lang)
    });
  }

  // 3) mesafe ve havalimanları
  const gA = GEO_DATA[pass], gB = GEO_DATA[code];
  if (gA && gB) {
    const km = calculateDistanceKm(gA.lat, gA.lng, gB.lat, gB.lng);
    const capA = capitalName(pass, lang, gA.capital), capB = capitalName(code, lang, gB.capital);
    const crow = pick(lang, ['kuş uçuşu', 'as the crow flies', 'Luftlinie', 'en línea recta', 'по прямой']);
    const hubs = gA.mainHub && gB.mainHub && /^[A-Z]{3}$/.test(gA.mainHub) && /^[A-Z]{3}$/.test(gB.mainHub) ? ` · ${gA.mainHub} → ${gB.mainHub}` : '';
    if (km > 0) rows.push({ k: pick(lang, ['Uzaklık', 'Distance', 'Entfernung', 'Distancia', 'Расстояние']), v: `${capA} – ${capB}: ${fmt(km, lang)} km ${crow}${hubs}` });
  }

  // 4) döviz
  const hc = GLOBAL_CURRENCIES[pass]?.code, dc = GLOBAL_CURRENCIES[code]?.code;
  if (hc && dc) {
    if (hc === dc) rows.push({ k: pick(lang, ['Para birimi', 'Currency', 'Währung', 'Moneda', 'Валюта']), v: pick(lang, [`Aynı para birimi (${hc})`, `Same currency (${hc})`, `Gleiche Währung (${hc})`, `Misma moneda (${hc})`, `Та же валюта (${hc})`]) });
    else if (USD_RATES[hc] && USD_RATES[dc]) {
      const r = USD_RATES[dc] / USD_RATES[hc];
      rows.push({ k: pick(lang, ['Döviz kuru', 'Exchange rate', 'Wechselkurs', 'Tipo de cambio', 'Курс валют']), v: `1 ${hc} ≈ ${fmt(r, lang, r >= 100 ? 0 : r >= 10 ? 1 : r >= 1 ? 2 : 4)} ${dc}` });
    }
  }

  // 5) pasaportu veren hükümetin resmî uyarısı
  const ag = AGENCY_OF[pass];
  if (ag) {
    const a = getOfficialAdvisories(code).items.find((x) => x.agency === ag);
    if (a) rows.push({ k: pick(lang, ['Resmî seyahat uyarısı', 'Official travel advice', 'Offizielle Reisehinweise', 'Aviso oficial de viaje', 'Официальные рекомендации']), v: `${advisoryAgencyName(ag, lang)}: ${advisoryLabel(a, lang)} (${dateStr(a.date, lang)})`, href: a.url, linkText: pick(lang, ['Kaynağı aç', 'Open source', 'Quelle öffnen', 'Abrir fuente', 'Открыть источник']) });
  }

  // 6) acil durumda kendi dışişleri
  const ce = CONSULAR_EMERGENCY_DATA[pass];
  if (ce) {
    const min = (ce.ministryName as Record<string, string | undefined>)[lang] || ce.ministryName.en;
    rows.push({ k: pick(lang, ['Acil durumda', 'Emergency abroad', 'Notfall im Ausland', 'Emergencia en el extranjero', 'ЧП за границей']), v: `${min}${ce.hotline247 ? ` · ${ce.hotline247}` : ''}`, href: ce.officialPortalUrl || undefined, linkText: ce.officialPortalName || undefined });
  }

  // 7) vize gerekiyorsa başvuru yeri
  if (item && item.cat === 'visa' && !item.id && gA) {
    const capA = capitalName(pass, lang, gA.capital);
    const q = `Embassy of ${getCountryName(code, 'en')} in ${getCountryName(pass, 'en')}`;
    rows.push({
      k: pick(lang, ['Başvuru yeri', 'Where to apply', 'Wo beantragen', 'Dónde solicitar', 'Где подавать']),
      v: pick(lang, [`${C} büyükelçiliği veya konsolosluğu (${P}, genellikle ${capA})`, `Embassy or consulate of ${C} in ${P} (usually ${capA})`, `Botschaft oder Konsulat von ${C} in ${P} (meist ${capA})`, `Embajada o consulado de ${C} en ${P} (normalmente ${capA})`, `Посольство или консульство: ${C} в ${P} (обычно ${capA})`]),
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`,
      linkText: pick(lang, ['Haritada bul', 'Find on map', 'Auf Karte finden', 'Ver en mapa', 'На карте'])
    });
  }

  // 8) aynı dildeki diğer pasaportlarla karşılaştırma
  const set = [LANG_PASS[lang as 'en'], ...(PASSPORT_PAGES[lang as 'en'] || [])].filter((p, i, a) => p && p !== code && a.indexOf(p) === i);
  if (!set.includes(pass)) set.push(pass);
  const compare: BriefCompare[] = set.length > 1
    ? set.map((p) => ({ pass: p, name: getCountryName(p, lang), label: getCategoryBadgeLabel(getPassportItems(p).find((x) => x.c === code) as never, lang), current: p === pass }))
    : [];

  const title = pick(lang, [
    `${P} pasaportuyla ${C}: bu pasaporta özel bilgiler`,
    `${C} with a ${P} passport: what applies to you`,
    dem ? `${C} für ${dem}: das gilt für deinen Pass` : `${C} mit Pass aus ${P}: das gilt für dich`,
    `${C} con pasaporte de ${P}: lo que te aplica`,
    `${C} с паспортом: ${P} — что важно знать`
  ]);
  const intro = pick(lang, [
    `Aşağıdaki bilgiler yalnızca ${P} pasaportu taşıyanlar için geçerlidir; başka pasaportla kurallar ve hatlar farklıdır.`,
    `The details below apply only to ${P} passport holders; rules and contacts differ for other passports.`,
    dem ? `Die folgenden Angaben gelten nur für Reisende mit ${({ CH: 'Schweizer Pass', AT: 'österreichischem Pass', DE: 'deutschem Pass' } as Record<string, string>)[pass]}; für andere Pässe gelten andere Regeln und Kontakte.` : `Die folgenden Angaben gelten nur für Inhaber eines Passes aus ${P}; für andere Pässe gelten andere Regeln und Kontakte.`,
    `Estos datos se aplican solo a titulares de pasaporte de ${P}; con otro pasaporte cambian las reglas y los contactos.`,
    `Эти данные относятся только к владельцам паспорта ${P}; для других паспортов правила и контакты другие.`
  ]);
  const compareTitle = pick(lang, [`${C}: pasaportlara göre giriş`, `${C}: entry by passport`, `${C}: Einreise je nach Pass`, `${C}: entrada según pasaporte`, `${C}: въезд по паспортам`]);
  return rows.length ? { title, intro, rows, compare, compareTitle } : null;
}

/** Pasaporta özel SSS: ters yön vize durumu ve yurt dışında acil durumda kendi dışişleri. */
export function getPassportFaq(code: string, pass: string, lang: string): { q: string; a: string }[] {
  if (!code || !pass || code === pass) return [];
  const C = getCountryName(code, lang);
  const P = getCountryName(pass, lang);
  const dem = lang === 'de' ? DE_DEM[pass] : '';
  const out: { q: string; a: string }[] = [];
  const ce = CONSULAR_EMERGENCY_DATA[pass];
  if (ce) {
    const min = (ce.ministryName as Record<string, string | undefined>)[lang] || ce.ministryName.en;
    const doc = (ce.emergencyDocName as Record<string, string | undefined>)[lang] || ce.emergencyDocName.en;
    out.push({
      q: pick(lang, [`${P} vatandaşı olarak ${C} seyahatinde pasaportumu kaybedersem ne yapmalıyım?`, `I'm a ${P} passport holder: what if I lose my passport in ${C}?`, dem ? `Pass in ${C} verloren: was tun als ${dem.replace(/e$/, 'er')}?` : `Pass aus ${P} in ${C} verloren: was tun?`, `Tengo pasaporte de ${P}: ¿qué hago si lo pierdo en ${C}?`, `Паспорт ${P} утерян в стране ${C}: что делать?`]),
      a: pick(lang, [
        `Önce yerel polise kayıp bildirimi yap, sonra ${min} ile iletişime geç${ce.hotline247 ? ` (7/24: ${ce.hotline247})` : ''}. Dönüş için ${doc} düzenlenebilir.`,
        `Report the loss to the local police first, then contact ${min}${ce.hotline247 ? ` (24/7: ${ce.hotline247})` : ''}. You can be issued a ${doc} to travel home.`,
        `Zuerst bei der örtlichen Polizei melden, dann ${min} kontaktieren${ce.hotline247 ? ` (rund um die Uhr: ${ce.hotline247})` : ''}. Für die Heimreise wird ein ${doc} ausgestellt.`,
        `Primero denuncia la pérdida a la policía local y luego contacta con ${min}${ce.hotline247 ? ` (24 h: ${ce.hotline247})` : ''}. Para volver se puede emitir un ${doc}.`,
        `Сначала заявите в местную полицию, затем свяжитесь: ${min}${ce.hotline247 ? ` (круглосуточно: ${ce.hotline247})` : ''}. Для возвращения выдают документ: ${doc}.`
      ])
    });
  }
  // İngilizce: turistik yer adıyla aranan sorular ("krakow visa requirements")
  if (lang === 'en') {
    const it = getPassportItems(pass).find((x) => x.c === code);
    if (it) {
      const lab = getCategoryBadgeLabel(it as never, 'en');
      const rule = it.cat === 'free' || it.id ? `no visa is needed with a ${P} passport (${lab.toLowerCase()})` : it.cat === 'voa' ? `${P} passport holders can get a visa on arrival` : it.cat === 'evisa' ? `${P} passport holders need an eVisa, applied for online before travel` : it.cat === 'eta' ? `${P} passport holders need an electronic travel authorisation before travel` : `${P} passport holders need a visa from an embassy or consulate before travel`;
      for (const pl of topPlaces(code, 2).filter((x) => x !== C)) {
        out.push({ q: `Do I need a visa to visit ${pl} with a ${P} passport?`, a: `${pl} is in ${C}, so ${C}'s entry rules apply: ${rule}.` });
      }
    }
  }
  const rev = getPassportItems(code).find((x) => x.c === pass);
  if (rev) {
    const lab = getCategoryBadgeLabel(rev as never, lang);
    out.push({
      q: pick(lang, [`${C} vatandaşları ${P} için vize alıyor mu?`, `Do ${C} passport holders need a visa for ${P}?`, `Brauchen Reisende mit Pass aus ${C} ein Visum für ${P}?`, `¿Necesitan visado los titulares de pasaporte de ${C} para ${P}?`, `Нужна ли виза владельцам паспорта ${C} в ${P}?`]),
      a: pick(lang, [`${C} pasaportuyla ${P}: ${lab}. (Passport Index verisi; seyahatten önce resmî kaynaktan teyit edin.)`, `${C} passport to ${P}: ${lab}. (Passport Index data; confirm with the official source before travel.)`, `Pass aus ${C} nach ${P}: ${lab}. (Daten: Passport Index; vor der Reise amtlich bestätigen.)`, `Pasaporte de ${C} a ${P}: ${lab}. (Datos de Passport Index; confírmalo en la fuente oficial.)`, `Паспорт ${C} → ${P}: ${lab}. (Данные Passport Index; уточните в официальном источнике.)`])
    });
  }
  return out;
}
