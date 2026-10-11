import { CuratedEntry } from './countryEncyclopedia';

export const CURATED_EXTRA_3: Record<string, CuratedEntry> = {
  // Amerika Birleşik Devletleri
  US: {
    culture: {
      etiquette: {
        tr: [
          'Bahşiş kültürü zorunludur; restoranlarda hesaba %18-%22 bahşiş bırakılması beklenir.',
          'Güleryüzlü selamlama ("How are you?") ve kişisel alana saygı temel sosyal normdur.',
          'Sırada bekleme (queuing) kuralına titizlikle uyulur, araya girmek tepki çeker.',
          'Kamusal alanlarda ve parklarda açıkta alkol tüketimi yasaktır (brown bag kuralı).'
        ],
        en: [
          'Tipping is customary and expected; tip 18-22% in dine-in restaurants.',
          'Friendly small talk ("How are you doing today?") and personal space are cultural norms.',
          'Strict respect for queues and waiting lines.',
          'Public alcohol consumption is restricted in most states.'
        ],
        de: [
          'Trinkgeld (Tip) ist quasi obligatorisch; 18-22% im Restaurant üblich.',
          'Freundlicher Smalltalk und Respekt vor der Privatsphäre sind Standard.',
          'Warteschlangen werden strikt respektiert.',
          'Öffentlicher Alkoholkonsum ist in den meisten Bundesstaaten verboten.'
        ]
      },
      festivals: {
        tr: ['4 Temmuz Bağımsızlık Günü', 'Şükran Günü (Thanksgiving)', 'Cadılar Bayramı (Halloween)', 'Super Bowl Pazar Günü', 'New York Yılbaşı Balon Düşüşü (Times Square)'],
        en: ['4th of July (Independence Day)', 'Thanksgiving Day', 'Halloween', 'Super Bowl Sunday', 'Times Square New Year’s Eve Ball Drop'],
        de: ['Unabhängigkeitstag (4. Juli)', 'Thanksgiving', 'Halloween', 'Super Bowl Sonntag', 'Times Square Silvesterparty']
      },
      lifestyle: {
        tr: 'Bireysellik, dinamizm, araba kültürü, banliyö yaşamı, geniş porsiyonlar ve kariyer odaklı çalışma temposu.',
        en: 'Dynamic individualism, road trip and highway culture, suburban convenience, and fast-paced ambition.',
        de: 'Dynamischer Individualismus, Roadtrip-Kultur, Vorstadtidylle und Karriereorientierung.'
      }
    },
    tourism: {
      mustSeePlaces: {
        tr: ['Özgürlük Heykeli & Manhattan Silüeti (New York)', 'Büyük Kanyon (Grand Canyon, Arizona)', 'Yellowstone Milli Parkı (Wyoming)', 'Golden Gate Köprüsü (San Francisco)', 'Hollywood & Santa Monica (Los Angeles)', 'Ulusal Alışveriş Merkezi & Capitol (Washington D.C.)'],
        en: ['Statue of Liberty & Manhattan Skyline (New York)', 'Grand Canyon National Park (Arizona)', 'Yellowstone National Park (Wyoming)', 'Golden Gate Bridge (San Francisco)', 'Hollywood & Santa Monica Pier (Los Angeles)', 'National Mall & US Capitol (Washington D.C.)'],
        de: ['Freiheitsstatue & Skyline von Manhattan (New York)', 'Grand Canyon Nationalpark (Arizona)', 'Yellowstone-Nationalpark (Wyoming)', 'Golden Gate Bridge (San Francisco)', 'Hollywood & Santa Monica (Los Angeles)', 'National Mall & Kapitol (Washington D.C.)']
      },
      bestSeasons: {
        tr: 'İlkbahar (Nisan - Haziran) ve Sonbahar (Eylül - Kasım) tüm ülke genelinde en rahat seyahat dönemidir.',
        en: 'Spring (April - June) and Autumn (September - November) offer ideal weather across most states.',
        de: 'Frühling (April - Juni) und Herbst (September - November) für angenehmes Reisewetter.'
      },
      travelStyleTip: {
        tr: 'Büyük mesafeler için araba kiralayıp ikonik Route 66 rotalarını deneyimleyin; New York’ta ise metro en hızlısıdır.',
        en: 'Rent a car for epic national park road trips; use the subway exclusively in NYC.',
        de: 'Mietwagen für legendäre Roadtrips; in New York City ausschließlich die U-Bahn nutzen.'
      }
    },
    religion: {
      primaryReligions: {
        tr: 'Protestan (~%40), Katolik (~%21), Musevi, Müslüman, Budist ve hızla artan inançsız/seküler nüfus.',
        en: 'Protestant Christian (~40%), Roman Catholic (~21%), Jewish, Muslim, and unaffiliated/secular groups.',
        de: 'Protestantisch (~40%), Katholisch (~21%), Jüdisch, Muslimisch und wachsende säkulare Bevölkerung.'
      },
      respectNorms: {
        tr: 'Kiliselerde ve ibadethanelerde sessiz ve saygılı davranış beklenir; genel toplumda din bireysel bir tercih olarak saygı görür.',
        en: 'Quiet decorum inside chapels and synagogues; religious diversity is protected by constitutional law.',
        de: 'Ruhiges Verhalten in Gotteshäusern; Religionsfreiheit ist verfassungsrechtlich verankert.'
      },
      sacredSites: {
        tr: ['St. Patrick Katedrali (New York)', 'Washington Ulusal Katedrali', 'Ulusal Bazilika (Washington D.C.)'],
        en: ['St. Patrick’s Cathedral (New York)', 'Washington National Cathedral', 'Basilica of the National Shrine (Washington D.C.)'],
        de: ['St. Patrick’s Cathedral (New York)', 'Washington National Cathedral', 'Nationalheiligtum Basilika (Washington D.C.)']
      }
    },
    language: {
      officialLanguages: {
        tr: 'İngilizce (Fiili ulusal dil). İspanyolca özellikle güney ve batı eyaletlerinde çok yaygındır.',
        en: 'English (De facto national language). Spanish is widely spoken, especially across southern and western states.',
        de: 'Englisch (de facto Nationalsprache). Spanisch im Süden und Westen weit verbreitet.'
      },
      englishProficiency: {
        tr: 'Anadil İngilizce seviyesindedir.',
        en: 'Native English proficiency.',
        de: 'Muttersprachliches Englisch.'
      },
      phrases: [
        { phrase: 'How are you doing?', meaningTr: 'Nasılsınız? / Ne haber?', meaningEn: 'How are you?', meaningDe: 'Wie geht es Ihnen?', pronunciation: 'Hav ar yu duing' },
        { phrase: 'Could I get the check, please?', meaningTr: 'Hesabı alabilir miyim lütfen?', meaningEn: 'Can I have the bill please?', meaningDe: 'Die Rechnung, bitte', pronunciation: 'Kud ay get dı çek pliz' },
        { phrase: 'I appreciate it!', meaningTr: 'Çok teşekkür ederim / Minnettarım', meaningEn: 'Thank you very much', meaningDe: 'Vielen Dank!', pronunciation: 'Ay eprişi-eyt it' },
        { phrase: 'Where is the nearest restroom?', meaningTr: 'En yakın lavabo nerede?', meaningEn: 'Where is the restroom?', meaningDe: 'Wo ist die Toilette?', pronunciation: 'Ver iz dı niyr-ıst rest-rum' },
        { phrase: 'Keep the change', meaningTr: 'Üstü kalsın (bahşiş)', meaningEn: 'Keep the change', meaningDe: 'Stimmt so (Restgeld)', pronunciation: 'Kip dı çeynç' }
      ]
    },
    history: {
      conciseHistory: {
        tr: '1776 Bağımsızlık Bildirgesi ile kurulan, İç Savaş sonrasında sanayileşerek 20. yüzyılda dünyanın süper gücü haline gelen federal cumhuriyet.',
        en: 'Founded by the 1776 Declaration of Independence, industrialized post-Civil War, and emerged as a global superpower in the 20th century.',
        de: '1776 mit der Unabhängigkeitserklärung gegründet, entwickelte sich nach dem Bürgerkrieg zur weltweiten Supermacht.'
      },
      milestones: {
        tr: ['1776: Bağımsızlık Bildirgesi ve Anayasa', '1861-1865: Amerikan İç Savaşı ve Köleliğin Kaldırılması', '1969: Apollo 11 ile Aya İlk İnsan İnişi', 'Modern Silikon Vadisi Teknoloji Devrimi'],
        en: ['1776: Declaration of Independence & Constitution', '1861-1865: Civil War and Abolition of Slavery', '1969: Apollo 11 Moon Landing', 'Modern Silicon Valley Digital Revolution'],
        de: ['1776: Unabhängigkeitserklärung', '1861-1865: Bürgerkrieg & Abschaffung der Sklaverei', '1969: Erste Mondlandung mit Apollo 11', 'Silicon Valley Technologierevolution']
      }
    },
    gastronomy: {
      famousDishes: {
        tr: ['Texas Usulü Ağır Tütsülenmiş Dana Brisket & Barbekü Kaburga', 'Klasik Amerikan Cheeseburger & Çıtır Patates', 'New England İstridye Çorbası (Clam Chowder)', 'Buffalo Wings (Acı Soslu Çıtır Tavuk Kanatları)'],
        en: ['Texas Slow-Smoked Beef Brisket & BBQ Ribs', 'Classic American Smash Burger & Fries', 'New England Clam Chowder', 'Buffalo Chicken Wings with Blue Cheese'],
        de: ['Texas BBQ Smoked Beef Brisket & Ribs', 'Klassischer American Cheeseburger & Fries', 'New England Clam Chowder Muschelsuppe', 'Buffalo Chicken Wings']
      },
      traditionalDrinks: {
        tr: ['Kentucky Bourbon Viskisi', 'Amerikan Craft IPA Birası', 'Buzlu Sweet Tea (Güneyli Soğuk Çay)', 'Root Beer'],
        en: ['Kentucky Straight Bourbon Whiskey', 'American Craft IPA Beers', 'Southern Sweet Iced Tea', 'Root Beer Float'],
        de: ['Kentucky Bourbon Whiskey', 'American Craft IPA Bier', 'Southern Sweet Iced Tea', 'Root Beer']
      },
      streetFoodAndDesserts: {
        tr: ['Geleneksel Elmalı Turta (Apple Pie) ve Vanilyalı Dondurma', 'New York Usulü Fırın Cheesecake', 'Çikolatalı Donut ve Çikolatalı Parçacıklı Kurabiye (Chocolate Chip Cookie)', 'Pankek & Akçaağaç Şurubu'],
        en: ['Classic Warm Apple Pie with Vanilla Ice Cream', 'New York Baked Cheesecake', 'Glazed Donuts and Fresh Chocolate Chip Cookies', 'Fluffy Pancakes with Pure Maple Syrup'],
        de: ['Warmer Apple Pie mit Vanilleeis', 'New York Cheesecake', 'Glazed Donuts & Cookies', 'Pancakes mit Ahornsirup']
      }
    },
    achievements: {
      famousFigures: {
        tr: ['George Washington (İlk Başkan)', 'Abraham Lincoln (Birlik Lideri)', 'Martin Luther King Jr. (Sivil Haklar Önderi)', 'Steve Jobs & Bill Gates (Teknoloji Öncüleri)', 'Michael Jackson & Elvis Presley (Müzik İkonları)', 'Michael Jordan (Basketbol Efsanesi)'],
        en: ['George Washington (Founding Father)', 'Abraham Lincoln (Preserver of the Union)', 'Martin Luther King Jr. (Civil Rights Icon)', 'Steve Jobs & Bill Gates (Tech Pioneers)', 'Michael Jackson & Elvis Presley (Music Legends)', 'Michael Jordan (Sports Icon)'],
        de: ['George Washington (Gründervater)', 'Abraham Lincoln (Präsident)', 'Martin Luther King Jr. (Bürgerrechtler)', 'Steve Jobs & Bill Gates (Technologie-Ikonen)', 'Michael Jackson & Elvis Presley (Musiklegenden)', 'Michael Jordan (Basketballlegende)']
      },
      strongSectors: {
        tr: ['Yapay Zeka ve Yazılım (Silikon Vadisi)', 'Havacılık ve Uzay (NASA & SpaceX)', 'Sinema ve Eğlence (Hollywood)', 'Küresel Finans (Wall Street)', 'Biyoteknoloji ve İlaç'],
        en: ['Artificial Intelligence & Software (Silicon Valley)', 'Aerospace & Space Exploration (NASA & SpaceX)', 'Film & Entertainment (Hollywood)', 'Global Finance (Wall Street)', 'Biotechnology & Pharmaceuticals'],
        de: ['Künstliche Intelligenz & Software (Silicon Valley)', 'Luft- und Raumfahrt (NASA & SpaceX)', 'Film & Unterhaltung (Hollywood)', 'Globale Finanzmärkte (Wall Street)', 'Biotechnologie']
      }
    },
    economy: {
      paymentCulture: {
        tr: 'Nakit neredeyse hiç kullanılmaz; temassız kredi kartları, Apple Pay ve Google Pay her yerde geçerlidir.',
        en: 'Almost completely cashless; credit cards, Apple Pay, and Google Pay accepted everywhere.',
        de: 'Weitgehend bargeldlos; Kreditkarten und mobiles Bezahlen überall Standard.'
      },
      economicPillars: {
        tr: 'Dünyanın 1 numaralı nominal ekonomisi; teknoloji devleri, Wall Street finans merkezi ve küresel tüketim lokomotifidir.',
        en: 'World’s largest nominal GDP; tech giants, global financial markets, and massive domestic consumer base.',
        de: 'Größte Volkswirtschaft der Welt; Tech-Konzerne, Finanzzentrum Wall Street und riesiger Binnenmarkt.'
      },
      tippingCulture: {
        tr: 'Bahşiş kültürü dünyanın en güçlüsüdür. Restoranlarda servis personeline %18-22, taksilere %15-20, otel valelerine $2-5 bahşiş vermek sosyal bir zorunluluktur.',
        en: 'Tipping is institutionalized. 18-22% in restaurants, 15-20% for taxis, and $2-5 for luggage/valet.',
        de: 'Trinkgeld ist fest institutionalisiert. 18-22% im Restaurant, 15-20% für Taxis und 2-5$ für Hotelpersonal.'
      }
    }
  },

  // Hollanda
  NL: {
    culture: {
      etiquette: {
        tr: [
          'Bisiklet yollarına (kırmızı asfalt) asla yaya olarak basmayın; bisikletlilerin geçiş üstünlüğü vardır.',
          'Hollandalılar doğrudan ve lafı dolandırmadan konuşurlar (Directheid); bu kabalık değil dürüstlüktür.',
          'Pencere perdelerini açık bırakmak köklü bir Protestan şeffaflık geleneğidir.',
          'Hesabı tam paylaşmak dünya literatürüne girmiştir ("Going Dutch").'
        ],
        en: [
          'Never walk on dedicated red bicycle lanes; cyclists have absolute priority.',
          'Dutch people are famously direct in conversation; it is valued as honesty, not rudeness.',
          'Leaving living room curtains open is a historic tradition representing nothing to hide.',
          'Splitting the bill precisely ("Going Dutch") is the default social norm.'
        ],
        de: [
          'Niemals auf den roten Radwegen laufen; Fahrräder haben immer Vorfahrt.',
          'Die niederländische Direktheit ist Zeichen von Ehrlichkeit, keine Unhöflichkeit.',
          'Offene Fenster ohne Vorhänge spiegeln historische calvinistische Offenheit wider.',
          'Rechnungen werden exakt geteilt ("Getrennte Kasse").'
        ]
      },
      festivals: {
        tr: ['27 Nisan Kral Günü (Koningsdag - Herkes turuncu giyer)', 'Amsterdam Işık Festivali', 'Keukenhof Lale Festivali', 'Amsterdam Dance Event (ADE)'],
        en: ['King’s Day (Koningsdag, April 27 - Orange street party)', 'Amsterdam Light Festival', 'Keukenhof Tulip Festival', 'Amsterdam Dance Event (ADE)'],
        de: ['Königstag (Koningsdag, 27. April - Land in Orange)', 'Amsterdam Light Festival', 'Keukenhof Tulpenfestival', 'Amsterdam Dance Event (ADE)']
      },
      lifestyle: {
        tr: 'Gezegendeki en yüksek bisiklet kullanımı, hoşgörülü ve liberal toplum yapısı, kanal kenarı kahveleri ve "Gezellig" (samimi/huzurlu) anlar.',
        en: 'World-leading bicycle commuting, open progressive society, canalside cafes, and the cherished feeling of "Gezellig".',
        de: 'Weltweit führende Fahrradkultur, liberale Gesellschaft, Grachten-Cafés und die gemütliche "Gezelligheid".'
      }
    },
    tourism: {
      mustSeePlaces: {
        tr: ['Amsterdam Kanalları & Rijksmuseum', 'Van Gogh Müzesi & Anne Frank Evi', 'Keukenhof Lale Bahçeleri (Lisse)', 'Zaanse Schans Tarihi Yeldeğirmenleri', 'Giethoorn (Arabasız Köy - Kuzeyin Venedik’i)', 'Rotterdam Fütüristik Mimari & Kübik Evler'],
        en: ['Amsterdam Canal Ring & Rijksmuseum', 'Van Gogh Museum & Anne Frank House', 'Keukenhof Tulip Gardens (Lisse)', 'Zaanse Schans Windmills', 'Giethoorn (Car-free fairytale water village)', 'Rotterdam Cube Houses & Modern Architecture'],
        de: ['Amsterdamer Grachtengürtel & Rijksmuseum', 'Van Gogh Museum & Anne Frank Haus', 'Keukenhof Tulpengärten', 'Zaanse Schans historische Windmühlen', 'Giethoorn (Autofreies Wasserdorf)', 'Rotterdam Kubushäuser & moderne Architektur']
      },
      bestSeasons: {
        tr: 'Nisan - Mayıs (Lale açma mevsimi) ve Haziran - Ağustos (Ilık kanal yazı).',
        en: 'April - May for vibrant tulip blooms; June - August for warm canal weather.',
        de: 'April - Mai zur Tulpenblüte; Juni - August für milde Sommer an den Grachten.'
      },
      travelStyleTip: {
        tr: 'İlk gün bir bisiklet kiralayın veya OV-chipkaart alarak dünyanın en dakik tren ağıyla şehirden şehre 30 dakikada geçin.',
        en: 'Rent a bicycle or use an OV-chipkaart for seamless 30-minute intercity train connections.',
        de: 'Mieten Sie ein Fahrrad oder nutzen Sie das exzellente Bahnnetz mit der OV-Chipkaart.'
      }
    },
    religion: {
      primaryReligions: {
        tr: 'Ağırlıklı seküler ve inançsız (~%55), Katolik (~%20), Protestan (~%15), Müslüman (~%5).',
        en: 'Largely secular/unaffiliated (~55%), Roman Catholic (~20%), Protestant (~15%), Muslim (~5%).',
        de: 'Überwiegend säkular (~55%), Katholisch (~20%), Protestantisch (~15%), Muslimisch (~5%).'
      },
      respectNorms: {
        tr: 'Tarihi kiliselerin çoğu kültür merkezi veya konser salonuna dönüştürülmüştür; saygılı davranış beklenir.',
        en: 'Many historic churches serve as cultural venues; quiet architectural respect is expected.',
        de: 'Viele historische Kirchen dienen heute Kulturzwecken; respektvoller Umgang.'
      },
      sacredSites: {
        tr: ['Oude Kerk (Amsterdam Eski Kilise)', 'Nieuwe Kerk (Amsterdam)', 'Utrecht Dom Kulesi ve Katedrali'],
        en: ['Oude Kerk (Amsterdam)', 'Nieuwe Kerk (Amsterdam)', 'Dom Tower & Cathedral of Utrecht'],
        de: ['Oude Kerk (Amsterdam)', 'Nieuwe Kerk (Amsterdam)', 'Utrechter Domturm & Kathedrale']
      }
    },
    language: {
      officialLanguages: {
        tr: 'Felemenkçe (Resmi dil). Halkın %93’ü anadili gibi akıcı İngilizce konuşur.',
        en: 'Dutch (Official). Over 93% of the population speaks fluent, near-native English.',
        de: 'Niederländisch (Offiziell). Über 93% der Bevölkerung spricht fließend Englisch.'
      },
      englishProficiency: {
        tr: 'Dünyada anadili İngilizce olmayan ülkeler arasında en yüksek (EF EPI 1. Sıra).',
        en: 'Ranked #1 globally among non-native English speaking countries.',
        de: 'Weltweit auf Platz 1 bei Englischkenntnissen als Fremdsprache.'
      },
      phrases: [
        { phrase: 'Dank je wel / Bedankt', meaningTr: 'Teşekkür ederim', meaningEn: 'Thank you', meaningDe: 'Vielen Dank', pronunciation: 'Dank ye vel' },
        { phrase: 'Alsjeblieft', meaningTr: 'Lütfen / Buyrun', meaningEn: 'Please / Here you go', meaningDe: 'Bitte', pronunciation: 'Als-ye-blift' },
        { phrase: 'Hallo / Goedemorgen', meaningTr: 'Merhaba / Günaydın', meaningEn: 'Hello / Good morning', meaningDe: 'Hallo / Guten Morgen', pronunciation: 'Hullo / Hude-morhın' },
        { phrase: 'Mag ik de rekening?', meaningTr: 'Hesabı alabilir miyim?', meaningEn: 'May I have the bill?', meaningDe: 'Die Rechnung, bitte', pronunciation: 'Mah ik dı reykening' },
        { phrase: 'Hoeveel kost dit?', meaningTr: 'Bu ne kadar?', meaningEn: 'How much does this cost?', meaningDe: 'Wie viel kostet das?', pronunciation: 'Huvil kost dit' }
      ]
    },
    history: {
      conciseHistory: {
        tr: '17. Yüzyıl "Hollanda Altın Çağı"nda deniz ticareti ve bilimde dünya lideri olan, denizden toprak kazanan (polder sistemi) modern liberal demokrasi.',
        en: '17th-century Dutch Golden Age pioneered global maritime trade, water engineering (polders), and modern liberal governance.',
        de: 'Das Goldene Zeitalter im 17. Jh. machte die Niederlande zur maritimen Weltmacht; Polderwirtschaft prägte das Land.'
      },
      milestones: {
        tr: ['1602: Dünyanın ilk halka açık şirketi ve borsası (VOC)', '1648: Münster Barışı ve İspanya’dan Tam Bağımsızlık', '1953: Kuzey Denizi Seli ve Dünyanın En Büyük Delta Koruma Projesi', 'Avrupa Birliği’nin Kurucu Üyeliği'],
        en: ['1602: Establishment of Dutch East India Company & Amsterdam Stock Exchange', '1648: Peace of Westphalia independence', '1953: North Sea flood and construction of Delta Works', 'Founding member of the European Union'],
        de: ['1602: Erste Aktiengesellschaft (VOC) & Börse', '1648: Westfälischer Friede', '1953: Deltawerke nach der Sturmflut', 'Gründungsmitglied der EU']
      }
    },
    gastronomy: {
      famousDishes: {
        tr: ['Çıtır Çiğ Ringa Balığı (Haring - Soğan ve kornişon turşu ile)', 'Bitterballen (Kıtır kaplı sıcak dana ragu topları & Hardal)', 'Stamppot (Patates püresi, lahana ve füme sosis)', 'Kibbeling (Kızarmış çıtır morina balığı lokmaları)'],
        en: ['Raw Herring (Hollandse Nieuwe with onions and pickles)', 'Bitterballen (Crispy deep-fried beef ragout balls with mustard)', 'Stamppot (Mashed potatoes with kale and smoked rookworst)', 'Kibbeling (Crispy battered white fish bites with remoulade)'],
        de: ['Hollandse Nieuwe (Roher Hering mit Zwiebeln)', 'Bitterballen (Kross frittierte Fleischkroketten mit Senf)', 'Stamppot (Kartoffelstampf mit Grünkohl und Rauchwurst)', 'Kibbeling (Frittierter Fisch)']
      },
      traditionalDrinks: {
        tr: ['Heineken & Amstel Pilsner Biraları', 'Jenever (Geleneksel Hollanda Ardıç Likörü)', 'Sıcak Çikolata (Chocomel)'],
        en: ['Heineken, Grolsch & Dutch Craft Pilsners', 'Jenever (Traditional Dutch juniper spirit)', 'Chocomel Dutch Hot Chocolate'],
        de: ['Niederländische Pilsner (Heineken, Hertog Jan)', 'Jenever (Traditioneller Wacholderschnaps)', 'Chocomel']
      },
      streetFoodAndDesserts: {
        tr: ['Taze Sıcak Stroopwafel (Karamelli pres vafıl)', 'Poffertjes (Pudra şekerli ve tereyağlı mini puf pankekler)', 'Gouda & Edam Eskitilmiş Tekerlek Peynirleri'],
        en: ['Fresh Warm Stroopwafel (Caramel syrup waffle)', 'Poffertjes (Puffy mini pancakes with melting butter and powdered sugar)', 'Aged Gouda and Edam wheels'],
        de: ['Frische warme Stroopwafels (Sirupwaffeln)', 'Poffertjes mit Puderzucker und Butter', 'Gouda und Edamer Käselaibe']
      }
    },
    achievements: {
      famousFigures: {
        tr: ['Vincent van Gogh (Ressam)', 'Rembrandt van Rijn (Ressam)', 'Baruch Spinoza (Filozof)', 'Anne Frank (Yazar)', 'Johan Cruyff (Futbol Efsanesi)', 'Max Verstappen (Formula 1 Şampiyonu)'],
        en: ['Vincent van Gogh (Post-Impressionist Master)', 'Rembrandt van Rijn (Golden Age Painter)', 'Baruch Spinoza (Philosopher)', 'Anne Frank (Diaries)', 'Johan Cruyff (Football Innovator)', 'Max Verstappen (F1 Champion)'],
        de: ['Vincent van Gogh (Maler)', 'Rembrandt (Maler)', 'Baruch Spinoza (Philosoph)', 'Anne Frank (Tagebuch)', 'Johan Cruyff (Fußball-Ikone)', 'Max Verstappen (Formel-1-Weltmeister)']
      },
      strongSectors: {
        tr: ['Yarı İletken ve Çip Makineleri (ASML - Küresel tekel)', 'Denizcilik ve Liman Lojistiği (Rotterdam Limanı)', 'Tarımsal Teknoloji ve Çiçekçilik (Dünya lale ihracatı)', 'Su Yönetimi ve Baraj Mühendisliği'],
        en: ['Semiconductor Lithography (ASML - Global monopoly)', 'Port Logistics (Port of Rotterdam - Europe’s largest)', 'Agritech & Floriculture (World tulip/flower hub)', 'Hydraulic Water Engineering'],
        de: ['Halbleiter-Lithografie (ASML - Weltmarktführer)', 'Hafenlogistik (Rotterdam - Größter Hafen Europas)', 'Agrartechnologie & Blumenexport', 'Wasserbauingenieurwesen']
      }
    },
    economy: {
      paymentCulture: {
        tr: 'Nakit neredeyse kabul edilmez ("Pin Only"); Maestro ve Visa/Mastercard temassız kartlar her yerde şarttır.',
        en: 'Heavily cashless ("Pin Only"); contactless debit/credit cards accepted universally.',
        de: 'Fast ausnahmslos bargeldlos ("Pin Only"); Kartenzahlung überall Standard.'
      },
      economicPillars: {
        tr: 'Avrupa’nın ticaret kapısı; yüksek teknoloji (ASML), kimya, tarım ihracatı ve küresel finans.',
        en: 'Gateway to Europe; high-tech manufacturing (ASML), petrochemicals, agricultural exports, and finance.',
        de: 'Europas Logistikhub; Hochtechnologie (ASML), Landwirtschaft und Finanzdienstleistungen.'
      },
      tippingCulture: {
        tr: 'Bahşiş zorunlu değildir ancak iyi servis için yuvarlama veya %5-10 ekleme nezaket göstergesidir.',
        en: 'Tipping is discretionary; rounding up or adding 5-10% for good service is appreciated.',
        de: 'Trinkgeld ist freiwillig; Aufrunden oder 5-10% für guten Service üblich.'
      }
    }
  },

  // Gürcistan
  GE: {
    culture: {
      etiquette: {
        tr: [
          'Gürcü sofrasında (Supra) kadeh kaldırma (Tamada) kutsal bir törendir; kadeh kaldırılmadan içki içilmez.',
          'Misafir "Tanrı’dan bir hediyedir" atasözü geçerlidir; inanılmaz bir ev misafirperverliği gösterilir.',
          'Kiliselere girerken kadınların başını örtmesi ve etek giymesi (kapıda şal ve etek temin edilir) beklenir.',
          'Ayakkabı ile eve girmek birçok ailede hoş karşılanmaz.'
        ],
        en: [
          'The traditional feast (Supra) is led by a toastmaster (Tamada); never drink wine without a toast.',
          'Guests are considered "gifts from God"; hospitality is sacred and generous.',
          'Women should cover their heads and wear skirts when entering Orthodox churches (wraps provided).',
          'Taking off shoes inside homes is polite.'
        ],
        de: [
          'Die Festtafel (Supra) wird vom Tamada mit Trinksprüchen geleitet; Trinken erst nach dem Toast.',
          'Gäste gelten als "Geschenk Gottes"; außergewöhnliche Gastfreundschaft.',
          'In orthodoxen Kirchen tragen Frauen Kopftuch und Rock (Leih-Tücher am Eingang vorhanden).',
          'Schuhe in Wohnungen ausziehen ist höflich.'
        ]
      },
      festivals: {
        tr: ['Tbilisoba (Tiflis Şehir ve Hasat Festivali - Ekim)', 'Rtveli (Geleneksel Bağ Bozumu Şenlikleri)', 'Ortodoks Noel & Epifani (Ocak)'],
        en: ['Tbilisoba (Tbilisi City Festival, October)', 'Rtveli (Traditional Wine Harvest Festival, Autumn)', 'Orthodox Christmas & Epiphany (January)'],
        de: ['Tbilisoba (Tiflis Stadtfest im Oktober)', 'Rtveli (Weinlesefest im Herbst)', 'Orthodoxe Weihnachtsfeiertage']
      },
      lifestyle: {
        tr: 'Kafkas dağ kültürü, 8000 yıllık şarap geleneği, samimi dostluklar ve saatlerce süren lezzetli ziyafet sofraları.',
        en: 'Caucasus mountain heritage, 8,000-year-old unbroken winemaking culture, warmth, and epic culinary feasts.',
        de: 'Kaukasische Bergluft, 8.000 Jahre alte Weintradition und herzliche Festmahle.'
      }
    },
    tourism: {
      mustSeePlaces: {
        tr: ['Narikala Kalesi & Eski Tiflis Sülfür Hamamları', 'Gergeti Teslis Kilisesi & Kazbegi Dağı', 'Signagi & Kaheti Şarap Vadisi (Aşk Şehri)', 'Uplistsikhe Antik Kaya Kenti (Gori)', 'Batum Bulvarı & Karadeniz Sahili', 'Svaneti Taş Kuleleri & Mestia Buzulları'],
        en: ['Narikala Fortress & Old Tbilisi Sulfur Baths', 'Gergeti Trinity Church against Mount Kazbek', 'Sighnaghi & Kakheti Wine Valley', 'Uplistsikhe Cave Town (Gori)', 'Batumi Boulevard & Seaside Promenades', 'Svaneti Medieval Watchtowers (Mestia)'],
        de: ['Festung Narikala & Tifliser Schwefelbäder', 'Gergetier Dreifaltigkeitskirche am Berg Kasbek', 'Signagi & Weintal Kachetien', 'Uplisziche Felsenstadt', 'Batumi Boulevard an der Schwarzmeerküste', 'Swanetische Wehrtürme in Mestia']
      },
      bestSeasons: {
        tr: 'Mayıs - Haziran ve Eylül - Ekim (Bağ bozumu ve doğa yürüyüşleri için mükemmel iklim).',
        en: 'May - June and September - October (Ideal for wine harvesting and Caucasus hiking).',
        de: 'Mai - Juni und September - Oktober (Perfekt für Weinlese und Bergwanderungen).'
      },
      travelStyleTip: {
        tr: 'Türk vatandaşları için çipli kimlikle pasaportsuz giriş imkanı mevcuttur. Tiflis-Batum arasında modern trenleri tercih edin.',
        en: 'Turkish citizens can enter with national ID without a passport. Modern intercity trains run between Tbilisi and Batumi.',
        de: 'Moderne Züge verbinden Tiflis und Batumi; Taxis über Apps wie Bolt sehr günstig.'
      }
    },
    religion: {
      primaryReligions: {
        tr: 'Gürcü Ortodoks Hristiyan (~%83), İslam (~%11, Acara ve doğu bölgeleri), Ermeni Apostolik (~%3).',
        en: 'Georgian Orthodox Christian (~83%), Muslim (~11%, Adjara & eastern regions), Armenian Apostolic (~3%).',
        de: 'Georgisch-Orthodox (~83%), Muslimisch (~11%), Armenisch-Apostolisch (~3%).'
      },
      respectNorms: {
        tr: 'Kiliselerde omuzlar ve bacaklar kapalı olmalı, kadınlar başını örtmelidir. Fotoğraf çekmeden önce işaretlere dikkat edin.',
        en: 'Modest dress required in monasteries (shoulders and knees covered; scarves for women). Flash photography prohibited.',
        de: 'Schulter- und kniebedeckende Kleidung sowie Kopftücher für Frauen in Klöstern Pflicht.'
      },
      sacredSites: {
        tr: ['Svetitshoveli Katedrali (Mtsheta - UNESCO)', 'Sameba Katedrali (Tiflis Ulu Mabedi)', 'Gergeti Kilisesi (Kazbegi)', 'Gelati Manastırı (Kutaisi)'],
        en: ['Svetitskhoveli Cathedral (Mtskheta - UNESCO)', 'Holy Trinity Cathedral / Sameba (Tbilisi)', 'Gergeti Trinity Church', 'Gelati Monastery (Kutaisi)'],
        de: ['Swetizchoweli-Kathedrale (Mzcheta - UNESCO)', 'Sameba-Kathedrale (Tiflis)', 'Gergeti-Dreifaltigkeitskirche', 'Kloster Gelati (Kutaissi)']
      }
    },
    language: {
      officialLanguages: {
        tr: 'Gürcüce (Kartvelian dil ailesi, eşsiz 33 harfli Mkhedruli alfabesi). Rusça ve genç nüfusta İngilizce yaygındır.',
        en: 'Georgian (Kartvelian family with unique 33-letter Mkhedruli script). Russian and English widely understood.',
        de: 'Georgisch mit einzigartigem Mkhedruli-Alphabet. Russisch und Englisch weit verbreitet.'
      },
      englishProficiency: {
        tr: 'Tiflis ve Batum’da genç nüfus ve turizm sektöründe iyi düzeydedir.',
        en: 'Good among youth and hospitality staff in Tbilisi and Batumi.',
        de: 'Gut bei jüngeren Generationen und in Hotels in Tiflis und Batumi.'
      },
      phrases: [
        { phrase: 'Gamarjoba (გამარჯობა)', meaningTr: 'Merhaba', meaningEn: 'Hello', meaningDe: 'Hallo', pronunciation: 'Gamar-coba' },
        { phrase: 'Madloba (მადლობა)', meaningTr: 'Teşekkür ederim', meaningEn: 'Thank you', meaningDe: 'Danke', pronunciation: 'Mad-loba' },
        { phrase: 'Tu sheidzleba (თუ შეიძლება)', meaningTr: 'Lütfen', meaningEn: 'Please', meaningDe: 'Bitte', pronunciation: 'Tu şeydzleba' },
        { phrase: 'Ra ghirs? (რა ღირს?)', meaningTr: 'Bu ne kadar?', meaningEn: 'How much is it?', meaningDe: 'Wie viel kostet das?', pronunciation: 'Ra girs' },
        { phrase: 'Gaumarjos! (გაუმარჯოს!)', meaningTr: 'Şerefe! (Kadeh tostu)', meaningEn: 'Cheers! (To your victory)', meaningDe: 'Zum Wohl! / Prost!', pronunciation: 'Gaumar-cos' }
      ]
    },
    history: {
      conciseHistory: {
        tr: 'Antik Kolhis ve İberya krallıklarından, Kraliçe Tamar’ın Altın Çağı’na, Rus İmparatorluğu ve Sovyet döneminden günümüz bağımsız Gürcistan’ına uzanan 3000 yıllık Kafkas tarihi.',
        en: 'Ancient Colchis of the Golden Fleece, Queen Tamar’s 12th-century Golden Age, and modern sovereign independence post-1991.',
        de: 'Antikes Kolchis, Goldenes Zeitalter unter Königin Tamar im 12. Jh. und moderne Unabhängigkeit seit 1991.'
      },
      milestones: {
        tr: ['M.S. 337: Hristiyanlığın Devlet Dini Kabul Edilmesi (Azize Nino)', '12. Yüzyıl: Kraliçe Tamar ile Gürcistan Altın Çağı', '1991: Sovyetler Birliği’nden Bağımsızlığın Yeniden Kazanılması', '2003: Gül Devrimi ve Modern Reformlar'],
        en: ['337 AD: Adoption of Christianity as State Religion (St. Nino)', '12th Century: Golden Age under Queen Tamar', '1991: Restoration of Independence from the USSR', '2003: Rose Revolution'],
        de: ['337 n. Chr.: Christianisierung Georgiens', '12. Jh.: Goldenes Zeitalter unter Königin Tamar', '1991: Unabhängigkeit von der UdSSR', '2003: Rosenrevolution']
      }
    },
    gastronomy: {
      famousDishes: {
        tr: ['Acaruli Haçapuri (Kayık şeklinde peynirli, tereyağlı ve yumurtalı pide)', 'Hinkali (İçi sulu kıymalı dev Kafkas mantısı - elle yenir)', 'Şkmeruli (Sarımsaklı süt sosunda kızarmış köy tavuğu)', 'Pkhali (Cevizli ıspanak ve pancar ezmeleri)'],
        en: ['Adjarian Khachapuri (Boat-shaped cheese bread with raw egg yolk and butter)', 'Khinkali (Giant twisted spiced soup dumplings eaten by hand)', 'Shkmeruli (Crispy roasted chicken in creamy garlic sauce)', 'Pkhali (Walnut and herb vegetable pâtés)'],
        de: ['Adscharisches Chatschapuri (Käsebrot mit Ei und Butter)', 'Chinkali (Würzige Teigtaschen mit Brühefüllung)', 'Schkmeruli (Brathähnchen in Knoblauchsauce)', 'Pchali (Walnusspasten)']
      },
      traditionalDrinks: {
        tr: ['Kvevri Şarabı (Toprak küplerde mayalanan 8000 yıllık geleneksel amber şarap)', 'Çaça (Gürcü üzüm brendisi)', 'Borjomi Doğal Mineralli Maden Suyu', 'Tarhunlu Yeşil Gazoz'],
        en: ['Qvevri Amber Wine (Fermented in subterranean clay amphorae)', 'Chacha (Grape pomace moonshine/brandy)', 'Borjomi Natural Volcanic Mineral Water', 'Tarkhuna (Tarragon green soda)'],
        de: ['Qvevri-Wein (Traditioneller Amphorenwein)', 'Chacha (Tresterschnaps)', 'Bordschomi Heilmineralwasser', 'Tarchun (Estragon-Limonade)']
      },
      streetFoodAndDesserts: {
        tr: ['Çurçhela (İpe dizili cevizlerin koyu üzüm peltesine batırılmasıyla yapılan Kafkas sucuğu)', 'Tklapi (Güneşte kurutulmuş meyve pestili)', 'Taze Tandır Puri Ekmeği (Tone)'],
        en: ['Churchkhela (Walnuts strung on thread dipped in thickened grape juice)', 'Tklapi (Sun-dried fruit leathers)', 'Hot Shotis Puri (Clay-oven bread)'],
        de: ['Tschurtschchela (Walnusskerne in Traubenmostsaft)', 'Tklapi (Fruchtleder)', 'Shotis Puri (Tandur-Brot)']
      }
    },
    achievements: {
      famousFigures: {
        tr: ['Şota Rustaveli (Milli Şair - Kaplan Postlu Şövalye)', 'Kraliçe Tamar (Ortaçağ Hükümdarı)', 'George Balanchine (Modern Balenin Kurucusu)', 'İlia Çavçavadze (Milletin Babası)', 'Khvicha Kvaratskhelia (Yıldız Futbolcu)'],
        en: ['Shota Rustaveli (Epic Poet)', 'Queen Tamar the Great', 'George Balanchine (Father of American Ballet)', 'Ilia Chavchavadze (National Hero)', 'Khvicha Kvaratskhelia (Football Superstar)'],
        de: ['Schota Rustaweli (Dichter)', 'Königin Tamar', 'George Balanchine (Ballettchoreograf)', 'Ilia Tschawtschawadse', 'Chwitscha Kwarazchelia (Fußballstar)']
      },
      strongSectors: {
        tr: ['Geleneksel Şarap Üretimi ve Gastronomi Turizmi', 'Uluslararası Transit Lojistik (Orta Koridor)', 'Organik Tarım ve Fındık İhracatı', 'Hidroelektrik Enerji'],
        en: ['Ancient Winemaking & Culinary Tourism', 'Trans-Caucasus Transit Logistics (Middle Corridor)', 'Hazelnut and Agriculture Export', 'Hydroelectric Power'],
        de: ['Weinbau & Önotourismus', 'Transkaukasischer Transitkorridor', 'Haselnuss- & Agrarexport', 'Wasserkraft']
      }
    },
    economy: {
      paymentCulture: {
        tr: 'Tiflis ve Batum’da temassız kartlar ve Apple Pay çok yaygındır; dağ köyleri ve pazarlar için nakit Gürcü Larisi (GEL) gereklidir.',
        en: 'Contactless cards and Apple Pay universal in cities; carry cash GEL for mountain villages.',
        de: 'Kartenzahlung in Tiflis und Batumi üblich; Bargeld (Lari) für ländliche Gebiete nötig.'
      },
      economicPillars: {
        tr: 'Turizm, lojistik, tarımsal ihracat (şarap, maden suyu, fındık) ve yabancı yatırım dostu reformlar.',
        en: 'Tourism, transit trade, mineral waters and wine exports, business-friendly tax regime.',
        de: 'Tourismus, Transithandel, Wein- und Mineralwasserexporte, liberale Wirtschaft.'
      },
      tippingCulture: {
        tr: 'Restoranlarda genellikle %10-18 servis ücreti faturaya eklenir. Eklenmemişse %10 bahşiş bırakılır.',
        en: 'A 10-18% service fee is often added to restaurant bills. Otherwise, tip 10%.',
        de: 'Oft 10-18% Servicegebühr auf der Rechnung; falls nicht, 10% Trinkgeld.'
      }
    }
  },

  // Bosna-Hersek
  BA: {
    culture: {
      etiquette: {
        tr: [
          'Kahve aceleye getirilmez; Boşnak kahvesi lokum ve sigara eşliğinde saatlerce yudumlanır.',
          'Savaş ve etnik siyaset gibi hassas konular yabancılarla hemen açılmaz.',
          'Eve girerken ayakkabılar çıkarılır ve terlik (pape) giyilir.',
          'Misafire ikram edilen yemek veya börek asla geri çevrilmez.'
        ],
        en: [
          'Coffee is never rushed; Bosnian coffee is savored slowly for hours with Turkish delight.',
          'Avoid initiating sensitive conversations about the 1990s war and ethnic politics.',
          'Always remove shoes when entering someone’s home; guest slippers (pape) will be offered.',
          'Refusing home-cooked food is considered impolite.'
        ],
        de: [
          'Kaffee ist ein heiliges Ritual; bosnischer Kaffee wird langsam genossen.',
          'Themen wie der Krieg der 1990er Jahre sollten nicht unbedacht angesprochen werden.',
          'Schuhe am Eingang ausziehen; Gästepantoffeln (Pape) anziehen.',
          'Angebotenes Essen nicht ablehnen.'
        ]
      },
      festivals: {
        tr: ['Saraybosna Film Festivali (Güneydoğu Avrupa’nın en büyüğü - Ağustos)', 'Mostar Köprüsü Geleneksel Atlama Yarışları (Temmuz)', 'Baščaršija Geceleri Kültür Festivali'],
        en: ['Sarajevo Film Festival (SFF, August - Largest in SE Europe)', 'Mostar Old Bridge High Diving Competition (July)', 'Bascarsija Nights Cultural Festival'],
        de: ['Sarajevo Film Festival (Größtes Filmfestival Südosteuropas)', 'Alte Brücke Mostar Klippenspringen (Juli)', 'Baščaršija-Nächte Kulturfestival']
      },
      lifestyle: {
        tr: 'Osmanlı ve Avusturya-Macaristan mirasının büyüleyici sentezi; içten misafirperverlik, "Ćejf" (keyif/huzur) felsefesi.',
        en: 'Fascinating blend of Ottoman and Austro-Hungarian heritage; heartfelt warmth and the concept of "Ćejf" (pure relaxation).',
        de: 'Mischung aus osmanischem und k.u.k.-Erbe; herzliche Gemütlichkeit und die Philosophie des "Ćejf".'
      }
    },
    tourism: {
      mustSeePlaces: {
        tr: ['Tarihi Mostar Köprüsü & Neretva Nehri Kanyonu', 'Başçarşı & Sebil (Saraybosna)', 'Umut Tüneli (Saraybosna Kuşatması Müzesi)', 'Blagaj Alperenler Tekkesi & Buna Nehri Kaynağı', 'Kravica Şelaleleri (Doğal Yüzme Cenneti)', 'Počitelj Tarihi Taş Osmanlı Köyü'],
        en: ['Stari Most (Old Bridge of Mostar)', 'Bascarsija & Sebilj Fountain (Sarajevo)', 'Sarajevo Tunnel of Hope Museum', 'Blagaj Dervish Tekke & Buna Spring', 'Kravica Waterfalls', 'Pocitelj Medieval Ottoman Stone Village'],
        de: ['Stari Most (Alte Brücke von Mostar)', 'Baščaršija & Sebilj-Brunnen (Sarajevo)', 'Tunnel der Hoffnung (Sarajevo)', 'Derwischkloster Blagaj & Buna-Quelle', 'Kravica-Wasserfälle', 'Historisches Steindorf Počitelj']
      },
      bestSeasons: {
        tr: 'Mayıs - Ekim (Şehir gezileri ve kanyon raftingi için); Aralık - Mart (Jahorina ve Bjelašnica kayak merkezleri için).',
        en: 'May - October for cultural tours and rafting; December - March for Jahorina ski resorts.',
        de: 'Mai - Oktober für Kultur und Rafting; Dezember - März für Ski in Jahorina.'
      },
      travelStyleTip: {
        tr: 'Türk vatandaşları için 90 güne kadar vizesizdir. Saraybosna-Mostar arasındaki tren yolculuğu Avrupa’nın en güzel manzaralı tren rotalarından biridir.',
        en: 'Visa-free for Turkish citizens. The Sarajevo-Mostar scenic passenger train is ranked among Europe’s most beautiful rail rides.',
        de: 'Visafrei für viele Reisende. Die Zugfahrt von Sarajevo nach Mostar gehört zu den landschaftlich schönsten Europas.'
      }
    },
    religion: {
      primaryReligions: {
        tr: 'Müslüman Boşnaklar (~%51), Ortodoks Sırplar (~%31), Katolik Hırvatlar (~%15). Çok dinli tarihi mozaik.',
        en: 'Muslim Bosniaks (~51%), Orthodox Christian Serbs (~31%), Roman Catholic Croats (~15%). Historic multifaith mosaic.',
        de: 'Muslime (~51%), Serbisch-Orthodox (~31%), Römisch-Katholisch (~15%). Multireligiöses Mosaik.'
      },
      respectNorms: {
        tr: 'Cami, kilise ve sinagogların yan yana bulunduğu "Avrupa’nın Kudüs’ü" olarak anılır; tüm ibadethanelere saygılı kıyafetle girilir.',
        en: 'Known as the "Jerusalem of Europe"; modest clothing required when visiting mosques and churches.',
        de: 'Als "Jerusalem Europas" bekannt; respektvolle Kleidung in Gotteshäusern aller Konfessionen.'
      },
      sacredSites: {
        tr: ['Gazi Hüsrev Bey Camii (Saraybosna)', 'İsa’nın Kutsal Kalbi Katedrali (Saraybosna)', 'Eski Ortodoks Kilisesi', 'Blagaj Derviş Tekkesi'],
        en: ['Gazi Husrev-beg Mosque (Sarajevo)', 'Sacred Heart Cathedral (Sarajevo)', 'Old Orthodox Church', 'Blagaj Dervish Monastery'],
        de: ['Gazi-Husrev-Beg-Moschee (Sarajevo)', 'Herz-Jesu-Kathedrale (Sarajevo)', 'Alte Orthodoxe Kirche', 'Derwischkloster Blagaj']
      }
    },
    language: {
      officialLanguages: {
        tr: 'Boşnakça, Sırpça, Hırvatça (Birbirini anlayan Güney Slav dilleri). Gençlerde İngilizce yaygındır.',
        en: 'Bosnian, Serbian, and Croatian (Mutually intelligible South Slavic languages). English widely spoken by youth.',
        de: 'Bosnisch, Serbisch, Kroatisch. Englisch bei jüngeren Menschen verbreitet.'
      },
      englishProficiency: {
        tr: 'Turizm bölgelerinde ve Saraybosna/Mostar’da otel ve restoranlarda yeterlidir.',
        en: 'Good in tourism hubs like Sarajevo and Mostar.',
        de: 'Gut in den Zentren von Sarajevo und Mostar.'
      },
      phrases: [
        { phrase: 'Dobar dan', meaningTr: 'İyi günler / Merhaba', meaningEn: 'Good day / Hello', meaningDe: 'Guten Tag', pronunciation: 'Dobar dan' },
        { phrase: 'Hvala lijepa', meaningTr: 'Çok teşekkürler', meaningEn: 'Thank you very much', meaningDe: 'Vielen Dank', pronunciation: 'Hvala liyepa' },
        { phrase: 'Molim', meaningTr: 'Lütfen / Bir şey değil', meaningEn: 'Please / You’re welcome', meaningDe: 'Bitte', pronunciation: 'Molim' },
        { phrase: 'Koliko košta?', meaningTr: 'Bu ne kadar?', meaningEn: 'How much does it cost?', meaningDe: 'Wie viel kostet das?', pronunciation: 'Koliko koş-ta' },
        { phrase: 'Račun, molim', meaningTr: 'Hesap lütfen', meaningEn: 'Check please', meaningDe: 'Die Rechnung, bitte', pronunciation: 'Raçun molim' }
      ]
    },
    history: {
      conciseHistory: {
        tr: 'Ortaçağ Bosna Krallığı’ndan Osmanlı fethine, Avusturya-Macaristan idaresinden Yugoslavya’ya ve 1990’lardaki bağımsızlık mücadelesine uzanan zengin ve çileli tarih.',
        en: 'From the medieval Kingdom of Bosnia to centuries of Ottoman rule, Austro-Hungarian modernism, Yugoslavia, and sovereign independence.',
        de: 'Vom mittelalterlichen Königreich über osmanische Herrschaft, k.u.k.-Monarchie, Jugoslawien bis zur Unabhängigkeit.'
      },
      milestones: {
        tr: ['1463: Fatih Sultan Mehmed’in Fethi ve Ahidname (Din özgürlüğü fermanı)', '1566: Mimar Hayreddin tarafından Mostar Köprüsü’nün inşası', '1914: Franz Ferdinand Suikastı (1. Dünya Savaşı’nın fitili)', '1995: Dayton Barış Antlaşması ve Bağımsızlık'],
        en: ['1463: Ottoman conquest and Ahdname of Milodraz (Declaration of religious freedom)', '1566: Construction of the Mostar Bridge', '1914: Assassination of Archduke Franz Ferdinand in Sarajevo', '1995: Dayton Peace Agreement'],
        de: ['1463: Osmanische Eroberung & Ahdnama (Religionsfreiheit)', '1566: Bau der Brücke von Mostar', '1914: Attentat von Sarajevo', '1995: Friedensabkommen von Dayton']
      }
    },
    gastronomy: {
      famousDishes: {
        tr: ['Boşnak Cevapi (Tırnaklı somun ekmeğinde 10 adet köfte & kaymak)', 'Boşnak Böreği (Kıymalı Burek, Peynirli Sirnica, Ispanaklı Zeljanica)', 'Begova Çorbası (Bey Çorbası - Bamya ve tavuklu nefis çorba)', 'Bosanski Lonac (Geleneksel güveçte sebzeli et yahnisi)'],
        en: ['Bosnian Cevapi (Minced meat sausages in fresh somun bread with kajmak)', 'Burek & Pita (Crispy spiral pastries filled with minced meat, cheese, or spinach)', 'Begova Corba (Bey’s soup with shredded chicken, vegetables, and okra)', 'Bosanski Lonac (Traditional slow-cooked meat and vegetable stew)'],
        de: ['Bosnische Ćevapi im Somun-Fladenbrot mit Kajmak', 'Burek (Blätterteig mit Fleisch, Käse oder Spinat)', 'Begova Čorba (Bey-Suppe mit Hühnchen und Okra)', 'Bosanski Lonac (Schmortopf)']
      },
      traditionalDrinks: {
        tr: ['Džezva’da Pişen Boşnak Kahvesi (Lokum ile servis edilir)', 'Rakija (Sljivovica - Erik brendisi)', 'Doğal Kaynak Suları'],
        en: ['Bosnian Coffee brewed in copper cezve with Turkish delight', 'Rakija (Plum brandy - Sljivovica)', 'Pristine mountain mineral waters'],
        de: ['Bosnischer Kaffee aus der Kupfer-Džezva mit Lokum', 'Rakija (Pflaumenschnaps Šljivovica)', 'Frisches Bergquellwasser']
      },
      streetFoodAndDesserts: {
        tr: ['Tufahija (Ceviz dolgulu ve kremalı fırınlanmış elma)', 'Uštipci (Kajmak ve peynirle yenen sıcak hamur kızartmaları)', 'Trileçe ve Hurmaşica'],
        en: ['Tufahija (Poached walnut-stuffed apple with whipped cream)', 'Ustipci (Hot crispy fried dough balls with kajmak)', 'Hurmasica and Tres Leches cake'],
        de: ['Tufahija (Gefüllter Bratapfel mit Walnüssen)', 'Uštipci (Frittierte Teigbällchen mit Kajmak)', 'Hurmašica']
      }
    },
    achievements: {
      famousFigures: {
        tr: ['Aliya İzzetbegoviç (Bilge Kral - Bağımsız Bosna’nın Kurucusu)', 'Ivo Andrić (Nobel Edebiyat Ödüllü Yazar - Drina Köprüsü)', 'Danis Tanović (Oscar Ödüllü Yönetmen)', 'Edin Džeko (Yıldız Futbolcu)'],
        en: ['Alija Izetbegovic (First President and Philosopher)', 'Ivo Andric (Nobel Laureate in Literature - The Bridge on the Drina)', 'Danis Tanovic (Oscar-winning Director)', 'Edin Dzeko (Football Legend)'],
        de: ['Alija Izetbegović (Erster Präsident)', 'Ivo Andrić (Literaturnobelpreisträger)', 'Danis Tanović (Oscar-Preisträger)', 'Edin Džeko (Fußballstar)']
      },
      strongSectors: {
        tr: ['Doğa ve Kültür Turizmi (Rafting, kayak ve tarihi turlar)', 'Ahşap Mobilya ve Tasarım İhracatı', 'Metal İşleme ve Otomotiv Yan Sanayii', 'Hidroelektrik Üretimi'],
        en: ['Eco and Cultural Tourism (Rafting, skiing, historic monuments)', 'Wood Furniture Manufacturing', 'Metalworking and Automotive components', 'Hydroelectric Power'],
        de: ['Natur- und Kulturtourismus', 'Holzmöbelindustrie', 'Metallverarbeitung', 'Wasserkraft']
      }
    },
    economy: {
      paymentCulture: {
        tr: 'Para birimi Bosna Konvertibl Markı’dır (BAM - Euro’ya 1 EUR = 1.95583 BAM sabit kurla bağlıdır). Nakit para hala çok önemlidir; restoran ve çarşılarda nakit BAM bulundurun.',
        en: 'Currency is Convertible Mark (BAM, pegged to EUR at 1 EUR = 1.95583 BAM). Cash is essential for cafes, bazaars, and taxis.',
        de: 'Währung ist die Konvertible Mark (BAM, fest an den Euro gekoppelt: 1 EUR = 1,95583 BAM). Bargeld ist im Alltag unerlässlich.'
      },
      economicPillars: {
        tr: 'Turizm gelirleri, enerji üretimi, madencilik, ahşap imalat sanayii ve yurtdışında yaşayan Boşnakların işçi dövizleri.',
        en: 'Tourism, energy exports, wood manufacturing, and diaspora remittances.',
        de: 'Tourismus, Energieexporte, Holzverarbeitung und Überweisungen der Diaspora.'
      },
      tippingCulture: {
        tr: 'Restoran ve kafelerde hesabı yukarı yuvarlamak veya %10 bahşiş bırakmak çok yaygındır.',
        en: 'Tipping 10% or rounding up the bill is customary and appreciated.',
        de: 'Aufrunden oder ca. 10% Trinkgeld ist üblich.'
      }
    }
  },

  // Tayland
  TH: {
    culture: {
      etiquette: {
        tr: [
          'Selamlaşırken eller göğüs hizasında birleştirilip baş eğilir (Wai selamı).',
          'Kraliyet ailesine ve Kral portrelerine en üst düzeyde saygı gösterilir; eleştiri yasal suçtur (Lèse-majesté).',
          'Baş vücudun en kutsal yeri sayılır; çocukların veya yetişkinlerin başına asla dokunulmaz.',
          'Ayaklar en kirli yer kabul edilir; birini veya Buda heykellerini ayakla işaret etmek büyük saygısızlıktır.'
        ],
        en: [
          'Greet with a respectful "Wai" (palms pressed together with a slight bow).',
          'Deep reverence for the Royal Family is mandatory; disrespect is legally penalized.',
          'The head is considered sacred; never touch anyone’s head.',
          'Feet are seen as lowly; never point feet towards monks, Buddha statues, or people.'
        ],
        de: [
          'Traditionelle Begrüßung mit dem "Wai" (Handflächen zusammengeführt mit Verneigung).',
          'Höchster Respekt vor dem Königshaus ist gesetzlich vorgeschrieben.',
          'Der Kopf gilt als heilig; niemals den Kopf anderer Personen berühren.',
          'Füße gelten als unrein; niemals mit den Füßen auf Personen oder Buddha-Statuen zeigen.'
        ]
      },
      festivals: {
        tr: ['Songkran (Tayland Yeni Yılı - Sokak Su Savaşı Festivali, Nisan)', 'Loy Krathong (Işık ve Fener Festivali, Kasım)', 'Yi Peng (Gökyüzü Fenerleri, Chiang Mai)'],
        en: ['Songkran (Thai New Year Nationwide Water Festival, April)', 'Loy Krathong (Floating Basket Lantern Festival, November)', 'Yi Peng Sky Lantern Festival (Chiang Mai)'],
        de: ['Songkran (Thailändisches Neujahrs-Wasserfest im April)', 'Loy Krathong (Lichterfest im November)', 'Yi Peng Himmelslaternenfestival in Chiang Mai']
      },
      lifestyle: {
        tr: '"Sabai Sabai" (rahatlık, huzur) ve "Mai Pen Rai" (önemli değil, dert etme) felsefesiyle şekillenen telaşsız, güleryüzlü tropik yaşam.',
        en: 'Living by the spirit of "Mai Pen Rai" (no worries) and "Sabai Sabai" (deep relaxation); gracious warmth and radiant smiles.',
        de: 'Lebensfreude nach der Philosophie des "Mai Pen Rai" (keine Sorge) und "Sabai Sabai" (Entspannung); das "Land des Lächelns".'
      }
    },
    tourism: {
      mustSeePlaces: {
        tr: ['Büyük Saray & Wat Phra Kaew (Zümrüt Buda - Bangkok)', 'Wat Arun (Şafak Tapınağı - Chao Phraya)', 'Chiang Mai Antik Kenti & Doi Suthep Tapınağı', 'Phi Phi Adaları & Maya Koyu (Krabi)', 'Phuket Eski Şehir & Promthep Burnu', 'Ayutthaya UNESCO Antik Tapınak Harabeleri'],
        en: ['The Grand Palace & Wat Phra Kaew (Emerald Buddha, Bangkok)', 'Wat Arun (Temple of Dawn, Bangkok)', 'Chiang Mai Old Town & Wat Phra That Doi Suthep', 'Phi Phi Islands & Maya Bay (Krabi)', 'Phuket Old Town & Beaches', 'Ayutthaya Historical UNESCO Park'],
        de: ['Großer Palast & Wat Phra Kaeo (Smaragd-Buddha, Bangkok)', 'Wat Arun (Tempel der Morgenröte, Bangkok)', 'Chiang Mai & Tempel Doi Suthep', 'Phi Phi Inseln & Maya Bay', 'Phuket Altstadt & Strände', 'Historischer Park Ayutthaya (UNESCO)']
      },
      bestSeasons: {
        tr: 'Kasım - Şubat (Kuru ve serin mevsim; en konforlu seyahat zamanı).',
        en: 'November - February (Cool and dry season; peak travel weather).',
        de: 'November - Februar (Trockene, angenehmste Reisezeit).'
      },
      travelStyleTip: {
        tr: 'Türk vatandaşları için 30 güne kadar vizesizdir. Bangkok içinde nehir tekneleri ve Skytrain (BTS) trafiğe yakalanmadan gezmenin en iyi yoludur.',
        en: 'Visa-free for many tourists. In Bangkok, use the Chao Phraya river express boats and BTS Skytrain to skip traffic jams.',
        de: 'Visafreie Einreise für viele Touristen. In Bangkok BTS Skytrain und Expressboote nutzen, um den Verkehrsstau zu umgehen.'
      }
    },
    religion: {
      primaryReligions: {
        tr: 'Theravada Budizm (~%93), İslam (~%5, güney vilayetleri), Hristiyanlık (~%1).',
        en: 'Theravada Buddhism (~93%), Islam (~5%, southern provinces), Christianity (~1%).',
        de: 'Theravada-Buddhismus (~93%), Islam (~5% im Süden), Christentum (~1%).'
      },
      respectNorms: {
        tr: 'Tapınaklara girerken omuzlar ve dizler tamamen kapalı olmalı, ayakkabılar çıkarılmalıdır. Kadınlar Budist rahiplere asla fiziksel temasta bulunamaz.',
        en: 'Strict temple dress code: shoulders and knees covered, shoes removed. Women must never touch Buddhist monks.',
        de: 'Strenge Kleiderordnung in Tempeln: Schultern und Knie bedeckt, Schuhe ausziehen. Frauen dürfen Mönche nicht berühren.'
      },
      sacredSites: {
        tr: ['Wat Phra Kaew (Bangkok)', 'Wat Pho (Yatan Buda Heykeli)', 'Wat Rong Khun (Beyaz Tapınak - Chiang Rai)', 'Doi Suthep (Chiang Mai)'],
        en: ['Wat Phra Kaew (Temple of the Emerald Buddha)', 'Wat Pho (Reclining Buddha)', 'Wat Rong Khun (White Temple, Chiang Rai)', 'Wat Phra That Doi Suthep'],
        de: ['Wat Phra Kaeo', 'Wat Pho (Liegender Buddha)', 'Weißer Tempel Wat Rong Khun (Chiang Rai)', 'Wat Phra That Doi Suthep']
      }
    },
    language: {
      officialLanguages: {
        tr: 'Tayca (Özgün tonlamalı alfabe). Turistik bölgelerde İngilizce çok yaygındır.',
        en: 'Thai (Tonal language with unique script). English widely understood in tourist centers.',
        de: 'Thailändisch mit Tonsystem und eigener Schrift. Englisch in Touristenorten weit verbreitet.'
      },
      englishProficiency: {
        tr: 'Bangkok, Phuket, Chiang Mai ve adalarda otel ve kafelerde yeterlidir.',
        en: 'Good in tourist destinations; translation apps helpful in rural villages.',
        de: 'Gut in den Touristenzentren; Übersetzungs-Apps auf dem Land nützlich.'
      },
      phrases: [
        { phrase: 'Sawasdee khrap/kha (สวัสดี)', meaningTr: 'Merhaba (Erkekler khrap, kadınlar kha der)', meaningEn: 'Hello (khrap for men, kha for women)', meaningDe: 'Hallo', pronunciation: 'Savat-dii krap/kaa' },
        { phrase: 'Khop khun khrap/kha (ขอบคุณ)', meaningTr: 'Teşekkür ederim', meaningEn: 'Thank you', meaningDe: 'Vielen Dank', pronunciation: 'Kop-kun krap/kaa' },
        { phrase: 'Tao rai khrap/kha? (เท่าไหร่)', meaningTr: 'Bu ne kadar?', meaningEn: 'How much is this?', meaningDe: 'Wie viel kostet das?', pronunciation: 'Tao ray krap/kaa' },
        { phrase: 'Mai phet (ไม่เผ็ด)', meaningTr: 'Acısız olsun lütfen!', meaningEn: 'Not spicy please!', meaningDe: 'Nicht scharf bitte!', pronunciation: 'May pet' },
        { phrase: 'Check bin khrap/kha (เช็คบิล)', meaningTr: 'Hesap lütfen', meaningEn: 'Bill please', meaningDe: 'Rechnung bitte', pronunciation: 'Çek bin krap/kaa' }
      ]
    },
    history: {
      conciseHistory: {
        tr: 'Sukhothai ve Ayutthaya antik krallıklarından günümüze Güneydoğu Asya’da Avrupalılar tarafından hiçbir zaman sömürgeleştirilmemiş tek bağımsız ülke (Siam).',
        en: 'The only Southeast Asian nation never colonized by European powers; evolved from Sukhothai and Siam into modern Thailand.',
        de: 'Das einzige Land Südostasiens, das nie von europäischen Mächten kolonisiert wurde; reiche Geschichte von Siam.'
      },
      milestones: {
        tr: ['1238: İlk Birleşik Tay Krallığı (Sukhothai)', '1350-1767: Ayutthaya Krallığı Altın Çağı', '1932: Mutlak Monarşiden Meşruti Monarşiye Geçiş', 'Modern Güneydoğu Asya Turizm ve İmalat Merkezi'],
        en: ['1238: Foundation of the Sukhothai Kingdom', '1350-1767: Golden Age of Ayutthaya', '1932: Transition to Constitutional Monarchy', 'Modern industrial and global tourism boom'],
        de: ['1238: Gründung des Königreichs Sukhothai', '1350: Blütezeit von Ayutthaya', '1932: Einführung der konstitutionellen Monarchie', 'Moderner Tourismusboom']
      }
    },
    gastronomy: {
      famousDishes: {
        tr: ['Pad Thai (Tamarind soslu, karidesli ve fıstıklı kızarmış pirinç eriştesi)', 'Tom Yum Goong (Limon otu ve acı biberli aromatik karides çorbası)', 'Som Tum (Misket limonu ve yer fıstıklı acı yeşil papaya salatası)', 'Yeşil Körili Tavuk (Gaeng Kiew Wan - Hindistan cevizi sütlü)'],
        en: ['Pad Thai (Stir-fried rice noodles with shrimp, tamarind, eggs, and peanuts)', 'Tom Yum Goong (Spicy and sour aromatic lemongrass shrimp soup)', 'Som Tum (Fiery green papaya salad with lime and peanuts)', 'Green Curry Chicken (Fragrant coconut milk curry with Thai basil)'],
        de: ['Pad Thai (Gebratene Reisnudeln mit Garnelen und Erdnüssen)', 'Tom Yum Goong (Scharf-saure Garnelensuppe)', 'Som Tum (Grüner Papayasalat)', 'Grünes Thai-Curry mit Kokosmilch']
      },
      traditionalDrinks: {
        tr: ['Cha Yen (Kondanse sütlü tatlı Tayland buzlu sütlü çayı)', 'Taze Hindistan Cevizi Suyu', 'Singha & Chang Yerel Biraları'],
        en: ['Cha Yen (Thai Iced Tea with sweetened condensed milk)', 'Fresh Young Coconut Water', 'Singha and Chang Thai lagers'],
        de: ['Cha Yen (Thailändischer Eistee mit Kondensmilch)', 'Frisches Kokoswasser', 'Singha und Chang Bier']
      },
      streetFoodAndDesserts: {
        tr: ['Mango Sticky Rice (Tatlı hindistan cevizi sütlü yapışkan pirinç & taze mango)', 'Roti (Muzlu ve çikolatalı çıtır sokak krepi)', 'Izgara Domuz Şişleri (Moo Ping)'],
        en: ['Mango Sticky Rice with warm sweet coconut cream', 'Crispy Banana and Nutella Roti pancakes', 'Moo Ping (Grilled marinated pork skewers)'],
        de: ['Mango Sticky Rice mit Kokosmilch', 'Knusprige Roti mit Banane', 'Moo Ping (Gegrillte Fleischspieße)']
      }
    },
    achievements: {
      famousFigures: {
        tr: ['Kral Chulalongkorn (Rama V - Modern Tayland’ın Mimarı)', 'Bhumibol Adulyadej (Rama IX - 70 Yıl Hüküm Süren Saygın Kral)', 'Tony Jaa (Dünyaca Ünlü Dövüş Sanatları Aktörü)', 'Lisa (Lalisa Manobal - K-Pop Blackpink Yıldızı)', 'Alexander Albon (Formula 1 Pilotu)'],
        en: ['King Chulalongkorn (Rama V - Great Modernizer)', 'King Bhumibol Adulyadej (Rama IX - Revered Monarch)', 'Tony Jaa (Martial arts film icon)', 'Lisa (Lalisa Manobal - Global music superstar)', 'Alex Albon (Formula 1 Driver)'],
        de: ['König Chulalongkorn (Rama V)', 'König Bhumibol Adulyadej (Rama IX)', 'Tony Jaa (Schauspieler & Kampfkünstler)', 'Lisa / Lalisa Manobal (Pop-Ikone)', 'Alex Albon (Formel-1-Fahrer)']
      },
      strongSectors: {
        tr: ['Küresel Turizm ve Ağırlama Hizmetleri', 'Otomotiv İmalatı (Asya’nın Detroit’i)', 'Elektronik ve Sabit Disk İhracatı', 'Tarım ve Pirinç İhracatı (Jasmine Rice)'],
        en: ['Global Hospitality and Medical Tourism', 'Automotive Manufacturing (Detroit of Southeast Asia)', 'Electronics and Hard Disk Drives', 'Agriculture (Jasmine Rice and tropical fruits)'],
        de: ['Weltweiter Tourismus & Medizintourismus', 'Automobilproduktion', 'Elektronikfertigung', 'Reisexport (Jasminreis)']
      }
    },
    economy: {
      paymentCulture: {
        tr: 'Para birimi Tayland Bahtı’dır (THB). Sokak lezzetleri, pazarlar ve tuk-tuklar için nakit para zorunludur; alışveriş merkezlerinde kart geçerlidir.',
        en: 'Currency is Thai Baht (THB). Cash is vital for street food and night markets; cards accepted in malls.',
        de: 'Währung ist der Thailändische Baht (THB). Bargeld für Street Food und Märkte zwingend nötig; Kartenzahlung in Malls.'
      },
      economicPillars: {
        tr: 'Turizm, otomotiv montajı, elektronik üretimi ve tarımsal gıda ihracatı.',
        en: 'Tourism, automotive assembly, electronics manufacturing, and agriculture.',
        de: 'Tourismus, Automobilmontage, Elektronikindustrie und Landwirtschaft.'
      },
      tippingCulture: {
        tr: 'Geleneksel olarak bahşiş kültürü yoktur ancak turizmde masada 20-50 THB bırakmak veya %10 eklemek çok takdir edilir.',
        en: 'Not historically customary, but leaving 20-50 THB or 10% in sit-down restaurants is appreciated.',
        de: 'Traditionell nicht üblich, aber 20-50 THB Trinkgeld in Restaurants wird gern gesehen.'
      }
    }
  }
};
