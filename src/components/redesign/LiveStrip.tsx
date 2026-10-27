import React, { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../../data/i18n';
import { ALL_WORLD_HUBS, flagToIso } from '../../data/worldHubs';
import { GEO_DATA } from '../../data/geoData';
import { GLOBAL_CURRENCIES } from '../../data/countryGeography';
import { getCrossRate } from '../../data/currencyRates';
import { useLiveFx, useLiveWeather, liveWeatherKey, weatherCodeInfo } from '../../utils/liveData';
import { getCountryName, getCategoryBadgeLabel } from '../../data/passportData';
import { getPassportItems } from '../../utils/calculator';
import { loadStoredRouteStops } from '../../utils/storage';

const DEST_KEY = 'vz_destination_v1';

export function loadDestination(): string {
  try {
    const stops = loadStoredRouteStops();
    const today = new Date().toISOString().slice(0, 10);
    const next = stops.filter((s) => s.entryDate && s.entryDate >= today).sort((a, b) => a.entryDate.localeCompare(b.entryDate))[0];
    if (next?.countryCode) return next.countryCode;
    return localStorage.getItem(DEST_KEY) || 'TH';
  } catch {
    return 'TH';
  }
}

interface Props {
  passport: string;
  destination: string;
  onDestinationChange: (code: string) => void;
  onOpenRoutePlanner: () => void;
}

function WeatherGlyph({ code, isDay }: { code: number; isDay: boolean }) {
  const rain = code >= 51 && code <= 82;
  const cloud = code >= 2;
  return (
    <svg width="54" height="54" viewBox="0 0 54 54" aria-hidden="true" className="rd-wx">
      {!cloud || code === 2 ? (
        isDay ? <g className="rd-wx-sun"><circle cx="24" cy="22" r="11" /></g> : <path className="rd-wx-moon" d="M30 10a13 13 0 1 0 8 23 11 11 0 0 1-8-23z" />
      ) : null}
      {cloud && <path className="rd-wx-cloud" d="M16 40h24a8 8 0 0 0 0-16 11 11 0 0 0-21-2 8 8 0 0 0-3 18z" />}
      {rain && <path className="rd-wx-rain" d="M20 44l-2 5M28 44l-2 5M36 44l-2 5" />}
    </svg>
  );
}

export const LiveStrip: React.FC<Props> = ({ passport, destination, onDestinationChange, onOpenRoutePlanner }) => {
  const { l, language } = useI18n();
  useLiveFx();
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const geo = GEO_DATA[destination];
  const hub = useMemo(() => {
    const inCountry = ALL_WORLD_HUBS.filter((h) => (h.iso || flagToIso(h.flag)) === destination);
    return inCountry.find((h) => geo && (h.city === geo.capital || h.cityTr === geo.capital)) || inCountry[0];
  }, [destination, geo]);
  const tz = hub?.tz || 'UTC';
  const cityName = hub ? (language === 'tr' ? hub.cityTr || hub.city : hub.city) : getCountryName(destination, language);

  const coords = useMemo(() => (geo ? [{ lat: geo.lat, lng: geo.lng }] : []), [geo]);
  const wx = useLiveWeather(coords);
  const w = geo ? wx[liveWeatherKey(geo.lat, geo.lng)] : undefined;

  const homeCur = GLOBAL_CURRENCIES[passport]?.code || 'USD';
  const destCur = GLOBAL_CURRENCIES[destination]?.code || 'USD';
  const destSym = GLOBAL_CURRENCIES[destination]?.symbol || destCur;
  const homeSym = GLOBAL_CURRENCIES[passport]?.symbol || homeCur;
  const rate = getCrossRate(homeCur, destCur);

  const visa = useMemo(() => getPassportItems(passport).find((it) => it.c === destination), [passport, destination]);

  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(now).split(':').map(Number);
  const [hh, mm, ss] = parts;
  const homeTime = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }).format(now);
  const destMinutes = hh * 60 + mm;
  const homeMinutes = now.getHours() * 60 + now.getMinutes();
  let diff = Math.round((destMinutes - homeMinutes) / 60);
  if (diff > 12) diff -= 24;
  if (diff < -12) diff += 24;

  const stops = useMemo(() => {
    try {
      return loadStoredRouteStops();
    } catch {
      return [];
    }
  }, [destination]);
  const today = new Date().toISOString().slice(0, 10);
  const nextStop = stops.filter((s) => s.entryDate >= today).sort((a, b) => a.entryDate.localeCompare(b.entryDate))[0];
  const daysTo = nextStop ? Math.max(0, Math.round((Date.parse(nextStop.entryDate) - Date.parse(today)) / 86400000)) : null;

  const fmtRate = (n: number) => (n >= 100 ? n.toFixed(0) : n >= 10 ? n.toFixed(1) : n.toFixed(2)).replace('.', language === 'en' ? '.' : ',');

  const destOptions = useMemo(
    () => Object.keys(GEO_DATA).map((c) => ({ c, n: getCountryName(c, language) })).sort((a, b) => a.n.localeCompare(b.n, language)),
    [language]
  );

  return (
    <section className="rd-strip" aria-label={l('Hedef ülke bilgileri', 'Destination info', 'Zielinfos', 'Información del destino', 'Информация о стране')}>
      <div className="rd-strip-head">
        <label htmlFor="rd-dest" className="rd-eyebrow">{l('Hedefin', 'Your destination', 'Dein Ziel', 'Tu destino', 'Куда')}</label>
        <select id="rd-dest" className="rd-select" value={destination} onChange={(e) => onDestinationChange(e.target.value)}>
          {destOptions.map((o) => (
            <option key={o.c} value={o.c}>{o.n}</option>
          ))}
        </select>
      </div>
      <div className="rd-strip-row">
        <div className="rd-card rd-kpi">
          <div className="rd-kpi-h"><span className="rd-eyebrow">{l(`${cityName} saati`, `${cityName} time`, `Zeit in ${cityName}`, `Hora en ${cityName}`, `Время: ${cityName}`)}</span><span className="rd-tag">{l('Canlı', 'Live', 'Live', 'En vivo', 'Сейчас')}</span></div>
          <div className="rd-clock">
            <svg width="62" height="62" viewBox="0 0 64 64" role="img" aria-label={`${cityName} ${hh}:${String(mm).padStart(2, '0')}`}>
              <circle cx="32" cy="32" r="29" className="rd-clock-face" />
              <g className="rd-clock-tick"><path d="M32 6v4M32 54v4M6 32h4M54 32h4" /></g>
              <line x1="32" y1="32" x2="32" y2="18" className="rd-clock-h" transform={`rotate(${((hh % 12) + mm / 60) * 30} 32 32)`} />
              <line x1="32" y1="32" x2="32" y2="11" className="rd-clock-m" transform={`rotate(${(mm + ss / 60) * 6} 32 32)`} />
              <line x1="32" y1="36" x2="32" y2="9" className="rd-clock-s" transform={`rotate(${ss * 6} 32 32)`} />
              <circle cx="32" cy="32" r="2.5" className="rd-clock-pin" />
            </svg>
            <div>
              <div className="rd-big">{`${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`}<small>:{String(ss).padStart(2, '0')}</small></div>
              <div className="rd-sub">
                {l('Senin saatin', 'Your time', 'Deine Zeit', 'Tu hora', 'Ваше время')} {homeTime} ·{' '}
                {diff === 0
                  ? l('aynı saat', 'same time', 'gleiche Zeit', 'misma hora', 'то же время')
                  : diff > 0
                  ? l(`${diff} saat ileride`, `${diff} h ahead`, `${diff} Std. voraus`, `${diff} h por delante`, `на ${diff} ч впереди`)
                  : l(`${-diff} saat geride`, `${-diff} h behind`, `${-diff} Std. zurück`, `${-diff} h por detrás`, `на ${-diff} ч позади`)}
              </div>
            </div>
          </div>
        </div>

        <div className="rd-card rd-kpi">
          <div className="rd-kpi-h"><span className="rd-eyebrow">{l(`${cityName} hava`, `${cityName} weather`, `Wetter ${cityName}`, `Tiempo en ${cityName}`, `Погода: ${cityName}`)}</span>{w && <span className="rd-tag">{l('Canlı', 'Live', 'Live', 'En vivo', 'Сейчас')}</span>}</div>
          {w ? (
            <div className="rd-wxrow">
              <WeatherGlyph code={w.code} isDay={w.isDay} />
              <div>
                <div className="rd-big">{w.tempC}°</div>
                <div className="rd-sub">{(weatherCodeInfo(w.code, w.isDay) as any)[language] || weatherCodeInfo(w.code, w.isDay).en} · {l('hissedilen', 'feels', 'gefühlt', 'sensación', 'ощущается')} {w.feelsLikeC}° · %{w.humidity}</div>
              </div>
            </div>
          ) : (
            <div className="rd-wxrow"><div className="rd-skel" /><div className="rd-sub">{l('Yükleniyor…', 'Loading…', 'Lädt…', 'Cargando…', 'Загрузка…')}</div></div>
          )}
        </div>

        <div className="rd-card rd-kpi">
          <div className="rd-kpi-h"><span className="rd-eyebrow">{l('Kur', 'Exchange rate', 'Wechselkurs', 'Tipo de cambio', 'Курс')} · {homeCur} → {destCur}</span><span className="rd-tag">{l('Canlı', 'Live', 'Live', 'En vivo', 'Сейчас')}</span></div>
          <div className="rd-big">1 {homeSym} = {fmtRate(rate)} {destSym}</div>
          <div className="rd-sub">100 {destSym} ≈ {fmtRate(100 / (rate || 1))} {homeSym}</div>
        </div>

        <div className="rd-card rd-kpi">
          <div className="rd-kpi-h">
            <span className="rd-eyebrow">{l('Giriş kuralı', 'Entry rule', 'Einreise', 'Entrada', 'Въезд')}</span>
            <span className={`rd-tag ${visa && (visa.cat === 'free' || visa.id) ? 'ok' : visa && visa.cat === 'visa' ? 'warn' : ''}`}>{getCategoryBadgeLabel(visa || null, language)}</span>
          </div>
          {daysTo !== null && nextStop ? (
            <>
              <div className="rd-big">{daysTo} {l('gün', 'days', 'Tage', 'días', 'дн.')}</div>
              <div className="rd-sub">{l('Sıradaki yolculuk', 'Next trip', 'Nächste Reise', 'Próximo viaje', 'Следующая поездка')}: {getCountryName(nextStop.countryCode, language)} · {nextStop.entryDate}</div>
            </>
          ) : (
            <>
              <div className="rd-big rd-big-sm">{getCountryName(destination, language)}</div>
              <button type="button" className="rd-link" onClick={onOpenRoutePlanner}>
                {l('Tarih ekle, geri sayım başlasın', 'Add dates to start a countdown', 'Daten hinzufügen für Countdown', 'Añade fechas para la cuenta atrás', 'Добавьте даты для отсчёта')}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
