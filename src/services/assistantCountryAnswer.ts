/**
 * Asistanın ülke cevapları: yapay zekâ kullanmaz, sitenin doğrulanmış ülke verisinden (data/country/<dil>/<KOD>.json,
 * resmî uyarılar dahil) soruya uyan bölümleri seçip 5 dilde cevap kurar. Ücretsizdir ve tarayıcıda çalışır.
 */
import type { AssistantActionPill } from './aiAssistantEngine';
import { loadCountryBundle } from '../next/countryData';
import { getCountryName, getFlag } from '../data/passportData';
import { getPassportItems } from '../utils/calculator';
import { getStayDurationText, generateDirectAnswerSnippet } from '../utils/schemaGenerator';
import { GEO_DATA } from '../data/geoData';
import { capitalName } from '../data/capitalNames';
import { advisoryAgencyName, advisoryLabel } from '../data/officialAdvisoryLabels';
import { topicPartner } from './assistantCommerce';
import { INFO } from '../data/passportData';
import { GUIDE_LABELS } from '../data/guideLinks';

type Lang = 'tr' | 'en' | 'de' | 'es' | 'ru';
type Topic = 'visa' | 'id' | 'safety' | 'sos' | 'plug' | 'water' | 'tip' | 'taxi' | 'money' | 'season' | 'budget' | 'esim' | 'vat' | 'food' | 'route' | 'places' | 'language' | 'scam';

// Kelime başı eşleşmesi (normalize edilmiş metin üzerinde). "tip" gibi kısa kökler tam kelime olarak aranır.
const TOPICS: Array<[Topic, RegExp]> = [
  ['id', /(^| )(kimlik|nufus cuzdan|id card|national id|personalausweis|ausweis|dni|documento de identidad|удостоверени|внутренн\S* паспорт)/],
  ['visa', /(^| )(vize|visa|visum|visado|виз|giris sart|entry req|einreise|requisitos|въезд)/],
  ['safety', /(^| )(guvenli|guvenlik|tehlike|riskli|savas|teror|safe|safety|danger|travel advisory|advisory|warning|sicher|gefahr|reisewarnung|seguro|segurid|peligr|безопас|опасн|предупрежд)/],
  ['sos', /(^| )(acil|polis|ambulans|itfaiye|emergency|police|ambulance|notruf|polizei|krankenwagen|emergenc|policia|ambulancia|экстрен|полиц|скор)/],
  ['plug', /(^| )(priz|fis|adapt|voltaj|elektrik|plug|socket|voltage|stecker|steckdose|spannung|enchuf|voltaje|розет|вилк|напряжен)/],
  ['water', /(^| )(musluk|su icil|icme suyu|tap water|drinking water|leitungswasser|trinkwasser|agua del grifo|agua potable|вод)/],
  ['tip', /(^| )(bahsis|tip|tips|tipping|trinkgeld|propina|чаев)( |$)/],
  ['taxi', /(^| )(taksi|uber|bolt|grab|careem|ulasim|metro|otobus|taxi|ride|transport|bus|nahverkehr|transporte|autobus|такси|транспорт|метро)/],
  ['money', /(^| )(para birim|doviz|kur |nakit|kredi kart|kart gec|currency|money|cash|card|exchange|wahrung|geld|bargeld|karte|moneda|dinero|efectivo|tarjeta|валют|деньг|налич|карт)/],
  ['season', /(^| )(ne zaman|mevsim|hava|iklim|sicak|soguk|when to|best time|weather|season|climate|reisezeit|wetter|klima|wann|cuando|epoca|clima|tiempo|когда|погод|сезон|климат)/],
  ['budget', /(^| )(butce|fiyat|pahali|ucuz|masraf|kac para|ne kadar tut|budget|cost|price|expensive|cheap|how much|kosten|preis|teuer|billig|presupuesto|precio|caro|barato|cuanto cuesta|бюджет|цен|дорог|дешев|сколько стоит)/],
  ['esim', /(^| )(esim|sim kart|sim|internet|hat al|wifi|roaming|mobile data|mobilfunk|datos moviles|интернет|сим)/],
  ['vat', /(^| )(tax free|taxfree|kdv|vergi iade|vat|mwst|mehrwertsteuer|iva|ндс|такс фри)/],
  ['food', /(^| )(yemek|ne yenir|mutfa|lezzet|food|eat|cuisine|dish|essen|kuche|gericht|comida|comer|plato|gastronom|еда|кухн|блюд|поесть)/],
  ['route', /(^| )(rota|gezi plan|kac gun|itinerary|route|plan|reiseroute|itinerario|ruta|маршрут)/],
  ['places', /(^| )(gezilecek|gorulecek|nereler|neresi|sights|places|things to do|what to see|attraction|sehenswurd|lugares|que ver|que hacer|достопримеч|что посмотреть|куда сходить)/],
  ['language', /(^| )(dil( |$)|dili|hangi dil|kelime|ingilizce|language|phrases|english|sprache|englisch|idioma|frases|ingles|язык|фраз|английск)/],
  ['scam', /(^| )(dolandir|kazik|tuzak|scam|rip off|betrug|abzocke|masche|estafa|timo|мошенн|развод|обман)/]
];

const T: Record<string, Record<Lang, string>> = {
  visa: { tr: 'Vize', en: 'Visa', de: 'Visum', es: 'Visado', ru: 'Виза' },
  safety: { tr: 'Güvenlik', en: 'Safety', de: 'Sicherheit', es: 'Seguridad', ru: 'Безопасность' },
  official: { tr: 'Resmî seyahat uyarıları', en: 'Official travel advisories', de: 'Offizielle Reisehinweise', es: 'Avisos oficiales de viaje', ru: 'Официальные предупреждения' },
  siteScore: { tr: 'Vizamigo güvenlik puanı', en: 'Vizamigo safety score', de: 'Vizamigo-Sicherheitswert', es: 'Puntuación de seguridad de Vizamigo', ru: 'Оценка безопасности Vizamigo' },
  sos: { tr: 'Acil numaralar', en: 'Emergency numbers', de: 'Notrufnummern', es: 'Teléfonos de emergencia', ru: 'Экстренные номера' },
  police: { tr: 'Polis', en: 'Police', de: 'Polizei', es: 'Policía', ru: 'Полиция' },
  amb: { tr: 'Ambulans', en: 'Ambulance', de: 'Rettung', es: 'Ambulancia', ru: 'Скорая' },
  fire: { tr: 'İtfaiye', en: 'Fire', de: 'Feuerwehr', es: 'Bomberos', ru: 'Пожарные' },
  gen: { tr: 'Genel', en: 'General', de: 'Allgemein', es: 'General', ru: 'Общий' },
  tourist: { tr: 'Turist polisi', en: 'Tourist police', de: 'Touristenpolizei', es: 'Policía turística', ru: 'Туристическая полиция' },
  plug: { tr: 'Priz', en: 'Plugs', de: 'Steckdosen', es: 'Enchufes', ru: 'Розетки' },
  adapterY: { tr: 'Türkiye fişleri için adaptör gerekir', en: 'An adapter is needed for Turkish/EU plugs', de: 'Für EU-Stecker ist ein Adapter nötig', es: 'Hace falta adaptador para enchufes europeos', ru: 'Для европейских вилок нужен переходник' },
  adapterN: { tr: 'Türkiye fişleri uyumlu, adaptör gerekmez', en: 'Turkish/EU plugs fit, no adapter needed', de: 'EU-Stecker passen, kein Adapter nötig', es: 'Los enchufes europeos sirven, sin adaptador', ru: 'Европейские вилки подходят, переходник не нужен' },
  water: { tr: 'Musluk suyu', en: 'Tap water', de: 'Leitungswasser', es: 'Agua del grifo', ru: 'Вода из-под крана' },
  waterY: { tr: 'İçilebilir', en: 'Safe to drink', de: 'Trinkbar', es: 'Potable', ru: 'Можно пить' },
  waterN: { tr: 'İçilmesi önerilmez', en: 'Not recommended', de: 'Nicht empfohlen', es: 'No recomendable', ru: 'Пить не рекомендуется' },
  vaccines: { tr: 'Aşılar', en: 'Vaccines', de: 'Impfungen', es: 'Vacunas', ru: 'Прививки' },
  tip: { tr: 'Bahşiş', en: 'Tipping', de: 'Trinkgeld', es: 'Propinas', ru: 'Чаевые' },
  taxi: { tr: 'Ulaşım ve taksi', en: 'Getting around', de: 'Unterwegs', es: 'Transporte', ru: 'Транспорт' },
  apps: { tr: 'Uygulamalar', en: 'Apps', de: 'Apps', es: 'Apps', ru: 'Приложения' },
  ticket: { tr: 'Tek bilet', en: 'Single ticket', de: 'Einzelfahrschein', es: 'Billete sencillo', ru: 'Разовый билет' },
  money: { tr: 'Para ve ödeme', en: 'Money & payments', de: 'Geld & Bezahlen', es: 'Dinero y pagos', ru: 'Деньги и оплата' },
  currency: { tr: 'Para birimi', en: 'Currency', de: 'Währung', es: 'Moneda', ru: 'Валюта' },
  season: { tr: 'Ne zaman gidilir', en: 'When to go', de: 'Beste Reisezeit', es: 'Cuándo ir', ru: 'Когда ехать' },
  budget: { tr: 'Günlük bütçe', en: 'Daily budget', de: 'Tagesbudget', es: 'Presupuesto diario', ru: 'Бюджет в день' },
  budgetB: { tr: 'Ekonomik', en: 'Budget', de: 'Günstig', es: 'Económico', ru: 'Эконом' },
  budgetM: { tr: 'Orta', en: 'Mid-range', de: 'Mittelklasse', es: 'Medio', ru: 'Средний' },
  meal: { tr: 'Ucuz yemek', en: 'Cheap meal', de: 'Günstiges Essen', es: 'Comida barata', ru: 'Недорогой обед' },
  coffee: { tr: 'Kahve', en: 'Coffee', de: 'Kaffee', es: 'Café', ru: 'Кофе' },
  hotel: { tr: '3 yıldızlı otel', en: '3-star hotel', de: '3-Sterne-Hotel', es: 'Hotel de 3 estrellas', ru: 'Отель 3*' },
  esim: { tr: 'İnternet ve eSIM', en: 'Internet & eSIM', de: 'Internet & eSIM', es: 'Internet y eSIM', ru: 'Интернет и eSIM' },
  speed: { tr: 'Mobil hız', en: 'Mobile speed', de: 'Mobilfunk-Tempo', es: 'Velocidad móvil', ru: 'Скорость мобильного' },
  vat: { tr: 'KDV iadesi (tax free)', en: 'VAT refund (tax free)', de: 'MwSt.-Erstattung (Tax Free)', es: 'Devolución del IVA (tax free)', ru: 'Возврат НДС (tax free)' },
  minSpend: { tr: 'En az alışveriş', en: 'Minimum spend', de: 'Mindesteinkauf', es: 'Compra mínima', ru: 'Минимальная покупка' },
  food: { tr: 'Ne yenir', en: 'What to eat', de: 'Was essen', es: 'Qué comer', ru: 'Что попробовать' },
  drinks: { tr: 'İçecekler', en: 'Drinks', de: 'Getränke', es: 'Bebidas', ru: 'Напитки' },
  route: { tr: 'Önerilen rota', en: 'Suggested itinerary', de: 'Empfohlene Route', es: 'Itinerario recomendado', ru: 'Рекомендуемый маршрут' },
  places: { tr: 'Mutlaka görülecek yerler', en: 'Must-see places', de: 'Sehenswürdigkeiten', es: 'Lugares imprescindibles', ru: 'Что посмотреть' },
  language: { tr: 'Dil', en: 'Language', de: 'Sprache', es: 'Idioma', ru: 'Язык' },
  english: { tr: 'İngilizce', en: 'English', de: 'Englisch', es: 'Inglés', ru: 'Английский' },
  phrases: { tr: 'İşe yarar kelimeler', en: 'Useful phrases', de: 'Nützliche Wörter', es: 'Frases útiles', ru: 'Полезные фразы' },
  scam: { tr: 'Bilinen dolandırıcılıklar', en: 'Known scams', de: 'Bekannte Maschen', es: 'Estafas comunes', ru: 'Известные схемы обмана' },
  info: { tr: 'Genel bilgi', en: 'Overview', de: 'Überblick', es: 'Resumen', ru: 'Обзор' },
  home: { tr: 'Kendi ülken: vize gerekmez. Aşağıda şehir ve ülke için pratik bilgiler var.', en: 'This is your own country, so no visa is needed. Practical info below.', de: 'Dein eigenes Land – kein Visum nötig. Praktische Infos unten.', es: 'Es tu propio país: no necesitas visado. Información práctica abajo.', ru: 'Это ваша страна — виза не нужна. Практическая информация ниже.' },
  capital: { tr: 'Başkent', en: 'Capital', de: 'Hauptstadt', es: 'Capital', ru: 'Столица' },
  open: { tr: 'Ülke sayfasını aç', en: 'Open country page', de: 'Länderseite öffnen', es: 'Abrir página del país', ru: 'Открыть страницу страны' },
  esimBtn: { tr: 'eSIM al (Airalo)', en: 'Get an eSIM (Airalo)', de: 'eSIM holen (Airalo)', es: 'Comprar eSIM (Airalo)', ru: 'Купить eSIM (Airalo)' },
  toursBtn: { tr: 'Tur ve biletler', en: 'Tours & tickets', de: 'Touren & Tickets', es: 'Tours y entradas', ru: 'Туры и билеты' },
  tipBtn: { tr: 'Bahşiş hesapla', en: 'Tip calculator', de: 'Trinkgeldrechner', es: 'Calculadora de propinas', ru: 'Калькулятор чаевых' },
  packBtn: { tr: 'Bavul listesi', en: 'Packing list', de: 'Packliste', es: 'Lista de equipaje', ru: 'Список вещей' },
  idY: { tr: 'Türk vatandaşları bu ülkeye çipli kimlik kartıyla da girebilir (pasaport gerekmez).', en: 'Turkish citizens can also enter with the chip ID card (no passport needed).', de: 'Türkische Staatsbürger können auch mit dem Chip-Personalausweis einreisen.', es: 'Los ciudadanos turcos también pueden entrar con el DNI con chip.', ru: 'Граждане Турции могут въехать и по ID-карте с чипом.' },
  idN: { tr: 'Bu ülkeye kimlikle girilemez; geçerli pasaport gerekir.', en: 'You cannot enter with an ID card; a valid passport is required.', de: 'Mit Personalausweis ist keine Einreise möglich; ein gültiger Reisepass ist nötig.', es: 'No se puede entrar con DNI; hace falta pasaporte válido.', ru: 'По ID-карте въехать нельзя, нужен действующий паспорт.' },
  checked: { tr: 'Resmî uyarılar kurumların açık verisinden alındı', en: 'Official advisories taken from each agency’s open data', de: 'Offizielle Hinweise aus den offenen Daten der Behörden', es: 'Avisos oficiales tomados de los datos abiertos de cada organismo', ru: 'Официальные предупреждения взяты из открытых данных ведомств' },
  more: { tr: 'Daha fazlası için sorabilirsin: güvenlik, acil numaralar, priz, bahşiş, taksi, bütçe, eSIM, tax free, yemek, rota.', en: 'You can also ask about: safety, emergency numbers, plugs, tipping, taxis, budget, eSIM, tax free, food, itinerary.', de: 'Du kannst auch fragen nach: Sicherheit, Notruf, Steckdosen, Trinkgeld, Taxi, Budget, eSIM, Tax Free, Essen, Route.', es: 'También puedes preguntar por: seguridad, emergencias, enchufes, propinas, taxis, presupuesto, eSIM, tax free, comida, itinerario.', ru: 'Можно спросить и про: безопасность, экстренные номера, розетки, чаевые, такси, бюджет, eSIM, tax free, еду, маршрут.' }
};

const sx = (x: unknown) => (typeof x === 'string' ? x.trim() : '');
const listx = (x: unknown): string[] => (Array.isArray(x) ? x.map((y) => (typeof y === 'string' ? y.trim() : '')).filter(Boolean) : []);

export function detectTopics(norm: string): Topic[] {
  return TOPICS.filter(([, re]) => re.test(norm)).map(([t]) => t);
}

export async function answerCountryQuestion(
  code: string,
  norm: string,
  langIn: string,
  passport: string,
  city = ''
): Promise<{ text: string; actions: AssistantActionPill[]; topics: string[] }> {
  const lang = (['tr', 'en', 'de', 'es', 'ru'].includes(langIn) ? langIn : 'en') as Lang;
  const L = (k: keyof typeof T) => T[k][lang];
  // Türkçe dışı cevapta Türkçe kalmış bir metin varsa göstermeyelim
  const s = (x: unknown) => { const v = sx(x); return lang !== 'tr' && /[ğışİŞĞ]/.test(v) ? '' : v; };
  const list = (x: unknown) => listx(x).filter((v) => lang === 'tr' || !/[ğışİŞĞ]/.test(v));
  const d = await loadCountryBundle(code, lang);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ins: any = d.insights || {}, enc: any = d.enc || {}, itin: any = d.itin || {}, intel: any = d.intel || {}, ver: any = d.verified;
  const name = getCountryName(code, lang);
  const flag = getFlag(code);
  let topics = detectTopics(norm);
  // "güvenli mi" sorusunda acil numaralar da işe yarar
  if (topics.includes('safety') && !topics.includes('sos')) topics.push('sos');
  const overview = topics.length === 0;
  if (overview) topics = ['visa'];

  const out: string[] = [];
  const head = (t: string) => out.push(`**${flag} ${city ? `${city} (${name})` : name} · ${t}**`);
  const line = (k: string, v: string) => { if (v) out.push(`• **${k}:** ${v}`); };

  for (const t of topics) {
    if (out.length) out.push('');
    switch (t) {
      case 'visa':
      case 'id': {
        const item = getPassportItems(passport).find((i) => i.c === code);
        const P = getCountryName(passport, lang);
        head(code === passport ? T.info[lang] : L('visa'));
        if (code === passport) {
          out.push(T.home[lang]);
        } else if (item) {
          const stay = getStayDurationText(item.v, item.cat, lang as never);
          const det = INFO[`${passport}-${code}`];
          const note = det ? (lang === 'tr' ? det.n : lang === 'de' ? det.nDe || det.nEn || det.n : det.nEn || det.n) : '';
          // Doğrulanmış özel not varsa (ör. Karadağ 1 Kasım 2026) genel şablon yerine onu ver
          out.push(note || generateDirectAnswerSnippet(name, P, item.cat, stay, item.id, lang as never));
          if (passport === 'TR' && (t === 'id' || item.id)) out.push(item.id ? L('idY') : L('idN'));
        }
        if (overview) {
          const geo = GEO_DATA[code];
          line(L('capital'), geo?.capital ? capitalName(code, lang, geo.capital) : '');
          line(L('currency'), s(ins.currency));
          line(L('season'), s(ins.bestMonths));
          const off = d.official;
          line(L('safety'), `${s(ins.safety?.safetyLevel)}${ins.safety?.safetyScore ? ` (${ins.safety.safetyScore}/100)` : ''}${off?.max ? ` · ${L('official')}: ${off.max}/4` : ''}`);
          const em = ins.safety?.emergencyNumbers;
          if (em) line(L('sos'), [em.police && `${L('police')} ${em.police}`, em.ambulance && `${L('amb')} ${em.ambulance}`].filter(Boolean).join(' · '));
          out.push('', L('more'));
        }
        break;
      }
      case 'safety': {
        head(L('safety'));
        line(L('siteScore'), `${ins.safety?.safetyScore ?? '–'}/100 – ${s(ins.safety?.safetyLevel)}`);
        if (s(ins.safety?.crimeRateSummary)) out.push(s(ins.safety.crimeRateSummary));
        const off = d.official;
        if (off?.items?.length) {
          out.push(`**${L('official')}:**`);
          for (const a of off.items) out.push(`• ${advisoryAgencyName(a.agency, lang)}: **${a.level}/4** – ${advisoryLabel(a, lang)} (${a.date})`);
          out.push(`(${L('checked')}: ${off.fetched})`);
        }
        for (const x of list(ins.safety?.safeTravelTips).slice(0, 3)) out.push(`• ${x}`);
        break;
      }
      case 'sos': {
        head(L('sos'));
        const em = ins.safety?.emergencyNumbers || {};
        const ve = ver?.emergency || {};
        const v = (a: unknown, b: unknown) => s((a as { value?: string })?.value) || s(b);
        line(L('police'), v(ve.police, em.police));
        line(L('amb'), v(ve.ambulance, em.ambulance));
        line(L('fire'), v(ve.fire, ''));
        const g = v(ve.general, em.general);
        if (g && g !== v(ve.police, em.police)) line(L('gen'), g);
        line(L('tourist'), v(ve.tourist_police, ''));
        break;
      }
      case 'plug': {
        head(L('plug'));
        const pl = intel.plugs || {};
        line(L('plug'), `${list(pl.types).join(', ')}${pl.voltage ? ` · ${pl.voltage}` : ''}${pl.frequency ? ` / ${pl.frequency}` : ''}`);
        if (typeof pl.needsAdapterFromTR === 'boolean') out.push(pl.needsAdapterFromTR ? L('adapterY') : L('adapterN'));
        if (s(pl.socketDesc)) out.push(s(pl.socketDesc));
        break;
      }
      case 'water': {
        head(L('water'));
        const w = intel.waterAndHealth || {};
        if (typeof w.tapWaterSafe === 'boolean') line(L('water'), w.tapWaterSafe ? L('waterY') : L('waterN'));
        if (s(w.tapWaterDesc)) out.push(s(w.tapWaterDesc));
        line(L('vaccines'), list(w.vaccines).join(', '));
        break;
      }
      case 'tip': {
        head(L('tip'));
        if (s(enc.economy?.tippingCulture)) out.push(s(enc.economy.tippingCulture));
        if (s(intel.tipping?.note)) out.push(s(intel.tipping.note));
        break;
      }
      case 'taxi': {
        head(L('taxi'));
        line(L('apps'), list(ins.transport?.popularRideApps).join(', '));
        line(L('ticket'), s(ins.transport?.singleTicketUsd));
        if (s(ins.transport?.taxiAdvice)) out.push(s(ins.transport.taxiAdvice));
        if (s(ins.transport?.transportQuality)) out.push(s(ins.transport.transportQuality));
        break;
      }
      case 'money': {
        head(L('money'));
        line(L('currency'), s(ins.currency));
        if (s(enc.economy?.paymentCulture)) out.push(s(enc.economy.paymentCulture));
        break;
      }
      case 'season': {
        head(L('season'));
        out.push(s(ins.bestMonths) || s(enc.tourism?.bestSeasons));
        break;
      }
      case 'budget': {
        head(L('budget'));
        const lc = ins.livingCosts || {};
        line(L('budgetB'), s(lc.dailyBudgetBackpackerUsd));
        line(L('budgetM'), s(lc.dailyBudgetMidrangeUsd));
        line(L('meal'), s(lc.budgetMealUsd));
        line(L('coffee'), s(lc.coffeeUsd));
        line(L('hotel'), s(lc.hotel3StarUsd));
        break;
      }
      case 'esim': {
        head(L('esim'));
        line(L('esim'), s(ins.internet?.esimAvailability));
        line(L('speed'), ins.internet?.mobileSpeedMbps ? `${ins.internet.mobileSpeedMbps} Mbps` : '');
        if (s(ins.internet?.networkCoverage)) out.push(s(ins.internet.networkCoverage));
        if (s(intel.connectivity?.airportSimTrapWarning)) out.push(s(intel.connectivity.airportSimTrapWarning));
        break;
      }
      case 'vat': {
        head(L('vat'));
        const tf = intel.taxFree || {};
        line(L('vat'), s(tf.vatRefundPercent));
        line(L('minSpend'), s(tf.minSpend));
        if (s(tf.customsNote)) out.push(s(tf.customsNote));
        break;
      }
      case 'food': {
        head(L('food'));
        for (const x of list(enc.gastronomy?.famousDishes).slice(0, 6)) out.push(`• ${x}`);
        line(L('drinks'), list(enc.gastronomy?.traditionalDrinks).slice(0, 4).join(', '));
        break;
      }
      case 'route': {
        head(`${L('route')}${s(itin.routeName) ? `: ${s(itin.routeName)}` : ''}`);
        if (s(itin.routeSummary)) out.push(s(itin.routeSummary));
        (Array.isArray(itin.stops) ? itin.stops : []).forEach((st: { name?: string; durationBadge?: string }, i: number) =>
          out.push(`${i + 1}. ${s(st.name).replace(/^[^:]{1,20}:\s*/, '')}${s(st.durationBadge) ? ` (${s(st.durationBadge)})` : ''}`)
        );
        break;
      }
      case 'places': {
        head(L('places'));
        for (const x of list(enc.tourism?.mustSeePlaces).slice(0, 8)) out.push(`• ${x}`);
        break;
      }
      case 'language': {
        head(L('language'));
        if (s(enc.language?.officialLanguages)) out.push(s(enc.language.officialLanguages));
        line(L('english'), s(enc.language?.englishProficiency));
        const ph = Array.isArray(enc.language?.phrases) ? enc.language.phrases : [];
        if (ph.length) {
          out.push(`**${L('phrases')}:**`);
          for (const x of ph.slice(0, 5)) out.push(`• ${sx(x.phrase)} – ${s(x.translation) || s(x.meaning)}`);
        }
        break;
      }
      case 'scam': {
        head(L('scam'));
        const sc = Array.isArray(intel.touristScams) ? intel.touristScams : [];
        for (const x of sc.slice(0, 4)) out.push(`• **${s(x.title)}:** ${s(x.desc)}${s(x.tip) ? ` ${s(x.tip)}` : ''}`);
        for (const x of list(ins.safety?.commonScams).slice(0, sc.length ? 0 : 4)) out.push(`• ${x}`);
        break;
      }
    }
  }

  const actions: AssistantActionPill[] = [{ id: `open-${code}`, type: 'open_country', countryCode: code, label: `${flag} ${L('open')}`, accentTone: 'teal' }];
  // Konuya uygun tek ortaklık önerisi (abartmadan): vize gerekiyorsa başvuru, gezi sorusunda tur, güvenlikte sigorta…
  const partner = topicPartner(topics, code, lang, passport, city);
  if (partner) actions.push(partner);
  // Bu ülke ve pasaport için güncel rehber varsa (ör. Karadağ vizesi 2026) onu da öner
  if (topics.includes('visa') || topics.includes('id')) {
    const { guidesForCountry } = await import('../data/guides');
    const g = guidesForCountry(code, lang, passport).find((x) => (GUIDE_LABELS[lang] || {})[x]);
    if (g) actions.splice(1, 0, { id: `guide-${g}`, type: 'goto', path: `/${lang}/info/${g}`, label: GUIDE_LABELS[lang][g].t, accentTone: 'teal' });
  }
  if (topics.includes('tip')) actions.push({ id: 'tool-tipping', type: 'open_tool', toolKey: 'tipping', label: L('tipBtn'), accentTone: 'amber' });
  if (topics.includes('plug')) actions.push({ id: 'tool-packing', type: 'open_tool', toolKey: 'packing', label: L('packBtn'), accentTone: 'sky' });

  return { text: out.filter((x, i, a) => !(x === '' && (i === 0 || a[i - 1] === ''))).join('\n'), actions: actions.slice(0, 3), topics };
}
