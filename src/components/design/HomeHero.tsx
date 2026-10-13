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

/** Dark hero + overlapping search/filter bar (Unified desktop header search). */
export const HomeHero: React.FC<Props> = ({
  title, subtitle, passportLabel, onPassportClick, mode, onModeChange, modeLabels,
  search, onSearchChange, searchLabel = 'Ülke ara', searchPlaceholder = 'Japonya, Tayland, Almanya…',
  statLabel, statValue,
}) => (
  <section aria-label={title} className="-mx-4 sm:mx-0 sm:rounded-[24px] overflow-hidden mb-4">
    <div className="relative bg-gradient-to-br from-[#0C0F19] via-[#111625] to-[#161D30] px-6 sm:px-8 pt-7 pb-22 sm:pb-26 text-white rounded-t-[24px]">
      {/* Mobile Top Brand Row (hidden on desktop because main Header contains it) */}
      <div className="lg:hidden flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Vizamigo" className="w-8 h-8 object-contain rounded-full shadow-xs" />
          <span className="text-xl font-bold tracking-[-0.02em]">Vizamigo<span className="text-[#52B2A7]">.</span></span>
        </div>
        <button
          type="button"
          onClick={onPassportClick}
          className="min-h-[40px] rounded-full bg-[#2A8C82] px-4 text-[13px] font-bold text-white cursor-pointer"
        >
          {passportLabel}
        </button>
      </div>

      <h1 className="mt-4 lg:mt-2 max-w-[18rem] text-[26px] font-bold tracking-[-0.02em] leading-tight sm:max-w-xl sm:text-4xl">{title}</h1>
      <p className="mt-2 max-w-[17rem] text-[13px] text-slate-300 leading-[1.6] sm:max-w-md sm:text-base">{subtitle}</p>
      
      {/* Curved decorative dashed route arc */}
      <svg className="pointer-events-none absolute right-4 top-16 sm:top-20 h-16 w-28 sm:h-28 sm:w-72" viewBox="0 0 140 70" aria-hidden="true">
        <path className="vz-route" d="M6 62 C 40 4, 100 4, 134 30" fill="none" stroke="#52B2A7" strokeWidth="2" strokeDasharray="6 6" />
        <circle className="vz-dot" cx="134" cy="30" r="5" fill="#FF6B6B" />
      </svg>
    </div>

    {/* Floating Action & Filter Bar */}
    <div className="relative -mt-12 sm:-mt-14 mx-4 sm:mx-6 rounded-[24px] glass-card p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5 lg:gap-4">
      {/* Mode Switcher Tabs */}
      <div role="tablist" className="flex gap-1.5 rounded-full bg-slate-100/80 dark:bg-white/[0.04] border border-transparent dark:border-white/[0.08] p-1 lg:w-auto shrink-0">
        {(['all', 'where'] as const).map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            type="button"
            onClick={() => onModeChange(m)}
            className={`min-h-[40px] px-5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap ${
              mode === m
                ? 'tab-chip-active'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {modeLabels[m]}
          </button>
        ))}
      </div>

      {/* Search Input Box: strictly mobile only (lg:hidden) */}
      <label className="lg:hidden flex-1 flex items-center gap-2.5 rounded-[20px] border border-slate-200/80 dark:border-white/[0.08] px-4 py-2 focus-within:border-[#2A8C82] focus-within:ring-2 focus-within:ring-[#2A8C82]/20 transition-all bg-slate-50/70 dark:bg-white/[0.04]">
        <Search className="h-4 w-4 text-slate-400 shrink-0" aria-hidden="true" />
        <span className="sr-only">{searchLabel}</span>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full bg-transparent py-1 text-xs sm:text-sm font-semibold text-slate-900 outline-none dark:text-white placeholder:text-slate-400"
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

      {/* On desktop: Active filter badge if user typed in top search bar */}
      {search && (
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A8C82]/10 border border-[#2A8C82]/20 text-xs font-bold text-[#2A8C82] dark:text-[#52B2A7]">
          <Search className="w-3.5 h-3.5 text-[#2A8C82] dark:text-[#52B2A7]" />
          <span>Filtre: "{search}"</span>
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="p-0.5 hover:text-[#FF6B6B] cursor-pointer font-bold text-sm ml-1"
            title="Aramayı Temizle"
          >
            ✕
          </button>
        </div>
      )}

      {/* Visa-free / ID counter on right */}
      {statValue !== undefined && (
        <div className="flex items-center justify-between lg:justify-end gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-white/[0.06]">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
            {statLabel || 'Vizesiz veya kimlikle'}:
          </span>
          <span className="font-mono text-base lg:text-lg font-bold text-[#2A8C82] dark:text-[#52B2A7] px-3.5 py-1 rounded-full bg-[#2A8C82]/10 border border-[#2A8C82]/20">
            {statValue}
          </span>
        </div>
      )}
    </div>
  </section>
);
