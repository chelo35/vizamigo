/**
 * Ülke takip bildirimleri (ücretsiz): ziyaretçi bir ülkeyi takip eder; o ülkenin vize kuralı (kendi pasaportu için)
 * ya da resmî seyahat uyarısı değişince e-posta alır.
 *
 *   POST /api/alerts                      {email, country, passport, lang}  → kayıt + onay e-postası
 *   GET  /api/alerts?a=confirm&t=TOKEN    → aboneliği onaylar
 *   GET  /api/alerts?a=unsub&t=TOKEN      → aboneliği siler
 *   GET  /api/alerts?a=run                → (Vercel cron, günde bir) değişiklikleri bulup e-posta gönderir
 *
 * Ortam değişkenleri (Vercel):
 *   SUPABASE_SERVICE_ROLE_KEY  (gizli)  alert_subs tablosuna yalnızca sunucu erişir
 *   SUPABASE_URL               (isteğe bağlı) yoksa sitenin Supabase adresi
 *   RESEND_API_KEY             (gizli, zaten var)
 *   ALERTS_FROM                (isteğe bağlı) ör. "Vizamigo <bildirim@vizamigo.com>" — alan adı Resend'de doğrulanmış olmalı
 */
import { getPassportItems } from '../src/utils/calculator';
import { getCountryName, getCategoryBadgeLabel } from '../src/data/passportData';
import { getOfficialAdvisories } from '../src/data/officialAdvisories';
import { getCountrySlug } from '../src/utils/countrySlugs';

type Req = { method?: string; query: Record<string, string | string[] | undefined>; body?: unknown; headers: Record<string, string | string[] | undefined> };
type Res = { status: (n: number) => Res; setHeader: (k: string, v: string) => void; send: (b: unknown) => void; json: (b: unknown) => void; end: (b?: unknown) => void };
type Sub = { id: number; email: string; country: string; passport: string; lang: string; token: string; confirmed: boolean; last_seen: Snapshot | null };
type Snapshot = { visa: string; adv: number | null };

const SB = process.env.SUPABASE_URL || 'https://utlnjyquflfcvjhmgopq.supabase.co';
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const FROM = process.env.ALERTS_FROM || process.env.REPORT_FROM || 'Vizamigo <bildirim@vizamigo.com>';
const SITE = 'https://www.vizamigo.com';
const LANGS = ['tr', 'en', 'de', 'es', 'ru'];
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || '';
const esc = (s: unknown) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string);

const T = {
  confirmSubj: { tr: 'Vizamigo takibini onayla', en: 'Confirm your Vizamigo alert', de: 'Vizamigo-Hinweis bestätigen', es: 'Confirma tu alerta de Vizamigo', ru: 'Подтвердите уведомления Vizamigo' },
  confirmBody: {
    tr: (c: string) => `${c} için vize kuralı ya da resmî seyahat uyarısı değişince sana e-posta göndereceğiz. Onaylamak için düğmeye bas.`,
    en: (c: string) => `We will email you when the visa rule or official travel advisory for ${c} changes. Tap the button to confirm.`,
    de: (c: string) => `Wir schreiben dir, wenn sich Visumregel oder Reisehinweis für ${c} ändern. Zum Bestätigen tippen.`,
    es: (c: string) => `Te escribiremos cuando cambien las normas de visado o el aviso oficial de ${c}. Pulsa para confirmar.`,
    ru: (c: string) => `Мы напишем, когда изменятся визовые правила или официальное предупреждение для ${c}. Нажмите, чтобы подтвердить.`
  },
  confirmBtn: { tr: 'Takibi onayla', en: 'Confirm alert', de: 'Bestätigen', es: 'Confirmar', ru: 'Подтвердить' },
  changeSubj: { tr: (c: string) => `${c}: seyahat kuralı değişti`, en: (c: string) => `${c}: travel rules changed`, de: (c: string) => `${c}: Reiseregeln geändert`, es: (c: string) => `${c}: cambiaron las normas`, ru: (c: string) => `${c}: правила изменились` },
  visa: { tr: 'Vize durumu', en: 'Visa status', de: 'Visumstatus', es: 'Situación de visado', ru: 'Визовый статус' },
  adv: { tr: 'En temkinli resmî uyarı', en: 'Strictest official advisory', de: 'Strengster Reisehinweis', es: 'Aviso oficial más estricto', ru: 'Самое строгое предупреждение' },
  see: { tr: 'Ülke sayfasını aç', en: 'Open country page', de: 'Länderseite öffnen', es: 'Abrir página del país', ru: 'Открыть страницу страны' },
  unsub: { tr: 'Bu bildirimleri durdur', en: 'Stop these alerts', de: 'Hinweise abbestellen', es: 'Dejar de recibir', ru: 'Отписаться' },
  okConfirm: { tr: 'Takip onaylandı. Değişiklik olunca e-posta alacaksın.', en: 'Alert confirmed. You will get an email when something changes.', de: 'Bestätigt. Du bekommst eine E-Mail bei Änderungen.', es: 'Confirmado. Te avisaremos por email.', ru: 'Подтверждено. Мы напишем при изменениях.' },
  okUnsub: { tr: 'Takip durduruldu, artık e-posta almayacaksın.', en: 'Alert stopped. You will not get more emails.', de: 'Abbestellt. Keine weiteren E-Mails.', es: 'Cancelado. No recibirás más correos.', ru: 'Отписка выполнена.' },
  bad: { tr: 'Bağlantı geçersiz ya da süresi dolmuş.', en: 'This link is invalid or expired.', de: 'Link ungültig.', es: 'Enlace no válido.', ru: 'Ссылка недействительна.' }
};
const L = (lang: string) => (LANGS.includes(lang) ? lang : 'en') as 'tr';

async function sb(path: string, init: RequestInit = {}) {
  const r = await fetch(`${SB}/rest/v1/${path}`, { ...init, headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json', ...(init.headers || {}) } });
  if (!r.ok) throw new Error(`supabase ${r.status} ${await r.text()}`);
  const t = await r.text();
  return t ? JSON.parse(t) : null;
}

async function mail(to: string, subject: string, html: string) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM, to, subject, html })
  });
  if (!r.ok) throw new Error(`resend ${r.status}`);
}

const shell = (body: string) =>
  `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:520px;margin:auto;padding:24px;color:#13222b"><div style="font-weight:800;color:#0d6e78;font-size:20px;margin-bottom:16px">Vizamigo</div>${body}</div>`;
const btn = (href: string, label: string) => `<p><a href="${href}" style="display:inline-block;background:#0d8a8f;color:#fff;text-decoration:none;padding:12px 20px;border-radius:12px;font-weight:700">${esc(label)}</a></p>`;
const page = (res: Res, msg: string, lang: string) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`<!doctype html><html lang="${lang}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Vizamigo</title><body style="margin:0;background:#f7f3ec">${shell(`<p style="font-size:17px">${esc(msg)}</p><p><a href="${SITE}/${lang}" style="color:#0d6e78">vizamigo.com</a></p>`)}</body></html>`);
};

function snapshot(country: string, passport: string, lang: string): Snapshot {
  const it = getPassportItems(passport).find((x) => x.c === country);
  return { visa: getCategoryBadgeLabel((it || null) as never, lang), adv: getOfficialAdvisories(country).max };
}

export default async function handler(req: Req, res: Res) {
  if (one(req.query.a) === 'ping') {
    res.setHeader('Cache-Control', 'public, s-maxage=300');
    res.status(200).json({ ok: !!KEY && !!process.env.RESEND_API_KEY });
    return;
  }
  if (!KEY) {
    res.status(503).json({ error: 'not_configured' });
    return;
  }
  const a = one(req.query.a);
  const t = one(req.query.t).replace(/[^0-9a-f-]/gi, '');

  // abone ol
  if (req.method === 'POST') {
    const b = (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}) as Record<string, string>;
    const email = String(b.email || '').trim().toLowerCase().slice(0, 200);
    const country = String(b.country || '').toUpperCase().slice(0, 2);
    const passport = String(b.passport || '').toUpperCase().slice(0, 2);
    const lang = L(String(b.lang || 'tr'));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || !/^[A-Z]{2}$/.test(country) || !/^[A-Z]{2}$/.test(passport)) {
      res.status(400).json({ error: 'bad_input' });
      return;
    }
    try {
      const rows: Sub[] = await sb('alert_subs?on_conflict=email,country,passport', {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
        body: JSON.stringify({ email, country, passport, lang })
      });
      const s = rows?.[0];
      if (s && !s.confirmed) {
        const cn = getCountryName(country, lang);
        await mail(email, T.confirmSubj[lang], shell(`<p>${esc(T.confirmBody[lang](cn))}</p>${btn(`${SITE}/api/alerts?a=confirm&t=${s.token}`, T.confirmBtn[lang])}`));
      }
      res.status(200).json({ ok: true, confirmed: !!s?.confirmed });
    } catch {
      res.status(500).json({ error: 'failed' });
    }
    return;
  }

  // onay ve çıkış bağlantıları
  if (a === 'confirm' || a === 'unsub') {
    const rows: Sub[] = t ? await sb(`alert_subs?token=eq.${t}&select=*`).catch(() => []) : [];
    const s = rows?.[0];
    if (!s) {
      page(res, T.bad.en, 'en');
      return;
    }
    const lang = L(s.lang);
    if (a === 'confirm') {
      await sb(`alert_subs?id=eq.${s.id}`, { method: 'PATCH', body: JSON.stringify({ confirmed: true, last_seen: snapshot(s.country, s.passport, lang) }) });
      page(res, T.okConfirm[lang], lang);
    } else {
      await sb(`alert_subs?id=eq.${s.id}`, { method: 'DELETE' });
      page(res, T.okUnsub[lang], lang);
    }
    return;
  }

  // günlük kontrol: kayıtlı son durumla bugünkü durumu karşılaştır, değişeni e-postayla bildir
  if (a === 'run') {
    const subs: Sub[] = await sb('alert_subs?confirmed=eq.true&select=*&order=id.asc&limit=1000').catch(() => []);
    let sent = 0;
    for (const s of subs) {
      const lang = L(s.lang);
      const now = snapshot(s.country, s.passport, lang);
      const was = s.last_seen;
      if (was && (was.visa !== now.visa || was.adv !== now.adv)) {
        const cn = getCountryName(s.country, lang);
        const rows = [
          was.visa !== now.visa ? `<li><b>${esc(T.visa[lang])}:</b> ${esc(was.visa)} → <b>${esc(now.visa)}</b></li>` : '',
          was.adv !== now.adv ? `<li><b>${esc(T.adv[lang])}:</b> ${was.adv ?? '–'}/4 → <b>${now.adv ?? '–'}/4</b></li>` : ''
        ].join('');
        try {
          await mail(
            s.email,
            T.changeSubj[lang](cn),
            shell(`<h2 style="margin:0 0 8px">${esc(cn)}</h2><ul>${rows}</ul>${btn(`${SITE}/${lang}/${getCountrySlug(s.country, lang as never)}`, T.see[lang])}<p style="font-size:12px;color:#5b6b73"><a href="${SITE}/api/alerts?a=unsub&t=${s.token}" style="color:#5b6b73">${esc(T.unsub[lang])}</a></p>`)
          );
          sent++;
        } catch {
          continue; // e-posta gitmediyse durumu güncelleme; ertesi gün tekrar denenir
        }
      }
      if (!was || was.visa !== now.visa || was.adv !== now.adv) await sb(`alert_subs?id=eq.${s.id}`, { method: 'PATCH', body: JSON.stringify({ last_seen: now }) }).catch(() => null);
    }
    res.status(200).json({ ok: true, checked: subs.length, sent });
    return;
  }

  res.status(400).json({ error: 'unknown_action' });
}
