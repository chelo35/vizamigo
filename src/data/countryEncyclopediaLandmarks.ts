/**
 * Vizamigo - Ülke Bazlı İkonik Gezilecek Yerler, Tarihi Şahsiyetler ve Ekonomik Sektörler
 * Haritada tıklanan hiçbir ülkenin jenerik boş şablonla kalmaması için gerçek kültürel veritabanı.
 */

export interface CountrySpecificHeritage {
  landmarks: { tr: string[]; en: string[]; de: string[] };
  figures: { tr: string[]; en: string[]; de: string[] };
  sectors: string[];
}

export const COUNTRY_HERITAGE: Record<string, CountrySpecificHeritage> = {
  // Rusya
  RU: {
    landmarks: {
      tr: ['Kızıl Meydan & Aziz Vasil Katedrali (Moskova)', 'Kremlin Sarayı & Silah Müzesi', 'Ermitaj Müzesi & Kışlık Saray (St. Petersburg)', 'Peterhof Çeşmeli Sarayı', 'Baykal Gölü (Dünyanın en derin tatlı su gölü)'],
      en: ['Red Square & Saint Basil’s Cathedral (Moscow)', 'Moscow Kremlin & Armoury Museum', 'The State Hermitage Museum (St. Petersburg)', 'Peterhof Palace & Grand Cascade', 'Lake Baikal (Deepest freshwater lake)'],
      de: ['Roter Platz & Basilius-Kathedrale (Moskau)', 'Moskauer Kreml', 'Eremitage-Museum (St. Petersburg)', 'Schloss Peterhof', 'Baikalsee']
    },
    figures: {
      tr: ['Lev Tolstoy (Yazar - Savaş ve Barış)', 'Fyodor Dostoyevski (Yazar - Suç ve Ceza)', 'Yuri Gagarin (Uzaya çıkan ilk insan)', 'Pyotr Çaykovski (Besteci)', 'Dmitri Mendeleyev (Periyodik Tablo)'],
      en: ['Leo Tolstoy (Novelist)', 'Fyodor Dostoevsky (Novelist)', 'Yuri Gagarin (First human in space)', 'Pyotr Tchaikovsky (Composer)', 'Dmitri Mendeleev (Periodic Table)'],
      de: ['Lew Tolstoi (Schriftsteller)', 'Fjodor Dostojewski (Schriftsteller)', 'Juri Gagarin (Erster Mensch im All)', 'Pjotr Tschaikowski (Komponist)', 'Dmitri Mendelejew']
    },
    sectors: ['Petrol, Doğal Gaz ve Enerji', 'Havacılık ve Uzay Sanayii', 'Nükleer Enerji ve Ağır Metalurji']
  },

  // İsviçre
  CH: {
    landmarks: {
      tr: ['Matterhorn Zirvesi & Zermatt', 'Jungfraujoch (Avrupa’nın Zirvesi Tren Hattı)', 'Luzern Şapel Ahşap Köprüsü & Dört Kanton Gölü', 'Cenevre Gölü & Chillon Şatosu', 'Zürih Eski Şehir (Altstadt)'],
      en: ['Matterhorn Mountain & Zermatt', 'Jungfraujoch (Top of Europe Alpine Railway)', 'Lucerne Chapel Bridge & Lake Lucerne', 'Lake Geneva & Chillon Castle', 'Zurich Old Town & Bahnhofstrasse'],
      de: ['Matterhorn & Zermatt', 'Jungfraujoch (Top of Europe)', 'Luzerner Kapellbrücke & Vierwaldstättersee', 'Genfersee & Schloss Chillon', 'Zürcher Altstadt']
    },
    figures: {
      tr: ['Albert Einstein (Teorik Fizikçi - Patent Ofisi Yılları)', 'Roger Federer (Tenis Efsanesi)', 'Jean-Jacques Rousseau (Aydınlanma Filozofu)', 'Le Corbusier (Modern Mimarlık Öncüsü)'],
      en: ['Albert Einstein (Physicist)', 'Roger Federer (Tennis Icon)', 'Jean-Jacques Rousseau (Philosopher)', 'Le Corbusier (Architect)'],
      de: ['Albert Einstein (Physiker)', 'Roger Federer (Tennislegende)', 'Jean-Jacques Rousseau (Philosoph)', 'Le Corbusier (Architekt)']
    },
    sectors: ['Özel Bankacılık ve Varlık Yönetimi', 'Lüks Saatçilik (Rolex, Patek Philippe)', 'İlaç ve Biyoteknoloji (Novartis, Roche)']
  },

  // Portekiz
  PT: {
    landmarks: {
      tr: ['Belém Kulesi & Jerónimos Manastırı (Lizbon)', 'Pena Sarayı & Sintra Peri Masalı Şatoları', 'Porto Dom Luís I Köprüsü & Douro Şarap Vadisi', 'Benagil Deniz Mağarası (Algarve Kıyıları)', 'Madeira Adası & Levada Doğa Yürüyüş Yolları'],
      en: ['Belém Tower & Jerónimos Monastery (Lisbon)', 'Pena Palace & Sintra Fairytale Castles', 'Dom Luís I Bridge & Douro Wine Valley (Porto)', 'Benagil Sea Cave (Algarve Coast)', 'Madeira Island & Levada Trails'],
      de: ['Torre de Belém & Jerónimos-Kloster (Lissabon)', 'Palácio da Pena in Sintra', 'Ponte Dom Luís I & Douro-Tal (Porto)', 'Benagil-Höhle an der Algarve', 'Blumeninsel Madeira']
    },
    figures: {
      tr: ['Cristiano Ronaldo (Futbol Efsanesi)', 'Vasco da Gama (Kaşif)', 'Fernando Pessoa (Şair)', 'José Saramago (Nobel Edebiyat Ödüllü Yazar)'],
      en: ['Cristiano Ronaldo (Football Legend)', 'Vasco da Gama (Explorer)', 'Fernando Pessoa (Poet)', 'José Saramago (Nobel Laureate)'],
      de: ['Cristiano Ronaldo (Fußballstar)', 'Vasco da Gama (Seefahrer)', 'Fernando Pessoa (Dichter)', 'José Saramago (Nobelpreisträger)']
    },
    sectors: ['Kıyı ve Kültür Turizmi', 'Yenilenebilir Enerji', 'Mantar Meşesi (Mantar tıpası dünya lideri)', 'Şarapçılık ve Zeytinyağı']
  },

  // Avusturya
  AT: {
    landmarks: {
      tr: ['Schönbrunn Sarayı & Bahçeleri (Viyana)', 'Hofburg İmparatorluk Sarayı', 'Hallstatt Masalsı Göl Köyü (Salzkammergut)', 'Salzburg Kalesi & Mozart’ın Doğduğu Ev', 'Innsbruck Altın Çatılı Ev & Alpler'],
      en: ['Schönbrunn Palace & Gardens (Vienna)', 'Hofburg Imperial Palace', 'Hallstatt Fairytale Alpine Village', 'Hohensalzburg Fortress & Mozart’s Birthplace', 'Innsbruck Golden Roof & Tyrolean Alps'],
      de: ['Schloss Schönbrunn (Wien)', 'Wiener Hofburg', 'Hallstatt im Salzkammergut', 'Festung Hohensalzburg & Mozarts Geburtshaus', 'Goldenes Dachl in Innsbruck']
    },
    figures: {
      tr: ['Wolfgang Amadeus Mozart (Klasik Müzik Dehası)', 'Sigmund Freud (Psikanalizin Babası)', 'Gustav Klimt (Ressam - Öpücük)', 'Arnold Schwarzenegger (Oyuncu ve Vali)', 'Franz Kafka & Stefan Zweig (Yazarlar)'],
      en: ['Wolfgang Amadeus Mozart (Composer)', 'Sigmund Freud (Father of Psychoanalysis)', 'Gustav Klimt (Painter)', 'Arnold Schwarzenegger (Actor)', 'Stefan Zweig (Author)'],
      de: ['Wolfgang Amadeus Mozart (Komponist)', 'Sigmund Freud (Psychoanalytiker)', 'Gustav Klimt (Maler)', 'Arnold Schwarzenegger', 'Stefan Zweig (Schriftsteller)']
    },
    sectors: ['Kültür ve Kayak Turizmi', 'Hassas Makine ve Otomotiv Tedarik', 'Klasik Müzik ve Sanat Endüstrisi']
  },

  // Brezilya
  BR: {
    landmarks: {
      tr: ['Kurtarıcı İsa Heykeli (Cristo Redentor - Rio de Janeiro)', 'İguazú Şelaleleri (Dünyanın en görkemli şelalesi)', 'Kopacabana & Ipanema Plajları', 'Amazon Yağmur Ormanları & Manaus', 'Salvador da Bahia Tarihi Pelourinho Meydanı'],
      en: ['Christ the Redeemer (Rio de Janeiro)', 'Iguazu Falls (World’s largest waterfall system)', 'Copacabana & Ipanema Beaches', 'Amazon Rainforest & Manaus', 'Pelourinho Historic Center (Salvador da Bahia)'],
      de: ['Christusstatue Cristo Redentor (Rio)', 'Iguazú-Wasserfälle', 'Copacabana & Ipanema', 'Amazonas-Regenwald', 'Historisches Zentrum von Salvador']
    },
    figures: {
      tr: ['Pelé (Futbol Kralı)', 'Ayrton Senna (Formula 1 Efsanesi)', 'Oscar Niemeyer (Modernist Mimar)', 'Gisele Bündchen (Süpermodel)', 'Paulo Coelho (Simyacı’nın Yazarı)'],
      en: ['Pelé (Football Icon)', 'Ayrton Senna (F1 Legend)', 'Oscar Niemeyer (Architect)', 'Gisele Bündchen (Supermodel)', 'Paulo Coelho (Author)'],
      de: ['Pelé (Fußballlegende)', 'Ayrton Senna (Formel-1-Legende)', 'Oscar Niemeyer (Architekt)', 'Gisele Bündchen', 'Paulo Coelho (Schriftsteller)']
    },
    sectors: ['Soya ve Kahve İhracatı (Dünya 1.si)', 'Demir Cevheri ve Madencilik (Vale)', 'Havacılık Sanayii (Embraer)', 'Yenilenebilir Biyoetanol']
  },

  // Meksika
  MX: {
    landmarks: {
      tr: ['Chichén Itzá Maya Piramidi (Dünyanın Yeni 7 Harikası)', 'Teotihuacan Güneş ve Ay Piramitleri', 'Frida Kahlo Mavi Evi (Coyoacán - Mexico City)', 'Tulum Sahil Maya Harabeleri & Cenoteler', 'Cancún & Riviera Maya Turkuaz Sahilleri'],
      en: ['Chichén Itzá Mayan Pyramid (New 7 Wonders)', 'Teotihuacan Pyramids of Sun and Moon', 'Frida Kahlo Blue House (Mexico City)', 'Tulum Cliffside Mayan Ruins & Cenotes', 'Cancun & Riviera Maya Beaches'],
      de: ['Chichén Itzá Maya-Pyramide', 'Teotihuacán Pyramiden von Sonne und Mond', 'Frida-Kahlo-Museum (Casa Azul)', 'Maya-Ruinen von Tulum & Cenoten', 'Cancún & Riviera Maya']
    },
    figures: {
      tr: ['Frida Kahlo & Diego Rivera (Ressamlar)', 'Octavio Paz (Nobel Edebiyat Ödüllü Yazar)', 'Guillermo del Toro (Oscar Ödüllü Yönetmen)', 'Salma Hayek (Oyuncu)'],
      en: ['Frida Kahlo & Diego Rivera (Painters)', 'Octavio Paz (Nobel Laureate)', 'Guillermo del Toro (Filmmaker)', 'Salma Hayek (Actress)'],
      de: ['Frida Kahlo & Diego Rivera (Künstler)', 'Octavio Paz (Nobelpreisträger)', 'Guillermo del Toro (Regisseur)', 'Salma Hayek (Schauspielerin)']
    },
    sectors: ['Otomotiv ve Elektronik İhracatı', 'Turizm ve Ağırlama', 'Petrol ve Enerji (Pemex)', 'Tarımsal İhracat (Avokado, Tekila)']
  },

  // Suudi Arabistan
  SA: {
    landmarks: {
      tr: ['Mescid-i Haram & Kabe (Mekke-i Mükerreme)', 'Mescid-i Nebevi & Ravza-i Mutahhara (Medine-i Münevvere)', 'AlUla & Hegra UNESCO Nabati Kaya Mezarları', 'Diriye Tarihi Başkenti & At-Turaif (Riyad)', 'Cidde Tarihi Al-Balad Çarşıları & Kızıldeniz'],
      en: ['Masjid al-Haram & Holy Kaaba (Mecca)', 'Al-Masjid an-Nabawi & Green Dome (Medina)', 'AlUla & Hegra Nabataean Tombs (UNESCO)', 'Historic Diriyah & At-Turaif (Riyadh)', 'Al-Balad Historic Coral District (Jeddah)'],
      de: ['Al-Haram-Moschee & Kaaba (Mekka)', 'Prophetenmoschee (Medina)', 'Hegra & AlUla Nabatäische Felsengräber', 'Historisches Diriyya (Riad)', 'Al-Balad Altstadt (Dschidda)']
    },
    figures: {
      tr: ['Kral Abdülaziz El Suud (Modern Krallığın Kurucusu)', 'İbn Haldun ve Tarihçiler (Bölge mirası)', 'Muhammed bin Selman (Vizyon 2030 Mimarı)'],
      en: ['King Abdulaziz Al Saud (Founder of Modern Kingdom)', 'Mohammed bin Salman (Vision 2030 Architect)'],
      de: ['König Abdulaziz Al Saud (Staatsgründer)', 'Mohammed bin Salman (Vision 2030)']
    },
    sectors: ['Ham Petrol ve Petrokimya (Saudi Aramco)', 'Vizyon 2030 Mega Projeleri (NEOM, Red Sea)', 'Dini Hac ve Umre Turizmi']
  },

  // Çin
  CN: {
    landmarks: {
      tr: ['Çin Seddi (Mutianyu & Badaling)', 'Yasak Şehir & İmparatorluk Sarayı (Pekin)', 'Toprak Askerler Ordusu (Terracotta Warriors - Xi’an)', 'Şanghay Bund Kordonu & Pudong Gökdelenleri', 'Guilin Karst Dağları & Li Nehri Manzarası'],
      en: ['Great Wall of China (Mutianyu / Badaling)', 'The Forbidden City & Imperial Palace (Beijing)', 'Terracotta Army of Emperor Qin (Xi’an)', 'The Bund & Pudong Skyline (Shanghai)', 'Guilin Karst Peaks & Li River'],
      de: ['Chinesische Mauer', 'Verbotene Stadt (Peking)', 'Terrakotta-Armee (Xi’an)', 'The Bund & Skyline von Pudong (Shanghai)', 'Karstberge von Guilin']
    },
    figures: {
      tr: ['Konfüçyüs (Filozof)', 'Sun Tzu (Savaş Sanatı’nın Yazarı)', 'Mao Zedong (ÇHC Kurucusu)', 'Jack Ma (Alibaba Kurucusu)', 'Bruce Lee & Jackie Chan (Dövüş Sanatları İkonları)'],
      en: ['Confucius (Philosopher)', 'Sun Tzu (Author of Art of War)', 'Mao Zedong (Founding Leader)', 'Jack Ma (Tech Entrepreneur)', 'Bruce Lee (Martial Arts Pioneer)'],
      de: ['Konfuzius (Philosoph)', 'Sun Tzu (Die Kunst des Krieges)', 'Mao Zedong (Staatsgründer)', 'Jack Ma (Alibaba-Gründer)', 'Bruce Lee']
    },
    sectors: ['Elektronik ve Yüksek Teknoloji İmalatı', 'Elektrikli Araçlar ve Batarya Üretimi (BYD, CATL)', 'Yüksek Hızlı Demiryolları ve Altyapı', 'E-Ticaret ve Yeşil Enerji']
  },

  // Hindistan
  IN: {
    landmarks: {
      tr: ['Tac Mahal (Agra - Dünyanın 7 Harikası)', 'Varanasi Ganj Nehri Kutsal Ghatları', 'Jaipur Pembe Şehir & Hawa Mahal (Rüzgarlar Sarayı)', 'Qutub Minar & Hümayun Türbesi (Yeni Delhi)', 'Kerala Sakin Suları (Backwaters Tekne Evleri)'],
      en: ['Taj Mahal (Agra - Wonder of the World)', 'Varanasi Holy Ghats along the Ganges', 'Jaipur Pink City & Hawa Mahal (Palace of Winds)', 'Qutub Minar & Humayun’s Tomb (Delhi)', 'Kerala Houseboat Backwaters'],
      de: ['Taj Mahal (Agra)', 'Varanasi Ghats am Ganges', 'Hawa Mahal (Palast der Winde, Jaipur)', 'Qutb Minar (Delhi)', 'Backwaters von Kerala']
    },
    figures: {
      tr: ['Mahatma Gandhi (Şiddetsiz Direnişin Önderi)', 'Rabindranath Tagore (Nobel Edebiyat Ödüllü Şair)', 'Sundar Pichai & Satya Nadella (Google ve Microsoft CEO’ları)', 'Shah Rukh Khan (Bollywood Yıldızı)'],
      en: ['Mahatma Gandhi (Father of the Nation)', 'Rabindranath Tagore (Nobel Laureate)', 'Sundar Pichai & Satya Nadella (Tech Leaders)', 'Shah Rukh Khan (Bollywood Icon)'],
      de: ['Mahatma Gandhi', 'Rabindranath Tagore (Nobelpreisträger)', 'Sundar Pichai & Satya Nadella (Tech-CEOs)', 'Shah Rukh Khan']
    },
    sectors: ['Bilgi Teknolojileri ve Yazılım İhracatı', 'Jenerik İlaç ve Biyoteknoloji', 'Uzay Teknolojisi (ISRO Ay Misyonları)', 'Tekstil ve Mücevherat']
  },

  // Sırbistan
  RS: {
    landmarks: {
      tr: ['Kalemegdan Kalesi & Tuna-Sava Kavşağı (Belgrad)', 'Aziz Sava Katedrali (Balkanların en büyük Ortodoks mabedi)', 'Knez Mihailova Yaya Caddesi & Skadarlija Bohem Sokağı', 'Petrovaradin Kalesi (Novi Sad - EXIT Festivali Alanı)', 'Uvac Kanyonu ve Kıvrımları'],
      en: ['Belgrade Fortress (Kalemegdan) & Danube-Sava Confluence', 'Temple of Saint Sava (Belgrade)', 'Knez Mihailova Street & Skadarlija Bohemian Quarter', 'Petrovaradin Fortress (Novi Sad - EXIT venue)', 'Uvac River Meanders'],
      de: ['Festung Kalemegdan & Donau-Save-Mündung (Belgrad)', 'Dom des Heiligen Sava', 'Knez Mihailova & Skadarlija', 'Festung Petrovaradin (Novi Sad)', 'Uvac-Schlucht']
    },
    figures: {
      tr: ['Nikola Tesla (Elektrik Çağının Mucidi)', 'Novak Djokovic (Tenis Dünya 1.si)', 'Mihajlo Pupin (Fizikçi ve Mucit)', 'Emir Kusturica (Film Yönetmeni)'],
      en: ['Nikola Tesla (Father of Electricity)', 'Novak Djokovic (Tennis Legend)', 'Mihajlo Pupin (Physicist)', 'Emir Kusturica (Director)'],
      de: ['Nikola Tesla (Erfinder)', 'Novak Djokovic (Tennis-Legende)', 'Mihajlo Pupin (Physiker)', 'Emir Kusturica (Regisseur)']
    },
    sectors: ['Yazılım ve IT Dış Kaynak Hizmetleri', 'Tarım ve Ahududu İhracatı (Dünya liderlerinden)', 'Otomotiv Yan Sanayii ve Madencilik']
  },

  // Karadağ (Montenegro)
  ME: {
    landmarks: {
      tr: ['Kotor Körfezi & UNESCO Venedik Kalesi', 'Budva Eski Şehir & Sveti Stefan Yarımadası', 'Durmitor Milli Parkı & Tara Nehri Kanyonu (Avrupa’nın en derini)', 'Ostrog Manastırı (Kayaya oyulmuş kutsal mekan)', 'Perast Taş Kasabası & Leydimizin Kayası Adası'],
      en: ['Bay of Kotor & UNESCO Venetian Fortifications', 'Budva Old Town & Sveti Stefan Islet', 'Durmitor National Park & Tara River Canyon (Europe’s deepest)', 'Ostrog Monastery carved into mountain cliffs', 'Perast & Our Lady of the Rocks islet'],
      de: ['Bucht von Kotor & Venezianische Festung', 'Budva Altstadt & Insel Sveti Stefan', 'Durmitor-Nationalpark & Tara-Schlucht', 'Felsenkloster Ostrog', 'Perast']
    },
    figures: {
      tr: ['Petar II Petrović-Njegoš (Prens-Piskopos ve Şair)', 'Milo Đukanović (Bağımsızlık Dönemi Lideri)', 'Stefan Savić (Milli Futbolcu)'],
      en: ['Petar II Petrovic-Njegos (Prince-Bishop and Poet)', 'Stefan Savic (Football Captain)'],
      de: ['Petar II. Petrović-Njegoš (Dichterfürst)', 'Stefan Savić (Fußballstar)']
    },
    sectors: ['Lüks Yat Limanları ve Kıyı Turizmi (Porto Montenegro)', 'Hidroelektrik Enerji', 'Alüminyum ve Metal Sanayii']
  },

  // Fas
  MA: {
    landmarks: {
      tr: ['Cemaa el-Fna Meydanı & Marakeş Medinası', 'Şafşavan (Chefchaouen - Masmavi Boyalı Şehir)', 'Fes el-Bali & Eski Deri Tabakhaneleri (Chouara)', 'Hasan II Camii (Kazablanka - Okyanus Üzerinde)', 'Sahra Çölü Merzouga Kum Tepeleri'],
      en: ['Jemaa el-Fnaa & Marrakech Medina', 'Chefchaouen (The Blue Pearl of Morocco)', 'Fes el-Bali & Chouara Ancient Tanneries', 'Hassan II Mosque (Casablanca - over the Atlantic)', 'Sahara Desert Dunes of Merzouga'],
      de: ['Djemaa el Fna & Medina von Marrakesch', 'Chefchaouen (Die blaue Stadt)', 'Fès el-Bali & Chouara Gerbereien', 'Hassan-II.-Moschee (Casablanca)', 'Sahara-Dünen von Merzouga']
    },
    figures: {
      tr: ['İbn Battuta (Tarihin En Büyük Seyyahı)', 'Averroes / İbn Rüşd (Endülüs-Fas Filozofu)', 'Aşraf Hakimi (Yıldız Futbolcu)'],
      en: ['Ibn Battuta (Legendary Explorer)', 'Averroes / Ibn Rushd (Philosopher)', 'Achraf Hakimi (Football Star)'],
      de: ['Ibn Battuta (Weltreisender)', 'Averroës (Ibn Ruschd - Philosoph)', 'Achraf Hakimi (Fußballstar)']
    },
    sectors: ['Fosfat Madenciliği (Dünya rezervlerinin %70’i)', 'Kültür ve Çöl Turizmi', 'Otomotiv Montajı (Renault-Nissan)', 'Tarımsal Narenciye ve Argan Yağı']
  }
};
