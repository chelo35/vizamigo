import React, { Suspense, lazy, useMemo, useState } from 'react';
import { useI18n } from '../data/i18n';
import { tpLinks } from '../data/tpPartners';
import { GEO_DATA } from '../data/geoData';
import { getCountryName } from '../data/passportData';
import { getPassportItems } from '../utils/calculator';
import { AdTag, VisaBadge } from './ui';
import { TileArt } from './TileArt';
import { PartnerLogo } from './PartnerLogo';
import { useFlightPrice } from './FlightPrice';

const QuickDealPanel = lazy(() => import('./QuickDealPanel'));

export type DealKind = 'visa' | 'flight' | 'hotel' | 'car' | 'esim' | 'transfer' | 'tour';

interface Deal {
  id: DealKind | 'insurance';
  art: string;
  t: string;
  sub: string;
  live?: React.ReactNode;
  brands: string[];
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
  const city = GEO_DATA[dest]?.capital || destName;
  const fromHub = (GEO_DATA[from]?.mainHub || '').split('/')[0];
  const toHub = (GEO_DATA[dest]?.mainHub || '').split('/')[0];
  const item = useMemo(() => getPassportItems(passport).find((x) => x.c === dest) || null, [passport, dest]);
  const fare = useFlightPrice(fromHub, toHub);

  const deals: Deal[] = [
    {
      id: 'visa',
      art: 'passport',
      t: l('Vize', 'Visa', 'Visum', 'Visado', 'Виза'),
      sub: l(`${destName} için kural ve başvuru`, `${destName}: rules and how to apply`, `${destName}: Regeln und Antrag`, `${destName}: requisitos y trámite`, `${destName}: правила и оформление`),
      live: <VisaBadge item={item} />,
      brands: []
    },
    {
      id: 'flight',
      art: 'plane',
      t: l('Uçak bileti', 'Flights', 'Flüge', 'Vuelos', 'Авиабилеты'),
      sub: fromHub && toHub ? `${fromHub} → ${toHub}` : destName,
      live: fare ? <span className="vz-qd-price">{l(`${fare.money}'den`, `from ${fare.money}`, `ab ${fare.money}`, `desde ${fare.money}`, `от ${fare.money}`)}</span> : <span className="vz-qd-live">{l('Canlı fiyat', 'Live fares', 'Live-Preise', 'Precios en vivo', 'Живые цены')}</span>,
      brands: ['aviasales', 'kiwi', 'tripcom']
    },
    {
      id: 'hotel',
      art: 'bed',
      t: l('Otel', 'Hotels', 'Hotels', 'Hoteles', 'Отели'),
      sub: l(`${city} otelleri`, `Hotels in ${city}`, `Hotels in ${city}`, `Hoteles en ${city}`, `Отели: ${city}`),
      live: <span className="vz-qd-live">{l('Fiyat karşılaştır', 'Compare prices', 'Preise vergleichen', 'Compara precios', 'Сравнить цены')}</span>,
      brands: ['booking', 'agoda', 'expedia']
    },
    {
      id: 'car',
      art: 'car',
      t: l('Araç kirala', 'Car rental', 'Mietwagen', 'Alquiler de coche', 'Аренда авто'),
      sub: l(`${city} havalimanında teslim`, `Pick up at ${city} airport`, `Abholung am Flughafen ${city}`, `Recogida en el aeropuerto de ${city}`, `Получение в аэропорту: ${city}`),
      live: <span className="vz-qd-live">{l('Ücretsiz iptal', 'Free cancellation', 'Kostenlos stornierbar', 'Cancelación gratis', 'Бесплатная отмена')}</span>,
      brands: ['discovercars', 'localrent', 'economybookings']
    },
    {
      id: 'esim',
      art: 'wifi',
      t: 'eSIM',
      sub: l(`${destName} internet paketi`, `${destName} data plan`, `${destName} Datentarif`, `Datos en ${destName}`, `Интернет: ${destName}`),
      live: <span className="vz-qd-live">{l('Anında QR', 'Instant QR', 'Sofort-QR', 'QR al instante', 'QR сразу')}</span>,
      brands: ['airalo', 'yesim', 'saily']
    },
    {
      id: 'transfer',
      art: 'transit',
      t: l('Havalimanı transferi', 'Airport transfer', 'Flughafentransfer', 'Traslado', 'Трансфер'),
      sub: l(`${toHub || city} → otelin`, `${toHub || city} → your hotel`, `${toHub || city} → Hotel`, `${toHub || city} → hotel`, `${toHub || city} → отель`),
      live: <span className="vz-qd-live">{l('Sabit fiyat', 'Fixed price', 'Festpreis', 'Precio fijo', 'Фикс. цена')}</span>,
      brands: ['kiwitaxi', 'gettransfer', 'welcomepickups']
    },
    {
      id: 'tour',
      art: 'ticket',
      t: l('Tur ve bilet', 'Tours & tickets', 'Touren & Tickets', 'Tours y entradas', 'Экскурсии'),
      sub: l(`${city} turları, müze biletleri`, `${city} tours and tickets`, `${city}: Touren und Tickets`, `${city}: tours y entradas`, `${city}: экскурсии и билеты`),
      live: <span className="vz-qd-live">{l('Sırasız giriş', 'Skip the line', 'Ohne Anstehen', 'Sin colas', 'Без очереди')}</span>,
      brands: ['getyourguide', 'klook', 'tiqets']
    },
    {
      id: 'insurance',
      art: 'shield',
      t: l('Seyahat sigortası', 'Travel insurance', 'Reiseversicherung', 'Seguro de viaje', 'Страховка'),
      sub: l('Sağlık ve iptal güvencesi', 'Medical and trip cover', 'Kranken- und Reiseschutz', 'Médico y cancelación', 'Медицина и отмена'),
      live: <span className="vz-qd-live">{l('Online poliçe', 'Buy online', 'Online abschließen', 'Póliza online', 'Полис онлайн')}</span>,
      brands: ['safetywing', 'hellosafe'],
      href: tpLinks.safetywing()
    }
  ];

  const inner = (d: Deal) => (
    <>
      <span className="vz-qd-top">
        <TileArt name={d.art} size={42} />
        {d.live}
      </span>
      <b className="vz-qd-t">{d.t}</b>
      <span className="vz-qd-s">{d.sub}</span>
      <span className="vz-qd-brands" aria-hidden="true">
        {d.brands.length ? d.brands.map((b) => <PartnerLogo key={b} id={b} size={24} />) : <em>{l('Resmî kaynaklı, tarihli', 'Official sources, dated', 'Amtliche Quellen, datiert', 'Fuentes oficiales, con fecha', 'Официальные источники')}</em>}
      </span>
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
            <a key={d.id} className="vz-qd-card" href={d.href} target="_blank" rel="noopener noreferrer sponsored" onClick={() => setOpen(null)}>
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
