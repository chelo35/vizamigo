// Turlar sayfası: komisyonlu tur ortaklarına (GetYourGuide via Stay22, Klook, Tiqets, WeGoTrip, Go City)
// giden, sosyal medyada paylaşılabilir destinasyon kartları. Her kartın kendi #adresi var.
export interface TourDest {
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
  { id: 'tayland', code: 'TH', search: 'Bangkok', hub: 'BKK',
    name: ['Tayland', 'Thailand', 'Thailand', 'Tailandia', 'Таиланд'],
    pitch: ['Bangkok tapınakları, yüzen pazarlar, Phuket ve Phi Phi adaları tekne turları.', 'Bangkok temples, floating markets and Phuket and Phi Phi island boat trips.', 'Tempel in Bangkok, schwimmende Märkte und Bootstouren zu Phuket und Phi Phi.', 'Templos de Bangkok, mercados flotantes y excursiones en barco por Phuket y Phi Phi.', 'Храмы Бангкока, плавучие рынки и морские туры на Пхукет и Пхи-Пхи.'],
    tags: ['Ada turları', 'Island trips', 'Inseltouren', 'Islas', 'Острова'] },
  { id: 'istanbul', code: 'TR', search: 'Istanbul', hub: 'IST',
    name: ['İstanbul', 'Istanbul', 'Istanbul', 'Estambul', 'Стамбул'],
    pitch: ['Boğaz turu, Ayasofya ve Topkapı biletleri, Kapalıçarşı ve yemek turları.', 'Bosphorus cruises, Hagia Sophia and Topkapı tickets, Grand Bazaar and food tours.', 'Bosporus-Fahrten, Hagia Sophia und Topkapı, Großer Basar und Food-Touren.', 'Cruceros por el Bósforo, Santa Sofía y Topkapı, Gran Bazar y rutas gastronómicas.', 'Прогулки по Босфору, Айя-София и Топкапы, Гранд-базар и гастротуры.'],
    tags: ['Boğaz turu', 'Bosphorus', 'Bosporus', 'Bósforo', 'Босфор'] },
  { id: 'kapadokya', code: 'TR', photo: '/images/tours/kapadokya-480.webp', credit: 'MusikAnimal, CC BY-SA 4.0, Wikimedia Commons', search: 'Cappadocia', hub: 'NAV',
    name: ['Kapadokya', 'Cappadocia', 'Kappadokien', 'Capadocia', 'Каппадокия'],
    pitch: ['Gün doğumunda balon turu, peri bacaları, yeraltı şehirleri ve ATV turları.', 'Sunrise balloon flights, fairy chimneys, underground cities and ATV tours.', 'Ballonfahrt bei Sonnenaufgang, Feenkamine, unterirdische Städte und Quad-Touren.', 'Globo al amanecer, chimeneas de hadas, ciudades subterráneas y quads.', 'Полёт на шаре на рассвете, «дымоходы фей», подземные города и квадроциклы.'],
    tags: ['Balon turu', 'Balloon ride', 'Ballonfahrt', 'Globo', 'Воздушный шар'] },
  { id: 'misir', code: 'EG', search: 'Cairo', hub: 'CAI',
    name: ['Mısır', 'Egypt', 'Ägypten', 'Egipto', 'Египет'],
    pitch: ['Gize piramitleri, Nil gemi turları, Luksor tapınakları ve Kızıldeniz dalış turları.', 'Giza pyramids, Nile cruises, Luxor temples and Red Sea diving trips.', 'Pyramiden von Gizeh, Nilkreuzfahrten, Luxor und Tauchen im Roten Meer.', 'Pirámides de Guiza, cruceros por el Nilo, Luxor y buceo en el mar Rojo.', 'Пирамиды Гизы, круизы по Нилу, Луксор и дайвинг в Красном море.'],
    tags: ['Nil gemi turu', 'Nile cruise', 'Nilkreuzfahrt', 'Crucero Nilo', 'Круиз по Нилу'] },
  { id: 'italya', code: 'IT', search: 'Rome', hub: 'FCO',
    name: ['İtalya', 'Italy', 'Italien', 'Italia', 'Италия'],
    pitch: ['Kolezyum ve Vatikan sırasız giriş, Floransa, Venedik ve Amalfi kıyısı turları.', 'Skip-the-line Colosseum and Vatican, Florence, Venice and Amalfi Coast tours.', 'Kolosseum und Vatikan ohne Anstehen, Florenz, Venedig und Amalfiküste.', 'Coliseo y Vaticano sin colas, Florencia, Venecia y costa Amalfitana.', 'Колизей и Ватикан без очереди, Флоренция, Венеция и Амальфи.'],
    tags: ['Sırasız giriş', 'Skip the line', 'Ohne Anstehen', 'Sin colas', 'Без очереди'] },
  { id: 'balkanlar', code: 'ME', search: 'Kotor', hub: 'TIV',
    name: ['Balkanlar', 'The Balkans', 'Balkan', 'Los Balcanes', 'Балканы'],
    pitch: ['Kotor Körfezi, Saraybosna, Mostar Köprüsü, Ohrid Gölü ve Belgrad turları.', 'Bay of Kotor, Sarajevo, Mostar bridge, Lake Ohrid and Belgrade tours.', 'Bucht von Kotor, Sarajevo, Brücke von Mostar, Ohridsee und Belgrad.', 'Bahía de Kotor, Sarajevo, puente de Mostar, lago Ohrid y Belgrado.', 'Бухта Котор, Сараево, мост в Мостаре, Охрид и Белград.'],
    tags: ['Çok ülkeli', 'Multi-country', 'Mehrere Länder', 'Varios países', 'Несколько стран'] },
  { id: 'dubai', code: 'AE', search: 'Dubai', hub: 'DXB',
    name: ['Dubai', 'Dubai', 'Dubai', 'Dubái', 'Дубай'],
    pitch: ['Çöl safarisi, Burj Khalifa, Dubai Marina tekne turu ve Abu Dabi günübirlik turu.', 'Desert safari, Burj Khalifa, Dubai Marina cruise and an Abu Dhabi day trip.', 'Wüstensafari, Burj Khalifa, Marina-Bootsfahrt und Tagesausflug nach Abu Dhabi.', 'Safari por el desierto, Burj Khalifa, crucero en la Marina y Abu Dabi.', 'Сафари в пустыне, Бурдж-Халифа, круиз по Марине и Абу-Даби.'],
    tags: ['Çöl safarisi', 'Desert safari', 'Wüstensafari', 'Safari', 'Сафари'] },
  { id: 'yunanistan', code: 'GR', search: 'Athens', hub: 'ATH',
    name: ['Yunanistan', 'Greece', 'Griechenland', 'Grecia', 'Греция'],
    pitch: ['Akropolis, Santorini gün batımı, ada tekne turları ve Atina yemek turları.', 'The Acropolis, Santorini sunsets, island boat trips and Athens food tours.', 'Akropolis, Sonnenuntergang auf Santorini, Inselboote und Food-Touren.', 'La Acrópolis, atardeceres en Santorini, barcos por las islas y comida.', 'Акрополь, закаты Санторини, морские прогулки и гастротуры.'],
    tags: ['Ada turları', 'Island hopping', 'Inselhopping', 'Islas', 'Острова'] },
  { id: 'japonya', code: 'JP', search: 'Tokyo', hub: 'NRT',
    name: ['Japonya', 'Japan', 'Japan', 'Japón', 'Япония'],
    pitch: ['Tokyo, Fuji Dağı günübirlik turu, Kyoto tapınakları ve JR Pass ile tren gezileri.', 'Tokyo, a Mount Fuji day trip, Kyoto temples and rail trips with a JR Pass.', 'Tokio, Tagesausflug zum Fuji, Tempel in Kyoto und Zugreisen mit JR Pass.', 'Tokio, excursión al Fuji, templos de Kioto y trenes con JR Pass.', 'Токио, поездка к Фудзи, храмы Киото и JR Pass.'],
    tags: ['Fuji turu', 'Mt Fuji', 'Fuji', 'Fuji', 'Фудзи'] },
  { id: 'bali', code: 'ID', search: 'Bali', hub: 'DPS',
    name: ['Bali', 'Bali', 'Bali', 'Bali', 'Бали'],
    pitch: ['Ubud pirinç tarlaları, şelaleler, Nusa Penida tekne turu ve gün doğumu yürüyüşü.', 'Ubud rice terraces, waterfalls, a Nusa Penida boat trip and a sunrise hike.', 'Reisterrassen von Ubud, Wasserfälle, Nusa Penida und Sonnenaufgangswanderung.', 'Arrozales de Ubud, cascadas, Nusa Penida y caminata al amanecer.', 'Рисовые террасы Убуда, водопады, Нуса-Пенида и рассвет на вулкане.'],
    tags: ['Doğa', 'Nature', 'Natur', 'Naturaleza', 'Природа'] },
  { id: 'ispanya', code: 'ES', search: 'Barcelona', hub: 'BCN',
    name: ['İspanya', 'Spain', 'Spanien', 'España', 'Испания'],
    pitch: ['Sagrada Família, Park Güell, Madrid müzeleri ve Endülüs flamenko gecesi.', 'Sagrada Família, Park Güell, Madrid museums and a flamenco night in Andalusia.', 'Sagrada Família, Park Güell, Madrider Museen und Flamenco in Andalusien.', 'Sagrada Família, Park Güell, museos de Madrid y flamenco en Andalucía.', 'Саграда Фамилия, парк Гуэль, музеи Мадрида и фламенко.'],
    tags: ['Şehir turu', 'City tours', 'Stadttouren', 'Ciudad', 'Город'] },
  { id: 'fransa', code: 'FR', search: 'Paris', hub: 'CDG',
    name: ['Fransa', 'France', 'Frankreich', 'Francia', 'Франция'],
    pitch: ['Eyfel Kulesi, Louvre, Seine tekne turu, Versay ve Disneyland Paris biletleri.', 'Eiffel Tower, the Louvre, Seine cruises, Versailles and Disneyland Paris tickets.', 'Eiffelturm, Louvre, Seine-Fahrt, Versailles und Disneyland Paris.', 'Torre Eiffel, Louvre, crucero por el Sena, Versalles y Disneyland.', 'Эйфелева башня, Лувр, Сена, Версаль и Диснейленд.'],
    tags: ['Müze biletleri', 'Museum tickets', 'Museumstickets', 'Museos', 'Музеи'] },
  { id: 'fas', code: 'MA', search: 'Marrakech', hub: 'RAK',
    name: ['Fas', 'Morocco', 'Marokko', 'Marruecos', 'Марокко'],
    pitch: ['Marakeş medinası, Sahra çölünde kamp, Atlas Dağları ve Şafşavan mavi şehir.', 'Marrakech medina, a Sahara desert camp, the Atlas Mountains and blue Chefchaouen.', 'Medina von Marrakesch, Wüstencamp, Atlasgebirge und das blaue Chefchaouen.', 'Medina de Marrakech, campamento en el Sáhara, Atlas y Chefchaouen.', 'Медина Марракеша, лагерь в Сахаре, Атлас и Шефшауэн.'],
    tags: ['Sahra turu', 'Sahara tour', 'Sahara', 'Sáhara', 'Сахара'] },
  { id: 'gurcistan', code: 'GE', search: 'Tbilisi', hub: 'TBS',
    name: ['Gürcistan', 'Georgia', 'Georgien', 'Georgia', 'Грузия'],
    pitch: ['Tiflis eski şehir, Kazbegi dağ turu, Kakheti şarap rotası ve Batum.', 'Tbilisi old town, a Kazbegi mountain trip, the Kakheti wine route and Batumi.', 'Altstadt von Tiflis, Kasbegi, Weinroute Kachetien und Batumi.', 'Casco antiguo de Tiflis, Kazbegi, ruta del vino de Kajetia y Batumi.', 'Старый Тбилиси, Казбеги, Кахетия и Батуми.'],
    tags: ['Şarap ve dağ', 'Wine & mountains', 'Wein & Berge', 'Vino y montaña', 'Вино и горы'] },
  { id: 'vietnam', code: 'VN', search: 'Hanoi', hub: 'HAN',
    name: ['Vietnam', 'Vietnam', 'Vietnam', 'Vietnam', 'Вьетнам'],
    pitch: ['Ha Long Körfezi gemi turu, Hanoi sokak lezzetleri, Hoi An ve Mekong Deltası.', 'Ha Long Bay cruises, Hanoi street food, Hoi An and the Mekong Delta.', 'Halong-Bucht, Streetfood in Hanoi, Hoi An und Mekong-Delta.', 'Bahía de Ha Long, comida callejera de Hanói, Hoi An y el Mekong.', 'Халонг, уличная еда Ханоя, Хойан и дельта Меконга.'],
    tags: ['Ha Long', 'Ha Long Bay', 'Halong', 'Ha Long', 'Халонг'] }
];

/** Turlar sayfasının dile göre adresi: /tr/turlar, /en/tours, /de/touren, /es/tours, /ru/tours */
export const TOURS_SLUG: Record<string, string> = { tr: 'turlar', en: 'tours', de: 'touren', es: 'tours', ru: 'tours' };
export const toursPath = (lang: string) => `/${lang}/${TOURS_SLUG[lang] || 'tours'}`;
