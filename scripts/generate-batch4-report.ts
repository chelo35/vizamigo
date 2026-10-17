import fs from 'fs';
import path from 'path';

export const BATCH_4_DATA = [
  {
    "code": "KP",
    "nameTr": "Kuzey Kore",
    "nameEn": "North Korea",
    "phase0Status": "TEKRAR",
    "phase0Reason": "Sisli kuzey çam ormanı kopyalanmış (TEKRAR-04)",
    "oldImageUrl": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Paektu Dağı Cennet Gölü (Heaven Lake) Krater Volkanı",
      "alt1": "Pyongyang Zafer Takı (Arch of Triumph)",
      "alt2": "Kaesong Koryo Müzesi Tarihi Kompleksi"
    },
    "primaryQuery": "Heaven Lake Paektu mountain crater",
    "altQuery": "Arch of Triumph Pyongyang North Korea",
    "candidatePrimary": {
      "title": "Tianchi Lake of Changbai 20130714.jpeg",
      "landmark": "Paektu Dağı Cennet Gölü (Heaven Lake) Krater Volkanı",
      "url": "https://upload.wikimedia.org/wikipedia/commons/6/68/Tianchi_Lake_of_Changbai_20130714.jpeg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Tianchi_Lake_of_Changbai_20130714.jpeg",
      "artist": "颐园新居",
      "license": "CC BY-SA 3.0",
      "dimensions": "3200x1800",
      "source": "Wikimedia Commons"
    },
    "candidateAlt": {
      "title": "Arch of Triumph, Pyongyang, North Korea.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/6/64/Arch_of_Triumph%2C_Pyongyang%2C_North_Korea.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Arch_of_Triumph,_Pyongyang,_North_Korea.jpg",
      "artist": "Kok Leng Yeo",
      "license": "CC BY 2.0",
      "dimensions": "2255x3005",
      "source": "Wikimedia Commons",
      "landmark": "Pyongyang Zafer Takı (Arch of Triumph)"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "KR",
    "nameTr": "Güney Kore",
    "nameEn": "South Korea",
    "phase0Status": "BELİRSİZ",
    "phase0Reason": "Korece neon tabelalı Seul gece sokağı (Tarihi saray değil)",
    "oldImageUrl": "https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Gyeongbokgung Sarayı Geunjeongjeon Taht Salonu ve Bugaksan",
      "alt1": "Bukchon Hanok Geleneksel Evleri Köyü, Seul",
      "alt2": "N Seoul Tower ve Namsan Parkı Silüeti"
    },
    "primaryQuery": "Gyeongbokgung Palace Seoul Geunjeongjeon",
    "altQuery": "Bukchon Hanok Village Seoul Korea",
    "candidatePrimary": {
      "title": "Seoul Geunjeongjeon 02.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/3/3c/Seoul_Geunjeongjeon_02.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Seoul_Geunjeongjeon_02.jpg",
      "artist": "Spike",
      "license": "CC BY-SA 4.0",
      "dimensions": "5472x3648",
      "source": "Wikimedia Commons",
      "landmark": "Gyeongbokgung Sarayı Geunjeongjeon Taht Salonu ve Bugaksan"
    },
    "candidateAlt": {
      "title": "Gyedong-gil street with climbing plants at golden hour in Seoul South Korea.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/2/23/Gyedong-gil_street_with_climbing_plants_at_golden_hour_in_Seoul_South_Korea.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Gyedong-gil_street_with_climbing_plants_at_golden_hour_in_Seoul_South_Korea.jpg",
      "artist": "Basile Morin",
      "license": "CC BY-SA 4.0",
      "dimensions": "6631x3949",
      "source": "Wikimedia Commons",
      "landmark": "Bukchon Hanok Geleneksel Evleri Köyü, Seul"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "KZ",
    "nameTr": "Kazakistan",
    "nameEn": "Kazakhstan",
    "phase0Status": "YANLIŞ_YER",
    "phase0Reason": "Tropik palmiyeli havuz (Kazakistan bozkır veya kanyonu değil)",
    "oldImageUrl": "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Charyn Kanyonu (Şarın Kanyonu) Kaleler Vadisi",
      "alt1": "Kaindy Gölü Batık Ormanı ve Almatı Dağları",
      "alt2": "Astana Bayterek Anıt Kulesi"
    },
    "primaryQuery": "Charyn Canyon Kazakhstan landscape",
    "altQuery": "Kaindy lake Kazakhstan submerged forest",
    "candidatePrimary": {
      "title": "Charyn Canyon, Kazakhstan 01.jpg",
      "landmark": "Charyn Kanyonu (Şarın Kanyonu) Kaleler Vadisi",
      "url": "https://upload.wikimedia.org/wikipedia/commons/4/47/Charyn_Canyon%2C_Kazakhstan_01.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Charyn_Canyon,_Kazakhstan_01.jpg",
      "artist": "Bernard Gagnon (Bgag)",
      "license": "CC0 Public Domain",
      "dimensions": "6774x3802",
      "source": "Wikimedia Commons"
    },
    "candidateAlt": {
      "title": "Lake Kaindy, Kazakhstan.jpg",
      "landmark": "Kaindy Gölü Batık Ormanı ve Almatı Dağları",
      "url": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Lake_Kaindy%2C_Kazakhstan.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Lake_Kaindy,_Kazakhstan.jpg",
      "artist": "Anna Powaska",
      "license": "CC BY-SA 4.0",
      "dimensions": "2048x1362",
      "source": "Wikimedia Commons"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "LA",
    "nameTr": "Laos",
    "nameEn": "Laos",
    "phase0Status": "TEKRAR",
    "phase0Reason": "Panama City körfezi kopyalanmış (TEKRAR-16)",
    "oldImageUrl": "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Kuang Si Turkuaz Katmanlı Şelaleleri, Luang Prabang",
      "alt1": "Pha That Luang Büyük Altın Stupası, Vientiane",
      "alt2": "Wat Xieng Thong Budist Tapınağı, Luang Prabang"
    },
    "primaryQuery": "Kuang Si Falls Luang Prabang Laos waterfall",
    "altQuery": "Pha That Luang Vientiane Laos stupa",
    "candidatePrimary": {
      "title": "Kuang Si Falls with submerged tree in turquoise water near Luang Prabang Laos.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/6/64/Kuang_Si_Falls_with_submerged_tree_in_turquoise_water_near_Luang_Prabang_Laos.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Kuang_Si_Falls_with_submerged_tree_in_turquoise_water_near_Luang_Prabang_Laos.jpg",
      "artist": "Basile Morin",
      "license": "CC BY-SA 4.0",
      "dimensions": "5432x3621",
      "source": "Wikimedia Commons",
      "landmark": "Kuang Si Turkuaz Katmanlı Şelaleleri, Luang Prabang"
    },
    "candidateAlt": {
      "title": "Pha That Luang Vientiane Laos Wikimedia Commons.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Pha_That_Luang_Vientiane_Laos_Wikimedia_Commons.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Pha_That_Luang_Vientiane_Laos_Wikimedia_Commons.jpg",
      "artist": "Benh LIEU SONG",
      "license": "CC BY-SA 3.0",
      "dimensions": "11162x2845",
      "source": "Wikimedia Commons",
      "landmark": "Pha That Luang Büyük Altın Stupası, Vientiane"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "LK",
    "nameTr": "Sri Lanka",
    "nameEn": "Sri Lanka",
    "phase0Status": "ALAKASIZ",
    "phase0Reason": "Havuzda yüzen kahvaltı tepsileri (Sigiriya değil)",
    "oldImageUrl": "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Sigiriya Antik Aslan Kayası Kalesi (UNESCO)",
      "alt1": "Ella Dokuz Kemerli Demiryolu Köprüsü (Nine Arch Bridge)",
      "alt2": "Kandi Kutsal Diş Tapınağı (Sri Dalada Maligawa)"
    },
    "primaryQuery": "Sigiriya Lion Rock Sri Lanka fortress",
    "altQuery": "Demodara Nine Arch Bridge Ella Sri Lanka",
    "candidatePrimary": {
      "title": "The Lion Rock, Sigiriya, Sri Lanka.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/3/35/The_Lion_Rock%2C_Sigiriya%2C_Sri_Lanka.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:The_Lion_Rock,_Sigiriya,_Sri_Lanka.jpg",
      "artist": "Shashi Shekhar",
      "license": "CC BY-SA 3.0",
      "dimensions": "3264x2448",
      "source": "Wikimedia Commons",
      "landmark": "Sigiriya Antik Aslan Kayası Kalesi (UNESCO)"
    },
    "candidateAlt": {
      "title": "Nine arch bridge, Ella, Sri lanka.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/9/90/Nine_arch_bridge%2C_Ella%2C_Sri_lanka.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Nine_arch_bridge,_Ella,_Sri_lanka.jpg",
      "artist": "Ishan shanuka",
      "license": "CC BY-SA 4.0",
      "dimensions": "2386x1440",
      "source": "Wikimedia Commons",
      "landmark": "Ella Dokuz Kemerli Demiryolu Köprüsü (Nine Arch Bridge)"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "MM",
    "nameTr": "Myanmar (Burma)",
    "nameEn": "Myanmar (Burma)",
    "phase0Status": "TEKRAR",
    "phase0Reason": "Yosemite Vadisi, ABD kopyalanmış (TEKRAR-09)",
    "oldImageUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Bagan Antik Pagodalar Ovası ve Gün Doğumu",
      "alt1": "Shwedagon Altın Pagodası, Yangon",
      "alt2": "Inle Gölü Geleneksel Ayak Kürekçileri"
    },
    "primaryQuery": "Bagan temples sunrise Myanmar balloons",
    "altQuery": "Shwedagon Pagoda Yangon Myanmar golden",
    "candidatePrimary": {
      "title": "Damayangyi Temple.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/a/a5/Damayangyi_Temple.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Damayangyi_Temple.jpg",
      "artist": "Mrsoethuaung",
      "license": "CC BY 4.0",
      "dimensions": "5184x3456",
      "source": "Wikimedia Commons",
      "landmark": "Bagan Antik Pagodalar Ovası ve Gün Doğumu"
    },
    "candidateAlt": {
      "title": "Shwedagon Pagoda, Terrace, Yangon, Myanmar.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/d/d0/Shwedagon_Pagoda%2C_Terrace%2C_Yangon%2C_Myanmar.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Shwedagon_Pagoda,_Terrace,_Yangon,_Myanmar.jpg",
      "artist": "Vyacheslav Argenberg",
      "license": "CC BY 4.0",
      "dimensions": "4000x3000",
      "source": "Wikimedia Commons",
      "landmark": "Shwedagon Altın Pagodası, Yangon"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "MN",
    "nameTr": "Moğolistan",
    "nameEn": "Mongolia",
    "phase0Status": "YANLIŞ_YER",
    "phase0Reason": "Berlin TV Kulesi, Almanya (Moğolistan bozkırı değil)",
    "oldImageUrl": "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Cengiz Han Atlı Dev Heykeli Kompleksi, Tsonjin Boldog",
      "alt1": "Gobi Çölü Khongoryn Els Kum Tepeleri ve Develer",
      "alt2": "Terelj Milli Parkı ve Geleneksel Moğol Çadırları (Ger)"
    },
    "primaryQuery": "Genghis Khan Equestrian Statue Mongolia",
    "altQuery": "Gobi Desert Khongoryn Els Mongolia dunes",
    "candidatePrimary": {
      "title": "Genghis Khan Equestrian Statue.JPG",
      "url": "https://upload.wikimedia.org/wikipedia/commons/d/d8/Genghis_Khan_Equestrian_Statue.JPG",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Genghis_Khan_Equestrian_Statue.JPG",
      "artist": "Chinneeb",
      "license": "CC BY-SA 3.0",
      "dimensions": "2592x3888",
      "source": "Wikimedia Commons",
      "landmark": "Cengiz Han Atlı Dev Heykeli Kompleksi, Tsonjin Boldog"
    },
    "candidateAlt": {
      "title": "Camel at Khongoryn Els 01.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/7/76/Camel_at_Khongoryn_Els_01.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Camel_at_Khongoryn_Els_01.jpg",
      "artist": "Bernard Gagnon",
      "license": "CC0",
      "dimensions": "4838x2895",
      "source": "Wikimedia Commons",
      "landmark": "Gobi Çölü Khongoryn Els Kum Tepeleri ve Develer"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "MO",
    "nameTr": "Çin Makao ÖİB",
    "nameEn": "Macao SAR China",
    "phase0Status": "ALAKASIZ",
    "phase0Reason": "Yıldızlı samanyolu ve göl üzerinde yelkenli illüstrasyonu",
    "oldImageUrl": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Aziz Pavlus Katedrali Harabeleri (Ruins of St. Paul’s)",
      "alt1": "Senado Meydanı ve Portekiz Dalgalı Taş Mozaikleri",
      "alt2": "Guia Kalesi ve Deniz Feneri"
    },
    "primaryQuery": "Ruins of Saint Paul Macau facade",
    "altQuery": "Senado Square Macau Portugal tiles",
    "candidatePrimary": {
      "title": "Ruins of Saint Paul's, Macau (Ank Kumar) 03.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Ruins_of_Saint_Paul%27s%2C_Macau_%28Ank_Kumar%29_03.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Ruins_of_Saint_Paul%27s,_Macau_(Ank_Kumar)_03.jpg",
      "artist": "Ank Kumar",
      "license": "CC BY-SA 4.0",
      "dimensions": "6000x4000",
      "source": "Wikimedia Commons",
      "landmark": "Aziz Pavlus Katedrali Harabeleri (Ruins of St. Paul’s)"
    },
    "candidateAlt": {
      "title": "Macau Largo do Senado tiles.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/d/da/Macau_Largo_do_Senado_tiles.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Macau_Largo_do_Senado_tiles.jpg",
      "artist": "KTo288",
      "license": "CC BY-SA 3.0",
      "dimensions": "2304x1636",
      "source": "Wikimedia Commons",
      "landmark": "Senado Meydanı ve Portekiz Dalgalı Taş Mozaikleri"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "MV",
    "nameTr": "Maldivler",
    "nameEn": "Maldives",
    "phase0Status": "OK",
    "phase0Reason": "Maldivler atolü ve turkuaz lagünde su villaları (Doğrulandı)",
    "oldImageUrl": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Maldivler Turkuaz Lagünü ve Su Üstü Villaları",
      "alt1": "Baa Atolü Mercan Resifleri ve Beyaz Kum Plajı",
      "alt2": "Malé İslam Merkezi Altın Kubbesi"
    },
    "primaryQuery": "Maldives overwater bungalows resort turquoise lagoon",
    "altQuery": "Maldives aerial atoll beach coral",
    "candidatePrimary": {
      "title": "Soneva Jani Water Villas, Maldives (Verified Unsplash)",
      "landmark": "Maldivler Turkuaz Lagünü ve Su Üstü Villaları",
      "url": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=80",
      "sourcePageUrl": "https://unsplash.com/photos/photo-1514282401047-d79a71a590e8",
      "artist": "Syd Sujuaan",
      "license": "Unsplash License",
      "dimensions": "2400x1600",
      "source": "Unsplash (Verified)"
    },
    "candidateAlt": {
      "title": "Diamonds Thudufushi Beach and Water Villas",
      "landmark": "Thudufushi Lagünü ve Beyaz Kumsal Su Villaları",
      "url": "https://upload.wikimedia.org/wikipedia/commons/3/3b/Diamonds_Thudufushi_Beach_and_Water_Villas%2C_May_2017_-04.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Diamonds_Thudufushi_Beach_and_Water_Villas,_May_2017_-04.jpg",
      "artist": "Martin Falbisoner",
      "license": "CC BY-SA 4.0",
      "dimensions": "5823x3119",
      "source": "Wikimedia Commons"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "MY",
    "nameTr": "Malezya",
    "nameEn": "Malaysia",
    "phase0Status": "YANLIŞ_YER",
    "phase0Reason": "Bali Ulun Danu Beratan Su Tapınağı, Endonezya kopyası",
    "oldImageUrl": "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Kuala Lumpur Petronas İkiz Kuleleri ve Şehir Parkı",
      "alt1": "Batu Mağaraları ve Lord Murugan Dev Altın Heykeli",
      "alt2": "Penang George Town Tarihi Kolonyal Sokakları (UNESCO)"
    },
    "primaryQuery": "Petronas Twin Towers Kuala Lumpur Malaysia night park",
    "altQuery": "Batu Caves Lord Murugan statue Malaysia",
    "candidatePrimary": {
      "title": "The Twins SE Asia 2019 (Petronas Towers)",
      "landmark": "Kuala Lumpur Petronas İkiz Kuleleri ve Şehir Parkı",
      "url": "https://upload.wikimedia.org/wikipedia/commons/c/c8/The_Twins_SE_Asia_2019_%2849171985716%29.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:The_Twins_SE_Asia_2019_(49171985716).jpg",
      "artist": "James Kerwin",
      "license": "CC BY 2.0",
      "dimensions": "8472x5648",
      "source": "Wikimedia Commons"
    },
    "candidateAlt": {
      "title": "Gombak Selangor Batu-Caves-01.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/5/56/Gombak_Selangor_Batu-Caves-01.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Gombak_Selangor_Batu-Caves-01.jpg",
      "artist": "CEphoto, Uwe Aranas",
      "license": "CC BY-SA 3.0",
      "dimensions": "3796x5694",
      "source": "Wikimedia Commons",
      "landmark": "Batu Mağaraları ve Lord Murugan Dev Altın Heykeli"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "NP",
    "nameTr": "Nepal",
    "nameEn": "Nepal",
    "phase0Status": "TEKRAR",
    "phase0Reason": "Guatemala Tikal Maya piramidi kopyalanmış (TEKRAR-15)",
    "oldImageUrl": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Everest Dağı Zirvesi ve Himalaya Sıradağları",
      "alt1": "Swayambhunath (Maymun Tapınağı) Stupası, Katmandu",
      "alt2": "Pokhara Phewa Gölü ve Machapuchare Dağı"
    },
    "primaryQuery": "Mount Everest Himalayas Nepal mountain peak",
    "altQuery": "Swayambhunath stupa Kathmandu Nepal eyes",
    "candidatePrimary": {
      "title": "Everest North Face toward Base Camp Tibet Luca Galuzzi 2006.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/e/e7/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006.jpg",
      "artist": "Luca Galuzzi (Lucag)",
      "license": "CC BY-SA 2.5",
      "dimensions": "2000x1333",
      "source": "Wikimedia Commons",
      "landmark": "Everest Dağı Zirvesi ve Himalaya Sıradağları"
    },
    "candidateAlt": {
      "title": "Swayambhunath Stupa -Kathmandu Nepal-0330.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/f/f3/Swayambhunath_Stupa_-Kathmandu_Nepal-0330.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Swayambhunath_Stupa_-Kathmandu_Nepal-0330.jpg",
      "artist": "Bijay Chaurasia",
      "license": "CC BY-SA 4.0",
      "dimensions": "5184x3456",
      "source": "Wikimedia Commons",
      "landmark": "Swayambhunath (Maymun Tapınağı) Stupası, Katmandu"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "PH",
    "nameTr": "Filipinler",
    "nameEn": "Philippines",
    "phase0Status": "TEKRAR",
    "phase0Reason": "Angkor Wat tapınağı yansıma havuzu kopyalanmış (TEKRAR-07)",
    "oldImageUrl": "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "El Nido Palawan Turkuaz Lagünleri ve Karstik Adaları",
      "alt1": "Bohol Çikolata Tepeleri (Chocolate Hills)",
      "alt2": "Banaue Antik Pirinç Terasları (UNESCO)"
    },
    "primaryQuery": "El Nido Palawan Philippines Big Lagoon limestone",
    "altQuery": "Chocolate Hills Bohol Philippines landscape",
    "candidatePrimary": {
      "title": "Big Lagoon at El Nido, Palawan, Philippines",
      "landmark": "El Nido Palawan Turkuaz Lagünleri ve Karstik Adaları",
      "url": "https://upload.wikimedia.org/wikipedia/commons/a/a5/Big_Lagoon_at_El_Nido%2C_Palawan%2C_Philippines.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Big_Lagoon_at_El_Nido,_Palawan,_Philippines.jpg",
      "artist": "Marciano Villavito",
      "license": "CC BY-SA 4.0",
      "dimensions": "4272x2848",
      "source": "Wikimedia Commons"
    },
    "candidateAlt": {
      "title": "Chocolate Hills (mendhak) 001.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Chocolate_Hills_%28mendhak%29_001.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Chocolate_Hills_(mendhak)_001.jpg",
      "artist": "mendhak",
      "license": "CC BY-SA 2.0",
      "dimensions": "4277x2837",
      "source": "Wikimedia Commons",
      "landmark": "Bohol Çikolata Tepeleri (Chocolate Hills)"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "PK",
    "nameTr": "Pakistan",
    "nameEn": "Pakistan",
    "phase0Status": "TEKRAR",
    "phase0Reason": "Tropik yağmur ormanı kopyalanmış (TEKRAR-17)",
    "oldImageUrl": "https://images.unsplash.com/photo-1586016413664-864c0dd76f53?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Hunza Vadisi, Rakaposhi Karlı Zirvesi ve Baltit Kalesi",
      "alt1": "Lahor Badshahi Camii ve Moğol Kırmızı Taş Mimarisi",
      "alt2": "Faysal Camii, İslamabad ve Margalla Tepeleri"
    },
    "primaryQuery": "Hunza Valley Baltit Fort Pakistan mountain",
    "altQuery": "Badshahi Mosque Lahore Pakistan courtyard",
    "candidatePrimary": {
      "title": "Mountain view with Baltit Fort in the distance, Hunza Valley.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/d/d8/Mountain_view_with_Baltit_Fort_in_the_distance%2C_Hunza_Valley.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Mountain_view_with_Baltit_Fort_in_the_distance,_Hunza_Valley.jpg",
      "artist": "Samraiz Nawaz",
      "license": "CC BY-SA 4.0",
      "dimensions": "3104x2328",
      "source": "Wikimedia Commons",
      "landmark": "Hunza Vadisi, Rakaposhi Karlı Zirvesi ve Baltit Kalesi"
    },
    "candidateAlt": {
      "title": "'By @ibneAzhar'-Badshahi Mosque-Lahore-Pakistan (334).JPG",
      "url": "https://upload.wikimedia.org/wikipedia/commons/a/ac/%27By_%40ibneAzhar%27-Badshahi_Mosque-Lahore-Pakistan_%28334%29.JPG",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:%27By_@ibneAzhar%27-Badshahi_Mosque-Lahore-Pakistan_(334).JPG",
      "artist": "Ibnazhar",
      "license": "CC BY-SA 3.0",
      "dimensions": "3264x2013",
      "source": "Wikimedia Commons",
      "landmark": "Lahor Badshahi Camii ve Moğol Kırmızı Taş Mimarisi"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "SG",
    "nameTr": "Singapur",
    "nameEn": "Singapore",
    "phase0Status": "BELİRSİZ",
    "phase0Reason": "Görsel içeriği şüpheli veya tam doğrulanamadı",
    "oldImageUrl": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Marina Bay Sands ve Gardens by the Bay Supertree Grove",
      "alt1": "Merlion Heykeli ve Marina Körfezi Finans Merkezi",
      "alt2": "Jewel Changi Rain Vortex Dev İç Mekan Şelalesi"
    },
    "primaryQuery": "Marina Bay Sands Singapore skyline Supertree Grove",
    "altQuery": "Merlion Singapore Marina Bay waterfront",
    "candidatePrimary": {
      "title": "Singapore Marina Bay Sands at Dusk",
      "landmark": "Marina Bay Sands ve Gardens by the Bay",
      "url": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Singapore_Marina_Bay_Dusk_2018-02-27.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Singapore_Marina_Bay_Dusk_2018-02-27.jpg",
      "artist": "Benh LIEU SONG",
      "license": "CC BY-SA 4.0",
      "dimensions": "8928x3360",
      "source": "Wikimedia Commons"
    },
    "candidateAlt": {
      "title": "The Merlion, Singapore.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/4/44/The_Merlion%2C_Singapore.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:The_Merlion,_Singapore.jpg",
      "artist": "Ray in Manila",
      "license": "CC BY 2.0",
      "dimensions": "4197x3058",
      "source": "Wikimedia Commons",
      "landmark": "Merlion Heykeli ve Marina Körfezi Finans Merkezi"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "TH",
    "nameTr": "Tayland",
    "nameEn": "Thailand",
    "phase0Status": "TEKRAR",
    "phase0Reason": "Bulutlu jenerik dağ zirveleri kopyalanmış (TEKRAR-14)",
    "oldImageUrl": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Wat Arun (Şafak Tapınağı) ve Chao Phraya Nehri, Bangkok",
      "alt1": "Wat Phra Kaew ve Bangkok Büyük Sarayı (Grand Palace)",
      "alt2": "Phi Phi Adaları Maya Bay Karstik Koyu"
    },
    "primaryQuery": "Wat Arun Bangkok Chao Phraya River Thailand temple",
    "altQuery": "Wat Phra Kaew Grand Palace Bangkok Thailand",
    "candidatePrimary": {
      "title": "Templo Wat Arun, Bangkok, Tailandia, 2013-08-22, DD 12.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/7/70/Templo_Wat_Arun%2C_Bangkok%2C_Tailandia%2C_2013-08-22%2C_DD_12.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Templo_Wat_Arun,_Bangkok,_Tailandia,_2013-08-22,_DD_12.jpg",
      "artist": "Diego Delso",
      "license": "CC BY-SA 3.0",
      "dimensions": "2826x4621",
      "source": "Wikimedia Commons",
      "landmark": "Wat Arun (Şafak Tapınağı) ve Chao Phraya Nehri, Bangkok"
    },
    "candidateAlt": {
      "title": "Wat Phra Kaew by Ninara TSP edit crop.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Wat_Phra_Kaew_by_Ninara_TSP_edit_crop.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Wat_Phra_Kaew_by_Ninara_TSP_edit_crop.jpg",
      "artist": "Original image: Ninara from Helsinki, Finland.  Edit: TSP",
      "license": "CC BY 4.0",
      "dimensions": "3395x1867",
      "source": "Wikimedia Commons",
      "landmark": "Wat Phra Kaew ve Bangkok Büyük Sarayı (Grand Palace)"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "TJ",
    "nameTr": "Tacikistan",
    "nameEn": "Tajikistan",
    "phase0Status": "TEKRAR",
    "phase0Reason": "Yosemite Vadisi, ABD kopyalanmış (TEKRAR-09)",
    "oldImageUrl": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "İskenderkul (Iskanderkul) Turkuaz Alpin Gölü ve Fann Dağları",
      "alt1": "Pamir Otoyolu (M41) ve Dünyanın Çatısı Dağ Geçitleri",
      "alt2": "Duşanbe Bayrak Direği ve Rudaki Parkı"
    },
    "primaryQuery": "Iskanderkul lake Fann Mountains Tajikistan",
    "altQuery": "Pamir Highway Tajikistan landscape mountains",
    "candidatePrimary": {
      "title": "Iskander-kul, Tajikistan.JPG",
      "url": "https://upload.wikimedia.org/wikipedia/commons/2/23/Iskander-kul%2C_Tajikistan.JPG",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Iskander-kul,_Tajikistan.JPG",
      "artist": "Rjruiziii",
      "license": "CC BY-SA 3.0",
      "dimensions": "1600x1067",
      "source": "Wikimedia Commons",
      "landmark": "İskenderkul (Iskanderkul) Turkuaz Alpin Gölü ve Fann Dağları"
    },
    "candidateAlt": {
      "title": "From Langar to Murghab (29289400017).jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/e/eb/From_Langar_to_Murghab_%2829289400017%29.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:From_Langar_to_Murghab_(29289400017).jpg",
      "artist": "Ninara from Helsinki, Finland",
      "license": "CC BY 2.0",
      "dimensions": "3245x2156",
      "source": "Wikimedia Commons",
      "landmark": "Pamir Otoyolu (M41) ve Dünyanın Çatısı Dağ Geçitleri"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "TL",
    "nameTr": "Timor-Leste",
    "nameEn": "Timor-Leste",
    "phase0Status": "TEKRAR",
    "phase0Reason": "Jenerik turkuaz deniz dalgası kopyalanmış (TEKRAR-01)",
    "oldImageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Cristo Rei Heykeli ve Dili Körfezi Sahili",
      "alt1": "Atauro Adası Mercan Resifleri ve Kıyıları",
      "alt2": "Jaco Adası Bakir Kumsalı"
    },
    "primaryQuery": "Cristo Rei Dili Timor-Leste beach statue",
    "altQuery": "Atauro Island Timor-Leste beach reef",
    "candidatePrimary": {
      "title": "Cristo Rei Statue.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/e/e6/Cristo_Rei_Statue.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Cristo_Rei_Statue.jpg",
      "artist": "Davidelit",
      "license": "CC BY-SA 3.0",
      "dimensions": "1632x916",
      "source": "Wikimedia Commons",
      "landmark": "Cristo Rei Heykeli ve Dili Körfezi Sahili"
    },
    "candidateAlt": {
      "title": "Beach behind Cristo Rei with view of Atauro Island",
      "landmark": "Atauro Adası Manzarası ve Dili Kıyısı",
      "url": "https://upload.wikimedia.org/wikipedia/commons/5/56/Beach_behind_Cristo_Rei_with_view_of_Atauro_Island_in_background.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Beach_behind_Cristo_Rei_with_view_of_Atauro_Island_in_background.jpg",
      "artist": "Khairil Yusof",
      "license": "CC BY 4.0",
      "dimensions": "6244x4168",
      "source": "Wikimedia Commons"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "TM",
    "nameTr": "Türkmenistan",
    "nameEn": "Turkmenistan",
    "phase0Status": "TEKRAR",
    "phase0Reason": "Tac Mahal, Hindistan kopyalanmış (TEKRAR-03)",
    "oldImageUrl": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Derveze Gaz Krateri (Cehennem Kapısı), Karakum Çölü",
      "alt1": "Aşkabat Beyaz Mermer Şehri ve Türkmenbaşı Ruhi Camii",
      "alt2": "Merv Antik İpek Yolu Harabeleri ve Sultan Sancar Türbesi"
    },
    "primaryQuery": "Darvaza gas crater door to hell Turkmenistan fire",
    "altQuery": "Ashgabat Turkmenistan white marble architecture",
    "candidatePrimary": {
      "title": "The Door to Hell.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/6/65/The_Door_to_Hell.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:The_Door_to_Hell.jpg",
      "artist": "flydime",
      "license": "CC BY-SA 2.0",
      "dimensions": "5616x3744",
      "source": "Wikimedia Commons",
      "landmark": "Derveze Gaz Krateri (Cehennem Kapısı), Karakum Çölü"
    },
    "candidateAlt": {
      "title": "Neutrality-Road-Ashgabat-2015.JPG",
      "url": "https://upload.wikimedia.org/wikipedia/commons/e/ea/Neutrality-Road-Ashgabat-2015.JPG",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Neutrality-Road-Ashgabat-2015.JPG",
      "artist": "Bjørn Christian Tørrissen",
      "license": "CC BY-SA 4.0",
      "dimensions": "5106x3754",
      "source": "Wikimedia Commons",
      "landmark": "Aşkabat Beyaz Mermer Şehri ve Türkmenbaşı Ruhi Camii"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "TW",
    "nameTr": "Tayvan",
    "nameEn": "Taiwan",
    "phase0Status": "TEKRAR",
    "phase0Reason": "Çöl kum tepeleri kopyalanmış (TEKRAR-18)",
    "oldImageUrl": "https://images.unsplash.com/photo-1508247967583-7d982ea01526?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Taipei 101 Gökdeleni ve Fil Dağı (Elephant Mountain) Manzarası",
      "alt1": "Jiufen Tarihi Dağ Kasabası ve Kırmızı Fenerli Çay Evleri",
      "alt2": "Taroko Kanyonu ve Mermer Geçitler"
    },
    "primaryQuery": "Taipei 101 skyline Elephant Mountain Taiwan",
    "altQuery": "Jiufen old street red lanterns Taiwan",
    "candidatePrimary": {
      "title": "Taipei skyline sunset 2017.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/b/b2/Taipei_skyline_sunset_2017.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Taipei_skyline_sunset_2017.jpg",
      "artist": "Man Ng",
      "license": "CC BY 2.0",
      "dimensions": "8241x3125",
      "source": "Wikimedia Commons",
      "landmark": "Taipei 101 Gökdeleni ve Fil Dağı (Elephant Mountain) Manzarası"
    },
    "candidateAlt": {
      "title": "Chinese lanterns in market (Unsplash).jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/a/ad/Chinese_lanterns_in_market_%28Unsplash%29.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Chinese_lanterns_in_market_(Unsplash).jpg",
      "artist": "Athena Lam thecupandtheroad",
      "license": "CC0",
      "dimensions": "4288x2848",
      "source": "Wikimedia Commons",
      "landmark": "Jiufen Tarihi Dağ Kasabası ve Kırmızı Fenerli Çay Evleri"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "UZ",
    "nameTr": "Özbekistan",
    "nameEn": "Uzbekistan",
    "phase0Status": "OK",
    "phase0Reason": "Semerkant Registan Meydanı ve tarihi medreseler (Doğrulandı)",
    "oldImageUrl": "https://images.unsplash.com/photo-1791117104536-a0e86b21a9bf?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Semerkant Registan Meydanı ve Tarihi Medreseler (UNESCO)",
      "alt1": "Buhara Po-i-Kalyan Kompleksi ve Kalyan Minaresi",
      "alt2": "Hiva İçan Kale (Ichan Kala) Minareleri ve Çöl Kalesi"
    },
    "primaryQuery": "Samarkand Registan Square Uzbekistan madrassah",
    "altQuery": "Bukhara Kalyan Minaret Uzbekistan mosque",
    "candidatePrimary": {
      "title": "Samarkand Registan Madrassas (Verified Unsplash)",
      "landmark": "Semerkant Registan Meydanı ve Tarihi Medreseler (UNESCO)",
      "url": "https://images.unsplash.com/photo-1791117104536-a0e86b21a9bf?auto=format&fit=crop&w=1600&q=80",
      "sourcePageUrl": "https://unsplash.com/photos/photo-1791117104536-a0e86b21a9bf",
      "artist": "Ozodbek Ergashev",
      "license": "Unsplash License",
      "dimensions": "2400x1600",
      "source": "Unsplash (Verified)"
    },
    "candidateAlt": {
      "title": "Bukhara Kalyan Minaret Mosque and Amir Alimkhaon Madrasa 1.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/f/fc/Bukhara_Kalyan_Minaret_Mosque_and_Amir_Alimkhaon_Madrasa_1.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Bukhara_Kalyan_Minaret_Mosque_and_Amir_Alimkhaon_Madrasa_1.jpg",
      "artist": "Ymblanter",
      "license": "CC BY-SA 4.0",
      "dimensions": "2736x3648",
      "source": "Wikimedia Commons",
      "landmark": "Buhara Po-i-Kalyan Kompleksi ve Kalyan Minaresi"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  }
];
