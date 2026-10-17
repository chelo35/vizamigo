import React, { useState, useEffect, useRef } from 'react';
import { useModalA11y } from '../../utils/useModalA11y';
import {
  X,
  Clock,
  Sparkles,
  ArrowRightLeft,
  Moon,
  Sun,
  Laptop,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useI18n } from '../../data/i18n';
import { ALL_WORLD_HUBS, WorldHub } from '../../data/worldHubs';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_HUBS_FOR_TIMEZONE = [
  'Istanbul',
  'London',
  'Frankfurt',
  'New York',
  'San Francisco',
  'Bali (Denpasar)',
  'Bangkok',
  'Tokyo',
  'Lisbon',
  'Tbilisi',
  'Dubai',
  'Buenos Aires'
];

export const TimezoneOverlapModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { language, l } = useI18n();
  const [city1Name, setCity1Name] = useState<string>('Istanbul');
  const [city2Name, setCity2Name] = useState<string>('Bali (Denpasar)');
  const [selectedHourCity1, setSelectedHourCity1] = useState<number>(14);
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const hub1 = ALL_WORLD_HUBS.find((h) => h.city === city1Name) || ALL_WORLD_HUBS[0];
  const hub2 = ALL_WORLD_HUBS.find((h) => h.city === city2Name) || ALL_WORLD_HUBS[1];

  // Calculate timezone offset difference in hours
  const getTzOffsetMinutes = (tz: string) => {
    const d = new Date();
    const utcDate = new Date(d.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(d.toLocaleString('en-US', { timeZone: tz }));
    return (tzDate.getTime() - utcDate.getTime()) / 60000;
  };

  const offset1 = getTzOffsetMinutes(hub1.tz);
  const offset2 = getTzOffsetMinutes(hub2.tz);
  const diffHours = (offset2 - offset1) / 60;

  // Format current live times
  const timeFormatter1 = new Intl.DateTimeFormat('en-GB', {
    timeZone: hub1.tz,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  const timeFormatter2 = new Intl.DateTimeFormat('en-GB', {
    timeZone: hub2.tz,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const city1Live = timeFormatter1.format(now);
  const city2Live = timeFormatter2.format(now);

  // Calculate 24-hour overlap matrix
  // City1 hours: 0..23
  // City2 corresponding hour = (hour + diffHours + 24) % 24
  const hoursGrid = Array.from({ length: 24 }, (_, h) => {
    const h2 = Math.floor((h + diffHours + 24) % 24);
    const isWork1 = h >= 9 && h <= 18;
    const isWork2 = h2 >= 9 && h2 <= 18;
    const isGolden = isWork1 && isWork2;
    const isSleep1 = h < 7 || h >= 23;
    const isSleep2 = h2 < 7 || h2 >= 23;

    let status: 'golden' | 'extended' | 'sleep';
    if (isGolden) status = 'golden';
    else if (isSleep1 || isSleep2) status = 'sleep';
    else status = 'extended';

    return {
      hour1: h,
      hour2: h2,
      status
    };
  });

  const goldenHours = hoursGrid.filter((h) => h.status === 'golden');

  // Currently inspected hour calculation
  const inspectedHour2 = Math.floor((selectedHourCity1 + diffHours + 24) % 24);

  const modalRef = useRef<HTMLDivElement>(null);
  useModalA11y({
    isOpen,
    onClose,
    modalRef
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="timezone-modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <h3 id="timezone-modal-title" className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                  {l('Zaman Dilimi & Toplantı Çakışma Planlayıcısı', 'Timezone Meeting Overlap Planner', 'Zeitzonen- & Meeting-Planer', 'Planificador de Superposición Horaria', 'Планировщик встреч по часовым поясам')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {l('Uzaktan çalışanlar ve dijital göçebeler için altın çalışma saatleri', 'Golden working hours for remote teams and nomads', 'Goldene Arbeitsstunden für Remote-Teams', 'Horas ideales de trabajo para nómadas', 'Идеальные часы для созвонов')}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* 1. Dual City Selector Bento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* City 1 (Home / Headquarters) */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {l('Ana Üs / Müşteri Şehri', 'Base / Client City', 'Hauptsitz / Kunde', 'Ciudad Base / Cliente', 'Базовый город')}
                </span>
                <span className="text-xl">{hub1.flag}</span>
              </div>

              <select
                value={city1Name}
                onChange={(e) => setCity1Name(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                {ALL_WORLD_HUBS.map((h) => (
                  <option key={h.city} value={h.city}>
                    {h.flag} {language === 'tr' && h.cityTr ? h.cityTr : h.city} ({h.country[language as 'tr' | 'en' | 'de' | 'es' | 'ru'] || h.city})
                  </option>
                ))}
              </select>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-500">{l('Canlı Saat:', 'Live Time:', 'Echtzeit:', 'Hora actual:', 'Текущее:')}</span>
                <span className="font-mono text-sm font-black text-slate-900 dark:text-white">{city1Live}</span>
              </div>
            </div>

            {/* City 2 (Remote Nomad Location) */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {l('Göçebe / Seyahat Konumu', 'Nomad Location', 'Nomaden-Standort', 'Ubicación Nómada', 'Локация кочевника')}
                </span>
                <span className="text-xl">{hub2.flag}</span>
              </div>

              <select
                value={city2Name}
                onChange={(e) => setCity2Name(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                {ALL_WORLD_HUBS.map((h) => (
                  <option key={h.city} value={h.city}>
                    {h.flag} {language === 'tr' && h.cityTr ? h.cityTr : h.city} ({h.country[language as 'tr' | 'en' | 'de' | 'es' | 'ru'] || h.city})
                  </option>
                ))}
              </select>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-500">{l('Canlı Saat:', 'Live Time:', 'Echtzeit:', 'Hora actual:', 'Текущее:')}</span>
                <span className="font-mono text-sm font-black text-teal-600 dark:text-teal-400">{city2Live}</span>
              </div>
            </div>
          </div>

          {/* Time Difference Summary Badge */}
          <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/40 flex items-center justify-between text-xs font-bold text-teal-800 dark:text-teal-300">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-600" />
              <span>
                {diffHours === 0
                  ? l('İki şehir aynı zaman dilimindedir!', 'Both cities share the same timezone!', 'Beide Städte in gleicher Zeitzone!', '¡Misma zona horaria!', 'Одинаковое время!')
                  : diffHours > 0
                  ? `${hub2.city}, ${hub1.city} konumundan ${diffHours} saat İLERİDEDİR.`
                  : `${hub2.city}, ${hub1.city} konumundan ${Math.abs(diffHours)} saat GERİDEDİR.`}
              </span>
            </div>

            <span className="font-mono text-[11px] bg-white dark:bg-black/40 px-2 py-0.5 rounded-lg border border-teal-200/60 dark:border-teal-800/40">
              Δ {diffHours > 0 ? `+${diffHours}` : diffHours} Saat
            </span>
          </div>

          {/* 2. Interactive Hour Slider & Dual Clock View */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">
                {l('Zaman Kaydırıcı (Seçilen Saat Karşılaştırması):', 'Time Slider Comparison:', 'Zeitschieber-Vergleich:', 'Comparador de Hora:', 'Сравнение времени:')}
              </span>
              <span className="text-xs font-mono font-bold text-teal-400">
                {selectedHourCity1.toString().padStart(2, '0')}:00 {hub1.city} ➔ {inspectedHour2.toString().padStart(2, '0')}:00 {hub2.city}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="23"
              step="1"
              value={selectedHourCity1}
              onChange={(e) => setSelectedHourCity1(parseInt(e.target.value, 10))}
              className="w-full h-2.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-teal-400"
            />

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[11px] text-slate-400">{hub1.city}</div>
                <div className="text-2xl font-mono font-black text-white">
                  {selectedHourCity1.toString().padStart(2, '0')}:00
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {selectedHourCity1 >= 9 && selectedHourCity1 <= 18 ? '💼 Mesai Saati' : '🌙 Mesai Dışı'}
                </div>
              </div>

              <div className="text-center p-3 rounded-xl bg-teal-500/10 border border-teal-500/30">
                <div className="text-[11px] text-teal-300">{hub2.city}</div>
                <div className="text-2xl font-mono font-black text-teal-400">
                  {inspectedHour2.toString().padStart(2, '0')}:00
                </div>
                <div className="text-[10px] text-teal-300 mt-0.5">
                  {inspectedHour2 >= 9 && inspectedHour2 <= 18 ? '💼 Mesai Saati' : '🌙 Mesai Dışı / Gece'}
                </div>
              </div>
            </div>
          </div>

          {/* 3. 24-Hour Visual Overlap Timeline */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>{l('24 Saatlik Çakışma Şeridi (00:00 - 23:00)', '24-Hour Overlap Matrix', '24-Stunden-Übersicht', 'Matriz de 24 Horas', '24-часовая шкала')}</span>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Altın Saatler</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Genişletilmiş</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" /> Uyku/Gece</span>
              </div>
            </div>

            <div className="grid grid-cols-12 sm:grid-cols-24 gap-1 p-2 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10">
              {hoursGrid.map((cell) => {
                const isSelected = selectedHourCity1 === cell.hour1;
                return (
                  <button
                    key={cell.hour1}
                    type="button"
                    onClick={() => setSelectedHourCity1(cell.hour1)}
                    title={`${hub1.city}: ${cell.hour1}:00 | ${hub2.city}: ${cell.hour2}:00`}
                    className={`h-11 rounded-lg flex flex-col items-center justify-center text-[10px] font-mono transition-all cursor-pointer ${
                      cell.status === 'golden'
                        ? 'bg-emerald-500 text-white font-black shadow-xs'
                        : cell.status === 'extended'
                        ? 'bg-amber-400 text-slate-900 font-bold'
                        : 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                    } ${isSelected ? 'ring-2 ring-teal-500 scale-105 z-10' : ''}`}
                  >
                    <span>{cell.hour1}</span>
                    <span className="text-[8px] opacity-75">{cell.hour2}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Golden Hours Summary Card */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-950 dark:text-emerald-200 space-y-2">
            <div className="flex items-center gap-2 font-black">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{l('Önerilen Ortak Çalışma & Toplantı Penceresi', 'Recommended Overlapping Meeting Window', 'Empfohlenes Meeting-Fenster', 'Ventana Recomendada de Reunión', 'Рекомендуемое окно для встреч')}</span>
            </div>
            {goldenHours.length > 0 ? (
              <p className="leading-relaxed">
                Her iki ekibin de mesai saatinde (09:00 - 18:00) olduğu <b>{goldenHours.length} saatlik</b> ortak pencere:{' '}
                <b className="underline">
                  {goldenHours[0].hour1}:00 - {goldenHours[goldenHours.length - 1].hour1 + 1}:00 ({hub1.city})
                </b>{' '}
                ➔{' '}
                <b className="underline">
                  {goldenHours[0].hour2}:00 - {goldenHours[goldenHours.length - 1].hour2 + 1}:00 ({hub2.city})
                </b>
              </p>
            ) : (
              <p className="leading-relaxed text-amber-700 dark:text-amber-300">
                ⚠️ İki şehir arasında 09:00 - 18:00 tam mesai çakışması bulunmamaktadır. Bir tarafın sabah erken (08:00) veya akşamüstü esnek saatlerde bağlanması önerilir.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
