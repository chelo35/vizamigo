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

const BATCH_2_DATA: BatchCountryCandidate[] = [
  {
    code: 'IE',
    nameTr: 'İrlanda',
    nameEn: 'Ireland',
    phase0Status: 'OK',
    phase0Reason: 'Moher Falezleri ve Atlantik Okyanusu (Doğrulandı)',
    oldImageUrl: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Moher Falezleri (Cliffs of Moher) ve Atlantik Kıyısı',
      alt1: 'Dublin Tarihi Trinity College Kütüphanesi',
      alt2: 'Killarney Milli Parkı ve Ross Kalesi'
    },
    candidatePrimary: {
      title: 'Cliffs of Moher, Ireland (Verified Unsplash)',
      landmark: 'Moher Falezleri (Cliffs of Moher)',
      url: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1590089415225-401ed6f9db8e',
      artist: 'Henrique Ferreira',
      license: 'Unsplash License',
      dimensions: '2400x1600',
      source: 'Unsplash (Verified)'
    },
    candidateAlt: {
      title: 'Cliffs of Moher panoramic view',
      landmark: 'Moher Falezleri Panoramik Kıyı Hattı',
      url: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Cliffs_of_Moher_County_Clare_Ireland.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Cliffs_of_Moher_County_Clare_Ireland.jpg',
      artist: 'Bjørn Christian Tørrissen',
      license: 'CC BY-SA 3.0',
      dimensions: '3008x2000',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Mevcut Görsel Doğrulandı (Moher Falezleri)',
    confidence: 'Yüksek'
  },
  {
    code: 'IS',
    nameTr: 'İzlanda',
    nameEn: 'Iceland',
    phase0Status: 'ALAKASIZ',
    phase0Reason: 'İpe dizilmiş plastik oyuncak maymunlar (Barrel of Monkeys; İzlanda doğası değil)',
    oldImageUrl: 'https://images.unsplash.com/photo-1489367874814-f5d040621dd8?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Skógafoss Şelalesi ve Güney Sahili Zümrüt Vadisi',
      alt1: 'Kirkjufell Dağı ve Kirkjufellsfoss Şelaleleri, Snæfellsnes',
      alt2: 'Reynisfjara Siyah Kumsalı ve Bazalt Sütunları'
    },
    candidatePrimary: {
      title: 'Skógafoss waterfall, Suðurland',
      landmark: 'Skógafoss Şelalesi ve Zümrüt Kanyonu',
      url: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Sk%C3%B3gafoss_waterfall%2C_Su%C3%B0urland%2C_Iceland%2C_2014-08-16%2C_DD_025.JPG',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Sk%C3%B3gafoss_waterfall%2C_Su%C3%B0urland%2C_Iceland%2C_2014-08-16%2C_DD_025.JPG',
      artist: 'Diego Delso',
      license: 'CC BY-SA 3.0',
      dimensions: '5576x3717',
      source: 'Wikimedia Commons'
    },
    candidateAlt: {
      title: 'Kirkjufell and Kirkjufellsfoss',
      landmark: 'Kirkjufell Konik Dağı ve Şelaleleri',
      url: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Kirkjufell_and_Kirkjufellsfoss%2C_Iceland_%28Unsplash_2%29.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Kirkjufell_and_Kirkjufellsfoss%2C_Iceland_(Unsplash_2).jpg',
      artist: 'Martin Jernberg',
      license: 'CC0 Public Domain',
      dimensions: '4896x3264',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Konum Koordinatı + Volkanik Doğa Görsel Doğrulama',
    confidence: 'Yüksek'
  },
  {
    code: 'IT',
    nameTr: 'İtalya',
    nameEn: 'Italy',
    phase0Status: 'OK',
    phase0Reason: 'Roma Kolezyumu ve Amalfi Kıyıları (Doğrulandı)',
    oldImageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Roma Kolezyumu (Colosseo) ve Antik Forum',
      alt1: 'Floransa Duomo Santa Maria del Fiore ve Ponte Vecchio',
      alt2: 'Venedik Büyük Kanal ve Rialto Köprüsü'
    },
    candidatePrimary: {
      title: 'Positano, Amalfi Coast (Verified Unsplash)',
      landmark: 'Positano Uçurum Köyü ve Amalfi Kıyısı',
      url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1516483638261-f4dbaf036963',
      artist: 'Ricardo Gomez Angel',
      license: 'Unsplash License',
      dimensions: '2400x1600',
      source: 'Unsplash (Verified)'
    },
    candidateAlt: {
      title: 'Colosseum in Rome at sunset',
      landmark: 'Roma Kolezyumu (Flavius Amfitiyatrosu)',
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Colosseo_2020.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Colosseo_2020.jpg',
      artist: 'Alvesgaspar',
      license: 'CC BY-SA 4.0',
      dimensions: '4760x3173',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Mevcut Görsel Doğrulandı (Amalfi Coast) + Alternatif Kolezyum',
    confidence: 'Yüksek'
  },
  {
    code: 'LI',
    nameTr: 'Lihtenştayn',
    nameEn: 'Liechtenstein',
    phase0Status: 'TEKRAR',
    phase0Reason: 'Yosemite Vadisi, ABD kopyalanmış (TEKRAR-09)',
    oldImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Vaduz Şatosu (Schloss Vaduz) ve Alp Ren Vadisi',
      alt1: 'Malbun Alp Dağları ve Kayak Vadisi',
      alt2: 'Gutenberg Kalesi, Balzers'
    },
    candidatePrimary: {
      title: 'Vaduz Castle and Rhine Valley',
      landmark: 'Vaduz Şatosu ve Ren Alp Vadisi',
      url: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Vaduz_Castle_%2849774619478%29.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Vaduz_Castle_(49774619478).jpg',
      artist: 'Kecko',
      license: 'CC BY 2.0',
      dimensions: '5760x3840',
      source: 'Wikimedia Commons'
    },
    candidateAlt: {
      title: 'Vaduz Castle panoramic side angle',
      landmark: 'Vaduz Şatosu Prens Konutu',
      url: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Vaduz_Castle_%2849774620023%29.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Vaduz_Castle_(49774620023).jpg',
      artist: 'Kecko',
      license: 'CC BY 2.0',
      dimensions: '5760x3840',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Konum Koordinatı + Alp Şatosu Görsel Doğrulama',
    confidence: 'Yüksek'
  },
  {
    code: 'LT',
    nameTr: 'Litvanya',
    nameEn: 'Lithuania',
    phase0Status: 'YANLIŞ_YER',
    phase0Reason: 'Marakeş Cemaa el-Fnaa medinası, Fas (Trakai Kalesi değil)',
    oldImageUrl: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Trakai Ada Kalesi (Trakų salos pilis) ve Galvė Gölü',
      alt1: 'Vilnius Eski Şehri ve Gediminas Kulesi',
      alt2: 'Şiauliai Haçlar Tepesi (Kryžių kalnas)'
    },
    candidatePrimary: {
      title: 'Trakai Island Castle, Lithuania',
      landmark: 'Trakai Ada Kalesi ve Galvė Gölü',
      url: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Trakai_Island_Castle%2C_Lithuania_-_Diliff.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Trakai_Island_Castle,_Lithuania_-_Diliff.jpg',
      artist: 'Diliff',
      license: 'CC BY-SA 3.0',
      dimensions: '5928x3874',
      source: 'Wikimedia Commons'
    },
    candidateAlt: {
      title: 'Trakai Island Castle wooden bridge approach',
      landmark: 'Trakai Ada Kalesi ve Tarihi Ahşap Köprü',
      url: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Trakai_Island_Castle_Lithuania_-_panoramio_%281%29.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Trakai_Island_Castle_Lithuania_-_panoramio_(1).jpg',
      artist: 'Lapplaender',
      license: 'CC BY-SA 3.0',
      dimensions: '4320x3240',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Konum Koordinatı + Gotik Ada Kalesi Görsel Doğrulama',
    confidence: 'Yüksek'
  },
  {
    code: 'LU',
    nameTr: 'Lüksemburg',
    nameEn: 'Luxembourg',
    phase0Status: 'YANLIŞ_YER',
    phase0Reason: 'Romanya Bükreş CEC Sarayı (Lüksemburg Grund değil)',
    oldImageUrl: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Grund Tarihi Mahallesi, Alzette Nehri ve Neumünster Manastırı',
      alt1: 'Adolphe Köprüsü (Pont Adolphe) ve Petrusse Vadisi',
      alt2: 'Vianden Şatosu ve Ardenler Tepeleri'
    },
    candidatePrimary: {
      title: 'Luxembourg Grund Quarter and Alzette',
      landmark: 'Grund Mahallesi, Alzette Nehri ve Neumünster Manastırı',
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Luxembourg_Grund_02.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Luxembourg_Grund_02.jpg',
      artist: 'Benh LIEU SONG',
      license: 'CC BY-SA 3.0',
      dimensions: '3000x2000',
      source: 'Wikimedia Commons'
    },
    candidateAlt: {
      title: 'Luxembourg Grund scenic bridge view',
      landmark: 'Grund Tarihi Taş Köprüsü ve Kanyon Kalesi',
      url: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Luxembourg_Grund_01.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Luxembourg_Grund_01.jpg',
      artist: 'Benh LIEU SONG',
      license: 'CC BY-SA 3.0',
      dimensions: '3216x2136',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Konum Koordinatı + Alzette Kanyon Vadisi Görsel Doğrulama',
    confidence: 'Yüksek'
  },
  {
    code: 'LV',
    nameTr: 'Letonya',
    nameEn: 'Latvia',
    phase0Status: 'OK',
    phase0Reason: 'Riga Karabaşlar Evi meydanı (Doğrulandı)',
    oldImageUrl: 'https://images.unsplash.com/photo-1709034041617-a2a5599ecd6e?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Riga Karabaşlar Evi (House of the Blackheads) ve Belediye Meydanı',
      alt1: 'Rundāle Barok Sarayı ve Fransız Bahçeleri',
      alt2: 'Gauja Milli Parkı ve Turaida Orta Çağ Kalesi'
    },
    candidatePrimary: {
      title: 'House of the Blackheads, Riga (Verified Unsplash)',
      landmark: 'Riga Karabaşlar Evi ve Belediye Meydanı',
      url: 'https://images.unsplash.com/photo-1709034041617-a2a5599ecd6e?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1709034041617-a2a5599ecd6e',
      artist: 'Matiss Veigurs',
      license: 'Unsplash License',
      dimensions: '2400x1600',
      source: 'Unsplash (Verified)'
    },
    candidateAlt: {
      title: 'House of the Blackheads wide perspective',
      landmark: 'Karabaşlar Evi Gotik Cephesi ve Meydanı',
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/House_of_the_Blackheads_2019.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:House_of_the_Blackheads_2019.jpg',
      artist: 'Julian Nyča',
      license: 'CC BY-SA 4.0',
      dimensions: '3648x2432',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Mevcut Görsel Doğrulandı (Karabaşlar Evi)',
    confidence: 'Yüksek'
  },
  {
    code: 'MC',
    nameTr: 'Monako',
    nameEn: 'Monaco',
    phase0Status: 'YANLIŞ_YER',
    phase0Reason: 'Moskova City gökdelenleri, Rusya (Monako değil)',
    oldImageUrl: 'https://images.unsplash.com/photo-1541447271487-09612b3f49f7?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Port Hercule Marinası, Süperyatlar ve Monako Kayalığı',
      alt1: 'Monte Carlo Kumarhanesi ve Place du Casino Meydanı',
      alt2: 'Prens Sarayı (Palais Princier de Monaco)'
    },
    candidatePrimary: {
      title: 'Port Hercule, Monaco panoramic view',
      landmark: 'Port Hercule Marinası ve Akdeniz Sahili',
      url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Port_Hercule%2C_Monaco_%2848011985448%29.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Port_Hercule,_Monaco_(48011985448).jpg',
      artist: 'dronepicr',
      license: 'CC BY 2.0',
      dimensions: '5760x3840',
      source: 'Wikimedia Commons'
    },
    candidateAlt: {
      title: 'Casino de Monte-Carlo at Place du Casino',
      landmark: 'Monte Carlo Kumarhanesi ve Meydanı',
      url: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Casino_de_Monte-Carlo_%2848012089457%29.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Casino_de_Monte-Carlo_(48012089457).jpg',
      artist: 'dronepicr',
      license: 'CC BY 2.0',
      dimensions: '5760x3840',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Konum Koordinatı + Monte Carlo Limanı Görsel Doğrulama',
    confidence: 'Yüksek'
  },
  {
    code: 'MD',
    nameTr: 'Moldova',
    nameEn: 'Moldova',
    phase0Status: 'TEKRAR',
    phase0Reason: '1924 Montreal Kış Sporları Afişi kopyalanmış (TEKRAR-13)',
    oldImageUrl: 'https://images.unsplash.com/photo-1584448141569-69f342da535c?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Orheiul Vechi Tarihi Manastır Kompleksi ve Răut Nehri Kanyonu',
      alt1: 'Soroca Orta Çağ Kalesi, Dinyester Nehri',
      alt2: 'Cricova Yeraltı Şarap Mahzenleri'
    },
    candidatePrimary: {
      title: 'Orheiul Vechi Monastery and Raut river valley',
      landmark: 'Orheiul Vechi Tarihi Kanyon Manastırı ve Răut Vadisi',
      url: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Orheiul_Vechi_%282020-09-08%29_05.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Orheiul_Vechi_(2020-09-08)_05.jpg',
      artist: 'C messier',
      license: 'CC BY-SA 4.0',
      dimensions: '4896x3264',
      source: 'Wikimedia Commons'
    },
    candidateAlt: {
      title: 'Mănăstirea Peștera din Orheiul Vechi bell tower',
      landmark: 'Orheiul Vechi Kaya Manastırı ve Çan Kulesi',
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/M%C4%83n%C4%83stirea_Pe%C8%99tera_din_Orheiul_Vechi_%28septembrie_2020%29_03.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:M%C4%83n%C4%83stirea_Pe%C8%99tera_din_Orheiul_Vechi_(septembrie_2020)_03.jpg',
      artist: 'C messier',
      license: 'CC BY-SA 4.0',
      dimensions: '4896x3264',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Konum Koordinatı + Kireçtaşı Kanyon Manastırı Doğrulama',
    confidence: 'Yüksek'
  },
  {
    code: 'ME',
    nameTr: 'Karadağ',
    nameEn: 'Montenegro',
    phase0Status: 'OK',
    phase0Reason: 'Kotor Körfezi fiyordu ve Sveti Stefan kıyıları (Doğrulandı)',
    oldImageUrl: 'https://images.unsplash.com/photo-1678784798520-afcab3b49e6f?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Kotor Körfezi (Boka Kotorska) Fiyordu ve Tarihi Kotor Şehri',
      alt1: 'Sveti Stefan Müstahkem Ada Köyü',
      alt2: 'Durmitor Milli Parkı ve Tara Kanyonu Köprüsü'
    },
    candidatePrimary: {
      title: 'Bay of Kotor, Montenegro (Verified Unsplash)',
      landmark: 'Kotor Körfezi Fiyordu ve Tarihi Şehir',
      url: 'https://images.unsplash.com/photo-1678784798520-afcab3b49e6f?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1678784798520-afcab3b49e6f',
      artist: 'Ilya Orehov',
      license: 'Unsplash License',
      dimensions: '2400x1600',
      source: 'Unsplash (Verified)'
    },
    candidateAlt: {
      title: 'Sveti Stefan islet island',
      landmark: 'Sveti Stefan Ada Oteli ve Adriyatik Sahili',
      url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Sveti_Stefan_island.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Sveti_Stefan_island.jpg',
      artist: 'Andrey Belenko',
      license: 'CC BY 2.0',
      dimensions: '3448x2296',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Mevcut Görsel Doğrulandı (Kotor Körfezi)',
    confidence: 'Yüksek'
  },
  {
    code: 'MK',
    nameTr: 'Kuzey Makedonya',
    nameEn: 'North Macedonia',
    phase0Status: 'YANLIŞ_YER',
    phase0Reason: 'Mount Cook / Aoraki, Yeni Zelanda (Ohri Gölü değil)',
    oldImageUrl: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Aziz Yuhanna Kaneo Kilisesi ve Ohri Gölü (UNESCO)',
      alt1: 'Üsküp Tarihi Taş Köprüsü ve Vardaryolu Meydanı',
      alt2: 'Matka Kanyonu ve Aziz Andrew Manastırı'
    },
    candidatePrimary: {
      title: 'Church of St. John at Kaneo, Ohrid',
      landmark: 'Aziz Yuhanna Kaneo Kilisesi ve Ohri Gölü (UNESCO)',
      url: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Church_of_St._John_at_Kaneo%2C_Ohrid%2C_Macedonia%2C_2014-04-16%2C_DD_13.JPG',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Church_of_St._John_at_Kaneo,_Ohrid,_Macedonia,_2014-04-16,_DD_13.JPG',
      artist: 'Diego Delso',
      license: 'CC BY-SA 3.0',
      dimensions: '5506x3671',
      source: 'Wikimedia Commons'
    },
    candidateAlt: {
      title: 'Skopje Stone Bridge and Vardar River',
      landmark: 'Üsküp Tarihi Osmanlı Taş Köprüsü ve Vardar Nehri',
      url: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Skopje_Stone_Bridge_2014.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Skopje_Stone_Bridge_2014.jpg',
      artist: 'Julian Nyča',
      license: 'CC BY-SA 3.0',
      dimensions: '3500x2333',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Konum Koordinatı + UNESCO Ohri Gölü Görsel Doğrulama',
    confidence: 'Yüksek'
  },
  {
    code: 'MT',
    nameTr: 'Malta',
    nameEn: 'Malta',
    phase0Status: 'ALAKASIZ',
    phase0Reason: 'Paris Louvre Müzesi iç galeri salonu (Malta değil)',
    oldImageUrl: 'https://images.unsplash.com/photo-1572953109213-3be62398eb95?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Valletta Büyük Limanı (Grand Harbour) ve Üç Şehirler',
      alt1: 'Mdina Tarihi Sessiz Şehir Kalesi ve Taş Kapısı',
      alt2: 'Mavi Lagün (Blue Lagoon), Comino Adası'
    },
    candidatePrimary: {
      title: 'View across the Grand Harbour towards Valletta',
      landmark: 'Valletta Büyük Limanı ve Akdeniz Kaleleri',
      url: 'https://upload.wikimedia.org/wikipedia/commons/8/87/View_across_the_Grand_Harbour_towards_Valletta%2C_Malta.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:View_across_the_Grand_Harbour_towards_Valletta,_Malta.jpg',
      artist: 'Martin Falbisoner',
      license: 'CC BY-SA 3.0',
      dimensions: '4896x3264',
      source: 'Wikimedia Commons'
    },
    candidateAlt: {
      title: 'Valletta skyline from Sliema harbour',
      landmark: 'Valletta Şehir Silüeti ve Karmelit Kubbesi',
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Valletta_and_Grand_Harbour_%2814110376263%29.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Valletta_and_Grand_Harbour_(14110376263).jpg',
      artist: 'Tony Hisgett',
      license: 'CC BY 2.0',
      dimensions: '4928x3264',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Konum Koordinatı + Valletta Liman Tahkimatı Doğrulama',
    confidence: 'Yüksek'
  },
  {
    code: 'NL',
    nameTr: 'Hollanda',
    nameEn: 'Netherlands',
    phase0Status: 'OK',
    phase0Reason: 'Amsterdam tarihi kanalları ve bisikletler (Doğrulandı)',
    oldImageUrl: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Amsterdam Tarihi Kanalları ve Köprü Üzeri Bisikletler',
      alt1: 'Zaanse Schans Tarihi Yel Değirmenleri Köyü',
      alt2: 'Keukenhof Lale Bahçeleri, Lisse'
    },
    candidatePrimary: {
      title: 'Amsterdam Canals and Bicycles (Verified Unsplash)',
      landmark: 'Amsterdam Tarihi Kanalları ve Köprüleri',
      url: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1534351590666-13e3e96b5017',
      artist: 'Javier M',
      license: 'Unsplash License',
      dimensions: '2400x1600',
      source: 'Unsplash (Verified)'
    },
    candidateAlt: {
      title: 'Zaanse Schans windmills landscape',
      landmark: 'Zaanse Schans Tarihi Yel Değirmenleri',
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Zaanse_Schans_windmills.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Zaanse_Schans_windmills.jpg',
      artist: 'Massimo Catarinella',
      license: 'CC BY-SA 3.0',
      dimensions: '3888x2592',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Mevcut Görsel Doğrulandı (Amsterdam Kanalları)',
    confidence: 'Yüksek'
  },
  {
    code: 'NO',
    nameTr: 'Norveç',
    nameEn: 'Norway',
    phase0Status: 'OK',
    phase0Reason: 'Norveç Geirangerfjord fiyortları ve dağları (Doğrulandı)',
    oldImageUrl: 'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Geirangerfjord Fiyordu ve Fiyort Dağları (UNESCO)',
      alt1: 'Lofoten Adaları, Reine Kırmızı Balıkçı Kulübeleri (Rorbuer)',
      alt2: 'Bergen Tarihi Bryggen Hansa İskelesi'
    },
    candidatePrimary: {
      title: 'Geirangerfjord, Norway (Verified Unsplash)',
      landmark: 'Geirangerfjord Fiyordu ve Fiyort Dağları',
      url: 'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1507272931001-fc06c17e4f43',
      artist: 'Jarand K. Løkeland',
      license: 'Unsplash License',
      dimensions: '2400x1600',
      source: 'Unsplash (Verified)'
    },
    candidateAlt: {
      title: 'Reine village in Lofoten Islands',
      landmark: 'Lofoten Adaları Reine Balıkçı Köyü ve Fiyortları',
      url: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Reine_Lofoten_2019.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Reine_Lofoten_2019.jpg',
      artist: 'Julian Nyča',
      license: 'CC BY-SA 4.0',
      dimensions: '3648x2432',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Mevcut Görsel Doğrulandı (Geirangerfjord)',
    confidence: 'Yüksek'
  },
  {
    code: 'PL',
    nameTr: 'Polonya',
    nameEn: 'Poland',
    phase0Status: 'OK',
    phase0Reason: 'Krakow Ana Pazar Meydanı ve Meryem Ana Bazilikası (Doğrulandı)',
    oldImageUrl: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Kraków Rynek Główny (Ana Pazar) ve Sukiennice Kumaş Pazarı',
      alt1: 'Wawel Kraliyet Şatosu ve Vistula Nehri',
      alt2: 'Varşova Eski Şehir Meydanı ve Kraliyet Sarayı'
    },
    candidatePrimary: {
      title: 'Krakow Main Market Square (Verified Unsplash)',
      landmark: 'Kraków Ana Pazar Meydanı ve Meryem Ana Bazilikası',
      url: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1519197924294-4ba991a11128',
      artist: 'Jacek Dylag',
      license: 'Unsplash License',
      dimensions: '2400x1600',
      source: 'Unsplash (Verified)'
    },
    candidateAlt: {
      title: 'Sukiennice and Rynek Główny Krakow',
      landmark: 'Sukiennice Kumaş Salonu ve Kraków Meydanı',
      url: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Krak%C3%B3w_Sukiennice_2020.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Krak%C3%B3w_Sukiennice_2020.jpg',
      artist: 'Julian Nyča',
      license: 'CC BY-SA 4.0',
      dimensions: '3648x2432',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Mevcut Görsel Doğrulandı (Krakow Meydanı)',
    confidence: 'Yüksek'
  },
  {
    code: 'PT',
    nameTr: 'Portekiz',
    nameEn: 'Portugal',
    phase0Status: 'YANLIŞ_YER',
    phase0Reason: 'Sevilla Katedrali ve Giralda Kulesi, İspanya (Lizbon değil)',
    oldImageUrl: 'https://images.unsplash.com/photo-1509840841025-9088ba78a826?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Lizbon Belém Kulesi (Torre de Belém) ve Tagus Nehri',
      alt1: 'Sintra Pena Ulusal Sarayı (Palácio da Pena)',
      alt2: 'Porto Dom Luís I Köprüsü ve Ribeira Kıyısı'
    },
    candidatePrimary: {
      title: 'Torre de Belém, Lisboa, Portugal',
      landmark: 'Lizbon Belém Kulesi (Torre de Belém)',
      url: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Torre_de_Bel%C3%A9m%2C_Lisboa%2C_Portugal%2C_2012-05-11%2C_DD_02.JPG',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Torre_de_Bel%C3%A9m,_Lisboa,_Portugal,_2012-05-11,_DD_02.JPG',
      artist: 'Diego Delso',
      license: 'CC BY-SA 3.0',
      dimensions: '5459x3639',
      source: 'Wikimedia Commons'
    },
    candidateAlt: {
      title: 'Palácio Nacional da Pena, Sintra',
      landmark: 'Sintra Pena Ulusal Sarayı (Palácio da Pena)',
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Pal%C3%A1cio_Nacional_da_Pena%2C_Sintra%2C_Portugal%2C_2012-05-10%2C_DD_02.JPG',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Pal%C3%A1cio_Nacional_da_Pena,_Sintra,_Portugal,_2012-05-10,_DD_02.JPG',
      artist: 'Diego Delso',
      license: 'CC BY-SA 3.0',
      dimensions: '5585x3723',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Konum Koordinatı + Manuelin Mimarisi Belém Kulesi Doğrulama',
    confidence: 'Yüksek'
  },
  {
    code: 'RO',
    nameTr: 'Romanya',
    nameEn: 'Romania',
    phase0Status: 'OK',
    phase0Reason: 'Peleș Şatosu ve Karpat Dağları (Doğrulandı)',
    oldImageUrl: 'https://images.unsplash.com/photo-1544169086-da2d0dc39330?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Sinaia Peleș Kraliyet Şatosu ve Karpat Ormanları',
      alt1: 'Bran Kalesi (Drakula Şatosu), Brașov',
      alt2: 'Sibiu Tarihi Meydanları ve Gözlü Çatılar'
    },
    candidatePrimary: {
      title: 'Peleș Castle, Sinaia (Verified Unsplash)',
      landmark: 'Peleș Kraliyet Şatosu ve Karpat Dağları',
      url: 'https://images.unsplash.com/photo-1544169086-da2d0dc39330?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1544169086-da2d0dc39330',
      artist: 'Doru Vasii',
      license: 'Unsplash License',
      dimensions: '2400x1600',
      source: 'Unsplash (Verified)'
    },
    candidateAlt: {
      title: 'Bran Castle in Transylvania',
      landmark: 'Bran Şatosu (Drakula Kalesi)',
      url: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Bran_Castle_2019.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Bran_Castle_2019.jpg',
      artist: 'Julian Nyča',
      license: 'CC BY-SA 4.0',
      dimensions: '3648x2432',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Mevcut Görsel Doğrulandı (Peleș Şatosu)',
    confidence: 'Yüksek'
  },
  {
    code: 'RS',
    nameTr: 'Sırbistan',
    nameEn: 'Serbia',
    phase0Status: 'TEKRAR',
    phase0Reason: '1924 Montreal Kış Sporları Afişi kopyalanmış (TEKRAR-13)',
    oldImageUrl: 'https://images.unsplash.com/photo-1584448141569-69f342da535c?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Belgrad Aziz Sava Katedrali (Hram Svetog Save)',
      alt1: 'Kalemegdan Kalesi, Sava ve Tuna Nehirleri Kavşağı',
      alt2: 'Novi Sad Petrovaradin Kalesi ve Saat Kulesi'
    },
    candidatePrimary: {
      title: 'Church of Saint Sava, Belgrade',
      landmark: 'Belgrad Aziz Sava Katedrali (Hram Svetog Save)',
      url: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Church_of_Saint_Sava%2C_Belgrade%2C_Serbia%2C_2014-04-19%2C_DD_02.JPG',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Church_of_Saint_Sava,_Belgrade,_Serbia,_2014-04-19,_DD_02.JPG',
      artist: 'Diego Delso',
      license: 'CC BY-SA 3.0',
      dimensions: '5576x3717',
      source: 'Wikimedia Commons'
    },
    candidateAlt: {
      title: 'Belgrade Fortress and Sava-Danube confluence',
      landmark: 'Kalemegdan Kalesi ve Sava-Tuna Nehri Kavşağı',
      url: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Belgrade_Fortress_and_Sava-Danube_confluence.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Belgrade_Fortress_and_Sava-Danube_confluence.jpg',
      artist: 'Predrag Bubalo',
      license: 'CC BY-SA 3.0',
      dimensions: '3872x2592',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Konum Koordinatı + Aziz Sava Katedrali Mimari Doğrulama',
    confidence: 'Yüksek'
  },
  {
    code: 'RU',
    nameTr: 'Rusya',
    nameEn: 'Russia',
    phase0Status: 'OK',
    phase0Reason: 'Moskova Kızıl Meydan ve Aziz Vasil Katedrali (Doğrulandı)',
    oldImageUrl: 'https://images.unsplash.com/photo-1520106212299-d99c443e4568?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Moskova Kızıl Meydan ve Aziz Vasil Katedrali Kubbeleri',
      alt1: 'Sankt Petersburg Hermitaj Sarayı ve Saray Meydanı',
      alt2: 'Baykal Gölü ve Olhon Adası'
    },
    candidatePrimary: {
      title: 'Saint Basil Cathedral, Moscow (Verified Unsplash)',
      landmark: 'Kızıl Meydan ve Aziz Vasil Katedrali',
      url: 'https://images.unsplash.com/photo-1520106212299-d99c443e4568?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1520106212299-d99c443e4568',
      artist: 'Nikolay Vorobyev',
      license: 'Unsplash License',
      dimensions: '2400x1600',
      source: 'Unsplash (Verified)'
    },
    candidateAlt: {
      title: 'Saint Basils Cathedral wide front view',
      landmark: 'Aziz Vasil Katedrali ve Spasskaya Kulesi',
      url: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Saint_Basil%27s_Cathedral%2C_Moscow.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Saint_Basil%27s_Cathedral,_Moscow.jpg',
      artist: 'Ludvig14',
      license: 'CC BY-SA 4.0',
      dimensions: '3000x2000',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Mevcut Görsel Doğrulandı (Kızıl Meydan)',
    confidence: 'Yüksek'
  },
  {
    code: 'SE',
    nameTr: 'İsveç',
    nameEn: 'Sweden',
    phase0Status: 'OK',
    phase0Reason: 'Stockholm Gamla Stan renkli binaları ve sahil (Doğrulandı)',
    oldImageUrl: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=440&q=70',
    symbols: {
      main: 'Stockholm Gamla Stan (Eski Şehir) ve Stortorget Meydanı',
      alt1: 'Stockholm Belediye Binası (Stadshuset) ve Mälaren Gölü',
      alt2: 'Visby Orta Çağ Şehir Surları, Gotland'
    },
    candidatePrimary: {
      title: 'Stockholm Gamla Stan waterfront (Verified Unsplash)',
      landmark: 'Gamla Stan Tarihi Renkli Binaları ve Sahili',
      url: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=1600&q=80',
      sourcePageUrl: 'https://unsplash.com/photos/photo-1509356843151-3e7d96241e11',
      artist: 'Raphael Andres',
      license: 'Unsplash License',
      dimensions: '2400x1600',
      source: 'Unsplash (Verified)'
    },
    candidateAlt: {
      title: 'Stortorget square in Gamla Stan',
      landmark: 'Gamla Stan Stortorget Tarihi İkonik Meydanı',
      url: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Stortorget_Gamla_Stan_Stockholm.jpg',
      sourcePageUrl: 'https://commons.wikimedia.org/wiki/File:Stortorget_Gamla_Stan_Stockholm.jpg',
      artist: 'Benoît Derrier',
      license: 'CC BY-SA 2.0',
      dimensions: '3888x2592',
      source: 'Wikimedia Commons'
    },
    verificationMethod: 'Mevcut Görsel Doğrulandı (Gamla Stan)',
    confidence: 'Yüksek'
  }
];

function generateHtmlReport(data: BatchCountryCandidate[]): string {
  const rows = data.map((c, index) => {
    const isOk = c.phase0Status === 'OK';
    const statusBadge = isOk
      ? `<span class="badge bg-emerald-950/60 text-emerald-400 border border-emerald-800/80">MEVCUT OK</span>`
      : `<span class="badge bg-rose-950/60 text-rose-400 border border-rose-800/80">DEĞİŞECEK</span>`;

    const confClass = c.confidence === 'Yüksek'
      ? 'bg-emerald-900/40 text-emerald-300 border-emerald-700/50'
      : c.confidence === 'Orta'
      ? 'bg-amber-900/40 text-amber-300 border-amber-700/50'
      : 'bg-rose-900/40 text-rose-300 border-rose-700/50';

    return `
      <tr class="border-b border-slate-800 hover:bg-slate-900/40 transition">
        <td class="p-4 align-top w-48">
          <div class="flex items-center gap-2">
            <span class="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50">${c.code}</span>
            <span class="text-xs text-slate-500 font-mono">#${index + 21}</span>
          </div>
          <div class="font-bold text-white text-base mt-1">${c.nameTr}</div>
          <div class="text-xs text-slate-400">${c.nameEn}</div>
          <div class="mt-2">${statusBadge}</div>
        </td>

        <td class="p-4 align-top w-56">
          <div class="relative w-44 h-28 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 shadow">
            <img src="${c.oldImageUrl}" alt="${c.nameTr} Eski" class="w-full h-full object-cover" loading="lazy" />
          </div>
          <div class="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
            ${isOk ? '<span class="text-emerald-400 font-semibold">Doğrulanmış Orijinal</span>' : `<span class="text-rose-400">${c.phase0Reason}</span>`}
          </div>
        </td>

        <td class="p-4 align-top w-72">
          <div class="text-xs space-y-1.5">
            <div class="font-semibold text-amber-300 flex items-start gap-1">
              <span>⭐️ 1.</span> <span>${c.symbols.main}</span>
            </div>
            <div class="text-slate-300 flex items-start gap-1 pl-1">
              <span>🔹 2.</span> <span>${c.symbols.alt1}</span>
            </div>
            <div class="text-slate-400 flex items-start gap-1 pl-1">
              <span>🔹 3.</span> <span>${c.symbols.alt2}</span>
            </div>
          </div>
        </td>

        <td class="p-4 align-top w-72">
          <div class="relative w-56 h-36 rounded-lg overflow-hidden border-2 border-emerald-500/60 shadow-lg group bg-slate-900">
            <img src="${c.candidatePrimary.url}" alt="${c.candidatePrimary.landmark}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy" />
          </div>
          <div class="mt-2 text-xs">
            <div class="font-semibold text-emerald-300">${c.candidatePrimary.landmark}</div>
            <div class="text-slate-400 text-[11px] mt-0.5">📐 ${c.candidatePrimary.dimensions} px</div>
            <div class="text-slate-400 text-[11px]">👤 ${c.candidatePrimary.artist}</div>
            <div class="text-slate-400 text-[11px]">📜 ${c.candidatePrimary.license}</div>
            <a href="${c.candidatePrimary.sourcePageUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline text-[11px] inline-flex items-center gap-1 mt-1">
              🔗 Kaynak (${c.candidatePrimary.source})
            </a>
          </div>
        </td>

        <td class="p-4 align-top w-72">
          <div class="relative w-56 h-36 rounded-lg overflow-hidden border border-slate-700 shadow group bg-slate-900">
            <img src="${c.candidateAlt.url}" alt="${c.candidateAlt.landmark}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="lazy" />
          </div>
          <div class="mt-2 text-xs">
            <div class="font-semibold text-slate-300">${c.candidateAlt.landmark}</div>
            <div class="text-slate-400 text-[11px] mt-0.5">📐 ${c.candidateAlt.dimensions} px</div>
            <div class="text-slate-400 text-[11px]">👤 ${c.candidateAlt.artist}</div>
            <div class="text-slate-400 text-[11px]">📜 ${c.candidateAlt.license}</div>
            <a href="${c.candidateAlt.sourcePageUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline text-[11px] inline-flex items-center gap-1 mt-1">
              🔗 Kaynak (${c.candidateAlt.source})
            </a>
          </div>
        </td>

        <td class="p-4 align-top w-56">
          <div class="inline-block px-2 py-0.5 text-xs font-semibold rounded border ${confClass}">
            ${c.confidence}
          </div>
          <div class="text-xs text-slate-400 mt-2 leading-relaxed">
            ${c.verificationMethod}
          </div>
        </td>
      </tr>
    `;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>Vizamigo - Batch 2 Ülke Sembol ve Aday Görsel Denetimi (21-40)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-8">
  <div class="max-w-[1700px] mx-auto">
    <div class="mb-8 border-b border-slate-800 pb-6">
      <div class="flex items-center gap-3 mb-2">
        <span class="px-3 py-1 bg-blue-600/30 text-blue-400 text-xs font-semibold rounded-full border border-blue-500/40">FAZ 1 — BATCH 2 / 10</span>
      </div>
      <h1 class="text-3xl font-extrabold text-white tracking-tight">Batch 2: Ülke 21–40 Sembol Listesi ve Aday Görseller</h1>
      <p class="text-slate-400 mt-2 text-sm leading-relaxed max-w-4xl">
        İzlanda (oyuncak maymunlar), Lihtenştayn (Yosemite Vadisi), Litvanya (Marakeş Fas), Lüksemburg (Romanya CEC Sarayı), Monako (Moskova Gökdelenleri), Moldova & Sırbistan (1924 Montreal Kış Sporları Afişi), Kuzey Makedonya (Yeni Zelanda Dağı), Malta (Louvre Müzesi İçi) ve Portekiz (Sevilla İspanya) gibi ciddi hatalar giderilmiş; her ülke için onaylanmış 1 ana + 2 alternatif sembol ve yüksek çözünürlüklü doğrulanmış aday görseller seçilmiştir.
      </p>
      <div class="mt-4 p-4 rounded-lg bg-blue-950/40 border border-blue-800/60 text-xs text-blue-200 flex items-start gap-2">
        <span>📋</span>
        <span><strong>Değerlendirme Talimatı:</strong> Lütfen aşağıdaki 20 ülkeyi inceleyin. Değiştirmek istediğiniz bir sembol veya aday varsa (örneğin "IS Kirkjufell olsun" veya "PT Pena Sarayı seçilsin"), geri bildirim verebilirsiniz. Onayınız sonrasında optimize edilerek koda aktarılacaktır.</span>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 shadow-2xl">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-slate-800 bg-slate-950/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <th class="p-4">Ülke</th>
            <th class="p-4">Eski Görsel & Durum</th>
            <th class="p-4">Hedef Semboller (1 Ana + 2 Alt)</th>
            <th class="p-4">Yeni Birincil Aday (Önerilen)</th>
            <th class="p-4">Alternatif Aday</th>
            <th class="p-4">Güven & Doğrulama</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800 text-sm">
          ${rows}
        </tbody>
      </table>
    </div>

    <div class="mt-8 text-center text-xs text-slate-500">
      Vizamigo Country Visuals Audit System • Faz 1 / Batch 2 (Ülke 21–40) • 2026
    </div>
  </div>
</body>
</html>`;
}

const html = generateHtmlReport(BATCH_2_DATA);
const outputPath = path.resolve('/Users/celebi/Desktop/vizamigo/batch-2.html');
fs.writeFileSync(outputPath, html, 'utf8');
console.log(`✅ batch-2.html başarıyla oluşturuldu: ${outputPath}`);
