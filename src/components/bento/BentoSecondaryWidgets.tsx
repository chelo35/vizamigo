import React, { useState, useEffect } from 'react';
import {
  GlobalDayCounter3DIllustration,
  CurrencyCoins3DIllustration,
  WorldClock3DIllustration,
  Suitcases3DIllustration,
  NomadIsland3DIllustration,
  LifebuoySOS3DIllustration,
  LocalApps3DIllustration
} from './BentoIllustrations';
import { BentoWidgetId } from './BentoDashboardGrid';

// Isolated self-updating live city clock component (prevents whole dashboard grid re-renders)
export const LiveCityClock: React.FC<{ offsetHours: number; label?: string }> = ({ offsetHours, label }) => {
  const [timeStr, setTimeStr] = useState<string>(() => {
    const utc = Date.now() + new Date().getTimezoneOffset() * 60000;
    const d = new Date(utc + offsetHours * 3600000);
    return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', hour12: false });
  });

  useEffect(() => {
    const update = () => {
      const utc = Date.now() + new Date().getTimezoneOffset() * 60000;
      const d = new Date(utc + offsetHours * 3600000);
      setTimeStr(d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    const timer = setInterval(update, 15000);
    return () => clearInterval(timer);
  }, [offsetHours]);

  return <span>{label ? `${label} ` : ''}{timeStr}</span>;
};

interface BentoSecondaryWidgetsProps {
  openWidget: (id: BentoWidgetId, subTab?: string, countryCode?: string) => void;
  onOpenPackingList?: () => void;
  onOpenTippingCalc?: () => void;
  onOpenTimezoneOverlap?: () => void;
  onOpenGlobalRadar?: (mode?: 'all' | 'clock' | 'weather' | 'currency', city?: string) => void;
  appsCountry: string;
  currencyDisplay: { line1: string; line2: string };
  l: (tr: string, en: string, de?: string, es?: string, ru?: string) => string;
}

export const BentoSecondaryWidgets: React.FC<BentoSecondaryWidgetsProps> = ({
  openWidget,
  onOpenPackingList,
  onOpenTippingCalc,
  onOpenTimezoneOverlap,
  onOpenGlobalRadar,
  appsCountry,
  currencyDisplay,
  l
}) => {
  return (
    <>
      {/* -----------------------------------------------------------------
          WIDGET 4: DÜNYA GÜN SAYACI
      ----------------------------------------------------------------- */}
      <div
        onClick={() => openWidget('day_counter', 'schengen')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && openWidget('day_counter', 'schengen')}
        className="col-span-1 group relative overflow-hidden rounded-2xl sm:rounded-3xl bento-lagoon-card p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 min-h-[196px] sm:min-h-[216px] flex flex-col justify-between"
      >
        <div className="space-y-0.5">
          <h3 className="text-sm sm:text-base font-black text-[#011a17] dark:text-white leading-tight">
            {l('Dünya Gün Sayacı', 'Day Counter')}
          </h3>
          <div className="text-base sm:text-lg font-black text-[#011a17] dark:text-[#5EEAD4] leading-tight">
            {l('48 Gün Kaldı', '48 Days Left')}
          </div>
          <div className="text-xs sm:text-sm font-bold text-[#03443d] dark:text-teal-200">
            {l('(Schengen & Küresel)', '(Schengen & Global)')}
          </div>
        </div>

        <div className="h-24 sm:h-28 flex items-center justify-center my-1.5">
          <GlobalDayCounter3DIllustration daysLeft={48} />
        </div>

        <div>
          <span className="w-full inline-flex items-center justify-center gap-1 px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#14B8A6] hover:from-[#0F766E] hover:to-[#0D9488] text-white text-xs sm:text-sm font-black shadow-xs transition-all">
            {l('Sayacı Aç →', 'Open Counter →')}
          </span>
        </div>
      </div>

      {/* -----------------------------------------------------------------
          WIDGET 5: DÖVİZ & BÜTÇE
      ----------------------------------------------------------------- */}
      <div
        onClick={() => openWidget('currency', 'converter')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && openWidget('currency', 'converter')}
        className="col-span-1 group relative overflow-hidden rounded-2xl sm:rounded-3xl bento-lagoon-card p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 min-h-[196px] sm:min-h-[216px] flex flex-col justify-between"
      >
        <div>
          <h3 className="text-sm sm:text-base font-black text-[#011a17] dark:text-white leading-tight">
            {l('Döviz & Bütçe', 'Currency & Budget')}
          </h3>
        </div>

        <div className="h-24 sm:h-28 flex items-center justify-center my-1.5">
          <CurrencyCoins3DIllustration />
        </div>

        <div className="pt-1.5 border-t border-[#0F766E]/20 dark:border-white/15">
          <div className="flex flex-wrap items-baseline justify-between font-mono font-black text-xs sm:text-sm text-[#011a17] dark:text-white tabular-nums">
            <span>{currencyDisplay.line1}</span>
            <span>{currencyDisplay.line2}</span>
          </div>
        </div>
      </div>

      {/* -----------------------------------------------------------------
          WIDGET 6: AKILLI BAVUL
      ----------------------------------------------------------------- */}
      <div
        onClick={() => openWidget('packing', 'documents')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && openWidget('packing', 'documents')}
        className="col-span-1 group relative overflow-hidden rounded-2xl sm:rounded-3xl bento-lagoon-card p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 min-h-[196px] sm:min-h-[216px] flex flex-col justify-between"
      >
        <div>
          <h3 className="text-sm sm:text-base font-black text-[#011a17] dark:text-white leading-tight">
            {l('Akıllı Bavul', 'Smart Packing')}
          </h3>
        </div>

        <div className="h-24 sm:h-28 flex items-center justify-center my-1.5">
          <Suitcases3DIllustration />
        </div>

        <div className="pt-1.5 border-t border-[#0F766E]/20 dark:border-white/15">
          <span className="w-full inline-flex items-center justify-center gap-1 px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#14B8A6] hover:from-[#0F766E] hover:to-[#0D9488] text-white text-xs sm:text-sm font-black shadow-xs transition-all">
            {l('Bavulu Aç →', 'Open Packing →')}
          </span>
        </div>
      </div>

      {/* -----------------------------------------------------------------
          WIDGET 7: DÜNYA SAATİ & ROTA PLANLAYICI
      ----------------------------------------------------------------- */}
      <div
        onClick={() => onOpenGlobalRadar ? onOpenGlobalRadar('clock') : openWidget('world_clock', 'clocks')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && (onOpenGlobalRadar ? onOpenGlobalRadar('clock') : openWidget('world_clock', 'clocks'))}
        className="col-span-1 group relative overflow-hidden rounded-2xl sm:rounded-3xl bento-lagoon-card p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 min-h-[196px] sm:min-h-[216px] flex flex-col justify-between"
      >
        <div className="space-y-0.5">
          <h3 className="text-sm sm:text-base font-black text-[#011a17] dark:text-white leading-tight">
            {l('Dünya Saati', 'World Clock')}
          </h3>
          <div className="flex flex-wrap items-center gap-2 font-mono font-bold text-xs text-[#011a17] dark:text-white">
            <LiveCityClock offsetHours={3} label="IST" />
            <span>•</span>
            <LiveCityClock offsetHours={1} label="BER" />
            <span>•</span>
            <LiveCityClock offsetHours={-4} label="NYC" />
          </div>
        </div>

        <div className="h-24 sm:h-28 flex items-center justify-center my-1.5">
          <WorldClock3DIllustration />
        </div>

        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenTimezoneOverlap?.();
            }}
            className="flex-1 px-2 py-1.5 rounded-xl bg-white/40 dark:bg-white/10 hover:bg-white/60 dark:hover:bg-white/20 text-[#011a17] dark:text-white text-[11px] font-black transition-all"
          >
            {l('Ortak Saat', 'Overlap')}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openWidget('route_planner', 'builder');
            }}
            className="flex-1 px-2 py-1.5 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#14B8A6] text-white text-[11px] font-black transition-all"
          >
            {l('Rota Çiz →', 'Route →')}
          </button>
        </div>
      </div>

      {/* -----------------------------------------------------------------
          WIDGET 8: TÜM TURİZM UYGULAMALARI (SUPER-APPS)
      ----------------------------------------------------------------- */}
      <div
        onClick={() => openWidget('local_apps', 'apps', appsCountry)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && openWidget('local_apps', 'apps', appsCountry)}
        className="col-span-1 group relative overflow-hidden rounded-2xl sm:rounded-3xl bento-lagoon-card p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 min-h-[196px] sm:min-h-[216px] flex flex-col justify-between"
      >
        <div>
          <h3 className="text-sm sm:text-base font-black text-[#011a17] dark:text-white leading-tight">
            {l('Turizm Uygulamaları', 'Local Super-Apps')}
          </h3>
          <p className="text-xs sm:text-sm font-bold text-[#03443d] dark:text-[#5EEAD4]">
            {l('Taksi, Yemek, Harita & eSIM', 'Ride, Food, Maps & eSIM')}
          </p>
        </div>

        <div className="h-24 sm:h-28 flex items-center justify-center my-1.5">
          <LocalApps3DIllustration />
        </div>

        <div className="pt-1.5 border-t border-[#0F766E]/20 dark:border-white/15">
          <span className="w-full inline-flex items-center justify-center gap-1 px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#14B8A6] hover:from-[#0F766E] hover:to-[#0D9488] text-white text-xs sm:text-sm font-black shadow-xs transition-all">
            {l('Uygulamaları Aç →', 'Open Apps →')}
          </span>
        </div>
      </div>

      {/* -----------------------------------------------------------------
          WIDGET 9: DİJİTAL GÖÇEBE ÜSLERİ
      ----------------------------------------------------------------- */}
      <div
        onClick={() => openWidget('nomad', 'hubs')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && openWidget('nomad', 'hubs')}
        className="col-span-1 group relative overflow-hidden rounded-2xl sm:rounded-3xl bento-lagoon-card p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 min-h-[196px] sm:min-h-[216px] flex flex-col justify-between"
      >
        <div>
          <h3 className="text-sm sm:text-base font-black text-[#011a17] dark:text-white leading-tight">
            {l('Dijital Göçebe (Nomad)', 'Digital Nomad')}
          </h3>
          <p className="text-xs sm:text-sm font-bold text-[#03443d] dark:text-[#5EEAD4]">
            {l('Topluluk, Yaşam & Hız', 'Hubs, Cost & Net')}
          </p>
        </div>

        <div className="h-24 sm:h-28 flex items-center justify-center my-1.5">
          <NomadIsland3DIllustration />
        </div>

        <div className="pt-1.5 border-t border-[#0F766E]/20 dark:border-white/15">
          <span className="w-full inline-flex items-center justify-center gap-1 px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#14B8A6] hover:from-[#0F766E] hover:to-[#0D9488] text-white text-xs sm:text-sm font-black shadow-xs transition-all">
            {l('Göçebe Rehberi →', 'Nomad Guide →')}
          </span>
        </div>
      </div>

      {/* -----------------------------------------------------------------
          WIDGET 10: ACİL KONSOLOSLUK & SOS KRİZ MASASI
      ----------------------------------------------------------------- */}
      <div
        onClick={() => openWidget('emergency', 'sos')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && openWidget('emergency', 'sos')}
        className="col-span-1 group relative overflow-hidden rounded-2xl sm:rounded-3xl bento-lagoon-card p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 min-h-[196px] sm:min-h-[216px] flex flex-col justify-between"
      >
        <div>
          <h3 className="text-sm sm:text-base font-black text-[#011a17] dark:text-white leading-tight">
            {l('Acil Konsolosluk & SOS', 'Emergency SOS')}
          </h3>
          <p className="text-xs sm:text-sm font-bold text-[#03443d] dark:text-[#5EEAD4]">
            {l('Kriz Masası & Temsilcilikler', 'Diplomatic & Police Hotlines')}
          </p>
        </div>

        <div className="h-24 sm:h-28 flex items-center justify-center my-1.5">
          <LifebuoySOS3DIllustration />
        </div>

        <div className="pt-1.5 border-t border-[#0F766E]/20 dark:border-white/15">
          <span className="w-full inline-flex items-center justify-center gap-1 px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#EA580C] to-[#E11D48] text-white text-xs sm:text-sm font-black shadow-xs transition-all">
            {l('Acil Hattı Aç →', 'Open Emergency →')}
          </span>
        </div>
      </div>
    </>
  );
};
