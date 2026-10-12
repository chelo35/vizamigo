/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation, TabKey } from './components/Navigation';
import { ExploreTab } from './components/ExploreTab';
import { WhereCanIGoTab } from './components/WhereCanIGoTab';
import { CompareTab } from './components/CompareTab';
import { RoutePlannerTab } from './components/RoutePlannerTab';
import { DayCounterTab } from './components/DayCounterTab';
import { NomadToolsTab } from './components/NomadToolsTab';
import { ProfileTab } from './components/ProfileTab';
import { PassportSelectModal } from './components/PassportSelectModal';
import { LegalInfoModal } from './components/LegalInfoModal';
import {
  loadStoredPassport,
  saveStoredPassport,
  loadStoredSecondaryPassport,
  saveStoredSecondaryPassport
} from './utils/storage';
import { LanguageProvider, useI18n, Language } from './data/i18n';
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/AuthModal';
import { RegulationAuditModal } from './components/RegulationAuditModal';
import { ReportChangeModal } from './components/ReportChangeModal';
import { GlobalFooter } from './components/footer/GlobalFooter';
import { ShieldCheck, Compass, Sparkles, X } from 'lucide-react';
import { useSeoRouter } from './utils/seoRouter';
import { SeoHead } from './components/SeoHead';
import { NotFoundView } from './components/NotFoundView';
import { HomeHero } from './components/design/HomeHero';
import { getCountryName } from './data/passportData';
import { getPassportItems } from './utils/calculator';

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
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [reportingModalData, setReportingModalData] = useState<{ code: string; name: string } | null>(null);

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
    <div className="min-h-screen text-[#1A1D20] dark:text-white flex font-sans selection:bg-teal-600 selection:text-white relative overflow-x-hidden transition-colors">
      {/* Dynamic Scalable Multilingual SEO Head (Canonical & 5-Language Hreflang Alternates + x-default) */}
      <SeoHead
        language={language}
        tab={activeTab}
        countryCode={selectedCountryCode}
        currentPassport={currentPassport}
        is404={route.is404}
      />

      {/* Permanent Fixed Fullscreen Dual-Theme Background (Zero white cutoffs on vertical scroll) */}
      <div className="fixed inset-0 pointer-events-none -z-20 bg-[#F8FAFC] dark:bg-gradient-to-br dark:from-[#0C0F19] dark:via-[#111625] dark:to-[#161D30]" />

      {/* Ambient luxury background glow orbs (Nubair celestial midnight & Social Media App luminous atmosphere) */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 left-1/4 w-[520px] h-[520px] bg-teal-500/[0.05] dark:bg-teal-500/[0.04] rounded-full blur-[160px]" />
        <div className="absolute top-1/3 -right-20 w-[440px] h-[440px] bg-sky-500/[0.06] dark:bg-blue-600/[0.05] rounded-full blur-[150px]" />
        <div className="absolute -bottom-20 left-1/3 w-[520px] h-[520px] bg-amber-500/[0.05] dark:bg-[#E5A93C]/[0.03] rounded-full blur-[150px]" />
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
      />

      {/* ========================================================
          2. MAIN CONTENT AREA (FULL-WIDTH LUXURY LAYOUT)
      ======================================================== */}
      <div className="flex flex-col flex-1 min-h-screen w-full transition-all">
        {/* Top Context & Navigation Bar (Mockup 'Masaüstü' Header) */}
        <Header
          currentPassport={currentPassport}
          onOpenPassportSelector={() => setIsPassportModalOpen(true)}
          onOpenLegalModal={() => setIsLegalModalOpen(true)}
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
        />

        {/* Content Body Centered with Full Breathing Space */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-32 lg:pb-16 space-y-6">
          {route.is404 ? (
            <NotFoundView
              language={language}
              requestedPath={typeof window !== 'undefined' ? window.location.pathname : undefined}
              onGoHome={() => handleSelectTab('explore')}
            />
          ) : (
            <>
              {/* Tab Content: 1. KEŞFET / EXPLORE */}
              {activeTab === 'explore' && (
            <div className="space-y-6">
              {/* Keşfet: hero + search card (Vizamigo redesign) */}
              <HomeHero
                title={l(
                  '199 ülke, pasaportunla tek bakışta',
                  '199 countries, one passport view',
                  '199 Länder, ein Blick',
                  '199 países, de un vistazo',
                  '199 стран с первого взгляда'
                )}
                subtitle={l(
                  'Vize, Schengen sayacı ve rota planı bir arada.',
                  'Visas, Schengen tracker and route planner in one place.',
                  'Visa, Schengen-Zähler und Routenplaner.',
                  'Visados, Schengen y planificador de rutas.',
                  'Визы, Шенген и маршруты в одном месте.'
                )}
                passportLabel={`${currentPassport} · ${getCountryName(currentPassport, language)}`}
                onPassportClick={() => setIsPassportModalOpen(true)}
                mode={exploreSubTab}
                onModeChange={setExploreSubTab}
                modeLabels={{ all: t.subTabAllCountries, where: t.subTabWhereCanIGo }}
                search={globalSearchQuery}
                onSearchChange={setGlobalSearchQuery}
                searchLabel={l('Ülke ara', 'Search country', 'Land suchen', 'Buscar país', 'Поиск страны')}
                searchPlaceholder={l('Japonya, Tayland, Almanya…', 'Japan, Thailand, Germany…', 'Japan, Thailand, Deutschland…', 'Japón, Tailandia, Alemania…', 'Япония, Таиланд, Германия…')}
                statLabel={l('Vizesiz veya kimlikle giriş', 'Visa-free or ID card entry', 'Visumfrei oder mit Ausweis', 'Entrada sin visado o con DNI', 'Без визы или по удостоверению')}
                statValue={visaFreeCount}
              />

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
                />
              ) : (
                <WhereCanIGoTab currentPassport={currentPassport} />
              )}
            </div>
          )}

          {/* Tab Content: 2. PLANLA / PLAN */}
          {activeTab === 'plan' && (
            <div className="space-y-6">
              {/* Planla Sub Tabs */}
              <div className="flex items-center justify-start overflow-x-auto scrollbar-none pb-1">
                <div className="inline-flex p-1 rounded-full glass-panel border border-slate-200/80 dark:border-white/10 shadow-xs gap-1 whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => setPlanSubTab('route')}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      planSubTab === 'route'
                        ? 'tab-chip-active'
                        : 'tab-chip-inactive'
                    }`}
                  >
                    {t.subTabRoutePlanner}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlanSubTab('compare')}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      planSubTab === 'compare'
                        ? 'tab-chip-active'
                        : 'tab-chip-inactive'
                    }`}
                  >
                    {t.subTabComparePassports}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlanSubTab('nomad')}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      planSubTab === 'nomad'
                        ? 'tab-chip-active'
                        : 'tab-chip-inactive'
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
          )}

          {/* Tab Content: 3. TAKİP / TRACK (GÜN & KALIŞ SAYACI) */}
          {activeTab === 'track' && (
            <DayCounterTab />
          )}

          {/* Tab Content: 4. DİJİTAL GÖÇEBE / NOMAD */}
          {activeTab === 'nomad' && (
            <NomadToolsTab defaultSubTab="nomad" currentPassport={currentPassport} />
          )}

          {/* Tab Content: 5. PROFİL & ARAÇLAR / PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Profil Sub Tabs */}
              <div className="flex items-center justify-start overflow-x-auto scrollbar-none pb-1">
                <div className="inline-flex p-1 rounded-full glass-panel border border-slate-200/80 dark:border-white/10 shadow-xs gap-1 whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => setProfileSubTab('profile')}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
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
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
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
                  onOpenLegalModal={() => setIsLegalModalOpen(true)}
                />
              ) : (
                <NomadToolsTab defaultSubTab="emergency" currentPassport={currentPassport} />
              )}
            </div>
          )}

          {/* Tab Content: 5. KONSOLOSLUK & DİPLOMATİK KRİZ MASASI / CONSULAR */}
          {activeTab === 'consular' && (
            <NomadToolsTab defaultSubTab="emergency" currentPassport={currentPassport} />
          )}
        </>
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
                className="font-bold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
              >
                {t.promoBannerCta}
              </button>
              <button
                type="button"
                onClick={() => setShowPromoBanner(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer transition-colors"
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
          onOpenLegalModal={() => setIsLegalModalOpen(true)}
          setActiveTab={(tab) => handleSelectTab(tab as TabKey)}
        />
      </main>
      </div>

      {/* Passport Selector Modal */}
      <PassportSelectModal
        isOpen={isPassportModalOpen}
        onClose={() => setIsPassportModalOpen(false)}
        selectedPassport={currentPassport}
        onSelect={handlePassportChange}
      />

      {/* Legal & Backup Modal */}
      <LegalInfoModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        onDataResetOrImported={handleDataResetOrImported}
      />

      {/* User Login & Registration Modal */}
      <AuthModal />

      {/* Regulation Audit Console Modal */}
      <RegulationAuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        onOpenReportModal={(code, name) => {
          setIsAuditModalOpen(false);
          setReportingModalData({ code, name });
        }}
      />

      {/* Community Change Reporting Modal */}
      <ReportChangeModal
        isOpen={!!reportingModalData}
        onClose={() => setReportingModalData(null)}
        defaultCountryCode={reportingModalData?.code}
        defaultCountryName={reportingModalData?.name}
        currentPassport={currentPassport}
      />
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
