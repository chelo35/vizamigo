import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal, flushSync } from 'react-dom';
import { useI18n } from '../data/i18n';
import { Icon, IconName } from './Icon';
import { Flag, VisaBadge } from './ui';
import { GEO_DATA } from '../data/geoData';
import { getCountryName } from '../data/passportData';
import { getPassportItems } from '../utils/calculator';
import type { TabKey } from '../components/Navigation';

const norm = (s: string) => s.toLocaleLowerCase('tr').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i').trim();
// "japonya vizesi", "thailand visa" gibi aramalarda ülke adını ayıkla
const NOISE = /\b(vize(si|leri)?|visa|visum|visado|виза|gezi|rehber(i)?|guide|travel|seyahat|tatil|kac gun|how long|e-?vize|evisa)\b/g;

export interface SearchAction {
  kind: 'country' | 'tool';
  id: string;
  label: string;
  sub?: string;
  icon?: IconName;
  code?: string;
  tab?: TabKey;
  tile?: string;
}

export function useSearchIndex(passport: string) {
  const { l, language } = useI18n();
  const countries = useMemo(
    () => Object.keys(GEO_DATA).map((c) => ({ c, n: getCountryName(c, language), en: getCountryName(c, 'en'), cap: GEO_DATA[c].capital })),
    [language]
  );
  const items = useMemo(() => new Map(getPassportItems(passport).map((x) => [x.c, x])), [passport]);
  const tools: (SearchAction & { keys: string })[] = [
    { kind: 'tool', id: 't-where', label: l('Nereye gidebilirim?', 'Where can I go?', 'Wohin kann ich?', '¿Dónde puedo ir?', 'Куда можно?'), icon: 'pin', tab: 'explore', tile: 'where', keys: 'nereye gidebilirim vizesiz visa free where can i go kimlik' },
    { kind: 'tool', id: 't-compare', label: l('Pasaport karşılaştır', 'Compare passports', 'Pässe vergleichen', 'Comparar pasaportes', 'Сравнить паспорта'), icon: 'scale', tab: 'explore', tile: 'compare', keys: 'karsilastir compare cifte dual pasaport passport' },
    { kind: 'tool', id: 't-days', label: l('Schengen 90/180 sayacı', 'Schengen 90/180 counter', 'Schengen-Rechner', 'Contador Schengen', 'Счётчик Шенгена'), icon: 'cal', tab: 'track', tile: 'days', keys: 'schengen 90 180 gun sayaci day counter' },
    { kind: 'tool', id: 't-route', label: l('Rota planlayıcı', 'Route planner', 'Routenplaner', 'Planificador', 'Маршрут'), icon: 'route', tab: 'plan', tile: 'planner', keys: 'rota route plan planlayici itinerary' },
    { kind: 'tool', id: 't-transit', label: l('Transit kuralları', 'Transit rules', 'Transitregeln', 'Tránsito', 'Транзит'), icon: 'transit', tab: 'plan', tile: 'transit', keys: 'transit aktarma layover' },
    { kind: 'tool', id: 't-pack', label: l('Bavul listesi', 'Packing list', 'Packliste', 'Maleta', 'Список вещей'), icon: 'bag', tab: 'nomad', tile: 'pack', keys: 'bavul valiz packing liste' },
    { kind: 'tool', id: 't-fx', label: l('Döviz çevirici', 'Currency converter', 'Währungsrechner', 'Conversor', 'Конвертер'), icon: 'fx', tab: 'nomad', tile: 'fx', keys: 'doviz kur currency exchange para euro dolar' },
    { kind: 'tool', id: 't-tip', label: l('Bahşiş', 'Tipping', 'Trinkgeld', 'Propinas', 'Чаевые'), icon: 'receipt', tab: 'nomad', tile: 'tip', keys: 'bahsis tip tipping' },
    { kind: 'tool', id: 't-plug', label: l('Priz & eSIM', 'Plugs & eSIM', 'Stecker & eSIM', 'Enchufes', 'Розетки'), icon: 'plug', tab: 'nomad', tile: 'plug', keys: 'priz plug esim sim internet voltaj' },
    { kind: 'tool', id: 't-sos', label: l('Acil durum & konsolosluk', 'Emergency & consulate', 'Notfall & Konsulat', 'Emergencias', 'Экстренные'), icon: 'sos', tab: 'nomad', tile: 'sos', keys: 'acil emergency polis police ambulans konsolosluk consulate buyukelcilik' },
    { kind: 'tool', id: 't-lost', label: l('Pasaport kaybı', 'Lost passport', 'Passverlust', 'Pasaporte perdido', 'Утеря паспорта'), icon: 'shield', tab: 'nomad', tile: 'loss', keys: 'kayip pasaport lost passport ret itiraz refusal' },
    { kind: 'tool', id: 't-nomad', label: l('Dijital göçebe vizeleri', 'Digital nomad visas', 'Nomadenvisa', 'Visados nómada', 'Визы кочевников'), icon: 'laptop', tab: 'plan', tile: 'nomad', keys: 'gocebe nomad remote uzaktan calisma 183 vergi tax' },
    { kind: 'tool', id: 't-changes', label: l('Kural değişiklikleri', 'Rule changes', 'Regeländerungen', 'Cambios', 'Изменения'), icon: 'bell', tab: 'explore', tile: 'changes', keys: 'degisiklik yeni kural change news' },
    { kind: 'tool', id: 't-radar', label: l('Dünya radarı: saat, hava, kur', 'World radar: time, weather, money', 'Weltradar', 'Radar mundial', 'Мировой радар'), icon: 'radar', tab: 'explore', tile: 'radar', keys: 'saat hava durumu weather time clock radar harita map' },
    { kind: 'tool', id: 't-docs', label: l('Belgelerim & cüzdan', 'My documents & wallet', 'Dokumente & Wallet', 'Documentos', 'Документы'), icon: 'wallet', tab: 'track', tile: 'docs', keys: 'cuzdan wallet belge document bilet ticket butce budget' }
  ];
  const search = (q: string): SearchAction[] => {
    const raw = norm(q);
    if (!raw) return [];
    const nq = raw.replace(NOISE, ' ').replace(/\s+/g, ' ').trim() || raw;
    const scored = countries
      .map((x) => {
        const a = norm(x.n), b = norm(x.en), cap = norm(x.cap || '');
        const s = a.startsWith(nq) || b.startsWith(nq) ? 3 : a.includes(nq) || b.includes(nq) ? 2 : cap.startsWith(nq) ? 1 : 0;
        return { x, s };
      })
      .filter((r) => r.s > 0)
      .sort((p, q2) => q2.s - p.s || p.x.n.localeCompare(q2.x.n, language))
      .slice(0, 6)
      .map(({ x }) => ({ kind: 'country' as const, id: `c-${x.c}`, code: x.c, label: x.n, sub: x.cap }));
    const tl = tools.filter((t) => norm(t.label).includes(raw) || t.keys.split(' ').some((k) => k.startsWith(raw) || raw.split(' ').some((w) => w.length > 2 && k.startsWith(w)))).slice(0, 4);
    return [...scored, ...tl];
  };
  return { search, items };
}

interface Props {
  id: string;
  passport: string;
  placeholder: string;
  variant?: 'hero' | 'bar';
  onOpenCountry: (code: string) => void;
  onOpenTool: (tab: TabKey, tile: string) => void;
  onQuery: (q: string) => void;
}

/** Yazarken öneri gösteren arama: ülkeler (bayrak + vize durumu) ve araçlar. */
export const SmartSearch: React.FC<Props> = ({ id, passport, placeholder, variant = 'bar', onOpenCountry, onOpenTool, onQuery }) => {
  const { l } = useI18n();
  const { search, items } = useSearchIndex(passport);
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  // telefonda arama tam ekran açılır: kutu en üstte, öneriler altında, klavye hiçbir şeyi örtmez
  const [full, setFull] = useState(false);
  const boxRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fullInputRef = useRef<HTMLInputElement>(null);
  const res = useMemo(() => search(q), [q, passport]); // eslint-disable-line react-hooks/exhaustive-deps
  const isPhone = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches;
  useEffect(() => {
    if (!full) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setFull(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [full]);
  // yazılanın devamı (otomatik tamamlama): ilk ülke önerisi yazılanla başlıyorsa
  const top = res[0];
  const ghost =
    q.length >= 2 && top && top.kind === 'country' && top.label.toLocaleLowerCase('tr').startsWith(q.toLocaleLowerCase('tr')) && top.label.length > q.length
      ? top.label.slice(q.length)
      : '';
  const acceptGhost = () => {
    if (!ghost) return false;
    setQ(q + ghost);
    setHi(0);
    return true;
  };
  const pick = (a?: SearchAction) => {
    setOpen(false);
    setFull(false);
    inputRef.current?.blur();
    fullInputRef.current?.blur();
    if (!a) {
      if (q.trim()) onQuery(q.trim());
      return;
    }
    setQ('');
    if (a.kind === 'country' && a.code) onOpenCountry(a.code);
    else if (a.tab && a.tile) onOpenTool(a.tab, a.tile);
  };
  const openFull = () => {
    // aynı dokunuşun içinde tam ekranı çiz ve oradaki kutuya odaklan (iPhone klavyesi açık kalsın)
    flushSync(() => setFull(true));
    fullInputRef.current?.focus();
  };
  const render = (isFull: boolean) => {
  const fid = isFull ? `${id}-full` : id;
  const listId = `${fid}-list`;
  return (
    <form
      ref={isFull ? undefined : boxRef}
      className={`vz-ss ${variant}${isFull ? ' full' : ''}`}
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        // tek güçlü eşleşme varsa doğrudan aç
        pick(res.length && (open || res[0].kind === 'country') ? res[Math.min(hi, res.length - 1)] : undefined);
      }}
      onBlur={(e) => {
        if (!isFull && !boxRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <div className="vz-searchbox">
        {isFull && (
          <button type="button" className="vz-ss-back" onClick={() => { setFull(false); setOpen(false); }} aria-label={l('Aramayı kapat', 'Close search', 'Suche schließen', 'Cerrar búsqueda', 'Закрыть поиск')}>
            <Icon name="back" size={18} duo={false} />
          </button>
        )}
        <Icon name="search" size={variant === 'hero' ? 20 : 18} duo={false} />
        <label htmlFor={fid} className="sr-only">{placeholder}</label>
        <span className="vz-ss-field">
        {ghost && open && isFull === full && (
          <span className="vz-ss-ghost" aria-hidden="true"><span>{q}</span>{ghost}</span>
        )}
        <input
          ref={isFull ? fullInputRef : inputRef}
          id={fid}
          type="search"
          role="combobox"
          aria-expanded={open && res.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          value={q}
          placeholder={placeholder}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setHi(0);
          }}
          onFocus={() => {
            if (!isFull && isPhone()) {
              openFull();
              return;
            }
            if (q) setOpen(true);
          }}
          onKeyDown={(e) => {
            const atEnd = e.currentTarget.selectionStart === q.length;
            if ((e.key === 'ArrowRight' && atEnd) || (e.key === 'Tab' && ghost)) { if (acceptGhost()) e.preventDefault(); }
            else if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setHi((h) => Math.min(h + 1, res.length - 1)); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); setHi((h) => Math.max(h - 1, 0)); }
            else if (e.key === 'Escape') { setOpen(false); setFull(false); }
          }}
        />
        </span>
        {q && (
          <button type="button" onClick={() => { setQ(''); setOpen(false); }} aria-label={l('Temizle', 'Clear', 'Leeren', 'Borrar', 'Очистить')}>
            <Icon name="close" size={16} duo={false} />
          </button>
        )}
        {variant === 'hero' && <button type="submit" className="vz-btn vz-btn-primary vz-ss-go">{l('Ara', 'Search', 'Suchen', 'Buscar', 'Найти')}</button>}
      </div>
      {isFull && !q.trim() && (
        <div className="vz-ss-pop">
          <div className="vz-ss-empty">{l('Ülke adı ya da "Schengen", "bavul", "döviz" gibi bir araç yaz.', 'Type a country, or a tool like "Schengen", "packing", "currency".', 'Land oder Tool eingeben.', 'Escribe un país o una herramienta.', 'Введите страну или инструмент.')}</div>
        </div>
      )}
      {open && q.trim() && isFull === full && (
        <div className="vz-ss-pop" id={listId} role="listbox">
          {res.length === 0 ? (
            <div className="vz-ss-empty">{l('Sonuç yok. Ülke adı ya da "Schengen", "bavul" gibi bir araç yaz.', 'No results. Try a country or a tool like "Schengen" or "packing".', 'Keine Treffer.', 'Sin resultados.', 'Ничего не найдено.')}</div>
          ) : (
            res.map((a, i) => (
              <button
                key={a.id}
                type="button"
                role="option"
                aria-selected={i === hi}
                className={`vz-ss-item${i === hi ? ' hi' : ''}`}
                onMouseEnter={() => setHi(i)}
                // fareyle basınca kutu odağı kaybetmesin; liste kapanmadan tıklama yakalansın
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(a)}
              >
                {a.kind === 'country' && a.code ? <Flag code={a.code} size="sm" /> : <span className="vz-ic sm"><Icon name={a.icon || 'tools'} size={16} /></span>}
                <span className="vz-row-b">
                  <span className="vz-row-t">{a.label}</span>
                  {a.sub && <span className="vz-row-s">{a.sub}</span>}
                </span>
                {a.kind === 'country' && a.code ? <VisaBadge item={items.get(a.code)} /> : <span className="vz-ss-kind">{l('Araç', 'Tool', 'Tool', 'Herramienta', 'Инструмент')}</span>}
              </button>
            ))
          )}
        </div>
      )}
    </form>
  );
  };
  return (
    <>
      {render(false)}
      {full && typeof document !== 'undefined' && createPortal(render(true), document.body)}
    </>
  );
};
