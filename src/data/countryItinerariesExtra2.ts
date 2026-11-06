/**
 * Vizamigo - Ek Küratörlü Turistik Gezi Rotaları (2)
 * GE, EG, GR, BG, AE, BA, RS, MK, AL
 * Not: es/ru çevirileri i18n sözlüklerinden (İngilizce metin anahtarıyla) gelir.
 */

import type { CuratedItineraryDef } from './countryItineraries';

export const CURATED_ITINERARIES_EXTRA_2: Record<string, CuratedItineraryDef> = {
  GE: {
    routeName: {
      tr: "Kafkas Klasiği: Tiflis, Kazbegi Dağları, Kakheti Bağları & Batum",
      en: "Caucasus Classic: Tbilisi, Kazbegi Mountains, Kakheti Vineyards & Batumi",
      de: "Kaukasus-Klassiker: Tiflis, Kasbegi, Kachetien & Batumi"
    },
    routeSummary: {
      tr: "Kükürt hamamları ve balkonlu eski mahalleleriyle Tiflis’ten Gürcü Askeri Yolu üzerinden Kazbek Dağı’nın eteğindeki Gergeti Kilisesi’ne, oradan şarap ülkesi Kakheti’ye ve son olarak Karadeniz kıyısındaki Batum’a uzanan 9 günlük rota. Sarp sınır kapısından karayoluyla gelenler rotayı Batum’dan başlatıp tersine çevirebilir.",
      en: "A 9-day route from Tbilisi’s sulphur baths and balconied old town along the Georgian Military Road to Gergeti Trinity Church beneath Mount Kazbek, then to the wine country of Kakheti and finally to Batumi on the Black Sea. Travellers arriving overland via the Sarp border can start in Batumi and reverse the route.",
      de: "Eine 9-tägige Route von den Schwefelbädern in Tiflis über die Georgische Heerstraße zur Gergeti-Kirche am Kasbek, weiter ins Weinland Kachetien und schließlich nach Batumi am Schwarzen Meer. Wer über den Grenzübergang Sarp einreist, kann in Batumi beginnen."
    },
    totalDays: 9,
    idealDurationText: {
      tr: "9 Günlük Kafkas Rotası",
      en: "9-Day Caucasus Route",
      de: "9-Tage-Kaukasusroute"
    },
    bestSeason: {
      tr: "Mayıs - Haziran & Eylül - Ekim (Kazbegi yolu açık, bağ bozumu Eylül’de; Batum için Temmuz - Ağustos)",
      en: "May - June & September - October (mountain road open, grape harvest in September; July - August for Batumi beaches)",
      de: "Mai - Juni & September - Oktober (Weinlese im September; Juli - August für Batumi)"
    },
    transportMode: {
      tr: "Kazbegi ve Kakheti için marşrutka, özel şoförlü araç veya kiralık araç + Tiflis - Batum arası Stadler treni ya da iç hat uçuşu",
      en: "Marshrutka minibuses, private driver or rental car for Kazbegi and Kakheti + Stadler train or domestic flight between Tbilisi and Batumi",
      de: "Marschrutkas, Fahrer oder Mietwagen für Kasbegi und Kachetien + Stadler-Zug oder Inlandsflug Tiflis - Batumi"
    },
    paceLevel: {
      tr: "Dengeli & Doğa + Gastronomi",
      en: "Balanced & Nature + Gastronomy",
      de: "Ausgewogen & Natur + Genuss"
    },
    stops: [
      {
        name: {
          tr: "1. Durak: Tiflis (Eski Şehir, Kükürt Hamamları & Mtskheta)",
          en: "Stop 1: Tbilisi (Old Town, Sulphur Baths & Mtskheta)",
          de: "Stopp 1: Tiflis (Altstadt, Schwefelbäder & Mzcheta)"
        },
        recommendedDuration: {
          tr: "3 Gün (Şehir 2 gün + Mtskheta yarım gün)",
          en: "3 Days (City 2 days + half day in Mtskheta)",
          de: "3 Tage (Stadt 2 Tage + halber Tag Mzcheta)"
        },
        durationBadge: {
          tr: "3 Gün",
          en: "3 Days",
          de: "3 Tage"
        },
        highlights: {
          tr: [
            "Narikala Kalesi & teleferik",
            "Abanotubani Kükürt Hamamları",
            "Barış Köprüsü & Rustaveli Caddesi",
            "Mtskheta: Jvari Manastırı & Svetitskhoveli Katedrali (UNESCO)"
          ],
          en: [
            "Narikala Fortress & cable car",
            "Abanotubani Sulphur Baths",
            "Bridge of Peace & Rustaveli Avenue",
            "Mtskheta: Jvari Monastery & Svetitskhoveli Cathedral (UNESCO)"
          ],
          de: [
            "Festung Narikala & Seilbahn",
            "Schwefelbäder Abanotubani",
            "Friedensbrücke & Rustaweli-Boulevard",
            "Mzcheta: Dschwari-Kloster & Swetizchoweli-Kathedrale (UNESCO)"
          ]
        },
        activities: {
          tr: [
            "Teleferikle Narikala Kalesi’ne çıkıp Kartlis Deda (Gürcistan Ana) heykelinin yanından şehri seyredin.",
            "Abanotubani’de özel kabinli bir kükürt hamamı kiralayıp ardından Leghvtakhevi şelalesine yürüyün.",
            "Yarım günlük gezide eski başkent Mtskheta’ya gidip Aragvi ve Kura nehirlerinin birleştiği noktayı Jvari Manastırı’ndan izleyin."
          ],
          en: [
            "Ride the cable car up to Narikala Fortress and look over the city from beside the Mother of Georgia statue.",
            "Book a private room at an Abanotubani sulphur bath, then walk up to the Leghvtakhevi waterfall.",
            "Take a half-day trip to the old capital Mtskheta and watch the confluence of the Aragvi and Kura rivers from Jvari Monastery."
          ],
          de: [
            "Mit der Seilbahn zur Festung Narikala und Blick über die Stadt an der Statue Mutter Georgiens.",
            "Ein privates Schwefelbad in Abanotubani buchen und danach zum Leghwtachewi-Wasserfall spazieren.",
            "Halbtagesausflug in die alte Hauptstadt Mzcheta mit Blick vom Dschwari-Kloster auf den Zusammenfluss von Aragwi und Kura."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Khachapuri (peynirli pide) & Badrijani (cevizli patlıcan rulosu)",
            "Mtsvadi (Gürcü usulü şiş et)",
            "Tarkhuna (tarhunlu limonata) & Borjomi maden suyu",
            "Sokak fırınlarından sıcak Shoti ekmeği"
          ],
          en: [
            "Khachapuri cheese bread & Badrijani (walnut-stuffed aubergine rolls)",
            "Mtsvadi (Georgian grilled skewers)",
            "Tarkhuna tarragon lemonade & Borjomi mineral water",
            "Hot Shoti bread from street bakeries"
          ],
          de: [
            "Chatschapuri & Badridschani (Auberginenröllchen mit Walnuss)",
            "Mzwadi (georgische Fleischspieße)",
            "Tarchuna-Limonade & Borjomi-Mineralwasser",
            "Frisches Schoti-Brot aus dem Steinofen"
          ]
        },
        criticalTips: {
          tr: [
            "Türk vatandaşları Gürcistan’a pasaport veya yeni çipli kimlik kartıyla vizesiz girip 365 güne kadar kalabilir; giriş öncesi güncel kuralları teyit edin.",
            "Şehir içinde taksi için Bolt veya Yandex Go uygulamasını kullanın; sokakta pazarlıklı taksilerde fiyatı binmeden netleştirin. Yerel para birimi Gürcü larisidir (GEL)."
          ],
          en: [
            "Turkish citizens can enter Georgia visa-free with a passport or the new chip ID card and stay up to 365 days; double-check current rules before you travel.",
            "Use the Bolt or Yandex Go app for taxis; with street taxis agree the fare before getting in. The local currency is the Georgian lari (GEL)."
          ],
          de: [
            "Türkische Staatsbürger reisen mit Pass oder neuem Chip-Personalausweis visumfrei bis zu 365 Tage ein; aktuelle Regeln vorab prüfen.",
            "Für Taxis Bolt oder Yandex Go nutzen; bei Straßentaxis den Preis vorher vereinbaren. Währung: Georgischer Lari (GEL)."
          ]
        },
        mapsQuery: "Narikala Fortress, Tbilisi, Georgia"
      },
      {
        name: {
          tr: "2. Durak: Kazbegi / Stepantsminda (Gergeti Kilisesi & Kazbek Dağı)",
          en: "Stop 2: Kazbegi / Stepantsminda (Gergeti Church & Mount Kazbek)",
          de: "Stopp 2: Kasbegi / Stepanzminda (Gergeti-Kirche & Kasbek)"
        },
        recommendedDuration: {
          tr: "1-2 Gün (Günübirlik mümkün, bir gece konaklama önerilir)",
          en: "1-2 Days (Doable as a day trip, one overnight recommended)",
          de: "1-2 Tage (Tagesausflug möglich, eine Übernachtung empfohlen)"
        },
        durationBadge: {
          tr: "1-2 Gün",
          en: "1-2 Days",
          de: "1-2 Tage"
        },
        highlights: {
          tr: [
            "Ananuri Kalesi & Zhinvali Barajı",
            "Gudauri Rus-Gürcü Dostluk Anıtı seyir terası",
            "Gergeti Teslis (Kutsal Üçlü) Kilisesi",
            "Truso Vadisi & Juta köyü yürüyüşleri"
          ],
          en: [
            "Ananuri Fortress & Zhinvali Reservoir",
            "Russia-Georgia Friendship Monument viewpoint at Gudauri",
            "Gergeti Trinity Church",
            "Truso Valley & Juta village hikes"
          ],
          de: [
            "Festung Ananuri & Schinwali-Stausee",
            "Aussichtspunkt Freundschaftsdenkmal bei Gudauri",
            "Gergeti-Dreifaltigkeitskirche",
            "Wanderungen im Truso-Tal & bei Dschuta"
          ]
        },
        activities: {
          tr: [
            "Gürcü Askeri Yolu’nda Ananuri Kalesi ve Gudauri seyir terasında mola vererek Kazbegi’ye çıkın.",
            "Stepantsminda’dan yürüyerek (yaklaşık 1,5 saat) veya 4x4 araçla 2.170 metredeki Gergeti Kilisesi’ne çıkın; arka planda Kazbek zirvesi görünür.",
            "Ertesi sabah Juta veya Truso vadisinde yarım günlük bir doğa yürüyüşü yapın."
          ],
          en: [
            "Drive up the Georgian Military Road to Kazbegi, stopping at Ananuri Fortress and the Gudauri viewpoint.",
            "Hike (about 1.5 hours) or take a 4x4 from Stepantsminda up to Gergeti Church at 2,170 m, with Mount Kazbek rising behind it.",
            "Next morning, do a half-day nature hike in the Juta or Truso valley."
          ],
          de: [
            "Über die Georgische Heerstraße nach Kasbegi mit Stopps in Ananuri und am Aussichtspunkt Gudauri.",
            "Zu Fuß (ca. 1,5 Std.) oder per Geländewagen zur Gergeti-Kirche auf 2.170 m mit dem Kasbek im Hintergrund.",
            "Am nächsten Morgen eine Halbtageswanderung im Dschuta- oder Truso-Tal."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Khinkali (Pasanauri usulü dağ mantısı)",
            "Kubdari (Svan usulü etli pide)",
            "Dağ kekiği çayı & yerel peynirler"
          ],
          en: [
            "Khinkali dumplings (mountain style, as in Pasanauri)",
            "Kubdari (Svan meat-filled bread)",
            "Mountain thyme tea & local cheeses"
          ],
          de: [
            "Chinkali-Teigtaschen (Bergart wie in Pasanauri)",
            "Kubdari (swanisches Fleischbrot)",
            "Bergthymiantee & lokaler Käse"
          ]
        },
        criticalTips: {
          tr: [
            "Kışın ve ilkbaharda Jvari Geçidi kar ve çığ nedeniyle kapanabilir; yola çıkmadan yol durumunu kontrol edin.",
            "Kilise içinde kadınlar için başörtüsü ve etek, erkekler için uzun pantolon beklenir; girişte örtü verilebilir."
          ],
          en: [
            "In winter and spring the Jvari Pass can close due to snow and avalanches; check road conditions before you set off.",
            "Inside the church women are expected to wear a headscarf and skirt, men long trousers; wraps are often provided at the entrance."
          ],
          de: [
            "Im Winter und Frühjahr kann der Kreuzpass wegen Schnee und Lawinen gesperrt sein; Straßenlage vorher prüfen.",
            "In der Kirche Kopftuch und Rock für Frauen, lange Hosen für Männer; Tücher gibt es oft am Eingang."
          ]
        },
        mapsQuery: "Gergeti Trinity Church, Stepantsminda, Georgia"
      },
      {
        name: {
          tr: "3. Durak: Kakheti & Signagi (Şarap Vadisi & Aşk Şehri)",
          en: "Stop 3: Kakheti & Signagi (Wine Valley & City of Love)",
          de: "Stopp 3: Kachetien & Signagi (Weintal & Stadt der Liebe)"
        },
        recommendedDuration: {
          tr: "1-2 Gün (Şaraphaneler ve Signagi surları)",
          en: "1-2 Days (Wineries and Signagi’s walls)",
          de: "1-2 Tage (Weingüter & Stadtmauer von Signagi)"
        },
        durationBadge: {
          tr: "1-2 Gün",
          en: "1-2 Days",
          de: "1-2 Tage"
        },
        highlights: {
          tr: [
            "Signagi sur duvarları & Alazani Vadisi manzarası",
            "Bodbe Manastırı (Aziz Nino’nun mezarı)",
            "Qvevri (küp) şarabı yapan aile şaraphaneleri",
            "Telavi & Alaverdi Katedrali"
          ],
          en: [
            "Signagi town walls & Alazani Valley views",
            "Bodbe Monastery (tomb of St. Nino)",
            "Family wineries making qvevri (clay-jar) wine",
            "Telavi & Alaverdi Cathedral"
          ],
          de: [
            "Stadtmauer von Signagi & Blick ins Alasani-Tal",
            "Kloster Bodbe (Grab der hl. Nino)",
            "Familienweingüter mit Qvevri-Wein (Tonamphoren)",
            "Telawi & Kathedrale Alawerdi"
          ]
        },
        activities: {
          tr: [
            "Signagi’nin restore edilmiş sur duvarlarında yürüyüp Kafkas Dağları’na bakan Alazani Vadisi’ni izleyin.",
            "UNESCO somut olmayan miras listesindeki qvevri yöntemini bir aile şaraphanesinde tadımla öğrenin (alkol almayanlar için üzüm suyu ve churchkhela atölyeleri de var).",
            "Bodbe Manastırı’nın bahçelerini gezip Gürcistan’a Hristiyanlığı getiren Aziz Nino’nun hikâyesini dinleyin."
          ],
          en: [
            "Walk Signagi’s restored defensive walls looking over the Alazani Valley towards the Caucasus range.",
            "Learn the UNESCO-listed qvevri method with a tasting at a family winery (non-drinkers can try grape juice and churchkhela workshops).",
            "Stroll the gardens of Bodbe Monastery and hear the story of St. Nino, who brought Christianity to Georgia."
          ],
          de: [
            "Spaziergang auf der restaurierten Stadtmauer von Signagi mit Blick über das Alasani-Tal zum Kaukasus.",
            "Die UNESCO-gelistete Qvevri-Methode bei einer Verkostung im Familienweingut kennenlernen (auch Traubensaft und Tschurtschchela-Workshops).",
            "Durch die Gärten des Klosters Bodbe und die Geschichte der hl. Nino kennenlernen."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Churchkhela (üzüm pekmezli cevizli sucuk)",
            "Saperavi kırmızı & Rkatsiteli amber şarabı",
            "Mtsvadi & tandırda pişmiş Shoti ekmeği",
            "Chacha (üzüm cibresinden damıtma içki)"
          ],
          en: [
            "Churchkhela (walnuts dipped in grape-must)",
            "Saperavi red & Rkatsiteli amber wine",
            "Mtsvadi & tone-oven Shoti bread",
            "Chacha (grape pomace brandy)"
          ],
          de: [
            "Tschurtschchela (Walnüsse in Traubensaft)",
            "Saperawi-Rotwein & Rkatsiteli-Amberwein",
            "Mzwadi & Schoti aus dem Tone-Ofen",
            "Tschatscha (Tresterbrand)"
          ]
        },
        criticalTips: {
          tr: [
            "Kakheti’yi verimli gezmek için Tiflis’ten özel şoförlü günlük tur veya kiralık araç en pratik yoldur; tadım yapacaksanız araç kullanmayın.",
            "Gürcü sofra geleneği supra’da tamada (kadeh kaldıran kişi) uzun konuşmalar yapar; içki ısrarına kibarca “hayır” demek ayıp sayılmaz."
          ],
          en: [
            "A private driver or rental car from Tbilisi is the most practical way to see Kakheti; don’t drive if you are tasting wine.",
            "At a traditional supra feast the tamada (toastmaster) gives long toasts; politely declining a drink is perfectly acceptable."
          ],
          de: [
            "Am praktischsten mit Fahrer oder Mietwagen ab Tiflis; nach Weinproben nicht selbst fahren.",
            "Beim Supra-Festmahl spricht der Tamada lange Trinksprüche; höfliches Ablehnen ist in Ordnung."
          ]
        },
        mapsQuery: "Sighnaghi, Kakheti, Georgia"
      },
      {
        name: {
          tr: "4. Durak: Batum (Karadeniz Sahili & Acara)",
          en: "Stop 4: Batumi (Black Sea Coast & Adjara)",
          de: "Stopp 4: Batumi (Schwarzmeerküste & Adscharien)"
        },
        recommendedDuration: {
          tr: "2 Gün (Sahil, botanik bahçesi ve Acara dağ köyleri)",
          en: "2 Days (Seafront, botanical garden and Adjara mountain villages)",
          de: "2 Tage (Strandpromenade, Botanischer Garten & Bergdörfer)"
        },
        durationBadge: {
          tr: "2 Gün",
          en: "2 Days",
          de: "2 Tage"
        },
        highlights: {
          tr: [
            "Batum Bulvarı & Ali ile Nino heykeli",
            "Alfabe Kulesi & Avrupa Meydanı",
            "Batum Botanik Bahçesi (Yeşil Burun)",
            "Gonio Kalesi & Makhuntseti Şelalesi"
          ],
          en: [
            "Batumi Boulevard & Ali and Nino statue",
            "Alphabetic Tower & Europe Square",
            "Batumi Botanical Garden (Green Cape)",
            "Gonio Fortress & Makhuntseti Waterfall"
          ],
          de: [
            "Boulevard von Batumi & Statue Ali und Nino",
            "Alphabet-Turm & Europaplatz",
            "Botanischer Garten Batumi (Grünes Kap)",
            "Festung Gonio & Machunzeti-Wasserfall"
          ]
        },
        activities: {
          tr: [
            "Gün batımında sahil bulvarında bisiklet sürün ve hareket eden Ali ile Nino heykelinin buluşmasını izleyin.",
            "Denize bakan teraslarıyla Batum Botanik Bahçesi’nde yarım gün geçirin.",
            "Roma döneminden kalma Gonio Kalesi’ni gezip Acara dağlarındaki Makhuntseti Şelalesi ve taş kemer köprüsüne gidin."
          ],
          en: [
            "Cycle the seafront boulevard at sunset and watch the moving Ali and Nino sculpture meet.",
            "Spend half a day in the Batumi Botanical Garden with its terraces above the sea.",
            "Visit Roman-era Gonio Fortress, then head into the Adjara hills to Makhuntseti Waterfall and its stone arch bridge."
          ],
          de: [
            "Bei Sonnenuntergang mit dem Rad über den Boulevard und die bewegliche Skulptur Ali und Nino beobachten.",
            "Einen halben Tag im Botanischen Garten mit Terrassen über dem Meer verbringen.",
            "Die römische Festung Gonio besuchen und danach zum Machunzeti-Wasserfall mit Steinbogenbrücke."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Adjaruli Khachapuri (yumurtalı tekne peynirli pide)",
            "Taze Karadeniz balığı (barbun, istavrit)",
            "Acara usulü Borano (eritilmiş tereyağlı peynir)"
          ],
          en: [
            "Adjaruli Khachapuri (boat-shaped cheese bread with egg)",
            "Fresh Black Sea fish (red mullet, horse mackerel)",
            "Adjarian Borano (cheese melted in butter)"
          ],
          de: [
            "Adscharuli Chatschapuri (Käsebrot-Schiffchen mit Ei)",
            "Frischer Schwarzmeerfisch",
            "Adscharisches Borano (Käse in Butter)"
          ]
        },
        criticalTips: {
          tr: [
            "Sarp sınır kapısı Batum’a yaklaşık 20 km mesafededir; Türkiye’den karayoluyla gelenler için rotanın en mantıklı başlangıç noktası Batum’dur.",
            "Batum’daki kumarhane ve gece kulüplerinde hesap ve ek ücretlere dikkat edin; Tiflis - Batum treni yazın çabuk dolduğu için biletleri önceden alın."
          ],
          en: [
            "The Sarp border crossing is about 20 km from Batumi, so for overland travellers from Turkey Batumi is the logical starting point.",
            "Watch bills and extra charges at Batumi casinos and night clubs; buy Tbilisi - Batumi train tickets early as they sell out in summer."
          ],
          de: [
            "Der Grenzübergang Sarp liegt ca. 20 km von Batumi; für Anreisende aus der Türkei ist Batumi der logische Startpunkt.",
            "Vorsicht bei Rechnungen in Casinos und Clubs; Zugtickets Tiflis - Batumi im Sommer früh kaufen."
          ]
        },
        mapsQuery: "Batumi Boulevard, Batumi, Georgia"
      }
    ],
    signatureGastronomy: {
      dishes: {
        tr: [
          "Khinkali (Gürcü mantısı)",
          "Khachapuri (Imeruli & Adjaruli)",
          "Pkhali (cevizli sebze ezmeleri)",
          "Lobio (güveçte kırmızı fasulye)"
        ],
        en: [
          "Khinkali dumplings",
          "Khachapuri (Imeruli & Adjaruli)",
          "Pkhali (walnut and vegetable pâtés)",
          "Lobio (clay-pot bean stew)"
        ],
        de: [
          "Chinkali",
          "Chatschapuri (Imeruli & Adscharuli)",
          "Pchali (Gemüse-Walnuss-Pasten)",
          "Lobio (Bohneneintopf)"
        ]
      },
      drinks: {
        tr: [
          "Saperavi & Rkatsiteli şarapları",
          "Chacha",
          "Borjomi maden suyu",
          "Lagidze limonataları (Tarkhuna)"
        ],
        en: [
          "Saperavi & Rkatsiteli wines",
          "Chacha",
          "Borjomi mineral water",
          "Lagidze lemonades (Tarkhuna)"
        ],
        de: [
          "Saperawi & Rkatsiteli",
          "Tschatscha",
          "Borjomi-Mineralwasser",
          "Lagidse-Limonaden (Tarchuna)"
        ]
      },
      streetFoods: {
        tr: [
          "Churchkhela",
          "Lobiani (fasulyeli pide)",
          "Shoti ekmeği",
          "Shawarma (Tiflis’in gece atıştırmalığı)"
        ],
        en: [
          "Churchkhela",
          "Lobiani (bean-filled bread)",
          "Shoti bread",
          "Shawarma (Tbilisi’s late-night snack)"
        ],
        de: [
          "Tschurtschchela",
          "Lobiani (Bohnenbrot)",
          "Schoti-Brot",
          "Schawarma (Tiflis’ Mitternachtssnack)"
        ]
      },
      diningAdvice: {
        tr: "Gürcistan’da porsiyonlar büyüktür; khinkali tane ile sipariş edilir ve elle, tepesindeki hamur düğümünden tutularak yenir (düğüm tabakta bırakılır). Birçok restoranda hesaba yaklaşık %10-18 servis ücreti eklenir; ekliyse ayrıca bahşiş gerekmez.",
        en: "Portions are generous; khinkali are ordered by the piece and eaten by hand, holding the dough knot on top (leave the knot on the plate). Many restaurants add a service charge of roughly 10-18%; if included, no extra tip is needed.",
        de: "Große Portionen; Chinkali werden stückweise bestellt und am Teigknoten mit der Hand gegessen. Viele Restaurants berechnen ca. 10-18 % Service; dann ist kein Trinkgeld nötig."
      }
    },
    packingAndPrecautions: {
      essentials: {
        tr: [
          "Kazbegi için yazın bile rüzgarlık ve polar",
          "Kiliseler için başörtüsü / uzun etek ve pantolon",
          "Gergeti ve vadi yürüyüşleri için rahat yürüyüş ayakkabısı",
          "C/F tipi priz adaptörü (Türkiye ile aynı)"
        ],
        en: [
          "Windbreaker and fleece for Kazbegi, even in summer",
          "Headscarf, long skirt or trousers for churches",
          "Sturdy walking shoes for Gergeti and valley hikes",
          "Type C/F plug adapter (same as Turkey)"
        ],
        de: [
          "Windjacke & Fleece für Kasbegi, auch im Sommer",
          "Kopftuch, langer Rock oder Hose für Kirchen",
          "Feste Wanderschuhe",
          "Stecker Typ C/F"
        ]
      },
      safetyAndEtiquette: {
        tr: [
          "İşgal altındaki Abhazya ve Güney Osetya’ya Rusya tarafından girmek Gürcü yasalarına göre suçtur; bu bölgeleri rotaya eklemeyin.",
          "Dağ yollarında sürüş temposu hızlıdır ve virajlar keskindir; marşrutka yerine güvenilir bir şoför tercih edebilirsiniz.",
          "Sokak köpekleri yaygındır ancak çoğu kulak küpeli ve aşılıdır; yine de beslerken temkinli olun."
        ],
        en: [
          "Entering the occupied regions of Abkhazia and South Ossetia from Russia is illegal under Georgian law; keep them off your route.",
          "Driving on mountain roads is fast and the bends are sharp; a reliable private driver can be a safer choice than a marshrutka.",
          "Street dogs are common but most are ear-tagged and vaccinated; still, be careful when feeding them."
        ],
        de: [
          "Die Einreise nach Abchasien und Südossetien über Russland ist nach georgischem Recht illegal.",
          "Auf Bergstraßen wird schnell gefahren; ein zuverlässiger Fahrer ist oft sicherer als eine Marschrutka.",
          "Straßenhunde sind häufig, meist markiert und geimpft; dennoch vorsichtig sein."
        ]
      }
    }
  },
  EG: {
    routeName: {
      tr: "Firavunlar Rotası: Kahire & Gize, Luksor, Asuan & Kızıldeniz",
      en: "Land of the Pharaohs: Cairo & Giza, Luxor, Aswan & the Red Sea",
      de: "Land der Pharaonen: Kairo & Gizeh, Luxor, Assuan & Rotes Meer"
    },
    routeSummary: {
      tr: "Gize piramitleri ve Büyük Mısır Müzesi’yle başlayan, Luksor’daki Karnak ve Krallar Vadisi’nden Nil gemisiyle Asuan’a ve Ebu Simbel’e uzanan, isteğe bağlı olarak Kızıldeniz’de dinlenmeyle biten 10 günlük antik Mısır rotası.",
      en: "A 10-day ancient Egypt route that starts with the Giza pyramids and the Grand Egyptian Museum, continues from Karnak and the Valley of the Kings in Luxor by Nile cruise to Aswan and Abu Simbel, and optionally ends with a few days on the Red Sea.",
      de: "Eine 10-tägige Route von den Pyramiden von Gizeh und dem Großen Ägyptischen Museum über Karnak und das Tal der Könige in Luxor per Nilkreuzfahrt nach Assuan und Abu Simbel, optional mit Badetagen am Roten Meer."
    },
    totalDays: 10,
    idealDurationText: {
      tr: "10 Günlük Antik Mısır Rotası",
      en: "10-Day Ancient Egypt Route",
      de: "10-Tage-Route durch das Alte Ägypten"
    },
    bestSeason: {
      tr: "Ekim - Nisan (Haziran - Ağustos arası Luksor ve Asuan’da sıcaklık sıklıkla 40°C’yi aşar)",
      en: "October - April (from June to August Luxor and Aswan often exceed 40°C)",
      de: "Oktober - April (Juni - August oft über 40 °C in Luxor und Assuan)"
    },
    transportMode: {
      tr: "Kahire - Luksor iç hat uçuşu veya yataklı tren + Luksor - Asuan arası 3-4 gecelik Nil gemisi + Kızıldeniz için uçuş veya karayolu",
      en: "Cairo - Luxor domestic flight or sleeper train + 3-4 night Nile cruise between Luxor and Aswan + flight or road transfer to the Red Sea",
      de: "Inlandsflug oder Schlafwagenzug Kairo - Luxor + 3-4 Nächte Nilkreuzfahrt Luxor - Assuan + Flug oder Straße zum Roten Meer"
    },
    paceLevel: {
      tr: "Yoğun Keşif (Erken kalkışlı tarih turları)",
      en: "Intensive (Early-start heritage days)",
      de: "Intensiv (frühe Starts)"
    },
    stops: [
      {
        name: {
          tr: "1. Durak: Kahire & Gize (Piramitler & Büyük Mısır Müzesi)",
          en: "Stop 1: Cairo & Giza (Pyramids & Grand Egyptian Museum)",
          de: "Stopp 1: Kairo & Gizeh (Pyramiden & Großes Ägyptisches Museum)"
        },
        recommendedDuration: {
          tr: "3 Gün (Gize & Sakkara 1 gün, müze 1 gün, İslami Kahire 1 gün)",
          en: "3 Days (Giza & Saqqara 1 day, museum 1 day, Islamic Cairo 1 day)",
          de: "3 Tage (Gizeh & Sakkara, Museum, islamisches Kairo)"
        },
        durationBadge: {
          tr: "3 Gün",
          en: "3 Days",
          de: "3 Tage"
        },
        highlights: {
          tr: [
            "Gize Piramitleri & Büyük Sfenks",
            "Büyük Mısır Müzesi (GEM) & Tutankamon koleksiyonu",
            "Sakkara: Djoser Basamaklı Piramidi",
            "Han el-Halili Çarşısı, El-Ezher & Selahaddin Kalesi (Mehmed Ali Paşa Camii)"
          ],
          en: [
            "Giza Pyramids & Great Sphinx",
            "Grand Egyptian Museum (GEM) & Tutankhamun collection",
            "Saqqara: Step Pyramid of Djoser",
            "Khan el-Khalili Bazaar, Al-Azhar & Saladin Citadel (Muhammad Ali Mosque)"
          ],
          de: [
            "Pyramiden von Gizeh & Sphinx",
            "Großes Ägyptisches Museum (GEM) & Tutanchamun-Sammlung",
            "Sakkara: Stufenpyramide des Djoser",
            "Basar Khan el-Khalili, Al-Azhar & Zitadelle (Muhammad-Ali-Moschee)"
          ]
        },
        activities: {
          tr: [
            "Gize platosuna açılış saatinde girip piramitleri serin saatlerde gezin; panorama noktasından üç piramidi bir arada fotoğraflayın.",
            "Piramitlerin yanındaki Büyük Mısır Müzesi’nde dev II. Ramses heykelini ve Tutankamon’un tüm hazinelerini görmek için en az yarım gün ayırın.",
            "Akşamüstü İslami Kahire’de El-Muizz Caddesi’nden Han el-Halili’ye yürüyüp tarihi El-Fishawy kahvesinde nane çayı için."
          ],
          en: [
            "Enter the Giza plateau at opening time to see the pyramids in the cool morning, and photograph all three from the panorama point.",
            "Allow at least half a day at the Grand Egyptian Museum next to the pyramids to see the colossal Ramesses II statue and Tutankhamun’s complete treasures.",
            "In the late afternoon walk Al-Muizz Street in Islamic Cairo to Khan el-Khalili and have mint tea at the historic El-Fishawy café."
          ],
          de: [
            "Zur Öffnung auf das Gizeh-Plateau und alle drei Pyramiden vom Panoramapunkt fotografieren.",
            "Mindestens einen halben Tag im Großen Ägyptischen Museum für die Ramses-II.-Statue und Tutanchamuns Schätze einplanen.",
            "Am Nachmittag über die Al-Muizz-Straße zum Khan el-Khalili und Minztee im Café El-Fishawy."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Koshari (mercimek, pirinç ve makarnalı Kahire klasiği)",
            "Ful medames & Ta’ameya (bakladan Mısır falafeli)",
            "Hamam mahshi (firikli dolma güvercin)",
            "Karkade (soğuk hibiskus şerbeti)"
          ],
          en: [
            "Koshari (Cairo’s lentil, rice and pasta classic)",
            "Ful medames & Ta’ameya (Egyptian fava-bean falafel)",
            "Hamam mahshi (pigeon stuffed with freekeh)",
            "Karkadeh (chilled hibiscus drink)"
          ],
          de: [
            "Koschari (Linsen, Reis & Nudeln)",
            "Ful Medames & Taamija (Bohnen-Falafel)",
            "Hamam Mahschi (gefüllte Taube)",
            "Karkadeh (Hibiskusgetränk)"
          ]
        },
        criticalTips: {
          tr: [
            "Gize’de deve, at ve “rehber” teklif eden kişiler ısrarcıdır; fiyatı binmeden önce kesin olarak konuşun ve resmi bilet gişeleri dışında kimseye ödeme yapmayın.",
            "Kahire trafiği yoğundur; şehir içi ulaşımda Uber veya Careem kullanın ve müze ile piramit ziyaretini aynı güne sıkıştırmayın."
          ],
          en: [
            "Camel, horse and “guide” touts at Giza are persistent; agree a firm price before riding and pay no one except the official ticket offices for entry.",
            "Cairo traffic is heavy; use Uber or Careem and don’t squeeze the museum and pyramids into the same rushed day."
          ],
          de: [
            "Kamel- und Pferdeanbieter in Gizeh sind aufdringlich; Preis vorher festlegen, Eintritt nur an offiziellen Kassen zahlen.",
            "Starker Verkehr in Kairo; Uber oder Careem nutzen und Museum und Pyramiden nicht in einen Tag pressen."
          ]
        },
        mapsQuery: "Giza Pyramids, Giza, Egypt"
      },
      {
        name: {
          tr: "2. Durak: Luksor (Karnak, Krallar Vadisi & Batı Yakası)",
          en: "Stop 2: Luxor (Karnak, Valley of the Kings & West Bank)",
          de: "Stopp 2: Luxor (Karnak, Tal der Könige & Westufer)"
        },
        recommendedDuration: {
          tr: "2 Gün (Doğu yakası tapınakları 1 gün + Batı yakası nekropolü 1 gün)",
          en: "2 Days (East Bank temples 1 day + West Bank necropolis 1 day)",
          de: "2 Tage (Tempel am Ostufer + Nekropole am Westufer)"
        },
        durationBadge: {
          tr: "2 Gün",
          en: "2 Days",
          de: "2 Tage"
        },
        highlights: {
          tr: [
            "Karnak Tapınağı & Hipostil Salonu",
            "Luksor Tapınağı (gece ışıklandırmalı)",
            "Krallar Vadisi kraliyet mezarları",
            "Hatşepsut Tapınağı & Memnon Kolosları"
          ],
          en: [
            "Karnak Temple & Great Hypostyle Hall",
            "Luxor Temple (illuminated at night)",
            "Valley of the Kings royal tombs",
            "Temple of Hatshepsut & Colossi of Memnon"
          ],
          de: [
            "Karnak-Tempel & Säulensaal",
            "Luxor-Tempel (nachts beleuchtet)",
            "Königsgräber im Tal der Könige",
            "Hatschepsut-Tempel & Memnonkolosse"
          ]
        },
        activities: {
          tr: [
            "Gün doğumunda sıcak hava balonuyla Batı Yakası tapınaklarının ve Nil’in üzerinde süzülün.",
            "Krallar Vadisi’nde standart biletle üç mezar gezip Tutankamon veya I. Seti mezarı için ayrı bilet alın; ardından Hatşepsut Tapınağı’na geçin.",
            "Akşam Karnak’tan Luksor Tapınağı’na uzanan Sfenksler Yolu’nda yürüyüp ışıklandırılmış tapınağı gezin."
          ],
          en: [
            "Float over the West Bank temples and the Nile in a sunrise hot-air balloon.",
            "At the Valley of the Kings the standard ticket covers three tombs; buy separate tickets for Tutankhamun’s or Seti I’s tomb, then continue to the Temple of Hatshepsut.",
            "In the evening walk the Avenue of Sphinxes linking Karnak with Luxor Temple and tour the floodlit temple."
          ],
          de: [
            "Bei Sonnenaufgang mit dem Heißluftballon über Westufer und Nil schweben.",
            "Das Standardticket gilt für drei Gräber; Tutanchamun oder Sethos I. separat; danach zum Hatschepsut-Tempel.",
            "Abends über die Sphingenallee zwischen Karnak und Luxor-Tempel spazieren."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Molokhia (mulukhiye çorbası) & pilav",
            "Tavuk ve kebap ızgaraları (kofta)",
            "Taze şeker kamışı suyu (asab)"
          ],
          en: [
            "Molokhia (jute-leaf stew) & rice",
            "Grilled chicken & kofta kebabs",
            "Fresh sugarcane juice (asab)"
          ],
          de: [
            "Molochia (Jutelblatt-Eintopf) & Reis",
            "Gegrilltes Hähnchen & Kofta",
            "Frischer Zuckerrohrsaft (Asab)"
          ]
        },
        criticalTips: {
          tr: [
            "Batı Yakası’ndaki mezarların içinde fotoğraf için ayrı izin gerekebilir; kurallar değişebildiği için gişede sorun.",
            "Balon turlarını lisanslı ve iyi yorum almış firmalardan seçin; hava koşullarına göre uçuşlar iptal edilebilir."
          ],
          en: [
            "Photography inside West Bank tombs may require an extra permit; rules change, so ask at the ticket office.",
            "Choose a licensed, well-reviewed balloon operator; flights can be cancelled due to weather."
          ],
          de: [
            "Für Fotos in den Gräbern kann eine Zusatzgenehmigung nötig sein; an der Kasse fragen.",
            "Nur lizenzierte, gut bewertete Ballonanbieter wählen; wetterbedingte Absagen möglich."
          ]
        },
        mapsQuery: "Karnak Temple, Luxor, Egypt"
      },
      {
        name: {
          tr: "3. Durak: Nil Gemisi, Asuan & Ebu Simbel",
          en: "Stop 3: Nile Cruise, Aswan & Abu Simbel",
          de: "Stopp 3: Nilkreuzfahrt, Assuan & Abu Simbel"
        },
        recommendedDuration: {
          tr: "3 Gün (Edfu & Kom Ombo durakları + Asuan + Ebu Simbel günübirlik)",
          en: "3 Days (Edfu & Kom Ombo stops + Aswan + Abu Simbel day trip)",
          de: "3 Tage (Edfu, Kom Ombo, Assuan + Abu Simbel)"
        },
        durationBadge: {
          tr: "3 Gün",
          en: "3 Days",
          de: "3 Tage"
        },
        highlights: {
          tr: [
            "Edfu Horus Tapınağı & Kom Ombo Tapınağı",
            "Philae Tapınağı (İsis Tapınağı)",
            "Ebu Simbel’deki II. Ramses & Nefertari tapınakları",
            "Felukayla Elephantine Adası & Nubyan köyü"
          ],
          en: [
            "Temple of Horus at Edfu & Kom Ombo Temple",
            "Philae Temple (Temple of Isis)",
            "Ramesses II & Nefertari temples at Abu Simbel",
            "Felucca to Elephantine Island & a Nubian village"
          ],
          de: [
            "Horus-Tempel von Edfu & Tempel von Kom Ombo",
            "Philae-Tempel (Isis-Tempel)",
            "Tempel von Ramses II. & Nefertari in Abu Simbel",
            "Feluke zur Insel Elephantine & nubisches Dorf"
          ]
        },
        activities: {
          tr: [
            "Luksor’dan Asuan’a 3-4 gecelik Nil gemisinde Edfu ve Kom Ombo tapınaklarını gezin; güvertede gün batımını izleyin.",
            "Sabahın çok erken saatinde Asuan’dan Ebu Simbel’e (karayoluyla tek yön yaklaşık 3-3,5 saat ya da kısa uçuşla) gidip kayaya oyulmuş dev tapınakları görün.",
            "Motorlu tekneyle Philae Tapınağı’na geçin, ardından felukayla Nil’de yelken açıp renkli Nubyan köyü Gharb Soheil’i ziyaret edin."
          ],
          en: [
            "On a 3-4 night Nile cruise from Luxor to Aswan, visit the temples of Edfu and Kom Ombo and watch the sunset from the deck.",
            "Leave Aswan before dawn for Abu Simbel (about 3-3.5 hours each way by road, or a short flight) to see the colossal rock-cut temples.",
            "Take a motorboat to Philae Temple, then sail the Nile by felucca and visit the colourful Nubian village of Gharb Soheil."
          ],
          de: [
            "Auf der 3-4-tägigen Nilkreuzfahrt Edfu und Kom Ombo besuchen und den Sonnenuntergang an Deck genießen.",
            "Vor Sonnenaufgang nach Abu Simbel (ca. 3-3,5 Std. pro Strecke oder kurzer Flug) zu den Felsentempeln.",
            "Mit dem Boot nach Philae, danach mit der Feluke zum nubischen Dorf Gharb Soheil."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Nubyan usulü tagine & ekmek",
            "Nil balığı (ızgara tilapia)",
            "Asuan baharat pazarından karkade ve hurma"
          ],
          en: [
            "Nubian-style tagine & bread",
            "Nile fish (grilled tilapia)",
            "Hibiscus and dates from Aswan’s spice market"
          ],
          de: [
            "Nubische Tajine & Brot",
            "Nilfisch (gegrillte Tilapia)",
            "Hibiskus & Datteln vom Gewürzmarkt in Assuan"
          ]
        },
        criticalTips: {
          tr: [
            "Nil gemileri her iki yönde de çalışır; Asuan’dan Luksor’a giden bir gemi seçerseniz rota Luksor’da biter ve Kızıldeniz’e (Hurgada’ya yaklaşık 4 saat) geçmek kolaylaşır.",
            "Bahşiş (baksheesh) Mısır’da hayatın parçasıdır; tuvalet, rehber ve gemi personeli için yanınızda bozuk para ve küçük banknotlar bulundurun."
          ],
          en: [
            "Nile cruises run in both directions; an Aswan-to-Luxor sailing ends in Luxor, which makes the road transfer to the Red Sea (about 4 hours to Hurghada) easier.",
            "Tipping (baksheesh) is part of daily life in Egypt; carry coins and small notes for toilets, guides and cruise staff."
          ],
          de: [
            "Kreuzfahrten fahren in beide Richtungen; Assuan - Luxor endet in Luxor, von wo Hurghada ca. 4 Std. entfernt ist.",
            "Trinkgeld (Bakschisch) gehört dazu; Kleingeld für Toiletten, Guides und Schiffspersonal dabeihaben."
          ]
        },
        mapsQuery: "Abu Simbel Temples, Aswan Governorate, Egypt"
      },
      {
        name: {
          tr: "4. Durak: Kızıldeniz (Hurgada veya Şarm El-Şeyh) — İsteğe Bağlı",
          en: "Stop 4: Red Sea (Hurghada or Sharm El Sheikh) — Optional",
          de: "Stopp 4: Rotes Meer (Hurghada oder Scharm El-Scheich) — optional"
        },
        recommendedDuration: {
          tr: "2 Gün (Şnorkel, dalış ve dinlenme)",
          en: "2 Days (Snorkelling, diving and rest)",
          de: "2 Tage (Schnorcheln, Tauchen & Erholung)"
        },
        durationBadge: {
          tr: "2 Gün",
          en: "2 Days",
          de: "2 Tage"
        },
        highlights: {
          tr: [
            "Giftun Adası tekne turu (Hurgada)",
            "Ras Muhammed Milli Parkı (Şarm El-Şeyh)",
            "Mercan resifleriyle dolu Kızıldeniz kıyıları",
            "El Gouna marina kasabası"
          ],
          en: [
            "Giftun Island boat trip (Hurghada)",
            "Ras Mohammed National Park (Sharm El Sheikh)",
            "Red Sea coral reefs",
            "El Gouna marina town"
          ],
          de: [
            "Bootsausflug zur Insel Giftun (Hurghada)",
            "Nationalpark Ras Mohammed (Scharm El-Scheich)",
            "Korallenriffe des Roten Meeres",
            "Lagunenstadt El Gouna"
          ]
        },
        activities: {
          tr: [
            "Tekneyle açılıp mercan resiflerinde şnorkelle renkli tropikal balıkları izleyin; deneyimsizler için tanıtım dalışı (discover scuba) yapın.",
            "Tarih ağırlıklı günlerin yorgunluğunu otel plajında dinlenerek atın.",
            "Akşam Hurgada marinasında veya Şarm’daki Naama Körfezi’nde yürüyüş yapın."
          ],
          en: [
            "Head out by boat to snorkel the coral reefs among tropical fish; beginners can try a discover-scuba dive.",
            "Recover from the heritage-heavy days on your hotel’s beach.",
            "Spend the evening strolling Hurghada Marina or Naama Bay in Sharm."
          ],
          de: [
            "Mit dem Boot zum Schnorcheln an die Korallenriffe; Anfänger können ein Schnuppertauchen machen.",
            "Am Hotelstrand von den Besichtigungstagen erholen.",
            "Abends über die Marina von Hurghada oder die Naama Bay in Scharm schlendern."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Sayadeya (kimyonlu pilav üstü balık)",
            "Izgara kalamar & karides",
            "Om Ali (sütlü hamur tatlısı)"
          ],
          en: [
            "Sayadeya (fish over spiced rice)",
            "Grilled calamari & prawns",
            "Om Ali (Egyptian bread pudding)"
          ],
          de: [
            "Sayadeya (Fisch auf Gewürzreis)",
            "Gegrillte Calamari & Garnelen",
            "Om Ali (ägyptischer Brotpudding)"
          ]
        },
        criticalTips: {
          tr: [
            "Şarm El-Şeyh Sina Yarımadası’ndadır ve Asuan veya Luksor’dan doğrudan karayolu bağlantısı pratik değildir; genelde Kahire aktarmalı uçuşla gidilir. Hurgada ise Luksor’dan karayoluyla ulaşılabilir.",
            "Mercanlara dokunmayın ve resif dostu güneş kremi kullanın; Ras Muhammed gibi korunan alanlarda kurallara uyun."
          ],
          en: [
            "Sharm El Sheikh is in Sinai and not practical by road from Aswan or Luxor; it is usually reached by flight via Cairo. Hurghada can be reached by road from Luxor.",
            "Don’t touch the coral and use reef-safe sunscreen; follow the rules in protected areas such as Ras Mohammed."
          ],
          de: [
            "Scharm liegt auf dem Sinai und wird meist per Flug über Kairo erreicht; Hurghada ist von Luxor per Straße erreichbar.",
            "Korallen nicht berühren, riffschonende Sonnencreme verwenden."
          ]
        },
        mapsQuery: "Giftun Island, Hurghada, Egypt"
      }
    ],
    signatureGastronomy: {
      dishes: {
        tr: [
          "Koshari",
          "Molokhia",
          "Hamam mahshi (dolma güvercin)",
          "Fattah (pilavlı, ekmekli et yemeği)"
        ],
        en: [
          "Koshari",
          "Molokhia",
          "Hamam mahshi (stuffed pigeon)",
          "Fattah (meat over rice and bread)"
        ],
        de: [
          "Koschari",
          "Molochia",
          "Hamam Mahschi (gefüllte Taube)",
          "Fatta (Fleisch auf Reis & Brot)"
        ]
      },
      drinks: {
        tr: [
          "Karkade (hibiskus)",
          "Şeker kamışı suyu",
          "Nane çayı & Mısır kahvesi",
          "Sahlep (kışın)"
        ],
        en: [
          "Karkadeh (hibiscus)",
          "Sugarcane juice",
          "Mint tea & Egyptian coffee",
          "Sahlab (in winter)"
        ],
        de: [
          "Karkadeh (Hibiskus)",
          "Zuckerrohrsaft",
          "Minztee & ägyptischer Kaffee",
          "Sahlab (im Winter)"
        ]
      },
      streetFoods: {
        tr: [
          "Ta’ameya sandviçi",
          "Feteer meshaltet (katmerli hamur)",
          "Hawawshi (kıymalı ekmek)",
          "Basbousa (irmik tatlısı)"
        ],
        en: [
          "Ta’ameya sandwich",
          "Feteer meshaltet (flaky layered pastry)",
          "Hawawshi (spiced minced-meat bread)",
          "Basbousa (semolina cake)"
        ],
        de: [
          "Taamija-Sandwich",
          "Fetir Meschaltet (Blätterteig)",
          "Hawawschi (Fleischbrot)",
          "Basbousa (Grießkuchen)"
        ]
      },
      diningAdvice: {
        tr: "Musluk suyu içmeyin, kapalı şişe su tercih edin. Pazarlarda fiyatlar pazarlığa açıktır. Restoranlarda hesaba servis ücreti eklense bile garsona küçük bir bahşiş bırakmak yaygındır. Ramazan’da gündüzleri bazı yerel lokantalar kapalı olabilir.",
        en: "Don’t drink tap water; stick to sealed bottled water. Prices at markets are negotiable. Even when a service charge is added, leaving a small tip for the waiter is customary. During Ramadan some local eateries may be closed in the daytime.",
        de: "Kein Leitungswasser trinken. Auf Märkten wird gehandelt. Trotz Servicegebühr ist ein kleines Trinkgeld üblich. Im Ramadan haben tagsüber manche Lokale geschlossen."
      }
    },
    packingAndPrecautions: {
      essentials: {
        tr: [
          "Geniş kenarlı şapka, güneş gözlüğü ve yüksek faktörlü güneş kremi",
          "Camiler ve kırsal bölgeler için omuz ve dizleri örten hafif giysiler",
          "Bahşiş için bozuk para ve küçük Mısır poundu banknotları",
          "Şnorkel maskesi ve su ayakkabısı (Kızıldeniz için)"
        ],
        en: [
          "Wide-brimmed hat, sunglasses and high-SPF sunscreen",
          "Light clothing covering shoulders and knees for mosques and rural areas",
          "Coins and small Egyptian pound notes for tips",
          "Snorkel mask and water shoes (for the Red Sea)"
        ],
        de: [
          "Sonnenhut, Sonnenbrille & hoher Lichtschutzfaktor",
          "Leichte Kleidung, die Schultern & Knie bedeckt",
          "Kleingeld in Ägyptischen Pfund für Trinkgeld",
          "Schnorchelmaske & Badeschuhe"
        ]
      },
      safetyAndEtiquette: {
        tr: [
          "Türk vatandaşları Mısır’a varışta vize veya önceden alınan e-Vize ile girebilir; seyahat öncesi güncel koşulları resmi kaynaklardan teyit edin.",
          "Yaz aylarında (Haziran - Ağustos) açık hava ziyaretlerini sabah erken ve akşamüstüne planlayın, öğle saatlerinde gölgede kalın ve bol su için; güneş çarpması ciddi bir risktir.",
          "Turistik alanlarda “ücretsiz” hediye, papirüs veya parfüm dükkânına götürme tekliflerine kibarca hayır deyin."
        ],
        en: [
          "Turkish citizens can enter Egypt with a visa on arrival or an e-Visa obtained in advance; confirm current conditions with official sources before travelling.",
          "In summer (June - August) plan outdoor sites for early morning and late afternoon, stay in the shade at midday and drink plenty of water; heatstroke is a serious risk.",
          "Politely decline “free” gifts and offers to take you to papyrus or perfume shops in tourist areas."
        ],
        de: [
          "Türkische Staatsbürger erhalten ein Visum bei Ankunft oder vorab ein E-Visum; aktuelle Bedingungen offiziell prüfen.",
          "Im Sommer Besichtigungen früh morgens und spätnachmittags planen, mittags Schatten suchen und viel trinken; Hitzschlaggefahr.",
          "„Kostenlose“ Geschenke und Angebote für Papyrus- oder Parfümläden höflich ablehnen."
        ]
      }
    }
  },
  GR: {
    routeName: {
      tr: "Antik Yunan & Ege Adaları: Atina, Kiklad Adaları, Meteora & Selanik",
      en: "Ancient Greece & Aegean Islands: Athens, the Cyclades, Meteora & Thessaloniki",
      de: "Antikes Griechenland & Ägäis: Athen, Kykladen, Meteora & Thessaloniki"
    },
    routeSummary: {
      tr: "Akropolis’in gölgesindeki Atina’dan feribotla beyaz badanalı Kiklad adalarına (Santorini ve Paros ya da Mikonos), ardından anakaraya dönüp kayalıkların tepesindeki Meteora manastırlarına ve Atatürk’ün doğduğu Selanik’e uzanan 10 günlük rota.",
      en: "A 10-day route from Athens beneath the Acropolis by ferry to the whitewashed Cyclades (Santorini and Paros or Mykonos), then back to the mainland for the cliff-top monasteries of Meteora and Thessaloniki, birthplace of Atatürk.",
      de: "Eine 10-tägige Route von Athen per Fähre zu den Kykladen (Santorin und Paros oder Mykonos), dann zurück aufs Festland zu den Meteora-Klöstern und nach Thessaloniki, Geburtsort Atatürks."
    },
    totalDays: 10,
    idealDurationText: {
      tr: "10 Günlük Ege & Anakara Rotası",
      en: "10-Day Aegean & Mainland Route",
      de: "10-Tage-Route Ägäis & Festland"
    },
    bestSeason: {
      tr: "Mayıs - Haziran & Eylül - Ekim (Adalarda deniz sıcak, kalabalık ve fiyatlar Temmuz - Ağustos’a göre daha makul)",
      en: "May - June & September - October (warm sea, fewer crowds and fairer prices than July - August)",
      de: "Mai - Juni & September - Oktober (warmes Meer, weniger Andrang als im Hochsommer)"
    },
    transportMode: {
      tr: "Pire / Rafina’dan adalara feribot (Ferryhopper ile karşılaştırıp rezervasyon) + Atina - Kalambaka treni + Kalambaka - Selanik tren veya otobüs",
      en: "Ferries from Piraeus / Rafina to the islands (compare and book on Ferryhopper) + Athens - Kalambaka train + Kalambaka - Thessaloniki train or bus",
      de: "Fähren ab Piräus / Rafina (Vergleich & Buchung über Ferryhopper) + Zug Athen - Kalambaka + Zug oder Bus nach Thessaloniki"
    },
    paceLevel: {
      tr: "Dengeli & Tarih + Deniz",
      en: "Balanced & History + Sea",
      de: "Ausgewogen & Geschichte + Meer"
    },
    stops: [
      {
        name: {
          tr: "1. Durak: Atina (Akropolis & Plaka)",
          en: "Stop 1: Athens (Acropolis & Plaka)",
          de: "Stopp 1: Athen (Akropolis & Plaka)"
        },
        recommendedDuration: {
          tr: "2-3 Gün (Antik alanlar + Sounion gün batımı)",
          en: "2-3 Days (Ancient sites + Sounion sunset)",
          de: "2-3 Tage (Antike Stätten + Sonnenuntergang in Sounion)"
        },
        durationBadge: {
          tr: "2-3 Gün",
          en: "2-3 Days",
          de: "2-3 Tage"
        },
        highlights: {
          tr: [
            "Akropolis & Parthenon",
            "Akropolis Müzesi",
            "Plaka, Anafiotika & Monastiraki",
            "Sounion Burnu Poseidon Tapınağı"
          ],
          en: [
            "Acropolis & Parthenon",
            "Acropolis Museum",
            "Plaka, Anafiotika & Monastiraki",
            "Temple of Poseidon at Cape Sounion"
          ],
          de: [
            "Akropolis & Parthenon",
            "Akropolismuseum",
            "Plaka, Anafiotika & Monastiraki",
            "Poseidontempel am Kap Sounion"
          ]
        },
        activities: {
          tr: [
            "Akropolis’e açılışta veya kapanışa yakın saatlerde girip Parthenon’u sıcak ve kalabalıktan uzak gezin.",
            "Akropolis Müzesi’nde cam zemin altındaki antik kazıları ve Parthenon frizlerini görün.",
            "Syntagma Meydanı’nda Evzon nöbet değişimini izleyin, akşamüstü Sounion Burnu’na gidip Poseidon Tapınağı’nda gün batımını yakalayın."
          ],
          en: [
            "Visit the Acropolis right at opening or late in the day to see the Parthenon away from the heat and crowds.",
            "At the Acropolis Museum see the excavations beneath the glass floor and the Parthenon frieze.",
            "Watch the Evzones changing of the guard at Syntagma Square, then drive to Cape Sounion for sunset at the Temple of Poseidon."
          ],
          de: [
            "Die Akropolis zur Öffnung oder am späten Nachmittag besuchen, um Hitze und Andrang zu meiden.",
            "Im Akropolismuseum die Ausgrabungen unter dem Glasboden und den Parthenonfries ansehen.",
            "Wachwechsel der Evzonen am Syntagma-Platz und Sonnenuntergang am Poseidontempel in Sounion."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Gyros & Souvlaki (pide arası)",
            "Musakka & Pastitsio",
            "Loukoumades (ballı lokma)",
            "Freddo espresso / Frappé"
          ],
          en: [
            "Gyros & Souvlaki in pita",
            "Moussaka & Pastitsio",
            "Loukoumades (honey doughnuts)",
            "Freddo espresso / Frappé"
          ],
          de: [
            "Gyros & Souvlaki im Pita",
            "Moussaka & Pastitsio",
            "Loukoumades (Honigkrapfen)",
            "Freddo Espresso / Frappé"
          ]
        },
        criticalTips: {
          tr: [
            "Akropolis için zaman dilimli biletinizi resmi siteden önceden alın; aşırı sıcak dalgalarında alan öğle saatlerinde kapatılabilir.",
            "Metroda ve Monastiraki çevresinde yankesicilere karşı dikkatli olun."
          ],
          en: [
            "Buy your timed Acropolis ticket in advance from the official site; during heatwaves the site can close at midday.",
            "Watch out for pickpockets on the metro and around Monastiraki."
          ],
          de: [
            "Zeitfenster-Tickets für die Akropolis vorab offiziell kaufen; bei Hitzewellen mittags Schließung möglich.",
            "Vorsicht vor Taschendieben in der Metro und in Monastiraki."
          ]
        },
        mapsQuery: "Acropolis of Athens, Athens, Greece"
      },
      {
        name: {
          tr: "2. Durak: Kiklad Adaları (Santorini & Paros veya Mikonos)",
          en: "Stop 2: The Cyclades (Santorini & Paros or Mykonos)",
          de: "Stopp 2: Kykladen (Santorin & Paros oder Mykonos)"
        },
        recommendedDuration: {
          tr: "4 Gün (Santorini 2 gün + Paros veya Mikonos 2 gün)",
          en: "4 Days (Santorini 2 days + Paros or Mykonos 2 days)",
          de: "4 Tage (Santorin 2 + Paros oder Mykonos 2)"
        },
        durationBadge: {
          tr: "4 Gün",
          en: "4 Days",
          de: "4 Tage"
        },
        highlights: {
          tr: [
            "Santorini: Oia gün batımı & kaldera manzarası",
            "Akrotiri Tarih Öncesi Kenti",
            "Paros: Naoussa limanı & Lefkes köyü",
            "Mikonos: Küçük Venedik & yel değirmenleri"
          ],
          en: [
            "Santorini: Oia sunset & caldera views",
            "Akrotiri prehistoric town",
            "Paros: Naoussa harbour & Lefkes village",
            "Mykonos: Little Venice & windmills"
          ],
          de: [
            "Santorin: Sonnenuntergang in Oia & Caldera",
            "Prähistorische Stadt Akrotiri",
            "Paros: Hafen Naoussa & Dorf Lefkes",
            "Mykonos: Klein-Venedig & Windmühlen"
          ]
        },
        activities: {
          tr: [
            "Fira’dan Oia’ya kaldera kenarındaki patikada (yaklaşık 10 km) yürüyün veya gün batımından saatler önce Oia’da yer edinin.",
            "Santorini’de volkanik kumlu Perissa veya Kamari plajlarında yüzün, ardından bir şaraphanede Assyrtiko tadın.",
            "Feribotla Paros’a geçip Naoussa’nın balıkçı limanında akşam yemeği yiyin; parti ve lüks arayanlar Mikonos’u tercih edebilir."
          ],
          en: [
            "Hike the caldera-rim trail from Fira to Oia (about 10 km), or claim a spot in Oia hours before sunset.",
            "Swim at the volcanic-sand beaches of Perissa or Kamari, then taste Assyrtiko at a Santorini winery.",
            "Ferry over to Paros and have dinner at Naoussa’s fishing harbour; those after nightlife and glamour can choose Mykonos instead."
          ],
          de: [
            "Kraterrandweg von Fira nach Oia (ca. 10 km) wandern oder früh einen Platz für den Sonnenuntergang suchen.",
            "An den Vulkanstränden Perissa oder Kamari baden und Assyrtiko im Weingut probieren.",
            "Mit der Fähre nach Paros und Abendessen im Fischerhafen von Naoussa; wer Nachtleben sucht, wählt Mykonos."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Santorini fava ezmesi & domates köftesi (tomatokeftedes)",
            "Izgara ahtapot & taze balık",
            "Assyrtiko beyaz şarabı",
            "Mikonos’un kopanisti peyniri"
          ],
          en: [
            "Santorini fava purée & tomato fritters (tomatokeftedes)",
            "Grilled octopus & fresh fish",
            "Assyrtiko white wine",
            "Kopanisti cheese from Mykonos"
          ],
          de: [
            "Santorin-Fava & Tomatenpuffer",
            "Gegrillter Oktopus & frischer Fisch",
            "Assyrtiko-Weißwein",
            "Kopanisti-Käse aus Mykonos"
          ]
        },
        criticalTips: {
          tr: [
            "Yaz sezonunda feribot ve konaklamayı haftalar önceden ayırtın; rüzgarlı (meltem) günlerde hızlı feribotlar iptal edilebilir, ada dönüşünü uçuş gününe bırakmayın.",
            "Kiklad adaları, Doğu Ege adalarındaki kapıda vize uygulamasının kapsamında değildir; Türk vatandaşlarının bu rota için geçerli Schengen vizesi gerekir."
          ],
          en: [
            "In summer book ferries and rooms weeks ahead; fast ferries can be cancelled on windy meltemi days, so don’t return from the islands on your flight day.",
            "The Cyclades are not covered by the visa-on-arrival scheme for some East Aegean islands; Turkish citizens need a valid Schengen visa for this route."
          ],
          de: [
            "Fähren und Zimmer im Sommer früh buchen; bei Meltemi-Wind fallen Schnellfähren aus — nicht am Abflugtag zurückfahren.",
            "Die Kykladen fallen nicht unter das Visum-bei-Ankunft-Programm einiger Ostägäis-Inseln; Schengen-Visum erforderlich."
          ]
        },
        mapsQuery: "Oia, Santorini, Greece"
      },
      {
        name: {
          tr: "3. Durak: Meteora (Kayalıkların Üzerindeki Manastırlar)",
          en: "Stop 3: Meteora (Monasteries in the Sky)",
          de: "Stopp 3: Meteora (Klöster auf den Felsen)"
        },
        recommendedDuration: {
          tr: "1-2 Gün (Kalambaka’da bir gece önerilir)",
          en: "1-2 Days (One night in Kalambaka recommended)",
          de: "1-2 Tage (eine Nacht in Kalambaka empfohlen)"
        },
        durationBadge: {
          tr: "1-2 Gün",
          en: "1-2 Days",
          de: "1-2 Tage"
        },
        highlights: {
          tr: [
            "Büyük Meteoron Manastırı",
            "Varlaam & Roussanou manastırları",
            "Ayios Stefanos & Ayia Triada",
            "Kastraki köyü & gün batımı seyir noktaları"
          ],
          en: [
            "Great Meteoron Monastery",
            "Varlaam & Roussanou monasteries",
            "Agios Stefanos & Holy Trinity",
            "Kastraki village & sunset viewpoints"
          ],
          de: [
            "Kloster Megalo Meteoro",
            "Klöster Varlaam & Roussanou",
            "Agios Stefanos & Agia Triada",
            "Dorf Kastraki & Aussichtspunkte"
          ]
        },
        activities: {
          tr: [
            "Kayaların tepesindeki altı aktif manastırdan iki-üçünü ziyaret edin; her manastırın haftada bir gün kapalı olduğunu önceden kontrol edin.",
            "Kastraki’den eski keşiş patikalarında yürüyüş yapın veya gün batımı minibüs turuna katılın.",
            "Kalambaka’da tavernada akşam yemeği yiyip ertesi sabah Selanik’e geçin."
          ],
          en: [
            "Visit two or three of the six active cliff-top monasteries; check beforehand as each closes one day a week.",
            "Hike the old monks’ paths from Kastraki or join a sunset minibus tour.",
            "Have dinner at a taverna in Kalambaka and continue to Thessaloniki the next morning."
          ],
          de: [
            "Zwei bis drei der sechs aktiven Klöster besuchen; jedes hat einen Ruhetag pro Woche.",
            "Auf alten Mönchspfaden ab Kastraki wandern oder an einer Sonnenuntergangstour teilnehmen.",
            "Abendessen in einer Taverne in Kalambaka, am nächsten Morgen weiter nach Thessaloniki."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Dağ usulü kuzu kleftiko",
            "Spanakopita & tiropita (ıspanaklı / peynirli börek)",
            "Tesalya feta peyniri & bal"
          ],
          en: [
            "Mountain-style lamb kleftiko",
            "Spanakopita & tiropita (spinach / cheese pies)",
            "Thessalian feta & honey"
          ],
          de: [
            "Lamm-Kleftiko nach Bergart",
            "Spanakopita & Tiropita",
            "Thessalischer Feta & Honig"
          ]
        },
        criticalTips: {
          tr: [
            "Manastırlara girişte kadınlar için diz altı etek, erkekler için uzun pantolon gerekir; girişte sarong verilir.",
            "Atina - Kalambaka tren seferleri sınırlıdır ve bazen Palaiofarsalos’ta aktarma gerekir; tarifeyi Hellenic Train’den önceden kontrol edin."
          ],
          en: [
            "Women need a skirt below the knee and men long trousers to enter the monasteries; wraps are lent at the entrance.",
            "Athens - Kalambaka trains are limited and sometimes require a change at Palaiofarsalos; check the Hellenic Train timetable in advance."
          ],
          de: [
            "Frauen benötigen Rock unter dem Knie, Männer lange Hosen; Tücher werden am Eingang verliehen.",
            "Wenige Züge Athen - Kalambaka, teils mit Umstieg in Palaiofarsalos; Fahrplan bei Hellenic Train prüfen."
          ]
        },
        mapsQuery: "Great Meteoron Monastery, Meteora, Greece"
      },
      {
        name: {
          tr: "4. Durak: Selanik (Atatürk Evi & Bizans Mirası)",
          en: "Stop 4: Thessaloniki (Atatürk House & Byzantine Heritage)",
          de: "Stopp 4: Thessaloniki (Atatürk-Haus & byzantinisches Erbe)"
        },
        recommendedDuration: {
          tr: "2 Gün (Şehir merkezi & Ano Poli)",
          en: "2 Days (City centre & Ano Poli)",
          de: "2 Tage (Zentrum & Ano Poli)"
        },
        durationBadge: {
          tr: "2 Gün",
          en: "2 Days",
          de: "2 Tage"
        },
        highlights: {
          tr: [
            "Atatürk’ün doğduğu ev (Atatürk Müzesi)",
            "Beyaz Kule & sahil yürüyüş yolu",
            "Rotunda & Galerius Takı",
            "Ano Poli (Yukarı Şehir) & Bizans surları"
          ],
          en: [
            "House where Atatürk was born (Atatürk Museum)",
            "White Tower & seafront promenade",
            "Rotunda & Arch of Galerius",
            "Ano Poli (Upper Town) & Byzantine walls"
          ],
          de: [
            "Geburtshaus Atatürks (Atatürk-Museum)",
            "Weißer Turm & Uferpromenade",
            "Rotunde & Galeriusbogen",
            "Ano Poli (Oberstadt) & byzantinische Mauern"
          ]
        },
        activities: {
          tr: [
            "Türkiye Başkonsolosluğu’nun yanındaki Atatürk Evi’ni ziyaret edin; girişte kimlik veya pasaport istenir.",
            "Beyaz Kule’den Aristotelous Meydanı’na sahil boyunca yürüyüp Modiano ve Kapani pazarlarında gezinin.",
            "Akşamüstü Ano Poli’nin dar sokaklarından Bizans surlarına çıkıp körfez manzarasını izleyin."
          ],
          en: [
            "Visit the Atatürk House next to the Turkish Consulate General; ID or passport is required at the entrance.",
            "Walk the seafront from the White Tower to Aristotelous Square and browse the Modiano and Kapani markets.",
            "In the late afternoon climb through Ano Poli’s lanes to the Byzantine walls for views over the gulf."
          ],
          de: [
            "Das Atatürk-Haus neben dem türkischen Generalkonsulat besuchen; Ausweis erforderlich.",
            "Vom Weißen Turm zum Aristotelous-Platz und durch die Märkte Modiano und Kapani.",
            "Am Nachmittag durch Ano Poli zu den byzantinischen Mauern mit Blick auf den Golf."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Bougatsa (kremalı veya peynirli boyoz benzeri börek)",
            "Koulouri Thessalonikis (susamlı simit)",
            "Trigona Panoramatos (şerbetli üçgen tatlı)",
            "Ouzo & meze (Ladadika semtinde)"
          ],
          en: [
            "Bougatsa (cream or cheese filo pastry)",
            "Koulouri Thessalonikis (sesame bread ring)",
            "Trigona Panoramatos (syrup-soaked filo triangles)",
            "Ouzo & meze (in the Ladadika quarter)"
          ],
          de: [
            "Bougatsa (Blätterteig mit Creme oder Käse)",
            "Koulouri (Sesamkringel)",
            "Trigona Panoramatos (Sirup-Blätterteigdreiecke)",
            "Ouzo & Meze im Viertel Ladadika"
          ]
        },
        criticalTips: {
          tr: [
            "Selanik’ten İstanbul ve diğer Türk şehirlerine doğrudan uçuşlar vardır; dönüşü buradan planlayarak Atina’ya geri dönmekten kurtulursunuz.",
            "Atatürk Evi’nin ziyaret saatleri sınırlı olabilir ve güvenlik kontrolü uygulanır; gitmeden önce saatleri kontrol edin."
          ],
          en: [
            "Thessaloniki has direct flights to Istanbul and other Turkish cities, so flying home from here saves backtracking to Athens.",
            "Visiting hours at the Atatürk House can be limited and there is a security check; check opening times before you go."
          ],
          de: [
            "Direktflüge von Thessaloniki nach Istanbul ersparen die Rückfahrt nach Athen.",
            "Öffnungszeiten des Atatürk-Hauses sind begrenzt, mit Sicherheitskontrolle."
          ]
        },
        mapsQuery: "White Tower of Thessaloniki, Thessaloniki, Greece"
      }
    ],
    signatureGastronomy: {
      dishes: {
        tr: [
          "Musakka",
          "Souvlaki & Gyros",
          "Horiatiki (köy salatası)",
          "Gemista (zeytinyağlı dolma)"
        ],
        en: [
          "Moussaka",
          "Souvlaki & Gyros",
          "Horiatiki (Greek village salad)",
          "Gemista (stuffed vegetables)"
        ],
        de: [
          "Moussaka",
          "Souvlaki & Gyros",
          "Choriatiki (Bauernsalat)",
          "Gemista (gefülltes Gemüse)"
        ]
      },
      drinks: {
        tr: [
          "Ouzo",
          "Assyrtiko & Xinomavro şarapları",
          "Freddo espresso & Frappé",
          "Tsipouro"
        ],
        en: [
          "Ouzo",
          "Assyrtiko & Xinomavro wines",
          "Freddo espresso & Frappé",
          "Tsipouro"
        ],
        de: [
          "Ouzo",
          "Assyrtiko & Xinomavro",
          "Freddo Espresso & Frappé",
          "Tsipouro"
        ]
      },
      streetFoods: {
        tr: [
          "Pita gyros",
          "Koulouri (susamlı simit)",
          "Bougatsa",
          "Loukoumades"
        ],
        en: [
          "Pita gyros",
          "Koulouri (sesame bread ring)",
          "Bougatsa",
          "Loukoumades"
        ],
        de: [
          "Pita Gyros",
          "Koulouri (Sesamkringel)",
          "Bougatsa",
          "Loukoumades"
        ]
      },
      diningAdvice: {
        tr: "Tavernalarda ekmek ve kuver ücreti hesaba eklenebilir. Bahşiş zorunlu değildir; memnun kaldıysanız hesabı yuvarlamak veya %5-10 bırakmak yaygındır. Yunanlar akşam yemeğini geç (21:00 sonrası) yer; adalarda deniz kenarındaki balık tavernalarında fiyatı kiloyla sorun.",
        en: "Tavernas may add a bread and cover charge. Tipping is not compulsory; rounding up or leaving 5-10% is common if you were happy. Greeks dine late (after 9 pm); at island fish tavernas ask for the price per kilo.",
        de: "Brot- und Gedeckpreis möglich. Trinkgeld freiwillig, 5-10 % üblich. Abendessen spät; in Fischtavernen nach dem Kilopreis fragen."
      }
    },
    packingAndPrecautions: {
      essentials: {
        tr: [
          "Geçerli Schengen vizesi ve seyahat sağlık sigortası",
          "Feribot için deniz tutması ilacı ve rüzgarlık",
          "Manastırlar için omuz ve dizleri örten giysi",
          "Kaygan mermer ve parke taşları için kaymaz tabanlı ayakkabı"
        ],
        en: [
          "Valid Schengen visa and travel health insurance",
          "Seasickness tablets and a windbreaker for ferries",
          "Clothing covering shoulders and knees for monasteries",
          "Non-slip shoes for slippery marble and cobblestones"
        ],
        de: [
          "Gültiges Schengen-Visum & Reisekrankenversicherung",
          "Reisetabletten & Windjacke für Fähren",
          "Kleidung für Klöster (Schultern & Knie bedeckt)",
          "Rutschfeste Schuhe für Marmor & Pflaster"
        ]
      },
      safetyAndEtiquette: {
        tr: [
          "AB Giriş/Çıkış Sistemi (EES) nedeniyle Schengen’e ilk girişte parmak izi ve fotoğraf alınır; sınır kapılarında ek bekleme süresi hesaba katın.",
          "Adalarda ATV ve scooter kiralarken kask takın; dar ve virajlı yollarda kaza oranı yüksektir.",
          "Yaz aylarında orman yangını riski nedeniyle doğada ateş yakmayın ve yetkililerin uyarılarını takip edin."
        ],
        en: [
          "Under the EU Entry/Exit System (EES), fingerprints and a photo are taken on your first Schengen entry; allow extra time at border control.",
          "Wear a helmet when renting ATVs or scooters on the islands; accident rates on narrow, winding roads are high.",
          "Because of summer wildfire risk, never light fires outdoors and follow official warnings."
        ],
        de: [
          "Wegen des EU-Einreise-/Ausreisesystems (EES) werden bei der ersten Einreise Fingerabdrücke und Foto erfasst; mehr Zeit einplanen.",
          "Beim Quad- oder Rollerverleih Helm tragen; hohe Unfallrate auf engen Straßen.",
          "Wegen Waldbrandgefahr im Sommer kein Feuer im Freien; Warnungen beachten."
        ]
      }
    }
  },
  BG: {
    routeName: {
      tr: "Balkan İncisi Bulgaristan: Sofya & Rila, Filibe, Tırnova & Karadeniz",
      en: "Bulgaria’s Balkan Gems: Sofia & Rila, Plovdiv, Veliko Tarnovo & the Black Sea",
      de: "Bulgariens Balkanperlen: Sofia & Rila, Plowdiw, Weliko Tarnowo & Schwarzes Meer"
    },
    routeSummary: {
      tr: "Başkent Sofya ve UNESCO listesindeki Rila Manastırı ile Yedi Rila Gölleri’nden başlayıp Roma tiyatrosuyla Filibe’ye (Plovdiv), Orta Çağ başkenti Veliko Tırnova’ya ve Karadeniz kıyısındaki tarihi Nesebar’a uzanan 9 günlük kara yolu rotası.",
      en: "A 9-day road trip starting in Sofia with UNESCO-listed Rila Monastery and the Seven Rila Lakes, continuing to Plovdiv with its Roman theatre, the medieval capital Veliko Tarnovo and historic Nesebar on the Black Sea.",
      de: "Eine 9-tägige Rundreise von Sofia mit Rila-Kloster und Sieben Rila-Seen über Plowdiw mit römischem Theater und die mittelalterliche Hauptstadt Weliko Tarnowo bis Nessebar am Schwarzen Meer."
    },
    totalDays: 9,
    idealDurationText: {
      tr: "9 Günlük Bulgaristan Turu",
      en: "9-Day Bulgaria Tour",
      de: "9-Tage-Bulgarienreise"
    },
    bestSeason: {
      tr: "Haziran - Eylül (Yedi Rila Gölleri telesiyeji ve Karadeniz sezonu); şehirler için Mayıs ve Ekim de idealdir",
      en: "June - September (Seven Rila Lakes chairlift and Black Sea season); May and October are also great for the cities",
      de: "Juni - September (Sessellift zu den Rila-Seen & Badesaison); Mai und Oktober für Städte"
    },
    transportMode: {
      tr: "Kiralık araç en pratik seçenektir (elektronik vinyet zorunlu) + şehirler arası otobüsler; Burgaz havalimanından dönüş",
      en: "A rental car is the most practical option (electronic vignette required) + intercity buses; fly home from Burgas",
      de: "Mietwagen am praktischsten (E-Vignette Pflicht) + Fernbusse; Rückflug ab Burgas"
    },
    paceLevel: {
      tr: "Dengeli & Tarih + Doğa",
      en: "Balanced & History + Nature",
      de: "Ausgewogen & Geschichte + Natur"
    },
    stops: [
      {
        name: {
          tr: "1. Durak: Sofya, Rila Manastırı & Yedi Rila Gölleri",
          en: "Stop 1: Sofia, Rila Monastery & Seven Rila Lakes",
          de: "Stopp 1: Sofia, Rila-Kloster & Sieben Rila-Seen"
        },
        recommendedDuration: {
          tr: "3 Gün (Sofya 1,5 gün + Rila Manastırı & Göller 1,5 gün)",
          en: "3 Days (Sofia 1.5 days + Rila Monastery & Lakes 1.5 days)",
          de: "3 Tage (Sofia 1,5 + Rila 1,5)"
        },
        durationBadge: {
          tr: "3 Gün",
          en: "3 Days",
          de: "3 Tage"
        },
        highlights: {
          tr: [
            "Aleksandr Nevski Katedrali",
            "Serdika antik kalıntıları, Aziz Georgi Rotundası & Banya Başı Camii",
            "Rila Manastırı (UNESCO)",
            "Yedi Rila Gölleri yürüyüşü"
          ],
          en: [
            "Alexander Nevsky Cathedral",
            "Ancient Serdica ruins, St. George Rotunda & Banya Bashi Mosque",
            "Rila Monastery (UNESCO)",
            "Seven Rila Lakes hike"
          ],
          de: [
            "Alexander-Newski-Kathedrale",
            "Serdika-Ruinen, Georgsrotunde & Banja-Baschi-Moschee",
            "Rila-Kloster (UNESCO)",
            "Wanderung zu den Sieben Rila-Seen"
          ]
        },
        activities: {
          tr: [
            "Aleksandr Nevski Katedrali’nden Vitoşa Bulvarı’na yürüyüp metro istasyonundaki Serdika kalıntılarını görün.",
            "Sofya’dan yaklaşık 2 saatlik yolculukla Rila Manastırı’na gidip renkli fresklerle kaplı avluyu ve Hrelyo Kulesi’ni gezin.",
            "Yazın Panichishte’den telesiyejle çıkıp buzul kökenli Yedi Rila Gölleri’ne yarım günlük yürüyüş yapın."
          ],
          en: [
            "Walk from Alexander Nevsky Cathedral to Vitosha Boulevard and see the Serdica ruins in the metro station.",
            "Drive about 2 hours from Sofia to Rila Monastery to see its fresco-covered courtyard and Hrelyo’s Tower.",
            "In summer take the chairlift up from Panichishte and hike for half a day to the glacial Seven Rila Lakes."
          ],
          de: [
            "Von der Newski-Kathedrale zum Witoscha-Boulevard und die Serdika-Ruinen in der Metrostation ansehen.",
            "Ca. 2 Std. zum Rila-Kloster mit Freskenhof und Hreljo-Turm.",
            "Im Sommer mit dem Sessellift ab Panitschischte hoch und zu den Gletscherseen wandern."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Banitsa (peynirli börek) & boza",
            "Şopska salatası",
            "Tarator (soğuk yoğurt çorbası)",
            "Rila alabalığı"
          ],
          en: [
            "Banitsa (cheese pastry) & boza",
            "Shopska salad",
            "Tarator (cold yoghurt soup)",
            "Rila mountain trout"
          ],
          de: [
            "Baniza (Käsegebäck) & Boza",
            "Schopska-Salat",
            "Tarator (kalte Joghurtsuppe)",
            "Rila-Forelle"
          ]
        },
        criticalTips: {
          tr: [
            "Yedi Rila Gölleri telesiyeji genellikle yalnızca yaz sezonunda (yaklaşık Haziran sonu - Eylül) çalışır; dağda hava hızla değişir, yağmurluk alın.",
            "Bulgaristan’da baş sallamak “hayır”, iki yana sallamak “evet” anlamına gelebilir; yanlış anlaşılmayı önlemek için sözlü teyit isteyin."
          ],
          en: [
            "The Seven Rila Lakes chairlift usually runs only in summer (roughly late June - September); mountain weather changes fast, so bring a rain jacket.",
            "In Bulgaria a nod can mean “no” and a head shake “yes”; ask for a verbal confirmation to avoid misunderstandings."
          ],
          de: [
            "Der Sessellift fährt meist nur im Sommer (ca. Ende Juni - September); Regenjacke mitnehmen.",
            "In Bulgarien kann Nicken „nein“ und Kopfschütteln „ja“ bedeuten."
          ]
        },
        mapsQuery: "Rila Monastery, Bulgaria"
      },
      {
        name: {
          tr: "2. Durak: Plovdiv / Filibe (Roma Tiyatrosu & Kapana)",
          en: "Stop 2: Plovdiv (Roman Theatre & Kapana)",
          de: "Stopp 2: Plowdiw (Römisches Theater & Kapana)"
        },
        recommendedDuration: {
          tr: "2 Gün (Eski Şehir + Kapana sanat mahallesi)",
          en: "2 Days (Old Town + Kapana creative district)",
          de: "2 Tage (Altstadt + Kreativviertel Kapana)"
        },
        durationBadge: {
          tr: "2 Gün",
          en: "2 Days",
          de: "2 Tage"
        },
        highlights: {
          tr: [
            "Antik Roma Tiyatrosu",
            "Roma Stadyumu & Cuma Camii",
            "Eski Şehir’deki Bulgar Uyanış dönemi konakları",
            "Kapana sanat mahallesi"
          ],
          en: [
            "Ancient Roman Theatre",
            "Roman Stadium & Dzhumaya Mosque",
            "Bulgarian Revival houses of the Old Town",
            "Kapana creative district"
          ],
          de: [
            "Antikes Römisches Theater",
            "Römisches Stadion & Dschumaja-Moschee",
            "Häuser der Wiedergeburtszeit in der Altstadt",
            "Kreativviertel Kapana"
          ]
        },
        activities: {
          tr: [
            "Hâlâ konserlere ev sahipliği yapan Roma Tiyatrosu’nu gezip Eski Şehir’in renkli konaklarına yürüyün.",
            "Osmanlı döneminin Avrupa’daki en eski camilerinden Cuma Camii’ni ve hemen önündeki Roma stadyumu kalıntısını görün.",
            "Akşam Kapana’nın sanat galerileri ve kafeleriyle dolu sokaklarında yemek yiyin."
          ],
          en: [
            "Tour the Roman Theatre, which still hosts concerts, then wander up to the colourful mansions of the Old Town.",
            "See Dzhumaya Mosque, one of the oldest Ottoman mosques in Europe, and the Roman stadium remains right in front of it.",
            "Have dinner in Kapana’s lanes, full of galleries and cafés."
          ],
          de: [
            "Das noch bespielte Römische Theater besichtigen und zu den bunten Häusern der Altstadt hinaufgehen.",
            "Die Dschumaja-Moschee, eine der ältesten osmanischen Moscheen Europas, und das Römische Stadion davor.",
            "Abendessen in den Gassen von Kapana mit Galerien und Cafés."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Kavarma (güveçte et)",
            "Lyutenitsa (biber-domates ezmesi)",
            "Mavrud kırmızı şarabı (Trakya Ovası)"
          ],
          en: [
            "Kavarma (clay-pot meat stew)",
            "Lyutenitsa (pepper and tomato relish)",
            "Mavrud red wine (Thracian Valley)"
          ],
          de: [
            "Kawarma (Fleisch im Tontopf)",
            "Ljuteniza (Paprika-Tomaten-Mus)",
            "Mavrud-Rotwein (Thrakien)"
          ]
        },
        criticalTips: {
          tr: [
            "Filibe’den Veliko Tırnova’ya giderken Şıpka Geçidi ve Kazanlık Gül Vadisi üzerinden geçebilirsiniz; Haziran başındaki Gül Festivali dönemi özellikle güzeldir.",
            "Eski Şehir’in arnavut kaldırımlı yokuşları diktir; topuklu yerine rahat ayakkabı giyin."
          ],
          en: [
            "On the way from Plovdiv to Veliko Tarnovo you can drive via the Shipka Pass and Kazanlak’s Rose Valley; early June, during the Rose Festival, is especially lovely.",
            "The Old Town’s cobbled lanes are steep; wear comfortable shoes rather than heels."
          ],
          de: [
            "Auf dem Weg nach Weliko Tarnowo über den Schipka-Pass und das Rosental von Kasanlak fahren; Anfang Juni ist Rosenfest.",
            "Die Altstadtgassen sind steil; bequeme Schuhe tragen."
          ]
        },
        mapsQuery: "Ancient Theatre of Philippopolis, Plovdiv, Bulgaria"
      },
      {
        name: {
          tr: "3. Durak: Veliko Tırnova (Çareviç Kalesi & Arbanasi)",
          en: "Stop 3: Veliko Tarnovo (Tsarevets Fortress & Arbanasi)",
          de: "Stopp 3: Weliko Tarnowo (Festung Zarewez & Arbanassi)"
        },
        recommendedDuration: {
          tr: "2 Gün (Kale + Samovodska Çarşısı + Arbanasi köyü)",
          en: "2 Days (Fortress + Samovodska Charshia + Arbanasi village)",
          de: "2 Tage (Festung + Samowodska Tscharschija + Arbanassi)"
        },
        durationBadge: {
          tr: "2 Gün",
          en: "2 Days",
          de: "2 Tage"
        },
        highlights: {
          tr: [
            "Çareviç (Tsarevets) Kalesi",
            "Samovodska Çarşısı zanaat sokağı",
            "Asenevtsi Anıtı & Yantra Nehri kıvrımı",
            "Arbanasi köyü ve kiliseleri"
          ],
          en: [
            "Tsarevets Fortress",
            "Samovodska Charshia craft street",
            "Asenevtsi Monument & Yantra River bend",
            "Arbanasi village and its churches"
          ],
          de: [
            "Festung Zarewez",
            "Handwerkerstraße Samowodska Tscharschija",
            "Assenewzi-Denkmal & Jantra-Schleife",
            "Dorf Arbanassi & Kirchen"
          ]
        },
        activities: {
          tr: [
            "İkinci Bulgar Krallığı’nın başkenti Çareviç Kalesi’nin surlarında yürüyüp tepedeki kiliseye çıkın.",
            "Belirli akşamlarda düzenlenen “Ses ve Işık” gösterisini kalenin karşısından izleyin (tarihleri önceden kontrol edin).",
            "Samovodska Çarşısı’nda bakırcı ve çömlekçi atölyelerini gezip yakındaki Arbanasi köyünün taş konaklarını görün."
          ],
          en: [
            "Walk the walls of Tsarevets, capital of the Second Bulgarian Empire, up to the hilltop church.",
            "Watch the “Sound and Light” show over the fortress on scheduled evenings (check dates in advance).",
            "Browse the coppersmith and pottery workshops of Samovodska Charshia, then see the stone mansions of nearby Arbanasi."
          ],
          de: [
            "Über die Mauern von Zarewez, Hauptstadt des Zweiten Bulgarischen Reiches, zur Kirche auf dem Gipfel.",
            "Die „Ton-und-Licht“-Show an bestimmten Abenden ansehen (Termine prüfen).",
            "Kupferschmiede und Töpfer in der Samowodska Tscharschija besuchen, dann die Steinhäuser von Arbanassi."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Kebapçe & Kyufte (ızgara köfte)",
            "Sarmi (lahana / asma yaprağı sarması)",
            "Kiselo mlyako (Bulgar yoğurdu) & bal"
          ],
          en: [
            "Kebapche & Kyufte (grilled minced meat)",
            "Sarmi (cabbage or vine-leaf rolls)",
            "Kiselo mlyako (Bulgarian yoghurt) & honey"
          ],
          de: [
            "Kebaptsche & Kjufte",
            "Sarmi (Kohl- oder Weinblattrouladen)",
            "Kisselo Mljako (bulgarischer Joghurt) & Honig"
          ]
        },
        criticalTips: {
          tr: [
            "Kebapçe, kyufte ve sucuklar çoğunlukla domuz-dana karışık kıymadan yapılır; menüde “svinsko” domuz eti demektir, emin değilseniz garsona sorun.",
            "Şehir dik yamaçlara kuruludur; araçla gelirseniz otelinizin park imkânını önceden sorun."
          ],
          en: [
            "Kebapche, kyufte and sausages are often made from mixed pork and beef; “svinsko” on a menu means pork, so ask the waiter if unsure.",
            "The town is built on steep slopes; if driving, check your hotel’s parking in advance."
          ],
          de: [
            "Kebaptsche und Kjufte sind oft aus Schwein und Rind; „swinsko“ bedeutet Schwein.",
            "Die Stadt liegt an steilen Hängen; Hotelparkplatz vorab klären."
          ]
        },
        mapsQuery: "Tsarevets Fortress, Veliko Tarnovo, Bulgaria"
      },
      {
        name: {
          tr: "4. Durak: Nesebar & Karadeniz Kıyısı (Sozopol)",
          en: "Stop 4: Nesebar & the Black Sea Coast (Sozopol)",
          de: "Stopp 4: Nessebar & Schwarzmeerküste (Sosopol)"
        },
        recommendedDuration: {
          tr: "2 Gün (UNESCO eski kenti + plaj)",
          en: "2 Days (UNESCO old town + beach)",
          de: "2 Tage (UNESCO-Altstadt + Strand)"
        },
        durationBadge: {
          tr: "2 Gün",
          en: "2 Days",
          de: "2 Tage"
        },
        highlights: {
          tr: [
            "Nesebar Eski Kenti (UNESCO)",
            "Pantokrator İsa & Aziz Stefan kiliseleri",
            "Sozopol eski şehri",
            "Karadeniz plajları"
          ],
          en: [
            "Nesebar Old Town (UNESCO)",
            "Churches of Christ Pantocrator & St. Stephen",
            "Sozopol old town",
            "Black Sea beaches"
          ],
          de: [
            "Altstadt von Nessebar (UNESCO)",
            "Kirchen Christus Pantokrator & St. Stephan",
            "Altstadt von Sosopol",
            "Schwarzmeerstrände"
          ]
        },
        activities: {
          tr: [
            "Yarımada üzerindeki Nesebar’da Bizans dönemi tuğla-taş kiliselerini ve ahşap balıkçı evlerini gezin.",
            "Daha sakin bir sahil için güneydeki Sozopol’e gidip eski şehrin kayalık burnunda gün batımını izleyin.",
            "Bir gün plajda dinlenip dönüş uçuşunuzu Burgaz Havalimanı’ndan planlayın."
          ],
          en: [
            "Explore Byzantine brick-and-stone churches and wooden fishermen’s houses on the Nesebar peninsula.",
            "For a quieter coast head south to Sozopol and watch the sunset from the rocky tip of its old town.",
            "Spend a day on the beach and plan your flight home from Burgas Airport."
          ],
          de: [
            "Byzantinische Kirchen und Holzhäuser auf der Halbinsel Nessebar erkunden.",
            "Für Ruhe nach Sosopol fahren und den Sonnenuntergang an der Altstadtspitze sehen.",
            "Einen Strandtag einlegen und vom Flughafen Burgas zurückfliegen."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Tsatsa (kızarmış çaça balığı)",
            "Karadeniz midyesi",
            "Izgara kalkan veya lüfer"
          ],
          en: [
            "Tsatsa (fried sprats)",
            "Black Sea mussels",
            "Grilled turbot or bluefish"
          ],
          de: [
            "Zaza (frittierte Sprotten)",
            "Schwarzmeermuscheln",
            "Gegrillter Steinbutt oder Blaufisch"
          ]
        },
        criticalTips: {
          tr: [
            "Temmuz - Ağustos’ta Nesebar ve Güneşli Plaj çok kalabalıktır; eski kenti sabah erken veya akşam gezin.",
            "Bulgaristan 1 Ocak 2026’dan itibaren avro kullanmaktadır; eski leva fiyat etiketleri ve çift fiyat gösterimleriyle karşılaşabilirsiniz."
          ],
          en: [
            "Nesebar and Sunny Beach are very crowded in July - August; visit the old town early in the morning or in the evening.",
            "Bulgaria has used the euro since 1 January 2026; you may still see old lev price tags and dual price displays."
          ],
          de: [
            "Im Juli - August sehr voll; Altstadt früh oder abends besuchen.",
            "Seit 1. Januar 2026 gilt der Euro; doppelte Preisauszeichnung möglich."
          ]
        },
        mapsQuery: "Nessebar Old Town, Nesebar, Bulgaria"
      }
    ],
    signatureGastronomy: {
      dishes: {
        tr: [
          "Banitsa",
          "Şopska salatası",
          "Kavarma",
          "Tarator"
        ],
        en: [
          "Banitsa",
          "Shopska salad",
          "Kavarma",
          "Tarator"
        ],
        de: [
          "Baniza",
          "Schopska-Salat",
          "Kawarma",
          "Tarator"
        ]
      },
      drinks: {
        tr: [
          "Rakia (meyve rakısı)",
          "Mavrud & Melnik şarapları",
          "Boza",
          "Ayran"
        ],
        en: [
          "Rakia (fruit brandy)",
          "Mavrud & Melnik wines",
          "Boza",
          "Ayran"
        ],
        de: [
          "Rakija (Obstbrand)",
          "Mavrud- & Melnik-Weine",
          "Boza",
          "Ayran"
        ]
      },
      streetFoods: {
        tr: [
          "Banitsa & boza kahvaltısı",
          "Mekitsa (pişi)",
          "Kızarmış mısır & kestane",
          "Gül reçeli & lokum (Kazanlık)"
        ],
        en: [
          "Banitsa & boza breakfast",
          "Mekitsa (fried dough)",
          "Roasted corn & chestnuts",
          "Rose jam & Turkish delight (Kazanlak)"
        ],
        de: [
          "Frühstück mit Baniza & Boza",
          "Mekiza (Schmalzgebäck)",
          "Gerösteter Mais & Maronen",
          "Rosenkonfitüre & Lokum"
        ]
      },
      diningAdvice: {
        tr: "Restoranlarda %10 civarında bahşiş yaygındır. “Mehana” denilen geleneksel lokantalar yöresel yemek için en iyi adreslerdir. Domuz eti yaygın olduğu için menüde “svinsko” (domuz) ve “teleshko” (dana) kelimelerine dikkat edin.",
        en: "A tip of around 10% is customary in restaurants. Traditional “mehana” taverns are the best places for local food. Pork is common, so look out for “svinsko” (pork) and “teleshko” (veal) on menus.",
        de: "Etwa 10 % Trinkgeld sind üblich. Traditionelle „Mehanas“ für lokale Küche. „Swinsko“ = Schwein, „Teleschko“ = Kalb."
      }
    },
    packingAndPrecautions: {
      essentials: {
        tr: [
          "Geçerli Schengen vizesi (Bulgaristan 2025’ten beri tam Schengen üyesidir)",
          "Kiralık araç için elektronik vinyet (bgtoll) ve uluslararası sürücü belgesi",
          "Dağ için yürüyüş ayakkabısı ve yağmurluk",
          "Kiril alfabesi için çevrimdışı harita / çeviri uygulaması"
        ],
        en: [
          "Valid Schengen visa (Bulgaria has been a full Schengen member since 2025)",
          "Electronic vignette (bgtoll) for rental cars and an international driving permit",
          "Hiking shoes and a rain jacket for the mountains",
          "Offline map and translation app for Cyrillic signs"
        ],
        de: [
          "Gültiges Schengen-Visum (Bulgarien ist seit 2025 voll im Schengen-Raum)",
          "E-Vignette (bgtoll) & internationaler Führerschein",
          "Wanderschuhe & Regenjacke",
          "Offline-Karte & Übersetzungs-App für Kyrillisch"
        ]
      },
      safetyAndEtiquette: {
        tr: [
          "Kapıkule - Kapitan Andreevo sınırında yaz ve bayram dönemlerinde uzun kuyruklar oluşabilir; geçişi sabah erken saatlere planlayın.",
          "Döviz bürolarında komisyon ve kuru önceden sorun; mümkünse banka kartı veya ATM kullanın.",
          "Karadeniz’de rüzgarlı günlerde dalga ve akıntı güçlü olabilir; cankurtaranlı plajlarda ve bayrak uyarılarına uyarak yüzün."
        ],
        en: [
          "Long queues can build at the Kapıkule - Kapitan Andreevo border in summer and during holidays; plan to cross early in the morning.",
          "Ask about commission and rate before using exchange offices; use a bank card or ATM where possible.",
          "On windy days the Black Sea can have strong waves and currents; swim at lifeguarded beaches and follow the flag warnings."
        ],
        de: [
          "Am Grenzübergang Kapıkule - Kapitan Andreewo lange Wartezeiten im Sommer; früh fahren.",
          "In Wechselstuben Kurs und Gebühr vorher erfragen; besser Karte oder Geldautomat.",
          "Bei Wind starke Strömungen; nur an bewachten Stränden baden."
        ]
      }
    }
  },
  AE: {
    routeName: {
      tr: "Çöl & Gökdelenler: Dubai, Abu Dabi & Hatta / Ras El Hayme",
      en: "Desert & Skyscrapers: Dubai, Abu Dhabi & Hatta / Ras Al Khaimah",
      de: "Wüste & Wolkenkratzer: Dubai, Abu Dhabi & Hatta / Ras al-Chaima"
    },
    routeSummary: {
      tr: "Burj Khalifa ve Dubai Çarşıları’ndan çöl safarisine, Abu Dabi’deki Şeyh Zayed Camii ve Louvre Abu Dabi’den Hacer Dağları’ndaki Hatta’ya veya Ras El Hayme’deki Jebel Jais’e uzanan 7 günlük Emirlikler rotası.",
      en: "A 7-day Emirates route from the Burj Khalifa and Dubai’s old souks to a desert safari, on to Sheikh Zayed Grand Mosque and the Louvre Abu Dhabi, and finally into the Hajar Mountains at Hatta or Jebel Jais in Ras Al Khaimah.",
      de: "Eine 7-tägige Emirate-Route vom Burj Khalifa und den Souks über eine Wüstensafari zur Scheich-Zayid-Moschee und zum Louvre Abu Dhabi bis in die Hadschar-Berge bei Hatta oder zum Jebel Jais."
    },
    totalDays: 7,
    idealDurationText: {
      tr: "7 Günlük Emirlikler Rotası",
      en: "7-Day Emirates Route",
      de: "7-Tage-Emirate-Route"
    },
    bestSeason: {
      tr: "Kasım - Mart (Haziran - Eylül arası sıcaklık sıklıkla 40-45°C’ye ulaşır)",
      en: "November - March (from June to September temperatures often reach 40-45°C)",
      de: "November - März (Juni - September oft 40-45 °C)"
    },
    transportMode: {
      tr: "Dubai Metrosu (Nol kart) + taksi / Careem / Uber + Dubai - Abu Dabi şehirlerarası otobüs veya kiralık araç (yaklaşık 1,5 saat)",
      en: "Dubai Metro (Nol card) + taxis / Careem / Uber + Dubai - Abu Dhabi intercity bus or rental car (about 1.5 hours)",
      de: "Dubai Metro (Nol-Karte) + Taxi / Careem / Uber + Bus oder Mietwagen nach Abu Dhabi (ca. 1,5 Std.)"
    },
    paceLevel: {
      tr: "Rahat & Lüks + Macera",
      en: "Relaxed & Luxury + Adventure",
      de: "Entspannt & Luxus + Abenteuer"
    },
    stops: [
      {
        name: {
          tr: "1. Durak: Dubai (Downtown, Eski Dubai & Çöl)",
          en: "Stop 1: Dubai (Downtown, Old Dubai & the Desert)",
          de: "Stopp 1: Dubai (Downtown, Alt-Dubai & Wüste)"
        },
        recommendedDuration: {
          tr: "4 Gün (Downtown 1 gün, Eski Dubai 1 gün, çöl safarisi yarım gün, Palm & Marina 1 gün)",
          en: "4 Days (Downtown 1 day, Old Dubai 1 day, desert safari half day, Palm & Marina 1 day)",
          de: "4 Tage (Downtown, Alt-Dubai, Wüstensafari, Palm & Marina)"
        },
        durationBadge: {
          tr: "4 Gün",
          en: "4 Days",
          de: "4 Tage"
        },
        highlights: {
          tr: [
            "Burj Khalifa, Dubai Mall & Dubai Çeşmesi",
            "Al Fahidi tarihi mahallesi & abra ile Dubai Creek geçişi",
            "Deira Altın ve Baharat Çarşıları",
            "Palm Jumeirah, Dubai Marina & çöl safarisi"
          ],
          en: [
            "Burj Khalifa, Dubai Mall & Dubai Fountain",
            "Al Fahidi historic district & abra ride across Dubai Creek",
            "Deira Gold & Spice Souks",
            "Palm Jumeirah, Dubai Marina & desert safari"
          ],
          de: [
            "Burj Khalifa, Dubai Mall & Dubai Fountain",
            "Altstadtviertel Al Fahidi & Abra-Fahrt über den Creek",
            "Gold- & Gewürzsouk in Deira",
            "Palm Jumeirah, Dubai Marina & Wüstensafari"
          ]
        },
        activities: {
          tr: [
            "Burj Khalifa’nın seyir katlarına gün batımına denk gelen saatte çıkın, ardından Dubai Çeşmesi’nin akşam gösterisini izleyin.",
            "Al Fahidi’nin rüzgar kuleli evlerini gezip geleneksel abra teknesiyle Dubai Creek’i geçin ve Deira’daki Altın ve Baharat çarşılarında dolaşın.",
            "Öğleden sonra kum tepelerinde 4x4 safari, deve ve gün batımı ile çöl kampında akşam yemeğine katılın; başka bir gün Palm Jumeirah ve Marina’da tekne turu yapın."
          ],
          en: [
            "Go up to the Burj Khalifa observation decks at sunset, then watch the evening Dubai Fountain show.",
            "Explore Al Fahidi’s wind-tower houses, cross Dubai Creek by traditional abra and wander the Gold and Spice souks of Deira.",
            "Join an afternoon 4x4 dune safari with camels, sunset and dinner at a desert camp; on another day take a boat around Palm Jumeirah and the Marina."
          ],
          de: [
            "Bei Sonnenuntergang auf die Aussichtsplattform des Burj Khalifa und danach die Fontänenshow.",
            "Windturmhäuser in Al Fahidi, mit der Abra über den Creek und durch die Souks von Deira.",
            "Nachmittags Jeep-Safari mit Kamelen und Abendessen im Wüstencamp; an einem anderen Tag Bootstour um Palm & Marina."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Machboos (baharatlı etli pilav)",
            "Luqaimat (hurma şuruplu lokma)",
            "Karak çay & Arap kahvesi (gahwa) ile hurma"
          ],
          en: [
            "Machboos (spiced rice with meat)",
            "Luqaimat (date-syrup dumplings)",
            "Karak chai & Arabic coffee (gahwa) with dates"
          ],
          de: [
            "Machbus (Gewürzreis mit Fleisch)",
            "Luqaimat (Teigbällchen mit Dattelsirup)",
            "Karak Chai & arabischer Kaffee mit Datteln"
          ]
        },
        criticalTips: {
          tr: [
            "Burj Khalifa ve çöl safarisi biletlerini önceden alın; gün batımı saatleri en hızlı dolan dilimlerdir.",
            "Metroda kadınlara ve çocuklara ayrılmış vagon ile Gold Class vagonu bulunur; işaretlere dikkat edin, metroda yeme-içme yasaktır."
          ],
          en: [
            "Book Burj Khalifa and desert safari tickets in advance; sunset slots sell out first.",
            "The metro has carriages reserved for women and children plus a Gold Class carriage; watch the signs, and eating or drinking on the metro is forbidden."
          ],
          de: [
            "Burj-Khalifa- und Safari-Tickets vorab buchen; Sonnenuntergangszeiten sind schnell weg.",
            "In der Metro gibt es Frauen- und Gold-Class-Wagen; Essen und Trinken verboten."
          ]
        },
        mapsQuery: "Burj Khalifa, Dubai, United Arab Emirates"
      },
      {
        name: {
          tr: "2. Durak: Abu Dabi (Şeyh Zayed Camii & Louvre Abu Dabi)",
          en: "Stop 2: Abu Dhabi (Sheikh Zayed Grand Mosque & Louvre Abu Dhabi)",
          de: "Stopp 2: Abu Dhabi (Scheich-Zayid-Moschee & Louvre Abu Dhabi)"
        },
        recommendedDuration: {
          tr: "2 Gün (Cami + Saadiyat Adası müzeleri + Qasr Al Watan)",
          en: "2 Days (Mosque + Saadiyat Island museums + Qasr Al Watan)",
          de: "2 Tage (Moschee + Museen auf Saadiyat + Qasr Al Watan)"
        },
        durationBadge: {
          tr: "2 Gün",
          en: "2 Days",
          de: "2 Tage"
        },
        highlights: {
          tr: [
            "Şeyh Zayed Ulu Camii",
            "Louvre Abu Dabi (Saadiyat Adası)",
            "Qasr Al Watan Cumhurbaşkanlığı Sarayı",
            "Corniche sahili & Yas Adası"
          ],
          en: [
            "Sheikh Zayed Grand Mosque",
            "Louvre Abu Dhabi (Saadiyat Island)",
            "Qasr Al Watan Presidential Palace",
            "Corniche waterfront & Yas Island"
          ],
          de: [
            "Scheich-Zayid-Moschee",
            "Louvre Abu Dhabi (Insel Saadiyat)",
            "Präsidentenpalast Qasr Al Watan",
            "Corniche & Yas Island"
          ]
        },
        activities: {
          tr: [
            "Şeyh Zayed Camii’ni beyaz mermerinin en güzel göründüğü akşamüstü saatlerinde ziyaret edin; giriş ücretsizdir ancak online ön kayıt gerekebilir.",
            "Louvre Abu Dabi’de kubbeden süzülen “ışık yağmuru” altında dünya sanatının kronolojik yolculuğuna çıkın.",
            "Qasr Al Watan sarayını gezip akşam Corniche boyunca yürüyün; hız tutkunları Yas Adası’ndaki Ferrari World’e gidebilir."
          ],
          en: [
            "Visit Sheikh Zayed Grand Mosque in the late afternoon when the white marble glows; entry is free but online pre-registration may be required.",
            "At the Louvre Abu Dhabi take a chronological journey through world art beneath the dome’s “rain of light”.",
            "Tour Qasr Al Watan palace and stroll the Corniche in the evening; speed lovers can head to Ferrari World on Yas Island."
          ],
          de: [
            "Die Moschee am späten Nachmittag besuchen; Eintritt frei, Online-Registrierung ggf. nötig.",
            "Im Louvre Abu Dhabi unter dem „Lichtregen“ der Kuppel durch die Weltkunst.",
            "Qasr Al Watan besichtigen, abends die Corniche; Ferrari World auf Yas Island für Temposüchtige."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Harees (buğday ve et lapası)",
            "Izgara hamour balığı",
            "Deve sütü ve deve sütlü çikolata"
          ],
          en: [
            "Harees (slow-cooked wheat and meat)",
            "Grilled hammour (grouper)",
            "Camel milk & camel-milk chocolate"
          ],
          de: [
            "Harees (Weizen-Fleisch-Brei)",
            "Gegrillter Hamour (Zackenbarsch)",
            "Kamelmilch & Kamelmilchschokolade"
          ]
        },
        criticalTips: {
          tr: [
            "Camide kadınların bileğe kadar kollu, ayak bileğine kadar uzun ve bol kıyafet giyip saçlarını örtmesi, erkeklerin uzun pantolon giymesi gerekir; uygun olmayan kıyafetle girişe izin verilmez.",
            "Louvre Abu Dabi ve Qasr Al Watan için biletleri online alın; müzeler haftanın bazı günleri kapalı olabilir."
          ],
          en: [
            "At the mosque women must wear loose, ankle-length clothing with long sleeves and cover their hair, and men need long trousers; entry is refused if dress is inappropriate.",
            "Buy tickets for the Louvre Abu Dhabi and Qasr Al Watan online; museums may close on certain weekdays."
          ],
          de: [
            "Frauen: weite, knöchellange Kleidung, lange Ärmel, Kopftuch; Männer lange Hosen.",
            "Tickets online kaufen; Museen haben teils Ruhetage."
          ]
        },
        mapsQuery: "Sheikh Zayed Grand Mosque, Abu Dhabi, United Arab Emirates"
      },
      {
        name: {
          tr: "3. Durak: Hatta veya Ras El Hayme (Hacer Dağları) — İsteğe Bağlı",
          en: "Stop 3: Hatta or Ras Al Khaimah (Hajar Mountains) — Optional",
          de: "Stopp 3: Hatta oder Ras al-Chaima (Hadschar-Berge) — optional"
        },
        recommendedDuration: {
          tr: "1 Gün (Dubai’den günübirlik)",
          en: "1 Day (Day trip from Dubai)",
          de: "1 Tag (Tagesausflug ab Dubai)"
        },
        durationBadge: {
          tr: "1 Gün",
          en: "1 Day",
          de: "1 Tag"
        },
        highlights: {
          tr: [
            "Hatta Barajı kano ve kayak turu",
            "Hatta Miras Köyü",
            "Jebel Jais: BAE’nin en yüksek dağı",
            "Jais Flight zipline"
          ],
          en: [
            "Kayaking on Hatta Dam",
            "Hatta Heritage Village",
            "Jebel Jais: the UAE’s highest mountain",
            "Jais Flight zipline"
          ],
          de: [
            "Kajakfahren am Hatta-Staudamm",
            "Hatta Heritage Village",
            "Jebel Jais: höchster Berg der VAE",
            "Seilrutsche Jais Flight"
          ]
        },
        activities: {
          tr: [
            "Hatta’da turkuaz renkli baraj gölünde kano veya kayak yapıp Miras Köyü’ndeki eski kale ve kerpiç evleri gezin.",
            "Alternatif olarak Ras El Hayme’de Jebel Jais’in kıvrımlı dağ yolundan çıkıp seyir terasında serin havanın tadını çıkarın.",
            "Cesaretiniz varsa dünyanın en uzun ziplinelarından Jais Flight’ı deneyin (önceden rezervasyon şart)."
          ],
          en: [
            "In Hatta paddle a kayak on the turquoise dam lake and explore the fort and mud-brick houses of the Heritage Village.",
            "Alternatively drive the winding mountain road up Jebel Jais in Ras Al Khaimah and enjoy the cooler air at the viewing decks.",
            "If you dare, try Jais Flight, one of the world’s longest ziplines (advance booking essential)."
          ],
          de: [
            "In Hatta Kajak auf dem türkisfarbenen Stausee und das Heritage Village besuchen.",
            "Alternativ die Serpentinenstraße auf den Jebel Jais fahren und die kühlere Luft genießen.",
            "Mutige probieren Jais Flight, eine der längsten Seilrutschen der Welt (Reservierung nötig)."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Hatta’nın bal ve hurma ürünleri",
            "Manakish (zahterli / peynirli pide)",
            "Taze limon-nane suyu"
          ],
          en: [
            "Hatta honey and date products",
            "Manakish (za’atar or cheese flatbread)",
            "Fresh lemon-mint juice"
          ],
          de: [
            "Honig & Dattelprodukte aus Hatta",
            "Manakisch (Fladenbrot mit Zatar oder Käse)",
            "Frischer Zitronen-Minz-Saft"
          ]
        },
        criticalTips: {
          tr: [
            "Dağ yolları dik ve virajlıdır; yaz aylarında bile çok erken çıkın ve araçta bol su bulundurun.",
            "Jais Flight ve bazı dağ aktivitelerinde yaş, kilo ve boy sınırları vardır; rezervasyon sırasında kontrol edin."
          ],
          en: [
            "Mountain roads are steep and winding; set off early, even in summer, and carry plenty of water in the car.",
            "Jais Flight and some mountain activities have age, weight and height limits; check them when booking."
          ],
          de: [
            "Bergstraßen steil und kurvig; früh losfahren und viel Wasser mitnehmen.",
            "Für Jais Flight gelten Alters-, Gewichts- und Größengrenzen."
          ]
        },
        mapsQuery: "Hatta Dam, Hatta, Dubai, United Arab Emirates"
      }
    ],
    signatureGastronomy: {
      dishes: {
        tr: [
          "Machboos",
          "Harees",
          "Shawarma & Manakish",
          "Luqaimat"
        ],
        en: [
          "Machboos",
          "Harees",
          "Shawarma & Manakish",
          "Luqaimat"
        ],
        de: [
          "Machbus",
          "Harees",
          "Schawarma & Manakisch",
          "Luqaimat"
        ]
      },
      drinks: {
        tr: [
          "Karak çay",
          "Arap kahvesi (gahwa)",
          "Deve sütü",
          "Taze limon-nane"
        ],
        en: [
          "Karak chai",
          "Arabic coffee (gahwa)",
          "Camel milk",
          "Fresh lemon-mint"
        ],
        de: [
          "Karak Chai",
          "Arabischer Kaffee (Gahwa)",
          "Kamelmilch",
          "Zitrone-Minze"
        ]
      },
      streetFoods: {
        tr: [
          "Shawarma dürüm",
          "Falafel",
          "Chips Oman sandviçi",
          "Kunafa (künefe)"
        ],
        en: [
          "Shawarma wrap",
          "Falafel",
          "Chips Oman sandwich",
          "Kunafa"
        ],
        de: [
          "Schawarma-Wrap",
          "Falafel",
          "Chips-Oman-Sandwich",
          "Kunafa"
        ]
      },
      diningAdvice: {
        tr: "Alkol yalnızca lisanslı otel, restoran ve barlarda servis edilir; kamusal alanda alkollü olmak ciddi yaptırımlara yol açabilir. Ramazan’da gündüz kamusal alanda yemek konusunda kurallar esnetilmiş olsa da saygılı davranın. Hesaba servis ücreti eklenmemişse %10 civarında bahşiş yaygındır.",
        en: "Alcohol is served only in licensed hotels, restaurants and bars; being drunk in public can lead to serious penalties. Rules on eating in public during Ramadan daytime have been relaxed, but be respectful. If no service charge is added, a tip of around 10% is common.",
        de: "Alkohol nur in lizenzierten Lokalen; Trunkenheit in der Öffentlichkeit wird bestraft. Im Ramadan respektvoll verhalten. Ohne Servicegebühr ca. 10 % Trinkgeld."
      }
    },
    packingAndPrecautions: {
      essentials: {
        tr: [
          "Türk vatandaşları için seyahat öncesi alınmış e-Vize",
          "Cami ve çarşılar için omuz ve dizleri örten giysi, kadınlar için şal",
          "Klimalı mekânlar için ince bir hırka",
          "G tipi (İngiliz) priz adaptörü"
        ],
        en: [
          "An e-Visa obtained before travel (required for Turkish citizens)",
          "Clothing covering shoulders and knees for mosques and souks, plus a scarf for women",
          "A light cardigan for heavily air-conditioned interiors",
          "Type G (UK-style) plug adapter"
        ],
        de: [
          "Vorab beantragtes E-Visum (für türkische Staatsbürger)",
          "Schultern & Knie bedeckende Kleidung, Schal für Frauen",
          "Leichte Strickjacke für klimatisierte Räume",
          "Adapter Typ G (britisch)"
        ]
      },
      safetyAndEtiquette: {
        tr: [
          "İnsanları, özellikle kadınları izinsiz fotoğraflamayın; izinsiz dron uçurmak ve kamu binalarını çekmek yasaktır.",
          "Kamusal alanda öpüşme gibi aşırı sevgi gösterileri, küfür ve kaba el hareketleri cezai yaptırıma yol açabilir.",
          "Reçeteli ilaçlarınızın bazıları BAE’de kontrollü madde sayılabilir; reçetesini yanınızda taşıyın ve önceden kontrol edin."
        ],
        en: [
          "Don’t photograph people, especially women, without permission; flying drones without a permit and filming government buildings are prohibited.",
          "Public displays of affection such as kissing, swearing and rude gestures can lead to criminal penalties.",
          "Some prescription medicines are controlled substances in the UAE; carry the prescription and check in advance."
        ],
        de: [
          "Keine Fotos von Personen ohne Erlaubnis; Drohnen ohne Genehmigung verboten.",
          "Küssen in der Öffentlichkeit, Fluchen und obszöne Gesten können strafbar sein.",
          "Manche Medikamente sind in den VAE kontrolliert; Rezept mitführen und vorab prüfen."
        ]
      }
    }
  },
  BA: {
    routeName: {
      tr: "Bosna-Hersek Mirası: Saraybosna, Neretva Vadisi, Mostar & Hersek",
      en: "Heritage of Bosnia & Herzegovina: Sarajevo, the Neretva Valley, Mostar & Herzegovina",
      de: "Erbe Bosnien-Herzegowinas: Sarajevo, Neretvatal, Mostar & Herzegowina"
    },
    routeSummary: {
      tr: "Osmanlı çarşısı Başçarşı ve yakın tarihin izleriyle Saraybosna’dan, Konjic ve Jablanica üzerinden Neretva Vadisi’nin manzaralı yoluyla Mostar Köprüsü’ne, ardından Blagaj Tekkesi, Počitelj ve Kravica Şelaleleri’ne uzanan 7 günlük rota.",
      en: "A 7-day route from Sarajevo, with its Ottoman Baščaršija and traces of recent history, through the scenic Neretva Valley via Konjic and Jablanica to Mostar’s Old Bridge, then on to Blagaj Tekke, Počitelj and Kravica Waterfalls.",
      de: "Eine 7-tägige Route von Sarajevo mit Baščaršija durch das Neretvatal über Konjic und Jablanica zur Alten Brücke von Mostar und weiter nach Blagaj, Počitelj und zu den Kravica-Wasserfällen."
    },
    totalDays: 7,
    idealDurationText: {
      tr: "7 Günlük Bosna-Hersek Rotası",
      en: "7-Day Bosnia & Herzegovina Route",
      de: "7-Tage-Route Bosnien-Herzegowina"
    },
    bestSeason: {
      tr: "Mayıs - Haziran & Eylül - Ekim (Mostar Temmuz - Ağustos’ta 35°C’yi aşabilir; Kravica’da yüzmek için Haziran - Eylül)",
      en: "May - June & September - October (Mostar can exceed 35°C in July - August; June - September for swimming at Kravica)",
      de: "Mai - Juni & September - Oktober (Mostar im Hochsommer über 35 °C)"
    },
    transportMode: {
      tr: "Saraybosna - Mostar manzaralı treni (yaklaşık 2 saat) veya otobüs + Hersek bölgesi için kiralık araç veya günübirlik tur",
      en: "Scenic Sarajevo - Mostar train (about 2 hours) or bus + rental car or day tour for Herzegovina",
      de: "Panoramazug Sarajevo - Mostar (ca. 2 Std.) oder Bus + Mietwagen oder Tagestour für die Herzegowina"
    },
    paceLevel: {
      tr: "Rahat & Tarih + Kültür",
      en: "Relaxed & History + Culture",
      de: "Entspannt & Geschichte + Kultur"
    },
    stops: [
      {
        name: {
          tr: "1. Durak: Saraybosna (Başçarşı & Yakın Tarih)",
          en: "Stop 1: Sarajevo (Baščaršija & Recent History)",
          de: "Stopp 1: Sarajevo (Baščaršija & jüngere Geschichte)"
        },
        recommendedDuration: {
          tr: "3 Gün (Eski şehir, savaş tarihi ve Trebević / Vrelo Bosne)",
          en: "3 Days (Old town, war history and Trebević / Vrelo Bosne)",
          de: "3 Tage (Altstadt, Kriegsgeschichte & Trebević / Vrelo Bosne)"
        },
        durationBadge: {
          tr: "3 Gün",
          en: "3 Days",
          de: "3 Tage"
        },
        highlights: {
          tr: [
            "Başçarşı, Sebil Çeşmesi & Gazi Hüsrev Bey Camii",
            "Latin Köprüsü (1914 suikastının yaşandığı yer)",
            "Umut Tüneli (Tunel Spasa) Müzesi",
            "Sarı Tabya (Žuta Tabija) gün batımı & Trebević teleferiği"
          ],
          en: [
            "Baščaršija, Sebilj Fountain & Gazi Husrev-beg Mosque",
            "Latin Bridge (site of the 1914 assassination)",
            "Tunnel of Hope (Tunel Spasa) Museum",
            "Yellow Bastion (Žuta Tabija) sunset & Trebević cable car"
          ],
          de: [
            "Baščaršija, Sebilj-Brunnen & Gazi-Husrev-Beg-Moschee",
            "Lateinerbrücke (Ort des Attentats 1914)",
            "Tunnelmuseum (Tunel Spasa)",
            "Gelbe Bastion (Žuta Tabija) & Trebević-Seilbahn"
          ]
        },
        activities: {
          tr: [
            "Başçarşı’nın bakırcılar sokağında (Kazandžiluk) dolaşıp Gazi Hüsrev Bey Camii ve medresesini ziyaret edin.",
            "Kuşatma döneminin yaşam hattı Umut Tüneli’ni ve Galeri 11/07/95’i (Srebrenitsa anma galerisi) ziyaret ederek şehrin yakın tarihini anlayın.",
            "Trebević teleferiğiyle 1984 Olimpiyatları’nın grafitili kızak pistine çıkın, akşam Sarı Tabya’da şehrin üzerine yayılan ezan sesleriyle gün batımını izleyin."
          ],
          en: [
            "Wander Baščaršija’s coppersmiths’ street (Kazandžiluk) and visit the Gazi Husrev-beg Mosque and madrasa.",
            "Understand the city’s recent past by visiting the Tunnel of Hope, the siege-era lifeline, and Galerija 11/07/95 (Srebrenica memorial gallery).",
            "Ride the Trebević cable car to the graffiti-covered 1984 Olympic bobsled track, then watch the sunset at the Yellow Bastion as the call to prayer drifts over the city."
          ],
          de: [
            "Durch die Kupferschmiedgasse (Kazandžiluk) und zur Gazi-Husrev-Beg-Moschee.",
            "Tunnel der Hoffnung und Galerija 11/07/95 (Srebrenica-Gedenkgalerie) besuchen.",
            "Mit der Seilbahn zur olympischen Bobbahn von 1984, abends Sonnenuntergang an der Gelben Bastion."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Saraybosna ćevapi (somun ekmeğinde soğanlı köfte)",
            "Burek & pita çeşitleri (zeljanica, krompiruša)",
            "Begova čorba (Bey çorbası) & sogan dolma",
            "Bosna kahvesi & tufahija (cevizli elma tatlısı)"
          ],
          en: [
            "Sarajevo ćevapi (grilled kebabs in somun bread with onion)",
            "Burek & other pitas (zeljanica, krompiruša)",
            "Begova čorba (Bey’s soup) & sogan dolma",
            "Bosnian coffee & tufahija (walnut-stuffed poached apple)"
          ],
          de: [
            "Sarajevoer Ćevapi im Somun-Brot",
            "Burek & Pita (Zeljanica, Krompiruša)",
            "Begova Čorba & Sogan-Dolma",
            "Bosnischer Kaffee & Tufahija"
          ]
        },
        criticalTips: {
          tr: [
            "Türk vatandaşları Bosna-Hersek’e 180 gün içinde 90 güne kadar vizesiz girebilir; para birimi avroya sabitlenmiş Konvertibl Mark’tır (KM / BAM).",
            "Şehir dışında doğa yürüyüşlerinde işaretli patikalardan ayrılmayın; bazı kırsal alanlarda hâlâ savaştan kalma mayın riski vardır."
          ],
          en: [
            "Turkish citizens can enter Bosnia and Herzegovina visa-free for up to 90 days within 180; the currency is the euro-pegged convertible mark (KM / BAM).",
            "On hikes outside the city stay on marked trails; some rural areas still carry a risk of wartime landmines."
          ],
          de: [
            "Visumfrei bis 90 Tage in 180; Währung: Konvertible Mark (KM / BAM), an den Euro gekoppelt.",
            "Außerhalb der Stadt markierte Wege nicht verlassen — Minengefahr."
          ]
        },
        mapsQuery: "Baščaršija, Sarajevo, Bosnia and Herzegovina"
      },
      {
        name: {
          tr: "2. Durak: Konjic, Jablanica & Mostar (Neretva Vadisi & Eski Köprü)",
          en: "Stop 2: Konjic, Jablanica & Mostar (Neretva Valley & Old Bridge)",
          de: "Stopp 2: Konjic, Jablanica & Mostar (Neretvatal & Alte Brücke)"
        },
        recommendedDuration: {
          tr: "2 Gün (Yol üstü duraklar + Mostar eski şehri)",
          en: "2 Days (Stops en route + Mostar old town)",
          de: "2 Tage (Stopps unterwegs + Altstadt Mostar)"
        },
        durationBadge: {
          tr: "2 Gün",
          en: "2 Days",
          de: "2 Tage"
        },
        highlights: {
          tr: [
            "Konjic Taş Köprüsü & Neretva manzarası",
            "Jablanica: Neretva Muharebesi yıkık köprüsü",
            "Mostar Köprüsü (Stari Most) & köprüden atlayan dalgıçlar",
            "Kujundžiluk çarşısı & Koski Mehmed Paşa Camii minaresi"
          ],
          en: [
            "Konjic Stone Bridge & Neretva views",
            "Jablanica: the destroyed bridge of the Battle of the Neretva",
            "Mostar Old Bridge (Stari Most) & bridge divers",
            "Kujundžiluk bazaar & Koski Mehmed Pasha Mosque minaret"
          ],
          de: [
            "Steinbrücke von Konjic & Neretva",
            "Jablanica: zerstörte Brücke der Neretva-Schlacht",
            "Alte Brücke von Mostar & Brückenspringer",
            "Basar Kujundžiluk & Minarett der Koski-Mehmed-Pascha-Moschee"
          ]
        },
        activities: {
          tr: [
            "Saraybosna - Mostar trenine binip Neretva kanyonu ve Jablanica Gölü manzarasının tadını çıkarın veya araçla Konjic’te kahve, Jablanica’da kuzu çevirme molası verin.",
            "1566’da Mimar Hayreddin tarafından inşa edilen, 1993’te yıkılıp 2004’te yeniden yapılan Mostar Köprüsü’nü sabah erken saatte kalabalıksız görün.",
            "Koski Mehmed Paşa Camii’nin minaresine çıkıp köprünün en ünlü fotoğraf açısını yakalayın, ardından Kriva Ćuprija’ya (Eğri Köprü) yürüyün."
          ],
          en: [
            "Take the Sarajevo - Mostar train for views of the Neretva canyon and Jablanica Lake, or drive and stop for coffee in Konjic and spit-roast lamb in Jablanica.",
            "See Mostar’s Old Bridge, built in 1566 by Mimar Hayruddin, destroyed in 1993 and rebuilt in 2004, early in the morning before the crowds.",
            "Climb the minaret of Koski Mehmed Pasha Mosque for the most famous view of the bridge, then walk to Kriva Ćuprija (the Crooked Bridge)."
          ],
          de: [
            "Mit dem Zug durch den Neretva-Canyon oder mit dem Auto mit Stopps in Konjic und Jablanica (Lammbraten).",
            "Die 1566 erbaute, 1993 zerstörte und 2004 wiederaufgebaute Brücke früh morgens ohne Andrang sehen.",
            "Minarett der Koski-Mehmed-Pascha-Moschee besteigen und zur Kriva Ćuprija gehen."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Jablanica usulü kuzu çevirme",
            "Neretva alabalığı",
            "Hersek dolması (japrak) & klepe"
          ],
          en: [
            "Jablanica spit-roast lamb",
            "Neretva trout",
            "Herzegovinian japrak (stuffed leaves) & klepe dumplings"
          ],
          de: [
            "Lammbraten vom Spieß aus Jablanica",
            "Neretva-Forelle",
            "Japrak & Klepe-Teigtaschen"
          ]
        },
        criticalTips: {
          tr: [
            "Köprü dalgıçları atlamadan önce izleyicilerden bahşiş toplar; kendiniz atlamaya kesinlikle kalkışmayın, köprü yaklaşık 21 metre yüksekliktedir.",
            "Köprünün kaygan kireçtaşı basamaklarında dikkatli yürüyün; günübirlik tur kalabalığı öğle saatlerinde zirve yapar."
          ],
          en: [
            "Bridge divers collect tips from onlookers before jumping; never attempt the jump yourself — the bridge is about 21 metres high.",
            "Walk carefully on the bridge’s slippery limestone steps; day-tour crowds peak around midday."
          ],
          de: [
            "Brückenspringer sammeln vorher Geld; nie selbst springen — ca. 21 m hoch.",
            "Vorsicht auf den glatten Kalksteinstufen; mittags am vollsten."
          ]
        },
        mapsQuery: "Stari Most, Mostar, Bosnia and Herzegovina"
      },
      {
        name: {
          tr: "3. Durak: Blagaj, Počitelj & Kravica Şelaleleri (Hersek)",
          en: "Stop 3: Blagaj, Počitelj & Kravica Waterfalls (Herzegovina)",
          de: "Stopp 3: Blagaj, Počitelj & Kravica-Wasserfälle (Herzegowina)"
        },
        recommendedDuration: {
          tr: "1-2 Gün (Mostar çıkışlı günübirlik tur)",
          en: "1-2 Days (Day tour from Mostar)",
          de: "1-2 Tage (Tagestour ab Mostar)"
        },
        durationBadge: {
          tr: "1-2 Gün",
          en: "1-2 Days",
          de: "1-2 Tage"
        },
        highlights: {
          tr: [
            "Blagaj Tekkesi & Buna Nehri kaynağı",
            "Počitelj Osmanlı taş kasabası",
            "Kravica Şelaleleri",
            "Hersek bağları (Žilavka & Blatina)"
          ],
          en: [
            "Blagaj Tekke & the source of the Buna River",
            "Počitelj Ottoman stone village",
            "Kravica Waterfalls",
            "Herzegovina vineyards (Žilavka & Blatina)"
          ],
          de: [
            "Derwischkloster Blagaj & Buna-Quelle",
            "Osmanisches Steindorf Počitelj",
            "Kravica-Wasserfälle",
            "Weinberge der Herzegowina (Žilavka & Blatina)"
          ]
        },
        activities: {
          tr: [
            "Kayalık bir mağaradan çıkan Buna Nehri’nin kenarındaki 16. yüzyıldan kalma Blagaj Tekkesi’ni ziyaret edip nehir kenarında alabalık yiyin.",
            "Počitelj’in taş evleri arasından Hacı Alibey Camii ve kale kulesine tırmanıp Neretva Vadisi’ni seyredin.",
            "Kravica Şelaleleri’nin altındaki doğal havuzda yazın yüzün veya kiralık kayıkla şelaleye yaklaşın."
          ],
          en: [
            "Visit the 16th-century Blagaj Tekke beside the Buna River as it emerges from a cliff cave, and eat trout by the water.",
            "Climb through Počitelj’s stone houses to the Hajji Alija Mosque and the fortress tower for views over the Neretva Valley.",
            "Swim in the natural pool beneath Kravica Waterfalls in summer, or hire a small boat to get close to the falls."
          ],
          de: [
            "Das Derwischkloster am Felsenquell der Buna besuchen und Forelle am Fluss essen.",
            "Durch Počitelj zur Moschee und zum Festungsturm mit Blick ins Neretvatal.",
            "Im Sommer im Naturbecken der Kravica-Fälle baden oder mit dem Boot heranfahren."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Blagaj’da nehir kenarında ızgara alabalık",
            "Hersek peynirleri & kuru et (suho meso)",
            "Taze nar ve incir (yaz sonu)"
          ],
          en: [
            "Grilled trout by the river in Blagaj",
            "Herzegovinian cheeses & cured beef (suho meso)",
            "Fresh pomegranates and figs (late summer)"
          ],
          de: [
            "Gegrillte Forelle am Fluss in Blagaj",
            "Herzegowinischer Käse & Trockenfleisch",
            "Frische Granatäpfel & Feigen"
          ]
        },
        criticalTips: {
          tr: [
            "Kravica’da yüzme ve tekne izni mevsime ve su seviyesine göre değişir; giriş ücretlidir, kuyruk oluşmadan sabah gidin.",
            "Blagaj Tekkesi aktif bir dini mekândır; girişte kadınlara örtü ve etek verilir, sessiz ve saygılı davranın."
          ],
          en: [
            "Swimming and boating rules at Kravica vary with the season and water level; there is an entry fee, so go in the morning before the queues.",
            "Blagaj Tekke is an active place of worship; wraps and skirts are provided for women at the entrance, so behave quietly and respectfully."
          ],
          de: [
            "Baderegeln an den Kravica-Fällen variieren; Eintritt kostenpflichtig, morgens hingehen.",
            "Blagaj ist eine aktive Gebetsstätte; Tücher werden ausgeliehen, ruhig verhalten."
          ]
        },
        mapsQuery: "Blagaj Tekke, Blagaj, Bosnia and Herzegovina"
      }
    ],
    signatureGastronomy: {
      dishes: {
        tr: [
          "Ćevapi",
          "Burek & pita",
          "Begova čorba",
          "Bosanski lonac (Bosna güveci)"
        ],
        en: [
          "Ćevapi",
          "Burek & pita",
          "Begova čorba",
          "Bosanski lonac (Bosnian pot stew)"
        ],
        de: [
          "Ćevapi",
          "Burek & Pita",
          "Begova Čorba",
          "Bosanski Lonac (bosnischer Eintopf)"
        ]
      },
      drinks: {
        tr: [
          "Bosna kahvesi (džezva ile)",
          "Boza & ayran",
          "Žilavka & Blatina şarapları",
          "Rakija"
        ],
        en: [
          "Bosnian coffee (served in a džezva)",
          "Boza & ayran",
          "Žilavka & Blatina wines",
          "Rakija"
        ],
        de: [
          "Bosnischer Kaffee (in der Džezva)",
          "Boza & Ayran",
          "Žilavka- & Blatina-Weine",
          "Rakija"
        ]
      },
      streetFoods: {
        tr: [
          "Burek (kıymalı rulo börek)",
          "Somun ekmeğinde ćevapi",
          "Baklava & Tufahija",
          "Kızarmış kestane (sonbahar)"
        ],
        en: [
          "Burek (meat-filled coiled pie)",
          "Ćevapi in somun bread",
          "Baklava & Tufahija",
          "Roasted chestnuts (autumn)"
        ],
        de: [
          "Burek (Fleischschnecke)",
          "Ćevapi im Somun",
          "Baklava & Tufahija",
          "Geröstete Maronen (Herbst)"
        ]
      },
      diningAdvice: {
        tr: "Başçarşı’daki ćevabdžinicalar (köfteciler) yerel favoridir; ćevapi 5’li veya 10’lu porsiyon olarak sipariş edilir. Sırp Cumhuriyeti bölgelerinde ve bazı restoranlarda domuz eti ve alkol bulunabilir; emin olmak için sorun. Bahşiş zorunlu değildir, hesabı yuvarlamak yeterlidir.",
        en: "The ćevabdžinicas (kebab houses) of Baščaršija are local favourites; ćevapi are ordered in portions of 5 or 10. In Republika Srpska areas and some restaurants pork and alcohol are served, so ask if unsure. Tipping isn’t compulsory; rounding up is enough.",
        de: "Ćevabdžinicas in der Baščaršija sind beliebt; Portionen zu 5 oder 10. Teils Schweinefleisch und Alkohol; Trinkgeld: aufrunden."
      }
    },
    packingAndPrecautions: {
      essentials: {
        tr: [
          "Pasaport (en az 3 ay geçerli olmalı)",
          "Camiler için başörtüsü ve uzun giysi",
          "Kravica için mayo ve su ayakkabısı",
          "Nakit KM (küçük işletmeler kart kabul etmeyebilir)"
        ],
        en: [
          "Passport (should be valid for at least 3 more months)",
          "Headscarf and long clothing for mosques",
          "Swimwear and water shoes for Kravica",
          "Cash in KM (small businesses may not take cards)"
        ],
        de: [
          "Reisepass (mind. 3 Monate gültig)",
          "Kopftuch & lange Kleidung für Moscheen",
          "Badesachen & Wasserschuhe für Kravica",
          "Bargeld in KM (kleine Läden ohne Kartenzahlung)"
        ]
      },
      safetyAndEtiquette: {
        tr: [
          "Savaş ve etnik konular hassastır; bu konularda yerel halkla konuşurken dinleyici olun ve taraf tutan yorumlardan kaçının.",
          "Başçarşı ve tramvayda yankesicilere karşı çantanızı önünüzde taşıyın.",
          "Dağ yollarında kış aylarında kar zinciri gerekebilir; Saraybosna’da kışın hava kirliliği yüksek olabilir."
        ],
        en: [
          "War and ethnic topics are sensitive; when locals talk about them, listen and avoid taking sides.",
          "Keep your bag in front of you in Baščaršija and on the tram to deter pickpockets.",
          "Snow chains may be needed on mountain roads in winter; air pollution in Sarajevo can be high in winter."
        ],
        de: [
          "Krieg und Ethnien sind sensible Themen; zuhören statt Partei ergreifen.",
          "In der Baščaršija und Straßenbahn Tasche vorne tragen.",
          "Im Winter Schneeketten nötig; in Sarajevo im Winter oft Smog."
        ]
      }
    }
  },
  RS: {
    routeName: {
      tr: "Tuna’nın Kıyısında Sırbistan: Belgrad, Novi Sad & Zlatibor / Uvac",
      en: "Serbia on the Danube: Belgrade, Novi Sad & Zlatibor / Uvac",
      de: "Serbien an der Donau: Belgrad, Novi Sad & Zlatibor / Uvac"
    },
    routeSummary: {
      tr: "Osmanlı izleri taşıyan Kalemegdan Kalesi ve canlı gece hayatıyla Belgrad’dan hızlı trenle Petrovaradin Kalesi’nin şehri Novi Sad’a, ardından batıdaki Zlatibor dağlarına ve Uvac Kanyonu’nun menderes kıvrımlarına uzanan 8 günlük rota. Tarih meraklıları üçüncü durak olarak güneydeki Niş’i seçebilir.",
      en: "An 8-day route from Belgrade, with Ottoman-era Kalemegdan Fortress and lively nightlife, by fast train to Novi Sad and Petrovaradin Fortress, then west into the Zlatibor mountains and the meanders of Uvac Canyon. History lovers can choose Niš in the south as the third stop instead.",
      de: "Eine 8-tägige Route von Belgrad mit der Festung Kalemegdan per Schnellzug nach Novi Sad und zur Festung Petrovaradin, dann in die Zlatibor-Berge und zu den Mäandern des Uvac. Alternativ Niš im Süden."
    },
    totalDays: 8,
    idealDurationText: {
      tr: "8 Günlük Sırbistan Rotası",
      en: "8-Day Serbia Route",
      de: "8-Tage-Serbienroute"
    },
    bestSeason: {
      tr: "Mayıs - Haziran & Eylül - Ekim (Ilık hava; Zlatibor kışın kayak merkezi olarak da gezilebilir)",
      en: "May - June & September - October (mild weather; Zlatibor is also a ski area in winter)",
      de: "Mai - Juni & September - Oktober (Zlatibor im Winter auch Skigebiet)"
    },
    transportMode: {
      tr: "Belgrad - Novi Sad arası Soko hızlı treni (yaklaşık 35 dakika) + Zlatibor ve Uvac için otobüs veya kiralık araç",
      en: "Soko high-speed train between Belgrade and Novi Sad (about 35 minutes) + bus or rental car for Zlatibor and Uvac",
      de: "Soko-Schnellzug Belgrad - Novi Sad (ca. 35 Min.) + Bus oder Mietwagen für Zlatibor und Uvac"
    },
    paceLevel: {
      tr: "Dengeli & Şehir + Doğa",
      en: "Balanced & City + Nature",
      de: "Ausgewogen & Stadt + Natur"
    },
    stops: [
      {
        name: {
          tr: "1. Durak: Belgrad (Kalemegdan & Tuna-Sava Kavşağı)",
          en: "Stop 1: Belgrade (Kalemegdan & the Danube-Sava Confluence)",
          de: "Stopp 1: Belgrad (Kalemegdan & Zusammenfluss von Donau und Save)"
        },
        recommendedDuration: {
          tr: "3 Gün (Eski şehir, Zemun ve müzeler)",
          en: "3 Days (Old town, Zemun and museums)",
          de: "3 Tage (Altstadt, Zemun & Museen)"
        },
        durationBadge: {
          tr: "3 Gün",
          en: "3 Days",
          de: "3 Tage"
        },
        highlights: {
          tr: [
            "Kalemegdan Kalesi & Damat Ali Paşa Türbesi",
            "Knez Mihailova Caddesi & Bayraklı Camii",
            "Aziz Sava Katedrali",
            "Skadarlija bohem sokağı & Zemun Gardoš Kulesi"
          ],
          en: [
            "Kalemegdan Fortress & Damat Ali Pasha’s Tomb",
            "Knez Mihailova Street & Bajrakli Mosque",
            "Church of Saint Sava",
            "Skadarlija bohemian street & Zemun’s Gardoš Tower"
          ],
          de: [
            "Festung Kalemegdan & Türbe des Damat Ali Pascha",
            "Knez-Mihailova-Straße & Bajrakli-Moschee",
            "Dom des Heiligen Sava",
            "Skadarlija & Gardoš-Turm in Zemun"
          ]
        },
        activities: {
          tr: [
            "Kalemegdan surlarından Sava ile Tuna’nın birleştiği noktada gün batımını izleyin; kale içindeki Osmanlı dönemi Damat Ali Paşa Türbesi’ni görün.",
            "Nikola Tesla Müzesi’ni ve Tito’nun mezarının bulunduğu Yugoslavya Müzesi’ni (Çiçekler Evi) ziyaret edin.",
            "Tuna kıyısındaki Zemun’a yürüyüp balık lokantasında yemek yiyin; gece Sava üzerindeki “splav” denilen yüzer kulüpleri deneyimleyin."
          ],
          en: [
            "Watch the sunset over the Sava-Danube confluence from Kalemegdan’s walls and see the Ottoman-era tomb of Damat Ali Pasha inside the fortress.",
            "Visit the Nikola Tesla Museum and the Museum of Yugoslavia, home to Tito’s tomb (House of Flowers).",
            "Walk along the Danube to Zemun for dinner at a fish restaurant, and at night try the floating river clubs known as “splavovi”."
          ],
          de: [
            "Sonnenuntergang über dem Zusammenfluss von der Festung und die Türbe des Damat Ali Pascha besichtigen.",
            "Nikola-Tesla-Museum und Museum Jugoslawiens mit Titos Grab (Haus der Blumen).",
            "An der Donau nach Zemun zum Fischessen und nachts in die Flussclubs („Splavovi“)."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Pljeskavica (Sırp hamburger köftesi) & ćevapi",
            "Kajmak & ajvar ile sıcak somun",
            "Sarma & punjene paprike (biber dolması)",
            "Domaća kafa (Türk kahvesine benzer)"
          ],
          en: [
            "Pljeskavica (Serbian burger patty) & ćevapi",
            "Warm bread with kajmak & ajvar",
            "Sarma & punjene paprike (stuffed peppers)",
            "Domaća kafa (Turkish-style coffee)"
          ],
          de: [
            "Pljeskavica & Ćevapi",
            "Warmes Brot mit Kajmak & Ajvar",
            "Sarma & gefüllte Paprika",
            "Domaća Kafa (Mokka)"
          ]
        },
        criticalTips: {
          tr: [
            "Belgrad Nikola Tesla Havalimanı’nda taksiyi resmi “Taxi Info” masasından alacağınız sabit fiyatlı fiş (voucher) ile kullanın; salonda yaklaşan korsan taksicilere itibar etmeyin. CarGo uygulaması da güvenilir bir alternatiftir.",
            "Türk vatandaşları Sırbistan’a 180 gün içinde 90 güne kadar vizesiz girebilir; para birimi Sırp dinarıdır (RSD)."
          ],
          en: [
            "At Belgrade Nikola Tesla Airport take a taxi using the fixed-price voucher from the official “Taxi Info” desk; ignore unofficial drivers approaching you in the hall. The CarGo app is also a reliable alternative.",
            "Turkish citizens can enter Serbia visa-free for up to 90 days within 180; the currency is the Serbian dinar (RSD)."
          ],
          de: [
            "Am Flughafen Belgrad Taxi nur mit Festpreis-Gutschein vom offiziellen „Taxi Info“-Schalter; CarGo-App als Alternative.",
            "Visumfrei bis 90 Tage in 180; Währung: Serbischer Dinar (RSD)."
          ]
        },
        mapsQuery: "Kalemegdan Fortress, Belgrade, Serbia"
      },
      {
        name: {
          tr: "2. Durak: Novi Sad (Petrovaradin Kalesi & Fruška Gora)",
          en: "Stop 2: Novi Sad (Petrovaradin Fortress & Fruška Gora)",
          de: "Stopp 2: Novi Sad (Festung Petrovaradin & Fruška Gora)"
        },
        recommendedDuration: {
          tr: "2 Gün (Şehir + Sremski Karlovci & manastırlar)",
          en: "2 Days (City + Sremski Karlovci & monasteries)",
          de: "2 Tage (Stadt + Sremski Karlovci & Klöster)"
        },
        durationBadge: {
          tr: "2 Gün",
          en: "2 Days",
          de: "2 Tage"
        },
        highlights: {
          tr: [
            "Petrovaradin Kalesi & ters akrepli saat kulesi",
            "Zmaj Jovina & Dunavska caddeleri",
            "Sremski Karlovci barok kasabası",
            "Fruška Gora Milli Parkı manastırları"
          ],
          en: [
            "Petrovaradin Fortress & its “drunken” clock tower",
            "Zmaj Jovina & Dunavska streets",
            "Baroque town of Sremski Karlovci",
            "Fruška Gora National Park monasteries"
          ],
          de: [
            "Festung Petrovaradin & „betrunkene“ Uhr",
            "Zmaj-Jovina- & Dunavska-Straße",
            "Barockstädtchen Sremski Karlovci",
            "Klöster im Nationalpark Fruška Gora"
          ]
        },
        activities: {
          tr: [
            "Petrovaradin Kalesi’nde akrepleri dakikayı, yelkovanı saati gösteren saat kulesini görün ve rehberli yeraltı galerileri turuna katılın.",
            "Novi Sad’ın pastel renkli yaya caddelerinde dolaşıp Meryem Ana Kilisesi’ni görün, Tuna kıyısındaki Strand’da yürüyün.",
            "Yarım günde Sremski Karlovci’ye gidip barok meydanı ve şaraphaneleri gezin, ardından Fruška Gora’daki Ortodoks manastırlarından birini ziyaret edin."
          ],
          en: [
            "At Petrovaradin Fortress see the clock tower whose short hand shows the minutes and long hand the hours, and join a guided tour of the underground galleries.",
            "Stroll Novi Sad’s pastel pedestrian streets, see the Name of Mary Church and walk along the Danube at the Strand beach.",
            "Take a half-day trip to Sremski Karlovci for its baroque square and wineries, then visit one of the Orthodox monasteries of Fruška Gora."
          ],
          de: [
            "Die Uhr mit vertauschten Zeigern sehen und eine Führung durch die unterirdischen Gänge machen.",
            "Durch die Fußgängerzone, zur Marienkirche und an den Donaustrand Štrand.",
            "Halbtagesausflug nach Sremski Karlovci und zu einem Kloster der Fruška Gora."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Riblja čorba (Tuna balık çorbası)",
            "Bermet (Sremski Karlovci’nin tatlı şarabı)",
            "Kuglof & Voyvodina pastaları"
          ],
          en: [
            "Riblja čorba (Danube fish soup)",
            "Bermet (sweet dessert wine of Sremski Karlovci)",
            "Kuglof & Vojvodina cakes"
          ],
          de: [
            "Riblja Čorba (Donaufischsuppe)",
            "Bermet (Dessertwein aus Sremski Karlovci)",
            "Gugelhupf & Vojvodina-Kuchen"
          ]
        },
        criticalTips: {
          tr: [
            "Soko hızlı tren biletlerini Srbija Voz sitesinden veya istasyondan alın; Belgrad’dan kalkış istasyonu Beograd Centar’dır (Prokop).",
            "Temmuz başında düzenlenen büyük müzik festivalleri döneminde Novi Sad’da konaklama hızla dolar; tarihleri kontrol edip erken rezervasyon yapın."
          ],
          en: [
            "Buy Soko high-speed train tickets on the Srbija Voz website or at the station; trains leave from Beograd Centar (Prokop) in Belgrade.",
            "Accommodation in Novi Sad fills up fast during big music festivals in early July; check the dates and book early."
          ],
          de: [
            "Soko-Tickets online bei Srbija Voz oder am Bahnhof; Abfahrt Beograd Centar (Prokop).",
            "Bei großen Festivals Anfang Juli sind Unterkünfte schnell ausgebucht."
          ]
        },
        mapsQuery: "Petrovaradin Fortress, Novi Sad, Serbia"
      },
      {
        name: {
          tr: "3. Durak: Zlatibor, Mokra Gora & Uvac Kanyonu",
          en: "Stop 3: Zlatibor, Mokra Gora & Uvac Canyon",
          de: "Stopp 3: Zlatibor, Mokra Gora & Uvac-Schlucht"
        },
        recommendedDuration: {
          tr: "3 Gün (Zlatibor tabanlı; Mokra Gora 1 gün + Uvac 1 gün)",
          en: "3 Days (Based in Zlatibor; Mokra Gora 1 day + Uvac 1 day)",
          de: "3 Tage (Basis Zlatibor; Mokra Gora + Uvac)"
        },
        durationBadge: {
          tr: "3 Gün",
          en: "3 Days",
          de: "3 Tage"
        },
        highlights: {
          tr: [
            "Zlatibor Altın Gondol (Gold Gondola)",
            "Šargan Sekizi tarihi dağ treni",
            "Drvengrad (Küstendorf) ahşap köyü",
            "Uvac menderesleri & kızıl akbabalar"
          ],
          en: [
            "Zlatibor Gold Gondola",
            "Šargan Eight heritage mountain railway",
            "Drvengrad (Küstendorf) wooden village",
            "Uvac meanders & griffon vultures"
          ],
          de: [
            "Gold-Gondel Zlatibor",
            "Historische Bergbahn Šarganska Osmica",
            "Holzdorf Drvengrad (Küstendorf)",
            "Uvac-Mäander & Gänsegeier"
          ]
        },
        activities: {
          tr: [
            "Dünyanın en uzun panoramik gondollarından Zlatibor Gold Gondola ile dağ sırtları üzerinde süzülün.",
            "Mokra Gora’da sekiz şeklinde kıvrılan Šargan dar hat treniyle tünellerden geçip Kusturica’nın ahşap köyü Drvengrad’ı gezin (tren mevsimseldir).",
            "Uvac Özel Doğa Koruma Alanı’nda tekne turuna katılıp Ledena Pećina mağarasını görün ve Molitva seyir noktasından ünlü menderes manzarasını izleyin."
          ],
          en: [
            "Glide over the ridges on the Zlatibor Gold Gondola, one of the longest panoramic gondolas in the world.",
            "In Mokra Gora ride the figure-of-eight Šargan narrow-gauge railway through its tunnels and visit Kusturica’s wooden village Drvengrad (the train is seasonal).",
            "Join a boat tour in the Uvac Special Nature Reserve, see the Ledena Pećina ice cave and take in the famous meanders from the Molitva viewpoint."
          ],
          de: [
            "Mit der Gold-Gondel, einer der längsten Panoramagondeln der Welt, über die Bergrücken schweben.",
            "In Mokra Gora mit der Schmalspurbahn „Šarganska Osmica“ fahren und Kusturicas Drvengrad besuchen (saisonal).",
            "Bootstour im Naturreservat Uvac, Eishöhle Ledena Pećina und Aussichtspunkt Molitva."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Komplet lepinja (kaymaklı, yumurtalı ekmek)",
            "Zlatibor peynirleri & kaymak",
            "Uvac alabalığı"
          ],
          en: [
            "Komplet lepinja (bread with kajmak, egg and drippings)",
            "Zlatibor cheeses & kajmak",
            "Uvac trout"
          ],
          de: [
            "Komplet Lepinja (Brot mit Kajmak & Ei)",
            "Zlatibor-Käse & Kajmak",
            "Uvac-Forelle"
          ]
        },
        criticalTips: {
          tr: [
            "Zlatibor’un ünlü pršuta’sı (kurutulmuş et) genellikle domuzdan yapılır; dana versiyonu için “goveđa pršuta” isteyin.",
            "Uvac tekne turları sınırlı kapasiteyle ve mevsimsel çalışır; önceden rezervasyon yapın. Tarih odaklı bir rota isterseniz bu durak yerine Niş Kalesi ve Kafatası Kulesi’ni (Ćele Kula) ziyaret edebilirsiniz."
          ],
          en: [
            "Zlatibor’s famous pršuta (cured ham) is usually pork; ask for “goveđa pršuta” for the beef version.",
            "Uvac boat tours are seasonal with limited capacity, so book ahead. For a history-focused route you can visit Niš Fortress and the Skull Tower (Ćele Kula) instead of this stop."
          ],
          de: [
            "Zlatibor-Pršuta ist meist Schwein; „goveđa pršuta“ ist Rind.",
            "Uvac-Bootstouren saisonal und begrenzt; vorab buchen. Alternativ Niš mit Festung und Schädelturm."
          ]
        },
        mapsQuery: "Uvac Special Nature Reserve, Serbia"
      }
    ],
    signatureGastronomy: {
      dishes: {
        tr: [
          "Pljeskavica",
          "Ćevapi",
          "Sarma",
          "Karađorđeva šnicla"
        ],
        en: [
          "Pljeskavica",
          "Ćevapi",
          "Sarma",
          "Karađorđeva šnicla"
        ],
        de: [
          "Pljeskavica",
          "Ćevapi",
          "Sarma",
          "Karađorđeva Šnicla"
        ]
      },
      drinks: {
        tr: [
          "Šljivovica (erik rakısı)",
          "Domaća kafa",
          "Bermet şarabı",
          "Yoğurt & kefir"
        ],
        en: [
          "Šljivovica (plum brandy)",
          "Domaća kafa",
          "Bermet wine",
          "Yoghurt & kefir"
        ],
        de: [
          "Šljivovica (Pflaumenschnaps)",
          "Domaća Kafa",
          "Bermet-Wein",
          "Joghurt & Kefir"
        ]
      },
      streetFoods: {
        tr: [
          "Yoğurtlu burek",
          "Gibanica (peynirli börek)",
          "Pljeskavica sandviçi",
          "Palačinke (krep)"
        ],
        en: [
          "Burek with yoghurt",
          "Gibanica (cheese pie)",
          "Pljeskavica sandwich",
          "Palačinke (crêpes)"
        ],
        de: [
          "Burek mit Joghurt",
          "Gibanica (Käsekuchen)",
          "Pljeskavica-Sandwich",
          "Palatschinken"
        ]
      },
      diningAdvice: {
        tr: "Porsiyonlar büyüktür ve et ağırlıklıdır. Domuz eti çok yaygındır: menüde “svinjsko” domuz, “juneće” veya “teleće” dana anlamına gelir. Restoranlarda %10 civarında bahşiş yaygındır. Kapalı mekânlarda sigara içilen yerlerle karşılaşabilirsiniz.",
        en: "Portions are big and meat-heavy. Pork is very common: on menus “svinjsko” means pork, “juneće” or “teleće” means beef or veal. A tip of around 10% is usual in restaurants. You may still come across venues where smoking indoors is allowed.",
        de: "Große, fleischlastige Portionen. „Svinjsko“ = Schwein, „juneće/teleće“ = Rind/Kalb. Ca. 10 % Trinkgeld. Teils wird drinnen geraucht."
      }
    },
    packingAndPrecautions: {
      essentials: {
        tr: [
          "Pasaport (en az 90 gün geçerli olmalı)",
          "Zlatibor ve Uvac için yürüyüş ayakkabısı ve kat kat giysi",
          "Nakit dinar (küçük işletmeler ve pazarlar için)",
          "Kiril alfabesi için çeviri uygulaması"
        ],
        en: [
          "Passport (valid for at least 90 more days)",
          "Hiking shoes and layers for Zlatibor and Uvac",
          "Cash in dinars (for small shops and markets)",
          "A translation app for Cyrillic signs"
        ],
        de: [
          "Reisepass (mind. 90 Tage gültig)",
          "Wanderschuhe & Zwiebellook für Zlatibor und Uvac",
          "Bargeld in Dinar",
          "Übersetzungs-App für Kyrillisch"
        ]
      },
      safetyAndEtiquette: {
        tr: [
          "Belgrad’da şehir içi taksilerde taksimetreyi açtırın veya CarGo / Yandex Go gibi uygulamaları kullanın.",
          "Siyasi gösteriler ve futbol derbileri (Kızıl Yıldız - Partizan) çevresinde kalabalıklardan uzak durun.",
          "Kosova konusu hassastır; Kosova’dan Sırbistan’a giriş kurallarını seyahat öncesi kontrol edin."
        ],
        en: [
          "In Belgrade make sure city taxis use the meter, or use apps such as CarGo or Yandex Go.",
          "Keep away from crowds around political protests and football derbies (Red Star - Partizan).",
          "Kosovo is a sensitive topic; check the rules for entering Serbia from Kosovo before travelling."
        ],
        de: [
          "In Belgrad auf Taxameter bestehen oder CarGo / Yandex Go nutzen.",
          "Demonstrationen und Fußballderbys meiden.",
          "Kosovo ist heikel; Einreiseregeln aus dem Kosovo vorab prüfen."
        ]
      }
    }
  },
  MK: {
    routeName: {
      tr: "Kuzey Makedonya: Üsküp Çarşısı, Matka Kanyonu, Ohri Gölü & Manastır",
      en: "North Macedonia: Skopje Bazaar, Matka Canyon, Lake Ohrid & Bitola",
      de: "Nordmazedonien: Skopjer Basar, Matka-Schlucht, Ohridsee & Bitola"
    },
    routeSummary: {
      tr: "Taş Köprü ve Osmanlı çarşısıyla Üsküp’ten Matka Kanyonu’na, UNESCO listesindeki Ohri Gölü ve kiliselerine, son olarak Atatürk’ün askeri idadide okuduğu Manastır’a (Bitola) uzanan 7 günlük rota.",
      en: "A 7-day route from Skopje with its Stone Bridge and Ottoman bazaar to Matka Canyon, on to UNESCO-listed Lake Ohrid and its churches, and finally to Bitola, where Atatürk attended the military high school.",
      de: "Eine 7-tägige Route von Skopje mit Steinbrücke und Basar zur Matka-Schlucht, zum UNESCO-Welterbe Ohridsee und nach Bitola, wo Atatürk die Militärschule besuchte."
    },
    totalDays: 7,
    idealDurationText: {
      tr: "7 Günlük Makedonya Rotası",
      en: "7-Day Macedonia Route",
      de: "7-Tage-Mazedonienroute"
    },
    bestSeason: {
      tr: "Mayıs - Eylül (Ohri’de göl yüzmesi Haziran - Eylül; Temmuz - Ağustos en kalabalık dönemdir)",
      en: "May - September (lake swimming in Ohrid June - September; July - August is busiest)",
      de: "Mai - September (Baden im Ohridsee Juni - September)"
    },
    transportMode: {
      tr: "Şehirlerarası otobüsler (Üsküp - Ohri yaklaşık 3 saat) veya kiralık araç; Matka için şehir otobüsü ya da taksi",
      en: "Intercity buses (Skopje - Ohrid about 3 hours) or a rental car; city bus or taxi to Matka",
      de: "Fernbusse (Skopje - Ohrid ca. 3 Std.) oder Mietwagen; Stadtbus oder Taxi nach Matka"
    },
    paceLevel: {
      tr: "Rahat & Kültür + Göl",
      en: "Relaxed & Culture + Lake",
      de: "Entspannt & Kultur + See"
    },
    stops: [
      {
        name: {
          tr: "1. Durak: Üsküp (Taş Köprü, Eski Çarşı & Matka Kanyonu)",
          en: "Stop 1: Skopje (Stone Bridge, Old Bazaar & Matka Canyon)",
          de: "Stopp 1: Skopje (Steinbrücke, Alter Basar & Matka-Schlucht)"
        },
        recommendedDuration: {
          tr: "2-3 Gün (Şehir 1,5 gün + Matka yarım gün + Vodno)",
          en: "2-3 Days (City 1.5 days + Matka half day + Vodno)",
          de: "2-3 Tage (Stadt + Matka + Vodno)"
        },
        durationBadge: {
          tr: "2-3 Gün",
          en: "2-3 Days",
          de: "2-3 Tage"
        },
        highlights: {
          tr: [
            "Taş Köprü & Makedonya Meydanı",
            "Eski Çarşı, Mustafa Paşa Camii & Kapan Han",
            "Üsküp Kalesi & Davut Paşa Hamamı",
            "Matka Kanyonu & Vrelo Mağarası"
          ],
          en: [
            "Stone Bridge & Macedonia Square",
            "Old Bazaar, Mustafa Pasha Mosque & Kapan Han",
            "Skopje Fortress (Kale) & Daut Pasha Hamam",
            "Matka Canyon & Vrelo Cave"
          ],
          de: [
            "Steinbrücke & Makedonien-Platz",
            "Alter Basar, Mustafa-Pascha-Moschee & Kapan Han",
            "Festung Kale & Daut-Pascha-Hamam",
            "Matka-Schlucht & Vrelo-Höhle"
          ]
        },
        activities: {
          tr: [
            "Fatih döneminden kalma Taş Köprü’yü geçip Balkanlar’ın en büyük çarşılarından Eski Çarşı’da hanlar, camiler ve kebapçılar arasında dolaşın.",
            "Matka Kanyonu’nda baraj gölünde kano yapın veya tekneyle Avrupa’nın en derin su altı mağaralarından sayılan Vrelo Mağarası’na gidin.",
            "Vodno Dağı’na teleferikle çıkıp Milenyum Haçı’ndan şehri izleyin, akşam Anne Teresa Anıt Evi çevresinde yürüyün."
          ],
          en: [
            "Cross the Stone Bridge, dating from the time of Mehmed the Conqueror, and wander the Old Bazaar, one of the largest in the Balkans, among caravanserais, mosques and grill houses.",
            "Kayak on the reservoir in Matka Canyon or take a boat to Vrelo Cave, considered one of Europe’s deepest underwater caves.",
            "Take the cable car up Mount Vodno for city views from the Millennium Cross, then stroll near the Mother Teresa Memorial House in the evening."
          ],
          de: [
            "Über die Steinbrücke in den Alten Basar, einen der größten des Balkans, mit Hans und Moscheen.",
            "In der Matka-Schlucht Kajak fahren oder per Boot zur Vrelo-Höhle.",
            "Mit der Seilbahn zum Millennium-Kreuz auf dem Vodno und abends zum Mutter-Teresa-Gedenkhaus."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Tavče gravče (fırında kuru fasulye)",
            "Üsküp kebapı (kebapi) & şopska salatası",
            "Ajvar (közlenmiş biber ezmesi)",
            "Eski Çarşı’da Türk kahvesi & baklava"
          ],
          en: [
            "Tavče gravče (oven-baked beans)",
            "Skopje kebapi & shopska salad",
            "Ajvar (roasted pepper relish)",
            "Turkish coffee & baklava in the Old Bazaar"
          ],
          de: [
            "Tavče Gravče (gebackene Bohnen)",
            "Skopjer Kebapi & Schopska-Salat",
            "Ajvar (Paprikamus)",
            "Türkischer Kaffee & Baklava im Basar"
          ]
        },
        criticalTips: {
          tr: [
            "Türk vatandaşları Kuzey Makedonya’ya 180 gün içinde 90 güne kadar vizesiz girebilir; para birimi Makedon denarıdır (MKD).",
            "Eski Çarşı’da Türkçe yaygın olarak anlaşılır; yine de çarşı dışındaki yerlerde temel İngilizce veya çeviri uygulaması işinize yarar."
          ],
          en: [
            "Turkish citizens can enter North Macedonia visa-free for up to 90 days within 180; the currency is the Macedonian denar (MKD).",
            "Turkish is widely understood in the Old Bazaar, but outside it basic English or a translation app will help."
          ],
          de: [
            "Visumfrei bis 90 Tage in 180; Währung: Mazedonischer Denar (MKD).",
            "Im Basar wird oft Türkisch verstanden; sonst Englisch oder Übersetzungs-App."
          ]
        },
        mapsQuery: "Old Bazaar, Skopje, North Macedonia"
      },
      {
        name: {
          tr: "2. Durak: Ohri (Eski Şehir, Kaneo & Ohri Gölü)",
          en: "Stop 2: Ohrid (Old Town, Kaneo & Lake Ohrid)",
          de: "Stopp 2: Ohrid (Altstadt, Kaneo & Ohridsee)"
        },
        recommendedDuration: {
          tr: "3 Gün (Eski şehir + Aziz Naum + göl keyfi)",
          en: "3 Days (Old town + St. Naum + lake time)",
          de: "3 Tage (Altstadt + Sveti Naum + See)"
        },
        durationBadge: {
          tr: "3 Gün",
          en: "3 Days",
          de: "3 Tage"
        },
        highlights: {
          tr: [
            "Kaneo’daki Aziz Yuhanna Kilisesi",
            "Çar Samuil Kalesi & Antik Tiyatro",
            "Plaošnik & Aziz Sofya Kilisesi",
            "Aziz Naum Manastırı & Kara Drim kaynakları"
          ],
          en: [
            "Church of St. John at Kaneo",
            "Tsar Samuel’s Fortress & Ancient Theatre",
            "Plaošnik & Church of St. Sophia",
            "St. Naum Monastery & Black Drin springs"
          ],
          de: [
            "Kirche des hl. Johannes in Kaneo",
            "Festung des Zaren Samuil & Antikes Theater",
            "Plaošnik & Sophienkirche",
            "Kloster Sveti Naum & Quellen des Schwarzen Drin"
          ]
        },
        activities: {
          tr: [
            "Eski şehirden kıyı boyunca yürüyüp göle bakan kayalıktaki Kaneo Kilisesi’nde gün batımını izleyin.",
            "Samuil Kalesi’nden Antik Tiyatro ve Plaošnik’e inen yokuşta şehrin Bizans ve Orta Çağ katmanlarını keşfedin.",
            "Tekne veya otobüsle Aziz Naum Manastırı’na gidip tavus kuşlu bahçeleri gezin ve küçük kayıklarla berrak Kara Drim kaynaklarında tura çıkın; dönüşte Kemikler Körfezi’ndeki kazıklı yapı müzesine uğrayın."
          ],
          en: [
            "Walk the shoreline from the old town to Kaneo Church on its cliff above the lake and watch the sunset.",
            "Explore the city’s Byzantine and medieval layers on the walk down from Samuel’s Fortress to the Ancient Theatre and Plaošnik.",
            "Go by boat or bus to St. Naum Monastery, see its peacock gardens and take a rowing boat over the clear Black Drin springs; on the way back stop at the pile-dwelling museum in the Bay of Bones."
          ],
          de: [
            "Am Ufer entlang zur Kirche von Kaneo auf dem Felsen und den Sonnenuntergang genießen.",
            "Von der Samuil-Festung zum Antiken Theater und nach Plaošnik hinabsteigen.",
            "Per Boot oder Bus nach Sveti Naum, Ruderbootfahrt über die Quellen und Pfahlbaumuseum in der Knochenbucht."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Göl balıkları (ızgara veya fırında)",
            "Ohri usulü selsko meso (köy güveci)",
            "Vranec kırmızı şarabı"
          ],
          en: [
            "Lake fish (grilled or baked)",
            "Selsko meso (village-style meat casserole)",
            "Vranec red wine"
          ],
          de: [
            "Seefisch (gegrillt oder gebacken)",
            "Selsko Meso (Bauerntopf)",
            "Vranec-Rotwein"
          ]
        },
        criticalTips: {
          tr: [
            "Ohri’ye özgü (endemik) Ohri alabalığı koruma altındadır; restoranlarda menüdeki balığın türünü ve kaynağını sorun.",
            "Ünlü Ohri incileri balık pullarından elde edilen bir özle yapılır; sahte ürünlerden kaçınmak için köklü aile atölyelerinden alın."
          ],
          en: [
            "The endemic Ohrid trout is a protected species; ask restaurants which fish is on the menu and where it comes from.",
            "The famous Ohrid pearls are made with an essence derived from fish scales; buy from long-established family workshops to avoid fakes."
          ],
          de: [
            "Die endemische Ohridforelle ist geschützt; nach Art und Herkunft des Fisches fragen.",
            "Ohrid-Perlen werden mit einer Essenz aus Fischschuppen hergestellt; bei alteingesessenen Werkstätten kaufen."
          ]
        },
        mapsQuery: "Church of St. John at Kaneo, Ohrid, North Macedonia"
      },
      {
        name: {
          tr: "3. Durak: Manastır / Bitola (Širok Sokak & Atatürk Anı Odası)",
          en: "Stop 3: Bitola (Širok Sokak & Atatürk Memorial Room)",
          de: "Stopp 3: Bitola (Širok Sokak & Atatürk-Gedenkraum)"
        },
        recommendedDuration: {
          tr: "1 Gün (Ohri’den yaklaşık 1 saat)",
          en: "1 Day (About 1 hour from Ohrid)",
          de: "1 Tag (ca. 1 Std. von Ohrid)"
        },
        durationBadge: {
          tr: "1 Gün",
          en: "1 Day",
          de: "1 Tag"
        },
        highlights: {
          tr: [
            "Širok Sokak yaya caddesi",
            "Bitola Müzesi’ndeki Atatürk Anı Odası (eski Askeri İdadi binası)",
            "Herakleia Linkestis antik kenti mozaikleri",
            "Saat Kulesi, Yeni Cami & Bedesten"
          ],
          en: [
            "Širok Sokak pedestrian street",
            "Atatürk Memorial Room in the Bitola Museum (former military high school)",
            "Heraclea Lyncestis ancient city mosaics",
            "Clock Tower, Yeni Mosque & Bezisten"
          ],
          de: [
            "Fußgängerzone Širok Sokak",
            "Atatürk-Gedenkraum im Museum Bitola (ehem. Militärschule)",
            "Mosaiken von Heraclea Lyncestis",
            "Uhrturm, Yeni-Moschee & Bezisten"
          ]
        },
        activities: {
          tr: [
            "Atatürk’ün 1896-1899 yılları arasında okuduğu Manastır Askeri İdadisi binasındaki Bitola Müzesi’nde Atatürk Anı Odası’nı ziyaret edin.",
            "Konsoloslar şehri olarak anılan Bitola’nın pastel cepheli Širok Sokak caddesinde kahve molası verin.",
            "Şehrin hemen dışındaki Herakleia Linkestis antik kentinde zengin mozaikli bazilikaları görün."
          ],
          en: [
            "Visit the Atatürk Memorial Room in the Bitola Museum, housed in the military high school Atatürk attended from 1896 to 1899.",
            "Have a coffee on Širok Sokak, the pastel-fronted street of the “city of consuls”.",
            "See the richly decorated mosaic basilicas at ancient Heraclea Lyncestis just outside town."
          ],
          de: [
            "Den Atatürk-Gedenkraum im Museum in der Militärschule besuchen, die Atatürk 1896-1899 besuchte.",
            "Kaffeepause auf der Širok Sokak, der Straße der „Stadt der Konsuln“.",
            "Die Mosaikbasiliken von Heraclea Lyncestis vor der Stadt besichtigen."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Pastrmajlija (etli pide, Makedon klasiği)",
            "Turšija (karışık turşu)",
            "Kebapi & lepinja"
          ],
          en: [
            "Pastrmajlija (meat-topped flatbread)",
            "Turšija (mixed pickles)",
            "Kebapi & lepinja bread"
          ],
          de: [
            "Pastrmajlija (Fleischfladen)",
            "Turšija (eingelegtes Gemüse)",
            "Kebapi & Lepinja"
          ]
        },
        criticalTips: {
          tr: [
            "Müzenin ve Atatürk Anı Odası’nın açılış saatlerini ve kapalı olduğu günü önceden kontrol edin.",
            "Bitola’dan Yunanistan sınırı çok yakındır, ancak Yunanistan’a geçmek Türk vatandaşları için Schengen vizesi gerektirir; dönüşünüzü Üsküp üzerinden planlayın."
          ],
          en: [
            "Check the museum’s and the Atatürk Memorial Room’s opening hours and closing day in advance.",
            "The Greek border is very close to Bitola, but crossing into Greece requires a Schengen visa for Turkish citizens; plan your return via Skopje."
          ],
          de: [
            "Öffnungszeiten und Ruhetag des Museums vorab prüfen.",
            "Die griechische Grenze ist nah, erfordert aber ein Schengen-Visum; Rückreise über Skopje."
          ]
        },
        mapsQuery: "Širok Sokak, Bitola, North Macedonia"
      }
    ],
    signatureGastronomy: {
      dishes: {
        tr: [
          "Tavče gravče",
          "Kebapi",
          "Selsko meso",
          "Pastrmajlija"
        ],
        en: [
          "Tavče gravče",
          "Kebapi",
          "Selsko meso",
          "Pastrmajlija"
        ],
        de: [
          "Tavče Gravče",
          "Kebapi",
          "Selsko Meso",
          "Pastrmajlija"
        ]
      },
      drinks: {
        tr: [
          "Vranec & Tikveš şarapları",
          "Rakija",
          "Mastika",
          "Boza & Türk kahvesi"
        ],
        en: [
          "Vranec & Tikveš wines",
          "Rakija",
          "Mastika",
          "Boza & Turkish coffee"
        ],
        de: [
          "Vranec- & Tikveš-Weine",
          "Rakija",
          "Mastika",
          "Boza & türkischer Kaffee"
        ]
      },
      streetFoods: {
        tr: [
          "Burek & ayran",
          "Kebapi sandviçi",
          "Kızarmış mısır (göl kıyısında)",
          "Baklava & tulumba"
        ],
        en: [
          "Burek & ayran",
          "Kebapi sandwich",
          "Roasted corn (by the lake)",
          "Baklava & tulumba"
        ],
        de: [
          "Burek & Ayran",
          "Kebapi-Sandwich",
          "Gerösteter Mais am See",
          "Baklava & Tulumba"
        ]
      },
      diningAdvice: {
        tr: "Makedon mutfağı Türk ve Balkan mutfaklarının karışımıdır; birçok yemek Türk damak tadına tanıdık gelir. Kebapçılarda genellikle dana-kuzu kullanılsa da bazı lokantalarda domuz eti bulunur; “svinsko” domuz anlamına gelir. Bahşiş için hesabı yuvarlamak veya %10 bırakmak yaygındır.",
        en: "Macedonian cuisine blends Turkish and Balkan cooking, so many dishes feel familiar to Turkish travellers. Grill houses mostly use beef and lamb, but some restaurants serve pork; “svinsko” means pork. Rounding up or leaving 10% is the usual tip.",
        de: "Mischung aus türkischer und Balkanküche. Teils Schweinefleisch („svinsko“). Trinkgeld: aufrunden oder 10 %."
      }
    },
    packingAndPrecautions: {
      essentials: {
        tr: [
          "Pasaport (en az 3 ay geçerli olmalı)",
          "Ohri için mayo ve su ayakkabısı (göl kıyısı çakıllıdır)",
          "Kiliseler için omuzları örten giysi",
          "Nakit denar (pazarlar ve küçük işletmeler için)"
        ],
        en: [
          "Passport (should be valid for at least 3 more months)",
          "Swimwear and water shoes for Ohrid (the shore is pebbly)",
          "Clothing that covers shoulders for churches",
          "Cash in denars (for markets and small businesses)"
        ],
        de: [
          "Reisepass (mind. 3 Monate gültig)",
          "Badesachen & Wasserschuhe (Kiesufer)",
          "Schulterbedeckende Kleidung für Kirchen",
          "Bargeld in Denar"
        ]
      },
      safetyAndEtiquette: {
        tr: [
          "Üsküp’te kış aylarında hava kirliliği yüksek olabilir; astım gibi rahatsızlığı olanlar önlem almalıdır.",
          "Şehirlerarası yollarda gece sürüşünden kaçının; bazı yollar dar ve aydınlatmasızdır.",
          "Taksilerde taksimetre açtırın veya fiyatı binmeden netleştirin."
        ],
        en: [
          "Air pollution in Skopje can be high in winter; travellers with asthma or similar conditions should take precautions.",
          "Avoid driving between cities at night; some roads are narrow and unlit.",
          "Make sure taxis use the meter or agree the fare before getting in."
        ],
        de: [
          "Im Winter oft starke Luftverschmutzung in Skopje.",
          "Nachtfahrten meiden; Straßen teils eng und unbeleuchtet.",
          "Taxameter oder Festpreis vorab."
        ]
      }
    }
  },
  AL: {
    routeName: {
      tr: "Arnavutluk Keşfi: Tiran, Berat, Ergiri & Arnavut Rivierası",
      en: "Discover Albania: Tirana, Berat, Gjirokastër & the Albanian Riviera",
      de: "Albanien entdecken: Tirana, Berat, Gjirokastra & Albanische Riviera"
    },
    routeSummary: {
      tr: "Renkli başkent Tiran’dan “bin pencereli şehir” Berat’a ve taş çatılı Osmanlı kenti Ergiri’ye (Gjirokastër), oradan Butrint antik kenti ve Ksamil’in turkuaz koylarıyla Arnavut Rivierası’na uzanan 8 günlük rota. Dağ tutkunları kuzeyde Theth için rotaya 2 gün ekleyebilir.",
      en: "An 8-day route from colourful Tirana to Berat, the “city of a thousand windows”, and the stone-roofed Ottoman town of Gjirokastër, then down to the Albanian Riviera with ancient Butrint and the turquoise coves of Ksamil. Mountain lovers can add 2 days for Theth in the north.",
      de: "Eine 8-tägige Route von Tirana nach Berat, der „Stadt der tausend Fenster“, und ins osmanische Gjirokastra, dann an die Riviera mit Butrint und Ksamil. Bergfans hängen 2 Tage für Theth an."
    },
    totalDays: 8,
    idealDurationText: {
      tr: "8 Günlük Arnavutluk Rotası",
      en: "8-Day Albania Route",
      de: "8-Tage-Albanienroute"
    },
    bestSeason: {
      tr: "Mayıs - Haziran & Eylül (Riviera’da deniz sıcak, Temmuz - Ağustos’a göre daha sakin; Theth yürüyüşleri için Haziran - Eylül)",
      en: "May - June & September (warm sea on the Riviera, calmer than July - August; June - September for Theth hikes)",
      de: "Mai - Juni & September (ruhiger als Juli - August; Theth Juni - September)"
    },
    transportMode: {
      tr: "Kiralık araç (en esnek seçenek) veya şehirlerarası otobüs ve furgon minibüsleri; Tiran - Berat yaklaşık 2 saat",
      en: "Rental car (most flexible) or intercity buses and furgon minibuses; Tirana - Berat about 2 hours",
      de: "Mietwagen (am flexibelsten) oder Busse und Furgons; Tirana - Berat ca. 2 Std."
    },
    paceLevel: {
      tr: "Dengeli & Tarih + Deniz",
      en: "Balanced & History + Sea",
      de: "Ausgewogen & Geschichte + Meer"
    },
    stops: [
      {
        name: {
          tr: "1. Durak: Tiran (İskender Bey Meydanı & Bunk’Art)",
          en: "Stop 1: Tirana (Skanderbeg Square & Bunk’Art)",
          de: "Stopp 1: Tirana (Skanderbeg-Platz & Bunk’Art)"
        },
        recommendedDuration: {
          tr: "2 Gün (Şehir merkezi + Dajti Dağı)",
          en: "2 Days (City centre + Mount Dajti)",
          de: "2 Tage (Zentrum + Dajti)"
        },
        durationBadge: {
          tr: "2 Gün",
          en: "2 Days",
          de: "2 Tage"
        },
        highlights: {
          tr: [
            "İskender Bey Meydanı & Ethem Bey Camii",
            "Bunk’Art 1 & 2 sığınak müzeleri",
            "Yapraklar Evi (gözetim müzesi) & Tiran Piramidi",
            "Blloku semti & Dajti Ekspres teleferiği"
          ],
          en: [
            "Skanderbeg Square & Et’hem Bey Mosque",
            "Bunk’Art 1 & 2 bunker museums",
            "House of Leaves (surveillance museum) & Pyramid of Tirana",
            "Blloku district & Dajti Ekspres cable car"
          ],
          de: [
            "Skanderbeg-Platz & Et’hem-Bey-Moschee",
            "Bunkermuseen Bunk’Art 1 & 2",
            "Haus der Blätter (Überwachungsmuseum) & Pyramide",
            "Viertel Blloku & Seilbahn Dajti Ekspres"
          ]
        },
        activities: {
          tr: [
            "İskender Bey Meydanı’ndan freskleriyle ünlü Ethem Bey Camii’ne geçip Ulusal Tarih Müzesi’nin mozaik cephesini görün.",
            "Komünist dönemin sığınaklarına dönüştürülmüş Bunk’Art müzelerinde ve Yapraklar Evi’nde ülkenin kapalı geçmişini öğrenin.",
            "Dajti Ekspres teleferiğiyle Dajti Dağı’na çıkıp şehir manzarası eşliğinde yemek yiyin, akşam Blloku’nun kafe ve barlarında vakit geçirin."
          ],
          en: [
            "From Skanderbeg Square visit the fresco-adorned Et’hem Bey Mosque and see the mosaic façade of the National History Museum.",
            "Learn about the country’s isolated communist past at the Bunk’Art museums, set in former bunkers, and the House of Leaves.",
            "Ride the Dajti Ekspres cable car up Mount Dajti for a meal with city views, then spend the evening in Blloku’s cafés and bars."
          ],
          de: [
            "Vom Skanderbeg-Platz zur Et’hem-Bey-Moschee und zur Mosaikfassade des Nationalmuseums.",
            "Kommunistische Vergangenheit in den Bunk’Art-Museen und im Haus der Blätter kennenlernen.",
            "Mit der Seilbahn auf den Dajti und abends in die Cafés und Bars von Blloku."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Tavë kosi (yoğurtlu fırın kuzu)",
            "Fërgesë (biberli, peynirli güveç)",
            "Trileçe (üç sütlü kek)"
          ],
          en: [
            "Tavë kosi (baked lamb with yoghurt)",
            "Fërgesë (pepper and cheese bake)",
            "Trileçe (three-milk cake)"
          ],
          de: [
            "Tavë Kosi (Lamm mit Joghurt)",
            "Fërgesë (Paprika-Käse-Auflauf)",
            "Trileçe (Drei-Milch-Kuchen)"
          ]
        },
        criticalTips: {
          tr: [
            "Türk vatandaşları Arnavutluk’a 180 gün içinde 90 güne kadar vizesiz girebilir; para birimi lektir (ALL), sahilde avro da kabul edilir ama para üstü genellikle lek verilir.",
            "Kuzeydeki Arnavut Alpleri’ni görmek isterseniz İşkodra (Shkodër) üzerinden Theth’e 2 günlük bir ek yapın; Theth - Valbona yürüyüşü yalnızca yaz aylarında uygundur."
          ],
          en: [
            "Turkish citizens can enter Albania visa-free for up to 90 days within 180; the currency is the lek (ALL), and euros are accepted on the coast, though change is usually given in lek.",
            "To see the Albanian Alps in the north, add a 2-day extension to Theth via Shkodër; the Theth - Valbona hike is only suitable in summer."
          ],
          de: [
            "Visumfrei bis 90 Tage in 180; Währung Lek (ALL), Euro an der Küste akzeptiert.",
            "Für die Albanischen Alpen 2 Tage Theth über Shkodra anhängen; Wanderung Theth - Valbona nur im Sommer."
          ]
        },
        mapsQuery: "Skanderbeg Square, Tirana, Albania"
      },
      {
        name: {
          tr: "2. Durak: Berat (Bin Pencereli Şehir & Kale)",
          en: "Stop 2: Berat (City of a Thousand Windows & Castle)",
          de: "Stopp 2: Berat (Stadt der tausend Fenster & Burg)"
        },
        recommendedDuration: {
          tr: "1-2 Gün (Mangalem, Kala ve Osum Kanyonu)",
          en: "1-2 Days (Mangalem, the castle and Osum Canyon)",
          de: "1-2 Tage (Mangalem, Burg & Osum-Schlucht)"
        },
        durationBadge: {
          tr: "1-2 Gün",
          en: "1-2 Days",
          de: "1-2 Tage"
        },
        highlights: {
          tr: [
            "Mangalem & Gorica mahalleleri (UNESCO)",
            "Berat Kalesi (Kala) & Onufri İkon Müzesi",
            "Kurşunlu Cami & Halveti Tekkesi",
            "Osum Kanyonu"
          ],
          en: [
            "Mangalem & Gorica quarters (UNESCO)",
            "Berat Castle (Kala) & Onufri Icon Museum",
            "Lead Mosque & Halveti Tekke",
            "Osum Canyon"
          ],
          de: [
            "Viertel Mangalem & Gorica (UNESCO)",
            "Burg Berat (Kala) & Onufri-Ikonenmuseum",
            "Bleimoschee & Halveti-Tekke",
            "Osum-Schlucht"
          ]
        },
        activities: {
          tr: [
            "Osum Nehri’nin karşı yakasındaki Gorica’dan Mangalem’in yamaca dizilmiş beyaz evlerini ve pencerelerini fotoğraflayın.",
            "Hâlâ içinde insanların yaşadığı Berat Kalesi’ne çıkıp Onufri Müzesi’ndeki ikonları ve gün batımı manzarasını görün.",
            "İlkbaharda Osum Kanyonu’nda rafting yapın veya kanyon kenarındaki seyir noktalarına araçla gidin."
          ],
          en: [
            "Photograph the white, many-windowed houses of Mangalem stacked up the hillside from Gorica on the other bank of the Osum River.",
            "Climb up to Berat Castle, still inhabited today, to see the icons in the Onufri Museum and the sunset views.",
            "Go rafting in Osum Canyon in spring, or drive to the viewpoints along the canyon rim."
          ],
          de: [
            "Von Gorica aus die weißen Fensterhäuser von Mangalem fotografieren.",
            "Zur noch bewohnten Burg hinauf, Onufri-Ikonen und Sonnenuntergang.",
            "Im Frühling Rafting in der Osum-Schlucht oder zu den Aussichtspunkten fahren."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Berat usulü fırında kuzu & pilav",
            "Yerel zeytinyağı ve zeytinler",
            "Shesh i Bardhë beyaz şarabı (Berat bölgesi)"
          ],
          en: [
            "Berat-style roast lamb & rice",
            "Local olive oil and olives",
            "Shesh i Bardhë white wine (Berat region)"
          ],
          de: [
            "Lammbraten nach Berat-Art",
            "Lokales Olivenöl & Oliven",
            "Weißwein Shesh i Bardhë"
          ]
        },
        criticalTips: {
          tr: [
            "Kaleye çıkan arnavut kaldırımlı yol dik ve kaygandır; rahat ve kaymaz tabanlı ayakkabı giyin.",
            "Tarihi mahallelerdeki aile pansiyonları hem ucuz hem otantiktir; ancak araçla eski mahallelere giriş zordur, park yerini önceden sorun."
          ],
          en: [
            "The cobbled road up to the castle is steep and slippery; wear comfortable, non-slip shoes.",
            "Family guesthouses in the historic quarters are affordable and authentic, but driving into the old quarters is difficult, so ask about parking beforehand."
          ],
          de: [
            "Der Weg zur Burg ist steil und rutschig; rutschfeste Schuhe tragen.",
            "Familienpensionen sind authentisch; Parken in der Altstadt vorab klären."
          ]
        },
        mapsQuery: "Berat Castle, Berat, Albania"
      },
      {
        name: {
          tr: "3. Durak: Ergiri / Gjirokastër (Taş Şehir) & Mavi Göz",
          en: "Stop 3: Gjirokastër (Stone City) & the Blue Eye",
          de: "Stopp 3: Gjirokastra (Steinerne Stadt) & Blaues Auge"
        },
        recommendedDuration: {
          tr: "1-2 Gün (Eski şehir + Mavi Göz yol üstü)",
          en: "1-2 Days (Old town + Blue Eye en route)",
          de: "1-2 Tage (Altstadt + Blaues Auge unterwegs)"
        },
        durationBadge: {
          tr: "1-2 Gün",
          en: "1-2 Days",
          de: "1-2 Tage"
        },
        highlights: {
          tr: [
            "Ergiri Kalesi & Silah Müzesi",
            "Skenduli & Zekate konakları",
            "Eski Çarşı (Pazari i Vjetër)",
            "Mavi Göz (Syri i Kaltër) kaynağı"
          ],
          en: [
            "Gjirokastër Castle & Arms Museum",
            "Skenduli & Zekate tower houses",
            "Old Bazaar (Pazari i Vjetër)",
            "Blue Eye spring (Syri i Kaltër)"
          ],
          de: [
            "Burg Gjirokastra & Waffenmuseum",
            "Turmhäuser Skenduli & Zekate",
            "Alter Basar (Pazari i Vjetër)",
            "Quelle Blaues Auge (Syri i Kaltër)"
          ]
        },
        activities: {
          tr: [
            "Yamaçtaki kaleye çıkıp Soğuk Savaş döneminden kalma uçak ve top koleksiyonunu görün, vadinin manzarasını izleyin.",
            "Taş çatılı Osmanlı konaklarından Skenduli ve Zekate evlerini gezip yazar İsmail Kadare’nin ev müzesine uğrayın.",
            "Saranda yolunda dipsiz gibi görünen turkuaz Mavi Göz kaynağında mola verin."
          ],
          en: [
            "Climb to the hilltop castle to see its collection of artillery and a Cold War-era plane, and enjoy the views of the valley.",
            "Tour the stone-roofed Ottoman mansions of Skenduli and Zekate and stop by the house museum of writer Ismail Kadare.",
            "On the way to Sarandë stop at the turquoise Blue Eye spring, which looks bottomless."
          ],
          de: [
            "Zur Burg mit Kanonen und einem Flugzeug aus dem Kalten Krieg hinaufsteigen.",
            "Die osmanischen Häuser Skenduli und Zekate und das Ismail-Kadare-Museum besuchen.",
            "Auf dem Weg nach Saranda am türkisfarbenen Blauen Auge halten."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Qifqi (pirinç ve yumurtalı köfte, Ergiri’ye özgü)",
            "Oshaf (incirli koyun sütü tatlısı)",
            "Pashapqen (ıspanaklı, peynirli börek)"
          ],
          en: [
            "Qifqi (rice and egg balls, a Gjirokastër speciality)",
            "Oshaf (sheep’s-milk and fig pudding)",
            "Pashapqen (spinach and cheese pie)"
          ],
          de: [
            "Qifqi (Reisbällchen, Spezialität aus Gjirokastra)",
            "Oshaf (Schafsmilch-Feigen-Pudding)",
            "Pashapqen (Spinat-Käse-Pastete)"
          ]
        },
        criticalTips: {
          tr: [
            "Mavi Göz’de yüzmek ve kaynağa atlamak yasaktır; buz gibi suya girmeyin ve yaz kalabalığından kaçmak için sabah erken gidin.",
            "Ergiri’nin taş sokakları yağmurda çok kayganlaşır; ince tabanlı sandalet yerine sağlam ayakkabı tercih edin."
          ],
          en: [
            "Swimming and jumping into the Blue Eye are prohibited; stay out of the icy water and go early in the morning to avoid summer crowds.",
            "Gjirokastër’s stone streets become very slippery in the rain; wear sturdy shoes rather than thin-soled sandals."
          ],
          de: [
            "Baden im Blauen Auge verboten; früh morgens kommen.",
            "Die Steinstraßen sind bei Regen sehr rutschig; feste Schuhe tragen."
          ]
        },
        mapsQuery: "Gjirokastër Castle, Gjirokastër, Albania"
      },
      {
        name: {
          tr: "4. Durak: Saranda, Ksamil & Butrint (Arnavut Rivierası)",
          en: "Stop 4: Sarandë, Ksamil & Butrint (Albanian Riviera)",
          de: "Stopp 4: Saranda, Ksamil & Butrint (Albanische Riviera)"
        },
        recommendedDuration: {
          tr: "3 Gün (Butrint + Ksamil plajları + Riviera koyları)",
          en: "3 Days (Butrint + Ksamil beaches + Riviera coves)",
          de: "3 Tage (Butrint + Ksamil + Buchten der Riviera)"
        },
        durationBadge: {
          tr: "3 Gün",
          en: "3 Days",
          de: "3 Tage"
        },
        highlights: {
          tr: [
            "Butrint Milli Parkı antik kenti (UNESCO)",
            "Ksamil adaları & turkuaz plajlar",
            "Lëkurësi Kalesi gün batımı (Saranda)",
            "Himara, Dhërmi & Gjipe koyları"
          ],
          en: [
            "Butrint National Park ancient city (UNESCO)",
            "Ksamil islands & turquoise beaches",
            "Lëkurësi Castle sunset (Sarandë)",
            "Himarë, Dhërmi & Gjipe coves"
          ],
          de: [
            "Antike Stadt Butrint (UNESCO)",
            "Ksamil-Inseln & türkisfarbene Strände",
            "Sonnenuntergang an der Burg Lëkurësi",
            "Buchten von Himara, Dhërmi & Gjipe"
          ]
        },
        activities: {
          tr: [
            "Yunan, Roma, Bizans ve Venedik katmanlarını barındıran Butrint antik kentini lagün kıyısındaki ormanda sabah serinliğinde gezin.",
            "Ksamil’de kano veya tekneyle kıyıya yakın küçük adalara geçip berrak suda yüzün.",
            "Bir gün Riviera boyunca kuzeye sürüp Himara ve Dhërmi koylarını keşfedin; akşam Lëkurësi Kalesi’nden Saranda Körfezi’nde gün batımını izleyin."
          ],
          en: [
            "Explore ancient Butrint, with its Greek, Roman, Byzantine and Venetian layers, in the lagoon-side forest in the cool of the morning.",
            "In Ksamil paddle or take a boat to the small islands just offshore and swim in the clear water.",
            "Spend a day driving north along the Riviera to the coves of Himarë and Dhërmi; in the evening watch the sunset over Sarandë Bay from Lëkurësi Castle."
          ],
          de: [
            "Die antike Stadt Butrint mit griechischen, römischen, byzantinischen und venezianischen Schichten am Morgen erkunden.",
            "In Ksamil per Kanu oder Boot zu den kleinen Inseln und baden.",
            "Einen Tag die Riviera nach Norden bis Himara und Dhërmi fahren; abends Sonnenuntergang an der Burg Lëkurësi."
          ]
        },
        foodAndDrinks: {
          tr: [
            "Butrint lagünü midyeleri",
            "Izgara levrek, çipura & ahtapot",
            "Byrek & taze meyve suları"
          ],
          en: [
            "Butrint lagoon mussels",
            "Grilled sea bass, sea bream & octopus",
            "Byrek & fresh juices"
          ],
          de: [
            "Muscheln aus der Lagune von Butrint",
            "Gegrillter Wolfsbarsch, Dorade & Oktopus",
            "Byrek & frische Säfte"
          ]
        },
        criticalTips: {
          tr: [
            "Temmuz - Ağustos’ta Ksamil plajlarının çoğu ücretli şezlonglarla doludur; daha sakin bir deneyim için Haziran veya Eylül’ü seçin.",
            "Saranda’dan Korfu’ya feribot kalkar, ancak Yunanistan’a geçmek Türk vatandaşları için Schengen vizesi gerektirir."
          ],
          en: [
            "In July - August most of Ksamil’s beaches are covered with paid sunbeds; choose June or September for a calmer experience.",
            "Ferries run from Sarandë to Corfu, but entering Greece requires a Schengen visa for Turkish citizens."
          ],
          de: [
            "Im Juli - August sind die Strände voller kostenpflichtiger Liegen; Juni oder September sind ruhiger.",
            "Fähren nach Korfu fahren ab Saranda, für türkische Staatsbürger aber nur mit Schengen-Visum."
          ]
        },
        mapsQuery: "Butrint National Park, Albania"
      }
    ],
    signatureGastronomy: {
      dishes: {
        tr: [
          "Tavë kosi",
          "Fërgesë",
          "Qifqi",
          "Fasulye (Arnavut usulü kuru fasulye)"
        ],
        en: [
          "Tavë kosi",
          "Fërgesë",
          "Qifqi",
          "Fasule (Albanian bean stew)"
        ],
        de: [
          "Tavë Kosi",
          "Fërgesë",
          "Qifqi",
          "Fasule (albanischer Bohneneintopf)"
        ]
      },
      drinks: {
        tr: [
          "Raki (üzüm rakısı)",
          "Korça birası",
          "Dağ çayı (çaj mali)",
          "Dhallë (ayran)"
        ],
        en: [
          "Raki (grape brandy)",
          "Korça beer",
          "Mountain tea (çaj mali)",
          "Dhallë (ayran)"
        ],
        de: [
          "Raki (Traubenbrand)",
          "Korça-Bier",
          "Bergtee (Çaj Mali)",
          "Dhallë (Ayran)"
        ]
      },
      streetFoods: {
        tr: [
          "Byrek (peynirli / ıspanaklı)",
          "Qofte (ızgara köfte)",
          "Sufllaqe (Arnavut dürümü)",
          "Ballokume (Elbasan kurabiyesi)"
        ],
        en: [
          "Byrek (cheese / spinach)",
          "Qofte (grilled meatballs)",
          "Sufllaqe (Albanian gyros wrap)",
          "Ballokume (Elbasan cookies)"
        ],
        de: [
          "Byrek (Käse / Spinat)",
          "Qofte (Hackfleischröllchen)",
          "Sufllaqe (albanischer Gyros-Wrap)",
          "Ballokume (Kekse aus Elbasan)"
        ]
      },
      diningAdvice: {
        tr: "Arnavutluk Balkanlar’ın en uygun fiyatlı ülkelerinden biridir; porsiyonlar büyüktür ve misafirperverlik yüksektir. Bazı yaşlı satıcılar fiyatları “eski lek” ile (on katı) söyleyebilir; şüphede kalırsanız teyit edin. Bahşiş zorunlu değildir, hesabı yuvarlamak takdir edilir.",
        en: "Albania is one of the most affordable countries in the Balkans; portions are large and hospitality is warm. Some older vendors may quote prices in “old lek” (ten times the amount); confirm if in doubt. Tipping isn’t compulsory, but rounding up is appreciated.",
        de: "Eines der günstigsten Länder des Balkans. Manche nennen Preise in „altem Lek“ (zehnfach); nachfragen. Aufrunden wird geschätzt."
      }
    },
    packingAndPrecautions: {
      essentials: {
        tr: [
          "Pasaport (en az 3 ay geçerli olmalı)",
          "Kaymaz tabanlı ayakkabı (Berat ve Ergiri’nin taş sokakları için)",
          "Mayo, şnorkel maskesi ve su ayakkabısı (çakıllı plajlar)",
          "Nakit lek (küçük işletmeler kart kabul etmeyebilir)"
        ],
        en: [
          "Passport (should be valid for at least 3 more months)",
          "Non-slip shoes (for the stone streets of Berat and Gjirokastër)",
          "Swimwear, snorkel mask and water shoes (pebbly beaches)",
          "Cash in lek (small businesses may not take cards)"
        ],
        de: [
          "Reisepass (mind. 3 Monate gültig)",
          "Rutschfeste Schuhe für Berat & Gjirokastra",
          "Badesachen, Schnorchel & Wasserschuhe",
          "Bargeld in Lek"
        ]
      },
      safetyAndEtiquette: {
        tr: [
          "Arnavutluk’ta sürüş tarzı agresif olabilir ve dağ yollarında aniden hayvanlar çıkabilir; gece sürüşünden kaçının.",
          "Riviera’daki tekne turlarında can yeleği olup olmadığını kontrol edin ve lisanslı işletmeleri tercih edin.",
          "Yazın Riviera yolunda (özellikle Llogara Geçidi) trafik yoğundur; yolculuk sürelerini uzun tutun."
        ],
        en: [
          "Driving in Albania can be aggressive and animals may appear suddenly on mountain roads; avoid driving at night.",
          "On Riviera boat trips check that life jackets are on board and choose licensed operators.",
          "In summer the Riviera road (especially the Llogara Pass) is busy; allow generous travel times."
        ],
        de: [
          "Aggressiver Fahrstil, Tiere auf Bergstraßen; Nachtfahrten meiden.",
          "Bei Bootstouren auf Schwimmwesten achten und lizenzierte Anbieter wählen.",
          "Im Sommer viel Verkehr auf der Riviera-Straße (Llogara-Pass)."
        ]
      }
    }
  }
};
