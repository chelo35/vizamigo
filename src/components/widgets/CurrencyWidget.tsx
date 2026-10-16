import React, { useState } from 'react';
import { ArrowRightLeft, DollarSign, Globe, RefreshCw } from 'lucide-react';
import { POPULAR_CURRENCIES } from '../../data/worldHubs';
import { convertCurrency, formatCurrencyValue, getCrossRate, useLiveCurrencyRates } from '../../data/currencyRates';
import { useI18n } from '../../data/i18n';

interface Props {
  className?: string;
  onOpenRadar?: () => void;
}

export const CurrencyWidget: React.FC<Props> = ({ className = '', onOpenRadar }) => {
  const { l } = useI18n();
  const { isLive, refresh } = useLiveCurrencyRates();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [amount, setAmount] = useState<number>(100);
  const [fromCode, setFromCode] = useState<string>('EUR');
  const [toCode, setToCode] = useState<string>('TRY');

  const handleSwap = () => {
    const prev = fromCode;
    setFromCode(toCode);
    setToCode(prev);
  };

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    setTimeout(() => setIsRefreshing(false), 350);
  };

  const convertedValue = convertCurrency(amount, fromCode, toCode);
  const crossRate = getCrossRate(fromCode, toCode);
  const toSymbol = POPULAR_CURRENCIES.find((c) => c.code === toCode)?.symbol || '';

  return (
    <div className={`p-6 rounded-[24px] glass-card currency-field leading-[1.6] ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100 dark:border-white/[0.07]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[14px] bg-[#2A8C82]/10 text-[#2A8C82] dark:text-[#52B2A7] flex items-center justify-center">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-[-0.02em] text-slate-900 dark:text-white leading-tight flex items-center gap-1.5">
              <span>{l('Hızlı Döviz Çevirici', 'Fast FX Converter', 'Währungsrechner', 'Conversor de Moneda', 'Конвертер валют')}</span>
              <span
                className={`inline-block w-1.5 h-1.5 rounded-full ${isLive ? 'bg-[#2A8C82]' : 'bg-[#D9A14A]'}`}
                title={isLive ? l('Canlı Piyasa Kurları Aktif', 'Live Market Rates Active', 'Live-Kurse aktiv') : l('Baz Kur', 'Baseline Rate', 'Basiskurs')}
              />
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400 leading-[1.6]">
              {isLive
                ? l('Canlı Güncel Piyasa Kurları', 'Live Market Exchange Rates', 'Aktuelle Live-Wechselkurse', 'Tipos de cambio en vivo', 'Актуальные курсы валют')
                : l('2026 Canlı Seyahat Kurları', '2026 Live Travel Rates', 'Live-Wechselkurse', 'Tipos de cambio', 'Курсы валют')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {onOpenRadar && (
            <button
              type="button"
              onClick={onOpenRadar}
              className="min-h-[48px] min-w-[48px] flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-[#2A8C82]/10 hover:bg-[#2A8C82]/20 text-[#1E6F66] dark:text-[#52B2A7] border border-[#2A8C82]/20 transition-all cursor-pointer touch-target-min"
              title={l('Döviz Kurlarını Dünya Haritasında Gör', 'View FX on World Map', 'Währungskarte öffnen')}
            >
              <Globe className="w-3.5 h-3.5 shrink-0" />
              <span>{l('Haritada Gör', 'FX Map', 'Karte')}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleManualRefresh}
            className="min-h-[48px] min-w-[48px] font-mono text-xs glass-pill-control text-[#1E6F66] dark:text-[#52B2A7] font-bold px-3 py-2 rounded-full flex items-center gap-1.5 cursor-pointer transition-colors touch-target-min"
            title={l('Kurları Şimdi Güncelle', 'Refresh Live Rates', 'Kurse aktualisieren')}
          >
            <span>1 {fromCode} = {crossRate.toFixed(2)} {toCode}</span>
            <RefreshCw className={`w-3 h-3 shrink-0 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Input & Selector Grid */}
      <div className="space-y-3 mb-3.5">
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          <input
            type="number"
            min="0"
            value={amount || ''}
            onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
            placeholder="100"
            aria-label={l('Döviz Tutarı', 'Currency Amount', 'Währungsbetrag', 'Monto de Divisa', 'Сумма')}
            className="w-24 min-h-[48px] px-3 py-2.5 rounded-[20px] bg-slate-50/90 dark:bg-white/[0.04] backdrop-blur-md border border-slate-200/70 dark:border-white/[0.08] text-slate-900 dark:text-white font-mono font-bold text-xs text-center focus:outline-none focus:ring-2 focus:ring-[#2A8C82]/30"
          />

          <div className="flex-1 flex items-center gap-2 min-w-0">
            <select
              value={fromCode}
              onChange={(e) => setFromCode(e.target.value)}
              aria-label={l('Kaynak Para Birimi', 'Source Currency', 'Ausgangswährung', 'Moneda de Origen', 'Исходная валюта')}
              className="flex-1 min-w-0 min-h-[48px] px-3 py-2.5 rounded-[20px] bg-slate-50/90 dark:bg-white/[0.04] backdrop-blur-md border border-slate-200/70 dark:border-white/[0.08] text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#2A8C82]/30 cursor-pointer"
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
              aria-label={l('Para birimlerini tersine çevir', 'Swap currencies', 'Währungen tauschen', 'Invertir monedas', 'Поменять валюты')}
              className="min-w-[48px] min-h-[48px] p-2.5 rounded-full glass-pill-control text-slate-600 dark:text-slate-300 hover:text-[#2A8C82] transition-colors cursor-pointer flex-shrink-0 flex items-center justify-center touch-target-min"
              title={l('Tersine çevir', 'Swap', 'Tauschen', 'Invertir', 'Поменять')}
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>

            <select
              value={toCode}
              onChange={(e) => setToCode(e.target.value)}
              aria-label={l('Hedef Para Birimi', 'Target Currency', 'Zielwährung', 'Moneda de Destino', 'Целевая валюта')}
              className="flex-1 min-w-0 min-h-[48px] px-3 py-2.5 rounded-[20px] bg-slate-50/90 dark:bg-white/[0.04] backdrop-blur-md border border-slate-200/70 dark:border-white/[0.08] text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#2A8C82]/30 cursor-pointer"
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
        <div className="flex items-center justify-between px-4 py-3 rounded-[20px] bg-gradient-to-r from-[#2A8C82]/10 via-[#2A8C82]/5 to-transparent border border-[#2A8C82]/20 leading-[1.6] safe-text-wrap">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
            {amount} {fromCode} =
          </span>
          <span className="font-mono text-base font-bold text-[#1E6F66] dark:text-[#52B2A7]">
            {toSymbol} {formatCurrencyValue(convertedValue)} <span className="text-xs font-sans font-bold text-slate-600 dark:text-slate-400">{toCode}</span>
          </span>
        </div>
      </div>

      {/* Quick Base Chips (Strict 48x48px Touch Targets with gap-2) */}
      <div className="flex items-center gap-2 overflow-x-auto pt-2.5 border-t border-slate-100 dark:border-white/[0.06] horizontal-badge-slider no-scrollbar-slider touch-pan-x flex-nowrap">
        <span className="text-xs text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider shrink-0 mr-1">
          {l('Hızlı', 'Quick', 'Schnell', 'Rápido', 'Быстро')}:
        </span>
        {(['EUR', 'USD', 'GBP', 'TRY'] as const).map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setFromCode(code)}
            className={`shrink-0 flex-shrink-0 min-h-[44px] min-w-[48px] px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer inline-flex items-center justify-center touch-target-min ${
              fromCode === code
                ? 'tab-chip-active'
                : 'bg-slate-100/80 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border border-transparent dark:border-white/[0.08] hover:bg-slate-200/70'
            }`}
          >
            {code}
          </button>
        ))}
      </div>
    </div>
  );
};
