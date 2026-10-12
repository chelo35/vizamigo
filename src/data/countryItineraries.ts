/**
 * Vizamigo - Ülke Bazlı Turistik Gezi Rehberi & Rota Planlama Veritabanı
 * 199 ülke için ideal gezi süreleri (kaç gün sürer), duraklar, her durakta
 * yeterli ziyaret süresi, aktiviteler, ne yenir/içilir ve dikkat edilecek kurallar.
 */

import { getCountryName } from './passportData';
import { GEO_DATA } from './geoData';
import { getCountryGeography } from './countryGeography';
import { getCountryEncyclopedia } from './countryEncyclopedia';
import { getCountryInsights } from './countryInsights';
import { CURATED_ITINERARIES_EXTRA } from './countryItinerariesExtra';
import { lText } from '../i18n';

export interface ItineraryStop {
  stopNumber: number;
  name: string; // Şehir / Bölge başlığı (örn: "Tokyo: Metropol Işıkları & Kadim Tapınaklar")
  recommendedDuration: string; // Önerilen kalış süresi (örn: "3-4 Gün (Yeterli zaman)")
  durationBadge: string; // Kısa etiket (örn: "3 Gün", "2 Gün")
  highlights: string[]; // 3-4 ikonik görülmesi gereken yer
  activities: string[]; // O zaman diliminde adım adım yapılacak aktiviteler
  foodAndDrinks: string[]; // Ne yenir ve ne içilir (yöresel lezzetler)
  criticalTips: string[]; // Nelere dikkat edilir (rezervasyon, dolandırıcılık, görgü kuralları)
  mapsQuery: string; // Google Maps arama sorgusu
}

export interface CountryTravelItinerary {
  countryCode: string;
  countryName: string;
  routeName: string; // Rotanın adı (örn: "Japonya Altın Rota: Tokyo'dan Kyoto & Osaka'ya")
  routeSummary: string; // Rota özeti / hikayesi
  totalDays: number; // Kaç gün sürer (örn: 10)
  idealDurationText: string; // Örn: "10 Günlük Klasik Rota"
  bestSeason: string; // İdeal seyahat ayları
  transportMode: string; // Ulaşım yöntemi (Hızlı tren, araç kiralama, vb.)
  paceLevel: string; // Gezi temposu: Rahat / Dengeli / Yoğun Keşif
  stops: ItineraryStop[];
  signatureGastronomy: {
    dishes: string[];
    drinks: string[];
    streetFoods: string[];
    diningAdvice: string;
  };
  packingAndPrecautions: {
    essentials: string[];
    safetyAndEtiquette: string[];
  };
}

interface CuratedStopDef {
  name: { tr: string; en: string; de: string };
  recommendedDuration: { tr: string; en: string; de: string };
  durationBadge: { tr: string; en: string; de: string };
  highlights: { tr: string[]; en: string[]; de: string[] };
  activities: { tr: string[]; en: string[]; de: string[] };
  foodAndDrinks: { tr: string[]; en: string[]; de: string[] };
  criticalTips: { tr: string[]; en: string[]; de: string[] };
  mapsQuery: string;
}

export interface CuratedItineraryDef {
  routeName: { tr: string; en: string; de: string };
  routeSummary: { tr: string; en: string; de: string };
  totalDays: number;
  idealDurationText: { tr: string; en: string; de: string };
  bestSeason: { tr: string; en: string; de: string };
  transportMode: { tr: string; en: string; de: string };
  paceLevel: { tr: string; en: string; de: string };
  stops: CuratedStopDef[];
  signatureGastronomy: {
    dishes: { tr: string[]; en: string[]; de: string[] };
    drinks: { tr: string[]; en: string[]; de: string[] };
    streetFoods: { tr: string[]; en: string[]; de: string[] };
    diningAdvice: { tr: string; en: string; de: string };
  };
  packingAndPrecautions: {
    essentials: { tr: string[]; en: string[]; de: string[] };
    safetyAndEtiquette: { tr: string[]; en: string[]; de: string[] };
  };
}

export const CURATED_ITINERARIES: Record<string, CuratedItineraryDef> = {
  // 1. TÜRKİYE (TR)
  TR: {
    routeName: {
      tr: 'Büyük Anadolu & Turkuaz Sahil: İstanbul, Kapadokya, Efes & Kaş',
      en: 'Grand Anatolia & Turquoise Coast: Istanbul, Cappadocia, Ephesus & Kas',
      de: 'Großes Anatolien & Türkische Riviera: Istanbul, Kappadokien, Ephesos & Kas'
    },
    routeSummary: {
      tr: 'İki kıtayı birleştiren metropol İstanbul’dan başlayıp peri bacalarıyla büyüleyen Kapadokya’ya, antik Ege mirası Efes’ten Akdeniz’in berrak sularına uzanan 11 günlük eksiksiz bir Türkiye keşfi.',
      en: 'An 11-day quintessential Turkish voyage starting in transcontinental Istanbul, flying over Cappadocia fairy chimneys, exploring ancient Ephesus, and relaxing along Mediterranean Turquoise shores.',
      de: 'Eine 11-tägige klassische Rundreise von der Metropole Istanbul über die Feenkamine Kappadokiens bis zum antiken Ephesos und den Traumstränden der Türkischen Riviera.'
    },
    totalDays: 11,
    idealDurationText: {
      tr: '11 Günlük İdeal Rota',
      en: '11-Day Signature Itinerary',
      de: '11-Tägige Traumroute'
    },
    bestSeason: {
      tr: 'Nisan - Haziran & Eylül - Kasım (Ilıman ve açık hava)',
      en: 'April - June & September - November (Pleasant temperatures)',
      de: 'April - Juni & September - November (Milde Temperaturen)'
    },
    transportMode: {
      tr: 'İç hat uçuşları (İstanbul - Nevşehir - İzmir) + Güneyde kiralık araç',
      en: 'Domestic flights (IST-NAV-ADB) + Rental car along the southern coast',
      de: 'Inlandsflüge (IST-NAV-ADB) + Mietwagen an der Südküste'
    },
    paceLevel: {
      tr: 'Dengeli (Kültür + Doğa + Deniz Dinlenmesi)',
      en: 'Balanced (Culture + Nature + Coastal Relaxation)',
      de: 'Ausgewogen (Kultur + Natur + Erholung)'
    },
    stops: [
      {
        name: {
          tr: '1. Durak: İstanbul (Tarihi Yarımada & Boğaz)',
          en: 'Stop 1: Istanbul (Historic Peninsula & Bosphorus)',
          de: 'Stopp 1: Istanbul (Historische Halbinsel & Bosporus)'
        },
        recommendedDuration: {
          tr: '3-4 Gün (Yeterli zaman: Başlıca miraslar için ideal)',
          en: '3-4 Days (Sufficient to explore iconic landmarks)',
          de: '3-4 Tage (Ideal für alle Hauptsehenswürdigkeiten)'
        },
        durationBadge: { tr: '3-4 Gün', en: '3-4 Days', de: '3-4 Tage' },
        highlights: {
          tr: ['Ayasofya Camii & Sultanahmet Meydanı', 'Topkapı Sarayı & Yerebatan Sarnıcı', 'Kapalıçarşı & Mısır Çarşısı', 'Boğaz Vapuru & Karaköy / Galata Kulesi'],
          en: ['Hagia Sophia & Sultanahmet Square', 'Topkapi Palace & Basilica Cistern', 'Grand Bazaar & Spice Market', 'Bosphorus Ferry & Galata Tower'],
          de: ['Hagia Sophia & Sultanahmet-Platz', 'Topkapi-Palast & Zisterne der Basilika', 'Großer Basar & Gewürzbasar', 'Bosporus-Fähre & Galataturm']
        },
        activities: {
          tr: [
            'Sabahın erken saatlerinde kalabalıklar başlamadan Sultanahmet ve Ayasofya’yı gezin.',
            'Yerebatan Sarnıcı’nın mistik aydınlatmasında yürüyüş yapın ve Topkapı Sarayı Kutsal Emanetler bölümünü görün.',
            'Eminönü’nden Kadıköy veya Üsküdar’a şehir hatları vapuruyla geçerek martılara simit atın ve Boğaz rüzgarını hissedin.',
            'Akşamüstü Galata Kulesi çevresindeki tasarım dükkanlarını ve Karaköy kafelerini keşfedin.'
          ],
          en: [
            'Tour Hagia Sophia and Blue Mosque early morning before tour buses arrive.',
            'Wander the subterranean glow of Basilica Cistern and Topkapi Palace chambers.',
            'Board a public commuter ferry across the Bosphorus to Kadikoy while feeding seagulls simit.',
            'Stroll historic Karakoy alleys and climb up to Galata Tower for twilight views.'
          ],
          de: [
            'Besichtigen Sie die Hagia Sophia und die Blaue Moschee am frühen Morgen.',
            'Erkunden Sie die leuchtende Cisterna Basilica und den Topkapi-Palast.',
            'Nehmen Sie die Bosporus-Fähre nach Kadiköy und füttern Sie Möwen mit Simit.',
            'Bummeln Sie durch Karaköy und genießen Sie das Abendlicht am Galataturm.'
          ]
        },
        foodAndDrinks: {
          tr: ['Tarihi Sultanahmet köftesi & piyaz', 'Eminönü balık ekmek veya taze deniz mahsulleri', 'Karaköy Güllüoğlu fıstıklı baklavası', 'Geleneksel Türk kahvesi & demli çay'],
          en: ['Historic Sultanahmet meatballs & bean salad', 'Bosphorus grilled fish sandwich (Balik Ekmek)', 'Karakoy pistachio baklava', 'Turkish coffee & freshly brewed black tea'],
          de: ['Sultanahmet-Köfte mit Bohnensalat', 'Gegrilltes Fischbrot (Balik Ekmek)', 'Pistazien-Baklava in Karaköy', 'Traditioneller Mokka & Cay']
        },
        criticalTips: {
          tr: [
            'İstanbulkart satın alarak metro, tramvay ve vapurları indirimli kullanın.',
            'Ayasofya ve cami ziyaretlerinde omuzları ve dizleri örten kıyafet tercih edin; kadınların başörtüsü bulundurması gerekir.',
            'Taksilerde taksimetre açılmasını talep edin veya BiTaksi / Uber mobil uygulamaları üzerinden çağırın.'
          ],
          en: [
            'Get an Istanbulkart at transit stations for seamless metro, tram, and ferry rides.',
            'Dress modestly for mosque visits (covered shoulders and knees; headscarves for women).',
            'Always request metered taxis or book rides via BiTaksi / Uber apps.'
          ],
          de: [
            'Kaufen Sie eine Istanbulkart für Busse, Bahnen und Fähren.',
            'In Moscheen dezente Kleidung tragen (Schultern und Knie bedecken; Kopftuch für Frauen).',
            'Bestehen Sie im Taxi auf das Taxameter oder nutzen Sie Apps wie BiTaksi.'
          ]
        },
        mapsQuery: 'Sultanahmet, Istanbul, Turkey'
      },
      {
        name: {
          tr: '2. Durak: Kapadokya (Göreme Peri Bacaları & Yeraltı Şehirleri)',
          en: 'Stop 2: Cappadocia (Goreme Fairy Chimneys & Underground Cities)',
          de: 'Stopp 2: Kappadokien (Göreme Feenkamine & Unterirdische Städte)'
        },
        recommendedDuration: {
          tr: '2-3 Gün (Balon uçuşu ve vadi yürüyüşleri için yeterli)',
          en: '2-3 Days (Enough for hot air ballooning and valley hiking)',
          de: '2-3 Tage (Ausreichend für Ballonfahrt und Talwanderungen)'
        },
        durationBadge: { tr: '2-3 Gün', en: '2-3 Days', de: '2-3 Tage' },
        highlights: {
          tr: ['Göreme Açık Hava Müzesi & Kaya Kiliseleri', 'Sıcak Hava Balon Turu (Gün Doğumu)', 'Derinkuyu veya Kaymaklı Yeraltı Şehri', 'Aşk Vadisi & Uçhisar Kalesi Panoraması'],
          en: ['Goreme Open Air Museum & Cave Churches', 'Sunrise Hot Air Balloon Flight', 'Derinkuyu or Kaymakli Underground City', 'Love Valley & Uchisar Castle Panoramic View'],
          de: ['Freilichtmuseum Göreme & Felsenkirchen', 'Heißluftballonfahrt zum Sonnenaufgang', 'Unterirdische Stadt Derinkuyu', 'Liebestal & Burg Uchisar']
        },
        activities: {
          tr: [
            'Şafak vaktinde yüzlerce rengarenk sıcak hava balonuyla gökyüzüne yükselin.',
            'Avanos’ta geleneksel çömlek atölyelerinde Kızılırmak kiliyle kendi çömleğinizi yapmayı deneyin.',
            'Derinkuyu yeraltı şehrinin 8 kat derinliğindeki tünellerinde tarihe tanıklık edin.',
            'Kızıl Vadi’de (Red Valley) gün batımını peri bacalarının renk değişimini izleyerek tamamlayın.'
          ],
          en: [
            'Float above lunar rock formations at sunrise in a hot air balloon.',
            'Try pottery crafting using red clay along the river workshops in Avanos.',
            'Explore 8-story deep subterranean tunnel complexes at Derinkuyu.',
            'Watch the sunset turn the sandstone pink over Red Valley.'
          ],
          de: [
            'Erleben Sie den Sonnenaufgang aus dem Heißluftballon über den Tälern.',
            'Töpfern Sie in traditionellen Werkstätten in Avanos.',
            'Erkunden Sie die Tunnel der unterirdischen Stadt Derinkuyu.',
            'Genießen Sie den Sonnenuntergang im Roten Tal (Red Valley).'
          ]
        },
        foodAndDrinks: {
          tr: ['Avanos çömlek kebabı (masada kırılan testi)', 'Kapadokya Emir üzümü yerel beyaz şarabı', 'Kayseri mantısı & pastırma', 'Kuru kaymak & tahinli cevizli pide'],
          en: ['Clay pot kebab (Testi Kebabi, cracked open tableside)', 'Local volcanic Emir grape dry white wine', 'Kayseri handmade tiny mantı dumplings', 'Dry buffalo clotted cream with local honey'],
          de: ['Tongefäß-Kebab (Testi Kebap am Tisch zerschlagen)', 'Kappadokischer Emir-Weißwein', 'Handgemachte Manti-Teigtaschen', 'Kuru Kaymak mit Honig']
        },
        criticalTips: {
          tr: [
            'Balon turları hava ve rüzgar şartlarına bağlı olarak iptal edilebilir; Kapadokya’da en az 2 sabah konaklayarak şansınızı artırın.',
            'Vadi yürüyüşleri için kaymayan tabanlı sağlam spor ayakkabısı getirin.',
            'Otel seçerken otantik mağara oteli (cave hotel) deneyimini tercih edin.'
          ],
          en: [
            'Balloon flights depend strictly on wind; book at least a 2-night stay to allow for weather reschedules.',
            'Bring sturdy trekking sneakers with grip for dusty limestone valleys.',
            'Book an authentic cave suite hotel in Goreme or Uchisar for the true experience.'
          ],
          de: [
            'Ballonfahrten hängen vom Wind ab; planen Sie mindestens 2 Nächte für Ausweichtermine ein.',
            'Feste Wanderschuhe für die sandigen Täler einpacken.',
            'Übernachten Sie in einem traditionellen Höhlenhotel.'
          ]
        },
        mapsQuery: 'Goreme, Cappadocia, Turkey'
      },
      {
        name: {
          tr: '3. Durak: Efes, Şirince & Antik Ege Mirası',
          en: 'Stop 3: Ephesus, Sirince & Ancient Aegean Heritage',
          de: 'Stopp 3: Ephesos, Sirince & Ägäisches Erbe'
        },
        recommendedDuration: {
          tr: '2 Gün (Antik kent, Meryem Ana Evi ve köy turu)',
          en: '2 Days (Ancient ruins, Virgin Mary House and village life)',
          de: '2 Tage (Antike Ausgrabungen & Bergdörfer)'
        },
        durationBadge: { tr: '2 Gün', en: '2 Days', de: '2 Tage' },
        highlights: {
          tr: ['Efes Antik Kenti & Celsus Kütüphanesi', 'Yamaç Evler (Antik Roma Mozaikleri)', 'Şirince Tarihi Rum Köyü', 'Meryem Ana Evi & Artemis Tapınağı'],
          en: ['Ephesus Ancient City & Celsus Library', 'Terrace Houses (Roman frescoes)', 'Historic Sirince Hill Village', 'House of the Virgin Mary'],
          de: ['Ephesos Ruinenstadt & Celsus-Bibliothek', 'Hanghäuser mit römischen Mosaiken', 'Dorf Sirince', 'Haus der Mutter Maria']
        },
        activities: {
          tr: [
            'Antik tiyatro ve mermer caddelerde yürüyerek Roma döneminin ihtişamını yaşayın.',
            'Zengin Romalıların duvar freskleriyle süslü Yamaç Evler bölümünü mutlaka inceleyin.',
            'Şirince sokaklarında taş konaklar arasında dolaşıp meyve şaraplarını tadın.'
          ],
          en: [
            'Walk down the Marble Street to the breathtaking facade of Celsus Library.',
            'Visit the restored Terrace Houses to see vibrant Roman mosaics and indoor heating systems.',
            'Taste artisanal fruit wines among historic stone houses in Sirince.'
          ],
          de: [
            'Spazieren Sie über die Marmorstraße zur beeindruckenden Celsus-Bibliothek.',
            'Bestaunen Sie die Mosaike in den antiken Hanghäusern.',
            'Probieren Sie Fruchtweine in den Gassen von Sirince.'
          ]
        },
        foodAndDrinks: {
          tr: ['Ege zeytinyağlı enginarı ve ot mezeleri', 'Şirince böğürtlen ve nar şarapları', 'İzmir kumrusu & boyoz', 'Çöp şiş & yayık ayran'],
          en: ['Aegean wild herbs and olive oil artichoke dishes', 'Sirince blackberry and pomegranate fruit wine', 'Izmir boyoz pastry & toasted kumru sandwich', 'Small skewered lamb kebabs (Cop Sis)'],
          de: ['Ägäische Olivenöl-Gerichte & Artischocken', 'Fruchtweine aus Sirince', 'Izmir-Kumru-Sandwich & Boyoz', 'Lammspieße mit frischem Ayran']
        },
        criticalTips: {
          tr: [
            'Yaz aylarında Efes’te gölge alan yoktur; şapka, güneş kremi ve bol su yanınızda olmalıdır.',
            'MüzeKart geçerlidir; Yamaç Evler için ek bilet gerekebilir.'
          ],
          en: [
            'Ephesus has virtually no shade; bring sunscreen, a sun hat, and plenty of drinking water.',
            'Terrace Houses require an extra entry ticket, which is well worth the cost.'
          ],
          de: [
            'Kein Schatten in den Ruinen: Sonnenschutz und Wasser unverzichtbar.',
            'Für die Hanghäuser lohnt sich das Zusatzticket absolut.'
          ]
        },
        mapsQuery: 'Ephesus, Selcuk, Turkey'
      },
      {
        name: {
          tr: '4. Durak: Kaş, Kalkan & Likya Sahili (Kekova Batık Şehir)',
          en: 'Stop 4: Kas, Kalkan & Lycian Coast (Kekova Sunken City)',
          de: 'Stopp 4: Kas, Kalkan & Lykische Küste (Versunkene Stadt Kekova)'
        },
        recommendedDuration: {
          tr: '3 Gün (Turkuaz koylar, tekne turu ve dinlenme)',
          en: '3 Days (Turquoise bays, boat tour and relaxation)',
          de: '3 Tage (Türkisfarbene Buchten, Bootstour & Entspannung)'
        },
        durationBadge: { tr: '3 Gün', en: '3 Days', de: '3 Tage' },
        highlights: {
          tr: ['Kaş Begonvilli Sokakları & Antik Tiyatro', 'Kaputaş Plajı Kanyon Koyu', 'Kekova Batık Şehir & Simena Kalesi Tekne Turu', 'Patara Kum Tepeleri & Likya Meclis Binası'],
          en: ['Kas bougainvillea cobblestones & Ancient Amphitheater', 'Kaputas Gorge Beach', 'Kekova Sunken City & Simena Castle Boat Tour', 'Patara Sand Dunes & Lycian Parliament Ruins'],
          de: ['Gassen von Kas & Antikes Theater', 'Kaputas-Strand', 'Versunkene Stadt Kekova & Burg Simena', 'Sanddünen von Patara']
        },
        activities: {
          tr: [
            'Kaş Limanı’ndan kalkan günlük tekne turuyla Kekova’nın batık lahitleri üzerinde kano yapın ve Simena’da ev yapımı keçi sütlü dondurma yiyin.',
            'Turkuaz rengiyle ünlü kanyon ağzındaki Kaputaş Plajı’nda yüzün.',
            'Akşam Kaş antik tiyatrosunda gün batımını Meis Adası manzarası eşliğinde izleyin.'
          ],
          en: [
            'Take a wooden boat to Kekova to kayak over sunken ruins and eat homemade goat milk ice cream at Simena castle.',
            'Swim in turquoise waters beneath cliffs at Kaputas Beach.',
            'Watch the sunset over the Greek island of Kastellorizo from Kas amphitheater.'
          ],
          de: [
            'Bootstour nach Kekova zur versunkenen Stadt und Ziegenmilcheis in Simena.',
            'Baden am fotogenen Strand von Kaputas.',
            'Sonnenuntergang am antiken Theater von Kas mit Blick auf Kastelorizo.'
          ]
        },
        foodAndDrinks: {
          tr: ['Taze lagos balığı ve Akdeniz mezeleri (fava, deniz börülcesi)', 'Simena ev yapımı keçi sütlü incirli dondurması', 'Meis karşısında gün batımı rakısı', 'Taze sıkılmış nar & portakal suyu'],
          en: ['Fresh white grouper fish & Mediterranean mezze (samphire, fava)', 'Simena goat-milk fig gelato', 'Sunset Turkish Raki by the harbor', 'Freshly pressed pomegranate juice'],
          de: ['Frischer Zackenbarsch & Meeresfrüchte-Vorspeisen', 'Ziegenmilch-Feigeneis in Simena', 'Raki zum Sonnenuntergang am Hafen', 'Frischer Granatapfelsaft']
        },
        criticalTips: {
          tr: [
            'Kaputaş Plajı’na giden 187 basamaklı merdiven dik iniş-çıkışlıdır; rahat terlik/ayakkabı giyin.',
            'Kaş merkezde araç park yeri bulmak zordur; yürüyerek dolaşmak daha pratiktir.'
          ],
          en: [
            'Kaputas beach has 187 steep steps; take your time going back up.',
            'Parking in central Kas is very tight; park near the entrance and explore on foot.'
          ],
          de: [
            '187 steile Stufen zum Kaputas-Strand hinab; bequeme Schuhe tragen.',
            'Parkplätze in Kas sind rar; am besten zu Fuß erkunden.'
          ]
        },
        mapsQuery: 'Kas, Antalya, Turkey'
      }
    ],
    signatureGastronomy: {
      dishes: {
        tr: ['Testi Kebabı', 'Sultanahmet Köftesi', 'Ege Zeytinyağlıları', 'Lagos Balığı & Deniz Mezeleri'],
        en: ['Pottery Kebab', 'Sultanahmet Meatballs', 'Aegean Olive Oil Dishes', 'Mediterranean Fish Mezze'],
        de: ['Testi Kebap', 'Sultanahmet-Köfte', 'Ägäische Gemüsegerichte', 'Frische Meeresfrüchte']
      },
      drinks: {
        tr: ['Demli Türk Çayı', 'Köpüklü Türk Kahvesi', 'Yayık Ayranı', 'Rakı & Şirince Şarapları'],
        en: ['Black Turkish Tea', 'Turkish Coffee', 'Frothy Ayran', 'Raki & Fruit Wines'],
        de: ['Schwarzer Cay', 'Mokka', 'Ayran', 'Raki & Ägäische Weine']
      },
      streetFoods: {
        tr: ['Susamlı Çıtır Simit', 'Balık Ekmek', 'Fıstıklı Baklava', 'Maraş Dondurması'],
        en: ['Sesame Simit Ring', 'Grilled Fish Sandwich', 'Pistachio Baklava', 'Maras Stretchy Ice Cream'],
        de: ['Simit-Sesamringe', 'Fischbrot', 'Pistazien-Baklava', 'Traditionelles Eis']
      },
      diningAdvice: {
        tr: 'Hesaplara genellikle %10 servis eklenmez veya "kuver" olarak ufak bir bedel yer alır; iyi servis için %10 bahşiş bırakmak nezaket kuralıdır.',
        en: 'A 10% tip is standard and appreciated in restaurants for attentive service. Cash is preferred for tipping even when paying by card.',
        de: 'Ein Trinkgeld von ca. 10 % ist in Restaurants üblich und wird gerne in bar hinterlassen.'
      }
    },
    packingAndPrecautions: {
      essentials: {
        tr: ['Cami ziyaretleri için şal/başörtüsü', 'Kaymayan vadi yürüyüş ayakkabısı', 'Güneş kremi ve şapka', 'Seyahat adaptörü (C/F tipi priz)'],
        en: ['Scarf/shawl for mosque visits', 'Sturdy walking shoes for valleys', 'Sunscreen and hat', 'Plug adapter type C/F (230V)'],
        de: ['Kopftuch/Schal für Moscheen', 'Feste Wanderschuhe', 'Sonnenschutz', 'Euro-Stecker (Typ C/F)']
      },
      safetyAndEtiquette: {
        tr: [
          'Havalimanı ve garlarda taksiye binerken taksimetre açılmasını talep edin veya uygulama kullanın.',
          'Kapalıçarşı ve turistik dükkanlarda güleryüzlü pazarlık yapmak kültürel bir gelenektir.',
          'İbadethanelere girerken ayakkabılar çıkarılır ve sessizliğe özen gösterilir.'
        ],
        en: [
          'Insist on metered taxis from airports or book via apps.',
          'Polite bargaining is expected in the Grand Bazaar and traditional markets.',
          'Remove shoes when entering mosques and keep your voice lowered.'
        ],
        de: [
          'Auf Taxameter bestehen oder Taxi-Apps nutzen.',
          'Auf Basaren ist freundliches Handeln üblich.',
          'In Moscheen Schuhe ausziehen und leise verhalten.'
        ]
      }
    }
  },

  // 2. JAPONYA (JP)
  JP: {
    routeName: {
      tr: 'Japonya Altın Rota: Tokyo, Hakone (Fuji), Kyoto, Nara & Osaka',
      en: 'Golden Route Japan: Tokyo, Hakone (Fuji), Kyoto, Nara & Osaka',
      de: 'Goldene Route Japan: Tokio, Hakone (Fuji), Kyoto, Nara & Osaka'
    },
    routeSummary: {
      tr: 'Geleceğin neon ışıklı metropolü Tokyo’dan başlayıp Fuji Dağı eteklerindeki kaplıcalara, Kyoto’nun bin yıllık Zen tapınaklarından Osaka’nın efsanevi sokak lezzetlerine uzanan 10 günlük kusursuz rota.',
      en: 'A 10-day masterclass itinerary linking hypermodern Tokyo, Fuji hot springs at Hakone, thousand-year-old shrines in Kyoto, bowing deer in Nara, and Osakan culinary indulgence.',
      de: 'Eine 10-tägige Traumreise vom futuristischen Tokio über den Berg Fuji und heiße Quellen in Hakone bis zu den Zen-Tempeln in Kyoto und der Streetfood-Metropole Osaka.'
    },
    totalDays: 10,
    idealDurationText: {
      tr: '10 Günlük Klasik Altın Rota',
      en: '10-Day Classic Golden Route',
      de: '10-Tage Klassische Goldene Route'
    },
    bestSeason: {
      tr: 'İlkbahar (Mart-Nisan Kiraz Çiçekleri) & Sonbahar (Kasım Kırmızı Akçaağaçlar)',
      en: 'Spring (March-April Cherry Blossoms) & Autumn (November Red Maples)',
      de: 'Frühling (Kirschblüte März-April) & Herbst (Ahornfärbung November)'
    },
    transportMode: {
      tr: 'Shinkansen Mermi Treni (JR Pass) + Dijital Suica/Pasmo Kartı',
      en: 'Shinkansen Bullet Train + Digital Suica/Pasmo Transit Card',
      de: 'Shinkansen-Hochgeschwindigkeitszug + Suica/Pasmo-Karte'
    },
    paceLevel: {
      tr: 'Dengeli & Dakik (Günde 15.000+ adım yürüyüş)',
      en: 'Active & Punctual (15,000+ steps per day)',
      de: 'Aktiv & Pünktlich (15.000+ Schritte täglich)'
    },
    stops: [
      {
        name: {
          tr: '1. Durak: Tokyo (Gelecek & Gelenek Metropolü)',
          en: 'Stop 1: Tokyo (Metropolis of Future & Tradition)',
          de: 'Stopp 1: Tokio (Metropole zwischen Moderne & Tradition)'
        },
        recommendedDuration: {
          tr: '3-4 Gün (Semtleri sindirerek gezmek için yeterli)',
          en: '3-4 Days (Adequate to explore distinct wards)',
          de: '3-4 Tage (Ideal für alle Stadtteile)'
        },
        durationBadge: { tr: '4 Gün', en: '4 Days', de: '4 Tage' },
        highlights: {
          tr: ['Asakusa Senso-ji Tapınağı & Nakamise Çarşısı', 'Shibuya Yaya Geçidi & Shibuya Sky Terası', 'Meiji Jingu Tapınağı & Harajuku', 'Akihabara & TeamLab Planets Dijital Müzesi'],
          en: ['Senso-ji Temple & Nakamise Street', 'Shibuya Crossing & Shibuya Sky Observation Deck', 'Meiji Jingu Shrine & Harajuku', 'Akihabara & TeamLab Planets Immersive Art'],
          de: ['Senso-ji Tempel & Nakamise-Dori', 'Shibuya-Kreuzung & Shibuya Sky', 'Meiji-Schrein & Harajuku', 'Akihabara & teamLab Planets']
        },
        activities: {
          tr: [
            'Sabahın sessizliğinde 7. yüzyıldan kalma Senso-ji Tapınağı’nın tütsü dumanında arının.',
            'Shibuya Yaya Geçidi’nde binlerce insanın aynı anda karşıya geçişine tanık olun ve Shibuya Sky’dan Fuji Dağı siluetini arayın.',
            'Meiji Tapınağı’nın huzurlu sedir ormanında yürüyüp ardından renkli Harajuku Takeshita Caddesi’ne geçin.',
            'TeamLab Planets müzesinde suyun ve dijital ışıkların içinde yalınayak yürüyün.'
          ],
          en: [
            'Cleanse with incense at 7th-century Senso-ji Temple in Asakusa.',
            'Cross the iconic Shibuya Scramble and take in 360-degree skyline views from Shibuya Sky.',
            'Wander the tranquil cedar forest of Meiji Shrine before stepping into vibrant Harajuku.',
            'Wade barefoot through water and light installations at teamLab Planets.'
          ],
          de: [
            'Besuchen Sie den Senso-ji-Tempel früh morgens in Asakusa.',
            'Überqueren Sie die berühmte Shibuya-Kreuzung und besuchen Sie Shibuya Sky.',
            'Spazieren Sie durch die Wälder des Meiji-Schreins nach Harajuku.',
            'Erleben Sie die digitale Kunstwelt von teamLab Planets barfuß im Wasser.'
          ]
        },
        foodAndDrinks: {
          tr: ['Tsukiji Dış Pazarı’nda taze orkinos (Otoro) suşi', 'Yoğun domuz kemiği suyuna Tonkotsu Ramen', 'Shinjuku Omoide Yokocho kömür ateşinde yakitori', 'Matcha latte & buzlu yeşil çay'],
          en: ['Fresh fatty tuna (Otoro) sushi at Tsukiji Outer Market', 'Rich Tonkotsu ramen in Shinjuku', 'Charcoal-grilled yakitori skewers in Omoide Yokocho', 'Ceremonial matcha latte & iced green tea'],
          de: ['Frisches Thunfisch-Sushi auf dem Tsukiji-Markt', 'Kräftige Tonkotsu-Ramen-Suppe', 'Yakitori-Spieße in den Gassen von Shinjuku', 'Matcha Latte & grüner Tee']
        },
        criticalTips: {
          tr: [
            'TeamLab Planets ve Shibuya Sky biletleri haftalar öncesinden tükenir; gitmeden en az 3 hafta önce online ayırtın.',
            'Japonya’da sokakta yürürken bir şeyler yemek veya içmek kaba sayılır; otomat yanında veya dükkan önünde tüketin.',
            'Toplu taşımada cep telefonuyla sesli konuşmak kesinlikle yasaktır.'
          ],
          en: [
            'Book teamLab Planets and Shibuya Sky tickets at least 3-4 weeks in advance online.',
            'Avoid eating or drinking while walking down streets; consume near vending machines or stalls.',
            'Phone conversations on trains and subways are strictly frowned upon; keep phones on silent.'
          ],
          de: [
            'Tickets für teamLab und Shibuya Sky Wochen im Voraus online buchen.',
            'Essen beim Gehen auf der Straße gilt als unhöflich.',
            'Im Zug und in der Metro gilt absolutes Telefonierverbot.'
          ]
        },
        mapsQuery: 'Shibuya Crossing, Tokyo, Japan'
      },
      {
        name: {
          tr: '2. Durak: Hakone & Fuji Dağı (Geleneksel Ryokan & Onsen)',
          en: 'Stop 2: Hakone & Mount Fuji (Traditional Ryokan & Onsen)',
          de: 'Stopp 2: Hakone & Mount Fuji (Ryokan & Heiße Quellen)'
        },
        recommendedDuration: {
          tr: '1-2 Gün (Termal dinlenme ve Fuji manzarası için yeterli)',
          en: '1-2 Days (Ideal for hot springs and Fuji scenery)',
          de: '1-2 Tage (Perfekt für Entspannung und Fuji-Blick)'
        },
        durationBadge: { tr: '1-2 Gün', en: '1-2 Days', de: '1-2 Tage' },
        highlights: {
          tr: ['Ashi Gölü Korsan Gemisi & Su Üstü Torii Kapısı', 'Hakone Teleferiği & Owakudani Kükürt Vadisi', 'Geleneksel Onsen Termal Kaplıcaları', 'Fuji Dağı Zirve Seyir Noktaları'],
          en: ['Lake Ashi Cruise & Floating Torii Gate', 'Hakone Ropeway & Owakudani Volcanic Valley', 'Natural Onsen Thermal Bath Experience', 'Mount Fuji Scenic Viewpoints'],
          de: ['Ashinoko-See & schwimmendes Torii', 'Hakone-Seilbahn & Vulkantal Owakudani', 'Traditionelles Onsen-Thermalbad', 'Aussicht auf den Berg Fuji']
        },
        activities: {
          tr: [
            'Ashi Gölü üzerinde tekneyle süzülürken Hakone Tapınağı’nın kırmızı Torii kapısını fotoğraflayın.',
            'Owakudani vadisinde kükürtlü buharlarda kaynatılan ve ömrü 7 yıl uzattığına inanılan siyah yumurtaları (Kuro-tamago) tadın.',
            'Geleneksel bir Ryokan hanında tatami minderlerinde konaklayıp sıcak termal suda yorgunluk atın.'
          ],
          en: [
            'Cruise Lake Ashi with views of Hakone Shrine’s vermilion water Torii.',
            'Eat a volcanic black egg (Kuro-tamago) cooked in sulfur vents at Owakudani.',
            'Sleep on tatami mats in a traditional Ryokan and soak in natural hot springs.'
          ],
          de: [
            'Bootsfahrt auf dem Ashi-See mit Blick auf das rote Torii.',
            'Probieren Sie die in Vulkanschwefel gekochten schwarzen Eier in Owakudani.',
            'Übernachten Sie in einem Ryokan und baden Sie im mineralreichen Onsen.'
          ]
        },
        foodAndDrinks: {
          tr: ['Kaiseki çok çeşitli mevsimlik akşam ziyafeti', 'Owakudani volkanik siyah yumurtası', 'Hakone kaynak suyuyla yapılan taze Soba eriştesi', 'Sıcak Sake (Nihonshu)'],
          en: ['Multi-course Kaiseki seasonal banquet', 'Owakudani mineral black eggs', 'Handmade buckwheat Soba noodles', 'Warm Junmai Ginjo Sake'],
          de: ['Mehrgängiges Kaiseki-Menü im Ryokan', 'Schwarze Vulkaneier', 'Handgemachte Soba-Buchweizennudeln', 'Warmer Sake']
        },
        criticalTips: {
          tr: [
            'Hakone Freepass bileti alarak teleferik, dağ treni ve göl teknesini sınırsız kullanın.',
            'Geleneksel Onsen kaplıcalarında dövme (tattoo) yasağı yaygındır; dövmeniz varsa kapatıcı bant bulundurun veya özel banyolu (kashikiri) ryokan seçin.'
          ],
          en: [
            'Purchase a Hakone Freepass for unlimited cable cars, mountain trains, and boats.',
            'Many traditional onsen still restrict visible tattoos; bring skin covers or book a private bath.'
          ],
          de: [
            'Hakone Freepass für alle Bergbahnen und Schiffe nutzen.',
            'In vielen Onsen sind Tattoos nicht gestattet; private Bäder (Kashikiri) buchen.'
          ]
        },
        mapsQuery: 'Hakone, Kanagawa, Japan'
      },
      {
        name: {
          tr: '3. Durak: Kyoto (Bin Yıllık Tapınaklar & Bambu Ormanları)',
          en: 'Stop 3: Kyoto (Millennium-Old Temples & Bamboo Groves)',
          de: 'Stopp 3: Kyoto (Jahrtausendealte Tempel & Bambuswälder)'
        },
        recommendedDuration: {
          tr: '3 Gün (Tarihi dokuyu keşfetmek için yeterli)',
          en: '3 Days (Ideal for imperial heritage and Zen gardens)',
          de: '3 Tage (Ideal für kaiserliches Erbe und Zen-Gärten)'
        },
        durationBadge: { tr: '3 Gün', en: '3 Days', de: '3 Tage' },
        highlights: {
          tr: ['Fushimi Inari-Taisha (10.000 Kırmızı Torii Kapısı)', 'Kinkaku-ji (Altın Köşk Tapınağı)', 'Arashiyama Bambu Ormanı & Maymun Parkı', 'Gion Geyşa Mahallesi & Kiyomizu-dera Ahşap Terası'],
          en: ['Fushimi Inari-Taisha (10,000 Vermilion Gates)', 'Kinkaku-ji (Golden Pavilion)', 'Arashiyama Bamboo Grove', 'Gion Geisha District & Kiyomizu-dera Wooden Stage'],
          de: ['Fushimi Inari-Schrein (10.000 rote Tore)', 'Kinkaku-ji (Goldener Pavillon)', 'Arashiyama-Bambuswald', 'Geisha-Viertel Gion & Kiyomizu-dera']
        },
        activities: {
          tr: [
            'Sabah 07:00’de turist kalabalığı başlamadan Fushimi Inari Dağı’nın kızıl tünellerinde tırmanın.',
            'Kinkaku-ji’nin göl üzerindeki yansımasını izleyip Zen bahçelerinde huzur bulun.',
            'Rüzgarda hışırdayan Arashiyama Bambu Ormanı’nda yürüyüş yapın.',
            'Alacakaranlıkta Gion sokaklarında geleneksel çay evlerine giden Geiko ve Maikoları saygıyla uzaktan gözlemleyin.'
          ],
          en: [
            'Hike the mountain path through thousands of red Torii gates at Fushimi Inari at dawn.',
            'Marvel at the shimmering reflection of the Golden Pavilion in its Zen pond.',
            'Walk under towering bamboo stalks in Arashiyama.',
            'Stroll historic wooden machiya lanes of Gion at dusk for glimpses of Geiko.'
          ],
          de: [
            'Wandern Sie früh morgens durch die Tausenden roten Tore von Fushimi Inari.',
            'Bestaunen Sie den Goldenen Pavillon am Zen-Teich.',
            'Spazieren Sie durch die hoch aufragenden Bambusstangen in Arashiyama.',
            'Erleben Sie die Atmosphäre in den Gassen von Gion am Abend.'
          ]
        },
        foodAndDrinks: {
          tr: ['Kyoto usulü Yudofu (ipek tofu güveci)', 'Uji meşhur matcha dondurması & parfe', 'Geleneksel Kyo-Kaiseki sebze tabakları', 'Hojicha kavrulmuş yeşil çay'],
          en: ['Kyoto-style Yudofu (simmered soft silken tofu)', 'Authentic Uji matcha soft-serve ice cream', 'Refined vegetarian Shojin Ryori temple cuisine', 'Roasted aromatic Hojicha tea'],
          de: ['Kyoto-Yudofu (feiner Seidentofu)', 'Original Uji-Matcha-Eiscreme', 'Vegetarische Tempelküche (Shojin Ryori)', 'Gerösteter Hojicha-Tee']
        },
        criticalTips: {
          tr: [
            'Gion mahallesindeki özel sokaklarda fotoğraf çekmek yasaktır (yüksek para cezası uygulanır); Geiko ve Maikoları asla durdurmayın veya rahatsız etmeyin.',
            'Fushimi Inari ve Arashiyama için en geç saat 07:30’da orada olun; aksi halde yoğun kalabalıktan adım atmak güçleşir.'
          ],
          en: [
            'Photography is prohibited in private alleys of Gion (steep fines); never chase or touch Geiko.',
            'Arrive at Fushimi Inari and Arashiyama by 7:30 AM to beat tour group crowds.'
          ],
          de: [
            'Fotografierverbot in privaten Gassen von Gion; Geishas niemals bedrängen.',
            'Fushimi Inari und Bambuswald vor 8:00 Uhr morgens besuchen.'
          ]
        },
        mapsQuery: 'Fushimi Inari Taisha, Kyoto, Japan'
      },
      {
        name: {
          tr: '4. Durak: Nara & Osaka (Kutsal Geyikler & Mutfak Başkenti)',
          en: 'Stop 4: Nara & Osaka (Sacred Deer & Kitchen of Japan)',
          de: 'Stopp 4: Nara & Osaka (Heilige Hirsche & Küche Japans)'
        },
        recommendedDuration: {
          tr: '2 Gün (Nara yarım gün + Osaka 1.5 gün)',
          en: '2 Days (Half day Nara + 1.5 days Osaka)',
          de: '2 Tage (Halber Tag Nara + 1.5 Tage Osaka)'
        },
        durationBadge: { tr: '2 Gün', en: '2 Days', de: '2 Tage' },
        highlights: {
          tr: ['Nara Parkı Saygıyla Eğilen Geyikler', 'Todai-ji Tapınağı & Dev Tunç Buda (Daibutsu)', 'Osaka Dotonbori Kanalı & Koşan Glico Adamı', 'Osaka Kalesi & Shinsekai Retro Mahallesi'],
          en: ['Nara Park Bowing Sika Deer', 'Todai-ji Great Wooden Temple & Giant Bronze Buddha', 'Osaka Dotonbori Canal & Neon Glico Man', 'Osaka Castle & Shinsekai Nostalgic Quarter'],
          de: ['Nara-Park mit verbeugenden Hirschen', 'Todai-ji Tempel & Großer Buddha', 'Dotonbori-Kanal & leuchtender Glico-Mann', 'Burg Osaka & Retro-Viertel Shinsekai']
        },
        activities: {
          tr: [
            'Nara Parkı’nda özel kraker (shika-senbei) alıp size selam veren geyikleri besleyin.',
            'Dünyanın en büyük ahşap yapılarından Todai-ji’deki 15 metrelik dev Buda heykelini görün.',
            'Akşam Osaka Dotonbori’de dev yengeç ve ahtapot tabelaları altında "kuidaore" (tükenene kadar yemek yeme) kültürüne dalın.'
          ],
          en: [
            'Buy deer crackers (shika-senbei) in Nara and exchange polite bows with the deer.',
            'Stand in awe before the 15-meter bronze Great Buddha inside Todai-ji.',
            'Dive into the energetic neon street food madness of Dotonbori in Osaka.'
          ],
          de: [
            'Füttern Sie die Hirsche in Nara mit speziellen Reiscrackern.',
            'Besichtigen Sie den 15 Meter hohen Bronzebuddha im Todai-ji-Tempel.',
            'Erleben Sie das pulsierende Nacht- und Streetfood-Leben in Osakas Dotonbori.'
          ]
        },
        foodAndDrinks: {
          tr: ['Osaka usulü çıtır Takoyaki (ahtapot topları)', 'Masada pişirilen lahanalı Okonomiyaki', 'Shinsekai çıtır kızartma Kushikatsu şişleri', 'Buz gibi Asahi Super Dry fıçı birası'],
          en: ['Piping hot Takoyaki octopus balls with bonito flakes', 'Savory cabbage pancake Okonomiyaki', 'Crispy panko-fried Kushikatsu skewers in Shinsekai', 'Chilled Asahi Super Dry draft beer'],
          de: ['Heiße Takoyaki-Oktopusbällchen', 'Herzhafte Okonomiyaki-Kohlpfannkuchen', 'Kushikatsu-Spieße in Shinsekai', 'Kühles Asahi-Bier']
        },
        criticalTips: {
          tr: [
            'Kushikatsu yerken kural: Ortak sosa ASLA ikinci kez batırılmaz ("No double dipping").',
            'Nara geyiklerine insan yiyeceği veya kağıt/plastik vermeyin; yalnızca onaylı shika krakeri verin.'
          ],
          en: [
            'Golden rule at Kushikatsu spots: Never double-dip skewers into the communal sauce.',
            'Only feed approved shika crackers to Nara deer; do not tease them or feed paper/plastic.'
          ],
          de: [
            'Beim Kushikatsu-Essen niemals zweimal in die gemeinsame Soße tunken.',
            'Hirsche in Nara nur mit speziellen Crackern füttern.'
          ]
        },
        mapsQuery: 'Dotonbori, Osaka, Japan'
      }
    ],
    signatureGastronomy: {
      dishes: {
        tr: ['Tonkotsu Ramen', 'Nigiri & Sashimi Suşi', 'Kobe & Wagyu Eti', 'Okonomiyaki & Takoyaki'],
        en: ['Tonkotsu Ramen', 'Artisanal Nigiri Sushi', 'Wagyu & Kobe Beef', 'Okonomiyaki & Takoyaki'],
        de: ['Tonkotsu Ramen', 'Frisches Sushi', 'Wagyu-Rindfleisch', 'Okonomiyaki']
      },
      drinks: {
        tr: ['Matcha Çayı', 'Nihonshu (Pirinç Şarabı/Sake)', 'Umeshu (Japon Erik Likörü)', 'Japon Bira Çeşitleri'],
        en: ['Matcha Green Tea', 'Junmai Sake', 'Umeshu Plum Wine', 'Japanese Draft Beers'],
        de: ['Matcha-Tee', 'Sake-Reiswein', 'Umeshu-Pflaumenwein', 'Japanisches Bier']
      },
      streetFoods: {
        tr: ['Takoyaki', 'Yakitori', 'Taiyaki (balık şekilli tatlı)', 'Dango Pirinç Tatlısı'],
        en: ['Takoyaki Balls', 'Yakitori Skewers', 'Taiyaki Waffles', 'Mitarashi Dango'],
        de: ['Takoyaki', 'Yakitori-Spieße', 'Taiyaki-Waffeln', 'Dango']
      },
      diningAdvice: {
        tr: 'Japonya’da bahşiş kültürü KESİNLİKLE YOKTUR. Masaya para bırakmak veya bahşiş vermek saygısızlık kabul edilir ve garson parayı geri vermek için peşinizden koşabilir.',
        en: 'Tipping is NOT customary in Japan and is considered rude. The price on the bill is final and complete.',
        de: 'In Japan gibt es KEIN Trinkgeld. Zusätzliches Geld zu hinterlassen gilt als unhöflich.'
      }
    },
    packingAndPrecautions: {
      essentials: {
        tr: ['Kolay çıkarılıp giyilen bağcıksız ayakkabılar (tapınak ve lokantalar için)', 'Taşınabilir şarj cihazı (Powerbank)', 'Dijital Suica/Pasmo kartı telefonunuzda', 'Japon priz dönüştürücü (A tipi - 100V)'],
        en: ['Slip-on shoes easy to take off for temples/restaurants', 'Portable powerbank', 'Suica card in Apple/Google Wallet', 'Type A plug adapter (100V)'],
        de: ['Bequeme Schuhe zum schnellen Ausziehen', 'Powerbank', 'Suica-Karte auf dem Smartphone', 'Adapter Typ A']
      },
      safetyAndEtiquette: {
        tr: [
          'Tokyo Kabukicho ve Roppongi sokaklarındaki çığırtkanların (touts) davet ettiği kulüplere asla girmeyin.',
          'Şehirlerde çöp kutusu bulmak zordur; küçük bir çöp torbası taşıyıp çöplerinizi otelinize götürün.',
          'Yürüyen merdivenlerde Tokyo’da sol tarafta, Osaka’da ise sağ tarafta durulur.'
        ],
        en: [
          'Never follow street touts in Roppongi or Kabukicho into bars.',
          'Carry a small plastic bag for your trash as public bins are rare.',
          'Stand on the left on escalators in Tokyo, but on the right in Osaka.'
        ],
        de: [
          'Folgen Sie keinen Schleppern in Kabukicho oder Roppongi.',
          'Mülleimer sind selten; Müllbeutel für den Tag mitführen.',
          'Auf Rolltreppen in Tokio links stehen, in Osaka rechts.'
        ]
      }
    }
  },

  // 3. İTALYA (IT)
  IT: {
    routeName: {
      tr: 'Büyük İtalyan Klasiği: Roma, Floransa, Venedik & Toskana Vadileri',
      en: 'The Grand Italian Classic: Rome, Florence, Venice & Tuscan Hills',
      de: 'Der italienische Klassiker: Rom, Florenz, Venedig & die Toskana'
    },
    routeSummary: {
      tr: 'Antik dünyanın kalbi Roma’dan başlayıp Rönesans başkenti Floransa’ya, selvi ağaçlarıyla kaplı Toskana bağlarından sular üstündeki Venedik masalına uzanan 10 günlük olağanüstü sanat ve lezzet rotası.',
      en: 'A 10-day master itinerary connecting imperial Rome, Renaissance Florence, golden Tuscan vineyards, and the timeless waterways of Venice.',
      de: 'Eine 10-tägige Reise von der Ewigen Stadt Rom über die Renaissance-Metropole Florenz und die Hügel der Toskana bis zu den Lagunen von Venedig.'
    },
    totalDays: 10,
    idealDurationText: {
      tr: '10 Günlük Klasik Rota',
      en: '10-Day Signature Itinerary',
      de: '10-Tägige Traumroute'
    },
    bestSeason: {
      tr: 'Nisan - Mayıs & Eylül - Ekim (Aşırı yaz sıcağından ve kalabalıktan kaçınmak için)',
      en: 'April - May & September - October (Avoid intense summer heat)',
      de: 'April - Mai & September - Oktober (Angenehme Temperaturen)'
    },
    transportMode: {
      tr: 'Frecciarossa Yüksek Hızlı Treni (Roma - Floransa - Venedik) + Toskana için kiralık araç',
      en: 'Frecciarossa High-Speed Rail + Rental car for rural Tuscany',
      de: 'Frecciarossa-Hochgeschwindigkeitszug + Mietwagen für die Toskana'
    },
    paceLevel: {
      tr: 'Dengeli & Sanat Odaklı',
      en: 'Balanced & Art-Focused',
      de: 'Ausgewogen & Kulturorientiert'
    },
    stops: [
      {
        name: {
          tr: '1. Durak: Roma (Ebedi Şehir & Vatikan)',
          en: 'Stop 1: Rome (The Eternal City & Vatican)',
          de: 'Stopp 1: Rom (Ewige Stadt & Vatikan)'
        },
        recommendedDuration: {
          tr: '3-4 Gün (Antik kalıntılar ve Vatikan için yeterli)',
          en: '3-4 Days (Sufficient for imperial forum & Vatican)',
          de: '3-4 Tage (Ideal für Antike & Vatikan)'
        },
        durationBadge: { tr: '3-4 Gün', en: '3-4 Days', de: '3-4 Tage' },
        highlights: {
          tr: ['Kolezyum & Roma Forumu', 'Vatikan Müzeleri & Sistina Şapeli', 'Trevi Çeşmesi & Panteon', 'Trastevere Tarihi Sokakları'],
          en: ['Colosseum & Roman Forum', 'Vatican Museums & Sistine Chapel', 'Trevi Fountain & Pantheon', 'Trastevere Bohemian Alleys'],
          de: ['Kolosseum & Forum Romanum', 'Vatikanische Museen & Sixtinische Kapelle', 'Trevi-Brunnen & Pantheon', 'Trastevere']
        },
        activities: {
          tr: [
            'Kolezyum gladyatör arenasında antik tarihin ayak seslerini dinleyin.',
            'Vatikan Müzesi’nde Michelangelo’nun Sistina Şapeli tavan fresklerini hayranlıkla izleyin.',
            'Trevi Çeşmesi’ne Roma’ya tekrar gelmek dileğiyle omzunuzun üzerinden para atın.',
            'Akşam sarmaşıklarla kaplı Trastevere sokaklarındaki otantik trattorialarda makarna yiyin.'
          ],
          en: [
            'Walk through the arena floor of the Colosseum and imagine ancient gladiators.',
            'Gaze at Michelangelo’s ceiling in the Sistine Chapel at the Vatican.',
            'Toss a coin into the Trevi Fountain to guarantee your return to Rome.',
            'Dine in ivy-draped trattorias across the bohemian Trastevere neighborhood.'
          ],
          de: [
            'Erkunden Sie das Kolosseum und das Forum Romanum.',
            'Bestaunen Sie Michelangelos Deckenfresken in der Sixtinischen Kapelle.',
            'Werfen Sie eine Münze in den Trevi-Brunnen.',
            'Genießen Sie den Abend in den Trattorien von Trastevere.'
          ]
        },
        foodAndDrinks: {
          tr: ['Özgün Roma Cacio e Pepe makarnası', 'Guanciale etli Carbonara', 'Roma çıtır ince hamur pizzası', 'Aperol Spritz & İtalyan Gelato dondurması'],
          en: ['Authentic Roman Cacio e Pepe pasta', 'Creamy Carbonara made with crispy guanciale', 'Roman thin crispy pizza', 'Aperol Spritz & handcrafted Gelato'],
          de: ['Cacio e Pepe Pasta', 'Originale Spaghetti Carbonara', 'Römische Pizza', 'Aperol Spritz & Gelato']
        },
        criticalTips: {
          tr: [
            'Kolezyum ve Vatikan biletleri en az 1-2 ay önceden resmi sitelerinden alınmalıdır; kapıda saatlerce sıra beklemeyin.',
            'Termini tren istasyonu ve metro hatlarında yankesicilere karşı cüzdan ve telefonunuza dikkat edin.'
          ],
          en: [
            'Book Colosseum and Vatican tickets online 1-2 months in advance.',
            'Keep watchful guard over bags on Metro lines and around Termini Station.'
          ],
          de: [
            'Tickets für Kolosseum und Vatikan Monate im Voraus online buchen.',
            'Vorsicht vor Taschendieben am Bahnhof Termini und in der Metro.'
          ]
        },
        mapsQuery: 'Colosseum, Rome, Italy'
      },
      {
        name: {
          tr: '2. Durak: Floransa & Toskana Vadileri (Rönesans & Chianti)',
          en: 'Stop 2: Florence & Tuscan Countryside (Renaissance & Chianti)',
          de: 'Stopp 2: Florenz & Toskana (Renaissance & Weinberge)'
        },
        recommendedDuration: {
          tr: '3 Gün (Şehir sanatı 2 gün + Val d’Orcia köyleri 1 gün)',
          en: '3 Days (City art 2 days + countryside 1 day)',
          de: '3 Tage (Kultur 2 Tage + Landschaft 1 Tag)'
        },
        durationBadge: { tr: '3 Gün', en: '3 Days', de: '3 Tage' },
        highlights: {
          tr: ['Floransa Duomo Katedrali (Brunelleschi Kubbesi)', 'Uffizi Galerisi (Botticelli & Leonardo)', 'Ponte Vecchio Köprüsü', 'Val d’Orcia Selvi Yolları & San Gimignano Kuleleri'],
          en: ['Florence Duomo & Brunelleschi Dome', 'Uffizi Gallery (Botticelli & Da Vinci)', 'Ponte Vecchio Bridge', 'Val d’Orcia Cypress Avenues & San Gimignano Towers'],
          de: ['Dom von Florenz & Kuppel', 'Uffizien-Galerie', 'Ponte Vecchio', 'Val d’Orcia & San Gimignano']
        },
        activities: {
          tr: [
            'Duomo Katedrali’nin kubbesine 463 basamak tırmanıp Floransa’nın kızıl çatılarını seyredin.',
            'Uffizi Galerisi’nde Botticelli’nin Venüs’ün Doğuşu tablosunu yakından görün.',
            'Toskana’nın bağ yollarında Chianti şaraphanelerini ziyaret edip zeytinyağı tadımı yapın.'
          ],
          en: [
            'Climb the 463 steps of Brunelleschi’s Dome for sweeping city vistas.',
            'See Botticelli’s Birth of Venus at the Uffizi Gallery.',
            'Drive through rolling hills of Chianti for wine and olive oil tastings.'
          ],
          de: [
            'Besteigen Sie die Domkuppel für den besten Panoramablick.',
            'Besichtigen Sie Botticellis Venus in den Uffizien.',
            'Fahrt durch die Weinberge des Chianti mit Weinverkostung.'
          ]
        },
        foodAndDrinks: {
          tr: ['Bistecca alla Fiorentina (dev T-bone biftek)', 'Chianti Classico kırmızı şarabı', 'Taze Cantuccini bisküvisi & Vin Santo tatlı şarabı', 'Ribollita sebze çorbası'],
          en: ['Bistecca alla Fiorentina dry-aged T-bone steak', 'Chianti Classico DOCG red wine', 'Almond cantuccini dipped in Vin Santo dessert wine', 'Hearty Tuscan Ribollita soup'],
          de: ['Bistecca alla Fiorentina', 'Chianti Classico Rotwein', 'Cantuccini mit Vin Santo', 'Toskanische Ribollita']
        },
        criticalTips: {
          tr: [
            'Floransa merkezinde ZTL (Trafiğe Kapalı Alan) kameraları aktiftir; kiralık araçla tarihi merkeze girmeyin, ağır cezalar yazılır.',
            'Uffizi ve Akademi Galerisi için biletlerinizi önceden ayırtın.'
          ],
          en: [
            'Never drive into Florence’s historic center (ZTL camera-enforced zone); fines are hefty.',
            'Pre-book Uffizi Gallery and Accademia tickets to see Michelangelo’s David.'
          ],
          de: [
            'Nicht mit dem Mietwagen in die historische Innenstadt (ZTL-Zone) fahren.',
            'Tickets für die Uffizien und Michelangelos David vorab reservieren.'
          ]
        },
        mapsQuery: 'Duomo, Florence, Italy'
      },
      {
        name: {
          tr: '3. Durak: Venedik (Kanallar & San Marco Meydanı)',
          en: 'Stop 3: Venice (Canals & Piazza San Marco)',
          de: 'Stopp 3: Venedik (Kanäle & Markusplatz)'
        },
        recommendedDuration: {
          tr: '2-3 Gün (Ana ada ve Burano renkli adası için yeterli)',
          en: '2-3 Days (Enough for main canals and Burano lace island)',
          de: '2-3 Tage (Perfekt für Lagune und Insel Burano)'
        },
        durationBadge: { tr: '2-3 Gün', en: '2-3 Days', de: '2-3 Tage' },
        highlights: {
          tr: ['San Marco Meydanı & Bazilikası', 'Dükler Sarayı (Palazzo Ducale) & Ahlar Köprüsü', 'Büyük Kanal Vaporetto Turu', 'Burano Renkli Balıkçı Evleri & Murano Cam Atölyeleri'],
          en: ['St. Mark’s Square & Golden Basilica', 'Doge’s Palace & Bridge of Sighs', 'Grand Canal Vaporetto cruise', 'Burano vivid colored houses & Murano glass workshops'],
          de: ['Markusplatz & Markuskirche', 'Dogenpalast & Seufzerbrücke', 'Vaporetto-Fahrt auf dem Canal Grande', 'Bunte Insel Burano & Murano']
        },
        activities: {
          tr: [
            '1 No’lu Vaporetto (deniz otobüsü) ile Büyük Kanal boyunca tarihi sarayları seyrederek süzülün.',
            'Turist kalabalığından uzaklaşıp Cannaregio mahallesinin sessiz köprülerinde kaybolun.',
            'Venedik’in geleneksel bar kültüründe (Bacaro) şarap ve minik atıştırmalıklar (Cicchetti) tadın.'
          ],
          en: [
            'Take Vaporetto Line 1 for a slow glide down the Grand Canal past Gothic palazzos.',
            'Get lost among quiet bridges and cobblestones in the authentic Cannaregio quarter.',
            'Hop between traditional Bacari wine bars savoring small Cicchetti bites.'
          ],
          de: [
            'Fahrt mit der Vaporetto-Linie 1 über den Canal Grande.',
            'Spaziergang durch die ruhigen Gassen von Cannaregio.',
            'Besuch traditioneller Bacari-Weinbars mit Cicchetti-Häppchen.'
          ]
        },
        foodAndDrinks: {
          tr: ['Venedik Cicchetti tapas atıştırmalıkları (Bacalà mantecato)', 'Siyah mürekkep balıklı spagetti (Nero di Seppia)', 'Orijinal Venedik Bellini kokteyli', 'Tiramisu (Treviso kökenli)'],
          en: ['Venetian Cicchetti bites with whipped salted cod (Bacala Mantecato)', 'Squid ink pasta (Spaghetti al Nero di Seppia)', 'Fresh peach Bellini cocktail', 'Original artisan Tiramisu'],
          de: ['Cicchetti-Vorspeisenhappen', 'Spaghetti mit Tintenfischtinte', 'Original Bellini-Cocktail', 'Klassisches Tiramisu']
        },
        criticalTips: {
          tr: [
            'Venedik günübirlik giriş ücreti (Contributo di Accesso) belirli yoğun günlerde zorunludur; online QR kodunuzu hazır bulundurun.',
            'San Marco Meydanı’ndaki kafe teraslarında orkestra dinleme ücreti hesaba fahiş şekilde yansıyabilir; fiyat menüsünü kontrol edin.'
          ],
          en: [
            'Day-trippers must register for Venice’s access fee QR code on peak designated days.',
            'Sitting at outdoor orchestra cafes on St. Mark’s Square incurs steep music surcharges.'
          ],
          de: [
            'An bestimmten Spitzentagen ist die Venedig-Eintrittsgebühr (QR-Code) Pflicht.',
            'Cafés am Markusplatz verlangen oft hohe Aufschläge für Live-Musik.'
          ]
        },
        mapsQuery: 'Piazza San Marco, Venice, Italy'
      }
    ],
    signatureGastronomy: {
      dishes: {
        tr: ['Carbonara & Cacio e Pepe', 'Bistecca alla Fiorentina', 'Napoletana Pizza', 'Risotto alla Milanese'],
        en: ['Carbonara & Cacio e Pepe', 'Florentine T-Bone Steak', 'Neapolitan Pizza', 'Risotto alla Milanese'],
        de: ['Carbonara & Cacio e Pepe', 'Florentiner Steak', 'Neapolitanische Pizza', 'Safran-Risotto']
      },
      drinks: {
        tr: ['Aperol Spritz & Campari', 'Chianti & Barolo Şarapları', 'Espresso & Cappuccino', 'Limoncello'],
        en: ['Aperol Spritz', 'Chianti & Barolo Wines', 'Italian Espresso', 'Limoncello Liqueur'],
        de: ['Aperol Spritz', 'Chianti-Rotwein', 'Espresso', 'Limoncello']
      },
      streetFoods: {
        tr: ['Artisan Gelato Dondurma', 'Trapizzino & Pizza al Taglio', 'Suppli & Arancini pirinç topları', 'Cannoli'],
        en: ['Artisan Gelato', 'Pizza al Taglio slices', 'Suppli & Arancini rice croquettes', 'Cannoli'],
        de: ['Gelato', 'Pizza-Stücke auf die Hand', 'Arancini-Reisbällchen', 'Cannoli']
      },
      diningAdvice: {
        tr: 'İtalya’da masaya oturduğunuzda kuver ve ekmek ücreti (Coperto, kişi başı 2-4€) yasal olarak hesaba eklenir. Bahşiş zorunlu değildir ancak bozuk para bırakmak makbuldür. Saat 11:00’den sonra Cappuccino içilmez.',
        en: 'A bread/table fee (Coperto, €2-4 per person) is standard on bills. Tipping is optional. Drinking Cappuccino after 11 AM is considered a faux pas.',
        de: 'Ein Gedeckpreis (Coperto, 2-4 € p.P.) ist üblich. Trinkgeld ist freiwillig. Nach 11 Uhr vormittags wird traditionell kein Cappuccino mehr getrunken.'
      }
    },
    packingAndPrecautions: {
      essentials: {
        tr: ['Kilise ziyaretleri için omuz ve dizleri örten giysiler', 'Parke taşlı sokaklar için rahat spor ayakkabı', 'Tekrar doldurulabilir su matarası (Nasoni çeşmeleri için)', 'C/F tipi priz adaptörü'],
        en: ['Modest attire covering shoulders and knees for churches', 'Comfortable flat walking shoes for cobblestones', 'Refillable water bottle for Rome’s free drinking fountains', 'Euro plug adapter'],
        de: ['Kleidung mit bedeckten Schultern/Knien für Kirchen', 'Bequeme flache Schuhe für Kopfsteinpflaster', 'Trinkflasche für öffentliche Brunnen', 'Euro-Stecker']
      },
      safetyAndEtiquette: {
        tr: [
          'Roma Termini istasyonu, Kolezyum çevresi ve metro hatlarında bilet makinelerinde yardım bahanesiyle yaklaşanlara ve yankesicilere prim vermeyin.',
          'Kolezyum çevresindeki gladyatör kostümlü kişilerle fotoğraf çektirmeyin; sonrasında zorla 20-50€ talep ederler.',
          'Restoranlarda fahiş fiyatlardan kaçınmak için turistik anıtların 2 sokak arkasındaki trattoriaları tercih edin.'
        ],
        en: [
          'Beware of pickpockets on crowded Rome Metro trains and around Termini station.',
          'Avoid posing with costume gladiators outside the Colosseum as they aggressively demand cash.',
          'Eat 2-3 blocks away from major monuments for superior food and honest prices.'
        ],
        de: [
          'Taschendiebe in der Metro und am Bahnhof Termini beachten.',
          'Keine Fotos mit als Gladiatoren verkleideten Personen am Kolosseum machen.',
          'Essen Sie abseits der Touristenmagistralen für bessere Qualität.'
        ]
      }
    }
  },

  // 4. FRANSA (FR)
  FR: {
    routeName: {
      tr: 'Işıklar Şehri & Fransız Rivierası: Paris, Şatolar & Nice / Monaco',
      en: 'City of Light & French Riviera: Paris, Châteaux & Nice / Monaco',
      de: 'Stadt des Lichts & Französische Riviera: Paris, Schlösser & Nizza'
    },
    routeSummary: {
      tr: 'Paris’in dünyaca ünlü anıtları ve sanat müzelerinden başlayıp görkemli Versay Sarayı’na, ardından güneye inerek Akdeniz kıyılarındaki Nice ve Monaco’nun zarafetine uzanan 9 günlük unutulmaz gezi.',
      en: 'A 9-day French journey pairing the romantic boulevards and museums of Paris with Versailles grandeur, followed by the sun-drenched glamor of Nice and the Côte d’Azur.',
      de: 'Eine 9-tägige Traumreise von den Boulevards und Museen in Paris über das Schloss Versailles bis zur sonnigen Côte d’Azur nach Nizza und Monaco.'
    },
    totalDays: 9,
    idealDurationText: {
      tr: '9 Günlük İdeal Rota',
      en: '9-Day Signature Route',
      de: '9-Tage Rundreise'
    },
    bestSeason: {
      tr: 'Mayıs - Haziran & Eylül - Ekim (Ilık hava ve açık teraslar)',
      en: 'May - June & September - October (Pleasant terrace weather)',
      de: 'Mai - Juni & September - Oktober (Angenehmes Wetter für Straßencafés)'
    },
    transportMode: {
      tr: 'TGV Hızlı Treni (Paris - Nice) + Paris Metrosu',
      en: 'TGV High-Speed Train (Paris to Nice) + Paris Metro',
      de: 'TGV-Hochgeschwindigkeitszug (Paris nach Nizza) + Metro'
    },
    paceLevel: {
      tr: 'Dengeli & Kültürel Zarafet',
      en: 'Refined & Cultural',
      de: 'Kultiviert & Ausgewogen'
    },
    stops: [
      {
        name: {
          tr: '1. Durak: Paris (Işıklar Şehri & Sanat Merkezleri)',
          en: 'Stop 1: Paris (City of Light & Art Sanctuaries)',
          de: 'Stopp 1: Paris (Stadt des Lichts & Kunsttempel)'
        },
        recommendedDuration: {
          tr: '4 Gün (Müzeler ve tarihi mahalleler için yeterli)',
          en: '4 Days (Sufficient for premier museums and neighborhoods)',
          de: '4 Tage (Ideal für Museen und Stadtviertel)'
        },
        durationBadge: { tr: '4 Gün', en: '4 Days', de: '4 Tage' },
        highlights: {
          tr: ['Eyfel Kulesi & Şanzelize (Champs-Élysées)', 'Louvre Müzesi & Mona Lisa', 'Orsay Müzesi & Montmartre Sacré-Cœur', 'Seine Nehri Tekne Turu & Notre Dame'],
          en: ['Eiffel Tower & Champs-Élysées', 'Louvre Museum & Mona Lisa', 'Musée d’Orsay & Montmartre Sacré-Cœur', 'Seine River Cruise & Notre Dame'],
          de: ['Eiffelturm & Champs-Élysées', 'Louvre-Museum & Mona Lisa', 'Musée d’Orsay & Montmartre', 'Seine-Bootsfahrt & Notre-Dame']
        },
        activities: {
          tr: [
            'Akşam saat başı ışıkları yanıp sönen Eyfel Kulesi’ni Champ de Mars çimlerinden izleyin.',
            'Louvre Müzesi’nde antik Yunan heykelleri ve Mona Lisa’yı erken saatlerde görün.',
            'Montmartre tepelerinde sanatçılar meydanında portrenizi çizdirip Sacré-Cœur merdivenlerinden Paris manzarasını seyredin.',
            'Seine Nehri üzerinde akşam vapur turu yaparak tarihi köprülerin altından geçin.'
          ],
          en: [
            'Watch the sparkling light show on the Eiffel Tower from Champ de Mars.',
            'Explore the wings of the Louvre early morning to admire the Mona Lisa.',
            'Wander bohemian Montmartre alleys and sit on the Sacré-Cœur steps for twilight views.',
            'Cruise down the Seine on an open-air riverboat past historic bridges.'
          ],
          de: [
            'Bestaunen Sie das Glitzern des Eiffelturms am Abend.',
            'Erkunden Sie den Louvre am frühen Morgen.',
            'Spaziergang durch Montmartre und Ausblick von Sacré-Cœur.',
            'Abendliche Bootsfahrt auf der Seine.'
          ]
        },
        foodAndDrinks: {
          tr: ['Tereyağlı taze Kruvasan & Cafe au Lait', 'Geleneksel Fransız Soğan Çorbası (Gratinée)', 'Boeuf Bourguignon güveci', 'Bordeaux kırmızı şarabı & Makaron tatlıları'],
          en: ['Flaky all-butter croissant & Café au lait', 'French Onion Soup gratinée with Gruyère', 'Slow-cooked Boeuf Bourguignon', 'Bordeaux red wine & Ladurée macarons'],
          de: ['Buttercroissant & Café au Lait', 'Französische Zwiebelsuppe', 'Boeuf Bourguignon', 'Bordeaux-Rotwein & Macarons']
        },
        criticalTips: {
          tr: [
            'Sacré-Cœur merdivenlerinde zorla bileğe ip bağlayan dolandırıcılardan (bracelet scam) uzak durun; elinizi vermeyin.',
            'Metro istasyonlarında ve Louvre çevresinde sahte imza dilekçesi taşıyan kişilere dikkat edin.',
            'Louvre ve Eyfel biletlerini haftalar öncesinden resmi web sitelerinden zaman dilimli olarak ayırtın.'
          ],
          en: [
            'Beware of the friendship bracelet scam on the steps below Sacré-Cœur; walk past firmly.',
            'Watch for clipboard distraction pickpockets near the Eiffel Tower and Louvre.',
            'Pre-book timed-entry slots for the Louvre and Eiffel Tower weeks in advance.'
          ],
          de: [
            'Meiden Sie Armband-Verkäufer an den Treppen von Sacré-Cœur.',
            'Vorsicht vor Taschendieben mit falschen Unterschriftenlisten.',
            'Tickets für Eiffelturm und Louvre Wochen im Voraus reservieren.'
          ]
        },
        mapsQuery: 'Eiffel Tower, Paris, France'
      },
      {
        name: {
          tr: '2. Durak: Versay Sarayı (Güneş Kralı’nın İhtişamı)',
          en: 'Stop 2: Palace of Versailles (Sun King Grandeur)',
          de: 'Stopp 2: Schloss Versailles (Sonnenkönig-Prunk)'
        },
        recommendedDuration: {
          tr: '1 Gün (Saray, Aynalı Salon ve bahçeler için yeterli)',
          en: '1 Day (Palace, Hall of Mirrors & Royal Gardens)',
          de: '1 Tag (Schloss, Spiegelsaal & Gärten)'
        },
        durationBadge: { tr: '1 Gün', en: '1 Day', de: '1 Tag' },
        highlights: {
          tr: ['Aynalı Salon (Galerie des Glaces)', 'Kraliyet Bahçeleri & Fıskiye Gösterileri', 'Marie Antoinette’in Çiftliği (Hameau de la Reine)', 'Büyük Trianon Sarayı'],
          en: ['Hall of Mirrors (Galerie des Glaces)', 'Royal Gardens & Musical Fountain Shows', 'Marie Antoinette’s Hamlet', 'Grand Trianon Palace'],
          de: ['Spiegelsaal', 'Schlossgärten & Wasserspiele', 'Weiler der Marie-Antoinette', 'Grand Trianon']
        },
        activities: {
          tr: [
            'Paris’ten RER C banliyö treniyle Versay’a ulaşıp kraliyet odalarını gezin.',
            'Aynalı Salon’un 357 aynası ve altın varaklı avizeleri altında yürüyün.',
            'Geniş kraliyet bahçelerinde yürüyüş yapın veya elektrikli golf arabası kiralayın.'
          ],
          en: [
            'Ride the RER C train from central Paris directly to Versailles.',
            'Walk beneath the 357 mirrors and crystal chandeliers in the Hall of Mirrors.',
            'Stroll through the grand geometric gardens down to the Grand Canal.'
          ],
          de: [
            'Mit der RER-Linie C nach Versailles fahren.',
            'Spaziergang durch den berühmten Spiegelsaal.',
            'Erkundung der weitläufigen Schlossgärten.'
          ]
        },
        foodAndDrinks: {
          tr: ['Versay kasaba pazarında taze baget sandviç & peynirler', 'Fransız Kiş (Quiche Lorraine)', 'Sıcak çikolata & Éclair pastası'],
          en: ['Artisan baguette sandwich with Brie cheese from Versailles market', 'Traditional Quiche Lorraine', 'Rich hot chocolate and chocolate éclairs'],
          de: ['Baguette mit französischem Käse', 'Quiche Lorraine', 'Éclairs & heiße Schokolade']
        },
        criticalTips: {
          tr: [
            'Pazartesi günleri Versay Sarayı kapalıdır; seyahatinizi buna göre planlayın.',
            'Girişte pasaport kontrolü ve güvenlik kuyrukları uzundur; sabah ilk seansa bilet alın.'
          ],
          en: [
            'The Palace of Versailles is closed on Mondays; plan accordingly.',
            'Security lines are long; always book the earliest morning time slot.'
          ],
          de: [
            'Montags ist das Schloss geschlossen.',
            'Buchen Sie das früheste Zeitfenster am Vormittag.'
          ]
        },
        mapsQuery: 'Palace of Versailles, Versailles, France'
      },
      {
        name: {
          tr: '3. Durak: Nice & Fransız Rivierası (Monaco & Akdeniz Zarafeti)',
          en: 'Stop 3: Nice & The French Riviera (Monaco & Côte d’Azur)',
          de: 'Stopp 3: Nizza & Côte d’Azur (Monaco & Mittelmeer)'
        },
        recommendedDuration: {
          tr: '3-4 Gün (Nice, Monaco günübirlik turu ve sahil için yeterli)',
          en: '3-4 Days (Nice beaches + Monaco day trip)',
          de: '3-4 Tage (Nizza & Tagesausflug nach Monaco)'
        },
        durationBadge: { tr: '3-4 Gün', en: '3-4 Days', de: '3-4 Tage' },
        highlights: {
          tr: ['Promenade des Anglais Palmiyeli Sahil Bulvarı', 'Nice Eski Şehir (Vieux Nice) & Çiçek Pazarı', 'Monaco Prensliği & Monte Carlo Kumarhanesi', 'Èze Orta Çağ Kartal Yuvası Köyü'],
          en: ['Promenade des Anglais Coastal Promenade', 'Old Nice (Vieux Nice) & Cours Saleya Market', 'Principality of Monaco & Monte Carlo Casino', 'Medieval cliffside village of Èze'],
          de: ['Promenade des Anglais', 'Altstadt von Nizza & Blumenmarkt', 'Monaco & Casino Monte-Carlo', 'Mittelalterliches Dorf Èze']
        },
        activities: {
          tr: [
            'Promenade des Anglais boyunca bisiklet sürün veya mavi Akdeniz’e karşı yürüyüş yapın.',
            'Bölgesel trenle (TER) 20 dakikada Monaco’ya geçip lüks yat limanını ve Monte Carlo Sarayı’nı görün.',
            'Kayalıklar üzerine kurulu Èze köyünün botanik bahçesinden nefes kesici deniz manzarasını izleyin.'
          ],
          en: [
            'Cycle or stroll along the iconic Promenade des Anglais overlooking the azure sea.',
            'Take a 20-minute scenic coastal train to Monaco and admire mega-yachts in the harbor.',
            'Climb to the exotic garden atop the medieval eagle’s nest village of Èze.'
          ],
          de: [
            'Spazieren Sie über die berühmte Promenade des Anglais.',
            'Tagesausflug mit dem Küstenzug nach Monaco.',
            'Ausblick vom Botanischen Garten im Bergdorf Èze.'
          ]
        },
        foodAndDrinks: {
          tr: ['Socca (fırında nohut unlu çıtır gözleme)', 'Salade Niçoise (orijinal taze ton balıklı Nice salatası)', 'Provence soğuk roze şarabı (Côtes de Provence)', 'Tarte Tropézienne tatlısı'],
          en: ['Piping hot Socca chickpea flatbread', 'Authentic fresh Salade Niçoise', 'Chilled Côtes de Provence rosé wine', 'Creamy Tarte Tropézienne'],
          de: ['Socca (Kichererbsenfladen)', 'Original Nizza-Salat', 'Gekühlter Roséwein aus der Provence', 'Tarte Tropézienne']
        },
        criticalTips: {
          tr: [
            'Nice plajları kum değil çakıl taşlıdır (pebble beach); deniz ayakkabısı getirmek rahat etmenizi sağlar.',
            'Monaco’ya giderken pasaportunuzu yanınıza alın (rutin sınır kontrolü olmasa da resmi kimlik zorunludur).'
          ],
          en: [
            'Nice has pebble beaches rather than soft sand; bring water shoes for swimming.',
            'Keep your passport with you when taking the train into Monaco.'
          ],
          de: [
            'Kieselstrände in Nizza: Badeschuhe sind sehr empfehlenswert.',
            'Reisepass für den Ausflug nach Monaco mitführen.'
          ]
        },
        mapsQuery: 'Promenade des Anglais, Nice, France'
      }
    ],
    signatureGastronomy: {
      dishes: {
        tr: ['Boeuf Bourguignon', 'Fransız Soğan Çorbası', 'Salade Niçoise', 'Confit de Canard (Ördek)'],
        en: ['Boeuf Bourguignon', 'French Onion Soup', 'Salade Niçoise', 'Duck Confit'],
        de: ['Boeuf Bourguignon', 'Zwiebelsuppe', 'Salade Niçoise', 'Enten-Confit']
      },
      drinks: {
        tr: ['Bordeaux & Bourgogne Şarapları', 'Şampanya (Champagne)', 'Pastis Anason Likörü', 'Café Crème'],
        en: ['Bordeaux & Burgundy Wines', 'Authentic Champagne', 'Pastis Anise Liqueur', 'Café Crème'],
        de: ['Bordeaux-Weine', 'Champagner', 'Pastis', 'Café Crème']
      },
      streetFoods: {
        tr: ['Taze Çıtır Baget Sandviç', 'Krep & Galette', 'Socca', 'Ladurée Makaron'],
        en: ['Artisan Baguette Sandwich', 'Sweet Crepes & Savory Galettes', 'Socca Flatbread', 'Macarons'],
        de: ['Baguette-Sandwiches', 'Crêpes & Galettes', 'Socca', 'Macarons']
      },
      diningAdvice: {
        tr: 'Fransa’da hesaplara yasal olarak %15 servis bedeli dahildir (Service Compris). Ekstra bahşiş zorunlu değildir; memnuniyet için masaya 1-2€ madeni para bırakmak yeterlidir.',
        en: 'A 15% service charge is legally included in all bills by French law. Leaving €1-2 in coins is appreciated for good service.',
        de: '15 % Servicegebühr sind gesetzlich im Rechnungsbetrag enthalten. Ein kleines Trinkgeld von 1-2 € ist üblich.'
      }
    },
    packingAndPrecautions: {
      essentials: {
        tr: ['Şık ve rahat yürüyüş ayakkabıları', 'Güneş gözlüğü ve şapka', 'C/E tipi priz uyumu (230V)', 'Müze girişleri için dijital biletler'],
        en: ['Smart casual walking shoes', 'Sunglasses and sunscreen for the Riviera', 'Euro plug adapter type C/E', 'Offline museum tickets on phone'],
        de: ['Bequeme Schuhe', 'Sonnenschutz für die Riviera', 'Euro-Stecker Typ C/E', 'Digitale Museumstickets']
      },
      safetyAndEtiquette: {
        tr: [
          'Bir dükkana veya restorana girerken mutlaka "Bonjour" (günaydın) ve çıkarken "Au revoir" (hoşça kalın) deyin; bu kurala uymamak kabalık sayılır.',
          'Paris Metrosunda hoparlörle müzik dinlemek veya yüksek sesle konuşmak hoş karşılanmaz.',
          'Gare du Nord ve Châtelet aktarma istasyonlarında çantanızı önünüzde tutun.'
        ],
        en: [
          'Always greet shopkeepers and waiters with a polite "Bonjour" when entering; it is fundamental etiquette.',
          'Keep your bag zipped and in front of you on the Paris Metro.',
          'Never leave phones or sunglasses on restaurant tables facing busy sidewalks.'
        ],
        de: [
          'Beim Betreten von Geschäften immer freundlich "Bonjour" sagen.',
          'Taschen in der Pariser Metro stets im Blick behalten.',
          'Keine Wertsachen offen auf Restauranttischen liegen lassen.'
        ]
      }
    }
  },

  // 5. TAYLAND (TH)
  TH: {
    routeName: {
      tr: 'Tapınaklar, Dağlar & Zümrüt Adalar: Bangkok, Chiang Mai & Phuket / Phi Phi',
      en: 'Temples, Mountains & Emerald Islands: Bangkok, Chiang Mai & Phuket / Phi Phi',
      de: 'Tempel, Berge & Smaragdinseln: Bangkok, Chiang Mai & Phuket / Phi Phi'
    },
    routeSummary: {
      tr: 'Bangkok’un altın yaldızlı tapınakları ve sokak lezzetlerinden başlayıp kuzeyin sisli dağları ve fil koruma alanlarına sahip Chiang Mai’ye, oradan da güneyin masalsı zümrüt sularına uzanan 10 günlük Tayland macerası.',
      en: 'A 10-day tropical immersion from Bangkok’s sacred temples and boat noodles, to northern culture and ethical elephant sanctuaries in Chiang Mai, concluding in Andaman turquoise waters.',
      de: 'Eine 10-tägige Traumreise von Bangkoks prachtvollen Tempeln und Nachtmärkten über die Berge von Chiang Mai bis zu den Stränden von Phuket und Phi Phi.'
    },
    totalDays: 10,
    idealDurationText: {
      tr: '10 Günlük Egzotik Rota',
      en: '10-Day Tropical Itinerary',
      de: '10-Tage Tropenroute'
    },
    bestSeason: {
      tr: 'Kasım - Şubat (Kuru ve serin mevsim; en konforlu seyahat dönemi)',
      en: 'November - February (Cool and dry season with pleasant breezes)',
      de: 'November - Februar (Trockenzeit mit angenehmen Temperaturen)'
    },
    transportMode: {
      tr: 'İç hat uçuşları (BKK-CNX-HKT) + Şehir içi Grab ve BTS Skytrain',
      en: 'Domestic flights (Bangkok-Chiang Mai-Phuket) + Grab & Skytrain',
      de: 'Inlandsflüge + Grab-App & BTS Skytrain'
    },
    paceLevel: {
      tr: 'Dengeli & Egzotik Keşif',
      en: 'Balanced & Tropical',
      de: 'Ausgewogen & Tropisch'
    },
    stops: [
      {
        name: {
          tr: '1. Durak: Bangkok (Melekler Şehri & Altın Tapınaklar)',
          en: 'Stop 1: Bangkok (City of Angels & Golden Temples)',
          de: 'Stopp 1: Bangkok (Stadt der Engel & Goldene Tempel)'
        },
        recommendedDuration: {
          tr: '3 Gün (Şehir içi tapınaklar, pazarlar ve kanallar için yeterli)',
          en: '3 Days (Sufficient for temples, markets, and waterways)',
          de: '3 Tage (Ideal für Tempel, Märkte und Kanäle)'
        },
        durationBadge: { tr: '3 Gün', en: '3 Days', de: '3 Tage' },
        highlights: {
          tr: ['Büyük Kraliyet Sarayı (Grand Palace) & Zümrüt Buda', 'Wat Pho (Yatan Buda Tapınağı)', 'Wat Arun (Şafak Tapınağı - Çin Porseleni Kuleler)', 'Chao Phraya Nehir Teknesi & Chinatown (Yaowarat) Sokak Lezzetleri'],
          en: ['Grand Palace & Temple of the Emerald Buddha', 'Wat Pho (Giant Reclining Buddha)', 'Wat Arun (Temple of Dawn)', 'Chao Phraya Express Boat & Yaowarat Chinatown'],
          de: ['Königspalast (Grand Palace) & Smaragd-Buddha', 'Wat Pho (Liegender Buddha)', 'Wat Arun (Tempel der Morgendämmerung)', 'Chao Phraya Fluss & Chinatown (Yaowarat)']
        },
        activities: {
          tr: [
            'Sabah Büyük Saray’ın altın yaldızlı kulelerini gezin ve Wat Pho’da 46 metrelik altın yatan Buda’yı görün.',
            'Chao Phraya nehri üzerinde halk vapuruyla geçip nehir kıyısındaki görkemli Wat Arun basamaklarına çıkın.',
            'Akşam Yaowarat (Chinatown) caddesinde dumanı tüten wok tavalar arasında Michelin rehberli sokak lezzetlerini tadın.'
          ],
          en: [
            'Marvel at the Grand Palace complex and the 46-meter gold-leaf reclining Buddha at Wat Pho.',
            'Cross the river on a ferry to climb the porcelain spires of Wat Arun at sunset.',
            'Feast on street food under neon lights in vibrant Yaowarat Chinatown.'
          ],
          de: [
            'Besichtigen Sie den Königspalast und den liegenden Buddha im Wat Pho.',
            'Überqueren Sie den Fluss zum fotogenen Wat Arun.',
            'Probieren Sie Streetfood unter Neonreklamen in Chinatown.'
          ]
        },
        foodAndDrinks: {
          tr: ['Otantik Pad Thai (karidesli ve yer fıstıklı)', 'Tom Yum Goong (acı-ekşi karides çorbası)', 'Mango Sticky Rice (yapışkan pirinçli taze mango tatlısı)', 'Buzlu Tayland Sütlü Çayı (Cha Yen) & Taze Hindistan Cevizi Suyu'],
          en: ['Authentic wok-fried Pad Thai with jumbo prawns', 'Spicy-sour Tom Yum Goong soup', 'Sweet Mango Sticky Rice with coconut cream', 'Iced Thai Milk Tea (Cha Yen) & fresh young coconuts'],
          de: ['Original Pad Thai', 'Würzige Tom Yum Suppe', 'Mango Sticky Rice', 'Thai-Eistee (Cha Yen) & frische Kokosnuss']
        },
        criticalTips: {
          tr: [
            'Tuk-tuk şoförlerinin "Saray bugün kapalı, seni başka yere götüreyim" yalanına ASLA inanmayın; doğrudan tapınak kapısına yürüyün.',
            'Tapınaklara girerken omuzlar ve dizler tamamen kapalı olmalıdır; şal ile örtünmek kabul edilmez, kollu tişört giyilmelidir.',
            'Taksilerde taksimetre ("meter") açılmasını ısrarla talep edin veya Grab uygulamasını kullanın.'
          ],
          en: [
            'Ignore tuk-tuk drivers saying "The Grand Palace is closed today" (classic gem scam); walk directly to the ticket gates.',
            'Strict dress code in temples: shoulders and knees must be fully covered (shawls often not allowed at Grand Palace).',
            'Always insist on metered taxis or book rides via the Grab app.'
          ],
          de: [
            'Glauben Sie keinen Tuk-Tuk-Fahrern, die behaupten, der Palast sei geschlossen.',
            'Strikte Kleiderordnung in Tempeln: Schultern und Knie müssen bedeckt sein.',
            'Bestehen Sie auf das Taxameter oder nutzen Sie die Grab-App.'
          ]
        },
        mapsQuery: 'Grand Palace, Bangkok, Thailand'
      },
      {
        name: {
          tr: '2. Durak: Chiang Mai (Kuzeyin Kültür Başkenti & Dağlar)',
          en: 'Stop 2: Chiang Mai (Northern Cultural Capital & Mountains)',
          de: 'Stopp 2: Chiang Mai (Kulturhauptstadt des Nordens)'
        },
        recommendedDuration: {
          tr: '3 Gün (Eski şehir tapınakları, fil koruma alanı ve gece pazarı)',
          en: '3 Days (Old city temples, ethical elephant sanctuary, night bazaars)',
          de: '3 Tage (Altstadt, Elefanten-Auffangstation & Nachtbasar)'
        },
        durationBadge: { tr: '3 Gün', en: '3 Days', de: '3 Tage' },
        highlights: {
          tr: ['Wat Phra That Doi Suthep Dağ Tapınağı', 'Eski Şehir Hendeği & Wat Chedi Luang', 'Etik Fil Koruma Parkı (Fil binilmeyen)', 'Pazar Günü Yürüyüş Pazarı (Sunday Walking Street)'],
          en: ['Wat Phra That Doi Suthep Mountain Temple', 'Historic Moated Old City & Wat Chedi Luang', 'Ethical Elephant Rescue Sanctuary', 'Sunday Walking Street Night Market'],
          de: ['Bergtempel Wat Phra That Doi Suthep', 'Altstadt & Wat Chedi Luang', 'Ethisches Elefanten-Schutzgebiet', 'Sunday Walking Street Markt']
        },
        activities: {
          tr: [
            'Doi Suthep Dağı’nın zirvesindeki altın pagodayı ziyaret edip şehri kuşbakışı seyredin.',
            'Etik bir fil koruma alanında kurtarılmış fillerle çamur banyosu yapın, onları ellerinizle besleyin (kesinlikle fil sırtına binilmeyen parklar).',
            'Pazar akşamı sokakları trafiğe kapatılan dev el sanatları ve sokak lezzeti pazarında alışveriş yapın.'
          ],
          en: [
            'Climb the 306-step serpent staircase to golden Doi Suthep overlooking the misty valley.',
            'Feed, walk, and bathe rescued elephants at an ethical no-riding sanctuary.',
            'Shop handmade northern crafts at the Sunday Walking Street market.'
          ],
          de: [
            'Besuch des goldenen Bergtempels Doi Suthep.',
            'Fütterung und Pflege geretteter Elefanten in einem Schutzgebiet (ohne Reiten).',
            'Bummel über den sonntäglichen Nachtmarkt.'
          ]
        },
        foodAndDrinks: {
          tr: ['Khao Soi (kremamsı köri suyunda çıtır yumurtalı erişte çorbası)', 'Sai Oua (kuzey Tayland baharatlı yerel sosisi)', 'Hindistan cevizli dondurma', 'Singha & Chang soğuk birası'],
          en: ['Creamy northern coconut curry egg noodle soup (Khao Soi)', 'Aromatic lemongrass herbal sausage (Sai Oua)', 'Coconut ice cream served in shells', 'Cold Chang & Singha beer'],
          de: ['Khao Soi Curry-Nudelsuppe', 'Würzige nordthailändische Wurst (Sai Oua)', 'Kokosnusseis', 'Chang & Singha Bier']
        },
        criticalTips: {
          tr: [
            'Fil turlarında KESİNLİKLE fil sırtına binilen (riding) turları seçmeyin; hayvan refahına saygılı "ethical sanctuary" alanlarını tercih edin.',
            'Şubat-Nisan ayları arasında anız yakma dönemi (smoky season) hava kirliliğine neden olabilir; Kasım-Ocak arası en temiz dönemdir.'
          ],
          en: [
            'Never book elephant riding tours; choose certified ethical sanctuaries where elephants roam free.',
            'Be aware of the agricultural burning season (February-April) which causes heavy haze in northern Thailand.'
          ],
          de: [
            'Buchen Sie ausschließlich Auffangstationen ohne Elefantenreiten.',
            'Im Februar bis April kann es durch Brandrodung zu Smog kommen; bester Reisezeitraum ist Nov-Jan.'
          ]
        },
        mapsQuery: 'Wat Phra That Doi Suthep, Chiang Mai, Thailand'
      },
      {
        name: {
          tr: '3. Durak: Phuket & Phi Phi Adaları (Zümrüt Sular & Kireçtaşı Kayalıkları)',
          en: 'Stop 3: Phuket & Phi Phi Islands (Emerald Waters & Karst Cliffs)',
          de: 'Stopp 3: Phuket & Phi Phi-Inseln (Smaragdbuchten & Kalksteinfelsen)'
        },
        recommendedDuration: {
          tr: '4 Gün (Adalar turu, dinlenme ve su altı keşifleri için yeterli)',
          en: '4 Days (Adequate for island hopping, snorkeling, and beach relaxation)',
          de: '4 Tage (Ideal für Inselhopping, Schnorcheln & Erholung)'
        },
        durationBadge: { tr: '4 Gün', en: '4 Days', de: '4 Tage' },
        highlights: {
          tr: ['Phi Phi Don & Maya Bay (Zümrüt Koyu)', 'Phang Nga Körfezi & James Bond Adası', 'Phuket Eski Şehir Portekiz Mimarisi (Old Town)', 'Kata & Promthep Burnu Gün Batımı'],
          en: ['Phi Phi Islands & Maya Bay', 'Phang Nga Bay & James Bond Island', 'Charming Sino-Portuguese Phuket Old Town', 'Promthep Cape Sunset Lookout'],
          de: ['Phi Phi Inseln & Maya Bay', 'Phang Nga Bucht & James-Bond-Insel', 'Historische Altstadt von Phuket', 'Sonnenuntergang am Promthep Cape']
        },
        activities: {
          tr: [
            'Sürat teknesiyle Maya Bay’e gidip kireçtaşı kayalıklarıyla çevrili zümrüt lagünde yüzün.',
            'Pileh Lagünü’nde tekneden berrak turkuaz sulara atlayın ve mercan resiflerinde şnorkelle rengarenk balıkları izleyin.',
            'Phuket Old Town’un rengarenk sokaklarında yürüyüp tarihi Çin-Portekiz evlerinde kahve için.'
          ],
          en: [
            'Take an island speedboat tour into Maya Bay’s sheer limestone amphitheater.',
            'Jump into the emerald waters of Pileh Lagoon and snorkel among clownfish.',
            'Wander pastel heritage shophouses and hip cafes in Phuket Old Town.'
          ],
          de: [
            'Bootstour zur berühmten Maya Bay.',
            'Schnorcheln in der smaragdgrünen Pileh-Lagune.',
            'Spaziergang durch die bunte Altstadt von Phuket.'
          ]
        },
        foodAndDrinks: {
          tr: ['Taze ızgara kaplan karidesi ve kalamar', 'Massaman Curry (fıstıklı tatlımsı köri)', 'Papaya Salatası (Som Tum)', 'Taze meyve smoothieleri (Mango, Ananas, Ejder Meyvesi)'],
          en: ['Freshly caught grilled tiger prawns and squid', 'Rich creamy Massaman beef curry with roasted peanuts', 'Zesty green papaya salad (Som Tum)', 'Chilled fresh dragon fruit and mango shakes'],
          de: ['Gegrillte Riesengarnelen', 'Massaman Curry mit Erdnüssen', 'Scharfer Papayasalat (Som Tum)', 'Frische Frucht-Smoothies']
        },
        criticalTips: {
          tr: [
            'Pattaya ve Phuket sahillerinde Jet-ski kiralamayın (çizik ve sahte hasar şantajı çok yaygındır).',
            'Sürat motoru turlarında deniz tutmasına karşı yanınıza hareket hapı (dramamine) alın.',
            'Plajlarda kırmızı bayrak çekiliyse güçlü dip akıntıları (rip current) nedeniyle kesinlikle denize girmeyin.'
          ],
          en: [
            'Avoid renting jet-skis on tourist beaches due to notorious extortion scams regarding pre-existing scratches.',
            'Take seasickness medication before morning speedboat island crossings.',
            'Never swim when red flags are flying on west coast beaches due to hazardous rip currents.'
          ],
          de: [
            'Keine Jetskis an Stränden mieten (Häufige Betrugsfälle mit angeblichen Schäden).',
            'Tabletten gegen Seekrankheit für Speedboot-Fahrten einpacken.',
            'Bei roter Flagge am Strand wegen starker Strömungen niemals ins Wasser gehen.'
          ]
        },
        mapsQuery: 'Maya Bay, Phi Phi Islands, Thailand'
      }
    ],
    signatureGastronomy: {
      dishes: {
        tr: ['Pad Thai', 'Tom Yum Goong', 'Khao Soi', 'Massaman Curry'],
        en: ['Pad Thai', 'Tom Yum Goong', 'Khao Soi', 'Massaman Curry'],
        de: ['Pad Thai', 'Tom Yum Goong', 'Khao Soi', 'Massaman Curry']
      },
      drinks: {
        tr: ['Cha Yen (Tayland Buzlu Sütlü Çayı)', 'Taze Hindistan Cevizi Suyu', 'Chang & Singha Birası', 'Meyve Smoothieleri'],
        en: ['Thai Iced Milk Tea', 'Fresh Young Coconut', 'Chang & Singha Beer', 'Tropical Fruit Shakes'],
        de: ['Cha Yen Eistee', 'Frisches Kokoswasser', 'Chang Bier', 'Fruchtshakes']
      },
      streetFoods: {
        tr: ['Mango Sticky Rice', 'Muzlu Roti Gözleme', 'Moo Ping (Domuz Şiş)', 'Hindistan Cevizli Çıtır Waffle'],
        en: ['Mango Sticky Rice', 'Banana Roti Pancakes', 'Grilled Pork Skewers', 'Crispy Coconut Pancakes'],
        de: ['Mango Sticky Rice', 'Bananen-Roti', 'Gegrillte Fleischspieße', 'Kokos-Pancakes']
      },
      diningAdvice: {
        tr: 'Tayland’da bahşiş zorunlu bir gelenek olmasa da, turistik mekanlarda ve iyi servis aldığınızda %10 veya bozuk paraları bırakmak memnuniyetle karşılanır.',
        en: 'Tipping is not traditional in local Thai culture, but 10% is customary and warmly received in tourist-oriented restaurants.',
        de: 'Trinkgeld ist keine traditionelle Pflicht, aber ca. 10 % in Restaurants werden gerne gesehen.'
      }
    },
    packingAndPrecautions: {
      essentials: {
        tr: ['Sivrisinek kovucu sprey (DEET içerikli)', 'Tapınaklar için hafif ve dökümlü keten pantolon', 'Su geçirmez telefon kılıfı (adalar için)', 'Güneş kremi & şapka'],
        en: ['Mosquito repellent spray with DEET', 'Lightweight loose linen pants for temples', 'Waterproof phone pouch for island boats', 'High-SPF reef-safe sunscreen'],
        de: ['Mückenspray mit DEET', 'Leichte lange Leinenhosen für Tempel', 'Wasserdichte Hülle für Smartphone', 'Rifffreundliche Sonnencreme']
      },
      safetyAndEtiquette: {
        tr: [
          'Kraliyet ailesi hakkında herhangi bir eleştiri veya saygısızlık çok ağır hapis cezasıyla sonuçlanır (Lèse-majesté yasası).',
          'Birinin başına veya saçına asla dokunmayın; baş kutsal kabul edilir. Ayak tabanınızı kimseye veya kutsal heykellere doğru uzatmayın.',
          'Sokaklarda musluk suyu ASLA içilmez; daima mühürlü şişe su tüketin.'
        ],
        en: [
          'Strict Lèse-majesté laws protect the Monarchy; never speak critically of royalty or deface currency.',
          'Never touch anyone on the head or point your feet toward people or Buddha statues.',
          'Never drink tap water; always consume sealed bottled water or filtered ice.'
        ],
        de: [
          'Strikte Gesetze zur Majestätsbeleidigung: Keine respektlosen Äußerungen über das Königshaus.',
          'Niemals den Kopf von Personen berühren und nicht mit den Füßen auf Buddha-Statuen zeigen.',
          'Kein Leitungswasser trinken; nur versiegeltes Flaschenwasser nutzen.'
        ]
      }
    }
  },

  // 6. İZLANDA (IS)
  IS: {
    routeName: {
      tr: 'Ateş ve Buz Ülkesi: 1 No’lu Çevre Yolu (Ring Road) & Güney Sahili',
      en: 'Land of Fire & Ice: Route 1 Ring Road & South Coast Expedition',
      de: 'Land aus Feuer und Eis: Ringstraße 1 & Südküsten-Expedition'
    },
    routeSummary: {
      tr: 'Reykjavik’ten başlayıp devasa şelalelere, siyah kumsallara, mavi buzul lagünlerine ve jeotermal kaplıcalara uzanan 8 günlük unutulmaz bir kutup ve doğa macerası.',
      en: 'An 8-day subarctic road trip circling volcanic wonders, thundering waterfalls, Reynisfjara black sands, and floating icebergs at Jokulsarlon glacier lagoon.',
      de: 'Eine 8-tägige spektakuläre Rundreise entlang mächtiger Wasserfälle, schwarzer Sandstrände, treibender Eisberge und geothermischer Thermalquellen.'
    },
    totalDays: 8,
    idealDurationText: {
      tr: '8 Günlük Efsane Doğa Rotası',
      en: '8-Day Nature Expedition',
      de: '8-Tage Natur-Expedition'
    },
    bestSeason: {
      tr: 'Haziran - Ağustos (Gece yarısı güneşi ve açık yollar) veya Ekim - Mart (Kuzey Işıkları için)',
      en: 'June - August (Midnight Sun & accessible roads) or October - March (Northern Lights)',
      de: 'Juni - August (Mitternachtssonne) oder Oktober - März (Nordlichter)'
    },
    transportMode: {
      tr: 'Kiralık 4x4 SUV Araç veya Karavan (Campervan)',
      en: 'Rental 4x4 SUV or Campervan (Route 1 Ring Road)',
      de: 'Mietwagen mit Allradantrieb (4x4 SUV) oder Campervan'
    },
    paceLevel: {
      tr: 'Yoğun Doğa Keşfi & Karayolu',
      en: 'Active Outdoor & Road Trip',
      de: 'Aktiv & Abenteuer-Roadtrip'
    },
    stops: [
      {
        name: {
          tr: '1. Durak: Reykjavik & Altın Çember (Golden Circle)',
          en: 'Stop 1: Reykjavik & The Golden Circle',
          de: 'Stopp 1: Reykjavik & Golden Circle'
        },
        recommendedDuration: {
          tr: '2 Gün (Başkent ve jeotermal harikalar için yeterli)',
          en: '2 Days (Capital sights and geothermal wonders)',
          de: '2 Tage (Hauptstadt & Geothermie-Wunder)'
        },
        durationBadge: { tr: '2 Gün', en: '2 Days', de: '2 Tage' },
        highlights: {
          tr: ['Hallgrimskirkja Kilisesi & Reykjavik Renkli Çatıları', 'Thingvellir Milli Parkı (Tektonik Levhalar Yarığı)', 'Strokkur Gayzeri (Her 8 dakikada patlayan sıcak su)', 'Gullfoss Devasa Kanyon Şelalesi'],
          en: ['Hallgrimskirkja Church & Rainbow Street', 'Thingvellir National Park (Tectonic Rift)', 'Strokkur Geysir (Erupts every 8 minutes)', 'Gullfoss Roaring Canyon Waterfall'],
          de: ['Hallgrimskirkja & Regenbogenstraße', 'Thingvellir-Nationalpark (Kontinentalplatten)', 'Geysir Strokkur', 'Gullfoss-Wasserfall']
        },
        activities: {
          tr: [
            'Hallgrimskirkja kulesine asansörle çıkıp Reykjavik’in renkli teneke çatılarını seyredin.',
            'Kuzey Amerika ve Avrasya tektonik levhalarının birbirinden ayrıldığı Thingvellir vadisinde yürüyün.',
            'Strokkur gayzerinin gökyüzüne 25 metre fışkıran kaynar suyunu izleyin.',
            'Gullfoss şelalesinin kanyonuna vuran gökkuşağını fotoğraflayın.'
          ],
          en: [
            'Ride the elevator up Hallgrimskirkja tower for iconic views over colorful Reykjavik roofs.',
            'Walk between the North American and Eurasian tectonic plates at Thingvellir.',
            'Watch Strokkur geyser blast 25-meter plumes of boiling water into the sky.',
            'Stand in awe before the two-tiered torrent of Gullfoss waterfall.'
          ],
          de: [
            'Aussicht vom Turm der Hallgrimskirkja über Reykjavik.',
            'Spaziergang im Riss zwischen den Kontinentalplatten in Thingvellir.',
            'Erleben Sie den Geysir Strokkur beim Ausbruch.',
            'Bestaunen Sie die Wassermassen des Gullfoss.'
          ]
        },
        foodAndDrinks: {
          tr: ['Bæjarins Beztu meşhur kuzu sosisi (İzlanda hot dog)', 'Geleneksel İzlanda kuzu eti çorbası (Kjötsúpa)', 'Skyr yerel protein yoğurdu & yaban mersini', 'Reykjavik el yapımı biraları (Einstök)'],
          en: ['World-famous lamb hot dog at Bæjarins Beztu Pylsur', 'Hearty Icelandic lamb meat soup (Kjötsúpa)', 'Organic Skyr dairy yogurt with wild berries', 'Craft Icelandic Arctic ales (Einstök)'],
          de: ['Berühmter Hotdog bei Bæjarins Beztu', 'Isländische Lammsuppe (Kjötsúpa)', 'Traditioneller Skyr mit Beeren', 'Einstök Craft Beer']
        },
        criticalTips: {
          tr: [
            'Gayzer alanında belirlenen halatların dışına asla çıkmayın; yerdeki sular 100°C kaynardır.',
            'İzlanda’da nakit paraya HİÇ gerek yoktur; tuvaletler dahil her yerde kredi kartı veya temassız ödeme geçerlidir.'
          ],
          en: [
            'Never step over safety ropes at the geysers; geothermal pools are 100°C boiling.',
            'Cash is completely unnecessary in Iceland; cards and Apple/Google Pay are accepted everywhere.'
          ],
          de: [
            'Im Geysir-Gebiet die Absperrungen niemals verlassen (kochendes Wasser).',
            'Bargeld ist in Island überflüssig; Kartenzahlung überall Standard.'
          ]
        },
        mapsQuery: 'Gullfoss, Iceland'
      },
      {
        name: {
          tr: '2. Durak: Güney Sahili (Seljalandsfoss, Skogafoss & Reynisfjara)',
          en: 'Stop 2: South Coast (Seljalandsfoss, Skogafoss & Reynisfjara)',
          de: 'Stopp 2: Südküste (Seljalandsfoss, Skogafoss & Reynisfjara)'
        },
        recommendedDuration: {
          tr: '2 Gün (Şelaleler arkasında yürüyüş ve bazalt kumsallar için yeterli)',
          en: '2 Days (Waterfall walks and volcanic black sands)',
          de: '2 Tage (Wasserfälle & schwarze Sandstrände)'
        },
        durationBadge: { tr: '2 Gün', en: '2 Days', de: '2 Tage' },
        highlights: {
          tr: ['Seljalandsfoss (Arkasından yürünebilen şelale)', 'Skogafoss (60 metrelik görkemli perde şelale)', 'Reynisfjara Siyah Kumsalı & Bazalt Mağaraları', 'Dyrhólaey Deniz Kemeri & Puffin Kuşları'],
          en: ['Seljalandsfoss (Walk behind the waterfall)', 'Skogafoss 60-meter roaring cascade', 'Reynisfjara Volcanic Black Sand Beach & Basalt Columns', 'Dyrhólaey Arch & Puffin Nesting Cliffs'],
          de: ['Seljalandsfoss (hinter dem Wasserfall gehen)', 'Skogafoss-Wasserfall', 'Reynisfjara schwarzer Strand & Basaltsäulen', 'Dyrhólaey Felsentor & Papageitaucher']
        },
        activities: {
          tr: [
            'Su geçirmez montunuzu giyip Seljalandsfoss şelalesinin döküldüğü su perdesinin arkasındaki mağaradan geçin.',
            'Skogafoss’un tepesindeki seyir platformuna 500 basamak tırmanın.',
            'Reynisfjara siyah kumlu plajında devasa heksagonal bazalt sütunları önünde fotoğraf çekilin.'
          ],
          en: [
            'Slip into full waterproof gear and hike behind the crashing veil of Seljalandsfoss.',
            'Climb 500 steps to the top observation deck over thunderous Skogafoss.',
            'Admire the towering basalt columns rising out of black volcanic sand at Reynisfjara.'
          ],
          de: [
            'Wandern Sie hinter den Wasservorhang des Seljalandsfoss.',
            'Aussichtsplattform oberhalb des Skogafoss erklimmen.',
            'Erkunden Sie den schwarzen Sandstrand von Reynisfjara.'
          ]
        },
        foodAndDrinks: {
          tr: ['Vik kasabasında taze morina balığı (Fish & Chips)', 'Fırında füme kuzu budu', 'İzlanda çavdar ekmeği (Rúgbrauð)', 'Brennivín geleneksel kimyonlu likörü'],
          en: ['Fresh Atlantic cod fish and chips in Vík village', 'Slow-smoked Icelandic lamb shank', 'Geothermally baked dark rye bread (Rúgbrauð)', 'Brennivín herbal aquavit shot'],
          de: ['Frischer Kabeljau mit Pommes in Vík', 'Geräucherte Lammkeule', 'Im Erdofen gebackenes Roggenbrot (Rúgbrauð)', 'Brennivín-Schnaps']
        },
        criticalTips: {
          tr: [
            '⚠️ ÖLÜMCÜL TEHLİKE: Reynisfjara kumsalında denize ASLA sırtınızı dönmeyin! Aniden kıyıya vuran devasa sinsi dalgalar (sneaker waves) insanları okyanusa çekip boğmaktadır. Kırmızı uyarı ışığına kesinlikle uyun.',
            'Şelalelerin yanına giderken su geçirmez ceket ve pantolon şarttır; dakikalar içinde sırılsıklam olursunuz.'
          ],
          en: [
            '⚠️ EXTREME DANGER: Never turn your back to the sea at Reynisfjara! Sneaker waves strike unpredictably and pull people into the freezing ocean. Obey warning lights strictly.',
            'Wear full waterproof outer layers at the waterfalls or you will be soaked in seconds.'
          ],
          de: [
            '⚠️ LEBENSGEFAHR: Niemals dem Meer in Reynisfjara den Rücken zuwenden! Sneaker Waves ziehen immer wieder Menschen ins eiskalte Wasser.',
            'Komplett wasserdichte Kleidung an den Wasserfällen tragen.'
          ]
        },
        mapsQuery: 'Reynisfjara Black Sand Beach, Iceland'
      },
      {
        name: {
          tr: '3. Durak: Jökulsárlón & Elmas Plajı (Buzullar ve Lagünler)',
          en: 'Stop 3: Jökulsárlón Glacier Lagoon & Diamond Beach',
          de: 'Stopp 3: Jökulsárlón Gletscherlagune & Diamond Beach'
        },
        recommendedDuration: {
          tr: '2 Gün (Buzul teknesi ve buzul yürüyüşü için yeterli)',
          en: '2 Days (Amphibious boat tour and glacier hiking)',
          de: '2 Tage (Gletscherlagune & Eiswanderung)'
        },
        durationBadge: { tr: '2 Gün', en: '2 Days', de: '2 Tage' },
        highlights: {
          tr: ['Jökulsárlón Buzul Lagünü (Yüzen Mavi Buz Dağları)', 'Diamond Beach (Siyah Kuma Vuran Kristal Buzlar)', 'Vatnajökull Buzul Yürüyüşü & Mavi Buz Mağarası', 'Skaftafell Milli Parkı & Svartifoss Bazalt Şelalesi'],
          en: ['Jökulsárlón Glacier Lagoon (Floating luminous blue icebergs)', 'Diamond Beach (Glistening crystal ice chunks on black sand)', 'Vatnajökull Glacier Trek & Blue Ice Cave', 'Skaftafell & Svartifoss Basalt Waterfall'],
          de: ['Gletscherlagune Jökulsárlón', 'Diamond Beach', 'Gletscherwanderung Vatnajökull & Blaue Eishöhle', 'Svartifoss-Wasserfall']
        },
        activities: {
          tr: [
            'Amfibi araç veya zodyak botla Jökulsárlón lagününde dev buz kütleleri ve fok balıkları arasında dolaşın.',
            'Karşı kıyıdaki Diamond Beach’te siyah volkanik kum üzerinde güneş gibi parıldayan pırlanta berraklığındaki buz parçalarına dokunun.',
            'Kramponlarınızı takıp profesyonel rehber eşliğinde Avrupa’nın en büyük buzulu Vatnajökull üzerinde yürüyün.'
          ],
          en: [
            'Board an amphibious boat among electric-blue icebergs and playful seals in Jokulsarlon.',
            'Walk across Diamond Beach admiring diamond-like chunks of glacial ice washed ashore.',
            'Strap on crampons for a guided trek across the crevasse-strewn Vatnajokull ice cap.'
          ],
          de: [
            'Bootsfahrt zwischen den riesigen blauen Eisbergen auf der Lagune.',
            'Fotografieren der glitzernden Eisblöcke am schwarzen Diamond Beach.',
            'Gletscherwanderung mit Steigeisen auf dem Vatnajökull.'
          ]
        },
        foodAndDrinks: {
          tr: ['Höfn kasabasında meşhur yerel langoustine (Norveç Istakozu)', 'Taze fırınlanmış somon fileto', 'Sıcak yaban mersini çayı', 'İzlanda dağ çikolatası'],
          en: ['Pan-seared fresh langoustine lobster in Höfn', 'Baked Arctic char salmon with dill butter', 'Warm berry tea', 'Artisan Icelandic chocolate'],
          de: ['Frische Kaisergranaten (Langustinen) in Höfn', 'Arktischer Saibling', 'Heißer Beerentee', 'Isländische Schokolade']
        },
        criticalTips: {
          tr: [
            'Buzul yürüyüşü ve buz mağarası turlarına ASLA tek başınıza gitmeyin; derin yarıklar ölümcüldür, lisanslı rehber zorunludur.',
            'Hava durumunu ve yol durumunu her sabah road.is ve vedur.is sitelerinden kontrol edin; ani fırtınalarda yollar kapanabilir.'
          ],
          en: [
            'Never venture onto glaciers without certified guides; deep crevasses are hidden and deadly.',
            'Check road conditions daily on road.is and vedur.is; severe gale winds can close highways suddenly.'
          ],
          de: [
            'Gletscher niemals ohne lizenzierten Guide betreten (Spaltengefahr).',
            'Straßenverhältnisse täglich auf road.is und vedur.is prüfen.'
          ]
        },
        mapsQuery: 'Jokulsarlon, Iceland'
      }
    ],
    signatureGastronomy: {
      dishes: {
        tr: ['Kjötsúpa (Kuzu Eti Çorbası)', 'Höfn Istakozu (Langoustine)', 'Taze Atlantik Somonu', 'İzlanda Hot Dog'],
        en: ['Kjötsúpa Lamb Soup', 'Höfn Langoustine Lobster', 'Arctic Char Salmon', 'Icelandic Hot Dog'],
        de: ['Kjötsúpa Lammsuppe', 'Höfn-Langustinen', 'Arktischer Saibling', 'Isländischer Hot Dog']
      },
      drinks: {
        tr: ['Doğal Buzul Suyu (Musluktan)', 'Brennivín Kimyon Likörü', 'Einstök Kutup Birası', 'Sıcak Çikolata'],
        en: ['Pure Glacial Tap Water', 'Brennivín Aquavit', 'Einstök Arctic Ales', 'Hot Cocoa'],
        de: ['Reines Gletscherwasser', 'Brennivín', 'Einstök Bier', 'Heiße Schokolade']
      },
      streetFoods: {
        tr: ['Bæjarins Beztu Pylsur (Kuzu Sosis)', 'Kleinur (Geleneksel donut)', 'Kurutulmuş Balık (Harðfiskur)', 'Skyr'],
        en: ['Lamb Hot Dogs with crispy onions', 'Kleinur twisted donuts', 'Harðfiskur dried fish with butter', 'Skyr'],
        de: ['Hotdog mit Röstzwiebeln', 'Kleinur-Gebäck', 'Trockenfisch mit Butter', 'Skyr']
      },
      diningAdvice: {
        tr: 'İzlanda’da bahşiş kültürü yoktur; vergiler ve hizmet bedelleri fiyata tamamen dahildir. Çeşme suyu dünyanın en temiz buzul suyudur; asla şişe su satın almayın, mataranızı musluktan doldurun.',
        en: 'Tipping is not expected or necessary anywhere in Iceland. Tap water is among the purest in the world; never buy bottled water.',
        de: 'Kein Trinkgeld in Island nötig. Das Leitungswasser ist reinstes Gletscherwasser; niemals Plastikflaschen kaufen.'
      }
    },
    packingAndPrecautions: {
      essentials: {
        tr: ['Rüzgar ve su geçirmez Gore-Tex mont ve pantolon', 'Termal içlikler (yün katmanlar)', 'Bilekli sağlam yürüyüş botu', 'Termal kaplıcalar için mayo ve havlu'],
        en: ['Windproof & waterproof outer shell (jacket & pants)', 'Merino wool thermal base layers', 'Sturdy high-ankle hiking boots with deep tread', 'Swimsuit and quick-dry towel for geothermal lagoons'],
        de: ['Wind- und wetterfeste Jacke & Hose', 'Thermounterwäsche aus Merinowolle', 'Knöchelhohe feste Wanderschuhe', 'Badekleidung für Geothermalbäder']
      },
      safetyAndEtiquette: {
        tr: [
          'İzlanda’da off-road (yol dışı) araç kullanmak kesinlikle yasaktır ve doğaya verilen kalıcı zarar nedeniyle astronomik para cezası uygulanır.',
          'Hava aniden değişebilir; kapı açarken aracın kapısını iki elinizle tutun, şiddetli fırtınalarda kapılar ters dönebilir.',
          'Ülkede organize suç veya taksi dolandırıcılığı yoktur; en büyük tehlike ekstrem doğa koşullarıdır.'
        ],
        en: [
          'Off-road driving is strictly illegal in Iceland and carries massive fines to protect delicate moss.',
          'Hold car doors with both hands when opening; extreme wind gusts frequently rip car doors off hinges.',
          'There is virtually zero violent crime; natural hazards and weather are your only safety concerns.'
        ],
        de: [
          'Fahren abseits ausgewiesener Straßen (Offroad) ist streng verboten und wird hart bestraft.',
          'Autotüren beim Öffnen immer mit beiden Händen festhalten (Sturmböen).',
          'Nahezu keine Kriminalität; extreme Natur und Wetter sind das Hauptrisiko.'
        ]
      }
    }
  }
};

/**
 * Akıllı Dinamik Rota Sentezleyici
 * Küratörlü listesinde olmayan ülkeler için coğrafya, ansiklopedi ve güvenlik istihbaratını
 * birleştirerek tutarlı, zengin ve gerçekçi bir seyahat rotası oluşturur.
 */
export function generateDynamicCountryItinerary(
  countryCode: string,
  lang: string = 'tr'
): CountryTravelItinerary {
  const code = countryCode.toUpperCase();
  const countryName = getCountryName(code, lang);
  const geo = GEO_DATA[code];
  const geography = getCountryGeography(code, lang);
  const encyclopedia = getCountryEncyclopedia(code, lang);
  const insights = getCountryInsights(code, lang);

  const capital = geography.capital || geo?.capital || (lang === 'tr' ? 'Başkent' : lang === 'de' ? 'Hauptstadt' : 'Capital');
  const majorCities = geography.majorCities.length > 0 ? geography.majorCities : [capital];
  const touristRegions = geography.touristRegions.length > 0 ? geography.touristRegions : [capital];
  const mustSee = encyclopedia.tourism.mustSeePlaces.length > 0 ? encyclopedia.tourism.mustSeePlaces : [capital];
  const famousDishes = encyclopedia.gastronomy.famousDishes.length > 0 ? encyclopedia.gastronomy.famousDishes : ['Yöresel lezzetler'];
  const drinks = encyclopedia.gastronomy.traditionalDrinks.length > 0 ? encyclopedia.gastronomy.traditionalDrinks : ['Yerel içecekler'];
  const streetFood = encyclopedia.gastronomy.streetFoodAndDesserts.length > 0 ? encyclopedia.gastronomy.streetFoodAndDesserts : ['Meyve ve sokak atıştırmalıkları'];

  // Durakları oluştur
  const stops: ItineraryStop[] = [];

  const isTr = lang === 'tr';
  const isDe = lang === 'de';
  const isEs = lang === 'es';
  const isRu = lang === 'ru';

  // Durak 1: Başkent & Tarihi Çekirdek
  const stop1Highlights = mustSee.slice(0, 2);
  stops.push({
    stopNumber: 1,
    name: isTr 
      ? `1. Durak: ${capital} (Tarihi Merkez & Kültür Mirası)`
      : isDe
      ? `Stopp 1: ${capital} (Historisches Zentrum & Kultur)`
      : isEs
      ? `1.ª Parada: ${capital} (Centro Histórico y Patrimonio)`
      : isRu
      ? `Остановка 1: ${capital} (Исторический центр и наследие)`
      : `Stop 1: ${capital} (Historic Core & Heritage)`,
    recommendedDuration: isTr
      ? '2-3 Gün (Yeterli keşif için ideal)'
      : isDe
      ? '2-3 Tage (Ideal für Kultur)'
      : isEs
      ? '2-3 Días (Ideal para explorar)'
      : isRu
      ? '2-3 дня (Идеально для первого знакомства)'
      : '2-3 Days (Ideal for core sights)',
    durationBadge: isTr ? '3 Gün' : isDe ? '3 Tage' : isEs ? '3 Días' : isRu ? '3 дня' : '3 Days',
    highlights: stop1Highlights.length > 0 ? stop1Highlights : [
      isTr
        ? `${capital} Şehir Meydanı & Ulusal Müze`
        : isDe
        ? `${capital} Hauptplatz & Nationalmuseum`
        : isEs
        ? `${capital} Plaza Mayor y Museo Nacional`
        : isRu
        ? `${capital} Главная площадь и Национальный музей`
        : `${capital} City Square & National Museum`
    ],
    activities: [
      isTr
        ? `${capital} tarihi meydanında yürüyüş yapıp milli mimariyi keşfedin.`
        : isDe
        ? `Spaziergang über den Hauptplatz von ${capital}.`
        : isEs
        ? `Pasee por el centro histórico de ${capital} admirando la arquitectura y monumentos.`
        : isRu
        ? `Прогуляйтесь по историческому центру ${capital}, знакомясь с архитектурой и достопримечательностями.`
        : `Walk through the historic center of ${capital} exploring national landmarks.`,
      isTr
        ? `Yerel çarşılarda geleneksel el sanatlarını ve hediyelikleri inceleyin.`
        : isDe
        ? `Erkundung traditioneller Handwerksmärkte.`
        : isEs
        ? `Explore los mercados tradicionales y tiendas de artesanía local.`
        : isRu
        ? `Посетите колоритные рынки традиционных ремесел и сувениров.`
        : `Explore traditional bazaars and artisan craft markets.`,
      isTr
        ? `Akşamüstü panoramik bir seyir tepesinde gün batımını seyredin.`
        : isDe
        ? `Sonnenuntergang von einem Aussichtspunkt genießen.`
        : isEs
        ? `Disfrute de la puesta de sol desde un mirador panorámico de la ciudad.`
        : isRu
        ? `Встретьте закат на смотровой площадке с панорамным видом на город.`
        : `Enjoy sunset views from a panoramic city lookout.`
    ],
    foodAndDrinks: [
      famousDishes[0] || (isTr ? 'Geleneksel yemekler' : isDe ? 'Traditionelle Gerichte' : isEs ? 'Platos tradicionales' : isRu ? 'Традиционные блюда' : 'Traditional dishes'),
      drinks[0] || (isTr ? 'Yerel içecekler' : isDe ? 'Lokale Getränke' : isEs ? 'Bebidas locales' : isRu ? 'Местные напитки' : 'Local drinks'),
      streetFood[0] || (isTr ? 'Taze yerel tatlar' : isDe ? 'Frische Snacks' : isEs ? 'Bocados callejeros frescos' : isRu ? 'Свежие местные деликатесы' : 'Fresh local snacks')
    ],
    criticalTips: [
      insights.transport?.taxiAdvice || (
        isTr
          ? 'Lisanslı taksileri veya güvenilir araç çağırma uygulamalarını tercih edin.'
          : isDe
          ? 'Nutzen Sie lizenzierte Taxis oder Apps.'
          : isEs
          ? 'Utilice taxis oficiales con taxímetro o aplicaciones de transporte verificadas.'
          : isRu
          ? 'Пользуйтесь официальными такси со счетчиком или проверенными приложениями.'
          : 'Use licensed metered taxis or verified ride apps.'
      ),
      isTr
        ? 'Müzeler ve anıtlar için mesai saatlerini önceden kontrol edin.'
        : isDe
        ? 'Öffnungszeiten von Museen und Sehenswürdigkeiten vorab prüfen.'
        : isEs
        ? 'Consulte con antelación los horarios de apertura de museos y monumentos.'
        : isRu
        ? 'Заранее уточняйте часы работы музеев и достопримечательностей.'
        : 'Check operating hours for museums and heritage monuments in advance.'
    ],
    mapsQuery: `${capital}, ${countryName}`
  });

  // Durak 2: Büyük Şehir veya Kültür Bölgesi
  const secondCity = majorCities.find(c => c !== capital) || touristRegions[0] || capital;
  const stop2Highlights = mustSee.slice(2, 4);
  stops.push({
    stopNumber: 2,
    name: isTr
      ? `2. Durak: ${secondCity} (Kültür & Yerel Yaşam)`
      : isDe
      ? `Stopp 2: ${secondCity} (Kultur & Lebensart)`
      : isEs
      ? `2.ª Parada: ${secondCity} (Cultura y Vida Local)`
      : isRu
      ? `Остановка 2: ${secondCity} (Культура и местный колорит)`
      : `Stop 2: ${secondCity} (Culture & Local Life)`,
    recommendedDuration: isTr
      ? '2 Gün (Önemli noktalar için yeterli)'
      : isDe
      ? '2 Tage (Ausreichend für Highlights)'
      : isEs
      ? '2 Días (Suficiente para los puntos destacados)'
      : isRu
      ? '2 дня (Достаточно для главных мест)'
      : '2 Days (Sufficient for highlights)',
    durationBadge: isTr ? '2 Gün' : isDe ? '2 Tage' : isEs ? '2 Días' : isRu ? '2 дня' : '2 Days',
    highlights: stop2Highlights.length > 0 ? stop2Highlights : [
      isTr
        ? `${secondCity} Tarihi Yapıları & Parkları`
        : isDe
        ? `${secondCity} Historische Bauten & Parks`
        : isEs
        ? `${secondCity} Monumentos Históricos y Parques`
        : isRu
        ? `${secondCity} Исторические здания и парки`
        : `${secondCity} Historic Landmarks & Parks`
    ],
    activities: [
      isTr
        ? `${secondCity} sokaklarında yerel kafelerde dinlenip şehrin ritmini hissedin.`
        : isDe
        ? `Atmosphäre in den Straßen von ${secondCity} genießen.`
        : isEs
        ? `Sumérjase en el ambiente local en los cafés y calles de ${secondCity}.`
        : isRu
        ? `Почувствуйте ритм жизни в уютных кафе и на улочках ${secondCity}.`
        : `Absorb the local lifestyle and relaxing cafes in ${secondCity}.`,
      isTr
        ? `Bölgeye özgü anıtları ve tarihi yapıları fotoğraflayın.`
        : isDe
        ? `Fotostopps an den wichtigsten Sehenswürdigkeiten.`
        : isEs
        ? `Fotografíe los monumentos y edificios emblemáticos propios de la región.`
        : isRu
        ? `Сфотографируйте уникальные региональные памятники и архитектуру.`
        : `Photograph historic landmarks unique to this region.`
    ],
    foodAndDrinks: [
      famousDishes[1] || famousDishes[0] || (isTr ? 'Bölgesel lezzetler' : isDe ? 'Regionale Spezialitäten' : isEs ? 'Especialidades regionales' : isRu ? 'Региональные блюда' : 'Regional dishes'),
      drinks[1] || drinks[0] || (isTr ? 'Yerel içecekler' : isDe ? 'Lokale Getränke' : isEs ? 'Bebidas locales' : isRu ? 'Местные напитки' : 'Local drinks'),
      streetFood[1] || streetFood[0] || (isTr ? 'Sokak tatlısı' : isDe ? 'Lokale Süßspeisen' : isEs ? 'Postres tradicionales' : isRu ? 'Традиционные сладости' : 'Street sweets')
    ],
    criticalTips: [
      isTr
        ? 'Şehirlerarası ulaşımda konforlu ekspres otobüs veya tren hatlarını tercih edin.'
        : isDe
        ? 'Für Überlandfahrten bequeme Fernbusse oder Züge wählen.'
        : isEs
        ? 'Opte por trenes expresos o autobuses cómodos para los desplazamientos entre ciudades.'
        : isRu
        ? 'Для междугородних поездок выбирайте скоростные поезда или комфортные автобусы.'
        : 'Choose intercity express trains or comfortable coaches for transfers.',
      isTr
        ? 'Kalabalık pazar alanlarında kişisel eşyalarınıza dikkat edin.'
        : isDe
        ? 'Auf belebten Märkten auf Wertsachen achten.'
        : isEs
        ? 'Preste atención a sus pertenencias en mercados y zonas concurridas.'
        : isRu
        ? 'Следите за личными вещами на оживленных рынках и площадях.'
        : 'Keep watchful care over personal items in crowded public markets.'
    ],
    mapsQuery: `${secondCity}, ${countryName}`
  });

  // Durak 3: Doğa & Turistik Cazibe Bölgesi
  const natureRegion = touristRegions.find(r => r !== capital && r !== secondCity) || touristRegions[0] || `${countryName} Doğal Alanları`;
  const stop3Highlights = mustSee.slice(4, 6);
  stops.push({
    stopNumber: 3,
    name: isTr
      ? `3. Durak: ${natureRegion} (Doğa, Manzaralar & Dinlenme)`
      : isDe
      ? `Stopp 3: ${natureRegion} (Natur & Erholung)`
      : isEs
      ? `3.ª Parada: ${natureRegion} (Naturaleza, Vistas y Descanso)`
      : isRu
      ? `Остановка 3: ${natureRegion} (Природа, пейзажи и отдых)`
      : `Stop 3: ${natureRegion} (Nature & Relaxation)`,
    recommendedDuration: isTr
      ? '2-3 Gün (Doğa ve manzara için ideal)'
      : isDe
      ? '2-3 Tage (Ideal für Natur)'
      : isEs
      ? '2-3 Días (Ideal para disfrutar de la naturaleza)'
      : isRu
      ? '2-3 дня (Идеально для природы и пейзажей)'
      : '2-3 Days (Ideal for nature)',
    durationBadge: isTr ? '2-3 Gün' : isDe ? '2-3 Tage' : isEs ? '2-3 Días' : isRu ? '2-3 дня' : '2-3 Days',
    highlights: stop3Highlights.length > 0 ? stop3Highlights : [
      isTr
        ? `${natureRegion} Doğal Seyir Alanları & Parklar`
        : isDe
        ? `${natureRegion} Panoramablicke & Naturparks`
        : isEs
        ? `${natureRegion} Miradores Naturales y Parques`
        : isRu
        ? `${natureRegion} Панорамные смотровые площадки и парки`
        : `${natureRegion} Scenic Viewpoints & Parks`
    ],
    activities: [
      isTr
        ? `Temiz havada doğa yürüyüşü yapıp manzara noktalarını keşfedin.`
        : isDe
        ? `Wandern in der Natur und Panoramablicke genießen.`
        : isEs
        ? `Disfrute de rutas de senderismo y miradores con vistas panorámicas.`
        : isRu
        ? `Совершите пешие прогулки на свежем воздухе и насладитесь панорамами.`
        : `Hike scenic trails and take in panoramic vistas in the great outdoors.`,
      isTr
        ? `Bölgenin otantik lezzetlerini yerel bir restoranda deneyimleyin.`
        : isDe
        ? `Authentische regionale Spezialitäten probieren.`
        : isEs
        ? `Pruebe los platos tradicionales en restaurantes rurales y auténticos.`
        : isRu
        ? `Попробуйте аутентичные блюда в традиционных местных тавернах.`
        : `Sample regional specialties at an authentic countryside venue.`
    ],
    foodAndDrinks: [
      famousDishes[2] || famousDishes[0] || (isTr ? 'Yöresel fırın yemekleri' : isDe ? 'Regionale Spezialitäten' : isEs ? 'Guisos regionales tradicionales' : isRu ? 'Традиционные региональные блюда' : 'Regional oven-baked dishes'),
      drinks[0] || (isTr ? 'Taze kaynak suları ve çaylar' : isDe ? 'Frisches Quellwasser & Tees' : isEs ? 'Infusiones y agua fresca de manantial' : isRu ? 'Свежая родниковая вода и чай' : 'Spring water & teas'),
      streetFood[0] || (isTr ? 'Doğal meyveler' : isDe ? 'Frisches Obst' : isEs ? 'Frutas naturales y delicias locales' : isRu ? 'Свежие фрукты и местные угощения' : 'Local seasonal fruits')
    ],
    criticalTips: [
      isTr
        ? 'Doğa gezileri için mevsime uygun yürüyüş ayakkabısı ve koruyucu giysiler getirin.'
        : isDe
        ? 'Für Naturtouren festes Schuhwerk und wetterfeste Kleidung mitbringen.'
        : isEs
        ? 'Lleve calzado adecuado de montaña y ropa según la estación para las excursiones.'
        : isRu
        ? 'Для загородных поездок возьмите удобную треккинговую обувь и одежду по сезону.'
        : 'Bring suitable hiking footwear and weather-resistant gear for nature excursions.',
      isTr
        ? 'Hava koşullarını önceden kontrol edip seyahat planınızı buna göre ayarlayın.'
        : isDe
        ? 'Wetterbericht vor Ausflügen prüfen.'
        : isEs
        ? 'Consulte el pronóstico del tiempo antes de salir a la naturaleza.'
        : isRu
        ? 'Проверяйте прогноз погоды перед отправлением на природные локации.'
        : 'Monitor local weather forecasts prior to departures.'
    ],
    mapsQuery: `${natureRegion}, ${countryName}`
  });

  const totalDays = 7;
  const routeName = isTr
    ? `${countryName} İkonik Keşif Rotası: ${capital}, ${secondCity} & ${natureRegion.split(' ')[0]}`
    : isDe
    ? `${countryName} Entdeckerroute: ${capital}, ${secondCity} & Natur`
    : isEs
    ? `Ruta Clásica por ${countryName}: ${capital}, ${secondCity} y Paisajes Naturales`
    : isRu
    ? `Классический маршрут по ${countryName}: ${capital}, ${secondCity} и природа`
    : `${countryName} Essential Highlights Route: ${capital}, ${secondCity} & Nature`;

  const routeSummary = isTr
    ? `${countryName}’in tarihi başkenti ${capital}’den başlayıp kültürel merkezlere ve büyüleyici doğal alanlara uzanan, ülkenin en özel deneyimlerini bir araya getiren ${totalDays} günlük dengeli gezi rotası.`
    : isDe
    ? `Eine ausgewogene ${totalDays}-tägige Entdeckungsreise durch ${countryName}, von der Hauptstadt ${capital} bis zu malerischen Kultur- und Naturlandschaften.`
    : isEs
    ? `Un itinerario completo y equilibrado de ${totalDays} días por ${countryName}, desde la capital histórica de ${capital} hasta centros culturales y sobrecogedores paisajes naturales.`
    : isRu
    ? `Сбалансированный ${totalDays}-дневный маршрут по ${countryName}: от исторической столицы ${capital} до культурных центров и живописных природных ландшафтов.`
    : `A balanced ${totalDays}-day travel itinerary taking you from the historic capital of ${capital} through authentic cultural hubs and scenic natural landscapes in ${countryName}.`;

  const bestSeason = encyclopedia.tourism.bestSeasons || (
    isTr ? 'İlkbahar ve Sonbahar ayları' : isDe ? 'Frühling und Herbst' : isEs ? 'Meses de primavera y otoño' : isRu ? 'Весна и осень' : 'Spring and Autumn months'
  );

  const transportMode = isTr
    ? `Şehirlerarası tren/otobüs ağı + ${capital} içinde metro ve taksi uygulamaları (${insights.transport?.popularRideApps?.join(', ') || 'Yerel Taksi'})`
    : isDe
    ? `Überlandbusse/Züge + Taxis/Apps (${insights.transport?.popularRideApps?.join(', ') || 'Lokale Taxis'})`
    : isEs
    ? `Red interurbana de trenes/autobuses + metro y apps de transporte en ${capital} (${insights.transport?.popularRideApps?.join(', ') || 'Taxi local'})`
    : isRu
    ? `Междугородние поезда/автобусы + городской транспорт и такси в ${capital} (${insights.transport?.popularRideApps?.join(', ') || 'Местное такси'})`
    : `Intercity rail/bus network + urban transit and ride apps (${insights.transport?.popularRideApps?.join(', ') || 'Local Taxis'})`;

  return {
    countryCode: code,
    countryName,
    routeName,
    routeSummary,
    totalDays,
    idealDurationText: isTr
      ? `${totalDays} Günlük Klasik Rota`
      : isDe
      ? `${totalDays}-Tage Entdeckerroute`
      : isEs
      ? `Ruta Clásica de ${totalDays} Días`
      : isRu
      ? `Классический маршрут на ${totalDays} дней`
      : `${totalDays}-Day Signature Itinerary`,
    bestSeason,
    transportMode,
    paceLevel: isTr
      ? 'Dengeli (Kültür + Şehir + Doğa)'
      : isDe
      ? 'Ausgewogen (Kultur & Natur)'
      : isEs
      ? 'Equilibrado (Cultura, Ciudad y Naturaleza)'
      : isRu
      ? 'Сбалансированный (Культура, город и природа)'
      : 'Balanced (Culture & Nature)',
    stops,
    signatureGastronomy: {
      dishes: famousDishes,
      drinks,
      streetFoods: streetFood,
      diningAdvice: isTr
        ? (encyclopedia.economy.tippingCulture || 'Turistik restoranlarda %10 civarında bahşiş bırakmak nezaket kuralıdır.')
        : isDe
        ? (encyclopedia.economy.tippingCulture || 'Ein Trinkgeld von ca. 10 % in Restaurants ist üblich.')
        : isEs
        ? (encyclopedia.economy.tippingCulture || 'Es habitual dejar alrededor de un 10% de propina en restaurantes con servicio.')
        : isRu
        ? (encyclopedia.economy.tippingCulture || 'В ресторанах с обслуживанием принято оставлять около 10% чаевых.')
        : (encyclopedia.economy.tippingCulture || 'A 10% gratuity is customary and appreciated in sit-down restaurants.')
    },
    packingAndPrecautions: {
      essentials: [
        isTr ? 'Rahat yürüyüş ayakkabıları ve mevsime uygun giysiler' : isDe ? 'Bequeme Wanderschuhe' : isEs ? 'Calzado cómodo para caminar y ropa adecuada para la temporada' : isRu ? 'Удобная обувь для ходьбы и одежда по сезону' : 'Comfortable walking shoes',
        isTr ? `Seyahat priz adaptörü (${geography.plugTypes || 'Uluslararası adaptör'})` : isDe ? `Reiseadapter (${geography.plugTypes})` : isEs ? `Adaptador de viaje (${geography.plugTypes || 'Adaptador universal'})` : isRu ? `Адаптер для розеток (${geography.plugTypes || 'Универсальный переходник'})` : `Plug adapter (${geography.plugTypes})`,
        isTr ? 'Taşınabilir şarj aleti (powerbank)' : isDe ? 'Powerbank' : isEs ? 'Batería externa portátil (powerbank)' : isRu ? 'Портативный аккумулятор (пауэрбанк)' : 'Portable powerbank',
        isTr ? 'Güneş kremi ve su matarası' : isDe ? 'Sonnenschutz und Trinkflasche' : isEs ? 'Protector solar y botella de agua reutilizable' : isRu ? 'Солнцезащитный крем и бутылка для воды' : 'Sun protection and water bottle'
      ],
      safetyAndEtiquette: [
        isTr
          ? (insights.safety.safeTravelTips?.[0] || 'Kalabalık alanlarda kişisel eşyalarınıza dikkat edin.')
          : isDe
          ? (insights.safety.safeTravelTips?.[0] || 'Auf Wertsachen in belebten Bereichen achten.')
          : isEs
          ? (insights.safety.safeTravelTips?.[0] || 'Cuide sus pertenencias personales en áreas concurridas.')
          : isRu
          ? (insights.safety.safeTravelTips?.[0] || 'Следите за личными вещами в местах скопления людей.')
          : (insights.safety.safeTravelTips?.[0] || 'Keep personal belongings secure in crowded public places.'),
        isTr
          ? (encyclopedia.culture.etiquette?.[0] || 'Yerel dini ve sosyal görgü kurallarına saygı gösterin.')
          : isDe
          ? (encyclopedia.culture.etiquette?.[0] || 'Lokale Traditionen und Bräuche respektieren.')
          : isEs
          ? (encyclopedia.culture.etiquette?.[0] || 'Respete las normas de etiqueta social y tradiciones locales.')
          : isRu
          ? (encyclopedia.culture.etiquette?.[0] || 'Уважайте местные культурные обычаи и религиозные нормы.')
          : (encyclopedia.culture.etiquette?.[0] || 'Respect local cultural customs and religious etiquette.')
      ]
    }
  };
}

/**
 * Ülke Seyahat Rota Planını Döndürür
 * Küratörlü zengin veri varsa onu, yoksa dinamik sentezleyiciyi çalıştırır.
 */
export function getCountryItinerary(
  countryCode: string,
  lang: string = 'tr'
): CountryTravelItinerary {
  const code = countryCode.toUpperCase();
  const curated = CURATED_ITINERARIES[code] || CURATED_ITINERARIES_EXTRA[code];

  if (!curated) {
    return generateDynamicCountryItinerary(code, lang);
  }

  const countryName = getCountryName(code, lang);

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
    routeName: tField(curated.routeName),
    routeSummary: tField(curated.routeSummary),
    totalDays: curated.totalDays,
    idealDurationText: tField(curated.idealDurationText),
    bestSeason: tField(curated.bestSeason),
    transportMode: tField(curated.transportMode),
    paceLevel: tField(curated.paceLevel),
    stops: curated.stops.map(s => ({
      stopNumber: s.name.tr ? parseInt(s.name.tr.charAt(0)) || 1 : 1,
      name: tField(s.name),
      recommendedDuration: tField(s.recommendedDuration),
      durationBadge: tField(s.durationBadge),
      highlights: tArr(s.highlights),
      activities: tArr(s.activities),
      foodAndDrinks: tArr(s.foodAndDrinks),
      criticalTips: tArr(s.criticalTips),
      mapsQuery: s.mapsQuery
    })),
    signatureGastronomy: {
      dishes: tArr(curated.signatureGastronomy.dishes),
      drinks: tArr(curated.signatureGastronomy.drinks),
      streetFoods: tArr(curated.signatureGastronomy.streetFoods),
      diningAdvice: tField(curated.signatureGastronomy.diningAdvice)
    },
    packingAndPrecautions: {
      essentials: tArr(curated.packingAndPrecautions.essentials),
      safetyAndEtiquette: tArr(curated.packingAndPrecautions.safetyAndEtiquette)
    }
  };
}
