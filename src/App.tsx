/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import type { TabKey } from './components/Navigation';
import {
  loadStoredPassport,
  saveStoredPassport,
  loadStoredSecondaryPassport,
  saveStoredSecondaryPassport
} from './utils/storage';
import { LanguageProvider, useI18n } from './data/i18n';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useSeoRouter } from './utils/seoRouter';
import { SeoHead } from './components/SeoHead';
import { NotFoundView } from './components/NotFoundView';
import { getCountryName } from './data/passportData';
import { getPassportItems } from './utils/calculator';

import { TopBar, BottomNav, Footer, AssistantFab } from './next/Shell';
import { ExplorePage } from './next/ExplorePage';
const RoutePage = lazy(() => import('./next/RoutePage').then((m) => ({ default: m.RoutePage })));
const WalletPage = lazy(() => import('./next/WalletPage').then((m) => ({ default: m.WalletPage })));
const ToolsHub = lazy(() => import('./next/ToolsHub').then((m) => ({ default: m.ToolsHub })));
const ProfilePage = lazy(() => import('./next/ProfilePage').then((m) => ({ default: m.ProfilePage })));
const S = () => import('./next/sheets');
const PassportSheet = lazy(() => S().then((m) => ({ default: m.PassportSheet })));
const AuthSheet = lazy(() => S().then((m) => ({ default: m.AuthSheet })));
const ReportSheet = lazy(() => S().then((m) => ({ default: m.ReportSheet })));
const AuditSheet = lazy(() => S().then((m) => ({ default: m.AuditSheet })));
const InfoSheet = lazy(() => S().then((m) => ({ default: m.InfoSheet })));
const AssistantSheet = lazy(() => S().then((m) => ({ default: m.AssistantSheet })));
const CountryPage = lazy(() => import('./next/CountryPage').then((m) => ({ default: m.CountryPage })));

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
  const { isAuthModalOpen } = useAuth();

  const [currentPassport, setCurrentPassport] = useState<string>(() => loadStoredPassport());
  const [secondaryPassport, setSecondaryPassport] = useState<string>(() => loadStoredSecondaryPassport());
  const [activeTab, setActiveTab] = useState<TabKey>(() => route.tab || 'explore');
  const [selectedCountryCode, setSelectedCountryCode] = useState<string | null>(() => route.countryCode);
  const [searchReq, setSearchReq] = useState<{ q: string; nonce: number } | null>(null);
  const [exploreReq, setExploreReq] = useState<{ id: string; tab?: string; nonce: number } | null>(null);
  const [tabReq, setTabReq] = useState<{ id: string; tab?: string; nonce: number } | null>(null);
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

  // Dünya radarı artık Keşfet'te bir kutucuk
  const openRadar = () => openToolRef.current('explore', 'radar');
  const openToolRef = React.useRef<(tab: TabKey, tile: string) => void>(() => {});

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

  const goSearch = (q: string) => {
    setSelectedCountryCode(null);
    if (activeTab !== 'explore') setActiveTab('explore');
    navigate(language, 'explore', null);
    setSearchReq({ q, nonce: Date.now() });
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {}
  };
  const openTool = (tab: TabKey, tile: string) => {
    window.scrollTo({ top: 0 });
    if (tab === 'explore') {
      setSelectedCountryCode(null);
      if (activeTab !== 'explore') handleSelectTab('explore');
      setExploreReq({ id: tile, nonce: Date.now() });
      return;
    }
    handleSelectTab(tab);
    setTabReq({ id: tile, nonce: Date.now() });
  };
  openToolRef.current = openTool;
  const openCountryFromAnywhere = (code: string) => {
    setActiveTab('explore');
    setSelectedCountryCode(code);
    navigate(language, 'explore', code);
  };

  return (
    <div className="vz-app">
      <SeoHead
        language={language}
        tab={activeTab}
        countryCode={selectedCountryCode}
        currentPassport={currentPassport}
        is404={route.is404}
      />

      <TopBar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        currentPassport={currentPassport}
        visaFreeCount={visaFreeCount}
        onOpenPassport={() => setIsPassportModalOpen(true)}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onSearch={goSearch}
        onHome={() => handleSelectTab('explore')}
        onOpenCountry={openCountryFromAnywhere}
        onOpenTool={openTool}
      />

      <main className="vz-main">
        {route.is404 ? (
          <div className="vz-wrap" style={{ paddingBlock: 32 }}>
            <NotFoundView
              language={language}
              requestedPath={typeof window !== 'undefined' ? window.location.pathname : undefined}
              onGoHome={() => handleSelectTab('explore')}
            />
          </div>
        ) : activeTab === 'explore' ? (
          <ErrorBoundary isTabBoundary tabName={t.navExplore || 'Keşfet'}>
            {selectedCountryCode ? (
              <Suspense fallback={<div className="vz-wrap" style={{ paddingBlock: 24 }}><div className="vz-skel" style={{ height: 420 }} /></div>}>
              <CountryPage
                code={selectedCountryCode}
                passport={currentPassport}
                onBack={() => handleCountrySelect(null)}
                onReport={(code, name) => setReportingModalData({ code, name })}
                onOpenRoute={() => handleSelectTab('plan')}
                onOpenSos={() => openTool('nomad', 'sos')}
                onOpenCountry={openCountryFromAnywhere}
              />
              </Suspense>
            ) : (
              <ExplorePage
                currentPassport={currentPassport}
                secondaryPassport={secondaryPassport}
                openRequest={exploreReq}
                searchRequest={searchReq}
                onOpenCountry={(code) => handleCountrySelect(code)}
                onOpenPassport={() => setIsPassportModalOpen(true)}
                onOpenAudit={() => setIsAuditModalOpen(true)}
                onReport={() => setReportingModalData({ code: '', name: '' })}
                onOpenRadar={openRadar}
                onOpenAssistant={() => setIsAssistantOpen(true)}
                onOpenRoute={() => handleSelectTab('plan')}
                onOpenTool={openTool}
              />
            )}
          </ErrorBoundary>
        ) : (
          <ErrorBoundary isTabBoundary tabName={activeTab}>
            <Suspense fallback={<div className="vz-wrap" style={{ paddingBlock: 24 }}><div className="vz-skel" style={{ height: 320 }} /></div>}>
              {activeTab === 'plan' && <RoutePage passport={currentPassport} openRequest={tabReq} onOpenCountry={openCountryFromAnywhere} />}
              {activeTab === 'track' && <WalletPage passport={currentPassport} openRequest={tabReq} />}
              {(activeTab === 'nomad' || activeTab === 'consular') && (
                <ToolsHub passport={currentPassport} openRequest={activeTab === 'consular' ? { id: 'sos', nonce: 1 } : tabReq} onOpenCountry={openCountryFromAnywhere} onOpenInfo={(pg) => openLegalModalWithTab(pg)} />
              )}
              {activeTab === 'profile' && (
                <ProfilePage
                  passport={currentPassport}
                  secondary={secondaryPassport}
                  openRequest={tabReq}
                  isDark={isDark}
                  onToggleTheme={() => setIsDark(!isDark)}
                  onOpenPassport={() => setIsPassportModalOpen(true)}
                  onSetSecondary={(c) => {
                    setSecondaryPassport(c);
                    saveStoredSecondaryPassport(c);
                  }}
                  onOpenInfo={(pg) => openLegalModalWithTab(pg)}
                  onReport={() => setReportingModalData({ code: '', name: '' })}
                  onDataChanged={handleDataResetOrImported}
                  onOpenCountry={openCountryFromAnywhere}
                />
              )}
            </Suspense>
          </ErrorBoundary>
        )}
      </main>

      {renderFooter && (
        <Footer
          onSelectTab={handleSelectTab}
          onOpenInfo={(page) => openLegalModalWithTab(page)}
          onOpenTool={openTool}
        />
      )}
      <BottomNav activeTab={activeTab} onSelectTab={handleSelectTab} />

      {/* User Login & Registration Modal */}

      {/* Lazy-Loaded Modals (Only mounted when open) */}
      <Suspense fallback={null}>
        {isAuthModalOpen && <AuthSheet />}

        {isPassportModalOpen && (
          <PassportSheet
            open={isPassportModalOpen}
            onClose={() => setIsPassportModalOpen(false)}
            selected={currentPassport}
            onSelect={handlePassportChange}
          />
        )}

        {isLegalModalOpen && (
          <InfoSheet
            open={isLegalModalOpen}
            onClose={() => setIsLegalModalOpen(false)}
            page={legalInitialTab}
            onPage={setLegalInitialTab}
            onDataChanged={handleDataResetOrImported}
          />
        )}

        {isAuditModalOpen && (
          <AuditSheet
            open={isAuditModalOpen}
            onClose={() => setIsAuditModalOpen(false)}
            onReport={(code) => {
              setIsAuditModalOpen(false);
              setReportingModalData({ code, name: '' });
            }}
            onOpenCountry={openCountryFromAnywhere}
          />
        )}

        {reportingModalData && (
          <ReportSheet
            open={!!reportingModalData}
            onClose={() => setReportingModalData(null)}
            code={reportingModalData?.code || undefined}
            passport={currentPassport}
          />
        )}





        <AssistantFab hidden={isAssistantOpen} onClick={() => setIsAssistantOpen(true)} />

        {isAssistantOpen && (
          <AssistantSheet
            open={isAssistantOpen}
            onClose={() => setIsAssistantOpen(false)}
            passport={currentPassport}
            onOpenCountry={openCountryFromAnywhere}
            onSelectTab={handleSelectTab}
            onOpenTool={openTool}
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
