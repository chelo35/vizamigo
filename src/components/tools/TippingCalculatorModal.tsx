import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ArrowLeft,
  Coins,
  Users,
  Percent,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Globe,
  Receipt
} from 'lucide-react';
import { useI18n } from '../../data/i18n';
import { getCountryTravelIntelligence } from '../../data/countryTravelIntelligence';
import { ALL_WORLD_HUBS } from '../../data/worldHubs';
import { useModalA11y } from '../../utils/useModalA11y';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialCountryCode?: string;
}

const POPULAR_DESTINATIONS = [
  { code: 'US', name: 'ABD', currency: 'USD ($)', symbol: '$' },
  { code: 'IT', name: 'İtalya', currency: 'EUR (€)', symbol: '€' },
  { code: 'DE', name: 'Almanya', currency: 'EUR (€)', symbol: '€' },
  { code: 'FR', name: 'Fransa', currency: 'EUR (€)', symbol: '€' },
  { code: 'GB', name: 'Birleşik Krallık', currency: 'GBP (£)', symbol: '£' },
  { code: 'JP', name: 'Japonya', currency: 'JPY (¥)', symbol: '¥' },
  { code: 'TH', name: 'Tayland', currency: 'THB (฿)', symbol: '฿' },
  { code: 'ID', name: 'Endonezya (Bali)', currency: 'IDR (Rp)', symbol: 'Rp' },
  { code: 'AE', name: 'BAE (Dubai)', currency: 'AED (د.إ)', symbol: 'AED' },
  { code: 'EG', name: 'Mısır', currency: 'EGP (E£)', symbol: 'E£' },
  { code: 'GE', name: 'Gürcistan', currency: 'GEL (₾)', symbol: '₾' },
  { code: 'TR', name: 'Türkiye', currency: 'TRY (₺)', symbol: '₺' }
];

export const TippingCalculatorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialCountryCode = 'US'
}) => {
  const { language, l } = useI18n();
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>(initialCountryCode);
  const [billAmount, setBillAmount] = useState<number>(100);
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [splitCount, setSplitCount] = useState<number>(2);

  useModalA11y({
    isOpen,
    onClose,
    modalRef
  });

  // Sync with initialCountryCode if provided
  useEffect(() => {
    if (initialCountryCode) {
      setSelectedCountryCode(initialCountryCode);
      const intel = getCountryTravelIntelligence(initialCountryCode);
      if (intel && intel.tipping) {
        setTipPercent(intel.tipping.standardPercent);
      }
    }
  }, [initialCountryCode]);

  // When selected country changes, update default tip percent
  const handleCountryChange = (code: string) => {
    setSelectedCountryCode(code);
    const intel = getCountryTravelIntelligence(code);
    if (intel && intel.tipping) {
      setTipPercent(intel.tipping.standardPercent);
    }
  };

  if (!isOpen) return null;

  const currentCountry = POPULAR_DESTINATIONS.find((c) => c.code === selectedCountryCode) || {
    code: selectedCountryCode,
    name: selectedCountryCode,
    currency: 'USD ($)',
    symbol: '$'
  };

  const intel = getCountryTravelIntelligence(selectedCountryCode, currentCountry.name);

  // Calculations
  const tipAmount = Math.round((billAmount * tipPercent) / 100 * 100) / 100;
  const totalBill = Math.round((billAmount + tipAmount) * 100) / 100;
  const perPersonTotal = splitCount > 0 ? Math.round((totalBill / splitCount) * 100) / 100 : totalBill;
  const perPersonTip = splitCount > 0 ? Math.round((tipAmount / splitCount) * 100) / 100 : tipAmount;

  const handlePrintPdf = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Vizamigo Bahşiş & Masraf Dökümü - ${currentCountry.name}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 32px; color: #0f172a; line-height: 1.5; }
            .header { border-bottom: 2px solid #0d9488; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
            .title { font-size: 22px; font-weight: 900; color: #042f2e; }
            .meta { font-size: 12px; color: #64748b; margin-top: 4px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
            .card { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 16px; }
            .card-title { font-size: 11px; text-transform: uppercase; color: #0d9488; font-weight: 800; margin-bottom: 6px; }
            .card-val { font-size: 22px; font-weight: 900; color: #0f172a; }
            .highlight { background: #f0fdf4; border: 2px solid #16a34a; }
            .etiquette { background: #fefce8; border: 1px solid #fde047; border-radius: 12px; padding: 16px; margin-bottom: 24px; }
            .footer { margin-top: 36px; padding-top: 16px; border-top: 1px solid #cbd5e1; font-size: 11px; color: #64748b; text-align: center; }
            @media print {
              body { padding: 16px; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="title">🪙 Vizamigo Bahşiş & Masraf Hesap Çizelgesi</div>
              <div class="meta">${currentCountry.name} (${currentCountry.code}) · Tarih: ${new Date().toLocaleDateString()}</div>
            </div>
          </div>

          <div class="grid">
            <div class="card">
              <div class="card-title">Hesap / Fatura Tutarı</div>
              <div class="card-val">${billAmount.toFixed(2)} ${currentCountry.symbol}</div>
            </div>
            <div class="card">
              <div class="card-title">Bahşiş Oranı (%${tipPercent})</div>
              <div class="card-val">${tipAmount.toFixed(2)} ${currentCountry.symbol}</div>
            </div>
            <div class="card highlight">
              <div class="card-title">Toplam Ödenecek</div>
              <div class="card-val">${totalBill.toFixed(2)} ${currentCountry.symbol}</div>
            </div>
            <div class="card">
              <div class="card-title">Kişi Başı (${splitCount} Gezgin)</div>
              <div class="card-val">${perPersonTotal.toFixed(2)} ${currentCountry.symbol}</div>
            </div>
          </div>

          <div class="etiquette">
            <div style="font-weight: 800; color: #854d0e; font-size: 13px; margin-bottom: 6px;">💡 Yerel Bahşiş Kültürü & Kuralları</div>
            <div style="font-size: 12px; color: #713f12;">${intel?.tipping?.note || intel?.tipping?.custom || 'Standart hizmet bedeli hesaba dahildir veya %10-%15 makul görülür.'}</div>
          </div>

          <div class="footer">
            Vizamigo Global Mobility Intelligence · 199 Ülke Doğrulanmış Vize & Seyahat Sistemi · vizamigo.com
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      role="region"
      aria-labelledby="tipping-page-title"
      tabIndex={-1}
      className="fixed inset-0 z-50 bg-[#F8FAFC] dark:bg-[#0B0F17] flex flex-col overflow-hidden text-slate-900 dark:text-slate-100 animate-in fade-in duration-150"
    >
      {/* 1. Header with back button */}
      <header className="sticky top-0 z-30 shrink-0 px-4 sm:px-8 py-3 bg-white/95 dark:bg-[#0B0F17]/95 border-b border-slate-200/80 dark:border-white/10 backdrop-blur-md">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 transition-all cursor-pointer shrink-0"
              title={l("Geri", 'Back', 'Zurück')}
            >
              <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span>{l("Geri", 'Back', 'Zurück')}</span>
            </button>
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Coins className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h1 id="tipping-page-title" className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight truncate">
                  {l('Akıllı Bahşiş & Masraf Bölüşücü', 'Smart Tipping & Bill Splitter', 'Trinkgeld- & Rechnungsrechner', 'Calculadora de Propinas', 'Калькулятор чаевых')}
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate hidden sm:block">
                  {l('Ülke kurallarına duyarlı bahşiş ve kişi başı hesap', 'Country-aware tipping etiquette & bill splitting')}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrintPdf}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs cursor-pointer shadow-xs transition-all"
            >
              <span aria-hidden="true">📄</span>
              <span className="hidden sm:inline">PDF / Yazdır</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label={l('Kapat', 'Close', 'Schließen', 'Cerrar', 'Закрыть')}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer shrink-0 inline-flex items-center gap-1.5"
            >
              <X className="w-5 h-5" aria-hidden="true" />
              <span className="text-xs font-bold hidden sm:inline">{l('Kapat', 'Close')}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-3xl mx-auto w-full space-y-6">
          {/* 1. Country Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-teal-500" />
              <span>{l('Gidilen Ülke / Destinasyon', 'Destination Country', 'Zielland', 'País de Destino', 'Страна')}</span>
            </label>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
              {POPULAR_DESTINATIONS.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleCountryChange(c.code)}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCountryCode === c.code
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Country Tipping Etiquette Notice Box */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1.5">
            <div className="flex items-center gap-2 font-black text-amber-800 dark:text-amber-300">
              <HelpCircle className="w-4 h-4 flex-shrink-0" />
              <span>{currentCountry.name} {l('Bahşiş Geleneği', 'Tipping Customs', 'Trinkgeld-Brauch', 'Costumbre de Propina', 'Традиции чаевых')}</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {intel.tipping.custom}
            </p>
            {intel.tipping.note && (
              <p className="text-[11px] text-amber-700/80 dark:text-amber-400/80">
                💡 <b>İpucu:</b> {intel.tipping.note}
              </p>
            )}
          </div>

          {/* 3. Bill Amount & Percentage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Bill Amount Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Receipt className="w-3.5 h-3.5 text-slate-400" />
                <span>{l('Fatura Tutarı', 'Bill Amount', 'Rechnungsbetrag', 'Monto de la Factura', 'Сумма счета')} ({currentCountry.symbol})</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={billAmount || ''}
                  onChange={(e) => setBillAmount(parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-mono font-black text-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                  {currentCountry.symbol}
                </span>
              </div>
            </div>

            {/* Split Count Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>{l('Kişi Sayısı', 'Number of People', 'Personenanzahl', 'Número de Personas', 'Количество человек')}</span>
                </span>
                <span className="font-mono text-teal-600 dark:text-teal-400">{splitCount} {l('Kişi', 'People', 'Pers.', 'Pers.', 'чел.')}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={splitCount}
                onChange={(e) => setSplitCount(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>1</span>
                <span>5</span>
                <span>10</span>
              </div>
            </div>
          </div>

          {/* 4. Tip Percentage Presets */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1">
                <Percent className="w-3.5 h-3.5 text-slate-400" />
                <span>{l('Bahşiş Oranı', 'Tip Percentage', 'Trinkgeld-Prozentsatz', 'Porcentaje de Propina', 'Процент')}</span>
              </span>
              <span className="font-mono text-amber-600 dark:text-amber-400 font-black">%{tipPercent}</span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {[
                { percent: 0, label: '0%' },
                { percent: 10, label: '10%' },
                { percent: 15, label: '15%' },
                { percent: 18, label: '18%' },
                { percent: 20, label: '20%' }
              ].map((p) => (
                <button
                  key={p.percent}
                  type="button"
                  onClick={() => setTipPercent(p.percent)}
                  className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    tipPercent === p.percent
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Result Cards Grid */}
          <div className="p-5 rounded-3xl bg-slate-900 text-white shadow-xl space-y-4 border border-white/10">
            <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                  {l('Bahşiş Tutarı', 'Tip Amount', 'Trinkgeldbetrag', 'Monto de Propina', 'Чаевые')}
                </span>
                <div className="text-xl sm:text-2xl font-mono font-black text-amber-400">
                  {currentCountry.symbol}{tipAmount.toFixed(2)}
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                  {l('Toplam Hesap', 'Total Bill', 'Gesamtrechnung', 'Factura Total', 'Итого')}
                </span>
                <div className="text-xl sm:text-2xl font-mono font-black text-white">
                  {currentCountry.symbol}{totalBill.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Split share if more than 1 person */}
            {splitCount > 1 && (
              <div className="flex items-center justify-between pt-1 text-xs">
                <div>
                  <span className="text-slate-400">{l('Kişi Başı Ödenecek:', 'Per Person Total:', 'Pro Person:', 'Por Persona:', 'С человека:')}</span>
                  <div className="text-lg font-mono font-black text-teal-400">
                    {currentCountry.symbol}{perPersonTotal.toFixed(2)}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-slate-400">{l('Kişi Başı Bahşiş Payı:', 'Tip Share:', 'Trinkgeld-Anteil:', 'Parte de Propina:', 'Доля чаевых:')}</span>
                  <div className="text-sm font-mono font-bold text-slate-300">
                    {currentCountry.symbol}{perPersonTip.toFixed(2)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  );
};
