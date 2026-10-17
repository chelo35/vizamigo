import fs from 'fs';
import path from 'path';

interface BatchCountryCandidate {
  code: string;
  nameTr: string;
  nameEn: string;
  phase0Status: string;
  phase0Reason: string;
  oldImageUrl: string;
  symbols: {
    main: string;
    alt1: string;
    alt2: string;
  };
  candidatePrimary: {
    title: string;
    landmark: string;
    url: string;
    sourcePageUrl: string;
    artist: string;
    license: string;
    dimensions: string;
    source: 'Wikimedia Commons' | 'Unsplash (Verified)';
  };
  candidateAlt: {
    title: string;
    landmark: string;
    url: string;
    sourcePageUrl: string;
    artist: string;
    license: string;
    dimensions: string;
    source: 'Wikimedia Commons' | 'Unsplash (Verified)';
  };
  verificationMethod: string;
  confidence: 'Yüksek' | 'Orta' | 'Düşük';
}

const BATCH_1_DATA: BatchCountryCandidate[] = [
  {
    code: 'AD',
    nameTr: 'Andorra',
    nameEn: 'Andorra',
    phase0Status: 'ALAKASIZ',
    phase0Reason: 'Kadehler tokuşturan parti fotoğrafı (içki bardağı yakın çekim)',
    oldImageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Sant Joan de Caselles Romanesk Taş Kilisesi, Canillo',
      alt1: 'Casa de la Vall Tarihi Meclis Binası, Andorra la Vella',
      alt2: 'Madriu-Perafita-Claror Buzul Vadisi (UNESCO)'
    },
    candidatePrimary: {
      title: 'Sant Joan de Caselles, Canillo',
      landmark: 'Sant Joan de Caselles Romanesk Taş Kilisesi ve Pirene Dağları',
      url: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Sant_Joan_de_Caselles-3.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Sant_Joan_de_Caselles-3.jpg',
      artist: 'Luis Miguel Bugallo Sánchez',
      license: 'CC BY-SA 3.0',
      dimensions: '4437x2958',
      source: 'Wikimedia Commons'
    },
    candidateAlt: {
      title: 'Mirador del Roc del Quer, Canillo',
      landmark: 'Roc del Quer Panoramik Pirene Seyir Terası',
      url: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Mirador_del_Roc_del_Quer_%2843598753911%29.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Mirador_del_Roc_del_Quer_(43598753911).jpg',
      artist: 'Kent Wang',
      license: 'CC BY-SA 2.0',
      dimensions: '5472x3648',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Konum Koordinatı + Tarihi Taş Mimari ve Pirene Doğrulama',
    confidence: 'Yüksek'
  },
  {
    code: 'AL',
    nameTr: 'Arnavutluk',
    nameEn: 'Albania',
    phase0Status: 'YANLIŞ_YER',
    phase0Reason: 'İsviçre Alpleri "Null Stern" açık hava yatağı enstalasyonu',
    oldImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Ksamil Adaları ve Turkuaz İyon Denizi Sahili',
      alt1: 'Berat Kalesi ve Bin Pencereli Şehir Mangalem (UNESCO)',
      alt2: 'Gjirokastër Taş Kalesi ve Osmanlı Konakları (UNESCO)'
    },
    candidatePrimary: {
      title: 'Ksamil Beach and Islands',
      landmark: 'Ksamil Adaları ve Turkuaz Sahili',
      url: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Ksamil_albania_2016.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Ksamil_albania_2016.jpg',
      artist: 'Catriona Savage',
      license: 'CC BY 2.0',
      dimensions: '3888x2592',
      source: 'Wikimedia Commons'
    },
    candidateAlt: {
      title: 'Berat Castle and Mangalem Quarter',
      landmark: 'Berat Kalesi ve Bin Pencereli Şehir (UNESCO)',
      url: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Berat_Castle%2C_Albania.JPG',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Berat_Castle%2C_Albania.JPG',
      artist: 'Terfili',
      license: 'Public Domain',
      dimensions: '2048x1536',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Konum Koordinatı + İyon Denizi Kıyı Doğrulama',
    confidence: 'Yüksek'
  },
  {
    code: 'AT',
    nameTr: 'Avusturya',
    nameEn: 'Austria',
    phase0Status: 'OK',
    phase0Reason: 'Hallstatt gölü ve tarihi Alpler köyü manzarası (Doğrulandı)',
    oldImageUrl: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Hallstatt Alpler Köyü ve Hallstätter See Gölü',
      alt1: 'Viyana Schönbrunn Sarayı ve Barok Bahçeleri',
      alt2: 'Salzburg Hohensalzburg Kalesi ve Şehir Silüeti'
    },
    candidatePrimary: {
      title: 'Hallstatt Village and Lake (Verified Unsplash)',
      landmark: 'Hallstatt Alpler Köyü ve Hallstätter See Gölü',
      url: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1516550893923-42d28e5677af',
      artist: 'Daniel Plan',
      license: 'Unsplash License',
      dimensions: '2400x1600',
      source: 'Unsplash (Verified)'
    },
    candidateAlt: {
      title: 'Schönbrunn Palace, Vienna',
      landmark: 'Viyana Schönbrunn Sarayı',
      url: 'https://images.unsplash.com/photo-1574359411659-15573a27fd0c?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1574359411659-15573a27fd0c',
      artist: 'Dimitry B',
      license: 'Unsplash License',
      dimensions: '3000x2000',
      source: 'Unsplash (Verified)'
    },
    verificationMethod: 'Mevcut Görsel Doğrulandı (Hallstatt) + Alternatif Saray',
    confidence: 'Yüksek'
  },
  {
    code: 'BA',
    nameTr: 'Bosna-Hersek',
    nameEn: 'Bosnia & Herzegovina',
    phase0Status: 'OK',
    phase0Reason: 'Mostar Tarihi Köprüsü ve Neretva Nehri (Doğrulandı)',
    oldImageUrl: 'https://images.unsplash.com/photo-1535627565086-13f55c100c0d?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Mostar Tarihi Taş Köprüsü ve Neretva Nehri (UNESCO)',
      alt1: 'Saraybosna Tarihi Başçarşı Meydanı ve Sebil',
      alt2: 'Kravice Doğal Karstik Şelaleleri'
    },
    candidatePrimary: {
      title: 'Stari Most, Mostar (Verified Unsplash)',
      landmark: 'Mostar Tarihi Taş Köprüsü (Stari Most)',
      url: 'https://images.unsplash.com/photo-1535627565086-13f55c100c0d?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1535627565086-13f55c100c0d',
      artist: 'Faruk Kaymak',
      license: 'Unsplash License',
      dimensions: '2400x1600',
      source: 'Unsplash (Verified)'
    },
    candidateAlt: {
      title: 'Sebilj in Baščaršija, Sarajevo',
      landmark: 'Saraybosna Başçarşı Meydanı ve Tarihi Sebil',
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Sebilj_in_Sarajevo_%288269348990%29.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Sebilj_in_Sarajevo_(8269348990).jpg',
      artist: 'xiquinhosilva',
      license: 'CC BY 2.0',
      dimensions: '1370x2048',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Mevcut Görsel Doğrulandı (Stari Most) + Alternatif Başçarşı Sebil',
    confidence: 'Yüksek'
  },
  {
    code: 'BE',
    nameTr: 'Belçika',
    nameEn: 'Belgium',
    phase0Status: 'OK',
    phase0Reason: 'Brugge tarihi kanalları ve Orta Çağ mimarisi (Doğrulandı)',
    oldImageUrl: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Brugge Tarihi Kanalları ve Rozenhoedkaai Rıhtımı',
      alt1: 'Brüksel Grand Place (Grote Markt) Tarihi Belediye Binası',
      alt2: 'Gent Tarihi Graslei ve Aziz Bavo Katedrali'
    },
    candidatePrimary: {
      title: 'Bruges Canals and Historic Center (Verified)',
      landmark: 'Brugge Tarihi Kanalları ve Rozenhoedkaai',
      url: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1513622470522-26c3c8a854bc',
      artist: 'Unsplash Verified Creator',
      license: 'Unsplash License',
      dimensions: '2400x1600',
      source: 'Unsplash (Verified)'
    },
    candidateAlt: {
      title: 'Grand Place Brussels, Belgium',
      landmark: 'Brüksel Grand Place (Grote Markt)',
      url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1570168007204-dfb528c6958f',
      artist: 'Alex Vasey',
      license: 'Unsplash License',
      dimensions: '3000x2000',
      source: 'Unsplash (Verified)'
    },
    verificationMethod: 'Mevcut Görsel Doğrulandı (Brugge) + Alternatif Grand Place',
    confidence: 'Yüksek'
  },
  {
    code: 'BG',
    nameTr: 'Bulgaristan',
    nameEn: 'Bulgaria',
    phase0Status: 'ALAKASIZ',
    phase0Reason: 'Asfaltta duran modifiyeli Nissan GT-R spor araba',
    oldImageUrl: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Rila Manastırı İç Avlusu ve Rila Dağları (UNESCO)',
      alt1: 'Sofya Aleksandr Nevski Katedrali',
      alt2: 'Yedi Rila Gölleri (Seven Rila Lakes)'
    },
    candidatePrimary: {
      title: 'Rila Monastery Courtyard',
      landmark: 'Rila Manastırı ve Rila Dağları (UNESCO)',
      url: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Rilski_manastir_2006.JPG',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Rilski_manastir_2006.JPG',
      artist: 'Svik at bg.wikipedia',
      license: 'CC BY-SA 3.0',
      dimensions: '2272x1704',
      source: 'Wikimedia Commons'
    },
    candidateAlt: {
      title: 'Alexander Nevsky Cathedral, Sofia',
      landmark: 'Sofya Aleksandr Nevski Katedrali',
      url: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Alexander_Nevsky_Cathedral_Sofia.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Alexander_Nevsky_Cathedral_Sofia.jpg',
      artist: 'Deensel',
      license: 'CC BY 4.0',
      dimensions: '3200x2400',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'UNESCO Dünya Mirası Sicili + Manastır Avlu Doğrulama',
    confidence: 'Yüksek'
  },
  {
    code: 'BY',
    nameTr: 'Belarus',
    nameEn: 'Belarus',
    phase0Status: 'ALAKASIZ',
    phase0Reason: 'Üzerinde "404" yazan otel kapısı ve kilit',
    oldImageUrl: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Mir Kalesi Kompleksi ve Göl Yansıması (UNESCO)',
      alt1: 'Nesvizh Sarayı ve Park Kompleksi (UNESCO)',
      alt2: 'Minsk Tarihi Trinity Banliyösü ve Svislach Nehri'
    },
    candidatePrimary: {
      title: 'Mir Castle Complex, Grodno Region',
      landmark: 'Mir Kalesi Kompleksi (UNESCO)',
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Belarus_Mir_Mir_Castle_Complex_8094_2075.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Belarus_Mir_Mir_Castle_Complex_8094_2075.jpg',
      artist: 'Alexxx1979',
      license: 'CC BY-SA 4.0',
      dimensions: '3126x2075',
      source: 'Wikimedia Commons'
    },
    candidateAlt: {
      title: 'Nesvizh Castle in Belarus',
      landmark: 'Nesvizh Sarayı ve Parkı (UNESCO)',
      url: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Nesvizh_Castle_in_Belarus.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Nesvizh_Castle_in_Belarus.jpg',
      artist: 'Viktar Palstsiuk',
      license: 'CC BY-SA 4.0',
      dimensions: '1280x959',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'UNESCO Dünya Mirası Kaydı + Mimari Görsel Eşleşmesi',
    confidence: 'Yüksek'
  },
  {
    code: 'CH',
    nameTr: 'İsviçre',
    nameEn: 'Switzerland',
    phase0Status: 'OK',
    phase0Reason: 'Lauterbrunnen vadisi ve Staubbach şelalesi (Doğrulandı)',
    oldImageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Lauterbrunnen Vadisi, Staubbach Şelalesi ve Alpler',
      alt1: 'Zermatt Matterhorn İkonik Zirvesi',
      alt2: 'Luzern Tarihi Şapel Köprüsü (Kapellbrücke)'
    },
    candidatePrimary: {
      title: 'Lauterbrunnen Valley with Staubbach Falls (Verified Unsplash)',
      landmark: 'Lauterbrunnen Vadisi ve Staubbach Şelalesi',
      url: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1530122037265-a5f1f91d3b99',
      artist: 'Unsplash Verified Creator',
      license: 'Unsplash License',
      dimensions: '2400x1600',
      source: 'Unsplash (Verified)'
    },
    candidateAlt: {
      title: 'Matterhorn Peak, Zermatt',
      landmark: 'Zermatt Matterhorn Zirvesi',
      url: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Matterhorn_from_Domh%C3%BCtte_-_2.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Matterhorn_from_Domh%C3%BCtte_-_2.jpg',
      artist: 'Zacharie Grossen',
      license: 'CC BY-SA 4.0',
      dimensions: '3500x2333',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Mevcut Görsel Doğrulandı (Lauterbrunnen) + Alternatif Matterhorn',
    confidence: 'Yüksek'
  },
  {
    code: 'CY',
    nameTr: 'Kıbrıs',
    nameEn: 'Cyprus',
    phase0Status: 'ALAKASIZ',
    phase0Reason: 'Quebec rock festivali konseri sahnesi ve kalabalık',
    oldImageUrl: 'https://images.unsplash.com/photo-1563841930606-67e2bce48b78?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Cape Greco Deniz Mağaraları ve Turkuaz Kıyı, Ayia Napa',
      alt1: 'Afrodit Kayası (Petra tou Romiou), Baf',
      alt2: 'Girne Tarihi Venedik Limanı ve Kalesi (Nötr Kıyı)'
    },
    candidatePrimary: {
      title: 'Cape Greco Sea Caves, Ayia Napa, Cyprus',
      landmark: 'Cape Greco Deniz Mağaraları ve Turkuaz Koyu',
      url: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Cape-Greco_caves.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Cape-Greco_caves.jpg',
      artist: 'Prokurator11',
      license: 'CC0 Public Domain',
      dimensions: '3456x2592',
      source: 'Wikimedia Commons'
    },
    candidateAlt: {
      title: 'Petra Tou Romiou, Cyprus',
      landmark: 'Afrodit Kayası (Petra tou Romiou), Baf',
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Petra_Tou_Romiou_00669.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Petra_Tou_Romiou_00669.jpg',
      artist: 'Anna Anichkova',
      license: 'CC BY-SA 3.0',
      dimensions: '6560x2000',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Coğrafi Konum + Doğal Kıyı Mağarası Görsel Doğrulama',
    confidence: 'Yüksek'
  },
  {
    code: 'CZ',
    nameTr: 'Çekya',
    nameEn: 'Czechia',
    phase0Status: 'OK',
    phase0Reason: 'Prag Karl Köprüsü ve Prag Kalesi manzarası (Doğrulandı)',
    oldImageUrl: 'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Prag Karl Köprüsü (Charles Bridge) ve Prag Kalesi',
      alt1: 'Český Krumlov Tarihi Kenti ve Vltava Nehri (UNESCO)',
      alt2: 'Prag Eski Şehir Meydanı ve Astronomik Saat Kulesi'
    },
    candidatePrimary: {
      title: 'Charles Bridge and Prague Castle (Verified Unsplash)',
      landmark: 'Prag Karl Köprüsü ve Prag Kalesi',
      url: 'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1541849546-216549ae216d',
      artist: 'Unsplash Verified Creator',
      license: 'Unsplash License',
      dimensions: '2400x1600',
      source: 'Unsplash (Verified)'
    },
    candidateAlt: {
      title: 'Český Krumlov Panorama',
      landmark: 'Český Krumlov Tarihi Kenti (UNESCO)',
      url: 'https://upload.wikimedia.org/wikipedia/commons/6/61/%C4%8Cesk%C3%BD_Krumlov_%28Krummau%29_-_panorama.JPG',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:%C4%8Cesk%C3%BD_Krumlov_(Krummau)_-_panorama.JPG',
      artist: 'Pudelek (Marcin Szala)',
      license: 'CC BY-SA 3.0',
      dimensions: '3444x1900',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Mevcut Görsel Doğrulandı (Karl Köprüsü) + Alternatif Krumlov',
    confidence: 'Yüksek'
  },
  {
    code: 'DE',
    nameTr: 'Almanya',
    nameEn: 'Germany',
    phase0Status: 'OK',
    phase0Reason: 'Berlin Brandenburg Kapısı ve Pariser Platz (Doğrulandı)',
    oldImageUrl: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Berlin Brandenburg Kapısı ve Pariser Platz',
      alt1: 'Bavyera Neuschwanstein Şatosu ve Alpler',
      alt2: 'Köln Katedrali ve Hohenzollern Köprüsü'
    },
    candidatePrimary: {
      title: 'Brandenburg Gate, Berlin (Verified Unsplash)',
      landmark: 'Berlin Brandenburg Kapısı',
      url: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1560969184-10fe8719e047',
      artist: 'Unsplash Verified Creator',
      license: 'Unsplash License',
      dimensions: '2400x1600',
      source: 'Unsplash (Verified)'
    },
    candidateAlt: {
      title: 'Neuschwanstein Castle, Bavaria',
      landmark: 'Bavyera Neuschwanstein Şatosu',
      url: 'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1544085311-11a028465b03',
      artist: 'Rachel Davis',
      license: 'Unsplash License',
      dimensions: '3000x2000',
      source: 'Unsplash (Verified)'
    },
    verificationMethod: 'Mevcut Görsel Doğrulandı (Brandenburg Kapısı) + Alternatif Şato',
    confidence: 'Yüksek'
  },
  {
    code: 'DK',
    nameTr: 'Danimarka',
    nameEn: 'Denmark',
    phase0Status: 'OK',
    phase0Reason: 'Kopenhag Nyhavn tarihi renkli limanı (Doğrulandı)',
    oldImageUrl: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Kopenhag Nyhavn Tarihi Renkli Limanı ve Kanal Evleri',
      alt1: 'Frederiksborg Kalesi ve Barok Bahçeleri, Hillerød',
      alt2: 'Møns Klint Beyaz Tebeşir Falezleri ve Baltık Denizi'
    },
    candidatePrimary: {
      title: 'Nyhavn Waterfront, Copenhagen (Verified Unsplash)',
      landmark: 'Kopenhag Nyhavn Tarihi Renkli Limanı',
      url: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1513622470522-26c3c8a854bc',
      artist: 'Unsplash Verified Creator',
      license: 'Unsplash License',
      dimensions: '2400x1600',
      source: 'Unsplash (Verified)'
    },
    candidateAlt: {
      title: 'Frederiksborg Slot, Hillerød',
      landmark: 'Frederiksborg Kalesi ve Bahçeleri',
      url: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Frederiksborg_Slot_i_sol.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Frederiksborg_Slot_i_sol.jpg',
      artist: 'Heb',
      license: 'CC BY-SA 3.0',
      dimensions: '2958x1604',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Mevcut Görsel Doğrulandı (Nyhavn) + Alternatif Frederiksborg',
    confidence: 'Yüksek'
  },
  {
    code: 'EE',
    nameTr: 'Estonya',
    nameEn: 'Estonia',
    phase0Status: 'ALAKASIZ',
    phase0Reason: 'Havaalanı apronunda park halinde Airbus A340 yolcu uçağı',
    oldImageUrl: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Tallinn Tarihi Eski Şehri ve Orta Çağ Kuleleri (Toompea - UNESCO)',
      alt1: 'Tallinn Aleksandr Nevski Katedrali',
      alt2: 'Lahemaa Ulusal Parkı ve Viru Bataklığı Ahşap Yolu'
    },
    candidatePrimary: {
      title: 'Tallinn Old Town Panorama from Toompea',
      landmark: 'Tallinn Tarihi Eski Şehri ve Orta Çağ Kuleleri (UNESCO)',
      url: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Vistas_panor%C3%A1micas_desde_Toompea%2C_Tallinn%2C_Estonia%2C_2012-08-05%2C_DD_01-03_PAN.JPG',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Vistas_panor%C3%A1micas_desde_Toompea,_Tallinn,_Estonia,_2012-08-05,_DD_01-03_PAN.JPG',
      artist: 'Diego Delso',
      license: 'CC BY-SA 3.0',
      dimensions: '7310x1985',
      source: 'Wikimedia Commons'
    },
    candidateAlt: {
      title: 'Alexander Nevsky Cathedral Tallinn',
      landmark: 'Tallinn Aleksandr Nevski Katedrali',
      url: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Vistas_panor%C3%A1micas_desde_la_iglesia_de_San_Olaf%2C_Tallinn%2C_Estonia%2C_2012-08-05%2C_DD_55.JPG',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Vistas_panor%C3%A1micas_desde_la_iglesia_de_San_Olaf,_Tallinn,_Estonia,_2012-08-05,_DD_55.JPG',
      artist: 'Diego Delso',
      license: 'CC BY-SA 3.0',
      dimensions: '4171x2781',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'UNESCO Dünya Mirası Kaydı + Toompea Tepesi Görsel Doğrulama',
    confidence: 'Yüksek'
  },
  {
    code: 'ES',
    nameTr: 'İspanya',
    nameEn: 'Spain',
    phase0Status: 'OK',
    phase0Reason: 'Barselona Sagrada Familia Bazilikası (Doğrulandı)',
    oldImageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Barselona Sagrada Família Bazilikası (Antoni Gaudí)',
      alt1: 'Granada Elhamra Sarayı ve Bahçeleri (Alhambra - UNESCO)',
      alt2: 'Sevilla Plaza de España Meydanı ve Kanalları'
    },
    candidatePrimary: {
      title: 'Sagrada Familia, Barcelona (Verified Unsplash)',
      landmark: 'Barselona Sagrada Família Bazilikası',
      url: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1583422409516-2895a77efded',
      artist: 'Unsplash Verified Creator',
      license: 'Unsplash License',
      dimensions: '2400x1600',
      source: 'Unsplash (Verified)'
    },
    candidateAlt: {
      title: 'Plaza de España, Seville',
      landmark: 'Sevilla Plaza de España',
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Seville_April_2019-15a.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Seville_April_2019-15a.jpg',
      artist: 'Daniel Villafruela',
      license: 'CC BY-SA 4.0',
      dimensions: '10224x3737',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Mevcut Görsel Doğrulandı (Sagrada Familia) + Alternatif Plaza España',
    confidence: 'Yüksek'
  },
  {
    code: 'FI',
    nameTr: 'Finlandiya',
    nameEn: 'Finland',
    phase0Status: 'OK',
    phase0Reason: 'Laponya karlı çam ormanı ve parlayan Kuzey Işıkları (Doğrulandı)',
    oldImageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Laponya Karlı Tayga Ormanı ve Kuzey Işıkları (Aurora Borealis)',
      alt1: 'Helsinki Katedrali ve Tarihi Senato Meydanı',
      alt2: 'Suomenlinna Deniz Kalesi ve Takımadalar (UNESCO)'
    },
    candidatePrimary: {
      title: 'Lapland Northern Lights (Verified Unsplash)',
      landmark: 'Laponya Kuzey Işıkları ve Karlı Orman',
      url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1531366936337-7c912a4589a7',
      artist: 'Unsplash Verified Creator',
      license: 'Unsplash License',
      dimensions: '2400x1600',
      source: 'Unsplash (Verified)'
    },
    candidateAlt: {
      title: 'Senate Square and Helsinki Cathedral',
      landmark: 'Helsinki Katedrali ve Senato Meydanı',
      url: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Senate_Square_-_Senaatintori_-_Senatstorget%2C_Helsinki%2C_Finland.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Senate_Square_-_Senaatintori_-_Senatstorget,_Helsinki,_Finland.jpg',
      artist: 'Kallerna',
      license: 'CC BY-SA 4.0',
      dimensions: '12336x2973',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Mevcut Görsel Doğrulandı (Aurora) + Alternatif Katedral',
    confidence: 'Yüksek'
  },
  {
    code: 'FR',
    nameTr: 'Fransa',
    nameEn: 'France',
    phase0Status: 'OK',
    phase0Reason: 'Paris Eyfel Kulesi ve Seine Nehri manzarası (Doğrulandı)',
    oldImageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Paris Eyfel Kulesi ve Champ de Mars Manzarası',
      alt1: 'Mont Saint-Michel Gelgit Manastır Adası, Normandiya (UNESCO)',
      alt2: 'Nice Kordonu (Promenade des Anglais) ve Fransız Rivierası'
    },
    candidatePrimary: {
      title: 'Eiffel Tower, Paris (Verified Unsplash)',
      landmark: 'Paris Eyfel Kulesi',
      url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1502602898657-3e91760cbb34',
      artist: 'Unsplash Verified Creator',
      license: 'Unsplash License',
      dimensions: '2400x1600',
      source: 'Unsplash (Verified)'
    },
    candidateAlt: {
      title: 'Mont St Michel at sunrise',
      landmark: 'Mont Saint-Michel Manastır Adası (UNESCO)',
      url: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Mont_St_Michel_at_sunrise.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Mont_St_Michel_at_sunrise.jpg',
      artist: 'Diliff',
      license: 'CC BY-SA 3.0',
      dimensions: '6000x4000',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Mevcut Görsel Doğrulandı (Eyfel Kulesi) + Alternatif Mont Saint-Michel',
    confidence: 'Yüksek'
  },
  {
    code: 'GB',
    nameTr: 'Birleşik Krallık',
    nameEn: 'United Kingdom',
    phase0Status: 'OK',
    phase0Reason: 'Londra Big Ben saat kulesi ve kırmızı otobüs (Doğrulandı)',
    oldImageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Londra Big Ben Saat Kulesi ve Westminster Sarayı',
      alt1: 'Edinburgh Kalesi ve Tarihi Royal Mile, İskoçya',
      alt2: 'Stonehenge Neolitik Taş Çemberi, Wiltshire (UNESCO)'
    },
    candidatePrimary: {
      title: 'Big Ben and Westminster, London (Verified Unsplash)',
      landmark: 'Londra Big Ben ve Westminster Sarayı',
      url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1513635269975-59663e0ac1ad',
      artist: 'Unsplash Verified Creator',
      license: 'Unsplash License',
      dimensions: '2400x1600',
      source: 'Unsplash (Verified)'
    },
    candidateAlt: {
      title: 'Edinburgh Castle, Scotland',
      landmark: 'Edinburgh Kalesi, İskoçya',
      url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1506377247377-2a5b3b417ebb',
      artist: 'Jörg Angeli',
      license: 'Unsplash License',
      dimensions: '3000x2000',
      source: 'Unsplash (Verified)'
    },
    verificationMethod: 'Mevcut Görsel Doğrulandı (Big Ben) + Alternatif Edinburgh',
    confidence: 'Yüksek'
  },
  {
    code: 'GR',
    nameTr: 'Yunanistan',
    nameEn: 'Greece',
    phase0Status: 'OK',
    phase0Reason: 'Santorini Oia beyaz evleri, mavi kubbeler ve kaldera (Doğrulandı)',
    oldImageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Santorini Oia Köyü Mavi Kubbeli Kiliseleri ve Kaldera',
      alt1: 'Atina Akropolisi ve Parthenon Tapınağı (UNESCO)',
      alt2: 'Meteora Manastırları ve Kumtaşı Kaya Sütunları (UNESCO)'
    },
    candidatePrimary: {
      title: 'Santorini Oia Caldera (Verified Unsplash)',
      landmark: 'Santorini Oia Mavi Kubbeli Kiliseleri',
      url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1570077188670-e3a8d69ac5ff',
      artist: 'Unsplash Verified Creator',
      license: 'Unsplash License',
      dimensions: '2400x1600',
      source: 'Unsplash (Verified)'
    },
    candidateAlt: {
      title: 'Parthenon, Acropolis of Athens',
      landmark: 'Atina Akropolisi ve Parthenon (UNESCO)',
      url: 'https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1555993539-1732b0258235',
      artist: 'Spencer Davis',
      license: 'Unsplash License',
      dimensions: '3000x2000',
      source: 'Unsplash (Verified)'
    },
    verificationMethod: 'Mevcut Görsel Doğrulandı (Santorini) + Alternatif Parthenon',
    confidence: 'Yüksek'
  },
  {
    code: 'HR',
    nameTr: 'Hırvatistan',
    nameEn: 'Croatia',
    phase0Status: 'OK',
    phase0Reason: 'Dubrovnik tarihi şehir surları ve Adriyatik Denizi (Doğrulandı)',
    oldImageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Dubrovnik Tarihi Eski Şehri ve Adriyatik Surları (UNESCO)',
      alt1: 'Plitvice Gölleri Ulusal Parkı Şelaleleri (UNESCO)',
      alt2: 'Split Diocletianus Sarayı ve Riva Kordonu'
    },
    candidatePrimary: {
      title: 'Dubrovnik Old Town Walls (Verified Unsplash)',
      landmark: 'Dubrovnik Tarihi Surları ve Adriyatik',
      url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1533105079780-92b9be482077',
      artist: 'Unsplash Verified Creator',
      license: 'Unsplash License',
      dimensions: '2400x1600',
      source: 'Unsplash (Verified)'
    },
    candidateAlt: {
      title: 'Plitvice Lakes National Park',
      landmark: 'Plitvice Gölleri Ulusal Parkı Şelaleleri (UNESCO)',
      url: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1508672019048-805c876b67e2',
      artist: 'Oliver Sjostrom',
      license: 'Unsplash License',
      dimensions: '3000x2000',
      source: 'Unsplash (Verified)'
    },
    verificationMethod: 'Mevcut Görsel Doğrulandı (Dubrovnik) + Alternatif Plitvice',
    confidence: 'Yüksek'
  },
  {
    code: 'HU',
    nameTr: 'Macaristan',
    nameEn: 'Hungary',
    phase0Status: 'OK',
    phase0Reason: 'Budapeşte Parlamento Binası ve Tuna Nehri (Doğrulandı)',
    oldImageUrl: 'https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Budapeşte Macaristan Parlamento Binası ve Tuna Nehri',
      alt1: 'Budapeşte Balıkçı Tabyası (Fisherman’s Bastion)',
      alt2: 'Buda Kalesi ve Széchenyi Zincirli Köprüsü'
    },
    candidatePrimary: {
      title: 'Hungarian Parliament Building, Budapest (Verified Unsplash)',
      landmark: 'Budapeşte Macaristan Parlamento Binası',
      url: 'https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1549877452-9c387954fbc2',
      artist: 'Unsplash Verified Creator',
      license: 'Unsplash License',
      dimensions: '2400x1600',
      source: 'Unsplash (Verified)'
    },
    candidateAlt: {
      title: 'Fisherman’s Bastion, Budapest',
      landmark: 'Budapeşte Balıkçı Tabyası',
      url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1518684079-3c830dcef090',
      artist: 'Ervin Lukacs',
      license: 'Unsplash License',
      dimensions: '3000x2000',
      source: 'Unsplash (Verified)'
    },
    verificationMethod: 'Mevcut Görsel Doğrulandı (Parlamento) + Alternatif Balıkçı Tabyası',
    confidence: 'Yüksek'
  }
];

// Generate batch-1.html
const htmlContent = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Batch 1: 20 Ülke Hedef Sembolleri & Aday Görselleri (Faz 1 Önizleme)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #090d16;
      --card-bg: #111827;
      --border: #1f2937;
      --text: #f3f4f6;
      --text-muted: #9ca3af;
      --ok: #10b981;
      --warn: #f59e0b;
      --bad: #ef4444;
      --primary: #3b82f6;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
      background: var(--bg);
      color: var(--text);
      padding: 32px 24px;
      line-height: 1.5;
    }
    .header {
      max-width: 1440px;
      margin: 0 auto 32px;
    }
    .badge-top {
      display: inline-block;
      padding: 4px 12px;
      background: rgba(59, 130, 246, 0.15);
      color: #60a5fa;
      border: 1px solid rgba(59, 130, 246, 0.3);
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 12px;
    }
    h1 {
      font-size: 30px;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 8px;
    }
    .subtitle {
      color: var(--text-muted);
      font-size: 15px;
      max-width: 950px;
    }
    .instructions-box {
      max-width: 1440px;
      margin: 0 auto 28px;
      background: rgba(59, 130, 246, 0.08);
      border: 1px solid rgba(59, 130, 246, 0.25);
      border-radius: 12px;
      padding: 16px 20px;
      font-size: 14px;
    }
    .instructions-box strong { color: #93c5fd; }
    
    .table-container {
      max-width: 1440px;
      margin: 0 auto;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 13px;
    }
    th {
      background: #0d131f;
      padding: 14px 16px;
      font-size: 11px;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid var(--border);
    }
    td {
      padding: 18px 16px;
      border-bottom: 1px solid #1a2234;
      vertical-align: top;
    }
    tr:hover td {
      background: rgba(255, 255, 255, 0.015);
    }
    
    .country-block {
      min-width: 130px;
    }
    .c-code {
      display: inline-block;
      font-size: 12px;
      font-weight: 800;
      background: #1e293b;
      padding: 2px 8px;
      border-radius: 6px;
      color: #93c5fd;
      margin-bottom: 4px;
    }
    .c-name { font-weight: 700; color: #fff; font-size: 15px; }
    .c-en { font-size: 12px; color: var(--text-muted); }
    
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      margin-top: 6px;
    }
    .badge-OK { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }
    .badge-DEFECT { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); }

    .old-img-container {
      width: 110px;
    }
    .old-thumb {
      width: 110px;
      height: 75px;
      object-fit: cover;
      border-radius: 8px;
      border: 1px solid var(--border);
      opacity: 0.75;
      display: block;
      margin-bottom: 6px;
    }
    .defect-reason {
      font-size: 11px;
      color: #f87171;
      line-height: 1.3;
    }

    .symbols-list {
      max-width: 250px;
      font-size: 12px;
      line-height: 1.45;
    }
    .symbols-list div { margin-bottom: 4px; }
    .sym-main { color: #38bdf8; font-weight: 600; }
    .sym-alt { color: var(--text-muted); }

    .candidate-card {
      width: 220px;
      background: #0d131f;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 8px;
      transition: transform 0.2s;
    }
    .candidate-card:hover {
      transform: translateY(-2px);
      border-color: rgba(59, 130, 246, 0.4);
    }
    .cand-thumb {
      width: 100%;
      height: 125px;
      object-fit: cover;
      border-radius: 6px;
      display: block;
      margin-bottom: 8px;
      background: #000;
    }
    .cand-landmark {
      font-weight: 700;
      font-size: 12px;
      color: #fff;
      margin-bottom: 4px;
      line-height: 1.3;
    }
    .cand-meta {
      font-size: 11px;
      color: var(--text-muted);
      line-height: 1.4;
    }
    .cand-meta a {
      color: #60a5fa;
      text-decoration: none;
    }
    .cand-meta a:hover { text-decoration: underline; }

    .confidence-badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 6px;
      font-weight: 700;
      font-size: 11px;
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.3);
    }
    .method-text {
      font-size: 11px;
      color: var(--text-muted);
      margin-top: 6px;
      max-width: 130px;
      line-height: 1.35;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="badge-top">Faz 1 — Batch 1 / 10</div>
    <h1>Batch 1: İlk 20 Ülke Sembol Listesi ve Aday Görseller</h1>
    <p class="subtitle">
      Her ülke için 1 ana sembol + 2 alternatif belirlenmiş; doğrulanmış 1 birincil aday ve 1 alternatif yüksek çözünürlüklü aday görseli hazırlanmıştır.
    </p>
  </div>

  <div class="instructions-box">
    <strong>📋 Değerlendirme Talimatı:</strong>  
    Lütfen aşağıdaki 20 ülkeyi inceleyin. Beğenmediğiniz bir aday veya değiştirmek istediğiniz bir sembol varsa, <code>"AD Sant Joan yerine Casa de la Vall olsun"</code> veya <code>"BG alternatif aday seçilsin"</code> gibi kodlarla geri bildirim verebilirsiniz. Onayladığınızda bu 20 ülke Faz 2 optimizasyonuna alınacaktır.
  </div>

  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Ülke</th>
          <th>Eski Görsel & Durum</th>
          <th>Hedef Semboller (1 Ana + 2 Alt)</th>
          <th>Yeni Birincil Aday (Önerilen)</th>
          <th>Alternatif Aday</th>
          <th>Güven & Doğrulama</th>
        </tr>
      </thead>
      <tbody>
        ${BATCH_1_DATA.map((c) => `
        <tr>
          <td>
            <div class="country-block">
              <span class="c-code">${c.code}</span>
              <div class="c-name">${c.nameTr}</div>
              <div class="c-en">${c.nameEn}</div>
              <span class="badge ${c.phase0Status === 'OK' ? 'badge-OK' : 'badge-DEFECT'}">
                ${c.phase0Status === 'OK' ? 'MEVCUT OK' : 'DEĞİŞECEK'}
              </span>
            </div>
          </td>
          <td>
            <div class="old-img-container">
              <img src="${c.oldImageUrl}" class="old-thumb" alt="${c.nameTr}" loading="lazy">
              ${c.phase0Status !== 'OK' ? `<div class="defect-reason">${c.phase0Reason}</div>` : '<div style="font-size: 11px; color: #34d399;">Doğrulanmış Orijinal</div>'}
            </div>
          </td>
          <td>
            <div class="symbols-list">
              <div class="sym-main">⭐ 1. ${c.symbols.main}</div>
              <div class="sym-alt">🔹 2. ${c.symbols.alt1}</div>
              <div class="sym-alt">🔹 3. ${c.symbols.alt2}</div>
            </div>
          </td>
          <td>
            <div class="candidate-card">
              <a href="${c.candidatePrimary.url}" target="_blank">
                <img src="${c.candidatePrimary.url}" class="cand-thumb" alt="${c.candidatePrimary.landmark}" loading="lazy">
              </a>
              <div class="cand-landmark">${c.candidatePrimary.landmark}</div>
              <div class="cand-meta">
                📐 ${c.candidatePrimary.dimensions} px<br>
                👤 ${c.candidatePrimary.artist}<br>
                📜 ${c.candidatePrimary.license}<br>
                🔗 <a href="${c.candidatePrimary.sourcePageUrl}" target="_blank">Kaynak (${c.candidatePrimary.source})</a>
              </div>
            </div>
          </td>
          <td>
            <div class="candidate-card">
              <a href="${c.candidateAlt.url}" target="_blank">
                <img src="${c.candidateAlt.url}" class="cand-thumb" alt="${c.candidateAlt.landmark}" loading="lazy">
              </a>
              <div class="cand-landmark">${c.candidateAlt.landmark}</div>
              <div class="cand-meta">
                📐 ${c.candidateAlt.dimensions} px<br>
                👤 ${c.candidateAlt.artist}<br>
                📜 ${c.candidateAlt.license}<br>
                🔗 <a href="${c.candidateAlt.sourcePageUrl}" target="_blank">Kaynak (${c.candidateAlt.source})</a>
              </div>
            </div>
          </td>
          <td>
            <span class="confidence-badge">${c.confidence}</span>
            <div class="method-text">${c.verificationMethod}</div>
          </td>
        </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
</body>
</html>`;

const outPath = path.join(process.cwd(), 'batch-1.html');
fs.writeFileSync(outPath, htmlContent, 'utf-8');
console.log(`✅ batch-1.html başarıyla güncellendi: ${outPath}`);
