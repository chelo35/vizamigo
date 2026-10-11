import type { CountrySpecificHeritage } from './countryEncyclopediaLandmarks';

export const AFRICA_OCEANIA_HERITAGE: Record<string, CountrySpecificHeritage> = {
  // Güney Afrika
  ZA: {
    landmarks: {
      tr: ['Masa Dağı (Table Mountain & Cape Town Teleferiği)', 'Kruger Milli Parkı (Büyük Beşli Safari Cenneti)', 'Ümit Burnu (Cape of Good Hope & Penguen Boulders Sahili)', 'Blyde River Kanyonu (Dünyanın en yeşil kanyonu)', 'Robben Adası (Nelson Mandela’nın 18 yıl kaldığı cezaevi - UNESCO)'],
      en: ['Table Mountain & Cableway (Cape Town)', 'Kruger National Park (Big Five Safari Wonder)', 'Cape of Good Hope & Boulders Beach African Penguins', 'Blyde River Canyon (World’s greenest canyon)', 'Robben Island (Mandela’s Historic Prison UNESCO)'],
      de: ['Tafelberg (Kapstadt)', 'Kruger-Nationalpark (Big-Five-Safari)', 'Kap der Guten Hoffnung & Pinguinstrand Boulders Beach', 'Blyde River Canyon', 'Robben Island (UNESCO)']
    },
    figures: {
      tr: ['Nelson Mandela (Apartheid Karşıtı İkon ve İlk Demokratik Devlet Başkanı)', 'Desmond Tutu (Nobel Barış Ödüllü Başpiskopos - Gökkuşağı Ulusu Mimarı)', 'J.M. Coetzee & Nadine Gordimer (Nobel Edebiyat Ödüllü Yazarlar)', 'Elon Musk (Pretoria doğumlu Girişimci)', 'Siya Kolisi (Dünya Kupası Şampiyonu Ragbi Kaptanı)'],
      en: ['Nelson Mandela (Anti-Apartheid Icon & Nobel Laureate President)', 'Desmond Tutu (Archbishop & Nobel Peace Laureate)', 'Nadine Gordimer & J.M. Coetzee (Nobel Literature Laureates)', 'Elon Musk (Entrepreneur, born in Pretoria)', 'Siya Kolisi (World Cup Winning Rugby Captain)'],
      de: ['Nelson Mandela (Friedensnobelpreisträger)', 'Desmond Tutu (Erzbischof)', 'Nadine Gordimer (Nobelpreisträgerin)', 'Elon Musk (Unternehmer, geboren in Pretoria)', 'Siya Kolisi (Rugby-Kapitän)']
    },
    history: {
      concise: {
        tr: 'İnsanlığın Beşiği (Cradle of Humankind) fosillerine ev sahipliği yapan Güney Afrika, sömürge ve Apartheid ırk ayrımı rejimini yıkarak Nelson Mandela önderliğinde "Gökkuşağı Ulusu"nu kurmuştur.',
        en: 'Cradle of Humankind, South Africa dismantled the oppressive Apartheid regime under Nelson Mandela in 1994, emerging as a diverse G20 constitutional democracy.',
        de: 'Als Wiege der Menschheit überwand Südafrika 1994 das Apartheid-Regime unter Nelson Mandela und schuf die demokratische "Regenbogennation".'
      },
      milestones: {
        tr: ['1652: Jan van Riebeeck ve Cape Town Hollanda Kolonisi', '1994: İlk Çok Irklı Demokratik Seçimler ve Nelson Mandela’nın Zaferi', '2010: Afrika Kıtası’nda İlk Kez Düzenlenen FIFA Dünya Kupası'],
        en: ['1652: Dutch East India Company settles Cape Town', '1994: First non-racial democratic elections elect Nelson Mandela', '2010: First African nation to host the FIFA World Cup'],
        de: ['1652: Gründung Kapstadts', '1994: Erste freie Wahlen & Wahl von Nelson Mandela', '2010: Erste FIFA-Fußball-WM auf afrikanischem Boden']
      }
    },
    sacredSites: {
      tr: ['Aziz George Anglikan Katedrali (Cape Town - Halkın Katedrali)', 'İnsanlığın Beşiği Sterkfontein Mağaraları'],
      en: ['St. George’s Cathedral (Cape Town - The People’s Cathedral)', 'Cradle of Humankind Sterkfontein Caves'],
      de: ['St. George’s Cathedral (Kapstadt)', 'Sterkfontein-Höhlen (UNESCO)']
    },
    sectors: ['Platin, Altın ve Elmas Madenciliği (Dünya Lideri)', 'Otomotiv İmalatı (BMW, Mercedes, Toyota Afrika Üssü)', 'Şarapçılık (Cape Winelands)', 'Finansal Hizmetler ve Bankacılık']
  },

  // Kenya
  KE: {
    landmarks: {
      tr: ['Maasai Mara Ulusal Rezervi (Büyük Antilop Göçü)', 'Kenya Dağı Zirveleri (Afrika’nın İkinci En Yüksek Dağı - UNESCO)', 'Amboseli Milli Parkı & Kilimanjaro Dağı Manzaralı Filler', 'Nakuru Gölü Pembe Flamingo Kolonileri', 'Diani Sahili & Hint Okyanusu Beyaz Kumları'],
      en: ['Maasai Mara National Reserve (Great Wildebeest Migration)', 'Mount Kenya Peaks (Africa’s Second Highest Mountain UNESCO)', 'Amboseli National Park (Elephants under Kilimanjaro)', 'Lake Nakuru Flamingos', 'Diani Beach & Indian Ocean Turquoise Waters'],
      de: ['Maasai Mara Nationalreservat (Große Tierwanderung)', 'Mount-Kenya-Nationalpark (UNESCO)', 'Amboseli-Nationalpark mit Kilimandscharo-Blick', 'Nakurusee Flamingos', 'Diani Beach']
    },
    figures: {
      tr: ['Wangari Maathai (Afrika’nın İlk Nobel Barış Ödüllü Kadını - Yeşil Kuşak Hareketi)', 'Eliud Kipchoge (Maraton Efsanesi - Tarihin En Hızlı Koşucusu)', 'Jomo Kenyatta (Kenya’nın Kurucu Devlet Başkanı)'],
      en: ['Wangari Maathai (First African Female Nobel Peace Laureate)', 'Eliud Kipchoge (Marathon Legend - Sub-2 Hour Runner)', 'Jomo Kenyatta (Founding Father of Kenya)'],
      de: ['Wangari Maathai (Friedensnobelpreisträgerin)', 'Eliud Kipchoge (Marathon-Weltrekordler)', 'Jomo Kenyatta (Gründungsvater)']
    },
    history: {
      concise: {
        tr: 'Svahili kıyı ticaret medeniyetinden Mau Mau bağımsızlık mücadelesine uzanan Kenya, 1963’te bağımsız olmuş, Doğu Afrika’nın teknoloji (Silikon Savana) ve safari merkezidir.',
        en: 'From historic Swahili maritime routes to the Mau Mau rebellion, Kenya gained independence in 1963 and stands as East Africa’s financial and tech hub (Silicon Savannah).',
        de: 'Von der Swahili-Küste bis zum Mau-Mau-Aufstand erlangte Kenia 1963 die Unabhängigkeit und ist heute Ostafrikas führendes Wirtschafts- und Safari-Zentrum.'
      },
      milestones: {
        tr: ['1498: Vasco da Gama’nın Malindi’ye Ulaşması', '1963: Jomo Kenyatta Önderliğinde İngiltere’den Bağımsızlık', '2007: M-Pesa ile Dünyanın İlk Mobil Para Devrimi'],
        en: ['1498: Vasco da Gama lands at Malindi', '1963: Kenya achieves independence under Jomo Kenyatta', '2007: M-Pesa mobile money revolution launches in Kenya'],
        de: ['1498: Vasco da Gama erreicht Malindi', '1963: Unabhängigkeit Kenias unter Jomo Kenyatta', '2007: Start des mobilen Bezahlsystems M-Pesa']
      }
    },
    sacredSites: {
      tr: ['Fort Jesus & Mombasa Eski Kenti (UNESCO)', 'Gedi Tarihi Svahili Harabeleri'],
      en: ['Fort Jesus Mombasa (UNESCO)', 'Gedi Ancient Swahili Ruins'],
      de: ['Fort Jesus in Mombasa (UNESCO)', 'Ruinenstadt Gedi']
    },
    sectors: ['Yaban Hayatı Safari ve Eko-Turizm', 'Çay ve Kahve İhracatı (Siyah Çayda Dünya 1.si)', 'Kesme Çiçekçilik (Avrupa’nın Gül Tedarikçisi)', 'Mobil Fintech (M-Pesa Altyapısı)']
  },

  // Avustralya
  AU: {
    landmarks: {
      tr: ['Sidney Opera Binası & Liman Köprüsü (UNESCO Mimari İkonu)', 'Büyük Set Resifi (Great Barrier Reef - Uzaydan Görülebilen Canlı Resif)', 'Uluru Kutsal Kızıl Monoliti (Ayers Rock)', 'Büyük Okyanus Yolu & On İki Havari Kayaları', 'Daintree Yağmur Ormanları (Dünyanın en eski tropik ormanı)'],
      en: ['Sydney Opera House & Harbour Bridge (UNESCO Architectural Icon)', 'Great Barrier Reef (World’s largest coral reef system)', 'Uluru Sacred Red Monolith (Ayers Rock)', 'Great Ocean Road & Twelve Apostles', 'Daintree Rainforest (World’s oldest living rainforest)'],
      de: ['Sydney Opera House & Harbour Bridge', 'Great Barrier Reef (Größtes Korallenriff der Erde)', 'Uluru (Ayers Rock)', 'Great Ocean Road & Zwölf Apostel', 'Daintree-Regenwald']
    },
    figures: {
      tr: ['Steve Irwin (Timsah Avcısı - Doğa Koruma Kahramanı)', 'Cathy Freeman (Olimpiyat 400m Şampiyonu Aborjin Atlet)', 'Hugh Jackman & Nicole Kidman (Dünyaca Ünlü Hollywood Yıldızları)', 'Kylie Minogue (Pop Müzik İkonu)'],
      en: ['Steve Irwin (The Crocodile Hunter & Wildlife Conservationist)', 'Cathy Freeman (Historic Olympic Gold Medalist)', 'Hugh Jackman & Nicole Kidman (Celebrated Actors)', 'Kylie Minogue (Pop Music Princess)'],
      de: ['Steve Irwin (Krokodiljäger und Naturschützer)', 'Cathy Freeman (Olympiasiegerin)', 'Hugh Jackman & Nicole Kidman (Schauspieler)', 'Kylie Minogue (Sängerin)']
    },
    history: {
      concise: {
        tr: '65.000 yıllık dünyanın en eski kesintisiz Aborjin kültürüne ev sahipliği yapan Avustralya, 1788’deki First Fleet kolonizasyonunun ardından 1901’de federal bir demokrasi kurmuştur.',
        en: 'Home to Indigenous Australians for 65,000+ years, Australia federated into a sovereign Commonwealth in 1901, growing into a top global mining and education powerhouse.',
        de: 'Heimat der ältesten durchgehenden Kultur der Aborigines seit über 65.000 Jahren, schloss sich Australien 1901 zu einer modernen Föderation zusammen.'
      },
      milestones: {
        tr: ['1788: First Fleet ile Kaptan Arthur Phillip’in Sidney Koyu’na Çıkışı', '1901: Avustralya Topluluğu Federasyonu’nun Kuruluşu', '2008: Çalınan Kuşaklar İçin Tarihi Ulusal Özür'],
        en: ['1788: First Fleet arrives at Sydney Cove', '1901: Federation of the Commonwealth of Australia', '2008: Historic National Apology to the Stolen Generations'],
        de: ['1788: Ankunft der First Fleet in Sydney', '1901: Gründung des Commonwealth of Australia', '2008: Historische Entschuldigung bei den Ureinwohnern']
      }
    },
    sacredSites: {
      tr: ['Uluru & Kata Tjuta (Aborjin Anangu Halkının Kutsal Rüya Zamanı Mabedi)', 'Sidney Aziz Meryem Katedrali'],
      en: ['Uluru-Kata Tjuta Sacred Anangu Dreamtime Sanctuary', 'St. Mary’s Cathedral (Sydney)'],
      de: ['Uluru-Kata Tjuta (Heiligtum der Anangu)', 'St. Mary’s Cathedral (Sydney)']
    },
    sectors: ['Demir Cevheri, Kömür ve Lityum Madenciliği (Dünya Lideri)', 'Uluslararası Yükseköğretim ve Üniversite Eğitimi', 'Tarım, Sığır Eti ve Şarapçılık (Barossa Vadisi)', 'Yenilenebilir Yeşil Hidrojen ve Güneş Enerjisi']
  },

  // Yeni Zelanda
  NZ: {
    landmarks: {
      tr: ['Milford Sound Fiyordu & Mitre Zirvesi (Dünyanın 8. Harikası)', 'Hobbiton Film Seti & Matamata Zümrüt Tepeleri', 'Rotorua Jeotermal Gayzerleri & Maori Kültür Köyü', 'Aoraki / Mount Cook Dağı & Karanlık Gökyüzü Rezervi', 'Queenstown Macera ve Ekstrem Sporlar Başkenti'],
      en: ['Milford Sound Fjord & Mitre Peak (Eighth Wonder of the World)', 'Hobbiton Movie Set & Rolling Green Hills', 'Rotorua Geothermal Wonders & Te Puia Māori Village', 'Aoraki / Mount Cook & Dark Sky Reserve', 'Queenstown Global Adventure Capital'],
      de: ['Milford Sound & Mitre Peak', 'Hobbiton Filmset', 'Rotorua Geothermalgebiet & Māori-Kultur', 'Aoraki / Mount Cook', 'Queenstown Abenteuer-Hauptstadt']
    },
    figures: {
      tr: ['Sir Edmund Hillary (Everest Zirvesi’ne Çıkan İlk İnsan)', 'Ernest Rutherford (Atomun Çekirdeğini Keşfeden Nobel Fizik Ödüllü Bilim İnsanı)', 'Peter Jackson (Yüzüklerin Efendisi Yönetmeni)', 'Lord Rutherford (Bilim Dehası)', 'Jonah Lomu (Ragbi Efsanesi)'],
      en: ['Sir Edmund Hillary (First Mountaineer to summit Mount Everest)', 'Ernest Rutherford (Father of Nuclear Physics & Nobel Laureate)', 'Sir Peter Jackson (Director of The Lord of the Rings)', 'Jonah Lomu (Legendary All Blacks Rugby Icon)'],
      de: ['Sir Edmund Hillary (Erstbesteiger des Mount Everest)', 'Ernest Rutherford (Nobelpreisträger für Physik)', 'Peter Jackson (Regisseur von Herr der Ringe)', 'Jonah Lomu (Rugby-Legende)']
    },
    history: {
      concise: {
        tr: 'Büyük Polinezya kano göçleriyle Aotearoa’ya yerleşen Maori halkının yurdu olan Yeni Zelanda, 1840 Waitangi Antlaşması ile kurulmuş, 1893’te kadınlara oy hakkı tanıyan ilk ülke olmuştur.',
        en: 'Settled by Polynesian voyagers (Māori), New Zealand signed the Treaty of Waitangi in 1840 and led the world by granting women the right to vote in 1893.',
        de: 'Von Māori-Seefahrern besiedelt, unterzeichnete Neuseeland 1840 den Vertrag von Waitangi und führte 1893 weltweit als erstes Land das Frauenwahlrecht ein.'
      },
      milestones: {
        tr: ['c. 1300: Kupe Önderliğinde Polinezya Büyük Göçü ve Aotearoa’nın İskânı', '1840: Waitangi Antlaşması’nın İmzalanması', '1893: Dünyada Kadınlara Seçme Hakkı Tanıyan İlk Ülke Olması'],
        en: ['c. 1300: Polynesian arrival and Māori settlement of Aotearoa', '1840: Treaty of Waitangi signed between Māori chiefs and British Crown', '1893: First country in the world to enact universal women’s suffrage'],
        de: ['um 1300: Besiedlung durch die Māori', '1840: Vertrag von Waitangi', '1893: Erstes Land weltweit mit Frauenwahlrecht']
      }
    },
    sacredSites: {
      tr: ['Waitangi Antlaşma Alanı (Māori Kutsal Toprağı)', 'Christchurch Geçici Karton Katedrali (Deprem Sonrası Yenilikçi Mimari)'],
      en: ['Waitangi Treaty Grounds', 'Cardboard Cathedral (Christchurch)'],
      de: ['Waitangi Treaty Grounds', 'Cardboard Cathedral (Christchurch)']
    },
    sectors: ['Süt Ürünleri İhracatı (Fonterra - Dünya Lideri)', 'Macera ve Eko-Turizm', 'Şarapçılık (Sauvignon Blanc - Marlborough)', 'Kivi Meyvesi ve Manuka Balı Üretimi']
  }
};
