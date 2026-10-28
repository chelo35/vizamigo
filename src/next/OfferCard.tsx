import React, { useEffect, useState } from 'react';
import { useI18n } from '../data/i18n';
import { GEO_DATA } from '../data/geoData';
import { getCountryName } from '../data/passportData';
import { tpLinks } from '../data/tpPartners';
import { Icon } from './Icon';
import { PartnerLogo } from './PartnerLogo';

/**
 * Nazik teklif kartı: ziyaretçi ülke sayfasını gerçekten okuyunca (sayfanın yarısına inince ya da
 * 25 sn kalınca) altta küçük bir kart çıkar. Yeni sekme zorla açılmaz; tıklarsa partnere gider
 * (ortaklık bağlantısı, Drive ile komisyon). ✕ ile kapatılırsa o gün bir daha çıkmaz.
 */
const KEY = 'vz_offer_closed';
const today = () => new Date().toISOString().slice(0, 10);

export const OfferCard: React.FC<{ code: string; passport: string }> = ({ code, passport }) => {
  const { l, language } = useI18n();
  const [show, setShow] = useState(false);
  const [gone, setGone] = useState(() => {
    try {
      return localStorage.getItem(KEY) === today();
    } catch {
      return false;
    }
  });

  useEffect(() => {
    setShow(false);
    if (gone || code === passport) return;
    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setShow(true);
      cleanup();
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.45) reveal();
    };
    const t = window.setTimeout(reveal, 25000);
    window.addEventListener('scroll', onScroll, { passive: true });
    const cleanup = () => {
      window.clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
    };
    return cleanup;
  }, [code, passport, gone]);

  if (gone || !show || code === passport) return null;

  const name = getCountryName(code, language);
  const nameEn = getCountryName(code, 'en');
  const geo = GEO_DATA[code];
  const hub = (geo?.mainHub || '').split('/')[0];
  const home = (GEO_DATA[passport]?.mainHub || '').split('/')[0];
  const close = () => {
    try {
      localStorage.setItem(KEY, today());
    } catch {}
    setGone(true);
  };
  const links = [
    { id: 'booking', url: tpLinks.booking(`${geo?.capital || nameEn}, ${nameEn}`), label: l('Oteller', 'Hotels', 'Hotels', 'Hoteles', 'Отели') },
    { id: 'aviasales', url: tpLinks.flights(home, hub), label: l('Uçuşlar', 'Flights', 'Flüge', 'Vuelos', 'Авиабилеты') },
    { id: 'yesim', url: tpLinks.yesim(), label: 'eSIM' }
  ];

  return (
    <aside className="vz-offer" role="complementary" aria-label={l('Yolculuk önerisi', 'Trip suggestion', 'Reisetipp', 'Sugerencia de viaje', 'Совет')}>
      <button type="button" className="vz-offer-x" onClick={close} aria-label={l('Kapat', 'Close', 'Schließen', 'Cerrar', 'Закрыть')}>
        <Icon name="close" size={16} duo={false} />
      </button>
      <b className="vz-offer-t">
        ✈️ {l(`${name} yolculuğunu planlıyor musun?`, `Planning a trip to ${name}?`, `Reise nach ${name} geplant?`, `¿Planeas viajar a ${name}?`, `Собираетесь в ${name}?`)}
      </b>
      <span className="vz-offer-s">{l('Güncel fiyatlara tek dokunuşla bak.', 'Check current prices in one tap.', 'Aktuelle Preise mit einem Tipp.', 'Mira precios actuales con un toque.', 'Актуальные цены в одно касание.')}</span>
      <div className="vz-offer-a">
        {links.map((x) => (
          <a key={x.id} href={x.url} target="_blank" rel="noopener noreferrer sponsored" className="vz-offer-b">
            <PartnerLogo id={x.id} size={22} />
            <span>{x.label}</span>
          </a>
        ))}
      </div>
    </aside>
  );
};
