import React, { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../data/i18n';
import { Icon } from './Icon';
import { Btn, Bullets, Card, Chip, Chips, Field, Flag, LinkBtn, List, Page, Row, Stat, Tags, Tile, TileGrid, VisaBadge, OpenRequest, fmtNum } from './ui';
import { loadDestination } from '../components/redesign/LiveStrip';
import { PlugDiagram } from './PlugDiagram';
import { DEFAULT_PACKING_ITEMS, TripStyle } from '../components/tools/PackingListModal';
import { getPassportItems } from '../utils/calculator';
import { getCountryName, DIGITAL_NOMAD_VISAS, AFFILIATE_PARTNERS, getLocalizedPartner } from '../data/passportData';
import { PartnerLogo } from './PartnerLogo';
import { GEO_DATA } from '../data/geoData';
import { GLOBAL_CURRENCIES } from '../data/countryGeography';
import { getCrossRate, USD_RATES } from '../data/currencyRates';
import { useLiveFx, useLiveWeather, liveWeatherKey, refreshLiveFx } from '../utils/liveData';
import { getCountryTravelIntelligence } from '../data/countryTravelIntelligence';
import { getCountryInsights } from '../data/countryInsights';
import { getVerifiedCountryRecord } from '../data/verifiedCountryData';
import { getConsularEmergencyInfo } from '../data/consularEmergencyData';

type L3 = { tr: string; en: string; de: string };
const pick3 = (o: L3 | undefined, lang: string) => (o ? (lang === 'tr' ? o.tr : lang === 'de' ? o.de || o.en : o.en || o.tr) : '');
const countryOpts = (lang: string) => Object.keys(GEO_DATA).map((c) => ({ c, n: getCountryName(c, lang) })).sort((a, b) => a.n.localeCompare(b.n, lang));

function useChecked(key: string) {
  const [set, setSet] = useState<Set<string>>(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem(key) || '[]'));
    } catch {
      return new Set();
    }
  });
  const toggle = (id: string) => {
    const n = new Set(set);
    n.has(id) ? n.delete(id) : n.add(id);
    setSet(n);
    try {
      localStorage.setItem(key, JSON.stringify(Array.from(n)));
    } catch {}
  };
  const reset = () => {
    setSet(new Set());
    try {
      localStorage.removeItem(key);
    } catch {}
  };
  return { set, toggle, reset };
}

const Check: React.FC<{ id: string; on: boolean; onToggle: () => void; children: React.ReactNode; sub?: string }> = ({ id, on, onToggle, children, sub }) => (
  <label className={`vz-check${on ? ' on' : ''}`} htmlFor={id}>
    <input id={id} type="checkbox" checked={on} onChange={onToggle} />
    <span className="vz-check-box" aria-hidden="true"><Icon name="check" size={14} duo={false} /></span>
    <span className="vz-row-b"><span className="vz-row-t">{children}</span>{sub && <span className="vz-row-s">{sub}</span>}</span>
  </label>
);

const DestSelect: React.FC<{ id: string; value: string; onChange: (c: string) => void; label?: string }> = ({ id, value, onChange, label }) => {
  const { l, language } = useI18n();
  const opts = useMemo(() => countryOpts(language), [language]);
  return (
    <Field label={label || l('Ülke', 'Country', 'Land', 'País', 'Страна')} htmlFor={id}>
      <select id={id} className="vz-select" value={value} onChange={(e) => onChange(e.target.value)}>
        {opts.map((o) => <option key={o.c} value={o.c}>{o.n}</option>)}
      </select>
    </Field>
  );
};

/* ---------------- Bavul listesi ---------------- */
interface CustomPack { id: string; text: string; cat: string }
const PackView: React.FC<{ dest: string; setDest: (c: string) => void }> = ({ dest, setDest }) => {
  const { l, language } = useI18n();
  const [style, setStyle] = useState<TripStyle>('city');
  const ck = useChecked('vz_pack_v1');
  const [custom, setCustom] = useState<CustomPack[]>(() => {
    try {
      const v = JSON.parse(localStorage.getItem('vz_pack_custom_v1') || '[]');
      return Array.isArray(v) ? v : [];
    } catch {
      return [];
    }
  });
  const storeCustom = (n: CustomPack[]) => {
    setCustom(n);
    try {
      localStorage.setItem('vz_pack_custom_v1', JSON.stringify(n));
    } catch {}
  };
  const [newText, setNewText] = useState('');
  const [newCat, setNewCat] = useState('clothes');
  const addItem = (text: string, cat: string) => {
    const t = text.trim();
    if (!t || custom.some((c) => c.text.toLocaleLowerCase(language) === t.toLocaleLowerCase(language))) return;
    storeCustom([...custom, { id: `cu-${Date.now()}`, text: t, cat }]);
  };
  // hedefin havasına göre öneri
  const g = GEO_DATA[dest];
  const coords = useMemo(() => (g ? [{ lat: g.lat, lng: g.lng }] : []), [g]);
  const wx = useLiveWeather(coords);
  const w = g ? wx[liveWeatherKey(g.lat, g.lng)] : undefined;
  const [wxSlow, setWxSlow] = useState(false);
  useEffect(() => {
    setWxSlow(false);
    const t = setTimeout(() => setWxSlow(true), 8000);
    return () => clearTimeout(t);
  }, [dest]);
  const suggestions: { text: string; cat: string }[] = [];
  if (w) {
    const rain = (w.code >= 51 && w.code <= 82) || w.code >= 95;
    if (w.tempC <= 8) suggestions.push({ text: l('Kalın mont', 'Warm coat', 'Warme Jacke', 'Abrigo', 'Тёплая куртка'), cat: 'clothes' }, { text: l('Bere ve eldiven', 'Hat and gloves', 'Mütze & Handschuhe', 'Gorro y guantes', 'Шапка и перчатки'), cat: 'clothes' }, { text: l('Termal içlik', 'Thermal layer', 'Thermowäsche', 'Ropa térmica', 'Термобельё'), cat: 'clothes' });
    else if (w.tempC <= 17) suggestions.push({ text: l('Hırka ya da ince mont', 'Light jacket', 'Leichte Jacke', 'Chaqueta ligera', 'Лёгкая куртка'), cat: 'clothes' }, { text: l('Kapalı ayakkabı', 'Closed shoes', 'Geschlossene Schuhe', 'Zapato cerrado', 'Закрытая обувь'), cat: 'clothes' });
    if (w.tempC >= 25) suggestions.push({ text: l('Güneş kremi (SPF 50)', 'Sunscreen (SPF 50)', 'Sonnencreme (LSF 50)', 'Protector solar', 'Солнцезащитный крем'), cat: 'health' }, { text: l('Şapka ve güneş gözlüğü', 'Hat and sunglasses', 'Hut & Sonnenbrille', 'Gorra y gafas', 'Шляпа и очки'), cat: 'clothes' }, { text: l('Matara', 'Water bottle', 'Trinkflasche', 'Botella de agua', 'Бутылка для воды'), cat: 'health' });
    if (rain) suggestions.push({ text: l('Katlanır şemsiye', 'Compact umbrella', 'Taschenschirm', 'Paraguas', 'Зонт'), cat: 'clothes' }, { text: l('Su geçirmez ceket', 'Rain jacket', 'Regenjacke', 'Chubasquero', 'Дождевик'), cat: 'clothes' });
    if (w.humidity >= 75) suggestions.push({ text: l('Sivrisinek kovucu', 'Insect repellent', 'Mückenschutz', 'Repelente', 'Репеллент'), cat: 'health' });
  }
  const freshSug = suggestions.filter((x) => !custom.some((c) => c.text === x.text));
  const styles: { id: TripStyle; label: string }[] = [
    { id: 'city', label: l('Şehir', 'City', 'Stadt', 'Ciudad', 'Город') },
    { id: 'beach', label: l('Deniz', 'Beach', 'Strand', 'Playa', 'Пляж') },
    { id: 'winter', label: l('Kış', 'Winter', 'Winter', 'Invierno', 'Зима') },
    { id: 'backpack', label: l('Sırt çantası', 'Backpacking', 'Rucksack', 'Mochilero', 'Бэкпекинг') },
    { id: 'nomad', label: l('Göçebe / iş', 'Nomad / work', 'Nomade / Arbeit', 'Nómada', 'Работа') }
  ];
  const cats: { id: string; label: string; icon: string }[] = [
    { id: 'docs', label: l('Belgeler ve para', 'Documents & money', 'Dokumente & Geld', 'Documentos', 'Документы'), icon: 'doc' },
    { id: 'tech', label: l('Elektronik', 'Electronics', 'Elektronik', 'Electrónica', 'Техника'), icon: 'plug' },
    { id: 'health', label: l('Sağlık', 'Health', 'Gesundheit', 'Salud', 'Здоровье'), icon: 'heart' },
    { id: 'clothes', label: l('Kıyafet ve aksesuar', 'Clothes & extras', 'Kleidung', 'Ropa', 'Одежда'), icon: 'bag' },
    { id: 'nomad', label: l('Çalışma düzeni', 'Work setup', 'Arbeitsplatz', 'Trabajo', 'Работа'), icon: 'laptop' }
  ];
  const base = DEFAULT_PACKING_ITEMS.filter((it) => it.styles.includes(style));
  const items = [...base.map((it) => ({ id: it.id, category: it.category as string })), ...custom.map((c) => ({ id: c.id, category: c.cat }))];
  const done = items.filter((it) => ck.set.has(it.id)).length;
  return (
    <div className="vz-stack">
      <Chips scroll>{styles.map((s) => <Chip key={s.id} on={style === s.id} onClick={() => setStyle(s.id)}>{s.label}</Chip>)}</Chips>
      <div className="vz-card tone-sea" style={{ gap: 10 }}>
        <div className="vz-row-flex" style={{ alignItems: 'flex-end' }}>
          <div style={{ flex: 1, minWidth: 200 }}><DestSelect id="vz-pk-d" value={dest} onChange={setDest} label={l('Nereye?', 'Where to?', 'Wohin?', '¿A dónde?', 'Куда?')} /></div>
          {w && <span className="vz-badge tone-sea">{w.tempC}° · %{w.humidity}</span>}
        </div>
        {freshSug.length > 0 ? (
          <>
            <span className="vz-muted" style={{ fontSize: 13 }}>{l('Şu anki havaya göre önerilerimiz; dokun, listene eklensin:', 'Suggested for the current weather; tap to add:', 'Passend zum Wetter; antippen zum Hinzufügen:', 'Según el tiempo; toca para añadir:', 'По погоде; нажмите, чтобы добавить:')}</span>
            <Chips>{freshSug.map((x) => <Chip key={x.text} icon="plus" onClick={() => addItem(x.text, x.cat)}>{x.text}</Chip>)}</Chips>
          </>
        ) : (
          <span className="vz-muted" style={{ fontSize: 13 }}>{w ? l('Bu hava için ek önerimiz yok.', 'Nothing extra for this weather.', 'Nichts Zusätzliches.', 'Nada extra.', 'Ничего дополнительно.') : wxSlow ? l('Hava bilgisi şu an alınamadı; listeyi yolculuk tipine göre kullan.', 'Weather is unavailable right now; use the list by trip type.', 'Wetter nicht verfügbar.', 'Tiempo no disponible.', 'Погода недоступна.') : l('Hava bilgisi alınıyor…', 'Getting the weather…', 'Wetter wird geladen…', 'Cargando el tiempo…', 'Загрузка погоды…')}</span>
        )}
      </div>
      <div className="vz-row-flex" style={{ justifyContent: 'space-between' }}>
        <b>{l(`${done}/${items.length} hazır`, `${done}/${items.length} packed`, `${done}/${items.length} gepackt`, `${done}/${items.length} listo`, `${done}/${items.length} готово`)}</b>
        <Btn variant="ghost" small icon="trash" onClick={ck.reset}>{l('Sıfırla', 'Reset', 'Zurücksetzen', 'Reiniciar', 'Сбросить')}</Btn>
      </div>
      <div className="vz-meter"><i style={{ width: `${items.length ? (done / items.length) * 100 : 0}%`, background: 'linear-gradient(90deg, var(--vz-acc-a), var(--vz-acc-b))' }} /></div>
      {cats.map((c) => {
        const list = base.filter((it) => it.category === c.id);
        const mine = custom.filter((it) => it.cat === c.id);
        if (!list.length && !mine.length) return null;
        return (
          <section key={c.id} className="vz-stack" style={{ gap: 8 }}>
            <span className="vz-row-flex" style={{ gap: 8, fontWeight: 700 }}><Icon name={c.icon} size={18} />{c.label}</span>
            <div className="vz-list">
              {list.map((it) => <Check key={it.id} id={`pk-${it.id}`} on={ck.set.has(it.id)} onToggle={() => ck.toggle(it.id)}>{language === 'tr' ? it.text.tr : it.text.en}</Check>)}
              {mine.map((it) => (
                <div key={it.id} className="vz-check-wrap">
                  <Check id={`pk-${it.id}`} on={ck.set.has(it.id)} onToggle={() => ck.toggle(it.id)} sub={l('Senin eklediğin', 'Added by you', 'Von dir', 'Añadido por ti', 'Ваш пункт')}>{it.text}</Check>
                  <button type="button" className="vz-iconbtn" onClick={() => storeCustom(custom.filter((x) => x.id !== it.id))} aria-label={l('Sil', 'Delete', 'Löschen', 'Borrar', 'Удалить')}><Icon name="trash" size={16} duo={false} /></button>
                </div>
              ))}
            </div>
          </section>
        );
      })}
      <form className="vz-card" onSubmit={(e) => { e.preventDefault(); addItem(newText, newCat); setNewText(''); }}>
        <b>{l('Kendi maddeni ekle', 'Add your own item', 'Eigenen Punkt hinzufügen', 'Añade tu artículo', 'Добавьте свой пункт')}</b>
        <div className="vz-formgrid">
          <Field label={l('Ne?', 'What?', 'Was?', '¿Qué?', 'Что?')} htmlFor="vz-pk-new"><input id="vz-pk-new" className="vz-input" value={newText} onChange={(e) => setNewText(e.target.value)} placeholder={l('ör. Şarj kablosu', 'e.g. Charging cable', 'z. B. Ladekabel', 'p. ej. Cargador', 'напр. Зарядка')} /></Field>
          <Field label={l('Bölüm', 'Section', 'Bereich', 'Sección', 'Раздел')} htmlFor="vz-pk-cat">
            <select id="vz-pk-cat" className="vz-select" value={newCat} onChange={(e) => setNewCat(e.target.value)}>{cats.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}</select>
          </Field>
        </div>
        <Btn type="submit" icon="plus" style={{ alignSelf: 'flex-start' }}>{l('Ekle', 'Add', 'Hinzufügen', 'Añadir', 'Добавить')}</Btn>
      </form>
    </div>
  );
};

/* ---------------- Evrak listesi ---------------- */
const DocsCheckView: React.FC<{ passport: string; dest: string; setDest: (c: string) => void }> = ({ passport, dest, setDest }) => {
  const { l, language } = useI18n();
  const item = useMemo(() => getPassportItems(passport).find((x) => x.c === dest) || null, [passport, dest]);
  const intel = useMemo(() => getCountryTravelIntelligence(dest, getCountryName(dest, 'en')), [dest]);
  const ck = useChecked(`vz_docs_${passport}_${dest}`);
  const needVisa = item && (item.cat === 'visa' || item.cat === 'evisa' || item.cat === 'eta');
  const rows: { id: string; t: string; s?: string }[] = [
    { id: 'pass', t: l('Pasaport, dönüşten sonra en az 6 ay geçerli', 'Passport valid 6+ months after return', 'Pass 6+ Monate gültig', 'Pasaporte válido 6+ meses', 'Паспорт действует 6+ мес.'), s: l('Bazı ülkeler 3 ay ister; 6 ay en güvenlisi.', 'Some ask 3 months; 6 is safest.', 'Manche verlangen 3 Monate.', 'Algunos piden 3 meses.', 'Некоторые просят 3 мес.') },
    ...(item?.id ? [{ id: 'idc', t: l('Çipli kimlik kartı (kimlikle giriş)', 'National ID card (ID entry)', 'Personalausweis', 'DNI', 'ID-карта') }] : []),
    ...(needVisa ? [{ id: 'visa', t: item?.cat === 'visa' ? l('Konsolosluk vizesi', 'Consular visa', 'Konsulatsvisum', 'Visado consular', 'Консульская виза') : item?.cat === 'eta' ? l('ETA / elektronik seyahat izni', 'ETA / travel authorisation', 'ETA', 'ETA', 'ETA') : l('E-vize çıktısı', 'eVisa printout', 'eVisum-Ausdruck', 'eVisa impresa', 'eVisa распечатка') }] : []),
    ...(item?.cat === 'voa' ? [{ id: 'voa', t: l('Kapıda vize ücreti (nakit) ve vesikalık', 'Visa-on-arrival fee (cash) and photo', 'Gebühr bar + Foto', 'Tasa en efectivo y foto', 'Сбор наличными и фото') }] : []),
    { id: 'ins', t: intel.waterAndHealth.insuranceRequired ? l('Seyahat sağlık sigortası (zorunlu)', 'Travel health insurance (required)', 'Reiseversicherung (Pflicht)', 'Seguro (obligatorio)', 'Страховка (обязательна)') : l('Seyahat sağlık sigortası', 'Travel health insurance', 'Reiseversicherung', 'Seguro de viaje', 'Страховка') },
    { id: 'ret', t: l('Dönüş ya da devam bileti', 'Return or onward ticket', 'Rück- oder Weiterflug', 'Billete de vuelta', 'Обратный билет') },
    { id: 'stay', t: l('Konaklama belgesi (rezervasyon)', 'Proof of accommodation', 'Unterkunftsnachweis', 'Reserva de alojamiento', 'Бронь жилья') },
    { id: 'fund', t: l('Yeterli para / kart', 'Proof of funds / cards', 'Geldnachweis', 'Fondos suficientes', 'Средства') },
    ...(intel.waterAndHealth.vaccines.length ? [{ id: 'vax', t: l('Aşı kartı', 'Vaccination card', 'Impfpass', 'Cartilla de vacunas', 'Прививки'), s: intel.waterAndHealth.vaccines.join(', ') }] : []),
    { id: 'copy', t: l('Belgelerin dijital kopyası (bulutta)', 'Digital copies of documents (cloud)', 'Digitale Kopien', 'Copias digitales', 'Цифровые копии') }
  ];
  const done = rows.filter((r) => ck.set.has(r.id)).length;
  return (
    <div className="vz-stack">
      <div className="vz-row-flex" style={{ alignItems: 'flex-end' }}>
        <div style={{ flex: 1, minWidth: 220 }}><DestSelect id="vz-dc-d" value={dest} onChange={setDest} label={l('Nereye?', 'Where to?', 'Wohin?', '¿A dónde?', 'Куда?')} /></div>
        <VisaBadge item={item} big />
      </div>
      <b>{l(`${done}/${rows.length} hazır`, `${done}/${rows.length} ready`, `${done}/${rows.length} bereit`, `${done}/${rows.length} listo`, `${done}/${rows.length} готово`)}</b>
      <div className="vz-list">{rows.map((r) => <Check key={r.id} id={`dc-${r.id}`} on={ck.set.has(r.id)} onToggle={() => ck.toggle(r.id)} sub={r.s}>{r.t}</Check>)}</div>
    </div>
  );
};

/* ---------------- Döviz çevirici ---------------- */
const FxView: React.FC<{ passport: string; dest: string }> = ({ passport, dest }) => {
  const { l, language } = useI18n();
  const { updatedAt } = useLiveFx();
  const [refreshing, setRefreshing] = useState(false);
  const curs = useMemo(() => Object.keys(USD_RATES).sort(), []);
  const [from, setFrom] = useState(GLOBAL_CURRENCIES[passport]?.code || 'EUR');
  const [to, setTo] = useState(GLOBAL_CURRENCIES[dest]?.code || 'USD');
  const [amt, setAmt] = useState('100');
  const n = parseFloat(amt.replace(',', '.')) || 0;
  const ok = !!(USD_RATES[from] && USD_RATES[to]);
  const rate = ok ? getCrossRate(from, to) : 0;
  const curName = useMemo(() => {
    let dn: Intl.DisplayNames | null = null;
    try {
      dn = new Intl.DisplayNames([language], { type: 'currency' });
    } catch {}
    return (c: string) => {
      try {
        return dn?.of(c) || c;
      } catch {
        return c;
      }
    };
  }, [language]);
  // para birimi → bayrak için bir ülke (EUR için AB yerine Almanya değil, ortak bayrak yok; ilk eşleşen)
  const curFlag = (c: string) => (c === 'EUR' ? 'EU' : c === 'USD' ? 'US' : c === 'GBP' ? 'GB' : Object.keys(GLOBAL_CURRENCIES).find((k) => GLOBAL_CURRENCIES[k].code === c) || '');
  const popular = Array.from(new Set([GLOBAL_CURRENCIES[passport]?.code, GLOBAL_CURRENCIES[dest]?.code, 'EUR', 'USD', 'GBP', 'TRY', 'AED', 'THB', 'JPY', 'CHF'].filter((c): c is string => !!c && !!USD_RATES[c])));
  return (
    <div className="vz-stack">
      <Chips scroll>
        {popular.map((c) => (
          <Chip key={c} on={to === c} onClick={() => (c === from ? (setFrom(to), setTo(c)) : setTo(c))}>{c}</Chip>
        ))}
      </Chips>
      <div className="vz-fx">
        <Field label={l('Tutar', 'Amount', 'Betrag', 'Importe', 'Сумма')} htmlFor="vz-fx-a"><input id="vz-fx-a" inputMode="decimal" className="vz-input" value={amt} onChange={(e) => setAmt(e.target.value)} /></Field>
        <Field label={l('Bu paradan', 'From', 'Von', 'De', 'Из')} htmlFor="vz-fx-f"><select id="vz-fx-f" className="vz-select" value={from} onChange={(e) => setFrom(e.target.value)}>{curs.map((c) => <option key={c} value={c}>{c} · {curName(c)}</option>)}</select></Field>
        <button type="button" className="vz-iconbtn" onClick={() => { setFrom(to); setTo(from); }} aria-label={l('Yer değiştir', 'Swap', 'Tauschen', 'Intercambiar', 'Поменять')} style={{ alignSelf: 'flex-end', marginBottom: 3 }}><Icon name="fx" size={18} duo={false} /></button>
        <Field label={l('Bu paraya', 'To', 'Nach', 'A', 'В')} htmlFor="vz-fx-t"><select id="vz-fx-t" className="vz-select" value={to} onChange={(e) => setTo(e.target.value)}>{curs.map((c) => <option key={c} value={c}>{c} · {curName(c)}</option>)}</select></Field>
      </div>
      <Card tone="sea">
        <span className="vz-row-flex" style={{ gap: 8 }}>
          {curFlag(from) && <Flag code={curFlag(from)} size="sm" />}
          <span className="vz-muted">{fmtNum(n, language, 2)} {curName(from)}</span>
          <Icon name="next" size={14} duo={false} />
          {curFlag(to) && <Flag code={curFlag(to)} size="sm" />}
          <span className="vz-muted">{curName(to)}</span>
        </span>
        <b style={{ fontSize: 30, letterSpacing: '-0.02em' }}>{ok ? `${fmtNum(n * rate, language, 2)} ${to}` : '—'}</b>
        <span className="vz-muted">{ok ? `1 ${from} = ${fmtNum(rate, language, 4)} ${to}` : l('Bu para birimi için kur bulunamadı', 'No rate for this currency', 'Kein Kurs', 'Sin tipo de cambio', 'Нет курса')}</span>
        <span className="vz-row-flex" style={{ gap: 8 }}>
          <span className="vz-muted" style={{ fontSize: 12.5 }}>{updatedAt ? l(`Güncelleme: ${new Date(updatedAt).toLocaleString(language)}`, `Updated: ${new Date(updatedAt).toLocaleString(language)}`, `Stand: ${new Date(updatedAt).toLocaleString(language)}`, `Actualizado: ${new Date(updatedAt).toLocaleString(language)}`, `Обновлено: ${new Date(updatedAt).toLocaleString(language)}`) : l('Kayıtlı kurlar', 'Stored rates', 'Gespeicherte Kurse', 'Tipos guardados', 'Сохранённые курсы')}</span>
          <Btn small variant="ghost" icon="fx" disabled={refreshing} onClick={() => { setRefreshing(true); refreshLiveFx(true).finally(() => setRefreshing(false)); }}>{refreshing ? l('Yenileniyor…', 'Refreshing…', 'Lädt…', 'Actualizando…', 'Обновление…') : l('Kurları yenile', 'Refresh rates', 'Kurse aktualisieren', 'Actualizar', 'Обновить')}</Btn>
        </span>
      </Card>
      {ok && (
        <div className="vz-grid">
          <List>{[10, 50, 100, 500, 1000].map((x) => <Row key={x} icon="coin" title={`${fmtNum(x, language)} ${from}`} right={<span>{fmtNum(x * rate, language, 2)} {to}</span>} />)}</List>
          <List>{[10, 50, 100, 500, 1000].map((x) => <Row key={x} icon="coin" title={`${fmtNum(x, language)} ${to}`} right={<span>{fmtNum(x / rate, language, 2)} {from}</span>} />)}</List>
        </div>
      )}
    </div>
  );
};

/* ---------------- Bahşiş ---------------- */
const TipView: React.FC<{ dest: string; setDest: (c: string) => void }> = ({ dest, setDest }) => {
  const { l, language } = useI18n();
  const intel = useMemo(() => getCountryTravelIntelligence(dest, getCountryName(dest, 'en')), [dest]);
  const cur = GLOBAL_CURRENCIES[dest];
  const [bill, setBill] = useState('100');
  const [pct, setPct] = useState(intel.tipping.standardPercent || 10);
  const [people, setPeople] = useState(1);
  useEffect(() => setPct(intel.tipping.standardPercent || 0), [intel]);
  const [sit, setSit] = useState<'rest' | 'cafe' | 'taxi' | 'hotel'>('rest');
  const std = intel.tipping.standardPercent || 0;
  const pickSit = (k: typeof sit) => {
    setSit(k);
    // genel yaklaşım: kafede standardın yarısı, takside yukarı yuvarlama, otelde sabit küçük miktar
    setPct(k === 'rest' ? std : k === 'cafe' ? Math.round(std / 2) : 0);
  };
  const b = parseFloat(bill.replace(',', '.')) || 0;
  const roundStep = b >= 100 ? 10 : b >= 20 ? 5 : 1;
  const tip = sit === 'taxi' && intel.tipping.rule !== 'forbidden' ? Math.ceil(b / roundStep) * roundStep - b : (b * pct) / 100;
  const ruleLabel: Record<string, string> = {
    mandatory: l('Zorunlu / servis dahil', 'Mandatory / included', 'Pflicht', 'Obligatoria', 'Обязательно'),
    expected: l('Beklenir', 'Expected', 'Erwartet', 'Se espera', 'Ожидается'),
    round_up: l('Yukarı yuvarla', 'Round up', 'Aufrunden', 'Redondear', 'Округлить'),
    optional: l('İsteğe bağlı', 'Optional', 'Optional', 'Opcional', 'По желанию'),
    forbidden: l('Hoş karşılanmaz', 'Not done', 'Unüblich', 'No se hace', 'Не принято')
  };
  return (
    <div className="vz-stack">
      <DestSelect id="vz-tip-d" value={dest} onChange={setDest} />
      <Card tone={intel.tipping.rule === 'forbidden' ? 'warn' : 'sea'} icon="receipt" eyebrow={ruleLabel[intel.tipping.rule]} title={intel.tipping.custom}>
        {intel.tipping.note && <p className="vz-muted">{intel.tipping.note}</p>}
      </Card>
      <Chips scroll>
        {([
          ['rest', l('Restoran', 'Restaurant', 'Restaurant', 'Restaurante', 'Ресторан')],
          ['cafe', l('Kafe / bar', 'Café / bar', 'Café / Bar', 'Café / bar', 'Кафе / бар')],
          ['taxi', l('Taksi', 'Taxi', 'Taxi', 'Taxi', 'Такси')],
          ['hotel', l('Otel / rehber', 'Hotel / guide', 'Hotel / Guide', 'Hotel / guía', 'Отель / гид')]
        ] as const).map(([k, t]) => <Chip key={k} on={sit === k} onClick={() => pickSit(k)}>{t}</Chip>)}
      </Chips>
      {sit === 'taxi' && <p className="vz-muted" style={{ fontSize: 14 }}>{intel.tipping.rule === 'forbidden' ? l('Bu ülkede taksiye bahşiş verilmez.', 'Tipping taxis isn’t done here.', 'Hier unüblich.', 'Aquí no se da propina.', 'Здесь не принято.') : l('Taksilerde çoğu yerde ücret yukarı yuvarlanır.', 'In most places you just round the fare up.', 'Meist wird aufgerundet.', 'Normalmente se redondea.', 'Обычно округляют.')}</p>}
      {sit === 'hotel' && <p className="vz-muted" style={{ fontSize: 14 }}>{intel.tipping.rule === 'forbidden' ? l('Bu ülkede bahşiş hoş karşılanmaz.', 'Tipping isn’t welcome here.', 'Hier unüblich.', 'No es costumbre.', 'Здесь не принято.') : l('Bavul taşıyan görevliye ya da tur rehberine genelde küçük, sabit bir miktar bırakılır; oranı kendin belirle.', 'Porters and guides usually get a small fixed amount; set your own percentage.', 'Meist ein kleiner fester Betrag.', 'Suele darse una pequeña cantidad fija.', 'Обычно небольшая фиксированная сумма.')}</p>}
      <div className="vz-formgrid">
        <Field label={l(`Hesap (${cur?.code || ''})`, `Bill (${cur?.code || ''})`, `Rechnung (${cur?.code || ''})`, `Cuenta (${cur?.code || ''})`, `Счёт (${cur?.code || ''})`)} htmlFor="vz-tip-b"><input id="vz-tip-b" inputMode="decimal" className="vz-input" value={bill} onChange={(e) => setBill(e.target.value)} /></Field>
        <Field label={l('Bahşiş oranı (%)', 'Tip (%)', 'Trinkgeld (%)', 'Propina (%)', 'Чаевые (%)')} htmlFor="vz-tip-p"><input id="vz-tip-p" type="number" min={0} max={40} className="vz-input" value={pct} onChange={(e) => setPct(Math.max(0, Number(e.target.value) || 0))} /></Field>
        <Field label={l('Kişi', 'People', 'Personen', 'Personas', 'Человек')} htmlFor="vz-tip-n"><input id="vz-tip-n" type="number" min={1} max={30} className="vz-input" value={people} onChange={(e) => setPeople(Math.max(1, Number(e.target.value) || 1))} /></Field>
      </div>
      <div className="vz-stats">
        <Stat value={`${fmtNum(tip, language, 2)} ${cur?.symbol || ''}`} label={l('Bahşiş', 'Tip', 'Trinkgeld', 'Propina', 'Чаевые')} icon="receipt" />
        <Stat value={`${fmtNum(b + tip, language, 2)} ${cur?.symbol || ''}`} label={l('Toplam', 'Total', 'Gesamt', 'Total', 'Итого')} icon="wallet" />
        {people > 1 && <Stat value={`${fmtNum((b + tip) / people, language, 2)} ${cur?.symbol || ''}`} label={l('Kişi başı', 'Per person', 'Pro Person', 'Por persona', 'На человека')} icon="people" tone="ok" />}
      </div>
    </div>
  );
};

/* ---------------- Priz & eSIM ---------------- */
const PlugView: React.FC<{ dest: string; setDest: (c: string) => void }> = ({ dest, setDest }) => {
  const { l, language } = useI18n();
  const intel = useMemo(() => getCountryTravelIntelligence(dest, getCountryName(dest, 'en')), [dest]);
  const ins = useMemo(() => getCountryInsights(dest, language), [dest, language]);
  const esims = AFFILIATE_PARTNERS.filter((a) => /esim/i.test(a.category + a.title));
  return (
    <div className="vz-stack">
      <DestSelect id="vz-plug-d" value={dest} onChange={setDest} />
      <div className="vz-stats">
        <Stat value={intel.plugs.types.join(', ')} label={l('Fiş tipi', 'Plug type', 'Steckertyp', 'Enchufe', 'Тип розетки')} icon="plug" />
        <Stat value={`${intel.plugs.voltage} · ${intel.plugs.frequency}`} label={l('Voltaj', 'Voltage', 'Spannung', 'Voltaje', 'Напряжение')} icon="spark" />
        <Stat value={intel.plugs.needsAdapterFromTR ? l('Gerekli', 'Needed', 'Nötig', 'Necesario', 'Нужен') : l('Gerekmez', 'Not needed', 'Nicht nötig', 'No', 'Не нужен')} label={l('C/F fişe adaptör', 'Adapter for C/F plugs', 'Adapter C/F', 'Adaptador C/F', 'Адаптер C/F')} icon="plug" tone={intel.plugs.needsAdapterFromTR ? 'warn' : 'ok'} />
        <Stat value={`${ins.internet.mobileSpeedMbps} Mbps`} label={l('Mobil internet', 'Mobile internet', 'Mobiles Internet', 'Internet móvil', 'Моб. интернет')} icon="wifi" />
        <Stat value={String(intel.connectivity.avgGbPriceUsd).startsWith("$") ? String(intel.connectivity.avgGbPriceUsd) : `$${intel.connectivity.avgGbPriceUsd}`} label={l('1 GB ortalama', 'Avg per GB', 'Ø pro GB', 'Media por GB', 'Средне за ГБ')} icon="coin" />
      </div>
      <div className="vz-plugs">
        {intel.plugs.types.map((t) => <PlugDiagram key={t} type={t} />)}
        {intel.plugs.needsAdapterFromTR && (
          <div className="vz-plugs-vs">
            <span className="vz-muted" style={{ fontSize: 13 }}>{l('Senin fişin (Türkiye, Avrupa)', 'Your plug (Turkey, Europe)', 'Dein Stecker (EU)', 'Tu enchufe (Europa)', 'Ваша вилка (Европа)')}</span>
            <PlugDiagram type="F" />
          </div>
        )}
      </div>
      <p>{intel.plugs.socketDesc}</p>
      {intel.connectivity.topCarriers.length > 0 && <Card title={l('Operatörler', 'Carriers', 'Anbieter', 'Operadores', 'Операторы')} icon="phone"><Tags items={intel.connectivity.topCarriers} /></Card>}
      {intel.connectivity.airportSimTrapWarning && <div className="vz-note"><Icon name="alert" size={18} duo={false} /><span>{intel.connectivity.airportSimTrapWarning}</span></div>}
      {esims.length > 0 && (
        <div className="vz-grid">
          {esims.map((e) => {
            const x = getLocalizedPartner(e, language);
            return <Card key={e.url} tone="sea" lead={<PartnerLogo url={e.url} size={40} fallback="wifi" />} eyebrow={x.category} title={x.title}><p className="vz-muted">{x.desc}</p><LinkBtn href={e.url} small variant="primary">{x.linkText}</LinkBtn></Card>;
          })}
        </div>
      )}
    </div>
  );
};

/* ---------------- Acil durum ---------------- */
const SosView: React.FC<{ passport: string; dest: string; setDest: (c: string) => void }> = ({ passport, dest, setDest }) => {
  const { l, language } = useI18n();
  const v = useMemo(() => getVerifiedCountryRecord(dest), [dest]);
  const ins = useMemo(() => getCountryInsights(dest, language), [dest, language]);
  const cons = useMemo(() => getConsularEmergencyInfo(passport, language), [passport, language]);
  const nums: [string, string | null | undefined, string][] = [
    [l('Genel acil', 'General emergency', 'Notruf', 'Emergencia', 'Общий'), v?.emergency.general.value || ins.safety.emergencyNumbers.general, 'sos'],
    [l('Polis', 'Police', 'Polizei', 'Policía', 'Полиция'), v?.emergency.police.value || ins.safety.emergencyNumbers.police, 'shield'],
    [l('Ambulans', 'Ambulance', 'Rettung', 'Ambulancia', 'Скорая'), v?.emergency.ambulance.value || ins.safety.emergencyNumbers.ambulance, 'heart'],
    [l('İtfaiye', 'Fire', 'Feuerwehr', 'Bomberos', 'Пожарные'), v?.emergency.fire.value, 'alert'],
    [l('Turist polisi', 'Tourist police', 'Touristenpolizei', 'Policía turística', 'Туристическая полиция'), v?.emergency.tourist_police.value, 'people']
  ];
  return (
    <div className="vz-stack">
      <DestSelect id="vz-sos-d" value={dest} onChange={setDest} label={l('Şu an hangi ülkedesin?', 'Which country are you in?', 'In welchem Land bist du?', '¿En qué país estás?', 'В какой вы стране?')} />
      <List>
        {nums.filter((x) => x[1]).map(([lab, num, ic]) => (
          <Row key={lab} icon={ic} title={lab} right={<a className="vz-btn vz-btn-primary sm" href={`tel:${String(num).replace(/[^\d+]/g, '')}`}>{num}</a>} />
        ))}
      </List>
      <Card tone="sea" icon="phone" eyebrow={pick3(cons.ministryName, language)} title={pick3(cons.crisisCenterTitle, language)}>
        <div className="vz-actions">
          {cons.hotline247 && <a className="vz-btn vz-btn-primary sm" href={`tel:${cons.hotline247.replace(/[^\d+]/g, '')}`}>{l('7/24', '24/7', '24/7', '24/7', '24/7')}: {cons.hotline247}</a>}
          {cons.hotlineDomestic && <span className="vz-badge tone-sea">{cons.hotlineDomestic}</span>}
          {cons.officialPortalUrl && <LinkBtn href={cons.officialPortalUrl} small>{cons.officialPortalName || l('Resmî site', 'Official site', 'Offizielle Seite', 'Sitio oficial', 'Сайт')}</LinkBtn>}
        </div>
      </Card>
      <Card icon="pin" title={l(`${getCountryName(passport, language)} temsilciliği · ${getCountryName(dest, language)}`, `${getCountryName(passport, language)} embassy in ${getCountryName(dest, language)}`, `Botschaft (${getCountryName(passport, language)}) in ${getCountryName(dest, language)}`, `Embajada de ${getCountryName(passport, language)} en ${getCountryName(dest, language)}`, `Посольство (${getCountryName(passport, language)}) — ${getCountryName(dest, language)}`)}>
        <p className="vz-muted">{l('Pasaport kaybı, tutuklanma ya da ciddi bir sağlık sorununda büyükelçilik ya da konsolosluk sana yardım eder. Haritada en yakınını bul.', 'Your embassy or consulate helps with lost passports, arrests or serious health issues. Find the nearest on the map.', 'Botschaft hilft bei Passverlust, Festnahme, Krankheit.', 'Tu embajada ayuda con pasaportes perdidos y emergencias.', 'Посольство помогает при утере паспорта и ЧП.')}</p>
        <div className="vz-actions">
          <LinkBtn small icon="map" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${getCountryName(passport, 'en')} embassy ${getCountryName(dest, 'en')}`)}`}>{l('Büyükelçiliği haritada bul', 'Find the embassy on the map', 'Botschaft auf Karte', 'Buscar embajada', 'Найти на карте')}</LinkBtn>
          <LinkBtn small variant="ghost" icon="map" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${getCountryName(passport, 'en')} consulate ${getCountryName(dest, 'en')}`)}`}>{l('Konsolosluklar', 'Consulates', 'Konsulate', 'Consulados', 'Консульства')}</LinkBtn>
        </div>
      </Card>
      <div className="vz-note"><Icon name="info" size={18} duo={false} /><span>{l('Numaralar resmî kaynaklardan derlenir; acil bir durumda önce yerel genel acil numarasını ara.', 'Numbers come from official sources; in an emergency, call the local general number first.', 'Im Notfall zuerst die lokale Notrufnummer wählen.', 'En emergencia, llama primero al número local.', 'В экстренной ситуации звоните на местный номер.')}</span></div>
    </div>
  );
};

/* ---------------- Pasaport kaybı & ret itirazı ---------------- */
const LossView: React.FC<{ passport: string; onOpenInfo: (p: string) => void }> = ({ passport, onOpenInfo }) => {
  const { l, language } = useI18n();
  const cons = useMemo(() => getConsularEmergencyInfo(passport, language), [passport, language]);
  const steps = [cons.steps.policeReport, cons.steps.photos, cons.steps.embassySubmission, cons.steps.travelDocIssuance].map((s) => pick3(s, language));
  return (
    <div className="vz-stack">
      <Card title={l('Pasaportunu kaybettiysen', 'If you lose your passport', 'Bei Passverlust', 'Si pierdes el pasaporte', 'Если потеряли паспорт')} icon="passport" tone="sea">
        <div className="vz-steps">
          {steps.map((s, i) => (
            <div className="vz-step" key={i}><span className="vz-step-n">{i + 1}</span><div className="vz-step-b"><p>{s}</p></div></div>
          ))}
        </div>
        <p className="vz-muted">{pick3(cons.emergencyDocName, language)} · {pick3(cons.emergencyDocValidity, language)}</p>
        <div className="vz-actions">
          {cons.hotline247 && <a className="vz-btn vz-btn-primary sm" href={`tel:${cons.hotline247.replace(/[^\d+]/g, '')}`}>{cons.hotline247}</a>}
          <Btn variant="soft" small onClick={() => onOpenInfo('passport_lost')}>{l('Rehberin tamamı', 'Full guide', 'Ganzer Leitfaden', 'Guía completa', 'Полный гид')}</Btn>
        </div>
      </Card>
      <Card title={l('Vizen reddedildiyse', 'If your visa was refused', 'Bei Visumablehnung', 'Si te denegaron el visado', 'Если отказали в визе')} icon="scale">
        <Bullets items={[
          l('Ret yazısındaki gerekçe maddesini not al; itiraz bu maddeye cevap vermeli.', 'Note the refusal reason; your appeal must answer it.', 'Ablehnungsgrund notieren.', 'Anota el motivo de la denegación.', 'Запишите причину отказа.'),
          l('İtiraz süresi genellikle kısadır (Schengen’de çoğunlukla 15–30 gün).', 'Appeal windows are short (often 15–30 days for Schengen).', 'Widerspruchsfristen sind kurz.', 'Los plazos son cortos.', 'Сроки короткие.'),
          l('Eksik belgeyi tamamlayıp yeniden başvurmak çoğu zaman itirazdan daha hızlıdır.', 'Reapplying with the missing documents is often faster than appealing.', 'Neuantrag oft schneller.', 'Reaplicar suele ser más rápido.', 'Повторная подача часто быстрее.')
        ]} />
        <Btn variant="soft" small onClick={() => onOpenInfo('appeals')}>{l('İtiraz rehberini aç', 'Open the appeals guide', 'Leitfaden öffnen', 'Abrir guía', 'Открыть гид')}</Btn>
      </Card>
    </div>
  );
};

/* ---------------- Göçebe vizesi & vergi ---------------- */
/* ------------------------------------------------------------------ */
export const ToolsHub: React.FC<{ passport: string; openRequest: OpenRequest; onOpenCountry: (c: string) => void; onOpenInfo: (p: string) => void }> = ({ passport, openRequest, onOpenCountry, onOpenInfo }) => {
  const { l, language } = useI18n();
  const [dest, setDestState] = useState(() => loadDestination());
  const setDest = (c: string) => {
    setDestState(c);
    try {
      localStorage.setItem('vz_destination_v1', c);
    } catch {}
  };
  const [req, setReq] = useState<OpenRequest>(null);
  useEffect(() => {
    if (openRequest) setReq(openRequest);
  }, [openRequest?.nonce]); // eslint-disable-line react-hooks/exhaustive-deps
  const item = useMemo(() => getPassportItems(passport).find((x) => x.c === dest) || null, [passport, dest]);
  const intel = useMemo(() => getCountryTravelIntelligence(dest, getCountryName(dest, 'en')), [dest]);
  const ins = useMemo(() => getCountryInsights(dest, language), [dest, language]);
  const destName = getCountryName(dest, language);

  const tiles: Tile[] = [
    { id: 'pack', icon: 'bag', title: l('Bavul listesi', 'Packing list', 'Packliste', 'Lista de maleta', 'Список вещей'), desc: l('Yolculuk tipine göre', 'By trip type', 'Nach Reiseart', 'Según el viaje', 'По типу поездки'), render: () => <PackView dest={dest} setDest={setDest} /> },
    { id: 'docs', icon: 'doc', title: l('Evrak listesi', 'Document checklist', 'Dokumentenliste', 'Documentos', 'Документы'), desc: l(`${destName} için gerekenler`, `What ${destName} asks for`, `Für ${destName}`, `Para ${destName}`, `Для ${destName}`), render: () => <DocsCheckView passport={passport} dest={dest} setDest={setDest} /> },
    { id: 'fx', icon: 'fx', title: l('Döviz çevirici', 'Currency converter', 'Währungsrechner', 'Conversor', 'Конвертер'), desc: l('Canlı kurlar', 'Live rates', 'Live-Kurse', 'Tipos en vivo', 'Живые курсы'), render: () => <FxView passport={passport} dest={dest} /> },
    { id: 'tip', icon: 'receipt', title: l('Bahşiş', 'Tipping', 'Trinkgeld', 'Propinas', 'Чаевые'), desc: l('Ülkeye göre ne kadar', 'How much, by country', 'Wie viel je Land', 'Cuánto por país', 'Сколько по стране'), render: () => <TipView dest={dest} setDest={setDest} /> },
    { id: 'plug', icon: 'plug', title: l('Priz & eSIM', 'Plugs & eSIM', 'Stecker & eSIM', 'Enchufes y eSIM', 'Розетки и eSIM'), desc: l('Fiş tipi, voltaj, internet', 'Plug, voltage, data', 'Stecker, Spannung, Daten', 'Enchufe, voltaje, datos', 'Розетка, напряжение'), render: () => <PlugView dest={dest} setDest={setDest} /> },
    { id: 'sos', icon: 'sos', title: l('Acil durum', 'Emergency', 'Notfall', 'Emergencia', 'Экстренно'), desc: l('Polis, ambulans, konsolosluk', 'Police, ambulance, consulate', 'Polizei, Rettung, Konsulat', 'Policía, ambulancia', 'Полиция, скорая'), render: () => <SosView passport={passport} dest={dest} setDest={setDest} /> },
    { id: 'loss', icon: 'shield', title: l('Pasaport kaybı & ret itirazı', 'Lost passport & refusals', 'Passverlust & Ablehnung', 'Pérdida y denegación', 'Утеря и отказ'), desc: l('Kötü günde adım adım', 'Step by step on a bad day', 'Schritt für Schritt', 'Paso a paso', 'Пошагово'), render: () => <LossView passport={passport} onOpenInfo={onOpenInfo} /> }
  ];

  return (
    <Page
      eyebrow={l('Araçlar', 'Tools', 'Werkzeuge', 'Herramientas', 'Инструменты')}
      title={l('Yolculuğun için her şey', 'Everything for your trip', 'Alles für deine Reise', 'Todo para tu viaje', 'Всё для поездки')}
      sub={l('Hazırlıkta ve yoldayken lazım olan araçlar. Hepsi seçtiğin hedefe göre ayarlanır.', 'Tools for preparing and for the road, set to your chosen destination.', 'Werkzeuge für Vorbereitung und unterwegs.', 'Herramientas para preparar y viajar.', 'Инструменты для подготовки и в пути.')}
      words={['Thailand', 'USA', 'Brazil', 'Egypt']}
      summary={
        <div className="vz-card" style={{ boxShadow: 'var(--vz-shadow)' }}>
          <div className="vz-row-flex" style={{ alignItems: 'flex-end' }}>
            <div style={{ flex: 1, minWidth: 200 }}><DestSelect id="vz-tools-dest" value={dest} onChange={setDest} label={l('Hedefin', 'Your destination', 'Dein Ziel', 'Tu destino', 'Куда')} /></div>
            <VisaBadge item={item} big />
          </div>
          <div className="vz-tags">
            <span>{l('Priz', 'Plug', 'Stecker', 'Enchufe', 'Розетка')}: {intel.plugs.types.join(', ')}</span>
            <span>{l('Bahşiş', 'Tip', 'Trinkgeld', 'Propina', 'Чаевые')}: {intel.tipping.standardPercent ? `%${intel.tipping.standardPercent}` : '—'}</span>
            <span>{l('Acil', 'Emergency', 'Notruf', 'Emergencia', 'Экстренный')}: {ins.safety.emergencyNumbers.general || ins.safety.emergencyNumbers.police}</span>
            <span>{l('Musluk suyu', 'Tap water', 'Leitungswasser', 'Agua', 'Вода')}: {intel.waterAndHealth.tapWaterSafe ? l('içilir', 'safe', 'trinkbar', 'potable', 'можно') : l('içilmez', 'not safe', 'nicht trinkbar', 'no potable', 'нельзя')}</span>
          </div>
        </div>
      }
    >
      <TileGrid tiles={tiles} openRequest={req} label={l('Araçlar', 'Tools', 'Werkzeuge', 'Herramientas', 'Инструменты')} />
    </Page>
  );
};
