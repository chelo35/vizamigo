export const config = { runtime: 'edge' };

/**
 * 12Go sefer saatleri: ortaklık panelindeki resmî "Timetable" aracının gömülü sürümü (12go.asia/{dil}/timetable/...?embedded).
 * 12Go'nun kendi PHP kütüphanesi bu adresi 24 saat önbellekle çağırıyor; biz de CDN'de 24 saat saklıyoruz.
 * GET /api/timetable?cc=TH&from=bangkok&to=chiang-mai
 * Döner: { ok, routes: [{ mode, title, url, min, max, dur, classes: [{ n, t: [saat...] }] }] }  (fiyatlar kişi başı USD)
 */
const AGENT = '17478120';
const MODE: Record<string, string> = { avia: 'avia', flight: 'avia', bus: 'bus', train: 'train', ferry: 'ferry', boat: 'ferry', van: 'van', minivan: 'van', taxi: 'charter', charter: 'charter', car: 'charter' };
const clean = (s: string) => s.replace(/<[^>]+>/g, ' ').replace(/&ndash;|&#8211;/g, '–').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const slug = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

export default async function handler(req: Request): Promise<Response> {
  const q = new URL(req.url).searchParams;
  const cc = (q.get('cc') || '').toUpperCase().replace(/[^A-Z]/g, '').slice(0, 2);
  const from = slug(q.get('from') || '');
  const to = slug(q.get('to') || '');
  const out = (body: unknown, cache = 's-maxage=86400, stale-while-revalidate=172800') =>
    new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': `public, max-age=3600, ${cache}` } });
  if (cc.length !== 2 || !from || !to) return out({ ok: false, routes: [] }, 's-maxage=60');
  try {
    const r = await fetch(`https://12go.asia/en/timetable/${cc}/${from}/${to}?embedded&css=no&noreturn&z=${AGENT}&lang=en&currency=USD`);
    if (!r.ok) return out({ ok: false, routes: [] }, 's-maxage=600');
    const h = await r.text();
    const routes: { mode: string; title: string; url: string; min: number; max: number; dur: string; classes: { n: string; t: string[] }[] }[] = [];
    // Her ulaşım türü: bir "one2go-route-name" satırı + ardından gelen "one2go-trips" satırı
    const parts = h.split(/class="one2go-route-name"/).slice(1);
    for (const p of parts) {
      const a = p.match(/href="(https:\/\/12go\.asia\/en\/([a-z]+)\/[^"]+)"[^>]*>([^<]+)</);
      if (!a) continue;
      const mode = MODE[a[2]] || '';
      const price = clean(p.match(/one2go-route-price">([\s\S]*?)<\/span>/)?.[1] || '');
      const nums = (price.match(/[\d.,]+/g) || []).map((x) => parseFloat(x.replace(/,/g, ''))).filter((x) => x > 0);
      const dur = clean(p.match(/one2go-route-duration">([\s\S]*?)<\/span>/)?.[1] || '');
      const classes: { n: string; t: string[] }[] = [];
      const trips = p.split(/one2go-trips/)[1] || '';
      for (const li of trips.split(/<li>/).slice(1)) {
        const n = clean(li.match(/one2go-class">([\s\S]*?)<\/span>/)?.[1] || '');
        const t = clean(li.match(/one2go-departures">([\s\S]*?)<\/span>/)?.[1] || '').split(/,\s*/).filter((x) => /^\d{1,2}:\d{2}$/.test(x));
        if (n || t.length) classes.push({ n, t });
      }
      routes.push({ mode, title: clean(a[3]), url: a[1].replace(/&amp;/g, '&'), min: nums[0] || 0, max: nums[1] || nums[0] || 0, dur, classes: classes.slice(0, 8) });
    }
    // Aynı tür birden çok kez gelebiliyor (farklı istasyon/işletmeci): tek satırda birleştir
    const merged: typeof routes = [];
    for (const r of routes) {
      const m = r.mode && merged.find((x) => x.mode === r.mode);
      if (!m) { merged.push(r); continue; }
      if (r.min > 0 && (!m.min || r.min < m.min)) m.min = r.min;
      if (r.max > m.max) m.max = r.max;
      for (const c of r.classes) if (!m.classes.some((x) => x.n === c.n)) m.classes.push(c);
      m.classes = m.classes.slice(0, 8);
    }
    return out({ ok: true, routes: merged }, merged.length ? undefined : 's-maxage=21600');
  } catch {
    return out({ ok: false, routes: [] }, 's-maxage=600');
  }
}
