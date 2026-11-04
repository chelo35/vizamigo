// Turlar sayfası: komisyonlu tur ortaklarına (GetYourGuide via Stay22, Klook, Tiqets, WeGoTrip, Go City)
// giden, sosyal medyada paylaşılabilir destinasyon kartları. Her kartın kendi #adresi var.
export interface TourDest {
  gyg: string; // GetYourGuide şehir sayfası (Stay22 link= ile komisyonlu)
  id: string; // #bağlantı (ör. /tr/turlar#tayland)
  code: string; // fotoğraf ve vize için ülke kodu
  photo?: string; // farklı ülke kodu (ör. Balkanlar → ME) ya da /images/tours/… yolu
  credit?: string; // fotoğraf lisans bilgisi
  search: string; // tur sitelerinde aranacak yer (İngilizce)
  hub: string; // uçuş için havalimanı
  name: [string, string, string, string, string]; // tr, en, de, es, ru
  pitch: [string, string, string, string, string];
  tags: [string, string, string, string, string];
}

export const TOURS: TourDest[] = [
  { id: 'tayland', gyg: 'https://www.getyourguide.com/bangkok-l169/', code: 'TH', search: 'Bangkok', hub: 'BKK',
    name: ['Tayland', 'Thailand', 'Thailand', 'Tailandia', 'Таиланд'],
    pitch: ['Bangkok tapınakları, yüzen pazarlar, Phuket ve Phi Phi adaları tekne turları.', 'Bangkok temples, floating markets and Phuket and Phi Phi island boat trips.', 'Tempel in Bangkok, schwimmende Märkte und Bootstouren zu Phuket und Phi Phi.', 'Templos de Bangkok, mercados flotantes y excursiones en barco por Phuket y Phi Phi.', 'Храмы Бангкока, плавучие рынки и морские туры на Пхукет и Пхи-Пхи.'],
    tags: ['Ada turları', 'Island trips', 'Inseltouren', 'Islas', 'Острова'] },
  { id: 'istanbul', gyg: 'https://www.getyourguide.com/istanbul-l56/', code: 'TR', search: 'Istanbul', hub: 'IST',
    name: ['İstanbul', 'Istanbul', 'Istanbul', 'Estambul', 'Стамбул'],
    pitch: ['Boğaz turu, Ayasofya ve Topkapı biletleri, Kapalıçarşı ve yemek turları.', 'Bosphorus cruises, Hagia Sophia and Topkapı tickets, Grand Bazaar and food tours.', 'Bosporus-Fahrten, Hagia Sophia und Topkapı, Großer Basar und Food-Touren.', 'Cruceros por el Bósforo, Santa Sofía y Topkapı, Gran Bazar y rutas gastronómicas.', 'Прогулки по Босфору, Айя-София и Топкапы, Гранд-базар и гастротуры.'],
    tags: ['Boğaz turu', 'Bosphorus', 'Bosporus', 'Bósforo', 'Босфор'] },
  { id: 'kapadokya', gyg: 'https://www.getyourguide.com/cappadocia-l1400/', code: 'TR', photo: '/images/tours/kapadokya-480.webp', credit: 'MusikAnimal, CC BY-SA 4.0, Wikimedia Commons', search: 'Cappadocia', hub: 'NAV',
    name: ['Kapadokya', 'Cappadocia', 'Kappadokien', 'Capadocia', 'Каппадокия'],
    pitch: ['Gün doğumunda balon turu, peri bacaları, yeraltı şehirleri ve ATV turları.', 'Sunrise balloon flights, fairy chimneys, underground cities and ATV tours.', 'Ballonfahrt bei Sonnenaufgang, Feenkamine, unterirdische Städte und Quad-Touren.', 'Globo al amanecer, chimeneas de hadas, ciudades subterráneas y quads.', 'Полёт на шаре на рассвете, «дымоходы фей», подземные города и квадроциклы.'],
    tags: ['Balon turu', 'Balloon ride', 'Ballonfahrt', 'Globo', 'Воздушный шар'] },
  { id: 'misir', gyg: 'https://www.getyourguide.com/cairo-l92/', code: 'EG', search: 'Cairo', hub: 'CAI',
    name: ['Mısır', 'Egypt', 'Ägypten', 'Egipto', 'Египет'],
    pitch: ['Gize piramitleri, Nil gemi turları, Luksor tapınakları ve Kızıldeniz dalış turları.', 'Giza pyramids, Nile cruises, Luxor temples and Red Sea diving trips.', 'Pyramiden von Gizeh, Nilkreuzfahrten, Luxor und Tauchen im Roten Meer.', 'Pirámides de Guiza, cruceros por el Nilo, Luxor y buceo en el mar Rojo.', 'Пирамиды Гизы, круизы по Нилу, Луксор и дайвинг в Красном море.'],
    tags: ['Nil gemi turu', 'Nile cruise', 'Nilkreuzfahrt', 'Crucero Nilo', 'Круиз по Нилу'] },
  { id: 'italya', gyg: 'https://www.getyourguide.com/rome-l33/', code: 'IT', search: 'Rome', hub: 'FCO',
    name: ['İtalya', 'Italy', 'Italien', 'Italia', 'Италия'],
    pitch: ['Kolezyum ve Vatikan sırasız giriş, Floransa, Venedik ve Amalfi kıyısı turları.', 'Skip-the-line Colosseum and Vatican, Florence, Venice and Amalfi Coast tours.', 'Kolosseum und Vatikan ohne Anstehen, Florenz, Venedig und Amalfiküste.', 'Coliseo y Vaticano sin colas, Florencia, Venecia y costa Amalfitana.', 'Колизей и Ватикан без очереди, Флоренция, Венеция и Амальфи.'],
    tags: ['Sırasız giriş', 'Skip the line', 'Ohne Anstehen', 'Sin colas', 'Без очереди'] },
  { id: 'balkanlar', gyg: 'https://www.getyourguide.com/kotor-l32202/', code: 'ME', search: 'Kotor', hub: 'TIV',
    name: ['Balkanlar', 'The Balkans', 'Balkan', 'Los Balcanes', 'Балканы'],
    pitch: ['Kotor Körfezi, Saraybosna, Mostar Köprüsü, Ohrid Gölü ve Belgrad turları.', 'Bay of Kotor, Sarajevo, Mostar bridge, Lake Ohrid and Belgrade tours.', 'Bucht von Kotor, Sarajevo, Brücke von Mostar, Ohridsee und Belgrad.', 'Bahía de Kotor, Sarajevo, puente de Mostar, lago Ohrid y Belgrado.', 'Бухта Котор, Сараево, мост в Мостаре, Охрид и Белград.'],
    tags: ['Çok ülkeli', 'Multi-country', 'Mehrere Länder', 'Varios países', 'Несколько стран'] },
  { id: 'dubai', gyg: 'https://www.getyourguide.com/dubai-l173/', code: 'AE', search: 'Dubai', hub: 'DXB',
    name: ['Dubai', 'Dubai', 'Dubai', 'Dubái', 'Дубай'],
    pitch: ['Çöl safarisi, Burj Khalifa, Dubai Marina tekne turu ve Abu Dabi günübirlik turu.', 'Desert safari, Burj Khalifa, Dubai Marina cruise and an Abu Dhabi day trip.', 'Wüstensafari, Burj Khalifa, Marina-Bootsfahrt und Tagesausflug nach Abu Dhabi.', 'Safari por el desierto, Burj Khalifa, crucero en la Marina y Abu Dabi.', 'Сафари в пустыне, Бурдж-Халифа, круиз по Марине и Абу-Даби.'],
    tags: ['Çöl safarisi', 'Desert safari', 'Wüstensafari', 'Safari', 'Сафари'] },
  { id: 'yunanistan', gyg: 'https://www.getyourguide.com/athens-l91/', code: 'GR', search: 'Athens', hub: 'ATH',
    name: ['Yunanistan', 'Greece', 'Griechenland', 'Grecia', 'Греция'],
    pitch: ['Akropolis, Santorini gün batımı, ada tekne turları ve Atina yemek turları.', 'The Acropolis, Santorini sunsets, island boat trips and Athens food tours.', 'Akropolis, Sonnenuntergang auf Santorini, Inselboote und Food-Touren.', 'La Acrópolis, atardeceres en Santorini, barcos por las islas y comida.', 'Акрополь, закаты Санторини, морские прогулки и гастротуры.'],
    tags: ['Ada turları', 'Island hopping', 'Inselhopping', 'Islas', 'Острова'] },
  { id: 'japonya', gyg: 'https://www.getyourguide.com/tokyo-l193/', code: 'JP', search: 'Tokyo', hub: 'NRT',
    name: ['Japonya', 'Japan', 'Japan', 'Japón', 'Япония'],
    pitch: ['Tokyo, Fuji Dağı günübirlik turu, Kyoto tapınakları ve JR Pass ile tren gezileri.', 'Tokyo, a Mount Fuji day trip, Kyoto temples and rail trips with a JR Pass.', 'Tokio, Tagesausflug zum Fuji, Tempel in Kyoto und Zugreisen mit JR Pass.', 'Tokio, excursión al Fuji, templos de Kioto y trenes con JR Pass.', 'Токио, поездка к Фудзи, храмы Киото и JR Pass.'],
    tags: ['Fuji turu', 'Mt Fuji', 'Fuji', 'Fuji', 'Фудзи'] },
  { id: 'bali', gyg: 'https://www.getyourguide.com/bali-l347/', code: 'ID', search: 'Bali', hub: 'DPS',
    name: ['Bali', 'Bali', 'Bali', 'Bali', 'Бали'],
    pitch: ['Ubud pirinç tarlaları, şelaleler, Nusa Penida tekne turu ve gün doğumu yürüyüşü.', 'Ubud rice terraces, waterfalls, a Nusa Penida boat trip and a sunrise hike.', 'Reisterrassen von Ubud, Wasserfälle, Nusa Penida und Sonnenaufgangswanderung.', 'Arrozales de Ubud, cascadas, Nusa Penida y caminata al amanecer.', 'Рисовые террасы Убуда, водопады, Нуса-Пенида и рассвет на вулкане.'],
    tags: ['Doğa', 'Nature', 'Natur', 'Naturaleza', 'Природа'] },
  { id: 'ispanya', gyg: 'https://www.getyourguide.com/barcelona-l45/', code: 'ES', search: 'Barcelona', hub: 'BCN',
    name: ['İspanya', 'Spain', 'Spanien', 'España', 'Испания'],
    pitch: ['Sagrada Família, Park Güell, Madrid müzeleri ve Endülüs flamenko gecesi.', 'Sagrada Família, Park Güell, Madrid museums and a flamenco night in Andalusia.', 'Sagrada Família, Park Güell, Madrider Museen und Flamenco in Andalusien.', 'Sagrada Família, Park Güell, museos de Madrid y flamenco en Andalucía.', 'Саграда Фамилия, парк Гуэль, музеи Мадрида и фламенко.'],
    tags: ['Şehir turu', 'City tours', 'Stadttouren', 'Ciudad', 'Город'] },
  { id: 'fransa', gyg: 'https://www.getyourguide.com/paris-l16/', code: 'FR', search: 'Paris', hub: 'CDG',
    name: ['Fransa', 'France', 'Frankreich', 'Francia', 'Франция'],
    pitch: ['Eyfel Kulesi, Louvre, Seine tekne turu, Versay ve Disneyland Paris biletleri.', 'Eiffel Tower, the Louvre, Seine cruises, Versailles and Disneyland Paris tickets.', 'Eiffelturm, Louvre, Seine-Fahrt, Versailles und Disneyland Paris.', 'Torre Eiffel, Louvre, crucero por el Sena, Versalles y Disneyland.', 'Эйфелева башня, Лувр, Сена, Версаль и Диснейленд.'],
    tags: ['Müze biletleri', 'Museum tickets', 'Museumstickets', 'Museos', 'Музеи'] },
  { id: 'fas', gyg: 'https://www.getyourguide.com/marrakesh-l208/', code: 'MA', search: 'Marrakech', hub: 'RAK',
    name: ['Fas', 'Morocco', 'Marokko', 'Marruecos', 'Марокко'],
    pitch: ['Marakeş medinası, Sahra çölünde kamp, Atlas Dağları ve Şafşavan mavi şehir.', 'Marrakech medina, a Sahara desert camp, the Atlas Mountains and blue Chefchaouen.', 'Medina von Marrakesch, Wüstencamp, Atlasgebirge und das blaue Chefchaouen.', 'Medina de Marrakech, campamento en el Sáhara, Atlas y Chefchaouen.', 'Медина Марракеша, лагерь в Сахаре, Атлас и Шефшауэн.'],
    tags: ['Sahra turu', 'Sahara tour', 'Sahara', 'Sáhara', 'Сахара'] },
  { id: 'gurcistan', gyg: 'https://www.getyourguide.com/tbilisi-l1379/', code: 'GE', search: 'Tbilisi', hub: 'TBS',
    name: ['Gürcistan', 'Georgia', 'Georgien', 'Georgia', 'Грузия'],
    pitch: ['Tiflis eski şehir, Kazbegi dağ turu, Kakheti şarap rotası ve Batum.', 'Tbilisi old town, a Kazbegi mountain trip, the Kakheti wine route and Batumi.', 'Altstadt von Tiflis, Kasbegi, Weinroute Kachetien und Batumi.', 'Casco antiguo de Tiflis, Kazbegi, ruta del vino de Kajetia y Batumi.', 'Старый Тбилиси, Казбеги, Кахетия и Батуми.'],
    tags: ['Şarap ve dağ', 'Wine & mountains', 'Wein & Berge', 'Vino y montaña', 'Вино и горы'] },
  { id: 'vietnam', gyg: 'https://www.getyourguide.com/hanoi-l205/', code: 'VN', search: 'Hanoi', hub: 'HAN',
    name: ['Vietnam', 'Vietnam', 'Vietnam', 'Vietnam', 'Вьетнам'],
    pitch: ['Ha Long Körfezi gemi turu, Hanoi sokak lezzetleri, Hoi An ve Mekong Deltası.', 'Ha Long Bay cruises, Hanoi street food, Hoi An and the Mekong Delta.', 'Halong-Bucht, Streetfood in Hanoi, Hoi An und Mekong-Delta.', 'Bahía de Ha Long, comida callejera de Hanói, Hoi An y el Mekong.', 'Халонг, уличная еда Ханоя, Хойан и дельта Меконга.'],
    tags: ['Ha Long', 'Ha Long Bay', 'Halong', 'Ha Long', 'Халонг'] }
];

/** Turlar sayfasının dile göre adresi: /tr/turlar, /en/tours, /de/touren, /es/tours, /ru/tours */
export const TOURS_SLUG: Record<string, string> = { tr: 'turlar', en: 'tours', de: 'touren', es: 'tours', ru: 'tours' };
export const toursPath = (lang: string) => `/${lang}/${TOURS_SLUG[lang] || 'tours'}`;

/* ------------------------------------------------------------------ */
/* Paket turlar (çok günlük, rehberli): bölgeye ve süreye göre.
 * Bağlantılar komisyonlu ortakların çok günlük tur aramalarına gider:
 * GetYourGuide (Stay22), Klook. TourRadar/G Adventures onaylanınca en başa eklenecek. */
export type TourRegion = 'asia' | 'balkans' | 'europe' | 'mea' | 'turkey' | 'americas';
export interface TourPackage {
  gyg: string; // GetYourGuide çok günlük turlar sayfası
  id: string;
  region: TourRegion;
  code: string; // fotoğraf ve vize
  photo?: string;
  days: number;
  search: string; // tur sitelerinde arama (İngilizce)
  name: [string, string, string, string, string];
  route: string; // duraklar (yer adları evrensel)
}
export const TOUR_REGIONS: { id: TourRegion; name: [string, string, string, string, string] }[] = [
  { id: 'asia', name: ['Asya', 'Asia', 'Asien', 'Asia', 'Азия'] },
  { id: 'balkans', name: ['Balkanlar', 'The Balkans', 'Balkan', 'Balcanes', 'Балканы'] },
  { id: 'europe', name: ['Avrupa', 'Europe', 'Europa', 'Europa', 'Европа'] },
  { id: 'mea', name: ['Orta Doğu ve Afrika', 'Middle East & Africa', 'Nahost & Afrika', 'Oriente Medio y África', 'Ближний Восток и Африка'] },
  { id: 'turkey', name: ['Türkiye', 'Türkiye', 'Türkei', 'Turquía', 'Турция'] },
  { id: 'americas', name: ['Amerika', 'The Americas', 'Amerika', 'América', 'Америка'] }
];
export const PACKAGES: TourPackage[] = [
  { id: 'thailand-10', gyg: 'https://www.getyourguide.com/thailand-l169040/multi-day-trips-tc282/', region: 'asia', code: 'TH', days: 10, search: 'Thailand 10 day tour', route: 'Bangkok · Chiang Mai · Phuket', name: ['Tayland turu', 'Thailand tour', 'Thailand-Rundreise', 'Tour por Tailandia', 'Тур по Таиланду'] },
  { id: 'japan-12', gyg: 'https://www.getyourguide.com/japan-l169034/multi-day-trips-tc282/', region: 'asia', code: 'JP', days: 12, search: 'Japan 12 day tour', route: 'Tokyo · Hakone · Kyoto · Osaka', name: ['Japonya turu', 'Japan tour', 'Japan-Rundreise', 'Tour por Japón', 'Тур по Японии'] },
  { id: 'vietnam-10', gyg: 'https://www.getyourguide.com/vietnam-l169193/multi-day-trips-tc282/', region: 'asia', code: 'VN', days: 10, search: 'Vietnam 10 day tour', route: 'Hanoi · Ha Long · Hoi An · Ho Chi Minh', name: ['Vietnam turu', 'Vietnam tour', 'Vietnam-Rundreise', 'Tour por Vietnam', 'Тур по Вьетнаму'] },
  { id: 'bali-7', gyg: 'https://www.getyourguide.com/bali-l347/multi-day-trips-tc282/', region: 'asia', code: 'ID', days: 7, search: 'Bali 7 day tour', route: 'Ubud · Nusa Penida · Uluwatu', name: ['Bali turu', 'Bali tour', 'Bali-Rundreise', 'Tour por Bali', 'Тур по Бали'] },
  { id: 'srilanka-8', gyg: 'https://www.getyourguide.com/sri-lanka-l169048/multi-day-trips-tc282/', region: 'asia', code: 'LK', days: 8, search: 'Sri Lanka 8 day tour', route: 'Colombo · Sigiriya · Kandy · Ella', name: ['Sri Lanka turu', 'Sri Lanka tour', 'Sri-Lanka-Rundreise', 'Tour por Sri Lanka', 'Тур по Шри-Ланке'] },
  { id: 'balkans-8', gyg: 'https://www.getyourguide.com/montenegro-l169142/multi-day-trips-tc282/', region: 'balkans', code: 'ME', days: 8, search: 'Balkans 8 day tour', route: 'Belgrade · Sarajevo · Mostar · Kotor · Tirana', name: ['Balkan turu', 'Balkans tour', 'Balkan-Rundreise', 'Tour por los Balcanes', 'Тур по Балканам'] },
  { id: 'croatia-7', gyg: 'https://www.getyourguide.com/croatia-l169088/multi-day-trips-tc282/', region: 'balkans', code: 'HR', days: 7, search: 'Croatia 7 day tour', route: 'Zagreb · Plitvice · Split · Dubrovnik', name: ['Hırvatistan turu', 'Croatia tour', 'Kroatien-Rundreise', 'Tour por Croacia', 'Тур по Хорватии'] },
  { id: 'albania-6', gyg: 'https://www.getyourguide.com/albania-l169053/multi-day-trips-tc282/', region: 'balkans', code: 'AL', days: 6, search: 'Albania tour', route: 'Tirana · Berat · Gjirokastër · Ksamil', name: ['Arnavutluk turu', 'Albania tour', 'Albanien-Rundreise', 'Tour por Albania', 'Тур по Албании'] },
  { id: 'italy-10', gyg: 'https://www.getyourguide.com/italy-l169011/multi-day-trips-tc282/', region: 'europe', code: 'IT', days: 10, search: 'Italy 10 day tour', route: 'Rome · Florence · Venice · Amalfi', name: ['İtalya turu', 'Italy tour', 'Italien-Rundreise', 'Tour por Italia', 'Тур по Италии'] },
  { id: 'spain-portugal-10', gyg: 'https://www.getyourguide.com/spain-l169003/multi-day-trips-tc282/', region: 'europe', code: 'ES', days: 10, search: 'Spain and Portugal 10 day tour', route: 'Madrid · Seville · Granada · Lisbon', name: ['İspanya ve Portekiz turu', 'Spain & Portugal tour', 'Spanien & Portugal', 'Tour España y Portugal', 'Испания и Португалия'] },
  { id: 'central-europe-8', gyg: 'https://www.getyourguide.com/prague-l10/multi-day-trips-tc282/', region: 'europe', code: 'CZ', days: 8, search: 'Central Europe tour Prague Vienna Budapest', route: 'Prague · Vienna · Budapest', name: ['Orta Avrupa turu', 'Central Europe tour', 'Mitteleuropa-Rundreise', 'Tour por Europa Central', 'Центральная Европа'] },
  { id: 'greece-8', gyg: 'https://www.getyourguide.com/greece-l169010/multi-day-trips-tc282/', region: 'europe', code: 'GR', days: 8, search: 'Greece island hopping 8 day tour', route: 'Athens · Mykonos · Santorini', name: ['Yunan adaları turu', 'Greek islands tour', 'Griechische Inseln', 'Islas griegas', 'Греческие острова'] },
  { id: 'norway-7', gyg: 'https://www.getyourguide.com/norway-l169022/multi-day-trips-tc282/', region: 'europe', code: 'NO', days: 7, search: 'Norway fjords 7 day tour', route: 'Oslo · Bergen · Fjords', name: ['Norveç fiyortları turu', 'Norway fjords tour', 'Norwegen Fjorde', 'Fiordos de Noruega', 'Фьорды Норвегии'] },
  { id: 'egypt-8', gyg: 'https://www.getyourguide.com/egypt-l169049/multi-day-trips-tc282/', region: 'mea', code: 'EG', days: 8, search: 'Egypt 8 day tour Nile cruise', route: 'Cairo · Luxor · Nile cruise · Aswan', name: ['Mısır ve Nil turu', 'Egypt & Nile tour', 'Ägypten & Nil', 'Egipto y el Nilo', 'Египет и Нил'] },
  { id: 'morocco-8', gyg: 'https://www.getyourguide.com/marrakesh-l208/multi-day-trips-tc282/', region: 'mea', code: 'MA', days: 8, search: 'Morocco 8 day tour Sahara', route: 'Marrakech · Sahara · Fes · Chefchaouen', name: ['Fas turu', 'Morocco tour', 'Marokko-Rundreise', 'Tour por Marruecos', 'Тур по Марокко'] },
  { id: 'jordan-5', gyg: 'https://www.getyourguide.com/jordan-l169120/multi-day-trips-tc282/', region: 'mea', code: 'JO', days: 5, search: 'Jordan 5 day tour Petra Wadi Rum', route: 'Amman · Petra · Wadi Rum · Dead Sea', name: ['Ürdün turu', 'Jordan tour', 'Jordanien-Rundreise', 'Tour por Jordania', 'Тур по Иордании'] },
  { id: 'tanzania-7', gyg: 'https://www.getyourguide.com/tanzania-l169051/multi-day-trips-tc282/', region: 'mea', code: 'TZ', days: 7, search: 'Tanzania safari Zanzibar 7 day tour', route: 'Serengeti · Ngorongoro · Zanzibar', name: ['Tanzanya safari turu', 'Tanzania safari', 'Tansania-Safari', 'Safari en Tanzania', 'Сафари в Танзании'] },
  { id: 'dubai-5', gyg: 'https://www.getyourguide.com/united-arab-emirates-l169038/multi-day-trips-tc282/', region: 'mea', code: 'AE', days: 5, search: 'Dubai Abu Dhabi 5 day tour', route: 'Dubai · Desert safari · Abu Dhabi', name: ['Dubai turu', 'Dubai tour', 'Dubai-Reise', 'Tour por Dubái', 'Тур в Дубай'] },
  { id: 'turkey-10', gyg: 'https://www.getyourguide.com/turkiye-l169039/multi-day-trips-tc282/', region: 'turkey', code: 'TR', days: 10, search: 'Turkey 10 day tour Istanbul Cappadocia', route: 'İstanbul · Kapadokya · Pamukkale · Efes', name: ['Türkiye turu', 'Türkiye tour', 'Türkei-Rundreise', 'Tour por Turquía', 'Тур по Турции'] },
  { id: 'cappadocia-3', gyg: 'https://www.getyourguide.com/cappadocia-l1400/multi-day-trips-tc282/', region: 'turkey', code: 'TR', photo: '/images/tours/kapadokya-480.webp', days: 3, search: 'Cappadocia 3 day tour', route: 'Göreme · Ürgüp · Avanos · Balon', name: ['Kapadokya turu', 'Cappadocia tour', 'Kappadokien-Tour', 'Tour por Capadocia', 'Тур в Каппадокию'] },
  { id: 'aegean-7', gyg: 'https://www.getyourguide.com/izmir-l1082/multi-day-trips-tc282/', region: 'turkey', code: 'TR', days: 7, search: 'Turkey Aegean coast tour Ephesus Pamukkale', route: 'İzmir · Efes · Pamukkale · Bodrum', name: ['Ege turu', 'Aegean coast tour', 'Ägäis-Rundreise', 'Tour por el Egeo', 'Эгейское побережье'] },
  { id: 'peru-8', gyg: 'https://www.getyourguide.com/peru-l168997/multi-day-trips-tc282/', region: 'americas', code: 'PE', days: 8, search: 'Peru 8 day tour Machu Picchu', route: 'Lima · Cusco · Sacred Valley · Machu Picchu', name: ['Peru ve Machu Picchu turu', 'Peru & Machu Picchu', 'Peru & Machu Picchu', 'Perú y Machu Picchu', 'Перу и Мачу-Пикчу'] },
  { id: 'mexico-8', gyg: 'https://www.getyourguide.com/mexico-l169001/multi-day-trips-tc282/', region: 'americas', code: 'MX', days: 8, search: 'Mexico 8 day tour Yucatan', route: 'Mexico City · Oaxaca · Yucatán · Cancún', name: ['Meksika turu', 'Mexico tour', 'Mexiko-Rundreise', 'Tour por México', 'Тур по Мексике'] },
  { id: 'usa-west-10', gyg: 'https://www.getyourguide.com/united-states-l168990/multi-day-trips-tc282/', region: 'americas', code: 'US', days: 10, search: 'USA west coast 10 day tour', route: 'Los Angeles · Las Vegas · Grand Canyon · San Francisco', name: ['ABD Batı Kıyısı turu', 'USA West Coast tour', 'USA Westküste', 'Costa Oeste de EE. UU.', 'Западное побережье США'] }
];
