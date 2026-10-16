import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
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
    'Ülke, vize, rota veya soru ara...',
    'Search country, visa, route or question...',
    'Land, Visum, Route oder Frage suchen...',
    'Buscar país, visado, ruta o pregunta...',
    'Поиск страны, визы, маршрута или вопроса...'
  );

  return (
    <header className="sticky top-0 z-30 transition-all w-full border-b border-[#5EEAD4]/35 backdrop-blur-2xl bg-[#064E3B]/85 dark:bg-[#041D29]/90 shadow-lg">
      <div className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-3 sm:py-3.5 space-y-3">
        {/* =================================================================
            ROW 1: Vizamigo Logo (Left) + 5 Main Pill Tabs (Center Desktop) + Passport, Language (TR ▾), Theme (☀️/🌙) (Right)
        ================================================================= */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Mobile Menu + Vizamigo 3D Globe Brand Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            {onToggleMobileDrawer && (
              <button
                type="button"
                onClick={onToggleMobileDrawer}
                className="lg:hidden p-2 min-w-[42px] min-h-[42px] rounded-full bg-white/15 border border-white/25 text-white hover:bg-white/25 flex items-center justify-center cursor-pointer transition-all"
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
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer text-left group"
              title={l('Vizamigo Ana Sayfa', 'Vizamigo Home')}
            >
              <picture>
                <source srcSet="/logo.webp" type="image/webp" />
                <img
                  src="/logo.png"
                  alt="Vizamigo"
                  width="44"
                  height="44"
                  className="w-9 h-9 sm:w-11 sm:h-11 object-contain rounded-full shadow-lg shadow-teal-400/30 border-2 border-[#5EEAD4]/70 group-hover:scale-105 transition-all"
                />
              </picture>
              <span className="font-black text-2xl sm:text-3xl tracking-tight text-white drop-shadow-sm leading-none flex items-center gap-1">
                Vizamigo
                <span className="text-base sm:text-lg text-[#5EEAD4] -mt-2 select-none">✈️</span>
              </span>
            </button>
          </div>

          {/* Center (Desktop): 5 Main Pill Tabs (Keşfet · Rota · Araçlar · Cüzdan · Profil) */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1.5 p-1.5 rounded-full bg-[#CCFBF1]/20 dark:bg-white/[0.08] border border-[#5EEAD4]/50 backdrop-blur-xl shadow-inner"
          >
            {mainTabs.map((item) => {
              const isActive = activeTab === item.key || (activeTab === 'consular' && item.key === 'nomad');
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onSelectTab?.(item.key)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm sm:text-base font-black transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#2DD4BF] text-[#042F2E] shadow-md'
                      : 'text-white/95 hover:text-white hover:bg-white/15'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Active Passport Pill + Language Selector (TR ▾) + Theme Toggle (☀️/🌙) + Auth */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Active Passport Pill ("🇹🇷 T.C. Pasaportu · 71 Vizesiz") */}
            <button
              type="button"
              onClick={onOpenPassportSelector}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 min-h-[40px] rounded-full bg-[#CCFBF1]/20 dark:bg-white/[0.08] border border-[#5EEAD4]/55 text-xs sm:text-sm font-black text-white hover:bg-[#CCFBF1]/30 transition-all cursor-pointer shadow-xs"
              title={l('Aktif Pasaportu Değiştir', 'Change Active Passport')}
            >
              <span className="text-base sm:text-lg leading-none">{getFlag(currentPassport)}</span>
              <span className="hidden md:inline truncate max-w-[140px]">
                {currentPassport === 'TR'
                  ? l('T.C. Pasaportu', 'TR Passport')
                  : getCountryName(currentPassport, language)}
              </span>
              <span className="md:hidden font-mono">{currentPassport}</span>
              <span className="text-[#99F6E4]">·</span>
              <span className="text-[#5EEAD4] font-black">
                {visaFreeCount} {l('Vizesiz', 'Free')}
              </span>
            </button>

            {/* Audit Verified Badge (XL Desktop) */}
            {onOpenAuditConsole && (
              <button
                type="button"
                onClick={onOpenAuditConsole}
                className="hidden 2xl:inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-full border border-[#5EEAD4]/50 bg-[#CCFBF1]/15 hover:bg-[#CCFBF1]/25 text-[#99F6E4] text-xs font-black transition-all cursor-pointer"
                title={t.auditConsoleTitle}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{t.auditVerifiedBadge}</span>
              </button>
            )}

            {/* Language Selector (TR ▾) */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 min-h-[40px] rounded-full bg-[#CCFBF1]/20 dark:bg-white/[0.08] border border-[#5EEAD4]/55 text-xs sm:text-sm font-black text-white hover:bg-[#CCFBF1]/30 transition-all cursor-pointer"
                title={t.languageSelect}
                aria-label={t.languageSelect}
              >
                <span className="uppercase font-black">{language}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-90" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#064E3B] dark:bg-[#071E30] border-2 border-[#5EEAD4] rounded-2xl shadow-2xl py-1.5 z-50">
                  {SUPPORTED_LANGUAGES.map((opt) => (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => {
                        setLanguage(opt.code);
                        setLangMenuOpen(false);
                        window.dispatchEvent(new PopStateEvent('popstate'));
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm font-black flex items-center justify-between hover:bg-white/15 transition-colors cursor-pointer ${
                        language === opt.code ? 'text-[#5EEAD4] bg-white/10' : 'text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{opt.flag}</span>
                        <span>{opt.nativeName}</span>
                      </span>
                      {language === opt.code && <CheckCircle className="w-4 h-4 text-[#5EEAD4]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Light / Dark Mode Toggle ("☀️ / 🌙") */}
            <button
              type="button"
              onClick={onToggleTheme}
              className="px-3 py-2 min-h-[40px] rounded-full bg-[#CCFBF1]/20 dark:bg-white/[0.08] border border-[#5EEAD4]/55 text-xs sm:text-sm font-black text-white hover:bg-[#CCFBF1]/30 transition-all cursor-pointer flex items-center justify-center gap-1"
              aria-label={t.themeToggle}
              title={t.themeToggle}
            >
              <span className={isDark ? 'opacity-50' : 'opacity-100'}>☀️</span>
              <span className="text-white/50">/</span>
              <span className={isDark ? 'opacity-100' : 'opacity-50'}>🌙</span>
            </button>

            {/* User Auth / Profile */}
            <div className="relative" ref={menuRef}>
              {isAuthenticated && user ? (
                <div>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-1.5 p-1 pr-2 rounded-full bg-[#CCFBF1]/20 border border-[#5EEAD4]/55 cursor-pointer"
                  >
                    <img
                      src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <ChevronDown className="w-3.5 h-3.5 text-white" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-[#064E3B] dark:bg-[#071E30] border-2 border-[#5EEAD4] rounded-2xl shadow-2xl p-2 z-50 space-y-1">
                      <div className="px-3 py-1.5 border-b border-white/15">
                        <p className="text-xs font-extrabold text-white truncate">{user.name}</p>
                        <p className="text-[11px] text-teal-200 truncate">{user.email}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          onNavigateToProfile?.();
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-white hover:bg-white/15 flex items-center gap-2 cursor-pointer"
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
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-rose-300 hover:bg-rose-500/20 flex items-center gap-2 cursor-pointer"
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
                  className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-full text-xs font-black bg-[#2DD4BF] text-[#042F2E] shadow-sm hover:opacity-95 cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{t.signIn}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* =================================================================
            ROW 2: Prominent Frosted Lagoon Search Bar right below Vizamigo Row
        ================================================================= */}
        <div className="w-full max-w-4xl mx-auto">
          <label className="relative w-full flex items-center">
            <Search className="w-5 h-5 text-white/90 absolute left-4.5 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full h-12 sm:h-13 pl-12 pr-28 rounded-2xl sm:rounded-full text-sm sm:text-base font-bold bg-[#CCFBF1]/25 dark:bg-white/[0.10] border-2 border-[#5EEAD4]/60 text-white placeholder:text-white/85 focus:outline-none focus:ring-4 focus:ring-[#5EEAD4]/35 focus:bg-[#042F2E]/70 transition-all shadow-md"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange?.('')}
                className="absolute right-22 p-1.5 text-white/80 hover:text-white cursor-pointer"
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
              className="absolute right-2 px-5 sm:px-6 py-2 rounded-xl sm:rounded-full text-sm sm:text-base font-black bg-[#2DD4BF] hover:bg-[#5EEAD4] text-[#042F2E] shadow-md cursor-pointer transition-all"
            >
              {l('Ara', 'Search')}
            </button>
          </label>
        </div>
      </div>
    </header>
  );
};
