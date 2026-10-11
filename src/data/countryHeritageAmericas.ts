import type { CountrySpecificHeritage } from './countryEncyclopediaLandmarks';

export const AMERICAS_HERITAGE: Record<string, CountrySpecificHeritage> = {
  // Arjantin
  AR: {
    landmarks: {
      tr: ['Perito Moreno Buzulu (Patagonya Buz Kütlesi - UNESCO)', 'İguazú Şelaleleri (Şeytan Boğazı)', 'Buenos Aires La Boca & Caminito Renkli Evleri', 'Mendoza And Dağları Etekleri Şarap Vadisi', 'Ushuaia (Dünyanın Sonu Limanı & Beagle Kanalı)'],
      en: ['Perito Moreno Glacier (Patagonian Ice Giant UNESCO)', 'Iguazú Falls (Devil’s Throat)', 'La Boca & Caminito Colorful Street (Buenos Aires)', 'Mendoza Malbec Wine Valleys & Andes', 'Ushuaia (End of the World & Beagle Channel)'],
      de: ['Perito-Moreno-Gletscher (Patagonien)', 'Iguazú-Wasserfälle (Teufelsschlund)', 'La Boca & Caminito (Buenos Aires)', 'Mendoza Weintäler', 'Ushuaia (Ende der Welt)']
    },
    figures: {
      tr: ['Lionel Messi & Diego Maradona (Futbol Tarihinin İki Büyük Efsanesi)', 'Jorge Luis Borges (Evrensel Edebiyat Dehası - Fikirler)', 'Ernesto Che Guevara (Rosario doğumlu Devrimci)', 'Eva Perón (Evita - Halkın Sesi)', 'Pope Francis (Jorge Mario Bergoglio - Papa)'],
      en: ['Lionel Messi & Diego Maradona (Football Legends)', 'Jorge Luis Borges (Literary Titan)', 'Ernesto Che Guevara (Revolutionary born in Rosario)', 'Eva Perón (Evita - First Lady & Champion of Workers)', 'Pope Francis (First Pope from the Americas)'],
      de: ['Lionel Messi & Diego Maradona (Fußball-Ikonen)', 'Jorge Luis Borges (Schriftsteller)', 'Che Guevara', 'Eva Perón (Evita)', 'Papst Franziskus']
    },
    history: {
      concise: {
        tr: '1816 yılında bağımsızlığını kazanan Arjantin, tango müziği, edebiyatı, geniş pampa ovaları ve futbol efsaneleriyle Latin Amerika’nın kültür ve spor devidir.',
        en: 'Winning independence in 1816, Argentina blends European literary traditions, gaucho pampas heritage, tango music, and soccer greatness.',
        de: '1816 unabhängig geworden, vereint Argentinien europäische Kultur, Gaucho-Tradition in den Pampas, Tango und Fußball-Weltruhm.'
      },
      milestones: {
        tr: ['1816: Tucumán Kongresi ile İspanya’dan Bağımsızlık İlanı', '1946: Juan ve Eva Perón Dönemi ile Sosyal Dönüşüm', '1978, 1986 & 2022: Üç Kez FIFA Dünya Kupası Şampiyonluğu'],
        en: ['1816: Congress of Tucumán declares independence', '1946: Peronist era ushers in major social reforms', '1978, 1986 & 2022: Three-time FIFA World Cup Champion'],
        de: ['1816: Kongress von Tucumán erklärt Unabhängigkeit', '1946: Peronistische Ära', '1978, 1986 & 2022: Dreifacher Fußball-Weltmeister']
      }
    },
    sacredSites: {
      tr: ['Luján Meryem Ana Bazilikası (Arjantin’in Koruyucu Mabedi)', 'Buenos Aires Metropolitan Katedrali & San Martín Mozolesi'],
      en: ['Basilica of Our Lady of Luján (Patroness of Argentina)', 'Buenos Aires Metropolitan Cathedral'],
      de: ['Basilika Unserer Lieben Frau von Luján', 'Kathedrale von Buenos Aires']
    },
    sectors: ['Soya ve Mısır İhracatı (Dünya 3.sü)', 'Sığır Eti ve Hayvancılık (Dünyaca Meşhur Arjantin Bifteği)', 'Şarapçılık (Malbec Üzümü Dünya Başkenti)', 'Lityum ve Doğal Gaz (Vaca Muerta Sahası)']
  },

  // Kanada
  CA: {
    landmarks: {
      tr: ['Banff & Jasper Milli Parkları (Kayalık Dağlar - Zümrüt Louise Gölü)', 'Niagara Şelaleleri (Ontario)', 'Eski Québec Kenti Surları (UNESCO)', 'CN Kulesi (Toronto)', 'Vancouver Stanley Parkı & Pasifik Yağmur Ormanları'],
      en: ['Banff & Jasper National Parks (Canadian Rockies & Lake Louise)', 'Niagara Falls (Ontario)', 'Old Quebec Walled City (UNESCO)', 'CN Tower (Toronto)', 'Stanley Park & Pacific Rainforest (Vancouver)'],
      de: ['Banff- & Jasper-Nationalpark (Rocky Mountains)', 'Niagarafälle', 'Altstadt von Québec (UNESCO)', 'CN Tower Toronto', 'Stanley Park Vancouver']
    },
    figures: {
      tr: ['Alexander Graham Bell (Telefonun Mucidi - Nova Scotia)', 'Leonard Cohen (Efsanevi Müzisyen ve Şair)', 'Céline Dion (Dünyaca Ünlü Şarkıcı)', 'Terry Fox (Kanser Araştırmaları İçin Umut Koşusu Kahramanı)', 'Ryan Gosling (Aktör)'],
      en: ['Alexander Graham Bell (Inventor of Telephone)', 'Leonard Cohen (Iconic Singer-Songwriter & Poet)', 'Céline Dion (Vocal Powerhouse)', 'Terry Fox (Heroic Marathon of Hope Runner)', 'Ryan Gosling (Acclaimed Actor)'],
      de: ['Alexander Graham Bell (Erfinder des Telefons)', 'Leonard Cohen (Songwriter und Poet)', 'Céline Dion (Sängerin)', 'Terry Fox (Nationalheld)', 'Ryan Gosling (Schauspieler)']
    },
    history: {
      concise: {
        tr: 'İlk Uluslar (First Nations) ve İnuit halklarının yurdu olan Kanada, Fransız ve İngiliz kolonizasyonunun ardından 1867 Konfederasyonu ile birleşmiş, dünyanın en yaşanabilir çok kültürlü demokrasilerinden biri olmuştur.',
        en: 'Home to First Nations and Inuit peoples, Canada unified under the 1867 Confederation following French and British eras, growing into a leading G7 multicultural democracy.',
        de: 'Heimat der First Nations und Inuit, vereinte sich Kanada 1867 zur Föderation und gehört heute zu den wohlhabendsten Demokratien der Welt.'
      },
      milestones: {
        tr: ['1867: İngiliz Kuzey Amerika Yasası ve Kanada Konfederasyonu’nun Kuruluşu', '1885: Kanada Pasifik Demiryolu’nun (CPR) Tamamlanması', '1982: Anayasa Yasası ve Haklar Bildirgesi ile Tam Egemenlik'],
        en: ['1867: British North America Act creates Dominion of Canada', '1885: Transcontinental Canadian Pacific Railway completed', '1982: Constitution Act patriates sovereignty with Charter of Rights'],
        de: ['1867: Gründung der Kanadischen Konföderation', '1885: Vollendung der transkontinentalen Eisenbahn', '1982: Verfassungsakt bringt volle Souveränität']
      }
    },
    sacredSites: {
      tr: ['Notre-Dame Bazilikası (Montréal - Gotik Şaheser)', 'Aziz Joseph Mabedi (Montréal)'],
      en: ['Notre-Dame Basilica of Montreal', 'Saint Joseph’s Oratory of Mount Royal'],
      de: ['Notre-Dame de Montréal', 'St.-Josephs-Oratorium']
    },
    sectors: ['Petrol Kumları ve Doğal Gaz (Alberta)', 'Havacılık ve Uzay (Bombardier)', 'Bilişim, Yapay Zeka ve Video Oyun Sanayii', 'Akçaağaç Şurubu ve Tarım İhracatı']
  },

  // Amerika Birleşik Devletleri
  US: {
    landmarks: {
      tr: ['Büyük Kanyon (Grand Canyon - Arizona)', 'Yellowstone Milli Parkı & Gayzerleri (Dünyanın İlk Milli Parkı)', 'Özgürlük Heykeli & Manhattan Silüeti (New York)', 'Altın Kapı Köprüsü (Golden Gate - San Francisco)', 'Yosemite Milli Parkı & El Capitan Kayası'],
      en: ['Grand Canyon (Arizona)', 'Yellowstone National Park (World’s First National Park)', 'Statue of Liberty & Manhattan Skyline (New York)', 'Golden Gate Bridge (San Francisco)', 'Yosemite National Park & El Capitan'],
      de: ['Grand Canyon (Arizona)', 'Yellowstone-Nationalpark', 'Freiheitsstatue & Skyline von New York', 'Golden Gate Bridge (San Francisco)', 'Yosemite-Nationalpark']
    },
    figures: {
      tr: ['George Washington & Abraham Lincoln (Kurucu Başkanlar ve Birlik Önderleri)', 'Martin Luther King Jr. (Sivil Haklar Lideri)', 'Thomas Edison & Steve Jobs (İnovasyon ve Teknoloji Öncüleri)', 'Neil Armstrong (Ay’a ayak basan ilk insan)'],
      en: ['George Washington & Abraham Lincoln (Founding Presidents)', 'Martin Luther King Jr. (Civil Rights Movement Icon)', 'Thomas Edison & Steve Jobs (Technological Visionaries)', 'Neil Armstrong (First human on the Moon)'],
      de: ['George Washington & Abraham Lincoln', 'Martin Luther King Jr. (Bürgerrechtler)', 'Thomas Edison & Steve Jobs (Erfinder & Visionäre)', 'Neil Armstrong (Erster Mensch auf dem Mond)']
    },
    history: {
      concise: {
        tr: '1776 Bağımsızlık Bildirgesi ile kurulan ABD, Anayasa düzeni, sanayi devrimi ve teknolojik atılımlarla dünyanın lider ekonomik ve bilimsel süper gücü haline gelmiştir.',
        en: 'Founded with the 1776 Declaration of Independence, the United States rose through constitutional democracy, industrialization, and tech leadership to become the world’s leading economy.',
        de: 'Mit der Unabhängigkeitserklärung von 1776 gegründet, stiegen die USA durch Demokratie und Innovation zur führenden Wirtschaftsmacht der Welt auf.'
      },
      milestones: {
        tr: ['1776: Bağımsızlık Bildirgesi ve Amerikan Devrimi', '1861-1865: Amerikan İç Savaşı ve Köleliğin Kaldırılması', '1969: Apollo 11 ile Ay’a İlk İnsanlı İniş'],
        en: ['1776: Declaration of Independence adopted in Philadelphia', '1861-1865: American Civil War preserves Union & abolishes slavery', '1969: Apollo 11 lands first humans on the Moon'],
        de: ['1776: Amerikanische Unabhängigkeitserklärung', '1861-1865: Sezessionskrieg & Abschaffung der Sklaverei', '1969: Apollo 11 landet auf dem Mond']
      }
    },
    sacredSites: {
      tr: ['Aziz Patrick Katedrali (New York)', 'Washington Ulusal Katedrali'],
      en: ['St. Patrick’s Cathedral (New York)', 'Washington National Cathedral'],
      de: ['St. Patrick’s Cathedral (New York)', 'Washington National Cathedral']
    },
    sectors: ['Yüksek Teknoloji & Yapay Zeka (Silikon Vadisi)', 'Küresel Finans ve Sermaye Piyasaları (Wall Street)', 'Havacılık ve Uzay Sanayii (Boeing, SpaceX, NASA)', 'Sinema, Müzik ve Eğlence Endüstrisi (Hollywood)']
  },

  // Şili
  CL: {
    landmarks: {
      tr: ['Torres del Paine Milli Parkı (Patagonya Granit Kuleleri)', 'Atacama Çölü & Ay Vadisi (Dünyanın en kurak çölü ve yıldız gözlem üssü)', 'Paskalya Adası & Moai Dev Taş Heykelleri (Rapa Nui)', 'Valparaíso Renkli Tepeleri & Fünikülerleri', 'San Cristóbal Tepesi & And Dağları Silüeti (Santiago)'],
      en: ['Torres del Paine National Park (Patagonia Granite Horns)', 'Atacama Desert & Moon Valley (Premier Stargazing Hub)', 'Easter Island & Moai Monoliths (Rapa Nui UNESCO)', 'Valparaíso Funiculars & Street Art Hills', 'San Cristóbal Hill over Santiago & Andes'],
      de: ['Torres del Paine Nationalpark (Patagonien)', 'Atacama-Wüste & Mondtal', 'Osterinsel & Moai-Statuen (Rapa Nui)', 'Valparaíso bunte Hügel', 'Cerro San Cristóbal (Santiago)']
    },
    figures: {
      tr: ['Pablo Neruda (Nobel Edebiyat Ödüllü Şair - Yirmi Aşk Şiiri)', 'Gabriela Mistral (Latin Amerika’nın ilk Nobel ödüllü kadın yazarı)', 'Pedro Pascal (Dünyaca Ünlü Aktör)', 'Alexis Sánchez (Milli Futbol Yıldızı)'],
      en: ['Pablo Neruda (Nobel Laureate Poet)', 'Gabriela Mistral (First Latin American Nobel Literature Laureate)', 'Pedro Pascal (Hollywood Actor)', 'Alexis Sánchez (Football Star)'],
      de: ['Pablo Neruda (Nobelpreisträger)', 'Gabriela Mistral (Dichterin)', 'Pedro Pascal (Schauspieler)', 'Alexis Sánchez (Fußballstar)']
    },
    history: {
      concise: {
        tr: 'And Dağları ile Pasifik Okyanusu arasında 4.300 km boyunca uzanan Şili, Mapuçe direnişinin ardından 1818’de bağımsız olmuş, dünyanın en büyük bakır üreticisi ve en gelişmiş Latin Amerika ekonomilerindendir.',
        en: 'Stretching 4,300 km between the Andes and the Pacific, Chile won independence in 1818 and stands as Latin America’s top-ranked high-income economy.',
        de: 'Auf 4.300 km zwischen Anden und Pazifik erstreckt sich Chile, das 1818 unabhängig wurde und heute als das stabilste Wirtschaftsland Südamerikas gilt.'
      },
      milestones: {
        tr: ['1818: Bernardo O’Higgins önderliğinde Şili Bağımsızlık İlanı', '1879-1884: Pasifik Savaşı ve Atacama mineral zenginliklerinin katılımı', '1990: Demokrasiye Barışçıl Geçiş'],
        en: ['1818: Bernardo O’Higgins proclaims Chilean independence', '1879-1884: War of the Pacific secures mineral-rich northern territories', '1990: Peaceful transition back to democratic governance'],
        de: ['1818: Unabhängigkeit unter Bernardo O’Higgins', '1879-1884: Salpeterkrieg', '1990: Rückkehr zur Demokratie']
      }
    },
    sacredSites: {
      tr: ['Santiago Metropolitan Katedrali', 'Chiloé Ahşap Kiliseleri (UNESCO 18. yy Denizcilik Mimarisi)'],
      en: ['Santiago Metropolitan Cathedral', 'Churches of Chiloé (UNESCO Wooden Architecture)'],
      de: ['Kathedrale von Santiago', 'Holzkirchen von Chiloé (UNESCO)']
    },
    sectors: ['Bakır ve Lityum Madenciliği (Dünya Lideri)', 'Şarapçılık (Cabernet Sauvignon, Carménère)', 'Somon Yetiştiriciliği ve Balıkçılık', 'Taze Meyve İhracatı (Kiraz, Üzüm)']
  },

  // Kolombiya
  CO: {
    landmarks: {
      tr: ['Cartagena de Indias Surlarla Çevrili Tarihi Şehri (UNESCO)', 'Kahve Kültür Peyzajı (Eje Cafetero & Cocora Vadisi Balmumu Palmiyeleri)', 'Tayrona Milli Parkı & Karayip Yağmur Ormanı Plajları', 'Monserrate Tepesi & Altın Müzesi (Bogotá)', 'Medellín Comuna 13 & Teleferik Ağı'],
      en: ['Walled City of Cartagena de Indias (UNESCO)', 'Coffee Cultural Landscape (Cocora Valley Giant Wax Palms)', 'Tayrona National Park & Caribbean Jungle Beaches', 'Monserrate Sanctuary & Gold Museum (Bogotá)', 'Medellín Comuna 13 & Metrocable'],
      de: ['Festungsstadt Cartagena (UNESCO)', 'Kaffee-Kulturlandschaft (Cocora-Tal)', 'Tayrona-Nationalpark an der Karibik', 'Monserrate & Goldmuseum (Bogotá)', 'Medellín Comuna 13']
    },
    figures: {
      tr: ['Gabriel García Márquez (Nobel Edebiyat Ödüllü Yazar - Yüzyıllık Yalnızlık)', 'Fernando Botero (Heykeltıraş ve Ressam - Dolgun Figürler Sanatı)', 'Shakira (Latin Müziğinin Küresel Kraliçesi)', 'Radamel Falcao (Milli Futbol Yıldızı)'],
      en: ['Gabriel García Márquez (Nobel Laureate - One Hundred Years of Solitude)', 'Fernando Botero (World-renowned Painter & Sculptor)', 'Shakira (Global Music Icon)', 'Radamel Falcao (Football Striker)'],
      de: ['Gabriel García Márquez (Nobelpreisträger)', 'Fernando Botero (Bildhauer und Maler)', 'Shakira (Musikstar)', 'Radamel Falcao (Fußballstar)']
    },
    history: {
      concise: {
        tr: 'Muisca ve Tayrona gibi kadim uygarlıkların El Dorado efsanelerine ev sahipliği yapan Kolombiya, Simón Bolívar önderliğinde bağımsızlığını kazanmış, kahve ve biyolojik çeşitlilik cennetidir.',
        en: 'Birthplace of the El Dorado legend from ancient Muisca culture, Colombia was liberated by Simón Bolívar in 1819 and thrives as a megadiverse coffee leader.',
        de: 'Ursprung der El-Dorado-Legende, wurde Kolumbien 1819 von Simón Bolívar befreit und ist heute weltweit für Kaffee und Artenvielfalt berühmt.'
      },
      milestones: {
        tr: ['1819: Boyacá Muharebesi ve Simón Bolívar ile Büyük Kolombiya’nın Kuruluşu', '1886: Kolombiya Cumhuriyeti Anayasası', '2016: Tarihi Barış Anlaşması ve Küresel Turizm Rönesansı'],
        en: ['1819: Battle of Boyacá secures independence under Simón Bolívar', '1886: Republic of Colombia constitution established', '2016: Historic peace accord ushers in a global tourism revival'],
        de: ['1819: Schlacht von Boyacá unter Simón Bolívar', '1886: Verfassung der Republik Kolumbien', '2016: Historisches Friedensabkommen']
      }
    },
    sacredSites: {
      tr: ['Las Lajas Yeraltı Kanyon Mabedi (Ipiales - Dünyanın en güzel kiliselerinden)', 'Zipaquirá Tuz Katedrali (Yeraltı Kaya Tuzu Mabedi)'],
      en: ['Las Lajas Sanctuary (Dramatic canyon bridge church)', 'Salt Cathedral of Zipaquirá (Underground salt mine church)'],
      de: ['Santuario de Las Lajas (Schluchtenkirche)', 'Salzkathedrale von Zipaquirá']
    },
    sectors: ['Yüksek Kalite Arabica Kahve İhracatı (Dünya Lideri)', 'Zümrüt Madenciliği (Dünya Zümrüt Üretiminin %70’i)', 'Kesme Çiçek İhracatı (Özellikle Gül)', 'Petrol ve Kömür Üretimi']
  },

  // Peru
  PE: {
    landmarks: {
      tr: ['Machu Picchu İnka Kayıp Şehri & Kutsal Vadi (UNESCO)', 'Cusco Tarihi Başkenti & Sacsayhuamán Taş Duvarları', 'Titicaca Gölü & Uros Yüzen Sazlık Adaları', 'Nazca Çizgileri & Çöl Jeoglifleri', 'Colca Kanyonu & And Kondoru Uçuş Noktası'],
      en: ['Machu Picchu Lost City of the Incas & Sacred Valley (UNESCO)', 'Historic Sanctuary of Cusco & Sacsayhuamán Mega-Stones', 'Lake Titicaca & Floating Uros Reed Islands', 'Nazca Lines Desert Geoglyphs', 'Colca Canyon (Giant Andean Condor flight)'],
      de: ['Machu Picchu Inkastadt & Heiliges Tal (UNESCO)', 'Cusco & Festung Sacsayhuamán', 'Titicacasee & schwimmende Schilfinseln der Uros', 'Nazca-Linien', 'Colca-Canyon & Andenkondore']
    },
    figures: {
      tr: ['Mario Vargas Llosa (Nobel Edebiyat Ödüllü Yazar - Kent ve Köpekler)', 'Gastón Acurio (Peru Mutfağını Dünyaya Tanıtan Şef)', 'Yma Sumac (Efsanevi 5 Oktavlık Soprano)', 'Paolo Guerrero (Milli Futbol Kaptanı)'],
      en: ['Mario Vargas Llosa (Nobel Laureate Author)', 'Gastón Acurio (Chef who revolutionized Peruvian Gastronomy)', 'Yma Sumac (Legendary 5-octave Vocalist)', 'Paolo Guerrero (Football Icon)'],
      de: ['Mario Vargas Llosa (Nobelpreisträger)', 'Gastón Acurio (Spitzenkoch)', 'Yma Sumac (Sängerin)', 'Paolo Guerrero (Fußballstar)']
    },
    history: {
      concise: {
        tr: 'Caral ve Chavín gibi Amerika’nın en eski medeniyetlerine ve İnka İmparatorluğu’na ev sahipliği yapan Peru, 1821’de bağımsız olmuş, dünyanın gastronomi ve arkeoloji merkezidir.',
        en: 'Cradle of Caral and the mighty Inca Empire Tahuantinsuyo, Peru declared independence in 1821 and stands as a global culinary and archaeological capital.',
        de: 'Wiege des mächtigen Inka-Reiches und ältester Zivilisationen wie Caral, erlangte Peru 1821 die Unabhängigkeit und ist heute Weltzentrum der Gastronomie.'
      },
      milestones: {
        tr: ['1438: Pachacuti Önderliğinde İnka İmparatorluğu’nun Genişlemesi ve Machu Picchu’nun İnşası', '1532: Pizarro ve İspanyol Fethi; Lima’nın Krallar Şehri Olarak Kuruluşu', '1821: José de San Martín ile Peru Bağımsızlık İlanı'],
        en: ['1438: Inca Pachacuti expands empire & commissions Machu Picchu', '1532: Pizarro conquest and founding of Lima as City of Kings', '1821: General José de San Martín proclaims Peruvian independence'],
        de: ['1438: Blütezeit des Inka-Reiches unter Pachacútec', '1532: Spanische Eroberung durch Pizarro', '1821: Unabhängigkeitserklärung durch José de San Martín']
      }
    },
    sacredSites: {
      tr: ['Coricancha (Güneş Tapınağı - İnka ve Santo Domingo Kutsal Alanı)', 'Lima Katedrali & Santo Domingo Manastırı'],
      en: ['Coricancha (Golden Temple of the Sun in Cusco)', 'Cathedral of Lima & Basilica of Santo Domingo'],
      de: ['Coricancha (Sonnentempel in Cusco)', 'Kathedrale von Lima']
    },
    sectors: ['Madencilik (Bakır, Gümüş ve Çinko İhracatı)', 'Gastronomi ve Kültür Turizmi (Dünyanın En İyi Restoranları)', 'Tarım (Kinoa, Avokado ve Kuşkonmaz)', 'Tekstil (Alpaka ve Vikunya Yünü)']
  },

  // Uruguay
  UY: {
    landmarks: {
      tr: ['Punta del Este & Los Dedos (Kumsaldaki Parmaklar Heykeli)', 'Colonia del Sacramento Tarihi Portekiz Kenti (UNESCO)', 'Montevideo Rambla Kordonu & Bağımsızlık Meydanı', 'Cabo Polonio Kum Tepeleri & Deniz Aslanı Kolonisi'],
      en: ['Punta del Este & The Hand Sculpture (La Mano)', 'Colonia del Sacramento Historic Quarter (UNESCO)', 'Montevideo Rambla Coastline & Plaza Independencia', 'Cabo Polonio Dunes & Sea Lion Reserve'],
      de: ['Punta del Este & Hand-Skulptur (Los Dedos)', 'Colonia del Sacramento (UNESCO)', 'Montevideo Rambla & Plaza Independencia', 'Cabo Polonio Dünen']
    },
    figures: {
      tr: ['Eduardo Galeano (Yazar - Latin Amerika’nın Kesik Damarları)', 'Mario Benedetti (Şair ve Yazar)', 'Luis Suárez & Edinson Cavani (Milli Futbol Yıldızları)', 'José Mujica (Dünyanın En Mütevazı Devlet Başkanı Olarak Bilinen Lider)'],
      en: ['Eduardo Galeano (Author - Open Veins of Latin America)', 'Mario Benedetti (Acclaimed Poet & Novelist)', 'Luis Suárez (Football Legend)', 'José Mujica (Beloved Statesman and Philanthropist)'],
      de: ['Eduardo Galeano (Schriftsteller)', 'Mario Benedetti (Dichter)', 'Luis Suárez (Fußballstar)', 'José Mujica (ehemaliger Präsident)']
    },
    history: {
      concise: {
        tr: 'Rio de la Plata kıyısında İspanyol ve Portekiz mücadelelerinin ardından kurulan Uruguay, Latin Amerika’nın en yüksek yaşam kalitesine ve en güçlü demokratik kurumlarına sahiptir.',
        en: 'Born between Spanish and Portuguese struggles along the Río de la Plata, Uruguay established South America’s strongest democratic and secular welfare institutions.',
        de: 'Aus Konflikten zwischen Spanien und Portugal am Río de la Plata hervorgegangen, besitzt Uruguay die höchste Lebensqualität und stärkste Demokratie Südamerikas.'
      },
      milestones: {
        tr: ['1825: Otuz Üç Doğulu (Treinta y Tres Orientales) ve Bağımsızlık İlanı', '1930: İlk FIFA Dünya Kupası’na Ev Sahipliği Yapması ve Şampiyonluk', '2010+: Yenilenebilir Enerjide %95+ Oranına Ulaşan İlk Latin Ülkesi'],
        en: ['1825: Thirty-Three Orientals declare independence', '1930: Hosts and wins the first-ever FIFA World Cup in Montevideo', '2010+: Achieves 95%+ renewable electric grid'],
        de: ['1825: Unabhängigkeitserklärung der 33 Orientalen', '1930: Gastgeber und Sieger der ersten Fußball-Weltmeisterschaft', '2010+: Über 95% erneuerbare Energien im Stromnetz']
      }
    },
    sacredSites: {
      tr: ['Montevideo Metropolitan Katedrali', 'Colonia del Sacramento Kutsal Ayin Kilisesi'],
      en: ['Montevideo Metropolitan Cathedral', 'Basílica del Santísimo Sacramento in Colonia'],
      de: ['Kathedrale von Montevideo', 'Kirche des Allerheiligsten Sakraments (Colonia)']
    },
    sectors: ['Yazılım ve Teknoloji İhracatı (Kişi Başına Yazılım İhracatında Lider)', 'Sığır Eti ve Süt Ürünleri', 'Yenilenebilir Rüzgar ve Güneş Enerjisi', 'Finans ve Lojistik Hizmetleri']
  },

  // Ekvador
  EC: {
    landmarks: {
      tr: ['Galápagos Adaları & Dev Kaplumbağalar (Darwin’in Evrim Laboratuvarı)', 'Quito Tarihi Eski Şehir & San Francisco Meydanı (UNESCO)', 'Cotopaxi Yanardağı (Dünyanın en yüksek aktif stratovolkanlarından)', 'Dünyanın Ortası Anıtı (Mitad del Mundo - Ekvator Çizgisi)', 'Baños Şelaleler Yolu & Dünyanın Sonundaki Salıncak'],
      en: ['Galápagos Islands (Darwin’s Living Evolutionary Laboratory UNESCO)', 'Historic Center of Quito & San Francisco Plaza (UNESCO)', 'Cotopaxi Volcano (One of the highest active volcanoes)', 'Mitad del Mundo (Equator Monument)', 'Baños Waterfalls Route & Swing at the End of the World'],
      de: ['Galápagos-Inseln (UNESCO)', 'Altstadt von Quito (UNESCO)', 'Vulkan Cotopaxi', 'Mitad del Mundo (Äquator-Denkmal)', 'Baños Wasserfallstraße']
    },
    figures: {
      tr: ['Oswaldo Guayasamín (Dünyaca Ünlü Yerli Dışavurumcu Ressam)', 'Manuela Sáenz (Özgürlük Savaşçısı ve Simón Bolívar’ın Yoldaşı)', 'Richard Carapaz (Olimpiyat Şampiyonu ve Giro d’Italia Galibi Bisikletçi)'],
      en: ['Oswaldo Guayasamín (Master Indigenous Painter & Sculptor)', 'Manuela Sáenz (Heroine of South American Independence)', 'Richard Carapaz (Olympic Gold Medalist Cyclist)'],
      de: ['Oswaldo Guayasamín (Maler)', 'Manuela Sáenz (Freiheitskämpferin)', 'Richard Carapaz (Olympiasieger im Radsport)']
    },
    history: {
      concise: {
        tr: 'Adını Ekvator çizgisinden alan Ekvador, İnka ve İspanyol sömürge miraslarını barındıran Quito ile 1822’de bağımsız olmuş, dünyanın en zengin biyolojik çeşitlilik odaklarından biridir.',
        en: 'Named after the Equator, Ecuador was liberated at the Battle of Pichincha in 1822 and boasts the highest biodiversity per square kilometer on Earth.',
        de: 'Nach dem Äquator benannt, wurde Ecuador 1822 in der Schlacht am Pichincha befreit und weist die höchste Biodiversität pro Quadratkilometer weltweit auf.'
      },
      milestones: {
        tr: ['1822: Pichincha Muharebesi ile Bağımsızlık', '1835: Charles Darwin’in Galápagos Adaları Seferi ve Evrim Teorisinin Doğuşu', '2008: Dünyada Doğaya (Pachamama) Anayasal Hak Tanıyan İlk Ülke Olması'],
        en: ['1822: Battle of Pichincha liberates Quito', '1835: Charles Darwin visits Galápagos, inspiring Theory of Evolution', '2008: First nation to recognize Rights of Nature (Pachamama) in constitution'],
        de: ['1822: Schlacht am Pichincha sichert Unabhängigkeit', '1835: Charles Darwin besucht die Galápagos-Inseln', '2008: Erste Verfassung mit verankerten Rechten der Natur']
      }
    },
    sacredSites: {
      tr: ['La Compañía de Jesús Kilisesi (Quito - Tamamen Altın Varak Kaplı Barok)', 'San Francisco Manastırı'],
      en: ['Church of the Society of Jesus (Quito - Pure Gold Leaf Baroque)', 'Monastery of San Francisco'],
      de: ['La Compañía de Jesús (Quito - Goldene Barockkirche)', 'Franziskanerkloster']
    },
    sectors: ['Muz İhracatı (Dünyanın 1 Numaralı Muz İhracatçısı)', 'Karides ve Deniz Ürünleri Yetiştiriciliği', 'Gül ve Kesme Çiçekçilik', 'İnce Aromalı Kakao (Arriba Cacao) Üretimi']
  },

  // Panama
  PA: {
    landmarks: {
      tr: ['Panama Kanalı & Miraflores Havuzları (Dünya Mühendislik Harikası)', 'Casco Viejo Tarihi Sömürge Mahallesi (UNESCO)', 'San Blas Adaları (Guna Yala Yerli Özerk Karayip Cenneti)', 'Bocas del Toro Tropikal Takımadaları', 'Biomuseo (Frank Gehry Tasarımı Biyoçeşitlilik Müzesi)'],
      en: ['Panama Canal & Miraflores Locks (Engineering Wonder of the World)', 'Casco Viejo Historic Quarter (UNESCO)', 'San Blas Islands (Guna Yala Indigenous Archipelago)', 'Bocas del Toro Tropical Islands', 'Biomuseo (Frank Gehry Architecture)'],
      de: ['Panamakanal & Miraflores-Schleusen', 'Altstadt Casco Viejo (UNESCO)', 'San-Blas-Inseln (Guna Yala)', 'Bocas del Toro Inseln', 'Biomuseo von Frank Gehry']
    },
    figures: {
      tr: ['Rubén Blades (Grammy Ödüllü Salsa Efsanesi ve Besteci)', 'Mariano Rivera (New York Yankees Efsanesi - Beyzbol Onur Listesi)', 'Roberto Durán (Boks Efsanesi - "Taş Eller")'],
      en: ['Rubén Blades (Salsa Icon, Actor & Activist)', 'Mariano Rivera (Baseball Hall of Famer)', 'Roberto Durán (Boxing Legend - "Hands of Stone")'],
      de: ['Rubén Blades (Salsa-Legende und Schauspieler)', 'Mariano Rivera (Baseball-Star)', 'Roberto Durán (Boxlegende)']
    },
    history: {
      concise: {
        tr: 'İki okyanusu birbirine bağlayan stratejik kıstakta yer alan Panama, 1914’te açılan kanalı ve uluslararası ticaret filosu ile küresel denizciliğin kalbidir.',
        en: 'Bridging North and South America, Panama opened its transoceanic canal in 1914 and thrives as a premier international banking, logistics, and maritime hub.',
        de: 'An der Schnittstelle zweier Ozeane gelegen, eröffnete Panama 1914 den Kanal und ist heute führendes globales Schifffahrts- und Finanzzentrum.'
      },
      milestones: {
        tr: ['1513: Vasco Núñez de Balboa’nın Pasifik Okyanusu’nu Keşfi', '1903: Kolombiya’dan Bağımsızlık İlanı', '1914: Panama Kanalı’nın Hizmete Açılması', '1999: Kanalın Tam Denetiminin Panama Hükümetine Devredilmesi'],
        en: ['1513: Balboa crosses isthmus to sight Pacific Ocean', '1903: Independence from Colombia', '1914: Panama Canal officially opens to international commerce', '1999: Torrijos-Carter treaties return full canal sovereignty to Panama'],
        de: ['1513: Entdeckung des Pazifiks durch Balboa', '1903: Unabhängigkeit von Kolumbien', '1914: Eröffnung des Panamakanals', '1999: Vollständige Übergabe des Kanals an Panama']
      }
    },
    sacredSites: {
      tr: ['Panama Metropolitan Katedrali (Casco Antiguo)', 'San José Altın Altar Kilisesi (Korsan Morgan’dan kurtarılan altın sunak)'],
      en: ['Metropolitan Cathedral of Panama', 'Church of San José (Historic Golden Altar)'],
      de: ['Catedral Metropolitana de Panamá', 'Iglesia de San José (Goldaltar)']
    },
    sectors: ['Panama Kanalı Geçiş Ücretleri ve Lojistik Hizmetleri', 'Uluslararası Ticaret Gemisi Tescili (Dünya 1.si Bayrak)', 'Uluslararası Bankacılık ve Finans', 'Geisha Kahvesi Üretimi (Dünyanın En Pahalı Kahvesi)']
  }
};
