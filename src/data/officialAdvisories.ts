/**
 * Resmî seyahat uyarıları: ABD Dışişleri (travel.state.gov), Birleşik Krallık FCDO (gov.uk) ve Kanada (travel.gc.ca).
 * Veri doğrudan bu kurumların açık veri uçlarından alınır (officialAdvisories.json, alınma tarihi `fetched`).
 * Seviyeler 1–4 ölçeğine çevrilir:
 *   ABD: 1 normal önlem · 2 dikkatli olun · 3 seyahati yeniden düşünün · 4 seyahat etmeyin
 *   Kanada: 1 normal önlem · 2 yüksek dikkat · 3 zorunlu olmayan seyahatten kaçının · 4 tüm seyahatten kaçının
 *   FCDO: 1 uyarı yok · 2 bazı bölgelere uyarı · 3 ülke geneli zorunlu olmayan seyahat önerilmez · 4 ülke geneli hiç gidilmemeli
 */
import RAW from './officialAdvisories.json';

type Raw = { fetched: string; c: Record<string, { us?: [number, string, string]; uk?: [number, string, string]; ca?: [number, number, string, string] }> };
const DATA = RAW as unknown as Raw;

import type { OfficialAdvisorySet, OfficialAdvisory } from './officialAdvisoryLabels';
export type { OfficialAdvisorySet, OfficialAdvisory };

const clampLevel = (n: number) => Math.max(1, Math.min(4, Math.round(n))) as 1 | 2 | 3 | 4;

export function getOfficialAdvisories(countryCode: string): OfficialAdvisorySet {
  const r = DATA.c[(countryCode || '').toUpperCase()] || {};
  const items: OfficialAdvisory[] = [];
  if (r.us) items.push({ agency: 'us', level: clampLevel(r.us[0]), date: r.us[1], url: `https://travel.state.gov/content/tsg_aem/us/en/home/international-travel/travel-advisories/${r.us[2]}` });
  if (r.uk) items.push({ agency: 'uk', level: clampLevel(r.uk[0]), date: r.uk[1], url: `https://www.gov.uk/foreign-travel-advice/${r.uk[2]}` });
  if (r.ca) items.push({ agency: 'ca', level: clampLevel(r.ca[0]), regional: r.ca[1] === 1, date: r.ca[2], url: `https://travel.gc.ca/destinations/${r.ca[3]}` });
  return { fetched: DATA.fetched, items, max: items.length ? Math.max(...items.map((i) => i.level)) : null };
}

/**
 * Sitenin güvenlik puanını resmî uyarılarla tutarlı tutar. Kurumların çoğunluk (orta) seviyesi esas alınır,
 * tek bir kurumun daha sert uyarısı puanı tek başına düşürmez (o uyarı sayfada ayrıca gösterilir):
 * orta seviye 4 → puan 10, 3 → en fazla 40, 2 → en fazla 65, 1 → değişmez.
 */
export function safetyCapForCountry(countryCode: string): number | null {
  const lv = getOfficialAdvisories(countryCode).items.map((i) => i.level).sort((a, b) => a - b);
  if (!lv.length) return null;
  const m = lv[Math.floor(lv.length / 2)];
  return m === 4 ? 10 : m === 3 ? 40 : m === 2 ? 65 : null;
}
