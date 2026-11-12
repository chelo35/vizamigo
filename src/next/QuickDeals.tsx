import React, { Suspense, lazy, useState } from 'react';
import { useI18n } from '../data/i18n';
import { tpLinks } from '../data/tpPartners';
import { GEO_DATA } from '../data/geoData';
import { getCountryName } from '../data/passportData';
import { AdTag } from './ui';
import { TileArt } from './TileArt';
import { capitalName } from '../data/capitalNames';

const QuickDealPanel = lazy(() => import('./QuickDealPanel'));

export type DealKind = 'visa' | 'flight' | 'hotel' | 'car' | 'esim' | 'transfer' | 'tour';

interface Deal {
  id: DealKind | 'insurance';
  art: string;
  t: string;
  sub: string;
  href?: string;
}

/**
 * "Hemen ucuza al": seçili ülkeye göre canlı bilgili kartlar (vize durumu, en ucuz bilet, şehir).
 * Her kartta işi yapan sitelerin logoları. Dokununca hemen altında panel açılır (panel kodu o an yüklenir).
 */
export const QuickDeals: React.FC<{ passport: string; destination: string }> = ({ passport, destination }) => {
  const { l, language } = useI18n();
  const [open, setOpen] = useState<DealKind | null>(null);
  const dest = destination && destination !== passport && GEO_DATA[destination] ? destination : 'TH';
  const from = GEO_DATA[passport] ? passport : 'TR';
  const destName = getCountryName(dest, language);
  const city = GEO_DATA[dest]?.capital ? capitalName(dest, 'en', GEO_DATA[dest].capital) : destName;
  const fromHub = (GEO_DATA[from]?.mainHub || '').split('/')[0];
  const toHub = (GEO_DATA[dest]?.mainHub || '').split('/')[0];

  const deals: Deal[] = [
    {
      id: 'visa',
      art: 'passport',
      t: l('Vize', 'Visa', 'Visum', 'Visado', 'Виза'),
      sub: l(`${destName} için kural ve başvuru`, `${destName}: rules and how to apply`, `${destName}: Regeln und Antrag`, `${destName}: requisitos y trámite`, `${destName}: правила и оформление`),
    },
    {
      id: 'flight',
      art: 'plane',
      t: l('Uçak bileti', 'Flights', 'Flüge', 'Vuelos', 'Авиабилеты'),
      sub: fromHub && toHub ? `${fromHub} → ${toHub}` : destName,
    },
    {
      id: 'hotel',
      art: 'bed',
      t: l('Otel', 'Hotels', 'Hotels', 'Hoteles', 'Отели'),
      sub: l(`${city} otelleri`, `Hotels in ${city}`, `Hotels in ${city}`, `Hoteles en ${city}`, `Отели: ${city}`),
    },
    {
      id: 'car',
      art: 'car',
      t: l('Araç kirala', 'Car rental', 'Mietwagen', 'Coche', 'Авто'),
      sub: l(`${city} havalimanında teslim`, `Pick up at ${city} airport`, `Abholung am Flughafen ${city}`, `Recogida en el aeropuerto de ${city}`, `Получение в аэропорту: ${city}`),
    },
    {
      id: 'esim',
      art: 'wifi',
      t: 'eSIM',
      sub: l(`${destName} internet paketi`, `${destName} data plan`, `${destName} Datentarif`, `Datos en ${destName}`, `Интернет: ${destName}`),
    },
    {
      id: 'transfer',
      art: 'transit',
      t: l('Transfer', 'Transfer', 'Transfer', 'Traslado', 'Трансфер'),
      sub: l(`${toHub || city} → otelin`, `${toHub || city} → your hotel`, `${toHub || city} → Hotel`, `${toHub || city} → hotel`, `${toHub || city} → отель`),
    },
    {
      id: 'tour',
      art: 'ticket',
      t: l('Tur ve bilet', 'Tours & tickets', 'Touren & Tickets', 'Tours y entradas', 'Экскурсии'),
      sub: l(`${city} turları, müze biletleri`, `${city} tours and tickets`, `${city}: Touren und Tickets`, `${city}: tours y entradas`, `${city}: экскурсии и билеты`),
    },
    {
      id: 'insurance',
      art: 'shield',
      t: l('Sigorta', 'Insurance', 'Versicherung', 'Seguro', 'Страховка'),
      sub: l('Sağlık ve iptal güvencesi', 'Medical and trip cover', 'Kranken- und Reiseschutz', 'Médico y cancelación', 'Медицина и отмена'),
      href: tpLinks.safetywing()
    }
  ];

  // Fotoğraflı kartlar: /images/cards/q-{ad}-300|600.webp (yapay zekâ ile üretilmiş sahneler)
  const PH: Record<string, string> = { passport: 'visa', plane: 'flight', bed: 'hotel', car: 'car', wifi: 'esim', transit: 'transfer', ticket: 'tours', shield: 'ins' };
  const inner = (d: Deal) =>
    PH[d.art] ? (
      <>
        <img className="vz-qd-ph" src={`/images/cards/q-${PH[d.art]}-300.webp`} srcSet={`/images/cards/q-${PH[d.art]}-300.webp 1x, /images/cards/q-${PH[d.art]}-600.webp 2x`} alt="" loading="lazy" decoding="async" />
        <span className="vz-qd-cap">
          <b className="vz-qd-t">{d.t}</b>
          <small>{d.sub}</small>
        </span>
      </>
    ) : (
      <>
        <TileArt name={d.art} size={40} />
        <b className="vz-qd-t">{d.t}</b>
      </>
    );

  return (
    <section className="vz-qd" aria-labelledby="vz-qd-h">
      <div className="vz-qd-head">
        <div>
          <span className="vz-eyebrow">{l(`${destName} yolculuğu`, `Your ${destName} trip`, `Reise: ${destName}`, `Viaje a ${destName}`, `Поездка: ${destName}`)}</span>
          <h2 id="vz-qd-h">{l('Hemen ucuza al', 'Book it cheap', 'Günstig buchen', 'Reserva barato', 'Купить дешевле')}</h2>
        </div>
        <span className="vz-qd-note">{l('Gerçek fiyatlar, güvenilir siteler', 'Live prices from trusted sites', 'Echte Preise, bekannte Anbieter', 'Precios reales, sitios fiables', 'Реальные цены, надёжные сайты')} <AdTag /></span>
      </div>
      <div className="vz-qd-grid4" role="tablist" aria-label={l('Hemen ucuza al', 'Book it cheap', 'Günstig buchen', 'Reserva barato', 'Купить дешевле')}>
        {deals.map((d) =>
          d.href ? (
            <a key={d.id} className="vz-qd-card" title={d.sub} href={d.href} target="_blank" rel="noopener noreferrer sponsored" onClick={() => setOpen(null)}>
              {inner(d)}
            </a>
          ) : (
            <button
              key={d.id}
              type="button"
              role="tab"
              aria-selected={open === d.id}
              aria-controls="vz-qd-panel"
              className={`vz-qd-card${open === d.id ? ' on' : ''}`}
              title={d.sub}
              onClick={() => setOpen(open === d.id ? null : (d.id as DealKind))}
            >
              {inner(d)}
            </button>
          )
        )}
      </div>
      {open && (
        <div id="vz-qd-panel" className="vz-qd-panel" role="tabpanel">
          <Suspense fallback={<div className="vz-muted" style={{ padding: 12 }}>…</div>}>
            <QuickDealPanel kind={open} passport={passport} destination={dest} onClose={() => setOpen(null)} />
          </Suspense>
        </div>
      )}
    </section>
  );
};
