import React from 'react';
import { useI18n } from '../data/i18n';
import { CountryItem, getCountryName, countryToRegion, getRegionName } from '../data/passportData';
import { getCountryVisual, getOptimizedImageUrl } from '../data/countryVisuals';
import { Flag, VisaBadge } from './ui';

export const stayDays = (it?: CountryItem | null): number | null => {
  if (!it) return null;
  const n = parseInt(it.v, 10);
  return Number.isFinite(n) && n > 0 ? n : null;
};

export const countryImg = (code: string, width = 480) => {
  const v = getCountryVisual(code);
  return getOptimizedImageUrl(v.image, { width });
};

/** Fotoğraflı ülke kartı (Booking tarzı): görsel, vize rozeti, ad, bölge/kalış. */
export const CountryCard: React.FC<{ code: string; item?: CountryItem | null; sub?: string; onOpen: (code: string) => void }> = ({ code, item, sub, onOpen }) => {
  const { language, l } = useI18n();
  const d = stayDays(item);
  const visual = getCountryVisual(code, language);
  return (
    <button type="button" className="vz-ccard" onClick={() => onOpen(code)}>
      <span className="vz-ccard-img">
        <img src={getOptimizedImageUrl(visual.image, { width: 360 })} alt={visual.landmark || getCountryName(code, language)} loading="lazy" decoding="async" width={360} height={270} />
        <VisaBadge item={item} />
      </span>
      <span className="vz-ccard-b">
        <span className="vz-ccard-t">
          <Flag code={code} size="sm" />
          <span>{getCountryName(code, language)}</span>
        </span>
        <span className="vz-ccard-s">
          {sub || [getRegionName(countryToRegion[code] || '', language), d ? l(`${d} gün`, `${d} days`, `${d} Tage`, `${d} días`, `${d} дн.`) : ''].filter(Boolean).join(' · ')}
        </span>
      </span>
    </button>
  );
};
