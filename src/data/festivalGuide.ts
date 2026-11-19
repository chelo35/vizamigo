/**
 * Festival rehberi: ülke sayfasındaki mevcut festival listesini (country-fixes, doğrulanmış) zenginleştirir.
 * Festival ADLARI değişmez — `i`, sitedeki festival listesindeki sıra numarasıdır (5 dilde aynı sıra).
 * Her giriş: ne zaman (ay / sabit gün / 2027 tarihi), nerede, kısa tarihçe ve gezgin ipucu.
 * Ay takvimine bağlı tarihler `lunar: true` ile "yaklaşık" işaretlenir.
 * Metin sırası: [en, tr, de, es, ru]
 */
type L5 = [string, string, string, string, string];

export interface FestivalGuideEntry {
  i: number;            // sitedeki festival listesindeki sıra
  m: number[];          // ay(lar), 1–12
  d?: string;           // sabit gün(ler), ör. '14' ya da '6–14' (ilk aya göre)
  y27?: [string, string?]; // 2027 tarihi (ISO), tek gün ya da aralık
  lunar?: boolean;      // ay takvimi: tarih her yıl değişir
  place?: string;       // şehir / bölge (özel ad)
  about: L5;
  tip: L5;
}

export const FESTIVAL_GUIDE: Record<string, FestivalGuideEntry[]> = {
  FR: [
    { i: 0, m: [7], d: '14', place: 'Paris', about: [
      'France’s national day marks the storming of the Bastille in 1789; Paris hosts a military parade on the Champs-Élysées and fireworks at the Eiffel Tower.',
      '1789’da Bastille Hapishanesi’nin basılmasını anan Fransa’nın milli günü; Paris’te Champs-Élysées’de askeri geçit ve Eyfel Kulesi’nde havai fişek gösterisi yapılır.',
      'Frankreichs Nationalfeiertag erinnert an den Sturm auf die Bastille 1789; in Paris gibt es eine Militärparade auf den Champs-Élysées und ein Feuerwerk am Eiffelturm.',
      'La fiesta nacional de Francia recuerda la toma de la Bastilla en 1789; París celebra un desfile militar en los Campos Elíseos y fuegos artificiales en la Torre Eiffel.',
      'Национальный праздник Франции в память о взятии Бастилии в 1789 году: в Париже проходит военный парад на Елисейских Полях и салют у Эйфелевой башни.'
    ], tip: [
      'Claim a spot on the Champ de Mars by mid-afternoon for the fireworks; metro stations near the tower close early.',
      'Havai fişekler için Champ de Mars’ta öğleden sonra yer tutun; kuleye yakın metro istasyonları erken kapanır.',
      'Für das Feuerwerk schon am Nachmittag einen Platz auf dem Champ de Mars sichern; Metrostationen am Turm schließen früh.',
      'Para los fuegos, busque sitio en el Campo de Marte a media tarde; las estaciones de metro junto a la torre cierran pronto.',
      'Место на Марсовом поле для салюта лучше занять с середины дня; ближайшие к башне станции метро закрывают заранее.'
    ] },
    { i: 1, m: [5], place: 'Cannes', about: [
      'Founded in 1946, it is the world’s best-known film festival; the Palme d’Or is awarded at the end of the roughly two-week event.',
      '1946’da kurulan, dünyanın en ünlü film festivali; yaklaşık iki hafta süren festivalin sonunda Altın Palmiye ödülü verilir.',
      'Das 1946 gegründete, bekannteste Filmfestival der Welt; zum Abschluss des rund zweiwöchigen Festivals wird die Goldene Palme verliehen.',
      'Fundado en 1946, es el festival de cine más famoso del mundo; al final de sus dos semanas se entrega la Palma de Oro.',
      'Самый известный кинофестиваль мира, основан в 1946 году; в конце примерно двухнедельного фестиваля вручают «Золотую пальмовую ветвь».'
    ], tip: [
      'Screenings are mostly for accredited guests, but the free open-air "Cinéma de la Plage" is open to everyone; hotel prices on the Riviera soar.',
      'Gösterimler çoğunlukla akrediteli konuklara açık, ama ücretsiz açık hava “Cinéma de la Plage” herkese açık; Riviera’da otel fiyatları çok yükselir.',
      'Vorführungen sind meist akkreditierten Gästen vorbehalten, das kostenlose Open-Air-„Cinéma de la Plage“ ist aber für alle offen; Hotelpreise an der Riviera explodieren.',
      'Las proyecciones son casi solo para acreditados, pero el «Cinéma de la Plage» al aire libre es gratuito para todos; los hoteles de la Riviera se disparan.',
      'Показы в основном для аккредитованных гостей, но бесплатный «Пляжный кинотеатр» открыт всем; цены на отели Ривьеры резко растут.'
    ] },
    { i: 2, m: [6], d: '21', about: [
      'Started in Paris in 1982, it fills every town on the summer solstice with free concerts by amateurs and professionals alike.',
      '1982’de Paris’te başlayan bu gün, yaz gündönümünde her şehri amatör ve profesyonel müzisyenlerin ücretsiz konserleriyle doldurur.',
      'Seit 1982 füllt das Fest am Tag der Sommersonnenwende jede Stadt mit kostenlosen Konzerten von Amateuren und Profis.',
      'Nacida en París en 1982, llena cada ciudad en el solsticio de verano de conciertos gratuitos de aficionados y profesionales.',
      'Праздник появился в Париже в 1982 году: в день летнего солнцестояния улицы всех городов заполняют бесплатные концерты.'
    ], tip: [
      'Everything is free and outdoors; just wander the streets after sunset. Public transport often runs late that night.',
      'Her şey ücretsiz ve açık havada; gün batımından sonra sokaklarda gezinmeniz yeterli. Toplu taşıma o gece genelde geç saate kadar çalışır.',
      'Alles ist kostenlos und draußen; einfach nach Sonnenuntergang durch die Straßen ziehen. Öffis fahren in dieser Nacht oft länger.',
      'Todo es gratis y al aire libre; basta con pasear tras la puesta de sol. El transporte suele funcionar hasta tarde.',
      'Всё бесплатно и под открытым небом — просто гуляйте после заката. Транспорт в эту ночь обычно ходит дольше.'
    ] },
    { i: 4, m: [2], place: 'Nice', about: [
      'One of the world’s oldest carnivals, with giant papier-mâché floats and the famous flower battles along the Promenade des Anglais.',
      'Dünyanın en eski karnavallarından biri; dev kâğıt hamuru arabalar ve Promenade des Anglais boyunca ünlü çiçek savaşlarıyla bilinir.',
      'Einer der ältesten Karnevals der Welt mit riesigen Pappmaché-Wagen und den berühmten Blumenschlachten auf der Promenade des Anglais.',
      'Uno de los carnavales más antiguos del mundo, con carrozas gigantes de cartón piedra y las famosas batallas de flores en el Paseo de los Ingleses.',
      'Один из старейших карнавалов мира: огромные платформы из папье-маше и знаменитые «битвы цветов» на Английской набережной.'
    ], tip: [
      'Parade seats and standing areas need tickets; book the flower battle grandstands early.',
      'Geçit törenleri için oturma ve ayakta izleme alanları biletli; çiçek savaşı tribünlerini erken ayırtın.',
      'Für Sitz- und Stehplätze an den Umzügen braucht man Tickets; Tribünen für die Blumenschlacht früh buchen.',
      'Las gradas y zonas de pie de los desfiles requieren entrada; reserve pronto las gradas de la batalla de flores.',
      'Места на трибунах и стоячие зоны платные; билеты на «битву цветов» лучше брать заранее.'
    ] }
  ],
  ES: [
    { i: 0, m: [8], y27: ['2027-08-25'], place: 'Buñol', about: [
      'Held on the last Wednesday of August since 1945, about 20,000 people throw some 120 tonnes of over-ripe tomatoes at each other for one hour.',
      '1945’ten beri ağustosun son çarşamba günü yapılır; yaklaşık 20.000 kişi bir saat boyunca birbirine 120 ton kadar olgun domates atar.',
      'Seit 1945 am letzten Mittwoch im August: Rund 20.000 Menschen bewerfen sich eine Stunde lang mit etwa 120 Tonnen überreifer Tomaten.',
      'Se celebra el último miércoles de agosto desde 1945: unas 20.000 personas se lanzan unas 120 toneladas de tomates maduros durante una hora.',
      'С 1945 года в последнюю среду августа около 20 000 человек целый час забрасывают друг друга примерно 120 тоннами спелых помидоров.'
    ], tip: [
      'Entry is ticket-only and capped; wear old clothes and swim goggles, and stay in Valencia, about 40 km away.',
      'Giriş biletli ve sınırlı; eski kıyafet ve yüzücü gözlüğü takın, 40 km uzaktaki Valensiya’da konaklayın.',
      'Eintritt nur mit Ticket und begrenzt; alte Kleidung und Schwimmbrille tragen und im rund 40 km entfernten Valencia übernachten.',
      'La entrada es con entrada y aforo limitado; lleve ropa vieja y gafas de natación, y alójese en Valencia, a unos 40 km.',
      'Вход только по билетам, число мест ограничено; наденьте старую одежду и очки для плавания, жить удобнее в Валенсии в 40 км.'
    ] },
    { i: 1, m: [7], d: '6–14', place: 'Pamplona', about: [
      'The feast of Saint Fermín, made famous by Hemingway; each morning at 8:00 the bulls run 875 metres through the old town to the bullring.',
      'Hemingway’in ünlü yaptığı Aziz Fermín şenliği; her sabah saat 8’de boğalar eski şehirde 875 metre koşarak arenaya ulaşır.',
      'Das durch Hemingway berühmte Fest des heiligen Fermín; jeden Morgen um 8 Uhr laufen die Stiere 875 Meter durch die Altstadt zur Arena.',
      'La fiesta de San Fermín, que Hemingway hizo famosa; cada mañana a las 8:00 los toros recorren 875 metros del casco viejo hasta la plaza.',
      'Праздник святого Фермина, прославленный Хемингуэем: каждое утро в 8:00 быки пробегают 875 метров по старому городу до арены.'
    ], tip: [
      'Watching from a rented balcony is far safer than running; dress in white with a red scarf, and book rooms months ahead.',
      'Koşmak yerine kiralık bir balkondan izlemek çok daha güvenli; beyaz giyip kırmızı fular takın, odaları aylar öncesinden ayırtın.',
      'Von einem gemieteten Balkon zuzusehen ist viel sicherer als mitzulaufen; Weiß mit rotem Halstuch tragen und Zimmer Monate vorher buchen.',
      'Verlo desde un balcón alquilado es mucho más seguro que correr; vista de blanco con pañuelo rojo y reserve con meses de antelación.',
      'Смотреть с арендованного балкона намного безопаснее, чем бежать; одевайтесь в белое с красным платком и бронируйте жильё за месяцы.'
    ] },
    { i: 2, m: [3], d: '15–19', place: 'Valencia', about: [
      'Valencia’s spring festival (UNESCO) builds hundreds of giant satirical figures, then burns them all on the night of 19 March, Saint Joseph’s Day.',
      'Valensiya’nın bahar festivali (UNESCO); yüzlerce dev hiciv heykeli yapılır ve 19 Mart Aziz Yusuf Günü gecesi hepsi yakılır.',
      'Valencias Frühlingsfest (UNESCO) baut Hunderte riesiger satirischer Figuren und verbrennt sie alle in der Nacht des 19. März, dem Josefstag.',
      'La fiesta de primavera de Valencia (UNESCO) levanta cientos de figuras satíricas gigantes y las quema todas la noche del 19 de marzo, San José.',
      'Весенний праздник Валенсии (ЮНЕСКО): сотни гигантских сатирических фигур сжигают в ночь на 19 марта, день святого Иосифа.'
    ], tip: [
      'Don’t miss the daily 2 pm "mascletà" firecracker show at Plaza del Ayuntamiento; bring earplugs.',
      'Her gün saat 14:00’te Plaza del Ayuntamiento’daki “mascletà” patlatma gösterisini kaçırmayın; kulak tıkacı alın.',
      'Die tägliche „Mascletà“ um 14 Uhr an der Plaza del Ayuntamiento nicht verpassen; Ohrstöpsel mitnehmen.',
      'No se pierda la mascletà diaria de las 14:00 en la Plaza del Ayuntamiento; lleve tapones para los oídos.',
      'Не пропустите ежедневную «маклету» в 14:00 на площади Аюнтамьенто; возьмите беруши.'
    ] },
    { i: 3, m: [4], y27: ['2027-04-11', '2027-04-17'], place: 'Sevilla', about: [
      'A week of flamenco, horse parades and sherry in hundreds of striped "casetas", held two weeks after Easter.',
      'Paskalya’dan iki hafta sonra yapılan; yüzlerce çizgili “caseta” çadırında flamenko, at geçitleri ve şeriyle geçen bir hafta.',
      'Eine Woche voller Flamenco, Pferdeparaden und Sherry in Hunderten gestreiften „Casetas“, zwei Wochen nach Ostern.',
      'Una semana de sevillanas, paseos a caballo y fino en cientos de casetas a rayas, dos semanas después de Semana Santa.',
      'Неделя фламенко, конных шествий и хереса в сотнях полосатых шатров-«касет», через две недели после Пасхи.'
    ], tip: [
      'Most casetas are private, but the public ones welcome everyone; dress up — locals wear flamenco dresses.',
      'Casetaların çoğu özel, ama halka açık olanlar herkesi kabul eder; şık giyinin, yerliler flamenko elbisesi giyer.',
      'Die meisten Casetas sind privat, die öffentlichen stehen aber allen offen; schick anziehen – Einheimische tragen Flamencokleider.',
      'Muchas casetas son privadas, pero las públicas reciben a todos; vístase bien: las sevillanas van de flamenca.',
      'Большинство касет частные, но в общественные пускают всех; одевайтесь нарядно — местные носят платья фламенко.'
    ] },
    { i: 4, m: [3, 4], y27: ['2027-03-21', '2027-03-28'], about: [
      'The week before Easter brings solemn processions of hooded brotherhoods carrying giant floats, most famously in Seville and Málaga.',
      'Paskalya’dan önceki hafta, dev sedyeler taşıyan kukuletalı kardeşliklerin ağırbaşlı alaylarıyla geçer; en ünlüleri Sevilla ve Málaga’dadır.',
      'In der Woche vor Ostern ziehen feierliche Prozessionen verhüllter Bruderschaften mit riesigen Tragebildern durch die Städte, besonders in Sevilla und Málaga.',
      'La semana anterior a Pascua salen las procesiones de cofradías con capirote y enormes pasos, sobre todo en Sevilla y Málaga.',
      'В неделю перед Пасхой проходят торжественные шествия братств в капюшонах с огромными платформами, особенно в Севилье и Малаге.'
    ], tip: [
      'Check each brotherhood’s route and timetable online; hotel prices in Andalusia peak this week.',
      'Her kardeşliğin güzergâhını ve saatini internetten kontrol edin; Endülüs’te otel fiyatları bu hafta zirve yapar.',
      'Route und Zeitplan jeder Bruderschaft online prüfen; Hotelpreise in Andalusien sind in dieser Woche am höchsten.',
      'Consulte en internet el recorrido y horario de cada cofradía; los hoteles de Andalucía alcanzan su precio máximo.',
      'Маршруты и расписание каждого братства есть в интернете; цены на отели в Андалусии в эту неделю максимальные.'
    ] }
  ],
  US: [
    { i: 0, m: [7], d: '4', about: [
      'Independence Day marks the Declaration of Independence in 1776, with parades, barbecues and fireworks across the country.',
      '1776’daki Bağımsızlık Bildirgesi’ni anar; ülke genelinde geçit törenleri, mangal partileri ve havai fişeklerle kutlanır.',
      'Der Unabhängigkeitstag erinnert an die Unabhängigkeitserklärung von 1776 – mit Paraden, Barbecues und Feuerwerk im ganzen Land.',
      'El Día de la Independencia recuerda la Declaración de 1776, con desfiles, barbacoas y fuegos artificiales en todo el país.',
      'День независимости в честь Декларации 1776 года: парады, барбекю и фейерверки по всей стране.'
    ], tip: [
      'Top fireworks: Macy’s in New York and the National Mall in Washington, D.C.; domestic flights are busy and pricey.',
      'En iyi havai fişekler: New York’ta Macy’s ve Washington’da National Mall; iç hat uçuşları kalabalık ve pahalıdır.',
      'Die besten Feuerwerke: Macy’s in New York und die National Mall in Washington, D.C.; Inlandsflüge sind voll und teuer.',
      'Los mejores fuegos: Macy’s en Nueva York y el National Mall en Washington D. C.; los vuelos internos se llenan y encarecen.',
      'Лучшие салюты — Macy’s в Нью-Йорке и Национальная аллея в Вашингтоне; внутренние рейсы переполнены и дороги.'
    ] },
    { i: 1, m: [11], y27: ['2027-11-25'], about: [
      'Held on the fourth Thursday of November, it is a family harvest feast built around roast turkey; New York’s Macy’s parade opens the day.',
      'Kasımın dördüncü perşembesi kutlanan, hindi etrafında toplanılan aile hasat sofrası; gün New York’taki Macy’s geçit töreniyle açılır.',
      'Am vierten Donnerstag im November: ein Familienfest rund um den Truthahn; die Macy’s-Parade in New York eröffnet den Tag.',
      'El cuarto jueves de noviembre: una comida familiar en torno al pavo; el desfile de Macy’s en Nueva York abre el día.',
      'Четвёртый четверг ноября — семейный праздник урожая с запечённой индейкой; день открывает парад Macy’s в Нью-Йорке.'
    ], tip: [
      'It is the busiest travel weekend of the year; the next day, Black Friday, starts the holiday sales.',
      'Yılın en yoğun seyahat hafta sonudur; ertesi gün Black Friday ile yılbaşı indirimleri başlar.',
      'Das reisestärkste Wochenende des Jahres; am Tag danach startet mit dem Black Friday der Weihnachtsverkauf.',
      'Es el fin de semana con más viajes del año; al día siguiente, el Black Friday abre las rebajas navideñas.',
      'Самые загруженные выходные года для поездок; на следующий день в «чёрную пятницу» начинаются распродажи.'
    ] },
    { i: 2, m: [10], d: '31', about: [
      'Rooted in the Celtic festival of Samhain, it is now a night of costumes, trick-or-treating and haunted houses.',
      'Kökeni Keltlerin Samhain bayramına dayanır; bugün kostümler, kapı kapı şeker toplama ve korku evleriyle geçen bir gecedir.',
      'Mit Wurzeln im keltischen Samhain-Fest ist es heute eine Nacht der Kostüme, des „Süßes oder Saures“ und der Spukhäuser.',
      'Con raíces en la fiesta celta de Samhain, hoy es una noche de disfraces, «truco o trato» y casas encantadas.',
      'Праздник восходит к кельтскому Самайну; сегодня это ночь костюмов, «сладость или гадость» и домов с привидениями.'
    ], tip: [
      'New York’s Village Halloween Parade on Sixth Avenue lets anyone in costume march along.',
      'New York’taki Village Halloween Parade’e (Altıncı Cadde) kostüm giyen herkes katılabilir.',
      'Bei der Village Halloween Parade auf der Sixth Avenue in New York darf jeder im Kostüm mitlaufen.',
      'En el Village Halloween Parade de Nueva York (Sexta Avenida) puede desfilar cualquiera disfrazado.',
      'В нью-йоркском параде Village Halloween на Шестой авеню может пройти любой в костюме.'
    ] },
    { i: 4, m: [12], d: '31', place: 'New York', about: [
      'Since 1907 a lit ball has dropped from One Times Square at midnight, watched by around a million people on site.',
      '1907’den beri gece yarısı One Times Square’den ışıklı bir top iner; yerinde yaklaşık bir milyon kişi izler.',
      'Seit 1907 sinkt um Mitternacht eine leuchtende Kugel vom One Times Square herab – rund eine Million Menschen schauen vor Ort zu.',
      'Desde 1907, a medianoche baja una bola iluminada desde One Times Square ante cerca de un millón de personas.',
      'С 1907 года в полночь с небоскрёба One Times Square опускается светящийся шар; на площади собирается около миллиона человек.'
    ], tip: [
      'Viewing pens fill by early afternoon and there are no toilets or re-entry; a nearby restaurant package is the comfortable option.',
      'İzleme alanları öğleden sonra dolar; tuvalet ve tekrar giriş yoktur. Rahat seçenek yakındaki bir restoran paketidir.',
      'Die Zuschauerbereiche sind schon am frühen Nachmittag voll, ohne Toiletten und Wiedereinlass; bequemer ist ein Restaurantpaket in der Nähe.',
      'Las zonas se llenan a primera hora de la tarde, sin baños ni reingreso; lo cómodo es un paquete en un restaurante cercano.',
      'Зоны для зрителей заполняются уже днём, туалетов и повторного входа нет; удобнее взять пакет в ближайшем ресторане.'
    ] }
  ],
  IT: [
    { i: 0, m: [1, 2], place: 'Venezia', about: [
      'A centuries-old carnival of ornate masks and costumes in the weeks before Lent, ending on Shrove Tuesday (9 February in 2027).',
      'Büyük Perhiz’den önceki haftalarda süslü maske ve kostümlerle yapılan yüzyıllık karnaval; Paskalya öncesi “Etli Salı” günü biter (2027’de 9 Şubat).',
      'Jahrhundertealter Karneval mit prachtvollen Masken und Kostümen in den Wochen vor der Fastenzeit; er endet am Faschingsdienstag (2027: 9. Februar).',
      'Carnaval centenario de máscaras y disfraces en las semanas previas a la Cuaresma; termina el Martes de Carnaval (9 de febrero en 2027).',
      'Многовековой карнавал масок и костюмов в недели перед Великим постом; завершается во вторник перед Пепельной средой (в 2027 году — 9 февраля).'
    ], tip: [
      'Buy a mask from a traditional workshop rather than a souvenir stall; St Mark’s Square is busiest on the final weekend.',
      'Maskenizi hediyelik tezgâhından değil geleneksel bir atölyeden alın; San Marco Meydanı son hafta sonu en kalabalıktır.',
      'Masken lieber in einer traditionellen Werkstatt als am Souvenirstand kaufen; am letzten Wochenende ist der Markusplatz am vollsten.',
      'Compre la máscara en un taller tradicional, no en un puesto de recuerdos; la plaza de San Marcos se llena el último fin de semana.',
      'Маску лучше купить в традиционной мастерской, а не в сувенирной лавке; площадь Сан-Марко переполнена в последние выходные.'
    ] },
    { i: 1, m: [7, 8], place: 'Siena', about: [
      'A bareback horse race around the Piazza del Campo held on 2 July and 16 August, contested by the city’s rival districts since the Middle Ages.',
      'Orta Çağ’dan beri şehrin rakip mahalleleri arasında, 2 Temmuz ve 16 Ağustos’ta Piazza del Campo çevresinde eyersiz atlarla yapılan yarış.',
      'Ein Pferderennen ohne Sattel rund um die Piazza del Campo am 2. Juli und 16. August, ausgetragen von den rivalisierenden Stadtvierteln seit dem Mittelalter.',
      'Carrera de caballos a pelo alrededor de la Piazza del Campo el 2 de julio y el 16 de agosto, disputada por los barrios rivales desde la Edad Media.',
      'Скачки без седла вокруг площади Пьяцца-дель-Кампо 2 июля и 16 августа, в которых со Средневековья соревнуются районы города.'
    ], tip: [
      'Standing in the centre of the piazza is free but means hours in the sun; grandstand seats sell out early.',
      'Meydanın ortasında ayakta izlemek ücretsiz ama saatlerce güneşte beklemek demek; tribün koltukları erken tükenir.',
      'Stehplätze in der Platzmitte sind kostenlos, bedeuten aber Stunden in der Sonne; Tribünenplätze sind früh ausverkauft.',
      'Ver la carrera de pie en el centro de la plaza es gratis, pero son horas al sol; las gradas se agotan pronto.',
      'Стоять в центре площади бесплатно, но придётся часами ждать на солнце; места на трибунах раскупают рано.'
    ] },
    { i: 4, m: [8], d: '15', about: [
      'A summer holiday dating back to Emperor Augustus, now combined with the Feast of the Assumption; Italians head to the beach.',
      'İmparator Augustus’a uzanan, bugün Meryem’in Göğe Yükselişi bayramıyla birleşen yaz tatili; İtalyanlar sahillere akın eder.',
      'Ein Sommerfeiertag, der auf Kaiser Augustus zurückgeht und heute mit Mariä Himmelfahrt zusammenfällt; Italien fährt ans Meer.',
      'Fiesta veraniega que se remonta al emperador Augusto, hoy unida a la Asunción; los italianos se van a la playa.',
      'Летний праздник, восходящий к императору Августу, сегодня совпадает с Успением; итальянцы массово едут на море.'
    ], tip: [
      'Beaches and trains are packed, while many city shops and restaurants close for the week.',
      'Sahiller ve trenler tıklım tıklımdır; şehirlerde ise birçok dükkân ve restoran o hafta kapalıdır.',
      'Strände und Züge sind voll, während in den Städten viele Geschäfte und Restaurants die ganze Woche schließen.',
      'Playas y trenes van llenos, mientras muchas tiendas y restaurantes de las ciudades cierran esa semana.',
      'Пляжи и поезда переполнены, а в городах многие магазины и рестораны закрыты всю неделю.'
    ] }
  ],
  TR: [
    { i: 1, m: [10], d: '29', about: [
      'Celebrates the proclamation of the Republic by Atatürk in 1923, with parades, flags on every street and fireworks.',
      '1923’te Atatürk’ün Cumhuriyeti ilanını kutlar; tören geçitleri, her sokağı süsleyen bayraklar ve havai fişeklerle geçer.',
      'Feiert die Ausrufung der Republik durch Atatürk 1923 – mit Paraden, Fahnen in jeder Straße und Feuerwerk.',
      'Celebra la proclamación de la República por Atatürk en 1923, con desfiles, banderas en cada calle y fuegos artificiales.',
      'Праздник провозглашения Республики Ататюрком в 1923 году: парады, флаги на каждой улице и фейерверки.'
    ], tip: [
      'Istanbul’s Bosphorus fireworks and drone shows draw big crowds; government offices close.',
      'İstanbul’da Boğaz’daki havai fişek ve drone gösterileri büyük kalabalık çeker; resmi daireler kapalıdır.',
      'Feuerwerk und Drohnenshows am Bosporus in Istanbul ziehen große Menschenmengen an; Behörden haben geschlossen.',
      'Los fuegos y espectáculos de drones en el Bósforo de Estambul atraen multitudes; las oficinas públicas cierran.',
      'Салют и шоу дронов над Босфором в Стамбуле собирают толпы; госучреждения не работают.'
    ] },
    { i: 3, m: [6, 7], place: 'Edirne', about: [
      'Dating back to 1346 and among the world’s oldest sports events, its wrestlers compete covered in olive oil (UNESCO).',
      'Kökeni 1346’ya uzanan, dünyanın en eski spor organizasyonlarından biri; pehlivanlar zeytinyağına bulanmış olarak güreşir (UNESCO).',
      'Seit 1346 ausgetragen und eines der ältesten Sportereignisse der Welt: Ringer kämpfen mit Olivenöl eingerieben (UNESCO).',
      'Con origen en 1346, es uno de los eventos deportivos más antiguos del mundo: luchadores untados en aceite de oliva (UNESCO).',
      'Ведёт историю с 1346 года и входит в число старейших спортивных состязаний мира: борцы выступают, натёршись оливковым маслом (ЮНЕСКО).'
    ], tip: [
      'Finals are on the last day; Edirne is an easy 2.5-hour trip from Istanbul, but hotels fill up.',
      'Finaller son gün yapılır; Edirne İstanbul’dan 2,5 saatlik kolay bir yolculuk ama oteller dolar.',
      'Die Finals finden am letzten Tag statt; Edirne liegt bequem 2,5 Stunden von Istanbul entfernt, Hotels sind aber schnell voll.',
      'Las finales son el último día; Edirne está a 2,5 h de Estambul, pero los hoteles se llenan.',
      'Финалы — в последний день; до Эдирне 2,5 часа из Стамбула, но гостиницы быстро заполняются.'
    ] }
  ],
  MX: [
    { i: 0, m: [11], d: '1–2', about: [
      'Families welcome back the souls of the dead with altars of marigolds, candles and sugar skulls (UNESCO intangible heritage).',
      'Aileler ölülerin ruhlarını kadife çiçekleri, mumlar ve şeker kafataslarıyla süslü sunaklarla karşılar (UNESCO somut olmayan miras).',
      'Familien empfangen die Seelen der Verstorbenen mit Altären aus Studentenblumen, Kerzen und Zuckerschädeln (immaterielles UNESCO-Erbe).',
      'Las familias reciben a sus difuntos con altares de cempasúchil, velas y calaveritas de azúcar (patrimonio inmaterial de la UNESCO).',
      'Семьи встречают души умерших алтарями из бархатцев, свечами и сахарными черепами (нематериальное наследие ЮНЕСКО).'
    ], tip: [
      'Mexico City holds a big parade the weekend before; for the candle-lit cemetery vigils, go to Oaxaca or Pátzcuaro.',
      'Mexico City’de bir önceki hafta sonu büyük geçit yapılır; mum ışığındaki mezarlık nöbetleri için Oaxaca ya da Pátzcuaro’ya gidin.',
      'In Mexiko-Stadt gibt es am Wochenende davor eine große Parade; für Kerzennächte auf Friedhöfen nach Oaxaca oder Pátzcuaro fahren.',
      'Ciudad de México hace un gran desfile el fin de semana anterior; para las veladas en panteones, vaya a Oaxaca o Pátzcuaro.',
      'В Мехико за выходные до праздника проходит большой парад; ночные бдения на кладбищах — в Оахаке или Пацкуаро.'
    ] },
    { i: 1, m: [7], y27: ['2027-07-19', '2027-07-26'], place: 'Oaxaca', about: [
      'Held on the two Mondays after 16 July, delegations from Oaxaca’s regions perform their traditional dances and share their foods.',
      '16 Temmuz’dan sonraki iki pazartesi, Oaxaca’nın bölgelerinden gelen topluluklar geleneksel danslarını sergiler ve yemeklerini paylaşır.',
      'An den zwei Montagen nach dem 16. Juli führen Gruppen aus Oaxacas Regionen ihre traditionellen Tänze auf und teilen ihr Essen.',
      'Los dos lunes posteriores al 16 de julio, las delegaciones de las regiones de Oaxaca bailan sus danzas y comparten su comida.',
      'В два понедельника после 16 июля делегации регионов Оахаки исполняют традиционные танцы и угощают своими блюдами.'
    ], tip: [
      'Main shows in the hilltop auditorium need tickets; free street parades and food fairs run all month.',
      'Tepedeki amfitiyatrodaki ana gösteriler biletli; ücretsiz sokak geçitleri ve yemek panayırları ay boyunca sürer.',
      'Für die Hauptshows im Auditorium auf dem Hügel braucht man Tickets; kostenlose Straßenumzüge und Essensmärkte gibt es den ganzen Monat.',
      'Los espectáculos del auditorio del cerro requieren boleto; los desfiles y ferias gastronómicas gratuitos duran todo el mes.',
      'На главные шоу в амфитеатре на холме нужны билеты; бесплатные шествия и ярмарки еды идут весь месяц.'
    ] },
    { i: 2, m: [9], d: '15–16', about: [
      'On the night of 15 September the president repeats the 1810 "Cry of Dolores" from the National Palace balcony, followed by a parade on the 16th.',
      '15 Eylül gecesi devlet başkanı Ulusal Saray’ın balkonundan 1810’daki “Dolores Çığlığı”nı tekrarlar; 16’sında askeri geçit yapılır.',
      'In der Nacht zum 16. September wiederholt der Präsident vom Balkon des Nationalpalasts den „Schrei von Dolores“ von 1810; am 16. folgt eine Parade.',
      'La noche del 15 de septiembre el presidente repite el Grito de Dolores de 1810 desde el balcón del Palacio Nacional; el 16 hay desfile.',
      'В ночь на 16 сентября президент повторяет с балкона Национального дворца «Клич Долорес» 1810 года, а 16-го проходит парад.'
    ], tip: [
      'Mexico City’s Zócalo is packed; many towns hold their own "Grito" with fireworks and pozole.',
      'Mexico City’deki Zócalo tıklım tıklımdır; birçok kasaba havai fişek ve pozole ile kendi “Grito”sunu yapar.',
      'Der Zócalo in Mexiko-Stadt ist überfüllt; viele Orte feiern ihren eigenen „Grito“ mit Feuerwerk und Pozole.',
      'El Zócalo capitalino se llena; muchos pueblos celebran su propio Grito con fuegos y pozole.',
      'Площадь Сокало в Мехико переполнена; во многих городах свой «Грито» с салютом и позоле.'
    ] }
  ],
  GB: [
    { i: 0, m: [6], place: 'Pilton, Somerset', about: [
      'One of the world’s largest greenfield music festivals, running since 1970; it takes a "fallow year" off roughly every five years.',
      '1970’ten beri yapılan, dünyanın en büyük açık alan müzik festivallerinden biri; yaklaşık beş yılda bir “dinlenme yılı” verilir.',
      'Eines der größten Open-Air-Musikfestivals der Welt, seit 1970; etwa alle fünf Jahre gibt es ein „Brachjahr“ ohne Festival.',
      'Uno de los mayores festivales de música al aire libre del mundo, desde 1970; aproximadamente cada cinco años descansa un año.',
      'Один из крупнейших музыкальных фестивалей под открытым небом, проводится с 1970 года; примерно раз в пять лет делается год перерыва.'
    ], tip: [
      'Tickets sell out within minutes in autumn and require pre-registration with a photo.',
      'Biletler sonbaharda dakikalar içinde tükenir ve fotoğraflı ön kayıt gerektirir.',
      'Tickets sind im Herbst in Minuten ausverkauft und erfordern eine Vorregistrierung mit Foto.',
      'Las entradas se agotan en minutos en otoño y exigen registro previo con foto.',
      'Билеты раскупают за минуты осенью, нужна предварительная регистрация с фото.'
    ] },
    { i: 1, m: [8], y27: ['2027-08-29', '2027-08-30'], place: 'London', about: [
      'Started by the Caribbean community in 1966, it fills west London with steel bands, sound systems and costumed parades over the August bank holiday weekend.',
      '1966’da Karayipli topluluk tarafından başlatıldı; ağustos resmi tatil hafta sonunda batı Londra’yı çelik davul grupları, ses sistemleri ve kostümlü geçitlerle doldurur.',
      '1966 von der karibischen Gemeinschaft gegründet, füllt es am Augustfeiertagswochenende West-London mit Steelbands, Soundsystems und Kostümparaden.',
      'Creado por la comunidad caribeña en 1966, llena el oeste de Londres de steel bands, sound systems y comparsas el puente festivo de agosto.',
      'Основан карибской общиной в 1966 году: в августовские выходные запад Лондона заполняют стил-бэнды, саундсистемы и костюмированные шествия.'
    ], tip: [
      'Sunday is the family day, Monday the main parade; some nearby Tube stations close or are exit-only.',
      'Pazar aile günüdür, pazartesi ana geçit yapılır; yakındaki bazı metro istasyonları kapanır ya da yalnızca çıkışa açıktır.',
      'Sonntag ist Familientag, Montag die Hauptparade; einige U-Bahn-Stationen in der Nähe schließen oder sind nur Ausgang.',
      'El domingo es el día familiar y el lunes el gran desfile; algunas estaciones de metro cercanas cierran o son solo de salida.',
      'Воскресенье — семейный день, понедельник — главный парад; некоторые станции метро рядом закрыты или работают только на выход.'
    ] },
    { i: 2, m: [6, 7], place: 'London', about: [
      'The oldest tennis tournament in the world (since 1877) and the only Grand Slam played on grass, famous for strawberries and cream.',
      'Dünyanın en eski tenis turnuvası (1877’den beri) ve çimde oynanan tek Grand Slam; çilek ve kremasıyla ünlüdür.',
      'Das älteste Tennisturnier der Welt (seit 1877) und das einzige Grand-Slam-Turnier auf Rasen – berühmt für Erdbeeren mit Sahne.',
      'El torneo de tenis más antiguo del mundo (desde 1877) y el único Grand Slam sobre hierba, famoso por las fresas con nata.',
      'Старейший теннисный турнир мира (с 1877 года) и единственный «Шлем» на траве; знаменит клубникой со сливками.'
    ], tip: [
      'Besides the public ballot, a limited number of tickets are sold each day via "The Queue" — arrive early.',
      'Kura dışında her gün sınırlı sayıda bilet “The Queue” (kuyruk) ile satılır; erken gidin.',
      'Neben der Verlosung werden täglich begrenzt Tickets über „The Queue“ verkauft – früh kommen.',
      'Además del sorteo, cada día se venden entradas limitadas en «The Queue»: llegue temprano.',
      'Кроме лотереи, каждый день ограниченное число билетов продают через «Очередь» — приходите рано.'
    ] },
    { i: 4, m: [11], d: '5', about: [
      'Bonfires and fireworks mark the failed Gunpowder Plot of 1605 to blow up Parliament.',
      '1605’te Parlamento’yu havaya uçurmaya yönelik başarısız Barut Komplosu şenlik ateşleri ve havai fişeklerle anılır.',
      'Mit Lagerfeuern und Feuerwerk wird an die gescheiterte Pulververschwörung von 1605 gegen das Parlament erinnert.',
      'Hogueras y fuegos artificiales recuerdan la fallida Conspiración de la Pólvora de 1605 contra el Parlamento.',
      'Костры и фейерверки напоминают о провале Порохового заговора 1605 года против парламента.'
    ], tip: [
      'Lewes in East Sussex hosts the most spectacular torch-lit processions; many big displays are on the nearest weekend.',
      'En gösterişli meşaleli alaylar Doğu Sussex’teki Lewes’ta yapılır; büyük gösterilerin çoğu en yakın hafta sonuna denk gelir.',
      'Die spektakulärsten Fackelumzüge gibt es in Lewes (East Sussex); viele große Feuerwerke finden am nächsten Wochenende statt.',
      'Las procesiones con antorchas más espectaculares son en Lewes (East Sussex); muchos espectáculos se hacen el fin de semana más cercano.',
      'Самые зрелищные факельные шествия — в Льюисе (Восточный Сассекс); многие большие салюты устраивают в ближайшие выходные.'
    ] }
  ],
  DE: [
    { i: 0, m: [9, 10], y27: ['2027-09-18', '2027-10-03'], place: 'München', about: [
      'The world’s largest beer festival began with a royal wedding in 1810 and draws around six million visitors to the Theresienwiese.',
      'Dünyanın en büyük bira festivali 1810’daki bir kraliyet düğünüyle başladı; Theresienwiese’ye yaklaşık altı milyon ziyaretçi çeker.',
      'Das größte Volksfest der Welt begann 1810 mit einer königlichen Hochzeit und lockt rund sechs Millionen Besucher auf die Theresienwiese.',
      'La mayor fiesta de la cerveza del mundo nació con una boda real en 1810 y atrae a unos seis millones de visitantes a la Theresienwiese.',
      'Крупнейший пивной фестиваль мира начался с королевской свадьбы в 1810 году и собирает около шести миллионов гостей на Терезиенвизе.'
    ], tip: [
      'Weekday mornings are the easiest time to get a table without a reservation; Munich hotel prices roughly double.',
      'Rezervasyonsuz masa bulmanın en kolay zamanı hafta içi sabahlarıdır; Münih’te otel fiyatları neredeyse ikiye katlanır.',
      'Ohne Reservierung bekommt man am ehesten werktags vormittags einen Platz; Hotelpreise in München verdoppeln sich etwa.',
      'Las mañanas entre semana son lo más fácil para conseguir mesa sin reserva; los hoteles de Múnich casi duplican precio.',
      'Проще всего найти стол без брони утром в будни; цены на отели в Мюнхене примерно удваиваются.'
    ] },
    { i: 1, m: [2], place: 'Berlin', about: [
      'One of the "big three" film festivals and the one with the largest public audience; the Golden Bear is its top prize.',
      'Üç büyük film festivalinden biri ve en fazla seyirciye açık olanı; en büyük ödülü Altın Ayı’dır.',
      'Eines der drei großen Filmfestivals und das mit dem größten Publikum; der Goldene Bär ist der Hauptpreis.',
      'Uno de los tres grandes festivales de cine y el de mayor público; su máximo premio es el Oso de Oro.',
      'Один из «большой тройки» кинофестивалей и самый открытый для публики; главный приз — «Золотой медведь».'
    ], tip: [
      'Unlike Cannes, most screenings sell tickets to the public; they go on sale online three days before each screening.',
      'Cannes’ın aksine gösterimlerin çoğu halka bilet satar; biletler her gösterimden üç gün önce internette satışa çıkar.',
      'Anders als in Cannes gibt es für die meisten Vorführungen öffentliche Tickets, online jeweils drei Tage vorher.',
      'A diferencia de Cannes, casi todas las sesiones venden entradas al público, en línea tres días antes.',
      'В отличие от Канн, на большинство показов продают билеты всем желающим — онлайн за три дня до сеанса.'
    ] },
    { i: 2, m: [11, 12], about: [
      'From late November to Christmas Eve, town squares fill with wooden stalls selling mulled wine (Glühwein), gingerbread and crafts.',
      'Kasım sonundan Noel arifesine kadar meydanlar sıcak şarap (Glühwein), zencefilli kurabiye ve el işi satan ahşap tezgâhlarla dolar.',
      'Von Ende November bis Heiligabend füllen sich die Plätze mit Holzbuden voller Glühwein, Lebkuchen und Kunsthandwerk.',
      'De finales de noviembre a Nochebuena, las plazas se llenan de casetas de madera con vino caliente, pan de jengibre y artesanía.',
      'С конца ноября до сочельника площади заполняют деревянные киоски с глинтвейном, пряниками и поделками.'
    ], tip: [
      'Nuremberg, Dresden and Cologne have the most famous markets; you pay a deposit for the mug and can keep it as a souvenir.',
      'En ünlü pazarlar Nürnberg, Dresden ve Köln’dedir; kupa için depozito ödenir, hatıra olarak saklayabilirsiniz.',
      'Die bekanntesten Märkte sind in Nürnberg, Dresden und Köln; für die Tasse zahlt man Pfand und kann sie als Andenken behalten.',
      'Los mercados más famosos están en Núremberg, Dresde y Colonia; la taza lleva depósito y puede quedársela de recuerdo.',
      'Самые известные ярмарки — в Нюрнберге, Дрездене и Кёльне; за кружку берут залог, её можно оставить на память.'
    ] },
    { i: 3, m: [2], y27: ['2027-02-04', '2027-02-09'], place: 'Köln', about: [
      'The "fifth season" officially opens on 11 November at 11:11; the street carnival peaks from Weiberfastnacht to Rose Monday.',
      '“Beşinci mevsim” resmen 11 Kasım saat 11:11’de açılır; sokak karnavalı Weiberfastnacht’tan Gül Pazartesisi’ne kadar zirve yapar.',
      'Die „fünfte Jahreszeit“ beginnt offiziell am 11.11. um 11:11 Uhr; der Straßenkarneval gipfelt von Weiberfastnacht bis Rosenmontag.',
      'La «quinta estación» se abre el 11 de noviembre a las 11:11; el carnaval callejero culmina del Weiberfastnacht al Lunes de las Rosas.',
      '«Пятое время года» открывается 11 ноября в 11:11; уличный карнавал достигает пика от «Бабьего четверга» до Розового понедельника.'
    ], tip: [
      'Wear a costume — everyone does; on Weiberfastnacht women cut off men’s ties, so leave your good one at home.',
      'Kostüm giyin, herkes giyer; Weiberfastnacht’ta kadınlar erkeklerin kravatlarını keser, iyi kravatınızı evde bırakın.',
      'Kostüm tragen – das macht jeder; an Weiberfastnacht schneiden Frauen Männern die Krawatte ab, also die gute zu Hause lassen.',
      'Vaya disfrazado: todo el mundo lo hace; en Weiberfastnacht las mujeres cortan las corbatas, deje la buena en casa.',
      'Наденьте костюм — так делают все; в «Бабий четверг» женщины отрезают мужчинам галстуки, хороший оставьте дома.'
    ] }
  ],
  TH: [
    { i: 0, m: [4], d: '13–15', about: [
      'The traditional Thai New Year: water poured over Buddha images and elders’ hands for blessing has turned into a nationwide water fight (UNESCO).',
      'Geleneksel Tayland Yeni Yılı: Buda heykellerine ve büyüklerin ellerine kutsama için dökülen su, ülke çapında bir su savaşına dönüşmüştür (UNESCO).',
      'Das traditionelle Thai-Neujahr: Aus dem segnenden Wasser über Buddhastatuen und den Händen der Älteren wurde eine landesweite Wasserschlacht (UNESCO).',
      'El Año Nuevo tradicional tailandés: el agua que bendice las imágenes de Buda y las manos de los mayores se ha convertido en una batalla de agua nacional (UNESCO).',
      'Традиционный тайский Новый год: благословляющее омовение статуй Будды и рук старших превратилось в общенациональную водную битву (ЮНЕСКО).'
    ], tip: [
      'Put your phone and passport in a waterproof pouch; Bangkok’s Silom and Khao San and Chiang Mai’s moat are the liveliest spots.',
      'Telefon ve pasaportunuzu su geçirmez bir kılıfa koyun; en hareketli yerler Bangkok’ta Silom ve Khao San, Chiang Mai’de hendek çevresidir.',
      'Handy und Pass in eine wasserdichte Hülle stecken; am lebhaftesten ist es in Bangkok an Silom und Khao San sowie am Stadtgraben von Chiang Mai.',
      'Guarde el móvil y el pasaporte en una funda estanca; lo más animado: Silom y Khao San en Bangkok y el foso de Chiang Mai.',
      'Положите телефон и паспорт в водонепроницаемый чехол; самые оживлённые места — Силом и Каосан в Бангкоке и ров Чиангмая.'
    ] },
    { i: 1, m: [11], lunar: true, about: [
      'On the full moon of the twelfth lunar month, people float small decorated baskets (krathong) on rivers to thank the water goddess.',
      'On ikinci kameri ayın dolunayında insanlar su tanrıçasına şükran için nehirlere süslü küçük sepetler (krathong) bırakır.',
      'Beim Vollmond des zwölften Mondmonats lassen die Menschen kleine geschmückte Körbchen (Krathong) auf Flüssen treiben, um der Wassergöttin zu danken.',
      'En la luna llena del duodécimo mes lunar, la gente suelta pequeñas cestas decoradas (krathong) en los ríos para agradecer a la diosa del agua.',
      'В полнолуние двенадцатого лунного месяца люди пускают по рекам украшенные корзинки (кратонги) в благодарность богине воды.'
    ], tip: [
      'Choose a krathong made of banana leaf or bread rather than foam; Sukhothai’s historical park holds a famous light show.',
      'Köpük yerine muz yaprağı ya da ekmekten yapılmış krathong seçin; Sukhothai tarihi parkında ünlü bir ışık gösterisi yapılır.',
      'Lieber ein Krathong aus Bananenblatt oder Brot als aus Styropor wählen; im Geschichtspark Sukhothai gibt es eine berühmte Lichtshow.',
      'Elija un krathong de hoja de plátano o pan, no de espuma; el parque histórico de Sukhothai ofrece un famoso espectáculo de luces.',
      'Выбирайте кратонг из банановых листьев или хлеба, а не из пенопласта; в историческом парке Сукхотая проходит знаменитое световое шоу.'
    ] },
    { i: 2, m: [11], lunar: true, place: 'Chiang Mai', about: [
      'The northern (Lanna) version of the same full-moon festival, when thousands of paper lanterns are released into the night sky.',
      'Aynı dolunay bayramının kuzey (Lanna) versiyonu; binlerce kâğıt fener gece gökyüzüne bırakılır.',
      'Die nördliche (Lanna-)Variante desselben Vollmondfestes, bei der Tausende Papierlaternen in den Nachthimmel steigen.',
      'La versión del norte (Lanna) de la misma fiesta de luna llena: miles de farolillos de papel se sueltan al cielo nocturno.',
      'Северный (ланнский) вариант того же праздника полнолуния: в ночное небо выпускают тысячи бумажных фонариков.'
    ], tip: [
      'Lantern releases are restricted to permitted zones and times; the big mass releases are ticketed events.',
      'Fener bırakmak yalnızca izinli bölge ve saatlerde serbest; büyük toplu fener bırakma etkinlikleri biletlidir.',
      'Laternen dürfen nur in genehmigten Zonen und zu festen Zeiten steigen; die großen Massenstarts sind kostenpflichtig.',
      'Soltar farolillos solo se permite en zonas y horas autorizadas; las grandes sueltas masivas son con entrada.',
      'Запускать фонарики можно только в разрешённых зонах и в определённое время; массовые запуски — платные мероприятия.'
    ] }
  ],
  JP: [
    { i: 0, m: [3, 4], about: [
      'Picnicking under blooming cherry trees is a centuries-old custom; the bloom moves from Okinawa in January to Hokkaido in May.',
      'Çiçek açan kiraz ağaçlarının altında piknik yapmak yüzyıllık bir gelenektir; çiçeklenme ocakta Okinawa’dan mayısta Hokkaido’ya ilerler.',
      'Picknicks unter blühenden Kirschbäumen sind jahrhundertealte Tradition; die Blüte wandert von Okinawa im Januar bis Hokkaidō im Mai.',
      'Merendar bajo los cerezos en flor es una costumbre centenaria; la floración avanza de Okinawa en enero a Hokkaido en mayo.',
      'Пикники под цветущей сакурой — многовековой обычай; цветение идёт от Окинавы в январе до Хоккайдо в мае.'
    ], tip: [
      'In Tokyo and Kyoto peak bloom is usually late March to early April; follow the official forecasts and book hotels early.',
      'Tokyo ve Kyoto’da tam çiçeklenme genelde mart sonu ile nisan başıdır; resmi tahminleri takip edin ve oteli erken ayırtın.',
      'In Tokio und Kyoto ist die Hauptblüte meist Ende März bis Anfang April; offizielle Prognosen verfolgen und Hotels früh buchen.',
      'En Tokio y Kioto la plena floración suele ser de finales de marzo a principios de abril; siga las previsiones y reserve pronto.',
      'В Токио и Киото пик цветения обычно с конца марта до начала апреля; следите за официальными прогнозами и бронируйте заранее.'
    ] },
    { i: 1, m: [7], place: 'Kyoto', about: [
      'One of Japan’s three great festivals, held all July since the 9th century; giant ornate floats parade on 17 and 24 July.',
      'Japonya’nın üç büyük festivalinden biri; 9. yüzyıldan beri temmuz boyunca sürer, dev süslü arabalar 17 ve 24 Temmuz’da geçit yapar.',
      'Eines der drei großen Feste Japans, seit dem 9. Jahrhundert den ganzen Juli; am 17. und 24. Juli ziehen riesige Prunkwagen durch die Stadt.',
      'Una de las tres grandes fiestas de Japón, todo julio desde el siglo IX; las enormes carrozas desfilan el 17 y el 24 de julio.',
      'Один из трёх великих праздников Японии, длится весь июль с IX века; огромные платформы проходят 17 и 24 июля.'
    ], tip: [
      'The three evenings before each parade (yoiyama) close streets to traffic for food stalls and lit floats — the most atmospheric time.',
      'Her geçitten önceki üç akşam (yoiyama) sokaklar trafiğe kapanır; yemek tezgâhları ve ışıklı arabalarla en atmosferik zamandır.',
      'An den drei Abenden vor jeder Parade (Yoiyama) sind die Straßen für Essensstände und beleuchtete Wagen gesperrt – die stimmungsvollste Zeit.',
      'Las tres noches previas a cada desfile (yoiyama) las calles se cierran al tráfico con puestos y carrozas iluminadas: el mejor momento.',
      'В три вечера перед каждым парадом (ёияма) улицы закрывают для машин: еда, светящиеся платформы — самое атмосферное время.'
    ] },
    { i: 2, m: [2], place: 'Sapporo', about: [
      'Started in 1950 with six snow statues by students, it now features hundreds of snow and ice sculptures in Odori Park.',
      '1950’de öğrencilerin yaptığı altı kar heykeliyle başladı; bugün Odori Parkı’nda yüzlerce kar ve buz heykeli sergilenir.',
      '1950 mit sechs Schneefiguren von Schülern begonnen, zeigt es heute Hunderte Schnee- und Eisskulpturen im Odori-Park.',
      'Comenzó en 1950 con seis estatuas de nieve hechas por estudiantes; hoy expone cientos de esculturas de nieve y hielo en el parque Odori.',
      'Начался в 1950 году с шести снежных фигур школьников; сегодня в парке Одори — сотни снежных и ледяных скульптур.'
    ], tip: [
      'It runs for about a week in early February; bring shoes with good grip and book flights to New Chitose well ahead.',
      'Şubat başında yaklaşık bir hafta sürer; kaymayan ayakkabı alın ve New Chitose uçuşlarını erkenden ayırtın.',
      'Es dauert Anfang Februar etwa eine Woche; rutschfeste Schuhe mitnehmen und Flüge nach New Chitose früh buchen.',
      'Dura una semana a principios de febrero; lleve calzado antideslizante y reserve pronto los vuelos a New Chitose.',
      'Проходит около недели в начале февраля; возьмите нескользкую обувь и бронируйте рейсы в Новый Титосэ заранее.'
    ] },
    { i: 3, m: [8], d: '2–7', place: 'Aomori', about: [
      'Huge illuminated paper floats of warriors and gods are paraded through the streets, accompanied by dancers (haneto).',
      'Savaşçı ve tanrıları tasvir eden ışıklı dev kâğıt arabalar, dansçılar (haneto) eşliğinde sokaklarda gezdirilir.',
      'Riesige beleuchtete Papierwagen mit Kriegern und Göttern ziehen begleitet von Tänzern (Haneto) durch die Straßen.',
      'Enormes carrozas de papel iluminadas con guerreros y dioses desfilan por las calles acompañadas de bailarines (haneto).',
      'По улицам везут огромные светящиеся бумажные фигуры воинов и богов в сопровождении танцоров (хането).'
    ], tip: [
      'Rent a haneto costume and you can join the dancers; Aomori hotels sell out, so many visitors stay in Hirosaki.',
      'Haneto kostümü kiralarsanız dansçılara katılabilirsiniz; Aomori’de oteller dolar, birçok ziyaretçi Hirosaki’de kalır.',
      'Mit einem geliehenen Haneto-Kostüm darf man mittanzen; Hotels in Aomori sind ausgebucht, viele übernachten in Hirosaki.',
      'Alquilando un traje de haneto puede unirse a los bailarines; los hoteles de Aomori se agotan y muchos se alojan en Hirosaki.',
      'Взяв напрокат костюм хането, можно танцевать вместе со всеми; отели Аомори заняты, многие живут в Хиросаки.'
    ] }
  ],
  GR: [
    { i: 0, m: [5], y27: ['2027-05-02'], about: [
      'Greece’s biggest celebration: candles are lit at midnight on Holy Saturday, followed by fireworks and a lamb feast on Sunday.',
      'Yunanistan’ın en büyük kutlaması: Kutsal Cumartesi gece yarısı mumlar yakılır, ardından havai fişekler ve pazar günü kuzu ziyafeti gelir.',
      'Das größte Fest Griechenlands: Um Mitternacht am Karsamstag werden Kerzen entzündet, dann folgen Feuerwerk und am Sonntag ein Lammfestmahl.',
      'La mayor celebración de Grecia: a medianoche del Sábado Santo se encienden velas, con fuegos artificiales y cordero asado el domingo.',
      'Главный праздник Греции: в полночь Великой субботы зажигают свечи, затем салют, а в воскресенье — пир с ягнёнком.'
    ], tip: [
      'On Corfu, residents throw clay pots from balconies on Holy Saturday morning; book islands well ahead, as Greeks travel home.',
      'Korfu’da Kutsal Cumartesi sabahı balkonlardan toprak testiler atılır; Yunanlar memleketlerine gittiği için adaları erkenden ayırtın.',
      'Auf Korfu werfen Bewohner am Karsamstagmorgen Tonkrüge von den Balkonen; Inseln früh buchen, da viele Griechen heimreisen.',
      'En Corfú lanzan vasijas de barro desde los balcones el Sábado Santo por la mañana; reserve las islas pronto, los griegos viajan a casa.',
      'На Корфу в утро Великой субботы с балконов бросают глиняные горшки; острова бронируйте заранее — греки едут по домам.'
    ] },
    { i: 1, m: [6, 7, 8], place: 'Athína / Epídavros', about: [
      'Since 1955 ancient drama, opera and concerts have been staged in the Odeon of Herodes Atticus below the Acropolis and the 4th-century BC theatre of Epidaurus.',
      '1955’ten beri antik tiyatro, opera ve konserler Akropolis’in altındaki Herodes Atticus Odeonu’nda ve MÖ 4. yüzyıldan kalma Epidaurus tiyatrosunda sahnelenir.',
      'Seit 1955 werden antike Dramen, Opern und Konzerte im Odeon des Herodes Atticus unter der Akropolis und im Theater von Epidauros (4. Jh. v. Chr.) aufgeführt.',
      'Desde 1955 se representan teatro clásico, ópera y conciertos en el Odeón de Herodes Ático, bajo la Acrópolis, y en el teatro de Epidauro (s. IV a. C.).',
      'С 1955 года античные драмы, оперы и концерты идут в Одеоне Герода Аттического под Акрополем и в театре Эпидавра IV века до н. э.'
    ], tip: [
      'Epidaurus performances are in Greek with surtitles; buses run from Athens (about 2 hours) on show nights.',
      'Epidaurus gösterileri Yunanca ve altyazılıdır; gösteri gecelerinde Atina’dan (yaklaşık 2 saat) otobüs kalkar.',
      'Aufführungen in Epidauros sind griechisch mit Übertiteln; an Vorstellungsabenden fahren Busse ab Athen (etwa 2 Stunden).',
      'Las funciones de Epidauro son en griego con sobretítulos; las noches de función salen autobuses desde Atenas (unas 2 h).',
      'Спектакли в Эпидавре идут на греческом с титрами; в дни показов из Афин ходят автобусы (около 2 часов).'
    ] },
    { i: 2, m: [1, 2, 3], y27: ['2027-03-14'], place: 'Pátra', about: [
      'Greece’s largest carnival, running for weeks and ending with a grand parade on the last Sunday before Orthodox Lent.',
      'Yunanistan’ın en büyük karnavalı; haftalarca sürer ve Ortodoks Büyük Perhizi’nden önceki son pazar günü büyük geçitle biter.',
      'Der größte Karneval Griechenlands läuft wochenlang und endet mit der großen Parade am letzten Sonntag vor der orthodoxen Fastenzeit.',
      'El mayor carnaval de Grecia dura semanas y termina con el gran desfile el último domingo antes de la Cuaresma ortodoxa.',
      'Крупнейший карнавал Греции длится несколько недель и завершается большим парадом в последнее воскресенье перед православным постом.'
    ], tip: [
      'Anyone can join a parade group by registering in advance; the next day, Clean Monday, Greeks fly kites outdoors.',
      'Önceden kayıt yaptıran herkes bir geçit grubuna katılabilir; ertesi gün Temiz Pazartesi’de Yunanlar açık havada uçurtma uçurur.',
      'Mit vorheriger Anmeldung kann jeder in einer Paradegruppe mitlaufen; am folgenden „Reinen Montag“ lassen Griechen Drachen steigen.',
      'Cualquiera puede unirse a una comparsa inscribiéndose antes; al día siguiente, Lunes Limpio, los griegos vuelan cometas.',
      'Любой может записаться заранее и пройти в колонне; на следующий день, в Чистый понедельник, греки запускают воздушных змеев.'
    ] }
  ],
  AT: [
    { i: 0, m: [7, 8], place: 'Salzburg', about: [
      'Founded in 1920, Mozart’s home town hosts one of the world’s most prestigious opera, theatre and classical music festivals.',
      '1920’de kurulan festivalle Mozart’ın memleketi dünyanın en prestijli opera, tiyatro ve klasik müzik festivallerinden birine ev sahipliği yapar.',
      'Seit 1920 richtet Mozarts Heimatstadt eines der renommiertesten Opern-, Theater- und Klassikfestivals der Welt aus.',
      'Fundado en 1920, la ciudad natal de Mozart acoge uno de los festivales de ópera, teatro y música clásica más prestigiosos del mundo.',
      'Основанный в 1920 году фестиваль в родном городе Моцарта — один из самых престижных оперных, театральных и музыкальных фестивалей мира.'
    ], tip: [
      'The open-air "Jedermann" play on Cathedral Square is the signature event; free film screenings run on Kapitelplatz.',
      'Katedral Meydanı’ndaki açık hava “Jedermann” oyunu festivalin simgesidir; Kapitelplatz’da ücretsiz film gösterimleri yapılır.',
      'Das Wahrzeichen ist der „Jedermann“ auf dem Domplatz; auf dem Kapitelplatz gibt es kostenlose Filmvorführungen.',
      'La obra «Jedermann» al aire libre en la plaza de la Catedral es el emblema; en la Kapitelplatz hay proyecciones gratuitas.',
      'Символ фестиваля — спектакль «Имярек» под открытым небом на Соборной площади; на Капительплац — бесплатные показы.'
    ] },
    { i: 1, m: [1, 2], y27: ['2027-02-04'], place: 'Wien', about: [
      'Vienna hosts around 450 balls each winter; the Opera Ball, held on the last Thursday before Lent, is the highlight (UNESCO-listed ball culture).',
      'Viyana her kış yaklaşık 450 baloya ev sahipliği yapar; Büyük Perhiz’den önceki son perşembe yapılan Opera Balosu zirvedir (UNESCO listesindeki balo kültürü).',
      'Wien richtet jeden Winter rund 450 Bälle aus; Höhepunkt ist der Opernball am letzten Donnerstag vor der Fastenzeit (Ballkultur als UNESCO-Erbe).',
      'Viena organiza unos 450 bailes cada invierno; el cumbre es el Baile de la Ópera, el último jueves antes de Cuaresma (cultura del baile, UNESCO).',
      'Каждую зиму в Вене около 450 балов; главный — Оперный бал в последний четверг перед постом (бальная культура в списке ЮНЕСКО).'
    ], tip: [
      'Many balls sell affordable tickets to the public; evening dress is required, and a quick waltz lesson helps.',
      'Birçok balo halka uygun fiyatlı bilet satar; gece kıyafeti zorunludur, kısa bir vals dersi işe yarar.',
      'Viele Bälle verkaufen bezahlbare Karten an alle; Abendgarderobe ist Pflicht, ein kurzer Walzerkurs hilft.',
      'Muchos bailes venden entradas asequibles al público; se exige traje de gala y ayuda una clase rápida de vals.',
      'На многие балы продают недорогие билеты всем; вечерний наряд обязателен, пригодится быстрый урок вальса.'
    ] },
    { i: 2, m: [11, 12], about: [
      'From mid-November to Christmas, markets fill squares in Vienna, Salzburg and Innsbruck with punch, roasted chestnuts and handmade decorations.',
      'Kasım ortasından Noel’e kadar Viyana, Salzburg ve Innsbruck meydanları punç, közlenmiş kestane ve el yapımı süslerle dolar.',
      'Von Mitte November bis Weihnachten füllen Märkte die Plätze in Wien, Salzburg und Innsbruck mit Punsch, Maroni und Handgemachtem.',
      'De mediados de noviembre a Navidad, los mercados llenan las plazas de Viena, Salzburgo e Innsbruck de ponche, castañas y adornos artesanos.',
      'С середины ноября до Рождества площади Вены, Зальцбурга и Инсбрука заполняют ярмарки с пуншем, жареными каштанами и поделками.'
    ], tip: [
      'Vienna’s Rathausplatz market is the biggest, while Schönbrunn and Spittelberg are calmer; weekday evenings are less crowded.',
      'En büyük pazar Viyana’daki Rathausplatz’tır; Schönbrunn ve Spittelberg daha sakindir. Hafta içi akşamları daha az kalabalıktır.',
      'Der größte Markt ist am Wiener Rathausplatz, ruhiger sind Schönbrunn und Spittelberg; werktags abends ist weniger los.',
      'El mayor es el de la Rathausplatz de Viena; Schönbrunn y Spittelberg son más tranquilos; entre semana hay menos gente.',
      'Самая большая ярмарка — на Ратушной площади Вены, спокойнее в Шёнбрунне и Шпиттельберге; в будни вечером меньше людей.'
    ] }
  ],
  AE: [
    { i: 0, m: [12], d: '2', about: [
      'Marks the union of the emirates in 1971, with fireworks, light shows and cultural events across the country.',
      '1971’de emirliklerin birleşmesini anar; ülke genelinde havai fişekler, ışık gösterileri ve kültürel etkinlikler yapılır.',
      'Erinnert an die Vereinigung der Emirate 1971 – mit Feuerwerk, Lichtshows und Kulturveranstaltungen im ganzen Land.',
      'Conmemora la unión de los emiratos en 1971, con fuegos artificiales, espectáculos de luz y actos culturales en todo el país.',
      'День объединения эмиратов в 1971 году: фейерверки, световые шоу и культурные события по всей стране.'
    ], tip: [
      'It is usually a two-day public holiday, so hotels and desert camps book up with domestic travellers.',
      'Genelde iki günlük resmi tatildir; oteller ve çöl kampları yerli turistlerle dolar.',
      'Meist zwei Feiertage – Hotels und Wüstencamps sind mit einheimischen Reisenden ausgebucht.',
      'Suele ser un festivo de dos días, así que hoteles y campamentos en el desierto se llenan de turismo local.',
      'Обычно это два выходных дня, поэтому отели и пустынные лагеря заняты местными туристами.'
    ] },
    { i: 1, m: [12, 1], place: 'Dubai', about: [
      'Running since 1996 from mid-December to January, it combines citywide discounts with concerts, raffles and nightly fireworks.',
      '1996’dan beri aralık ortasından ocağa kadar sürer; şehir genelindeki indirimleri konserler, çekilişler ve her gece havai fişeklerle birleştirir.',
      'Seit 1996 von Mitte Dezember bis Januar: Rabatte in der ganzen Stadt plus Konzerte, Verlosungen und allabendliches Feuerwerk.',
      'Desde 1996, de mediados de diciembre a enero, combina descuentos en toda la ciudad con conciertos, sorteos y fuegos cada noche.',
      'С 1996 года с середины декабря по январь: скидки по всему городу, концерты, розыгрыши и ежевечерние фейерверки.'
    ], tip: [
      'The best discounts are on the opening weekend and in the final days; it overlaps with peak winter season, so book hotels early.',
      'En iyi indirimler açılış hafta sonu ve son günlerdedir; kış sezonunun zirvesine denk geldiği için oteli erken ayırtın.',
      'Die besten Rabatte gibt es am Eröffnungswochenende und in den letzten Tagen; es fällt in die Hochsaison, also früh buchen.',
      'Los mejores descuentos, el fin de semana inaugural y los últimos días; coincide con la temporada alta, reserve pronto.',
      'Лучшие скидки — в первые выходные и в последние дни; совпадает с пиком сезона, бронируйте отель заранее.'
    ] },
    { i: 2, m: [11, 12], place: 'Yas Island', about: [
      'Traditionally the season-closing race of Formula 1, held at sunset at Yas Marina Circuit since 2009.',
      'Formula 1 sezonunun geleneksel kapanış yarışı; 2009’dan beri Yas Marina Pisti’nde gün batımında yapılır.',
      'Traditionell das Saisonfinale der Formel 1, seit 2009 bei Sonnenuntergang auf dem Yas Marina Circuit.',
      'Tradicionalmente la carrera de cierre de la Fórmula 1, al atardecer en el circuito de Yas Marina desde 2009.',
      'Традиционно финальная гонка сезона «Формулы-1», с 2009 года проходит на закате на трассе Яс-Марина.'
    ], tip: [
      'A race ticket usually includes the after-race concerts; Yas Island hotels sell out, so consider staying in Dubai.',
      'Yarış bileti genelde yarış sonrası konserleri de kapsar; Yas Adası otelleri dolar, Dubai’de kalmayı düşünün.',
      'Das Rennticket schließt meist die Konzerte danach ein; Hotels auf Yas Island sind ausgebucht – Übernachtung in Dubai erwägen.',
      'La entrada suele incluir los conciertos posteriores; los hoteles de Yas se agotan, considere alojarse en Dubái.',
      'Билет на гонку обычно включает концерты после неё; отели на Яс распроданы — можно жить в Дубае.'
    ] }
  ],
  PT: [
    { i: 0, m: [6], d: '12–13', place: 'Lisboa', about: [
      'The feast of Lisbon’s popular saint turns the old quarters, especially Alfama, into a giant street party with grilled sardines.',
      'Lizbon’un sevilen azizinin bayramı, başta Alfama olmak üzere eski mahalleleri ızgara sardalyalı dev bir sokak partisine çevirir.',
      'Das Fest des Lissabonner Volksheiligen verwandelt die Altstadtviertel, vor allem die Alfama, in eine riesige Straßenparty mit gegrillten Sardinen.',
      'La fiesta del santo popular de Lisboa convierte los barrios antiguos, sobre todo Alfama, en una gran verbena con sardinas asadas.',
      'Праздник любимого святого Лиссабона превращает старые кварталы, особенно Алфаму, в огромную уличную вечеринку с жареными сардинами.'
    ], tip: [
      'The night of 12 June brings the parade on Avenida da Liberdade; the whole of June is festive.',
      '12 Haziran gecesi Avenida da Liberdade’de geçit yapılır; haziranın tamamı bayram havasındadır.',
      'In der Nacht zum 13. Juni zieht die Parade über die Avenida da Liberdade; der ganze Juni ist festlich.',
      'La noche del 12 de junio desfilan las marchas por la Avenida da Liberdade; todo junio es fiesta.',
      'В ночь на 13 июня по проспекту Свободы идёт шествие; весь июнь проходит празднично.'
    ] },
    { i: 1, m: [6], d: '23–24', place: 'Porto', about: [
      'Porto’s biggest night: people tap each other on the head with plastic hammers, then watch fireworks over the Douro at midnight.',
      'Porto’nun en büyük gecesi: insanlar birbirinin kafasına plastik çekiçlerle vurur, gece yarısı Douro üzerindeki havai fişekleri izler.',
      'Portos größte Nacht: Man klopft sich mit Plastikhämmern auf den Kopf und schaut um Mitternacht das Feuerwerk über dem Douro.',
      'La gran noche de Oporto: la gente se golpea con martillos de plástico y a medianoche ve los fuegos sobre el Duero.',
      'Главная ночь Порту: люди стучат друг друга по голове пластиковыми молоточками и в полночь смотрят салют над Дору.'
    ], tip: [
      'The best fireworks views are from the Ribeira and Gaia riverbanks; the party goes on until sunrise at the beach in Foz.',
      'Havai fişekleri izlemenin en iyi yeri Ribeira ve Gaia nehir kıyılarıdır; parti Foz sahilinde gün doğumuna kadar sürer.',
      'Die beste Sicht aufs Feuerwerk hat man von den Ufern in Ribeira und Gaia; gefeiert wird bis Sonnenaufgang am Strand von Foz.',
      'Las mejores vistas de los fuegos, desde las orillas de Ribeira y Gaia; la fiesta sigue hasta el amanecer en la playa de Foz.',
      'Лучший вид на салют — с набережных Рибейры и Гайи; праздник продолжается до рассвета на пляже в Фош.'
    ] },
    { i: 2, m: [5, 10], d: '13', place: 'Fátima', about: [
      'Hundreds of thousands of pilgrims gather on the anniversaries of the 1917 Marian apparitions, with a candlelight procession the night before.',
      '1917’deki Meryem görünmelerinin yıl dönümlerinde yüz binlerce hacı toplanır; bir önceki gece mum ışığında alay yapılır.',
      'Hunderttausende Pilger kommen zu den Jahrestagen der Marienerscheinungen von 1917; am Vorabend gibt es eine Lichterprozession.',
      'Cientos de miles de peregrinos acuden en los aniversarios de las apariciones marianas de 1917, con procesión de velas la víspera.',
      'В годовщины явлений Богородицы 1917 года собираются сотни тысяч паломников; накануне вечером проходит процессия со свечами.'
    ], tip: [
      'Fátima is about 90 minutes from Lisbon by bus; accommodation fills up, so a day trip is often easier.',
      'Fátima’ya Lizbon’dan otobüsle yaklaşık 90 dakikada gidilir; konaklama dolar, günübirlik gitmek çoğu zaman daha kolaydır.',
      'Fátima ist von Lissabon etwa 90 Minuten mit dem Bus entfernt; Unterkünfte sind voll, ein Tagesausflug ist oft einfacher.',
      'Fátima está a unos 90 minutos de Lisboa en autobús; el alojamiento se llena y suele ser más fácil ir en el día.',
      'До Фатимы около 90 минут на автобусе из Лиссабона; жильё занято, проще съездить на один день.'
    ] }
  ],
  NL: [
    { i: 0, m: [4], d: '27', about: [
      'The King’s birthday turns the country orange: street parties, canal-boat parties and a nationwide free market where anyone can sell second-hand goods.',
      'Kralın doğum günü ülkeyi turuncuya boyar: sokak partileri, kanal teknesi partileri ve herkesin ikinci el eşya satabildiği ülke çapında ücretsiz pazar.',
      'Der Geburtstag des Königs färbt das Land orange: Straßenfeste, Bootspartys auf den Grachten und ein landesweiter Flohmarkt, auf dem jeder verkaufen darf.',
      'El cumpleaños del rey tiñe el país de naranja: fiestas callejeras, barcos en los canales y un mercadillo nacional donde cualquiera puede vender.',
      'День рождения короля окрашивает страну в оранжевый: уличные вечеринки, лодки на каналах и всенародная барахолка, где продавать может каждый.'
    ], tip: [
      'Wear orange; if 27 April is a Sunday it moves to the 26th. Amsterdam’s centre is extremely crowded, Utrecht is a calmer alternative.',
      'Turuncu giyin; 27 Nisan pazara denk gelirse kutlama 26’sına kayar. Amsterdam merkezi çok kalabalıktır, Utrecht daha sakin bir alternatiftir.',
      'Orange tragen; fällt der 27. April auf einen Sonntag, wird am 26. gefeiert. Amsterdams Zentrum ist sehr voll, Utrecht ist ruhiger.',
      'Vista de naranja; si el 27 de abril cae en domingo, se celebra el 26. El centro de Ámsterdam está abarrotado; Utrecht es más tranquilo.',
      'Наденьте оранжевое; если 27 апреля выпадает на воскресенье, праздник переносят на 26-е. Центр Амстердама переполнен, в Утрехте спокойнее.'
    ] },
    { i: 1, m: [12, 1], place: 'Amsterdam', about: [
      'Each winter international artists create light installations along the canals, best seen from a boat or on the free walking route.',
      'Her kış uluslararası sanatçılar kanallar boyunca ışık enstalasyonları yapar; en iyi tekneyle ya da ücretsiz yürüyüş rotasında görülür.',
      'Jeden Winter gestalten internationale Künstler Lichtinstallationen an den Grachten – am schönsten vom Boot oder auf der kostenlosen Fußroute.',
      'Cada invierno artistas internacionales crean instalaciones de luz en los canales, mejor vistas en barco o en la ruta a pie gratuita.',
      'Каждую зиму художники со всего мира создают световые инсталляции вдоль каналов — лучше смотреть с лодки или по бесплатному пешему маршруту.'
    ], tip: [
      'Evening canal cruises sell out on weekends; go on a weekday after 7 pm.',
      'Akşam kanal turları hafta sonları tükenir; hafta içi saat 19.00’dan sonra gidin.',
      'Abendliche Grachtenfahrten sind am Wochenende ausverkauft; besser werktags nach 19 Uhr.',
      'Los cruceros nocturnos se agotan los fines de semana; vaya entre semana después de las 19:00.',
      'Вечерние круизы по каналам распроданы в выходные; лучше в будни после 19:00.'
    ] },
    { i: 2, m: [3, 4, 5], place: 'Lisse', about: [
      'Open for about eight weeks each spring, Keukenhof shows around seven million flowering bulbs, mainly tulips.',
      'Her bahar yaklaşık sekiz hafta açık kalan Keukenhof, başta lale olmak üzere yaklaşık yedi milyon çiçek soğanını sergiler.',
      'Der Keukenhof ist jedes Frühjahr etwa acht Wochen geöffnet und zeigt rund sieben Millionen Blumenzwiebeln, vor allem Tulpen.',
      'Abierto unas ocho semanas cada primavera, Keukenhof muestra unos siete millones de bulbos en flor, sobre todo tulipanes.',
      'Кёкенхоф открыт около восьми недель каждой весной: около семи миллионов цветущих луковичных, прежде всего тюльпанов.'
    ], tip: [
      'Tickets are timed and sold online only; mid-to-late April is usually peak tulip time.',
      'Biletler saat dilimli ve yalnızca internetten satılır; lalelerin en güzel zamanı genelde nisan ortası ile sonudur.',
      'Tickets mit Zeitfenster gibt es nur online; die Tulpenblüte ist meist Mitte bis Ende April am schönsten.',
      'Las entradas tienen franja horaria y solo se venden en línea; los tulipanes suelen estar en su mejor momento a mediados o finales de abril.',
      'Билеты с привязкой ко времени продаются только онлайн; пик цветения тюльпанов обычно в середине-конце апреля.'
    ] },
    { i: 3, m: [10], place: 'Amsterdam', about: [
      'The world’s biggest club festival and electronic music conference, with hundreds of events across the city over five days.',
      'Dünyanın en büyük kulüp festivali ve elektronik müzik konferansı; beş gün boyunca şehrin dört bir yanında yüzlerce etkinlik yapılır.',
      'Das größte Clubfestival und die größte Konferenz für elektronische Musik der Welt – fünf Tage, Hunderte Events in der ganzen Stadt.',
      'El mayor festival de clubes y congreso de música electrónica del mundo, con cientos de eventos por la ciudad durante cinco días.',
      'Крупнейший в мире клубный фестиваль и конференция электронной музыки: пять дней, сотни событий по всему городу.'
    ], tip: [
      'A festival pass covers many venues, but the big headline shows need separate tickets.',
      'Festival kartı birçok mekânı kapsar, ama büyük ana gösteriler için ayrı bilet gerekir.',
      'Der Festivalpass gilt für viele Locations, die großen Headliner-Shows brauchen aber eigene Tickets.',
      'El pase cubre muchos locales, pero los grandes conciertos estelares requieren entrada aparte.',
      'Фестивальный пропуск действует во многих клубах, но на главные шоу нужны отдельные билеты.'
    ] }
  ],
  HR: [
    { i: 0, m: [7, 8], place: 'Dubrovnik', about: [
      'Since 1950 theatre, classical music and dance have been staged in the old town’s squares, forts and palaces.',
      '1950’den beri eski şehrin meydanlarında, kalelerinde ve saraylarında tiyatro, klasik müzik ve dans gösterileri sahnelenir.',
      'Seit 1950 werden Theater, klassische Musik und Tanz auf Plätzen, Festungen und in Palästen der Altstadt aufgeführt.',
      'Desde 1950 se representan teatro, música clásica y danza en las plazas, fortalezas y palacios del casco antiguo.',
      'С 1950 года театр, классическая музыка и танец звучат на площадях, в крепостях и дворцах старого города.'
    ], tip: [
      'Lovrijenac Fortress performances are the most atmospheric; the city is crowded in summer, so stay outside the walls.',
      'En atmosferik gösteriler Lovrijenac Kalesi’ndedir; şehir yazın kalabalıktır, surların dışında kalmak daha rahattır.',
      'Am stimmungsvollsten sind die Aufführungen in der Festung Lovrijenac; im Sommer ist es voll – lieber außerhalb der Mauern wohnen.',
      'Las funciones en la fortaleza de Lovrijenac son las más especiales; en verano hay mucha gente, mejor alojarse fuera de las murallas.',
      'Самые атмосферные спектакли — в крепости Ловриенац; летом в городе людно, жить удобнее за стенами.'
    ] },
    { i: 1, m: [11, 12, 1], place: 'Zagreb', about: [
      'From late November to early January the whole centre turns into a Christmas market with ice skating, concerts and food stalls.',
      'Kasım sonundan ocak başına kadar şehir merkezinin tamamı buz pateni, konserler ve yemek tezgâhlarıyla bir Noel pazarına dönüşür.',
      'Von Ende November bis Anfang Januar wird das ganze Zentrum zum Weihnachtsmarkt mit Eislaufen, Konzerten und Essensständen.',
      'De finales de noviembre a principios de enero, todo el centro se convierte en mercado navideño con patinaje, conciertos y puestos de comida.',
      'С конца ноября до начала января весь центр превращается в рождественскую ярмарку с катком, концертами и едой.'
    ], tip: [
      'Don’t miss the Upper Town (Gornji Grad) and the illuminated Zrinjevac park; flights and hotels are cheaper than in western Europe.',
      'Yukarı Şehir’i (Gornji Grad) ve ışıklı Zrinjevac parkını kaçırmayın; uçuş ve oteller Batı Avrupa’dan daha ucuzdur.',
      'Die Oberstadt (Gornji Grad) und den beleuchteten Park Zrinjevac nicht verpassen; Flüge und Hotels sind günstiger als in Westeuropa.',
      'No se pierda la Ciudad Alta (Gornji Grad) ni el parque iluminado de Zrinjevac; vuelos y hoteles son más baratos que en Europa occidental.',
      'Обязательно загляните в Верхний город (Горни-Град) и в освещённый парк Зриневац; перелёты и отели дешевле, чем на западе Европы.'
    ] },
    { i: 2, m: [8], y27: ['2027-08-01'], place: 'Sinj', about: [
      'Held since 1717 to celebrate a victory over the Ottomans, horsemen in historic dress spear a small iron ring at full gallop.',
      '1717’den beri Osmanlılara karşı kazanılan bir zaferi kutlamak için yapılır; tarihi kıyafetli atlılar dörtnala giderken küçük bir demir halkayı mızrakla hedefler.',
      'Seit 1717 zur Feier eines Sieges über die Osmanen: Reiter in historischer Tracht treffen im vollen Galopp mit der Lanze einen kleinen Eisenring.',
      'Desde 1717 celebra una victoria sobre los otomanos: jinetes con trajes históricos ensartan con la lanza una pequeña anilla de hierro al galope.',
      'С 1717 года в честь победы над османами всадники в исторических костюмах на полном скаку поражают копьём маленькое железное кольцо.'
    ], tip: [
      'The main tournament is on the first Sunday of August; Sinj is an easy day trip from Split (about 40 minutes).',
      'Ana turnuva ağustosun ilk pazar günü yapılır; Sinj, Split’ten kolay bir günübirlik gezidir (yaklaşık 40 dakika).',
      'Das Hauptturnier ist am ersten Sonntag im August; Sinj ist ein einfacher Tagesausflug von Split (etwa 40 Minuten).',
      'El torneo principal es el primer domingo de agosto; Sinj es una excursión fácil desde Split (unos 40 minutos).',
      'Главный турнир — в первое воскресенье августа; Синь легко посетить за день из Сплита (около 40 минут).'
    ] }
  ],
  BR: [
    { i: 0, m: [2], y27: ['2027-02-06', '2027-02-10'], about: [
      'The days before Lent bring samba school parades in Rio’s Sambadrome, Salvador’s street trios and Olinda’s giant puppets.',
      'Büyük Perhiz öncesi günlerde Rio’daki Sambadrom’da samba okulu geçitleri, Salvador’da sokak müzik kamyonları ve Olinda’da dev kuklalar sokaklara çıkar.',
      'Vor der Fastenzeit ziehen Sambaschulen durchs Sambódromo in Rio, Musiktrucks durch Salvador und Riesenpuppen durch Olinda.',
      'Los días previos a la Cuaresma traen los desfiles de escolas de samba en el Sambódromo de Río, los tríos eléctricos de Salvador y los muñecos gigantes de Olinda.',
      'Перед Великим постом проходят парады школ самбы на Самбодроме Рио, музыкальные грузовики Салвадора и гигантские куклы Олинды.'
    ], tip: [
      'Free street parties (blocos) start weeks earlier; Rio hotels require 4–5-night minimum stays and prices triple.',
      'Ücretsiz sokak partileri (blocos) haftalar önce başlar; Rio otelleri 4–5 gece minimum konaklama ister ve fiyatlar üç katına çıkar.',
      'Kostenlose Straßenpartys (Blocos) beginnen Wochen vorher; Hotels in Rio verlangen 4–5 Nächte Mindestaufenthalt, die Preise verdreifachen sich.',
      'Los bloques callejeros gratuitos empiezan semanas antes; los hoteles de Río exigen 4–5 noches mínimas y triplican precios.',
      'Бесплатные уличные вечеринки (блоку) начинаются за недели; отели Рио требуют минимум 4–5 ночей, цены втрое выше.'
    ] },
    { i: 1, m: [6], about: [
      'June festivals for Saints Anthony, John and Peter with bonfires, square dancing (quadrilha) and corn-based dishes; biggest in Caruaru and Campina Grande.',
      'Aziz Antonio, Yahya ve Petrus için haziran şenlikleri; şenlik ateşleri, quadrilha dansı ve mısır yemekleriyle. En büyükleri Caruaru ve Campina Grande’dedir.',
      'Junifeste für die Heiligen Antonius, Johannes und Petrus mit Lagerfeuern, Quadrilha-Tänzen und Maisgerichten; am größten in Caruaru und Campina Grande.',
      'Fiestas de junio a San Antonio, San Juan y San Pedro con hogueras, quadrilha y platos de maíz; las mayores, en Caruaru y Campina Grande.',
      'Июньские праздники святых Антония, Иоанна и Петра: костры, танец квадрилья и блюда из кукурузы; крупнейшие — в Каруару и Кампина-Гранди.'
    ], tip: [
      'The peak night is São João on 23–24 June; checked shirts and straw hats are the dress code.',
      'Zirve gecesi 23–24 Haziran’daki São João’dur; kareli gömlek ve hasır şapka kıyafet kuralıdır.',
      'Höhepunkt ist die São-João-Nacht am 23./24. Juni; karierte Hemden und Strohhüte sind Pflicht.',
      'La noche cumbre es San Juan, 23–24 de junio; camisa de cuadros y sombrero de paja son el código.',
      'Главная ночь — Сан-Жуан 23–24 июня; дресс-код — клетчатые рубашки и соломенные шляпы.'
    ] },
    { i: 2, m: [12], d: '31', place: 'Rio de Janeiro', about: [
      'Around two million people dressed in white gather on Copacabana beach for one of the world’s biggest New Year fireworks shows.',
      'Beyaz giyinmiş yaklaşık iki milyon kişi dünyanın en büyük yılbaşı havai fişek gösterilerinden biri için Copacabana sahilinde toplanır.',
      'Rund zwei Millionen weiß gekleidete Menschen versammeln sich am Strand der Copacabana zu einem der größten Neujahrsfeuerwerke der Welt.',
      'Unos dos millones de personas vestidas de blanco se reúnen en Copacabana para uno de los mayores espectáculos de fuegos de Año Nuevo.',
      'Около двух миллионов человек в белом собираются на Копакабане ради одного из крупнейших новогодних салютов в мире.'
    ], tip: [
      'Wear white for luck and jump seven waves at midnight; the metro runs on special tickets and roads around the beach close.',
      'Şans için beyaz giyin ve gece yarısı yedi dalganın üstünden atlayın; metro özel biletle çalışır, sahil çevresindeki yollar kapanır.',
      'Für Glück Weiß tragen und um Mitternacht über sieben Wellen springen; die Metro fährt mit Sondertickets, Straßen am Strand sind gesperrt.',
      'Vista de blanco y salte siete olas a medianoche; el metro funciona con billetes especiales y se cortan las calles junto a la playa.',
      'Наденьте белое на удачу и в полночь перепрыгните семь волн; метро работает по специальным билетам, дороги у пляжа перекрыты.'
    ] }
  ],
  IN: [
    { i: 0, m: [10, 11], lunar: true, about: [
      'The Hindu festival of lights celebrates the victory of light over darkness with oil lamps, fireworks, sweets and the worship of Lakshmi.',
      'Hinduların ışık bayramı; ışığın karanlığa zaferini kandiller, havai fişekler, tatlılar ve Lakşmi’ye dualarla kutlar.',
      'Das hinduistische Lichterfest feiert den Sieg des Lichts über die Dunkelheit mit Öllampen, Feuerwerk, Süßigkeiten und der Verehrung Lakshmis.',
      'La fiesta hindú de las luces celebra la victoria de la luz sobre la oscuridad con lámparas de aceite, fuegos, dulces y el culto a Lakshmi.',
      'Индуистский праздник огней — победа света над тьмой: масляные светильники, фейерверки, сладости и почитание Лакшми.'
    ], tip: [
      'Jaipur and Varanasi are especially beautiful; trains and flights are fully booked as people travel home, and air quality in Delhi drops.',
      'Jaipur ve Varanasi özellikle güzeldir; insanlar memleketlerine gittiği için tren ve uçuşlar dolar, Delhi’de hava kalitesi düşer.',
      'Besonders schön in Jaipur und Varanasi; Züge und Flüge sind ausgebucht, weil alle heimfahren, und in Delhi sinkt die Luftqualität.',
      'Jaipur y Varanasi son especialmente bonitas; trenes y vuelos se llenan con la gente que vuelve a casa y empeora el aire de Delhi.',
      'Особенно красиво в Джайпуре и Варанаси; поезда и рейсы заняты, а качество воздуха в Дели ухудшается.'
    ] },
    { i: 1, m: [3], lunar: true, about: [
      'The spring festival of colours, when people throw coloured powder and water at each other; Mathura and Vrindavan celebrate for a week.',
      'İnsanların birbirine renkli toz ve su attığı bahar renk festivali; Mathura ve Vrindavan’da bir hafta boyunca kutlanır.',
      'Das Frühlingsfest der Farben, bei dem man sich mit Farbpulver und Wasser bewirft; in Mathura und Vrindavan wird eine Woche gefeiert.',
      'La fiesta primaveral de los colores, en la que se lanzan polvos de colores y agua; en Mathura y Vrindavan dura una semana.',
      'Весенний праздник красок: люди осыпают друг друга цветным порошком и обливают водой; в Матхуре и Вриндаване празднуют неделю.'
    ], tip: [
      'Wear old clothes, oil your skin and hair beforehand, and protect your phone; solo female travellers are safer in organised groups.',
      'Eski kıyafet giyin, cildinizi ve saçınızı önceden yağlayın, telefonunuzu koruyun; yalnız seyahat eden kadınlar organize gruplarla daha güvende olur.',
      'Alte Kleidung tragen, Haut und Haare vorher einölen und das Handy schützen; allein reisende Frauen sind in organisierten Gruppen sicherer.',
      'Use ropa vieja, aplíquese aceite en piel y pelo antes y proteja el móvil; las mujeres que viajan solas están más seguras en grupos.',
      'Наденьте старую одежду, заранее смажьте кожу и волосы маслом, защитите телефон; путешествующим в одиночку женщинам безопаснее в группе.'
    ] },
    { i: 2, m: [9, 10], lunar: true, place: 'Kolkata / Gujarat', about: [
      'Nine nights honouring the goddess Durga: Kolkata builds elaborate pandals (UNESCO), while Gujarat dances garba all night.',
      'Tanrıça Durga’yı onurlandıran dokuz gece: Kolkata gösterişli pandallar kurar (UNESCO), Gujarat ise bütün gece garba dansı yapar.',
      'Neun Nächte zu Ehren der Göttin Durga: Kolkata baut prächtige Pandals (UNESCO), in Gujarat wird die ganze Nacht Garba getanzt.',
      'Nueve noches en honor a la diosa Durga: Calcuta levanta espectaculares pandals (UNESCO) y Guyarat baila garba toda la noche.',
      'Девять ночей в честь богини Дурги: в Калькутте строят пышные пандалы (ЮНЕСКО), а в Гуджарате всю ночь танцуют гарбу.'
    ], tip: [
      'In Kolkata, go pandal-hopping late at night when queues are shorter; garba venues often sell day passes to visitors.',
      'Kolkata’da kuyruklar kısalınca gece geç saatte pandal turu yapın; garba mekânları ziyaretçilere genelde günlük giriş satar.',
      'In Kolkata spät nachts von Pandal zu Pandal ziehen, wenn die Schlangen kürzer sind; Garba-Veranstaltungen verkaufen oft Tagespässe.',
      'En Calcuta recorra los pandals de madrugada, cuando hay menos cola; los recintos de garba suelen vender pases diarios.',
      'В Калькутте обходите пандалы поздно ночью, когда очереди короче; на гарбу часто продают однодневные пропуска.'
    ] }
  ],
  CN: [
    { i: 0, m: [1, 2], y27: ['2027-02-06'], lunar: true, about: [
      'China’s most important holiday welcomes the lunar new year with family reunions, red decorations, dumplings, fireworks and lion dances.',
      'Çin’in en önemli bayramı; ay takvimine göre yeni yılı aile buluşmaları, kırmızı süsler, mantı, havai fişekler ve aslan danslarıyla karşılar.',
      'Chinas wichtigstes Fest begrüßt das neue Mondjahr mit Familientreffen, roten Dekorationen, Teigtaschen, Feuerwerk und Löwentänzen.',
      'La fiesta más importante de China recibe el año lunar con reuniones familiares, adornos rojos, jiaozi, fuegos y danzas del león.',
      'Главный праздник Китая: встреча лунного Нового года с семейными застольями, красными украшениями, пельменями, салютом и танцем льва.'
    ], tip: [
      'Avoid travelling inside China during the week around it: trains sell out and many shops close; temple fairs in Beijing are worth seeing.',
      'Bayramın olduğu hafta Çin içinde seyahatten kaçının: trenler dolar, birçok dükkân kapanır. Pekin’deki tapınak panayırları görülmeye değer.',
      'In der Woche darum Reisen innerhalb Chinas meiden: Züge sind ausgebucht, viele Geschäfte zu; die Tempelmärkte in Peking lohnen sich.',
      'Evite viajar dentro de China esa semana: los trenes se agotan y muchas tiendas cierran; merecen la pena las ferias de templos de Pekín.',
      'В эту неделю лучше не ездить по Китаю: поезда раскуплены, многие магазины закрыты; стоит посмотреть храмовые ярмарки Пекина.'
    ] },
    { i: 1, m: [5, 6], lunar: true, about: [
      'Held on the fifth day of the fifth lunar month in memory of the poet Qu Yuan, with dragon boat races and sticky rice dumplings (zongzi).',
      'Ay takviminin beşinci ayının beşinci günü şair Qu Yuan anısına yapılır; ejderha teknesi yarışları ve yapışkan pirinç bohçaları (zongzi) ile kutlanır.',
      'Am fünften Tag des fünften Mondmonats zur Erinnerung an den Dichter Qu Yuan – mit Drachenbootrennen und Klebreistaschen (Zongzi).',
      'El quinto día del quinto mes lunar, en memoria del poeta Qu Yuan, con regatas de botes dragón y bolas de arroz glutinoso (zongzi).',
      'Пятый день пятого лунного месяца в память о поэте Цюй Юане: гонки драконьих лодок и рисовые клёцки цзунцзы.'
    ], tip: [
      'Watch races in Hong Kong, Guangzhou or on Hangzhou’s waterways; it is a three-day public holiday.',
      'Yarışları Hong Kong, Guangzhou ya da Hangzhou su yollarında izleyin; üç günlük resmi tatildir.',
      'Rennen sieht man in Hongkong, Guangzhou oder auf den Wasserwegen Hangzhous; es gibt drei freie Tage.',
      'Vea las regatas en Hong Kong, Cantón o en los canales de Hangzhou; son tres días festivos.',
      'Гонки можно увидеть в Гонконге, Гуанчжоу или на каналах Ханчжоу; три выходных дня.'
    ] },
    { i: 2, m: [9, 10], lunar: true, about: [
      'On the full moon of the eighth lunar month, families gather to admire the moon, light lanterns and share mooncakes.',
      'Ay takviminin sekizinci ayının dolunayında aileler toplanıp ayı seyreder, fenerler yakar ve ay çöreği paylaşır.',
      'Beim Vollmond des achten Mondmonats bewundern Familien gemeinsam den Mond, zünden Laternen an und teilen Mondkuchen.',
      'En la luna llena del octavo mes lunar, las familias contemplan la luna, encienden farolillos y comparten pasteles de luna.',
      'В полнолуние восьмого лунного месяца семьи любуются луной, зажигают фонари и едят лунные пряники.'
    ], tip: [
      'In some years it falls next to the 1 October National Day holiday, creating the busy "Golden Week" — book well ahead.',
      'Bazı yıllar 1 Ekim Ulusal Gün tatiline bitişik gelir ve yoğun “Altın Hafta”yı oluşturur; çok önceden rezervasyon yapın.',
      'In manchen Jahren grenzt es an den Nationalfeiertag am 1. Oktober und es entsteht die volle „Goldene Woche“ – früh buchen.',
      'Algunos años coincide con la fiesta nacional del 1 de octubre y forma la «Semana Dorada»: reserve con mucha antelación.',
      'В некоторые годы праздник примыкает к Дню образования КНР 1 октября, образуя «золотую неделю» — бронируйте заранее.'
    ] }
  ],
  KR: [
    { i: 0, m: [1, 2], y27: ['2027-02-06'], lunar: true, about: [
      'The Korean Lunar New Year: families perform ancestral rites, bow to elders (sebae), eat rice-cake soup and play traditional games.',
      'Kore Ay Yeni Yılı: aileler atalara saygı törenleri yapar, büyüklerin önünde eğilir (sebae), pirinç keki çorbası yer ve geleneksel oyunlar oynar.',
      'Das koreanische Mondneujahr: Familien ehren die Ahnen, verbeugen sich vor den Älteren (Sebae), essen Reiskuchensuppe und spielen traditionelle Spiele.',
      'El Año Nuevo lunar coreano: las familias honran a los antepasados, hacen reverencias a los mayores (sebae), toman sopa de pastel de arroz y juegan a juegos tradicionales.',
      'Корейский лунный Новый год: обряды почитания предков, поклоны старшим (себэ), суп с рисовыми клёцками и традиционные игры.'
    ], tip: [
      'It is a three-day holiday; Seoul empties out and palaces such as Gyeongbokgung often hold free events and folk games.',
      'Üç günlük tatildir; Seul boşalır, Gyeongbokgung gibi saraylar genelde ücretsiz etkinlikler ve halk oyunları düzenler.',
      'Drei freie Tage; Seoul leert sich, und Paläste wie Gyeongbokgung bieten oft kostenlose Veranstaltungen und Volksspiele.',
      'Son tres días festivos; Seúl se vacía y palacios como Gyeongbokgung suelen ofrecer actividades y juegos tradicionales gratuitos.',
      'Три выходных дня; Сеул пустеет, а во дворцах вроде Кёнбоккуна часто проводят бесплатные мероприятия и народные игры.'
    ] },
    { i: 1, m: [9, 10], lunar: true, about: [
      'Korea’s harvest thanksgiving on the full moon of the eighth lunar month, when families visit ancestral graves and eat songpyeon rice cakes.',
      'Ay takviminin sekizinci ayının dolunayında yapılan Kore hasat şükran bayramı; aileler ata mezarlarını ziyaret eder ve songpyeon pirinç keki yer.',
      'Koreas Erntedankfest am Vollmond des achten Mondmonats, an dem Familien die Ahnengräber besuchen und Songpyeon-Reiskuchen essen.',
      'El día de acción de gracias coreano, en la luna llena del octavo mes lunar: se visitan las tumbas de los antepasados y se comen pasteles songpyeon.',
      'Корейский праздник урожая в полнолуние восьмого лунного месяца: семьи посещают могилы предков и едят рисовые пирожки сонпхён.'
    ], tip: [
      'Many restaurants and shops close for three days and highways are jammed; plan city sightseeing rather than road trips.',
      'Birçok restoran ve dükkân üç gün kapalıdır, otoyollar tıkanır; karayolu gezisi yerine şehir gezisi planlayın.',
      'Viele Restaurants und Geschäfte schließen für drei Tage, die Autobahnen sind verstopft – lieber Städte als Überlandfahrten planen.',
      'Muchos restaurantes y tiendas cierran tres días y las autopistas se colapsan; planee visitas urbanas, no viajes por carretera.',
      'Многие рестораны и магазины закрыты три дня, трассы забиты — лучше гулять по городу, чем ехать по стране.'
    ] },
    { i: 2, m: [4, 5], lunar: true, place: 'Seoul', about: [
      'A lantern festival dating back over 1,000 years (UNESCO), with a parade of thousands of glowing lanterns through central Seoul.',
      '1.000 yılı aşkın geçmişe sahip fener festivali (UNESCO); binlerce parlayan fenerle Seul merkezinde geçit yapılır.',
      'Ein über 1.000 Jahre altes Laternenfest (UNESCO) mit einem Umzug Tausender leuchtender Laternen durch das Zentrum Seouls.',
      'Un festival de farolillos de más de 1.000 años (UNESCO), con un desfile de miles de faroles por el centro de Seúl.',
      'Фестиваль фонарей с тысячелетней историей (ЮНЕСКО): шествие тысяч светящихся фонарей по центру Сеула.'
    ], tip: [
      'The parade runs from Dongdaemun to Jogyesa Temple; the next day there is a street fair where you can make your own lantern.',
      'Geçit Dongdaemun’dan Jogyesa Tapınağı’na uzanır; ertesi gün kendi fenerinizi yapabileceğiniz bir sokak şenliği olur.',
      'Der Umzug führt von Dongdaemun zum Jogyesa-Tempel; am Tag danach gibt es ein Straßenfest, auf dem man eigene Laternen basteln kann.',
      'El desfile va de Dongdaemun al templo Jogyesa; al día siguiente hay una feria callejera donde puede hacer su propio farolillo.',
      'Шествие идёт от Тондэмуна до храма Чогеса; на следующий день — уличная ярмарка, где можно сделать свой фонарь.'
    ] }
  ]
};

const IDX: Record<string, number> = { en: 0, tr: 1, de: 2, es: 3, ru: 4 };
const LOC: Record<string, string> = { en: 'en-GB', tr: 'tr-TR', de: 'de-DE', es: 'es-ES', ru: 'ru-RU' };

const monthName = (m: number, lang: string, ctx: 'standalone' | 'format' = 'standalone'): string => {
  try {
    const d = new Date(Date.UTC(2027, m - 1, 15));
    if (ctx === 'format') {
      // "14 July" biçiminde ay adı (Rusça'da tamlama hâli: "14 июля")
      return new Intl.DateTimeFormat(LOC[lang] || 'en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' }).formatToParts(d).find((p) => p.type === 'month')?.value || '';
    }
    const s = new Intl.DateTimeFormat(LOC[lang] || 'en-GB', { month: 'long', timeZone: 'UTC' }).format(d);
    return s.charAt(0).toUpperCase() + s.slice(1);
  } catch { return String(m); }
};

const fmtIso = (iso: string, lang: string): string => {
  try { return new Intl.DateTimeFormat(LOC[lang] || 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso + 'T00:00:00Z')); } catch { return iso; }
};

/** "Ne zaman" metni: sabit gün → "14 Temmuz", aylar → "Temmuz – Ağustos", + 2027 tarihi. */
export function festivalWhen(e: FestivalGuideEntry, lang: string): string {
  const L = (en: string, tr: string, de: string, es: string, ru: string) => [en, tr, de, es, ru][IDX[lang] ?? 0];
  let base: string;
  if (e.d && e.m.length === 1) base = lang === 'en' ? `${e.d} ${monthName(e.m[0], lang, 'format')}` : lang === 'de' ? `${e.d.replace(/(\d+)$/, '$1.')} ${monthName(e.m[0], lang, 'format')}`.replace(/^(\d+)–/, '$1.–') : lang === 'es' ? `${e.d} de ${monthName(e.m[0], lang, 'format')}` : `${e.d} ${monthName(e.m[0], lang, 'format')}`;
  else if (e.d) base = e.m.map((m) => (lang === 'es' ? `${e.d} de ${monthName(m, lang, 'format')}` : lang === 'de' ? `${e.d}. ${monthName(m, lang, 'format')}` : `${e.d} ${monthName(m, lang, 'format')}`)).join(L(' & ', ' ve ', ' und ', ' y ', ' и '));
  else base = e.m.length > 1 ? `${monthName(e.m[0], lang)} – ${monthName(e.m[e.m.length - 1], lang)}` : monthName(e.m[0], lang);
  if (e.lunar) base += L(' (lunar calendar, changes yearly)', ' (ay takvimi, her yıl değişir)', ' (Mondkalender, jährlich wechselnd)', ' (calendario lunar, cambia cada año)', ' (по лунному календарю, дата меняется)');
  if (e.y27) {
    let r = fmtIso(e.y27[0], lang);
    if (e.y27[1]) {
      try {
        const f = new Intl.DateTimeFormat(LOC[lang] || 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) as Intl.DateTimeFormat & { formatRange?: (a: Date, b: Date) => string };
        r = f.formatRange ? f.formatRange(new Date(e.y27[0] + 'T00:00:00Z'), new Date(e.y27[1] + 'T00:00:00Z')) : `${r} – ${fmtIso(e.y27[1], lang)}`;
      } catch { r = `${r} – ${fmtIso(e.y27[1], lang)}`; }
    }
    base += ` · 2027: ${e.lunar ? L('approx. ', 'yaklaşık ', 'ca. ', 'aprox. ', 'ок. ') : ''}${r}`;
  }
  return base;
}

export interface FestivalCardData { name: string; when: string; place?: string; about: string; tip: string; months: number[] }

/** Ülkenin festival listesini (sitedeki adlarla) rehber bilgisiyle eşleştirir; rehberde olmayanlar `rest` olarak döner. */
export function getFestivalGuide(code: string, lang: string, names: string[]): { cards: FestivalCardData[]; rest: string[] } {
  const g = FESTIVAL_GUIDE[code.toUpperCase()];
  if (!g || !names?.length) return { cards: [], rest: names || [] };
  const k = IDX[lang] ?? 0;
  const used = new Set<number>();
  const cards: FestivalCardData[] = [];
  for (const e of g) {
    if (!names[e.i]) continue;
    used.add(e.i);
    cards.push({ name: names[e.i], when: festivalWhen(e, lang), place: e.place, about: e.about[k], tip: e.tip[k], months: e.m });
  }
  return { cards, rest: names.filter((_, i) => !used.has(i)) };
}

// ── Festival takvimi rehberi (/:lang/info/festival_calendar) ─────────────────────────────
// Festival adları, ülke sayfalarındaki doğrulanmış adlardan derleme sırasında üretilen festivalNames.json'dan gelir.
import NAMES from './festivalNames.json';
import { getCountryName } from './passportData';

export const FESTIVAL_COUNTRIES = Object.keys(FESTIVAL_GUIDE);

interface CalSection { h: string; list: string[] }
export interface FestivalCalendarText { title: string; short: string; metaDesc: string; answer: string; sections: CalSection[]; faq: { q: string; a: string }[] }

export function buildFestivalCalendar(lang: string): FestivalCalendarText {
  const L = (en: string, tr: string, de: string, es: string, ru: string) => [en, tr, de, es, ru][IDX[lang] ?? 0];
  const names = ((NAMES as Record<string, Record<string, string[]>>)[lang] || (NAMES as Record<string, Record<string, string[]>>).en) || {};
  const byMonth: string[][] = Array.from({ length: 12 }, () => []);
  const faq: { q: string; a: string }[] = [];
  for (const [code, list] of Object.entries(FESTIVAL_GUIDE)) {
    const country = getCountryName(code, lang);
    for (const e of list) {
      const n = names[code]?.[e.i];
      if (!n) continue;
      byMonth[e.m[0] - 1].push(`${n} — ${country}${e.place ? ` (${e.place})` : ''}: ${festivalWhen(e, lang)}`);
      if (e.y27 && faq.length < 12) {
        const short = n.replace(/\s*\(.*$/, '').replace(/\s*[:–].*$/, '').trim();
        faq.push({
          q: L(`When is ${short} in 2027?`, `${short} 2027’de ne zaman?`, `Wann ist ${short} 2027?`, `¿Cuándo es ${short} en 2027?`, `Когда ${short} в 2027 году?`),
          a: `${n} (${country}): ${festivalWhen(e, lang)}. ${e.tip[IDX[lang] ?? 0]}`
        });
      }
    }
  }
  const total = byMonth.reduce((s, x) => s + x.length, 0);
  const monthH = (i: number) => {
    try { const s = new Intl.DateTimeFormat(LOC[lang] || 'en-GB', { month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2027, i, 15))); return s.charAt(0).toUpperCase() + s.slice(1); } catch { return String(i + 1); }
  };
  return {
    title: L('Festival calendar 2027: the world’s best festivals month by month', '2027 Festival Takvimi: Dünyanın en ünlü festivalleri ay ay', 'Festivalkalender 2027: die besten Feste der Welt Monat für Monat', 'Calendario de festivales 2027: las mejores fiestas del mundo mes a mes', 'Календарь фестивалей 2027: лучшие праздники мира по месяцам'),
    short: L('Festival calendar', 'Festival takvimi', 'Festivalkalender', 'Calendario de festivales', 'Календарь фестивалей'),
    metaDesc: L(
      `Plan your trip around ${total} famous festivals: Songkran, Oktoberfest, Rio Carnival, La Tomatina, Día de Muertos and more — dates for 2027, history and travel tips.`,
      `Seyahatinizi ${total} ünlü festivale göre planlayın: Songkran, Oktoberfest, Rio Karnavalı, La Tomatina, Ölüler Günü ve daha fazlası — 2027 tarihleri, tarihçe ve gezgin ipuçları.`,
      `Planen Sie Ihre Reise rund um ${total} berühmte Feste: Songkran, Oktoberfest, Karneval in Rio, La Tomatina, Día de Muertos und mehr – Termine 2027, Geschichte und Reisetipps.`,
      `Planifique su viaje en torno a ${total} fiestas famosas: Songkran, Oktoberfest, Carnaval de Río, La Tomatina, Día de Muertos y más: fechas de 2027, historia y consejos.`,
      `Планируйте поездку под ${total} знаменитых праздников: Сонгкран, Октоберфест, карнавал в Рио, Ла Томатина, День мёртвых и другие — даты 2027 года, история и советы.`
    ),
    answer: L(
      'Many of the world’s biggest festivals fall on fixed dates (San Fermín 6–14 July, Bastille Day 14 July), while others follow the lunar calendar or Easter and move every year. Below, each festival is listed under the month it starts, with its 2027 date where it is already fixed. Hotels near major festivals fill up months ahead, so book early.',
      'Dünyanın en büyük festivallerinin bir kısmı sabit tarihlidir (San Fermín 6–14 Temmuz, Bastille Günü 14 Temmuz); diğerleri ay takvimine ya da Paskalya’ya bağlıdır ve her yıl değişir. Aşağıda her festival başladığı ayın altında, tarihi belli olanlarda 2027 tarihiyle listelenmiştir. Büyük festivallerin çevresindeki oteller aylar önce dolar; erken rezervasyon yapın.',
      'Viele große Feste haben feste Termine (San Fermín 6.–14. Juli, Nationalfeiertag in Frankreich 14. Juli), andere folgen dem Mondkalender oder Ostern und wandern jedes Jahr. Unten steht jedes Fest unter seinem Startmonat, mit dem Termin 2027, sofern er feststeht. Hotels bei großen Festen sind Monate vorher ausgebucht – früh buchen.',
      'Muchas de las grandes fiestas tienen fecha fija (San Fermín, 6–14 de julio; 14 de julio en Francia), mientras que otras siguen el calendario lunar o la Pascua y cambian cada año. Abajo aparece cada fiesta en el mes en que empieza, con su fecha de 2027 cuando ya se conoce. Los hoteles cercanos se llenan con meses de antelación: reserve pronto.',
      'Многие крупные праздники проходят в фиксированные даты (Сан-Фермин 6–14 июля, День взятия Бастилии 14 июля), другие зависят от лунного календаря или Пасхи и меняются каждый год. Ниже каждый праздник указан в месяце начала, с датой 2027 года, если она уже известна. Отели рядом с крупными праздниками заполняются за месяцы — бронируйте заранее.'
    ),
    sections: byMonth.map((list, i) => ({ h: monthH(i), list })).filter((s) => s.list.length),
    faq
  };
}
