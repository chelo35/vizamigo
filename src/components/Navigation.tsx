import React from 'react';
import {
  Compass,
  Route,
  Wrench,
  Wallet,
  User,
  X
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
  isMobileDrawerOpen = false,
  onToggleMobileDrawer,
  onOpenPackingList,
  onOpenTippingCalc,
  onOpenTimezoneOverlap,
  onOpenGlobalRadar
}) => {
  const { language, l } = useI18n();
  const quickTools = useQuickTools({
    onOpenPackingList,
    onOpenTippingCalc,
    onOpenTimezoneOverlap,
    onOpenGlobalRadar
  });

  // 5 Main Tabs (Keşfet · Rota · Araçlar · Cüzdan · Profil)
  const navItems: Array<{
    key: TabKey;
    label: string;
    shortLabel: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    {
      key: 'explore',
      label: l('Keşfet & Pano', 'Explore & Dashboard', 'Entdecken', 'Explorar', 'Обзор'),
      shortLabel: l('Keşfet', 'Explore', 'Entdecken', 'Explorar', 'Обзор'),
      icon: Compass
    },
    {
      key: 'plan',
      label: l('Rota & Sinerji', 'Route & Synergy', 'Routenplaner', 'Ruta', 'Маршрут'),
      shortLabel: l('Rota', 'Route', 'Route', 'Ruta', 'Маршрут'),
      icon: Route
    },
    {
      key: 'nomad',
      label: l('Gezgin Araçları', 'Traveler Tools', 'Werkzeuge', 'Herramientas', 'Инструменты'),
      shortLabel: l('Araçlar', 'Tools', 'Tools', 'Herramientas', 'Инструм.'),
      icon: Wrench
    },
    {
      key: 'track',
      label: l('Cüzdan & Gün Sayacı', 'Wallet & Day Counter', 'Wallet & Tage', 'Cartera', 'Кошелек'),
      shortLabel: l('Cüzdan', 'Wallet', 'Wallet', 'Cartera', 'Кошелек'),
      icon: Wallet
    },
    {
      key: 'profile',
      label: l('Profil & Acil Yardım', 'Profile & SOS', 'Profil & SOS', 'Perfil', 'Профиль'),
      shortLabel: l('Profil', 'Profile', 'Profil', 'Perfil', 'Профиль'),
      icon: User
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
          1. MOBILE SLIDING DRAWER (OPTIONAL QUICK DRAWER)
      ======================================================== */}
      {isMobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm transition-opacity"
            onClick={onToggleMobileDrawer}
          />
          <div className="relative w-72 max-w-[85vw] h-[100dvh] overflow-y-auto bg-[#F0FDFA] dark:bg-[#051824] border-r border-teal-500/25 p-5 flex flex-col justify-between gap-6 shadow-2xl z-10">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-teal-500/20 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => handleNavClick('explore')}
                  className="flex items-center gap-2 cursor-pointer text-left"
                >
                  <img src="/logo.png" alt="Vizamigo" width="34" height="34" className="w-8 h-8 rounded-full" />
                  <span className="font-extrabold text-lg text-slate-900 dark:text-white">
                    Vizamigo<span className="text-[#0D9488] dark:text-[#2DD4BF]">.</span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={onToggleMobileDrawer}
                  className="p-2 rounded-full hover:bg-teal-500/15 text-slate-600 dark:text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Active Citizenship Card */}
              <div
                onClick={() => {
                  onOpenPassportSelector();
                  onToggleMobileDrawer?.();
                }}
                className="p-3.5 rounded-2xl bento-lagoon-card flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{getFlag(currentPassport)}</span>
                  <div>
                    <div className="font-extrabold text-xs text-slate-900 dark:text-white">
                      {getCountryName(currentPassport, language)}
                    </div>
                    <div className="text-[10px] font-bold text-slate-500">{currentPassport}</div>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-[#0F766E] dark:text-[#2DD4BF]">
                  {l('Değiştir', 'Change')}
                </span>
              </div>

              {/* 5 Main Tabs */}
              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handleNavClick(item.key)}
                      className={`w-full flex items-center gap-3 p-3 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-[#0D9488] to-[#0EA5E9] text-white shadow-sm'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-teal-500/10'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Quick Tools */}
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F766E] dark:text-[#2DD4BF] mb-2 px-1">
                  {l('Hızlı Araçlar', 'Quick Tools')}
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
                        className="flex items-center gap-2 p-2.5 rounded-xl text-[11px] font-bold text-slate-800 dark:text-slate-200 bento-lagoon-card cursor-pointer"
                      >
                        <Icon className="w-3.5 h-3.5 text-[#0F766E] dark:text-[#2DD4BF] shrink-0" />
                        <span className="truncate">{tool.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-teal-500/20 text-center">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                Vizamigo Crystal Lagoon · 2026
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          2. MOBILE FLOATING FROSTED-GLASS BOTTOM BAR (5 MAIN TABS)
      ======================================================== */}
      <nav
        className="lg:hidden fixed inset-x-3 bottom-3 z-40 rounded-full border-2 border-[#5EEAD4]/65 bg-[#0F766E]/92 dark:bg-[#041D29]/95 backdrop-blur-2xl shadow-2xl px-2 py-1.5 flex items-center justify-around"
        aria-label="Mobile Navigation"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.key || (activeTab === 'consular' && item.key === 'nomad');
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                handleNavClick(item.key);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex min-h-[48px] flex-1 flex-col items-center justify-center gap-0.5 rounded-full px-1.5 py-1 cursor-pointer transition-all ${
                isActive
                  ? 'bg-[#2DD4BF] text-[#042F2E] font-black shadow-md'
                  : 'text-white/90 font-extrabold hover:text-[#5EEAD4]'
              }`}
            >
              <Icon className="h-4.5 w-4.5" />
              <span className="max-w-[68px] truncate text-[11px] leading-tight">{item.shortLabel}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
