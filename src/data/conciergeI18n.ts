// Translations of the travel-concierge partner texts (travelConciergeEngine.ts).
// The engine builds Turkish and English strings; these templates turn the English one into de/es/ru/pt.
import { getCountryName } from './passportData';
import { GEO_DATA } from './geoData';
import { capitalName } from './capitalNames';
import { ptArticles } from '../i18n/ptArticles';

type Tr = { de: string; es: string; ru: string; pt: string };
const ROWS: [string, Tr][] = [
 [
  "Compare {route}{hub} fares across hundreds of airlines",
  {
   "pt": "Compare tarifas {route}{hub} em centenas de companhias aéreas",
   "es": "Compara tarifas {route}{hub} en cientos de aerolíneas",
   "de": "Vergleiche Flugpreise {route}{hub} bei Hunderten Airlines",
   "ru": "Сравните цены {route}{hub} у сотен авиакомпаний"
  }
 ],
 [
  "Compare {route}{hub} fares across hundreds of sites",
  {
   "pt": "Compare tarifas {route}{hub} em centenas de sites",
   "es": "Compara tarifas {route}{hub} en cientos de webs",
   "de": "Vergleiche Flugpreise {route}{hub} auf Hunderten Portalen",
   "ru": "Сравните цены {route}{hub} на сотнях сайтов"
  }
 ],
 [
  "Combines different airlines into cheaper multi-carrier routes",
  {
   "pt": "Combina companhias diferentes em rotas mais baratas",
   "es": "Combina aerolíneas distintas en rutas más baratas",
   "de": "Kombiniert verschiedene Airlines zu günstigeren Verbindungen",
   "ru": "Объединяет разные авиакомпании в более дешёвые маршруты"
  }
 ],
 [
  "Trains, buses and ferries within and around {country}",
  {
   "pt": "Trens, ônibus e balsas dentro e ao redor de {country}",
   "es": "Trenes, autobuses y ferris dentro y alrededor de {country}",
   "de": "Züge, Busse und Fähren in und um {country}",
   "ru": "Поезда, автобусы и паромы — направление: {country} и окрестности"
  }
 ],
 [
  "Hotels in {capital}; also handy as proof of stay for visa applications",
  {
   "pt": "Hotéis em {capital}; também servem como comprovante de hospedagem para o visto",
   "es": "Hoteles en {capital}; también sirven como prueba de alojamiento para el visado",
   "de": "Hotels in {capital}; auch praktisch als Unterkunftsnachweis für den Visumantrag",
   "ru": "Отели в городе {capital}; подходят и как подтверждение проживания для визы"
  }
 ],
 [
  "Extra hotel discounts when booked with a flight",
  {
   "pt": "Descontos extras em hotel ao reservar junto com o voo",
   "es": "Descuentos extra en hotel al reservar con el vuelo",
   "de": "Zusätzliche Hotelrabatte bei Buchung mit Flug",
   "ru": "Дополнительные скидки на отель при бронировании вместе с перелётом"
  }
 ],
 [
  "Hotel + flight packages and member prices",
  {
   "pt": "Pacotes de hotel + voo e preços para membros",
   "es": "Paquetes de hotel + vuelo y precios para miembros",
   "de": "Hotel- und Flugpakete sowie Mitgliederpreise",
   "ru": "Пакеты «отель + перелёт» и цены для участников"
  }
 ],
 [
  "Hostels and social stays for solo travellers and nomads",
  {
   "pt": "Hostels e hospedagens sociais para quem viaja sozinho e nômades",
   "es": "Hostales y alojamientos sociales para viajeros solos y nómadas",
   "de": "Hostels und gesellige Unterkünfte für Alleinreisende und Nomaden",
   "ru": "Хостелы и жильё для общения — для соло-путешественников и номадов"
  }
 ],
 [
  "Meet & greet from {hub} airport to your hotel at a fixed price",
  {
   "pt": "Recepção no aeroporto de {hub} até o hotel com preço fixo",
   "es": "Recogida en el aeropuerto de {hub} hasta tu hotel a precio fijo",
   "de": "Abholung am Flughafen {hub} bis zum Hotel zum Festpreis",
   "ru": "Встреча в аэропорту {hub} и трансфер до отеля по фиксированной цене"
  }
 ],
 [
  "Compare hundreds of rental companies across {country}",
  {
   "pt": "Compare centenas de locadoras em {country}",
   "es": "Compara cientos de empresas de alquiler en {country}",
   "de": "Hunderte Mietwagenfirmen in {country} vergleichen",
   "ru": "Сравните сотни прокатных компаний — направление: {country}"
  }
 ],
 [
  "Compare rental companies across {country}; free-cancellation options",
  {
   "pt": "Compare locadoras em {country}; opções com cancelamento grátis",
   "es": "Compara empresas de alquiler en {country}; opciones con cancelación gratis",
   "de": "Mietwagenfirmen in {country} vergleichen; mit kostenloser Stornierung",
   "ru": "Сравните прокатные компании — направление: {country}; варианты с бесплатной отменой"
  }
 ],
 [
  "Compare rental car prices with airport pick-up",
  {
   "pt": "Compare preços de aluguel de carro com retirada no aeroporto",
   "es": "Compara precios de alquiler de coches con recogida en el aeropuerto",
   "de": "Mietwagenpreise mit Abholung am Flughafen vergleichen",
   "ru": "Сравните цены аренды авто с получением в аэропорту"
  }
 ],
 [
  "Local rental firms, often without deposit or credit card",
  {
   "pt": "Locadoras locais, muitas vezes sem caução nem cartão de crédito",
   "es": "Empresas de alquiler locales, a menudo sin fianza ni tarjeta de crédito",
   "de": "Lokale Vermieter, oft ohne Kaution oder Kreditkarte",
   "ru": "Местные прокаты, часто без залога и кредитной карты"
  }
 ],
 [
  "Desert safaris, city tours, cruises and attraction tickets in {country}",
  {
   "pt": "Safáris no deserto, city tours, cruzeiros e ingressos de atrações em {country}",
   "es": "Safaris por el desierto, tours por la ciudad, cruceros y entradas a atracciones en {country}",
   "de": "Wüstensafaris, Stadttouren, Bootsfahrten und Tickets für Sehenswürdigkeiten in {country}",
   "ru": "Сафари по пустыне, городские туры, круизы и билеты на достопримечательности — направление: {country}"
  }
 ],
 [
  "Tours, museum tickets and day trips in {country}",
  {
   "pt": "Passeios, ingressos de museus e bate-voltas em {country}",
   "es": "Tours, entradas a museos y excursiones de un día en {country}",
   "de": "Touren, Museumstickets und Tagesausflüge in {country}",
   "ru": "Туры, билеты в музеи и однодневные поездки — направление: {country}"
  }
 ],
 [
  "Experiences picked by traveller reviews",
  {
   "pt": "Experiências escolhidas pelas avaliações dos viajantes",
   "es": "Experiencias elegidas por las opiniones de viajeros",
   "de": "Erlebnisse nach Bewertungen von Reisenden",
   "ru": "Впечатления, отобранные по отзывам путешественников"
  }
 ],
 [
  "Tours, day trips and activities in {country}",
  {
   "pt": "Passeios, bate-voltas e atividades em {country}",
   "es": "Tours, excursiones y actividades en {country}",
   "de": "Touren, Tagesausflüge und Aktivitäten in {country}",
   "ru": "Туры, однодневные поездки и развлечения — направление: {country}"
  }
 ],
 [
  "Dated, guided multi-day tours in {country}, with discounted departures",
  {
   "pt": "Tours guiados de vários dias em {country}, com datas fixas e saídas com desconto",
   "es": "Circuitos guiados de varios días en {country}, con fechas fijas y salidas con descuento",
   "de": "Geführte Rundreisen in {country} mit festen Terminen und rabattierten Abfahrten",
   "ru": "Многодневные туры с гидом по фиксированным датам и скидками — направление: {country}"
  }
 ],
 [
  "One pass for dozens of museums and sights",
  {
   "pt": "Um passe para dezenas de museus e atrações",
   "es": "Un pase para decenas de museos y lugares de interés",
   "de": "Ein Pass für Dutzende Museen und Sehenswürdigkeiten",
   "ru": "Один пропуск в десятки музеев и достопримечательностей"
  }
 ],
 [
  "Self-guided audio tours on your phone",
  {
   "pt": "Audioguias no celular para fazer o passeio por conta própria",
   "es": "Audioguías en el móvil para visitar por tu cuenta",
   "de": "Audiotouren auf dem Handy für eigene Erkundungen",
   "ru": "Аудиогиды в телефоне для самостоятельных прогулок"
  }
 ],
 [
  "Prepaid eSIM for {country}, installed by QR code",
  {
   "pt": "eSIM pré-pago para {country}, instalado por QR code",
   "es": "eSIM prepago para {country}, se instala con código QR",
   "de": "Prepaid-eSIM für {country}, per QR-Code installiert",
   "ru": "Предоплаченная eSIM — {country}, установка по QR-коду"
  }
 ],
 [
  "Regional and global plans for multi-country trips",
  {
   "pt": "Planos regionais e globais para viagens por vários países",
   "es": "Planes regionales y globales para viajes por varios países",
   "de": "Regionale und weltweite Tarife für Reisen durch mehrere Länder",
   "ru": "Региональные и глобальные тарифы для поездок по нескольким странам"
  }
 ],
 [
  "Data plan for {country}, installed by QR code before you fly",
  {
   "pt": "Plano de dados para {country}, instalado por QR code antes do voo",
   "es": "Plan de datos para {country}, se instala con QR antes de volar",
   "de": "Datentarif für {country}, vor dem Abflug per QR-Code installiert",
   "ru": "Тариф с интернетом — {country}, установка по QR-коду до вылета"
  }
 ],
 [
  "eSIM on {country} local carrier networks",
  {
   "pt": "eSIM nas redes das operadoras locais de {country}",
   "es": "eSIM en las redes de los operadores locales de {country}",
   "de": "eSIM in den Netzen lokaler Anbieter in {country}",
   "ru": "eSIM в сетях местных операторов — {country}"
  }
 ],
 [
  "eSIM with built-in security, by the NordVPN team",
  {
   "pt": "eSIM com segurança integrada, da equipe do NordVPN",
   "es": "eSIM con seguridad integrada, del equipo de NordVPN",
   "de": "eSIM mit integrierter Sicherheit, vom NordVPN-Team",
   "ru": "eSIM со встроенной защитой от команды NordVPN"
  }
 ],
 [
  "Medical cover for travellers and nomads; you can buy it even after your trip has started",
  {
   "pt": "Cobertura médica para viajantes e nômades; dá para contratar mesmo depois de a viagem começar",
   "es": "Cobertura médica para viajeros y nómadas; puedes contratarla incluso con el viaje ya empezado",
   "de": "Krankenschutz für Reisende und Nomaden; auch nach Reisebeginn abschließbar",
   "ru": "Медицинская страховка для путешественников и номадов; можно оформить даже после начала поездки"
  }
 ],
 [
  "Compare travel insurance in 20+ languages; also checks what your card already covers",
  {
   "pt": "Compare seguros viagem em mais de 20 idiomas; também verifica o que seu cartão já cobre",
   "es": "Compara seguros de viaje en más de 20 idiomas; también revisa lo que ya cubre tu tarjeta",
   "de": "Reiseversicherungen in über 20 Sprachen vergleichen; prüft auch, was deine Karte schon abdeckt",
   "ru": "Сравнение страховок на 20+ языках; также проверяет, что уже покрывает ваша карта"
  }
 ],
 [
  "Flight delayed, cancelled or bag lost? Claim your compensation",
  {
   "pt": "Voo atrasado, cancelado ou mala extraviada? Peça sua indenização",
   "es": "¿Vuelo retrasado, cancelado o maleta perdida? Reclama tu compensación",
   "de": "Flug verspätet, annulliert oder Gepäck verloren? Entschädigung fordern",
   "ru": "Рейс задержали, отменили или потеряли багаж? Получите компенсацию"
  }
 ],
 [
  "Check delay, cancellation or missed-connection compensation with a second service",
  {
   "pt": "Verifique indenização por atraso, cancelamento ou conexão perdida com um segundo serviço",
   "es": "Comprueba la compensación por retraso, cancelación o conexión perdida con un segundo servicio",
   "de": "Entschädigung für Verspätung, Annullierung oder verpassten Anschluss mit einem zweiten Dienst prüfen",
   "ru": "Проверьте компенсацию за задержку, отмену или пропущенную стыковку через второй сервис"
  }
 ],
 [
  "Claim up to €600 for delayed or cancelled European flights",
  {
   "pt": "Peça até € 600 por voos europeus atrasados ou cancelados",
   "es": "Reclama hasta 600 € por vuelos europeos retrasados o cancelados",
   "de": "Bis zu 600 € für verspätete oder annullierte Flüge in Europa fordern",
   "ru": "Получите до 600 € за задержанные или отменённые рейсы в Европе"
  }
 ],
 [
  "Store your bags in the city before check-in or after check-out",
  {
   "pt": "Guarde as malas na cidade antes do check-in ou depois do check-out",
   "es": "Guarda tus maletas en la ciudad antes del check-in o después del check-out",
   "de": "Gepäck in der Stadt vor dem Check-in oder nach dem Check-out lagern",
   "ru": "Оставьте багаж в городе до заселения или после выезда"
  }
 ],
 [
  "Cheapest flights",
  {
   "pt": "Voos mais baratos",
   "es": "Vuelos más baratos",
   "de": "Günstigste Flüge",
   "ru": "Самые дешёвые рейсы"
  }
 ],
 [
  "Price comparison",
  {
   "pt": "Comparação de preços",
   "es": "Comparador de precios",
   "de": "Preisvergleich",
   "ru": "Сравнение цен"
  }
 ],
 [
  "Smart layovers",
  {
   "pt": "Conexões inteligentes",
   "es": "Escalas inteligentes",
   "de": "Clevere Umstiege",
   "ru": "Удобные пересадки"
  }
 ],
 [
  "Rail, bus & ferry",
  {
   "pt": "Trem, ônibus e balsa",
   "es": "Tren, autobús y ferri",
   "de": "Bahn, Bus & Fähre",
   "ru": "Поезд, автобус и паром"
  }
 ],
 [
  "Free cancellation",
  {
   "pt": "Cancelamento grátis",
   "es": "Cancelación gratis",
   "de": "Kostenlose Stornierung",
   "ru": "Бесплатная отмена"
  }
 ],
 [
  "Bundle with flights",
  {
   "pt": "Junto com o voo",
   "es": "Con el vuelo",
   "de": "Mit Flug kombinieren",
   "ru": "Вместе с перелётом"
  }
 ],
 [
  "Package deals",
  {
   "pt": "Pacotes",
   "es": "Paquetes",
   "de": "Pauschalangebote",
   "ru": "Пакетные предложения"
  }
 ],
 [
  "Budget friendly",
  {
   "pt": "Econômico",
   "es": "Económico",
   "de": "Preiswert",
   "ru": "Недорого"
  }
 ],
 [
  "Fixed-price transfer",
  {
   "pt": "Traslado com preço fixo",
   "es": "Traslado a precio fijo",
   "de": "Transfer zum Festpreis",
   "ru": "Трансфер по фиксированной цене"
  }
 ],
 [
  "Car rental",
  {
   "pt": "Aluguel de carro",
   "es": "Alquiler de coches",
   "de": "Mietwagen",
   "ru": "Аренда авто"
  }
 ],
 [
  "Local rentals",
  {
   "pt": "Locadoras locais",
   "es": "Alquiler local",
   "de": "Lokale Vermieter",
   "ru": "Местные прокаты"
  }
 ],
 [
  "Desert safaris & tours",
  {
   "pt": "Safáris no deserto e passeios",
   "es": "Safaris y tours",
   "de": "Wüstensafaris & Touren",
   "ru": "Сафари и туры"
  }
 ],
 [
  "By Tripadvisor",
  {
   "pt": "Da Tripadvisor",
   "es": "De Tripadvisor",
   "de": "Von Tripadvisor",
   "ru": "От Tripadvisor"
  }
 ],
 [
  "Tours & activities",
  {
   "pt": "Passeios e atividades",
   "es": "Tours y actividades",
   "de": "Touren & Aktivitäten",
   "ru": "Туры и развлечения"
  }
 ],
 [
  "Multi-day tours",
  {
   "pt": "Tours de vários dias",
   "es": "Circuitos de varios días",
   "de": "Rundreisen",
   "ru": "Многодневные туры"
  }
 ],
 [
  "City pass",
  {
   "pt": "Passe da cidade",
   "es": "Pase turístico",
   "de": "City-Pass",
   "ru": "Городской пропуск"
  }
 ],
 [
  "Audio guide",
  {
   "pt": "Audioguia",
   "es": "Audioguía",
   "de": "Audioguide",
   "ru": "Аудиогид"
  }
 ],
 [
  "{country} eSIM",
  {
   "pt": "eSIM para {country}",
   "es": "eSIM para {country}",
   "de": "eSIM für {country}",
   "ru": "eSIM — {country}"
  }
 ],
 [
  "Multi-country eSIM",
  {
   "pt": "eSIM para vários países",
   "es": "eSIM multipaís",
   "de": "eSIM für mehrere Länder",
   "ru": "eSIM для нескольких стран"
  }
 ],
 [
  "Instant eSIM",
  {
   "pt": "eSIM na hora",
   "es": "eSIM al instante",
   "de": "Sofort-eSIM",
   "ru": "Мгновенная eSIM"
  }
 ],
 [
  "Ad-blocking",
  {
   "pt": "Bloqueio de anúncios",
   "es": "Bloqueo de anuncios",
   "de": "Werbeblocker",
   "ru": "Блокировка рекламы"
  }
 ],
 [
  "Travel insurance",
  {
   "pt": "Seguro viagem",
   "es": "Seguro de viaje",
   "de": "Reiseversicherung",
   "ru": "Туристическая страховка"
  }
 ],
 [
  "Compare insurance",
  {
   "pt": "Comparar seguros",
   "es": "Comparar seguros",
   "de": "Versicherungen vergleichen",
   "ru": "Сравнить страховки"
  }
 ],
 [
  "Up to €600",
  {
   "pt": "Até € 600",
   "es": "Hasta 600 €",
   "de": "Bis zu 600 €",
   "ru": "До 600 €"
  }
 ],
 [
  "No win, no fee",
  {
   "pt": "Só paga se ganhar",
   "es": "Solo pagas si ganas",
   "de": "Kosten nur bei Erfolg",
   "ru": "Платите только при успехе"
  }
 ],
 [
  "EU compensation",
  {
   "pt": "Indenização da UE",
   "es": "Compensación UE",
   "de": "EU-Entschädigung",
   "ru": "Компенсация по правилам ЕС"
  }
 ],
 [
  "Luggage storage",
  {
   "pt": "Guarda-volumes",
   "es": "Consigna de equipaje",
   "de": "Gepäckaufbewahrung",
   "ru": "Хранение багажа"
  }
 ],
 [
  "Search {country} flights",
  {
   "pt": "Buscar voos para {country}",
   "es": "Buscar vuelos a {country}",
   "de": "Flüge nach {country} suchen",
   "ru": "Найти рейсы — {country}"
  }
 ],
 [
  "Search on Kayak",
  {
   "pt": "Buscar no Kayak",
   "es": "Buscar en Kayak",
   "de": "Auf Kayak suchen",
   "ru": "Искать на Kayak"
  }
 ],
 [
  "Search on Kiwi.com",
  {
   "pt": "Buscar no Kiwi.com",
   "es": "Buscar en Kiwi.com",
   "de": "Auf Kiwi.com suchen",
   "ru": "Искать на Kiwi.com"
  }
 ],
 [
  "Ground transport tickets",
  {
   "pt": "Passagens de transporte terrestre",
   "es": "Billetes de transporte terrestre",
   "de": "Tickets für Bahn, Bus & Fähre",
   "ru": "Билеты на наземный транспорт"
  }
 ],
 [
  "Find hotels",
  {
   "pt": "Buscar hotéis",
   "es": "Buscar hoteles",
   "de": "Hotels finden",
   "ru": "Найти отели"
  }
 ],
 [
  "Agoda prices",
  {
   "pt": "Preços na Agoda",
   "es": "Precios en Agoda",
   "de": "Agoda-Preise",
   "ru": "Цены на Agoda"
  }
 ],
 [
  "Trip.com hotels",
  {
   "pt": "Hotéis na Trip.com",
   "es": "Hoteles en Trip.com",
   "de": "Hotels bei Trip.com",
   "ru": "Отели на Trip.com"
  }
 ],
 [
  "Search Expedia",
  {
   "pt": "Buscar na Expedia",
   "es": "Buscar en Expedia",
   "de": "Auf Expedia suchen",
   "ru": "Искать на Expedia"
  }
 ],
 [
  "Find hostels",
  {
   "pt": "Buscar hostels",
   "es": "Buscar hostales",
   "de": "Hostels finden",
   "ru": "Найти хостелы"
  }
 ],
 [
  "Book a transfer",
  {
   "pt": "Reservar traslado",
   "es": "Reservar traslado",
   "de": "Transfer buchen",
   "ru": "Заказать трансфер"
  }
 ],
 [
  "Rent a car",
  {
   "pt": "Alugar carro",
   "es": "Alquilar coche",
   "de": "Auto mieten",
   "ru": "Арендовать авто"
  }
 ],
 [
  "Transfer options",
  {
   "pt": "Opções de traslado",
   "es": "Opciones de traslado",
   "de": "Transfer-Optionen",
   "ru": "Варианты трансфера"
  }
 ],
 [
  "See prices",
  {
   "pt": "Ver preços",
   "es": "Ver precios",
   "de": "Preise ansehen",
   "ru": "Посмотреть цены"
  }
 ],
 [
  "Browse tours",
  {
   "pt": "Ver passeios",
   "es": "Ver tours",
   "de": "Touren ansehen",
   "ru": "Смотреть туры"
  }
 ],
 [
  "Viator experiences",
  {
   "pt": "Experiências da Viator",
   "es": "Experiencias de Viator",
   "de": "Viator-Erlebnisse",
   "ru": "Впечатления Viator"
  }
 ],
 [
  "Browse multi-day tours",
  {
   "pt": "Ver tours de vários dias",
   "es": "Ver circuitos",
   "de": "Rundreisen ansehen",
   "ru": "Смотреть многодневные туры"
  }
 ],
 [
  "City passes",
  {
   "pt": "Passes da cidade",
   "es": "Pases turísticos",
   "de": "City-Pässe",
   "ru": "Городские пропуска"
  }
 ],
 [
  "Audio tours",
  {
   "pt": "Audioguias",
   "es": "Audiotours",
   "de": "Audiotouren",
   "ru": "Аудиотуры"
  }
 ],
 [
  "Nomad plans",
  {
   "pt": "Planos para nômades",
   "es": "Planes para nómadas",
   "de": "Nomaden-Tarife",
   "ru": "Тарифы для номадов"
  }
 ],
 [
  "FlexiRoam plans",
  {
   "pt": "Planos FlexiRoam",
   "es": "Planes FlexiRoam",
   "de": "FlexiRoam-Tarife",
   "ru": "Тарифы FlexiRoam"
  }
 ],
 [
  "Yesim plans",
  {
   "pt": "Planos Yesim",
   "es": "Planes Yesim",
   "de": "Yesim-Tarife",
   "ru": "Тарифы Yesim"
  }
 ],
 [
  "Get {country} eSIM",
  {
   "pt": "Quero o eSIM para {country}",
   "es": "Conseguir eSIM para {country}",
   "de": "eSIM für {country} holen",
   "ru": "Получить eSIM — {country}"
  }
 ],
 [
  "Saily plans",
  {
   "pt": "Planos Saily",
   "es": "Planes Saily",
   "de": "Saily-Tarife",
   "ru": "Тарифы Saily"
  }
 ],
 [
  "Get a quote",
  {
   "pt": "Fazer cotação",
   "es": "Pedir presupuesto",
   "de": "Angebot einholen",
   "ru": "Узнать цену"
  }
 ],
 [
  "Compare",
  {
   "pt": "Comparar",
   "es": "Comparar",
   "de": "Vergleichen",
   "ru": "Сравнить"
  }
 ],
 [
  "Check compensation",
  {
   "pt": "Verificar indenização",
   "es": "Comprobar compensación",
   "de": "Entschädigung prüfen",
   "ru": "Проверить компенсацию"
  }
 ],
 [
  "Check your flight",
  {
   "pt": "Verificar meu voo",
   "es": "Comprobar mi vuelo",
   "de": "Meinen Flug prüfen",
   "ru": "Проверить мой рейс"
  }
 ],
 [
  "Start a claim",
  {
   "pt": "Iniciar pedido",
   "es": "Iniciar reclamación",
   "de": "Anspruch starten",
   "ru": "Подать заявку"
  }
 ],
 [
  "Find storage",
  {
   "pt": "Encontrar guarda-volumes",
   "es": "Buscar consigna",
   "de": "Aufbewahrung finden",
   "ru": "Найти камеру хранения"
  }
 ],
 [
  "Flights & tickets",
  {
   "pt": "Voos e passagens",
   "es": "Vuelos y billetes",
   "de": "Flüge & Tickets",
   "ru": "Перелёты и билеты"
  }
 ],
 [
  "Flights to {hub} and ground transport tickets",
  {
   "pt": "Voos para {hub} e passagens de transporte terrestre",
   "es": "Vuelos a {hub} y billetes de transporte terrestre",
   "de": "Flüge nach {hub} und Tickets für Bahn, Bus & Fähre",
   "ru": "Рейсы в {hub} и билеты на наземный транспорт"
  }
 ],
 [
  "Accommodation",
  {
   "pt": "Hospedagem",
   "es": "Alojamiento",
   "de": "Unterkunft",
   "ru": "Жильё"
  }
 ],
 [
  "Transfers & cars",
  {
   "pt": "Traslados e carros",
   "es": "Traslados y coches",
   "de": "Transfers & Mietwagen",
   "ru": "Трансферы и авто"
  }
 ],
 [
  "{hub} airport pickup and car rental",
  {
   "pt": "Traslado do aeroporto de {hub} e aluguel de carro",
   "es": "Recogida en el aeropuerto de {hub} y alquiler de coches",
   "de": "Flughafenabholung in {hub} und Mietwagen",
   "ru": "Трансфер из аэропорта {hub} и аренда авто"
  }
 ],
 [
  "Tours & tickets",
  {
   "pt": "Passeios e ingressos",
   "es": "Tours y entradas",
   "de": "Touren & Tickets",
   "ru": "Туры и билеты"
  }
 ],
 [
  "Tours, museums and activities in {country}",
  {
   "pt": "Passeios, museus e atividades em {country}",
   "es": "Tours, museos y actividades en {country}",
   "de": "Touren, Museen und Aktivitäten in {country}",
   "ru": "Туры, музеи и развлечения — направление: {country}"
  }
 ],
 [
  "Data & peace of mind",
  {
   "pt": "Internet e tranquilidade",
   "es": "Datos y tranquilidad",
   "de": "Daten & Sicherheit",
   "ru": "Связь и спокойствие"
  }
 ],
 [
  "{country} eSIM, travel insurance, flight compensation and luggage storage",
  {
   "pt": "eSIM para {country}, seguro viagem, indenização de voo e guarda-volumes",
   "es": "eSIM para {country}, seguro de viaje, compensación de vuelos y consigna",
   "de": "eSIM für {country}, Reiseversicherung, Flugentschädigung und Gepäckaufbewahrung",
   "ru": "eSIM — {country}, страховка, компенсация за рейс и хранение багажа"
  }
 ],
 [
  "Agoda leads in Asia; free-cancellation options",
  {
   "pt": "A Agoda lidera na Ásia; opções com cancelamento grátis",
   "es": "Agoda manda en Asia; opciones con cancelación gratis",
   "de": "Agoda ist in Asien führend; mit kostenloser Stornierung",
   "ru": "Agoda — лидер в Азии; варианты с бесплатной отменой"
  }
 ],
 [
  "Free-cancellation hotels and budget hostels",
  {
   "pt": "Hotéis com cancelamento grátis e hostels econômicos",
   "es": "Hoteles con cancelación gratis y hostales económicos",
   "de": "Hotels mit kostenloser Stornierung und günstige Hostels",
   "ru": "Отели с бесплатной отменой и недорогие хостелы"
  }
 ]
];

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
let COMPILED: { re: RegExp; keys: string[]; tr: Tr }[] | null = null;
function compiled() {
  if (!COMPILED) {
    COMPILED = ROWS.map(([en, tr]) => {
      const keys: string[] = [];
      const src = en.split(/(\{route\}|\{hub\}|\{country\}|\{capital\})/).map((p) => {
        const m = /^\{(route|hub|country|capital)\}$/.exec(p);
        if (!m) return esc(p);
        keys.push(m[1]);
        return m[1] === 'route' ? '(.*?)' : '(.+?)';
      }).join('');
      return { re: new RegExp('^' + src + '$'), keys, tr };
    });
  }
  return COMPILED;
}

/** Text from the concierge engine in the page language (the engine itself only makes Turkish and English). */
export function conciergeText(lang: string, code: string, tr: string, en: string): string {
  if (lang === 'tr') return tr;
  if (lang === 'en' || !en) return en;
  for (const c of compiled()) {
    const m = c.re.exec(en);
    if (!m) continue;
    let out = (c.tr as Record<string, string>)[lang];
    if (!out) return en;
    c.keys.forEach((k, i) => {
      const v = m[i + 1];
      const loc = k === 'country' ? getCountryName(code, lang) || v : k === 'capital' ? capitalName(code, lang, GEO_DATA[code]?.capital || v) || v : v;
      out = out.replace('{' + k + '}', loc);
    });
    return lang === 'pt' ? ptArticles(out) : out;
  }
  return en;
}
