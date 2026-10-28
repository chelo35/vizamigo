/** Araç sayfalarının başlık ve açıklamaları: hem tarayıcıda hem derlemede hazır HTML'de aynı. */
type L = 'tr' | 'en' | 'de' | 'es' | 'ru';
type Entry = { title: string; desc: string };

const T: Record<string, Record<L, Entry>> = {
  plan: {
    tr: { title: 'Rota Planlayıcı: Çok Ülkeli Seyahat, Vize ve Schengen Kontrolü | Vizamigo', desc: 'Durakları ekle, sürükleyerek sırala; her ülkenin vize kuralı, Schengen 90/180 günü, transit şartları ve uçuş mesafesi kendiliğinden hesaplansın. Haritada rota, hazır rotalar ve dijital göçebe merkezleri.' },
    en: { title: 'Route Planner: Multi-Country Trips with Visa & Schengen Checks | Vizamigo', desc: 'Add stops and drag to reorder; visa rules, Schengen 90/180 days, transit requirements and travel distance are checked for every country. Route map, ready-made trips and digital nomad hubs.' },
    de: { title: 'Routenplaner: Mehrländerreisen mit Visum- & Schengen-Prüfung | Vizamigo', desc: 'Stopps hinzufügen und sortieren; Visaregeln, Schengen 90/180, Transit und Entfernungen werden für jedes Land geprüft. Routenkarte, fertige Routen und Nomaden-Hubs.' },
    es: { title: 'Planificador de rutas: viajes multipaís con visados y Schengen | Vizamigo', desc: 'Añade paradas y ordénalas; se revisan visados, días Schengen 90/180, tránsito y distancias de cada país. Mapa de ruta, rutas listas y centros para nómadas digitales.' },
    ru: { title: 'Планировщик маршрута: визы и Шенген для поездок по нескольким странам | Vizamigo', desc: 'Добавляйте остановки и меняйте порядок; визовые правила, Шенген 90/180, транзит и расстояния проверяются для каждой страны. Карта маршрута и хабы для цифровых кочевников.' }
  },
  track: {
    tr: { title: 'Schengen 90/180 Gün Sayacı ve Seyahat Cüzdanı | Vizamigo', desc: 'Schengen 90/180, Birleşik Krallık 180/365 ve kendi kuralların için kalan gün sayacı. Pasaport ve vize bitiş uyarıları, biletler, bütçe ve 183 gün vergi takibi; hepsi cihazında.' },
    en: { title: 'Schengen 90/180 Day Calculator & Travel Wallet | Vizamigo', desc: 'Remaining-days counter for Schengen 90/180, UK 180/365 and your own rules. Passport and visa expiry alerts, bookings, budget and 183-day tax tracking, all on your device.' },
    de: { title: 'Schengen-Rechner 90/180 & Reise-Wallet | Vizamigo', desc: 'Resttage für Schengen 90/180, UK 180/365 und eigene Regeln. Ablaufhinweise für Pass und Visum, Buchungen, Budget und 183-Tage-Steuer, alles auf deinem Gerät.' },
    es: { title: 'Calculadora Schengen 90/180 y cartera de viaje | Vizamigo', desc: 'Contador de días para Schengen 90/180, Reino Unido 180/365 y reglas propias. Avisos de caducidad, reservas, presupuesto y control fiscal de 183 días en tu dispositivo.' },
    ru: { title: 'Калькулятор Шенгена 90/180 и кошелёк путешественника | Vizamigo', desc: 'Счётчик дней для Шенгена 90/180, Великобритании 180/365 и своих правил. Сроки паспорта и визы, брони, бюджет и учёт 183 дней на вашем устройстве.' }
  },
  nomad: {
    tr: { title: 'Seyahat Araçları: Bavul Listesi, Döviz, Bahşiş, Priz ve Acil Numaralar | Vizamigo', desc: 'Ülkeye göre evrak listesi, havaya göre bavul listesi, canlı döviz çevirici, bahşiş hesaplayıcı, priz tipleri ve eSIM, acil durum numaraları ile pasaport kaybında adım adım rehber.' },
    en: { title: 'Travel Tools: Packing List, Currency, Tipping, Plugs & Emergency Numbers | Vizamigo', desc: 'Document checklist by country, weather-aware packing list, live currency converter, tipping calculator, plug types and eSIM, emergency numbers and a lost-passport guide.' },
    de: { title: 'Reise-Tools: Packliste, Währung, Trinkgeld, Stecker & Notrufnummern | Vizamigo', desc: 'Dokumentenliste je Land, Packliste nach Wetter, Live-Währungsrechner, Trinkgeld, Steckertypen und eSIM, Notrufnummern und Hilfe bei Passverlust.' },
    es: { title: 'Herramientas de viaje: maleta, divisas, propinas, enchufes y emergencias | Vizamigo', desc: 'Documentos por país, lista de maleta según el tiempo, conversor de divisas, propinas, enchufes y eSIM, números de emergencia y guía por pasaporte perdido.' },
    ru: { title: 'Инструменты: список вещей, валюта, чаевые, розетки и экстренные номера | Vizamigo', desc: 'Документы по стране, список вещей по погоде, конвертер валют, чаевые, розетки и eSIM, экстренные номера и помощь при утере паспорта.' }
  },
  profile: {
    tr: { title: 'Profil: Pasaportlarım, Ülke Takibi ve Ayarlar | Vizamigo', desc: 'Birincil ve ikinci pasaportunu seç, ülkeleri takip edip kural değişikliklerinden haberdar ol, dil ve tema ayarlarını yap, verilerini yedekle.' },
    en: { title: 'Profile: My Passports, Followed Countries & Settings | Vizamigo', desc: 'Choose your primary and second passport, follow countries for rule changes, set language and theme, and back up your data.' },
    de: { title: 'Profil: Meine Pässe, gefolgte Länder & Einstellungen | Vizamigo', desc: 'Pässe wählen, Ländern folgen, Sprache und Design einstellen, Daten sichern.' },
    es: { title: 'Perfil: mis pasaportes, países seguidos y ajustes | Vizamigo', desc: 'Elige tus pasaportes, sigue países para recibir cambios, ajusta idioma y tema y haz copia de tus datos.' },
    ru: { title: 'Профиль: мои паспорта, страны и настройки | Vizamigo', desc: 'Выберите паспорта, следите за странами, настройте язык и тему, сделайте резервную копию.' }
  },
  consular: {
    tr: { title: 'Acil Durum ve Konsolosluk: Polis, Ambulans ve Kayıp Pasaport | Vizamigo', desc: '199 ülkenin polis, ambulans ve itfaiye numaraları, konsolosluk bilgileri ve yurt dışında pasaport kaybında adım adım ne yapacağın.' },
    en: { title: 'Emergency & Consulate: Police, Ambulance and Lost Passport | Vizamigo', desc: 'Police, ambulance and fire numbers for 199 countries, consulate details and step-by-step help if you lose your passport abroad.' },
    de: { title: 'Notfall & Konsulat: Polizei, Rettung und Passverlust | Vizamigo', desc: 'Notrufnummern für 199 Länder, Konsulatsinfos und Hilfe bei Passverlust im Ausland.' },
    es: { title: 'Emergencias y consulado: policía, ambulancia y pasaporte perdido | Vizamigo', desc: 'Números de emergencia de 199 países, datos consulares y ayuda paso a paso si pierdes el pasaporte.' },
    ru: { title: 'Экстренная помощь и консульство: полиция, скорая, утеря паспорта | Vizamigo', desc: 'Экстренные номера 199 стран, данные консульств и пошаговая помощь при утере паспорта.' }
  }
};

export function getTabSeo(tab: string, lang: string): Entry | null {
  const t = T[tab];
  if (!t) return null;
  return t[(lang as L) in t ? (lang as L) : 'en'];
}
