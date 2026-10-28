import React, { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../data/i18n';
import { Icon } from './Icon';
import { Btn, Bullets, Card, Flag, LinkBtn, List, Row, SecHead, Stat, Tags, Tile, TileGrid, VisaBadge, visaTone, Empty, fmtNum, fmtPair } from './ui';
import { stayDays } from './country';
import type { SupportedLanguage } from '../i18n/types';
import { getPassportItems, dateToDayIndex, dayIndexToDate, getTodayDayIndex } from '../utils/calculator';
import { getStayDurationText, generateDirectAnswerSnippet, getCountryNaturalH1 } from '../utils/schemaGenerator';
import { CountryCard } from './country';
import { countryToRegion } from '../data/passportData';
import { WORLD_DOTS, WORLD_W, WORLD_H, project } from './worldDots';
import { getCountryName, INFO, getLocalizedPartner, AFFILIATE_PARTNERS } from '../data/passportData';
import { getCountryVisual, getOptimizedImageUrl } from '../data/countryVisuals';
import { GEO_DATA } from '../data/geoData';
import { getCountryInsights } from '../data/countryInsights';
import { getCountryTravelIntelligence } from '../data/countryTravelIntelligence';
import { getCountryEncyclopedia } from '../data/countryEncyclopedia';
import { getCountryGeography, GLOBAL_CURRENCIES } from '../data/countryGeography';
import { getCountryItinerary } from '../data/countryItineraries';
import { getVerifiedCountryRecord } from '../data/verifiedCountryData';
import { getCountryNomadApps } from '../data/rideAndDeliveryApps';
import { getConsularEmergencyInfo } from '../data/consularEmergencyData';
import { getCountryConciergePlan } from '../data/travelConciergeEngine';
import { ALL_WORLD_HUBS, flagToIso } from '../data/worldHubs';
import { getCrossRate, USD_RATES } from '../data/currencyRates';
import { useLiveFx, useLiveWeather, liveWeatherKey, weatherCodeInfo } from '../utils/liveData';
import { loadStoredRouteStops, saveStoredRouteStops } from '../utils/storage';

interface Props {
  onOpenCountry: (c: string) => void;
  code: string;
  passport: string;
  onBack: () => void;
  onReport: (code: string, name: string) => void;
  onOpenRoute: () => void;
  onOpenSos: () => void;
}

type L3 = { tr: string; en: string; de: string };
const pick3 = (o: L3 | undefined, lang: string) => (o ? (lang === 'tr' ? o.tr : lang === 'de' ? o.de || o.en : o.en || o.tr) : '');

function useCountryTimeTz(code: string) {
  const geo = GEO_DATA[code];
  return useMemo(() => {
    const hubs = ALL_WORLD_HUBS.filter((h) => (h.iso || flagToIso(h.flag)) === code);
    const hub = hubs.find((h) => geo && (h.city === geo.capital || h.cityTr === geo.capital)) || hubs[0];
    return hub?.tz || null;
  }, [code, geo]);
}

export const CountryPage: React.FC<Props> = ({ code, passport, onBack, onReport, onOpenRoute, onOpenSos, onOpenCountry }) => {
  const { l, language } = useI18n();
  useLiveFx();
  const name = getCountryName(code, language);
  const item = useMemo(() => getPassportItems(passport).find((x) => x.c === code) || null, [passport, code]);
  const visual = getCountryVisual(code, language);
  const geo = GEO_DATA[code];
  const insights = useMemo(() => getCountryInsights(code, language), [code, language]);
  const intel = useMemo(() => getCountryTravelIntelligence(code, getCountryName(code, 'en')), [code]);
  const enc = useMemo(() => getCountryEncyclopedia(code, language), [code, language]);
  const geog = useMemo(() => getCountryGeography(code, language), [code, language]);
  const itin = useMemo(() => getCountryItinerary(code, language), [code, language]);
  const verified = useMemo(() => getVerifiedCountryRecord(code), [code]);
  const detail = INFO[`${passport}-${code}`];
  const apps = useMemo(() => getCountryNomadApps(code, insights.transport.popularRideApps || []), [code, insights]);
  const consular = useMemo(() => getConsularEmergencyInfo(passport, language), [passport, language]);
  const concierge = useMemo(() => getCountryConciergePlan(code, passport), [code, passport]);
  const tz = useCountryTimeTz(code);
  const tr = language === 'tr';
  const days = stayDays(item);

  // canlı saat
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  const timeStr = tz ? new Intl.DateTimeFormat(language === 'en' ? 'en-GB' : language, { timeZone: tz, hour: '2-digit', minute: '2-digit' }).format(now) : '—';

  // canlı hava
  const coords = useMemo(() => (geo ? [{ lat: geo.lat, lng: geo.lng }] : []), [geo]);
  const wx = useLiveWeather(coords);
  const w = geo ? wx[liveWeatherKey(geo.lat, geo.lng)] : undefined;
  const wInfo = w ? (weatherCodeInfo(w.code, w.isDay) as unknown as Record<string, string>) : null;

  // kur
  const homeCur = GLOBAL_CURRENCIES[passport]?.code || 'USD';
  const destCur = GLOBAL_CURRENCIES[code]?.code || geog.currencyCode || 'USD';
  const rate = USD_RATES[homeCur] && USD_RATES[destCur] ? getCrossRate(homeCur, destCur) : 0;
  const rateStr = rate ? fmtNum(rate, language, rate >= 100 ? 0 : rate >= 10 ? 1 : 2) : '—';

  // eylemler
  const [added, setAdded] = useState(false);
  const addToRoute = () => {
    try {
      const stops = loadStoredRouteStops().filter((x) => x.entryDate && x.exitDate);
      if (!stops.some((x) => x.countryCode === code)) {
        const last = stops.reduce((m, x) => (x.exitDate > m ? x.exitDate : m), '');
        const start = last ? dateToDayIndex(last) + 1 : getTodayDayIndex() + 21;
        const n = Math.min(days || 7, 7);
        stops.push({ id: `stop-${Date.now()}`, countryCode: code, entryDate: dayIndexToDate(start), exitDate: dayIndexToDate(start + n - 1) });
        saveStoredRouteStops(stops);
      }
      setAdded(true);
    } catch {}
  };
  const setDest = () => {
    try {
      localStorage.setItem('vz_destination_v1', code);
    } catch {}
  };
  useEffect(setDest, [code]); // ülke sayfasına girilen ülke ana sayfadaki hedef olur
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: `${name} · Vizamigo`, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {}
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [code]);

  const note = detail ? (language === 'tr' ? detail.n : language === 'de' ? detail.nDe || detail.nEn || detail.n : detail.nEn || detail.n) : '';
  const emergency = {
    police: verified?.emergency.police.value || insights.safety.emergencyNumbers.police,
    ambulance: verified?.emergency.ambulance.value || insights.safety.emergencyNumbers.ambulance,
    fire: verified?.emergency.fire.value || '',
    general: verified?.emergency.general.value || insights.safety.emergencyNumbers.general,
    tourist: verified?.emergency.tourist_police.value || ''
  };
  const scams = [...(insights.safety.commonScams || []), ...intel.touristScams.map((s) => `${s.title}: ${s.desc}`)];

  const NumRow: React.FC<{ label: string; num?: string | null; icon: string }> = ({ label, num, icon }) =>
    num ? <Row icon={icon} title={label} right={<a className="vz-btn vz-btn-soft sm" href={`tel:${num.replace(/[^\d+]/g, '')}`}>{num}</a>} /> : null;

  const tiles: Tile[] = [
    {
      id: 'visa', icon: 'shield',
      title: l('Vize & güvenlik', 'Visa & safety', 'Visum & Sicherheit', 'Visado y seguridad', 'Виза и безопасность'),
      desc: l('Giriş kuralı, riskler, sağlık', 'Entry rule, risks, health', 'Einreise, Risiken, Gesundheit', 'Entrada, riesgos, salud', 'Въезд, риски, здоровье'),
      badge: days ? l(`${days} gün`, `${days} days`, `${days} Tage`, `${days} días`, `${days} дн.`) : undefined,
      tabs: [
        {
          id: 'entry', label: l('Giriş kuralı', 'Entry rule', 'Einreise', 'Entrada', 'Въезд'),
          render: () => (
            <div className="vz-stack">
              <Card tone={visaTone(item) === 'warn' ? 'warn' : visaTone(item) === 'ok' ? 'ok' : 'sea'}>
                <div className="vz-row-flex"><VisaBadge item={item} big />{days && <b>{l(`${days} güne kadar kalış`, `Stay up to ${days} days`, `Bis zu ${days} Tage`, `Hasta ${days} días`, `До ${days} дней`)}</b>}</div>
                {note ? <p>{note}</p> : <p>{l(`${getCountryName(passport, language)} pasaportuyla ${name} için giriş türü yukarıdaki gibidir. Yola çıkmadan önce resmî kaynaktan son durumu kontrol et.`, `This is the entry type for ${name} with a ${getCountryName(passport, 'en')} passport. Check the official source before you travel.`, `Einreiseart für ${name}. Vor der Reise offizielle Quelle prüfen.`, `Tipo de entrada para ${name}. Verifica la fuente oficial antes de viajar.`, `Тип въезда в ${name}. Проверьте официальный источник.`)}</p>}
                {detail?.u && (
                  <div className="vz-row-flex">
                    <LinkBtn href={detail.u} small>{detail.h || l('Resmî kaynak', 'Official source', 'Offizielle Quelle', 'Fuente oficial', 'Источник')}</LinkBtn>
                    {detail.d && <span className="vz-muted" style={{ fontSize: 12.5 }}>{l('Doğrulama', 'Checked', 'Geprüft', 'Verificado', 'Проверено')}: {detail.d}</span>}
                  </div>
                )}
              </Card>
              <div className="vz-actions">
                <Btn variant="ghost" small icon="flag" onClick={() => onReport(code, name)}>{l('Bu bilgi yanlış mı? Bildir', 'Wrong info? Report it', 'Falsch? Melden', '¿Error? Repórtalo', 'Ошибка? Сообщите')}</Btn>
              </div>
            </div>
          )
        },
        {
          id: 'safety', label: l('Güvenlik', 'Safety', 'Sicherheit', 'Seguridad', 'Безопасность'),
          render: () => (
            <div className="vz-stack">
              <div className="vz-stats">
                <Stat value={`${insights.safety.safetyScore}/100`} label={insights.safety.safetyLevel} icon="shield" tone={insights.safety.safetyScore >= 70 ? 'ok' : insights.safety.safetyScore >= 45 ? 'sun' : 'warn'} />
                {verified?.advisory.combined_level != null && <Stat value={`${verified.advisory.combined_level}/4`} label={l('Resmî seyahat uyarı seviyesi', 'Official advisory level', 'Reisewarnstufe', 'Nivel de alerta', 'Уровень предупреждения')} icon="alert" tone={verified.advisory.combined_level >= 3 ? 'warn' : 'sea'} />}
              </div>
              {verified?.advisory.advisory_headline && <div className="vz-note"><Icon name="info" size={18} duo={false} />{(verified.advisory.advisory_headline as Record<string, string>)[language] || verified.advisory.advisory_headline.en}</div>}
              <p>{insights.safety.crimeRateSummary}</p>
              {verified && verified.advisory.regional_warnings.length > 0 && (
                <Card title={l('Dikkat edilecek bölgeler', 'Areas to avoid', 'Gebiete meiden', 'Zonas a evitar', 'Опасные районы')} icon="alert" tone="warn">
                  <Bullets tone="warn" items={verified.advisory.regional_warnings.map((r) => `${r.area}: ${r.reason}`)} />
                </Card>
              )}
              {scams.length > 0 && <Card title={l('Bilinen dolandırıcılıklar', 'Known scams', 'Bekannte Maschen', 'Estafas comunes', 'Мошенничество')} icon="alert"><Bullets tone="warn" items={scams.slice(0, 8)} /></Card>}
              {insights.safety.safeTravelTips?.length > 0 && <Card title={l('Güvende kalmak için', 'Staying safe', 'Sicher bleiben', 'Para estar seguro', 'Как не рисковать')} icon="check"><Bullets tone="ok" items={insights.safety.safeTravelTips} /></Card>}
            </div>
          )
        },
        {
          id: 'health', label: l('Sağlık', 'Health', 'Gesundheit', 'Salud', 'Здоровье'),
          render: () => (
            <div className="vz-stack">
              <div className="vz-stats">
                <Stat value={intel.waterAndHealth.tapWaterSafe ? l('İçilir', 'Safe', 'Trinkbar', 'Potable', 'Можно') : l('İçilmez', 'Not safe', 'Nicht trinkbar', 'No potable', 'Нельзя')} label={l('Musluk suyu', 'Tap water', 'Leitungswasser', 'Agua del grifo', 'Вода из-под крана')} icon="drop" tone={intel.waterAndHealth.tapWaterSafe ? 'ok' : 'warn'} />
                <Stat value={intel.waterAndHealth.insuranceRequired ? l('Zorunlu', 'Required', 'Pflicht', 'Obligatorio', 'Обязательна') : l('Önerilir', 'Advised', 'Empfohlen', 'Recomendado', 'Рекомендуется')} label={l('Seyahat sigortası', 'Travel insurance', 'Reiseversicherung', 'Seguro de viaje', 'Страховка')} icon="heart" />
              </div>
              <p>{intel.waterAndHealth.tapWaterDesc}</p>
              {intel.waterAndHealth.vaccines.length > 0 && <Card title={l('Önerilen aşılar', 'Recommended vaccines', 'Empfohlene Impfungen', 'Vacunas recomendadas', 'Прививки')} icon="shield"><Tags items={intel.waterAndHealth.vaccines} /></Card>}
            </div>
          )
        }
      ]
    },
    {
      id: 'itinerary', icon: 'route',
      title: l('Gezi planı', 'Itinerary', 'Reiseplan', 'Itinerario', 'Маршрут'),
      desc: itin.idealDurationText || l('Gün gün öneri rota', 'Day-by-day route', 'Route Tag für Tag', 'Ruta día a día', 'По дням'),
      render: () => (
        <div className="vz-stack">
          <Card tone="sea" eyebrow={itin.idealDurationText} title={itin.routeName}>
            <p>{itin.routeSummary}</p>
            <Tags items={[`${itin.totalDays} ${l('gün', 'days', 'Tage', 'días', 'дн.')}`, itin.paceLevel, itin.transportMode, itin.bestSeason]} />
          </Card>
          <div className="vz-steps">
            {itin.stops.map((s) => (
              <div className="vz-step" key={s.stopNumber}>
                <span className="vz-step-n">{s.stopNumber}</span>
                <div className="vz-step-b">
                  <h4>{s.name}</h4>
                  <span className="vz-badge tone-sea" style={{ alignSelf: 'flex-start' }}>{s.durationBadge || s.recommendedDuration}</span>
                  {s.highlights?.length > 0 && <Tags items={s.highlights} />}
                  {s.activities?.length > 0 && <Bullets items={s.activities} />}
                  {s.criticalTips?.length > 0 && <div className="vz-note"><Icon name="info" size={18} duo={false} /><span>{s.criticalTips.join(' · ')}</span></div>}
                  {s.mapsQuery && <LinkBtn small href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mapsQuery)}`} icon="map">{l('Haritada aç', 'Open in Maps', 'In Karten öffnen', 'Abrir en Maps', 'Открыть карту')}</LinkBtn>}
                </div>
              </div>
            ))}
          </div>
          <div className="vz-actions"><Btn icon="plus" onClick={() => { addToRoute(); onOpenRoute(); }}>{l('Rotama ekle', 'Add to my route', 'Zur Route', 'Añadir a mi ruta', 'В маршрут')}</Btn></div>
        </div>
      )
    },
    {
      id: 'easy', icon: 'sun',
      title: l('Kolay tatil', 'Easy trip', 'Einfache Reise', 'Viaje fácil', 'Лёгкая поездка'),
      desc: l('Uçuş, otel, ulaşım, sigorta', 'Flights, stay, transfer, cover', 'Flug, Hotel, Transfer', 'Vuelo, hotel, traslado', 'Перелёт, отель, трансфер'),
      render: () => (
        <div className="vz-steps">
          {concierge.stages.map((s, i) => (
            <div className="vz-step" key={s.stage}>
              <span className="vz-step-n">{i + 1}</span>
              <div className="vz-step-b">
                <h4>{tr ? s.titleTr : s.titleEn}</h4>
                <p className="vz-muted" style={{ fontSize: 14 }}>{tr ? s.subtitleTr : s.subtitleEn}</p>
                <List>
                  {s.partners.slice(0, 3).map((pn) => (
                    <Row key={pn.id} icon={s.stage === 'flights' ? 'plane' : s.stage === 'accommodation' ? 'bed' : s.stage === 'transit' ? 'car' : 'shield'} title={pn.brand} sub={tr ? pn.taglineTr : pn.taglineEn} href={pn.url} />
                  ))}
                </List>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'transport', icon: 'transit',
      title: l('Ulaşım & internet', 'Transport & internet', 'Verkehr & Internet', 'Transporte e internet', 'Транспорт и интернет'),
      desc: l('Taksi, eSIM, priz', 'Taxis, eSIM, plugs', 'Taxi, eSIM, Stecker', 'Taxi, eSIM, enchufes', 'Такси, eSIM, розетки'),
      tabs: [
        {
          id: 'move', label: l('Ulaşım', 'Getting around', 'Unterwegs', 'Moverse', 'Транспорт'),
          render: () => (
            <div className="vz-stack">
              <div className="vz-stats">
                <Stat value={`$${insights.transport.singleTicketUsd}`} label={l('Tek biniş', 'Single ticket', 'Einzelticket', 'Billete sencillo', 'Разовый билет')} icon="ticket" />
                <Stat value={`$${insights.transport.dailyPassUsd}`} label={l('Günlük kart', 'Day pass', 'Tageskarte', 'Pase diario', 'Дневной')} icon="cal" />
                <Stat value={insights.transport.transportQuality} label={l('Toplu taşıma', 'Public transport', 'ÖPNV', 'Transporte público', 'Транспорт')} icon="transit" />
              </div>
              {insights.transport.popularRideApps?.length > 0 && <Card title={l('Taksi uygulamaları', 'Ride apps', 'Fahrdienste', 'Apps de taxi', 'Такси')} icon="car"><Tags items={insights.transport.popularRideApps} /></Card>}
              <div className="vz-note"><Icon name="info" size={18} duo={false} /><span>{insights.transport.taxiAdvice}</span></div>
            </div>
          )
        },
        {
          id: 'net', label: l('İnternet', 'Internet', 'Internet', 'Internet', 'Интернет'),
          render: () => (
            <div className="vz-stack">
              <div className="vz-stats">
                <Stat value={`${insights.internet.mobileSpeedMbps} Mbps`} label={l('Mobil hız', 'Mobile speed', 'Mobil', 'Móvil', 'Мобильный')} icon="wifi" />
                <Stat value={`${insights.internet.broadbandSpeedMbps} Mbps`} label={l('Ev/ofis internet', 'Broadband', 'Festnetz', 'Fibra', 'Домашний')} icon="laptop" />
                <Stat value={`$${insights.internet.costPerGbUsd}`} label={l('1 GB fiyatı', 'Price per GB', 'Preis pro GB', 'Precio por GB', 'Цена за ГБ')} icon="coin" />
              </div>
              <p>{insights.internet.esimAvailability}</p>
              {insights.internet.bestCarriers?.length > 0 && <Card title={l('Operatörler', 'Carriers', 'Anbieter', 'Operadores', 'Операторы')} icon="phone"><Tags items={insights.internet.bestCarriers} /></Card>}
              {insights.internet.vpnRequired && <div className="vz-note"><Icon name="lock" size={18} duo={false} /><span>{insights.internet.vpnNote || l('Bazı sitelere erişim için VPN gerekebilir.', 'A VPN may be needed for some sites.', 'VPN kann nötig sein.', 'Puede necesitarse VPN.', 'Может понадобиться VPN.')}</span></div>}
              {intel.connectivity.airportSimTrapWarning && <div className="vz-note"><Icon name="alert" size={18} duo={false} /><span>{intel.connectivity.airportSimTrapWarning}</span></div>}
            </div>
          )
        },
        {
          id: 'plug', label: l('Priz', 'Plugs', 'Stecker', 'Enchufes', 'Розетки'),
          render: () => (
            <div className="vz-stack">
              <div className="vz-stats">
                <Stat value={intel.plugs.types.join(', ')} label={l('Fiş tipi', 'Plug type', 'Steckertyp', 'Tipo de enchufe', 'Тип розетки')} icon="plug" />
                <Stat value={`${intel.plugs.voltage} · ${intel.plugs.frequency}`} label={l('Voltaj', 'Voltage', 'Spannung', 'Voltaje', 'Напряжение')} icon="spark" />
                <Stat value={intel.plugs.needsAdapterFromTR ? l('Gerekli', 'Needed', 'Nötig', 'Necesario', 'Нужен') : l('Gerekmez', 'Not needed', 'Nicht nötig', 'No necesario', 'Не нужен')} label={l('Türkiye fişine adaptör', 'Adapter for C/F plugs', 'Adapter für C/F', 'Adaptador C/F', 'Адаптер C/F')} icon="plug" tone={intel.plugs.needsAdapterFromTR ? 'warn' : 'ok'} />
              </div>
              <p>{intel.plugs.socketDesc}</p>
            </div>
          )
        }
      ]
    },
    {
      id: 'prices', icon: 'coin',
      title: l('Fiyatlar', 'Prices', 'Preise', 'Precios', 'Цены'),
      desc: l('Yemek, konaklama, bahşiş', 'Food, stays, tipping', 'Essen, Hotel, Trinkgeld', 'Comida, hotel, propina', 'Еда, жильё, чаевые'),
      render: () => (
        <div className="vz-stack">
          <div className="vz-stats">
            <Stat value={`$${insights.livingCosts.dailyBudgetBackpackerUsd}`} label={l('Günlük bütçe (ekonomik)', 'Daily budget (budget)', 'Tagesbudget (günstig)', 'Presupuesto diario (bajo)', 'Бюджет в день (эконом)')} icon="wallet" />
            <Stat value={`$${insights.livingCosts.dailyBudgetMidrangeUsd}`} label={l('Günlük bütçe (orta)', 'Daily budget (mid)', 'Tagesbudget (mittel)', 'Presupuesto diario (medio)', 'Бюджет в день (средний)')} icon="wallet" />
            <Stat value={`$${insights.livingCosts.budgetMealUsd}`} label={l('Ucuz bir öğün', 'Budget meal', 'Günstiges Essen', 'Comida económica', 'Обед')} icon="food" />
            <Stat value={`$${insights.livingCosts.coffeeUsd}`} label={l('Kahve', 'Coffee', 'Kaffee', 'Café', 'Кофе')} icon="food" />
            <Stat value={`$${insights.livingCosts.hostelDormUsd}`} label={l('Hostel (gece)', 'Hostel (night)', 'Hostel (Nacht)', 'Hostal (noche)', 'Хостел')} icon="bed" />
            <Stat value={`$${insights.livingCosts.hotel3StarUsd}`} label={l('3 yıldızlı otel', '3-star hotel', '3-Sterne-Hotel', 'Hotel 3*', 'Отель 3*')} icon="bed" />
          </div>
          <Card title={l('Bahşiş', 'Tipping', 'Trinkgeld', 'Propina', 'Чаевые')} icon="receipt">
            <p>{intel.tipping.custom}{intel.tipping.standardPercent ? ` (%${intel.tipping.standardPercent})` : ''}</p>
            {intel.tipping.note && <p className="vz-muted">{intel.tipping.note}</p>}
          </Card>
          <Card title={l('Ödeme alışkanlığı', 'How people pay', 'Bezahlen', 'Cómo se paga', 'Оплата')} icon="card"><p>{enc.economy.paymentCulture}</p></Card>
          {intel.taxFree.vatRefundPercent && <Card title={l('Vergi iadesi (tax free)', 'Tax-free shopping', 'Tax-free', 'Tax free', 'Tax free')} icon="receipt"><p>{intel.taxFree.vatRefundPercent} · {intel.taxFree.minSpend}</p><p className="vz-muted">{intel.taxFree.customsNote}</p></Card>}
          <div className="vz-note"><Icon name="plane" size={18} duo={false} /><span>{insights.livingCosts.flightTip}</span></div>
        </div>
      )
    },
    {
      id: 'culture', icon: 'landmark',
      title: l('Kültür & gezilecek yerler', 'Culture & sights', 'Kultur & Sehenswertes', 'Cultura y lugares', 'Культура и места'),
      desc: l('Şehirler, bölgeler, görgü', 'Cities, regions, etiquette', 'Städte, Regionen, Etikette', 'Ciudades, regiones', 'Города, регионы'),
      tabs: [
        {
          id: 'see', label: l('Gezilecek yerler', 'Must-see', 'Sehenswert', 'Imprescindibles', 'Что посмотреть'),
          render: () => (
            <div className="vz-stack">
              <Bullets items={enc.tourism.mustSeePlaces} />
              <div className="vz-grid two">
                <Card title={l('Büyük şehirler', 'Major cities', 'Großstädte', 'Ciudades', 'Города')} icon="landmark"><Tags items={[geog.capital, ...geog.majorCities].filter((x, i, a) => x && a.indexOf(x) === i)} /></Card>
                <Card title={l('Turistik bölgeler', 'Tourist regions', 'Regionen', 'Regiones', 'Регионы')} icon="map"><Tags items={geog.touristRegions} /></Card>
              </div>
              <Card tone="sea" title={l('Ne zaman gidilir?', 'When to go', 'Beste Reisezeit', 'Cuándo ir', 'Когда ехать')} icon="sun"><p>{enc.tourism.bestSeasons}</p><p className="vz-muted">{enc.tourism.travelStyleTip}</p></Card>
            </div>
          )
        },
        {
          id: 'etiquette', label: l('Görgü kuralları', 'Etiquette', 'Etikette', 'Etiqueta', 'Этикет'),
          render: () => (
            <div className="vz-stack">
              <Bullets items={enc.culture.etiquette} />
              <p>{enc.culture.lifestyle}</p>
              <Card title={l('Din ve kutsal yerler', 'Religion & sacred sites', 'Religion', 'Religión', 'Религия')} icon="landmark"><p>{enc.religion.primaryReligions}</p><p className="vz-muted">{enc.religion.respectNorms}</p></Card>
            </div>
          )
        },
        {
          id: 'fest', label: l('Festivaller', 'Festivals', 'Feste', 'Festivales', 'Праздники'),
          render: () => <Bullets items={enc.culture.festivals} />
        }
      ]
    },
    {
      id: 'food', icon: 'food',
      title: l('Yemek & içecek', 'Food & drink', 'Essen & Trinken', 'Comida y bebida', 'Еда и напитки'),
      desc: l('Ne yenir, ne içilir', 'What to eat and drink', 'Was essen', 'Qué comer', 'Что попробовать'),
      render: () => (
        <div className="vz-stack">
          <div className="vz-grid">
            <Card title={l('Meşhur yemekler', 'Famous dishes', 'Berühmte Gerichte', 'Platos', 'Блюда')} icon="food"><Bullets items={enc.gastronomy.famousDishes} /></Card>
            <Card title={l('Sokak lezzetleri & tatlılar', 'Street food & desserts', 'Streetfood & Desserts', 'Comida callejera', 'Уличная еда')} icon="star"><Bullets items={enc.gastronomy.streetFoodAndDesserts} /></Card>
            <Card title={l('İçecekler', 'Drinks', 'Getränke', 'Bebidas', 'Напитки')} icon="drop"><Bullets items={enc.gastronomy.traditionalDrinks} /></Card>
          </div>
          {itin.signatureGastronomy?.diningAdvice && <div className="vz-note"><Icon name="info" size={18} duo={false} /><span>{itin.signatureGastronomy.diningAdvice}</span></div>}
        </div>
      )
    },
    {
      id: 'lang', icon: 'book',
      title: l('Dil & tarih', 'Language & history', 'Sprache & Geschichte', 'Idioma e historia', 'Язык и история'),
      desc: l('İşe yarar kelimeler', 'Useful phrases', 'Nützliche Sätze', 'Frases útiles', 'Полезные фразы'),
      tabs: [
        {
          id: 'phr', label: l('Kelimeler', 'Phrases', 'Sätze', 'Frases', 'Фразы'),
          render: () => (
            <div className="vz-stack">
              <div className="vz-stats">
                <Stat value={enc.language.officialLanguages} label={l('Resmî dil', 'Official language', 'Amtssprache', 'Idioma oficial', 'Язык')} icon="lang" />
                <Stat value={enc.language.englishProficiency} label={l('İngilizce bilinirliği', 'English level', 'Englisch', 'Nivel de inglés', 'Английский')} icon="people" />
              </div>
              {enc.language.phrases.length > 0 ? (
                <div className="vz-list">
                  {enc.language.phrases.map((ph, i) => (
                    <div className="vz-phrase" key={i}>
                      <div className="vz-stack" style={{ gap: 2 }}>
                        <b>{ph.phrase}</b>
                        {ph.pronunciation && <span>{ph.pronunciation}</span>}
                      </div>
                      <span style={{ textAlign: 'right' }}>{ph.translation || ph.meaning}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <Empty icon="book" title={l('Bu ülke için kelime listesi hazırlanıyor', 'Phrase list coming soon', 'Bald verfügbar', 'Próximamente', 'Скоро')} />
              )}
            </div>
          )
        },
        {
          id: 'hist', label: l('Kısa tarih', 'History', 'Geschichte', 'Historia', 'История'),
          render: () => (
            <div className="vz-stack">
              <p>{enc.history.conciseHistory}</p>
              <Bullets items={enc.history.milestones} />
            </div>
          )
        }
      ]
    },
    {
      id: 'economy', icon: 'chart',
      title: l('Ekonomi & ünlüler', 'Economy & people', 'Wirtschaft & Persönlichkeiten', 'Economía y personas', 'Экономика и люди'),
      desc: l('Ülkeyi tanı', 'Get to know it', 'Land kennenlernen', 'Conoce el país', 'О стране'),
      render: () => (
        <div className="vz-stack">
          <p>{enc.economy.economicPillars}</p>
          <div className="vz-grid two">
            <Card title={l('Güçlü olduğu alanlar', 'Strong sectors', 'Starke Branchen', 'Sectores fuertes', 'Сильные отрасли')} icon="chart"><Tags items={enc.achievements.strongSectors} /></Card>
            <Card title={l('Dünyaca ünlüleri', 'Famous people', 'Berühmtheiten', 'Personajes', 'Знаменитости')} icon="star"><Bullets items={enc.achievements.famousFigures} /></Card>
          </div>
        </div>
      )
    },
    {
      id: 'sos', icon: 'sos',
      title: l('Acil numaralar', 'Emergency numbers', 'Notrufnummern', 'Emergencias', 'Экстренные номера'),
      desc: l('Polis, ambulans, konsolosluk', 'Police, ambulance, consulate', 'Polizei, Rettung, Konsulat', 'Policía, ambulancia', 'Полиция, скорая'),
      badge: emergency.general || emergency.police || undefined,
      render: () => (
        <div className="vz-stack">
          <List>
            <NumRow label={l('Genel acil', 'General emergency', 'Allgemeiner Notruf', 'Emergencia general', 'Общий номер')} num={emergency.general} icon="sos" />
            <NumRow label={l('Polis', 'Police', 'Polizei', 'Policía', 'Полиция')} num={emergency.police} icon="shield" />
            <NumRow label={l('Ambulans', 'Ambulance', 'Rettung', 'Ambulancia', 'Скорая')} num={emergency.ambulance} icon="heart" />
            <NumRow label={l('İtfaiye', 'Fire', 'Feuerwehr', 'Bomberos', 'Пожарные')} num={emergency.fire} icon="alert" />
            <NumRow label={l('Turist polisi', 'Tourist police', 'Touristenpolizei', 'Policía turística', 'Туристическая полиция')} num={emergency.tourist} icon="people" />
          </List>
          <Card tone="sea" icon="phone" eyebrow={pick3(consular.ministryName, language)} title={pick3(consular.crisisCenterTitle, language)}>
            <div className="vz-actions">
              {consular.hotline247 && <a className="vz-btn vz-btn-primary sm" href={`tel:${consular.hotline247.replace(/[^\d+]/g, '')}`}>{l('7/24 hat', '24/7 line', '24/7', '24/7', '24/7')}: {consular.hotline247}</a>}
              {consular.officialPortalUrl && <LinkBtn small href={consular.officialPortalUrl}>{consular.officialPortalName || l('Resmî site', 'Official site', 'Offizielle Seite', 'Sitio oficial', 'Сайт')}</LinkBtn>}
            </div>
            <p className="vz-muted">{l('Pasaportunu kaybedersen:', 'If you lose your passport:', 'Bei Passverlust:', 'Si pierdes el pasaporte:', 'При утере паспорта:')} {pick3(consular.emergencyDocName, language)} ({pick3(consular.emergencyDocValidity, language)})</p>
          </Card>
          <Btn variant="soft" icon="sos" onClick={onOpenSos}>{l('Acil durum rehberinin tamamı', 'Full emergency guide', 'Kompletter Notfallguide', 'Guía completa', 'Полный гид')}</Btn>
        </div>
      )
    },
    {
      id: 'apps', icon: 'phone', isNew: true,
      title: l('Faydalı uygulamalar', 'Useful apps', 'Nützliche Apps', 'Apps útiles', 'Полезные приложения'),
      desc: l('Çeviri, taksi, ödeme, harita', 'Translate, taxi, pay, maps', 'Übersetzen, Taxi, Zahlen', 'Traducir, taxi, pagar', 'Перевод, такси, оплата'),
      render: () => {
        const local = verified?.local_apps.filter((a) => a.available_in_country) || [];
        return (
          <div className="vz-stack">
            {local.length > 0 && (
              <Card title={l(`${name}'da yerel olarak kullanılanlar`, `Used locally in ${name}`, `Lokal genutzt in ${name}`, `Usadas en ${name}`, `Местные в ${name}`)} icon="check" tone="sea">
                <Tags items={local.map((a) => a.name)} />
              </Card>
            )}
            <div className="vz-grid">
              {apps.map((a) => (
                <a key={(a.id || a.name) + a.category} className="vz-app-card" href={a.url} target="_blank" rel="noopener noreferrer">
                  <span className="vz-app-logo" style={{ background: a.logoBg, color: a.logoColor }}>{a.logoText}</span>
                  <span className="vz-stack" style={{ gap: 2 }}>
                    <small>{tr ? a.categoryLabelTr : a.categoryLabelEn}</small>
                    <b>{a.name}</b>
                    <p>{tr ? a.recommendedReasonTr || a.taglineTr : a.recommendedReasonEn || a.taglineEn}</p>
                  </span>
                </a>
              ))}
            </div>
          </div>
        );
      }
    },
    {
      id: 'partners', icon: 'bed', isNew: true,
      title: l('Otel, uçuş, eSIM', 'Hotels, flights, eSIM', 'Hotels, Flüge, eSIM', 'Hoteles, vuelos, eSIM', 'Отели, авиа, eSIM'),
      desc: l('Güvenilir iş ortakları', 'Trusted partners', 'Partner', 'Socios', 'Партнёры'),
      render: () => (
        <div className="vz-stack">
          <div className="vz-grid">
            {concierge.stages.flatMap((s) => s.partners.slice(0, 2)).map((pn) => (
              <Card key={pn.id} eyebrow={tr ? pn.badgeTr : pn.badgeEn} title={pn.brand} icon={pn.stage === 'flights' ? 'plane' : pn.stage === 'accommodation' ? 'bed' : pn.stage === 'transit' ? 'car' : 'shield'}>
                <p className="vz-muted">{tr ? pn.taglineTr : pn.taglineEn}</p>
                <LinkBtn href={pn.url} small variant="primary">{tr ? pn.ctaTr : pn.ctaEn}</LinkBtn>
              </Card>
            ))}
            {AFFILIATE_PARTNERS.slice(0, 3).map((a) => {
              const x = getLocalizedPartner(a, language);
              return (
                <Card key={a.url} eyebrow={x.category} title={x.title} icon="handshake">
                  <p className="vz-muted">{x.desc}</p>
                  <LinkBtn href={a.url} small variant="primary">{x.linkText}</LinkBtn>
                </Card>
              );
            })}
          </div>
          <p className="vz-muted" style={{ fontSize: 12 }}>{l('Bu bağlantılar iş ortağı bağlantısıdır; senin için fiyat değişmez, Vizamigo’nun ücretsiz kalmasına yardım eder.', 'These are partner links; your price stays the same and it keeps Vizamigo free.', 'Partnerlinks; der Preis bleibt gleich.', 'Enlaces de socios; el precio no cambia.', 'Партнёрские ссылки; цена не меняется.')}</p>
        </div>
      )
    }
  ];

  const lang = language as SupportedLanguage;
  const passName = getCountryName(passport, language);
  const stayText = getStayDurationText(item?.v || 'v', item?.cat || 'visa', lang);
  const answer = generateDirectAnswerSnippet(name, passName, item?.cat || 'visa', stayText, !!item?.id, lang);
  const h1Rest = getCountryNaturalH1(name, lang).replace(name, '').replace(/^[\s,]+|[\s,]+$/g, '');
  const faq: { q: string; a: string }[] = [
    { q: l(`${passName} vatandaşları ${name}’a vizesiz gidebilir mi?`, `Do ${passName} citizens need a visa for ${name}?`, `Brauchen Staatsbürger aus ${passName} ein Visum für ${name}?`, `¿Necesitan visado los ciudadanos de ${passName} para ${name}?`, `Нужна ли виза в ${name} гражданам ${passName}?`), a: answer },
    { q: l(`${name}’da ne kadar kalabilirim?`, `How long can I stay in ${name}?`, `Wie lange darf ich in ${name} bleiben?`, `¿Cuánto tiempo puedo quedarme en ${name}?`, `Сколько можно находиться в ${name}?`), a: days ? l(`${passName} pasaportuyla tek seferde ${stayText} kalabilirsin.`, `With a ${passName} passport you can stay ${stayText} per visit.`, `Mit diesem Pass bis zu ${stayText} pro Aufenthalt.`, `Con este pasaporte hasta ${stayText} por visita.`, `С этим паспортом до ${stayText} за визит.`) : stayText },
    { q: l(`${name}’a gitmek için en iyi zaman ne?`, `When is the best time to visit ${name}?`, `Wann ist die beste Reisezeit für ${name}?`, `¿Cuándo es mejor visitar ${name}?`, `Когда лучше ехать в ${name}?`), a: enc.tourism.bestSeasons || insights.bestMonths },
    { q: l(`${name}’da hangi priz kullanılıyor?`, `Which plug type does ${name} use?`, `Welcher Steckertyp gilt in ${name}?`, `¿Qué enchufe se usa en ${name}?`, `Какие розетки в ${name}?`), a: `${intel.plugs.types.join(', ')} · ${intel.plugs.voltage} ${intel.plugs.frequency}. ${intel.plugs.socketDesc}` },
    { q: l(`${name}’da acil durum numarası kaç?`, `What is the emergency number in ${name}?`, `Wie lautet die Notrufnummer in ${name}?`, `¿Cuál es el número de emergencias en ${name}?`, `Какой номер экстренных служб в ${name}?`), a: [emergency.general && `${l('Genel', 'General', 'Allgemein', 'General', 'Общий')}: ${emergency.general}`, emergency.police && `${l('Polis', 'Police', 'Polizei', 'Policía', 'Полиция')}: ${emergency.police}`, emergency.ambulance && `${l('Ambulans', 'Ambulance', 'Rettung', 'Ambulancia', 'Скорая')}: ${emergency.ambulance}`].filter(Boolean).join(' · ') },
    { q: l(`${name}’da musluk suyu içilir mi?`, `Is tap water safe to drink in ${name}?`, `Ist Leitungswasser in ${name} trinkbar?`, `¿Se puede beber agua del grifo en ${name}?`, `Можно ли пить воду из-под крана в ${name}?`), a: intel.waterAndHealth.tapWaterDesc },
    { q: l(`${name}’da bahşiş veriliyor mu?`, `Should I tip in ${name}?`, `Gibt man in ${name} Trinkgeld?`, `¿Se deja propina en ${name}?`, `Принято ли оставлять чаевые в ${name}?`), a: `${intel.tipping.custom}${intel.tipping.note ? ' ' + intel.tipping.note : ''}` }
  ].filter((f) => f.a);
  const similar = useMemo(() => {
    const reg = countryToRegion[code];
    const all = getPassportItems(passport);
    const rank = (x: (typeof all)[number]) => (x.id ? 3 : x.cat === 'free' ? 2 : x.cat === 'evisa' || x.cat === 'eta' || x.cat === 'voa' ? 1 : 0);
    return all.filter((x) => x.c !== code && countryToRegion[x.c] === reg && GEO_DATA[x.c]).sort((a, b) => rank(b) - rank(a) || (stayDays(b) || 0) - (stayDays(a) || 0)).slice(0, 4);
  }, [code, passport]);

  return (
    <div className="vz-page">
      <section className="vz-chero">
        <div className="vz-chero-img" aria-hidden="true">
          <img src={getOptimizedImageUrl(visual.image, { width: 720 })} srcSet={`${getOptimizedImageUrl(visual.image, { width: 480 })} 480w, ${getOptimizedImageUrl(visual.image, { width: 720 })} 720w`} sizes="100vw" alt="" fetchPriority="high" />
        </div>
        <div className="vz-wrap vz-chero-in">
          <button type="button" className="vz-back" onClick={onBack}>
            <Icon name="back" size={18} duo={false} />
            <span>{l('Keşfet', 'Explore', 'Entdecken', 'Explorar', 'Обзор')}</span>
          </button>
          <span className="vz-row-flex"><VisaBadge item={item} big />{days && <span className="vz-badge big tone-mute">{l(`${days} gün`, `${days} days`, `${days} Tage`, `${days} días`, `${days} дн.`)}</span>}</span>
          <h1><Flag code={code} size="lg" /><span className="vz-h1-main">{name}</span><span className="sr-only"> — {h1Rest}</span></h1>
          <p>{[geog.capital, geog.currencyName, geog.callingCode].filter(Boolean).join(' · ')}</p>
          {visual.landmark && <span className="vz-chero-cap">{visual.landmark}</span>}
        </div>
      </section>

      <div className="vz-wrap vz-page-body">
        <div className="vz-summary" style={{ marginTop: -44 }}>
          <div className="vz-cfacts">
            <Stat value={timeStr} label={l(`${geog.capital || name} saati`, `Time in ${geog.capital || name}`, `Uhrzeit ${geog.capital || name}`, `Hora en ${geog.capital || name}`, `Время: ${geog.capital || name}`)} icon="clock" />
            <Stat value={w ? `${w.tempC}°` : '—'} label={wInfo ? `${wInfo[language] || wInfo.en} · ${l('hissedilen', 'feels', 'gefühlt', 'sensación', 'ощущ.')} ${w?.feelsLikeC}°` : l('Hava durumu', 'Weather', 'Wetter', 'Tiempo', 'Погода')} icon="sun" tone="sun" />
            <Stat value={fmtPair(GLOBAL_CURRENCIES[passport]?.symbol || homeCur, GLOBAL_CURRENCIES[code]?.symbol || destCur, rate, language)} label={`${homeCur} → ${destCur}`} icon="fx" />
            <Stat value={insights.bestMonths || '—'} label={l('En iyi aylar', 'Best months', 'Beste Monate', 'Mejores meses', 'Лучшие месяцы')} icon="cal" tone="ok" />
          </div>
        </div>

        <section className="vz-tldr" aria-label={l('Kısa cevap', 'Quick answer', 'Kurzantwort', 'Respuesta rápida', 'Коротко')}>
          <span className={`vz-ic tone-${visaTone(item)}`}><Icon name={visaTone(item) === 'warn' ? 'doc' : 'check'} size={22} /></span>
          <div className="vz-stack" style={{ gap: 6 }}>
            <b>{l(`${getCountryName(passport, language)} pasaportuyla ${name}`, `${name} with a ${getCountryName(passport, language)} passport`, `${name} mit Pass: ${getCountryName(passport, language)}`, `${name} con pasaporte de ${getCountryName(passport, language)}`, `${name}: паспорт ${getCountryName(passport, language)}`)}</b>
            <p>{answer}</p>
            {detail?.d && <span className="vz-muted" style={{ fontSize: 12.5 }}>{l('Son kontrol', 'Last checked', 'Zuletzt geprüft', 'Última revisión', 'Проверено')}: {detail.d}{detail.h ? ` · ${detail.h}` : ''}</span>}
          </div>
        </section>

        <div className="vz-actions">
          <Btn icon={added ? 'check' : 'plus'} onClick={addToRoute}>{added ? l('Rotana eklendi', 'Added to route', 'Zur Route hinzugefügt', 'Añadido', 'Добавлено') : l('Rotama ekle', 'Add to my route', 'Zur Route', 'Añadir a mi ruta', 'В маршрут')}</Btn>
          <Btn variant="soft" icon="share" onClick={share}>{copied ? l('Bağlantı kopyalandı', 'Link copied', 'Link kopiert', 'Enlace copiado', 'Скопировано') : l('Paylaş', 'Share', 'Teilen', 'Compartir', 'Поделиться')}</Btn>
          <Btn variant="ghost" icon="flag" onClick={() => onReport(code, name)}>{l('Hata bildir', 'Report an error', 'Fehler melden', 'Reportar', 'Сообщить')}</Btn>
        </div>

        <section className="vz-home-sec">
          <SecHead
            eyebrow={name}
            title={l('Bu ülke hakkında her şey', 'Everything about this country', 'Alles über dieses Land', 'Todo sobre este país', 'Всё о стране')}
            sub={l('Kutucuğa dokun, içeriği hemen altında açılsın.', 'Tap a tile and it opens right below.', 'Kachel antippen, sie öffnet sich darunter.', 'Toca una tarjeta y se abre debajo.', 'Нажмите — откроется ниже.')}
          />
          <TileGrid key={code} tiles={tiles} label={name} defaultOpen="visa" />
        </section>

        <section className="vz-home-sec vz-cmap-sec" aria-label={l('Harita', 'Map', 'Karte', 'Mapa', 'Карта')}>
          <SecHead eyebrow={l('Harita', 'Map', 'Karte', 'Mapa', 'Карта')} title={l(`${name} dünyanın neresinde?`, `Where is ${name}?`, `Wo liegt ${name}?`, `¿Dónde está ${name}?`, `Где находится ${name}?`)} />
          <div className="vz-cmap">
            <CountryMap code={code} home={passport} />
            <div className="vz-stack" style={{ gap: 10 }}>
              <div className="vz-tags">{[geog.capital, ...geog.majorCities].filter((x, i, a) => x && a.indexOf(x) === i).slice(0, 6).map((c) => <span key={c}>{c}</span>)}</div>
              {geo && <LinkBtn href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(getCountryName(code, 'en'))}`} small icon="map">{l('Google Haritalar’da aç', 'Open in Google Maps', 'In Google Maps öffnen', 'Abrir en Google Maps', 'Открыть в Google Maps')}</LinkBtn>}
            </div>
          </div>
        </section>

        <section className="vz-home-sec" aria-labelledby="vz-faq-h">
          <SecHead eyebrow={l('Sık sorulanlar', 'FAQ', 'FAQ', 'Preguntas', 'Вопросы')} title={l(`${name} hakkında sık sorulan sorular`, `${name}: frequently asked questions`, `Häufige Fragen zu ${name}`, `Preguntas frecuentes sobre ${name}`, `Частые вопросы о ${name}`)} />
          <div className="vz-faq" id="vz-faq-h">
            {faq.map((f, i) => (
              <details key={i} open={i === 0}>
                <summary>{f.q}<Icon name="down" size={18} duo={false} /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {similar.length > 0 && (
          <section className="vz-home-sec">
            <SecHead eyebrow={l('İlham', 'Inspiration', 'Inspiration', 'Inspiración', 'Идеи')} title={l('Bunları da sevebilirsin', 'You might also like', 'Das könnte dir auch gefallen', 'También te puede gustar', 'Вам может понравиться')} />
            <div className="vz-cgrid">
              {similar.map((c) => <CountryCard key={c.c} code={c.c} item={c} onOpen={onOpenCountry} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

/** Ülkenin dünyadaki yeri: nokta harita, ülkeye yakınlaşmış, pasaport ülkesinden kavis. */
const CountryMap: React.FC<{ code: string; home: string }> = ({ code, home }) => {
  const g = GEO_DATA[code];
  const h = GEO_DATA[home];
  if (!g) return null;
  const [x, y] = project(g.lng, g.lat);
  const hp = h ? project(h.lng, h.lat) : null;
  const span = 300;
  const vx = Math.max(0, Math.min(WORLD_W - span, x - span / 2));
  const vh = span * 0.56;
  const vy = Math.max(0, Math.min(WORLD_H - vh, y - vh / 2));
  const k = span / WORLD_W;
  const mid = hp ? [(hp[0] + x) / 2, (hp[1] + y) / 2 - Math.min(40, Math.hypot(hp[0] - x, hp[1] - y) * 0.25)] : null;
  return (
    <div className="vz-mapbox">
      <svg viewBox={`${vx} ${vy} ${span} ${vh}`} role="img" aria-label={code}>
        <path d={WORLD_DOTS} className="vz-map-dots" strokeWidth={Math.max(2.2 * k, 1.4)} />
        {hp && mid && <path d={`M${hp[0]} ${hp[1]} Q${mid[0]} ${mid[1]} ${x} ${y}`} className="vz-map-route" strokeWidth={1.2} strokeDasharray="4 3" />}
        {hp && <circle cx={hp[0]} cy={hp[1]} r={3} className="vz-map-home" />}
        <circle cx={x} cy={y} r={9} className="vz-map-pulse" />
        <circle cx={x} cy={y} r={4.5} className="vz-map-pin" />
      </svg>
    </div>
  );
};
