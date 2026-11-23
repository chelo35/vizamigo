export const config = { runtime: 'edge' };

/**
 * Fenomen (iş ortağı) paneli: https://www.vizamigo.com/ortak/<gizli anahtar>
 * Supabase tabloları (yalnızca service role erişir, RLS açık ve politikasız):
 *   ref_partners (ref, name, token, share, lang, active)
 *   ref_events   (ref, kind visit|out, target, path, lang, country, ts)   ← /api/ref-hit
 *   ref_bookings (id, ref, network, partner, category, booked_at, amount_eur, commission_eur, fx_try,
 *                 status pending|approved|paid|cancelled, paid_at, note)   ← /api/ortak-sync + elle
 * Sayfa arama motorlarına kapalı (noindex) ve kişisel veri göstermez.
 */
const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env || {};
const SB = env.SUPABASE_URL || 'https://utlnjyquflfcvjhmgopq.supabase.co';
const KEY = env.SUPABASE_SERVICE_ROLE_KEY || '';

type Partner = { ref: string; name: string; share: number; lang: string | null };
type Ev = { kind: string; ts: string; target: string | null };
type Bk = {
  id: string; network: string; partner: string | null; category: string | null; booked_at: string | null;
  amount_eur: number | null; commission_eur: number | null; fx_try: number | null; status: string; paid_at: string | null;
};

async function sb<T>(path: string): Promise<T> {
  const r = await fetch(`${SB}/rest/v1/${path}`, { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } });
  if (!r.ok) throw new Error(`supabase ${r.status}`);
  return (await r.json()) as T;
}

const T = {
  tr: {
    title: 'Ortaklık paneli', link: 'Size özel bağlantınız', period: 'Dönem', d7: '7 gün', d30: '30 gün', d90: '90 gün', all: 'Tümü',
    visits: 'Bağlantınızdan gelen ziyaret', outs: 'Ortak sitelere yönlendirme', bookings: 'Rezervasyon', volume: 'Rezervasyon tutarı',
    yours: 'Size düşen pay', pending: 'Beklemede', approved: 'Onaylandı', paid: 'Ödendi', cancelled: 'İptal',
    daily: 'Günlük tıklamalar', vLegend: 'Ziyaret', oLegend: 'Ortak siteye yönlendirme', top: 'En çok gidilen ortak siteler',
    table: 'Rezervasyonlar', date: 'Tarih', cat: 'Hizmet', amount: 'Tutar', comm: 'Komisyon', share: 'Payınız', status: 'Durum',
    none: 'Bu dönemde henüz rezervasyon yok. Rezervasyonlar ortak firmaların raporlarına düştükçe burada görünür.',
    noClicks: 'Bu dönemde henüz tıklama yok.',
    how: 'Nasıl çalışır?',
    howList: [
      'Ziyaret ve yönlendirme sayıları anlık güncellenir.',
      'Rezervasyonlar ortak firmaların raporlarına düştükçe (genelde birkaç saat – birkaç gün içinde) eklenir.',
      'Bir rezervasyon, iptal süresi geçip ortak firma onaylayınca “Onaylandı” olur; bu genelde seyahatten 30–60 gün sonradır.',
      'Önceki ayın onaylanan payı her ayın 15’ine kadar TL olarak IBAN’ınıza gönderilir; 1.000 TL’nin altı sonraki aya devreder.',
      'Bu sayfanın adresi size özeldir; lütfen paylaşmayın.'
    ],
    updated: 'Son güncelleme', bad: 'Bu panel bağlantısı geçersiz. Lütfen size gönderilen bağlantıyı kullanın.', err: 'Panel şu an yüklenemedi, birkaç dakika sonra tekrar deneyin.'
  },
  en: {
    title: 'Partner dashboard', link: 'Your personal link', period: 'Period', d7: '7 days', d30: '30 days', d90: '90 days', all: 'All time',
    visits: 'Visits from your link', outs: 'Clicks to booking partners', bookings: 'Bookings', volume: 'Booking value',
    yours: 'Your share', pending: 'Pending', approved: 'Approved', paid: 'Paid', cancelled: 'Cancelled',
    daily: 'Daily clicks', vLegend: 'Visits', oLegend: 'Clicks to partners', top: 'Top booking partners',
    table: 'Bookings', date: 'Date', cat: 'Service', amount: 'Amount', comm: 'Commission', share: 'Your share', status: 'Status',
    none: 'No bookings in this period yet. Bookings appear here as partner reports come in.',
    noClicks: 'No clicks in this period yet.',
    how: 'How it works',
    howList: [
      'Visits and partner clicks update in real time.',
      'Bookings are added as partner reports come in (usually within a few hours to a few days).',
      'A booking becomes “Approved” once the cancellation window has passed and the partner confirms it, usually 30–60 days after the trip.',
      'Approved earnings from the previous month are paid monthly.',
      'This page address is personal to you; please do not share it.'
    ],
    updated: 'Last updated', bad: 'This dashboard link is not valid. Please use the link we sent you.', err: 'The dashboard could not be loaded right now. Please try again in a few minutes.'
  }
};
type L = typeof T.tr;

const CAT: Record<string, [string, string]> = {
  flight: ['Uçak bileti', 'Flight'], hotel: ['Otel', 'Hotel'], esim: ['eSIM', 'eSIM'], transfer: ['Havalimanı transferi', 'Airport transfer'],
  car: ['Araç kiralama', 'Car rental'], bike: ['Motor / bisiklet', 'Bike / scooter'], tour: ['Tur ve aktivite', 'Tour & activity'],
  train: ['Tren / otobüs / feribot', 'Train / bus / ferry'], other: ['Diğer', 'Other']
};

const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

function page(lang: 'tr' | 'en', title: string, body: string, status = 200): Response {
  const html = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>${esc(title)} · Vizamigo</title><link rel="icon" href="/favicon.ico">
<style>
:root{--bg:#f6f7f9;--card:#fff;--ink:#0f1f24;--mut:#5b6b70;--line:#e3e8ea;--brand:#07626F;--brand2:#0a8a9b;--acc:#f28c28;--ok:#1a8a4a;--warn:#b7791f;--bad:#b42318}
@media (prefers-color-scheme:dark){:root{--bg:#0d1517;--card:#142023;--ink:#e8f0f1;--mut:#9fb1b5;--line:#22343a;--brand:#3fb6c4;--brand2:#7fd3dc}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
.w{max-width:960px;margin:0 auto;padding:20px 16px 48px}header{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:16px}
.brand{font-weight:800;font-size:20px;color:var(--brand);text-decoration:none}.who{color:var(--mut);font-size:14px}
h1{font-size:22px;margin:0 0 4px}h2{font-size:16px;margin:0 0 12px}
.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:16px;margin-bottom:14px}
.link{display:flex;gap:8px;flex-wrap:wrap;align-items:center}.link code{background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:6px 10px;word-break:break-all}
button{font:inherit;border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:8px;padding:6px 12px;cursor:pointer}
.tabs{display:flex;gap:6px;flex-wrap:wrap}.tabs a{padding:6px 12px;border-radius:999px;border:1px solid var(--line);text-decoration:none;color:var(--ink);font-size:14px}.tabs a.on{background:var(--brand);border-color:var(--brand);color:#fff}
.kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px;margin-bottom:14px}.kpi{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px}
.kpi .l{color:var(--mut);font-size:13px}.kpi .v{font-size:26px;font-weight:800;margin-top:2px}.kpi .s{color:var(--mut);font-size:12.5px;margin-top:4px}
.kpi.hi{border-color:var(--brand);box-shadow:0 0 0 1px var(--brand) inset}
.chart{width:100%;height:auto;display:block}.leg{display:flex;gap:14px;font-size:13px;color:var(--mut);margin-top:6px}.dot{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:5px;vertical-align:-1px}
table{width:100%;border-collapse:collapse;font-size:14px}th,td{text-align:left;padding:8px 6px;border-bottom:1px solid var(--line);white-space:nowrap}th{color:var(--mut);font-weight:600;font-size:13px}td.n,th.n{text-align:right}
.tw{overflow-x:auto}.pill{display:inline-block;padding:2px 8px;border-radius:999px;font-size:12.5px;font-weight:600}
.p-pending{background:#fff4e0;color:var(--warn)}.p-approved{background:#e3f5ea;color:var(--ok)}.p-paid{background:#dff1f3;color:var(--brand)}.p-cancelled{background:#fde8e6;color:var(--bad)}
.bar{display:flex;align-items:center;gap:8px;margin:6px 0;font-size:14px}.bar span:first-child{flex:0 0 46%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.bar i{display:block;height:8px;border-radius:4px;background:var(--brand2)}
ul{margin:0;padding-left:18px;color:var(--mut)}li{margin:4px 0}.foot{color:var(--mut);font-size:12.5px;text-align:center;margin-top:18px}
.empty{color:var(--mut)}
</style></head><body><div class="w">${body}</div></body></html>`;
  return new Response(html, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow', 'Referrer-Policy': 'no-referrer' }
  });
}

function money(v: number, lang: 'tr' | 'en', cur: 'TRY' | 'EUR'): string {
  return new Intl.NumberFormat(lang === 'tr' ? 'tr-TR' : 'en-GB', { style: 'currency', currency: cur, maximumFractionDigits: v >= 100 ? 0 : 2 }).format(v || 0);
}

function chart(days: string[], v: Record<string, number>, o: Record<string, number>): string {
  const W = 900, H = 200, P = 26, n = days.length;
  const max = Math.max(1, ...days.map((d) => Math.max(v[d] || 0, o[d] || 0)));
  const bw = (W - P) / n;
  const y = (x: number) => H - 22 - (x / max) * (H - 40);
  let s = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img">`;
  for (const t of [0, 0.5, 1]) {
    const yy = y(max * t);
    s += `<line x1="${P}" x2="${W}" y1="${yy}" y2="${yy}" stroke="var(--line)"/><text x="0" y="${yy + 4}" font-size="11" fill="var(--mut)">${Math.round(max * t)}</text>`;
  }
  days.forEach((d, i) => {
    const x = P + i * bw, w = Math.max(1, bw * 0.38);
    const a = v[d] || 0, b = o[d] || 0;
    if (a) s += `<rect x="${x + bw * 0.1}" y="${y(a)}" width="${w}" height="${H - 22 - y(a)}" rx="2" fill="var(--brand)"><title>${d}: ${a}</title></rect>`;
    if (b) s += `<rect x="${x + bw * 0.1 + w}" y="${y(b)}" width="${w}" height="${H - 22 - y(b)}" rx="2" fill="var(--acc)"><title>${d}: ${b}</title></rect>`;
    if (n <= 31 ? i % Math.ceil(n / 8) === 0 : i % Math.ceil(n / 6) === 0) s += `<text x="${x}" y="${H - 6}" font-size="11" fill="var(--mut)">${d.slice(5).replace('-', '.')}</text>`;
  });
  return s + '</svg>';
}

function partnerName(t: string): string {
  const s = t.replace(/^travelpayouts:/, '').replace(/^stay22:/, 'Stay22 · ');
  const map: Record<string, string> = { 'yesim.app': 'Yesim eSIM', 'airalo.com': 'Airalo eSIM', 'saily.com': 'Saily eSIM', 'gigsky.com': 'GigSky eSIM', 'kiwitaxi.com': 'Kiwitaxi', 'localrent.com': 'Localrent', 'getrentacar.com': 'GetRentacar', 'aviasales.com': 'Aviasales', 'intui.travel': 'Intui', 'klook.com': 'Klook', 'economybookings.com': 'EconomyBookings', 'bikesbooking.com': 'BikesBooking' };
  if (map[s]) return map[s];
  if (/^Stay22 · /.test(s)) return s.replace('allez', 'Booking.com').replace('booking', 'Booking.com');
  if (s.startsWith('awin:')) return 'Awin';
  if (s.startsWith('cj:')) return 'Daytrip';
  if (s === 'admitad') return 'Admitad';
  return s;
}

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const token = (url.searchParams.get('k') || '').trim();
  const langQ = url.searchParams.get('lang');
  if (!/^[a-f0-9]{24,64}$/.test(token) || !KEY) return page('tr', T.tr.title, `<div class="card">${T.tr.bad}</div>`, 404);
  let p: Partner | undefined;
  try {
    p = (await sb<Partner[]>(`ref_partners?token=eq.${token}&active=eq.true&select=ref,name,share,lang&limit=1`))[0];
  } catch {
    return page('tr', T.tr.title, `<div class="card">${T.tr.err}</div>`, 503);
  }
  if (!p) return page('tr', T.tr.title, `<div class="card">${T.tr.bad}</div>`, 404);
  const lang: 'tr' | 'en' = (langQ === 'en' || langQ === 'tr' ? langQ : p.lang && p.lang !== 'tr' ? 'en' : 'tr');
  const t: L = T[lang];
  const cur: 'TRY' | 'EUR' = lang === 'tr' ? 'TRY' : 'EUR';
  const dParam = url.searchParams.get('d') || '30';
  const days = dParam === 'all' ? 365 : Math.min(365, Math.max(1, parseInt(dParam, 10) || 30));
  const since = new Date(Date.now() - (days - 1) * 864e5);
  since.setUTCHours(0, 0, 0, 0);
  const sinceIso = since.toISOString();
  const sinceDay = sinceIso.slice(0, 10);

  let evs: Ev[] = [], bks: Bk[] = [];
  try {
    [evs, bks] = await Promise.all([
      sb<Ev[]>(`ref_events?ref=eq.${p.ref}&ts=gte.${sinceIso}&select=kind,ts,target&order=ts.asc&limit=50000`),
      sb<Bk[]>(`ref_bookings?ref=eq.${p.ref}${dParam === 'all' ? '' : `&booked_at=gte.${sinceDay}`}&select=id,network,partner,category,booked_at,amount_eur,commission_eur,fx_try,status,paid_at&order=booked_at.desc&limit=2000`)
    ]);
  } catch {
    return page(lang, t.title, `<div class="card">${t.err}</div>`, 503);
  }

  // Türkiye saatine göre günler
  const dayOf = (iso: string) => new Date(new Date(iso).getTime() + 3 * 36e5).toISOString().slice(0, 10);
  const list: string[] = [];
  const nDays = dParam === 'all' ? Math.min(365, Math.max(30, evs.length ? Math.ceil((Date.now() - new Date(evs[0].ts).getTime()) / 864e5) + 1 : 30)) : days;
  for (let i = nDays - 1; i >= 0; i--) list.push(dayOf(new Date(Date.now() - i * 864e5).toISOString()));
  const v: Record<string, number> = {}, o: Record<string, number> = {}, top: Record<string, number> = {};
  let nv = 0, no = 0;
  for (const e of evs) {
    const d = dayOf(e.ts);
    if (e.kind === 'visit') { v[d] = (v[d] || 0) + 1; nv++; }
    else { o[d] = (o[d] || 0) + 1; no++; const k = partnerName(e.target || ''); top[k] = (top[k] || 0) + 1; }
  }

  const conv = (eur: number | null, fx: number | null) => (cur === 'TRY' ? (eur || 0) * (fx || 0) : eur || 0);
  const live = bks.filter((b) => b.status !== 'cancelled');
  let volume = 0;
  const sh: Record<string, number> = { pending: 0, approved: 0, paid: 0 };
  for (const b of live) {
    volume += conv(b.amount_eur, b.fx_try);
    sh[b.status] = (sh[b.status] || 0) + conv(b.commission_eur, b.fx_try) * p.share;
  }
  const totalShare = sh.pending + sh.approved + sh.paid;
  const link = `https://www.vizamigo.com/${lang === 'tr' ? '' : (p.lang || 'en') + '/'}?ref=${p.ref}`;
  const tab = (k: string, label: string) => `<a class="${dParam === k ? 'on' : ''}" href="?d=${k}${langQ ? `&lang=${langQ}` : ''}">${label}</a>`;
  const topRows = Object.entries(top).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const topMax = topRows[0]?.[1] || 1;
  const nowTr = new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Istanbul' }).format(new Date());
  const st = (s: string) => `<span class="pill p-${esc(s)}">${esc((t as unknown as Record<string, string>)[s] || s)}</span>`;

  const body = `
<header><a class="brand" href="https://www.vizamigo.com/">Vizamigo</a><div class="who">${esc(t.title)} · <b>${esc(p.name)}</b></div></header>
<div class="card"><h2>${t.link}</h2><div class="link"><code id="lk">${esc(link)}</code><button onclick="navigator.clipboard&&navigator.clipboard.writeText(document.getElementById('lk').textContent);this.textContent='✓'">${lang === 'tr' ? 'Kopyala' : 'Copy'}</button></div></div>
<div class="tabs" style="margin-bottom:14px">${tab('7', t.d7)}${tab('30', t.d30)}${tab('90', t.d90)}${tab('all', t.all)}</div>
<div class="kpis">
 <div class="kpi"><div class="l">${t.visits}</div><div class="v">${nv.toLocaleString(lang)}</div></div>
 <div class="kpi"><div class="l">${t.outs}</div><div class="v">${no.toLocaleString(lang)}</div></div>
 <div class="kpi"><div class="l">${t.bookings}</div><div class="v">${live.length}</div><div class="s">${t.volume}: ${money(volume, lang, cur)}</div></div>
 <div class="kpi hi"><div class="l">${t.yours}</div><div class="v">${money(totalShare, lang, cur)}</div><div class="s">${t.pending}: ${money(sh.pending, lang, cur)} · ${t.approved}: ${money(sh.approved, lang, cur)} · ${t.paid}: ${money(sh.paid, lang, cur)}</div></div>
</div>
<div class="card"><h2>${t.daily}</h2>${nv + no ? chart(list, v, o) : `<p class="empty">${t.noClicks}</p>`}
<div class="leg"><span><i class="dot" style="background:var(--brand)"></i>${t.vLegend}</span><span><i class="dot" style="background:var(--acc)"></i>${t.oLegend}</span></div></div>
${topRows.length ? `<div class="card"><h2>${t.top}</h2>${topRows.map(([k, n]) => `<div class="bar"><span>${esc(k)}</span><i style="width:${Math.max(4, (n / topMax) * 45)}%"></i><b>${n}</b></div>`).join('')}</div>` : ''}
<div class="card"><h2>${t.table}</h2>${bks.length ? `<div class="tw"><table><thead><tr><th>${t.date}</th><th>${t.cat}</th><th class="n">${t.amount}</th><th class="n">${t.comm}</th><th class="n">${t.share}</th><th>${t.status}</th></tr></thead><tbody>${bks
    .map((b) => {
      const c = CAT[b.category || 'other'] || CAT.other;
      const com = conv(b.commission_eur, b.fx_try);
      return `<tr><td>${esc(b.booked_at || '')}</td><td>${esc(lang === 'tr' ? c[0] : c[1])}${b.partner ? ` <span style="color:var(--mut)">· ${esc(b.partner)}</span>` : ''}</td><td class="n">${money(conv(b.amount_eur, b.fx_try), lang, cur)}</td><td class="n">${money(com, lang, cur)}</td><td class="n"><b>${b.status === 'cancelled' ? '—' : money(com * p!.share, lang, cur)}</b></td><td>${st(b.status)}</td></tr>`;
    })
    .join('')}</tbody></table></div>` : `<p class="empty">${t.none}</p>`}</div>
<div class="card"><h2>${t.how}</h2><ul>${t.howList.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
<div class="foot">${t.updated}: ${esc(nowTr)} · <a href="?d=${esc(dParam)}&lang=${lang === 'tr' ? 'en' : 'tr'}" style="color:var(--mut)">${lang === 'tr' ? 'English' : 'Türkçe'}</a></div>`;
  return page(lang, `${t.title} · ${p.name}`, body);
}
