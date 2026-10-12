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
          1. FLOATING GLASSMORPHIC NAV CONSOLE (DESKTOP: width 252px)
          Nubair luxury aesthetic with organic floating posture
      ======================================================== */}
      <aside className="hidden lg:flex fixed left-4 top-4 bottom-4 w-[252px] z-40 sidebar-glass rounded-[28px] flex-col justify-between p-5 transition-all duration-300">
        <div className="space-y-6">
          {/* Brand Logo & Editorial Header */}
          <div className="flex items-center gap-3 px-2 pt-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0D9488] to-[#14B8A6] text-white flex items-center justify-center shadow-md shadow-[#0D9488]/20 flex-shrink-0 transition-transform hover:scale-105">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                  Vizamigo<span className="text-teal-500">.</span>
                </span>
                <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-200/80 dark:border-teal-500/20">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-[#8E9DBE] font-medium">
                {l('Küresel Seyahat Zekası', 'Global Mobility Intelligence', 'Globale Reisemobilität')}
              </p>
            </div>
          </div>

          {/* Active Citizenship Card Widget in Sidebar (De-Widgetized organic look) */}
          <div className="p-3.5 rounded-[22px] glass-card shadow-xs space-y-2.5 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#7A89A6]">
                {l('Aktif Pasaport', 'Active Citizenship', 'Aktiver Reisepass')}
              </span>
              <button
                type="button"
                onClick={onOpenPassportSelector}
                className="text-[11px] text-teal-600 dark:text-teal-400 hover:underline font-extrabold flex items-center gap-1 cursor-pointer"
                title={l('Pasaport Değiştir', 'Change Passport', 'Pass Ändern')}
              >
                <ArrowRightLeft className="w-3 h-3" />
                <span>{l('Değiştir', 'Switch', 'Ändern')}</span>
              </button>
            </div>
            <div
              onClick={onOpenPassportSelector}
              className="flex items-center gap-3 p-2 rounded-2xl hover:bg-black/[0.02] dark:hover:bg-white/[0.04] cursor-pointer transition-colors"
            >
              <span className="text-3xl leading-none flex-shrink-0 filter drop-shadow-xs">
                {getFlag(currentPassport)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                  {getCountryName(currentPassport, language)}
                </div>
                <div className="text-[11px] font-mono text-slate-400 dark:text-[#8E9DBE] font-medium">
                  {currentPassport} · {l('Biyometrik', 'Biometric', 'Biometrisch', 'Biométrico', 'Биометрический')}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Items with Lucide Micro-Icons */}
          <nav className="space-y-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleNavClick(item.key)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer group ${
                    isActive
                      ? item.crisis
                        ? 'bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30 shadow-xs'
                        : 'bg-gradient-to-r from-[#0D9488] to-[#14B8A6] text-white shadow-md shadow-[#0D9488]/25 border border-white/20'
                      : item.crisis
                      ? 'text-red-600 dark:text-red-400 hover:bg-red-500/10 border border-red-500/15'
                      : 'text-slate-600 dark:text-[#8E9DBE] hover:text-slate-950 dark:hover:text-white hover:bg-slate-900/[0.03] dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isActive
                          ? item.crisis
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-white scale-110'
                          : item.crisis
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-slate-400 dark:text-[#7A89A6] group-hover:text-slate-700 dark:group-hover:text-white'
                      }`}
                    />
                    <span className="tracking-tight">{item.label}</span>
                  </div>
                  {item.tag && (
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 dark:bg-white/[0.06] text-slate-500 dark:text-[#8E9DBE]'
                      }`}
                    >
                      {item.tag}
                    </span>
                  )}
                  {isActive && !item.tag && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.crisis ? 'bg-[#FF6B6B] animate-ping' : 'bg-white'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Verification & Consular Hotline Info */}
        <div className="space-y-3 pt-4 border-t border-slate-200/70 dark:border-white/[0.08]">
          <div className="p-3.5 rounded-2xl glass-crisis border border-[#FF6B6B]/20 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-[11px] text-[#FF6B6B] dark:text-[#FF8E72] flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-[#FF6B6B]" />
                <span>{l('Diplomatik Kriz Masası', 'Crisis Hotline', 'Konsular-Notruf', 'Mesa de Crisis Diplomática', 'Кризисный Центр')}</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed">
              {l(
                'Pasaport kaybı ve acil tahliye için 7/24 aktif resmi konsolosluk hattı.',
                '24/7 emergency hotline for lost passports & evacuations.',
                '24/7 Notruf für Passverlust & Evakuierung.',
                'Línea consular de emergencia 24/7 para pérdida de pasaportes y evacuaciones.',
                'Круглосуточная горячая линия консульства для утери паспорта и эвакуации.'
              )}
            </p>
          </div>

          <div className="text-[10px] text-slate-400 text-center font-mono">
            Vizamigo v2026.4 · IATA & MFA Verified
          </div>
        </div>
      </aside>

      {/* ========================================================
          2. MOBILE SLIDING DRAWER (HIDDEN HAMBURGER OVERLAY)
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
