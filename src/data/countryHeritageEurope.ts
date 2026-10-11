import type { CountrySpecificHeritage } from './countryEncyclopediaLandmarks';

export const EUROPE_HERITAGE: Record<string, CountrySpecificHeritage> = {
  // Norveç
  NO: {
    landmarks: {
      tr: ['Geirangerfjord & Nærøyfjord (UNESCO Doğa Mirası)', 'Preikestolen (Vaaz Kürsüsü Kayalığı)', 'Lofoten Adaları & Reine Balıkçı Köyü', 'Bryggen Tarihi Ahşap Rıhtımı (Bergen)', 'Tromsø Kuzey Işıkları Rasathanesi'],
      en: ['Geirangerfjord & Nærøyfjord (UNESCO)', 'Preikestolen (Pulpit Rock)', 'Lofoten Islands & Reine Fishing Village', 'Bryggen Hanseatic Wharf (Bergen)', 'Tromsø Northern Lights Observatory'],
      de: ['Geirangerfjord & Nærøyfjord', 'Preikestolen', 'Lofoten-Inseln & Reine', 'Bryggen Hanseviertel (Bergen)', 'Tromsø Nordlicht-Zentrum']
    },
    figures: {
      tr: ['Edvard Munch (Dışavurumcu Ressam - Çığlık)', 'Henrik Ibsen (Modern Tiyatronun Babası - Nora)', 'Roald Amundsen (Güney Kutbu’na ulaşan ilk kaşif)', 'Erling Haaland (Milli Futbol Yıldızı)'],
      en: ['Edvard Munch (Expressionist Painter - The Scream)', 'Henrik Ibsen (Playwright - A Doll’s House)', 'Roald Amundsen (Polar Explorer - First to South Pole)', 'Erling Haaland (Football Star)'],
      de: ['Edvard Munch (Maler - Der Schrei)', 'Henrik Ibsen (Dramatiker)', 'Roald Amundsen (Polarforscher)', 'Erling Haaland (Fußballstar)']
    },
    history: {
      concise: {
        tr: 'Norveç, Viking çağından 1905’teki bağımsızlığına ve Kuzey Denizi petrol keşfiyle dünyanın en zengin refah toplumlarından birine dönüşmüştür.',
        en: 'From the Viking Age to 1905 independence and North Sea oil discoveries, Norway built one of the world’s most prosperous welfare societies.',
        de: 'Vom Wikingerzeitalter über die Unabhängigkeit 1905 bis zum Nordseeöl entwickelte sich Norwegen zu einer der wohlhabendsten Gesellschaften.'
      },
      milestones: {
        tr: ['872: Harald Hårfagre ve Norveç Krallığı’nın Birleşmesi', '1397-1814: Kalmar Birliği ve Danimarka egemenliği', '1905: İsveç Birliği’nin sona ermesi ve tam bağımsızlık', '1969: Ekofisk petrol keşfi ve Petrol Refah Fonu’nun kuruluşu'],
        en: ['872: Battle of Hafrsfjord & unification under Harald Fairhair', '1397-1814: Kalmar Union under Danish crown', '1905: Dissolution of union with Sweden & independence', '1969: Ekofisk oil discovery & Sovereign Wealth Fund launch'],
        de: ['872: Vereinigung Norwegens unter Harald Schönhaar', '1397-1814: Kalmarer Union mit Dänemark', '1905: Auflösung der Union mit Schweden', '1969: Ekofisk-Ölfund & Staatsfonds-Gründung']
      }
    },
    sacredSites: {
      tr: ['Nidaros Katedrali (Trondheim - Kralların Taç Giyme Mabedi)', 'Urnes Ahşap Çıta Kilisesi (UNESCO 12. yy)'],
      en: ['Nidaros Cathedral (Trondheim - Royal Coronation Site)', 'Urnes Stave Church (UNESCO 12th Century)'],
      de: ['Nidarosdom (Trondheim)', 'Stabkirche von Urnes (UNESCO)']
    },
    sectors: ['Petrol & Doğal Gaz İhracatı', 'Somon ve Deniz Ürünleri', 'Yenilenebilir Hidroelektrik Enerji', 'Yeşil Deniz Taşımacılığı']
  },

  // İsveç
  SE: {
    landmarks: {
      tr: ['Gamla Stan Tarihi Kent Merkezi (Stockholm)', 'Vasa Gemi Müzesi (17. yy Savaş Gemisi)', 'Drottningholm Sarayı (UNESCO)', 'Lapland Buz Oteli (Jukkasjärvi)', 'Visby Orta Çağ Surları (Gotland)'],
      en: ['Gamla Stan Old Town (Stockholm)', 'Vasa Maritime Museum (17th Century Warship)', 'Drottningholm Palace (UNESCO)', 'Icehotel Lapland (Jukkasjärvi)', 'Visby Medieval City Walls (Gotland)'],
      de: ['Gamla Stan Altstadt (Stockholm)', 'Vasa-Museum', 'Schloss Drottningholm', 'Icehotel Jukkasjärvi', 'Visby Stadtmauer']
    },
    figures: {
      tr: ['Alfred Nobel (Dinamitin mucidi ve Nobel Ödülleri kurucusu)', 'Astrid Lindgren (Yazar - Pippi Uzunçorap)', 'ABBA (Björn, Benny, Agnetha, Anni-Frid - Pop İkonları)', 'Zlatan Ibrahimović (Futbol Efsanesi)'],
      en: ['Alfred Nobel (Inventor & Founder of Nobel Prizes)', 'Astrid Lindgren (Author - Pippi Longstocking)', 'ABBA (Legendary Pop Group)', 'Zlatan Ibrahimović (Football Legend)'],
      de: ['Alfred Nobel (Stifter der Nobelpreise)', 'Astrid Lindgren (Schriftstellerin)', 'ABBA (Pop-Legenden)', 'Zlatan Ibrahimović (Fußballstar)']
    },
    history: {
      concise: {
        tr: 'İsveç, 16. yüzyılda Gustav Vasa önderliğinde modern krallık haline gelmiş, 17. yüzyılda Baltık imparatorluğuna dönüşmüş ve son 200 yılı tarafsızlık ve inovasyonla geçirmiştir.',
        en: 'Unified under Gustav Vasa in the 16th century, Sweden expanded into a Baltic empire before embracing 200 years of peace and tech innovation.',
        de: 'Im 16. Jahrhundert unter Gustav Vasa geeint, entwickelte sich Schweden zur Großmacht und später zu einer führenden Innovationsnation.'
      },
      milestones: {
        tr: ['1523: Gustav Vasa’nın tahta çıkışı ve modern İsveç Devleti', '1648: Vestfalya Barışı ve İsveç İmparatorluk Çağı', '1814: Son savaş ve barışçıl tarafsızlık politikasının başlangıcı', '1901: İlk Nobel Ödülleri töreni'],
        en: ['1523: Gustav Vasa elected King & modern Sweden established', '1648: Peace of Westphalia cements Baltic Great Power era', '1814: Union with Norway & start of 200+ years of peace', '1901: First Nobel Prize ceremonies held in Stockholm'],
        de: ['1523: Krönung Gustav Vasas & Geburt des modernen Staates', '1648: Westfälischer Friede & schwedische Großmachtzeit', '1814: Beginn der zweihundertjährigen Neutralität', '1901: Erste Verleihung der Nobelpreise']
      }
    },
    sacredSites: {
      tr: ['Uppsala Katedrali (İskandinavya’nın En Yüksek Mabedi)', 'Lund Katedrali (12. yy Romanesk)'],
      en: ['Uppsala Cathedral (Tallest in Scandinavia)', 'Lund Cathedral (12th Century Romanesque)'],
      de: ['Dom zu Uppsala', 'Dom zu Lund']
    },
    sectors: ['Otomotiv & Ağır Sanayi (Volvo, Scania)', 'Tüketici Elektroniği & Fintech (Spotify, Klarna)', 'Mobilya & Tasarım (IKEA)', 'Telekomünikasyon (Ericsson)']
  },

  // Danimarka
  DK: {
    landmarks: {
      tr: ['Nyhavn Renkli Rıhtımı & Kordon Boyu (Kopenhag)', 'Tivoli Bahçeleri (Dünyanın en eski lunaparklarından)', 'Amalienborg Kraliyet Sarayı & Küçük Deniz Kızı Heykeli', 'Kronborg Kalesi (Shakespeare’in Hamlet Kalesi)', 'Møns Klint Beyaz Tebeşir Kayalıkları'],
      en: ['Nyhavn Waterfront Canal (Copenhagen)', 'Tivoli Gardens (Historic Amusement Park)', 'Amalienborg Royal Palace & Little Mermaid', 'Kronborg Castle (Elsinore Hamlet Castle)', 'Møns Klint Chalk Cliffs'],
      de: ['Nyhavn Kanal (Kopenhagen)', 'Tivoli Vergnügungspark', 'Schloss Amalienborg & Kleine Meerjungfrau', 'Schloss Kronborg (Hamlet)', 'Møns Klint Kreidefelsen']
    },
    figures: {
      tr: ['Hans Christian Andersen (Masal Yazarı - Çirkin Ördek Yavrusu)', 'Niels Bohr (Nobel Ödüllü Atom Fizikçisi)', 'Søren Kierkegaard (Varoluşçu Filozof)', 'Mads Mikkelsen (Dünyaca Ünlü Aktör)'],
      en: ['Hans Christian Andersen (Fairy Tale Author)', 'Niels Bohr (Nobel Physicist & Quantum Pioneer)', 'Søren Kierkegaard (Existentialist Philosopher)', 'Mads Mikkelsen (Celebrated Actor)'],
      de: ['Hans Christian Andersen (Märchenautor)', 'Niels Bohr (Nobelpreisträger für Physik)', 'Søren Kierkegaard (Philosoph)', 'Mads Mikkelsen (Schauspieler)']
    },
    history: {
      concise: {
        tr: 'Danimarka, Viking krallıklarından günümüze kesintisiz monarşi geleneğini sürdüren, tasarım, deniz ticareti ve rüzgar enerjisinde küresel öncü bir ülkedir.',
        en: 'Maintaining one of Europe’s oldest continuous monarchies since the Viking Age, Denmark is a pioneer in green wind energy and design.',
        de: 'Mit einer der ältesten Monarchien Europas hat sich Dänemark zu einem weltweiten Vorreiter in Design und Windenergie entwickelt.'
      },
      milestones: {
        tr: ['965: Mavi Diş Harald (Harald Bluetooth) ve Danimarka’nın Hristiyanlaşması', '1397: Kraliçe I. Margaret ve İskandinav Kalmar Birliği', '1849: İlk Demokratik Danimarka Anayasası', '1973: Avrupa Birliği üyeliği'],
        en: ['965: Harald Bluetooth unites Denmark & Jelling Stones raised', '1397: Queen Margaret I establishes Kalmar Union', '1849: First Danish democratic constitutional charter', '1973: Denmark joins the European Community'],
        de: ['965: Harald Blauzahn & Christianisierung Dänemarks', '1397: Königin Margarethe I. & Kalmarer Union', '1849: Verabschiedung des Grundgesetzes', '1973: Beitritt zur Europäischen Gemeinschaft']
      }
    },
    sacredSites: {
      tr: ['Roskilde Katedrali (Danimarka Krallarının Gotik Mozolesi)', 'Vor Frue Kirke (Meryem Ana Katedrali - Thorvaldsen Heykelleri)'],
      en: ['Roskilde Cathedral (Royal Gothic Burial Site)', 'Church of Our Lady (Copenhagen Cathedral)'],
      de: ['Dom zu Roskilde (UNESCO)', 'Vor Frue Kirke (Kopenhagen)']
    },
    sectors: ['İlaç & Biyomedikal (Novo Nordisk)', 'Yenilenebilir Rüzgar Enerjisi (Vestas, Ørsted)', 'Deniz Taşımacılığı (Maersk)', 'Oyuncak & Tasarım (LEGO)']
  },

  // Finlandiya
  FI: {
    landmarks: {
      tr: ['Suomenlinna Deniz Kalesi (UNESCO - Helsinki)', 'Helsinki Senato Meydanı & Beyaz Katedral', 'Rovaniemi Noel Baba Köyü (Lapland)', 'Saimaa Göller Bölgesi (Buzul Gölleri)', 'Temppeliaukio Kaya Kilisesi'],
      en: ['Suomenlinna Sea Fortress (UNESCO - Helsinki)', 'Helsinki Senate Square & White Cathedral', 'Santa Claus Village Rovaniemi (Lapland)', 'Lake Saimaa Region', 'Temppeliaukio Rock Church'],
      de: ['Seefestung Suomenlinna (UNESCO)', 'Senatsplatz & Dom von Helsinki', 'Weihnachtsmann-Dorf Rovaniemi', 'Saimaa-Seengebiet', 'Temppeliaukio-Felsenkirche']
    },
    figures: {
      tr: ['Jean Sibelius (Besteci - Finlandia Senfonik Şiiri)', 'Alvar Aalto (Modernist Mimar ve Tasarımcı)', 'Linus Torvalds (Linux Çekirdeği ve Git Mimarı)', 'Kimi Räikkönen (Formula 1 Dünya Şampiyonu)'],
      en: ['Jean Sibelius (Composer - Finlandia)', 'Alvar Aalto (Pioneering Architect & Designer)', 'Linus Torvalds (Creator of Linux & Git)', 'Kimi Räikkönen (F1 World Champion)'],
      de: ['Jean Sibelius (Komponist)', 'Alvar Aalto (Architekt und Designer)', 'Linus Torvalds (Schöpfer von Linux)', 'Kimi Räikkönen (Formel-1-Weltmeister)']
    },
    history: {
      concise: {
        tr: 'Yüzyıllarca İsveç ve Rus egemenliğinde kalan Finlandiya, 1917’de bağımsızlığını kazanmış, Kış Savaşı ile egemenliğini korumuş ve yüksek teknoloji eğitim modeline öncülük etmiştir.',
        en: 'Under Swedish and Russian rule for centuries, Finland gained independence in 1917, defended its sovereignty in the Winter War, and built a world-class education model.',
        de: 'Nach Jahrhunderten unter schwedischer und russischer Herrschaft erlangte Finnland 1917 die Unabhängigkeit und baute ein weltweit führendes Bildungssystem auf.'
      },
      milestones: {
        tr: ['1809: Çarlık Rusyası bünyesinde Finlandiya Büyük Dükalığı', '1917: Rus Devrimi sonrası tam bağımsızlığın ilanı', '1939-1940: Kış Savaşı ve bağımsızlığın korunması', '1995: Avrupa Birliği tam üyeliği'],
        en: ['1809: Autonomous Grand Duchy of Finland formed under Russia', '1917: Formal Declaration of Independence from Russia', '1939-1940: Winter War preserves Finnish sovereignty', '1995: Accession to the European Union'],
        de: ['1809: Autonomes Großfürstentum Finnland', '1917: Unabhängigkeitserklärung', '1939-1940: Winterkrieg sichert Souveränität', '1995: EU-Beitritt']
      }
    },
    sacredSites: {
      tr: ['Helsinki Lutheran Katedrali (Neoklasik Başyapıt)', 'Uspenski Ortodoks Katedrali (Kırmızı Tuğlalı Doğu Mabedi)'],
      en: ['Helsinki Lutheran Cathedral', 'Uspenski Orthodox Cathedral'],
      de: ['Dom von Helsinki', 'Uspenski-Kathedrale']
    },
    sectors: ['Telekomünikasyon & Yazılım (Nokia)', 'Orman Ürünleri & Sürdürülebilir Kağıt', 'Oyun Teknolojileri (Rovio, Supercell)', 'Gemi İnşası & Buzkıran Teknolojisi']
  },

  // Polonya
  PL: {
    landmarks: {
      tr: ['Kraków Rynek Glówny (Avrupa’nın En Büyük Orta Çağ Meydanı) & Wawel Kalesi', 'Varşova Tarihi Eski Kent (Stare Miasto)', 'Wieliczka Tuz Madeni (Yeraltı Şapelleri - UNESCO)', 'Malbork Töton Şövalyeleri Tuğla Kalesi', 'Białowieża Avrupa Bizonu Yağmur Ormanı'],
      en: ['Kraków Main Market Square & Wawel Royal Castle', 'Warsaw Rebuilt Old Town (Stare Miasto)', 'Wieliczka Salt Mine Underground Chapels (UNESCO)', 'Malbork Castle (World’s Largest Brick Castle)', 'Białowieża Primeval Forest (Home to European Bison)'],
      de: ['Krakauer Hauptmarkt & Wawel-Schloss', 'Warschauer Altstadt (UNESCO)', 'Salzbergwerk Wieliczka', 'Marienburg (Ordensburg Malbork)', 'Białowieża-Urwald']
    },
    figures: {
      tr: ['Nikolaus Kopernik (Gökbilimci - Güneş Merkezli Evren Modeli)', 'Marie Curie (İki farklı bilim dalında Nobel kazanan ilk bilim insanı)', 'Frédéric Chopin (Piyano Efsanesi ve Romantik Besteci)', 'Robert Lewandowski (Dünya Yıldızı Golcü)'],
      en: ['Nicolaus Copernicus (Astronomer - Heliocentric Model)', 'Marie Curie (Two-time Nobel Laureate in Physics & Chemistry)', 'Frédéric Chopin (Virtuoso Romantic Composer)', 'Robert Lewandowski (Football Striker)'],
      de: ['Nikolaus Kopernikus (Astronom)', 'Marie Curie (Nobelpreisträgerin)', 'Frédéric Chopin (Komponist)', 'Robert Lewandowski (Fußballstar)']
    },
    history: {
      concise: {
        tr: '966 yılında Hristiyanlığı kabul eden Polonya, Litvanya Birliği ile Orta Avrupa’nın en güçlü devletlerinden biri olmuş, bölünme dönemlerinden sonra küresel bir sanayi gücü olarak yeniden doğmuştur.',
        en: 'Baptized in 966, Poland formed a powerful commonwealth with Lithuania, weathered three partitions, and emerged as Central Europe’s dynamic economic engine.',
        de: 'Mit der Taufe 966 begründet, stieg Polen zur Adelsrepublik auf, überwand Teilungen und ist heute Mitteleuropas führende Wirtschaftskraft.'
      },
      milestones: {
        tr: ['966: I. Mieszko’nun Vaftizi ve Polonya Devleti’nin Doğuşu', '1569: Lublin Birliği ve Polonya-Litvanya Topluluğu', '1791: Avrupa’nın İlk Yazılı Modern Anayasası (3 Mayıs)', '1989: Dayanışma Hareketi (Solidarność) ve Komünizmin Çöküşü'],
        en: ['966: Baptism of Poland under Mieszko I', '1569: Union of Lublin creates the Polish-Lithuanian Commonwealth', '1791: Constitution of May 3 (Europe’s first modern constitution)', '1989: Solidarność movement brings end of communist rule'],
        de: ['966: Taufe Polens unter Mieszko I.', '1569: Union von Lublin', '1791: Verfassung vom 3. Mai', '1989: Solidarność & demokratischer Wandel']
      }
    },
    sacredSites: {
      tr: ['Jasna Góra Manastırı & Kara Meryem İkonası (Częstochowa)', 'Kraków Meryem Ana Bazilikası (Veit Stoss Ahşap Sunağı)'],
      en: ['Jasna Góra Monastery & Black Madonna (Częstochowa)', 'St. Mary’s Basilica (Kraków)'],
      de: ['Kloster Jasna Góra (Częstochowa)', 'Marienkirche (Krakau)']
    },
    sectors: ['Otomotiv ve Yan Sanayi', 'Bilişim ve Yazılım Mühendisliği', 'Tarım & Gıda İhracatı', 'Ağır Makine ve İmalat']
  },

  // Çekya
  CZ: {
    landmarks: {
      tr: ['Prag Kalesi & Aziz Vitus Katedrali', 'Karl Köprüsü (Charles Bridge - Vltava Nehri)', 'Eski Kent Meydanı & Astronomik Saat (Orloj)', 'Český Krumlov Masalsı Şatosu & Kıvrımlı Nehir', 'Karlovy Vary Termal Kaplıcalar Vadisi'],
      en: ['Prague Castle & St. Vitus Cathedral', 'Charles Bridge over Vltava River', 'Old Town Square & Prague Astronomical Clock', 'Český Krumlov Fairytale Castle', 'Karlovy Vary Thermal Colonnades'],
      de: ['Prager Burg & Veitsdom', 'Karlsbrücke über die Moldau', 'Altstädter Ring & Astronomische Uhr', 'Krumau (Český Krumlov)', 'Karlsbad Kolonnaden']
    },
    figures: {
      tr: ['Franz Kafka (Varoluşçu Yazar - Dönüşüm, Dava)', 'Antonín Dvořák (Besteci - Yeni Dünyadan Senfonisi)', 'Václav Havel (Oyun Yazarı, İnsan Hakları Savunucusu ve İlk Cumhurbaşkanı)', 'Jaromír Jágr (Buz Hokeyi Efsanesi)'],
      en: ['Franz Kafka (Author - The Metamorphosis)', 'Antonín Dvořák (Composer - New World Symphony)', 'Václav Havel (Dissident Playwright & First President)', 'Jaromír Jágr (Ice Hockey Legend)'],
      de: ['Franz Kafka (Schriftsteller)', 'Antonín Dvořák (Komponist)', 'Václav Havel (Präsident und Dramatiker)', 'Jaromír Jágr (Eishockey-Legende)']
    },
    history: {
      concise: {
        tr: 'Bohemya Krallığı ve Kutsal Roma İmparatorluğu’nun kültür başkenti olan Prag, 1989 Kadife Devrimi ile barışçıl özgürlüğüne kavuşmuş ve Avrupa’nın kalbinde yer almıştır.',
        en: 'Heart of the Kingdom of Bohemia and the Holy Roman Empire, Czechia regained independence through the 1989 Velvet Revolution.',
        de: 'Als Herz des Königreichs Böhmen erlebte Tschechien ein Goldenes Zeitalter und fand 1989 mit der Samtenen Revolution zurück zur Freiheit.'
      },
      milestones: {
        tr: ['1348: IV. Karl ve Prag Üniversitesi’nin (Charles Univ.) Kuruluşu', '1618: İkinci Prag Pencereden Atma Vakası ve Otuz Yıl Savaşları', '1918: Çekoslovakya’nın Bağımsızlığı', '1989: Kadife Devrim ve 1993 Barışçıl Ayrılık'],
        en: ['1348: Charles IV founds Charles University in Prague', '1618: Defenestration of Prague sparks Thirty Years’ War', '1918: Czechoslovakia declares independence', '1989: Velvet Revolution ends communist rule'],
        de: ['1348: Karl IV. gründet die Karls-Universität', '1618: Prager Fenstersturz löst Dreißigjährigen Krieg aus', '1918: Gründung der Tschechoslowakei', '1989: Samtene Revolution']
      }
    },
    sacredSites: {
      tr: ['Aziz Vitus Katedrali (Gotik Kraliyet Mozolesi)', 'Sedlec Kemik Kilisesi (Kutná Hora - UNESCO)'],
      en: ['St. Vitus Cathedral (Gothic Royal Mausoleum)', 'Sedlec Ossuary Bone Church (Kutná Hora)'],
      de: ['Veitsdom zu Prag', 'Sedletz-Ossarium (Kutná Hora)']
    },
    sectors: ['Otomotiv İmalatı (Škoda Auto)', 'Hassas Makine ve Optik Sanayi', 'Bohemya Kristali ve Cam Sanatı', 'Geleneksel Bira Üretimi (Pilsner)']
  },

  // Macaristan
  HU: {
    landmarks: {
      tr: ['Tuna Nehri Boyunca Macar Parlamento Binası', 'Buda Kalesi & Balıkçı Tabyası (Halászbástya)', 'Széchenyi Termal Kaplıcaları', 'Zincirli Köprü (Széchenyi Lánchíd)', 'Balaton Gölü (Orta Avrupa’nın En Büyük Gölü)'],
      en: ['Hungarian Parliament Building on the Danube', 'Buda Castle & Fisherman’s Bastion', 'Széchenyi Thermal Baths', 'Széchenyi Chain Bridge', 'Lake Balaton (Central Europe’s Largest Lake)'],
      de: ['Parlamentsgebäude an der Donau', 'Budaer Burg & Fischerbastei', 'Széchenyi-Heilbad', 'Kettenbrücke', 'Plattensee (Balaton)']
    },
    figures: {
      tr: ['Ferenc Liszt (Romantik Dönem Piyano Dehası)', 'Ernő Rubik (Rubik Küpünün Mucidi)', 'Ferenc Puskás (Futbol Tarihinin Efsanevi Golcüsü)', 'Katalin Karikó (Nobel Tıp Ödüllü mRNA Aşısı Kaşifi)'],
      en: ['Franz Liszt (Virtuoso Composer & Pianist)', 'Ernő Rubik (Inventor of the Rubik’s Cube)', 'Ferenc Puskás (Legendary Football Striker)', 'Katalin Karikó (Nobel Laureate for mRNA Technology)'],
      de: ['Franz Liszt (Komponist)', 'Ernő Rubik (Erfinder des Zauberwürfels)', 'Ferenc Puskás (Fußballlegende)', 'Katalin Karikó (Nobelpreisträgerin)']
    },
    history: {
      concise: {
        tr: '896 yılında Karpat Havzası’na yerleşen Macarlar, Kral I. István ile Hristiyanlığı kabul etmiş, Avusturya-Macaristan İmparatorluğu ile görkemli bir başkent inşa etmiştir.',
        en: 'Arriving in the Carpathian Basin in 896, the Magyars established a medieval kingdom under Saint Stephen and later shared the Austro-Hungarian imperial throne.',
        de: '896 im Karpatenbecken angesiedelt, stieg Ungarn unter König Stephan zum Königreich auf und bildete später die Doppelmonarchie Österreich-Ungarn.'
      },
      milestones: {
        tr: ['1000: I. István’ın Taç Giymesi ve Macar Krallığı', '1526: Mohaç Meydan Muharebesi', '1867: Avusturya-Macaristan İkili Monarşi Antlaşması', '1956: Sovyet Rejimine Karşı Macar İhtilali'],
        en: ['1000: Coronation of King Saint Stephen I', '1526: Battle of Mohács', '1867: Austro-Hungarian Compromise creates Dual Monarchy', '1956: Hungarian Revolution against Soviet domination'],
        de: ['1000: Krönung Stephans I.', '1526: Schlacht bei Mohács', '1867: Österreichisch-Ungarischer Ausgleich', '1956: Ungarischer Volksaufstand']
      }
    },
    sacredSites: {
      tr: ['Aziz István Bazilikası (Budapeşte)', 'Esztergom Bazilikası (Macaristan’ın En Büyük Kilisesi)'],
      en: ['St. Stephen’s Basilica (Budapest)', 'Esztergom Basilica (Primate Seat of Hungary)'],
      de: ['St.-Stephans-Basilika (Budapest)', 'Kathedrale von Esztergom']
    },
    sectors: ['Otomotiv Montaj Sanayi (Audi, Mercedes, BMW)', 'İlaç ve Kimya Endüstrisi', 'Termal Sağlık Turizmi', 'Şarapçılık (Tokaji Aszú)']
  },

  // İrlanda
  IE: {
    landmarks: {
      tr: ['Moher Kayalıkları (Cliffs of Moher - Atlantik Kıyısı)', 'Killarney Milli Parkı & Ring of Kerry', 'Dublin Trinity College & Kells Kitabı Kütüphanesi', 'Giant’s Causeway Doğa Anıtı', 'Galway Renkli Sokakları & Canlı Müzik Pubları'],
      en: ['Cliffs of Moher (Dramatic Atlantic Coast)', 'Killarney National Park & Ring of Kerry', 'Trinity College & The Book of Kells (Dublin)', 'The Burren Karst Landscape', 'Galway Latin Quarter & Traditional Music Pubs'],
      de: ['Cliffs of Moher', 'Killarney Nationalpark & Ring of Kerry', 'Trinity College & Book of Kells (Dublin)', 'The Burren Karstlandschaft', 'Galway Pub-Viertel']
    },
    figures: {
      tr: ['James Joyce (Yazar - Ulysses romanı)', 'Oscar Wilde (Oyun Yazarı ve Şair - Dorian Gray’in Portresi)', 'Bono (U2 Solisti ve Küresel İnsani Yardım Aktivisti)', 'Cillian Murphy (Oscar Ödüllü Sinema Oyuncusu)'],
      en: ['James Joyce (Literary Giant - Ulysses)', 'Oscar Wilde (Playwright - The Picture of Dorian Gray)', 'Bono (U2 Frontman & Philanthropist)', 'Cillian Murphy (Oscar-winning Actor)'],
      de: ['James Joyce (Schriftsteller)', 'Oscar Wilde (Dramatiker)', 'Bono (U2-Sänger)', 'Cillian Murphy (Schauspieler)']
    },
    history: {
      concise: {
        tr: 'Kelt kültürünün ve erken Hristiyan manastırlarının beşiği olan İrlanda, yüzyıllar süren bağımsızlık mücadelesi sonrasında bugün Avrupa’nın teknoloji ve inovasyon üssü olmuştur.',
        en: 'A cradle of Celtic heritage, Ireland endured centuries of struggle before transforming into Europe’s premier tech and pharmaceutical hub.',
        de: 'Als Wiege der keltischen Kultur entwickelte sich Irland von einer Agrarinsel zu Europas führendem Technologie- und Pharmastandort.'
      },
      milestones: {
        tr: ['432: Aziz Patrick’in İrlanda’ya Hristiyanlığı Getirmesi', '1845-1849: Büyük Kıtlık (Great Famine) ve Küresel İrlanda Göçü', '1916: Dublin Paskalya Ayaklanması', '1922: İrlanda Serbest Devleti ve Bağımsızlık'],
        en: ['432: Saint Patrick brings Christianity to Ireland', '1845-1849: The Great Famine triggers mass emigration', '1916: Easter Rising in Dublin sparks fight for republic', '1922: Irish Free State established'],
        de: ['432: St. Patrick christianisiert Irland', '1845-1849: Große Hungersnot', '1916: Osteraufstand in Dublin', '1922: Gründung des Irischen Freistaates']
      }
    },
    sacredSites: {
      tr: ['Aziz Patrick Katedrali (Dublin)', 'Rock of Cashel (Kelt Krallarının Kadim Kalesi ve Katedrali)'],
      en: ['St. Patrick’s Cathedral (Dublin)', 'Rock of Cashel (Ancient Seat of Kings)'],
      de: ['St. Patrick’s Cathedral (Dublin)', 'Rock of Cashel']
    },
    sectors: ['Yazılım ve Teknoloji Devleri (Google, Apple, Meta Avrupa Merkezleri)', 'İlaç ve Biyoteknoloji', 'Finansal Hizmetler ve Fon Yönetimi', 'Tarım ve İrlanda Viskisi']
  },

  // İzlanda
  IS: {
    landmarks: {
      tr: ['Mavi Lagün (Blue Lagoon Jeotermal Kaplıcası)', 'Altın Çember Rota (Gullfoss Şelalesi, Geysir & Þingvellir)', 'Jökulsárlón Buzul Lagünü & Elmas Sahil', 'Skógafoss & Seljalandsfoss Şelaleleri', 'Vatnajökull Buzul Mağaraları'],
      en: ['Blue Lagoon Geothermal Spa', 'Golden Circle (Gullfoss, Geysir, Þingvellir UNESCO)', 'Jökulsárlón Glacier Lagoon & Diamond Beach', 'Skógafoss & Seljalandsfoss Waterfalls', 'Vatnajökull Ice Caves'],
      de: ['Blaue Lagune (Blue Lagoon)', 'Goldener Kreis (Gullfoss, Geysir, Thingvellir)', 'Gletscherlagune Jökulsárlón & Diamond Beach', 'Skógafoss & Seljalandsfoss', 'Vatnajökull-Eishöhlen']
    },
    figures: {
      tr: ['Björk (Avangart Müzisyen ve Sanatçı)', 'Halldór Laxness (Nobel Edebiyat Ödüllü Yazar)', 'Leif Erikson (M.S. 1000’de Amerika’ya ayak basan Viking kâşifi)', 'Vigdís Finnbogadóttir (Dünyanın demokratik yolla seçilen ilk kadın cumhurbaşkanı)'],
      en: ['Björk (Avant-garde Music Icon)', 'Halldór Laxness (Nobel Laureate in Literature)', 'Leif Erikson (Norse Explorer who reached America c. 1000)', 'Vigdís Finnbogadóttir (World’s First Democratically Elected Female President)'],
      de: ['Björk (Musikerin)', 'Halldór Laxness (Nobelpreisträger)', 'Leif Eriksson (Wikinger-Entdecker)', 'Vigdís Finnbogadóttir (erste gewählte Präsidentin weltweit)']
    },
    history: {
      concise: {
        tr: '9. yüzyılda Vikingler tarafından iskân edilen İzlanda, dünyanın en eski parlamentosu Alþingi’yi kurmuş, buzullar ve volkanlar arasında bağımsızlığını inşa etmiştir.',
        en: 'Settled by Norsemen in the 9th century, Iceland founded the world’s oldest parliament (Althingi in 930) and built a society on 100% renewable geothermal energy.',
        de: 'Im 9. Jahrhundert von Wikingern besiedelt, gründete Island 930 das älteste Parlament der Welt und nutzt heute 100% erneuerbare Energien.'
      },
      milestones: {
        tr: ['874: Ingólfur Arnarson ve Reykjavík’in İlk İskânı', '930: Þingvellir’de Alþingi Meclisi’nin Kuruluşu', '1262: Norveç ve ardından Danimarka Tacı Egemenliği', '1944: Danimarka’dan Tam Bağımsızlık ve Cumhuriyet İlanı'],
        en: ['874: First permanent Norse settlement at Reykjavík', '930: Foundation of the Alþingi at Þingvellir', '1262: Old Covenant joins Iceland to Norwegian Crown', '1944: Full Independence from Denmark and Republic declared'],
        de: ['874: Erste Besiedlung Reykjavíks', '930: Gründung des Althing in Thingvellir', '1262: Unterwerfung unter die norwegische Krone', '1944: Ausrufung der Republik Island']
      }
    },
    sacredSites: {
      tr: ['Hallgrímskirkja Katedrali (Reykjavík - Bazalt Sütunlu İkonik Mabed)', 'Skálholt Tarihi Piskoposluk Merkezi'],
      en: ['Hallgrímskirkja Cathedral (Basalt-column Architecture)', 'Skálholt Historic Episcopal Cathedral'],
      de: ['Hallgrímskirkja (Reykjavík)', 'Skálholt-Kathedrale']
    },
    sectors: ['Jeotermal & Yenilenebilir Enerji', 'Balıkçılık ve Deniz Ürünleri İhracatı', 'Eko-Turizm ve Macera Seyahati', 'Yeşil Alüminyum Eritme Sanayi']
  },

  // Romanya
  RO: {
    landmarks: {
      tr: ['Bran Kalesi (Drakula Şatosu - Karpatlar)', 'Peleș Sarayı (Sinaia - Neo-Rönesans Şaheseri)', 'Bükreş Parlamento Sarayı (Dünyanın en ağır idari binası)', 'Transfăgărășan Dağ Geçidi Yolu', 'Sighişoara Orta Çağ Kalesi (UNESCO)'],
      en: ['Bran Castle (Legendary Dracula’s Castle)', 'Peleș Castle (Sinaia Neo-Renaissance Gem)', 'Palace of the Parliament (Bucharest)', 'Transfăgărășan Alpine Highway', 'Sighișoara Medieval Citadel (UNESCO)'],
      de: ['Schloss Bran (Dracula-Schloss)', 'Schloss Peleș (Sinaia)', 'Parlamentspalast Bukarest', 'Transfăgărășan-Hochstraße', 'Burg Schäßburg (Sighișoara)']
    },
    figures: {
      tr: ['Nadia Comăneci (Olimpiyatlarda ilk kez 10 tam puan alan jimnastikçi)', 'Constantin Brâncuși (Modern Heykel Sanatının Öncüsü)', 'Mircea Eliade (Dinler Tarihçisi ve Filozof)', 'Gheorghe Hagi (Karpatların Maradonası - Futbol Efsanesi)'],
      en: ['Nadia Comăneci (First Gymnast to Score a Perfect 10)', 'Constantin Brâncuși (Pioneer of Modern Sculpture)', 'Mircea Eliade (Philosopher & Historian of Religion)', 'Gheorghe Hagi (Football Legend)'],
      de: ['Nadia Comăneci (Turnlegende)', 'Constantin Brâncuși (Bildhauer)', 'Mircea Eliade (Religionshistoriker)', 'Gheorghe Hagi (Fußballstar)']
    },
    history: {
      concise: {
        tr: 'Daçya ve Roma mirasından doğan Romanya, Eflak ve Boğdan beyliklerinin birleşmesiyle modern krallık olmuş, Karpatlar ve Tuna Deltası boyunca uzanan köklü bir Latin adasıdır.',
        en: 'Rooted in ancient Dacia and Rome, Romania unified Wallachia and Moldavia in 1859 and thrives as an Eastern European tech and automotive powerhouse.',
        de: 'Aus dakischem und römischem Erbe hervorgegangen, vereinigte Rumänien die Walachei und Moldau und ist heute ein bedeutender Technologiestandort.'
      },
      milestones: {
        tr: ['106: Roma İmparatoru Trajan’ın Daçya Seferi', '1859: Alexandru Ioan Cuza ile Eflak ve Boğdan’ın Birleşmesi', '1918: Büyük Birleşme (Transilvanya’nın Katılımı)', '1989: Komünist Diktatörlüğün Yıkılışı ve Demokrasi'],
        en: ['106: Emperor Trajan conquers Dacia', '1859: Personal Union of Wallachia and Moldavia under Cuza', '1918: Great Union Day unites Transylvania with Romania', '1989: Romanian Revolution overthrows Ceaușescu'],
        de: ['106: Kaiser Trajan erobert Dakien', '1859: Vereinigung der Fürstentümer Walachei und Moldau', '1918: Große Vereinigung mit Siebenbürgen', '1989: Sturz des Ceaușescu-Regimes']
      }
    },
    sacredSites: {
      tr: ['Voroneț Manastırı (Doğunun Sistina Şapeli - Mavi Freskler)', 'Bükreş Halkın Kurtuluşu Katedrali (Dünyanın en yüksek Ortodoks katedrali)'],
      en: ['Voroneț Painted Monastery (Sistine Chapel of the East)', 'People’s Salvation Cathedral (Bucharest)'],
      de: ['Kloster Voroneț (UNESCO)', 'Kathedrale der Erlösung des Volkes']
    },
    sectors: ['Otomotiv İmalatı (Dacia / Renault)', 'Bilişim & Yazılım Mühendisliği', 'Tarım & Tahıl İhracatı', 'Petrol ve Doğal Gaz Çıkarımı']
  },

  // Hırvatistan
  HR: {
    landmarks: {
      tr: ['Dubrovnik Tarihi Şehir Surları & Stradun Caddesi (UNESCO)', 'Plitvice Gölleri Milli Parkı (16 Teraslı Şelale Gölü)', 'Diocletianus Sarayı (Split - Roma İmparatorluk Sarayı)', 'Hvar Adası & Lavanta Tarlaları', 'Rovinj Eski Kent & Istria Kıyıları'],
      en: ['Dubrovnik Old Town Walls & Stradun (UNESCO)', 'Plitvice Lakes National Park (Terraced Waterfalls)', 'Diocletian’s Palace (Split)', 'Hvar Island & Lavender Fields', 'Rovinj Peninsula (Istria)'],
      de: ['Stadtmauern von Dubrovnik (UNESCO)', 'Nationalpark Plitvicer Seen', 'Diokletianpalast in Split', 'Insel Hvar', 'Altstadt von Rovinj']
    },
    figures: {
      tr: ['Nikola Tesla (Elektrik Çağının Dahisi - Smiljan doğumlu)', 'Luka Modrić (Ballon d’Or Sahibi Futbol Efsanesi)', 'Ruđer Bošković (Fizikçi ve Astronom)', 'Goran Ivanišević (Wimbledon Şampiyonu Tenisçi)'],
      en: ['Nikola Tesla (Pioneering Electrical Inventor, born in Smiljan)', 'Luka Modrić (Ballon d’Or Winning Football Maestro)', 'Ruđer Bošković (Polymath Physicist & Astronomer)', 'Goran Ivanišević (Wimbledon Champion)'],
      de: ['Nikola Tesla (Erfinder, geboren in Smiljan)', 'Luka Modrić (Weltfußballer)', 'Ruđer Bošković (Universalgelehrter)', 'Goran Ivanišević (Wimbledon-Sieger)']
    },
    history: {
      concise: {
        tr: '925 yılında Kral Tomislav ile kurulan Hırvat Krallığı, Adriyatik kıyısında Venedik ve Habsburg etkileriyle zenginleşmiş, Akdeniz’in en gözde kıyı cumhuriyetine dönüşmüştür.',
        en: 'Founded under King Tomislav in 925, Croatia flourished on the Adriatic under Venetian and Habsburg influences before joining the EU and Schengen zone.',
        de: 'Unter König Tomislav 925 begründet, entwickelte sich Kroatien an der Adria zu einer der beliebtesten Reisedestinationen Europas.'
      },
      milestones: {
        tr: ['925: Kral Tomislav’ın Taç Giymesi', '1102: Macaristan ile Kişisel Birlik', '1991: Bağımsızlık İlanı ve Vatan Savaşı', '2023: Euro Bölgesi ve Schengen Alanı Tam Üyeliği'],
        en: ['925: Coronation of King Tomislav', '1102: Pacta Conventa union with Hungary', '1991: Declaration of Independence from Yugoslavia', '2023: Full accession to Eurozone & Schengen Area'],
        de: ['925: Krönung von König Tomislav', '1102: Personalunion mit Ungarn', '1991: Unabhängigkeitserklärung', '2023: Beitritt zu Euro und Schengen']
      }
    },
    sacredSites: {
      tr: ['Zagreb Katedrali (Meryem Ana’nın Göğe Yükselişi)', 'Šibenik Aziz Yakup Katedrali (Tamamen taştan harçsız inşa - UNESCO)'],
      en: ['Zagreb Cathedral of the Assumption', 'St. James Cathedral in Šibenik (All-stone UNESCO Masterpiece)'],
      de: ['Kathedrale von Zagreb', 'Kathedrale des Heiligen Jakob in Šibenik']
    },
    sectors: ['Adriyatik Kıyı Turizmi & Yatçılık', 'Elektrikli Hiper Otomobiller (Rimac Automobili)', 'Gemi İnşası ve Deniz Taşımacılığı', 'İlaç ve Gıda Sanayii']
  },

  // Belçika
  BE: {
    landmarks: {
      tr: ['Grand Place & Gotik Belediye Sarayı (Brüksel)', 'Brugge Tarihi Kanalları & Çan Kulesi (Belfort)', 'Atomium Heykeli & Mini-Europe', 'Gent Aziz Bavo Katedrali & Gravensteen Kalesi', 'Anvers Elmas Bölgesi & Limanı'],
      en: ['Grand Place & Town Hall (Brussels)', 'Bruges Historic Canals & Belfry', 'Atomium Landmark & Mini-Europe', 'Ghent Gravensteen Castle & St. Bavo Cathedral', 'Antwerp Diamond District & Port'],
      de: ['Grand-Place Brüssel', 'Grachten von Brügge', 'Atomium Brüssel', 'Genter Belfried & Burg Gravensteen', 'Diamantenviertel Antwerpen']
    },
    figures: {
      tr: ['René Magritte (Sürrealist Ressam - İmgelerin İhaneti)', 'Hergé (Tenten çizgi romanının yaratıcısı)', 'Audrey Hepburn (Brüksel doğumlu Hollywood Efsanesi)', 'Kevin De Bruyne (Milli Futbol Yıldızı)'],
      en: ['René Magritte (Surrealist Master)', 'Hergé (Creator of Tintin)', 'Audrey Hepburn (Brussels-born Hollywood Icon)', 'Kevin De Bruyne (Football Playmaker)'],
      de: ['René Magritte (Maler)', 'Hergé (Schöpfer von Tim und Struppi)', 'Audrey Hepburn (Schauspielerin)', 'Kevin De Bruyne (Fußballstar)']
    },
    history: {
      concise: {
        tr: 'Orta Çağ’da kumaş ve ticaretin merkezi olan Flandre şehirlerinden doğan Belçika, 1830 Devrimi ile bağımsız krallık olmuş ve bugün Avrupa Birliği’nin başkentidir.',
        en: 'From prosperous medieval textile guilds, Belgium won independence in 1830 and now stands at the crossroads of European democracy as headquarters of the EU and NATO.',
        de: 'Aus mittelalterlichen Handelsstädten hervorgegangen, erlangte Belgien 1830 die Unabhängigkeit und ist heute Sitz der EU und NATO.'
      },
      milestones: {
        tr: ['1302: Altın Mahmuzlar Savaşı (Kortrijk)', '1830: Belçika Devrimi ve Hollanda’dan Bağımsızlık', '1831: I. Léopold’un tahta çıkmasıyla Meşruti Monarşi', '1957: Roma Antlaşması ve Avrupa Birliği Kurucu Üyeliği'],
        en: ['1302: Battle of the Golden Spurs at Kortrijk', '1830: Belgian Revolution leads to independence from Netherlands', '1831: King Leopold I ascends the constitutional throne', '1957: Founding member of the European Economic Community'],
        de: ['1302: Sporenschlacht bei Kortrijk', '1830: Belgische Revolution', '1831: Krönung von Leopold I.', '1957: Gründungsmitglied der EWG']
      }
    },
    sacredSites: {
      tr: ['Brüksel Aziz Michael ve Gudula Katedrali', 'Brugge Kutsal Kan Bazilikası (Heilig-Bloedbasiliek)'],
      en: ['St. Michael and St. Gudula Cathedral (Brussels)', 'Basilica of the Holy Blood (Bruges)'],
      de: ['Kathedrale St. Michael und St. Gudula', 'Heilig-Blut-Basilika Brügge']
    },
    sectors: ['Kimya ve Petrokimya Rafinerileri (Anvers)', 'Lüks Çikolata ve Bira Zanaatı', 'Uluslararası Elmas Ticareti', 'Biyoteknoloji ve İlaç']
  }
};
