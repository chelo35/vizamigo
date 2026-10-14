import React from 'react';
import {
  Compass,
  Route,
  Calendar,
  User,
  ShieldAlert,
  ArrowRightLeft,
  PhoneCall,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { useI18n } from '../data/i18n';
import { getFlag, getCountryName } from '../data/passportData';
import { useQuickTools, QuickToolHandlers } from './QuickToolsStrip';

export type TabKey = 'explore' | 'plan' | 'track' | 'nomad' | 'profile' | 'consular';

interface NavigationProps extends QuickToolHandlers {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  currentPassport: string;
  onOpenPassportSelector: () => void;
  onOpenAuditConsole?: () => void;
  isMobileDrawerOpen?: boolean;
  onToggleMobileDrawer?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  currentPassport,
  onOpenPassportSelector,
  onOpenAuditConsole,
  isMobileDrawerOpen = false,
  onToggleMobileDrawer,
  onOpenPackingList,
  onOpenTippingCalc,
  onOpenTimezoneOverlap,
  onOpenGlobalRadar
}) => {
  const { language, l, t } = useI18n();
  const quickTools = useQuickTools({ onOpenPackingList, onOpenTippingCalc, onOpenTimezoneOverlap, onOpenGlobalRadar });

  const navItems = [
    {
      key: 'explore' as TabKey,
      label: l('Keşfet & Vize', 'Explore Visas', 'Visa Entdecken', 'Explorar y Visados', 'Визы и Страны'),
      shortLabel: t.navExplore,
      icon: Compass,
      tag: '199'
    },
    {
      key: 'plan' as TabKey,
      label: l('Rota & Sinerji', 'Plan & Synergy', 'Routenplaner', 'Ruta y Sinergia', 'Маршруты'),
      shortLabel: t.navPlan,
      icon: Route
    },
    {
      key: 'track' as TabKey,
      label: l('Gün & Kalış Sayacı', 'Stay & Day Tracker', 'Tage- & Aufenthaltstracker', 'Control de Estancia y Días', 'Счетчик Дней и Пребывания'),
      shortLabel: l('Gün Sayacı', 'Tracker', 'Tage-Tracker', 'Estancia', 'Дни'),
      icon: Calendar
    },
    {
      key: 'nomad' as TabKey,
      label: l('Dijital Göçebe', 'Digital Nomad', 'Digitale Nomaden', 'Nómada Digital', 'Цифровой Номад'),
      shortLabel: l('Göçebe', 'Nomad', 'Nomaden', 'Nómada', 'Номад'),
      icon: Sparkles
    },
    {
      key: 'profile' as TabKey,
      label: l('Profil & Cüzdan', 'Profile & Vault', 'Mein Profil', 'Perfil y Cartera', 'Профиль и Кошеlek'),
      shortLabel: t.navProfile,
      icon: User
    },
    {
      key: 'consular' as TabKey,
      label: l('Konsolosluk Destek', 'Consular Support', 'Konsular-Hilfe', 'Apoyo Consular', 'Консульская Помощь'),
      shortLabel: l('Acil Destek', 'Crisis', 'Notfall', 'Emergencia', 'Помощь'),
      icon: ShieldAlert,
      crisis: true
    }
  ];

  const handleNavClick = (key: TabKey) => {
    onSelectTab(key);
    if (onToggleMobileDrawer && isMobileDrawerOpen) {
      onToggleMobileDrawer();
    }
  };

  return (
    <>
      {/* ========================================================
          1. MOBILE SLIDING DRAWER (HIDDEN HAMBURGER OVERLAY)
      ======================================================== */}
      {isMobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onToggleMobileDrawer}
          />

          {/* Drawer Content */}
          <div className="relative w-72 max-w-[85vw] mobile-drawer-viewport h-[100dvh] overflow-y-auto sidebar-glass p-6 flex flex-col justify-between gap-6 shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => {
                    onSelectTab('explore');
                    if (window.location.pathname !== `/${language}`) {
                      window.history.pushState({ lang: language, tab: 'explore' }, '', `/${language}`);
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }
                  }}
                  className="flex items-center gap-2.5 cursor-pointer text-left group"
                >
                  <picture>
                    <source srcSet="/logo.webp" type="image/webp" />
                    <img
                      src="/logo.png"
                      alt="Vizamigo"
                      width="36"
                      height="36"
                      className="w-9 h-9 object-contain rounded-full shadow-xs group-hover:scale-105 transition-transform"
                    />
                  </picture>
                  <span className="font-extrabold text-lg text-slate-900 dark:text-white">
                    Vizamigo<span className="text-teal-500">.</span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={onToggleMobileDrawer}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Active Citizenship Mobile Card */}
              <div
                onClick={() => {
                  onOpenPassportSelector();
                  if (onToggleMobileDrawer) onToggleMobileDrawer();
                }}
                className="p-3.5 rounded-2xl glass-card flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{getFlag(currentPassport)}</span>
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-white">
                      {getCountryName(currentPassport, language)}
                    </div>
                    <div className="text-[10px] text-slate-400">{currentPassport}</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                  {l('Değiştir', 'Change', 'Ändern')}
                </span>
              </div>

              {/* Mobile Drawer Navigation List */}
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleNavClick(item.key)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all ${
                        isActive
                          ? item.crisis
                            ? 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30'
                            : 'bg-gradient-to-r from-[#0D9488] to-[#14B8A6] text-white shadow-sm'
                          : 'text-slate-600 dark:text-[#8E9DBE] hover:bg-slate-900/[0.03] dark:hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.tag && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-[#8E9DBE]">
                          {item.tag}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Mobile Drawer Quick Tools */}
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-1">
                  {l('Araçlar', 'Tools', 'Tools', 'Herramientas', 'Инструменты')}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {quickTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <button
                        key={tool.id}
                        type="button"
                        onClick={() => {
                          tool.onClick?.();
                          onToggleMobileDrawer?.();
                        }}
                        className="flex items-center gap-2 p-2 rounded-xl text-[11px] font-bold text-slate-700 dark:text-slate-200 bg-slate-900/[0.03] dark:bg-white/[0.04] hover:bg-teal-500/10 transition-colors cursor-pointer"
                      >
                        <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${tool.accent} text-white flex items-center justify-center shrink-0`}>
                          <Icon className="w-3.5 h-3.5" />
                        </span>
                        <span className="truncate">{tool.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/70 dark:border-white/[0.08] text-center">
              <span className="text-[10px] text-slate-400 dark:text-[#7A89A6] font-mono">
                Vizamigo Mobility Platform · 2026
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          3. MOBILE FULL-WIDTH BOTTOM TAB BAR (Vizamigo Redesign)
      ======================================================== */}
      <nav className="lg:hidden fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around border-t border-slate-200/80 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur dark:border-white/10 dark:bg-[#0c1020]/95" aria-label="Mobile Navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                handleNavClick(item.key);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex min-h-[56px] min-w-[56px] flex-1 flex-col items-center justify-center gap-1 px-1 cursor-pointer transition-colors ${
                isActive
                  ? item.crisis
                    ? 'text-red-700 dark:text-red-400 font-bold'
                    : 'text-teal-700 dark:text-teal-400 font-bold'
                  : 'text-slate-600 dark:text-slate-400 font-medium'
              }`}
            >
              {isActive && (
                <span
                  className={`absolute inset-x-3 top-0 h-0.5 rounded-full ${
                    item.crisis ? 'bg-red-700' : 'bg-teal-700'
                  }`}
                />
              )}
              <Icon className="h-5 w-5" />
              <span className="max-w-[64px] truncate text-[11px] leading-none">{item.shortLabel}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
