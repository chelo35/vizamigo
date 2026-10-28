import React, { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../data/i18n';
import { SeaMap, MapPoint, MapStyle } from './SeaMap';
import { Btn, Chip, Chips, Flag, LinkBtn, Segmented, VisaBadge, fmtPair } from './ui';
import { Icon } from './Icon';
import { GEO_DATA } from '../data/geoData';
import { CountryItem, REGIONS, countryToRegion, getCountryName, getRegionName } from '../data/passportData';
import { getPassportItems } from '../utils/calculator';
import { stayDays } from './country';
import { ALL_WORLD_HUBS, flagToIso, WorldHub } from '../data/worldHubs';
import { getHubCoords } from '../utils/hubCoords';
import { useLiveFx, useLiveWeather, liveWeatherKey, weatherCodeInfo } from '../utils/liveData';
import { GLOBAL_CURRENCIES } from '../data/countryGeography';
import { getCrossRate, USD_RATES } from '../data/currencyRates';

/* ------------------------------------------------------------------ */
/* Vize kategorileri ve renkleri (5 renk)                               */
/* ------------------------------------------------------------------ */
export type VisaCat = 'id' | 'free' | 'evisa' | 'voa' | 'visa';
export const CAT_HEX: Record<VisaCat, string> = { id: '#0E9F8E', free: '#1F9D6B', evisa: '#2F7FD8', voa: '#E59A1C', visa: '#D9534F' };
export const catOf = (it?: CountryItem | null): VisaCat => {
  if (!it) return 'visa';
  if (it.id) return 'id';
  if (it.cat === 'free') return 'free';
  if (it.cat === 'evisa' || it.cat === 'eta') return 'evisa';
  if (it.cat === 'voa') return 'voa';
  return 'visa';
};
const norm = (s: string) => s.toLocaleLowerCase('tr').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i').trim();

const useStored = <T,>(key: string, init: T): [T, (v: T) => void] => {
  const [v, setV] = useState<T>(() => {
    try {
      const s = localStorage.getItem(key);
      return s ? (JSON.parse(s) as T) : init;
    } catch {
      return init;
    }
  });
  const set = (n: T) => {
    setV(n);
    try {
      localStorage.setItem(key, JSON.stringify(n));
    } catch {}
  };
  return [v, set];
};

/* ------------------------------------------------------------------ */
/* Haritanın üst araç çubuğu: stil + etiketler                          */
/* ------------------------------------------------------------------ */
const StyleBar: React.FC<{ style: MapStyle; setStyle: (s: MapStyle) => void; labels: boolean; setLabels: (b: boolean) => void }> = ({ style, setStyle, labels, setLabels }) => {
  const { l } = useI18n();
  return (
    <div className="vz-wm-tools">
      <Segmented
        label={l('Harita stili', 'Map style', 'Kartenstil', 'Estilo', 'Стиль')}
        value={style}
        onChange={setStyle}
        options={[
          { id: 'sea', label: l('Deniz', 'Sea', 'Meer', 'Mar', 'Море') },
          { id: 'road', label: l('Yol', 'Road', 'Straße', 'Calles', 'Дороги') },
          { id: 'satellite', label: l('Uydu', 'Satellite', 'Satellit', 'Satélite', 'Спутник') }
        ]}
      />
      <Chip on={labels} icon={labels ? 'check' : 'plus'} onClick={() => setLabels(!labels)}>{l('Etiketler', 'Labels', 'Beschriftung', 'Etiquetas', 'Подписи')}</Chip>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Vize haritası                                                        */
/* ------------------------------------------------------------------ */
export const VisaWorldMap: React.FC<{ passport: string; onOpenCountry: (c: string) => void; height?: number }> = ({ passport, onOpenCountry, height = 480 }) => {
  const { l, language } = useI18n();
  const items = useMemo(() => new Map(getPassportItems(passport).map((x) => [x.c, x])), [passport]);
  const all = useMemo(() => Object.keys(GEO_DATA).filter((c) => c !== passport), [passport]);
  const [cats, setCats] = useState<VisaCat[]>(['id', 'free', 'evisa', 'voa', 'visa']);
  const [region, setRegion] = useState('');
  const [style, setStyle] = useStored<MapStyle>('vz_map_style', 'sea');
  const [labels, setLabels] = useStored<boolean>('vz_map_labels', true);
  const [sel, setSel] = useState<string | null>(null);
  const [focus, setFocus] = useState<{ lat: number; lng: number; zoom: number; key: string } | null>(null);
  const [q, setQ] = useState('');

  const counts = useMemo(() => {
    const c: Record<VisaCat, number> = { id: 0, free: 0, evisa: 0, voa: 0, visa: 0 };
    all.forEach((code) => c[catOf(items.get(code))]++);
    return c;
  }, [all, items]);
  const shown = useMemo(() => all.filter((c) => cats.includes(catOf(items.get(c))) && (!region || countryToRegion[c] === region)), [all, cats, region, items]);
  const select = (c: string, fly = false) => {
    setSel(c);
    const g = GEO_DATA[c];
    if (fly && g) setFocus({ lat: g.lat, lng: g.lng, zoom: 5, key: `${c}-${Date.now()}` });
  };
  const points = useMemo<MapPoint[]>(
    () =>
      shown.map((c) => ({
        id: c,
        lat: GEO_DATA[c].lat,
        lng: GEO_DATA[c].lng,
        color: CAT_HEX[catOf(items.get(c))],
        title: getCountryName(c, language),
        onClick: () => select(c)
      })),
    [shown, items, language] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const matches = useMemo(() => {
    const n = norm(q);
    if (n.length < 2) return [];
    return all.filter((c) => norm(getCountryName(c, language)).startsWith(n) || norm(getCountryName(c, 'en')).startsWith(n)).slice(0, 5);
  }, [q, all, language]);

  const catLabel: Record<VisaCat, string> = {
    id: l('Kimlikle', 'ID card', 'Ausweis', 'Con DNI', 'По ID'),
    free: l('Vizesiz', 'Visa-free', 'Visumfrei', 'Sin visado', 'Без визы'),
    evisa: l('E-vize / ETA', 'eVisa / ETA', 'eVisum / ETA', 'eVisa / ETA', 'eVisa / ETA'),
    voa: l('Kapıda vize', 'On arrival', 'Bei Ankunft', 'A la llegada', 'По прилёте'),
    visa: l('Vize gerekli', 'Visa required', 'Visum nötig', 'Visado', 'Нужна виза')
  };
  const toggleCat = (c: VisaCat) => setCats(cats.includes(c) ? (cats.length > 1 ? cats.filter((x) => x !== c) : cats) : [...cats, c]);

  return (
    <div className="vz-wm">
      <div className="vz-wm-head">
        <div className="vz-wm-search">
          <Icon name="search" size={18} duo={false} />
          <label htmlFor="vz-wm-q" className="sr-only">{l('Haritada ülke bul', 'Find a country on the map', 'Land finden', 'Buscar país', 'Найти страну')}</label>
          <input
            id="vz-wm-q"
            type="search"
            autoComplete="off"
            value={q}
            placeholder={l('Haritada ülke bul…', 'Find a country on the map…', 'Land auf der Karte…', 'Busca un país…', 'Найти страну…')}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && matches[0]) {
                e.preventDefault();
                select(matches[0], true);
                setQ('');
              }
            }}
          />
          {matches.length > 0 && (
            <div className="vz-wm-sug">
              {matches.map((c) => (
                <button key={c} type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => { select(c, true); setQ(''); }}>
                  <Flag code={c} size="sm" />
                  <span>{getCountryName(c, language)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <StyleBar style={style} setStyle={setStyle} labels={labels} setLabels={setLabels} />
      </div>

      <div className="vz-legend vz-wm-legend" role="group" aria-label={l('Vize durumuna göre süz', 'Filter by visa status', 'Nach Visastatus', 'Filtrar por visado', 'Фильтр по визе')}>
        {(Object.keys(CAT_HEX) as VisaCat[]).map((c) => (
          <button key={c} type="button" className={`vz-wm-cat${cats.includes(c) ? ' on' : ''}`} aria-pressed={cats.includes(c)} onClick={() => toggleCat(c)}>
            <i style={{ background: CAT_HEX[c] }} />
            {catLabel[c]} <b>{counts[c]}</b>
          </button>
        ))}
      </div>
      <Chips scroll>
        <Chip on={!region} onClick={() => setRegion('')}>{l('Bütün dünya', 'Whole world', 'Ganze Welt', 'Todo el mundo', 'Весь мир')}</Chip>
        {Object.keys(REGIONS).map((r) => (
          <Chip key={r} on={region === r} onClick={() => setRegion(region === r ? '' : r)}>{getRegionName(r, language)}</Chip>
        ))}
      </Chips>

      <div className={`vz-wm-body${sel ? ' has-sel' : ''}`}>
        <SeaMap
          points={points}
          height={height}
          ariaLabel={l('Vize durumuna göre renkli dünya haritası', 'World map coloured by visa status', 'Weltkarte nach Visastatus', 'Mapa mundial por visado', 'Карта мира по визам')}
          styleMode={style}
          labels={labels}
          selectedId={sel}
          fitKey={`${region}|${cats.join(',')}`}
          focus={focus}
        />
        {sel ? (
          <CountryMapCard code={sel} item={items.get(sel)} onClose={() => setSel(null)} onOpenCountry={onOpenCountry} />
        ) : (
          <div className="vz-wm-hint">
            <Icon name="pin" size={18} duo={false} />
            <span>{l(`${shown.length} ülke gösteriliyor. Bir noktaya dokun, ülkenin özeti burada açılsın.`, `Showing ${shown.length} countries. Tap a dot to see its summary here.`, `${shown.length} Länder. Punkt antippen für Details.`, `${shown.length} países. Toca un punto.`, `${shown.length} стран. Нажмите на точку.`)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

/** Haritada seçili ülkenin özeti: bayrak, başkent, vize, güvenlik, internet, bütçe. */
const CountryMapCard: React.FC<{ code: string; item?: CountryItem; onClose: () => void; onOpenCountry: (c: string) => void }> = ({ code, item, onClose, onOpenCountry }) => {
  const { l, language } = useI18n();
  // büyük veri dosyası yalnız bir ülke seçilince yüklenir
  const [ins, setIns] = useState<null | { safety: number; mbps: number; gb: string; backpacker: string; transport: string; best: string }>(null);
  useEffect(() => {
    let alive = true;
    setIns(null);
    import('../data/countryInsights')
      .then((m) => {
        if (!alive) return;
        const x = m.getCountryInsights(code, language);
        setIns({ safety: x.safety.safetyScore, mbps: x.internet.mobileSpeedMbps, gb: x.internet.costPerGbUsd, backpacker: x.livingCosts.dailyBudgetBackpackerUsd, transport: x.transport.transportQuality, best: x.bestMonths });
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [code, language]);
  const g = GEO_DATA[code];
  const d = stayDays(item);
  return (
    <aside className="vz-wm-card" aria-label={getCountryName(code, language)}>
      <div className="vz-row-flex" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span className="vz-row-flex" style={{ gap: 10 }}>
          <Flag code={code} />
          <span className="vz-stack" style={{ gap: 0 }}>
            <b style={{ fontSize: 18 }}>{getCountryName(code, language)}</b>
            <span className="vz-muted" style={{ fontSize: 13 }}>{[g?.capital, g?.mainHub && `✈ ${g.mainHub}`, getRegionName(countryToRegion[code] || '', language)].filter(Boolean).join(' · ')}</span>
          </span>
        </span>
        <button type="button" className="vz-iconbtn" onClick={onClose} aria-label={l('Kapat', 'Close', 'Schließen', 'Cerrar', 'Закрыть')}><Icon name="close" size={16} duo={false} /></button>
      </div>
      <div className="vz-row-flex" style={{ gap: 8 }}>
        <VisaBadge item={item} big />
        {d && <span className="vz-badge tone-sea">{l(`${d} gün`, `${d} days`, `${d} Tage`, `${d} días`, `${d} дн.`)}</span>}
      </div>
      {ins ? (
        <dl className="vz-wm-facts">
          <div><dt>{l('Güvenlik', 'Safety', 'Sicherheit', 'Seguridad', 'Безопасность')}</dt><dd>{ins.safety}/100</dd></div>
          <div><dt>{l('Mobil internet', 'Mobile data', 'Mobiles Internet', 'Internet móvil', 'Моб. интернет')}</dt><dd>{ins.mbps} Mbps</dd></div>
          <div><dt>{l('1 GB', '1 GB', '1 GB', '1 GB', '1 ГБ')}</dt><dd>{ins.gb}</dd></div>
          <div><dt>{l('Sırt çantalı / gün', 'Backpacker / day', 'Rucksack / Tag', 'Mochilero / día', 'Бюджет / день')}</dt><dd>{ins.backpacker}</dd></div>
          <div className="wide"><dt>{l('Ulaşım', 'Transport', 'Verkehr', 'Transporte', 'Транспорт')}</dt><dd>{ins.transport}</dd></div>
          <div className="wide"><dt>{l('En iyi aylar', 'Best months', 'Beste Monate', 'Mejores meses', 'Лучшие месяцы')}</dt><dd>{ins.best}</dd></div>
        </dl>
      ) : (
        <div className="vz-skel" style={{ height: 110 }} />
      )}
      <div className="vz-actions">
        <Btn small onClick={() => onOpenCountry(code)}>{l('Ülke sayfası', 'Country page', 'Länderseite', 'Página del país', 'Страница страны')}</Btn>
        <LinkBtn small variant="ghost" icon="map" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(getCountryName(code, 'en'))}`}>Google Maps</LinkBtn>
      </div>
    </aside>
  );
};

/* ------------------------------------------------------------------ */
/* Radar haritası: saat, hava, döviz                                    */
/* ------------------------------------------------------------------ */
type RadarMode = 'time' | 'weather' | 'fx';
const HUB_REGIONS: WorldHub['region'][] = ['Europe', 'Middle East', 'Asia', 'Africa', 'Americas', 'Oceania'];

export const RadarWorldMap: React.FC<{ passport: string; onOpenCountry: (c: string) => void; height?: number; initialMode?: RadarMode }> = ({ passport, onOpenCountry, height = 480, initialMode = 'time' }) => {
  const { l, language } = useI18n();
  useLiveFx();
  const [mode, setMode] = useState<RadarMode>(initialMode);
  const [region, setRegion] = useState<WorldHub['region'] | ''>('');
  const [unit, setUnit] = useStored<'C' | 'F'>('vz_temp_unit', 'C');
  const [style, setStyle] = useStored<MapStyle>('vz_map_style', 'sea');
  const [labels, setLabels] = useStored<boolean>('vz_map_labels', true);
  const [sel, setSel] = useState<string | null>(null);
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  const hubs = useMemo(() => ALL_WORLD_HUBS.filter((h) => !region || h.region === region), [region]);
  const coords = useMemo(() => hubs.map((h) => getHubCoords(h)), [hubs]);
  const wx = useLiveWeather(mode === 'weather' || sel ? coords : []);
  const home = GLOBAL_CURRENCIES[passport]?.code || 'EUR';
  const homeSym = GLOBAL_CURRENCIES[passport]?.symbol || home;
  const name = (h: WorldHub) => (language === 'tr' ? h.cityTr || h.city : h.city);
  const tf = (tz: string) => new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : language, { timeZone: tz, hour: '2-digit', minute: '2-digit' }).format(now);
  const hourIn = (tz: string) => Number(new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', hour12: false }).format(now)) % 24;
  const temp = (c: number) => (unit === 'C' ? `${c}°` : `${Math.round(c * 1.8 + 32)}°F`);
  const tempColor = (c: number) => (c <= 0 ? '#4A6FD8' : c <= 10 ? '#2F9FD8' : c <= 18 ? '#1FB2A0' : c <= 25 ? '#E5B21C' : c <= 32 ? '#E5801C' : '#D9534F');
  const showTags = !!region || hubs.length <= 30;

  const points = useMemo<MapPoint[]>(
    () =>
      hubs.map((h, i) => {
        const c = coords[i];
        const iso = h.iso || flagToIso(h.flag);
        let color = '#1095AE', val = '';
        if (mode === 'time') {
          const hr = hourIn(h.tz);
          color = hr >= 7 && hr < 19 ? '#E5A21C' : '#4A5BA8';
          val = tf(h.tz);
        } else if (mode === 'weather') {
          const w = wx[liveWeatherKey(c.lat, c.lng)];
          if (w) {
            color = tempColor(w.tempC);
            val = temp(w.tempC);
          } else color = '#9A948C';
        } else {
          const cur = GLOBAL_CURRENCIES[iso]?.code;
          const rate = cur && cur !== home && USD_RATES[cur] && USD_RATES[home] ? getCrossRate(home, cur) : 0;
          color = cur === home ? '#1F9D6B' : rate ? '#1095AE' : '#9A948C';
          val = cur === home ? home : rate ? fmtPair(homeSym, GLOBAL_CURRENCIES[iso]?.symbol || cur || '', rate, language) : '';
        }
        return { id: h.city, lat: c.lat, lng: c.lng, color, title: `${name(h)}${val ? ` · ${val}` : ''}`, tag: showTags && val ? `${name(h)} ${val}` : undefined, onClick: () => setSel(h.city) };
      }),
    [hubs, coords, mode, wx, now, unit, language, home, showTags] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const selHub = sel ? ALL_WORLD_HUBS.find((h) => h.city === sel) : null;

  return (
    <div className="vz-wm">
      <div className="vz-wm-head">
        <Segmented
          label={l('Gösterilen', 'Showing', 'Anzeige', 'Mostrar', 'Показать')}
          value={mode}
          onChange={setMode}
          options={[
            { id: 'time', label: l('Saat', 'Time', 'Zeit', 'Hora', 'Время') },
            { id: 'weather', label: l('Hava', 'Weather', 'Wetter', 'Tiempo', 'Погода') },
            { id: 'fx', label: l('Döviz', 'Currency', 'Währung', 'Divisas', 'Валюта') }
          ]}
        />
        {mode === 'weather' && (
          <Segmented label="°C / °F" value={unit} onChange={setUnit} options={[{ id: 'C', label: '°C' }, { id: 'F', label: '°F' }]} />
        )}
        <StyleBar style={style} setStyle={setStyle} labels={labels} setLabels={setLabels} />
      </div>
      <Chips scroll>
        <Chip on={!region} onClick={() => setRegion('')}>{l('Bütün dünya', 'Whole world', 'Ganze Welt', 'Todo el mundo', 'Весь мир')}</Chip>
        {HUB_REGIONS.map((r) => (
          <Chip key={r} on={region === r} onClick={() => setRegion(region === r ? '' : r)}>
            {({ Europe: l('Avrupa', 'Europe', 'Europa', 'Europa', 'Европа'), 'Middle East': l('Orta Doğu', 'Middle East', 'Nahost', 'Oriente Medio', 'Ближний Восток'), Asia: l('Asya', 'Asia', 'Asien', 'Asia', 'Азия'), Africa: l('Afrika', 'Africa', 'Afrika', 'África', 'Африка'), Americas: l('Amerika', 'Americas', 'Amerika', 'América', 'Америка'), Oceania: l('Okyanusya', 'Oceania', 'Ozeanien', 'Oceanía', 'Океания') } as Record<string, string>)[r]}
          </Chip>
        ))}
      </Chips>
      <div className="vz-legend">
        {mode === 'time' && (<><span><i style={{ background: '#E5A21C' }} />{l('Gündüz', 'Daytime', 'Tag', 'Día', 'День')}</span><span><i style={{ background: '#4A5BA8' }} />{l('Gece', 'Night', 'Nacht', 'Noche', 'Ночь')}</span></>)}
        {mode === 'weather' && [[-5, '≤0°'], [5, '1–10°'], [15, '11–18°'], [22, '19–25°'], [29, '26–32°'], [35, '33°+']].map(([c, t]) => <span key={String(t)}><i style={{ background: tempColor(c as number) }} />{t}</span>)}
        {mode === 'fx' && (<><span><i style={{ background: '#1F9D6B' }} />{l(`Senin paran (${home})`, `Your currency (${home})`, `Deine Währung (${home})`, `Tu moneda (${home})`, `Ваша валюта (${home})`)}</span><span><i style={{ background: '#1095AE' }} />{l('Kur var', 'Rate available', 'Kurs verfügbar', 'Con cambio', 'Есть курс')}</span></>)}
        <span className="vz-muted">{showTags ? '' : l('Bir bölge seç, değerler haritada yazsın', 'Pick a region to label the map', 'Region wählen für Beschriftung', 'Elige una región', 'Выберите регион')}</span>
      </div>
      <div className={`vz-wm-body${selHub ? ' has-sel' : ''}`}>
        <SeaMap
          points={points}
          height={height}
          ariaLabel={l('Şehirlerin saati, havası ve kuru', 'Time, weather and currency by city', 'Zeit, Wetter, Kurse', 'Hora, tiempo y divisas', 'Время, погода, валюта')}
          styleMode={style}
          labels={labels}
          selectedId={sel}
          fitKey={region}
        />
        {selHub ? (
          <CityCard hub={selHub} home={home} homeSym={homeSym} unit={unit} now={now} wx={wx} onClose={() => setSel(null)} onOpenCountry={onOpenCountry} />
        ) : (
          <div className="vz-wm-hint">
            <Icon name="radar" size={18} duo={false} />
            <span>{l(`${hubs.length} şehir. Bir noktaya dokun; saati, havası ve kuru burada açılsın.`, `${hubs.length} cities. Tap a dot for its time, weather and rate.`, `${hubs.length} Städte. Punkt antippen.`, `${hubs.length} ciudades. Toca un punto.`, `${hubs.length} городов. Нажмите на точку.`)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const CityCard: React.FC<{ hub: WorldHub; home: string; homeSym: string; unit: 'C' | 'F'; now: Date; wx: Record<string, ReturnType<typeof useLiveWeather>[string]>; onClose: () => void; onOpenCountry: (c: string) => void }> = ({ hub, home, homeSym, unit, now, wx, onClose, onOpenCountry }) => {
  const { l, language } = useI18n();
  const iso = hub.iso || flagToIso(hub.flag);
  const c = getHubCoords(hub);
  const w = wx[liveWeatherKey(c.lat, c.lng)];
  const wi = w ? (weatherCodeInfo(w.code, w.isDay) as unknown as Record<string, string>) : null;
  const cur = GLOBAL_CURRENCIES[iso]?.code;
  const sym = GLOBAL_CURRENCIES[iso]?.symbol || cur || '';
  const rate = cur && cur !== home && USD_RATES[cur] && USD_RATES[home] ? getCrossRate(home, cur) : 0;
  const [amt, setAmt] = useState('100');
  const n = parseFloat(amt.replace(',', '.')) || 0;
  const time = new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : language, { timeZone: hub.tz, hour: '2-digit', minute: '2-digit', weekday: 'short' }).format(now);
  const t = (x: number) => (unit === 'C' ? `${x}°C` : `${Math.round(x * 1.8 + 32)}°F`);
  const fmt = (x: number) => new Intl.NumberFormat(language, { maximumFractionDigits: x >= 100 ? 0 : 2 }).format(x);
  return (
    <aside className="vz-wm-card" aria-label={hub.city}>
      <div className="vz-row-flex" style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span className="vz-row-flex" style={{ gap: 10 }}>
          <Flag code={iso} />
          <span className="vz-stack" style={{ gap: 0 }}>
            <b style={{ fontSize: 18 }}>{language === 'tr' ? hub.cityTr || hub.city : hub.city}</b>
            <span className="vz-muted" style={{ fontSize: 13 }}>{hub.country[language as 'tr'] || hub.country.en}</span>
          </span>
        </span>
        <button type="button" className="vz-iconbtn" onClick={onClose} aria-label={l('Kapat', 'Close', 'Schließen', 'Cerrar', 'Закрыть')}><Icon name="close" size={16} duo={false} /></button>
      </div>
      <dl className="vz-wm-facts">
        <div><dt>{l('Yerel saat', 'Local time', 'Ortszeit', 'Hora local', 'Местное время')}</dt><dd>{time}</dd></div>
        <div><dt>{l('Hava', 'Weather', 'Wetter', 'Tiempo', 'Погода')}</dt><dd>{w ? `${t(w.tempC)} · ${wi?.[language] || wi?.en || ''}` : '—'}</dd></div>
        {w && <div><dt>{l('Hissedilen', 'Feels like', 'Gefühlt', 'Sensación', 'Ощущается')}</dt><dd>{t(w.feelsLikeC)}</dd></div>}
        {w && <div><dt>{l('Nem · rüzgâr', 'Humidity · wind', 'Feuchte · Wind', 'Humedad · viento', 'Влажность · ветер')}</dt><dd>%{w.humidity} · {w.windKmh} km/s</dd></div>}
      </dl>
      {rate > 0 && (
        <div className="vz-wm-fx">
          <label htmlFor="vz-wm-amt" className="vz-muted" style={{ fontSize: 13 }}>{l(`Tutar (${home})`, `Amount (${home})`, `Betrag (${home})`, `Importe (${home})`, `Сумма (${home})`)}</label>
          <div className="vz-row-flex" style={{ gap: 8 }}>
            <input id="vz-wm-amt" inputMode="decimal" className="vz-input" style={{ maxWidth: 120 }} value={amt} onChange={(e) => setAmt(e.target.value)} />
            <b style={{ fontSize: 18 }}>= {fmt(n * rate)} {sym}</b>
          </div>
          <span className="vz-muted" style={{ fontSize: 12 }}>{fmtPair(homeSym, sym, rate, language)}</span>
        </div>
      )}
      <div className="vz-actions">
        {iso && GEO_DATA[iso] && <Btn small onClick={() => onOpenCountry(iso)}>{l('Ülke sayfası', 'Country page', 'Länderseite', 'Página del país', 'Страница страны')}</Btn>}
      </div>
    </aside>
  );
};
