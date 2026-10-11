import { CuratedEntry } from './countryEncyclopedia';

export const CURATED_EXTRA: Record<string, CuratedEntry> = {
  // Almanya
  DE: {
    culture: {
      etiquette: {
        tr: [
          'Dakiklik son derece önemlidir; randevulara tam vaktinde veya 5 dakika önce gidilmelidir.',
          'Pazar günleri dinlenme günüdür (Ruhetag); süpermarketler kapalıdır, gürültü yapılmaz.',
          'Göz teması ve net bir el sıkışma standart selamlama biçimidir.',
          'Geri dönüşüm (Pfand sistemi) çok ciddiye alınır; şişeler iade otomatlarına verilir.'
        ],
        en: [
          'Punctuality is paramount; arrive exactly on time or 5 minutes early.',
          'Sundays are quiet rest days (Ruhetag); supermarkets and retail stores are closed.',
          'Firm handshakes and direct eye contact are standard greetings.',
          'Bottle deposit recycling (Pfand) is taken seriously; return bottles to machines.'
        ],
        de: [
          'Pünktlichkeit hat höchste Priorität; Termine minutengenau einhalten.',
          'Sonntagsruhe (Ruhetag); Geschäfte sind geschlossen, Lärm vermeiden.',
          'Fester Händedruck und direkter Blickkontakt gehören zum guten Ton.',
          'Pfandsystem konsequent nutzen; Pfandflaschen zurückgeben.'
        ]
      },
      festivals: {
        tr: ['Oktoberfest (Münih)', 'Berlinale Film Festivali', 'Noel Pazarları (Weihnachtsmarkt)', 'Köln Karnavalı'],
        en: ['Oktoberfest (Munich)', 'Berlinale International Film Festival', 'Christmas Markets (Weihnachtsmarkt)', 'Cologne Carnival'],
        de: ['Oktoberfest (München)', 'Berlinale Internationale Filmfestspiele', 'Weihnachtsmärkte', 'Kölner Karneval']
      },
      lifestyle: {
        tr: 'İş-yaşam dengesi, doğa yürüyüşleri, bisiklet kültürü ve açık hava bira bahçeleri (Biergarten).',
        en: 'Emphasis on work-life balance, cycling, outdoor hiking, and relaxed beer gardens.',
        de: 'Work-Life-Balance, Radfahren, Naturverbundenheit und Biergartenkultur.'
      }
    },
    tourism: {
      mustSeePlaces: {
        tr: ['Brandenburg Kapısı & Reichstag (Berlin)', 'Neuschwanstein Şatosu (Bavyera)', 'Köln Katedrali', 'Kara Ormanlar (Schwarzwald)', 'Rothenburg ob der Tauber'],
        en: ['Brandenburg Gate & Reichstag (Berlin)', 'Neuschwanstein Fairytale Castle', 'Cologne Cathedral', 'Black Forest (Schwarzwald)', 'Rothenburg ob der Tauber'],
        de: ['Brandenburger Tor & Reichstag (Berlin)', 'Schloss Neuschwanstein', 'Kölner Dom', 'Schwarzwald', 'Rothenburg ob der Tauber']
      },
      bestSeasons: {
        tr: 'Mayıs - Eylül sıcak günler için; Aralık ayı masalsı Noel pazarları için idealdir.',
        en: 'May - September for pleasant weather; December for festive Christmas markets.',
        de: 'Mai - September für mildes Wetter; Dezember für Weihnachtsmärkte.'
      },
      travelStyleTip: {
        tr: 'Deutschlandticket ile ülke genelindeki tüm bölgesel trenleri sınırsız kullanın.',
        en: 'Get a Deutschlandticket for unlimited regional trains across the country.',
        de: 'Deutschlandticket für unbegrenzte Regionalzugfahrten nutzen.'
      }
    },
    religion: {
      primaryReligions: {
        tr: 'Katolik ve Protestan (~%50 dengeli), Dinsiz / Seküler (~%42), Müslüman (~%6).',
        en: 'Christian (~50%, Catholic & Protestant), Non-religious (~42%), Muslim (~6%).',
        de: 'Christentum (~50%, katholisch und evangelisch), Konfessionslos (~42%), Islam (~6%).'
      },
      respectNorms: {
        tr: 'Kiliselerde sessizlik korunmalı, şapkalar çıkarılmalı ve ayin esnasında fotoğraf çekilmemelidir.',
        en: 'Maintain quiet in cathedrals; remove hats and avoid flash photography.',
        de: 'Ruhe in Kirchen bewahren; Kopfbedeckung abnehmen.'
      },
      sacredSites: {
        tr: ['Köln Katedrali', 'Aachen Katedrali', 'Frauenkirche (Dresden)', 'Ulm Minster'],
        en: ['Cologne Cathedral', 'Aachen Cathedral', 'Frauenkirche Dresden', 'Ulm Minster'],
        de: ['Kölner Dom', 'Aachener Dom', 'Frauenkirche Dresden', 'Ulmer Münster']
      }
    },
    language: {
      officialLanguages: {
        tr: 'Almanca (Deutsch). Büyük şehirlerde İngilizce mükemmel düzeydedir.',
        en: 'German (Deutsch). High English proficiency in urban hubs.',
        de: 'Deutsch. Sehr gute Englischkenntnisse in Städten.'
      },
      englishProficiency: {
        tr: 'Çok yüksek. Berlin ve Münih gibi metropollerde İngilizceyle rahatça yaşanabilir.',
        en: 'Very high across major hubs and youth.',
        de: 'Sehr hoch in Metropolen.'
      },
      phrases: [
        { phrase: 'Guten Tag / Hallo', meaningTr: 'İyi günler / Merhaba', meaningEn: 'Good day / Hello', meaningDe: 'Guten Tag / Hallo', pronunciation: 'goo-ten tahk' },
        { phrase: 'Danke schön', meaningTr: 'Çok teşekkürler', meaningEn: 'Thank you very much', meaningDe: 'Vielen Dank', pronunciation: 'dahn-keh shern' },
        { phrase: 'Bitte', meaningTr: 'Lütfen / Rica ederim', meaningEn: 'Please', meaningDe: 'Bitte', pronunciation: 'bee-teh' },
        { phrase: 'Wie viel kostet das?', meaningTr: 'Bu ne kadar?', meaningEn: 'How much is it?', meaningDe: 'Wie viel kostet das?', pronunciation: 'vee feel kos-tet dahs' },
        { phrase: 'Die Rechnung, bitte', meaningTr: 'Hesap lütfen', meaningEn: 'The check please', meaningDe: 'Zahlen, bitte', pronunciation: 'dee rekh-noong bee-teh' },
        { phrase: 'Hilfe!', meaningTr: 'İmdat!', meaningEn: 'Help!', meaningDe: 'Hilfe!', pronunciation: 'heel-feh' }
      ]
    },
    history: {
      conciseHistory: {
        tr: 'Kutsal Roma Cermen İmparatorluğu ve Prusya’dan 1871 Birlik Anlaşması’na. 1989’da Berlin Duvarı’nın yıkılışıyla yeniden birleşen AB’nin lokomotifi.',
        en: 'From the Holy Roman Empire to 1871 unification. Reunited in 1990 after the fall of the Berlin Wall to become the industrial powerhouse of Europe.',
        de: 'Vom Heiligen Römischen Reich über 1871 bis zur Wiedervereinigung 1990 nach dem Mauerfall.'
      },
      milestones: {
        tr: ['1871: Alman İmparatorluğu’nun kuruluşu', '1949: Federal ve Demokratik bölünme', '1989: Berlin Duvarı’nın Yıkılışı', '1990: Yeniden Birleşme'],
        en: ['1871: German Unification', '1949: Division into East & West', '1989: Fall of the Berlin Wall', '1990: Reunification'],
        de: ['1871: Reichsgründung', '1949: Teilung', '1989: Mauerfall', '1990: Wiedervereinigung']
      }
    },
    gastronomy: {
      famousDishes: {
        tr: ['Bratwurst & Berlin Currywurst', 'Sauerbraten (Marine dana kızartma)', 'Käsespätzle (Peynirli makarna)', 'Schnitzel mit Kartoffelsalat'],
        en: ['Bratwurst & Berlin Currywurst', 'Sauerbraten pot roast', 'Käsespätzle cheese noodles', 'Schnitzel with potato salad'],
        de: ['Bratwurst & Currywurst', 'Rheinischer Sauerbraten', 'Käsespätzle', 'Schnitzel mit Kartoffelsalat']
      },
      traditionalDrinks: {
        tr: ['Alman Birası (Saflık kanunlu)', 'Apfelschorle (Maden sulu elma suyu)', 'Glühwein (Noel sıcak şarabı)', 'Riesling Şarabı'],
        en: ['German Beer (Reinheitsgebot brewed)', 'Apfelschorle apple spritzer', 'Glühwein mulled wine', 'Mosel Riesling wine'],
        de: ['Deutsches Bier', 'Apfelschorle', 'Glühwein', 'Mosel-Riesling']
      },
      streetFoodAndDesserts: {
        tr: ['Schwarzwälder Kirschtorte (Kara Orman Pastası)', 'Pretzel (Brezel)', 'Berliner (Reçelli çörek)', 'Elmalı Strudel'],
        en: ['Black Forest Cake', 'Bavarian Pretzels (Brezel)', 'Berliner jam doughnut', 'Warm Apple Strudel'],
        de: ['Schwarzwälder Kirschtorte', 'Laugenbrezel', 'Berliner Pfannkuchen', 'Apfelstrudel']
      }
    },
    achievements: {
      famousFigures: {
        tr: ['Albert Einstein', 'Ludwig van Beethoven', 'Johann Wolfgang von Goethe', 'Karl Marx', 'Angela Merkel'],
        en: ['Albert Einstein (Physicist)', 'Ludwig van Beethoven (Composer)', 'Goethe (Writer)', 'Karl Marx', 'Angela Merkel'],
        de: ['Albert Einstein', 'Ludwig van Beethoven', 'Goethe', 'Immanuel Kant', 'Angela Merkel']
      },
      strongSectors: {
        tr: ['Otomotiv Mühendisliği (Porsche, BMW, Mercedes, VW)', 'Endüstriyel Makineler & Kimya', 'Yenilenebilir Enerji', 'Hassas Medikal Aletler'],
        en: ['Automotive Engineering (BMW, Mercedes, Porsche)', 'Machinery & Precision Tools', 'Renewable Energy', 'Medical Equipment'],
        de: ['Automobilbau (Mercedes, BMW, Porsche)', 'Maschinenbau', 'Erneuerbare Energien', 'Medizintechnik']
      }
    },
    economy: {
      paymentCulture: {
        tr: 'Nakit geleneksel olarak sevilse de temassız kart kabulü %85 seviyesindedir. Fırınlar için bozuk Euro bulundurun.',
        en: 'Card acceptance is high (~85%), though having a few Euro coins for bakeries and kiosks is wise.',
        de: 'Kartenzahlung weit verbreitet; Kleingeld für Bäckereien ratsam.'
      },
      economicPillars: {
        tr: 'Avrupa Birliği’nin en büyük, dünyanın 3. büyük ekonomisi; ihracat, mühendislik ve orta ölçekli Mittelstand şirketleri.',
        en: 'Europe’s largest economy; driven by world-class engineering, exports, and the renowned Mittelstand.',
        de: 'Größte Wirtschaft Europas; getragen vom industriellen Mittelstand und Export.'
      },
      tippingCulture: {
        tr: '%5-10 bahşiş verilir. Ödeme anında doğrudan yuvarlanır ("Stimmt so" - Üstü kalsın).',
        en: '5-10% tip is standard. Round up the amount verbally when paying ("Stimmt so").',
        de: '5-10% üblich; Betrag beim Bezahlen aufrunden ("Stimmt so").'
      }
    }
  },

  // Japonya
  JP: {
    culture: {
      etiquette: {
        tr: [
          'Saygı ifadesi olarak eğilerek selamlaşılır (Ojigi); tokalaşma ve fiziksel temas yaygın değildir.',
          'Evlere, geleneksel ryokan otellerine ve tapınaklara girerken ayakkabılar kesinlikle çıkarılır.',
          'Yürürken yemek yemek veya metroda sesli telefonla konuşmak kaba kabul edilir.',
          'Bahşiş vermek KESİNLİKLE kabul edilmez ve saygısızlık sayılır.'
        ],
        en: [
          'Bowing (Ojigi) is the customary sign of respect; physical contact is minimal.',
          'Always remove shoes when stepping into homes, temples, and traditional ryokans.',
          'Eating while walking or talking on the phone in trains is considered rude.',
          'Tipping is NEVER accepted; great service is expected as standard.'
        ],
        de: [
          'Verbeugung (Ojigi) zur Begrüßung; Körperkontakt unüblich.',
          'Schuhe vor dem Betreten von Wohnungen und Tempeln ausziehen.',
          'Essen im Gehen und Telefonieren im Zug gilt als unhöflich.',
          'Trinkgeld wird NICHT akzeptiert.'
        ]
      },
      festivals: {
        tr: ['Sakura Çiçek Açma Zamanı (Hanami)', 'Gion Matsuri (Kyoto)', 'Sapporo Kar Festivali', 'Nebuta Matsuri'],
        en: ['Cherry Blossom Viewing (Hanami)', 'Gion Matsuri (Kyoto)', 'Sapporo Snow Festival', 'Nebuta Matsuri'],
        de: ['Kirschblütenfest (Hanami)', 'Gion Matsuri', 'Sapporo Schneefestival', 'Nebuta Matsuri']
      },
      lifestyle: {
        tr: 'Omotenashi (kusursuz misafirperverlik), dakiklik, aşırı temizlik ve doğayla uyum.',
        en: 'Omotenashi (selfless hospitality), punctuality, cleanliness, and harmony with nature.',
        de: 'Omotenashi (Gastfreundschaft), Sauberkeit, Pünktlichkeit und Harmonie.'
      }
    },
    tourism: {
      mustSeePlaces: {
        tr: ['Fuji Dağı & Chureito Pagodası', 'Fushimi Inari Torii Kapıları (Kyoto)', 'Shibuya Geçidi & Shinjuku (Tokyo)', 'Arashiyama Bambu Ormanı', 'Hiroşima Barış Anıtı'],
        en: ['Mount Fuji & Chureito Pagoda', 'Fushimi Inari Torii Gates (Kyoto)', 'Shibuya Crossing (Tokyo)', 'Arashiyama Bamboo Grove', 'Hiroshima Peace Memorial'],
        de: ['Mount Fuji', 'Fushimi Inari Schrein (Kyoto)', 'Shibuya Crossing (Tokio)', 'Arashiyama Bambuswald', 'Hiroshima Friedensdenkmal']
      },
      bestSeasons: {
        tr: 'Mart sonu - Mayıs (Sakura) ve Ekim - Kasım (Kırmızı yapraklar Koyo) en büyüleyici zamandır.',
        en: 'Late March - May (Cherry blossoms) and October - November (Autumn foliage) are ideal.',
        de: 'März - Mai (Kirschblüte) und Oktober - November (Herbstlaub).'
      },
      travelStyleTip: {
        tr: 'Telefona dijital Suica/Pasmo kartı yükleyin; tüm tren ve otobüslerde dokunup geçin.',
        en: 'Add digital Suica/Pasmo card to Apple/Google Wallet for seamless train rides.',
        de: 'Digitale Suica/Pasmo-Karte für alle Züge und Busse nutzen.'
      }
    },
    religion: {
      primaryReligions: {
        tr: 'Şintoizm (~%48) ve Budizm (~%46) senkretik bir uyumla bir arada yaşanır.',
        en: 'Shinto (~48%) and Buddhism (~46%) practiced syncretically together.',
        de: 'Shintoismus (~48%) und Buddhismus (~46%) verschmelzen im Alltag.'
      },
      respectNorms: {
        tr: 'Mabetlere girmeden Temizuya çeşmesinde eller ve ağız yıkanır; iki kez eğilinip iki kez alkış tutulur.',
        en: 'Purify hands and mouth at Temizuya water basin before entering shrines.',
        de: 'Hände und Mund am Wasserbecken (Temizuya) reinigen.'
      },
      sacredSites: {
        tr: ['Senso-ji Tapınağı (Tokyo)', 'Kinkaku-ji Altın Köşk (Kyoto)', 'Itsukushima Yüzen Torii Kapısı (Miyajima)', 'Todai-ji Büyük Buda (Nara)'],
        en: ['Senso-ji Temple (Tokyo)', 'Kinkaku-ji Golden Pavilion (Kyoto)', 'Itsukushima Floating Gate', 'Todai-ji Giant Buddha (Nara)'],
        de: ['Sensō-ji (Tokio)', 'Kinkaku-ji Goldener Pavillon (Kyoto)', 'Itsukushima Schrein', 'Tōdai-ji Buddha (Nara)']
      }
    },
    language: {
      officialLanguages: {
        tr: 'Japonca (Nihongo). İstasyonlarda İngilizce tabelalar bulunur.',
        en: 'Japanese. Train stations have clear English signage.',
        de: 'Japanisch. Bahnhöfe sind englisch beschildert.'
      },
      englishProficiency: {
        tr: 'Orta-düşük; ancak insanlar son derece yardımseverdir ve çeviri uygulamaları harika çalışır.',
        en: 'Modest, but locals are exceedingly polite and helpful; translate apps work great.',
        de: 'Eher gering, aber die Menschen sind außerordentlich hilfsbereit.'
      },
      phrases: [
        { phrase: 'Konnichiwa (こんにちは)', meaningTr: 'Merhaba', meaningEn: 'Hello', meaningDe: 'Guten Tag', pronunciation: 'kon-nee-chee-wah' },
        { phrase: 'Arigatou gozaimasu (ありがとうございます)', meaningTr: 'Çok teşekkür ederim', meaningEn: 'Thank you very much', meaningDe: 'Vielen Dank', pronunciation: 'ah-ree-gah-toh go-zah-ee-mahs' },
        { phrase: 'Sumimasen (すみません)', meaningTr: 'Afedersiniz / Özür dilerim', meaningEn: 'Excuse me', meaningDe: 'Entschuldigung', pronunciation: 'soo-mee-mah-sen' },
        { phrase: 'Kore wa ikura desu ka? (これはいくらですか？)', meaningTr: 'Bu ne kadar?', meaningEn: 'How much is this?', meaningDe: 'Wie viel kostet das?', pronunciation: 'ko-reh wah ee-koo-rah des kah' },
        { phrase: 'Okaikei onegaishimasu (お会計お願いします)', meaningTr: 'Hesap lütfen', meaningEn: 'Check please', meaningDe: 'Die Rechnung, bitte', pronunciation: 'oh-kai-kay oh-neh-gai-shee-mahs' }
      ]
    },
    history: {
      conciseHistory: {
        tr: 'Samuray ve Şogunluk çağından Meiji Restorasyonu ile modernleşen ada ülkesi. 2. Dünya Savaşı sonrası teknoloji ve pop kültür devine dönüştü.',
        en: 'From samurai and shoguns to Meiji modernization. Rebuilt into a global technological and pop-culture giant.',
        de: 'Von der Ära der Samurai und Shogune über die Meiji-Zeit zum High-Tech- und Popkultur-Giganten.'
      },
      milestones: {
        tr: ['1603: Edo dönemi & Şogunluk', '1868: Meiji Restorasyonu', '1964: Tokyo Olimpiyatları & Shinkansen', '2000+: Küresel Pop Kültür & Anime'],
        en: ['1603: Edo Period', '1868: Meiji Modernization', '1964: Tokyo Olympics & Shinkansen', '2000+: Global Anime Era'],
        de: ['1603: Edo-Zeit', '1868: Meiji-Restauration', '1964: Shinkansen-Premiere', '2000+: Anime-Boom']
      }
    },
    gastronomy: {
      famousDishes: {
        tr: ['Otantik Nigiri Suşi & Saşimi', 'Japon Rameni (Tonkotsu & Miso)', 'Wagyu & Kobe Bifteği', 'Tempura (Çıtır deniz ürünleri)'],
        en: ['Authentic Nigiri Sushi & Sashimi', 'Ramen noodles (Tonkotsu, Miso)', 'A5 Wagyu & Kobe Beef', 'Seafood & vegetable Tempura'],
        de: ['Authentisches Sushi & Sashimi', 'Ramen-Suppen', 'Wagyu- & Kobe-Rindfleisch', 'Tempura']
      },
      traditionalDrinks: {
        tr: ['Yeşil Çay (Matcha & Sencha)', 'Sake (Pirinç şarabı)', 'Japon Viskisi (Yamazaki)', 'Umeshu (Erik likörü)'],
        en: ['Ceremonial Matcha & Green Tea', 'Sake (Nihonshu rice wine)', 'Award-winning Japanese Whisky', 'Umeshu plum liqueur'],
        de: ['Matcha & Sencha Grüntee', 'Sake Reiswein', 'Japanischer Whisky', 'Umeshu Pflaumenwein']
      },
      streetFoodAndDesserts: {
        tr: ['Takoyaki (Ahtapot topları)', 'Okonomiyaki (Japon krep)', 'Mochi & Daifuku', 'Taiyaki (Balık şeklinde waffle)'],
        en: ['Takoyaki octopus balls', 'Okonomiyaki cabbage pancake', 'Mochi rice cakes', 'Taiyaki fish-shaped waffle'],
        de: ['Takoyaki Oktopusbällchen', 'Okonomiyaki Pfannkuchen', 'Mochi', 'Taiyaki Waffeln']
      }
    },
    achievements: {
      famousFigures: {
        tr: ['Hayao Miyazaki (Studio Ghibli)', 'Haruki Murakami (Yazar)', 'Akira Kurosawa (Yönetmen)', 'Hideo Kojima (Oyun dehası)', 'Shohei Ohtani (Beyzbol)'],
        en: ['Hayao Miyazaki (Studio Ghibli)', 'Haruki Murakami (Author)', 'Akira Kurosawa (Director)', 'Hideo Kojima', 'Shohei Ohtani'],
        de: ['Hayao Miyazaki', 'Haruki Murakami', 'Akira Kurosawa', 'Hideo Kojima', 'Shohei Ohtani']
      },
      strongSectors: {
        tr: ['Robotik ve Yarı İletkenler', 'Otomotiv (Toyota, Honda, Nissan)', 'Anime, Manga ve Video Oyunları (Nintendo, Sony)', 'Yüksek Hızlı Demiryolları (Shinkansen)'],
        en: ['Robotics & Semiconductors', 'Automotive (Toyota, Honda)', 'Gaming & Anime (Sony, Nintendo)', 'High-Speed Rail Networks'],
        de: ['Robotik & Halbleiter', 'Automobilbau (Toyota, Honda)', 'Gaming & Anime (Sony, Nintendo)', 'Shinkansen-Bahntechnologie']
      }
    },
    economy: {
      paymentCulture: {
        tr: 'Tapınaklarda, otomatlarda ve küçük ramen mekanlarında nakit Yen veya Suica kartı gerekir.',
        en: 'Cards accepted in malls; cash Yen or IC cards (Suica) essential for ramen ticket machines and shrines.',
        de: 'Große Geschäfte nehmen Karten; für Automaten und Ramen-Lokale sind Yen oder Suica nötig.'
      },
      economicPillars: {
        tr: 'İleri imalat, elektronik, otomotiv ihracatı ve küresel finans.',
        en: 'Advanced robotics, electronics, automotive exports, and finance.',
        de: 'Spitzentechnologie, Fahrzeugexport und Finanzwesen.'
      },
      tippingCulture: {
        tr: 'Bahşiş verilmez. Masa üzerine para bırakırsanız unuttunuz sanarak arkanızdan koşup parayı iade ederler.',
        en: 'Strictly zero tipping. Staff may run after you thinking you left change behind.',
        de: 'Kein Trinkgeld. Kellner bringen vergessenes Geld zurück.'
      }
    }
  },

  // Yunanistan
  GR: {
    culture: {
      etiquette: {
        tr: [
          '"Filoksenia" (Yabancıya sevgi ve misafirperverlik) köklü bir Antik Yunan geleneğidir.',
          'Yemekler paylaşılmak üzere ortaya söylenir; acele edilmez, saatlerce masada oturulur.',
          'Avuç içini karşıya doğru göstermek (Moutza) hakaret sayılır, yapılmamalıdır.',
          'Manastırlarda ve kiliselerde omuz ve dizler örtülü olmalıdır.'
        ],
        en: [
          '"Philoxenia" (love of strangers and deep hospitality) dates back to ancient times.',
          'Meze dishes are ordered for the whole table to share unhurriedly.',
          'Showing an open palm towards someone’s face (Moutza) is an offensive gesture.',
          'Shoulders and knees must be covered in Orthodox monasteries like Meteora.'
        ],
        de: [
          '"Philoxenia" (Gastfreundschaft) ist eine uralte Tradition.',
          'Meze-Gerichte werden zum Teilen für den ganzen Tisch bestellt.',
          'Die geöffnete Handfläche jemandem entgegenstrecken ("Moutza") gilt als beleidigend.',
          'Schultern und Knie in Klöstern (wie Meteora) bedecken.'
        ]
      },
      festivals: {
        tr: ['Ortodoks Paskalyası (Pascha - Korfu havai fişekleri)', 'Atina & Epidaurus Antik Tiyatro Festivali', 'Apokries Karnavalı (Patras)'],
        en: ['Orthodox Easter (Pascha fireworks in Corfu)', 'Athens & Epidaurus Ancient Theatre Festival', 'Patras Carnival (Apokries)'],
        de: ['Orthodoxes Osterfest (Korfu)', 'Athen & Epidaurus Festival', 'Karneval von Patras']
      },
      lifestyle: {
        tr: 'Akdeniz güneşi, ada rahatlığı, açık hava tavernaları ve geç saatlerde başlayan akşam yemekleri.',
        en: 'Sun-drenched Aegean lifestyle, relaxed island pace, lively tavernas, and late dinners.',
        de: 'Ägäisches Lebensgefühl, Inselruhe, Tavernen und spätes Essen unter freiem Himmel.'
      }
    },
    tourism: {
      mustSeePlaces: {
        tr: ['Akropolis & Parthenon (Atina)', 'Santorini Kalderası & Oia Günbatımı', 'Meteora Havada Asılı Manastırlar', 'Girit Knossos Sarayı & Elafonisi', 'Rodos & Mikonos Adaları', 'Delfi Antik Kehanet Merkezi'],
        en: ['Acropolis & Parthenon (Athens)', 'Santorini Caldera & Oia Sunset', 'Meteora Hanging Monasteries', 'Crete Knossos Palace & Elafonisi', 'Rhodes & Mykonos Islands', 'Ancient Delphi'],
        de: ['Akropolis & Parthenon (Athen)', 'Santorini Caldera & Oia', 'Meteora-Felsenklöster', 'Kreta Knossos & Elafonisi', 'Rhodos & Mykonos', 'Antikes Delphi']
      },
      bestSeasons: {
        tr: 'Mayıs - Haziran ve Eylül - Ekim adalar ve antik kentler için en güzel dönemdir. Temmuz-Ağustos sahiller canlıdır.',
        en: 'May - June and September - October for sightseeing and islands; peak summer is lively but hot.',
        de: 'Mai - Juni und September - Oktober ideal; Hochsommer lebhaft, aber heiß.'
      },
      travelStyleTip: {
        tr: 'Adalar arasında feribotla seyahat edin (Blue Star Ferries / Seajets); biletleri yoğun sezonda önceden ayırtın.',
        en: 'Island-hop using modern ferries; book summer island ferry tickets in advance.',
        de: 'Inselhüpfen mit Fähren; Tickets für den Sommer vorab buchen.'
      }
    },
    religion: {
      primaryReligions: {
        tr: 'Yunan Ortodoks Hristiyan (~%90, anayasal milli din), Dinsiz (~%6), Müslüman (~%2, Batı Trakya).',
        en: 'Greek Orthodox Christian (~90%), Non-religious (~6%), Muslim (~2%, Western Thrace).',
        de: 'Griechisch-Orthodox (~90%), Konfessionslos (~6%), Muslime (~2%).'
      },
      respectNorms: {
        tr: 'Kiliselerde kadınlar için girişte etek/şal bulunur; ikonalar öpülürken saygı gösterilir.',
        en: 'Wraps provided at monastery gates for women; quiet reverence before icons.',
        de: 'Tücher für Frauen an Klostereingängen vorhanden; andächtiges Verhalten.'
      },
      sacredSites: {
        tr: ['Meteora Manastırları', 'Aynoroz Dağı (Athos Yarımadası)', 'Hosios Loukas Manastırı', 'Tinos Meryem Ana Kilisesi'],
        en: ['Meteora Monasteries', 'Mount Athos Sacred Monastic Republic', 'Hosios Loukas Monastery', 'Panagia Evangelistria (Tinos)'],
        de: ['Meteora-Klöster', 'Mönchsrepublik Berg Athos', 'Kloster Hosios Loukas', 'Panagia Evangelistria (Tinos)']
      }
    },
    language: {
      officialLanguages: {
        tr: 'Yunanca (Ellinika - Antik Yunan alfabesiyle yazılır). Turizmde İngilizce çok yaygındır.',
        en: 'Greek (Ellinika - Greek alphabet). English is widely spoken in tourism.',
        de: 'Griechisch (griechisches Alphabet). Englisch im Tourismus weit verbreitet.'
      },
      englishProficiency: {
        tr: 'Yüksek. Adalarda ve otellerde herkes akıcı İngilizce konuşur.',
        en: 'High across tourist hubs and younger demographics.',
        de: 'Sehr gut auf den Inseln und in Hotels.'
      },
      phrases: [
        { phrase: 'Kalimera (Καλημέρα)', meaningTr: 'Günaydın / Merhaba', meaningEn: 'Good morning / Hello', meaningDe: 'Guten Morgen / Hallo', pronunciation: 'kah-lee-meh-rah' },
        { phrase: 'Efharisto (Ευχαριστώ)', meaningTr: 'Teşekkür ederim', meaningEn: 'Thank you', meaningDe: 'Danke', pronunciation: 'ef-khah-ree-stoh' },
        { phrase: 'Parakalo (Παρακαλώ)', meaningTr: 'Lütfen / Rica ederim', meaningEn: 'Please / You are welcome', meaningDe: 'Bitte', pronunciation: 'pah-rah-kah-loh' },
        { phrase: 'Poso kani? (Πόσο κάνει;)', meaningTr: 'Bu ne kadar?', meaningEn: 'How much does it cost?', meaningDe: 'Wie viel kostet das?', pronunciation: 'poh-soh kah-nee' },
        { phrase: 'Ton logariasmo, parakalo', meaningTr: 'Hesap lütfen', meaningEn: 'The check please', meaningDe: 'Die Rechnung, bitte', pronunciation: 'ton loh-gah-ryahs-moh pah-rah-kah-loh' },
        { phrase: 'Voithia! (Βοήθεια!)', meaningTr: 'İmdat / Yardım!', meaningEn: 'Help!', meaningDe: 'Hilfe!', pronunciation: 'voh-ee-thee-ah' }
      ]
    },
    history: {
      conciseHistory: {
        tr: 'Demokrasinin, Batı felsefesinin ve Olimpiyat Oyunları’nın doğduğu topraklar. Sokrates, Platon ve Büyük İskender’den Bizans ve Osmanlı mirasına uzanan Akdeniz beşiği.',
        en: 'Birthplace of democracy, Western philosophy, and the Olympic Games. From Socrates and Alexander the Great through Byzantine civilization to modern European statehood.',
        de: 'Wiege der Demokratie, Philosophie und der Olympischen Spiele. Von Sokrates und Alexander dem Großen über Byzanz bis zur modernen Republik.'
      },
      milestones: {
        tr: ['MÖ 508: Atina demokrasisinin kuruluşu', 'MÖ 776: İlk Olimpiyat Oyunları', '1821: Bağımsızlık Savaşı', '1981: Avrupa Birliği üyeliği'],
        en: ['508 BC: Athenian Democracy born', '776 BC: First Olympic Games', '1821: Greek War of Independence', '1981: EU Accession'],
        de: ['508 v. Chr.: Entstehung der Demokratie', '776 v. Chr.: Erste Olympische Spiele', '1821: Unabhängigkeitskrieg', '1981: EU-Beitritt']
      }
    },
    gastronomy: {
      famousDishes: {
        tr: ['Otantik Musakka (Moussaka)', 'Souvlaki & Gyros (Pita ekmeğinde)', 'Yunan Salatası (Köy peyniri Feta & zeytin)', 'Tzatziki (Sarımsaklı cacık)'],
        en: ['Authentic baked Moussaka', 'Pita Souvlaki & Gyros with tzatziki', 'Traditional Greek Salad (Horiatiki with Feta)', 'Tzatziki with extra virgin olive oil'],
        de: ['Traditionelles Moussaka', 'Gyros & Souvlaki im Pita-Brot', 'Griechischer Bauernsalat mit Feta', 'Tzatziki']
      },
      traditionalDrinks: {
        tr: ['Uzo (Ouzo - Buzlu anasonlu içki)', 'Frappé & Freddo Espresso', 'Retsina Şarabı & Tsipouro', 'Yunan Dağ Çayı (Tsai tou vounou)'],
        en: ['Ouzo with ice and water', 'Iced Frappé and Freddo Espresso', 'Retsina resinated wine and Tsipouro', 'Greek Mountain Herbal Tea'],
        de: ['Ouzo auf Eis', 'Frappé & Freddo Espresso', 'Retsina & Tsipouro', 'Griechischer Bergtee']
      },
      streetFoodAndDesserts: {
        tr: ['Loukoumades (Ballı tarçınlı lokma tatlısı)', 'Spanakopita (Ispanaklı çıtır börek)', 'Galaktoboureko (İrmik kremalı börek tatlısı)', 'Bougatsa'],
        en: ['Loukoumades honey puffs with cinnamon', 'Flaky Spanakopita spinach pie', 'Galaktoboureko custard pastry', 'Warm Bougatsa cream pastry'],
        de: ['Loukoumades (Honigbällchen)', 'Spanakopita (Spinatstrudel)', 'Galaktoboureko', 'Bougatsa']
      }
    },
    achievements: {
      famousFigures: {
        tr: ['Sokrates, Platon & Aristoteles', 'Büyük İskender', 'Hipokrat (Tıbbın Babası)', 'Maria Callas (Opera Divası)', 'Giannis Antetokounmpo (NBA MVP)'],
        en: ['Socrates, Plato & Aristotle', 'Alexander the Great', 'Hippocrates (Father of Medicine)', 'Maria Callas (Opera legend)', 'Giannis Antetokounmpo (NBA Champion)'],
        de: ['Sokrates, Platon & Aristoteles', 'Alexander der Große', 'Hippokrates', 'Maria Callas', 'Giannis Antetokounmpo']
      },
      strongSectors: {
        tr: ['Dünya Ticaret Filosu Liderliği (Armatörlükte #1)', 'Ada ve Kültür Turizmi', 'Zeytinyağı ve Feta Peyniri İhracatı', 'Yenilenebilir Güneş Enerjisi'],
        en: ['Merchant Shipping Fleet (World #1 fleet owner)', 'Global Island & Heritage Tourism', 'Olive Oil and Feta Exports', 'Solar & Wind Energy'],
        de: ['Weltschifffahrt (Größte Handelsflotte der Welt)', 'Insel- und Kulturtourismus', 'Olivenöl- und Feta-Export', 'Solarenergie']
      }
    },
    economy: {
      paymentCulture: {
        tr: 'Yunanistan’da kart ve temassız POS kullanımı kanunen tüm işletmelerde (taksiler dahil) zorunludur (%95).',
        en: 'Card acceptance is legally mandated everywhere down to kiosks and taxis.',
        de: 'Kartenzahlung ist gesetzlich in allen Betrieben und Taxis Pflicht.'
      },
      economicPillars: {
        tr: 'Turizm, küresel deniz taşımacılığı, gıda ihracatı ve yenilenebilir enerji.',
        en: 'Tourism, maritime shipping, food processing, and renewable energy.',
        de: 'Tourismus, Schifffahrt, Lebensmittel und erneuerbare Energien.'
      },
      tippingCulture: {
        tr: 'Tavernalarda hesabı 1-3 € yuvarlamak veya %5-10 nakit bahşiş bırakmak çok hoş karşılanır.',
        en: 'Rounding up the bill by €1-3 or leaving 5-10% cash tip at tavernas is customary.',
        de: 'Aufrunden um 1-3 € oder 5-10% Trinkgeld in Tavernen wird sehr geschätzt.'
      }
    }
  },

  // Azerbaycan
  AZ: {
    culture: {
      etiquette: {
        tr: [
          'Misafire armudu bardakta demli çay ikramı kutsaldır; yanında mutlaka reçel veya tatlı sunulur.',
          'Büyüklere hürmet esastır; meclise yaşlı biri girdiğinde ayağa kalkılır.',
          'İki devlet, bir millet anlayışıyla Türk vatandaşlarına karşı olağanüstü sıcak ve kardeşçe bir sevgi vardır.',
          'Pazarlık çarşılarda yapılabilir ancak nezaket çerçevesinde kalmalıdır.'
        ],
        en: [
          'Serving freshly brewed tea in pear-shaped Armudu glasses with fruit preserves is mandatory hospitality.',
          'Deep reverence for elders; people stand up when an older person enters.',
          'Exceptional warmth and brotherhood towards visitors, especially from Turkey and fraternal nations.',
          'Polite bargaining is welcome in traditional carpet and souvenir bazaars.'
        ],
        de: [
          'Tee im Armudu-Glas mit Marmelade anzubieten ist oberstes Gebot der Gastfreundschaft.',
          'Großer Respekt vor Älteren; man steht auf, wenn Senioren den Raum betreten.',
          'Große Herzlichkeit gegenüber Gästen.',
          'Feilschen auf traditionellen Basaren üblich.'
        ]
      },
      festivals: {
        tr: ['Nevruz Bayramı (20-22 Mart bahar bayramı)', 'Bakü Caz Festivali', 'Formula 1 Azerbaycan Grand Prix', 'Göyçay Nar Festivali'],
        en: ['Novruz Spring Festival (March 20-22)', 'Baku International Jazz Festival', 'Formula 1 Azerbaijan Grand Prix', 'Goychay Pomegranate Festival'],
        de: ['Novruz Frühlingsfest (20.-22. März)', 'Baku Jazz Festival', 'Formel 1 Grand Prix von Aserbaidschan', 'Granatapfel-Festival in Göyçay']
      },
      lifestyle: {
        tr: 'Hazar Denizi kıyısında modern petrol zenginliği ile kadim Kafkas geleneklerinin, çayhane kültürünün ve muğam müziğinin birleşimi.',
        en: 'Confluence of modern Caspian oil vibrancy, ancient Silk Road traditions, teahouses (çayxana), and soulful Mugham music.',
        de: 'Moderne Architektur am Kaspischen Meer, historische Teestuben (Chaykhana) und Mugham-Musik.'
      }
    },
    tourism: {
      mustSeePlaces: {
        tr: ['İçerişehir & Kız Kalesi (Bakü)', 'Haydar Aliyev Kültür Merkezi (Zaha Hadid eseri)', 'Alev Kuleleri & Bakü Bulvarı', 'Kobustan Kaya Resimleri & Çamur Volkanları', 'Şeki Han Sarayı (Şebeke pencereleri)', 'Şahdağ Kayak Merkezi'],
        en: ['Old City Icherisheher & Maiden Tower (Baku)', 'Heydar Aliyev Center (Zaha Hadid architecture)', 'Flame Towers & Caspian Boulevard', 'Gobustan Petroglyphs & Mud Volcanoes', 'Sheki Khans’ Palace (Shebeke stained glass)', 'Shahdag Mountain Ski Resort'],
        de: ['Altstadt Icherisheher & Jungfrauenturm (Baku)', 'Heydar Aliyev Center', 'Flame Towers & Boulevard', 'Gobustan Felsbilder & Schlammvulkane', 'Palast der Khane von Scheki', 'Skigebiet Shahdag']
      },
      bestSeasons: {
        tr: 'Nisan - Haziran ve Eylül - Ekim ayları en elverişli dönemdir; yazın Hazar sahili 35°C’ye ulaşabilir.',
        en: 'April - June and September - October for pleasant weather.',
        de: 'April - Juni und September - Oktober sind ideal.'
      },
      travelStyleTip: {
        tr: 'Bakü içinde Bolt ve Uber uygulamaları son derece ucuz ve konforludur; Bakü metrosu için BakiKart kullanılır.',
        en: 'Bolt and Uber apps are ultra-cheap in Baku; get a BakiKart for the metro.',
        de: 'Bolt und Uber sind in Baku sehr günstig; BakiKart für die U-Bahn nutzen.'
      }
    },
    religion: {
      primaryReligions: {
        tr: 'Müslüman (~%96, Şii ve Sünni kardeşçe bir arada), Rus Ortodoks ve Musevi toplulukları.',
        en: 'Muslim (~96%, Shia and Sunni harmoniously coexisting), Russian Orthodox and historic Jewish community (Qırmızı Qəsəbə).',
        de: 'Muslimisch (~96%, Schiiten und Sunniten friedlich vereint), jüdische und russisch-orthodoxe Gemeinden.'
      },
      respectNorms: {
        tr: 'Dünyanın en seküler Müslüman çoğunluklu ülkelerinden biridir. Camilerde ayakkabı çıkarılır ve örtünme kurallarına uyulur.',
        en: 'One of the most secular Muslim-majority nations. Remove shoes when visiting mosques.',
        de: 'Sehr säkulares Land; Schuhe beim Betreten von Moscheen ausziehen.'
      },
      sacredSites: {
        tr: ['Bibiheybet Camii (Bakü)', 'Ateşgah Ateş Tapınağı (Zerdüşt mirası)', 'Taza Pir Camii', 'Kiş Alban Kilisesi (Şeki)'],
        en: ['Bibi-Heybat Mosque (Baku)', 'Ateshgah Fire Temple (Zoroastrian heritage)', 'Taza Pir Mosque', 'Kish Ancient Albanian Church (Sheki)'],
        de: ['Bibi-Heybat-Moschee (Baku)', 'Feuertempel Ateschgah', 'Teze-Pir-Moschee', 'Kirche von Kisch (Scheki)']
      }
    },
    language: {
      officialLanguages: {
        tr: 'Azerbaycan Türkçesi (Azərbaycan dili). Türkiye Türkçesi birebir anlaşılır; Rusça ve İngilizce yaygındır.',
        en: 'Azerbaijani. Turkish is mutually intelligible; Russian and English widely understood in Baku.',
        de: 'Aserbaidschanisch. Türkisch wird mühelos verstanden; Russisch und Englisch in Baku geläufig.'
      },
      englishProficiency: {
        tr: 'Bakü’de otellerde ve genç nüfus arasında iyi; Türkiye Türkçesiyle tüm ülkede %100 iletişim kurulabilir.',
        en: 'Good in Baku hospitality; Turkish speakers enjoy 100% mutual comprehension across the country.',
        de: 'Gut im Tourismus in Baku; mit Türkisch kommt man überall zurecht.'
      },
      phrases: [
        { phrase: 'Salam', meaningTr: 'Merhaba / Selam', meaningEn: 'Hello', meaningDe: 'Hallo', pronunciation: 'sah-lahm' },
        { phrase: 'Çox sağ olun / Təşəkkür edirəm', meaningTr: 'Çok sağ olun / Teşekkürler', meaningEn: 'Thank you very much', meaningDe: 'Vielen Dank', pronunciation: 'chokh sahg oh-loon' },
        { phrase: 'Zəhmət olmasa', meaningTr: 'Lütfen / Zahmet olmazsa', meaningEn: 'Please', meaningDe: 'Bitte', pronunciation: 'zah-met ohl-mah-sah' },
        { phrase: 'Bu neçəyədir?', meaningTr: 'Bu ne kadar?', meaningEn: 'How much is this?', meaningDe: 'Wie viel kostet das?', pronunciation: 'boo neh-cheh-yeh-deer' },
        { phrase: 'Hesabı zəhmət olmasa', meaningTr: 'Hesap lütfen', meaningEn: 'Check please', meaningDe: 'Die Rechnung, bitte', pronunciation: 'heh-sah-buh zah-met ohl-mah-sah' },
        { phrase: 'Kömək edin!', meaningTr: 'İmdat / Yardım edin!', meaningEn: 'Help!', meaningDe: 'Hilfe!', pronunciation: 'kur-mek eh-deen' }
      ]
    },
    history: {
      conciseHistory: {
        tr: 'Kafkas Albaniası, Şirvanşahlar ve Safevi medeniyetlerinin beşiği. 1918’de Doğu’nun ilk demokratik cumhuriyetini kurdu. Zengin petrol mirası ve Karabağ zaferiyle yükselen modern Kafkas lideri.',
        en: 'Home to Caucasian Albania and the Shirvanshahs. Founded the first democratic parliamentary republic in the Muslim world in 1918. Today a vibrant Caspian energy and cultural leader.',
        de: 'Heimat der Schirwanschahs; gründete 1918 die erste demokratische Republik der islamischen Welt. Heute führende Kaspische Energie- und Kulturnation.'
      },
      milestones: {
        tr: ['1918: Azerbaycan Demokratik Cumhuriyeti (Doğu’nun ilk cumhuriyeti)', '1991: Sovyetler’den yeniden bağımsızlık', '1994: Yüzyılın Asrın Petrol Sözleşmesi', '2020: Karabağ Zaferi'],
        en: ['1918: Azerbaijan Democratic Republic', '1991: Independence restored from USSR', '1994: Contract of the Century (Oil)', '2020: Karabakh Victory'],
        de: ['1918: Demokratische Republik Aserbaidschan', '1991: Wiedererlangung der Unabhängigkeit', '1994: Jahrhundertvertrag (Öl)', '2020: Karabach-Sieg']
      }
    },
    gastronomy: {
      famousDishes: {
        tr: ['Şah Pilavı (Yufka içinde kestaneli etli pilav)', 'Piti (Gömbeçte kuzu ve nohut yemeği)', 'Lüle Kebabı & Tike Kebab', 'Dolma (Yaprak dolması & Üç bacı dolması)'],
        en: ['Shah Pilaf (crown rice in crispy lavash crust)', 'Piti (slow-cooked clay-pot lamb soup)', 'Lula Kebab & Tika Kebab', 'Stuffed Grape Leaves Dolma'],
        de: ['Schah-Pilaw im knusprigen Lavash', 'Piti im Tontopf', 'Lula Kebab & Tika Kebab', 'Weinblatt-Dolma']
      },
      traditionalDrinks: {
        tr: ['Kekikli ve Karanfilli Azerbaycan Çayı', 'Düşes Armut Limonatası', 'Şerbet (Gül suyu ve safranlı içecek)', 'Nar Suyu'],
        en: ['Azerbaijani Black Tea with thyme and cloves', 'Duchesse Pear Lemonade', 'Sherbet infused with rosewater and saffron', 'Fresh Pomegranate Juice'],
        de: ['Schwarzer Tee mit Thymian', 'Birnen-Limonade Dushes', 'Rosenwasser-Scherbet', 'Frischer Granatapfelsaft']
      },
      streetFoodAndDesserts: {
        tr: ['Bakü Baklavası & Şeki Helvası', 'Şekerbura & Badambura (Nevruz tatlıları)', 'Qutab (Otlu ve etli gözleme)', 'Mürəbbə (Ceviz ve incir reçeli)'],
        en: ['Baku Pakhlava & Sheki Halva', 'Shekerbura & Badambura almond pastries', 'Qutab flatbreads with herbs & meat', 'Whole Green Walnut Murabba preserves'],
        de: ['Baku Baklava & Scheki Halwa', 'Shekerbura & Badambura', 'Qutab Kräuterfladen', 'Walnussmarmelade']
      }
    },
    achievements: {
      famousFigures: {
        tr: ['Haydar Aliyev (Milli Lider)', 'Nizami Gencevi (Büyük Şair)', 'Müslüm Magomayev (Efsanevi Bariton)', 'Vagif Mustafazadeh (Caz-Muğam kurucusu)', 'Garri Kasparov (Satranç Şampiyonu)'],
        en: ['Heydar Aliyev (National Leader)', 'Nizami Ganjavi (Classic Poet)', 'Muslim Magomayev (Legendary Baritone)', 'Vagif Mustafazadeh (Jazz-Mugham pioneer)', 'Garry Kasparov (Chess legend)'],
        de: ['Heydar Aliyev', 'Nizami Gandschawi', 'Muslim Magomajew', 'Vagif Mustafazadeh (Jazz-Mugham)', 'Garri Kasparow']
      },
      strongSectors: {
        tr: ['Petrol ve Doğalgaz İhracatı (Şahdeniz & TANAP)', 'Formula 1 & Küresel Etkinlikler', 'Satranç ve Güreş Ekolü', 'Hazar Transit Taşımacılığı'],
        en: ['Oil & Natural Gas Export (Shah Deniz & TANAP)', 'Formula 1 Grand Prix & Mega Events', 'Chess and Freestyle Wrestling Excellence', 'Caspian Trade Transit'],
        de: ['Öl- und Gasexport (TANAP)', 'Formel 1 & Großveranstaltungen', 'Schach & Ringen', 'Kaspischer Seetransit']
      }
    },
    economy: {
      paymentCulture: {
        tr: 'Bakü’de kart ve temassız POS kabulü %90 oranındadır. Taksi ve pazarlarda nakit Manat (AZN) gerekir.',
        en: 'Card acceptance is high in Baku (~90%); carry cash Azerbaijani Manat (AZN) for taxis and bazaars.',
        de: 'Kartenzahlung in Baku verbreitet; Manat-Bargeld für Taxis und Märkte bereithalten.'
      },
      economicPillars: {
        tr: 'Petrol ve doğalgaz, petrokimya, tarım (nar, fındık, pamuk) ve turizm.',
        en: 'Oil and gas extraction, petrochemicals, agriculture (pomegranate, hazelnuts), and transit logistics.',
        de: 'Öl- und Gasförderung, Petrochemie, Landwirtschaft und Logistik.'
      },
      tippingCulture: {
        tr: 'Restoranlarda %10 civarında bahşiş bırakmak nezaket kabul edilir.',
        en: 'Leaving a 10% tip is customary in full-service dining.',
        de: 'Ca. 10% Trinkgeld im Restaurant ist üblich.'
      }
    }
  }
};
