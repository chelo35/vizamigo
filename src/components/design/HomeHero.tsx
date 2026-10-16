import React from 'react';
import { Search, Compass, Route, Calendar, ShieldAlert } from 'lucide-react';
import { TabKey } from '../Navigation';

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
  statLabel?: string;
  statValue?: number | string;
  onQuickNavigate?: (tab: TabKey) => void;
}

/** Mediterranean & Tropical Crystal Lagoon Hero + Floating Action Bar */
export const HomeHero: React.FC<Props> = ({
  title,
  subtitle,
  passportLabel: _passportLabel,
  onPassportClick: _onPassportClick,
  mode,
  onModeChange,
  modeLabels,
  search,
  onSearchChange,
  statLabel,
  statValue,
  onQuickNavigate
}) => (
  <section aria-label={title} className="hero-card-container -mx-4 sm:mx-0 sm:rounded-[28px] overflow-hidden mb-4 h-auto">
    <div className="relative bg-gradient-to-br from-[#06283D] via-[#0D9488] to-[#0284C7] dark:from-[#041421] dark:via-[#082B3E] dark:to-[#0D9488] px-5 sm:px-8 pt-6 sm:pt-7 pb-14 sm:pb-16 text-white rounded-t-[28px] h-auto overflow-hidden">
      {/* Subtle tropical lagoon sunbeam & wave glow */}
      <div className="pointer-events-none absolute -top-16 right-12 w-64 h-64 rounded-full bg-teal-300/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-16 left-1/3 w-72 h-40 rounded-full bg-emerald-300/15 blur-2xl" aria-hidden="true" />

      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[11px] font-extrabold tracking-wide text-teal-50 mb-2.5">
          <span>🌴</span>
          <span>VİZAMİGO AKILLI SEYAHAT & VİZE PANOSU · 2026</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-[-0.02em] leading-tight text-white h-auto">
          {title}
        </h1>
        <p className="mt-2 text-xs sm:text-base text-teal-50/95 leading-[1.6] max-w-xl h-auto font-medium">
          {subtitle}
        </p>
      </div>

      {/* Curved decorative flight route & palm breeze SVG */}
      <svg className="pointer-events-none absolute right-4 top-6 sm:top-8 h-16 w-28 sm:h-28 sm:w-64 opacity-80 sm:opacity-100" viewBox="0 0 160 80" aria-hidden="true">
        <path className="vz-route" d="M8 68 C 46 8, 112 8, 148 32" fill="none" stroke="#99F6E4" strokeWidth="2.2" strokeDasharray="5 5" />
        <circle className="vz-dot" cx="148" cy="32" r="5.5" fill="#34D399" />
        <circle cx="148" cy="32" r="10" fill="none" stroke="#34D399" strokeWidth="1.2" opacity="0.5" />
      </svg>
    </div>

    {/* Floating Action & Filter Bar */}
    <div className="relative -mt-6 sm:-mt-8 mx-3 sm:mx-6 rounded-[24px] bento-lagoon-card p-3 sm:p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 h-auto shadow-lg">
      {/* Mode Switcher Tabs */}
      <div role="tablist" className="horizontal-badge-slider flex flex-nowrap items-center gap-1.5 rounded-full bg-teal-500/10 dark:bg-white/[0.06] border border-teal-500/20 dark:border-white/[0.08] p-1 shrink-0 overflow-x-auto">
        {(['all', 'where'] as const).map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            type="button"
            onClick={() => onModeChange(m)}
            className={`shrink-0 min-h-[38px] px-3.5 sm:px-4 rounded-full text-xs font-extrabold cursor-pointer transition-all whitespace-nowrap ${
              mode === m
                ? 'bg-gradient-to-r from-[#0D9488] to-[#0EA5E9] text-white shadow-xs'
                : 'text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            {modeLabels[m]}
          </button>
        ))}
      </div>

      {/* 4 Quick Action Pills (Vizesiz keşfet, Rota planla, Gün say, Acil yardım) */}
      {onQuickNavigate && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => onModeChange('where')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold bg-emerald-500/15 text-emerald-900 dark:text-emerald-300 hover:bg-emerald-500/25 transition-all whitespace-nowrap cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Vizesiz Keşfet</span>
          </button>
          <button
            type="button"
            onClick={() => onQuickNavigate('plan')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold bg-sky-500/15 text-sky-900 dark:text-sky-300 hover:bg-sky-500/25 transition-all whitespace-nowrap cursor-pointer"
          >
            <Route className="w-3.5 h-3.5" />
            <span>Rota Planla</span>
          </button>
          <button
            type="button"
            onClick={() => onQuickNavigate('track')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold bg-teal-500/15 text-[#0F766E] dark:text-[#2DD4BF] hover:bg-teal-500/25 transition-all whitespace-nowrap cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Gün Sayacı</span>
          </button>
          <button
            type="button"
            onClick={() => onQuickNavigate('consular')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold bg-rose-500/15 text-rose-900 dark:text-rose-300 hover:bg-rose-500/25 transition-all whitespace-nowrap cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Acil Yardım</span>
          </button>
        </div>
      )}

      {/* Active filter badge if user typed in search bar */}
      {search && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-xs font-extrabold text-[#0F766E] dark:text-[#2DD4BF] shrink-0">
          <Search className="w-3.5 h-3.5" />
          <span className="truncate max-w-[140px]">"{search}"</span>
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="p-0.5 hover:text-rose-600 cursor-pointer font-bold text-sm ml-1"
            title="Aramayı Temizle"
          >
            ✕
          </button>
        </div>
      )}

      {/* Visa-free / ID counter on right */}
      {statValue !== undefined && (
        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-teal-500/15 dark:border-white/[0.06] h-auto">
          <span className="text-xs text-slate-700 dark:text-slate-300 font-bold whitespace-nowrap">
            {statLabel || 'Vizesiz veya kimlikle'}:
          </span>
          <span className="font-mono text-sm sm:text-base font-extrabold text-[#0F766E] dark:text-[#2DD4BF] px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/25">
            {statValue}
          </span>
        </div>
      )}
    </div>
  </section>
);
