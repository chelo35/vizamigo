import React, { useState } from 'react';
import { useI18n } from '../data/i18n';
import { GUIDE_META, getGuide, type GuideChecklist, type GuideId } from '../data/guides';
import { tpLinks } from '../data/tpPartners';
import { Btn, Chip, Chips, List, Row } from './ui';
import { PartnerLogo } from './PartnerLogo';

/** Güncel konu rehberi: kısa cevap, bölümler, SSS, kaynaklar ve yolculuk bağlantıları. */
export const GuideArticle: React.FC<{ id: GuideId }> = ({ id }) => {
  const { l, language } = useI18n();
  const g = getGuide(id, language);
  const meta = GUIDE_META[id];
  const place = id === 'greek_islands_visa' ? 'Rhodes, Greece' : id === 'uk_eta' ? 'London' : id === 'esta' ? 'New York' : 'Paris';
  const to = id === 'uk_eta' ? 'LON' : id === 'esta' ? 'NYC' : 'PAR';
  const checked = new Date(meta.checked).toLocaleDateString(language, { day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <div className="vz-guide">
      <section className="vz-tldr" aria-label={l('Kısa cevap', 'Quick answer', 'Kurzantwort', 'Respuesta rápida', 'Коротко')}>
        <div className="vz-stack" style={{ gap: 6 }}>
          <b>{l('Kısa cevap', 'Quick answer', 'Kurzantwort', 'Respuesta rápida', 'Коротко')}</b>
          <p>{g.answer}</p>
          <span className="vz-muted" style={{ fontSize: 12.5 }}>{l('Son kontrol', 'Last checked', 'Zuletzt geprüft', 'Última revisión', 'Проверено')}: {checked}</span>
        </div>
      </section>
      {g.checklist && <Checklist c={g.checklist} />}
      {g.sections.map((s) => (
        <section key={s.h}>
          <h2>{s.h}</h2>
          {s.p?.map((t) => <p key={t}>{t}</p>)}
          {s.list && <ul>{s.list.map((t) => <li key={t}>{t}</li>)}</ul>}
        </section>
      ))}
      <section>
        <h2>{l('Yolculuğunu planla', 'Plan your trip', 'Reise planen', 'Planea tu viaje', 'Спланируйте поездку')}</h2>
        <List>
          {id !== 'greek_islands_visa' && <Row lead={<PartnerLogo id="aviasales" />} title={l('Uçuşlar', 'Flights', 'Flüge', 'Vuelos', 'Авиабилеты')} sub="Aviasales" href={tpLinks.flights(language === 'tr' ? 'IST' : undefined, to)} />}
          <Row lead={<PartnerLogo id="booking" />} title={l('Oteller', 'Hotels', 'Hotels', 'Hoteles', 'Отели')} sub="Booking.com" href={tpLinks.booking(place)} />
          <Row lead={<PartnerLogo id="yesim" />} title="eSIM" sub="Yesim" href={tpLinks.yesim()} />
        </List>
      </section>
      <section>
        <h2>{l('Sık sorulan sorular', 'Frequently asked questions', 'Häufige Fragen', 'Preguntas frecuentes', 'Частые вопросы')}</h2>
        {g.faq.map((f) => (
          <details key={f.q} className="vz-faq-i">
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
      <section>
        <h2>{l('Kaynaklar', 'Sources', 'Quellen', 'Fuentes', 'Источники')}</h2>
        <ul>{meta.sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}</ul>
        <p className="vz-muted" style={{ fontSize: 13 }}>{l('Kurallar değişebilir; seyahatten önce resmî kaynaktan teyit et.', 'Rules can change; confirm with the official source before you travel.', 'Regeln können sich ändern; prüfe vor der Reise die offizielle Quelle.', 'Las normas pueden cambiar; confírmalo en la fuente oficial antes de viajar.', 'Правила могут меняться; перед поездкой проверьте официальный источник.')}</p>
      </section>
    </div>
  );
};

/** Kişiye özel evrak listesi: durum + amaç seç, işaretle, yazdır. */
const Checklist: React.FC<{ c: GuideChecklist }> = ({ c }) => {
  const [st, setSt] = useState(c.statuses[0].id);
  const [pu, setPu] = useState(c.purposes[0].id);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const status = c.statuses.find((x) => x.id === st) || c.statuses[0];
  const purpose = c.purposes.find((x) => x.id === pu) || c.purposes[0];
  const groups: [string, string[]][] = [[c.commonTitle, c.common], [status.label, status.docs], [purpose.label, purpose.docs]];
  const total = groups.reduce((n, [, d]) => n + d.length, 0);
  const ticked = groups.reduce((n, [, d]) => n + d.filter((x) => done[x]).length, 0);
  return (
    <section className="vz-card vz-check">
      <h2>{c.title}</h2>
      <b className="vz-check-l">{c.statusLabel}</b>
      <Chips scroll>{c.statuses.map((x) => <Chip key={x.id} on={x.id === st} onClick={() => setSt(x.id)}>{x.label}</Chip>)}</Chips>
      <b className="vz-check-l">{c.purposeLabel}</b>
      <Chips scroll>{c.purposes.map((x) => <Chip key={x.id} on={x.id === pu} onClick={() => setPu(x.id)}>{x.label}</Chip>)}</Chips>
      <div className="vz-check-bar" aria-hidden="true"><i style={{ width: `${Math.round((ticked / total) * 100)}%` }} /></div>
      <span className="vz-muted" style={{ fontSize: 13 }}>{ticked} / {total}</span>
      {groups.map(([h, docs]) => (
        <div key={h}>
          <h3>{h}</h3>
          {docs.map((d) => (
            <label key={d} className="vz-check-i">
              <input type="checkbox" checked={!!done[d]} onChange={(e) => setDone({ ...done, [d]: e.target.checked })} />
              <span>{d}</span>
            </label>
          ))}
        </div>
      ))}
      <p className="vz-muted" style={{ fontSize: 13 }}>{c.note}</p>
      <Btn variant="soft" icon="doc" onClick={() => window.print()}>{c.print}</Btn>
    </section>
  );
};
