/**
 * Asistanın rezervasyon, rota ve site kısayolu katmanı.
 * Sorudaki niyeti (uçuş, otel, tur, araç, transfer, eSIM, sigorta, vize başvurusu, rota) bulur;
 * ilgili site aracını ve en fazla 1–2 ortaklık bağlantısını önerir. Ortaklık bağlantıları sitenin
 * diğer yerlerinde kullanılan tpPartners yardımcılarıyla aynıdır.
 */
import { CITY_IATA } from '../data/cityIata';
import type { AssistantActionPill } from './aiAssistantEngine';
import { getCountryName, getFlag, getCategoryBadgeLabel } from '../data/passportData';
import { getPassportItems } from '../utils/calculator';
import { GEO_DATA } from '../data/geoData';
import { tpLinks, s22Cars } from '../data/tpPartners';

export type Intent = 'flight' | 'hotel' | 'tour' | 'car' | 'transfer' | 'esim' | 'insurance' | 'visaApply' | 'route' | 'ground' | 'cheapest';
type Lang = 'tr' | 'en' | 'de' | 'es' | 'ru';

const INTENTS: Array<[Intent, RegExp]> = [
  ['cheapest', /((en )?ucuz .{0,20}(gun|tarih|zaman)|hangi gun .{0,15}ucuz|ne zaman .{0,10}ucuz|cheapest .{0,15}(day|date|time|month)|when .{0,15}cheap|gunstigste\S* .{0,10}(tag|termin|zeit)|(dia|fecha) mas barat|mas barato .{0,10}(dia|fecha)|сам\S* дешев\S* .{0,10}(день|дат|месяц)|когда .{0,10}дешев)/],
  ['flight', /(^| )(ucak|ucus|ucuslar|ucar|ucarim|ucmak|ucuyorum|ucak bilet|bilet|havayolu|flight|flights|fly|airfare|plane ticket|airline|flug|fluge|fluege|flugticket|vuelo|vuelos|billete de avion|авиа|перел[её]т|самол[её]т|билет)/],
  ['hotel', /(^| )(otel|oteller|konaklama|kalacak yer|nerede kal|nerde kal|hangi bolgede kal|hostel|pansiyon|apart|airbnb|hotel|hotels|stay|accommodation|where to stay|where should i stay|unterkunft|ubernachtung|ubernachten|wo schlafen|alojamiento|alojarme|alojarse|hospedaje|donde dormir|donde quedarme|отел|жиль|гостиниц|где жить|где остановит)/],
  ['tour', /(^| )(tur |turlar|turu|tura|gezi turu|aktivite|etkinlik|giris bileti|muze bilet|tour|tours|activity|activities|excursion|day trip|ausflug|fuhrung|touren|excursion|excursiones|actividad|экскурс|тур )/],
  ['car', /(araba kira|arac kira|oto kira|rent a car|car rental|rental car|hire a car|mietwagen|auto mieten|alquiler de coche|alquilar coche|аренд\S* (авто|машин)|прокат авто)/],
  ['transfer', /(^| )(transfer|havalimanindan|havalimani transfer|airport transfer|airport pickup|from the airport|flughafentransfer|vom flughafen|traslado|desde el aeropuerto|трансфер|из аэропорта)/],
  ['esim', /(^| )(esim|e sim|sim kart|internet paketi|mobile data|roaming|datos moviles|mobile daten|сим карт|мобильн\S* интернет)/],
  ['insurance', /(^| )(sigorta|insurance|versicherung|seguro de viaje|seguro medico|страхов)/],
  ['visaApply', /(vize basvur|vizeye basvur|vize nasil alinir|vize almak|vize islemleri|apply for (a )?visa|visa application|get a visa|visumantrag|visum beantragen|solicitar (el )?visado|tramitar visado|оформ\S* виз|подать на виз)/],
  ['route', /(^| )(rota|rotasi|gezi plan|tatil plan|kac gun|gunluk plan|\d+ gun|itinerary|route|trip plan|plan my trip|\d+ days?|reiseroute|reiseplan|\d+ tage|itinerario|ruta|\d+ dias|маршрут|план поездки|\d+ дн)/],
  ['ground', /(^| )(tren|otobus|feribot|train|bus|ferry|zug|fahre|autobus|ferri|поезд|автобус|паром)/]
];

export function detectIntents(norm: string): Intent[] {
  const found = INTENTS.filter(([, re]) => re.test(norm)).map(([k]) => k);
  // "otobüs bileti" / "tren bileti": uçuş değil
  if (found.includes('ground') && found.includes('flight') && !/(ucak|ucus|flight|flug|vuelo|авиа|самол)/.test(norm)) return found.filter((x) => x !== 'flight');
  return found;
}

/** Genel rezervasyon sorusu ("rezervasyon", "tatil", "booking") */
export const isGeneralBooking = (norm: string) => /(^| )(rezervasyon|tatil|booking|book a trip|buchen|buchung|reservar|reserva|бронир)/.test(norm);

const L5 = (lang: string, tr: string, en: string, de: string, es: string, ru: string) => ({ tr, en, de, es, ru } as Record<string, string>)[lang] ?? en;

const slug = (s: string) => s.toLowerCase().replace(/&/g, 'and').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Ülkenin vize durumu tek satırda: "Türkiye pasaportuyla Japonya: 90 Gün Vizesiz" */
export function visaLine(code: string, passport: string, lang: string): string {
  if (code === passport) return '';
  const it = getPassportItems(passport).find((x) => x.c === code);
  if (!it) return '';
  return L5(lang,
    `${getCountryName(passport, lang)} pasaportuyla ${getCountryName(code, lang)}: **${getCategoryBadgeLabel(it, lang)}**`,
    `${getCountryName(code, lang)} with a ${getCountryName(passport, lang)} passport: **${getCategoryBadgeLabel(it, lang)}**`,
    `${getCountryName(code, lang)} mit Pass aus ${getCountryName(passport, lang)}: **${getCategoryBadgeLabel(it, lang)}**`,
    `${getCountryName(code, lang)} con pasaporte de ${getCountryName(passport, lang)}: **${getCategoryBadgeLabel(it, lang)}**`,
    `${getCountryName(code, lang)}, паспорт ${getCountryName(passport, lang)}: **${getCategoryBadgeLabel(it, lang)}**`);
}

export const needsVisa = (code: string, passport: string) => {
  const it = getPassportItems(passport).find((x) => x.c === code);
  return !!it && it.cat === 'visa';
};

/** Ortaklık bağlantısı: niyet + ülke (+ şehir). Sitenin diğer yerlerindeki bağlantılarla aynı. */
export function partnerPill(intent: Intent, code: string | null, lang: string, passport: string, city = ''): AssistantActionPill | null {
  const nameEn = code ? getCountryName(code, 'en') : '';
  const place = city || (code ? GEO_DATA[code]?.capital || nameEn : '');
  const where = city || (code ? getCountryName(code, lang) : '');
  // şehir sorulduysa o şehrin havalimanı (ör. Mardin → MQM); iç hatta varış İstanbul ise kalkış Ankara
  const cityHub = city ? CITY_IATA[city.toLocaleLowerCase('tr').replace(/ı/g, 'i').normalize('NFD').replace(/[\u0300-\u036f]/g, '')] : undefined;
  const homeHub = GEO_DATA[passport]?.mainHub?.split('/')[0];
  const toHub = cityHub || (code ? GEO_DATA[code]?.mainHub?.split('/')[0] : undefined);
  const fromHub = homeHub && homeHub === toHub ? (homeHub === 'IST' ? 'ESB' : 'IST') : homeHub;
  const base = { type: 'affiliate' as const };
  switch (intent) {
    case 'flight':
    case 'cheapest':
      return { ...base, id: 'aff-flight', url: tpLinks.flights(fromHub, toHub), label: where ? L5(lang, `${where} uçuşları`, `Flights to ${where}`, `Flüge nach ${where}`, `Vuelos a ${where}`, `Билеты: ${where}`) : L5(lang, 'Uçuş ara', 'Search flights', 'Flüge suchen', 'Buscar vuelos', 'Найти билеты'), accentTone: 'sky' };
    case 'hotel':
      if (!place) return null;
      return { ...base, id: 'aff-hotel', url: tpLinks.booking(place), label: L5(lang, `${where} otelleri`, `Hotels in ${where}`, `Hotels in ${where}`, `Hoteles en ${where}`, `Отели: ${where}`), accentTone: 'teal' };
    case 'tour':
    case 'route':
      if (!place) return null;
      return { ...base, id: 'aff-tour', url: tpLinks.tours(place), label: L5(lang, `${where} turları`, `Tours in ${where}`, `Touren in ${where}`, `Tours en ${where}`, `Экскурсии: ${where}`), accentTone: 'amber' };
    case 'car':
      if (!place) return null;
      return { ...base, id: 'aff-car', url: s22Cars(place, undefined, undefined, 'assistant').booking, label: L5(lang, `${where} araç kiralama`, `Car rental in ${where}`, `Mietwagen in ${where}`, `Alquiler de coches en ${where}`, `Аренда авто: ${where}`), accentTone: 'slate' };
    case 'transfer':
      return { ...base, id: 'aff-transfer', url: tpLinks.kiwitaxi(), label: L5(lang, 'Havalimanı transferi', 'Airport transfer', 'Flughafentransfer', 'Traslado al aeropuerto', 'Трансфер из аэропорта'), accentTone: 'slate' };
    case 'esim':
      if (!nameEn) return { ...base, id: 'aff-esim', url: tpLinks.nomad(), label: 'eSIM', accentTone: 'sky' };
      return { ...base, id: 'aff-esim', url: tpLinks.airalo(slug(nameEn)), label: L5(lang, `${where} eSIM`, `${where} eSIM`, `eSIM ${where}`, `eSIM ${where}`, `eSIM: ${where}`), accentTone: 'sky' };
    case 'insurance':
      return { ...base, id: 'aff-ins', url: tpLinks.safetywing(), label: L5(lang, 'Seyahat sağlık sigortası', 'Travel medical insurance', 'Reisekrankenversicherung', 'Seguro médico de viaje', 'Медицинская страховка'), accentTone: 'coral' };
    case 'visaApply':
      if (code && !needsVisa(code, passport)) return null;
      return { ...base, id: 'aff-visahq', url: 'https://vizamigo.visahq.net/', label: L5(lang, 'Vize başvurusu (VisaHQ)', 'Visa application (VisaHQ)', 'Visumantrag (VisaHQ)', 'Solicitud de visado (VisaHQ)', 'Оформление визы (VisaHQ)'), accentTone: 'coral' };
    default:
      return null;
  }
}

/** Ülke cevabının konusuna göre tek, ölçülü ortaklık önerisi. */
export function topicPartner(topics: string[], code: string, lang: string, passport: string, city = ''): AssistantActionPill | null {
  const t = (k: string) => topics.includes(k);
  if (t('visa') || t('id')) return needsVisa(code, passport) ? partnerPill('visaApply', code, lang, passport) : partnerPill('flight', code, lang, passport, city);
  if (t('safety') || t('sos') || t('water') || t('scam')) return partnerPill('insurance', code, lang, passport);
  if (t('places') || t('route') || t('food') || t('language')) return partnerPill('tour', code, lang, passport, city);
  if (t('taxi')) return partnerPill('transfer', code, lang, passport);
  if (t('esim')) return partnerPill('esim', code, lang, passport);
  if (t('budget') || t('money') || t('vat') || t('tip')) return partnerPill('hotel', code, lang, passport, city);
  if (t('season')) return partnerPill('flight', code, lang, passport, city);
  return partnerPill('hotel', code, lang, passport, city);
}

/** Ülkenin rezervasyon sayfası (BookingHub: uçuş, en ucuz gün, otel, tur, araç) */
export const bookPill = (code: string, lang: string): AssistantActionPill => ({
  id: `book-${code}`, type: 'open_country', countryCode: code, view: 'book',
  label: L5(lang, `${getFlag(code)} ${getCountryName(code, lang)} rezervasyon sayfası`, `${getFlag(code)} Book ${getCountryName(code, lang)}`, `${getFlag(code)} ${getCountryName(code, lang)} buchen`, `${getFlag(code)} Reservar ${getCountryName(code, lang)}`, `${getFlag(code)} Бронирование: ${getCountryName(code, lang)}`),
  accentTone: 'teal'
});
export const tilePill = (id: string, tab: 'explore' | 'plan' | 'track' | 'nomad' | 'profile', tile: string, label: string, tone: AssistantActionPill['accentTone'] = 'sky'): AssistantActionPill => ({ id, type: 'open_tile', tab, tile, label, accentTone: tone });

/** Sitenin özellikleri ve kısayolları (yardım cevabı ve yapay zekâ bağlamı için) */
export function siteFeatures(lang: string): Array<{ text: string; pill?: AssistantActionPill }> {
  const f = (tr: string, en: string, de: string, es: string, ru: string) => L5(lang, tr, en, de, es, ru);
  return [
    { text: f('**Ülke sayfaları:** 199 ülke için vize, giriş şartı, güvenlik, priz, para, bütçe, rota, yemek, acil numaralar', '**Country pages:** visa, entry rules, safety, plugs, money, budget, itineraries, food and emergency numbers for 199 countries', '**Länderseiten:** Visum, Einreise, Sicherheit, Stecker, Geld, Budget, Routen, Essen, Notrufe für 199 Länder', '**Páginas de país:** visado, requisitos, seguridad, enchufes, dinero, presupuesto, rutas, comida y emergencias de 199 países', '**Страницы стран:** визы, правила въезда, безопасность, розетки, деньги, бюджет, маршруты, еда, экстренные номера (199 стран)') },
    { text: f('**Rezervasyon:** her ülke sayfasında uçuş, en ucuz gün takvimi, otel, tur, araç ve transfer', '**Booking:** flights, cheapest-day calendar, hotels, tours, cars and transfers on every country page', '**Buchen:** Flüge, Günstigste-Tage-Kalender, Hotels, Touren, Mietwagen und Transfers auf jeder Länderseite', '**Reservas:** vuelos, calendario de días baratos, hoteles, tours, coches y traslados en cada país', '**Бронирование:** авиабилеты, календарь дешёвых дней, отели, экскурсии, авто и трансферы на странице страны') },
    { text: f('**Seyahat planlayıcı:** uçuş fiyatı, otel ve toplam bütçe; çok şehirli rota', '**Trip planner:** flight price, hotel and total budget; multi-city trips', '**Reiseplaner:** Flugpreis, Hotel und Gesamtbudget; Mehrstädtereisen', '**Planificador:** precio de vuelo, hotel y presupuesto total; multidestino', '**Планировщик:** цена билетов, отель и общий бюджет; несколько городов'), pill: tilePill('tile-trip', 'nomad', 'trip', f('Seyahat planlayıcı', 'Trip planner', 'Reiseplaner', 'Planificador', 'Планировщик'), 'teal') },
    { text: f('**Rota planlayıcı:** ülkeler arası rota, hazır rotalar, transit kuralları', '**Route planner:** multi-country routes, ready-made routes, transit rules', '**Routenplaner:** Länderrouten, fertige Routen, Transitregeln', '**Rutas:** rutas entre países, rutas listas, reglas de tránsito', '**Маршруты:** между странами, готовые маршруты, транзит'), pill: tilePill('tile-planner', 'plan', 'planner', f('Rota planlayıcı', 'Route planner', 'Routenplaner', 'Planificador de rutas', 'Маршрут')) },
    { text: f('**Turlar:** paket ve günlük turlar', '**Tours:** packages and day trips', '**Touren:** Pakete und Tagestouren', '**Tours:** paquetes y excursiones', '**Туры:** пакеты и экскурсии'), pill: { id: 'go-tours', type: 'goto', path: 'tours', label: f('Turlar', 'Tours', 'Touren', 'Tours', 'Туры'), accentTone: 'amber' } },
    { text: f('**Nereye gidebilirim:** pasaportuna göre vizesiz ülkeler ve harita', '**Where can I go:** visa-free countries for your passport, with a map', '**Wohin kann ich:** visumfreie Länder für deinen Pass mit Karte', '**¿Adónde puedo ir?:** países sin visado para tu pasaporte, con mapa', '**Куда можно:** безвизовые страны для вашего паспорта и карта'), pill: tilePill('tile-where', 'explore', 'where', f('Nereye gidebilirim?', 'Where can I go?', 'Wohin kann ich?', '¿Adónde puedo ir?', 'Куда можно?')) },
    { text: f('**Pasaport karşılaştırma** ve **Schengen 90/180 gün sayacı**', '**Passport comparison** and the **Schengen 90/180 counter**', '**Passvergleich** und **Schengen-90/180-Rechner**', '**Comparar pasaportes** y **contador Schengen 90/180**', '**Сравнение паспортов** и **счётчик Шенгена 90/180**'), pill: tilePill('tile-days', 'track', 'days', f('90/180 gün sayacı', '90/180 counter', '90/180-Rechner', 'Contador 90/180', 'Счётчик 90/180')) },
    { text: f('**Araçlar:** bavul ve evrak listesi, döviz çevirici, bahşiş, priz ve eSIM, acil durum, pasaport kaybı', '**Tools:** packing and document lists, currency converter, tipping, plugs and eSIM, emergency, lost passport', '**Tools:** Pack- und Dokumentenliste, Währungsrechner, Trinkgeld, Stecker & eSIM, Notfall, Passverlust', '**Herramientas:** listas de maleta y documentos, divisas, propinas, enchufes y eSIM, emergencias, pasaporte perdido', '**Инструменты:** списки вещей и документов, валюта, чаевые, розетки и eSIM, экстренные случаи, утеря паспорта'), pill: tilePill('tile-docs', 'nomad', 'docs', f('Evrak listesi', 'Document checklist', 'Dokumentenliste', 'Documentos', 'Документы')) },
    { text: f('**Cüzdan:** belgelerin, biletlerin, bütçen ve geçerlilik uyarıları', '**Wallet:** your documents, tickets, budget and expiry alerts', '**Wallet:** Dokumente, Tickets, Budget und Ablaufwarnungen', '**Cartera:** documentos, billetes, presupuesto y avisos de caducidad', '**Кошелёк:** документы, билеты, бюджет и напоминания') },
    { text: f('**Dijital göçebe vizeleri** ve göçebe merkezleri', '**Digital nomad visas** and nomad hubs', '**Visa für digitale Nomaden** und Nomaden-Hubs', '**Visados de nómada digital** y hubs', '**Визы цифровых кочевников** и хабы') }
  ];
}
