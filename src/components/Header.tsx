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
  Menu,
  Clock,
  ArrowRightLeft,
  DollarSign,
  Globe,
  Sparkles
} from 'lucide-react';
import { getFlag, getCountryName } from '../data/passportData';
import { useI18n, SUPPORTED_LANGUAGES } from '../data/i18n';
import { useAuth } from '../context/AuthContext';
import { convertCurrency, formatCurrencyValue } from '../data/currencyRates';
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
}

// Major global financial & travel hubs for live clock
const WORLD_HUBS = [
  { city: 'London', flag: '🇬🇧', tz: 'Europe/London', country: { tr: 'Londra', en: 'London', de: 'London', es: 'Londres', ru: 'Лондон' } },
  { city: 'Istanbul', flag: '🇹🇷', tz: 'Europe/Istanbul', country: { tr: 'İstanbul', en: 'Istanbul', de: 'Istanbul', es: 'Estambul', ru: 'Стамбул' } },
  { city: 'New York', flag: '🇺🇸', tz: 'America/New_York', country: { tr: 'New York', en: 'New York', de: 'New York', es: 'Nueva York', ru: 'Нью-Йорк' } },
  { city: 'Tokyo', flag: '🇯🇵', tz: 'Asia/Tokyo', country: { tr: 'Tokyo', en: 'Tokyo', de: 'Tokio', es: 'Tokio', ru: 'Токио' } },
  { city: 'Dubai', flag: '🇦🇪', tz: 'Asia/Dubai', country: { tr: 'Dubai', en: 'Dubai', de: 'Dubai', es: 'Dubái', ru: 'Дубай' } },
  { city: 'Frankfurt', flag: '🇩🇪', tz: 'Europe/Berlin', country: { tr: 'Frankfurt', en: 'Frankfurt', de: 'Frankfurt', es: 'Fráncfort', ru: 'Франкфурт' } }
];

const FX_TARGET_CURRENCIES = [
  { code: 'GBP', symbol: '£', flag: '🇬🇧', name: 'İngiliz Sterlini' },
  { code: 'EUR', symbol: '€', flag: '🇪🇺', name: 'Euro' },
  { code: 'USD', symbol: '$', flag: '🇺🇸', name: 'Amerikan Doları' },
  { code: 'TRY', symbol: '₺', flag: '🇹🇷', name: 'Türk Lirası' },
  { code: 'AED', symbol: 'د.إ', flag: '🇦🇪', name: 'BAE Dirhemi' },
  { code: 'JPY', symbol: '¥', flag: '🇯🇵', name: 'Japon Yeni' },
  { code: 'GEL', symbol: '₾', flag: '🇬🇪', name: 'Gürcistan Larisi' },
  { code: 'THB', symbol: '฿', flag: '🇹🇭', name: 'Tayland Bahtı' }
];

export const Header: React.FC<HeaderProps> = ({
  currentPassport,
  onOpenPassportSelector,
  onOpenLegalModal,
  onOpenAuditConsole,
  isDark,
  onToggleTheme,
  onNavigateToProfile,
  searchQuery = '',
  onSearchChange,
  onToggleMobileDrawer,
  activeTab = 'explore'
}) => {
  const { language, setLanguage, l, t } = useI18n();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [clockOpen, setClockOpen] = useState(false);
  const [fxOpen, setFxOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [now, setNow] = useState<Date>(() => new Date());

  // FX quick converter internal state
  const [fxAmount, setFxAmount] = useState<number>(100);
  const [fxBase, setFxBase] = useState<'GBP' | 'EUR' | 'USD' | 'TRY'>('GBP');

  const menuRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLDivElement>(null);
  const fxRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  // Live ticking clock for World Clock
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Click outside to close modals
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
      if (langRef.current && !langRef.current.contains(target)) {
        setLangMenuOpen(false);
      }
      if (clockRef.current && !clockRef.current.contains(target)) {
        setClockOpen(false);
      }
      if (fxRef.current && !fxRef.current.contains(target)) {
        setFxOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto focus on mobile search input when expanded
  useEffect(() => {
    if (mobileSearchOpen) {
      setTimeout(() => mobileInputRef.current?.focus(), 50);
    }
  }, [mobileSearchOpen]);

  const searchPlaceholder = l(
    'Herhangi bir destinasyon veya vize kuralı ara...',
    'Search any destination, visa rule or country...',
    'Reiseziel oder Visabestimmung suchen...',
    'Buscar cualquier destino o regla de visado...',
    'Поиск направления или визового правила...'
  );

  return (
    <header className="sticky top-0 z-30 topbar-glass transition-all w-full border-b border-slate-200/70 dark:border-white/[0.08] backdrop-blur-2xl bg-white/80 dark:bg-[#0c101d]/85">
      <div className="w-full px-3 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-2.5 sm:gap-4">
        {/* Left Section: Mobile Hamburger Drawer & Quick Passport Tag */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={onToggleMobileDrawer}
            className="lg:hidden p-2 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] glass-card text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors shadow-2xs"
            aria-label="Toggle navigation drawer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={onOpenPassportSelector}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200/80 dark:border-white/[0.08] glass-card text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 shadow-2xs cursor-pointer hover:border-[#FF6B6B]/40 transition-all"
            title={l('Aktif Pasaportu Değiştir', 'Change Active Passport', 'Aktiven Reisepass ändern')}
          >
            <span className="text-xl sm:text-2xl leading-none">{getFlag(currentPassport)}</span>
            <span className="font-mono text-xs text-slate-600 dark:text-slate-300 font-extrabold">{currentPassport}</span>
          </button>
        </div>

        {/* Center Section: Desktop / Tablet Full Concierge Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-auto">
          <div className="relative group w-full">
            <div className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#8E9DBE] group-focus-within:text-[#FF6B6B] transition-colors pointer-events-none">
              <Search className="w-4.5 h-4.5" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-12 pr-11 py-3 text-sm rounded-full border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#111625]/90 text-[#1A1D20] dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#7A89A6] focus:outline-none focus:border-[#FF6B6B]/40 dark:focus:border-[#FF6B6B]/40 focus:ring-4 focus:ring-[#FF6B6B]/10 dark:focus:ring-[#FF6B6B]/15 shadow-xs hover:border-slate-300 dark:hover:border-white/20 transition-all font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange?.('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right Section: Global Tools, Language, Theme & Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Mobile Search Toggle Trigger (replaces crushed input on mobile) */}
          <button
            type="button"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className={`md:hidden p-2 rounded-full border transition-all cursor-pointer ${
              mobileSearchOpen || searchQuery
                ? 'bg-[#FF6B6B] text-white border-[#FF6B6B] shadow-xs'
                : 'border-slate-200/80 dark:border-white/[0.08] glass-card text-slate-700 dark:text-slate-300'
            }`}
            aria-label="Arama Çubuğu"
            title="Arama"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* 1. DÜNYA SAATİ (WORLD CLOCK QUICK TOOL) */}
          <div className="relative" ref={clockRef}>
            <button
              type="button"
              onClick={() => {
                setClockOpen(!clockOpen);
                setFxOpen(false);
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-full border transition-all cursor-pointer shadow-2xs ${
                clockOpen
                  ? 'bg-sky-500 text-white border-sky-500 shadow-sm'
                  : 'border-slate-200/80 dark:border-white/[0.08] glass-card text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/[0.06]'
              }`}
              title={l('Canlı Dünya Saati ve Zaman Dilimleri', 'Live World Clock & Timezones', 'Weltzeituhr')}
            >
              <Clock className="w-4 h-4 text-sky-500" />
              <span className="hidden xl:inline text-xs font-bold">{l('Dünya Saati', 'World Clock', 'Weltzeituhr')}</span>
            </button>

            {clockOpen && (
              <div className="absolute right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 mt-2 w-72 sm:w-80 glass-card bg-white/95 dark:bg-[#111833]/98 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-2xl p-3.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200/60 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-base">⏱️</span>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white">
                        {l('Canlı Dünya Saati', 'Live World Clock', 'Live-Weltzeituhr')}
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-[#8E9DBE]">
                        {l('Önemli küresel merkezlerin yerel saatleri', 'Live times across key world hubs', 'Lokale Zeiten weltweit')}
                      </p>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>

                <div className="space-y-1.5 max-h-72 overflow-y-auto pr-0.5">
                  {WORLD_HUBS.map((hub) => {
                    const timeFormatter = new Intl.DateTimeFormat('en-GB', {
                      timeZone: hub.tz,
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false
                    });
                    const hourOnly = parseInt(
                      new Intl.DateTimeFormat('en-GB', { timeZone: hub.tz, hour: '2-digit', hour12: false }).format(now),
                      10
                    );
                    const isDay = hourOnly >= 6 && hourOnly < 20;
                    const hubTimeStr = timeFormatter.format(now);
                    const hubName = hub.country[language as 'tr' | 'en' | 'de' | 'es' | 'ru'] || hub.city;

                    return (
                      <div
                        key={hub.city}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-50/70 dark:bg-white/[0.03] hover:bg-slate-100/80 dark:hover:bg-white/[0.06] transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-lg">{hub.flag}</span>
                          <div className="truncate">
                            <div className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                              {hub.city}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-[#8E9DBE] truncate">
                              {hubName}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-right flex-shrink-0">
                          <span className="text-xs" title={isDay ? 'Gündüz (Daytime)' : 'Gece (Nighttime)'}>
                            {isDay ? '☀️' : '🌙'}
                          </span>
                          <span className="font-mono text-xs sm:text-sm font-black text-slate-900 dark:text-white bg-white/80 dark:bg-black/30 px-2 py-0.5 rounded-lg border border-slate-200/50 dark:border-white/10">
                            {hubTimeStr}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 2. DÖVİZ ÇEVİRİCİ (GLOBAL FX QUICK CONVERTER) */}
          <div className="relative" ref={fxRef}>
            <button
              type="button"
              onClick={() => {
                setFxOpen(!fxOpen);
                setClockOpen(false);
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-full border transition-all cursor-pointer shadow-2xs ${
                fxOpen
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'border-slate-200/80 dark:border-white/[0.08] glass-card text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/[0.06]'
              }`}
              title={l('Hızlı Döviz Çevirici (GBP / EUR / USD / TRY)', 'FX Converter (GBP / EUR / USD / TRY)', 'Währungsrechner')}
            >
              <ArrowRightLeft className="w-4 h-4 text-emerald-500" />
              <span className="hidden xl:inline text-xs font-bold">{l('Döviz Çevirici', 'FX Converter', 'Währungsrechner')}</span>
            </button>

            {fxOpen && (
              <div className="absolute right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 mt-2 w-80 sm:w-96 glass-card bg-white/95 dark:bg-[#111833]/98 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/60 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-base">💱</span>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white">
                        {l('Canlı Döviz Çevirici', 'Real-Time Travel FX', 'Echtzeit-Währungsrechner')}
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-[#8E9DBE]">
                        {l('İngiliz Sterlini ve ana para birimleri', 'British Pound & global currencies', 'Britisches Pfund & Weltwährungen')}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    2026 Canlı
                  </span>
                </div>

                {/* Amount input & base switch */}
                <div className="space-y-2 mb-3.5">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        min="1"
                        value={fxAmount || ''}
                        onChange={(e) => setFxAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                        placeholder="100"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      />
                    </div>

                    <div className="flex items-center bg-slate-200/60 dark:bg-white/[0.06] p-1 rounded-xl text-xs font-extrabold gap-0.5">
                      {(['GBP', 'EUR', 'USD', 'TRY'] as const).map((curr) => (
                        <button
                          key={curr}
                          type="button"
                          onClick={() => setFxBase(curr)}
                          className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                            fxBase === curr
                              ? 'bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-2xs font-black'
                              : 'text-slate-600 dark:text-[#8E9DBE] hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          {curr === 'GBP' ? '£' : curr === 'EUR' ? '€' : curr === 'USD' ? '$' : '₺'} {curr}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Instant converted grid */}
                <div className="grid grid-cols-2 gap-1.5 max-h-60 overflow-y-auto pr-0.5">
                  {FX_TARGET_CURRENCIES.map((curr) => {
                    const converted = convertCurrency(fxAmount, fxBase, curr.code);
                    const isBase = curr.code === fxBase;
                    return (
                      <div
                        key={curr.code}
                        className={`p-2 rounded-xl border transition-all flex items-center justify-between ${
                          isBase
                            ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-500/30'
                            : 'bg-slate-50/60 dark:bg-white/[0.02] border-slate-200/50 dark:border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span>{curr.flag}</span>
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{curr.code}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-xs font-black text-slate-900 dark:text-white">
                            {curr.symbol}{formatCurrencyValue(converted)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

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
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-full border border-slate-200/80 dark:border-white/[0.08] glass-card text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/[0.06] transition-all cursor-pointer shadow-2xs"
              title={t.languageSelect}
            >
              <span>{SUPPORTED_LANGUAGES.find(l => l.code === language)?.flag || '🌐'}</span>
              <span className="uppercase text-[11px] font-extrabold">{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 glass-card bg-white/95 dark:bg-[#111833]/98 backdrop-blur-2xl border border-slate-200/80 dark:border-white/[0.08] rounded-2xl shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {SUPPORTED_LANGUAGES.map(opt => (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => {
                      setLanguage(opt.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/[0.05] transition-colors cursor-pointer ${
                      language === opt.code
                        ? 'text-slate-950 dark:text-white font-bold bg-slate-100/70 dark:bg-white/[0.08]'
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
            className="p-2 sm:p-2.5 rounded-full border border-slate-200/80 dark:border-white/[0.08] glass-card hover:bg-slate-50 dark:hover:bg-white/[0.06] text-slate-600 dark:text-[#8E9DBE] hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer shadow-2xs"
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
                  <div className="absolute right-0 mt-2 w-56 glass-card bg-white/95 dark:bg-[#111833]/98 backdrop-blur-2xl border border-slate-200/80 dark:border-white/[0.08] rounded-2xl shadow-xl p-2 z-50 animate-in fade-in duration-150 space-y-1">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-white/[0.08]">
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

      {/* DEDICATED FULL-WIDTH MOBILE SEARCH ROW:
          Completely solves the cramped search issue where text was cut off on small screens */}
      {(mobileSearchOpen || searchQuery) && (
        <div className="md:hidden px-3.5 pb-3 pt-1 border-t border-slate-100 dark:border-white/5 animate-in slide-in-from-top-1 duration-150">
          <div className="relative w-full">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF6B6B] pointer-events-none">
              <Search className="w-5 h-5" />
            </div>
            <input
              ref={mobileInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-12 pr-11 py-3 text-base rounded-2xl border border-slate-300 dark:border-white/15 bg-white dark:bg-[#111625] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-[#FF6B6B]/20 focus:border-[#FF6B6B] shadow-sm font-medium"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => onSearchChange?.('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
                aria-label="Aramayı Temizle"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setMobileSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
