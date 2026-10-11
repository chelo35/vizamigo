import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X,
  RotateCcw
} from 'lucide-react';
import { useI18n } from '../data/i18n';

interface CustomDatePickerProps {
  value: string; // ISO format "YYYY-MM-DD"
  onChange: (date: string) => void;
  label?: string;
  placeholder?: string;
  minDate?: string;
  maxDate?: string;
  className?: string;
  id?: string;
}

const MONTH_NAMES = {
  tr: {
    full: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    short: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
    days: ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'],
    today: 'Bugün',
    clear: 'Temizle',
    placeholder: 'Tarih seçin...'
  },
  en: {
    full: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    days: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    today: 'Today',
    clear: 'Clear',
    placeholder: 'Select date...'
  },
  de: {
    full: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    short: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    days: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    today: 'Heute',
    clear: 'Löschen',
    placeholder: 'Datum wählen...'
  }
};

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  label,
  placeholder,
  className = '',
  id
}) => {
  const { language } = useI18n();
  const langKey = (language === 'de' ? 'de' : language === 'en' ? 'en' : 'tr') as 'tr' | 'en' | 'de';
  const loc = MONTH_NAMES[langKey];

  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'days' | 'months' | 'years'>('days');

  // Parse current value or default to today
  const parsedDate = useMemo(() => {
    if (!value) return null;
    const parts = value.split('-').map(Number);
    if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
      return { year: parts[0], month: parts[1] - 1, day: parts[2] };
    }
    return null;
  }, [value]);

  const today = useMemo(() => {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDate(),
      iso: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    };
  }, []);

  const [viewYear, setViewYear] = useState<number>(() => parsedDate?.year || today.year);
  const [viewMonth, setViewMonth] = useState<number>(() => parsedDate?.month !== undefined ? parsedDate.month : today.month);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync view when opened with a value
  useEffect(() => {
    if (isOpen) {
      if (parsedDate) {
        setViewYear(parsedDate.year);
        setViewMonth(parsedDate.month);
      } else {
        setViewYear(today.year);
        setViewMonth(today.month);
      }
      setViewMode('days');
    }
  }, [isOpen, parsedDate, today]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Format display text in trigger button
  const displayFormatted = useMemo(() => {
    if (!parsedDate) return null;
    const d = new Date(parsedDate.year, parsedDate.month, parsedDate.day);
    const dayStr = String(parsedDate.day).padStart(2, '0');
    const monthStr = loc.short[parsedDate.month];
    const yearStr = parsedDate.year;

    // e.g. "11 Sep 2026, Fri" or "11. Sep. 2026, Fr." or "11 Eyl 2026, Cum"
    const weekday = new Intl.DateTimeFormat(
      langKey === 'en' ? 'en-US' : langKey === 'de' ? 'de-DE' : 'tr-TR',
      { weekday: 'short' }
    ).format(d);

    if (langKey === 'en') {
      return `${monthStr} ${dayStr}, ${yearStr} (${weekday})`;
    } else if (langKey === 'de') {
      return `${dayStr}. ${monthStr} ${yearStr} (${weekday})`;
    }
    return `${dayStr} ${monthStr} ${yearStr} (${weekday})`;
  }, [parsedDate, loc, langKey]);

  // Navigate months
  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(v => v - 1);
    } else {
      setViewMonth(v => v - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(v => v + 1);
    } else {
      setViewMonth(v => v + 1);
    }
  };

  // Calendar matrix calculation
  const calendarDays = useMemo(() => {
    // Days in current month
    const totalDays = new Date(viewYear, viewMonth + 1, 0).getDate();
    // Weekday of 1st day (0 = Monday, 6 = Sunday)
    const firstDayIndex = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;

    // Days in previous month
    const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();

    const days: Array<{
      day: number;
      month: number;
      year: number;
      isCurrentMonth: boolean;
      iso: string;
      isSelected: boolean;
      isToday: boolean;
    }> = [];

    // Previous month filler
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      const m = viewMonth === 0 ? 11 : viewMonth - 1;
      const y = viewMonth === 0 ? viewYear - 1 : viewYear;
      const iso = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        day: d,
        month: m,
        year: y,
        isCurrentMonth: false,
        iso,
        isSelected: value === iso,
        isToday: today.iso === iso
      });
    }

    // Current month
    for (let d = 1; d <= totalDays; d++) {
      const iso = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        day: d,
        month: viewMonth,
        year: viewYear,
        isCurrentMonth: true,
        iso,
        isSelected: value === iso,
        isToday: today.iso === iso
      });
    }

    // Next month filler to round to complete rows (35 or 42)
    const remainder = (7 - (days.length % 7)) % 7;
    for (let d = 1; d <= remainder; d++) {
      const m = viewMonth === 11 ? 0 : viewMonth + 1;
      const y = viewMonth === 11 ? viewYear + 1 : viewYear;
      const iso = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        day: d,
        month: m,
        year: y,
        isCurrentMonth: false,
        iso,
        isSelected: value === iso,
        isToday: today.iso === iso
      });
    }

    return days;
  }, [viewYear, viewMonth, value, today]);

  const handleSelectDay = (iso: string) => {
    onChange(iso);
    setIsOpen(false);
  };

  const handleSelectToday = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(today.iso);
    setViewYear(today.year);
    setViewMonth(today.month);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setIsOpen(false);
  };

  // Year options for selector: 2024 to 2035
  const yearOptions = useMemo(() => {
    const list: number[] = [];
    for (let y = today.year - 2; y <= today.year + 9; y++) {
      list.push(y);
    }
    return list;
  }, [today.year]);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
          {label}
        </label>
      )}

      {/* Trigger Button Field */}
      <div
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl border transition-all cursor-pointer select-none ${
          isOpen
            ? 'ring-2 ring-teal-500 border-teal-500 bg-white dark:bg-slate-800'
            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
        }`}
      >
        <div className="flex items-center gap-2 truncate">
          <CalendarIcon className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
          {displayFormatted ? (
            <span className="font-semibold text-slate-900 dark:text-slate-100 truncate">
              {displayFormatted}
            </span>
          ) : (
            <span className="text-slate-400 dark:text-slate-500">
              {placeholder || loc.placeholder}
            </span>
          )}
        </div>

        {value ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange('');
            }}
            className="p-0.5 text-slate-400 hover:text-rose-500 transition-colors ml-1 cursor-pointer"
            title={loc.clear}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
            ▼
          </span>
        )}
      </div>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 w-72 sm:w-80 p-3 glass-panel rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-white/10">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1 rounded-full text-slate-500 hover:text-slate-800 dark:text-[#8E9DBE] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Clickable Month & Year Header to toggle picker view */}
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <button
                type="button"
                onClick={() => setViewMode(viewMode === 'months' ? 'days' : 'months')}
                className="px-2 py-1 rounded-full text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                {loc.full[viewMonth]}
              </button>
              <button
                type="button"
                onClick={() => setViewMode(viewMode === 'years' ? 'days' : 'years')}
                className="px-2 py-1 rounded-full text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer font-mono"
              >
                {viewYear}
              </button>
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 rounded-full text-slate-500 hover:text-slate-800 dark:text-[#8E9DBE] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* VIEW: Month Selector Grid */}
          {viewMode === 'months' && (
            <div className="grid grid-cols-3 gap-1.5 py-2">
              {loc.short.map((mName, idx) => {
                const isCurrent = idx === viewMonth;
                return (
                  <button
                    key={mName}
                    type="button"
                    onClick={() => {
                      setViewMonth(idx);
                      setViewMode('days');
                    }}
                    className={`py-2 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                      isCurrent
                        ? 'tab-chip-active'
                        : 'tab-chip-inactive'
                    }`}
                  >
                    {mName}
                  </button>
                );
              })}
            </div>
          )}

          {/* VIEW: Year Selector Grid */}
          {viewMode === 'years' && (
            <div className="grid grid-cols-3 gap-1.5 py-2 max-h-56 overflow-y-auto">
              {yearOptions.map(y => {
                const isCurrent = y === viewYear;
                return (
                  <button
                    key={y}
                    type="button"
                    onClick={() => {
                      setViewYear(y);
                      setViewMode('days');
                    }}
                    className={`py-2 text-xs font-mono font-semibold rounded-full transition-colors cursor-pointer ${
                      isCurrent
                        ? 'tab-chip-active'
                        : 'tab-chip-inactive'
                    }`}
                  >
                    {y}
                  </button>
                );
              })}
            </div>
          )}

          {/* VIEW: Days Calendar */}
          {viewMode === 'days' && (
            <>
              {/* Weekday Labels */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 dark:text-[#7A89A6] uppercase tracking-wider mb-1">
                {loc.days.map((dw, i) => (
                  <div key={i} className="py-1">
                    {dw}
                  </div>
                ))}
              </div>

              {/* Day Cells Grid */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {calendarDays.map((cell, idx) => {
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectDay(cell.iso)}
                      className={`h-8 rounded-full text-xs font-medium transition-all flex items-center justify-center cursor-pointer ${
                        cell.isSelected
                          ? 'bg-[#0F172A] text-white dark:bg-[#202E5C] dark:text-white dark:border dark:border-white/20 font-bold shadow-md'
                          : cell.isToday
                          ? 'border border-slate-900/60 dark:border-white/30 font-bold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10'
                          : !cell.isCurrentMonth
                          ? 'text-slate-300 dark:text-slate-600 hover:bg-slate-100 dark:hover:bg-white/[0.05]'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.05]'
                      }`}
                    >
                      {cell.day}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* Footer Bar */}
          <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100 dark:border-white/10 text-xs">
            <button
              type="button"
              onClick={handleClear}
              className="text-slate-400 hover:text-rose-500 font-medium transition-colors cursor-pointer text-[11px]"
            >
              {loc.clear}
            </button>
            <button
              type="button"
              onClick={handleSelectToday}
              className="text-slate-900 dark:text-white hover:underline font-bold transition-colors cursor-pointer text-[11px]"
            >
              {loc.today}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
