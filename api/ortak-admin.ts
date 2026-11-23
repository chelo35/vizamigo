export const config = { runtime: 'edge' };

/**
 * Fenomen ortaklık YÖNETİM paneli (yalnızca Çelebi):  /ortak/yonetim
 *   GET  /ortak/yonetim                → "giriş linkini e-postama gönder" sayfası (link yalnızca REPORT_TO'ya gider)
 *   GET  /ortak/yonetim?k=<anahtar>    → bütün fenomenler: ziyaret, tıklama, satışlar (ağ/firma/sayfa), pay, ödeme listesi
 *   POST /ortak/yonetim  a=pay&ref=…&k=…  → o fenomenin "onaylandı" satırlarını "ödendi" yapar (paid_at = şimdi)
 *   GET  /api/ortak-admin?cron=payout  → (her ayın 10'u, vercel.json cron) bu ay ödenecekler listesini REPORT_TO'ya e-postalar
 * Anahtar Supabase ref_secrets (key=admin_token) tablosunda; yoksa ilk istekte üretilir.
 * Kurallar: pay = komisyon × ref_partners.share (0,5); ödeme TL, her ayın 15'ine kadar, en az 1.000 TL (altı sonraki aya devreder).
 */
import { partnerName, partnerCat, CATS, PARTNERS } from './_catalog';

const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env || {};
const SB = env.SUPABASE_URL || 'https://utlnjyquflfcvjhmgopq.supabase.co';
const KEY = env.SUPABASE_SERVICE_ROLE_KEY || '';
const sbh = { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' };
const FROM = env.ALERTS_FROM || env.REPORT_FROM || 'Vizamigo <bildirim@vizamigo.com>';
const TO = env.REPORT_TO || '';
const BASE = 'https://www.vizamigo.com';
const MIN_TL = 1000;

type Partner = { ref: string; name: string; email: string | null; share: number | null; active: boolean; token: string; lang: string | null };
type Bk = { id: string; ref: string; network: string; partner: string; category: string | null; page: string | null; booked_at: string | null; amount_eur: number | null; commission_eur: number | null; fx_try: number | null; status: string; paid_at: string | null };
type Ev = { ref: string; kind: string };

async function sb<T>(path: string, init?: RequestInit): Promise<T> {
  const r = await fetch(`${SB}/rest/v1/${path}`, { ...init, headers: { ...sbh, ...(init?.headers || {}) } });
  if (!r.ok) throw new Error(`supabase ${r.status} ${(await r.text()).slice(0, 120)}`);
  const t = await r.text();
  return (t ? JSON.parse(t) : null) as T;
}
const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const tl = (n: number) => `${n.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} TL`;
const tryOf = (eur: number | null, fx: number | null) => (eur || 0) * (fx || 0);
const ST: Record<string, string> = { pending: 'Beklemede', approved: 'Onaylandı', paid: 'Ödendi', cancelled: 'İptal' };

async function adminToken(): Promise<string> {
  const row = (await sb<{ value: string }[]>('ref_secrets?key=eq.admin_token&select=value'))[0];
  if (row?.value) return row.value;
  const b = new Uint8Array(20);
  crypto.getRandomValues(b);
  const v = [...b].map((x) => x.toString(16).padStart(2, '0')).join('');
  await sb('ref_secrets?on_conflict=key', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify({ key: 'admin_token', value: v, updated_at: new Date().toISOString() }) });
  return v;
}
async function mail(subject: string, html: string) {
  if (!TO || !env.RESEND_API_KEY) return;
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to: TO.split(',').map((s) => s.trim()), subject, html })
  });
}
function page(title: string, body: string, status = 200): Response {
  const doc = `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${esc(title)}</title>
<style>:root{--bg:#f6f7f9;--card:#fff;--tx:#14181f;--mu:#5b6472;--ln:#e3e6eb;--ac:#0b6bcb;--ok:#137a3a;--wa:#a15c00;--bad:#b42318}
@media (prefers-color-scheme:dark){:root{--bg:#0f1216;--card:#171b21;--tx:#e8ebf0;--mu:#9aa3b2;--ln:#2a3038;--ac:#5aa9ff;--ok:#4cc27a;--wa:#f0a63a;--bad:#ff6b5e}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--tx);font:15px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
main{max-width:1180px;margin:0 auto;padding:20px 16px 60px}h1{font-size:24px;margin:0 0 4px}h2{font-size:18px;margin:28px 0 10px}
.mu{color:var(--mu)}.card{background:var(--card);border:1px solid var(--ln);border-radius:12px;padding:14px 16px;margin:10px 0}
.kp{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px}.kp div{background:var(--card);border:1px solid var(--ln);border-radius:12px;padding:12px}.kp b{display:block;font-size:22px}
.tw{overflow-x:auto;background:var(--card);border:1px solid var(--ln);border-radius:12px}table{border-collapse:collapse;width:100%;font-size:14px}th,td{padding:8px 10px;border-bottom:1px solid var(--ln);text-align:left;white-space:nowrap}th{color:var(--mu);font-weight:600}td.n,th.n{text-align:right}
a{color:var(--ac)}.b{display:inline-block;padding:6px 12px;border-radius:8px;border:1px solid var(--ln);background:var(--card);color:var(--tx);text-decoration:none;cursor:pointer;font:inherit}.b.on{background:var(--ac);color:#fff;border-color:var(--ac)}
.ok{color:var(--ok)}.wa{color:var(--wa)}.bad{color:var(--bad)}form{display:inline}</style></head><body><main>${body}</main></body></html>`;
  return new Response(doc, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow', 'Referrer-Policy': 'no-referrer' } });
}

/** Ödenecekler: onaylanmış, henüz ödenmemiş pay (TL) */
function payouts(parts: Partner[], bks: Bk[]) {
  const m = new Map<string, { p: Partner; approved: number; pending: number; n: number }>();
  for (const b of bks) {
    const p = parts.find((x) => x.ref === b.ref);
    if (!p) continue;
    const s = tryOf(b.commission_eur, b.fx_try) * (p.share ?? 0.5);
    const o = m.get(b.ref) || { p, approved: 0, pending: 0, n: 0 };
    if (b.status === 'approved') { o.approved += s; o.n++; }
    if (b.status === 'pending') o.pending += s;
    m.set(b.ref, o);
  }
  return [...m.values()].filter((x) => x.approved > 0 || x.pending > 0).sort((a, b) => b.approved - a.approved);
}

export default async function handler(req: Request): Promise<Response> {
  if (!KEY) return new Response('env', { status: 500 });
  const url = new URL(req.url);
  const q = url.searchParams;

  // Aylık ödeme listesi (cron, her ayın 10'u) — yalnızca REPORT_TO'ya gider
  if (q.get('cron') === 'payout') {
    const tok = await adminToken();
    const parts = await sb<Partner[]>('ref_partners?select=ref,name,email,share,active,token,lang&limit=5000');
    const bks = await sb<Bk[]>('ref_bookings?status=in.(approved,pending)&select=ref,commission_eur,fx_try,status&limit=50000');
    const list = payouts(parts, bks as Bk[]);
    const pay = list.filter((x) => x.approved >= MIN_TL), carry = list.filter((x) => x.approved < MIN_TL);
    const rows = (a: typeof list) => a.map((x) => `<tr><td>${esc(x.p.name)} (${esc(x.p.ref)})</td><td>${esc(x.p.email || '')}</td><td style="text-align:right">${tl(x.approved)}</td><td style="text-align:right">${tl(x.pending)}</td></tr>`).join('');
    const html = `<p>Merhaba Çelebi,</p><p>Bu ay <b>15'ine kadar</b> ödenecek fenomen payları (onaylanmış satışlar, %50 pay):</p>
${pay.length ? `<table border="1" cellpadding="6" cellspacing="0"><tr><th>Fenomen</th><th>E-posta</th><th>Ödenecek</th><th>Beklemede</th></tr>${rows(pay)}</table>` : '<p><b>Bu ay 1.000 TL eşiğini geçen ödeme yok.</b></p>'}
${carry.length ? `<p>1.000 TL altında kalanlar (sonraki aya devreder):</p><table border="1" cellpadding="6" cellspacing="0"><tr><th>Fenomen</th><th>E-posta</th><th>Onaylı</th><th>Beklemede</th></tr>${rows(carry)}</table>` : ''}
<p>Ödemeyi IBAN'a yaptıktan sonra yönetim panelinde ilgili fenomenin yanındaki <b>"Ödendi"</b> düğmesine bas: <a href="${BASE}/ortak/yonetim?k=${tok}">Yönetim paneli</a></p>`;
    await mail(pay.length ? `Fenomen ödemeleri: ${pay.length} kişi, toplam ${tl(pay.reduce((s, x) => s + x.approved, 0))} (15'ine kadar)` : 'Fenomen ödemeleri: bu ay ödeme yok', html);
    return new Response(JSON.stringify({ ok: true, pay: pay.length, carry: carry.length }), { headers: { 'Content-Type': 'application/json' } });
  }

  // Giriş linki isteme
  if (req.method === 'POST' && !q.get('k')) {
    const f = await req.formData().catch(() => null);
    if (f?.get('a') === 'send') {
      const tok = await adminToken();
      await mail('Vizamigo fenomen yönetim paneli', `<p>Yönetim paneli linkin (kimseyle paylaşma):</p><p><a href="${BASE}/ortak/yonetim?k=${tok}">${BASE}/ortak/yonetim?k=…</a></p>`);
      return page('Gönderildi', `<h1>Link gönderildi</h1><p class="mu">Yönetim paneli linki Vizamigo bildirim adresine e-postayla gitti.</p>`);
    }
  }
  const k = q.get('k') || '';
  const tok = await adminToken();
  if (!k || k !== tok) {
    return page('Fenomen yönetimi', `<h1>Fenomen yönetim paneli</h1><p class="mu">Bu sayfa yalnızca Vizamigo yöneticisi içindir. Link, kayıtlı yönetici e-postasına gönderilir.</p>
<form method="post" action="/ortak/yonetim"><input type="hidden" name="a" value="send"><button class="b on">Giriş linkini e-postama gönder</button></form>`, k ? 403 : 200);
  }

  // Ödendi işaretle
  if (req.method === 'POST') {
    const f = await req.formData();
    const ref = String(f.get('ref') || '');
    if (f.get('a') === 'pay' && /^[a-z0-9][a-z0-9_-]{1,29}$/.test(ref)) {
      await sb(`ref_bookings?ref=eq.${ref}&status=eq.approved`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ status: 'paid', paid_at: new Date().toISOString() }) });
    }
    return new Response(null, { status: 303, headers: { Location: `/ortak/yonetim?k=${tok}&ok=${encodeURIComponent(ref)}` } });
  }

  const d = q.get('d') || '30';
  const days = d === 'all' ? 3650 : Math.min(3650, Math.max(1, parseInt(d, 10) || 30));
  const since = new Date(Date.now() - days * 864e5).toISOString().slice(0, 10);
  const [parts, bks, evs] = await Promise.all([
    sb<Partner[]>('ref_partners?select=ref,name,email,share,active,token,lang&limit=5000'),
    sb<Bk[]>(`ref_bookings?select=id,ref,network,partner,category,page,booked_at,amount_eur,commission_eur,fx_try,status,paid_at&order=booked_at.desc&limit=50000`),
    sb<Ev[]>(`ref_events?ts=gte.${since}&select=ref,kind&limit=200000`)
  ]);
  const inRange = bks.filter((b) => (b.booked_at || '') >= since);
  const live = inRange.filter((b) => b.status !== 'cancelled');
  const shareOf = (b: Bk) => tryOf(b.commission_eur, b.fx_try) * (parts.find((p) => p.ref === b.ref)?.share ?? 0.5);

  // fenomen bazında
  const per = new Map<string, { v: number; o: number; n: number; sales: number; com: number; share: number }>();
  const get = (r: string) => per.get(r) || { v: 0, o: 0, n: 0, sales: 0, com: 0, share: 0 };
  for (const e of evs) { const x = get(e.ref); if (e.kind === 'visit') x.v++; else x.o++; per.set(e.ref, x); }
  for (const b of live) { const x = get(b.ref); x.n++; x.sales += tryOf(b.amount_eur, b.fx_try); x.com += tryOf(b.commission_eur, b.fx_try); x.share += shareOf(b); per.set(b.ref, x); }
  const active = [...per.entries()].sort((a, b) => b[1].com - a[1].com || b[1].o - a[1].o || b[1].v - a[1].v);
  const tot = active.reduce((s, [, x]) => ({ v: s.v + x.v, o: s.o + x.o, n: s.n + x.n, sales: s.sales + x.sales, com: s.com + x.com, share: s.share + x.share }), { v: 0, o: 0, n: 0, sales: 0, com: 0, share: 0 });

  // ağ ve firma bazında
  const by = (key: (b: Bk) => string) => {
    const m = new Map<string, { n: number; com: number }>();
    for (const b of live) { const k2 = key(b); const x = m.get(k2) || { n: 0, com: 0 }; x.n++; x.com += tryOf(b.commission_eur, b.fx_try); m.set(k2, x); }
    return [...m.entries()].sort((a, b) => b[1].com - a[1].com);
  };
  const pname = (r: string) => parts.find((p) => p.ref === r)?.name || r;
  const pay = payouts(parts, bks);
  const okRef = q.get('ok');

  const dl = (v: string, label: string) => `<a class="b${d === v ? ' on' : ''}" href="?k=${tok}&d=${v}">${label}</a>`;
  const body = `<h1>Fenomen yönetim paneli</h1><p class="mu">${parts.filter((p) => p.active).length} aktif fenomen · tutarlar satış tarihindeki kurla TL · pay = komisyon × %50</p>
${okRef ? `<div class="card ok">${esc(pname(okRef))} için onaylanmış satırlar "Ödendi" olarak işaretlendi.</div>` : ''}
<p>${dl('7', '7 gün')} ${dl('30', '30 gün')} ${dl('90', '90 gün')} ${dl('365', '1 yıl')} ${dl('all', 'Tümü')}</p>
<div class="kp"><div><span class="mu">Fenomen linkinden ziyaret</span><b>${tot.v.toLocaleString('tr-TR')}</b></div><div><span class="mu">Ortak firmaya tıklama</span><b>${tot.o.toLocaleString('tr-TR')}</b></div>
<div><span class="mu">Satış</span><b>${tot.n}</b></div><div><span class="mu">Satış tutarı</span><b>${tl(tot.sales)}</b></div><div><span class="mu">Bizim komisyon</span><b>${tl(tot.com)}</b></div><div><span class="mu">Fenomen payı</span><b>${tl(tot.share)}</b></div></div>

<h2>Ödenecekler (bütün zamanlar)</h2>
${pay.length ? `<div class="tw"><table><thead><tr><th>Fenomen</th><th>E-posta</th><th class="n">Onaylı, ödenmemiş</th><th class="n">Beklemede</th><th></th></tr></thead><tbody>${pay.map((x) => `<tr><td>${esc(x.p.name)} <span class="mu">(${esc(x.p.ref)})</span></td><td>${esc(x.p.email || '')}</td><td class="n ${x.approved >= MIN_TL ? 'ok' : 'mu'}">${tl(x.approved)}</td><td class="n wa">${tl(x.pending)}</td><td>${x.approved > 0 ? `<form method="post" action="/ortak/yonetim?k=${tok}" onsubmit="return confirm('${esc(x.p.name)}: ${tl(x.approved)} IBAN\\'a ödendi olarak işaretlensin mi?')"><input type="hidden" name="a" value="pay"><input type="hidden" name="ref" value="${esc(x.p.ref)}"><button class="b">Ödendi</button></form>` : ''}</td></tr>`).join('')}</tbody></table></div>
<p class="mu">Kural: her ayın 15'ine kadar TL olarak IBAN'a; 1.000 TL altı sonraki aya devreder. Yeşil olanlar bu ay ödenecek. Her ayın 10'unda liste e-postayla da gelir.</p>` : '<div class="card mu">Şu an ödenecek ya da bekleyen pay yok.</div>'}

<h2>Fenomenler</h2>
${active.length ? `<div class="tw"><table><thead><tr><th>Fenomen</th><th class="n">Ziyaret</th><th class="n">Tıklama</th><th class="n">Satış</th><th class="n">Satış tutarı</th><th class="n">Komisyon</th><th class="n">Pay</th><th>Panel</th></tr></thead><tbody>${active.map(([r, x]) => {
    const p = parts.find((pp) => pp.ref === r);
    return `<tr><td>${esc(pname(r))} <span class="mu">(${esc(r)})</span></td><td class="n">${x.v}</td><td class="n">${x.o}</td><td class="n">${x.n}</td><td class="n">${tl(x.sales)}</td><td class="n">${tl(x.com)}</td><td class="n">${tl(x.share)}</td><td>${p ? `<a href="/ortak/${p.token}" target="_blank" rel="noopener">aç</a>` : ''}</td></tr>`;
  }).join('')}</tbody></table></div>` : '<div class="card mu">Bu dönemde hiçbir fenomen linkinden hareket yok.</div>'}

<h2>Ağlara göre</h2>
${(() => { const a = by((b) => b.network); return a.length ? `<div class="tw"><table><thead><tr><th>Ağ</th><th class="n">Satış</th><th class="n">Komisyon</th></tr></thead><tbody>${a.map(([n, x]) => `<tr><td>${esc(n)}</td><td class="n">${x.n}</td><td class="n">${tl(x.com)}</td></tr>`).join('')}</tbody></table></div>` : '<div class="card mu">Satış yok.</div>'; })()}

<h2>Firmalara göre</h2>
${(() => { const a = by((b) => b.partner); return a.length ? `<div class="tw"><table><thead><tr><th>Firma</th><th>Hizmet</th><th class="n">Satış</th><th class="n">Komisyon</th></tr></thead><tbody>${a.map(([n, x]) => `<tr><td>${esc(PARTNERS[n] ? partnerName(n) : n)}</td><td>${esc(CATS[partnerCat(n) as keyof typeof CATS]?.tr || '')}</td><td class="n">${x.n}</td><td class="n">${tl(x.com)}</td></tr>`).join('')}</tbody></table></div>` : '<div class="card mu">Satış yok.</div>'; })()}

<h2>Bütün satışlar (dönem)</h2>
${inRange.length ? `<div class="tw"><table><thead><tr><th>Tarih</th><th>Fenomen</th><th>Ağ</th><th>Firma</th><th>Sayfa</th><th class="n">Tutar</th><th class="n">Komisyon</th><th class="n">Pay</th><th>Durum</th></tr></thead><tbody>${inRange.slice(0, 1000).map((b) => `<tr><td>${esc((b.booked_at || '').slice(0, 10).split('-').reverse().join('.'))}</td><td>${esc(pname(b.ref))}</td><td>${esc(b.network)}</td><td>${esc(PARTNERS[b.partner] ? partnerName(b.partner) : b.partner)}</td><td class="mu">${b.page ? '/' + esc(b.page) : ''}</td><td class="n">${tl(tryOf(b.amount_eur, b.fx_try))}</td><td class="n">${tl(tryOf(b.commission_eur, b.fx_try))}</td><td class="n">${tl(shareOf(b))}</td><td class="${b.status === 'cancelled' ? 'bad' : b.status === 'pending' ? 'wa' : 'ok'}">${ST[b.status] || esc(b.status)}${b.paid_at ? ` <span class="mu">${esc(b.paid_at.slice(0, 10).split('-').reverse().join('.'))}</span>` : ''}</td></tr>`).join('')}</tbody></table></div>` : '<div class="card mu">Bu dönemde fenomen linkinden satış yok.</div>'}
<p class="mu" style="margin-top:24px">Satışlar her gece 04:23'te ağlardan otomatik çekilir (Travelpayouts, Stay22, Admitad, CJ, Viator, Daisycon; Awin anahtarı eklenince Awin). 12Go ve TourRadar'ın API'si yok; ağ yanıt verene kadar bu iki firmanın satışları kendi panellerinden kontrol edilmeli.</p>`;
  return page('Fenomen yönetimi', body);
}
