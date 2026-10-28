/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Navigation, TabKey } from './components/Navigation';
import {
  loadStoredPassport,
  saveStoredPassport,
  loadStoredSecondaryPassport,
  saveStoredSecondaryPassport
} from './utils/storage';
import { LanguageProvider, useI18n } from './data/i18n';
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/AuthModal';
import { Sparkles, X } from 'lucide-react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useSeoRouter } from './utils/seoRouter';
import { SeoHead } from './components/SeoHead';
import { NotFoundView } from './components/NotFoundView';
import { HomeHero } from './components/design/HomeHero';
import { getCountryName } from './data/passportData';
import { getPassportItems } from './utils/calculator';

// ExploreTab is imported directly to prevent CLS layout shift on initial home render
import { ExploreTab } from './components/ExploreTab';
import { HomeDashboard } from './components/redesign/HomeDashboard';
import { TabPage } from './components/redesign/TabPage';
import { Ic } from './components/redesign/toolHubs';
const ToolsPage = lazy(() =>
  import('./components/redesign/ToolsPage').then(m => ({ default: m.ToolsPage }))
);
const GlobalFooter = lazy(() =>
  import('./components/footer/GlobalFooter').then(m => ({ default: m.GlobalFooter }))
);
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
  const [trackSubTab, setTrackSubTab] = useState<'wallet' | 'days'>('wallet');
  const [showPromoBanner, setShowPromoBanner] = useState<boolean>(true);
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [renderFooter, setRenderFooter] = useState<boolean>(false);

  // Defer heavy footer suite to background idle time (avoids 1,200+ DOM nodes on critical paint)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        const handle = (window as any).requestIdleCallback(() => setRenderFooter(true), { timeout: 1500 });
        return () => (window as any).cancelIdleCallback(handle);
      } else {
        const timer = setTimeout(() => setRenderFooter(true), 800);
        return () => clearTimeout(timer);
      }
    }
  }, []);

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
    try {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } catch {}
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
      <div className="flex flex-col flex-1 app-shell-viewport min-h-[100dvh] w-full transition-colors duration-200">
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
                <ErrorBoundary isTabBoundary tabName={t.navExplore || 'Keşfet'}>
                  <div className="space-y-6">
                    {exploreSubTab === 'all' && !selectedCountryCode && !globalSearchQuery && (
                      <HomeDashboard
                        currentPassport={currentPassport}
                        secondaryPassport={secondaryPassport}
                        onSearch={(q) => setGlobalSearchQuery(q)}
                        onOpenPassportSelector={() => setIsPassportModalOpen(true)}
                        onOpenCountry={(code) => handleCountrySelect(code)}
                        onOpenAuditConsole={() => setIsAuditModalOpen(true)}
                        onOpenPackingList={() => setIsPackingListOpen(true)}
                        onOpenTippingCalc={() => setIsTippingCalcOpen(true)}
                        onOpenTimezoneOverlap={() => setIsTimezoneOverlapOpen(true)}
                        onOpenGlobalRadar={openRadar}
                      />
                    )}
                    {exploreSubTab === 'all' ? (
                      <ExploreTab
                        hideDashboard
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

          {/* Tab Content: 2. ROTA / PLAN */}
          {activeTab === 'plan' && (
            <ErrorBoundary isTabBoundary tabName={t.subTabRoutePlanner || 'Rota'}>
              <TabPage
                eyebrow={l('Rota', 'Route', 'Route', 'Ruta', 'Маршрут')}
                title={l('Rotanı birlikte çizelim', 'Let’s draw your route', 'Lass uns deine Route planen', 'Tracemos tu ruta', 'Построим маршрут')}
                sub={l('Durakları ekle; her ülkede vize ve kalış kuralı otomatik kontrol edilsin. Pasaportları karşılaştır, göçebe merkezlerine göz at.', 'Add your stops and every country’s visa and stay rule is checked for you. Compare passports and browse nomad hubs.', 'Stopps hinzufügen, Visaregeln werden geprüft.', 'Añade paradas y comprobamos visados y estancias.', 'Добавьте остановки — правила проверим сами.')}
                words={['Japan', 'Italy', 'Mexico', 'Greece']}
                active={planSubTab}
                onSelect={(id) => setPlanSubTab(id as 'route' | 'compare' | 'nomad')}
                sections={[
                  { id: 'route', label: l('Rota planlayıcı', 'Route planner', 'Routenplaner', 'Planificador de ruta', 'Планировщик'), desc: l('Çok ülkeli plan, tarihler, vize kontrolü', 'Multi-country plan, dates, visa check', 'Mehrländerplan mit Visaprüfung', 'Plan multipaís con visados', 'Маршрут с проверкой виз'), icon: <Ic fill="m3 7 6-3 6 3 6-3v13l-6 3-6-3-6 3z" d="m3 7 6-3 6 3 6-3v13l-6 3-6-3-6 3zM9 4v13M15 7v13" /> },
                  { id: 'compare', label: l('Pasaport karşılaştır', 'Compare passports', 'Pässe vergleichen', 'Comparar pasaportes', 'Сравнить паспорта'), desc: l('İki pasaport, ülke ülke yan yana', 'Two passports side by side', 'Zwei Pässe nebeneinander', 'Dos pasaportes lado a lado', 'Два паспорта рядом'), icon: <Ic fill="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.5 17h7" /> },
                  { id: 'nomad', label: l('Göçebe merkezleri', 'Nomad hubs', 'Nomaden-Hubs', 'Centros nómada', 'Хабы кочевников'), desc: l('Göçebe vizeleri, vergi, transit', 'Nomad visas, tax, transit', 'Nomadenvisa, Steuern, Transit', 'Visados nómada, impuestos', 'Визы, налоги, транзит'), icon: <Ic fill="M6 5h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" d="M6 5h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM2 19h20" /> }
                ]}
              >
                {planSubTab === 'route' ? (
                  <RoutePlannerTab currentPassport={currentPassport} />
                ) : planSubTab === 'compare' ? (
                  <CompareTab initialPassportA={currentPassport} initialPassportB={secondaryPassport} />
                ) : (
                  <NomadToolsTab defaultSubTab="nomad" currentPassport={currentPassport} />
                )}
              </TabPage>
            </ErrorBoundary>
          )}

          {/* Tab Content: 3. CÜZDAN & GÜN SAYACI / TRACK */}
          {activeTab === 'track' && (
            <ErrorBoundary isTabBoundary tabName="Cüzdan & Gün Sayacı">
              <TabPage
                eyebrow={l('Cüzdan', 'Wallet', 'Wallet', 'Cartera', 'Кошелёк')}
                title={l('Belgelerin ve günlerin', 'Your documents and days', 'Deine Dokumente und Tage', 'Tus documentos y días', 'Документы и дни')}
                sub={l('Pasaport, vize ve sigorta tarihlerin tek yerde; dünya gün sayacı kaç gün kalabileceğini hesaplar.', 'Passport, visa and insurance dates in one place; the world day counter works out how long you can stay.', 'Pass-, Visa- und Versicherungsdaten an einem Ort.', 'Fechas de pasaporte, visado y seguro en un lugar.', 'Даты паспорта, визы и страховки в одном месте.')}
                words={['France', 'Spain', 'Portugal', 'Germany']}
                active={trackSubTab}
                onSelect={(id) => setTrackSubTab(id as 'wallet' | 'days')}
                sections={[
                  { id: 'wallet', label: l('Cüzdanım', 'My wallet', 'Meine Wallet', 'Mi cartera', 'Мой кошелёк'), desc: l('Pasaport, vize, sigorta, bitiş uyarıları', 'Passport, visas, insurance, expiry alerts', 'Pass, Visa, Versicherung, Ablauf', 'Pasaporte, visados, seguro', 'Паспорт, визы, страховка'), icon: <Ic fill="M4 6h16v12H4z" d="M4 6h16v12H4zM4 10h16M8 15h3" /> },
                  { id: 'days', label: l('Dünya gün sayacı', 'World day counter', 'Welt-Tagezähler', 'Contador mundial', 'Счётчик дней'), desc: l('Schengen 90/180 ve diğer kalış kuralları', 'Schengen 90/180 and other stay rules', 'Schengen 90/180 und mehr', 'Schengen 90/180 y más', 'Шенген 90/180 и др.'), icon: <Ic fill="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z" d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 7.5V12l3.2 2" /> }
                ]}
              >
                {trackSubTab === 'wallet' ? (
                  <WalletTab
                    currentPassport={currentPassport}
                    secondaryPassport={secondaryPassport}
                    onChangePassport={() => setIsPassportModalOpen(true)}
                    onSelectStayTracker={() => setTrackSubTab('days')}
                  />
                ) : (
                  <div id="vz-day-counter-section">
                    <DayCounterTab />
                  </div>
                )}
              </TabPage>
            </ErrorBoundary>
          )}

          {/* Tab Content: 4. ARAÇLAR / NOMAD */}
          {activeTab === 'nomad' && (
            <ErrorBoundary isTabBoundary tabName="Araçlar">
              <ToolsPage
                currentPassport={currentPassport}
                secondaryPassport={secondaryPassport}
                onOpenPassportSelector={() => setIsPassportModalOpen(true)}
                onOpenCountry={(code) => {
                  setActiveTab('explore');
                  handleCountrySelect(code);
                }}
                onOpenAuditConsole={() => setIsAuditModalOpen(true)}
                onOpenPackingList={() => setIsPackingListOpen(true)}
                onOpenTippingCalc={() => setIsTippingCalcOpen(true)}
                onOpenTimezoneOverlap={() => setIsTimezoneOverlapOpen(true)}
                onOpenGlobalRadar={openRadar}
                onOpenAssistant={() => setIsAssistantOpen(true)}
              />
            </ErrorBoundary>
          )}

          {/* Tab Content: 5. PROFİL / PROFILE */}
          {activeTab === 'profile' && (
            <ErrorBoundary isTabBoundary tabName="Profil & Ayarlar">
              <TabPage
                eyebrow={l('Profil', 'Profile', 'Profil', 'Perfil', 'Профиль')}
                title={l('Senin Vizamigo’n', 'Your Vizamigo', 'Dein Vizamigo', 'Tu Vizamigo', 'Ваш Vizamigo')}
                sub={l('Pasaportların, dil, yedekleme ve acil durum bilgilerin. Hepsi bu cihazda güvenle saklanır.', 'Your passports, language, backups and emergency details, kept safely on this device.', 'Pässe, Sprache, Backups und Notfalldaten.', 'Pasaportes, idioma, copias y emergencias.', 'Паспорта, язык, резервные копии и экстренные данные.')}
                words={['Türkiye', 'Canada', 'Australia', 'Morocco']}
                active={profileSubTab}
                onSelect={(id) => setProfileSubTab(id as 'profile' | 'emergency')}
                sections={[
                  { id: 'profile', label: l('Profil & ayarlar', 'Profile & settings', 'Profil & Einstellungen', 'Perfil y ajustes', 'Профиль и настройки'), desc: l('Pasaportlar, dil, yedek, ortaklar', 'Passports, language, backup, partners', 'Pässe, Sprache, Backup', 'Pasaportes, idioma, copia', 'Паспорта, язык, копия'), icon: <Ic fill="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0" /> },
                  { id: 'emergency', label: l('Acil durum masası', 'Emergency desk', 'Notfallzentrale', 'Mesa de emergencias', 'Экстренная помощь'), desc: l('Acil hatlar ve konsolosluklar', 'Emergency lines and consulates', 'Notrufe und Konsulate', 'Emergencias y consulados', 'Экстренные и консульства'), icon: <Ic fill="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z" d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 8v5M12 16.5v.01" /> }
                ]}
              >
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
              </TabPage>
            </ErrorBoundary>
          )}

          {/* Tab Content: KONSOLOSLUK & KRİZ MASASI / CONSULAR */}
          {activeTab === 'consular' && (
            <ErrorBoundary isTabBoundary tabName="Konsolosluk & Kriz Masası">
              <TabPage
                eyebrow={l('Acil durum', 'Emergency', 'Notfall', 'Emergencia', 'Экстренно')}
                title={l('Yardım bir dokunuş uzakta', 'Help is one tap away', 'Hilfe mit einem Tipp', 'Ayuda a un toque', 'Помощь в одно касание')}
                sub={l('Polis, ambulans, itfaiye ve konsolosluk bilgileri ülke ülke.', 'Police, ambulance, fire and consulate details country by country.', 'Polizei, Rettung, Feuerwehr, Konsulat.', 'Policía, ambulancia, bomberos y consulado.', 'Полиция, скорая, пожарные, консульство.')}
                words={['Thailand', 'Japan', 'USA', 'France']}
              >
                <NomadToolsTab defaultSubTab="emergency" currentPassport={currentPassport} />
              </TabPage>
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

        {/* Comprehensive Booking.com-Style Footer Suite (Deferred until idle to eliminate initial DOM bloat) */}
        {renderFooter && (
          <Suspense fallback={null}>
            <GlobalFooter
              currentPassport={currentPassport}
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
          </Suspense>
        )}
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
          <ErrorBoundary isTabBoundary tabName="Küresel Seyahat Radarı" onReset={() => setIsRadarOpen(false)}>
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
          </ErrorBoundary>
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
