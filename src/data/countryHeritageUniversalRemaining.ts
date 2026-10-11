import type { CountrySpecificHeritage } from './countryEncyclopediaLandmarks';

export const UNIVERSAL_REMAINING_HERITAGE: Record<string, CountrySpecificHeritage> = {
  // Ukrayna
  UA: {
    landmarks: {
      tr: ['Kiev Pechersk Lavra Mağara Manastırı & Ayasofya Katedrali (UNESCO)', 'Lviv Tarihi Eski Kent & Kahve Kültürü', 'Çernobil Hariç Tutma Bölgesi & Pripyat', 'Odessa Opera Binası & Potemkin Merdivenleri'],
      en: ['Kyiv Pechersk Lavra & St. Sophia Cathedral (UNESCO)', 'Lviv Historic Centre & Coffee Culture', 'Chernobyl Exclusion Zone & Pripyat', 'Odesa National Academic Opera & Potemkin Stairs'],
      de: ['Kiewer Höhlenkloster & Sophienkathedrale (UNESCO)', 'Historisches Zentrum von Lwiw', 'Tschernobyl Sperrzone', 'Opernhaus von Odessa & Potemkinsche Treppe']
    },
    figures: {
      tr: ['Taras Şevçenko (Ukrayna’nın Milli Şairi)', 'Lesya Ukrainka (Öncü Şair ve Yazar)', 'Andriy Şevçenko (Ballon d’Or Sahibi Futbol Efsanesi)', 'Volodimir Zelenski (Devlet Başkanı)'],
      en: ['Taras Shevchenko (National Literary Giant)', 'Lesya Ukrainka (Poet & Playwright)', 'Andriy Shevchenko (Ballon d’Or Winning Footballer)', 'Volodymyr Zelenskyy (President)'],
      de: ['Taras Schewtschenko (Nationaldichter)', 'Lesja Ukrajinka (Schriftstellerin)', 'Andrij Schewtschenko (Fußballstar)', 'Wolodymyr Selenskyj (Präsident)']
    },
    history: {
      concise: {
        tr: '988 yılında Hristiyanlığı kabul eden Doğu Slavlarının beşiği Kiev Knezliği’nden doğan Ukrayna, 1991’de bağımsız olmuş, Avrupa’nın tahıl ambarı ve bilişim gücüdür.',
        en: 'Cradle of Kyivan Rus baptized in 988, Ukraine reclaimed independence in 1991, enduring as Europe’s breadbasket and tech engineering hub.',
        de: 'Als Wiege der Kiewer Rus erlangte die Ukraine 1991 die Unabhängigkeit und ist die Kornkammer Europas sowie ein Software-Zentrum.'
      },
      milestones: {
        tr: ['988: Büyük Vladimir’in Vaftizi ve Kiev Knezliği’nin Hristiyanlaşması', '1648: Bogdan Hmelnitski Önderliğinde Kazak Hetmanlığı', '1991: Sovyetler Birliği’nden Tam Bağımsızlık İlanı'],
        en: ['988: Christianization of Kyivan Rus under Vladimir the Great', '1648: Bohdan Khmelnytsky leads Cossack Hetmanate', '1991: Declaration of Independence from USSR'],
        de: ['988: Christianisierung der Kiewer Rus', '1648: Kosaken-Hetmanat unter Bohdan Chmelnyzkyj', '1991: Unabhängigkeitserklärung von der Sowjetunion']
      }
    },
    sacredSites: {
      tr: ['Ayasofya Katedrali (Kiev - 11. yy Mozaikleri)', 'Pechersk Lavra Mağara Kiliseleri'],
      en: ['Saint Sophia Cathedral in Kyiv (11th Century Mosaics)', 'Kyiv Pechersk Lavra Monastery'],
      de: ['Sophienkathedrale (Kiew)', 'Kiewer Höhlenkloster']
    },
    sectors: ['Tarım ve Tahıl İhracatı (Ayçiçek Yağı & Buğdayda Dünya Lideri)', 'Yazılım ve Bilişim Mühendisliği', 'Ağır Metalurji ve Demir-Çelik', 'Havacılık ve Uzay Taşımacılığı (Antonov)']
  },

  // Venezuela
  VE: {
    landmarks: {
      tr: ['Angel Şelalesi (Salto Ángel - Dünyanın en yüksek kesintisiz şelalesi - 979m)', 'Los Roques Mercan Takımadaları & Karayip Cenneti', 'Roraima Tepesi (Tepui Düz Dağları - Kayıp Dünya)', 'Morrocoy Milli Parkı & Mangrov Lagünleri'],
      en: ['Angel Falls (World’s highest uninterrupted waterfall - 979m)', 'Los Roques Coral Archipelago', 'Mount Roraima (Prehistoric Tabletop Tepui)', 'Morrocoy National Park & Mangrove Keys'],
      de: ['Salto Ángel (Höchster Wasserfall der Erde - 979m)', 'Los Roques Korallenatolle', 'Tepui Tafelberg Roraima', 'Morrocoy-Nationalpark']
    },
    figures: {
      tr: ['Simón Bolívar (El Libertador - Güney Amerika’nın Kurtarıcısı)', 'Gustavo Dudamel (Dünyaca Ünlü Orkestra Şefi - El Sistema)', 'Carolina Herrera (Yüksek Moda Tasarımcısı)', 'Miguel Cabrera (Beyzbol Efsanesi)'],
      en: ['Simón Bolívar (El Libertador - Liberator of South America)', 'Gustavo Dudamel (Maestro Conductor - El Sistema)', 'Carolina Herrera (Fashion Icon)', 'Miguel Cabrera (Baseball Legend)'],
      de: ['Simón Bolívar (Der Befreier Südamerikas)', 'Gustavo Dudamel (Dirigent)', 'Carolina Herrera (Modeschöpferin)', 'Miguel Cabrera (Baseballstar)']
    },
    history: {
      concise: {
        tr: 'Simón Bolívar’ın anavatanı olan Venezuela, dünyanın en büyük kanıtlanmış ham petrol rezervlerine ev sahipliği yapar ve Karayipler ile Amazon’un kesiştiği doğa mucizesidir.',
        en: 'Homeland of Simón Bolívar, Venezuela possesses the world’s largest proven crude oil reserves and awe-inspiring natural wonders like Angel Falls.',
        de: 'Heimat von Simón Bolívar, besitzt Venezuela die weltweit größten Erdölreserven und Naturwunder wie den Salto Ángel.'
      },
      milestones: {
        tr: ['1811: Simón Bolívar Önderliğinde İspanya’dan Bağımsızlık İlanı', '1914: Zumaque-I Kuyusu ile Petrol Çağının Başlaması', '1960: OPEC’in (Petrol İhraç Eden Ülkeler Örgütü) Kurucu Üyeliği'],
        en: ['1811: Declaration of Independence led by Simón Bolívar', '1914: First commercial oil well Zumaque-I strikes petroleum', '1960: Founding member of OPEC'],
        de: ['1811: Unabhängigkeitserklärung unter Simón Bolívar', '1914: Beginn der Erdölförderung', '1960: Gründungsmitglied der OPEC']
      }
    },
    sacredSites: {
      tr: ['Caracas Metropolitan Katedrali', 'Coro Sömürge Dönemi Katedrali (UNESCO)'],
      en: ['Caracas Metropolitan Cathedral', 'Coro Colonial Cathedral (UNESCO)'],
      de: ['Kathedrale von Caracas', 'Kathedrale von Coro (UNESCO)']
    },
    sectors: ['Ham Petrol ve Rafineri Sanayii (Dünyanın En Büyük Rezervi)', 'Kakao ve Çikolata Üretimi (Chuao Kakaosu)', 'Alüminyum ve Boksit Madenciliği', 'Romatizma Termal ve Doğa Turizmi']
  },

  // Gana
  GH: {
    landmarks: {
      tr: ['Cape Coast Kalesi & Tarihi Köle Zindanları (UNESCO)', 'Kakum Milli Parkı & Yağmur Ormanı Asma Köprüleri', 'Mole Milli Parkı & Yaban Savana Safarisi', 'Ashanti Krallığı Manhyia Sarayı (Kumasi)', 'Labadi Sahili & Akra Sanat Pazarları'],
      en: ['Cape Coast Castle & Door of No Return (UNESCO)', 'Kakum National Park Canopy Walkway', 'Mole National Park Elephant Safari', 'Manhyia Palace (Ashanti Kingdom Seat)', 'Labadi Beach & Accra Arts Centre'],
      de: ['Cape Coast Castle (UNESCO)', 'Kakum-Nationalpark Baumkronenpfad', 'Mole-Nationalpark', 'Manhyia-Palast (Ashanti-Reich)', 'Labadi Beach in Accra']
    },
    figures: {
      tr: ['Kwame Nkrumah (Pan-Afrika Lideri ve İlk Devlet Başkanı)', 'Kofi Annan (Nobel Barış Ödüllü Birleşmiş Milletler Genel Sekreteri)', 'Asamoah Gyan (Milli Futbol Yıldızı ve Afrika Dünya Kupası Gol Rekortmeni)'],
      en: ['Kwame Nkrumah (Pan-African Pioneer & First President)', 'Kofi Annan (Nobel Peace Laureate & UN Secretary-General)', 'Asamoah Gyan (Football Icon & All-time African World Cup Top Scorer)'],
      de: ['Kwame Nkrumah (Staatsgründer & Panafrikanist)', 'Kofi Annan (UN-Generalsekretär & Friedensnobelpreisträger)', 'Asamoah Gyan (Fußballstar)']
    },
    history: {
      concise: {
        tr: 'Kadim Aşanti İmparatorluğu’nun ve Altın Sahili’nin mirasçısı olan Gana, 1957’de Sahra Altı Afrika’da sömürgecilikten bağımsızlığını kazanan ilk ülke olmuştur.',
        en: 'Heir to the Golden Stool of the Ashanti Empire, Ghana made history in 1957 as the first sub-Saharan African nation to gain independence.',
        de: 'Erbe des Ashanti-Reiches, erlangte Ghana 1957 als erste Nation Subsahara-Afrikas die Unabhängigkeit und gilt als Musterdemokratie.'
      },
      milestones: {
        tr: ['1701: Osei Tutu Tarafından Aşanti Krallığı’nın Kuruluşu', '1957: Kwame Nkrumah Önderliğinde İngiltere’den Bağımsızlık', '2019: Köle Ticaretinin 400. Yılında "Dönüş Yılı" (Year of Return) Hareketi'],
        en: ['1701: Osei Tutu unifies the Ashanti Empire with the Golden Stool', '1957: Ghana achieves independence led by Kwame Nkrumah', '2019: Global "Year of Return" diaspora landmark campaign'],
        de: ['1701: Gründung des Ashanti-Reiches', '1957: Unabhängigkeit Ghanas unter Kwame Nkrumah', '2019: Initiative "Year of Return"']
      }
    },
    sacredSites: {
      tr: ['Larabanga Camii (1421 - Gana’nın En Eski Çamur Kerpiç Camii)', 'Elmina Aziz George Kalesi'],
      en: ['Larabanga Mosque (1421 Mud-brick Sudanese Architecture)', 'St. George’s Castle in Elmina'],
      de: ['Larabanga-Moschee (1421 Lehmbau-Moschee)', 'St. George’s Castle (Elmina)']
    },
    sectors: ['Altın Madenciliği (Afrika’nın 1 Numaralı Altın Üreticisi)', 'Kakao İhracatı (Dünya 2.si Premium Kakao)', 'Petrol ve Doğal Gaz Çıkarımı', 'Geleneksel Kente Kumaşı Dokumacılığı']
  },

  // Senegal
  SN: {
    landmarks: {
      tr: ['Gorée Adası & Kölelerin Dönüşü Olmayan Kapısı (UNESCO)', 'Gül Gölü (Lac Rose - Pembe Su Lagünü & Paris-Dakar Rallisi Bitiş Çizgisi)', 'Afrika Rönesans Anıtı (Dakar - Özgürlük Heykeli’nden yüksek dev bronz anıt)', 'Djoudj Ulusal Kuş Cenneti (Pelikan Kolonileri)', 'Saint-Louis Tarihi Sömürge Kenti'],
      en: ['Gorée Island & Door of No Return (UNESCO)', 'Lake Retba (Pink Lake - Historic Dakar Rally finish)', 'African Renaissance Monument (Dakar Giant Bronze Colossus)', 'Djoudj National Bird Sanctuary (Pelican Haven)', 'Historic Island of Saint-Louis'],
      de: ['Insel Gorée (UNESCO)', 'Retba-See (Rosa See)', 'Monument de la Renaissance Africaine (Dakar)', 'Djoudj Vogelschutzgebiet', 'Insel Saint-Louis']
    },
    figures: {
      tr: ['Léopold Sédar Senghor (Şair, Négritude Hareketi Öncüsü ve İlk Cumhurbaşkanı)', 'Sadio Mané (Afrika Yılın Futbolcusu ve İnsani Yardımsever)', 'Youssou N’Dour (Grammy Ödüllü Müzisyen - Seven Seconds)'],
      en: ['Léopold Sédar Senghor (Poet, Philosopher of Négritude & President)', 'Sadio Mané (African Footballer of the Year & Philanthropist)', 'Youssou N’Dour (Grammy-winning Musical Icon)'],
      de: ['Léopold Sédar Senghor (Dichter & Präsident)', 'Sadio Mané (Fußballstar)', 'Youssou N’Dour (Musiker)']
    },
    history: {
      concise: {
        tr: 'Batı Afrika’nın demokrasi ve sanat feneri olan Senegal, Wolof ve Serer kültürlerinin hoşgörü felsefesi "Teranga" ile kıtanın en istikrarlı cumhuriyetidir.',
        en: 'Beacon of democratic stability and West African arts, Senegal is world-famous for its deep-rooted hospitality code known as "Teranga".',
        de: 'Als Hort der Stabilität und Wiege westafrikanischer Kunst ist der Senegal weltberühmt für seine tief verwurzelte Gastfreundschaft "Teranga".'
      },
      milestones: {
        tr: ['1444: Portekizli Denizcilerin Yeşil Burun’a (Cap-Vert) Ulaşması', '1960: Şair Léopold Senghor Önderliğinde Bağımsızlık', '1966: İlk Dünya Zenci Sanatları Festivali’ne Ev Sahipliği Yapması'],
        en: ['1444: Portuguese sailors reach Cap-Vert peninsula', '1960: Senegal gains independence with Léopold Senghor', '1966: Hosts First World Festival of Black Arts'],
        de: ['1444: Portugiesen erreichen Cap-Vert', '1960: Unabhängigkeit unter Léopold Senghor', '1966: Erstes Weltfestival der schwarzen Kunst']
      }
    },
    sacredSites: {
      tr: ['Touba Ulu Camii (Müridiyye Sufi Kardeşliğinin Kutsal Merkezi)', 'Dakar Ulu Camii'],
      en: ['Great Mosque of Touba (Holy Center of Mouride Brotherhood)', 'Grand Mosque of Dakar'],
      de: ['Große Moschee von Touba', 'Große Moschee von Dakar']
    },
    sectors: ['Balıkçılık ve Deniz Ürünleri İhracatı', 'Yer Fıstığı ve Tarım Ürünleri', 'Fosfat Madenciliği', 'Turizm ve Kültür Festivalleri']
  },

  // Nepal
  NP: {
    landmarks: {
      tr: ['Everest Dağı (Sagarmatha - 8.848m ile Dünyanın Zirvesi)', 'Katmandu Durbar Meydanı & Swayambhunath Maymun Tapınağı', 'Pokhara Şehri & Annapurna Dağ Sıradağları Yansıması (Phewa Gölü)', 'Chitwan Milli Parkı & Tek Boynuzlu Gergedanlar (UNESCO)', 'Lumbini (Gautama Buddha’nın Doğduğu Kutsal Bahçe)'],
      en: ['Mount Everest (Sagarmatha - 8,848m Roof of the World)', 'Kathmandu Durbar Square & Swayambhunath Monkey Temple', 'Pokhara Lakeside & Annapurna Range Reflection', 'Chitwan National Park One-Horned Rhinos (UNESCO)', 'Lumbini Sacred Garden (Birthplace of Lord Buddha)'],
      de: ['Mount Everest (Sagarmatha - 8.848m höchster Berg der Erde)', 'Durbar-Platz in Kathmandu & Swayambhunath', 'Pokhara & Annapurna-Massiv', 'Chitwan-Nationalpark (Panzernashörner)', 'Lumbini (Geburtsort Buddhas)']
    },
    figures: {
      tr: ['Gautama Buddha (M.Ö. 6. yy - Budizm’in Kurucusu)', 'Tenzing Norgay (Everest Zirvesi’ne Çıkan İlk Dağcı Şerpa)', 'Prithvi Narayan Shah (Nepal’i Birleştiren Büyük Kral)'],
      en: ['Gautama Buddha (Founder of Buddhism, born in Lumbini)', 'Tenzing Norgay (Legendary Sherpa who first summited Everest)', 'Prithvi Narayan Shah (Great Unifier King of Nepal)'],
      de: ['Gautama Buddha (Religionsstifter)', 'Tenzing Norgay (Erstbesteiger des Mount Everest)', 'Prithvi Narayan Shah (König und Einiger Nepals)']
    },
    history: {
      concise: {
        tr: 'Himalayaların zirvesinde yer alan ve hiçbir zaman sömürgeleştirilmeyen Nepal, Budizm’in doğduğu Lumbini’ye ev sahipliği yapar ve cesur Gurkha savaşçılarıyla tanınır.',
        en: 'Nestled beneath the highest peaks on Earth, Nepal was never colonized, serving as the spiritual cradle of Buddhism and home of the legendary Gurkhas.',
        de: 'Im Schatten der höchsten Berge der Welt gelegen, wurde Nepal nie kolonialisiert und ist die spirituelle Wiege des Buddhismus.'
      },
      milestones: {
        tr: ['M.Ö. 563: Gautama Buddha’nın Lumbini’de Dünyaya Gelişi', '1768: Gorkha Krallığı ile Nepal’in Birleşmesi', '1953: Edmund Hillary ve Tenzing Norgay’ın Everest’i Fethi'],
        en: ['563 BC: Birth of Siddhartha Gautama in Lumbini', '1768: Prithvi Narayan Shah unifies the Kingdom of Nepal', '1953: First successful ascent of Mount Everest by Hillary and Tenzing'],
        de: ['563 v. Chr.: Geburt Buddhas in Lumbini', '1768: Einigung Nepals durch Prithvi Narayan Shah', '1953: Erstbesteigung des Mount Everest']
      }
    },
    sacredSites: {
      tr: ['Pashupatinath Tapınağı (Bagmati Nehri Kıyısı Şiva Mabedi)', 'Boudhanath Dev Budist Stupası (UNESCO)'],
      en: ['Pashupatinath Temple (Sacred Hindu Shiva Sanctuary)', 'Boudhanath Giant Stupa (UNESCO)'],
      de: ['Pashupatinath-Tempel (Shiva-Heiligtum)', 'Boudhanath-Stupa (UNESCO)']
    },
    sectors: ['Himalaya Dağcılık ve Trekking Turizmi', 'Hidroelektrik Enerji Potansiyeli', 'El Dokuması Halı ve Paşmina Yünü', 'Çay ve Baharat İhracatı']
  },

  // Sri Lanka
  LK: {
    landmarks: {
      tr: ['Sigiriya Aslan Kayası Kalesi (Gökyüzündeki Saray - UNESCO)', 'Kandy Kutsal Diş Tapınağı (Sri Dalada Maligawa)', 'Ella Dokuz Kemerli Demiryolu Köprüsü & Çay Vadileri', 'Galle Tarihi Hollanda Kalesi & Feneri', 'Yala Milli Parkı (Dünyanın en yoğun leopar nüfusu)'],
      en: ['Sigiriya Lion Rock Fortress (Palace in the Sky UNESCO)', 'Temple of the Sacred Tooth Relic (Kandy)', 'Nine Arches Bridge & Highland Tea Train (Ella)', 'Galle Dutch Fort & Lighthouse (UNESCO)', 'Yala National Park (Highest Leopard Density)'],
      de: ['Löwenfelsen von Sigiriya (UNESCO)', 'Zahntempel von Kandy', 'Nine Arches Bridge & Teeregion Ella', 'Holländische Festung Galle', 'Yala-Nationalpark (Leoparden-Safari)']
    },
    figures: {
      tr: ['Sirimavo Bandaranaike (Dünyanın İlk Kadın Başbakanı - 1960)', 'Michael Ondaatje (İngiliz Hasta Romanının Yazarı - Booker Ödülü)', 'Muttiah Muralitharan (Kriket Tarihinin En Çok Wicket Alan Oyuncusu)'],
      en: ['Sirimavo Bandaranaike (World’s First Female Prime Minister)', 'Michael Ondaatje (Author of The English Patient)', 'Muttiah Muralitharan (Record Cricket Legend)'],
      de: ['Sirimavo Bandaranaike (erste Premierministerin der Welt)', 'Michael Ondaatje (Schriftsteller)', 'Muttiah Muralitharan (Cricket-Legende)']
    },
    history: {
      concise: {
        tr: 'Hint Okyanusu’nun İncisi olarak bilinen Sri Lanka, 2.500 yıllık Budist krallık mirası, sömürge döneminden kalan Seylan çayı ve zümrüt tepeleriyle büyüleyicidir.',
        en: 'The Pearl of the Indian Ocean, Sri Lanka boasts 2,500 years of royal Buddhist civilization and world-renowned Ceylon tea estates.',
        de: 'Als Perle des Indischen Ozeans blickt Sri Lanka auf 2.500 Jahre buddhistische Kultur zurück und ist weltberühmt für Ceylon-Tee.'
      },
      milestones: {
        tr: ['M.Ö. 247: Budizm’in Adaya Gelişi ve Anuradhapura Krallığı', '1867: James Taylor Tarafından İlk Seylan Çayı Plantasyonunun Kurulması', '1948: İngiltere’den Bağımsızlık İlanı'],
        en: ['247 BC: Introduction of Buddhism under King Devanampiya Tissa', '1867: Commercial Ceylon tea planting begins with James Taylor', '1948: Independence from the British Empire'],
        de: ['247 v. Chr.: Einführung des Buddhismus', '1867: Erste kommerzielle Ceylon-Teeplantage', '1948: Unabhängigkeit von Großbritannien']
      }
    },
    sacredSites: {
      tr: ['Kutsal Diş Tapınağı (Kandy)', 'Dambulla Altın Mağara Tapınakları (UNESCO)', 'Adem Tepesi (Sri Pada - Kutsal Ayak İzi Zirvesi)'],
      en: ['Temple of the Sacred Tooth Relic in Kandy', 'Dambulla Golden Cave Temple (UNESCO)', 'Adam’s Peak (Sri Pada Sacred Mountain Summit)'],
      de: ['Zahntempel von Kandy', 'Höhlentempel von Dambulla', 'Adam’s Peak (Sri Pada)']
    },
    sectors: ['Seylan Çayı İhracatı (Dünya 1.si Kalite Çay)', 'Safir ve Değerli Taş Madenciliği (Mavi Seylan Safiri)', 'Konfeksiyon ve Tekstil İmalatı', 'Kıyı, Sörf ve Yaban Hayatı Turizmi']
  }
};
