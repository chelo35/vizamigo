import { CuratedEntry } from './countryEncyclopedia';

export const CURATED_EXTRA_2: Record<string, CuratedEntry> = {
  // Birleşik Arap Emirlikleri
  AE: {
    culture: {
      etiquette: {
        tr: [
          'Kamusal alanlarda kıyafet kurallarına saygı gösterilir (omuz ve dizler kapalı olmalıdır).',
          'Alkol sadece lisanslı otel, restoran ve kulüplerde tüketilebilir; sokakta tüketmek kesinlikle yasaktır.',
          'Ramazan ayında gündüz saatlerinde sokakta yiyip içmekten veya sakız çiğnemekten kaçınılmalıdır.',
          'İnsanların izinsiz fotoğrafını çekmek ve sosyal medyada paylaşmak yasal olarak yasaktır.'
        ],
        en: [
          'Respect modest dress codes in public malls and government buildings (shoulders and knees covered).',
          'Alcohol is served strictly in licensed venues; public drinking is prohibited.',
          'Refrain from eating, drinking, or smoking publicly during Ramadan daylight hours.',
          'Taking photos of strangers without their consent is legally restricted.'
        ],
        de: [
          'Angemessene Kleidung in Einkaufszentren und Behörden (Schultern und Knie bedeckt).',
          'Alkoholkonsum nur in lizenzierten Lokalen und Hotels gestattet.',
          'Während des Ramadan tagsüber nicht öffentlich essen oder trinken.',
          'Fotografieren fremder Personen ohne Erlaubnis ist gesetzlich untersagt.'
        ]
      },
      festivals: {
        tr: ['2 Aralık BAE Ulusal Günü', 'Dubai Alışveriş Festivali (DSF)', 'Abu Dhabi Formula 1 Grand Prix', 'Dubai Dünya Kupası At Yarışları'],
        en: ['UAE National Day (December 2)', 'Dubai Shopping Festival (DSF)', 'Abu Dhabi Formula 1 Grand Prix', 'Dubai World Cup Horse Race'],
        de: ['Nationalfeiertag (2. Dezember)', 'Dubai Shopping Festival', 'Abu Dhabi Formel 1 Grand Prix', 'Dubai World Cup Pferderennen']
      },
      lifestyle: {
        tr: 'Ultra lüks, fütüristik mimari, dünyanın en güvenli şehirleri, küresel expat topluluğu ve klimalı modern konfor.',
        en: 'Ultra-luxurious, futuristic skyscrapers, world-class safety, multinational expat community, and glamorous desert adventures.',
        de: 'Futuristische Wolkenkratzer, Luxus, höchste Sicherheit und Wüstenabenteuer.'
      }
    },
    tourism: {
      mustSeePlaces: {
        tr: ['Burj Khalifa & Dubai Mall (Dünyanın en yüksek binası)', 'Şeyh Zayed Ulu Camii (Abu Dhabi)', 'Louvre Abu Dhabi Müzesi', 'Dubai Çöl Safarisi & Kızıl Kum Tepeleri', 'Palmiye Adası (Palm Jumeirah & Atlantis)', 'Eski Dubai & Altın Çarşısı (Deira)'],
        en: ['Burj Khalifa & Dubai Mall', 'Sheikh Zayed Grand Mosque (Abu Dhabi)', 'Louvre Abu Dhabi Museum', 'Desert Safari & Red Dunes', 'Palm Jumeirah & Atlantis', 'Old Dubai & Gold Souk (Deira)'],
        de: ['Burj Khalifa & Dubai Mall', 'Scheich-Zayid-Moschee (Abu Dhabi)', 'Louvre Abu Dhabi', 'Wüstensafari in den roten Dünen', 'Palm Jumeirah', 'Gold- und Gewürzbasar (Deira)']
      },
      bestSeasons: {
        tr: 'Kasım - Mart ayları arası güneşli ve 25-28°C sıcaklıkla en mükemmel zamandır. Yaz aylarında sıcaklık 45°C’yi bulur.',
        en: 'November - March offers perfect beach and desert weather (25°C). Avoid intense summer heat (45°C+).',
        de: 'November - März ist die beste Reisezeit bei angenehmen 25-28°C.'
      },
      travelStyleTip: {
        tr: 'Dubai Metrosu sürücüsüzdür ve çok pratiktir; taksiler ve Careem/Uber uygulamaları oldukça yaygın ve güvenilirdir.',
        en: 'Use the automated Dubai Metro; Careem and public taxis are modern and reliable.',
        de: 'Fahrerlose Dubai Metro nutzen; Taxis und Careem sind komfortabel.'
      }
    },
    religion: {
      primaryReligions: {
        tr: 'İslam (~%76, resmi devlet dini), Hristiyan (~%13), Hindu ve Budist göçmen toplulukları (~%10).',
        en: 'Islam (~76%, official religion), Christian (~13%), Hindu & Buddhist expatriates (~10%).',
        de: 'Islam (~76%, Staatsreligion), Christen (~13%), Hindus & Buddhisten (~10%).'
      },
      respectNorms: {
        tr: 'Şeyh Zayed Camii ziyaretinde kadınlar için tesettür abaye zorunludur; giriş kapısında temin edilir.',
        en: 'Full abaya and headscarf provided for women at the entrance of Sheikh Zayed Grand Mosque.',
        de: 'Für Frauen wird an der Scheich-Zayid-Moschee eine Abaya zur Verfügung gestellt.'
      },
      sacredSites: {
        tr: ['Şeyh Zayed Ulu Camii (Abu Dhabi)', 'Jumeirah Camii (Dubai)', 'Kral Faysal Camii (Sharjah)', 'İbrahim Ailesi Evi (Abrahamic Family House)'],
        en: ['Sheikh Zayed Grand Mosque', 'Jumeirah Mosque (Dubai)', 'King Faisal Mosque (Sharjah)', 'Abrahamic Family House (Interfaith complex)'],
        de: ['Scheich-Zayid-Moschee', 'Jumeirah-Moschee (Dubai)', 'Abrahamic Family House']
      }
    },
    language: {
      officialLanguages: {
        tr: 'Arapça (Resmi dil). Günlük hayatta ve ticarette lingua franca tamamen İngilizce’dir.',
        en: 'Arabic (Official). English is the de facto language of everyday business, dining, and transit.',
        de: 'Arabisch (Amtssprache). Englisch ist die universelle Verkehrssprache im Alltag.'
      },
      englishProficiency: {
        tr: 'Çok yüksek (%99). Ülkede yaşayan herkes akıcı İngilizce ile anlaşır.',
        en: 'Very high; English is spoken universally by all service staff, taxi drivers, and locals.',
        de: 'Sehr hoch; Englisch wird überall gesprochen.'
      },
      phrases: [
        { phrase: 'Marhaban (مرحباً)', meaningTr: 'Merhaba', meaningEn: 'Hello', meaningDe: 'Hallo', pronunciation: 'mahr-hah-bahn' },
        { phrase: 'Shukran (شكراً)', meaningTr: 'Teşekkürler', meaningEn: 'Thank you', meaningDe: 'Danke', pronunciation: 'shook-rahn' },
        { phrase: 'Min fadlak (من فضلك)', meaningTr: 'Lütfen', meaningEn: 'Please', meaningDe: 'Bitte', pronunciation: 'meen fahd-lahk' },
        { phrase: 'Kam hatha? (كم هذا؟)', meaningTr: 'Bu ne kadar?', meaningEn: 'How much is this?', meaningDe: 'Wie viel kostet das?', pronunciation: 'kam hah-thah' },
        { phrase: 'Al-hisab law samaht', meaningTr: 'Hesap lütfen', meaningEn: 'The bill please', meaningDe: 'Die Rechnung, bitte', pronunciation: 'ahl-hee-sahb low sah-mahht' }
      ]
    },
    history: {
      conciseHistory: {
        tr: '1971’de Şeyh Zayed bin Sultan Al Nahyan önderliğinde 7 emirliğin birleşmesiyle kuruldu. İnci dalgıçlığı ve bedevi çöl yaşamından yarım yüzyılda küresel havacılık, ticaret ve teknoloji üssüne dönüştü.',
        en: 'Formed in 1971 by the union of seven emirates led by Sheikh Zayed. Transformed within 50 years from pearl-diving sands into a global trading, aviation, and tech nexus.',
        de: '1971 gegründet durch den Zusammenschluss der sieben Emirate unter Scheich Zayid. Rasanter Aufstieg zur globalen Metropole.'
      },
      milestones: {
        tr: ['1971: BAE Federasyonu’nun kuruluşu', '2010: Burj Khalifa’nın açılışı', '2020: Expo Dubai & Mars Görevi (Hope Probe)', 'Modern: Yapay Zeka ve Finans Başkenti'],
        en: ['1971: UAE Federation founded', '2010: Burj Khalifa opens', '2020: Expo Dubai & Hope Mars Probe', 'Modern: Global AI & Crypto Hub'],
        de: ['1971: Gründung der Föderation', '2010: Eröffnung des Burj Khalifa', '2020: Weltausstellung Expo Dubai', 'Heute: Globales Drehkreuz']
      }
    },
    gastronomy: {
      famousDishes: {
        tr: ['Machboos (Baharatlı pirinç ve kuzu eti)', 'Shawarma (Lavaşta marine tavuk/et dürüm)', 'Al Harees (Ağır pişen buğday ve et püresi)', 'Karak Çayı ile Luqaimat (Tatlı lokma)'],
        en: ['Machboos fragrant spiced lamb rice', 'Authentic Arabic Chicken & Beef Shawarma', 'Al Harees slow-cooked wheat and meat', 'Luqaimat sweet dumplings drizzled with date syrup'],
        de: ['Machboos Lamm-Reisgericht', 'Arabisches Schawarma', 'Al Harees', 'Luqaimat (frittierte Teigbällchen mit Dattelsirup)']
      },
      traditionalDrinks: {
        tr: ['Karak Çayı (Baharatlı sütlü çay)', 'Gahwa (Kakuleli Emirlik Kahvesi & Hurma)', 'Taze Nane Limonata', 'Jallab (Üzüm pekmezi ve çam fıstıklı içecek)'],
        en: ['Karak Chai spiced milk tea', 'Gahwa Arabic cardamom coffee with royal dates', 'Fresh Mint Lemonade', 'Jallab date-molasses syrup drink'],
        de: ['Karak Chai (Milchtee)', 'Gahwa (Kardamom-Kaffee) mit Datteln', 'Minz-Limonade', 'Jallab']
      },
      streetFoodAndDesserts: {
        tr: ['Umm Ali (Mısır usulü fırın süt tatlısı)', 'Luqaimat (Hurma şuruplu lokma)', 'Kunafa (Sıcak peynirli kadayıf)', 'Falafel Dürüm'],
        en: ['Umm Ali warm bread pudding with pistachios', 'Crispy Luqaimat with sesame seeds', 'Hot Cheese Kunafa', 'Fresh Falafel Wraps'],
        de: ['Umm Ali Brotpudding', 'Luqaimat', 'Käse-Kunafa', 'Falafel-Wrap']
      }
    },
    achievements: {
      famousFigures: {
        tr: ['Şeyh Zayed bin Sultan Al Nahyan (Kurucu Lider)', 'Şeyh Muhammed bin Raşid Al Maktum (Dubai Vizyoneri)', 'Sultan Al Neyadi (Astronot)'],
        en: ['Sheikh Zayed bin Sultan Al Nahyan (Founding Father)', 'Sheikh Mohammed bin Rashid Al Maktoum', 'Dr. Sultan Al Neyadi (ISS Astronaut)'],
        de: ['Scheich Zayid bin Sultan Al Nahyan', 'Scheich Mohammed bin Rashid Al Maktoum', 'Sultan Al Neyadi (Astronaut)']
      },
      strongSectors: {
        tr: ['Dünya Havacılık & Lojistik Merkezi (Emirates & Flydubai)', 'Küresel Finans ve Dijital Varlıklar', 'Lüks Turizm & Otelcilik', 'Yapay Zeka ve Uzay Araştırmaları'],
        en: ['Aviation & Logistics Hub (Emirates, Etihad, DP World)', 'International Finance & Fintech Free Zones', 'Ultra-Luxury Tourism', 'AI & Space Exploration'],
        de: ['Luftfahrt (Emirates, Etihad)', 'Internationales Finanzwesen & Krypto', 'Luxustourismus', 'Raumfahrt & KI']
      }
    },
    economy: {
      paymentCulture: {
        tr: 'Neredeyse tamamen nakitsiz (%99 Apple Pay ve Kart). Taksilerde ve sokak satıcılarında bile kart geçerlidir.',
        en: 'Completely cashless; contactless Apple Pay, Google Pay, and cards accepted universally.',
        de: 'Nahezu komplett bargeldlos (Apple Pay und Karten überall akzeptiert).'
      },
      economicPillars: {
        tr: 'Petrol ve doğalgaz, küresel ticaret ve limanlar, turizm, gayrimenkul ve finans.',
        en: 'Hydrocarbons, international trade, aviation, real estate, and finance.',
        de: 'Öl und Gas, Außenhandel, Tourismus, Immobilien und Finanzen.'
      },
      tippingCulture: {
        tr: 'Restoranlarda %10-15 bahşiş teamüldür; faturaya ek servis ücreti olsa da garsona doğrudan bırakılır.',
        en: '10-15% tip is customary in dining. Valets and delivery drivers usually receive 5-10 AED.',
        de: '10-15% Trinkgeld im Restaurant ist üblich; kleine Beträge für Valet-Parken (5-10 AED).'
      }
    }
  },

  // Mısır
  EG: {
    culture: {
      etiquette: {
        tr: [
          'Yerel halk son derece sıcak ve esprilidir ("İbn el-Beled" esprili Mısır halk kültürü).',
          'Pazarlarda (Han el-Halili) pazarlık yapmak adettir; ilk söylenen fiyatın yarısından başlanabilir.',
          'Bahşiş (Baksheesh) kültürü günlük hayatın her alanında beklentidir; küçük bozukluklar hazır tutulmalıdır.',
          'Camilerde ayakkabılar çıkarılır ve kadınlar baş örtüsü takar.'
        ],
        en: [
          'Locals are exceptionally warm and famous for their quick humor across the Arab world.',
          'Bargaining in traditional bazaars (Khan el-Khalili) is an expected social dance.',
          '"Baksheesh" (tipping) is deeply woven into daily services; carry small Egyptian pounds.',
          'Remove shoes and dress conservatively in historic mosques.'
        ],
        de: [
          'Einheimische sind herzlich und für ihren Humor bekannt.',
          'Feilschen auf Basaren (wie dem Khan el-Khalili) gehört dazu.',
          '"Bakschisch" (Trinkgeld) wird für fast jede kleine Dienstleistung erwartet.',
          'Schuhe in Moscheen ausziehen; bedeckte Kleidung.'
        ]
      },
      festivals: {
        tr: ['Şem en-Nesim (Baharın gelişi bayramı)', 'Ramazan ve Kurban Bayramları', 'Moulid el-Nabi (Peygamberin Doğumu şenlikleri)', 'Kahire Uluslararası Film Festivali'],
        en: ['Sham en-Nessim (Pharaonic Spring Festival)', 'Eid al-Fitr & Eid al-Adha', 'Moulid Festivals (Sufi music celebrations)', 'Cairo International Film Festival'],
        de: ['Sham en-Nessim (Frühlingsfest)', 'Zuckerfest & Opferfest', 'Moulid-Feste', 'Kairo Internationales Filmfestival']
      },
      lifestyle: {
        tr: 'Nil Nehri’nin bereketiyle şekillenen binlerce yıllık yaşam ritmi; ahwa (kahvehane) kültürü, nargile ve gece canlanan sokaklar.',
        en: 'Rhythm shaped by the eternal Nile; traditional Ahwa coffeehouses, backgammon, mint tea, and bustling night markets.',
        de: 'Vom Nil geprägter Lebensrhythmus; traditionelle Ahwa-Cafés, Backgammon und lebhafte Nächte.'
      }
    },
    tourism: {
      mustSeePlaces: {
        tr: ['Giza Piramitleri & Büyük Sfenks (Kahire)', 'Büyük Mısır Müzesi (GEM - Tutankamon hazineleri)', 'Karnak & Luksor Tapınakları (Açık hava müzesi)', 'Krallar Vadisi (Tutankamon Mezarı)', 'Ebu Simbel Tapınağı (Aswan)', 'Kızıldeniz Resifleri (Şarm El-Şeyh & Hurghada)'],
        en: ['Great Pyramids of Giza & Sphinx', 'Grand Egyptian Museum (GEM)', 'Karnak & Luxor Temples', 'Valley of the Kings', 'Abu Simbel Rock Temples', 'Red Sea Diving (Sharm El Sheikh & Hurghada)'],
        de: ['Pyramiden von Gizeh & Sphinx', 'Grand Egyptian Museum (GEM)', 'Tempel von Karnak & Luxor', 'Tal der Könige', 'Abu Simbel Felsentempel', 'Rotes Meer (Hurghada & Sharm El-Sheikh)']
      },
      bestSeasons: {
        tr: 'Ekim - Nisan ayları seyahat için en konforlu dönemdir; yazın piramitler ve güney tapınakları 42°C’ye ulaşabilir.',
        en: 'October - April offers cooler, comfortable weather. Avoid mid-summer heatwaves in Upper Egypt.',
        de: 'Oktober - April ist die beste Reisezeit; der Sommer ist extrem heiß.'
      },
      travelStyleTip: {
        tr: 'Luksor ile Aswan arasında Nil Nehri yolcu gemisi (Nile Cruise) turuna katılın; Kahire içinde Uber kullanmak en güvenli yoldur.',
        en: 'Take a multi-day Nile Cruise between Luxor and Aswan; use Uber in Cairo to avoid taxi meter hassles.',
        de: 'Nilkreuzfahrt zwischen Luxor und Assuan machen; in Kairo Uber nutzen.'
      }
    },
    religion: {
      primaryReligions: {
        tr: 'Sünni Müslüman (~%90, El-Ezher İslam dünyasının merkezi), Kıpti Ortodoks Hristiyan (~%10).',
        en: 'Sunni Muslim (~90%, home to historic Al-Azhar University), Coptic Orthodox Christian (~10%).',
        de: 'Sunnitischer Islam (~90%, Sitz der al-Azhar), Koptische Christen (~10%).'
      },
      respectNorms: {
        tr: 'Hem tarihi camilere hem de Kıpti kiliselerine girerken saygılı ve mütevazı kıyafetler tercih edilmelidir.',
        en: 'Dress modestly when visiting both historic mosques and Coptic Christian basilicas.',
        de: 'Respektvolle Kleidung in Moscheen und koptischen Kirchen.'
      },
      sacredSites: {
        tr: ['El-Ezher Camii (Kahire)', 'Sultan Hasan Camii & Medresesi', 'Kıpti Asma Kilise (Hanging Church)', 'Aziz Katerina Manastırı (Sina Dağı)'],
        en: ['Al-Azhar Mosque & University', 'Mosque-Madrasa of Sultan Hassan', 'The Hanging Church (Coptic Cairo)', 'Saint Catherine’s Monastery (Mount Sinai)'],
        de: ['Al-Azhar-Moschee (Kairo)', 'Sultan-Hasan-Moschee', 'Hängende Kirche (Koptisches Kairo)', 'Katharinenkloster (Sinai)']
      }
    },
    language: {
      officialLanguages: {
        tr: 'Arapça (Mısır lehçesi - Masri, tüm Arap dünyasında diziler sayesinde en çok anlaşılan lehçedir). Turizmde İngilizce yaygındır.',
        en: 'Egyptian Arabic (Masri - the most widely understood Arabic dialect across the region). English common in tourism.',
        de: 'Ägyptisches Arabisch (in der arabischen Welt weit verstanden). Englisch im Tourismus geläufig.'
      },
      englishProficiency: {
        tr: 'Turizm, oteller ve rehberlerde çok iyi; yerel mahallelerde temel düzeydedir.',
        en: 'Fluent among licensed Egyptologists and hotel staff; basic in street markets.',
        de: 'Gut bei Reiseleitern und in Hotels; auf Märkten grundlegend.'
      },
      phrases: [
        { phrase: 'Salam Alaykum', meaningTr: 'Selamün Aleyküm', meaningEn: 'Hello / Peace be upon you', meaningDe: 'Guten Tag', pronunciation: 'sah-lahm ah-lai-koom' },
        { phrase: 'Shukran giddan', meaningTr: 'Çok teşekkürler', meaningEn: 'Thank you very much', meaningDe: 'Vielen Dank', pronunciation: 'shook-rahn geed-dahn' },
        { phrase: 'Min fadlak / Law samaht', meaningTr: 'Lütfen / Afedersiniz', meaningEn: 'Please / Excuse me', meaningDe: 'Bitte', pronunciation: 'meen fahd-lahk' },
        { phrase: 'Bikam da?', meaningTr: 'Bu ne kadar?', meaningEn: 'How much is this?', meaningDe: 'Wie viel kostet das?', pronunciation: 'bee-kahm dah' },
        { phrase: 'El-hisab, law samaht', meaningTr: 'Hesap lütfen', meaningEn: 'The check please', meaningDe: 'Rechnung bitte', pronunciation: 'el-hee-sahb low sah-mahht' }
      ]
    },
    history: {
      conciseHistory: {
        tr: 'Firavunlar çağı, piramitler ve hiyerogliflerle 5000 yılı aşkın insanlık tarihinin başlangıcı. İskenderiye, Roma, İslam fetihleri ve Memlükler sonrası modern Mısır, Arap dünyasının kültürel kalbidir.',
        en: 'Spanning over 5,000 years of recorded civilization from Pharaohs and Pyramids. Ruled by Ptolemaic dynasties, Romans, and Mamluks, today the cultural anchor of the Arab world.',
        de: 'Über 5.000 Jahre Zivilisation der Pharaonen, Pyramiden und Hieroglyphen. Kulturelles Herz der arabischen Welt.'
      },
      milestones: {
        tr: ['MÖ 2560: Büyük Giza Piramidi’nin inşası', 'MÖ 30: Kleopatra ve Ptolemaios Hanedanı sonu', '1869: Süveyş Kanalı’nın açılışı', '1952: Mısır Cumhuriyeti’nin ilanı'],
        en: ['2560 BC: Great Pyramid of Giza completed', '30 BC: Cleopatra & Ptolemaic era ends', '1869: Suez Canal opened to world trade', '1952: Egyptian Republic established'],
        de: ['2560 v. Chr.: Bau der Cheops-Pyramide', '30 v. Chr.: Ende der Pharaonenzeit unter Kleopatra', '1869: Eröffnung des Sueskanals', '1952: Ausrufung der Republik']
      }
    },
    gastronomy: {
      famousDishes: {
        tr: ['Koshari (Pirinç, mercimek, makarna, nohut & acılı domates soslu milli yemek)', 'Ta\'ameya (Fava fasulyeli Mısır falafeli)', 'Ful Medames (Ağır pişen fava fasulyesi ezmesi)', 'Molokhia (Jüt yapraklı sarımsaklı tavuk çorbası)'],
        en: ['Koshari (national dish: lentils, rice, macaroni, chickpeas & spicy garlic tomato sauce)', 'Ta\'ameya (fluffy Egyptian fava bean falafel)', 'Ful Medames (slow-simmered fava bean dip)', 'Molokhia garlic herb broth with chicken'],
        de: ['Koshari (Nationalgericht mit Reis, Linsen, Nudeln und Tomatensauce)', 'Ta\'ameya (ägyptische Falafel aus Ackerbohnen)', 'Ful Medames', 'Molokhia Suppe']
      },
      traditionalDrinks: {
        tr: ['Karkadeh (Buzlu veya sıcak kırmızı hibiskus çayı)', 'Ahwa Mısır Kahvesi (Kakuleli)', 'Şeker Kamışı Suyu (Asir Asab)', 'Sahlab (Tarçınlı sıcak sütlü içecek)'],
        en: ['Karkadeh (iced or warm crimson hibiscus tea)', 'Ahwa Egyptian coffee spiced with cardamom', 'Asir Asab (freshly pressed sugarcane juice)', 'Sahlab winter pudding drink'],
        de: ['Karkadeh (Hibiskustee)', 'Ägyptischer Kaffee mit Kardamom', 'Frischer Zuckerrohrsaft', 'Sahlab']
      },
      streetFoodAndDesserts: {
        tr: ['Umm Ali (Kuru yemişli fırınlanmış sıcak sütlü tatlı)', 'Basbousa (Şerbetli irmik tatlısı)', 'Fiteer Baladi (Mısır katmeri - tatlı veya peynirli)', 'Roz Bel Laban (Sütlaç)'],
        en: ['Umm Ali warm puff pastry pudding with nuts', 'Sweet Basbousa semolina cake', 'Fiteer Baladi flaky Egyptian layered pancake', 'Roz Bel Laban rice pudding'],
        de: ['Umm Ali Brotpudding', 'Basbousa Grießkuchen', 'Fiteer Blätterteigfladen', 'Roz Bel Laban (Milchreis)']
      }
    },
    achievements: {
      famousFigures: {
        tr: ['Necip Mahfuz (Nobel Edebiyat Ödülü sahibi yazar)', 'Muhammed Salah (Futbol yıldızı)', 'Ahmet Zewail (Nobel Kimya Ödülü sahibi)', 'Ümmü Gülsüm (Doğu’nun Yıldızı - Efsanevi Diva)', 'Ömer Şerif (Hollywood aktörü)'],
        en: ['Naguib Mahfouz (Nobel Literature Laureate)', 'Mohamed Salah (Premier League superstar)', 'Ahmed Zewail (Nobel Chemistry Laureate)', 'Umm Kulthum (Legendary Voice of Egypt)', 'Omar Sharif (Hollywood actor)'],
        de: ['Nagib Mahfuz (Nobelpreis für Literatur)', 'Mohamed Salah (Fußballstar)', 'Ahmed Zewail (Nobelpreis für Chemie)', 'Umm Kulthum', 'Omar Sharif']
      },
      strongSectors: {
        tr: ['Küresel Miras & Arkeolojik Turizm', 'Süveyş Kanalı Transit Geçişi (Dünya deniz ticaretinin %12\'si)', 'Arap Dünyası Sinema ve Medya Liderliği', 'Tekstil & Mısır Pamuğu Üretimi'],
        en: ['Archaeological World Heritage Tourism', 'Suez Canal Transit Corridor (12% of global trade)', 'Arab Cinema & Drama Production Center', 'Egyptian Long-Staple Cotton Textiles'],
        de: ['Kulturtourismus & Archäologie', 'Sueskanal (12% des Welthandels)', 'Arabische Film- und Medienbranche', 'Ägyptische Baumwolle']
      }
    },
    economy: {
      paymentCulture: {
        tr: 'Lüks otellerde ve havalimanlarında kart geçerlidir; ancak taksilerde, tapınak girişlerinde ve sokak çarşılarında Mısır Lirası (EGP) nakit şarttır.',
        en: 'Credit cards accepted in major hotels; cash Egyptian Pounds (EGP) are essential for street taxis, tips, and markets.',
        de: 'Karten in Hotels akzeptiert; Bargeld (Ägyptische Pfund) für Taxis, Trinkgelder und Märkte unerlässlich.'
      },
      economicPillars: {
        tr: 'Süveyş Kanalı geçiş gelirleri, turizm, tarım, gurbetçi işçi dövizleri ve doğalgaz ihracatı.',
        en: 'Suez Canal tolls, tourism, agricultural exports, diaspora remittances, and natural gas.',
        de: 'Sueskanal-Einnahmen, Tourismus, Landwirtschaft und Erdgas.'
      },
      tippingCulture: {
        tr: 'Baksheesh (bahşiş) hayatın parçasıdır; restoranda %10-12, valiz taşıyana 20-50 EGP, rehbere günlük bahşiş beklenir.',
        en: 'Baksheesh is customary everywhere: 10-12% in restaurants; keep small notes handy for porters and drivers.',
        de: 'Bakschisch ist allgegenwärtig: 10-12% im Restaurant; Trinkgeld für Fahrer und Träger üblich.'
      }
    }
  },

  // Güney Kore
  KR: {
    culture: {
      etiquette: {
        tr: [
          'Bir şey verirken veya alırken mutlaka İKİ ELLE tutulur (saygının en önemli göstergesi).',
          'Büyüklerin yanında otururken veya içerken baş hafifçe yana çevrilir.',
          'Evlere ve geleneksel restoranlara girerken ayakkabılar çıkarılır.',
          'Toplu taşımada yaşlı koltuklarına (hamile/yaşlı alanı) asla oturulmaz.'
        ],
        en: [
          'Always use BOTH HANDS when giving or receiving money, gifts, or drinks.',
          'Turn your head away when drinking alcohol in front of elders as a sign of respect.',
          'Always take off your shoes when stepping onto raised wooden floors or into homes.',
          'Never sit in reserved seats for the elderly or pregnant on the subway, even if empty.'
        ],
        de: [
          'Gegenstände oder Geld immer mit BEIDEN HÄNDEN überreichen oder entgegennehmen.',
          'Schuhe vor dem Betreten von Wohnungen und traditionellen Lokalen ausziehen.',
          'Reservierte Sitze in der U-Bahn für Ältere immer freihalten.'
        ]
      },
      festivals: {
        tr: ['Chuseok (Kore Şükran Günü / Hasat Bayramı)', 'Seollal (Kore Ay Takvimi Yeni Yılı)', 'Boryeong Çamur Festivali', 'Busan Uluslararası Film Festivali (BIFF)'],
        en: ['Chuseok (Korean Harvest Thanksgiving)', 'Seollal (Lunar New Year)', 'Boryeong Mud Festival', 'Busan International Film Festival (BIFF)'],
        de: ['Chuseok (Erntedankfest)', 'Seollal (Mond-Neujahr)', 'Boryeong Schlammfestival', 'Busan Filmfestival']
      },
      lifestyle: {
        tr: '"Ppalli-Ppalli" (Hızlı hızlı / Dinamik yaşam), ileri teknoloji, K-Beauty cilt bakımı, 24 saat yaşayan canlı gece sokakları.',
        en: '"Ppalli-ppalli" (fast-paced efficiency), hyper-connectivity, K-beauty self-care, and vibrant 24/7 nightlife culture.',
        de: '"Ppalli-Ppalli" (Schnelligkeit & Effizienz), K-Beauty, Spitzentechnologie und 24/7 Nachtleben.'
      }
    },
    tourism: {
      mustSeePlaces: {
        tr: ['Gyeongbokgung Sarayı (Geleneksel Hanbok kıyafetiyle)', 'N Seul Kulesi & Myeongdong Alışveriş Caddesi', 'Bukchon Hanok Köyü', 'Busan Haeundae Sahili & Gamcheon Kültür Köyü', 'Jeju Volkanik Adası & Hallasan Dağı', 'DMZ (Kore Askerden Arındırılmış Bölgesi)'],
        en: ['Gyeongbokgung Royal Palace (wear a Hanbok)', 'N Seoul Tower & Myeongdong', 'Bukchon Hanok Traditional Village', 'Busan Haeundae Beach & Gamcheon Village', 'Jeju Volcanic Island & Hallasan', 'DMZ Korean Border Zone'],
        de: ['Gyeongbokgung-Palast (im Hanbok-Gewand)', 'N Seoul Tower & Myeongdong', 'Bukchon Hanok Dorf', 'Busan Haeundae Strand & Gamcheon', 'Jeju Vulkaninsel', 'DMZ Demarkationslinie']
      },
      bestSeasons: {
        tr: 'Eylül - Kasım (Sonbahar yaprakları) ve Nisan - Mayıs (Kiraz çiçekleri) en büyüleyici zamandır.',
        en: 'September - November (crisp autumn foliage) and April - May (cherry blossoms) are ideal.',
        de: 'September - November (Goldener Herbst) und April - Mai (Kirschblüte).'
      },
      travelStyleTip: {
        tr: 'T-money veya Climate Card kartı alın; KTX hızlı treni ile Seul’den Busan’a 2 saat 15 dakikada geçin.',
        en: 'Buy a T-money transit card; take the KTX bullet train from Seoul to Busan in just 2h 15m.',
        de: 'T-money-Karte für Nahverkehr nutzen; KTX-Schnellzug nach Busan.'
      }
    },
    religion: {
      primaryReligions: {
        tr: 'Dinsiz / Seküler (~%56), Protestan ve Katolik Hristiyan (~%28), Budist (~%15). Konfüçyüsçü ahlak kuralları toplumu derinden şekillendirir.',
        en: 'Non-religious (~56%), Christian (~28%, Protestant & Catholic), Buddhist (~15%). Confucian philosophy guides social morals.',
        de: 'Konfessionslos (~56%), Christen (~28%), Buddhisten (~15%). Konfuzianische Werte prägen die Gesellschaft.'
      },
      respectNorms: {
        tr: 'Budist tapınaklarında sessizlik korunmalı; keşişlere hafifçe eğilerek selam verilmelidir.',
        en: 'Bowing with hands together in Buddhist temples; respectful quiet on grounds.',
        de: 'Verbeugung mit zusammengelegten Händen in Tempeln.'
      },
      sacredSites: {
        tr: ['Bulguksa Tapınağı & Seokguram Mağarası (Gyeongju)', 'Jogyesa Tapınağı (Seul)', 'Haeinsa Tapınağı (Tripitaka Koreana ahşap blokları)'],
        en: ['Bulguksa Temple & Seokguram Grotto', 'Jogyesa Temple (Seoul)', 'Haeinsa Temple (Tripitaka Koreana wooden scriptures)'],
        de: ['Bulguksa-Tempel & Seokguram-Grotte', 'Jogyesa-Tempel (Seoul)', 'Haeinsa-Tempel']
      }
    },
    language: {
      officialLanguages: {
        tr: 'Korece (Hangul alfabesiyle yazılır - Kral Sejong tarafından 1443’te icat edilen dünyanın en bilimsel alfabesidir).',
        en: 'Korean (written in Hangul - scientifically created in 1443 by King Sejong).',
        de: 'Koreanisch (geschrieben in Hangul).'
      },
      englishProficiency: {
        tr: 'Seul metrosunda ve genç nüfus arasında iyi; çeviri uygulaması olarak Naver Papago mükemmel çalışır.',
        en: 'Good in Seoul transit and university areas; download Naver Papago for flawless translation.',
        de: 'Gut in U-Bahnen und bei Jüngeren; Papago-App empfohlen.'
      },
      phrases: [
        { phrase: 'Annyeonghaseyo (안녕하세요)', meaningTr: 'Merhaba', meaningEn: 'Hello', meaningDe: 'Guten Tag', pronunciation: 'ahn-nyong-hah-seh-yoh' },
        { phrase: 'Kamsahamnida (감사합니다)', meaningTr: 'Teşekkür ederim', meaningEn: 'Thank you', meaningDe: 'Vielen Dank', pronunciation: 'kahm-sah-hahm-nee-dah' },
        { phrase: 'Chwesonghamnida (죄송합니다)', meaningTr: 'Özür dilerim', meaningEn: 'I am sorry / Excuse me', meaningDe: 'Entschuldigung', pronunciation: 'chweh-song-hahm-nee-dah' },
        { phrase: 'Igeo eolmayeyo? (이거 얼마예요?)', meaningTr: 'Bu ne kadar?', meaningEn: 'How much is this?', meaningDe: 'Wie viel kostet das?', pronunciation: 'ee-gaw eol-mah-yeh-yoh' },
        { phrase: 'Gyesanseo juseyo (계산서 주세요)', meaningTr: 'Hesap lütfen', meaningEn: 'Check please', meaningDe: 'Rechnung bitte', pronunciation: 'kyeh-sahn-saw joo-seh-yoh' }
      ]
    },
    history: {
      conciseHistory: {
        tr: 'Joseon Hanedanlığı ve 5000 yıllık köklü tarih. 1950-53 Kore Savaşı yıkımından sonra mucizevi "Han Nehri Mucizesi" ile dünyanın en gelişmiş teknoloji ve kültür güçlerinden birine dönüştü.',
        en: 'From the Joseon Dynasty and ancient kingdoms to the Korean War division. Rebuilt through the "Miracle on the Han River" into a global democratic technology and pop-culture powerhouse.',
        de: 'Vom Königreich Joseon über den Koreakrieg bis zum "Wunder am Han-Fluss", das das Land zum globalen Tech- und Kulturpionier machte.'
      },
      milestones: {
        tr: ['1443: Hangul alfabesinin icadı', '1910-1945: Japon işgali dönemi', '1950-1953: Kore Savaşı & Ateşkes', '1988: Seul Olimpiyatları & Demokratikleşme'],
        en: ['1443: Hangul alphabet created', '1950-1953: Korean War & Armistice', '1988: Seoul Olympics', 'Modern: Global Hallyu Wave'],
        de: ['1443: Erfindung des Hangul-Alphabets', '1950-1953: Koreakrieg', '1988: Olympische Spiele Seoul', 'Heute: Globale Hallyu-Welle']
      }
    },
    gastronomy: {
      famousDishes: {
        tr: ['Kore Barbeküsü (Samgyeopsal & Bulgogi)', 'Kimchi (Fermente baharatlı lahana turşusu)', 'Bibimbap (Kızgın taş kasede sebzeli etli pirinç)', 'Korean Fried Chicken (Çıtır acılı tatlı tavuk)'],
        en: ['Korean BBQ (Samgyeopsal pork belly & Bulgogi beef)', 'Kimchi fermented cabbage', 'Hot Stone Bibimbap', 'Crispy Korean Fried Chicken (Chimaek)'],
        de: ['Koreanisches BBQ (Samgyeopsal & Bulgogi)', 'Traditionelles Kimchi', 'Bibimbap in der heißen Steinschale', 'Korean Fried Chicken']
      },
      traditionalDrinks: {
        tr: ['Soju (Pirinç içkisi - yeşil şişede)', 'Makgeolli (Köpüklü fermente pirinç şarabı)', 'Buzlu Americano ("Ah-Ah" - milli içecek)', 'Muzlu Süt & Arpa Çayı (Boricha)'],
        en: ['Soju distilled rice spirit in green bottles', 'Makgeolli sparkling cloudy rice wine', 'Iced Americano ("Ah-Ah")', 'Banana Milk & Roasted Barley Tea'],
        de: ['Soju (Reisschnaps)', 'Makgeolli (Reiswein)', 'Iced Americano', 'Gerstentee (Boricha)']
      },
      streetFoodAndDesserts: {
        tr: ['Tteokbokki (Acılı pirinç keki)', 'Bingsu (Sütlü buz tatlısı & meyveler)', 'Hotteok (Tarçınlı ballı sıcak krep)', 'Kimbap (Kore usulü deniz yosunlu pirinç rulosu)'],
        en: ['Spicy Tteokbokki rice cakes', 'Bingsu shaved milk snow dessert', 'Hotteok brown sugar cinnamon pancake', 'Gimbap seaweed rice rolls'],
        de: ['Tteokbokki Reiskuchen', 'Bingsu Schnee-Eis', 'Hotteok Pfannkuchen', 'Gimbap']
      }
    },
    achievements: {
      famousFigures: {
        tr: ['Kral Sejong (Hangul mucidi)', 'Bong Joon-ho (Oscar ödüllü Parazit yönetmeni)', 'BTS & BLACKPINK (Küresel Müzik İkonları)', 'Son Heung-min (Futbol yıldızı)', 'Ban Ki-moon (BM Genel Sekreteri)'],
        en: ['King Sejong the Great', 'Bong Joon-ho (Oscar-winning Parasite director)', 'BTS & BLACKPINK (Global pop phenomena)', 'Son Heung-min (Premier League icon)', 'Ban Ki-moon (UN Secretary General)'],
        de: ['König Sejong der Große', 'Bong Joon-ho (Parasite Regisseur)', 'BTS & BLACKPINK', 'Son Heung-min', 'Ban Ki-moon']
      },
      strongSectors: {
        tr: ['Yarı İletkenler & Hafıza Çipleri (Samsung, SK Hynix)', 'K-Pop, K-Drama & Sinema (Hallyu Dalgası)', 'Otomotiv (Hyundai, Kia)', 'Gemi İnşası & Batarya Teknolojileri'],
        en: ['Semiconductors & Memory Chips (Samsung, SK Hynix)', 'K-Pop, K-Drama & Entertainment (Hallyu Wave)', 'Automotive (Hyundai, Kia)', 'Electric Vehicle Batteries & Shipbuilding'],
        de: ['Halbleiter & Speicherchips (Samsung)', 'K-Pop & Entertainment (Hallyu-Welle)', 'Automobilindustrie (Hyundai, Kia)', 'Schiffbau & Akkutechnologie']
      }
    },
    economy: {
      paymentCulture: {
        tr: 'Dünyanın en nakitsiz ülkelerinden biri (%99 Kart ve Mobil Ödeme). Sokak tezgahlarında bile kart geçer.',
        en: 'Extremely cashless society; cards and mobile payments accepted universally.',
        de: 'Nahezu bargeldlos; Kartenzahlung selbst an Straßenständen üblich.'
      },
      economicPillars: {
        tr: 'Yüksek teknoloji üretimi, elektronik parçalar, otomotiv, gemi inşası ve kültürel içerik ihracatı.',
        en: 'High-tech manufacturing, semiconductors, cars, shipbuilding, and creative cultural exports.',
        de: 'Hightech-Industrie, Halbleiter, Elektronik, Schiffbau und Popkultur.'
      },
      tippingCulture: {
        tr: 'Bahşiş verilmez ve beklenmez. Fiyatlar her şey dahil nettir.',
        en: 'Tipping is not practiced and will likely be refused politely.',
        de: 'Trinkgeld ist unüblich und wird höflich abgelehnt.'
      }
    }
  }
};
