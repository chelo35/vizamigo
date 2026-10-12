import React from 'react';

export type VisaStatus = 'free' | 'id' | 'evisa' | 'voa' | 'visa' | 'denied';

const STYLES: Record<VisaStatus, string> = {
  free: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300',
  id: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300',
  evisa: 'bg-teal-100 text-teal-800 dark:bg-teal-500/15 dark:text-teal-300',
  voa: 'bg-teal-100 text-teal-800 dark:bg-teal-500/15 dark:text-teal-300',
  visa: 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
  denied: 'bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300',
};

interface Props {
  status: VisaStatus;
  label: string;
  className?: string;
}

/** Colour-coded visa status pill used in country rows and the country hero. */
export const StatusBadge: React.FC<Props> = ({ status, label, className = '' }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ${STYLES[status]} ${className}`}>
    {label}
  </span>
);
