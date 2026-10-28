import React, { useMemo, useState } from 'react';
import { buildHubs } from './toolHubs';
import { useI18n } from '../../data/i18n';
import { SeaHero } from './SeaHero';
import { LiveStrip, loadDestination } from './LiveStrip';
import { PassportCover } from './PassportCover';
import { HubGrid, Hub } from './HubGrid';
import { getPassportItems } from '../../utils/calculator';
import { getCountryName } from '../../data/passportData';
import { ALL_WORLD_HUBS, flagToIso } from '../../data/worldHubs';
import { GEO_DATA } from '../../data/geoData';

interface Props {
  currentPassport: string;
  secondaryPassport: string;
  onSearch: (q: string) => void;
  onOpenPassportSelector: () => void;
  onOpenCountry: (code: string) => void;
  onOpenAuditConsole: () => void;
  onOpenPackingList: () => void;
  onOpenTippingCalc: () => void;
  onOpenTimezoneOverlap: () => void;
  onOpenGlobalRadar: (mode?: 'all' | 'clock' | 'weather' | 'currency', city?: string) => void;
}

export const HomeDashboard: React.FC<Props> = (p) => {
  const { l, language } = useI18n();
  const [destination, setDestination] = useState<string>(() => loadDestination());
  const [openReq, setOpenReq] = useState<{ id: string; tab?: string; nonce: number } | null>(null);
  const openHub = (id: string, tab?: string) => setOpenReq({ id, tab, nonce: Date.now() });

  const changeDest = (c: string) => {
    setDestination(c);
    try {
      localStorage.setItem('vz_destination_v1', c);
    } catch {}
  };

  const counts = useMemo(() => {
    const items = getPassportItems(p.currentPassport);
    let free = 0, easy = 0, visa = 0;
    items.forEach((it) => {
      if (it.cat === 'free' || it.id) free++;
      else if (it.cat === 'evisa' || it.cat === 'voa' || it.cat === 'eta') easy++;
      else if (it.cat === 'visa') visa++;
    });
    return { free, easy, visa, total: items.length || 1 };
  }, [p.currentPassport]);

  const destCity = useMemo(() => {
    const geo = GEO_DATA[destination];
    const hubs = ALL_WORLD_HUBS.filter((h) => (h.iso || flagToIso(h.flag)) === destination);
    return (hubs.find((h) => geo && h.city === geo.capital) || hubs[0])?.city;
  }, [destination]);

  const passName = getCountryName(p.currentPassport, language);
  const destName = getCountryName(destination, language);

  const hubs: Hub[] = buildHubs({ l, p, counts, passName, destName, destination, destCity, openHub });

  const pct = (n: number) => `${Math.round((n / counts.total) * 100)}%`;

  return (
    <div className="rd-home">
      <SeaHero
        onSearch={p.onSearch}
        chips={[
          { label: l('Nereye gidebilirim?', 'Where can I go?', 'Wohin kann ich?', '¿Dónde puedo ir?', 'Куда можно?'), onClick: () => openHub('passport', 'where') },
          { label: l('Schengen gün sayacı', 'Schengen day counter', 'Schengen-Rechner', 'Contador Schengen', 'Счётчик Шенгена'), onClick: () => openHub('stay', 'schengen') },
          { label: l('Bavul listesi', 'Packing list', 'Packliste', 'Maleta', 'Багаж'), onClick: () => openHub('prep', 'pack') }
        ]}
      />
      <div className="rd-wrap">
        <LiveStrip passport={p.currentPassport} destination={destination} onDestinationChange={changeDest} onOpenRoutePlanner={() => openHub('explore', 'route')} />

        <section className="rd-pass" aria-label={l('Pasaportum', 'My passport', 'Mein Pass', 'Mi pasaporte', 'Мой паспорт')}>
          <PassportCover code={p.currentPassport} onClick={p.onOpenPassportSelector} />
          <div className="rd-pass-info">
            <span className="rd-eyebrow">{l('Pasaportum', 'My passport', 'Mein Pass', 'Mi pasaporte', 'Мой паспорт')}</span>
            <h2>{l(`${passName} pasaportuyla dünya`, `The world with a ${passName} passport`, `Die Welt mit Pass: ${passName}`, `El mundo con pasaporte de ${passName}`, `Мир с паспортом: ${passName}`)}</h2>
            <p className="rd-sub">{l('Kapağa dokunarak pasaportunu değiştir; bütün panolar yeniden hesaplanır.', 'Tap the cover to change passport; every panel recalculates.', 'Tippe auf den Pass, um ihn zu wechseln.', 'Toca la portada para cambiar de pasaporte.', 'Нажмите на обложку, чтобы сменить паспорт.')}</p>
            <div className="rd-bars">
              <div className="rd-bar"><span>{l('Vizesiz / kimlikle', 'Visa-free / ID', 'Visumfrei / Ausweis', 'Sin visado / DNI', 'Без визы')}</span><div className="rd-tr"><div className="rd-fl" style={{ width: pct(counts.free) }} /></div><b>{counts.free}</b></div>
              <div className="rd-bar"><span>{l('E-vize / kapıda', 'eVisa / on arrival', 'eVisum / bei Ankunft', 'eVisa / a la llegada', 'eVisa / по прилёте')}</span><div className="rd-tr"><div className="rd-fl sun" style={{ width: pct(counts.easy) }} /></div><b>{counts.easy}</b></div>
              <div className="rd-bar"><span>{l('Vize gerekli', 'Visa required', 'Visum nötig', 'Visado necesario', 'Нужна виза')}</span><div className="rd-tr"><div className="rd-fl mute" style={{ width: pct(counts.visa) }} /></div><b>{counts.visa}</b></div>
            </div>
            <div className="rd-actions">
              <button type="button" className="rd-btn" onClick={() => openHub('passport', 'where')}>{l('Nereye gidebilirim?', 'Where can I go?', 'Wohin kann ich?', '¿Dónde puedo ir?', 'Куда можно?')}</button>
              <button type="button" className="rd-btn ghost" onClick={() => openHub('passport', 'compare')}>{l('Pasaport karşılaştır', 'Compare passports', 'Pässe vergleichen', 'Comparar', 'Сравнить')}</button>
            </div>
          </div>
        </section>

        <section className="rd-hubs" aria-label={l('Panolar', 'Panels', 'Bereiche', 'Paneles', 'Разделы')}>
          <div className="rd-sec-head">
            <div>
              <span className="rd-eyebrow">{l('Panolar', 'Panels', 'Bereiche', 'Paneles', 'Разделы')}</span>
              <h2>{l('İlgili araçlar bir arada', 'Related tools together', 'Zusammengehörige Werkzeuge', 'Herramientas relacionadas', 'Связанные инструменты')}</h2>
            </div>
            <span className="rd-sub">{l('Karta dokun: altında sekmeleriyle açılır', 'Tap a card: it opens below with tabs', 'Karte antippen: öffnet sich darunter', 'Toca una tarjeta: se abre debajo', 'Нажмите: откроется ниже')}</span>
          </div>
          <HubGrid hubs={hubs} openRequest={openReq} />
        </section>
      </div>
    </div>
  );
};
