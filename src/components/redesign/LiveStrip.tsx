import React, { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../../data/i18n';
import { ALL_WORLD_HUBS, flagToIso } from '../../data/worldHubs';
import { GEO_DATA } from '../../data/geoData';
import { GLOBAL_CURRENCIES } from '../../data/countryGeography';
import { getCrossRate, USD_RATES } from '../../data/currencyRates';
import { useLiveFx, useLiveWeather, liveWeatherKey, weatherCodeInfo } from '../../utils/liveData';
import { getCountryName, getCategoryBadgeLabel } from '../../data/passportData';
import { getPassportItems } from '../../utils/calculator';
import { loadStoredRouteStops } from '../../utils/storage';
import { TileArt } from '../../next/TileArt';
import { Flag } from '../../next/ui';

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
  const uid = React.useId().replace(/:/g, '');
  const rain = code >= 51 && code <= 82;
  const snow = code >= 71 && code <= 77;
  const storm = code >= 95;
  const cloud = code >= 2;
  const showSun = !cloud || code === 2;
  return (
    <svg width="58" height="58" viewBox="0 0 58 58" aria-hidden="true" className="rd-wx">
      <defs>
        <radialGradient id={`s${uid}`} cx=".4" cy=".35" r=".7"><stop offset="0" stopColor="#FFE58A" /><stop offset="1" stopColor="#F7A21B" /></radialGradient>
        <linearGradient id={`c${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#D9E6EE" /></linearGradient>
        <linearGradient id={`m${uid}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFF1C9" /><stop offset="1" stopColor="#E9C77A" /></linearGradient>
      </defs>
      {showSun && (isDay ? (
        <g className="rd-wx-sun">
          <g stroke="#F7B733" strokeWidth="2.6" strokeLinecap="round" opacity=".9">
            <path d="M24 5v4M24 35v4M7 22h4M37 22h4M12 10l2.8 2.8M33.2 31.2L36 34M12 34l2.8-2.8M33.2 12.8L36 10" />
          </g>
          <circle cx="24" cy="22" r="9.5" fill={`url(#s${uid})`} />
        </g>
      ) : (
        <path d="M30 8a14 14 0 1 0 10 24 12 12 0 0 1-10-24z" fill={`url(#m${uid})`} />
      ))}
      {cloud && (
        <g filter="drop-shadow(0 3px 4px rgba(20,40,60,.18))">
          <path d="M17 44h25a9 9 0 0 0 0-18 12 12 0 0 0-23-2 9 9 0 0 0-2 20z" fill={`url(#c${uid})`} />
        </g>
      )}
      {rain && !snow && <path d="M22 48l-2 6M30 48l-2 6M38 48l-2 6" stroke="#3A9BD9" strokeWidth="2.6" strokeLinecap="round" />}
      {snow && <g fill="#9CCBEA"><circle cx="22" cy="51" r="2" /><circle cx="30" cy="53" r="2" /><circle cx="38" cy="51" r="2" /></g>}
      {storm && <path d="M30 44l-5 8h5l-3 6 8-10h-5l3-4z" fill="#FFC83D" />}
    </svg>
  );
}

const LOCALE: Record<string, string> = { tr: 'tr-TR', en: 'en-GB', de: 'de-DE', es: 'es-ES', ru: 'ru-RU' };

export const LiveStrip: React.FC<Props> = ({ passport, destination, onDestinationChange, onOpenRoutePlanner }) => {
  const { l, language } = useI18n();
  useLiveFx();
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    // sekme görünmüyorken saniye saniye çizme
    const t = setInterval(() => !document.hidden && setNow(new Date()), 1000);
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
  // hava servisi yanıt vermezse sonsuza kadar "yükleniyor" yazmasın
  const [wxSlow, setWxSlow] = useState(false);
  useEffect(() => {
    setWxSlow(false);
    const t = setTimeout(() => setWxSlow(true), 8000);
    return () => clearTimeout(t);
  }, [destination]);

  const homeCur = GLOBAL_CURRENCIES[passport]?.code || 'USD';
  const destCur = GLOBAL_CURRENCIES[destination]?.code || 'USD';
  const homeSym = GLOBAL_CURRENCIES[passport]?.symbol || homeCur;
  const rate = USD_RATES[homeCur] && USD_RATES[destCur] ? getCrossRate(homeCur, destCur) : 0;

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

  // kur: hedef para biriminin senin para birimindeki karşılığı (gerekirse 10, 100, 1.000 birim üzerinden)
  const fx = useMemo(() => {
    if (!rate) return null;
    const loc = LOCALE[language] || 'en-GB';
    const nf = (n: number, max = 2) => new Intl.NumberFormat(loc, { minimumFractionDigits: n >= 100 ? 0 : 2, maximumFractionDigits: n >= 100 ? 0 : max }).format(n);
    const perDest = 1 / rate; // 1 hedef = ? ev
    let unit = 1;
    while (perDest * unit < 1 && unit < 1e6) unit *= 10;
    const reverseVal = rate;
    let destName = destCur;
    try {
      destName = new Intl.DisplayNames([loc], { type: 'currency' }).of(destCur) || destCur;
      destName = destName.charAt(0).toLocaleUpperCase(loc) + destName.slice(1);
    } catch {}
    return {
      unitText: new Intl.NumberFormat(loc).format(unit),
      value: nf(perDest * unit),
      reverse: reverseVal >= 1000 ? new Intl.NumberFormat(loc, { maximumFractionDigits: 0 }).format(reverseVal) : new Intl.NumberFormat(loc, { maximumSignificantDigits: 3 }).format(reverseVal),
      destName
    };
  }, [rate, language, destCur]);

  const destOptions = useMemo(
    () => Object.keys(GEO_DATA).map((c) => ({ c, n: getCountryName(c, language) })).sort((a, b) => a.n.localeCompare(b.n, language)),
    [language]
  );

  return (
    <section className="rd-strip" aria-label={l('Hedef ülke bilgileri', 'Destination info', 'Zielinfos', 'Información del destino', 'Информация о стране')}>
      <div className="rd-strip-head">
        <select id="rd-dest" className="rd-select" aria-label={l('Hedef ülke', 'Destination country', 'Zielland', 'País de destino', 'Страна назначения')} value={destination} onChange={(e) => onDestinationChange(e.target.value)}>
          {destOptions.map((o) => (
            <option key={o.c} value={o.c}>{o.n}</option>
          ))}
        </select>
      </div>
      <div className="rd-strip-row rd-glass">
        <div className="rd-card rd-kpi">
          <span className="rd-eyebrow"><svg className="rd-li" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>{l(`${cityName} saati`, `${cityName} time`, `Zeit in ${cityName}`, `Hora en ${cityName}`, `Время: ${cityName}`)}</span>
          <div className="rd-val"><b className="rd-big">{`${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`}</b><i className="rd-live" title={l('Canlı', 'Live', 'Live', 'En vivo', 'Сейчас')}>{l('Canlı', 'Live', 'Live', 'En vivo', 'Сейчас')}</i></div>
          <div className="rd-sub">
            {diff === 0
              ? l('Seninle aynı saat', 'Same time as you', 'Gleiche Zeit wie du', 'Misma hora que tú', 'То же время')
              : diff > 0
              ? l(`${diff} saat ileride · sende ${homeTime}`, `${diff} h ahead · yours ${homeTime}`, `${diff} Std. voraus · bei dir ${homeTime}`, `${diff} h por delante · tú ${homeTime}`, `на ${diff} ч впереди · у вас ${homeTime}`)
              : l(`${-diff} saat geride · sende ${homeTime}`, `${-diff} h behind · yours ${homeTime}`, `${-diff} Std. zurück · bei dir ${homeTime}`, `${-diff} h por detrás · tú ${homeTime}`, `на ${-diff} ч позади · у вас ${homeTime}`)}
          </div>
        </div>

        <div className="rd-card rd-kpi">
          <span className="rd-eyebrow"><svg className="rd-li" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 18h10a4 4 0 0 0 .5-8 6 6 0 0 0-11.4 1.6A3.3 3.3 0 0 0 7 18z" /></svg>{l(`${cityName} hava`, `${cityName} weather`, `Wetter ${cityName}`, `Tiempo en ${cityName}`, `Погода: ${cityName}`)}</span>
          {w ? (
            <>
              <div className="rd-val"><b className="rd-big">{w.tempC}°</b><i className="rd-live">{l('Canlı', 'Live', 'Live', 'En vivo', 'Сейчас')}</i></div>
              <div className="rd-sub">{(weatherCodeInfo(w.code, w.isDay) as any)[language] || weatherCodeInfo(w.code, w.isDay).en} · {l('hissedilen', 'feels', 'gefühlt', 'sensación', 'ощущ.')} {w.feelsLikeC}°</div>
            </>
          ) : (
            <>
              <div className="rd-val"><b className="rd-big">—</b></div>
              <div className="rd-sub">{wxSlow ? l('Şu an alınamadı', 'Unavailable right now', 'Gerade nicht verfügbar', 'No disponible ahora', 'Сейчас недоступно') : l('Yükleniyor…', 'Loading…', 'Lädt…', 'Cargando…', 'Загрузка…')}</div>
            </>
          )}
        </div>

        <div className="rd-card rd-kpi">
          <span className="rd-eyebrow"><svg className="rd-li" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h13l-3-3M20 16H7l3 3" /></svg>{l('Döviz kuru', 'Exchange rate', 'Wechselkurs', 'Tipo de cambio', 'Курс')}</span>
          {fx ? (
            homeCur === destCur ? (
              <>
                <div className="rd-val"><b className="rd-big rd-big-sm">{l('Aynı para', 'Same currency', 'Gleiche Währung', 'Misma moneda', 'Та же валюта')}</b></div>
                <div className="rd-sub">{fx.destName}</div>
              </>
            ) : (
              <>
                <div className="rd-val"><b className="rd-big">{fx.value}<em> {homeSym}</em></b>{rate > 0 && <i className="rd-live">{l('Canlı', 'Live', 'Live', 'En vivo', 'Сейчас')}</i>}</div>
                <div className="rd-sub">{fx.unitText} {destCur} · 1 {homeSym} = {fx.reverse} {destCur}</div>
              </>
            )
          ) : (
            <>
              <div className="rd-val"><b className="rd-big">—</b></div>
              <div className="rd-sub">{l('Yükleniyor…', 'Loading…', 'Lädt…', 'Cargando…', 'Загрузка…')}</div>
            </>
          )}
        </div>

        <div className="rd-card rd-kpi">
          <span className="rd-eyebrow"><svg className="rd-li" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2" /><circle cx="12" cy="10" r="3" /><path d="M9 16h6" /></svg>{l('Giriş kuralı', 'Entry rule', 'Einreise', 'Entrada', 'Въезд')}</span>
          <div className="rd-val"><b className={`rd-big rd-big-rule ${visa && (visa.cat === 'free' || visa.id) ? 'ok' : visa && visa.cat === 'visa' ? 'warn' : ''}`}>{getCategoryBadgeLabel(visa || null, language)}</b></div>
          {daysTo !== null && nextStop ? (
            <div className="rd-sub">{l(`Yolculuğa ${daysTo} gün`, `${daysTo} days to go`, `Noch ${daysTo} Tage`, `Faltan ${daysTo} días`, `Через ${daysTo} дн.`)} · {nextStop.entryDate}</div>
          ) : (
            <button type="button" className="rd-link" onClick={onOpenRoutePlanner}>
              {l('Tarih ekle, geri sayım başlasın', 'Add dates for a countdown', 'Daten für Countdown hinzufügen', 'Añade fechas', 'Добавьте даты')}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
