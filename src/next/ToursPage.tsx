import React, { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../data/i18n';
import { Page, VisaBadge } from './ui';
import { Icon } from './Icon';
import { Picks, type PickItem } from './Picks';
import { TOURS, toursPath, routeName, PACKAGES, TOUR_REGIONS, LIVE, tourRadarLink, type TourRegion } from '../data/tours';
import { LiveTours } from './LiveTours';
import { TourFlightAdd } from './TourFlightAdd';
import { AdTag } from './ui';
import { stay22, tpLinks, gygLink, gygSearch } from '../data/tpPartners';
import { getOptimizedImageUrl } from '../data/countryVisuals';
import { getPassportItems } from '../utils/calculator';
import { GEO_DATA } from '../data/geoData';

const LANG_I: Record<string, number> = { tr: 0, en: 1, de: 2, es: 3, ru: 4 };

const ASIA = new Set(['TH', 'JP', 'ID', 'VN']);

/** Turlar: paylaşılabilir destinasyon kartları; her kartın kendi #adresi var (ör. /tr/info/tours#tayland). */
export const ToursPage: React.FC<{ passport: string; onBack: () => void; onOpenCountry: (c: string) => void }> = ({ passport, onBack, onOpenCountry }) => {
  const { l, language } = useI18n();
  const i = LANG_I[language] ?? 1;
  const items = useMemo(() => new Map(getPassportItems(passport).map((x) => [x.c, x])), [passport]);
  const [copied, setCopied] = useState('');
  const [view, setView] = useState<'pkg' | 'city'>(() => (typeof window !== 'undefined' && TOURS.some((t) => `#${t.id}` === window.location.hash) ? 'city' : 'pkg'));
  const [region, setRegion] = useState<TourRegion | 'all'>(() => {
    const h = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
    return (TOUR_REGIONS.find((r) => r.id === h)?.id as TourRegion) || 'all';
  });
  const [dur, setDur] = useState<'all' | 's' | 'm' | 'l'>('all');
  const pkgs = PACKAGES.filter((p) => (region === 'all' || p.region === region) && (dur === 'all' || (dur === 's' ? p.days <= 5 : dur === 'm' ? p.days >= 6 && p.days <= 9 : p.days >= 10)));
  const title = l('Turlar ve aktiviteler', 'Tours & activities', 'Touren & Aktivitäten', 'Tours y actividades', 'Экскурсии и туры');

  useEffect(() => {
    try {
      document.title = `${title} | Vizamigo`;
    } catch {}
    // paylaşılan #bağlantıya kaydır
    const id = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
    if (id) setTimeout(() => (document.getElementById(`t-${id}`) || document.getElementById(`p-${id}`))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
  }, [title]);

  const share = async (t: { id: string; name: readonly string[] }, text: string) => {
    const url = `${window.location.origin}${toursPath(language)}#${t.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${t.name[i]} · Vizamigo`, text, url });
        return;
      }
    } catch {
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(t.id);
      setTimeout(() => setCopied(''), 1800);
    } catch {}
  };

  const fromHub = (GEO_DATA[passport]?.mainHub || 'IST').split('/')[0];

  return (
    <Page
      eyebrow={l('Turlar', 'Tours', 'Touren', 'Tours', 'Туры')}
      title={title}
      sub={l(
        'Dünyanın dört bir yanında rehberli paket turlar: Asya, Balkanlar, Avrupa, Mısır, Türkiye ve Amerika. Bölgeni ve süreni seç, turları karşılaştır.',
        'Guided multi-day tours around the world: Asia, the Balkans, Europe, Egypt, Türkiye and the Americas. Pick a region and length, then compare tours.',
        'Touren, Museumstickets und Tagesausflüge an beliebten Zielen. Vergleiche Touren mit kostenloser Stornierung, dazu Flüge und Hotels.',
        'Tours, entradas a museos y excursiones en los destinos favoritos. Compara tours con cancelación gratuita, vuelos y hoteles.',
        'Экскурсии, билеты в музеи и однодневные поездки в любимых направлениях. Сравните туры с бесплатной отменой, перелёты и отели.'
      )}
      words={['Bangkok', 'Rome', 'Cairo', 'Dubai']}
      back={{ label: l('Keşfet', 'Explore', 'Entdecken', 'Explorar', 'Обзор'), onClick: onBack }}
    >
      <div className="vz-seg vz-tours-view" role="tablist">
        <button type="button" role="tab" aria-selected={view === 'pkg'} className={view === 'pkg' ? 'on' : undefined} onClick={() => setView('pkg')}><Icon name="route" size={18} /> {l('Paket turlar', 'Multi-day tours', 'Rundreisen', 'Tours de varios días', 'Многодневные туры')}</button>
        <button type="button" role="tab" aria-selected={view === 'city'} className={view === 'city' ? 'on' : undefined} onClick={() => setView('city')}><Icon name="ticket" size={18} /> {l('Şehir turları ve biletler', 'City tours & tickets', 'Stadttouren & Tickets', 'Tours urbanos y entradas', 'Экскурсии и билеты')}</button>
      </div>
      {view === 'pkg' && (
        <>
          <div className="vz-tours-filters">
            <div className="vz-tours-jump" role="group" aria-label={l('Bölge', 'Region', 'Region', 'Región', 'Регион')}>
              <button type="button" className={region === 'all' ? 'on' : undefined} onClick={() => setRegion('all')}>{l('Tüm dünya', 'Worldwide', 'Weltweit', 'Todo el mundo', 'Весь мир')}</button>
              {TOUR_REGIONS.map((r) => <button key={r.id} type="button" className={region === r.id ? 'on' : undefined} onClick={() => setRegion(r.id)}>{r.name[i]}</button>)}
            </div>
            <div className="vz-tours-jump" role="group" aria-label={l('Süre', 'Length', 'Dauer', 'Duración', 'Длительность')}>
              {([['all', l('Her süre', 'Any length', 'Jede Dauer', 'Cualquiera', 'Любая')], ['s', l('5 güne kadar', 'Up to 5 days', 'Bis 5 Tage', 'Hasta 5 días', 'До 5 дней')], ['m', l('1 hafta (6–9 gün)', 'About a week', 'Etwa 1 Woche', 'Una semana', 'Неделя')], ['l', l('10 gün ve üzeri', '10+ days', '10+ Tage', '10+ días', '10+ дней')]] as const).map(([k, t]) => (
                <button key={k} type="button" className={dur === k ? 'on' : undefined} onClick={() => setDur(k)}>{t}</button>
              ))}
            </div>
          </div>
          <div className="vz-tours">
            {pkgs.map((p) => {
              const img = p.photo || getOptimizedImageUrl(`/images/countries/${p.code.toLowerCase()}.webp`, { width: 480 });
              const regionName = TOUR_REGIONS.find((r) => r.id === p.region)!.name[i];
              const live = LIVE[p.id];
              const gyg = p.gyg ? gygLink(p.gyg, `pkg_${p.id}`) : gygSearch(p.search, `pkg_${p.id}`);
              const main = live ? tourRadarLink(`/d/${live.d}`, `pkg_${p.id}`) : gyg;
              const other: PickItem[] = [
                ...(live ? [{ id: 'getyourguide', url: gyg }] : []),
                ...(p.region === 'asia' ? [{ id: 'klook', url: tpLinks.tours(p.search.replace(/\d+ day tour.*$/i, '').trim()) }] : [])
              ];
              return (
                <article key={p.id} id={`p-${p.id}`} className="vz-tour">
                  <div className="vz-tour-img">
                    <img src={img} alt={p.name[i]} loading="lazy" decoding="async" width={480} height={300} />
                    <span className="vz-tour-days">{l(`${p.days} gün`, `${p.days} days`, `${p.days} Tage`, `${p.days} días`, `${p.days} дн.`)}</span>
                    <span className="vz-tour-tag">{regionName}</span>
                  </div>
                  <div className="vz-tour-body">
                    <div className="vz-row-flex" style={{ justifyContent: 'space-between', gap: 8 }}>
                      <h2>{p.name[i]}</h2>
                      {p.code !== passport && <VisaBadge item={items.get(p.code) || null} />}
                    </div>
                    <p className="vz-tour-route"><Icon name="pin" size={15} /> {routeName(p.route, language)}</p>
                    {live && <LiveTours pkg={p.id} />}
                    <a className="vz-btn vz-btn-primary vz-tour-cta" href={main} target="_blank" rel="noopener noreferrer sponsored">
                      <span>{live ? l('Tüm tarihler ve turlar', 'All dates & tours', 'Alle Termine & Touren', 'Todas las fechas y tours', 'Все даты и туры') : l('Paket turları ve fiyatları gör', 'See tours & prices', 'Touren & Preise ansehen', 'Ver tours y precios', 'Туры и цены')}</span>
                      <Icon name="external" size={17} duo={false} />
                    </a>
                    <span className="vz-ad-line"><AdTag /></span>
                    {other.length > 0 && <Picks label={l('Diğer tur siteleri:', 'More tour sites:', 'Weitere Anbieter:', 'Más sitios:', 'Другие сайты:')} items={other} k={p.id} />}
                    <TourFlightAdd id={p.id} from={fromHub} to={(GEO_DATA[p.code]?.mainHub || '').split('/')[0]} days={p.days} />
                    <div className="vz-tour-links">
                      {p.code !== passport && <button type="button" onClick={() => onOpenCountry(p.code)}><Icon name="passport" size={16} /> {l('Giriş şartları', 'Entry rules', 'Einreise', 'Requisitos', 'Въезд')}</button>}
                      <button type="button" onClick={() => share(p, `${p.name[i]} · ${p.days} · ${routeName(p.route, language)}`)}><Icon name="share" size={16} /> {copied === p.id ? l('Kopyalandı', 'Copied', 'Kopiert', 'Copiado', 'Скопировано') : l('Paylaş', 'Share', 'Teilen', 'Compartir', 'Поделиться')}</button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          {pkgs.length === 0 && <p className="vz-muted">{l('Bu seçimde tur yok; süreyi değiştir.', 'No tours for this choice; try another length.', 'Keine Touren; andere Dauer wählen.', 'Sin tours; prueba otra duración.', 'Нет туров; выберите другую длительность.')}</p>}
        </>
      )}
      {view === 'city' && (<>
      <nav className="vz-tours-jump" aria-label={l('Destinasyonlar', 'Destinations', 'Ziele', 'Destinos', 'Направления')}>
        {TOURS.map((t) => (
          <a key={t.id} href={`#${t.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(`t-${t.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); try { history.replaceState(history.state, '', `#${t.id}`); } catch {} }}>{t.name[i]}</a>
        ))}
      </nav>
      <div className="vz-tours">
        {TOURS.map((t) => {
          const img = t.photo?.startsWith('/') ? t.photo : getOptimizedImageUrl(`/images/countries/${(t.photo || t.code).toLowerCase()}.webp`, { width: 480 });
          const picks: PickItem[] = [
            { id: 'getyourguide', url: gygLink(t.gyg, `tours_${t.id}`) },
            { id: 'klook', url: tpLinks.tours(t.search) },
            ...(ASIA.has(t.code) ? [{ id: 'kkday', url: tpLinks.kkday() }] : [{ id: 'tiqets', url: tpLinks.tiqets() }]),
            { id: 'wegotrip', url: tpLinks.wegotrip() }
          ];
          const item = items.get(t.code) || null;
          return (
            <article key={t.id} id={`t-${t.id}`} className="vz-tour">
              <div className="vz-tour-img">
                <img src={img} alt={t.name[i]} loading="lazy" decoding="async" width={480} height={300} />
                <span className="vz-tour-tag">{t.tags[i]}</span>
                {t.credit && <small className="vz-tour-credit">{t.credit}</small>}
              </div>
              <div className="vz-tour-body">
                <div className="vz-row-flex" style={{ justifyContent: 'space-between', gap: 8 }}>
                  <h2>{t.name[i]}</h2>
                  {t.code !== passport && <VisaBadge item={item} />}
                </div>
                <p>{t.pitch[i]}</p>
                <a className="vz-btn vz-btn-primary vz-tour-cta" href={picks[0].url} target="_blank" rel="noopener noreferrer sponsored">
                  <span>{l(`${t.name[i]} turlarını gör`, `See ${t.name[i]} tours`, `${t.name[i]}: Touren ansehen`, `Ver tours en ${t.name[i]}`, `Туры: ${t.name[i]}`)}</span>
                  <Icon name="external" size={17} duo={false} />
                </a>
                <Picks label={l('Diğer tur siteleri:', 'More tour sites:', 'Weitere Anbieter:', 'Más sitios:', 'Другие сайты:')} items={picks.slice(1)} k={t.id} />
                <div className="vz-tour-links">
                  <a href={tpLinks.flights(fromHub, t.hub)} target="_blank" rel="noopener noreferrer sponsored"><Icon name="plane" size={16} /> {l('Uçak bileti', 'Flights', 'Flüge', 'Vuelos', 'Билеты')}</a>
                  <a href={stay22('booking', { address: t.search, campaign: `tours_${t.id}` })} target="_blank" rel="noopener noreferrer sponsored"><Icon name="bed" size={16} /> {l('Otel', 'Hotels', 'Hotels', 'Hoteles', 'Отели')}</a>
                  {t.code !== passport && (
                    <button type="button" onClick={() => onOpenCountry(t.code)}><Icon name="passport" size={16} /> {l('Giriş şartları', 'Entry rules', 'Einreise', 'Requisitos', 'Въезд')}</button>
                  )}
                  <button type="button" onClick={() => share(t, `${t.name[i]}: ${t.pitch[i]}`)}><Icon name="share" size={16} /> {copied === t.id ? l('Kopyalandı', 'Copied', 'Kopiert', 'Copiado', 'Скопировано') : l('Paylaş', 'Share', 'Teilen', 'Compartir', 'Поделиться')}</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      </>)}
      <p className="vz-muted" style={{ fontSize: 12.5, marginTop: 16 }}>
        {l(
          'Turlar iş ortaklarımızın sitesinde satılır; fiyat, iptal ve içerik koşulları o sitede yazar. Bu bağlantılardan yapılan rezervasyonlardan Vizamigo komisyon alabilir; senin için fiyat değişmez.',
          'Tours are sold on our partners’ sites, where price, cancellation and inclusions are shown. Vizamigo may earn a commission on bookings made through these links at no extra cost to you.',
          'Touren werden auf den Seiten unserer Partner verkauft. Vizamigo kann eine Provision erhalten; für dich ändert sich der Preis nicht.',
          'Los tours se venden en las webs de nuestros socios. Vizamigo puede recibir una comisión sin coste extra para ti.',
          'Туры продаются на сайтах партнёров. Vizamigo может получать комиссию, для вас цена не меняется.'
        )}
      </p>
    </Page>
  );
};

export default ToursPage;
