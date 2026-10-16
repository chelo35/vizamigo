/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Navigation, TabKey } from './components/Navigation';
import { ExploreTab } from './components/ExploreTab';
import {
  loadStoredPassport,
  saveStoredPassport,
  loadStoredSecondaryPassport,
  saveStoredSecondaryPassport
} from './utils/storage';
import { LanguageProvider, useI18n } from './data/i18n';
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/AuthModal';
import { GlobalFooter } from './components/footer/GlobalFooter';
import { Sparkles, X } from 'lucide-react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useSeoRouter } from './utils/seoRouter';
import { SeoHead } from './components/SeoHead';
import { NotFoundView } from './components/NotFoundView';
import { HomeHero } from './components/design/HomeHero';
import { getCountryName } from './data/passportData';
import { getPassportItems } from './utils/calculator';

// Code-split secondary tabs & modals for <0.5s instant initial render
const WhereCanIGoTab = lazy(() =>
  import('./components/WhereCanIGoTab').then(m => ({ default: m.WhereCanIGoTab }))
);
const CompareTab = lazy(() =>
  import('./components/CompareTab').then(m => ({ default: m.CompareTab }))
);
const RoutePlannerTab = lazy(() =>
  import('./components/RoutePlannerTab').then(m => ({ default: m.RoutePlannerTab }))
);
const DayCounterTab = lazy(() =>
  import('./components/DayCounterTab').then(m => ({ default: m.DayCounterTab }))
);
const NomadToolsTab = lazy(() =>
  import('./components/NomadToolsTab').then(m => ({ default: m.NomadToolsTab }))
);
const ProfileTab = lazy(() =>
  import('./components/ProfileTab').then(m => ({ default: m.ProfileTab }))
);
const WalletTab = lazy(() =>
  import('./components/WalletTab').then(m => ({ default: m.WalletTab }))
);
const BentoDashboardGrid = lazy(() =>
  import('./components/bento/BentoDashboardGrid').then(m => ({ default: m.BentoDashboardGrid }))
);
const PassportSelectModal = lazy(() =>
  import('./components/PassportSelectModal').then(m => ({ default: m.PassportSelectModal }))
);
const LegalInfoModal = lazy(() =>
  import('./components/LegalInfoModal').then(m => ({ default: m.LegalInfoModal }))
);
const RegulationAuditModal = lazy(() =>
  import('./components/RegulationAuditModal').then(m => ({ default: m.RegulationAuditModal }))
);
const ReportChangeModal = lazy(() =>
  import('./components/ReportChangeModal').then(m => ({ default: m.ReportChangeModal }))
);
const PackingListModal = lazy(() =>
  import('./components/tools/PackingListModal').then(m => ({ default: m.PackingListModal }))
);
const TippingCalculatorModal = lazy(() =>
  import('./components/tools/TippingCalculatorModal').then(m => ({ default: m.TippingCalculatorModal }))
);
const TimezoneOverlapModal = lazy(() =>
  import('./components/tools/TimezoneOverlapModal').then(m => ({ default: m.TimezoneOverlapModal }))
);
const GlobalRadarModal = lazy(() =>
  import('./components/tools/GlobalRadarModal').then(m => ({ default: m.GlobalRadarModal }))
);
const VizamigoAssistantModal = lazy(() =>
  import('./components/assistant/VizamigoAssistantModal').then(m => ({ default: m.VizamigoAssistantModal }))
);
const AssistantLauncherButton = lazy(() =>
  import('./components/assistant/AssistantLauncherButton').then(m => ({ default: m.AssistantLauncherButton }))
);

const TabLoadingSkeleton: React.FC = () => (
  <div className="h-[360px] rounded-[24px] glass-card animate-pulse p-8 space-y-4">
    <div className="h-6 w-48 rounded-full bg-slate-200/80 dark:bg-white/10" />
    <div className="h-24 w-full rounded-[20px] bg-slate-100 dark:bg-white/[0.04]" />
    <div className="h-32 w-full rounded-[20px] bg-slate-100 dark:bg-white/[0.04]" />
  </div>
);

function AppContent() {
  const { language, setLanguage, l, t } = useI18n();
  const { route, navigate } = useSeoRouter();

  const [currentPassport, setCurrentPassport] = useState<string>(() => loadStoredPassport());
  const [secondaryPassport, setSecondaryPassport] = useState<string>(() => loadStoredSecondaryPassport());
  const [activeTab, setActiveTab] = useState<TabKey>(() => route.tab || 'explore');
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(() => route.countryCode);
  const [exploreSubTab, setExploreSubTab] = useState<'all' | 'where'>('all');
  const [planSubTab, setPlanSubTab] = useState<'route' | 'compare' | 'nomad'>('route');
  const [profileSubTab, setProfileSubTab] = useState<'profile' | 'emergency'>('profile');
  const [showPromoBanner, setShowPromoBanner] = useState<boolean>(true);
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  // Dynamic visa-free & ID count for the active passport
  const visaFreeCount = React.useMemo(() => {
    try {
      const items = getPassportItems(currentPassport);
      return items.filter((it) => it.cat === 'free' || it.id).length;
    } catch {
      return 116;
    }
  }, [currentPassport]);

  // Sync tab and country with SEO history changes
  useEffect(() => {
    if (route.tab && route.tab !== activeTab) {
      setActiveTab(route.tab);
    }
  }, [route.tab]);

  useEffect(() => {
    setSelectedCountryCode(route.countryCode);
  }, [route.countryCode]);

  const handleSelectTab = (tab: TabKey) => {
    setActiveTab(tab);
    setSelectedCountryCode(null);
    navigate(language, tab, null);
  };

  const handleCountrySelect = (code: string | null) => {
    setSelectedCountryCode(code);
    navigate(language, activeTab, code);
  };

  // Modals
  const [isPassportModalOpen, setIsPassportModalOpen] = useState<boolean>(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState<boolean>(false);
  const [legalInitialTab, setLegalInitialTab] = useState<string>('terms');
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [reportingModalData, setReportingModalData] = useState<{ code: string; name: string } | null>(null);

  const openLegalModalWithTab = (tab: string = 'terms') => {
    setLegalInitialTab(tab);
    setIsLegalModalOpen(true);
  };
  const [isPackingListOpen, setIsPackingListOpen] = useState<boolean>(false);
  const [isTippingCalcOpen, setIsTippingCalcOpen] = useState<boolean>(false);
  const [isTimezoneOverlapOpen, setIsTimezoneOverlapOpen] = useState<boolean>(false);
  const [isRadarOpen, setIsRadarOpen] = useState<boolean>(false);
  const [radarInitialMode, setRadarInitialMode] = useState<'all' | 'clock' | 'weather' | 'currency'>('all');
  const [radarTargetCity, setRadarTargetCity] = useState<string | undefined>(undefined);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);

  useEffect(() => {
    (window as any).openVizamigoAssistant = () => setIsAssistantOpen(true);
    return () => {
      delete (window as any).openVizamigoAssistant;
    };
  }, []);

  const openRadar = (mode: 'all' | 'clock' | 'weather' | 'currency' = 'all', city?: string) => {
    setRadarInitialMode(mode);
    setRadarTargetCity(city);
    setIsRadarOpen(true);
  };

  // Theme
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('vr_theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('vr_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('vr_theme', 'light');
      }
    } catch {}
  }, [isDark]);

  useEffect(() => {
    try {
      document.documentElement.lang = language;
    } catch {}
  }, [language]);

  const handlePassportChange = (newCode: string) => {
    setCurrentPassport(newCode);
    saveStoredPassport(newCode);
  };

  const handleDataResetOrImported = () => {
    setCurrentPassport(loadStoredPassport());
    setSecondaryPassport(loadStoredSecondaryPassport());
  };

  return (
    <div className="app-shell-viewport min-h-[100dvh] text-[#1A1D20] dark:text-white flex font-sans selection:bg-teal-600 selection:text-white relative overflow-x-hidden transition-colors">
      {/* Dynamic Scalable Multilingual SEO Head (Canonical & 5-Language Hreflang Alternates + x-default) */}
      <SeoHead
        language={language}
        tab={activeTab}
        countryCode={selectedCountryCode}
        currentPassport={currentPassport}
        is404={route.is404}
      />

      {/* Permanent Fixed Fullscreen Luminous Ocean Blue & Turquoise Lagoon Background */}
      <div className="fixed inset-0 pointer-events-none -z-20 bg-gradient-to-br from-[#E0F2FE] via-[#BAE6FD] to-[#CCFBF1] dark:from-[#042132] dark:via-[#063A4D] dark:to-[#032030]" />

      {/* Lightweight GPU-Optimized Tropical Lagoon Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 left-1/4 w-[480px] h-[480px] bg-[#5EEAD4]/20 dark:bg-teal-400/10 rounded-full blur-3xl transform-gpu" />
        <div className="absolute top-1/3 -right-16 w-[420px] h-[420px] bg-[#38BDF8]/20 dark:bg-sky-400/10 rounded-full blur-3xl transform-gpu" />
        <div className="absolute -bottom-16 left-1/3 w-[460px] h-[460px] bg-[#2DD4BF]/15 dark:bg-emerald-400/10 rounded-full blur-3xl transform-gpu" />
        {/* Top-Left Tropical Palm Frond Silhouette */}
        <svg viewBox="0 0 260 260" className="w-56 h-56 absolute -top-8 -left-8 text-black/15 dark:text-black/30 pointer-events-none">
          <path
            fill="currentColor"
            d="M0,0 L160,30 Q110,45 55,40 L195,85 Q130,90 65,75 L210,145 Q140,140 70,115 L175,205 Q115,185 55,145 L110,245 Q65,210 25,160 Z"
          />
        </svg>
        {/* Top-Right Tropical Palm Frond Silhouette */}
        <svg viewBox="0 0 260 260" className="w-56 h-56 absolute -top-8 -right-8 text-black/15 dark:text-black/30 -scale-x-100 pointer-events-none">
          <path
            fill="currentColor"
            d="M0,0 L160,30 Q110,45 55,40 L195,85 Q130,90 65,75 L210,145 Q140,140 70,115 L175,205 Q115,185 55,145 L110,245 Q65,210 25,160 Z"
          />
        </svg>
      </div>

      {/* ========================================================
          1. NAVIGATION (MOBILE DRAWER & BOTTOM BAR)
      ======================================================== */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        currentPassport={currentPassport}
        onOpenPassportSelector={() => setIsPassportModalOpen(true)}
        onOpenAuditConsole={() => setIsAuditModalOpen(true)}
        isMobileDrawerOpen={isMobileDrawerOpen}
        onToggleMobileDrawer={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
        onOpenPackingList={() => setIsPackingListOpen(true)}
        onOpenTippingCalc={() => setIsTippingCalcOpen(true)}
        onOpenTimezoneOverlap={() => setIsTimezoneOverlapOpen(true)}
        onOpenGlobalRadar={openRadar}
      />

      {/* ========================================================
          2. MAIN CONTENT AREA (FULL-WIDTH LUXURY LAYOUT)
      ======================================================== */}
      <div className="flex flex-col flex-1 app-shell-viewport min-h-[100dvh] w-full transition-all">
        {/* Top Context & Navigation Bar */}
        <Header
          currentPassport={currentPassport}
          onOpenPassportSelector={() => setIsPassportModalOpen(true)}
          onOpenLegalModal={() => openLegalModalWithTab('terms')}
          onOpenAuditConsole={() => setIsAuditModalOpen(true)}
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
          onNavigateToProfile={() => {
            handleSelectTab('profile');
            setProfileSubTab('profile');
          }}
          searchQuery={globalSearchQuery}
          onSearchChange={(val) => {
            setGlobalSearchQuery(val);
            if (val && activeTab !== 'explore') {
              setActiveTab('explore');
            }
          }}
          onToggleMobileDrawer={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          onOpenPackingList={() => setIsPackingListOpen(true)}
          onOpenTippingCalc={() => setIsTippingCalcOpen(true)}
          onOpenTimezoneOverlap={() => setIsTimezoneOverlapOpen(true)}
          onOpenGlobalRadar={openRadar}
        />

        {/* Content Body Centered with Full Breathing Space */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6 pb-32 lg:pb-16 space-y-6">
          {route.is404 ? (
            <NotFoundView
              language={language}
              requestedPath={typeof window !== 'undefined' ? window.location.pathname : undefined}
              onGoHome={() => handleSelectTab('explore')}
            />
          ) : (
            <Suspense fallback={<TabLoadingSkeleton />}>
              {/* Tab Content: 1. KEŞFET / EXPLORE (PURE V2 LAGOON WIDGET DASHBOARD) */}
              {activeTab === 'explore' && (
                <ErrorBoundary isTabBoundary tabName={t.explore || 'Keşfet'}>
                  <div className="space-y-6">
                    {exploreSubTab === 'all' ? (
                      <ExploreTab
                        currentPassport={currentPassport}
                        onOpenAuditConsole={() => setIsAuditModalOpen(true)}
                        externalSearch={globalSearchQuery}
                        onSearchChange={setGlobalSearchQuery}
                        initialCountryCode={selectedCountryCode}
                        onCountrySelect={handleCountrySelect}
                        onNavigateTab={(tab) => {
                          handleSelectTab(tab);
                          if (tab === 'plan') setPlanSubTab('route');
                        }}
                        onOpenPackingList={() => setIsPackingListOpen(true)}
                        onOpenTippingCalc={() => setIsTippingCalcOpen(true)}
                        onOpenTimezoneOverlap={() => setIsTimezoneOverlapOpen(true)}
                        onOpenGlobalRadar={openRadar}
                        onOpenAssistant={() => setIsAssistantOpen(true)}
                      />
                    ) : (
                      <WhereCanIGoTab currentPassport={currentPassport} />
                    )}
                  </div>
                </ErrorBoundary>
              )}

          {/* Tab Content: 2. ROTA & SİNERJİ / PLAN */}
          {activeTab === 'plan' && (
            <ErrorBoundary isTabBoundary tabName={t.subTabRoutePlanner || 'Rota & Sinerji'}>
              <div className="space-y-6">
                <div className="flex items-center justify-start overflow-x-auto scrollbar-none pb-1">
                  <div className="inline-flex p-1 rounded-full bento-lagoon-card gap-1 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setPlanSubTab('route')}
                      className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                        planSubTab === 'route'
                          ? 'bg-gradient-to-r from-[#0D9488] to-[#0EA5E9] text-white shadow-xs'
                          : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {t.subTabRoutePlanner}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlanSubTab('compare')}
                      className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                        planSubTab === 'compare'
                          ? 'bg-gradient-to-r from-[#0D9488] to-[#0EA5E9] text-white shadow-xs'
                          : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {t.subTabComparePassports}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlanSubTab('nomad')}
                      className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                        planSubTab === 'nomad'
                          ? 'bg-gradient-to-r from-[#0D9488] to-[#0EA5E9] text-white shadow-xs'
                          : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {t.subTabNomadHubs}
                    </button>
                  </div>
                </div>

                {planSubTab === 'route' ? (
                  <RoutePlannerTab currentPassport={currentPassport} />
                ) : planSubTab === 'compare' ? (
                  <CompareTab
                    initialPassportA={currentPassport}
                    initialPassportB={secondaryPassport}
                  />
                ) : (
                  <NomadToolsTab defaultSubTab="nomad" currentPassport={currentPassport} />
                )}
              </div>
            </ErrorBoundary>
          )}

          {/* Tab Content: 3. CÜZDAN & DÜNYA GÜN SAYACI / TRACK */}
          {activeTab === 'track' && (
            <ErrorBoundary isTabBoundary tabName="Cüzdan & Gün Sayacı">
              <div className="space-y-8">
                <WalletTab
                  currentPassport={currentPassport}
                  secondaryPassport={secondaryPassport}
                  onChangePassport={() => setIsPassportModalOpen(true)}
                  onSelectStayTracker={() => {
                    const el = document.getElementById('vz-day-counter-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
                <div id="vz-day-counter-section">
                  <DayCounterTab />
                </div>
              </div>
            </ErrorBoundary>
          )}

          {/* Tab Content: 4. GEZGİN ARAÇLARI & DİJİTAL GÖÇEBE / NOMAD */}
          {activeTab === 'nomad' && (
            <ErrorBoundary isTabBoundary tabName="Gezgin Araçları & Göçebe">
              <div className="space-y-8">
                <BentoDashboardGrid
                  currentPassport={currentPassport}
                  secondaryPassport={secondaryPassport}
                  onOpenCountryDossier={(code) => {
                    setActiveTab('explore');
                    handleCountrySelect(code);
                  }}
                  onSelectTab={handleSelectTab}
                  onOpenPackingList={() => setIsPackingListOpen(true)}
                  onOpenTippingCalc={() => setIsTippingCalcOpen(true)}
                  onOpenTimezoneOverlap={() => setIsTimezoneOverlapOpen(true)}
                  onOpenGlobalRadar={openRadar}
                  onOpenAssistant={() => setIsAssistantOpen(true)}
                />
                <NomadToolsTab defaultSubTab="nomad" currentPassport={currentPassport} />
              </div>
            </ErrorBoundary>
          )}

          {/* Tab Content: 5. PROFİL & ARAÇLAR / PROFILE */}
          {activeTab === 'profile' && (
            <ErrorBoundary isTabBoundary tabName="Profil & Ayarlar">
              <div className="space-y-6">
                {/* Profil Sub Tabs */}
                <div className="w-full max-w-full overflow-x-auto scrollbar-none horizontal-badge-slider no-scrollbar-slider touch-pan-x pb-2 mb-3">
                  <div className="inline-flex p-1 rounded-full glass-panel border border-slate-200/80 dark:border-white/10 shadow-xs gap-1.5 whitespace-nowrap shrink-0">
                    <button
                      type="button"
                      onClick={() => setProfileSubTab('profile')}
                      className={`shrink-0 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap touch-target-min ${
                        profileSubTab === 'profile'
                          ? 'tab-chip-active'
                          : 'tab-chip-inactive'
                      }`}
                    >
                      {t.subTabWalletAndPartners}
                    </button>
                    <button
                      type="button"
                      onClick={() => setProfileSubTab('emergency')}
                      className={`shrink-0 px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap touch-target-min ${
                        profileSubTab === 'emergency'
                          ? 'tab-chip-active'
                          : 'tab-chip-inactive'
                      }`}
                    >
                      {t.subTabEmergencyDesk}
                    </button>
                  </div>
                </div>

                {profileSubTab === 'profile' ? (
                  <ProfileTab
                    currentPassport={currentPassport}
                    secondaryPassport={secondaryPassport}
                    onChangePassport={() => setIsPassportModalOpen(true)}
                    language={language}
                    onLanguageChange={(l) => {
                      setLanguage(l);
                    }}
                    onOpenLegalModal={() => openLegalModalWithTab('backup')}
                  />
                ) : (
                  <NomadToolsTab defaultSubTab="emergency" currentPassport={currentPassport} />
                )}
              </div>
            </ErrorBoundary>
          )}

          {/* Tab Content: 5. KONSOLOSLUK & DİPLOMATİK KRİZ MASASI / CONSULAR */}
          {activeTab === 'consular' && (
            <ErrorBoundary isTabBoundary tabName="Konsolosluk & Kriz Masası">
              <NomadToolsTab defaultSubTab="emergency" currentPassport={currentPassport} />
            </ErrorBoundary>
          )}
        </Suspense>
      )}


        {/* Sınırlı Reklam & Gezgin Sponsor Kartı */}
        {showPromoBanner && (
          <div className="p-4 rounded-3xl glass-panel border border-teal-500/20 bg-gradient-to-r from-teal-500/10 via-teal-500/5 to-transparent flex items-center justify-between gap-3 text-xs shadow-xs">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-2xl bg-gradient-to-tr from-[#0D9488] to-[#14B8A6] text-white flex-shrink-0 shadow-xs">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                <b className="text-slate-900 dark:text-white">{t.promoBannerTip}</b> {t.promoBannerDesc}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className="font-bold text-teal-700 dark:text-teal-400 hover:underline cursor-pointer"
              >
                {t.promoBannerCta}
              </button>
              <button
                type="button"
                onClick={() => setShowPromoBanner(false)}
                className="text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer transition-colors"
                title={language === 'de' ? 'Schließen' : language === 'en' ? 'Dismiss' : 'Kapat'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Comprehensive Booking.com-Style Footer Suite */}
        <GlobalFooter
          onSelectCountry={(code) => {
            if (activeTab !== 'explore') {
              setActiveTab('explore');
            }
            handleCountrySelect(code);
          }}
          onOpenLegalModal={(tab) => openLegalModalWithTab(tab || 'terms')}
          setActiveTab={(tab) => handleSelectTab(tab as TabKey)}
          onOpenPackingList={() => setIsPackingListOpen(true)}
          onOpenTippingCalc={() => setIsTippingCalcOpen(true)}
          onOpenTimezoneOverlap={() => setIsTimezoneOverlapOpen(true)}
          onOpenGlobalRadar={() => openRadar('all')}
        />
      </main>
      </div>

      {/* User Login & Registration Modal */}
      <AuthModal />

      {/* Lazy-Loaded Modals (Only mounted when open) */}
      <Suspense fallback={null}>
        {isPassportModalOpen && (
          <PassportSelectModal
            isOpen={isPassportModalOpen}
            onClose={() => setIsPassportModalOpen(false)}
            selectedPassport={currentPassport}
            onSelect={handlePassportChange}
          />
        )}

        {isLegalModalOpen && (
          <LegalInfoModal
            isOpen={isLegalModalOpen}
            onClose={() => setIsLegalModalOpen(false)}
            onDataResetOrImported={handleDataResetOrImported}
            initialTab={legalInitialTab}
          />
        )}

        {isAuditModalOpen && (
          <RegulationAuditModal
            isOpen={isAuditModalOpen}
            onClose={() => setIsAuditModalOpen(false)}
            onOpenReportModal={(code, name) => {
              setIsAuditModalOpen(false);
              setReportingModalData({ code, name });
            }}
          />
        )}

        {reportingModalData && (
          <ReportChangeModal
            isOpen={!!reportingModalData}
            onClose={() => setReportingModalData(null)}
            defaultCountryCode={reportingModalData?.code}
            defaultCountryName={reportingModalData?.name}
            currentPassport={currentPassport}
          />
        )}

        {isPackingListOpen && (
          <PackingListModal
            isOpen={isPackingListOpen}
            onClose={() => setIsPackingListOpen(false)}
          />
        )}

        {isTippingCalcOpen && (
          <TippingCalculatorModal
            isOpen={isTippingCalcOpen}
            onClose={() => setIsTippingCalcOpen(false)}
          />
        )}

        {isTimezoneOverlapOpen && (
          <TimezoneOverlapModal
            isOpen={isTimezoneOverlapOpen}
            onClose={() => setIsTimezoneOverlapOpen(false)}
          />
        )}

        {isRadarOpen && (
          <GlobalRadarModal
            isOpen={isRadarOpen}
            onClose={() => setIsRadarOpen(false)}
            initialMode={radarInitialMode}
            initialCity={radarTargetCity}
            currentPassport={currentPassport}
            onOpenCountryDossier={(code) => {
              if (activeTab !== 'explore') {
                setActiveTab('explore');
              }
              handleCountrySelect(code);
            }}
          />
        )}

        <AssistantLauncherButton
          isOpen={isAssistantOpen}
          onClick={() => setIsAssistantOpen(true)}
        />

        {isAssistantOpen && (
          <VizamigoAssistantModal
            isOpen={isAssistantOpen}
            onClose={() => setIsAssistantOpen(false)}
            currentPassport={currentPassport}
            onOpenCountryDossier={(code) => {
              if (activeTab !== 'explore') {
                setActiveTab('explore');
              }
              handleCountrySelect(code);
            }}
            onSelectTab={handleSelectTab}
            onOpenPackingList={() => setIsPackingListOpen(true)}
            onOpenTippingCalc={() => setIsTippingCalcOpen(true)}
            onOpenTimezoneOverlap={() => setIsTimezoneOverlapOpen(true)}
            onOpenGlobalRadar={openRadar}
          />
        )}
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
