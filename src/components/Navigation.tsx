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

export type TabKey = 'explore' | 'plan' | 'track' | 'profile' | 'consular';

interface NavigationProps {
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
  onToggleMobileDrawer
}) => {
  const { language, l, t } = useI18n();

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
      label: l('Schengen 90/180', 'Track 90/180', 'Tage-Tracker', 'Calculadora Schengen', 'Калькулятор Шенгена'),
      shortLabel: t.navTrack,
      icon: Calendar
    },
    {
      key: 'profile' as TabKey,
      label: l('Profil & Cüzdan', 'Profile & Vault', 'Mein Profil', 'Perfil y Cartera', 'Профиль и Кошелек'),
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
          <div className="relative w-72 max-w-[85vw] h-full sidebar-glass p-6 flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0D9488] to-[#14B8A6] flex items-center justify-center text-white shadow-xs">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-lg text-slate-900 dark:text-white">
                    Vizamigo<span className="text-teal-500">.</span>
                  </span>
                </div>
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
                    ? 'text-red-600 dark:text-red-400 font-bold'
                    : 'text-teal-600 dark:text-teal-400 font-bold'
                  : 'text-slate-600 dark:text-slate-400 font-medium'
              }`}
            >
              {isActive && (
                <span
                  className={`absolute inset-x-3 top-0 h-0.5 rounded-full ${
                    item.crisis ? 'bg-red-600' : 'bg-teal-600'
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
