import React, { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from '../../data/i18n';
import { GEO_DATA } from '../../data/geoData';
import { getCountryName } from '../../data/passportData';
import { getPassportItems } from '../../utils/calculator';
import { getOptimizedImageUrl } from '../../data/countryVisuals';
import { GUIDE_LABELS, GUIDE_LINKS } from '../../data/guideLinks';
import { LIVE, PACKAGES, tourCurrency, toursPath } from '../../data/tours';
import { Icon } from '../Icon';

/**
 * Yeni ana sayfa bölümleri (Trip.com / Agoda düzeni):
 * ucuz uçuş kartları, günün ülkesi turları, paket tur + kolay tatil, kural değişiklikleri + rehberler, güven şeridi.
 * Fiyatlar canlı API'lerden gelir; uydurma fiyat yok, gelmezse kart gösterilmez.
 */

const TourShowcase = lazy(() => import('../BookingHub').then((m) => ({ default: m.TourShowcase })));
const LOC: Record<string, string> = { tr: 'tr-TR', en: 'en-GB', de: 'de-DE', es: 'es-ES', ru: 'ru-RU' };
const CUR: Record<string, string> = { tr: 'try', en: 'eur', de: 'eur', es: 'eur', ru: 'eur' };
const iso = (d: Date) => d.toISOString().slice(0, 10);
const money = (v: number, c: string, lang: string) => {
  try {
    return new Intl.NumberFormat(LOC[lang] || 'en-GB', { style: 'currency', currency: c.toUpperCase(), maximumFractionDigits: 0 }).format(Math.round(v));
  } catch {
    return `${Math.round(v)} ${c.toUpperCase()}`;
  }
};
const img = (code: string, w = 480) => getOptimizedImageUrl(`/images/countries/${code.toLowerCase()}.webp`, { width: w });

/** Ekrana yaklaşınca true olur (ağ isteği sayfa açılışını yavaşlatmasın) */
const useNear = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (!('IntersectionObserver' in window)) return setNear(true);
    const io = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && setNear(true), { rootMargin: '600px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [near]);
  return [ref, near] as const;
};

const Head: React.FC<{ id: string; eyebrow: string; title: string; action?: React.ReactNode }> = ({ id, eyebrow, title, action }) => (
  <div className="vz-h2-head">
    <div>
      <span className="vz-eyebrow">{eyebrow}</span>
      <h2 id={id}>{title}</h2>
    </div>
    {action}
  </div>
);

/* ---------- Turkuaz kapak ---------- */
export const HomeHero: React.FC<{ search: React.ReactNode; chips: { label: string; onClick: () => void }[] }> = ({ search, chips }) => {
  const { l } = useI18n();
  return (
    <section className="vz-hero2" aria-label={l('Arama', 'Search', 'Suche', 'Búsqueda', 'Поиск')}>
      <div className="rd-wrap vz-hero2-in">
        <div className="vz-hero2-t">
          <span className="vz-hero2-eye">{l('Pasaport · Vize · Yolculuk', 'Passport · Visa · Travel', 'Pass · Visum · Reise', 'Pasaporte · Visado · Viaje', 'Паспорт · Виза · Поездка')}</span>
          <h1>{l('Nereye gidiyoruz?', 'Where are we going?', 'Wohin geht’s?', '¿A dónde vamos?', 'Куда едем?')}</h1>
          <p>{l('199 ülkenin vize kuralı, uçak, otel ve turlar tek aramada. Resmî kaynaklı, beş dilde, ücretsiz.', 'Visa rules for 199 countries plus flights, hotels and tours in one search. Official sources, five languages, free.', 'Visaregeln für 199 Länder plus Flüge, Hotels und Touren in einer Suche. Amtliche Quellen, fünf Sprachen, kostenlos.', 'Requisitos de visado de 199 países y vuelos, hoteles y tours en una sola búsqueda. Fuentes oficiales, cinco idiomas, gratis.', 'Визовые правила 199 стран, билеты, отели и туры в одном поиске. Официальные источники, пять языков, бесплатно.')}</p>
        </div>
        <div className="vz-hero2-chips">
          {chips.map((c) => (
            <button key={c.label} type="button" onClick={c.onClick}>{c.label}</button>
          ))}
        </div>
        <div className="vz-hero2-search">{search}</div>
      </div>
    </section>
  );
};

/* ---------- Pasaporta göre trend tatil ülkeleri (pasaport, ziyaretçinin IP'sinden gelen varsayılan) ---------- */
const TRENDS: Record<string, string[]> = {
  TR: ['TH', 'GE', 'AE', 'EG', 'BA', 'RS', 'JP', 'AZ', 'IT', 'MA'],
  DE: ['ES', 'IT', 'TR', 'GR', 'HR', 'PT', 'FR', 'TH', 'EG', 'AT'],
  GB: ['ES', 'FR', 'IT', 'PT', 'GR', 'TR', 'US', 'NL', 'HR', 'TH'],
  US: ['MX', 'CA', 'IT', 'FR', 'GB', 'JP', 'ES', 'GR', 'DO', 'PT'],
  RU: ['TR', 'AE', 'EG', 'TH', 'VN', 'GE', 'CN', 'AM', 'ID', 'LK'],
  ES: ['IT', 'FR', 'PT', 'GB', 'MA', 'GR', 'US', 'MX', 'JP', 'TH'],
  FR: ['ES', 'IT', 'PT', 'GR', 'MA', 'GB', 'US', 'TH', 'JP', 'HR'],
  IT: ['ES', 'FR', 'GR', 'PT', 'EG', 'US', 'JP', 'TH', 'HR', 'GB'],
  NL: ['ES', 'FR', 'IT', 'GR', 'TR', 'PT', 'TH', 'US', 'HR', 'AT'],
  IN: ['AE', 'TH', 'SG', 'MY', 'ID', 'VN', 'LK', 'GE', 'JP', 'GB'],
  MX: ['US', 'ES', 'CO', 'PE', 'AR', 'IT', 'FR', 'JP', 'CU', 'CA'],
  AR: ['BR', 'UY', 'CL', 'ES', 'US', 'MX', 'IT', 'PE', 'CO', 'FR'],
  CO: ['US', 'MX', 'ES', 'PE', 'AR', 'BR', 'PA', 'CL', 'DO', 'IT']
};
const GLOBAL_POP = ['TH', 'JP', 'IT', 'ES', 'FR', 'GR', 'AE', 'TR', 'PT', 'VN', 'ID', 'EG', 'MX', 'GE', 'MA', 'HR', 'MY', 'SG', 'KR', 'US', 'GB', 'BA', 'RS', 'AL', 'AZ', 'LK', 'BR', 'AR', 'PE', 'ZA'];
/** Pasaporta göre 10 öneri: önce o ülkenin trend tatil yerleri, eksikse vize kolaylığına göre küresel popüler ülkeler */
export const trendsFor = (passport: string, easyOnly = false) => {
  const items = new Map(getPassportItems(passport).map((x) => [x.c, x]));
  const easy = (c: string) => {
    const it = items.get(c);
    return !!it && (it.id || it.cat !== 'visa');
  };
  const base = (TRENDS[passport] || []).filter((c) => c !== passport && (!easyOnly || easy(c)));
  const fill = GLOBAL_POP.filter((c) => c !== passport && !base.includes(c) && easy(c));
  return [...base, ...fill].slice(0, 10);
};

/* ---------- Vizesiz rotalara en ucuz uçuşlar ---------- */
const POP = ['GE', 'AZ', 'BA', 'RS', 'MK', 'AL', 'ME', 'TH', 'MA', 'JP', 'KR', 'MY', 'ID', 'SG', 'QA', 'TN', 'JO', 'BR', 'AR', 'MX', 'CO', 'ZA', 'GB', 'FR', 'IT', 'ES', 'DE', 'GR', 'PT', 'NL', 'AE', 'TR', 'US', 'CA'];
type Fare = { code: string; hub: string; price: number; dep: string; ret: string | null; transfers: number | null; cur: string };
const fareCache = new Map<string, Promise<Fare[]>>();

export const CheapFlights: React.FC<{ passport: string; onOpenCountry: (c: string) => void }> = ({ passport, onOpenCountry }) => {
  const { l, language } = useI18n();
  const [ref, near] = useNear<HTMLElement>();
  const [fares, setFares] = useState<Fare[] | null>(null);
  const items = useMemo(() => new Map(getPassportItems(passport).map((x) => [x.c, x])), [passport]);
  const from = (GEO_DATA[passport]?.mainHub || 'IST').split('/')[0];
  const cur = CUR[language] || 'eur';
  useEffect(() => {
    if (!near) return;
    const order = [...(TRENDS[passport] || []), ...POP];
    const dest = [...new Set(order)].filter((c) => {
      const it = items.get(c);
      const hub = (GEO_DATA[c]?.mainHub || '').split('/')[0];
      return c !== passport && it && (it.id || it.cat === 'free') && /^[A-Z]{3}$/.test(hub) && hub !== from;
    }).slice(0, 7);
    const start = iso(new Date(Date.now() + 7 * 864e5));
    const end = iso(new Date(Date.now() + 75 * 864e5));
    const k = `${from}|${dest.join(',')}|${cur}`;
    if (!fareCache.has(k))
      fareCache.set(
        k,
        Promise.all(
          dest.map((code) => {
            const hub = GEO_DATA[code].mainHub.split('/')[0];
            return fetch(`/api/cheap-flights?from=${from}&to=${hub}&start=${start}&end=${end}&len=4&cur=${cur}`)
              .then((r) => (r.ok ? r.json() : null))
              .then((j) => {
                const x = j?.results?.[0];
                return x ? ({ code, hub, price: x.price, dep: x.dep, ret: x.ret, transfers: x.transfers, cur: j.currency || cur } as Fare) : null;
              })
              .catch(() => null);
          })
        ).then((list) => list.filter((x): x is Fare => !!x).sort((a, b) => a.price - b.price).slice(0, 4))
      );
    let alive = true;
    fareCache.get(k)!.then((f) => alive && setFares(f));
    return () => {
      alive = false;
    };
  }, [near, from, cur, items, passport]);
  if (fares && fares.length === 0) return <section ref={ref} />;
  const day = (s: string) => new Date(`${s}T12:00:00`).toLocaleDateString(LOC[language], { day: 'numeric', month: 'short' });
  const open = (code: string) => {
    try {
      sessionStorage.setItem('vz_cview', 'book');
      sessionStorage.setItem('vz_bk_jump', 'bk-flight');
    } catch {}
    onOpenCountry(code);
  };
  return (
    <section ref={ref} className="vz-home-sec" aria-labelledby="vz-h-fares">
      <Head
        id="vz-h-fares"
        eyebrow={l('Fırsatlar · bu hafta', 'Deals · this week', 'Angebote · diese Woche', 'Ofertas · esta semana', 'Скидки · эта неделя')}
        title={l('Vizesiz rotalara en ucuz uçuşlar', 'Cheapest flights to visa-free places', 'Günstigste Flüge zu visumfreien Zielen', 'Vuelos más baratos a destinos sin visado', 'Самые дешёвые билеты туда, где не нужна виза')}
      />
      <div className="vz-fares">
        {(fares || [0, 1, 2, 3]).map((f, i) =>
          typeof f === 'number' ? (
            <div key={i} className="vz-fare sk" aria-hidden="true" />
          ) : (
            <button key={f.code} type="button" className="vz-fare" onClick={() => open(f.code)}>
              <img src={img(f.code)} alt="" loading="lazy" decoding="async" />
              <span className="vz-fare-b">
                <small className="ok">{items.get(f.code)?.id ? l('Kimlikle giriş', 'ID card entry', 'Einreise mit Ausweis', 'Entrada con DNI', 'По ID-карте') : l('Vizesiz', 'Visa-free', 'Visumfrei', 'Sin visado', 'Без визы')}{/^\d+$/.test(items.get(f.code)?.v || '') ? ` · ${items.get(f.code)!.v} ${l('gün', 'days', 'Tage', 'días', 'дн.')}` : ''}</small>
                <b>{getCountryName(f.code, language)} <span>{from} → {f.hub}</span></b>
                <small>{day(f.dep)}{f.ret ? ` – ${day(f.ret)}` : ''}{f.transfers === 0 ? ` · ${l('aktarmasız', 'non-stop', 'nonstop', 'directo', 'без пересадок')}` : ''}</small>
                <strong>{money(f.price, f.cur, language)}</strong>
              </span>
            </button>
          )
        )}
      </div>
      <p className="vz-h2-note">{l('Aviasales’te son günlerde görülen en düşük gidiş-dönüş fiyatları, kişi başı. Karta dokununca o ülkenin uçuş bölümü açılır.', 'Lowest return fares seen on Aviasales recently, per person. Tap a card to open that country’s flights.', 'Niedrigste kürzlich gesehene Hin- und Rückflugpreise auf Aviasales, pro Person.', 'Tarifas de ida y vuelta más bajas vistas en Aviasales, por persona.', 'Минимальные цены туда-обратно на Aviasales, на человека.')}</p>
    </section>
  );
};

/* ---------- Günün ülkesi: günübirlik turlar ---------- */
export const DayTours: React.FC<{ passport: string }> = ({ passport }) => {
  const { l, language } = useI18n();
  const [ref, near] = useNear<HTMLElement>();
  // Pasaporta göre 10 trend ülke; günün ülkesi her gün sıradaki
  const list = useMemo(() => trendsFor(passport), [passport]);
  const start = Math.floor(Date.now() / 864e5) % Math.max(list.length, 1);
  const chips = useMemo(() => list.map((_, k) => list[(start + k) % list.length]), [list, start]);
  const [pick, setPick] = useState('');
  const code = pick && chips.includes(pick) ? pick : chips[0] || 'TH';
  const setCode = setPick;
  const en = getCountryName(code, 'en');
  // Viator'da aynı adı taşıyan başka yerler var (Georgia = ABD eyaleti): bu ülkelerde başkentle aranır
  const AMBIG: Record<string, string> = { GE: 'Tbilisi', JO: 'Amman', MC: 'Monaco', LU: 'Luxembourg', SG: 'Singapore' };
  const tq = AMBIG[code] || en;
  return (
    <section ref={ref} className="vz-home-sec" aria-labelledby="vz-h-day">
      <Head
        id="vz-h-day"
        eyebrow={l('Günün ülkesi', 'Country of the day', 'Land des Tages', 'País del día', 'Страна дня')}
        title={l(`${getCountryName(code, language)}: turlar ve aktiviteler`, `Things to do in ${en}`, `Erlebnisse: ${getCountryName(code, language)}`, `Qué hacer en ${getCountryName(code, language)}`, `Чем заняться: ${getCountryName(code, language)}`)}
        action={
          <div className="vz-h2-chips" role="group" aria-label={l('Ülke', 'Country', 'Land', 'País', 'Страна')}>
            {chips.map((c) => (
              <button key={c} type="button" className={c === code ? 'on' : ''} onClick={() => setCode(c)}>{getCountryName(c, language)}</button>
            ))}
          </div>
        }
      />
      <div className="vz-daytours">
        {near && (
          <Suspense fallback={<div className="vz-skel" style={{ height: 320 }} />}>
            <TourShowcase key={code} q={tq} country={en} n={8} money={(v: number, c: string) => money(v, c, language)} fallback={<p className="vz-h2-note">{l('Bu ülke için turlar şu an yüklenemedi.', 'Tours could not be loaded right now.', 'Touren konnten nicht geladen werden.', 'No se pudieron cargar los tours.', 'Не удалось загрузить экскурсии.')}</p>} />
          </Suspense>
        )}
      </div>
    </section>
  );
};

/* ---------- Paket turlar (uçak hariç) + Kolay tatil ---------- */
const FEATURED = ['thailand-10', 'balkans-8', 'japan-12', 'egypt-8'];
export const PackEasy: React.FC<{ onEasy: () => void; onPlanner: () => void }> = ({ onEasy, onPlanner }) => {
  const { l, language } = useI18n();
  const i = Math.max(0, ['tr', 'en', 'de', 'es', 'ru'].indexOf(language));
  const base = toursPath(language);
  const list = FEATURED.map((id) => PACKAGES.find((p) => p.id === id)).filter((p): p is (typeof PACKAGES)[number] => !!p);
  // Canlı "başlayan fiyat" (TourRadar): ekrana yaklaşınca yüklenir, gelmezse yalnızca gün sayısı görünür
  const [ref, near] = useNear<HTMLElement>();
  const [from, setFrom] = useState<Record<string, string>>({});
  useEffect(() => {
    if (!near) return;
    let alive = true;
    const cur = tourCurrency(language);
    FEATURED.forEach((id) => {
      const cfg = LIVE[id];
      if (!cfg) return;
      const qs = new URLSearchParams({ q: cfg.q, c: cfg.c.join(','), min: String(cfg.min), max: String(cfg.max), cur, n: '3', cmp: `pkg_${id}` });
      fetch(`/api/tours?${qs}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((j) => {
          const ps = (j?.tours || []).map((t: { price?: number }) => t.price).filter((v: unknown): v is number => typeof v === 'number' && v > 0);
          if (alive && ps.length) setFrom((m) => ({ ...m, [id]: money(Math.min(...ps), j.currency || cur, language) }));
        })
        .catch(() => {});
    });
    return () => {
      alive = false;
    };
  }, [near, language]);
  return (
    <section ref={ref} className="vz-home-sec vz-pe" aria-label={l('Paket turlar ve kolay tatil', 'Multi-day tours and easy trip', 'Rundreisen und einfache Reise', 'Tours y viaje fácil', 'Туры и лёгкая поездка')}>
      <div className="vz-pe-card">
        <span className="vz-eyebrow">{l('Rehberli · konaklama dahil', 'Guided · stays included', 'Geführt · Unterkunft inklusive', 'Guiados · alojamiento incluido', 'С гидом · проживание включено')}</span>
        <h2>{l('Paket turlar', 'Multi-day tours', 'Rundreisen', 'Tours de varios días', 'Многодневные туры')}</h2>
        <p className="vz-pe-note"><Icon name="plane" size={15} /> {l('Uçak bileti fiyata dahil değil; her turda, tur tarihine göre uçuşu tek dokunuşla ekleyebilirsin.', 'Flights are not included; on every tour you can add flights for your tour dates in one tap.', 'Flüge sind nicht inklusive; bei jeder Tour kannst du passende Flüge mit einem Tipp hinzufügen.', 'Los vuelos no están incluidos; en cada tour puedes añadir vuelos para tus fechas con un toque.', 'Перелёт не включён; к каждому туру можно добавить билеты на ваши даты одним нажатием.')}</p>
        <div className="vz-pe-list">
          {list.map((p) => (
            <a key={p.id} href={`${base}#${p.id}`}>
              <img src={p.photo || img(p.code, 240)} alt="" loading="lazy" decoding="async" />
              <span>
                <b>{p.name[i]}</b>
                <small>{p.route}</small>
              </span>
              <span className="vz-pe-r">
                <em>{l(`${p.days} gün`, `${p.days} days`, `${p.days} Tage`, `${p.days} días`, `${p.days} дн.`)}</em>
                {from[p.id] && <strong><small>{l('başlangıç', 'from', 'ab', 'desde', 'от')}</small>{from[p.id]}</strong>}
              </span>
            </a>
          ))}
        </div>
        <a className="vz-btn vz-btn-soft sm" href={base}>{l('Tüm paket turlar', 'All multi-day tours', 'Alle Rundreisen', 'Todos los tours', 'Все туры')}</a>
      </div>
      <div className="vz-pe-card easy">
        <span className="vz-eyebrow">{l('Kolay tatil', 'Easy trip', 'Einfache Reise', 'Viaje fácil', 'Лёгкая поездка')}</span>
        <h2>{l('Uçuş + otel + transfer + sigorta, tek planda', 'Flights + hotel + transfer + insurance in one plan', 'Flug + Hotel + Transfer + Versicherung in einem Plan', 'Vuelo + hotel + traslado + seguro en un plan', 'Перелёт + отель + трансфер + страховка в одном плане')}</h2>
        <p>{l('Tarihine göre uçuş fiyatını, oteli ve toplam bütçeyi birlikte hesaplar; daha ucuz alternatif günleri önerir.', 'Works out flight price, hotel and total budget for your dates, and suggests cheaper days.', 'Berechnet Flugpreis, Hotel und Gesamtbudget für deine Daten und schlägt günstigere Tage vor.', 'Calcula vuelo, hotel y presupuesto total para tus fechas y sugiere días más baratos.', 'Считает билеты, отель и общий бюджет на ваши даты и предлагает более дешёвые дни.')}</p>
        <div className="vz-actions">
          <button type="button" className="vz-btn vz-btn-primary sm" onClick={onEasy}>{l('Planlamaya başla', 'Start planning', 'Planung starten', 'Empezar a planificar', 'Начать')}</button>
          <button type="button" className="vz-btn vz-btn-ghost sm" onClick={onPlanner}>{l('Seyahat planlayıcı', 'Trip planner', 'Reiseplaner', 'Planificador', 'Планировщик')}</button>
        </div>
      </div>
    </section>
  );
};

/* ---------- Güncel rehberler (haritanın altında, sıkı liste) ---------- */
export const ChangesGuides: React.FC = () => {
  const { l, language } = useI18n();
  const labels = GUIDE_LABELS[language] || GUIDE_LABELS.en;
  const guides = GUIDE_LINKS.filter((g) => labels[g.id]);
  return (
    <div className="vz-side">
      <div className="vz-side-card">
        <span className="vz-eyebrow">{l('Güncel', 'Up to date', 'Aktuell', 'Actualizado', 'Актуально')}</span>
        <h3>{l('Güncel rehberler: kaynaklı ve tarihli', 'Travel rules 2026: sourced and dated', 'Reiseregeln 2026: mit Quellen und Datum', 'Normas de viaje 2026: con fuentes y fecha', 'Правила въезда 2026: с источниками и датой')}</h3>
        <ul className="vz-side-links">
          {guides.map((g) => (
            <li key={g.id}>
              <a href={`/${language}/info/${g.id}`}>
                <Icon name={g.icon as never} size={16} />
                {labels[g.id].t}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/* ---------- Güven şeridi ---------- */
export const TrustStrip: React.FC = () => {
  const { l } = useI18n();
  return (
    <div className="vz-trust">
      <span><Icon name="shield" size={16} />{l('Resmî kaynaklı vize bilgisi, kontrol tarihiyle', 'Official-source visa info with check dates', 'Visa-Infos aus amtlichen Quellen mit Prüfdatum', 'Información oficial con fecha de revisión', 'Официальные данные с датой проверки')}</span>
      <span><Icon name="globe" size={16} />{l('199 ülke · 5 dil', '199 countries · 5 languages', '199 Länder · 5 Sprachen', '199 países · 5 idiomas', '199 стран · 5 языков')}</span>
      <span><Icon name="handshake" size={16} />{l('Fiyatlar güvenilir ortaklardan: Aviasales, Booking, Viator', 'Prices from trusted partners: Aviasales, Booking, Viator', 'Preise von Partnern: Aviasales, Booking, Viator', 'Precios de socios: Aviasales, Booking, Viator', 'Цены партнёров: Aviasales, Booking, Viator')}</span>
      <span><Icon name="check" size={16} />{l('Ücretsiz, üyelik gerekmez', 'Free, no sign-up needed', 'Kostenlos, ohne Anmeldung', 'Gratis, sin registro', 'Бесплатно, без регистрации')}</span>
    </div>
  );
};
