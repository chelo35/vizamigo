/**
 * Vizamigo - Ülke Coğrafi ve Seyahat Göstergeleri
 * Her ülkenin başkenti, büyük şehirleri, turistik bölgeleri, para birimi,
 * saat dilimi, telefon kodu ve priz tipi veritabanı.
 */

import { GEO_DATA } from './geoData';
import { getCountryName } from './passportData';
import { lText } from '../i18n';

export interface CountryGeographyData {
  countryCode: string;
  countryName: string;
  capital: string;
  majorCities: string[];
  touristRegions: string[];
  currencyCode: string;
  currencyName: string;
  currencySymbol: string;
  timeZone: string;
  callingCode: string;
  plugTypes: string;
}

interface CuratedGeographyItem {
  majorCities: { tr: string[]; en: string[]; de: string[] };
  touristRegions: { tr: string[]; en: string[]; de: string[] };
  currencyCode: string;
  currencyName: { tr: string; en: string; de: string };
  currencySymbol: string;
  timeZone: string;
  callingCode: string;
  plugTypes: string;
}

export const CURATED_GEOGRAPHY: Record<string, CuratedGeographyItem> = {
  // Türkiye
  TR: {
    majorCities: {
      tr: ['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa', 'Trabzon', 'Gaziantep'],
      en: ['Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bursa', 'Trabzon', 'Gaziantep'],
      de: ['Istanbul', 'Ankara', 'Izmir', 'Antalya', 'Bursa', 'Trabzon', 'Gaziantep']
    },
    touristRegions: {
      tr: ['Kapadokya Peri Bacaları', 'Ege & Akdeniz Sahilleri (Bodrum, Kaş, Fethiye)', 'Likya Yolu & Ölüdeniz', 'Pamukkale Travertenleri', 'Doğu Karadeniz Yaylaları'],
      en: ['Cappadocia Fairy Chimneys', 'Aegean & Turquoise Coast (Bodrum, Kas, Fethiye)', 'Lycian Way & Oludeniz', 'Pamukkale Thermal Pools', 'Black Sea Highlands'],
      de: ['Kappadokien Feenkamine', 'Türkische Riviera & Ägäis (Bodrum, Kas)', 'Lykischer Weg & Ölüdeniz', 'Pamukkale Kalksinterterrassen', 'Schwarzes Meer Hochebenen']
    },
    currencyCode: 'TRY',
    currencyName: { tr: 'Türk Lirası', en: 'Turkish Lira', de: 'Türkische Lira' },
    currencySymbol: '₺',
    timeZone: 'UTC+3 (TRT)',
    callingCode: '+90',
    plugTypes: 'C, F (230V, 50Hz)'
  },

  // Almanya
  DE: {
    majorCities: {
      tr: ['Berlin', 'Münih', 'Hamburg', 'Frankfurt', 'Köln', 'Stuttgart', 'Düsseldorf'],
      en: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne', 'Stuttgart', 'Dusseldorf'],
      de: ['Berlin', 'München', 'Hamburg', 'Frankfurt', 'Köln', 'Stuttgart', 'Düsseldorf']
    },
    touristRegions: {
      tr: ['Bavyera Alpleri & Neuschwanstein', 'Kara Ormanlar (Schwarzwald)', 'Romantik Yol Rotası', 'Ren & Mosel Nehir Vadileri', 'Baltık Denizi Kıyıları (Rügen)'],
      en: ['Bavarian Alps & Neuschwanstein Castle', 'The Black Forest (Schwarzwald)', 'Romantic Road Route', 'Rhine & Moselle River Valleys', 'Baltic Sea Coast (Rugen)'],
      de: ['Bayerische Alpen & Schloss Neuschwanstein', 'Schwarzwald', 'Romantische Straße', 'Rhein- & Moseltal', 'Ostseeküste (Rügen)']
    },
    currencyCode: 'EUR',
    currencyName: { tr: 'Euro', en: 'Euro', de: 'Euro' },
    currencySymbol: '€',
    timeZone: 'UTC+1 (Yazın UTC+2 CET)',
    callingCode: '+49',
    plugTypes: 'C, F (230V, 50Hz)'
  },

  // Amerika Birleşik Devletleri
  US: {
    majorCities: {
      tr: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco', 'Las Vegas', 'Washington D.C.'],
      en: ['New York City', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco', 'Las Vegas', 'Washington D.C.'],
      de: ['New York City', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco', 'Las Vegas', 'Washington D.C.']
    },
    touristRegions: {
      tr: ['Büyük Kanyon & Arizona Çölleri', 'Yellowstone Milli Parkı', 'Florida & Miami Sahilleri', 'California Highway 1 Kıyı Rotası', 'Hawaii Adaları & Maui'],
      en: ['Grand Canyon & Arizona Desert', 'Yellowstone National Park', 'Florida Beaches & The Keys', 'Pacific Coast Highway 1 (California)', 'Hawaiian Islands & Maui'],
      de: ['Grand Canyon & Arizona-Wüste', 'Yellowstone-Nationalpark', 'Florida & Key West', 'Pacific Coast Highway (Kalifornien)', 'Hawaii-Inseln']
    },
    currencyCode: 'USD',
    currencyName: { tr: 'Amerikan Doları', en: 'US Dollar', de: 'US-Dollar' },
    currencySymbol: '$',
    timeZone: 'UTC-5 ile UTC-8 arası (Doğu/Pasifik)',
    callingCode: '+1',
    plugTypes: 'A, B (120V, 60Hz)'
  },

  // Fransa
  FR: {
    majorCities: {
      tr: ['Paris', 'Marsilya', 'Lyon', 'Nice', 'Toulouse', 'Bordeaux', 'Strazburg'],
      en: ['Paris', 'Marseille', 'Lyon', 'Nice', 'Toulouse', 'Bordeaux', 'Strasbourg'],
      de: ['Paris', 'Marseille', 'Lyon', 'Nizza', 'Toulouse', 'Bordeaux', 'Straßburg']
    },
    touristRegions: {
      tr: ['Fransız Rivierası (Côte d’Azur & Cannes)', 'Loire Vadisi Şatoları', 'Provence Lavanta Tarlaları', 'Fransız Alpleri (Chamonix & Mont Blanc)', 'Normandiya & Mont Saint-Michel'],
      en: ['French Riviera (Cote d’Azur & Cannes)', 'Loire Valley Castles', 'Provence Lavender Fields', 'French Alps (Chamonix & Mont Blanc)', 'Normandy & Mont Saint-Michel'],
      de: ['Französische Riviera (Côte d’Azur)', 'Schlösser der Loire', 'Lavendelfelder der Provence', 'Französische Alpen (Chamonix)', 'Normandie & Mont Saint-Michel']
    },
    currencyCode: 'EUR',
    currencyName: { tr: 'Euro', en: 'Euro', de: 'Euro' },
    currencySymbol: '€',
    timeZone: 'UTC+1 (Yazın UTC+2 CET)',
    callingCode: '+33',
    plugTypes: 'C, E (230V, 50Hz)'
  },

  // İtalya
  IT: {
    majorCities: {
      tr: ['Roma', 'Milano', 'Floransa', 'Venedik', 'Napoli', 'Torino', 'Palermo'],
      en: ['Rome', 'Milan', 'Florence', 'Venice', 'Naples', 'Turin', 'Palermo'],
      de: ['Rom', 'Mailand', 'Florenz', 'Venedig', 'Neapel', 'Turin', 'Palermo']
    },
    touristRegions: {
      tr: ['Toskana Vadisi & Chianti Bağları', 'Amalfi Kıyıları & Positano', 'Como & Garda Gölleri', 'Dolomit Alpleri', 'Sicilya & Sardinya Adaları'],
      en: ['Tuscan Hills & Chianti Wine Region', 'Amalfi Coast & Positano', 'Lake Como & Lake Garda', 'The Dolomite Alps', 'Sicily & Sardinia Islands'],
      de: ['Toskana & Chianti-Weingebiet', 'Amalfiküste & Positano', 'Comer See & Gardasee', 'Dolomiten', 'Sizilien & Sardinien']
    },
    currencyCode: 'EUR',
    currencyName: { tr: 'Euro', en: 'Euro', de: 'Euro' },
    currencySymbol: '€',
    timeZone: 'UTC+1 (Yazın UTC+2 CET)',
    callingCode: '+39',
    plugTypes: 'C, F, L (230V, 50Hz)'
  },

  // İspanya
  ES: {
    majorCities: {
      tr: ['Madrid', 'Barselona', 'Valensiya', 'Sevilla', 'Zaragoza', 'Malaga', 'Bilbao'],
      en: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Malaga', 'Bilbao'],
      de: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Saragossa', 'Málaga', 'Bilbao']
    },
    touristRegions: {
      tr: ['Endülüs (Granada, Sevilla, Cordoba)', 'Costa del Sol Kıyıları', 'Balear Adaları (Mayorka, İbiza)', 'Kanarya Adaları (Tenerife)', 'Costa Brava'],
      en: ['Andalusia (Granada, Seville, Cordoba)', 'Costa del Sol Coastline', 'Balearic Islands (Mallorca, Ibiza)', 'Canary Islands (Tenerife)', 'Costa Brava'],
      de: ['Andalusien (Granada, Sevilla)', 'Costa del Sol', 'Balearen (Mallorca, Ibiza)', 'Kanarische Inseln (Teneriffa)', 'Costa Brava']
    },
    currencyCode: 'EUR',
    currencyName: { tr: 'Euro', en: 'Euro', de: 'Euro' },
    currencySymbol: '€',
    timeZone: 'UTC+1 (Yazın UTC+2 CET)',
    callingCode: '+34',
    plugTypes: 'C, F (230V, 50Hz)'
  },

  // Birleşik Krallık
  GB: {
    majorCities: {
      tr: ['Londra', 'Manchester', 'Edinburgh', 'Birmingham', 'Liverpool', 'Glasgow', 'Bristol'],
      en: ['London', 'Manchester', 'Edinburgh', 'Birmingham', 'Liverpool', 'Glasgow', 'Bristol'],
      de: ['London', 'Manchester', 'Edinburgh', 'Birmingham', 'Liverpool', 'Glasgow', 'Bristol']
    },
    touristRegions: {
      tr: ['İskoç Yaylaları (Highlands & Loch Ness)', 'Lake District Göller Bölgesi', 'Cotswolds Masal Köyleri', 'Stonehenge & Bath', 'Cornwall Sahilleri'],
      en: ['Scottish Highlands & Loch Ness', 'Lake District National Park', 'The Cotswolds Villages', 'Stonehenge & Bath', 'Cornwall Coastline'],
      de: ['Schottische Highlands & Loch Ness', 'Lake District Nationalpark', 'Cotswolds Dörfer', 'Stonehenge & Bath', 'Cornwall-Küste']
    },
    currencyCode: 'GBP',
    currencyName: { tr: 'İngiliz Sterlini', en: 'British Pound', de: 'Britisches Pfund' },
    currencySymbol: '£',
    timeZone: 'UTC+0 (Yazın UTC+1 BST)',
    callingCode: '+44',
    plugTypes: 'G (230V, 50Hz - 3 uçlu İngiliz prizi)'
  },

  // Japonya
  JP: {
    majorCities: {
      tr: ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Nagoya', 'Sapporo', 'Fukuoka'],
      en: ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Nagoya', 'Sapporo', 'Fukuoka'],
      de: ['Tokio', 'Osaka', 'Kyoto', 'Yokohama', 'Nagoya', 'Sapporo', 'Fukuoka']
    },
    touristRegions: {
      tr: ['Fuji Beş Göller & Hakone Kaplıcaları', 'Kyoto Tarihi Tapınaklar Bölgesi', 'Hokkaido Kar & Lavanta Vadileri', 'Okinawa Tropik Adaları', 'Nara Geyik Parkı'],
      en: ['Fuji Five Lakes & Hakone Onsens', 'Historic Kyoto Temple District', 'Hokkaido Snow & Lavender Valleys', 'Okinawa Tropical Islands', 'Nara Deer Park'],
      de: ['Fuji-Fünf-Seen & Hakone Onsen', 'Historisches Kyoto', 'Hokkaido Schnee & Natur', 'Okinawa Tropeninseln', 'Nara Hirschpark']
    },
    currencyCode: 'JPY',
    currencyName: { tr: 'Japon Yeni', en: 'Japanese Yen', de: 'Japanischer Yen' },
    currencySymbol: '¥',
    timeZone: 'UTC+9 (JST)',
    callingCode: '+81',
    plugTypes: 'A, B (100V, 50/60Hz)'
  },

  // Gürcistan
  GE: {
    majorCities: {
      tr: ['Tiflis', 'Batum', 'Kutaisi', 'Rustavi', 'Gori', 'Telavi', 'Zugdidi'],
      en: ['Tbilisi', 'Batumi', 'Kutaisi', 'Rustavi', 'Gori', 'Telavi', 'Zugdidi'],
      de: ['Tiflis', 'Batumi', 'Kutaissi', 'Rustawi', 'Gori', 'Telawi', 'Sugdidi']
    },
    touristRegions: {
      tr: ['Kazbegi Dağları & Gergeti', 'Kaheti Şarap Vadisi (Signagi)', 'Svaneti Taş Kuleleri (Mestia)', 'Karadeniz Acara Kıyıları', 'Vardzia Mağara Kenti'],
      en: ['Mount Kazbek & Gergeti Church', 'Kakheti Wine Valley (Sighnaghi)', 'Svaneti Medieval Towers (Mestia)', 'Black Sea Adjara Coastline', 'Vardzia Cave Monastery'],
      de: ['Berg Kasbek & Gergeti-Kirche', 'Kachetien Weintal (Signagi)', 'Swanetien Wehrtürme (Mestia)', 'Schwarzmeerküste Adscharien', 'Höhlenstadt Wardsia']
    },
    currencyCode: 'GEL',
    currencyName: { tr: 'Gürcistan Larisi', en: 'Georgian Lari', de: 'Georgischer Lari' },
    currencySymbol: '₾',
    timeZone: 'UTC+4 (GET)',
    callingCode: '+995',
    plugTypes: 'C, F (230V, 50Hz)'
  },

  // Bosna-Hersek
  BA: {
    majorCities: {
      tr: ['Saraybosna', 'Mostar', 'Banja Luka', 'Tuzla', 'Zenica', 'Bihać', 'Trebinje'],
      en: ['Sarajevo', 'Mostar', 'Banja Luka', 'Tuzla', 'Zenica', 'Bihac', 'Trebinje'],
      de: ['Sarajevo', 'Mostar', 'Banja Luka', 'Tuzla', 'Zenica', 'Bihać', 'Trebinje']
    },
    touristRegions: {
      tr: ['Neretva Nehri Kanyonu & Mostar', 'Kravica Şelaleleri', 'Una Milli Parkı & Bihać Rafting', 'Jahorina & Bjelašnica Kayak Merkezleri', 'Blagaj Alperenler Tekkesi'],
      en: ['Neretva River Canyon & Mostar', 'Kravica Waterfalls', 'Una National Park Rafting', 'Jahorina & Bjelasnica Olympic Ski Hills', 'Blagaj Dervish Tekke'],
      de: ['Neretva-Canyon & Mostar', 'Kravica-Wasserfälle', 'Nationalpark Una Rafting', 'Jahorina Skigebiet', 'Derwischkloster Blagaj']
    },
    currencyCode: 'BAM',
    currencyName: { tr: 'Bosna Konvertibl Markı', en: 'Bosnian Convertible Mark', de: 'Konvertible Mark' },
    currencySymbol: 'KM',
    timeZone: 'UTC+1 (Yazın UTC+2 CET)',
    callingCode: '+387',
    plugTypes: 'C, F (230V, 50Hz)'
  },

  // Tayland
  TH: {
    majorCities: {
      tr: ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Hat Yai', 'Khon Kaen', 'Chiang Rai'],
      en: ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Hat Yai', 'Khon Kaen', 'Chiang Rai'],
      de: ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Hat Yai', 'Khon Kaen', 'Chiang Rai']
    },
    touristRegions: {
      tr: ['Phi Phi Adaları & Maya Koyu (Krabi)', 'Phang Nga Körfezi (James Bond Adası)', 'Chiang Mai Antik Tapınaklar Bölgesi', 'Koh Samui & Koh Phangan Adaları', 'Ayutthaya UNESCO Kalıntıları'],
      en: ['Phi Phi Islands & Maya Bay (Krabi)', 'Phang Nga Bay (James Bond Island)', 'Chiang Mai Mountain & Temple Region', 'Koh Samui & Koh Phangan Islands', 'Ayutthaya Historical Ruins'],
      de: ['Phi Phi Inseln & Maya Bay', 'Phang Nga Bucht', 'Chiang Mai Berg- und Tempelregion', 'Koh Samui & Koh Phangan', 'Historisches Ayutthaya']
    },
    currencyCode: 'THB',
    currencyName: { tr: 'Tayland Bahtı', en: 'Thai Baht', de: 'Thailändischer Baht' },
    currencySymbol: '฿',
    timeZone: 'UTC+7 (ICT)',
    callingCode: '+66',
    plugTypes: 'A, B, C, O (220V, 50Hz)'
  },

  // Hollanda
  NL: {
    majorCities: {
      tr: ['Amsterdam', 'Rotterdam', 'Lahey (Den Haag)', 'Utrecht', 'Eindhoven', 'Groningen', 'Maastricht'],
      en: ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven', 'Groningen', 'Maastricht'],
      de: ['Amsterdam', 'Rotterdam', 'Den Haag', 'Utrecht', 'Eindhoven', 'Groningen', 'Maastricht']
    },
    touristRegions: {
      tr: ['Keukenhof Lale Bahçeleri (Lisse)', 'Zaanse Schans Yeldeğirmenleri', 'Giethoorn (Kanallı Arabasız Masal Köyü)', 'Wadden Denizi Adaları (Texel)', 'Delft & Gouda Tarihi Peynir Kentleri'],
      en: ['Keukenhof Tulip Gardens (Lisse)', 'Zaanse Schans Windmill Village', 'Giethoorn Car-Free Canal Village', 'Wadden Islands (Texel)', 'Delft & Gouda Historic Cheese Towns'],
      de: ['Keukenhof Tulpengärten', 'Zaanse Schans Windmühlen', 'Giethoorn Grachtendorf', 'Wattenmeerinseln (Texel)', 'Historische Käsestädte Delft & Gouda']
    },
    currencyCode: 'EUR',
    currencyName: { tr: 'Euro', en: 'Euro', de: 'Euro' },
    currencySymbol: '€',
    timeZone: 'UTC+1 (Yazın UTC+2 CET)',
    callingCode: '+31',
    plugTypes: 'C, F (230V, 50Hz)'
  },

  // İsviçre
  CH: {
    majorCities: {
      tr: ['Zürih', 'Cenevre', 'Basel', 'Bern', 'Lozan', 'Luzern', 'Lugano'],
      en: ['Zurich', 'Geneva', 'Basel', 'Bern', 'Lausanne', 'Lucerne', 'Lugano'],
      de: ['Zürich', 'Genf', 'Basel', 'Bern', 'Lausanne', 'Luzern', 'Lugano']
    },
    touristRegions: {
      tr: ['Zermatt & Matterhorn Dağı', 'Jungfrau & Interlaken Alpleri', 'Cenevre Gölü Kıyısı (Montreux)', 'Luzern Gölü & Şapel Köprüsü', 'St. Moritz & Engadin'],
      en: ['Zermatt & Mount Matterhorn', 'Jungfrau Region & Interlaken', 'Lake Geneva Riviera (Montreux)', 'Lake Lucerne & Chapel Bridge', 'St. Moritz & Engadin Valley'],
      de: ['Zermatt & Matterhorn', 'Jungfrauregion & Interlaken', 'Genfersee-Riviera (Montreux)', 'Vierwaldstättersee & Luzern', 'St. Moritz & Engadin']
    },
    currencyCode: 'CHF',
    currencyName: { tr: 'İsviçre Frangı', en: 'Swiss Franc', de: 'Schweizer Franken' },
    currencySymbol: 'CHF',
    timeZone: 'UTC+1 (Yazın UTC+2 CET)',
    callingCode: '+41',
    plugTypes: 'J (230V, 50Hz - İsviçre 3 uçlu prizi)'
  },

  // Avusturya
  AT: {
    majorCities: {
      tr: ['Viyana', 'Salzburg', 'Innsbruck', 'Graz', 'Linz', 'Klagenfurt', 'Bregenz'],
      en: ['Vienna', 'Salzburg', 'Innsbruck', 'Graz', 'Linz', 'Klagenfurt', 'Bregenz'],
      de: ['Wien', 'Salzburg', 'Innsbruck', 'Graz', 'Linz', 'Klagenfurt', 'Bregenz']
    },
    touristRegions: {
      tr: ['Hallstatt & Salzkammergut Göller Bölgesi', 'Tirol Alpleri (Kitzbühel)', 'Wachau Şarap Vadisi & Tuna', 'Zell am See & Kaprun Buzulu', 'Hohe Tauern Milli Parkı'],
      en: ['Hallstatt & Salzkammergut Lake District', 'Tyrolean Alps (Kitzbuhel)', 'Wachau Danube Wine Valley', 'Zell am See & Kaprun Glacier', 'Hohe Tauern National Park'],
      de: ['Hallstatt & Salzkammergut', 'Tiroler Alpen (Kitzbühel)', 'Wachau Donautal', 'Zell am See & Kaprun', 'Nationalpark Hohe Tauern']
    },
    currencyCode: 'EUR',
    currencyName: { tr: 'Euro', en: 'Euro', de: 'Euro' },
    currencySymbol: '€',
    timeZone: 'UTC+1 (Yazın UTC+2 CET)',
    callingCode: '+43',
    plugTypes: 'C, F (230V, 50Hz)'
  },

  // Portekiz
  PT: {
    majorCities: {
      tr: ['Lizbon', 'Porto', 'Braga', 'Coimbra', 'Funchal (Madeira)', 'Faro', 'Setubal'],
      en: ['Lisbon', 'Porto', 'Braga', 'Coimbra', 'Funchal (Madeira)', 'Faro', 'Setubal'],
      de: ['Lissabon', 'Porto', 'Braga', 'Coimbra', 'Funchal (Madeira)', 'Faro', 'Setúbal']
    },
    touristRegions: {
      tr: ['Algarve Mağaraları & Altın Plajları', 'Sintra Masal Şatoları', 'Douro Şarap Vadisi', 'Madeira Volkanik Çiçek Adası', 'Azor Adaları (São Miguel)'],
      en: ['Algarve Sea Caves & Golden Beaches', 'Sintra Fairytale Palaces', 'Douro Wine Valley', 'Madeira Flower Island', 'Azores Islands (Sao Miguel)'],
      de: ['Algarve-Höhlen & Strände', 'Sintra Schlösser', 'Douro-Weintal', 'Blumeninsel Madeira', 'Azoren-Inseln']
    },
    currencyCode: 'EUR',
    currencyName: { tr: 'Euro', en: 'Euro', de: 'Euro' },
    currencySymbol: '€',
    timeZone: 'UTC+0 (Yazın UTC+1 WET)',
    callingCode: '+351',
    plugTypes: 'C, F (230V, 50Hz)'
  },

  // Rusya
  RU: {
    majorCities: {
      tr: ['Moskova', 'St. Petersburg', 'Kazan', 'Novosibirsk', 'Yekaterinburg', 'Soçi', 'Vladivostok'],
      en: ['Moscow', 'St. Petersburg', 'Kazan', 'Novosibirsk', 'Yekaterinburg', 'Sochi', 'Vladivostok'],
      de: ['Moskau', 'St. Petersburg', 'Kasan', 'Nowosibirsk', 'Jekaterinburg', 'Sotschi', 'Wladiwostok']
    },
    touristRegions: {
      tr: ['Altın Halka (Suzdal, Vladimir, Yaroslavl)', 'Baykal Gölü & Olkhon Adası', 'Kamçatka Volkanları & Gayzerler', 'Kafkas Dağları & Elbruz', 'Karelya Gölleri & Kizhi'],
      en: ['Golden Ring (Suzdal, Yaroslavl)', 'Lake Baikal & Olkhon Island', 'Kamchatka Volcanoes & Geysers', 'Caucasus Mountains & Elbrus', 'Karelia Lakes & Kizhi'],
      de: ['Goldener Ring (Susdal, Jaroslawl)', 'Baikalsee & Insel Olchon', 'Kamtschatka Vulkane', 'Kaukasus & Elbrus', 'Karelien & Kischi']
    },
    currencyCode: 'RUB',
    currencyName: { tr: 'Rus Rublesi', en: 'Russian Ruble', de: 'Russischer Rubel' },
    currencySymbol: '₽',
    timeZone: 'UTC+3 (Moskova Saati MSK)',
    callingCode: '+7',
    plugTypes: 'C, F (230V, 50Hz)'
  },

  // Birleşik Arap Emirlikleri
  AE: {
    majorCities: {
      tr: ['Dubai', 'Abu Dhabi', 'Şarika (Sharjah)', 'El Ayn', 'Acman', 'Ras Al Khaimah', 'Füceyre'],
      en: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Al Ain', 'Ajman', 'Ras Al Khaimah', 'Fujairah'],
      de: ['Dubai', 'Abu Dhabi', 'Schardscha', 'Al-Ain', 'Adschman', 'Ras Al Khaimah', 'Fudschaira']
    },
    touristRegions: {
      tr: ['Dubai Downtown & Burj Khalifa', 'Palm Jumeirah & Marina Sahili', 'Abu Dhabi Saadiyat Kültür Adası', 'Kızıl Çöl Safarisi Tepeleri', 'Hatta Dağ Göleti'],
      en: ['Downtown Dubai & Burj Khalifa', 'Palm Jumeirah & Marina Coast', 'Saadiyat Island Cultural District (Abu Dhabi)', 'Red Dune Desert Safari', 'Hatta Mountain Dam'],
      de: ['Downtown Dubai & Burj Khalifa', 'Palm Jumeirah & Dubai Marina', 'Kulturinsel Saadiyat (Abu Dhabi)', 'Wüstensafari-Dünen', 'Hatta-Staudamm']
    },
    currencyCode: 'AED',
    currencyName: { tr: 'BAE Dirhemi', en: 'UAE Dirham', de: 'VAE-Dirham' },
    currencySymbol: 'د.إ',
    timeZone: 'UTC+4 (GST)',
    callingCode: '+971',
    plugTypes: 'G (230V, 50Hz - İngiliz tipi 3 uçlu)'
  },

  // Mısır
  EG: {
    majorCities: {
      tr: ['Kahire', 'İskenderiye', 'Giza', 'Şarm El Şeyh', 'Hurghada', 'Luksor', 'Aswan'],
      en: ['Cairo', 'Alexandria', 'Giza', 'Sharm El Sheikh', 'Hurghada', 'Luxor', 'Aswan'],
      de: ['Kairo', 'Alexandria', 'Gizeh', 'Scharm El-Scheich', 'Hurghada', 'Luxor', 'Assuan']
    },
    touristRegions: {
      tr: ['Giza Piramitleri Platosu', 'Luksor Krallar Vadisi & Karnak', 'Kızıldeniz Mercan Resifleri (Şarm & Hurghada)', 'Nil Nehri Seyir Rotası', 'Siwa Vahası'],
      en: ['Giza Pyramids Plateau', 'Luxor Valley of the Kings & Karnak', 'Red Sea Coral Reefs (Sharm & Hurghada)', 'Nile River Cruise Route', 'Siwa Oasis'],
      de: ['Pyramiden von Gizeh', 'Luxor Tal der Könige & Karnak', 'Rotes Meer Riffe (Scharm & Hurghada)', 'Nilkreuzfahrt-Route', 'Siwa-Oase']
    },
    currencyCode: 'EGP',
    currencyName: { tr: 'Mısır Lirası', en: 'Egyptian Pound', de: 'Ägyptisches Pfund' },
    currencySymbol: 'E£',
    timeZone: 'UTC+2 (Yazın UTC+3 EET)',
    callingCode: '+20',
    plugTypes: 'C, F (220V, 50Hz)'
  },

  // Yunanistan
  GR: {
    majorCities: {
      tr: ['Atina', 'Selanik', 'Patras', 'Kandiye (Heraklion)', 'Larisa', 'Volos', 'Rodos'],
      en: ['Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa', 'Volos', 'Rhodes'],
      de: ['Athen', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa', 'Volos', 'Rhodos']
    },
    touristRegions: {
      tr: ['Kiklad Adaları (Santorini, Mikonos, Paros)', 'Girit Adası Kanyonları ve Plajları', 'Meteora Havada Asılı Manastırlar', 'Halkidiki Turkuaz Yarımadası', 'İyon Adaları (Korfu, Zakintos)'],
      en: ['Cyclades Islands (Santorini, Mykonos)', 'Crete Island Gorges & Beaches', 'Meteora Clifftop Monasteries', 'Halkidiki Emerald Coast', 'Ionian Islands (Corfu, Zakynthos)'],
      de: ['Kykladen (Santorin, Mykonos)', 'Kreta Schluchten & Strände', 'Meteora Felsenklöster', 'Chalkidiki Halbinsel', 'Ionische Inseln (Korfu, Zakynthos)']
    },
    currencyCode: 'EUR',
    currencyName: { tr: 'Euro', en: 'Euro', de: 'Euro' },
    currencySymbol: '€',
    timeZone: 'UTC+2 (Yazın UTC+3 EET)',
    callingCode: '+30',
    plugTypes: 'C, F (230V, 50Hz)'
  },

  // Azerbaycan
  AZ: {
    majorCities: {
      tr: ['Bakü', 'Gence', 'Sumgayıt', 'Mingəçevir', 'Şeki', 'Lenkeran', 'Şuşa', 'Nahçıvan'],
      en: ['Baku', 'Ganja', 'Sumqayit', 'Mingecevir', 'Sheki', 'Lankaran', 'Shusha', 'Nakhchivan'],
      de: ['Baku', 'Gändschä', 'Sumqayıt', 'Mingəçevir', 'Schäki', 'Lənkəran', 'Schuscha', 'Naxçıvan']
    },
    touristRegions: {
      tr: ['Gobustan Kaya Resimleri ve Çamur Volkanları', 'Şeki Han Sarayı ve İpek Yolu', 'Şahdağ Kayak ve Doğa Merkezi', 'Hazar Denizi Sahilleri (Absheron)', 'Karabağ ve Şuşa Yaylaları'],
      en: ['Gobustan Petroglyphs & Mud Volcanoes', 'Sheki Khans’ Palace & Silk Road', 'Shahdag Mountain Ski Resort', 'Caspian Sea Coast (Absheron)', 'Karabakh & Shusha Highlands'],
      de: ['Gobustan Felsbilder & Schlammvulkane', 'Palast der Khane von Schäki', 'Schahdag Skigebiet', 'Kaspisches Meer Küste', 'Hochland von Bergkarabach']
    },
    currencyCode: 'AZN',
    currencyName: { tr: 'Azerbaycan Manatı', en: 'Azerbaijani Manat', de: 'Aserbaidschan-Manat' },
    currencySymbol: '₼',
    timeZone: 'UTC+4 (AZT)',
    callingCode: '+994',
    plugTypes: 'C, F (230V, 50Hz)'
  },

  // Güney Kore
  KR: {
    majorCities: {
      tr: ['Seul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Ulsan'],
      en: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Ulsan'],
      de: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Ulsan']
    },
    touristRegions: {
      tr: ['Jeju Volkanik Adası & Şelaleleri', 'Gyeongju Antik Krallık Şehri', 'Busan Haeundae Sahili', 'Seoraksan Dağı Milli Parkı', 'DMZ Askerden Arındırılmış Bölge'],
      en: ['Jeju Volcanic Island & Waterfalls', 'Gyeongju Ancient Silla Capital', 'Busan Haeundae Coastal District', 'Seoraksan National Park', 'DMZ Demilitarized Zone'],
      de: ['Vulkaninsel Jeju', 'Historisches Gyeongju', 'Busan Haeundae-Küste', 'Seoraksan-Nationalpark', 'DMZ Entmilitarisierte Zone']
    },
    currencyCode: 'KRW',
    currencyName: { tr: 'Güney Kore Wonu', en: 'South Korean Won', de: 'Südkoreanischer Won' },
    currencySymbol: '₩',
    timeZone: 'UTC+9 (KST)',
    callingCode: '+82',
    plugTypes: 'C, F (220V, 60Hz)'
  },

  // Brezilya
  BR: {
    majorCities: {
      tr: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus'],
      en: ['Sao Paulo', 'Rio de Janeiro', 'Brasilia', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus'],
      de: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador da Bahia', 'Fortaleza', 'Belo Horizonte', 'Manaus']
    },
    touristRegions: {
      tr: ['İguazú Şelaleleri (Dünyanın en görkemli şelalesi)', 'Amazon Yağmur Ormanları & Manaus', 'Rio Sahilleri (Copacabana & Ipanema)', 'Bahia & Pelourinho Meydanı', 'Fernando de Noronha Koruma Adası'],
      en: ['Iguazu Falls (World’s largest waterfall)', 'Amazon Rainforest & Rio Negro', 'Rio Coastal Beaches (Copacabana)', 'Bahia Afro-Brazilian Heritage Coast', 'Fernando de Noronha Marine Sanctuary'],
      de: ['Iguazú-Wasserfälle', 'Amazonas-Regenwald', 'Strände von Rio de Janeiro', 'Küste von Bahia', 'Fernando de Noronha']
    },
    currencyCode: 'BRL',
    currencyName: { tr: 'Brezilya Reali', en: 'Brazilian Real', de: 'Brasilianischer Real' },
    currencySymbol: 'R$',
    timeZone: 'UTC-3 (Brasília Saati BRT)',
    callingCode: '+55',
    plugTypes: 'N (127V / 220V, 60Hz)'
  },

  // Meksika
  MX: {
    majorCities: {
      tr: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Cancún', 'Tijuana', 'Mérida'],
      en: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Cancun', 'Tijuana', 'Merida'],
      de: ['Mexiko-Stadt', 'Guadalajara', 'Monterrey', 'Puebla', 'Cancún', 'Tijuana', 'Mérida']
    },
    touristRegions: {
      tr: ['Riviera Maya & Cancún Kıyıları', 'Chichén Itzá & Yucatan Cenoteleri', 'Oaxaca Gastronomi ve Zanaat Bölgesi', 'Baja California Balina Vadileri', 'San Miguel de Allende Kolonyal Kenti'],
      en: ['Riviera Maya & Cancun Coast', 'Chichen Itza & Yucatan Cenotes', 'Oaxaca Culinary & Artisan Region', 'Baja California Peninsula', 'San Miguel de Allende Colonial Town'],
      de: ['Riviera Maya & Cancún', 'Chichén Itzá & Cenoten von Yucatán', 'Oaxaca Gastronomieregion', 'Baja California', 'San Miguel de Allende']
    },
    currencyCode: 'MXN',
    currencyName: { tr: 'Meksika Pezosu', en: 'Mexican Peso', de: 'Mexikanischer Peso' },
    currencySymbol: '$',
    timeZone: 'UTC-6 (Merkez Saati CST)',
    callingCode: '+52',
    plugTypes: 'A, B (127V, 60Hz)'
  },

  // Suudi Arabistan
  SA: {
    majorCities: {
      tr: ['Riyad', 'Cidde', 'Mekke', 'Medine', 'Dammam', 'El Huber', 'Taif', 'Tebük'],
      en: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Khobar', 'Taif', 'Tabuk'],
      de: ['Riad', 'Dschidda', 'Mekka', 'Medina', 'Dammam', 'Al-Chobar', 'Taif', 'Tabuk']
    },
    touristRegions: {
      tr: ['AlUla & Hegra UNESCO Nabati Mezarları', 'Diriye Tarihi Başkenti & At-Turaif', 'Kızıldeniz Mercan Kıyıları (Red Sea Project)', 'Asir Dağları & Abha Yaylası', 'Cidde Tarihi Al-Balad Çarşıları'],
      en: ['AlUla & Hegra Nabataean Heritage', 'Historic Diriyah & At-Turaif', 'Red Sea Project Coral Coast', 'Asir Mountains & Abha Highlands', 'Jeddah Historic Al-Balad Quarters'],
      de: ['AlUla & Hegra Felsengräber', 'Historisches Diriyya', 'Rotes Meer Küstenresorts', 'Asir-Berge & Abha', 'Al-Balad Altstadt von Dschidda']
    },
    currencyCode: 'SAR',
    currencyName: { tr: 'Suudi Arabistan Riyali', en: 'Saudi Riyal', de: 'Saudi-Riyal' },
    currencySymbol: '﷼',
    timeZone: 'UTC+3 (AST)',
    callingCode: '+966',
    plugTypes: 'G (230V, 60Hz - İngiliz tipi 3 uçlu)'
  },

  // Çin
  CN: {
    majorCities: {
      tr: ['Pekin', 'Şanghay', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Hangzhou', 'Xi’an'],
      en: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Hangzhou', 'Xi’an'],
      de: ['Peking', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Hangzhou', 'Xi’an']
    },
    touristRegions: {
      tr: ['Çin Seddi & Pekin İmparatorluk Sarayları', 'Guilin Karst Dağları & Li Nehri', 'Zhangjiajie Avatar Dağları', 'Xi’an Toprak Askerler Bölgesi', 'Sichuan Panda Vadileri'],
      en: ['Great Wall & Imperial Beijing', 'Guilin Karst Peaks & Li River', 'Zhangjiajie Avatar Mountains', 'Xi’an Terracotta Army Sites', 'Sichuan Giant Panda Reserves'],
      de: ['Chinesische Mauer & Kaiserpalast', 'Karstberge von Guilin & Li-Fluss', 'Zhangjiajie Avatar-Berge', 'Terrakotta-Armee in Xi’an', 'Sichuan Panda-Schutzgebiete']
    },
    currencyCode: 'CNY',
    currencyName: { tr: 'Çin Yuanı (Renminbi)', en: 'Chinese Yuan', de: 'Chinesischer Yuan' },
    currencySymbol: '¥',
    timeZone: 'UTC+8 (CST)',
    callingCode: '+86',
    plugTypes: 'A, C, I (220V, 50Hz)'
  },

  // Hindistan
  IN: {
    majorCities: {
      tr: ['Yeni Delhi', 'Mumbai', 'Bengaluru', 'Kolkata', 'Chennai', 'Haydarabad', 'Jaipur'],
      en: ['New Delhi', 'Mumbai', 'Bengaluru', 'Kolkata', 'Chennai', 'Hyderabad', 'Jaipur'],
      de: ['Neu-Delhi', 'Mumbai', 'Bengaluru', 'Kalkutta', 'Chennai', 'Hyderabad', 'Jaipur']
    },
    touristRegions: {
      tr: ['Altın Üçgen (Delhi, Agra Tac Mahal, Jaipur)', 'Kerala Sakin Suları & Çay Bahçeleri', 'Goa Tropik Kumsalları', 'Varanasi Ganj Nehri Ghatları', 'Ladakh Himalaya Dağları'],
      en: ['Golden Triangle (Delhi, Agra Taj Mahal, Jaipur)', 'Kerala Backwaters & Munnar Tea Estates', 'Goa Tropical Beaches', 'Varanasi Sacred Ganges Ghats', 'Ladakh Himalayan Valleys'],
      de: ['Goldenes Dreieck (Delhi, Taj Mahal, Jaipur)', 'Kerala Backwaters & Teeplantagen', 'Goa Strände', 'Heilige Ghats von Varanasi am Ganges', 'Ladakh Himalaya-Täler']
    },
    currencyCode: 'INR',
    currencyName: { tr: 'Hindistan Rupisi', en: 'Indian Rupee', de: 'Indische Rupie' },
    currencySymbol: '₹',
    timeZone: 'UTC+5:30 (IST)',
    callingCode: '+91',
    plugTypes: 'C, D, M (230V, 50Hz)'
  },

  // Sırbistan
  RS: {
    majorCities: {
      tr: ['Belgrad', 'Novi Sad', 'Niş', 'Kragujevac', 'Subotica', 'Zrenjanin', 'Pančevo'],
      en: ['Belgrade', 'Novi Sad', 'Nis', 'Kragujevac', 'Subotica', 'Zrenjanin', 'Pancevo'],
      de: ['Belgrad', 'Novi Sad', 'Niš', 'Kragujevac', 'Subotica', 'Zrenjanin', 'Pančevo']
    },
    touristRegions: {
      tr: ['Kalemegdan Kalesi & Tuna-Sava Kordonu', 'Petrovaradin & Fruška Gora Manastırları', 'Uvac Kanyonu ve Kıvrımları', 'Tara Milli Parkı & Drina Nehri Evi', 'Zlatibor Dağ Yaylaları'],
      en: ['Belgrade Fortress & Danube Confluence', 'Petrovaradin & Fruska Gora Monasteries', 'Uvac River Canyon Meanders', 'Tara National Park & Drina River', 'Zlatibor Mountain Highlands'],
      de: ['Festung Kalemegdan & Donau-Save-Ufer', 'Petrovaradin & Klöster von Fruška Gora', 'Uvac-Canyon', 'Nationalpark Tara', 'Zlatibor-Gebirge']
    },
    currencyCode: 'RSD',
    currencyName: { tr: 'Sırp Dinarı', en: 'Serbian Dinar', de: 'Serbischer Dinar' },
    currencySymbol: 'din',
    timeZone: 'UTC+1 (Yazın UTC+2 CET)',
    callingCode: '+381',
    plugTypes: 'C, F (230V, 50Hz)'
  },

  // Karadağ (Montenegro)
  ME: {
    majorCities: {
      tr: ['Podgorica', 'Budva', 'Kotor', 'Herceg Novi', 'Tivat', 'Bar', 'Nikšić', 'Cetinje'],
      en: ['Podgorica', 'Budva', 'Kotor', 'Herceg Novi', 'Tivat', 'Bar', 'Niksic', 'Cetinje'],
      de: ['Podgorica', 'Budva', 'Kotor', 'Herceg Novi', 'Tivat', 'Bar', 'Nikšić', 'Cetinje']
    },
    touristRegions: {
      tr: ['Kotor Fiyordu ve Tarihi Kalesi', 'Budva Rivierası & Sveti Stefan Yarımadası', 'Durmitor Milli Parkı & Kara Göl', 'Tara Nehri Kanyonu (Avrupa’nın en derini)', 'Porto Montenegro Lüks Marina (Tivat)'],
      en: ['Bay of Kotor Fjord & Fortress', 'Budva Riviera & Sveti Stefan Islet', 'Durmitor National Park & Black Lake', 'Tara River Canyon (Europe’s Deepest)', 'Porto Montenegro Luxury Marina (Tivat)'],
      de: ['Bucht von Kotor & Festung', 'Budva-Riviera & Insel Sveti Stefan', 'Durmitor-Nationalpark & Schwarzer See', 'Tara-Schlucht (Tiefste Europas)', 'Porto Montenegro Yachthafen']
    },
    currencyCode: 'EUR',
    currencyName: { tr: 'Euro (Tek Taraflı Kullanım)', en: 'Euro (Unilaterally Adopted)', de: 'Euro (Einseitig eingeführt)' },
    currencySymbol: '€',
    timeZone: 'UTC+1 (Yazın UTC+2 CET)',
    callingCode: '+382',
    plugTypes: 'C, F (230V, 50Hz)'
  },

  // Fas
  MA: {
    majorCities: {
      tr: ['Kazablanka', 'Marakeş', 'Rabat', 'Fes', 'Tanca', 'Agadir', 'Meknes', 'Şafşavan'],
      en: ['Casablanca', 'Marrakech', 'Rabat', 'Fes', 'Tangier', 'Agadir', 'Meknes', 'Chefchaouen'],
      de: ['Casablanca', 'Marrakesch', 'Rabat', 'Fès', 'Tanger', 'Agadir', 'Meknès', 'Chefchaouen']
    },
    touristRegions: {
      tr: ['Marakeş Medinası & Cemaa el-Fna', 'Şafşavan Mavi Şehir', 'Sahra Çölü & Merzouga Kum Tepeleri', 'Fes el-Bali Tarihi Deri Tabakhaneleri', 'Atlas Dağları & Todra Kanyonu'],
      en: ['Marrakech Medina & Jemaa el-Fnaa', 'Chefchaouen (The Blue Pearl)', 'Sahara Desert & Merzouga Erg Chebbi', 'Fes el-Bali Medieval Tanneries', 'High Atlas Mountains & Todra Gorge'],
      de: ['Medina von Marrakesch', 'Blaue Stadt Chefchaouen', 'Sahara-Wüste & Merzouga', 'Historische Gerbereien von Fès', 'Hoher Atlas & Todra-Schlucht']
    },
    currencyCode: 'MAD',
    currencyName: { tr: 'Fas Dirhemi', en: 'Moroccan Dirham', de: 'Marokkanischer Dirham' },
    currencySymbol: 'DH',
    timeZone: 'UTC+1 (GMT+1)',
    callingCode: '+212',
    plugTypes: 'C, E (220V, 50Hz)'
  },

  // İran
  IR: {
    majorCities: {
      tr: ['Tahran', 'İsfahan', 'Şiraz', 'Tebriz', 'Meşhed', 'Yezd', 'Kiş Adası'],
      en: ['Tehran', 'Isfahan', 'Shiraz', 'Tabriz', 'Mashhad', 'Yazd', 'Kish Island'],
      de: ['Teheran', 'Isfahan', 'Schiras', 'Täbris', 'Maschhad', 'Jasd', 'Kisch-Insel']
    },
    touristRegions: {
      tr: ['Nakş-ı Cihan Meydanı & Şeyh Lütfullah (İsfahan)', 'Persepolis Antik Kenti & Nakş-ı Rüstem (Şiraz)', 'Nasır el-Mülk Pembe Cami & Hafız Türbesi', 'Gülistan Sarayı & Kapalıçarşı (Tahran)', 'Yezd Tarihi Kerpiç Şehri & Zerdüşt Ateşgahı'],
      en: ['Naqsh-e Jahan Square & Sheikh Lotfollah (Isfahan)', 'Persepolis Ancient Ruins & Naqsh-e Rustam (Shiraz)', 'Nasir al-Mulk Pink Mosque & Tomb of Hafez', 'Golestan Palace & Grand Bazaar (Tehran)', 'Historic City of Yazd & Zoroastrian Fire Temple'],
      de: ['Naqsh-e-Dschahan-Platz (Isfahan)', 'Persepolis Ruinen & Naqsh-e Rostam (Schiras)', 'Rosa Moschee & Mausoleum von Hafis', 'Golestan-Palast (Teheran)', 'Altstadt von Yazd & Feuertempel']
    },
    currencyCode: 'IRR',
    currencyName: { tr: 'İran Riyali / Tümen (IRR / Toman)', en: 'Iranian Rial / Toman (IRR)', de: 'Iranischer Rial / Toman (IRR)' },
    currencySymbol: 'IRR',
    timeZone: 'UTC+3:30 (IRST)',
    callingCode: '+98',
    plugTypes: 'C, F (230V, 50Hz)'
  }
};

/**
 * Ülke Coğrafi, Şehir ve Finansal Göstergeleri Getirici
 * 199 ülkenin tamamı için başkent, büyük şehirler, turistik bölgeler,
 * para birimi, priz tipi ve saat dilimi döndürür.
 */
export function getCountryGeography(countryCode: string, lang: string = 'tr'): CountryGeographyData {
  const code = countryCode.toUpperCase();
  const countryName = getCountryName(code, lang);
  const geo = GEO_DATA[code];
  const curated = CURATED_GEOGRAPHY[code];
  const capital = geo ? geo.capital : (lang === 'de' ? 'Hauptstadt' : lang === 'es' ? 'Capital' : lang === 'ru' ? 'Столица' : lang === 'tr' ? 'Başkent' : 'Capital');

  if (curated) {
    const tField = (obj: { tr: string; en: string; de: string }): string => {
      if (!obj) return '';
      if (lang === 'tr') return obj.tr;
      if (lang === 'de') return obj.de || obj.en;
      if (lang === 'en') return obj.en || obj.tr;
      return lText(lang, obj.tr, obj.en, obj.de);
    };

    const tArr = (obj: { tr: string[]; en: string[]; de: string[] }): string[] => {
      if (!obj) return [];
      if (lang === 'tr') return obj.tr;
      if (lang === 'de') return obj.de || obj.en;
      if (lang === 'en') return obj.en || obj.tr;
      const trArr = obj.tr || [];
      const enArr = obj.en || [];
      const deArr = obj.de || [];
      return trArr.map((trStr, i) => lText(lang, trStr, enArr[i] || trStr, deArr[i]));
    };

    return {
      countryCode: code,
      countryName,
      capital,
      majorCities: tArr(curated.majorCities),
      touristRegions: tArr(curated.touristRegions),
      currencyCode: curated.currencyCode,
      currencyName: tField(curated.currencyName),
      currencySymbol: curated.currencySymbol,
      timeZone: curated.timeZone,
      callingCode: curated.callingCode,
      plugTypes: curated.plugTypes
    };
  }

  // Bölgesel Otantik Harita ve Coğrafya Motoru
  const regionalMeta = getRegionalGeographyDefaults(code, capital, countryName, lang);

  return {
    countryCode: code,
    countryName,
    capital,
    majorCities: regionalMeta.majorCities,
    touristRegions: regionalMeta.touristRegions,
    currencyCode: regionalMeta.currencyCode,
    currencyName: regionalMeta.currencyName,
    currencySymbol: regionalMeta.currencySymbol,
    timeZone: regionalMeta.timeZone,
    callingCode: regionalMeta.callingCode,
    plugTypes: regionalMeta.plugTypes
  };
}

// Kapsamlı Küresel Para Birimi, Sembol ve Priz Veri Tabanı
export const GLOBAL_CURRENCIES: Record<string, { code: string; name: { tr: string; en: string; de: string }; symbol: string; callingCode?: string; plug?: string }> = {
  // Eurozone
  AT: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+43', plug: 'C, F' },
  BE: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+32', plug: 'C, E' },
  CY: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+357', plug: 'G' },
  EE: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+372', plug: 'C, F' },
  FI: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+358', plug: 'C, F' },
  FR: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+33', plug: 'C, E' },
  DE: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+49', plug: 'C, F' },
  GR: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+30', plug: 'C, F' },
  IE: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+353', plug: 'G' },
  IT: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+39', plug: 'C, F, L' },
  LV: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+371', plug: 'C, F' },
  LT: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+370', plug: 'C, F' },
  LU: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+352', plug: 'C, F' },
  MT: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+356', plug: 'G' },
  NL: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+31', plug: 'C, F' },
  PT: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+351', plug: 'C, F' },
  SK: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+421', plug: 'C, E' },
  SI: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+386', plug: 'C, F' },
  ES: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+34', plug: 'C, F' },
  HR: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+385', plug: 'C, F' },
  ME: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+382', plug: 'C, F' },
  XK: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+383', plug: 'C, F' },
  MC: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+377', plug: 'C, E, F' },
  SM: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+378', plug: 'C, F, L' },
  VA: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+379', plug: 'C, F, L' },
  AD: { code: 'EUR', name: { tr: 'Euro', en: 'Euro', de: 'Euro' }, symbol: '€', callingCode: '+376', plug: 'C, F' },

  // Diğer Avrupa
  AL: { code: 'ALL', name: { tr: 'Arnavutluk Leki', en: 'Albanian Lek', de: 'Albanischer Lek' }, symbol: 'L', callingCode: '+355', plug: 'C, F' },
  BA: { code: 'BAM', name: { tr: 'Bosna Markı', en: 'Bosnian Convertible Mark', de: 'Konvertible Mark' }, symbol: 'KM', callingCode: '+387', plug: 'C, F' },
  BG: { code: 'BGN', name: { tr: 'Bulgar Levası', en: 'Bulgarian Lev', de: 'Bulgarischer Lew' }, symbol: 'лв', callingCode: '+359', plug: 'C, F' },
  BY: { code: 'BYN', name: { tr: 'Belarus Rublesi', en: 'Belarusian Ruble', de: 'Belarussischer Rubel' }, symbol: 'Br', callingCode: '+375', plug: 'C' },
  CH: { code: 'CHF', name: { tr: 'İsviçre Frangı', en: 'Swiss Franc', de: 'Schweizer Franken' }, symbol: 'CHF', callingCode: '+41', plug: 'J' },
  CZ: { code: 'CZK', name: { tr: 'Çek Korunası', en: 'Czech Koruna', de: 'Tschechische Krone' }, symbol: 'Kč', callingCode: '+420', plug: 'C, E' },
  DK: { code: 'DKK', name: { tr: 'Danimarka Kronu', en: 'Danish Krone', de: 'Dänische Krone' }, symbol: 'kr', callingCode: '+45', plug: 'C, E, F, K' },
  GB: { code: 'GBP', name: { tr: 'İngiliz Sterlini', en: 'British Pound', de: 'Britisches Pfund' }, symbol: '£', callingCode: '+44', plug: 'G' },
  HU: { code: 'HUF', name: { tr: 'Macar Forinti', en: 'Hungarian Forint', de: 'Ungarischer Forint' }, symbol: 'Ft', callingCode: '+36', plug: 'C, F' },
  IS: { code: 'ISK', name: { tr: 'İzlanda Kronu', en: 'Icelandic Króna', de: 'Isländische Krone' }, symbol: 'kr', callingCode: '+354', plug: 'C, F' },
  MD: { code: 'MDL', name: { tr: 'Moldova Leyi', en: 'Moldovan Leu', de: 'Moldauischer Leu' }, symbol: 'L', callingCode: '+373', plug: 'C, F' },
  MK: { code: 'MKD', name: { tr: 'Makedon Dinarı', en: 'Macedonian Denar', de: 'Mazedonischer Denar' }, symbol: 'den', callingCode: '+389', plug: 'C, F' },
  NO: { code: 'NOK', name: { tr: 'Norveç Kronu', en: 'Norwegian Krone', de: 'Norwegische Krone' }, symbol: 'kr', callingCode: '+47', plug: 'C, F' },
  PL: { code: 'PLN', name: { tr: 'Polonya Zlotisi', en: 'Polish Zloty', de: 'Polnischer Zloty' }, symbol: 'zł', callingCode: '+48', plug: 'C, E' },
  RO: { code: 'RON', name: { tr: 'Rumen Leyi', en: 'Romanian Leu', de: 'Rumänischer Leu' }, symbol: 'lei', callingCode: '+40', plug: 'C, F' },
  RS: { code: 'RSD', name: { tr: 'Sırp Dinarı', en: 'Serbian Dinar', de: 'Serbischer Dinar' }, symbol: 'din', callingCode: '+381', plug: 'C, F' },
  RU: { code: 'RUB', name: { tr: 'Rus Rublesi', en: 'Russian Ruble', de: 'Russischer Rubel' }, symbol: '₽', callingCode: '+7', plug: 'C, F' },
  SE: { code: 'SEK', name: { tr: 'İsveç Kronu', en: 'Swedish Krona', de: 'Schwedische Krone' }, symbol: 'kr', callingCode: '+46', plug: 'C, F' },
  UA: { code: 'UAH', name: { tr: 'Ukrayna Grivnası', en: 'Ukrainian Hryvnia', de: 'Ukrainische Hrywnja' }, symbol: '₴', callingCode: '+380', plug: 'C, F' },

  // Kafkaslar & Orta Asya
  AM: { code: 'AMD', name: { tr: 'Ermeni Dramı', en: 'Armenian Dram', de: 'Armenischer Dram' }, symbol: '֏', callingCode: '+374', plug: 'C, F' },
  AZ: { code: 'AZN', name: { tr: 'Azerbaycan Manatı', en: 'Azerbaijani Manat', de: 'Aserbaidschan-Manat' }, symbol: '₼', callingCode: '+994', plug: 'C, F' },
  GE: { code: 'GEL', name: { tr: 'Gürcistan Larisi', en: 'Georgian Lari', de: 'Georgischer Lari' }, symbol: '₾', callingCode: '+995', plug: 'C, F' },
  KZ: { code: 'KZT', name: { tr: 'Kazakistan Tengesi', en: 'Kazakhstani Tenge', de: 'Kasachischer Tenge' }, symbol: '₸', callingCode: '+7', plug: 'C, F' },
  KG: { code: 'KGS', name: { tr: 'Kırgızistan Somu', en: 'Kyrgyzstani Som', de: 'Kirgisischer Som' }, symbol: 'som', callingCode: '+996', plug: 'C, F' },
  TJ: { code: 'TJS', name: { tr: 'Tacikistan Somonisi', en: 'Tajikistani Somoni', de: 'Tadschikischer Somoni' }, symbol: 'SM', callingCode: '+992', plug: 'C, F' },
  TM: { code: 'TMT', name: { tr: 'Türkmenistan Manatı', en: 'Turkmenistani Manat', de: 'Turkmenischer Manat' }, symbol: 'm', callingCode: '+993', plug: 'B, C' },
  UZ: { code: 'UZS', name: { tr: 'Özbekistan Somu', en: 'Uzbekistani Som', de: 'Usbekischer Som' }, symbol: 'so\'m', callingCode: '+998', plug: 'C, F' },
  MN: { code: 'MNT', name: { tr: 'Moğolistan Tugriki', en: 'Mongolian Tugrik', de: 'Mongolischer Tögrög' }, symbol: '₮', callingCode: '+976', plug: 'C, E' },

  // Asya & Pasifik
  AU: { code: 'AUD', name: { tr: 'Avustralya Doları', en: 'Australian Dollar', de: 'Australischer Dollar' }, symbol: 'A$', callingCode: '+61', plug: 'I' },
  BD: { code: 'BDT', name: { tr: 'Bangladeş Takası', en: 'Bangladeshi Taka', de: 'Bangladesch-Taka' }, symbol: '৳', callingCode: '+880', plug: 'C, D, G, K' },
  BN: { code: 'BND', name: { tr: 'Brunei Doları', en: 'Brunei Dollar', de: 'Brunei-Dollar' }, symbol: 'B$', callingCode: '+673', plug: 'G' },
  BT: { code: 'BTN', name: { tr: 'Bhutan Ngultrumu', en: 'Bhutanese Ngultrum', de: 'Bhutanischer Ngultrum' }, symbol: 'Nu.', callingCode: '+975', plug: 'C, D, G' },
  CN: { code: 'CNY', name: { tr: 'Çin Yuanı', en: 'Chinese Yuan', de: 'Chinesischer Renminbi' }, symbol: '¥', callingCode: '+86', plug: 'A, C, I' },
  HK: { code: 'HKD', name: { tr: 'Hong Kong Doları', en: 'Hong Kong Dollar', de: 'Hongkong-Dollar' }, symbol: 'HK$', callingCode: '+852', plug: 'G' },
  ID: { code: 'IDR', name: { tr: 'Endonezya Rupiahı', en: 'Indonesian Rupiah', de: 'Indonesische Rupiah' }, symbol: 'Rp', callingCode: '+62', plug: 'C, F' },
  IN: { code: 'INR', name: { tr: 'Hindistan Rupisi', en: 'Indian Rupee', de: 'Indische Rupie' }, symbol: '₹', callingCode: '+91', plug: 'C, D, M' },
  JP: { code: 'JPY', name: { tr: 'Japon Yeni', en: 'Japanese Yen', de: 'Japanischer Yen' }, symbol: '¥', callingCode: '+81', plug: 'A, B' },
  KH: { code: 'KHR', name: { tr: 'Kamboçya Rieli', en: 'Cambodian Riel', de: 'Kambodschanischer Riel' }, symbol: '៛', callingCode: '+855', plug: 'A, C, G' },
  KR: { code: 'KRW', name: { tr: 'Güney Kore Wonu', en: 'South Korean Won', de: 'Südkoreanischer Won' }, symbol: '₩', callingCode: '+82', plug: 'C, F' },
  LA: { code: 'LAK', name: { tr: 'Laos Kipi', en: 'Lao Kip', de: 'Laotischer Kip' }, symbol: '₭', callingCode: '+856', plug: 'A, B, C, E, F' },
  LK: { code: 'LKR', name: { tr: 'Sri Lanka Rupisi', en: 'Sri Lankan Rupee', de: 'Sri-Lanka-Rupie' }, symbol: 'Rs', callingCode: '+94', plug: 'D, G' },
  MM: { code: 'MMK', name: { tr: 'Myanmar Kyatı', en: 'Myanmar Kyat', de: 'Myanmar-Kyat' }, symbol: 'K', callingCode: '+95', plug: 'C, D, F, G' },
  MO: { code: 'MOP', name: { tr: 'Makao Patakası', en: 'Macanese Pataca', de: 'Macao-Pataca' }, symbol: 'MOP$', callingCode: '+853', plug: 'D, G' },
  MV: { code: 'MVR', name: { tr: 'Maldiv Rufiyaası', en: 'Maldivian Rufiyaa', de: 'Malediven-Rupie' }, symbol: 'Rf', callingCode: '+960', plug: 'D, G' },
  MY: { code: 'MYR', name: { tr: 'Malezya Ringgiti', en: 'Malaysian Ringgit', de: 'Malaysischer Ringgit' }, symbol: 'RM', callingCode: '+60', plug: 'G' },
  NP: { code: 'NPR', name: { tr: 'Nepal Rupisi', en: 'Nepalese Rupee', de: 'Nepalesische Rupie' }, symbol: 'Rs', callingCode: '+977', plug: 'C, D, M' },
  NZ: { code: 'NZD', name: { tr: 'Yeni Zelanda Doları', en: 'New Zealand Dollar', de: 'Neuseeland-Dollar' }, symbol: 'NZ$', callingCode: '+64', plug: 'I' },
  PH: { code: 'PHP', name: { tr: 'Filipin Pezosu', en: 'Philippine Peso', de: 'Philippinischer Peso' }, symbol: '₱', callingCode: '+63', plug: 'A, B, C' },
  PK: { code: 'PKR', name: { tr: 'Pakistan Rupisi', en: 'Pakistani Rupee', de: 'Pakistanische Rupie' }, symbol: '₨', callingCode: '+92', plug: 'C, D' },
  SG: { code: 'SGD', name: { tr: 'Singapur Doları', en: 'Singapore Dollar', de: 'Singapur-Dollar' }, symbol: 'S$', callingCode: '+65', plug: 'G' },
  TH: { code: 'THB', name: { tr: 'Tayland Bahtı', en: 'Thai Baht', de: 'Thailändischer Baht' }, symbol: '฿', callingCode: '+66', plug: 'A, B, C, F' },
  TW: { code: 'TWD', name: { tr: 'Yeni Tayvan Doları', en: 'New Taiwan Dollar', de: 'Neuer Taiwan-Dollar' }, symbol: 'NT$', callingCode: '+886', plug: 'A, B' },
  VN: { code: 'VND', name: { tr: 'Vietnam Dongu', en: 'Vietnamese Dong', de: 'Vietnamesischer Dong' }, symbol: '₫', callingCode: '+84', plug: 'A, C' },

  // Orta Doğu & Kuzey Afrika
  AE: { code: 'AED', name: { tr: 'BAE Dirhemi', en: 'UAE Dirham', de: 'VAE-Dirham' }, symbol: 'AED', callingCode: '+971', plug: 'G' },
  BH: { code: 'BHD', name: { tr: 'Bahreyn Dinarı', en: 'Bahraini Dinar', de: 'Bahrain-Dinar' }, symbol: 'BD', callingCode: '+973', plug: 'G' },
  DZ: { code: 'DZD', name: { tr: 'Cezayir Dinarı', en: 'Algerian Dinar', de: 'Algerischer Dinar' }, symbol: 'DA', callingCode: '+213', plug: 'C, F' },
  EG: { code: 'EGP', name: { tr: 'Mısır Lirası', en: 'Egyptian Pound', de: 'Ägyptisches Pfund' }, symbol: 'E£', callingCode: '+20', plug: 'C, F' },
  IL: { code: 'ILS', name: { tr: 'İsrail Şekeli', en: 'Israeli Shekel', de: 'Israelischer Schekel' }, symbol: '₪', callingCode: '+972', plug: 'C, H, M' },
  IQ: { code: 'IQD', name: { tr: 'Irak Dinarı', en: 'Iraqi Dinar', de: 'Irakischer Dinar' }, symbol: 'ID', callingCode: '+964', plug: 'C, D, G' },
  IR: { code: 'IRR', name: { tr: 'İran Riyali', en: 'Iranian Rial', de: 'Iranischer Rial' }, symbol: 'IR', callingCode: '+98', plug: 'C, F' },
  JO: { code: 'JOD', name: { tr: 'Ürdün Dinarı', en: 'Jordanian Dinar', de: 'Jordanischer Dinar' }, symbol: 'JD', callingCode: '+962', plug: 'B, C, D, F, G, J' },
  KW: { code: 'KWD', name: { tr: 'Kuveyt Dinarı', en: 'Kuwaiti Dinar', de: 'Kuwait-Dinar' }, symbol: 'KD', callingCode: '+965', plug: 'G' },
  LB: { code: 'LBP', name: { tr: 'Lübnan Lirası', en: 'Lebanese Pound', de: 'Libanesisches Pfund' }, symbol: 'LL', callingCode: '+961', plug: 'A, B, C, D, G' },
  LY: { code: 'LYD', name: { tr: 'Libya Dinarı', en: 'Libyan Dinar', de: 'Libyscher Dinar' }, symbol: 'LD', callingCode: '+218', plug: 'C, D, F, L' },
  MA: { code: 'MAD', name: { tr: 'Fas Dirhemi', en: 'Moroccan Dirham', de: 'Marokkanischer Dirham' }, symbol: 'DH', callingCode: '+212', plug: 'C, E' },
  OM: { code: 'OMR', name: { tr: 'Umman Riyali', en: 'Omani Rial', de: 'Omanischer Rial' }, symbol: 'RO', callingCode: '+968', plug: 'G' },
  QA: { code: 'QAR', name: { tr: 'Katar Riyali', en: 'Qatari Riyal', de: 'Katar-Riyal' }, symbol: 'QR', callingCode: '+974', plug: 'G' },
  SA: { code: 'SAR', name: { tr: 'Suudi Arabistan Riyali', en: 'Saudi Riyal', de: 'Saudi-Riyal' }, symbol: '﷼', callingCode: '+966', plug: 'G' },
  TN: { code: 'TND', name: { tr: 'Tunus Dinarı', en: 'Tunisian Dinar', de: 'Tunesischer Dinar' }, symbol: 'DT', callingCode: '+216', plug: 'C, E' },
  TR: { code: 'TRY', name: { tr: 'Türk Lirası', en: 'Turkish Lira', de: 'Türkische Lira' }, symbol: '₺', callingCode: '+90', plug: 'C, F' },

  // Amerika Kıtası
  AR: { code: 'ARS', name: { tr: 'Arjantin Pezosu', en: 'Argentine Peso', de: 'Argentinischer Peso' }, symbol: '$', callingCode: '+54', plug: 'C, I' },
  BO: { code: 'BOB', name: { tr: 'Bolivya Bolivyanosu', en: 'Bolivian Boliviano', de: 'Bolivianischer Boliviano' }, symbol: 'Bs.', callingCode: '+591', plug: 'A, C' },
  BR: { code: 'BRL', name: { tr: 'Brezilya Reali', en: 'Brazilian Real', de: 'Brasilianischer Real' }, symbol: 'R$', callingCode: '+55', plug: 'C, N' },
  CA: { code: 'CAD', name: { tr: 'Kanada Doları', en: 'Canadian Dollar', de: 'Kanadischer Dollar' }, symbol: 'C$', callingCode: '+1', plug: 'A, B' },
  CL: { code: 'CLP', name: { tr: 'Şili Pezosu', en: 'Chilean Peso', de: 'Chilenischer Peso' }, symbol: '$', callingCode: '+56', plug: 'C, L' },
  CO: { code: 'COP', name: { tr: 'Kolombiya Pezosu', en: 'Colombian Peso', de: 'Kolumbianischer Peso' }, symbol: '$', callingCode: '+57', plug: 'A, B' },
  CR: { code: 'CRC', name: { tr: 'Kosta Rika Kolonu', en: 'Costa Rican Colón', de: 'Costa-Rica-Colón' }, symbol: '₡', callingCode: '+506', plug: 'A, B' },
  CU: { code: 'CUP', name: { tr: 'Küba Pezosu', en: 'Cuban Peso', de: 'Kubanischer Peso' }, symbol: '$', callingCode: '+53', plug: 'A, B, C, L' },
  DO: { code: 'DOP', name: { tr: 'Dominik Pezosu', en: 'Dominican Peso', de: 'Dominikanischer Peso' }, symbol: 'RD$', callingCode: '+1-809', plug: 'A, B' },
  EC: { code: 'USD', name: { tr: 'Amerikan Doları', en: 'US Dollar', de: 'US-Dollar' }, symbol: '$', callingCode: '+593', plug: 'A, B' },
  GT: { code: 'GTQ', name: { tr: 'Guatemala Quetzalı', en: 'Guatemalan Quetzal', de: 'Guatemaltekischer Quetzal' }, symbol: 'Q', callingCode: '+502', plug: 'A, B' },
  MX: { code: 'MXN', name: { tr: 'Meksika Pezosu', en: 'Mexican Peso', de: 'Mexikanischer Peso' }, symbol: '$', callingCode: '+52', plug: 'A, B' },
  PA: { code: 'PAB', name: { tr: 'Panama Balboası / USD', en: 'Panamanian Balboa / USD', de: 'Panamaischer Balboa / USD' }, symbol: 'B/.', callingCode: '+507', plug: 'A, B' },
  PE: { code: 'PEN', name: { tr: 'Peru Solü', en: 'Peruvian Sol', de: 'Peruanischer Sol' }, symbol: 'S/', callingCode: '+51', plug: 'A, B, C' },
  PY: { code: 'PYG', name: { tr: 'Paraguay Guaranisi', en: 'Paraguayan Guaraní', de: 'Paraguayischer Guaraní' }, symbol: '₲', callingCode: '+595', plug: 'C' },
  US: { code: 'USD', name: { tr: 'Amerikan Doları', en: 'US Dollar', de: 'US-Dollar' }, symbol: '$', callingCode: '+1', plug: 'A, B' },
  UY: { code: 'UYU', name: { tr: 'Uruguay Pezosu', en: 'Uruguayan Peso', de: 'Uruguayischer Peso' }, symbol: '$U', callingCode: '+598', plug: 'C, F, I, L' },

  // Afrika & Diğer
  ET: { code: 'ETB', name: { tr: 'Etiyopya Biri', en: 'Ethiopian Birr', de: 'Äthiopischer Birr' }, symbol: 'Br', callingCode: '+251', plug: 'C, F, G' },
  GH: { code: 'GHS', name: { tr: 'Gana Sedisi', en: 'Ghanaian Cedi', de: 'Ghanaischer Cedi' }, symbol: 'GH₵', callingCode: '+233', plug: 'D, G' },
  KE: { code: 'KES', name: { tr: 'Kenya Şilini', en: 'Kenyan Shilling', de: 'Kenia-Schilling' }, symbol: 'KSh', callingCode: '+254', plug: 'G' },
  MU: { code: 'MUR', name: { tr: 'Mauritius Rupisi', en: 'Mauritian Rupee', de: 'Mauritius-Rupie' }, symbol: 'Rs', callingCode: '+230', plug: 'C, G' },
  NG: { code: 'NGN', name: { tr: 'Nijerya Nairası', en: 'Nigerian Naira', de: 'Nigerianischer Naira' }, symbol: '₦', callingCode: '+234', plug: 'D, G' },
  RW: { code: 'RWF', name: { tr: 'Ruanda Frangı', en: 'Rwandan Franc', de: 'Ruanda-Franc' }, symbol: 'FRw', callingCode: '+250', plug: 'C, J' },
  SC: { code: 'SCR', name: { tr: 'Seyşeller Rupisi', en: 'Seychellois Rupee', de: 'Seychellen-Rupie' }, symbol: 'SR', callingCode: '+248', plug: 'G' },
  TZ: { code: 'TZS', name: { tr: 'Tanzanya Şilini', en: 'Tanzanian Shilling', de: 'Tansania-Schilling' }, symbol: 'TSh', callingCode: '+255', plug: 'D, G' },
  ZA: { code: 'ZAR', name: { tr: 'Güney Afrika Randı', en: 'South African Rand', de: 'Südafrikanischer Rand' }, symbol: 'R', callingCode: '+27', plug: 'C, D, M, N' },

  // Avrupa & Asya Ekleri
  LI: { code: 'CHF', name: { tr: 'İsviçre Frangı', en: 'Swiss Franc', de: 'Schweizer Franken' }, symbol: 'CHF', callingCode: '+423', plug: 'C, J' },
  AF: { code: 'AFN', name: { tr: 'Afgan Afganisi', en: 'Afghan Afghani', de: 'Afghani' }, symbol: '؋', callingCode: '+93', plug: 'C, F' },
  KP: { code: 'KPW', name: { tr: 'Kuzey Kore Wonu', en: 'North Korean Won', de: 'Nordkoreanischer Won' }, symbol: '₩', callingCode: '+850', plug: 'C' },
  TL: { code: 'USD', name: { tr: 'Amerikan Doları', en: 'US Dollar', de: 'US-Dollar' }, symbol: '$', callingCode: '+670', plug: 'C, E, F, I' },
  PS: { code: 'ILS', name: { tr: 'İsrail Şekeli / Ürdün Dinarı', en: 'Israeli Shekel / JOD', de: 'Israelischer Schekel' }, symbol: '₪', callingCode: '+970', plug: 'C, H' },
  SY: { code: 'SYP', name: { tr: 'Suriye Lirası', en: 'Syrian Pound', de: 'Syrisches Pfund' }, symbol: 'LS', callingCode: '+963', plug: 'C, E, L' },
  YE: { code: 'YER', name: { tr: 'Yemen Riyali', en: 'Yemeni Rial', de: 'Jemen-Rial' }, symbol: '﷼', callingCode: '+967', plug: 'A, D, G' },

  // Afrika Ekleri
  AO: { code: 'AOA', name: { tr: 'Angola Kwanzası', en: 'Angolan Kwanza', de: 'Kwanza' }, symbol: 'Kz', callingCode: '+244', plug: 'C' },
  BF: { code: 'XOF', name: { tr: 'Batı Afrika CFA Frangı', en: 'West African CFA Franc', de: 'CFA-Franc' }, symbol: 'CFA', callingCode: '+226', plug: 'C, E' },
  BI: { code: 'BIF', name: { tr: 'Burundi Frangı', en: 'Burundian Franc', de: 'Burundi-Franc' }, symbol: 'FBu', callingCode: '+257', plug: 'C, E' },
  BJ: { code: 'XOF', name: { tr: 'Batı Afrika CFA Frangı', en: 'West African CFA Franc', de: 'CFA-Franc' }, symbol: 'CFA', callingCode: '+229', plug: 'C, E' },
  BW: { code: 'BWP', name: { tr: 'Botsvana Pulası', en: 'Botswana Pula', de: 'Botswanischer Pula' }, symbol: 'P', callingCode: '+267', plug: 'D, G' },
  CD: { code: 'CDF', name: { tr: 'Kongo Frangı', en: 'Congolese Franc', de: 'Kongo-Franc' }, symbol: 'FC', callingCode: '+243', plug: 'C, D, E' },
  CF: { code: 'XAF', name: { tr: 'Orta Afrika CFA Frangı', en: 'Central African CFA Franc', de: 'CFA-Franc BEAC' }, symbol: 'FCFA', callingCode: '+236', plug: 'C, E' },
  CG: { code: 'XAF', name: { tr: 'Orta Afrika CFA Frangı', en: 'Central African CFA Franc', de: 'CFA-Franc BEAC' }, symbol: 'FCFA', callingCode: '+242', plug: 'C, E' },
  CI: { code: 'XOF', name: { tr: 'Batı Afrika CFA Frangı', en: 'West African CFA Franc', de: 'CFA-Franc' }, symbol: 'CFA', callingCode: '+225', plug: 'C, E' },
  CM: { code: 'XAF', name: { tr: 'Orta Afrika CFA Frangı', en: 'Central African CFA Franc', de: 'CFA-Franc BEAC' }, symbol: 'FCFA', callingCode: '+237', plug: 'C, E' },
  CV: { code: 'CVE', name: { tr: 'Yeşil Burun Esküdosu', en: 'Cape Verdean Escudo', de: 'Kap-Verde-Escudo' }, symbol: 'Esc', callingCode: '+238', plug: 'C, F' },
  DJ: { code: 'DJF', name: { tr: 'Cibuti Frangı', en: 'Djiboutian Franc', de: 'Dschibuti-Franc' }, symbol: 'Fdj', callingCode: '+253', plug: 'C, E' },
  ER: { code: 'ERN', name: { tr: 'Eritre Nakfası', en: 'Eritrean Nakfa', de: 'Eritreischer Nakfa' }, symbol: 'Nfk', callingCode: '+291', plug: 'C, L' },
  GA: { code: 'XAF', name: { tr: 'Orta Afrika CFA Frangı', en: 'Central African CFA Franc', de: 'CFA-Franc BEAC' }, symbol: 'FCFA', callingCode: '+241', plug: 'C' },
  GM: { code: 'GMD', name: { tr: 'Gambiya Dalasisi', en: 'Gambian Dalasi', de: 'Dalasi' }, symbol: 'D', callingCode: '+220', plug: 'G' },
  GN: { code: 'GNF', name: { tr: 'Gine Frangı', en: 'Guinean Franc', de: 'Guinea-Franc' }, symbol: 'FG', callingCode: '+224', plug: 'C, F, K' },
  GQ: { code: 'XAF', name: { tr: 'Orta Afrika CFA Frangı', en: 'Central African CFA Franc', de: 'CFA-Franc BEAC' }, symbol: 'FCFA', callingCode: '+240', plug: 'C, E' },
  GW: { code: 'XOF', name: { tr: 'Batı Afrika CFA Frangı', en: 'West African CFA Franc', de: 'CFA-Franc' }, symbol: 'CFA', callingCode: '+245', plug: 'C' },
  KM: { code: 'KMF', name: { tr: 'Komor Frangı', en: 'Comorian Franc', de: 'Komoren-Franc' }, symbol: 'CF', callingCode: '+269', plug: 'C, E' },
  LR: { code: 'LRD', name: { tr: 'Liberya Doları', en: 'Liberian Dollar', de: 'Liberianischer Dollar' }, symbol: 'L$', callingCode: '+231', plug: 'A, B' },
  LS: { code: 'LSL', name: { tr: 'Lesotho Lotisi / ZAR', en: 'Lesotho Loti / ZAR', de: 'Lesothischer Loti' }, symbol: 'L', callingCode: '+266', plug: 'M' },
  MG: { code: 'MGA', name: { tr: 'Madagaskar Ariarisi', en: 'Malagasy Ariary', de: 'Ariary' }, symbol: 'Ar', callingCode: '+261', plug: 'C, D, E, J, K' },
  ML: { code: 'XOF', name: { tr: 'Batı Afrika CFA Frangı', en: 'West African CFA Franc', de: 'CFA-Franc' }, symbol: 'CFA', callingCode: '+223', plug: 'C, E' },
  MR: { code: 'MRU', name: { tr: 'Moritanya Ouguiyası', en: 'Mauritanian Ouguiya', de: 'Ouguiya' }, symbol: 'UM', callingCode: '+222', plug: 'C' },
  MW: { code: 'MWK', name: { tr: 'Malavi Kvaçası', en: 'Malawian Kwacha', de: 'Malawi-Kwacha' }, symbol: 'MK', callingCode: '+265', plug: 'G' },
  MZ: { code: 'MZN', name: { tr: 'Mozambik Metikali', en: 'Mozambican Metical', de: 'Metical' }, symbol: 'MT', callingCode: '+258', plug: 'C, F, M' },
  NA: { code: 'NAD', name: { tr: 'Namibya Doları / ZAR', en: 'Namibian Dollar / ZAR', de: 'Namibia-Dollar' }, symbol: 'N$', callingCode: '+264', plug: 'D, M' },
  NE: { code: 'XOF', name: { tr: 'Batı Afrika CFA Frangı', en: 'West African CFA Franc', de: 'CFA-Franc' }, symbol: 'CFA', callingCode: '+227', plug: 'A, B, C, D, E, F' },
  SD: { code: 'SDG', name: { tr: 'Sudan Lirası', en: 'Sudanese Pound', de: 'Sudanesisches Pfund' }, symbol: 'SDG', callingCode: '+249', plug: 'C, D' },
  SL: { code: 'SLE', name: { tr: 'Sierra Leone Leonesi', en: 'Sierra Leonean Leone', de: 'Leone' }, symbol: 'Le', callingCode: '+232', plug: 'D, G' },
  SN: { code: 'XOF', name: { tr: 'Batı Afrika CFA Frangı', en: 'West African CFA Franc', de: 'CFA-Franc' }, symbol: 'CFA', callingCode: '+221', plug: 'C, D, E, K' },
  SO: { code: 'SOS', name: { tr: 'Somali Şilini', en: 'Somali Shilling', de: 'Somalia-Schilling' }, symbol: 'Sh.So.', callingCode: '+252', plug: 'C' },
  SS: { code: 'SSP', name: { tr: 'Güney Sudan Lirası', en: 'South Sudanese Pound', de: 'Südsudanesisches Pfund' }, symbol: 'SS£', callingCode: '+211', plug: 'C, D' },
  ST: { code: 'STN', name: { tr: 'São Tomé Dobrası', en: 'São Tomé Dobra', de: 'Dobra' }, symbol: 'Db', callingCode: '+239', plug: 'C, F' },
  SZ: { code: 'SZL', name: { tr: 'Esvatini Lilangenisi / ZAR', en: 'Swazi Lilangeni / ZAR', de: 'Lilangeni' }, symbol: 'E', callingCode: '+268', plug: 'M' },
  TD: { code: 'XAF', name: { tr: 'Orta Afrika CFA Frangı', en: 'Central African CFA Franc', de: 'CFA-Franc BEAC' }, symbol: 'FCFA', callingCode: '+235', plug: 'C, D, E, F' },
  TG: { code: 'XOF', name: { tr: 'Batı Afrika CFA Frangı', en: 'West African CFA Franc', de: 'CFA-Franc' }, symbol: 'CFA', callingCode: '+228', plug: 'C' },
  UG: { code: 'UGX', name: { tr: 'Uganda Şilini', en: 'Ugandan Shilling', de: 'Uganda-Schilling' }, symbol: 'USh', callingCode: '+256', plug: 'G' },
  ZM: { code: 'ZMW', name: { tr: 'Zambiya Kvaçası', en: 'Zambian Kwacha', de: 'Sambischer Kwacha' }, symbol: 'ZK', callingCode: '+260', plug: 'C, D, G' },
  ZW: { code: 'USD', name: { tr: 'Amerikan Doları / ZiG', en: 'US Dollar / ZiG', de: 'US-Dollar / ZiG' }, symbol: '$', callingCode: '+263', plug: 'D, G' },

  // Karayipler & Orta Amerika Ekleri
  AG: { code: 'XCD', name: { tr: 'Doğu Karayip Doları', en: 'East Caribbean Dollar', de: 'Ostkaribischer Dollar' }, symbol: 'EC$', callingCode: '+1-268', plug: 'A, B' },
  BB: { code: 'BBD', name: { tr: 'Barbados Doları', en: 'Barbadian Dollar', de: 'Barbados-Dollar' }, symbol: 'Bds$', callingCode: '+1-246', plug: 'A, B' },
  BS: { code: 'BSD', name: { tr: 'Bahama Doları', en: 'Bahamian Dollar', de: 'Bahama-Dollar' }, symbol: 'B$', callingCode: '+1-242', plug: 'A, B' },
  BZ: { code: 'BZD', name: { tr: 'Belize Doları', en: 'Belize Dollar', de: 'Belize-Dollar' }, symbol: 'BZ$', callingCode: '+501', plug: 'A, B, G' },
  DM: { code: 'XCD', name: { tr: 'Doğu Karayip Doları', en: 'East Caribbean Dollar', de: 'Ostkaribischer Dollar' }, symbol: 'EC$', callingCode: '+1-767', plug: 'D, G' },
  GD: { code: 'XCD', name: { tr: 'Doğu Karayip Doları', en: 'East Caribbean Dollar', de: 'Ostkaribischer Dollar' }, symbol: 'EC$', callingCode: '+1-473', plug: 'G' },
  HN: { code: 'HNL', name: { tr: 'Honduras Lempirası', en: 'Honduran Lempira', de: 'Lempira' }, symbol: 'L', callingCode: '+504', plug: 'A, B' },
  HT: { code: 'HTG', name: { tr: 'Haiti Gurdu / USD', en: 'Haitian Gourde / USD', de: 'Gourde' }, symbol: 'G', callingCode: '+509', plug: 'A, B' },
  JM: { code: 'JMD', name: { tr: 'Jamaika Doları', en: 'Jamaican Dollar', de: 'Jamaika-Dollar' }, symbol: 'J$', callingCode: '+1-876', plug: 'A, B' },
  KN: { code: 'XCD', name: { tr: 'Doğu Karayip Doları', en: 'East Caribbean Dollar', de: 'Ostkaribischer Dollar' }, symbol: 'EC$', callingCode: '+1-869', plug: 'A, B, D, G' },
  LC: { code: 'XCD', name: { tr: 'Doğu Karayip Doları', en: 'East Caribbean Dollar', de: 'Ostkaribischer Dollar' }, symbol: 'EC$', callingCode: '+1-758', plug: 'G' },
  NI: { code: 'NIO', name: { tr: 'Nikaragua Kordobası', en: 'Nicaraguan Córdoba', de: 'Córdoba Oro' }, symbol: 'C$', callingCode: '+505', plug: 'A, B' },
  SV: { code: 'USD', name: { tr: 'Amerikan Doları / Bitcoin', en: 'US Dollar / Bitcoin', de: 'US-Dollar' }, symbol: '$', callingCode: '+503', plug: 'A, B' },
  TT: { code: 'TTD', name: { tr: 'Trinidad ve Tobago Doları', en: 'Trinidad and Tobago Dollar', de: 'Trinidad-und-Tobago-Dollar' }, symbol: 'TT$', callingCode: '+1-868', plug: 'A, B' },
  VC: { code: 'XCD', name: { tr: 'Doğu Karayip Doları', en: 'East Caribbean Dollar', de: 'Ostkaribischer Dollar' }, symbol: 'EC$', callingCode: '+1-784', plug: 'A, B, G' },

  // Güney Amerika Ekleri
  GY: { code: 'GYD', name: { tr: 'Guyana Doları', en: 'Guyanese Dollar', de: 'Guyana-Dollar' }, symbol: 'G$', callingCode: '+592', plug: 'A, B, D, G' },
  SR: { code: 'SRD', name: { tr: 'Surinam Doları', en: 'Surinamese Dollar', de: 'Suriname-Dollar' }, symbol: 'Sr$', callingCode: '+597', plug: 'A, B, C, F' },
  VE: { code: 'VES', name: { tr: 'Venezuela Bolivarı / USD', en: 'Venezuelan Bolívar / USD', de: 'Bolívar Soberano' }, symbol: 'Bs.', callingCode: '+58', plug: 'A, B' },

  // Okyanusya Ekleri
  FJ: { code: 'FJD', name: { tr: 'Fiji Doları', en: 'Fijian Dollar', de: 'Fidschi-Dollar' }, symbol: 'FJ$', callingCode: '+679', plug: 'I' },
  FM: { code: 'USD', name: { tr: 'Amerikan Doları', en: 'US Dollar', de: 'US-Dollar' }, symbol: '$', callingCode: '+691', plug: 'A, B' },
  KI: { code: 'AUD', name: { tr: 'Avustralya Doları', en: 'Australian Dollar', de: 'Australischer Dollar' }, symbol: 'A$', callingCode: '+686', plug: 'I' },
  MH: { code: 'USD', name: { tr: 'Amerikan Doları', en: 'US Dollar', de: 'US-Dollar' }, symbol: '$', callingCode: '+692', plug: 'A, B' },
  NR: { code: 'AUD', name: { tr: 'Avustralya Doları', en: 'Australian Dollar', de: 'Australischer Dollar' }, symbol: 'A$', callingCode: '+674', plug: 'I' },
  PG: { code: 'PGK', name: { tr: 'Papua Yeni Gine Kinası', en: 'Papua New Guinean Kina', de: 'Kina' }, symbol: 'K', callingCode: '+675', plug: 'I' },
  PW: { code: 'USD', name: { tr: 'Amerikan Doları', en: 'US Dollar', de: 'US-Dollar' }, symbol: '$', callingCode: '+680', plug: 'A, B' },
  SB: { code: 'SBD', name: { tr: 'Solomon Adaları Doları', en: 'Solomon Islands Dollar', de: 'Salomonen-Dollar' }, symbol: 'SI$', callingCode: '+677', plug: 'I, G' },
  TO: { code: 'TOP', name: { tr: 'Tonga Paʻangası', en: 'Tongan Paʻanga', de: 'Paʻanga' }, symbol: 'T$', callingCode: '+676', plug: 'I' },
  TV: { code: 'AUD', name: { tr: 'Avustralya Doları', en: 'Australian Dollar', de: 'Australischer Dollar' }, symbol: 'A$', callingCode: '+688', plug: 'I' },
  VU: { code: 'VUV', name: { tr: 'Vanuatu Vatusu', en: 'Vanuatu Vatu', de: 'Vatu' }, symbol: 'VT', callingCode: '+678', plug: 'I' },
  WS: { code: 'WST', name: { tr: 'Samoa Tâlası', en: 'Samoan Tālā', de: 'Tala' }, symbol: 'WS$', callingCode: '+685', plug: 'I' }
};

function getRegionalGeographyDefaults(code: string, capital: string, countryName: string, lang: string) {
  const match = GLOBAL_CURRENCIES[code];
  const isTr = lang === 'tr';
  const isDe = lang === 'de';
  const isEs = lang === 'es';
  const isRu = lang === 'ru';

  if (match) {
    const currName = (match.name as any)[lang] || (
      isEs ? (match.name.en || match.name.tr) : isRu ? (match.name.en || match.name.tr) : match.name.tr
    );
    return {
      majorCities: [
        capital,
        `${capital} ${isDe ? 'Metropolregion' : isEs ? 'Área Metropolitana' : isRu ? 'Метропольный регион' : isTr ? 'Metropol Bölgesi' : 'Metropolitan Area'}`,
        `${countryName} ${isDe ? 'Wirtschaftszentrum' : isEs ? 'Centro Comercial y Cultural' : isRu ? 'Торгово-культурный центр' : isTr ? 'Ticaret ve Kültür Merkezi' : 'Commercial & Cultural Hub'}`
      ],
      touristRegions: [
        `${capital} ${isDe ? 'Historisches Altstadtviertel & Museen' : isEs ? 'Centro Histórico y Museos' : isRu ? 'Исторический центр и музеи' : isTr ? 'Tarihi Şehir Merkezi & Müzeler' : 'Historic Center & Heritage Sites'}`,
        `${countryName} ${isDe ? 'UNESCO-Welterbestätten' : isEs ? 'Patrimonio de la Humanidad UNESCO' : isRu ? 'Объекты Всемирного наследия ЮНЕСКО' : isTr ? 'UNESCO Kültür Mirası Noktaları' : 'UNESCO World Heritage Sites'}`,
        `${countryName} ${isDe ? 'Nationalparks & Naturreservate' : isEs ? 'Parques Nacionales y Naturaleza' : isRu ? 'Национальные парки и природные маршруты' : isTr ? 'Milli Parklar & Doğal Rotalar' : 'National Parks & Natural Landscapes'}`
      ],
      currencyCode: match.code,
      currencyName: currName,
      currencySymbol: match.symbol,
      timeZone: 'UTC+0 - UTC+4',
      callingCode: match.callingCode || '+..',
      plugTypes: match.plug || 'C, F (230V, 50Hz)'
    };
  }

  // Varsayılan para birimi ve priz bilgisi
  const euroCountries = ['BE', 'LU', 'IE', 'FI', 'EE', 'LV', 'LT', 'SK', 'SI', 'CY', 'MT'];
  const isEuro = euroCountries.includes(code);

  return {
    majorCities: [
      capital,
      `${capital} ${isDe ? 'Metropolregion' : isEs ? 'Área Metropolitana' : isRu ? 'Метропольный регион' : isTr ? 'Metropol Bölgesi' : 'Metropolitan Area'}`,
      `${countryName} ${isDe ? 'Hafenstadt' : isEs ? 'Centro Comercial e Industrial' : isRu ? 'Промышленный и торговый центр' : isTr ? 'Ticaret ve Sanayi Kenti' : 'Coastal / Commercial Hub'}`
    ],
    touristRegions: [
      `${capital} ${isDe ? 'Historisches Altstadtviertel & Zitadelle' : isEs ? 'Casco Antiguo y Ciudadela' : isRu ? 'Старый город и крепость' : isTr ? 'Tarihi Eski Şehir & Kalesi' : 'Historic Old Town & Citadel'}`,
      `${countryName} ${isDe ? 'UNESCO-Weltkultur- & Naturerbe' : isEs ? 'Patrimonio de la Humanidad UNESCO' : isRu ? 'Объекты Всемирного наследия ЮНЕСКО' : isTr ? 'Milli Parklar & UNESCO Doğal Mirası' : 'National Parks & UNESCO Heritage'}`,
      `${countryName} ${isDe ? 'Küsten- & Seenlandschaft' : isEs ? 'Lagos y Rutas de Senderismo' : isRu ? 'Озера и живописные маршруты' : isTr ? 'Gölleri ve Doğa Yürüyüş Rotaları' : 'Scenic Coastal & Lake Shores'}`
    ],
    currencyCode: isEuro ? 'EUR' : `${code}D`,
    currencyName: isEuro ? (isRu ? 'Евро' : 'Euro') : `${countryName} ${isDe ? 'Landeswährung' : isEs ? 'Moneda Nacional' : isRu ? 'Национальная валюта' : isTr ? 'Milli Para Birimi' : 'National Currency'}`,
    currencySymbol: isEuro ? '€' : '$',
    timeZone: 'UTC+1 - UTC+3',
    callingCode: '+..',
    plugTypes: 'C, F (230V, 50Hz)'
  };
}
