/**
 * Multilingual Rich Snippet Summary Box (TL;DR) for Vizamigo
 * Strictly engineered to capture Google Mobile Featured Snippets (Position 0).
 * Provides concise, authoritative answers to mobile voice search queries
 * with structured microdata for Visa Status, Max Stay, and Passport/ID requirements.
 */

import React from 'react';
import {
  Sparkles,
  Calendar,
  FileCheck2,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { SupportedLanguage } from '../i18n/types';
import { getCountryName, CAT_INFO, getCategoryBadgeLabel } from '../data/passportData';
import { getPassportItems } from '../utils/calculator';
import {
  getStayDurationText,
  generateDirectAnswerSnippet
} from '../utils/schemaGenerator';

interface CountryRichSnippetSummaryProps {
  countryCode: string;
  currentPassport?: string;
  language: SupportedLanguage;
  variant?: 'modal' | 'card';
}

export const CountryRichSnippetSummary: React.FC<CountryRichSnippetSummaryProps> = ({
  countryCode,
  currentPassport = 'TR',
  language,
  variant = 'modal'
}) => {
  const code = countryCode.toUpperCase();
  const countryName = getCountryName(code, language);
  const passportName = getCountryName(currentPassport, language);

  const passportItems = getPassportItems(currentPassport);
  const item = passportItems.find((i) => i.c === code) || {
    c: code,
    v: 'v',
    cat: 'visa' as const,
    id: false
  };

  const stayDuration = getStayDurationText(item.v, item.cat, language);
  const directAnswer = generateDirectAnswerSnippet(
    countryName,
    passportName,
    item.cat,
    stayDuration,
    item.id,
    language
  );

  const badgeClass = item.id ? CAT_INFO.id.badgeBg : CAT_INFO[item.cat]?.badgeBg;
  const badgeLabel = getCategoryBadgeLabel(item, language);

  // Localized section titles
  const headingText =
    language === 'tr'
      ? `${countryName} Vize ve Giriş Şartları Özeti (TL;DR)`
      : language === 'de'
      ? `${countryName} Visum- und Einreisebestimmungen auf einen Blick (TL;DR)`
      : language === 'es'
      ? `Resumen de Requisitos de Entrada y Visado para ${countryName} (TL;DR)`
      : language === 'ru'
      ? `Краткая сводка визовых правил в ${countryName} (TL;DR)`
      : `${countryName} Visa & Entry Requirements Summary (TL;DR)`;

  const takeawayLabels = {
    status:
      language === 'tr'
        ? 'Vize Rejimi'
        : language === 'de'
        ? 'Visastatus'
        : language === 'es'
        ? 'Régimen de Visado'
        : language === 'ru'
        ? 'Визовый режим'
        : 'Visa Status',
    stay:
      language === 'tr'
        ? 'Maksimum Kalış'
        : language === 'de'
        ? 'Aufenthaltsdauer'
        : language === 'es'
        ? 'Estancia Máxima'
        : language === 'ru'
        ? 'Срок пребывания'
        : 'Maximum Stay',
    passport:
      language === 'tr'
        ? 'Pasaport / Kimlik'
        : language === 'de'
        ? 'Pass / Ausweis'
        : language === 'es'
        ? 'Pasaporte / DNI'
        : language === 'ru'
        ? 'Паспорт / ID'
        : 'Passport / ID',
    fee:
      language === 'tr'
        ? 'Giriş Belgesi & Harç'
        : language === 'de'
        ? 'Dokumente & Gebühr'
        : language === 'es'
        ? 'Documentos y Tasa'
        : language === 'ru'
        ? 'Документы и сбор'
        : 'Documents & Fee'
  };

  const passportDetail = item.id
    ? language === 'tr'
      ? 'Çipli Kimlik Kartı Geçerli'
      : language === 'de'
      ? 'Personalausweis gültig'
      : language === 'es'
      ? 'DNI / Cédula Válida'
      : language === 'ru'
      ? 'ID-карта действительна'
      : 'National ID Accepted'
    : language === 'tr'
    ? 'En Az 6 Ay Geçerlilik'
    : language === 'de'
    ? 'Mind. 6 Monate Gültigkeit'
    : language === 'es'
    ? 'Mínimo 6 Meses de Validez'
    : language === 'ru'
    ? 'Минимум 6 месяцев'
    : 'Min. 6 Months Validity';

  const feeDetail =
    item.cat === 'free' || item.cat === 'id'
      ? language === 'tr'
        ? 'Ücretsiz / Harçsız Giriş'
        : language === 'de'
        ? 'Kostenlose Einreise'
        : language === 'es'
        ? 'Entrada Gratuita'
        : language === 'ru'
        ? 'Бесплатный въезд'
        : 'Free / No Entry Fee'
      : item.cat === 'voa'
      ? language === 'tr'
        ? 'Sınır Kapısında Harç'
        : language === 'de'
        ? 'Gebühr bei Ankunft'
        : language === 'es'
        ? 'Tasa en Frontera'
        : language === 'ru'
        ? 'Сбор на границе'
        : 'Fee at Border Checkpoint'
      : item.cat === 'evisa'
      ? language === 'tr'
        ? 'Online Harç Ödemesi'
        : language === 'de'
        ? 'Online-Zahlung'
        : language === 'es'
        ? 'Pago en Línea'
        : language === 'ru'
        ? 'Онлайн-оплата'
        : 'Online Government Fee'
      : language === 'tr'
      ? 'Konsolosluk Vize Harcı'
      : language === 'de'
      ? 'Konsulargebühr'
      : language === 'es'
      ? 'Tasa Consular'
      : language === 'ru'
      ? 'Консульский сбор'
      : 'Consular Application Fee';

  return (
    <section
      className={`featured-snippet-summary-box rounded-3xl p-4 sm:p-5 border transition-all ${
        variant === 'modal'
          ? 'bg-gradient-to-r from-amber-500/[0.07] via-rose-500/[0.04] to-transparent border-amber-500/25 dark:border-amber-400/20 shadow-xs'
          : 'bg-white/80 dark:bg-white/[0.03] border-slate-200/80 dark:border-white/10 shadow-xs'
      }`}
      aria-label={`${countryName} TL;DR Quick Summary`}
    >
      {/* 1. Natural Question Heading (H2) */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
        <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
          <span className="p-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
            ⚡
          </span>
          <span>{headingText}</span>
        </h2>
        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
          Google Snippet Ready
        </span>
      </div>

      {/* 2. Direct Answer Paragraph (Targeting Google Featured Snippets) */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-[#0E1322]/80 border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed font-normal shadow-2xs">
        <p className="featured-snippet-text">{directAnswer}</p>
      </div>

      {/* 3. Micro-Data 4-Column Key Takeaway Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3">
        {/* Box 1: Visa Status */}
        <div className="p-2.5 sm:p-3 rounded-2xl bg-white/70 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/10 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{takeawayLabels.status}</span>
          </div>
          <div className="mt-1.5">
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border shadow-2xs ${badgeClass}`}>
              {badgeLabel}
            </span>
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate">
            {item.cat === 'free' || item.cat === 'id' ? '✓ Randevu gerekmez' : 'Vize işlemi gerekir'}
          </div>
        </div>

        {/* Box 2: Max Stay */}
        <div className="p-2.5 sm:p-3 rounded-2xl bg-white/70 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/10 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-sky-500" />
            <span>{takeawayLabels.stay}</span>
          </div>
          <div className="mt-1.5 font-black text-xs sm:text-sm text-slate-900 dark:text-white truncate">
            {stayDuration}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate">
            Turistik giriş limiti
          </div>
        </div>

        {/* Box 3: Passport / ID Requirement */}
        <div className="p-2.5 sm:p-3 rounded-2xl bg-white/70 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/10 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <FileCheck2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>{takeawayLabels.passport}</span>
          </div>
          <div className="mt-1.5 font-bold text-xs text-slate-900 dark:text-white truncate">
            {passportDetail}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate">
            {item.id ? 'Kimlikle geçiş serbest' : 'En az 2 boş sayfa'}
          </div>
        </div>

        {/* Box 4: Entry Documents & Fee */}
        <div className="p-2.5 sm:p-3 rounded-2xl bg-white/70 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/10 flex flex-col justify-between">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <DollarSign className="w-3.5 h-3.5 text-teal-500" />
            <span>{takeawayLabels.fee}</span>
          </div>
          <div className="mt-1.5 font-bold text-xs text-slate-900 dark:text-white truncate">
            {feeDetail}
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 truncate">
            Dönüş bileti ibrazı
          </div>
        </div>
      </div>
    </section>
  );
};
