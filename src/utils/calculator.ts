/**
 * Vize & Seyahat Hesaplama Motoru
 * - Schengen 90/180 Kayan Pencere Hesaplayıcısı
 * - Özel Kayan Dönem / Kalış Süresi Algoritmaları
 * - 183 Gün Vergi Mukimliği Takibi
 * - Çifte Pasaport Optimizasyonu
 */

import { D, resolveVisaCategory, idEligibleSet, CountryItem, VisaCategory, SCHENGEN_SET } from '../data/passportData';

export const DAY_MS = 86400000;

export function dateToDayIndex(dateStr: string): number {
  return Math.floor(Date.parse(dateStr + 'T00:00:00Z') / DAY_MS);
}

export function dayIndexToDate(idx: number): string {
  return new Date(idx * DAY_MS).toISOString().slice(0, 10);
}

export function formatTurkishDate(idx: number): string {
  if (isNaN(idx)) return 'N/A';
  const [y, m, d] = dayIndexToDate(idx).split('-');
  return `${d}.${m}.${y}`;
}

export function formatLocalizedDate(idx: number, lang: string = 'tr'): string {
  if (isNaN(idx)) return 'N/A';
  const [y, m, d] = dayIndexToDate(idx).split('-');
  if (lang === 'en') {
    return `${m}/${d}/${y}`;
  }
  return `${d}.${m}.${y}`;
}

export function formatLocalizedDateReadable(dateOrIdx: string | number, lang: string = 'tr'): string {
  try {
    let dateObj: Date;
    if (typeof dateOrIdx === 'number') {
      if (isNaN(dateOrIdx)) return 'N/A';
      dateObj = new Date(dateOrIdx * DAY_MS);
    } else {
      if (!dateOrIdx) return '';
      dateObj = new Date(dateOrIdx + 'T12:00:00Z');
    }
    const localeCode = lang === 'es' ? 'es-ES' : lang === 'ru' ? 'ru-RU' : lang === 'en' ? 'en-US' : lang === 'de' ? 'de-DE' : 'tr-TR';
    return dateObj.toLocaleDateString(localeCode, {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return String(dateOrIdx);
  }
}

export function formatLocalizedDateFull(dateOrIdx: string | number, lang: string = 'tr'): string {
  try {
    let dateObj: Date;
    if (typeof dateOrIdx === 'number') {
      if (isNaN(dateOrIdx)) return 'N/A';
      dateObj = new Date(dateOrIdx * DAY_MS);
    } else {
      if (!dateOrIdx) return '';
      dateObj = new Date(dateOrIdx + 'T12:00:00Z');
    }
    const localeCode = lang === 'es' ? 'es-ES' : lang === 'ru' ? 'ru-RU' : lang === 'en' ? 'en-US' : lang === 'de' ? 'de-DE' : 'tr-TR';
    return dateObj.toLocaleDateString(localeCode, {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return String(dateOrIdx);
  }
}

export function getTodayDayIndex(): number {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return dateToDayIndex(`${y}-${m}-${d}`);
}

export interface TripRecord {
  id: string;
  start: number; // day index
  end: number;   // day index
  region: string; // e.g. "Schengen" or custom
  note?: string;
  countryCode?: string;
}

export interface RollingRule {
  id: string;
  name: string;
  nameEn?: string;
  nameDe?: string;
  allowedDays: number;
  windowDays: number;
  description: string;
  descriptionEn?: string;
  descriptionDe?: string;
  preset?: boolean;
}

export const DEFAULT_RULES: RollingRule[] = [
  {
    id: 'schengen',
    name: 'Schengen (90/180)',
    nameEn: 'Schengen Area (90/180)',
    nameDe: 'Schengen-Raum (90/180)',
    allowedDays: 90,
    windowDays: 180,
    description: 'Herhangi bir 180 günlük kayan dönemde en fazla 90 gün kalış hakkı.',
    descriptionEn: 'Maximum 90 days stay within any rolling 180-day window.',
    descriptionDe: 'Maximal 90 Tage Aufenthalt innerhalb eines rollierenden 180-Tage-Fensters.',
    preset: true
  },
  {
    id: 'uk',
    name: 'Birleşik Krallık (180/365)',
    nameEn: 'United Kingdom (180/365)',
    nameDe: 'Großbritannien (180/365)',
    allowedDays: 180,
    windowDays: 365,
    description: 'Herhangi bir 12 aylık periyotta turistik amaçla en fazla 180 gün kalış.',
    descriptionEn: 'Up to 180 days stay in any 12-month period for tourism.',
    descriptionDe: 'Bis zu 180 Tage Aufenthalt in einem 12-Monats-Zeitraum zu touristischen Zwecken.',
    preset: true
  },
  {
    id: 'georgia',
    name: 'Gürcistan (365/365)',
    nameEn: 'Georgia (365/365)',
    nameDe: 'Georgien (365/365)',
    allowedDays: 365,
    windowDays: 365,
    description: 'Türk vatandaşlarına 365 gün kesintisiz vizesiz kalış imkanı.',
    descriptionEn: '365 days continuous visa-free stay allowed.',
    descriptionDe: '365 Tage durchgehender visumfreier Aufenthalt gestattet.',
    preset: true
  },
  {
    id: 'balkans',
    name: 'Balkanlar (90/180)',
    nameEn: 'Balkans (90/180)',
    nameDe: 'Balkan (90/180)',
    allowedDays: 90,
    windowDays: 180,
    description: 'Sırbistan, Bosna vb. ülkelerde 180 günde 90 gün kuralı.',
    descriptionEn: 'Standard 90 days within 180 days rule in non-EU Balkans.',
    descriptionDe: 'Standardregel von 90 Tagen innerhalb von 180 Tagen auf dem Nicht-EU-Balkan.',
    preset: true
  }
];

export function isDayCovered(day: number, trips: TripRecord[], regionName: string): boolean {
  return trips.some(t => t.region === regionName && day >= t.start && day <= t.end);
}

export function calculateDaysUsedInWindow(
  refDay: number,
  trips: TripRecord[],
  rule: RollingRule,
  hypotheticalStart?: number
): number {
  let count = 0;
  const startWindow = refDay - (rule.windowDays - 1);
  for (let d = startWindow; d <= refDay; d++) {
    if (isDayCovered(d, trips, rule.name) || (hypotheticalStart !== undefined && d >= hypotheticalStart && d <= refDay)) {
      count++;
    }
  }
  return count;
}

export interface SchengenCalcResult {
  daysUsed: number;
  remainingDays: number;
  maxConsecutiveStayIfEnteringToday: number;
  isOverstay: boolean;
  overstayDays: number;
  safeExitDate?: string;
}

export function evaluateRollingWindow(
  today: number,
  trips: TripRecord[],
  rule: RollingRule
): SchengenCalcResult {
  const daysUsed = calculateDaysUsedInWindow(today, trips, rule);
  const remaining = rule.allowedDays - daysUsed;

  // Calculate maximum stay if entered today
  let consecutive = 0;
  while (consecutive <= rule.windowDays) {
    const dayToCheck = today + consecutive;
    const used = calculateDaysUsedInWindow(dayToCheck, trips, rule, today);
    if (used > rule.allowedDays) {
      break;
    }
    consecutive++;
  }

  const isOverstay = remaining < 0;
  const safeExitDate = consecutive > 0 ? dayIndexToDate(today + consecutive - 1) : undefined;

  return {
    daysUsed,
    remainingDays: Math.max(0, remaining),
    maxConsecutiveStayIfEnteringToday: consecutive,
    isOverstay,
    overstayDays: isOverstay ? Math.abs(remaining) : 0,
    safeExitDate
  };
}

// 183 Gün Vergi Mukimliği Değerlendirmesi
export interface TaxResidencyStatus {
  countryCode: string;
  year: number;
  daysSpent: number;
  limit: number;
  daysRemaining: number;
  status: 'safe' | 'warning' | 'danger' | 'exceeded';
}

export function computeTaxResidency(trips: TripRecord[], year: number = new Date().getFullYear()): TaxResidencyStatus[] {
  const countryDays: Record<string, number> = {};

  const yearStart = dateToDayIndex(`${year}-01-01`);
  const yearEnd = dateToDayIndex(`${year}-12-31`);

  for (const t of trips) {
    if (!t.countryCode) continue;
    const overlapStart = Math.max(t.start, yearStart);
    const overlapEnd = Math.min(t.end, yearEnd);
    if (overlapEnd >= overlapStart) {
      const days = overlapEnd - overlapStart + 1;
      countryDays[t.countryCode] = (countryDays[t.countryCode] || 0) + days;
    }
  }

  const results: TaxResidencyStatus[] = [];
  const limit = 183;

  for (const [code, days] of Object.entries(countryDays)) {
    const rem = limit - days;
    let status: TaxResidencyStatus['status'] = 'safe';
    if (days >= limit) status = 'exceeded';
    else if (days >= 150) status = 'danger';
    else if (days >= 120) status = 'warning';

    results.push({
      countryCode: code,
      year,
      daysSpent: days,
      limit,
      daysRemaining: Math.max(0, rem),
      status
    });
  }

  return results.sort((a, b) => b.daysSpent - a.daysSpent);
}

// Çifte Pasaport Karşılaştırma & Optimizasyonu
export interface DualPassportComparison {
  passportA: string;
  passportB: string;
  scoreA: number;
  scoreB: number;
  combinedFreedomScore: number;
  betterA: CountryItem[];
  betterB: CountryItem[];
  equalEasiness: CountryItem[];
  bothVisaRequired: CountryItem[];
}

export function getPassportItems(passport: string): CountryItem[] {
  const r = D[passport] || {};
  const ids = idEligibleSet(passport);
  const list: CountryItem[] = [];

  for (const v in r) {
    const arr = r[v].split(' ');
    for (const c of arr) {
      if (c === passport) continue;
      const cat = resolveVisaCategory(v);
      list.push({
        c,
        v,
        cat,
        id: ids.has(c)
      });
    }
  }
  return list;
}

const CATEGORY_WEIGHT: Record<VisaCategory, number> = {
  id: 6,
  free: 5,
  eta: 4,
  evisa: 3,
  voa: 2,
  visa: 1,
  none: 0
};

export function compareDualPassports(passportA: string, passportB: string): DualPassportComparison {
  const itemsA = getPassportItems(passportA);
  const itemsB = getPassportItems(passportB);

  const mapA = new Map<string, CountryItem>(itemsA.map(i => [i.c, i]));
  const mapB = new Map<string, CountryItem>(itemsB.map(i => [i.c, i]));

  const allCountries = new Set<string>([...mapA.keys(), ...mapB.keys()]);
  allCountries.delete(passportA);
  allCountries.delete(passportB);

  const betterA: CountryItem[] = [];
  const betterB: CountryItem[] = [];
  const equalEasiness: CountryItem[] = [];
  const bothVisaRequired: CountryItem[] = [];

  let countEasyA = 0;
  let countEasyB = 0;
  let countCombinedEasy = 0;

  for (const c of allCountries) {
    const itemA = mapA.get(c);
    const itemB = mapB.get(c);

    const catA: VisaCategory = itemA ? (itemA.id ? 'id' : itemA.cat) : 'visa';
    const catB: VisaCategory = itemB ? (itemB.id ? 'id' : itemB.cat) : 'visa';

    const weightA = CATEGORY_WEIGHT[catA];
    const weightB = CATEGORY_WEIGHT[catB];

    const isEasyA = weightA >= CATEGORY_WEIGHT.voa;
    const isEasyB = weightB >= CATEGORY_WEIGHT.voa;
    if (isEasyA) countEasyA++;
    if (isEasyB) countEasyB++;
    if (isEasyA || isEasyB) countCombinedEasy++;

    if (weightA > weightB) {
      if (itemA) betterA.push(itemA);
    } else if (weightB > weightA) {
      if (itemB) betterB.push(itemB);
    } else {
      if (weightA >= CATEGORY_WEIGHT.voa && itemA) {
        equalEasiness.push(itemA);
      } else if (itemA) {
        bothVisaRequired.push(itemA);
      }
    }
  }

  return {
    passportA,
    passportB,
    scoreA: countEasyA,
    scoreB: countEasyB,
    combinedFreedomScore: countCombinedEasy,
    betterA,
    betterB,
    equalEasiness,
    bothVisaRequired
  };
}

// Rota Durak Kontrolü
export interface RouteStop {
  id: string;
  countryCode: string;
  entryDate: string; // YYYY-MM-DD
  exitDate: string;  // YYYY-MM-DD
}

export interface RouteWarning {
  type: 'error' | 'warning' | 'info';
  message: string;
}

export function validateRouteStop(
  stop: RouteStop,
  passport: string,
  allStops: RouteStop[],
  existingTrips: TripRecord[],
  lang: string = 'tr'
): RouteWarning[] {
  const isEn = lang === 'en';
  const isDe = lang === 'de';
  const isEs = lang === 'es';
  const isRu = lang === 'ru';
  const warnings: RouteWarning[] = [];
  const inIdx = dateToDayIndex(stop.entryDate);
  const outIdx = dateToDayIndex(stop.exitDate);

  if (outIdx < inIdx) {
    warnings.push({
      type: 'error',
      message: isEs
        ? 'La fecha de salida no puede ser anterior a la de entrada.'
        : isRu
        ? 'Дата выезда не может быть раньше даты въезда.'
        : isDe
        ? 'Das Ausreisedatum kann nicht vor dem Einreisedatum liegen.'
        : isEn
        ? 'Exit date cannot be before entry date.'
        : 'Çıkış tarihi giriş tarihinden önce olamaz.'
    });
    return warnings;
  }

  const daysPlanned = outIdx - inIdx + 1;
  const items = getPassportItems(passport);
  const item = items.find(i => i.c === stop.countryCode);

  if (!item) {
    warnings.push({
      type: 'warning',
      message: isEs
        ? 'No se encontraron datos de régimen de visados para este país.'
        : isRu
        ? 'Данные о визовом режиме для этой страны не найдены.'
        : isDe
        ? 'Keine Visaregelungsdaten für dieses Land gefunden.'
        : isEn
        ? 'No passport visa regime data found for this country.'
        : 'Bu ülke için pasaport rejim verisi bulunamadı.'
    });
    return warnings;
  }

  // Kalış süresi aşımı
  if (/^\d+$/.test(item.v) && !item.id) {
    const maxDays = parseInt(item.v, 10);
    if (daysPlanned > maxDays) {
      warnings.push({
        type: 'error',
        message: isEs
          ? `Los ${daysPlanned} días planificados exceden el límite sin visado (${maxDays} días) por ${daysPlanned - maxDays} días.`
          : isRu
          ? `Запланированные ${daysPlanned} дн. превышают разрешенный безвизовый срок (${maxDays} дн.) на ${daysPlanned - maxDays} дн.`
          : isDe
          ? `Geplante ${daysPlanned} Tage überschreiten die visumfreie Dauer (${maxDays} Tage) um ${daysPlanned - maxDays} Tage.`
          : isEn
          ? `Planned ${daysPlanned} days exceeds allowed visa-free duration (${maxDays} days) by ${daysPlanned - maxDays} days.`
          : `Planlanan ${daysPlanned} gün, izin verilen vizesiz kalış süresini (${maxDays} gün) ${daysPlanned - maxDays} gün aşıyor.`
      });
    }
  }

  // Vize tipi hatırlatması
  if (item.cat === 'visa' && !item.id) {
    warnings.push({
      type: 'warning',
      message: isEs
        ? 'Se requiere visado consular antes de la salida para este destino.'
        : isRu
        ? 'Для этой поездки требуется заранее оформить консульскую визу.'
        : isDe
        ? 'Für dieses Reiseziel ist vor Abreise ein Konsularvisum erforderlich.'
        : isEn
        ? 'A consular visa is required prior to departure for this destination.'
        : 'Bu ülke için seyahat öncesinde konsolosluk vizesi alınmalıdır.'
    });
  } else if (item.cat === 'evisa') {
    warnings.push({
      type: 'info',
      message: isEs
        ? 'Se debe obtener una autorización de visado electrónico (eVisa) antes de viajar.'
        : isRu
        ? 'Перед вылетом необходимо оформить электронную визу (eVisa).'
        : isDe
        ? 'Vor Reiseantritt muss eine Online-eVisa-Genehmigung eingeholt werden.'
        : isEn
        ? 'An online eVisa approval must be secured before travel.'
        : 'Seyahat öncesi internetten e-vize onayı alınmalıdır.'
    });
  } else if (item.cat === 'eta') {
    warnings.push({
      type: 'info',
      message: isEs
        ? 'Se requiere autorización electrónica de viaje (ETA) antes del embarque.'
        : isRu
        ? 'Требуется электронное разрешение на въезд (ETA) до вылета.'
        : isDe
        ? 'Elektronische Reisegenehmigung (ETA) vor Abflug erforderlich.'
        : isEn
        ? 'Electronic Travel Authorization (ETA) required before departure.'
        : 'Uçuştan önce ETA seyahat yetkilendirmesi yapılmalıdır.'
    });
  } else if (item.cat === 'voa') {
    warnings.push({
      type: 'info',
      message: isEs
        ? 'El visado se tramita al llegar al puesto fronterizo.'
        : isRu
        ? 'Виза оформляется по прибытии на границе.'
        : isDe
        ? 'Das Visum wird bei der Ankunft an der Grenze erteilt.'
        : isEn
        ? 'Visa is obtained on arrival at the border crossing.'
        : 'Vize sınır kapısında varışta temin edilir.'
    });
  }

  // Yaklaşan Karadağ kural değişikliği (TR-ME: 1 Kasım 2026)
  if (passport === 'TR' && stop.countryCode === 'ME') {
    const cutoff = dateToDayIndex('2026-11-01');
    if (outIdx >= cutoff) {
      warnings.push({
        type: 'warning',
        message: isEs
          ? 'AVISO: Montenegro exige visado para ciudadanos turcos a partir del 1 de noviembre de 2026.'
          : isRu
          ? 'ВНИМАНИЕ: Черногория вводит визовый режим для граждан Турции с 1 ноября 2026 г.'
          : isDe
          ? 'HINWEIS: Montenegro führt ab 1. Nov. 2026 eine Visumpflicht für türkische Staatsbürger ein.'
          : isEn
          ? 'NOTICE: Montenegro introduces visa requirements for Turkish passport holders starting Nov 1, 2026. Your travel is after this date.'
          : 'DİKKAT: Karadağ, 1 Kasım 2026 itibarıyla Türk vatandaşlarına vize zorunluluğu getirdi. Seyahatiniz bu tarihten sonradır.'
      });
    }
  }

  // Tayland TDAC ve 30 gün kuralı (TR-TH: 15 Eylül 2026)
  if (passport === 'TR' && stop.countryCode === 'TH') {
    const cutoff = dateToDayIndex('2026-09-15');
    if (outIdx >= cutoff) {
      warnings.push({
        type: 'info',
        message: isEs
          ? 'AVISO: Tailandia limita la estancia sin visado a 30 días mediante la tarjeta digital TDAC (norma del 15 de septiembre de 2026).'
          : isRu
          ? 'ВНИМАНИЕ: Таиланд ограничивает безвизовое пребывание до 30 дней по цифровой карте TDAC (правило от 15 сентября 2026 г.).'
          : isDe
          ? 'HINWEIS: Thailand beschränkt visumfreie Aufenthalte auf 30 Tage über digitale TDAC-Karten.'
          : isEn
          ? 'NOTICE: Thailand limits visa-free stays to 30 days via TDAC digital arrival cards (September 15, 2026 regulation).'
          : 'DİKKAT: Tayland, 15 Eylül 2026 düzenlemesiyle TDAC dijital varış kartı üzerinden vizesiz kalışı 30 günle sınırlandırmıştır.'
      });
    }
  }

  // Tarih çakışması kontrolü
  const overlapping = allStops.some(other => {
    if (other.id === stop.id) return false;
    const oIn = dateToDayIndex(other.entryDate);
    const oOut = dateToDayIndex(other.exitDate);
    return Math.max(inIdx, oIn) <= Math.min(outIdx, oOut);
  });

  if (overlapping) {
    warnings.push({
      type: 'error',
      message: isEs
        ? 'Las fechas de esta parada se solapan con otra parada en la ruta.'
        : isRu
        ? 'Даты этой остановки пересекаются с другой остановкой в маршруте.'
        : isDe
        ? 'Die Reisedaten dieses Aufenthalts überschneiden sich mit einem anderen Stopp.'
        : isEn
        ? 'Dates for this stop overlap with another stop on the route.'
        : 'Bu durağın tarihleri rotadaki başka bir durakla çakışıyor.'
    });
  }

  return warnings;
}

export function computeRouteSchengenTotal(
  stops: RouteStop[],
  existingTrips: TripRecord[]
): {
  totalSchengenDays: number;
  peak180Days: number;
  exceedsLimit: boolean;
} {
  const schDays = new Set<number>();

  for (const s of stops) {
    if (SCHENGEN_SET.has(s.countryCode)) {
      const a = dateToDayIndex(s.entryDate);
      const b = dateToDayIndex(s.exitDate);
      for (let d = a; d <= b; d++) {
        schDays.add(d);
      }
    }
  }

  const allDays = new Set<number>(schDays);
  for (const t of existingTrips) {
    if (t.region === 'Schengen') {
      for (let d = t.start; d <= t.end; d++) {
        allDays.add(d);
      }
    }
  }

  let peak = 0;
  for (const day of schDays) {
    let countInWindow = 0;
    for (let d = day - 179; d <= day; d++) {
      if (allDays.has(d)) countInWindow++;
    }
    if (countInWindow > peak) peak = countInWindow;
  }

  return {
    totalSchengenDays: schDays.size,
    peak180Days: peak,
    exceedsLimit: peak > 90
  };
}
