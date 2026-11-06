import React, { useState } from 'react';
import { useI18n } from '../data/i18n';
import { Icon } from './Icon';
import { stay22 } from '../data/tpPartners';

/**
 * Tur kartında "uçuş ekle": tur (TourRadar/GetYourGuide) uçak içermediği için ziyaretçiye
 * turun başlangıç tarihine göre gidiş-dönüş uçuş araması (Aviasales) ve uçuş + otel paketi (Expedia, Stay22) sunar.
 */
const iso = (d: Date) => d.toISOString().slice(0, 10);
const ddmm = (s: string) => `${s.slice(8, 10)}${s.slice(5, 7)}`;

export const TourFlightAdd: React.FC<{ id: string; from: string; to: string; days: number }> = ({ id, from, to, days }) => {
  const { l } = useI18n();
  const [start, setStart] = useState(() => iso(new Date(Date.now() + 30 * 864e5)));
  const ok = /^[A-Z]{3}$/.test(from) && /^[A-Z]{3}$/.test(to) && from !== to;
  const end = iso(new Date(new Date(start).getTime() + Math.max(days - 1, 1) * 864e5));
  // Aviasales: KALKIŞ GGAA VARIŞ GGAA YOLCU (gidiş-dönüş)
  const flights = ok ? `https://www.aviasales.com/search/${from}${ddmm(start)}${to}${ddmm(end)}1` : 'https://www.aviasales.com/';
  const pkg = stay22('expedia', { link: 'https://www.expedia.com/Vacation-Packages', campaign: `tourpkg_${id}` });
  return (
    <div className="vz-tour-fly">
      <p className="vz-tour-fly-h"><Icon name="plane" size={16} /> {l('Tura uçuş ekle', 'Add flights to this tour', 'Flüge zur Tour hinzufügen', 'Añade vuelos al tour', 'Добавьте перелёт к туру')}</p>
      <p className="vz-tour-fly-s">{l('Tur fiyatına uçak dahil değil. Tur tarihine göre gidiş-dönüş uçuş bul ya da uçuş + otel paketine bak.', 'Flights are not included in the tour price. Find return flights for your tour dates, or compare flight + hotel packages.', 'Flüge sind nicht im Tourpreis enthalten. Finde Hin- und Rückflüge passend zu deinen Tourdaten oder vergleiche Flug + Hotel.', 'El precio del tour no incluye vuelos. Busca vuelos de ida y vuelta para tus fechas o compara paquetes vuelo + hotel.', 'Перелёт не входит в стоимость тура. Найдите билеты туда и обратно на даты тура или сравните пакеты «перелёт + отель».')}</p>
      <div className="vz-tour-fly-row">
        <label htmlFor={`fly-${id}`}>{l('Tur başlangıcı', 'Tour starts', 'Tourbeginn', 'Inicio del tour', 'Начало тура')}</label>
        <input id={`fly-${id}`} type="date" value={start} min={iso(new Date())} onChange={(e) => e.target.value && setStart(e.target.value)} />
      </div>
      <div className="vz-tour-links">
        <a href={flights} target="_blank" rel="noopener noreferrer sponsored"><Icon name="plane" size={16} /> {l('Gidiş-dönüş uçuşlar', 'Return flights', 'Hin- & Rückflug', 'Vuelos ida y vuelta', 'Билеты туда-обратно')}{ok ? ` · ${from}→${to}` : ''}</a>
        <a href={pkg} target="_blank" rel="noopener noreferrer sponsored"><Icon name="ticket" size={16} /> {l('Uçuş + otel paketi', 'Flight + hotel package', 'Flug + Hotel', 'Vuelo + hotel', 'Перелёт + отель')}</a>
      </div>
    </div>
  );
};
