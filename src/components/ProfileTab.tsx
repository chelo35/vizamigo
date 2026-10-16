import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Bell,
  Sparkles,
  Globe2,
  FileText,
  CreditCard,
  Download,
  Upload,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Award,
  Zap,
  HelpCircle,
  Smartphone,
  Plane,
  Heart,
  LogIn,
  LogOut,
  CloudCheck
} from 'lucide-react';
import { getFlag, getCountryName, DATASET_LICENSE_INFO, AFFILIATE_PARTNERS, getLocalizedPartner } from '../data/passportData';
import { VISA_CHANGE_ALERTS, VisaChangeAlert } from '../data/changeLog';
import { Language, saveStoredLanguage, useI18n, SUPPORTED_LANGUAGES } from '../i18n';
import { exportAppData, importAppData, clearAllAppData } from '../utils/storage';
import { useAuth } from '../context/AuthContext';

interface ProfileTabProps {
  currentPassport: string;
  secondaryPassport: string;
  onChangePassport: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenLegalModal: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  currentPassport,
  secondaryPassport,
  onChangePassport,
  language,
  onLanguageChange,
  onOpenLegalModal,
}) => {
  const { t, setLanguage, l } = useI18n();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();

  const [isProActive, setIsProActive] = useState<boolean>(() => {
    try {
      return localStorage.getItem('vr_pro_active') === 'true';
    } catch {
      return false;
    }
  });

  const [activeSubSection, setActiveSubSection] = useState<'overview' | 'alerts' | 'affiliate' | 'membership' | 'legal'>('overview');

  const handleTogglePro = () => {
    const next = !isProActive;
    setIsProActive(next);
    try {
      localStorage.setItem('vr_pro_active', String(next));
    } catch {}
  };

  return (
    <div className="space-y-6">
      {/* Sub Tabs Pill Navigation (Mobile-First Smooth Scroll Strip, Strict Zero Overlap) */}
      <div className="horizontal-badge-slider no-scrollbar-slider touch-pan-x flex items-center border-b border-slate-200/80 dark:border-white/10 gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-none flex-nowrap">
        <button
          type="button"
          onClick={() => setActiveSubSection('overview')}
          className={`shrink-0 flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap touch-target-min ${
            activeSubSection === 'overview' ? 'tab-chip-active' : 'tab-chip-inactive'
          }`}
        >
          <User className="w-4 h-4" />
          {l('Gezgin Cüzdanı', 'Traveler Wallet', 'Reise-Brieftasche')}
        </button>

        <button
          type="button"
          onClick={() => setActiveSubSection('alerts')}
          className={`shrink-0 flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap touch-target-min ${
            activeSubSection === 'alerts' ? 'tab-chip-active' : 'tab-chip-inactive'
          }`}
        >
          <Bell className="w-4 h-4" />
          {l(`Kural Bildirimleri (${VISA_CHANGE_ALERTS.length})`, `Policy Alerts (${VISA_CHANGE_ALERTS.length})`, `Visum-Warnungen (${VISA_CHANGE_ALERTS.length})`)}
        </button>

        <button
          type="button"
          onClick={() => setActiveSubSection('membership')}
          className={`shrink-0 flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap touch-target-min ${
            activeSubSection === 'membership' ? 'tab-chip-active' : 'tab-chip-inactive'
          }`}
        >
          <Award className="w-4 h-4" />
          {l('Ücretsiz vs PRO', 'Free vs PRO', 'Kostenlos vs PRO')}
        </button>

        <button
          type="button"
          onClick={() => setActiveSubSection('affiliate')}
          className={`shrink-0 flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap touch-target-min ${
            activeSubSection === 'affiliate' ? 'tab-chip-active' : 'tab-chip-inactive'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          {l('Seyahat Araçları & İndirimler', 'Travel Tools & Perks', 'Reise-Tools & Rabatte')}
        </button>

        <button
          type="button"
          onClick={() => setActiveSubSection('legal')}
          className={`shrink-0 flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap touch-target-min ${
            activeSubSection === 'legal' ? 'tab-chip-active' : 'tab-chip-inactive'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          {l('Lisans & Hukuk', 'License & Legal', 'Lizenz & Rechtliches')}
        </button>
      </div>

      {/* 1. OVERVIEW & PASSPORT WALLET */}
      {activeSubSection === 'overview' && (
        <div className="space-y-4">
          {/* User Account Authentication Card */}
          <div className="glass-panel rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center gap-4">
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name || 'Gezgin')}`}
                    alt={user.name || 'User'}
                    width="56"
                    height="56"
                    loading="lazy"
                    decoding="async"
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-300 dark:border-white/20 shadow-md"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-base text-slate-900 dark:text-white tracking-[-0.02em]">
                        {user.name || l('Gezgin Kullanıcı', 'Traveler User', 'Reisender')}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-[#8E9DBE]">
                        {user.provider === 'google' ? 'Google' : l('E-posta', 'Email', 'E-Mail')}
                      </span>
                      {user.isPro && (
                        <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs">
                          PRO
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-[#8E9DBE] mt-0.5">
                      {user.email || ''} · {l('Bulut Senkronize', 'Cloud Synced', 'Cloud synchronisiert')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openAuthModal('login')}
                    className="btn-nubair-secondary text-xs"
                  >
                    {l('Hesap Değiştir', 'Switch Account', 'Konto wechseln')}
                  </button>
                  <button
                    type="button"
                    onClick={logout}
                    className="px-3.5 py-2 rounded-full border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{t.signOut}</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 text-slate-500 flex items-center justify-center font-black text-2xl shadow-inner">
                    <User className="w-7 h-7 text-slate-400 dark:text-[#8E9DBE]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white tracking-[-0.02em]">
                      {l('Misafir Gezgin Hesabı', 'Guest Traveler Account', 'Gast-Reisekonto')}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-[#8E9DBE] mt-0.5">
                      {l(
                        'Pasaport tercihlerinizi ve seyahat kayıtlarınızı cihazlar arasında saklamak için giriş yapın.',
                        'Sign in with Google or Email to synchronize your passport & trip records across devices.',
                        'Melden Sie sich mit Google oder E-Mail an, um Reisepass- und Reisedaten geräteübergreifend zu synchronisieren.'
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openAuthModal('login')}
                    className="btn-nubair-primary text-xs flex items-center gap-1.5"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>{t.signIn}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openAuthModal('register')}
                    className="btn-nubair-secondary text-xs"
                  >
                    {t.signUp}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* User Passport Card */}
          <div className="glass-panel rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-900 dark:from-[#202E5C] dark:to-[#172146] text-white flex items-center justify-center font-black text-2xl shadow-md border border-white/10">
                {getFlag(currentPassport)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white tracking-[-0.02em]">
                    {l('Gezgin Pasaport Cüzdanı', 'Traveler Passport Wallet', 'Reise-Pass-Brieftasche')}
                  </h3>
                  {isProActive && (
                    <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs">
                      {l('PRO Aktif', 'PRO Active', 'PRO Aktiv')}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-[#8E9DBE] mt-0.5">
                  {l('Birincil Pasaport:', 'Primary Passport:', 'Primärer Reisepass:')} <b>{getCountryName(currentPassport, language)}</b> ({currentPassport})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onChangePassport}
                className="btn-nubair-primary text-xs"
              >
                {l('Pasaport Değiştir', 'Change Passport', 'Pass ändern')}
              </button>
            </div>
          </div>

          {/* Dual Citizenship Status */}
          <div className="glass-panel rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white tracking-[-0.02em]">
                  {l('Çifte Vatandaşlık & Karşılaştırma Eşleşmesi', 'Dual Citizenship & Synergy Pairing', 'Doppelstaatsbürgerschaft & Synergie-Kopplung')}
                </h4>
                <p className="text-xs text-slate-500 dark:text-[#8E9DBE]">
                  {l(
                    'Karşılaştır sekmesinde sinerji analizinde kullanılan ikinci pasaportunuz',
                    'Secondary passport evaluated alongside primary in the Compare tab for access synergy',
                    'Zweiter Reisepass, der im Vergleich-Tab auf Visumsynergien geprüft wird'
                  )}
                </p>
              </div>
              <span className="text-2xl">{getFlag(secondaryPassport)}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-700 dark:text-[#8E9DBE] font-medium">
                {l('İkinci Pasaport:', 'Secondary Passport:', 'Zweiter Reisepass:')} <b className="text-slate-900 dark:text-white">{getCountryName(secondaryPassport, language)}</b>
              </span>
              <span className="text-slate-700 dark:text-[#8E9DBE] font-bold">
                {l('Karşılaştır Sekmesinden Ayarlanır', 'Configured in Compare Tab', 'Im Vergleich-Tab konfiguriert')}
              </span>
            </div>
          </div>

          {/* Language & Local Storage Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-panel rounded-3xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                <Globe2 className="w-4 h-4 text-[#0F172A] dark:text-[#8E9DBE]" />
                {l('Uygulama Dili / Language', 'Application Language', 'App-Sprache')}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {SUPPORTED_LANGUAGES.map(opt => (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => {
                      onLanguageChange(opt.code);
                      setLanguage(opt.code);
                    }}
                    className={`py-2 px-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      language === opt.code
                        ? 'tab-chip-active'
                        : 'tab-chip-inactive'
                    }`}
                  >
                    <span>{opt.flag}</span>
                    <span>{opt.nativeName}</span>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 dark:text-[#7A89A6]">
                {l(
                  'Arayüz başlıkları, harita ve sözlük anında seçilen dile uyarlanır.',
                  'All application views, badges, maps and dictionaries update instantly.',
                  'Alle Benutzeroberflächen, Abzeichen, Karten und Wörterbücher werden sofort angepasst.'
                )}
              </p>
            </div>

            <div className="glass-panel rounded-3xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                <Smartphone className="w-4 h-4 text-[#0F172A] dark:text-[#8E9DBE]" />
                {l('Çevrimdışı & PWA Durumu', 'Offline & PWA Capability', 'Offline- & PWA-Fähigkeit')}
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  {l(
                    'Uygulama internetsiz %100 çevrimdışı çalışmaya uygundur.',
                    '100% offline-ready without internet connectivity.',
                    'Die Anwendung funktioniert zu 100% offline ohne Internetverbindung.'
                  )}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-[#7A89A6]">
                {l(
                  'Ana ekrana ekle butonuyla telefona veya bilgisayara bağımsız uygulama gibi yüklenebilir.',
                  'Can be installed on your mobile home screen or desktop as a standalone app.',
                  'Kann als eigenständige App auf dem Startbildschirm oder Desktop installiert werden.'
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. VISA CHANGE ALERTS & NOTIFICATIONS */}
      {activeSubSection === 'alerts' && (
        <div className="space-y-4">
          <div className="glass-panel rounded-3xl p-6 space-y-2">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 tracking-[-0.02em]">
              <Bell className="w-5 h-5 text-[#0F172A] dark:text-[#8E9DBE]" />
              {l('Resmi Vize Politikası Değişiklikleri & Yaklaşan Düzenlemeler', 'Official Visa Policy Alerts & Upcoming Regulations', 'Offizielle Visapolitik-Meldungen & Bevorstehende Vorschriften')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-[#8E9DBE] max-w-2xl leading-relaxed">
              {l(
                'Dışişleri bakanlıkları ve konsolosluk genelgeleri doğrultusunda güncellenen en son vize rejim değişiklikleri.',
                'Recent border policy changes and consular circulars verified from ministries of foreign affairs.',
                'Aktuelle Änderungen der Grenzpolitik und konsularische Rundschreiben, verifiziert von Außenministerien.'
              )}
            </p>
          </div>

          <div className="space-y-3">
            {VISA_CHANGE_ALERTS.map(alert => (
              <div
                key={alert.id}
                className="glass-card rounded-2xl p-5 space-y-2.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl leading-none">{getFlag(alert.countryCode)}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {getCountryName(alert.countryCode, language)}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          alert.category === 'critical'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                            : alert.category === 'positive'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'bg-slate-100 text-slate-800 dark:bg-white/10 dark:text-white'
                        }`}>
                          {language === 'de' ? (alert.effectiveDateDe || alert.effectiveDateEn || alert.effectiveDate) : language === 'en' && alert.effectiveDateEn ? alert.effectiveDateEn : alert.effectiveDate}
                        </span>
                      </div>
                      <h4 className="font-semibold text-xs text-slate-800 dark:text-slate-200 mt-0.5">
                        {language === 'de' ? (alert.titleDe || alert.titleEn || alert.title) : language === 'en' && alert.titleEn ? alert.titleEn : alert.title}
                      </h4>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-[#8E9DBE] leading-relaxed">
                  {language === 'de' ? (alert.summaryDe || alert.summaryEn || alert.summary) : language === 'en' && alert.summaryEn ? alert.summaryEn : alert.summary}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-400 dark:text-[#7A89A6]">
                  <span>{l('Kaynak:', 'Source:', 'Quelle:')} {language === 'de' ? (alert.officialSourceDe || alert.officialSourceEn || alert.officialSource) : language === 'en' && alert.officialSourceEn ? alert.officialSourceEn : alert.officialSource}</span>
                  <a
                    href={alert.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-slate-900 dark:text-white hover:underline flex items-center gap-1"
                  >
                    {l('Resmi Kaynak', 'Official Notice', 'Offizielle Mitteilung')} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. FREE VS PRO MEMBERSHIP COMPARISON */}
      {activeSubSection === 'membership' && (
        <div className="space-y-4">
          <div className="glass-panel rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white tracking-[-0.02em]">
                  {l('Gezgin PRO Üyelik Modeli', 'Traveler PRO Membership Tier', 'Traveler PRO-Mitgliedschaftsmodell')}
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-[#8E9DBE] mt-1 max-w-xl">
                {l(
                  'Tüm temel vize verileri ve hesaplayıcılar sonsuza kadar ücretsizdir. Sık seyahat eden dijital göçebeler ve gezginler için gelişmiş lojistik özellikleri.',
                  'All core passport datasets and calculators remain free forever. Extended logistics capabilities are designed for frequent nomads.',
                  'Alle grundlegenden Passdaten und Rechner bleiben für immer kostenlos. Erweiterte Logistikfunktionen für Vielreisende und Nomaden.'
                )}
              </p>
            </div>

            <button
              type="button"
              onClick={handleTogglePro}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-2 ${
                isProActive
                  ? 'bg-emerald-600 text-white'
                  : 'btn-nubair-primary'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {isProActive
                ? l('PRO Aktif (Devre Dışı Bırak)', 'PRO Active (Disable)', 'PRO Aktiv (Deaktivieren)')
                : l('PRO Özelliklerini Test Et', 'Simulate PRO Membership', 'PRO-Mitgliedschaft testen')}
            </button>
          </div>

          {/* Matrix table */}
          <div className="glass-panel rounded-3xl overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50/80 dark:bg-white/[0.04] border-b border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold">
                <tr>
                  <th className="p-4">{l('Özellik & Yetenek', 'Feature & Capability', 'Funktion & Leistung')}</th>
                  <th className="p-4 text-center">{l('Ücretsiz Çekirdek', 'Free Core', 'Kostenlose Basis')}</th>
                  <th className="p-4 text-center text-slate-900 dark:text-white">{l('Gezgin PRO', 'Traveler PRO', 'Traveler PRO')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/10 text-slate-600 dark:text-[#8E9DBE]">
                <tr>
                  <td className="p-4 font-medium text-slate-900 dark:text-white">
                    {l('199 Ülke Pasaport Vize Rejimleri & Filtreler', '199 Passports Visa Datasets & Filters', '199 Reisepass-Visadatensätze & Filter')}
                  </td>
                  <td className="p-4 text-center text-emerald-600 font-bold">✓ {l('Sınırsız', 'Unlimited', 'Unbegrenzt')}</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">✓ {l('Sınırsız', 'Unlimited', 'Unbegrenzt')}</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900 dark:text-white">
                    {l('Schengen 90/180 Kayan Dönem Sayacı', 'Schengen 90/180-Day Rolling Stay Calculator', 'Schengen 90/180-Tage Rechner')}
                  </td>
                  <td className="p-4 text-center text-emerald-600 font-bold">✓ {l('Dahil', 'Included', 'Inbegriffen')}</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">✓ {l('Dahil', 'Included', 'Inbegriffen')}</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900 dark:text-white">
                    {l('Çok Ülkeli Rota Planlayıcı & Akıllı Coğrafi Sıralama', 'Multi-Country Route Planner & Geodesic Optimization', 'Mehrländer-Routenplaner & Geodätische Optimierung')}
                  </td>
                  <td className="p-4 text-center text-emerald-600 font-bold">✓ {l('Dahil', 'Included', 'Inbegriffen')}</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">✓ {l('Dahil', 'Included', 'Inbegriffen')}</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900 dark:text-white">
                    {l('Çifte Pasaport Avantaj & Sinerji Analizi', 'Dual Passport Synergy & Visa Advantage Matrix', 'Doppelpass-Synergie & Visavorteilsanalyse')}
                  </td>
                  <td className="p-4 text-center text-emerald-600 font-bold">✓ {l('Dahil', 'Included', 'Inbegriffen')}</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">✓ {l('Dahil', 'Included', 'Inbegriffen')}</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900 dark:text-white">
                    {l('183 Gün Vergi Mukimliği & Dijital Göçebe Kılavuzu', '183-Day Tax Residency & Nomad Guides', '183-Tage Steuerresidenz & Nomaden-Guides')}
                  </td>
                  <td className="p-4 text-center text-emerald-600 font-bold">✓ {l('Dahil', 'Included', 'Inbegriffen')}</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">✓ {l('Dahil', 'Included', 'Inbegriffen')}</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900 dark:text-white">
                    {l('Sınırsız Kayıtlı Rota & Özel İtinerary Arşivi', 'Saved Itineraries & Cloud Storage', 'Gespeicherte Reiserouten & Cloud-Speicher')}
                  </td>
                  <td className="p-4 text-center text-slate-400 dark:text-[#7A89A6]">{l('3 Rota', '3 Routes', '3 Routen')}</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">✓ {l('Sınırsız', 'Unlimited', 'Unbegrenzt')}</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900 dark:text-white">
                    {l('PDF Yazdırılabilir Rota & Vize Başvuru Özeti', 'Printable PDF Travel Itinerary & Summary', 'Druckbare PDF-Reiseroute & Visazusammenfassung')}
                  </td>
                  <td className="p-4 text-center text-slate-400 dark:text-[#7A89A6]">{l('Temel Metin', 'Basic Text', 'Basistext')}</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">✓ {l('Gelişmiş PDF', 'Advanced PDF', 'Erweitertes PDF')}</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-slate-900 dark:text-white">
                    {l('Reklamsız Saf Deneyim', 'Clean Experience (Zero Distractions)', 'Werbefreies, klares Erlebnis')}
                  </td>
                  <td className="p-4 text-center text-slate-400 dark:text-[#7A89A6]">{l('Sınırlı Sponsor Kartları', 'Limited Perks', 'Eingeschränkte Partnerkarten')}</td>
                  <td className="p-4 text-center text-emerald-600 font-bold">✓ 100% Pure</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. AFFILIATE / PARTNER CARDS */}
      {activeSubSection === 'affiliate' && (
        <div className="space-y-4">
          <div className="glass-panel rounded-3xl p-6 space-y-2">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 tracking-[-0.02em]">
              <Sparkles className="w-5 h-5 text-[#0F172A] dark:text-[#8E9DBE]" />
              {l('Faydalı Gezgin Araçları & Ortaklık Bağlantıları', 'Helpful Traveler Tools & Verified Partners', 'Nützliche Reise-Tools & Verifizierte Partner')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-[#8E9DBE] leading-relaxed">
              {l(
                'Seyahat ederken vize gereksinimlerini karşılamanıza yardımcı olan resmi ve güvenilir hizmet sağlayıcıları.',
                'Trusted global providers for international eSIM connectivity, travel insurance and flights.',
                'Verifizierte globale Anbieter für internationale eSIM-Konnektivität, Reiseversicherungen und Flüge.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AFFILIATE_PARTNERS.map((partner, pIdx) => {
              const lp = getLocalizedPartner(partner, language);
              return (
                <div
                  key={pIdx}
                  className="glass-card rounded-2xl p-5 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                        {lp.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-[10px] font-semibold text-slate-600 dark:text-[#8E9DBE]">
                        {lp.badge}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                      {lp.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-[#8E9DBE] mt-1 leading-relaxed">
                      {lp.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex justify-end">
                    <a
                      href={lp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white hover:underline"
                    >
                      {lp.linkText} <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-400 dark:text-[#7A89A6] text-center italic">
            {l(
              '* Şeffaflık Bildirimi: Bu bağlantılar bağımsız gezginler için yararlı üçüncü taraf araçları içerir.',
              '* Transparency Disclosure: These links connect to independent tools for international travelers.',
              '* Transparenzhinweis: Diese Links führen zu unabhängigen Tools für internationale Reisende.'
            )}
          </p>
        </div>
      )}

      {/* 5. DATASET LICENSE & LEGAL */}
      {activeSubSection === 'legal' && (
        <div className="space-y-4">
          <div className="glass-panel rounded-3xl p-6 space-y-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 tracking-[-0.02em]">
              <ShieldCheck className="w-5 h-5 text-[#0F172A] dark:text-[#8E9DBE]" />
              {l('Aşama 0: Veri Seti Lisansı & Doğrulama Metodolojisi', 'Dataset License & Verification Methodology', 'Datensatz-Lizenz & Verifizierungsmethodik')}
            </h3>
            <p className="text-xs text-slate-600 dark:text-[#8E9DBE] leading-relaxed">
              {l(
                `Bu uygulama, ${DATASET_LICENSE_INFO.name} veri tabanını kullanmakta olup ${DATASET_LICENSE_INFO.license} koşulları uyarınca açık kaynaklı olarak işletilmektedir.`,
                `This application relies on the ${DATASET_LICENSE_INFO.name} repository and operates under open-source ${DATASET_LICENSE_INFO.license} provisions.`,
                `Diese Anwendung basiert auf dem Datensatz ${DATASET_LICENSE_INFO.name} und wird unter den Bedingungen der Open-Source-Lizenz ${DATASET_LICENSE_INFO.license} betrieben.`
              )}
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 text-xs space-y-1.5">
              <span className="font-bold text-slate-800 dark:text-white block">
                {l('Veri Kaynakları & Doğrulama Ağları:', 'Data Sources & Verification Networks:', 'Datenquellen & Verifizierungsnetzwerke:')}
              </span>
              {DATASET_LICENSE_INFO.sources.map((src, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-slate-600 dark:text-[#8E9DBE]">
                  <span className="text-slate-400">•</span>
                  <span>{src}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={onOpenLegalModal}
                className="btn-nubair-primary text-xs"
              >
                {l('Tam KVKK, Yedekleme & Sorumluluk Reddi Raporunu Aç', 'Open Full Privacy, Backup & Legal Notice', 'Vollständigen Datenschutz-, Backup- & Haftungsausschlussbericht öffnen')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
