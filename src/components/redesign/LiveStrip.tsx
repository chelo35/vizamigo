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
      <div className="rd-strip-row">
        <div className="rd-card rd-kpi">
          <div className="rd-kpi-h"><span className="rd-kpi-t"><TileArt name="clock" size={30} /><span className="rd-eyebrow">{l(`${cityName} saati`, `${cityName} time`, `Zeit in ${cityName}`, `Hora en ${cityName}`, `Время: ${cityName}`)}</span></span><span className="rd-tag">{l('Canlı', 'Live', 'Live', 'En vivo', 'Сейчас')}</span></div>
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
                {l('Senin saatin', 'Your time', 'Deine Zeit', 'Tu hora', 'Ваше время')} {homeTime}
              </div>
              <span className={`rd-chip-mini${diff === 0 ? '' : ' alt'}`}>
                {diff === 0
                  ? l('aynı saat', 'same time', 'gleiche Zeit', 'misma hora', 'то же время')
                  : diff > 0
                  ? l(`${diff} saat ileride`, `${diff} h ahead`, `${diff} Std. voraus`, `${diff} h por delante`, `на ${diff} ч впереди`)
                  : l(`${-diff} saat geride`, `${-diff} h behind`, `${-diff} Std. zurück`, `${-diff} h por detrás`, `на ${-diff} ч позади`)}
              </span>
            </div>
          </div>
        </div>

        <div className="rd-card rd-kpi">
          <div className="rd-kpi-h"><span className="rd-kpi-t"><TileArt name="sun" size={30} /><span className="rd-eyebrow">{l(`${cityName} hava`, `${cityName} weather`, `Wetter ${cityName}`, `Tiempo en ${cityName}`, `Погода: ${cityName}`)}</span></span>{w && <span className="rd-tag">{l('Canlı', 'Live', 'Live', 'En vivo', 'Сейчас')}</span>}</div>
          {w ? (
            <div className="rd-wxrow">
              <WeatherGlyph code={w.code} isDay={w.isDay} />
              <div>
                <div className="rd-big">{w.tempC}°</div>
                <div className="rd-sub">{(weatherCodeInfo(w.code, w.isDay) as any)[language] || weatherCodeInfo(w.code, w.isDay).en}</div>
                <div className="rd-chips-mini">
                  <span className="rd-chip-mini">{l('Hissedilen', 'Feels', 'Gefühlt', 'Sensación', 'Ощущ.')} {w.feelsLikeC}°</span>
                  <span className="rd-chip-mini">{l('Nem', 'Humidity', 'Feuchte', 'Humedad', 'Влажн.')} {language === 'tr' ? `%${w.humidity}` : `${w.humidity}%`}</span>
                </div>
              </div>
            </div>
          ) : (
            wxSlow ? (
              <div className="rd-wxrow">
                <div>
                  <div className="rd-big rd-big-sm">—</div>
                  <div className="rd-sub">{l('Hava bilgisi şu an alınamadı', 'Weather is unavailable right now', 'Wetter gerade nicht verfügbar', 'Tiempo no disponible ahora', 'Погода сейчас недоступна')}</div>
                </div>
              </div>
            ) : (
              <div className="rd-wxrow"><div className="rd-skel" /><div className="rd-sub">{l('Yükleniyor…', 'Loading…', 'Lädt…', 'Cargando…', 'Загрузка…')}</div></div>
            )
          )}
        </div>

        <div className="rd-card rd-kpi">
          <div className="rd-kpi-h"><span className="rd-kpi-t"><TileArt name="fx" size={30} /><span className="rd-eyebrow">{l('Döviz kuru', 'Exchange rate', 'Wechselkurs', 'Tipo de cambio', 'Курс')}</span></span>{rate > 0 && <span className="rd-tag">{l('Canlı', 'Live', 'Live', 'En vivo', 'Сейчас')}</span>}</div>
          {fx ? (
            homeCur === destCur ? (
              <>
                <div className="rd-fx-pair"><Flag code={destination} size="sm" /><b>{destCur}</b></div>
                <div className="rd-big rd-big-sm">{l('Aynı para birimi', 'Same currency', 'Gleiche Währung', 'Misma moneda', 'Та же валюта')}</div>
                <div className="rd-sub">{fx.destName}</div>
              </>
            ) : (
              <>
                <div className="rd-fx-pair">
                  <Flag code={destination} size="sm" /><b>{destCur}</b>
                  <span className="rd-fx-arrow" aria-hidden="true">→</span>
                  <Flag code={passport} size="sm" /><b>{homeCur}</b>
                </div>
                <div className="rd-fx-big">
                  <small>{fx.unitText} {destCur} =</small>
                  <span>{fx.value} <em>{homeSym}</em></span>
                </div>
                <div className="rd-sub">{fx.destName} · 1 {homeSym} = {fx.reverse} {destCur}</div>
              </>
            )
          ) : (
            <>
              <div className="rd-big rd-big-sm">—</div>
              <div className="rd-sub">{l('Kur bilgisi yükleniyor', 'Rate loading', 'Kurs lädt', 'Cargando', 'Загрузка')}</div>
            </>
          )}
        </div>

        <div className="rd-card rd-kpi">
          <div className="rd-kpi-h">
            <span className="rd-kpi-t"><TileArt name="passport" size={30} /><span className="rd-eyebrow">{l('Giriş kuralı', 'Entry rule', 'Einreise', 'Entrada', 'Въезд')}</span></span>
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
