// Seçilen Commons fotoğraflarını indirir, sitenin boyutlarında WebP/AVIF üretir ve künyeleri yazar.
// Kullanım: node scripts/apply-photo-picks.mjs <aday-klasörü>
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const CAND = process.argv[2] || '.cand';
const OUT = path.resolve('public/images/countries');
const PICKS = { MT: 2, MD: 7, PL: 7, AF: 3, BD: 7, KH: 1, TL: 1, KZ: 1, IL: 7, TR: 4, GW: 7, LR: 4, SS: 1, ZW: 1, SD: 4, TN: 5, ZA: 7, BZ: 6, FJ: 6, TT: 1, NI: 6, AZ: 1, DO: 6, PA: 7 };
const UA = { 'User-Agent': 'VizamigoPhotoPicker/1.0 (info@vizamigo.com)' };
const cand = JSON.parse(fs.readFileSync(path.join(CAND, 'candidates.json'), 'utf8'));
const meta = {};
for (const [code, idx] of Object.entries(PICKS)) {
  const c = cand[code][idx - 1];
  const big = c.thumb.replace(/\/\d+px-/, '/2560px-');
  let buf;
  for (const u of [big, c.url]) {
    try {
      const r = await fetch(u, { headers: UA });
      if (r.ok) { buf = Buffer.from(await r.arrayBuffer()); break; }
    } catch {}
  }
  if (!buf) { console.log(code, 'indirilemedi'); continue; }
  const lc = code.toLowerCase();
  for (const w of [240, 360, 480, 720]) {
    await sharp(buf).rotate().resize({ width: w, height: Math.round(w * 0.66), fit: 'cover', position: sharp.strategy.attention }).webp({ quality: 62, effort: 4 }).toFile(path.join(OUT, `${lc}-${w}.webp`));
    await sharp(buf).rotate().resize({ width: w, height: Math.round(w * 0.66), fit: 'cover', position: sharp.strategy.attention }).avif({ quality: 55, effort: 4 }).toFile(path.join(OUT, `${lc}-${w}.avif`));
  }
  meta[code] = { author: c.artist, license: c.license, sourceUrl: c.url, sourcePageUrl: c.page, title: c.title };
  console.log(code, 'ok');
}
fs.writeFileSync(path.join(CAND, 'picked.json'), JSON.stringify(meta, null, 1));
