/**
 * Vizamigo - Seyahat & Göçebe İstihbarat Veri Tabanı
 * 199 ülke için priz/voltaj, musluk suyu içilebilirliği, bahşiş kültürü,
 * Tax-Free oranları, turist tuzakları ve eSIM/veri rehberi.
 */

export interface CountryTravelIntelligence {
  code: string;
  countryName: string;
  plugs: {
    types: string[]; // e.g. ['C', 'F'] or ['G'] or ['A', 'B']
    voltage: string; // e.g. '230V'
    frequency: string; // e.g. '50Hz'
    needsAdapterFromTR: boolean; // Türkiye tipi (C/F) fişler için adaptör gerekiyor mu?
    socketDesc: string;
  };
  waterAndHealth: {
    tapWaterSafe: boolean; // 🚰 Güvenli mi?
    tapWaterDesc: string;
    vaccines: string[];
    insuranceRequired: boolean;
    emergencyAmbulance: string;
  };
  tipping: {
    custom: string;
    standardPercent: number; // 0, 10, 15, 20
    rule: 'mandatory' | 'expected' | 'round_up' | 'optional' | 'forbidden';
    note: string;
  };
  taxFree: {
    vatRefundPercent: string;
    minSpend: string;
    customsNote: string;
  };
  connectivity: {
    esimRecommended: boolean;
    avgGbPriceUsd: string;
    topCarriers: string[];
    airportSimTrapWarning: string;
  };
  touristScams: {
    title: string;
    desc: string;
    tip: string;
  }[];
}

export const CURATED_TRAVEL_INTELLIGENCE: Record<string, Partial<CountryTravelIntelligence>> = {
  // ==========================================
  // TÜRKİYE
  // ==========================================
  TR: {
    code: 'TR',
    countryName: 'Türkiye',
    plugs: {
      types: ['C', 'F'],
      voltage: '230V',
      frequency: '50Hz',
      needsAdapterFromTR: false,
      socketDesc: 'Standart Avrupa iki yuvarlak uçlu Schuko priz tipi.'
    },
    waterAndHealth: {
      tapWaterSafe: false,
      tapWaterDesc: 'Büyük şehirlerde arıtılmış olsa da boru hatları sebebiyle genel olarak şişelenmiş veya damacana su tüketilmesi önerilir.',
      vaccines: ['Rutin Aşılar (Tetanos, Difteri)'],
      insuranceRequired: false,
      emergencyAmbulance: '112'
    },
    tipping: {
      custom: 'Restoranlarda hesabın %5-10’u kadar bahşiş bırakılması adettendir.',
      standardPercent: 10,
      rule: 'expected',
      note: 'Lüks restoranlarda kuver veya servis ücreti hesaba dahil edilmiş olabilir; fişi kontrol edin.'
    },
    taxFree: {
      vatRefundPercent: '%8 - %18',
      minSpend: '1.000 TL',
      customsNote: 'Havalimanı gümrüğünde faturanın kaşelenmesi gerekmektedir.'
    },
    connectivity: {
      esimRecommended: true,
      avgGbPriceUsd: '$1.20 - $2.50',
      topCarriers: ['Turkcell', 'Vodafone', 'Türk Telekom'],
      airportSimTrapWarning: 'Havalimanı geliş salonundaki SIM bayileri şehir merkezindeki şubelere kıyasla 2-3 kat daha pahalıdır.'
    },
    touristScams: [
      {
        title: 'Taksi Taksimetre Hilesi',
        desc: 'Taksicinin taksimetreyi açmayıp fahiş sabit ücret istemesi veya gece tarifesi bahanesi uydurması.',
        tip: 'BiTaksi veya Uber uygulaması kullanın; binmeden önce taksimetrenin sıfırlandığından emin olun.'
      },
      {
        title: 'Ayakkabı Boyacısı Fırça Düşürme',
        desc: 'Önünüzde yürüyen boyacının fırçasını düşürmesi; fırçayı verdiğinizde teşekkür bahanesiyle zorla boyayıp yüksek ücret talep etmesi.',
        tip: 'Fırçayı yerden alsanız bile kesinlikle ayakkabınızı boyatmayın ve kibarca uzaklaşın.'
      },
      {
        title: '"Hadi Bir Şeyler İçelim" Bar Hesabı Tuzağı',
        desc: 'İstiklal ve Sultanahmet civarında arkadaş canlısı görünen birinin sizi bir bara davet edip masaya astronomik hesap getirilmesi.',
        tip: 'Sokakta tanıştığınız yabancıların kulüp veya bar davetlerini kesinlikle kabul etmeyin.'
      }
    ]
  },

  // ==========================================
  // İTALYA
  // ==========================================
  IT: {
    code: 'IT',
    countryName: 'İtalya',
    plugs: {
      types: ['C', 'F', 'L'],
      voltage: '230V',
      frequency: '50Hz',
      needsAdapterFromTR: false,
      socketDesc: 'C ve F tipi standart Türk fişleri doğrudan uyumludur. İnce 3 delikli Tip L prizler de mevcuttur.'
    },
    waterAndHealth: {
      tapWaterSafe: true,
      tapWaterDesc: 'Musluk suyu mükemmel kalitededir. Roma’daki 2.500’den fazla tarihi "Nasone" çeşmesinden güvenle buz gibi su doldurabilirsiniz.',
      vaccines: ['Rutin Aşılar'],
      insuranceRequired: true,
      emergencyAmbulance: '112 / 118'
    },
    tipping: {
      custom: 'Bahşiş zorunlu değildir. Hesapta genellikle "Coperto" (ekmek ve masa örtüsü ücreti, 1.5-3€) yer alır.',
      standardPercent: 5,
      rule: 'round_up',
      note: 'İyi hizmet için hesabı yukarı yuvarlamak veya masaya 1-2€ madeni para bırakmak yeterlidir.'
    },
    taxFree: {
      vatRefundPercent: '%11 - %15',
      minSpend: '70.01 €',
      customsNote: 'İtalya’da minimum Tax-Free harcama eşiği 2024 itibarıyla 70.01 Euro’ya düşürülmüştür.'
    },
    connectivity: {
      esimRecommended: true,
      avgGbPriceUsd: '$0.80 - $1.50',
      topCarriers: ['TIM', 'Vodafone Italia', 'Iliad', 'WindTre'],
      airportSimTrapWarning: 'Iliad otomatlarından veya şehir içi mağazalardan 10€ civarına 100+ GB paketler alınabilir.'
    },
    touristScams: [
      {
        title: 'Kolezyum Sahte Gladyatör Fotoğrafı',
        desc: 'Kolezyum çevresinde gladyatör kostümlü kişilerin zorla yanınıza gelip fotoğraf çektirdikten sonra 20-50€ talep etmesi.',
        tip: 'Fotoğraf çekilmeden önce fiyatı netleştirin veya bu kişilerle göz teması kurmadan uzaklaşın.'
      },
      {
        title: 'Restoranda Menüsüz "Günün Balığı" Kazığı',
        desc: 'Menüde gramajla fiyatlandırılan balık veya deniz mahsulünün masaya gelip yüzlerce Euro fatura çıkarılması.',
        tip: 'Fiyatı gramajlı olan ürünlerde sipariş vermeden önce porsiyonun tam fiyatını yazılı olarak teyit edin.'
      }
    ]
  },

  // ==========================================
  // JAPONYA
  // ==========================================
  JP: {
    code: 'JP',
    countryName: 'Japonya',
    plugs: {
      types: ['A', 'B'],
      voltage: '100V',
      frequency: '50Hz / 60Hz',
      needsAdapterFromTR: true,
      socketDesc: 'Amerikan tipi 2 düz uçlu Tip A prizler kullanılır. Türkiye fişleri için MUTLAKA adaptör gerekir. 100V düşüktür; cihazınızın 100-240V desteklediğinden emin olun.'
    },
    waterAndHealth: {
      tapWaterSafe: true,
      tapWaterDesc: 'Dünyanın en temiz ve en sıkı denetlenen musluk sularından biridir. Otellerde ve parklarda musluktan doğrudan içebilirsiniz.',
      vaccines: ['Rutin Aşılar'],
      insuranceRequired: false,
      emergencyAmbulance: '119'
    },
    tipping: {
      custom: 'Bahşiş KESİNLİKLE verilmez. Bahşiş bırakmak kaba ve hakaret niteliğinde kabul edilir.',
      standardPercent: 0,
      rule: 'forbidden',
      note: 'Masada para unutursanız garson paranızı iade etmek için sokakta peşinizden koşacaktır!'
    },
    taxFree: {
      vatRefundPercent: '%10',
      minSpend: '5.000 JPY (~35 $)',
      customsNote: 'Mağazada pasaportunuzu gösterdiğinizde %10 tüketim vergisi anında faturadan düşülür; havalimanında sıraya girmenize gerek kalmaz.'
    },
    connectivity: {
      esimRecommended: true,
      avgGbPriceUsd: '$1.50 - $2.50',
      topCarriers: ['NTT Docomo', 'SoftBank', 'au by KDDI'],
      airportSimTrapWarning: 'Japonya’da fiziksel turist SIM kartları genellikle yalnızca internet sağlar (sesli arama yoktur). eSIM en pratik çözümdür.'
    },
    touristScams: [
      {
        title: 'Shinjuku / Kabukicho Bar "Hahuta" Tuzağı',
        desc: 'Gece hayatı bölgelerinde sokakta sizi "uygun fiyatlı içki ve kızlar" vaadiyle yönlendiren çığırtkanların kulüplerinde binlerce dolarlık hesap kesilmesi.',
        tip: 'Sokaktaki çığırtkanların (kyakuhiki) davet ettiği hiçbir mekana girmeyin.'
      }
    ]
  },

  // ==========================================
  // AMERİKA BİRLEŞİK DEVLETLERİ (ABD)
  // ==========================================
  US: {
    code: 'US',
    countryName: 'Amerika Birleşik Devletleri',
    plugs: {
      types: ['A', 'B'],
      voltage: '120V',
      frequency: '60Hz',
      needsAdapterFromTR: true,
      socketDesc: '2 düz uçlu Tip A ve topraklı Tip B prizler kullanılır. Adaptör ZORUNLUDUR. Voltaj 120V’dur.'
    },
    waterAndHealth: {
      tapWaterSafe: true,
      tapWaterDesc: 'Genel olarak musluk suyu içilebilir ve restoranlarda "tap water" ücretsiz buzlu servis edilir.',
      vaccines: ['Rutin Aşılar'],
      insuranceRequired: true,
      emergencyAmbulance: '911'
    },
    tipping: {
      custom: 'Bahşiş KÜLTÜREL OLARAK ZORUNLUDUR (%18 - %22). Garson maaşları bahşişe endekslidir.',
      standardPercent: 18,
      rule: 'mandatory',
      note: 'Restoranlarda pos cihazında otomatik %18, %20, %22 seçenekleri çıkar. Taksilerde %15-20, barmenlere içki başına 1-2$ verilir.'
    },
    taxFree: {
      vatRefundPercent: '%0 (Federal KDV İadesi Yoktur)',
      minSpend: 'Uygulanamaz',
      customsNote: 'ABD’de federal KDV yoktur; eyalet satış vergisi (State Sales Tax) uygulanır ve turistlere iade edilmez (Louisiana ve Teksas hariç).'
    },
    connectivity: {
      esimRecommended: true,
      avgGbPriceUsd: '$2.00 - $4.00',
      topCarriers: ['T-Mobile', 'Verizon', 'AT&T'],
      airportSimTrapWarning: 'ABD havalimanlarında yerel SIM kart satışı çok kısıtlı ve pahalıdır. Seyahatten önce eSIM yüklemek şarttır.'
    },
    touristScams: [
      {
        title: 'Times Square Sahte CD / Kostümlü Karakter Tuzağı',
        desc: 'New York Times Square’de birinin elinize zorla "kendi müzik CD’sini" tutuşturup imzaladıktan sonra 20$ istemesi veya kostümlü çizgi film karakterlerinin fotoğraftan sonra bahşiş için taciz etmesi.',
        tip: 'Elinize uzatılan hiçbir şeyi almayın, ellerinizi cebinizde tutun ve "No, thank you" diyerek yürümeye devam edin.'
      }
    ]
  },

  // ==========================================
  // BİRLEŞİK KRALLIK (İNGİLTERE)
  // ==========================================
  GB: {
    code: 'GB',
    countryName: 'Birleşik Krallık',
    plugs: {
      types: ['G'],
      voltage: '230V',
      frequency: '50Hz',
      needsAdapterFromTR: true,
      socketDesc: '3 büyük dikdörtgen pimli İngiliz tipi Tip G prizler kullanılır. Türk fişleri için MUTLAKA adaptör gerekir.'
    },
    waterAndHealth: {
      tapWaterSafe: true,
      tapWaterDesc: 'İngiltere’de musluk suyu son derece güvenli ve içilebilirdir. Bütün restoranlarda "tap water" yasal olarak ücretsiz verilmek zorundadır.',
      vaccines: ['Rutin Aşılar'],
      insuranceRequired: false,
      emergencyAmbulance: '999 / 112'
    },
    tipping: {
      custom: 'Restoran hesaplarına genellikle %12.5 "Optional Service Charge" otomatik eklenir.',
      standardPercent: 12.5,
      rule: 'expected',
      note: 'Eğer faturada servis ücreti varsa ek bahşiş bırakmanıza gerek yoktur. Hizmetten memnun kalmadıysanız çıkartılmasını isteyebilirsiniz.'
    },
    taxFree: {
      vatRefundPercent: '%0 (Brexit Sonrası Kaldırıldı)',
      minSpend: 'Uygulanamaz',
      customsNote: 'Birleşik Krallık’ta Brexit sonrası turistlere mağaza içi Tax-Free KDV iadesi kaldırılmıştır.'
    },
    connectivity: {
      esimRecommended: true,
      avgGbPriceUsd: '$1.00 - $2.00',
      topCarriers: ['EE', 'Vodafone UK', 'O2', 'Three'],
      airportSimTrapWarning: 'Londra Heathrow havalimanında SIM kart otomatları 30-40£ isterken şehir içindeki süpermarketlerde 10£’dur.'
    },
    touristScams: [
      {
        title: 'Westminster Köprüsü "Bul Karayı Al Parayı" (Three-Card Monte)',
        desc: 'Köprü üzerinde kutu veya kart oyunu oynatan şebeke. Seyirciler gibi davranan suç ortakları kazanıyormuş gibi yapar, katılan turist tüm parasını kaybeder.',
        tip: 'Asla durup izlemeyin; etrafınızdaki kalabalık yankesicilerden oluşur.'
      }
    ]
  },

  // ==========================================
  // FRANSA
  // ==========================================
  FR: {
    code: 'FR',
    countryName: 'Fransa',
    plugs: {
      types: ['C', 'E'],
      voltage: '230V',
      frequency: '50Hz',
      needsAdapterFromTR: false,
      socketDesc: 'C ve E tipi prizler kullanılır. Türkiye fişleri (Schuko) doğrudan uyumludur; adaptör gerekmez.'
    },
    waterAndHealth: {
      tapWaterSafe: true,
      tapWaterDesc: 'Musluk suyu içilebilir. Restoranlarda sürahi su istemek için "Une carafe d’eau, s’il vous plaît" demeniz yeterlidir (ücretsizdir).',
      vaccines: ['Rutin Aşılar'],
      insuranceRequired: true,
      emergencyAmbulance: '112 / 15'
    },
    tipping: {
      custom: 'Fransız yasalarına göre servis ücreti (%15) faturaya dahildir (Service Compris).',
      standardPercent: 5,
      rule: 'round_up',
      note: 'Memnun kaldıysanız masaya 1-2€ madeni para bırakmak hoş bir jesttir (Pourboire).'
    },
    taxFree: {
      vatRefundPercent: '%12',
      minSpend: '100.01 €',
      customsNote: 'Aynı mağazadan aynı gün içinde yapılan 100.01€ üzeri harcamalarda Pablo barkodlu Tax-Free formu verilir.'
    },
    connectivity: {
      esimRecommended: true,
      avgGbPriceUsd: '$1.00 - $2.00',
      topCarriers: ['Orange', 'SFR', 'Bouygues Telecom', 'Free Mobile'],
      airportSimTrapWarning: 'Free Mobile mağazalarındaki otomatlardan 10€’ya 100+ GB internet paketi alınabilir.'
    },
    touristScams: [
      {
        title: 'Montmartre / Sacré-Cœur İp Bileklik Tuzağı',
        desc: 'Merdivenlerde önünüzü kesip parmağınıza zorla renkli ip bağlamaya başlayan kişiler; bağladıktan sonra 10-20€ vermeden bırakmazlar.',
        tip: 'Ellerinizi cebinizde tutun ve temas etmelerine izin vermeden kesin bir ses tonuyla "Non!" diyerek geçin.'
      },
      {
        title: 'Eyfel Kulesi Sahte İmza / Dilekçe Kampanyası',
        desc: 'İşitme engelliler derneği adına bağış topladığını iddia eden kişilerin imza attırdıktan sonra zorla para istemesi veya siz imzalarken çantanızı soyması.',
        tip: 'Pano taşıyan hiç kimseyle durup konuşmayın, kesinlikle imza atmayın.'
      }
    ]
  },

  // ==========================================
  // TAYLAND
  // ==========================================
  TH: {
    code: 'TH',
    countryName: 'Tayland',
    plugs: {
      types: ['A', 'B', 'C', 'O'],
      voltage: '220V',
      frequency: '50Hz',
      needsAdapterFromTR: false,
      socketDesc: 'Çok amaçlı hibrit prizler kullanılır. Hem Amerikan (düz) hem Avrupa/Türk (yuvarlak 2 pimli) fişler uyar.'
    },
    waterAndHealth: {
      tapWaterSafe: false,
      tapWaterDesc: 'Musluk suyu KESİNLİKLE içilmez. Diş fırçalarken bile şişe suyu tercih edilmelidir. Sokakta buzlu içecek alırken içi delik silindir buzları (fabrika buzu) tercih edin.',
      vaccines: ['Hepatit A', 'Tetanos', 'Tifo'],
      insuranceRequired: false,
      emergencyAmbulance: '1669'
    },
    tipping: {
      custom: 'Geleneksel olarak bahşiş yoktur; ancak turistik yerlerde %10 yaygınlaşmıştır.',
      standardPercent: 10,
      rule: 'optional',
      note: 'Sokak lezzetlerinde bahşiş beklenmez. Masaj salonlarında masözlere 50-100 Baht (~1.5-3$) bahşiş verilmesi adettendir.'
    },
    taxFree: {
      vatRefundPercent: '%4 - %7',
      minSpend: '2.000 THB',
      customsNote: 'Havalimanında "VAT Refund for Tourists" ofisine gitmeden önce ürünlerin faturasını ve PP10 formunu hazır bulundurun.'
    },
    connectivity: {
      esimRecommended: true,
      avgGbPriceUsd: '$0.70 - $1.20',
      topCarriers: ['AIS', 'TrueMove H', 'DTAC'],
      airportSimTrapWarning: '7-Eleven marketlerde veya eSIM sağlayıcılarında sınırsız 5G paketleri 200-300 Baht civarındadır.'
    },
    touristScams: [
      {
        title: '"Büyük Saray Bugün Kapalı" Tuk-Tuk Tuzağı',
        desc: 'Bangkok Grand Palace yakınında şık giyimli birinin "Saray tapınma saatinde kapalı, sizi açık olan başka tapınağa ve terziye götüreyim" demesi.',
        tip: 'Saray haftanın her günü açıktır! Yoldan geçen hiç kimseye sarayın açık olup olmadığını sormayın, doğrudan resmi bilet gişesine gidin.'
      },
      {
        title: 'Jetski Hasar Şantajı (Phuket & Pattaya)',
        desc: 'Kiraladığınız jetskiyi teslim ederken önceden var olan çizikler için yüzlerce dolar tamir parası talep edilmesi.',
        tip: 'Jetski kiralamadan önce her açısının fotoğrafını ve videosunu kiralayanın yanında çekin.'
      }
    ]
  },

  // ==========================================
  // ENDONEZYA (BALİ)
  // ==========================================
  ID: {
    code: 'ID',
    countryName: 'Endonezya (Bali)',
    plugs: {
      types: ['C', 'F'],
      voltage: '230V',
      frequency: '50Hz',
      needsAdapterFromTR: false,
      socketDesc: 'Türkiye ile tamamen aynı standart iki yuvarlak pimli Tip C ve F prizler kullanılır.'
    },
    waterAndHealth: {
      tapWaterSafe: false,
      tapWaterDesc: '"Bali Belly" (mide enfeksiyonu) yaşamamak için musluk suyunu ASLA içmeyin; diş fırçalarken dahi şişe suyu kullanın.',
      vaccines: ['Hepatit A', 'Tetanos', 'Tifo'],
      insuranceRequired: false,
      emergencyAmbulance: '118'
    },
    tipping: {
      custom: 'Bahşiş zorunlu değildir ancak hizmet sektöründe 10.000 - 20.000 IDR (~0.60 - 1.20$) çok takdir edilir.',
      standardPercent: 10,
      rule: 'optional',
      note: 'Kafe ve restoran faturalarında genellikle %5-10 servis ücreti ve %10 hükümet vergisi (PB1) otomatik eklenir.'
    },
    taxFree: {
      vatRefundPercent: '%11',
      minSpend: '5.000.000 IDR (~320 $)',
      customsNote: 'Yalnızca "VAT Refund for Tourists" logolu büyük AVM mağazalarında geçerlidir.'
    },
    connectivity: {
      esimRecommended: true,
      avgGbPriceUsd: '$0.50 - $1.00',
      topCarriers: ['Telkomsel', 'Indosat Ooredoo', 'XL Axiata'],
      airportSimTrapWarning: 'Endonezya’da yabancı telefonların 90 günden uzun kalması durumunda gümrükte IMEI kaydı yaptırılması zorunludur.'
    },
    touristScams: [
      {
        title: 'Hileli Döviz Büroları (Money Changer Scam)',
        desc: 'Kuta ve Seminyak sokaklarındaki küçük kulübelerde resmi kurun üzerinde yüksek kur vadedip, parayı masanın altına düşürerek eksik saymaları.',
        tip: 'Yalnızca klimalı, güvenlikli ve "Authorized Money Changer / No Commission" tabelalı resmi banka/ofisleri kullanın.'
      },
      {
        title: 'Uluwatu Tapınağı Maymun Çetesi',
        desc: 'Eğitilmiş maymunların gözlük ve telefonunuzu kapması; yerel rehberlerin meyve vererek eşyanızı geri almak için sizden bahşiş istemesi.',
        tip: 'Tapınağa girerken güneş gözlüğü, şapka ve parıltılı takılarınızı mutlaka çantanıza kilitleyin.'
      }
    ]
  },

  // ==========================================
  // BİRLEŞİK ARAP EMİRLİKLERİ (DUBAİ)
  // ==========================================
  AE: {
    code: 'AE',
    countryName: 'Birleşik Arap Emirlikleri (Dubai)',
    plugs: {
      types: ['G'],
      voltage: '230V',
      frequency: '50Hz',
      needsAdapterFromTR: true,
      socketDesc: 'İngiliz tipi 3 dikdörtgen pimli Tip G priz kullanılır. Adaptör gerekir (otellerin çoğunda adaptör ödünç verilir).'
    },
    waterAndHealth: {
      tapWaterSafe: true,
      tapWaterDesc: 'Arıtılmış deniz suyudur ve teknik olarak içilebilir; ancak tadı sebebiyle yerel halk ve turistler şişe suyunu tercih eder.',
      vaccines: ['Rutin Aşılar'],
      insuranceRequired: true,
      emergencyAmbulance: '998 / 999'
    },
    tipping: {
      custom: 'Restoranlarda hesabın %10-15’i kadar bahşiş verilmesi standart bir beklentidir.',
      standardPercent: 10,
      rule: 'expected',
      note: 'Taksilerde para üstü genellikle bırakılır veya en yakın 5-10 AED’ye yuvarlanır.'
    },
    taxFree: {
      vatRefundPercent: '%5 (Planet Tax Free)',
      minSpend: '250 AED (~68 $)',
      customsNote: 'Dubai Mall gibi yerlerde harcama anında faturaya dijital Planet Tax Free etiketi yapıştırılır.'
    },
    connectivity: {
      esimRecommended: true,
      avgGbPriceUsd: '$3.00 - $6.00',
      topCarriers: ['du', 'Etisalat (e&)'],
      airportSimTrapWarning: 'Dubai Havalimanı pasaport kontrolünde tüm turistlere ücretsiz 1 GB geçerli turist SIM kartı hediye edilir.'
    },
    touristScams: [
      {
        title: 'Altın Çarşısı (Gold Souk) Sahte Çanta ve Saat Satıcıları',
        desc: 'Çarşıda yanınıza yanaşıp sizi arka sokaklardaki apartman dairelerine "Rolex, Gucci" replikaları için davet eden çığırtkanlar.',
        tip: 'Kesinlikle ara sokaklara gitmeyin; ana caddedeki resmi dükkanlardan alışveriş yapın.'
      }
    ]
  },

  // ==========================================
  // GÜRCİSTAN
  // ==========================================
  GE: {
    code: 'GE',
    countryName: 'Gürcistan',
    plugs: {
      types: ['C', 'F'],
      voltage: '220V',
      frequency: '50Hz',
      needsAdapterFromTR: false,
      socketDesc: 'Standart Avrupa iki yuvarlak uçlu Schuko priz tipi. Türkiye ile tamamen uyumlu.'
    },
    waterAndHealth: {
      tapWaterSafe: true,
      tapWaterDesc: 'Kafkas dağ kaynaklarından gelen sular Tiflis ve Batum’da musluktan güvenle içilebilir.',
      vaccines: ['Rutin Aşılar'],
      insuranceRequired: true,
      emergencyAmbulance: '112'
    },
    tipping: {
      custom: 'Restoranlarda faturaya genellikle %10 ila %18 servis bedeli otomatik eklenir.',
      standardPercent: 10,
      rule: 'round_up',
      note: 'Faturada servis bedeli yazıyorsa ek bahşiş gerekmez; ancak garsona doğrudan 5-10 GEL nakit vermek memnuniyeti gösterir.'
    },
    taxFree: {
      vatRefundPercent: '%15',
      minSpend: '200 GEL (~75 $)',
      customsNote: 'Sarp Sınır Kapısı veya Tiflis Havalimanı gümrüğünde form onaylatılabilir.'
    },
    connectivity: {
      esimRecommended: true,
      avgGbPriceUsd: '$0.80 - $1.50',
      topCarriers: ['MagtiCom', 'Silknet', 'Cellfie'],
      airportSimTrapWarning: 'MagtiCom en geniş dağ kapsama alanına sahiptir; sınır kapısında veya şehir merkezinde e-SIM 5-10 GEL’dir.'
    },
    touristScams: [
      {
        title: 'Tiflis Meydanı Taksi Kazığı',
        desc: 'Havalimanı veya tren garında taksimetre açmayıp 5 katı ücret talep eden korsan taksiciler.',
        tip: 'Yalnızca Yandex Go veya Bolt uygulaması çağırın; sokaktan taksiye binmeyin.'
      }
    ]
  },

  // ==========================================
  // MISIR
  // ==========================================
  EG: {
    code: 'EG',
    countryName: 'Mısır',
    plugs: {
      types: ['C', 'F'],
      voltage: '220V',
      frequency: '50Hz',
      needsAdapterFromTR: false,
      socketDesc: 'Standart Avrupa iki yuvarlak uçlu Schuko priz tipi. Türkiye fişleri uyar.'
    },
    waterAndHealth: {
      tapWaterSafe: false,
      tapWaterDesc: 'Musluk suyunu ASLA içmeyin. Kapalı şişe su tüketin, kapağın güvenlik bandının açık olmadığından emin olun.',
      vaccines: ['Hepatit A', 'Tetanos', 'Tifo'],
      insuranceRequired: true,
      emergencyAmbulance: '123'
    },
    tipping: {
      custom: '"Bahşiş" (Baksheesh) Mısır kültürünün ayrılmaz bir parçasıdır; tuvalet görevlisinden bavul taşıyana herkes bekler.',
      standardPercent: 10,
      rule: 'mandatory',
      note: 'Yanınızda her zaman bol miktarda küçük Mısır Lirası (10, 20, 50 EGP) banknot bulundurun.'
    },
    taxFree: {
      vatRefundPercent: '%14',
      minSpend: '1.500 EGP',
      customsNote: 'Gümrükte onay süreci uzun sürebilir; havalimanına erken gidin.'
    },
    connectivity: {
      esimRecommended: true,
      avgGbPriceUsd: '$1.00 - $2.00',
      topCarriers: ['Vodafone Egypt', 'Orange Egypt', 'Etisalat Misr', 'WE'],
      airportSimTrapWarning: 'Kahire Havalimanı geliş salonundaki resmi operatör stantlarından pasaportla fiziksel SIM almak güvenlidir.'
    },
    touristScams: [
      {
        title: 'Piramitlerde Deve / Fayton Şantajı',
        desc: 'Deveye binmek için 50 EGP anlaşıp, indirmek için çölde 500-1000 EGP veya 50$ talep etmeleri.',
        tip: 'Yalnızca Piramit gişesindeki resmi hükümet tarifeli deve ve at arabalarını kullanın veya yürümeyi tercih edin.'
      },
      {
        title: 'Sahte Müze / Bilet Gişesi Görevlisi',
        desc: 'Girişte resmi görevli rozeti takmış gibi yapıp "Giriş diğer tarafta, oraya gidelim" diyerek sizi papirüs dükkanına götürenler.',
        tip: 'Yalnızca turnikelerin önündeki resmi tabelaları takip edin.'
      }
    ]
  },

  // ==========================================
  // ALMANYA
  // ==========================================
  DE: {
    code: 'DE',
    countryName: 'Almanya',
    plugs: {
      types: ['C', 'F'],
      voltage: '230V',
      frequency: '50Hz',
      needsAdapterFromTR: false,
      socketDesc: 'Schuko F tipi ve C tipi prizler. Türkiye ile %100 birebir uyumlu.'
    },
    waterAndHealth: {
      tapWaterSafe: true,
      tapWaterDesc: 'Musluk suyu ("Leitungswasser") son derece saf ve içilebilirdir.',
      vaccines: ['Rutin Aşılar'],
      insuranceRequired: true,
      emergencyAmbulance: '112'
    },
    tipping: {
      custom: 'Hesabı %5-10 yukarı yuvarlamak (Trinkgeld) standarttır.',
      standardPercent: 10,
      rule: 'round_up',
      note: 'Ödeme yaparken parayı masaya bırakmak yerine garsona doğrudan ödemek istediğiniz toplam tutarı söylersiniz (örn: hesap 27€ ise "30€ bitte").'
    },
    taxFree: {
      vatRefundPercent: '%19 (%7 gıda/kitap)',
      minSpend: '50.01 €',
      customsNote: 'Havalimanı gümrük ofisinde (Zoll) damga basıldıktan sonra Global Blue veya Planet masalarından iade alınır.'
    },
    connectivity: {
      esimRecommended: true,
      avgGbPriceUsd: '$1.50 - $2.50',
      topCarriers: ['Telekom (T-Mobile)', 'Vodafone', 'O2'],
      airportSimTrapWarning: 'Almanya’da fiziksel SIM kart aktivasyonu için pasaportla video kimlik doğrulaması (Video-Ident) gerekir. Bu sebeple eSIM çok daha zahmetsizdir.'
    },
    touristScams: [
      {
        title: 'Berlin Alexanderplatz Yankesicilik & Oyunlar',
        desc: 'Kalabalık meydanlarda dikkat dağıtıp cüzdan ve telefon çalınması.',
        tip: 'Değerli eşyalarınızı ön ceplerinizde veya fermuarlı bel çantasında taşıyın.'
      }
    ]
  }
};

/**
 * Fallback resolver: Generates realistic travel intelligence for any country in the world
 * based on its regional standard if not explicitly listed in curated table.
 */
export function getCountryTravelIntelligence(countryCode: string, countryName?: string): CountryTravelIntelligence {
  const code = countryCode.toUpperCase();
  const curated = CURATED_TRAVEL_INTELLIGENCE[code];

  if (curated && curated.plugs && curated.waterAndHealth && curated.tipping && curated.taxFree && curated.connectivity) {
    return curated as CountryTravelIntelligence;
  }

  // European standard fallback
  const isEurope = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'GR', 'HU', 'IE', 'LV', 'LT', 'LU', 'MT', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'CH', 'NO', 'IS'].includes(code);
  const isAmericas = ['CA', 'MX', 'BR', 'AR', 'CO', 'CL', 'PE', 'UY', 'PY', 'EC', 'BO', 'CR', 'PA', 'DO', 'CU'].includes(code);
  const isAsia = ['KR', 'CN', 'VN', 'PH', 'MY', 'SG', 'IN', 'PK', 'BD', 'LK', 'NP', 'KZ', 'UZ', 'KG'].includes(code);
  const isMiddleEast = ['SA', 'QA', 'KW', 'BH', 'OM', 'JO', 'LB', 'IQ', 'IL'].includes(code);

  let plugs = {
    types: ['C', 'F'],
    voltage: '230V',
    frequency: '50Hz',
    needsAdapterFromTR: false,
    socketDesc: 'Standart iki yuvarlak pimli Avrupa tipi priz.'
  };

  let waterAndHealth = {
    tapWaterSafe: isEurope,
    tapWaterDesc: isEurope ? 'Musluk suyu içilebilir ve temizdir.' : 'Musluk suyu yerine şişelenmiş kapalı su tüketilmesi tavsiye edilir.',
    vaccines: ['Rutin Aşılar (Tetanos, Difteri)'],
    insuranceRequired: isEurope,
    emergencyAmbulance: '112'
  };

  let tipping = {
    custom: isAmericas ? 'Hesabın %15-20’si kadar bahşiş beklenir.' : isEurope ? 'Hesabı %5-10 yukarı yuvarlamak yeterlidir.' : 'Bahşiş zorunlu değildir, iyi hizmet için isteğe bağlıdır.',
    standardPercent: isAmericas ? 18 : isEurope ? 10 : 5,
    rule: (isAmericas ? 'mandatory' : isEurope ? 'round_up' : 'optional') as CountryTravelIntelligence['tipping']['rule'],
    note: 'Hizmet bedeli faturaya dahil edilmiş olabilir; fişi kontrol edin.'
  };

  let taxFree = {
    vatRefundPercent: isEurope ? '%10 - %20' : '%5 - %12',
    minSpend: isEurope ? '50 - 100 €' : '50 $',
    customsNote: 'Havalimanında Tax-Free formunun gümrük memuruna kaşeletilmesi gerekmektedir.'
  };

  let connectivity = {
    esimRecommended: true,
    avgGbPriceUsd: isEurope ? '$1.00 - $2.00' : '$1.50 - $3.00',
    topCarriers: ['Ulusal Lider Operatör', 'İkincil Operatör'],
    airportSimTrapWarning: 'Havalimanı stantları şehir merkezine göre daha pahalıdır; seyahatten önce eSIM kurmak daha ekonomiktir.'
  };

  let touristScams = [
    {
      title: 'Taksi Fazla Ücret Tuzağı',
      desc: 'Taksimetre açılmaması veya yolun uzatılması.',
      tip: 'Lisanslı taksileri veya araç çağırma uygulamalarını (Uber, Bolt, Grab) tercih edin.'
    },
    {
      title: 'Kalabalık Turistik Alanlarda Yankesicilik',
      desc: 'Toplu taşıma ve ana meydanlarda dikkat dağıtarak eşya çalınması.',
      tip: 'Cüzdan ve telefonunuzu fermuarlı ön ceplerinizde bulundurun.'
    }
  ];

  if (isAmericas) {
    plugs = {
      types: ['A', 'B'],
      voltage: '110V - 127V',
      frequency: '60Hz',
      needsAdapterFromTR: true,
      socketDesc: '2 düz uçlu Amerikan tipi prizler. Türkiye fişleri için adaptör gerekir.'
    };
  } else if (isMiddleEast) {
    plugs = {
      types: ['G'],
      voltage: '230V',
      frequency: '50Hz',
      needsAdapterFromTR: true,
      socketDesc: '3 dikdörtgen pimli İngiliz tipi prizler yaygındır.'
    };
  }

  return {
    code,
    countryName: countryName || code,
    plugs,
    waterAndHealth,
    tipping,
    taxFree,
    connectivity,
    touristScams
  };
}
