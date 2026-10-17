import fs from 'fs';
import path from 'path';

export const BATCH_3_DATA = [
  {
    "code": "SI",
    "nameTr": "Slovenya",
    "nameEn": "Slovenia",
    "phase0Status": "TEKRAR",
    "phase0Reason": "Jenerik turkuaz deniz dalgası kopyalanmış (TEKRAR-01)",
    "oldImageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Bled Gölü Adası, Meryem Ana Kilisesi ve Jülyen Alpleri",
      "alt1": "Predjama Mağara Şatosu (Predjamski grad)",
      "alt2": "Ljubljana Kalesi ve Ljubljanica Nehri Üçlü Köprüsü"
    },
    "primaryQuery": "Lake Bled church island Slovenia",
    "altQuery": "Predjama Castle Slovenia",
    "candidatePrimary": {
      "title": "Bled Island & Bled Castle (1).jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Bled_Island_%26_Bled_Castle_%281%29.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Bled_Island_%26_Bled_Castle_(1).jpg",
      "artist": "Krzysztof Golik",
      "license": "CC BY-SA 4.0",
      "dimensions": "8890x2820",
      "source": "Wikimedia Commons",
      "landmark": "Bled Gölü Adası, Meryem Ana Kilisesi ve Jülyen Alpleri"
    },
    "candidateAlt": {
      "title": "Predjama Castle entrance COA.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/8/8b/Predjama_Castle_entrance_COA.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Predjama_Castle_entrance_COA.jpg",
      "artist": "Yerpo",
      "license": "CC BY-SA 3.0",
      "dimensions": "2543x3855",
      "source": "Wikimedia Commons",
      "landmark": "Predjama Mağara Şatosu (Predjamski grad)"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "SK",
    "nameTr": "Slovakya",
    "nameEn": "Slovakia",
    "phase0Status": "ALAKASIZ",
    "phase0Reason": "Modern beyaz mutfak adası, tabureler ve saksı bitkisi",
    "oldImageUrl": "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Yüksek Tatralar (Vysoké Tatry) ve Štrbské Pleso Buzul Gölü",
      "alt1": "Bojnice Masal Şatosu (Bojnický zámok)",
      "alt2": "Bratislava Kalesi ve Tuna Nehri"
    },
    "primaryQuery": "Strbske Pleso High Tatras Slovakia",
    "altQuery": "Bojnice Castle Slovakia",
    "candidatePrimary": {
      "title": "High Tatras (Štrbské pleso)",
      "landmark": "Yüksek Tatralar ve Štrbské Pleso Buzul Gölü",
      "url": "https://upload.wikimedia.org/wikipedia/commons/3/3a/High_Tatras_%28%C5%A0trbsk%C3%A9_pleso%29.JPG",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:High_Tatras_(%C5%A0trbsk%C3%A9_pleso).JPG",
      "artist": "Templár SK",
      "license": "CC BY-SA 3.0",
      "dimensions": "3072x2048",
      "source": "Wikimedia Commons"
    },
    "candidateAlt": {
      "title": "Bojnice Castle exterior",
      "landmark": "Bojnice Masal Şatosu (Bojnický zámok)",
      "url": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Bojnice_%28Bojnitz%29_Castle_%28by_Pudelek%29.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Bojnice_(Bojnitz)_Castle_(by_Pudelek).jpg",
      "artist": "Pudelek (Marcin Szala)",
      "license": "CC BY-SA 3.0",
      "dimensions": "3633x2838",
      "source": "Wikimedia Commons"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "SM",
    "nameTr": "San Marino",
    "nameEn": "San Marino",
    "phase0Status": "OK",
    "phase0Reason": "Titano Dağı üzerindeki Guaita Kalesi kulesi (Doğrulandı)",
    "oldImageUrl": "https://images.unsplash.com/photo-1787520782344-96aa827f53ad?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Titano Dağı Guaita Kalesi ve Adriyatik Panoraması",
      "alt1": "Cesta Kalesi (İkinci Kule), San Marino",
      "alt2": "Palazzo Pubblico ve Piazza della Libertà"
    },
    "primaryQuery": "Guaita Fortress San Marino Monte Titano",
    "altQuery": "Cesta tower San Marino",
    "candidatePrimary": {
      "title": "Fortress of Guaita 2013-09-19.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Fortress_of_Guaita_2013-09-19.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Fortress_of_Guaita_2013-09-19.jpg",
      "artist": "Max_Ryazanov",
      "license": "CC BY-SA 3.0",
      "dimensions": "3348x1842",
      "source": "Wikimedia Commons",
      "landmark": "Titano Dağı Guaita Kalesi ve Adriyatik Panoraması"
    },
    "candidateAlt": {
      "title": "Second Tower in San Marino and Paragliding.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Second_Tower_in_San_Marino_and_Paragliding.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Second_Tower_in_San_Marino_and_Paragliding.jpg",
      "artist": "Commonists",
      "license": "CC BY-SA 4.0",
      "dimensions": "7174x6222",
      "source": "Wikimedia Commons",
      "landmark": "Cesta Kalesi (İkinci Kule), San Marino"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "UA",
    "nameTr": "Ukrayna",
    "nameEn": "Ukraine",
    "phase0Status": "OK",
    "phase0Reason": "Kiev Peçersk Lavrası Çan Kulesi ve silüeti (Doğrulandı)",
    "oldImageUrl": "https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Aziz Sofya Katedrali ve Kiev Peçersk Lavrası Manastırı",
      "alt1": "Lviv Tarihi Pazar Meydanı (Rynok Square)",
      "alt2": "Kamianets-Podilskyi Tarihi Kalesi ve Kanyonu"
    },
    "primaryQuery": "Saint Sophia Cathedral Kyiv Ukraine",
    "altQuery": "Pechersk Lavra Kyiv Ukraine bell tower",
    "candidatePrimary": {
      "title": "2016R1535 - Київ.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/0/05/2016R1535_-_%D0%9A%D0%B8%D1%97%D0%B2.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:2016R1535_-_%D0%9A%D0%B8%D1%97%D0%B2.jpg",
      "artist": "Мирослав Видрак",
      "license": "CC BY-SA 4.0",
      "dimensions": "4767x7264",
      "source": "Wikimedia Commons",
      "landmark": "Aziz Sofya Katedrali ve Kiev Peçersk Lavrası Manastırı"
    },
    "candidateAlt": {
      "title": "Belfry of nearby caves 2018 G1.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Belfry_of_nearby_caves_2018_G1.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Belfry_of_nearby_caves_2018_G1.jpg",
      "artist": "George Chernilevsky",
      "license": "Public domain",
      "dimensions": "3600x5700",
      "source": "Wikimedia Commons",
      "landmark": "Lviv Tarihi Pazar Meydanı (Rynok Square)"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "VA",
    "nameTr": "Vatikan",
    "nameEn": "Vatican City",
    "phase0Status": "YANLIŞ_YER",
    "phase0Reason": "Pisa Kulesi, İtalya (Vatikan değil)",
    "oldImageUrl": "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Aziz Petrus Bazilikası ve Aziz Petrus Meydanı (Piazza San Pietro)",
      "alt1": "Vatikan Müzeleri ve Sistina Şapeli Kubbesi",
      "alt2": "Aziz Petrus Bazilikası Kubbesinden Roma ve Meydan Panoraması"
    },
    "primaryQuery": "Saint Peter Basilica Vatican Rome square",
    "altQuery": "Piazza San Pietro Vatican Rome",
    "candidatePrimary": {
      "title": "Saint Peter's Square from the dome.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/5/56/Saint_Peter%27s_Square_from_the_dome.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Saint_Peter%27s_Square_from_the_dome.jpg",
      "artist": "valyag",
      "license": "CC BY-SA 3.0",
      "dimensions": "2048x1536",
      "source": "Wikimedia Commons",
      "landmark": "Aziz Petrus Bazilikası ve Aziz Petrus Meydanı (Piazza San Pietro)"
    },
    "candidateAlt": {
      "title": "St Peter's Square, Vatican City - April 2007.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/d/d6/St_Peter%27s_Square%2C_Vatican_City_-_April_2007.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:St_Peter%27s_Square,_Vatican_City_-_April_2007.jpg",
      "artist": "Diliff",
      "license": "CC BY-SA 3.0",
      "dimensions": "4200x2359",
      "source": "Wikimedia Commons",
      "landmark": "Vatikan Müzeleri ve Sistina Şapeli Kubbesi"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "XK",
    "nameTr": "Kosova",
    "nameEn": "Kosovo",
    "phase0Status": "DÜŞÜK_KALİTE",
    "phase0Reason": "Soluk, karanlık varoş yerleşimi ve boş futbol sahası",
    "oldImageUrl": "https://images.unsplash.com/photo-1707391566433-30cb5c06982a?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Prizren Tarihi Taş Köprüsü ve Sinan Paşa Camii Silüeti",
      "alt1": "Prizren Kalesi (Kalaja) ve Bistrica Nehri Vadisi",
      "alt2": "Rugova Kanyonu ve İpek (Peja) Dağları"
    },
    "primaryQuery": "Prizren Stone Bridge Sinan Pasha Mosque Kosovo",
    "altQuery": "Prizren Fortress view Kosovo",
    "candidatePrimary": {
      "title": "Prizren, Stone Bridge, Sinan Pasha Mosque and City Castle.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/f/f2/Prizren%2C_Stone_Bridge%2C_Sinan_Pasha_Mosque_and_City_Castle.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Prizren,_Stone_Bridge,_Sinan_Pasha_Mosque_and_City_Castle.jpg",
      "artist": "Bujar I Gashi",
      "license": "CC BY-SA 3.0",
      "dimensions": "2045x1352",
      "source": "Wikimedia Commons",
      "landmark": "Prizren Tarihi Taş Köprüsü ve Sinan Paşa Camii Silüeti"
    },
    "candidateAlt": {
      "title": "Prizren Fortress 5 February 2023.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/e/eb/Prizren_Fortress_5_February_2023.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Prizren_Fortress_5_February_2023.jpg",
      "artist": "Sharon Hahn Darlin",
      "license": "CC BY 2.0",
      "dimensions": "1674x1015",
      "source": "Wikimedia Commons",
      "landmark": "Prizren Kalesi (Kalaja) ve Bistrica Nehri Vadisi"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "AF",
    "nameTr": "Afganistan",
    "nameEn": "Afghanistan",
    "phase0Status": "YANLIŞ_YER",
    "phase0Reason": "Maldivler su villaları (Dağlık Afganistan için tamamen yanlış)",
    "oldImageUrl": "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Band-e Amir Turkuaz Traverten Gölleri Milli Parkı (Hindukuş)",
      "alt1": "Mezar-ı Şerif Mavi Camii (Hazreti Ali Türbesi)",
      "alt2": "Cam Minaresi (UNESCO), Gur Vilayeti"
    },
    "primaryQuery": "Band-e Amir national park Afghanistan lake",
    "altQuery": "Blue Mosque Mazar-i-Sharif Afghanistan",
    "candidatePrimary": {
      "title": "Band-e-Amir National Park, Afghanistan.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/4/42/Band-e-Amir_National_Park%2C_Afghanistan.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Band-e-Amir_National_Park,_Afghanistan.jpg",
      "artist": "NASA image created by Jesse Allen, using Landsat data provided by the United States Geological Survey.",
      "license": "Public domain",
      "dimensions": "3500x3500",
      "source": "Wikimedia Commons",
      "landmark": "Band-e Amir Turkuaz Traverten Gölleri Milli Parkı (Hindukuş)"
    },
    "candidateAlt": {
      "title": "Blue Mosque Courtyard Dusk Wikimedia Commons.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/7/77/Blue_Mosque_Courtyard_Dusk_Wikimedia_Commons.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Blue_Mosque_Courtyard_Dusk_Wikimedia_Commons.jpg",
      "artist": "Benh LIEU SONG (Flickr)",
      "license": "CC BY-SA 3.0",
      "dimensions": "7937x5580",
      "source": "Wikimedia Commons",
      "landmark": "Mezar-ı Şerif Mavi Camii (Hazreti Ali Türbesi)"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "AM",
    "nameTr": "Ermenistan",
    "nameEn": "Armenia",
    "phase0Status": "OK",
    "phase0Reason": "Tarihi taş manastır mimarisi (Doğrulandı)",
    "oldImageUrl": "https://images.unsplash.com/photo-1610439649990-c2bb81cb9b89?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Khor Virap Manastırı ve Ağrı Dağı (Ararat) Zirvesi",
      "alt1": "Tatev Manastırı ve Vorotan Nehri Kanyonu",
      "alt2": "Sevan Gölü ve Sevanavank Taş Manastırı"
    },
    "primaryQuery": "Khor Virap Ararat Armenia monastery",
    "altQuery": "Tatev Monastery Armenia Vorotan",
    "candidatePrimary": {
      "title": "Khor Virap Monastery and Mount Ararat, Armenia.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/a/a8/Khor_Virap_Monastery_and_Mount_Ararat%2C_Armenia.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Khor_Virap_Monastery_and_Mount_Ararat,_Armenia.jpg",
      "artist": "Andrew Behesnilian (MrAndrew47)",
      "license": "CC BY-SA 3.0",
      "dimensions": "3504x2334",
      "source": "Wikimedia Commons",
      "landmark": "Khor Virap Manastırı ve Ağrı Dağı (Ararat) Zirvesi"
    },
    "candidateAlt": {
      "title": "Monasterio de Tatev, Armenia, 2016-10-01, DD 86-88 HDR.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/d/db/Monasterio_de_Tatev%2C_Armenia%2C_2016-10-01%2C_DD_86-88_HDR.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Monasterio_de_Tatev,_Armenia,_2016-10-01,_DD_86-88_HDR.jpg",
      "artist": "Diego Delso",
      "license": "CC BY-SA 4.0",
      "dimensions": "8301x4417",
      "source": "Wikimedia Commons",
      "landmark": "Tatev Manastırı ve Vorotan Nehri Kanyonu"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "AZ",
    "nameTr": "Azerbaycan",
    "nameEn": "Azerbaijan",
    "phase0Status": "ALAKASIZ",
    "phase0Reason": "Kafeterya / restoran içi boş masa ve sandalyeler",
    "oldImageUrl": "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Bakü Alev Kuleleri (Flame Towers) ve Hazar Denizi Kordonu",
      "alt1": "Bakü İçerişehir (İcherisheher) ve Tarihi Kız Kalesi (Qız Qalası)",
      "alt2": "Haydar Aliyev Kültür Merkezi (Zaha Hadid Mimarisi)"
    },
    "primaryQuery": "Baku Flame Towers Azerbaijan Caspian",
    "altQuery": "Heydar Aliyev Center Baku Azerbaijan",
    "candidatePrimary": {
      "title": "20160604 Azerbaijan 6859 Pano Baku sRGB (31274007253).jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/2/24/20160604_Azerbaijan_6859_Pano_Baku_sRGB_%2831274007253%29.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:20160604_Azerbaijan_6859_Pano_Baku_sRGB_(31274007253).jpg",
      "artist": "Dan Lundberg",
      "license": "CC BY-SA 2.0",
      "dimensions": "9285x3077",
      "source": "Wikimedia Commons",
      "landmark": "Bakü Alev Kuleleri (Flame Towers) ve Hazar Denizi Kordonu"
    },
    "candidateAlt": {
      "title": "Maiden Tower and Baku Old City",
      "landmark": "Tarihi Kız Kalesi (Qız Qalası) ve İçerişehir",
      "url": "https://upload.wikimedia.org/wikipedia/commons/6/61/Baku%2C_Azerbaiy%C3%A1n%2C_2016-09-26%2C_DD_211.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Baku,_Azerbaiy%C3%A1n,_2016-09-26,_DD_211.jpg",
      "artist": "Diego Delso",
      "license": "CC BY-SA 4.0",
      "dimensions": "6755x4505",
      "source": "Wikimedia Commons"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "BD",
    "nameTr": "Bangladeş",
    "nameEn": "Bangladesh",
    "phase0Status": "ALAKASIZ",
    "phase0Reason": "Vintage Olympia daktilo ve kâğıt fotoğrafı",
    "oldImageUrl": "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Lalbagh Kalesi ve Şaista Han Türbesi, Eski Dakka",
      "alt1": "Ahsan Manzil (Pembe Saray) ve Buriganga Nehri",
      "alt2": "Sundarbans Mangrov Ormanı ve Ganj Deltası (UNESCO)"
    },
    "primaryQuery": "Lalbagh Fort Dhaka Bangladesh",
    "altQuery": "Ahsan Manzil Dhaka Bangladesh",
    "candidatePrimary": {
      "title": "Lalbagh Kella (Lalbagh Fort) Dhaka Bangladesh 2011 15.JPG",
      "url": "https://upload.wikimedia.org/wikipedia/commons/d/d6/Lalbagh_Kella_%28Lalbagh_Fort%29_Dhaka_Bangladesh_2011_15.JPG",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Lalbagh_Kella_(Lalbagh_Fort)_Dhaka_Bangladesh_2011_15.JPG",
      "artist": "Shmunmun",
      "license": "CC BY-SA 3.0",
      "dimensions": "3648x2241",
      "source": "Wikimedia Commons",
      "landmark": "Lalbagh Kalesi ve Şaista Han Türbesi, Eski Dakka"
    },
    "candidateAlt": {
      "title": "Ahsan Manzil-Front View.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/1/16/Ahsan_Manzil-Front_View.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Ahsan_Manzil-Front_View.jpg",
      "artist": "Mahbub Hossain Shaheed (mahosha)",
      "license": "CC BY-SA 4.0",
      "dimensions": "2512x1678",
      "source": "Wikimedia Commons",
      "landmark": "Ahsan Manzil (Pembe Saray) ve Buriganga Nehri"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "BN",
    "nameTr": "Brunei",
    "nameEn": "Brunei",
    "phase0Status": "TEKRAR",
    "phase0Reason": "Ağaç dalında elmalar kopyalanmış (TEKRAR-10)",
    "oldImageUrl": "https://images.unsplash.com/photo-1578895210405-907db486c111?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Sultan Ömer Ali Seyfeddin Camii ve Altın Kubbesi, Bandar Seri Begawan",
      "alt1": "Kampong Ayer Tarihi Kazıklı Su Köyü",
      "alt2": "Cami-i Asr Hassanil Bolkiah Camii"
    },
    "primaryQuery": "Sultan Omar Ali Saifuddien Mosque Brunei",
    "altQuery": "Kampong Ayer Brunei water village",
    "candidatePrimary": {
      "title": "Sultan Omar Ali Saifuddin Mosque 02.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/5/59/Sultan_Omar_Ali_Saifuddin_Mosque_02.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Sultan_Omar_Ali_Saifuddin_Mosque_02.jpg",
      "artist": "sam garza from Los Angeles, USA",
      "license": "CC BY 2.0",
      "dimensions": "3933x2622",
      "source": "Wikimedia Commons",
      "landmark": "Sultan Ömer Ali Seyfeddin Camii ve Altın Kubbesi, Bandar Seri Begawan"
    },
    "candidateAlt": {
      "title": "Kampong Ayer, Water Village, Mosque. Brunei, Southeast Asia.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Kampong_Ayer%2C_Water_Village%2C_Mosque._Brunei%2C_Southeast_Asia.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Kampong_Ayer,_Water_Village,_Mosque._Brunei,_Southeast_Asia.jpg",
      "artist": "Mstyslav Chernov",
      "license": "CC BY-SA 3.0",
      "dimensions": "4000x2662",
      "source": "Wikimedia Commons",
      "landmark": "Kampong Ayer Tarihi Kazıklı Su Köyü"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "BT",
    "nameTr": "Butan",
    "nameEn": "Bhutan",
    "phase0Status": "YANLIŞ_YER",
    "phase0Reason": "Horseshoe Bend, Arizona ABD (Himalayalar değil)",
    "oldImageUrl": "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Paro Taktsang (Kaplan Yuvası) Uçurum Manastırı",
      "alt1": "Punakha Dzong Kalesi ve Mo Chhu Nehri Kavşağı",
      "alt2": "Thimphu Buddha Dordenma Dev Heykeli"
    },
    "primaryQuery": "Paro Taktsang Tigers Nest Bhutan monastery",
    "altQuery": "Punakha Dzong Bhutan fortress",
    "candidatePrimary": {
      "title": "Bhutan-Paro-136-Taktshang-Tigernest-gje.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/4/46/Bhutan-Paro-136-Taktshang-Tigernest-gje.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Bhutan-Paro-136-Taktshang-Tigernest-gje.jpg",
      "artist": "Gerd Eichmann",
      "license": "CC BY-SA 4.0",
      "dimensions": "5184x3456",
      "source": "Wikimedia Commons",
      "landmark": "Paro Taktsang (Kaplan Yuvası) Uçurum Manastırı"
    },
    "candidateAlt": {
      "title": "Punakha Dzong, Bhutan 02.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Punakha_Dzong%2C_Bhutan_02.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Punakha_Dzong,_Bhutan_02.jpg",
      "artist": "Bernard Gagnon",
      "license": "CC BY-SA 4.0",
      "dimensions": "3488x1759",
      "source": "Wikimedia Commons",
      "landmark": "Punakha Dzong Kalesi ve Mo Chhu Nehri Kavşağı"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "CN",
    "nameTr": "Çin",
    "nameEn": "China",
    "phase0Status": "OK",
    "phase0Reason": "Çin Seddi ve sonbahar tepeleri (Doğrulandı)",
    "oldImageUrl": "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Çin Seddi (Great Wall of China), Mutianyu/Badaling",
      "alt1": "Pekin Yasak Şehir (Forbidden City) ve İmparatorluk Sarayı",
      "alt2": "Şanghay Bund Kordonu ve Pudong Gökdelen Silüeti"
    },
    "primaryQuery": "Great Wall of China Mutianyu",
    "altQuery": "Forbidden City Beijing China palace",
    "candidatePrimary": {
      "title": "Great Wall of China July 2006.JPG",
      "url": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Great_Wall_of_China_July_2006.JPG",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Great_Wall_of_China_July_2006.JPG",
      "artist": "Velatrix",
      "license": "CC0",
      "dimensions": "2288x1712",
      "source": "Wikimedia Commons",
      "landmark": "Çin Seddi (Great Wall of China), Mutianyu/Badaling"
    },
    "candidateAlt": {
      "title": "Sunset of the Forbidden City 2006.JPG",
      "url": "https://upload.wikimedia.org/wikipedia/commons/0/00/Sunset_of_the_Forbidden_City_2006.JPG",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Sunset_of_the_Forbidden_City_2006.JPG",
      "artist": "User:kallgan",
      "license": "CC BY-SA 3.0",
      "dimensions": "2304x1728",
      "source": "Wikimedia Commons",
      "landmark": "Pekin Yasak Şehir (Forbidden City) ve İmparatorluk Sarayı"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "GE",
    "nameTr": "Gürcistan",
    "nameEn": "Georgia",
    "phase0Status": "ALAKASIZ",
    "phase0Reason": "Vinçlerin çalıştığı inşaat şantiyesi (Gergeti Kilisesi değil)",
    "oldImageUrl": "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Gergeti Trinity (Kutsal Üçlü) Kilisesi ve Kazbek Dağı",
      "alt1": "Tiflis Narikala Kalesi ve Eski Şehir Evleri",
      "alt2": "Svaneti Orta Çağ Taş Savunma Kuleleri, Mestia (UNESCO)"
    },
    "primaryQuery": "Gergeti Trinity Church Kazbegi Georgia mountain",
    "altQuery": "Narikala fortress Tbilisi Georgia",
    "candidatePrimary": {
      "title": "Gergeti Trinity Church - Outside Kazbegi - Georgia - 01 (17953321484).jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/2/20/Gergeti_Trinity_Church_-_Outside_Kazbegi_-_Georgia_-_01_%2817953321484%29.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Gergeti_Trinity_Church_-_Outside_Kazbegi_-_Georgia_-_01_(17953321484).jpg",
      "artist": "Adam Jones from Kelowna, BC, Canada",
      "license": "CC BY-SA 2.0",
      "dimensions": "3648x2736",
      "source": "Wikimedia Commons",
      "landmark": "Gergeti Trinity (Kutsal Üçlü) Kilisesi ve Kazbek Dağı"
    },
    "candidateAlt": {
      "title": "Narikala fortress, Tbilisi, Georgia.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/0/02/Narikala_fortress%2C_Tbilisi%2C_Georgia.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Narikala_fortress,_Tbilisi,_Georgia.jpg",
      "artist": "This work is created by George Melashvili. You can redistribute it or modify it under the terms of the terms of Cc-by-sa-3.0 (See below)",
      "license": "CC BY-SA 3.0",
      "dimensions": "4271x2846",
      "source": "Wikimedia Commons",
      "landmark": "Tiflis Narikala Kalesi ve Eski Şehir Evleri"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "HK",
    "nameTr": "Çin Hong Kong ÖİB",
    "nameEn": "Hong Kong SAR China",
    "phase0Status": "TEKRAR",
    "phase0Reason": "Bulutlu jenerik dağ zirveleri kopyalanmış (TEKRAR-14)",
    "oldImageUrl": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Victoria Limanı Silüeti, Victoria Peak Manzarası ve Gökdelenler",
      "alt1": "Star Ferry Vapuru ve Tsim Sha Tsui Kordonu",
      "alt2": "Lantau Adası Tian Tan Büyük Buda Heykeli"
    },
    "primaryQuery": "Victoria Harbour Hong Kong skyline Victoria Peak",
    "altQuery": "Tian Tan Buddha Lantau Island Hong Kong",
    "candidatePrimary": {
      "title": "Hong Kong Skyline - Dec 2007.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Hong_Kong_Skyline_-_Dec_2007.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Hong_Kong_Skyline_-_Dec_2007.jpg",
      "artist": "Diliff",
      "license": "CC BY 3.0",
      "dimensions": "4200x1674",
      "source": "Wikimedia Commons",
      "landmark": "Victoria Limanı Silüeti, Victoria Peak Manzarası ve Gökdelenler"
    },
    "candidateAlt": {
      "title": "Tian Tan Buddha by Beria.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/1/13/Tian_Tan_Buddha_by_Beria.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Tian_Tan_Buddha_by_Beria.jpg",
      "artist": "Béria Lima de Rodríguez",
      "license": "CC BY-SA 3.0",
      "dimensions": "3000x1993",
      "source": "Wikimedia Commons",
      "landmark": "Star Ferry Vapuru ve Tsim Sha Tsui Kordonu"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "ID",
    "nameTr": "Endonezya",
    "nameEn": "Indonesia",
    "phase0Status": "OK",
    "phase0Reason": "Bali Ulun Danu Beratan Su Tapınağı (Doğrulandı)",
    "oldImageUrl": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Bali Pura Ulun Danu Bratan Su Tapınağı ve Göl Manzarası",
      "alt1": "Borobudur Budist Tapınağı ve Stupaları, Cava (UNESCO)",
      "alt2": "Nusa Penida Kelingking Plajı (T-Rex Uçurumu)"
    },
    "primaryQuery": "Pura Ulun Danu Bratan Bali temple",
    "altQuery": "Borobudur temple Java Indonesia stupa",
    "candidatePrimary": {
      "title": "Pura Ulun Danu Bratan 3.JPG",
      "url": "https://upload.wikimedia.org/wikipedia/commons/5/55/Pura_Ulun_Danu_Bratan_3.JPG",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Pura_Ulun_Danu_Bratan_3.JPG",
      "artist": "Manuae",
      "license": "CC BY-SA 3.0",
      "dimensions": "4000x3000",
      "source": "Wikimedia Commons",
      "landmark": "Bali Pura Ulun Danu Bratan Su Tapınağı ve Göl Manzarası"
    },
    "candidateAlt": {
      "title": "Borobudur temple panorama.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/3/31/Borobudur_temple_panorama.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Borobudur_temple_panorama.jpg",
      "artist": "Pandu Adnyana",
      "license": "CC BY 2.0",
      "dimensions": "1425x573",
      "source": "Wikimedia Commons",
      "landmark": "Borobudur Budist Tapınağı ve Stupaları, Cava (UNESCO)"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "IN",
    "nameTr": "Hindistan",
    "nameEn": "India",
    "phase0Status": "OK",
    "phase0Reason": "Tac Mahal, Agra (Doğrulandı)",
    "oldImageUrl": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Tac Mahal (Taj Mahal) Mermer Anıt Mezarı, Agra (UNESCO)",
      "alt1": "Varanasi Ganj Nehri Ghatları ve Aarti Seremonisi",
      "alt2": "Jaipur Hawa Mahal (Rüzgârlar Sarayı), Rajasthan"
    },
    "primaryQuery": "Taj Mahal Agra India front view",
    "altQuery": "Hawa Mahal Jaipur Rajasthan India",
    "candidatePrimary": {
      "title": "Taj Mahal in March 2004.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/c/c8/Taj_Mahal_in_March_2004.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Taj_Mahal_in_March_2004.jpg",
      "artist": "Dhirad, picture edited by J. A. Knudsen",
      "license": "CC BY-SA 3.0",
      "dimensions": "2040x1681",
      "source": "Wikimedia Commons",
      "landmark": "Tac Mahal (Taj Mahal) Mermer Anıt Mezarı, Agra (UNESCO)"
    },
    "candidateAlt": {
      "title": "Hawa Mahal 2011.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/3/37/Hawa_Mahal_2011.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Hawa_Mahal_2011.jpg",
      "artist": "Marcin Białek",
      "license": "CC BY-SA 4.0",
      "dimensions": "3756x3236",
      "source": "Wikimedia Commons",
      "landmark": "Varanasi Ganj Nehri Ghatları ve Aarti Seremonisi"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "JP",
    "nameTr": "Japonya",
    "nameEn": "Japan",
    "phase0Status": "OK",
    "phase0Reason": "Kyoto Yasaka Pagodası ve kimono giyimli kadınlar (Doğrulandı)",
    "oldImageUrl": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Fuji Dağı (Mount Fuji) ve Chureito Pagodası Manzarası",
      "alt1": "Kyoto Fushimi Inari Taisha Kırmızı Torii Kapıları",
      "alt2": "Tokyo Senso-ji Tapınağı ve Asakusa"
    },
    "primaryQuery": "Mount Fuji Chureito Pagoda Japan",
    "altQuery": "Fushimi Inari Torii Kyoto Japan",
    "candidatePrimary": {
      "title": "12-Chureito-pagoda-and-Mount-Fuji-Japan (29677439878).jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/7/71/12-Chureito-pagoda-and-Mount-Fuji-Japan_%2829677439878%29.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:12-Chureito-pagoda-and-Mount-Fuji-Japan_(29677439878).jpg",
      "artist": "Dang Son",
      "license": "CC0",
      "dimensions": "3000x1688",
      "source": "Wikimedia Commons",
      "landmark": "Fuji Dağı (Mount Fuji) ve Chureito Pagodası Manzarası"
    },
    "candidateAlt": {
      "title": "KyotoFushimiInariLarge.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/1/16/KyotoFushimiInariLarge.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:KyotoFushimiInariLarge.jpg",
      "artist": "Paul Vlaar",
      "license": "CC BY-SA 3.0",
      "dimensions": "3072x2048",
      "source": "Wikimedia Commons",
      "landmark": "Kyoto Fushimi Inari Taisha Kırmızı Torii Kapıları"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "KG",
    "nameTr": "Kırgızistan",
    "nameEn": "Kyrgyzstan",
    "phase0Status": "TEKRAR",
    "phase0Reason": "Guatemala Tikal Maya Piramidi kopyalanmış (TEKRAR-15)",
    "oldImageUrl": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Issık Göl (Issyk-Kul) Alpin Gölü ve Tanrı Dağları (Tian Shan)",
      "alt1": "Ala Archa Milli Parkı Kanyonu ve Buzul Zirveleri",
      "alt2": "Son-Köl (Song Kul) Yaylası, Kırgız Çadırları (Yurt) ve Atlar"
    },
    "primaryQuery": "Issyk-Kul lake Kyrgyzstan Tian Shan",
    "altQuery": "Ala Archa National Park Kyrgyzstan mountains",
    "candidatePrimary": {
      "title": "Issyk-Kul lake and Tian Shan snow peaks",
      "landmark": "Issık Göl (Issyk-Kul) ve Tanrı Dağları Zirveleri",
      "url": "https://upload.wikimedia.org/wikipedia/commons/8/88/Issyk-Kul%2C_Kyrgyzstan_%2843713946455%29.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Issyk-Kul,_Kyrgyzstan_(43713946455).jpg",
      "artist": "Ninara from Helsinki",
      "license": "CC BY 2.0",
      "dimensions": "3332x2100",
      "source": "Wikimedia Commons"
    },
    "candidateAlt": {
      "title": "Ala-Archa National Park Gorge",
      "landmark": "Ala Archa Milli Parkı Kanyonu ve Buzul Vadisi",
      "url": "https://upload.wikimedia.org/wikipedia/commons/5/58/Pix113._Ala-Archa_National_Park.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Pix113._Ala-Archa_National_Park.jpg",
      "artist": "Kukich",
      "license": "CC BY-SA 4.0",
      "dimensions": "4032x2268",
      "source": "Wikimedia Commons"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  },
  {
    "code": "KH",
    "nameTr": "Kamboçya",
    "nameEn": "Cambodia",
    "phase0Status": "OK",
    "phase0Reason": "Angkor Wat tapınak kompleksi ve yansıması (Doğrulandı)",
    "oldImageUrl": "https://images.unsplash.com/photo-1779419183221-df0bb6fdad1d?auto=format&fit=crop&w=440&q=70",
    "symbols": {
      "main": "Angkor Wat Tapınak Kompleksi ve Yansıma Havuzu (UNESCO)",
      "alt1": "Bayon Tapınağı Gülümseyen Taş Yüzleri, Angkor Thom",
      "alt2": "Ta Prohm Tapınağı (Dev Ağaç Kökleri İçinde)"
    },
    "primaryQuery": "Angkor Wat sunrise Cambodia reflection pool",
    "altQuery": "Bayon temple Angkor Thom faces Cambodia",
    "candidatePrimary": {
      "title": "Don't you love the magical colours of dawn? (50232013563).jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/5/58/Don%27t_you_love_the_magical_colours_of_dawn%3F_%2850232013563%29.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Don%27t_you_love_the_magical_colours_of_dawn%3F_(50232013563).jpg",
      "artist": "shankar s. from Poona (pune), India, India",
      "license": "CC BY 2.0",
      "dimensions": "2000x1500",
      "source": "Wikimedia Commons",
      "landmark": "Angkor Wat Tapınak Kompleksi ve Yansıma Havuzu (UNESCO)"
    },
    "candidateAlt": {
      "title": "Cambodia 08 - 136 - Angkor Thom - Bayon (3228100401).jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Cambodia_08_-_136_-_Angkor_Thom_-_Bayon_%283228100401%29.jpg",
      "sourcePageUrl": "https://commons.wikimedia.org/wiki/File:Cambodia_08_-_136_-_Angkor_Thom_-_Bayon_(3228100401).jpg",
      "artist": "McKay Savage from London, UK",
      "license": "CC BY 2.0",
      "dimensions": "3264x2448",
      "source": "Wikimedia Commons",
      "landmark": "Bayon Tapınağı Gülümseyen Taş Yüzleri, Angkor Thom"
    },
    "verificationMethod": "Resmi Wikimedia API + Koordinat ve Mimari/Doğa Doğrulama",
    "confidence": "Yüksek"
  }
];
