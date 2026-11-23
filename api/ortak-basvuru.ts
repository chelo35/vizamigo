export const config = { runtime: 'edge' };

import { LANGS, type Lang } from './_catalog';
import { LANG_NAMES } from './_ortak_i18n';

/**
 * Ortaklık programı tanıtımı ve başvuru formu: https://www.vizamigo.com/ortak/basvuru (?lang=)
 * POST → Supabase ref_applications tablosuna yazılır ve REPORT_TO adresine bildirim gider.
 */
const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env || {};
const SB = env.SUPABASE_URL || 'https://utlnjyquflfcvjhmgopq.supabase.co';
const KEY = env.SUPABASE_SERVICE_ROLE_KEY || '';
const FROM = env.REPORT_FROM || env.ALERTS_FROM || 'Vizamigo <bildirim@vizamigo.com>';
const TO = env.REPORT_TO || '';
const SITE = 'https://www.vizamigo.com';
const isLang = (x: unknown): x is Lang => LANGS.includes(x as Lang);
const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

type S = {
  title: string; lead: string; h1: string; points: string[]; payH: string; pay: string; formH: string;
  name: string; email: string; platform: string; channel: string; channelPh: string; audience: string; audiencePh: string; contentLang: string; msg: string; msgPh: string;
  consent: string; send: string; ok: string; bad: string; login: string; other: string;
};
const T: Record<Lang, S> = {
  tr: {
    title: 'Vizamigo Ortaklık Programı',
    lead: 'Seyahat içerikleri üretiyorsanız, izleyicilerinizi Vizamigo’ya yönlendirerek gelir elde edebilirsiniz. Size özel bağlantınızla gelen ziyaretçilerin yaptığı rezervasyonlardan, ortak firmaların bize ödediği komisyonun yarısı (%50) sizin olur.',
    h1: 'Nasıl çalışır?',
    points: [
      'Başvurunuz onaylanınca size özel bir bağlantı veriyoruz. Bağlantıyı video açıklamalarınıza, yazılarınıza ya da biyografinize eklemeniz yeterli; zorunlu paylaşım ya da ücret yok.',
      'Bağlantınızla gelen ziyaretçi 30 gün boyunca size yazılır. Uçak, otel, paket tur, tur ve aktivite, havalimanı transferi, araç, motor ve bisiklet kiralama, tren, otobüs, feribot ve eSIM rezervasyonlarının hepsi sayılır.',
      'Size özel panelde tıklamalarınızı, rezervasyonlarınızı ve kazancınızı gün gün, istediğiniz zaman izlersiniz.',
      'Vizamigo; 199 ülkenin vize ve giriş kurallarını, uçak, otel, transfer ve eSIM seçenekleriyle birlikte altı dilde sunar. Takipçileriniz için gerçekten işe yarayan bir kaynaktır.'
    ],
    payH: 'Ödeme', pay: 'Komisyon, rezervasyonun iptal süresi geçip ortak firma onayladığında (genelde seyahatten 30–60 gün sonra) hesabınıza girer. Önceki ayın onaylanan kazancı her ayın 15’ine kadar TL olarak IBAN’ınıza gönderilir; 1.000 TL’nin altındaki tutar sonraki aya devreder.',
    formH: 'Başvuru formu', name: 'Adınız ya da kanal adı', email: 'E-posta adresiniz', platform: 'Ana platform', channel: 'Kanal / hesap / site bağlantısı', channelPh: 'https://youtube.com/@…',
    audience: 'Takipçi / abone sayısı', audiencePh: 'ör. 12.000', contentLang: 'İçerik dili', msg: 'Kısaca kendinizden bahsedin (isteğe bağlı)', msgPh: 'Hangi ülkeleri gezdiğiniz, içerik türünüz…',
    consent: 'Bilgilerimin yalnızca ortaklık başvurumun değerlendirilmesi için kullanılmasını kabul ediyorum.', send: 'Başvuruyu gönder',
    ok: 'Başvurunuz bize ulaştı, teşekkürler! Birkaç gün içinde e-posta ile dönüş yapacağız.', bad: 'Lütfen ad, e-posta ve kanal bağlantısını doldurun.', login: 'Zaten ortağımız mısınız? Ortak girişi', other: 'Diğer'
  },
  en: {
    title: 'Vizamigo Partner Program',
    lead: 'If you create travel content, you can earn by sending your audience to Vizamigo. You receive half (50%) of the commission our booking partners pay us for every booking made by visitors who arrive through your personal link.',
    h1: 'How it works',
    points: [
      'Once approved, you get a personal link. Just add it to your video descriptions, posts or bio — no mandatory posts and no fees.',
      'Visitors who arrive through your link are credited to you for 30 days. Flights, hotels, package tours, tours and activities, airport transfers, car, scooter and bike rentals, trains, buses, ferries and eSIMs all count.',
      'Your personal dashboard shows your clicks, bookings and earnings day by day, whenever you like.',
      'Vizamigo covers visa and entry rules for 199 countries in six languages, together with flight, hotel, transfer and eSIM options — a genuinely useful resource for your audience.'
    ],
    payH: 'Payouts', pay: 'Commission is credited once the booking’s cancellation window has passed and the partner confirms it (usually 30–60 days after the trip). Approved earnings are paid out monthly.',
    formH: 'Application form', name: 'Your name or channel name', email: 'Your email', platform: 'Main platform', channel: 'Channel / account / website link', channelPh: 'https://youtube.com/@…',
    audience: 'Followers / subscribers', audiencePh: 'e.g. 12,000', contentLang: 'Content language', msg: 'Tell us a little about yourself (optional)', msgPh: 'Destinations you cover, type of content…',
    consent: 'I agree that my details are used only to review my partner application.', send: 'Send application',
    ok: 'Thank you, we have received your application! We will get back to you by email within a few days.', bad: 'Please fill in your name, email and channel link.', login: 'Already a partner? Partner login', other: 'Other'
  },
  de: {
    title: 'Vizamigo Partnerprogramm',
    lead: 'Ihr macht Reise-Content? Dann könnt ihr verdienen, indem ihr eure Community zu Vizamigo schickt. Für jede Buchung von Besuchern, die über euren persönlichen Link kommen, erhaltet ihr die Hälfte (50 %) der Provision, die uns unsere Buchungspartner zahlen.',
    h1: 'So funktioniert es',
    points: [
      'Nach der Freigabe bekommt ihr einen persönlichen Link. Einfach in Videobeschreibungen, Beiträge oder die Bio einfügen – keine Pflichtbeiträge, keine Gebühren.',
      'Besucher über euren Link werden euch 30 Tage lang zugeordnet. Flüge, Hotels, Pauschalreisen, Touren und Aktivitäten, Flughafentransfers, Auto-, Roller- und Fahrradmiete, Bahn, Bus, Fähren und eSIMs zählen alle.',
      'In eurem persönlichen Dashboard seht ihr Klicks, Buchungen und Einnahmen Tag für Tag – jederzeit.',
      'Vizamigo bietet Visa- und Einreiseregeln für 199 Länder in sechs Sprachen, zusammen mit Flug-, Hotel-, Transfer- und eSIM-Optionen – ein echter Mehrwert für eure Community.'
    ],
    payH: 'Auszahlung', pay: 'Die Provision wird gutgeschrieben, sobald die Stornofrist abgelaufen ist und der Partner die Buchung bestätigt (meist 30–60 Tage nach der Reise). Bestätigte Einnahmen werden monatlich ausgezahlt.',
    formH: 'Bewerbungsformular', name: 'Name oder Kanalname', email: 'E-Mail', platform: 'Hauptplattform', channel: 'Link zu Kanal / Profil / Website', channelPh: 'https://youtube.com/@…',
    audience: 'Follower / Abonnenten', audiencePh: 'z. B. 12.000', contentLang: 'Sprache der Inhalte', msg: 'Erzählt uns kurz von euch (optional)', msgPh: 'Reiseziele, Art der Inhalte…',
    consent: 'Ich bin einverstanden, dass meine Angaben nur zur Prüfung meiner Partnerbewerbung verwendet werden.', send: 'Bewerbung senden',
    ok: 'Danke, eure Bewerbung ist angekommen! Wir melden uns in den nächsten Tagen per E-Mail.', bad: 'Bitte Name, E-Mail und Kanal-Link ausfüllen.', login: 'Schon Partner? Partner-Login', other: 'Andere'
  },
  es: {
    title: 'Programa de socios de Vizamigo',
    lead: 'Si creas contenido de viajes, puedes ganar dinero enviando a tu audiencia a Vizamigo. Recibes la mitad (50 %) de la comisión que nos pagan nuestros socios por cada reserva hecha por visitantes que llegan con tu enlace personal.',
    h1: 'Cómo funciona',
    points: [
      'Cuando aprobemos tu solicitud, te daremos un enlace personal. Solo tienes que añadirlo a las descripciones de tus vídeos, publicaciones o biografía; sin publicaciones obligatorias ni costes.',
      'Los visitantes que llegan con tu enlace se te asignan durante 30 días. Cuentan vuelos, hoteles, viajes organizados, tours y actividades, traslados, alquiler de coches, motos y bicis, trenes, autobuses, ferris y eSIM.',
      'En tu panel personal ves tus clics, reservas y ganancias día a día, cuando quieras.',
      'Vizamigo ofrece las reglas de visado y entrada de 199 países en seis idiomas, junto con opciones de vuelos, hoteles, traslados y eSIM: un recurso realmente útil para tu audiencia.'
    ],
    payH: 'Pagos', pay: 'La comisión se acredita cuando termina el plazo de cancelación y el socio confirma la reserva (normalmente 30–60 días después del viaje). Las ganancias aprobadas se pagan mensualmente.',
    formH: 'Formulario de solicitud', name: 'Tu nombre o el de tu canal', email: 'Tu correo', platform: 'Plataforma principal', channel: 'Enlace al canal / cuenta / web', channelPh: 'https://youtube.com/@…',
    audience: 'Seguidores / suscriptores', audiencePh: 'p. ej. 12.000', contentLang: 'Idioma del contenido', msg: 'Cuéntanos un poco sobre ti (opcional)', msgPh: 'Destinos, tipo de contenido…',
    consent: 'Acepto que mis datos se usen solo para evaluar mi solicitud.', send: 'Enviar solicitud',
    ok: '¡Gracias, hemos recibido tu solicitud! Te responderemos por correo en unos días.', bad: 'Rellena tu nombre, correo y el enlace del canal.', login: '¿Ya eres socio? Acceso de socios', other: 'Otra'
  },
  ru: {
    title: 'Партнёрская программа Vizamigo',
    lead: 'Если вы создаёте контент о путешествиях, вы можете зарабатывать, направляя аудиторию на Vizamigo. Вы получаете половину (50%) комиссии, которую нам платят партнёры, с каждого бронирования посетителей, пришедших по вашей персональной ссылке.',
    h1: 'Как это работает',
    points: [
      'После одобрения вы получаете персональную ссылку. Просто добавьте её в описания видео, посты или био — без обязательных публикаций и платежей.',
      'Посетители по вашей ссылке закрепляются за вами на 30 дней. Учитываются авиабилеты, отели, туры, экскурсии и активности, трансферы, аренда авто, мото и велосипедов, поезда, автобусы, паромы и eSIM.',
      'В личном кабинете вы видите клики, бронирования и доход по дням — в любое время.',
      'Vizamigo — визовые правила и условия въезда для 199 стран на шести языках, а также авиабилеты, отели, трансферы и eSIM. Полезный ресурс для вашей аудитории.'
    ],
    payH: 'Выплаты', pay: 'Комиссия начисляется, когда истёк срок отмены и партнёр подтвердил бронирование (обычно через 30–60 дней после поездки). Подтверждённый доход выплачивается ежемесячно.',
    formH: 'Заявка', name: 'Имя или название канала', email: 'E-mail', platform: 'Основная платформа', channel: 'Ссылка на канал / аккаунт / сайт', channelPh: 'https://youtube.com/@…',
    audience: 'Подписчики', audiencePh: 'напр. 12 000', contentLang: 'Язык контента', msg: 'Пара слов о себе (необязательно)', msgPh: 'Направления, формат контента…',
    consent: 'Я согласен(на), что мои данные используются только для рассмотрения заявки.', send: 'Отправить заявку',
    ok: 'Спасибо, заявка получена! Мы ответим по e-mail в течение нескольких дней.', bad: 'Заполните имя, e-mail и ссылку на канал.', login: 'Уже партнёр? Вход для партнёров', other: 'Другое'
  },
  pt: {
    title: 'Programa de parceiros Vizamigo',
    lead: 'Se você cria conteúdo de viagem, pode ganhar dinheiro enviando seu público para a Vizamigo. Você recebe metade (50%) da comissão que nossos parceiros nos pagam por cada reserva feita por visitantes que chegam pelo seu link pessoal.',
    h1: 'Como funciona',
    points: [
      'Após a aprovação, você recebe um link pessoal. Basta colocá-lo na descrição dos vídeos, nos posts ou na bio — sem posts obrigatórios e sem custos.',
      'Os visitantes que chegam pelo seu link ficam vinculados a você por 30 dias. Contam voos, hotéis, pacotes, passeios e atividades, transfers, aluguel de carros, motos e bicicletas, trens, ônibus, balsas e eSIM.',
      'No seu painel pessoal você acompanha cliques, reservas e ganhos dia a dia, quando quiser.',
      'A Vizamigo reúne regras de visto e entrada de 199 países em seis idiomas, com opções de voos, hotéis, transfers e eSIM — um recurso realmente útil para o seu público.'
    ],
    payH: 'Pagamentos', pay: 'A comissão é creditada quando termina o prazo de cancelamento e o parceiro confirma a reserva (geralmente 30–60 dias após a viagem). Os ganhos aprovados são pagos mensalmente.',
    formH: 'Formulário de inscrição', name: 'Seu nome ou nome do canal', email: 'Seu e-mail', platform: 'Plataforma principal', channel: 'Link do canal / conta / site', channelPh: 'https://youtube.com/@…',
    audience: 'Seguidores / inscritos', audiencePh: 'ex.: 12.000', contentLang: 'Idioma do conteúdo', msg: 'Conte um pouco sobre você (opcional)', msgPh: 'Destinos, tipo de conteúdo…',
    consent: 'Concordo que meus dados sejam usados apenas para avaliar minha inscrição.', send: 'Enviar inscrição',
    ok: 'Obrigado, recebemos sua inscrição! Responderemos por e-mail em poucos dias.', bad: 'Preencha nome, e-mail e link do canal.', login: 'Já é parceiro? Acesso de parceiros', other: 'Outra'
  }
};

const CSS = `:root{--bg:#f6f7f9;--card:#fff;--ink:#0f1f24;--mut:#5b6b70;--line:#e3e8ea;--brand:#07626F}
@media (prefers-color-scheme:dark){:root{--bg:#0d1517;--card:#142023;--ink:#e8f0f1;--mut:#9fb1b5;--line:#22343a;--brand:#3fb6c4}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.6 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}a{color:var(--brand)}
.w{max-width:760px;margin:0 auto;padding:20px 16px 48px}header{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:16px}
.brand{font-weight:800;font-size:20px;color:var(--brand);text-decoration:none}h1{font-size:28px;line-height:1.25;margin:8px 0 10px}h2{font-size:18px;margin:0 0 10px}
.lead{font-size:18px}.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:18px;margin-bottom:14px}
.big{font-size:44px;font-weight:800;color:var(--brand);line-height:1}ul{padding-left:20px;margin:0}li{margin:8px 0}
label{display:block;font-size:14px;color:var(--mut);margin:12px 0 4px}input,select,textarea{font:inherit;width:100%;border:1px solid var(--line);background:var(--card);color:var(--ink);border-radius:10px;padding:10px 12px}
textarea{min-height:90px}.chk{display:flex;gap:8px;align-items:flex-start;color:var(--mut);font-size:14px;margin-top:14px}.chk input{width:auto;margin-top:4px}
button{font:inherit;border:0;background:var(--brand);color:#fff;font-weight:700;border-radius:10px;padding:12px 20px;margin-top:14px;cursor:pointer}
.msg{border-color:var(--brand);font-weight:600}.hp{position:absolute;left:-9999px}.small{font-size:14px;color:var(--mut)}`;

function page(lang: Lang, msg = '', status = 200): Response {
  const t = T[lang];
  const sel = (name: string, opts: string[]) => `<select name="${name}">${opts.map((o) => `<option>${esc(o)}</option>`).join('')}</select>`;
  const body = `<header><a class="brand" href="${SITE}/">Vizamigo</a><label class="small" style="display:flex;gap:6px;align-items:center;margin:0">🌐<select style="width:auto" onchange="location.href='/ortak/basvuru?lang='+this.value">${LANGS.map((x) => `<option value="${x}"${x === lang ? ' selected' : ''}>${LANG_NAMES[x]}</option>`).join('')}</select></label></header>
<h1>${t.title}</h1>
<div class="card"><div class="big">%50</div><p class="lead">${t.lead}</p></div>
<div class="card"><h2>${t.h1}</h2><ul>${t.points.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
<div class="card"><h2>${t.payH}</h2><p style="margin:0">${t.pay}</p></div>
${msg ? `<div class="card msg">${esc(msg)}</div>` : ''}
<div class="card" id="form"><h2>${t.formH}</h2>
<form method="post" action="/ortak/basvuru#form"><input type="hidden" name="lang" value="${lang}"><input class="hp" name="website" tabindex="-1" autocomplete="off">
<label>${t.name}</label><input name="name" required maxlength="120">
<label>${t.email}</label><input type="email" name="email" required maxlength="200" autocomplete="email">
<label>${t.platform}</label>${sel('platform', ['YouTube', 'Instagram', 'TikTok', 'Blog / Web', 'X / Twitter', 'Facebook', 'Telegram', t.other])}
<label>${t.channel}</label><input name="channel" required maxlength="300" placeholder="${esc(t.channelPh)}">
<label>${t.audience}</label><input name="audience" maxlength="40" placeholder="${esc(t.audiencePh)}">
<label>${t.contentLang}</label>${sel('content_lang', [...LANGS.map((x) => LANG_NAMES[x]), t.other])}
<label>${t.msg}</label><textarea name="message" maxlength="2000" placeholder="${esc(t.msgPh)}"></textarea>
<label class="chk"><input type="checkbox" name="consent" required> <span>${t.consent}</span></label>
<button>${t.send}</button></form></div>
<p class="small" style="text-align:center"><a href="/ortak?lang=${lang}">${t.login}</a></p>`;
  const doc = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(t.title)}</title><meta name="description" content="${esc(t.lead.slice(0, 155))}"><link rel="icon" href="/favicon.ico"><style>${CSS}</style></head><body><div class="w">${body}</div></body></html>`;
  return new Response(doc, { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': msg ? 'no-store' : 'public, max-age=0, s-maxage=3600' } });
}

export default async function handler(req: Request): Promise<Response> {
  const q = new URL(req.url).searchParams;
  if (req.method !== 'POST') return page(isLang(q.get('lang')) ? (q.get('lang') as Lang) : 'tr');
  const f = await req.formData().catch(() => null);
  const g = (k: string, n: number) => String(f?.get(k) || '').trim().slice(0, n);
  const fl = g('lang', 5);
  const lang: Lang = isLang(fl) ? fl : 'tr';
  if (g('website', 200)) return page(lang, T[lang].ok); // bot tuzağı
  const row = {
    name: g('name', 120), email: g('email', 200).toLowerCase(), platform: g('platform', 40), channel: g('channel', 300),
    audience: g('audience', 40), content_lang: g('content_lang', 40), message: g('message', 2000), lang,
    country: (req.headers.get('x-vercel-ip-country') || '').slice(0, 2) || null
  };
  if (!row.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email) || !row.channel || !f?.get('consent')) return page(lang, T[lang].bad, 400);
  if (KEY) {
    await fetch(`${SB}/rest/v1/ref_applications`, {
      method: 'POST',
      headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify(row)
    }).catch(() => {});
  }
  if (TO && env.RESEND_API_KEY) {
    const lines = Object.entries(row).map(([k, v]) => `<tr><td style="color:#5b6b70;padding:4px 10px 4px 0">${esc(k)}</td><td>${esc(v)}</td></tr>`).join('');
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to: TO, reply_to: row.email, subject: `Yeni ortaklık başvurusu: ${row.name} (${row.platform})`, html: `<div style="font-family:system-ui,sans-serif"><h2>Yeni ortaklık başvurusu</h2><table>${lines}</table></div>` })
    }).catch(() => {});
  }
  return page(lang, T[lang].ok);
}
