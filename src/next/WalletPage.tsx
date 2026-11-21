import React, { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../data/i18n';
import { Icon, IconName } from './Icon';
import { Btn, Card, Chip, Chips, Empty, Field, Flag, List, Page, Row, Segmented, Stat, Tile, TileGrid, OpenRequest, fmtNum } from './ui';
import { getCountryName, SCHENGEN_SET } from '../data/passportData';
import { GEO_DATA } from '../data/geoData';
import { GLOBAL_CURRENCIES } from '../data/countryGeography';
import { getCrossRate, USD_RATES } from '../data/currencyRates';
import { DEFAULT_RULES, RollingRule, TripRecord, evaluateRollingWindow, computeTaxResidency, getTodayDayIndex, dateToDayIndex, dayIndexToDate, formatLocalizedDate } from '../utils/calculator';
import { loadStoredTrips, saveStoredTrips, loadStoredRules, saveStoredRules, loadStoredRouteStops } from '../utils/storage';

/* ---------- küçük yerel depo yardımcıları ---------- */
function useStore<T>(key: string, init: T) {
  const [v, setV] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : init;
    } catch {
      return init;
    }
  });
  const save = (n: T) => {
    setV(n);
    try {
      localStorage.setItem(key, JSON.stringify(n));
    } catch {}
  };
  return [v, save] as const;
}

type DocType = 'passport' | 'visa' | 'insurance' | 'id' | 'licence' | 'other';
interface WalletDoc { id: string; type: DocType; title: string; country: string; expiry: string; note?: string }
type TicketType = 'flight' | 'hotel' | 'train' | 'car' | 'activity';
interface Ticket { id: string; type: TicketType; title: string; date: string; ref?: string; link?: string }
interface Expense { id: string; title: string; amount: number; currency: string; cat: string }

const daysLeft = (iso: string) => (iso ? dateToDayIndex(iso) - getTodayDayIndex() : NaN);

function useWallet(passport: string) {
  const [docs, setDocs] = useStore<WalletDoc[]>('vz_wallet_docs_v1', []);
  const [tickets, setTickets] = useStore<Ticket[]>('vz_wallet_tickets_v1', []);
  const [expenses, setExpenses] = useStore<Expense[]>('vz_wallet_expenses_v1', []);
  const [budget, setBudget] = useStore<number>('vz_wallet_budget_v1', 0);
  return { docs, setDocs, tickets, setTickets, expenses, setExpenses, budget, setBudget, passport };
}
type W = ReturnType<typeof useWallet>;

/* ---------------- Belgelerim ---------------- */
const DocsView: React.FC<{ w: W }> = ({ w }) => {
  const { l, language } = useI18n();
  const types: { id: DocType; label: string; icon: IconName }[] = [
    { id: 'passport', label: l('Pasaport', 'Passport', 'Reisepass', 'Pasaporte', 'Паспорт', 'Passaporte'), icon: 'passport' },
    { id: 'visa', label: l('Vize / e-vize', 'Visa / eVisa', 'Visum', 'Visado', 'Виза', 'Visto'), icon: 'doc' },
    { id: 'insurance', label: l('Seyahat sigortası', 'Travel insurance', 'Versicherung', 'Seguro', 'Страховка', 'Seguro'), icon: 'heart' },
    { id: 'id', label: l('Kimlik kartı', 'ID card', 'Ausweis', 'DNI', 'ID-карта', 'Identidade'), icon: 'card' },
    { id: 'licence', label: l('Ehliyet', 'Driving licence', 'Führerschein', 'Carné', 'Права', 'CNH'), icon: 'car' },
    { id: 'other', label: l('Diğer', 'Other', 'Andere', 'Otro', 'Другое', 'Outro'), icon: 'doc' }
  ];
  const [type, setType] = useState<DocType>('passport');
  const [country, setCountry] = useState(w.passport);
  const [expiry, setExpiry] = useState('');
  const [docQ, setDocQ] = useState('');
  const [title, setTitle] = useState('');
  const opts = useMemo(() => Object.keys(GEO_DATA).map((c) => ({ c, n: getCountryName(c, language) })).sort((a, b) => a.n.localeCompare(b.n, language)), [language]);
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expiry) return;
    const t = types.find((x) => x.id === type)!;
    w.setDocs([...w.docs, { id: `d-${Date.now()}`, type, country, expiry, title: title.trim() || `${t.label} · ${getCountryName(country, language)}` }].sort((a, b) => a.expiry.localeCompare(b.expiry)));
    setTitle('');
    setExpiry('');
  };
  return (
    <div className="vz-stack">
      <div className="vz-note"><Icon name="lock" size={18} duo={false} /><span>{l('Belgeler yalnızca bu cihazda saklanır. Belge numarası istemiyoruz; sadece bitiş tarihi yeter.', 'Documents stay on this device only. No document numbers needed, just the expiry date.', 'Nur auf diesem Gerät gespeichert; nur das Ablaufdatum nötig.', 'Solo en este dispositivo; basta la fecha de caducidad.', 'Хранится только на этом устройстве; нужен лишь срок.', 'Só neste dispositivo; basta a data de validade.')}</span></div>
      {w.docs.length === 0 ? (
        <Empty icon="passport" title={l('Cüzdanın boş', 'Your wallet is empty', 'Wallet ist leer', 'Cartera vacía', 'Кошелёк пуст', 'Carteira vazia')} text={l('Pasaportunu ekleyerek başla; bitiş tarihi yaklaşınca seni uyaralım.', 'Start with your passport; we’ll warn you before it expires.', 'Beginne mit deinem Pass.', 'Empieza por tu pasaporte.', 'Начните с паспорта.', 'Comece pelo seu passaporte.')}
          steps={[
            l('Belge türünü seç (pasaport, vize, sigorta…)', 'Choose a type (passport, visa, insurance…)', 'Typ wählen (Pass, Visum, Versicherung…)', 'Elige el tipo', 'Выберите тип', 'Escolha o tipo'),
            l('Sadece bitiş tarihini gir', 'Enter only the expiry date', 'Nur das Ablaufdatum eingeben', 'Solo la fecha de caducidad', 'Только срок действия', 'Só a data de validade'),
            l('Süre azalınca Uyarılar kutusunda görürsün', 'See it in Alerts when time runs short', 'Hinweis, wenn es knapp wird', 'Te avisamos a tiempo', 'Предупредим заранее', 'Avisamos você a tempo')
          ]}
        />
      ) : (
        <>
        {w.docs.length > 3 && (
          <input className="vz-input" type="search" value={docQ} onChange={(e) => setDocQ(e.target.value)} placeholder={l('Belgelerde ara…', 'Search documents…', 'Dokumente suchen…', 'Buscar documentos…', 'Поиск документов…', 'Buscar documentos…')} aria-label={l('Belgelerde ara', 'Search documents', 'Dokumente suchen', 'Buscar documentos', 'Поиск документов', 'Buscar documentos')} />
        )}
        <div className="vz-grid">
          {w.docs.filter((d) => !docQ.trim() || `${d.title} ${getCountryName(d.country, language)} ${d.type}`.toLocaleLowerCase(language).includes(docQ.trim().toLocaleLowerCase(language))).map((d) => {
            const t = types.find((x) => x.id === d.type)!;
            const left = daysLeft(d.expiry);
            const tone = left < 0 ? 'warn' : left < 180 ? 'sun' : 'ok';
            return (
              <Card key={d.id} icon={t.icon} eyebrow={t.label} title={d.title} actions={<button type="button" className="vz-iconbtn" onClick={() => w.setDocs(w.docs.filter((x) => x.id !== d.id))} aria-label={l('Sil', 'Delete', 'Löschen', 'Borrar', 'Удалить', 'Excluir')}><Icon name="trash" size={16} duo={false} /></button>}>
                <div className="vz-row-flex" style={{ justifyContent: 'space-between' }}>
                  <span className="vz-row-flex" style={{ gap: 8 }}><Flag code={d.country} size="sm" />{getCountryName(d.country, language)}</span>
                  <span className={`vz-badge tone-${tone}`}>{left < 0 ? l('Süresi doldu', 'Expired', 'Abgelaufen', 'Caducado', 'Истёк', 'Vencido') : l(`${left} gün kaldı`, `${left} days left`, `${left} Tage übrig`, `${left} días`, `${left} дн.`, `${left} dias`)}</span>
                </div>
                <span className="vz-muted" style={{ fontSize: 13 }}>{l('Bitiş', 'Expires', 'Ablauf', 'Caduca', 'Истекает', 'Vence em')}: {formatLocalizedDate(dateToDayIndex(d.expiry), language)}</span>
              </Card>
            );
          })}
        </div>
        </>
      )}
      <form className="vz-card tone-sea" onSubmit={add}>
        <b>{l('Belge ekle', 'Add a document', 'Dokument hinzufügen', 'Añadir documento', 'Добавить документ', 'Adicionar documento')}</b>
        <div className="vz-formgrid">
          <Field label={l('Tür', 'Type', 'Art', 'Tipo', 'Тип', 'Tipo')} htmlFor="vz-doc-t">
            <select id="vz-doc-t" className="vz-select" value={type} onChange={(e) => setType(e.target.value as DocType)}>{types.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}</select>
          </Field>
          <Field label={l('Ülke', 'Country', 'Land', 'País', 'Страна', 'País')} htmlFor="vz-doc-c">
            <select id="vz-doc-c" className="vz-select" value={country} onChange={(e) => setCountry(e.target.value)}>{opts.map((o) => <option key={o.c} value={o.c}>{o.n}</option>)}</select>
          </Field>
          <Field label={l('Bitiş tarihi', 'Expiry date', 'Ablaufdatum', 'Caducidad', 'Срок', 'Validade')} htmlFor="vz-doc-e">
            <input id="vz-doc-e" type="date" className="vz-input" value={expiry} onChange={(e) => setExpiry(e.target.value)} required />
          </Field>
          <Field label={l('Ad (isteğe bağlı)', 'Name (optional)', 'Name (optional)', 'Nombre (opcional)', 'Название', 'Nome (opcional)')} htmlFor="vz-doc-n">
            <input id="vz-doc-n" className="vz-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={l('Ör. Japonya e-vizesi', 'e.g. Japan eVisa', 'z. B. Japan eVisum', 'p. ej. eVisa Japón', 'напр. eVisa Япония', 'ex.: e-Visa Japão')} />
          </Field>
        </div>
        <Btn type="submit" icon="plus" style={{ alignSelf: 'flex-start' }}>{l('Ekle', 'Add', 'Hinzufügen', 'Añadir', 'Добавить', 'Adicionar')}</Btn>
      </form>
    </div>
  );
};

/* ---------------- Biletlerim ---------------- */
const TicketsView: React.FC<{ w: W }> = ({ w }) => {
  const { l, language } = useI18n();
  const types: { id: TicketType; label: string; icon: IconName }[] = [
    { id: 'flight', label: l('Uçuş', 'Flight', 'Flug', 'Vuelo', 'Рейс', 'Voo'), icon: 'plane' },
    { id: 'hotel', label: l('Konaklama', 'Stay', 'Unterkunft', 'Alojamiento', 'Жильё', 'Hospedagem'), icon: 'bed' },
    { id: 'train', label: l('Tren / otobüs', 'Train / bus', 'Zug / Bus', 'Tren / bus', 'Поезд / автобус', 'Trem / ônibus'), icon: 'transit' },
    { id: 'car', label: l('Araç kiralama', 'Car hire', 'Mietwagen', 'Coche', 'Авто', 'Carro'), icon: 'car' },
    { id: 'activity', label: l('Etkinlik', 'Activity', 'Aktivität', 'Actividad', 'Экскурсия', 'Atividade'), icon: 'ticket' }
  ];
  const [type, setType] = useState<TicketType>('flight');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [ref, setRef] = useState('');
  const [link, setLink] = useState('');
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;
    w.setTickets([...w.tickets, { id: `t-${Date.now()}`, type, title: title.trim(), date, ref: ref.trim(), link: link.trim() }].sort((a, b) => a.date.localeCompare(b.date)));
    setTitle(''); setDate(''); setRef(''); setLink('');
  };
  const upcoming = w.tickets.filter((t) => daysLeft(t.date) >= 0);
  const past = w.tickets.filter((t) => daysLeft(t.date) < 0);
  const rowsOf = (list: Ticket[]) => (
    <List>
      {list.map((t) => {
        const tt = types.find((x) => x.id === t.type)!;
        const left = daysLeft(t.date);
        return (
          <Row
            key={t.id}
            icon={tt.icon}
            title={t.title}
            sub={`${formatLocalizedDate(dateToDayIndex(t.date), language)}${t.ref ? ` · ${l('Kod', 'Ref', 'Code', 'Código', 'Код', 'Código')}: ${t.ref}` : ''}`}
            right={
              <span className="vz-row-flex" style={{ gap: 6 }}>
                {left >= 0 && <span className="vz-badge tone-sea">{left === 0 ? l('Bugün', 'Today', 'Heute', 'Hoy', 'Сегодня', 'Hoje') : l(`${left} gün`, `${left} d`, `${left} T`, `${left} d`, `${left} д`, `${left} d`)}</span>}
                {t.link && <a className="vz-iconbtn" href={t.link} target="_blank" rel="noopener noreferrer" aria-label={l('Bağlantıyı aç', 'Open link', 'Link öffnen', 'Abrir', 'Открыть', 'Abrir')}><Icon name="external" size={16} duo={false} /></a>}
                <button type="button" className="vz-iconbtn" onClick={() => w.setTickets(w.tickets.filter((x) => x.id !== t.id))} aria-label={l('Sil', 'Delete', 'Löschen', 'Borrar', 'Удалить', 'Excluir')}><Icon name="trash" size={16} duo={false} /></button>
              </span>
            }
          />
        );
      })}
    </List>
  );
  return (
    <div className="vz-stack">
      {w.tickets.length === 0 ? (
        <Empty icon="ticket" title={l('Henüz bilet yok', 'No bookings yet', 'Noch keine Buchungen', 'Sin reservas', 'Нет броней', 'Sem reservas')} text={l('Uçuş, otel ve tren rezervasyonlarını tarihleriyle ekle; geri sayım burada görünsün.', 'Add flights, hotels and trains with dates to see a countdown here.', 'Buchungen mit Datum hinzufügen.', 'Añade reservas con fechas.', 'Добавьте брони с датами.', 'Adicione reservas com datas.')} />
      ) : (
        <>
          {upcoming.length > 0 && rowsOf(upcoming)}
          {past.length > 0 && <><span className="vz-eyebrow">{l('Geçmiş', 'Past', 'Vergangen', 'Pasadas', 'Прошедшие', 'Anteriores')}</span>{rowsOf(past)}</>}
        </>
      )}
      <form className="vz-card tone-sea" onSubmit={add}>
        <b>{l('Rezervasyon ekle', 'Add a booking', 'Buchung hinzufügen', 'Añadir reserva', 'Добавить бронь', 'Adicionar reserva')}</b>
        <div className="vz-formgrid">
          <Field label={l('Tür', 'Type', 'Art', 'Tipo', 'Тип', 'Tipo')} htmlFor="vz-tk-t">
            <select id="vz-tk-t" className="vz-select" value={type} onChange={(e) => setType(e.target.value as TicketType)}>{types.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}</select>
          </Field>
          <Field label={l('Başlık', 'Title', 'Titel', 'Título', 'Название', 'Título')} htmlFor="vz-tk-n">
            <input id="vz-tk-n" className="vz-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={l('İstanbul → Bangkok', 'Istanbul → Bangkok', 'Istanbul → Bangkok', 'Estambul → Bangkok', 'Стамбул → Бангкок', 'Istambul → Bangkok')} required />
          </Field>
          <Field label={l('Tarih', 'Date', 'Datum', 'Fecha', 'Дата', 'Data')} htmlFor="vz-tk-d">
            <input id="vz-tk-d" type="date" className="vz-input" value={date} onChange={(e) => setDate(e.target.value)} required />
          </Field>
          <Field label={l('Rezervasyon kodu', 'Booking ref', 'Buchungscode', 'Código', 'Код брони', 'Código')} htmlFor="vz-tk-r">
            <input id="vz-tk-r" className="vz-input" value={ref} onChange={(e) => setRef(e.target.value)} />
          </Field>
          <Field label={l('Bağlantı (isteğe bağlı)', 'Link (optional)', 'Link (optional)', 'Enlace', 'Ссылка', 'Link')} htmlFor="vz-tk-l">
            <input id="vz-tk-l" type="url" className="vz-input" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://" />
          </Field>
        </div>
        <Btn type="submit" icon="plus" style={{ alignSelf: 'flex-start' }}>{l('Ekle', 'Add', 'Hinzufügen', 'Añadir', 'Добавить', 'Adicionar')}</Btn>
      </form>
    </div>
  );
};

/* ---------------- Geçerlilik uyarıları ---------------- */
const AlertsView: React.FC<{ w: W; onGoDocs: () => void }> = ({ w, onGoDocs }) => {
  const { l, language } = useI18n();
  const stops = useMemo(() => loadStoredRouteStops().filter((s) => s.exitDate), []);
  const lastExit = stops.reduce((m, s) => (s.exitDate > m ? s.exitDate : m), '');
  const passports = w.docs.filter((d) => d.type === 'passport');
  const alerts: { tone: 'warn' | 'sun' | 'ok'; title: string; text: string }[] = [];
  w.docs.forEach((d) => {
    const left = daysLeft(d.expiry);
    if (left < 0) alerts.push({ tone: 'warn', title: d.title, text: l('Süresi dolmuş. Yolculuktan önce yenile.', 'Expired. Renew it before you travel.', 'Abgelaufen. Vor der Reise erneuern.', 'Caducado. Renuévalo.', 'Истёк. Обновите.', 'Vencido. Renove.') });
    else if (left < 180) alerts.push({ tone: 'sun', title: d.title, text: l(`${left} gün içinde bitiyor. Birçok ülke pasaportun en az 6 ay geçerli olmasını ister.`, `Expires in ${left} days. Many countries require 6 months’ validity.`, `Läuft in ${left} Tagen ab.`, `Caduca en ${left} días.`, `Истекает через ${left} дн.`, `Vence em ${left} dias.`) });
  });
  if (lastExit) {
    passports.forEach((p) => {
      const margin = dateToDayIndex(p.expiry) - dateToDayIndex(lastExit);
      if (margin < 183) alerts.push({ tone: 'warn', title: l('6 ay kuralı', '6-month rule', '6-Monats-Regel', 'Regla de 6 meses', 'Правило 6 месяцев', 'Regra dos 6 meses'), text: l(`${p.title}, rotandaki son çıkış tarihinden (${formatLocalizedDate(dateToDayIndex(lastExit), language)}) sonra yalnızca ${Math.max(0, margin)} gün geçerli. Çoğu ülke 6 ay ister.`, `${p.title} is valid only ${Math.max(0, margin)} days after your last exit date. Most countries want 6 months.`, `Nur ${Math.max(0, margin)} Tage nach Ausreise gültig.`, `Solo ${Math.max(0, margin)} días tras la salida.`, `Только ${Math.max(0, margin)} дн. после выезда.`, `Só ${Math.max(0, margin)} dias após a saída.`) });
    });
  }
  return (
    <div className="vz-stack">
      {w.docs.length === 0 ? (
        <Empty icon="bell" title={l('Uyarı için belge ekle', 'Add documents to get alerts', 'Dokumente für Hinweise hinzufügen', 'Añade documentos', 'Добавьте документы', 'Adicione documentos')} action={<Btn variant="soft" onClick={onGoDocs}>{l('Belgelerime git', 'Go to my documents', 'Zu Dokumenten', 'Ir a documentos', 'К документам', 'Ir para documentos')}</Btn>} />
      ) : alerts.length === 0 ? (
        <Card tone="ok" icon="check" title={l('Her şey yolunda', 'All good', 'Alles in Ordnung', 'Todo bien', 'Всё в порядке', 'Tudo certo')}><p>{l('Belgelerinin hiçbiri yakında bitmiyor.', 'None of your documents expire soon.', 'Kein Dokument läuft bald ab.', 'Nada caduca pronto.', 'Ничего не истекает скоро.', 'Nada vence em breve.')}</p></Card>
      ) : (
        <div className="vz-grid two">
          {alerts.map((a, i) => (
            <Card key={i} tone={a.tone} icon={a.tone === 'warn' ? 'alert' : 'bell'} title={a.title}><p>{a.text}</p></Card>
          ))}
        </div>
      )}
    </div>
  );
};

/* ---------------- Bütçe ---------------- */
const CATS = ['flight', 'stay', 'food', 'transport', 'fun', 'other'] as const;
const BudgetView: React.FC<{ w: W }> = ({ w }) => {
  const { l, language } = useI18n();
  const home = GLOBAL_CURRENCIES[w.passport]?.code || 'EUR';
  const curList = useMemo(() => Array.from(new Set([home, 'EUR', 'USD', 'GBP', 'TRY', ...Object.keys(USD_RATES)])).filter((c) => USD_RATES[c] || c === home), [home]);
  const catLabel: Record<string, string> = {
    flight: l('Uçuş', 'Flights', 'Flüge', 'Vuelos', 'Перелёты', 'Voos'), stay: l('Konaklama', 'Stay', 'Unterkunft', 'Alojamiento', 'Жильё', 'Hospedagem'), food: l('Yeme-içme', 'Food', 'Essen', 'Comida', 'Еда', 'Comida'),
    transport: l('Ulaşım', 'Transport', 'Transport', 'Transporte', 'Транспорт', 'Transporte'), fun: l('Gezi & eğlence', 'Fun', 'Freizeit', 'Ocio', 'Досуг', 'Lazer'), other: l('Diğer', 'Other', 'Andere', 'Otro', 'Другое', 'Outro')
  };
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [cur, setCur] = useState(home);
  const [cat, setCat] = useState<string>('flight');
  const conv = (e: Expense) => (e.currency === home ? e.amount : e.amount * getCrossRate(e.currency, home));
  const total = w.expenses.reduce((s, e) => s + conv(e), 0);
  const byCat = CATS.map((c) => ({ c, v: w.expenses.filter((e) => e.cat === c).reduce((s, e) => s + conv(e), 0) })).filter((x) => x.v > 0);
  const sym = GLOBAL_CURRENCIES[w.passport]?.symbol || home;
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const n = parseFloat(amount.replace(',', '.'));
    if (!title.trim() || !(n > 0)) return;
    w.setExpenses([...w.expenses, { id: `e-${Date.now()}`, title: title.trim(), amount: n, currency: cur, cat }]);
    setTitle(''); setAmount('');
  };
  const pct = w.budget > 0 ? Math.min(100, (total / w.budget) * 100) : 0;
  return (
    <div className="vz-stack">
      <div className="vz-stats">
        <Stat value={`${fmtNum(total, language)} ${sym}`} label={l('Harcanan', 'Spent', 'Ausgegeben', 'Gastado', 'Потрачено', 'Gasto')} icon="wallet" />
        <div className="vz-stat">
          <label htmlFor="vz-bud" style={{ fontSize: 13, color: 'var(--rd-muted)' }}>{l(`Bütçe (${home})`, `Budget (${home})`, `Budget (${home})`, `Presupuesto (${home})`, `Бюджет (${home})`, `Orçamento (${home})`)}</label>
          <input id="vz-bud" type="number" min={0} className="vz-input" value={w.budget || ''} onChange={(e) => w.setBudget(Math.max(0, Number(e.target.value) || 0))} placeholder="0" />
        </div>
        {w.budget > 0 && <Stat value={`${fmtNum(Math.max(0, w.budget - total), language)} ${sym}`} label={l('Kalan', 'Left', 'Übrig', 'Restante', 'Осталось', 'Restante')} icon="coin" tone={total > w.budget ? 'warn' : 'ok'} />}
      </div>
      {w.budget > 0 && <div className="vz-meter" aria-hidden="true"><i style={{ width: `${pct}%`, background: total > w.budget ? 'var(--vz-warn)' : 'linear-gradient(90deg, var(--vz-acc-a), var(--vz-acc-b))' }} /></div>}
      {byCat.length > 0 && (
        <div className="vz-tags">{byCat.map((x) => <span key={x.c}>{catLabel[x.c]} · {fmtNum(x.v, language)} {sym}</span>)}</div>
      )}
      {w.expenses.length > 0 ? (
        <List>
          {w.expenses.map((e) => (
            <Row key={e.id} icon={e.cat === 'flight' ? 'plane' : e.cat === 'stay' ? 'bed' : e.cat === 'food' ? 'food' : e.cat === 'transport' ? 'transit' : e.cat === 'fun' ? 'star' : 'receipt'} title={e.title} sub={catLabel[e.cat]} right={
              <span className="vz-row-flex" style={{ gap: 8 }}>
                <span>{fmtNum(e.amount, language, 2)} {e.currency}</span>
                <button type="button" className="vz-iconbtn" onClick={() => w.setExpenses(w.expenses.filter((x) => x.id !== e.id))} aria-label={l('Sil', 'Delete', 'Löschen', 'Borrar', 'Удалить', 'Excluir')}><Icon name="trash" size={16} duo={false} /></button>
              </span>
            } />
          ))}
        </List>
      ) : (
        <Empty icon="wallet" title={l('Henüz harcama yok', 'No expenses yet', 'Noch keine Ausgaben', 'Sin gastos', 'Нет расходов', 'Sem gastos')} text={l('Harcamaları farklı para birimlerinde gir; toplam kendi para biriminde hesaplanır.', 'Enter expenses in any currency; the total is shown in yours.', 'Ausgaben in jeder Währung erfassen.', 'Añade gastos en cualquier moneda.', 'Вводите расходы в любой валюте.', 'Adicione gastos em qualquer moeda.')} />
      )}
      <form className="vz-card tone-sea" onSubmit={add}>
        <b>{l('Harcama ekle', 'Add an expense', 'Ausgabe hinzufügen', 'Añadir gasto', 'Добавить расход', 'Adicionar gasto')}</b>
        <div className="vz-formgrid">
          <Field label={l('Ne için?', 'What for?', 'Wofür?', '¿Para qué?', 'На что?', 'Para quê?')} htmlFor="vz-ex-t"><input id="vz-ex-t" className="vz-input" value={title} onChange={(e) => setTitle(e.target.value)} required /></Field>
          <Field label={l('Tutar', 'Amount', 'Betrag', 'Importe', 'Сумма', 'Valor')} htmlFor="vz-ex-a"><input id="vz-ex-a" inputMode="decimal" className="vz-input" value={amount} onChange={(e) => setAmount(e.target.value)} required /></Field>
          <Field label={l('Para birimi', 'Currency', 'Währung', 'Moneda', 'Валюта', 'Moeda')} htmlFor="vz-ex-c"><select id="vz-ex-c" className="vz-select" value={cur} onChange={(e) => setCur(e.target.value)}>{curList.map((c) => <option key={c} value={c}>{c}</option>)}</select></Field>
          <Field label={l('Kategori', 'Category', 'Kategorie', 'Categoría', 'Категория', 'Categoria')} htmlFor="vz-ex-k"><select id="vz-ex-k" className="vz-select" value={cat} onChange={(e) => setCat(e.target.value)}>{CATS.map((c) => <option key={c} value={c}>{catLabel[c]}</option>)}</select></Field>
        </div>
        <Btn type="submit" icon="plus" style={{ alignSelf: 'flex-start' }}>{l('Ekle', 'Add', 'Hinzufügen', 'Añadir', 'Добавить', 'Adicionar')}</Btn>
      </form>
    </div>
  );
};

/* ---------------- Dünya gün sayacı ---------------- */
const ruleName = (r: RollingRule, lang: string) => (lang === 'tr' ? r.name : lang === 'de' ? r.nameDe || r.nameEn || r.name : r.nameEn || r.name);
const ruleDesc = (r: RollingRule, lang: string) => (lang === 'tr' ? r.description : lang === 'de' ? r.descriptionDe || r.descriptionEn || r.description : r.descriptionEn || r.description);

function useTrips() {
  const [trips, setTrips] = useState<TripRecord[]>(() => loadStoredTrips());
  const save = (t: TripRecord[]) => {
    setTrips(t);
    saveStoredTrips(t);
  };
  return { trips, save };
}

const Gauge: React.FC<{ used: number; max: number; label: string }> = ({ used, max, label }) => {
  const pct = Math.min(1, used / max);
  const R = 52;
  const C = 2 * Math.PI * R;
  return (
    <svg viewBox="0 0 140 140" className="vz-gauge" role="img" aria-label={label}>
      <circle cx="70" cy="70" r={R} className="vz-gauge-bg" />
      <circle cx="70" cy="70" r={R} className={`vz-gauge-fg${pct >= 1 ? ' over' : pct > 0.75 ? ' warn' : ''}`} strokeDasharray={`${C * pct} ${C}`} transform="rotate(-90 70 70)" />
      <text x="70" y="66" textAnchor="middle" className="vz-gauge-n">{used}</text>
      <text x="70" y="88" textAnchor="middle" className="vz-gauge-s">/ {max}</text>
    </svg>
  );
};

const DaysView: React.FC<{ tr: ReturnType<typeof useTrips> }> = ({ tr: T }) => {
  const { l, language } = useI18n();
  const [rules, setRules] = useState<RollingRule[]>(() => {
    const stored = loadStoredRules();
    return stored.length ? stored : DEFAULT_RULES;
  });
  const [ruleId, setRuleId] = useState(rules[0].id);
  // özel kural
  const [showCustom, setShowCustom] = useState(false);
  const [cName, setCName] = useState('');
  const [cAllowed, setCAllowed] = useState(90);
  const [cWindow, setCWindow] = useState(180);
  const [cCountry, setCCountry] = useState('');
  const addRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cName.trim() || cAllowed < 1 || cWindow < cAllowed) return;
    const nr: RollingRule & { countries?: string[] } = { id: `c-${Date.now()}`, countries: cCountry ? [cCountry] : undefined, name: `${cName.trim()} (${cAllowed}/${cWindow})`, allowedDays: cAllowed, windowDays: cWindow, description: l(`Herhangi bir ${cWindow} günlük dönemde en fazla ${cAllowed} gün.`, `Up to ${cAllowed} days in any ${cWindow}-day window.`, `Max. ${cAllowed} Tage in ${cWindow} Tagen.`, `Hasta ${cAllowed} días en ${cWindow}.`, `До ${cAllowed} дн. за ${cWindow}.`, `Até ${cAllowed} dias em ${cWindow}.`) };
    const next = [...rules, nr];
    setRules(next);
    saveStoredRules(next);
    setRuleId(nr.id);
    setShowCustom(false);
    setCName('');
  };
  const removeRule = (id: string) => {
    const next = rules.filter((r) => r.id !== id);
    setRules(next);
    saveStoredRules(next);
    setRuleId(next[0].id);
  };
  // rotadan aktar: kurala uyan duraklar yolculuk olarak eklenir
  const [importMsg, setImportMsg] = useState('');
  const importFromRoute = () => {
    const ruleCountries: string[] = ((rule as RollingRule & { countries?: string[] }).countries) || [];
    const balkans = new Set(['RS', 'BA', 'ME', 'AL', 'MK', 'XK']);
    const match = (c: string) =>
      ruleId === 'schengen' ? SCHENGEN_SET.has(c) : ruleId === 'uk' ? c === 'GB' : ruleId === 'georgia' ? c === 'GE' : ruleId === 'balkans' ? balkans.has(c) : ruleCountries.length ? ruleCountries.includes(c) : true;
    const stops = loadStoredRouteStops().filter((st) => st.entryDate && st.exitDate && match(st.countryCode));
    const fresh = stops
      .map((st) => ({ id: `tr-r-${rule.id}-${st.id}`, start: dateToDayIndex(st.entryDate), end: dateToDayIndex(st.exitDate), region: rule.name, countryCode: st.countryCode }))
      .filter((t) => !T.trips.some((x) => x.id === t.id || (x.region === t.region && x.start === t.start && x.end === t.end)));
    if (fresh.length) T.save([...T.trips, ...fresh]);
    setImportMsg(
      fresh.length
        ? l(`Rotandan ${fresh.length} durak eklendi.`, `${fresh.length} stops added from your route.`, `${fresh.length} Stopps übernommen.`, `${fresh.length} paradas añadidas.`, `Добавлено ${fresh.length}.`, `${fresh.length} paradas adicionadas.`)
        : l('Rotanda bu kurala giren yeni durak yok.', 'No new stops on your route for this rule.', 'Keine neuen passenden Stopps.', 'No hay paradas nuevas.', 'Нет новых остановок.', 'Não há paradas novas.')
    );
  };
  const rule = rules.find((r) => r.id === ruleId) || rules[0];
  const today = getTodayDayIndex();
  const res = useMemo(() => evaluateRollingWindow(today, T.trips, rule), [today, T.trips, rule]);
  const mine = T.trips.filter((t) => t.region === rule.name).sort((a, b) => b.start - a.start);
  const [a, setA] = useState(dayIndexToDate(today - 30));
  const [b, setB] = useState(dayIndexToDate(today - 20));
  const [country, setCountry] = useState('');
  const [note, setNote] = useState('');
  const [planA, setPlanA] = useState(dayIndexToDate(today + 30));
  const [planB, setPlanB] = useState(dayIndexToDate(today + 44));
  // planlanan yolculuk: her gün için kayan pencerede sınır aşılıyor mu?
  const plan = useMemo(() => {
    const a = dateToDayIndex(planA), b = dateToDayIndex(planB);
    if (!(b >= a)) return null;
    const trial = [...T.trips, { id: 'plan', start: a, end: b, region: rule.name }];
    let worst = 0, firstBad: number | null = null;
    for (let d = a; d <= b; d++) {
      const r0 = evaluateRollingWindow(d, trial, rule);
      if (r0.daysUsed > worst) worst = r0.daysUsed;
      if (r0.daysUsed > rule.allowedDays && firstBad === null) firstBad = d;
    }
    return { len: b - a + 1, worst, firstBad };
  }, [planA, planB, T.trips, rule]);
  const [simDate, setSimDate] = useState(dayIndexToDate(today + 30));
  const sim = useMemo(() => evaluateRollingWindow(dateToDayIndex(simDate), T.trips, rule), [simDate, T.trips, rule]);
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const s = dateToDayIndex(a), en = dateToDayIndex(b);
    if (en < s) return;
    T.save([...T.trips, { id: `tr-${Date.now()}`, start: s, end: en, region: rule.name, countryCode: country || undefined, note: note.trim() || undefined }]);
    setNote('');
  };
  return (
    <div className="vz-stack">
      <Chips scroll>
        {rules.map((r) => (
          <Chip key={r.id} on={r.id === ruleId} onClick={() => { setRuleId(r.id); setImportMsg(''); }}>{ruleName(r, language)}</Chip>
        ))}
        <Chip on={showCustom} icon="plus" onClick={() => setShowCustom((v) => !v)}>{l('Özel kural', 'Custom rule', 'Eigene Regel', 'Regla propia', 'Своё правило', 'Regra personalizada')}</Chip>
      </Chips>
      {showCustom && (
        <form className="vz-card tone-sea" onSubmit={addRule}>
          <b>{l('Kendi kuralını ekle', 'Add your own rule', 'Eigene Regel hinzufügen', 'Añade tu regla', 'Добавьте правило', 'Adicione sua regra')}</b>
          <div className="vz-formgrid">
            <Field label={l('Ad', 'Name', 'Name', 'Nombre', 'Название', 'Nome')} htmlFor="vz-cr-n"><input id="vz-cr-n" className="vz-input" value={cName} onChange={(e) => setCName(e.target.value)} placeholder={l('ör. Tayland', 'e.g. Thailand', 'z. B. Thailand', 'p. ej. Tailandia', 'напр. Таиланд', 'ex.: Tailândia')} required /></Field>
            <Field label={l('İzin verilen gün', 'Days allowed', 'Erlaubte Tage', 'Días permitidos', 'Дней можно', 'Dias permitidos')} htmlFor="vz-cr-a"><input id="vz-cr-a" type="number" min={1} max={365} className="vz-input" value={cAllowed} onChange={(e) => setCAllowed(Number(e.target.value) || 1)} /></Field>
            <Field label={l('Hangi ülke (rotadan aktarmak için)', 'Which country (for route import)', 'Welches Land', 'Qué país', 'Какая страна', 'Qual país')} htmlFor="vz-cr-c">
              <select id="vz-cr-c" className="vz-select" value={cCountry} onChange={(e) => { setCCountry(e.target.value); if (e.target.value && !cName.trim()) setCName(getCountryName(e.target.value, language)); }}>
                <option value="">{l('Bütün ülkeler', 'All countries', 'Alle Länder', 'Todos', 'Все страны', 'Todos')}</option>
                {Object.keys(GEO_DATA).map((c) => ({ c, n: getCountryName(c, language) })).sort((x, y) => x.n.localeCompare(y.n, language)).map((o) => <option key={o.c} value={o.c}>{o.n}</option>)}
              </select>
            </Field>
            <Field label={l('Kaç günlük dönemde', 'Within how many days', 'Innerhalb von Tagen', 'En cuántos días', 'За сколько дней', 'Em quantos dias')} htmlFor="vz-cr-w"><input id="vz-cr-w" type="number" min={1} max={730} className="vz-input" value={cWindow} onChange={(e) => setCWindow(Number(e.target.value) || 1)} /></Field>
          </div>
          <Btn type="submit" icon="plus" style={{ alignSelf: 'flex-start' }}>{l('Kuralı ekle', 'Add rule', 'Regel hinzufügen', 'Añadir regla', 'Добавить', 'Adicionar regra')}</Btn>
        </form>
      )}
      <div className="vz-row-flex" style={{ justifyContent: 'space-between' }}>
        <p className="vz-muted" style={{ fontSize: 14, flex: 1, minWidth: 200 }}>{ruleDesc(rule, language)}</p>
        <span className="vz-row-flex" style={{ gap: 6 }}>
          <Btn small variant="soft" icon="route" onClick={importFromRoute}>{l('Rotamdan aktar', 'Import from my route', 'Aus Route übernehmen', 'Importar de mi ruta', 'Из маршрута', 'Importar do meu roteiro')}</Btn>
          {!rule.preset && <Btn small variant="ghost" icon="trash" onClick={() => removeRule(rule.id)}>{l('Kuralı sil', 'Delete rule', 'Regel löschen', 'Borrar regla', 'Удалить', 'Apagar regra')}</Btn>}
        </span>
      </div>
      {importMsg && <div className="vz-note"><Icon name="check" size={18} duo={false} /><span>{importMsg}</span></div>}
      <div className="vz-daysgrid">
        <div className="vz-card" style={{ alignItems: 'center' }}>
          <Gauge used={res.daysUsed} max={rule.allowedDays} label={l(`${res.daysUsed} gün kullanıldı`, `${res.daysUsed} days used`, `${res.daysUsed} Tage genutzt`, `${res.daysUsed} días usados`, `Использовано ${res.daysUsed}`, `${res.daysUsed} dias usados`)} />
          <b>{l('Son', 'Last', 'Letzte', 'Últimos', 'За', 'Últimos')} {rule.windowDays} {l('günde kullanılan', 'days used', 'Tage genutzt', 'días usados', 'дн.', 'dias usados')}</b>
        </div>
        <div className="vz-stack" style={{ gap: 10 }}>
          <Stat value={res.isOverstay ? `−${res.overstayDays}` : res.remainingDays} label={res.isOverstay ? l('Gün fazla kaldın', 'Days over the limit', 'Tage überzogen', 'Días de exceso', 'Превышение', 'Dias excedidos') : l('Kalan hak', 'Days left', 'Verbleibend', 'Restantes', 'Осталось', 'Restantes')} icon={res.isOverstay ? 'alert' : 'check'} tone={res.isOverstay ? 'warn' : 'ok'} />
          <Stat value={res.maxConsecutiveStayIfEnteringToday} label={l('Bugün girersen en fazla kalış', 'Max stay if you enter today', 'Max. Aufenthalt ab heute', 'Máx. si entras hoy', 'Макс. с сегодня', 'Máx. se entrar hoje')} icon="cal" />
          {res.safeExitDate && <Stat value={formatLocalizedDate(dateToDayIndex(res.safeExitDate), language)} label={l('En geç çıkış', 'Latest exit', 'Späteste Ausreise', 'Salida límite', 'Последний выезд', 'Saída até')} icon="plane" tone="sun" />}
        </div>
      </div>
      <Card title={l('Gelecek tarihi dene', 'Try a future date', 'Zukunftsdatum testen', 'Prueba una fecha', 'Проверить дату', 'Teste uma data')} icon="spark" tone="sea">
        <div className="vz-row-flex">
          <Field label={l('Giriş tarihi', 'Entry date', 'Einreise', 'Entrada', 'Въезд', 'Entrada')} htmlFor="vz-sim"><input id="vz-sim" type="date" className="vz-input" value={simDate} onChange={(e) => setSimDate(e.target.value)} /></Field>
          <p style={{ flex: 1, minWidth: 200 }}>{l(`O gün girersen en fazla ${sim.maxConsecutiveStayIfEnteringToday} gün kalabilirsin.`, `If you enter that day you can stay up to ${sim.maxConsecutiveStayIfEnteringToday} days.`, `Dann max. ${sim.maxConsecutiveStayIfEnteringToday} Tage.`, `Podrías quedarte ${sim.maxConsecutiveStayIfEnteringToday} días.`, `Можно до ${sim.maxConsecutiveStayIfEnteringToday} дн.`, `Você poderia ficar ${sim.maxConsecutiveStayIfEnteringToday} dias.`)}</p>
        </div>
      </Card>
      <Card title={l('Planladığın yolculuk sığıyor mu?', 'Does your planned trip fit?', 'Passt die geplante Reise?', '¿Cabe tu viaje?', 'Поместится ли поездка?', 'Sua viagem cabe no limite?')} icon="plane">
        <div className="vz-formgrid">
          <Field label={l('Giriş', 'Entry', 'Einreise', 'Entrada', 'Въезд', 'Entrada')} htmlFor="vz-pl-a"><input id="vz-pl-a" type="date" className="vz-input" value={planA} onChange={(e) => setPlanA(e.target.value)} /></Field>
          <Field label={l('Çıkış', 'Exit', 'Ausreise', 'Salida', 'Выезд', 'Saída')} htmlFor="vz-pl-b"><input id="vz-pl-b" type="date" className="vz-input" value={planB} onChange={(e) => setPlanB(e.target.value)} /></Field>
        </div>
        {plan && (
          plan.firstBad === null ? (
            <div className="vz-note" style={{ borderColor: 'var(--vz-ok)' }}><Icon name="check" size={18} duo={false} /><span>{l(`Sığıyor: ${plan.len} günlük yolculukta en yüksek kullanım ${plan.worst}/${rule.allowedDays} gün.`, `It fits: peak use during this ${plan.len}-day trip is ${plan.worst}/${rule.allowedDays} days.`, `Passt: max. ${plan.worst}/${rule.allowedDays} Tage.`, `Cabe: máximo ${plan.worst}/${rule.allowedDays} días.`, `Подходит: максимум ${plan.worst}/${rule.allowedDays}.`, `Cabe: máximo de ${plan.worst}/${rule.allowedDays} dias.`)}</span></div>
          ) : (
            <div className="vz-note" style={{ borderColor: 'var(--vz-warn)', color: 'var(--vz-warn)' }}><Icon name="alert" size={18} duo={false} /><span>{l(`Sığmıyor: ${formatLocalizedDate(plan.firstBad, language)} tarihinde ${rule.allowedDays} gün sınırı aşılıyor. En geç bir gün önce çıkmalısın.`, `It doesn't fit: you pass the ${rule.allowedDays}-day limit on ${formatLocalizedDate(plan.firstBad, language)}. Leave the day before at the latest.`, `Grenze am ${formatLocalizedDate(plan.firstBad, language)} überschritten.`, `Superas el límite el ${formatLocalizedDate(plan.firstBad, language)}.`, `Превышение ${formatLocalizedDate(plan.firstBad, language)}.`, `Você ultrapassa o limite em ${formatLocalizedDate(plan.firstBad, language)}.`)}</span></div>
          )
        )}
      </Card>
      <form className="vz-card" onSubmit={add}>
        <b>{l(`${ruleName(rule, language)} için yolculuk ekle`, `Add a trip for ${ruleName(rule, language)}`, `Reise hinzufügen`, `Añadir viaje`, `Добавить поездку`, `Adicionar viagem`)}</b>
        <div className="vz-formgrid">
          <Field label={l('Giriş', 'Entry', 'Einreise', 'Entrada', 'Въезд', 'Entrada')} htmlFor="vz-tr-a"><input id="vz-tr-a" type="date" className="vz-input" value={a} onChange={(e) => setA(e.target.value)} /></Field>
          <Field label={l('Çıkış', 'Exit', 'Ausreise', 'Salida', 'Выезд', 'Saída')} htmlFor="vz-tr-b"><input id="vz-tr-b" type="date" className="vz-input" value={b} onChange={(e) => setB(e.target.value)} /></Field>
          <Field label={l('Not (isteğe bağlı)', 'Note (optional)', 'Notiz (optional)', 'Nota (opcional)', 'Заметка', 'Observação (opcional)')} htmlFor="vz-tr-note"><input id="vz-tr-note" className="vz-input" value={note} onChange={(e) => setNote(e.target.value)} placeholder={l('ör. İş toplantısı', 'e.g. Business trip', 'z. B. Geschäftsreise', 'p. ej. Viaje de trabajo', 'напр. Командировка', 'ex.: Viagem a trabalho')} /></Field>
          <Field label={l('Ülke (183 gün için)', 'Country (for 183 days)', 'Land (183 Tage)', 'País (183 días)', 'Страна (183)', 'País (183 dias)')} htmlFor="vz-tr-c">
            <select id="vz-tr-c" className="vz-select" value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="">—</option>
              {Object.keys(GEO_DATA).map((c) => ({ c, n: getCountryName(c, language) })).sort((x, y) => x.n.localeCompare(y.n, language)).map((o) => <option key={o.c} value={o.c}>{o.n}</option>)}
            </select>
          </Field>
        </div>
        <Btn type="submit" icon="plus" style={{ alignSelf: 'flex-start' }}>{l('Yolculuğu ekle', 'Add trip', 'Reise hinzufügen', 'Añadir', 'Добавить', 'Adicionar')}</Btn>
      </form>
      {mine.length > 0 && (
        <List>
          {mine.map((t) => (
            <Row key={t.id} lead={t.countryCode ? <Flag code={t.countryCode} size="sm" /> : undefined} icon="cal" title={`${formatLocalizedDate(t.start, language)} → ${formatLocalizedDate(t.end, language)}`} sub={[l(`${t.end - t.start + 1} gün`, `${t.end - t.start + 1} days`, `${t.end - t.start + 1} Tage`, `${t.end - t.start + 1} días`, `${t.end - t.start + 1} дн.`, `${t.end - t.start + 1} dias`), t.note].filter(Boolean).join(' · ')} right={<button type="button" className="vz-iconbtn" onClick={() => T.save(T.trips.filter((x) => x.id !== t.id))} aria-label={l('Sil', 'Delete', 'Löschen', 'Borrar', 'Удалить', 'Excluir')}><Icon name="trash" size={16} duo={false} /></button>} />
          ))}
        </List>
      )}
    </div>
  );
};

/* ---------------- 183 gün ---------------- */
const TaxView: React.FC<{ tr: ReturnType<typeof useTrips>; onGoDays: () => void }> = ({ tr: T, onGoDays }) => {
  const { l, language } = useI18n();
  const [year, setYear] = useState(new Date().getFullYear());
  const list = useMemo(() => computeTaxResidency(T.trips, year), [T.trips, year]);
  return (
    <div className="vz-stack">
      <div className="vz-note"><Icon name="info" size={18} duo={false} /><span>{l('Birçok ülkede bir takvim yılında 183 gün ve üzeri kalan kişi vergi mukimi sayılabilir. Bu bir hukuki görüş değildir; kendi durumun için bir vergi danışmanına sor.', 'In many countries, spending 183+ days in a calendar year can make you tax-resident. This is not legal advice; check with a tax adviser.', '183+ Tage können Steuerpflicht auslösen. Keine Rechtsberatung.', '183+ días pueden generar residencia fiscal. No es asesoría legal.', '183+ дней могут дать налоговое резидентство. Не юр. совет.', '183 dias ou mais podem gerar residência fiscal. Isto não é assessoria jurídica.')}</span></div>
      <Segmented label={l('Yıl', 'Year', 'Jahr', 'Año', 'Год', 'Ano')} value={String(year)} onChange={(v) => setYear(Number(v))} options={[year - 1, new Date().getFullYear(), new Date().getFullYear() + 1].filter((v, i, a) => a.indexOf(v) === i).map((y) => ({ id: String(y), label: String(y) }))} />
      {list.length === 0 ? (
        <Empty icon="chart" title={l('Bu yıl için ülkeli yolculuk yok', 'No trips with a country this year', 'Keine Reisen mit Land', 'Sin viajes con país', 'Нет поездок', 'Nenhuma viagem com país')} text={l('Gün sayacında yolculuk eklerken ülke seç; burada sayılır.', 'Pick a country when you add trips in the day counter.', 'Beim Hinzufügen ein Land wählen.', 'Elige país al añadir viajes.', 'Указывайте страну при добавлении.', 'Escolha o país ao adicionar viagens.')} action={<Btn variant="soft" onClick={onGoDays}>{l('Gün sayacına git', 'Go to day counter', 'Zum Tagezähler', 'Ir al contador', 'К счётчику', 'Ir para o contador')}</Btn>} />
      ) : (
        <div className="vz-stack" style={{ gap: 10 }}>
          {list.map((s) => (
            <div key={s.countryCode} className="vz-card" style={{ gap: 8 }}>
              <div className="vz-row-flex" style={{ justifyContent: 'space-between' }}>
                <span className="vz-row-flex" style={{ gap: 8 }}><Flag code={s.countryCode} size="sm" /><b>{getCountryName(s.countryCode, language)}</b></span>
                <span className={`vz-badge tone-${s.status === 'safe' ? 'ok' : s.status === 'warning' ? 'sun' : 'warn'}`}>{s.daysSpent} / 183</span>
              </div>
              <div className="vz-meter"><i style={{ width: `${Math.min(100, (s.daysSpent / 183) * 100)}%`, background: s.status === 'safe' ? 'var(--vz-ok)' : s.status === 'warning' ? 'var(--rd-sun)' : 'var(--vz-warn)' }} /></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
export const WalletPage: React.FC<{ passport: string; openRequest: OpenRequest }> = ({ passport, openRequest }) => {
  const { l, language } = useI18n();
  const w = useWallet(passport);
  const T = useTrips();
  const [req, setReq] = useState<OpenRequest>(null);
  useEffect(() => {
    if (openRequest) setReq(openRequest);
  }, [openRequest?.nonce]); // eslint-disable-line react-hooks/exhaustive-deps
  const go = (id: string) => setReq({ id, nonce: Date.now() });
  const sch = DEFAULT_RULES[0];
  const schRes = useMemo(() => evaluateRollingWindow(getTodayDayIndex(), T.trips, sch), [T.trips, sch]);
  const pass = w.docs.filter((d) => d.type === 'passport').sort((a, b) => a.expiry.localeCompare(b.expiry))[0];
  const nextTicket = w.tickets.find((t) => daysLeft(t.date) >= 0);
  const warnCount = w.docs.filter((d) => daysLeft(d.expiry) < 180).length;

  const tiles: Tile[] = [
    { id: 'docs', icon: 'passport', title: l('Belgelerim', 'My documents', 'Meine Dokumente', 'Mis documentos', 'Документы', 'Meus documentos'), desc: l('Pasaport, vize, sigorta', 'Passport, visas, insurance', 'Pass, Visa, Versicherung', 'Pasaporte, visados', 'Паспорт, визы', 'Passaporte, vistos'), badge: w.docs.length ? `${w.docs.length}` : undefined, render: () => <DocsView w={w} /> },
    { id: 'tickets', icon: 'ticket', title: l('Biletlerim', 'My bookings', 'Buchungen', 'Reservas', 'Брони', 'Reservas'), desc: l('Uçuş ve rezervasyonlar', 'Flights and bookings', 'Flüge und Buchungen', 'Vuelos y reservas', 'Рейсы и брони', 'Voos e reservas'), badge: w.tickets.length ? `${w.tickets.length}` : undefined, render: () => <TicketsView w={w} /> },
    { id: 'alerts', icon: 'bell', title: l('Geçerlilik uyarıları', 'Expiry alerts', 'Ablaufhinweise', 'Avisos', 'Предупреждения', 'Alertas'), desc: l('Süresi dolanlar, 6 ay kuralı', 'Expiries, 6-month rule', 'Ablauf, 6-Monats-Regel', 'Caducidades, regla 6 meses', 'Сроки, правило 6 мес.', 'Vencimentos, regra dos 6 meses'), badge: warnCount ? `${warnCount}` : undefined, render: () => <AlertsView w={w} onGoDocs={() => go('docs')} /> },
    { id: 'budget', icon: 'wallet', title: l('Bütçe', 'Budget', 'Budget', 'Presupuesto', 'Бюджет', 'Orçamento'), desc: l('Harcamalar, tek para biriminde', 'Spending in one currency', 'Ausgaben in einer Währung', 'Gastos en una moneda', 'Расходы в одной валюте', 'Gastos em uma só moeda'), render: () => <BudgetView w={w} /> },
    { id: 'days', icon: 'cal', title: l('Dünya gün sayacı', 'World day counter', 'Welt-Tagezähler', 'Contador mundial', 'Счётчик дней', 'Contador mundial'), desc: l('Schengen 90/180 ve diğerleri', 'Schengen 90/180 and more', 'Schengen 90/180 u. a.', 'Schengen 90/180 y más', 'Шенген 90/180 и др.', 'Schengen 90/180 e mais'), badge: `${schRes.daysUsed}/90`, render: () => <DaysView tr={T} /> },
    { id: 'tax', icon: 'chart', title: l('183 gün vergi takibi', '183-day tax tracker', '183-Tage-Steuer', '183 días fiscal', 'Налог 183 дня', '183 dias (fiscal)'), desc: l('Ülke başına geçen gün', 'Days spent per country', 'Tage pro Land', 'Días por país', 'Дни по странам', 'Dias por país'), render: () => <TaxView tr={T} onGoDays={() => go('days')} /> }
  ];

  return (
    <Page
      eyebrow={l('Cüzdan', 'Wallet', 'Wallet', 'Cartera', 'Кошелёк', 'Carteira')}
      title={l('Belgelerin ve günlerin', 'Your documents and days', 'Deine Dokumente und Tage', 'Tus documentos y días', 'Документы и дни', 'Seus documentos e dias')}
      sub={l('Tarihler, kalan günler ve uyarılar tek yerde. Hepsi yalnızca bu cihazda saklanır.', 'Dates, remaining days and alerts in one place, stored only on this device.', 'Daten, Resttage und Hinweise, nur auf diesem Gerät.', 'Fechas, días y avisos, solo en este dispositivo.', 'Даты, дни и предупреждения — только на этом устройстве.', 'Datas, dias e alertas, só neste dispositivo.')}
      words={['France', 'Spain', 'Portugal', 'Germany']}
      summary={
        <div className="vz-cfacts">
          <Stat value={`${schRes.daysUsed}/90`} label={l('Schengen (son 180 gün)', 'Schengen (last 180 days)', 'Schengen (180 T.)', 'Schengen (180 d)', 'Шенген (180 дн.)', 'Schengen (180 d)')} icon="shield" tone={schRes.isOverstay ? 'warn' : 'ok'} />
          <Stat value={pass ? l(`${daysLeft(pass.expiry)} gün`, `${daysLeft(pass.expiry)} days`, `${daysLeft(pass.expiry)} T.`, `${daysLeft(pass.expiry)} d`, `${daysLeft(pass.expiry)} дн.`, `${daysLeft(pass.expiry)} d`) : '—'} label={l('Pasaport geçerliliği', 'Passport validity', 'Passgültigkeit', 'Validez pasaporte', 'Срок паспорта', 'Validade do passaporte')} icon="passport" tone={pass && daysLeft(pass.expiry) < 180 ? 'warn' : 'sea'} />
          <Stat value={nextTicket ? formatLocalizedDate(dateToDayIndex(nextTicket.date), language) : '—'} label={nextTicket ? nextTicket.title : l('Sıradaki rezervasyon', 'Next booking', 'Nächste Buchung', 'Próxima reserva', 'Следующая бронь', 'Próxima reserva')} icon="ticket" tone="sun" />
          <Stat value={w.docs.length} label={l('Kayıtlı belge', 'Saved documents', 'Dokumente', 'Documentos', 'Документов', 'Documentos')} icon="doc" />
        </div>
      }
    >
      <TileGrid tiles={tiles} openRequest={req} label={l('Cüzdan', 'Wallet', 'Wallet', 'Cartera', 'Кошелёк', 'Carteira')} />
    </Page>
  );
};


