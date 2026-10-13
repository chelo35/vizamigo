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
  title, subtitle, passportLabel: _passportLabel, onPassportClick: _onPassportClick, mode, onModeChange, modeLabels,
  search, onSearchChange, searchLabel = 'Ülke ara', searchPlaceholder = 'Japonya, Tayland, Almanya…',
  statLabel, statValue,
}) => (
  <section aria-label={title} className="hero-card-container -mx-4 sm:mx-0 sm:rounded-[24px] overflow-hidden mb-4 h-auto">
    <div className="relative bg-gradient-to-br from-[#0C0F19] via-[#111625] to-[#161D30] px-5 sm:px-8 pt-6 sm:pt-7 pb-14 sm:pb-16 text-white rounded-t-[24px] h-auto">
      <div className="max-w-xl">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-[-0.02em] leading-tight text-white h-auto">
          {title}
        </h1>
        <p className="mt-2 text-xs sm:text-base text-slate-300 leading-[1.6] max-w-lg h-auto">
          {subtitle}
        </p>
      </div>
      
      {/* Curved decorative dashed route arc */}
      <svg className="pointer-events-none absolute right-3 top-6 sm:top-8 h-14 w-24 sm:h-24 sm:w-60 opacity-60 sm:opacity-100" viewBox="0 0 140 70" aria-hidden="true">
        <path className="vz-route" d="M6 62 C 40 4, 100 4, 134 30" fill="none" stroke="#52B2A7" strokeWidth="2" strokeDasharray="6 6" />
        <circle className="vz-dot" cx="134" cy="30" r="5" fill="#FF6B6B" />
      </svg>
    </div>

    {/* Floating Action & Filter Bar */}
    <div className="relative -mt-6 sm:-mt-8 mx-3 sm:mx-6 rounded-[24px] glass-card p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 h-auto shadow-md">
      {/* Mode Switcher Tabs (Horizontal Badge Slider) */}
      <div role="tablist" className="horizontal-badge-slider flex gap-1.5 rounded-full bg-slate-100/80 dark:bg-white/[0.04] border border-transparent dark:border-white/[0.08] p-1 shrink-0 overflow-x-auto">
        {(['all', 'where'] as const).map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            type="button"
            onClick={() => onModeChange(m)}
            className={`min-h-[40px] px-4 sm:px-5 rounded-full text-xs font-bold cursor-pointer transition-all whitespace-nowrap touch-target-min ${
              mode === m
                ? 'tab-chip-active'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {modeLabels[m]}
          </button>
        ))}
      </div>

      {/* Active filter badge if user typed in search bar */}
      {search && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2A8C82]/10 border border-[#2A8C82]/20 text-xs font-bold text-[#2A8C82] dark:text-[#52B2A7] shrink-0">
          <Search className="w-3.5 h-3.5 text-[#2A8C82] dark:text-[#52B2A7]" />
          <span className="truncate max-w-[160px]">"{search}"</span>
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
        <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-white/[0.06] h-auto">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
            {statLabel || 'Vizesiz veya kimlikle'}:
          </span>
          <span className="font-mono text-sm sm:text-base font-bold text-[#2A8C82] dark:text-[#52B2A7] px-3 py-1 rounded-full bg-[#2A8C82]/10 border border-[#2A8C82]/20">
            {statValue}
          </span>
        </div>
      )}
    </div>
  </section>
);
