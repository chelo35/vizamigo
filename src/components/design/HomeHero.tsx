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
    <div className="relative bg-slate-900 px-5 pt-6 pb-20 sm:pb-24 text-white">
      {/* Mobile Top Brand Row (hidden on desktop because main Header contains it) */}
      <div className="lg:hidden flex items-center justify-between gap-3">
        <span className="text-xl font-extrabold tracking-tight">Vizamigo<span className="text-teal-400">.</span></span>
        <button
          type="button"
          onClick={onPassportClick}
          className="min-h-[44px] rounded-full bg-teal-600 px-4 text-[13px] font-semibold text-white cursor-pointer"
        >
          {passportLabel}
        </button>
      </div>

      <h1 className="mt-4 lg:mt-2 max-w-[18rem] text-[26px] font-extrabold leading-tight sm:max-w-xl sm:text-4xl">{title}</h1>
      <p className="mt-2 max-w-[17rem] text-[13px] text-slate-300 sm:max-w-md sm:text-base">{subtitle}</p>
      
      {/* Curved decorative dashed route arc (Mockup 'Masaüstü') */}
      <svg className="pointer-events-none absolute right-4 top-16 sm:top-20 h-16 w-28 sm:h-28 sm:w-72" viewBox="0 0 140 70" aria-hidden="true">
        <path className="vz-route" d="M6 62 C 40 4, 100 4, 134 30" fill="none" stroke="#14B8A6" strokeWidth="2" strokeDasharray="6 6" />
        <circle className="vz-dot" cx="134" cy="30" r="5" fill="#14B8A6" />
      </svg>
    </div>

    {/* Floating Search & Filter Bar (Single Horizontal Row on Desktop, Matching Mockup) */}
    <div className="relative -mt-12 sm:-mt-14 mx-4 sm:mx-6 rounded-2xl bg-white p-3 sm:p-4 shadow-xl shadow-slate-900/15 dark:bg-slate-850 border border-slate-100 dark:border-white/10 lg:flex lg:items-center lg:gap-4">
      {/* Mode Switcher Tabs */}
      <div role="tablist" className="flex gap-1.5 rounded-xl bg-slate-100 dark:bg-white/10 p-1 lg:w-auto shrink-0">
        {(['all', 'where'] as const).map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            type="button"
            onClick={() => onModeChange(m)}
            className={`min-h-[40px] px-4 rounded-lg text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
              mode === m
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {modeLabels[m]}
          </button>
        ))}
      </div>

      {/* Search Input Box */}
      <label className="mt-2.5 lg:mt-0 flex-1 flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-white/15 px-3.5 py-1.5 focus-within:border-teal-500 dark:focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-500/20 transition-all bg-slate-50/50 dark:bg-white/[0.03]">
        <Search className="h-4 w-4 text-slate-400 shrink-0" aria-hidden="true" />
        <span className="sr-only">{searchLabel}</span>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full bg-transparent py-1.5 text-xs sm:text-sm font-semibold text-slate-900 outline-none dark:text-white placeholder:text-slate-400"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-1"
          >
            ✕
          </button>
        )}
      </label>

      {/* Visa-free / ID counter on right (Mockup '[XX]' counter) */}
      {statValue !== undefined && (
        <div className="mt-3 lg:mt-0 flex items-center justify-between lg:justify-end gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-white/5">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
            {statLabel || 'Vizesiz veya kimlikle'}:
          </span>
          <span className="font-mono text-base lg:text-lg font-black text-teal-600 dark:text-teal-400 px-2.5 py-0.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/60 shadow-2xs">
            {statValue}
          </span>
        </div>
      )}
    </div>
  </section>
);
