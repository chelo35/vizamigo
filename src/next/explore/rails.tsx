import React, { useMemo } from 'react';
import { useI18n } from '../../data/i18n';
import { getPassportItems } from '../../utils/calculator';
import { CountryItem } from '../../data/passportData';
import { VISA_CHANGE_ALERTS } from '../../data/changeLog';
import { CountryCard } from '../country';
import { Btn, SecHead } from '../ui';
import { Icon } from '../Icon';

// Gezginlerin en çok baktığı yerler önce gelsin
const POPULAR = ['GE', 'RS', 'BA', 'ME', 'AL', 'MK', 'TH', 'MY', 'JP', 'KR', 'SG', 'ID', 'BR', 'MX', 'AR', 'CO', 'MA', 'TN', 'QA', 'AZ', 'JO', 'PH', 'ZA', 'EC', 'PE', 'CL', 'EG', 'IN', 'LK', 'VN', 'KH', 'KE', 'TZ', 'MV', 'NP', 'AU', 'US', 'GB', 'CA', 'NZ', 'IT', 'FR', 'ES', 'GR', 'PT', 'NL', 'DE', 'AE', 'CU', 'DO'];

const isFree = (it?: CountryItem) => !!it && (!!it.id || it.cat === 'free');
const isEasy = (it?: CountryItem) => !!it && (it.cat === 'evisa' || it.cat === 'eta' || it.cat === 'voa');

const Rail: React.FC<{ id: string; eyebrow: string; title: string; codes: string[]; items: Map<string, CountryItem>; onOpenCountry: (c: string) => void; onMore: () => void; more: string }> = ({ id, eyebrow, title, codes, items, onOpenCountry, onMore, more }) =>
  codes.length === 0 ? null : (
    <section className="vz-home-sec" aria-labelledby={id}>
      <div className="vz-sechead">
        <div>
          <span className="vz-eyebrow">{eyebrow}</span>
          <h2 id={id}>{title}</h2>
        </div>
        <Btn variant="ghost" small onClick={onMore}>{more}</Btn>
      </div>
      <div className="vz-rail">
        {codes.map((c) => (
          <CountryCard key={c} code={c} item={items.get(c)} onOpen={onOpenCountry} />
        ))}
      </div>
    </section>
  );

/** Ana sayfa: fotoğraflı ülke şeritleri ve kural değişikliği bandı. */
export const HomeRails: React.FC<{ passport: string; onOpenCountry: (c: string) => void; onOpenTile: (id: string) => void }> = ({ passport, onOpenCountry, onOpenTile }) => {
  const { l, language } = useI18n();
  const items = useMemo(() => new Map(getPassportItems(passport).map((x) => [x.c, x])), [passport]);
  const order = (pred: (it?: CountryItem) => boolean) => {
    const top = POPULAR.filter((c) => c !== passport && pred(items.get(c)));
    const rest = Array.from(items.values()).filter((it) => it.c !== passport && pred(it) && !top.includes(it.c)).map((it) => it.c);
    return [...top, ...rest].slice(0, 10);
  };
  const free = useMemo(() => order(isFree), [items]); // eslint-disable-line react-hooks/exhaustive-deps
  const easy = useMemo(() => order(isEasy), [items]); // eslint-disable-line react-hooks/exhaustive-deps
  const pick = <T,>(tr: T, en?: T, de?: T): T => (language === 'tr' ? tr : language === 'de' ? de ?? en ?? tr : en ?? tr);
  const alerts = VISA_CHANGE_ALERTS.filter((a) => a.impactPassport.length === 0 || a.impactPassport.includes(passport)).slice(0, 3);
  const more = l('Tümünü gör', 'See all', 'Alle ansehen', 'Ver todo', 'Смотреть все');

  return (
    <>
      {alerts.length > 0 && (
        <section className="vz-alerts" aria-labelledby="vz-h-changes">
          <div className="vz-alerts-head">
            <span className="vz-ic"><Icon name="bell" size={20} /></span>
            <h2 id="vz-h-changes">{l('Pasaportunu etkileyen son değişiklikler', 'Latest changes for your passport', 'Neueste Änderungen für deinen Pass', 'Últimos cambios para tu pasaporte', 'Последние изменения для вашего паспорта')}</h2>
            <Btn variant="ghost" small onClick={() => onOpenTile('changes')}>{more}</Btn>
          </div>
          <div className="vz-alerts-list">
            {alerts.map((a) => (
              <button key={a.id} type="button" className={`vz-alerts-item ${a.category}`} onClick={() => onOpenCountry(a.countryCode)}>
                <span className="vz-alerts-date">{pick(a.effectiveDate, a.effectiveDateEn, a.effectiveDateDe)}</span>
                <b>{pick(a.countryName, a.countryNameEn, a.countryNameDe)}</b>
                <span>{pick(a.title, a.titleEn, a.titleDe)}</span>
              </button>
            ))}
          </div>
        </section>
      )}
      <Rail
        id="vz-h-free"
        eyebrow={l('Vize derdi yok', 'No visa hassle', 'Ohne Visum', 'Sin visado', 'Без визы')}
        title={l('Vizesiz gidebileceğin yerler', 'Places you can go visa-free', 'Visumfreie Ziele', 'Destinos sin visado', 'Куда можно без визы')}
        codes={free}
        items={items}
        onOpenCountry={onOpenCountry}
        onMore={() => onOpenTile('where')}
        more={more}
      />
      <Rail
        id="vz-h-easy"
        eyebrow={l('Birkaç tıkla', 'A few clicks away', 'Mit wenigen Klicks', 'A pocos clics', 'В пару кликов')}
        title={l('E-vize ya da kapıda vizeyle', 'With an eVisa or visa on arrival', 'Mit eVisum oder bei Ankunft', 'Con eVisa o a la llegada', 'По eVisa или по прилёте')}
        codes={easy}
        items={items}
        onOpenCountry={onOpenCountry}
        onMore={() => onOpenTile('where')}
        more={more}
      />
    </>
  );
};
