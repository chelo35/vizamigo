export const config = { runtime: 'edge' };

import { partnerCat, partnerFromName } from './_catalog';

/**
 * Fenomen paneli: Travelpayouts rezervasyonlarını (sub_id = r-<kod>-…) Supabase ref_bookings tablosuna aktarır.
 * Vercel Cron günde bir çağırır; panel de 3 saatten eski veride arka planda tetikleyebilir. İşlem tekrarlanabilir (upsert).
 * Durum eşlemesi: processing → pending, paid (TP onayladı) → approved, canceled → cancelled.
 * Elle "paid" (fenomene ödendi) yapılmış satırların durumu korunur.
 * Diğer ağlar (Stay22, Awin, Admitad, CJ, Daisycon, 12Go, Viator, GYG) şimdilik elle girilir (network alanı ile).
 */
const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env || {};
const SB = env.SUPABASE_URL || 'https://utlnjyquflfcvjhmgopq.supabase.co';
const KEY = env.SUPABASE_SERVICE_ROLE_KEY || '';
const TP = env.TRAVELPAYOUTS_TOKEN || '';

// Travelpayouts program adı → hizmet türü
function catOf(name: string): string {
  const n = name.toLowerCase();
  if (/esim|yesim|airalo|saily|gigsky|drimsim/.test(n)) return 'esim';
  if (/taxi|transfer|intui|welcome|daytrip/.test(n)) return 'transfer';
  if (/bike|moto|scooter/.test(n)) return 'bike';
  if (/rent|car|qeeq|economybookings|autoeurope/.test(n)) return 'car';
  if (/klook|tiqets|wegotrip|go ?city|getyourguide|viator|kkday|tour|activit/.test(n)) return 'tour';
  if (/train|bus|ferry|12go|rail/.test(n)) return 'train';
  if (/hotel|booking|hostel|stay/.test(n)) return 'hotel';
  if (/aviasales|kiwi|flight|air|jetradar/.test(n)) return 'flight';
  return 'other';
}

const sbh = { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' };
const json = (o: unknown, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

async function tp(path: string, body?: unknown) {
  const r = await fetch(`https://api.travelpayouts.com/statistics/v1/${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { 'X-Access-Token': TP, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  const t = await r.text();
  if (!r.ok) throw new Error(`tp ${path} ${r.status} ${t.slice(0, 200)}`);
  return JSON.parse(t);
}

const fxCache: Record<string, number> = {};
async function fxTry(day: string): Promise<number | null> {
  if (fxCache[day]) return fxCache[day];
  try {
    const r = await fetch(`https://api.frankfurter.app/${day}?from=EUR&to=TRY`);
    const j = (await r.json()) as { rates?: { TRY?: number } };
    if (j.rates?.TRY) return (fxCache[day] = j.rates.TRY);
  } catch {}
  return null;
}

const num = (x: unknown): number | null => {
  const n = typeof x === 'string' ? parseFloat(x) : typeof x === 'number' ? x : NaN;
  return Number.isFinite(n) ? n : null;
};

export default async function handler(req: Request): Promise<Response> {
  if (!KEY || !TP) return json({ ok: false, error: 'env' }, 500);
  const q = new URL(req.url).searchParams;
  const debug = q.get('debug') === '1';
  const days = Math.min(400, Math.max(1, parseInt(q.get('days') || '120', 10) || 120));
  try {
    // alan listesi: kâr alanının adı TP'de değişebiliyor, olanı seç
    const fl = (await tp('get_fields_list')) as { fields?: { name?: string }[]; results?: { name?: string }[] } | { name?: string }[];
    const arr = (Array.isArray(fl) ? fl : fl.fields || fl.results || []) as { name?: string; field?: string }[];
    const names = new Set(arr.map((f) => f.name || f.field || '').filter(Boolean));
    const profitFields = names.size ? ['profit_eur', 'paid_profit_eur', 'processing_profit_eur'].filter((f) => names.has(f)) : ['paid_profit_eur'];
    const priceField = ['price_eur', 'price_usd'].find((f) => names.has(f)) || 'price_eur';
    const want = ['action_id', 'sub_id', 'state', 'date', 'campaign_id', 'campaign_name_en', priceField, ...profitFields].filter((f) => names.size === 0 || names.has(f));
    const from = new Date(Date.now() - days * 864e5).toISOString().slice(0, 10);
    const rows: Record<string, unknown>[] = [];
    for (let off = 0; off < 50000; off += 1000) {
      const j = (await tp('execute_query', {
        fields: want,
        filters: [
          { field: 'type', op: 'eq', value: 'action' },
          { field: 'date', op: 'ge', value: from }
        ],
        sort: [{ field: 'date', order: 'desc' }],
        offset: off,
        limit: 1000
      })) as { results?: Record<string, unknown>[]; total_rows?: number };
      const res = j.results || [];
      rows.push(...res);
      if (res.length < 1000) break;
    }
    const mine = rows.filter((r) => /^r-[a-z0-9][a-z0-9_-]{1,29}-/.test(String(r.sub_id || '')) || /^r-[a-z0-9][a-z0-9_-]{1,29}$/.test(String(r.sub_id || '')));
    if (debug) {
      const camps: Record<string, number> = {};
      rows.forEach((r) => (camps[String(r.campaign_id)] = (camps[String(r.campaign_id)] || 0) + 1));
      return json({ ok: true, fields: [...names].sort(), used: want, total: rows.length, withRef: mine.length, campaigns: camps });
    }
    if (!mine.length) return json({ ok: true, total: rows.length, upserted: 0 });

    // kodu sub_id'den ayıkla: r-<kod>-<sayfa>; kodlar ref_partners'ta olmalı
    const partners = (await (await fetch(`${SB}/rest/v1/ref_partners?select=ref`, { headers: sbh })).json()) as { ref: string }[];
    const refs = new Set(partners.map((p) => p.ref));
    const refOf = (sub: string) => {
      const body = sub.slice(2);
      // en uzun eşleşen kod (kodlarda tire olabilir)
      let best = '';
      for (const r of refs) if ((body === r || body.startsWith(`${r}-`)) && r.length > best.length) best = r;
      return best;
    };
    const ids = mine.map((r) => `tp-${r.action_id}`);
    const existing = (await (await fetch(`${SB}/rest/v1/ref_bookings?id=in.(${ids.map((i) => `"${i}"`).join(',')})&select=id,status`, { headers: sbh })).json()) as { id: string; status: string }[];
    const keepPaid = new Set(existing.filter((e) => e.status === 'paid').map((e) => e.id));
    const out = [];
    for (const r of mine) {
      const ref = refOf(String(r.sub_id));
      if (!ref) continue;
      const id = `tp-${r.action_id}`;
      const day = String(r.date || '').slice(0, 10);
      const state = String(r.state || '');
      const status = keepPaid.has(id) ? 'paid' : state === 'paid' ? 'approved' : /cancel/.test(state) ? 'cancelled' : 'pending';
      const profit = profitFields.map((f) => num(r[f])).find((x) => x !== null && x > 0) ?? profitFields.map((f) => num(r[f])).find((x) => x !== null) ?? null;
      const cname = String(r.campaign_name_en || '').trim();
      const pk = partnerFromName(cname);
      const seg = String(r.sub_id).slice(2 + ref.length + 1);
      const eur = priceField === 'price_eur';
      out.push({
        id,
        ref,
        network: 'travelpayouts',
        partner: pk !== 'unknown' ? pk : cname || `TP #${r.campaign_id}`,
        category: pk !== 'unknown' ? partnerCat(pk) : catOf(cname),
        page: seg && seg !== 'home' ? seg : '/',
        booked_at: day || null,
        amount_eur: eur ? num(r[priceField]) : null,
        commission_eur: profit,
        fx_try: day ? await fxTry(day) : null,
        status,
        updated_at: new Date().toISOString()
      });
    }
    if (out.length) {
      const w = await fetch(`${SB}/rest/v1/ref_bookings?on_conflict=id`, {
        method: 'POST',
        headers: { ...sbh, Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify(out)
      });
      if (!w.ok) return json({ ok: false, error: `supabase ${w.status} ${(await w.text()).slice(0, 200)}` }, 500);
    }
    return json({ ok: true, total: rows.length, upserted: out.length });
  } catch (e) {
    return json({ ok: false, error: String((e as Error).message || e).slice(0, 300) }, 500);
  }
}
