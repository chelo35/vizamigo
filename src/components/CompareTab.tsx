import React, { useState, useMemo } from 'react';
import { Scale, Sparkles, ArrowRightLeft } from 'lucide-react';
import {
  CountryItem,
  CAT_INFO,
  getCountryName,
  getFlag,
  getCategoryBadgeLabel,
  D
} from '../data/passportData';
import { compareDualPassports, DualPassportComparison } from '../utils/calculator';
import { PassportSelectModal } from './PassportSelectModal';
import { useI18n } from '../data/i18n';

interface CompareTabProps {
  initialPassportA: string;
  initialPassportB: string;
}

export const CompareTab: React.FC<CompareTabProps> = ({
  initialPassportA,
  initialPassportB,
}) => {
  const { language, t, l } = useI18n();
  const [passportA, setPassportA] = useState<string>(initialPassportA);
  const [passportB, setPassportB] = useState<string>(initialPassportB || (initialPassportA === 'DE' ? 'TR' : 'DE'));
  const [activeModal, setActiveModal] = useState<'A' | 'B' | null>(null);
  const [activeSection, setActiveSection] = useState<'dual_optimizer' | 'betterA' | 'betterB' | 'both'>('dual_optimizer');

  const comparison: DualPassportComparison = useMemo(() => {
    return compareDualPassports(passportA, passportB);
  }, [passportA, passportB]);

  const nameA = getCountryName(passportA, language);
  const nameB = getCountryName(passportB, language);

  const swapPassports = () => {
    setPassportA(passportB);
    setPassportB(passportA);
  };

  return (
    <div className="space-y-6">
      {/* Selector Box */}
      <div className="glass-panel border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-7 shadow-lg space-y-5 bg-gradient-to-br from-white/95 via-slate-50/80 to-[#0D9488]/5 dark:from-[#111625]/90 dark:via-[#0C0F19]/95 dark:to-[#161D30]/80 relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-xl bg-gradient-to-tr from-[#0D9488] to-[#14B8A6] text-white shadow-xs">
              <Scale className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
              {l(
                'Pasaport Karşılaştırma & Çifte Vatandaşlık Analizi',
                'Passport Comparison & Dual Synergy Analysis',
                'Passvergleich & Doppelstaatsbürgerschafts-Analyse'
              )}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-11 gap-3 items-center">
          {/* Passport A */}
          <div className="sm:col-span-5 glass-panel p-4 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
              {l(
                'Pasaport 1 (Örn. Birinci Vatandaşlık)',
                'Passport 1 (Primary Citizenship)',
                'Reisepass 1 (Erste Staatsbürgerschaft)'
              )}
            </span>
            <button
              type="button"
              onClick={() => setActiveModal('A')}
              className="w-full flex items-center justify-between gap-3 text-left p-3 rounded-xl bg-white/90 dark:bg-[#111625]/90 border border-slate-200/80 dark:border-white/10 hover:border-[#0D9488]/50 transition-all shadow-2xs cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl leading-none group-hover:scale-105 transition-transform">{getFlag(passportA)}</span>
                <span className="font-bold text-base text-slate-900 dark:text-white">{nameA}</span>
              </div>
              <span className="text-xs text-[#0F766E] dark:text-[#14B8A6] font-bold px-2.5 py-1 rounded-full bg-[#0D9488]/10 border border-[#0D9488]/20">
                {l('Değiştir', 'Change', 'Ändern')}
              </span>
            </button>
          </div>

          {/* Swap Button */}
          <div className="sm:col-span-1 flex justify-center">
            <button
              type="button"
              onClick={swapPassports}
              className="p-3 rounded-full glass-panel border border-slate-200/80 dark:border-white/10 hover:border-[#0D9488]/40 text-slate-600 dark:text-slate-300 hover:text-[#0D9488] shadow-sm transition-all cursor-pointer hover:rotate-180 duration-300"
              title={l('Pasaportların yerini değiştir', 'Swap passports', 'Pässe tauschen')}
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Passport B */}
          <div className="sm:col-span-5 glass-panel p-4 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
              {l(
                'Pasaport 2 (Örn. İkinci Vatandaşlık)',
                'Passport 2 (Secondary Citizenship)',
                'Reisepass 2 (Zweite Staatsbürgerschaft)'
              )}
            </span>
            <button
              type="button"
              onClick={() => setActiveModal('B')}
              className="w-full flex items-center justify-between gap-3 text-left p-3 rounded-xl bg-white/90 dark:bg-[#111625]/90 border border-slate-200/80 dark:border-white/10 hover:border-[#0D9488]/50 transition-all shadow-2xs cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl leading-none group-hover:scale-105 transition-transform">{getFlag(passportB)}</span>
                <span className="font-bold text-base text-slate-900 dark:text-white">{nameB}</span>
              </div>
              <span className="text-xs text-[#0F766E] dark:text-[#14B8A6] font-bold px-2.5 py-1 rounded-full bg-[#0D9488]/10 border border-[#0D9488]/20">
                {l('Değiştir', 'Change', 'Ändern')}
              </span>
            </button>
          </div>
        </div>

        {/* Dual Citizen Super Power Banner */}
        <div className="p-4 sm:p-5 rounded-3xl glass-panel border border-[#0D9488]/20 bg-gradient-to-r from-[#0D9488]/10 via-[#14B8A6]/5 to-transparent flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#0D9488] to-[#14B8A6] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                {l('Çifte Pasaport Sinerji Skoru', 'Dual Passport Synergy Score', 'Doppelpass-Synergiewert')}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                {l(
                  `Her iki pasaportu bir arada kullanarak dünyada toplam ${comparison.combinedFreedomScore} ülkeye vizesiz veya kolayca girebilirsiniz!`,
                  `Combining both passports grants visa-free or streamlined access to a total of ${comparison.combinedFreedomScore} countries worldwide!`,
                  `Die Kombination beider Pässe ermöglicht visumfreien oder unkomplizierten Zugang zu insgesamt ${comparison.combinedFreedomScore} Reisezielen weltweit!`,
                  `¡Al combinar ambos pasaportes tiene acceso sin visado o simplificado a un total de ${comparison.combinedFreedomScore} destinos en todo el mundo!`,
                  `Используя оба паспорта, вы получаете безвизовый или упрощенный доступ в ${comparison.combinedFreedomScore} стран мира!`
                )}
              </p>
            </div>
          </div>
          <div className="text-center glass-panel px-5 py-2.5 rounded-2xl border border-[#0D9488]/30 shadow-xs">
            <span className="text-3xl font-black font-mono bg-gradient-to-r from-[#0D9488] to-[#14B8A6] bg-clip-text text-transparent">
              {comparison.combinedFreedomScore}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block mt-0.5">
              {l('Kombine Erişim', 'Combined Access', 'Kombinierter Zugang')}
            </span>
          </div>
        </div>
      </div>

      {/* Comparison Summary Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="glass-panel border border-slate-200/80 dark:border-white/10 p-5 rounded-2xl sm:rounded-3xl text-center shadow-xs">
          <span className="text-3xl font-black font-mono block bg-gradient-to-r from-[#0D9488] to-[#14B8A6] bg-clip-text text-transparent">
            {comparison.scoreA}
          </span>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mt-1">
            {nameA} {l('Erişimi', 'Access', 'Zugang')}
          </span>
          <span className="text-[11px] text-slate-400">
            {l('Vizesiz / E-vize / Kapıda', 'Visa-Free / eVisa / VoA', 'Visumfrei / eVisa / VoA')}
          </span>
        </div>

        <div className="glass-panel border border-slate-200/80 dark:border-white/10 p-5 rounded-2xl sm:rounded-3xl text-center shadow-xs">
          <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono block">
            {comparison.scoreB}
          </span>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mt-1">
            {nameB} {l('Erişimi', 'Access', 'Zugang')}
          </span>
          <span className="text-[11px] text-slate-400">
            {l('Vizesiz / E-vize / Kapıda', 'Visa-Free / eVisa / VoA', 'Visumfrei / eVisa / VoA')}
          </span>
        </div>

        <div className="glass-panel border border-slate-200/80 dark:border-white/10 p-5 rounded-2xl sm:rounded-3xl text-center shadow-xs">
          <span className="text-3xl font-black text-sky-600 dark:text-sky-400 font-mono block">
            {comparison.equalEasiness.length}
          </span>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block mt-1">
            {l('Ortak Kolay Ülke', 'Common Easy Entry', 'Gemeinsam einfache Ziele')}
          </span>
          <span className="text-[11px] text-slate-400">
            {l('Her iki pasaportla da rahat', 'Accessible with either passport', 'Mit beiden Pässen unkompliziert')}
          </span>
        </div>
      </div>

      {/* Segment Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <div className="inline-flex p-1 rounded-full glass-panel border border-slate-200/80 dark:border-white/10 shadow-xs gap-1 whitespace-nowrap">
          <button
            type="button"
            onClick={() => setActiveSection('dual_optimizer')}
            className={`px-4.5 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'dual_optimizer'
                ? 'tab-chip-active'
                : 'tab-chip-inactive'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {l('Hangi Ülkede Hangi Pasaport?', 'Which Passport Where?', 'Welcher Pass für welches Land?')}
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('betterA')}
            className={`px-4.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'betterA'
                ? 'tab-chip-active'
                : 'tab-chip-inactive'
            }`}
          >
            {l(
              `Yalnızca ${nameA} Üstün (${comparison.betterA.length})`,
              `Only ${nameA} Advantageous (${comparison.betterA.length})`,
              `Nur ${nameA} vorteilhaft (${comparison.betterA.length})`,
              `Solo ${nameA} Ventajoso (${comparison.betterA.length})`,
              `Только ${nameA} выгоднее (${comparison.betterA.length})`
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('betterB')}
            className={`px-4.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'betterB'
                ? 'tab-chip-active'
                : 'tab-chip-inactive'
            }`}
          >
            {l(
              `Yalnızca ${nameB} Üstün (${comparison.betterB.length})`,
              `Only ${nameB} Advantageous (${comparison.betterB.length})`,
              `Nur ${nameB} vorteilhaft (${comparison.betterB.length})`,
              `Solo ${nameB} Ventajoso (${comparison.betterB.length})`,
              `Только ${nameB} выгоднее (${comparison.betterB.length})`
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('both')}
            className={`px-4.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'both'
                ? 'tab-chip-active'
                : 'tab-chip-inactive'
            }`}
          >
            {l(
              `Ortak Kolay Giriş (${comparison.equalEasiness.length})`,
              `Both Accessible (${comparison.equalEasiness.length})`,
              `Beide unkompliziert (${comparison.equalEasiness.length})`,
              `Acceso Fácil Común (${comparison.equalEasiness.length})`,
              `Общий легкий доступ (${comparison.equalEasiness.length})`
            )}
          </button>
        </div>
      </div>

      {/* Content Rendering */}
      {activeSection === 'dual_optimizer' && (
        <div className="space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            💡 <b>{l('Çifte Pasaport Seyahat Rehberi:', 'Dual Passport Strategy:', 'Strategie für Doppelstaater:')}</b>{' '}
            {l(
              'Seyahat ederken tek bir pasaporta bağlı kalmak yerine, hedef ülkeye en avantajlı şartları (vizesiz kalış, kimlikle giriş veya daha uzun gün süresi) tanıyan pasaportunuzu kullanabilirsiniz.',
              'Instead of relying on a single document, choose the passport that offers the most advantageous conditions (visa exemption, national ID entry, or longer permitted stay) for your destination.',
              'Wählen Sie für Ihr Reiseziel jeweils den Pass, der die besten Einreisebedingungen bietet (Visumbefreiung, Personalausweis oder längere Aufenthaltsdauer).'
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Where to use A */}
            <div className="glass-card border border-slate-200/80 dark:border-white/[0.08] rounded-3xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
                <span className="text-3xl">{getFlag(passportA)}</span>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                    {l(
                      `${nameA} Pasaportunu Kullanmanız Gerekenler (${comparison.betterA.length})`,
                      `Destinations where ${nameA} is Better (${comparison.betterA.length})`,
                      `Ziele, an denen ${nameA} besser ist (${comparison.betterA.length})`,
                      `Destinos donde conviene usar el pasaporte de ${nameA} (${comparison.betterA.length})`,
                      `Страны, где выгоднее паспорт ${nameA} (${comparison.betterA.length})`
                    )}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {l(
                      `Bu ülkelerde ${nameA} pasaportu ${nameB} pasaportuna kıyasla daha kolay giriş sağlar.`,
                      `In these countries, ${nameA} passport provides easier access than ${nameB}.`,
                      `In diesen Ländern bietet der Pass von ${nameA} einfacheren Zugang als ${nameB}.`,
                      `En estos destinos el pasaporte de ${nameA} ofrece un ingreso más fácil que el de ${nameB}.`,
                      `В этих странах паспорт ${nameA} обеспечивает более удобный въезд, чем ${nameB}.`
                    )}
                  </p>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-white/[0.06] pr-1">
                {comparison.betterA.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    {l(
                      `${nameA} pasaportunun ${nameB} pasaportundan daha avantajlı olduğu ülke yok.`,
                      `No countries where ${nameA} has higher advantage than ${nameB}.`,
                      `Keine Länder, in denen ${nameA} vorteilhafter als ${nameB} ist.`,
                      `No hay países donde el pasaporte de ${nameA} sea más ventajoso que el de ${nameB}.`,
                      `Нет стран, где паспорт ${nameA} дает больше преимуществ, чем ${nameB}.`
                    )}
                  </div>
                ) : (
                  comparison.betterA.map(it => (
                    <div key={it.c} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{getFlag(it.c)}</span>
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {getCountryName(it.c, language)}
                        </span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${it.id ? CAT_INFO.id.badgeBg : CAT_INFO[it.cat]?.badgeBg}`}>
                        {getCategoryBadgeLabel(it, language)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Where to use B */}
            <div className="glass-card border border-slate-200/80 dark:border-white/[0.08] rounded-3xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
                <span className="text-3xl">{getFlag(passportB)}</span>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                    {l(
                      `${nameB} Pasaportunu Kullanmanız Gerekenler (${comparison.betterB.length})`,
                      `Destinations where ${nameB} is Better (${comparison.betterB.length})`,
                      `Ziele, an denen ${nameB} besser ist (${comparison.betterB.length})`,
                      `Destinos donde conviene usar el pasaporte de ${nameB} (${comparison.betterB.length})`,
                      `Страны, где выгоднее паспорт ${nameB} (${comparison.betterB.length})`
                    )}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {l(
                      `Bu ülkelerde ${nameB} pasaportu ${nameA} pasaportuna kıyasla daha kolay giriş sağlar.`,
                      `In these countries, ${nameB} passport provides easier access than ${nameA}.`,
                      `In diesen Ländern bietet der Pass von ${nameB} einfacheren Zugang als ${nameA}.`,
                      `En estos destinos el pasaporte de ${nameB} ofrece un ingreso más fácil que el de ${nameA}.`,
                      `В этих странах паспорт ${nameB} обеспечивает более удобный въезд, чем ${nameA}.`
                    )}
                  </p>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-white/[0.06] pr-1">
                {comparison.betterB.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    {l(
                      `${nameB} pasaportunun ${nameA} pasaportundan daha avantajlı olduğu ülke yok.`,
                      `No countries where ${nameB} has higher advantage than ${nameA}.`,
                      `Keine Länder, in denen ${nameB} vorteilhafter als ${nameA} ist.`,
                      `No hay países donde el pasaporte de ${nameB} sea más ventajoso que el de ${nameA}.`,
                      `Нет стран, где паспорт ${nameB} дает больше преимуществ, чем ${nameA}.`
                    )}
                  </div>
                ) : (
                  comparison.betterB.map(it => (
                    <div key={it.c} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{getFlag(it.c)}</span>
                        <span className="font-medium text-slate-800 dark:text-slate-200">
                          {getCountryName(it.c, language)}
                        </span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${it.id ? CAT_INFO.id.badgeBg : CAT_INFO[it.cat]?.badgeBg}`}>
                        {getCategoryBadgeLabel(it, language)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'betterA' && (
        <div className="glass-card border border-slate-200/80 dark:border-white/[0.08] rounded-3xl p-6 sm:p-7 space-y-4 shadow-xs">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
            {l(
              `Yalnızca ${nameA} Pasaportunun Üstün Olduğu Ülkeler (${comparison.betterA.length})`,
              `Countries where only ${nameA} has advantage (${comparison.betterA.length})`,
              `Länder, in denen nur ${nameA} vorteilhaft ist (${comparison.betterA.length})`,
              `Países donde solo el pasaporte de ${nameA} tiene ventaja (${comparison.betterA.length})`,
              `Страны, где только паспорт ${nameA} имеет преимущество (${comparison.betterA.length})`
            )}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {comparison.betterA.map(it => (
              <div key={it.c} className="p-3.5 rounded-2xl border border-slate-200/60 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between text-xs hover:border-rose-500/30 transition-all">
                <div className="flex items-center gap-2.5 truncate">
                  <span className="text-base">{getFlag(it.c)}</span>
                  <span className="font-bold truncate text-slate-900 dark:text-slate-100">{getCountryName(it.c, language)}</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] flex-shrink-0 border ${it.id ? CAT_INFO.id.badgeBg : CAT_INFO[it.cat]?.badgeBg}`}>
                  {getCategoryBadgeLabel(it, language)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'betterB' && (
        <div className="glass-card border border-slate-200/80 dark:border-white/[0.08] rounded-3xl p-6 sm:p-7 space-y-4 shadow-xs">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
            {l(
              `Yalnızca ${nameB} Pasaportunun Üstün Olduğu Ülkeler (${comparison.betterB.length})`,
              `Countries where only ${nameB} has advantage (${comparison.betterB.length})`,
              `Länder, in denen nur ${nameB} vorteilhaft ist (${comparison.betterB.length})`,
              `Países donde solo el pasaporte de ${nameB} tiene ventaja (${comparison.betterB.length})`,
              `Страны, где только паспорт ${nameB} имеет преимущество (${comparison.betterB.length})`
            )}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {comparison.betterB.map(it => (
              <div key={it.c} className="p-3.5 rounded-2xl border border-slate-200/60 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between text-xs hover:border-rose-500/30 transition-all">
                <div className="flex items-center gap-2.5 truncate">
                  <span className="text-base">{getFlag(it.c)}</span>
                  <span className="font-bold truncate text-slate-900 dark:text-slate-100">{getCountryName(it.c, language)}</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] flex-shrink-0 border ${it.id ? CAT_INFO.id.badgeBg : CAT_INFO[it.cat]?.badgeBg}`}>
                  {getCategoryBadgeLabel(it, language)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'both' && (
        <div className="glass-card border border-slate-200/80 dark:border-white/[0.08] rounded-3xl p-6 sm:p-7 space-y-4 shadow-xs">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
            {l(
              `Her İki Pasaportla da Benzer Kolaylıkta Giriş Yapılabilen Ülkeler (${comparison.equalEasiness.length})`,
              `Destinations easily accessible with both passports (${comparison.equalEasiness.length})`,
              `Ziele, die mit beiden Pässen gleichermaßen einfach erreichbar sind (${comparison.equalEasiness.length})`,
              `Destinos accesibles con facilidad con ambos pasaportes (${comparison.equalEasiness.length})`,
              `Направления с легким въездом по обоим паспортам (${comparison.equalEasiness.length})`
            )}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {comparison.equalEasiness.map(it => (
              <div key={it.c} className="p-3.5 rounded-2xl border border-slate-200/60 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.02] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5 truncate">
                  <span className="text-base">{getFlag(it.c)}</span>
                  <span className="font-bold truncate text-slate-900 dark:text-slate-100">{getCountryName(it.c, language)}</span>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.04]">
                  {l('Ortak Erişim', 'Mutual Access', 'Gemeinsamer Zugang')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Passport Selection Modals */}
      <PassportSelectModal
        isOpen={activeModal === 'A'}
        onClose={() => setActiveModal(null)}
        selectedPassport={passportA}
        onSelect={setPassportA}
        title={l("Pasaport 1'i Seçin", 'Select Passport 1', 'Reisepass 1 auswählen')}
      />
      <PassportSelectModal
        isOpen={activeModal === 'B'}
        onClose={() => setActiveModal(null)}
        selectedPassport={passportB}
        onSelect={setPassportB}
        title={l("Pasaport 2'yi Seçin", 'Select Passport 2', 'Reisepass 2 auswählen')}
      />
    </div>
  );
};
