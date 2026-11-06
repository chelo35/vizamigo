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
export type TourRegion = 'asia' | 'balkans' | 'europe' | 'mea' | 'turkey' | 'americas' | 'oceania';
export interface TourPackage {
  gyg?: string; // GetYourGuide çok günlük turlar sayfası (yoksa arama)
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
  { id: 'americas', name: ['Amerika', 'The Americas', 'Amerika', 'América', 'Америка'] },
  { id: 'oceania', name: ['Okyanusya', 'Oceania', 'Ozeanien', 'Oceanía', 'Океания'] }
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
  { id: 'usa-west-10', gyg: 'https://www.getyourguide.com/united-states-l168990/multi-day-trips-tc282/', region: 'americas', code: 'US', days: 10, search: 'USA west coast 10 day tour', route: 'Los Angeles · Las Vegas · Grand Canyon · San Francisco', name: ['ABD Batı Kıyısı turu', 'USA West Coast tour', 'USA Westküste', 'Costa Oeste de EE. UU.', 'Западное побережье США'] },
  { id: 'india-10', region: 'asia', code: 'IN', days: 10, search: 'India Golden Triangle tour', route: 'Delhi · Agra · Jaipur · Varanasi', name: ['Hindistan turu', 'India tour', 'Indien-Rundreise', 'Tour por la India', 'Тур по Индии'] },
  { id: 'nepal-10', region: 'asia', code: 'NP', days: 10, search: 'Nepal tour', route: 'Kathmandu · Pokhara · Chitwan', name: ['Nepal turu', 'Nepal tour', 'Nepal-Rundreise', 'Tour por Nepal', 'Тур по Непалу'] },
  { id: 'indochina-12', region: 'asia', code: 'KH', days: 12, search: 'Vietnam Cambodia Laos tour', route: 'Hanoi · Luang Prabang · Siem Reap · Saigon', name: ['Çinhindi turu (Vietnam, Kamboçya, Laos)', 'Indochina tour', 'Indochina-Rundreise', 'Tour por Indochina', 'Тур по Индокитаю'] },
  { id: 'korea-8', region: 'asia', code: 'KR', days: 8, search: 'South Korea tour', route: 'Seoul · Gyeongju · Busan · Jeju', name: ['Güney Kore turu', 'South Korea tour', 'Südkorea-Rundreise', 'Tour por Corea del Sur', 'Тур по Южной Корее'] },
  { id: 'china-10', region: 'asia', code: 'CN', days: 10, search: 'China tour', route: 'Beijing · Xi’an · Guilin · Shanghai', name: ['Çin turu', 'China tour', 'China-Rundreise', 'Tour por China', 'Тур по Китаю'] },
  { id: 'uzbekistan-8', region: 'asia', code: 'UZ', days: 8, search: 'Uzbekistan Silk Road tour', route: 'Tashkent · Samarkand · Bukhara · Khiva', name: ['Özbekistan İpek Yolu turu', 'Uzbekistan Silk Road', 'Usbekistan Seidenstraße', 'Uzbekistán, Ruta de la Seda', 'Узбекистан: Шёлковый путь'] },
  { id: 'portugal-8', region: 'europe', code: 'PT', days: 8, search: 'Portugal tour', route: 'Lisbon · Sintra · Porto · Douro', name: ['Portekiz turu', 'Portugal tour', 'Portugal-Rundreise', 'Tour por Portugal', 'Тур по Португалии'] },
  { id: 'iceland-7', region: 'europe', code: 'IS', days: 7, search: 'Iceland ring road tour', route: 'Reykjavík · Golden Circle · South Coast · Glaciers', name: ['İzlanda turu', 'Iceland tour', 'Island-Rundreise', 'Tour por Islandia', 'Тур по Исландии'] },
  { id: 'scotland-5', region: 'europe', code: 'GB', days: 5, search: 'Scotland Highlands tour', route: 'Edinburgh · Loch Ness · Isle of Skye', name: ['İskoçya turu', 'Scotland tour', 'Schottland-Rundreise', 'Tour por Escocia', 'Тур по Шотландии'] },
  { id: 'switzerland-8', region: 'europe', code: 'CH', days: 8, search: 'Switzerland Alps tour', route: 'Zurich · Lucerne · Interlaken · Zermatt', name: ['İsviçre Alpleri turu', 'Swiss Alps tour', 'Schweizer Alpen', 'Alpes suizos', 'Швейцарские Альпы'] },
  { id: 'kenya-7', region: 'mea', code: 'KE', days: 7, search: 'Kenya safari', route: 'Masai Mara · Lake Nakuru · Amboseli', name: ['Kenya safari turu', 'Kenya safari', 'Kenia-Safari', 'Safari en Kenia', 'Сафари в Кении'] },
  { id: 'southafrica-10', region: 'mea', code: 'ZA', days: 10, search: 'South Africa tour', route: 'Cape Town · Garden Route · Kruger', name: ['Güney Afrika turu', 'South Africa tour', 'Südafrika-Rundreise', 'Tour por Sudáfrica', 'Тур по ЮАР'] },
  { id: 'costarica-9', region: 'americas', code: 'CR', days: 9, search: 'Costa Rica tour', route: 'San José · Arenal · Monteverde · Manuel Antonio', name: ['Kosta Rika turu', 'Costa Rica tour', 'Costa-Rica-Rundreise', 'Tour por Costa Rica', 'Тур по Коста-Рике'] },
  { id: 'patagonia-12', region: 'americas', code: 'AR', days: 12, search: 'Patagonia tour', route: 'Buenos Aires · El Calafate · El Chaltén · Torres del Paine', name: ['Patagonya turu', 'Patagonia tour', 'Patagonien-Rundreise', 'Tour por la Patagonia', 'Тур по Патагонии'] },
  { id: 'canada-7', region: 'americas', code: 'CA', days: 7, search: 'Canadian Rockies tour', route: 'Calgary · Banff · Lake Louise · Jasper', name: ['Kanada Rocky Dağları turu', 'Canadian Rockies tour', 'Kanadische Rockies', 'Rocosas canadienses', 'Канадские Скалистые горы'] },
  { id: 'australia-12', region: 'oceania', code: 'AU', days: 12, search: 'Australia tour', route: 'Sydney · Uluru · Cairns · Melbourne', name: ['Avustralya turu', 'Australia tour', 'Australien-Rundreise', 'Tour por Australia', 'Тур по Австралии'] },
  { id: 'newzealand-12', region: 'oceania', code: 'NZ', days: 12, search: 'New Zealand tour', route: 'Auckland · Rotorua · Queenstown · Milford Sound', name: ['Yeni Zelanda turu', 'New Zealand tour', 'Neuseeland-Rundreise', 'Tour por Nueva Zelanda', 'Тур по Новой Зеландии'] }
];

/* ------------------------------------------------------------------ */
/* Canlı paket tur teklifleri (TourRadar): /api/tours için arama ayarları.
 * q: İngilizce arama, c: gezilen ülkeler, min/max: gün aralığı. */
export const LIVE: Record<string, { q: string; c: string[]; min: number; max: number; d: string }> = {
  'thailand-10': { q: 'Thailand', c: ['TH'], min: 7, max: 14, d: 'thailand' },
  'japan-12': { q: 'Japan', c: ['JP'], min: 8, max: 16, d: 'japan' },
  'vietnam-10': { q: 'Vietnam', c: ['VN'], min: 7, max: 15, d: 'vietnam' },
  'bali-7': { q: 'Bali Indonesia', c: ['ID'], min: 5, max: 12, d: 'indonesia' },
  'srilanka-8': { q: 'Sri Lanka', c: ['LK'], min: 6, max: 14, d: 'sri-lanka' },
  'balkans-8': { q: 'Balkans', c: ['ME', 'BA', 'AL', 'RS', 'MK'], min: 6, max: 14, d: 'balkans' },
  'croatia-7': { q: 'Croatia', c: ['HR'], min: 5, max: 10, d: 'croatia' },
  'albania-6': { q: 'Albania', c: ['AL'], min: 4, max: 10, d: 'albania' },
  'italy-10': { q: 'Italy highlights', c: ['IT'], min: 7, max: 14, d: 'italy' },
  'spain-portugal-10': { q: 'Spain and Portugal', c: ['ES', 'PT'], min: 7, max: 15, d: 'spain' },
  'central-europe-8': { q: 'Prague Vienna Budapest', c: ['CZ', 'AT', 'HU'], min: 5, max: 12, d: 'central-europe' },
  'greece-8': { q: 'Greek island hopping', c: ['GR'], min: 6, max: 12, d: 'greece' },
  'norway-7': { q: 'Norway fjords', c: ['NO'], min: 5, max: 12, d: 'norway' },
  'egypt-8': { q: 'Egypt Nile cruise', c: ['EG'], min: 6, max: 12, d: 'egypt' },
  'morocco-8': { q: 'Morocco Sahara', c: ['MA'], min: 6, max: 12, d: 'morocco' },
  'jordan-5': { q: 'Jordan Petra Wadi Rum', c: ['JO'], min: 3, max: 8, d: 'jordan' },
  'tanzania-7': { q: 'Tanzania safari', c: ['TZ'], min: 5, max: 12, d: 'tanzania' },
  'dubai-5': { q: 'Dubai Abu Dhabi', c: ['AE'], min: 3, max: 8, d: 'united-arab-emirates' },
  'turkey-10': { q: 'Turkey Istanbul Cappadocia', c: ['TR'], min: 7, max: 14, d: 'turkey' },
  'cappadocia-3': { q: 'Cappadocia', c: ['TR'], min: 2, max: 4, d: 'turkey' },
  'aegean-7': { q: 'Turkey Aegean coast Ephesus Pamukkale', c: ['TR'], min: 4, max: 10, d: 'turkey' },
  'peru-8': { q: 'Peru Machu Picchu', c: ['PE'], min: 6, max: 14, d: 'peru' },
  'mexico-8': { q: 'Mexico Yucatan', c: ['MX'], min: 6, max: 14, d: 'mexico' },
  'usa-west-10': { q: 'USA West Coast national parks', c: ['US'], min: 7, max: 15, d: 'usa' },
  'india-10': { q: 'India Golden Triangle', c: ['IN'], min: 6, max: 14, d: 'india' },
  'nepal-10': { q: 'Nepal Kathmandu Pokhara', c: ['NP'], min: 6, max: 14, d: 'nepal' },
  'indochina-12': { q: 'Vietnam Cambodia Laos', c: ['VN', 'KH', 'LA'], min: 9, max: 18, d: 'indochina' },
  'korea-8': { q: 'South Korea Seoul Busan', c: ['KR'], min: 5, max: 12, d: 'south-korea' },
  'china-10': { q: 'China Beijing Xian Shanghai', c: ['CN'], min: 7, max: 15, d: 'china' },
  'uzbekistan-8': { q: 'Uzbekistan Silk Road Samarkand', c: ['UZ'], min: 5, max: 12, d: 'uzbekistan' },
  'portugal-8': { q: 'Portugal Lisbon Porto', c: ['PT'], min: 5, max: 12, d: 'portugal' },
  'iceland-7': { q: 'Iceland ring road', c: ['IS'], min: 5, max: 10, d: 'iceland' },
  'scotland-5': { q: 'Scotland Highlands Isle of Skye', c: ['GB'], min: 3, max: 8, d: 'scotland' },
  'switzerland-8': { q: 'Switzerland Alps', c: ['CH'], min: 5, max: 12, d: 'switzerland' },
  'kenya-7': { q: 'Kenya safari Masai Mara', c: ['KE'], min: 4, max: 10, d: 'kenya' },
  'southafrica-10': { q: 'South Africa Cape Town Kruger Garden Route', c: ['ZA'], min: 7, max: 15, d: 'south-africa' },
  'costarica-9': { q: 'Costa Rica', c: ['CR'], min: 6, max: 14, d: 'costa-rica' },
  'patagonia-12': { q: 'Patagonia', c: ['AR', 'CL'], min: 8, max: 18, d: 'argentina' },
  'canada-7': { q: 'Canadian Rockies Banff Jasper', c: ['CA'], min: 5, max: 12, d: 'canada' },
  'australia-12': { q: 'Australia Sydney Uluru', c: ['AU'], min: 8, max: 18, d: 'australia' },
  'newzealand-12': { q: 'New Zealand', c: ['NZ'], min: 8, max: 18, d: 'new-zealand' }
};

export { tourRadarLink } from './tpPartners';

/** TourRadar'ın desteklediği para birimi: ziyaretçinin diline/saat dilimine göre. */
export const tourCurrency = (lang: string): string => {
  let tz = '';
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  } catch {}
  if (tz === 'Europe/London') return 'GBP';
  if (tz.startsWith('Australia/')) return 'AUD';
  if (tz === 'Pacific/Auckland') return 'NZD';
  if (/^America\/(Toronto|Vancouver|Edmonton|Winnipeg|Halifax|St_Johns|Regina)/.test(tz)) return 'CAD';
  if (tz.startsWith('America/')) return 'USD';
  return lang === 'en' && !tz.startsWith('Europe/') ? 'USD' : 'EUR';
};

/** Tur duraklarının dile göre yazımı: [tr, en, de, es, ru]. Listede olmayan rota olduğu gibi gösterilir. */
const ROUTE_I18N: Record<string, [string, string, string, string, string]> = {
  'Bangkok · Chiang Mai · Phuket': ['Bangkok · Chiang Mai · Phuket', 'Bangkok · Chiang Mai · Phuket', 'Bangkok · Chiang Mai · Phuket', 'Bangkok · Chiang Mai · Phuket', 'Бангкок · Чиангмай · Пхукет'],
  'Tokyo · Hakone · Kyoto · Osaka': ['Tokyo · Hakone · Kyoto · Osaka', 'Tokyo · Hakone · Kyoto · Osaka', 'Tokio · Hakone · Kyōto · Osaka', 'Tokio · Hakone · Kioto · Osaka', 'Токио · Хаконэ · Киото · Осака'],
  'Hanoi · Ha Long · Hoi An · Ho Chi Minh': ['Hanoi · Ha Long · Hoi An · Ho Chi Minh', 'Hanoi · Ha Long · Hoi An · Ho Chi Minh City', 'Hanoi · Halong · Hoi An · Ho-Chi-Minh-Stadt', 'Hanói · Ha Long · Hoi An · Ciudad Ho Chi Minh', 'Ханой · Халонг · Хойан · Хошимин'],
  'Ubud · Nusa Penida · Uluwatu': ['Ubud · Nusa Penida · Uluwatu', 'Ubud · Nusa Penida · Uluwatu', 'Ubud · Nusa Penida · Uluwatu', 'Ubud · Nusa Penida · Uluwatu', 'Убуд · Нуса-Пенида · Улувату'],
  'Colombo · Sigiriya · Kandy · Ella': ['Kolombo · Sigiriya · Kandy · Ella', 'Colombo · Sigiriya · Kandy · Ella', 'Colombo · Sigiriya · Kandy · Ella', 'Colombo · Sigiriya · Kandy · Ella', 'Коломбо · Сигирия · Канди · Элла'],
  'Belgrade · Sarajevo · Mostar · Kotor · Tirana': ['Belgrad · Saraybosna · Mostar · Kotor · Tiran', 'Belgrade · Sarajevo · Mostar · Kotor · Tirana', 'Belgrad · Sarajevo · Mostar · Kotor · Tirana', 'Belgrado · Sarajevo · Mostar · Kotor · Tirana', 'Белград · Сараево · Мостар · Котор · Тирана'],
  'Zagreb · Plitvice · Split · Dubrovnik': ['Zagreb · Plitvice · Split · Dubrovnik', 'Zagreb · Plitvice · Split · Dubrovnik', 'Zagreb · Plitvicer Seen · Split · Dubrovnik', 'Zagreb · Plitvice · Split · Dubrovnik', 'Загреб · Плитвице · Сплит · Дубровник'],
  'Tirana · Berat · Gjirokastër · Ksamil': ['Tiran · Berat · Ergiri · Ksamil', 'Tirana · Berat · Gjirokastër · Ksamil', 'Tirana · Berat · Gjirokastra · Ksamil', 'Tirana · Berat · Gjirokastër · Ksamil', 'Тирана · Берат · Гирокастра · Ксамиль'],
  'Rome · Florence · Venice · Amalfi': ['Roma · Floransa · Venedik · Amalfi', 'Rome · Florence · Venice · Amalfi', 'Rom · Florenz · Venedig · Amalfi', 'Roma · Florencia · Venecia · Amalfi', 'Рим · Флоренция · Венеция · Амальфи'],
  'Madrid · Seville · Granada · Lisbon': ['Madrid · Sevilla · Granada · Lizbon', 'Madrid · Seville · Granada · Lisbon', 'Madrid · Sevilla · Granada · Lissabon', 'Madrid · Sevilla · Granada · Lisboa', 'Мадрид · Севилья · Гранада · Лиссабон'],
  'Prague · Vienna · Budapest': ['Prag · Viyana · Budapeşte', 'Prague · Vienna · Budapest', 'Prag · Wien · Budapest', 'Praga · Viena · Budapest', 'Прага · Вена · Будапешт'],
  'Athens · Mykonos · Santorini': ['Atina · Mikonos · Santorini', 'Athens · Mykonos · Santorini', 'Athen · Mykonos · Santorini', 'Atenas · Mykonos · Santorini', 'Афины · Миконос · Санторини'],
  'Oslo · Bergen · Fjords': ['Oslo · Bergen · Fiyortlar', 'Oslo · Bergen · Fjords', 'Oslo · Bergen · Fjorde', 'Oslo · Bergen · Fiordos', 'Осло · Берген · Фьорды'],
  'Cairo · Luxor · Nile cruise · Aswan': ['Kahire · Luksor · Nil gezisi · Asvan', 'Cairo · Luxor · Nile cruise · Aswan', 'Kairo · Luxor · Nilkreuzfahrt · Assuan', 'El Cairo · Luxor · Crucero por el Nilo · Asuán', 'Каир · Луксор · Круиз по Нилу · Асуан'],
  'Marrakech · Sahara · Fes · Chefchaouen': ['Marakeş · Sahra · Fes · Şefşavan', 'Marrakech · Sahara · Fes · Chefchaouen', 'Marrakesch · Sahara · Fès · Chefchaouen', 'Marrakech · Sáhara · Fez · Chefchaouen', 'Марракеш · Сахара · Фес · Шефшауэн'],
  'Amman · Petra · Wadi Rum · Dead Sea': ['Amman · Petra · Wadi Rum · Lut Gölü', 'Amman · Petra · Wadi Rum · Dead Sea', 'Amman · Petra · Wadi Rum · Totes Meer', 'Amán · Petra · Wadi Rum · Mar Muerto', 'Амман · Петра · Вади-Рам · Мёртвое море'],
  'Serengeti · Ngorongoro · Zanzibar': ['Serengeti · Ngorongoro · Zanzibar', 'Serengeti · Ngorongoro · Zanzibar', 'Serengeti · Ngorongoro · Sansibar', 'Serengeti · Ngorongoro · Zanzíbar', 'Серенгети · Нгоронгоро · Занзибар'],
  'Dubai · Desert safari · Abu Dhabi': ['Dubai · Çöl safarisi · Abu Dabi', 'Dubai · Desert safari · Abu Dhabi', 'Dubai · Wüstensafari · Abu Dhabi', 'Dubái · Safari por el desierto · Abu Dabi', 'Дубай · Сафари в пустыне · Абу-Даби'],
  'İstanbul · Kapadokya · Pamukkale · Efes': ['İstanbul · Kapadokya · Pamukkale · Efes', 'Istanbul · Cappadocia · Pamukkale · Ephesus', 'Istanbul · Kappadokien · Pamukkale · Ephesos', 'Estambul · Capadocia · Pamukkale · Éfeso', 'Стамбул · Каппадокия · Памуккале · Эфес'],
  'Göreme · Ürgüp · Avanos · Balon': ['Göreme · Ürgüp · Avanos · Balon', 'Göreme · Ürgüp · Avanos · Balloon ride', 'Göreme · Ürgüp · Avanos · Ballonfahrt', 'Göreme · Ürgüp · Avanos · Paseo en globo', 'Гёреме · Ургюп · Аванос · Полёт на шаре'],
  'İzmir · Efes · Pamukkale · Bodrum': ['İzmir · Efes · Pamukkale · Bodrum', 'Izmir · Ephesus · Pamukkale · Bodrum', 'Izmir · Ephesos · Pamukkale · Bodrum', 'Esmirna · Éfeso · Pamukkale · Bodrum', 'Измир · Эфес · Памуккале · Бодрум'],
  'Lima · Cusco · Sacred Valley · Machu Picchu': ['Lima · Cusco · Kutsal Vadi · Machu Picchu', 'Lima · Cusco · Sacred Valley · Machu Picchu', 'Lima · Cusco · Heiliges Tal · Machu Picchu', 'Lima · Cusco · Valle Sagrado · Machu Picchu', 'Лима · Куско · Священная долина · Мачу-Пикчу'],
  'Mexico City · Oaxaca · Yucatán · Cancún': ['Meksiko · Oaxaca · Yucatán · Cancún', 'Mexico City · Oaxaca · Yucatán · Cancún', 'Mexiko-Stadt · Oaxaca · Yucatán · Cancún', 'Ciudad de México · Oaxaca · Yucatán · Cancún', 'Мехико · Оахака · Юкатан · Канкун'],
  'Los Angeles · Las Vegas · Grand Canyon · San Francisco': ['Los Angeles · Las Vegas · Büyük Kanyon · San Francisco', 'Los Angeles · Las Vegas · Grand Canyon · San Francisco', 'Los Angeles · Las Vegas · Grand Canyon · San Francisco', 'Los Ángeles · Las Vegas · Gran Cañón · San Francisco', 'Лос-Анджелес · Лас-Вегас · Гранд-Каньон · Сан-Франциско'],
  'Delhi · Agra · Jaipur · Varanasi': ['Delhi · Agra · Jaipur · Varanasi', 'Delhi · Agra · Jaipur · Varanasi', 'Delhi · Agra · Jaipur · Varanasi', 'Delhi · Agra · Jaipur · Varanasi', 'Дели · Агра · Джайпур · Варанаси'],
  'Kathmandu · Pokhara · Chitwan': ['Katmandu · Pokhara · Chitwan', 'Kathmandu · Pokhara · Chitwan', 'Kathmandu · Pokhara · Chitwan', 'Katmandú · Pokhara · Chitwan', 'Катманду · Покхара · Читван'],
  'Hanoi · Luang Prabang · Siem Reap · Saigon': ['Hanoi · Luang Prabang · Siem Reap · Saygon', 'Hanoi · Luang Prabang · Siem Reap · Saigon', 'Hanoi · Luang Prabang · Siem Reap · Saigon', 'Hanói · Luang Prabang · Siem Riep · Saigón', 'Ханой · Луангпхабанг · Сиемреап · Сайгон'],
  'Seoul · Gyeongju · Busan · Jeju': ['Seul · Gyeongju · Busan · Jeju', 'Seoul · Gyeongju · Busan · Jeju', 'Seoul · Gyeongju · Busan · Jeju', 'Seúl · Gyeongju · Busan · Jeju', 'Сеул · Кёнджу · Пусан · Чеджу'],
  'Beijing · Xi’an · Guilin · Shanghai': ['Pekin · Şian · Guilin · Şanghay', 'Beijing · Xi’an · Guilin · Shanghai', 'Peking · Xi’an · Guilin · Shanghai', 'Pekín · Xi’an · Guilin · Shanghái', 'Пекин · Сиань · Гуйлинь · Шанхай'],
  'Tashkent · Samarkand · Bukhara · Khiva': ['Taşkent · Semerkant · Buhara · Hive', 'Tashkent · Samarkand · Bukhara · Khiva', 'Taschkent · Samarkand · Buchara · Chiwa', 'Taskent · Samarcanda · Bujará · Jiva', 'Ташкент · Самарканд · Бухара · Хива'],
  'Lisbon · Sintra · Porto · Douro': ['Lizbon · Sintra · Porto · Douro', 'Lisbon · Sintra · Porto · Douro', 'Lissabon · Sintra · Porto · Douro', 'Lisboa · Sintra · Oporto · Duero', 'Лиссабон · Синтра · Порту · Дору'],
  'Reykjavík · Golden Circle · South Coast · Glaciers': ['Reykjavík · Altın Çember · Güney Kıyısı · Buzullar', 'Reykjavík · Golden Circle · South Coast · Glaciers', 'Reykjavík · Golden Circle · Südküste · Gletscher', 'Reikiavik · Círculo Dorado · Costa Sur · Glaciares', 'Рейкьявик · Золотое кольцо · Южное побережье · Ледники'],
  'Edinburgh · Loch Ness · Isle of Skye': ['Edinburgh · Loch Ness · Skye Adası', 'Edinburgh · Loch Ness · Isle of Skye', 'Edinburgh · Loch Ness · Isle of Skye', 'Edimburgo · Lago Ness · Isla de Skye', 'Эдинбург · Лох-Несс · Остров Скай'],
  'Zurich · Lucerne · Interlaken · Zermatt': ['Zürih · Lucerne · Interlaken · Zermatt', 'Zurich · Lucerne · Interlaken · Zermatt', 'Zürich · Luzern · Interlaken · Zermatt', 'Zúrich · Lucerna · Interlaken · Zermatt', 'Цюрих · Люцерн · Интерлакен · Церматт'],
  'Masai Mara · Lake Nakuru · Amboseli': ['Masai Mara · Nakuru Gölü · Amboseli', 'Masai Mara · Lake Nakuru · Amboseli', 'Masai Mara · Nakurusee · Amboseli', 'Masái Mara · Lago Nakuru · Amboseli', 'Масаи-Мара · Озеро Накуру · Амбосели'],
  'Cape Town · Garden Route · Kruger': ['Cape Town · Garden Route · Kruger', 'Cape Town · Garden Route · Kruger', 'Kapstadt · Garden Route · Kruger', 'Ciudad del Cabo · Ruta Jardín · Kruger', 'Кейптаун · Гарден-Рут · Крюгер'],
  'San José · Arenal · Monteverde · Manuel Antonio': ['San José · Arenal · Monteverde · Manuel Antonio', 'San José · Arenal · Monteverde · Manuel Antonio', 'San José · Arenal · Monteverde · Manuel Antonio', 'San José · Arenal · Monteverde · Manuel Antonio', 'Сан-Хосе · Ареналь · Монтеверде · Мануэль-Антонио'],
  'Buenos Aires · El Calafate · El Chaltén · Torres del Paine': ['Buenos Aires · El Calafate · El Chaltén · Torres del Paine', 'Buenos Aires · El Calafate · El Chaltén · Torres del Paine', 'Buenos Aires · El Calafate · El Chaltén · Torres del Paine', 'Buenos Aires · El Calafate · El Chaltén · Torres del Paine', 'Буэнос-Айрес · Эль-Калафате · Эль-Чальтен · Торрес-дель-Пайне'],
  'Calgary · Banff · Lake Louise · Jasper': ['Calgary · Banff · Louise Gölü · Jasper', 'Calgary · Banff · Lake Louise · Jasper', 'Calgary · Banff · Lake Louise · Jasper', 'Calgary · Banff · Lago Louise · Jasper', 'Калгари · Банф · Озеро Луиз · Джаспер'],
  'Sydney · Uluru · Cairns · Melbourne': ['Sidney · Uluru · Cairns · Melbourne', 'Sydney · Uluru · Cairns · Melbourne', 'Sydney · Uluru · Cairns · Melbourne', 'Sídney · Uluru · Cairns · Melbourne', 'Сидней · Улуру · Кэрнс · Мельбурн'],
  'Auckland · Rotorua · Queenstown · Milford Sound': ['Auckland · Rotorua · Queenstown · Milford Sound', 'Auckland · Rotorua · Queenstown · Milford Sound', 'Auckland · Rotorua · Queenstown · Milford Sound', 'Auckland · Rotorua · Queenstown · Milford Sound', 'Окленд · Роторуа · Квинстаун · Милфорд-Саунд']
};
const ROUTE_IX: Record<string, number> = { tr: 0, en: 1, de: 2, es: 3, ru: 4 };
export const routeName = (route: string, lang: string): string => ROUTE_I18N[route]?.[ROUTE_IX[lang] ?? 1] || route;
