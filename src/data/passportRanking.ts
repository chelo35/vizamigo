// Pasaport gücü sıralaması 2026: sitenin kendi vize verisinden hesaplanır (199 pasaport × 198 ülke).
// Basın için veri hikâyesi ve rehber sayfası. Veri değişince sayfa kendiliğinden güncellenir.
import { getPassportItems } from '../utils/calculator';
import { getCountryName } from './passportData';
import { GEO_DATA } from './geoData';

export interface RankRow { p: string; rank: number; easy: number; free: number; voa: number; eta: number; evisa: number; visa: number; total: number }

/** Vizesiz + kapıda vize sayısına göre sıralama; eşitlikte aynı sıra (1, 2, 2, 4…). */
export function passportRanking(): RankRow[] {
  const rows = Object.keys(GEO_DATA).sort().map((p) => {
    const it = getPassportItems(p).filter((x) => x.c !== p);
    const n = (cat: string) => it.filter((x) => x.cat === cat).length;
    const free = n('free'), voa = n('voa');
    return { p, rank: 0, easy: free + voa, free, voa, eta: n('eta'), evisa: n('evisa'), visa: n('visa'), total: it.length };
  });
  rows.sort((a, b) => b.easy - a.easy || b.free - a.free || a.p.localeCompare(b.p));
  rows.forEach((r, i) => { r.rank = i > 0 && rows[i - 1].easy === r.easy ? rows[i - 1].rank : i + 1; });
  return rows;
}

const IDX: Record<string, number> = { en: 0, tr: 1, de: 2, es: 3, ru: 4 };
/** Dilin okurunun pasaportu (haber açısı): tr→TR, de→DE, es→ES, ru→RU, en→US ve GB. */
const HOME: Record<string, string[]> = { tr: ['TR'], de: ['DE', 'AT', 'CH'], es: ['ES', 'MX', 'AR', 'CO'], ru: ['RU', 'KZ', 'UA'], en: ['US', 'GB', 'IN'] };

export function buildPassportRanking(lang: string) {
  const L = (en: string, tr: string, de: string, es: string, ru: string) => [en, tr, de, es, ru][IDX[lang] ?? 0];
  const nf = (n: number) => n.toLocaleString(lang === 'en' ? 'en-US' : lang);
  const rows = passportRanking();
  const top = rows[0], last = rows.at(-1)!;
  const name = (p: string) => getCountryName(p, lang);
  const total = top.total;
  const homes = (HOME[lang] || HOME.en).map((p) => rows.find((r) => r.p === p)!).filter(Boolean);
  const h0 = homes[0];
  const head = [L('Rank', 'Sıra', 'Rang', 'Puesto', 'Место'), L('Passport', 'Pasaport', 'Pass', 'Pasaporte', 'Паспорт'), L('Visa-free + on arrival', 'Vizesiz + kapıda vize', 'Visumfrei + bei Ankunft', 'Sin visado + a la llegada', 'Без визы + по прибытии'), L('Visa-free', 'Vizesiz', 'Visumfrei', 'Sin visado', 'Без визы'), L('On arrival', 'Kapıda vize', 'Bei Ankunft', 'A la llegada', 'По прибытии'), 'eTA', L('eVisa', 'e-Vize', 'eVisum', 'eVisado', 'Эл. виза'), L('Visa required', 'Vize gerekli', 'Visum nötig', 'Visado obligatorio', 'Нужна виза')];
  const row = (r: RankRow) => [String(r.rank), name(r.p), nf(r.easy), nf(r.free), nf(r.voa), nf(r.eta), nf(r.evisa), nf(r.visa)];
  const homeLine = (r: RankRow) => L(
    `${name(r.p)}: #${r.rank} — ${r.easy} of ${total} destinations without a visa in advance (${r.free} visa-free, ${r.voa} on arrival); ${r.evisa} eVisa, ${r.eta} eTA, ${r.visa} need a visa.`,
    `${name(r.p)}: ${r.rank}. sıra — ${total} ülkenin ${r.easy} tanesine önceden vize almadan (${r.free} vizesiz, ${r.voa} kapıda vize); ${r.evisa} e-vize, ${r.eta} eTA, ${r.visa} ülke için vize gerekli.`,
    `${name(r.p)}: Platz ${r.rank} — ${r.easy} von ${total} Zielen ohne Visum vorab (${r.free} visumfrei, ${r.voa} bei Ankunft); ${r.evisa} eVisum, ${r.eta} eTA, ${r.visa} mit Visumpflicht.`,
    `${name(r.p)}: puesto ${r.rank} — ${r.easy} de ${total} destinos sin visado previo (${r.free} sin visado, ${r.voa} a la llegada); ${r.evisa} eVisado, ${r.eta} eTA, ${r.visa} con visado obligatorio.`,
    `${name(r.p)}: ${r.rank}-е место — ${r.easy} из ${total} стран без визы заранее (${r.free} без визы, ${r.voa} по прибытии); ${r.evisa} эл. виза, ${r.eta} eTA, ${r.visa} — нужна виза.`
  );
  const title = L(
    `Passport ranking 2026: ${name(top.p)} first with ${top.easy} destinations`,
    `Pasaport gücü sıralaması 2026: ${name(h0.p)} pasaportu ${h0.rank}. sırada (${h0.easy} ülke)`,
    `Reisepass-Ranking 2026: Deutscher Pass auf Platz ${h0.rank} (${h0.easy} Ziele)`,
    `Ranking de pasaportes 2026: España en el puesto ${h0.rank} (${h0.easy} destinos)`,
    `Рейтинг паспортов 2026: Россия на ${h0.rank}-м месте (${h0.easy} стран)`
  );
  const answer = L(
    `${name(top.p)} has the strongest passport in our November 2026 data: ${top.easy} of ${total} destinations without arranging a visa in advance. ${homes.map(homeLine).join(' ')} ${name(last.p)} is last with ${last.easy}.`,
    `Kasım 2026 verimize göre en güçlü pasaport ${name(top.p)}: ${total} ülkenin ${top.easy} tanesine önceden vize almadan gidiliyor. ${homeLine(h0)} En sonda ${last.easy} ülkeyle ${name(last.p)} var.`,
    `Laut unseren Daten vom November 2026 hat ${name(top.p)} den stärksten Pass: ${top.easy} von ${total} Zielen ohne Visum vorab. ${homes.map(homeLine).join(' ')} Schlusslicht ist ${name(last.p)} mit ${last.easy}.`,
    `Según nuestros datos de noviembre de 2026, el pasaporte más fuerte es el de ${name(top.p)}: ${top.easy} de ${total} destinos sin visado previo. ${homes.map(homeLine).join(' ')} El último es ${name(last.p)}, con ${last.easy}.`,
    `По нашим данным на ноябрь 2026 года самый сильный паспорт — ${name(top.p)}: ${top.easy} из ${total} стран без визы заранее. ${homes.map(homeLine).join(' ')} Последнее место — ${name(last.p)} (${last.easy}).`
  );
  const method = L(
    `How we count: for each of ${rows.length} passports we count the ${total} other countries in our database. "Visa-free + on arrival" means you can travel without arranging anything in advance (an ID card is enough for some routes). Electronic travel authorisations (ETA, ESTA) and eVisas are listed separately because they must be obtained online before departure. Equal totals share a rank. Data: Passport Index (March 2026), corrected against official policies (November 2026); see “How we verify information”.`,
    `Nasıl sayıyoruz: ${rows.length} pasaportun her biri için veri tabanımızdaki diğer ${total} ülkeyi sayıyoruz. "Vizesiz + kapıda vize" önceden hiçbir işlem gerekmeyen ülkeler demek (bazı rotalarda kimlik kartı yeter). Elektronik seyahat izni (ETA, ESTA) ve e-vize ayrı sütunda, çünkü yola çıkmadan internetten alınması gerekiyor. Toplamı eşit olan pasaportlar aynı sırayı paylaşıyor. Veri: Passport Index (Mart 2026), resmî politikalara göre düzeltildi (Kasım 2026); ayrıntı “Bilgileri nasıl doğruluyoruz” sayfasında.`,
    `So zählen wir: Für jeden der ${rows.length} Pässe zählen wir die ${total} anderen Länder unserer Datenbank. „Visumfrei + bei Ankunft“ heißt: Einreise ohne vorherigen Antrag (auf manchen Strecken genügt der Personalausweis). Elektronische Reisegenehmigungen (ETA, ESTA) und eVisa stehen getrennt, weil sie vor der Abreise online beantragt werden müssen. Gleiche Summen teilen sich einen Platz. Daten: Passport Index (März 2026), anhand amtlicher Regeln korrigiert (November 2026); siehe „So prüfen wir unsere Angaben“.`,
    `Cómo contamos: para cada uno de los ${rows.length} pasaportes contamos los otros ${total} países de nuestra base de datos. «Sin visado + a la llegada» significa viajar sin tramitar nada antes (en algunas rutas basta el DNI). Las autorizaciones electrónicas (ETA, ESTA) y los eVisados van aparte porque hay que pedirlos en línea antes de salir. Los totales iguales comparten puesto. Datos: Passport Index (marzo de 2026), corregidos con las políticas oficiales (noviembre de 2026); ver «Cómo verificamos la información».`,
    `Как мы считаем: для каждого из ${rows.length} паспортов учитываем остальные ${total} стран нашей базы. «Без визы + по прибытии» — поездка без оформления заранее (на некоторых направлениях достаточно внутреннего документа). Электронные разрешения (ETA, ESTA) и электронные визы указаны отдельно: их нужно получить онлайн до вылета. При равных суммах место общее. Данные: Passport Index (март 2026), сверены с официальными правилами (ноябрь 2026); см. «Как мы проверяем информацию».`
  );
  const sections = [
    { h: L('Top 20 passports', 'En güçlü 20 pasaport', 'Die 20 stärksten Pässe', 'Los 20 pasaportes más fuertes', '20 самых сильных паспортов'), table: { head, rows: rows.filter((r) => r.rank <= 20).map(row) } },
    { h: L('Selected passports', 'Öne çıkan pasaportlar', 'Ausgewählte Pässe', 'Pasaportes destacados', 'Выбранные паспорта'), list: homes.map(homeLine) },
    { h: L('How we count', 'Nasıl sayıyoruz', 'So zählen wir', 'Cómo contamos', 'Как мы считаем'), p: [method] },
    { h: L(`All ${rows.length} passports`, `${rows.length} pasaportun tamamı`, `Alle ${rows.length} Pässe`, `Los ${rows.length} pasaportes`, `Все ${rows.length} паспортов`), table: { head, rows: rows.map(row) } }
  ];
  const faq = [
    { q: L('Which passport is the strongest in 2026?', '2026’da en güçlü pasaport hangisi?', 'Welcher Pass ist 2026 der stärkste?', '¿Cuál es el pasaporte más fuerte en 2026?', 'Какой паспорт самый сильный в 2026 году?'), a: L(`${name(top.p)}: ${top.easy} of ${total} destinations visa-free or with a visa on arrival (our data, November 2026).`, `${name(top.p)}: ${total} ülkenin ${top.easy} tanesine vizesiz veya kapıda vizeyle (Kasım 2026 verimiz).`, `${name(top.p)}: ${top.easy} von ${total} Zielen visumfrei oder mit Visum bei Ankunft (unsere Daten, November 2026).`, `${name(top.p)}: ${top.easy} de ${total} destinos sin visado o con visado a la llegada (nuestros datos, noviembre de 2026).`, `${name(top.p)}: ${top.easy} из ${total} стран без визы или с визой по прибытии (наши данные, ноябрь 2026).`) },
    ...homes.map((r) => ({ q: L(`How strong is the ${name(r.p)} passport in 2026?`, `${name(r.p)} pasaportu 2026’da kaçıncı sırada?`, `Wie stark ist der Pass aus ${name(r.p)} 2026?`, `¿Qué tan fuerte es el pasaporte de ${name(r.p)} en 2026?`, `Какое место у паспорта ${name(r.p)} в 2026 году?`), a: homeLine(r) }))
  ];
  return {
    title,
    short: L('Passport ranking 2026', 'Pasaport gücü sıralaması 2026', 'Reisepass-Ranking 2026', 'Ranking de pasaportes 2026', 'Рейтинг паспортов 2026'),
    metaDesc: answer.length > 155 ? `${answer.slice(0, 152).replace(/\s+\S*$/, '')}…` : answer,
    answer,
    sections,
    faq
  };
}
