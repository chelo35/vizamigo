import React, { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../../data/i18n';
import { Btn, Card, Chip, Chips, Empty, Field, Flag, LinkBtn, Row, List, SearchInput, Segmented, Stat, VisaBadge, fmtPair, visaTone } from '../ui';
import { SeaMap, MapPoint } from '../SeaMap';
import { VisaWorldMap } from '../WorldMap';

export const TONE_HEX: Record<string, string> = { ok: '#1F9D6B', sea: '#1095AE', sun: '#E59A1C', warn: '#D9534F', mute: '#9A948C' };
import { Icon } from '../Icon';
import { CountryCard, stayDays } from '../country';
import { getPassportItems, compareDualPassports } from '../../utils/calculator';
import { CountryItem, D, REGIONS, countryToRegion, getCountryName, getRegionName, SCHENGEN_SET } from '../../data/passportData';
import { VISA_CHANGE_ALERTS } from '../../data/changeLog';
import { getCountryConciergePlan } from '../../data/travelConciergeEngine';
import { PartnerLogo } from '../PartnerLogo';
import { GEO_DATA } from '../../data/geoData';
import { ALL_WORLD_HUBS, flagToIso } from '../../data/worldHubs';
import { getHubCoords } from '../../utils/hubCoords';
import { useLiveFx, useLiveWeather, liveWeatherKey, weatherCodeInfo } from '../../utils/liveData';
import { GLOBAL_CURRENCIES } from '../../data/countryGeography';
import { getCrossRate, USD_RATES } from '../../data/currencyRates';

const norm = (s: string) => s.toLocaleLowerCase('tr').normalize('NFD').replace(/[̀-ͯ]/g, '');

export const passportOptions = (lang: string) =>
  Object.keys(D)
    .map((c) => ({ c, n: getCountryName(c, lang) }))
    .sort((a, b) => a.n.localeCompare(b.n, lang));

type CatKey = 'free' | 'id' | 'easy' | 'voa' | 'visa';
const inCat = (it: CountryItem, k: CatKey) =>
  k === 'id' ? it.id : k === 'free' ? it.cat === 'free' && !it.id : k === 'easy' ? it.cat === 'evisa' || it.cat === 'eta' : k === 'voa' ? it.cat === 'voa' : it.cat === 'visa';

/* ---------------- Nereye gidebilirim? ---------------- */
export const WhereView: React.FC<{ passport: string; onOpenCountry: (c: string) => void }> = ({ passport, onOpenCountry }) => {
  const { l, language } = useI18n();
  const items = useMemo(() => getPassportItems(passport), [passport]);
  const [cats, setCats] = useState<CatKey[]>(['free', 'id']);
  const [region, setRegion] = useState('');
  const [minDays, setMinDays] = useState(0);
  const [q, setQ] = useState('');
  const [limit, setLimit] = useState(24);

  const catDefs: { k: CatKey; label: string }[] = [
    { k: 'free', label: l('Vizesiz', 'Visa-free', 'Visumfrei', 'Sin visado', 'Без визы') },
    { k: 'id', label: l('Kimlikle', 'With ID card', 'Mit Ausweis', 'Con DNI', 'По ID') },
    { k: 'easy', label: l('E-vize / ETA', 'eVisa / ETA', 'eVisum / ETA', 'eVisa / ETA', 'eVisa / ETA') },
    { k: 'voa', label: l('Kapıda vize', 'Visa on arrival', 'Bei Ankunft', 'A la llegada', 'По прилёте') },
    { k: 'visa', label: l('Vize gerekli', 'Visa required', 'Visum nötig', 'Visado necesario', 'Нужна виза') }
  ];
  const counts = useMemo(() => Object.fromEntries(catDefs.map((c) => [c.k, items.filter((it) => inCat(it, c.k)).length])), [items]); // eslint-disable-line react-hooks/exhaustive-deps

  const res = useMemo(() => {
    const nq = norm(q.trim());
    return items
      .filter((it) => cats.length === 0 || cats.some((k) => inCat(it, k)))
      .filter((it) => !region || countryToRegion[it.c] === region)
      .filter((it) => !minDays || (stayDays(it) || 0) >= minDays)
      .filter((it) => !nq || norm(getCountryName(it.c, language)).includes(nq))
      .sort((a, b) => getCountryName(a.c, language).localeCompare(getCountryName(b.c, language), language));
  }, [items, cats, region, minDays, q, language]);

  const toggle = (k: CatKey) => setCats((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));

  return (
    <div className="vz-stack">
      <Chips scroll>
        {catDefs.map((c) => (
          <Chip key={c.k} on={cats.includes(c.k)} onClick={() => toggle(c.k)} count={counts[c.k]}>{c.label}</Chip>
        ))}
      </Chips>
      <div className="vz-formgrid">
        <Field label={l('Ülke ara', 'Search', 'Suchen', 'Buscar', 'Поиск')} htmlFor="vz-where-q">
          <SearchInput id="vz-where-q" value={q} onChange={setQ} placeholder={l('Ör. Japonya', 'e.g. Japan', 'z. B. Japan', 'p. ej. Japón', 'напр. Япония')} />
        </Field>
        <Field label={l('Bölge', 'Region', 'Region', 'Región', 'Регион')} htmlFor="vz-where-r">
          <select id="vz-where-r" className="vz-select" value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="">{l('Bütün bölgeler', 'All regions', 'Alle Regionen', 'Todas', 'Все регионы')}</option>
            {Object.keys(REGIONS).map((r) => (
              <option key={r} value={r}>{getRegionName(r, language)}</option>
            ))}
          </select>
        </Field>
        <Field label={l('En az kalış', 'Minimum stay', 'Mindestaufenthalt', 'Estancia mínima', 'Мин. срок')} htmlFor="vz-where-d">
          <select id="vz-where-d" className="vz-select" value={minDays} onChange={(e) => setMinDays(Number(e.target.value))}>
            <option value={0}>{l('Fark etmez', 'Any', 'Egal', 'Cualquiera', 'Любой')}</option>
            {[14, 30, 60, 90, 180].map((d) => (
              <option key={d} value={d}>{l(`${d}+ gün`, `${d}+ days`, `${d}+ Tage`, `${d}+ días`, `${d}+ дн.`)}</option>
            ))}
          </select>
        </Field>
      </div>
      <div className="vz-row-flex" style={{ justifyContent: 'space-between' }}>
        <b style={{ fontSize: 15 }}>{l(`${res.length} ülke`, `${res.length} countries`, `${res.length} Länder`, `${res.length} países`, `${res.length} стран`)}</b>
        <span className="vz-muted" style={{ fontSize: 13 }}>{l('Karta dokun, ülke sayfası açılsın', 'Tap a card to open the country', 'Karte antippen für Details', 'Toca para ver el país', 'Нажмите, чтобы открыть')}</span>
      </div>
      {res.length === 0 ? (
        <Empty icon="filter" title={l('Bu filtrelerle ülke yok', 'No countries match', 'Keine Treffer', 'Sin resultados', 'Нет результатов')} text={l('Bir iki filtreyi kaldırıp yeniden dene.', 'Remove a filter or two and try again.', 'Filter lockern und erneut versuchen.', 'Quita algún filtro.', 'Уберите фильтры.')} />
      ) : (
        <div className="vz-cgrid">
          {res.slice(0, limit).map((it) => (
            <CountryCard key={it.c} code={it.c} item={it} onOpen={onOpenCountry} />
          ))}
        </div>
      )}
      {res.length > limit && (
        <Btn variant="ghost" block onClick={() => setLimit((n) => n + 24)}>
          {l(`${res.length - limit} ülke daha göster`, `Show ${res.length - limit} more`, `${res.length - limit} weitere`, `Ver ${res.length - limit} más`, `Ещё ${res.length - limit}`)}
        </Btn>
      )}
    </div>
  );
};

/* ---------------- Ülkeler (199 ülke) ---------------- */
export const CountriesView: React.FC<{ passport: string; initialQuery?: string; onOpenCountry: (c: string) => void }> = ({ passport, initialQuery = '', onOpenCountry }) => {
  const { l, language } = useI18n();
  const items = useMemo(() => new Map(getPassportItems(passport).map((it) => [it.c, it])), [passport]);
  const [q, setQ] = useState(initialQuery);
  const [region, setRegion] = useState('');
  const [mode, setMode] = useState<'all' | 'easy' | 'visa'>('all');
  const [view, setView] = useState<'list' | 'map'>('list');
  const all = useMemo(() => Object.keys(GEO_DATA).filter((c) => c !== passport), [passport]);
  const res = useMemo(() => {
    const nq = norm(q.trim());
    return all
      .filter((c) => !region || countryToRegion[c] === region)
      .filter((c) => {
        if (mode === 'all') return true;
        const it = items.get(c);
        const easy = !!it && (it.id || it.cat === 'free' || it.cat === 'evisa' || it.cat === 'eta' || it.cat === 'voa');
        return mode === 'easy' ? easy : !easy;
      })
      .filter((c) => !nq || norm(getCountryName(c, language)).includes(nq) || norm(getCountryName(c, 'en')).includes(nq) || c.toLowerCase() === nq)
      .sort((a, b) => getCountryName(a, language).localeCompare(getCountryName(b, language), language));
  }, [all, q, region, mode, items, language]);
  const points = useMemo<MapPoint[]>(
    () =>
      res
        .filter((c) => GEO_DATA[c])
        .map((c) => ({ id: c, lat: GEO_DATA[c].lat, lng: GEO_DATA[c].lng, color: TONE_HEX[visaTone(items.get(c))], title: getCountryName(c, language), onClick: () => onOpenCountry(c) })),
    [res, items, language] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <div className="vz-stack">
      {view === 'list' && <SearchInput id="vz-countries-q" value={q} onChange={setQ} placeholder={l('Ülke adı yaz…', 'Type a country…', 'Land eingeben…', 'Escribe un país…', 'Введите страну…')} autoFocus={!!initialQuery} />}
      <div className="vz-row-flex" style={{ justifyContent: 'space-between', display: view === 'list' ? undefined : 'none' }}>
        <Segmented
          label={l('Filtre', 'Filter', 'Filter', 'Filtro', 'Фильтр')}
          value={mode}
          onChange={setMode}
          options={[
            { id: 'all', label: l('Tümü', 'All', 'Alle', 'Todos', 'Все') },
            { id: 'easy', label: l('Kolay giriş', 'Easy entry', 'Einfach', 'Fácil', 'Легко') },
            { id: 'visa', label: l('Vize gerekli', 'Visa needed', 'Visum', 'Visado', 'Виза') }
          ]}
        />
        <select className="vz-select" style={{ width: 'auto', minWidth: 170 }} value={region} onChange={(e) => setRegion(e.target.value)} aria-label={l('Bölge', 'Region', 'Region', 'Región', 'Регион')}>
          <option value="">{l('Bütün bölgeler', 'All regions', 'Alle Regionen', 'Todas', 'Все регионы')}</option>
          {Object.keys(REGIONS).map((r) => (
            <option key={r} value={r}>{getRegionName(r, language)}</option>
          ))}
        </select>
      </div>
      <div className="vz-row-flex" style={{ justifyContent: 'space-between' }}>
        <span className="vz-muted" style={{ fontSize: 13 }}>{l(`${res.length} ülke`, `${res.length} countries`, `${res.length} Länder`, `${res.length} países`, `${res.length} стран`)}</span>
        <Segmented
          label={l('Görünüm', 'View', 'Ansicht', 'Vista', 'Вид')}
          value={view}
          onChange={setView}
          options={[
            { id: 'list', label: l('Liste', 'List', 'Liste', 'Lista', 'Список') },
            { id: 'map', label: l('Harita', 'Map', 'Karte', 'Mapa', 'Карта') }
          ]}
        />
      </div>
      {view === 'map' && <VisaWorldMap passport={passport} onOpenCountry={onOpenCountry} height={460} />}
      {view === 'map' ? null : res.length === 0 ? (
        <Empty icon="search" title={l('Ülke bulunamadı', 'No country found', 'Kein Land gefunden', 'No encontrado', 'Не найдено')} />
      ) : (
        <List>
          {res.map((c) => {
            const it = items.get(c);
            const d = stayDays(it);
            return (
              <Row
                key={c}
                lead={<Flag code={c} />}
                title={getCountryName(c, language)}
                sub={[getRegionName(countryToRegion[c] || '', language), GEO_DATA[c]?.capital, d ? l(`${d} gün`, `${d} days`, `${d} Tage`, `${d} días`, `${d} дн.`) : ''].filter(Boolean).join(' · ')}
                right={<VisaBadge item={it} />}
                onClick={() => onOpenCountry(c)}
              />
            );
          })}
        </List>
      )}
    </div>
  );
};

/* ---------------- Pasaport karşılaştır ---------------- */
export const CompareView: React.FC<{ passportA: string; passportB: string; onOpenCountry: (c: string) => void }> = ({ passportA, passportB, onOpenCountry }) => {
  const { l, language } = useI18n();
  const opts = useMemo(() => passportOptions(language), [language]);
  const [a, setA] = useState(passportA);
  const [b, setB] = useState(passportB && passportB !== passportA ? passportB : passportA === 'DE' ? 'GB' : 'DE');
  const [view, setView] = useState<'betterA' | 'betterB' | 'both' | 'none'>('betterB');
  const cmp = useMemo(() => compareDualPassports(a, b), [a, b]);
  const itemsA = useMemo(() => new Map(getPassportItems(a).map((x) => [x.c, x])), [a]);
  const itemsB = useMemo(() => new Map(getPassportItems(b).map((x) => [x.c, x])), [b]);
  const list = view === 'betterA' ? cmp.betterA : view === 'betterB' ? cmp.betterB : view === 'both' ? cmp.equalEasiness : cmp.bothVisaRequired;
  const nA = getCountryName(a, language);
  const nB = getCountryName(b, language);

  return (
    <div className="vz-stack">
      <div className="vz-vs">
        <Field label={l('1. pasaport', 'Passport 1', 'Pass 1', 'Pasaporte 1', 'Паспорт 1')} htmlFor="vz-cmp-a">
          <select id="vz-cmp-a" className="vz-select" value={a} onChange={(e) => setA(e.target.value)}>
            {opts.map((o) => <option key={o.c} value={o.c}>{o.n}</option>)}
          </select>
        </Field>
        <span className="vz-vs-mid">VS</span>
        <Field label={l('2. pasaport', 'Passport 2', 'Pass 2', 'Pasaporte 2', 'Паспорт 2')} htmlFor="vz-cmp-b">
          <select id="vz-cmp-b" className="vz-select" value={b} onChange={(e) => setB(e.target.value)}>
            {opts.map((o) => <option key={o.c} value={o.c}>{o.n}</option>)}
          </select>
        </Field>
      </div>
      <div className="vz-stats">
        <Stat value={cmp.scoreA} label={l(`${nA}: kolay giriş`, `${nA}: easy entry`, `${nA}: einfach`, `${nA}: fácil`, `${nA}: легко`)} icon="passport" />
        <Stat value={cmp.scoreB} label={l(`${nB}: kolay giriş`, `${nB}: easy entry`, `${nB}: einfach`, `${nB}: fácil`, `${nB}: легко`)} icon="passport" />
        <Stat value={cmp.combinedFreedomScore} label={l('İkisi birlikte', 'Both together', 'Beide zusammen', 'Ambos juntos', 'Вместе')} icon="star" tone="ok" />
      </div>
      <Segmented
        label={l('Liste', 'List', 'Liste', 'Lista', 'Список')}
        value={view}
        onChange={setView}
        options={[
          { id: 'betterB', label: l(`${nB} daha iyi (${cmp.betterB.length})`, `${nB} better (${cmp.betterB.length})`, `${nB} besser (${cmp.betterB.length})`, `${nB} mejor (${cmp.betterB.length})`, `${nB} лучше (${cmp.betterB.length})`) },
          { id: 'betterA', label: l(`${nA} daha iyi (${cmp.betterA.length})`, `${nA} better (${cmp.betterA.length})`, `${nA} besser (${cmp.betterA.length})`, `${nA} mejor (${cmp.betterA.length})`, `${nA} лучше (${cmp.betterA.length})`) },
          { id: 'both', label: l(`Eşit (${cmp.equalEasiness.length})`, `Equal (${cmp.equalEasiness.length})`, `Gleich (${cmp.equalEasiness.length})`, `Igual (${cmp.equalEasiness.length})`, `Равно (${cmp.equalEasiness.length})`) },
          { id: 'none', label: l(`İkisi de vize (${cmp.bothVisaRequired.length})`, `Both need visa (${cmp.bothVisaRequired.length})`, `Beide Visum (${cmp.bothVisaRequired.length})`, `Ambos visado (${cmp.bothVisaRequired.length})`, `Обоим виза (${cmp.bothVisaRequired.length})`) }
        ]}
      />
      {list.length === 0 ? (
        <Empty icon="scale" title={l('Bu grupta ülke yok', 'No countries here', 'Keine Länder', 'Sin países', 'Нет стран')} />
      ) : (
        <List>
          {list
            .slice()
            .sort((x, y) => getCountryName(x.c, language).localeCompare(getCountryName(y.c, language), language))
            .map((it) => (
              <Row
                key={it.c}
                lead={<Flag code={it.c} />}
                title={getCountryName(it.c, language)}
                sub={
                  <span className="vz-row-flex" style={{ gap: 6, marginTop: 4 }}>
                    <span style={{ fontSize: 12 }}>{a}</span><VisaBadge item={itemsA.get(it.c)} />
                    <span style={{ fontSize: 12 }}>{b}</span><VisaBadge item={itemsB.get(it.c)} />
                  </span>
                }
                onClick={() => onOpenCountry(it.c)}
              />
            ))}
        </List>
      )}
    </div>
  );
};

/* ---------------- Popüler rotalar ---------------- */
const CITY: Record<string, string> = {
  IT: 'Roma · Floransa', FR: 'Paris · Nice', ES: 'Madrid · Barselona', DE: 'Berlin · Münih', NL: 'Amsterdam', AT: 'Viyana', CZ: 'Prag', GR: 'Atina · Rodos', HU: 'Budapeşte', PT: 'Lizbon · Porto',
  RS: 'Belgrad', BA: 'Saraybosna', MK: 'Üsküp', AL: 'Tiran', ME: 'Budva · Kotor', GE: 'Tiflis · Batum', AZ: 'Bakü', MD: 'Kişinev',
  JP: 'Tokyo · Kyoto', TH: 'Bangkok · Phuket', MY: 'Kuala Lumpur', SG: 'Singapur', KR: 'Seul · Busan', ID: 'Bali · Cakarta', AE: 'Dubai · Abu Dabi', VN: 'Hanoi · Da Nang',
  US: 'New York · Los Angeles', CA: 'Toronto · Vancouver', BR: 'Rio · São Paulo', MX: 'Cancun · Mexico City', AR: 'Buenos Aires', CO: 'Medellín · Bogotá',
  GB: 'Londra · Edinburgh', AU: 'Sidney · Melbourne', EG: 'Kahire · Şarm El-Şeyh', MA: 'Marakeş', LK: 'Kolombo', QA: 'Doha'
};
type PopKey = 'free' | 'id' | 'schengen' | 'metro' | 'nomad' | 'evisa';
export const PopularView: React.FC<{ passport: string; onOpenCountry: (c: string) => void }> = ({ passport, onOpenCountry }) => {
  const { l } = useI18n();
  const items = useMemo(() => new Map(getPassportItems(passport).map((x) => [x.c, x])), [passport]);
  const [k, setK] = useState<PopKey>('free');
  const pick = (codes: string[], pred?: (it?: CountryItem) => boolean) => codes.filter((c) => c !== passport && (!pred || pred(items.get(c))));
  const groups: Record<PopKey, string[]> = {
    free: pick(['RS', 'BA', 'ME', 'AL', 'MK', 'GE', 'TH', 'MY', 'JP', 'SG', 'BR', 'ID', 'KR', 'MX', 'AR', 'CO'], (it) => !!it && (it.cat === 'free' || it.id)),
    id: pick(Array.from(items.values()).filter((it) => it.id).map((it) => it.c)),
    schengen: pick(['IT', 'FR', 'ES', 'DE', 'NL', 'AT', 'CZ', 'GR', 'HU', 'PT'].filter((c) => SCHENGEN_SET.has(c))),
    metro: pick(['GB', 'JP', 'US', 'AE', 'KR', 'SG', 'CA', 'AU']),
    nomad: pick(['TH', 'PT', 'ID', 'MX', 'GE', 'CO', 'VN', 'ES', 'MY', 'AE']),
    evisa: pick(Array.from(items.values()).filter((it) => it.cat === 'evisa' || it.cat === 'eta').map((it) => it.c)).slice(0, 12)
  };
  const defs: { k: PopKey; label: string }[] = [
    { k: 'free', label: l('Vizesiz', 'Visa-free', 'Visumfrei', 'Sin visado', 'Без визы') },
    { k: 'id', label: l('Kimlikle', 'With ID', 'Mit Ausweis', 'Con DNI', 'По ID') },
    { k: 'schengen', label: 'Schengen' },
    { k: 'metro', label: l('Metropoller', 'Big cities', 'Metropolen', 'Metrópolis', 'Мегаполисы') },
    { k: 'nomad', label: l('Göçebe', 'Nomad', 'Nomaden', 'Nómada', 'Кочевники') },
    { k: 'evisa', label: l('E-vize', 'eVisa', 'eVisum', 'eVisa', 'eVisa') }
  ];
  const list = groups[k];
  return (
    <div className="vz-stack">
      <Chips scroll>
        {defs.map((d) => (
          <Chip key={d.k} on={k === d.k} onClick={() => setK(d.k)} count={groups[d.k].length}>{d.label}</Chip>
        ))}
      </Chips>
      {list.length === 0 ? (
        <Empty icon="star" title={l('Bu pasaport için bu grupta ülke yok', 'Nothing in this group for your passport', 'Für deinen Pass leer', 'Vacío para tu pasaporte', 'Пусто для вашего паспорта')} />
      ) : (
        <div className="vz-cgrid">
          {list.map((c) => (
            <CountryCard key={c} code={c} item={items.get(c)} sub={CITY[c]} onOpen={onOpenCountry} />
          ))}
        </div>
      )}
    </div>
  );
};

/* ---------------- Kural değişiklikleri ---------------- */
export const ChangesView: React.FC<{ passport: string; onOpenAudit: () => void; onReport: () => void; onOpenCountry: (c: string) => void }> = ({ passport, onOpenAudit, onReport, onOpenCountry }) => {
  const { l, language } = useI18n();
  const [mine, setMine] = useState(true);
  const pick = <T,>(tr: T, en?: T, de?: T): T => (language === 'tr' ? tr : language === 'de' ? de ?? en ?? tr : en ?? tr);
  const list = VISA_CHANGE_ALERTS.filter((a) => !mine || a.impactPassport.length === 0 || a.impactPassport.includes(passport));
  return (
    <div className="vz-stack">
      <div className="vz-row-flex" style={{ justifyContent: 'space-between' }}>
        <Segmented
          label={l('Kapsam', 'Scope', 'Umfang', 'Alcance', 'Охват')}
          value={mine ? 'mine' : 'all'}
          onChange={(v) => setMine(v === 'mine')}
          options={[
            { id: 'mine', label: l('Pasaportumu etkileyen', 'Affects my passport', 'Mein Pass', 'Mi pasaporte', 'Мой паспорт') },
            { id: 'all', label: l('Hepsi', 'All', 'Alle', 'Todos', 'Все') }
          ]}
        />
        <div className="vz-actions">
          <Btn variant="soft" small icon="shield" onClick={onOpenAudit}>{l('Doğrulama masası', 'Verification desk', 'Prüfpult', 'Verificación', 'Проверка')}</Btn>
          <Btn variant="ghost" small icon="flag" onClick={onReport}>{l('Hata bildir', 'Report an error', 'Fehler melden', 'Reportar', 'Сообщить')}</Btn>
        </div>
      </div>
      {list.length === 0 ? (
        <Empty icon="bell" title={l('Pasaportunu etkileyen yeni değişiklik yok', 'No new changes for your passport', 'Keine Änderungen für deinen Pass', 'Sin cambios para tu pasaporte', 'Нет изменений')} />
      ) : (
        <div className="vz-grid two">
          {list.map((a) => (
            <Card
              key={a.id}
              tone={a.category === 'critical' ? 'warn' : a.category === 'positive' ? 'ok' : 'plain'}
              eyebrow={`${pick(a.countryName, a.countryNameEn, a.countryNameDe)} · ${pick(a.effectiveDate, a.effectiveDateEn, a.effectiveDateDe)}`}
              title={pick(a.title, a.titleEn, a.titleDe)}
              icon={a.category === 'critical' ? 'alert' : a.category === 'positive' ? 'check' : 'info'}
            >
              <p>{pick(a.summary, a.summaryEn, a.summaryDe)}</p>
              <div className="vz-actions">
                <Btn variant="soft" small onClick={() => onOpenCountry(a.countryCode)}>{l('Ülke sayfası', 'Country page', 'Länderseite', 'Página del país', 'Страница страны')}</Btn>
                {a.officialUrl && <LinkBtn href={a.officialUrl} small variant="ghost">{pick(a.officialSource, a.officialSourceEn, a.officialSourceDe)}</LinkBtn>}
              </div>
              <span className="vz-muted" style={{ fontSize: 12 }}>{l('Doğrulandı', 'Verified', 'Geprüft', 'Verificado', 'Проверено')}: {a.verifiedDate}</span>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

/* ---------------- Kolay tatil ---------------- */
export const EasyTripView: React.FC<{ passport: string; destination: string; onDestination: (c: string) => void; onOpenCountry: (c: string) => void }> = ({ passport, destination, onDestination, onOpenCountry }) => {
  const { l, language } = useI18n();
  const plan = useMemo(() => getCountryConciergePlan(destination, passport), [destination, passport]);
  const tr = language === 'tr';
  const opts = useMemo(() => Object.keys(GEO_DATA).map((c) => ({ c, n: getCountryName(c, language) })).sort((x, y) => x.n.localeCompare(y.n, language)), [language]);
  const icons: Record<string, string> = { flights: 'plane', accommodation: 'bed', transit: 'car', activities: 'ticket', essentials: 'shield' };
  return (
    <div className="vz-stack">
      <div className="vz-row-flex">
        <Field label={l('Nereye?', 'Where to?', 'Wohin?', '¿A dónde?', 'Куда?')} htmlFor="vz-easy-d">
          <select id="vz-easy-d" className="vz-select" value={destination} onChange={(e) => onDestination(e.target.value)} style={{ minWidth: 220 }}>
            {opts.map((o) => <option key={o.c} value={o.c}>{o.n}</option>)}
          </select>
        </Field>
        <Btn variant="soft" icon="globe" onClick={() => onOpenCountry(destination)} style={{ alignSelf: 'flex-end' }}>
          {l('Ülke sayfası', 'Country page', 'Länderseite', 'Página del país', 'Страница страны')}
        </Btn>
      </div>
      {plan.hasRegionalRestrictionAlert && (
        <div className="vz-note"><Icon name="alert" size={18} duo={false} />{l('Bu bölgede bazı uygulamalar kısıtlı olabilir; önerilerde yerel alternatifler öne çıkarıldı.', 'Some services may be restricted in this region; local alternatives are listed first.', 'Einige Dienste sind hier eingeschränkt; lokale Alternativen zuerst.', 'Algunos servicios están restringidos; se priorizan alternativas locales.', 'Некоторые сервисы ограничены; показаны местные альтернативы.')}</div>
      )}
      <div className="vz-steps">
        {plan.stages.map((s, i) => (
          <div className="vz-step" key={s.stage}>
            <span className="vz-step-n">{i + 1}</span>
            <div className="vz-step-b">
              <h4 className="vz-row-flex" style={{ gap: 8 }}><Icon name={icons[s.stage] || 'spark'} size={18} />{tr ? s.titleTr : s.titleEn}</h4>
              <p className="vz-muted" style={{ fontSize: 14 }}>{tr ? s.subtitleTr : s.subtitleEn}</p>
              <List>
                {s.partners.slice(0, 4).map((pn) => (
                  <Row
                    key={pn.id}
                    lead={<PartnerLogo id={pn.id} url={pn.url} fallback={icons[s.stage] || 'spark'} />}
                    title={<span className="vz-row-flex" style={{ gap: 8 }}>{pn.brand}<span className="vz-badge tone-sea">{tr ? pn.badgeTr : pn.badgeEn}</span></span>}
                    sub={tr ? pn.taglineTr : pn.taglineEn}
                    href={pn.url}
                  />
                ))}
              </List>
            </div>
          </div>
        ))}
      </div>
      <p className="vz-muted" style={{ fontSize: 12 }}>{l('Bazı bağlantılar iş ortağı bağlantısıdır; senin için fiyat değişmez.', 'Some links are partner links; your price does not change.', 'Einige Links sind Partnerlinks.', 'Algunos enlaces son de socios.', 'Некоторые ссылки партнёрские.')}</p>
    </div>
  );
};

/* ---------------- Dünya radarı: saat, hava, kur ---------------- */

const RADAR_DEFAULT = ['Istanbul', 'London', 'Paris', 'Dubai', 'Bangkok', 'Tokyo', 'New York', 'Bali'];
export const RadarView: React.FC<{ passport: string; destination: string; onOpenCountry: (c: string) => void }> = ({ passport, destination, onOpenCountry }) => {
  const { l, language } = useI18n();
  useLiveFx();
  const hubs = ALL_WORLD_HUBS;
  const destHub = hubs.find((h) => (h.iso || flagToIso(h.flag)) === destination && GEO_DATA[destination] && (h.city === GEO_DATA[destination].capital || h.cityTr === GEO_DATA[destination].capital)) || hubs.find((h) => (h.iso || flagToIso(h.flag)) === destination);
  const [cities, setCities] = useState<string[]>(() => {
    try {
      const s = JSON.parse(localStorage.getItem('vz_radar_v1') || 'null');
      if (Array.isArray(s) && s.length) return s;
    } catch {}
    return Array.from(new Set([...(destHub ? [destHub.city] : []), ...RADAR_DEFAULT])).filter((c) => hubs.some((h) => h.city === c));
  });
  const save = (n: string[]) => {
    setCities(n);
    try {
      localStorage.setItem('vz_radar_v1', JSON.stringify(n));
    } catch {}
  };
  const sel = cities.map((c) => hubs.find((h) => h.city === c)!).filter(Boolean);
  const coords = useMemo(() => sel.map((h) => getHubCoords(h)), [cities.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps
  const wx = useLiveWeather(coords);
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  const home = GLOBAL_CURRENCIES[passport]?.code || 'EUR';
  const homeSym = GLOBAL_CURRENCIES[passport]?.symbol || home;
  const name = (h: (typeof hubs)[number]) => (language === 'tr' ? h.cityTr || h.city : h.city);
  const opts = useMemo(() => hubs.filter((h) => !cities.includes(h.city)).map((h) => ({ v: h.city, n: `${name(h)} · ${h.country[language as 'tr'] || h.country.en}` })).sort((a, b) => a.n.localeCompare(b.n, language)), [cities, language]); // eslint-disable-line react-hooks/exhaustive-deps
  const radarPoints = useMemo<MapPoint[]>(
    () =>
      sel.map((h, i) => {
        const c = coords[i];
        const w = c ? wx[liveWeatherKey(c.lat, c.lng)] : undefined;
        const time = new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : language, { timeZone: h.tz, hour: '2-digit', minute: '2-digit' }).format(now);
        const iso = h.iso || flagToIso(h.flag);
        return { id: h.city, lat: c.lat, lng: c.lng, big: true, color: '#1095AE', tag: `${name(h)} ${time}${w ? ` · ${w.tempC}°` : ''}`, title: `${name(h)} · ${time}${w ? ` · ${w.tempC}°` : ''}`, onClick: () => iso && onOpenCountry(iso) };
      }),
    [coords, wx, now, language] // eslint-disable-line react-hooks/exhaustive-deps
  );
  return (
    <div className="vz-stack">
      <SeaMap points={radarPoints} height={300} ariaLabel={l('Seçtiğin şehirler haritada', 'Your cities on the map', 'Deine Städte auf der Karte', 'Tus ciudades en el mapa', 'Ваши города на карте')} />
      <List>
        {sel.map((h, i) => {
          const iso = h.iso || flagToIso(h.flag);
          const c = coords[i];
          const w = c ? wx[liveWeatherKey(c.lat, c.lng)] : undefined;
          const wi = w ? (weatherCodeInfo(w.code, w.isDay) as unknown as Record<string, string>) : null;
          const cur = GLOBAL_CURRENCIES[iso]?.code;
          const rate = cur && cur !== home && USD_RATES[cur] && USD_RATES[home] ? getCrossRate(home, cur) : 0;
          const time = new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : language, { timeZone: h.tz, hour: '2-digit', minute: '2-digit' }).format(now);
          return (
            <div className="vz-row" key={h.city}>
              <button type="button" className="vz-row-lead" style={{ border: 0, background: 'none', padding: 0, cursor: 'pointer' }} onClick={() => iso && onOpenCountry(iso)} aria-label={name(h)}>
                <Flag code={iso} />
              </button>
              <span className="vz-row-b">
                <span className="vz-row-t">{name(h)}</span>
                <span className="vz-row-s">
                  {[wi ? `${w!.tempC}° ${wi[language] || wi.en}` : null, rate ? fmtPair(homeSym, GLOBAL_CURRENCIES[iso]?.symbol || cur || '', rate, language) : null].filter(Boolean).join(' · ') || h.country[language as 'tr'] || h.country.en}
                </span>
              </span>
              <span className="vz-row-r">
                <b style={{ fontSize: 20, fontVariantNumeric: 'tabular-nums' }}>{time}</b>
                <button type="button" className="vz-iconbtn" style={{ width: 34, height: 34 }} onClick={() => save(cities.filter((x) => x !== h.city))} aria-label={l('Kaldır', 'Remove', 'Entfernen', 'Quitar', 'Убрать')}><Icon name="close" size={14} duo={false} /></button>
              </span>
            </div>
          );
        })}
      </List>
      <Field label={l('Şehir ekle', 'Add a city', 'Stadt hinzufügen', 'Añadir ciudad', 'Добавить город')} htmlFor="vz-radar-add">
        <select id="vz-radar-add" className="vz-select" value="" onChange={(e) => e.target.value && save([...cities, e.target.value])}>
          <option value="">{l('Şehir seç…', 'Choose a city…', 'Stadt wählen…', 'Elige ciudad…', 'Выберите город…')}</option>
          {opts.map((o) => <option key={o.v + o.n} value={o.v}>{o.n}</option>)}
        </select>
      </Field>
    </div>
  );
};
