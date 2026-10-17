#!/usr/bin/env python3
import json
import os
import re

# Load verified 199 countries dataset
with open('scripts/countries_199_verified.json', 'r', encoding='utf-8') as f:
    verified_countries = json.load(f)

print(f"Loaded {len(verified_countries)} verified countries.")

# Translation dictionary mapping ISO2 code to localized landmark names in 5 languages:
# tr: Turkish, en: English, de: German, es: Spanish, ru: Russian
LANDMARKS_5L = {
    "AD": {
        "tr": "Sant Joan de Caselles Romanesk Kilisesi ve Pirene Dağları",
        "en": "Sant Joan de Caselles Romanesque Church & Pyrenees",
        "de": "Romanische Kirche Sant Joan de Caselles & Pyrenäen",
        "es": "Iglesia Románica de Sant Joan de Caselles y Pirineos",
        "ru": "Романская церковь Сан-Жоан-де-Казельяс и Пиренеи"
    },
    "AL": {
        "tr": "Ksamil Adaları ve Turkuaz Sahili",
        "en": "Ksamil Islands & Turquoise Coast",
        "de": "Ksamil-Inseln & Türkisküste",
        "es": "Islas Ksamil y Costa Turquesa",
        "ru": "Острова Ксамил и бирюзовое побережье"
    },
    "AT": {
        "tr": "Hallstatt Alpler Köyü ve Hallstätter See Gölü",
        "en": "Hallstatt Alpine Village & Lake Hallstatt",
        "de": "Alpendorf Hallstatt & Hallstätter See",
        "es": "Pueblo Alpino de Hallstatt y Lago Hallstätter",
        "ru": "Альпийская деревня Гальштат и озеро Гальштеттер"
    },
    "BA": {
        "tr": "Mostar Tarihi Taş Köprüsü (Stari Most)",
        "en": "Stari Most Historic Old Bridge, Mostar",
        "de": "Historische Alte Brücke Stari Most, Mostar",
        "es": "Puente Viejo Histórico Stari Most, Mostar",
        "ru": "Старый мост в Мостаре (Стари Мост)"
    },
    "BE": {
        "tr": "Brugge Tarihi Kanalları ve Rozenhoedkaai",
        "en": "Bruges Historic Canals & Rozenhoedkaai",
        "de": "Historische Grachten von Brügge & Rozenhoedkaai",
        "es": "Canales Históricos de Brujas y Rozenhoedkaai",
        "ru": "Исторические каналы Брюгге и набережная Розенхудкая"
    },
    "BG": {
        "tr": "Rila Manastırı ve Rila Dağları (UNESCO)",
        "en": "Rila Monastery & Rila Mountains (UNESCO)",
        "de": "Rila-Kloster & Rila-Gebirge (UNESCO)",
        "es": "Monasterio de Rila y Montañas de Rila (UNESCO)",
        "ru": "Рильский монастырь и горы Рила (ЮНЕСКО)"
    },
    "BY": {
        "tr": "Mir Kalesi Kompleksi (UNESCO)",
        "en": "Mir Castle Complex (UNESCO)",
        "de": "Schloss Mir Komplex (UNESCO)",
        "es": "Complejo del Castillo de Mir (UNESCO)",
        "ru": "Мирский замковый комплекс (ЮНЕСКО)"
    },
    "CH": {
        "tr": "Lauterbrunnen Vadisi ve Staubbach Şelalesi",
        "en": "Lauterbrunnen Valley & Staubbach Falls",
        "de": "Lauterbrunnental & Staubbachfall",
        "es": "Valle de Lauterbrunnen y Cascadas de Staubbach",
        "ru": "Долина Лаутербруннен и водопад Штауббах"
    },
    "CY": {
        "tr": "Cape Greco Deniz Mağaraları ve Turkuaz Koyu",
        "en": "Cape Greco Sea Caves & Turquoise Cove",
        "de": "Meereshöhlen am Kap Greco & Türkisbucht",
        "es": "Cuevas Marinas de Cabo Greco y Caleta Turquesa",
        "ru": "Морские пещеры мыса Греко и лазурная бухта"
    },
    "CZ": {
        "tr": "Prag Karl Köprüsü ve Prag Kalesi",
        "en": "Charles Bridge & Prague Castle",
        "de": "Karlsbrücke & Prager Burg",
        "es": "Puente de Carlos y Castillo de Praga",
        "ru": "Карлов мост и Пражский град"
    },
    "DE": {
        "tr": "Berlin Brandenburg Kapısı",
        "en": "Brandenburg Gate, Berlin",
        "de": "Brandenburger Tor, Berlin",
        "es": "Puerta de Brandeburgo, Berlín",
        "ru": "Бранденбургские ворота, Берлин"
    },
    "DK": {
        "tr": "Kopenhag Nyhavn Tarihi Renkli Limanı",
        "en": "Nyhavn Historic Colorful Waterfront, Copenhagen",
        "de": "Historischer Nyhavn Hafen, Kopenhagen",
        "es": "Puerto Histórico Nyhavn, Copenhague",
        "ru": "Историческая гавань Нюхавн, Копенгаген"
    },
    "EE": {
        "tr": "Tallinn Tarihi Eski Şehri ve Orta Çağ Kuleleri",
        "en": "Tallinn Medieval Old Town & Towers (UNESCO)",
        "de": "Mittelalterliche Altstadt & Türme von Tallinn (UNESCO)",
        "es": "Casco Antiguo Medieval y Torres de Tallin (UNESCO)",
        "ru": "Средневековый Старый город и башни Таллина (ЮНЕСКО)"
    },
    "ES": {
        "tr": "Barselona Sagrada Família Bazilikası",
        "en": "Sagrada Família Basilica, Barcelona",
        "de": "Basilika Sagrada Família, Barcelona",
        "es": "Basílica de la Sagrada Família, Barcelona",
        "ru": "Базилика Саграда Фамилия, Барселона"
    },
    "FI": {
        "tr": "Laponya Kuzey Işıkları ve Karlı Orman",
        "en": "Lapland Northern Lights & Snowy Taiga",
        "de": "Polarlichter in Lappland & verschneite Taiga",
        "es": "Auroras Boreales de Laponia y Bosque Nevado",
        "ru": "Северное сияние в Лапландии и заснеженная тайга"
    },
    "FR": {
        "tr": "Paris Eyfel Kulesi ve Champ de Mars",
        "en": "Eiffel Tower & Champ de Mars, Paris",
        "de": "Eiffelturm & Champ de Mars, Paris",
        "es": "Torre Eiffel y Champ de Mars, París",
        "ru": "Эйфелева башня и Марсово поле, Париж"
    },
    "GB": {
        "tr": "Londra Big Ben ve Westminster Sarayı",
        "en": "Big Ben & Palace of Westminster, London",
        "de": "Big Ben & Palace of Westminster, London",
        "es": "Big Ben y Palacio de Westminster, Londres",
        "ru": "Биг-Бен и Вестминстерский дворец, Лондон"
    },
    "GR": {
        "tr": "Santorini Oia Mavi Kubbeli Kiliseleri",
        "en": "Santorini Oia Blue Domed Churches & Caldera",
        "de": "Blaue Kuppelkirchen von Oia auf Santorin",
        "es": "Iglesias de Cúpulas Azules de Oia, Santorini",
        "ru": "Церкви с синими куполами в Ия, Санторини"
    },
    "HR": {
        "tr": "Dubrovnik Tarihi Surları ve Adriyatik",
        "en": "Dubrovnik Historic Walls & Adriatic Sea",
        "de": "Historische Stadtmauern von Dubrovnik & Adria",
        "es": "Murallas Históricas de Dubrovnik y Mar Adriático",
        "ru": "Исторические стены Дубровника и Адриатика"
    },
    "HU": {
        "tr": "Budapeşte Macaristan Parlamento Binası ve Tuna",
        "en": "Hungarian Parliament Building & Danube, Budapest",
        "de": "Ungarisches Parlamentsgebäude & Donau, Budapest",
        "es": "Edificio del Parlamento Húngaro y Danubio, Budapest",
        "ru": "Здание венгерского парламента и Дунай, Будапешт"
    },
    "IE": {
        "tr": "Moher Falezleri (Cliffs of Moher) ve Atlantik Kıyısı",
        "en": "Cliffs of Moher & Atlantic Coast",
        "de": "Cliffs of Moher & Atlantikküste",
        "es": "Acantilados de Moher y Costa Atlántica",
        "ru": "Утёсы Мохер и побережье Атлантики"
    },
    "IS": {
        "tr": "Skógafoss Şelalesi ve Güney Sahili Zümrüt Kanyonu",
        "en": "Skógafoss Waterfall & Emerald Canyon",
        "de": "Skógafoss-Wasserfall & Smaragdschlucht",
        "es": "Cascada Skógafoss y Cañón Esmeralda",
        "ru": "Водопад Скоугафосс и изумрудный каньон"
    },
    "IT": {
        "tr": "Roma Kolezyumu (Colosseo) ve Antik Forum",
        "en": "Colosseum & Ancient Roman Forum, Rome",
        "de": "Kolosseum & Forum Romanum, Rom",
        "es": "Coliseo y Foro Romano Antiguo, Roma",
        "ru": "Колизей и Римский форум, Рим"
    },
    "LI": {
        "tr": "Vaduz Şatosu ve Alp Ren Vadisi",
        "en": "Vaduz Castle & Alpine Rhine Valley",
        "de": "Schloss Vaduz & Alpenrheintal",
        "es": "Castillo de Vaduz y Valle Alpino del Rin",
        "ru": "Замок Вадуц и альпийская долина Рейна"
    },
    "LT": {
        "tr": "Trakai Ada Kalesi ve Galvė Gölü",
        "en": "Trakai Island Castle & Lake Galvė",
        "de": "Wasserburg Trakai & Galvė-See",
        "es": "Castillo de la Isla de Trakai y Lago Galvė",
        "ru": "Тракайский островной замок и озеро Гальве"
    },
    "LU": {
        "tr": "Lüksemburg Grund Tarihi Vadisi ve Alzette Nehri",
        "en": "Luxembourg Grund Historic Valley & Alzette River",
        "de": "Historisches Grund-Viertel & Alzette, Luxemburg",
        "es": "Valle Histórico de Grund y Río Alzette, Luxemburgo",
        "ru": "Исторический квартал Грунд и река Альзет, Люксембург"
    },
    "LV": {
        "tr": "Riga Karabaşlar Evi ve Tarihi Belediye Meydanı",
        "en": "House of the Blackheads & Town Hall Square, Riga",
        "de": "Schwarzhäupterhaus & Rathausplatz, Riga",
        "es": "Casa de las Cabezas Negras y Plaza del Ayuntamiento, Riga",
        "ru": "Дом Черноголовых и Ратушная площадь, Рига"
    },
    "MC": {
        "tr": "Monako Port Hercule Limanı ve Monte Carlo Silüeti",
        "en": "Port Hercule Harbour & Monte Carlo Skyline",
        "de": "Hafen Port Hercule & Skyline von Monte Carlo",
        "es": "Puerto Hércules y Horizonte de Montecarlo",
        "ru": "Гавань Порт-Эркюль и панорама Монте-Карло"
    },
    "MD": {
        "tr": "Orheiul Vechi Tarihi Manastır Vadisi ve Răut Kanyonu",
        "en": "Orheiul Vechi Cave Monastery & Răut River Canyon",
        "de": "Höhlenkloster Orheiul Vechi & Răut-Kanyon",
        "es": "Monasterio de Cuevas Orheiul Vechi y Cañón del Răut",
        "ru": "Пещерный монастырь Старый Орхей и каньон реки Реут"
    },
    "ME": {
        "tr": "Kotor Körfezi Fiyordu ve Tarihi Venedik Surları",
        "en": "Bay of Kotor Fjord & Historic Venetian Fortress",
        "de": "Bucht von Kotor Fjord & Venezianische Festung",
        "es": "Fiordo de la Bahía de Kotor y Fortaleza Veneciana",
        "ru": "Бока-Которский залив и венецианская крепость"
    },
    "MK": {
        "tr": "Ohri Gölü ve Kaneo Aziz Yuhanna Kilisesi",
        "en": "Lake Ohrid & Church of Saint John at Kaneo",
        "de": "Ohridsee & Kirche des Heiligen Johannes von Kaneo",
        "es": "Lago Ohrid e Iglesia de San Juan en Kaneo",
        "ru": "Охридское озеро и церковь Святого Иоанна Канео"
    },
    "MT": {
        "tr": "Valletta Büyük Limanı (Grand Harbour) ve Barrakka Bahçeleri",
        "en": "Valletta Grand Harbour & Upper Barrakka Gardens",
        "de": "Grand Harbour & Upper Barrakka Gardens, Valletta",
        "es": "Gran Puerto de La Valeta y Jardines Upper Barrakka",
        "ru": "Гранд-Харбор и сады Верхней Барракки, Валлетта"
    },
    "NL": {
        "tr": "Amsterdam Tarihi Kanalları ve Geleneksel Evleri",
        "en": "Amsterdam Historic Canals & Canal Houses",
        "de": "Historische Grachten & Grachtenhäuser, Amsterdam",
        "es": "Canales Históricos y Casas Tradicionales de Ámsterdam",
        "ru": "Исторические каналы и дома Амстердама"
    },
    "NO": {
        "tr": "Geiranger Fiyordu ve Fiyort Şelaleleri (UNESCO)",
        "en": "Geirangerfjord & Cascading Waterfalls (UNESCO)",
        "de": "Geirangerfjord & Wasserfälle (UNESCO)",
        "es": "Fiordo de Geiranger y Cascadas (UNESCO)",
        "ru": "Гейрангер-фьорд и водопады (ЮНЕСКО)"
    },
    "PL": {
        "tr": "Krakov Ana Piyasa Meydanı ve Meryem Ana Bazilikası",
        "en": "Main Market Square & St. Mary's Basilica, Kraków",
        "de": "Hauptmarkt & Marienkirche, Krakau",
        "es": "Plaza del Mercado Principal y Basílica de Santa María, Cracovia",
        "ru": "Главная рыночная площадь и Мариацкий костёл, Краков"
    },
    "PT": {
        "tr": "Lizbon Belém Kulesi ve Tejo Nehri Halici (UNESCO)",
        "en": "Belém Tower & Tagus River, Lisbon (UNESCO)",
        "de": "Turm von Belém & Tejo, Lissabon (UNESCO)",
        "es": "Torre de Belém y Río Tajo, Lisboa (UNESCO)",
        "ru": "Башня Торри-ди-Белен и река Тежу, Лиссабон (ЮНЕСКО)"
    },
    "RO": {
        "tr": "Bran Kalesi (Drakula Şatosu) ve Karpat Ormanları",
        "en": "Bran Castle & Carpathian Mountain Forest",
        "de": "Schloss Bran & Karpatenwald",
        "es": "Castillo de Bran y Bosque de los Cárpatos",
        "ru": "Замок Бран и Карпатский лес"
    },
    "RS": {
        "tr": "Belgrad Kalemegdan Kalesi ve Tuna-Sava Kavşağı",
        "en": "Belgrade Fortress Kalemegdan & Danube-Sava Confluence",
        "de": "Festung Kalemegdan & Donau-Save-Mündung, Belgrad",
        "es": "Fortaleza Kalemegdan y Confluencia Danubio-Sava, Belgrado",
        "ru": "Белградская крепость Калемегдан и слияние Дуная и Савы"
    },
    "RU": {
        "tr": "Moskova Kızıl Meydan ve Aziz Vasil Katedrali",
        "en": "Red Square & Saint Basil's Cathedral, Moscow",
        "de": "Roter Platz & Basilius-Kathedrale, Moskau",
        "es": "Plaza Roja y Catedral de San Basilio, Moscú",
        "ru": "Красная площадь и собор Василия Блаженного, Москва"
    },
    "SE": {
        "tr": "Stockholm Gamla Stan Tarihi Renkli Meydanı",
        "en": "Gamla Stan Colorful Old Town Square, Stockholm",
        "de": "Historischer Marktplatz Stortorget in Gamla Stan, Stockholm",
        "es": "Plaza de Gamla Stan y Casas de Colores, Estocolmo",
        "ru": "Историческая площадь Гамла Стан, Стокгольм"
    },
    "SI": {
        "tr": "Bled Gölü Adası, Meryem Ana Kilisesi ve Julian Alpleri",
        "en": "Lake Bled Island Church & Julian Alps",
        "de": "Bleder See mit Inselkirche & Julische Alpen",
        "es": "Isla del Lago Bled, Iglesia y Alpes Julianos",
        "ru": "Остров на озере Блед, церковь и Юлийские Альпы"
    },
    "SK": {
        "tr": "Yüksek Tatralar Zirvesi ve Štrbské Pleso Gölü",
        "en": "High Tatras Peaks & Lake Štrbské Pleso",
        "de": "Hohe Tatra Gipfel & See Štrbské Pleso",
        "es": "Picos de los Altos Tatras y Lago Štrbské Pleso",
        "ru": "Пики Высоких Татр и озеро Штрбске-Плесо"
    },
    "SM": {
        "tr": "San Marino Guaita Kalesi ve Titano Dağı",
        "en": "Guaita Fortress Tower & Mount Titano, San Marino",
        "de": "Festung Guaita & Monte Titano, San Marino",
        "es": "Fortaleza de Guaita y Monte Titano, San Marino",
        "ru": "Крепость Гуаита и гора Монте-Титано, Сан-Марино"
    },
    "UA": {
        "tr": "Kyiv Peçersk Lavra Manastırı Altın Kuleleri (UNESCO)",
        "en": "Kyiv Pechersk Lavra Golden Domes (UNESCO)",
        "de": "Kiewer Höhlenkloster Goldene Kuppeln (UNESCO)",
        "es": "Monasterio de las Cuevas de Kyiv (UNESCO)",
        "ru": "Киево-Печерская лавра с золотыми куполами (ЮНЕСКО)"
    },
    "VA": {
        "tr": "Aziz Petrus Bazilikası ve Meydanı (St. Peter's)",
        "en": "St. Peter's Basilica & Saint Peter's Square, Vatican",
        "de": "Petersdom & Petersplatz, Vatikan",
        "es": "Basílica de San Pedro y Plaza de San Pedro, Vaticano",
        "ru": "Собор Святого Петра и площадь Святого Петра, Ватикан"
    },
    "XK": {
        "tr": "Prizren Tarihi Taş Köprüsü ve Sinan Paşa Camii",
        "en": "Prizren Historic Stone Bridge & Sinan Pasha Mosque",
        "de": "Historische Steinbrücke & Sinan-Pascha-Moschee, Prizren",
        "es": "Puente de Piedra Histórico y Mezquita Sinan Pasha, Prizren",
        "ru": "Исторический каменный мост и мечеть Синан-паши, Призрен"
    },
    "AF": {
        "tr": "Band-e Amir Turkuaz Buzul Gölleri (Milli Park)",
        "en": "Band-e Amir Sapphire Glacier Lakes (National Park)",
        "de": "Band-e-Amir Türkisseen (Nationalpark)",
        "es": "Lagos Glaciares de Band-e Amir (Parque Nacional)",
        "ru": "Сапфировые озёра Банде-Амир (Национальный парк)"
    },
    "AM": {
        "tr": "Hor Virap Manastırı ve Ağrı Dağı (Ararat) Manzarası",
        "en": "Khor Virap Monastery & Mount Ararat View",
        "de": "Kloster Chor Virap mit Blick auf den Berg Ararat",
        "es": "Monasterio de Khor Virap y Vista del Monte Ararat",
        "ru": "Монастырь Хор Вирап и вид на гору Арарат"
    },
    "AZ": {
        "tr": "Bakü Alev Kuleleri (Flame Towers) ve Hazar Sahili",
        "en": "Baku Flame Towers & Caspian Seaside Promenade",
        "de": "Flame Towers & Kaspische Promenade, Baku",
        "es": "Torres de Fuego y Paseo Marítimo del Caspio, Bakú",
        "ru": "Пламенные башни (Flame Towers) и набережная Каспия, Баку"
    },
    "BD": {
        "tr": "Sundarbans Mangrov Ormanları ve Bengal Deltası",
        "en": "Sundarbans Mangrove Forest & Bengal Delta",
        "de": "Sundarbans Mangrovenwald & Bengalen-Delta",
        "es": "Bosque de Manglares de Sundarbans y Delta de Bengala",
        "ru": "Мангровые леса Сундарбан и дельта Бенгалии"
    },
    "BN": {
        "tr": "Sultan Ömer Ali Seyfeddin Camii ve Altın Kubbesi",
        "en": "Sultan Omar Ali Saifuddien Golden Mosque",
        "de": "Sultan-Omar-Ali-Saifuddien-Moschee mit Goldkuppel",
        "es": "Mezquita de Oro del Sultán Omar Ali Saifuddien",
        "ru": "Мечеть Султана Омара Али Сайфуддина с золотым куполом"
    },
    "BT": {
        "tr": "Paro Taktsang (Kaplan Yuvası) Uçurum Manastırı",
        "en": "Paro Taktsang (Tiger's Nest) Cliff Monastery",
        "de": "Kloster Paro Taktsang (Tigernest)",
        "es": "Monasterio del Nido del Tigre (Paro Taktsang)",
        "ru": "Монастырь Паро Такцанг (Гнездо тигра)"
    },
    "CN": {
        "tr": "Çin Seddi (Mutianyu Bölümü) ve Dağ Sıradağları",
        "en": "Great Wall of China (Mutianyu) & Mountain Ridge",
        "de": "Chinesische Mauer (Mutianyu) & Gebirgskamm",
        "es": "Gran Muralla China (Mutianyu) y Cordillera",
        "ru": "Великая Китайская стена (Мутяньюй) и горные хребты"
    },
    "GE": {
        "tr": "Gergeti Teslis Kilisesi ve Kazbek Dağı",
        "en": "Gergeti Trinity Church & Mount Kazbek",
        "de": "Gergetier Dreifaltigkeitskirche & Berg Kasbek",
        "es": "Iglesia de la Trinidad de Gergeti y Monte Kazbek",
        "ru": "Троицкая церковь в Гергети и гора Казбек"
    },
    "HK": {
        "tr": "Victoria Limanı ve Hong Kong Gökdelen Silüeti",
        "en": "Victoria Harbour & Hong Kong Skyline",
        "de": "Victoria Harbour & Skyline von Hongkong",
        "es": "Puerto Victoria y Horizonte de Rascacielos de Hong Kong",
        "ru": "Бухта Виктория и панорама небоскрёбов Гонконга"
    },
    "ID": {
        "tr": "Ulun Danu Bratan Su Tapınağı ve Beratan Gölü, Bali",
        "en": "Ulun Danu Beratan Water Temple & Lake, Bali",
        "de": "Wassertempel Pura Ulun Danu Bratan, Bali",
        "es": "Templo del Agua Ulun Danu Beratan, Bali",
        "ru": "Водный храм Улун Дану Братан и озеро, Бали"
    },
    "IN": {
        "tr": "Tac Mahal Beyaz Mermer Mozolesi ve Havuzu, Agra",
        "en": "Taj Mahal White Marble Mausoleum, Agra",
        "de": "Taj Mahal Weißes Marmormausoleum, Agra",
        "es": "Taj Mahal Mausoleo de Mármol Blanco, Agra",
        "ru": "Тадж-Махал мавзолей из белого мрамора, Агра"
    },
    "JP": {
        "tr": "Fuji Dağı ve Chureito Pagodası Kiraz Çiçekleri",
        "en": "Mount Fuji & Chureito Pagoda Cherry Blossoms",
        "de": "Berg Fuji & Chureito-Pagode zur Kirschblüte",
        "es": "Monte Fuji y Pagoda Chureito con Cerezos en Flor",
        "ru": "Гора Фудзи и пагода Тюрейто в цветущей сакуре"
    },
    "KG": {
        "tr": "Issık Göl (Issyk-Kul) ve Karlı Tanrı Dağları (Tian Shan)",
        "en": "Lake Issyk-Kul & Snow-Capped Tian Shan Mountains",
        "de": "Yssykköl-See & schneebedecktes Tian Shan Gebirge",
        "es": "Lago Issyk-Kul y Montañas Nevadas de Tian Shan",
        "ru": "Озеро Иссык-Куль и заснеженные хребты Тянь-Шаня"
    },
    "KH": {
        "tr": "Angkor Wat Antik Tapınağı ve Nilüfer Havuzu (UNESCO)",
        "en": "Angkor Wat Ancient Temple & Lotus Pool (UNESCO)",
        "de": "Tempelanlage Angkor Wat & Lotusteich (UNESCO)",
        "es": "Templo Antiguo de Angkor Wat y Estanque de Loto (UNESCO)",
        "ru": "Древний храм Ангкор-Ват и пруд с лотосами (ЮНЕСКО)"
    },
    "KP": {
        "tr": "Kumsusan Güneş Sarayı ve Pyongyang Meydanı",
        "en": "Kumsusan Palace of the Sun & Pyongyang Monument",
        "de": "Kumsusan-Sonnenpalast & Pjöngjang",
        "es": "Palacio del Sol de Kumsusan, Pionyang",
        "ru": "Кымсусанский дворец Солнца, Пхеньян"
    },
    "KR": {
        "tr": "Gyeongbokgung Sarayı Gwanghwamun Kapısı ve Dağlar, Seul",
        "en": "Gyeongbokgung Palace & Mount Bugak, Seoul",
        "de": "Gyeongbokgung-Palast & Bugak-Berg, Seoul",
        "es": "Palacio Gyeongbokgung y Monte Bugak, Seúl",
        "ru": "Дворец Кёнбоккун и гора Пугаксан, Сеул"
    },
    "KZ": {
        "tr": "Hoca Ahmed Yesevi Türbesi (UNESCO), Türkistan",
        "en": "Mausoleum of Khoja Ahmed Yasawi (UNESCO), Turkistan",
        "de": "Mausoleum von Hodscha Ahmad Yasawi (UNESCO), Turkestan",
        "es": "Mausoleo de Khoja Ahmed Yasawi (UNESCO), Turkestán",
        "ru": "Мавзолей Ходжи Ахмеда Ясави (ЮНЕСКО), Туркестан"
    },
    "LA": {
        "tr": "Kuang Si Çok Katmanlı Turkuaz Şelalesi, Luang Prabang",
        "en": "Kuang Si Multi-Tiered Turquoise Falls, Luang Prabang",
        "de": "Kuang-Si-Wasserfälle mit Türkisbecken, Luang Prabang",
        "es": "Cascadas Escalonadas de Kuang Si, Luang Prabang",
        "ru": "Многоярусный бирюзовый водопад Куанг Си, Луангпхабанг"
    },
    "LK": {
        "tr": "Sigiriya Aslan Kayası Antik Kalesi (UNESCO)",
        "en": "Sigiriya Ancient Lion Rock Fortress (UNESCO)",
        "de": "Felsenfestung Sigiriya (Löwenfelsen, UNESCO)",
        "es": "Fortaleza Antigua de la Roca del León de Sigiriya (UNESCO)",
        "ru": "Древняя скальная крепость Сигирия (Львиная скала, ЮНЕСКО)"
    },
    "MM": {
        "tr": "Bagan Antik Tapınaklar Ovası Gün Doğumu ve Balonlar",
        "en": "Bagan Ancient Pagoda Plain Sunrise & Balloons",
        "de": "Tempelstadt Bagan zum Sonnenaufgang mit Heißluftballons",
        "es": "Llanura de Templos de Bagan al Amanecer con Globos",
        "ru": "Древняя долина храмов Баган на рассвете с воздушными шарами"
    },
    "MN": {
        "tr": "Cengiz Han Heykel Kompleksi ve Uçsuz Bucaksız Bozkır",
        "en": "Genghis Khan Equestrian Statue & Mongolian Steppe",
        "de": "Dschingis-Khan-Reiterstatue & Mongolische Steppe",
        "es": "Estatua Ecuestre de Gengis Kan y Estepa de Mongolia",
        "ru": "Конная статуя Чингисхана и бескрайняя монгольская степь"
    },
    "MO": {
        "tr": "Makao Aziz Pavlus Kilisesi Harabeleri (Ruins of St. Paul's)",
        "en": "Ruins of Saint Paul's & Historic Centre, Macau",
        "de": "Ruinen der Pauluskirche & historisches Zentrum, Macao",
        "es": "Ruinas de San Pablo y Centro Histórico, Macao",
        "ru": "Руины собора Святого Павла и исторический центр, Макао"
    },
    "MV": {
        "tr": "Maldivler Turkuaz Lagünü ve Su Üstü Villaları",
        "en": "Maldives Turquoise Lagoon & Overwater Bungalows",
        "de": "Türkisblaue Malediven-Lagune & Überwasservillen",
        "es": "Laguna Turquesa de Maldivas y Cabañas Sobre el Agua",
        "ru": "Лазурная лагуна Мальдив и водные виллы"
    },
    "MY": {
        "tr": "Kuala Lumpur Petronas İkiz Kuleleri ve Şehir Parkı",
        "en": "Petronas Twin Towers & KLCC Park, Kuala Lumpur",
        "de": "Petronas Twin Towers & KLCC Park, Kuala Lumpur",
        "es": "Torres Petronas y Parque KLCC, Kuala Lumpur",
        "ru": "Башни-близнецы Петронас и парк KLCC, Куала-Лумпур"
    },
    "NP": {
        "tr": "Everest Dağı Zirvesi ve Himalaya Sıradağları",
        "en": "Mount Everest Summit & Himalayan Range",
        "de": "Mount Everest Gipfel & Himalaya-Hauptkamm",
        "es": "Cumbre del Monte Everest y Cordillera del Himalaya",
        "ru": "Вершина горы Эверест и Гималайский хребет"
    },
    "PH": {
        "tr": "El Nido Palawan Turkuaz Lagünleri ve Karstik Adaları",
        "en": "El Nido Palawan Karst Limestone Islands & Lagoons",
        "de": "El Nido Palawan Karstkalkstein-Inseln & Lagunen",
        "es": "Islas Cársicas y Lagunas Turquesas de El Nido, Palawan",
        "ru": "Карстовые известняковые острова и лагуны Эль-Нидо, Палаван"
    },
    "PK": {
        "tr": "Hunza Vadisi, Rakaposhi Karlı Zirvesi ve Baltit Kalesi",
        "en": "Hunza Valley, Rakaposhi Snow Peak & Baltit Fort",
        "de": "Hunza-Tal, Rakaposhi-Schneegipfel & Baltit-Fort",
        "es": "Valle de Hunza, Pico Nevado Rakaposhi y Fuerte Baltit",
        "ru": "Долина Хунза, снежный пик Ракапоши и форт Балтит"
    },
    "SG": {
        "tr": "Marina Bay Sands ve Gardens by the Bay",
        "en": "Marina Bay Sands & Gardens by the Bay, Singapore",
        "de": "Marina Bay Sands & Gardens by the Bay, Singapur",
        "es": "Marina Bay Sands y Gardens by the Bay, Singapur",
        "ru": "Марина Бэй Сэндс и сады у залива (Gardens by the Bay), Сингапур"
    },
    "TH": {
        "tr": "Wat Arun (Şafak Tapınağı) ve Chao Phraya Nehri, Bangkok",
        "en": "Wat Arun (Temple of Dawn) & Chao Phraya River, Bangkok",
        "de": "Wat Arun (Tempel der Morgenröte) am Chao Phraya, Bangkok",
        "es": "Wat Arun (Templo del Amanecer) y Río Chao Phraya, Bangkok",
        "ru": "Ват Арун (Храм Рассвета) и река Чаопрайя, Бангкок"
    },
    "TJ": {
        "tr": "İskenderkul Turkuaz Alpin Gölü ve Fann Dağları",
        "en": "Lake Iskanderkul & Fann Mountains",
        "de": "Iskanderkul-Alpensee & Fan-Gebirge",
        "es": "Lago Alpino Iskanderkul y Montañas Fann",
        "ru": "Озеро Искандеркуль и Фанские горы"
    },
    "TL": {
        "tr": "Cristo Rei Heykeli ve Dili Körfezi Sahili",
        "en": "Cristo Rei Monument & Dili Bay Coast",
        "de": "Cristo Rei Monument & Küste der Bucht von Dili",
        "es": "Monumento Cristo Rei y Bahía de Dili",
        "ru": "Статуя Христа Царя (Кришту Рей) и побережье залива Дили"
    },
    "TM": {
        "tr": "Derveze Gaz Krateri (Cehennem Kapısı), Karakum Çölü",
        "en": "Darvaza Gas Crater (Door to Hell), Karakum Desert",
        "de": "Gastrichter von Derweze (Tor zur Hölle), Karakum-Wüste",
        "es": "Cráter de Gas de Darvaza (Puerta al Infierno), Desierto de Karakum",
        "ru": "Газовый кратер Дарваза (Врата Ада), пустыня Каракумы"
    },
    "TW": {
        "tr": "Taipei 101 Gökdeleni ve Fil Dağı Manzarası",
        "en": "Taipei 101 Skyscraper & Elephant Mountain View",
        "de": "Taipeh 101 Wolkenkratzer & Blick vom Elefantenberg",
        "es": "Rascacielos Taipei 101 y Vista desde la Montaña del Elefante",
        "ru": "Небоскрёб Тайбэй 101 и вид с горы Слон (Elephant Mountain)"
    },
    "UZ": {
        "tr": "Semerkant Registan Meydanı ve Tarihi Medreseler (UNESCO)",
        "en": "Registan Square & Ancient Madrasahs, Samarkand (UNESCO)",
        "de": "Registan-Platz & historische Medresen, Samarkand (UNESCO)",
        "es": "Plaza de Registán y Madrazas Históricas, Samarcanda (UNESCO)",
        "ru": "Площадь Регистан и древние медресе Самарканда (ЮНЕСКО)"
    },
    "VN": {
        "tr": "Ha Long Körfezi Zümrüt Karstik Adaları (UNESCO)",
        "en": "Ha Long Bay Emerald Karst Islands (UNESCO)",
        "de": "Ha-Long-Bucht mit smaragdgrünen Karstinseln (UNESCO)",
        "es": "Bahía de Ha Long e Islas Cársicas Esmeralda (UNESCO)",
        "ru": "Бухта Халонг с изумрудными карстовыми островами (ЮНЕСКО)"
    },
    "AE": {
        "tr": "Burj Khalifa ve Downtown Dubai Silüeti",
        "en": "Burj Khalifa & Downtown Dubai Skyline",
        "de": "Burj Khalifa & Downtown Dubai Skyline",
        "es": "Burj Khalifa y Horizonte del Centro de Dubái",
        "ru": "Бурдж-Халифа и панорама Даунтаун Дубая"
    },
    "BH": {
        "tr": "Bahreyn Dünya Ticaret Merkezi (WTC) İkiz Kuleleri",
        "en": "Bahrain World Trade Center Twin Towers, Manama",
        "de": "Bahrain World Trade Center Twin Towers, Manama",
        "es": "Torres Gemelas del Bahrain World Trade Center, Manama",
        "ru": "Башни-близнецы Всемирного торгового центра Бахрейна, Манама"
    },
    "IL": {
        "tr": "Kudüs Eski Şehir Surları ve Ağlama Duvarı",
        "en": "Jerusalem Old City Walls & Western Wall",
        "de": "Altstadtmauern von Jerusalem & Klagemauer",
        "es": "Murallas de la Ciudad Vieja de Jerusalén y Muro de las Lamentaciones",
        "ru": "Стены Старого города Иерусалима и Стена Плача"
    },
    "IQ": {
        "tr": "Erbil Tarihi Kalesi ve Giriş Kapısı (UNESCO)",
        "en": "Erbil Citadel & Ancient Grand Gate (UNESCO)",
        "de": "Zitadelle von Erbil & historisches Haupttor (UNESCO)",
        "es": "Ciudadela Histórica de Erbil y Puerta Principal (UNESCO)",
        "ru": "Историческая цитадель Эрбиля и главные ворота (ЮНЕСКО)"
    },
    "IR": {
        "tr": "İsfahan Nakş-ı Cihan Meydanı ve Şah Camii (UNESCO)",
        "en": "Naqsh-e Jahan Square & Shah Mosque, Isfahan (UNESCO)",
        "de": "Naqsch-e Dschahan Platz & Schah-Moschee, Isfahan (UNESCO)",
        "es": "Plaza de Naqsh-e Yahán y Mezquita del Shah, Isfahán (UNESCO)",
        "ru": "Площадь Накш-э Джахан и мечеть Шаха, Исфахан (ЮНЕСКО)"
    },
    "JO": {
        "tr": "Petra Antik Kenti El-Hazne (Hazine) ve Siq Kanyonu",
        "en": "Al-Khazneh (The Treasury) & Siq Canyon, Petra (UNESCO)",
        "de": "Schatzhaus Al-Chazneh & Siq-Schlucht, Petra (UNESCO)",
        "es": "El Tesoro (Al-Khazneh) y Cañón del Siq, Petra (UNESCO)",
        "ru": "Эль-Хазне (Сокровищница) и каньон Сик, Петра (ЮНЕСКО)"
    },
    "KW": {
        "tr": "Kuveyt Kuleleri ve Basra Körfezi Sahili",
        "en": "Kuwait Towers & Arabian Gulf Coastline",
        "de": "Kuwait Towers & Küste des Persischen Golfs",
        "es": "Torres de Kuwait y Costa del Golfo Pérsico",
        "ru": "Кувейтские башни и побережье Персидского залива"
    },
    "LB": {
        "tr": "Beyrut Raouche Güvercin Kayalıkları (Pigeon Rocks)",
        "en": "Raouche Pigeon Rocks & Mediterranean Coast, Beirut",
        "de": "Taubenfelsen von Raouche & Mittelmeer, Beirut",
        "es": "Rocas de las Palomas de Raouche, Beirut",
        "ru": "Голубиные скалы в Рауше и Средиземное море, Бейрут"
    },
    "OM": {
        "tr": "Sultan Kabus Ulu Camii Mermer Avlusu, Maskat",
        "en": "Sultan Qaboos Grand Mosque Marble Courtyard, Muscat",
        "de": "Große Sultan-Qabus-Moschee, Maskat",
        "es": "Gran Mezquita del Sultán Qaboos, Mascate",
        "ru": "Большая мечеть Султана Кабуса и мраморный двор, Маскат"
    },
    "PS": {
        "tr": "Kubbet-üs-Sahra (Dome of the Rock) Altın Kubbesi",
        "en": "Dome of the Rock Golden Dome, Jerusalem",
        "de": "Felsendom mit goldener Kuppel, Jerusalem",
        "es": "Cúpula de la Roca con Cúpula Dorada, Jerusalén",
        "ru": "Купол Скалы (Куббат ас-Сахра) с золотым куполом, Иерусалим"
    },
    "QA": {
        "tr": "Doha Corniche Kordonu ve Modern Silüet",
        "en": "Doha Corniche Waterfront & Modern Skyline",
        "de": "Doha Corniche Uferpromenade & Skyline",
        "es": "Paseo Marítimo Corniche de Doha y Horizonte Moderno",
        "ru": "Набережная Корниш в Дохе и современная панорама"
    },
    "SA": {
        "tr": "AlUla Hegra Kasr el-Ferid Antik Kaya Mezarı (UNESCO)",
        "en": "Qasr al-Farid Monolithic Rock Tomb, Hegra, AlUla (UNESCO)",
        "de": "Felsengrab Qasr al-Farid in Hegra, AlUla (UNESCO)",
        "es": "Tumba Monolítica Qasr al-Farid en Hegra, AlUla (UNESCO)",
        "ru": "Монолитная скальная гробница Каср аль-Фарид, Хегра, Аль-Ула (ЮНЕСКО)"
    },
    "SY": {
        "tr": "Şam Emevi Camii Avlusu ve Antik Mozaikleri",
        "en": "Umayyad Great Mosque Courtyard & Mosaics, Damascus",
        "de": "Umayyaden-Moschee Innenhof & Mosaike, Damaskus",
        "es": "Gran Mezquita de los Omeyas y Mosaicos, Damasco",
        "ru": "Двор мечети Омейядов и древние мозаики, Дамаск"
    },
    "TR": {
        "tr": "İstanbul Galata Kulesi, Boğaz ve Tarihi Yarımada",
        "en": "Galata Tower, Bosphorus & Historic Peninsula, Istanbul",
        "de": "Galataturm, Bosporus & historische Halbinsel, Istanbul",
        "es": "Torre de Gálata, Bósforo y Península Histórica, Estambul",
        "ru": "Галатская башня, Босфор и исторический полуостров, Стамбул"
    },
    "YE": {
        "tr": "Sokotra Adası Ejderha Kanı Ağaçları (Dragon Blood Trees)",
        "en": "Dragon Blood Trees of Socotra Island (UNESCO)",
        "de": "Drachenblutbäume auf der Insel Sokotra (UNESCO)",
        "es": "Árboles Sangre de Dragón de la Isla de Socotra (UNESCO)",
        "ru": "Драконовы деревья острова Сокотра (ЮНЕСКО)"
    },
    "AO": {
        "tr": "Kalandula Şelaleleri (Qalandula), Malanje",
        "en": "Kalandula Falls on the Lucala River, Malanje",
        "de": "Kalandula-Wasserfälle am Lucala-Fluss, Malanje",
        "es": "Cataratas de Kalandula en el Río Lucala, Malanje",
        "ru": "Водопад Каландула на реке Лукала, Маланже"
    },
    "BF": {
        "tr": "Sindou İğne Kayalıkları (Les Pics de Sindou), Banfora",
        "en": "Sindou Peaks (Les Pics de Sindou), Banfora",
        "de": "Felsnadeln von Sindou (Pics de Sindou), Banfora",
        "es": "Picos de Sindou (Les Pics de Sindou), Banfora",
        "ru": "Пики Синду (Les Pics de Sindou), Банфора"
    },
    "BI": {
        "tr": "Tanganika Gölü Sahili ve Balıkçı Tekneleri",
        "en": "Lake Tanganyika Shoreline & Fishing Boats",
        "de": "Tanganjikasee-Ufer & Fischerboote",
        "es": "Orilla del Lago Tanganica y Barcos de Pesca",
        "ru": "Побережье озера Танганьика и рыбацкие лодки"
    },
    "BJ": {
        "tr": "Ganvié Su Üstü Kazıklı Evleri ve Lagün Köyü",
        "en": "Ganvié Stilt Village & Lake Nokoué Lagoon",
        "de": "Pfahldorf Ganvié & Nokoué-See Lagune",
        "es": "Pueblo sobre Palafitos de Ganvié y Lago Nokoué",
        "ru": "Деревня на сваях Ганвье и лагуна озера Нокуэ"
    },
    "BW": {
        "tr": "Okavango Deltası Kanalları ve Mokoro Kanoları (UNESCO)",
        "en": "Okavango Delta Waterways & Mokoro Canoes (UNESCO)",
        "de": "Wasserwege des Okavango-Deltas & Mokoro-Kanus (UNESCO)",
        "es": "Canales del Delta del Okavango y Canoas Mokoro (UNESCO)",
        "ru": "Водные пути дельты Окаванго и каноэ мокоро (ЮНЕСКО)"
    },
    "CD": {
        "tr": "Virunga Ulusal Parkı Dağ Gorilleri (UNESCO)",
        "en": "Mountain Gorillas of Virunga National Park (UNESCO)",
        "de": "Berggorillas im Virunga-Nationalpark (UNESCO)",
        "es": "Gorilas de Montaña del Parque Nacional Virunga (UNESCO)",
        "ru": "Горные гориллы в национальном парке Вирунга (ЮНЕСКО)"
    },
    "CF": {
        "tr": "Dzanga-Sangha Ulusal Parkı ve Dzanga Bai Fil Vahası",
        "en": "Dzanga-Sangha National Park & Dzanga Bai Elephant Clearing",
        "de": "Dzanga-Sangha Nationalpark & Dzanga Bai Elefantenlichtung",
        "es": "Parque Nacional Dzanga-Sangha y Claro de Elefantes Dzanga Bai",
        "ru": "Национальный парк Дзанга-Сангха и поляна слонов Дзанга Бай"
    },
    "CG": {
        "tr": "Diosso Boğazı Kırmızı Kanyonları",
        "en": "Gorges de Diosso Red Sandstone Canyons",
        "de": "Rote Sandsteinschlucht Gorges de Diosso",
        "es": "Cañones Rojos de las Gargantas de Diosso",
        "ru": "Красные песчаниковые каньоны ущелья Диоссо"
    },
    "CI": {
        "tr": "Yamoussoukro Barış Meryem Anası Bazilikası",
        "en": "Basilica of Our Lady of Peace, Yamoussoukro",
        "de": "Basilika Notre-Dame de la Paix, Yamoussoukro",
        "es": "Basílica de Nuestra Señora de la Paz, Yamusukro",
        "ru": "Базилика Пресвятой Девы Марии Мира, Ямусукро"
    },
    "CM": {
        "tr": "Rhumsiki İğne Kayalıkları ve Mandara Dağları",
        "en": "Rhumsiki Volcanic Needle Rock & Mandara Mountains",
        "de": "Vulkanische Felsnadel von Rhumsiki & Mandara-Gebirge",
        "es": "Pico Volcánico de Rhumsiki y Montañas Mandara",
        "ru": "Вулканический пик Румсики и горы Мандара"
    },
    "CV": {
        "tr": "Sal Adası Santa Maria Sahili ve Turkuaz Okyanus",
        "en": "Santa Maria Beach & Turquoise Waters, Sal Island",
        "de": "Strand von Santa Maria & türkisfarbenes Meer, Insel Sal",
        "es": "Playa de Santa Maria y Aguas Turquesas, Isla de Sal",
        "ru": "Пляж Санта-Мария и лазурный океан, остров Сал"
    },
    "DJ": {
        "tr": "Assal Gölü Beyaz Tuz Krateri ve Turkuaz Lagünü",
        "en": "Lake Assal White Salt Crater & Turquoise Waters",
        "de": "Assal-See Weißer Salzkrater & Türkiswasser",
        "es": "Lago Assal Cráter de Sal Blanco y Laguna Turquesa",
        "ru": "Озеро Ассаль соляной кратер и бирюзовая вода"
    },
    "DZ": {
        "tr": "Tassili n'Ajjer Sahra Platosu ve Kanyon Kayalıkları (UNESCO)",
        "en": "Tassili n'Ajjer Sahara Plateau & Rock Formations (UNESCO)",
        "de": "Tassili n'Ajjer Sahara-Hochebene & Felsenlabyrinthe (UNESCO)",
        "es": "Meseta Sahariana de Tassili n'Ajjer y Cañones (UNESCO)",
        "ru": "Плато Тассилин-Аджер в Сахаре и каменные лабиринты (ЮНЕСКО)"
    },
    "EG": {
        "tr": "Gize Piramitleri ve Büyük Sfenks (UNESCO)",
        "en": "Great Pyramids of Giza & The Great Sphinx (UNESCO)",
        "de": "Pyramiden von Gizeh & Große Sphinx (UNESCO)",
        "es": "Pirámides de Guiza y Gran Esfinge (UNESCO)",
        "ru": "Великие пирамиды Гизы и Большой Сфинкс (ЮНЕСКО)"
    },
    "ER": {
        "tr": "Asmara Modernist Art Deco ve Fiat Tagliero Binası (UNESCO)",
        "en": "Fiat Tagliero Futurist Building & Asmara Architecture (UNESCO)",
        "de": "Futuristisches Fiat-Tagliero-Gebäude, Asmara (UNESCO)",
        "es": "Edificio Futurista Fiat Tagliero y Asmara Art Decó (UNESCO)",
        "ru": "Футуристическое здание Фиат Тальеро, Асмэра (ЮНЕСКО)"
    },
    "ET": {
        "tr": "Lalibela Bet Giyorgis Monolitik Kaya Kilisesi (UNESCO)",
        "en": "Church of Saint George (Bet Giyorgis), Lalibela (UNESCO)",
        "de": "Felsenkirche Sankt Georg (Bet Giyorgis), Lalibela (UNESCO)",
        "es": "Iglesia Monolítica de San Jorge (Bet Giyorgis), Lalibela (UNESCO)",
        "ru": "Монолитная скальная церковь Святого Георгия, Лалибэла (ЮНЕСКО)"
    },
    "GA": {
        "tr": "Loango Ulusal Parkı Atlantik Sahil Ormanları",
        "en": "Loango National Park Atlantic Coastal Rainforest",
        "de": "Loango-Nationalpark Atlantikküsten-Regenwald",
        "es": "Bosque Costero del Parque Nacional Loango",
        "ru": "Прибрежные дождевые леса национального парка Лоанго"
    },
    "GH": {
        "tr": "Cape Coast Tarihi Kalesi ve Atlantik Sahili (UNESCO)",
        "en": "Cape Coast Castle & Atlantic Coastline (UNESCO)",
        "de": "Festung Cape Coast Castle & Atlantikküste (UNESCO)",
        "es": "Castillo de Cape Coast y Costa Atlántica (UNESCO)",
        "ru": "Замок Кейп-Кост и побережье Атлантики (ЮНЕСКО)"
    },
    "GM": {
        "tr": "Gambiya Nehri Mangrov Kanalları ve Balıkçı Tekneleri",
        "en": "Gambia River Mangrove Channels & Pirogues",
        "de": "Gambia-Fluss Mangrovenkanäle & Pirogen",
        "es": "Canales de Manglares del Río Gambia y Piraguas",
        "ru": "Мангровые протоки реки Гамбия и рыбацкие пироги"
    },
    "GN": {
        "tr": "Fouta Djallon Kinkon Şelalesi ve Yeşil Kanyonu",
        "en": "Kinkon Falls & Fouta Djallon Emerald Highlands",
        "de": "Kinkon-Wasserfälle & Fouta-Djallon-Hochland",
        "es": "Cascadas de Kinkon y Tierras Altas de Fouta Djallon",
        "ru": "Водопад Кинкон и изумрудное нагорье Фута-Джаллон"
    },
    "GQ": {
        "tr": "Bioko Adası Malabo Santa Isabel Katedrali",
        "en": "Santa Isabel Cathedral, Malabo, Bioko Island",
        "de": "Kathedrale Santa Isabel, Malabo, Insel Bioko",
        "es": "Catedral de Santa Isabel, Malabo, Isla de Bioko",
        "ru": "Собор Санта-Исабель, Малабо, остров Биоко"
    },
    "GW": {
        "tr": "Bijagós Takımadaları Biyosfer Rezervi ve Sahili",
        "en": "Bissagos Archipelago (Bijagós) Biosphere Reserve",
        "de": "Bijagós-Archipel Biosphärenreservat & Strände",
        "es": "Archipiélago de los Bijagós Reserva de la Biosfera",
        "ru": "Архипелаг Бижагош биосферный заповедник и острова"
    },
    "KE": {
        "tr": "Maasai Mara Büyük Göç ve Savan Vahşi Yaşamı",
        "en": "Maasai Mara Great Migration & African Savannah",
        "de": "Maasai Mara Große Tierwanderung & Savanne",
        "es": "Gran Migración de Maasai Mara y Sabana Africana",
        "ru": "Великая миграция в Масаи-Мара и африканская саванна"
    },
    "KM": {
        "tr": "Moroni Eski Limanı ve Cuma Camii",
        "en": "Old Port & Vendredi Mosque, Moroni, Comoros",
        "de": "Alter Hafen & Vendredi-Moschee, Moroni, Komoren",
        "es": "Puerto Antiguo y Mezquita de Vendredi, Moroni, Comoras",
        "ru": "Старый порт и Пятничная мечеть в Морони, Коморы"
    },
    "LR": {
        "tr": "Robertsport Atlantik Sörf Sahili ve Cape Mount",
        "en": "Robertsport Atlantic Coast & Cape Mount Peninsula",
        "de": "Robertsport Atlantikküste & Cape Mount Halbinsel",
        "es": "Costa Atlántica de Robertsport y Península de Cape Mount",
        "ru": "Атлантическое побережье Робертспорта и мыс Маунт"
    },
    "LS": {
        "tr": "Maletsunyane Şelalesi ve Kanyonu, Semonkong",
        "en": "Maletsunyane Falls & Deep Gorge, Semonkong",
        "de": "Maletsunyane-Wasserfall & Schlucht, Semonkong",
        "es": "Cascada de Maletsunyane y Garganta, Semonkong",
        "ru": "Водопад Малецуньяне и глубокий каньон, Семонконг"
    },
    "LY": {
        "tr": "Leptis Magna Antik Roma Kenti ve Zafer Kemeri (UNESCO)",
        "en": "Leptis Magna Ancient Roman City & Arch of Septimius Severus (UNESCO)",
        "de": "Römerstadt Leptis Magna & Septimius-Severus-Bogen (UNESCO)",
        "es": "Ciudad Romana Antigua de Leptis Magna y Arco de Septimio Severo (UNESCO)",
        "ru": "Древнеримский город Лептис-Магна и арка Септимия Севера (ЮНЕСКО)"
    },
    "MA": {
        "tr": "Şafşavan (Chefchaouen) Mavi Şehri Sokakları",
        "en": "Chefchaouen Blue Pearl Historic Medina Streets",
        "de": "Blaue Gassen der Medina von Chefchaouen",
        "es": "Calles Azules de la Medina de Chefchaouen",
        "ru": "Синие улочки исторической медины Шефшауэна"
    },
    "MG": {
        "tr": "Baobab Yolu (Avenue of the Baobabs) Günbatımı",
        "en": "Avenue of the Baobabs at Sunset, Morondava",
        "de": "Baobab-Allee zum Sonnenuntergang, Morondava",
        "es": "Avenida de los Baobabs al Atardecer, Morondava",
        "ru": "Аллея баобабов на закате, Морондава"
    },
    "ML": {
        "tr": "Cenne Büyük Camii Kerpiç Mimarisi (UNESCO)",
        "en": "Great Mosque of Djenné Sudano-Sahelian Adobe Architecture (UNESCO)",
        "de": "Große Moschee von Djenné Lehmarchitektur (UNESCO)",
        "es": "Gran Mezquita de Djenné de Adobe Sudano-Saheliana (UNESCO)",
        "ru": "Великая мечеть Дженне глинобитная архитектура (ЮНЕСКО)"
    },
    "MR": {
        "tr": "Chinguetti Tarihi Çöl Şehri ve Sahra Kumulları (UNESCO)",
        "en": "Chinguetti Ancient Desert Ksar & Sahara Dunes (UNESCO)",
        "de": "Ksar von Chinguetti & Sahara-Sanddünen (UNESCO)",
        "es": "Ksar Antiguo de Chinguetti y Dunas del Sahara (UNESCO)",
        "ru": "Древний ксар Шингетти и песчаные дюны Сахары (ЮНЕСКО)"
    },
    "MU": {
        "tr": "Le Morne Brabant Dağı ve Turkuaz Lagünü (UNESCO)",
        "en": "Le Morne Brabant Monolith & Turquoise Lagoon (UNESCO)",
        "de": "Le Morne Brabant & türkisfarbene Lagune (UNESCO)",
        "es": "Península de Le Morne Brabant y Laguna Turquesa (UNESCO)",
        "ru": "Монолит Ле Морн Брабант и бирюзовая лагуна (ЮНЕСКО)"
    },
    "MW": {
        "tr": "Malavi Gölü Cape Maclear Turkuaz Suları ve Adacıkları",
        "en": "Lake Malawi Cape Maclear Turquoise Waters & Islands",
        "de": "Malawisee Cape Maclear Türkiswasser & Inseln",
        "es": "Aguas Turquesas e Islas de Cape Maclear, Lago Malaui",
        "ru": "Лазурные воды и острова Кейп Маклир на озере Малави"
    },
    "MZ": {
        "tr": "Bazaruto Takımadaları Kum Adacıkları ve Lagünü",
        "en": "Bazaruto Archipelago Sandspits & Turquoise Lagoon",
        "de": "Bazaruto-Archipel Sandbänke & Türkislagune",
        "es": "Bancos de Arena y Laguna Turquesa del Archipiélago de Bazaruto",
        "ru": "Песчаные косы и бирюзовая лагуна архипелага Базаруто"
    },
    "NA": {
        "tr": "Sossusvlei Deadvlei Kurumuş Akasyalar ve Kırmızı Kumullar",
        "en": "Sossusvlei Deadvlei Ancient Trees & Red Sand Dunes",
        "de": "Sossusvlei Deadvlei Ton-Pfanne & Rote Riesendünen",
        "es": "Deadvlei de Sossusvlei Árboles Milenarios y Dunas Rojas",
        "ru": "Мёртвое плато Дедвлей и красные песчаные дюны Соссусфлей"
    },
    "NE": {
        "tr": "Agadez Büyük Camii Kerpiç Minaresi (UNESCO)",
        "en": "Agadez Grand Mosque Clay Minaret (UNESCO)",
        "de": "Große Lehmmoschee von Agadez (UNESCO)",
        "es": "Alminar de Adobe de la Gran Mezquita de Agadez (UNESCO)",
        "ru": "Глинобитный минарет Большой мечети Агадеса (ЮНЕСКО)"
    },
    "NG": {
        "tr": "Zuma Kayası (Zuma Rock) Monoliti, Abuja",
        "en": "Zuma Rock Giant Monolith, Abuja",
        "de": "Zuma Rock Monolith, Abuja",
        "es": "Monolito Gigante de Zuma Rock, Abuya",
        "ru": "Гигантский скальный монолит Зума Рок, Абуджа"
    },
    "RW": {
        "tr": "Volkanlar Ulusal Parkı Dağ Gorili (UNESCO)",
        "en": "Mountain Gorilla in Volcanoes National Park (UNESCO)",
        "de": "Berggorilla im Volcanoes-Nationalpark (UNESCO)",
        "es": "Gorila de Montaña en el Parque Nacional de los Volcanes (UNESCO)",
        "ru": "Горная горилла в национальном парке Вулканов (ЮНЕСКО)"
    },
    "SC": {
        "tr": "La Digue Anse Source d'Argent Granit Kayalıkları",
        "en": "Anse Source d'Argent Pink Granite Boulders & Turquoise Bay, La Digue",
        "de": "Anse Source d'Argent Granitfelsen & Türkisbucht, La Digue",
        "es": "Rocas de Granito de Anse Source d'Argent, La Digue",
        "ru": "Розовые гранитные скалы Анс Сурс д'Аржан на острове Ла Диг"
    },
    "SD": {
        "tr": "Meroë Antik Nubya Piramitleri Çöl Harabeleri (UNESCO)",
        "en": "Ancient Nubian Pyramids of Meroë (UNESCO)",
        "de": "Nubische Pyramiden von Meroe (UNESCO)",
        "es": "Pirámides Nubias Antiguas de Meroe (UNESCO)",
        "ru": "Древние нубийские пирамиды Мероэ в пустыне (ЮНЕСКО)"
    },
    "SL": {
        "tr": "River No. 2 Sahili ve Beyaz Kum Lagünü, Freetown",
        "en": "River No. 2 Beach & White Sand Lagoon, Freetown",
        "de": "River No. 2 Strand & weiße Sandlagune, Freetown",
        "es": "Playa River No. 2 y Laguna de Arena Blanca, Freetown",
        "ru": "Пляж Ривер Намбер 2 и белоснежная песчаная лагуна, Фритаун"
    },
    "SN": {
        "tr": "Gorée Adası Köle Evi (Maison des Esclaves) (UNESCO)",
        "en": "House of Slaves (Maison des Esclaves), Gorée Island (UNESCO)",
        "de": "Sklavenhaus (Maison des Esclaves) auf der Insel Gorée (UNESCO)",
        "es": "Casa de los Esclavos en la Isla de Gorée (UNESCO)",
        "ru": "Дом рабов (Maison des Esclaves) на острове Горе (ЮНЕСКО)"
    },
    "SO": {
        "tr": "Laas Geel Tarihi Neolitik Mağara Sanatı",
        "en": "Laas Geel Ancient Neolithic Cave Rock Art",
        "de": "Neolithische Felsmalereien von Laas Geel",
        "es": "Arte Rupestre Neolítico de Laas Geel",
        "ru": "Древние неолитические наскальные рисунки Лаас Гааль"
    },
    "SS": {
        "tr": "Juba Beyaz Nil Nehri Manzarası ve Kıyıları",
        "en": "White Nile River & Shoreline, Juba",
        "de": "Weißer Nil & Uferlandschaft, Juba",
        "es": "Río Nilo Blanco y Paisaje Costero, Juba",
        "ru": "Река Белый Нил и прибрежные пейзажи, Джуба"
    },
    "ST": {
        "tr": "Pico Cão Grande Volkanik İğne Zirvesi",
        "en": "Pico Cão Grande Volcanic Needle Peak",
        "de": "Vulkanische Felsnadel Pico Cão Grande",
        "es": "Aguja Volcánica Pico Cão Grande",
        "ru": "Вулканический пик-игла Пико-Кан-Гранде"
    },
    "SZ": {
        "tr": "Mantenga Şelalesi ve Kültürel Vadisi",
        "en": "Mantenga Falls & Cultural Reserve, Ezulwini Valley",
        "de": "Mantenga-Wasserfälle & Kulturreservat, Ezulwini-Tal",
        "es": "Cataratas de Mantenga y Reserva Cultural de Ezulwini",
        "ru": "Водопад Мантенга и культурный заповедник в долине Эзулвини"
    },
    "TD": {
        "tr": "Ennedi Platosu Kanyon Labyrenti ve Kumulları (UNESCO)",
        "en": "Ennedi Plateau Rock Labyrinth & Canyons (UNESCO)",
        "de": "Ennedi-Massiv Felsenlabyrinth & Wüstenschluchten (UNESCO)",
        "es": "Laberinto de Rocas y Cañones de la Meseta de Ennedi (UNESCO)",
        "ru": "Каменный лабиринт плато Эннеди и каньоны Сахары (ЮНЕСКО)"
    },
    "TG": {
        "tr": "Koutammakou Batammariba Kerpiç Kule Evleri (UNESCO)",
        "en": "Koutammakou Batammariba Mud Tower Houses (UNESCO)",
        "de": "Lehmtürme der Batammariba in Koutammakou (UNESCO)",
        "es": "Casas-Torre de Barro de Batammariba en Koutammakou (UNESCO)",
        "ru": "Глинобитные дома-башни Батаммариба в Кутаммаку (ЮНЕСКО)"
    },
    "TN": {
        "tr": "Sidi Bou Said Mavi-Beyaz Uçurum Sahil Köyü",
        "en": "Sidi Bou Said Cliffside Blue & White Coastal Village",
        "de": "Küstendorf Sidi Bou Said mit blau-weißen Häusern",
        "es": "Pueblo Costero Azul y Blanco de Sidi Bou Said",
        "ru": "Бело-голубая прибрежная деревушка Сиди-Бу-Саид"
    },
    "TZ": {
        "tr": "Kilimanjaro Dağı Barranco Duvarı ve Zirve Patikası",
        "en": "Mount Kilimanjaro Barranco Wall & Alpine Trail",
        "de": "Kilimandscharo Barranco Wall & Alpinpfad",
        "es": "Muro de Barranco del Monte Kilimanjaro y Sendero Alpino",
        "ru": "Стена Барранко на горе Килиманджаро и альпийская тропа"
    },
    "UG": {
        "tr": "Bwindi Geçilmez Ormanı Dağ Gorili (UNESCO)",
        "en": "Mountain Gorilla in Bwindi Impenetrable National Park (UNESCO)",
        "de": "Berggorilla im Bwindi-Regenwald-Nationalpark (UNESCO)",
        "es": "Gorila de Montaña en la Selva Impenetrable de Bwindi (UNESCO)",
        "ru": "Горная горилла в национальном парке Непроходимый лес Бвинди (ЮНЕСКО)"
    },
    "ZA": {
        "tr": "Masa Dağı (Table Mountain) ve Cape Town Körfezi",
        "en": "Table Mountain & Cape Town Bay Panorama",
        "de": "Tafelberg & Bucht von Kapstadt Panorama",
        "es": "Montaña de la Mesa (Table Mountain) y Bahía de Ciudad del Cabo",
        "ru": "Столовая гора и панорама залива Кейптауна"
    },
    "ZM": {
        "tr": "Viktorya Şelaleleri (Mosi-oa-Tunya) Boiling Pot Çağlayanı",
        "en": "Victoria Falls (Mosi-oa-Tunya) Boiling Pot Cataract",
        "de": "Victoriafälle (Mosi-oa-Tunya) Boiling Pot Wasserfall",
        "es": "Cataratas Victoria (Mosi-oa-Tunya) Catarata Boiling Pot",
        "ru": "Водопад Виктория (Моси-оа-Тунья) кипящий котёл"
    },
    "ZW": {
        "tr": "Viktorya Şelaleleri Kanyonu ve Gökkuşağı Sisi",
        "en": "Victoria Falls Gorge & Rainbow Mist Spray",
        "de": "Victoriafälle-Schlucht mit Regenbogen-Sprühnebel",
        "es": "Garganta de las Cataratas Victoria y Neblina con Arcoíris",
        "ru": "Ущелье водопада Виктория и радужный водяной туман"
    },
    "AG": {
        "tr": "Nelson Tersanesi Tarihi Limanı, English Harbour (UNESCO)",
        "en": "Nelson's Dockyard UNESCO Historic Harbour, English Harbour",
        "de": "Nelson's Dockyard historischer Hafen, English Harbour (UNESCO)",
        "es": "Astillero Histórico de Nelson en English Harbour (UNESCO)",
        "ru": "Историческая верфь Нельсона в Инглиш-Харбор (ЮНЕСКО)"
    },
    "BB": {
        "tr": "Carlisle Körfezi Turkuaz Sahili ve Tekneler, Bridgetown",
        "en": "Carlisle Bay Turquoise Shoreline & Boats, Bridgetown",
        "de": "Carlisle Bay Türkisküste & Boote, Bridgetown",
        "es": "Costa Turquesa de Bahía Carlisle y Barcos, Bridgetown",
        "ru": "Бирюзовое побережье залива Карлайл и лодки, Бриджтаун"
    },
    "BS": {
        "tr": "Exuma Cays Turkuaz Suları ve Beyaz Kum Adacıkları",
        "en": "Exuma Cays Turquoise Waters & White Sandbars",
        "de": "Exuma Cays Türkiswasser & weiße Sandbänke",
        "es": "Cayos Exuma Aguas Turquesas y Bancos de Arena Blanca",
        "ru": "Бирюзовые воды Эксума-Кейс и белые песчаные отмели"
    },
    "BZ": {
        "tr": "Great Blue Hole Dev Deniz Çukuru ve Resif (UNESCO)",
        "en": "Great Blue Hole Giant Marine Sinkhole & Reef (UNESCO)",
        "de": "Great Blue Hole Meeresdoline & Barrierriff (UNESCO)",
        "es": "Gran Agujero Azul Cenote Marino Gigante y Arrecife (UNESCO)",
        "ru": "Большая голубая дыра гигантский морской провал и риф (ЮНЕСКО)"
    },
    "CA": {
        "tr": "On Zirve Vadisi ve Moraine Gölü, Banff Milli Parkı",
        "en": "Valley of the Ten Peaks & Moraine Lake, Banff National Park",
        "de": "Valley of the Ten Peaks & Moraine Lake, Banff-Nationalpark",
        "es": "Valle de los Diez Picos y Lago Moraine, Parque Nacional Banff",
        "ru": "Долина десяти пиков и озеро Морейн, национальный парк Банф"
    },
    "CR": {
        "tr": "Arenal Volkanı Simetrik Konisi ve Yağmur Ormanı",
        "en": "Arenal Volcano Symmetrical Cone & Rainforest",
        "de": "Arenal Vulkankegel & Regenwald",
        "es": "Volcán Arenal Cono Simétrico y Selva Tropical",
        "ru": "Симметричный конус вулкана Ареналь и тропический лес"
    },
    "CU": {
        "tr": "El Capitolio ve Klasik Amerikan Arabaları, Havana",
        "en": "El Capitolio & Vintage American Cars, Havana",
        "de": "El Capitolio & Oldtimer, Havanna",
        "es": "El Capitolio y Autos Clásicos Americanos, La Habana",
        "ru": "Капитолий и винтажные американские автомобили, Гавана"
    },
    "DM": {
        "tr": "Trafalgar Şelaleleri ve Yağmur Ormanı Kanyonu",
        "en": "Trafalgar Falls Lush Rainforest Gorge, Morne Trois Pitons",
        "de": "Trafalgar-Wasserfälle & Regenwaldschlucht",
        "es": "Cascadas Trafalgar y Garganta Selvática, Morne Trois Pitons",
        "ru": "Водопады Трафальгар и ущелье в тропическом лесу"
    },
    "DO": {
        "tr": "Punta Cana Hindistan Cevizi Palmiyeleri ve Turkuaz Sahil",
        "en": "Punta Cana Coconut Palm Beach & Turquoise Ocean",
        "de": "Punta Cana Kokospalmenstrand & Türkismeer",
        "es": "Playa de Cocoteros de Punta Cana y Océano Turquesa",
        "ru": "Пляж с кокосовыми пальмами и лазурный океан в Пунта-Кане"
    },
    "GD": {
        "tr": "The Carenage Pastel Renkli Limanı ve Yamaç Evleri, St. George's",
        "en": "The Carenage Pastel Harbor & Hillside, St. George's",
        "de": "Pastellfarbener Hafen The Carenage, St. George's",
        "es": "Puerto Histórico The Carenage y Colinas de St. George's",
        "ru": "Пастельная гавань Каренаж и холмистый городок Сент-Джорджес"
    },
    "GT": {
        "tr": "Tikal Maya Tapınağı I (Büyük Jaguar Piramidi) (UNESCO)",
        "en": "Tikal Mayan Temple I (Great Jaguar Pyramid) (UNESCO)",
        "de": "Tikal Maya-Tempel I (Großer Jaguar) im Urwald (UNESCO)",
        "es": "Templo Maya I de Tikal (Pirámide del Gran Jaguar) (UNESCO)",
        "ru": "Храм майя Тикаль I (Пирамида Великого Ягуара) (ЮНЕСКО)"
    },
    "HN": {
        "tr": "Copán Antik Maya Arkeolojik Harabeleri ve Akropol (UNESCO)",
        "en": "Copán Ancient Maya Archaeological Ruins & Temple Pyramids (UNESCO)",
        "de": "Maya-Ruinen von Copán & Tempelpyramiden (UNESCO)",
        "es": "Ruinas Arqueológicas Mayas de Copán y Pirámides (UNESCO)",
        "ru": "Древние археологические руины майя в Копане (ЮНЕСКО)"
    },
    "HT": {
        "tr": "Citadelle Laferrière Dağ Kalesi Panoraması (UNESCO)",
        "en": "Citadelle Laferrière Mountaintop Fortress Panorama (UNESCO)",
        "de": "Bergfestung Citadelle Laferrière Panorama (UNESCO)",
        "es": "Fortaleza de Montaña Citadelle Laferrière (UNESCO)",
        "ru": "Горная крепость Цитадель Лаферьер панорама (ЮНЕСКО)"
    },
    "JM": {
        "tr": "Dunn's River Şelalesi Doğal Kireçtaşı Terasları, Ocho Rios",
        "en": "Dunn's River Falls Terraced Cascades & Rainforest, Ocho Rios",
        "de": "Dunn's River Falls Kalksteinterrassen & Regenwald, Ocho Rios",
        "es": "Cascadas Escalonadas de Dunn's River y Selva, Ocho Ríos",
        "ru": "Ступенчатые каскады водопада Даннс-Ривер, Очо-Риос"
    },
    "KN": {
        "tr": "Brimstone Hill Kalesi ve Karayip Denizi Manzarası (UNESCO)",
        "en": "Brimstone Hill Fortress Citadel & Caribbean Views (UNESCO)",
        "de": "Brimstone Hill Festung & Karibik-Aussicht (UNESCO)",
        "es": "Fortaleza de Brimstone Hill y Vistas al Caribe (UNESCO)",
        "ru": "Крепость Бримстон-Хилл и виды на Карибское море (ЮНЕСКО)"
    },
    "LC": {
        "tr": "İkiz Pitonlar (Gros Piton & Petit Piton) Volkanik Zirveleri (UNESCO)",
        "en": "The Twin Pitons Volcanic Spires Rising from Caribbean Sea (UNESCO)",
        "de": "Vulkanische Felsspitzen der Zwillings-Pitons (UNESCO)",
        "es": "Las Dos Agujas Volcánicas Pitons sobre el Mar Caribe (UNESCO)",
        "ru": "Вулканические пики-близнецы Питоны над Карибским морем (ЮНЕСКО)"
    },
    "MX": {
        "tr": "Chichén Itzá Kukulcán Tapınağı (El Castillo) (UNESCO)",
        "en": "Chichén Itzá Temple of Kukulcán (El Castillo), Yucatán (UNESCO)",
        "de": "Chichén Itzá Pyramide des Kukulcán (El Castillo) (UNESCO)",
        "es": "Templo de Kukulcán (El Castillo) en Chichén Itzá (UNESCO)",
        "ru": "Храм Кукулькана (Эль-Кастильо) в Чичен-Ице (ЮНЕСКО)"
    },
    "NI": {
        "tr": "Granada Katedrali Sarı Neoklasik Cephesi ve Meydanı",
        "en": "Cathedral of Granada Yellow Neoclassical Facade & Plaza",
        "de": "Kathedrale von Granada gelbe Fassade & Marktplatz",
        "es": "Catedral de Granada Fachada Neoclásica Amarilla y Plaza",
        "ru": "Кафедральный собор Гранады желтый фасад и площадь"
    },
    "PA": {
        "tr": "Panama Kanalı Miraflores Havuzları ve Konteyner Gemisi",
        "en": "Panama Canal Miraflores Locks with Container Ship",
        "de": "Panamakanal Miraflores-Schleusen & Containerschiff",
        "es": "Esclusas de Miraflores del Canal de Panamá con Barco",
        "ru": "Шлюзы Мирафлорес Панамского канала с контейнеровозом"
    },
    "SV": {
        "tr": "Santa Ana Volkanı Zümrüt Yeşil Krater Gölü",
        "en": "Santa Ana Volcano (Ilamatepec) Emerald Green Crater Lake",
        "de": "Vulkan Santa Ana Smaragdgrüner Kratersee",
        "es": "Volcán de Santa Ana (Ilamatepec) Laguna Esmeralda de Cráter",
        "ru": "Изумрудно-зелёное кратерное озеро вулкана Санта-Ана"
    },
    "TT": {
        "tr": "Pigeon Point Saman Çatılı İskele ve Turkuaz Sahil, Tobago",
        "en": "Pigeon Point Thatched Jetty & Turquoise Shallows, Tobago",
        "de": "Pigeon Point reetgedeckter Steg & Türkiswasser, Tobago",
        "es": "Muelle de Techo de Paja y Aguas Turquesas de Pigeon Point, Tobago",
        "ru": "Причал с соломенной крышей Пиджен-Пойнт на Тобаго"
    },
    "US": {
        "tr": "Özgürlük Heykeli ve New York Limanı Panoraması",
        "en": "Statue of Liberty National Monument & New York Harbor",
        "de": "Freiheitsstatue & Hafen von New York Panorama",
        "es": "Estatua de la Libertad y Puerto de Nueva York",
        "ru": "Статуя Свободы и панорама гавани Нью-Йорка"
    },
    "VC": {
        "tr": "Tobago Cays Deniz Parkı Mercan Resifleri ve Turkuaz Sığlıklar",
        "en": "Tobago Cays Marine Park Barrier Reef & Turquoise Shallows",
        "de": "Tobago Cays Meerespark Korallenriff & Türkisflachwasser",
        "es": "Parque Marino Tobago Cays Arrecife de Coral y Aguas Turquesas",
        "ru": "Морской парк Тобаго-Кейс коралловый риф и лазурные отмели"
    },
    "AR": {
        "tr": "Perito Moreno Buzulu Mavi Buz Duvarı ve Argentino Gölü",
        "en": "Perito Moreno Glacier Blue Ice Wall & Lago Argentino (UNESCO)",
        "de": "Gletscher Perito Moreno Blaue Eiswand & Lago Argentino (UNESCO)",
        "es": "Glaciar Perito Moreno Pared de Hielo Azul y Lago Argentino (UNESCO)",
        "ru": "Ледник Перито-Морено стена голубого льда и озеро Аргентино (ЮНЕСКО)"
    },
    "BO": {
        "tr": "Salar de Uyuni Sonsuz Tuz Çölü ve Ayna Yansıması Günbatımı",
        "en": "Salar de Uyuni Infinite Salt Flat Mirror Sunset Reflection",
        "de": "Salar de Uyuni Endlose Salzebene & Spiegel-Sonnenuntergang",
        "es": "Salar de Uyuni Espejo Infinito de Sal al Atardecer",
        "ru": "Солончак Уюни зеркальное отражение заката в соляной пустыне"
    },
    "BR": {
        "tr": "Kurtarıcı İsa Heykeli (Cristo Redentor) ve Rio de Janeiro",
        "en": "Christ the Redeemer & Rio de Janeiro Skyline from Sugarloaf",
        "de": "Christusstatue Cristo Redentor & Skyline von Rio de Janeiro",
        "es": "Cristo Redentor y Horizonte de Río de Janeiro",
        "ru": "Статуя Христа-Искупителя и панорама Рио-де-Жанейро"
    },
    "CL": {
        "tr": "Cuernos del Paine Boynuz Zirveleri ve Turkuaz Göl, Patagonya",
        "en": "Cuernos del Paine Horn Peaks & Turquoise Lake, Torres del Paine",
        "de": "Cuernos del Paine Felsenhörner & Türkissee, Torres del Paine",
        "es": "Cuernos del Paine Picos Rocosos y Lago Turquesa, Torres del Paine",
        "ru": "Рога Пайне (Cuernos del Paine) и лазурное озеро, Торрес-дель-Пайне"
    },
    "CO": {
        "tr": "Cartagena de Indias Tarihi Kolonyal Balkonları ve Surları (UNESCO)",
        "en": "Cartagena de Indias Walled Old City Colorful Colonial Balconies (UNESCO)",
        "de": "Cartagena de Indias historische Kolonialbalkone & Stadtmauern (UNESCO)",
        "es": "Casco Antiguo Amurallado de Cartagena de Indias y Balcones Coloniales (UNESCO)",
        "ru": "Исторический центр Картахены с балконами в колониальном стиле (ЮНЕСКО)"
    },
    "EC": {
        "tr": "Galápagos Adaları Bartolomé Pinnacle Zirvesi ve Volkanik Koy",
        "en": "Galápagos Islands Bartolomé Pinnacle Rock & Volcanic Bay (UNESCO)",
        "de": "Galápagos-Inseln Bartolomé Pinnacle Rock & Vulkanbucht (UNESCO)",
        "es": "Islas Galápagos Roca Pináculo de Bartolomé y Bahía Volcánica (UNESCO)",
        "ru": "Скала Пиннакл на острове Бартоломе и вулканическая бухта, Галапагосы (ЮНЕСКО)"
    },
    "GY": {
        "tr": "Kaieteur Şelalesi Potaro Nehri Tek Kırılmalı Dev Çağlayan",
        "en": "Kaieteur Falls Potaro River Giant Single Drop Waterfall & Gorge",
        "de": "Kaieteur-Wasserfall Potaro-Fluss Riesenkaskade & Schlucht",
        "es": "Cataratas Kaieteur Caída Gigante de Agua en el Río Potaro",
        "ru": "Водопад Каетур гигантский однокаскадный водопад на реке Потаро"
    },
    "PE": {
        "tr": "Machu Picchu Kutsal İnka Kalesi ve Huayna Picchu Dağı (UNESCO)",
        "en": "Machu Picchu Sacred Inca Citadel & Huayna Picchu Mountain (UNESCO)",
        "de": "Machu Picchu Heilige Inka-Zitadelle & Berg Huayna Picchu (UNESCO)",
        "es": "Ciudadela Sagrada Inca de Machu Picchu y Montaña Huayna Picchu (UNESCO)",
        "ru": "Священная цитадель инков Мачу-Пикчу и гора Уайна-Пикчу (ЮНЕСКО)"
    },
    "PY": {
        "tr": "La Santísima Trinidad de Paraná Cizvit Misyonu Harabeleri (UNESCO)",
        "en": "Jesuit Missions of La Santísima Trinidad de Paraná Ruins (UNESCO)",
        "de": "Jesuitenmission La Santísima Trinidad de Paraná Ruinen (UNESCO)",
        "es": "Misiones Jesuíticas de La Santísima Trinidad de Paraná (UNESCO)",
        "ru": "Руины иезуитской миссии Ла-Сантисима-Тринидад-де-Парана (ЮНЕСКО)"
    },
    "SR": {
        "tr": "Paramaribo Tarihi Ahşap Kolonyal Şehir Merkezi (UNESCO)",
        "en": "Historic Inner City of Paramaribo Dutch Wooden Colonial Heritage (UNESCO)",
        "de": "Historische Innenstadt von Paramaribo Niederländisches Kolonialerbe (UNESCO)",
        "es": "Centro Histórico de Paramaribo Patrimonio Colonial de Madera (UNESCO)",
        "ru": "Исторический центр Парамарибо деревянное голландское колониальное наследие (ЮНЕСКО)"
    },
    "UY": {
        "tr": "La Mano (Los Dedos) Anıtsal Kum Heykeli, Punta del Este",
        "en": "La Mano (Los Dedos) Monumental Sand Sculpture, Punta del Este",
        "de": "Monumentale Skulptur La Mano (Los Dedos), Punta del Este",
        "es": "Monumento de La Mano (Los Dedos) en la Arena, Punta del Este",
        "ru": "Монументальная скульптура Пальцы (La Mano) на песке, Пунта-дель-Эсте"
    },
    "VE": {
        "tr": "Angel Şelalesi (Salto Ángel) Dünyanın En Yüksek Şelalesi (UNESCO)",
        "en": "Angel Falls (Salto Ángel) World's Highest Waterfall, Canaima (UNESCO)",
        "de": "Salto Ángel Höchster Wasserfall der Welt, Canaima (UNESCO)",
        "es": "Salto Ángel Cascada Más Alta del Mundo, Canaima (UNESCO)",
        "ru": "Водопад Анхель (Salto Ángel) самый высокий водопад в мире, Канайма (ЮНЕСКО)"
    },
    "AU": {
        "tr": "Sidney Opera Binası ve Port Jackson Limanı Panoraması (UNESCO)",
        "en": "Sydney Opera House & Port Jackson Harbour Panorama (UNESCO)",
        "de": "Sydney Opera House & Hafen von Port Jackson Panorama (UNESCO)",
        "es": "Ópera de Sídney y Puerto Jackson Panorama (UNESCO)",
        "ru": "Сиднейский оперный театр и гавань Порт-Джексон панорама (ЮНЕСКО)"
    },
    "FJ": {
        "tr": "Yasawa Adaları Mercan Atolü Tepeleri ve Turkuaz Koyu",
        "en": "Yasawa Islands Coral Atoll Green Hills & Turquoise Bay",
        "de": "Yasawa-Inseln Korallenatoll & Türkisbucht",
        "es": "Islas Yasawa Colinas de Atolón de Coral y Bahía Turquesa",
        "ru": "Холмы кораллового атолла островов Ясава и лазурная бухта"
    },
    "FM": {
        "tr": "Nan Madol Megalitik Bazalt Taş Şehir Harabeleri, Pohnpei (UNESCO)",
        "en": "Nan Madol Megalithic Basalt Stone City Ruins, Pohnpei (UNESCO)",
        "de": "Ruinen der Megalithstadt Nan Madol, Pohnpei (UNESCO)",
        "es": "Ruinas Megalíticas de Piedra Basáltica de Nan Madol, Pohnpei (UNESCO)",
        "ru": "Мегалитические базальтовые руины древнего города Нан-Мадол, Понпеи (ЮНЕСКО)"
    },
    "KI": {
        "tr": "Güney Tarawa Mercan Atolü Şeridi ve Pasifik Lagünü",
        "en": "South Tarawa Coral Atoll Ribbon & Turquoise Pacific Lagoon",
        "de": "Südtarawa Korallenatoll-Streifen & Pazifiklagune",
        "es": "Atolón de Coral de Tarawa Sur y Laguna Turquesa del Pacífico",
        "ru": "Полоса кораллового атолла Южная Тарава и лазурная лагуна Тихого океана"
    },
    "MH": {
        "tr": "Laura Sahili Mercan Kumları ve Majuro Atolü Lagünü",
        "en": "Laura Beach Coral Sands & Turquoise Pacific Lagoon, Majuro Atoll",
        "de": "Laura Beach Korallensand & Pazifiklagune, Majuro-Atoll",
        "es": "Playa Laura Arenas de Coral y Laguna del Atolón de Majuro",
        "ru": "Пляж Лаура коралловый песок и лагуна атолла Маджуро"
    },
    "NR": {
        "tr": "Anibare Körfezi Mercan Kayalıkları ve Pasifik Dalgaları",
        "en": "Anibare Bay Jagged Coral Pinnacles & Pacific Breakers",
        "de": "Anibare-Bucht Felsige Korallenspitzen & Pazifikwellen",
        "es": "Bahía de Anibare Pináculos de Coral y Olas del Pacífico",
        "ru": "Залив Анибаре зазубренные коралловые скалы и океанские волны"
    },
    "NZ": {
        "tr": "Milford Sound Mitre Peak ve Fiyort Uçurumları (UNESCO)",
        "en": "Milford Sound Mitre Peak & Fiordland Glacier Cliffs (UNESCO)",
        "de": "Milford Sound Mitre Peak & Fiordland-Klippen (UNESCO)",
        "es": "Fiordo de Milford Sound Pico Mitre y Acantilados Glaciares (UNESCO)",
        "ru": "Фьорд Милфорд-Саунд пик Митр и ледниковые скалы (ЮНЕСКО)"
    },
    "PG": {
        "tr": "Tavurvur Aktif Yanardağ Kalderası ve Kül Dumanı, Rabaul",
        "en": "Tavurvur Active Volcano Caldera Plume, Rabaul",
        "de": "Aktiver Vulkan Tavurvur Aschewolke & Caldera, Rabaul",
        "es": "Volcán Activo Tavurvur Columna de Ceniza y Caldera, Rabaul",
        "ru": "Активный вулкан Тавурвур шлейф пепла и кальдера, Рабаул"
    },
    "PW": {
        "tr": "Kaya Adaları (Rock Islands) Mantar Mercan Adacıkları (UNESCO)",
        "en": "Rock Islands Southern Lagoon Mushroom Coral Islets (UNESCO)",
        "de": "Rock Islands Südlagune Pilzförmige Koralleninseln (UNESCO)",
        "es": "Islas Chelbacheb (Rock Islands) Islotes de Coral en Forma de Hongo (UNESCO)",
        "ru": "Скалистые острова (Rock Islands) грибовидные коралловые островки (ЮНЕСКО)"
    },
    "SB": {
        "tr": "Marovo Çift Bariyer Lagünü ve Mercan Adacıkları",
        "en": "Marovo Lagoon Double Barrier Coral Islets & Palms",
        "de": "Marovo-Lagune Doppel-Barriereriff & Koralleninseln",
        "es": "Laguna de Marovo Doble Barrera de Arrecifes e Islotes de Coral",
        "ru": "Лагуна Марово двойной барьерный риф и коралловые островки"
    },
    "TO": {
        "tr": "Ha'amonga 'a Maui Antik Megalitik Taş Kapısı, Tongatapu",
        "en": "Ha'amonga 'a Maui Ancient Megalithic Trilithon, Tongatapu",
        "de": "Ha'amonga 'a Maui Antiker Megalith-Trilith, Tongatapu",
        "es": "Ha'amonga 'a Maui Trilito Megalítico Antiguo, Tongatapu",
        "ru": "Древний мегалитический трилит Хаамонга-а-Мауи, Тонгатапу"
    },
    "TV": {
        "tr": "Funafuti Mercan Lagünü ve Turkuaz Pasifik Kıyısı",
        "en": "Funafuti Lagoon Coral Sand Shoreline & Turquoise Waters",
        "de": "Funafuti-Lagune Korallensandstrand & Pazifikwasser",
        "es": "Laguna de Funafuti Costa de Arena de Coral y Aguas Turquesas",
        "ru": "Лагуна Фунафути побережье с коралловым песком и лазурная вода"
    },
    "VU": {
        "tr": "Yasur Dağı Aktif Volkanı Gece Lav Patlamaları, Tanna",
        "en": "Mount Yasur Volcano Fiery Lava Explosions & Night Ash Crater",
        "de": "Vulkan Mount Yasur Glühende Lavaexplosionen bei Nacht, Tanna",
        "es": "Volcán Monte Yasur Explosiones de Lava Nocturnas, Tanna",
        "ru": "Вулкан Ясур ночные взрывы лавы и кратер с пеплом, остров Танна"
    },
    "WS": {
        "tr": "To-Sua Okyanus Çukuru Doğal Havuzu ve Ahşap Merdiven, Upolu",
        "en": "To-Sua Ocean Trench Natural Sunken Swimming Grotto, Upolu",
        "de": "To-Sua Ocean Trench Natürliche Meeresgrotte & Holzleiter, Upolu",
        "es": "Fosa Oceánica de To-Sua Gruta Natural Sumergida con Escalera, Upolu",
        "ru": "Океанический разлом То-Суа природный сенот с деревянной лестницей, Уполу"
    }
}

# Verify all 199 countries are present in LANDMARKS_5L
missing_landmarks = []
for c in verified_countries:
    code = c['code']
    if code not in LANDMARKS_5L:
        missing_landmarks.append(code)

if missing_landmarks:
    raise ValueError(f"Missing landmarks for: {missing_landmarks}")

print("All 199 countries have verified 5-language landmarks.")

# Build records
records = []
for c in verified_countries:
    code = c['code']
    code_lower = code.lower()
    l5 = LANDMARKS_5L[code]
    p = c['candidatePrimary']

    record = {
        "code": code,
        "nameTr": c['nameTr'],
        "nameEn": c['nameEn'],
        "image": f"/images/countries/{code_lower}-480.webp",
        "landmark": l5['tr'],
        "landmarkI18n": {
            "tr": l5['tr'],
            "en": l5['en'],
            "de": l5['de'],
            "es": l5['es'],
            "ru": l5['ru']
        },
        "author": p['artist'],
        "license": p['license'],
        "sourceUrl": p['url'],
        "sourcePageUrl": p['sourcePageUrl'],
        "sourceId": p.get('sourceId', f"verified_{code_lower}_{re.sub(r'[^a-zA-Z0-9]', '_', p['title'])[:30]}"),
        "verifiedAt": "2026-10-17",
        "focus": "center",
        "symbols": {
            "main": c.get('symbols', {}).get('main', l5['tr']),
            "alt1": c.get('symbols', {}).get('alt1', ''),
            "alt2": c.get('symbols', {}).get('alt2', '')
        }
    }
    records.append(record)

# Write to src/data/countryVisualsData.ts
ts_content = f"""/**
 * Autogenerated High-Fidelity Verified Country Visuals Dataset
 * Total Countries: 199
 * Generated: 2026-10-18
 * Source: Wikimedia Commons & Verified High-Resolution Photography
 */

export interface CountryVisualRecord {{
  code: string;
  nameTr: string;
  nameEn: string;
  image: string;
  landmark: string;
  landmarkI18n: {{
    tr: string;
    en: string;
    de: string;
    es: string;
    ru: string;
  }};
  author: string;
  license: string;
  sourceUrl: string;
  sourcePageUrl: string;
  sourceId: string;
  verifiedAt: string;
  focus?: string;
  symbols?: {{
    main: string;
    alt1?: string;
    alt2?: string;
  }};
}}

export const COUNTRY_VISUALS_LIST: CountryVisualRecord[] = {json.dumps(records, ensure_ascii=False, indent=2)};

export const COUNTRY_VISUALS_MAP: Record<string, CountryVisualRecord> = Object.fromEntries(
  COUNTRY_VISUALS_LIST.map((item) => [item.code, item])
);
"""

out_path = 'src/data/countryVisualsData.ts'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Successfully generated {out_path} with {len(records)} countries.")
