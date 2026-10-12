import React from 'react';
import { Search } from 'lucide-react';

interface Props {
  title: string;
  subtitle: string;
  passportLabel: string;
  onPassportClick: () => void;
  mode: 'all' | 'where';
  onModeChange: (m: 'all' | 'where') => void;
  modeLabels: { all: string; where: string };
  search: string;
  onSearchChange: (v: string) => void;
  searchLabel?: string;
  searchPlaceholder?: string;
  /** Optional big counter inside the search card, e.g. visa-free country count. */
  statLabel?: string;
  statValue?: number | string;
}

/** Dark hero + overlapping white search card (Booking / Skyscanner pattern). Mobile first. */
export const HomeHero: React.FC<Props> = ({
  title, subtitle, passportLabel, onPassportClick, mode, onModeChange, modeLabels,
  search, onSearchChange, searchLabel = 'Ülke ara', searchPlaceholder = 'Japonya, Tayland, Almanya…',
  statLabel, statValue,
}) => (
  <section aria-label={title} className="-mx-4 sm:mx-0 sm:rounded-3xl overflow-hidden">
    <div className="relative bg-slate-900 px-5 pt-6 pb-24 text-white">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xl font-extrabold tracking-tight">Vizamigo<span className="text-teal-400">.</span></span>
        <button
          type="button"
          onClick={onPassportClick}
          className="min-h-[44px] rounded-full bg-teal-600 px-4 text-[13px] font-semibold text-white cursor-pointer"
        >
          {passportLabel}
        </button>
      </div>
      <h1 className="mt-6 max-w-[16rem] text-[26px] font-extrabold leading-tight sm:max-w-xl sm:text-4xl">{title}</h1>
      <p className="mt-2 max-w-[15rem] text-[13px] text-slate-300 sm:max-w-md sm:text-base">{subtitle}</p>
      <svg className="pointer-events-none absolute right-4 top-24 h-16 w-28 sm:h-28 sm:w-72" viewBox="0 0 140 70" aria-hidden="true">
        <path className="vz-route" d="M6 62 C 40 4, 100 4, 134 30" fill="none" stroke="#14B8A6" strokeWidth="2" strokeDasharray="6 6" />
        <circle className="vz-dot" cx="134" cy="30" r="5" fill="#14B8A6" />
      </svg>
    </div>

    <div className="relative -mt-16 mx-4 rounded-2xl bg-white p-3.5 shadow-xl shadow-slate-900/15 dark:bg-slate-850 sm:mx-6">
      <div role="tablist" className="flex gap-1.5 rounded-2xl bg-slate-200 p-1 dark:bg-white/10">
        {(['all', 'where'] as const).map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            type="button"
            onClick={() => onModeChange(m)}
            className={`min-h-[44px] flex-1 rounded-xl text-[13px] font-bold cursor-pointer transition-colors ${
              mode === m ? 'bg-teal-600 text-white' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            {modeLabels[m]}
          </button>
        ))}
      </div>

      <label className="mt-2.5 flex items-center gap-2 rounded-xl border border-slate-300 px-3.5 py-2 dark:border-white/15">
        <Search className="h-4 w-4 text-slate-500" aria-hidden="true" />
        <span className="sr-only">{searchLabel}</span>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full bg-transparent py-1 text-base font-semibold text-slate-900 outline-none dark:text-white"
        />
      </label>

      {statValue !== undefined && (
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[13px] text-slate-600 dark:text-slate-300">{statLabel}</span>
          <span className="font-mono text-2xl font-bold text-emerald-600 dark:text-emerald-400">{statValue}</span>
        </div>
      )}
    </div>
  </section>
);
