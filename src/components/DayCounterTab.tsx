import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Scale,
  Info
} from 'lucide-react';
import {
  TripRecord,
  RollingRule,
  evaluateRollingWindow,
  dateToDayIndex,
  dayIndexToDate,
  formatLocalizedDate,
  formatLocalizedDateReadable,
  formatLocalizedDateFull,
  getTodayDayIndex,
  calculateDaysUsedInWindow,
  computeTaxResidency
} from '../utils/calculator';
import {
  loadStoredTrips,
  saveStoredTrips,
  loadStoredRules,
  saveStoredRules
} from '../utils/storage';
import { getCountryName, getFlag } from '../data/passportData';
import { useI18n } from '../data/i18n';
import { CustomDatePicker } from './CustomDatePicker';
import { SchengenGauge } from './design/SchengenGauge';

export const DayCounterTab: React.FC = () => {
  const { language, l } = useI18n();
  const [trips, setTrips] = useState<TripRecord[]>(() => loadStoredTrips());
  const [rules, setRules] = useState<RollingRule[]>(() => loadStoredRules());
  const [selectedRuleId, setSelectedRuleId] = useState<string>('schengen');

  // New trip input states
  const [entryDate, setEntryDate] = useState<string>('');
  const [exitDate, setExitDate] = useState<string>('');
  const [tripNote, setTripNote] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  // Future simulation state
  const [simDate, setSimDate] = useState<string>('');

  // Custom rule modal / form state
  const [showNewRule, setShowNewRule] = useState<boolean>(false);
  const [ruleName, setRuleName] = useState<string>('');
  const [ruleAllowed, setRuleAllowed] = useState<number>(30);
  const [ruleWindow, setRuleWindow] = useState<number>(180);
  const [ruleError, setRuleError] = useState<string>('');

  const today = getTodayDayIndex();
  const currentRule = useMemo(() => {
    return rules.find(r => r.id === selectedRuleId) || rules[0];
  }, [rules, selectedRuleId]);

  const taxStatuses = useMemo(() => {
    return computeTaxResidency(trips);
  }, [trips]);

  // Current status evaluation
  const calcResult = useMemo(() => {
    return evaluateRollingWindow(today, trips, currentRule);
  }, [today, trips, currentRule]);

  // Simulation calculation
  const simResult = useMemo(() => {
    if (!simDate) return null;
    const simDay = dateToDayIndex(simDate);
    const usedAtSim = calculateDaysUsedInWindow(simDay, trips, currentRule);
    const rem = Math.max(0, currentRule.allowedDays - usedAtSim);

    // Max consecutive stay from sim day
    let cons = 0;
    while (cons <= currentRule.windowDays) {
      const d = simDay + cons;
      const u = calculateDaysUsedInWindow(d, trips, currentRule, simDay);
      if (u > currentRule.allowedDays) break;
      cons++;
    }

    return {
      simDate,
      daysUsed: usedAtSim,
      remaining: rem,
      maxConsecutive: cons,
      exitDayIndex: cons > 0 ? (simDay + cons - 1) : null
    };
  }, [simDate, trips, currentRule]);

  const handleAddTrip = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!entryDate || !exitDate) {
      setFormError(l('Lütfen giriş ve çıkış tarihlerini seçin.', 'Please select both entry and exit dates.', 'Bitte wählen Sie sowohl das Einreise- als auch das Ausreisedatum aus.'));
      return;
    }

    const startIdx = dateToDayIndex(entryDate);
    const endIdx = dateToDayIndex(exitDate);

    if (endIdx < startIdx) {
      setFormError(l('Çıkış tarihi giriş tarihinden önce olamaz.', 'Exit date cannot precede entry date.', 'Das Ausreisedatum kann nicht vor dem Einreisedatum liegen.'));
      return;
    }

    const newTrip: TripRecord = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      start: startIdx,
      end: endIdx,
      region: currentRule.name,
      note: tripNote.trim() || undefined
    };

    const nextTrips = [...trips, newTrip].sort((a, b) => b.start - a.start);
    setTrips(nextTrips);
    saveStoredTrips(nextTrips);

    setEntryDate('');
    setExitDate('');
    setTripNote('');
  };

  const handleDeleteTrip = (id: string) => {
    const nextTrips = trips.filter(t => t.id !== id);
    setTrips(nextTrips);
    saveStoredTrips(nextTrips);
  };

  const handleSaveCustomRule = (e: React.FormEvent) => {
    e.preventDefault();
    setRuleError('');

    const n = ruleName.trim();
    if (!n) {
      setRuleError(l('Lütfen kural için bir ad belirleyin.', 'Please provide a name for this custom rule.', 'Bitte geben Sie einen Namen für diese Regel an.'));
      return;
    }

    if (ruleAllowed <= 0 || ruleWindow < ruleAllowed) {
      setRuleError(
        l(
          'Kayan pencere dönemi, izin verilen gün sayısına eşit veya ondan büyük olmalıdır.',
          'Rolling window duration must be greater than or equal to allowed stay days.',
          'Die rollierende Periode muss mindestens so lang wie die erlaubten Aufenthaltstage sein.'
        )
      );
      return;
    }

    const newRule: RollingRule = {
      id: `custom-${Date.now()}`,
      name: n,
      allowedDays: ruleAllowed,
      windowDays: ruleWindow,
      description: l(
        `${ruleWindow} günlük dönemde en fazla ${ruleAllowed} gün kalış kuralı.`,
        `Maximum ${ruleAllowed} days stay permitted within any ${ruleWindow}-day rolling window.`,
        `Maximal ${ruleAllowed} Tage Aufenthalt innerhalb eines rollierenden Fensters von ${ruleWindow} Tagen erlaubt.`
      ),
      preset: false
    };

    const nextRules = [...rules, newRule];
    setRules(nextRules);
    saveStoredRules(nextRules);
    setSelectedRuleId(newRule.id);
    setShowNewRule(false);
    setRuleName('');
  };

  const regionTrips = useMemo(() => {
    return trips.filter(t => t.region === currentRule.name);
  }, [trips, currentRule]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Rule Selection and Big Gauge Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
        {/* Rule Selector Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-white/10">
          <div>
            <span className="text-xs font-bold text-slate-400 dark:text-[#7A89A6] uppercase tracking-wider block">
              {l('Aktif Hesaplama Kuralı', 'Active Calculation Rule', 'Aktive Berechnungsregel')}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="w-5 h-5 text-[#0F172A] dark:text-[#8E9DBE]" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-[-0.025em]">
                {language === 'de' ? (currentRule.nameDe || currentRule.nameEn || currentRule.name) : language === 'en' && currentRule.nameEn ? currentRule.nameEn : currentRule.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedRuleId}
              onChange={(e) => {
                if (e.target.value === '__add_new__') {
                  setShowNewRule(true);
                } else {
                  setSelectedRuleId(e.target.value);
                  setShowNewRule(false);
                }
              }}
              className="px-3.5 py-2 rounded-full border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#141C3B]/80 text-sm font-semibold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-white/20"
            >
              {rules.map(r => (
                <option key={r.id} value={r.id} className="dark:bg-[#0E1428]">
                  {language === 'de' ? (r.nameDe || r.nameEn || r.name) : language === 'en' && r.nameEn ? r.nameEn : r.name}
                </option>
              ))}
              <option value="__add_new__" className="dark:bg-[#0E1428]">
                {l('+ Yeni Özel Kural Ekle...', '+ Add Custom Stay Rule...', '+ Eigene Aufenthaltsregel hinzufügen...')}
              </option>
            </select>
          </div>
        </div>

        {/* Custom Rule Creation Form */}
        {showNewRule && (
          <form onSubmit={handleSaveCustomRule} className="bg-slate-50/80 dark:bg-white/[0.04] p-4 rounded-2xl border border-slate-200/80 dark:border-white/10 space-y-3">
            <div className="font-bold text-sm text-slate-900 dark:text-white tracking-[-0.02em]">
              {l('Yeni Kayan Dönem Kuralı Tanımla', 'Define New Rolling Stay Window Rule', 'Neue Regel für rollierendes Aufenthaltsfenster definieren')}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-[#8E9DBE] mb-1">
                  {l('Kural / Bölge Adı', 'Rule / Region Name', 'Regel- / Regionsname')}
                </label>
                <input
                  type="text"
                  placeholder={l('Örn: Tayland, Japonya...', 'e.g. Thailand, Japan...', 'z. B. Thailand, Japan...')}
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#141C3B]/80 border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-[#8E9DBE] mb-1">
                  {l('İzin Verilen Gün', 'Allowed Stay (Days)', 'Erlaubter Aufenthalt (Tage)')}
                </label>
                <input
                  type="number"
                  min={1}
                  value={ruleAllowed}
                  onChange={(e) => setRuleAllowed(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#141C3B]/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-[#8E9DBE] mb-1">
                  {l('Kayan Dönem (Gün)', 'Rolling Window (Days)', 'Rollierendes Fenster (Tage)')}
                </label>
                <input
                  type="number"
                  min={1}
                  value={ruleWindow}
                  onChange={(e) => setRuleWindow(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-[#141C3B]/80 border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-white"
                />
              </div>
            </div>
            {ruleError && <p className="text-xs text-rose-500 font-semibold">{ruleError}</p>}
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowNewRule(false)}
                className="btn-nubair-secondary text-xs"
              >
                {l('Vazgeç', 'Cancel', 'Abbrechen')}
              </button>
              <button
                type="submit"
                className="btn-nubair-primary text-xs"
              >
                {l('Kuralı Kaydet', 'Save Rule', 'Regel speichern')}
              </button>
            </div>
          </form>
        )}

        {/* Schengen Gauge Circular Animated Visualizer (Redesign Screen 4) */}
        <div className="flex justify-center mb-6">
          <div className="w-full max-w-md">
            <SchengenGauge
              used={calcResult.daysUsed}
              total={currentRule.allowedDays}
              remainingLabel={l('Kalan gün', 'Remaining days', 'Verbleibende Tage', 'Días restantes', 'Осталось дней')}
              resetLabel={l('Sıfırlanma', 'Reset date', 'Rücksetzung', 'Fecha de reinicio', 'Сброс')}
              resetValue={calcResult.safeExitDate ? formatLocalizedDate(dateToDayIndex(calcResult.safeExitDate), language) : l('Aktif', 'Active', 'Aktiv', 'Activo', 'Активно')}
            />
          </div>
        </div>

        {/* Big Countdown Metric Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-baseline gap-3">
              <span
                className={`text-6xl sm:text-7xl font-black font-mono tracking-tight ${
                  calcResult.isOverstay
                    ? 'text-rose-500'
                    : calcResult.remainingDays <= 15
                    ? 'text-amber-500'
                    : 'text-teal-600 dark:text-teal-400'
                }`}
              >
                {calcResult.remainingDays}
              </span>
              <span className="text-lg font-bold text-slate-700 dark:text-slate-300">
                {l('gün kalış hakkınız var', 'days stay remaining', 'Tage verbleibender Aufenthalt')}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {l(
                `Bugünden geriye doğru son ${currentRule.windowDays} günlük dönemde toplam `,
                `In the rolling ${currentRule.windowDays}-day period looking back from today, you have used a total of `,
                `Im rollierenden Zeitraum der letzten ${currentRule.windowDays} Tage ab heute haben Sie insgesamt `
              )}
              <b>{calcResult.daysUsed} {l('gün', 'days', 'Tage')}</b>.
            </p>

            {calcResult.maxConsecutiveStayIfEnteringToday > 0 ? (
              <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-200/60 dark:border-teal-900/60 text-xs text-teal-900 dark:text-teal-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>
                  {l(
                    `Bugün giriş yaparsanız en fazla ${calcResult.maxConsecutiveStayIfEnteringToday} gün (en geç ${calcResult.safeExitDate ? formatLocalizedDate(dateToDayIndex(calcResult.safeExitDate), language) : ''} tarihine kadar) kalabilirsiniz.`,
                    `If entering today, you can stay up to ${calcResult.maxConsecutiveStayIfEnteringToday} consecutive days (latest safe departure: ${calcResult.safeExitDate ? formatLocalizedDate(dateToDayIndex(calcResult.safeExitDate), language) : ''}).`,
                    `Bei Einreise heute können Sie bis zu ${calcResult.maxConsecutiveStayIfEnteringToday} aufeinanderfolgende Tage bleiben (späteste sichere Ausreise: ${calcResult.safeExitDate ? formatLocalizedDate(dateToDayIndex(calcResult.safeExitDate), language) : ''}).`
                  )}
                </span>
              </div>
            ) : (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 text-xs text-rose-900 dark:text-rose-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>
                  {l(
                    'Şu an giriş hakkınız bulunmuyor veya sınır dolmuştur.',
                    'No remaining stay allowance available today or limit is currently exhausted.',
                    'Heute ist kein verbleibender Aufenthalt verfügbar oder das Limit ist erschöpft.'
                  )}
                </span>
              </div>
            )}
          </div>

          <div className="md:col-span-5 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/70 dark:border-slate-700/70 space-y-2.5 text-xs">
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 pb-1 border-b border-slate-200 dark:border-slate-700">
              <ShieldCheck className="w-4 h-4 text-teal-600" />{' '}
              {l('Kural Detayı', 'Rule Specifications', 'Regeldetails')}
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{l('Maksimum İzin:', 'Max Allowed:', 'Maximal erlaubt:')}</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{currentRule.allowedDays} {l('gün', 'days', 'Tage')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{l('Kayan Pencere:', 'Rolling Window:', 'Rollierendes Fenster:')}</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{currentRule.windowDays} {l('gün', 'days', 'Tage')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{l('Kullanılan Gün:', 'Days Used:', 'Verbrauchte Tage:')}</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{calcResult.daysUsed} {l('gün', 'days', 'Tage')}</span>
            </div>
            <p className="text-[11px] text-slate-400 italic pt-1">
              {(language === 'de' ? (currentRule.descriptionDe || currentRule.descriptionEn || currentRule.description) : language === 'en' && currentRule.descriptionEn ? currentRule.descriptionEn : currentRule.description)} {l('Giriş ve çıkış günleri kalış süresine dahildir.', 'Both entry and exit days count toward the stay.', 'Sowohl Einreise- als auch Ausreisetag zählen zur Aufenthaltsdauer.')}
            </p>
          </div>
        </div>

        {/* Overstay Alert */}
        {calcResult.isOverstay && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-900 text-rose-900 dark:text-rose-200 text-xs flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            <div>
              <b className="font-bold text-sm block">
                {l(
                  `Kalış Süresi Aşımı Tespiti (${calcResult.overstayDays} Gün)!`,
                  `Overstay Detected (${calcResult.overstayDays} Days)!`,
                  `Aufenthaltsüberschreitung festgestellt (${calcResult.overstayDays} Tage)!`
                )}
              </b>
              {l(
                `Mevcut seyahat kayıtlarınıza göre izin verilen ${currentRule.allowedDays} gün sınırını aşmış görünüyorsunuz. Bu durum sınır kapısında para cezası veya giriş yasağı riski doğurabilir.`,
                `Based on your logged trips, you appear to exceed the allowed limit of ${currentRule.allowedDays} days. This may trigger fines or border re-entry bans.`,
                `Basierend auf Ihren erfassten Reisen scheinen Sie das zulässige Limit von ${currentRule.allowedDays} Tagen zu überschreiten. Dies kann zu Geldstrafen oder Einreiseverboten führen.`
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Trip & Future Simulator in 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form: Add Trip */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Calendar className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              {l(
                `Yeni Seyahat Ekle (${currentRule.name})`,
                `Log New Trip (${currentRule.nameEn || currentRule.name})`,
                `Neue Reise erfassen (${currentRule.nameDe || currentRule.nameEn || currentRule.name})`
              )}
            </h3>
          </div>

          <form onSubmit={handleAddTrip} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <CustomDatePicker
                  value={entryDate}
                  onChange={setEntryDate}
                  label={l('Giriş Tarihi', 'Entry Date', 'Einreisedatum')}
                  id="entry-date-picker"
                />
                {!entryDate && (
                  <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setEntryDate(dayIndexToDate(today))}
                      className="btn-nubair-secondary !py-1 !px-2.5 text-[10px]"
                    >
                      {l('Bugün', 'Today', 'Heute')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEntryDate(dayIndexToDate(today - 30))}
                      className="btn-nubair-secondary !py-1 !px-2.5 text-[10px]"
                    >
                      {l('-30 Gün', '-30 Days', '-30 Tage')}
                    </button>
                  </div>
                )}
              </div>
              <div>
                <CustomDatePicker
                  value={exitDate}
                  onChange={setExitDate}
                  label={l('Çıkış Tarihi', 'Exit Date', 'Ausreisedatum')}
                  id="exit-date-picker"
                />
                {!exitDate && (
                  <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => {
                        const base = entryDate ? dateToDayIndex(entryDate) : today;
                        setExitDate(dayIndexToDate(base + 7));
                      }}
                      className="btn-nubair-secondary !py-1 !px-2.5 text-[10px]"
                    >
                      +7 {l('Gün', 'Days', 'Tage')}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const base = entryDate ? dateToDayIndex(entryDate) : today;
                        setExitDate(dayIndexToDate(base + 14));
                      }}
                      className="btn-nubair-secondary !py-1 !px-2.5 text-[10px]"
                    >
                      +14 {l('Gün', 'Days', 'Tage')}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const base = entryDate ? dateToDayIndex(entryDate) : today;
                        setExitDate(dayIndexToDate(base + 30));
                      }}
                      className="btn-nubair-secondary !py-1 !px-2.5 text-[10px]"
                    >
                      +30 {l('Gün', 'Days', 'Tage')}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-[#8E9DBE] mb-1">
                {l('İsteğe Bağlı Not / Şehir', 'Optional Note / City', 'Optionale Notiz / Stadt')}
              </label>
              <input
                type="text"
                placeholder={l('Örn: Roma tatili, Paris iş gezisi...', 'e.g. Rome holiday, Paris business...', 'z. B. Urlaub Rom, Geschäftsreise Paris...')}
                value={tripNote}
                onChange={(e) => setTripNote(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#141C3B]/80 border border-slate-200 dark:border-white/10 rounded-xl text-slate-800 dark:text-white"
              />
            </div>

            {formError && <p className="text-xs text-rose-500 font-semibold">{formError}</p>}

            <button
              type="submit"
              className="w-full btn-nubair-primary !py-2.5 text-xs flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> {l('Seyahati Kaydet', 'Save Trip Record', 'Reise speichern')}
            </button>
          </form>
        </div>

        {/* Future Travel Simulator */}
        <div className="glass-panel rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-white/10">
            <Sparkles className="w-5 h-5 text-[#0F172A] dark:text-[#8E9DBE]" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white tracking-[-0.02em]">
              {l('Gelecek Seyahat Simülatörü', 'Future Travel Stay Simulator', 'Zukunft-Reisesimulator')}
            </h3>
          </div>

          <p className="text-xs text-slate-500 dark:text-[#8E9DBE]">
            {l(
              `"Şu tarihte ${currentRule.name} bölgesine girersem kaç gün kalabilirim?" sorusunu test edin.`,
              `"If I enter ${currentRule.nameEn || currentRule.name} on this date, how many days can I stay safely?"`,
              `"Wenn ich an diesem Datum nach ${currentRule.nameDe || currentRule.nameEn || currentRule.name} einreise, wie viele Tage kann ich sicher bleiben?"`
            )}
          </p>

          <div className="space-y-3">
            <div>
              <CustomDatePicker
                value={simDate}
                onChange={setSimDate}
                label={l('Giriş Yapmayı Düşündüğünüz Tarih', 'Planned Date of Entry', 'Geplantes Einreisedatum')}
                id="sim-date-picker"
              />
              {!simDate && (
                <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setSimDate(dayIndexToDate(today))}
                    className="btn-nubair-secondary !py-1 !px-2.5 text-[10px]"
                  >
                    {l('Bugün', 'Today', 'Heute')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimDate(dayIndexToDate(today + 30))}
                    className="btn-nubair-secondary !py-1 !px-2.5 text-[10px]"
                  >
                    +1 {l('Ay Sonra', 'Month', 'Monat')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimDate(dayIndexToDate(today + 90))}
                    className="btn-nubair-secondary !py-1 !px-2.5 text-[10px]"
                  >
                    +3 {l('Ay Sonra', 'Months', 'Monate')}
                  </button>
                </div>
              )}
            </div>

            {simResult && (
              <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/60 space-y-2 text-xs text-teal-950 dark:text-teal-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">
                    {l('Simülasyon Sonucu', 'Simulation Result', 'Simulationsergebnis')}
                  </span>
                  <span className="font-semibold text-xs">
                    {formatLocalizedDateReadable(simResult.simDate, language)}
                  </span>
                </div>
                <div className="text-xs leading-relaxed">
                  {l(
                    `O tarihte geriye dönük ${currentRule.windowDays} günde `,
                    `Looking back ${currentRule.windowDays} days from that date, you will have used `,
                    `Rückblickend ${currentRule.windowDays} Tage ab diesem Datum haben Sie verbraucht: `
                  )}
                  <b>{simResult.daysUsed} {l('gün', 'days', 'Tage')}</b>.
                </div>
                <div className="p-2 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-teal-200 dark:border-teal-800 text-center">
                  <span className="text-2xl font-black font-mono text-teal-600 block">
                    {simResult.maxConsecutive} {l('Gün', 'Days', 'Tage')}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {l(
                      `kesintisiz kalabilirsiniz (En geç çıkış: ${simResult.exitDayIndex !== null ? formatLocalizedDateReadable(simResult.exitDayIndex, language) : 'N/A'})`,
                      `continuous stay permitted (Latest exit: ${simResult.exitDayIndex !== null ? formatLocalizedDateReadable(simResult.exitDayIndex, language) : 'N/A'})`,
                      `durchgehender Aufenthalt erlaubt (Späteste Ausreise: ${simResult.exitDayIndex !== null ? formatLocalizedDateReadable(simResult.exitDayIndex, language) : 'N/A'})`
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recorded Trips List */}
      <div className="glass-panel rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-900 dark:text-white tracking-[-0.02em]">
            {l('Kayıtlı Seyahatler', 'Logged Trips', 'Erfasste Reisen')} ({regionTrips.length})
          </h3>
          <span className="text-xs text-slate-400 dark:text-[#7A89A6]">
            {l('Veriler bu cihazda saklanır', 'Saved locally on this device', 'Lokal auf diesem Gerät gespeichert')}
          </span>
        </div>

        {regionTrips.length === 0 ? (
          <div className="py-12 text-center text-slate-400 dark:text-[#7A89A6] text-xs">
            {l(
              `${currentRule.name} bölgesi için henüz kayıtlı seyahat bulunmuyor.`,
              `No trips recorded yet for ${currentRule.nameEn || currentRule.name}.`,
              `Noch keine Reisen für ${currentRule.nameDe || currentRule.nameEn || currentRule.name} erfasst.`
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-white/10">
            {regionTrips.map(trip => {
              const days = trip.end - trip.start + 1;
              return (
                <div key={trip.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm">
                      {formatLocalizedDateReadable(trip.start, language)} – {formatLocalizedDateReadable(trip.end, language)}
                    </div>
                    <div className="text-slate-500 dark:text-[#8E9DBE] text-[11px] mt-0.5">
                      {l('Kalış: ', 'Stay: ', 'Aufenthalt: ')}
                      <b>{days} {l('gün', 'days', 'Tage')}</b> {trip.note && `· ${trip.note}`}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteTrip(trip.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    title={l('Sil', 'Delete', 'Löschen')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 183 Gün Vergi Mukimliği (Tax Residency) İzleme & Uyarısı */}
      <div className="glass-panel rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Scale className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white tracking-[-0.02em]">
                {l('183 Gün Vergi Mukimliği (Tax Residency) Takibi', '183-Day Tax Residency Stay Monitor', '183-Tage Steuerresidenz-Monitor')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#8E9DBE]">
                {l(
                  'Dünya genelinde 1 takvim yılında (1 Ocak - 31 Aralık) bir ülkede 183 günden fazla kalanlar yerel vergi mükellefi sayılır.',
                  'Staying more than 183 days in a single calendar year (Jan 1 - Dec 31) commonly triggers local tax residency.',
                  'Ein Aufenthalt von mehr als 183 Tagen in einem Kalenderjahr (1. Jan. - 31. Dez.) begründet meist die steuerliche Ansässigkeit.'
                )}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
            {new Date().getFullYear()} {l('Takvim Yılı', 'Calendar Year', 'Kalenderjahr')}
          </span>
        </div>

        {taxStatuses.length === 0 ? (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-center text-xs text-slate-500">
            {l(
              'Kayıtlı seyahatlerinizde ülke kodu belirtilen kalış bulunmuyor. Seyahat eklerken ülke seçtiğinizde 183 gün vergi takibi otomatik hesaplanacaktır.',
              'No trips with assigned country codes found yet. When trips specify a destination, the 183-day tax counter will compute automatically.',
              'Noch keine Reisen mit Länderzuordnung erfasst. Sobald Reisen mit Zielort erfasst werden, berechnet sich der 183-Tage-Zähler automatisch.'
            )}
          </div>
        ) : (
          <div className="space-y-2.5">
            {taxStatuses.map(ts => {
              const pct = Math.min(100, Math.round((ts.daysSpent / ts.limit) * 100));
              const isOver = ts.status === 'exceeded';
              const isWarning = ts.status === 'warning' || ts.status === 'danger';
              const countryName = getCountryName(ts.countryCode, language);

              return (
                <div
                  key={ts.countryCode}
                  className={`p-3.5 rounded-2xl border text-xs space-y-2 ${
                    isOver
                      ? 'bg-rose-50/70 border-rose-200 text-rose-950 dark:bg-rose-950/30 dark:border-rose-900 dark:text-rose-200'
                      : isWarning
                      ? 'bg-amber-50/70 border-amber-200 text-amber-950 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-200'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-sm">
                      {getFlag(ts.countryCode)} {countryName} ({ts.countryCode})
                    </span>
                    <span>
                      {ts.daysSpent} / {ts.limit} {l('gün', 'days', 'Tage')} ({pct}%)
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${pct}%` }}
                      className={`h-full rounded-full transition-all ${
                        isOver ? 'bg-rose-600' : isWarning ? 'bg-amber-500' : 'bg-teal-500'
                      }`}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span>
                      {isOver
                        ? l('⚠️ 183 GÜN AŞILDI! Yerel vergi mukimliği riski altındasınız.', '⚠️ 183-DAY LIMIT EXCEEDED! Local tax residency triggered.', '⚠️ 183-TAGE-GRENZE ÜBERSCHRITTEN! Steueransässigkeit ausgelöst.')
                        : l(`Güvenli sınır için kalan süre: ${ts.daysRemaining} gün`, `Days remaining before threshold: ${ts.daysRemaining} days`, `Verbleibende Tage vor Grenzwert: ${ts.daysRemaining} Tage`)}
                    </span>
                    <span className="font-semibold">
                      {isOver
                        ? l('Kritik Risk', 'Critical Risk', 'Kritisches Risiko')
                        : isWarning
                        ? l('Dikkat Edilmeli', 'Caution', 'Vorsicht')
                        : l('Güvenli Bölge', 'Safe Zone', 'Sichere Zone')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-200/50 dark:border-amber-900/30 text-[11px] text-amber-900 dark:text-amber-300 flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <span>
            <b>{l('Yasal Hatırlatma:', 'Legal Notice:', 'Rechtlicher Hinweis:')}</b>{' '}
            {l(
              'Çifte vergilendirmeyi önleme anlaşmaları (DTA) ülkeden ülkeye farklılık gösterebilir. 183 günden fazla konaklamalarda yerel mali müşavire danışmanız tavsiye edilir.',
              'Double Taxation Avoidance Agreements (DTAA) vary by jurisdiction. For stays approaching 183 days, consulting a certified international tax advisor is strongly recommended.',
              'Doppelbesteuerungsabkommen (DBA) variieren je nach Gerichtsbarkeit. Bei Aufenthalten nahe 183 Tagen wird die Konsultation eines Steuerberaters dringend empfohlen.'
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
