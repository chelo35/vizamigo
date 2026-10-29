import React from 'react';
import { useI18n } from '../data/i18n';
import { GUIDE_META, getGuide, type GuideId } from '../data/guides';
import { tpLinks } from '../data/tpPartners';
import { List, Row } from './ui';
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
