import React, { useState, useMemo } from 'react';
import {
  Laptop,
  Scale,
  Plane,
  AlertOctagon,
  ExternalLink,
  ShieldAlert,
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  Search,
  MapPin,
  Wifi,
  Compass,
  Flag,
  X,
  Coins,
  Building2,
  Coffee,
  Smartphone,
  Bike,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import {
  TRANSIT_RULES,
  getCountryName,
  getFlag
} from '../data/passportData';
import { NOMAD_HUBS, getLocalizedNomadHub, DigitalNomadHub } from '../data/nomadData';
import { computeTaxResidency, TripRecord } from '../utils/calculator';
import { loadStoredTrips } from '../utils/storage';
import { useI18n } from '../data/i18n';
import { ReportChangeModal } from './ReportChangeModal';
import { getConsularEmergencyInfo } from '../data/consularEmergencyData';
import { GEO_DATA } from '../data/geoData';

interface NomadToolsTabProps {
  defaultSubTab?: 'nomad' | 'tax' | 'transit' | 'emergency';
  currentPassport?: string;
}

export const NomadToolsTab: React.FC<NomadToolsTabProps> = ({ defaultSubTab = 'nomad', currentPassport = 'TR' }) => {
  const { language, t, l } = useI18n();
  const [activeSubTab, setActiveSubTab] = useState<'nomad' | 'tax' | 'transit' | 'emergency'>(defaultSubTab);
  const [trips] = useState<TripRecord[]>(() => loadStoredTrips());
  const [transitSearch, setTransitSearch] = useState('');
  const [reportingHub, setReportingHub] = useState<{ code: string; name: string } | null>(null);
  const [nomadSearch, setNomadSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedBudget, setSelectedBudget] = useState<string>('all');
  const [activeModalHub, setActiveModalHub] = useState<DigitalNomadHub | null>(null);
  const [locatorCountry, setLocatorCountry] = useState<string>('TH');

  const consularInfo = useMemo(() => {
    return getConsularEmergencyInfo(currentPassport, language);
  }, [currentPassport, language]);

  const getConsularText = (obj?: { tr: string; en: string; de: string }) => {
    if (!obj) return '';
    if (language === 'de') return obj.de || obj.en;
    if (language === 'en') return obj.en || obj.tr;
    if (language === 'tr') return obj.tr;
    return obj.en || obj.tr;
  };

  // Filtered Nomad Hubs
  const filteredNomadHubs = useMemo(() => {
    return NOMAD_HUBS.filter(hub => {
      if (selectedCountry !== 'all' && hub.countryCode !== selectedCountry) return false;
      if (selectedRegion !== 'all' && hub.region !== selectedRegion) return false;
      if (selectedBudget === 'ultra' && !hub.budgetLevel.startsWith('Ultra')) return false;
      if (selectedBudget === 'economic' && !hub.budgetLevel.startsWith('Ekonomik')) return false;
      if (selectedBudget === 'mid' && !hub.budgetLevel.startsWith('Orta')) return false;
      if (selectedBudget === 'premium' && !hub.budgetLevel.startsWith('Premium')) return false;
      if (nomadSearch.trim()) {
        const q = nomadSearch.toLowerCase();
        const loc = getLocalizedNomadHub(hub, language);
        const matchCountry = loc.countryName.toLowerCase().includes(q);
        const matchHub = loc.popularHubs.some(h => h.toLowerCase().includes(q));
        const matchVisa = loc.visaName.toLowerCase().includes(q);
        const matchVibe = loc.lifestyleVibe.toLowerCase().includes(q);
        if (!matchCountry && !matchHub && !matchVisa && !matchVibe) return false;
      }
      return true;
    });
  }, [selectedCountry, selectedRegion, selectedBudget, nomadSearch, language]);

  // Tax Residency calculation
  const taxStatuses = useMemo(() => {
    return computeTaxResidency(trips);
  }, [trips]);

  const countryFilterOptions = [
    { code: 'all', flag: '🌍', label: l('Tüm Ülkeler', 'All Countries', 'Alle Länder') },
    { code: 'TH', flag: '🇹🇭', label: l('Tayland', 'Thailand', 'Thailand') },
    { code: 'ID', flag: '🇮🇩', label: l('Bali (Endonezya)', 'Bali (Indonesia)', 'Bali (Indonesien)') },
    { code: 'VN', flag: '🇻🇳', label: l('Vietnam', 'Vietnam', 'Vietnam') },
    { code: 'GE', flag: '🇬🇪', label: l('Gürcistan', 'Georgia', 'Georgien') },
    { code: 'AL', flag: '🇦🇱', label: l('Arnavutluk', 'Albania', 'Albanien') },
    { code: 'ES', flag: '🇪🇸', label: l('İspanya', 'Spain', 'Spanien') },
    { code: 'PT', flag: '🇵🇹', label: l('Portekiz', 'Portugal', 'Portugal') },
    { code: 'AE', flag: '🇦🇪', label: l('Dubai (BAE)', 'Dubai (UAE)', 'Dubai (VAE)') },
    { code: 'CO', flag: '🇨🇴', label: l('Kolombiya', 'Colombia', 'Kolumbien') },
    { code: 'MY', flag: '🇲🇾', label: l('Malezya', 'Malaysia', 'Malaysia') },
    { code: 'MX', flag: '🇲🇽', label: l('Meksika', 'Mexico', 'Mexiko') },
    { code: 'CR', flag: '🇨🇷', label: l('Kosta Rika', 'Costa Rica', 'Costa Rica') },
    { code: 'BR', flag: '🇧🇷', label: l('Brezilya', 'Brazil', 'Brasilien') },
    { code: 'HU', flag: '🇭🇺', label: l('Macaristan', 'Hungary', 'Ungarn') }
  ];

  const regionFilterOptions = [
    { key: 'all', label: l('Tüm Bölgeler', 'All Regions', 'Alle Regionen') },
    { key: 'Güneydoğu Asya & Pasifik', label: l('🌴 Asya & Bali', '🌴 SE Asia & Bali', '🌴 SO-Asien & Bali') },
    { key: 'Balkanlar & Kafkaslar', label: l('🏔️ Kafkas & Balkan', '🏔️ Caucasus & Balkans', '🏔️ Kaukasus & Balkan') },
    { key: 'Latin Amerika', label: l('💃 Latin Amerika', '💃 Latin America', '💃 Lateinamerika') },
    { key: 'Avrupa & Akdeniz', label: l('☀️ Avrupa & Akdeniz', '☀️ Europe & Med', '☀️ Europa & Mittelmeer') },
    { key: 'Orta Doğu & Afrika', label: l('🏙️ Körfez / Dubai', '🏙️ Gulf / Dubai', '🏙️ Golf / Dubai') }
  ];

  const budgetFilterOptions = [
    { key: 'all', label: l('Tüm Bütçeler', 'All Budgets', 'Alle Budgets') },
    { key: 'ultra', label: l('🪙 Ultra Ekonomik (600-1100$)', '🪙 Ultra Budget ($600-$1,100)', '🪙 Ultra-Budget (600-1.100 $)') },
    { key: 'economic', label: l('💵 Ekonomik (1100-1600$)', '💵 Economic ($1,100-$1,600)', '💵 Sparsam (1.100-1.600 $)') },
    { key: 'mid', label: l('💳 Orta Seviye (1600-2400$)', '💳 Mid-range ($1,600-$2,400)', '💳 Mittelklasse (1.600-2.400 $)') },
    { key: 'premium', label: l('💎 Premium (2500$+)', '💎 Premium ($2,500+)', '💎 Premium (2.500 $+)') }
  ];

  return (
    <div className="space-y-6">
      {/* Sub Tabs Pill Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <div className="inline-flex p-1 rounded-full glass-panel border border-slate-200/70 dark:border-white/10 shadow-xs gap-1 whitespace-nowrap">
          <button
            type="button"
            onClick={() => setActiveSubTab('nomad')}
            className={`px-4.5 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'nomad'
                ? 'tab-chip-active'
                : 'tab-chip-inactive'
            }`}
          >
            <Laptop className="w-4 h-4" />
            {l('Dijital Göçebe Vizeleri (DNV)', 'Digital Nomad Visas (DNV)', 'Digitale Nomaden-Visa (DNV)')}
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('tax')}
            className={`px-4.5 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'tax'
                ? 'tab-chip-active'
                : 'tab-chip-inactive'
            }`}
          >
            <Scale className="w-4 h-4" />
            {l('183 Gün Vergi Monitörü', '183-Day Tax Monitor', '183-Tage Steuer-Monitor')}
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('transit')}
            className={`px-4.5 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'transit'
                ? 'tab-chip-active'
                : 'tab-chip-inactive'
            }`}
          >
            <Plane className="w-4 h-4" />
            {l('Transit Vize Kuralları', 'Transit Visa Rules', 'Transitvisum-Regeln')}
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('emergency')}
            className={`px-4.5 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'emergency'
                ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 shadow-xs'
                : 'text-rose-600 dark:text-rose-400 hover:bg-rose-500/10'
            }`}
          >
            <AlertOctagon className="w-4 h-4 text-rose-500" />
            {l('Acil Durum & Konsolosluk', 'Emergency & Consular Desk', 'Notfall & Konsulat')}
          </button>
        </div>
      </div>

      {/* 1. DIGITAL NOMAD VISAS (DNV) */}
      {activeSubTab === 'nomad' && (
        <div className="space-y-4">
          {/* Header */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Laptop className="w-5 h-5 text-teal-600" />
                  {l(
                    "Küresel Dijital Göçebe & Kolay İkamet Hub'ları (2026)",
                    'Global Digital Nomad & Easy Living Hubs (2026)',
                    'Globale digitale Nomaden- & Wohnsitze-Hubs (2026)'
                  )}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                  {l(
                    `Tayland, Bali, Da Nang gibi popüler ve ultra ekonomik merkezlerden Avrupa ve Latin Amerika'ya kadar kolay ikamet, sıfır vergi ve hızlı vize imkanı sunan ${NOMAD_HUBS.length} küresel göçebe rotası.`,
                    `From popular, ultra-economic nomad hotspots like Thailand, Bali, and Da Nang to Europe and the Americas, explore ${NOMAD_HUBS.length} global nomad destinations with streamlined visas and favorable tax regimes.`,
                    `Von beliebten, extrem günstigen Nomaden-Zentren wie Thailand, Bali und Da Nang bis nach Europa und Amerika: Entdecken Sie ${NOMAD_HUBS.length} globale Reiseziele mit einfachen Visa und Steuervorteilen.`
                  )}
                </p>
              </div>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 flex-shrink-0 self-start sm:self-auto">
                {filteredNomadHubs.length} {l('Destinasyon Listelendi', 'Destinations Listed', 'Ziele aufgelistet')}
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={nomadSearch}
                onChange={(e) => setNomadSearch(e.target.value)}
                placeholder={l(
                  'Şehir, ülke veya yaşam tarzı ara (Örn: Chiang Mai, Bali, sörf, Tiflis, 0% vergi, DTV...)',
                  'Search city, country, or vibe (e.g. Chiang Mai, Bali, surfing, Tbilisi, 0% tax, DTV...)',
                  'Stadt, Land oder Lebensstil suchen (z. B. Chiang Mai, Bali, Surfen, Tiflis, 0% Steuer, DTV...)'
                )}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-slate-100"
              />
            </div>

            {/* Country, Region & Budget Filters */}
            <div className="space-y-2.5 pt-1">
              {/* Country Selection Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                <span className="font-extrabold text-teal-800 dark:text-teal-300 whitespace-nowrap mr-1 flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  {l('Ülke Filtresi:', 'Country Filter:', 'Länderauswahl:')}
                </span>
                {countryFilterOptions.map(c => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => setSelectedCountry(c.code)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 text-xs ${
                      selectedCountry === c.code
                        ? 'bg-teal-600 text-white shadow-xs ring-2 ring-teal-400/50'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 hover:border-teal-500'
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>

              {/* Region Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                <span className="font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap mr-1">
                  {l('Bölge:', 'Region:', 'Region:')}
                </span>
                {regionFilterOptions.map(r => (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => setSelectedRegion(r.key)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                      selectedRegion === r.key
                        ? 'bg-teal-600 text-white shadow-2xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-750'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              {/* Budget Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                <span className="font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap mr-1">
                  {l('Maliyet:', 'Budget:', 'Budget:')}
                </span>
                {budgetFilterOptions.map(b => (
                  <button
                    key={b.key}
                    type="button"
                    onClick={() => setSelectedBudget(b.key)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                      selectedBudget === b.key
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-750'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNomadHubs.map(hub => {
              const loc = getLocalizedNomadHub(hub, language);
              return (
                <div
                  key={hub.id}
                  className="bg-white dark:bg-slate-900 border-2 border-teal-500/25 dark:border-teal-400/25 rounded-3xl p-5 shadow-xs hover:shadow-md space-y-4 flex flex-col justify-between transition-all"
                >
                  <div className="space-y-3">
                    {/* Top line with flag & budget badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-3xl sm:text-4xl leading-none">{getFlag(hub.countryCode)}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-slate-100">
                              {getCountryName(hub.countryCode, language) || loc.countryName}
                            </h3>
                            <span className="text-[11px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-md border border-teal-200 dark:border-teal-800">
                              {l(hub.region, hub.region === 'Güneydoğu Asya & Pasifik' ? 'SE Asia & Pacific' : hub.region === 'Balkanlar & Kafkaslar' ? 'Caucasus & Balkans' : hub.region === 'Latin Amerika' ? 'Latin America' : hub.region === 'Avrupa & Akdeniz' ? 'Europe & Med' : 'Middle East & Africa', hub.region === 'Güneydoğu Asya & Pasifik' ? 'SO-Asien & Pazifik' : hub.region === 'Balkanlar & Kafkaslar' ? 'Kaukasus & Balkan' : hub.region === 'Latin Amerika' ? 'Lateinamerika' : hub.region === 'Avrupa & Akdeniz' ? 'Europa & Mittelmeer' : 'Naher Osten & Afrika')}
                            </span>
                          </div>
                          <span className="text-xs sm:text-sm font-bold text-teal-600 dark:text-teal-400 block mt-0.5">
                            {loc.visaName}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Monthly Cost & Budget Pill */}
                    <div className="p-3 rounded-2xl bg-[#F0FDFA] dark:bg-[#062634] border border-[#5EEAD4]/60 dark:border-[#2DD4BF]/40 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-xs text-teal-800 dark:text-teal-300 block font-bold">
                          {l('Aylık Tahmini Yaşam Maliyeti (2026 Enflasyon Güncel):', 'Est. Monthly Cost of Living (2026):', 'Geschätzte Lebenshaltungskosten (2026):')}
                        </span>
                        <span className="font-black text-teal-950 dark:text-teal-100 text-sm sm:text-base mt-0.5 block">{loc.monthlyLivingCost}</span>
                      </div>
                      <span className="text-xs font-black px-2.5 py-1 rounded-full bg-teal-600 text-white shrink-0">
                        {loc.budgetLevel.split(' ')[0]}
                      </span>
                    </div>

                    {/* Key Stats Table */}
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl space-y-2 text-xs border border-slate-200/80 dark:border-slate-700">
                      <div className="flex justify-between gap-2">
                        <span className="text-slate-600 dark:text-slate-400 font-medium shrink-0">
                          {l('Asgari Gelir / Banka:', 'Min. Income / Bank:', 'Mindesteinkommen / Bankguthaben:')}
                        </span>
                        <span className="font-extrabold text-slate-900 dark:text-slate-100 text-right">{loc.incomeRequired}</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-slate-600 dark:text-slate-400 font-medium shrink-0">
                          {l('İkamet & Kalış Süresi:', 'Duration of Stay:', 'Aufenthaltsdauer:')}
                        </span>
                        <span className="font-extrabold text-slate-900 dark:text-slate-100 text-right">{loc.duration}</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-slate-600 dark:text-slate-400 font-medium shrink-0">
                          {l('Nasıl Kalınır?:', 'Pathway:', 'Voraussetzung & Ablauf:')}
                        </span>
                        <span className="font-extrabold text-emerald-700 dark:text-emerald-400 text-right">{loc.residencePathway}</span>
                      </div>
                    </div>

                    {/* Popular Hubs & Vibe */}
                    <div className="space-y-2 text-xs">
                      <div className="flex items-start gap-2 text-slate-800 dark:text-slate-200">
                        <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>
                          <b>{l('Popüler Şehirler:', 'Popular Cities:', 'Beliebte Städte:')}</b> {loc.popularHubs.join(', ')}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-slate-800 dark:text-slate-200">
                        <Wifi className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                        <span>
                          <b>{l('İnternet & Mekanlar:', 'Internet & Coworking:', 'Internet & Coworking:')}</b> {loc.internetAndCoworking}
                        </span>
                      </div>
                    </div>

                    {/* Tax Note */}
                    <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-950 dark:text-emerald-200">
                      <b>{l('💰 Vergi Rejimi:', '💰 Tax Regime:', '💰 Steuersystem:')}</b> {loc.taxRegime}
                    </div>

                    {/* Primary Button: Open Detailed Info Card */}
                    <button
                      type="button"
                      onClick={() => setActiveModalHub(hub)}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-teal-600 via-sky-600 to-teal-600 hover:brightness-110 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                    >
                      <span>{l('Detaylı Rehber & 2026 Bütçe Dökümü →', 'Detailed Guide & 2026 Cost Breakdown →', 'Detaillierter Leitfaden & 2026 Budget →')}</span>
                    </button>
                  </div>

                  {/* Action Buttons: Google Maps + Official Portal + Report Change */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 text-xs flex-wrap">
                    <div className="flex items-center gap-3">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hub.googleMapsQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-sky-600 dark:text-sky-400 hover:underline"
                        title={l("Google Haritalar'da popüler coworking ve kafeleri inceleyin", 'Explore hubs on Google Maps', 'Coworking-Spaces auf Google Maps erkunden')}
                      >
                        <MapPin className="w-3.5 h-3.5 text-sky-500" />
                        {l('Haritada Keşfet', 'Explore on Map', 'Auf Karte erkunden')}
                      </a>

                      <button
                        type="button"
                        onClick={() => setReportingHub({ code: hub.countryCode, name: getCountryName(hub.countryCode, language) || loc.countryName })}
                        className="inline-flex items-center gap-1 font-semibold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                        title={t.reportChange}
                      >
                        <Flag className="w-3 h-3 text-rose-500" />
                        <span>{t.reportChange}</span>
                      </button>
                    </div>

                    <a
                      href={hub.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-teal-600 dark:text-teal-400 hover:underline"
                    >
                      {l('Resmi Başvuru Sitesi', 'Official Portal', 'Offizielles Portal')} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Nomad Info Modal (Full-Screen Dedicated Page) */}
          {activeModalHub && (() => {
            const loc = getLocalizedNomadHub(activeModalHub, language);
            return (
              <div
                role="region"
                aria-label={getCountryName(activeModalHub.countryCode, language) || loc.countryName}
                tabIndex={-1}
                className="fixed inset-0 z-50 bg-[#F8FAFC] dark:bg-[#0B0F17] flex flex-col overflow-hidden text-slate-900 dark:text-slate-100 animate-in fade-in duration-150"
              >
                {/* 1. TOP EXECUTIVE APP BAR (100% FULL-WIDTH, REAL STANDALONE PAGE ARCHITECTURE) */}
                <header className="sticky top-0 z-30 shrink-0 px-4 sm:px-8 py-3 bg-white/95 dark:bg-[#0B0F17]/95 border-b border-slate-200/80 dark:border-white/10 backdrop-blur-md">
                  <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
                    {/* Left: Back Button + Flag + Title */}
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <button
                        type="button"
                        onClick={() => setActiveModalHub(null)}
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 transition-all cursor-pointer shrink-0"
                        title={l('Göçebe Rehberine Dön', 'Back to Nomad Hubs')}
                      >
                        <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                        <span>{l('Göçebe Rehberine Dön', 'Back to Hubs')}</span>
                      </button>

                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-2xl sm:text-3xl leading-none select-none shrink-0">
                          {getFlag(activeModalHub.countryCode)}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h1 className="text-base sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
                              {getCountryName(activeModalHub.countryCode, language) || loc.countryName}
                            </h1>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                              {loc.budgetLevel}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-teal-700 dark:text-teal-400 truncate mt-0.5">
                            {loc.visaName}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Action: Close Button [ ✕ ] */}
                    <button
                      type="button"
                      onClick={() => setActiveModalHub(null)}
                      className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                      title={l('Kapat', 'Close')}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </header>

                {/* 2. MAIN SCROLLABLE BODY */}
                <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
                  <div className="max-w-7xl mx-auto space-y-6">
                    {/* 1. Cost Breakdown Section */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <h3 className="text-sm sm:text-base font-black text-[#042F2E] dark:text-white flex items-center gap-2">
                          <Coins className="w-4 h-4 text-amber-500" />
                          <span>{l('2026 Enflasyon Güncel Yaşam Maliyeti Dökümü', '2026 Inflation-Adjusted Cost of Living Breakdown', 'Lebenshaltungskosten-Aufschlüsselung 2026')}</span>
                        </h3>
                        <span className="text-xs font-black px-3 py-1 rounded-xl bg-teal-600 text-white shadow-xs">
                          {l('Toplam Aylık Tahmini:', 'Total Est. Monthly:', 'Geschätzt monatlich:')} {loc.monthlyLivingCost}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                        <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-teal-200 dark:border-slate-700">
                          <span className="text-[11px] font-bold text-teal-800 dark:text-teal-300 block flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-teal-600" />
                            <span>{l('1+1 Daire / Villa', '1-Bed Apt / Villa', '1-Zi-Wohnung / Villa')}</span>
                          </span>
                          <div className="text-xs sm:text-sm font-black text-[#042F2E] dark:text-white mt-1">
                            {activeModalHub.costBreakdown?.rent1Bed || '400 - 800 $'}
                          </div>
                        </div>

                        <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-teal-200 dark:border-slate-700">
                          <span className="text-[11px] font-bold text-teal-800 dark:text-teal-300 block flex items-center gap-1">
                            <Coffee className="w-3.5 h-3.5 text-amber-600" />
                            <span>{l('Yeme & Beslenme', 'Food & Dining', 'Verpflegung')}</span>
                          </span>
                          <div className="text-xs sm:text-sm font-black text-[#042F2E] dark:text-white mt-1">
                            {activeModalHub.costBreakdown?.foodDining || '250 - 450 $'}
                          </div>
                        </div>

                        <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-teal-200 dark:border-slate-700">
                          <span className="text-[11px] font-bold text-teal-800 dark:text-teal-300 block flex items-center gap-1">
                            <Wifi className="w-3.5 h-3.5 text-sky-600" />
                            <span>{l('Coworking / Ofis', 'Coworking Space', 'Coworking')}</span>
                          </span>
                          <div className="text-xs sm:text-sm font-black text-[#042F2E] dark:text-white mt-1">
                            {activeModalHub.costBreakdown?.coworking || '90 - 150 $'}
                          </div>
                        </div>

                        <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-teal-200 dark:border-slate-700">
                          <span className="text-[11px] font-bold text-teal-800 dark:text-teal-300 block flex items-center gap-1">
                            <Smartphone className="w-3.5 h-3.5 text-indigo-600" />
                            <span>{l('5G Sınırsız SIM', '5G Unlimited SIM', '5G SIM-Karte')}</span>
                          </span>
                          <div className="text-xs sm:text-sm font-black text-[#042F2E] dark:text-white mt-1">
                            {activeModalHub.costBreakdown?.mobileSim || '12 - 25 $'}
                          </div>
                        </div>

                        <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-teal-200 dark:border-slate-700">
                          <span className="text-[11px] font-bold text-teal-800 dark:text-teal-300 block flex items-center gap-1">
                            <Bike className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{l('Scooter / Ulaşım', 'Transit / Scooter', 'Transport / Roller')}</span>
                          </span>
                          <div className="text-xs sm:text-sm font-black text-[#042F2E] dark:text-white mt-1">
                            {activeModalHub.costBreakdown?.localTransit || '40 - 80 $'}
                          </div>
                        </div>

                        <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-teal-200 dark:border-slate-700">
                          <span className="text-[11px] font-bold text-teal-800 dark:text-teal-300 block flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                            <span>{l('Kahve / Sosyal', 'Coffee / Social', 'Kaffee / Bar')}</span>
                          </span>
                          <div className="text-xs sm:text-sm font-black text-[#042F2E] dark:text-white mt-1">
                            {activeModalHub.costBreakdown?.coffeeOrBeer || '1.5 - 3.5 $'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. Visa & Criteria */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-teal-200 dark:border-slate-700 space-y-2.5">
                        <h4 className="text-xs sm:text-sm font-black text-teal-800 dark:text-teal-300 flex items-center gap-1.5 uppercase tracking-wide">
                          <Scale className="w-4 h-4 text-teal-600" />
                          <span>{l('Gelir & Başvuru Kriterleri', 'Income & Eligibility Rules')}</span>
                        </h4>
                        <div className="space-y-2 text-xs">
                          <div>
                            <b className="text-slate-900 dark:text-white">{l('Asgari Gelir / Banka Hesabı:', 'Min. Income / Bank Balance:')}</b>{' '}
                            <span className="font-semibold text-teal-900 dark:text-teal-200">{loc.incomeRequired}</span>
                          </div>
                          <div>
                            <b className="text-slate-900 dark:text-white">{l('Kalış Süresi & Vize Geçerliliği:', 'Stay Duration & Validity:')}</b>{' '}
                            <span className="font-semibold text-teal-900 dark:text-teal-200">{loc.duration}</span>
                          </div>
                          <div>
                            <b className="text-slate-900 dark:text-white">{l('Nasıl Kalınır?:', 'Residence Pathway:')}</b>{' '}
                            <span className="font-semibold text-emerald-700 dark:text-emerald-300">{loc.residencePathway}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-teal-200 dark:border-slate-700 space-y-2.5">
                        <h4 className="text-xs sm:text-sm font-black text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 uppercase tracking-wide">
                          <ShieldAlert className="w-4 h-4 text-emerald-600" />
                          <span>{l('Vergi Mevzuatı & 183 Gün Kuralları', 'Tax Laws & 183-Day Rules')}</span>
                        </h4>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                          {loc.taxRegime}
                        </p>
                        <div className="text-[11px] font-bold text-teal-700 dark:text-teal-300 pt-1 border-t border-teal-100 dark:border-slate-700">
                          ⏱️ {l('Ortalama Başvuru Sonuçlanma Süresi:', 'Avg. Processing Time:')} <span className="text-slate-900 dark:text-white font-extrabold">{loc.processingTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* 3. Key Requirements Checklist */}
                    <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-teal-200 dark:border-slate-700 space-y-2.5">
                      <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wide">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{l('Resmi Başvuru Gereksinimleri Kontrol Listesi', 'Official Requirements Checklist')}</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {loc.keyRequirements.map((req, rIdx) => (
                          <div key={rIdx} className="flex items-start gap-2 p-2 rounded-xl bg-teal-50/60 dark:bg-slate-800/60 border border-teal-100 dark:border-slate-700 font-medium text-slate-800 dark:text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 4. Popular Hubs & Vibe */}
                    <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-teal-200 dark:border-slate-700 space-y-2 text-xs">
                      <div className="flex items-start gap-2 text-slate-800 dark:text-slate-200">
                        <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span><b>{l('Popüler Şehirler:', 'Popular Cities:')}</b> {loc.popularHubs.join(', ')}</span>
                      </div>
                      <div className="flex items-start gap-2 text-slate-800 dark:text-slate-200">
                        <Wifi className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                        <span><b>{l('İnternet Altyapısı & Mekanlar:', 'Internet & Coworking:')}</b> {loc.internetAndCoworking}</span>
                      </div>
                      <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300 italic">
                        <Compass className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span><b>{l('Ortam & Yaşam Tarzı (Vibe):', 'Lifestyle & Vibe:')}</b> {loc.lifestyleVibe}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeModalHub.googleMapsQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800 font-bold text-xs flex items-center justify-center gap-2 hover:bg-sky-100 transition-colors"
                      >
                        <MapPin className="w-4 h-4 text-sky-600" />
                        <span>{l("Google Haritalar'da Coworking & Mekanları Gör", 'View Hubs on Google Maps')}</span>
                      </a>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <a
                          href={activeModalHub.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                        >
                          <span>{l('Resmi Başvuru Portalını Aç', 'Open Official Portal')}</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            );
          })()}
        </div>
      )}

      {/* 2. 183 DAYS TAX RESIDENCY TRACKER */}
      {activeSubTab === 'tax' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Scale className="w-5 h-5 text-teal-600" />
              {l('183 Gün Kuralı & Vergi Mukimliği Takibi', '183-Day Rule & Tax Residency Monitor', '183-Tage-Regel & Steuerwohnsitz-Monitor')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              {l(
                'OECD ve uluslararası vergi hukuku uyarınca, bir ülkede tek bir takvim yılı içinde (1 Ocak – 31 Aralık) kesintisiz veya aralıklı olarak 183 günden fazla bulunursanız, o ülkenin tam mükellef vergi mukimi haline gelebilir ve dünya geneli gelirleriniz üzerinden vergilendirilme riskiyle karşılaşabilirsiniz.',
                'Under OECD guidelines and international tax conventions, spending more than 183 days within a single calendar year (Jan 1 – Dec 31) in a jurisdiction may trigger tax residency, exposing worldwide income to local taxation.',
                'Nach OECD-Richtlinien und DBA-Standards kann ein Aufenthalt von mehr als 183 Tagen im Kalenderjahr (1. Jan. – 31. Dez.) eine unbeschränkte Steuerpflicht auf das weltweite Einkommen im jeweiligen Land begründen.'
              )}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 leading-relaxed space-y-1.5">
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              {l('Vergi Mukimliğine Girmeden Seyahat Taktikleri', 'Nomad Tax Planning Tips', 'Steuerplanungstipps für Nomaden')}
            </div>
            <p>
              {l(
                '• Bir takvim yılında hiçbir yabancı ülkede 180 günden fazla kalmamaya özen gösterin.',
                '• Monitor stay days carefully and avoid exceeding 180 days in any foreign jurisdiction per year.',
                '• Achten Sie darauf, in keinem einzelnen ausländischen Land mehr als 180 Tage pro Kalenderjahr zu verbringen.'
              )}
            </p>
            <p>
              {l(
                '• Şirket veya serbest meslek kazançlarınız için Türkiye veya Gürcistan gibi vergi mukimliği merkezinizde vergi ödediğinizi kanıtlayan Mukimlik Belgesi (Certificate of Tax Residence) edinin.',
                '• Maintain a formal Certificate of Tax Residence from your primary home country or chosen base (e.g. Turkey, Georgia).',
                '• Halten Sie eine Ansässigkeitsbescheinigung (Certificate of Tax Residence) Ihres Hauptwohnsitzes (z. B. Türkei, Georgien) bereit.'
              )}
            </p>
            <p>
              {l(
                '• Çifte Vergilendirmeyi Önleme Anlaşmaları (ÇVÖA) haklarınızı korumak için seyahat tarihlerinizi ve uçuş biniş kartlarınızı arşivleyin.',
                '• Keep airline boarding passes and passport stamps logged to substantiate treaty rights under Double Taxation Avoidance Agreements (DTAA).',
                '• Archivieren Sie Bordkarten und Einreisestempel, um Ihre Rechte aus Doppelbesteuerungsabkommen (DBA) belegen zu können.'
              )}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              {l(
                `Bu Yılki Seyahatleriniz ve Mukimlik Sınırına Kalan Günler (${new Date().getFullYear()})`,
                `Trips This Year & Days Remaining Before 183-Day Threshold (${new Date().getFullYear()})`,
                `Reisen in diesem Jahr & Tage bis zur 183-Tage-Grenze (${new Date().getFullYear()})`
              )}
            </h3>

            {taxStatuses.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                {l(
                  'Kalan Gün Sayacı veya Rota sekmelerinde ülke bazlı henüz seyahat kaydı bulunmuyor. Seyahat ekledikçe vergi gün sayacı burada otomatik belirecektir.',
                  'No trip records logged yet. As you record trips in the Schengen & Stay Tracker tab, tax status counters will appear here automatically.',
                  'Noch keine Reisen erfasst. Sobald Sie Reisen im Aufenthaltstage-Tracker eintragen, wird der Steuerstatus hier automatisch berechnet.'
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {taxStatuses.map(status => {
                  const countryName = getCountryName(status.countryCode, language);
                  const percent = Math.min(100, (status.daysSpent / status.limit) * 100);

                  return (
                    <div
                      key={status.countryCode}
                      className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                          <span>{getFlag(status.countryCode)}</span>
                          <span>{countryName}</span>
                        </div>
                        <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                          {status.daysSpent} / {status.limit} {l('gün', 'days', 'Tage')}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${percent}%` }}
                          className={`h-full rounded-full transition-all ${
                            status.status === 'exceeded'
                              ? 'bg-rose-600'
                              : status.status === 'danger'
                              ? 'bg-rose-500'
                              : status.status === 'warning'
                              ? 'bg-amber-500'
                              : 'bg-teal-500'
                          }`}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>
                          {l('Mukimlik eşiğine kalan: ', 'Days left before threshold: ', 'Verbleibende Tage bis zur Grenze: ')}
                          <b>{status.daysRemaining} {l('gün', 'days', 'Tage')}</b>
                        </span>
                        {status.status === 'exceeded' ? (
                          <span className="text-rose-600 font-bold flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            {l('183 Gün Aşıldı (Vergi Mukimi Riski)', '183-Day Limit Exceeded (Tax Risk)', '183-Tage-Grenze überschritten (Steuerrisiko)')}
                          </span>
                        ) : status.status === 'danger' ? (
                          <span className="text-rose-500 font-semibold">
                            {l('Kritik Sınıra Yakın (150+ Gün)', 'Near Critical Limit (150+ Days)', 'Nahe kritischer Grenze (150+ Tage)')}
                          </span>
                        ) : status.status === 'warning' ? (
                          <span className="text-amber-500 font-semibold">
                            {l('Dikkat (120+ Gün)', 'Caution (120+ Days)', 'Achtung (120+ Tage)')}
                          </span>
                        ) : (
                          <span className="text-emerald-600 font-semibold">
                            {l('Güvenli Bölgede', 'Safe Zone', 'Sicherer Bereich')}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. TRANSIT VISA RULES */}
      {activeSubTab === 'transit' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Plane className="w-5 h-5 text-teal-600" />
                {l(
                  'Uluslararası Havalimanı Transit Vize Kuralları Rehberi',
                  'International Airport Transit Visa Rules',
                  'Leitfaden für internationale Flughafentransit-Visa'
                )}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed mt-1">
                {l(
                  'Farklı ülkelere uçarken aktarma (transit) yapacağınız havalimanında pasaport kontrolünden geçmeseniz dahi transit vizeye ihtiyaç duyup duymayacağınızı kontrol edin.',
                  'Verify whether you need an Airport Transit Visa (ATV) or can transit without visa (TWOV) when connecting through global flight hubs.',
                  'Prüfen Sie, ob Sie bei internationalen Umsteigeverbindungen ein Flughafentransitvisum (ATV) benötigen oder visumfrei im Transitbereich bleiben können.'
                )}
              </p>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={transitSearch}
                onChange={(e) => setTransitSearch(e.target.value)}
                placeholder={l(
                  'Aktarma merkezi veya kural ara (Örn: BAE, Katar, Singapur, Çin, Heathrow, ATV...)',
                  'Search hub, country, or rule (e.g. UAE, Qatar, Singapore, China, Heathrow, ATV...)',
                  'Drehkreuz, Land oder Regel suchen (z. B. VAE, Katar, Singapur, China, Heathrow, ATV...)'
                )}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TRANSIT_RULES.filter(rule => {
              if (!transitSearch.trim()) return true;
              const q = transitSearch.toLowerCase();
              return (
                rule.countryName.toLowerCase().includes(q) ||
                rule.ruleTitle.toLowerCase().includes(q) ||
                (rule.ruleTitleEn && rule.ruleTitleEn.toLowerCase().includes(q)) ||
                rule.countryCode.toLowerCase().includes(q) ||
                rule.summary.toLowerCase().includes(q) ||
                (rule.summaryEn && rule.summaryEn.toLowerCase().includes(q))
              );
            }).map(rule => {
              const displayTitle = l(rule.ruleTitle, rule.ruleTitleEn || rule.ruleTitle, rule.ruleTitleEn || rule.ruleTitle);
              const displaySummary = l(rule.summary, rule.summaryEn || rule.summary, rule.summaryEn || rule.summary);
              const displayConditions = language === 'tr' ? rule.conditions : (rule.conditionsEn || rule.conditions);
              const displayExceptions = language === 'tr' ? rule.exceptions : (rule.exceptionsEn || rule.exceptions);

              return (
                <div
                  key={rule.countryCode}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xs space-y-3.5 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-2xl">{rule.countryCode === 'EU' ? '🇪🇺' : getFlag(rule.countryCode)}</span>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                          {getCountryName(rule.countryCode, language) || rule.countryName}
                        </h3>
                        <span className="text-[11px] font-semibold text-teal-600 dark:text-teal-400">
                          {displayTitle}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {displaySummary}
                    </p>

                    <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                      <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        {l('Zorunlu Koşullar:', 'Mandatory Conditions:', 'Zwingende Voraussetzungen:')}
                      </span>
                      {displayConditions.map((c, cIdx) => (
                        <div key={cIdx} className="flex items-start gap-1.5 text-slate-600 dark:text-slate-400">
                          <span className="text-rose-500 font-bold">•</span>
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1.5 p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-300">
                      <span className="font-bold block mb-1">
                        {l('✅ Muafiyet Durumları:', '✅ Exemptions:', '✅ Befreiungen & Ausnahmen:')}
                      </span>
                      {displayExceptions.map((ex, exIdx) => (
                        <div key={exIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{ex}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {rule.officialUrl && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                      <a
                        href={rule.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
                      >
                        {l('Resmi Transit Kılavuzu', 'Official Transit Guide', 'Offizieller Transit-Leitfaden')} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. EMERGENCY & CONSULATE PANEL (DYNAMIC CROSS-PASSPORT) */}
      {activeSubTab === 'emergency' && (
        <div className="space-y-5">
          {/* Active Passport Notice Bar */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">{getFlag(currentPassport)}</span>
              <div>
                <span className="font-extrabold text-slate-900 dark:text-white">
                  {getCountryName(currentPassport, language)} {l('Pasaportu Diplomatik & Kriz Konsolu', 'Passport Consular & Crisis Console', 'Konsular- & Krisenkonsole')}
                </span>
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">
                  {l(
                    'Bu panel seçili pasaportunuzun resmi Dışişleri Bakanlığı ve acil kriz protokollerine göre dinamik olarak düzenlenmiştir.',
                    'This console is dynamically customized according to the official MFA crisis protocols of your selected passport.',
                    'Diese Konsole ist dynamisch an die offiziellen Notfallprotokolle Ihres ausgewählten Reisepasses angepasst.'
                  )}
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-teal-600/10 text-teal-600 dark:text-teal-400 font-bold text-[11px] border border-teal-500/20 whitespace-nowrap hidden sm:inline-block">
              {l('✓ Resmi Veri Tabanı', '✓ Verified Database', '✓ Verifizierte Datenbank')}
            </span>
          </div>

          {/* Hotline hero card: Soft, muted crimson glassmorphism plate with subtle borders */}
          <div className="glass-crisis rounded-3xl p-6 sm:p-8 border border-rose-500/25 dark:border-rose-500/20 text-slate-900 dark:text-slate-100 shadow-xl space-y-5 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20 px-3.5 py-1.5 rounded-full flex items-center gap-2">
                <span>{getFlag(currentPassport)}</span>
                <span>{l('7/24 KESİNTİSİZ ACİL KRİZ HATTI', '24/7 DIPLOMATIC CRISIS HOTLINE', '24/7 KONSULARISCHER NOTRUF')}</span>
              </span>
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-600 dark:text-rose-400">
                <AlertOctagon className="w-5 h-5" />
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {getConsularText(consularInfo?.ministryName)}
              </h2>
              <h3 className="text-sm font-semibold text-rose-600 dark:text-rose-400 mt-1">
                {getConsularText(consularInfo?.crisisCenterTitle)}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2.5 max-w-xl leading-relaxed">
                {l(
                  `${getCountryName(currentPassport, language)} vatandaşları yurt dışında pasaport kaybı, tutuklanma, doğal afet, kaza veya acil tahliye durumlarında bu hattan 7 gün 24 saat doğrudan destek alabilir.`,
                  `Citizens of ${getCountryName(currentPassport, language)} can directly access 24/7 consular protection abroad for lost passports, detention, accidents, or crisis evacuation.`,
                  `Staatsangehörige von ${getCountryName(currentPassport, language)} erhalten unter dieser Notfallnummer weltweit 24/7 konsularischen Beistand bei Passverlust, Festnahme oder Unfällen.`
                )}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3.5">
              <a
                href={consularInfo?.hotline247 ? `tel:${consularInfo.hotline247.replace(/\s+/g, '')}` : '#'}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500/90 via-rose-500 to-orange-500/90 text-white font-extrabold text-sm shadow-lg shadow-rose-500/20 hover:shadow-rose-500/35 hover:scale-[1.02] transition-all cursor-pointer border border-rose-400/30"
              >
                <PhoneCall className="w-4 h-4 text-white" />
                <span>{consularInfo?.hotline247 || l('Nöbetçi Kriz Masası', 'Crisis Center', 'Krisenstab')}</span>
              </a>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                ({l('Doğrudan Hat', 'Direct Line', 'Direkte Hotline')}: <b className="text-slate-700 dark:text-slate-200">{consularInfo?.hotlineDomestic || '-'}</b>)
              </span>
            </div>
          </div>

          {/* Interactive Foreign Mission Locator (Bulunduğunuz Ülkedeki Temsilciliği Bulun) */}
          <div className="glass-card border border-slate-200/80 dark:border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <MapPin className="w-4.5 h-4.5 text-rose-500" />
                  <span>{l('Bulunduğunuz Ülkedeki Temsilciliğinizi Haritada Bulun', 'Find Your Diplomatic Mission Abroad', 'Finden Sie Ihre Auslandsvertretung')}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {l(
                    `Şu an seyahat ettiğiniz ülkeyi seçerek ${getCountryName(currentPassport, language)} Büyükelçiliği ve Konsolosluklarının adres, telefon ve canlı konumuna ulaşın:`,
                    `Select the country you are visiting to access verified Google Maps navigation to the Embassy of ${getCountryName(currentPassport, language)}:`,
                    `Wählen Sie Ihr Aufenthaltsland, um die zuständige Vertretung von ${getCountryName(currentPassport, language)} zu finden:`
                  )}
                </p>
              </div>

              {/* Destination Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">
                  📍 {l('Bulunduğunuz Ülke:', 'Destination:', 'Aufenthaltsland:')}
                </span>
                <select
                  value={locatorCountry}
                  onChange={(e) => setLocatorCountry(e.target.value)}
                  className="px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.08] text-xs font-bold text-slate-900 dark:text-white cursor-pointer focus:ring-2 focus:ring-rose-500/20"
                >
                  {Object.keys(GEO_DATA).map(code => (
                    <option key={code} value={code}>
                      {getFlag(code)} {getCountryName(code, language)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Locator Result Card */}
            <div className="p-5 rounded-2xl glass-panel border border-slate-200/80 dark:border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3.5">
                <span className="text-3xl leading-none">🏛️</span>
                <div>
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>{getCountryName(currentPassport, language)} {l('Büyükelçiliği & Konsolosluğu', 'Embassy & Consulates', 'Botschaft & Konsulate')}</span>
                    <span className="text-slate-400 font-normal">({getCountryName(locatorCountry, language)})</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {l(
                      'Acil durum randevuları, geçici seyahat belgesi başvurusu ve noter/adli konsolosluk işlemleri için yetkili misyon.',
                      'Accredited diplomatic mission for emergency travel documents, citizen assistance, and legal affairs.',
                      'Zuständige diplomatische Vertretung für Notreisedokumente und Notfall-Bürgerservice.'
                    )}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const passEn = getCountryName(currentPassport, 'en');
                  const destEn = getCountryName(locatorCountry, 'en');
                  const q = `${passEn} Embassy in ${destEn}`;
                  window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`, '_blank', 'noopener,noreferrer');
                }}
                className="btn-nubair-primary px-5 py-2.5 text-xs font-bold shadow-xs whitespace-nowrap"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{l('Google Haritalar’da Canlı Konumu Gör →', 'View on Google Maps →', 'Auf Google Maps ansehen →')}</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </button>
            </div>
          </div>

          {/* Emergency 4-Step Protocol for Lost Passport */}
          <div className="glass-card border border-slate-200/80 dark:border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-white/[0.06] pb-4">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-500" />
                {l(
                  `${getCountryName(currentPassport, language)} Vatandaşları İçin Pasaport Kaybı / Çalınması Kılavuzu: 4 Adım`,
                  `Passport Lost or Stolen Abroad: 4-Step Action Guide (${getCountryName(currentPassport, language)})`,
                  `Passverlust oder Diebstahl im Ausland: 4-Schritte-Leitfaden (${getCountryName(currentPassport, language)})`
                )}
              </h3>
              <div className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-3.5 py-1.5 rounded-full border border-rose-500/20 whitespace-nowrap self-start sm:self-auto">
                📄 {getConsularText(consularInfo?.emergencyDocName)}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-2xl border border-slate-200/70 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.02] space-y-2">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center justify-center text-xs font-black">1</span>
                  {l('Polis Karakoluna Gidin & Tutanak Alın', 'File Police Report at Local Station', 'Polizeiprotokoll anfordern')}
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                  {getConsularText(consularInfo?.steps?.policeReport)}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200/70 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.02] space-y-2">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center justify-center text-xs font-black">2</span>
                  {l('Biyometrik Vesikalık Fotoğraf Çektirin', 'Obtain Compliant Passport Photos', 'Biometrische Passfotos erstellen')}
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                  {getConsularText(consularInfo?.steps?.photos)}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200/70 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.02] space-y-2">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center justify-center text-xs font-black">3</span>
                  {l('En Yakın Diplomatik Misyonunuza Başvurun', 'Submit Case to Consular Mission', 'Zuständige Auslandsvertretung kontaktieren')}
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                  {getConsularText(consularInfo?.steps?.embassySubmission)}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200/70 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.02] space-y-2">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center justify-center text-xs font-black">4</span>
                  {l('Geçici Seyahat Belgenizi Teslim Alın', 'Receive Emergency Return Certificate', 'Notreisedokument entgegennehmen')}
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                  {getConsularText(consularInfo?.steps?.travelDocIssuance)}
                </p>
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 pt-1.5 border-t border-slate-200/50 dark:border-white/[0.06]">
                  ⚠️ {getConsularText(consularInfo?.emergencyDocValidity)}
                </div>
              </div>
            </div>

            {/* Official Portal Link & International dispatch notice */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <a
                href={consularInfo?.officialPortalUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-rose-600 dark:text-rose-400 hover:underline"
              >
                <span>🌐 {consularInfo?.officialPortalName || l('Dışişleri Portalı', 'Foreign Affairs Portal')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-slate-400 text-[11px]">
                {l(
                  "Uluslararası Acil Durum Numaraları: Avrupa 112 · ABD/Kanada 911 · Birleşik Krallık 999 · Japonya 110/119 · Tayland 191/1155",
                  'International Emergency Dispatch: Europe 112 · US/Canada 911 · UK 999 · Japan 110/119 · Thailand 191/1155',
                  'Internationale Notrufnummern: Europa 112 · USA/Kanada 911 · UK 999 · Japan 110/119 · Thailand 191/1155'
                )}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Community Change Reporting Modal */}
      <ReportChangeModal
        isOpen={!!reportingHub}
        onClose={() => setReportingHub(null)}
        defaultCountryCode={reportingHub?.code}
        defaultCountryName={reportingHub?.name}
        categoryHint="nomad"
      />
    </div>
  );
};
