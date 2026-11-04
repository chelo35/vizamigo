import React, { Suspense, lazy, useState } from 'react';
import { useI18n } from '../data/i18n';
import { Icon, type IconName } from './Icon';
import { tpLinks } from '../data/tpPartners';
import { AdTag } from './ui';

const QuickDealPanel = lazy(() => import('./QuickDealPanel'));

export type DealKind = 'visa' | 'flight' | 'hotel' | 'car' | 'esim' | 'transfer' | 'tour';

/**
 * "Hemen ucuza al": ana sayfanın üstünde küçük düğmeler.
 * Dokununca hemen altında küçük bir panel açılır (panel kodu yalnızca o an yüklenir).
 */
export const QuickDeals: React.FC<{ passport: string; destination: string }> = ({ passport, destination }) => {
  const { l } = useI18n();
  const [open, setOpen] = useState<DealKind | null>(null);
  const items: { id: DealKind; icon: IconName; t: string }[] = [
    { id: 'visa', icon: 'passport', t: l('Vize', 'Visa', 'Visum', 'Visado', 'Виза') },
    { id: 'flight', icon: 'plane', t: l('Ucuz uçak bileti', 'Cheap flights', 'Billigflüge', 'Vuelos baratos', 'Дешёвые билеты') },
    { id: 'hotel', icon: 'bed', t: l('Otel', 'Hotels', 'Hotels', 'Hoteles', 'Отели') },
    { id: 'car', icon: 'car', t: l('Araç kirala', 'Car rental', 'Mietwagen', 'Coche', 'Авто') },
    { id: 'esim', icon: 'wifi', t: 'eSIM' },
    { id: 'transfer', icon: 'pin', t: l('Transfer', 'Transfer', 'Transfer', 'Traslado', 'Трансфер') },
    { id: 'tour', icon: 'ticket', t: l('Tur ve bilet', 'Tours', 'Touren', 'Tours', 'Экскурсии') }
  ];
  return (
    <section className="vz-qd" aria-label={l('Hemen ucuza al', 'Book it cheap', 'Günstig buchen', 'Reserva barato', 'Купить дешевле')}>
      <div className="vz-qd-head">
        <b>{l('Hemen ucuza al', 'Book it cheap', 'Günstig buchen', 'Reserva barato', 'Купить дешевле')}</b>
        <span>{l('Gerçek fiyatlar, tek dokunuş', 'Live prices, one tap', 'Echte Preise, ein Tipp', 'Precios reales, un toque', 'Реальные цены в одно касание')}</span>
        <AdTag />
      </div>
      <div className="vz-qd-btns" role="tablist">
        {items.map((it) => (
          <button
            key={it.id}
            type="button"
            role="tab"
            aria-selected={open === it.id}
            aria-controls="vz-qd-panel"
            className={open === it.id ? 'on' : undefined}
            onClick={() => setOpen(open === it.id ? null : it.id)}
          >
            <Icon name={it.icon} size={18} />
            <span>{it.t}</span>
          </button>
        ))}
        <a href={tpLinks.safetywing()} target="_blank" rel="noopener noreferrer sponsored" onClick={() => setOpen(null)}>
          <Icon name="shield" size={18} />
          <span>{l('Sigorta', 'Insurance', 'Versicherung', 'Seguro', 'Страховка')}</span>
        </a>
      </div>
      {open && (
        <div id="vz-qd-panel" className="vz-qd-panel" role="tabpanel">
          <Suspense fallback={<div className="vz-muted" style={{ padding: 12 }}>…</div>}>
            <QuickDealPanel kind={open} passport={passport} destination={destination} onClose={() => setOpen(null)} />
          </Suspense>
        </div>
      )}
    </section>
  );
};
