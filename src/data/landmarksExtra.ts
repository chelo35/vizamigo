/**
 * Ayrıntılı miras verisi (COUNTRY_HERITAGE) olmayan ülkeler için gerçek, tanınmış görülecek yerler.
 * Eskiden bu ülkelerde "<Başkent> Historic Old Town & Grand Boulevard" gibi doldurma metinler vardı.
 * Her yer: [en, tr, de, es, ru] — her dilde yerleşik yazımıyla (Wikidata etiketleri referans alındı).
 */
type L5 = [string, string, string, string, string, string];

const D: Record<string, L5[]> = {
  XK: [
    ['Prizren Old Town', 'Prizren Eski Şehir', 'Altstadt von Prizren', 'Casco antiguo de Prizren', 'Старый город Призрена', 'Centro histórico de Prizren'],
    ['Rugova Canyon', 'Rugova Kanyonu', 'Rugova-Schlucht', 'Cañón de Rugova', 'Руговское ущелье', 'Cânion de Rugova'],
    ['Visoki Dečani Monastery', 'Visoki Dečani Manastırı', 'Kloster Visoki Dečani', 'Monasterio de Visoki Dečani', 'Монастырь Високи-Дечани', 'Mosteiro de Visoki Dečani']
  ],
  MD: [
    ['Old Orhei (Orheiul Vechi)', 'Eski Orhei (Orheiul Vechi)', 'Orheiul Vechi', 'Orheiul Vechi', 'Старый Орхей', 'Orheiul Vechi'],
    ['Mileștii Mici Wine Cellars', 'Mileștii Mici Şarap Mahzenleri', 'Weinkeller Mileștii Mici', 'Bodegas de Mileștii Mici', 'Винные подвалы Милештий Мичь', 'Adegas de Mileștii Mici'],
    ['Cricova Winery', 'Cricova Şarap Mahzenleri', 'Weingut Cricova', 'Bodegas de Cricova', 'Винный комбинат «Крикова»', 'Adegas de Cricova'],
    ['Soroca Fortress', 'Soroca Kalesi', 'Festung Soroca', 'Fortaleza de Soroca', 'Сорокская крепость', 'Fortaleza de Soroca']
  ],
  BY: [
    ['Mir Castle', 'Mir Kalesi', 'Schloss Mir', 'Castillo de Mir', 'Мирский замок', 'Castelo de Mir'],
    ['Nesvizh Castle', 'Nesvizh Kalesi', 'Schloss Njaswisch', 'Castillo de Nesvizh', 'Несвижский замок', 'Castelo de Nesvizh'],
    ['Brest Fortress', 'Brest Kalesi', 'Brester Festung', 'Fortaleza de Brest', 'Брестская крепость', 'Fortaleza de Brest'],
    ['Belovezhskaya Pushcha National Park', 'Belovejskaya Puşa Milli Parkı', 'Nationalpark Belowescher Heide', 'Parque nacional Belovezhskaya Pushcha', 'Национальный парк «Беловежская пуща»', 'Parque Nacional Belovezhskaya Pushcha']
  ],
  AM: [
    ['Geghard Monastery', 'Geğard Manastırı', 'Kloster Geghard', 'Monasterio de Geghard', 'Монастырь Гегард', 'Mosteiro de Geghard'],
    ['Garni Temple', 'Garni Tapınağı', 'Tempel von Garni', 'Templo de Garni', 'Храм Гарни', 'Templo de Garni'],
    ['Lake Sevan', 'Sevan Gölü', 'Sewansee', 'Lago Sevan', 'Озеро Севан', 'Lago Sevan'],
    ['Tatev Monastery', 'Tatev Manastırı', 'Kloster Tatew', 'Monasterio de Tatev', 'Монастырь Татев', 'Mosteiro de Tatev']
  ],
  KW: [
    ['Kuwait Towers', 'Kuveyt Kuleleri', 'Kuwait Towers', 'Torres de Kuwait', 'Кувейтские башни', 'Torres do Kuwait'],
    ['Grand Mosque of Kuwait', 'Kuveyt Büyük Camii', 'Große Moschee von Kuwait', 'Gran Mezquita de Kuwait', 'Большая мечеть Кувейта', 'Grande Mesquita do Kuwait'],
    ['Souq Al-Mubarakiya', 'Mübarekiye Çarşısı (Souq Al-Mubarakiya)', 'Souq Al-Mubarakiya', 'Zoco Al-Mubarakiya', 'Рынок Аль-Мубаракия', 'Souq Al-Mubarakiya'],
    ['Failaka Island', 'Feyleke Adası', 'Insel Failaka', 'Isla Failaka', 'Остров Файлака', 'Ilha Failaka']
  ],
  BH: [
    ["Qal'at al-Bahrain (Bahrain Fort)", 'Bahreyn Kalesi (Kal’at el-Bahreyn)', "Qal'at al-Bahrain (Bahrain-Fort)", "Qal'at al-Bahrain (Fuerte de Baréin)", 'Калат-аль-Бахрейн (Бахрейнский форт)', "Qal'at al-Bahrain (Forte do Barein)"],
    ['Al Fateh Grand Mosque', 'El Fatih Büyük Camii', 'Al-Fateh-Moschee', 'Gran Mezquita Al Fateh', 'Мечеть Аль-Фатих', 'Grande Mesquita Al Fateh'],
    ['Bab Al Bahrain', 'Bab el-Bahreyn', 'Bab Al Bahrain', 'Bab Al Bahrain', 'Баб-аль-Бахрейн', 'Bab Al Bahrain']
  ],
  KG: [
    ['Issyk-Kul Lake', 'Isık Göl', 'Yssykköl-See', 'Lago Issyk-Kul', 'Озеро Иссык-Куль', 'Lago Issyk-Kul'],
    ['Ala Archa National Park', 'Ala-Arça Milli Parkı', 'Nationalpark Ala-Artscha', 'Parque nacional Ala Archa', 'Национальный парк Ала-Арча', 'Parque Nacional Ala Archa'],
    ['Song-Kul Lake', 'Songköl Gölü', 'Songköl-See', 'Lago Song-Kul', 'Озеро Сон-Куль', 'Lago Song-Kul'],
    ['Burana Tower', 'Burana Kulesi', 'Burana-Turm', 'Torre de Burana', 'Башня Бурана', 'Torre de Burana']
  ],
  TJ: [
    ['Iskanderkul Lake', 'İskenderkul Gölü', 'Iskanderkul-See', 'Lago Iskanderkul', 'Озеро Искандеркуль', 'Lago Iskanderkul'],
    ['Pamir Highway', 'Pamir Yolu', 'Pamir Highway', 'Carretera del Pamir', 'Памирский тракт', 'Rodovia do Pamir'],
    ['Hisor Fortress', 'Hisar Kalesi', 'Festung Hissor', 'Fortaleza de Hisor', 'Гиссарская крепость', 'Fortaleza de Hisor']
  ],
  TM: [
    ['Darvaza Gas Crater', 'Derweze Gaz Krateri (Cehennem Kapısı)', 'Gaskrater von Derweze', 'Cráter de Darvaza', 'Газовый кратер Дарваза', 'Cratera de Darvaza'],
    ['Ancient Merv', 'Antik Merv', 'Antikes Merw', 'Antigua Merv', 'Древний Мерв', 'Antiga Merv'],
    ['Kunya-Urgench', 'Köneürgenç', 'Köneürgenç', 'Kunya-Urgench', 'Куня-Ургенч', 'Kunya-Urgench']
  ],
  MN: [
    ['Gorkhi-Terelj National Park', 'Gorkhi-Terelj Milli Parkı', 'Nationalpark Gorchi-Tereldsch', 'Parque nacional Gorkhi-Terelj', 'Национальный парк Горхи-Тэрэлж', 'Parque Nacional Gorkhi-Terelj'],
    ['Erdene Zuu Monastery', 'Erdene Zuu Manastırı', 'Kloster Erdene Dsuu', 'Monasterio de Erdene Zuu', 'Монастырь Эрдэни-Дзу', 'Mosteiro de Erdene Zuu'],
    ['Khongoryn Els (Gobi Desert)', 'Khongoryn Els Kumulları (Gobi Çölü)', 'Chongoryn Els (Wüste Gobi)', 'Dunas de Khongoryn Els (desierto de Gobi)', 'Барханы Хонгорын-Элс (пустыня Гоби)', 'Dunas de Khongoryn Els (deserto de Gobi)']
  ],
  BD: [
    ['Sundarbans', 'Sundarbans Mangrov Ormanları', 'Sundarbans', 'Sundarbans', 'Сундарбан', 'Sundarbans'],
    ["Cox's Bazar Beach", "Cox's Bazar Plajı", "Strand von Cox's Bazar", "Playa de Cox's Bazar", 'Пляж Кокс-Базар', "Praia de Cox's Bazar"],
    ['Ahsan Manzil', 'Ahsan Manzil Sarayı', 'Ahsan Manzil', 'Ahsan Manzil', 'Дворец Ахсан-Манзиль', 'Ahsan Manzil']
  ],
  MV: [
    ['Old Friday Mosque (Malé)', 'Eski Cuma Camii (Male)', 'Alte Freitagsmoschee (Malé)', 'Antigua Mezquita del Viernes (Malé)', 'Старая пятничная мечеть (Мале)', 'Antiga Mesquita da Sexta-feira (Malé)'],
    ['Baa Atoll Biosphere Reserve', 'Baa Atolü Biyosfer Rezervi', 'Biosphärenreservat Baa-Atoll', 'Reserva de la biosfera del atolón Baa', 'Биосферный заповедник атолла Баа', 'Reserva da Biosfera do Atol Baa'],
    ['South Ari Atoll', 'Güney Ari Atolü', 'Süd-Ari-Atoll', 'Atolón Ari Sur', 'Атолл Южный Ари', 'Atol Ari Sul']
  ],
  HK: [
    ['Victoria Peak', 'Victoria Zirvesi', 'Victoria Peak', 'Pico Victoria', 'Пик Виктория', 'Victoria Peak'],
    ['Tian Tan Buddha', 'Tian Tan Buda Heykeli', 'Tian-Tan-Buddha', 'Buda Tian Tan', 'Большой Будда Тяньтань', 'Buda Tian Tan'],
    ['Star Ferry', 'Star Ferry Vapuru', 'Star Ferry', 'Star Ferry', 'Паром Star Ferry', 'Star Ferry']
  ],
  MO: [
    ["Ruins of St. Paul's", "Aziz Paul Kilisesi Kalıntıları", 'Ruine der Pauluskirche', 'Ruinas de San Pablo', 'Руины собора Святого Павла', 'Ruínas de São Paulo'],
    ['Senado Square', 'Senado Meydanı', 'Senado-Platz', 'Plaza del Senado', 'Площадь Сенадо', 'Largo do Senado'],
    ['Macau Tower', 'Makao Kulesi', 'Macau Tower', 'Torre de Macao', 'Башня Макао', 'Torre de Macau']
  ],
  KH: [
    ['Angkor Wat', 'Angkor Vat', 'Angkor Wat', 'Angkor Wat', 'Ангкор-Ват', 'Angkor Wat'],
    ['Bayon Temple', 'Bayon Tapınağı', 'Bayon-Tempel', 'Templo de Bayón', 'Храм Байон', 'Templo de Bayon'],
    ['Royal Palace (Phnom Penh)', 'Kraliyet Sarayı (Phnom Penh)', 'Königspalast (Phnom Penh)', 'Palacio Real (Nom Pen)', 'Королевский дворец (Пномпень)', 'Palácio Real (Phnom Penh)']
  ],
  LA: [
    ['Luang Prabang Old Town', 'Luang Prabang Eski Şehir', 'Altstadt von Luang Prabang', 'Casco antiguo de Luang Prabang', 'Старый город Луангпхабанга', 'Centro histórico de Luang Prabang'],
    ['Kuang Si Falls', 'Kuang Si Şelalesi', 'Kuang-Si-Wasserfälle', 'Cataratas de Kuang Si', 'Водопад Куангси', 'Cachoeiras de Kuang Si'],
    ['Vang Vieng', 'Vang Vieng', 'Vang Vieng', 'Vang Vieng', 'Ванвьенг', 'Vang Vieng'],
    ['Plain of Jars', 'Küpler Ovası', 'Ebene der Tonkrüge', 'Llanura de las Jarras', 'Долина кувшинов', 'Planície dos Jarros']
  ],
  MM: [
    ['Bagan', 'Bagan Tapınakları', 'Bagan', 'Bagan', 'Баган', 'Bagan'],
    ['Shwedagon Pagoda', 'Shwedagon Pagodası', 'Shwedagon-Pagode', 'Pagoda de Shwedagon', 'Пагода Шведагон', 'Pagode de Shwedagon'],
    ['Inle Lake', 'İnle Gölü', 'Inle-See', 'Lago Inle', 'Озеро Инле', 'Lago Inle']
  ],
  MU: [
    ['Le Morne Brabant', 'Le Morne Brabant', 'Le Morne Brabant', 'Le Morne Brabant', 'Гора Ле-Морн-Брабан', 'Le Morne Brabant'],
    ['Chamarel Seven Coloured Earth', 'Chamarel Yedi Renkli Topraklar', 'Siebenfarbige Erde von Chamarel', 'Tierra de los Siete Colores de Chamarel', 'Семицветные земли Шамареля', 'Terra das Sete Cores de Chamarel'],
    ['Black River Gorges National Park', 'Black River Gorges Milli Parkı', 'Nationalpark Black River Gorges', 'Parque nacional Black River Gorges', 'Национальный парк Блэк-Ривер-Горджес', 'Parque Nacional Black River Gorges']
  ],
  SC: [
    ["Anse Source d'Argent", "Anse Source d'Argent Plajı", "Anse Source d'Argent", "Anse Source d'Argent", 'Пляж Анс-Сурс-д’Аржан', "Anse Source d'Argent"],
    ['Vallée de Mai', 'Vallée de Mai Doğa Rezervi', 'Vallée de Mai', 'Vallée de Mai', 'Валле-де-Мэ', 'Vallée de Mai'],
    ['Beau Vallon Beach', 'Beau Vallon Plajı', 'Strand Beau Vallon', 'Playa de Beau Vallon', 'Пляж Бо-Валлон', 'Praia de Beau Vallon']
  ],
  AD: [
    ['Madriu-Perafita-Claror Valley', 'Madriu-Perafita-Claror Vadisi', 'Madriu-Perafita-Claror-Tal', 'Valle del Madriu-Perafita-Claror', 'Долина Мадриу-Перафита-Кларор', 'Vale do Madriu-Perafita-Claror'],
    ['Caldea Spa', 'Caldea Termal Merkezi', 'Thermalbad Caldea', 'Balneario Caldea', 'Термальный комплекс Кальдеа', 'Spa Caldea'],
    ['Grandvalira Ski Area', 'Grandvalira Kayak Merkezi', 'Skigebiet Grandvalira', 'Estación de esquí Grandvalira', 'Горнолыжный курорт Грандвалира', 'Estação de esqui Grandvalira']
  ],
  LI: [
    ['Vaduz Castle', 'Vaduz Şatosu', 'Schloss Vaduz', 'Castillo de Vaduz', 'Замок Вадуц', 'Castelo de Vaduz'],
    ['Kunstmuseum Liechtenstein', 'Lihtenştayn Sanat Müzesi', 'Kunstmuseum Liechtenstein', 'Museo de Arte de Liechtenstein', 'Художественный музей Лихтенштейна', 'Museu de Arte de Liechtenstein'],
    ['Malbun', 'Malbun Kayak Köyü', 'Malbun', 'Malbun', 'Мальбун', 'Malbun']
  ],
  MC: [
    ['Monte Carlo Casino', 'Monte Carlo Kumarhanesi', 'Casino von Monte-Carlo', 'Casino de Montecarlo', 'Казино Монте-Карло', 'Cassino de Monte Carlo'],
    ["Prince's Palace of Monaco", 'Monako Prens Sarayı', 'Fürstenpalast von Monaco', 'Palacio del Príncipe de Mónaco', 'Княжеский дворец Монако', 'Palácio do Príncipe de Mônaco'],
    ['Oceanographic Museum', 'Oşinografi Müzesi', 'Ozeanographisches Museum', 'Museo Oceanográfico', 'Океанографический музей', 'Museu Oceanográfico']
  ],
  SM: [
    ['Guaita Tower', 'Guaita Kulesi', 'Guaita-Turm', 'Torre Guaita', 'Башня Гуаита', 'Torre Guaita'],
    ['Palazzo Pubblico', 'Palazzo Pubblico (Hükümet Sarayı)', 'Palazzo Pubblico', 'Palazzo Pubblico', 'Палаццо Пубблико', 'Palazzo Pubblico'],
    ['Mount Titano', 'Titano Dağı', 'Monte Titano', 'Monte Titano', 'Гора Титано', 'Monte Titano']
  ],
  VA: [
    ["St. Peter's Basilica", 'Aziz Petrus Bazilikası', 'Petersdom', 'Basílica de San Pedro', 'Собор Святого Петра', 'Basílica de São Pedro'],
    ['Sistine Chapel', 'Sistina Şapeli', 'Sixtinische Kapelle', 'Capilla Sixtina', 'Сикстинская капелла', 'Capela Sistina'],
    ['Vatican Museums', 'Vatikan Müzeleri', 'Vatikanische Museen', 'Museos Vaticanos', 'Музеи Ватикана', 'Museus Vaticanos']
  ],
  AF: [
    ['Band-e Amir', 'Band-ı Emir Gölleri', 'Band-e Amir', 'Band-e Amir', 'Банде-Амир', 'Band-e Amir'],
    ['Minaret of Jam', 'Cam Minaresi', 'Minarett von Dscham', 'Minarete de Jam', 'Минарет Джам', 'Minarete de Jam'],
    ['Bamiyan Valley', 'Bamyan Vadisi', 'Tal von Bamiyan', 'Valle de Bāmiyān', 'Бамианская долина', 'Vale de Bamiyan']
  ],
  BN: [
    ['Omar Ali Saifuddien Mosque', 'Sultan Ömer Ali Seyfeddin Camii', 'Omar-Ali-Saifuddin-Moschee', 'Mezquita Omar Ali Saifuddien', 'Мечеть Омара Али Сайфуддина', 'Mesquita Omar Ali Saifuddien'],
    ['Kampong Ayer', 'Kampong Ayer Su Köyü', 'Kampong Ayer', 'Kampong Ayer', 'Кампонг-Айер', 'Kampong Ayer'],
    ['Ulu Temburong National Park', 'Ulu Temburong Milli Parkı', 'Nationalpark Ulu Temburong', 'Parque nacional Ulu Temburong', 'Национальный парк Улу-Тембуронг', 'Parque Nacional Ulu Temburong']
  ],
  BT: [
    ["Paro Taktsang (Tiger's Nest)", 'Paro Taktsang (Kaplan Yuvası Manastırı)', 'Paro Taktsang (Tigernest)', 'Paro Taktsang (Nido del Tigre)', 'Такцанг-лакханг (Гнездо тигрицы)', 'Paro Taktsang (Ninho do Tigre)'],
    ['Punakha Dzong', 'Punakha Dzong', 'Punakha Dzong', 'Punakha Dzong', 'Пунакха-дзонг', 'Punakha Dzong'],
    ['Dochula Pass', 'Dochula Geçidi', 'Dochula-Pass', 'Paso de Dochula', 'Перевал Дочула', 'Passo de Dochula']
  ],
  KP: [
    ['Kim Il Sung Square', 'Kim İl-sung Meydanı', 'Kim-Il-sung-Platz', 'Plaza Kim Il-sung', 'Площадь Ким Ир Сена', 'Praça Kim Il-sung'],
    ['Juche Tower', 'Juche Kulesi', 'Juche-Turm', 'Torre Juche', 'Монумент идей чучхе', 'Torre Juche'],
    ['Panmunjom (DMZ)', 'Panmunjom (Askerden Arındırılmış Bölge)', 'Panmunjeom (DMZ)', 'Panmunjom (zona desmilitarizada)', 'Пханмунджом (ДМЗ)', 'Panmunjom (zona desmilitarizada)']
  ],
  TL: [
    ['Cristo Rei of Dili', 'Dili Cristo Rei Heykeli', 'Cristo Rei von Dili', 'Cristo Rei de Dili', 'Статуя Кришту-Рей (Дили)', 'Cristo Rei de Díli'],
    ['Atauro Island', 'Atauro Adası', 'Insel Atauro', 'Isla de Atauro', 'Остров Атауро', 'Ilha de Ataúro'],
    ['Jaco Island', 'Jaco Adası', 'Insel Jaco', 'Isla de Jaco', 'Остров Жаку', 'Ilha de Jaco']
  ],
  IQ: [
    ['Erbil Citadel', 'Erbil Kalesi', 'Zitadelle von Erbil', 'Ciudadela de Erbil', 'Цитадель Эрбиля', 'Cidadela de Erbil'],
    ['Babylon', 'Babil', 'Babylon', 'Babilonia', 'Вавилон', 'Babilônia'],
    ['Mesopotamian Marshes', 'Mezopotamya Bataklıkları', 'Mesopotamische Sümpfe', 'Marismas de Mesopotamia', 'Месопотамские болота (Эль-Ахвар)', 'Pântanos da Mesopotâmia']
  ],
  PS: [
    ['Church of the Nativity (Bethlehem)', 'Doğuş Kilisesi (Beytüllahim)', 'Geburtskirche (Bethlehem)', 'Basílica de la Natividad (Belén)', 'Базилика Рождества Христова (Вифлеем)', 'Basílica da Natividade (Belém)'],
    ['Tell es-Sultan (Jericho)', 'Tell es-Sultan (Eriha)', 'Tell es-Sultan (Jericho)', 'Tell es-Sultan (Jericó)', 'Телль-эс-Султан (Иерихон)', 'Tell es-Sultan (Jericó)'],
    ['Hebron Old City', 'El Halil Eski Şehri', 'Altstadt von Hebron', 'Ciudad vieja de Hebrón', 'Старый город Хеврона', 'Cidade Velha de Hebron']
  ],
  SY: [
    ['Umayyad Mosque', 'Emevi Camii', 'Umayyaden-Moschee', 'Mezquita de los Omeyas', 'Мечеть Омейядов', 'Mesquita dos Omíadas'],
    ['Krak des Chevaliers', 'Şövalyeler Kalesi (Krak des Chevaliers)', 'Krak des Chevaliers', 'Krak de los Caballeros', 'Крак-де-Шевалье', 'Krak dos Cavaleiros'],
    ['Palmyra', 'Palmira', 'Palmyra', 'Palmira', 'Пальмира', 'Palmira']
  ],
  YE: [
    ['Socotra Island', 'Sokotra Adası', 'Insel Sokotra', 'Isla de Socotra', 'Остров Сокотра', 'Ilha de Socotra'],
    ["Old City of Sana'a", 'Sana Eski Şehri', "Altstadt von Sana'a", 'Ciudad vieja de Saná', 'Старый город Саны', 'Cidade Velha de Sanaa'],
    ['Shibam Hadramawt', 'Şibam (Hadramut)', 'Schibam (Hadramaut)', 'Shibam (Hadramaut)', 'Шибам (Хадрамаут)', 'Shibam (Hadramaute)']
  ],
  AO: [
    ['Kalandula Falls', 'Kalandula Şelalesi', 'Kalandula-Wasserfälle', 'Cataratas de Kalandula', 'Водопад Каландула', 'Quedas de Kalandula'],
    ['Fortress of São Miguel (Luanda)', 'São Miguel Kalesi (Luanda)', 'Festung São Miguel (Luanda)', 'Fortaleza de San Miguel (Luanda)', 'Крепость Сан-Мигел (Луанда)', 'Fortaleza de São Miguel (Luanda)'],
    ['Tundavala Gap', 'Tundavala Uçurumu', 'Tundavala-Schlucht', 'Fisura de Tundavala', 'Ущелье Тундавала', 'Fenda da Tundavala']
  ],
  BF: [
    ['Sindou Peaks', 'Sindou Kayalıkları', 'Pics de Sindou', 'Picos de Sindou', 'Скалы Синду', 'Picos de Sindou'],
    ['Ruins of Loropéni', 'Loropéni Harabeleri', 'Ruinen von Loropéni', 'Ruinas de Loropéni', 'Руины Лоропени', 'Ruínas de Loropéni'],
    ['Karfiguéla Waterfalls', 'Karfiguéla Şelaleleri', 'Wasserfälle von Karfiguéla', 'Cascadas de Karfiguéla', 'Водопады Карфигела', 'Cachoeiras de Karfiguéla']
  ],
  BI: [
    ['Lake Tanganyika', 'Tanganika Gölü', 'Tanganjikasee', 'Lago Tanganica', 'Озеро Танганьика', 'Lago Tanganica'],
    ['Kibira National Park', 'Kibira Milli Parkı', 'Kibira-Nationalpark', 'Parque nacional de Kibira', 'Национальный парк Кибира', 'Parque Nacional de Kibira'],
    ['Karera Falls', 'Karera Şelaleleri', 'Karera-Wasserfälle', 'Cataratas de Karera', 'Водопады Карера', 'Cachoeiras de Karera']
  ],
  BJ: [
    ['Ganvié Stilt Village', 'Ganvié Kazıklı Su Köyü', 'Pfahldorf Ganvié', 'Aldea lacustre de Ganvié', 'Деревня на сваях Ганвье', 'Vila lacustre de Ganvié'],
    ['Royal Palaces of Abomey', 'Abomey Kraliyet Sarayları', 'Königspaläste von Abomey', 'Palacios reales de Abomey', 'Королевские дворцы Абомея', 'Palácios Reais de Abomé'],
    ['Pendjari National Park', 'Pendjari Milli Parkı', 'Pendjari-Nationalpark', 'Parque nacional de Pendjari', 'Национальный парк Пенджари', 'Parque Nacional de Pendjari'],
    ['Door of No Return (Ouidah)', 'Dönüşü Olmayan Kapı (Ouidah)', 'Tor ohne Wiederkehr (Ouidah)', 'Puerta del No Retorno (Ouidah)', 'Врата невозвращения (Уида)', 'Porta do Não Retorno (Uidá)']
  ],
  CD: [
    ['Virunga National Park', 'Virunga Milli Parkı', 'Virunga-Nationalpark', 'Parque nacional de Virunga', 'Национальный парк Вирунга', 'Parque Nacional de Virunga'],
    ['Nyiragongo Volcano', 'Nyiragongo Yanardağı', 'Vulkan Nyiragongo', 'Volcán Nyiragongo', 'Вулкан Ньирагонго', 'Vulcão Nyiragongo'],
    ['Kahuzi-Biega National Park', 'Kahuzi-Biéga Milli Parkı', 'Nationalpark Kahuzi-Biéga', 'Parque nacional de Kahuzi-Biega', 'Национальный парк Кахузи-Биега', 'Parque Nacional de Kahuzi-Biega']
  ],
  CF: [
    ['Dzanga-Sangha Reserve', 'Dzanga-Sangha Rezervi', 'Reservat Dzanga-Sangha', 'Reserva de Dzanga-Sangha', 'Заповедник Дзанга-Сангха', 'Reserva de Dzanga-Sangha'],
    ['Boali Falls', 'Boali Şelaleleri', 'Boali-Wasserfälle', 'Cataratas de Boali', 'Водопады Боали', 'Cachoeiras de Boali'],
    ['Manovo-Gounda St. Floris National Park', 'Manovo-Gounda St. Floris Milli Parkı', 'Nationalpark Manovo-Gounda St. Floris', 'Parque nacional Manovo-Gounda St. Floris', 'Национальный парк Маново-Гоунда-Сен-Флорис', 'Parque Nacional Manovo-Gounda St. Floris']
  ],
  CG: [
    ['Odzala-Kokoua National Park', 'Odzala-Kokoua Milli Parkı', 'Nationalpark Odzala-Kokoua', 'Parque nacional Odzala-Kokoua', 'Национальный парк Одзала-Кокуа', 'Parque Nacional Odzala-Kokoua'],
    ['Diosso Gorge', 'Diosso Kanyonu', 'Schlucht von Diosso', 'Garganta de Diosso', 'Ущелье Диоссо', 'Garganta de Diosso'],
    ['Basilica of Sainte-Anne (Brazzaville)', 'Sainte-Anne Bazilikası (Brazzaville)', 'Basilika Sainte-Anne (Brazzaville)', 'Basílica de Santa Ana (Brazzaville)', 'Базилика Святой Анны (Браззавиль)', 'Basílica de Santa Ana (Brazzaville)']
  ],
  CI: [
    ['Basilica of Our Lady of Peace', 'Barış Meryem Ana Bazilikası', 'Basilika Notre-Dame de la Paix', 'Basílica de Nuestra Señora de la Paz', 'Базилика Нотр-Дам-де-ла-Пэ', 'Basílica de Nossa Senhora da Paz'],
    ['Grand-Bassam Historic Town', 'Grand-Bassam Tarihi Kenti', 'Historische Stadt Grand-Bassam', 'Ciudad histórica de Grand-Bassam', 'Исторический город Гран-Басам', 'Cidade histórica de Grand-Bassam'],
    ['Taï National Park', 'Taï Milli Parkı', 'Nationalpark Taï', 'Parque nacional de Taï', 'Национальный парк Таи', 'Parque Nacional de Taï']
  ],
  CM: [
    ['Rhumsiki', 'Rhumsiki Kayalıkları', 'Rhumsiki', 'Rhumsiki', 'Румсики', 'Rhumsiki'],
    ['Mount Cameroon', 'Kamerun Dağı', 'Kamerunberg', 'Monte Camerún', 'Гора Камерун', 'Monte Camarões'],
    ['Lobé Falls (Kribi)', 'Lobé Şelaleleri (Kribi)', 'Lobé-Wasserfälle (Kribi)', 'Cataratas de Lobé (Kribi)', 'Водопады Лобе (Криби)', 'Cachoeiras de Lobé (Kribi)']
  ],
  CV: [
    ['Santa Maria Beach (Sal)', 'Santa Maria Plajı (Sal Adası)', 'Strand von Santa Maria (Sal)', 'Playa de Santa María (Sal)', 'Пляж Санта-Мария (остров Сал)', 'Praia de Santa Maria (Sal)'],
    ['Cidade Velha', 'Cidade Velha', 'Cidade Velha', 'Cidade Velha', 'Сидади-Велья', 'Cidade Velha'],
    ['Fogo Volcano', 'Fogo Yanardağı', 'Vulkan Fogo', 'Volcán del Fogo', 'Вулкан Фогу', 'Vulcão do Fogo']
  ],
  DJ: [
    ['Lake Assal', 'Asal Gölü', 'Assalsee', 'Lago Assal', 'Озеро Ассаль', 'Lago Assal'],
    ['Lake Abbé', 'Abbe Gölü', 'Abbe-See', 'Lago Abbe', 'Озеро Аббе', 'Lago Abbe'],
    ['Moucha Island', 'Muşa Adası', 'Insel Moucha', 'Isla Moucha', 'Остров Муша', 'Ilha Moucha']
  ],
  ER: [
    ['Asmara Modernist City', 'Asmara Modernist Kent', 'Modernistische Stadt Asmara', 'Ciudad modernista de Asmara', 'Модернистский город Асмэра', 'Cidade modernista de Asmara'],
    ['Massawa Old Town', 'Massava Eski Şehir', 'Altstadt von Massaua', 'Casco antiguo de Massawa', 'Старый город Массауа', 'Centro histórico de Massawa'],
    ['Dahlak Archipelago', 'Dahlak Takımadaları', 'Dahlak-Archipel', 'Archipiélago Dahlak', 'Архипелаг Дахлак', 'Arquipélago Dahlak']
  ],
  GA: [
    ['Loango National Park', 'Loango Milli Parkı', 'Loango-Nationalpark', 'Parque nacional de Loango', 'Национальный парк Лоанго', 'Parque Nacional de Loango'],
    ['Lopé National Park', 'Lopé Milli Parkı', 'Nationalpark Lopé', 'Parque nacional de Lopé', 'Национальный парк Лопе', 'Parque Nacional de Lopé'],
    ['Pongara National Park', 'Pongara Milli Parkı', 'Nationalpark Pongara', 'Parque nacional de Pongara', 'Национальный парк Понгара', 'Parque Nacional de Pongara']
  ],
  GM: [
    ['Gambia River', 'Gambiya Nehri', 'Gambia-Fluss', 'Río Gambia', 'Река Гамбия', 'Rio Gâmbia'],
    ['Kunta Kinteh Island', 'Kunta Kinteh Adası', 'Kunta-Kinteh-Insel', 'Isla Kunta Kinteh', 'Остров Кунта-Кинте', 'Ilha Kunta Kinteh'],
    ['Abuko Nature Reserve', 'Abuko Doğa Rezervi', 'Naturschutzgebiet Abuko', 'Reserva natural de Abuko', 'Заповедник Абуко', 'Reserva Natural de Abuko']
  ],
  GN: [
    ['Fouta Djallon', 'Futa Calon Yaylası', 'Fouta Djallon', 'Futa Yallon', 'Плато Фута-Джаллон', 'Fouta Djallon'],
    ['Îles de Los', 'Los Adaları', 'Îles de Los', 'Islas de Los', 'Острова Лос', 'Ilhas de Los'],
    ['Mount Nimba', 'Nimba Dağı', 'Nimbaberge', 'Monte Nimba', 'Гора Нимба', 'Monte Nimba']
  ],
  GQ: [
    ['Malabo Cathedral', 'Malabo Katedrali', 'Kathedrale von Malabo', 'Catedral de Malabo', 'Кафедральный собор Малабо', 'Catedral de Malabo'],
    ['Monte Alén National Park', 'Monte Alén Milli Parkı', 'Nationalpark Monte Alén', 'Parque nacional de Monte Alén', 'Национальный парк Монте-Ален', 'Parque Nacional de Monte Alén'],
    ['Bioko Island', 'Bioko Adası', 'Insel Bioko', 'Isla de Bioko', 'Остров Биоко', 'Ilha de Bioko']
  ],
  GW: [
    ['Bijagós Archipelago', 'Bijagós Takımadaları', 'Bissagos-Inseln', 'Archipiélago de las Bijagós', 'Архипелаг Бижагош', 'Arquipélago dos Bijagós'],
    ['Bissau Velho', 'Bissau Velho (Eski Bissau)', 'Bissau Velho (Altstadt)', 'Bissau Velho', 'Старый Бисау', 'Bissau Velho'],
    ['Orango Islands National Park', 'Orango Adaları Milli Parkı', 'Nationalpark Orango-Inseln', 'Parque nacional de las islas Orango', 'Национальный парк островов Оранго', 'Parque Nacional das Ilhas de Orango']
  ],
  KM: [
    ['Mount Karthala', 'Karthala Yanardağı', 'Karthala', 'Monte Karthala', 'Вулкан Картала', 'Monte Karthala'],
    ['Moroni Old Medina', 'Moroni Eski Medinesi', 'Altstadt (Medina) von Moroni', 'Medina antigua de Moroni', 'Старая медина Морони', 'Medina antiga de Moroni'],
    ['Mohéli Marine Park', 'Mohéli Deniz Parkı', 'Meerespark Mohéli', 'Parque marino de Mohéli', 'Морской парк Мохели', 'Parque Marinho de Mohéli']
  ],
  LR: [
    ['Robertsport', 'Robertsport Plajları', 'Robertsport', 'Robertsport', 'Робертспорт', 'Robertsport'],
    ['Sapo National Park', 'Sapo Milli Parkı', 'Sapo-Nationalpark', 'Parque nacional de Sapo', 'Национальный парк Сапо', 'Parque Nacional de Sapo'],
    ['Providence Island', 'Providence Adası', 'Providence Island', 'Isla Providence', 'Остров Провиденс', 'Ilha Providence']
  ],
  LS: [
    ['Maletsunyane Falls', 'Maletsunyane Şelalesi', 'Maletsunyane-Fälle', 'Cataratas de Maletsunyane', 'Водопад Малецуньяне', 'Cachoeiras de Maletsunyane'],
    ['Sani Pass', 'Sani Geçidi', 'Sani-Pass', 'Paso Sani', 'Перевал Сани', 'Passo Sani'],
    ['Thaba Bosiu', 'Thaba Bosiu Platosu', 'Thaba Bosiu', 'Thaba Bosiu', 'Таба-Босиу', 'Thaba Bosiu'],
    ['Katse Dam', 'Katse Barajı', 'Katse-Damm', 'Presa de Katse', 'Плотина Катсе', 'Barragem de Katse']
  ],
  LY: [
    ['Leptis Magna', 'Leptis Magna', 'Leptis Magna', 'Leptis Magna', 'Лептис-Магна', 'Léptis Magna'],
    ['Sabratha', 'Sabrata', 'Sabratha', 'Sabratha', 'Сабрата', 'Sabratha'],
    ['Ghadames Old Town', 'Gadames Eski Şehri', 'Altstadt von Ghadames', 'Ciudad vieja de Gadamés', 'Старый город Гадамес', 'Cidade Velha de Ghadames']
  ],
  MG: [
    ['Avenue of the Baobabs', 'Baobab Caddesi', 'Allee der Baobabs', 'Avenida de los Baobabs', 'Аллея баобабов', 'Avenida dos Baobás'],
    ['Tsingy de Bemaraha', 'Tsingy de Bemaraha', 'Tsingy de Bemaraha', 'Tsingy de Bemaraha', 'Цинжи-дю-Бемараха', 'Tsingy de Bemaraha'],
    ['Nosy Be', 'Nosy Be Adası', 'Nosy Be', 'Nosy Be', 'Остров Нуси-Бе', 'Nosy Be'],
    ['Andasibe-Mantadia National Park', 'Andasibe-Mantadia Milli Parkı', 'Nationalpark Andasibe-Mantadia', 'Parque nacional Andasibe-Mantadia', 'Национальный парк Андасибе-Мантадия', 'Parque Nacional Andasibe-Mantadia']
  ],
  ML: [
    ['Great Mosque of Djenné', 'Cenne Büyük Camii', 'Große Moschee von Djenné', 'Gran Mezquita de Djenné', 'Великая мечеть Дженне', 'Grande Mesquita de Djenné'],
    ['Timbuktu', 'Timbuktu', 'Timbuktu', 'Tombuctú', 'Тимбукту', 'Tombuctu'],
    ['Bandiagara Escarpment (Dogon Country)', 'Bandiagara Kayalıkları (Dogon Ülkesi)', 'Falaise de Bandiagara (Land der Dogon)', 'Acantilados de Bandiagara (País Dogón)', 'Уступ Бандиагара (Страна догонов)', 'Falésias de Bandiagara (País Dogon)']
  ],
  MR: [
    ['Chinguetti', 'Şinkit', 'Chinguetti', 'Chinguetti', 'Шингетти', 'Chinguetti'],
    ["Banc d'Arguin National Park", "Banc d'Arguin Milli Parkı", "Nationalpark Banc d'Arguin", "Parque nacional del Banc d'Arguin", 'Национальный парк Банк-д’Арген', "Parque Nacional do Banc d'Arguin"],
    ['Ouadane', 'Vadan', 'Ouadane', 'Uadane', 'Уадан', 'Ouadane'],
    ['Terjit Oasis', 'Terjit Vahası', 'Oase Terjit', 'Oasis de Terjit', 'Оазис Терджит', 'Oásis de Terjit']
  ],
  MW: [
    ['Lake Malawi (Cape Maclear)', 'Malavi Gölü (Cape Maclear)', 'Malawisee (Cape Maclear)', 'Lago Malaui (Cape Maclear)', 'Озеро Малави (Кейп-Маклир)', 'Lago Malawi (Cape Maclear)'],
    ['Liwonde National Park', 'Liwonde Milli Parkı', 'Liwonde-Nationalpark', 'Parque nacional de Liwonde', 'Национальный парк Ливонде', 'Parque Nacional de Liwonde'],
    ['Mount Mulanje', 'Mulanje Dağı', 'Mulanje-Massiv', 'Monte Mulanje', 'Гора Муланье', 'Monte Mulanje']
  ],
  MZ: [
    ['Bazaruto Archipelago', 'Bazaruto Takımadaları', 'Bazaruto-Archipel', 'Archipiélago de Bazaruto', 'Архипелаг Базаруто', 'Arquipélago de Bazaruto'],
    ['Island of Mozambique', 'Mozambik Adası', 'Ilha de Moçambique', 'Isla de Mozambique', 'Остров Мозамбик', 'Ilha de Moçambique'],
    ['Tofo Beach', 'Tofo Plajı', 'Strand von Tofo', 'Playa de Tofo', 'Пляж Тофо', 'Praia do Tofo']
  ],
  NA: [
    ['Sossusvlei', 'Sossusvlei Kumulları', 'Sossusvlei', 'Sossusvlei', 'Соссусфлей', 'Sossusvlei'],
    ['Etosha National Park', 'Etosha Milli Parkı', 'Etosha-Nationalpark', 'Parque nacional de Etosha', 'Национальный парк Этоша', 'Parque Nacional de Etosha'],
    ['Skeleton Coast', 'İskelet Sahili', 'Skelettküste', 'Costa de los Esqueletos', 'Берег Скелетов', 'Costa dos Esqueletos'],
    ['Fish River Canyon', 'Fish River Kanyonu', 'Fischfluss-Canyon', 'Cañón del río Fish', 'Каньон Фиш-Ривер', 'Cânion do rio Fish']
  ],
  NE: [
    ['Agadez Old Town', 'Agadez Eski Şehri', 'Altstadt von Agadez', 'Casco antiguo de Agadez', 'Старый город Агадеса', 'Centro histórico de Agadez'],
    ['Aïr Mountains', 'Aïr Dağları', 'Aïr-Gebirge', 'Montes Aïr', 'Нагорье Аир', 'Montes Aïr'],
    ['W National Park', 'W Milli Parkı', 'Nationalpark W', 'Parque nacional W', 'Национальный парк Дубль-Ве', 'Parque Nacional W']
  ],
  RW: [
    ['Volcanoes National Park', 'Volkanlar Milli Parkı', 'Vulkan-Nationalpark', 'Parque nacional de los Volcanes', 'Национальный парк Вулканов', 'Parque Nacional dos Vulcões'],
    ['Lake Kivu', 'Kivu Gölü', 'Kiwusee', 'Lago Kivu', 'Озеро Киву', 'Lago Kivu'],
    ['Nyungwe Forest', 'Nyungwe Ormanı', 'Nyungwe-Wald', 'Bosque de Nyungwe', 'Лес Ньюнгве', 'Floresta de Nyungwe'],
    ['Kigali Genocide Memorial', 'Kigali Soykırım Anıtı', 'Völkermord-Gedenkstätte Kigali', 'Memorial del Genocidio de Kigali', 'Мемориал геноцида в Кигали', 'Memorial do Genocídio de Kigali']
  ],
  SD: [
    ['Meroë Pyramids', 'Meroe Piramitleri', 'Pyramiden von Meroe', 'Pirámides de Meroe', 'Пирамиды Мероэ', 'Pirâmides de Meroé'],
    ['Jebel Barkal', 'Cebel Barkal', 'Gebel Barkal', 'Jebel Barkal', 'Гора Джебель-Баркал', 'Jebel Barkal'],
    ['Suakin', 'Sevakin', 'Suakin', 'Suakin', 'Суакин', 'Suakin']
  ],
  SL: [
    ['River No. 2 Beach', 'River No. 2 Plajı', 'Strand River No. 2', 'Playa River No. 2', 'Пляж Ривер-Намбер-Ту', 'Praia River No. 2'],
    ['Tiwai Island', 'Tiwai Adası', 'Insel Tiwai', 'Isla Tiwai', 'Остров Тиваи', 'Ilha Tiwai'],
    ['Banana Islands', 'Muz Adaları (Banana Islands)', 'Banana Islands', 'Islas Banana', 'Банановые острова', 'Ilhas Banana']
  ],
  SO: [
    ['Laas Geel', 'Laas Geel Mağara Resimleri', 'Laas Geel', 'Laas Geel', 'Лаас-Гааль', 'Laas Geel'],
    ['Lido Beach (Mogadishu)', 'Lido Plajı (Mogadişu)', 'Lido-Strand (Mogadischu)', 'Playa Lido (Mogadiscio)', 'Пляж Лидо (Могадишо)', 'Praia Lido (Mogadíscio)'],
    ['Berbera', 'Berbera', 'Berbera', 'Berbera', 'Бербера', 'Berbera']
  ],
  SS: [
    ['White Nile (Juba)', 'Beyaz Nil (Cuba)', 'Weißer Nil (Juba)', 'Nilo Blanco (Yuba)', 'Белый Нил (Джуба)', 'Nilo Branco (Juba)'],
    ['Boma National Park', 'Boma Milli Parkı', 'Boma-Nationalpark', 'Parque nacional de Boma', 'Национальный парк Бома', 'Parque Nacional de Boma'],
    ['Imatong Mountains', 'İmatong Dağları', 'Imatong-Berge', 'Montes Imatong', 'Горы Иматонг', 'Montes Imatong']
  ],
  ST: [
    ['Pico Cão Grande', 'Pico Cão Grande', 'Pico Cão Grande', 'Pico Cão Grande', 'Пику-Кан-Гранди', 'Pico Cão Grande'],
    ['Obô Natural Park', 'Obô Doğal Parkı', 'Naturpark Obô', 'Parque natural Obô', 'Природный парк Обо', 'Parque Natural Obô'],
    ['Ilhéu das Rolas', 'Rolas Adacığı', 'Ilhéu das Rolas', 'Islote de las Rolas', 'Остров Ролаш', 'Ilhéu das Rolas']
  ],
  SZ: [
    ['Mantenga Falls & Cultural Village', 'Mantenga Şelalesi ve Kültür Köyü', 'Mantenga-Wasserfall & Kulturdorf', 'Cascada y aldea cultural de Mantenga', 'Водопад и культурная деревня Мантенга', 'Cachoeira e vila cultural de Mantenga'],
    ['Hlane Royal National Park', 'Hlane Kraliyet Milli Parkı', 'Hlane Royal National Park', 'Parque nacional real de Hlane', 'Королевский национальный парк Хлане', 'Parque Nacional Real de Hlane'],
    ['Mlilwane Wildlife Sanctuary', 'Mlilwane Yaban Hayatı Koruma Alanı', 'Mlilwane-Wildschutzgebiet', 'Santuario de vida silvestre de Mlilwane', 'Заповедник Млилване', 'Santuário de Vida Selvagem de Mlilwane']
  ],
  TD: [
    ['Ennedi Plateau', 'Ennedi Platosu', 'Ennedi-Plateau', 'Meseta de Ennedi', 'Плато Эннеди', 'Planalto de Ennedi'],
    ['Zakouma National Park', 'Zakouma Milli Parkı', 'Zakouma-Nationalpark', 'Parque nacional de Zakouma', 'Национальный парк Закума', 'Parque Nacional de Zakouma'],
    ['Tibesti Mountains', 'Tibesti Dağları', 'Tibesti-Gebirge', 'Macizo del Tibesti', 'Нагорье Тибести', 'Maciço do Tibesti']
  ],
  TG: [
    ['Koutammakou', 'Koutammakou (Batammariba Ülkesi)', 'Koutammakou', 'Koutammakou', 'Кутаммаку', 'Koutammakou'],
    ['Lomé Grand Market', 'Lomé Büyük Çarşısı', 'Großer Markt von Lomé', 'Gran Mercado de Lomé', 'Большой рынок Ломе', 'Grande Mercado de Lomé'],
    ['Kpalimé & Mount Agou', 'Kpalimé ve Agou Dağı', 'Kpalimé & Mont Agou', 'Kpalimé y monte Agou', 'Кпалиме и гора Агу', 'Kpalimé e monte Agou']
  ],
  UG: [
    ['Bwindi Impenetrable Forest', 'Bwindi Geçilmez Ormanı', 'Bwindi Impenetrable Forest', 'Bosque impenetrable de Bwindi', 'Непроходимый лес Бвинди', 'Floresta Impenetrável de Bwindi'],
    ['Murchison Falls', 'Murchison Şelaleleri', 'Murchison-Fälle', 'Cataratas Murchison', 'Водопад Мерчисон', 'Cataratas Murchison'],
    ['Queen Elizabeth National Park', 'Kraliçe Elizabeth Milli Parkı', 'Queen-Elizabeth-Nationalpark', 'Parque nacional Reina Isabel', 'Национальный парк Королевы Елизаветы', 'Parque Nacional Rainha Elizabeth'],
    ['Source of the Nile (Jinja)', 'Nil’in Kaynağı (Jinja)', 'Quelle des Nils (Jinja)', 'Nacimiento del Nilo (Jinja)', 'Исток Нила (Джинджа)', 'Nascente do Nilo (Jinja)']
  ],
  ZM: [
    ['Victoria Falls', 'Victoria Şelalesi', 'Victoriafälle', 'Cataratas Victoria', 'Водопад Виктория', 'Cataratas Vitória'],
    ['South Luangwa National Park', 'Güney Luangwa Milli Parkı', 'South-Luangwa-Nationalpark', 'Parque nacional de Luangwa del Sur', 'Национальный парк Южная Луангва', 'Parque Nacional de South Luangwa'],
    ['Lower Zambezi National Park', 'Aşağı Zambezi Milli Parkı', 'Lower-Zambezi-Nationalpark', 'Parque nacional del Bajo Zambeze', 'Национальный парк Нижнее Замбези', 'Parque Nacional do Baixo Zambeze']
  ],
  ZW: [
    ['Victoria Falls', 'Victoria Şelalesi', 'Victoriafälle', 'Cataratas Victoria', 'Водопад Виктория', 'Cataratas Vitória'],
    ['Great Zimbabwe', 'Büyük Zimbabve Harabeleri', 'Great Zimbabwe', 'Gran Zimbabue', 'Большой Зимбабве', 'Grande Zimbábue'],
    ['Hwange National Park', 'Hwange Milli Parkı', 'Hwange-Nationalpark', 'Parque nacional de Hwange', 'Национальный парк Хванге', 'Parque Nacional de Hwange'],
    ['Mana Pools', 'Mana Pools Milli Parkı', 'Mana Pools', 'Mana Pools', 'Национальный парк Мана-Пулс', 'Mana Pools']
  ],
  AG: [
    ["Nelson's Dockyard", 'Nelson Tersanesi', "Nelson's Dockyard", 'Astillero de Nelson', 'Верфь Нельсона', 'Estaleiro de Nelson'],
    ['Shirley Heights', 'Shirley Heights Seyir Noktası', 'Shirley Heights', 'Shirley Heights', 'Ширли-Хайтс', 'Shirley Heights'],
    ['Half Moon Bay', 'Half Moon Koyu', 'Half Moon Bay', 'Bahía Half Moon', 'Бухта Хаф-Мун', 'Baía Half Moon']
  ],
  BS: [
    ['Exuma Cays', 'Exuma Adacıkları', 'Exuma Cays', 'Cayos de Exuma', 'Острова Эксума', 'Exuma Cays'],
    ['Pink Sands Beach (Harbour Island)', 'Pembe Kumlu Plaj (Harbour Island)', 'Pink Sands Beach (Harbour Island)', 'Playa Pink Sands (Harbour Island)', 'Пляж Пинк-Сэндс (Харбор-Айленд)', 'Praia Pink Sands (Harbour Island)'],
    ['Paradise Island', 'Paradise Adası', 'Paradise Island', 'Isla Paraíso', 'Остров Парадайс', 'Paradise Island']
  ],
  BZ: [
    ['Great Blue Hole', 'Büyük Mavi Çukur', 'Great Blue Hole', 'Gran Agujero Azul', 'Большая голубая дыра', 'Grande Buraco Azul'],
    ['Ambergris Caye', 'Ambergris Caye Adası', 'Ambergris Caye', 'Cayo Ambergris', 'Остров Амбергрис-Кей', 'Ambergris Caye'],
    ['Xunantunich', 'Xunantunich Maya Kalıntıları', 'Xunantunich', 'Xunantunich', 'Шунантунич', 'Xunantunich'],
    ['Caracol', 'Caracol Maya Kenti', 'Caracol (Maya-Stadt)', 'Caracol (ciudad maya)', 'Каракол (город майя)', 'Caracol (cidade maia)']
  ],
  DM: [
    ['Trafalgar Falls', 'Trafalgar Şelaleleri', 'Trafalgar-Wasserfälle', 'Cataratas Trafalgar', 'Водопады Трафальгар', 'Cachoeiras Trafalgar'],
    ['Boiling Lake', 'Kaynayan Göl (Boiling Lake)', 'Boiling Lake (Kochender See)', 'Lago Hirviente', 'Кипящее озеро', 'Lago Fervente'],
    ['Champagne Reef', 'Champagne Resifi', 'Champagne Reef', 'Arrecife Champagne', 'Риф Шампань', 'Recife Champagne']
  ],
  DO: [
    ['Punta Cana', 'Punta Cana', 'Punta Cana', 'Punta Cana', 'Пунта-Кана', 'Punta Cana'],
    ['Colonial Zone (Santo Domingo)', 'Sömürge Dönemi Şehri (Santo Domingo)', 'Kolonialstadt (Santo Domingo)', 'Zona Colonial (Santo Domingo)', 'Колониальный город (Санто-Доминго)', 'Zona Colonial (Santo Domingo)'],
    ['Samaná Peninsula', 'Samaná Yarımadası', 'Halbinsel Samaná', 'Península de Samaná', 'Полуостров Самана', 'Península de Samaná']
  ],
  GD: [
    ['Grand Anse Beach', 'Grand Anse Plajı', 'Grand Anse Beach', 'Playa Grand Anse', 'Пляж Гранд-Анс', 'Praia de Grand Anse'],
    ['Underwater Sculpture Park', 'Su Altı Heykel Parkı', 'Unterwasser-Skulpturenpark', 'Parque de esculturas submarinas', 'Подводный парк скульптур', 'Parque de esculturas subaquáticas'],
    ['Fort George (St. George’s)', 'Fort George (St. George’s)', 'Fort George (St. George’s)', 'Fuerte George (St. George’s)', 'Форт Джордж (Сент-Джорджес)', 'Forte George (St. George’s)']
  ],
  GT: [
    ['Tikal', 'Tikal Maya Kenti', 'Tikal', 'Tikal', 'Тикаль', 'Tikal'],
    ['Lake Atitlán', 'Atitlán Gölü', 'Atitlán-See', 'Lago de Atitlán', 'Озеро Атитлан', 'Lago de Atitlán'],
    ['Antigua Guatemala', 'Antigua Guatemala', 'Antigua Guatemala', 'Antigua Guatemala', 'Антигуа-Гуатемала', 'Antigua Guatemala']
  ],
  HN: [
    ['Copán Ruins', 'Copán Maya Kalıntıları', 'Ruinen von Copán', 'Ruinas de Copán', 'Руины Копана', 'Ruínas de Copán'],
    ['Roatán', 'Roatán Adası', 'Roatán', 'Roatán', 'Остров Роатан', 'Roatán'],
    ['Pico Bonito National Park', 'Pico Bonito Milli Parkı', 'Nationalpark Pico Bonito', 'Parque nacional Pico Bonito', 'Национальный парк Пико-Бонито', 'Parque Nacional Pico Bonito']
  ],
  HT: [
    ['Citadelle Laferrière', 'Laferrière Kalesi', 'Citadelle Laferrière', 'Ciudadela Laferrière', 'Цитадель Лаферьер', 'Citadelle Laferrière'],
    ['Labadee', 'Labadee Koyu', 'Labadee', 'Labadee', 'Лабади', 'Labadee'],
    ['Bassin Bleu', 'Bassin Bleu Şelaleleri', 'Bassin Bleu', 'Bassin Bleu', 'Бассен-Блё', 'Bassin Bleu']
  ],
  KN: [
    ['Brimstone Hill Fortress', 'Brimstone Hill Kalesi', 'Festung Brimstone Hill', 'Fortaleza de Brimstone Hill', 'Крепость Бримстоун-Хилл', 'Fortaleza de Brimstone Hill'],
    ['Mount Liamuiga', 'Liamuiga Dağı', 'Mount Liamuiga', 'Monte Liamuiga', 'Вулкан Лиамуига', 'Monte Liamuiga'],
    ['Nevis Peak', 'Nevis Zirvesi', 'Nevis Peak', 'Pico Nevis', 'Пик Невис', 'Pico Nevis']
  ],
  LC: [
    ['The Pitons', 'Piton Dağları', 'Die Pitons', 'Los Pitones', 'Горы Питоны', 'Os Pitons'],
    ['Sulphur Springs', 'Sulphur Springs Kükürt Kaynakları', 'Sulphur Springs', 'Sulphur Springs', 'Серные источники Сульфур-Спрингс', 'Sulphur Springs'],
    ['Marigot Bay', 'Marigot Koyu', 'Marigot Bay', 'Bahía Marigot', 'Бухта Мариго', 'Baía Marigot']
  ],
  NI: [
    ['Granada', 'Granada', 'Granada', 'Granada', 'Гранада', 'Granada'],
    ['Ometepe Island', 'Ometepe Adası', 'Insel Ometepe', 'Isla de Ometepe', 'Остров Ометепе', 'Ilha de Ometepe'],
    ['León Cathedral', 'León Katedrali', 'Kathedrale von León', 'Catedral de León', 'Кафедральный собор Леона', 'Catedral de León'],
    ['Masaya Volcano', 'Masaya Yanardağı', 'Vulkan Masaya', 'Volcán Masaya', 'Вулкан Масая', 'Vulcão Masaya']
  ],
  SV: [
    ['Santa Ana Volcano', 'Santa Ana Yanardağı', 'Vulkan Santa Ana', 'Volcán de Santa Ana', 'Вулкан Санта-Ана', 'Vulcão de Santa Ana'],
    ['Ruta de las Flores', 'Çiçekler Yolu (Ruta de las Flores)', 'Ruta de las Flores', 'Ruta de las Flores', 'Дорога цветов (Рута-де-лас-Флорес)', 'Ruta de las Flores'],
    ['Joya de Cerén', 'Joya de Cerén', 'Joya de Cerén', 'Joya de Cerén', 'Хойя-де-Серен', 'Joya de Cerén'],
    ['El Tunco Beach', 'El Tunco Plajı', 'Strand El Tunco', 'Playa El Tunco', 'Пляж Эль-Тунко', 'Praia El Tunco']
  ],
  TT: [
    ['Pigeon Point (Tobago)', 'Pigeon Point (Tobago)', 'Pigeon Point (Tobago)', 'Pigeon Point (Tobago)', 'Пиджен-Пойнт (Тобаго)', 'Pigeon Point (Tobago)'],
    ['Maracas Bay', 'Maracas Koyu', 'Maracas Bay', 'Bahía de Maracas', 'Бухта Маракас', 'Baía de Maracas'],
    ['Asa Wright Nature Centre', 'Asa Wright Doğa Merkezi', 'Asa Wright Nature Centre', 'Centro natural Asa Wright', 'Природный центр Аса-Райт', 'Centro Natural Asa Wright']
  ],
  VC: [
    ['Tobago Cays', 'Tobago Cays Adacıkları', 'Tobago Cays', 'Cayos de Tobago', 'Рифы Тобаго-Кейс', 'Tobago Cays'],
    ['Bequia', 'Bequia Adası', 'Bequia', 'Bequia', 'Остров Бекия', 'Bequia'],
    ['La Soufrière Volcano', 'La Soufrière Yanardağı', 'Vulkan La Soufrière', 'Volcán La Soufrière', 'Вулкан Суфриер', 'Vulcão La Soufrière']
  ],
  GY: [
    ['Kaieteur Falls', 'Kaieteur Şelalesi', 'Kaieteur-Fälle', 'Cataratas Kaieteur', 'Водопад Кайетур', 'Cataratas Kaieteur'],
    ['Iwokrama Forest', 'Iwokrama Ormanı', 'Iwokrama-Wald', 'Bosque de Iwokrama', 'Лес Ивокрама', 'Floresta de Iwokrama'],
    ['Rupununi Savannah', 'Rupununi Savanı', 'Rupununi-Savanne', 'Sabana de Rupununi', 'Саванна Рупунуни', 'Savana do Rupununi']
  ],
  PY: [
    ['Jesuit Missions of Trinidad and Jesús', 'Trinidad ve Jesús Cizvit Misyonları', 'Jesuitenreduktionen Trinidad und Jesús', 'Misiones jesuíticas de Trinidad y Jesús', 'Иезуитские миссии Тринидад и Хесус', 'Missões jesuíticas de Trinidad e Jesús'],
    ['Itaipu Dam', 'Itaipu Barajı', 'Itaipú-Staudamm', 'Represa de Itaipú', 'ГЭС Итайпу', 'Usina de Itaipu'],
    ['National Pantheon of Heroes (Asunción)', 'Ulusal Kahramanlar Panteonu (Asunción)', 'Nationales Pantheon der Helden (Asunción)', 'Panteón Nacional de los Héroes (Asunción)', 'Национальный пантеон героев (Асунсьон)', 'Panteão Nacional dos Heróis (Assunção)']
  ],
  SR: [
    ['Historic Inner City of Paramaribo', 'Paramaribo Tarihi Şehir Merkezi', 'Historische Innenstadt von Paramaribo', 'Centro histórico de Paramaribo', 'Исторический центр Парамарибо', 'Centro histórico de Paramaribo'],
    ['Central Suriname Nature Reserve', 'Orta Surinam Doğa Koruma Alanı', 'Zentral-Suriname-Naturreservat', 'Reserva natural de Surinam Central', 'Природный резерват Центрального Суринама', 'Reserva Natural do Suriname Central'],
    ['Brownsberg Nature Park', 'Brownsberg Doğa Parkı', 'Naturpark Brownsberg', 'Parque natural Brownsberg', 'Природный парк Браунсберг', 'Parque Natural Brownsberg']
  ],
  FM: [
    ['Nan Madol', 'Nan Madol Antik Kenti', 'Nan Madol', 'Nan Madol', 'Нан-Мадол', 'Nan Madol'],
    ['Chuuk Lagoon', 'Chuuk Lagünü', 'Chuuk-Lagune', 'Laguna de Chuuk', 'Лагуна Трук', 'Lagoa de Chuuk'],
    ['Kosrae', 'Kosrae Adası', 'Kosrae', 'Kosrae', 'Остров Кусаие', 'Kosrae']
  ],
  KI: [
    ['Tarawa Lagoon', 'Tarawa Lagünü', 'Tarawa-Lagune', 'Laguna de Tarawa', 'Лагуна Тарава', 'Lagoa de Tarawa'],
    ['Kiritimati (Christmas Island)', 'Kiritimati (Noel Adası)', 'Kiritimati (Weihnachtsinsel)', 'Kiritimati (isla de Navidad)', 'Киритимати (остров Рождества)', 'Kiritimati (Ilha Christmas)'],
    ['Abaiang Atoll', 'Abaiang Atolü', 'Abaiang-Atoll', 'Atolón Abaiang', 'Атолл Абаианг', 'Atol Abaiang']
  ],
  MH: [
    ['Majuro Atoll', 'Majuro Atolü', 'Majuro-Atoll', 'Atolón Majuro', 'Атолл Маджуро', 'Atol Majuro'],
    ['Laura Beach', 'Laura Plajı', 'Laura Beach', 'Playa Laura', 'Пляж Лаура', 'Laura Beach'],
    ['Bikini Atoll', 'Bikini Atolü', 'Bikini-Atoll', 'Atolón Bikini', 'Атолл Бикини', 'Atol de Bikini']
  ],
  NR: [
    ['Anibare Bay', 'Anibare Körfezi', 'Anibare-Bucht', 'Bahía de Anibare', 'Залив Анибар', 'Baía de Anibare'],
    ['Command Ridge', 'Command Ridge Tepesi', 'Command Ridge', 'Command Ridge', 'Холм Комманд-Ридж', 'Command Ridge'],
    ['Buada Lagoon', 'Buada Lagünü', 'Buada-Lagune', 'Laguna de Buada', 'Лагуна Буада', 'Lagoa de Buada']
  ],
  PG: [
    ['Tavurvur Volcano (Rabaul)', 'Tavurvur Yanardağı (Rabaul)', 'Vulkan Tavurvur (Rabaul)', 'Volcán Tavurvur (Rabaul)', 'Вулкан Тавурвур (Рабаул)', 'Vulcão Tavurvur (Rabaul)'],
    ['Kokoda Track', 'Kokoda Patikası', 'Kokoda Track', 'Sendero de Kokoda', 'Тропа Кокода', 'Trilha de Kokoda'],
    ['Sepik River', 'Sepik Nehri', 'Sepik', 'Río Sepik', 'Река Сепик', 'Rio Sepik']
  ],
  PW: [
    ['Rock Islands', 'Rock Adaları', 'Rock Islands', 'Islas Rocosas', 'Скалистые острова', 'Rock Islands'],
    ['Jellyfish Lake', 'Denizanası Gölü', 'Quallensee', 'Lago de las Medusas', 'Озеро медуз', 'Lago das Águas-Vivas'],
    ['Blue Corner', 'Blue Corner Dalış Noktası', 'Blue Corner (Tauchplatz)', 'Blue Corner (punto de buceo)', 'Дайв-сайт Блю-Корнер', 'Blue Corner (ponto de mergulho)']
  ],
  SB: [
    ['Marovo Lagoon', 'Marovo Lagünü', 'Marovo-Lagune', 'Laguna de Marovo', 'Лагуна Марово', 'Lagoa de Marovo'],
    ['Gizo', 'Gizo Adası', 'Gizo', 'Gizo', 'Остров Гизо', 'Gizo'],
    ['Guadalcanal WWII Sites', 'Guadalcanal II. Dünya Savaşı Alanları', 'Guadalcanal: Stätten des Zweiten Weltkriegs', 'Guadalcanal: sitios de la Segunda Guerra Mundial', 'Гуадалканал: места Второй мировой войны', 'Guadalcanal: locais da Segunda Guerra Mundial']
  ],
  TO: [
    ["Ha'amonga 'a Maui", "Ha'amonga 'a Maui Taş Kapısı", "Ha'amonga 'a Maui", "Ha'amonga 'a Maui", 'Хаамонга-а-Мауи', "Ha'amonga 'a Maui"],
    ["Vava'u Islands", "Vava'u Adaları", "Vava'u-Inseln", "Islas Vava'u", 'Острова Вавау', "Ilhas Vava'u"],
    ["Mapu'a 'a Vaea Blowholes", "Mapu'a 'a Vaea Deniz Fıskiyeleri", "Blowholes von Mapu'a 'a Vaea", "Géiseres marinos de Mapu'a 'a Vaea", 'Морские гейзеры Мапуа-а-Ваэа', "Gêiseres marinhos de Mapu'a 'a Vaea"]
  ],
  TV: [
    ['Funafuti Lagoon', 'Funafuti Lagünü', 'Funafuti-Lagune', 'Laguna de Funafuti', 'Лагуна Фунафути', 'Lagoa de Funafuti'],
    ['Funafuti Conservation Area', 'Funafuti Koruma Alanı', 'Funafuti-Schutzgebiet', 'Área de conservación de Funafuti', 'Заповедная зона Фунафути', 'Área de Conservação de Funafuti']
  ],
  WS: [
    ['To Sua Ocean Trench', 'To Sua Okyanus Çukuru', 'To Sua Ocean Trench', 'Fosa oceánica To Sua', 'Океанская впадина То-Суа', 'Fossa oceânica To Sua'],
    ['Lalomanu Beach', 'Lalomanu Plajı', 'Strand von Lalomanu', 'Playa de Lalomanu', 'Пляж Лаломану', 'Praia de Lalomanu'],
    ['Robert Louis Stevenson Museum', 'Robert Louis Stevenson Müzesi', 'Robert-Louis-Stevenson-Museum', 'Museo Robert Louis Stevenson', 'Музей Роберта Льюиса Стивенсона', 'Museu Robert Louis Stevenson']
  ]
};

const IDX: Record<string, number> = { en: 0, tr: 1, de: 2, es: 3, ru: 4, pt: 5 };

/** Ülkenin ek görülecek yerleri, istenen dilde (bilinmeyen dil → İngilizce). */
export function landmarksExtra(code: string, lang: string): string[] {
  const i = IDX[lang] ?? 0;
  return (D[code] || []).map((x) => x[i] || x[0]);
}

/** Eşleştirme için İngilizce adlar. */
export function landmarksExtraEn(code: string): string[] {
  return (D[code] || []).map((x) => x[0]);
}
