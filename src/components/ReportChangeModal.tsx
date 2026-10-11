import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Flag,
  CheckCircle2,
  Copy,
  Send,
  AlertCircle,
  ExternalLink,
  History,
  Trash2,
  Globe,
  Sparkles
} from 'lucide-react';
import { useI18n } from '../i18n';
import { getFlag, getCountryName, REGIONS } from '../data/passportData';

export interface UserReportItem {
  id: string;
  createdAt: string;
  countryCode: string;
  countryName: string;
  passportCode?: string;
  category: string;
  duration?: string;
  fee?: string;
  sourceUrl?: string;
  notes: string;
  reporterContact?: string;
}

const STORAGE_KEY = 'vr_user_reports';

export function loadUserReports(): UserReportItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveUserReport(report: UserReportItem): void {
  try {
    const current = loadUserReports();
    const updated = [report, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save user report', err);
  }
}

export function deleteUserReport(id: string): UserReportItem[] {
  try {
    const current = loadUserReports();
    const updated = current.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

interface ReportChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCountryCode?: string;
  defaultCountryName?: string;
  currentPassport?: string;
  categoryHint?: string;
}

export const ReportChangeModal: React.FC<ReportChangeModalProps> = ({
  isOpen,
  onClose,
  defaultCountryCode = 'ME',
  defaultCountryName = '',
  currentPassport = 'TR',
  categoryHint = 'vf'
}) => {
  const { t, language } = useI18n();

  const [selectedCountry, setSelectedCountry] = useState<string>(defaultCountryCode);
  const [category, setCategory] = useState<string>(categoryHint);
  const [duration, setDuration] = useState<string>('');
  const [fee, setFee] = useState<string>('');
  const [sourceUrl, setSourceUrl] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'form' | 'history'>('form');
  const [savedReports, setSavedReports] = useState<UserReportItem[]>([]);

  const allCountryCodes = useMemo(() => {
    const codes = Array.from(new Set(Object.values(REGIONS).flat()));
    return codes.sort((a, b) => getCountryName(a, language).localeCompare(getCountryName(b, language)));
  }, [language]);

  useEffect(() => {
    if (isOpen) {
      setSelectedCountry(defaultCountryCode);
      setCategory(categoryHint);
      setIsSubmitted(false);
      setCopied(false);
      setSavedReports(loadUserReports());
    }
  }, [isOpen, defaultCountryCode, categoryHint]);

  if (!isOpen) return null;

  const targetCountryName =
    defaultCountryName ||
    getCountryName(selectedCountry, language) ||
    selectedCountry;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim() && !sourceUrl.trim()) return;

    const newReport: UserReportItem = {
      id: `rep_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      countryCode: selectedCountry,
      countryName: targetCountryName,
      passportCode: currentPassport,
      category,
      duration: duration.trim() || undefined,
      fee: fee.trim() || undefined,
      sourceUrl: sourceUrl.trim() || undefined,
      notes: notes.trim(),
      reporterContact: contact.trim() || undefined
    };

    saveUserReport(newReport);
    setSavedReports(loadUserReports());
    setIsSubmitted(true);
  };

  const generateReportSummary = (): string => {
    return [
      `[Vizamigo Kural Değişikliği Bildirimi]`,
      `Tarih: ${new Date().toLocaleDateString()}`,
      `Hedef Ülke: ${targetCountryName} (${selectedCountry})`,
      `Pasaport Hamili: ${currentPassport}`,
      `Kategori: ${category}`,
      duration ? `Kalış Süresi: ${duration}` : '',
      fee ? `Harç / Ücret: ${fee}` : '',
      sourceUrl ? `Resmi Kaynak Linki: ${sourceUrl}` : '',
      `Açıklama: ${notes}`,
      contact ? `Bildiren İletişim: ${contact}` : ''
    ]
      .filter(Boolean)
      .join('\n');
  };

  const handleCopy = () => {
    const text = generateReportSummary();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleEmail = () => {
    const text = generateReportSummary();
    const subject = encodeURIComponent(`[Vizamigo Kural Bildirimi] ${targetCountryName} (${selectedCountry})`);
    const body = encodeURIComponent(text);
    window.open(`mailto:destek@vizamigo.com?subject=${subject}&body=${body}`, '_blank');
  };

  const handleDeleteItem = (id: string) => {
    const updated = deleteUserReport(id);
    setSavedReports(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between bg-slate-50/70 dark:bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <Flag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>{t.reportChangeTitle}</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.reportChangeSubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label={t.reportClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch (Form vs History) */}
        <div className="px-6 pt-3 pb-1 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('form')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'form'
                ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Flag className="w-3.5 h-3.5" />
            <span>{t.reportChange}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>{t.reportMyReports}</span>
            {savedReports.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-teal-600 text-white text-[10px] flex items-center justify-center font-bold">
                {savedReports.length}
              </span>
            )}
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'history' ? (
            <div className="space-y-3">
              {savedReports.length === 0 ? (
                <div className="text-center py-10 text-slate-400 space-y-2">
                  <History className="w-10 h-10 mx-auto opacity-40" />
                  <p className="text-xs">{t.reportNoReports}</p>
                </div>
              ) : (
                savedReports.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getFlag(item.countryCode)}</span>
                        <span className="font-bold text-slate-800 dark:text-slate-100">
                          {item.countryName} ({item.countryCode})
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                          {item.category.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                          title="Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    {item.duration && (
                      <div className="text-slate-600 dark:text-slate-300">
                        <b>{t.stayDuration}:</b> {item.duration}
                      </div>
                    )}
                    {item.fee && (
                      <div className="text-slate-600 dark:text-slate-300">
                        <b>{t.reportFee}:</b> {item.fee}
                      </div>
                    )}
                    {item.sourceUrl && (
                      <div className="truncate">
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-1 font-mono text-[11px]"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {item.sourceUrl}
                        </a>
                      </div>
                    )}
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                      {item.notes}
                    </p>
                  </div>
                ))
              )}
            </div>
          ) : isSubmitted ? (
            /* Success Screen */
            <div className="py-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
                  {t.reportSuccess}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  {targetCountryName} ({selectedCountry}) için bildirdiğiniz bilgiler cihazınızda güvenle saklandı ve doğrulama kuyruğuna eklendi.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-200 dark:hover:bg-slate-750 transition-all cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? t.reportCopied : t.reportCopySummary}</span>
                </button>

                <button
                  type="button"
                  onClick={handleEmail}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-all shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.reportSendEmail}</span>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-teal-600 dark:text-teal-400 hover:underline font-semibold cursor-pointer"
                >
                  + Yeni Bir Bildirim Daha Yap
                </button>
              </div>
            </div>
          ) : (
            /* Main Form */
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Target Country Display & Change */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  {t.reportCountry}
                </label>
                <div className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-2xl leading-none">{getFlag(selectedCountry)}</span>
                  <div className="flex-1 font-bold text-slate-900 dark:text-slate-100">
                    {targetCountryName} ({selectedCountry})
                  </div>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-700 dark:text-slate-300 focus:outline-hidden"
                  >
                    {allCountryCodes.map((code: string) => (
                      <option key={code} value={code}>
                        {getCountryName(code, language)} ({code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category selector */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  {t.reportCategory}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'vf', label: t.reportCategoryVf },
                    { id: 'evisa', label: t.reportCategoryEvisa },
                    { id: 'voa', label: t.reportCategoryVoa },
                    { id: 'eta', label: t.reportCategoryEta },
                    { id: 'visa', label: t.reportCategoryVisa },
                    { id: 'nomad', label: t.reportCategoryNomad },
                    { id: 'transit', label: t.reportCategoryTransit },
                    { id: 'other', label: t.reportCategoryOther }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`p-2 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                        category === cat.id
                          ? 'border-teal-500 bg-teal-50/80 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 font-bold shadow-2xs'
                          : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration & Fee row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {t.reportDuration}
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Örn: 30 gün / 90 gün / 1 yıl"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {t.reportFee}
                  </label>
                  <input
                    type="text"
                    value={fee}
                    onChange={(e) => setFee(e.target.value)}
                    placeholder="Örn: Ücretsiz / 25 USD / 50 EUR"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Source URL */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1 flex items-center justify-between">
                  <span>{t.reportSourceUrl}</span>
                  <span className="text-[10px] text-teal-600 font-normal">Teyit İçin Önerilir</span>
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={sourceUrl}
                    onChange={(e) => setSourceUrl(e.target.value)}
                    placeholder={t.reportSourcePlaceholder}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500 font-mono text-[11px]"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {t.reportNotes} <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.reportNotesPlaceholder}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500 leading-relaxed"
                />
              </div>

              {/* Optional Contact info */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {t.reportContact}
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="E-posta veya @kullanıcı adı"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                  <span>Topluluk & AI denetimiyle doğrulanır</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    {t.reportClose}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold transition-all shadow-md hover:shadow-teal-500/20 cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t.reportSubmit}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
