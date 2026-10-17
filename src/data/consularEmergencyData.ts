/**
 * Vizamigo - Global Konsolosluk & Diplomatik Kriz Merkezi Veritabanı
 * Pasaport kaybı, acil tahliye, gözaltı ve kriz durumlarında dünya vatandaşlarının
 * kendi Dışişleri Bakanlıklarına ve acil seyahat belgesi protokollerine erişimini sağlar.
 */

import { getCountryName } from './passportData';

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

  // Avusturya (BMEIA)
  AT: {
    passportCode: 'AT',
    countryName: { tr: 'Avusturya', en: 'Austria', de: 'Österreich' },
    ministryName: {
      tr: 'Avusturya Avrupa ve Uluslararası İlişkiler Bakanlığı (BMEIA)',
      en: 'Federal Ministry for European and International Affairs of Austria (BMEIA)',
      de: 'Bundesministerium für europäische und internationale Angelegenheiten (BMEIA)'
    },
    crisisCenterTitle: {
      tr: 'BMEIA 7/24 Acil Yardım ve Kriz Masası',
      en: 'BMEIA 24/7 Citizen Crisis Support & Emergency Center',
      de: 'BMEIA Bürgerservice & 24/7 Notrufzentrale'
    },
    hotline247: '+43 1 90 115 4411',
    hotlineDomestic: '050 1150 4411 (Avusturya içi)',
    officialPortalUrl: 'https://www.bmeia.gv.at',
    officialPortalName: 'BMEIA Resmî Portalı (bmeia.gv.at)',
    emergencyDocName: {
      tr: 'Notpass (Acil Durum Pasaportu)',
      en: 'Emergency Passport (Notpass)',
      de: 'Notreisepass (Notpass)'
    },
    emergencyDocValidity: {
      tr: 'Seyahat süresine göre azami 6 ay veya doğrudan tek yönlü dönüş için geçerlidir.',
      en: 'Valid for the duration of travel up to a maximum of 6 months, or for direct repatriation.',
      de: 'Gültig für die Dauer der Reise, längstens für einen Zeitraum von 6 Monaten.'
    },
    steps: {
      policeReport: {
        tr: 'Olay yerindeki polis merkezine gidip resmi "Kayıp / Çalınma Tutanağı" (Verlustanzeige / Police Report) alın.',
        en: 'Obtain an official police report (Verlustanzeige / Theft Report) from the nearest police station.',
        de: 'Erstatten Sie bei der örtlichen Polizeidienststelle eine Verlustanzeige und sichern Sie das offizielle Protokoll.'
      },
      photos: {
        tr: '1 adet güncel ICAO standartlarında biyometrik pasaport fotoğrafı (35x45mm) hazırlayın.',
        en: 'Prepare 1 recent biometric passport photograph (35x45mm) complying with ICAO standards.',
        de: 'Beschaffen Sie 1 aktuelles biometrisches Passbild (35x45mm) nach ICAO-Kriterien.'
      },
      embassySubmission: {
        tr: 'En yakın Avusturya Büyükelçiliği, Başkonsolosluğu veya Fahri Konsolosluğuna acil müracaatta bulunun.',
        en: 'Contact the consular section of the nearest Austrian Embassy, Consulate General, or Honorary Consulate.',
        de: 'Wenden Sie sich an die Konsularabteilung der nächsten österreichischen Botschaft oder des Generalkonsulats.'
      },
      travelDocIssuance: {
        tr: 'Kimlik tespiti ve aciliyet incelemesinin ardından genellikle aynı gün Notpass (Acil Pasaport) düzenlenir.',
        en: 'Following identity and citizenship verification, an emergency Notpass passport is typically issued within 24 hours.',
        de: 'Nach Identitätsfeststellung wird in der Regel am selben Tag ein Notreisepass ausgestellt.'
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
  },

  // Kanada (Global Affairs Canada)
  CA: {
    passportCode: 'CA',
    countryName: { tr: 'Kanada', en: 'Canada', de: 'Kanada' },
    ministryName: {
      tr: 'Kanada Küresel İlişkiler Bakanlığı (Global Affairs Canada)',
      en: 'Global Affairs Canada (Affaires mondiales Canada)',
      de: 'Global Affairs Canada'
    },
    crisisCenterTitle: {
      tr: 'Acil İzleme ve Müdahale Merkezi (EWRC 24/7)',
      en: 'Emergency Watch and Response Centre (EWRC 24/7)',
      de: 'Notfall- und Krisenreaktionszentrum (EWRC 24/7)'
    },
    hotline247: '+1 613 996 8885',
    hotlineDomestic: '1-800-387-3124 (Kanada & ABD)',
    officialPortalUrl: 'https://travel.gc.ca',
    officialPortalName: 'Travel.gc.ca (Resmî Kanada Seyahat Portalı)',
    emergencyDocName: {
      tr: 'Geçici Seyahat Belgesi (Emergency Travel Document / ETD)',
      en: 'Emergency Travel Document (ETD) / Special Passport',
      de: 'Notreisedokument (Emergency Travel Document)'
    },
    emergencyDocValidity: {
      tr: 'Doğrudan Kanada’ya tek yönlü dönüş için azami süreli geçerlidir.',
      en: 'Valid exclusively for urgent travel or direct repatriation to Canada.',
      de: 'Gültig ausschließlich für die direkte Rückreise nach Kanada.'
    },
    steps: {
      policeReport: {
        tr: 'Yerel polise kayıp/çalıntı bildirimi yaparak vaka numarası ve tutanak alın.',
        en: 'File an official police report immediately and obtain a case incident number.',
        de: 'Erstatten Sie bei der örtlichen Polizei eine Verlustanzeige und sichern Sie das Aktenzeichen.'
      },
      photos: {
        tr: 'Kanada pasaport standartlarına uygun 2 adet fotoğraf edinin.',
        en: 'Obtain 2 recent passport photos conforming to Canadian passport specifications.',
        de: 'Halten Sie 2 aktuelle Passfotos nach kanadischen Vorgaben bereit.'
      },
      embassySubmission: {
        tr: 'En yakın Kanada Büyükelçiliği veya Başkonsolosluğu ile irtibata geçin.',
        en: 'Proceed to the nearest Canadian Embassy, High Commission, or Consulate.',
        de: 'Suchen Sie die nächste kanadische Botschaft oder das Generalkonsulat auf.'
      },
      travelDocIssuance: {
        tr: 'Güvenlik incelemesinin ardından tek yönlü dönüş için Acil Seyahat Belgesi verilir.',
        en: 'Following identity and security verification, an Emergency Travel Document is issued.',
        de: 'Nach Identitätsprüfung wird ein Notreisedokument für den Rückflug ausgestellt.'
      }
    }
  },

  // Avustralya (DFAT)
  AU: {
    passportCode: 'AU',
    countryName: { tr: 'Avustralya', en: 'Australia', de: 'Australien' },
    ministryName: {
      tr: 'Avustralya Dışişleri ve Ticaret Bakanlığı (DFAT)',
      en: 'Department of Foreign Affairs and Trade (DFAT)',
      de: 'Ministerium für Auswärtige Angelegenheiten und Handel (DFAT)'
    },
    crisisCenterTitle: {
      tr: 'Konsolosluk Acil Durum Merkezi (CEC 24/7)',
      en: 'Consular Emergency Centre (CEC 24/7)',
      de: 'Konsularisches Notfallzentrum (CEC 24/7)'
    },
    hotline247: '+61 2 6261 3305',
    hotlineDomestic: '1300 555 135 (Avustralya içi)',
    officialPortalUrl: 'https://www.smartraveller.gov.au',
    officialPortalName: 'Smartraveller (smartraveller.gov.au)',
    emergencyDocName: {
      tr: 'Acil Pasaport (Emergency Passport / Provisional Travel Document)',
      en: 'Emergency Passport (EP)',
      de: 'Notfallreisepass (Emergency Passport)'
    },
    emergencyDocValidity: {
      tr: 'Genellikle 7 ay veya seyahat ihtiyacına göre azami 12 ay sürelidir.',
      en: 'Usually valid for 7 months (up to 12 months) for urgent travel.',
      de: 'In der Regel 7 Monate gültig für dringende Reisezwecke.'
    },
    steps: {
      policeReport: {
        tr: 'Yerel polis merkezinden resmi kayıp/çalıntı tutanağı (Police Report) temin edin.',
        en: 'Report the theft or loss to local police and secure a written report.',
        de: 'Melden Sie den Verlust der Polizei und fordern Sie einen schriftlichen Bericht an.'
      },
      photos: {
        tr: 'Avustralya standartlarında 2 adet biyometrik vesikalık fotoğraf hazırlayın.',
        en: 'Provide 2 Australian standard passport photographs.',
        de: 'Halten Sie 2 Passfotos nach australischem Standard bereit.'
      },
      embassySubmission: {
        tr: 'En yakın Avustralya Büyükelçiliği veya Yüksek Komiserliğine müracaat edin.',
        en: 'Contact the nearest Australian Embassy, High Commission, or Consulate.',
        de: 'Wenden Sie sich an die nächste australische Auslandsvertretung.'
      },
      travelDocIssuance: {
        tr: 'Başvuru onaylandıktan sonra havalimanı için Acil Pasaport düzenlenir.',
        en: 'An Emergency Passport is produced to facilitate urgent departure.',
        de: 'Ein Notpass wird für die Weiter- oder Heimreise ausgehändigt.'
      }
    }
  },

  // İsviçre (EDA / DFAE)
  CH: {
    passportCode: 'CH',
    countryName: { tr: 'İsviçre', en: 'Switzerland', de: 'Schweiz' },
    ministryName: {
      tr: 'İsviçre Federal Dışişleri Bakanlığı (EDA / DFAE)',
      en: 'Federal Department of Foreign Affairs (FDFA / EDA)',
      de: 'Eidgenössisches Departement für auswärtige Angelegenheiten (EDA)'
    },
    crisisCenterTitle: {
      tr: 'EDA Yardım Hattı & Konsolosluk Kriz Masası (7/24)',
      en: 'FDFA Helpline & Consular Crisis Operations (24/7)',
      de: 'EDA-Helpline & Konsularischer Krisenstab (24/7)'
    },
    hotline247: '+41 800 24 7 365',
    hotlineDomestic: '0800 24 7 365 (İsviçre içi)',
    officialPortalUrl: 'https://www.eda.admin.ch',
    officialPortalName: 'EDA Helpline Portalı (eda.admin.ch)',
    emergencyDocName: {
      tr: 'Geçici Pasaport (Notpass / Passeport d’urgence)',
      en: 'Provisional Passport (Emergency Passport / Notpass)',
      de: 'Provisorischer Pass (Notpass)'
    },
    emergencyDocValidity: {
      tr: 'Yalnızca planlanan seyahat süresince, azami 12 ay geçerlidir.',
      en: 'Valid exclusively for the planned trip, maximum 12 months.',
      de: 'Gültig ausschließlich für die geplante Reise, maximal 12 Monate.'
    },
    steps: {
      policeReport: {
        tr: 'Olay yerindeki polisten resmi kayıp/çalıntı tutanağı alın.',
        en: 'Obtain an official loss or theft certificate from local police authorities.',
        de: 'Erstatten Sie bei der örtlichen Polizei eine Verlustmeldung.'
      },
      photos: {
        tr: 'İsviçre normlarına uygun 1 adet güncel pasaport fotoğrafı getirin.',
        en: 'Provide 1 recent passport photo complying with Swiss biometric standards.',
        de: 'Halten Sie 1 Passfoto nach Schweizer Kriterien bereit.'
      },
      embassySubmission: {
        tr: 'En yakın İsviçre Temsilciliğine (Botschaft / Konsulat) başvurun.',
        en: 'Visit the nearest Swiss representation (Embassy or Consulate General).',
        de: 'Suchen Sie die nächste Schweizer Vertretung (Botschaft/Konsulat) auf.'
      },
      travelDocIssuance: {
        tr: 'Temsilcilik acil seyahat için Geçici Pasaport düzenler.',
        en: 'The Swiss mission issues a provisional emergency passport.',
        de: 'Die Vertretung stellt einen provisorischen Notpass aus.'
      }
    }
  },

  // Hollanda (Ministerie van Buitenlandse Zaken)
  NL: {
    passportCode: 'NL',
    countryName: { tr: 'Hollanda', en: 'Netherlands', de: 'Niederlande' },
    ministryName: {
      tr: 'Hollanda Dışişleri Bakanlığı (BZ)',
      en: 'Ministry of Foreign Affairs of the Netherlands (BZ)',
      de: 'Niederländisches Außenministerium (BZ)'
    },
    crisisCenterTitle: {
      tr: '7/24 BZ İletişim Merkezi & Konsolosluk Kriz Masası',
      en: '24/7 BZ Contact Centre & Consular Crisis Hub',
      de: '24/7 BZ-Kontaktzentrum & Konsularischer Krisenstab'
    },
    hotline247: '+31 247 247 247',
    hotlineDomestic: '0247 247 247 (Hollanda içi)',
    officialPortalUrl: 'https://www.nederlandwereldwijd.nl',
    officialPortalName: 'Nederland Wereldwijd (nederlandwereldwijd.nl)',
    emergencyDocName: {
      tr: 'Acil Pasaport / Laissez-Passer (Noodpaspoort)',
      en: 'Emergency Passport (Noodpaspoort) / Laissez-passer',
      de: 'Notpass (Noodpaspoort) / Laissez-Passer'
    },
    emergencyDocValidity: {
      tr: 'Yalnızca acil seyahatin gerçekleştirilmesi için sınırlı sürelidir.',
      en: 'Valid strictly for the duration of the emergency journey home.',
      de: 'Gültig nur für die Dauer der unaufschiebbaren Reise.'
    },
    steps: {
      policeReport: {
        tr: 'Yerel polisten resmi tutanak (Politierapport) alın.',
        en: 'Request an official police report from the local law enforcement station.',
        de: 'Fordern Sie ein offizielles Polizeiprotokoll an.'
      },
      photos: {
        tr: 'Hollanda standartlarına uygun 2 adet pasaport fotoğrafı bulundurun.',
        en: 'Supply 2 recent photographs meeting Dutch passport criteria.',
        de: 'Halten Sie 2 Passbilder nach niederländischer Passnorm bereit.'
      },
      embassySubmission: {
        tr: 'Hollanda Büyükelçiliği veya Başkonsolosluğu ile randevulaşın/başvurun.',
        en: 'Proceed to the nearest Dutch Embassy or Consulate General.',
        de: 'Wenden Sie sich an die niederländische Botschaft oder das Generalkonsulat.'
      },
      travelDocIssuance: {
        tr: 'Şartlar karşılandığında Noodpaspoort teslim edilir.',
        en: 'An emergency passport (Noodpaspoort) is issued upon verification.',
        de: 'Nach Prüfung wird ein Noodpaspoort ausgestellt.'
      }
    }
  },

  // İspanya (MAEC)
  ES: {
    passportCode: 'ES',
    countryName: { tr: 'İspanya', en: 'Spain', de: 'Spanien' },
    ministryName: {
      tr: 'İspanya Dışişleri, AB ve İşbirliği Bakanlığı (MAEC)',
      en: 'Ministry of Foreign Affairs, European Union and Cooperation (MAEC)',
      de: 'Ministerium für Auswärtige Angelegenheiten (MAEC)'
    },
    crisisCenterTitle: {
      tr: 'Konsolosluk Acil Durum Birimi (UEC 7/24)',
      en: 'Consular Emergency Unit (Unidad de Emergencia Consular 24/7)',
      de: 'Konsularische Notfalleinheit (UEC 24/7)'
    },
    hotline247: '+34 91 379 97 00',
    hotlineDomestic: '91 379 97 00',
    officialPortalUrl: 'https://www.exteriores.gob.es',
    officialPortalName: 'MAEC Portal Consular (exteriores.gob.es)',
    emergencyDocName: {
      tr: 'Salvoconducto (İspanya’ya Dönüş Seyahat Belgesi)',
      en: 'Emergency Travel Document (Salvoconducto)',
      de: 'Notfall-Reisedokument (Salvoconducto)'
    },
    emergencyDocValidity: {
      tr: 'Yalnızca İspanya’ya doğrudan tek yönlü dönüş için (azami 48-72 saat) geçerlidir.',
      en: 'Valid exclusively for direct single-entry return to Spain (usually 48-72 hours).',
      de: 'Gültig ausschließlich für die direkte Rückreise nach Spanien.'
    },
    steps: {
      policeReport: {
        tr: 'Yerel polise başvurarak kayıp/hırsızlık şikayet tutanağı (Denuncia) çıkartın.',
        en: 'Report the incident at the nearest police station and request a Denuncia.',
        de: 'Erstatten Sie bei der örtlichen Polizei eine Diebstahl- oder Verlustanzeige.'
      },
      photos: {
        tr: 'Açık fonlu 2 adet vesikalık fotoğraf hazırlayın.',
        en: 'Carry 2 standard passport photographs with a light background.',
        de: 'Halten Sie 2 biometrische Passfotos bereit.'
      },
      embassySubmission: {
        tr: 'En yakın İspanya Büyükelçiliği veya Başkonsolosluğu acil servisine başvurun.',
        en: 'Head directly to the Spanish Embassy or Consulate General consular desk.',
        de: 'Sprechen Sie beim spanischen Konsulat oder der Botschaft vor.'
      },
      travelDocIssuance: {
        tr: 'Uçak biletiniz doğrulanarak derhal "Salvoconducto" tanzim edilir.',
        en: 'Following airline booking confirmation, a Salvoconducto is issued immediately.',
        de: 'Nach Vorlage des Tickets wird das Salvoconducto unverzüglich ausgestellt.'
      }
    }
  },

  // İsveç (UD)
  SE: {
    passportCode: 'SE',
    countryName: { tr: 'İsveç', en: 'Sweden', de: 'Schweden' },
    ministryName: {
      tr: 'İsveç Dışişleri Bakanlığı (Utrikesdepartementet - UD)',
      en: 'Ministry for Foreign Affairs of Sweden (UD)',
      de: 'Schwedisches Außenministerium (UD)'
    },
    crisisCenterTitle: {
      tr: 'UD-Jouren (7/24 Konsolosluk Kriz Masası)',
      en: 'UD-Jouren (24/7 Consular Crisis & Emergency Desk)',
      de: 'UD-Jouren (24/7 Konsularischer Notdienst)'
    },
    hotline247: '+46 8 405 50 05',
    hotlineDomestic: '08-405 50 05 (İsveç içi)',
    officialPortalUrl: 'https://www.regeringen.se/ud',
    officialPortalName: 'Sweden Abroad (swedenabroad.se)',
    emergencyDocName: {
      tr: 'Provisoriskt Pass (Geçici Acil Pasaport)',
      en: 'Provisional Passport (Provisoriskt pass)',
      de: 'Provisorischer Pass (Provisoriskt pass)'
    },
    emergencyDocValidity: {
      tr: 'Yalnızca acil seyahat veya doğrudan İsveç’e dönüş süresince geçerlidir.',
      en: 'Valid exclusively for the duration of the emergency trip home.',
      de: 'Gültig ausschließlich für die Dauer der unaufschiebbaren Reise.'
    },
    steps: {
      policeReport: {
        tr: 'Yerel polisten resmi kayıp tutanağı (Polisanmälan) alın.',
        en: 'File a police report and obtain a copy of the official loss notification.',
        de: 'Erstatten Sie bei der örtlichen Polizei eine Verlustanzeige.'
      },
      photos: {
        tr: '2 adet güncel vesikalık fotoğraf temin edin.',
        en: 'Supply 2 recent biometric photos.',
        de: 'Halten Sie 2 aktuelle Passfotos bereit.'
      },
      embassySubmission: {
        tr: 'İsveç Büyükelçiliği veya Başkonsolosluğu ile temas kurun.',
        en: 'Visit the nearest Swedish Embassy or Consulate.',
        de: 'Suchen Sie die schwedische Vertretung auf.'
      },
      travelDocIssuance: {
        tr: 'Temsilcilik acil dönüş için Provisoriskt Pass düzenler.',
        en: 'The mission produces a provisional passport for your repatriation.',
        de: 'Die Vertretung stellt einen provisorischen Pass für die Heimreise aus.'
      }
    }
  },

  // Norveç (UD)
  NO: {
    passportCode: 'NO',
    countryName: { tr: 'Norveç', en: 'Norway', de: 'Norwegen' },
    ministryName: {
      tr: 'Norveç Dışişleri Bakanlığı (Utenriksdepartementet - UD)',
      en: 'Ministry of Foreign Affairs of Norway (UD)',
      de: 'Norwegisches Außenministerium (UD)'
    },
    crisisCenterTitle: {
      tr: 'UD Operasyon Merkezi & Kriz Destek Hattı (7/24)',
      en: 'UD 24/7 Operations Centre & Consular Crisis Unit',
      de: 'UD 24/7 Notfallzentrum & Konsularischer Krisendienst'
    },
    hotline247: '+47 23 95 00 00',
    hotlineDomestic: '23 95 00 00 (Norveç içi)',
    officialPortalUrl: 'https://www.regjeringen.no/ud',
    officialPortalName: 'Reiseklar UD (regjeringen.no/ud)',
    emergencyDocName: {
      tr: 'Nødpass (Acil Durum Pasaportu)',
      en: 'Emergency Passport (Nødpass)',
      de: 'Notpass (Nødpass)'
    },
    emergencyDocValidity: {
      tr: 'Yalnızca tek bir seyahat için geçerli olup dönüşte polise teslim edilmelidir.',
      en: 'Valid exclusively for a single journey; must be surrendered on arrival.',
      de: 'Gültig nur für eine einzige Reise; muss bei Rückkehr abgegeben werden.'
    },
    steps: {
      policeReport: {
        tr: 'Yerel polise başvurarak kayıp belgesi alın.',
        en: 'Obtain an official loss receipt from local police.',
        de: 'Sichern Sie sich eine polizeiliche Verlustbestätigung.'
      },
      photos: {
        tr: '2 adet onaylı biyometrik fotoğraf hazırlayın.',
        en: 'Prepare 2 passport photos according to Norwegian standards.',
        de: 'Halten Sie 2 vorschriftsmäßige Passfotos bereit.'
      },
      embassySubmission: {
        tr: 'En yakın Norveç Büyükelçiliğine başvurun.',
        en: 'Contact the nearest Norwegian Embassy or Consulate.',
        de: 'Wenden Sie sich an die norwegische Auslandsvertretung.'
      },
      travelDocIssuance: {
        tr: 'Nødpass belgesi düzenlenerek teslim edilir.',
        en: 'An emergency passport (Nødpass) is prepared for repatriation.',
        de: 'Ein Nødpass wird für die Rückkehr ausgestellt.'
      }
    }
  },

  // Brezilya (Itamaraty)
  BR: {
    passportCode: 'BR',
    countryName: { tr: 'Brezilya', en: 'Brazil', de: 'Brasilien' },
    ministryName: {
      tr: 'Brezilya Dışişleri Bakanlığı (Itamaraty)',
      en: 'Ministry of Foreign Affairs of Brazil (Itamaraty)',
      de: 'Brasilianisches Außenministerium (Itamaraty)'
    },
    crisisCenterTitle: {
      tr: 'Vatandaş Yardım Merkezi & Konsolosluk Nöbeti (7/24)',
      en: 'Consular Assistance & Emergency Duty Desk (Plantão Consular 24/7)',
      de: 'Konsularischer Bereitschaftsdienst (Plantão Consular 24/7)'
    },
    hotline247: '+55 61 98260 0610',
    hotlineDomestic: '(61) 98260-0610 (Brezilya içi)',
    officialPortalUrl: 'https://www.gov.br/mre',
    officialPortalName: 'Portal Consular Itamaraty (gov.br/mre)',
    emergencyDocName: {
      tr: 'Brezilya’ya Dönüş İzni (Autorização de Retorno ao Brasil - ARB)',
      en: 'Authorization of Return to Brazil (ARB) / Emergency Passport',
      de: 'Rückreisegenehmigung nach Brasilien (ARB) / Notpass'
    },
    emergencyDocValidity: {
      tr: 'Yalnızca Brezilya’ya tek yönlü doğrudan dönüş için geçerlidir.',
      en: 'Valid solely for direct one-way return to Brazilian territory.',
      de: 'Gültig ausschließlich für die direkte Rückreise nach Brasilien.'
    },
    steps: {
      policeReport: {
        tr: 'Olay yerindeki polisten resmi şikayet tutanağı (Boletim de Ocorrência / Police Report) alın.',
        en: 'Request an official police report (Police Report) from local police.',
        de: 'Erstatten Sie Anzeige bei der örtlichen Polizei.'
      },
      photos: {
        tr: '2 adet güncel vesikalık fotoğraf hazırlayın.',
        en: 'Prepare 2 recent passport-format photos.',
        de: 'Halten Sie 2 aktuelle Passfotos bereit.'
      },
      embassySubmission: {
        tr: 'Brezilya Büyükelçiliği veya Başkonsolosluğuna acil müracaat edin.',
        en: 'Present your case to the Brazilian Embassy or Consulate General.',
        de: 'Sprechen Sie beim brasilianischen Konsulat oder der Botschaft vor.'
      },
      travelDocIssuance: {
        tr: 'Uçuşunuz teyit edildikten sonra ücretsiz ARB belgesi tanzim edilir.',
        en: 'Upon flight verification, the ARB document is issued free of charge.',
        de: 'Nach Ticketprüfung wird das ARB-Dokument kostenfrei ausgestellt.'
      }
    }
  },

  // Azerbaycan (XİN)
  AZ: {
    passportCode: 'AZ',
    countryName: { tr: 'Azerbaycan', en: 'Azerbaijan', de: 'Aserbaidschan' },
    ministryName: {
      tr: 'Azerbaycan Cumhuriyeti Dışişleri Bakanlığı (XİN)',
      en: 'Ministry of Foreign Affairs of the Republic of Azerbaijan',
      de: 'Außenministerium der Republik Aserbaidschan'
    },
    crisisCenterTitle: {
      tr: 'Konsulluk İdarəsi Qaynar Xətti (7/24)',
      en: 'MFA Consular Department Emergency Hotline (24/7)',
      de: 'Konsularische Notrufhotline des Außenministeriums (24/7)'
    },
    hotline247: '+994 12 596 90 00',
    hotlineDomestic: '(012) 596 90 00 (Bakü)',
    officialPortalUrl: 'https://mfa.gov.az',
    officialPortalName: 'XİN Konsulluq Xidməti (mfa.gov.az)',
    emergencyDocName: {
      tr: 'Qayıdış Şəhadətnaməsi (Azerbaycan’a Dönüş Belgesi)',
      en: 'Certificate of Return to Azerbaijan (Qayıdış Şəhadətnaməsi)',
      de: 'Rückkehrbescheinigung nach Aserbaidschan'
    },
    emergencyDocValidity: {
      tr: 'Yalnızca Azerbaycan’a tek yönlü doğrudan dönüş için 15-30 gün geçerlidir.',
      en: 'Valid exclusively for direct return travel to Azerbaijan within 15-30 days.',
      de: 'Gültig ausschließlich für die direkte Rückreise nach Aserbaidschan.'
    },
    steps: {
      policeReport: {
        tr: 'Yerli polis orqanından pasportun itməsi/oğurlanması barədə arayış alın.',
        en: 'Obtain an official certificate of passport loss from local police.',
        de: 'Fordern Sie bei der örtlichen Polizei eine Verlustbescheinigung an.'
      },
      photos: {
        tr: 'Ağ fonda çəkilmiş 2 ədəd biometrik fotoşəkil hazırlayın.',
        en: 'Provide 2 recent biometric photos with a white background.',
        de: 'Halten Sie 2 biometrische Passfotos bereit.'
      },
      embassySubmission: {
        tr: 'Ən yaxın Azərbaycan Səfirliyinə və ya Baş Konsulluğuna müraciət edin.',
        en: 'Contact the nearest Embassy or Consulate General of Azerbaijan.',
        de: 'Wenden Sie sich an die aserbaidschanische Botschaft oder das Konsulat.'
      },
      travelDocIssuance: {
        tr: 'Təcili qayıdış üçün rəsmi "Qayıdış Şəhadətnaməsi" təqdim olunur.',
        en: 'A Certificate of Return is issued to enable prompt travel back to Azerbaijan.',
        de: 'Eine Rückkehrbescheinigung wird für die Heimreise ausgestellt.'
      }
    }
  }
};

/**
 * Verilen pasaport koduna göre doğrulanmış kriz ve konsolosluk verisini döner.
 * Eğer özel kaydı yoksa o ülkenin Dışişleri Bakanlığı standart formatında üretir.
 */
export function getConsularEmergencyInfo(passportCode: string, _lang: string = 'tr'): ConsularEmergencyInfo {
  const code = (passportCode || 'TR').toUpperCase();
  const found = CONSULAR_EMERGENCY_DATA[code];
  if (found) return found;

  // Global standart diplomatik kriz şablonu (199 ülke için)
  const countryNameTr = getCountryName(code, 'tr');
  const countryNameEn = getCountryName(code, 'en');
  const countryNameDe = getCountryName(code, 'de');
  return {
    passportCode: code,
    countryName: { tr: countryNameTr, en: countryNameEn, de: countryNameDe },
    ministryName: {
      tr: `${countryNameTr} Dışişleri Bakanlığı`,
      en: `Ministry of Foreign Affairs of ${countryNameEn}`,
      de: `Außenministerium von ${countryNameDe}`
    },
    crisisCenterTitle: {
      tr: 'Vatandaş Kriz Masası & Konsolosluk Acil Yardım Hattı',
      en: 'Citizen Crisis Center & Consular Assistance Hotline',
      de: 'Krisenstab & Konsularische Notrufhotline'
    },
    hotline247: 'Nöbetçi Konsolosluk & Diplomatik Kriz Masası',
    hotlineDomestic: 'Yetkili Dış Temsilcilik Nöbetçi Hattı',
    officialPortalUrl: `https://www.google.com/search?q=${encodeURIComponent(`Ministry of Foreign Affairs of ${countryNameEn} consular services`)}`,
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
        en: `Proceed to the nearest Embassy or Consulate of ${countryNameEn} for emergency assistance.`,
        de: `Suchen Sie die nächste Botschaft oder das Konsulat von ${countryNameDe} auf.`
      },
      travelDocIssuance: {
        tr: 'Konsolosluk, kimlik ve uçak bileti teyidinin ardından ülkenize dönüş için Acil Seyahat Belgesi tanzim eder.',
        en: 'Upon identity and ticket verification, an Emergency Travel Document will be issued for direct repatriation.',
        de: 'Nach Prüfung von Identität und Flugticket wird ein Notreisedokument für die Heimreise ausgestellt.'
      }
    }
  };
}
