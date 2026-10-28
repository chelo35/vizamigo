import React, { useState } from 'react';
import { TP, tpLogo, tpIdFromUrl, type TpId } from '../data/tpPartners';
import { Icon, type IconName } from './Icon';

const hostOf = (url?: string) => {
  if (!url) return '';
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};

/**
 * Markanın kendi logosu (sitesinin simgesi). Travelpayouts ortağıysa kayıtlı alan adını,
 * değilse bağlantının alan adını kullanır; yüklenemezse verilen simgeye düşer.
 */
export const PartnerLogo: React.FC<{ id?: string; url?: string; size?: number; fallback?: IconName; name?: string }> = ({ id, url, size = 28, fallback = 'handshake', name }) => {
  const [bad, setBad] = useState(false);
  const tid = (id && id in TP ? (id as TpId) : undefined) || tpIdFromUrl(url);
  const host = tid ? TP[tid].domain : hostOf(url);
  if (!host || bad) {
    return (
      <span className="vz-ic sm">
        <Icon name={fallback} size={18} />
      </span>
    );
  }
  const src = tid ? tpLogo(tid) : `https://www.google.com/s2/favicons?domain=${host}&sz=64`;
  const label = name || (tid ? TP[tid].name : host);
  return (
    <span className="vz-plogo" style={{ width: size, height: size }} title={label}>
      <img src={src} alt={label} width={Math.round(size * 0.68)} height={Math.round(size * 0.68)} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={() => setBad(true)} />
    </span>
  );
};
