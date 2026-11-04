// Airalo eSIM fiyat beslemesi (Travelpayouts "Data from Airalo") → src/data/esimPrices.json
// Kullanım: node scripts/update-esim.mjs [yerel-xml-yolu]   (yol verilmezse Google Drive'dan indirir)
import fs from 'node:fs';

const FEED = 'https://drive.usercontent.google.com/download?id=1OEQ2jZO3ydqd3DFXLuer3fil91YqInRH&export=download&confirm=t';
const xml = process.argv[2] ? fs.readFileSync(process.argv[2], 'utf8') : await (await fetch(FEED)).text();
if (!xml.includes('<item>')) throw new Error('Besleme okunamadı');

const geo = fs.readFileSync(new URL('../src/data/geoData.ts', import.meta.url), 'utf8');
const codes = [...geo.matchAll(/^\s+([A-Z]{2}): \{ code:/gm)].map((m) => m[1]);
const dn = new Intl.DisplayNames(['en'], { type: 'region' });
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, '');
const byName = new Map(codes.map((c) => [norm(dn.of(c) || c), c]));
const ALIAS = { czechrepublic: 'CZ', turkey: 'TR', unitedstates: 'US', unitedkingdom: 'GB', southkorea: 'KR', timorleste: 'TL', capeverde: 'CV', cotedivoire: 'CI', russia: 'RU', vietnam: 'VN', laos: 'LA', macedonia: 'MK', northmacedonia: 'MK', bosniaandherzegovina: 'BA', congo: 'CG', drcongo: 'CD', republicofthecongo: 'CG', palestinestateof: 'PS', curacao2: 'CW', democraticrepublicofthecongo: 'CD', eswatini: 'SZ', myanmar: 'MM', palestine: 'PS', taiwan: 'TW', hongkong: 'HK', macau: 'MO', macao: 'MO', curacao: 'CW', saintlucia: 'LC', stlucia: 'LC', bahamas: 'BS', gambia: 'GM', micronesia: 'FM', moldova: 'MD', syria: 'SY', iran: 'IR', tanzania: 'TZ', bolivia: 'BO', venezuela: 'VE', brunei: 'BN', kosovo: 'XK', vatican: 'VA', antiguaandbarbuda: 'AG', saintkittsandnevis: 'KN', saintvincentandthegrenadines: 'VC', trinidadandtobago: 'TT', unitedarabemirates: 'AE', saudiarabia: 'SA' };

const tag = (s, t) => (s.match(new RegExp(`<g:${t}>([\\s\\S]*?)</g:${t}>`)) || [])[1]?.trim() || '';
const out = {};
let skipped = new Set();
for (const it of xml.split('<item>').slice(1)) {
  const pt = tag(it, 'product_type').split(' > ');
  if (pt.length < 6) continue;
  const key = norm(pt[2]);
  const c = ALIAS[key] || byName.get(key);
  if (!c || !codes.includes(c)) { skipped.add(pt[2]); continue; }
  const gb = pt[4] === 'unlimited' ? 0 : parseFloat(pt[4]);
  const days = parseInt(pt[5], 10);
  const price = parseFloat(tag(it, 'sale_price') || tag(it, 'price'));
  const link = decodeURIComponent((tag(it, 'link').replace(/&amp;/g, '&').match(/[?&]u=([^&]+)/) || [])[1] || '');
  const path = link.replace('https://www.airalo.com/', '');
  if (!days || !price || !path || (gb !== 0 && !(gb >= 0))) continue;
  (out[c] ||= []).push([gb, days, price, path]);
}
// Ülke başına: her gün sayısı ve veri miktarı için en ucuzu, fiyata göre sıralı
for (const c of Object.keys(out)) {
  const best = new Map();
  for (const p of out[c]) {
    const k = `${p[0]}|${p[1]}`;
    if (!best.has(k) || best.get(k)[2] > p[2]) best.set(k, p);
  }
  out[c] = [...best.values()].sort((a, b) => a[2] - b[2]);
}
const file = new URL('../src/data/esimPrices.json', import.meta.url);
fs.writeFileSync(file, JSON.stringify({ updated: new Date().toISOString().slice(0, 10), src: 'Airalo', p: out }));
console.log(`${Object.keys(out).length} ülke yazıldı; eşleşmeyen: ${[...skipped].join(', ')}`);
