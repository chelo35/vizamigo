import React, { useState, useRef, useEffect } from 'react';
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
  Sparkles,
  Compass,
  Route,
  Calendar,
  ShieldAlert
} from 'lucide-react';
import { getFlag, getCountryName } from '../data/passportData';
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
  onToggleMobileDrawer: _onToggleMobileDrawer,
  activeTab = 'explore',
  onSelectTab
}) => {
  const { language, setLanguage, l, t } = useI18n();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Click outside to close menus
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

  const searchPlaceholder = l(
    'Ülke, başkent veya vize kuralı ara (Japonya, Tayland, Balkanlar...)',
    'Search country, capital or visa rule (Japan, Thailand...)',
    'Reiseziel, Hauptstadt oder Visabestimmung suchen...',
    'Buscar país, capital o visado...',
    'Поиск страны, столицы или визы...'
  );

  return (
    <header className="sticky top-0 z-30 topbar-glass transition-all w-full border-b border-slate-200/70 dark:border-white/[0.08] backdrop-blur-2xl bg-white/85 dark:bg-[#0c101d]/90">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2.5 sm:gap-6">
        {/* Left Section: Brand Logo (Clean, no hamburger button) */}
        <div className="flex items-center flex-shrink-0">
          {/* Vizamigo Brand Mascot Logo (Clicking reloads/resets to home) */}
          <button
            type="button"
            onClick={() => {
              onSelectTab?.('explore');
              window.location.href = `/${language}`;
            }}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer text-left group"
            title={l('Ana Sayfaya Dön ve Yenile', 'Go Home & Refresh', 'Zur Startseite & Neu laden', 'Ir al Inicio y Recargar', 'На Главную и Обновить')}
          >
            <img
              src="/logo.png"
              alt="Vizamigo"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-full shadow-md shadow-teal-500/20 group-hover:scale-105 group-hover:rotate-3 transition-all"
            />
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
              Vizamigo<span className="text-teal-500">.</span>
            </span>
          </button>
        </div>

        {/* Center Section: The ONE and ONLY Prominent Search Bar (Full prominence, zero duplicates) */}
        <div className="flex flex-1 max-w-xl xl:max-w-2xl mx-1.5 sm:mx-4">
          <label className="relative w-full flex items-center">
            <Search className="w-4 h-4 text-teal-600 dark:text-teal-400 absolute left-3.5 sm:left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full h-10 sm:h-12 pl-10 sm:pl-11 pr-9 sm:pr-10 rounded-full text-xs sm:text-sm font-semibold bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200/90 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500/70 focus:bg-white dark:focus:bg-[#0c101d] shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange?.('')}
                className="absolute right-3 sm:right-3.5 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white text-xs font-bold cursor-pointer"
                title={l('Aramayı Temizle', 'Clear Search', 'Suche löschen', 'Limpiar búsqueda', 'Очистить поиск')}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </label>
        </div>

        {/* Right Section: Passport, Audit, Language, Theme & Profile (Zero extra search buttons) */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Active Citizenship Pill */}
          <button
            type="button"
            onClick={onOpenPassportSelector}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 min-h-[38px] sm:min-h-[40px] rounded-full border border-slate-200/80 dark:border-white/[0.08] glass-card text-xs font-bold text-slate-800 dark:text-slate-200 shadow-2xs cursor-pointer hover:border-teal-500/40 transition-all touch-target-min"
            title={l('Aktif Pasaportu Değiştir', 'Change Active Passport', 'Aktiven Reisepass ändern')}
          >
            <span className="text-lg sm:text-2xl leading-none">{getFlag(currentPassport)}</span>
            <span className="font-mono text-xs text-slate-600 dark:text-slate-300 font-extrabold">{currentPassport}</span>
            <span className="hidden xl:inline text-xs text-slate-500 dark:text-slate-400 font-semibold truncate max-w-[90px]">
              {getCountryName(currentPassport, language)}
            </span>
          </button>

          {/* Audit Console Button (Desktop) */}
          {onOpenAuditConsole && (
            <button
              type="button"
              onClick={onOpenAuditConsole}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-emerald-500/25 bg-emerald-50/70 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-2xs transition-all cursor-pointer"
              title={t.auditConsoleTitle}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{t.auditVerifiedBadge}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </button>
          )}

          {/* Language Selector */}
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 min-h-[38px] sm:min-h-[40px] rounded-full border border-slate-200/80 dark:border-white/[0.08] glass-card text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/[0.06] transition-all cursor-pointer shadow-2xs touch-target-min"
              title={t.languageSelect}
            >
              <span>{SUPPORTED_LANGUAGES.find(l => l.code === language)?.flag || '🌐'}</span>
              <span className="uppercase text-[11px] font-extrabold">{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#0c1020] border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {SUPPORTED_LANGUAGES.map(opt => (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => {
                      setLanguage(opt.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 min-h-[44px] text-xs font-semibold flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer touch-target-min ${
                      language === opt.code
                        ? 'text-slate-950 dark:text-white font-bold bg-slate-100/70 dark:bg-slate-800'
                        : 'text-slate-700 dark:text-[#8E9DBE]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{opt.flag}</span>
                      <span>{opt.nativeName}</span>
                    </span>
                    {language === opt.code && <CheckCircle className="w-3.5 h-3.5 text-slate-900 dark:text-white" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 sm:p-2.5 min-w-[38px] sm:min-w-[40px] min-h-[38px] sm:min-h-[40px] rounded-full border border-slate-200/80 dark:border-white/[0.08] glass-card hover:bg-slate-50 dark:hover:bg-white/[0.06] text-slate-600 dark:text-[#8E9DBE] hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer shadow-2xs flex items-center justify-center touch-target-min"
            aria-label={t.themeToggle}
            title={t.themeToggle}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* User Auth */}
          <div className="relative" ref={menuRef}>
            {isAuthenticated && user ? (
              <div>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1.5 p-1 pl-1.5 pr-2 rounded-full border border-slate-200/80 dark:border-white/[0.08] glass-card hover:bg-slate-50 dark:hover:bg-white/[0.06] transition-all cursor-pointer shadow-2xs"
                >
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover border border-slate-300 dark:border-white/20"
                  />
                  <span className="text-xs font-bold text-slate-900 dark:text-white max-w-[70px] truncate hidden sm:inline">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#0c1020] border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in duration-150 space-y-1">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-[#8E9DBE] truncate">{user.email}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        onNavigateToProfile?.();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-[#8E9DBE] hover:bg-slate-50 dark:hover:bg-white/[0.05] hover:text-slate-900 dark:hover:text-white flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-slate-600 dark:text-white" />
                      <span>{t.myAccount}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 cursor-pointer"
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
                className="btn-nubair-primary py-2 px-3 sm:px-4 text-xs font-bold"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.signIn}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Dedicated Desktop Sub-Header Navigation Row (Symmetrical, Spacious & Beautiful) */}
      <nav className="hidden lg:flex w-full border-t border-slate-200/70 dark:border-white/[0.08] bg-slate-50/70 dark:bg-black/20" aria-label="Desktop Navigation">
        <div className="w-full max-w-5xl mx-auto px-4 py-2 flex items-center justify-center gap-2 xl:gap-3">
          {[
            { key: 'explore' as TabKey, icon: Compass, label: l('Keşfet & Vize', 'Explore Visas', 'Visa Entdecken', 'Explorar y Visados', 'Визы и Страны') },
            { key: 'plan' as TabKey, icon: Route, label: l('Rota & Sinerji', 'Route & Synergy', 'Routenplaner', 'Ruta y Sinergia', 'Маршруты') },
            { key: 'track' as TabKey, icon: Calendar, label: l('Gün & Kalış Sayacı', 'Stay & Day Tracker', 'Tage- & Aufenthaltstracker', 'Control de Estancia y Días', 'Счетчик Дней и Пребывания') },
            { key: 'nomad' as TabKey, icon: Sparkles, label: l('Dijital Göçebe', 'Digital Nomad', 'Digitale Nomaden', 'Nómada Digital', 'Цифровой Номад') },
            { key: 'profile' as TabKey, icon: User, label: l('Profil & Cüzdan', 'Profile & Vault', 'Mein Profil', 'Perfil y Cartera', 'Профиль и Кошелек') },
            { key: 'consular' as TabKey, icon: ShieldAlert, label: l('Konsolosluk Destek', 'Consular Support', 'Konsular-Hilfe', 'Apoyo Consular', 'Консульская Помощь'), crisis: true },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onSelectTab?.(item.key)}
                className={`flex items-center gap-2 px-4 xl:px-5 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? item.crisis
                      ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 shadow-xs'
                      : 'bg-teal-600 text-white shadow-xs'
                    : item.crisis
                    ? 'text-rose-600/80 hover:text-rose-600 hover:bg-rose-500/10'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? (item.crisis ? 'text-rose-600 dark:text-rose-400' : 'text-white') : (item.crisis ? 'text-rose-500/70' : 'text-slate-400 dark:text-slate-500')}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
