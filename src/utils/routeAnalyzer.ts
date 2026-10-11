import { D, SCHENGEN_SET } from '../data/passportData';
import { dateToDayIndex, computeRouteSchengenTotal, TripRecord } from './calculator';

export interface RouteStopInput {
  countryCode: string;
  entryDate: string; // YYYY-MM-DD
  exitDate: string;  // YYYY-MM-DD
}

export interface RouteAnalysisRequest {
  passport: string;
  secondaryPassport?: string;
  targetLanguage?: string;
  routeStops: RouteStopInput[];
  existingTrips?: TripRecord[];
}

export interface LocalizedTextMap {
  tr: string;
  en: string;
  de: string;
  fr: string;
  [lang: string]: string;
}

export interface TaxResidencyAlertOutput {
  countryCode: string;
  status: 'safe' | 'warning' | 'danger' | 'exceeded';
  localizedAlert: LocalizedTextMap;
}

export interface StopSpecificWarningOutput {
  countryCode: string;
  visaCategory: string;
  badgeLabel: LocalizedTextMap;
  smartInsight: LocalizedTextMap;
}

export interface RouteAnalysisResponse {
  routeAnalysis: {
    totalStops: number;
    isSchengenOverstayRisk: boolean;
    taxResidencyAlerts: TaxResidencyAlertOutput[];
  };
  stopSpecificWarnings: StopSpecificWarningOutput[];
}

/**
 * Universal Localization Router & Route Analyzer
 * Evaluates multi-country travel itineraries against visa policies, Schengen rolling limits,
 * upcoming geopolitical amendments (Montenegro Nov 1 2026, Thailand Sept 15 2026),
 * and tax residency thresholds (183-day rule).
 */
export function processRouteAnalysis(req: RouteAnalysisRequest): RouteAnalysisResponse {
  const { passport = 'TR', routeStops = [], existingTrips = [] } = req;
  const targetLang = req.targetLanguage || 'tr';

  // 1. Calculate Schengen total & overstay risk
  const dummyStops = routeStops.map((s, idx) => ({
    id: `stop-${idx}`,
    countryCode: s.countryCode,
    entryDate: s.entryDate,
    exitDate: s.exitDate
  }));
  const schCalculations = computeRouteSchengenTotal(dummyStops, existingTrips);

  // 2. Tax residency calculations (183-day rule across route + trips)
  const countryDayCounts: Record<string, number> = {};
  for (const stop of routeStops) {
    const inIdx = dateToDayIndex(stop.entryDate);
    const outIdx = dateToDayIndex(stop.exitDate);
    const days = Math.max(0, outIdx - inIdx + 1);
    countryDayCounts[stop.countryCode] = (countryDayCounts[stop.countryCode] || 0) + days;
  }
  for (const trip of existingTrips) {
    if (trip.countryCode) {
      const days = Math.max(0, trip.end - trip.start + 1);
      countryDayCounts[trip.countryCode] = (countryDayCounts[trip.countryCode] || 0) + days;
    }
  }

  const taxResidencyAlerts: TaxResidencyAlertOutput[] = [];
  // Evaluate unique countries in route
  const uniqueRouteCountries = Array.from(new Set(routeStops.map(s => s.countryCode)));

  for (const cCode of uniqueRouteCountries) {
    const daysSpent = countryDayCounts[cCode] || 0;
    let status: 'safe' | 'warning' | 'danger' | 'exceeded' = 'safe';
    if (daysSpent >= 183) status = 'exceeded';
    else if (daysSpent >= 150) status = 'danger';
    else if (daysSpent >= 120) status = 'warning';

    const localizedAlert: LocalizedTextMap = {
      tr: status === 'safe'
        ? 'Vergi mukimliği için güvenli bölgedesiniz.'
        : status === 'warning'
        ? `Vergi mukimliği uyarısı: Bu ülkede ${daysSpent} gün geçiriyorsunuz (183 gün sınırına yaklaşıyorsunuz).`
        : `DİKKAT: Vergi mukimliği riski! ${daysSpent} gün kalış planlandı.`,
      en: status === 'safe'
        ? 'You are in the safe zone for tax residency.'
        : status === 'warning'
        ? `Tax residency warning: You are spending ${daysSpent} days in this country (approaching 183-day limit).`
        : `WARNING: Tax residency risk! ${daysSpent} days stay planned.`,
      de: status === 'safe'
        ? 'Sie befinden sich in der sicheren Zone für steuerlichen Wohnsitz.'
        : status === 'warning'
        ? `Warnung zum steuerlichen Wohnsitz: Sie verbringen ${daysSpent} Tage in diesem Land.`
        : `ACHTUNG: Risiko des steuerlichen Wohnsitzes! ${daysSpent} Tage Aufenthalt geplant.`,
      fr: status === 'safe'
        ? 'Vous êtes dans la zone de sécurité pour la résidence fiscale.'
        : status === 'warning'
        ? `Avertissement de résidence fiscale: vous passez ${daysSpent} jours dans ce pays.`
        : `ATTENTION: Risque de résidence fiscale! ${daysSpent} jours prévus.`
    };

    // Include target language if specified
    if (!localizedAlert[targetLang]) {
      localizedAlert[targetLang] = localizedAlert.en;
    }

    taxResidencyAlerts.push({
      countryCode: cCode,
      status,
      localizedAlert
    });
  }

  // 3. Stop-specific warnings and smart insights
  const stopSpecificWarnings: StopSpecificWarningOutput[] = [];

  for (const stop of routeStops) {
    const inIdx = dateToDayIndex(stop.entryDate);
    const outIdx = dateToDayIndex(stop.exitDate);
    const days = Math.max(0, outIdx - inIdx + 1);

    // Check Montenegro (ME) Turkish passport rule change
    if (passport === 'TR' && stop.countryCode === 'ME') {
      const meCutoff = dateToDayIndex('2026-11-01');
      if (outIdx >= meCutoff) {
        stopSpecificWarnings.push({
          countryCode: 'ME',
          visaCategory: 'visa',
          badgeLabel: {
            tr: 'Konsolosluk Vizesi Gerekli',
            en: 'Consular Visa Required',
            de: 'Konsularvisum Erforderlich',
            fr: 'Visa Consulaire Requis'
          },
          smartInsight: {
            tr: 'DİKKAT: Karadağ, 1 Kasım 2026 itibarıyla Türk vatandaşlarına vize zorunluluğu getirdi. Seyahatiniz bu tarihten sonradır.',
            en: 'NOTICE: Montenegro introduces visa requirements for Turkish passport holders starting Nov 1, 2026. Your travel is after this date.',
            de: 'HINWEIS: Montenegro führt ab dem 1. November 2026 eine Visumpflicht für türkische Staatsbürger ein. Ihre Reise liegt nach diesem Datum.',
            fr: 'AVIS: Le Monténégro introduit des exigences de visa pour les ressortissants turcs à partir du 1er nov. 2026. Votre voyage est après cette date.'
          }
        });
        continue;
      }
    }

    // Check Thailand (TH) TDAC and 30-day rule change
    if (passport === 'TR' && stop.countryCode === 'TH') {
      const thCutoff = dateToDayIndex('2026-09-15');
      if (outIdx >= thCutoff || days > 30) {
        stopSpecificWarnings.push({
          countryCode: 'TH',
          visaCategory: days > 30 ? 'visa' : 'free',
          badgeLabel: {
            tr: days > 30 ? 'Vize Gerekli (>30 Gün)' : '30 Gün Vizesiz (TDAC)',
            en: days > 30 ? 'Visa Required (>30 Days)' : '30 Days Visa-Free (TDAC)',
            de: days > 30 ? 'Visumpflicht (>30 Tage)' : '30 Tage Visumfrei (TDAC)',
            fr: days > 30 ? 'Visa Requis (>30 Jours)' : '30 Jours Sans Visa (TDAC)'
          },
          smartInsight: {
            tr: 'DİKKAT: Tayland, 15 Eylül 2026 düzenlemesiyle TDAC dijital varış kartı üzerinden vizesiz kalışı 30 günle sınırlandırmıştır.',
            en: 'NOTICE: Thailand limits visa-free stays to 30 days via TDAC digital arrival cards (September 15, 2026 regulation).',
            de: 'HINWEIS: Thailand begrenzt den visumfreien Aufenthalt auf 30 Tage mittels TDAC digitaler Einreisekarte (Regelung vom 15. September 2026).',
            fr: "AVIS: La Thaïlande limite les séjours sans visa à 30 jours via les cartes d'arrivée numériques TDAC (règlement du 15 septembre 2026)."
          }
        });
        continue;
      }
    }

    // Check Schengen countries
    if (SCHENGEN_SET.has(stop.countryCode) && passport === 'TR') {
      const trRegimes = D[passport] || {};
      const isFree = (trRegimes['90'] || '').split(' ').includes(stop.countryCode);
      if (!isFree) {
        stopSpecificWarnings.push({
          countryCode: stop.countryCode,
          visaCategory: 'visa',
          badgeLabel: {
            tr: 'Schengen Vizesi Gerekli',
            en: 'Schengen Visa Required',
            de: 'Schengen-Visum Erforderlich',
            fr: 'Visa Schengen Requis'
          },
          smartInsight: {
            tr: 'Bu durak Schengen alanındadır. Bordo pasaport ile seyahat için geçerli C Tipi Schengen Vizesi zorunludur.',
            en: 'This destination is in the Schengen Area. A valid Category C Schengen Visa is mandatory for ordinary passport holders.',
            de: 'Dieses Reiseziel liegt im Schengen-Raum. Ein gültiges Schengen-Visum der Kategorie C ist erforderlich.',
            fr: 'Cette destination est dans l’espace Schengen. Un visa Schengen valide de catégorie C est obligatoire.'
          }
        });
      }
    }
  }

  return {
    routeAnalysis: {
      totalStops: routeStops.length,
      isSchengenOverstayRisk: schCalculations.exceedsLimit,
      taxResidencyAlerts
    },
    stopSpecificWarnings
  };
}
