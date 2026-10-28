import React, { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../data/i18n';
import { Icon } from './Icon';
import { Btn, Bullets, Card, Chip, Chips, Field, Flag, LinkBtn, List, Page, Row, Stat, Tags, Tile, TileGrid, VisaBadge, OpenRequest, fmtNum } from './ui';
import { loadDestination } from '../components/redesign/LiveStrip';
import { DEFAULT_PACKING_ITEMS, TripStyle } from '../components/tools/PackingListModal';
import { getPassportItems } from '../utils/calculator';
import { getCountryName, DIGITAL_NOMAD_VISAS, AFFILIATE_PARTNERS, getLocalizedPartner } from '../data/passportData';
import { GEO_DATA } from '../data/geoData';
import { GLOBAL_CURRENCIES } from '../data/countryGeography';
import { getCrossRate, USD_RATES } from '../data/currencyRates';
import { useLiveFx } from '../utils/liveData';
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
const PackView: React.FC = () => {
  const { l, language } = useI18n();
  const [style, setStyle] = useState<TripStyle>('city');
  const ck = useChecked('vz_pack_v1');
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
  const items = DEFAULT_PACKING_ITEMS.filter((it) => it.styles.includes(style));
  const done = items.filter((it) => ck.set.has(it.id)).length;
  return (
    <div className="vz-stack">
      <Chips scroll>{styles.map((s) => <Chip key={s.id} on={style === s.id} onClick={() => setStyle(s.id)}>{s.label}</Chip>)}</Chips>
      <div className="vz-row-flex" style={{ justifyContent: 'space-between' }}>
        <b>{l(`${done}/${items.length} hazır`, `${done}/${items.length} packed`, `${done}/${items.length} gepackt`, `${done}/${items.length} listo`, `${done}/${items.length} готово`)}</b>
        <Btn variant="ghost" small icon="trash" onClick={ck.reset}>{l('Sıfırla', 'Reset', 'Zurücksetzen', 'Reiniciar', 'Сбросить')}</Btn>
      </div>
      <div className="vz-meter"><i style={{ width: `${items.length ? (done / items.length) * 100 : 0}%`, background: 'linear-gradient(90deg, var(--vz-acc-a), var(--vz-acc-b))' }} /></div>
      {cats.map((c) => {
        const list = items.filter((it) => it.category === c.id);
        if (!list.length) return null;
        return (
          <section key={c.id} className="vz-stack" style={{ gap: 8 }}>
            <span className="vz-row-flex" style={{ gap: 8, fontWeight: 700 }}><Icon name={c.icon} size={18} />{c.label}</span>
            <div className="vz-list">
              {list.map((it) => <Check key={it.id} id={`pk-${it.id}`} on={ck.set.has(it.id)} onToggle={() => ck.toggle(it.id)}>{language === 'tr' ? it.text.tr : it.text.en}</Check>)}
            </div>
          </section>
        );
      })}
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
  useLiveFx();
  const curs = useMemo(() => Object.keys(USD_RATES).sort(), []);
  const [from, setFrom] = useState(GLOBAL_CURRENCIES[passport]?.code || 'EUR');
  const [to, setTo] = useState(GLOBAL_CURRENCIES[dest]?.code || 'USD');
  const [amt, setAmt] = useState('100');
  const n = parseFloat(amt.replace(',', '.')) || 0;
  const ok = !!(USD_RATES[from] && USD_RATES[to]);
  const rate = ok ? getCrossRate(from, to) : 0;
  return (
    <div className="vz-stack">
      <div className="vz-fx">
        <Field label={l('Tutar', 'Amount', 'Betrag', 'Importe', 'Сумма')} htmlFor="vz-fx-a"><input id="vz-fx-a" inputMode="decimal" className="vz-input" value={amt} onChange={(e) => setAmt(e.target.value)} /></Field>
        <Field label={l('Bu paradan', 'From', 'Von', 'De', 'Из')} htmlFor="vz-fx-f"><select id="vz-fx-f" className="vz-select" value={from} onChange={(e) => setFrom(e.target.value)}>{curs.map((c) => <option key={c} value={c}>{c}</option>)}</select></Field>
        <button type="button" className="vz-iconbtn" onClick={() => { setFrom(to); setTo(from); }} aria-label={l('Yer değiştir', 'Swap', 'Tauschen', 'Intercambiar', 'Поменять')} style={{ alignSelf: 'flex-end', marginBottom: 3 }}><Icon name="fx" size={18} duo={false} /></button>
        <Field label={l('Bu paraya', 'To', 'Nach', 'A', 'В')} htmlFor="vz-fx-t"><select id="vz-fx-t" className="vz-select" value={to} onChange={(e) => setTo(e.target.value)}>{curs.map((c) => <option key={c} value={c}>{c}</option>)}</select></Field>
      </div>
      <Card tone="sea">
        <b style={{ fontSize: 30, letterSpacing: '-0.02em' }}>{ok ? `${fmtNum(n * rate, language, 2)} ${to}` : '—'}</b>
        <span className="vz-muted">{ok ? `1 ${from} = ${fmtNum(rate, language, 4)} ${to}` : l('Bu para birimi için kur bulunamadı', 'No rate for this currency', 'Kein Kurs', 'Sin tipo de cambio', 'Нет курса')}</span>
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
  const b = parseFloat(bill.replace(',', '.')) || 0;
  const tip = (b * pct) / 100;
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
  const esim = AFFILIATE_PARTNERS.find((a) => /esim/i.test(a.category + a.title));
  const x = esim ? getLocalizedPartner(esim, language) : null;
  return (
    <div className="vz-stack">
      <DestSelect id="vz-plug-d" value={dest} onChange={setDest} />
      <div className="vz-stats">
        <Stat value={intel.plugs.types.join(', ')} label={l('Fiş tipi', 'Plug type', 'Steckertyp', 'Enchufe', 'Тип розетки')} icon="plug" />
        <Stat value={`${intel.plugs.voltage} · ${intel.plugs.frequency}`} label={l('Voltaj', 'Voltage', 'Spannung', 'Voltaje', 'Напряжение')} icon="spark" />
        <Stat value={intel.plugs.needsAdapterFromTR ? l('Gerekli', 'Needed', 'Nötig', 'Necesario', 'Нужен') : l('Gerekmez', 'Not needed', 'Nicht nötig', 'No', 'Не нужен')} label={l('C/F fişe adaptör', 'Adapter for C/F plugs', 'Adapter C/F', 'Adaptador C/F', 'Адаптер C/F')} icon="plug" tone={intel.plugs.needsAdapterFromTR ? 'warn' : 'ok'} />
        <Stat value={`${ins.internet.mobileSpeedMbps} Mbps`} label={l('Mobil internet', 'Mobile internet', 'Mobiles Internet', 'Internet móvil', 'Моб. интернет')} icon="wifi" />
        <Stat value={`$${intel.connectivity.avgGbPriceUsd}`} label={l('1 GB ortalama', 'Avg per GB', 'Ø pro GB', 'Media por GB', 'Средне за ГБ')} icon="coin" />
      </div>
      <p>{intel.plugs.socketDesc}</p>
      {intel.connectivity.topCarriers.length > 0 && <Card title={l('Operatörler', 'Carriers', 'Anbieter', 'Operadores', 'Операторы')} icon="phone"><Tags items={intel.connectivity.topCarriers} /></Card>}
      {intel.connectivity.airportSimTrapWarning && <div className="vz-note"><Icon name="alert" size={18} duo={false} /><span>{intel.connectivity.airportSimTrapWarning}</span></div>}
      {x && esim && (
        <Card tone="sea" icon="wifi" eyebrow={x.category} title={x.title}><p className="vz-muted">{x.desc}</p><LinkBtn href={esim.url} small variant="primary">{x.linkText}</LinkBtn></Card>
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
    { id: 'pack', icon: 'bag', title: l('Bavul listesi', 'Packing list', 'Packliste', 'Lista de maleta', 'Список вещей'), desc: l('Yolculuk tipine göre', 'By trip type', 'Nach Reiseart', 'Según el viaje', 'По типу поездки'), render: () => <PackView /> },
    { id: 'docs', icon: 'doc', title: l('Evrak listesi', 'Document checklist', 'Dokumentenliste', 'Documentos', 'Документы'), desc: l(`${destName} için gerekenler`, `What ${destName} asks for`, `Für ${destName}`, `Para ${destName}`, `Для ${destName}`), render: () => <DocsCheckView passport={passport} dest={dest} setDest={setDest} /> },
    { id: 'fx', icon: 'fx', title: l('Döviz çevirici', 'Currency converter', 'Währungsrechner', 'Conversor', 'Конвертер'), desc: l('Canlı kurlar', 'Live rates', 'Live-Kurse', 'Tipos en vivo', 'Живые курсы'), render: () => <FxView passport={passport} dest={dest} /> },
    { id: 'tip', icon: 'receipt', title: l('Bahşiş', 'Tipping', 'Trinkgeld', 'Propinas', 'Чаевые'), desc: l('Ülkeye göre ne kadar', 'How much, by country', 'Wie viel je Land', 'Cuánto por país', 'Сколько по стране'), render: () => <TipView dest={dest} setDest={setDest} /> },
    { id: 'plug', icon: 'plug', title: l('Priz & eSIM', 'Plugs & eSIM', 'Stecker & eSIM', 'Enchufes y eSIM', 'Розетки и eSIM'), desc: l('Fiş tipi, voltaj, internet', 'Plug, voltage, data', 'Stecker, Spannung, Daten', 'Enchufe, voltaje, datos', 'Розетка, напряжение'), render: () => <PlugView dest={dest} setDest={setDest} /> },
    { id: 'sos', icon: 'sos', title: l('Acil durum', 'Emergency', 'Notfall', 'Emergencia', 'Экстренно'), desc: l('Polis, ambulans, konsolosluk', 'Police, ambulance, consulate', 'Polizei, Rettung, Konsulat', 'Policía, ambulancia', 'Полиция, скорая'), render: () => <SosView passport={passport} dest={dest} setDest={setDest} /> },
    { id: 'loss', icon: 'shield', title: l('Pasaport kaybı & ret itirazı', 'Lost passport & refusals', 'Passverlust & Ablehnung', 'Pérdida y denegación', 'Утеря и отказ'), desc: l('Kötü günde adım adım', 'Step by step on a bad day', 'Schritt für Schritt', 'Paso a paso', 'Пошагово'), render: () => <LossView passport={passport} onOpenInfo={onOpenInfo} /> },
    { id: 'nomadvisa', icon: 'laptop', title: l('Göçebe vizesi & vergi', 'Nomad visas & tax', 'Nomadenvisa & Steuern', 'Visados nómada', 'Визы и налоги'), desc: l('Uzaktan çalışma, 183 gün', 'Remote work, 183 days', 'Remote, 183 Tage', 'Remoto, 183 días', 'Удалёнка, 183 дня'), render: () => <NomadVisaView onOpenCountry={onOpenCountry} /> }
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
