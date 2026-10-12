/**
 * Vizamigo - Ülke Kültür, Turizm, Dil, Tarih, Gastronomi ve Ekonomi Ansiklopedisi
 * 199 ülke için kapsamlı kültürel görgü kuralları, gezilecek yerler, dini normlar,
 * pratik diller/cümleler, öz tarihçe, lezzetler, ünlüler ve ekonomik göstergeler.
 */

import { getCountryName } from './passportData';
import { GEO_DATA } from './geoData';
import { getCountryInsights } from './countryInsights';
import { CURATED_EXTRA } from './countryEncyclopediaCuratedExtra';
import { CURATED_EXTRA_2 } from './countryEncyclopediaCuratedExtra2';
import { CURATED_EXTRA_3 } from './countryEncyclopediaCuratedExtra3';
import { COUNTRY_HERITAGE } from './countryEncyclopediaLandmarks';
import { getCountryVisual } from './countryVisuals';
import { lText } from '../i18n';

export interface EncyclopediaPhrase {
  phrase: string;
  translation: string;
  meaning: string;
  pronunciation?: string;
}

export interface CountryEncyclopediaData {
  countryCode: string;
  countryName: string;
  culture: {
    etiquette: string[]; // Görgü kuralları, selamlaşma, sosyal normlar
    festivals: string[]; // Önemli festivaller ve kutlamalar
    lifestyle: string; // Yaşam tarzı, toplumsal dinamikler, misafirperverlik
  };
  tourism: {
    mustSeePlaces: string[]; // Gezilecek ikonik yerler ve UNESCO mirasları
    bestSeasons: string; // İdeal seyahat mevsimi
    travelStyleTip: string; // Gezgin tarzı tavsiyesi
  };
  religion: {
    primaryReligions: string; // Dini yapı ve demografi
    respectNorms: string; // İbadethane ve kutsal mekan ziyaret kuralları
    sacredSites: string[]; // Önemli kutsal yapılar
  };
  language: {
    officialLanguages: string; // Resmi ve yaygın konuşulan diller
    englishProficiency: string; // İngilizce bilinirlik düzeyi
    phrases: EncyclopediaPhrase[]; // Pratik seyahat cümleleri
  };
  history: {
    conciseHistory: string; // Kısa ve öz tarihçe
    milestones: string[]; // Tarihi dönüm noktaları
  };
  gastronomy: {
    famousDishes: string[]; // Meşhur milli yemekler
    traditionalDrinks: string[]; // Geleneksel içecekler
    streetFoodAndDesserts: string[]; // Sokak lezzetleri ve tatlılar
  };
  achievements: {
    famousFigures: string[]; // Dünyaca ünlü şahsiyetler
    strongSectors: string[]; // Dünyada lider veya başarılı olduğu alanlar
  };
  economy: {
    paymentCulture: string; // Kart kabul oranı ve nakit ihtiyacı
    economicPillars: string; // Lokomotif sektörler ve ekonomik güç
    tippingCulture: string; // Bahşiş kültürü ve beklentiler
  };
}

export interface CuratedEntry {
  culture: {
    etiquette: { tr: string[]; en: string[]; de: string[] };
    festivals: { tr: string[]; en: string[]; de: string[] };
    lifestyle: { tr: string; en: string; de: string };
  };
  tourism: {
    mustSeePlaces: { tr: string[]; en: string[]; de: string[] };
    bestSeasons: { tr: string; en: string; de: string };
    travelStyleTip: { tr: string; en: string; de: string };
  };
  religion: {
    primaryReligions: { tr: string; en: string; de: string };
    respectNorms: { tr: string; en: string; de: string };
    sacredSites: { tr: string[]; en: string[]; de: string[] };
  };
  language: {
    officialLanguages: { tr: string; en: string; de: string };
    englishProficiency: { tr: string; en: string; de: string };
    phrases: Array<{
      phrase: string;
      meaningTr: string;
      meaningEn: string;
      meaningDe: string;
      pronunciation?: string;
    }>;
  };
  history: {
    conciseHistory: { tr: string; en: string; de: string };
    milestones: { tr: string[]; en: string[]; de: string[] };
  };
  gastronomy: {
    famousDishes: { tr: string[]; en: string[]; de: string[] };
    traditionalDrinks: { tr: string[]; en: string[]; de: string[] };
    streetFoodAndDesserts: { tr: string[]; en: string[]; de: string[] };
  };
  achievements: {
    famousFigures: { tr: string[]; en: string[]; de: string[] };
    strongSectors: { tr: string[]; en: string[]; de: string[] };
  };
  economy: {
    paymentCulture: { tr: string; en: string; de: string };
    economicPillars: { tr: string; en: string; de: string };
    tippingCulture: { tr: string; en: string; de: string };
  };
}

export const CURATED_ENCYCLOPEDIA: Record<string, CuratedEntry> = {
  // Türkiye
  TR: {
    culture: {
      etiquette: {
        tr: [
          'Evlere ve camilere girerken ayakkabılar mutlaka çıkarılır.',
          'Misafire çay veya kahve ikramı sıcak karşılamanın temel göstergesidir; reddetmek hoş karşılanmayabilir.',
          'Büyüklere saygı esastır; toplu taşımada yaşlılara ve hamilelere yer verilir.',
          'Pazarlık semt pazarlarında ve hediyelik eşya dükkanlarında yaygındır ancak kurumsal mağazalarda yapılmaz.'
        ],
        en: [
          'Shoes must be removed before entering homes and mosques.',
          'Offering tea or Turkish coffee is the quintessential gesture of hospitality; declining directly may seem impolite.',
          'Deep respect for elders; giving up your seat on public transit is expected.',
          'Bargaining is common in bazaars and souvenir markets, but not in modern retail shops.'
        ],
        de: [
          'Beim Betreten von Wohnungen und Moscheen müssen die Schuhe ausgezogen werden.',
          'Das Anbieten von Tee oder türkischem Kaffee ist das Herzstück der Gastfreundschaft.',
          'Großer Respekt vor älteren Menschen; Plätze in öffentlichen Verkehrsmitteln freimachen wird geschätzt.',
          'Feilschen ist auf Basaren und Souvenirmärkten üblich, nicht jedoch in modernen Geschäften.'
        ]
      },
      festivals: {
        tr: ['Ramazan & Kurban Bayramı', '29 Ekim Cumhuriyet Bayramı', 'İstanbul Caz & Film Festivalleri', 'Kırkpınar Yağlı Güreşleri', 'Kapadokya Balon Festivali'],
        en: ['Ramadan & Eid al-Adha', 'Republic Day (October 29)', 'Istanbul Jazz & Film Festivals', 'Kirkpinar Oil Wrestling', 'Cappadocia Balloon Festival'],
        de: ['Zuckerfest & Opferfest', 'Tag der Republik (29. Oktober)', 'Istanbul Jazz- & Filmfestival', 'Kirkpinar-Ölringen', 'Kappadokien Ballonfestival']
      },
      lifestyle: {
        tr: 'Akdeniz sıcaklığı ile Doğu misafirperverliğinin eşsiz sentezi. Aile bağları kuvvetli, çay bahçeleri ve sokak sosyalleşmesi hayatın merkezindedir.',
        en: 'A unique synthesis of Mediterranean warmth and Eastern hospitality. Strong family bonds, vibrant tea gardens, and rich social street life.',
        de: 'Einzigartige Synthese aus mediterraner Herzlichkeit und orientalischer Gastfreundschaft. Enge Familienbande, Teegärten und lebhaftes Straßenleben.'
      }
    },
    tourism: {
      mustSeePlaces: {
        tr: ['Ayasofya & Sultanahmet (İstanbul)', 'Kapadokya Peri Bacaları (Nevşehir)', 'Efes Antik Kenti (İzmir)', 'Pamukkale Travertenleri (Denizli)', 'Ölüdeniz & Likya Yolu (Muğla/Antalya)', 'Sümela Manastırı (Trabzon)'],
        en: ['Hagia Sophia & Blue Mosque (Istanbul)', 'Cappadocia Fairy Chimneys (Nevsehir)', 'Ancient Ephesus (Izmir)', 'Pamukkale Travertines (Denizli)', 'Oludeniz & Lycian Way (Mugla/Antalya)', 'Sumela Monastery (Trabzon)'],
        de: ['Hagia Sophia & Blaue Moschee (Istanbul)', 'Kappadokien Feenkamine (Nevsehir)', 'Antikes Ephesos (Izmir)', 'Pamukkale Kalksinterterrassen (Denizli)', 'Ölüdeniz & Lykischer Weg (Mugla/Antalya)', 'Sumela-Kloster (Trabzon)']
      },
      bestSeasons: {
        tr: 'Nisan - Haziran (İlkbahar) ve Eylül - Kasım (Sonbahar) kültür gezileri için; Haziran - Eylül sahil turizmi için idealdir.',
        en: 'April - June (Spring) and September - November (Autumn) for cultural exploration; June - September for coastal beach holidays.',
        de: 'April - Juni (Frühling) und September - November (Herbst) für Kulturreisen; Juni - September für Badeurlaub.'
      },
      travelStyleTip: {
        tr: 'İstanbul’da vapurla kıtalararası geçiş yapın; Ege ve Akdeniz kıyılarında araba kiralayarak antik kentleri keşfedin.',
        en: 'Take a commuter ferry across continents in Istanbul; rent a car along the Aegean & Mediterranean coasts to explore secluded ruins.',
        de: 'Fahren Sie mit der Fähre zwischen den Kontinenten in Istanbul; mieten Sie ein Auto an der Ägäis, um antike Stätten zu erkunden.'
      }
    },
    religion: {
      primaryReligions: {
        tr: 'Müslüman (~%98, çoğunlukla Sünni ve Alevi), Hristiyan ve Musevi azınlık toplulukları.',
        en: 'Muslim (~98%, predominantly Sunni and Alevi), with Christian and Jewish historical communities.',
        de: 'Muslimisch (~98%, überwiegend Sunniten und Aleviten), historische christliche und jüdische Gemeinden.'
      },
      respectNorms: {
        tr: 'Cami ziyaretlerinde omuzlar ve dizler örtülü olmalı, kadınlar baş örtüsü takmalıdır. Girişte ayakkabılar çıkarılır, ibadet edenlerin önünden geçilmez.',
        en: 'Cover shoulders and knees in mosques; women must wear a headscarf. Remove shoes upon entering and avoid walking in front of those praying.',
        de: 'Schultern und Knie in Moscheen bedecken; Frauen tragen ein Kopftuch. Schuhe am Eingang ausziehen, nicht vor Betenden hergehen.'
      },
      sacredSites: {
        tr: ['Sultanahmet Camii (İstanbul)', 'Mevlana Müzesi ve Türbesi (Konya)', 'Meryem Ana Evi (Selçuk/İzmir)', 'Mor Gabriel Manastırı (Mardin)'],
        en: ['Blue Mosque (Istanbul)', 'Mevlana Rumi Mausoleum (Konya)', 'House of the Virgin Mary (Ephesus)', 'Mor Gabriel Monastery (Mardin)'],
        de: ['Blaue Moschee (Istanbul)', 'Mevlana-Mausoleum (Konya)', 'Haus der Mutter Maria (Ephesos)', 'Kloster Mor Gabriel (Mardin)']
      }
    },
    language: {
      officialLanguages: {
        tr: 'Türkçe (Resmi dil). Turistik bölgelerde İngilizce, Rusça ve Almanca yaygındır.',
        en: 'Turkish (Official). English, Russian, and German widely understood in tourist hubs.',
        de: 'Türkisch (Amtssprache). Englisch, Russisch und Deutsch in Tourismusgebieten verbreitet.'
      },
      englishProficiency: {
        tr: 'Turizm, havacılık ve otellerde yüksek; kırsalda ve küçük esnafta temel düzeydedir.',
        en: 'High in hospitality, aviation, and major cities; basic in rural regions.',
        de: 'Gut in Hotels und Metropolen; grundlegend in ländlichen Gebieten.'
      },
      phrases: [
        { phrase: 'Merhaba', meaningTr: 'Selamlama', meaningEn: 'Hello', meaningDe: 'Hallo', pronunciation: 'mehr-hah-bah' },
        { phrase: 'Teşekkür ederim', meaningTr: 'Şükran bildirme', meaningEn: 'Thank you', meaningDe: 'Danke schön', pronunciation: 'teh-sheh-koor eh-deh-reem' },
        { phrase: 'Lütfen', meaningTr: 'Rica', meaningEn: 'Please', meaningDe: 'Bitte', pronunciation: 'loot-fen' },
        { phrase: 'Bu ne kadar?', meaningTr: 'Fiyat sorma', meaningEn: 'How much is this?', meaningDe: 'Wie viel kostet das?', pronunciation: 'boo neh kah-dahr' },
        { phrase: 'Hesap lütfen', meaningTr: 'Restoranda hesap', meaningEn: 'Check please', meaningDe: 'Die Rechnung, bitte', pronunciation: 'heh-sahp loot-fen' },
        { phrase: 'İmdat / Yardım edin!', meaningTr: 'Acil durum', meaningEn: 'Help!', meaningDe: 'Hilfe!', pronunciation: 'eem-daht / yahr-duhm eh-deen' }
      ]
    },
    history: {
      conciseHistory: {
        tr: 'Göbeklitepe ile başlayan 12.000 yıllık medeniyetler beşiği. Hitit, Grek, Roma, Bizans ve Osmanlı İmparatorlukları sonrasında 1923’te Mustafa Kemal Atatürk önderliğinde modern Türkiye Cumhuriyeti kuruldu.',
        en: 'Cradle of civilizations spanning 12,000 years from Gobekli Tepe. Home to Hittite, Roman, Byzantine, and Ottoman Empires, founded as a modern Republic in 1923 by Mustafa Kemal Atatürk.',
        de: 'Wiege der Zivilisation seit 12.000 Jahren (Göbekli Tepe). Heimat der Hethiter, Römer, Byzantiner und Osmanen; 1923 von Mustafa Kemal Atatürk als moderne Republik gegründet.'
      },
      milestones: {
        tr: ['MÖ 9600: Göbeklitepe tapınak kompleksi', '1453: İstanbul’un Fethi', '1923: Türkiye Cumhuriyeti’nin Kuruluşu', '1952: NATO Üyeliği'],
        en: ['9600 BC: Gobekli Tepe sanctuary', '1453: Fall of Constantinople', '1923: Foundation of the Republic of Turkey', '1952: NATO Accession'],
        de: ['9600 v. Chr.: Göbekli Tepe', '1453: Eroberung von Konstantinopel', '1923: Gründung der Republik Türkei', '1952: NATO-Beitritt']
      }
    },
    gastronomy: {
      famousDishes: {
        tr: ['Kebap çeşitleri (İskender, Adana, Urfa)', 'Mantı (Yoğurtlu ve soslu Türk mantısı)', 'Karnıyarık & Zeytinyağlılar', 'Lahmacun & Pide'],
        en: ['Turkish Kebabs (Iskender, Adana, Urfa)', 'Manti (Turkish ravioli with garlic yogurt)', 'Olive oil dolma & stuffed eggplants', 'Lahmacun & Turkish Pide'],
        de: ['Kebab-Varianten (Iskender, Adana)', 'Manti (gefüllte Teigtaschen mit Knoblauchjoghurt)', 'Gefüllte Auberginen & Olivenölgerichte', 'Lahmacun & Pide']
      },
      traditionalDrinks: {
        tr: ['Türk Çayı (İnce belli bardakta)', 'Türk Kahvesi (Közde pişirilmiş)', 'Ayran', 'Rakı (Aslan sütü)', 'Salep & Boza'],
        en: ['Turkish Tea (Rize black tea)', 'Turkish Coffee with Turkish delight', 'Ayran (salted yogurt drink)', 'Raki (anise spirit)', 'Sahlep & Boza'],
        de: ['Türkischer Schwarztee', 'Türkischer Mokka mit Lokum', 'Ayran (erfrischender Joghurtdrink)', 'Raki (Anisschnaps)', 'Salep & Boza']
      },
      streetFoodAndDesserts: {
        tr: ['Gaziantep Baklavası', 'Künefe', 'Sokak Simidi & Kestane', 'Balık Ekmek (Eminönü)', 'Kokoreç & Islak Kek'],
        en: ['Antep Pistachio Baklava', 'Kunefe (melted cheese pastry)', 'Crispy Simit', 'Fish Sandwich (Bosphorus Balik Ekmek)', 'Kokorec'],
        de: ['Pistazien-Baklava aus Gaziantep', 'Künefe (warmer Käse-Kadaif)', 'Sesamring Simit', 'Fischbrötchen am Bosporus', 'Kokorec']
      }
    },
    achievements: {
      famousFigures: {
        tr: ['Mustafa Kemal Atatürk (Kurucu Lider)', 'Aziz Sancar (Nobel Kimya Ödülü)', 'Orhan Pamuk (Nobel Edebiyat Ödülü)', 'Mimar Sinan (Baş Mimar)', 'Nuri Bilge Ceylan (Altın Palmiye)'],
        en: ['Mustafa Kemal Atatürk (Founding Statesman)', 'Aziz Sancar (Nobel Chemistry Laureate)', 'Orhan Pamuk (Nobel Literature Laureate)', 'Mimar Sinan (Grand Master Architect)', 'Nuri Bilge Ceylan (Cannes Palme d\'Or)'],
        de: ['Mustafa Kemal Atatürk (Staatsgründer)', 'Aziz Sancar (Nobelpreis für Chemie)', 'Orhan Pamuk (Nobelpreis für Literatur)', 'Mimar Sinan (Großer Architekt)', 'Nuri Bilge Ceylan (Goldene Palme)']
      },
      strongSectors: {
        tr: ['Dünya Turizm Liderliği (İlk 5)', 'Savunma Sanayii & İHA/SİHA Teknolojileri', 'Tekstil & Konfeksiyon İhracatı', 'Otomotiv Yan Sanayii', 'Sağlık Turizmi & Saç Ekimi'],
        en: ['Global Tourism Top 5', 'Aviation, Drones & Defense Tech', 'Textile & Apparel Manufacturing', 'Automotive Assembly', 'Medical & Dental Tourism'],
        de: ['Top 5 Welttourismus', 'Drohnen- & Verteidigungstechnologie', 'Textil- & Bekleidungsindustrie', 'Automobilbau', 'Medizintourismus']
      }
    },
    economy: {
      paymentCulture: {
        tr: 'Kredi ve banka kartı kullanımı çok yaygındır (%95 temassız). Taksilerde ve küçük bakkallarda nakit TL veya karekod gerekebilir.',
        en: 'Credit & debit card acceptance is extremely high (95% contactless). Small street stalls or rural taxis may require cash TRY.',
        de: 'Kreditkarten- und Kartenzahlung ist extrem weit verbreitet (95% kontaktlos). Taxis oder Kioske verlangen teils Bargeld.'
      },
      economicPillars: {
        tr: 'İmalat sanayii, turizm, inşaat, tarım ve otomotiv ihracatı temel lokomotiflerdir.',
        en: 'Manufacturing, tourism, construction, agriculture, and commercial vehicle export.',
        de: 'Industrieproduktion, Tourismus, Bauwirtschaft, Landwirtschaft und Fahrzeugexport.'
      },
      tippingCulture: {
        tr: 'Restoranlarda %10-15 bahşiş teamüldür. Faturaya servis ücreti eklenmiş olsa dahi garsona nakit bırakılması takdir edilir.',
        en: '10-15% tip is customary in dining. Even if service is charged on the bill, small cash tip directly to server is appreciated.',
        de: '10-15% Trinkgeld im Restaurant ist üblich. Ein kleiner Barbetrag direkt an die Bedienung wird sehr geschätzt.'
      }
    }
  },

  // Fransa
  FR: {
    culture: {
      etiquette: {
        tr: [
          'Dükkanlara veya kafelere girerken mutlaka "Bonjour" (İyi günler) denmelidir; selam vermemek saygısızlık kabul edilir.',
          'Yemek yemek bir sanattır; hızlıca atıştırmak yerine yemeğin tadını çıkararak masada uzun süre oturulur.',
          'Resmi hitapta "Vous" (Siz) kullanılır; samimi "Tu" (Sen) yalnızca yakın arkadaşlar arasındadır.',
          'Sokakta yüksek sesle bağırmak veya aşırı taşkın davranışlar hoş karşılanmaz.'
        ],
        en: [
          'Always greet shopkeepers with "Bonjour" upon entering; failing to greet is considered rude.',
          'Dining is an art form; meals are unhurried and celebrated around the table.',
          'Use polite "Vous" rather than informal "Tu" unless invited to do so.',
          'Speaking loudly in public spaces or being disruptive is frowned upon.'
        ],
        de: [
          'Beim Betreten von Geschäften immer mit "Bonjour" grüßen.',
          'Essen ist Kultur; Mahlzeiten werden ausgiebig zelebriert.',
          'Höfliche Anrede "Vous" (Sie) nutzen; das Duzen ("Tu") ist Freunden vorbehalten.',
          'Lautes Verhalten in der Öffentlichkeit gilt als unfein.'
        ]
      },
      festivals: {
        tr: ['14 Temmuz Bastille Günü', 'Cannes Film Festivali', 'Fête de la Musique (21 Haziran Müzik Bayramı)', 'Tour de France Bitişi', 'Nice Karnavalı'],
        en: ['Bastille Day (July 14)', 'Cannes International Film Festival', 'Fête de la Musique (World Music Day)', 'Tour de France Finale', 'Nice Carnival'],
        de: ['Nationalfeiertag (14. Juli)', 'Filmfestspiele von Cannes', 'Fête de la Musique', 'Tour de France Finale', 'Karneval von Nizza']
      },
      lifestyle: {
        tr: '"Art de vivre" (Yaşama Sanatı) felsefesi; kafe terasları, sanat galerileri, uzun akşam yemekleri ve şık estetik.',
        en: '"Art de vivre" (Art of living); sidewalk cafes, literature, museum visits, and gourmet culinary appreciation.',
        de: '"Art de vivre" (Lebenskunst); Straßencafés, Kultur, Genuss und Savoir-vivre.'
      }
    },
    tourism: {
      mustSeePlaces: {
        tr: ['Eyfel Kulesi & Louvre Müzesi (Paris)', 'Versailles Sarayı', 'Mont Saint-Michel (Normandiya)', 'Fransız Rivierası (Cote d’Azur / Nice)', 'Loire Vadisi Şatoları', 'Chamonix Mont-Blanc Alpleri'],
        en: ['Eiffel Tower & Louvre Museum (Paris)', 'Palace of Versailles', 'Mont Saint-Michel (Normandy)', 'French Riviera (Nice, Cannes)', 'Châteaux of the Loire Valley', 'Chamonix Mont-Blanc'],
        de: ['Eiffelturm & Louvre (Paris)', 'Schloss Versailles', 'Mont Saint-Michel', 'Côte d’Azur (Nizza)', 'Schlösser der Loire', 'Chamonix Mont-Blanc']
      },
      bestSeasons: {
        tr: 'Nisan - Haziran ve Eylül - Ekim arası Paris ve şarap bölgeleri için; Temmuz - Ağustos Akdeniz sahilleri için en popülerdir.',
        en: 'April - June and September - October for Paris and wine country; July - August for Mediterranean beaches.',
        de: 'April - Juni und September - Oktober für Städtereisen; Sommer für die Côte d’Azur.'
      },
      travelStyleTip: {
        tr: 'TGV (hızlı tren) ile Paris’ten Lyon, Marsilya ve Bordeaux’ya 2 saatte ulaşın; metro için Île-de-France Navigo Pass kullanın.',
        en: 'Use high-speed TGV trains across cities; get an Île-de-France transport pass for Paris Metro.',
        de: 'TGV-Schnellzüge für Fernreisen nutzen; Navigo Easy Pass für die Pariser Métro.'
      }
    },
    religion: {
      primaryReligions: {
        tr: 'Katolik Hristiyan (~%47), Seküler / Dinsiz (~%40), Müslüman (~%9), Musevi (~%1).',
        en: 'Catholic Christian (~47%), Secular / Non-religious (~40%), Muslim (~9%), Jewish (~1%).',
        de: 'Katholisch (~47%), Konfessionslos (~40%), Muslimisch (~9%).'
      },
      respectNorms: {
        tr: 'Laiklik (Laïcité) devletin temel ilkesidir. Katedrallerde sessizlik korunmalı, şapkalar çıkarılmalıdır.',
        en: 'State secularism (Laïcité) is constitutional. Maintain silence and respectful attire in historic cathedrals.',
        de: 'Strikter Laizismus im Staat. In Kathedralen wird Ruhe und angemessene Kleidung erwartet.'
      },
      sacredSites: {
        tr: ['Notre-Dame Katedrali (Paris)', 'Sacre-Coeur Bazilikası (Montmartre)', 'Chartres Katedrali', 'Lourdes Kutsal Alanı'],
        en: ['Notre-Dame Cathedral (Paris)', 'Sacré-Cœur Basilica (Montmartre)', 'Chartres Cathedral', 'Sanctuary of Our Lady of Lourdes'],
        de: ['Kathedrale Notre-Dame de Paris', 'Sacré-Cœur (Montmartre)', 'Kathedrale von Chartres', 'Wallfahrtsort Lourdes']
      }
    },
    language: {
      officialLanguages: {
        tr: 'Fransızca (Français). Şehirlerde ve genç nesilde İngilizce bilinir ancak önce Fransızca selamlaşmak büyük saygı görür.',
        en: 'French (Français). English is spoken in hotels and cities, but starting with "Bonjour" changes everything.',
        de: 'Französisch. Englisch in Metropolen üblich; Begrüßung auf Französisch öffnet Türen.'
      },
      englishProficiency: {
        tr: 'Turizm ve otelcilikte iyi; yerel mekanlarda birkaç kelime Fransızca takdirle karşılanır.',
        en: 'Moderate to high in hospitality; attempting basic French phrases is warmly appreciated.',
        de: 'Gut im Tourismus; Grundkenntnisse auf Französisch werden sehr geschätzt.'
      },
      phrases: [
        { phrase: 'Bonjour', meaningTr: 'Merhaba / İyi günler', meaningEn: 'Hello / Good morning', meaningDe: 'Guten Tag / Hallo', pronunciation: 'bon-zhoor' },
        { phrase: 'Merci beaucoup', meaningTr: 'Çok teşekkürler', meaningEn: 'Thank you very much', meaningDe: 'Vielen Dank', pronunciation: 'mehr-see boh-koo' },
        { phrase: 'S\'il vous plaît', meaningTr: 'Lütfen', meaningEn: 'Please', meaningDe: 'Bitte', pronunciation: 'seel voo pleh' },
        { phrase: 'C\'est combien?', meaningTr: 'Bu ne kadar?', meaningEn: 'How much is it?', meaningDe: 'Wie viel kostet das?', pronunciation: 'seh kom-byan' },
        { phrase: 'L\'addition, s\'il vous plaît', meaningTr: 'Hesap lütfen', meaningEn: 'The check please', meaningDe: 'Die Rechnung, bitte', pronunciation: 'lah-dee-syon seel voo pleh' },
        { phrase: 'Au secours! / Aidez-moi!', meaningTr: 'İmdat / Yardım edin!', meaningEn: 'Help me!', meaningDe: 'Hilfe!', pronunciation: 'oh suh-koor' }
      ]
    },
    history: {
      conciseHistory: {
        tr: 'Galyalılar ve Şarlman’dan başlayıp 1789 Fransız İhtilali ile "Özgürlük, Eşitlik, Kardeşlik" ilkelerini dünyaya yayan cumhuriyet. Aydınlanma felsefesi ve sanatın global başkenti.',
        en: 'From Roman Gaul and Charlemagne to the 1789 French Revolution proclaiming "Liberté, Égalité, Fraternité." Global cradle of Enlightenment, cinema, and haute culture.',
        de: 'Von den Galliern und Karl dem Großen über die Französische Revolution 1789 ("Freiheit, Gleichheit, Brüderlichkeit") bis zur heutigen Führungsrolle in Europa.'
      },
      milestones: {
        tr: ['1789: Fransız İhtilali & İnsan Hakları Bildirgesi', '1804: Napolyon İmparatorluğu', '1889: Eyfel Kulesi’nin inşası', '1957: Avrupa Birliği kurucu antlaşması'],
        en: ['1789: French Revolution', '1804: Napoleonic Empire', '1889: Eiffel Tower completed for World Fair', '1957: Treaty of Rome (EU foundation)'],
        de: ['1789: Französische Revolution', '1804: Napoleonisches Kaiserreich', '1889: Bau des Eiffelturms', '1957: Römische Verträge (EU-Gründung)']
      }
    },
    gastronomy: {
      famousDishes: {
        tr: ['Boeuf Bourguignon (Şarapta dana yahni)', 'Kruvasan & Pain au Chocolat', 'Duck Confit (Fırınlanmış ördek)', 'Ratatouille (Sebze yahnisi) & Fransız Soğan Çorbası'],
        en: ['Boeuf Bourguignon (beef in red wine sauce)', 'Fresh Butter Croissants & Baguettes', 'Duck Confit with roasted potatoes', 'Traditional French Onion Soup & Ratatouille'],
        de: ['Boeuf Bourguignon (Rindfleischschmortopf)', 'Butter-Croissant & Baguette', 'Enten-Confit', 'Französische Zwiebelsuppe & Ratatouille']
      },
      traditionalDrinks: {
        tr: ['Bordeaux & Bourgogne Şarapları', 'Şampanya (Champagne)', 'Pastis (Anasonlu aperitif)', 'Café au Lait & Espresso'],
        en: ['Bordeaux and Burgundy Fine Wines', 'Authentic Champagne', 'Pastis anise aperitif', 'Café au lait and double espresso'],
        de: ['Bordeaux- und Burgunder-Weine', 'Champagner aus der Champagne', 'Pastis (Anisschnaps)', 'Café au Lait']
      },
      streetFoodAndDesserts: {
        tr: ['Crêpe & Galette (Nutellalı veya tuzlu)', 'Renkli Makaronlar (Ladurée)', 'Crème Brûlée', 'Eclair & Tarte Tatin'],
        en: ['Brittany Crêpes and savory Galettes', 'Parisian Macarons', 'Caramelized Crème Brûlée', 'Chocolate Éclairs and Tarte Tatin'],
        de: ['Bretonische Crêpes & Galettes', 'Macarons', 'Crème Brûlée', 'Éclairs & Tarte Tatin']
      }
    },
    achievements: {
      famousFigures: {
        tr: ['Victor Hugo & Voltaire', 'Napolyon Bonapart', 'Marie Curie (2 Nobel Ödüllü Fizikçi/Kimyacı)', 'Claude Monet (Empresyonizm)', 'Zinedine Zidane & Kylian Mbappé'],
        en: ['Victor Hugo & Voltaire (Literary masters)', 'Napoleon Bonaparte', 'Marie Curie (Two-time Nobel Laureate)', 'Claude Monet (Impressionist painter)', 'Zinedine Zidane & Kylian Mbappé'],
        de: ['Victor Hugo & Voltaire', 'Napoleon Bonaparte', 'Marie Curie (Nobelpreisträgerin)', 'Claude Monet (Maler)', 'Zinedine Zidane & Kylian Mbappé']
      },
      strongSectors: {
        tr: ['Lüks Moda & Parfüm (LVMH, Chanel, Hermes)', 'Dünya Gastronomi & Şarapçılık Liderliği', 'Havacılık & Uzay (Airbus)', 'Nükleer Enerji ve Yüksek Hızlı Trenler (TGV)'],
        en: ['Luxury Fashion & Haute Couture (LVMH, Chanel)', 'Global Gastronomy & Winemaking', 'Aerospace Engineering (Airbus)', 'Civil Nuclear Energy & High-Speed Rail'],
        de: ['Luxusgüter & Mode (LVMH, Chanel, Hermès)', 'Spitzengastronomie & Weinbau', 'Luft- und Raumfahrt (Airbus)', 'Kernenergie & TGV-Bahnnetz']
      }
    },
    economy: {
      paymentCulture: {
        tr: 'Temassız kart ve Apple Pay kullanımı %98 oranındadır. Kafelerde tek bir kahve için dahi kart geçerlidir.',
        en: 'Extremely cashless; contactless card and Apple Pay accepted virtually everywhere down to €1 bakery items.',
        de: 'Fast ausnahmslos bargeldlos (98% Kartenzahlung, auch für Kleinstbeträge beim Bäcker).'
      },
      economicPillars: {
        tr: 'Dünyanın en çok ziyaret edilen turizm ülkesi; lüks tüketim, tarım, havacılık ve finans.',
        en: 'World’s #1 tourist destination by arrivals; luxury brands, aerospace, agriculture, and banking.',
        de: 'Weltweit meistbesuchtes Reiseland; Luxusgüter, Luftfahrt, Landwirtschaft und Banken.'
      },
      tippingCulture: {
        tr: 'Faturaya %15 servis ücreti ("service compris") dahildir. İyi hizmet için masaya 1-2 € bozuk para bırakmak nezakettir.',
        en: 'Service is legally included on the bill ("service compris"). Leaving €1-3 in coins for pleasant service is customary.',
        de: 'Bedienung ist gesetzlich im Preis enthalten. Ein kleines Trinkgeld von 1-2 € auf dem Tisch ist üblich.'
      }
    }
  },

  // İtalya
  IT: {
    culture: {
      etiquette: {
        tr: [
          'Öğleden sonra saat 11:00’den sonra Cappuccino SİPARİŞ EDİLMEZ; İtalyanlar sütlü kahveyi sadece sabah içer, sonrasında sadece Espresso (Caffè) içilir.',
          'Pizzayı ketçap veya mayonezle yemek ya da spagettiyi bıçakla kesmek hakaret sayılır.',
          'Kiliseleri ziyaret ederken omuzlar ve dizler mutlaka kapalı olmalıdır.',
          '"La Bella Figura" (Görgü ve şık görünüm) toplumsal saygının temelidir.'
        ],
        en: [
          'Never order a Cappuccino after 11:00 AM; milk-based coffees are strictly for breakfast. Drink Espresso after lunch or dinner.',
          'Never cut spaghetti with a knife or ask for ketchup on pizza; it is considered a culinary crime.',
          'Shoulders and knees must be covered when entering churches like the Vatican.',
          '"La Bella Figura" (presenting oneself elegantly and politely) is a central social value.'
        ],
        de: [
          'Kein Cappuccino nach 11:00 Uhr; nach dem Essen wird ausschließlich Espresso getrunken.',
          'Spaghetti niemals mit dem Messer schneiden; kein Ketchup auf die Pizza.',
          'In Kirchen (wie dem Petersdom) müssen Schultern und Knie bedeckt sein.',
          '"La Bella Figura" (gepflegtes Auftreten und Höflichkeit) ist essenziell.'
        ]
      },
      festivals: {
        tr: ['Venedik Karnavalı (Maskeler)', 'Siena At Yarışları (Palio di Siena)', 'Sanremo Müzik Festivali', 'Milano Moda Haftası', 'Ferragosto (15 Ağustos Yaz Bayramı)'],
        en: ['Venice Carnival (Historic Masks)', 'Palio di Siena Horse Race', 'Sanremo Italian Song Festival', 'Milan Fashion Week', 'Ferragosto Summer Holiday (August 15)'],
        de: ['Karneval in Venedig', 'Palio di Siena Pferderennen', 'Sanremo Musikfestival', 'Mailänder Modewoche', 'Ferragosto (15. August)']
      },
      lifestyle: {
        tr: '"Dolce Vita" (Tatlı Hayat) felsefesi; aile sofraları, meydanlarda akşam yürüyüşü (passeggiata) ve kusursuz gastronomi tutkusu.',
        en: '"La Dolce Vita" (The Sweet Life); long family lunches, evening plaza strolls (passeggiata), espresso bars, and passionate craftsmanship.',
        de: '"La Dolce Vita" (Das süße Leben); sonntägliche Familienessen, abendliche Passeggiata und Leidenschaft für Genuss.'
      }
    },
    tourism: {
      mustSeePlaces: {
        tr: ['Kolezyum & Roma Forumu (Roma)', 'Floransa Katedrali & Uffizi Galerisi', 'Venedik Kanalları & San Marco Meydanı', 'Amalfi Sahili & Positano', 'Pompeii Antik Kenti', 'Como Gölü & Milano Duomo'],
        en: ['Colosseum & Roman Forum (Rome)', 'Florence Duomo & Uffizi Gallery', 'Venice Grand Canal & St. Mark’s', 'Amalfi Coast & Positano', 'Ancient Ruins of Pompeii', 'Lake Como & Milan Cathedral'],
        de: ['Kolosseum & Forum Romanum (Rom)', 'Florenz Dom & Uffizien', 'Venedig Kanäle & Markusplatz', 'Amalfiküste & Positano', 'Pompeji', 'Comer See & Mailänder Dom']
      },
      bestSeasons: {
        tr: 'Nisan - Haziran ve Eylül - Ekim ayları geziler için en mükemmel havadır. Ağustos ayında aşırı sıcak ve yerel dükkanların tatili (Ferragosto) olabilir.',
        en: 'April - June and September - October for sightseeing; avoid August heatwaves when many family shops close.',
        de: 'April - Juni und September - Oktober ideal; August kann sehr heiß sein.'
      },
      travelStyleTip: {
        tr: 'Frecciarossa ve Italo hızlı trenleri Roma, Floransa, Venedik ve Milano arasında en konforlu yoldur; biletleri önceden alın.',
        en: 'Take Frecciarossa high-speed trains between Rome, Florence, Venice, and Milan; book museum tickets online in advance.',
        de: 'Frecciarossa-Hochgeschwindigkeitszüge zwischen Metropolen nutzen; Museumstickets vorab online reservieren.'
      }
    },
    religion: {
      primaryReligions: {
        tr: 'Katolik Hristiyan (~%79, Vatikan’a ev sahipliği yapar), Dinsiz / Seküler (~%16), Müslüman (~%3).',
        en: 'Roman Catholic (~79%, surrounding the Vatican City Holy See), Non-religious (~16%), Muslim (~3%).',
        de: 'Römisch-Katholisch (~79%, Sitz des Papstes im Vatikan), Konfessionslos (~16%).'
      },
      respectNorms: {
        tr: 'Vatikan ve tüm kiliselerde sıkı kıyafet kontrolü vardır; kolsuz tişört ve şortla girişe izin verilmez.',
        en: 'Strict dress code in churches: no bare shoulders, short shorts, or plunging necklines.',
        de: 'Strikte Kleiderordnung im Vatikan und in Kirchen (Schultern und Knie bedecken).'
      },
      sacredSites: {
        tr: ['Aziz Petrus Bazilikası (Vatikan)', 'Milano Duomo Katedrali', 'Assisi Aziz Françesko Bazilikası', 'Floransa Santa Maria del Fiore'],
        en: ['St. Peter’s Basilica (Vatican)', 'Milan Duomo', 'Basilica of St. Francis of Assisi', 'Florence Cathedral (Duomo)'],
        de: ['Petersdom (Vatikan)', 'Mailänder Dom', 'Basilika San Francesco in Assisi', 'Dom von Florenz']
      }
    },
    language: {
      officialLanguages: {
        tr: 'İtalyanca (Italiano). Turistik şehirlerde İngilizce yaygındır ancak basit İtalyanca kelimeler yüzleri güldürür.',
        en: 'Italian (Italiano). English is spoken in hotels and restaurants in Rome, Florence, and Milan.',
        de: 'Italienisch. Englisch in Tourismusregionen gut verständlich.'
      },
      englishProficiency: {
        tr: 'Büyük şehirlerde ve otellerde iyi; güney köylerinde ve yerel pazarlarda jestler ve beden dili kullanılır.',
        en: 'Good in primary cities; basic in southern villages where expressive gestures bridge the gap.',
        de: 'Gut in Metropolen; im Süden helfen Hände und Mimik.'
      },
      phrases: [
        { phrase: 'Buongiorno / Ciao', meaningTr: 'Günaydın / Merhaba', meaningEn: 'Good morning / Hi', meaningDe: 'Guten Tag / Hallo', pronunciation: 'bwon-zhor-no / chow' },
        { phrase: 'Grazie mille', meaningTr: 'Çok teşekkür ederim', meaningEn: 'Thank you very much', meaningDe: 'Vielen Dank', pronunciation: 'grah-tsee-eh meel-leh' },
        { phrase: 'Per favore', meaningTr: 'Lütfen', meaningEn: 'Please', meaningDe: 'Bitte', pronunciation: 'pehr fah-voh-reh' },
        { phrase: 'Quanto costa?', meaningTr: 'Ne kadar?', meaningEn: 'How much does it cost?', meaningDe: 'Wie viel kostet das?', pronunciation: 'kwahn-toh kohs-tah' },
        { phrase: 'Il conto, per favore', meaningTr: 'Hesap lütfen', meaningEn: 'The check please', meaningDe: 'Die Rechnung, bitte', pronunciation: 'eel kohn-toh pehr fah-voh-reh' },
        { phrase: 'Aiuto!', meaningTr: 'İmdat!', meaningEn: 'Help!', meaningDe: 'Hilfe!', pronunciation: 'ah-yoo-toh' }
      ]
    },
    history: {
      conciseHistory: {
        tr: 'Roma İmparatorluğu’nun başkenti, Rönesans’ın doğduğu topraklar. Da Vinci, Michelangelo ve Dante ile Batı sanat ve hukukunun temellerini attı; 1861 Risorgimento ile birleşti.',
        en: 'Seat of the Roman Empire and the birthplace of the Renaissance. Home to Michelangelo, Leonardo da Vinci, and Dante, unified into modern Italy in 1861.',
        de: 'Zentrum des Römischen Reiches und Geburtsort der Renaissance. Wiege europäischer Kunst, Architektur und Rechtswissenschaft; 1861 geeint.'
      },
      milestones: {
        tr: ['MÖ 753: Roma’nın efsanevi kuruluşu', '14-16. yy: Floransa Rönesansı', '1861: İtalya Krallığı’nın Birleşmesi (Risorgimento)', '1946: İtalyan Cumhuriyeti ilanı'],
        en: ['753 BC: Legendary founding of Rome', '14th-16th c: Italian Renaissance', '1861: Italian Unification (Risorgimento)', '1946: Proclamation of the Republic'],
        de: ['753 v. Chr.: Gründung Roms', '14.-16. Jh.: Renaissance', '1861: Einigung Italiens (Risorgimento)', '1946: Ausrufung der Republik']
      }
    },
    gastronomy: {
      famousDishes: {
        tr: ['Otantik Pizza Napoletana', 'Spaghetti Carbonara (Guanciale ve Pecorino ile)', 'Risotto alla Milanese (Safranlı)', 'Fiorentina Bifteği & Lasagna'],
        en: ['Neapolitan Wood-Fired Pizza', 'Authentic Carbonara (with guanciale, pecorino, egg)', 'Risotto alla Milanese with saffron', 'Florentine T-Bone Steak & Classic Lasagna'],
        de: ['Neapolitanische Holzofenpizza', 'Echte Carbonara (mit Guanciale und Pecorino)', 'Safran-Risotto alla Milanese', 'Bistecca alla Fiorentina & Lasagne']
      },
      traditionalDrinks: {
        tr: ['İtalyan Espresso (Bar tezgahında)', 'Aperol Spritz & Campari', 'Chianti & Barolo Şarapları', 'Limoncello (Limon likörü)'],
        en: ['Italian Espresso taken standing at the bar', 'Aperol Spritz aperitivo', 'Tuscan Chianti and Piedmont Barolo wines', 'Ice-cold Limoncello digestif'],
        de: ['Italienischer Espresso an der Bar', 'Aperol Spritz', 'Chianti- & Barolo-Weine', 'Eiskalter Limoncello']
      },
      streetFoodAndDesserts: {
        tr: ['Tiramisù (Orijinal mascarponeli)', 'Artisanal Gelato (İtalyan Dondurması)', 'Cannoli Siciliani', 'Suppli & Arancini (Pirinç topları)'],
        en: ['Original Mascarpone Tiramisù', 'Artisanal Italian Gelato', 'Crispy Sicilian Cannoli', 'Roman Supplì and Sicilian Arancini'],
        de: ['Klassisches Tiramisù', 'Italienisches Gelato (Eis)', 'Sizilianische Cannoli', 'Arancini Reisbällchen']
      }
    },
    achievements: {
      famousFigures: {
        tr: ['Leonardo da Vinci & Michelangelo', 'Galileo Galilei (Modern Bilim)', 'Dante Alighieri (İlahi Komedya)', 'Enzo Ferrari (Ferrari kurucusu)', 'Giacomo Puccini & Pavarotti'],
        en: ['Leonardo da Vinci & Michelangelo', 'Galileo Galilei (Father of Modern Science)', 'Dante Alighieri (The Divine Comedy)', 'Enzo Ferrari & Giorgio Armani', 'Luciano Pavarotti (Opera legend)'],
        de: ['Leonardo da Vinci & Michelangelo', 'Galileo Galilei (Astronom)', 'Dante Alighieri', 'Enzo Ferrari & Giorgio Armani', 'Luciano Pavarotti']
      },
      strongSectors: {
        tr: ['Süper Spor Otomobiller (Ferrari, Lamborghini, Maserati)', 'Moda ve Tasarım (Gucci, Prada, Armani)', 'Dünya UNESCO Mirası Sayısında #1', 'Makine İmalatı & Zanaat Ürünleri'],
        en: ['Supercars & Automotive Design (Ferrari, Lamborghini)', 'Luxury Fashion & Leather Goods (Gucci, Prada)', 'World Leader in UNESCO Heritage Sites (#1 worldwide)', 'Industrial Machinery & Precision Engineering'],
        de: ['Sportwagenbau (Ferrari, Lamborghini)', 'High Fashion (Gucci, Prada, Armani)', 'Weltweit meiste UNESCO-Welterbestätten (#1)', 'Präzisionsmaschinen & Möbeldesign']
      }
    },
    economy: {
      paymentCulture: {
        tr: 'Kart ve temassız ödeme kanunen tüm işletmelerde zorunludur. Ancak espresso için 1-2 € bozuk para bulundurmak pratiktir.',
        en: 'Cards and contactless legally accepted everywhere. Having €1-2 coins handy for quick coffee bars is convenient.',
        de: 'Kartenzahlung ist gesetzlich überall verpflichtend. Kleingeld für Espresso an der Bar trotzdem nützlich.'
      },
      economicPillars: {
        tr: 'Euro Bölgesi’nin 3. büyük ekonomisi; lüks üretim, otomotiv, turizm ve tarımsal gıda ihracatı.',
        en: 'Eurozone’s 3rd largest economy; advanced manufacturing, luxury goods, tourism, and agri-food exports.',
        de: 'Drittgrößte Volkswirtschaft der Eurozone; Industrie, Luxusgüter, Tourismus und Lebensmittel.'
      },
      tippingCulture: {
        tr: 'Bahşiş zorunlu değildir; faturada "Coperto" (kuver/ekmek ücreti 1-3 €) bulunabilir. Memnuniyet için masaya 1-2 € bozukluk bırakılır.',
        en: 'Tipping is not expected; bills often include "Coperto" (cover charge for bread/service, €1-3). Rounding up with coins is polite.',
        de: 'Trinkgeld ist nicht zwingend; "Coperto" (Gedeckpreis von 1-3 €) steht oft auf der Rechnung. Kleingeld aufrunden genügt.'
      }
    }
  },

  // İspanya
  ES: {
    culture: {
      etiquette: {
        tr: [
          'Akşam yemekleri çok geç yenir; restoranlar genellikle 20:30 veya 21:00’den önce akşam yemeği servisi açmaz.',
          'Öğleden sonra 14:00 - 17:00 arası "Siesta" zamanıdır; küçük dükkanlar kapanabilir.',
          'Barlarda sosyalleşmek ve tapas paylaşmak hayatın merkezindedir.',
          'Selamlaşırken yanaklardan iki öpücük (dos besos) gelenekseldir.'
        ],
        en: [
          'Dinner is eaten very late; restaurants rarely open for dinner before 8:30 or 9:00 PM.',
          'Afternoon Siesta (2:00 - 5:00 PM) is still observed by smaller family shops in southern regions.',
          'Social life revolves around hopping from bar to bar sharing tapas with friends.',
          'Two kisses on the cheeks (dos besos) is the standard greeting between acquaintances.'
        ],
        de: [
          'Abendessen findet sehr spät statt (selten vor 21:00 Uhr).',
          'Siesta am Nachmittag; kleinere Läden schließen zwischen 14:00 und 17:00 Uhr.',
          'Kneipenhopping und das Teilen von Tapas gehören zum Alltag.',
          'Zwei Wangenküsse ("dos besos") zur Begrüßung.'
        ]
      },
      festivals: {
        tr: ['La Tomatina (Domates Savaşı - Bunol)', 'San Fermin (Boğa Koşusu - Pamplona)', 'Fallas Ateş Festivali (Valensiya)', 'Sevilla Nisan Fuarı (Feria de Abril)', 'Semana Santa (Kutsal Hafta)'],
        en: ['La Tomatina (Tomato Fight in Buñol)', 'Running of the Bulls (San Fermín Pamplona)', 'Las Fallas (Valencia Giant Effigies)', 'Seville April Fair (Feria de Abril)', 'Semana Santa Holy Week'],
        de: ['La Tomatina (Tomatenschlacht in Buñol)', 'San Fermín Stierlauf (Pamplona)', 'Las Fallas Feuerfest (Valencia)', 'Feria de Abril (Sevilla)', 'Semana Santa (Karwoche)']
      },
      lifestyle: {
        tr: 'Açık hava, canlı gece hayatı, aile bağları ve "sobremesa" (yemek sonrası saatlerce süren masa başı sohbeti).',
        en: 'Vibrant outdoor street life, lively late nights, family warmth, and the tradition of "sobremesa" (lingering conversation after a meal).',
        de: 'Lebendiges Leben im Freien, späte Nächte, Geselligkeit und "Sobremesa" (Plaudern nach dem Essen).'
      }
    },
    tourism: {
      mustSeePlaces: {
        tr: ['Sagrada Familia & Park Güell (Barselona)', 'Alhambra Sarayı (Granada)', 'Prado Müzesi & Kraliyet Sarayı (Madrid)', 'Sevilla Katedrali & Plaza de Espana', 'İbiza & Mayorka Adaları', 'Toledo Antik Şehri'],
        en: ['Sagrada Família & Park Güell (Barcelona)', 'Alhambra Palace (Granada)', 'Prado Museum & Royal Palace (Madrid)', 'Seville Cathedral & Plaza de España', 'Balearic Islands (Ibiza & Mallorca)', 'Historic City of Toledo'],
        de: ['Sagrada Família & Park Güell (Barcelona)', 'Alhambra (Granada)', 'Prado-Museum & Königspalast (Madrid)', 'Plaza de España (Sevilla)', 'Balearen (Mallorca & Ibiza)', 'Historisches Toledo']
      },
      bestSeasons: {
        tr: 'Nisan - Haziran ve Eylül - Ekim ayları şehir gezileri için harikadır. Temmuz-Ağustos Endülüs ve Madrid’de 40°C’yi aşabilir.',
        en: 'April - June and September - October are ideal. Peak summer in Andalusia and Madrid often exceeds 40°C.',
        de: 'Frühling und Herbst sind ideal; Hochsommer in Madrid und Andalusien sehr heiß.'
      },
      travelStyleTip: {
        tr: 'AVE hızlı treni ile Madrid - Barselona arasını 2.5 saatte geçin; tapas barlarında tezgahta durarak sipariş verin.',
        en: 'Use AVE high-speed train between Madrid and Barcelona (2.5 hours); order tapas standing at the bar like locals.',
        de: 'AVE-Schnellzug zwischen Madrid und Barcelona nutzen; Tapas direkt an der Theke bestellen.'
      }
    },
    religion: {
      primaryReligions: {
        tr: 'Katolik Hristiyan (~%67), Dinsiz / Ateist (~%30), Müslüman (~%2).',
        en: 'Roman Catholic (~67%), Non-religious / Agnostic (~30%), Muslim (~2%).',
        de: 'Römisch-Katholisch (~67%), Konfessionslos (~30%).'
      },
      respectNorms: {
        tr: 'Kiliselerde sessizlik korunmalı ve uygun kıyafet giyilmelidir. Semana Santa gibi dini festivallerde saygı esastır.',
        en: 'Respectful silence in cathedrals; solemn decorum during holy week processions.',
        de: 'Respektvolle Ruhe in Kathedralen und bei religiösen Prozessionen.'
      },
      sacredSites: {
        tr: ['Santiago de Compostela Katedrali (Hac Yolu)', 'Sagrada Familia (Barselona)', 'Kurtuba Camii-Katedrali (Mezquita)', 'Montserrat Manastırı'],
        en: ['Santiago de Compostela Cathedral (Camino pilgrimage)', 'Sagrada Família (Barcelona)', 'Mezquita-Cathedral of Córdoba', 'Montserrat Monastery'],
        de: ['Kathedrale von Santiago de Compostela', 'Sagrada Família', 'Mezquita-Kathedrale von Córdoba', 'Kloster Montserrat']
      }
    },
    language: {
      officialLanguages: {
        tr: 'İspanyolca (Castellano). Katalonya’da Katalanca, Bask bölgesinde Baskça, Galiçya’da Galiçyaca da resmi dildir.',
        en: 'Spanish (Castellano). Catalan, Basque, and Galician are co-official regional languages.',
        de: 'Spanisch (Kastilisch). Katalanisch, Baskisch und Galicisch sind regional kooffiziell.'
      },
      englishProficiency: {
        tr: 'Büyük şehirlerde ve tatil beldelerinde iyi; yerel mahallelerde İspanyolca konuşmaya çalışmak çok sempati toplar.',
        en: 'Good in Madrid, Barcelona, and beach resorts; modest in smaller provincial towns.',
        de: 'Gut in Madrid, Barcelona und Urlaubsorten; auf dem Land eher begrenzt.'
      },
      phrases: [
        { phrase: '¡Hola!', meaningTr: 'Merhaba!', meaningEn: 'Hello!', meaningDe: 'Hallo!', pronunciation: 'oh-lah' },
        { phrase: 'Muchas gracias', meaningTr: 'Çok teşekkürler', meaningEn: 'Thank you very much', meaningDe: 'Vielen Dank', pronunciation: 'moo-chahs grah-thyahs' },
        { phrase: 'Por favor', meaningTr: 'Lütfen', meaningEn: 'Please', meaningDe: 'Bitte', pronunciation: 'pohr fah-vohr' },
        { phrase: '¿Cuánto cuesta?', meaningTr: 'Bu ne kadar?', meaningEn: 'How much is it?', meaningDe: 'Wie viel kostet das?', pronunciation: 'kwahn-toh kwes-tah' },
        { phrase: 'La cuenta, por favor', meaningTr: 'Hesap lütfen', meaningEn: 'The check please', meaningDe: 'Die Rechnung, bitte', pronunciation: 'lah kwen-tah pohr fah-vohr' },
        { phrase: '¡Ayuda! / ¡Socorro!', meaningTr: 'İmdat / Yardım edin!', meaningEn: 'Help!', meaningDe: 'Hilfe!', pronunciation: 'ah-yoo-dah / soh-koh-rroh' }
      ]
    },
    history: {
      conciseHistory: {
        tr: 'Endülüs Emevi İslam medeniyeti ile Hristiyan krallıkların sentezi. 1492’de Amerika’nın keşfiyle küresel deniz imparatorluğu kurdu. Cervantes, Picasso ve modern demokrasi ile parlayan Akdeniz gücü.',
        en: 'Rich confluence of Roman, Moorish Islamic (Al-Andalus), and Christian kingdoms. Conquered global maritime routes in 1492; today a modern progressive democracy.',
        de: 'Schmelztiegel römischer, maurischer und christlicher Kulturen. Ab 1492 Weltreich; heute moderne europäische Demokratie.'
      },
      milestones: {
        tr: ['711-1492: Endülüs medeniyeti dönemi', '1492: Kristof Kolomb’un seferi & Reconquista', '1975: Demokrasiye geçiş', '1992: Barselona Olimpiyatları'],
        en: ['711-1492: Al-Andalus Moorish era', '1492: Christopher Columbus voyage & Reconquista', '1975: Transition to Democracy', '1992: Barcelona Olympics'],
        de: ['711-1492: Maurische Epoche Al-Andalus', '1492: Entdeckung Amerikas', '1975: Übergang zur Demokratie', '1992: Olympische Spiele Barcelona']
      }
    },
    gastronomy: {
      famousDishes: {
        tr: ['Orijinal Valensiya Paellası (Tavuk ve tavşanlı)', 'Tapas & Pintxos (Zeytin, ahtapot, peynir)', 'Jamón Ibérico (Meşe palamuduyla beslenmiş jambon)', 'Gazpacho (Soğuk domates çorbası)'],
        en: ['Authentic Valencian Paella', 'Tapas & Basque Pintxos assortment', 'Jamón Ibérico de Bellota (acorn-fed cured ham)', 'Chilled Andalusian Gazpacho & Tortilla de Patatas'],
        de: ['Valencianische Paella', 'Tapas & baskische Pintxos', 'Jamón Ibérico de Bellota', 'Kaltes Gazpacho & Tortilla Española']
      },
      traditionalDrinks: {
        tr: ['Sangria & Tinto de Verano', 'Rioja Kırmızı Şarabı', 'Cava (Katalan köpüklü şarabı)', 'Café con Leche & Horchata'],
        en: ['Sangria and refreshing Tinto de Verano', 'Rioja and Ribera del Duero fine wines', 'Catalan Cava sparkling wine', 'Café con leche and Valencian Horchata'],
        de: ['Sangria & Tinto de Verano', 'Rioja-Rotweine', 'Katalanischer Cava', 'Horchata Erdmandelmilch']
      },
      streetFoodAndDesserts: {
        tr: ['Sıcak Çikolatalı Churros', 'Crema Catalana (Karamelli tatlı)', 'Tarta de Santiago (Badem keki)', 'Empanada Gallega'],
        en: ['Crispy Churros dipped in thick hot chocolate', 'Crema Catalana with crunchy sugar crust', 'Tarta de Santiago almond cake', 'Galician Empanadas'],
        de: ['Churros con Chocolate', 'Crema Catalana', 'Tarta de Santiago (Mandelkuchen)', 'Galicische Empanada']
      }
    },
    achievements: {
      famousFigures: {
        tr: ['Miguel de Cervantes (Don Kişot yazarı)', 'Pablo Picasso & Salvador Dalí', 'Federico Garcia Lorca', 'Rafael Nadal (Tenis efsanesi)', 'Pedro Almodóvar (Yönetmen)'],
        en: ['Miguel de Cervantes (Don Quixote author)', 'Pablo Picasso & Salvador Dalí', 'Rafael Nadal (22 Grand Slam champion)', 'Pedro Almodóvar (Oscar-winning filmmaker)', 'Andrés Iniesta'],
        de: ['Miguel de Cervantes (Don Quijote)', 'Pablo Picasso & Salvador Dalí', 'Rafael Nadal (Tennis-Legende)', 'Pedro Almodóvar (Regisseur)', 'Antoni Gaudí']
      },
      strongSectors: {
        tr: ['Dünya Turizm Süper Gücü (#2)', 'Yenilenebilir Enerji (Rüzgar ve Güneş)', 'Hızlı Tren Ağı (Dünyanın 2. en uzun YHT hattı)', 'Hazır Giyim & Moda (Inditex / Zara, Mango)'],
        en: ['Global Tourism Titan (#2 worldwide)', 'Renewable Wind & Solar Energy', 'World’s 2nd Largest High-Speed Rail Network', 'Global Fast Fashion (Inditex / Zara, Mango)'],
        de: ['Spitzenreiter im Welttourismus (#2)', 'Erneuerbare Energien (Wind & Solar)', 'Zweitgrößtes Hochgeschwindigkeitsnetz der Welt', 'Textilgigant (Inditex/Zara)']
      }
    },
    economy: {
      paymentCulture: {
        tr: 'Kart ve temassız ödeme son derece yaygındır (%95). Plaj büfelerinde veya küçük pazarlarda az miktar nakit Euro faydalıdır.',
        en: 'Card acceptance is high; contactless payment is accepted across shops and tapas bars.',
        de: 'Kartenzahlung sehr weit verbreitet; etwas Bargeld für Chiringuitos (Strandbars) nützlich.'
      },
      economicPillars: {
        tr: 'Turizm, inşaat, otomotiv montajı, yenilenebilir enerji ve tarımsal zeytinyağı ihracatı.',
        en: 'Tourism, automotive assembly, renewable energy, and olive oil export (world #1 producer).',
        de: 'Tourismus, Automobilbau, Windkraft und Olivenölexport (Weltmarktführer).'
      },
      tippingCulture: {
        tr: 'Bahşiş zorunlu değildir. Barda veya kafede para üstünden kalan bozuklukları (0.50 - 2 €) tabakta bırakmak adettendir.',
        en: 'Tipping is strictly voluntary; leaving small change (€0.50 to €2) at casual tapas bars is customary.',
        de: 'Kein Zwang zum Trinkgeld; Wechselgeld (0,50 bis 2 €) auf dem Unterteller liegen lassen.'
      }
    }
  },

  // Birleşik Krallık
  GB: {
    culture: {
      etiquette: {
        tr: [
          'Kuyruğa girmek (Queueing) kutsal bir kuraldır; sıraya kaynak yapmak en büyük ayıptır.',
          '"Please", "Thank you" ve "Sorry" kelimeleri gün boyu durmaksızın kullanılır.',
          'Metro yürüyen merdivenlerinde DAİMA sağda durulur, sol taraf yürüyenlere bırakılır.',
          'Pub kültürü: Sipariş masaya verilmez; bara gidilip içecekler bizzat alınır ve anında ödenir.'
        ],
        en: [
          'Queueing is a sacred institution; never jump a queue under any circumstances.',
          '"Please", "Thank you", and "Sorry" are woven into nearly every sentence.',
          'Always stand on the right on Tube escalators; the left is strictly for walking.',
          'In pubs, you order and pay directly at the bar counter, not from your table.'
        ],
        de: [
          'Schlangestehen (Queueing) ist heilig; niemals vordrängeln.',
          'Ständiges "Please", "Thank you" und "Sorry" gehört zum guten Ton.',
          'Auf Rolltreppen in der U-Bahn immer rechts stehen, links gehen.',
          'Im Pub bestellt und bezahlt man direkt an der Bar, nicht am Tisch.'
        ]
      },
      festivals: {
        tr: ['Glastonbury Müzik Festivali', 'Notting Hill Karnavalı', 'Wimbledon Tenis Şampiyonası', 'Kraliyet Resmi Doğum Günü (Trooping the Colour)', 'Guy Fawkes / Bonfire Night (5 Kasım)'],
        en: ['Glastonbury Music Festival', 'Notting Hill Carnival (Europe’s largest street party)', 'Wimbledon Tennis Championships', 'Trooping the Colour (King’s Birthday Parade)', 'Guy Fawkes Bonfire Night (November 5)'],
        de: ['Glastonbury Musikfestival', 'Notting Hill Carnival', 'Wimbledon Tennisturnier', 'Trooping the Colour', 'Bonfire Night (5. November)']
      },
      lifestyle: {
        tr: 'Kibar ve mesafeli nezaket, kuru mizah (Dry British Humour), hafta sonu pub buluşmaları ve park yürüyüşleri.',
        en: 'Polite understatement, dry self-deprecating humor, cozy neighborhood pubs, and lush city parks.',
        de: 'Höfliche Zurückhaltung, trockener britischer Humor und lebendige Pub-Kultur.'
      }
    },
    tourism: {
      mustSeePlaces: {
        tr: ['Big Ben & Westminster Sarayı (Londra)', 'British Museum & Tower Bridge', 'Stonehenge Gizemli Taşları', 'Edinburgh Kalesi & İskoç Dağları (Highlands)', 'Oxford & Cambridge Üniversiteleri', 'Roma Hamamları (Bath)'],
        en: ['Big Ben & Parliament (London)', 'British Museum & Tower Bridge', 'Mystic Stonehenge', 'Edinburgh Castle & Scottish Highlands', 'Oxford & Cambridge Colleges', 'Roman Baths (Bath)'],
        de: ['Big Ben & Tower Bridge (London)', 'British Museum', 'Stonehenge', 'Edinburgh Castle & Highlands', 'Universitäten Oxford & Cambridge', 'Römische Bäder von Bath']
      },
      bestSeasons: {
        tr: 'Mayıs - Eylül ayları en uzun ve güneşli günlere sahiptir; yaz festivalleri için idealdir.',
        en: 'May - September offers the mildest weather and longest daylight hours.',
        de: 'Mai - September für angenehme Temperaturen und lange Sommertage.'
      },
      travelStyleTip: {
        tr: 'Londra içinde temasız kredi kartınızı veya telefonunuzu doğrudan metro turnikesine okutun (Oyster kart almanıza gerek yoktur).',
        en: 'Tap in and out on the London Underground using your contactless bank card or phone.',
        de: 'Einfach die kontaktlose Bankkarte oder das Smartphone an den U-Bahn-Schranken vorhalten.'
      }
    },
    religion: {
      primaryReligions: {
        tr: 'Hristiyanlık (~%46, Anglikan Kilisesi ve Katolik), Dinsiz / Seküler (~%37), Müslüman (~%6.5), Hindu (~%1.7).',
        en: 'Christian (~46%, Church of England and Catholic), No religion (~37%), Muslim (~6.5%), Hindu (~1.7%).',
        de: 'Christentum (~46%, Anglikanisch und Katholisch), Konfessionslos (~37%), Muslimisch (~6.5%).'
      },
      respectNorms: {
        tr: 'Kiliselerde ve katedral törenlerinde sessizlik korunmalı, şapkalar çıkarılmalıdır.',
        en: 'Quiet decorum inside historic cathedrals; remove hats.',
        de: 'Ruhe in Abteien und Kathedralen; Kopfbedeckung abnehmen.'
      },
      sacredSites: {
        tr: ['Westminster Abbey (Kraliyet Taç Giyme Kilisesi)', 'St. Paul Katedrali (Londra)', 'Canterbury Katedrali', 'York Minster'],
        en: ['Westminster Abbey (Coronation Church)', 'St. Paul’s Cathedral (London)', 'Canterbury Cathedral', 'York Minster'],
        de: ['Westminster Abbey', 'St. Paul’s Cathedral (London)', 'Kathedrale von Canterbury', 'York Minster']
      }
    },
    language: {
      officialLanguages: {
        tr: 'İngilizce (English). Galce (Galler’de) ve İskoç Galcesi bölgesel dillerdir.',
        en: 'English. Welsh and Scottish Gaelic are recognized regional languages.',
        de: 'Englisch. Walisisch und Gälisch regional anerkannt.'
      },
      englishProficiency: {
        tr: 'Ana dil. Londra dünyanın en çok dil konuşulan kozmopolit şehridir.',
        en: 'Native language. London is home to over 300 spoken languages.',
        de: 'Muttersprache.'
      },
      phrases: [
        { phrase: 'Hello / Cheers', meaningTr: 'Merhaba / Teşekkürler', meaningEn: 'Hello / Thanks & Cheers', meaningDe: 'Hallo / Danke', pronunciation: 'heh-loh / cheers' },
        { phrase: 'Thank you very much', meaningTr: 'Çok teşekkürler', meaningEn: 'Thank you very much', meaningDe: 'Vielen Dank', pronunciation: 'thank yoo veh-ree muhch' },
        { phrase: 'Excuse me / Sorry', meaningTr: 'Afedersiniz / Özür dilerim', meaningEn: 'Excuse me', meaningDe: 'Entschuldigung', pronunciation: 'eks-kyooz mee / soh-ree' },
        { phrase: 'How much is this, please?', meaningTr: 'Bu ne kadar?', meaningEn: 'Price inquiry', meaningDe: 'Wie viel kostet das bitte?', pronunciation: 'how muhch iz this pleez' },
        { phrase: 'Could we have the bill, please?', meaningTr: 'Hesabı alabilir miyiz?', meaningEn: 'Check please', meaningDe: 'Die Rechnung, bitte', pronunciation: 'kood wee hav thuh bil pleez' },
        { phrase: 'Call the police / 999', meaningTr: 'Polisi arayın (999)', meaningEn: 'Emergency assistance', meaningDe: 'Polizei rufen (999)', pronunciation: 'kall thuh puh-lees' }
      ]
    },
    history: {
      conciseHistory: {
        tr: '1215 Magna Carta ile hukukun üstünlüğünü başlatan, Sanayi Devrimi’ni doğuran ada ülkesi. Üzerinde güneş batmayan imparatorluktan modern finans, popüler kültür ve bilim merkezine dönüştü.',
        en: 'Birthplace of parliamentary democracy (1215 Magna Carta) and the Industrial Revolution. Transformed from a globe-spanning empire to a cultural, academic, and financial powerhouse.',
        de: 'Geburtsort der modernen Demokratie (Magna Carta 1215) und der Industriellen Revolution. Heute weltweites Finanz-, Wissenschafts- und Kulturzentrum.'
      },
      milestones: {
        tr: ['1215: Magna Carta Hürriyet Fermanı', '1760’lar: Sanayi Devrimi’nin başlaması', '1940: İkinci Dünya Savaşı & Churchill dönemi', '2020: Brexit & Modern Dönem'],
        en: ['1215: Magna Carta', '1760s: Industrial Revolution begins', '1940: Battle of Britain & Churchill leadership', '2020: Brexit from the European Union'],
        de: ['1215: Magna Carta', '1760er: Beginn der Industriellen Revolution', '1940: Luftschlacht um England', '2020: Brexit']
      }
    },
    gastronomy: {
      famousDishes: {
        tr: ['Fish & Chips (Bezelye püreli çıtır balık ve patates)', 'Sunday Roast (Fırın et, Yorkshire pudingi & sos)', 'Full English Breakfast (Zengin İngiliz kahvaltısı)', 'Shepherd’s Pie (Kıymalı patates püreli fırın)'],
        en: ['Traditional Fish and Chips with mushy peas', 'Sunday Roast with Yorkshire pudding and gravy', 'Full English Breakfast with sausages and beans', 'Shepherd’s Pie baked minced lamb'],
        de: ['Traditional Fish and Chips', 'Sunday Roast mit Yorkshire Pudding', 'Full English Breakfast', 'Shepherd’s Pie']
      },
      traditionalDrinks: {
        tr: ['İngiliz Sütlü Çayı (English Breakfast Tea)', 'Pub Ale & Stout Birası (Guinness)', 'Pimm’s No. 1 Kokteyli (Yaz içeceği)', 'Londra Kuru Cini (Gin & Tonic)'],
        en: ['English Breakfast Tea with a splash of milk', 'Traditional Cask Ales and Stouts', 'Pimm’s No. 1 summer punch', 'London Dry Gin and Tonic'],
        de: ['Schwarzer Tee mit Milch', 'Englisches Ale & Stout', 'Pimm’s Cup', 'London Dry Gin & Tonic']
      },
      streetFoodAndDesserts: {
        tr: ['Scones ile Clotted Cream ve Çilek Reçeli', 'Sticky Toffee Pudding', 'Borough Market Sokak Yemekleri', 'Cornish Pasty (Kıymalı börek)'],
        en: ['Warm Scones with Clotted Cream and Jam', 'Warm Sticky Toffee Pudding with custard', 'Borough Market gourmet street food', 'Cornish Pasties'],
        de: ['Scones mit Clotted Cream und Marmelade', 'Sticky Toffee Pudding', 'Borough Market Streetfood', 'Cornish Pasty']
      }
    },
    achievements: {
      famousFigures: {
        tr: ['William Shakespeare', 'Isaac Newton & Charles Darwin', 'Winston Churchill', 'The Beatles & Queen', 'Stephen Hawking & Alan Turing'],
        en: ['William Shakespeare (Playwright)', 'Sir Isaac Newton & Charles Darwin', 'Winston Churchill (Prime Minister)', 'The Beatles & Queen (Music icons)', 'Alan Turing (Father of Computer Science)'],
        de: ['William Shakespeare', 'Isaac Newton & Charles Darwin', 'Winston Churchill', 'The Beatles & Queen', 'Alan Turing & Stephen Hawking']
      },
      strongSectors: {
        tr: ['Küresel Finans Merkezi (Londra Şehri)', 'Dünya Çapında Üniversiteler (Oxford, Cambridge, Imperial)', 'Yaratıcı Endüstriler, Müzik & Yayıncılık (BBC)', 'Formula 1 Takımları & İleri Mühendislik'],
        en: ['Global Financial Services (City of London)', 'World-Leading Academia (Oxford, Cambridge)', 'Creative Industries, Pop Music & BBC Media', 'Formula 1 Motorsport Engineering'],
        de: ['Internationaler Finanzplatz London', 'Spitzenuniversitäten (Oxford, Cambridge)', 'Musikindustrie, Film & BBC', 'Motorsport & Formel-1-Entwicklung']
      }
    },
    economy: {
      paymentCulture: {
        tr: 'Neredeyse tamamen nakitsiz (%99 Temassız kart ve Apple Pay). Sokak müzisyenleri dahi kartla bağış kabul eder.',
        en: 'Extremely cashless; tap-to-pay accepted everywhere from street buses to street performers.',
        de: 'Nahezu komplett bargeldlos (Kontaktlos und Apple Pay selbst im Nahverkehr Standard).'
      },
      economicPillars: {
        tr: 'Dünyanın 6. büyük ekonomisi; bankacılık, sigortacılık, fintech, ilaç ve yaratıcı endüstriler.',
        en: 'World’s 6th largest economy dominated by services, fintech, pharmaceuticals, and education.',
        de: 'Sechstgrößte Volkswirtschaft der Welt; Finanzsektor, Pharma und Bildung.'
      },
      tippingCulture: {
        tr: 'Restoranlarda genellikle %12.5 isteğe bağlı servis ücreti ("optional service charge") eklenir. Eklenmemişse %10-12 bahşiş verilir. Pub tezgahında bahşiş verilmez.',
        en: 'Most London restaurants add a 12.5% discretionary service charge to the bill. No tipping at pub counters.',
        de: 'Restaurants schlagen meist 12,5% Servicepauschale auf. An der Pub-Theke wird kein Trinkgeld gegeben.'
      }
    }
  }
};

/**
 * Coğrafi ve Kültürel Bölge Eşleme Tablosu
 */
function getCountryRegion(code: string): string {
  const BALKANS = ['RS', 'BA', 'ME', 'AL', 'MK', 'XK', 'BG', 'HR', 'SI'];
  const SCANDINAVIA = ['NO', 'SE', 'DK', 'FI', 'IS'];
  const MEDITERRANEAN = ['IT', 'ES', 'PT', 'GR', 'CY', 'MT'];
  const WEST_EUROPE = ['FR', 'GB', 'DE', 'NL', 'BE', 'LU', 'AT', 'CH', 'IE', 'CA'];
  const EAST_EUROPE = ['PL', 'CZ', 'SK', 'HU', 'RO', 'MD', 'UA', 'BY', 'EE', 'LV', 'LT', 'RU'];
  const CAUCASUS_CENTRAL_ASIA = ['GE', 'AZ', 'AM', 'KZ', 'UZ', 'KG', 'TJ', 'TM'];
  const MIDDLE_EAST_GULF = ['AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'JO', 'LB', 'IQ', 'IR', 'YE', 'SY', 'PS'];
  const NORTH_AFRICA = ['EG', 'MA', 'TN', 'DZ', 'LY', 'SD'];
  const EAST_ASIA = ['JP', 'KR', 'CN', 'TW', 'HK', 'MO', 'MN'];
  const SOUTHEAST_ASIA = ['TH', 'VN', 'ID', 'MY', 'SG', 'PH', 'KH', 'LA', 'MM', 'BN', 'TL'];
  const SOUTH_ASIA = ['IN', 'PK', 'BD', 'LK', 'NP', 'BT', 'MV'];
  const LATIN_AMERICA = ['MX', 'BR', 'AR', 'CO', 'CL', 'PE', 'UY', 'EC', 'BO', 'PY', 'CR', 'PA', 'GT', 'VE'];
  const CARIBBEAN = ['CU', 'DO', 'JM', 'BS', 'BB', 'TT', 'HT', 'PR'];
  const SUB_SAHARAN_AFRICA = ['ZA', 'KE', 'NG', 'GH', 'TZ', 'ET', 'SN', 'CI', 'RW', 'UG', 'CM', 'SN'];
  const OCEANIA = ['AU', 'NZ', 'FJ', 'PG', 'WS'];

  if (BALKANS.includes(code)) return 'balkans';
  if (SCANDINAVIA.includes(code)) return 'scandinavia';
  if (MEDITERRANEAN.includes(code)) return 'mediterranean';
  if (WEST_EUROPE.includes(code)) return 'west_europe';
  if (EAST_EUROPE.includes(code)) return 'east_europe';
  if (CAUCASUS_CENTRAL_ASIA.includes(code)) return 'central_asia';
  if (MIDDLE_EAST_GULF.includes(code)) return 'middle_east';
  if (NORTH_AFRICA.includes(code)) return 'north_africa';
  if (EAST_ASIA.includes(code)) return 'east_asia';
  if (SOUTHEAST_ASIA.includes(code)) return 'southeast_asia';
  if (SOUTH_ASIA.includes(code)) return 'south_asia';
  if (LATIN_AMERICA.includes(code)) return 'latin_america';
  if (CARIBBEAN.includes(code)) return 'caribbean';
  if (SUB_SAHARAN_AFRICA.includes(code)) return 'sub_saharan_africa';
  if (OCEANIA.includes(code)) return 'oceania';
  return 'general';
}

/**
 * Bölgesel Kültür ve Seyahat Motoru
 * Her bölge için otantik yemekler, diller, kurallar ve yerel ifadeler üretir.
 */
function getRegionalProfile(region: string, capital: string, countryName: string, lang: 'tr' | 'en' | 'de') {
  switch (region) {
    case 'balkans':
      return {
        etiquette: [
          lang === 'de' ? 'Kaffee trinken ist ein Ritual; Verabredungen dauern Stunden.' : lang === 'en' ? 'Coffee drinking is a sacred ritual; meetings take hours.' : 'Kahve içmek sosyal bir ritüeldir; kafelerde saatlerce sohbet edilir.',
          lang === 'de' ? 'Große Herzlichkeit und Gastfreundschaft; Gäste werden reichlich bewirtet.' : lang === 'en' ? 'Deep hospitality; guests are lavishly treated to homemade food.' : 'Kafkas ve Balkan misafirperverliği; konuğa ev yapımı ikramlar eksik edilmez.',
          lang === 'de' ? 'Schuhe vor Betreten vieler Wohnungen ausziehen.' : lang === 'en' ? 'Removing shoes at home entrance is common.' : 'Evlere girerken ayakkabı çıkarmak yaygındır.'
        ],
        festivals: [
          `${capital} ${lang === 'de' ? 'Kultur- & Musikfestival' : lang === 'en' ? 'Cultural & Music Festival' : 'Kültür ve Müzik Festivali'}`,
          lang === 'de' ? 'Traditionelles Balkan-Brass-Festival' : lang === 'en' ? 'Traditional Balkan Brass Festival' : 'Geleneksel Balkan Bando & Caz Şenlikleri'
        ],
        lifestyle: lang === 'de' ? 'Gemütlich, herzlich, familienorientiert und kaffeeliebend.' : lang === 'en' ? 'Relaxed, warm, deeply loyal to family, and passionate about long cafe chats.' : 'Sıcakkanlı, aileye bağlı, telaşsız ve kahvehane sohbetlerini seven bir yaşam ritmi.',
        dishes: [
          'Ćevapi / Köfte (Somun ekmeği ve kaymak ile)',
          'Boşnak & Balkan Böreği (Kıymalı ve ıspanaklı puf börek)',
          'Pljeskavica (Balkan burgeri & Ajvar sosu)'
        ],
        drinks: ['Rakija (Geleneksel meyve brendisi)', 'Közde Pişmiş Balkan Kahvesi', 'Ayran'],
        desserts: ['Trileçe', 'Baklava', 'Tufahija (Cevizli fırın elma)'],
        phrases: [
          { phrase: 'Dobar dan / Zdravo', meaning: lang === 'de' ? 'Guten Tag / Hallo' : lang === 'en' ? 'Good day / Hello' : 'İyi günler / Merhaba', translation: 'Merhaba' },
          { phrase: 'Hvala puno', meaning: lang === 'de' ? 'Vielen Dank' : lang === 'en' ? 'Thank you very much' : 'Çok teşekkürler', translation: 'Teşekkürler' },
          { phrase: 'Molim', meaning: lang === 'de' ? 'Bitte' : lang === 'en' ? 'Please' : 'Lütfen', translation: 'Lütfen' },
          { phrase: 'Koliko košta?', meaning: lang === 'de' ? 'Wie viel kostet das?' : lang === 'en' ? 'How much is it?' : 'Bu ne kadar?', translation: 'Kaç para?' },
          { phrase: 'Račun, molim', meaning: lang === 'de' ? 'Rechnung bitte' : lang === 'en' ? 'Check please' : 'Hesap lütfen', translation: 'Hesap lütfen' }
        ],
        religions: lang === 'de' ? 'Orthodoxes Christentum, Islam und Katholizismus in historischer Koexistenz.' : lang === 'en' ? 'Orthodox Christian, Islam, and Catholic communities living in historic mosaic.' : 'Ortodoks Hristiyan, İslam ve Katolik inançlarının yüzyıllardır iç içe yaşadığı zengin mozaik.',
        sectors: ['Kültür ve Doğa Turizmi', 'Tarım ve Gıda İhracatı', 'Metalurji ve Enerji']
      };

    case 'scandinavia':
      return {
        etiquette: [
          lang === 'de' ? 'Respekt vor persönlichem Freiraum und Ruhe in der Öffentlichkeit.' : lang === 'en' ? 'High respect for personal space and quiet in public places.' : 'Kişisel alana ve sessizliğe büyük saygı gösterilir.',
          lang === 'de' ? 'Pünktlichkeit und Verlässlichkeit werden vorausgesetzt.' : lang === 'en' ? 'Punctuality and egalitarian modesty (Janteloven) are central.' : 'Dakiklik ve eşitlikçi sadelik toplumsal kuraldır.',
          lang === 'de' ? 'Schuhe vor Betreten jedes Hauses ausziehen.' : lang === 'en' ? 'Always remove shoes when entering a home.' : 'Evlere girerken ayakkabılar daima çıkarılır.'
        ],
        festivals: [
          lang === 'de' ? 'Mittsommerfest (Längster Tag)' : lang === 'en' ? 'Midsummer Solstice Festival' : 'Midsommar (Gündönümü Kutlaması)',
          lang === 'de' ? 'Nordlicht- & Winterfestivals' : lang === 'en' ? 'Northern Lights & Winter Festivals' : 'Kuzey Işıkları & Kış Festivalleri'
        ],
        lifestyle: lang === 'de' ? 'Hygge und Naturverbundenheit; hoher Wohlstand und Balance.' : lang === 'en' ? 'Emphasis on outdoor life (Friluftsliv), hygge coziness, and work-life balance.' : 'Doğayla iç içe yaşam (Friluftsliv), huzurlu ev konforu ve dengeli refah.',
        dishes: [
          'Somon Füme & Taze Kuzey Denizi Balıkları',
          'Smørrebrød (Geleneksel çavdar ekmekli açık sandviç)',
          'Yaban Mersinli Geyik Eti ve Patates Püresi'
        ],
        drinks: ['Filtre Kahve (Dünyanın en yüksek kahve tüketimi)', 'Aquavit (Baharatlı İskandinav içkisi)', 'Cider'],
        desserts: ['Kanelbulle (Tarçınlı Çörek)', 'Waffle ile Bulut Çileği Reçeli', 'Kardemummabulle'],
        phrases: [
          { phrase: 'Hei / Hej / Hallo', meaning: lang === 'de' ? 'Hallo' : lang === 'en' ? 'Hello' : 'Merhaba', translation: 'Merhaba' },
          { phrase: 'Takk / Tack', meaning: lang === 'de' ? 'Danke' : lang === 'en' ? 'Thank you' : 'Teşekkürler', translation: 'Teşekkürler' },
          { phrase: 'Vær så snill / Snälla', meaning: lang === 'de' ? 'Bitte' : lang === 'en' ? 'Please' : 'Lütfen', translation: 'Lütfen' },
          { phrase: 'Hvor mye koster dette?', meaning: lang === 'de' ? 'Wie viel kostet das?' : lang === 'en' ? 'How much?' : 'Bu ne kadar?', translation: 'Kaç para?' },
          { phrase: 'Regningen, takk', meaning: lang === 'de' ? 'Die Rechnung, bitte' : lang === 'en' ? 'Check please' : 'Hesap lütfen', translation: 'Hesap lütfen' }
        ],
        religions: lang === 'de' ? 'Lutherisch-Evangelisch und überwiegend säkular.' : lang === 'en' ? 'Evangelical Lutheran heritage, largely secular modern society.' : 'Luteryan Protestan geleneğe sahip ağırlıklı seküler toplum.',
        sectors: ['Yeşil Enerji ve Sürdürülebilirlik', 'Denizcilik ve Balıkçılık', 'Yüksek Teknoloji ve Tasarım']
      };

    case 'latin_america':
      return {
        etiquette: [
          lang === 'de' ? 'Herzliche Begrüßung mit Umarmung oder Wangenkuss.' : lang === 'en' ? 'Warm greetings with hugs or cheek kisses are standard.' : 'Sıcakkanlı sarılma ve yanak yanağa selamlama yaygındır.',
          lang === 'de' ? 'Zeitgefühl ist entspannt; Pünktlichkeit ist flexibel.' : lang === 'en' ? 'Time is fluid; arriving 15-30 minutes late to social events is normal.' : 'Zaman anlayışı esnektir; acele edilmez, anın tadı çıkarılır.',
          lang === 'de' ? 'Großer Respekt vor Familie und Älteren.' : lang === 'en' ? 'Family is the absolute center of life.' : 'Aile bağları hayatın mutlak merkezindedir.'
        ],
        festivals: [
          lang === 'de' ? 'Karneval & Día de los Muertos' : lang === 'en' ? 'Carnival & Dia de los Muertos' : 'Karnaval ve Ölüler Günü Kutlamaları',
          `${capital} ${lang === 'de' ? 'Folklorefest' : lang === 'en' ? 'Heritage Fair' : 'Geleneksel Müzik & Dans Şenliği'}`
        ],
        lifestyle: lang === 'de' ? 'Musik, Tanz, Lebensfreude und lebendige Straßenkultur.' : lang === 'en' ? 'Filled with rhythm, music, vibrant street socializing, and joy of living.' : 'Müzik, dans, sokak enerjisi ve yaşama sevinci dolu tutkulu bir sosyal hayat.',
        dishes: [
          'Empanadas (Fırınlanmış çıtır etli/peynirli börekler)',
          'Asado & Churrasco (Ateşte ağır pişen ızgara etler)',
          'Ceviche (Narenciyede marine taze deniz mahsulleri)'
        ],
        drinks: ['Yerba Mate Çayı', 'Tequila / Pisco / Cachaça', 'Taze Tropik Meyve Suları (Maracuyá, Mango)'],
        desserts: ['Dulce de Leche (Karamelize süt tatlısı)', 'Churros', 'Tres Leches Keki'],
        phrases: [
          { phrase: '¡Hola! / ¡Buenas!', meaning: lang === 'de' ? 'Hallo' : lang === 'en' ? 'Hello' : 'Merhaba', translation: 'Merhaba' },
          { phrase: 'Muchas gracias', meaning: lang === 'de' ? 'Vielen Dank' : lang === 'en' ? 'Thank you very much' : 'Çok teşekkürler', translation: 'Teşekkürler' },
          { phrase: 'Por favor', meaning: lang === 'de' ? 'Bitte' : lang === 'en' ? 'Please' : 'Lütfen', translation: 'Lütfen' },
          { phrase: '¿Cuánto cuesta?', meaning: lang === 'de' ? 'Wie viel kostet das?' : lang === 'en' ? 'How much is it?' : 'Bu ne kadar?', translation: 'Kaç para?' },
          { phrase: 'La cuenta, por favor', meaning: lang === 'de' ? 'Rechnung bitte' : lang === 'en' ? 'Check please' : 'Hesap lütfen', translation: 'Hesap lütfen' }
        ],
        religions: lang === 'de' ? 'Überwiegend Römisch-Katholisch mit indigenen Einflüssen.' : lang === 'en' ? 'Predominantly Roman Catholic blended with vibrant indigenous heritage.' : 'Ağırlıklı Katolik Hristiyan ve zengin yerli kültürel inanç sentezi.',
        sectors: ['Tarım ve Kahve İhracatı', 'Madencilik ve Doğal Kaynaklar', 'Eko-turizm ve Futbol']
      };

    case 'middle_east':
    case 'north_africa':
      return {
        etiquette: [
          lang === 'de' ? 'Große Gastfreundschaft; Tee oder Datteln anzubieten gehört dazu.' : lang === 'en' ? 'Generous hospitality; welcoming guests with dates, coffee, and tea is an honor.' : 'Cömert misafirperverlik; konuğa hurma ve kakuleli kahve ikramı şereftir.',
          lang === 'de' ? 'Essen und Begrüßen traditionell mit der rechten Hand.' : lang === 'en' ? 'Always use the right hand for eating and greeting.' : 'Yemek yerken ve bir şey uzatırken sağ el kullanılır.',
          lang === 'de' ? 'Respektvolle Kleidung an heiligen Stätten.' : lang === 'en' ? 'Modest clothing covering shoulders and knees is expected in public.' : 'Kıyafetlerde omuz ve dizlerin örtülü olmasına özen gösterilir.'
        ],
        festivals: [
          lang === 'de' ? 'Eid al-Fitr & Eid al-Adha' : lang === 'en' ? 'Eid al-Fitr & Eid al-Adha' : 'Ramazan ve Kurban Bayramları',
          `${capital} ${lang === 'de' ? 'Kultur- & Falkenfestival' : lang === 'en' ? 'Heritage & Falconry Festival' : 'Miras ve Çöl Şenliği'}`
        ],
        lifestyle: lang === 'de' ? 'Familienfokus, abendliche Basare und tiefe Tradition.' : lang === 'en' ? 'Family-centered, vibrant evening souks, and respect for centuries-old heritage.' : 'Aile merkezli, akşamları canlanan çarşılar ve köklü gelenekler.',
        dishes: [
          'Machboos / Kabsa (Baharatlı pirinç ve kuzu eti)',
          'Taze Falafel, Humus ve Tahinli Mezeler',
          'Kömürde Kuzu Şiş & Shawarma'
        ],
        drinks: ['Karak Çayı (Baharatlı sütlü çay)', 'Kakuleli Arap Kahvesi (Gahwa)', 'Taze Nane Çayı'],
        desserts: ['Künefe', 'Baklava ve Hurmalı Ma’amoul', 'Umm Ali (Fırın tatlısı)'],
        phrases: [
          { phrase: 'Salam Alaykum (سلام عليكم)', meaning: lang === 'de' ? 'Friede sei mit dir' : lang === 'en' ? 'Peace be upon you' : 'Selamün Aleyküm', translation: 'Merhaba' },
          { phrase: 'Shukran (شكراً)', meaning: lang === 'de' ? 'Danke' : lang === 'en' ? 'Thank you' : 'Teşekkür ederim', translation: 'Teşekkürler' },
          { phrase: 'Min fadlak (من فضلك)', meaning: lang === 'de' ? 'Bitte' : lang === 'en' ? 'Please' : 'Lütfen', translation: 'Lütfen' },
          { phrase: 'Bikam hatha? (بكم هذا؟)', meaning: lang === 'de' ? 'Wie viel kostet das?' : lang === 'en' ? 'How much?' : 'Bu ne kadar?', translation: 'Kaç para?' },
          { phrase: 'Al-hisab law samaht (الحساب لو سمحت)', meaning: lang === 'de' ? 'Rechnung bitte' : lang === 'en' ? 'Check please' : 'Hesap lütfen', translation: 'Hesap lütfen' }
        ],
        religions: lang === 'de' ? 'Überwiegend Islam (Sunnitisch / Schiitisch) mit christlichen Minderheiten.' : lang === 'en' ? 'Predominantly Islam (Sunni and Shia) with historic Christian and minority faiths.' : 'Ağırlıklı İslam (Sünni ve Şii) ve kadim Hristiyan azınlıklar.',
        sectors: ['Enerji ve Doğal Gaz', 'Lojistik ve Havacılık', 'Finans ve Küresel Ticaret']
      };

    case 'mediterranean':
      return {
        etiquette: [
          lang === 'de' ? 'Entspannte Essenszeiten; Abendessen selten vor 20:30 oder 21:00 Uhr.' : lang === 'en' ? 'Late dining culture; dinner rarely starts before 8:30 or 9:00 PM.' : 'Akşam yemekleri geç yenir; saat 20:30 veya 21:00’den önce sofraya oturulmaz.',
          lang === 'de' ? 'Mittagsruhe (Siesta) in kleineren Ortschaften respektieren.' : lang === 'en' ? 'Respect afternoon rest hours (Siesta) in smaller coastal towns.' : 'Öğleden sonraki siesta dinlenme saatlerinde esnaf kapalı olabilir; sessizliğe dikkat edilir.',
          lang === 'de' ? 'Herzliche Gastfreundschaft und lebhafte Tischgespräche.' : lang === 'en' ? 'Warm gestures, passionate conversations, and sharing appetizers (tapas/meze).' : 'Sıcak Akdeniz sohbetleri, ortak meze paylaşımı ve neşeli sofra adabı esastır.'
        ],
        festivals: [
          lang === 'de' ? 'Mediterranes Sommerfest & Musiknächte' : lang === 'en' ? 'Mediterranean Summer & Coastal Music Nights' : 'Akdeniz Yazı & Sahil Müzik Festivalleri',
          `${capital} ${lang === 'de' ? 'Kultur- & Altstadtfest' : lang === 'en' ? 'Heritage & Old Port Fair' : 'Tarihi Liman ve Şehir Şenliği'}`
        ],
        lifestyle: lang === 'de' ? 'Sonne, Meer, gesunde Ernährung und geselliges Leben im Freien.' : lang === 'en' ? 'Sun, sea, Mediterranean diet, and outdoor social life on piazza terraces.' : 'Güneş, deniz, zeytinyağlı Akdeniz mutfağı ve açık hava meydanlarında keyifli sosyal yaşam.',
        dishes: [
          'Zeytinyağlı Deniz Mahsulleri & Taze Izgara Balıklar',
          'Tapas & Meze Tabağı (Jamon, Peynir, Marine Zeytinler)',
          'Pastel de Nata / Tiramisu / Akdeniz Fırın Lezzetleri'
        ],
        drinks: ['Sangria / Port Şarabı / Yerel Soğuk Şaraplar', 'Limoncello & Anasonlu Likörler', 'Buzlu Espresso'],
        desserts: ['Taze Çilekli Panna Cotta', 'Zeytinyağlı ve Narenciyeli Kek', 'Geleneksel Dondurma'],
        phrases: [
          { phrase: '¡Hola! / Olá / Ciao', meaning: lang === 'de' ? 'Hallo' : lang === 'en' ? 'Hello' : 'Merhaba', translation: 'Merhaba' },
          { phrase: 'Muchas gracias / Obrigado', meaning: lang === 'de' ? 'Vielen Dank' : lang === 'en' ? 'Thank you very much' : 'Çok teşekkür ederim', translation: 'Teşekkürler' },
          { phrase: 'Por favor', meaning: lang === 'de' ? 'Bitte' : lang === 'en' ? 'Please' : 'Lütfen', translation: 'Lütfen' },
          { phrase: '¿Cuánto cuesta? / Quanto custa?', meaning: lang === 'de' ? 'Wie viel kostet das?' : lang === 'en' ? 'How much is it?' : 'Bu ne kadar?', translation: 'Kaç para?' },
          { phrase: 'La cuenta, por favor', meaning: lang === 'de' ? 'Rechnung bitte' : lang === 'en' ? 'Check please' : 'Hesap lütfen', translation: 'Hesap lütfen' }
        ],
        religions: lang === 'de' ? 'Überwiegend Römisch-Katholisch und Griechisch-Orthodox.' : lang === 'en' ? 'Predominantly Roman Catholic and Greek Orthodox with rich historic roots.' : 'Ağırlıklı Katolik ve Ortodoks Hristiyan gelenekleri.',
        sectors: ['Kıyı ve Kültür Turizmi', 'Zeytinyağı ve Şarapçılık', 'Denizcilik ve Lojistik']
      };

    case 'west_europe':
      return {
        etiquette: [
          lang === 'de' ? 'Pünktlichkeit ist oberstes Gebot; Verabredungen pünktlich einhalten.' : lang === 'en' ? 'Punctuality is strictly valued; arrive exactly on schedule.' : 'Dakiklik en temel nezaket kuralıdır; randevulara tam vaktinde gidilir.',
          lang === 'de' ? 'Rücksicht auf persönliche Distanz und Ruhe in öffentlichen Verkehrsmitteln.' : lang === 'en' ? 'Respect for personal boundaries and quiet tone on public trains.' : 'Toplu taşımada sessiz konuşulur, kişisel alana saygı duyulur.',
          lang === 'de' ? 'Fahrradwege strikt freihalten.' : lang === 'en' ? 'Always yield to designated bicycle paths.' : 'Bisiklet yollarına dikkat edilmeli ve yayalar bisiklet şeridine girmemelidir.'
        ],
        festivals: [
          `${capital} ${lang === 'de' ? 'Klassik- & Jazzfestival' : lang === 'en' ? 'Classic & Jazz Festival' : 'Klasik Müzik ve Sanat Festivali'}`,
          lang === 'de' ? 'Traditionelle Weihnachtsmärkte & Frühjahrsfeste' : lang === 'en' ? 'Historic Christmas Markets & Spring Fairs' : 'Tarihi Noel Pazarları ve Bahar Panayırları'
        ],
        lifestyle: lang === 'de' ? 'Work-Life-Balance, Kulturgenuss, Alpin- und Radsport.' : lang === 'en' ? 'High standard of living, alpine and cycling outdoors, and cafe culture.' : 'Yüksek refah, doğa ve dağ sporları, müze ve kafe kültürü.',
        dishes: [
          'İsviçre Peynir Fondüsü & Raclette',
          'Viyana Şnitzeli (Wiener Schnitzel & Ilık Patates Salatası)',
          'Belçika Midyesi (Moules-Frites & Çıtır Patates)'
        ],
        drinks: ['Geleneksel Manastır Biraları & Pilsner', 'Riesling & Alpin Beyaz Şarapları', 'Kavrulmuş Filtre Kahve'],
        desserts: ['Elmalı Strudel (Apfelstrudel & Vanilyalı Sos)', 'Belçika Çikolatası & Sıcak Waffle', 'Sachertorte'],
        phrases: [
          { phrase: 'Guten Tag / Bonjour / Hallo', meaning: lang === 'de' ? 'Guten Tag / Hallo' : lang === 'en' ? 'Good day / Hello' : 'İyi günler / Merhaba', translation: 'Merhaba' },
          { phrase: 'Danke schön / Merci beaucoup', meaning: lang === 'de' ? 'Vielen Dank' : lang === 'en' ? 'Thank you' : 'Çok teşekkür ederim', translation: 'Teşekkürler' },
          { phrase: 'Bitte / S’il vous plaît', meaning: lang === 'de' ? 'Bitte' : lang === 'en' ? 'Please' : 'Lütfen', translation: 'Lütfen' },
          { phrase: 'Wie viel kostet das?', meaning: lang === 'de' ? 'Wie viel kostet das?' : lang === 'en' ? 'How much?' : 'Bu ne kadar?', translation: 'Kaç para?' },
          { phrase: 'Die Rechnung, bitte', meaning: lang === 'de' ? 'Rechnung bitte' : lang === 'en' ? 'Check please' : 'Hesap lütfen', translation: 'Hesap lütfen' }
        ],
        religions: lang === 'de' ? 'Katholisch, Protestantisch und zunehmend säkular.' : lang === 'en' ? 'Catholic, Protestant, and secular pluralism.' : 'Katolik, Protestan ve geniş seküler toplum yapısı.',
        sectors: ['Hassas Mühendislik ve Otomotiv', 'Bankacılık ve Küresel Varlık Yönetimi', 'İlaç ve Biyoteknoloji']
      };

    case 'east_europe':
      return {
        etiquette: [
          lang === 'de' ? 'Warme und ehrliche Gastfreundschaft; Ablehnung von Essen gilt als unhöflich.' : lang === 'en' ? 'Warm and sincere hospitality; never refuse a host’s home-cooked meal.' : 'Samimi ve cömert Slav misafirperverliği; ev sahibinin ikramı geri çevrilmez.',
          lang === 'de' ? 'Schuhe vor Betreten privater Wohnungen immer ausziehen.' : lang === 'en' ? 'Always take off your outdoor shoes upon entering a home.' : 'Evlere girerken dış ayakkabılar daima çıkarılır ve ev terliği giyilir.',
          lang === 'de' ? 'Augenkontakt beim Zuprosten ist Ehrensache.' : lang === 'en' ? 'Maintain direct eye contact when toasting.' : 'Kadeh kaldırırken doğrudan göz teması kurulur.'
        ],
        festivals: [
          `${capital} ${lang === 'de' ? 'Frühlings- & Folklorefestival' : lang === 'en' ? 'Spring Folklore & Arts Fair' : 'Bahar ve Folklor Sanat Festivali'}`,
          lang === 'de' ? 'Traditionelles slawisches Sommersonnenwendfest' : lang === 'en' ? 'Midsummer Kupala Solstice Fair' : 'Kupala Gündönümü ve Nehir Şenlikleri'
        ],
        lifestyle: lang === 'de' ? 'Familienfokussiert, traditionsbewusst, herzliche Feiern und Liebe zur Natur.' : lang === 'en' ? 'Family-centric, rich classical music heritage, hearty banquets, and forest foraging.' : 'Güçlü aile bağları, klasik müzik ve tiyatro sevgisi, zengin sofra geleneği.',
        dishes: [
          'Pierogi / Vareniki (Patatesli, peynirli ve kıymalı mantılar)',
          'Geleneksel Borş Çorbası (Pancarlı, dereotlu & Ekşi Kremalı Smetana)',
          'Gulaş Yahnisi (Paprikalı fırın dana eti)'
        ],
        drinks: ['Kvas (Geleneksel fermente çavdar içeceği)', 'Kompoto (Meyve hoşafı)', 'Bitkisel Çavdar Votkası'],
        desserts: ['Trdelník (Tarçınlı şekerli baca keki)', 'Pączki (Reçelli geleneksel puf çörek)', 'Makovnjača (Haşhaşlı rulo)'],
        phrases: [
          { phrase: 'Dzień dobry / Dobrý den / Здравствуйте', meaning: lang === 'de' ? 'Guten Tag' : lang === 'en' ? 'Good day / Hello' : 'İyi günler / Merhaba', translation: 'Merhaba' },
          { phrase: 'Dziękuję / Děkuji / Спасибо', meaning: lang === 'de' ? 'Danke' : lang === 'en' ? 'Thank you' : 'Teşekkürler', translation: 'Teşekkürler' },
          { phrase: 'Proszę / Prosím / Пожалуйста', meaning: lang === 'de' ? 'Bitte' : lang === 'en' ? 'Please' : 'Lütfen', translation: 'Lütfen' },
          { phrase: 'Ile to kosztuje? / Сколько стоит?', meaning: lang === 'de' ? 'Wie viel kostet das?' : lang === 'en' ? 'How much?' : 'Bu ne kadar?', translation: 'Kaç para?' },
          { phrase: 'Rachunek, proszę / Счёт, пожалуйста', meaning: lang === 'de' ? 'Rechnung bitte' : lang === 'en' ? 'Check please' : 'Hesap lütfen', translation: 'Hesap lütfen' }
        ],
        religions: lang === 'de' ? 'Römisch-Katholisch (Polen/Ungarn) und Orthodoxes Christentum.' : lang === 'en' ? 'Roman Catholic (Poland, Czechia) and Eastern Orthodox.' : 'Katolik Hristiyan (Polonya, Macaristan) ve Doğu Ortodoks gelenekleri.',
        sectors: ['Yazılım ve Bilgi Teknolojileri', 'Otomotiv Montajı ve İmalat Sanayii', 'Tarım ve Tahıl İhracatı']
      };

    case 'central_asia':
      return {
        etiquette: [
          lang === 'de' ? 'Heilige Gastfreundschaft der Seidenstraße; der Gast sitzt am Ehrenplatz (Tör).' : lang === 'en' ? 'Silk Road sacred hospitality; guests are seated at the place of honor (Tor).' : 'İpek Yolu misafirperverliği kutsaldır; konuk sofranın baş köşesine (Tör) oturtulur.',
          lang === 'de' ? 'Tee wird mit beiden Händen in Pialas serviert; eine halbe Tasse bedeutet Wertschätzung.' : lang === 'en' ? 'Tea is poured in bowls (Piala) using both hands; half-full bowl shows continuous respect.' : 'Çay piyale ile iki elle ikram edilir; taze çay sunmak için fincan yarım doldurulur.',
          lang === 'de' ? 'Brot (Nan) ist heilig; niemals umgedreht hinlegen oder wegwerfen.' : lang === 'en' ? 'Bread (Nan/Lepeshka) is sacred; never place it upside down or waste it.' : 'Ekmek (Nan/Lavaş) kutsaldır; asla ters konulmaz veya yere bırakılmaz.'
        ],
        festivals: [
          lang === 'de' ? 'Nauryz / Nevruz (Frühlingsäquinoktium, 21. März)' : lang === 'en' ? 'Nowruz / Nauryz (Spring Equinox, March 21)' : 'Nevruz Bayramı (21 Mart Bahar Ekinoksu)',
          `${capital} ${lang === 'de' ? 'Nomadenkultur- & Reiterfestival' : lang === 'en' ? 'Nomadic Horse & Heritage Games' : 'Göçebe Oyunları & Atçılık Şenliği'}`
        ],
        lifestyle: lang === 'de' ? 'Nomadische Reitertradition, weite Steppen, herzliche Jurtenkultur und tiefer Respekt vor Älteren.' : lang === 'en' ? 'Nomadic horseback heritage, endless steppes, yurt warmth, and deep reverence for elders (Aksakal).' : 'Bozkır ve göçebe kültürü, at sevgisi, ak sakallılara hürmet ve zengin ziyafetler.',
        dishes: [
          'Kazan Plov / Özbek & Kazak Pilavı (Kuzu eti, sarı havuç ve kuru üzümlü)',
          'Tandır Samsa (Kıymalı çıtır taş fırın böreği)',
          'Lagman (El açması uzun etli ve sebzeli baharatlı erişte)',
          'Mantu (Buharda pişen dev etli Orta Asya mantısı)'
        ],
        drinks: ['Kımız (Fermente kısrak sütü)', 'Kok-Chay (Geleneksel Yeşil Çay)', 'Şubat (Deve sütü)'],
        desserts: ['Çak-Çak (Ballı kızarmış hamur tatlısı)', 'Kurut (Güneşte kurutulmuş ekşi yoğurt topları)', 'Kavun ve Kuru Meyve Tabağı'],
        phrases: [
          { phrase: 'Salemetsiz be / Assalomu alaykum (Саламатсыз ба)', meaning: lang === 'de' ? 'Guten Tag' : lang === 'en' ? 'Hello / Peace upon you' : 'Esenlikler / Merhaba', translation: 'Merhaba' },
          { phrase: 'Rakhmet / Rahmat (Рахмет)', meaning: lang === 'de' ? 'Danke' : lang === 'en' ? 'Thank you' : 'Çok teşekkür ederim', translation: 'Teşekkürler' },
          { phrase: 'Otiniş / Iltimos', meaning: lang === 'de' ? 'Bitte' : lang === 'en' ? 'Please' : 'Lütfen', translation: 'Lütfen' },
          { phrase: 'Qansha turady? / Qancha turadi?', meaning: lang === 'de' ? 'Wie viel kostet das?' : lang === 'en' ? 'How much is it?' : 'Bu ne kadar?', translation: 'Kaç para?' },
          { phrase: 'Esep, otiniş / Hisob, iltimos', meaning: lang === 'de' ? 'Rechnung bitte' : lang === 'en' ? 'Check please' : 'Hesap lütfen', translation: 'Hesap lütfen' }
        ],
        religions: lang === 'de' ? 'Überwiegend Islam (Sunnitisch, Hanafitisch) mit orthodoxen Gemeinden.' : lang === 'en' ? 'Predominantly Sunni Islam (Hanafi) with Orthodox Christian communities.' : 'Ağırlıklı Sünni Hanefi İslam ve Doğu Ortodoks cemaatleri.',
        sectors: ['Petrol, Doğal Gaz ve Uranyum', 'Tahıl ve Pamuk Tarımı', 'Madencilik ve Nadir Toprak Elementleri']
      };

    case 'east_asia':
      return {
        etiquette: [
          lang === 'de' ? 'Visitenkarten und Geld immer mit beiden Händen überreichen und entgegennehmen.' : lang === 'en' ? 'Always present and receive business cards or payments with both hands.' : 'Kartvizit veya ödeme uzatırken daima iki el kullanılır.',
          lang === 'de' ? 'Leichte Verbeugung als Zeichen des Respekts; lautes Verhalten in der Öffentlichkeit vermeiden.' : lang === 'en' ? 'Respectful bow or polite nod; quiet behavior in subways and public zones.' : 'Saygılı bir baş eğme (selamlama); metro ve toplu alanlarda sessizlik esastır.',
          lang === 'de' ? 'Stäbchen niemals senkrecht in die Reisschale stecken (Symbol des Totengedenkens).' : lang === 'en' ? 'Never stick chopsticks vertically into a bowl of rice (symbol of funerals).' : 'Yemek çubukları asla pilav kasesine dik batırılmaz (cenaze ritüelidir).'
        ],
        festivals: [
          lang === 'de' ? 'Chinesisches Neujahrsfest / Mondneujahr (Frühlingsfest)' : lang === 'en' ? 'Lunar New Year / Spring Festival' : 'Ay Takvimi Yeni Yılı (Bahar Festivali)',
          lang === 'de' ? 'Mittherbstfest (Mondkuchenfest)' : lang === 'en' ? 'Mid-Autumn Moon Festival' : 'Güz Ortası ve Ay Çöreği Festivali'
        ],
        lifestyle: lang === 'de' ? 'Harmonie, Respekt vor der Gemeinschaft, Hypermodernität gepaart mit uralten Philosophien.' : lang === 'en' ? 'Social harmony, diligence, futuristic mega-cities blended with ancient Taoist and Buddhist roots.' : 'Toplumsal uyum, disiplin, fütüristik metropoller ve bin yıllık felsefi derinlik.',
        dishes: [
          'Pekin Ördeği (Çıtır derili, salatalık ve özel erik sosuyla)',
          'Dim Sum / Buharda Pişen Karidesli Xiaolongbao',
          'Kung Pao Tavuk & Sichuan Acılı Wok Spesiyalleri',
          'El Çekmesi Taze Erişte (Lamian)'
        ],
        drinks: ['Oolong & Yasemin Çayı', 'Geleneksel Yeşil Çay', 'Boba / Baloncuklu Sütlü Çay (Bubble Tea)'],
        desserts: ['Geleneksel Ay Çöreği (Mooncake)', 'Kırmızı Fasulyeli Tatlı Çörekler', 'Tangyuan (Susamlı sıcak pirinç topları)'],
        phrases: [
          { phrase: 'Nǐ hǎo (你好)', meaning: lang === 'de' ? 'Guten Tag / Hallo' : lang === 'en' ? 'Hello' : 'Merhaba', translation: 'Merhaba' },
          { phrase: 'Xièxiè (谢谢)', meaning: lang === 'de' ? 'Vielen Dank' : lang === 'en' ? 'Thank you' : 'Teşekkür ederim', translation: 'Teşekkürler' },
          { phrase: 'Qǐng (请)', meaning: lang === 'de' ? 'Bitte' : lang === 'en' ? 'Please' : 'Lütfen', translation: 'Lütfen' },
          { phrase: 'Duōshao qián? (多少钱？)', meaning: lang === 'de' ? 'Wie viel kostet das?' : lang === 'en' ? 'How much is it?' : 'Bu ne kadar?', translation: 'Kaç para?' },
          { phrase: 'Mǎidān (买单)', meaning: lang === 'de' ? 'Rechnung bitte' : lang === 'en' ? 'Check please' : 'Hesap lütfen', translation: 'Hesap lütfen' }
        ],
        religions: lang === 'de' ? 'Konfuzianismus, Buddhismus, Daoismus und säkularer Humanismus.' : lang === 'en' ? 'Confucian philosophies, Buddhism, Taoism, and secular worldviews.' : 'Konfüçyüsçülük, Budizm, Taoizm ve seküler gelenekler.',
        sectors: ['Yüksek Teknoloji, Yarı İletkenler ve Tüketici Elektroniği', 'Yenilenebilir Enerji ve Elektrikli Araçlar', 'Yüksek Hızlı Tren ve Altyapı']
      };

    case 'southeast_asia':
      return {
        etiquette: [
          lang === 'de' ? 'Begrüßung mit Handflächen aneinander (Wai / Sembah).' : lang === 'en' ? 'Warm greeting with pressed palms (Wai/Sembah) and radiant smiles.' : 'Eller göğüste birleştirilerek yapılan saygılı Wai selamı ve tebessüm esastır.',
          lang === 'de' ? 'Niemals den Kopf anderer Personen berühren (gilt als heilig).' : lang === 'en' ? 'Never touch anyone’s head, as it is considered the most sacred part of the body.' : 'Baş en kutsal yer sayılır; kimsenin başına veya saçına dokunulmaz.',
          lang === 'de' ? 'Schuhe vor Betreten von Tempeln und Wohnungen immer ausziehen.' : lang === 'en' ? 'Always remove shoes before entering temples and private residences.' : 'Tapınaklara ve evlere girerken ayakkabılar mutlaka çıkarılır.'
        ],
        festivals: [
          lang === 'de' ? 'Songkran / Wasserfestival & Neujahr' : lang === 'en' ? 'Songkran / Water Festival & Tropical New Year' : 'Songkran Sokak Su Festivali ve Tropik Yeni Yıl',
          `${capital} ${lang === 'de' ? 'Nachtmarkt- & Streetfoodfestival' : lang === 'en' ? 'Night Market & Street Food Festival' : 'Gece Pazarları ve Sokak Lezzetleri Şenliği'}`
        ],
        lifestyle: lang === 'de' ? 'Entspanntes Tropenleben, bunte Nachtmärkte, "Land des Lächelns"-Mentalität.' : lang === 'en' ? 'Vibrant night markets, relaxed tropical pace, scooter culture, and sunny disposition.' : 'Renkli gece pazarları, motor kültürü, telaşsız tropik ritim ve güleryüzlülük.',
        dishes: [
          'Nasi Goreng / Pad Thai (Kızarmış aromatik pirinç veya erişte)',
          'Pho (Yıldız anason ve taze otlarla aromatik dana etli et suyu çorbası)',
          'Satay Şişleri (Fıstık soslu ızgara tavuk ve dana şişler)',
          'Rendang (Hindistan cevizi sütü ve baharatlarla ağır pişen enfes et)'
        ],
        drinks: ['Taze Hindistan Cevizi Suyu', 'Tropik Mango & Çarkıfelek Meyvesi Suları', 'Buzlu Güneydoğu Asya Kahvesi'],
        desserts: ['Mango Sticky Rice (Hindistan cevizli yapışkan pirinç)', 'Muzlu Kızarmış Pisang Goreng', 'Cendol'],
        phrases: [
          { phrase: 'Halo / Sawatdee / Xin chào', meaning: lang === 'de' ? 'Hallo' : lang === 'en' ? 'Hello' : 'Merhaba', translation: 'Merhaba' },
          { phrase: 'Terima kasih / Khop khun / Cảm ơn', meaning: lang === 'de' ? 'Danke' : lang === 'en' ? 'Thank you' : 'Teşekkür ederim', translation: 'Teşekkürler' },
          { phrase: 'Tolong / Xin vui lòng', meaning: lang === 'de' ? 'Bitte' : lang === 'en' ? 'Please' : 'Lütfen', translation: 'Lütfen' },
          { phrase: 'Berapa harganya? / Bao nhiêu?', meaning: lang === 'de' ? 'Wie viel kostet das?' : lang === 'en' ? 'How much?' : 'Bu ne kadar?', translation: 'Kaç para?' },
          { phrase: 'Minta bon / Check bin', meaning: lang === 'de' ? 'Rechnung bitte' : lang === 'en' ? 'Check please' : 'Hesap lütfen', translation: 'Hesap lütfen' }
        ],
        religions: lang === 'de' ? 'Buddhismus, Islam (Indonesien/Malaysia), Katholizismus (Philippinen).' : lang === 'en' ? 'Buddhism, Islam (Indonesia/Malaysia), Roman Catholicism (Philippines).' : 'Budizm (Tayland, Vietnam), İslam (Endonezya, Malezya), Katoliklik (Filipinler).',
        sectors: ['Tropik Turizm ve Misafirperverlik', 'Elektronik ve Yarı İletken Montajı', 'Tarım (Pirinç, Kauçuk, Palmiye)']
      };

    case 'south_asia':
      return {
        etiquette: [
          lang === 'de' ? 'Traditionelle Begrüßung mit "Namaste" (Handflächen vor der Brust).' : lang === 'en' ? 'Traditional greeting with "Namaste" (palms folded at chest level).' : 'Eller göğüste birleştirilerek yapılan "Namaste" selamı saygı göstergesidir.',
          lang === 'de' ? 'Essen und Überreichen von Gegenständen traditionell nur mit der rechten Hand.' : lang === 'en' ? 'Always use your right hand for eating, paying, and passing items.' : 'Yemek yerken veya para uzatırken mutlaka sağ el kullanılır.',
          lang === 'de' ? 'Schuhe vor heiligen Tempeln und Wohnräumen ausziehen.' : lang === 'en' ? 'Always remove footwear before stepping into temples and households.' : 'Tapınaklara ve evlere girmeden önce ayakkabılar kapıda çıkarılır.'
        ],
        festivals: [
          lang === 'de' ? 'Diwali (Lichterfest) & Holi (Farbenfest)' : lang === 'en' ? 'Diwali (Festival of Lights) & Holi (Festival of Colors)' : 'Diwali (Işık Festivali) & Holi (Renkler Festivali)',
          `${capital} ${lang === 'de' ? 'Kultur- & Tempelfestival' : lang === 'en' ? 'Heritage & Temple Procession' : 'Miras ve Tapınak Alayları'}`
        ],
        lifestyle: lang === 'de' ? 'Farbenfroh, spirituell, generationenübergreifende Großfamilien und lebhafte Basare.' : lang === 'en' ? 'Colorful, spiritually rich, multigenerational family life, and bustling bazaars.' : 'Rengarenk kumaşlar, baharat kokulu çarşılar, derin maneviyat ve geniş aile kültürü.',
        dishes: [
          'Dum Pukht Biryani (Kakuleli, safranlı ve kuzu etli basmati pilavı)',
          'Tandoori Tavuk & Çıtır Sarımsaklı Naan Ekmeği',
          'Masala Dosa (Mercimek ve patates dolgulu çıtır krep)',
          'Dal Makhani & Paneer Tikka (Zengin tereyağlı ve baharatlı lezzetler)'
        ],
        drinks: ['Chai Masala (Zencefil ve kakuleli sıcak sütlü baharat çayı)', 'Mango Lassi (Soğuk yoğurtlu ferahlatıcı içecek)', 'Taze Şeker Kamışı Suyu'],
        desserts: ['Gulab Jamun (Sıcak şerbetli süt topları)', 'Kaju Katli (Kaju tatlısı)', 'Jalebi'],
        phrases: [
          { phrase: 'Namaste (नमस्ते) / Assalam-o-Alaikum', meaning: lang === 'de' ? 'Guten Tag / Hallo' : lang === 'en' ? 'Greetings / Hello' : 'Merhaba / Selamlar', translation: 'Merhaba' },
          { phrase: 'Dhanyavaad (धन्यवाद) / Shukriya', meaning: lang === 'de' ? 'Vielen Dank' : lang === 'en' ? 'Thank you' : 'Çok teşekkür ederim', translation: 'Teşekkürler' },
          { phrase: 'Kripya (कृपया) / Meherbani', meaning: lang === 'de' ? 'Bitte' : lang === 'en' ? 'Please' : 'Lütfen', translation: 'Lütfen' },
          { phrase: 'Yeh kitne ka hai? (यह कितने का है?)', meaning: lang === 'de' ? 'Wie viel kostet das?' : lang === 'en' ? 'How much is this?' : 'Bu ne kadar?', translation: 'Kaç para?' },
          { phrase: 'Bill de dijiye (बिल दे दीजिए)', meaning: lang === 'de' ? 'Rechnung bitte' : lang === 'en' ? 'Bill please' : 'Hesap lütfen', translation: 'Hesap lütfen' }
        ],
        religions: lang === 'de' ? 'Hinduismus, Islam, Sikhismus, Buddhismus und Jainismus.' : lang === 'en' ? 'Hinduism, Islam, Sikhism, Buddhism, and Jainism in historic coexistence.' : 'Hinduizm, İslam, Sihizm, Budizm ve Caynizm inançları.',
        sectors: ['Bilgi Teknolojileri ve Yazılım Hizmetleri', 'İlaç ve Biyoteknoloji', 'Tekstil ve Mücevherat']
      };

    case 'caribbean':
      return {
        etiquette: [
          lang === 'de' ? 'Sehr entspannte Lebenseinstellung ("Island Time"); kein Stress bei Verzögerungen.' : lang === 'en' ? 'Laid-back "Island Time"; rushing is discouraged, friendly banter is key.' : 'Ada zamanı ("Island Time") geçerlidir; aceleye gerek yoktur, neşeli sohbet esastır.',
          lang === 'de' ? 'Herzliche Begrüßung und Respekt für ältere Mitbürger.' : lang === 'en' ? 'Warm verbal greetings when entering public spaces or minibuses.' : 'Minibüse veya bir dükkana girerken herkesi sıcakça selamlamak adettendir.',
          lang === 'de' ? 'Badekleidung gehört ausschließlich an den Strand, nicht in Stadtzentren.' : lang === 'en' ? 'Beachwear is strictly for beaches; cover up when walking into towns.' : 'Mayo ve plaj kıyafeti sadece kumsaldadır; kasaba merkezlerinde normal giyinilir.'
        ],
        festivals: [
          lang === 'de' ? 'Karibischer Straßenkarneval & Reggae-Festivals' : lang === 'en' ? 'Caribbean Street Carnival & Calypso/Reggae Sunsplash' : 'Karayip Sokak Karnavalı ve Reggae Festivali',
          `${capital} ${lang === 'de' ? 'Kultur- & Rumfestival' : lang === 'en' ? 'Heritage & Rum Festival' : 'Tarih ve Müzik Şenliği'}`
        ],
        lifestyle: lang === 'de' ? 'Rhythmus, Reggae, Salsa, türkisblaues Meer und purer Genuss des Augenblicks.' : lang === 'en' ? 'Salsa rhythms, turquoise waters, steel drums, and celebratory community spirit.' : 'Salsa ve reggae ritimleri, turkuaz deniz, palmiyeler ve hayattan keyif alma sanatı.',
        dishes: [
          'Jerk Chicken (Karayip baharatlarında marine mangal tavuğu)',
          'Ropa Vieja (Tiftiklenmiş et, pirinç ve siyah fasulye)',
          'Tostones (Kızarmış çıtır yeşil muz dilimleri)',
          'Karidesli Taze Ceviche ve Istakoz'
        ],
        drinks: ['Geleneksel Şeker Kamışı Rom Kokteylleri (Mojito, Piña Colada)', 'Taze Tropik Meyve Suları', 'Zencefilli Bira'],
        desserts: ['Romlu Karayip Keki', 'Hindistan Cevizli Flan', 'Karamelli Muz'],
        phrases: [
          { phrase: '¡Hola! / Waa gwaan / Wah gwan', meaning: lang === 'de' ? 'Hallo / Wie geht’s' : lang === 'en' ? 'Hello / What’s up' : 'Merhaba / Ne haber', translation: 'Merhaba' },
          { phrase: 'Muchas gracias / Respect / Thanks', meaning: lang === 'de' ? 'Vielen Dank' : lang === 'en' ? 'Thank you very much' : 'Çok teşekkürler', translation: 'Teşekkürler' },
          { phrase: 'Por favor / Please', meaning: lang === 'de' ? 'Bitte' : lang === 'en' ? 'Please' : 'Lütfen', translation: 'Lütfen' },
          { phrase: '¿Cuánto cuesta? / How much fi dis?', meaning: lang === 'de' ? 'Wie viel kostet das?' : lang === 'en' ? 'How much is this?' : 'Bu ne kadar?', translation: 'Kaç para?' },
          { phrase: 'La cuenta, por favor / The check', meaning: lang === 'de' ? 'Rechnung bitte' : lang === 'en' ? 'Check please' : 'Hesap lütfen', translation: 'Hesap lütfen' }
        ],
        religions: lang === 'de' ? 'Christentum (Katholisch und Protestantisch) mit afro-karibischen Traditionen.' : lang === 'en' ? 'Christianity (Catholic and Protestant) blended with Afro-Caribbean traditions.' : 'Hristiyanlık ve Afro-Karayip manevi gelenekleri.',
        sectors: ['Lüks Kruvaziyer ve Sahil Turizmi', 'Şeker Kamışı ve Rom Üretimi', 'Offshore Finans Hizmetleri']
      };

    case 'sub_saharan_africa':
      return {
        etiquette: [
          lang === 'de' ? 'Ubuntu-Philosophie: "Ich bin, weil wir sind"; tiefe Gemeinschaftsverbundenheit.' : lang === 'en' ? 'Ubuntu philosophy: "I am because we are"; deep warmth and community connection.' : '"Ubuntu" felsefesi: "Ben, biz olduğumuz için benim"; güçlü dayanışma ve samimiyet.',
          lang === 'de' ? 'Älteren Menschen wird uneingeschränkter Respekt entgegengebracht.' : lang === 'en' ? 'Great reverence shown to village elders and grandparents.' : 'Yaşlılara ve büyüklere en üst düzeyde hürmet gösterilir.',
          lang === 'de' ? 'Vor dem Fotografieren von Einheimischen stets freundlich um Erlaubnis bitten.' : lang === 'en' ? 'Always ask permission politely before taking photos of individuals.' : 'İnsanları fotoğraflamadan önce mutlaka güleryüzle izin istenir.'
        ],
        festivals: [
          lang === 'de' ? 'Afrikanisches Kultur- & Trommelfestival' : lang === 'en' ? 'Pan-African Drum & Heritage Festival' : 'Afrika Kültür ve Davul Festivali',
          `${capital} ${lang === 'de' ? 'Kunst- & Musikmesse' : lang === 'en' ? 'Arts & Fashion Week' : 'Geleneksel Sanat ve Müzik Festivali'}`
        ],
        lifestyle: lang === 'de' ? 'Lebendige Farben, Trommelrhythmen, Naturverbundenheit und unerschütterlicher Optimismus.' : lang === 'en' ? 'Vibrant fabrics (Wax/Kente), rhythmic music, savannah wildlife, and boundless energy.' : 'Rengarenk kumaşlar, doğayla iç içe safari zenginliği, neşe ve ritim dolu yaşam tarzı.',
        dishes: [
          'Jollof Rice (Baharatlı domates sosunda pişen meşhur fırın pirinci)',
          'Braai / Nyama Choma (Açık ateşte pişen enfes ızgara etler)',
          'Injera & Doro Wat (Etiyopya ekşi mayalı gözlemesi ve tavuk yahnisi)',
          'Suya (Baharatlı közde sığır eti şişleri)'
        ],
        drinks: ['Rooibos Çayı', 'Bissap / Karkadeh (Taze Hibiskus Çiçeği İçeceği)', 'Zencefil ve Palmiye Özü İçeceği'],
        desserts: ['Malva Puding (Sıcak karamelli kayısı keki)', 'Puff Puff (Tarçınlı tatlı hamur topları)', 'Tropik Meyve Tabağı'],
        phrases: [
          { phrase: 'Jambo / Habari / Sawubona', meaning: lang === 'de' ? 'Guten Tag / Hallo' : lang === 'en' ? 'Hello / Greetings' : 'Merhaba / Selamlar', translation: 'Merhaba' },
          { phrase: 'Asante sana / Ngiyabonga', meaning: lang === 'de' ? 'Vielen Dank' : lang === 'en' ? 'Thank you very much' : 'Çok teşekkür ederim', translation: 'Teşekkürler' },
          { phrase: 'Tafadhali / Please', meaning: lang === 'de' ? 'Bitte' : lang === 'en' ? 'Please' : 'Lütfen', translation: 'Lütfen' },
          { phrase: 'Hii ni bei gani? / How much?', meaning: lang === 'de' ? 'Wie viel kostet das?' : lang === 'en' ? 'How much is it?' : 'Bu ne kadar?', translation: 'Kaç para?' },
          { phrase: 'Lete bili / The bill please', meaning: lang === 'de' ? 'Rechnung bitte' : lang === 'en' ? 'Check please' : 'Hesap lütfen', translation: 'Hesap lütfen' }
        ],
        religions: lang === 'de' ? 'Christentum und Islam neben traditionellen afrikanischen Glaubensformen.' : lang === 'en' ? 'Christianity and Islam alongside traditional indigenous beliefs.' : 'Hristiyanlık, İslam ve kadim yerel Afrika inançları.',
        sectors: ['Safari ve Doğa Turizmi', 'Elmas, Altın ve Kritik Madenler', 'Tarım (Kahve, Kakao, Çay)']
      };

    case 'oceania':
      return {
        etiquette: [
          lang === 'de' ? 'Sehr lockere Begrüßung ("G’day mate"); Hierarchien spielen kaum eine Rolle.' : lang === 'en' ? 'Egalitarian and informal ("G’day mate"); people value modesty and fair play.' : 'Oldukça rahat ve samimi selamlama ("G’day mate"); eşitlik ve dürüstlük esastır.',
          lang === 'de' ? 'Starker Sonnenschutz (Slip, Slop, Slap) ist lebensnotwendig.' : lang === 'en' ? 'Sun protection is serious business due to intense UV rays.' : 'Güneş ışınları çok kuvvetlidir; şapka ve güneş kremi mutlaka kullanılır.',
          lang === 'de' ? 'Respekt vor indigenen Kulturstätten (Aboriginal / Maori).' : lang === 'en' ? 'Deep respect for indigenous sacred sites and ancestral lands.' : 'Aborjin ve Maori kutsal mekanlarına ve doğaya titizlikle saygı gösterilir.'
        ],
        festivals: [
          lang === 'de' ? 'Australien- / Neuseeland-Nationalfeiertage' : lang === 'en' ? 'Australia / Waitangi National Heritage Days' : 'Milli Gün ve Miras Kutlamaları',
          `${capital} ${lang === 'de' ? 'Hafen- & Kulturfestival' : lang === 'en' ? 'Harbour Arts & Fringe Festival' : 'Liman Festivali ve Sahil Şenlikleri'}`
        ],
        lifestyle: lang === 'de' ? 'Outdoor- und Surfkultur, Barbecue im Park, flache Hierarchien und "No worries"-Haltung.' : lang === 'en' ? 'Beach and surf lifestyle, park BBQs, coffee connoisseur culture, and "No worries" attitude.' : 'Sörf ve sahil yaşamı, parklarda barbekü, dünya lideri kahve kültürü ve telaşsız yaşam.',
        dishes: [
          'Aussie BBQ (Kömürde kuzu pirzola ve sosisler)',
          'Meat Pie (Sıcak çıtır etli fırın böreği & domates sosu)',
          'Taze Okyanus İstridyesi & Barramundi Balığı'
        ],
        drinks: ['Flat White (Özel Avustralya sütlü espresso kahvesi)', 'Yerel Shiraz & Sauvignon Blanc Şarapları', 'Zencefilli Soğuk Gazoz'],
        desserts: ['Pavlova (Taze çarkıfelek meyveli ve kremalı beze tatlısı)', 'Lamington (Hindistan cevizi kaplı çikolatalı pandispanya)', 'Tim Tam'],
        phrases: [
          { phrase: 'G’day mate! / Kia ora', meaning: lang === 'de' ? 'Hallo mein Freund' : lang === 'en' ? 'Good day / Hello' : 'İyi günler / Merhaba', translation: 'Merhaba' },
          { phrase: 'Thanks a lot / Cheers / Nga mihi', meaning: lang === 'de' ? 'Vielen Dank' : lang === 'en' ? 'Thank you very much' : 'Çok teşekkürler', translation: 'Teşekkürler' },
          { phrase: 'Please / No worries', meaning: lang === 'de' ? 'Bitte / Gern geschehen' : lang === 'en' ? 'Please / No worries' : 'Lütfen / Sorun değil', translation: 'Lütfen' },
          { phrase: 'How much is this?', meaning: lang === 'de' ? 'Wie viel kostet das?' : lang === 'en' ? 'How much is this?' : 'Bu ne kadar?', translation: 'Kaç para?' },
          { phrase: 'Could we get the bill?', meaning: lang === 'de' ? 'Rechnung bitte' : lang === 'en' ? 'Check please' : 'Hesap lütfen', translation: 'Hesap lütfen' }
        ],
        religions: lang === 'de' ? 'Überwiegend christlich und säkular mit Respekt vor indigenen Überzeugungen.' : lang === 'en' ? 'Predominantly Christian and secular with respect for indigenous spirituality.' : 'Ağırlıklı Hristiyan ve seküler toplum, zengin yerli inanç mirası.',
        sectors: ['Demir Cevheri, Kömür ve Madencilik', 'Uluslararası Eğitim ve Finans', 'Tarım (Yün, Et ve Şarap İhracatı)']
      };

    default:
      return {
        etiquette: [
          lang === 'de' ? 'Höfliche Begrüßung mit Blickkontakt und Lächeln.' : lang === 'en' ? 'Warm handshake and respectful eye contact.' : 'Sıcak bir tebessüm ve el sıkışarak selamlaşma esastır.',
          lang === 'de' ? 'Respekt vor lokalen Gebräuchen und historischen Stätten.' : lang === 'en' ? 'Respect for local customs and historical sanctums.' : 'Yerel adetlere ve kutsal mekanlara saygı gösterilir.',
          lang === 'de' ? 'Vor dem Fotografieren von Personen um Erlaubnis bitten.' : lang === 'en' ? 'Always ask permission before photographing residents.' : 'İnsanları fotoğraflamadan önce nazikçe izin isteyin.'
        ],
        festivals: [
          `${countryName} ${lang === 'de' ? 'Nationalfeiertag' : lang === 'en' ? 'National Heritage Day' : 'Milli Gün Kutlamaları'}`,
          `${capital} ${lang === 'de' ? 'Stadt- & Kunstfestival' : lang === 'en' ? 'Arts Festival' : 'Kültür & Sanat Festivali'}`
        ],
        lifestyle: lang === 'de' ? 'Traditionelle Gastfreundschaft und Gemeinschaftssinn.' : lang === 'en' ? 'Deep-rooted community warmth and authentic local traditions.' : 'Köklü toplumsal değerler, sıcak misafirperverlik ve hareketli pazar kültürü.',
        dishes: [
          `${countryName} ${lang === 'de' ? 'Traditioneller Schmortopf & Gewürzreis' : lang === 'en' ? 'Traditional Slow-Cooked Stew & Fragrant Rice' : 'Geleneksel Fırın Yahnisi & Baharatlı Pilav'}`,
          lang === 'de' ? 'Frisch gebackenes Fladenbrot & lokale Käsesorten' : lang === 'en' ? 'Fresh stone-oven bread & regional artisan cheeses' : 'Taze Taş Fırın Ekmeği & Yöresel Peynir Çeşitleri',
          lang === 'de' ? 'Gegrillte Fleischspieße & gegrilltes Gartengemüse' : lang === 'en' ? 'Grilled skewers & seasonal garden vegetables' : 'Közde Izgara Spesiyalleri & Taze Mevsim Sebzeleri'
        ],
        drinks: [
          lang === 'de' ? 'Regionale Kräuter- und Blütentees' : lang === 'en' ? 'Regional herbal infusions and teas' : 'Yöresel Bitki ve Meyve Çayları',
          lang === 'de' ? 'Frisch gepresste Fruchtsäfte' : lang === 'en' ? 'Freshly pressed natural fruit juices' : 'Taze Sıkılmış Doğal Meyve Suları',
          lang === 'de' ? 'Lokal gerösteter Kaffee' : lang === 'en' ? 'Locally roasted coffee' : 'Kavrulmuş Yerel Kahve'
        ],
        desserts: [
          lang === 'de' ? 'Traditionelles Honig- & Nussgebäck' : lang === 'en' ? 'Traditional honey & nut pastries' : 'Ballı ve Cevizli Geleneksel Hamur Tatlısı',
          lang === 'de' ? 'Saisonale frische Fruchtplatte' : lang === 'en' ? 'Seasonal fresh fruit platter' : 'Taze Mevsim Meyveleri Tabağı'
        ],
        phrases: [
          { phrase: 'Hello / Welcome', meaning: lang === 'de' ? 'Hallo' : lang === 'en' ? 'Hello' : 'Merhaba', translation: 'Merhaba' },
          { phrase: 'Thank you', meaning: lang === 'de' ? 'Danke' : lang === 'en' ? 'Thank you' : 'Teşekkürler', translation: 'Teşekkürler' },
          { phrase: 'Please', meaning: lang === 'de' ? 'Bitte' : lang === 'en' ? 'Please' : 'Lütfen', translation: 'Lütfen' },
          { phrase: 'How much is this?', meaning: lang === 'de' ? 'Wie viel kostet das?' : lang === 'en' ? 'How much?' : 'Bu ne kadar?', translation: 'Kaç para?' },
          { phrase: 'Bill please', meaning: lang === 'de' ? 'Rechnung bitte' : lang === 'en' ? 'Check please' : 'Hesap lütfen', translation: 'Hesap lütfen' }
        ],
        religions: lang === 'de' ? 'Vielfältige religiöse Traditionen.' : lang === 'en' ? 'Pluralistic cultural and spiritual traditions.' : 'Zengin kültürel ve manevi çeşitlilik barındıran inanç yapısı.',
        sectors: ['Kültür ve Doğa Turizmi', 'Hizmet ve Ticaret', 'Tarım ve Yerel Üretim']
      };
  }
}

/**
 * Ülke Ansiklopedisi Getirici
 */
export function getCountryEncyclopedia(countryCode: string, lang: string = 'tr'): CountryEncyclopediaData {
  const code = countryCode.toUpperCase();
  const ALL_CURATED: Record<string, CuratedEntry> = {
    ...CURATED_ENCYCLOPEDIA,
    ...CURATED_EXTRA,
    ...CURATED_EXTRA_2,
    ...CURATED_EXTRA_3
  };
  const curated = ALL_CURATED[code];
  const countryName = getCountryName(code, lang);
  const geo = GEO_DATA[code];
  const insights = getCountryInsights(code, lang);

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
      culture: {
        etiquette: tArr(curated.culture.etiquette),
        festivals: tArr(curated.culture.festivals),
        lifestyle: tField(curated.culture.lifestyle)
      },
      tourism: {
        mustSeePlaces: tArr(curated.tourism.mustSeePlaces),
        bestSeasons: tField(curated.tourism.bestSeasons),
        travelStyleTip: tField(curated.tourism.travelStyleTip)
      },
      religion: {
        primaryReligions: tField(curated.religion.primaryReligions),
        respectNorms: tField(curated.religion.respectNorms),
        sacredSites: tArr(curated.religion.sacredSites)
      },
      language: {
        officialLanguages: tField(curated.language.officialLanguages),
        englishProficiency: tField(curated.language.englishProficiency),
        phrases: curated.language.phrases.map(p => {
          const meaning = lang === 'tr' ? p.meaningTr : lang === 'de' ? p.meaningDe : lang === 'en' ? p.meaningEn : lText(lang, p.meaningTr, p.meaningEn, p.meaningDe);
          return {
            phrase: p.phrase,
            meaning,
            translation: meaning,
            pronunciation: p.pronunciation
          };
        })
      },
      history: {
        conciseHistory: tField(curated.history.conciseHistory),
        milestones: tArr(curated.history.milestones)
      },
      gastronomy: {
        famousDishes: tArr(curated.gastronomy.famousDishes),
        traditionalDrinks: tArr(curated.gastronomy.traditionalDrinks),
        streetFoodAndDesserts: tArr(curated.gastronomy.streetFoodAndDesserts)
      },
      achievements: {
        famousFigures: tArr(curated.achievements.famousFigures),
        strongSectors: tArr(curated.achievements.strongSectors)
      },
      economy: {
        paymentCulture: tField(curated.economy.paymentCulture),
        economicPillars: tField(curated.economy.economicPillars),
        tippingCulture: tField(curated.economy.tippingCulture)
      }
    };
  }

  // Otantik Bölgesel ve Ülke Mirası Motoru
  const isTr = lang === 'tr';
  const isEn = lang === 'en';
  const isDe = lang === 'de';
  const isEs = lang === 'es';
  const isRu = lang === 'ru';
  const normLang: 'tr' | 'en' | 'de' = isDe ? 'de' : isTr ? 'tr' : 'en';

  const capital = geo ? geo.capital : (isDe ? 'Hauptstadt' : isEs ? 'Capital' : isRu ? 'Столица' : isTr ? 'Başkent' : 'Capital');
  const hub = geo ? geo.mainHub : (isDe ? 'Flughafen' : isEs ? 'Aeropuerto' : isRu ? 'Аэропорт' : isTr ? 'Havalimanı' : 'Airport');
  const currency = insights.currency;
  const region = getCountryRegion(code);
  const profileTr = getRegionalProfile(region, capital, countryName, 'tr');
  const profileEn = getRegionalProfile(region, capital, countryName, 'en');
  const profileDe = getRegionalProfile(region, capital, countryName, 'de');
  const profile = isDe ? profileDe : isEn ? profileEn : isTr ? profileTr : profileTr;

  const mapStr = (tr: string, en: string, de?: string) => lText(lang, tr, en, de);
  const mapArr = (trArr: string[], enArr: string[], deArr?: string[]) =>
    trArr.map((item, i) => lText(lang, item, enArr[i] || item, deArr?.[i]));

  const heritage = COUNTRY_HERITAGE[code];

  const visual = getCountryVisual(code);
  const mustSeePlaces = heritage
    ? (isDe
        ? heritage.landmarks.de
        : isTr
        ? heritage.landmarks.tr
        : isEs || isRu
        ? heritage.landmarks.tr.map((l, idx) => lText(lang, l, heritage.landmarks.en?.[idx] || l, heritage.landmarks.de?.[idx]))
        : heritage.landmarks.en)
    : [
        visual.landmark,
        `${capital} ${isDe ? 'Historisches Altstadtzentrum & Hauptboulevard' : isEs ? 'Centro Histórico y Plaza Mayor' : isRu ? 'Исторический центр города и главная площадь' : isTr ? 'Tarihi Şehir Merkezi & Kent Meydanı' : 'Historic Old Town & Grand Boulevard'}`,
        `${countryName} ${isDe ? 'Nationales Kultur- und Naturerbe' : isEs ? 'Patrimonio Cultural y Parque Nacional' : isRu ? 'Национальное историческое и природное святилище' : isTr ? 'Ulusal Tarih ve Doğa Parkı' : 'National Cultural & Natural Sanctuary'}`
      ];

  const famousFigures = heritage
    ? (isDe
        ? heritage.figures.de
        : isTr
        ? heritage.figures.tr
        : isEs || isRu
        ? heritage.figures.tr.map((f, idx) => lText(lang, f, heritage.figures.en?.[idx] || f, heritage.figures.de?.[idx]))
        : heritage.figures.en)
    : [
        `${countryName} ${isDe ? 'Historische Persönlichkeiten & Pioniere' : isEs ? 'Líderes Históricos y Pioneros' : isRu ? 'Исторические лидеры и национальные деятели' : isTr ? 'Tarihi Önderleri ve Milli Şahsiyetleri' : 'Historical Leaders & Cultural Pioneers'}`,
        `${countryName} ${isDe ? 'Anerkannte Künstler & Kulturschaffende' : isEs ? 'Artistas y Escritores Destacados' : isRu ? 'Известные деятели культуры и искусства' : isTr ? 'Tanınan Sanatçıları ve Yazarları' : 'Acclaimed Artists & Creators'}`,
        `${countryName} ${isDe ? 'Internationale Spitzensportler' : isEs ? 'Deportistas Destacados' : isRu ? 'Национальные спортсмены' : isTr ? 'Milli Sporcuları ve Başarı İsimleri' : 'International Athletes'}`
      ];

  const strongSectors = heritage ? heritage.sectors : profile.sectors;

  return {
    countryCode: code,
    countryName,
    culture: {
      etiquette: isEs || isRu ? mapArr(profileTr.etiquette, profileEn.etiquette, profileDe.etiquette) : profile.etiquette,
      festivals: isEs || isRu ? mapArr(profileTr.festivals, profileEn.festivals, profileDe.festivals) : profile.festivals,
      lifestyle: isEs || isRu ? mapStr(profileTr.lifestyle, profileEn.lifestyle, profileDe.lifestyle) : profile.lifestyle
    },
    tourism: {
      mustSeePlaces,
      bestSeasons: insights.bestMonths || (isDe ? 'Mai - Oktober für beste Reisebedingungen' : isEs ? 'Mayo - Octubre para el mejor clima' : isRu ? 'Май - октябрь для наилучшей погоды' : isTr ? 'Mayıs - Ekim ayları en ideal seyahat dönemidir' : 'May - October for best weather'),
      travelStyleTip: isDe
        ? `Anreise über den internationalen Flughafen ${hub}. Nutzen Sie lokale Fahrdienste und Züge.`
        : isEs
        ? `Llegada a través del centro internacional de ${hub}. Se recomienda el uso de apps de viaje compartido y trenes.`
        : isRu
        ? `Прибытие через международный хаб ${hub}. Рекомендуется использовать сервисы такси и поезда.`
        : isTr
        ? `${hub} havalimanı ana giriş kapısıdır. Şehir içinde araç çağırma uygulamaları ve trenler tercih edilebilir.`
        : `Arrive via ${hub} international hub. Ride-hailing apps and local rail offer the best experience.`
    },
    religion: {
      primaryReligions: isEs || isRu ? mapStr(profileTr.religions, profileEn.religions, profileDe.religions) : profile.religions,
      respectNorms: isDe
        ? 'In Gotteshäusern wird respektvolle Kleidung (Schultern und Knie bedecken) erwartet.'
        : isEs
        ? 'En lugares sagrados y templos se espera vestimenta modesta (hombros y rodillas cubiertos) y respeto al silencio.'
        : isRu
        ? 'При посещении религиозных объектов требуется скромная одежда (закрытые плечи и колени) и соблюдение тишины.'
        : isTr
        ? 'İbadethanelere girerken omuz ve dizlerin örtülü olmasına ve sessizliğe özen gösterilir.'
        : 'Modest attire covering shoulders and knees is appreciated in sacred spaces.',
      sacredSites: heritage?.sacredSites
        ? (isDe
            ? heritage.sacredSites.de
            : isTr
            ? heritage.sacredSites.tr
            : isEs || isRu
            ? heritage.sacredSites.tr.map((s, idx) => lText(lang, s, heritage?.sacredSites?.en?.[idx] || s, heritage?.sacredSites?.de?.[idx]))
            : heritage.sacredSites.en)
        : [
            isDe ? `${capital} Historische Kathedrale & Heiligtum` : isEs ? `${capital} Templo Histórico y Patrimonio Religioso` : isRu ? `${capital} Исторический собор и святыня` : isTr ? `${capital} Tarihi Başkent Mabedi ve Dini Mirası` : `${capital} Historic Sanctuary & Religious Heritage`
          ]
    },
    language: {
      officialLanguages: isDe
        ? `${countryName} Landessprache. Englisch in Tourismuszentren geläufig.`
        : isEs
        ? `Idioma oficial de ${countryName}. El inglés es habitual en zonas turísticas.`
        : isRu
        ? `Государственный язык: ${countryName}. Английский понятен в туристических зонах.`
        : isTr
        ? `${countryName} resmi dili. Turistik noktalarda ve otellerde İngilizce anlaşılabilir.`
        : `${countryName} official language. English understood in hotels and tourism zones.`,
      englishProficiency: isDe
        ? 'Gut in Großstädten; Übersetzungs-Apps auf dem Land nützlich.'
        : isEs
        ? 'Bueno en las principales ciudades; apps de traducción recomendadas en zonas rurales.'
        : isRu
        ? 'Хороший в крупных городах; в сельской местности полезны приложения-переводчики.'
        : isTr
        ? 'Büyük şehirlerde ve otellerde iyi; kırsal bölgelerde çeviri uygulamaları faydalıdır.'
        : 'Good in major hubs; translation apps helpful in small towns.',
      phrases: profile.phrases.map((p, i) => ({
        ...p,
        meaning: isEs || isRu
          ? lText(lang, profileTr.phrases[i]?.meaning || p.meaning, profileEn.phrases[i]?.meaning || p.meaning, profileDe.phrases[i]?.meaning)
          : p.meaning
      }))
    },
    history: {
      conciseHistory: heritage?.history?.concise
        ? (isDe ? heritage.history.concise.de : isTr ? heritage.history.concise.tr : isEs || isRu ? lText(lang, heritage.history.concise.tr, heritage.history.concise.en || heritage.history.concise.tr, heritage.history.concise.de) : heritage.history.concise.en)
        : isDe
        ? `${countryName} besitzt ein reiches historisches Erbe, geprägt von frühen Epochen, Handelsrouten und der modernen Unabhängigkeit.`
        : isEs
        ? `${countryName} cuenta con un rico legado histórico marcado por antiguas rutas comerciales, soberanía e independencia, y un dinámico desarrollo moderno.`
        : isRu
        ? `${countryName} обладает богатым историческим наследием, сформированным древними торговыми путями, независимостью и современным развитием.`
        : isTr
        ? `${countryName}, antik ticaret rotaları, bağımsızlık mücadelesi ve modern kalkınmayla şekillenmiş köklü bir tarihe sahiptir.`
        : `${countryName} boasts a rich historical legacy shaped by ancient trade routes, sovereign independence, and dynamic modern development.`,
      milestones: heritage?.history?.milestones
        ? (isDe
            ? heritage.history.milestones.de
            : isTr
            ? heritage.history.milestones.tr
            : isEs || isRu
            ? heritage.history.milestones.tr.map((m, idx) => lText(lang, m, heritage?.history?.milestones?.en?.[idx] || m, heritage?.history?.milestones?.de?.[idx]))
            : heritage.history.milestones.en)
        : [
            isDe ? `${countryName} Frühe Siedlungen & Meilensteine` : isEs ? `Primeros Asentamientos e Hitos Históricos de ${countryName}` : isRu ? `Ранние поселения и исторические вехи: ${countryName}` : isTr ? `${countryName} Erken Yerleşimleri ve Tarihi Dönüm Noktaları` : `${countryName} Early Settlements & Historic Milestones`,
            isDe ? `${countryName} Nationale Unabhängigkeit` : isEs ? `Declaración de Independencia y Soberanía de ${countryName}` : isRu ? `Провозглашение независимости и суверенитета: ${countryName}` : isTr ? `${countryName} Milli Bağımsızlık ve Egemenlik İlanı` : `${countryName} National Independence & Sovereignty`,
            isDe ? `${countryName} Moderne Ära & Globale Kooperation` : isEs ? `Era Moderna y Alianzas Globales de ${countryName}` : isRu ? `Современная эпоха и глобальное партнерство: ${countryName}` : isTr ? `${countryName} Modern Dönem ve Küresel İş Birlikleri` : `${countryName} Modern Era & Global Partnerships`
          ]
    },
    gastronomy: {
      famousDishes: isEs || isRu ? mapArr(profileTr.dishes, profileEn.dishes, profileDe.dishes) : profile.dishes,
      traditionalDrinks: isEs || isRu ? mapArr(profileTr.drinks, profileEn.drinks, profileDe.drinks) : profile.drinks,
      streetFoodAndDesserts: isEs || isRu ? mapArr(profileTr.desserts, profileEn.desserts, profileDe.desserts) : profile.desserts
    },
    achievements: {
      famousFigures,
      strongSectors: isEs || isRu ? mapArr(strongSectors, strongSectors) : strongSectors
    },
    economy: {
      paymentCulture: isDe
        ? `Währung: ${currency}. Kartenzahlung in Städten verbreitet; etwas Bargeld für Märkte empfohlen.`
        : isEs
        ? `Moneda oficial: ${currency}. Las tarjetas son ampliamente aceptadas en ciudades; conviene llevar algo de efectivo para pequeños comercios.`
        : isRu
        ? `Официальная валюта: ${currency}. Банковские карты распространены в городах; рекомендуется иметь наличные для рынков.`
        : isTr
        ? `Resmi para birimi: ${currency}. Şehirlerde kart yaygındır; pazarlar ve küçük esnaf için nakit bulundurulmalıdır.`
        : `Official currency: ${currency}. Cards widely accepted in cities; carry cash for small markets.`,
      economicPillars: isDe
        ? 'Dienstleistungen, Tourismus, Außenhandel und lokale Industrie.'
        : isEs
        ? 'Servicios, turismo, comercio exterior y manufactura regional.'
        : isRu
        ? 'Сфера услуг, туризм, экспортная торговля и региональная промышленность.'
        : isTr
        ? 'Hizmet sektörü, turizm, ticaret ve yerel imalat sanayii.'
        : 'Services, tourism, export commerce, and regional manufacturing.',
      tippingCulture: isDe
        ? 'Ca. 5-10% Trinkgeld im Restaurant ist üblich und wird geschätzt.'
        : isEs
        ? 'Se acostumbra dejar alrededor del 5-10% de propina en restaurantes con servicio.'
        : isRu
        ? 'В ресторанах с обслуживанием принято оставлять около 5-10% чаевых.'
        : isTr
        ? 'Restoranlarda %5-10 civarında bahşiş bırakmak nezaket kuralıdır.'
        : 'Around 5-10% tip in full-service dining is customary and appreciated.'
    }
  };
}

