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
import { convertCurrency, formatCurrencyValue, getCrossRate } from '../data/currencyRates';
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

// Comprehensive global travel hubs for live world clock
const ALL_WORLD_HUBS = [
  // Europe
  { city: 'London', flag: '🇬🇧', tz: 'Europe/London', country: { tr: 'Birleşik Krallık', en: 'United Kingdom', de: 'Großbritannien', es: 'Reino Unido', ru: 'Великобритания' }, region: 'Europe' },
  { city: 'Istanbul', flag: '🇹🇷', tz: 'Europe/Istanbul', country: { tr: 'Türkiye', en: 'Turkey', de: 'Türkei', es: 'Turquía', ru: 'Турция' }, region: 'Europe' },
  { city: 'Frankfurt', flag: '🇩🇪', tz: 'Europe/Berlin', country: { tr: 'Almanya', en: 'Germany', de: 'Deutschland', es: 'Alemania', ru: 'Германия' }, region: 'Europe' },
  { city: 'Paris', flag: '🇫🇷', tz: 'Europe/Paris', country: { tr: 'Fransa', en: 'France', de: 'Frankreich', es: 'Francia', ru: 'Франция' }, region: 'Europe' },
  { city: 'Rome', flag: '🇮🇹', tz: 'Europe/Rome', country: { tr: 'İtalya', en: 'Italy', de: 'Italien', es: 'Italia', ru: 'Италия' }, region: 'Europe' },
  { city: 'Madrid', flag: '🇪🇸', tz: 'Europe/Madrid', country: { tr: 'İspanya', en: 'Spain', de: 'Spanien', es: 'España', ru: 'Испания' }, region: 'Europe' },
  { city: 'Amsterdam', flag: '🇳🇱', tz: 'Europe/Amsterdam', country: { tr: 'Hollanda', en: 'Netherlands', de: 'Niederlande', es: 'Países Bajos', ru: 'Нидерланды' }, region: 'Europe' },
  { city: 'Athens', flag: '🇬🇷', tz: 'Europe/Athens', country: { tr: 'Yunanistan', en: 'Greece', de: 'Griechenland', es: 'Grecia', ru: 'Греция' }, region: 'Europe' },
  { city: 'Vienna', flag: '🇦🇹', tz: 'Europe/Vienna', country: { tr: 'Avusturya', en: 'Austria', de: 'Österreich', es: 'Austria', ru: 'Австрия' }, region: 'Europe' },
  { city: 'Zurich', flag: '🇨🇭', tz: 'Europe/Zurich', country: { tr: 'İsviçre', en: 'Switzerland', de: 'Schweiz', es: 'Suiza', ru: 'Швейцария' }, region: 'Europe' },
  { city: 'Prague', flag: '🇨🇿', tz: 'Europe/Prague', country: { tr: 'Çekya', en: 'Czech Republic', de: 'Tschechien', es: 'Chequia', ru: 'Чехия' }, region: 'Europe' },
  { city: 'Warsaw', flag: '🇵🇱', tz: 'Europe/Warsaw', country: { tr: 'Polonya', en: 'Poland', de: 'Polen', es: 'Polonia', ru: 'Польша' }, region: 'Europe' },
  { city: 'Lisbon', flag: '🇵🇹', tz: 'Europe/Lisbon', country: { tr: 'Portekiz', en: 'Portugal', de: 'Portugal', es: 'Portugal', ru: 'Португалия' }, region: 'Europe' },
  { city: 'Dublin', flag: '🇮🇪', tz: 'Europe/Dublin', country: { tr: 'İrlanda', en: 'Ireland', de: 'Irland', es: 'Irlanda', ru: 'Ирландия' }, region: 'Europe' },
  { city: 'Belgrade', flag: '🇷🇸', tz: 'Europe/Belgrade', country: { tr: 'Sırbistan', en: 'Serbia', de: 'Serbien', es: 'Serbia', ru: 'Сербия' }, region: 'Europe' },
  { city: 'Sarajevo', flag: '🇧🇦', tz: 'Europe/Sarajevo', country: { tr: 'Bosna-Hersek', en: 'Bosnia & Herzegovina', de: 'Bosnien-Herzegowina', es: 'Bosnia y Herzegovina', ru: 'Босния и Герцеговина' }, region: 'Europe' },
  { city: 'Tirana', flag: '🇦🇱', tz: 'Europe/Tirane', country: { tr: 'Arnavutluk', en: 'Albania', de: 'Albanien', es: 'Albania', ru: 'Албания' }, region: 'Europe' },
  { city: 'Tbilisi', flag: '🇬🇪', tz: 'Asia/Tbilisi', country: { tr: 'Gürcistan', en: 'Georgia', de: 'Georgien', es: 'Georgia', ru: 'Грузия' }, region: 'Europe' },
  { city: 'Baku', flag: '🇦🇿', tz: 'Asia/Baku', country: { tr: 'Azerbaycan', en: 'Azerbaijan', de: 'Aserbaidschan', es: 'Azerbaiyán', ru: 'Азербайджан' }, region: 'Europe' },
  { city: 'Yerevan', flag: '🇦🇲', tz: 'Asia/Yerevan', country: { tr: 'Ermenistan', en: 'Armenia', de: 'Armenien', es: 'Armenia', ru: 'Армения' }, region: 'Europe' },

  // Americas
  { city: 'New York', flag: '🇺🇸', tz: 'America/New_York', country: { tr: 'ABD (Doğu)', en: 'USA (East)', de: 'USA (Ost)', es: 'EE. UU. (Este)', ru: 'США (Восток)' }, region: 'Americas' },
  { city: 'Los Angeles', flag: '🇺🇸', tz: 'America/Los_Angeles', country: { tr: 'ABD (Batı)', en: 'USA (West)', de: 'USA (West)', es: 'EE. UU. (Oeste)', ru: 'США (Запад)' }, region: 'Americas' },
  { city: 'Toronto', flag: '🇨🇦', tz: 'America/Toronto', country: { tr: 'Kanada', en: 'Canada', de: 'Kanada', es: 'Canadá', ru: 'Канада' }, region: 'Americas' },
  { city: 'Mexico City', flag: '🇲🇽', tz: 'America/Mexico_City', country: { tr: 'Meksika', en: 'Mexico', de: 'Mexiko', es: 'México', ru: 'Мексика' }, region: 'Americas' },
  { city: 'São Paulo', flag: '🇧🇷', tz: 'America/Sao_Paulo', country: { tr: 'Brezilya', en: 'Brazil', de: 'Brasilien', es: 'Brasil', ru: 'Бразилия' }, region: 'Americas' },
  { city: 'Buenos Aires', flag: '🇦🇷', tz: 'America/Argentina/Buenos_Aires', country: { tr: 'Arjantin', en: 'Argentina', de: 'Argentinien', es: 'Argentina', ru: 'Аргентина' }, region: 'Americas' },
  { city: 'Bogota', flag: '🇨🇴', tz: 'America/Bogota', country: { tr: 'Kolombiya', en: 'Colombia', de: 'Kolumbien', es: 'Colombia', ru: 'Колумбия' }, region: 'Americas' },

  // Asia & Pacific
  { city: 'Tokyo', flag: '🇯🇵', tz: 'Asia/Tokyo', country: { tr: 'Japonya', en: 'Japan', de: 'Japan', es: 'Japón', ru: 'Япония' }, region: 'Asia' },
  { city: 'Seoul', flag: '🇰🇷', tz: 'Asia/Seoul', country: { tr: 'Güney Kore', en: 'South Korea', de: 'Südkorea', es: 'Corea del Sur', ru: 'Южная Корея' }, region: 'Asia' },
  { city: 'Singapore', flag: '🇸🇬', tz: 'Asia/Singapore', country: { tr: 'Singapur', en: 'Singapore', de: 'Singapur', es: 'Singapur', ru: 'Сингапур' }, region: 'Asia' },
  { city: 'Bangkok', flag: '🇹🇭', tz: 'Asia/Bangkok', country: { tr: 'Tayland', en: 'Thailand', de: 'Thailand', es: 'Tailandia', ru: 'Таиланд' }, region: 'Asia' },
  { city: 'Hong Kong', flag: '🇭🇰', tz: 'Asia/Hong_Kong', country: { tr: 'Hong Kong', en: 'Hong Kong', de: 'Hongkong', es: 'Hong Kong', ru: 'Гонконг' }, region: 'Asia' },
  { city: 'Kuala Lumpur', flag: '🇲🇾', tz: 'Asia/Kuala_Lumpur', country: { tr: 'Malezya', en: 'Malaysia', de: 'Malaysia', es: 'Malasia', ru: 'Малайзия' }, region: 'Asia' },
  { city: 'Bali (Denpasar)', flag: '🇮🇩', tz: 'Asia/Makassar', country: { tr: 'Endonezya', en: 'Indonesia', de: 'Indonesien', es: 'Indonesia', ru: 'Индонезия' }, region: 'Asia' },
  { city: 'Sydney', flag: '🇦🇺', tz: 'Australia/Sydney', country: { tr: 'Avustralya', en: 'Australia', de: 'Australien', es: 'Australia', ru: 'Австралия' }, region: 'Asia' },
  { city: 'Auckland', flag: '🇳🇿', tz: 'Pacific/Auckland', country: { tr: 'Yeni Zelanda', en: 'New Zealand', de: 'Neuseeland', es: 'Nueva Zelanda', ru: 'Новая Зеландия' }, region: 'Asia' },
  { city: 'Delhi / Mumbai', flag: '🇮🇳', tz: 'Asia/Kolkata', country: { tr: 'Hindistan', en: 'India', de: 'Indien', es: 'India', ru: 'Индия' }, region: 'Asia' },
  { city: 'Almaty', flag: '🇰🇿', tz: 'Asia/Almaty', country: { tr: 'Kazakistan', en: 'Kazakhstan', de: 'Kasachstan', es: 'Kazajistán', ru: 'Казахстан' }, region: 'Asia' },
  { city: 'Tashkent', flag: 'UZ', tz: 'Asia/Tashkent', country: { tr: 'Özbekistan', en: 'Uzbekistan', de: 'Usbekistan', es: 'Uzbekistán', ru: 'Узбекистан' }, region: 'Asia' },

  // Middle East & Africa
  { city: 'Dubai', flag: '🇦🇪', tz: 'Asia/Dubai', country: { tr: 'Birleşik Arap Emirlikleri', en: 'UAE', de: 'VAE', es: 'EAU', ru: 'ОАЭ' }, region: 'Middle East' },
  { city: 'Doha', flag: '🇶🇦', tz: 'Asia/Qatar', country: { tr: 'Katar', en: 'Qatar', de: 'Katar', es: 'Catar', ru: 'Катар' }, region: 'Middle East' },
  { city: 'Riyadh', flag: '🇸🇦', tz: 'Asia/Riyadh', country: { tr: 'Suudi Arabistan', en: 'Saudi Arabia', de: 'Saudi-Arabien', es: 'Arabia Saudita', ru: 'Саудовская Аравия' }, region: 'Middle East' },
  { city: 'Cairo', flag: '🇪🇬', tz: 'Africa/Cairo', country: { tr: 'Mısır', en: 'Egypt', de: 'Ägypten', es: 'Egipto', ru: 'Египет' }, region: 'Africa' },
  { city: 'Cape Town', flag: '🇿🇦', tz: 'Africa/Johannesburg', country: { tr: 'Güney Afrika', en: 'South Africa', de: 'Südafrika', es: 'Sudáfrica', ru: 'ЮАР' }, region: 'Africa' }
];

const ALL_POPULAR_CURRENCIES = [
  { code: 'GBP', symbol: '£', flag: '🇬🇧', name: 'GBP - British Pound' },
  { code: 'EUR', symbol: '€', flag: '🇪🇺', name: 'EUR - Euro' },
  { code: 'USD', symbol: '$', flag: '🇺🇸', name: 'USD - US Dollar' },
  { code: 'TRY', symbol: '₺', flag: '🇹🇷', name: 'TRY - Türk Lirası' },
  { code: 'GEL', symbol: '₾', flag: '🇬🇪', name: 'GEL - Georgian Lari' },
  { code: 'AED', symbol: 'د.إ', flag: '🇦🇪', name: 'AED - UAE Dirham' },
  { code: 'JPY', symbol: '¥', flag: '🇯🇵', name: 'JPY - Japanese Yen' },
  { code: 'THB', symbol: '฿', flag: '🇹🇭', name: 'THB - Thai Baht' },
  { code: 'CHF', symbol: 'CHF', flag: '🇨🇭', name: 'CHF - Swiss Franc' },
  { code: 'CAD', symbol: 'C$', flag: '🇨🇦', name: 'CAD - Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', flag: '🇦🇺', name: 'AUD - Australian Dollar' },
  { code: 'RSD', symbol: 'дин', flag: '🇷🇸', name: 'RSD - Serbian Dinar' },
  { code: 'BAM', symbol: 'KM', flag: '🇧🇦', name: 'BAM - Bosnian Mark' },
  { code: 'ALL', symbol: 'L', flag: '🇦🇱', name: 'ALL - Albanian Lek' },
  { code: 'BGN', symbol: 'лв', flag: '🇧🇬', name: 'BGN - Bulgarian Lev' },
  { code: 'AZN', symbol: '₼', flag: '🇦🇿', name: 'AZN - Azerbaijani Manat' },
  { code: 'KZT', symbol: '₸', flag: '🇰🇿', name: 'KZT - Kazakhstani Tenge' },
  { code: 'UZS', symbol: 'soʻm', flag: '🇺🇿', name: 'UZS - Uzbek Som' },
  { code: 'EGP', symbol: 'E£', flag: '🇪🇬', name: 'EGP - Egyptian Pound' },
  { code: 'MAD', symbol: 'DH', flag: '🇲🇦', name: 'MAD - Moroccan Dirham' },
  { code: 'SGD', symbol: 'S$', flag: '🇸🇬', name: 'SGD - Singapore Dollar' },
  { code: 'KRW', symbol: '₩', flag: '🇰🇷', name: 'KRW - South Korean Won' },
  { code: 'INR', symbol: '₹', flag: '🇮🇳', name: 'INR - Indian Rupee' },
  { code: 'IDR', symbol: 'Rp', flag: '🇮🇩', name: 'IDR - Indonesian Rupiah' },
  { code: 'BRL', symbol: 'R$', flag: '🇧🇷', name: 'BRL - Brazilian Real' },
  { code: 'MXN', symbol: 'Mex$', flag: '🇲🇽', name: 'MXN - Mexican Peso' },
  { code: 'SAR', symbol: '﷼', flag: '🇸🇦', name: 'SAR - Saudi Riyal' },
  { code: 'QAR', symbol: 'QR', flag: '🇶🇦', name: 'QAR - Qatari Riyal' },
  { code: 'PLN', symbol: 'zł', flag: '🇵🇱', name: 'PLN - Polish Zloty' },
  { code: 'CZK', symbol: 'Kč', flag: '🇨🇿', name: 'CZK - Czech Koruna' },
  { code: 'HUF', symbol: 'Ft', flag: '🇭🇺', name: 'HUF - Hungarian Forint' },
  { code: 'SEK', symbol: 'kr', flag: '🇸🇪', name: 'SEK - Swedish Krona' },
  { code: 'NOK', symbol: 'kr', flag: '🇳🇴', name: 'NOK - Norwegian Krone' }
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
  const [fxBase, setFxBase] = useState<string>('GBP');
  const [fxTarget, setFxTarget] = useState<string>('EUR');
  const [clockSearch, setClockSearch] = useState<string>('');

  const menuRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLDivElement>(null);
  const fxRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  const handleSwapCurrencies = () => {
    const prevBase = fxBase;
    setFxBase(fxTarget);
    setFxTarget(prevBase);
  };

  const filteredWorldHubs = ALL_WORLD_HUBS.filter((hub) => {
    if (!clockSearch.trim()) return true;
    const q = clockSearch.toLowerCase().trim();
    return (
      hub.city.toLowerCase().includes(q) ||
      hub.country.tr.toLowerCase().includes(q) ||
      hub.country.en.toLowerCase().includes(q) ||
      hub.country.es.toLowerCase().includes(q) ||
      hub.country.ru.toLowerCase().includes(q) ||
      hub.country.de.toLowerCase().includes(q)
    );
  });

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
              title={l('Canlı Dünya Saati ve Zaman Dilimleri', 'Live World Clock & Timezones', 'Weltzeituhr', 'Reloj Mundial', 'Мировое время')}
            >
              <Clock className="w-4 h-4 text-sky-500" />
              <span className="hidden xl:inline text-xs font-bold">{l('Dünya Saati', 'World Clock', 'Weltzeituhr', 'Reloj Mundial', 'Мировое время')}</span>
            </button>

            {clockOpen && (
              <div className="absolute right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 mt-2 w-80 sm:w-96 bg-white dark:bg-[#0c1020] border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⏱️</span>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white">
                        {l('Canlı Dünya Saati', 'Live World Clock', 'Live-Weltzeituhr', 'Reloj Mundial en Vivo', 'Мировое время онлайн')}
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-[#8E9DBE]">
                        {l('Tüm küresel merkez ve başkentlerin anlık saati', 'Instant local times across world hubs & capitals', 'Lokale Zeiten weltweit durchsuchen', 'Horas locales en centros y capitales del mundo', 'Текущее время в мировых центрах и столицах')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>Live</span>
                  </div>
                </div>

                {/* Search Input for ANY city/country */}
                <div className="relative mb-3">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={clockSearch}
                    onChange={(e) => setClockSearch(e.target.value)}
                    placeholder={l(
                      'Şehir veya ülke ara (Tokyo, Paris, Tiflis...)',
                      'Search city or country (Tokyo, Paris, Tbilisi...)',
                      'Stadt oder Land suchen...',
                      'Buscar ciudad o país (Tokio, París, Tiflis...)',
                      'Поиск города или страны (Токио, Париж, Тбилиси...)'
                    )}
                    className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                  />
                  {clockSearch && (
                    <button
                      type="button"
                      onClick={() => setClockSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Scrollable list of filtered hubs */}
                <div className="space-y-1.5 max-h-72 overflow-y-auto pr-0.5">
                  {filteredWorldHubs.length === 0 ? (
                    <div className="text-center py-6 text-xs text-slate-500 dark:text-slate-400">
                      {l(
                        'Aramanızla eşleşen şehir veya ülke bulunamadı.',
                        'No cities or countries found matching your search.',
                        'Keine Städte oder Länder gefunden.',
                        'No se encontraron ciudades o países que coincidan.',
                        'Город или страна не найдены.'
                      )}
                    </div>
                  ) : (
                    filteredWorldHubs.map((hub) => {
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
                          className="flex items-center justify-between p-2 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-100 dark:border-slate-800/80 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-lg leading-none">{hub.flag}</span>
                            <div className="truncate">
                              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                                {hub.city}
                              </div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                                {hubName}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-right flex-shrink-0">
                            <span className="text-xs" title={isDay ? 'Gündüz (Daytime)' : 'Gece (Nighttime)'}>
                              {isDay ? '☀️' : '🌙'}
                            </span>
                            <span className="font-mono text-xs sm:text-sm font-black text-slate-900 dark:text-white bg-white dark:bg-black/50 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700/80 shadow-2xs">
                              {hubTimeStr}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                  <span>{filteredWorldHubs.length} {l('merkez listeleniyor', 'hubs listed', 'Zentren gelistet', 'centros listados', 'центров')}</span>
                  <span>{l('UTC senkronize', 'UTC synchronized', 'UTC synchronisiert', 'Sincronizado UTC', 'Синхронизировано по UTC')}</span>
                </div>
              </div>
            )}
          </div>

          {/* 2. DÖVİZ ÇEVİRİCİ (GLOBAL FX QUICK CONVERTER - ANY TO ANY) */}
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
              title={l('Hızlı Döviz Çevirici (Tüm Para Birimleri)', 'Travel FX Converter (All Currencies)', 'Währungsrechner', 'Conversor de Moneda', 'Конвертер валют')}
            >
              <ArrowRightLeft className="w-4 h-4 text-emerald-500" />
              <span className="hidden xl:inline text-xs font-bold">{l('Döviz Çevirici', 'FX Converter', 'Währungsrechner', 'Conversor de Moneda', 'Конвертер валют')}</span>
            </button>

            {fxOpen && (
              <div className="absolute right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 mt-2 w-80 sm:w-[420px] bg-white dark:bg-[#0c1020] border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-2xl p-4 sm:p-5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">💱</span>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white">
                        {l('Gelişmiş Döviz Çevirici', 'Live FX Travel Converter', 'Währungsrechner', 'Conversor de Moneda en Vivo', 'Конвертер валют онлайн')}
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-[#8E9DBE]">
                        {l('Tüm para birimleri arasında 2 yönlü anlık çevrim', 'Two-way conversion between any currency', 'Umrechnung zwischen allen Währungen', 'Conversión bidireccional entre todas las monedas', 'Двусторонняя конвертация любых валют')}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    2026 Canlı
                  </span>
                </div>

                {/* Amount Input */}
                <div className="mb-3">
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    {l('Miktar', 'Amount', 'Betrag', 'Cantidad', 'Сумма')}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={fxAmount || ''}
                    onChange={(e) => setFxAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                    placeholder="100"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono font-black text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>

                {/* 2-Way Currency Selectors with Swap Button */}
                <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-2 mb-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                      {l('Kaynak', 'From', 'Von', 'De', 'Из')}
                    </label>
                    <select
                      value={fxBase}
                      onChange={(e) => setFxBase(e.target.value)}
                      className="w-full px-2 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer"
                    >
                      {ALL_POPULAR_CURRENCIES.map((curr) => (
                        <option key={`base-${curr.code}`} value={curr.code}>
                          {curr.flag} {curr.code} ({curr.symbol})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-4 flex justify-center">
                    <button
                      type="button"
                      onClick={handleSwapCurrencies}
                      className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 transition-all cursor-pointer shadow-2xs"
                      title={l('Para birimlerini değiştir', 'Swap currencies', 'Währungen tauschen', 'Invertir monedas', 'Поменять валюты местами')}
                    >
                      <ArrowRightLeft className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                      {l('Hedef', 'To', 'Nach', 'A', 'В')}
                    </label>
                    <select
                      value={fxTarget}
                      onChange={(e) => setFxTarget(e.target.value)}
                      className="w-full px-2 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer"
                    >
                      {ALL_POPULAR_CURRENCIES.map((curr) => (
                        <option key={`target-${curr.code}`} value={curr.code}>
                          {curr.flag} {curr.code} ({curr.symbol})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Primary Result Hero Card */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/25 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      {fxAmount} {fxBase} =
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      1 {fxBase} = {getCrossRate(fxBase, fxTarget).toFixed(4)} {fxTarget}
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-700 dark:text-emerald-300 mt-1">
                    {ALL_POPULAR_CURRENCIES.find((c) => c.code === fxTarget)?.symbol || ''}
                    {formatCurrencyValue(convertCurrency(fxAmount, fxBase, fxTarget))}{' '}
                    <span className="text-sm font-sans font-extrabold text-slate-700 dark:text-slate-300">{fxTarget}</span>
                  </div>
                </div>

                {/* Quick Base Chips */}
                <div className="mb-3">
                  <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                    {l('Hızlı Seçim', 'Quick Base', 'Schnellwahl', 'Base Rápida', 'Быстрый выбор')}:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {(['GBP', 'EUR', 'USD', 'TRY', 'GEL', 'AED', 'JPY', 'SAR'] as const).map((code) => {
                      const item = ALL_POPULAR_CURRENCIES.find((c) => c.code === code);
                      const isSelected = fxBase === code;
                      return (
                        <button
                          key={code}
                          type="button"
                          onClick={() => setFxBase(code)}
                          className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-600 text-white shadow-2xs font-black'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          {item?.flag} {code}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Multi-Currency Matrix Overview */}
                <div className="border-t border-slate-100 dark:border-slate-800/80 pt-2.5">
                  <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    {l('Diğer Popüler Kurlar', 'Other Key Currencies', 'Weitere Leitwährungen', 'Otras Monedas Clave', 'Другие ключевые валюты')}:
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 max-h-40 overflow-y-auto pr-0.5">
                    {ALL_POPULAR_CURRENCIES.filter((c) => c.code !== fxBase && ['GBP', 'EUR', 'USD', 'TRY', 'GEL', 'AED', 'THB', 'JPY'].includes(c.code)).map((curr) => {
                      const converted = convertCurrency(fxAmount, fxBase, curr.code);
                      return (
                        <div
                          key={`matrix-${curr.code}`}
                          className="p-1.5 px-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">
                            <span>{curr.flag}</span>
                            <span>{curr.code}</span>
                          </div>
                          <span className="font-mono font-bold text-slate-900 dark:text-white">
                            {curr.symbol}{formatCurrencyValue(converted)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
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
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#0c1020] border border-slate-200 dark:border-slate-700/80 rounded-2xl shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {SUPPORTED_LANGUAGES.map(opt => (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => {
                      setLanguage(opt.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer ${
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
