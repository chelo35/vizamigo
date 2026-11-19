/**
 * Ayrıntılı miras verisi (COUNTRY_HERITAGE) olmayan ülkeler için gerçek, tanınmış görülecek yerler.
 * Eskiden bu ülkelerde "<Başkent> Historic Old Town & Grand Boulevard" gibi doldurma metinler vardı.
 * Her yer: [en, tr, de, es, ru] — her dilde yerleşik yazımıyla (Wikidata etiketleri referans alındı).
 */
type L5 = [string, string, string, string, string];

const D: Record<string, L5[]> = {
  XK: [
    ['Prizren Old Town', 'Prizren Eski Şehir', 'Altstadt von Prizren', 'Casco antiguo de Prizren', 'Старый город Призрена'],
    ['Rugova Canyon', 'Rugova Kanyonu', 'Rugova-Schlucht', 'Cañón de Rugova', 'Руговское ущелье'],
    ['Visoki Dečani Monastery', 'Visoki Dečani Manastırı', 'Kloster Visoki Dečani', 'Monasterio de Visoki Dečani', 'Монастырь Високи-Дечани']
  ],
  MD: [
    ['Old Orhei (Orheiul Vechi)', 'Eski Orhei (Orheiul Vechi)', 'Orheiul Vechi', 'Orheiul Vechi', 'Старый Орхей'],
    ['Mileștii Mici Wine Cellars', 'Mileștii Mici Şarap Mahzenleri', 'Weinkeller Mileștii Mici', 'Bodegas de Mileștii Mici', 'Винные подвалы Милештий Мичь'],
    ['Cricova Winery', 'Cricova Şarap Mahzenleri', 'Weingut Cricova', 'Bodegas de Cricova', 'Винный комбинат «Крикова»'],
    ['Soroca Fortress', 'Soroca Kalesi', 'Festung Soroca', 'Fortaleza de Soroca', 'Сорокская крепость']
  ],
  BY: [
    ['Mir Castle', 'Mir Kalesi', 'Schloss Mir', 'Castillo de Mir', 'Мирский замок'],
    ['Nesvizh Castle', 'Nesvizh Kalesi', 'Schloss Njaswisch', 'Castillo de Nesvizh', 'Несвижский замок'],
    ['Brest Fortress', 'Brest Kalesi', 'Brester Festung', 'Fortaleza de Brest', 'Брестская крепость'],
    ['Belovezhskaya Pushcha National Park', 'Belovejskaya Puşa Milli Parkı', 'Nationalpark Belowescher Heide', 'Parque nacional Belovezhskaya Pushcha', 'Национальный парк «Беловежская пуща»']
  ],
  AM: [
    ['Geghard Monastery', 'Geğard Manastırı', 'Kloster Geghard', 'Monasterio de Geghard', 'Монастырь Гегард'],
    ['Garni Temple', 'Garni Tapınağı', 'Tempel von Garni', 'Templo de Garni', 'Храм Гарни'],
    ['Lake Sevan', 'Sevan Gölü', 'Sewansee', 'Lago Sevan', 'Озеро Севан'],
    ['Tatev Monastery', 'Tatev Manastırı', 'Kloster Tatew', 'Monasterio de Tatev', 'Монастырь Татев']
  ],
  KW: [
    ['Kuwait Towers', 'Kuveyt Kuleleri', 'Kuwait Towers', 'Torres de Kuwait', 'Кувейтские башни'],
    ['Grand Mosque of Kuwait', 'Kuveyt Büyük Camii', 'Große Moschee von Kuwait', 'Gran Mezquita de Kuwait', 'Большая мечеть Кувейта'],
    ['Souq Al-Mubarakiya', 'Mübarekiye Çarşısı (Souq Al-Mubarakiya)', 'Souq Al-Mubarakiya', 'Zoco Al-Mubarakiya', 'Рынок Аль-Мубаракия'],
    ['Failaka Island', 'Feyleke Adası', 'Insel Failaka', 'Isla Failaka', 'Остров Файлака']
  ],
  BH: [
    ["Qal'at al-Bahrain (Bahrain Fort)", 'Bahreyn Kalesi (Kal’at el-Bahreyn)', "Qal'at al-Bahrain (Bahrain-Fort)", "Qal'at al-Bahrain (Fuerte de Baréin)", 'Калат-аль-Бахрейн (Бахрейнский форт)'],
    ['Al Fateh Grand Mosque', 'El Fatih Büyük Camii', 'Al-Fateh-Moschee', 'Gran Mezquita Al Fateh', 'Мечеть Аль-Фатих'],
    ['Bab Al Bahrain', 'Bab el-Bahreyn', 'Bab Al Bahrain', 'Bab Al Bahrain', 'Баб-аль-Бахрейн']
  ],
  KG: [
    ['Issyk-Kul Lake', 'Isık Göl', 'Yssykköl-See', 'Lago Issyk-Kul', 'Озеро Иссык-Куль'],
    ['Ala Archa National Park', 'Ala-Arça Milli Parkı', 'Nationalpark Ala-Artscha', 'Parque nacional Ala Archa', 'Национальный парк Ала-Арча'],
    ['Song-Kul Lake', 'Songköl Gölü', 'Songköl-See', 'Lago Song-Kul', 'Озеро Сон-Куль'],
    ['Burana Tower', 'Burana Kulesi', 'Burana-Turm', 'Torre de Burana', 'Башня Бурана']
  ],
  TJ: [
    ['Iskanderkul Lake', 'İskenderkul Gölü', 'Iskanderkul-See', 'Lago Iskanderkul', 'Озеро Искандеркуль'],
    ['Pamir Highway', 'Pamir Yolu', 'Pamir Highway', 'Carretera del Pamir', 'Памирский тракт'],
    ['Hisor Fortress', 'Hisar Kalesi', 'Festung Hissor', 'Fortaleza de Hisor', 'Гиссарская крепость']
  ],
  TM: [
    ['Darvaza Gas Crater', 'Derweze Gaz Krateri (Cehennem Kapısı)', 'Gaskrater von Derweze', 'Cráter de Darvaza', 'Газовый кратер Дарваза'],
    ['Ancient Merv', 'Antik Merv', 'Antikes Merw', 'Antigua Merv', 'Древний Мерв'],
    ['Kunya-Urgench', 'Köneürgenç', 'Köneürgenç', 'Kunya-Urgench', 'Куня-Ургенч']
  ],
  MN: [
    ['Gorkhi-Terelj National Park', 'Gorkhi-Terelj Milli Parkı', 'Nationalpark Gorchi-Tereldsch', 'Parque nacional Gorkhi-Terelj', 'Национальный парк Горхи-Тэрэлж'],
    ['Erdene Zuu Monastery', 'Erdene Zuu Manastırı', 'Kloster Erdene Dsuu', 'Monasterio de Erdene Zuu', 'Монастырь Эрдэни-Дзу'],
    ['Khongoryn Els (Gobi Desert)', 'Khongoryn Els Kumulları (Gobi Çölü)', 'Chongoryn Els (Wüste Gobi)', 'Dunas de Khongoryn Els (desierto de Gobi)', 'Барханы Хонгорын-Элс (пустыня Гоби)']
  ],
  BD: [
    ['Sundarbans', 'Sundarbans Mangrov Ormanları', 'Sundarbans', 'Sundarbans', 'Сундарбан'],
    ["Cox's Bazar Beach", "Cox's Bazar Plajı", "Strand von Cox's Bazar", "Playa de Cox's Bazar", 'Пляж Кокс-Базар'],
    ['Ahsan Manzil', 'Ahsan Manzil Sarayı', 'Ahsan Manzil', 'Ahsan Manzil', 'Дворец Ахсан-Манзиль']
  ],
  MV: [
    ['Old Friday Mosque (Malé)', 'Eski Cuma Camii (Male)', 'Alte Freitagsmoschee (Malé)', 'Antigua Mezquita del Viernes (Malé)', 'Старая пятничная мечеть (Мале)'],
    ['Baa Atoll Biosphere Reserve', 'Baa Atolü Biyosfer Rezervi', 'Biosphärenreservat Baa-Atoll', 'Reserva de la biosfera del atolón Baa', 'Биосферный заповедник атолла Баа'],
    ['South Ari Atoll', 'Güney Ari Atolü', 'Süd-Ari-Atoll', 'Atolón Ari Sur', 'Атолл Южный Ари']
  ],
  HK: [
    ['Victoria Peak', 'Victoria Zirvesi', 'Victoria Peak', 'Pico Victoria', 'Пик Виктория'],
    ['Tian Tan Buddha', 'Tian Tan Buda Heykeli', 'Tian-Tan-Buddha', 'Buda Tian Tan', 'Большой Будда Тяньтань'],
    ['Star Ferry', 'Star Ferry Vapuru', 'Star Ferry', 'Star Ferry', 'Паром Star Ferry']
  ],
  MO: [
    ["Ruins of St. Paul's", "Aziz Paul Kilisesi Kalıntıları", 'Ruine der Pauluskirche', 'Ruinas de San Pablo', 'Руины собора Святого Павла'],
    ['Senado Square', 'Senado Meydanı', 'Senado-Platz', 'Plaza del Senado', 'Площадь Сенадо'],
    ['Macau Tower', 'Makao Kulesi', 'Macau Tower', 'Torre de Macao', 'Башня Макао']
  ],
  KH: [
    ['Angkor Wat', 'Angkor Vat', 'Angkor Wat', 'Angkor Wat', 'Ангкор-Ват'],
    ['Bayon Temple', 'Bayon Tapınağı', 'Bayon-Tempel', 'Templo de Bayón', 'Храм Байон'],
    ['Royal Palace (Phnom Penh)', 'Kraliyet Sarayı (Phnom Penh)', 'Königspalast (Phnom Penh)', 'Palacio Real (Nom Pen)', 'Королевский дворец (Пномпень)']
  ],
  LA: [
    ['Luang Prabang Old Town', 'Luang Prabang Eski Şehir', 'Altstadt von Luang Prabang', 'Casco antiguo de Luang Prabang', 'Старый город Луангпхабанга'],
    ['Kuang Si Falls', 'Kuang Si Şelalesi', 'Kuang-Si-Wasserfälle', 'Cataratas de Kuang Si', 'Водопад Куангси'],
    ['Vang Vieng', 'Vang Vieng', 'Vang Vieng', 'Vang Vieng', 'Ванвьенг'],
    ['Plain of Jars', 'Küpler Ovası', 'Ebene der Tonkrüge', 'Llanura de las Jarras', 'Долина кувшинов']
  ],
  MM: [
    ['Bagan', 'Bagan Tapınakları', 'Bagan', 'Bagan', 'Баган'],
    ['Shwedagon Pagoda', 'Shwedagon Pagodası', 'Shwedagon-Pagode', 'Pagoda de Shwedagon', 'Пагода Шведагон'],
    ['Inle Lake', 'İnle Gölü', 'Inle-See', 'Lago Inle', 'Озеро Инле']
  ],
  MU: [
    ['Le Morne Brabant', 'Le Morne Brabant', 'Le Morne Brabant', 'Le Morne Brabant', 'Гора Ле-Морн-Брабан'],
    ['Chamarel Seven Coloured Earth', 'Chamarel Yedi Renkli Topraklar', 'Siebenfarbige Erde von Chamarel', 'Tierra de los Siete Colores de Chamarel', 'Семицветные земли Шамареля'],
    ['Black River Gorges National Park', 'Black River Gorges Milli Parkı', 'Nationalpark Black River Gorges', 'Parque nacional Black River Gorges', 'Национальный парк Блэк-Ривер-Горджес']
  ],
  SC: [
    ["Anse Source d'Argent", "Anse Source d'Argent Plajı", "Anse Source d'Argent", "Anse Source d'Argent", 'Пляж Анс-Сурс-д’Аржан'],
    ['Vallée de Mai', 'Vallée de Mai Doğa Rezervi', 'Vallée de Mai', 'Vallée de Mai', 'Валле-де-Мэ'],
    ['Beau Vallon Beach', 'Beau Vallon Plajı', 'Strand Beau Vallon', 'Playa de Beau Vallon', 'Пляж Бо-Валлон']
  ],
  AD: [
    ['Madriu-Perafita-Claror Valley', 'Madriu-Perafita-Claror Vadisi', 'Madriu-Perafita-Claror-Tal', 'Valle del Madriu-Perafita-Claror', 'Долина Мадриу-Перафита-Кларор'],
    ['Caldea Spa', 'Caldea Termal Merkezi', 'Thermalbad Caldea', 'Balneario Caldea', 'Термальный комплекс Кальдеа'],
    ['Grandvalira Ski Area', 'Grandvalira Kayak Merkezi', 'Skigebiet Grandvalira', 'Estación de esquí Grandvalira', 'Горнолыжный курорт Грандвалира']
  ],
  LI: [
    ['Vaduz Castle', 'Vaduz Şatosu', 'Schloss Vaduz', 'Castillo de Vaduz', 'Замок Вадуц'],
    ['Kunstmuseum Liechtenstein', 'Lihtenştayn Sanat Müzesi', 'Kunstmuseum Liechtenstein', 'Museo de Arte de Liechtenstein', 'Художественный музей Лихтенштейна'],
    ['Malbun', 'Malbun Kayak Köyü', 'Malbun', 'Malbun', 'Мальбун']
  ],
  MC: [
    ['Monte Carlo Casino', 'Monte Carlo Kumarhanesi', 'Casino von Monte-Carlo', 'Casino de Montecarlo', 'Казино Монте-Карло'],
    ["Prince's Palace of Monaco", 'Monako Prens Sarayı', 'Fürstenpalast von Monaco', 'Palacio del Príncipe de Mónaco', 'Княжеский дворец Монако'],
    ['Oceanographic Museum', 'Oşinografi Müzesi', 'Ozeanographisches Museum', 'Museo Oceanográfico', 'Океанографический музей']
  ],
  SM: [
    ['Guaita Tower', 'Guaita Kulesi', 'Guaita-Turm', 'Torre Guaita', 'Башня Гуаита'],
    ['Palazzo Pubblico', 'Palazzo Pubblico (Hükümet Sarayı)', 'Palazzo Pubblico', 'Palazzo Pubblico', 'Палаццо Пубблико'],
    ['Mount Titano', 'Titano Dağı', 'Monte Titano', 'Monte Titano', 'Гора Титано']
  ],
  VA: [
    ["St. Peter's Basilica", 'Aziz Petrus Bazilikası', 'Petersdom', 'Basílica de San Pedro', 'Собор Святого Петра'],
    ['Sistine Chapel', 'Sistina Şapeli', 'Sixtinische Kapelle', 'Capilla Sixtina', 'Сикстинская капелла'],
    ['Vatican Museums', 'Vatikan Müzeleri', 'Vatikanische Museen', 'Museos Vaticanos', 'Музеи Ватикана']
  ],
  AF: [
    ['Band-e Amir', 'Band-ı Emir Gölleri', 'Band-e Amir', 'Band-e Amir', 'Банде-Амир'],
    ['Minaret of Jam', 'Cam Minaresi', 'Minarett von Dscham', 'Minarete de Jam', 'Минарет Джам'],
    ['Bamiyan Valley', 'Bamyan Vadisi', 'Tal von Bamiyan', 'Valle de Bāmiyān', 'Бамианская долина']
  ],
  BN: [
    ['Omar Ali Saifuddien Mosque', 'Sultan Ömer Ali Seyfeddin Camii', 'Omar-Ali-Saifuddin-Moschee', 'Mezquita Omar Ali Saifuddien', 'Мечеть Омара Али Сайфуддина'],
    ['Kampong Ayer', 'Kampong Ayer Su Köyü', 'Kampong Ayer', 'Kampong Ayer', 'Кампонг-Айер'],
    ['Ulu Temburong National Park', 'Ulu Temburong Milli Parkı', 'Nationalpark Ulu Temburong', 'Parque nacional Ulu Temburong', 'Национальный парк Улу-Тембуронг']
  ],
  BT: [
    ["Paro Taktsang (Tiger's Nest)", 'Paro Taktsang (Kaplan Yuvası Manastırı)', 'Paro Taktsang (Tigernest)', 'Paro Taktsang (Nido del Tigre)', 'Такцанг-лакханг (Гнездо тигрицы)'],
    ['Punakha Dzong', 'Punakha Dzong', 'Punakha Dzong', 'Punakha Dzong', 'Пунакха-дзонг'],
    ['Dochula Pass', 'Dochula Geçidi', 'Dochula-Pass', 'Paso de Dochula', 'Перевал Дочула']
  ],
  KP: [
    ['Kim Il Sung Square', 'Kim İl-sung Meydanı', 'Kim-Il-sung-Platz', 'Plaza Kim Il-sung', 'Площадь Ким Ир Сена'],
    ['Juche Tower', 'Juche Kulesi', 'Juche-Turm', 'Torre Juche', 'Монумент идей чучхе'],
    ['Panmunjom (DMZ)', 'Panmunjom (Askerden Arındırılmış Bölge)', 'Panmunjeom (DMZ)', 'Panmunjom (zona desmilitarizada)', 'Пханмунджом (ДМЗ)']
  ],
  TL: [
    ['Cristo Rei of Dili', 'Dili Cristo Rei Heykeli', 'Cristo Rei von Dili', 'Cristo Rei de Dili', 'Статуя Кришту-Рей (Дили)'],
    ['Atauro Island', 'Atauro Adası', 'Insel Atauro', 'Isla de Atauro', 'Остров Атауро'],
    ['Jaco Island', 'Jaco Adası', 'Insel Jaco', 'Isla de Jaco', 'Остров Жаку']
  ],
  IQ: [
    ['Erbil Citadel', 'Erbil Kalesi', 'Zitadelle von Erbil', 'Ciudadela de Erbil', 'Цитадель Эрбиля'],
    ['Babylon', 'Babil', 'Babylon', 'Babilonia', 'Вавилон'],
    ['Mesopotamian Marshes', 'Mezopotamya Bataklıkları', 'Mesopotamische Sümpfe', 'Marismas de Mesopotamia', 'Месопотамские болота (Эль-Ахвар)']
  ],
  PS: [
    ['Church of the Nativity (Bethlehem)', 'Doğuş Kilisesi (Beytüllahim)', 'Geburtskirche (Bethlehem)', 'Basílica de la Natividad (Belén)', 'Базилика Рождества Христова (Вифлеем)'],
    ['Tell es-Sultan (Jericho)', 'Tell es-Sultan (Eriha)', 'Tell es-Sultan (Jericho)', 'Tell es-Sultan (Jericó)', 'Телль-эс-Султан (Иерихон)'],
    ['Hebron Old City', 'El Halil Eski Şehri', 'Altstadt von Hebron', 'Ciudad vieja de Hebrón', 'Старый город Хеврона']
  ],
  SY: [
    ['Umayyad Mosque', 'Emevi Camii', 'Umayyaden-Moschee', 'Mezquita de los Omeyas', 'Мечеть Омейядов'],
    ['Krak des Chevaliers', 'Şövalyeler Kalesi (Krak des Chevaliers)', 'Krak des Chevaliers', 'Krak de los Caballeros', 'Крак-де-Шевалье'],
    ['Palmyra', 'Palmira', 'Palmyra', 'Palmira', 'Пальмира']
  ],
  YE: [
    ['Socotra Island', 'Sokotra Adası', 'Insel Sokotra', 'Isla de Socotra', 'Остров Сокотра'],
    ["Old City of Sana'a", 'Sana Eski Şehri', "Altstadt von Sana'a", 'Ciudad vieja de Saná', 'Старый город Саны'],
    ['Shibam Hadramawt', 'Şibam (Hadramut)', 'Schibam (Hadramaut)', 'Shibam (Hadramaut)', 'Шибам (Хадрамаут)']
  ],
  AO: [
    ['Kalandula Falls', 'Kalandula Şelalesi', 'Kalandula-Wasserfälle', 'Cataratas de Kalandula', 'Водопад Каландула'],
    ['Fortress of São Miguel (Luanda)', 'São Miguel Kalesi (Luanda)', 'Festung São Miguel (Luanda)', 'Fortaleza de San Miguel (Luanda)', 'Крепость Сан-Мигел (Луанда)'],
    ['Tundavala Gap', 'Tundavala Uçurumu', 'Tundavala-Schlucht', 'Fisura de Tundavala', 'Ущелье Тундавала']
  ],
  BF: [
    ['Sindou Peaks', 'Sindou Kayalıkları', 'Pics de Sindou', 'Picos de Sindou', 'Скалы Синду'],
    ['Ruins of Loropéni', 'Loropéni Harabeleri', 'Ruinen von Loropéni', 'Ruinas de Loropéni', 'Руины Лоропени'],
    ['Karfiguéla Waterfalls', 'Karfiguéla Şelaleleri', 'Wasserfälle von Karfiguéla', 'Cascadas de Karfiguéla', 'Водопады Карфигела']
  ],
  BI: [
    ['Lake Tanganyika', 'Tanganika Gölü', 'Tanganjikasee', 'Lago Tanganica', 'Озеро Танганьика'],
    ['Kibira National Park', 'Kibira Milli Parkı', 'Kibira-Nationalpark', 'Parque nacional de Kibira', 'Национальный парк Кибира'],
    ['Karera Falls', 'Karera Şelaleleri', 'Karera-Wasserfälle', 'Cataratas de Karera', 'Водопады Карера']
  ],
  BJ: [
    ['Ganvié Stilt Village', 'Ganvié Kazıklı Su Köyü', 'Pfahldorf Ganvié', 'Aldea lacustre de Ganvié', 'Деревня на сваях Ганвье'],
    ['Royal Palaces of Abomey', 'Abomey Kraliyet Sarayları', 'Königspaläste von Abomey', 'Palacios reales de Abomey', 'Королевские дворцы Абомея'],
    ['Pendjari National Park', 'Pendjari Milli Parkı', 'Pendjari-Nationalpark', 'Parque nacional de Pendjari', 'Национальный парк Пенджари'],
    ['Door of No Return (Ouidah)', 'Dönüşü Olmayan Kapı (Ouidah)', 'Tor ohne Wiederkehr (Ouidah)', 'Puerta del No Retorno (Ouidah)', 'Врата невозвращения (Уида)']
  ],
  CD: [
    ['Virunga National Park', 'Virunga Milli Parkı', 'Virunga-Nationalpark', 'Parque nacional de Virunga', 'Национальный парк Вирунга'],
    ['Nyiragongo Volcano', 'Nyiragongo Yanardağı', 'Vulkan Nyiragongo', 'Volcán Nyiragongo', 'Вулкан Ньирагонго'],
    ['Kahuzi-Biega National Park', 'Kahuzi-Biéga Milli Parkı', 'Nationalpark Kahuzi-Biéga', 'Parque nacional de Kahuzi-Biega', 'Национальный парк Кахузи-Биега']
  ],
  CF: [
    ['Dzanga-Sangha Reserve', 'Dzanga-Sangha Rezervi', 'Reservat Dzanga-Sangha', 'Reserva de Dzanga-Sangha', 'Заповедник Дзанга-Сангха'],
    ['Boali Falls', 'Boali Şelaleleri', 'Boali-Wasserfälle', 'Cataratas de Boali', 'Водопады Боали'],
    ['Manovo-Gounda St. Floris National Park', 'Manovo-Gounda St. Floris Milli Parkı', 'Nationalpark Manovo-Gounda St. Floris', 'Parque nacional Manovo-Gounda St. Floris', 'Национальный парк Маново-Гоунда-Сен-Флорис']
  ],
  CG: [
    ['Odzala-Kokoua National Park', 'Odzala-Kokoua Milli Parkı', 'Nationalpark Odzala-Kokoua', 'Parque nacional Odzala-Kokoua', 'Национальный парк Одзала-Кокуа'],
    ['Diosso Gorge', 'Diosso Kanyonu', 'Schlucht von Diosso', 'Garganta de Diosso', 'Ущелье Диоссо'],
    ['Basilica of Sainte-Anne (Brazzaville)', 'Sainte-Anne Bazilikası (Brazzaville)', 'Basilika Sainte-Anne (Brazzaville)', 'Basílica de Santa Ana (Brazzaville)', 'Базилика Святой Анны (Браззавиль)']
  ],
  CI: [
    ['Basilica of Our Lady of Peace', 'Barış Meryem Ana Bazilikası', 'Basilika Notre-Dame de la Paix', 'Basílica de Nuestra Señora de la Paz', 'Базилика Нотр-Дам-де-ла-Пэ'],
    ['Grand-Bassam Historic Town', 'Grand-Bassam Tarihi Kenti', 'Historische Stadt Grand-Bassam', 'Ciudad histórica de Grand-Bassam', 'Исторический город Гран-Басам'],
    ['Taï National Park', 'Taï Milli Parkı', 'Nationalpark Taï', 'Parque nacional de Taï', 'Национальный парк Таи']
  ],
  CM: [
    ['Rhumsiki', 'Rhumsiki Kayalıkları', 'Rhumsiki', 'Rhumsiki', 'Румсики'],
    ['Mount Cameroon', 'Kamerun Dağı', 'Kamerunberg', 'Monte Camerún', 'Гора Камерун'],
    ['Lobé Falls (Kribi)', 'Lobé Şelaleleri (Kribi)', 'Lobé-Wasserfälle (Kribi)', 'Cataratas de Lobé (Kribi)', 'Водопады Лобе (Криби)']
  ],
  CV: [
    ['Santa Maria Beach (Sal)', 'Santa Maria Plajı (Sal Adası)', 'Strand von Santa Maria (Sal)', 'Playa de Santa María (Sal)', 'Пляж Санта-Мария (остров Сал)'],
    ['Cidade Velha', 'Cidade Velha', 'Cidade Velha', 'Cidade Velha', 'Сидади-Велья'],
    ['Fogo Volcano', 'Fogo Yanardağı', 'Vulkan Fogo', 'Volcán del Fogo', 'Вулкан Фогу']
  ],
  DJ: [
    ['Lake Assal', 'Asal Gölü', 'Assalsee', 'Lago Assal', 'Озеро Ассаль'],
    ['Lake Abbé', 'Abbe Gölü', 'Abbe-See', 'Lago Abbe', 'Озеро Аббе'],
    ['Moucha Island', 'Muşa Adası', 'Insel Moucha', 'Isla Moucha', 'Остров Муша']
  ],
  ER: [
    ['Asmara Modernist City', 'Asmara Modernist Kent', 'Modernistische Stadt Asmara', 'Ciudad modernista de Asmara', 'Модернистский город Асмэра'],
    ['Massawa Old Town', 'Massava Eski Şehir', 'Altstadt von Massaua', 'Casco antiguo de Massawa', 'Старый город Массауа'],
    ['Dahlak Archipelago', 'Dahlak Takımadaları', 'Dahlak-Archipel', 'Archipiélago Dahlak', 'Архипелаг Дахлак']
  ],
  GA: [
    ['Loango National Park', 'Loango Milli Parkı', 'Loango-Nationalpark', 'Parque nacional de Loango', 'Национальный парк Лоанго'],
    ['Lopé National Park', 'Lopé Milli Parkı', 'Nationalpark Lopé', 'Parque nacional de Lopé', 'Национальный парк Лопе'],
    ['Pongara National Park', 'Pongara Milli Parkı', 'Nationalpark Pongara', 'Parque nacional de Pongara', 'Национальный парк Понгара']
  ],
  GM: [
    ['Gambia River', 'Gambiya Nehri', 'Gambia-Fluss', 'Río Gambia', 'Река Гамбия'],
    ['Kunta Kinteh Island', 'Kunta Kinteh Adası', 'Kunta-Kinteh-Insel', 'Isla Kunta Kinteh', 'Остров Кунта-Кинте'],
    ['Abuko Nature Reserve', 'Abuko Doğa Rezervi', 'Naturschutzgebiet Abuko', 'Reserva natural de Abuko', 'Заповедник Абуко']
  ],
  GN: [
    ['Fouta Djallon', 'Futa Calon Yaylası', 'Fouta Djallon', 'Futa Yallon', 'Плато Фута-Джаллон'],
    ['Îles de Los', 'Los Adaları', 'Îles de Los', 'Islas de Los', 'Острова Лос'],
    ['Mount Nimba', 'Nimba Dağı', 'Nimbaberge', 'Monte Nimba', 'Гора Нимба']
  ],
  GQ: [
    ['Malabo Cathedral', 'Malabo Katedrali', 'Kathedrale von Malabo', 'Catedral de Malabo', 'Кафедральный собор Малабо'],
    ['Monte Alén National Park', 'Monte Alén Milli Parkı', 'Nationalpark Monte Alén', 'Parque nacional de Monte Alén', 'Национальный парк Монте-Ален'],
    ['Bioko Island', 'Bioko Adası', 'Insel Bioko', 'Isla de Bioko', 'Остров Биоко']
  ],
  GW: [
    ['Bijagós Archipelago', 'Bijagós Takımadaları', 'Bissagos-Inseln', 'Archipiélago de las Bijagós', 'Архипелаг Бижагош'],
    ['Bissau Velho', 'Bissau Velho (Eski Bissau)', 'Bissau Velho (Altstadt)', 'Bissau Velho', 'Старый Бисау'],
    ['Orango Islands National Park', 'Orango Adaları Milli Parkı', 'Nationalpark Orango-Inseln', 'Parque nacional de las islas Orango', 'Национальный парк островов Оранго']
  ],
  KM: [
    ['Mount Karthala', 'Karthala Yanardağı', 'Karthala', 'Monte Karthala', 'Вулкан Картала'],
    ['Moroni Old Medina', 'Moroni Eski Medinesi', 'Altstadt (Medina) von Moroni', 'Medina antigua de Moroni', 'Старая медина Морони'],
    ['Mohéli Marine Park', 'Mohéli Deniz Parkı', 'Meerespark Mohéli', 'Parque marino de Mohéli', 'Морской парк Мохели']
  ],
  LR: [
    ['Robertsport', 'Robertsport Plajları', 'Robertsport', 'Robertsport', 'Робертспорт'],
    ['Sapo National Park', 'Sapo Milli Parkı', 'Sapo-Nationalpark', 'Parque nacional de Sapo', 'Национальный парк Сапо'],
    ['Providence Island', 'Providence Adası', 'Providence Island', 'Isla Providence', 'Остров Провиденс']
  ],
  LS: [
    ['Maletsunyane Falls', 'Maletsunyane Şelalesi', 'Maletsunyane-Fälle', 'Cataratas de Maletsunyane', 'Водопад Малецуньяне'],
    ['Sani Pass', 'Sani Geçidi', 'Sani-Pass', 'Paso Sani', 'Перевал Сани'],
    ['Thaba Bosiu', 'Thaba Bosiu Platosu', 'Thaba Bosiu', 'Thaba Bosiu', 'Таба-Босиу'],
    ['Katse Dam', 'Katse Barajı', 'Katse-Damm', 'Presa de Katse', 'Плотина Катсе']
  ],
  LY: [
    ['Leptis Magna', 'Leptis Magna', 'Leptis Magna', 'Leptis Magna', 'Лептис-Магна'],
    ['Sabratha', 'Sabrata', 'Sabratha', 'Sabratha', 'Сабрата'],
    ['Ghadames Old Town', 'Gadames Eski Şehri', 'Altstadt von Ghadames', 'Ciudad vieja de Gadamés', 'Старый город Гадамес']
  ],
  MG: [
    ['Avenue of the Baobabs', 'Baobab Caddesi', 'Allee der Baobabs', 'Avenida de los Baobabs', 'Аллея баобабов'],
    ['Tsingy de Bemaraha', 'Tsingy de Bemaraha', 'Tsingy de Bemaraha', 'Tsingy de Bemaraha', 'Цинжи-дю-Бемараха'],
    ['Nosy Be', 'Nosy Be Adası', 'Nosy Be', 'Nosy Be', 'Остров Нуси-Бе'],
    ['Andasibe-Mantadia National Park', 'Andasibe-Mantadia Milli Parkı', 'Nationalpark Andasibe-Mantadia', 'Parque nacional Andasibe-Mantadia', 'Национальный парк Андасибе-Мантадия']
  ],
  ML: [
    ['Great Mosque of Djenné', 'Cenne Büyük Camii', 'Große Moschee von Djenné', 'Gran Mezquita de Djenné', 'Великая мечеть Дженне'],
    ['Timbuktu', 'Timbuktu', 'Timbuktu', 'Tombuctú', 'Тимбукту'],
    ['Bandiagara Escarpment (Dogon Country)', 'Bandiagara Kayalıkları (Dogon Ülkesi)', 'Falaise de Bandiagara (Land der Dogon)', 'Acantilados de Bandiagara (País Dogón)', 'Уступ Бандиагара (Страна догонов)']
  ],
  MR: [
    ['Chinguetti', 'Şinkit', 'Chinguetti', 'Chinguetti', 'Шингетти'],
    ["Banc d'Arguin National Park", "Banc d'Arguin Milli Parkı", "Nationalpark Banc d'Arguin", "Parque nacional del Banc d'Arguin", 'Национальный парк Банк-д’Арген'],
    ['Ouadane', 'Vadan', 'Ouadane', 'Uadane', 'Уадан'],
    ['Terjit Oasis', 'Terjit Vahası', 'Oase Terjit', 'Oasis de Terjit', 'Оазис Терджит']
  ],
  MW: [
    ['Lake Malawi (Cape Maclear)', 'Malavi Gölü (Cape Maclear)', 'Malawisee (Cape Maclear)', 'Lago Malaui (Cape Maclear)', 'Озеро Малави (Кейп-Маклир)'],
    ['Liwonde National Park', 'Liwonde Milli Parkı', 'Liwonde-Nationalpark', 'Parque nacional de Liwonde', 'Национальный парк Ливонде'],
    ['Mount Mulanje', 'Mulanje Dağı', 'Mulanje-Massiv', 'Monte Mulanje', 'Гора Муланье']
  ],
  MZ: [
    ['Bazaruto Archipelago', 'Bazaruto Takımadaları', 'Bazaruto-Archipel', 'Archipiélago de Bazaruto', 'Архипелаг Базаруто'],
    ['Island of Mozambique', 'Mozambik Adası', 'Ilha de Moçambique', 'Isla de Mozambique', 'Остров Мозамбик'],
    ['Tofo Beach', 'Tofo Plajı', 'Strand von Tofo', 'Playa de Tofo', 'Пляж Тофо']
  ],
  NA: [
    ['Sossusvlei', 'Sossusvlei Kumulları', 'Sossusvlei', 'Sossusvlei', 'Соссусфлей'],
    ['Etosha National Park', 'Etosha Milli Parkı', 'Etosha-Nationalpark', 'Parque nacional de Etosha', 'Национальный парк Этоша'],
    ['Skeleton Coast', 'İskelet Sahili', 'Skelettküste', 'Costa de los Esqueletos', 'Берег Скелетов'],
    ['Fish River Canyon', 'Fish River Kanyonu', 'Fischfluss-Canyon', 'Cañón del río Fish', 'Каньон Фиш-Ривер']
  ],
  NE: [
    ['Agadez Old Town', 'Agadez Eski Şehri', 'Altstadt von Agadez', 'Casco antiguo de Agadez', 'Старый город Агадеса'],
    ['Aïr Mountains', 'Aïr Dağları', 'Aïr-Gebirge', 'Montes Aïr', 'Нагорье Аир'],
    ['W National Park', 'W Milli Parkı', 'Nationalpark W', 'Parque nacional W', 'Национальный парк Дубль-Ве']
  ],
  RW: [
    ['Volcanoes National Park', 'Volkanlar Milli Parkı', 'Vulkan-Nationalpark', 'Parque nacional de los Volcanes', 'Национальный парк Вулканов'],
    ['Lake Kivu', 'Kivu Gölü', 'Kiwusee', 'Lago Kivu', 'Озеро Киву'],
    ['Nyungwe Forest', 'Nyungwe Ormanı', 'Nyungwe-Wald', 'Bosque de Nyungwe', 'Лес Ньюнгве'],
    ['Kigali Genocide Memorial', 'Kigali Soykırım Anıtı', 'Völkermord-Gedenkstätte Kigali', 'Memorial del Genocidio de Kigali', 'Мемориал геноцида в Кигали']
  ],
  SD: [
    ['Meroë Pyramids', 'Meroe Piramitleri', 'Pyramiden von Meroe', 'Pirámides de Meroe', 'Пирамиды Мероэ'],
    ['Jebel Barkal', 'Cebel Barkal', 'Gebel Barkal', 'Jebel Barkal', 'Гора Джебель-Баркал'],
    ['Suakin', 'Sevakin', 'Suakin', 'Suakin', 'Суакин']
  ],
  SL: [
    ['River No. 2 Beach', 'River No. 2 Plajı', 'Strand River No. 2', 'Playa River No. 2', 'Пляж Ривер-Намбер-Ту'],
    ['Tiwai Island', 'Tiwai Adası', 'Insel Tiwai', 'Isla Tiwai', 'Остров Тиваи'],
    ['Banana Islands', 'Muz Adaları (Banana Islands)', 'Banana Islands', 'Islas Banana', 'Банановые острова']
  ],
  SO: [
    ['Laas Geel', 'Laas Geel Mağara Resimleri', 'Laas Geel', 'Laas Geel', 'Лаас-Гааль'],
    ['Lido Beach (Mogadishu)', 'Lido Plajı (Mogadişu)', 'Lido-Strand (Mogadischu)', 'Playa Lido (Mogadiscio)', 'Пляж Лидо (Могадишо)'],
    ['Berbera', 'Berbera', 'Berbera', 'Berbera', 'Бербера']
  ],
  SS: [
    ['White Nile (Juba)', 'Beyaz Nil (Cuba)', 'Weißer Nil (Juba)', 'Nilo Blanco (Yuba)', 'Белый Нил (Джуба)'],
    ['Boma National Park', 'Boma Milli Parkı', 'Boma-Nationalpark', 'Parque nacional de Boma', 'Национальный парк Бома'],
    ['Imatong Mountains', 'İmatong Dağları', 'Imatong-Berge', 'Montes Imatong', 'Горы Иматонг']
  ],
  ST: [
    ['Pico Cão Grande', 'Pico Cão Grande', 'Pico Cão Grande', 'Pico Cão Grande', 'Пику-Кан-Гранди'],
    ['Obô Natural Park', 'Obô Doğal Parkı', 'Naturpark Obô', 'Parque natural Obô', 'Природный парк Обо'],
    ['Ilhéu das Rolas', 'Rolas Adacığı', 'Ilhéu das Rolas', 'Islote de las Rolas', 'Остров Ролаш']
  ],
  SZ: [
    ['Mantenga Falls & Cultural Village', 'Mantenga Şelalesi ve Kültür Köyü', 'Mantenga-Wasserfall & Kulturdorf', 'Cascada y aldea cultural de Mantenga', 'Водопад и культурная деревня Мантенга'],
    ['Hlane Royal National Park', 'Hlane Kraliyet Milli Parkı', 'Hlane Royal National Park', 'Parque nacional real de Hlane', 'Королевский национальный парк Хлане'],
    ['Mlilwane Wildlife Sanctuary', 'Mlilwane Yaban Hayatı Koruma Alanı', 'Mlilwane-Wildschutzgebiet', 'Santuario de vida silvestre de Mlilwane', 'Заповедник Млилване']
  ],
  TD: [
    ['Ennedi Plateau', 'Ennedi Platosu', 'Ennedi-Plateau', 'Meseta de Ennedi', 'Плато Эннеди'],
    ['Zakouma National Park', 'Zakouma Milli Parkı', 'Zakouma-Nationalpark', 'Parque nacional de Zakouma', 'Национальный парк Закума'],
    ['Tibesti Mountains', 'Tibesti Dağları', 'Tibesti-Gebirge', 'Macizo del Tibesti', 'Нагорье Тибести']
  ],
  TG: [
    ['Koutammakou', 'Koutammakou (Batammariba Ülkesi)', 'Koutammakou', 'Koutammakou', 'Кутаммаку'],
    ['Lomé Grand Market', 'Lomé Büyük Çarşısı', 'Großer Markt von Lomé', 'Gran Mercado de Lomé', 'Большой рынок Ломе'],
    ['Kpalimé & Mount Agou', 'Kpalimé ve Agou Dağı', 'Kpalimé & Mont Agou', 'Kpalimé y monte Agou', 'Кпалиме и гора Агу']
  ],
  UG: [
    ['Bwindi Impenetrable Forest', 'Bwindi Geçilmez Ormanı', 'Bwindi Impenetrable Forest', 'Bosque impenetrable de Bwindi', 'Непроходимый лес Бвинди'],
    ['Murchison Falls', 'Murchison Şelaleleri', 'Murchison-Fälle', 'Cataratas Murchison', 'Водопад Мерчисон'],
    ['Queen Elizabeth National Park', 'Kraliçe Elizabeth Milli Parkı', 'Queen-Elizabeth-Nationalpark', 'Parque nacional Reina Isabel', 'Национальный парк Королевы Елизаветы'],
    ['Source of the Nile (Jinja)', 'Nil’in Kaynağı (Jinja)', 'Quelle des Nils (Jinja)', 'Nacimiento del Nilo (Jinja)', 'Исток Нила (Джинджа)']
  ],
  ZM: [
    ['Victoria Falls', 'Victoria Şelalesi', 'Victoriafälle', 'Cataratas Victoria', 'Водопад Виктория'],
    ['South Luangwa National Park', 'Güney Luangwa Milli Parkı', 'South-Luangwa-Nationalpark', 'Parque nacional de Luangwa del Sur', 'Национальный парк Южная Луангва'],
    ['Lower Zambezi National Park', 'Aşağı Zambezi Milli Parkı', 'Lower-Zambezi-Nationalpark', 'Parque nacional del Bajo Zambeze', 'Национальный парк Нижнее Замбези']
  ],
  ZW: [
    ['Victoria Falls', 'Victoria Şelalesi', 'Victoriafälle', 'Cataratas Victoria', 'Водопад Виктория'],
    ['Great Zimbabwe', 'Büyük Zimbabve Harabeleri', 'Great Zimbabwe', 'Gran Zimbabue', 'Большой Зимбабве'],
    ['Hwange National Park', 'Hwange Milli Parkı', 'Hwange-Nationalpark', 'Parque nacional de Hwange', 'Национальный парк Хванге'],
    ['Mana Pools', 'Mana Pools Milli Parkı', 'Mana Pools', 'Mana Pools', 'Национальный парк Мана-Пулс']
  ],
  AG: [
    ["Nelson's Dockyard", 'Nelson Tersanesi', "Nelson's Dockyard", 'Astillero de Nelson', 'Верфь Нельсона'],
    ['Shirley Heights', 'Shirley Heights Seyir Noktası', 'Shirley Heights', 'Shirley Heights', 'Ширли-Хайтс'],
    ['Half Moon Bay', 'Half Moon Koyu', 'Half Moon Bay', 'Bahía Half Moon', 'Бухта Хаф-Мун']
  ],
  BS: [
    ['Exuma Cays', 'Exuma Adacıkları', 'Exuma Cays', 'Cayos de Exuma', 'Острова Эксума'],
    ['Pink Sands Beach (Harbour Island)', 'Pembe Kumlu Plaj (Harbour Island)', 'Pink Sands Beach (Harbour Island)', 'Playa Pink Sands (Harbour Island)', 'Пляж Пинк-Сэндс (Харбор-Айленд)'],
    ['Paradise Island', 'Paradise Adası', 'Paradise Island', 'Isla Paraíso', 'Остров Парадайс']
  ],
  BZ: [
    ['Great Blue Hole', 'Büyük Mavi Çukur', 'Great Blue Hole', 'Gran Agujero Azul', 'Большая голубая дыра'],
    ['Ambergris Caye', 'Ambergris Caye Adası', 'Ambergris Caye', 'Cayo Ambergris', 'Остров Амбергрис-Кей'],
    ['Xunantunich', 'Xunantunich Maya Kalıntıları', 'Xunantunich', 'Xunantunich', 'Шунантунич'],
    ['Caracol', 'Caracol Maya Kenti', 'Caracol (Maya-Stadt)', 'Caracol (ciudad maya)', 'Каракол (город майя)']
  ],
  DM: [
    ['Trafalgar Falls', 'Trafalgar Şelaleleri', 'Trafalgar-Wasserfälle', 'Cataratas Trafalgar', 'Водопады Трафальгар'],
    ['Boiling Lake', 'Kaynayan Göl (Boiling Lake)', 'Boiling Lake (Kochender See)', 'Lago Hirviente', 'Кипящее озеро'],
    ['Champagne Reef', 'Champagne Resifi', 'Champagne Reef', 'Arrecife Champagne', 'Риф Шампань']
  ],
  DO: [
    ['Punta Cana', 'Punta Cana', 'Punta Cana', 'Punta Cana', 'Пунта-Кана'],
    ['Colonial Zone (Santo Domingo)', 'Sömürge Dönemi Şehri (Santo Domingo)', 'Kolonialstadt (Santo Domingo)', 'Zona Colonial (Santo Domingo)', 'Колониальный город (Санто-Доминго)'],
    ['Samaná Peninsula', 'Samaná Yarımadası', 'Halbinsel Samaná', 'Península de Samaná', 'Полуостров Самана']
  ],
  GD: [
    ['Grand Anse Beach', 'Grand Anse Plajı', 'Grand Anse Beach', 'Playa Grand Anse', 'Пляж Гранд-Анс'],
    ['Underwater Sculpture Park', 'Su Altı Heykel Parkı', 'Unterwasser-Skulpturenpark', 'Parque de esculturas submarinas', 'Подводный парк скульптур'],
    ['Fort George (St. George’s)', 'Fort George (St. George’s)', 'Fort George (St. George’s)', 'Fuerte George (St. George’s)', 'Форт Джордж (Сент-Джорджес)']
  ],
  GT: [
    ['Tikal', 'Tikal Maya Kenti', 'Tikal', 'Tikal', 'Тикаль'],
    ['Lake Atitlán', 'Atitlán Gölü', 'Atitlán-See', 'Lago de Atitlán', 'Озеро Атитлан'],
    ['Antigua Guatemala', 'Antigua Guatemala', 'Antigua Guatemala', 'Antigua Guatemala', 'Антигуа-Гуатемала']
  ],
  HN: [
    ['Copán Ruins', 'Copán Maya Kalıntıları', 'Ruinen von Copán', 'Ruinas de Copán', 'Руины Копана'],
    ['Roatán', 'Roatán Adası', 'Roatán', 'Roatán', 'Остров Роатан'],
    ['Pico Bonito National Park', 'Pico Bonito Milli Parkı', 'Nationalpark Pico Bonito', 'Parque nacional Pico Bonito', 'Национальный парк Пико-Бонито']
  ],
  HT: [
    ['Citadelle Laferrière', 'Laferrière Kalesi', 'Citadelle Laferrière', 'Ciudadela Laferrière', 'Цитадель Лаферьер'],
    ['Labadee', 'Labadee Koyu', 'Labadee', 'Labadee', 'Лабади'],
    ['Bassin Bleu', 'Bassin Bleu Şelaleleri', 'Bassin Bleu', 'Bassin Bleu', 'Бассен-Блё']
  ],
  KN: [
    ['Brimstone Hill Fortress', 'Brimstone Hill Kalesi', 'Festung Brimstone Hill', 'Fortaleza de Brimstone Hill', 'Крепость Бримстоун-Хилл'],
    ['Mount Liamuiga', 'Liamuiga Dağı', 'Mount Liamuiga', 'Monte Liamuiga', 'Вулкан Лиамуига'],
    ['Nevis Peak', 'Nevis Zirvesi', 'Nevis Peak', 'Pico Nevis', 'Пик Невис']
  ],
  LC: [
    ['The Pitons', 'Piton Dağları', 'Die Pitons', 'Los Pitones', 'Горы Питоны'],
    ['Sulphur Springs', 'Sulphur Springs Kükürt Kaynakları', 'Sulphur Springs', 'Sulphur Springs', 'Серные источники Сульфур-Спрингс'],
    ['Marigot Bay', 'Marigot Koyu', 'Marigot Bay', 'Bahía Marigot', 'Бухта Мариго']
  ],
  NI: [
    ['Granada', 'Granada', 'Granada', 'Granada', 'Гранада'],
    ['Ometepe Island', 'Ometepe Adası', 'Insel Ometepe', 'Isla de Ometepe', 'Остров Ометепе'],
    ['León Cathedral', 'León Katedrali', 'Kathedrale von León', 'Catedral de León', 'Кафедральный собор Леона'],
    ['Masaya Volcano', 'Masaya Yanardağı', 'Vulkan Masaya', 'Volcán Masaya', 'Вулкан Масая']
  ],
  SV: [
    ['Santa Ana Volcano', 'Santa Ana Yanardağı', 'Vulkan Santa Ana', 'Volcán de Santa Ana', 'Вулкан Санта-Ана'],
    ['Ruta de las Flores', 'Çiçekler Yolu (Ruta de las Flores)', 'Ruta de las Flores', 'Ruta de las Flores', 'Дорога цветов (Рута-де-лас-Флорес)'],
    ['Joya de Cerén', 'Joya de Cerén', 'Joya de Cerén', 'Joya de Cerén', 'Хойя-де-Серен'],
    ['El Tunco Beach', 'El Tunco Plajı', 'Strand El Tunco', 'Playa El Tunco', 'Пляж Эль-Тунко']
  ],
  TT: [
    ['Pigeon Point (Tobago)', 'Pigeon Point (Tobago)', 'Pigeon Point (Tobago)', 'Pigeon Point (Tobago)', 'Пиджен-Пойнт (Тобаго)'],
    ['Maracas Bay', 'Maracas Koyu', 'Maracas Bay', 'Bahía de Maracas', 'Бухта Маракас'],
    ['Asa Wright Nature Centre', 'Asa Wright Doğa Merkezi', 'Asa Wright Nature Centre', 'Centro natural Asa Wright', 'Природный центр Аса-Райт']
  ],
  VC: [
    ['Tobago Cays', 'Tobago Cays Adacıkları', 'Tobago Cays', 'Cayos de Tobago', 'Рифы Тобаго-Кейс'],
    ['Bequia', 'Bequia Adası', 'Bequia', 'Bequia', 'Остров Бекия'],
    ['La Soufrière Volcano', 'La Soufrière Yanardağı', 'Vulkan La Soufrière', 'Volcán La Soufrière', 'Вулкан Суфриер']
  ],
  GY: [
    ['Kaieteur Falls', 'Kaieteur Şelalesi', 'Kaieteur-Fälle', 'Cataratas Kaieteur', 'Водопад Кайетур'],
    ['Iwokrama Forest', 'Iwokrama Ormanı', 'Iwokrama-Wald', 'Bosque de Iwokrama', 'Лес Ивокрама'],
    ['Rupununi Savannah', 'Rupununi Savanı', 'Rupununi-Savanne', 'Sabana de Rupununi', 'Саванна Рупунуни']
  ],
  PY: [
    ['Jesuit Missions of Trinidad and Jesús', 'Trinidad ve Jesús Cizvit Misyonları', 'Jesuitenreduktionen Trinidad und Jesús', 'Misiones jesuíticas de Trinidad y Jesús', 'Иезуитские миссии Тринидад и Хесус'],
    ['Itaipu Dam', 'Itaipu Barajı', 'Itaipú-Staudamm', 'Represa de Itaipú', 'ГЭС Итайпу'],
    ['National Pantheon of Heroes (Asunción)', 'Ulusal Kahramanlar Panteonu (Asunción)', 'Nationales Pantheon der Helden (Asunción)', 'Panteón Nacional de los Héroes (Asunción)', 'Национальный пантеон героев (Асунсьон)']
  ],
  SR: [
    ['Historic Inner City of Paramaribo', 'Paramaribo Tarihi Şehir Merkezi', 'Historische Innenstadt von Paramaribo', 'Centro histórico de Paramaribo', 'Исторический центр Парамарибо'],
    ['Central Suriname Nature Reserve', 'Orta Surinam Doğa Koruma Alanı', 'Zentral-Suriname-Naturreservat', 'Reserva natural de Surinam Central', 'Природный резерват Центрального Суринама'],
    ['Brownsberg Nature Park', 'Brownsberg Doğa Parkı', 'Naturpark Brownsberg', 'Parque natural Brownsberg', 'Природный парк Браунсберг']
  ],
  FM: [
    ['Nan Madol', 'Nan Madol Antik Kenti', 'Nan Madol', 'Nan Madol', 'Нан-Мадол'],
    ['Chuuk Lagoon', 'Chuuk Lagünü', 'Chuuk-Lagune', 'Laguna de Chuuk', 'Лагуна Трук'],
    ['Kosrae', 'Kosrae Adası', 'Kosrae', 'Kosrae', 'Остров Кусаие']
  ],
  KI: [
    ['Tarawa Lagoon', 'Tarawa Lagünü', 'Tarawa-Lagune', 'Laguna de Tarawa', 'Лагуна Тарава'],
    ['Kiritimati (Christmas Island)', 'Kiritimati (Noel Adası)', 'Kiritimati (Weihnachtsinsel)', 'Kiritimati (isla de Navidad)', 'Киритимати (остров Рождества)'],
    ['Abaiang Atoll', 'Abaiang Atolü', 'Abaiang-Atoll', 'Atolón Abaiang', 'Атолл Абаианг']
  ],
  MH: [
    ['Majuro Atoll', 'Majuro Atolü', 'Majuro-Atoll', 'Atolón Majuro', 'Атолл Маджуро'],
    ['Laura Beach', 'Laura Plajı', 'Laura Beach', 'Playa Laura', 'Пляж Лаура'],
    ['Bikini Atoll', 'Bikini Atolü', 'Bikini-Atoll', 'Atolón Bikini', 'Атолл Бикини']
  ],
  NR: [
    ['Anibare Bay', 'Anibare Körfezi', 'Anibare-Bucht', 'Bahía de Anibare', 'Залив Анибар'],
    ['Command Ridge', 'Command Ridge Tepesi', 'Command Ridge', 'Command Ridge', 'Холм Комманд-Ридж'],
    ['Buada Lagoon', 'Buada Lagünü', 'Buada-Lagune', 'Laguna de Buada', 'Лагуна Буада']
  ],
  PG: [
    ['Tavurvur Volcano (Rabaul)', 'Tavurvur Yanardağı (Rabaul)', 'Vulkan Tavurvur (Rabaul)', 'Volcán Tavurvur (Rabaul)', 'Вулкан Тавурвур (Рабаул)'],
    ['Kokoda Track', 'Kokoda Patikası', 'Kokoda Track', 'Sendero de Kokoda', 'Тропа Кокода'],
    ['Sepik River', 'Sepik Nehri', 'Sepik', 'Río Sepik', 'Река Сепик']
  ],
  PW: [
    ['Rock Islands', 'Rock Adaları', 'Rock Islands', 'Islas Rocosas', 'Скалистые острова'],
    ['Jellyfish Lake', 'Denizanası Gölü', 'Quallensee', 'Lago de las Medusas', 'Озеро медуз'],
    ['Blue Corner', 'Blue Corner Dalış Noktası', 'Blue Corner (Tauchplatz)', 'Blue Corner (punto de buceo)', 'Дайв-сайт Блю-Корнер']
  ],
  SB: [
    ['Marovo Lagoon', 'Marovo Lagünü', 'Marovo-Lagune', 'Laguna de Marovo', 'Лагуна Марово'],
    ['Gizo', 'Gizo Adası', 'Gizo', 'Gizo', 'Остров Гизо'],
    ['Guadalcanal WWII Sites', 'Guadalcanal II. Dünya Savaşı Alanları', 'Guadalcanal: Stätten des Zweiten Weltkriegs', 'Guadalcanal: sitios de la Segunda Guerra Mundial', 'Гуадалканал: места Второй мировой войны']
  ],
  TO: [
    ["Ha'amonga 'a Maui", "Ha'amonga 'a Maui Taş Kapısı", "Ha'amonga 'a Maui", "Ha'amonga 'a Maui", 'Хаамонга-а-Мауи'],
    ["Vava'u Islands", "Vava'u Adaları", "Vava'u-Inseln", "Islas Vava'u", 'Острова Вавау'],
    ["Mapu'a 'a Vaea Blowholes", "Mapu'a 'a Vaea Deniz Fıskiyeleri", "Blowholes von Mapu'a 'a Vaea", "Géiseres marinos de Mapu'a 'a Vaea", 'Морские гейзеры Мапуа-а-Ваэа']
  ],
  TV: [
    ['Funafuti Lagoon', 'Funafuti Lagünü', 'Funafuti-Lagune', 'Laguna de Funafuti', 'Лагуна Фунафути'],
    ['Funafuti Conservation Area', 'Funafuti Koruma Alanı', 'Funafuti-Schutzgebiet', 'Área de conservación de Funafuti', 'Заповедная зона Фунафути']
  ],
  WS: [
    ['To Sua Ocean Trench', 'To Sua Okyanus Çukuru', 'To Sua Ocean Trench', 'Fosa oceánica To Sua', 'Океанская впадина То-Суа'],
    ['Lalomanu Beach', 'Lalomanu Plajı', 'Strand von Lalomanu', 'Playa de Lalomanu', 'Пляж Лаломану'],
    ['Robert Louis Stevenson Museum', 'Robert Louis Stevenson Müzesi', 'Robert-Louis-Stevenson-Museum', 'Museo Robert Louis Stevenson', 'Музей Роберта Льюиса Стивенсона']
  ]
};

const IDX: Record<string, number> = { en: 0, tr: 1, de: 2, es: 3, ru: 4 };

/** Ülkenin ek görülecek yerleri, istenen dilde (bilinmeyen dil → İngilizce). */
export function landmarksExtra(code: string, lang: string): string[] {
  const i = IDX[lang] ?? 0;
  return (D[code] || []).map((x) => x[i] || x[0]);
}

/** Eşleştirme için İngilizce adlar. */
export function landmarksExtraEn(code: string): string[] {
  return (D[code] || []).map((x) => x[0]);
}
