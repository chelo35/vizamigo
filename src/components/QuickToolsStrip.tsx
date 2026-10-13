import React from 'react';
import { Luggage, Coins, Timer, Map as MapIcon, Clock, CloudSun, ArrowRightLeft } from 'lucide-react';
import { useI18n } from '../data/i18n';

export type RadarMode = 'all' | 'clock' | 'weather' | 'currency';

export interface QuickToolHandlers {
  onOpenPackingList?: () => void;
  onOpenTippingCalc?: () => void;
  onOpenTimezoneOverlap?: () => void;
  onOpenGlobalRadar?: (mode?: RadarMode, city?: string) => void;
}

interface QuickTool {
  id: string;
  icon: React.ElementType;
  label: string;
  accent: string;
  onClick?: () => void;
}

export function useQuickTools(h: QuickToolHandlers): QuickTool[] {
  const { l } = useI18n();
  return [
    { id: 'map', icon: MapIcon, label: l('Dünya Haritası', 'World Map', 'Weltkarte', 'Mapa', 'Карта'), accent: 'from-cyan-500 to-teal-500', onClick: () => h.onOpenGlobalRadar?.('all') },
    { id: 'clock', icon: Clock, label: l('Saatler', 'Clocks', 'Uhren', 'Relojes', 'Время'), accent: 'from-sky-500 to-indigo-500', onClick: () => h.onOpenGlobalRadar?.('clock') },
    { id: 'weather', icon: CloudSun, label: l('Hava', 'Weather', 'Wetter', 'Clima', 'Погода'), accent: 'from-amber-500 to-orange-500', onClick: () => h.onOpenGlobalRadar?.('weather') },
    { id: 'fx', icon: ArrowRightLeft, label: l('Döviz', 'FX', 'Devisen', 'Divisas', 'Валюта'), accent: 'from-emerald-500 to-teal-500', onClick: () => h.onOpenGlobalRadar?.('currency') },
    { id: 'packing', icon: Luggage, label: l('Bavul', 'Packing', 'Packliste', 'Equipaje', 'Багаж'), accent: 'from-teal-500 to-emerald-500', onClick: h.onOpenPackingList },
    { id: 'tipping', icon: Coins, label: l('Bahşiş', 'Tipping', 'Trinkgeld', 'Propinas', 'Чаевые'), accent: 'from-yellow-500 to-amber-500', onClick: h.onOpenTippingCalc },
    { id: 'tz', icon: Timer, label: l('Saat Farkı', 'Time Diff', 'Zeitzonen', 'Husos', 'Пояса'), accent: 'from-violet-500 to-indigo-500', onClick: h.onOpenTimezoneOverlap }
  ];
}

/** Prominent, always-visible quick tools strip (scrolls horizontally on mobile). */
export const QuickToolsStrip: React.FC<QuickToolHandlers & { className?: string }> = ({ className = '', ...handlers }) => {
  const tools = useQuickTools(handlers);
  const { l } = useI18n();
  return (
    <div className={`w-full border-t border-slate-200/70 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] ${className}`}>
      <div
        className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none lg:justify-center"
        role="toolbar"
        aria-label={l('Hızlı seyahat araçları', 'Quick travel tools', 'Reise-Tools', 'Herramientas', 'Инструменты')}
      >
        <span className="hidden md:inline text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mr-1 shrink-0">
          {l('Araçlar', 'Tools', 'Tools', 'Herramientas', 'Инструменты')}
        </span>
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              id={`quick-tool-${tool.id}`}
              type="button"
              onClick={tool.onClick}
              className="group shrink-0 flex items-center gap-1.5 pl-1 pr-3 py-1 rounded-full bg-white dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 hover:border-teal-500/50 hover:shadow-sm hover:-translate-y-px active:translate-y-0 transition-all cursor-pointer"
            >
              <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${tool.accent} text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}>
                <Icon className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap">{tool.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
