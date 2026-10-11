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
  SlidersHorizontal,
  Compass
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
}

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
  const menuRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchPlaceholder = l(
    'Herhangi bir destinasyon, vize kuralı veya dijital göçebe ülkesi ara...',
    'Search any destination, visa rule, or digital nomad country...',
    'Reiseziel, Visabestimmung oder Nomadenland suchen...'
  );

  return (
    <header className="sticky top-0 z-30 topbar-glass transition-all w-full">
      <div className="w-full px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left Section: Mobile Hamburger Drawer & Quick View Title */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Mobile Hamburger Drawer Trigger */}
          <button
            type="button"
            onClick={onToggleMobileDrawer}
            className="lg:hidden p-2 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] glass-card text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors shadow-2xs"
            aria-label="Toggle navigation drawer"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Quick Citizenship Tag Capsule (visible on mobile / tablet when sidebar is hidden) */}
          <button
            type="button"
            onClick={onOpenPassportSelector}
            className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200/80 dark:border-white/[0.08] glass-card text-xs font-bold text-slate-800 dark:text-slate-200 shadow-2xs cursor-pointer hover:border-rose-400/40"
          >
            <span className="text-xl leading-none">{getFlag(currentPassport)}</span>
            <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">{currentPassport}</span>
          </button>
        </div>

        {/* Center Section: Thick, Inviting Concierge Search Bar Focal Point */}
        <div className="flex-1 max-w-xl mx-auto">
          <div className="relative group">
            <div className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#8E9DBE] group-focus-within:text-[#FF6B6B] transition-colors pointer-events-none">
              <Search className="w-4.5 h-4.5" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-12 pr-11 py-3 sm:py-3.5 text-xs sm:text-sm rounded-full border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#111625]/90 text-[#1A1D20] dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#7A89A6] focus:outline-none focus:border-[#FF6B6B]/40 dark:focus:border-[#FF6B6B]/40 focus:ring-4 focus:ring-[#FF6B6B]/10 dark:focus:ring-[#FF6B6B]/15 shadow-sm hover:border-slate-300 dark:hover:border-white/20 transition-all font-medium"
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

        {/* Right Section: Seamless User Profile, Multi-Language & Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          {/* Regulation Verification Audit Console Button */}
          {onOpenAuditConsole && (
            <button
              type="button"
              onClick={onOpenAuditConsole}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-emerald-500/25 bg-emerald-50/70 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-2xs transition-all cursor-pointer"
              title={t.auditConsoleTitle}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{t.auditVerifiedBadge}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </button>
          )}

          {/* Modular Multi-Language Selector */}
          <div className="relative" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-slate-200/80 dark:border-white/[0.08] glass-card text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/[0.06] transition-all cursor-pointer shadow-2xs"
              title={t.languageSelect}
            >
              <span>{SUPPORTED_LANGUAGES.find(l => l.code === language)?.flag || '🌐'}</span>
              <span className="uppercase text-[11px] font-extrabold">{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 glass-card bg-white/95 dark:bg-[#111833]/95 backdrop-blur-2xl border border-slate-200/80 dark:border-white/[0.08] rounded-2xl shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
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

          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2.5 rounded-full border border-slate-200/80 dark:border-white/[0.08] glass-card hover:bg-slate-50 dark:hover:bg-white/[0.06] text-slate-600 dark:text-[#8E9DBE] hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer shadow-2xs"
            aria-label={t.themeToggle}
            title={t.themeToggle}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* User Profile & Auth Trigger */}
          <div className="relative" ref={menuRef}>
            {isAuthenticated && user ? (
              <div>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-full border border-slate-200/80 dark:border-white/[0.08] glass-card hover:bg-slate-50 dark:hover:bg-white/[0.06] transition-all cursor-pointer shadow-2xs"
                >
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover border border-slate-300 dark:border-white/20"
                  />
                  <span className="text-xs font-bold text-slate-900 dark:text-white max-w-[80px] sm:max-w-[100px] truncate hidden sm:inline">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-card bg-white/95 dark:bg-[#111833]/95 backdrop-blur-2xl border border-slate-200/80 dark:border-white/[0.08] rounded-2xl shadow-xl p-2 z-50 animate-in fade-in duration-150 space-y-1">
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
                className="btn-nubair-primary py-2 px-4 text-xs font-bold"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.signIn}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
