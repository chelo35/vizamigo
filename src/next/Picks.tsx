import React from 'react';
import { useI18n } from '../data/i18n';
import { PartnerLogo } from './PartnerLogo';
import { AdTag } from './ui';
import { TP, type TpId } from '../data/tpPartners';

export type PickItem = { id: string; url: string; blocked?: boolean };

/** Aynı hizmeti veren firmalar arasından seçim (logolu küçük düğmeler) */
export const Picks: React.FC<{ label: string; items: PickItem[]; k: string }> = ({ label, items, k }) => {
  const { l } = useI18n();
  return (
    <div className="vz-trip-pick">
      <span className="vz-muted">{label} <AdTag /></span>
      <div>
        {items.map((p) => (
          <a key={`${k}-${p.id}-${p.url}`} href={p.url} target="_blank" rel="noopener noreferrer sponsored" className={p.blocked ? 'off' : undefined} title={p.blocked ? l('Türkiye\'den erişim engelli', 'Blocked in Türkiye', 'In der Türkei gesperrt', 'Bloqueado en Turquía', 'Заблокирован в Турции') : undefined}>
            <PartnerLogo id={p.id} size={18} />
            <span>{TP[p.id as TpId].name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

