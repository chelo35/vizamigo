import React from 'react';

interface Props {
  used: number;
  total?: number;
  remainingLabel: string;
  resetLabel: string;
  resetValue: string;
}

/** Animated ring for the Schengen 90/180 counter. Pure presentation: feed it numbers from DayCounterTab. */
export const SchengenGauge: React.FC<Props> = ({ used, total = 90, remainingLabel, resetLabel, resetValue }) => {
  const C = 2 * Math.PI * 42;
  const pct = Math.min(Math.max(used / total, 0), 1);
  const remaining = Math.max(total - used, 0);
  const danger = pct >= 0.9;
  return (
    <div className="flex flex-col items-center rounded-3xl bg-white dark:bg-[#111625] border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-900/5 p-6">
      <div className="relative h-44 w-44">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" role="img" aria-label={`${used} / ${total}`}>
          <circle cx="50" cy="50" r="42" fill="none" strokeWidth="10" className="stroke-slate-200 dark:stroke-white/10" />
          <circle
            cx="50" cy="50" r="42" fill="none" strokeWidth="10" strokeLinecap="round"
            stroke={danger ? '#DC2626' : '#0D9488'}
            strokeDasharray={C}
            strokeDashoffset={C * (1 - pct)}
            className="vz-ring"
            style={{ ['--vz-ring-from' as string]: C }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-4xl font-bold text-slate-900 dark:text-white">{used}</span>
          <span className="text-xs text-slate-600 dark:text-slate-300">/ {total}</span>
        </div>
      </div>
      <div className="mt-3 grid w-full grid-cols-2 gap-2 text-center">
        <div>
          <div className="text-xs text-slate-600 dark:text-slate-300">{remainingLabel}</div>
          <div className={`font-mono text-lg font-bold ${danger ? 'text-red-600' : 'text-emerald-600'}`}>{remaining}</div>
        </div>
        <div>
          <div className="text-xs text-slate-600 dark:text-slate-300">{resetLabel}</div>
          <div className="font-mono text-lg font-bold text-slate-900 dark:text-white">{resetValue}</div>
        </div>
      </div>
    </div>
  );
};
