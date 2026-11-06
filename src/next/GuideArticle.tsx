import React, { useState } from 'react';
import { useI18n } from '../data/i18n';
import { GUIDE_META, getGuide, guideGroups, sourceLabel, type GuideChecklist, type GuideId, type GuideListGroup } from '../data/guides';
import { getCountryName } from '../data/passportData';
import { buildLocalizedPath } from '../utils/seoRouter';
import { Flag } from './ui';
import type { SupportedLanguage } from '../i18n/types';
import { tpLinks } from '../data/tpPartners';
import { AdTag, Btn, Chip, Chips, List, Row } from './ui';
import { PartnerLogo } from './PartnerLogo';

type Pick = 'visahq' | 'insurance' | 'flights' | 'hotel' | 'esim' | 'transfer' | 'tours';
const VISA: Pick[] = ['insurance', 'visahq', 'flights', 'hotel'];
const PLAN_DEFAULT: { place: string; to?: string; picks: Pick[] } = { place: 'Paris', to: 'PAR', picks: ['flights', 'hotel', 'esim', 'insurance'] };
/** Rehberin konusuna göre "Yolculuğunu planla" bağlantıları (vize rehberlerinde başvuru yardımı ve sigorta önde) */
const PLAN: Partial<Record<GuideId, { place: string; to?: string; picks: Pick[] }>> = {
  schengen_documents: { place: 'Paris', to: 'PAR', picks: VISA },
  schengen_by_country: { place: 'Paris', to: 'PAR', picks: VISA },
  visa_fees: { place: 'Paris', to: 'PAR', picks: VISA },
  visa_appointments: { place: 'Paris', to: 'PAR', picks: VISA },
  us_visa: { place: 'New York', to: 'NYC', picks: VISA },
  uk_visa_india: { place: 'London', to: 'LON', picks: VISA },
  esta: { place: 'New York', to: 'NYC', picks: ['flights', 'hotel', 'insurance', 'esim'] },
  uk_eta: { place: 'London', to: 'LON', picks: ['flights', 'hotel', 'insurance', 'esim'] },
  etias: { place: 'Paris', to: 'PAR', picks: ['flights', 'hotel', 'insurance', 'esim'] },
  greek_islands_visa: { place: 'Rhodes, Greece', picks: ['hotel', 'tours', 'insurance', 'esim'] },
  dubai_visa_india: { place: 'Dubai', to: 'DXB', picks: ['hotel', 'flights', 'transfer', 'tours', 'esim', 'insurance'] },
  thailand_india: { place: 'Bangkok', to: 'BKK', picks: ['hotel', 'flights', 'esim', 'transfer', 'tours', 'insurance'] },
  visa_free_tr: { place: 'Bangkok', to: 'BKK', picks: ['flights', 'hotel', 'esim', 'insurance'] },
  visa_free_ru: { place: 'Bangkok', to: 'BKK', picks: ['flights', 'hotel', 'esim', 'insurance'] },
  schengen_india: { place: 'Paris', to: 'PAR', picks: VISA },
  schengen_latam: { place: 'Madrid', to: 'MAD', picks: ['flights', 'hotel', 'insurance', 'esim'] },
  canada_eta_mx: { place: 'Toronto', to: 'YTO', picks: ['flights', 'hotel', 'insurance', 'esim'] },
  japan_visa_india: { place: 'Tokyo', to: 'TYO', picks: ['flights', 'hotel', 'insurance', 'esim', 'tours'] },
  vietnam_visa_india: { place: 'Hanoi', to: 'HAN', picks: ['flights', 'hotel', 'esim', 'transfer', 'tours', 'insurance'] },
  egypt_visa_ru: { place: 'Hurghada', to: 'HRG', picks: ['hotel', 'flights', 'transfer', 'tours', 'esim', 'insurance'] },
  egypt_visa_de: { place: 'Hurghada', to: 'HRG', picks: ['hotel', 'flights', 'transfer', 'tours', 'esim', 'insurance'] },
  uae_ru: { place: 'Dubai', to: 'DXB', picks: ['hotel', 'flights', 'transfer', 'tours', 'esim', 'insurance'] },
  thailand_de: { place: 'Bangkok', to: 'BKK', picks: ['hotel', 'flights', 'esim', 'transfer', 'tours', 'insurance'] },
  turkey_id_de: { place: 'Antalya', to: 'AYT', picks: ['hotel', 'flights', 'transfer', 'tours', 'insurance'] },
  id_card_travel: { place: 'Tbilisi', to: 'TBS', picks: ['flights', 'hotel', 'esim', 'insurance'] }
};

/** Güncel konu rehberi: kısa cevap, bölümler, SSS, kaynaklar ve yolculuk bağlantıları. */
export const GuideArticle: React.FC<{ id: GuideId }> = ({ id }) => {
  const { l, language } = useI18n();
  const g = getGuide(id, language);
  const meta = GUIDE_META[id];
  const plan = PLAN[id] || PLAN_DEFAULT;
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
      {meta.list && <CountryGroups id={id} />}
      {g.sections.map((s) => (
        <section key={s.h}>
          <h2>{s.h}</h2>
          {s.p?.map((t) => <p key={t}>{t}</p>)}
          {s.list && <ul>{s.list.map((t) => <li key={t}>{t}</li>)}</ul>}
          {s.table && (
            <div className="vz-gtable">
              <table>
                <thead><tr>{s.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>{s.table.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
              </table>
            </div>
          )}
        </section>
      ))}
      <section>
        <h2>{l('Yolculuğunu planla', 'Plan your trip', 'Reise planen', 'Planea tu viaje', 'Спланируйте поездку')}</h2>
        <List>
          {plan.picks.map((k) => {
            if (k === 'visahq')
              return (
                <Row key={k} lead={<PartnerLogo url="https://www.visahq.com" name="VisaHQ" fallback="passport" />} title={<>{l('Başvurunu VisaHQ hazırlasın', 'Let VisaHQ handle your application', 'Antrag über VisaHQ', 'Tramita con VisaHQ', 'Оформить через VisaHQ')} <AdTag /></>} sub={l('Evrak kontrolü ve takip; hizmet bedeli vize ücretine eklenir', 'Document check and tracking; service fee on top of the visa fee', 'Dokumentenprüfung und Verfolgung; Servicegebühr zusätzlich', 'Revisión de documentos y seguimiento; tarifa de servicio adicional', 'Проверка документов и сопровождение; сервисный сбор сверх консульского')} href="https://vizamigo.visahq.net/" />
              );
            if (k === 'insurance')
              return (
                <React.Fragment key={k}>
                  <Row lead={<PartnerLogo id="safetywing" />} title={l('Seyahat sağlık sigortası', 'Travel medical insurance', 'Reisekrankenversicherung', 'Seguro médico de viaje', 'Медицинская страховка')} sub={l('SafetyWing · Schengen için en az 30.000 € teminat', 'SafetyWing', 'SafetyWing', 'SafetyWing', 'SafetyWing')} href={tpLinks.safetywing()} />
                  <Row lead={<PartnerLogo id="hellosafe" />} title={l('Sigortaları karşılaştır', 'Compare travel insurance', 'Versicherungen vergleichen', 'Comparar seguros', 'Сравнить страховки')} sub="HelloSafe" href={tpLinks.hellosafe()} />
                </React.Fragment>
              );
            if (k === 'flights') return <Row key={k} lead={<PartnerLogo id="aviasales" />} title={l('Uçuşlar', 'Flights', 'Flüge', 'Vuelos', 'Авиабилеты')} sub="Aviasales" href={tpLinks.flights(language === 'tr' ? 'IST' : undefined, plan.to)} />;
            if (k === 'hotel') return <Row key={k} lead={<PartnerLogo id="booking" />} title={l('Oteller', 'Hotels', 'Hotels', 'Hoteles', 'Отели')} sub="Booking.com" href={tpLinks.booking(plan.place)} />;
            if (k === 'esim') return <Row key={k} lead={<PartnerLogo id="nomad" />} title="eSIM" sub="Nomad eSIM" href={tpLinks.nomad()} />;
            if (k === 'transfer') return <Row key={k} lead={<PartnerLogo id="kiwitaxi" />} title={l('Havalimanı transferi', 'Airport transfer', 'Flughafentransfer', 'Traslado al aeropuerto', 'Трансфер из аэропорта')} sub="Kiwitaxi" href={tpLinks.kiwitaxi()} />;
            if (k === 'tours') return <Row key={k} lead={<PartnerLogo id="getyourguide" />} title={l('Turlar ve biletler', 'Tours and tickets', 'Touren und Tickets', 'Tours y entradas', 'Экскурсии и билеты')} sub="GetYourGuide" href={tpLinks.tours(plan.place)} />;
            return null;
          })}
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
        <ul>{meta.sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{sourceLabel(s.label, language)}</a></li>)}</ul>
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

/** Liste rehberi: canlı vize verisinden ülke grupları; her ülke kendi sayfasına bağlanır. */
const CountryGroups: React.FC<{ id: GuideId }> = ({ id }) => {
  const { l, language } = useI18n();
  const gr = guideGroups(id, language);
  if (!gr) return null;
  const title: Record<GuideListGroup, string> = {
    id: l('Kimlikle gidilebilen ülkeler', 'ID card accepted', 'Mit Personalausweis', 'Con DNI', 'По ID-карте'),
    free: l('Vizesiz ülkeler', 'Visa-free countries', 'Visumfreie Länder', 'Países sin visado', 'Без визы'),
    voa: l('Kapıda vize', 'Visa on arrival', 'Visum bei Ankunft', 'Visado a la llegada', 'Виза по прилёте'),
    evisa: l('E-vize (önceden çevrim içi)', 'eVisa (apply online first)', 'eVisum (vorab online)', 'eVisa (en línea antes)', 'Электронная виза'),
    eta: l('Elektronik izin (ETA)', 'Travel authorisation (ETA)', 'Reisegenehmigung (ETA)', 'Autorización (ETA)', 'Разрешение ETA')
  };
  const dayTxt = (v: string) => (/^\d+$/.test(v) ? l(`${v} gün`, `${v} days`, `${v} Tage`, `${v} días`, `${v} дн.`) : '');
  const lang = language as SupportedLanguage;
  return (
    <>
      {(GUIDE_META[id].list!.groups).map((k) =>
        gr[k].length ? (
          <section key={k}>
            <h2>{title[k]} ({gr[k].length})</h2>
            <ul className="vz-glist">
              {gr[k].map(([c, v]) => (
                <li key={c}>
                  <a href={buildLocalizedPath(lang, 'explore', c)}>
                    <Flag code={c} size="sm" />
                    <span>{getCountryName(c, language)}</span>
                    {dayTxt(v) && <em>{dayTxt(v)}</em>}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null
      )}
    </>
  );
};
