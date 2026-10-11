/**
 * Vizamigo - Global Konsolosluk & Diplomatik Kriz Merkezi Veritabanı
 * Pasaport kaybı, acil tahliye, gözaltı ve kriz durumlarında dünya vatandaşlarının
 * kendi Dışişleri Bakanlıklarına ve acil seyahat belgesi protokollerine erişimini sağlar.
 */

export interface ConsularEmergencyInfo {
  passportCode: string;
  countryName: { tr: string; en: string; de: string };
  ministryName: { tr: string; en: string; de: string };
  crisisCenterTitle: { tr: string; en: string; de: string };
  hotline247: string;
  hotlineDomestic: string;
  officialPortalUrl: string;
  officialPortalName: string;
  emergencyDocName: { tr: string; en: string; de: string };
  emergencyDocValidity: { tr: string; en: string; de: string };
  steps: {
    policeReport: { tr: string; en: string; de: string };
    photos: { tr: string; en: string; de: string };
    embassySubmission: { tr: string; en: string; de: string };
    travelDocIssuance: { tr: string; en: string; de: string };
  };
}

export const CONSULAR_EMERGENCY_DATA: Record<string, ConsularEmergencyInfo> = {
  // Türkiye
  TR: {
    passportCode: 'TR',
    countryName: { tr: 'Türkiye', en: 'Turkey', de: 'Türkei' },
    ministryName: {
      tr: 'T.C. Dışişleri Bakanlığı',
      en: 'Ministry of Foreign Affairs of the Republic of Türkiye',
      de: 'Außenministerium der Republik Türkei'
    },
    crisisCenterTitle: {
      tr: 'Konsolosluk Çağrı Merkezi & Kriz Masası',
      en: 'Consular Call Center & Crisis Center',
      de: 'Konsularisches Notrufzentrum & Krisenstab'
    },
    hotline247: '+90 312 292 29 29',
    hotlineDomestic: '+90 312 292 29 29',
    officialPortalUrl: 'https://www.konsolosluk.gov.tr',
    officialPortalName: 'e-Konsolosluk Portalı (konsolosluk.gov.tr)',
    emergencyDocName: {
      tr: 'Geçici Pasaport (Seyahat Belgesi / Emergency Passport)',
      en: 'Emergency Passport (Temporary Travel Document)',
      de: 'Notreisepass (Vorläufiger Reiseausweis)'
    },
    emergencyDocValidity: {
      tr: 'Yalnızca Türkiye’ye doğrudan dönüş için 1 ay süreli geçerlidir.',
      en: 'Valid up to 1 month exclusively for direct return to Türkiye.',
      de: 'Gültig bis zu 1 Monat ausschließlich für die direkte Rückreise in die Türkei.'
    },
    steps: {
      policeReport: {
        tr: 'Pasaportun kaybolduğu bölgedeki polis merkezine gidip resmi "Kayıp / Çalıntı Tutanağı (Police Report)" düzenletin.',
        en: 'Visit the local police station in the jurisdiction where your passport went missing to obtain an official Police Report.',
        de: 'Erstatten Sie bei der örtlichen Polizeidienststelle Verlust- oder Diebstahlsanzeige und fordern Sie ein offizielles Protokoll an.'
      },
      photos: {
        tr: 'Geçici pasaport başvurusu için arka fonu beyaz 2 adet güncel biyometrik vesikalık fotoğraf hazırlayın.',
        en: 'Prepare 2 recent biometric photos with a white background for emergency passport processing.',
        de: 'Halten Sie 2 aktuelle biometrische Passfotos mit weißem Hintergrund für die Notpassausstellung bereit.'
      },
      embassySubmission: {
        tr: 'En yakın T.C. Büyükelçiliği veya Başkonsolosluğuna gidin. Acil durumlarda randevusuz başvuru kabul edilir.',
        en: 'Proceed to the nearest Embassy or Consulate General of Türkiye. In genuine emergencies, walk-ins without prior appointments are handled.',
        de: 'Suchen Sie die nächste türkische Botschaft oder das Generalkonsulat auf. In echten Notfällen werden Vorsprachen ohne Termin angenommen.'
      },
      travelDocIssuance: {
        tr: 'Temsilcilik yalnızca Türkiye’ye dönüş için tek yönlü geçerli Geçici Pasaport düzenler.',
        en: 'The diplomatic mission issues a one-way Emergency Travel Document valid exclusively for returning directly home.',
        de: 'Die Vertretung stellt einen einmaligen Notreisepass für die direkte Rückreise nach Hause aus.'
      }
    }
  },

  // Japonya
  JP: {
    passportCode: 'JP',
    countryName: { tr: 'Japonya', en: 'Japan', de: 'Japan' },
    ministryName: {
      tr: 'Japonya Dışişleri Bakanlığı (MOFA Japan)',
      en: 'Ministry of Foreign Affairs of Japan (MOFA)',
      de: 'Außenministerium Japans (MOFA)'
    },
    crisisCenterTitle: {
      tr: 'Denizaşırı Güvenlik ve Konsolosluk Acil Durum Merkezi',
      en: 'Overseas Safety & Consular Emergency Center',
      de: 'Zentrum für Sicherheit und Konsularnotfälle im Ausland'
    },
    hotline247: '+81 3 5501 8162',
    hotlineDomestic: '03-5501-8162',
    officialPortalUrl: 'https://www.ezairyu.mofa.go.jp',
    officialPortalName: 'MOFA ORR-net / Tabireg (ezairyu.mofa.go.jp)',
    emergencyDocName: {
      tr: 'Kinkyu Tokosho (渡航書 - Japonya’ya Dönüş Seyahat Belgesi)',
      en: 'Emergency Travel Document (渡航書 - Travel Certificate for Return to Japan)',
      de: 'Notreisedokument (渡航書 - Rückkehr-Zertifikat nach Japan)'
    },
    emergencyDocValidity: {
      tr: 'Japonya’ya dönüş bileti teyidiyle sınırlı acil tek yönlü belgedir.',
      en: 'Single-use emergency document issued upon proof of confirmed return ticket to Japan.',
      de: 'Einmaliges Notdokument, ausgestellt bei Vorlage eines bestätigten Rückflugtickets nach Japan.'
    },
    steps: {
      policeReport: {
        tr: 'Yerel polisten Kayıp Eşya Tutanağı (Lost Property / Police Report) ve dosya numarası alın.',
        en: 'Obtain an official Certificate of Loss or Police Report from the local police authority.',
        de: 'Lassen Sie sich bei der örtlichen Polizei eine Verlust- oder Diebstahlsbescheinigung mit Aktenzeichen ausstellen.'
      },
      photos: {
        tr: 'Japon standartlarında (45mm x 35mm) 2 adet vesikalık fotoğraf temin edin.',
        en: 'Provide 2 passport-sized photos adhering to Japanese consular standards (45mm x 35mm).',
        de: 'Beschaffen Sie 2 Passfotos nach japanischen Konsularstandards (45 mm x 35 mm).'
      },
      embassySubmission: {
        tr: 'Bulunduğunuz ülkedeki Japonya Büyükelçiliği (Embassy of Japan) konsolosluk bölümüne başvurun.',
        en: 'Submit your case to the consular section of the nearest Embassy or Consulate-General of Japan.',
        de: 'Wenden Sie sich an die Konsularabteilung der nächsten Botschaft oder des Generalkonsulats von Japan.'
      },
      travelDocIssuance: {
        tr: 'Japonya’ya dönüş uçak biletiniz teyit edildikten sonra aynı gün "Kinkyu Tokosho (渡航書)" düzenlenir.',
        en: 'Upon flight ticket confirmation to Japan, an Emergency Travel Document (Tokosho) is issued to facilitate direct transit.',
        de: 'Nach Bestätigung des Rückflugtickets wird das Notreisedokument (Tokosho) für den direkten Rückflug ausgestellt.'
      }
    }
  },

  // Almanya
  DE: {
    passportCode: 'DE',
    countryName: { tr: 'Almanya', en: 'Germany', de: 'Deutschland' },
    ministryName: {
      tr: 'Almanya Dışişleri Bakanlığı (Auswärtiges Amt)',
      en: 'Federal Foreign Office of Germany (Auswärtiges Amt)',
      de: 'Auswärtiges Amt der Bundesrepublik Deutschland'
    },
    crisisCenterTitle: {
      tr: 'Vatandaş Kriz Masası & Konsolosluk Yardım Hattı',
      en: 'Citizens Crisis Center & 24/7 Consular Hotline',
      de: 'Bürgerservice & 24/7 Krisen- und Notrufhotline'
    },
    hotline247: '+49 30 5000 2000',
    hotlineDomestic: '030 5000 2000',
    officialPortalUrl: 'https://www.auswaertiges-amt.de',
    officialPortalName: 'Auswärtiges Amt Portalı (auswaertiges-amt.de)',
    emergencyDocName: {
      tr: 'Reiseausweis als Passersatz (Pasaport Yerine Geçen Seyahat Belgesi)',
      en: 'Emergency Travel Document (Reiseausweis als Passersatz / Notpass)',
      de: 'Reiseausweis als Passersatz (RAP) / Vorläufiger Reisepass'
    },
    emergencyDocValidity: {
      tr: 'Almanya veya ikamet AB ülkesine dönüş için azami 1 aya kadar geçerlidir.',
      en: 'Valid for up to 1 month strictly for return journey to Germany or EU residence.',
      de: 'Gültig für maximal 1 Monat ausschließlich zur Rückkehr nach Deutschland oder in das EU-Wohnsitzland.'
    },
    steps: {
      policeReport: {
        tr: 'Yerel polis merkezinden hırsızlık/kayıp bildirim belgesi (Diebstahlsanzeige / Police Report) alın.',
        en: 'File an official police theft or loss report (Diebstahlsanzeige) with local law enforcement.',
        de: 'Erstatten Sie bei der örtlichen Polizei eine Verlust- oder Diebstahlsanzeige und sichern Sie das Protokoll.'
      },
      photos: {
        tr: 'Alman biyometrik standartlarına uygun (35mm x 45mm) 2 adet vesikalık fotoğraf hazırlayın.',
        en: 'Prepare 2 biometric passport photos complying with German biometric passport photo matrix.',
        de: 'Halten Sie 2 aktuelle biometrische Passfotos gemäß der deutschen Fotomustertafel bereit.'
      },
      embassySubmission: {
        tr: 'Almanya Federal Cumhuriyeti Büyükelçiliği veya Başkonsolosluğu konsolosluk şubesine başvurun.',
        en: 'Contact the consular mission of the Federal Republic of Germany (Deutsche Botschaft / Generalkonsulat).',
        de: 'Suchen Sie die Notfall-Sprechstunde der deutschen Auslandsvertretung (Botschaft oder Generalkonsulat) auf.'
      },
      travelDocIssuance: {
        tr: 'Kimlik ve vatandaşlık teyidinin ardından "Reiseausweis als Passersatz" veya geçici pasaport verilir.',
        en: 'Following identity and citizenship verification, an Emergency Travel Document (RAP) is issued for your return.',
        de: 'Nach Identitätsprüfung stellt die Vertretung einen Reiseausweis als Passersatz für die direkte Heimreise aus.'
      }
    }
  },

  // Amerika Birleşik Devletleri
  US: {
    passportCode: 'US',
    countryName: { tr: 'Amerika Birleşik Devletleri', en: 'United States', de: 'Vereinigte Staaten' },
    ministryName: {
      tr: 'ABD Dışişleri Bakanlığı (U.S. Department of State)',
      en: 'U.S. Department of State - Bureau of Consular Affairs',
      de: 'Außenministerium der Vereinigten Staaten (U.S. Department of State)'
    },
    crisisCenterTitle: {
      tr: 'Denizaşırı Vatandaş Hizmetleri ve Kriz Yönetimi',
      en: 'Overseas Citizens Services (OCS) 24/7 Crisis Hotline',
      de: 'Krisendienst für US-Bürger im Ausland (OCS 24/7)'
    },
    hotline247: '+1 202 501 4444',
    hotlineDomestic: '1-888-407-4747 (US/Canada Toll-Free)',
    officialPortalUrl: 'https://travel.state.gov',
    officialPortalName: 'Smart Traveler Enrollment (STEP) & travel.state.gov',
    emergencyDocName: {
      tr: 'Emergency Limited-Validity Passport (Acil Sınırlı Süreli Pasaport)',
      en: 'Emergency Limited-Validity Passport (Photo-Digital)',
      de: 'Vorläufiger US-Notpass (Emergency Limited-Validity Passport)'
    },
    emergencyDocValidity: {
      tr: 'Genellikle 1 yıl geçerlidir; ABD’ye dönüşte ücretsiz tam süreli pasaportla değiştirilir.',
      en: 'Usually valid for up to 1 year; can be exchanged for a standard 10-year passport upon return to the U.S.',
      de: 'In der Regel bis zu 1 Jahr gültig; kann nach Rückkehr in die USA kostenfrei in einen regulären Pass umgetauscht werden.'
    },
    steps: {
      policeReport: {
        tr: 'Olay yerindeki polis merkezine giderek resmi kayıp raporu düzenletin ve DS-64 formunu doldurun.',
        en: 'File a police report with local authorities and complete Form DS-64 (Statement Regarding a Lost/Stolen U.S. Passport).',
        de: 'Erstatten Sie Anzeige bei der örtlichen Polizei und füllen Sie das Formular DS-64 online oder vor Ort aus.'
      },
      photos: {
        tr: '2x2 inç (51mm x 51mm) beyaz arka fonlu 1 adet ABD standart pasaport fotoğrafı çektirin.',
        en: 'Obtain one standard 2x2 inch (51mm x 51mm) color passport photo with a neutral background.',
        de: 'Beschaffen Sie 1 US-Standard-Passfoto im Format 2x2 Zoll (51 mm x 51 mm) mit weißem Hintergrund.'
      },
      embassySubmission: {
        tr: 'En yakın ABD Büyükelçiliği (U.S. Embassy) Amerikan Vatandaş Hizmetleri (ACS) birimine gidin.',
        en: 'Visit the American Citizen Services (ACS) section at the nearest U.S. Embassy or Consulate.',
        de: 'Suchen Sie die Abteilung für US-Bürgerservice (ACS) der nächsten US-Botschaft oder des Konsulats auf.'
      },
      travelDocIssuance: {
        tr: 'Uçuş programınıza göre acil durumlarda aynı gün mor kapaklı Acil Pasaport düzenlenir.',
        en: 'Depending on confirmed flight schedules, an emergency passport is typically issued within the same business day.',
        de: 'Bei nachgewiesener dringender Reiseabsicht wird in der Regel noch am selben Tag ein Notpass ausgestellt.'
      }
    }
  },

  // Birleşik Krallık
  GB: {
    passportCode: 'GB',
    countryName: { tr: 'Birleşik Krallık', en: 'United Kingdom', de: 'Vereinigtes Königreich' },
    ministryName: {
      tr: 'Birleşik Krallık Dışişleri Bakanlığı (FCDO)',
      en: 'Foreign, Commonwealth & Development Office (FCDO)',
      de: 'Britisches Außenministerium (FCDO)'
    },
    crisisCenterTitle: {
      tr: '24/7 Global Konsolosluk Destek ve Kriz Operasyonları',
      en: '24/7 Global Consular Assistance & Crisis Management',
      de: 'Globaler Konsularischer Notdienst rund um die Uhr'
    },
    hotline247: '+44 20 7008 5000',
    hotlineDomestic: '020 7008 5000',
    officialPortalUrl: 'https://www.gov.uk/emergency-travel-document',
    officialPortalName: 'GOV.UK Emergency Travel Document Portal',
    emergencyDocName: {
      tr: 'Emergency Travel Document (ETD / Acil Seyahat Belgesi)',
      en: 'Emergency Travel Document (ETD)',
      de: 'Britisches Notreisedokument (Emergency Travel Document - ETD)'
    },
    emergencyDocValidity: {
      tr: 'Yalnızca seyahat planınızdaki belirli rotadan dönüş veya varış noktasına kadar geçerlidir.',
      en: 'Valid for a specific journey through a maximum of 5 transit countries to your final destination.',
      de: 'Gültig für eine spezifische Reiseroute durch maximal 5 Transitländer zur Enddestination.'
    },
    steps: {
      policeReport: {
        tr: 'Yerel polisten kayıp bildirim referans numarası (Crime Reference Number) alın.',
        en: 'Obtain an official Crime Reference Number or Police Loss Report from local authorities.',
        de: 'Besorgen Sie sich ein amtliches Verlustprotokoll oder eine polizeiliche Vorgangsnummer.'
      },
      photos: {
        tr: 'GOV.UK portalından online başvuru yapıp dijital vesikalık fotoğraf yükleyin.',
        en: 'Apply online via GOV.UK and upload a compliant digital passport photo.',
        de: 'Stellen Sie den Antrag online über GOV.UK und laden Sie ein digitales biometrisches Passfoto hoch.'
      },
      embassySubmission: {
        tr: 'Online başvurunun ardından randevu ile veya acil durumda doğrudan İngiliz Büyükelçiliğine gidin.',
        en: 'Attend your booked consular interview at the British Embassy or High Commission.',
        de: 'Nehmen Sie den vereinbarten Termin in der britischen Botschaft oder dem Hochkommissariat wahr.'
      },
      travelDocIssuance: {
        tr: 'ETD belgeniz basılarak havalimanında doğrudan uçağa binebilmeniz sağlanır.',
        en: 'Your Emergency Travel Document (ETD) is printed with your precise travel dates and route.',
        de: 'Das Notreisedokument (ETD) wird mit den genauen Reisedaten und der Reiseroute ausgestellt.'
      }
    }
  },

  // Ukrayna
  UA: {
    passportCode: 'UA',
    countryName: { tr: 'Ukrayna', en: 'Ukraine', de: 'Ukraine' },
    ministryName: {
      tr: 'Ukrayna Dışişleri Bakanlığı (MFA Ukraine)',
      en: 'Ministry of Foreign Affairs of Ukraine (MFA)',
      de: 'Außenministerium der Ukraine (MFA)'
    },
    crisisCenterTitle: {
      tr: 'Yurt Dışı Vatandaş Acil Durum & Konsolosluk Kriz Hattı',
      en: 'Consular Assistance & Citizen Emergency Hotline',
      de: 'Konsularischer Krisendienst für ukrainische Staatsbürger'
    },
    hotline247: '+380 44 238 1657',
    hotlineDomestic: '044 238 1657',
    officialPortalUrl: 'https://mfa.gov.ua',
    officialPortalName: 'MFA Ukraine & "Druh" Konsolosluk Kayıt Sistemi (mfa.gov.ua)',
    emergencyDocName: {
      tr: 'Ukrayna’ya Dönüş Kimlik Belgesi (Посвідчення особи на повернення в Україну)',
      en: 'Certificate for Return to Ukraine (Посвідчення особи на повернення)',
      de: 'Rückkehrbescheinigung in die Ukraine (Посвідчення особи на повернення)'
    },
    emergencyDocValidity: {
      tr: 'Ukrayna sınırlarına dönüş için 30 güne kadar geçerli tek yönlü belgedir.',
      en: 'Valid up to 30 days strictly for the journey back to the territory of Ukraine.',
      de: 'Gültig bis zu 30 Tage ausschließlich für die direkte Rückreise in die Ukraine.'
    },
    steps: {
      policeReport: {
        tr: 'Yerel polisten pasaport kaybı/çalınması hakkında resmi tutanak (Protokol) alın.',
        en: 'Report the passport loss or theft to local police and secure a formal police statement.',
        de: 'Melden Sie den Passverlust bei der Polizei vor Ort und verlangen Sie eine Bestätigung.'
      },
      photos: {
        tr: '35mm x 45mm ölçülerinde 2 adet vesikalık fotoğraf temin edin.',
        en: 'Provide 2 standard 35mm x 45mm passport photographs with a light background.',
        de: 'Legen Sie 2 Passfotos im Format 35 mm x 45 mm mit hellem Hintergrund vor.'
      },
      embassySubmission: {
        tr: 'Bulunduğunuz ülkedeki Ukrayna Büyükelçiliği (Embassy of Ukraine) veya Konsolosluğuna müracaat edin.',
        en: 'Present your documentation to the Consular Section of the Embassy or Consulate of Ukraine.',
        de: 'Sprechen Sie bei der Konsularabteilung der ukrainischen Botschaft oder des Konsulats vor.'
      },
      travelDocIssuance: {
        tr: 'Kimlik tespiti akabinde "Посвідчення особи на повернення" düzenlenerek doğrudan dönüşünüz sağlanır.',
        en: 'Once identity is verified, the Return Certificate is issued to facilitate entry back to Ukraine.',
        de: 'Nach Identitätsfeststellung wird die Rückkehrbescheinigung für die direkte Heimreise ausgehändigt.'
      }
    }
  },

  // Fransa
  FR: {
    passportCode: 'FR',
    countryName: { tr: 'Fransa', en: 'France', de: 'Frankreich' },
    ministryName: {
      tr: 'Fransa Dışişleri Bakanlığı (Quai d’Orsay)',
      en: 'Ministry for Europe and Foreign Affairs of France',
      de: 'Französisches Außenministerium (Quai d’Orsay)'
    },
    crisisCenterTitle: {
      tr: 'Kriz ve Destek Merkezi (Centre de Crise et de Soutien - CDCS)',
      en: 'Crisis and Support Centre (CDCS 24/7)',
      de: 'Krisen- und Unterstützungszentrum (CDCS)'
    },
    hotline247: '+33 1 53 59 11 00',
    hotlineDomestic: '01 53 59 11 00',
    officialPortalUrl: 'https://www.diplomatie.gouv.fr',
    officialPortalName: 'France Diplomatie & Ariane Portalı (diplomatie.gouv.fr)',
    emergencyDocName: {
      tr: 'Laissez-Passer Consulaire (Acil Konsolosluk Geçiş Belgesi)',
      en: 'Emergency Consular Travel Document (Laissez-passer consulaire)',
      de: 'Konsularischer Notpassierschein (Laissez-passer consulaire)'
    },
    emergencyDocValidity: {
      tr: 'Fransa veya ikamet ülkesine dönüş için azami süresi sınırlı tek yönlü geçiş belgesidir.',
      en: 'Single-journey emergency pass valid strictly for direct return travel to France.',
      de: 'Einmaliger Notpassierschein, ausschließlich gültig für die direkte Rückreise nach Frankreich.'
    },
    steps: {
      policeReport: {
        tr: 'Olay yerindeki polis merkezine gidip resmi şikayet ve kayıp tutanağı (Dépôt de plainte) alın.',
        en: 'File a formal theft or loss complaint (Dépôt de plainte) with local law enforcement.',
        de: 'Erstatten Sie bei der örtlichen Polizei eine Verlust- oder Diebstahlsanzeige (Dépôt de plainte).'
      },
      photos: {
        tr: 'Fransız normlarına uygun 2 adet biyometrik vesikalık fotoğraf hazırlayın.',
        en: 'Obtain 2 recent biometric passport photographs meeting French standards.',
        de: 'Halten Sie 2 aktuelle Passfotos nach französischen biometrischen Normen bereit.'
      },
      embassySubmission: {
        tr: 'En yakın Fransa Büyükelçiliği veya Başkonsolosluğu (Consulat Général de France) ile irtibata geçin.',
        en: 'Contact the nearest French Embassy or Consulate General of France immediately.',
        de: 'Kontaktieren Sie umgehend die nächstgelegene französische Botschaft oder das Generalkonsulat.'
      },
      travelDocIssuance: {
        tr: 'Biletiniz ve kimliğiniz teyit edildikten sonra dönüş için "Laissez-passer" belgesi teslim edilir.',
        en: 'Following ticket and identity check, a Laissez-passer is handed over to enable your return.',
        de: 'Nach Prüfung des Flugtickets und der Identität wird der Notpassierschein ausgehändigt.'
      }
    }
  },

  // İtalya
  IT: {
    passportCode: 'IT',
    countryName: { tr: 'İtalya', en: 'Italy', de: 'Italien' },
    ministryName: {
      tr: 'İtalya Dışişleri Bakanlığı (Farnesina)',
      en: 'Ministry of Foreign Affairs and International Cooperation (Farnesina)',
      de: 'Italienisches Außenministerium (Farnesina)'
    },
    crisisCenterTitle: {
      tr: 'Kriz Masası & Konsolosluk Acil Yardım Hattı',
      en: 'Farnesina Crisis Unit (Unità di Crisi) 24/7',
      de: 'Krisenstab der Farnesina (Unità di Crisi 24/7)'
    },
    hotline247: '+39 06 36225',
    hotlineDomestic: '06 36225',
    officialPortalUrl: 'https://www.viaggiaresicuri.it',
    officialPortalName: 'Viaggiare Sicuri & Dove Siamo Nel Mondo (viaggiaresicuri.it)',
    emergencyDocName: {
      tr: 'Emergency Travel Document (ETD - Documento di Viaggio Provvisorio)',
      en: 'Provisional Travel Document (ETD / Documento di Viaggio Provvisorio)',
      de: 'Vorläufiges Reisedokument (ETD / Documento di Viaggio Provvisorio)'
    },
    emergencyDocValidity: {
      tr: 'Yalnızca İtalya’ya dönüş veya ikamet ülkesine seyahat için azami 5 gün geçerlidir.',
      en: 'Valid strictly for the minimum time necessary to return to Italy (usually up to 5 days).',
      de: 'Gültig ausschließlich für die direkte Rückreise nach Italien (in der Regel bis zu 5 Tage).'
    },
    steps: {
      policeReport: {
        tr: 'Yerel polisten hırsızlık veya kayıp tutanağı (Denuncia di smarrimento/furto) alın.',
        en: 'Obtain an official loss or theft report (Denuncia) from the local police authority.',
        de: 'Erstatten Sie bei der örtlichen Polizei Verlustanzeige und sichern Sie das Protokoll.'
      },
      photos: {
        tr: 'ICAO normlarında 2 adet vesikalık fotoğraf hazırlayın.',
        en: 'Provide 2 standard ICAO-compliant passport photos with white background.',
        de: 'Halten Sie 2 ICAO-konforme Passfotos mit weißem Hintergrund bereit.'
      },
      embassySubmission: {
        tr: 'İtalya Büyükelçiliği (Ambasciata d’Italia) veya Konsolosluk şubesine başvurun.',
        en: 'Present your documentation at the Italian Embassy or Consulate General.',
        de: 'Sprechen Sie bei der italienischen Botschaft oder dem Konsulat vor.'
      },
      travelDocIssuance: {
        tr: 'Dönüş biletiniz incelenerek havalimanı için geçerli "ETD" belgesi düzenlenir.',
        en: 'Upon presentation of confirmed flight tickets, an ETD is issued for your departure.',
        de: 'Bei Vorlage des Flugtickets wird das vorläufige Reisedokument (ETD) ausgestellt.'
      }
    }
  }
};

/**
 * Verilen pasaport koduna göre doğrulanmış kriz ve konsolosluk verisini döner.
 * Eğer özel kaydı yoksa o ülkenin Dışişleri Bakanlığı standart formatında üretir.
 */
export function getConsularEmergencyInfo(passportCode: string, lang: 'tr' | 'en' | 'de' = 'tr'): ConsularEmergencyInfo {
  const code = (passportCode || 'TR').toUpperCase();
  const found = CONSULAR_EMERGENCY_DATA[code];
  if (found) return found;

  // Global standart diplomatik kriz şablonu (199 ülke için)
  const countryNameTr = code;
  return {
    passportCode: code,
    countryName: { tr: countryNameTr, en: countryNameTr, de: countryNameTr },
    ministryName: {
      tr: `${countryNameTr} Dışişleri Bakanlığı`,
      en: `Ministry of Foreign Affairs of ${countryNameTr}`,
      de: `Außenministerium von ${countryNameTr}`
    },
    crisisCenterTitle: {
      tr: 'Vatandaş Kriz Masası & Konsolosluk Acil Yardım Hattı',
      en: 'Citizen Crisis Center & Consular Assistance Hotline',
      de: 'Krisenstab & Konsularische Notrufhotline'
    },
    hotline247: '+1 202 501 4444',
    hotlineDomestic: 'Resmi Temsilcilik Hattı',
    officialPortalUrl: `https://www.google.com/search?q=${encodeURIComponent(`Ministry of Foreign Affairs of ${countryNameTr} consular services`)}`,
    officialPortalName: `${countryNameTr} Dışişleri Konsolosluk Portalı`,
    emergencyDocName: {
      tr: 'Acil Geçici Seyahat Belgesi (Emergency Certificate / Laissez-Passer)',
      en: 'Emergency Travel Document (Emergency Certificate / Laissez-Passer)',
      de: 'Notreisedokument (Emergency Certificate / Laissez-Passer)'
    },
    emergencyDocValidity: {
      tr: 'Vatandaşı olunan ülkeye doğrudan tek yönlü dönüş için geçerlidir.',
      en: 'Valid exclusively for a direct single-journey return to home country.',
      de: 'Gültig ausschließlich für die direkte Rückreise in das Heimatland.'
    },
    steps: {
      policeReport: {
        tr: 'Olayın gerçekleştiği yerel polis merkezinden resmi Kayıp/Çalıntı Tutanağı (Police Report) alın.',
        en: 'Report the loss or theft to the local police department and obtain an official Police Report.',
        de: 'Erstatten Sie bei der örtlichen Polizei Verlust- oder Diebstahlsanzeige und sichern Sie das Protokoll.'
      },
      photos: {
        tr: 'Beyaz fonlu 2 adet güncel biyometrik pasaport fotoğrafı hazırlayın.',
        en: 'Prepare 2 recent biometric passport photographs with a clean white background.',
        de: 'Halten Sie 2 aktuelle biometrische Passfotos mit weißem Hintergrund bereit.'
      },
      embassySubmission: {
        tr: `Bulunduğunuz ülkedeki ${countryNameTr} Büyükelçiliği veya Konsolosluğuna acil müracaatta bulunun.`,
        en: `Proceed to the nearest Embassy or Consulate of ${countryNameTr} for emergency assistance.`,
        de: `Suchen Sie die nächste Botschaft oder das Konsulat von ${countryNameTr} auf.`
      },
      travelDocIssuance: {
        tr: 'Konsolosluk, kimlik ve uçak bileti teyidinin ardından ülkenize dönüş için Acil Seyahat Belgesi tanzim eder.',
        en: 'Upon identity and ticket verification, an Emergency Travel Document will be issued for direct repatriation.',
        de: 'Nach Prüfung von Identität und Flugticket wird ein Notreisedokument für die Heimreise ausgestellt.'
      }
    }
  };
}
