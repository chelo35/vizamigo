import React, { useMemo } from 'react';
import {
  Plane,
  Building2,
  Car,
  Wifi,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Languages,
  CheckCircle2
} from 'lucide-react';
import {
  getCountryConciergePlan,
  ConciergeStageId,
  ConciergePartnerNode
} from '../data/travelConciergeEngine';
import { useI18n } from '../data/i18n';
import { getCountryName } from '../data/passportData';

interface TravelConciergeGridProps {
  countryCode: string;
  originPassport?: string;
  /**
   * 'compact-strip': Pre-rendered 4-slot chronological pill strip for main country list cards (zero CLS)
   * 'bento-full': Full 4-stage chronological Bento-box grid for expanded country cards & 360° Country Dossier
   */
  variant?: 'compact-strip' | 'bento-full';
}

function getStageIcon(stage: ConciergeStageId, className = 'w-4 h-4') {
  switch (stage) {
    case 'flights':
      return <Plane className={className} />;
    case 'accommodation':
      return <Building2 className={className} />;
    case 'transit':
      return <Car className={className} />;
    case 'essentials':
      return <Wifi className={className} />;
  }
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

  const countryDisplayName = useMemo(
    () => getCountryName(countryCode, language),
    [countryCode, language]
  );

  // ============================================================================
  // COMPACT STRIP VARIANT: Pre-rendered 4-slot Bento action bar inside Country Cards
  // Guarantees fixed dimensions (min-h-[42px]) for zero layout shift (CLS = 0)
  // ============================================================================
  if (variant === 'compact-strip') {
    return (
      <div
        className="w-full pt-2.5 mt-1 border-t border-slate-100/90 dark:border-white/[0.06] leading-[1.6]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#2A8C82] dark:text-[#52B2A7]">
            <Sparkles className="w-3 h-3 shrink-0" />
            <span>
              {l(
                'Yerelleştirilmiş Seyahat Konsiyerji (Kronolojik Akış)',
                'Hyper-Localized Travel Concierge (Chronological Flow)',
                'Lokalisierter Reise-Concierge (Chronologisch)',
                'Conserje de Viaje Hiperlocalizado',
                'Локализованный консьерж путешествий'
              )}
            </span>
          </span>
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 hidden sm:inline">
            {l(
              '1. Uçuş → 2. Konaklama → 3. Transfer/Taksi → 4. eSIM & Dil',
              '1. Flight → 2. Stay → 3. Transit → 4. eSIM & Language'
            )}
          </span>
        </div>

        {/* Pre-rendered 4-slot symmetrical grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 min-h-[44px]">
          {plan.stages.map((group) => {
            const p = group.primaryPartner;
            return (
              <a
                key={group.stage}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/slot relative min-h-[44px] px-3 py-2 rounded-[20px] glass-pill-control hover:border-[#2A8C82]/40 dark:hover:border-[#52B2A7]/40 transition-all flex items-center justify-between gap-2 text-left no-underline"
                title={isTr ? p.taglineTr : p.taglineEn}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-[12px] flex items-center justify-center shrink-0 ${
                      p.accentTone === 'coral'
                        ? 'bg-[#FF6B6B]/12 text-[#FF6B6B]'
                        : 'bg-[#2A8C82]/12 text-[#2A8C82] dark:text-[#52B2A7]'
                    }`}
                  >
                    {getStageIcon(group.stage, 'w-3.5 h-3.5')}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 leading-none">
                      {group.stepNumber} · {isTr ? group.titleTr.split(' ')[0] : group.titleEn.split(' ')[0]}
                    </div>
                    <div className="text-xs font-bold tracking-[-0.02em] text-slate-900 dark:text-white truncate mt-0.5">
                      {p.brand}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover/slot:text-[#2A8C82] dark:group-hover/slot:text-[#52B2A7] shrink-0 transition-colors" />
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  // ============================================================================
  // BENTO-FULL VARIANT: Complete 4-Stage Chronological Bento Grid
  // Used inside Expanded Country Card Drawer & 360° Country Dossier Modal
  // ============================================================================
  return (
    <section
      className="glass-card rounded-[24px] p-6 sm:p-7 space-y-5 leading-[1.6]"
      aria-label={`${countryDisplayName} Hyper-Localized Travel Concierge`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-white/[0.08]">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-[16px] bg-[#2A8C82]/12 text-[#2A8C82] dark:text-[#52B2A7] border border-[#2A8C82]/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold tracking-[-0.02em] text-slate-900 dark:text-white">
                {countryDisplayName}{' '}
                {l(
                  'Akıllı Seyahat Konsiyerji & Yerel Pazar Liderleri',
                  'Hyper-Localized Travel Concierge Engine',
                  'Hyper-Lokalisierter Reise-Concierge',
                  'Motor de Conserjería Hiperlocalizado',
                  'Гиперлокализованный консьерж путешествий'
                )}
              </h3>
              <span className="px-3 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#2A8C82]/12 text-[#2A8C82] dark:text-[#52B2A7] border border-[#2A8C82]/25">
                {plan.regionCluster === 'asia_pacific'
                  ? l('ASYA ALGORİTMASI AKTİF', 'ASIA LEADER PRIORITY')
                  : plan.regionCluster === 'mena'
                  ? l('MENA ALGORİTMASI AKTİF', 'MENA LEADER PRIORITY')
                  : plan.regionCluster === 'caucasus_central_asia'
                  ? l('AVRASYA ALGORİTMASI AKTİF', 'EURASIA LEADER PRIORITY')
                  : l('BÖLGESEL LİDER ALGORİTMASI', 'REGIONAL LEADER MATCHED')}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-[1.6]">
              {l(
                'Ülkede çalışmayan platformlar (örn. Güneydoğu Asya’da Uber) otomatik gizlenir; yerel pazar liderleri kronolojik seyahat sırasıyla listelenir.',
                'Non-operating platforms are automatically purged; active local market leaders are ranked in chronological travel order.',
                'Nicht verfügbare Plattformen werden ausgeblendet; lokale Marktführer sind chronologisch sortiert.'
              )}
            </p>
          </div>
        </div>

        {plan.hasRegionalRestrictionAlert && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF6B6B]/10 border border-[#FF6B6B]/25 text-[#E05252] dark:text-[#FF8E8E] text-[11px] font-bold shrink-0">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>
              {l(
                'Bölgesel Erişim Kuralı Uygulandı',
                'Regional Access Rule Applied'
              )}
            </span>
          </div>
        )}
      </div>

      {/* Pre-rendered 4-Stage Chronological Bento Grid (min-h-[260px] per column to prevent CLS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {plan.stages.map((group) => (
          <div
            key={group.stage}
            className="min-h-[268px] p-5 rounded-[24px] bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/[0.08] flex flex-col justify-between gap-4"
          >
            {/* Stage Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#2A8C82]/10 text-[#2A8C82] dark:text-[#52B2A7] border border-[#2A8C82]/20">
                  <span>STEP {group.stepNumber}</span>
                </span>
                <div className="w-8 h-8 rounded-[14px] glass-pill-control flex items-center justify-center text-[#2A8C82] dark:text-[#52B2A7]">
                  {getStageIcon(group.stage, 'w-4 h-4')}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold tracking-[-0.02em] text-slate-900 dark:text-white">
                  {isTr ? group.titleTr : group.titleEn}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-[1.6] mt-0.5">
                  {isTr ? group.subtitleTr : group.subtitleEn}
                </p>
              </div>
            </div>

            {/* Partner Action Nodes List */}
            <div className="space-y-2.5 flex-1 flex flex-col justify-end">
              {group.partners.slice(0, 3).map((partner: ConciergePartnerNode, idx: number) => {
                const isPrimary = idx === 0 && !partner.isRestrictedInRegion;
                return (
                  <div
                    key={partner.id}
                    className={`relative group/partner rounded-[20px] p-3.5 transition-all ${
                      partner.isRestrictedInRegion
                        ? 'bg-[#FF6B6B]/[0.05] dark:bg-[#FF6B6B]/[0.06] border border-[#FF6B6B]/25'
                        : isPrimary
                        ? 'bg-white dark:bg-white/[0.05] border border-[#2A8C82]/30 dark:border-[#52B2A7]/30 shadow-2xs'
                        : 'glass-pill-control hover:border-slate-300 dark:hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        {partner.id === 'preply' ? (
                          <Languages className="w-3.5 h-3.5 text-[#FF6B6B] shrink-0" />
                        ) : isPrimary ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2A8C82] dark:text-[#52B2A7] shrink-0" />
                        ) : null}
                        <span className="font-bold tracking-[-0.02em] text-xs sm:text-[13px] text-slate-900 dark:text-white truncate">
                          {partner.brand}
                        </span>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                          partner.isRestrictedInRegion
                            ? 'bg-[#FF6B6B]/15 text-[#E05252] dark:text-[#FF8E8E]'
                            : partner.accentTone === 'coral'
                            ? 'bg-[#FF6B6B]/12 text-[#E05252] dark:text-[#FF8E8E]'
                            : 'bg-[#2A8C82]/12 text-[#2A8C82] dark:text-[#52B2A7]'
                        }`}
                      >
                        {partner.isRestrictedInRegion
                          ? l('3. Öncelik · VPN/SIM', '3rd Slot · VPN/SIM')
                          : isTr
                          ? partner.badgeTr
                          : partner.badgeEn}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-[1.6] line-clamp-2">
                      {isTr ? partner.taglineTr : partner.taglineEn}
                    </p>

                    {/* Rule 2: Subtle, elegant visual tooltip for restricted brands pushed to 3rd priority slot */}
                    {partner.isRestrictedInRegion && (
                      <div
                        className="mt-2 px-3 py-1.5 rounded-[14px] bg-[#FF6B6B]/10 border border-[#FF6B6B]/20 text-[10px] font-semibold text-[#E05252] dark:text-[#FF8E8E] flex items-start gap-1.5 leading-[1.5]"
                        role="note"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#FF6B6B]" />
                        <span>
                          {isTr
                            ? partner.restrictionNoticeTr
                            : 'May require a VPN or international SIM when operating inside this region.'}
                        </span>
                      </div>
                    )}

                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-2.5 w-full min-h-[36px] px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all flex items-center justify-between gap-2 no-underline ${
                        partner.isRestrictedInRegion
                          ? 'glass-pill-control text-slate-700 dark:text-slate-200 hover:border-[#FF6B6B]/40'
                          : isPrimary
                          ? 'bg-[#2A8C82] hover:bg-[#23776E] text-white shadow-2xs'
                          : 'glass-pill-control text-slate-800 dark:text-slate-200 hover:border-[#2A8C82]/40'
                      }`}
                    >
                      <span className="truncate">{isTr ? partner.ctaTr : partner.ctaEn}</span>
                      <ExternalLink className="w-3 h-3 shrink-0 opacity-80" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
