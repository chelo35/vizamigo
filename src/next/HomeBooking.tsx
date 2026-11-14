import React, { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../data/i18n';
import { Icon } from './Icon';
import { GEO_DATA } from '../data/geoData';
import { getCountryName } from '../data/passportData';
import { getPassportItems } from '../utils/calculator';

/**
 * Ana sayfa rezervasyon kutusu: Nereye · Gidiş · Dönüş · Kişi → ülke sayfasının rezervasyon bölümü.
 * Tarih ve kişi, ülke sayfalarının kullandığı ortak yolculuk bilgisine (vz_trip_v1) yazılır.
 * Şehir/bölge yazılırsa (Bali, Antalya, Paris…) ilgili ülke açılır ve o şehir seçili gelir.
 */
const TRIP_KEY = 'vz_trip_v1';
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const plus = (s: string, n: number) => {
  const d = new Date(`${s}T12:00:00`);
  d.setDate(d.getDate() + n);
  return iso(d);
};
const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i').replace(/[^a-z0-9]+/g, ' ').trim();

type Trip = { from: string; d1: string; d2: string; n: number; c?: number };

type TabId = 'visa' | 'flight' | 'hotel' | 'tours' | 'car' | 'transfer' | 'esim' | 'ins' | 'easy';
const JUMP: Partial<Record<TabId, string>> = { flight: 'bk-flight', hotel: 'bk-hotel', tours: 'bk-tours', car: 'bk-car', transfer: 'bk-transfer', esim: 'bk-esim', ins: 'bk-ins' };
const TAB_ICON: Record<TabId, string> = { visa: 'passport', flight: 'plane', hotel: 'bed', tours: 'ticket', car: 'car', transfer: 'transit', esim: 'phone', ins: 'shield', easy: 'sun' };

export const HomeBooking: React.FC<{ passport: string; onOpenCountry: (code: string) => void; destination?: string; onDestination?: (code: string) => void; onEasy?: () => void }> = ({ passport, onOpenCountry, destination, onDestination, onEasy }) => {
  const { l, language } = useI18n();
  const [tab, setTab] = useState<TabId>('flight');
  const TABS: { id: TabId; label: string }[] = [
    { id: 'visa', label: l('Vize ve giriş', 'Visa & entry', 'Visum & Einreise', 'Visado y entrada', 'Виза и въезд') },
    { id: 'flight', label: l('Uçak', 'Flights', 'Flüge', 'Vuelos', 'Авиабилеты') },
    { id: 'hotel', label: l('Otel', 'Hotels', 'Hotels', 'Hoteles', 'Отели') },
    { id: 'tours', label: l('Tur ve bilet', 'Tours & tickets', 'Touren & Tickets', 'Tours y entradas', 'Экскурсии') },
    { id: 'car', label: l('Araç', 'Car rental', 'Mietwagen', 'Coches', 'Авто') },
    { id: 'transfer', label: l('Transfer', 'Transfers', 'Transfer', 'Traslados', 'Трансфер') },
    { id: 'esim', label: 'eSIM' },
    { id: 'ins', label: l('Sigorta', 'Insurance', 'Versicherung', 'Seguro', 'Страховка') },
    { id: 'easy', label: l('Kolay tatil', 'Easy trip', 'Einfache Reise', 'Viaje fácil', 'Лёгкая поездка') }
  ];
  const today = iso(new Date());
  const [trip, setTrip] = useState<Trip>(() => {
    const def: Trip = { from: GEO_DATA[passport] ? passport : 'TR', d1: plus(today, 21), d2: plus(today, 28), n: 2 };
    try {
      const s = JSON.parse(localStorage.getItem(TRIP_KEY) || 'null') as Trip | null;
      if (s && s.d1 > today && s.d2 > s.d1 && GEO_DATA[s.from]) return s;
    } catch {}
    return def;
  });
  const [q, setQ] = useState('');
  const [err, setErr] = useState(false);
  const [places, setPlaces] = useState<Record<string, { en: string }[]> | null>(null);
  const [trOnly, setTrOnly] = useState<Set<string> | null>(null);
  const countries = useMemo(
    () => Object.keys(GEO_DATA).map((c) => ({ c, n: getCountryName(c, language), en: getCountryName(c, 'en') })).sort((a, b) => a.n.localeCompare(b.n, language)),
    [language]
  );
  // Şehir listesi yalnızca kutuya dokununca yüklenir (ana sayfa hızlı kalsın)
  const loadPlaces = () => {
    if (!places)
      import('../data/countryPlaces')
        .then((m) => {
          setPlaces(m.PLACES);
          setTrOnly(m.TR_ONLY_PLACES);
        })
        .catch(() => {});
  };
  useEffect(() => setErr(false), [q]);

  const resolve = (text: string): { code: string; city?: string } | null => {
    const n = norm(text);
    if (!n) return null;
    const c = countries.find((x) => norm(x.n) === n || norm(x.en) === n);
    if (c) return { code: c.c };
    if (places) {
      for (const [code, list] of Object.entries(places)) {
        const p = list.find((x) => norm(x.en) === n);
        if (p) return { code, city: p.en };
      }
    }
    const pre = countries.find((x) => norm(x.n).startsWith(n) || norm(x.en).startsWith(n));
    return pre ? { code: pre.c } : null;
  };

  const items = useMemo(() => new Map(getPassportItems(passport).map((x) => [x.c, x])), [passport]);
  const destCode = (q.trim() ? resolve(q)?.code : destination) || '';
  const vi = destCode && destCode !== passport ? items.get(destCode) : undefined;
  const visaLine = (() => {
    if (!destCode || !vi) return null;
    const name = getCountryName(destCode, language);
    const d = /^\d+$/.test(vi.v) ? vi.v : '';
    if (vi.id) return { ok: true, t: l(`${name}: kimlik kartıyla giriş`, `${name}: entry with ID card`, `${name}: Einreise mit Ausweis`, `${name}: entrada con DNI`, `${name}: въезд по ID-карте`) };
    if (vi.cat === 'free') return { ok: true, t: l(`${name}: ${d ? d + ' gün ' : ''}vizesiz`, `${name}: visa-free${d ? ` for ${d} days` : ''}`, `${name}: visumfrei${d ? ` für ${d} Tage` : ''}`, `${name}: sin visado${d ? ` ${d} días` : ''}`, `${name}: без визы${d ? ` ${d} дн.` : ''}`) };
    if (vi.cat === 'evisa' || vi.cat === 'eta') return { ok: false, t: l(`${name}: online e-vize / ETA gerekli`, `${name}: eVisa / ETA needed online`, `${name}: eVisum / ETA online nötig`, `${name}: eVisa / ETA en línea`, `${name}: нужна eVisa / ETA`) };
    if (vi.cat === 'voa') return { ok: false, t: l(`${name}: kapıda vize`, `${name}: visa on arrival`, `${name}: Visum bei Ankunft`, `${name}: visado a la llegada`, `${name}: виза по прилёте`) };
    return { ok: false, t: l(`${name}: vize gerekli`, `${name}: visa required`, `${name}: Visum nötig`, `${name}: visado necesario`, `${name}: нужна виза`) };
  })();
  const fromOpts = useMemo(() => countries.filter((x) => GEO_DATA[x.c]?.mainHub), [countries]);

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    // kutu boşsa ana sayfada seçili ülke (üstteki şeritle aynı) kullanılır
    const r = q.trim() ? resolve(q) : destination && GEO_DATA[destination] ? { code: destination } : null;
    if (!r) {
      setErr(true);
      return;
    }
    try {
      localStorage.setItem(TRIP_KEY, JSON.stringify(trip));
      sessionStorage.setItem('vz_cview', tab === 'visa' ? 'guide' : 'book');
      const j = JUMP[tab];
      if (j) sessionStorage.setItem('vz_bk_jump', j);
      if (r.city) sessionStorage.setItem(`vz_bk_city_${r.code}`, r.city);
    } catch {}
    onOpenCountry(r.code);
  };

  // Öneri listesi: yazılan metne göre en fazla 8 sonuç (binlerce seçenekli datalist mobilde donduruyordu)
  const [open, setOpen] = useState(false);
  const [act, setAct] = useState(-1);
  const pick = (v: string) => {
    setQ(v);
    setOpen(false);
    setAct(-1);
    const r = resolve(v);
    if (r && onDestination) onDestination(r.code);
  };
  const sugg = useMemo(() => {
    const n = norm(q);
    if (!n) return [] as { label: string; sub: string; value: string }[];
    const out: { label: string; sub: string; value: string }[] = [];
    for (const x of countries) {
      if (norm(x.n).startsWith(n) || norm(x.en).startsWith(n)) out.push({ label: x.n, sub: '', value: x.n });
      if (out.length >= 5) break;
    }
    if (places && n.length >= 2) {
      for (const [code, list] of Object.entries(places)) {
        for (const p of list) {
          if (norm(p.en).startsWith(n) && !(language !== 'tr' && trOnly?.has(p.en)) && !out.some((o) => o.value === p.en)) out.push({ label: p.en, sub: getCountryName(code, language), value: p.en });
          if (out.length >= 8) break;
        }
        if (out.length >= 8) break;
      }
    }
    return out;
  }, [q, countries, places, language, trOnly]);

  return (
    <form className="vz-hb" onSubmit={go} aria-label={l('Tatil ara', 'Search a trip', 'Reise suchen', 'Buscar viaje', 'Поиск поездки')}>
      <div className="vz-hb-tabs" role="tablist" aria-label={l('Ne arıyorsun?', 'What are you looking for?', 'Was suchst du?', '¿Qué buscas?', 'Что ищете?')}>
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={tab === t.id ? 'on' : ''}
            onClick={() => (t.id === 'easy' && onEasy ? onEasy() : setTab(t.id))}
          >
            <Icon name={TAB_ICON[t.id] as never} size={16} />
            {t.label}
          </button>
        ))}
      </div>
      <div className={`vz-hb-row${tab === 'visa' ? ' visa' : ''}`}>
        {tab !== 'visa' && (
          <label className="vz-tb-f vz-hb-from">
            <small>{l('Nereden', 'From', 'Von', 'Desde', 'Откуда')}</small>
            <select value={trip.from} onChange={(e) => setTrip((t) => ({ ...t, from: e.target.value }))}>
              {fromOpts.map((o) => <option key={o.c} value={o.c}>{o.n}{GEO_DATA[o.c].mainHub ? ` (${GEO_DATA[o.c].mainHub.split('/')[0]})` : ''}</option>)}
            </select>
          </label>
        )}
        <label className={`vz-tb-f vz-hb-dest${err ? ' bad' : ''}`}>
          <small>{l('Nereye', 'Destination', 'Reiseziel', 'Destino', 'Куда')}</small>
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
              setAct(-1);
            }}
            onKeyDown={(e) => {
              if (!open || !sugg.length) return;
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setAct((a) => (a + 1) % sugg.length);
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setAct((a) => (a <= 0 ? sugg.length - 1 : a - 1));
              } else if (e.key === 'Enter' && act >= 0) {
                e.preventDefault();
                pick(sugg[act].value);
              } else if (e.key === 'Escape') setOpen(false);
            }}
            onFocus={() => {
              loadPlaces();
              setOpen(true);
            }}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            placeholder={destination && GEO_DATA[destination] ? getCountryName(destination, language) + l(' ya da başka bir ülke, şehir…', ' or another country, city…', ' oder ein anderes Land, eine Stadt…', ' u otro país o ciudad…', ' или другая страна, город…') : l('Ülke ya da şehir: Tayland, Bali, Paris…', 'Country or city: Thailand, Bali, Paris…', 'Land oder Stadt: Thailand, Bali, Paris…', 'País o ciudad: Tailandia, Bali, París…', 'Страна или город: Таиланд, Бали, Париж…')}
            autoComplete="off"
            role="combobox"
            aria-expanded={open && sugg.length > 0}
            aria-controls="vz-hb-sugg"
            aria-autocomplete="list"
            aria-activedescendant={open && act >= 0 && act < sugg.length ? `vz-hb-o${act}` : undefined}
          />
          {open && sugg.length > 0 && (
            <ul className="vz-hb-sugg" id="vz-hb-sugg" role="listbox">
              {sugg.map((s, i) => (
                <li
                  key={`${s.value}-${s.sub}`}
                  id={`vz-hb-o${i}`}
                  role="option"
                  aria-selected={i === act}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    pick(s.value);
                  }}
                >
                  <b>{s.label}</b>
                  {s.sub && <span>{s.sub}</span>}
                </li>
              ))}
            </ul>
          )}
        </label>
        {tab !== 'visa' && (<>
        <label className="vz-tb-f">
          <small>{l('Gidiş', 'Depart', 'Hinreise', 'Ida', 'Туда')}</small>
          <input type="date" min={plus(today, 1)} value={trip.d1} onChange={(e) => e.target.value && setTrip((t) => ({ ...t, d1: e.target.value, d2: t.d2 > e.target.value ? t.d2 : plus(e.target.value, 7) }))} />
        </label>
        <label className="vz-tb-f">
          <small>{l('Dönüş', 'Return', 'Rückreise', 'Vuelta', 'Обратно')}</small>
          <input type="date" min={plus(trip.d1, 1)} value={trip.d2} onChange={(e) => e.target.value && setTrip((t) => ({ ...t, d2: e.target.value }))} />
        </label>
        <label className="vz-tb-f sm">
          <small>{l('Yetişkin', 'Adults', 'Erwachsene', 'Adultos', 'Взрослые')}</small>
          <select value={trip.n} onChange={(e) => setTrip((t) => ({ ...t, n: Number(e.target.value) }))}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </label>
        <label className="vz-tb-f sm">
          <small>{l('Çocuk', 'Children', 'Kinder', 'Niños', 'Дети')}</small>
          <select value={trip.c || 0} onChange={(e) => setTrip((t) => ({ ...t, c: Number(e.target.value) }))}>
            {[0, 1, 2, 3, 4].map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </label>
        </>)}
        <button type="submit" className="vz-hb-go">
          <Icon name="search" size={18} />
          {tab === 'visa' ? l('Kuralı gör', 'See the rules', 'Regeln ansehen', 'Ver requisitos', 'Смотреть правила') : l('Fiyatları gör', 'See prices', 'Preise ansehen', 'Ver precios', 'Смотреть цены')}
        </button>
      </div>
      <div className="vz-hb-info">
        {visaLine && (
          <span className={`vz-hb-visa${visaLine.ok ? ' ok' : ''}`}>
            <Icon name={visaLine.ok ? 'check' : 'passport'} size={15} />
            {visaLine.t}
          </span>
        )}
        <span className="vz-hb-partners">{tab === 'visa' ? l('Resmî kaynaklar, kontrol tarihiyle', 'Official sources with check dates', 'Amtliche Quellen mit Prüfdatum', 'Fuentes oficiales con fecha', 'Официальные источники с датой') : l('Aviasales · Kayak · Booking · Agoda · Viator fiyatları karşılaştırılır', 'Compare Aviasales · Kayak · Booking · Agoda · Viator', 'Vergleich: Aviasales · Kayak · Booking · Agoda · Viator', 'Compara Aviasales · Kayak · Booking · Agoda · Viator', 'Сравнение: Aviasales · Kayak · Booking · Agoda · Viator')}</span>
      </div>
      {err && <p className="vz-hb-err" role="alert">{l('Bu yeri bulamadık; listeden bir ülke ya da şehir seç.', 'We could not find that place; pick a country or city from the list.', 'Ort nicht gefunden; wähle ein Land oder eine Stadt aus der Liste.', 'No encontramos ese lugar; elige un país o ciudad de la lista.', 'Место не найдено; выберите страну или город из списка.')}</p>}
    </form>
  );
};
