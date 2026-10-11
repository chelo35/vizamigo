/**
 * Vizamigo - Ek Küratörlü Turistik Gezi Rotaları
 * DE, ES, GR, GB, US, ID, PT, CH, GE, AE, KR, VN
 */

import { CuratedItineraryDef } from './countryItineraries';

export const CURATED_ITINERARIES_EXTRA: Record<string, any> = {
  // ALMANYA (DE)
  DE: {
    routeName: {
      tr: 'Almanya Masal & Tarih Rotası: Berlin, Romantik Yol & Bavyera Alpleri',
      en: 'Fairy Tale & Heritage Germany: Berlin, Romantic Road & Bavarian Alps',
      de: 'Märchen & Geschichte: Berlin, Romantische Straße & Bayerische Alpen'
    },
    routeSummary: {
      tr: 'Tarihi Berlin Duvarı ve müzeler adasından başlayıp Orta Çağ kasabalarıyla ünlü Romantik Yol’a, oradan da Neuschwanstein Şatosu ve Münih bira bahçelerine uzanan 9 günlük klasik rota.',
      en: 'A 9-day German grand tour from the vibrant cultural center of Berlin through fairytale medieval towns along the Romantic Road to Neuschwanstein Castle and Munich.',
      de: 'Eine 9-tägige Reise von der pulsierenden Metropole Berlin über die Romantische Straße bis zu Schloss Neuschwanstein und München.'
    },
    totalDays: 9,
    idealDurationText: {
      tr: '9 Günlük Masal Rotası',
      en: '9-Day Fairytale Route',
      de: '9-Tage Rundreise'
    },
    bestSeason: {
      tr: 'Mayıs - Eylül (Ilık açık hava) veya Aralık (Masalsı Noel Pazarları)',
      en: 'May - September (Pleasant weather) or December (Magical Christmas Markets)',
      de: 'Mai - September oder Dezember (Weihnachtsmärkte)'
    },
    transportMode: {
      tr: 'Deutsche Bahn ICE Hızlı Treni + Bavyera’da kiralık araç',
      en: 'Deutsche Bahn ICE High-Speed Rail + Rental car for Bavaria',
      de: 'Deutsche Bahn ICE-Züge + Mietwagen für Bayern'
    },
    paceLevel: {
      tr: 'Dengeli & Kültürel',
      en: 'Balanced & Scenic',
      de: 'Ausgewogen & Kulturell'
    },
    stops: [
      {
        name: {
          tr: '1. Durak: Berlin (Tarih, Müzeler & Özgür Ruh)',
          en: 'Stop 1: Berlin (History, Museums & Creative Energy)',
          de: 'Stopp 1: Berlin (Geschichte, Museen & Kreativität)'
        },
        recommendedDuration: {
          tr: '3 Gün (Şehir mirası ve semtler için yeterli)',
          en: '3 Days (Sufficient for key landmarks and vibrant quarters)',
          de: '3 Tage (Ideal für Sehenswürdigkeiten)'
        },
        durationBadge: { tr: '3 Gün', en: '3 Days', de: '3 Tage' },
        highlights: {
          tr: ['Brandenburg Kapısı & Reichstag Cam Kubbesi', 'East Side Gallery (Berlin Duvarı Grafiti Sanatı)', 'Müzeler Adası (Pergamon Müzesi & Bergama Sunağı)', 'Checkpoint Charlie & Kreuzberg Kafeleri'],
          en: ['Brandenburg Gate & Reichstag Glass Dome', 'East Side Gallery (Berlin Wall Murals)', 'Museum Island (Pergamon Museum)', 'Checkpoint Charlie & Kreuzberg Alternative Quarter'],
          de: ['Brandenburger Tor & Reichstag', 'East Side Gallery (Berliner Mauer)', 'Museumsinsel', 'Checkpoint Charlie & Kreuzberg']
        },
        activities: {
          tr: [
            'Reichstag cam kubbesine önceden randevu alarak çıkıp 360 derece parlamento manzarasını izleyin.',
            'Spree Nehri boyunca uzanan Berlin Duvarı kalıntılarında tarihi grafitileri fotoğraflayın.',
            'Müzeler Adası’nda Bergama ve İştar Kapısı antik hazinelerini gezin.'
          ],
          en: [
            'Ascend the glass dome of the Reichstag for panoramic views over Berlin.',
            'Walk along open-air murals of the East Side Gallery by the river Spree.',
            'Admire ancient artifacts on UNESCO Museum Island.'
          ],
          de: [
            'Besuch der Glaskuppel des Reichstagsgebäudes.',
            'Spaziergang entlang der East Side Gallery.',
            'UNESCO-Museumsinsel erkunden.'
          ]
        },
        foodAndDrinks: {
          tr: ['Currywurst (baharatlı köri soslu Berlin sosisi)', 'Mustafa’s Gemüse Kebap (meşhur tavuk döner)', 'Berliner Pfannkuchen (marmelatlı çörek)', 'Berliner Kindl & Weiße buğday birası'],
          en: ['Original Berlin Currywurst with spiced ketchup', 'Mustafa’s famous gemüse kebab', 'Berliner jam-filled pastry', 'Berliner Weiße wheat beer with woodruff'],
          de: ['Original Berliner Currywurst', 'Mustafa’s Gemüse Kebap', 'Berliner Pfannkuchen', 'Berliner Weiße']
        },
        criticalTips: {
          tr: [
            'Reichstag kubbe ziyareti ücretsizdir fakat haftalar öncesinden resmi web sitesinden pasaportla kayıt yaptırmak ZORUNLUDUR.',
            'Pazar günleri Almanya’da süpermarketler ve dükkanlar kapalıdır (Ruhetag).'
          ],
          en: [
            'Reichstag dome entry is free but requires mandatory passport registration online weeks ahead.',
            'Sundays are quiet rest days (Ruhetag); supermarkets and retail stores are closed.'
          ],
          de: [
            'Besuch der Reichstagskuppel ist kostenlos, erfordert aber frühzeitige Online-Anmeldung.',
            'Sonntagsruhe beachten: Geschäfte und Supermärkte sind sonntags geschlossen.'
          ]
        },
        mapsQuery: 'Brandenburg Gate, Berlin, Germany'
      },
      {
        name: {
          tr: '2. Durak: Romantik Yol & Rothenburg ob der Tauber',
          en: 'Stop 2: The Romantic Road & Rothenburg ob der Tauber',
          de: 'Stopp 2: Romantische Straße & Rothenburg ob der Tauber'
        },
        recommendedDuration: {
          tr: '2 Gün (Orta Çağ surları ve masal kasabaları için yeterli)',
          en: '2 Days (Medieval walls and half-timbered storybook villages)',
          de: '2 Tage (Mittelalterliche Fachwerkhäuser)'
        },
        durationBadge: { tr: '2 Gün', en: '2 Days', de: '2 Tage' },
        highlights: {
          tr: ['Rothenburg ob der Tauber Plönlein Meydanı', 'Käthe Wohlfahrt Yıl Boyu Açık Noel Köyü', 'Orta Çağ Şehir Surları Yürüyüş Yolu', 'Würzburg Residenz Sarayı & Bağları'],
          en: ['Plönlein Corner in Rothenburg ob der Tauber', 'Käthe Wohlfahrt Christmas Village', 'Intact Medieval Town Wall Ramparts', 'Würzburg Residence & Franconian Vineyards'],
          de: ['Plönlein in Rothenburg', 'Käthe Wohlfahrt Weihnachtsdorf', 'Stadtmauer-Rundgang', 'Würzburger Residenz']
        },
        activities: {
          tr: [
            'Masal kitaplarından fırlamış gibi duran ahşap kirişli evlerin arasında gece bekçisi (Night Watchman) turuna katılın.',
            'Rothenburg’un surları boyunca yürüyüp kırmızı kiremitli çatıları seyredin.'
          ],
          en: [
            'Join the humorous evening Night Watchman tour through lantern-lit cobblestones.',
            'Walk the preserved medieval battlements overlooking the Tauber Valley.'
          ],
          de: [
            'Nachtwächter-Führung durch die historischen Gassen.',
            'Spaziergang auf der mittelalterlichen Stadtmauer.'
          ]
        },
        foodAndDrinks: {
          tr: ['Schneeballen (pudra şekerli çıtır kartopu tatlısı)', 'Franken kuru beyaz şarabı (Bocksbeutel şişesinde)', 'Rostbratwurst ızgara sosisleri'],
          en: ['Traditional Schneeballen (crispy snowball pastry dusted with sugar)', 'Franconian dry Silvaner white wine', 'Grilled Nuremberg bratwurst sausages'],
          de: ['Rothenburger Schneeballen', 'Fränkischer Silvaner im Bocksbeutel', 'Nürnberger Rostbratwürste']
        },
        criticalTips: {
          tr: [
            'Rothenburg popüler bir turistik duraktır; sabah erken ve akşam saatlerinde otobüs turları ayrıldığında büyülü bir sessizliğe bürünür.',
            'Tarihi parke taşlı yollarda topuklu ayakkabı giyilmemelidir.'
          ],
          en: [
            'Stay overnight; the town becomes magical after day-tripper tour buses leave at 5 PM.',
            'Wear flat shoes for cobbled pathways.'
          ],
          de: [
            'Übernachten lohnt sich: Abends verlassen die Touristenbusse die Stadt.',
            'Feste flache Schuhe für das Kopfsteinpflaster tragen.'
          ]
        },
        mapsQuery: 'Rothenburg ob der Tauber, Germany'
      },
      {
        name: {
          tr: '3. Durak: Bavyera Alpleri, Neuschwanstein Şatosu & Münih',
          en: 'Stop 3: Bavarian Alps, Neuschwanstein Castle & Munich',
          de: 'Stopp 3: Bayerische Alpen, Schloss Neuschwanstein & München'
        },
        recommendedDuration: {
          tr: '4 Gün (Şato turu, Alpler ve Münih için ideal)',
          en: '4 Days (Castle visit, Alpine scenery, and Munich culture)',
          de: '4 Tage (Schloss Neuschwanstein, Alpen & München)'
        },
        durationBadge: { tr: '4 Gün', en: '4 Days', de: '4 Tage' },
        highlights: {
          tr: ['Neuschwanstein Masal Şatosu & Marienbrücke Köprüsü', 'Münih Marienplatz & Glockenspiel Saat Kulesi', 'Englischer Garten & Eisbachwelle Sörfçüleri', 'Tarihi Hofbräuhaus Bira Bahçesi'],
          en: ['Neuschwanstein Fairytale Castle & Marienbrücke bridge', 'Munich Marienplatz & Glockenspiel chime', 'English Garden & Eisbach River Wave Surfers', 'Historic Hofbräuhaus & Beer Gardens'],
          de: ['Schloss Neuschwanstein & Marienbrücke', 'Münchner Marienplatz & Glockenspiel', 'Englischer Garten & Eisbachwelle', 'Hofbräuhaus & Biergärten']
        },
        activities: {
          tr: [
            'Disney şatosuna ilham veren Neuschwanstein Şatosu’nu Marienbrücke asma köprüsünden fotoğraflayın.',
            'Münih Marienplatz’da saat kulesindeki mekanik figürlerin dansını izleyin.',
            'İngiliz Bahçesi’ndeki Eisbach nehir dalgasında sörf yapan sporcuları seyredip devasa kestane ağaçları altında açık hava bira bahçesinde dinlenin.'
          ],
          en: [
            'Capture classic postcard angles of Neuschwanstein Castle from the Marienbrücke suspension bridge.',
            'Watch the mechanical Glockenspiel show at Munich’s New Town Hall.',
            'Watch surfers tackle standing river waves at the Eisbach before relaxing in a leafy beer garden.'
          ],
          de: [
            'Panoramablick auf Schloss Neuschwanstein von der Marienbrücke.',
            'Glockenspiel am Marienplatz beobachten.',
            'Flusssurfer an der Eisbachwelle zusehen und den Biergarten genießen.'
          ]
        },
        foodAndDrinks: {
          tr: ['Bavyera Schweinshaxe (çıtır derili fırınlanmış domuz budu)', 'Geleneksel Weißwurst (tatlı hardallı beyaz sosis) & Brezel', 'Apfelstrudel (sıcak vanilyalı elmalı turta)', 'Bavyera Helles & Weißbier buğday birası'],
          en: ['Crispy Bavarian pork knuckle (Schweinshaxe)', 'Traditional poached Weißwurst with sweet mustard and soft pretzels', 'Warm apple strudel with vanilla cream', 'Bavarian Helles and cloudy wheat beer'],
          de: ['Bayerische Schweinshaxe mit Knödeln', 'Münchner Weißwurst mit süßem Senf und Brezen', 'Apfelstrudel mit Vanillesoße', 'Münchner Helles & Weißbier']
        },
        criticalTips: {
          tr: [
            'Neuschwanstein Şatosu iç mekan turları haftalar öncesinden tükenir; Hohenschwangau bilet sitesinden rezervasyon şarttır.',
            'Bira bahçelerinde masa örtüsü olmayan tahta masalara kendi yiyeceğinizi getirebilirsiniz; içeceği bardan almak zorunludur.'
          ],
          en: [
            'Castle interior tickets sell out weeks ahead; reserve online via the official ticket center.',
            'In traditional Bavarian beer gardens, you can bring your own picnic food to wooden tables without tablecloths, provided you purchase drinks from the counter.'
          ],
          de: [
            'Schlosstickets unbedingt Wochen im Voraus online reservieren.',
            'Biergarten-Tradition: Eigene Brotzeit darf im Selbstbedienungsbereich mitgebracht werden.'
          ]
        },
        mapsQuery: 'Neuschwanstein Castle, Schwangau, Germany'
      }
    ],
    signatureGastronomy: {
      dishes: {
        tr: ['Schweinshaxe & Knödel', 'Currywurst', 'Bavyera Weißwurst & Brezel', 'Sauerbraten'],
        en: ['Schweinshaxe Pork Knuckle', 'Currywurst', 'Bavarian Veal Sausages & Pretzels', 'Sauerbraten Pot Roast'],
        de: ['Schweinshaxe mit Knödeln', 'Currywurst', 'Weißwurst mit Breze', 'Sauerbraten']
      },
      drinks: {
        tr: ['Bavyera Weißbier & Helles', 'Riesling & Silvaner Şarapları', 'Apfelschorle (Elmalı maden suyu)', 'Schnaps'],
        en: ['Bavarian Wheat Beer & Pilsner', 'Riesling White Wine', 'Apfelschorle Apple Spritzer', 'Schnapps'],
        de: ['Weißbier & Helles', 'Deutscher Riesling', 'Apfelschorle', 'Obstler-Schnaps']
      },
      streetFoods: {
        tr: ['Currywurst patatesli', 'Tuzlu Fırın Brezel', 'Döner Kebab', 'Fischbrötchen (kuzeyde)'],
        en: ['Currywurst with fries', 'Giant Salted Pretzels', 'German Döner Kebab', 'Fish Rolls'],
        de: ['Currywurst mit Pommes', 'Laugenbrezel', 'Döner Kebab', 'Fischbrötchen']
      },
      diningAdvice: {
        tr: 'Almanya’da restoranlarda hesaba %5-10 civarı bahşiş (Trinkgeld) eklemek gelenektir. Ödeme yaparken para üstü beklemeden doğrudan toplam tutarı söyleyerek yuvarlarsınız (örn. hesap 27€ ise "30€ bitte" dersiniz).',
        en: 'A 5-10% tip is standard. Rather than leaving cash on tables, state the rounded-up total to the server when paying.',
        de: '5-10 % Trinkgeld sind üblich. Beim Bezahlen direkt den aufgerundeten Betrag nennen (z.B. "30 Euro bitte").'
      }
    },
    packingAndPrecautions: {
      essentials: {
        tr: ['Mevsime uygun yağmurluk ve ceket', 'Yürüyüş ayakkabıları', 'Pfand (şişe depozitosu) için bozuk paralar', 'Euro priz adaptörü (Tip C/F)'],
        en: ['Rain jacket and layered clothing', 'Comfortable walking shoes', 'A bit of cash for bakeries and small stalls', 'Euro plug adapter type C/F'],
        de: ['Wetterfeste Kleidung', 'Bequeme Wanderschuhe', 'Etwas Bargeld für Bäckereien', 'Euro-Stecker']
      },
      safetyAndEtiquette: {
        tr: [
          'Trafik ışıklarında yayalar için kırmızı yanarken ASLA karşıya geçmeyin; çocuklar varsa sert tepki alırsınız.',
          'Bisiklet yollarında (Radweg) yürümeyin; bisikletliler hızlı gelir ve haklı olarak zil çalarlar.',
          'Geri dönüşümlü şişeleri çöpe atmayın; marketlerdeki otomatlara iade edip 0.25€ depozito alınır.'
        ],
        en: [
          'Never jaywalk on red lights; Germans take pedestrian rules seriously, especially around children.',
          'Do not walk on red-paved cycle paths (Radweg); cyclists ride fast.',
          'Do not throw deposit bottles (Pfand) in trash cans; return them to supermarket machines for €0.25.'
        ],
        de: [
          'Niemals bei Rot über die Fußgängerampel gehen.',
          'Radwege für Radfahrer freihalten.',
          'Pfandflaschen im Supermarkt zurückgeben.'
        ]
      }
    }
  },

  // İSPANYA (ES)
  ES: {
    routeName: {
      tr: 'Endülüs’ten Katalonya’ya: Madrid, Sevilla, Granada (Elhamra) & Barselona',
      en: 'Andalusia to Catalonia: Madrid, Seville, Granada (Alhambra) & Barcelona',
      de: 'Von Andalusien nach Katalonien: Madrid, Sevilla, Granada & Barcelona'
    },
    routeSummary: {
      tr: 'Kraliyet başkenti Madrid’den başlayıp flamenko ve portakal çiçeği kokulu Sevilla’ya, Elhamra Sarayı’nın Mağribi büyüsüne ve Akdeniz’in Gaudi mimarili incisi Barselona’ya uzanan 10 günlük masalsı rota.',
      en: 'A 10-day vibrant journey linking Madrid’s royal plazas, Seville’s fiery flamenco, the Moorish palace of the Alhambra in Granada, and Gaudí’s Barcelona.',
      de: 'Eine 10-tägige Traumreise von den Palästen in Madrid über die Flamenco-Stadt Sevilla und die maurische Alhambra in Granada bis nach Barcelona.'
    },
    totalDays: 10,
    idealDurationText: {
      tr: '10 Günlük Güneş & Sanat Rotası',
      en: '10-Day Sunshine & Heritage Route',
      de: '10-Tage Spanien-Rundreise'
    },
    bestSeason: {
      tr: 'Mart - Mayıs & Eylül - Ekim (Yaz aylarındaki 40°C aşırı sıcaktan kaçınmak için)',
      en: 'March - May & September - October (Avoid brutal 40°C summer heat in the south)',
      de: 'März - Mai & September - Oktober (Sehr heiße Sommer im Süden meiden)'
    },
    transportMode: {
      tr: 'Renfe AVE Yüksek Hızlı Treni (Madrid - Sevilla - Granada - Barselona)',
      en: 'Renfe AVE High-Speed Rail Network',
      de: 'Renfe AVE-Hochgeschwindigkeitszüge'
    },
    paceLevel: {
      tr: 'Canlı & Akdeniz Ritmi (Geç Akşam Yemekleri)',
      en: 'Vibrant & Mediterranean (Late dining culture)',
      de: 'Lebendig & Spanischer Lebensrhythmus'
    },
    stops: [
      {
        name: {
          tr: '1. Durak: Madrid (Kraliyet Başkenti & Prado Sanatı)',
          en: 'Stop 1: Madrid (Royal Capital & Golden Art Triangle)',
          de: 'Stopp 1: Madrid (Königliche Hauptstadt & Kunst)'
        },
        recommendedDuration: {
          tr: '3 Gün (Müzeler, saray ve tapas barları için yeterli)',
          en: '3 Days (Sufficient for royal palace, Prado, and tapas)',
          de: '3 Tage (Ideal für Museen & Tapas-Bars)'
        },
        durationBadge: { tr: '3 Gün', en: '3 Days', de: '3 Tage' },
        highlights: {
          tr: ['Plaza Mayor & Puerta del Sol Meydanları', 'Prado Müzesi (Velázquez & Goya)', 'Kraliyet Sarayı (Palacio Real) & Sabatini Bahçeleri', 'El Retiro Parkı & Kristal Saray'],
          en: ['Plaza Mayor & Puerta del Sol', 'Prado Museum (Velázquez & Goya)', 'Royal Palace & Sabatini Gardens', 'El Retiro Park & Crystal Palace'],
          de: ['Plaza Mayor & Puerta del Sol', 'Prado-Museum', 'Königspalast & Sabatini-Gärten', 'Retiro-Park & Kristallpalast']
        },
        activities: {
          tr: [
            'Sabah Prado Müzesi’nde Las Meninas tablosunun büyüsüne kapılın.',
            'Retiro Parkı’nda gölette kürek çekip camdan yapılmış Kristal Saray’ı gezin.',
            'Akşamüstü Mercado de San Miguel’de zeytin, peynir ve iberico jambonlu tapas tadımı yapın.'
          ],
          en: [
            'Marvel at masterworks of Velázquez and Goya in the Prado.',
            'Row a wooden boat on the lake in Retiro Park.',
            'Graze on gourmet tapas and jamón ibérico at the Mercado de San Miguel.'
          ],
          de: [
            'Meisterwerke im Prado-Museum bewundern.',
            'Ruderboot fahren im Retiro-Park.',
            'Tapas probieren im Mercado de San Miguel.'
          ]
        },
        foodAndDrinks: {
          tr: ['Jamón Ibérico de Bellota (meşe palamuduyla beslenen İberik jambonu)', 'Churros con Chocolate (San Ginés çikolatacısında)', 'Bocadillo de Calamares (çıtır kalamar sandviçi)', 'Tinto de Verano soğuk ferahlatıcı içeceği'],
          en: ['Jamón Ibérico de Bellota dry-cured ham', 'Churros dipped in thick chocolate at Chocolatería San Ginés', 'Crispy calamari sandwich at Plaza Mayor', 'Refreshing iced Tinto de Verano wine spritzer'],
          de: ['Jamón Ibérico', 'Churros con Chocolate bei San Ginés', 'Bocadillo de Calamares', 'Tinto de Verano']
        },
        criticalTips: {
          tr: [
            'İspanya’da öğle yemeği 14:00-16:00, akşam yemeği ise 21:00-23:00 saatleri arasındadır; erken giderseniz restoranlar kapalı olabilir.',
            'Puerta del Sol ve metroda yankesicilere karşı cüzdanınıza dikkat edin.'
          ],
          en: [
            'Spain eats late: lunch is 2:00-4:00 PM, dinner begins after 9:00 PM.',
            'Keep watchful eye on pockets in crowded Sol and Metro stations.'
          ],
          de: [
            'Späte Essenszeiten: Mittagessen ab 14 Uhr, Abendessen ab 21 Uhr.',
            'Auf Taschendiebe an der Puerta del Sol und in der Metro achten.'
          ]
        },
        mapsQuery: 'Plaza Mayor, Madrid, Spain'
      },
      {
        name: {
          tr: '2. Durak: Sevilla & Granada (Elhamra Sarayı & Flamenko)',
          en: 'Stop 2: Seville & Granada (Alhambra Palace & Flamenco)',
          de: 'Stopp 2: Sevilla & Granada (Alhambra & Flamenco)'
        },
        recommendedDuration: {
          tr: '4 Gün (Sevilla 2 gün + Granada Elhamra 2 gün)',
          en: '4 Days (Seville 2 days + Granada 2 days)',
          de: '4 Tage (Sevilla & Granada)'
        },
        durationBadge: { tr: '4 Gün', en: '4 Days', de: '4 Tage' },
        highlights: {
          tr: ['Granada Elhamra Sarayı (Nasrid Sarayları & Generalife Bahçeleri)', 'Sevilla Plaza de España & Alcázar Sarayı', 'Sevilla Katedrali & Giralda Kulesi', 'Triana & Albaicín Mahallelerinde Otantik Flamenko'],
          en: ['Granada Alhambra Palace & Nasrid Courtyards', 'Seville Plaza de España & Real Alcázar', 'Seville Cathedral & Giralda Tower', 'Authentic Gypsy Flamenco in Triana and Albaicín'],
          de: ['Alhambra in Granada (Nasridenpaläste)', 'Plaza de España & Real Alcázar in Sevilla', 'Kathedrale von Sevilla & Giralda', 'Flamenco in Triana & Albaicín']
        },
        activities: {
          tr: [
            'Elhamra Sarayı’nın Aslanlı Avlusu’nda Mağribi mimarisinin dantel gibi işlenmiş taş işçiliğine tanık olun.',
            'Sevilla Plaza de España’nın mozaikli köprülerinde yürüyün.',
            'Sacromonte mağaralarında veya Triana barlarında tutkulu Flamenko gösterisi izleyin.'
          ],
          en: [
            'Gaze at the intricate stucco geometry inside the Court of the Lions at the Alhambra.',
            'Walk through tiled alcoves depicting Spanish provinces at Seville’s Plaza de España.',
            'Experience authentic soul-stirring flamenco in a cave club in Sacromonte.'
          ],
          de: [
            'Besichtigung der filigranen Nasridenpaläste in der Alhambra.',
            'Spaziergang über die Plaza de España in Sevilla.',
            'Authentische Flamenco-Aufführung in Sacromonte erleben.'
          ]
        },
        foodAndDrinks: {
          tr: ['Soğuk Endülüs Gazpacho çorbası', 'Granada’da içecek siparişinde ücretsiz gelen geleneksel tapaslar', 'Salmorejo kremamsı domates püresi', 'Soğuk Sangria & Manzanilla Şerisi'],
          en: ['Chilled Andalusian Gazpacho and Salmorejo soup', 'Free authentic tapas served with every drink in Granada', 'Fried eggplant with sugarcane honey (Berenjenas con Miel)', 'Fino Sherry and fruity Sangria'],
          de: ['Andalusische Gazpacho-Suppe', 'Kostenlose Tapas zu jedem Getränk in Granada', 'Salmorejo mit Ei und Schinken', 'Sherry & Sangria']
        },
        criticalTips: {
          tr: [
            '⚠️ KRİTİK UYARI: Elhamra Sarayı biletleri (özellikle Nasrid Sarayları giriş saati) 2-3 ay önceden tükenir. Bilet almadan Granada seyahati planlamayın!',
            'Öğle saatlerinde (14:00-17:00) siesta nedeniyle güneyde birçok yerel dükkan kapanır.'
          ],
          en: [
            '⚠️ CRITICAL: Alhambra tickets sell out 2-3 months in advance; book your timed entry immediately.',
            'Respect the afternoon siesta (2:00-5:00 PM) when local shops close.'
          ],
          de: [
            '⚠️ WICHTIG: Alhambra-Tickets sind Monate im Voraus ausgebucht; frühzeitig reservieren.',
            'Nachmittags-Siesta beachten: Viele Geschäfte schließen zwischen 14 und 17 Uhr.'
          ]
        },
        mapsQuery: 'Alhambra, Granada, Spain'
      },
      {
        name: {
          tr: '3. Durak: Barselona (Gaudí Mimarisi, Gotik Mahalle & Akdeniz)',
          en: 'Stop 3: Barcelona (Gaudí Architecture, Gothic Quarter & Coast)',
          de: 'Stopp 3: Barcelona (Gaudí, Gotisches Viertel & Strand)'
        },
        recommendedDuration: {
          tr: '3-4 Gün (Gaudí eserleri ve sahil için yeterli)',
          en: '3-4 Days (Sufficient for Gaudí masterpieces and seaside)',
          de: '3-4 Tage (Ideal für Gaudí & Mittelmeer)'
        },
        durationBadge: { tr: '3-4 Gün', en: '3-4 Days', de: '3-4 Tage' },
        highlights: {
          tr: ['Sagrada Família Bazilikası (Gaudí’nin Başyapıtı)', 'Park Güell Mozaikli Bahçeleri & Casa Batlló', 'Gotik Mahalle (Barri Gòtic) Dar Sokakları', 'Barceloneta Plajı & La Boqueria Pazarı'],
          en: ['Sagrada Família Basilica (Gaudí’s Masterpiece)', 'Park Güell Mosaics & Casa Batlló', 'Gothic Quarter (Barri Gòtic) Labyrinth', 'Barceloneta Beach & La Boqueria Market'],
          de: ['Sagrada Família Basilika', 'Park Güell & Casa Batlló', 'Gotisches Viertel (Barri Gòtic)', 'Strand Barceloneta & Boqueria-Markt']
        },
        activities: {
          tr: [
            'Sagrada Família’nın renkli vitraylarından süzülen büyüleyici ışık hüzmelerini izleyin.',
            'Park Güell terasındaki kıvrımlı mozaik banklarda oturup şehri seyredin.',
            'La Boqueria pazarında taze meyve suları ve deniz mahsulleri tadın.',
            'Barceloneta sahilinde Akdeniz melteminde yürüyün.'
          ],
          en: [
            'Stand in awe under the forest canopy stone columns of Sagrada Família.',
            'Sit on the serpentine mosaic bench overlooking Barcelona at Park Güell.',
            'Sip fresh tropical fruit juices inside bustling Mercado de La Boqueria.',
            'Enjoy seaside promenades and beachfront seafood in Barceloneta.'
          ],
          de: [
            'Staunen über die Lichtsäulen in der Sagrada Família.',
            'Ausblick von der geschwungenen Mosaikbank im Park Güell.',
            'Frische Säfte auf dem Markt La Boqueria genießen.',
            'Spaziergang an der Strandpromenade von Barceloneta.'
          ]
        },
        foodAndDrinks: {
          tr: ['Geleneksel Deniz Mahsullü Paella', 'Patatas Bravas (acılı domates soslu patates)', 'Pan con Tomate (sarımsaklı domatesli çıtır ekmek)', 'Katalan kreması (Crema Catalana) & Cava köpüklü şarabı'],
          en: ['Authentic Seafood Paella cooked in wide pans', 'Crispy Patatas Bravas with spicy aioli', 'Pan con Tomate (crushed tomato on toast)', 'Crema Catalana dessert & chilled Cava sparkling wine'],
          de: ['Original Paella mit Meeresfrüchten', 'Patatas Bravas mit pikanter Soße', 'Pan con Tomate', 'Crema Catalana & Cava']
        },
        criticalTips: {
          tr: [
            'La Rambla ve metro hatlarında yankesicilik çok yaygındır; telefonunuzu arka cebe koymayın, çantanızı önünüzde tutun.',
            'Sagrada Família ve Park Güell için biletleri haftalar öncesinden resmi web sitelerinden ayırtın.'
          ],
          en: [
            'Beware of active pickpockets on La Rambla and Metro Line L3; never put phones in back pockets.',
            'Pre-book timed tickets for Sagrada Família and Park Güell weeks ahead.'
          ],
          de: [
            'Achtung vor Taschendieben auf den Ramblas und in der Metro.',
            'Tickets für Sagrada Família und Park Güell online vorab buchen.'
          ]
        },
        mapsQuery: 'Sagrada Familia, Barcelona, Spain'
      }
    ],
    signatureGastronomy: {
      dishes: {
        tr: ['Valensiya & Deniz Mahsullü Paella', 'Jamón Ibérico Jambonu', 'Patatas Bravas & Tapas', 'Gazpacho'],
        en: ['Authentic Paella', 'Jamón Ibérico', 'Patatas Bravas', 'Cold Gazpacho Soup'],
        de: ['Spanische Paella', 'Jamón Ibérico', 'Tapas & Patatas Bravas', 'Gazpacho']
      },
      drinks: {
        tr: ['Sangria', 'Tinto de Verano', 'Katalan Köpüklü Şarabı (Cava)', 'Rioja Kırmızı Şarabı'],
        en: ['Fruity Sangria', 'Tinto de Verano', 'Catalan Cava', 'Rioja Red Wine'],
        de: ['Sangria', 'Tinto de Verano', 'Cava-Sekt', 'Rioja-Rotwein']
      },
      streetFoods: {
        tr: ['Sıcak Çikolatalı Churros', 'Bocadillo de Calamares', 'Empanadas', 'Turrón Helvası'],
        en: ['Churros con Chocolate', 'Calamari Baguette', 'Empanadas', 'Turrón Nougat'],
        de: ['Churros con Chocolate', 'Kalamari-Sandwich', 'Empanadas', 'Turrón']
      },
      diningAdvice: {
        tr: 'İspanya’da bahşiş zorunlu değildir. İyi bir restoranda memnun kaldıysanız %5-10 arası bozuk para bırakmak makbuldür. Tapas barlarında peçetelerin yere atılması geleneksel mekanlarda doğallık göstergesidir.',
        en: 'Tipping is optional; 5-10% in coins is appreciated in sit-down dining.',
        de: 'Trinkgeld ist freiwillig; 5-10 % bei gutem Service im Restaurant sind üblich.'
      }
    },
    packingAndPrecautions: {
      essentials: {
        tr: ['Güneş gözlüğü ve şapka', 'Rahat yürüyüş ayakkabıları', 'Boyundan askılı gizli cüzdan', 'C tipi Euro priz uyumu'],
        en: ['High-factor sunscreen & sunglasses', 'Comfortable flat walking shoes', 'Crossbody anti-theft bag', 'Euro plug type C'],
        de: ['Sonnenschutz & Sonnenbrille', 'Bequeme Schuhe', 'Sichere Umhängetasche', 'Euro-Stecker']
      },
      safetyAndEtiquette: {
        tr: [
          'Barselona ve Madrid’de sokaklarda "üç kağıt" (shell game) oynayanlara veya sahte karanfil uzatanlara asla yaklaşmayın.',
          'Geç akşam yemeği kültürüne uyum sağlayın; akşam 20:30’dan önce restoranlar çoğunlukla boştur.'
        ],
        en: [
          'Ignore street shell games and strangers offering sprigs of rosemary.',
          'Embrace the late dining rhythm; locals rarely dine before 9:00 PM.'
        ],
        de: [
          'Meiden Sie Hütchenspieler und angebliche Nelkenverkäufer auf der Straße.',
          'Späte Abendessen sind normal; vor 20:30 Uhr sind Restaurants meist leer.'
        ]
      }
    }
  },

  // İRAN (IR)
  IR: {
    routeName: {
      tr: 'İran Masalsı Pers Mirası Rotası: Tahran, İsfahan, Yezd & Şiraz (Persepolis)',
      en: 'Persian Heritage Grand Tour: Tehran, Isfahan, Yazd & Shiraz (Persepolis)',
      de: 'Persisches Kulturerbe: Teheran, Isfahan, Jasd & Schiras (Persepolis)'
    },
    routeSummary: {
      tr: 'Tahran’ın saraylarından başlayarak Şah Abbas’ın "Dünyanın Yarısı" İsfahan’ına, çölün kerpiç başkenti Yezd’den 2.500 yıllık Persepolis ve şairler kenti Şiraz’a uzanan 9 günlük büyüleyici Pers kültür yolculuğu.',
      en: 'A legendary 9-day cultural journey through Iran: from royal Qajar palaces in Tehran to the turquoise domes of Isfahan, mudbrick desert alleys in Yazd, and 2,500-year-old Persepolis ruins in Shiraz.',
      de: 'Eine 9-tägige Kulturreise durch den Iran: von Palästen in Teheran über die türkisfarbenen Kuppeln von Isfahan und die Wüstenstadt Jasd bis zum antiken Persepolis und Schiras.'
    },
    totalDays: 9,
    idealDurationText: {
      tr: '9 Günlük Pers Kültür Rotası',
      en: '9-Day Persian Heritage Route',
      de: '9-Tage Kulturrundreise'
    },
    bestSeason: {
      tr: 'Mart - Mayıs (Bahar çiçekleri & ılıman iklim) veya Eylül - Kasım (Altın sonbahar)',
      en: 'March - May (Spring blossoms & mild weather) or September - November (Autumn)',
      de: 'März - Mai (Frühling) oder September - November (Herbst)'
    },
    transportMode: {
      tr: 'VIP Klimalı Yataklı Şehirlerarası Otobüsler / Tren + Tahran ve İsfahan içinde Snapp! Araç Çağırma',
      en: 'VIP intercity sleeper coaches/trains + Snapp! ride-hailing in cities',
      de: 'VIP-Fernreisebusse / Züge + Snapp! Fahrtenvermittlung in Großstädten'
    },
    paceLevel: {
      tr: 'Dengeli & Derin Kültürel',
      en: 'Balanced & Cultural',
      de: 'Ausgewogen & Kulturell'
    },
    stops: [
      {
        name: {
          tr: '1. Durak: Tahran (Kaçar Sarayları & Canlı Başkent)',
          en: 'Stop 1: Tehran (Qajar Palaces & Vibrant Capital)',
          de: 'Stopp 1: Teheran (Golestan-Palast & Metropole)'
        },
        recommendedDuration: {
          tr: '2 Gün (Saraylar, müzeler ve Kapalıçarşı)',
          en: '2 Days (Museums, palaces & Grand Bazaar)',
          de: '2 Tage (Paläste & Basar)'
        },
        durationBadge: { tr: '2 Gün', en: '2 Days', de: '2 Tage' },
        highlights: {
          tr: ['Gülistan Sarayı (UNESCO - Kaçar Hanedanı Şaheseri)', 'Tahran Kapalıçarşısı (Bozorg Bazaar baharat ve halı koridorları)', 'Tabiat Köprüsü & Su-Ateş Parkı', 'Ulusal Mücevher Müzesi (Tavuskuşu Tahtı & Derya-yı Nur Elması)'],
          en: ['Golestan Palace (UNESCO Royal Qajar complex)', 'Tehran Grand Bazaar historic alleys', 'Tabiat Multi-tier Pedestrian Bridge', 'National Jewels Treasury (Daria-i-Noor Diamond)'],
          de: ['Golestan-Palast (UNESCO)', 'Großer Basar von Teheran', 'Tabiat-Fußgängerbrücke', 'Nationales Juwelenmuseum']
        },
        activities: {
          tr: [
            'Gülistan Sarayı’nın rengarenk ayna işlemeli taht odalarında ve çinili bahçesinde yürüyün.',
            'Tahran Kapalıçarşısı’nda taze safran, kuru meyveler ve el dokuma antika halıları inceleyin.',
            'Akşam modern Tahran mimarisinin simgesi iki katlı Tabiat Köprüsü’nde çay içip manzarayı izleyin.'
          ],
          en: [
            'Explore the ornate mirrored throne rooms and tiled courtyard of Golestan Palace.',
            'Bargain for premium saffron, dried fruits, and Persian kilims in the Grand Bazaar.',
            'Stroll across the striking Tabiat Bridge at sunset and take in Mount Damavand views.'
          ],
          de: [
            'Die spiegelverzierten Prunksäle des Golestan-Palastes besichtigen.',
            'Safran und handgeknüpfte Teppiche im Großen Basar entdecken.',
            'Abendspaziergang auf der modernen Tabiat-Brücke mit Blick auf die Stadt.'
          ]
        },
        foodAndDrinks: {
          tr: ['Çelo Kebap Kubideh (Safranlı pirinç ve tereyağı)', 'Taze Demleme Bergamotlu Fars Çayı ve Nebat Şekeri', 'Bastani Sonnati (Safranlı kaymaklı dondurma)'],
          en: ['Chelo Kabab Koobideh with saffron basmati rice', 'Persian black tea with saffron rock sugar', 'Bastani Sonnati traditional ice cream'],
          de: ['Chelo Kabab mit Safranreis', 'Persischer Schwarztee mit Kandiszucker', 'Safran-Pistazien-Eis Bastani']
        },
        criticalTips: {
          tr: [
            'DİKKAT: Uluslararası Visa/Mastercard çalışmaz. İmam Humeyni (IKA) Havalimanı’nda dövizinizi resmi Sarrafi bürolarında bozdurun.',
            'Şehir içi ulaşımda sokaktan taksi çevirmek yerine yerel Snapp! uygulamasını kullanın.'
          ],
          en: [
            'CRITICAL: Foreign cards do not work. Exchange cash USD/EUR at official airport bureaus upon arrival.',
            'Download and use Snapp! for hassle-free transport across Tehran.'
          ],
          de: [
            'WICHTIG: Ausländische Kreditkarten funktionieren nicht. Bargeld in offiziellen Wechselstuben tauschen.',
            'Nutzen Sie die App Snapp! für Fahrten in der Stadt.'
          ]
        },
        mapsQuery: 'Golestan Palace, Tehran, Iran'
      },
      {
        name: {
          tr: '2. Durak: İsfahan ("Dünyanın Yarısı" & Turkuaz Kubbeler)',
          en: 'Stop 2: Isfahan ("Half of the World" & Turquoise Domes)',
          de: 'Stopp 2: Isfahan ("Die Hälfte der Welt" & Türkisene Kuppeln)'
        },
        recommendedDuration: {
          tr: '3 Gün (UNESCO Meydanı, köprüler ve saraylar)',
          en: '3 Days (UNESCO Square, bridges & palaces)',
          de: '3 Tage (Königsplatz, Brücken & Paläste)'
        },
        durationBadge: { tr: '3 Gün', en: '3 Days', de: '3 Tage' },
        highlights: {
          tr: ['Nakş-ı Cihan Meydanı (Dünyanın en görkemli tarihi meydanlarından)', 'Şeyh Lütfullah Camii & İmam Camii (Turkuaz çini sanatı)', 'Ali Kapu Sarayı & Müzik Odası', 'Si-o-se-pol & Hacı Köprüleri (Gece ışıklandırması)', 'Yeni Culfa Ermeni Mahallesi & Vank Katedrali'],
          en: ['Naqsh-e Jahan Square (One of the largest public squares on Earth)', 'Sheikh Lotfollah Mosque & Imam Mosque', 'Ali Qapu Palace & Acoustic Music Room', 'Si-o-se-pol & Khaju Illuminated Bridges', 'Vank Cathedral in the New Julfa Armenian Quarter'],
          de: ['Naqsh-e-Dschahan-Platz (Königsplatz)', 'Scheich-Lotfollah-Moschee & Königsmoschee', 'Ali-Qapu-Palast mit Musiksaal', 'Si-o-se-pol und Khaju-Brücken', 'Vank-Kathedrale im armenischen Viertel']
        },
        activities: {
          tr: [
            'Nakş-ı Cihan Meydanı’nı fayton turuyla gezin ve Şeyh Lütfullah’ın kubbesindeki tavus kuşu ışık oyununu izleyin.',
            'Akşam Zayendeh Nehri üzerindeki tarihi taş köprülerin kemerleri altında yerel halkın gazel ve türkü söyleyişini dinleyin.',
            'Ermeni Mahallesi Yeni Culfa’daki nostaljik kafelerde dinlenip fresklerle bezeli Vank Katedrali’ni görün.'
          ],
          en: [
            'Marvel at the light filtering through the dome of Sheikh Lotfollah Mosque.',
            'Listen to traditional vocal melodies sung by locals beneath the arches of Khaju Bridge at dusk.',
            'Visit the New Julfa quarter and admire the detailed biblical frescoes of Vank Cathedral.'
          ],
          de: [
            'Den Naqsh-e-Dschahan-Platz und die Lichtspiele in den Kuppeln bewundern.',
            'Abends den Gesängen der Einheimischen unter den Bögen der Khaju-Brücke lauschen.',
            'Das armenische Viertel Neu-Dschulfa und die Vank-Kathedrale erkunden.'
          ]
        },
        foodAndDrinks: {
          tr: ['Beryani İsfahan (Kıymalı ve naneli geleneksel fırın kuzu yemeği)', 'Gaz İsfahan (Antep fıstıklı meşhur beyaz nuga tatlısı)', 'Nanehli Doogh ve Gül Şerbeti'],
          en: ['Beryani Isfahan (Rich minced lamb served on flatbread)', 'Gaz (Traditional Isfahan pistachio nougat)', 'Doogh with dried rose petals'],
          de: ['Beryani aus Isfahan (Würzfleisch auf Fladenbrot)', 'Gaz (Pistazien-Nougat aus Isfahan)', 'Minz-Doogh & Rosenwasser-Sharbat']
        },
        criticalTips: {
          tr: [
            'Meydandaki antika ve minyatür ustalarından hatıra alırken taarof nezaketine dikkat edin ve fiyatı teyit edin.',
            'Tarihi köprüleri akşam saat 20:00 - 22:00 arasında aydınlatılmış halleriyle ziyaret edin.'
          ],
          en: [
            'When purchasing hand-painted Persian miniatures, be mindful of the Taarof etiquette.',
            'Visit the historical bridges after sunset when the arches are poetically illuminated.'
          ],
          de: [
            'Kaufen Sie persische Miniaturen und beachten Sie dabei das Taarof-Ritual.',
            'Besuchen Sie die beleuchteten Bogenbrücken am Abend.'
          ]
        },
        mapsQuery: 'Naqsh-e Jahan Square, Isfahan, Iran'
      },
      {
        name: {
          tr: '3. Durak: Yezd (Kerpiç Çöl Şehri & Zerdüşt Ateşgahı)',
          en: 'Stop 3: Yazd (Mud-brick Desert Oasis & Zoroastrian Fire)',
          de: 'Stopp 3: Jasd (Lehmziegelstadt & Zoroastrischer Feuertempel)'
        },
        recommendedDuration: {
          tr: '2 Gün (UNESCO Kerpiç Eski Şehir ve Sessizlik Kuleleri)',
          en: '2 Days (Historic mudbrick labyrinth & desert architecture)',
          de: '2 Tage (Altstadt & Schweigetürme)'
        },
        durationBadge: { tr: '2 Gün', en: '2 Days', de: '2 Tage' },
        highlights: {
          tr: ['Yezd Tarihi Kerpiç Eski Kenti & Badgir (Rüzgar Yakalayıcı Kuleler)', 'Zerdüşt Ateşgahı (Ateşkede - 1.500 yıldır yanan kutsal ateş)', 'Sessizlik Kuleleri (Dakhma - Çöl tepesindeki kadim gömü alanları)', 'Emir Çakmak Kompleksi & Tatlıcılar Çarşısı'],
          en: ['Historic City of Yazd (UNESCO mudbrick alleys & windcatchers)', 'Zoroastrian Atash Behram (Sacred fire burning since 470 AD)', 'Towers of Silence (Ancient Zoroastrian sky burial structures)', 'Amir Chakhmaq Complex'],
          de: ['Altstadt von Yazd mit Windtürmen (Badgir)', 'Zoroastrischer Feuertempel (brennt seit 470 n. Chr.)', 'Türme des Schweigens in der Wüste', 'Amir-Tschachmaq-Komplex']
        },
        activities: {
          tr: [
            'UNESCO korumasındaki kerpiç labirent sokaklarda kaybolup çatı kafelerinden rüzgar kuleleri silüetini izleyin.',
            '1.500 yıldır aralıksız yanan Zerdüşt kutsal ateşini ziyaret edip kadim inancın felsefesini öğrenin.',
            'Çölün ortasında Sessizlik Kuleleri’nin tepesine tırmanarak gün batımında sonsuz ufku seyredin.'
          ],
          en: [
            'Wander through the cool subterranean mud-brick alleys and relax at rooftop cafes overlooking the wind towers.',
            'Visit the Zoroastrian Fire Temple and view the flame that has been tended continuously since the 5th century.',
            'Climb the Towers of Silence for a panoramic desert sunset.'
          ],
          de: [
            'Durch die kühlen Lehmgassen spazieren und den Blick von Dachterrassen genießen.',
            'Das ewige Feuer im zoroastrischen Feuertempel sehen.',
            'Zu den Schweigetürmen aufsteigen und den Sonnenuntergang erleben.'
          ]
        },
        foodAndDrinks: {
          tr: ['Fesenjan (Nar ekşili ve cevizli enfes güveç)', 'Baklava Yezd & Paşmak (Fars pamuk helvası)', 'Tohum-u Şerbeti'],
          en: ['Fesenjan (Chicken in pomegranate molasses and walnut stew)', 'Yazdi traditional baklava & Pashmak cotton candy', 'Tokhm-e Sharbati cooler'],
          de: ['Fesenjan (Granatapfel-Walnuss-Eintopf)', 'Traditionelles Baklava aus Jasd & Pashmak', 'Basilikumsamen-Sharbat']
        },
        criticalTips: {
          tr: [
            'Çöl ikliminde gündüz ve gece sıcaklık farkı yüksektir; yanınızda ince bir rüzgarlık bulundurun.',
            'Yezd’in geleneksel tatlıcılarından hediyelik safranlı şekerleme ve badem kurabiyesi alın.'
          ],
          en: [
            'Desert nights cool down rapidly; carry a light jacket even in warmer months.',
            'Purchase authentic almond cakes and saffron sweets directly from local sweet shops.'
          ],
          de: [
            'Große Temperaturunterschiede zwischen Tag und Nacht; leichte Jacke mitnehmen.',
            'Probieren Sie das traditionelle Mandelgebäck der Stadt.'
          ]
        },
        mapsQuery: 'Historic City of Yazd, Iran'
      },
      {
        name: {
          tr: '4. Durak: Şiraz & Persepolis (Şiir, Güller & 2.500 Yıllık İmparatorluk)',
          en: 'Stop 4: Shiraz & Persepolis (Poetry, Gardens & 2,500-Year Empire)',
          de: 'Stopp 4: Schiras & Persepolis (Dichtung, Gärten & Weltwunder)'
        },
        recommendedDuration: {
          tr: '2 Gün (Persepolis Antik Kenti ve Şiraz bahçeleri)',
          en: '2 Days (Ancient Persepolis & poetic gardens of Shiraz)',
          de: '2 Tage (Persepolis & Dichtergärten)'
        },
        durationBadge: { tr: '2 Gün', en: '2 Days', de: '2 Tage' },
        highlights: {
          tr: ['Persepolis Antik Kenti (UNESCO - Dünyanın en ihtişamlı imparatorluk kalıntısı)', 'Nakş-ı Rüstem (Büyük Darius ve Kserkses’in dev kaya mezarları)', 'Nasır el-Mülk Pembe Camii (Sabah güneşiyle renk cümbüşü)', 'Hafız & Sadi Türbeleri (Şiir bahçeleri)', 'Eram Bahçesi (UNESCO Pers Bahçesi)'],
          en: ['Persepolis Ancient Ruins (UNESCO monumental ceremonial capital)', 'Naqsh-e Rustam (Rock-cut tombs of Darius the Great and Xerxes)', 'Nasir al-Mulk Pink Mosque (Morning stained glass kaleidoscope)', 'Tomb of Hafez & Saadi Gardens', 'Eram Persian Garden (UNESCO)'],
          de: ['Persepolis (UNESCO-Weltwunder des Achämenidenreichs)', 'Felsengräber von Naqsh-e Rostam (Darius I. & Xerxes)', 'Rosa Moschee (Nasir al-Mulk am Morgen)', 'Mausoleum von Hafis & Saadi', 'Eram-Garten (UNESCO-Persergarten)']
        },
        activities: {
          tr: [
            'Sabah saat 08:00 - 09:30 arasında Pembe Cami’ye gidip rengarenk vitray pencerelerden halılara vuran ışık huzmelerini fotoğraflayın.',
            'Şiraz’dan arabayla 50 km mesafedeki görkemli Persepolis sütunları ve Milletler Kapısı arasında antik tarihi soluyun.',
            'Akşam Hafız Türbesi’nde yerel halkın Hafız Divanı açıp fal bakışına ve şiir okuyuşuna ortak olun.'
          ],
          en: [
            'Arrive at the Pink Mosque early in the morning to witness colorful light streaming through the stained glass.',
            'Walk among the colossal limestone columns and carved reliefs of Persepolis and the Gate of All Nations.',
            'Join locals at the illuminated Tomb of Hafez as they recite verses under fragrant cypress trees.'
          ],
          de: [
            'Früh morgens das faszinierende Farbenspiel in der Rosa Moschee erleben.',
            'Die monumentalen Säulen und Reliefs der Kaiserstadt Persepolis besichtigen.',
            'Am beleuchteten Grab von Hafis die persische Dichtkunst spüren.'
          ]
        },
        foodAndDrinks: {
          tr: ['Zereşk Polo ba Morgh (Safranlı berberisli tavuklu pilav)', 'Faloodeh Şirazi (Limon ve gül suyu şerbetinde buzlu pirinç nişastası tatlısı)', 'Şiraz Çayı & Taze Fıstık'],
          en: ['Zereshk Polo ba Morgh (Barberry & saffron chicken pilaf)', 'Faloodeh Shirazi (Refreshing frozen lime & rosewater noodle dessert)', 'Shirazi tea & fresh pistachios'],
          de: ['Zereshk Polo (Berberitzen-Hühnchen)', 'Faloodeh Schirasi (Kühles persisches Glasnudel-Dessert mit Limette)', 'Tee & frische Pistazien']
        },
        criticalTips: {
          tr: [
            'Persepolis ziyareti için güneş şapkası, bol su ve rahat yürüyüş ayakkabısı getirin; gölge alanlar sınırlıdır.',
            'Şiraz Şehit Destgeyb Havalimanı’ndan (SYZ) İstanbul’a direkt dönüş uçuşu imkanını kullanarak zamandan kazanın.'
          ],
          en: [
            'Wear a sun hat and sunscreen at Persepolis; there is very little shade across the ancient ruins.',
            'Fly directly back from Shiraz International Airport (SYZ) to avoid backtracking to Tehran.'
          ],
          de: [
            'Sonnenschutz und Kopfbedeckung für Persepolis einpacken.',
            'Direktflug ab dem Flughafen Schiras (SYZ) für die Heimreise nutzen.'
          ]
        },
        mapsQuery: 'Persepolis, Shiraz, Iran'
      }
    ],
    signatureGastronomy: {
      dishes: {
        tr: ['Çelo Kebap Kubideh', 'Ghormeh Sabzi (Milli otlu kuzu güveci)', 'Fesenjan (Nar ekşili cevizli tavuk)', 'Zereşk Polo ba Morgh', 'Beryani İsfahan'],
        en: ['Chelo Kabab Koobideh', 'Ghormeh Sabzi (Herb & dried lime stew)', 'Fesenjan (Pomegranate walnut chicken)', 'Zereshk Polo ba Morgh', 'Beryani Isfahan'],
        de: ['Chelo Kabab Koobideh', 'Ghormeh Sabzi', 'Fesenjan', 'Zereshk Polo', 'Beryani']
      },
      drinks: {
        tr: ['Safranlı ve Nebat Şekerli İran Çayı', 'Nanehli Doogh (Köpüklü ayran)', 'Sekanjabin (Nane ve bal şerbeti)', 'Tokhm-e Sharbati (Gül sulu fesleğen tohumu)'],
        en: ['Persian Saffron Tea with Nabat', 'Mint Doogh yogurt drink', 'Sekanjabin honey mint cordial', 'Tokhm-e Sharbati rosewater cooler'],
        de: ['Persischer Safran-Tee mit Kandis', 'Minz-Doogh', 'Sekandjabin', 'Rosenwasser-Sharbat']
      },
      streetFoods: {
        tr: ['Bastani Sonnati (Gül suyu, safran ve donmuş kaymaklı dondurma)', 'Faloodeh Şirazi', 'Gaz İsfahan (Pistachio nougat)', 'Sohan Kum (Karamelli safran helvası)'],
        en: ['Bastani Sonnati traditional ice cream', 'Faloodeh Shirazi', 'Gaz Isfahan pistachio nougat', 'Sohan saffron brittle'],
        de: ['Bastani Sonnati Eis', 'Faloodeh Schirasi', 'Gaz aus Isfahan', 'Sohan']
      },
      diningAdvice: {
        tr: 'İran’da yemekler son derece doyurucu ve aromatiktir. Restoranlarda servis personeline %10 civarında nakit bahşiş bırakmak büyük nezaket sayılır. Alışverişlerde esnafın ilk teklifte ücreti reddettiği "Taarof" jestiyle karşılaşıldığında her zaman ısrarla ödeme yapılmalıdır.',
        en: 'Persian cuisine is rich, aromatic, and comforting. Leave around 10% cash gratuity for good service. If merchants engage in the "Taarof" ritual (politely declining payment at first), always insist politely on paying.',
        de: 'Die persische Küche ist aromatisch und reichhaltig. Ca. 10 % Bargeld-Trinkgeld wird geschätzt. Bestehen Sie beim Höflichkeitsritual "Taarof" stets darauf, die Rechnung zu begleichen.'
      }
    },
    packingAndPrecautions: {
      essentials: {
        tr: [
          'DİKKAT: Yeterli miktarda nakit USD veya EUR (Uluslararası banka kartları yaptırımlar sebebiyle çalışmaz)',
          'Kamuya açık alanlar için kıyafet kuralına uygun giysiler (kadınlar için başörtüsü/şal ve dökümlü kıyafet, erkekler için pantolon)',
          'Güneş gözlüğü, güneş kremi ve şapka (Yezd ve Şiraz çöl güneşi için)',
          'C ve F tipi priz (Türkiye prizleriyle birebir uyumlu - adaptör gerekmez)',
          'Seyahat öncesi akıllı telefona indirilmiş bağımsız VPN uygulamaları'
        ],
        en: [
          'CRITICAL: Sufficient cash in USD or EUR (International bank cards do not work due to sanctions)',
          'Modest clothing complying with local dress codes (Headscarf & loose tunic for women, trousers for men)',
          'Sunglasses and sunscreen for desert sites in Yazd and Persepolis',
          'Standard European plug types C and F (230V)',
          'Reliable VPN apps installed prior to entering the country'
        ],
        de: [
          'WICHTIG: Ausreichend Bargeld in USD oder EUR (Internationale Karten funktionieren nicht)',
          'Dezente Kleidung (Kopftuch/Tunika für Frauen, lange Hosen für Männer)',
          'Sonnenschutz für Wüstenregionen und Persepolis',
          'Standard-Eurostecker (Typ C/F)',
          'Zuverlässige VPN-Apps vor Reiseantritt installieren'
        ]
      },
      safetyAndEtiquette: {
        tr: [
          'Paranızı sokaktaki komisyonculardan değil, yalnızca cadde üzerindeki resmi "Sarrafi" döviz bürolarında bozdurun.',
          'Kamu binaları, askeri tesisler, elçilikler ve köprülerin fotoğrafını kesinlikle çekmeyin.',
          'Halk son derece misafirperverdir; ikramları ve sıcak sohbetleri güvenle kabul edebilirsiniz.'
        ],
        en: [
          'Only exchange money at licensed official Sarrafi exchange offices, never with street touts.',
          'Never photograph government buildings, military sites, checkpoints, or bridges.',
          'Locals are exceptionally warm and welcoming; engage politely in conversation and tea invitations.'
        ],
        de: [
          'Geld nur in lizenzierten Sarrafi-Wechselstuben tauschen, niemals auf der Straße.',
          'Regierungsgebäude und militärische Anlagen keinesfalls fotografieren.',
          'Die Menschen sind außerordentlich gastfreundlich; Einladungen zum Tee können sicher angenommen werden.'
        ]
      }
    }
  }
};
