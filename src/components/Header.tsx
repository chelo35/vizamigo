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
    <header className="sticky top-0 z-30 transition-all w-full border-b border-[#2DD4BF]/30 backdrop-blur-2xl bg-[#042637]/90 dark:bg-[#021824]/95 shadow-xl shadow-cyan-950/20">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 space-y-2.5 sm:space-y-3">
        {/* =================================================================
            ROW 1: Symmetrical 3-Column Header (Desktop) & Flowing Flex (Mobile)
            Left: Mobile Menu + Vizamigo Logo + Desktop Passport Pill
            Center: 5 Pill Navigation
            Right: Mobile Passport + Language + Theme + Auth
        ================================================================= */}
        <div className="flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] gap-2 sm:gap-4">
          {/* Left: Logo + Desktop Passport Pill */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 justify-start">
            <button
              type="button"
              onClick={() => {
                onSelectTab?.('explore');
                if (window.location.pathname !== `/${language}`) {
                  window.history.pushState({ lang: language, tab: 'explore' }, '', `/${language}`);
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }
              }}
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer text-left group shrink-0"
              title={l('Vizamigo Ana Sayfa', 'Vizamigo Home')}
            >
              <picture>
                <source srcSet="/logo.webp" type="image/webp" />
                <img
                  src="/logo.png"
                  alt="Vizamigo"
                  width="40"
                  height="40"
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-full shadow-lg shadow-teal-400/25 border-2 border-[#2DD4BF]/80 group-hover:scale-105 transition-all"
                />
              </picture>
              <span className="font-black text-xl sm:text-2xl lg:text-3xl tracking-tight text-white drop-shadow-sm leading-none flex items-center gap-1">
                Vizamigo
                <span className="text-sm sm:text-base text-[#2DD4BF] -mt-1.5 select-none">✈️</span>
              </span>
            </button>

            {/* Desktop Passport Pill docked beside Logo for balanced weight */}
            <button
              type="button"
              onClick={onOpenPassportSelector}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-full bg-[#14B8A6]/15 hover:bg-[#14B8A6]/25 border border-[#2DD4BF]/45 text-xs font-black text-white transition-all cursor-pointer shadow-xs ml-1"
              title={l('Aktif Pasaportu Değiştir', 'Change Active Passport')}
            >
              <span className="text-base leading-none">{getFlag(currentPassport)}</span>
              <span className="truncate max-w-[120px]">
                {getCountryName(currentPassport, language)}
              </span>
              <span className="text-[#5EEAD4]">·</span>
              <span className="text-[#5EEAD4] font-black tabular-nums">
                {visaFreeCount} {l('Vizesiz', 'Free')}
              </span>
            </button>
          </div>

          {/* Center (Desktop): 5 Main Pill Tabs (Keşfet · Rota · Araçlar · Cüzdan · Profil) */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center justify-center gap-1 p-1 rounded-full bg-white/[0.08] dark:bg-white/[0.05] border border-[#2DD4BF]/40 backdrop-blur-xl shadow-inner mx-auto"
          >
            {mainTabs.map((item) => {
              const isActive = activeTab === item.key || (activeTab === 'consular' && item.key === 'nomad');
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => onSelectTab?.(item.key)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-black transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0D9488] to-[#14B8A6] text-white shadow-md shadow-teal-900/30 ring-1 ring-[#5EEAD4]/60'
                      : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Mobile/Tablet Passport + Language (TR ▾) + Theme (☀️/🌙) + Auth */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 justify-end">
            {/* Mobile & Laptop Compact Passport Pill with clear Passport Identity */}
            <button
              type="button"
              onClick={onOpenPassportSelector}
              className="xl:hidden flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 min-h-[34px] sm:min-h-[38px] rounded-full bg-[#0D9488]/40 hover:bg-[#0D9488]/60 border border-[#2DD4BF]/70 text-xs font-black text-white transition-all cursor-pointer shrink-0 shadow-sm"
              title={l('Aktif Pasaportu Değiştir', 'Change Active Passport')}
              aria-label={l('Aktif Pasaport Seçimi', 'Passport Selection')}
            >
              <span className="text-xs" aria-hidden="true">🛂</span>
              <span className="text-sm sm:text-base leading-none">{getFlag(currentPassport)}</span>
              <span className="font-mono text-xs font-black">{currentPassport}</span>
              <span className="px-1.5 py-0.5 rounded-md bg-[#2DD4BF] text-[#042F2E] font-black text-[10px] sm:text-xs tabular-nums">
                {visaFreeCount} {l('Vizesiz', 'Free')}
              </span>
            </button>

            {/* Language Selector (🌐 Dil: TR ▾) */}
            <div className="relative shrink-0" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1 min-h-[32px] sm:min-h-[36px] rounded-full bg-white/10 hover:bg-white/20 border border-[#5EEAD4]/50 text-xs font-black text-white transition-all cursor-pointer shrink-0 shadow-xs"
                title={t.languageSelect}
                aria-label={t.languageSelect}
              >
                <span className="text-xs" aria-hidden="true">🌐</span>
                <span className="hidden xs:inline text-[11px] text-teal-200">{l('Dil:', 'Lang:')}</span>
                <span className="uppercase font-black text-xs text-[#5EEAD4]">{language}</span>
                <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#5EEAD4]" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#042637] dark:bg-[#021824] border-2 border-[#2DD4BF] rounded-2xl shadow-2xl py-1.5 z-50">
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
              className="px-2 sm:px-2.5 py-1 min-h-[32px] sm:min-h-[36px] rounded-full bg-white/[0.08] hover:bg-white/15 border border-[#2DD4BF]/40 text-xs font-black text-white transition-all cursor-pointer flex items-center justify-center gap-0.5 sm:gap-1 shrink-0"
              aria-label={t.themeToggle}
              title={t.themeToggle}
            >
              <span className="sm:hidden text-xs leading-none">{isDark ? '🌙' : '☀️'}</span>
              <span className="hidden sm:inline-flex items-center gap-0.5">
                <span className={isDark ? 'opacity-40' : 'opacity-100'}>☀️</span>
                <span className="text-white/30 text-xs">/</span>
                <span className={isDark ? 'opacity-100' : 'opacity-40'}>🌙</span>
              </span>
            </button>

            {/* User Auth / Profile */}
            <div className="relative" ref={menuRef}>
              {isAuthenticated && user ? (
                <div>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-1 p-1 pr-1.5 rounded-full bg-[#14B8A6]/20 border border-[#2DD4BF]/50 cursor-pointer"
                  >
                    <img
                      src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <ChevronDown className="w-3 h-3 text-[#5EEAD4]" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-[#042637] dark:bg-[#021824] border-2 border-[#2DD4BF] rounded-2xl shadow-2xl p-2 z-50 space-y-1">
                      <div className="px-3 py-1.5 border-b border-white/15">
                        <p className="text-xs sm:text-sm font-extrabold text-white truncate">{user.name}</p>
                        <p className="text-xs text-teal-200 truncate">{user.email}</p>
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
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[34px] sm:min-h-[36px] rounded-full text-xs font-black bg-gradient-to-r from-[#0D9488] to-[#14B8A6] text-white hover:brightness-110 shadow-sm cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{t.signIn}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* =================================================================
            ROW 2: Prominent Frosted Lagoon Search Bar + Mobile Drawer Menu Button
        ================================================================= */}
        <div className="w-full max-w-4xl mx-auto flex items-center gap-2">
          {onToggleMobileDrawer && (
            <button
              type="button"
              onClick={onToggleMobileDrawer}
              className="lg:hidden p-2.5 min-w-[44px] min-h-[44px] rounded-xl sm:rounded-full bg-white/10 hover:bg-white/20 border border-[#2DD4BF]/50 text-white flex items-center justify-center cursor-pointer transition-all shrink-0 shadow-md"
              aria-label={l('Menüyü Aç', 'Open Menu', 'Menü öffnen', 'Abrir menú', 'Открыть меню')}
              title={l('Menüyü Aç', 'Open Menu', 'Menü öffnen', 'Abrir menú', 'Открыть меню')}
            >
              <Menu className="w-5 h-5 text-[#5EEAD4]" />
            </button>
          )}

          <label className="relative flex-1 flex items-center">
            <Search className="w-5 h-5 text-[#5EEAD4] absolute left-4 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full h-11 sm:h-12 pl-11 pr-24 sm:pr-28 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold bg-white/10 dark:bg-white/[0.07] border border-[#2DD4BF]/50 text-white placeholder:text-white/75 focus:outline-none focus:ring-4 focus:ring-[#2DD4BF]/30 focus:bg-[#032030]/90 transition-all shadow-md"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange?.('')}
                className="absolute right-20 sm:right-24 p-1.5 text-white/70 hover:text-white cursor-pointer"
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
              className="absolute right-1.5 px-4 sm:px-5 py-1.5 rounded-lg sm:rounded-full text-xs sm:text-sm font-black bg-gradient-to-r from-[#0D9488] to-[#14B8A6] hover:brightness-110 text-white shadow-md cursor-pointer transition-all"
            >
              {l('Ara', 'Search')}
            </button>
          </label>
        </div>
      </div>
    </header>
  );
};
