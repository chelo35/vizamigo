import React, { useMemo } from 'react';
import {
  ExternalLink,
  ShieldAlert,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import {
  getCountryConciergePlan,
  ConciergePartnerNode
} from '../data/travelConciergeEngine';
import { getCountryNomadApps } from '../data/rideAndDeliveryApps';
import { useI18n } from '../data/i18n';
import { getCountryName } from '../data/passportData';

interface TravelConciergeGridProps {
  countryCode: string;
  originPassport?: string;
  variant?: 'compact-strip' | 'bento-full';
}

export const TravelConciergeGrid: React.FC<TravelConciergeGridProps> = ({
  countryCode,
  originPassport = 'TR',
  variant = 'bento-full'
}) => {
  const { language, l } = useI18n();
  const isTr = language === 'tr';

  const plan = useMemo(
    () => getCountryConciergePlan(countryCode, originPassport),
    [countryCode, originPassport]
  );

  const countryApps = useMemo(
    () => getCountryNomadApps(countryCode),
    [countryCode]
  );

  const countryDisplayName = useMemo(
    () => getCountryName(countryCode, language),
    [countryCode, language]
  );

  // ============================================================================
  // COMPACT STRIP VARIANT: Displayed on every Country Card in the 199-Country List
  // Shows 6 Categorized App Pills with Visible Brand Logo Badges & Readable Text!
  // ============================================================================
  if (variant === 'compact-strip') {
    const topApps = countryApps.slice(0, 6);
    return (
      <div
        className="w-full pt-3.5 mt-2 border-t border-[#5EEAD4]/40 leading-[1.6] safe-text-wrap"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wide text-[#0F766E] dark:text-[#5EEAD4]">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>
              {l(
                `${countryDisplayName} Aktif Uygulamalar & Seyahat Hizmetleri`,
                `${countryDisplayName} Active Travel Apps & Services`,
                `${countryDisplayName} Aktive Reise-Apps & Services`
              )}
            </span>
          </span>
          <span className="text-xs font-bold text-[#0369A1] dark:text-[#7DD3FC]">
            {l(
              'Uçuş · Otel · Taksi/Scooter · Tren/Feribot · eSIM · Para/Sigorta',
              'Flights · Hotels · Taxi/Scooter · Rail/Ferry · eSIM · Money/Insurance'
            )}
          </span>
        </div>

        {/* 6 Symmetrical App Cards with Visible Brand Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {topApps.map((app) => (
            <a
              key={app.name}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/slot min-h-[54px] p-2.5 rounded-2xl bg-[#F0FDFA] dark:bg-[#0B3B4C] border border-[#5EEAD4]/60 hover:border-[#0284C7] dark:hover:border-[#38BDF8] shadow-xs hover:shadow-md transition-all flex items-center gap-2.5 text-left no-underline"
              title={isTr ? app.taglineTr : app.taglineEn}
            >
              <div
                style={{ background: app.logoBg }}
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xs font-black text-white shadow-xs px-1 text-center leading-tight"
              >
                {app.logoText}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-extrabold text-[#0F766E] dark:text-[#5EEAD4] truncate">
                  {isTr ? app.categoryLabelTr : app.categoryLabelEn}
                </div>
                <div className="text-xs sm:text-sm font-black text-[#042F2E] dark:text-white truncate">
                  {app.name}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  // ============================================================================
  // BENTO-FULL VARIANT: Complete Ecosystem inside Expanded Country Card Drawer
  // ============================================================================
  return (
    <section
      className="rounded-[26px] p-5 sm:p-7 bg-[#F0FDFA] dark:bg-[#082F49] border-2 border-[#5EEAD4]/60 shadow-xl space-y-6 leading-[1.6] safe-text-wrap"
      aria-label={`${countryDisplayName} Hyper-Localized Travel Concierge`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#5EEAD4]/40">
        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0D9488] to-[#0284C7] text-white flex items-center justify-center shrink-0 shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg sm:text-xl font-black text-[#042F2E] dark:text-white">
                {countryDisplayName}{' '}
                {l(
                  'Tüm Seyahat Uygulamaları, Ulaşım & Rezervasyon Merkezi',
                  'All Travel Apps, Transit & Booking Hub',
                  'Alle Reise-Apps, Transport & Buchungs-Hub'
                )}
              </h3>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-[#CCFBF1] dark:bg-[#0D9488] text-[#042F2E] dark:text-white border border-[#2DD4BF]">
                {countryApps.length} {l('Aktif Uygulama', 'Active Apps')}
              </span>
            </div>
            <p className="text-sm text-[#064E3B] dark:text-[#CCFBF1] mt-1 font-medium">
              {l(
                'Uçuş, alternatif otel, taksi, motor/scooter, bisiklet, tren/feribot, para transferi, sigorta, eSIM, arkadaşlık, dil ve bagaj emanet uygulamaları.',
                'Flights, alternative stays, taxi, scooter/moto, bike, train/ferry, money transfer, insurance, eSIM, friendship, language, and luggage storage.'
              )}
            </p>
          </div>
        </div>

        {plan.hasRegionalRestrictionAlert && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-900 dark:text-amber-200 text-xs font-black shrink-0">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{l('Bölgesel VPN/eSIM Notu Mevcut', 'Regional VPN/eSIM Note Active')}</span>
          </div>
        )}
      </div>

      {/* Full Grid of Country Apps with Brand Logos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {countryApps.map((app) => (
          <a
            key={app.name}
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-white dark:bg-[#0B3B4C] border border-[#5EEAD4]/60 hover:border-[#0284C7] shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col justify-between gap-3 no-underline"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div
                  style={{ background: app.logoBg }}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xs text-center px-1 shadow-md shrink-0"
                >
                  {app.logoText}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-extrabold text-[#0F766E] dark:text-[#5EEAD4] truncate">
                    {isTr ? app.categoryLabelTr : app.categoryLabelEn}
                  </div>
                  <div className="text-base font-black text-[#042F2E] dark:text-white truncate">
                    {app.name}
                  </div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#064E3B] dark:text-[#E2E8F0] font-medium leading-snug">
                {isTr ? app.recommendedReasonTr : app.recommendedReasonEn}
              </p>
            </div>
            <div className="pt-2 border-t border-[#5EEAD4]/30 flex items-center justify-between text-xs font-black text-[#0284C7] dark:text-[#38BDF8]">
              <span>{l('Uygulamayı Aç / İncele', 'Open App / Explore')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>
        ))}
      </div>

      {/* 4-Stage Chronological Concierge Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 pt-2">
        {plan.stages.map((group) => (
          <div
            key={group.stage}
            className="p-4 rounded-2xl bg-white/90 dark:bg-[#0B3B4C]/90 border border-[#5EEAD4]/50 flex flex-col justify-between gap-3"
          >
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-black bg-[#CCFBF1] dark:bg-[#064E3B] text-[#042F2E] dark:text-[#5EEAD4]">
                ADIM {group.stepNumber}
              </span>
              <h4 className="text-base font-black text-[#042F2E] dark:text-white mt-1.5">
                {isTr ? group.titleTr : group.titleEn}
              </h4>
            </div>
            <div className="space-y-2">
              {group.partners.slice(0, 2).map((partner: ConciergePartnerNode) => (
                <a
                  key={partner.id}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#F0FDFA] dark:bg-[#072634] border border-[#5EEAD4]/50 hover:border-[#0284C7] flex items-center justify-between gap-2 no-underline"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-black text-[#042F2E] dark:text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] dark:text-[#5EEAD4] shrink-0" />
                      <span className="truncate">{partner.brand}</span>
                    </div>
                    <div className="text-xs font-bold text-[#0F766E] dark:text-[#7DD3FC] truncate">
                      {isTr ? partner.badgeTr : partner.badgeEn}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#0D9488] dark:text-[#5EEAD4] shrink-0" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
