import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  Moon,
  Sun,
  User,
  LogIn,
  LogOut,
  CheckCircle,
  ChevronDown,
  Search,
  X,
  Compass,
  Route,
  Wrench,
  Wallet,
  Menu
} from 'lucide-react';
import { getFlag, getCountryName } from '../data/passportData';
import { getPassportItems } from '../utils/calculator';
import { useI18n, SUPPORTED_LANGUAGES } from '../data/i18n';
import { useAuth } from '../context/AuthContext';
import { TabKey } from './Navigation';

interface HeaderProps {
  currentPassport: string;
  onOpenPassportSelector: () => void;
  onOpenLegalModal: () => void;
  onOpenAuditConsole?: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onNavigateToProfile?: () => void;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  onToggleMobileDrawer?: () => void;
  activeTab?: TabKey;
  onSelectTab?: (tab: TabKey) => void;
  onOpenPackingList?: () => void;
  onOpenTippingCalc?: () => void;
  onOpenTimezoneOverlap?: () => void;
  onOpenGlobalRadar?: (mode?: 'all' | 'clock' | 'weather' | 'currency', city?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPassport,
  onOpenPassportSelector,
  onOpenLegalModal: _onOpenLegalModal,
  onOpenAuditConsole,
  isDark,
  onToggleTheme,
  onNavigateToProfile,
  searchQuery = '',
  onSearchChange,
  onToggleMobileDrawer,
  activeTab = 'explore',
  onSelectTab
}) => {
  const { language, setLanguage, l, t } = useI18n();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const visaFreeCount = useMemo(() => {
    try {
      const items = getPassportItems(currentPassport);
      return items.filter((it) => it.cat === 'free' || it.id).length;
    } catch {
      return 116;
    }
  }, [currentPassport]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
      if (langRef.current && !langRef.current.contains(target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const mainTabs: Array<{ key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { key: 'explore', label: l('Keşfet', 'Explore', 'Entdecken', 'Explorar', 'Обзор'), icon: Compass },
    { key: 'plan', label: l('Rota', 'Route', 'Route', 'Ruta', 'Маршрут'), icon: Route },
    { key: 'nomad', label: l('Araçlar', 'Tools', 'Werkzeuge', 'Herramientas', 'Инструменты'), icon: Wrench },
    { key: 'track', label: l('Cüzdan', 'Wallet', 'Wallet', 'Cartera', 'Кошелек'), icon: Wallet },
    { key: 'profile', label: l('Profil', 'Profile', 'Profil', 'Perfil', 'Профиль'), icon: User }
  ];

  const searchPlaceholder = l(
    'Ülke, vize kuralı, rota veya soru ara (Japonya, Tayland, Balkanlar, Schengen...)',
    'Search country, visa rule, route or question (Japan, Thailand, Schengen...)',
    'Land, Visabestimmung oder Route suchen (Japan, Thailand, Schengen...)',
    'Buscar país, visado o ruta (Japón, Tailandia, Schengen...)',
    'Поиск страны, визы или маршрута (Япония, Таиланд, Шенген...)'
  );

  return (
    <header className="sticky top-0 z-30 topbar-glass transition-all w-full border-b border-teal-500/20 dark:border-white/[0.08] backdrop-blur-2xl bg-white/88 dark:bg-[#051824]/92">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 space-y-2.5">
        {/* =================================================================
            ROW 1: Vizamigo Logo (Left) + 5 Main Pill Tabs (Center Desktop) + Passport, Language (TR ▾), Theme (☀️/🌙), Auth (Right)
        ================================================================= */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Mobile Menu + Brand Logo */}
          <div className="flex items-center gap-2 shrink-0">
            {onToggleMobileDrawer && (
              <button
                type="button"
                onClick={onToggleMobileDrawer}
                className="lg:hidden p-2 min-w-[40px] min-h-[40px] rounded-full glass-pill-control text-slate-700 dark:text-slate-200 hover:bg-teal-500/15 flex items-center justify-center cursor-pointer transition-all"
                aria-label={l('Menüyü Aç', 'Open Menu', 'Menü öffnen', 'Abrir menú', 'Открыть меню')}
                title={l('Menüyü Aç', 'Open Menu', 'Menü öffnen', 'Abrir menú', 'Открыть меню')}
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                onSelectTab?.('explore');
                if (window.location.pathname !== `/${language}`) {
                  window.history.pushState({ lang: language, tab: 'explore' }, '', `/${language}`);
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }
              }}
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer text-left group"
              title={l('Vizamigo Ana Sayfa', 'Vizamigo Home')}
            >
              <picture>
                <source srcSet="/logo.webp" type="image/webp" />
                <img
                  src="/logo.png"
                  alt="Vizamigo"
                  width="40"
                  height="40"
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-full shadow-md shadow-teal-500/20 group-hover:scale-105 transition-all"
                />
              </picture>
              <div className="flex flex-col">
                <span className="font-extrabold text-base sm:text-xl tracking-[-0.02em] text-slate-900 dark:text-white leading-none">
                  Vizamigo<span className="text-[#0D9488] dark:text-[#2DD4BF]">.</span>
                </span>
                <span className="hidden sm:inline text-[10px] font-bold text-[#0F766E] dark:text-[#2DD4BF] tracking-wide">
                  {l('Tatil & Vize Rehberi', 'Holiday & Visa Guide')}
                </span>
              </div>
            </button>
          </div>

          {/* Center (Desktop): 5 Main Pill Tabs (Keşfet · Rota · Araçlar · Cüzdan · Profil) */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-teal-500/[0.08] dark:bg-white/[0.05] border border-teal-500/20 dark:border-white/10"
          >
            {mainTabs.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key || (activeTab === 'consular' && item.key === 'nomad');
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onSelectTab?.(item.key)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0D9488] to-[#0EA5E9] text-white shadow-sm'
                      : 'text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-teal-500/10'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#0F766E] dark:text-[#2DD4BF]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Active Passport Pill + Language Selector (TR ▾) + Theme Toggle (☀️/🌙) + Auth */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Active Passport Pill */}
            <button
              type="button"
              onClick={onOpenPassportSelector}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 min-h-[38px] rounded-full bg-teal-500/10 dark:bg-white/[0.06] border border-teal-500/25 dark:border-white/15 text-xs font-extrabold text-slate-900 dark:text-white hover:border-[#0D9488] transition-all cursor-pointer"
              title={l('Aktif Pasaportu Değiştir', 'Change Active Passport')}
            >
              <span className="text-lg leading-none">{getFlag(currentPassport)}</span>
              <span className="hidden md:inline truncate max-w-[110px]">
                {getCountryName(currentPassport, language)}
              </span>
              <span className="md:hidden font-mono">{currentPassport}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-900 dark:text-emerald-300">
                {visaFreeCount} {l('Vizesiz', 'Free')}
              </span>
            </button>

            {/* Audit Verified Badge (XL Desktop) */}
            {onOpenAuditConsole && (
              <button
                type="button"
                onClick={onOpenAuditConsole}
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[38px] rounded-full border border-teal-500/25 bg-teal-500/10 hover:bg-teal-500/20 text-[#0F766E] dark:text-[#2DD4BF] text-xs font-extrabold transition-all cursor-pointer"
                title={t.auditConsoleTitle}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t.auditVerifiedBadge}</span>
              </button>
            )}

            {/* Language Selector (TR ▾) */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 min-h-[38px] rounded-full bg-teal-500/10 dark:bg-white/[0.06] border border-teal-500/25 dark:border-white/15 text-xs font-extrabold text-slate-800 dark:text-slate-100 hover:bg-teal-500/20 transition-all cursor-pointer"
                title={t.languageSelect}
                aria-label={t.languageSelect}
              >
                <span>{SUPPORTED_LANGUAGES.find((opt) => opt.code === language)?.flag || '🌐'}</span>
                <span className="uppercase text-[11px] font-extrabold">{language}</span>
                <ChevronDown className="w-3 h-3 opacity-75" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#071E30] border border-teal-500/25 dark:border-white/15 rounded-2xl shadow-2xl py-1.5 z-50">
                  {SUPPORTED_LANGUAGES.map((opt) => (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => {
                        setLanguage(opt.code);
                        setLangMenuOpen(false);
                        window.dispatchEvent(new PopStateEvent('popstate'));
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-bold flex items-center justify-between hover:bg-teal-500/10 transition-colors cursor-pointer ${
                        language === opt.code
                          ? 'text-[#0F766E] dark:text-[#2DD4BF] bg-teal-500/10'
                          : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{opt.flag}</span>
                        <span>{opt.nativeName}</span>
                      </span>
                      {language === opt.code && <CheckCircle className="w-3.5 h-3.5 text-[#0D9488] dark:text-[#2DD4BF]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Light / Dark Mode Toggle (☀️ / 🌙) */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="p-2 min-w-[38px] min-h-[38px] rounded-full bg-teal-500/10 dark:bg-white/[0.06] border border-teal-500/25 dark:border-white/15 text-slate-800 dark:text-amber-300 hover:bg-teal-500/20 transition-all cursor-pointer flex items-center justify-center"
              aria-label={t.themeToggle}
              title={t.themeToggle}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-[#0F766E]" />}
            </button>

            {/* User Auth / Profile */}
            <div className="relative" ref={menuRef}>
              {isAuthenticated && user ? (
                <div>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-1.5 p-1 pr-2 rounded-full bg-teal-500/10 dark:bg-white/[0.06] border border-teal-500/25 cursor-pointer"
                  >
                    <img
                      src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <ChevronDown className="w-3 h-3 text-slate-500" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#071E30] border border-teal-500/25 rounded-2xl shadow-2xl p-2 z-50 space-y-1">
                      <div className="px-3 py-1.5 border-b border-slate-100 dark:border-white/10">
                        <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          onNavigateToProfile?.();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-teal-500/10 flex items-center gap-2 cursor-pointer"
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>{t.myAccount}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-500/10 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{t.signOut}</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] rounded-full text-xs font-extrabold bg-gradient-to-r from-[#0D9488] to-[#0EA5E9] text-white shadow-xs hover:opacity-95 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{t.signIn}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* =================================================================
            ROW 2: Prominent Site-Wide Search Bar right below Vizamigo Row
        ================================================================= */}
        <div className="w-full">
          <label className="relative w-full flex items-center">
            <Search className="w-4 h-4 text-[#0F766E] dark:text-[#2DD4BF] absolute left-4 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full h-11 pl-11 pr-24 rounded-full text-xs sm:text-sm font-semibold bg-[#F0FDFA]/90 dark:bg-white/[0.06] border border-teal-500/30 dark:border-teal-400/20 text-slate-900 dark:text-white placeholder:text-slate-600 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 focus:bg-white dark:focus:bg-[#071E30] transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange?.('')}
                className="absolute right-18 p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                title={l('Temizle', 'Clear')}
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                if (activeTab !== 'explore') onSelectTab?.('explore');
                const dirEl = document.getElementById('vz-country-directory');
                if (dirEl) dirEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="absolute right-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-[#0D9488] to-[#10B981] text-white shadow-2xs hover:opacity-95 cursor-pointer"
            >
              {l('Ara', 'Search')}
            </button>
          </label>
        </div>
      </div>
    </header>
  );
};
