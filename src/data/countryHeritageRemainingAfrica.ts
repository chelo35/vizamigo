import type { CountrySpecificHeritage } from './countryEncyclopediaLandmarks';

export const AFRICA_REMAINING_HERITAGE: Record<string, CountrySpecificHeritage> = {
  // Cezayir
  DZ: {
    landmarks: {
      tr: ['Cezayir Kasbah Eski Kenti (UNESCO Akdeniz Mirası)', 'Djemila Antik Roma Dağ Şehri Harabeleri', 'Tassili n’Ajjer Sahra Çölü Kaya Resimleri (UNESCO)', 'Ghardaïa M’Zab Vadisi Vaha Mimarisi', 'Büyük Cezayir Camii (Djamaa el Djazair - Dünyanın en yüksek minaresi)'],
      en: ['Casbah of Algiers (UNESCO Mediterranean Citadel)', 'Djemila Roman Mountain Ruins', 'Tassili n’Ajjer Prehistoric Rock Art (Sahara)', 'M’Zab Valley Ghardaïa Oasis', 'Djamaa el Djazair (World’s tallest minaret)'],
      de: ['Kasbah von Algier (UNESCO)', 'Römische Ruinenstadt Djemila', 'Tassili n’Ajjer Felsmalereien (Sahara)', 'M’Zab-Tal Oasen', 'Große Moschee von Algier']
    },
    figures: {
      tr: ['Emir Abdülkadir (Cezayir Devleti’nin Kurucusu ve Direniş Önderi)', 'Albert Camus (Cezayir doğumlu Nobel Edebiyat Ödüllü Yazar - Yabancı)', 'Riyad Mahrez (Milli Futbol Yıldızı)', 'Frantz Fanon (Sömürgecilik Karşıtı Düşünür)'],
      en: ['Emir Abdelkader (Founder of Modern Algeria & Resistance Hero)', 'Albert Camus (Nobel Laureate, born in Mondovi)', 'Riyad Mahrez (Football Star)', 'Frantz Fanon (Anti-colonial Philosopher)'],
      de: ['Emir Abdelkader (Nationalheld)', 'Albert Camus (Nobelpreisträger)', 'Riyad Mahrez (Fußballstar)', 'Frantz Fanon (Denker)']
    },
    history: {
      concise: {
        tr: 'Numidya ve Berberi uygarlıklarından Osmanlı eyaletine uzanan Cezayir, 1954-1962 bağımsızlık savaşında 1.5 milyon şehit vererek egemenliğini kazanan Afrika’nın yüzölçümü en büyük ülkesidir.',
        en: 'From Numidian and Berber kingdoms to the Ottoman era, Algeria won its independence after a heroic 1954-1962 liberation war, standing as Africa’s largest nation.',
        de: 'Von numidischen Reichen geprägt, erkämpfte Algerien 1962 im Befreiungskrieg die Unabhängigkeit und ist heute das flächenmäßig größte Land Afrikas.'
      },
      milestones: {
        tr: ['M.Ö. 202: Kral Masinissa ve Numidya Krallığı', '1830: Fransız İşgaline Karşı Emir Abdülkadir Direnişi', '1962: Bağımsızlık İlanı ve Cezayir Demokratik Halk Cumhuriyeti'],
        en: ['202 BC: King Masinissa unites Numidia', '1830: Emir Abdelkader leads resistance to French conquest', '1962: Independence declared after war of liberation'],
        de: ['202 v. Chr.: König Masinissa eint Numidien', '1830: Widerstand unter Emir Abdelkader', '1962: Unabhängigkeitserklärung']
      }
    },
    sacredSites: {
      tr: ['Djamaa el Djazair (Cezayir Ulu Camii)', 'Notre-Dame d’Afrique Bazilikası (Afrika Bizim Leydimiz)'],
      en: ['Djamaa el Djazair (Great Mosque of Algiers)', 'Notre Dame d’Afrique Basilica'],
      de: ['Große Moschee von Algier', 'Basilika Unserer Lieben Frau von Afrika']
    },
    sectors: ['Doğal Gaz İhracatı (Avrupa’nın Önemli Gaz Tedarikçisi)', 'Ham Petrol ve Petrokimya Sanayi (Sonatrach)', 'Güneş ve Çöl Güneş Enerjisi Projeleri', 'Tarım (Hurma ve Zeytin Üretimi)']
  },

  // Tunus
  TN: {
    landmarks: {
      tr: ['Kartaca Antik Harabeleri & Antoninus Roma Hamamları (UNESCO)', 'Sidi Bou Said Mavi-Beyaz Sanatçı Köyü', 'El Cem Roma Amfitiyatrosu (Afrika’nın Kolezyumu)', 'Sahra Çölü Matmata Yeraltı Evleri (Star Wars Çekim Yeri)', 'Tunus Medinası & Zeytune Camii'],
      en: ['Ancient Ruins of Carthage & Antonine Baths (UNESCO)', 'Sidi Bou Said Blue-and-White Clifftop Haven', 'Amphitheatre of El Jem (Colosseum of North Africa)', 'Matmata Underground Berber Troglodyte Homes', 'Medina of Tunis & Al-Zaytuna Mosque'],
      de: ['Antikes Karthago (UNESCO)', 'Sidi Bou Said Künstlerdorf', 'Amphitheater von El Djem', 'Matmata Höhlenwohnungen', 'Medina von Tunis']
    },
    figures: {
      tr: ['Hannibal Barca (Roma’yı Dize Getiren Kartacalı Efsanevi Askeri Deha)', 'İbn Haldun (Sosyoloji ve Tarih Felsefesinin Babası - Mukaddime’nin Yazarı)', 'Habib Burgiba (Modern Tunus’un Kurucu Cumhurbaşkanı)', 'Ons Jabeur (Wimbledon Finalisti Tenis Yıldızı)'],
      en: ['Hannibal Barca (Legendary Carthaginian Military Genius)', 'Ibn Khaldun (Father of Modern Historiography & Sociology)', 'Habib Bourguiba (Founding Father & Modernizer of Tunisia)', 'Ons Jabeur (Trailblazing Tennis Star)'],
      de: ['Hannibal Barkas (Karthagischer Feldherr)', 'Ibn Chaldun (Geschichtsphilosoph)', 'Habib Bourguiba (Staatsgründer)', 'Ons Jabeur (Tennisspielerin)']
    },
    history: {
      concise: {
        tr: 'Akdeniz’i titreten Kartaca İmparatorluğu’nun ve İslam düşüncesinin merkezlerinden Zeytune’nin yurdu olan Tunus, 1956’da bağımsız olmuş, Arap dünyasının en ilerici sivil toplumuna sahiptir.',
        en: 'Homeland of mighty Carthage and Ibn Khaldun, Tunisia won independence in 1956 and stands as a progressive North African cultural and tourism beacon.',
        de: 'Heimat des antiken Karthago und Ibn Chalduns, erlangte Tunesien 1956 die Unabhängigkeit und gilt als kulturelle Brücke zwischen Europa und Afrika.'
      },
      milestones: {
        tr: ['M.Ö. 814: Kraliçe Dido Tarafından Kartaca’nın Kuruluşu', 'M.S. 698: Ukbe bin Nafi ve Kayrevan (Kairouan) ile İslamiyetin Yayılması', '1956: Habib Burgiba Önderliğinde Fransa’dan Bağımsızlık'],
        en: ['814 BC: Foundation of Carthage by Queen Dido', '698 AD: Islamic civilization and founding of Kairouan', '1956: Tunisian Independence under Habib Bourguiba'],
        de: ['814 v. Chr.: Gründung Karthagos', '698 n. Chr.: Islamische Blütezeit & Kairouan', '1956: Unabhängigkeit Tunesiens']
      }
    },
    sacredSites: {
      tr: ['Kayrevan Ukbe Ulu Camii (İslam’ın En Eski Mabedlerinden - UNESCO)', 'Zeytune Camii (Tunus Medinası)', 'El Griba Sinagogu (Cerbe Adası - Afrika’nın En Eski Sinagogu)'],
      en: ['Great Mosque of Kairouan (One of Islam’s oldest sanctuaries)', 'Al-Zaytuna Mosque in Tunis', 'El Ghriba Synagogue on Djerba Island'],
      de: ['Große Moschee von Kairouan', 'Zaytuna-Moschee', 'Al-Ghriba-Synagoge (Djerba)']
    },
    sectors: ['Zeytinyağı İhracatı (Dünyanın 2. Büyük Üreticisi)', 'Akdeniz Sahil ve Kültür Turizmi', 'Otomotiv ve Havacılık Kablo Aksamı', 'Hurma (Deglet Nour) ve Tarım']
  },

  // Etiyopya
  ET: {
    landmarks: {
      tr: ['Lalibela Yekpare Kaya Kiliseleri (Afrika’nın Kudüs’ü - UNESCO)', 'Simien Dağları Milli Parkı & Gelada Babunları', 'Danakil Çöküntüsü & Erta Ale Lav Gölü (Dünyanın en sıcak ve en alçak jeolojik harikası)', 'Aksum Dikilitaşları & Ahit Sandığı Şapeli', 'Omo Vadisi Kabileleri'],
      en: ['Rock-Hewn Churches of Lalibela (UNESCO Monolithic Wonder)', 'Simien Mountains National Park & Gelada Baboons', 'Danakil Depression & Erta Ale Lava Lake', 'Axumite Obelisks & Ark of the Covenant Chapel', 'Omo Valley Indigenous Cultures'],
      de: ['Felsenkirchen von Lalibela (UNESCO)', 'Simien-Nationalpark', 'Danakil-Senke & Erta Ale Lavasee', 'Obelisken von Aksum', 'Omo-Tal Völker']
    },
    figures: {
      tr: ['Haile Selassie I (Son İmparator)', 'Abebe Bikila (Olimpiyatlarda Çıplak Ayakla Maraton Kazanan Efsane)', 'Haile Gebrselassie & Kenenisa Bekele (Uzun Mesafe Koşu Rekortmenleri)', 'Kraliçe Şeba (Makeda)'],
      en: ['Emperor Haile Selassie I', 'Abebe Bikila (Legendary Barefoot Olympic Marathon Champion)', 'Haile Gebrselassie & Kenenisa Bekele (Distance Running Icons)', 'Queen of Sheba'],
      de: ['Kaiser Haile Selassie I.', 'Abebe Bikila (Barfuß-Marathonsieger)', 'Haile Gebrselassie (Lauflegende)', 'Königin von Saba']
    },
    history: {
      concise: {
        tr: '3.2 milyon yıllık "Lucy" fosilinin vatanı olan Etiyopya, Afrika’da sömürgeleştirilemeyen tek bağımsız devlet olup 3.000 yıllık kesintisiz imparatorluk ve kahve doğum yeridir.',
        en: 'Homeland of 3.2-million-year-old "Lucy" and the birthplace of coffee, Ethiopia is Africa’s only nation that successfully resisted colonial conquest (Adwa 1896).',
        de: 'Heimat der Vormenschen-Urahnin "Lucy" und Ursprungsland des Kaffees, behauptete Äthiopien 1896 in Adwa als einzige afrikanische Nation seine Unabhängigkeit.'
      },
      milestones: {
        tr: ['M.Ö. 1000: Aksum Krallığı ve Kraliçe Şeba Mirası', 'M.S. 1187: Kral Lalibela Tarafından Kaya Oyma Kiliselerin İnşası', '1896: Adwa Muharebesi ile İtalyan İşgalcilerin Mağlup Edilmesi'],
        en: ['1000 BC: Rise of the Kingdom of Axum', '1187 AD: King Lalibela carves the rock-hewn monolithic churches', '1896: Battle of Adwa historic victory over European colonizers'],
        de: ['1000 v. Chr.: Aufstieg des Königreichs von Aksum', '1187 n. Chr.: Bau der Felsenkirchen von Lalibela', '1896: Schlacht von Adwa (Sieg über Kolonialtruppen)']
      }
    },
    sacredSites: {
      tr: ['Lalibela Aziz George (Bet Giyorgis) Haç Kiliseleri', 'Aksum Meryem Ana Zion Kilisesi (Ahit Sandığı’nı Koruyan Mabed)', 'Harar Jugol (İslam’ın 4. Kutsal Kenti - UNESCO)'],
      en: ['Church of Saint George (Bet Giyorgis) in Lalibela', 'Church of Our Lady Mary of Zion (Ark of the Covenant)', 'Harar Jugol Historic Walled Muslim City'],
      de: ['Kirche des Heiligen Georg (Lalibela)', 'Kathedrale der Heiligen Maria von Zion', 'Historische Stadtmauerstadt Harar (UNESCO)']
    },
    sectors: ['Özel Kahve İhracatı (Arabica Kahvesinin Genetik Anavatanı - Yirgacheffe, Sidamo)', 'Havacılık Taşımacılığı (Ethiopian Airlines - Afrika’nın En Büyük Havayolu)', 'Tekstil ve Deri Sanayii', 'Çiçekçilik ve Tarım']
  },

  // Nijerya
  NG: {
    landmarks: {
      tr: ['Zuma Kayası (Nijerya’nın Doğal Kapısı - Abuja)', 'Lekki Koruma Merkezi & Asma Yürüyüş Yolu (Lagos)', 'Osun-Osogbo Kutsal Korusu (UNESCO)', 'Yankari Milli Parkı & Sıcak Su Kaynakları', 'Kano Antik Şehir Surları & Emir Sarayı'],
      en: ['Zuma Rock Monolith (Gateway to Abuja)', 'Lekki Conservation Centre Canopy Walkway (Lagos)', 'Osun-Osogbo Sacred Grove (UNESCO)', 'Yankari National Park & Wikki Warm Springs', 'Ancient Kano City Walls & Emir’s Palace'],
      de: ['Zuma Rock Monolith', 'Lekki Conservation Centre (Lagos)', 'Heiliger Hain von Osun-Osogbo (UNESCO)', 'Yankari-Nationalpark', 'Stadtmauern von Kano']
    },
    figures: {
      tr: ['Wole Soyinka (Afrika’nın İlk Nobel Edebiyat Ödüllü Yazarı)', 'Chinua Achebe (Afrika Edebiyatının Babası - Parçalanma)', 'Fela Kuti (Afrobeat Müziğinin Kurucusu ve Aktivist)', 'Ngozi Okonjo-Iweala (Dünya Ticaret Örgütü Genel Direktörü)', 'Victor Osimhen (Futbol Yıldızı)'],
      en: ['Wole Soyinka (First African Nobel Laureate in Literature)', 'Chinua Achebe (Father of Modern African Literature - Things Fall Apart)', 'Fela Kuti (Pioneer of Afrobeat & Political Activist)', 'Ngozi Okonjo-Iweala (Director-General of WTO)', 'Victor Osimhen (Football Icon)'],
      de: ['Wole Soyinka (Nobelpreisträger)', 'Chinua Achebe (Schriftsteller)', 'Fela Kuti (Afrobeat-Legende)', 'Ngozi Okonjo-Iweala (Generaldirektorin der WTO)', 'Victor Osimhen (Fußballstar)']
    },
    history: {
      concise: {
        tr: 'Nok, Benin ve Oyo gibi gelişmiş antik krallıklara ev sahipliği yapan Nijerya, 1960’ta bağımsız olmuş, 220 milyonu aşan nüfusuyla Afrika’nın en büyük ekonomisi ve kültür motorudur.',
        en: 'Home to ancient Nok, Yoruba, and Benin civilizations, Nigeria won independence in 1960, standing as Africa’s most populous democracy and cultural titan.',
        de: 'Heimat der antiken Nok-Kultur und des Königreichs Benin, erlangte Nigeria 1960 die Unabhängigkeit und ist heute die bevölkerungsreichste Nation Afrikas.'
      },
      milestones: {
        tr: ['M.Ö. 500: Nok Uygarlığı ve Pişmiş Toprak Heykeltıraşlığı', '1960: İngiltere’den Bağımsızlık İlanı', '2000+: Nollywood Sinema ve Afrobeats Küresel Müzik Patlaması'],
        en: ['500 BC: Nok Terracotta Civilization emerges', '1960: Independence from the United Kingdom', '2000+: Global rise of Nollywood film and Afrobeats music'],
        de: ['500 v. Chr.: Nok-Kultur (Terrakotta-Kunst)', '1960: Unabhängigkeit von Großbritannien', '2000+: Globaler Boom von Nollywood und Afrobeats']
      }
    },
    sacredSites: {
      tr: ['Abuja Ulusal Camii (Altın Kubbeli Başkent Mabedi)', 'Osun-Osogbo Kutsal Nehri ve Orman Mabedi', 'Lagos Kutsal Haç Katedrali'],
      en: ['Abuja National Mosque (Golden Dome Capital Landmark)', 'Osun-Osogbo Sacred River Shrine', 'Cathedral of the Holy Cross in Lagos'],
      de: ['Nationalmoschee von Abuja', 'Osun-Osogbo Flussheiligtum', 'Heilig-Kreuz-Kathedrale (Lagos)']
    },
    sectors: ['Ham Petrol ve Doğal Gaz Üretimi (Afrika’nın En Büyük Üreticisi)', 'Nollywood Sinema ve Eğlence Endüstrisi (Dünya 2.si Film Üretimi)', 'Fintech ve Dijital Ödeme Altyapıları (Lagos Silikon Lagünü)', 'Tarım (Manyok ve Kakao Üretimi)']
  },

  // Tanzanya
  TZ: {
    landmarks: {
      tr: ['Serengeti Milli Parkı (Büyük Göçün Sonsuz Ovaları - UNESCO)', 'Kilimanjaro Dağı (Afrika’nın Çatısı - 5.895m)', 'Ngorongoro Krateri (Dünyanın en büyük bozulmamış volkanik kalderası)', 'Zanzibar Stone Town & Baharat Çarşıları (UNESCO)', 'Kendwa & Nungwi Turkuaz Kumsalları'],
      en: ['Serengeti National Park (Endless Plains of the Great Migration UNESCO)', 'Mount Kilimanjaro (Roof of Africa - 5,895m)', 'Ngorongoro Crater (Giant Unbroken Volcanic Caldera)', 'Stone Town of Zanzibar (Historic Spicetrade Citadel)', 'Kendwa & Nungwi Coral Beaches'],
      de: ['Serengeti-Nationalpark (UNESCO)', 'Kilimandscharo (Dach Afrikas - 5.895m)', 'Ngorongoro-Krater', 'Stone Town auf Sansibar (UNESCO)', 'Strände von Nungwi']
    },
    figures: {
      tr: ['Julius Nyerere (Mwalimu - Tanzanya’nın Kurucu Devlet Başkanı ve Ujamaa Mimarı)', 'Freddie Mercury (Queen Efsanesi - Zanzibar doğumlu)', 'Abdulrazak Gurnah (2021 Nobel Edebiyat Ödüllü Yazar)'],
      en: ['Julius Nyerere (Mwalimu - Beloved Father of the Nation)', 'Freddie Mercury (Legendary Queen Frontman, born in Stone Town)', 'Abdulrazak Gurnah (2021 Nobel Laureate in Literature)'],
      de: ['Julius Nyerere (Gründungsvater)', 'Freddie Mercury (Queen-Frontmann, geboren in Sansibar)', 'Abdulrazak Gurnah (Nobelpreisträger 2021)']
    },
    history: {
      concise: {
        tr: 'Tanganika ve Zanzibar adasının 1964’te birleşmesiyle doğan Tanzanya, insanlığın ilk fosillerinin bulunduğu Olduvai Boğazı’na ev sahipliği yapar ve Afrika’nın en istikrarlı safari diyarıdır.',
        en: 'Formed in 1964 by the union of Tanganyika and Zanzibar, Tanzania spans Olduvai Gorge (cradle of early hominids) and thrives on safari and spice trade.',
        de: '1964 aus der Vereinigung von Tanganjika und Sansibar entstanden, beherbergt Tansania die Olduvai-Schlucht und ist Afrikas führendes Safariland.'
      },
      milestones: {
        tr: ['1961: Tanganika’nın Bağımsızlığı', '1964: Zanzibar Devrimi ve Tanzanya Birleşik Cumhuriyeti’nin Kuruluşu', '1977: Svahili Dilinin Resmi Milli Dil Olarak Birleştirici Güç Olması'],
        en: ['1961: Independence of Tanganyika under Julius Nyerere', '1964: Zanzibar Revolution & unification into Tanzania', '1977: Swahili established as unifying national language'],
        de: ['1961: Unabhängigkeit Tanganjikas', '1964: Vereinigung mit Sansibar zu Tansania', '1977: Swahili wird Nationalsprache']
      }
    },
    sacredSites: {
      tr: ['Zanzibar Anglikan Katedrali (Eski Köle Pazarı Altarı)', 'Kaddafi Camii (Dodoma - Tanzanya’nın En Büyük Camii)'],
      en: ['Anglican Cathedral of Stone Town (Built over former slave whipping post)', 'Gaddafi Mosque (Dodoma)'],
      de: ['Anglikanische Kathedrale von Sansibar', 'Gaddafi-Moschee in Dodoma']
    },
    sectors: ['Yaban Hayatı Safari ve Eko-Turizm', 'Tanzanit Taşı Madenciliği (Sadece Tanzanya’da Çıkarılan Nadir Mavi Mücevher)', 'Baharat İhracatı (Karanfil, Tarçın ve Vanilya)', 'Altın ve Kahve İhracatı']
  }
};
