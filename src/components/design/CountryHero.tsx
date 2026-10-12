import React from 'react';
import { StatusBadge, VisaStatus } from './StatusBadge';

interface Props {
  name: string;
  status: VisaStatus;
  statusLabel: string;
  stayDays?: number | string;
  stayCaption: string;
  onBack?: () => void;
}

/** Teal status band + title for the country dossier (top of CountryDossierModal). */
export const CountryHero: React.FC<Props> = ({ name, status, statusLabel, stayDays, stayCaption, onBack }) => (
  <header className="bg-slate-900 px-4 pb-4 pt-4 text-white">
    <div className="flex items-center gap-3">
      {onBack && (
        <button type="button" aria-label="Geri" onClick={onBack} className="h-11 w-11 rounded-xl border border-slate-600 text-lg cursor-pointer">
          ‹
        </button>
      )}
      <h2 className="text-lg font-extrabold">{name}</h2>
    </div>
    <div className="mt-4 rounded-2xl bg-teal-600 p-4">
      <StatusBadge status={status} label={statusLabel} className="!bg-white !text-emerald-800" />
      {stayDays !== undefined && <div className="mt-2 font-mono text-3xl font-bold">{stayDays}</div>}
      <div className="text-xs text-teal-50">{stayCaption}</div>
    </div>
  </header>
);
