export const config = { runtime: 'edge' };

import { CATS, CAT_ORDER, LANGS, PARTNERS, partnerCat, partnerKey, partnerName, type Lang } from './_catalog';
import { LANG_NAMES, LOCALE, TX } from './_ortak_i18n';

/**
 * Fenomen (iş ortağı) paneli.
 *   GET  /ortak                → giriş sayfası (e-posta ile panel bağlantısı istenir)
 *   POST /ortak                → e-posta kayıtlıysa panel bağlantısı Resend ile gönderilir (yanıt her zaman aynı)
 *   GET  /ortak/<anahtar>      → panel; ?d=7|30|90|all, ?from=YYYY-MM-DD&to=YYYY-MM-DD, ?day=YYYY-MM-DD, ?lang=
 * Supabase (yalnız service role; RLS açık, politika yok):
 *   ref_partners (ref, name, token, share, lang, email, active)
 *   ref_events   (ref, kind visit|out, target, path, lang, country, ts)   ← /api/ref-hit
 *   ref_bookings (id, ref, network, partner, category, page, booked_at, amount_eur, commission_eur, fx_try, status, paid_at)
 */
const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env || {};
const SB = env.SUPABASE_URL || 'https://utlnjyquflfcvjhmgopq.supabase.co';
const KEY = env.SUPABASE_SERVICE_ROLE_KEY || '';
const FROM = env.ALERTS_FROM || env.REPORT_FROM || 'Vizamigo <bildirim@vizamigo.com>';
const SITE = 'https://www.vizamigo.com';
const TZ = 3 * 36e5; // Türkiye saati (UTC+3, yaz saati yok)

type Partner = { ref: string; name: string; share: number; lang: string | null; token?: string };
type Ev = { kind: string; ts: string; target: string | null; path: string | null };
type Bk = {
  id: string; network: string; partner: string | null; category: string | null; page: string | null; booked_at: string | null;
  amount_eur: number | null; commission_eur: number | null; fx_try: number | null; status: string;
};

async function sb<T>(path: string): Promise<T> {
  const r = await fetch(`${SB}/rest/v1/${path}`, { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } });
  if (!r.ok) throw new Error(`supabase ${r.status}`);
  return (await r.json()) as T;
}
const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
const isLang = (x: unknown): x is Lang => LANGS.includes(x as Lang);
const dayOf = (iso: string) => new Date(new Date(iso).getTime() + TZ).toISOString().slice(0, 10);
const okDay = (s: string | null) => (s && /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : '');
const addDays = (d: string, n: number) => new Date(new Date(`${d}T00:00:00Z`).getTime() + n * 864e5).toISOString().slice(0, 10);

const CSS = `:root{--bg:#f6f7f9;--card:#fff;--ink:#0f1f24;--mut:#5b6b70;--line:#e3e8ea;--brand:#07626F;--brand2:#0a8a9b;--acc:#f28c28;--ok:#1a8a4a;--warn:#b7791f;--bad:#b42318}
@media (prefers-color-scheme:dark){:root{--bg:#0d1517;--card:#142023;--ink:#e8f0f1;--mut:#9fb1b5;--line:#22343a;--brand:#3fb6c4;--brand2:#7fd3dc}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
a{color:var(--brand)}.w{max-width:1000px;margin:0 auto;padding:20px 16px 48px}
header{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:16px}
.brand{font-weight:800;font-size:20px;color:var(--brand);text-decoration:none}.who{color:var(--mut);font-size:14px}
h1{font-size:22px;margin:0 0 8px}h2{font-size:16px;margin:0 0 10px}.hint{color:var(--mut);font-size:13px;margin:-4px 0 8px}
.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px;margin-bottom:14px}
.row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}code{background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:6px 10px;word-break:break-all}
button,input,select{font:inherit;border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:8px;padding:6px 10px}button{cursor:pointer}
.btn{background:var(--brand);border-color:var(--brand);color:#fff;font-weight:600}
.tabs a{padding:6px 12px;border-radius:999px;border:1px solid var(--line);text-decoration:none;color:var(--ink);font-size:14px}.tabs a.on{background:var(--brand);border-color:var(--brand);color:#fff}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-bottom:14px}.kpi{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px}
.kpi .l{color:var(--mut);font-size:13px}.kpi .v{font-size:26px;font-weight:800;margin-top:2px}.kpi .s{color:var(--mut);font-size:12.5px;margin-top:4px}.kpi.hi{border-color:var(--brand);box-shadow:0 0 0 1px var(--brand) inset}
.chart{width:100%;height:auto;display:block}.chart a:hover rect.b{opacity:.7}.leg{display:flex;gap:14px;font-size:13px;color:var(--mut);margin-top:6px}.dot{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:5px;vertical-align:-1px}
table{width:100%;border-collapse:collapse;font-size:14px}th,td{text-align:left;padding:8px 6px;border-bottom:1px solid var(--line);white-space:nowrap}th{color:var(--mut);font-weight:600;font-size:13px}td.n,th.n{text-align:right}
tr.z td{color:var(--mut)}tr.z b{font-weight:500}.tw{overflow-x:auto}.pill{display:inline-block;padding:2px 8px;border-radius:999px;font-size:12.5px;font-weight:600}
.p-pending{background:#fff4e0;color:var(--warn)}.p-approved{background:#e3f5ea;color:var(--ok)}.p-paid{background:#dff1f3;color:#07626F}.p-cancelled{background:#fde8e6;color:var(--bad)}
.grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:14px}.grid2 .card{margin:0}
ul{margin:0;padding-left:18px;color:var(--mut)}li{margin:4px 0}.foot{color:var(--mut);font-size:12.5px;text-align:center;margin-top:18px}.empty{color:var(--mut)}.small{font-size:12.5px;color:var(--mut)}
td .small{white-space:normal}`;

function html(lang: Lang, title: string, body: string, status = 200): Response {
  const doc = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${esc(title)} · Vizamigo</title><link rel="icon" href="/favicon.ico"><style>${CSS}</style></head><body><div class="w">${body}</div></body></html>`;
  return new Response(doc, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow', 'Referrer-Policy': 'no-referrer' } });
}

function langPicker(lang: Lang, qs: (l: Lang) => string): string {
  return `<label class="row small">${TX[lang].lang}<select onchange="location.href=this.value">${LANGS.map((x) => `<option value="${esc(qs(x))}"${x === lang ? ' selected' : ''}>${LANG_NAMES[x]}</option>`).join('')}</select></label>`;
}

function loginPage(lang: Lang, msg = '', status = 200): Response {
  const t = TX[lang];
  const body = `<header><a class="brand" href="${SITE}/">Vizamigo</a>${langPicker(lang, (x) => `/ortak?lang=${x}`)}</header>
<div class="card" style="max-width:520px;margin:30px auto"><h1>${t.loginTitle}</h1>${msg ? `<p>${esc(msg)}</p>` : ''}<p class="small">${t.loginText}</p>
<form method="post" action="/ortak" class="row" style="margin-top:10px"><input type="hidden" name="lang" value="${lang}"><input type="email" name="email" required placeholder="${esc(t.email)}" style="flex:1;min-width:220px" autocomplete="email"><button class="btn">${t.send}</button></form></div>`;
  return html(lang, t.loginTitle, body, status);
}

async function sendLinks(email: string, lang: Lang): Promise<void> {
  const e = email.trim().toLowerCase();
  if (!/^[^\s@,()]+@[^\s@,()]+\.[^\s@,()]+$/.test(e) || e.length > 200 || !env.RESEND_API_KEY) return;
  const rows = await sb<Partner[]>(`ref_partners?email=eq.${encodeURIComponent(e)}&active=eq.true&select=ref,name,lang,token,share&limit=5`);
  for (const p of rows) {
    const pl: Lang = isLang(p.lang) ? p.lang : lang;
    const t = TX[pl];
    const link = `${SITE}/ortak/${p.token}`;
    const body = `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:520px;margin:auto;padding:24px;color:#13222b"><div style="font-weight:800;color:#0d6e78;font-size:20px;margin-bottom:16px">Vizamigo</div><p><b>${esc(p.name)}</b></p><p>${esc(t.mailBody)}</p><p><a href="${link}" style="display:inline-block;background:#0d8a8f;color:#fff;text-decoration:none;padding:12px 20px;border-radius:12px;font-weight:700">${esc(t.mailBtn)}</a></p><p style="font-size:12px;color:#5b6b70">${link}</p></div>`;
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to: e, subject: t.mailSubj, html: body })
    }).catch(() => {});
  }
}

function money(v: number, lang: Lang, cur: 'TRY' | 'EUR'): string {
  return new Intl.NumberFormat(LOCALE[lang], { style: 'currency', currency: cur, maximumFractionDigits: Math.abs(v) >= 100 ? 0 : 2 }).format(v || 0);
}
const fmtDay = (d: string, lang: Lang) => new Intl.DateTimeFormat(LOCALE[lang], { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${d}T00:00:00Z`));

function chart(days: string[], v: Record<string, number>, o: Record<string, number>, link: (d: string) => string, lang: Lang): string {
  const W = 900, H = 210, P = 28, n = days.length;
  const max = Math.max(1, ...days.map((d) => Math.max(v[d] || 0, o[d] || 0)));
  const bw = (W - P) / n;
  const y = (x: number) => H - 24 - (x / max) * (H - 44);
  let s = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img">`;
  for (const t of [0, 0.5, 1]) s += `<line x1="${P}" x2="${W}" y1="${y(max * t)}" y2="${y(max * t)}" stroke="var(--line)"/><text x="0" y="${y(max * t) + 4}" font-size="11" fill="var(--mut)">${Math.round(max * t)}</text>`;
  const step = Math.max(1, Math.ceil(n / 8));
  days.forEach((d, i) => {
    const x = P + i * bw, w = Math.max(1, bw * 0.38), a = v[d] || 0, b = o[d] || 0;
    s += `<a href="${esc(link(d))}"><title>${fmtDay(d, lang)} · ${a} / ${b}</title><rect x="${x}" y="0" width="${bw}" height="${H - 20}" fill="transparent"/>`;
    if (a) s += `<rect class="b" x="${x + bw * 0.1}" y="${y(a)}" width="${w}" height="${H - 24 - y(a)}" rx="2" fill="var(--brand)"/>`;
    if (b) s += `<rect class="b" x="${x + bw * 0.1 + w}" y="${y(b)}" width="${w}" height="${H - 24 - y(b)}" rx="2" fill="var(--acc)"/>`;
    s += '</a>';
    if (i % step === 0) s += `<text x="${x}" y="${H - 6}" font-size="11" fill="var(--mut)">${d.slice(8)}.${d.slice(5, 7)}</text>`;
  });
  return s + '</svg>';
}

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const q = url.searchParams;
  const langQ = q.get('lang');
  const qLang: Lang = isLang(langQ) ? langQ : 'tr';
  const token = (q.get('k') || '').trim();

  // ---- giriş ----
  if (req.method === 'POST') {
    const f = await req.formData().catch(() => null);
    const fl = f?.get('lang');
    const lang: Lang = isLang(fl) ? fl : 'tr';
    if (KEY) await sendLinks(String(f?.get('email') || ''), lang).catch(() => {});
    return loginPage(lang, TX[lang].sent);
  }
  if (!token) return loginPage(qLang);
  if (!/^[a-f0-9]{24,64}$/.test(token) || !KEY) return loginPage(qLang, TX[qLang].bad, 404);

  let p: Partner | undefined;
  try {
    p = (await sb<Partner[]>(`ref_partners?token=eq.${token}&active=eq.true&select=ref,name,share,lang&limit=1`))[0];
  } catch {
    return html(qLang, TX[qLang].title, `<div class="card">${TX[qLang].err}</div>`, 503);
  }
  if (!p) return loginPage(qLang, TX[qLang].bad, 404);
  const lang: Lang = isLang(langQ) ? langQ : isLang(p.lang) ? p.lang : 'tr';
  const t = TX[lang];
  const cur: 'TRY' | 'EUR' = lang === 'tr' ? 'TRY' : 'EUR';
  const share = Number(p.share) || 0.5;

  // ---- dönem ----
  const today = dayOf(new Date().toISOString());
  const day = okDay(q.get('day'));
  let from = okDay(q.get('from')), to = okDay(q.get('to'));
  const d = q.get('d') || (from || to ? '' : '30');
  if (day) { from = day; to = day; }
  else if (!from && !to) {
    const n = d === 'all' ? 730 : Math.min(730, Math.max(1, parseInt(d, 10) || 30));
    from = addDays(today, -(n - 1));
    to = today;
  }
  if (!from) from = addDays(to || today, -29);
  if (!to) to = today;
  if (from > to) [from, to] = [to, from];
  if (to > today) to = today;
  const sinceIso = new Date(new Date(`${from}T00:00:00Z`).getTime() - TZ).toISOString();
  const untilIso = new Date(new Date(`${to}T00:00:00Z`).getTime() - TZ + 864e5).toISOString();

  let evs: Ev[] = [], bks: Bk[] = [];
  try {
    [evs, bks] = await Promise.all([
      sb<Ev[]>(`ref_events?ref=eq.${p.ref}&ts=gte.${sinceIso}&ts=lt.${untilIso}&select=kind,ts,target,path&order=ts.asc&limit=50000`),
      sb<Bk[]>(`ref_bookings?ref=eq.${p.ref}&booked_at=gte.${from}&booked_at=lte.${to}&select=id,network,partner,category,page,booked_at,amount_eur,commission_eur,fx_try,status&order=booked_at.desc&limit=5000`)
    ]);
  } catch {
    return html(lang, t.title, `<div class="card">${t.err}</div>`, 503);
  }
  if (d === 'all' && !day && !q.get('from')) {
    const first = [evs[0]?.ts ? dayOf(evs[0].ts) : '', bks[bks.length - 1]?.booked_at || ''].filter(Boolean).sort()[0];
    from = first && first < addDays(to, -29) ? first : addDays(to, -29);
  }

  // ---- hesaplar ----
  const conv = (eur: number | null, fx: number | null) => (cur === 'TRY' ? (eur || 0) * (fx || 0) : eur || 0);
  const bkPartner = (b: Bk) => { const k = partnerKey(b.partner); return k === 'unknown' ? (b.partner || '—') : k; };
  const bkCat = (b: Bk) => (b.category && CATS[b.category] ? b.category : partnerCat(partnerKey(b.partner)));
  const live = bks.filter((b) => b.status !== 'cancelled');
  type Agg = { clicks: number; n: number; vol: number; sh: number };
  const blank = (): Agg => ({ clicks: 0, n: 0, vol: 0, sh: 0 });
  const byCat: Record<string, Agg> = {}, byP: Record<string, Agg> = {}, byDay: Record<string, Agg & { v: number }> = {};
  const land: Record<string, number> = {}, outPage: Record<string, number> = {};
  const v: Record<string, number> = {}, o: Record<string, number> = {};
  let nv = 0, no = 0;
  for (const e of evs) {
    const dd = dayOf(e.ts);
    byDay[dd] ||= { ...blank(), v: 0 };
    if (e.kind === 'visit') { v[dd] = (v[dd] || 0) + 1; nv++; byDay[dd].v++; if (e.path) land[e.path] = (land[e.path] || 0) + 1; continue; }
    o[dd] = (o[dd] || 0) + 1; no++; byDay[dd].clicks++;
    const k = partnerKey(e.target), c = partnerCat(k);
    (byCat[c] ||= blank()).clicks++;
    (byP[k] ||= blank()).clicks++;
    if (e.path) outPage[e.path] = (outPage[e.path] || 0) + 1;
  }
  let volume = 0;
  const sh: Record<string, number> = { pending: 0, approved: 0, paid: 0 };
  for (const b of live) {
    const val = conv(b.amount_eur, b.fx_try), s = conv(b.commission_eur, b.fx_try) * share;
    volume += val; sh[b.status] = (sh[b.status] || 0) + s;
    for (const a of [(byCat[bkCat(b)] ||= blank()), (byP[bkPartner(b)] ||= blank())]) { a.n++; a.vol += val; a.sh += s; }
    if (b.booked_at) { const x = (byDay[b.booked_at] ||= { ...blank(), v: 0 }); x.n++; x.vol += val; x.sh += s; }
  }
  const total = sh.pending + sh.approved + sh.paid;

  // ---- bağlantı yardımcıları ----
  const base = `/ortak/${token}`;
  const lq = langQ ? `&lang=${lang}` : '';
  const dayLink = (x: string) => `${base}?day=${x}${lq}`;
  const tab = (k: string, label: string) => `<a class="${!q.get('from') && d === k ? 'on' : ''}" href="${base}?d=${k}${lq}">${label}</a>`;
  const curQs = (x: Lang) => { const u = new URLSearchParams(q); u.delete('k'); u.set('lang', x); return `${base}?${u.toString()}`; };
  const link = `${SITE}/${lang === 'tr' ? '' : `${lang}/`}?ref=${p.ref}`;
  const st = (s: string) => `<span class="pill p-${esc(s)}">${esc((t as unknown as Record<string, string>)[s] || s)}</span>`;
  const catName = (c: string) => (CATS[c] || CATS.extra)[lang];
  const pName = (k: string) => (PARTNERS[k] ? partnerName(k) : k);
  const top = (m: Record<string, number>, n = 10) => Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, n);

  const bookingRows = (list: Bk[]) =>
    `<div class="tw"><table><thead><tr><th>${t.date}</th><th>${t.cat}</th><th>${t.partner}</th><th>${t.page}</th><th class="n">${t.amount}</th><th class="n">${t.comm}</th><th class="n">${t.share}</th><th>${t.status}</th></tr></thead><tbody>${list
      .map((b) => {
        const com = conv(b.commission_eur, b.fx_try);
        return `<tr><td>${b.booked_at ? `<a href="${dayLink(b.booked_at)}">${fmtDay(b.booked_at, lang)}</a>` : ''}</td><td>${esc(catName(bkCat(b)))}</td><td>${esc(pName(bkPartner(b)))}</td><td class="small">${esc(b.page ? (b.page.startsWith('/') ? b.page : `/${b.page}`) : '—')}</td><td class="n">${money(conv(b.amount_eur, b.fx_try), lang, cur)}</td><td class="n">${money(com, lang, cur)}</td><td class="n"><b>${b.status === 'cancelled' ? '—' : money(com * share, lang, cur)}</b></td><td>${st(b.status)}</td></tr>`;
      })
      .join('')}</tbody></table></div>`;

  const head = `<header><a class="brand" href="${SITE}/">Vizamigo</a><div class="row"><span class="who">${esc(t.title)} · <b>${esc(p.name)}</b></span>${langPicker(lang, curQs)}</div></header>`;
  const foot = `<div class="foot">${t.updated}: ${esc(new Intl.DateTimeFormat(LOCALE[lang], { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Istanbul' }).format(new Date()))} · ${t.tz}</div>`;

  // ---- gün ayrıntısı ----
  if (day) {
    const tm = (iso: string) => new Date(new Date(iso).getTime() + TZ).toISOString().slice(11, 16);
    const rows = evs
      .map((e) => {
        const k = partnerKey(e.target);
        return `<tr><td>${tm(e.ts)}</td><td>${e.kind === 'visit' ? esc(t.evVisit) : `${esc(t.evOut)}: <b>${esc(pName(k))}</b> <span class="small">(${esc(catName(partnerCat(k)))})</span>`}</td><td class="small">${esc(e.path || '—')}</td></tr>`;
      })
      .join('');
    const prev = addDays(day, -1), next = addDays(day, 1);
    const body = `${head}
<p><a href="${base}${langQ ? `?lang=${lang}` : ''}">${t.back}</a></p>
<div class="card"><div class="row" style="justify-content:space-between"><h1 style="margin:0">${t.dayTitle}: ${fmtDay(day, lang)}</h1><div class="row"><a class="btn" style="padding:4px 12px;text-decoration:none" href="${dayLink(prev)}">‹</a>${next <= today ? `<a class="btn" style="padding:4px 12px;text-decoration:none" href="${dayLink(next)}">›</a>` : ''}</div></div></div>
<div class="kpis"><div class="kpi"><div class="l">${t.visits}</div><div class="v">${nv}</div></div><div class="kpi"><div class="l">${t.outs}</div><div class="v">${no}</div></div><div class="kpi"><div class="l">${t.bookings}</div><div class="v">${live.length}</div><div class="s">${t.volume}: ${money(volume, lang, cur)}</div></div><div class="kpi hi"><div class="l">${t.yours}</div><div class="v">${money(total, lang, cur)}</div></div></div>
<div class="card"><h2>${t.dayBookings}</h2>${bks.length ? bookingRows(bks) : `<p class="empty">${t.noBookingDay}</p>`}</div>
<div class="card"><h2>${t.timeline}</h2><p class="hint">${t.tz}</p>${rows ? `<div class="tw"><table><thead><tr><th>${t.time}</th><th></th><th>${t.page}</th></tr></thead><tbody>${rows}</tbody></table></div>` : `<p class="empty">${t.noClicks}</p>`}</div>${foot}`;
    return html(lang, `${t.title} · ${p.name}`, body);
  }

  // ---- ana panel ----
  const daysList: string[] = [];
  for (let x = from; x <= to && daysList.length < 800; x = addDays(x, 1)) daysList.push(x);
  const chartDays = daysList.length > 120 ? daysList.slice(-120) : daysList;
  const catRows = CAT_ORDER.map((c) => {
    const a = byCat[c] || blank();
    const parts = Object.values(PARTNERS).filter((x) => x.c === c);
    const names = [...new Set(parts.map((x) => x.n + (x.tracked === false ? '*' : '')))].join(', ');
    return `<tr class="${a.clicks || a.n ? '' : 'z'}"><td><b>${esc(catName(c))}</b><div class="small">${esc(names)}</div></td><td class="n">${a.clicks}</td><td class="n">${a.n}</td><td class="n">${money(a.vol, lang, cur)}</td><td class="n"><b>${money(a.sh, lang, cur)}</b></td></tr>`;
  }).join('');
  const pRows = Object.entries(byP).sort((a, b) => b[1].n - a[1].n || b[1].clicks - a[1].clicks).map(([k, a]) =>
    `<tr><td><b>${esc(pName(k))}</b>${PARTNERS[k]?.tracked === false ? ' *' : ''}</td><td class="small">${esc(catName(partnerCat(k)))}</td><td class="n">${a.clicks}</td><td class="n">${a.n}</td><td class="n"><b>${money(a.sh, lang, cur)}</b></td></tr>`).join('');
  const dayRows = Object.keys(byDay).sort().reverse().map((x) => {
    const a = byDay[x];
    return `<tr><td><a href="${dayLink(x)}">${fmtDay(x, lang)}</a></td><td class="n">${a.v}</td><td class="n">${a.clicks}</td><td class="n">${a.n || `<span class="small">${t.noRes}</span>`}</td><td class="n">${a.n ? money(a.vol, lang, cur) : ''}</td><td class="n"><b>${a.n ? money(a.sh, lang, cur) : ''}</b></td></tr>`;
  }).join('');
  const pageList = (m: Record<string, number>) => top(m).map(([k, n]) => `<tr><td class="small" style="white-space:normal;word-break:break-all"><a href="${SITE}${esc(k)}" target="_blank" rel="noopener">${esc(k)}</a></td><td class="n">${n}</td></tr>`).join('') || `<tr><td class="empty">—</td><td></td></tr>`;

  const body = `${head}
<div class="card"><h2>${t.link}</h2><div class="row"><code id="lk">${esc(link)}</code><button onclick="navigator.clipboard&&navigator.clipboard.writeText(document.getElementById('lk').textContent);this.textContent='✓'">${t.copy}</button></div></div>
<div class="card"><div class="row" style="justify-content:space-between"><div class="row tabs">${tab('7', t.d7)}${tab('30', t.d30)}${tab('90', t.d90)}${tab('all', t.all)}</div>
<form class="row" method="get" action="${base}">${langQ ? `<input type="hidden" name="lang" value="${lang}">` : ''}<label class="small">${t.from} <input type="date" name="from" value="${from}" max="${today}"></label><label class="small">${t.to} <input type="date" name="to" value="${to}" max="${today}"></label><button class="btn">${t.show}</button></form></div>
<p class="small" style="margin:8px 0 0">${fmtDay(from, lang)} – ${fmtDay(to, lang)}</p></div>
<div class="kpis">
 <div class="kpi"><div class="l">${t.visits}</div><div class="v">${nv.toLocaleString(LOCALE[lang])}</div></div>
 <div class="kpi"><div class="l">${t.outs}</div><div class="v">${no.toLocaleString(LOCALE[lang])}</div></div>
 <div class="kpi"><div class="l">${t.bookings}</div><div class="v">${live.length}</div><div class="s">${t.volume}: ${money(volume, lang, cur)}</div></div>
 <div class="kpi hi"><div class="l">${t.yours}</div><div class="v">${money(total, lang, cur)}</div><div class="s">${t.pending}: ${money(sh.pending, lang, cur)} · ${t.approved}: ${money(sh.approved, lang, cur)} · ${t.paid}: ${money(sh.paid, lang, cur)}</div></div>
</div>
<div class="card"><h2>${t.daily}</h2><p class="hint">${t.dailyHint}</p>${nv + no ? chart(chartDays, v, o, dayLink, lang) : `<p class="empty">${t.noClicks}</p>`}
<div class="leg"><span><i class="dot" style="background:var(--brand)"></i>${t.vLegend}</span><span><i class="dot" style="background:var(--acc)"></i>${t.oLegend}</span></div></div>
<div class="card"><h2>${t.byCat}</h2><div class="tw"><table><thead><tr><th>${t.cat}</th><th class="n">${t.clicks}</th><th class="n">${t.bookings}</th><th class="n">${t.amount}</th><th class="n">${t.share}</th></tr></thead><tbody>${catRows}</tbody></table></div><p class="small" style="margin:8px 0 0">* ${esc(t.notTracked)}</p></div>
${pRows ? `<div class="card"><h2>${t.byPartner}</h2><div class="tw"><table><thead><tr><th>${t.partner}</th><th>${t.cat}</th><th class="n">${t.clicks}</th><th class="n">${t.bookings}</th><th class="n">${t.share}</th></tr></thead><tbody>${pRows}</tbody></table></div></div>` : ''}
<div class="card"><h2>${t.days}</h2>${dayRows ? `<div class="tw"><table><thead><tr><th>${t.date}</th><th class="n">${t.vLegend}</th><th class="n">${t.clicks}</th><th class="n">${t.bookings}</th><th class="n">${t.amount}</th><th class="n">${t.share}</th></tr></thead><tbody>${dayRows}</tbody></table></div>` : `<p class="empty">${t.noClicks}</p>`}</div>
<div class="grid2" style="margin-bottom:14px"><div class="card"><h2>${t.pages} · ${t.landed}</h2><table><tbody>${pageList(land)}</tbody></table></div><div class="card"><h2>${t.pages} · ${t.clickedFrom}</h2><table><tbody>${pageList(outPage)}</tbody></table></div></div>
<div class="card"><h2>${t.bookings}</h2>${bks.length ? bookingRows(bks) : `<p class="empty">${t.none}</p>`}</div>
<div class="card"><h2>${t.how}</h2><ul>${t.howList.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>${foot}`;
  return html(lang, `${t.title} · ${p.name}`, body);
}
