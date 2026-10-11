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
import { ShieldCheck, Compass, Sparkles, X } from 'lucide-react';

function AppContent() {
  const { language, setLanguage, l, t } = useI18n();
  const [currentPassport, setCurrentPassport] = useState<string>(() => loadStoredPassport());
  const [secondaryPassport, setSecondaryPassport] = useState<string>(() => loadStoredSecondaryPassport());
  const [activeTab, setActiveTab] = useState<TabKey>('explore');
  const [exploreSubTab, setExploreSubTab] = useState<'all' | 'where'>('all');
  const [planSubTab, setPlanSubTab] = useState<'route' | 'compare' | 'nomad'>('route');
  const [profileSubTab, setProfileSubTab] = useState<'profile' | 'emergency'>('profile');
  const [showPromoBanner, setShowPromoBanner] = useState<boolean>(true);
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

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
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gradient-to-br dark:from-[#090C1A] dark:via-[#0E1428] dark:to-[#131A38] text-slate-900 dark:text-white flex font-sans selection:bg-rose-500 selection:text-white relative overflow-x-hidden transition-colors">
      {/* Ambient luxury background glow orbs (Nubair celestial midnight & Social Media App luminous atmosphere) */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 left-1/4 w-[520px] h-[520px] bg-sky-500/10 dark:bg-blue-600/[0.08] rounded-full blur-[150px]" />
        <div className="absolute top-1/3 -right-20 w-[440px] h-[440px] bg-emerald-500/8 dark:bg-indigo-600/[0.07] rounded-full blur-[150px]" />
        <div className="absolute -bottom-20 left-1/3 w-[520px] h-[520px] bg-amber-500/8 dark:bg-cyan-500/[0.04] rounded-full blur-[140px]" />
      </div>

      {/* ========================================================
          1. PERMANENT LEFT SIDEBAR (DESKTOP: width 260px)
      ======================================================== */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentPassport={currentPassport}
        onOpenPassportSelector={() => setIsPassportModalOpen(true)}
        onOpenAuditConsole={() => setIsAuditModalOpen(true)}
        isMobileDrawerOpen={isMobileDrawerOpen}
        onToggleMobileDrawer={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
      />

      {/* ========================================================
          2. MAIN CONTENT AREA (OFFSET lg:pl-[260px])
      ======================================================== */}
      <div className="lg:pl-[260px] flex flex-col flex-1 min-h-screen w-full transition-all">
        {/* Clean Top Context Bar */}
        <Header
          currentPassport={currentPassport}
          onOpenPassportSelector={() => setIsPassportModalOpen(true)}
          onOpenLegalModal={() => setIsLegalModalOpen(true)}
          onOpenAuditConsole={() => setIsAuditModalOpen(true)}
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
          onNavigateToProfile={() => {
            setActiveTab('profile');
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
        />

        {/* Content Body with 30%+ Increased Breathing Space */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-9 pb-32 lg:pb-16 space-y-8">
          {/* Tab Content: 1. KEŞFET / EXPLORE */}
          {activeTab === 'explore' && (
            <div className="space-y-6">
              {/* Keşfet Sub Tabs */}
              <div className="flex items-center justify-start">
                <div className="inline-flex p-1 rounded-full glass-panel border border-slate-200/80 dark:border-white/10 shadow-xs gap-1">
                  <button
                    type="button"
                    onClick={() => setExploreSubTab('all')}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      exploreSubTab === 'all'
                        ? 'tab-chip-active'
                        : 'tab-chip-inactive'
                    }`}
                  >
                    {t.subTabAllCountries}
                  </button>
                  <button
                    type="button"
                    onClick={() => setExploreSubTab('where')}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      exploreSubTab === 'where'
                        ? 'tab-chip-active'
                        : 'tab-chip-inactive'
                    }`}
                  >
                    {t.subTabWhereCanIGo}
                  </button>
                </div>
              </div>

              {exploreSubTab === 'all' ? (
                <ExploreTab
                  currentPassport={currentPassport}
                  onOpenAuditConsole={() => setIsAuditModalOpen(true)}
                  externalSearch={globalSearchQuery}
                  onSearchChange={setGlobalSearchQuery}
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

          {/* Tab Content: 3. TAKİP / TRACK */}
          {activeTab === 'track' && (
            <DayCounterTab />
          )}

          {/* Tab Content: 4. PROFİL & ARAÇLAR / PROFILE */}
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

        {/* Sınırlı Reklam & Gezgin Sponsor Kartı */}
        {showPromoBanner && (
          <div className="p-4 rounded-2xl glass-panel border border-rose-500/20 bg-gradient-to-r from-rose-500/10 via-orange-500/5 to-amber-500/10 flex items-center justify-between gap-3 text-xs shadow-sm">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-gradient-to-tr from-rose-500 to-orange-500 text-white flex-shrink-0 shadow-xs">
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
                className="font-bold text-rose-600 dark:text-rose-400 hover:text-rose-500 hover:underline cursor-pointer"
              >
                {t.promoBannerCta}
              </button>
              <button
                type="button"
                onClick={() => setShowPromoBanner(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer transition-colors"
                title={language === 'de' ? 'Schließen' : language === 'en' ? 'Dismiss' : 'Kapat'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Informative Footer */}
        <footer className="mt-14 pt-8 border-t border-slate-200/80 dark:border-white/[0.08] text-xs text-slate-500 dark:text-slate-400 space-y-3 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 font-bold text-slate-800 dark:text-slate-200">
              <div className="p-1 rounded-lg bg-gradient-to-tr from-rose-500 to-orange-500 text-white shadow-xs">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <span className="tracking-tight">{t.appTitle} · {language === 'de' ? 'Ausgabe 2026' : language === 'en' ? '2026 Edition' : '2026 Sürümü'}</span>
            </div>
            <button
              type="button"
              onClick={() => setIsLegalModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-rose-600 dark:text-rose-400 hover:text-rose-500 font-semibold cursor-pointer transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> {t.securityDisclaimer}
            </button>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400 dark:text-slate-500">
            {language === 'de'
              ? 'Daten zusammengestellt aus offenen Passport-Index-Quellen und offiziellen Konsulatsmitteilungen. Grenzprotokolle und zwischenstaatliche Visaabkommen können sich kurzfristig ändern; bitte vor Abreise bei den zuständigen Behörden verifizieren.'
              : language === 'en'
              ? 'Data aggregated from open-source Passport Index repositories and official consular notices. Border protocols and bilateral visa agreements are subject to sudden changes; please verify with relevant ministries and immigration authorities before embarking.'
              : 'Veriler açık kaynaklı Passport Index veri setinden ve konsolosluk duyurularından derlenmiştir. Sınır kapısı uygulamaları ve ikili vizeler her an değişebilir; seyahatten önce resmi göç idaresi ve dışişleri portallarından teyit ediniz.'}
          </p>
        </footer>
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
