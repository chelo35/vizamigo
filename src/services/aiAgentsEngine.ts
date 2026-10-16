/**
 * Vizamigo Autonomous AI Travel Agents Engine
 * 4 Proactive Autonomous Agents:
 * 1. Schengen & Stay Sentinel Agent (Schengen & Kalış Nöbetçisi)
 * 2. Visa-Free Deal Radar Agent (Vizesiz Rota Avcısı)
 * 3. Itinerary Architect Agent (Kişisel Rota Mimarı)
 * 4. Trip Dossier & Packing Sentinel Agent (Seyahat Dosyası & Bavul Bekçisi)
 */

import { getCountryName, getFlag, CountryItem } from '../data/passportData';
import { getPassportItems } from '../utils/calculator';
import { getCountryInsights } from '../data/countryInsights';
import { getCountryItinerary } from '../data/countryItineraries';
import { getCountryGeography } from '../data/countryGeography';
import { getCrossRate } from '../data/currencyRates';
import { getConsularEmergencyInfo } from '../data/consularEmergencyData';
import { getCountryNomadApps } from '../data/rideAndDeliveryApps';

export interface AgentResult {
  agentId: 'schengen_sentinel' | 'visa_free_radar' | 'itinerary_architect' | 'trip_dossier';
  agentName: string;
  agentIcon: string;
  badge: string;
  summary: string;
  details: string;
  printableHtml?: string;
  suggestedActions: Array<{
    id: string;
    label: string;
    actionType: 'open_country' | 'switch_tab' | 'print_dossier' | 'copy';
    countryCode?: string;
    tabKey?: string;
    payload?: string;
  }>;
}

// ----------------------------------------------------------------------------
// 1. SCHENGEN & STAY SENTINEL AGENT
// ----------------------------------------------------------------------------
export function runSchengenSentinel(currentPassport: string, daysStayed: number = 42, language: string = 'tr'): AgentResult {
  const isTr = language === 'tr';
  const passportName = getCountryName(currentPassport, language);
  const maxDays = 90;
  const daysLeft = Math.max(0, maxDays - daysStayed);
  const windowDays = 180;
  const riskPercent = Math.round((daysStayed / maxDays) * 100);

  let riskLevel = 'safe';
  let riskTitle = isTr ? 'Güvenli Bölge' : 'Safe Zone';
  let badgeColor = 'bg-emerald-500 text-white';

  if (daysLeft <= 10) {
    riskLevel = 'critical';
    riskTitle = isTr ? '🚨 ACİL ÇIKIŞ RİSKİ' : '🚨 CRITICAL OVERSTAY RISK';
    badgeColor = 'bg-rose-600 text-white animate-pulse';
  } else if (daysLeft <= 30) {
    riskLevel = 'warning';
    riskTitle = isTr ? '⚠️ Dikkat: Sınıra Yakın' : '⚠️ Warning: Near Limit';
    badgeColor = 'bg-amber-500 text-white';
  }

  // Border-hop recommendations outside Schengen with visa-free status for traveler
  const escapeCandidates = ['ME', 'AL', 'GE', 'BA', 'RS', 'GB'];
  const passportItems = getPassportItems(currentPassport);
  const viableEscapes = escapeCandidates
    .map(code => {
      const it = passportItems.find(p => p.c === code);
      return { code, item: it };
    })
    .filter(e => e.item && (e.item.cat === 'free' || e.item.id))
    .slice(0, 3);

  const summary = isTr
    ? `🛡️ **Schengen Nöbetçisi Raporu:** 180 günlük dönemde **${daysStayed} gün** kalındı. Yasal hakkınızdan **${daysLeft} gün** kaldı (%${riskPercent} doluluk). ${riskTitle}.`
    : `🛡️ **Schengen Sentinel Report:** You have used **${daysStayed} of 90 days** in the 180-day window. **${daysLeft} days remaining** (${riskPercent}% quota used). Status: ${riskTitle}.`;

  const details = isTr
    ? `**Yasal Kural Özeti:**\n` +
      `• Schengen sınırları içinde her 180 günlük hareketli pencerede azami 90 gün kalabilirsiniz.\n` +
      `• **Kalan Güvenli Süre:** **${daysLeft} Gün**\n` +
      `• İhlal durumunda 3 ila 5 yıl Schengen giriş yasağı ve para cezası uygulanır.\n\n` +
      `**Schengen Dışı Sıfır Cezalı Sınır Atlama Rotaları:**\n` +
      viableEscapes.map(e => `• ${getFlag(e.code)} **${getCountryName(e.code, language)}:** Tamamen vizesiz kalış hakkı ile cezasız bekleme noktası.`).join('\n')
    : `**Regulatory Overview:**\n` +
      `• Maximum 90 days within any sliding 180-day window across the Schengen Area.\n` +
      `• **Safe Remaining Period:** **${daysLeft} Days**\n` +
      `• Overstaying risks immediate deportation fines and 3-5 year Schengen entry bans.\n\n` +
      `**Non-Schengen Safe Border-Hop Destinations:**\n` +
      viableEscapes.map(e => `• ${getFlag(e.code)} **${getCountryName(e.code, language)}:** Frictionless visa-free stay to reset your 90-day clock.`).join('\n');

  return {
    agentId: 'schengen_sentinel',
    agentName: isTr ? 'Schengen & Vize Nöbetçisi' : 'Schengen Stay Sentinel',
    agentIcon: '🛡️',
    badge: riskTitle,
    summary,
    details,
    suggestedActions: [
      {
        id: 'schengen-day-counter',
        label: isTr ? '📅 Gün Sayacını Tam Ekran Aç' : '📅 Open 90/180 Counter',
        actionType: 'switch_tab',
        tabKey: 'track'
      },
      ...(viableEscapes[0] ? [{
        id: `escape-${viableEscapes[0].code}`,
        label: `${getFlag(viableEscapes[0].code)} ${getCountryName(viableEscapes[0].code, language)} ${isTr ? 'Rehberini Aç' : 'Guide'}`,
        actionType: 'open_country' as const,
        countryCode: viableEscapes[0].code
      }] : [])
    ]
  };
}

// ----------------------------------------------------------------------------
// 2. VISA-FREE DEAL RADAR AGENT
// ----------------------------------------------------------------------------
export function runVisaFreeRadar(currentPassport: string, language: string = 'tr'): AgentResult {
  const isTr = language === 'tr';
  const passportName = getCountryName(currentPassport, language);
  const passportItems = getPassportItems(currentPassport);

  // Filter completely visa-free or biometric ID countries
  const visaFreeCountries = passportItems
    .filter((it: CountryItem) => it.c !== currentPassport && (it.cat === 'free' || it.id))
    .map(it => {
      const insights = getCountryInsights(it.c, language);
      const geo = getCountryGeography(it.c, language);
      const safetyScore = insights?.safety?.safetyScore || 75;
      const speed = insights?.internet?.mobileSpeedMbps || 50;
      return {
        code: it.c,
        stay: it.v,
        withID: !!it.id,
        safetyScore,
        speed,
        currency: geo?.currencyCode || 'USD',
        symbol: geo?.currencySymbol || '$',
        score: safetyScore * 0.6 + Math.min(speed, 100) * 0.4
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const topPick = visaFreeCountries[0];
  const summary = isTr
    ? `🛰️ **Vizesiz Fırsat Radarı:** ${passportName} pasaportu için **${passportItems.filter((i: CountryItem) => i.cat === 'free' || i.id).length} vizesiz ülke** tarandı. En yüksek güvenlik, internet hızı ve ekonomik avantaja sahip **5 rota** belirlendi.`
    : `🛰️ **Visa-Free Radar:** Scanned **${passportItems.filter((i: CountryItem) => i.cat === 'free' || i.id).length} visa-free countries** for ${passportName} passport. Identified the **top 5 frictionless travel destinations**.`;

  const details = isTr
    ? `**Öne Çıkan En İyi 5 Vizesiz Seyahat Rotası:**\n\n` +
      visaFreeCountries.map((c, i) => {
        const rate = getCrossRate('USD', c.currency).toFixed(1);
        return `**${i + 1}. ${getFlag(c.code)} ${getCountryName(c.code, language)}**\n` +
               `• **Kalış Süresi:** ${c.stay} gün vizesiz${c.withID ? ' (Çipli Kimlikle Giriş!)' : ''}\n` +
               `• **Güvenlik / İnternet:** ${c.safetyScore}/100 Güvenlik | ~${c.speed} Mbps\n` +
               `• **Döviz Kuru:** 1 USD = ${rate} ${c.symbol} (${c.currency})`;
      }).join('\n\n')
    : `**Top 5 Curated Visa-Free Destinations:**\n\n` +
      visaFreeCountries.map((c, i) => {
        const rate = getCrossRate('USD', c.currency).toFixed(1);
        return `**${i + 1}. ${getFlag(c.code)} ${getCountryName(c.code, language)}**\n` +
               `• **Stay Duration:** ${c.stay} days visa-free${c.withID ? ' (ID card allowed!)' : ''}\n` +
               `• **Safety / Mobile Speed:** ${c.safetyScore}/100 | ~${c.speed} Mbps\n` +
               `• **Live FX:** 1 USD = ${rate} ${c.symbol} (${c.currency})`;
      }).join('\n\n');

  return {
    agentId: 'visa_free_radar',
    agentName: isTr ? 'Vizesiz Rota Avcısı' : 'Visa-Free Deal Radar',
    agentIcon: '🛰️',
    badge: `${visaFreeCountries.length} ${isTr ? 'Sıfır Vize Rota' : 'Zero-Visa Deals'}`,
    summary,
    details,
    suggestedActions: [
      {
        id: `radar-open-${topPick?.code || 'TH'}`,
        label: `${getFlag(topPick?.code || 'TH')} ${getCountryName(topPick?.code || 'TH', language)} ${isTr ? 'Dosyasını Aç' : 'Dossier'}`,
        actionType: 'open_country',
        countryCode: topPick?.code || 'TH'
      },
      {
        id: 'radar-open-tab',
        label: isTr ? '🧭 Tüm Vizesiz Ülkeleri Listele' : '🧭 Explore All Free Countries',
        actionType: 'switch_tab',
        tabKey: 'where_can_i_go'
      }
    ]
  };
}

// ----------------------------------------------------------------------------
// 3. ITINERARY ARCHITECT AGENT
// ----------------------------------------------------------------------------
export function runItineraryArchitect(destinationCountry: string = 'TH', currentPassport: string = 'TR', language: string = 'tr'): AgentResult {
  const isTr = language === 'tr';
  const cCode = destinationCountry.toUpperCase();
  const cName = getCountryName(cCode, language);
  const flag = getFlag(cCode);
  const itinerary = getCountryItinerary(cCode, language);
  const geo = getCountryGeography(cCode, language);
  const insights = getCountryInsights(cCode, language);
  const rawApps = getCountryNomadApps(cCode, insights?.transport?.popularRideApps) || [];
  const rideApps = Array.isArray(rawApps) ? rawApps.filter(a => a.category === 'ride' || a.category === 'both') : [];
  const recommendedTaxiText = rideApps.length > 0
    ? rideApps.map(a => a.name).join(', ')
    : rawApps.length > 0
      ? rawApps.slice(0, 3).map(a => a.name).join(', ')
      : isTr ? 'Yerel Taksi & Metro' : 'Local Taxi & Metro';

  const currencyCode = geo?.currencyCode || 'USD';
  const currencySymbol = geo?.currencySymbol || '$';
  const dailyBudgetEst = Math.round(45 * getCrossRate('USD', currencyCode));

  const stops = itinerary?.stops || [
    { name: `${cName} Historic Capital`, recommendedDuration: '2 Days', highlights: ['City Center', 'Museums', 'Local Food Market'] },
    { name: `${cName} Nature & Coast`, recommendedDuration: '2 Days', highlights: ['National Park', 'Scenic Viewpoints', 'Old Bazaar'] }
  ];

  const summary = isTr
    ? `🧭 **Kişisel Rota Mimarı:** ${flag} **${cName}** için akıllı rota oluşturuldu: **"${itinerary?.routeName || cName + ' Rotası'}"** (${stops.length} ana durak, optimize edilmiş ulaşım ve bütçe planı).`
    : `🧭 **Itinerary Architect:** Smart itinerary generated for ${flag} **${cName}**: **"${itinerary?.routeName || cName + ' Route'}"** (${stops.length} major hubs with transport and budget estimates).`;

  const details = isTr
    ? `**Gün Gün Optimize Gezi Planı:**\n\n` +
      stops.map((s, idx) => `**Durak ${idx + 1}: ${s.name} (${s.recommendedDuration})**\n• *Öne Çıkanlar:* ${s.highlights.join(' · ')}`).join('\n\n') +
      `\n\n**Ulaşım & Yerel Uygulamalar:**\n` +
      `• **Önerilen Taksi/Ulaşım:** ${recommendedTaxiText}\n` +
      `• **Günlük Tahmini Bütçe:** ~${dailyBudgetEst} ${currencySymbol} / gün (Ekonomik konaklama & yemek dahil)`
    : `**Day-by-Day Optimized Travel Plan:**\n\n` +
      stops.map((s, idx) => `**Stop ${idx + 1}: ${s.name} (${s.recommendedDuration})**\n• *Highlights:* ${s.highlights.join(' · ')}`).join('\n\n') +
      `\n\n**Transport & Mobility Apps:**\n` +
      `• **Recommended Taxi/Ride-Hailing:** ${recommendedTaxiText}\n` +
      `• **Estimated Daily Budget:** ~$45 / day (~${dailyBudgetEst} ${currencySymbol})`;

  return {
    agentId: 'itinerary_architect',
    agentName: isTr ? 'Kişisel Rota Mimarı' : 'Itinerary Architect',
    agentIcon: '🧭',
    badge: `${stops.length} ${isTr ? 'Duraklı Rota' : 'Stops'}`,
    summary,
    details,
    suggestedActions: [
      {
        id: `itinerary-dossier-${cCode}`,
        label: `${flag} ${isTr ? '360° Ülke Rehberini Aç' : 'Open 360° Dossier'}`,
        actionType: 'open_country',
        countryCode: cCode
      },
      {
        id: 'itinerary-route-planner',
        label: isTr ? '🗺️ Rota Planlayıcıyı Aç' : '🗺️ Open Route Planner',
        actionType: 'switch_tab',
        tabKey: 'plan'
      }
    ]
  };
}

// ----------------------------------------------------------------------------
// 4. TRIP DOSSIER & PACKING SENTINEL AGENT
// ----------------------------------------------------------------------------
export function runTripDossierAgent(destinationCountry: string = 'TH', currentPassport: string = 'TR', language: string = 'tr'): AgentResult {
  const isTr = language === 'tr';
  const cCode = destinationCountry.toUpperCase();
  const cName = getCountryName(cCode, language);
  const passportName = getCountryName(currentPassport, language);
  const flag = getFlag(cCode);
  const passportItems = getPassportItems(currentPassport);
  const item = passportItems.find((i: CountryItem) => i.c === cCode) || { c: cCode, v: 'v', cat: 'visa' as const };
  const geo = getCountryGeography(cCode, language);
  const insights = getCountryInsights(cCode, language);
  const consular = getConsularEmergencyInfo(currentPassport, language);

  const homeGeo = getCountryGeography(currentPassport, language);
  const homePlugs = (homeGeo?.plugTypes || 'C, F').split('(')[0].split(',').map((p: string) => p.trim()).filter(Boolean);
  const destPlugs = (geo?.plugTypes || 'C, F').split('(')[0].split(',').map((p: string) => p.trim()).filter(Boolean);
  const isPlugMatch = destPlugs.some((p: string) => homePlugs.includes(p));

  const summary = isTr
    ? `🧳 **Seyahat Dosyası Hazır:** ${flag} **${cName}** için vize şartları, diplomatik acil durum hattı, priz uyumu ve resmi gümrük özet belgeniz oluşturuldu.`
    : `🧳 **Trip Dossier Ready:** Official consular, socket, visa, and emergency brief generated for ${flag} **${cName}**.`;

  const details = isTr
    ? `**Konsolosluk & Giriş Güvenlik Özeti:**\n` +
      `• **Vize Rejimi:** ${item.cat === 'free' ? '✅ Vizesiz Giriş' : item.cat === 'evisa' ? '💻 Online e-Vize' : '🛂 Diplomatik Vize'} (${item.v} gün)\n` +
      `• **Priz & Donanım:** Tip ${destPlugs.join(', ')} (${isPlugMatch ? `✓ ${passportName} fişinizle uyumlu` : '⚠️ Evrensel seyahat adaptörü gerekli!'})\n` +
      `• **24/7 Dış Temsilcilik Kriz Hattı:** ${consular.hotline247} (${consular.ministryName.tr})\n` +
      `• **Yerel Acil Hat:** Polis ${insights?.safety?.emergencyNumbers?.police || '112'} | Ambulans ${insights?.safety?.emergencyNumbers?.ambulance || '112'}\n` +
      `• **Para Birimi:** 1 USD = ${getCrossRate('USD', geo.currencyCode).toFixed(2)} ${geo.currencyCode} (${geo.currencySymbol})`
    : `**Consular & Border Entry Brief:**\n` +
      `• **Visa Regime:** ${item.cat === 'free' ? '✅ Visa-Free Access' : item.cat === 'evisa' ? '💻 eVisa Required' : '🛂 Embassy Visa'} (${item.v} days)\n` +
      `• **Electrical Plug:** Type ${destPlugs.join(', ')} (${isPlugMatch ? `✓ Compatible with your ${passportName} plugs` : '⚠️ Universal plug adapter needed!'})\n` +
      `• **24/7 Diplomatic Support:** ${consular.hotline247} (${consular.ministryName.en})\n` +
      `• **Emergency Police:** ${insights?.safety?.emergencyNumbers?.police || '112'}\n` +
      `• **Local Currency:** 1 USD = ${getCrossRate('USD', geo.currencyCode).toFixed(2)} ${geo.currencyCode} (${geo.currencySymbol})`;

  const printableHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Vizamigo Seyahat Dosyası - ${cName}</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; padding: 32px; color: #0f172a; line-height: 1.5; }
          .header { border-bottom: 2px solid #0d9488; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
          .title { font-size: 24px; font-weight: 900; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
          .card { padding: 16px; border: 1px solid #cbd5e1; border-radius: 12px; background: #f8fafc; }
          .card-title { font-size: 12px; font-weight: 800; color: #0d9488; text-transform: uppercase; margin-bottom: 6px; }
          .card-value { font-size: 16px; font-weight: 800; }
          .sos-box { padding: 16px; background: #fef2f2; border: 2px solid #ef4444; border-radius: 12px; margin-bottom: 24px; }
          .footer { font-size: 11px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 16px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="title">✈️ Vizamigo Seyahat Dosyası & Gümrük Brifingi</div>
            <div>${flag} ${cName} | Gezgin Pasaportu: ${passportName} (${currentPassport})</div>
          </div>
          <div><strong>Tarih:</strong> ${new Date().toLocaleDateString()}</div>
        </div>

        <div class="grid">
          <div class="card">
            <div class="card-title">Vize Şartı & Kalış Süresi</div>
            <div class="card-value">${item.cat === 'free' ? 'Vizesiz' : item.cat === 'evisa' ? 'e-Vize' : 'Vize Gerekli'} (${item.v} Gün)</div>
          </div>
          <div class="card">
            <div class="card-title">Priz & Elektrik Standardı</div>
            <div class="card-value">Tip ${destPlugs.join(', ')} (${isPlugMatch ? 'Uyumlu' : 'Adaptör Gerekir'})</div>
          </div>
          <div class="card">
            <div class="card-title">Para Birimi & Canlı Kur</div>
            <div class="card-value">1 USD = ${getCrossRate('USD', geo.currencyCode).toFixed(2)} ${geo.currencyCode} (${geo.currencySymbol})</div>
          </div>
          <div class="card">
            <div class="card-title">Güvenlik & İnternet Skoru</div>
            <div class="card-value">${insights?.safety?.safetyScore || 80}/100 Güvenlik | ~${insights?.internet?.mobileSpeedMbps || 50} Mbps</div>
          </div>
        </div>

        <div class="sos-box">
          <div style="font-weight:900; color:#b91c1c; font-size:15px; margin-bottom:6px;">🚨 ACİL DURUM & DİPLOMATİK DESTEK</div>
          <div><strong>24/7 Konsolosluk Hattı:</strong> ${consular.hotline247} (${consular.ministryName.tr})</div>
          <div><strong>Yerel Polis İmdat:</strong> ${insights?.safety?.emergencyNumbers?.police || '112'} | <strong>Ambulans:</strong> ${insights?.safety?.emergencyNumbers?.ambulance || '112'}</div>
        </div>

        <div class="footer">
          Vizamigo Global Mobility Intelligence · 199 Ülke Doğrulanmış Vize & Seyahat Sistemi · vizamigo.com
        </div>
      </body>
    </html>
  `;

  return {
    agentId: 'trip_dossier',
    agentName: isTr ? 'Seyahat Dosyası Bekçisi' : 'Trip Dossier Sentinel',
    agentIcon: '🧳',
    badge: isTr ? 'PDF Hazır' : 'Print Ready',
    summary,
    details,
    printableHtml,
    suggestedActions: [
      {
        id: `print-dossier-${cCode}`,
        label: isTr ? '📄 Seyahat Dosyasını Yazdır / PDF Kaydet' : '📄 Print / Save PDF Dossier',
        actionType: 'print_dossier',
        payload: printableHtml
      },
      {
        id: `dossier-packing-${cCode}`,
        label: isTr ? '🧳 Akıllı Bavul Listesini Aç' : '🧳 Open Packing List',
        actionType: 'switch_tab',
        tabKey: 'packing'
      }
    ]
  };
}
