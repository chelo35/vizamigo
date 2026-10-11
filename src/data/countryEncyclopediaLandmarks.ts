/**
 * Vizamigo - Ülke Bazlı İkonik Gezilecek Yerler, Tarihi Şahsiyetler, Tarihi Kilometre Taşları ve Ekonomik Sektörler
 * Haritada tıklanan hiçbir ülkenin jenerik boş şablonla kalmaması için 199 ülkelik gerçek kültürel veritabanı.
 */

import { EUROPE_HERITAGE } from './countryHeritageEurope';
import { EUROPE_EXTRA_HERITAGE } from './countryHeritageEuropeExtra';
import { AMERICAS_HERITAGE } from './countryHeritageAmericas';
import { ASIA_ME_HERITAGE } from './countryHeritageAsiaMiddleEast';
import { AFRICA_OCEANIA_HERITAGE } from './countryHeritageAfricaOceania';
import { ASIA_REMAINING_HERITAGE } from './countryHeritageRemainingAsia';
import { AFRICA_REMAINING_HERITAGE } from './countryHeritageRemainingAfrica';
import { UNIVERSAL_REMAINING_HERITAGE } from './countryHeritageUniversalRemaining';

export interface CountrySpecificHeritage {
  landmarks: { tr: string[]; en: string[]; de: string[] };
  figures: { tr: string[]; en: string[]; de: string[] };
  sectors: string[];
  history?: {
    concise: { tr: string; en: string; de: string };
    milestones: { tr: string[]; en: string[]; de: string[] };
  };
  sacredSites?: { tr: string[]; en: string[]; de: string[] };
}

const BASE_LANDMARKS: Record<string, CountrySpecificHeritage> = {
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
    history: {
      concise: {
        tr: 'Kuzey ormanlarından Pasifik Okyanusu’na uzanan Rusya, Çarlık, Sovyetler Birliği ve modern dönemleriyle dünya tarihine, edebiyatına ve uzay keşfine yön vermiştir.',
        en: 'From northern forests to the Pacific, Russia shaped world literature, classical music, and space exploration from Tsardom to modern sovereignty.',
        de: 'Vom Zarentum über die Sowjetunion bis zur Gegenwart prägte Russland Weltliteratur, Wissenschaft und Raumfahrt.'
      },
      milestones: {
        tr: ['862: Rurik ve Novgorod Rus Devleti’nin Doğuşu', '1703: Büyük Petro Tarafından St. Petersburg’un İnşası ve İmparatorluk', '1961: Yuri Gagarin ile İnsanlığın Uzaya İlk Çıkışı'],
        en: ['862: Rurik establishes Kievan/Novgorod Rus', '1703: Peter the Great founds Saint Petersburg as imperial capital', '1961: Yuri Gagarin becomes first human in outer space'],
        de: ['862: Gründung des Kiewer/Nowgoroder Reiches durch Rurik', '1703: Peter der Große gründet St. Petersburg', '1961: Juri Gagarin fliegt als erster Mensch ins All']
      }
    },
    sacredSites: {
      tr: ['Aziz Vasil Katedrali (Kızıl Meydan)', 'Kurtarıcı İsa Katedrali (Moskova)'],
      en: ['Saint Basil’s Cathedral (Red Square)', 'Cathedral of Christ the Saviour (Moscow)'],
      de: ['Basilius-Kathedrale (Roter Platz)', 'Christ-Erlöser-Kathedrale (Moskau)']
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
      tr: ['Albert Einstein (Teorik Fizikçi - Bern Patent Ofisi Yılları)', 'Roger Federer (Tenis Efsanesi)', 'Jean-Jacques Rousseau (Aydınlanma Filozofu)', 'Le Corbusier (Modern Mimarlık Öncüsü)'],
      en: ['Albert Einstein (Physicist - Bern Patent Office Years)', 'Roger Federer (Tennis Icon)', 'Jean-Jacques Rousseau (Philosopher)', 'Le Corbusier (Architect)'],
      de: ['Albert Einstein (Physiker)', 'Roger Federer (Tennislegende)', 'Jean-Jacques Rousseau (Philosoph)', 'Le Corbusier (Architekt)']
    },
    history: {
      concise: {
        tr: '1291 yılında Rütli Yemini ile üç kantonun birleşmesinden doğan İsviçre, 1815’ten bu yana daimi tarafsızlığını korumuş, küresel diplomasi ve yüksek refahın merkezidir.',
        en: 'Born in 1291 from the Rütli oath of three founding cantons, Switzerland maintained perpetual neutrality since 1815, standing as a global diplomatic and wealth hub.',
        de: '1291 durch den Rütlischwur gegründet, wahrte die Schweiz seit 1815 dauerhafte Neutralität und ist heute weltweites Zentrum für Finanzen und Diplomatie.'
      },
      milestones: {
        tr: ['1291: Üç Kurucu Kantonun Rütli Çayırı Yemini ve İsviçre Konfederasyonu', '1815: Viyana Kongresi ile Daimi Tarafsızlığın Tanınması', '1848: Modern Federal Anayasa ve Bern’in Başkent Oluşu'],
        en: ['1291: Federal Charter of 1291 and Rütli Oath', '1815: Congress of Vienna guarantees Swiss perpetual neutrality', '1848: Federal Constitution creates modern state with Bern as capital'],
        de: ['1291: Bundesbrief & Rütlischwur gründen die Eidgenossenschaft', '1815: Wiener Kongress garantiert Schweizer Neutralität', '1848: Bundesverfassung begründet modernen Bundesstaat']
      }
    },
    sacredSites: {
      tr: ['Grossmünster & Fraumünster Kiliseleri (Zürih - Chagall Vitrayları)', 'Einsiedeln Barok Manastırı & Kara Meryem'],
      en: ['Grossmünster & Fraumünster (Zurich - Chagall Windows)', 'Einsiedeln Abbey & Black Madonna'],
      de: ['Grossmünster & Fraumünster (Zürich)', 'Kloster Einsiedeln']
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
    history: {
      concise: {
        tr: '1143 yılında Afonso Henriques önderliğinde kurulan Portekiz, Coğrafi Keşifler Çağı’nda Brezilya’dan Hindistan’a uzanan ilk küresel deniz imparatorluğunu kurmuştur.',
        en: 'Founded in 1143, Portugal led the Age of Discovery under Prince Henry the Navigator, creating the first global maritime empire stretching to Brazil and Asia.',
        de: '1143 gegründet, leitete Portugal das Zeitalter der Entdeckungen ein und schuf das erste globale Seereich von Brasilien bis Asien.'
      },
      milestones: {
        tr: ['1143: Zamora Antlaşması ile Portekiz Krallığı’nın Tanınması', '1498: Vasco da Gama’nın Hindistan Deniz Yolunu Keşfi', '1974: Karanfil Devrimi ile Barışçıl Demokrasiye Geçiş'],
        en: ['1143: Treaty of Zamora recognizes Portuguese sovereignty', '1498: Vasco da Gama discovers sea route to India', '1974: Carnation Revolution peacefully restores democracy'],
        de: ['1143: Vertrag von Zamora begründet Königreich Portugal', '1498: Vasco da Gama entdeckt den Seeweg nach Indien', '1974: Nelkenrevolution stellt Demokratie her']
      }
    },
    sacredSites: {
      tr: ['Fátima Meryem Ana Kutsal Alanı (Dünyanın en büyük Katolik hac merkezlerinden)', 'Batalha Manastırı (Gotik UNESCO Başyapıtı)'],
      en: ['Sanctuary of Fátima (Major Catholic Pilgrimage Site)', 'Batalha Monastery (UNESCO Gothic Masterpiece)'],
      de: ['Heiligtum von Fátima', 'Kloster Batalha (UNESCO)']
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
      tr: ['Wolfgang Amadeus Mozart (Klasik Müzik Dehası)', 'Sigmund Freud (Psikanalizin Babası)', 'Gustav Klimt (Ressam - Öpücük)', 'Arnold Schwarzenegger (Oyuncu ve Vali)', 'Stefan Zweig (Yazar)'],
      en: ['Wolfgang Amadeus Mozart (Composer)', 'Sigmund Freud (Father of Psychoanalysis)', 'Gustav Klimt (Painter)', 'Arnold Schwarzenegger (Actor)', 'Stefan Zweig (Author)'],
      de: ['Wolfgang Amadeus Mozart (Komponist)', 'Sigmund Freud (Psychoanalytiker)', 'Gustav Klimt (Maler)', 'Arnold Schwarzenegger', 'Stefan Zweig (Schriftsteller)']
    },
    history: {
      concise: {
        tr: 'Habsburg Hanedanlığı ile 600 yılı aşkın süre Orta Avrupa’ya hükmeden Avusturya, Viyana Klasikleri, operaları ve Alplerin kalbindeki görkemiyle dünya kültür başkentidir.',
        en: 'Seat of the Habsburg Empire for six centuries, Austria was the cultural heart of Central Europe, home to Mozart, Beethoven, and Alpine splendor.',
        de: 'Über 600 Jahre Sitz der Habsburger Monarchie, war Österreich das kulturelle Herz Mitteleuropas und Wiege der klassischen Musik.'
      },
      milestones: {
        tr: ['1273: I. Rudolf ile Habsburg Hanedanı İktidarının Başlaması', '1867: Avusturya-Macaristan İkili Monarşisi', '1955: Devlet Antlaşması ile Ebedi Tarafsızlık ve Tam Bağımsızlık'],
        en: ['1273: Rudolf I begins Habsburg dynasty rule', '1867: Austro-Hungarian Dual Monarchy established', '1955: Austrian State Treaty establishes perpetual neutrality'],
        de: ['1273: Rudolf I. begründet Habsburger Herrschaft', '1867: Österreichisch-Ungarischer Ausgleich', '1955: Staatsvertrag bringt dauernde Neutralität']
      }
    },
    sacredSites: {
      tr: ['Aziz Stephan Katedrali (Stephansdom - Viyana)', 'Melk Barok Manastırı (Tuna Vadisi)'],
      en: ['St. Stephen’s Cathedral (Stephansdom in Vienna)', 'Melk Abbey (Danube Baroque Marvel)'],
      de: ['Stephansdom (Wien)', 'Stift Melk an der Donau']
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
    history: {
      concise: {
        tr: '1822’de I. Pedro’nun "Ya Bağımsızlık Ya Ölüm!" haykırışıyla bağımsız olan Brezilya, Amazon yağmur ormanları, samba ve futbol dehasıyla dünyanın en renkli devidir.',
        en: 'Declaring independence in 1822 with Dom Pedro I, Brazil spans the mighty Amazon basin and stands as South America’s economic and cultural powerhouse.',
        de: '1822 unabhängig geworden, beherbergt Brasilien den Amazonas und ist die führende Wirtschafts- und Kulturnation Südamerikas.'
      },
      milestones: {
        tr: ['1500: Pedro Álvares Cabral’ın Brezilya Kıyılarına Çıkışı', '1822: Ipiranga Çığlığı ile Bağımsızlık İlanı', '1960: Oscar Niemeyer Tasarımı Fütüristik Başkent Brasília’nın Açılışı'],
        en: ['1500: Cabral lands on Brazilian coast', '1822: Cry of Ipiranga proclaims independence from Portugal', '1960: Modernist planned capital Brasília inaugurated'],
        de: ['1500: Entdeckung durch Pedro Álvares Cabral', '1822: Ruf von Ipiranga & Unabhängigkeit', '1960: Einweihung der Planhauptstadt Brasília']
      }
    },
    sacredSites: {
      tr: ['Aparecida Meryem Ana Ulusal Bazilikası (Dünyanın en büyük 2. mabedi)', 'Rio de Janeiro São Sebastião Metropolitan Katedrali'],
      en: ['Basilica of the National Shrine of Our Lady of Aparecida', 'Metropolitan Cathedral of Saint Sebastian (Rio)'],
      de: ['Basilika Unserer Lieben Frau von Aparecida', 'Kathedrale von Rio de Janeiro']
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
    history: {
      concise: {
        tr: 'Olmec, Maya ve Aztek gibi görkemli medeniyetlerin yurdu olan Meksika, 1810’da bağımsızlık ateşini yakmış, zengin gastronomi ve arkeoloji merkezidir.',
        en: 'Cradle of Maya, Aztec, and Zapotec civilizations, Mexico declared independence in 1810, flourishing as a cultural and industrial manufacturing titan.',
        de: 'Wiege der Maya- und Aztekenkultur, erkämpfte Mexiko 1810 die Unabhängigkeit und ist ein globales Zentrum für Archäologie und Küche.'
      },
      milestones: {
        tr: ['1325: Aztek Başkenti Tenochtitlan’ın Kuruluşu', '1810: Miguel Hidalgo’nun Dolores Çığlığı (Grito de Dolores) ile Bağımsızlık', '1910: Emiliano Zapata ve Pancho Villa ile Meksika Devrimi'],
        en: ['1325: Aztec foundation of Tenochtitlan', '1810: Miguel Hidalgo issues Cry of Dolores for independence', '1910: Mexican Revolution ushers in modern social constitution'],
        de: ['1325: Gründung von Tenochtitlan durch die Azteken', '1810: Grito de Dolores leitet Unabhängigkeit ein', '1910: Mexikanische Revolution']
      }
    },
    sacredSites: {
      tr: ['Guadalupe Meryem Ana Bazilikası (Dünyanın en çok ziyaret edilen Katolik türbesi)', 'Mexico City Metropolitan Katedrali'],
      en: ['Basilica of Our Lady of Guadalupe (Most visited Catholic shrine)', 'Mexico City Metropolitan Cathedral'],
      de: ['Basilika Unserer Lieben Frau von Guadalupe', 'Kathedrale von Mexiko-Stadt']
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
      tr: ['Kral Abdülaziz El Suud (Modern Krallığın Kurucusu)', 'Kral Faysal bin Abdülaziz (Tarihi Reformcu)', 'Muhammed bin Selman (Vizyon 2030 Mimarı)'],
      en: ['King Abdulaziz Al Saud (Founder of Modern Kingdom)', 'King Faisal bin Abdulaziz (Statesman)', 'Mohammed bin Salman (Vision 2030 Architect)'],
      de: ['König Abdulaziz Al Saud (Staatsgründer)', 'König Faisal', 'Mohammed bin Salman (Vision 2030)']
    },
    history: {
      concise: {
        tr: 'İslam’ın iki kutsal şehri Mekke ve Medine’ye ev sahipliği yapan Suudi Arabistan, 1932’de Kral Abdülaziz tarafından birleştirilmiş, küresel enerji ve Vizyon 2030 dönüşümünün merkezidir.',
        en: 'Custodians of Mecca and Medina, Saudi Arabia was unified in 1932 by King Abdulaziz, driving global energy markets and the Vision 2030 economic transformation.',
        de: 'Heimat der heiligen Stätten Mekka und Medina, wurde Saudi-Arabien 1932 geeint und treibt mit der Vision 2030 einen historischen Wandel voran.'
      },
      milestones: {
        tr: ['1744: İlk Suudi Devleti’nin Diriye’de Kuruluşu', '1932: Kral Abdülaziz El Suud ile Suudi Arabistan Krallığı’nın Birleşmesi', '1938: Dammam No. 7 Kuyusunda Ticari Petrol Keşfi'],
        en: ['1744: First Saudi State founded in Diriyah', '1932: Unification of the Kingdom of Saudi Arabia under Abdulaziz', '1938: Discovery of commercial oil at Dammam Well No. 7'],
        de: ['1744: Gründung des ersten saudischen Staates in Diriyya', '1932: Vereinigung des Königreichs Saudi-Arabien', '1938: Erster großer Erdölfund in Dammam']
      }
    },
    sacredSites: {
      tr: ['Mescid-i Haram & Kabe (Mekke)', 'Mescid-i Nebevi & Yeşil Kubbe (Medine)'],
      en: ['Masjid al-Haram & Kaaba (Mecca)', 'Al-Masjid an-Nabawi (Medina)'],
      de: ['Al-Haram-Moschee (Mekka)', 'Prophetenmoschee (Medina)']
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
    history: {
      concise: {
        tr: '5.000 yıllık kesintisiz medeniyete ve felsefe mirasına sahip olan Çin, İpek Yolu’ndan modern teknoloji ve hızlı tren ağına kadar dünyanın en büyük sanayi devidir.',
        en: 'Boasting 5,000 years of continuous civilization, China unified under Qin Shi Huang and transformed over recent decades into the world’s manufacturing and tech powerhouse.',
        de: 'Mit einer 5.000-jährigen Zivilisationsgeschichte entwickelte sich China zum weltweit führenden Industrie- und Hochtechnologiestandort.'
      },
      milestones: {
        tr: ['M.Ö. 221: Çin Şi Huang Tarafından Çin’in İlk Kez Birleştirilmesi ve Seddin İnşası', '1911: Çing Hanedanı’nın Sonu ve Sun Yat-sen ile Cumhuriyet', '1978: Deng Şiaoping ile Reform ve Dışa Açılma Dönemi'],
        en: ['221 BC: Qin Shi Huang unifies China & starts Great Wall', '1911: Xinhai Revolution ends imperial rule under Sun Yat-sen', '1978: Deng Xiaoping launches historic reform and opening up'],
        de: ['221 v. Chr.: Einigung Chinas unter Qin Shi Huang', '1911: Ende der Kaiserzeit durch Sun Yat-sen', '1978: Reform- und Öffnungspolitik unter Deng Xiaoping']
      }
    },
    sacredSites: {
      tr: ['Cennet Tapınağı (Tiantan - Pekin)', 'Lhasa Potala Sarayı & Jokhang Tapınağı (Tibet)'],
      en: ['Temple of Heaven (Tiantan - Beijing)', 'Potala Palace & Jokhang Temple (Lhasa, Tibet)'],
      de: ['Himmelstempel (Peking)', 'Potala-Palast (Lhasa, Tibet)']
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
    history: {
      concise: {
        tr: 'Veda metinlerinden Babür saraylarına uzanan Hindistan, Mahatma Gandhi önderliğindeki şiddetsiz bağımsızlık mücadelesiyle 1947’de özgürlüğüne kavuşmuş, dünyanın en kalabalık demokrasisidir.',
        en: 'From ancient Vedic philosophy to Mughal architecture, India achieved independence in 1947 through Mahatma Gandhi’s nonviolent movement, rising as a global tech powerhouse.',
        de: 'Aus uralter vedischer Philosophie und dem Mogulreich hervorgegangen, erlangte Indien 1947 die Freiheit und ist die größte Demokratie der Erde.'
      },
      milestones: {
        tr: ['M.Ö. 300: Maurya İmparatoru Aşoka ve Budizm’in Yayılması', '1526: Babür Şah ile Babür İmparatorluğu ve Altın Çağ', '1947: Mahatma Gandhi ve Jawaharlal Nehru ile Bağımsızlık İlanı'],
        en: ['300 BC: Emperor Ashoka adopts Dharma & spreads Buddhism', '1526: Babur establishes Mughal Empire in India', '1947: Independence from British rule led by Gandhi and Nehru'],
        de: ['300 v. Chr.: Kaiser Ashoka verbreitet den Buddhismus', '1526: Babur gründet das Mogulreich', '1947: Unabhängigkeit unter Mahatma Gandhi und Nehru']
      }
    },
    sacredSites: {
      tr: ['Varanasi Kashi Vishwanath Tapınağı (Ganj Nehri Kıyısı)', 'Amritsar Altın Tapınağı (Sih Dininin En Kutsal Mabedi)'],
      en: ['Kashi Vishwanath Shiva Temple (Varanasi)', 'Golden Temple of Amritsar (Harmandir Sahib)'],
      de: ['Kashi-Vishwanath-Tempel (Varanasi)', 'Goldener Tempel von Amritsar']
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
    history: {
      concise: {
        tr: 'Orta Çağ Nemanjić hanedanından doğan Sırbistan, Osmanlı ve Yugoslavya dönemlerinin ardından Belgrad merkezli bağımsız, dinamik bir Balkan kültür merkezidir.',
        en: 'Rooted in the medieval Nemanjić dynasty, Serbia weathered centuries of crossroads conflict to emerge as a vibrant Danube and Balkan tech cultural center.',
        de: 'Aus der mittelalterlichen Nemanjić-Dynastie hervorgegangen, bildet Serbien heute das lebendige Herz des westlichen Balkans an Donau und Save.'
      },
      milestones: {
        tr: ['1217: Kral Stefan Prvovenčani ve Sırp Krallığı', '1804: Kara Yorgi Önderliğinde Birinci Sırp Ayaklanması', '1878: Berlin Kongresi ile Tam Bağımsızlık'],
        en: ['1217: Coronation of Stefan the First-Crowned', '1804: First Serbian Uprising led by Karađorđe', '1878: Congress of Berlin recognizes full independence'],
        de: ['1217: Krönung von Stefan dem Erstgekrönten', '1804: Erster Serbischer Aufstand unter Karađorđe', '1878: Berliner Kongress bestätigt Unabhängigkeit']
      }
    },
    sacredSites: {
      tr: ['Aziz Sava Katedrali (Belgrad)', 'Studenica Manastırı (UNESCO 12. yy)'],
      en: ['Temple of Saint Sava (Belgrade)', 'Studenica Monastery (UNESCO 12th Century)'],
      de: ['Dom des Heiligen Sava (Belgrad)', 'Kloster Studenica (UNESCO)']
    },
    sectors: ['Yazılım ve IT Dış Kaynak Hizmetleri', 'Tarım ve Ahududu İhracatı (Dünya liderlerinden)', 'Otomotiv Yan Sanayii ve Madencilik']
  },

  // Karadağ
  ME: {
    landmarks: {
      tr: ['Kotor Körfezi & Surlar İçindeki Orta Çağ Kenti (UNESCO Fiyordu)', 'Budva Eski Şehir & Sveti Stefan Yarımadası', 'Durmitor Milli Parkı & Tara Kanyonu (Avrupa’nın en derin kanyonu)', 'Ostrog Manastırı (Uçurum kayalıklarına oyulmuş mucizevi türbe)', 'Skadar Gölü Milli Parkı (Balkanların en büyük gölü)'],
      en: ['Bay of Kotor & Medieval Walled City (UNESCO Fjord)', 'Budva Old Town & Sveti Stefan Luxury Islet', 'Durmitor National Park & Tara River Canyon (Deepest in Europe)', 'Ostrog Monastery (Cliffside Pilgrimage Wonder)', 'Lake Skadar National Park'],
      de: ['Bucht von Kotor & historische Altstadt (UNESCO)', 'Altstadt von Budva & Insel Sveti Stefan', 'Durmitor-Nationalpark & Tara-Schlucht', 'Felsenkloster Ostrog', 'Skutarisee']
    },
    figures: {
      tr: ['I. Petar Petrović-Njegoš (Prens-Piskopos ve Hukukçu)', 'Petar II Petrović-Njegoš (Dağ Çelengi Destanı Şairi)', 'Kral Nikola I (Karadağ’ın Tek Kralı)', 'Stefan Savić (Milli Futbol Kaptanı)'],
      en: ['Petar I Petrović-Njegoš (Prince-Bishop & Saint)', 'Petar II Petrović-Njegoš (Poet Philosopher - The Mountain Wreath)', 'King Nikola I (Only King of Montenegro)', 'Stefan Savić (Football Captain)'],
      de: ['Petar I. Petrović-Njegoš (Fürstbischof)', 'Petar II. Petrović-Njegoš (Dichter & Philosoph)', 'König Nikola I.', 'Stefan Savić (Fußballstar)']
    },
    history: {
      concise: {
        tr: 'Adriyatik’in dramatik fiyord benzeri koyları ve kanyonlarına sahip Karadağ, 1878 Berlin Kongresi ile tanınmış, 2006’da bağımsızlığını yeniden ilan etmiştir.',
        en: 'Nestled between dramatic Adriatic fjords and alpine peaks, Montenegro preserved autonomy for centuries, reclaiming independence in 2006.',
        de: 'Zwischen dramatischen Adriabuchten und alpinen Canyons gelegen, bewahrte Montenegro seine Unabhängigkeit und erlangte 2006 die Souveränität zurück.'
      },
      milestones: {
        tr: ['1493: Crnojević Matbaası ile İlk Kiril Kitabının Basılması', '1878: Berlin Kongresi ile Bağımsızlığın Tanınması', '2006: Bağımsızlık Referandumu ve Egemenlik'],
        en: ['1493: Crnojević printing press publishes first Cyrillic book', '1878: Congress of Berlin recognizes independence', '2006: Independence referendum successfully restores statehood'],
        de: ['1493: Erste kyrillische Druckerei in Cetinje', '1878: Berliner Kongress bestätigt Unabhängigkeit', '2006: Unabhängigkeitsreferendum']
      }
    },
    sacredSites: {
      tr: ['Ostrog Manastırı (Kaya Uçurumu İçine Oyulmuş Kutsal Türbe)', 'Kotor Aziz Tryphon Katedrali'],
      en: ['Ostrog Monastery (Cliffside Miracle Sanctuary)', 'Cathedral of Saint Tryphon in Kotor'],
      de: ['Felsenkloster Ostrog', 'St.-Tryphon-Kathedrale (Kotor)']
    },
    sectors: ['Lüks Yat ve Kıyı Turizmi (Porto Montenegro)', 'Hidroelektrik Enerji İhracatı', 'Alüminyum Eritme', 'Bağcılık ve Vranac Şarapları']
  },

  // Fas
  MA: {
    landmarks: {
      tr: ['Marakeş Jemaa el-Fna Meydanı & Koutoubia Camii', 'Fes el-Bali Tarihi Medinası & Chouara Dericiler Çarşısı (UNESCO)', 'Şafşavan (Chefchaouen) Masalsı Mavi Şehir', 'Sahra Çölü Merzouga Kumulları & Deve Kervanları', 'II. Hasan Camii (Kazablanka - Okyanus kıyısında dünyanın en yüksek minarelerinden)'],
      en: ['Jemaa el-Fnaa & Koutoubia Mosque (Marrakech)', 'Fes el-Bali Historic Medina & Chouara Tannery (UNESCO)', 'Chefchaouen The Blue Pearl Mountain City', 'Sahara Desert Merzouga Sand Dunes', 'Hassan II Mosque over the Atlantic (Casablanca)'],
      de: ['Djemaa el-Fna & Koutoubia-Moschee (Marrakesch)', 'Medina von Fès & Chouara-Gerbereien (UNESCO)', 'Chefchaouen (Blaue Stadt)', 'Merzouga-Wüstendünen in der Sahara', 'Hassan-II.-Moschee (Casablanca)']
    },
    figures: {
      tr: ['İbn Battuta (Tarihin En Büyük Seyyahı - Tanca doğumlu)', 'V. Muhammed (Bağımsızlık Kralı)', 'Fatıma el-Fihri (Dünyanın İlk Üniversitesi Karaviyyin’in Kurucusu)', 'Achraf Hakimi (Milli Futbol Yıldızı)'],
      en: ['Ibn Battuta (Greatest Explorer of the Medieval World)', 'King Mohammed V (Father of Moroccan Independence)', 'Fatima al-Fihri (Founder of the World’s First University Al-Qarawiyyin)', 'Achraf Hakimi (Football Icon)'],
      de: ['Ibn Battūta (Reisender des Mittelalters)', 'König Mohammed V.', 'Fatima al-Fihri (Gründerin der ältesten Universität)', 'Achraf Hakimi (Fußballstar)']
    },
    history: {
      concise: {
        tr: '789 yılında İdrisi Hanedanı ile kurulan Fas Krallığı, Mağrip ve Endülüs mimarisinin zirvesi olup Atlas Dağları ve Sahra Çölü boyunca uzanan zengin bir krallıktır.',
        en: 'Founded in 789 by Idris I, Morocco merged Berber and Andalusian heritage, remaining one of Africa’s oldest continuous monarchies and maritime gateways.',
        de: '789 von Idris I. begründet, vereinte Marokko andalusische und berberische Kultur und bildet eine der ältesten Monarchien Afrikas.'
      },
      milestones: {
        tr: ['789: I. İdris Tarafından Fas Devleti’nin Kuruluşu', '859: Karaviyyin Üniversitesi’nin (Dünyanın en eski üniversitesi) Kuruluşu', '1956: V. Muhammed Önderliğinde Bağımsızlık İlanı'],
        en: ['789: Idris I founds the first Moroccan Islamic state', '859: University of al-Qarawiyyin established in Fes', '1956: Independence restored under King Mohammed V'],
        de: ['789: Gründung durch Idris I.', '859: Gründung der Universität al-Qarawiyyin', '1956: Unabhängigkeit unter König Mohammed V.']
      }
    },
    sacredSites: {
      tr: ['II. Hasan Camii (Kazablanka - Okyanus Üzerindeki Minare)', 'Karaviyyin Camii ve Üniversitesi (Fes)'],
      en: ['Hassan II Mosque over the Atlantic (Casablanca)', 'Al-Qarawiyyin Mosque and University (Fes)'],
      de: ['Hassan-II.-Moschee (Casablanca)', 'Al-Qarawiyyin-Moschee (Fès)']
    },
    sectors: ['Fosfat Madenciliği ve Gübre (Dünya Rezervlerinin %70’i)', 'Kültür, Çöl ve Kıyı Turizmi', 'Otomotiv ve Havacılık Montaj Sanayii (Tanca)', 'Argan Yağı ve Tarımsal İhracat']
  },

  // Kosta Rika
  CR: {
    landmarks: {
      tr: ['Arenal Yanardağı & Tabacón Jeotermal Sıcak Kaplıcaları', 'Manuel Antonio Milli Parkı & Yağmur Ormanı Plajları', 'Monteverde Sis Ormanı Biyolojik Rezervi & Asma Köprüler', 'Tortuguero Milli Parkı (Deniz Kaplumbağası Koruma Kanalları)', 'Corcovado Milli Parkı (Dünyanın en yoğun biyolojik çeşitlilik alanı)'],
      en: ['Arenal Volcano & Tabacón Geothermal Hot Springs', 'Manuel Antonio National Park & Rainforest Beaches', 'Monteverde Cloud Forest Biological Reserve & Hanging Bridges', 'Tortuguero Sea Turtle Waterways', 'Corcovado National Park (National Geographic’s biologically intense zone)'],
      de: ['Vulkan Arenal & Tabacón Thermalquellen', 'Manuel-Antonio-Nationalpark', 'Nebelwaldreservat Monteverde', 'Tortuguero-Nationalpark (Schildkrötenkanäle)', 'Corcovado-Nationalpark']
    },
    figures: {
      tr: ['José Figueres Ferrer (Orduyu lağveden efsanevi devlet başkanı)', 'Óscar Arias Sánchez (Nobel Barış Ödülü sahibi cumhurbaşkanı)', 'Franklin Chang Díaz (NASA Astronotu & Fizikçi)', 'Keylor Navas (Şampiyonlar Ligi Şampiyonu Kaleci)'],
      en: ['José Figueres Ferrer (President who abolished the military in 1948)', 'Óscar Arias Sánchez (Nobel Peace Prize Laureate)', 'Franklin Chang Díaz (NASA Astronaut & Physicist)', 'Keylor Navas (Legendary Goalkeeper)'],
      de: ['José Figueres Ferrer (schaffte 1948 das Militär ab)', 'Óscar Arias Sánchez (Friedensnobelpreisträger)', 'Franklin Chang Díaz (Astronaut)', 'Keylor Navas (Torwart)']
    },
    history: {
      concise: {
        tr: '1948 yılında ordusunu lağveden Kosta Rika, barışçıl demokrasisi ve topraklarının %25’ini korunan milli park ilan eden eko-vizyonuyla dünyanın en yeşil ülkesidir.',
        en: 'Abolishing its army in 1948 to invest in education, Costa Rica pioneered global ecotourism, protecting over 25% of its land as national parks.',
        de: 'Costa Rica schaffte 1948 sein Militär ab und wurde mit über 25% geschützter Landesfläche zum weltweiten Vorreiter für nachhaltigen Ökotourismus.'
      },
      milestones: {
        tr: ['1821: Orta Amerika Bağımsızlık İlanı', '1948: Jose Figueres Ferrer Tarafından Ordunun Anayasal Olarak Kaldırılması', '1987: Oscar Arias Sánchez’e Nobel Barış Ödülü Verilmesi'],
        en: ['1821: Independence of Central America declared', '1948: Constitutional abolition of the armed forces', '1987: Oscar Arias Sánchez receives Nobel Peace Prize'],
        de: ['1821: Unabhängigkeit Zentralamerikas', '1948: Verfassungsmäßige Abschaffung des Militärs', '1987: Friedensnobelpreis für Óscar Arias Sánchez']
      }
    },
    sacredSites: {
      tr: ['Melekler Meryemi Bazilikası (Cartago - Siyah Meryem Heykeli)'],
      en: ['Basilica of Our Lady of the Angels (Cartago)'],
      de: ['Basílica de Nuestra Señora de los Ángeles (Cartago)']
    },
    sectors: ['Sürdürülebilir Eko-Turizm ve Macera Seyahati', 'Tıbbi Cihazlar ve Biyomedikal İmalatı', 'Yüksek Kalite Özel Kahve (Tarrazú Arabica)', 'Muz ve Ananas İhracatı (Dünya 1.si)']
  },

  // Bolivya
  BO: {
    landmarks: {
      tr: ['Salar de Uyuni (Dünyanın en büyük tuz gölü & gökyüzü aynası)', 'La Paz Teleferik Ağı (Mi Teleférico - Dünyanın en yüksek kentsel teleferiği)', 'Titicaca Gölü & Güneş Adası (İnka mitolojisinin doğum yeri)', 'Madidi Milli Parkı & Amazon Havzası', 'Potosí Gümüş Madeni Dağı (Cerro Rico - UNESCO)'],
      en: ['Salar de Uyuni (World’s largest salt flat & mirror)', 'La Paz Mi Teleférico (World’s highest urban cable car transit)', 'Lake Titicaca & Isla del Sol (Inca Birthplace)', 'Madidi National Park (Amazonian biodiversity)', 'Cerro Rico Silver Mountain of Potosí (UNESCO)'],
      de: ['Salar de Uyuni Salzwüste', 'Seilbahnnetz Mi Teleférico in La Paz', 'Titicacasee & Isla del Sol', 'Madidi-Nationalpark (Amazonas)', 'Silberberg Cerro Rico in Potosí']
    },
    figures: {
      tr: ['Simón Bolívar (Ülkeye adını veren Kurtarıcı)', 'Antonio José de Sucre (İlk Anayasal Devlet Başkanı)', 'Evo Morales (İlk Yerli Aymara Kökenli Cumhurbaşkanı)', 'Marco Etcheverry (Futbol Efsanesi)'],
      en: ['Simón Bolívar (El Libertador - Namesake of the Nation)', 'Antonio José de Sucre (First Constitutional President)', 'Evo Morales (First Indigenous President)', 'Marco Etcheverry (Football Star)'],
      de: ['Simón Bolívar (Namensgeber)', 'Antonio José de Sucre (Staatsmann)', 'Evo Morales (erster indigener Präsident)', 'Marco Etcheverry']
    },
    history: {
      concise: {
        tr: 'And Dağları ile Amazon havzası arasında yükselen Bolivya, İnka ve Aymara yerli kültürlerini yaşatan, adını kurtarıcı Simón Bolívar’dan almış yüksek irtifa cumhuriyetidir.',
        en: 'Perched in the high Andes, Bolivia honors ancient Aymara and Quechua traditions and holds the world’s largest lithium reserves in Uyuni.',
        de: 'Hoch in den Anden gelegen, bewahrt Bolivien reiche indigene Aymara- und Quechua-Kulturen und besitzt im Salar de Uyuni riesige Lithiumvorkommen.'
      },
      milestones: {
        tr: ['1545: Potosí Zengin Tepesi’nde (Cerro Rico) Dünyanın En Büyük Gümüş Keşfi', '1825: Antonio José de Sucre ile Bağımsızlık', '2009: Çok Uluslu Bolivya Devleti Anayasası'],
        en: ['1545: Discovery of Cerro Rico silver in Potosí', '1825: Independence under Sucre & Bolívar', '2009: Constitution proclaims the Plurinational State of Bolivia'],
        de: ['1545: Entdeckung des Silberschatzes von Potosí', '1825: Unabhängigkeit unter Bolívar & Sucre', '2009: Verfassung des Plurinationalen Staates Bolivien']
      }
    },
    sacredSites: {
      tr: ['Copacabana Meryem Ana Bazilikası (Titicaca Gölü Kıyısı)', 'Tiwanaku Güneş Kapısı (M.Ö. 1500 İnka Öncesi Kutsal Tapınak)'],
      en: ['Basilica of Our Lady of Copacabana (Lake Titicaca)', 'Tiwanaku Gate of the Sun (Pre-Inca Temple)'],
      de: ['Basilika von Copacabana', 'Sonnentor von Tiwanaku']
    },
    sectors: ['Lityum Madenciliği (Dünya Rezervlerinin Zirvesi - Uyuni)', 'Doğal Gaz İhracatı', 'Kinoa ve Tarımsal İhracat', 'Gümüş, Çinko ve Kalay Madenciliği']
  },

  // Botsvana
  BW: {
    landmarks: {
      tr: ['Okavango Deltası (Dünyanın denize dökülmeyen en büyük iç deltası - UNESCO)', 'Chobe Milli Parkı (Dünyanın en yoğun fil nüfusu)', 'Kalahari Çölü & San Buşmanları Kültürü', 'Makgadikgadi Tuz Tavaları & Mirket Kolonileri', 'Tsodilo Tepeleri (Kalahari’nin Louvresi - 4.500 kaya resmi)'],
      en: ['Okavango Delta (Inland wetland paradise UNESCO)', 'Chobe National Park (Highest elephant concentration on Earth)', 'Central Kalahari Desert & San Bushmen Heritage', 'Makgadikgadi Salt Pans & Meerkats', 'Tsodilo Hills Rock Art (UNESCO)'],
      de: ['Okavangodelta (UNESCO Binnendelta)', 'Chobe-Nationalpark (Größte Elefantenpopulation der Erde)', 'Kalahari-Wüste & San-Kultur', 'Makgadikgadi-Salzpfannen', 'Tsodilo-Hügel Felsmalereien']
    },
    figures: {
      tr: ['Sir Seretse Khama (Botsvana’nın Kurucu Devlet Başkanı ve Demokrasi Mimarı)', 'Quett Masire (Ekonomik Başarının Mimarı)', 'Amantle Montsho (Dünya Şampiyonu Atlet)', 'Letsile Tebogo (Olimpiyat 200m Şampiyonu Rekortmen)'],
      en: ['Sir Seretse Khama (Founding Father & Visionary President)', 'Quett Masire (Economic Miracle Architect)', 'Amantle Montsho (World Champion Sprinter)', 'Letsile Tebogo (Olympic 200m Gold Medalist)'],
      de: ['Sir Seretse Khama (Gründungsvater)', 'Quett Masire (Präsident)', 'Amantle Montsho (Sprinterin)', 'Letsile Tebogo (Olympiasieger 200m)']
    },
    history: {
      concise: {
        tr: '1966 bağımsızlığında dünyanın en yoksul ülkelerinden biriyken elmas gelirlerini şeffafça eğitime ve sağlığa harcayarak Afrika’nın en istikrarlı demokrasisi ve refah modeli olmuştur.',
        en: 'From poverty at 1966 independence, Botswana prudently channeled diamond revenues into education and healthcare, creating Africa’s most stable democratic success story.',
        de: '1966 als eines der ärmsten Länder unabhängig geworden, wandelte sich Botsuana durch Diamantenfunde in die stabilste Vorzeigedemokratie Afrikas.'
      },
      milestones: {
        tr: ['1966: Seretse Khama Önderliğinde Bağımsızlık', '1967: Orapa Elmas Madeni’nin Keşfi', '2000+: Yaban Hayatını Koruma Odaklı Eko-Turizm Modeli'],
        en: ['1966: Independence led by Seretse Khama', '1967: Discovery of diamond kimberlite pipes at Orapa', '2000+: Pioneer in high-value, low-impact wildlife ecotourism'],
        de: ['1966: Unabhängigkeit unter Seretse Khama', '1967: Entdeckung der Diamantenminen von Orapa', '2000+: Vorreiter im nachhaltigen Safari-Tourismus']
      }
    },
    sacredSites: {
      tr: ['Tsodilo Tepeleri (Kalahari’nin Sanatı - 4.500 Kaya Resmiyle Tanrıların Dağı)'],
      en: ['Tsodilo Hills (Sacred Mountain of the Gods - 4,500 Rock Paintings)'],
      de: ['Tsodilo-Hügel (Heilige Berge der Götter - UNESCO)']
    },
    sectors: ['Değerli Elmas Madenciliği (Debswana - Dünyanın Değerce 1.si)', 'Lüks Vahşi Yaşam ve Safari Turizmi', 'Sığır Eti ve Hayvancılık İhracatı (AB Onaylı)', 'Bakır ve Nikel Madenciliği']
  },

  // Fiji
  FJ: {
    landmarks: {
      tr: ['Mamanuca & Yasawa Mercan Adaları (Cast Away film seti)', 'Taveuni Adası (Bahçe Ada & Bouma Şelaleleri)', 'Suva Fiji Müzesi & Thurston Bahçeleri', 'Beqa Lagünü Köpekbalığı Resifi Dalışı', 'Sigatoka Kum Tepeleri Milli Parkı'],
      en: ['Mamanuca & Yasawa Islands (Cast Away filming location)', 'Taveuni Island (Garden Isle & Bouma Waterfalls)', 'Fiji Museum & Thurston Gardens (Suva)', 'Beqa Lagoon Tiger Shark Reef Dive', 'Sigatoka Sand Dunes National Park'],
      de: ['Mamanuca- & Yasawa-Inseln', 'Taveuni (Garteninsel & Bouma-Wasserfälle)', 'Fiji Museum in Suva', 'Beqa-Lagune Hai-Tauchgänge', 'Sigatoka-Sanddünen']
    },
    figures: {
      tr: ['Ratu Sir Lala Sukuna (Modern Fiji’nin Öncü Devlet Adamı)', 'Waisale Serevi (Yedili Ragbi Tarihinin En Büyük Oyuncusu - "Ragbinin Sihirbazı")', 'Vijay Singh (Masters Şampiyonu Dünya 1.si Golfçü)'],
      en: ['Ratu Sir Lala Sukuna (Statesman & Architect of Modern Fiji)', 'Waisale Serevi (King of Rugby Sevens)', 'Vijay Singh (World No. 1 Major Golf Champion)'],
      de: ['Ratu Sir Lala Sukuna (Staatsmann)', 'Waisale Serevi (Rugby-Legende)', 'Vijay Singh (Golf-Weltstar)']
    },
    history: {
      concise: {
        tr: '330 adadan oluşan Fiji, geleneksel Bula ruhu, kava törenleri ve kabile meclisleriyle Pasifik Okyanusu’nun en sıcakkanlı ada cumhuriyetidir.',
        en: 'Archipelago of 330 islands, Fiji blends Melanesian and Polynesian traditions with warm Bula hospitality and rugby world dominance.',
        de: 'Aus 330 Inseln bestehend, vereint Fidschi melanesische und polynesische Kultur mit herzlicher Bula-Gastfreundschaft und Rugby-Triumphen.'
      },
      milestones: {
        tr: ['1874: İngiltere Tacına Katılım', '1970: Bağımsızlık İlanı', '2016: Rio Olimpiyatları’nda Yedili Ragbi ile Tarihin İlk Altın Madalyası'],
        en: ['1874: Deed of Cession to the British Crown', '1970: Proclamation of Independence', '2016: Wins first-ever Olympic Gold Medal in Rugby Sevens'],
        de: ['1874: Abtretungsurkunde an die britische Krone', '1970: Unabhängigkeitserklärung', '2016: Erstes olympisches Gold im 7er-Rugby']
      }
    },
    sacredSites: {
      tr: ['Sri Siva Subramaniya Tapınağı (Nadi - Güney Yarımkürenin En Büyük Hindu Mabedi)'],
      en: ['Sri Siva Subramaniya Swami Temple (Nadi - Largest in Southern Hemisphere)'],
      de: ['Sri-Siva-Subramaniya-Tempel in Nadi']
    },
    sectors: ['Lüks Ada Turizmi ve Balayı Tatilleri', 'Fiji Water Mineralli Kaynak Suyu İhracatı', 'Şeker Kamışı ve Melas Üretimi', 'Ton Balığı Balıkçılığı']
  },

  // Vanuatu
  VU: {
    landmarks: {
      tr: ['Yasur Yanardağı (Tanna Adası - Dünyanın en erişilebilir aktif yanardağı)', 'Espiritu Santo Champagne Sahili & Mavi Delikler', 'Pentecost Adası Kara Dalışı (Naghol - Bungee Jumping’in doğuş yeri)', 'Port Vila Mele Şelaleleri', 'SS President Coolidge Batığı (Dünyanın en büyük dalış batığı)'],
      en: ['Mount Yasur Volcano (Tanna - World’s most accessible active volcano)', 'Champagne Beach & Blue Holes (Espiritu Santo)', 'Pentecost Island Land Diving (Naghol - Origin of Bungee)', 'Mele Cascades (Port Vila)', 'SS President Coolidge (World’s largest diveable shipwreck)'],
      de: ['Vulkan Mount Yasur (Tanna)', 'Champagne Beach & Blue Holes (Espiritu Santo)', 'Landtauchen auf Pentecost (Naghol)', 'Mele-Wasserfälle (Port Vila)', 'Wrack der SS President Coolidge']
    },
    figures: {
      tr: ['Walter Lini (Anglikan Rahip ve Vanuatu’nun Kurucu İlk Başbakanı)', 'Grace Mera Molisa (Şair, Feminist ve Bağımsızlık Aktivisti)'],
      en: ['Father Walter Lini (Anglican Priest & Founding Prime Minister)', 'Grace Mera Molisa (Poet, Activist & Cultural Champion)'],
      de: ['Walter Lini (Gründungspremier)', 'Grace Mera Molisa (Dichterin & Bürgerrechtlerin)']
    },
    history: {
      concise: {
        tr: '83 volkanik adadan oluşan Vanuatu, kabile şeflik gelenekleri, aktif Yasur Yanardağı ve kara dalışı (Naghol) geleneğiyle dünyanın en mutlu halklarından biridir.',
        en: 'Archipelago of 83 volcanic islands, Vanuatu honors Kastom tribal autonomy and was famously ranked the World’s Happiest Country on the Happy Planet Index.',
        de: 'Aus 83 Inseln bestehend, bewahrt Vanuatu lebendige Kastom-Stammestraditionen und wurde als glücklichstes Land der Erde ausgezeichnet.'
      },
      milestones: {
        tr: ['1606: Pedro Fernandes de Queirós’un Espiritu Santo’ya Ulaşması', '1980: İngiliz-Fransız Kondominyumundan Bağımsızlık', '2006: Mutlu Gezegen Endeksi’nde (HPI) Dünyanın En Mutlu Ülkesi Seçilmesi'],
        en: ['1606: Queirós sights Espiritu Santo', '1980: Independence from Anglo-French Condominium', '2006: Ranked World’s Happiest Country on Happy Planet Index'],
        de: ['1606: Entdeckung durch Queirós', '1980: Unabhängigkeit vom britisch-französischen Kondominium', '2006: Auszeichnung als glücklichstes Land der Welt']
      }
    },
    sacredSites: {
      tr: ['Yasur Yanardağı Kutsal Krateri (Tanna Adası Kült Alanı)', 'Şef Roi Mata’nın Etki Alanı (UNESCO)'],
      en: ['Mount Yasur Sacred Volcano Crater', 'Chief Roi Mata’s Domain (UNESCO)'],
      de: ['Heiliger Krater des Mount Yasur', 'Häuptling Roi Matas Herrschaftsgebiet (UNESCO)']
    },
    sectors: ['Eko-Turizm ve Macera Dalışı', 'Kava İçeceği İhracatı (Pasifik’in en kaliteli sakinleştirici kökü)', 'Sığır Eti ve Organik Tarım', 'Deniz Ürünleri']
  },

  // Barbados
  BB: {
    landmarks: {
      tr: ['Crane Plajı & Pembe Kumlu Atlantik Kayalıkları', 'Carlisle Koyu Deniz Kaplumbağaları & Batık Resifleri', 'Harrison’s Mağarası Kristal Dikit ve Yeraltı Nehirleri', 'St. Nicholas Abbey Tarihi Rom Damıtımevi ve Buharlı Treni', 'Bridgetown Tarihi Garrison Kalesi (UNESCO)'],
      en: ['The Crane Beach & Dramatic Atlantic Cliffs', 'Carlisle Bay Marine Park (Sea Turtles & Shipwrecks)', 'Harrison’s Cave Underground Crystallized Caverns', 'St. Nicholas Abbey Jacobean Great House & Rum Distillery', 'Historic Bridgetown & Garrison (UNESCO)'],
      de: ['The Crane Beach', 'Carlisle Bay Meerespark (Schildkröten & Wracks)', 'Harrison’s Cave Tropfsteinhöhle', 'St. Nicholas Abbey Rum-Brennerei', 'Historisches Bridgetown (UNESCO)']
    },
    figures: {
      tr: ['Rihanna (Robyn Rihanna Fenty - Küresel Pop İkonu ve Milli Kahraman)', 'Sir Garfield Sobers (Kriket Tarihinin En Büyük All-Round Oyuncusu)', 'Errol Barrow (Bağımsızlığın Mimarı ve İlk Başbakan)'],
      en: ['Rihanna (Global Music Icon, Billionaire Entrepreneur & National Hero)', 'Sir Garfield Sobers (Greatest Cricket All-Rounder of All Time)', 'Errol Barrow (Father of Independence & First Prime Minister)'],
      de: ['Rihanna (Musik-Ikone & Nationalheldin)', 'Sir Garfield Sobers (Cricket-Legende)', 'Errol Barrow (Staatsgründer)']
    },
    history: {
      concise: {
        tr: 'Karayipler’in doğu ucunda yer alan Barbados, 1639’dan bu yana kesintisiz parlamento geleneğini korumuş, 2021’de cumhuriyet ilan etmiş refah adasıdır.',
        en: 'The easternmost Caribbean island, Barbados established the hemisphere’s oldest parliament in 1639 and transitioned into a proud independent republic in 2021.',
        de: 'Östlichste Karibikinsel, besitzt Barbados seit 1639 ein Parlament und erklärte sich 2021 zur unabhängigen Republik.'
      },
      milestones: {
        tr: ['1639: Barbados Temsilciler Meclisi’nin Kuruluşu', '1966: Errol Barrow Önderliğinde Bağımsızlık', '2021: Kraliçe II. Elizabeth’in Devlet Başkanlığından Ayrılması ve Cumhuriyet İlanı'],
        en: ['1639: Establishment of the House of Assembly', '1966: Independence led by Errol Barrow', '2021: Transition to a Parliamentary Republic'],
        de: ['1639: Gründung des Parlaments von Barbados', '1966: Unabhängigkeit unter Errol Barrow', '2021: Ausrufung der Republik']
      }
    },
    sacredSites: {
      tr: ['Bridgetown Aziz Michael Katedrali', 'Nidhe Israel Sinagogu (Batı Yarımkürenin En Eski Sinagoglarından - 1654)'],
      en: ['St. Michael’s Cathedral (Bridgetown)', 'Nidhe Israel Synagogue (Western Hemisphere’s Oldest - 1654)'],
      de: ['St. Michael’s Cathedral', 'Nidhe-Israel-Synagoge (1654)']
    },
    sectors: ['Lüks Karayip Kıyı Turizmi', 'Otantik Rom Damıtımı (Mount Gay - Dünyanın en eski rom üreticisi 1703)', 'Uluslararası Finans ve Şirket Hizmetleri', 'Bilişim ve Dijital Göçebe Vizeleri']
  },

  // İsrail
  IL: {
    landmarks: {
      tr: ['Kudüs Eski Şehir Surları & Ağlama Duvarı (Kotel)', 'Mescid-i Aksa & Kubbetü’s-Sahra (Harem-i Şerif)', 'Kutsal Kabir Kilisesi (Kıyamet Kilisesi - Hristiyanlığın en kutsal mabedi)', 'Tel Aviv Bauhaus Beyaz Şehri (UNESCO) & Gordon Plajı', 'Ölü Deniz (Lut Gölü - Dünyanın en alçak su yüzeyi)', 'Masada Antik Çöl Kalesi'],
      en: ['Jerusalem Old City Walls & Western Wall (Kotel)', 'Temple Mount & Dome of the Rock', 'Church of the Holy Sepulchre (Christianity’s Holiest Site)', 'Tel Aviv Bauhaus White City & Mediterranean Beach Promenade', 'Dead Sea Floating Waters', 'Masada Ancient Desert Fortress'],
      de: ['Altstadt von Jerusalem & Klagemauer', 'Tempelberg & Felsendom', 'Grabeskirche (Heiligste Stätte des Christentums)', 'Tel Aviv Bauhaus Weiße Stadt & Strandpromenade', 'Totes Meer', 'Festung Masada']
    },
    figures: {
      tr: ['Albert Einstein (Kudüs İbrani Üniversitesi Kurucusu & Fizikçi)', 'David Ben-Gurion (Devletin Kurucu Başbakanı)', 'Natalie Portman (Oscar Ödüllü Oyuncu)', 'Yuval Noah Harari (Tarihçi ve Yazar - Sapiens)'],
      en: ['Albert Einstein (Co-founder of Hebrew University & Physicist)', 'David Ben-Gurion (Founding Prime Minister)', 'Natalie Portman (Oscar-winning Actress)', 'Yuval Noah Harari (Historian & Author of Sapiens)'],
      de: ['Albert Einstein (Physiker & Mitgründer der Hebräischen Universität)', 'David Ben-Gurion (Staatsgründer)', 'Natalie Portman (Schauspielerin)', 'Yuval Noah Harari (Historiker)']
    },
    history: {
      concise: {
        tr: 'Üç semavi dinin kesiştiği kadim topraklarda yer alan İsrail, 1948’de kurulmuş, yüksek teknoloji inovasyonu ve çöl tarımıyla öne çıkan küresel start-up merkezidir.',
        en: 'Centuries of biblical history converge in Israel, which declared statehood in 1948 and became a global innovation and venture capital power (Silicon Wadi).',
        de: 'Schnittpunkt dreier Weltreligionen, wurde Israel 1948 gegründet und stieg als "Start-up Nation" zu einem der führenden Hightech-Zentren der Welt auf.'
      },
      milestones: {
        tr: ['M.Ö. 1000: Kral Davud’un Kudüs’ü Başkent Yapması', '1948: David Ben-Gurion ile Bağımsızlık İlanı', '1990+: Start-Up Ulusu ve Silikon Vadisi Teknolojik Atılımı'],
        en: ['1000 BC: King David establishes Jerusalem as capital', '1948: Declaration of the State of Israel by David Ben-Gurion', '1990+: Rise of the "Start-Up Nation" high-tech ecosystem'],
        de: ['1000 v. Chr.: König David macht Jerusalem zur Hauptstadt', '1948: Staatsgründung durch David Ben-Gurion', '1990+: Aufstieg zur "Start-up Nation"']
      }
    },
    sacredSites: {
      tr: ['Ağlama Duvarı (Batı Duvarı - Kudüs)', 'Kutsal Kabir Kilisesi (Kıyamet Kilisesi)'],
      en: ['Western Wall (Kotel in Jerusalem)', 'Church of the Holy Sepulchre'],
      de: ['Klagemauer (Jerusalem)', 'Grabeskirche']
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
    history: {
      concise: {
        tr: 'Taino yerlilerinin yurdu olan Jamaika, Bob Marley’in reggae müziği, atletizm rekorları ve Blue Mountains kahvesiyle Karayipler’in kültür bayraktarıdır.',
        en: 'Homeland of the Taíno people, Jamaica gained independence in 1962, gifting the world reggae music, Olympic sprint royalty, and Blue Mountain coffee.',
        de: 'Heimat der Taíno-Kultur, erlangte Jamaika 1962 die Unabhängigkeit und prägte mit Reggae-Musik und Sprint-Weltrekorden die globale Kultur.'
      },
      milestones: {
        tr: ['1655: İngiliz Fethi', '1962: Alexander Bustamante Önderliğinde Bağımsızlık', '1970+: Reggae ve Rastafari Kültürünün Küresel Miras Oluşu'],
        en: ['1655: British capture of Jamaica', '1962: Independence achieved under Sir Alexander Bustamante', '1970+: Reggae and Rastafari become recognized UNESCO global heritage'],
        de: ['1655: Britische Eroberung', '1962: Unabhängigkeit unter Alexander Bustamante', '1970+: Reggae wird UNESCO-Weltkulturerbe']
      }
    },
    sacredSites: {
      tr: ['Kutsal Teslis Katedrali (Kingston)', 'Bob Marley Evi ve Kültür Mabedi'],
      en: ['Holy Trinity Cathedral (Kingston)', 'Bob Marley Mausoleum & Culture Sanctuary (Nine Mile)'],
      de: ['Holy Trinity Cathedral (Kingston)', 'Bob Marley Mausoleum (Nine Mile)']
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
    history: {
      concise: {
        tr: 'Karayipler’in incisi Küba, İspanyol kolonyal mimarisi, klasik otomobilleri, tütün tarlaları ve José Martí’den devrime uzanan tarihiyle benzersizdir.',
        en: 'The Pearl of the Antilles, Cuba achieved independence in 1902, famed for its vintage cars, son cubano music, and world-renowned organic cigars.',
        de: 'Als Perle der Antillen berühmt für Kolonialarchitektur, Oldtimer und Musik, erlangte Kuba 1902 die Unabhängigkeit.'
      },
      milestones: {
        tr: ['1492: Kristof Kolomb’un Adaya Ulaşması', '1902: İspanya ve ABD Sonrası Bağımsızlık', '1959: Küba Devrimi'],
        en: ['1492: Christopher Columbus lands in Cuba', '1902: Independence formally declared', '1959: Triumph of the Cuban Revolution'],
        de: ['1492: Ankunft von Christoph Kolumbus', '1902: Unabhängigkeitserklärung', '1959: Sieg der kubanischen Revolution']
      }
    },
    sacredSites: {
      tr: ['Havana Katedrali (San Cristóbal de la Habana)', 'El Cobre Hayırseverlik Meryemi Ulusal Mabedi'],
      en: ['Havana Cathedral (San Cristóbal)', 'National Shrine Basilica of Our Lady of Charity of El Cobre'],
      de: ['Kathedrale von Havanna', 'Basílica de Nuestra Señora del Cobre']
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
    history: {
      concise: {
        tr: 'Semerkant, Buhara ve Hiva gibi İpek Yolu’nun efsanevi vahalarına ev sahipliği yapan Özbekistan, Timur İmparatorluğu ve İslam bilginlerinin altın çağı merkezidir.',
        en: 'Crossroads of the Silk Road through Samarkand, Bukhara, and Khiva, Uzbekistan was the heart of the Timurid Renaissance and Islamic mathematics.',
        de: 'Kreuzungspunkt der Seidenstraße mit Samarkand, Buchara und Chiwa, bildete Usbekistan das Zentrum der Timuridischen Renaissance.'
      },
      milestones: {
        tr: ['1370: Emir Timur’un Semerkant’ı Başkent Yapması', '1428: Uluğ Bey Rasathanesi’nin İnşası', '1991: Özbekistan Cumhuriyeti’nin Bağımsızlık İlanı'],
        en: ['1370: Amir Timur crowns Samarkand as imperial capital', '1428: Construction of Ulugh Beg’s Astronomical Observatory', '1991: Independence of the Republic of Uzbekistan declared'],
        de: ['1370: Timur macht Samarkand zur Reichshauptstadt', '1428: Bau des Observatoriums von Ulugh Beg', '1991: Unabhängigkeit der Republik Usbekistan']
      }
    },
    sacredSites: {
      tr: ['Gur-i Emir Türbesi (Semerkant)', 'Buhara Po-i Kalyan Kompleksi'],
      en: ['Gur-e-Amir Mausoleum (Samarkand)', 'Po-i-Kalyan Complex (Bukhara)'],
      de: ['Gur-Emir-Mausoleum (Samarkand)', 'Po-i-Kalyan-Komplex (Buchara)']
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
    history: {
      concise: {
        tr: 'Hazar Denizi kıyısında Odlar Yurdu olarak anılan Azerbaycan, Şirvanşahlar ve Hanlıklar döneminin ardından 1918’de Doğu’nun ilk demokratik cumhuriyetini kurmuştur.',
        en: 'The Land of Fire along the Caspian Sea, Azerbaijan established the East’s first secular democratic republic in 1918, blossoming into an energy and cultural hub.',
        de: 'Als Land des Feuers am Kaspischen Meer gründete Aserbaidschan 1918 die erste säkulare Republik der islamischen Welt.'
      },
      milestones: {
        tr: ['1918: Mehmet Emin Resulzade ile Doğu’nun İlk Demokratik Cumhuriyeti', '1991: Bağımsızlığın Yeniden Tesisi', '1994: Asrın Antlaşması ile Hazar Petrolünün Dünya Pazarlarına Açılması'],
        en: ['1918: Azerbaijan Democratic Republic founded (first secular Muslim democracy)', '1991: Restoration of State Independence', '1994: Historic "Contract of the Century" signed for Caspian energy'],
        de: ['1918: Gründung der ersten säkularen Republik der islamischen Welt', '1991: Wiederherstellung der staatlichen Unabhängigkeit', '1994: "Jahrhundertvertrag" über Kaspisches Öl']
      }
    },
    sacredSites: {
      tr: ['Ateşgah Tapınağı (Bakü - Ebedi Yanan Doğal Gaz Ateşi Mabedi)', 'Bibiheybet Camii'],
      en: ['Ateshgah Fire Temple of Baku', 'Bibi-Heybat Mosque'],
      de: ['Feuertempel Ateschgah (Baku)', 'Bibi-Heybat-Moschee']
    },
    sectors: ['Petrol ve Doğal Gaz İhracatı (SOCAR, Şah Deniz, Bakü-Tiflis-Ceyhan)', 'Hazar Transit Taşımacılığı ve Lojistik', 'Tarım (Nar, Fındık ve İpekçilik)', 'Kültür ve Spor Turizmi (Formula 1 Bakü)']
  }
};

export const COUNTRY_HERITAGE: Record<string, CountrySpecificHeritage> = {
  ...BASE_LANDMARKS,
  ...EUROPE_HERITAGE,
  ...EUROPE_EXTRA_HERITAGE,
  ...AMERICAS_HERITAGE,
  ...ASIA_ME_HERITAGE,
  ...AFRICA_OCEANIA_HERITAGE,
  ...ASIA_REMAINING_HERITAGE,
  ...AFRICA_REMAINING_HERITAGE,
  ...UNIVERSAL_REMAINING_HERITAGE
};
