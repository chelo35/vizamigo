// Wikimedia Commons'tan ülke fotoğrafı adayları bulur (kalite/öne çıkan görseller öncelikli)
// Kullanım: node scripts/find-photo-candidates.mjs <çıktı-klasörü>
import fs from 'fs';
import path from 'path';

const OUT = process.argv[2] || '.cand';
fs.mkdirSync(OUT, { recursive: true });
const Q = {
  MT: 'Valletta Grand Harbour', MD: 'Orheiul Vechi', PL: 'Kraków Main Market Square', AF: 'Band-e Amir',
  BD: 'Sundarbans', KP: 'Pyongyang Juche Tower', KH: 'Angkor Wat', TL: 'Cristo Rei Dili', KZ: 'Mausoleum of Khoja Ahmed Yasawi',
  IL: 'Western Wall Jerusalem', TR: 'Cappadocia balloons', GW: 'Bijagós', LR: 'Robertsport', SS: 'Juba South Sudan Nile',
  ZW: 'Victoria Falls', SD: 'Meroë pyramids', TN: 'Sidi Bou Said', ZA: 'Table Mountain Cape Town', BZ: 'Great Blue Hole',
  GD: 'Grand Anse Beach Grenada', FJ: 'Fiji beach', TT: 'Pigeon Point Tobago', NI: 'Granada Nicaragua cathedral',
  AZ: 'Flame Towers Baku', KW: 'Kuwait City skyline Kuwait Towers', DO: 'Punta Cana beach', PA: 'Panama Canal Miraflores Locks'
};
const UA = { 'User-Agent': 'VizamigoPhotoPicker/1.0 (info@vizamigo.com)' };
const api = async (params) => {
  const u = 'https://commons.wikimedia.org/w/api.php?' + new URLSearchParams({ format: 'json', origin: '*', ...params });
  const r = await fetch(u, { headers: UA });
  return r.json();
};
const ONLY = process.env.ONLY ? process.env.ONLY.split(',') : null;
const result = {};
for (const [code, q] of Object.entries(Q)) {
  if (ONLY && !ONLY.includes(code)) continue;
  const seen = new Map();
  for (const extra of [' incategory:Featured_pictures_on_Wikimedia_Commons', ' incategory:Quality_images', '']) {
    if (seen.size >= 8) break;
    const j = await api({
      action: 'query', generator: 'search', gsrsearch: q + extra + ' filetype:bitmap', gsrnamespace: '6', gsrlimit: '12',
      prop: 'imageinfo', iiprop: 'url|size|extmetadata', iiurlwidth: '480'
    });
    const pages = Object.values(j?.query?.pages || {}).sort((a, b) => (a.index || 0) - (b.index || 0));
    for (const p of pages) {
      const ii = p.imageinfo?.[0];
      if (!ii || seen.has(p.title)) continue;
      if (ii.width < 1400 || ii.width < ii.height * 1.2) continue; // yatay ve yeterince büyük
      const m = ii.extmetadata || {};
      seen.set(p.title, {
        title: p.title, url: ii.url, thumb: ii.thumburl, page: ii.descriptionurl, w: ii.width, h: ii.height,
        artist: (m.Artist?.value || '').replace(/<[^>]+>/g, '').trim(), license: m.LicenseShortName?.value || '',
        tier: extra.includes('Featured') ? 'featured' : extra.includes('Quality') ? 'quality' : 'other'
      });
      if (seen.size >= 8) break;
    }
  }
  result[code] = [...seen.values()];
  let i = 0;
  for (const c of result[code]) {
    i++;
    try {
      const r = await fetch(c.thumb, { headers: UA });
      fs.writeFileSync(path.join(OUT, `${code}-${i}.jpg`), Buffer.from(await r.arrayBuffer()));
    } catch {}
  }
  console.log(code, result[code].length);
}
fs.writeFileSync(path.join(OUT, 'candidates.json'), JSON.stringify(result, null, 1));
