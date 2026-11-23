export const config = { runtime: 'edge' };

import { partnerCat, partnerFromName } from './_catalog';

/**
 * Fenomen paneli: ortak ağlarındaki rezervasyonları (alt kimlikte "r-<kod>") Supabase ref_bookings tablosuna aktarır.
 * Vercel Cron günde bir çağırır; ?debug=1 ağ başına özet, ?days=N geriye dönük gün sayısı (varsayılan 120).
 * Her ağ yalnız kendi anahtarı Vercel ortam değişkenlerinde varsa çalışır:
 *   Travelpayouts  TRAVELPAYOUTS_TOKEN                       (sub_id = r-<kod>-<sayfa>)
 *   Stay22         STAY22_API_KEY [STAY22_API_BASE]          (campaign = …-r-<kod>)
 *   Awin           AWIN_API_TOKEN [AWIN_PUBLISHER_ID=3138284] (clickRef = r-<kod>)
 *   Admitad        ADMITAD_CLIENT_ID + ADMITAD_CLIENT_SECRET (subid = r-<kod>)
 *   CJ             CJ_API_TOKEN [CJ_PUBLISHER_ID=7817772]    (sid → shopperId = r-<kod>)
 *   Viator         VIATOR_API_KEY (campaignValue; komisyon %8 tahmini)
 *   Daisycon       DAISYCON_CLIENT_ID + DAISYCON_CLIENT_SECRET, ilk bağlantı /api/daisycon-auth (ws → subid)
 * Durum: bekleyen → pending, ağ onayladı → approved, iptal/ret → cancelled; elle "paid" yapılan satır korunur.
 * TourRadar, 12Go: API yok — sorulduysa cevaba göre eklenecek.
 */
const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env || {};
const SB = env.SUPABASE_URL || 'https://utlnjyquflfcvjhmgopq.supabase.co';
const KEY = env.SUPABASE_SERVICE_ROLE_KEY || '';
const sbh = { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' };
const json = (o: unknown, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
const num = (x: unknown): number | null => {
  const n = typeof x === 'string' ? parseFloat(x) : typeof x === 'number' ? x : NaN;
  return Number.isFinite(n) ? n : null;
};
const day = (s: unknown) => String(s || '').slice(0, 10);
const ymd = (d: Date) => d.toISOString().slice(0, 10);

type Row = {
  id: string; ref: string; network: string; partner: string; category: string; page: string | null; booked_at: string | null;
  amount_eur: number | null; commission_eur: number | null; fx_try: number | null; status: string; updated_at: string;
};
type Raw = { id: string; tag: string; network: string; partnerName: string; booked: string; amount: number | null; commission: number | null; currency: string; status: 'pending' | 'approved' | 'cancelled' };

// ---- kur (Frankfurter / ECB): günün EUR bazlı kurları ----
const fxCache: Record<string, Record<string, number>> = {};
async function rates(d: string): Promise<Record<string, number>> {
  if (fxCache[d]) return fxCache[d];
  try {
    const j = (await (await fetch(`https://api.frankfurter.app/${d || 'latest'}?from=EUR`)).json()) as { rates?: Record<string, number> };
    return (fxCache[d] = { EUR: 1, ...(j.rates || {}) });
  } catch {
    return (fxCache[d] = { EUR: 1 });
  }
}
async function toEur(v: number | null, cur: string, d: string): Promise<number | null> {
  if (v === null) return null;
  const r = await rates(d);
  const c = (cur || 'EUR').toUpperCase();
  return r[c] ? v / r[c] : c === 'EUR' ? v : null;
}

// ---- kaynaklar ----
async function travelpayouts(from: string): Promise<Raw[]> {
  const T = env.TRAVELPAYOUTS_TOKEN;
  if (!T) throw new Error('no TRAVELPAYOUTS_TOKEN');
  const tp = async (path: string, body?: unknown) => {
    const r = await fetch(`https://api.travelpayouts.com/statistics/v1/${path}`, { method: body ? 'POST' : 'GET', headers: { 'X-Access-Token': T, 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
    const t = await r.text();
    if (!r.ok) throw new Error(`tp ${path} ${r.status} ${t.slice(0, 150)}`);
    return JSON.parse(t);
  };
  const fl = (await tp('get_fields_list')) as { fields?: { name?: string }[] };
  const names = new Set((fl.fields || []).map((f) => f.name || ''));
  const profit = ['paid_profit_eur', 'processing_profit_eur'].filter((f) => names.has(f));
  const want = ['action_id', 'sub_id', 'state', 'date', 'campaign_id', 'campaign_name_en', 'price_eur', ...profit].filter((f) => !names.size || names.has(f));
  const out: Raw[] = [];
  for (let off = 0; off < 50000; off += 1000) {
    const j = (await tp('execute_query', { fields: want, filters: [{ field: 'type', op: 'eq', value: 'action' }, { field: 'date', op: 'ge', value: from }], sort: [{ field: 'date', order: 'desc' }], offset: off, limit: 1000 })) as { results?: Record<string, unknown>[] };
    for (const r of j.results || []) {
      const st = String(r.state || '');
      out.push({
        id: `tp-${r.action_id}`, tag: String(r.sub_id || ''), network: 'travelpayouts', partnerName: String(r.campaign_name_en || ''),
        booked: day(r.date), amount: num(r.price_eur), commission: profit.map((f) => num(r[f])).find((x) => x !== null && x !== 0) ?? 0, currency: 'EUR',
        status: st === 'paid' ? 'approved' : /cancel/.test(st) ? 'cancelled' : 'pending'
      });
    }
    if ((j.results || []).length < 1000) break;
  }
  return out;
}

async function stay22(from: string, to: string): Promise<Raw[]> {
  const K = env.STAY22_API_KEY;
  if (!K) throw new Error('no STAY22_API_KEY');
  const base = env.STAY22_API_BASE || 'https://api.stay22.com';
  const out: Raw[] = [];
  for (let page = 0; page < 50; page++) {
    const r = await fetch(`${base}/v1/reporting/transactions?format=json&dateFilter=bookedDate&startDate=${from}&endDate=${to}&limit=500&page=${page}&thirdParty=vizamigo`, { headers: { 'X-API-KEY': K } });
    const t = await r.text();
    if (!r.ok) throw new Error(`stay22 ${r.status} ${t.slice(0, 150)}`);
    const data = ((JSON.parse(t) as { data?: Record<string, unknown>[] }).data || []);
    for (const b of data) {
      const tags = [String(b.campaignId || ''), ...((b.campaignIds as unknown[]) || []).map(String)].join(' ');
      const st = String(b.bookingStatus || '').toLowerCase();
      out.push({
        id: `s22-${b.provider}-${b.bookingId}`, tag: tags, network: 'stay22', partnerName: String(b.provider || ''), booked: day(b.bookedDate),
        amount: num(b.totalPrice ?? b.price ?? b.revenue), commission: num(b.commission), currency: String(b.currency || 'USD'),
        status: /cancel|declin|reject|invalid/.test(st) ? 'cancelled' : /complete|confirm|approv|paid|stayed|valid/.test(st) && !/pend/.test(st) ? 'approved' : 'pending'
      });
    }
    if (data.length < 500) break;
  }
  return out;
}

async function awin(from: string, to: string): Promise<Raw[]> {
  const T = env.AWIN_API_TOKEN;
  if (!T) throw new Error('no AWIN_API_TOKEN');
  const pid = env.AWIN_PUBLISHER_ID || '3138284';
  const ADV: Record<string, string> = { '129367': 'Ferryhopper', '128757': 'HelloSafe' };
  const out: Raw[] = [];
  // Awin en fazla 31 günlük aralık veriyor
  for (let s = new Date(`${from}T00:00:00Z`); ymd(s) <= to; s = new Date(s.getTime() + 31 * 864e5)) {
    const e = new Date(Math.min(s.getTime() + 31 * 864e5 - 1000, new Date(`${to}T23:59:59Z`).getTime()));
    const u = `https://api.awin.com/publishers/${pid}/transactions/?startDate=${ymd(s)}T00:00:00&endDate=${e.toISOString().slice(0, 19)}&timezone=UTC&dateType=transaction`;
    const r = await fetch(u, { headers: { Authorization: `Bearer ${T}` } });
    const t = await r.text();
    if (!r.ok) throw new Error(`awin ${r.status} ${t.slice(0, 150)}`);
    for (const x of JSON.parse(t) as Record<string, unknown>[]) {
      const refs = (x.clickRefs || {}) as Record<string, unknown>;
      const tag = [x.clickRef, ...Object.values(refs)].map((v) => String(v || '')).join(' ');
      const st = String(x.commissionStatus || '').toLowerCase();
      const sale = (x.saleAmount || {}) as { amount?: number; currency?: string };
      const com = (x.commissionAmount || {}) as { amount?: number; currency?: string };
      out.push({
        id: `awin-${x.id}`, tag, network: 'awin', partnerName: ADV[String(x.advertiserId)] || String(x.advertiserName || x.advertiserId || ''),
        booked: day(x.transactionDate), amount: num(sale.amount), commission: num(com.amount), currency: String(com.currency || sale.currency || 'EUR'),
        status: /declin|delet/.test(st) ? 'cancelled' : st === 'approved' ? 'approved' : 'pending'
      });
    }
  }
  return out;
}

async function admitad(from: string, to: string): Promise<Raw[]> {
  const id = env.ADMITAD_CLIENT_ID, sec = env.ADMITAD_CLIENT_SECRET;
  if (!id || !sec) throw new Error('no ADMITAD_CLIENT_ID/SECRET');
  const tr = await fetch('https://api.admitad.com/token/', {
    method: 'POST',
    headers: { Authorization: `Basic ${btoa(`${id}:${sec}`)}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=client_credentials&client_id=${encodeURIComponent(id)}&scope=statistics`
  });
  const tj = (await tr.json().catch(() => ({}))) as { access_token?: string; error?: string };
  if (!tj.access_token) throw new Error(`admitad token ${tr.status} ${tj.error || ''}`);
  const dmy = (d: string) => `${d.slice(8, 10)}.${d.slice(5, 7)}.${d.slice(0, 4)}`;
  const out: Raw[] = [];
  for (let off = 0; off < 20000; off += 500) {
    const r = await fetch(`https://api.admitad.com/statistics/actions/?date_start=${dmy(from)}&date_end=${dmy(to)}&limit=500&offset=${off}`, { headers: { Authorization: `Bearer ${tj.access_token}` } });
    const t = await r.text();
    if (!r.ok) throw new Error(`admitad ${r.status} ${t.slice(0, 150)}`);
    const res = ((JSON.parse(t) as { results?: Record<string, unknown>[] }).results || []);
    for (const a of res) {
      const st = String(a.status || '').toLowerCase();
      out.push({
        id: `adm-${a.action_id}`, tag: [a.subid, a.subid1, a.subid2, a.subid3, a.subid4].map((v) => String(v || '')).join(' '), network: 'admitad',
        partnerName: String(a.advcampaign_name || ''), booked: day(a.action_date), amount: num(a.cart), commission: num(a.payment), currency: String(a.currency || 'USD'),
        status: /declin/.test(st) ? 'cancelled' : /approv|confirm/.test(st) ? 'approved' : 'pending'
      });
    }
    if (res.length < 500) break;
  }
  return out;
}

async function cj(from: string, to: string): Promise<Raw[]> {
  const T = env.CJ_API_TOKEN;
  if (!T) throw new Error('no CJ_API_TOKEN');
  const pid = env.CJ_PUBLISHER_ID || '7817772';
  const out: Raw[] = [];
  for (let s = new Date(`${from}T00:00:00Z`); ymd(s) <= to; s = new Date(s.getTime() + 30 * 864e5)) {
    const e = new Date(Math.min(s.getTime() + 30 * 864e5, new Date(`${to}T00:00:00Z`).getTime() + 864e5));
    const query = `{ publisherCommissions(forPublishers: ["${pid}"], sincePostingDate: "${s.toISOString().slice(0, 19)}Z", beforePostingDate: "${e.toISOString().slice(0, 19)}Z") { records { commissionId shopperId eventDate postingDate actionStatus advertiserName saleAmountPubCurrency pubCommissionAmountPubCurrency } } }`;
    const r = await fetch('https://commissions.api.cj.com/query', { method: 'POST', headers: { Authorization: `Bearer ${T}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ query }) });
    const t = await r.text();
    if (!r.ok) throw new Error(`cj ${r.status} ${t.slice(0, 150)}`);
    const recs = ((JSON.parse(t) as { data?: { publisherCommissions?: { records?: Record<string, unknown>[] } } }).data?.publisherCommissions?.records || []);
    for (const c of recs) {
      const st = String(c.actionStatus || '').toLowerCase();
      const com = num(c.pubCommissionAmountPubCurrency);
      out.push({
        id: `cj-${c.commissionId}`, tag: String(c.shopperId || ''), network: 'cj', partnerName: String(c.advertiserName || ''), booked: day(c.eventDate || c.postingDate),
        amount: num(c.saleAmountPubCurrency), commission: com, currency: env.CJ_CURRENCY || "USD",
        status: com !== null && com < 0 ? 'cancelled' : /closed|locked/.test(st) ? 'approved' : 'pending'
      });
    }
  }
  return out;
}

async function viator(from: string): Promise<Raw[]> {
  const K = env.VIATOR_API_KEY;
  if (!K) throw new Error('no VIATOR_API_KEY');
  const h = { 'exp-api-key': K, Accept: 'application/json;version=2.0', 'Accept-Language': 'en-US' };
  const out: Raw[] = [];
  const since = new Date(Math.max(new Date(`${from}T00:00:00Z`).getTime(), Date.UTC(2025, 8, 1, 6))).toISOString();
  let url = `https://api.viator.com/partner/bookings/modified-since?modified-since=${encodeURIComponent(since)}&count=50`;
  const seen: Record<string, Raw> = {};
  for (let i = 0; i < 200 && url; i++) {
    const r = await fetch(url, { headers: h });
    const t = await r.text();
    if (!r.ok) throw new Error(`viator ${r.status} ${t.slice(0, 150)}`);
    const j = JSON.parse(t) as { bookings?: Record<string, unknown>[]; nextCursor?: string };
    for (const b of j.bookings || []) {
      const ev = String(b.eventType || '').toUpperCase();
      const ref = String(b.transactionRef || b.bookingRef || b.partnerBookingRef || '');
      const price = (b.totalPrice || {}) as Record<string, unknown>;
      const amount = num(typeof b.totalPrice === 'object' ? (price.price as Record<string, unknown> | undefined)?.recommendedRetailPrice ?? price.amount ?? price.value : b.totalPrice);
      // Viator API komisyon vermiyor: ortaklık oranı %8 üzerinden tahmin (panelde "beklemede" görünür, ödeme raporu esas alınır)
      seen[ref] = {
        id: `via-${ref}`, tag: String(b.campaignValue || b.campaign || ''), network: 'viator', partnerName: 'Viator',
        booked: day(b.bookingDate || b.createdAt || b.lastUpdated), amount, commission: amount !== null ? amount * Number(env.VIATOR_RATE || 0.08) : null,
        currency: String(b.currency || price.currency || 'USD'),
        status: /CANCEL|REJECT/.test(ev) ? 'cancelled' : 'pending'
      };
    }
    url = j.nextCursor ? `https://api.viator.com/partner/bookings/modified-since?cursor=${encodeURIComponent(j.nextCursor)}&count=50` : '';
    if (!(j.bookings || []).length) break;
  }
  return Object.values(seen);
}

// Daisycon: OAuth (yetkilendirme kodu + PKCE). İlk bağlantı /api/daisycon-auth ile yapılır; yenileme anahtarı her kullanımda değişir, Supabase ref_secrets'ta saklanır.
async function daisyconToken(): Promise<string> {
  const id = env.DAISYCON_CLIENT_ID, sec = env.DAISYCON_CLIENT_SECRET;
  if (!id || !sec) throw new Error('no DAISYCON_CLIENT_ID/SECRET');
  const row = ((await (await fetch(`${SB}/rest/v1/ref_secrets?key=eq.daisycon_refresh&select=value`, { headers: sbh })).json()) as { value: string }[])[0];
  if (!row?.value) throw new Error('daisycon not connected (open /api/daisycon-auth)');
  const r = await fetch('https://login.daisycon.com/oauth/access-token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: row.value, client_id: id, client_secret: sec, redirect_uri: 'https://www.vizamigo.com/api/daisycon-auth' }).toString()
  });
  const j = (await r.json().catch(() => ({}))) as { access_token?: string; refresh_token?: string; error?: string };
  if (!j.access_token) throw new Error(`daisycon token ${r.status} ${j.error || ''}`);
  if (j.refresh_token) await fetch(`${SB}/rest/v1/ref_secrets?on_conflict=key`, { method: 'POST', headers: { ...sbh, Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify({ key: 'daisycon_refresh', value: j.refresh_token, updated_at: new Date().toISOString() }) });
  return j.access_token;
}
async function daisycon(from: string, to: string): Promise<Raw[]> {
  const tok = await daisyconToken();
  let pid = env.DAISYCON_PUBLISHER_ID || '';
  if (!pid) {
    const pr = await fetch('https://services.daisycon.com/publishers?page=1&per_page=10', { headers: { Authorization: `Bearer ${tok}` } });
    const pt = await pr.text();
    if (!pr.ok) throw new Error(`daisycon publishers ${pr.status} ${pt.slice(0, 150)}`);
    const pl = JSON.parse(pt) as { id?: number }[];
    pid = String(pl?.[0]?.id || '');
    if (!pid) throw new Error(`daisycon no publisher ${pt.slice(0, 150)}`);
  }
  const out: Raw[] = [];
  for (let page = 1; page < 50; page++) {
    const r = await fetch(`https://services.daisycon.com/publishers/${pid}/transactions?start=${from}&end=${to}&page=${page}&per_page=1000`, { headers: { Authorization: `Bearer ${tok}` } });
    const t = await r.text();
    if (!r.ok) throw new Error(`daisycon ${r.status} ${t.slice(0, 150)}`);
    if (!t.trim()) break; // 204: işlem yok
    const list = JSON.parse(t) as Record<string, unknown>[];
    for (const x of list) {
      const parts = ((x.parts as Record<string, unknown>[]) || [x]);
      for (const p of parts) {
        const st = String(p.status || x.status || '').toLowerCase();
        out.push({
          id: `dc-${x.affiliatemarketing_id || x.id || x.transaction_id}-${p.id || ''}`,
          tag: [p.subid, p.subid_2, p.subid_3, x.subid, x.ws, x.extra].map((v) => String(v || '')).join(' '),
          network: 'daisycon', partnerName: String(x.program_name || p.program_name || x.program_id || ''),
          booked: day(x.date || x.date_transaction || p.date), amount: num(p.revenue ?? x.revenue ?? p.amount), commission: num(p.commission ?? x.commission),
          currency: String(p.currency_code || x.currency_code || 'EUR'),
          status: /disapprov|declin/.test(st) ? 'cancelled' : st === 'approved' ? 'approved' : 'pending'
        });
      }
    }
    if (list.length < 1000) break;
  }
  return out;
}

export default async function handler(req: Request): Promise<Response> {
  if (!KEY) return json({ ok: false, error: 'env' }, 500);
  const q = new URL(req.url).searchParams;
  const debug = q.get('debug') === '1';
  const days = Math.min(400, Math.max(1, parseInt(q.get('days') || '120', 10) || 120));
  const to = ymd(new Date());
  const from = ymd(new Date(Date.now() - days * 864e5));
  const only = q.get('net');

  const partners = (await (await fetch(`${SB}/rest/v1/ref_partners?select=ref`, { headers: sbh })).json()) as { ref: string }[];
  const refs = [...new Set(partners.map((p) => p.ref))].sort((a, b) => b.length - a.length);
  // alt kimlik metninde "r-<kod>" ara; kodlarda tire olabileceği için en uzun eşleşen kod
  const findRef = (tag: string): { ref: string; page: string | null } | null => {
    for (const m of tag.toLowerCase().matchAll(/(?:^|[^a-z0-9])r-([a-z0-9][a-z0-9_-]*)/g)) {
      const body = m[1];
      const ref = refs.find((r) => body === r || body.startsWith(`${r}-`));
      if (ref) { const rest = body.slice(ref.length + 1); return { ref, page: rest && rest !== 'home' ? rest : null }; }
    }
    return null;
  };

  const sources: Record<string, () => Promise<Raw[]>> = {
    // Stay22 en fazla 1 yıllık aralık kabul ediyor
    travelpayouts: () => travelpayouts(from), stay22: () => stay22(from > ymd(new Date(Date.now() - 364 * 864e5)) ? from : ymd(new Date(Date.now() - 364 * 864e5)), to), awin: () => awin(from, to), admitad: () => admitad(from, to), cj: () => cj(from, to), viator: () => viator(from), daisycon: () => daisycon(from, to)
  };
  const report: Record<string, unknown> = {};
  const raws: Raw[] = [];
  await Promise.all(Object.entries(sources).filter(([k]) => !only || k === only).map(async ([k, fn]) => {
    try {
      const r = await fn();
      const mine = r.filter((x) => findRef(x.tag));
      raws.push(...mine);
      report[k] = { total: r.length, withRef: mine.length };
    } catch (e) {
      report[k] = { error: String((e as Error).message || e).slice(0, 200) };
    }
  }));
  if (debug || !raws.length) return json({ ok: true, from, to, report, upserted: 0, debug });

  const ids = raws.map((r) => r.id);
  const existing = (await (await fetch(`${SB}/rest/v1/ref_bookings?id=in.(${ids.map((i) => `"${i}"`).join(',')})&select=id,status`, { headers: sbh })).json()) as { id: string; status: string }[];
  const keepPaid = new Set(existing.filter((e) => e.status === 'paid').map((e) => e.id));
  const out: Row[] = [];
  for (const x of raws) {
    const m = findRef(x.tag)!;
    const pk = partnerFromName(x.partnerName);
    const d = x.booked || to;
    const fx = await rates(d);
    out.push({
      id: x.id, ref: m.ref, network: x.network, partner: pk !== 'unknown' ? pk : x.partnerName || x.network,
      category: pk !== 'unknown' ? partnerCat(pk) : x.network === 'stay22' ? 'hotel' : 'extra', page: m.page, booked_at: x.booked || null,
      amount_eur: await toEur(x.amount, x.currency, d), commission_eur: await toEur(x.commission, x.currency, d), fx_try: fx.TRY || null,
      status: keepPaid.has(x.id) ? 'paid' : x.status, updated_at: new Date().toISOString()
    });
  }
  const w = await fetch(`${SB}/rest/v1/ref_bookings?on_conflict=id`, { method: 'POST', headers: { ...sbh, Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify(out) });
  if (!w.ok) return json({ ok: false, report, error: `supabase ${w.status} ${(await w.text()).slice(0, 200)}` }, 500);
  return json({ ok: true, from, to, report, upserted: out.length });
}
