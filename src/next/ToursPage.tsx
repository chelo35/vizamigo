import React, { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../data/i18n';
import { Page, VisaBadge } from './ui';
import { Icon } from './Icon';
import { Picks, type PickItem } from './Picks';
import { TOURS, toursPath, type TourDest } from '../data/tours';
import { stay22, tpLinks } from '../data/tpPartners';
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
  const title = l('Turlar ve aktiviteler', 'Tours & activities', 'Touren & Aktivitäten', 'Tours y actividades', 'Экскурсии и туры');

  useEffect(() => {
    try {
      document.title = `${title} | Vizamigo`;
    } catch {}
    // paylaşılan #bağlantıya kaydır
    const id = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
    if (id) setTimeout(() => document.getElementById(`t-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
  }, [title]);

  const share = async (t: TourDest) => {
    const url = `${window.location.origin}${toursPath(language)}#${t.id}`;
    const text = `${t.name[i]}: ${t.pitch[i]}`;
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
        'En sevilen rotalarda tur, müze bileti ve günübirlik geziler. Ücretsiz iptal seçenekli turları karşılaştır, uçuş ve oteli de aynı yerden bul.',
        'Tours, museum tickets and day trips in the most-loved destinations. Compare tours with free cancellation and find flights and hotels in one place.',
        'Touren, Museumstickets und Tagesausflüge an beliebten Zielen. Vergleiche Touren mit kostenloser Stornierung, dazu Flüge und Hotels.',
        'Tours, entradas a museos y excursiones en los destinos favoritos. Compara tours con cancelación gratuita, vuelos y hoteles.',
        'Экскурсии, билеты в музеи и однодневные поездки в любимых направлениях. Сравните туры с бесплатной отменой, перелёты и отели.'
      )}
      words={['Bangkok', 'Rome', 'Cairo', 'Dubai']}
      back={{ label: l('Keşfet', 'Explore', 'Entdecken', 'Explorar', 'Обзор'), onClick: onBack }}
    >
      <nav className="vz-tours-jump" aria-label={l('Destinasyonlar', 'Destinations', 'Ziele', 'Destinos', 'Направления')}>
        {TOURS.map((t) => (
          <a key={t.id} href={`#${t.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(`t-${t.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); try { history.replaceState(history.state, '', `#${t.id}`); } catch {} }}>{t.name[i]}</a>
        ))}
      </nav>
      <div className="vz-tours">
        {TOURS.map((t) => {
          const img = t.photo?.startsWith('/') ? t.photo : getOptimizedImageUrl(`/images/countries/${(t.photo || t.code).toLowerCase()}.webp`, { width: 480 });
          const picks: PickItem[] = [
            { id: 'getyourguide', url: stay22('getyourguide', { address: t.search, campaign: `tours_${t.id}` }) },
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
                  <button type="button" onClick={() => share(t)}><Icon name="share" size={16} /> {copied === t.id ? l('Kopyalandı', 'Copied', 'Kopiert', 'Copiado', 'Скопировано') : l('Paylaş', 'Share', 'Teilen', 'Compartir', 'Поделиться')}</button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
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
