import React, { useState } from 'react';
import { ArrowRightLeft, DollarSign } from 'lucide-react';
import { POPULAR_CURRENCIES } from '../../data/worldHubs';
import { convertCurrency, formatCurrencyValue, getCrossRate } from '../../data/currencyRates';
import { useI18n } from '../../data/i18n';

interface Props {
  className?: string;
}

export const CurrencyWidget: React.FC<Props> = ({ className = '' }) => {
  const { l } = useI18n();
  const [amount, setAmount] = useState<number>(100);
  const [fromCode, setFromCode] = useState<string>('EUR');
  const [toCode, setToCode] = useState<string>('TRY');

  const handleSwap = () => {
    const prev = fromCode;
    setFromCode(toCode);
    setToCode(prev);
  };

  const convertedValue = convertCurrency(amount, fromCode, toCode);
  const crossRate = getCrossRate(fromCode, toCode);
  const toSymbol = POPULAR_CURRENCIES.find((c) => c.code === toCode)?.symbol || '';

  return (
    <div className={`p-4 rounded-2xl glass-card border border-slate-200/80 dark:border-white/10 shadow-sm ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200/70 dark:border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 dark:text-white leading-tight">
              {l('Hızlı Döviz Çevirici', 'Fast FX Converter', 'Währungsrechner', 'Conversor de Moneda', 'Конвертер валют')}
            </h4>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">
              {l('2026 Canlı Seyahat Kurları', '2026 Live Travel Rates', 'Live-Wechselkurse', 'Tipos de cambio', 'Курсы валют')}
            </span>
          </div>
        </div>

        <span className="font-mono text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
          1 {fromCode} = {crossRate.toFixed(2)} {toCode}
        </span>
      </div>

      {/* Input & Selector Grid */}
      <div className="space-y-2 mb-2.5">
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            value={amount || ''}
            onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
            placeholder="100"
            className="w-24 px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-mono font-black text-xs text-center focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />

          <div className="flex-1 flex items-center gap-1 min-w-0">
            <select
              value={fromCode}
              onChange={(e) => setFromCode(e.target.value)}
              className="flex-1 min-w-0 px-2 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              {POPULAR_CURRENCIES.map((c) => (
                <option key={`from-${c.code}`} value={c.code}>
                  {c.flag} {c.code}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleSwap}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer flex-shrink-0"
              title={l('Tersine çevir', 'Swap', 'Tauschen', 'Invertir', 'Поменять')}
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
            </button>

            <select
              value={toCode}
              onChange={(e) => setToCode(e.target.value)}
              className="flex-1 min-w-0 px-2 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              {POPULAR_CURRENCIES.map((c) => (
                <option key={`to-${c.code}`} value={c.code}>
                  {c.flag} {c.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Big Clean Converted Result Pill */}
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20">
          <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
            {amount} {fromCode} =
          </span>
          <span className="font-mono text-base font-black text-emerald-700 dark:text-emerald-300">
            {toSymbol} {formatCurrencyValue(convertedValue)} <span className="text-xs font-sans font-bold text-slate-600 dark:text-slate-400">{toCode}</span>
          </span>
        </div>
      </div>

      {/* Quick Base Chips */}
      <div className="flex items-center gap-1 overflow-x-auto pt-1 border-t border-slate-100 dark:border-white/5">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider shrink-0 mr-1">
          {l('Hızlı', 'Quick', 'Schnell', 'Rápido', 'Быстро')}:
        </span>
        {(['EUR', 'USD', 'GBP', 'TRY'] as const).map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setFromCode(code)}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
              fromCode === code
                ? 'bg-emerald-600 text-white font-black shadow-2xs'
                : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {code}
          </button>
        ))}
      </div>
    </div>
  );
};
