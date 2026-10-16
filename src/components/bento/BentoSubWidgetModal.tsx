import React, { useState, Suspense, lazy } from 'react';
import {
  Search,
  ArrowLeft,
  Minus,
  Maximize2,
  Minimize2,
  X,
  Sparkles,
  ExternalLink,
  Shield,
  Plane,
  Laptop,
  PhoneCall,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { BentoWidgetId } from './BentoDashboardGrid';
import { LiveCityClock } from './BentoSecondaryWidgets';
import { getFlag, getCountryName, getCategoryBadgeLabel, CountryItem } from '../../data/passportData';
import { getPassportItems, compareDualPassports } from '../../utils/calculator';
import { getCrossRate } from '../../data/currencyRates';
import { getCountryNomadApps, getAppsByCategory, MASTER_APPS_DIRECTORY } from '../../data/rideAndDeliveryApps';
import { getCountryConciergePlan } from '../../data/travelConciergeEngine';
import { getCountryInsights } from '../../data/countryInsights';
import { getCountryGeography } from '../../data/countryGeography';
import { getCountryVisual } from '../../data/countryVisuals';
import { POPULAR_RESEARCH_COUNTRIES } from '../../data/initialCountryIndex';

const CompareTab = lazy(() =>
  import('../CompareTab').then(m => ({ default: m.CompareTab }))
);
const DayCounterTab = lazy(() =>
  import('../DayCounterTab').then(m => ({ default: m.DayCounterTab }))
);
const RoutePlannerTab = lazy(() =>
  import('../RoutePlannerTab').then(m => ({ default: m.RoutePlannerTab }))
);
const NomadToolsTab = lazy(() =>
  import('../NomadToolsTab').then(m => ({ default: m.NomadToolsTab }))
);
const WhereCanIGoTab = lazy(() =>
  import('../WhereCanIGoTab').then(m => ({ default: m.WhereCanIGoTab }))
);

interface BentoSubWidgetModalProps {
  activeWidget: { id: BentoWidgetId; subTab?: string; countryCode?: string };
  widgetStack: Array<{ id: BentoWidgetId; subTab?: string; countryCode?: string }>;
  setWidgetStack: React.Dispatch<React.SetStateAction<Array<{ id: BentoWidgetId; subTab?: string; countryCode?: string }>>>;
  isMinimized: boolean;
  isFullscreen: boolean;
  setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMinimized: React.Dispatch<React.SetStateAction<boolean>>;
  closeAllWidgets: () => void;
  goBackWidget: () => void;
  openWidget: (id: BentoWidgetId, subTab?: string, countryCode?: string) => void;
  currentPassport: string;
  secondaryPassport?: string;
  onOpenCountryDossier: (code: string) => void;
  onOpenPackingList: () => void;
  onOpenTippingCalc: () => void;
  onOpenTimezoneOverlap: () => void;
  onOpenGlobalRadar: (mode?: 'all' | 'clock' | 'weather' | 'currency', city?: string) => void;
  researchCountry: string;
  setResearchCountry: React.Dispatch<React.SetStateAction<string>>;
  appsCountry: string;
  setAppsCountry: React.Dispatch<React.SetStateAction<string>>;
  passportItems: CountryItem[];
  effectiveSecondPassport: string;
  currencyDisplay: {
    line1: string;
    line2: string;
    card1: { flag: string; code: string; name: string; value: string };
    card2: { flag: string; code: string; name: string; value: string };
    card3: { flag: string; code: string; name: string; value: string };
  };
  language: string;
  setActiveSubTab: (subTab: string) => void;
  l: (tr: string, en: string, de?: string, es?: string, ru?: string) => string;
}

export const BentoSubWidgetModal: React.FC<BentoSubWidgetModalProps> = ({
  activeWidget,
  widgetStack,
  setWidgetStack,
  isMinimized,
  isFullscreen,
  setIsFullscreen,
  setIsMinimized,
  closeAllWidgets,
  goBackWidget,
  openWidget,
  currentPassport,
  onOpenCountryDossier,
  onOpenPackingList,
  onOpenTippingCalc,
  onOpenTimezoneOverlap,
  onOpenGlobalRadar,
  researchCountry,
  setResearchCountry,
  appsCountry,
  setAppsCountry,
  passportItems,
  effectiveSecondPassport,
  currencyDisplay,
  language,
  setActiveSubTab,
  l
}) => {
  const [widgetSearch, setWidgetSearch] = useState<string>('');
  const [selectedAppCategory, setSelectedAppCategory] = useState<string>('all');

  if (!activeWidget || isMinimized) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-center ${
        isFullscreen ? 'p-0' : 'p-0 sm:p-4 md:p-6'
      } bg-[#02181C]/80 backdrop-blur-md`}
          onClick={closeAllWidgets}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${
              isFullscreen
                ? 'fixed inset-0 w-screen h-screen rounded-none max-w-none max-h-none'
                : 'relative w-full sm:max-w-4xl h-[93dvh] sm:h-[88vh] rounded-t-[32px] sm:rounded-[32px]'
            } flex flex-col overflow-hidden bg-gradient-to-b from-[#136F63] via-[#0D5C63] to-[#06373A] dark:from-[#072A36] dark:via-[#051F2B] dark:to-[#03131A] border-2 border-[#5EEAD4]/60 shadow-2xl transition-all`}
          >
            {/* 1. TOP WINDOW CONTROL BAR: [ ← Geri ] | Title | [ — ] [ ⛶ ] [ ✕ ] */}
            <div className="px-4 sm:px-6 py-4 flex items-center justify-between gap-3 border-b border-white/15 shrink-0">
              <button
                type="button"
                onClick={widgetStack.length > 1 ? goBackWidget : closeAllWidgets}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-black bg-white/20 hover:bg-[#5EEAD4] text-white hover:text-[#042F2E] border border-white/30 transition-all cursor-pointer shadow-sm shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{l('Geri', 'Back')}</span>
              </button>

              <h2 className="text-lg sm:text-2xl font-black text-white truncate text-center">
                {activeWidget.id === 'country_research' &&
                  `${getFlag(activeWidget.countryCode || researchCountry)} ${getCountryName(
                    activeWidget.countryCode || researchCountry,
                    language
                  )} ${l('Rehberi', 'Guide')}`}
                {activeWidget.id === 'radar' && l('🌍 Nereye Gidebilirim? (Dünya Radarı)', '🌍 Where Can I Go? (World Radar)')}
                {activeWidget.id === 'synergy' && l('🛂 Pasaport Sinerjisi & Karşılaştır', '🛂 Passport Synergy & Compare')}
                {activeWidget.id === 'day_counter' && l('⏳ Dünya Gün Sayacı (Tüm Dünya)', '⏳ World Day Counter (Global)')}
                {activeWidget.id === 'route_planner' && l('🗺️ Çok Duraklı Rota Planlayıcı', '🗺️ Multi-Stop Route Planner')}
                {activeWidget.id === 'currency' && l('💱 Döviz & Seyahat Bütçesi', '💱 Currency & Travel Budget')}
                {activeWidget.id === 'world_clock' && l('🕒 Dünya Saati & Rota', '🕒 World Clock & Route')}
                {activeWidget.id === 'packing' && l('🧳 Akıllı Bavul Hazırlama', '🧳 Smart Packing Checklist')}
                {activeWidget.id === 'nomad' && l('💻 Dijital Göçebe (Nomad) Rehberi', '💻 Digital Nomad Guide')}
                {activeWidget.id === 'emergency' && l('🆘 Acil Yardım & Konsolosluk', '🆘 Emergency & Embassies')}
                {activeWidget.id === 'local_apps' &&
                  `${getFlag(activeWidget.countryCode || appsCountry)} ${getCountryName(
                    activeWidget.countryCode || appsCountry,
                    language
                  )} ${l('Uygulamalar & Fırsatlar', 'Local Apps & Deals')}`}
                {activeWidget.id === 'affiliate_hub' && l('🏨 Otel, Uçak & Seyahat Fırsatları', '🏨 Flights, Hotels & Travel Deals')}
              </h2>

              {/* Window Controls: Minimize [ — ], Fullscreen [ ⛶ ], Close [ ✕ ] */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsMinimized(true)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 hover:bg-white/30 border border-white/25 text-white flex items-center justify-center cursor-pointer transition-all"
                  title={l('Küçült', 'Minimize')}
                  aria-label={l('Küçült', 'Minimize')}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 hover:bg-white/30 border border-white/25 text-white flex items-center justify-center cursor-pointer transition-all"
                  title={isFullscreen ? l('Normal Boyut', 'Restore Size') : l('Ekranı Kapla', 'Fullscreen')}
                  aria-label={isFullscreen ? l('Normal Boyut', 'Restore Size') : l('Ekranı Kapla', 'Fullscreen')}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={closeAllWidgets}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 hover:bg-rose-500 border border-white/25 text-white flex items-center justify-center cursor-pointer transition-all"
                  title={l('Kapat', 'Close')}
                  aria-label={l('Kapat', 'Close')}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. IN-WIDGET SEARCH BAR + LARGE SUB-TAB PILLS (Matching Right Phone Screen 1:1) */}
            <div className="px-4 sm:px-6 pt-3 pb-3 space-y-3 border-b border-white/15 shrink-0">
              {/* Full-width Frosted Lagoon Search Bar */}
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-[#042F2E] absolute left-4 pointer-events-none" />
                <input
                  type="search"
                  value={widgetSearch}
                  onChange={(e) => setWidgetSearch(e.target.value)}
                  placeholder={
                    activeWidget.id === 'country_research' || activeWidget.id === 'local_apps'
                      ? `${getCountryName(activeWidget.countryCode || researchCountry, language)} ${l(
                          'içinde vize, uygulama, otel veya konu ara...',
                          'search visa, apps, hotel or topic...'
                        )}`
                      : l('Bu pencere içinde ara...', 'Search inside this window...')
                  }
                  className="w-full pl-12 pr-4 py-3 rounded-full text-sm sm:text-base font-bold bg-[#CCFBF1]/90 text-[#042F2E] placeholder:text-[#0F766E] border border-[#5EEAD4] focus:outline-none focus:ring-2 focus:ring-[#5EEAD4] shadow-inner"
                />
              </div>

              {/* Large Sub-Tab Pills */}
              {(activeWidget.id === 'country_research' ||
                activeWidget.id === 'local_apps' ||
                activeWidget.id === 'affiliate_hub') && (
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
                  {[
                    { k: 'visa', label: l('🛂 Vize (60 Gün)', '🛂 Visa & Entry') },
                    { k: 'apps', label: l('📲 Uygulamalar', '📲 Local Apps') },
                    { k: 'deals', label: l('🏨 Otel & Uçak', '🏨 Hotel & Flight') },
                    { k: 'insurance', label: l('🛡️ Sigorta & eSIM', '🛡️ Insurance & eSIM') },
                    { k: 'practical', label: l('🔌 Pratik & Güvenlik', '🔌 Practical & Safety') }
                  ].map((t) => {
                    const currentSub = activeWidget.subTab || 'visa';
                    const isActive = currentSub === t.k || (currentSub === 'ride' && t.k === 'apps');
                    return (
                      <button
                        key={t.k}
                        type="button"
                        onClick={() => setActiveSubTab(t.k)}
                        className={`px-4 py-2 rounded-full text-xs sm:text-sm font-black whitespace-nowrap cursor-pointer transition-all ${
                          isActive
                            ? 'bg-[#2DD4BF] text-[#042F2E] shadow-md ring-2 ring-white/50'
                            : 'bg-[#042F2E]/50 text-white hover:bg-white/20 border border-white/20'
                        }`}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 3. SUB-WIDGET SCROLLABLE BODY */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
              {/* --- A. COUNTRY GUIDE / LOCAL APPS / AFFILIATE WINDOW (Matches Right Phone Screen 1:1) --- */}
              {(activeWidget.id === 'country_research' ||
                activeWidget.id === 'local_apps' ||
                activeWidget.id === 'affiliate_hub') &&
                (() => {
                  const targetCode = activeWidget.countryCode || researchCountry;
                  const insights = getCountryInsights(targetCode, language);
                  const geo = getCountryGeography(targetCode, language);
                  const item = passportItems.find((i) => i.c === targetCode);
                  const visual = getCountryVisual(targetCode);
                  const apps = getCountryNomadApps(targetCode, insights.transport.popularRideApps);

                  return (
                    <div className="space-y-5">
                      {/* Searchable Country Selector & Quick Switcher */}
                      <div className="space-y-2.5">
                        <div className="relative">
                          <select
                            value={targetCode}
                            onChange={(e) => {
                              const c = e.target.value;
                              setResearchCountry(c);
                              setAppsCountry(c);
                              setWidgetStack((prev) => {
                                const copy = [...prev];
                                copy[copy.length - 1] = { ...copy[copy.length - 1], countryCode: c };
                                return copy;
                              });
                            }}
                            className="w-full px-4 py-2.5 rounded-2xl bg-[#042637] text-white border-2 border-[#2DD4BF] text-xs sm:text-sm font-black appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5EEAD4] shadow-md pr-10"
                          >
                            <option value="" disabled>{l('Tüm 199 Ülke İçinden Seç...', 'Select from 199 Countries...')}</option>
                            {passportItems.map((it: CountryItem) => {
                              const code = it.c || (it as any).code || '';
                              return (
                                <option key={code} value={code} className="bg-[#042637] text-white">
                                  {getFlag(code)} {getCountryName(code, language)} ({code})
                                </option>
                              );
                            })}
                          </select>
                          <ChevronDown className="w-4 h-4 text-[#5EEAD4] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        {/* Quick Country Switcher Chips */}
                        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                          {POPULAR_RESEARCH_COUNTRIES.map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => {
                                setResearchCountry(c);
                                setAppsCountry(c);
                                setWidgetStack((prev) => {
                                  const copy = [...prev];
                                  copy[copy.length - 1] = { ...copy[copy.length - 1], countryCode: c };
                                  return copy;
                                });
                              }}
                              className={`px-3 py-1.5 rounded-full text-xs font-black whitespace-nowrap cursor-pointer transition-all shrink-0 ${
                                targetCode === c
                                  ? 'bg-[#5EEAD4] text-[#042F2E] shadow-sm ring-2 ring-white/50'
                                  : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
                              }`}
                            >
                              {getFlag(c)} {getCountryName(c, language)}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 1. Large Scenic Tropical Lagoon Photo Header with Visa Badge */}
                      <div className="relative h-48 sm:h-60 w-full rounded-[24px] overflow-hidden border-2 border-[#5EEAD4]/60 shadow-xl">
                        <img
                          src={
                            targetCode === 'TH'
                              ? 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1000&fm=webp&q=80'
                              : visual.image
                          }
                          alt={getCountryName(targetCode, language)}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#042F2E]/85 via-transparent to-[#042F2E]/35" />

                        {/* Top-Right Visa Status Pill ("60 Gün Vizesiz Giriş") */}
                        <div className="absolute top-3.5 right-3.5 px-4 py-2 rounded-full bg-[#CCFBF1] text-[#042F2E] text-xs sm:text-sm font-black shadow-lg border border-white">
                          {item ? getCategoryBadgeLabel(item, language) : l('60 Gün Vizesiz Giriş', '60 Days Visa-Free')}
                        </div>

                        {/* Bottom-Left Country Summary & Full 360 Button */}
                        <div className="absolute bottom-3.5 left-4 right-4 flex flex-wrap items-end justify-between gap-2">
                          <div>
                            <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow-md">
                              {getFlag(targetCode)} {getCountryName(targetCode, language)} · {visual.landmark}
                            </h3>
                            <p className="text-xs sm:text-sm font-bold text-[#99F6E4]">
                              {geo?.capital ? `${l('Başkent:', 'Capital:')} ${geo.capital}` : ''} · {geo?.currencyName || 'THB'} ({geo?.currencySymbol || '฿'})
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              closeAllWidgets();
                              onOpenCountryDossier(targetCode);
                            }}
                            className="px-4 py-2 rounded-full text-xs sm:text-sm font-black bg-[#2DD4BF] text-[#042F2E] hover:bg-white shadow-md cursor-pointer transition-all"
                          >
                            {l('360° Tam Ülke Dosyası →', 'Full 360° Dossier →')}
                          </button>
                        </div>
                      </div>

                      {/* === SUB-TAB 1: ALL APPS & CATEGORIZED ECOSYSTEM === */}
                      {(activeWidget.subTab === 'apps' || activeWidget.id === 'local_apps') && (
                        <div className="space-y-4">
                          {/* Horizontal Category Pill Bar */}
                          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                            {[
                              { id: 'all', label: l('🌟 Tümü (30+)', '🌟 All Apps (30+)') },
                              { id: 'flights_hotels', label: l('✈️ Uçak & Otel', '✈️ Flights & Hotels') },
                              { id: 'car_rental', label: l('🚗 Araç Kiralama', '🚗 Car Rental') },
                              { id: 'rail_ferry', label: l('🚆 Tren & Feribot', '🚆 Trains & Ferries') },
                              { id: 'ride', label: l('🛵 Taksi & Scooter', '🛵 Taxi & Scooters') },
                              { id: 'luggage_vip', label: l('🧳 Bagaj Emanet & VIP', '🧳 Luggage Storage & VIP') },
                              { id: 'insurance', label: l('🛡️ Seyahat Sigortası', '🛡️ Travel Insurance') },
                              { id: 'esim_vpn', label: l('📶 5G eSIM & İnternet', '📶 5G eSIM & Data') },
                              { id: 'navigation', label: l('🗺️ Çevrimdışı Harita', '🗺️ Offline Navigation') },
                              { id: 'delivery', label: l('🍽️ Yemek & Market', '🍽️ Food & Delivery') }
                            ].map((cat) => (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => setSelectedAppCategory(cat.id)}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-black whitespace-nowrap cursor-pointer transition-all ${
                                  selectedAppCategory === cat.id
                                    ? 'bg-[#2DD4BF] text-[#042F2E] shadow-sm'
                                    : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
                                }`}
                              >
                                {cat.label}
                              </button>
                            ))}
                          </div>

                          {/* App Cards Grid */}
                          {(() => {
                            let list = getAppsByCategory(selectedAppCategory, targetCode);
                            if (widgetSearch.trim()) {
                              const q = widgetSearch.toLocaleLowerCase('tr');
                              list = list.filter(
                                (a) =>
                                  a.name.toLocaleLowerCase('tr').includes(q) ||
                                  a.taglineTr.toLocaleLowerCase('tr').includes(q) ||
                                  a.taglineEn.toLocaleLowerCase('tr').includes(q) ||
                                  a.categoryLabelTr.toLocaleLowerCase('tr').includes(q) ||
                                  a.categoryLabelEn.toLocaleLowerCase('tr').includes(q)
                              );
                            }

                            if (list.length === 0) {
                              return (
                                <div className="p-8 text-center text-sm font-bold text-white/80 bg-white/10 rounded-2xl">
                                  {l('Bu kategoride veya aramaya uygun uygulama bulunamadı.', 'No apps found matching this category or search.')}
                                </div>
                              );
                            }

                            return (
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {list.map((app) => (
                                  <a
                                    key={app.name}
                                    href={app.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 rounded-2xl bg-white dark:bg-[#072630] border border-teal-500/25 shadow-sm hover:border-[#2DD4BF] hover:-translate-y-0.5 transition-all flex flex-col justify-between no-underline group"
                                  >
                                    <div className="flex items-start gap-3">
                                      <div
                                        style={{ background: app.logoBg, color: app.logoColor }}
                                        className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs shrink-0 shadow-sm"
                                      >
                                        {app.logoText}
                                      </div>
                                      <div className="space-y-0.5 min-w-0">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                          <h5 className="text-sm font-black text-[#042F2E] dark:text-white truncate">
                                            {app.name}
                                          </h5>
                                          <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-[#CCFBF1] dark:bg-[#042F2E] text-[#0F766E] dark:text-[#5EEAD4]">
                                            {language === 'tr' ? app.categoryLabelTr : app.categoryLabelEn}
                                          </span>
                                        </div>
                                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 line-clamp-2">
                                          {language === 'tr' ? app.taglineTr : app.taglineEn}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-xs">
                                      <span className="text-[11px] font-bold text-[#0F766E] dark:text-teal-300 line-clamp-1">
                                        💡 {language === 'tr' ? app.recommendedReasonTr : app.recommendedReasonEn}
                                      </span>
                                      <span className="shrink-0 font-black text-[#0D9488] dark:text-[#5EEAD4] group-hover:translate-x-0.5 transition-transform">
                                        {l('Aç →', 'Open →')}
                                      </span>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            );
                          })()}
                        </div>
                      )}

                      {/* === SUB-TAB 2: DEALS (OTEL & UÇAK FIRSATLARI) === */}
                      {activeWidget.subTab === 'deals' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {[
                              {
                                brand: 'WayAway & Aviasales',
                                badge: l('%5 Nakit İade', '5% Cashback'),
                                title: l('Nakit İadeli Uçak Bileti Radarı', 'Cashback Flight Search'),
                                desc: l('Tüm havayollarını tarar, en ucuz tarihleri bulur ve nakit iade verir.', 'Compare 700+ airlines with instant cashback.'),
                                cta: l('Uçuşları Karşılaştır →', 'Compare Flights →'),
                                url: 'https://wayaway.io'
                              },
                              {
                                brand: 'Skyscanner & Google Flights',
                                badge: l('En Geniş Tarama', 'Cheapest Dates'),
                                title: l('Global Uçak Bileti & Fiyat Alarmları', 'Global Flight Price Radar'),
                                desc: l('"Her Yere" arama özelliğiyle en uygun rotayı ve promosyonlu günleri listeler.', 'Search everywhere to find the cheapest escape from your city.'),
                                cta: l('Uçak Ara →', 'Search Flights →'),
                                url: 'https://www.skyscanner.com'
                              },
                              {
                                brand: 'Booking.com',
                                badge: l('Ücretsiz İptal', 'Free Cancellation'),
                                title: l('Vize Uyumlu Otel & Daire Rezervasyonu', 'Visa-Compliant Hotel Bookings'),
                                desc: l('Ön ödemesiz, ücretsiz iptalli otel rezervasyonu çıktısıyla sınırdan rahat geçin.', 'Book now, pay at check-in with free cancellation.'),
                                cta: l('Otelleri Gör →', 'View Hotels →'),
                                url: 'https://www.booking.com'
                              },
                              {
                                brand: 'Agoda',
                                badge: l('%35 Mobil İndirim', 'Up to 35% Off'),
                                title: l('Asya & Global Otel, Villa ve Tatil Köyleri', 'Hotels, Villas & Island Resorts'),
                                desc: l('Güneydoğu Asya ve Avrupa resortlarında en agresif indirim kuponları.', 'Unbeatable secret prices on luxury and budget stays.'),
                                cta: l('Fırsatları Yakala →', 'Get Secret Deals →'),
                                url: 'https://www.agoda.com'
                              },
                              {
                                brand: 'DiscoverCars & EconomyBookings',
                                badge: l('Sıfır Gizli Ücret', 'Zero Hidden Fees'),
                                title: l('150+ Ülkede Uluslararası Araç Kiralama', 'Global Car Rental Comparison'),
                                desc: l('Havalimanı terminal teslim araçlar, ücretsiz iptal ve tam kasko güvencesi.', 'Compare 500+ car rental suppliers at airport terminals.'),
                                cta: l('Araç Kirala →', 'Rent a Car →'),
                                url: 'https://www.discovercars.com'
                              },
                              {
                                brand: 'Hostelworld & Airbnb',
                                badge: l('Sosyal Gezginler', 'Social Travelers'),
                                title: l('Bütçe Dostu Hosteller & Şehir Daireleri', 'Hostels & Local Apartments'),
                                desc: l('Rezervasyon yaptığınız anda aynı şehirdeki gezgin sohbet gruplarına katılın.', 'Meet solo travelers and book authentic local apartments.'),
                                cta: l('Konaklama Bul →', 'Find Stays →'),
                                url: 'https://www.hostelworld.com'
                              }
                            ].map((deal) => (
                              <a
                                key={deal.brand}
                                href={deal.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 rounded-2xl bg-white dark:bg-[#072630] border-2 border-[#5EEAD4]/60 hover:border-[#5EEAD4] shadow-md flex flex-col justify-between gap-3 no-underline group"
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-lg font-black text-[#042F2E] dark:text-white">
                                      {deal.brand}
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-[#CCFBF1] text-[#0F766E] dark:bg-[#0D9488] dark:text-white">
                                      {deal.badge}
                                    </span>
                                  </div>
                                  <h6 className="text-xs font-black text-[#0F766E] dark:text-[#5EEAD4] mt-1">
                                    {deal.title}
                                  </h6>
                                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">
                                    {deal.desc}
                                  </p>
                                </div>
                                <div className="flex justify-end">
                                  <span className="px-4 py-2 rounded-xl text-xs font-black bg-[#0D9488] text-white group-hover:bg-[#14B8A6] transition-all">
                                    {deal.cta}
                                  </span>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* === SUB-TAB 3: INSURANCE & ESIM (SİGORTA & ESIM) === */}
                      {activeWidget.subTab === 'insurance' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {[
                              {
                                brand: 'SafetyWing Nomad Insurance',
                                badge: '30.000€ Vize Uyumlu',
                                title: l('Global Seyahat Sağlık & Kaza Sigortası', 'Global Travel Medical Coverage'),
                                desc: l('Schengen ve tüm dünya gümrüklerinde geçerli anında indirilebilir İngilizce poliçe.', 'Official visa-compliant policy accepted at worldwide borders.'),
                                url: 'https://safetywing.com/nomad-insurance',
                                cta: l('Poliçe Al →', 'Get Covered →')
                              },
                              {
                                brand: 'Heymondo & Allianz',
                                badge: '7/24 Canlı Doktor',
                                title: l('Sıfır Ön Ödemeli Sağlık & İptal Teminatı', 'Zero Deductible Medical Care'),
                                desc: l('Uygulama içinden 7/24 görüntülü doktor desteği ve doğrudan hastane ödemesi.', 'Direct billing hospital network with 24/7 in-app doctor chat.'),
                                url: 'https://heymondo.com',
                                cta: l('Sigortalan →', 'Check Plans →')
                              },
                              {
                                brand: 'Airalo 5G eSIM',
                                badge: '200+ Ülke',
                                title: l('Fiziksel SIM Değiştirmeden Anında İnternet', 'Instant Travel eSIM'),
                                desc: l('Uçaktan iner inmez QR kodla anında 5G/LTE bağlantı; sıfır dolaşım sürprizi.', 'Scan QR code and connect immediately upon landing.'),
                                url: 'https://www.airalo.com',
                                cta: l('eSIM Al →', 'Get eSIM →')
                              },
                              {
                                brand: 'Maya Mobile & Nomad',
                                badge: 'Sınırsız Veri & Hotspot',
                                title: l('Laptop & Tablet İçin Sınırsız İnternet', 'Unlimited Data + Hotspot'),
                                desc: l('Hotspot paylaşımı serbest; tüm cihazlarınızı tek eSIM üzerinden bağlayın.', 'Share unlimited 5G data across your laptop, phone, and tablet.'),
                                url: 'https://maya.net',
                                cta: l('Sınırsız eSIM →', 'Get Unlimited →')
                              },
                              {
                                brand: 'AirHelp & Compensair',
                                badge: '600€ Nakit Hak',
                                title: l('Uçuş Rötar / İptal Yasal Tazminatı', 'Up to €600 Flight Delay Claim'),
                                desc: l('Son 3 yılda geciken veya iptal edilen uçuşlarınız için ön ödemesiz nakit tazminat.', 'No win, no fee legal claim for delayed or cancelled flights.'),
                                url: 'https://www.airhelp.com',
                                cta: l('Tazminat Sorgula →', 'Claim €600 →')
                              },
                              {
                                brand: 'Bounce & Radical Storage',
                                badge: '7/24 Sigortalı Emanet',
                                title: l('Güvenli Bagaj Emanet Noktaları', 'Insured Luggage Storage'),
                                desc: l('Ağır bavulları istasyon ve şehir merkezinde emanete bırakıp eller serbest gezin.', 'Drop heavy bags after checkout with $10,000 protection.'),
                                url: 'https://usebounce.com',
                                cta: l('Bagaj Bırak →', 'Store Bags →')
                              }
                            ].map((item) => (
                              <a
                                key={item.brand}
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 rounded-2xl bg-white dark:bg-[#072630] border-2 border-[#5EEAD4]/60 hover:border-[#5EEAD4] shadow-md flex flex-col justify-between gap-3 no-underline group"
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-lg font-black text-[#042F2E] dark:text-white">
                                      {item.brand}
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-[#CCFBF1] text-[#0F766E] dark:bg-[#0D9488] dark:text-white">
                                      {item.badge}
                                    </span>
                                  </div>
                                  <h6 className="text-xs font-black text-[#0F766E] dark:text-[#5EEAD4] mt-1">
                                    {item.title}
                                  </h6>
                                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">
                                    {item.desc}
                                  </p>
                                </div>
                                <div className="flex justify-end">
                                  <span className="px-4 py-2 rounded-xl text-xs font-black bg-[#0D9488] text-white group-hover:bg-[#14B8A6] transition-all">
                                    {item.cta}
                                  </span>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* === SUB-TAB 4 & 5: VISA & PRACTICAL (Default / Other) === */}
                      {(activeWidget.subTab === 'visa' || activeWidget.subTab === 'practical') && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-5 rounded-[22px] bg-[#CCFBF1]/95 dark:bg-white/[0.06] border border-[#5EEAD4] space-y-2">
                              <h5 className="text-base font-black text-[#042F2E] dark:text-[#5EEAD4]">
                                🛂 {l('Vize & Sınır Giriş Kuralları', 'Visa & Border Entry Rules')}
                              </h5>
                              <p className="text-sm font-bold text-[#042F2E] dark:text-white leading-relaxed">
                                {l(
                                  'En az 6 ay geçerli pasaport, dönüş uçak bileti ve ilk konaklama adresinizin rezervasyon belgesi ile sorunsuz giriş yapabilirsiniz.',
                                  'Enter smoothly with at least 6 months passport validity, return flight ticket, and hotel booking.'
                                )}
                              </p>
                            </div>

                            <div className="p-5 rounded-[22px] bg-[#CCFBF1]/95 dark:bg-white/[0.06] border border-[#5EEAD4] space-y-2">
                              <h5 className="text-base font-black text-[#042F2E] dark:text-[#5EEAD4]">
                                🔌 {l('Pratik Bilgiler & Güvenlik', 'Practical Info & Safety')}
                              </h5>
                              <p className="text-sm font-bold text-[#042F2E] dark:text-white leading-relaxed">
                                {l('Priz Tipi:', 'Plug Type:')} {geo?.plugTypes || insights.plugType} ·{' '}
                                {l('Acil Numara:', 'Emergency:')} {insights.safety?.emergencyNumbers?.general || '112 / 911'} ·{' '}
                                {l('En İyi Sezon:', 'Best Season:')} {insights.bestMonths || 'Ekim - Nisan'}
                              </p>
                            </div>
                          </div>

                          {/* Quick 4 App Icons Preview */}
                          <div className="p-5 rounded-[24px] bg-[#CCFBF1] dark:bg-[#0B3B49] border-2 border-[#5EEAD4] shadow-lg space-y-3">
                            <div className="flex items-center justify-between">
                              <h5 className="text-sm sm:text-base font-black text-[#042F2E] dark:text-white">
                                {l('Öne Çıkan Popüler Seyahat Uygulamaları', 'Featured Travel Apps')}
                              </h5>
                              <button
                                type="button"
                                onClick={() => setActiveSubTab('apps')}
                                className="text-xs font-black text-[#0F766E] dark:text-[#5EEAD4] hover:underline cursor-pointer"
                              >
                                {l('Tümünü Gör (30+) →', 'View All (30+) →')}
                              </button>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {apps.slice(0, 4).map((app) => (
                                <a
                                  key={app.name}
                                  href={app.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-3 rounded-xl bg-white dark:bg-[#072630] border border-teal-500/25 flex items-center gap-2.5 no-underline shadow-xs hover:-translate-y-0.5 transition-transform"
                                >
                                  <div
                                    style={{ background: app.logoBg, color: app.logoColor }}
                                    className="w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-black shrink-0"
                                  >
                                    {app.logoText}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-xs font-black text-[#042F2E] dark:text-white truncate">
                                      {app.name}
                                    </div>
                                    <div className="text-[10px] text-[#0F766E] dark:text-teal-300 truncate">
                                      {language === 'tr' ? app.categoryLabelTr : app.categoryLabelEn}
                                    </div>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 4. Bottom Full-Width Emerald-Lagoon Action Button */}
                      <a
                        href="https://wayaway.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0D9488] via-[#0284C7] to-[#0D9488] hover:brightness-110 text-white font-black text-base sm:text-lg shadow-xl border-2 border-[#5EEAD4] flex items-center justify-center gap-2.5 no-underline transition-all"
                      >
                        <Plane className="w-5 h-5" />
                        <span>
                          {l(
                            '✈️ En Uygun Uçak & 🏨 Otel Fırsatlarını Gör',
                            '✈️ View Best Flight & 🏨 Hotel Deals'
                          )}
                        </span>
                      </a>
                    </div>
                  );
                })()}

              {/* --- B. PASSPORT SYNERGY & COMPARE SUB-WIDGET --- */}
              {activeWidget.id === 'synergy' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-[#CCFBF1] text-[#042F2E] border border-[#5EEAD4] flex flex-wrap items-center justify-between gap-3">
                    <div className="text-sm font-black">
                      💡 {l(
                        'Ülkeye tıklayarak doğrudan o ülkenin rehber penceresine geçebilirsiniz:',
                        'Tap any country to open its guide window:'
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {(['TH', 'JP', 'IT', 'GR', 'DE', 'AE', 'BR', 'KR'] as const).map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => openWidget('country_research', 'visa', c)}
                          className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-black bg-[#0F766E] text-white hover:bg-[#042F2E] transition-all cursor-pointer shadow-xs"
                        >
                          {getFlag(c)} {getCountryName(c, language)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/95 dark:bg-[#071E30] rounded-3xl p-4 sm:p-6">
                    <Suspense fallback={<div className="p-8 text-center text-base font-black">{l('Yükleniyor...', 'Loading...')}</div>}>
                      <CompareTab initialPassportA={currentPassport} initialPassportB={effectiveSecondPassport} />
                    </Suspense>
                  </div>
                </div>
              )}

              {/* --- C. WORLD DAY COUNTER SUB-WIDGET --- */}
              {activeWidget.id === 'day_counter' && (
                <div className="bg-white/95 dark:bg-[#071E30] rounded-3xl p-4 sm:p-6">
                  <Suspense fallback={<div className="p-8 text-center text-base font-black">{l('Yükleniyor...', 'Loading...')}</div>}>
                    <DayCounterTab />
                  </Suspense>
                </div>
              )}

              {/* --- D. ROUTE PLANNER SUB-WIDGET --- */}
              {activeWidget.id === 'route_planner' && (
                <div className="bg-white/95 dark:bg-[#071E30] rounded-3xl p-4 sm:p-6">
                  <Suspense fallback={<div className="p-8 text-center text-base font-black">{l('Yükleniyor...', 'Loading...')}</div>}>
                    <RoutePlannerTab currentPassport={currentPassport} />
                  </Suspense>
                </div>
              )}

              {/* --- E. WHERE CAN I GO RADAR SUB-WIDGET --- */}
              {activeWidget.id === 'radar' && (
                <div className="bg-white/95 dark:bg-[#071E30] rounded-3xl p-4 sm:p-6">
                  <Suspense fallback={<div className="p-8 text-center text-base font-black">{l('Yükleniyor...', 'Loading...')}</div>}>
                    <WhereCanIGoTab
                      currentPassport={currentPassport}
                      externalSearch={widgetSearch}
                      embedded={true}
                    />
                  </Suspense>
                </div>
              )}

              {/* --- F. DIGITAL NOMAD SUB-WIDGET --- */}
              {activeWidget.id === 'nomad' && (
                <div className="bg-white/95 dark:bg-[#071E30] rounded-3xl p-4 sm:p-6">
                  <Suspense fallback={<div className="p-8 text-center text-base font-black">{l('Yükleniyor...', 'Loading...')}</div>}>
                    <NomadToolsTab defaultSubTab="nomad" currentPassport={currentPassport} />
                  </Suspense>
                </div>
              )}

              {/* --- G. EMERGENCY & CONSULAR SUB-WIDGET --- */}
              {activeWidget.id === 'emergency' && (
                <div className="bg-white/95 dark:bg-[#071E30] rounded-3xl p-4 sm:p-6">
                  <Suspense fallback={<div className="p-8 text-center text-base font-black">{l('Yükleniyor...', 'Loading...')}</div>}>
                    <NomadToolsTab defaultSubTab="emergency" currentPassport={currentPassport} />
                  </Suspense>
                </div>
              )}

              {/* --- H. CURRENCY / WORLD CLOCK / PACKING QUICK LAUNCH --- */}
              {activeWidget.id === 'currency' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 rounded-2xl bg-[#CCFBF1] text-[#042F2E] border border-[#5EEAD4]">
                      <div className="text-sm font-extrabold">{currencyDisplay.card1.flag} 1 {currencyDisplay.card1.code} ({currencyDisplay.card1.name})</div>
                      <div className="text-3xl font-black font-mono mt-1 tabular-nums">{currencyDisplay.card1.value}</div>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#CCFBF1] text-[#042F2E] border border-[#5EEAD4]">
                      <div className="text-sm font-extrabold">{currencyDisplay.card2.flag} 1 {currencyDisplay.card2.code} ({currencyDisplay.card2.name})</div>
                      <div className="text-3xl font-black font-mono mt-1 tabular-nums">{currencyDisplay.card2.value}</div>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#CCFBF1] text-[#042F2E] border border-[#5EEAD4]">
                      <div className="text-sm font-extrabold">{currencyDisplay.card3.flag} 1 {currencyDisplay.card3.code} ({currencyDisplay.card3.name})</div>
                      <div className="text-3xl font-black font-mono mt-1 tabular-nums">{currencyDisplay.card3.value}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        closeAllWidgets();
                        onOpenGlobalRadar('currency');
                      }}
                      className="px-6 py-3.5 rounded-full text-sm font-black bg-[#5EEAD4] text-[#042F2E] cursor-pointer shadow-lg"
                    >
                      {l('Canlı Kur Hesaplayıcıyı Tam Ekran Aç →', 'Open Full Currency Converter →')}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        closeAllWidgets();
                        onOpenTippingCalc();
                      }}
                      className="px-6 py-3.5 rounded-full text-sm font-black bg-white/20 text-white border border-white/30 cursor-pointer"
                    >
                      {l('Ülkelere Göre Bahşiş Hesaplayıcı →', 'Tipping Calculator →')}
                    </button>
                  </div>
                </div>
              )}

              {activeWidget.id === 'world_clock' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    {[
                      { name: '🇹🇷 İstanbul', offset: 3 },
                      { name: '🇬🇧 Londra', offset: 1 },
                      { name: '🇯🇵 Tokyo', offset: 9 },
                      { name: '🇺🇸 New York', offset: -4 },
                      { name: '🇹🇭 Bangkok', offset: 7 },
                      { name: '🇦🇪 Dubai', offset: 4 },
                      { name: '🇩🇪 Berlin', offset: 2 },
                      { name: '🇰🇷 Seul', offset: 9 }
                    ].map((city) => (
                      <div
                        key={city.name}
                        className="p-4 rounded-2xl bg-[#CCFBF1] text-[#042F2E] border border-[#5EEAD4]"
                      >
                        <div className="text-sm font-extrabold">{city.name}</div>
                        <div className="text-2xl font-black font-mono mt-1">
                          <LiveCityClock offsetHours={city.offset} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => openWidget('route_planner', 'builder')}
                      className="px-6 py-3.5 rounded-full text-sm font-black bg-[#5EEAD4] text-[#042F2E] cursor-pointer shadow-lg"
                    >
                      {l('🗺️ Çok Duraklı Rota Planlayıcıyı Aç →', '🗺️ Open Multi-Stop Route Planner →')}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        closeAllWidgets();
                        onOpenTimezoneOverlap();
                      }}
                      className="px-6 py-3.5 rounded-full text-sm font-black bg-white/20 text-white border border-white/30 cursor-pointer"
                    >
                      {l('🕒 Mesai & Toplantı Saati Çakıştırma →', '🕒 Timezone Overlap Tool →')}
                    </button>
                  </div>
                </div>
              )}

              {activeWidget.id === 'packing' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {[
                      l('✓ En az 6 ay geçerli pasaport ve fotokopisi', '✓ Passport valid for at least 6 months'),
                      l('✓ Gidiş-dönüş uçak bileti ve otel rezervasyon çıktısı', '✓ Return flight ticket & hotel booking printout'),
                      l('✓ 30.000€ kapsamlı seyahat sağlık sigortası poliçesi', '✓ Travel health insurance policy (30,000€)'),
                      l('✓ Üniversal priz adaptörü ve taşınabilir şarj (Powerbank)', '✓ Universal plug adapter & powerbank'),
                      l('✓ Yurtdışı kullanıma açık banka/kredi kartı ve acil nakit döviz', '✓ International bank card & emergency cash'),
                      l('✓ Kabin bagajı sıvı kuralına (100ml) uygun kişisel bakım çantası', '✓ Cabin-compliant (100ml) toiletry bag')
                    ].map((itemText, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-[#CCFBF1] text-[#042F2E] border border-[#5EEAD4] text-sm font-black"
                      >
                        {itemText}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      closeAllWidgets();
                      onOpenPackingList();
                    }}
                    className="px-6 py-3.5 rounded-full text-sm font-black bg-[#5EEAD4] text-[#042F2E] cursor-pointer shadow-lg"
                  >
                    {l('İnteraktif Bavul Sihirbazını Tam Ekran Aç →', 'Open Interactive Packing Wizard →')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
  );
};
