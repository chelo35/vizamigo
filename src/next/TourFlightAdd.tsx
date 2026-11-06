import React, { useState } from 'react';
import { useI18n } from '../data/i18n';
import { Icon } from './Icon';

/**
 * Tur kartında "uçuş ekle": tur (TourRadar/GetYourGuide) uçak içermediği için ziyaretçiye
 * turun başlangıç tarihine göre gidiş-dönüş uçuş araması (Aviasales) sunar (konaklama turun içinde).
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
  return (
    <div className="vz-tour-fly">
      <p className="vz-tour-fly-h"><Icon name="plane" size={16} /> {l('Tura uçuş ekle', 'Add flights to this tour', 'Flüge zur Tour hinzufügen', 'Añade vuelos al tour', 'Добавьте перелёт к туру')}</p>
      <p className="vz-tour-fly-s">{l('Konaklama turun içinde, uçak bileti dahil değil. Tur tarihine göre gidiş-dönüş uçuşu buradan bul.', 'Accommodation is included, flights are not. Find return flights for your tour dates here.', 'Unterkunft ist inklusive, Flüge nicht. Finde hier Hin- und Rückflüge passend zu deinen Tourdaten.', 'El alojamiento está incluido, los vuelos no. Busca aquí vuelos de ida y vuelta para tus fechas.', 'Проживание включено, перелёт — нет. Найдите здесь билеты туда и обратно на даты тура.')}</p>
      <div className="vz-tour-fly-row">
        <label htmlFor={`fly-${id}`}>{l('Tur başlangıcı', 'Tour starts', 'Tourbeginn', 'Inicio del tour', 'Начало тура')}</label>
        <input id={`fly-${id}`} type="date" value={start} min={iso(new Date())} onChange={(e) => e.target.value && setStart(e.target.value)} />
      </div>
      <div className="vz-tour-links">
        <a href={flights} target="_blank" rel="noopener noreferrer sponsored"><Icon name="plane" size={16} /> {l('Gidiş-dönüş uçuşlar', 'Return flights', 'Hin- & Rückflug', 'Vuelos ida y vuelta', 'Билеты туда-обратно')}{ok ? ` · ${from}→${to}` : ''}</a>
      </div>
    </div>
  );
};
