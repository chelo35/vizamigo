export const config = {
  runtime: 'edge',
};

/**
 * Hata bildirimi e-postası.
 * Supabase "Database Webhook" (reports tablosuna INSERT) bu adrese POST atar;
 * biz de bildirimi Resend üzerinden REPORT_TO adresine e-postayla iletiriz.
 *
 * Vercel ortam değişkenleri:
 *   RESEND_API_KEY        Resend API anahtarı (gizli)
 *   REPORT_NOTIFY_SECRET  Supabase webhook'unun "x-webhook-secret" başlığında gönderdiği gizli kelime
 *   REPORT_TO             Bildirimlerin gideceği e-posta
 *   REPORT_FROM           (isteğe bağlı) Gönderen, ör. "Vizamigo <bildirim@vizamigo.com>"
 */
const CATS: Record<string, string> = {
  vf: 'Vizesiz süre değişti',
  ev: 'E-vize / ETA kuralı',
  v: 'Artık vize gerekiyor',
  info: 'Diğer bilgi hatası'
};

const esc = (s: unknown) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string);

export default async function handler(req: Request) {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  const secret = process.env.REPORT_NOTIFY_SECRET;
  if (!secret || req.headers.get('x-webhook-secret') !== secret) return new Response('Unauthorized', { status: 401 });
  const key = process.env.RESEND_API_KEY;
  const to = process.env.REPORT_TO;
  if (!key || !to) return new Response('Not configured', { status: 500 });

  let body: { type?: string; record?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return new Response('Bad request', { status: 400 });
  }
  const r = body.record || {};
  const rows: [string, unknown][] = [
    ['Ülke', r.country_code],
    ['Pasaport', r.passport_code],
    ['Konu', CATS[String(r.category)] || r.category],
    ['Not', r.notes],
    ['Kaynak', r.source_url],
    ['İletişim', r.contact],
    ['Dil / sayfa', `${r.lang || ''} ${r.page || ''}`],
    ['Zaman', r.created_at]
  ];
  const html = `<h2 style="font-family:sans-serif">Yeni hata bildirimi</h2><table style="font-family:sans-serif;border-collapse:collapse">${rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><th style="text-align:left;padding:6px 10px;border:1px solid #ddd;background:#f6f6f6">${esc(k)}</th><td style="padding:6px 10px;border:1px solid #ddd">${esc(v)}</td></tr>`)
    .join('')}</table>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.REPORT_FROM || 'Vizamigo <bildirim@vizamigo.com>',
      to: [to],
      subject: `Hata bildirimi: ${esc(r.country_code)} · ${CATS[String(r.category)] || r.category || ''}`,
      html,
      reply_to: typeof r.contact === 'string' && r.contact.includes('@') ? r.contact : undefined
    })
  });
  return new Response(res.ok ? 'ok' : 'send failed', { status: res.ok ? 200 : 502 });
}
