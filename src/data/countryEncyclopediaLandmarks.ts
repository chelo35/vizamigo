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
  },

  // Arjantin
  AR: {
    landmarks: {
      tr: ['Perito Moreno Buzulu (Patagonya)', 'Iguazú Şelaleleri (Dünyanın en geniş şelalesi)', 'Buenos Aires La Boca & Caminito Sokağı', 'Bariloche Göller Bölgesi & And Dağları', 'Mendoza Şarap Vadisi & Aconcagua Zirvesi'],
      en: ['Perito Moreno Glacier (Patagonia)', 'Iguazu Falls (World’s largest waterfall network)', 'Buenos Aires La Boca & Caminito Alley', 'Bariloche Lake District & Andes', 'Mendoza Wine Valley & Mount Aconcagua'],
      de: ['Perito-Moreno-Gletscher (Patagonien)', 'Iguazú-Wasserfälle', 'Buenos Aires La Boca & Caminito', 'Bariloche Seengebiet', 'Mendoza Weintal & Aconcagua']
    },
    figures: {
      tr: ['Lionel Messi (8 Kez Ballon d’Or Kazanan Futbol Efsanesi)', 'Diego Maradona (Dünya Kupası Şampiyonu Futbol İkonu)', 'Jorge Luis Borges (Büyülü Gerçekçilik ve Edebiyat Dehası)', 'Papa Franciscus (Tarihteki İlk Latin Amerikalı Papa)', 'Eva Perón - Evita (Halk Lideri)'],
      en: ['Lionel Messi (Football Legend & 8-time Ballon d’Or Winner)', 'Diego Maradona (World Cup Winner)', 'Jorge Luis Borges (Literary Master)', 'Pope Francis (First Latin American Pope)', 'Eva Perón (Evita)'],
      de: ['Lionel Messi (Fußball-Ikone)', 'Diego Maradona (Weltmeister)', 'Jorge Luis Borges (Schriftsteller)', 'Papst Franziskus', 'Eva Perón (Evita)']
    },
    sectors: ['Sığır Eti ve Tarım İhracatı (Soya ve Mısır)', 'Şarapçılık (Malbec Üretimi)', 'Lityum Madenciliği (Lityum Üçgeni)', 'Yazılım ve Teknoloji (Mercado Libre)']
  },

  // Kosta Rika
  CR: {
    landmarks: {
      tr: ['Arenal Yanardağı & Doğal Kaplıcalar', 'Manuel Antonio Milli Parkı & Pasifik Kumsalları', 'Monteverde Sis Ormanı Biyolojik Rezervi', 'Tortuguero Deniz Kaplumbağası Koruma Alanı', 'Tamarindo Sörf Sahilleri'],
      en: ['Arenal Volcano & Geothermal Hot Springs', 'Manuel Antonio National Park & Pacific Beaches', 'Monteverde Cloud Forest Biological Reserve', 'Tortuguero Sea Turtle Sanctuary', 'Tamarindo Surf Beaches'],
      de: ['Vulkan Arenal & Thermalquellen', 'Manuel-Antonio-Nationalpark', 'Monteverde Nebelwaldreservat', 'Tortuguero Meeresschildkröten-Schutzgebiet', 'Tamarindo Pazifikküste']
    },
    figures: {
      tr: ['Óscar Arias Sánchez (Nobel Barış Ödüllü Devlet Adamı)', 'Franklin Chang Díaz (NASA Astronotu - 7 Uzay Görevi)', 'Keylor Navas (3 Kez Şampiyonlar Ligi Kazanan Efsane Kaleci)'],
      en: ['Óscar Arias Sánchez (Nobel Peace Laureate)', 'Franklin Chang Díaz (NASA Astronaut - 7 Spaceflights)', 'Keylor Navas (Champions League Winning Goalkeeper)'],
      de: ['Óscar Arias Sánchez (Friedensnobelpreisträger)', 'Franklin Chang Díaz (NASA-Astronaut)', 'Keylor Navas (Erfolgreicher Torwart)']
    },
    sectors: ['Eko-Turizm ve Biyoçeşitlilik (Dünya Lideri)', 'Yenilenebilir Yeşil Enerji (%99+ temiz elektrik)', 'Tıbbi Cihaz ve Yüksek Teknoloji İhracatı', 'Nitelikli Kahve Üretimi (Tarrazú)']
  },

  // Bolivya
  BO: {
    landmarks: {
      tr: ['Salar de Uyuni (Dünyanın en büyük tuz gölü)', 'Titicaca Gölü & Güneş Adası (İnka Mitolojisi)', 'La Paz Mi Teleférico Şehir Teleferik Ağı', 'Madidi Amazon Milli Parkı', 'Potosí Tarihi Gümüş Madenleri & UNESCO Şehri'],
      en: ['Salar de Uyuni (World’s largest salt flats)', 'Lake Titicaca & Island of the Sun (Isla del Sol)', 'La Paz Mi Teleférico Urban Cable Car Network', 'Madidi Amazon Rainforest National Park', 'Potosí Historic Silver Mines (UNESCO)'],
      de: ['Salar de Uyuni (Größte Salzpfanne der Welt)', 'Titicacasee & Sonneninsel', 'La Paz Mi Teleférico Seilbahnnetz', 'Madidi Amazonas-Nationalpark', 'Silberminen von Potosí (UNESCO)']
    },
    figures: {
      tr: ['Simón Bolívar (Güney Amerika Kurtarıcısı & Ülkenin İsim Babası)', 'Evo Morales (İlk Yerli Devlet Başkanı)', 'Jaime Escalante (Ünlü Matematik Eğitimcisi)', 'Marcelo Martins Moreno (Milli Golcü)'],
      en: ['Simón Bolívar (The Liberator of South America)', 'Evo Morales (Indigenous Leader)', 'Jaime Escalante (Renowned Educator)', 'Marcelo Martins (Top Football Scorer)'],
      de: ['Simón Bolívar (Befreier Südamerikas)', 'Evo Morales (Staatsmann)', 'Jaime Escalante (Mathematikpädagoge)', 'Marcelo Martins (Fußballer)']
    },
    sectors: ['Lityum Rezervleri (Dünyanın en zengin tuz havzaları)', 'Doğal Gaz İhracatı', 'Kalay, Çinko ve Gümüş Madenciliği', 'Organik Kinoa ve Soya Tarımı']
  },

  // Botsvana
  BW: {
    landmarks: {
      tr: ['Okavango Deltası (Dünyanın en büyük iç deltası & UNESCO)', 'Chobe Milli Parkı (Dünyanın en yoğun fil popülasyonu)', 'Kalahari Çölü & Makgadikgadi Tuz Havzası', 'Tsodilo Tepeleri Kaya Sanatı'],
      en: ['Okavango Delta (World’s largest inland delta & UNESCO)', 'Chobe National Park (Highest elephant density on Earth)', 'Kalahari Desert & Makgadikgadi Salt Pans', 'Tsodilo Hills Ancient Rock Art'],
      de: ['Okavango-Delta (UNESCO-Weltnaturerbe)', 'Chobe-Nationalpark (Größte Elefantenpopulation)', 'Kalahari-Wüste & Makgadikgadi-Salzpfannen', 'Tsodilo-Hügel Felsmalereien']
    },
    figures: {
      tr: ['Sir Seretse Khama (Botsvana Kurucu Devlet Başkanı & Afrika Demokrasi Mimarı)', 'Letsile Tebogo (2024 Paris Olimpiyatları 200m Şampiyonu Atlet)', 'Ruth Williams Khama'],
      en: ['Sir Seretse Khama (Founding President & Democracy Architect)', 'Letsile Tebogo (Olympic 200m Gold Medalist Sprinter)', 'Ruth Williams Khama'],
      de: ['Sir Seretse Khama (Gründungspräsident)', 'Letsile Tebogo (Olympiasieger 200m)', 'Ruth Williams Khama']
    },
    sectors: ['Elmas Madenciliği ve İşleme (De Beers Debswana)', 'Lüks ve Sürdürülebilir Eko-Safari Turizmi', 'Yüksek Kalite Sığır Eti İhracatı']
  },

  // Fiji
  FJ: {
    landmarks: {
      tr: ['Mamanuca & Yasawa Mercan Adaları', 'Bouma Milli Miras Parkı & Taveuni Şelaleleri', 'Sigatoka Kum Tepeleri Milli Parkı', 'Coral Coast Turkuaz Resifleri', 'Kula Wild Adventure Parkı'],
      en: ['Mamanuca & Yasawa Coral Archipelagos', 'Bouma National Heritage Park & Taveuni Falls', 'Sigatoka Sand Dunes National Park', 'Coral Coast Barrier Reefs', 'Kula Wild Adventure Sanctuary'],
      de: ['Mamanuca- & Yasawa-Inseln', 'Bouma-Nationalpark auf Taveuni', 'Sigatoka-Sanddünen', 'Korallenküste (Coral Coast)', 'Kula Wild Adventure Park']
    },
    figures: {
      tr: ['Ratu Sir Kamisese Mara (Modern Fiji’nin Kurucu Başbakanı)', 'Waisale Serevi (Yedili Ragbi Dünya Efsanesi)', 'Vijay Singh (PGA Masters Şampiyonu Golfçü)'],
      en: ['Ratu Sir Kamisese Mara (Founding Father)', 'Waisale Serevi (King of Rugby Sevens)', 'Vijay Singh (PGA Masters Champion Golfer)'],
      de: ['Ratu Sir Kamisese Mara (Staatsgründer)', 'Waisale Serevi (Rugby-Legende)', 'Vijay Singh (Major-Golfsieger)']
    },
    sectors: ['Tropikal Ada ve Lüks Resort Turizmi', 'Doğal Kaynak Suyu İhracatı (FIJI Water)', 'Şeker Kamışı ve Orkinos Balıkçılığı']
  },

  // Vanuatu
  VU: {
    landmarks: {
      tr: ['Mount Yasur Aktif Yanardağı (Tanna Adası)', 'Champagne Beach (Dünyanın en beyaz kumlu sahillerinden)', 'Nanda Mavi Lagünü (Espiritu Santo)', 'Millennium Mağarası & Kanyon Geçişi', 'Pentecost Adası Kara Dalışı (Naghol - Bungee Jumping atası)'],
      en: ['Mount Yasur Active Volcano (Tanna Island)', 'Champagne Beach (White sand shorelines)', 'Nanda Blue Hole Lagoon (Espiritu Santo)', 'Millennium Cave & Canyon Trail', 'Pentecost Island Land Diving (Ancient ritual)'],
      de: ['Vulkan Mount Yasur (Insel Tanna)', 'Champagne Beach', 'Nanda Blue Hole (Espiritu Santo)', 'Millennium-Höhle', 'Bungee-Ursprung auf Insel Pentecost (Land Diving)']
    },
    figures: {
      tr: ['Walter Lini (Vanuatu Bağımsızlık Mimarı ve İlk Başbakan)', 'Grace Mera Molisa (Şair ve Melanesya Kültür Savunucusu)'],
      en: ['Walter Lini (Founding Father & First Prime Minister)', 'Grace Mera Molisa (Poet & Cultural Leader)'],
      de: ['Walter Lini (Staatsgründer & Premierminister)', 'Grace Mera Molisa (Dichterin & Frauenrechtlerin)']
    },
    sectors: ['Macera ve Eko-Dalış Turizmi', 'Organik Kava İhracatı (Sakinleştirici bitkisel kök)', 'Hindistan Cevizi (Kopra) ve Sığır Yetiştiriciliği']
  },

  // Barbados
  BB: {
    landmarks: {
      tr: ['Crane Beach & Atlantik Falezleri', 'Harrison’s Cave Yeraltı Sarkıt Mağarası', 'Carlisle Bay Deniz Kaplumbağası Koruma Alanı', 'Bridgetown Tarihi Garnizonu (UNESCO)', 'Mount Gay Rom İmalathanesi (1703)'],
      en: ['Crane Beach & Atlantic Cliffs', 'Harrison’s Cave Crystallized Caverns', 'Carlisle Bay Marine & Turtle Park', 'Historic Bridgetown & Garrison (UNESCO)', 'Mount Gay Rum Distillery (Established 1703)'],
      de: ['Crane Beach & Atlantikklippen', 'Harrison’s Cave Tropfsteinhöhle', 'Carlisle Bay Meerespark', 'Historisches Bridgetown (UNESCO)', 'Mount Gay Rum-Destillerie (seit 1703)']
    },
    figures: {
      tr: ['Rihanna (Dünya Müzik & Moda İkonu, Barbados Ulusal Kahramanı)', 'Sir Garfield Sobers (Kriket Tarihinin En Büyük Oyuncusu)', 'Errol Barrow (Bağımsızlık Dönemi Başbakanı)'],
      en: ['Rihanna (Global Pop Icon & National Hero of Barbados)', 'Sir Garfield Sobers (Cricket Legend)', 'Errol Barrow (Founding Prime Minister)'],
      de: ['Rihanna (Pop-Ikone & Nationalheldin)', 'Sir Garfield Sobers (Cricket-Legende)', 'Errol Barrow (Premierminister)']
    },
    sectors: ['Lüks Karayip Turizmi', 'Uluslararası Finans ve Offshore Hizmetler', 'Rom Damıtımı (Dünyanın en eski ticari markası)', 'Şeker Kamışı']
  },

  // Şili
  CL: {
    landmarks: {
      tr: ['Torres del Paine Milli Parkı (Patagonya Boynuzları)', 'Atacama Çölü & Ay Vadisi (Dünyanın en berrak gökyüzü)', 'Paskalya Adası Moai Heykelleri (Rapa Nui)', 'Valparaíso Renkli Sanat Tepeleri', 'San Pedro de Atacama Geysirleri'],
      en: ['Torres del Paine National Park (Patagonian Peaks)', 'Atacama Desert & Valle de la Luna (Clearest stargazing on Earth)', 'Easter Island Moai Monoliths (Rapa Nui)', 'Valparaíso Historic Funiculars & Street Art', 'El Tatio Geysers'],
      de: ['Torres del Paine Nationalpark (Patagonien)', 'Atacama-Wüste & Mondtal', 'Osterinsel Moai-Statuen (Rapa Nui)', 'Valparaíso Hügel & Street-Art', 'El Tatio Geysire']
    },
    figures: {
      tr: ['Pablo Neruda (Nobel Edebiyat Ödüllü Şair)', 'Gabriela Mistral (Latin Amerika’nın İlk Nobel Ödüllü Kadın Şairi)', 'Pedro Pascal (Dünyaca Ünlü Sinema Oyuncusu)', 'Alexis Sánchez (Milli Futbol Yıldızı)'],
      en: ['Pablo Neruda (Nobel Laureate Poet)', 'Gabriela Mistral (First Latin American Nobel Laureate)', 'Pedro Pascal (Acclaimed Actor)', 'Alexis Sánchez (Football Star)'],
      de: ['Pablo Neruda (Nobelpreisträger)', 'Gabriela Mistral (Literaturnobelpreisträgerin)', 'Pedro Pascal (Schauspieler)', 'Alexis Sánchez (Fußballstar)']
    },
    sectors: ['Bakır Madenciliği (Dünya 1.si - Codelco)', 'Şarapçılık (Carmenère ve Cabernet Sauvignon)', 'Lityum Üretimi (Dünya rezerv liderlerinden)', 'Somon Balığı ve Meyve İhracatı']
  },

  // Kolombiya
  CO: {
    landmarks: {
      tr: ['Cartagena Kolonyal Surları & Karayip Denizi', 'Guatapé Monolit Kayası & Renkli Köyü', 'Tayrona Milli Parkı Tropikal Kumsalları', 'Kahve Kültür Bölgesi (Eje Cafetero - Salento & Cocora Vadisi)', 'Medellín Comuna 13 & Botero Meydanı'],
      en: ['Cartagena Walled Colonial City & Caribbean Sea', 'Rock of Guatapé (El Peñol) & Lakes', 'Tayrona National Natural Park Beaches', 'Coffee Cultural Landscape (Cocora Valley Wax Palms)', 'Medellín Comuna 13 & Plaza Botero'],
      de: ['Koloniales Cartagena & Karibikküste', 'Felsen von Guatapé (El Peñol)', 'Tayrona-Nationalpark', 'Kaffeeregion & Cocora-Tal (Wachspalmen)', 'Medellín Comuna 13 & Botero-Platz']
    },
    figures: {
      tr: ['Gabriel García Márquez (Nobel Edebiyat Ödüllü Yazar - Yüzyıllık Yalnızlık)', 'Fernando Botero (Heykeltıraş ve Ressam)', 'Shakira (Küresel Pop ve Dans İkonu)', 'Radamel Falcao & James Rodríguez (Milli Futbol Yıldızları)'],
      en: ['Gabriel García Márquez (Nobel Laureate - One Hundred Years of Solitude)', 'Fernando Botero (Painter & Sculptor)', 'Shakira (Global Music Superstar)', 'Radamel Falcao & James Rodríguez (Football Icons)'],
      de: ['Gabriel García Márquez (Literaturnobelpreisträger)', 'Fernando Botero (Künstler)', 'Shakira (Popstar)', 'James Rodríguez & Falcao (Fußballer)']
    },
    sectors: ['Nitelikli Arabica Kahve Üretimi (Dünya liderlerinden)', 'Zümrüt Madenciliği (Dünyanın en saf zümrütleri)', 'Kesme Çiçek İhracatı (Orkide ve Gül)', 'Petrol ve Kömür']
  },

  // Peru
  PE: {
    landmarks: {
      tr: ['Machu Picchu İnka Antik Kenti (Dünyanın Yeni 7 Harikası)', 'Cusco Tarihi Başkenti & Sacsayhuamán Kalesi', 'Vinicunca Gökkuşağı Dağı', 'Titikaka Gölü & Uros Yüzen Adaları', 'Nazca Çizgileri & Arequipa Beyaz Kenti'],
      en: ['Machu Picchu Inca Citadel (New 7 Wonders of the World)', 'Cusco Historic Capital & Sacsayhuamán', 'Vinicunca Rainbow Mountain', 'Lake Titicaca & Uros Floating Reed Islands', 'Nazca Lines & Colca Canyon'],
      de: ['Inka-Ruinenstadt Machu Picchu', 'Historisches Cusco & Sacsayhuamán', 'Regenbogenberg Vinicunca', 'Titicacasee & Uros-Schilfinseln', 'Nazca-Linien & Colca-Canyon']
    },
    figures: {
      tr: ['Mario Vargas Llosa (Nobel Edebiyat Ödüllü Yazar)', 'Gastón Acurio & Virgilio Martínez (Dünyanın En İyi Şefleri)', 'Claudio Pizarro (Bayern Münih Efsanesi)', 'Javier Pérez de Cuéllar (BM Genel Sekreteri)'],
      en: ['Mario Vargas Llosa (Nobel Laureate Novelist)', 'Gastón Acurio & Virgilio Martínez (Culinary Innovators)', 'Claudio Pizarro (Football Icon)', 'Javier Pérez de Cuéllar (UN Secretary-General)'],
      de: ['Mario Vargas Llosa (Nobelpreisträger)', 'Virgilio Martínez & Gastón Acurio (Spitzenköche)', 'Claudio Pizarro (Fußballer)', 'Javier Pérez de Cuéllar']
    },
    sectors: ['Kültür ve Arkeoloji Turizmi', 'Gastronomi Sanayii (Dünya mutfak lideri)', 'Bakır, Gümüş ve Çinko Madenciliği', 'Balık Unu ve Alpaka Yünü İhracatı']
  },

  // İsrail
  IL: {
    landmarks: {
      tr: ['Kudüs Eski Şehri (Ağlama Duvarı, Mescid-i Aksa, Kıyamet Kilisesi)', 'Tel Aviv Akdeniz Sahili & Tarihi Yafa (Jaffa)', 'Ölü Deniz (Lut Gölü - Dünyanın en alçak noktası)', 'Masada Çöl Kalesi (UNESCO)', 'Hayfa Bahai Bahçeleri'],
      en: ['Jerusalem Old City (Western Wall, Al-Aqsa, Church of Holy Sepulchre)', 'Tel Aviv Mediterranean Promenade & Old Jaffa', 'Dead Sea (Lowest elevation on land)', 'Masada Desert Fortress (UNESCO)', 'Bahá’í Gardens in Haifa'],
      de: ['Altstadt von Jerusalem (Klagemauer, Al-Aqsa, Grabeskirche)', 'Tel Aviv Promenade & Jaffa', 'Totes Meer (Tiefster Punkt der Erde)', 'Felsenfestung Masada', 'Bahai-Gärten in Haifa']
    },
    figures: {
      tr: ['Albert Einstein (Kudüs İbrani Üniversitesi Kurucusu & Fizikçi)', 'David Ben-Gurion (Devletin Kurucu Başbakanı)', 'Natalie Portman (Oscar Ödüllü Oyuncu)', 'Yuval Noah Harari (Tarihçi ve Yazar - Sapiens)'],
      en: ['Albert Einstein (Co-founder of Hebrew University & Physicist)', 'David Ben-Gurion (Founding Prime Minister)', 'Natalie Portman (Oscar-winning Actress)', 'Yuval Noah Harari (Historian & Author of Sapiens)'],
      de: ['Albert Einstein (Physiker & Mitgründer der Hebräischen Universität)', 'David Ben-Gurion (Staatsgründer)', 'Natalie Portman (Schauspielerin)', 'Yuval Noah Harari (Historiker)']
    },
    sectors: ['Yüksek Teknoloji ve Siber Güvenlik (Silicon Wadi)', 'Elmas İşleme ve Ticareti', 'Biyomedikal ve Tıbbi Cihazlar', 'Damla Sulama ve Çöl Tarım Teknolojileri']
  },

  // Jamaika
  JM: {
    landmarks: {
      tr: ['Dunn’s River Şelaleleri (Ocho Rios)', 'Negril Yedi Mil Kumsalı & Rick’s Cafe Uçurum Dalışı', 'Bob Marley Müzesi (Kingston)', 'Blue Mountains Sisli Dağları & Kahve Plantasyonları', 'Martha Brae Bambu Sal Rotaları'],
      en: ['Dunn’s River Falls (Ocho Rios)', 'Negril Seven Mile Beach & Rick’s Cafe Cliff Diving', 'Bob Marley Museum (Kingston)', 'Blue Mountains Mist-covered Coffee Peaks', 'Martha Brae Bamboo River Rafting'],
      de: ['Dunn’s River Wasserfälle (Ocho Rios)', 'Negril Seven Mile Beach & Rick’s Cafe', 'Bob-Marley-Museum (Kingston)', 'Blue Mountains Kaffeeregion', 'Martha Brae Bambus-Rafting']
    },
    figures: {
      tr: ['Bob Marley (Reggae Müziğin Evrensel Peygamberi)', 'Usain Bolt (8 Kez Olimpiyat Şampiyonu & Dünyanın En Hızlı İnsanı)', 'Marcus Garvey (Pan-Afrika Lideri)', 'Shelly-Ann Fraser-Pryce (Olimpiyat Şampiyonu)'],
      en: ['Bob Marley (Reggae Musical Icon)', 'Usain Bolt (World’s Fastest Man & 8x Olympic Champion)', 'Marcus Garvey (Civil Rights Leader)', 'Shelly-Ann Fraser-Pryce (Sprint Icon)'],
      de: ['Bob Marley (Reggae-Legende)', 'Usain Bolt (Schnellster Mensch der Welt)', 'Marcus Garvey (Bürgerrechtler)', 'Shelly-Ann Fraser-Pryce (Sprintlegende)']
    },
    sectors: ['Plaj, Müzik ve Kültür Turizmi', 'Boksit ve Alümina Madenciliği', 'Jamaica Blue Mountain Nitelikli Kahvesi', 'Rom Üretimi (Appleton Estate)']
  },

  // Küba
  CU: {
    landmarks: {
      tr: ['Habana Vieja (Havana Eski Şehri) & Malecón Sahil Kordonu', 'Viñales Tütün Vadisi Mogoteleri (UNESCO)', 'Trinidad Kolonyal Taş Sokakları & Şeker Vadisi', 'Varadero Turkuaz Kumsalları', 'Santiago de Cuba San Pedro Kalesi'],
      en: ['Old Havana (Habana Vieja) & The Malecón Seawall', 'Viñales Tobacco Valley & Mogote Karsts (UNESCO)', 'Trinidad Colonial Cobblestone Quarter', 'Varadero Turquoise Sand Beaches', 'Castillo de San Pedro de la Roca (Santiago de Cuba)'],
      de: ['Altstadt von Havanna (Habana Vieja) & Malecón', 'Viñales-Tal & Tabakplantagen (UNESCO)', 'Kolonialstadt Trinidad', 'Varadero Karibikstrände', 'Festung San Pedro de la Roca']
    },
    figures: {
      tr: ['José Martí (Milli Şair ve Bağımsızlık Kahramanı)', 'Fidel Castro & Che Guevara (Devrim Önderleri)', 'Celia Cruz (Salsa Kraliçesi)', 'Alicia Alonso (Klasik Bale Efsanesi)'],
      en: ['José Martí (National Hero & Poet)', 'Fidel Castro & Che Guevara (Revolutionary Leaders)', 'Celia Cruz (Queen of Salsa)', 'Alicia Alonso (Ballet Legend)'],
      de: ['José Martí (Nationalheld & Dichter)', 'Fidel Castro & Che Guevara', 'Celia Cruz (Salsa-Legende)', 'Alicia Alonso (Primaballerina)']
    },
    sectors: ['Biyoteknoloji ve Sağlık Turizmi', 'Havana Puro İhracatı (Cohiba, Montecristo)', 'Rom Üretimi (Havana Club)', 'Nikel Madenciliği']
  },

  // Özbekistan
  UZ: {
    landmarks: {
      tr: ['Semerkant Registan Meydanı, Bibi Hanım & Gur-i Emir Türbesi', 'Buhara Kalyan Minaresi & Ark Kalesi', 'Hiva İçan-Kale (Açık hava müzesi & UNESCO)', 'Taşkent Tarihi Metrosu & Çorsu Pazarı', 'Şehrisebz Ak Saray Kalıntıları'],
      en: ['Samarkand Registan Square, Bibi-Khanym & Gur-e-Amir', 'Bukhara Kalyan Minaret & Historic Ark Citadel', 'Khiva Itchan Kala Walled Fortress (UNESCO)', 'Tashkent Metro Stations & Chorsu Bazaar', 'Shahrisabz Ak-Saray Palace Ruins'],
      de: ['Samarkand Registan-Platz & Gur-Emir-Mausoleum', 'Buchara Kalyan-Minarett & Zitadelle Ark', 'Chiwa Itchan-Kala (UNESCO)', 'Taschkent Metro & Tschorsu-Basar', 'Schachrisabs Aq-Saray-Palast']
    },
    figures: {
      tr: ['Emir Timur (Timurlenk - Büyük İmparatorluk Kurucusu)', 'Uluğ Bey (Dahi Astronom ve Matematikçi Hükümdar)', 'Ali Şir Nevai (Türk Dili ve Çağatay Edebiyatı Zirvesi)', 'İmam Buhari (Büyük Hadis Alimi)', 'El-Biruni & El-Harizmi (Bilim Öncüleri)'],
      en: ['Amir Timur (Tamerlane - Emperor & Conqueror)', 'Ulugh Beg (Astronomer King & Mathematician)', 'Ali-Shir Nava’i (Master of Turkic Literature)', 'Imam Bukhari (Islamic Scholar)', 'Al-Biruni (Polymath)'],
      de: ['Amir Timur (Tamerlan - Herrscher)', 'Ulugh Beg (Astronom & Mathematiker)', 'Alischer Nawoi (Dichter)', 'Imam al-Bukhari (Gelehrter)', 'Al-Biruni (Wissenschaftler)']
    },
    sectors: ['İpek Yolu Kültür Turizmi', 'Pamuk ve Geleneksel İpek Dokuma (İkat)', 'Altın Madenciliği (Muruntau dünyanın en büyük açık ocağı)', 'Doğal Gaz ve Uranyum İhracatı']
  },

  // Azerbaycan
  AZ: {
    landmarks: {
      tr: ['Bakü İçerişehir & Kız Kalesi (UNESCO)', 'Alev Kuleleri (Flame Towers) & Haydar Aliyev Kültür Merkezi', 'Gobustan Kaya Sanatı & Çamur Volkanları', 'Şeki Han Sarayı & Tarihi İpek Yolu Kervansarayı', 'Şahdağ Dağ Turizmi ve Kayak Merkezi'],
      en: ['Baku Old City (Icherisheher) & Maiden Tower (UNESCO)', 'Flame Towers & Heydar Aliyev Centre (Zaha Hadid)', 'Gobustan Rock Art & Mud Volcanoes', 'Sheki Khans’ Palace & Silk Road Caravanserai', 'Shahdag Mountain Resort'],
      de: ['Altstadt von Baku (Itscheri Scheher) & Jungfrauenturm', 'Flammentürme & Heydar Aliyev Center', 'Kobustan Felsbilder & Schlammvulkane', 'Palast der Khane von Schäki', 'Shahdag Bergresort']
    },
    figures: {
      tr: ['Haydar Aliyev (Milli Lider & Bağımsız Azerbaycan Mimarı)', 'Nizami Gencevi (Leyla ile Mecnun Şairi)', 'İmadettin Nesimi (Büyük Divan Şairi)', 'Müslüm Magomayev (Efsanevi Bariton Şarkıcı)', 'Garry Kasparov (Satranç Dünya Şampiyonu)'],
      en: ['Heydar Aliyev (National Leader)', 'Nizami Ganjavi (Classic Poet - Layla and Majnun)', 'Imadaddin Nasimi (Poet & Philosopher)', 'Muslim Magomayev (Legendary Baritone)', 'Garry Kasparov (World Chess Champion)'],
      de: ['Heydar Aliyev (Staatsmann)', 'Nisami Gandschawi (Dichter)', 'Nasimi (Dichter)', 'Muslim Magomajew (Bariton)', 'Garry Kasparow (Schachweltmeister)']
    },
    sectors: ['Petrol ve Doğal Gaz İhracatı (SOCAR, Şah Deniz, Bakü-Tiflis-Ceyhan)', 'Hazar Transit Taşımacılığı ve Lojistik', 'Tarım (Nar, Fındık ve İpekçilik)', 'Kültür ve Spor Turizmi (Formula 1 Bakü)']
  }
};
