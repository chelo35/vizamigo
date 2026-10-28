import React, { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../data/i18n';
import { Icon } from './Icon';
import { Btn, Card, Chip, Chips, Empty, Field, Flag, LinkBtn, List, Page, Row, Segmented, Stat, Tags, Tile, TileGrid, VisaBadge, Bullets, OpenRequest, fmtNum } from './ui';
import { CountryCard } from './country';
import { SeaMap, MapPoint } from './SeaMap';
import { WORLD_DOTS, WORLD_W, WORLD_H, project } from './worldDots';
import { getPassportItems, validateRouteStop, computeRouteSchengenTotal, dateToDayIndex, dayIndexToDate, getTodayDayIndex, formatLocalizedDate, RouteStop, RouteWarning } from '../utils/calculator';
import { loadStoredRouteStops, saveStoredRouteStops, loadStoredTrips } from '../utils/storage';
import { getCountryName, SCHENGEN_SET, DIGITAL_NOMAD_VISAS } from '../data/passportData';
import { GEO_DATA, estimateTravelLeg, optimizeRouteOrder, getCountryGeo } from '../data/geoData';
import { getCountryTransitRule } from '../data/transitData';
import { VISA_CHANGE_ALERTS } from '../data/changeLog';
import { NOMAD_HUBS, getLocalizedNomadHub } from '../data/nomadData';
import { ALL_WORLD_HUBS, flagToIso } from '../data/worldHubs';

/* ------------------------------------------------------------------ */
/* Ortak rota durumu                                                    */
/* ------------------------------------------------------------------ */
function useRoute(passport: string, lang: string) {
  const [stops, setStops] = useState<RouteStop[]>(() => loadStoredRouteStops().filter((s) => s.entryDate && s.exitDate));
  const trips = useMemo(() => loadStoredTrips(), []);
  const save = (next: RouteStop[]) => {
    setStops(next);
    saveStoredRouteStops(next);
  };
  const warnings = useMemo(() => {
    const m = new Map<string, RouteWarning[]>();
    stops.forEach((s) => m.set(s.id, validateRouteStop(s, passport, stops, trips, lang)));
    return m;
  }, [stops, passport, trips, lang]);
  const sch = useMemo(() => computeRouteSchengenTotal(stops, trips), [stops, trips]);
  const totalDays = stops.length ? dateToDayIndex(stops[stops.length - 1].exitDate) - dateToDayIndex(stops[0].entryDate) + 1 : 0;
  return { stops, save, warnings, sch, totalDays };
}
type RouteApi = ReturnType<typeof useRoute>;

const sortedCountries = (lang: string) =>
  Object.keys(GEO_DATA)
    .map((c) => ({ c, n: getCountryName(c, lang) }))
    .sort((a, b) => a.n.localeCompare(b.n, lang));

/* ---------------- Rota planlayıcı ---------------- */
const PlannerView: React.FC<{ r: RouteApi; passport: string; onOpenCountry: (c: string) => void; onGoMap: () => void }> = ({ r, passport, onOpenCountry, onGoMap }) => {
  const { l, language } = useI18n();
  const items = useMemo(() => new Map(getPassportItems(passport).map((x) => [x.c, x])), [passport]);
  const opts = useMemo(() => sortedCountries(language), [language]);
  const last = r.stops[r.stops.length - 1];
  const nextStart = last ? dayIndexToDate(dateToDayIndex(last.exitDate) + 1) : dayIndexToDate(getTodayDayIndex() + 14);
  const [country, setCountry] = useState('TH');
  const [start, setStart] = useState(nextStart);
  const [days, setDays] = useState(5);
  const [msg, setMsg] = useState('');
  useEffect(() => setStart(nextStart), [nextStart]);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!start || days < 1) return;
    const exit = dayIndexToDate(dateToDayIndex(start) + days - 1);
    r.save([...r.stops, { id: `s-${Date.now()}`, countryCode: country, entryDate: start, exitDate: exit }]);
    setMsg('');
  };
  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= r.stops.length) return;
    const next = r.stops.slice();
    [next[i], next[j]] = [next[j], next[i]];
    r.save(rebuildDates(next));
  };
  const optimize = () => {
    if (r.stops.length < 3) return;
    const res = optimizeRouteOrder(r.stops.map((s) => s.countryCode));
    const byCode = new Map(r.stops.map((s) => [s.countryCode, s]));
    r.save(rebuildDates(res.optimizedCodes.map((c) => byCode.get(c)!).filter(Boolean)));
    setMsg(res.savedDistanceKm > 0 ? l(`Sıra düzeltildi: yaklaşık ${fmtNum(res.savedDistanceKm, language)} km daha kısa.`, `Reordered: about ${fmtNum(res.savedDistanceKm, language)} km shorter.`, `Neu sortiert: ca. ${fmtNum(res.savedDistanceKm, language)} km kürzer.`, `Reordenado: ${fmtNum(res.savedDistanceKm, language)} km menos.`, `Порядок изменён: на ${fmtNum(res.savedDistanceKm, language)} км короче.`) : l('Rota zaten en kısa sırada.', 'Your route is already in the shortest order.', 'Route ist bereits optimal.', 'La ruta ya es óptima.', 'Маршрут уже оптимален.'));
  };
  // sürükle-bırak (masaüstü); mobilde yukarı/aşağı düğmeleri
  const [dragI, setDragI] = useState<number | null>(null);
  const [overI, setOverI] = useState<number | null>(null);
  const drop = (to: number) => {
    if (dragI === null || dragI === to) return;
    const next = r.stops.slice();
    const [m] = next.splice(dragI, 1);
    next.splice(to, 0, m);
    r.save(rebuildDates(next, r.stops[0]?.entryDate));
    setDragI(null);
    setOverI(null);
  };
  const setNights = (i: number, n: number) => {
    const s0 = r.stops[i];
    const next = r.stops.slice();
    next[i] = { ...s0, exitDate: dayIndexToDate(dateToDayIndex(s0.entryDate) + Math.max(1, Math.min(365, n)) - 1) };
    r.save(rebuildDates(next, r.stops[0]?.entryDate));
  };
  // kayıtlı rotalar (bu cihazda)
  const [saved, setSaved] = useState<SavedRoute[]>(() => loadSaved());
  const [saveName, setSaveName] = useState('');
  const storeSaved = (n: SavedRoute[]) => {
    setSaved(n);
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(n));
    } catch {}
  };
  const saveRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!r.stops.length) return;
    const name = saveName.trim() || r.stops.map((s) => getCountryName(s.countryCode, language)).slice(0, 3).join(' · ');
    storeSaved([{ id: `r-${Date.now()}`, name, stops: r.stops }, ...saved].slice(0, 12));
    setSaveName('');
    setMsg(l(`"${name}" kaydedildi.`, `"${name}" saved.`, `"${name}" gespeichert.`, `"${name}" guardada.`, `«${name}» сохранён.`));
  };
  const [schStart, setSchStart] = useState(() => r.stops[0]?.entryDate || dayIndexToDate(getTodayDayIndex() + 14));
  const [schDays, setSchDays] = useState('');
  const [schGap, setSchGap] = useState(false);
  // rota analizi: 183 gün vergi eşiği ve duraklardaki yaklaşan kural değişiklikleri
  const analysis = useMemo(() => {
    const out: { tone: 'warn' | 'info'; text: string }[] = [];
    const perYear = new Map<string, number>();
    r.stops.forEach((st) => {
      const a = dateToDayIndex(st.entryDate), b = dateToDayIndex(st.exitDate);
      for (let d = a; d <= b; d++) {
        const y = dayIndexToDate(d).slice(0, 4);
        const k = `${st.countryCode}|${y}`;
        perYear.set(k, (perYear.get(k) || 0) + 1);
      }
    });
    perYear.forEach((n, k) => {
      const [c, y] = k.split('|');
      if (n >= 150) out.push({ tone: n >= 183 ? 'warn' : 'info', text: l(`${getCountryName(c, language)}: ${y} yılında ${n} gün. 183 gün ve üzeri vergi mukimliği doğurabilir.`, `${getCountryName(c, language)}: ${n} days in ${y}. 183+ days can make you tax-resident.`, `${getCountryName(c, language)}: ${n} Tage in ${y} (183-Tage-Regel).`, `${getCountryName(c, language)}: ${n} días en ${y} (regla de 183 días).`, `${getCountryName(c, language)}: ${n} дн. в ${y} (правило 183 дней).`) });
    });
    const seen = new Set<string>();
    r.stops.forEach((st) => {
      if (seen.has(st.countryCode)) return;
      seen.add(st.countryCode);
      VISA_CHANGE_ALERTS.filter((x) => x.countryCode === st.countryCode && (x.impactPassport.length === 0 || x.impactPassport.includes(passport))).forEach((x) => {
        const title = language === 'tr' ? x.title : language === 'de' ? x.titleDe || x.titleEn || x.title : x.titleEn || x.title;
        const when = language === 'tr' ? x.effectiveDate : x.effectiveDateEn || x.effectiveDate;
        out.push({ tone: x.category === 'critical' ? 'warn' : 'info', text: `${getCountryName(st.countryCode, language)} · ${when}: ${title}` });
      });
    });
    return out;
  }, [r.stops, passport, language]); // eslint-disable-line react-hooks/exhaustive-deps
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    const txt = r.stops.map((s, i) => `${i + 1}. ${getCountryName(s.countryCode, language)} — ${formatLocalizedDate(dateToDayIndex(s.entryDate), language)} → ${formatLocalizedDate(dateToDayIndex(s.exitDate), language)}`).join('\n');
    try {
      await navigator.clipboard.writeText(`Vizamigo\n${txt}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <div className="vz-stack">
      <form className="vz-card tone-sea" onSubmit={add}>
        <div className="vz-formgrid">
          <Field label={l('Ülke', 'Country', 'Land', 'País', 'Страна')} htmlFor="vz-rp-c">
            <select id="vz-rp-c" className="vz-select" value={country} onChange={(e) => setCountry(e.target.value)}>
              {opts.map((o) => <option key={o.c} value={o.c}>{o.n}</option>)}
            </select>
          </Field>
          <Field label={l('Giriş tarihi', 'Arrival', 'Ankunft', 'Llegada', 'Прибытие')} htmlFor="vz-rp-d">
            <input id="vz-rp-d" type="date" className="vz-input" value={start} onChange={(e) => setStart(e.target.value)} />
          </Field>
          <Field label={l('Kaç gün?', 'How many days?', 'Wie viele Tage?', '¿Cuántos días?', 'Сколько дней?')} htmlFor="vz-rp-n">
            <input id="vz-rp-n" type="number" min={1} max={365} className="vz-input" value={days} onChange={(e) => setDays(Math.max(1, Number(e.target.value) || 1))} />
          </Field>
        </div>
        <div className="vz-row-flex" style={{ justifyContent: 'space-between' }}>
          <span className="vz-row-flex" style={{ gap: 8 }}><VisaBadge item={items.get(country)} /><span className="vz-muted" style={{ fontSize: 13 }}>{getCountryName(country, language)}</span></span>
          <Btn type="submit" icon="plus">{l('Durak ekle', 'Add stop', 'Stopp hinzufügen', 'Añadir parada', 'Добавить')}</Btn>
        </div>
      </form>

      {r.stops.length > 0 && (
        <div className="vz-stats">
          <Stat value={r.stops.length} label={l('Durak', 'Stops', 'Stopps', 'Paradas', 'Остановки')} icon="pin" />
          <Stat value={r.totalDays} label={l('Toplam gün', 'Total days', 'Tage gesamt', 'Días totales', 'Всего дней')} icon="cal" />
          <Stat value={`${r.sch.peak180Days}/90`} label={l('Schengen günü (180 günde)', 'Schengen days (in 180)', 'Schengen-Tage (180)', 'Días Schengen (180)', 'Шенген (180)')} icon="shield" tone={r.sch.exceedsLimit ? 'warn' : 'ok'} />
        </div>
      )}
      {msg && <div className="vz-note"><Icon name="check" size={18} duo={false} />{msg}</div>}
      {r.stops.length > 0 && (
        <details className="vz-card vz-sched">
          <summary><Icon name="cal" size={18} />{l('Takvimi otomatik düzenle', 'Auto-schedule the dates', 'Daten automatisch planen', 'Programar fechas', 'Авторасписание')}</summary>
          <div className="vz-formgrid">
            <Field label={l('Başlangıç', 'Start date', 'Beginn', 'Inicio', 'Начало')} htmlFor="vz-sc-a"><input id="vz-sc-a" type="date" className="vz-input" value={schStart} onChange={(e) => setSchStart(e.target.value)} /></Field>
            <Field label={l('Durak başına gün (boş: olduğu gibi)', 'Days per stop (empty: keep)', 'Tage pro Stopp', 'Días por parada', 'Дней на остановку')} htmlFor="vz-sc-n"><input id="vz-sc-n" type="number" min={1} max={90} className="vz-input" value={schDays} onChange={(e) => setSchDays(e.target.value)} placeholder="—" /></Field>
            <label className="vz-check" htmlFor="vz-sc-t" style={{ alignSelf: 'end' }}>
              <input id="vz-sc-t" type="checkbox" checked={schGap} onChange={(e) => setSchGap(e.target.checked)} />
              <span className="vz-check-box" aria-hidden="true"><Icon name="check" size={14} duo={false} /></span>
              <span className="vz-row-t">{l('Duraklar arasına 1 transit günü', '1 transit day between stops', '1 Transittag dazwischen', '1 día de tránsito', '1 день на переезд')}</span>
            </label>
          </div>
          <Btn icon="check" style={{ alignSelf: 'flex-start' }} onClick={() => { r.save(rebuildDates(r.stops, schStart, { days: Number(schDays) || undefined, gap: schGap ? 1 : 0 })); setMsg(l('Tarihler yeniden düzenlendi.', 'Dates rescheduled.', 'Daten neu geplant.', 'Fechas reprogramadas.', 'Даты обновлены.')); }}>{l('Uygula', 'Apply', 'Anwenden', 'Aplicar', 'Применить')}</Btn>
        </details>
      )}
      {analysis.length > 0 && (
        <div className="vz-stack" style={{ gap: 8 }}>
          {analysis.map((a, i) => (
            <div key={i} className="vz-note" style={a.tone === 'warn' ? { borderColor: 'var(--vz-warn)' } : undefined}>
              <Icon name={a.tone === 'warn' ? 'alert' : 'bell'} size={18} duo={false} /><span>{a.text}</span>
            </div>
          ))}
        </div>
      )}

      {r.stops.length === 0 ? (
        <Empty icon="route" title={l('Henüz durak yok', 'No stops yet', 'Noch keine Stopps', 'Aún no hay paradas', 'Пока нет остановок')} text={l('Yukarıdan ilk ülkeni ekle ya da Hazır rotalar kutucuğundan tek dokunuşla bir rota yükle.', 'Add your first country above or load a ready-made route in one tap.', 'Erstes Land oben hinzufügen oder eine fertige Route laden.', 'Añade un país o carga una ruta lista.', 'Добавьте страну или загрузите готовый маршрут.')}
          steps={[
            l('Ülkeyi ve giriş-çıkış tarihlerini seç', 'Pick a country and your dates', 'Land und Daten wählen', 'Elige país y fechas', 'Выберите страну и даты'),
            l('Sıradaki durakları ekle', 'Add the next stops', 'Weitere Stopps hinzufügen', 'Añade más paradas', 'Добавьте остановки'),
            l('Vize, Schengen günü ve transit kontrolü kendiliğinden yapılır', 'Visa, Schengen days and transit are checked for you', 'Visum, Schengen und Transit werden geprüft', 'Visado, Schengen y tránsito se revisan solos', 'Виза, Шенген и транзит проверяются сами')
          ]}
        />
      ) : (
        <div className="vz-steps">
          {r.stops.map((s, i) => {
            const ws = r.warnings.get(s.id) || [];
            const nd = dateToDayIndex(s.exitDate) - dateToDayIndex(s.entryDate) + 1;
            const from = i === 0 ? passport : r.stops[i - 1].countryCode;
            return (
              <div
                className={`vz-step${dragI === i ? ' dragging' : ''}${overI === i && dragI !== i ? ' over' : ''}`}
                key={s.id}
                draggable
                onDragStart={(e) => { setDragI(i); e.dataTransfer.effectAllowed = 'move'; }}
                onDragOver={(e) => { e.preventDefault(); setOverI(i); }}
                onDragLeave={() => setOverI((o) => (o === i ? null : o))}
                onDrop={(e) => { e.preventDefault(); drop(i); }}
                onDragEnd={() => { setDragI(null); setOverI(null); }}
              >
                <span className="vz-step-n" title={l('Sürükleyerek sırala', 'Drag to reorder', 'Ziehen zum Sortieren', 'Arrastra para ordenar', 'Перетащите')}>{i + 1}</span>
                <div className="vz-step-b">
                  {from !== s.countryCode && <LegLink from={from} to={s.countryCode} date={s.entryDate} />}
                  <div className="vz-card" style={{ padding: 14, gap: 10 }}>
                    <div className="vz-row-flex" style={{ justifyContent: 'space-between' }}>
                      <button type="button" className="vz-row-flex" style={{ border: 0, background: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }} onClick={() => onOpenCountry(s.countryCode)}>
                        <Flag code={s.countryCode} />
                        <span className="vz-stack" style={{ gap: 0, textAlign: 'left' }}>
                          <b style={{ fontSize: 16 }}>{getCountryName(s.countryCode, language)}</b>
                          <span className="vz-muted" style={{ fontSize: 13 }}>{formatLocalizedDate(dateToDayIndex(s.entryDate), language)} → {formatLocalizedDate(dateToDayIndex(s.exitDate), language)} · {l(`${nd} gün`, `${nd} days`, `${nd} Tage`, `${nd} días`, `${nd} дн.`)}</span>
                        </span>
                      </button>
                      <span className="vz-row-flex" style={{ gap: 6 }}>
                        <VisaBadge item={items.get(s.countryCode)} />
                        {SCHENGEN_SET.has(s.countryCode) && <span className="vz-badge tone-sea">Schengen</span>}
                      </span>
                    </div>
                    {ws.filter((w) => w.type !== 'info').map((w, k) => (
                      <div key={k} className="vz-note" style={w.type === 'error' ? { borderColor: 'var(--vz-warn)', color: 'var(--vz-warn)' } : undefined}>
                        <Icon name="alert" size={18} duo={false} /><span>{w.message}</span>
                      </div>
                    ))}
                    <div className="vz-row-flex" style={{ gap: 6 }}>
                      <label className="vz-nights">
                        <span>{l('Gün', 'Days', 'Tage', 'Días', 'Дни')}</span>
                        <input type="number" min={1} max={365} value={nd} onChange={(e) => setNights(i, Number(e.target.value) || 1)} aria-label={l(`${getCountryName(s.countryCode, language)} kaç gün`, `Days in ${getCountryName(s.countryCode, language)}`, 'Tage', 'Días', 'Дни')} />
                      </label>
                      <button type="button" className="vz-iconbtn" onClick={() => move(i, -1)} disabled={i === 0} aria-label={l('Yukarı taşı', 'Move up', 'Nach oben', 'Subir', 'Вверх')}><Icon name="back" size={16} duo={false} className="vz-rot90" /></button>
                      <button type="button" className="vz-iconbtn" onClick={() => move(i, 1)} disabled={i === r.stops.length - 1} aria-label={l('Aşağı taşı', 'Move down', 'Nach unten', 'Bajar', 'Вниз')}><Icon name="next" size={16} duo={false} className="vz-rot90" /></button>
                      <button type="button" className="vz-iconbtn" onClick={() => r.save(rebuildDates(r.stops.filter((x) => x.id !== s.id), r.stops[0]?.entryDate))} aria-label={l('Durağı sil', 'Remove stop', 'Stopp entfernen', 'Quitar', 'Удалить')}><Icon name="trash" size={16} duo={false} /></button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {r.stops.length > 0 && (
        <div className="vz-actions">
          <Btn variant="soft" icon="map" onClick={onGoMap}>{l('Haritada gör', 'See on map', 'Auf Karte', 'Ver en mapa', 'На карте')}</Btn>
          {r.stops.length >= 3 && <Btn variant="soft" icon="spark" onClick={optimize}>{l('En kısa sıraya diz', 'Shortest order', 'Kürzeste Reihenfolge', 'Orden más corto', 'Кратчайший порядок')}</Btn>}
          <Btn variant="ghost" icon="doc" onClick={copy}>{copied ? l('Kopyalandı', 'Copied', 'Kopiert', 'Copiado', 'Скопировано') : l('Özeti kopyala', 'Copy summary', 'Zusammenfassung kopieren', 'Copiar resumen', 'Копировать')}</Btn>
          <Btn variant="ghost" icon="trash" onClick={() => r.save([])}>{l('Rotayı temizle', 'Clear route', 'Route leeren', 'Borrar ruta', 'Очистить')}</Btn>
        </div>
      )}
      {(r.stops.length > 0 || saved.length > 0) && (
        <Card icon="star" title={l('Kayıtlı rotalarım', 'My saved routes', 'Gespeicherte Routen', 'Mis rutas guardadas', 'Сохранённые маршруты')}>
          {r.stops.length > 0 && (
            <form className="vz-row-flex" onSubmit={saveRoute}>
              <label htmlFor="vz-rp-save" className="sr-only">{l('Rota adı', 'Route name', 'Routenname', 'Nombre', 'Название')}</label>
              <input id="vz-rp-save" className="vz-input" style={{ flex: 1, minWidth: 160 }} value={saveName} onChange={(e) => setSaveName(e.target.value)} placeholder={l('Ad ver (ör. Yaz Balkan turu)', 'Name it (e.g. Summer Balkans)', 'Name (z. B. Sommer Balkan)', 'Nombre (p. ej. Balcanes)', 'Название')} />
              <Btn type="submit" variant="soft" icon="plus">{l('Bu rotayı kaydet', 'Save this route', 'Route speichern', 'Guardar ruta', 'Сохранить')}</Btn>
            </form>
          )}
          {saved.length === 0 ? (
            <p className="vz-muted">{l('Henüz kayıtlı rota yok. Kaydettiklerin bu cihazda saklanır.', 'No saved routes yet. They stay on this device.', 'Noch keine. Bleiben auf diesem Gerät.', 'Aún no hay. Se guardan en este dispositivo.', 'Пока нет. Хранятся на устройстве.')}</p>
          ) : (
            <List>
              {saved.map((x) => (
                <Row
                  key={x.id}
                  lead={<Flag code={x.stops[0]?.countryCode || passport} />}
                  title={x.name}
                  sub={`${x.stops.length} ${l('durak', 'stops', 'Stopps', 'paradas', 'ост.')} · ${x.stops[0] ? formatLocalizedDate(dateToDayIndex(x.stops[0].entryDate), language) : ''}`}
                  right={
                    <span className="vz-row-flex" style={{ gap: 6 }}>
                      <Btn small variant="soft" onClick={() => { r.save(x.stops); setMsg(l(`"${x.name}" yüklendi.`, `"${x.name}" loaded.`, `"${x.name}" geladen.`, `"${x.name}" cargada.`, `«${x.name}» загружен.`)); }}>{l('Yükle', 'Load', 'Laden', 'Cargar', 'Загрузить')}</Btn>
                      <button type="button" className="vz-iconbtn" onClick={() => storeSaved(saved.filter((y) => y.id !== x.id))} aria-label={l('Sil', 'Delete', 'Löschen', 'Borrar', 'Удалить')}><Icon name="trash" size={16} duo={false} /></button>
                    </span>
                  }
                />
              ))}
            </List>
          )}
        </Card>
      )}
    </div>
  );
};

interface SavedRoute { id: string; name: string; stops: RouteStop[] }
const SAVED_KEY = 'vz_saved_routes_v1';
function loadSaved(): SavedRoute[] {
  try {
    const v = JSON.parse(localStorage.getItem(SAVED_KEY) || '[]');
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

/** İki durak arası: önerilen yol, mesafe ve bilet arama bağlantısı. */
const LegLink: React.FC<{ from: string; to: string; date: string }> = ({ from, to, date }) => {
  const { l, language } = useI18n();
  const leg = estimateTravelLeg(from, to);
  const a = GEO_DATA[from]?.mainHub, b = GEO_DATA[to]?.mainHub;
  const mode = leg.recommendedMode;
  const label =
    mode === 'flight' ? l('Uçuş', 'Flight', 'Flug', 'Vuelo', 'Перелёт')
    : mode === 'train' ? l('Tren', 'Train', 'Zug', 'Tren', 'Поезд')
    : mode === 'ferry' ? l('Feribot', 'Ferry', 'Fähre', 'Ferry', 'Паром')
    : l('Otobüs / araba', 'Bus / car', 'Bus / Auto', 'Bus / coche', 'Автобус / авто');
  const enFrom = getCountryName(from, 'en'), enTo = getCountryName(to, 'en');
  const href =
    mode === 'flight' && a && b
      ? `https://www.google.com/travel/flights?q=${encodeURIComponent(`Flights from ${a} to ${b} on ${date}`)}&hl=${language}`
      : `https://www.rome2rio.com/map/${encodeURIComponent(enFrom)}/${encodeURIComponent(enTo)}`;
  return (
    <div className="vz-leg">
      <Icon name={mode === 'flight' ? 'plane' : mode === 'ferry' ? 'ship' : mode === 'train' ? 'transit' : 'car'} size={16} duo={false} />
      <span>
        {label} · {fmtNum(Math.round(leg.distanceKm), language)} km · ~{leg.estimatedTransitHours} {l('sa', 'h', 'Std.', 'h', 'ч')}
      </span>
      <a href={href} target="_blank" rel="noopener noreferrer">{mode === 'flight' ? l('Bilet ara', 'Find tickets', 'Tickets suchen', 'Buscar billetes', 'Найти билеты') : l('Yol bul', 'Find a way', 'Weg finden', 'Ver opciones', 'Как добраться')} ↗</a>
    </div>
  );
};

/** Durakları sırayla, aralarında boşluk bırakmadan yeniden tarihle. */
function rebuildDates(list: RouteStop[], startOverride?: string, opts?: { days?: number; gap?: number }): RouteStop[] {
  if (!list.length) return list;
  let cur = dateToDayIndex(startOverride || list[0].entryDate);
  return list.map((s) => {
    const n = opts?.days || Math.max(1, dateToDayIndex(s.exitDate) - dateToDayIndex(s.entryDate) + 1);
    const out = { ...s, entryDate: dayIndexToDate(cur), exitDate: dayIndexToDate(cur + n - 1) };
    cur += n + (opts?.gap || 0);
    return out;
  });
}

/* ---------------- Rota haritası ---------------- */
const MapView: React.FC<{ r: RouteApi; home: string }> = ({ r, home }) => {
  const { l, language } = useI18n();
  const [mode, setMode] = useState<'map' | 'time'>('map');
  const codes = r.stops.map((s) => s.countryCode);
  const pts = codes.map((c) => {
    const g = getCountryGeo(c);
    return project(g.lng, g.lat);
  });
  const homeG = getCountryGeo(home);
  const homePt = project(homeG.lng, homeG.lat);
  const all = [homePt, ...pts];
  const pathD = all
    .map((p, i) => {
      if (i === 0) return `M${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
      const q = all[i - 1];
      const mx = (p[0] + q[0]) / 2;
      const my = (p[1] + q[1]) / 2 - Math.min(60, Math.hypot(p[0] - q[0], p[1] - q[1]) * 0.25);
      return `Q${mx.toFixed(1)} ${my.toFixed(1)} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
    })
    .join(' ');
  // haritayı duraklara yakınlaştır
  const xs = all.map((p) => p[0]);
  const ys = all.map((p) => p[1]);
  const pad = 60;
  let x0 = Math.max(0, Math.min(...xs) - pad), x1 = Math.min(WORLD_W, Math.max(...xs) + pad);
  let y0 = Math.max(0, Math.min(...ys) - pad), y1 = Math.min(WORLD_H, Math.max(...ys) + pad);
  const minW = 260;
  if (x1 - x0 < minW) { const c = (x0 + x1) / 2; x0 = Math.max(0, c - minW / 2); x1 = Math.min(WORLD_W, x0 + minW); }
  const ratio = 0.56;
  const needH = (x1 - x0) * ratio;
  if (y1 - y0 < needH) { const c = (y0 + y1) / 2; y0 = Math.max(0, c - needH / 2); y1 = Math.min(WORLD_H, y0 + needH); }
  const vb = r.stops.length ? `${x0} ${y0} ${x1 - x0} ${y1 - y0}` : `0 0 ${WORLD_W} ${WORLD_H}`;
  const k = (x1 - x0) / WORLD_W; // ölçek: noktalar ve yazılar haritayla küçülsün

  const legs = codes.map((c, i) => estimateTravelLeg(i === 0 ? home : codes[i - 1], c));
  const [selStop, setSelStop] = useState<string | null>(null);
  const modeName = (m: string) =>
    m === 'flight' ? l('Uçuş', 'Flight', 'Flug', 'Vuelo', 'Перелёт') : m === 'train' ? l('Tren', 'Train', 'Zug', 'Tren', 'Поезд') : m === 'ferry' ? l('Feribot', 'Ferry', 'Fähre', 'Ferry', 'Паром') : l('Otobüs / araba', 'Bus / car', 'Bus / Auto', 'Bus / coche', 'Автобус / авто');
  const mapPoints = React.useMemo<MapPoint[]>(() => {
    const hg = getCountryGeo(home);
    return [
      { id: `home-${home}`, lat: hg.lat, lng: hg.lng, color: '#1095AE', title: getCountryName(home, language), tag: getCountryName(home, language) },
      ...r.stops.map((s, i) => {
        const g = getCountryGeo(s.countryCode);
        return { id: s.id, lat: g.lat, lng: g.lng, color: SCHENGEN_SET.has(s.countryCode) ? '#2F7FD8' : '#D9534F', label: String(i + 1), title: getCountryName(s.countryCode, language), onClick: () => setSelStop(s.id) };
      })
    ];
  }, [r.stops, home, language]); // eslint-disable-line react-hooks/exhaustive-deps
  const mapPath = React.useMemo(() => [getCountryGeo(home), ...r.stops.map((s) => getCountryGeo(s.countryCode))].map((g) => ({ lat: g.lat, lng: g.lng })), [r.stops, home]);
  const totalKm = legs.reduce((s, x) => s + x.distanceKm, 0);

  if (!r.stops.length) return <Empty icon="map" title={l('Haritada gösterecek durak yok', 'No stops to show', 'Keine Stopps', 'Sin paradas', 'Нет остановок')} text={l('Önce Rota planlayıcıdan ülke ekle.', 'Add countries in the route planner first.', 'Zuerst Länder hinzufügen.', 'Añade países primero.', 'Сначала добавьте страны.')} />;

  const first = dateToDayIndex(r.stops[0].entryDate);
  const lastD = dateToDayIndex(r.stops[r.stops.length - 1].exitDate);
  const span = Math.max(1, lastD - first + 1);

  return (
    <div className="vz-stack">
      <div className="vz-row-flex" style={{ justifyContent: 'space-between' }}>
        <Segmented label={l('Görünüm', 'View', 'Ansicht', 'Vista', 'Вид')} value={mode} onChange={setMode} options={[{ id: 'map', label: l('Harita', 'Map', 'Karte', 'Mapa', 'Карта') }, { id: 'time', label: l('Zaman çizelgesi', 'Timeline', 'Zeitleiste', 'Cronología', 'Хронология') }]} />
        <span className="vz-muted" style={{ fontSize: 13 }}>{l(`Yaklaşık ${fmtNum(totalKm, language)} km`, `About ${fmtNum(totalKm, language)} km`, `Ca. ${fmtNum(totalKm, language)} km`, `Unos ${fmtNum(totalKm, language)} km`, `Около ${fmtNum(totalKm, language)} км`)}</span>
      </div>
      {mode === 'map' ? (
        <>
          <SeaMap
            points={mapPoints}
            path={mapPath}
            arrows
            height={420}
            selectedId={selStop}
            ariaLabel={l('Rota haritası', 'Route map', 'Routenkarte', 'Mapa de ruta', 'Карта маршрута')}
          />
          {selStop && (() => {
            const i = r.stops.findIndex((x) => x.id === selStop);
            const s0 = r.stops[i];
            if (!s0) return null;
            const nx = legs[i + 1];
            const nd = dateToDayIndex(s0.exitDate) - dateToDayIndex(s0.entryDate) + 1;
            return (
              <div className="vz-wm-card">
                <div className="vz-row-flex" style={{ justifyContent: 'space-between' }}>
                  <span className="vz-row-flex" style={{ gap: 10 }}><span className="vz-step-n" style={{ width: 30, height: 30 }}>{i + 1}</span><Flag code={s0.countryCode} size="sm" /><b>{getCountryName(s0.countryCode, language)}</b></span>
                  <button type="button" className="vz-iconbtn" onClick={() => setSelStop(null)} aria-label={l('Kapat', 'Close', 'Schließen', 'Cerrar', 'Закрыть')}><Icon name="close" size={16} duo={false} /></button>
                </div>
                <span className="vz-muted">{formatLocalizedDate(dateToDayIndex(s0.entryDate), language)} → {formatLocalizedDate(dateToDayIndex(s0.exitDate), language)} · {l(`${nd} gün`, `${nd} days`, `${nd} Tage`, `${nd} días`, `${nd} дн.`)}</span>
                {nx && <span>{l('Sonraki yol', 'Next leg', 'Nächste Etappe', 'Siguiente tramo', 'Далее')}: {getCountryName(nx.toCode, language)} · {modeName(nx.recommendedMode)} · {fmtNum(nx.distanceKm, language)} km · ~{fmtNum(nx.estimatedTransitHours, language, 1)} {l('sa', 'h', 'Std.', 'h', 'ч')}</span>}
              </div>
            );
          })()}
          <div className="vz-actions">
            <LinkBtn small icon="map" href={`https://www.google.com/maps/dir/${[home, ...codes].map((c) => encodeURIComponent(`${getCountryGeo(c).capital || ''} ${getCountryName(c, 'en')}`)).join('/')}`}>
              {l('Google Haritalar’da yol tarifi', 'Directions in Google Maps', 'Route in Google Maps', 'Ruta en Google Maps', 'Маршрут в Google Maps')}
            </LinkBtn>
          </div>
        </>
      ) : (
        <div className="vz-timeline">
          {r.stops.map((s, i) => {
            const a = dateToDayIndex(s.entryDate) - first;
            const n = dateToDayIndex(s.exitDate) - dateToDayIndex(s.entryDate) + 1;
            return (
              <div className="vz-tl-row" key={s.id}>
                <span className="vz-tl-l"><Flag code={s.countryCode} size="sm" />{getCountryName(s.countryCode, language)}</span>
                <span className="vz-tl-track"><i style={{ left: `${(a / span) * 100}%`, width: `${(n / span) * 100}%` }} className={SCHENGEN_SET.has(s.countryCode) ? 'sch' : ''}>{n}</i></span>
              </div>
            );
          })}
          <div className="vz-row-flex vz-muted" style={{ justifyContent: 'space-between', fontSize: 12.5 }}>
            <span>{formatLocalizedDate(first, language)}</span>
            <span>{formatLocalizedDate(lastD, language)}</span>
          </div>
        </div>
      )}
      <List>
        {legs.map((g, i) => (
          <Row
            key={i}
            icon={g.recommendedMode === 'flight' ? 'plane' : g.recommendedMode === 'ferry' ? 'drop' : g.recommendedMode === 'train' ? 'transit' : 'car'}
            title={`${getCountryName(g.fromCode, language)} → ${getCountryName(g.toCode, language)}`}
            sub={`${modeName(g.recommendedMode)} · ${fmtNum(g.distanceKm, language)} km · ~${fmtNum(g.estimatedTransitHours, language, 1)} ${l('saat', 'h', 'Std.', 'h', 'ч')}`}
          />
        ))}
      </List>
    </div>
  );
};

/* ---------------- Hazır rotalar ---------------- */
const PRESETS: { id: string; tr: string; en: string; de: string; stops: [string, number][] }[] = [
  { id: 'balkan', tr: 'Balkanlar vizesiz turu', en: 'Visa-free Balkans', de: 'Visumfreier Balkan', stops: [['RS', 5], ['BA', 4], ['ME', 5], ['AL', 4]] },
  { id: 'caucasus', tr: 'Kafkasya, kimlikle', en: 'Caucasus with ID card', de: 'Kaukasus mit Ausweis', stops: [['GE', 8], ['AZ', 6]] },
  { id: 'iberia', tr: 'İberik ve Akdeniz', en: 'Iberia & Mediterranean', de: 'Iberien & Mittelmeer', stops: [['PT', 5], ['ES', 6], ['FR', 5], ['IT', 5]] },
  { id: 'sea', tr: 'Güneydoğu Asya göçebe rotası', en: 'Southeast Asia nomad route', de: 'Südostasien-Nomadenroute', stops: [['TH', 20], ['MY', 15], ['SG', 10]] },
  { id: 'japan', tr: 'Japonya ve Kore', en: 'Japan & Korea', de: 'Japan & Korea', stops: [['JP', 10], ['KR', 7]] },
  { id: 'latam', tr: 'Latin Amerika klasik', en: 'Latin America classic', de: 'Lateinamerika-Klassiker', stops: [['MX', 10], ['CO', 10], ['AR', 8]] }
];
const PresetsView: React.FC<{ r: RouteApi; passport: string; onLoaded: () => void }> = ({ r, passport, onLoaded }) => {
  const { l, language } = useI18n();
  const items = useMemo(() => new Map(getPassportItems(passport).map((x) => [x.c, x])), [passport]);
  const load = (p: (typeof PRESETS)[number]) => {
    let cur = getTodayDayIndex() + 21;
    const stops = p.stops.map(([c, n], i) => {
      const s = { id: `p-${p.id}-${i}`, countryCode: c, entryDate: dayIndexToDate(cur), exitDate: dayIndexToDate(cur + n - 1) };
      cur += n;
      return s;
    });
    r.save(stops);
    onLoaded();
  };
  return (
    <div className="vz-grid two">
      {PRESETS.map((p) => {
        const total = p.stops.reduce((s, x) => s + x[1], 0);
        return (
          <Card key={p.id} eyebrow={l(`${total} gün · ${p.stops.length} ülke`, `${total} days · ${p.stops.length} countries`, `${total} Tage · ${p.stops.length} Länder`, `${total} días · ${p.stops.length} países`, `${total} дн. · ${p.stops.length} стран`)} title={language === 'tr' ? p.tr : language === 'de' ? p.de : p.en} icon="flag">
            <div className="vz-stack" style={{ gap: 8 }}>
              {p.stops.map(([c, n]) => (
                <div key={c} className="vz-row-flex" style={{ justifyContent: 'space-between' }}>
                  <span className="vz-row-flex" style={{ gap: 8 }}><Flag code={c} size="sm" />{getCountryName(c, language)} · {l(`${n} gün`, `${n} days`, `${n} Tage`, `${n} días`, `${n} дн.`)}</span>
                  <VisaBadge item={items.get(c)} />
                </div>
              ))}
            </div>
            <Btn variant="soft" icon="download" onClick={() => load(p)}>{l('Rotama yükle', 'Load into my route', 'In meine Route laden', 'Cargar en mi ruta', 'Загрузить')}</Btn>
          </Card>
        );
      })}
    </div>
  );
};

/* ---------------- Transit kuralları ---------------- */
const HUBS = ['TR', 'AE', 'QA', 'DE', 'NL', 'FR', 'GB', 'US', 'CA', 'SG', 'JP', 'KR', 'TH', 'IT', 'ES', 'CH', 'AT', 'SA', 'EG', 'CN'];
const TransitView: React.FC<{ passport: string }> = ({ passport }) => {
  const { l, language } = useI18n();
  const [c, setC] = useState(passport === 'AE' ? 'QA' : 'AE');
  const opts = useMemo(() => sortedCountries(language), [language]);
  const rule = useMemo(() => getCountryTransitRule(c, passport, language), [c, passport, language]);
  const tone = rule.statusType === 'visa_required' || rule.statusType === 'no_airside_zone' ? 'warn' : 'ok';
  return (
    <div className="vz-stack">
      <Chips scroll>
        {HUBS.filter((h) => h !== passport).slice(0, 12).map((h) => (
          <Chip key={h} on={h === c} onClick={() => setC(h)}>{getCountryName(h, language)}</Chip>
        ))}
      </Chips>
      <Field label={l('Aktarma yapacağın ülke', 'Country you transit through', 'Transitland', 'País de tránsito', 'Страна транзита')} htmlFor="vz-tr-c">
        <select id="vz-tr-c" className="vz-select" value={c} onChange={(e) => setC(e.target.value)}>
          {opts.map((o) => <option key={o.c} value={o.c}>{o.n}</option>)}
        </select>
      </Field>
      <Card tone={tone} title={rule.ruleTitle} eyebrow={rule.badgeTitle} icon={tone === 'ok' ? 'check' : 'alert'}>
        <p>{rule.summary}</p>
        <div className="vz-stats">
          <Stat value={rule.airsideTransitAllowed ? l('Evet', 'Yes', 'Ja', 'Sí', 'Да') : l('Hayır', 'No', 'Nein', 'No', 'Нет')} label={l('Havalimanında vizesiz aktarma', 'Airside transit without visa', 'Transit ohne Visum', 'Tránsito sin visado', 'Транзит без визы')} icon="plane" tone={rule.airsideTransitAllowed ? 'ok' : 'warn'} />
          <Stat value={rule.cityExitAllowed ? l('Evet', 'Yes', 'Ja', 'Sí', 'Да') : l('Hayır', 'No', 'Nein', 'No', 'Нет')} label={l('Şehre çıkabilir miyim?', 'Can I leave the airport?', 'Flughafen verlassen?', '¿Puedo salir?', 'Можно выйти в город?')} icon="landmark" tone={rule.cityExitAllowed ? 'ok' : 'warn'} />
          {rule.maxHours && <Stat value={rule.maxHours} label={l('En uzun bekleme', 'Max layover', 'Max. Aufenthalt', 'Escala máx.', 'Макс. стыковка')} icon="clock" />}
        </div>
      </Card>
      {rule.keyConditions.length > 0 && <Card title={l('Şartlar', 'Conditions', 'Bedingungen', 'Condiciones', 'Условия')} icon="doc"><Bullets items={rule.keyConditions} /></Card>}
      {rule.exemptions.length > 0 && <Card title={l('İstisnalar', 'Exemptions', 'Ausnahmen', 'Excepciones', 'Исключения')} icon="star"><Bullets tone="ok" items={rule.exemptions} /></Card>}
      {rule.baggageAndTransferTip && <div className="vz-note"><Icon name="bag" size={18} duo={false} /><span>{rule.baggageAndTransferTip}</span></div>}
      {rule.officialUrl && <LinkBtn href={rule.officialUrl} small>{l('Resmî kaynak', 'Official source', 'Offizielle Quelle', 'Fuente oficial', 'Источник')}</LinkBtn>}
    </div>
  );
};

/* ---------------- Göçebe merkezleri ---------------- */
const NomadVisaView: React.FC<{ onOpenCountry: (c: string) => void }> = ({ onOpenCountry }) => {
  const { l, language } = useI18n();
  return (
    <div className="vz-stack">
      <div className="vz-note"><Icon name="info" size={18} duo={false} /><span>{l('Bir ülkede yılda 183 günü geçersen o ülkede vergi mukimi sayılabilirsin. Cüzdan → 183 gün takibinden günlerini izle.', 'Spending over 183 days a year in one country can make you tax-resident. Track it in Wallet → 183-day tracker.', '183+ Tage können Steuerpflicht auslösen.', '183+ días pueden generar residencia fiscal.', '183+ дней — налоговое резидентство.')}</span></div>
      <div className="vz-grid two">
        {DIGITAL_NOMAD_VISAS.map((v) => (
          <Card key={v.countryCode + v.visaName} eyebrow={getCountryName(v.countryCode, language)} title={v.visaName} icon="laptop" actions={<Flag code={v.countryCode} />}>
            <div className="vz-stats">
              <Stat value={v.incomeRequired} label={l('Gelir şartı', 'Income needed', 'Einkommen', 'Ingresos', 'Доход')} />
              <Stat value={v.duration} label={l('Süre', 'Length', 'Dauer', 'Duración', 'Срок')} />
            </div>
            <p className="vz-muted">{v.taxInfo}</p>
            <div className="vz-actions">
              <Btn variant="soft" small onClick={() => onOpenCountry(v.countryCode)}>{l('Ülke sayfası', 'Country page', 'Länderseite', 'País', 'Страна')}</Btn>
              {v.officialUrl && <LinkBtn href={v.officialUrl} small variant="link">{l('Resmî site', 'Official site', 'Offiziell', 'Oficial', 'Сайт')}</LinkBtn>}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};


const NomadView: React.FC<{ onOpenCountry: (c: string) => void }> = ({ onOpenCountry }) => {
  const { l, language } = useI18n();
  const hubs = useMemo(() => NOMAD_HUBS.map((h) => getLocalizedNomadHub(h, language)), [language]);
  const regions = Array.from(new Set(NOMAD_HUBS.map((h) => h.region)));
  const budgets = Array.from(new Set(NOMAD_HUBS.map((h) => h.budgetLevel)));
  const [reg, setReg] = useState<string>('');
  const [bud, setBud] = useState<string>('');
  const [cc, setCc] = useState<string>('');
  const [open, setOpen] = useState<string | null>(null);
  const list = hubs.filter((h, i) => (!reg || NOMAD_HUBS[i].region === reg) && (!bud || NOMAD_HUBS[i].budgetLevel === bud) && (!cc || h.countryCode === cc));
  const [view, setView] = useState<'hubs' | 'visas'>('hubs');
  const seg = (
    <Segmented
      label={l('Görünüm', 'View', 'Ansicht', 'Vista', 'Вид')}
      value={view}
      onChange={setView}
      options={[
        { id: 'hubs', label: l(`Şehirler (${NOMAD_HUBS.length})`, `Cities (${NOMAD_HUBS.length})`, `Städte (${NOMAD_HUBS.length})`, `Ciudades (${NOMAD_HUBS.length})`, `Города (${NOMAD_HUBS.length})`) },
        { id: 'visas', label: l(`Vizeler ve vergi (${DIGITAL_NOMAD_VISAS.length})`, `Visas & tax (${DIGITAL_NOMAD_VISAS.length})`, `Visa & Steuern (${DIGITAL_NOMAD_VISAS.length})`, `Visados (${DIGITAL_NOMAD_VISAS.length})`, `Визы (${DIGITAL_NOMAD_VISAS.length})`) }
      ]}
    />
  );
  if (view === 'visas') return <div className="vz-stack">{seg}<NomadVisaView onOpenCountry={onOpenCountry} /></div>;
  const costRows: [keyof NonNullable<(typeof hubs)[number]['costBreakdown']>, string, string][] = [
    ['rent1Bed', 'bed', l('Kira (1+1)', 'Rent (1-bed)', 'Miete (1 Zi.)', 'Alquiler (1 hab.)', 'Аренда (1 комн.)')],
    ['foodDining', 'food', l('Yemek', 'Food', 'Essen', 'Comida', 'Еда')],
    ['coworking', 'laptop', l('Ortak ofis', 'Coworking', 'Coworking', 'Coworking', 'Коворкинг')],
    ['mobileSim', 'wifi', l('Hat / internet', 'SIM / data', 'SIM / Daten', 'SIM / datos', 'SIM / интернет')],
    ['localTransit', 'car', l('Şehir içi ulaşım', 'Local transport', 'Nahverkehr', 'Transporte', 'Транспорт')],
    ['coffeeOrBeer', 'coffee', l('Kahve / bira', 'Coffee / beer', 'Kaffee / Bier', 'Café / cerveza', 'Кофе / пиво')]
  ];
  return (
    <div className="vz-stack">
      {seg}
      <div className="vz-formgrid">
        <Field label={l('Bölge', 'Region', 'Region', 'Región', 'Регион')} htmlFor="vz-nm-r">
          <select id="vz-nm-r" className="vz-select" value={reg} onChange={(e) => setReg(e.target.value)}>
            <option value="">{l('Hepsi', 'All', 'Alle', 'Todas', 'Все')}</option>
            {regions.map((r) => <option key={r} value={r}>{hubs[NOMAD_HUBS.findIndex((h) => h.region === r)]?.region || r}</option>)}
          </select>
        </Field>
        <Field label={l('Aylık bütçe', 'Monthly budget', 'Monatsbudget', 'Presupuesto', 'Бюджет')} htmlFor="vz-nm-b">
          <select id="vz-nm-b" className="vz-select" value={bud} onChange={(e) => setBud(e.target.value)}>
            <option value="">{l('Hepsi', 'All', 'Alle', 'Todos', 'Все')}</option>
            {budgets.map((b) => <option key={b} value={b}>{hubs[NOMAD_HUBS.findIndex((h) => h.budgetLevel === b)]?.budgetLevel || b}</option>)}
          </select>
        </Field>
        <Field label={l('Ülke', 'Country', 'Land', 'País', 'Страна')} htmlFor="vz-nm-c">
          <select id="vz-nm-c" className="vz-select" value={cc} onChange={(e) => setCc(e.target.value)}>
            <option value="">{l('Hepsi', 'All', 'Alle', 'Todos', 'Все')}</option>
            {Array.from(new Set(NOMAD_HUBS.map((h) => h.countryCode))).map((c) => ({ c, n: getCountryName(c, language) })).sort((a, b) => a.n.localeCompare(b.n, language)).map((o) => <option key={o.c} value={o.c}>{o.n}</option>)}
          </select>
        </Field>
      </div>
      <span className="vz-muted" style={{ fontSize: 13 }}>{l(`${list.length} merkez`, `${list.length} hubs`, `${list.length} Hubs`, `${list.length} centros`, `${list.length} хабов`)}</span>
      {list.length === 0 ? (
        <Empty icon="laptop" title={l('Bu seçimle merkez yok', 'No hubs for this selection', 'Keine Treffer', 'Sin resultados', 'Нет результатов')} action={<Btn variant="soft" onClick={() => { setReg(''); setBud(''); setCc(''); }}>{l('Filtreleri temizle', 'Clear filters', 'Filter löschen', 'Limpiar', 'Сбросить')}</Btn>} />
      ) : (
      <div className="vz-grid two">
        {list.map((h) => (
          <Card key={h.id} eyebrow={h.visaName} title={getCountryName(h.countryCode, language)} icon="laptop" actions={<Flag code={h.countryCode} />}>
            <div className="vz-stats">
              <Stat value={h.monthlyLivingCost} label={l('Aylık yaşam', 'Monthly cost', 'Monatlich', 'Coste mensual', 'В месяц')} />
              <Stat value={h.duration} label={l('Vize süresi', 'Visa length', 'Dauer', 'Duración', 'Срок')} />
            </div>
            <p className="vz-muted">{l('Gelir şartı', 'Income needed', 'Einkommen', 'Ingresos', 'Доход')}: <b style={{ color: 'var(--rd-fg)' }}>{h.incomeRequired}</b></p>
            <p className="vz-muted">{l('Başvuru süresi', 'Processing time', 'Bearbeitung', 'Tramitación', 'Срок оформления')}: <b style={{ color: 'var(--rd-fg)' }}>{h.processingTime}</b></p>
            <Tags items={h.popularHubs} />
            {open === h.id && (
              <div className="vz-stack" style={{ gap: 10 }}>
                {h.costBreakdown && (
                  <div className="vz-cost">
                    <b>{l('Aylık maliyet dökümü', 'Monthly cost breakdown', 'Monatliche Kosten', 'Desglose mensual', 'Расходы в месяц')}</b>
                    {costRows.map(([k, ic, t]) => (
                      <div key={k} className="vz-cost-row"><Icon name={ic} size={16} /><span>{t}</span><b>{h.costBreakdown?.[k]}</b></div>
                    ))}
                  </div>
                )}
                <p>{h.lifestyleVibe}</p>
                <p className="vz-muted">{h.internetAndCoworking}</p>
                <Bullets items={h.keyRequirements} />
                <p className="vz-muted">{l('Vergi', 'Tax', 'Steuern', 'Impuestos', 'Налоги')}: {h.taxRegime}</p>
                <p className="vz-muted">{l('Oturum yolu', 'Path to residence', 'Weg zum Aufenthalt', 'Camino a la residencia', 'Путь к ВНЖ')}: {h.residencePathway}</p>
              </div>
            )}
            <div className="vz-actions">
              <Btn variant="soft" small onClick={() => setOpen(open === h.id ? null : h.id)}>{open === h.id ? l('Daha az', 'Less', 'Weniger', 'Menos', 'Меньше') : l('Maliyet ve ayrıntılar', 'Costs & details', 'Kosten & Details', 'Costes y detalles', 'Расходы и детали')}</Btn>
              <Btn variant="ghost" small onClick={() => onOpenCountry(h.countryCode)}>{l('Ülke sayfası', 'Country page', 'Länderseite', 'País', 'Страна')}</Btn>
              {h.googleMapsQuery && <LinkBtn href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.googleMapsQuery)}`} small variant="link" icon="map">{l('Haritada ortak ofisler', 'Coworking on the map', 'Coworking auf Karte', 'Coworking en mapa', 'Коворкинги на карте')}</LinkBtn>}
              {h.officialUrl && <LinkBtn href={h.officialUrl} small variant="link">{l('Resmî site', 'Official site', 'Offiziell', 'Oficial', 'Сайт')}</LinkBtn>}
            </div>
          </Card>
        ))}
      </div>
      )}
    </div>
  );
};

/* ---------------- Saat dilimleri ---------------- */
const TzView: React.FC<{ home: string }> = ({ home }) => {
  const { l, language } = useI18n();
  const hubs = useMemo(() => ALL_WORLD_HUBS.slice().sort((a, b) => (language === 'tr' ? a.cityTr || a.city : a.city).localeCompare(language === 'tr' ? b.cityTr || b.city : b.city, language)), [language]);
  const homeHub =
    (home === 'TR' && hubs.find((h) => h.city === 'Istanbul')) ||
    hubs.find((h) => (h.iso || flagToIso(h.flag)) === home && GEO_DATA[home] && (h.city === GEO_DATA[home].capital || h.cityTr === GEO_DATA[home].capital)) ||
    hubs.find((h) => (h.iso || flagToIso(h.flag)) === home) ||
    hubs.find((h) => h.city === 'Istanbul') ||
    hubs[0];
  const [cities, setCities] = useState<string[]>(() => [homeHub.city, 'Bangkok', 'New York'].filter((c, i, a) => a.indexOf(c) === i && hubs.some((h) => h.city === c)));
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  const sel = cities.map((c) => hubs.find((h) => h.city === c)!).filter(Boolean);
  const hourIn = (tz: string, d: Date) => Number(new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', hour12: false }).format(d)) % 24;
  // ortak uyanık saatler (08–22) — 24 saatlik dilimde, ilk şehre göre
  const base = new Date(now);
  base.setMinutes(0, 0, 0);
  const slots = Array.from({ length: 24 }, (_, i) => new Date(base.getTime() + i * 3600000));
  const ok = (d: Date) => sel.every((h) => {
    const hr = hourIn(h.tz, d);
    return hr >= 8 && hr < 22;
  });
  const name = (h: (typeof hubs)[number]) => (language === 'tr' ? h.cityTr || h.city : h.city);
  const [off, setOff] = useState(0);
  const at = slots[off];
  // önerilen toplantı aralığı: herkesin uyanık olduğu en uzun ardışık dilim
  let best: [number, number] | null = null;
  for (let i = 0; i < 24; ) {
    if (!ok(slots[i])) { i++; continue; }
    let j = i;
    while (j < 24 && ok(slots[j])) j++;
    if (!best || j - i > best[1] - best[0]) best = [i, j];
    i = j;
  }
  const fmtH = (tz: string, d: Date) => new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : language, { timeZone: tz, hour: '2-digit', minute: '2-digit' }).format(d);
  return (
    <div className="vz-stack">
      <div className="vz-grid">
        {sel.map((h, i) => (
          <div key={h.city} className="vz-stat">
            <span className="vz-row-flex" style={{ justifyContent: 'space-between' }}>
              <span className="vz-row-flex" style={{ gap: 6, fontWeight: 600 }}><Flag code={h.iso || flagToIso(h.flag)} size="sm" />{name(h)}</span>
              {i > 0 && <button type="button" className="vz-iconbtn" style={{ width: 32, height: 32 }} onClick={() => setCities(cities.filter((c) => c !== h.city))} aria-label={l('Kaldır', 'Remove', 'Entfernen', 'Quitar', 'Убрать')}><Icon name="close" size={14} duo={false} /></button>}
            </span>
            <b>{new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : language, { timeZone: h.tz, hour: '2-digit', minute: '2-digit' }).format(now)}</b>
            <span>{new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : language, { timeZone: h.tz, weekday: 'long' }).format(now)}</span>
          </div>
        ))}
      </div>
      {cities.length >= 4 && <p className="vz-muted" style={{ fontSize: 13 }}>{l('En fazla 4 şehir karşılaştırılabilir; eklemek için birini kaldır.', 'Up to 4 cities; remove one to add another.', 'Max. 4 Städte.', 'Máximo 4 ciudades.', 'Не более 4 городов.')}</p>}
      {cities.length < 4 && (
        <Field label={l('Şehir ekle', 'Add a city', 'Stadt hinzufügen', 'Añadir ciudad', 'Добавить город')} htmlFor="vz-tz-add">
          <select id="vz-tz-add" className="vz-select" value="" onChange={(e) => e.target.value && setCities([...cities, e.target.value])}>
            <option value="">{l('Şehir seç…', 'Choose a city…', 'Stadt wählen…', 'Elige ciudad…', 'Выберите город…')}</option>
            {hubs.filter((h) => !cities.includes(h.city)).map((h) => <option key={h.city + h.tz} value={h.city}>{name(h)}</option>)}
          </select>
        </Field>
      )}
      <Card title={l('Saati kaydır', 'Slide the time', 'Zeit verschieben', 'Desliza la hora', 'Сдвиньте время')} icon="clock">
        <label htmlFor="vz-tz-off" className="sr-only">{l('Saat', 'Hour', 'Stunde', 'Hora', 'Час')}</label>
        <input id="vz-tz-off" type="range" min={0} max={23} value={off} onChange={(e) => setOff(Number(e.target.value))} />
        <div className="vz-tz-row">
          {sel.map((h) => {
            const hr = hourIn(h.tz, at);
            return (
              <div key={h.city} className={`vz-tz-cell${hr >= 8 && hr < 22 ? ' ok' : ''}`}>
                <span>{name(h)}</span>
                <b>{fmtH(h.tz, at)}</b>
              </div>
            );
          })}
        </div>
        {best ? (
          <p><b>{l('Önerilen toplantı aralığı', 'Suggested meeting window', 'Vorgeschlagenes Zeitfenster', 'Franja sugerida', 'Лучшее время встречи')}:</b> {sel.map((h) => `${name(h)} ${fmtH(h.tz, slots[best![0]])}–${fmtH(h.tz, new Date(slots[best![1] - 1].getTime() + 3600000))}`).join(' · ')}</p>
        ) : (
          <p className="vz-muted">{l('Bu şehirler için herkesin 08–22 arasında uyanık olduğu ortak saat yok.', 'No common 08–22 hours for these cities.', 'Keine gemeinsame Zeit.', 'No hay horas comunes.', 'Нет общих часов.')}</p>
        )}
      </Card>
      <div className="vz-tzm" role="table" aria-label={l('24 saatlik tablo', '24-hour table', '24-Stunden-Tabelle', 'Tabla de 24 horas', 'Таблица 24 часов')}>
        {sel.map((h) => (
          <div key={h.city} className="vz-tzm-row" role="row">
            <span className="vz-tzm-l" role="rowheader">{name(h)}</span>
            {slots.map((d, i) => {
              const hr = hourIn(h.tz, d);
              return <i key={i} role="cell" className={`${hr >= 9 && hr < 18 ? 'w' : hr >= 8 && hr < 22 ? 'e' : 'n'}${i === off ? ' cur' : ''}`} onClick={() => setOff(i)}>{hr}</i>;
            })}
          </div>
        ))}
      </div>
      <Card title={l('Herkesin uyanık olduğu saatler', 'Hours when everyone is awake', 'Gemeinsame Wachzeiten', 'Horas comunes', 'Общие часы')} icon="clock" tone="sea">
        <div className="vz-hours" role="img" aria-label={l('Önümüzdeki 24 saat', 'Next 24 hours', 'Nächste 24 Stunden', 'Próximas 24 horas', 'Ближайшие 24 часа')}>
          {slots.map((d, i) => <i key={i} className={ok(d) ? 'on' : ''} title={new Intl.DateTimeFormat('en-GB', { timeZone: sel[0]?.tz, hour: '2-digit', minute: '2-digit' }).format(d)} />)}
        </div>
        <p className="vz-muted" style={{ fontSize: 13 }}>
          {l(`Önümüzdeki 24 saat, ${sel[0] ? name(sel[0]) : ''} saatine göre. Renkli dilimler 08:00–22:00 arasında herkesin uyanık olduğu saatler.`, `Next 24 hours in ${sel[0] ? name(sel[0]) : ''} time. Coloured blocks are when everyone is between 08:00 and 22:00.`, 'Nächste 24 Std.; farbige Blöcke = alle zwischen 8 und 22 Uhr wach.', 'Próximas 24 h; los bloques de color son horas comunes de 8 a 22.', 'Цветные блоки — время, когда все бодрствуют (8–22).')}
        </p>
      </Card>
    </div>
  );
};

/* ------------------------------------------------------------------ */
export const RoutePage: React.FC<{ passport: string; openRequest: OpenRequest; onOpenCountry: (c: string) => void }> = ({ passport, openRequest, onOpenCountry }) => {
  const { l, language } = useI18n();
  const r = useRoute(passport, language);
  const [req, setReq] = useState<OpenRequest>(null);
  useEffect(() => {
    if (openRequest) setReq(openRequest);
  }, [openRequest?.nonce]); // eslint-disable-line react-hooks/exhaustive-deps
  const go = (id: string) => setReq({ id, nonce: Date.now() });

  const tiles: Tile[] = [
    { id: 'planner', icon: 'route', title: l('Rota planlayıcı', 'Route planner', 'Routenplaner', 'Planificador', 'Планировщик'), desc: l('Durak, tarih, vize kontrolü', 'Stops, dates, visa check', 'Stopps, Daten, Visa', 'Paradas, fechas, visados', 'Остановки, даты, визы'), badge: r.stops.length ? `${r.stops.length}` : undefined, render: () => <PlannerView r={r} passport={passport} onOpenCountry={onOpenCountry} onGoMap={() => go('map')} /> },
    { id: 'map', icon: 'map', title: l('Rota haritası', 'Route map', 'Routenkarte', 'Mapa de ruta', 'Карта маршрута'), desc: l('Harita ve zaman çizelgesi', 'Map and timeline', 'Karte und Zeitleiste', 'Mapa y cronología', 'Карта и хронология'), render: () => <MapView r={r} home={passport} /> },
    { id: 'presets', icon: 'flag', title: l('Hazır rotalar', 'Ready-made routes', 'Fertige Routen', 'Rutas listas', 'Готовые маршруты'), desc: l('Tek dokunuşla yükle', 'Load in one tap', 'Mit einem Tipp laden', 'Carga con un toque', 'В одно касание'), render: () => <PresetsView r={r} passport={passport} onLoaded={() => go('planner')} /> },
    { id: 'transit', icon: 'transit', title: l('Transit kuralları', 'Transit rules', 'Transitregeln', 'Reglas de tránsito', 'Транзит'), desc: l('Aktarmada vize gerekir mi?', 'Visa for a layover?', 'Visum beim Umstieg?', '¿Visado en escala?', 'Виза при пересадке?'), render: () => <TransitView passport={passport} /> },
    { id: 'nomad', icon: 'laptop', title: l('Göçebe merkezleri', 'Nomad hubs', 'Nomaden-Hubs', 'Centros nómada', 'Хабы кочевников'), desc: l('Vizeler, vergi, şehirler', 'Visas, tax, cities', 'Visa, Steuern, Städte', 'Visados, impuestos', 'Визы, налоги'), render: () => <NomadView onOpenCountry={onOpenCountry} /> },
    { id: 'tz', icon: 'clock', title: l('Saat dilimleri', 'Time zones', 'Zeitzonen', 'Husos horarios', 'Часовые пояса'), desc: l('Ortak uyanık saatler', 'Shared waking hours', 'Gemeinsame Zeiten', 'Horas comunes', 'Общие часы'), render: () => <TzView home={passport} /> }
  ];

  const sch = r.sch;
  return (
    <Page
      eyebrow={l('Rota', 'Route', 'Route', 'Ruta', 'Маршрут')}
      title={l('Rotanı birlikte çizelim', 'Let’s draw your route', 'Lass uns deine Route planen', 'Tracemos tu ruta', 'Построим маршрут')}
      sub={l('Durakları ekle; her ülkede vize ve kalış kuralı kendiliğinden kontrol edilsin.', 'Add your stops and every visa and stay rule is checked for you.', 'Stopps hinzufügen – Visaregeln werden automatisch geprüft.', 'Añade paradas y comprobamos visados y estancias.', 'Добавьте остановки — правила проверим сами.')}
      words={['Japan', 'Italy', 'Mexico', 'Greece']}
      summary={
        <div className="vz-cfacts">
          <Stat value={r.stops.length} label={l('Durak', 'Stops', 'Stopps', 'Paradas', 'Остановки')} icon="pin" />
          <Stat value={r.totalDays} label={l('Toplam gün', 'Total days', 'Tage gesamt', 'Días', 'Дней')} icon="cal" />
          <Stat value={`${sch.peak180Days}/90`} label={l('Schengen günü', 'Schengen days', 'Schengen-Tage', 'Días Schengen', 'Дни Шенгена')} icon="shield" tone={sch.exceedsLimit ? 'warn' : 'ok'} />
          <Stat value={r.stops[0] ? formatLocalizedDate(dateToDayIndex(r.stops[0].entryDate), language) : '—'} label={l('Başlangıç', 'Starts', 'Start', 'Inicio', 'Начало')} icon="plane" tone="sun" />
        </div>
      }
    >
      <TileGrid tiles={tiles} openRequest={req} label={l('Rota araçları', 'Route tools', 'Routen-Tools', 'Herramientas', 'Инструменты')} defaultOpen={r.stops.length ? 'planner' : undefined} />
      {r.stops.length === 0 && (
        <section className="vz-home-sec">
          <span className="vz-eyebrow">{l('İlham', 'Inspiration', 'Inspiration', 'Inspiración', 'Идеи')}</span>
          <div className="vz-cgrid">
            {['GE', 'TH', 'JP', 'PT'].map((c) => <CountryCard key={c} code={c} item={getPassportItems(passport).find((x) => x.c === c)} onOpen={onOpenCountry} />)}
          </div>
        </section>
      )}
    </Page>
  );
};
