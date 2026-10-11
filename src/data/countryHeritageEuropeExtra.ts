import type { CountrySpecificHeritage } from './countryEncyclopediaLandmarks';

export const EUROPE_EXTRA_HERITAGE: Record<string, CountrySpecificHeritage> = {
  // Arnavutluk
  AL: {
    landmarks: {
      tr: ['Berat Bin Pencereli Tarihi Osmanlı Kenti (UNESCO)', 'Gjirokastër Taş Kalesi & Eski Çarşı', 'Ksamil Adaları & Arnavutluk Rivierası', 'Theth Milli Parkı & Arnavut Alpleri', 'Butrint Antik Greko-Romen Kenti'],
      en: ['Berat Historic Ottoman Town of a Thousand Windows (UNESCO)', 'Gjirokastër Stone Citadel & Bazaar', 'Ksamil Islands & Albanian Riviera', 'Theth National Park & Accursed Mountains', 'Butrint Ancient Archaeological Park'],
      de: ['Berat historische Museumsstadt (UNESCO)', 'Gjirokastër Festung', 'Ksamil-Inseln & Albanische Riviera', 'Theth-Nationalpark', 'Antike Ruinenstadt Butrint']
    },
    figures: {
      tr: ['İskender Bey (Gjergj Kastrioti - Milli Kahraman)', 'Rahibe Teresa (Mother Teresa - Nobel Barış Ödüllü Hümanist)', 'Ismail Kadare (Dünyaca Ünlü Edebiyatçı - Taş Kentin Kroniği)'],
      en: ['Skanderbeg (Gjergj Kastrioti - National Hero)', 'Mother Teresa (Nobel Peace Prize Laureate)', 'Ismail Kadare (Acclaimed Novelist)'],
      de: ['Skanderbeg (Nationalheld)', 'Mutter Teresa (Friedensnobelpreisträgerin)', 'Ismail Kadare (Schriftsteller)']
    },
    history: {
      concise: {
        tr: 'Kadim İliryalıların soyundan gelen Arnavutlar, İskender Bey önderliğinde direniş destanı yazmış, 1912’de bağımsızlığına kavuşmuş ve bugün Adriyatik’in yükselen turizm yıldızı olmuştur.',
        en: 'Descendants of ancient Illyrians, Albanians united under Skanderbeg and won independence in 1912, now shining as the gem of the Adriatic Riviera.',
        de: 'Als Nachfahren der Illyrer erlangte Albanien 1912 die Unabhängigkeit und entwickelte sich zu einem aufstrebenden Urlaubsziel am Ionischen Meer.'
      },
      milestones: {
        tr: ['1443: İskender Bey’in Krujë Kalesi’nde Bağımsızlık Bayrağını Çekmesi', '1912: Avlonya’da (Vlorë) Bağımsızlık İlanı', '1991: Komünist İzolasyon Rejiminin Sonu ve Çok Partili Demokrasi'],
        en: ['1443: Skanderbeg raises Albanian flag at Krujë', '1912: Vlorë Declaration of Independence', '1991: Fall of communist regime & transition to democracy'],
        de: ['1443: Skanderbegs Aufstand in Kruja', '1912: Unabhängigkeitserklärung von Vlora', '1991: Ende der kommunistischen Isolation']
      }
    },
    sacredSites: {
      tr: ['Berat Bektaşi Halveti Tekkesi', 'Tiran Ethem Bey Camii & Diriliş Ortodoks Katedrali'],
      en: ['Halveti Teqe of Berat', 'Et’hem Bey Mosque & Resurrection Cathedral (Tirana)'],
      de: ['Halveti-Tekke in Berat', 'Et’hem-Bey-Moschee (Tirana)']
    },
    sectors: ['Adriyatik ve İyon Kıyı Turizmi', 'Krom ve Madencilik İhracatı', 'Tarım ve Zeytinyağı', 'Tekstil ve İmalat']
  },

  // Bulgaristan
  BG: {
    landmarks: {
      tr: ['Rila Manastırı & Karpatlar Zirvesi (UNESCO)', 'Alexander Nevsky Katedrali (Sofya)', 'Plovdiv Antik Roma Tiyatrosu & Sanat Sokağı Kapana', 'Nesebar Tarihi Yarımadası & Karadeniz Kıyısı', 'Güller Vadisi (Kazanlık)'],
      en: ['Rila Monastery (UNESCO Jewel)', 'St. Alexander Nevsky Cathedral (Sofia)', 'Plovdiv Roman Amphitheatre & Kapana Arts District', 'Nesebar Ancient Seaside Town', 'Rose Valley of Kazanlak'],
      de: ['Rila-Kloster (UNESCO)', 'Alexander-Newski-Kathedrale (Sofia)', 'Römisches Theater Plovdiv', 'Altstadt von Nessebar', 'Rosental von Kasanlak']
    },
    figures: {
      tr: ['Hristo Stoichkov (Ballon d’Or Sahibi Futbol Efsanesi)', 'Hristo Botev (Milli Şair ve Devrimci)', 'İvan Vazov (Bulgar Edebiyatının Babası - Boyunduruk Altında)'],
      en: ['Hristo Stoichkov (Ballon d’Or Winner & Football Legend)', 'Hristo Botev (Poet & Revolutionary Hero)', 'Ivan Vazov (Patriarch of Bulgarian Literature)'],
      de: ['Christo Stoitschkow (Fußballstar)', 'Christo Botew (Nationaldichter)', 'Iwan Wasow (Schriftsteller)']
    },
    history: {
      concise: {
        tr: '681 yılında Han Asparuh tarafından kurulan Bulgar Devleti, Kiril alfabesinin doğduğu merkez olmuş, Osmanlı dönemi sonrası 1878’de yeniden bağımsızlığına kavuşmuştur.',
        en: 'Founded in 681 by Khan Asparuh, Bulgaria was the cradle of the Cyrillic script and reclaimed sovereignty in 1878 following the Russo-Turkish War.',
        de: '681 von Khan Asparuch gegründet, wurde Bulgarien zur Wiege der kyrillischen Schrift und erlangte 1878 seine Unabhängigkeit zurück.'
      },
      milestones: {
        tr: ['681: Han Asparuh ve Birinci Bulgar İmparatorluğu’nun Kuruluşu', '886: Kiril ve Metodiy Öğrencileriyle Kiril Alfabesinin Yayılması', '1878: Ayastefanos Antlaşması ve 1908 Tam Bağımsızlık İlanı'],
        en: ['681: Khan Asparuh establishes First Bulgarian Empire', '886: Golden Age of literature & Cyrillic script adoption', '1878: Liberation from Ottoman rule & 1908 Kingdom declaration'],
        de: ['681: Gründung des Ersten Bulgarischen Reiches', '886: Goldenes Zeitalter der kyrillischen Literatur', '1878: Wiedergeburt des bulgarischen Staates']
      }
    },
    sacredSites: {
      tr: ['Rila Manastırı (10. yy Fresk Başyapıtı)', 'Boyana Kilisesi (Sofya - Erken Rönesans Freskleri - UNESCO)'],
      en: ['Rila Monastery (10th Century Iconography)', 'Boyana Church (Pre-Renaissance Frescoes UNESCO)'],
      de: ['Rila-Kloster', 'Kirche von Bojana (UNESCO)']
    },
    sectors: ['Gül Yağı ve Parfümeri Esansı (Dünya Lideri)', 'Bilişim ve Yazılım Mühendisliği', 'Karadeniz Kıyı ve Kayak Turizmi', 'Tarım ve Tahıl İhracatı']
  },

  // Estonya
  EE: {
    landmarks: {
      tr: ['Tallinn Eski Kent Meydanı & Toompea Kalesi (UNESCO Gotik Masalı)', 'Lahemaa Milli Parkı & Malikaneleri', 'Tartu Üniversitesi Tarihi Kampüsü & Bilim Merkezi', 'Saaremaa Adası & Kuressaare Kalesi'],
      en: ['Tallinn Medieval Old Town & Toompea Castle (UNESCO)', 'Lahemaa National Park & Coastal Manors', 'Tartu University Historic Quarter', 'Saaremaa Island & Kuressaare Episcopal Castle'],
      de: ['Tallinner Altstadt & Burg Toompea (UNESCO)', 'Lahemaa-Nationalpark', 'Universität Tartu', 'Insel Saaremaa & Bischofsburg']
    },
    figures: {
      tr: ['Arvo Pärt (Dünyanın en çok icra edilen çağdaş klasik müzik bestecisi)', 'Lennart Meri (Eski Cumhurbaşkanı, Yazar ve Özgürlük Öncüsü)', 'Jaan Kross (Edebiyatçı)'],
      en: ['Arvo Pärt (World’s most performed contemporary classical composer)', 'Lennart Meri (Statesman, Writer, Historic President)', 'Jaan Kross (Novelist)'],
      de: ['Arvo Pärt (Komponist)', 'Lennart Meri (Präsident und Schriftsteller)', 'Jaan Kross (Schriftsteller)']
    },
    history: {
      concise: {
        tr: 'Baltık kıyısında kadim bir Fin-Ugor halkı olan Estonya, 1991 Şarkı Devrimi ile özgürlüğüne kavuşmuş ve dünyanın 1 numaralı dijital e-devlet toplumuna dönüşmüştür.',
        en: 'A Finno-Ugric Baltic nation, Estonia regained sovereignty through the peaceful 1991 Singing Revolution and created the world’s most advanced digital society.',
        de: 'Durch die friedliche Singende Revolution 1991 unabhängig geworden, schuf Estland die am weitesten fortgeschrittene digitale Gesellschaft der Welt.'
      },
      milestones: {
        tr: ['1918: Estonya Bağımsızlık Manifestosu', '1989: Baltık Yolu (2 milyon kişinin el ele tutuştuğu özgürlük zinciri)', '1991: Şarkı Devrimi ve Bağımsızlığın Yeniden Tesisi', '2000+: e-Residency ve Dünyanın İlk Dijital Devleti'],
        en: ['1918: Estonian Declaration of Independence', '1989: Baltic Way 600km human chain for freedom', '1991: Singing Revolution restores independence', '2000+: World pioneer in e-Residency and digital statehood'],
        de: ['1918: Erklärung der Unabhängigkeit', '1989: Baltischer Weg (Menschenkette)', '1991: Singende Revolution stellt Unabhängigkeit wieder her', '2000+: Pionier der digitalen E-Gesellschaft']
      }
    },
    sacredSites: {
      tr: ['Aziz Olaf Kilisesi (16. yy dünyanın en yüksek yapısıydı)', 'Aleksandr Nevski Katedrali (Toompea)'],
      en: ['St. Olaf’s Church (Tallest structure in 16th century Europe)', 'Alexander Nevsky Cathedral (Tallinn)'],
      de: ['Olaikirche (Tallinn)', 'Alexander-Newski-Kathedrale']
    },
    sectors: ['Siber Güvenlik ve Dijital Teknolojiler (Skype, Wise, Bolt)', 'e-Devlet ve Blokzincir Altyapıları', 'Ahşap ve Modüler Ev İhracatı', 'Temiz Teknoloji']
  },

  // Letonya
  LV: {
    landmarks: {
      tr: ['Riga Tarihi Merkezi & Art Nouveau Mimari Bulvarları (UNESCO)', 'Rundāle Barok Sarayı & Fransız Bahçeleri', 'Gauja Milli Parkı & Turaida Orta Çağ Kalesi', 'Jūrmala Beyaz Kum Sahilleri'],
      en: ['Riga Historic Centre & Art Nouveau Boulevard District', 'Rundāle Palace & Baroque French Gardens', 'Gauja National Park & Turaida Medieval Castle', 'Jūrmala White Sand Beach Resort'],
      de: ['Altstadt Riga & Jugendstilviertel (UNESCO)', 'Schloss Rundāle (Barockschloss)', 'Gauja-Nationalpark & Burg Turaida', 'Ostseebad Jūrmala']
    },
    figures: {
      tr: ['Mikhail Baryshnikov (Riga doğumlu Bale Efsanesi)', 'Mark Rothko (Daugavpils doğumlu Soyut Dışavurumcu Ressam)', 'Kristaps Porziņģis (NBA Yıldızı)'],
      en: ['Mikhail Baryshnikov (Ballet Legend, born in Riga)', 'Mark Rothko (Pioneering Abstract Expressionist Painter)', 'Kristaps Porziņģis (NBA Basketball Star)'],
      de: ['Michail Baryschnikow (Balletttänzer)', 'Mark Rothko (Maler des Abstrakten Expressionismus)', 'Kristaps Porziņģis (NBA-Star)']
    },
    history: {
      concise: {
        tr: '1201 yılında Hansa Birliği limanı olarak kurulan Riga merkezli Letonya, zengin halk şarkıları (Dainas) mirasını koruyarak 1991’de tam bağımsızlığına kavuşmuştur.',
        en: 'Centered around the Hanseatic port of Riga founded in 1201, Latvia preserved its rich folklore traditions to regain independent democratic statehood in 1991.',
        de: 'Um die 1201 gegründete Hansestadt Riga gewachsen, bewahrte Lettland seine reiche Folkloretadition und erlangte 1991 die Freiheit zurück.'
      },
      milestones: {
        tr: ['1201: Riga Şehri’nin Kuruluşu ve Hansa Ticaret Ağı', '1918: Letonya Cumhuriyeti’nin Kuruluşu', '1990: Bağımsızlığın Yeniden İlan Edilmesi'],
        en: ['1201: Foundation of Riga as Hanseatic trading powerhouse', '1918: Proclamation of the Republic of Latvia', '1990: Declaration on Restoration of Independence'],
        de: ['1201: Gründung der Stadt Riga', '1918: Ausrufung der Republik Lettland', '1990: Wiederherstellung der Unabhängigkeit']
      }
    },
    sacredSites: {
      tr: ['Riga Katedrali (Baltıkların En Büyük Orta Çağ Kilisesi)', 'Aglona Meryem Ana Bazilikası'],
      en: ['Riga Cathedral (Largest Medieval Church in Baltics)', 'Basilica of the Assumption in Aglona'],
      de: ['Dom zu Riga', 'Basilika Mariä Himmelfahrt (Aglona)']
    },
    sectors: ['Ahşap İşleme ve Orman Sanayii', 'Bilgi Teknolojileri ve Telekomünikasyon', 'Transit Taşımacılık ve Baltık Limanları', 'Kimya ve İlaç']
  },

  // Litvanya
  LT: {
    landmarks: {
      tr: ['Vilnius Tarihi Eski Şehri & Gediminas Kulesi (UNESCO)', 'Trakai Gölü Ada Kalesi (Kızıl Tuğla Şaheseri)', 'Haçlar Tepesi (Kryžių Kalnas - İnanç ve Direniş Anıtı)', 'Curonian Spit Kum Tepeleri (Neringa)'],
      en: ['Vilnius Old Town & Gediminas Tower (UNESCO)', 'Trakai Island Castle in Lake Galvė', 'Hill of Crosses (Siauliai Pilgrimage Landmark)', 'Curonian Spit Giant Sand Dunes'],
      de: ['Altstadt von Vilnius & Gediminas-Turm', 'Wasserburg Trakai', 'Berg der Kreuze (Kryžių Kalnas)', 'Kurische Nehrung']
    },
    figures: {
      tr: ['Büyük Vytautas (Orta Çağ Litvanya Büyük Dükü)', 'M.K. Čiurlionis (Sembolist Ressam ve Besteci)', 'Arvydas Sabonis (Basketbol Efsanesi)'],
      en: ['Vytautas the Great (Grand Duke of Lithuania)', 'M.K. Čiurlionis (Symbolist Painter & Composer)', 'Arvydas Sabonis (Basketball Hall of Famer)'],
      de: ['Vytautas der Große (Großfürst)', 'M.K. Čiurlionis (Künstler und Komponist)', 'Arvydas Sabonis (Basketball-Legende)']
    },
    history: {
      concise: {
        tr: '14. yüzyılda Baltık’tan Karadeniz’e uzanan Avrupa’nın en büyük devletini kuran Litvanya, Sovyetler Birliği’nden bağımsızlığını ilk ilan eden cesur cumhuriyettir.',
        en: 'Once stretching from the Baltic to the Black Sea as Europe’s largest medieval empire, Lithuania was the first republic to declare independence from the USSR in 1990.',
        de: 'Im Mittelalter das flächenmäßig größte Reich Europas, erklärte Litauen 1990 als erste Republik den Austritt aus der Sowjetunion.'
      },
      milestones: {
        tr: ['1253: Kral Mindaugas’ın Taç Giymesi', '1410: Grunwald Meydan Muharebesi Zaferi', '1990: Sovyetler Birliği’nden Bağımsızlığını İlk İlan Eden Ülke Olması'],
        en: ['1253: Coronation of King Mindaugas', '1410: Battle of Grunwald decisive victory over Teutonic Order', '1990: First Soviet republic to declare restored independence'],
        de: ['1253: Krönung von König Mindaugas', '1410: Schlacht bei Tannenberg (Grunwald)', '1990: Erste Unabhängigkeitserklärung von der UdSSR']
      }
    },
    sacredSites: {
      tr: ['Vilnius Aziz Anne Gotik Kilisesi (Napolyon’un Paris’e götürmek istediği kilise)', 'Şafak Kapısı Meryem Ana Şapeli'],
      en: ['St. Anne’s Church (Flamboyant Gothic Masterpiece)', 'Gate of Dawn Chapel of the Blessed Virgin Mary'],
      de: ['St.-Annen-Kirche (Vilnius)', 'Tor der Morgenröte (Vilnius)']
    },
    sectors: ['Lazer Fiziği ve Optik Teknolojileri (Küresel Lider)', 'Fintech ve Dijital Bankacılık Lisansları', 'Biyoteknoloji ve Yaşam Bilimleri', 'Mobilya İmalatı']
  },

  // Slovakya
  SK: {
    landmarks: {
      tr: ['Yüksek Tatralar (Vysoké Tatry Alpleri & Şelaleleri)', 'Spiš Kalesi (Orta Avrupa’nın En Büyük Kale Harabelerinden - UNESCO)', 'Bratislava Kalesi & Tuna Nehri UFO Kulesi', 'Bojnice Romantik Masal Şatosu', 'Demänovská Buz Mağarası'],
      en: ['High Tatras Alpine National Park', 'Spiš Castle Ruins (UNESCO)', 'Bratislava Castle & UFO Bridge over Danube', 'Bojnice Romantic Fairytale Castle', 'Demänovská Ice Cave'],
      de: ['Hohe Tatra Nationalpark', 'Zipser Burg (Spišský hrad)', 'Burg Bratislava & UFO-Brücke', 'Schloss Bojnice', 'Demänová-Eishöhle']
    },
    figures: {
      tr: ['Milan Rastislav Štefánik (Astronom, General ve Devlet Kurucusu)', 'Ľudovít Štúr (Slovak Dili ve Ulusal Uyanışının Lideri)', 'Peter Sagan (Üç Kez Üst Üste Yol Bisikleti Dünya Şampiyonu)'],
      en: ['Milan Rastislav Štefánik (General, Astronomer & Co-founder of State)', 'Ľudovít Štúr (Father of Slovak Written Language)', 'Peter Sagan (Three-time Cycling World Champion)'],
      de: ['Milan Rastislav Štefánik (General und Staatsmann)', 'Ľudovít Štúr (Sprachreformer)', 'Peter Sagan (Radweltmeister)']
    },
    history: {
      concise: {
        tr: 'Büyük Moravya’dan Avusturya-Macaristan ve Çekoslovakya dönemlerine uzanan köklü bir geçmişe sahip olan Slovakya, 1993 Kadife Boşanma ile barış içinde bağımsız olmuştur.',
        en: 'Tracing its roots to Great Moravia, Slovakia peacefully separated from Czechoslovakia in the 1993 Velvet Divorce, rapidly becoming a high-tech manufacturing hub.',
        de: 'Aus Großmähren hervorgegangen, trennte sich die Slowakei 1993 friedlich von Tschechien und stieg zu einem führenden Automobilstandort auf.'
      },
      milestones: {
        tr: ['863: Kiril ve Metodiy Kardeşlerin Büyük Moravya’ya Gelişi', '1918: Çekoslovakya Cumhuriyeti’nin İlanı', '1993: Kadife Boşanma ve Bağımsız Slovak Cumhuriyeti'],
        en: ['863: Saints Cyril and Methodius arrive in Great Moravia', '1918: Creation of Czechoslovakia', '1993: Velvet Divorce establishes the independent Slovak Republic'],
        de: ['863: Kyrill und Method in Großmähren', '1918: Gründung der Tschechoslowakei', '1993: Samtene Scheidung und Unabhängigkeit']
      }
    },
    sacredSites: {
      tr: ['Aziz Elizabeth Katedrali (Košice - Avrupa’nın En Doğu Gotik Katedrali)', 'Aziz Martin Katedrali (Bratislava - Macar Krallarının Taç Giyme Mabedi)'],
      en: ['St. Elisabeth Cathedral in Košice (Easternmost Gothic Cathedral)', 'St. Martin’s Cathedral (Bratislava Coronation Church)'],
      de: ['Dom der Heiligen Elisabeth (Košice)', 'Martinsdom (Bratislava)']
    },
    sectors: ['Otomotiv Üretimi (Kişi Başına Üretimde Dünya 1.si: VW, Kia, Stellantis, Jaguar)', 'Elektronik ve Hassas Mühendislik', 'Metalurji Sanayii', 'Dağ ve Kaplıca Turizmi']
  },

  // Slovenya
  SI: {
    landmarks: {
      tr: ['Bled Gölü & Ortasındaki Zümrüt Ada Kilisesi', 'Postojna Mağarası & Predjama Uçurum Kalesi', 'Ljubljana Ejderha Köprüsü & Kale Tepesi', 'Triglav Milli Parkı & Soča Zümrüt Nehri Vadisi', 'Piran Venedik Kıyı Kenti'],
      en: ['Lake Bled & Fairytale Island Church', 'Postojna Cave & Predjama Cliff Castle', 'Ljubljana Dragon Bridge & Castle Hill', 'Triglav National Park & Emerald Soča River', 'Piran Venetian Coastal Peninsula'],
      de: ['Bleder See & Inselkirche', 'Höhlen von Postojna & Höhlenburg Predjama', 'Ljubljana Drachenbrücke', 'Triglav-Nationalpark & Soča-Fluss', 'Küstenstadt Piran']
    },
    figures: {
      tr: ['Jože Plečnik (Ljubljana’yı şekillendiren efsanevi Modernist Mimar)', 'France Prešeren (Romantik Şair - Milli Marşın Yazarı)', 'Luka Dončić (NBA Süperstarı)', 'Slavoj Žižek (Filozof)'],
      en: ['Jože Plečnik (Master Architect who shaped Ljubljana & Prague)', 'France Prešeren (Romantic National Poet)', 'Luka Dončić (NBA Basketball Phenom)', 'Slavoj Žižek (Cultural Philosopher)'],
      de: ['Jože Plečnik (Architekt)', 'France Prešeren (Dichter)', 'Luka Dončić (NBA-Superstar)', 'Slavoj Žižek (Philosoph)']
    },
    history: {
      concise: {
        tr: 'Alpler, Akdeniz ve Pannonia ovasının buluşma noktasındaki Slovenya, Habsburg ve Yugoslavya dönemlerinin ardından 1991’de bağımsız olmuş, yeşil ve müreffeh bir Avrupa ülkesidir.',
        en: 'Where the Alps meet the Mediterranean, Slovenia declared independence in 1991 and has become Europe’s premier green, sustainable boutique nation.',
        de: 'Am Schnittpunkt der Alpen und des Mittelmeers erlangte Slowenien 1991 die Unabhängigkeit und ist heute Vorreiter für grünen Tourismus.'
      },
      milestones: {
        tr: ['623: Karantanya Slav Prensliği', '1918: Yugoslavya Krallığı’na Katılım', '1991: On Gün Savaşı ve Bağımsızlık İlanı', '2004: Avrupa Birliği ve Euro Alanı Tam Üyeliği'],
        en: ['623: Slavic principality of Carantania', '1918: Joins the Kingdom of Serbs, Croats and Slovenes', '1991: Ten-Day War secures independence', '2004: Joins the EU and adopts Euro in 2007'],
        de: ['623: Slawisches Fürstentum Karantanien', '1918: Beitritt zum Königreich der Serben, Kroaten und Slowenen', '1991: Zehn-Tage-Krieg sichert Freiheit', '2004: EU-Beitritt']
      }
    },
    sacredSites: {
      tr: ['Bled Adası Meryem Ana Kilisesi (Dilek Çanı Kulesi)', 'Ljubljana Aziz Nikolaos Katedrali'],
      en: ['Church of the Assumption on Bled Island (Wishing Bell)', 'Ljubljana Cathedral of St. Nicholas'],
      de: ['Marienkirche auf der Bleder Insel', 'Dom St. Nikolaus (Ljubljana)']
    },
    sectors: ['Sürdürülebilir Eko-Turizm', 'İlaç Endüstrisi (Krka, Lek)', 'Otomotiv Yan Sanayi ve Yüksek Teknoloji', 'Elektrikli Hafif Uçaklar (Pipistrel)']
  },

  // Kıbrıs
  CY: {
    landmarks: {
      tr: ['Baf Kral Mezarları & Dionysos Mozaikleri (UNESCO)', 'Trodos Dağları Bizans Kiliseleri', 'Ayia Napa Nissi Plajı & Cape Greco Deniz Mağaraları', 'Girne Limanı & Tarihi Kalesi'],
      en: ['Tombs of the Kings & Paphos Mosaics (UNESCO)', 'Troodos Painted Byzantine Churches', 'Cape Greco Sea Caves & Nissi Beach', 'Kyrenia Harbour & Castle'],
      de: ['Königsgräber von Nea Paphos (UNESCO)', 'Scheunendachkirchen im Troodos-Gebirge', 'Kap Greco Meereshöhlen', 'Hafen von Kyrenia']
    },
    figures: {
      tr: ['Zeno of Citium (Stoacı Felsefenin Kurucusu)', 'Başpiskopos Makarios III (İlk Cumhurbaşkanı)', 'Marcos Baghdatis (Grand Slam Finalisti Tenisçi)'],
      en: ['Zeno of Citium (Founder of Stoic Philosophy)', 'Archbishop Makarios III (Founding President)', 'Marcos Baghdatis (Tennis Star)'],
      de: ['Zenon von Kition (Philosoph)', 'Erzbischof Makarios III.', 'Marcos Baghdatis (Tennisspieler)']
    },
    history: {
      concise: {
        tr: 'Akdeniz’in üçüncü büyük adası olan Kıbrıs, 10.000 yıllık medeniyet geçmişine sahip olup Afrodit’in doğum yeri ve antik deniz ticaretinin kalbidir.',
        en: 'The Mediterranean’s third-largest island with 10,000 years of civilization, Cyprus is the mythological birthplace of Aphrodite and a maritime crossroads.',
        de: 'Als drittgrößte Insel des Mittelmeers blickt Zypern auf 10.000 Jahre Zivilisation zurück und ist mythologische Geburtsstätte der Aphrodite.'
      },
      milestones: {
        tr: ['M.Ö. 1200: Miken Yunan Kolonizasyonu', '1571: Osmanlı Fethi', '1960: İngiltere’den Bağımsızlık İlanı', '2004: Avrupa Birliği Üyeliği'],
        en: ['1200 BC: Mycenaean Greek settlement', '1571: Ottoman conquest', '1960: Independence from the United Kingdom', '2004: Accession to the European Union'],
        de: ['1200 v. Chr.: Mykenische Besiedlung', '1571: Osmanische Eroberung', '1960: Unabhängigkeit von Großbritannien', '2004: EU-Beitritt']
      }
    },
    sacredSites: {
      tr: ['Kikku Manastırı (Trodos Dağları - Altın Meryem İkonası)', 'Hala Sultan Tekkesi (Larnaka Tuz Gölü Kıyısı)'],
      en: ['Kykkos Monastery (Troodos Mountains)', 'Hala Sultan Tekke (Larnaca Salt Lake)'],
      de: ['Kykkos-Kloster', 'Hala-Sultan-Tekke']
    },
    sectors: ['Deniz Ticaret Filosu ve Gemi Yönetimi', 'Turizm ve Ağırlama', 'Uluslararası Finans ve Hukuk Hizmetleri', 'Hellim Peyniri İhracatı']
  },

  // Malta
  MT: {
    landmarks: {
      tr: ['Valletta Büyük Liman & Barrakka Bahçeleri (UNESCO)', 'St. John Eş-Katedrali (Caravaggio Başyapıtları)', 'Mdina Sessiz Şehir (Orta Çağ Duvarlı Başkent)', 'Mavi Mağara (Blue Grotto) & Gozo Adası'],
      en: ['Valletta Grand Harbour & Upper Barrakka Gardens', 'St. John’s Co-Cathedral (Caravaggio Masterpieces)', 'Mdina Silent City (Medieval Walled Capital)', 'Blue Grotto & Gozo Citadel'],
      de: ['Grand Harbour Valletta & Barrakka Gardens', 'St. John’s Co-Cathedral', 'Mdina die schweigende Stadt', 'Blaue Grotte & Insel Gozo']
    },
    figures: {
      tr: ['Jean Parisot de Valette (Malta Şövalyeleri Büyük Üstadı ve Valletta Kurucusu)', 'Joseph Calleja (Dünyaca Ünlü Tenor)', 'Dom Mintoff (Modern Malta Başbakanı)'],
      en: ['Jean Parisot de Valette (Grand Master of Knights of St. John)', 'Joseph Calleja (Operatic Tenor)', 'Dom Mintoff (Statesman)'],
      de: ['Jean de la Valette (Großmeister des Malteserordens)', 'Joseph Calleja (Opernsänger)', 'Dom Mintoff (Ministerpräsident)']
    },
    history: {
      concise: {
        tr: 'Piramitlerden eski megalitik tapınaklara ev sahipliği yapan Malta, Aziz Yuhanna Şövalyeleri ve 1565 Büyük Kuşatması ile Akdeniz tarihine yön vermiştir.',
        en: 'Home to megalithic temples older than Stonehenge, Malta was fortified by the Knights of St. John who famously repelled the Great Siege of 1565.',
        de: 'Heimat megalithischer Tempel, die älter als die Pyramiden sind, wurde Malta von den Johannitern geprägt und überstand die Große Belagerung von 1565.'
      },
      milestones: {
        tr: ['M.Ö. 3600: Ġgantija ve Ħaġar Qim Megalitik Tapınakları', '1565: Malta Büyük Kuşatması', '1964: İngiliz Milletler Topluluğu’ndan Bağımsızlık', '2004: Avrupa Birliği Üyeliği'],
        en: ['3600 BC: Construction of Ġgantija Megalithic Temples', '1565: The Great Siege of Malta', '1964: Independence from Britain', '2004: Joins the European Union'],
        de: ['3600 v. Chr.: Bau der Megalith-Tempel', '1565: Große Belagerung Maltas', '1964: Unabhängigkeit von Großbritannien', '2004: EU-Beitritt']
      }
    },
    sacredSites: {
      tr: ['St. John Eş-Katedrali (Şövalyelerin Mermer Mezar Mabedi)', 'Mosta Rotunda Kubbesi (Mucizevi Bomba Kilisesi)'],
      en: ['St. John’s Co-Cathedral (Knights’ Marble Tomb Nave)', 'Rotunda of Mosta (Miracle Bomb Dome)'],
      de: ['St. John’s Co-Cathedral', 'Rotunde von Mosta']
    },
    sectors: ['Uluslararası iGaming ve Dijital Eğlence', 'Denizcilik Tescili ve Liman Hizmetleri', 'Havacılık Bakım Onarım (MRO)', 'Turizm ve Dil Okulları']
  },

  // Lüksemburg
  LU: {
    landmarks: {
      tr: ['Bock Kazamatları & Yeraltı Tünelleri (UNESCO)', 'Vianden Masalsı Şatosu', 'Grund Vadisi & Alzette Nehri Kordonu', 'Müllerthal Küçük İsviçre Doğa Parkı'],
      en: ['Bock Casemates & Cliff Tunnels (UNESCO)', 'Vianden Fairytale Castle', 'Grund Quarter along Alzette River', 'Müllerthal Little Switzerland Forest'],
      de: ['Bock-Kasematten (UNESCO)', 'Burg Vianden', 'Stadtviertel Grund an der Alzette', 'Müllerthal (Kleine Luxemburger Schweiz)']
    },
    figures: {
      tr: ['Robert Schuman (Avrupa Birliği Kurucu Babası - Schuman Bildirgesi)', 'Büyük Dük Henri (Devlet Başkanı)', 'Charly Gaul (Tour de France Şampiyonu)'],
      en: ['Robert Schuman (Founding Father of the European Union)', 'Grand Duke Henri (Monarch)', 'Charly Gaul (Tour de France Winner)'],
      de: ['Robert Schuman (Gründervater der EU)', 'Großherzog Henri', 'Charly Gaul (Radsportler)']
    },
    history: {
      concise: {
        tr: '963 yılında Kont Siegfried’in Lucilinburhuc kalesini satın almasıyla doğan Lüksemburg, bugün dünyanın kişi başına düşen en yüksek milli gelirine sahip ülkesidir.',
        en: 'Founded in 963 when Count Siegfried acquired Lucilinburhuc castle, Luxembourg transformed from a fortress rock into a premier global financial capital.',
        de: '963 mit dem Erwerb der Burg Lucilinburhuc gegründet, entwickelte sich Luxemburg zu einem der führenden Finanzzentren weltweit.'
      },
      milestones: {
        tr: ['963: Kont Siegfried ve Lüksemburg’un Doğuşu', '1867: Londra Antlaşması ile Ebedi Tarafsızlık', '1957: Avrupa Birliği Kurucu Üyeliği ve Avrupa Adalet Divanı Başkenti'],
        en: ['963: Count Siegfried founds Luxembourg', '1867: Treaty of London confirms perpetual neutrality', '1957: Founding member of EU and seat of EU Court of Justice'],
        de: ['963: Gründung durch Graf Siegfried', '1867: Londoner Vertrag garantiert Neutralität', '1957: Gründungsmitglied der EU & Sitz des EuGH']
      }
    },
    sacredSites: {
      tr: ['Notre-Dame Katedrali (Lüksemburg Kraliyet Mezarı)', 'Echternach Aziz Willibrord Bazilikası (UNESCO Dans Eden Alay)'],
      en: ['Notre-Dame Cathedral (Grand Ducal Crypt)', 'St. Willibrord Basilica in Echternach (Dancing Procession)'],
      de: ['Kathedrale unserer lieben Frau', 'Basilika St. Willibrord in Echternach']
    },
    sectors: ['Yatırım Fonları Yönetimi (Avrupa Lideri)', 'Özel Bankacılık ve Finans', 'Uydu İletişimi ve Uzay Madenciliği (SES)', 'Çelik Sanayii (ArcelorMittal)']
  }
};
