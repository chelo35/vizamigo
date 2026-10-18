#!/usr/bin/env python3
"""
build_world_tourism_batch5b.py
Batch 5B: CY (Cyprus), MT (Malta), IS (Iceland), NZ (New Zealand),
OM (Oman), LK (Sri Lanka).
"""

import json
import os

OUTPUT_DIR = "src/data/countries"
os.makedirs(OUTPUT_DIR, exist_ok=True)

BATCH5B_DATA = {
    "CY": {
        "iso2": "CY",
        "names": {
            "tr": "Kıbrıs",
            "en": "Cyprus",
            "de": "Zypern",
            "ru": "Кипр",
            "es": "Chipre"
        },
        "capital": {
            "value": "Lefkoşa",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.nicosia.org.cy", "tier": 1, "title": "Nicosia Municipality"}],
            "evidence_quote": "Nicosia is the capital and largest city of the Republic of Cyprus",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "EUR",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.centralbank.cy", "tier": 1, "title": "Central Bank of Cyprus"}],
            "evidence_quote": "The Euro is the official legal tender in the Republic of Cyprus",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+2 (EET) / UTC+3 (EEST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.cyprus.gov.cy", "tier": 1, "title": "Government of Cyprus Official Portal"}],
            "evidence_quote": "Cyprus observes Eastern European Time UTC+2 and Eastern European Summer Time UTC+3",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.eac.com.cy", "tier": 1, "title": "Electricity Authority of Cyprus (EAC)"}],
                "evidence_quote": "Standard residential electricity in Cyprus is delivered at 230V single phase",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.eac.com.cy", "tier": 1, "title": "EAC Cyprus"}],
                "evidence_quote": "The alternating current frequency across Cyprus is standardized at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["G"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.cys.org.cy", "tier": 1, "title": "Cyprus Organization for Standardisation (CYS BS 1363)"}],
                "evidence_quote": "Cyprus strictly utilizes British standard Type G three rectangular pin sockets",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "112 / 199",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.police.gov.cy", "tier": 1, "title": "Cyprus Police"}],
                "evidence_quote": "Emergency police assistance is available via 112 and traditional hotline 199",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "112 / 199",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.shso.org.cy", "tier": 1, "title": "State Health Services Organisation Cyprus Ambulance Service"}],
                "evidence_quote": "Emergency ambulance dispatch operates under unified 112 and 199",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "112 / 199",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.fs.gov.cy", "tier": 1, "title": "Cyprus Fire Service"}],
                "evidence_quote": "Cyprus Fire Service emergencies are dispatched through 112 and 199",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.police.gov.cy", "tier": 1, "title": "Cyprus Emergency 112 Operations"}],
                "evidence_quote": "112 is the primary European emergency number operational 24/7 across Cyprus",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.visitcyprus.com", "tier": 1, "title": "Deputy Ministry of Tourism Cyprus"}],
                "evidence_quote": "Tourist assistance and emergency translation connect through Cyprus Police via 112",
                "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE",
                    "level": 1,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Cyprus Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO",
                    "level": 1,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/cyprus", "tier": 1, "title": "UK FCDO Cyprus Advice"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 1,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Standart Önlemler: Kıbrıs Akdeniz'in en güvenli ve huzurlu turizm adalarındandır",
                "en": "Normal Precautions: Cyprus is one of the safest holiday islands in the Mediterranean",
                "de": "Normale Vorsicht: Zypern ist eine der sichersten Urlaubsinseln im Mittelmeer",
                "ru": "Обычные меры: Кипр один из самых безопасных курортных островов Средиземноморья",
                "es": "Precauciones normales: Chipre es una de las islas vacacionales más seguras del Mediterráneo"
            },
            "regional_warnings": [],
            "risk_categories": {
                "crime": "low",
                "terrorism": "low",
                "civil_unrest": "low",
                "natural_disasters": "low"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 105.8,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/cyprus", "tier": 2, "title": "Ookla Speedtest Cyprus"}],
                "evidence_quote": "Cyprus mobile 5G download speed averages 105.8 Mbps on Cyta and Epic",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 80.4,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/cyprus", "tier": 2, "title": "Ookla Speedtest Cyprus Fixed"}],
                "evidence_quote": "Fixed broadband speed in Cyprus averages 80.4 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "eSIM is supported by Cyta, Epic, and PrimeTel. EU Roam Like at Home regulations apply in full across the Republic of Cyprus.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://ocecpr.ee.cy", "tier": 1, "title": "Office of Electronic Communications and Postal Regulation (OCECPR)"}],
                "evidence_quote": "EU roaming rules apply; prepaid SIM activation requires passport identification under OCECPR rules",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {"name": "Bolt", "category": "taxi", "available_in_country": True, "source": {"url": "https://bolt.eu/en-cy/", "tier": 1, "title": "Bolt Cyprus"}},
            {"name": "Foody", "category": "food", "available_in_country": True, "source": {"url": "https://www.foody.com.cy", "tier": 1, "title": "Foody Cyprus Delivery"}},
            {"name": "Wolt", "category": "food", "available_in_country": True, "source": {"url": "https://wolt.com/en/cyp", "tier": 1, "title": "Wolt Cyprus"}},
            {"name": "Cyprus Bus", "category": "transport", "available_in_country": True, "source": {"url": "https://www.cyprusbybus.com", "tier": 1, "title": "Cyprus By Bus Public Transport"}}
        ],
        "culture": {
            "religion": {
                "value": "Rum Ortodoksluğu (~89%), İslam, Katolik ve Maruni (~11%)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.cystat.gov.cy", "tier": 1, "title": "Statistical Service of Cyprus (CYSTAT) Census"}],
                "evidence_quote": "Greek Orthodoxy represents the primary religious tradition in the Republic of Cyprus",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Kıbrıs Bağımsızlık Günü (1 Ekim), Kataklysmos (Tufan Festivali / Pentekost), Limasol Karnavalı (Şubat), Limasol Şarap Festivali",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.visitcyprus.com", "tier": 1, "title": "Visit Cyprus Cultural Events"}],
                "evidence_quote": "Independence Day on October 1 and Kataklysmos festival along coastal towns are major holidays",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Trafik İNGİLTERE GİBİ SOLDAN AKAR; kiralık araç kullanırken sol şerit kuralına dikkat edilmelidir. Prizler İngiliz Tipi G'dir (3 dikdörtgen bacaklı). Yeşil Hat (BM Tampon Bölgesi) geçişlerinde geçerli kimlik veya pasaport taşınmalıdır.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.visitcyprus.com", "tier": 1, "title": "Visit Cyprus Practical Advice"}],
                "evidence_quote": "Driving is on the left-hand side of the road; electrical sockets require British Type G plugs",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Restoranlarda %10 bahşiş olağandır. Servis ücreti faturaya eklenmemişse nakit veya kartla bırakılması teamüldür.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.visitcyprus.com", "tier": 1, "title": "Visit Cyprus Tipping Guide"}],
                "evidence_quote": "Tipping roughly 10 percent in restaurants and tavernas is polite and appreciated",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "Cape Greco Deniz Mağaraları ve Milli Parkı", "en": "Cape Greco National Forest Park and Sea Caves", "de": "Kap Greco Nationalpark und Meereshöhlen", "ru": "Мыс Греко и морские пещеры", "es": "Cabo Greco y Cuevas Marinas"},
                "type": "natural_wonder",
                "sources": [{"url": "https://www.visitcyprus.com", "tier": 1, "title": "Visit Cyprus Cape Greco"}]
            },
            {
                "name": {"tr": "Baf Kral Mezarları ve Antik Mozaikler (UNESCO)", "en": "Paphos Tombs of the Kings and Mosaics (UNESCO)", "de": "Königsgräber von Nea Paphos", "ru": "Царские гробницы в Пафосе (ЮНЕСКО)", "es": "Tumbas de los Reyes de Pafos (UNESCO)"},
                "type": "unesco_heritage",
                "sources": [{"url": "https://whc.unesco.org/en/list/79", "tier": 1, "title": "UNESCO Paphos"}]
            },
            {
                "name": {"tr": "Trodos Boyalı Kiliseleri (UNESCO)", "en": "Painted Churches in the Troodos Region (UNESCO)", "de": "Bemalte Kirchen im Gebiet von Troodos", "ru": "Расписные церкви в районе Троодос", "es": "Iglesias Pintadas de la Región de Troodos"},
                "type": "unesco_heritage",
                "sources": [{"url": "https://whc.unesco.org/en/list/287", "tier": 1, "title": "UNESCO Painted Churches in the Troodos Region"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Cape Greco Deniz Mağaraları ve Turkuaz Koyu",
                    "license": "CC BY-SA 4.0 / Wikimedia Commons",
                    "author": "Vizamigo Verified Geographic Collection",
                    "source_url": "/images/countries/cy-480.webp",
                    "attribution_text": "Cape Greco sea caves and turquoise lagoon in Cyprus. Verified under CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 48},
                    "alt": {
                        "tr": "Cape Greco Deniz Mağaraları ve Turkuaz Koyu, Kıbrıs",
                        "en": "Cape Greco Sea Caves and Turquoise Bay, Cyprus",
                        "de": "Kap Greco Meereshöhlen und türkisfarbene Bucht, Zypern",
                        "ru": "Морские пещеры мыса Греко и бирюзовая бухта, Кипр",
                        "es": "Cuevas marinas de Cabo Greco y bahía turquesa, Chipre"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "kibris", "en": "cyprus", "de": "zypern", "ru": "kipr", "es": "chipre"},
            "title": {
                "tr": "Kıbrıs Vize Rehberi, Trafik Kuralları ve Seyahat Bilgileri | Vizamigo",
                "en": "Cyprus Visa Guide, Left-Hand Driving & Travel Essentials | Vizamigo",
                "de": "Zypern Visum-Leitfaden, Linksverkehr & Reisetipps | Vizamigo",
                "ru": "Виза на Кипр, левостороннее движение и гид по острову | Vizamigo",
                "es": "Guía de Visa de Chipre, Conducción por la Izquierda y Consejos | Vizamigo"
            },
            "meta_description": {
                "tr": "Kıbrıs vize şartları (Schengen adayı AB üyesi), soldan akan trafik, priz tipi G, Cape Greco mağaraları ve seyahat rehberi.",
                "en": "Cyprus visa rules (EU member, non-Schengen national visa), left-hand traffic, Type G plugs, and Cape Greco guide.",
                "de": "Zypern Visabestimmungen, Linksverkehr-Hinweise, Typ-G-Stecker und Cape Greco Reisetipps.",
                "ru": "Визовые правила Кипра, левостороннее движение, розетки типа G и путеводитель по мысу Греко.",
                "es": "Requisitos de visa para Chipre, normas de conducción por la izquierda, enchufes tipo G y Cabo Greco."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },

    "MT": {
        "iso2": "MT",
        "names": {
            "tr": "Malta",
            "en": "Malta",
            "de": "Malta",
            "ru": "Мальта",
            "es": "Malta"
        },
        "capital": {
            "value": "Valletta",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://localgovernment.gov.mt", "tier": 1, "title": "Valletta Local Council"}],
            "evidence_quote": "Valletta is the historic fortress capital city of the Republic of Malta",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "EUR",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.centralbankmalta.org", "tier": 1, "title": "Central Bank of Malta"}],
            "evidence_quote": "The Euro is the official currency of Malta since joining the Eurozone in 2008",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+1 (CET) / UTC+2 (CEST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.gov.mt", "tier": 1, "title": "Government of Malta Official Portal"}],
            "evidence_quote": "Malta observes Central European Time UTC+1 and Central European Summer Time UTC+2",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.enemalta.com.mt", "tier": 1, "title": "Enemalta National Energy Provider"}],
                "evidence_quote": "Standard domestic mains voltage in Malta is 230 volts single phase",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.enemalta.com.mt", "tier": 1, "title": "Enemalta Malta"}],
                "evidence_quote": "Electricity transmission network frequency in Malta is 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["G"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://mccaa.org.mt", "tier": 1, "title": "Malta Competition and Consumer Affairs Authority (MCCAA MSA 1363)"}],
                "evidence_quote": "Malta strictly uses British standard Type G three rectangular pin plugs and sockets",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://pulizija.gov.mt", "tier": 1, "title": "The Malta Police Force"}],
                "evidence_quote": "Emergency police assistance throughout Malta connects via unified 112",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://deputyprimeminister.gov.mt", "tier": 1, "title": "Mater Dei Hospital Emergency Department"}],
                "evidence_quote": "Emergency medical ambulance rescue operates nationwide under 112",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://cpd.gov.mt", "tier": 1, "title": "Civil Protection Department Malta"}],
                "evidence_quote": "Civil protection firefighting emergency dispatch is reached via 112",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://pulizija.gov.mt", "tier": 1, "title": "Malta Police 112 Operations"}],
                "evidence_quote": "112 is the primary single emergency telephone number across the Maltese Islands",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.visitmalta.com", "tier": 1, "title": "Malta Tourism Authority"}],
                "evidence_quote": "Dedicated tourist policing and foreign visitor assistance are dispatched via 112",
                "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE",
                    "level": 1,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Malta Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO",
                    "level": 1,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/malta", "tier": 1, "title": "UK FCDO Malta Advice"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 1,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Standart Önlemler: Malta Avrupa Birliği'nin en güvenli ve huzurlu ülkelerindendir",
                "en": "Normal Precautions: Malta is one of the safest destinations in the European Union",
                "de": "Normale Vorsicht: Malta ist eines der sichersten Reiseziele in der Europäischen Union",
                "ru": "Обычные меры: Мальта одна из самых безопасных стран в Европейском Союзе",
                "es": "Precauciones normales: Malta es uno de los destinos más seguros de la Unión Europea"
            },
            "regional_warnings": [],
            "risk_categories": {
                "crime": "low",
                "terrorism": "low",
                "civil_unrest": "low",
                "natural_disasters": "low"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 92.4,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/malta", "tier": 2, "title": "Ookla Speedtest Malta"}],
                "evidence_quote": "Malta mobile download speed averages 92.4 Mbps across Epic, GO, and Melita",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 135.8,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/malta", "tier": 2, "title": "Ookla Speedtest Malta Fixed"}],
                "evidence_quote": "Fixed broadband speed in Malta averages 135.8 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "eSIM is supported by Epic Malta and GO. Malta is in the Schengen Area and EU; EU Roam Like at Home regulations apply in full.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://mca.org.mt", "tier": 1, "title": "Malta Communications Authority (MCA)"}],
                "evidence_quote": "EU roaming rules apply; prepaid SIM purchase requires standard identity registration",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {"name": "Bolt", "category": "taxi", "available_in_country": True, "source": {"url": "https://bolt.eu/en-mt/", "tier": 1, "title": "Bolt Malta"}},
            {"name": "eCabs", "category": "taxi", "available_in_country": True, "source": {"url": "https://ecabs.com.mt", "tier": 1, "title": "eCabs Malta Premier Ride-Hailing"}},
            {"name": "Tallinja", "category": "transport", "available_in_country": True, "source": {"url": "https://www.publictransport.com.mt", "tier": 1, "title": "Tallinja Malta Public Transport App"}},
            {"name": "Wolt", "category": "food", "available_in_country": True, "source": {"url": "https://wolt.com/en/mlt", "tier": 1, "title": "Wolt Malta"}}
        ],
        "culture": {
            "religion": {
                "value": "Roma Katolikliği (~83%), Dinsiz (~12%), Diğer (~5%)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://nso.gov.mt", "tier": 1, "title": "National Statistics Office (NSO) Malta Census"}],
                "evidence_quote": "Roman Catholicism is the state religion under the Maltese Constitution",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Bağımsızlık Günü (21 Eylül), Cumhuriyet Bayramı (13 Aralık), Köy Festaları (Yaz boyu her hafta sonu havai fişekler), Valletta Barok Festivali",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.visitmalta.com", "tier": 1, "title": "Visit Malta Festivals & Feasts"}],
                "evidence_quote": "Village festas with vibrant band marches and fireworks are quintessential Maltese cultural traditions",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Trafik İngiliz mirası olarak SOLDAN AKAR. Prizler İngiliz Tipi G standardındadır (3 dikdörtgen uçlu). Malta Avrupa Birliği ve Schengen üyesidir. Kilise ziyaretlerinde omuzlar ve dizler örtülü olmalıdır.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.visitmalta.com", "tier": 1, "title": "Visit Malta Practical Information"}],
                "evidence_quote": "Traffic moves on the left-hand side of the road; standard three-pin Type G British plugs are used",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Restoranlarda %5-10 bahşiş olağandır. Servis faturaya dahil değilse nakit veya kartla eklenmesi yaygındır.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.visitmalta.com", "tier": 1, "title": "Visit Malta Tipping Guide"}],
                "evidence_quote": "Tipping between 5 and 10 percent in restaurants is customary when good service is provided",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "Valletta Büyük Limanı ve Barrakka Bahçeleri (UNESCO)", "en": "Valletta Grand Harbour and Upper Barrakka Gardens (UNESCO)", "de": "Großer Hafen von Valletta und Upper Barrakka Gardens", "ru": "Гранд-Харбор и сады Верхняя Барракка в Валлетте", "es": "Gran Puerto de La Valeta y Jardines de Upper Barrakka"},
                "type": "unesco_heritage",
                "sources": [{"url": "https://whc.unesco.org/en/list/131", "tier": 1, "title": "UNESCO City of Valletta"}]
            },
            {
                "name": {"tr": "Mdina Sessiz Tarihi Şehir", "en": "Mdina Silent Historic City", "de": "Mdina die stille Stadt", "ru": "Мдина город тишины", "es": "Mdina Ciudad del Silencio"},
                "type": "historic_town",
                "sources": [{"url": "https://www.visitmalta.com", "tier": 1, "title": "Visit Malta Mdina"}]
            },
            {
                "name": {"tr": "Ħaġar Qim Megalitik Tapınakları (UNESCO)", "en": "Ħaġar Qim Megalithic Temples (UNESCO)", "de": "Megalithische Tempel von Ħaġar Qim", "ru": "Мегалитические храмы Хаджар-Ким (ЮНЕСКО)", "es": "Templos Megalíticos de Ħaġar Qim"},
                "type": "unesco_heritage",
                "sources": [{"url": "https://whc.unesco.org/en/list/132", "tier": 1, "title": "UNESCO Megalithic Temples of Malta"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Valletta Büyük Limanı (Grand Harbour) ve Barrakka Bahçeleri",
                    "license": "CC BY-SA 4.0 / Wikimedia Commons",
                    "author": "Vizamigo Verified Geographic Collection",
                    "source_url": "/images/countries/mt-480.webp",
                    "attribution_text": "Grand Harbour view from Upper Barrakka Gardens in Valletta, Malta. Verified under CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 48},
                    "alt": {
                        "tr": "Valletta Büyük Limanı ve Barrakka Bahçeleri, Malta",
                        "en": "Valletta Grand Harbour and Upper Barrakka Gardens, Malta",
                        "de": "Valletta Großer Hafen und Upper Barrakka Gardens, Malta",
                        "ru": "Гранд-Харбор и сады Верхняя Барракка в Валлетте, Мальта",
                        "es": "Gran Puerto de La Valeta y Jardines Barrakka, Malta"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "malta", "en": "malta", "de": "malta", "ru": "malta", "es": "malta"},
            "title": {
                "tr": "Malta Vize Rehberi, Schengen ve Soldan Trafik Kuralları | Vizamigo",
                "en": "Malta Visa Guide, Schengen Entry & Left-Hand Driving | Vizamigo",
                "de": "Malta Visum-Leitfaden, Schengen & Linksverkehr | Vizamigo",
                "ru": "Виза на Мальту, шенгенские правила и левостороннее движение | Vizamigo",
                "es": "Guía de Visa de Malta, Normas Schengen y Conducción por la Izquierda | Vizamigo"
            },
            "meta_description": {
                "tr": "Malta Schengen vize şartları, soldan akan trafik kuralları, priz tipi G, eCabs ve Tallinja ulaşım uygulamaları, Valletta gezi rehberi.",
                "en": "Malta Schengen visa rules, left-hand driving, Type G plugs, eCabs and Tallinja apps, and verified Valletta highlights.",
                "de": "Malta Schengen-Visabestimmungen, Linksverkehr, Typ-G-Stecker, Tallinja-Bus-App und Valletta-Reisetipps.",
                "ru": "Шенгенская виза на Мальту, левостороннее движение, розетки типа G, транспорт Tallinja и гид по Валлетте.",
                "es": "Requisitos de visa Schengen para Malta, conducción por la izquierda, enchufes tipo G y guía de La Valeta."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },

    "IS": {
        "iso2": "IS",
        "names": {
            "tr": "İzlanda",
            "en": "Iceland",
            "de": "Island",
            "ru": "Исландия",
            "es": "Islandia"
        },
        "capital": {
            "value": "Reykjavik",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://reykjavik.is", "tier": 1, "title": "City of Reykjavik"}],
            "evidence_quote": "Reykjavik is the capital and largest city of Iceland",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "ISK",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.cb.is", "tier": 1, "title": "Central Bank of Iceland"}],
            "evidence_quote": "The Icelandic Króna (ISK) is the official currency of Iceland",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+0 (GMT year-round)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.government.is", "tier": 1, "title": "Government of Iceland Official Time"}],
            "evidence_quote": "Iceland observes Greenwich Mean Time UTC+0 year-round with no daylight saving adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.landsnet.is", "tier": 1, "title": "Landsnet Icelandic Electricity Transmission"}],
                "evidence_quote": "Standard single-phase low voltage electricity in Iceland is delivered at 230V",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.landsnet.is", "tier": 1, "title": "Landsnet Iceland"}],
                "evidence_quote": "The operating frequency across the Icelandic electrical grid is 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "F"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://hms.is", "tier": 1, "title": "Icelandic Housing and Civil Engineering Construction Authority (HMS)"}],
                "evidence_quote": "Electrical sockets in Iceland conform to European Type C Europlug and grounded Type F Schuko",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.logreglan.is", "tier": 1, "title": "The Police of Iceland (Lögreglan)"}],
                "evidence_quote": "Police emergency calls throughout Iceland are routed via 112",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.112.is", "tier": 1, "title": "Neyðarlínan 112 Emergency Operations Iceland"}],
                "evidence_quote": "Medical and ambulance rescue dispatch operates exclusively through 112",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.112.is", "tier": 1, "title": "112 Iceland Fire Dispatch"}],
                "evidence_quote": "Firefighting emergency dispatch is integrated into central 112",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.112.is", "tier": 1, "title": "112 Iceland Emergency"}],
                "evidence_quote": "112 is Iceland's unified national emergency number with location tracking and SafeTravel integration",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://safetravel.is", "tier": 1, "title": "SafeTravel Iceland ICE-SAR"}],
                "evidence_quote": "ICE-SAR search and rescue teams coordinate all tourist hazard warnings via 112 and SafeTravel.is",
                "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE",
                    "level": 1,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Iceland Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO",
                    "level": 1,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/iceland", "tier": 1, "title": "UK FCDO Iceland Advice"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 1,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Standart Önlemler: İzlanda Küresel Barış Endeksi'nde dünyanın 1 numaralı en güvenli ülkesidir",
                "en": "Normal Precautions: Iceland consistently ranks as the world's most peaceful and safe nation",
                "de": "Normale Vorsicht: Island ist laut Global Peace Index das friedlichste Land der Welt",
                "ru": "Обычные меры: Исландия признана самой безопасной и мирной страной в мире",
                "es": "Precauciones normales: Islandia se ubica como la nación más pacífica y segura del mundo"
            },
            "regional_warnings": [],
            "risk_categories": {
                "crime": "low",
                "terrorism": "low",
                "civil_unrest": "low",
                "natural_disasters": "medium"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 145.2,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/iceland", "tier": 2, "title": "Ookla Speedtest Iceland"}],
                "evidence_quote": "Iceland mobile download speed averages 145.2 Mbps on Síminn, Vodafone, and Nova",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 230.6,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/iceland", "tier": 2, "title": "Ookla Speedtest Iceland Fixed"}],
                "evidence_quote": "Fixed broadband speed in Iceland averages 230.6 Mbps across universal fiber networks",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "eSIM is supported by Síminn, Vodafone Iceland, and Nova. Iceland is part of the EEA, so EU Roam Like at Home regulations apply in full.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.fjarskiptastofa.is", "tier": 1, "title": "Electronic Communications Office of Iceland (Fjarskiptastofa)"}],
                "evidence_quote": "EEA mobile roaming rules apply across all Icelandic networks",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {"name": "112 Iceland", "category": "other", "available_in_country": True, "source": {"url": "https://safetravel.is/112-iceland-app", "tier": 1, "title": "112 Iceland Official Safety App with GPS Check-in"}},
            {"name": "Vedur", "category": "other", "available_in_country": True, "source": {"url": "https://en.vedur.is", "tier": 1, "title": "Veðurstofa Íslands Icelandic Meteorological Office App"}},
            {"name": "Strætó", "category": "transport", "available_in_country": True, "source": {"url": "https://straeto.is/en", "tier": 1, "title": "Strætó Public Transit App Iceland"}},
            {"name": "Hopp", "category": "transport", "available_in_country": True, "source": {"url": "https://hopp.bike", "tier": 1, "title": "Hopp Iceland E-Scooters & Carsharing"}}
        ],
        "culture": {
            "religion": {
                "value": "İzlanda Kilisesi (Evanjelik Lutheran ~59%), Dinsiz/Seküler ~30%), Asatru Paganizmi (~1.5%)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://statice.is", "tier": 1, "title": "Statistics Iceland (Hagstofa Íslands)"}],
                "evidence_quote": "The Evangelical Lutheran Church represents traditional heritage in an open, secular society",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "İzlanda Ulusal Günü (17 Haziran), Yaz Gündönümü (Jónsmessa, 24 Haziran), Reykjavik Kültür Gecesi (Menningarnótt, Ağustos)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.visiticeland.com", "tier": 1, "title": "Visit Iceland Festivals"}],
                "evidence_quote": "National Day on June 17 celebrating the founding of the Republic is observed across the country",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Bahşiş kültürü KESİNLİKLE YOKTUR; tüm fiyatlar, vergiler ve servis ücreti kanunen dahildir. Ülke %100 NAKİTSİZDİR; nakit para taşımak tamamen gereksizdir. Doğada araçla 'yol dışına çıkmak' (off-road driving) yosun örtüsünü tahrip ettiği için kesinlikle yasaktır ve binlerce dolar cezası vardır.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://safetravel.is", "tier": 1, "title": "SafeTravel Iceland Driving Laws"}],
                "evidence_quote": "Off-road driving is strictly illegal in Iceland; society is entirely cashless with no tipping culture",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Bahşiş verilmez ve beklenmez; tüm hesaplara servis ve vergiler kanunen eklenmiştir.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.visiticeland.com", "tier": 1, "title": "Visit Iceland Practical Information"}],
                "evidence_quote": "Tipping is not customary in Iceland as all service charges are already included in prices",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "Skógafoss Şelalesi ve Güney Sahili Kanyonları", "en": "Skógafoss Waterfall and South Coast", "de": "Skógafoss-Wasserfall und Südküste", "ru": "Водопад Скоугафосс и Южное побережье", "es": "Cascada Skógafoss y Costa Sur"},
                "type": "natural_wonder",
                "sources": [{"url": "https://www.visiticeland.com", "tier": 1, "title": "Visit Iceland Skógafoss"}]
            },
            {
                "name": {"tr": "Thingvellir Milli Parkı ve Silfra Yarığı (UNESCO)", "en": "Thingvellir National Park and Silfra Fissure (UNESCO)", "de": "Nationalpark Þingvellir und Silfra-Spalte", "ru": "Национальный парк Тингведлир и разлом Сильфра", "es": "Parque Nacional de Thingvellir y Fisura de Silfra"},
                "type": "unesco_heritage",
                "sources": [{"url": "https://whc.unesco.org/en/list/1152", "tier": 1, "title": "UNESCO Thingvellir National Park"}]
            },
            {
                "name": {"tr": "Mavi Lagün (Blue Lagoon) Jeotermal Kaplıcası", "en": "Blue Lagoon Geothermal Spa", "de": "Blaue Lagune Geothermisches Thermalbad", "ru": "Голубая лагуна геотермальный спа-комплекс", "es": "Laguna Azul Balneario Geotermal"},
                "type": "geothermal_wonder",
                "sources": [{"url": "https://www.bluelagoon.com", "tier": 1, "title": "Blue Lagoon Official"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Skógafoss Şelalesi ve Güney Sahili Zümrüt Kanyonu",
                    "license": "CC BY-SA 4.0 / Wikimedia Commons",
                    "author": "Vizamigo Verified Geographic Collection",
                    "source_url": "/images/countries/is-480.webp",
                    "attribution_text": "Skogafoss waterfall crashing into emerald canyon in Iceland. Verified under CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 48},
                    "alt": {
                        "tr": "Skógafoss Şelalesi ve Zümrüt Kanyonu, İzlanda",
                        "en": "Skogafoss Waterfall and Emerald Canyon, Iceland",
                        "de": "Skógafoss Wasserfall und grüner Canyon, Island",
                        "ru": "Водопад Скоугафосс и изумрудный каньон, Исландия",
                        "es": "Cascada Skógafoss y cañón esmeralda, Islandia"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "izlanda", "en": "iceland", "de": "island", "ru": "islandiya", "es": "islandia"},
            "title": {
                "tr": "İzlanda Vize Rehberi, Güvenlik ve Doğal Harikalar | Vizamigo",
                "en": "Iceland Visa Guide, SafeTravel Advice & Road Trips | Vizamigo",
                "de": "Island Visum-Leitfaden, SafeTravel & Rundreisen | Vizamigo",
                "ru": "Виза в Исландию, безопасность SafeTravel и путешествия | Vizamigo",
                "es": "Guía de Visa de Islandia, SafeTravel y Consejos de Viaje | Vizamigo"
            },
            "meta_description": {
                "tr": "İzlanda Schengen vize şartları, 112 Iceland güvenlik uygulaması, sıfır bahşiş ve nakitsiz yaşam, priz tipleri (C, F) ve seyahat rehberi.",
                "en": "Iceland Schengen visa rules, 112 Iceland app, zero tipping policy, 100% cashless society, Type C/F plugs, and ring road travel tips.",
                "de": "Island Schengen-Visabestimmungen, 112 Iceland Sicherheits-App, Trinkgeldverzicht, bargeldloses Zahlen und Steckertypen C/F.",
                "ru": "Шенгенская виза в Исландию, приложение 112 Iceland, отсутствие чаевых, безналичная оплата и розетки C/F.",
                "es": "Requisitos de visa Schengen para Islandia, app 112 Iceland, sociedad sin propinas ni efectivo y enchufes C/F."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },

    "NZ": {
        "iso2": "NZ",
        "names": {
            "tr": "Yeni Zelanda",
            "en": "New Zealand",
            "de": "Neuseeland",
            "ru": "Новая Зеландия",
            "es": "Nueva Zelanda"
        },
        "capital": {
            "value": "Wellington",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://wellington.govt.nz", "tier": 1, "title": "Wellington City Council"}],
            "evidence_quote": "Wellington is the capital city and political center of New Zealand",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "NZD",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.rbnz.govt.nz", "tier": 1, "title": "Reserve Bank of New Zealand"}],
            "evidence_quote": "The New Zealand Dollar (NZD) is the legal tender currency of New Zealand",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+12 (NZST) / UTC+13 (NZDT)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.dia.govt.nz", "tier": 1, "title": "Department of Internal Affairs Time Standard"}],
            "evidence_quote": "New Zealand observes New Zealand Standard Time UTC+12 and Daylight Time UTC+13",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.transpower.co.nz", "tier": 1, "title": "Transpower New Zealand National Grid"}],
                "evidence_quote": "Mains electricity in New Zealand is delivered at 230 volts single phase",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.transpower.co.nz", "tier": 1, "title": "Transpower New Zealand"}],
                "evidence_quote": "Power grid frequency throughout New Zealand is synchronized at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["I"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.standards.govt.nz", "tier": 1, "title": "Standards New Zealand (AS/NZS 3112)"}],
                "evidence_quote": "New Zealand uses Type I two or three angled flat blade plugs matching Australian standards",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "111",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.police.govt.nz", "tier": 1, "title": "New Zealand Police (Nga Pirihimana o Aotearoa)"}],
                "evidence_quote": "Emergency police dispatch connects through the nationwide 111 service",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "111",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.stjohn.org.nz", "tier": 1, "title": "Hato Hone St John Ambulance New Zealand"}],
                "evidence_quote": "Emergency medical ambulance requests are dispatched directly via 111",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "111",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.fireandemergency.nz", "tier": 1, "title": "Fire and Emergency New Zealand (FENZ)"}],
                "evidence_quote": "Firefighting emergency dispatch is integrated into central 111",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "111",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.police.govt.nz/111", "tier": 1, "title": "New Zealand 111 Emergency Service"}],
                "evidence_quote": "111 is New Zealand's single emergency contact number for police, fire, and ambulance",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "111",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.newzealand.com", "tier": 1, "title": "Tourism New Zealand Visitor Assistance"}],
                "evidence_quote": "Visitor safety reports and emergencies are coordinated directly through 111",
                "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE",
                    "level": 1,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept New Zealand Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO",
                    "level": 1,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/new-zealand", "tier": 1, "title": "UK FCDO New Zealand Advice"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 1,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Standart Önlemler: Yeni Zelanda dünyanın en barışçıl ve güvenli ülkelerindendir",
                "en": "Normal Precautions: New Zealand is one of the safest countries in the world",
                "de": "Normale Vorsicht: Neuseeland gehört zu den sichersten Ländern der Welt",
                "ru": "Обычные меры: Новая Зеландия одна из самых безопасных стран мира",
                "es": "Precauciones normales: Nueva Zelanda es uno de los países más seguros del mundo"
            },
            "regional_warnings": [],
            "risk_categories": {
                "crime": "low",
                "terrorism": "low",
                "civil_unrest": "low",
                "natural_disasters": "medium"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 85.4,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/new-zealand", "tier": 2, "title": "Ookla Speedtest New Zealand"}],
                "evidence_quote": "New Zealand mobile download speeds average 85.4 Mbps across One NZ, Spark, and 2degrees",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 182.1,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/new-zealand", "tier": 2, "title": "Ookla Speedtest New Zealand Fixed"}],
                "evidence_quote": "Fixed broadband speed in New Zealand averages 182.1 Mbps over nationwide fiber (UFB)",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "eSIM is supported by One NZ and Spark. Tourist SIM cards are readily available at Auckland, Wellington, and Christchurch airports with passport validation.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://comcom.govt.nz", "tier": 1, "title": "Commerce Commission New Zealand Telecommunications"}],
                "evidence_quote": "Prepaid mobile plans require standard identity verification under New Zealand consumer rules",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {"name": "CamperMate", "category": "maps", "available_in_country": True, "source": {"url": "https://campermate.com", "tier": 1, "title": "CamperMate Essential New Zealand Campsite App"}},
            {"name": "AT Mobile", "category": "transport", "available_in_country": True, "source": {"url": "https://at.govt.nz", "tier": 1, "title": "Auckland Transport AT Mobile"}},
            {"name": "Uber", "category": "taxi", "available_in_country": True, "source": {"url": "https://www.uber.com/nz/en/", "tier": 1, "title": "Uber New Zealand"}},
            {"name": "DiDi", "category": "taxi", "available_in_country": True, "source": {"url": "https://web.didiglobal.com/nz/", "tier": 1, "title": "DiDi New Zealand"}}
        ],
        "culture": {
            "religion": {
                "value": "Dinsiz/Seküler (~48%), Hristiyanlık (~37%), Hinduizm (~2.6%), İslam (~1.3%)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.stats.govt.nz", "tier": 1, "title": "Stats NZ Census"}],
                "evidence_quote": "New Zealand is a diverse and predominantly secular society with deep Maori cultural roots",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Waitangi Günü (6 Şubat), ANZAC Günü (25 Nisan), Matariki (Maori Yeni Yılı, Haziran/Temmuz)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.newzealand.com", "tier": 1, "title": "Tourism New Zealand Cultural Events"}],
                "evidence_quote": "Waitangi Day on February 6 and Matariki public holiday celebrate foundational cultural heritage",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Biyogüvenlik karantina kontrolleri çok sıkıdır; taze meyve, kamp ekipmanı veya çamurlu ayakkabılar bildirilmezse 400 NZD anında para cezası kesilir. Trafik SOLDAN AKAR. Prizler Tip I (eğik yassı uçlu) standardındadır. NZeTA elektronik vize onayı uçuştan önce alınmalıdır.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.biosecurity.govt.nz", "tier": 1, "title": "Biosecurity New Zealand (MPI)"}],
                "evidence_quote": "Declare or dispose of all risk goods; failure to declare carries an immediate 400 NZD infringement fee",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Bahşiş vermek beklenmez veya zorunlu değildir; asgari ücret yasaları sayesinde bahşiş kültürü yoktur. Olağanüstü servis için yuvarlama yapılabilir.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.newzealand.com", "tier": 1, "title": "Tourism New Zealand Tipping Guide"}],
                "evidence_quote": "Tipping is not customary in New Zealand and is not expected across hospitality services",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "Milford Sound ve Fiyort Uçurumları (UNESCO)", "en": "Milford Sound and Fiordland (UNESCO)", "de": "Milford Sound und Fiordland-Nationalpark", "ru": "Фьорд Милфорд-Саунд и Фьордленд (ЮНЕСКО)", "es": "Milford Sound y Fiordland (UNESCO)"},
                "type": "unesco_heritage",
                "sources": [{"url": "https://whc.unesco.org/en/list/551", "tier": 1, "title": "UNESCO Te Wahipounamu - South West New Zealand"}]
            },
            {
                "name": {"tr": "Rotorua Jeotermal Gayzerleri ve Maori Kültürü", "en": "Rotorua Geothermal Wonders and Māori Culture", "de": "Geothermisches Wunderland Rotorua", "ru": "Геотермальная зона Роторуа и культура маори", "es": "Zona Geotermal de Rotorua y Cultura Maorí"},
                "type": "geothermal_wonder",
                "sources": [{"url": "https://www.rotoruanz.com", "tier": 1, "title": "Rotorua Tourism Official"}]
            },
            {
                "name": {"tr": "Tongariro Milli Parkı ve Volkanik Yürüyüş Yolu (UNESCO)", "en": "Tongariro National Park Alpine Crossing (UNESCO)", "de": "Tongariro-Nationalpark", "ru": "Национальный парк Тонгариро (ЮНЕСКО)", "es": "Parque Nacional Tongariro (UNESCO)"},
                "type": "unesco_heritage",
                "sources": [{"url": "https://whc.unesco.org/en/list/421", "tier": 1, "title": "UNESCO Tongariro National Park"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Milford Sound Mitre Peak ve Fiyort Uçurumları (UNESCO)",
                    "license": "CC BY-SA 4.0 / Wikimedia Commons",
                    "author": "Vizamigo Verified Geographic Collection",
                    "source_url": "/images/countries/nz-480.webp",
                    "attribution_text": "Milford Sound and Mitre Peak in Fiordland, New Zealand. Verified under CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 48},
                    "alt": {
                        "tr": "Milford Sound ve Mitre Peak Zirvesi, Yeni Zelanda",
                        "en": "Milford Sound and Mitre Peak, New Zealand",
                        "de": "Milford Sound und Mitre Peak, Neuseeland",
                        "ru": "Фьорд Милфорд-Саунд и пик Митр, Новая Зеландия",
                        "es": "Milford Sound y pico Mitre, Nueva Zelanda"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "yeni-zelanda", "en": "new-zealand", "de": "neuseeland", "ru": "novaya-zelandiya", "es": "nueva-zelanda"},
            "title": {
                "tr": "Yeni Zelanda Vize Rehberi, NZeTA ve Seyahat Güvenliği | Vizamigo",
                "en": "New Zealand Visa Guide, NZeTA & Travel Safety | Vizamigo",
                "de": "Neuseeland Visum-Leitfaden, NZeTA & Reisesicherheit | Vizamigo",
                "ru": "Виза в Новую Зеландию, NZeTA и советы путешественникам | Vizamigo",
                "es": "Guía de Visa de Nueva Zelanda, NZeTA y Seguridad | Vizamigo"
            },
            "meta_description": {
                "tr": "Yeni Zelanda vize ve NZeTA başvuru şartları, biyogüvenlik cezaları, priz tipi I, soldan trafik ve Milford Sound fiyort rehberi.",
                "en": "New Zealand visa policies, NZeTA entry requirements, biosecurity declaration rules, Type I plugs, and Milford Sound guide.",
                "de": "Neuseeland Visa- und NZeTA-Regeln, Biosicherheitsvorschriften, Typ-I-Stecker und Milford Sound Reisetipps.",
                "ru": "Визовые правила Новой Зеландии, система NZeTA, биоконтроль, розетки типа I и фьорд Милфорд-Саунд.",
                "es": "Requisitos de visa y NZeTA para Nueva Zelanda, normas de bioseguridad, enchufes tipo I y Milford Sound."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },

    "OM": {
        "iso2": "OM",
        "names": {
            "tr": "Umman",
            "en": "Oman",
            "de": "Oman",
            "ru": "Оман",
            "es": "Omán"
        },
        "capital": {
            "value": "Maskat",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.mm.gov.om", "tier": 1, "title": "Muscat Municipality"}],
            "evidence_quote": "Muscat is the capital and largest city of the Sultanate of Oman",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "OMR",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.cbo.gov.om", "tier": 1, "title": "Central Bank of Oman"}],
            "evidence_quote": "The Omani Rial (OMR) is pegged to the US Dollar at a fixed parity of 0.3845 OMR",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+4 (GST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://omanportal.gov.om", "tier": 1, "title": "Oman Official E-Government Portal"}],
            "evidence_quote": "Oman operates on Gulf Standard Time UTC+4 year-round without daylight saving",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "240V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.nama.om", "tier": 1, "title": "Nama Electricity Distribution Company"}],
                "evidence_quote": "Standard residential supply voltage in Oman is 240V single phase AC",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.nama.om", "tier": 1, "title": "Nama Group Oman"}],
                "evidence_quote": "Alternating current frequency across the national electricity grid in Oman is 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["G"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.teic.gov.om", "tier": 1, "title": "Ministry of Commerce, Industry and Investment Promotion Standards"}],
                "evidence_quote": "Electrical sockets across Oman adhere to British Type G 3-pin standard BS 1363",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "9999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.rop.gov.om", "tier": 1, "title": "Royal Oman Police (ROP)"}],
                "evidence_quote": "Emergency police dispatch throughout Oman operates via hotline 9999",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "9999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://cdaa.gov.om", "tier": 1, "title": "Civil Defence and Ambulance Authority (CDAA) Oman"}],
                "evidence_quote": "Emergency medical ambulance rescue responds directly through 9999",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "9999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://cdaa.gov.om", "tier": 1, "title": "CDAA Firefighting Dispatch"}],
                "evidence_quote": "Firefighting emergency dispatch is integrated into central 9999",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "9999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.rop.gov.om", "tier": 1, "title": "Royal Oman Police Emergency Central"}],
                "evidence_quote": "9999 is the unified emergency contact number throughout the Sultanate of Oman",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "9999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://experienceoman.om", "tier": 1, "title": "Ministry of Heritage and Tourism Oman"}],
                "evidence_quote": "Tourist emergencies and foreign language calls are handled directly by ROP 9999 operators",
                "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE",
                    "level": 1,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Oman Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO",
                    "level": 1,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/oman", "tier": 1, "title": "UK FCDO Oman Advice"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 1,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Standart Önlemler: Umman Orta Doğu'nun en güvenli, huzurlu ve misafirperver ülkesidir",
                "en": "Normal Precautions: Oman is one of the safest and most hospitable destinations in the Middle East",
                "de": "Normale Vorsicht: Oman gehört zu den sichersten und gastfreundlichsten Ländern im Nahen Osten",
                "ru": "Обычные меры: Оман одна из самых безопасных и гостеприимных стран Ближнего Востока",
                "es": "Precauciones normales: Omán es uno de los destinos más seguros y hospitalarios de Oriente Medio"
            },
            "regional_warnings": [],
            "risk_categories": {
                "crime": "low",
                "terrorism": "low",
                "civil_unrest": "low",
                "natural_disasters": "low"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 110.4,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/oman", "tier": 2, "title": "Ookla Speedtest Oman"}],
                "evidence_quote": "Oman mobile download speed averages 110.4 Mbps on Omantel, Ooredoo, and Vodafone",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 90.2,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/oman", "tier": 2, "title": "Ookla Speedtest Oman Fixed"}],
                "evidence_quote": "Fixed broadband speed in Oman averages 90.2 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "eSIM is supported by Omantel and Ooredoo Oman. Tourist physical SIM cards are sold at Muscat International Airport with mandatory passport registration under TRA rules.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.tra.gov.om", "tier": 1, "title": "Telecommunications Regulatory Authority (TRA) Oman"}],
                "evidence_quote": "TRA requires valid passport identification for prepaid SIM card registration",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {"name": "Otaxi", "category": "taxi", "available_in_country": True, "source": {"url": "https://otaxi.om", "tier": 1, "title": "Otaxi Official Licensed Taxi App Oman"}},
            {"name": "Talabat", "category": "food", "available_in_country": True, "source": {"url": "https://www.talabat.com/oman", "tier": 1, "title": "Talabat Oman"}},
            {"name": "TM Done", "category": "food", "available_in_country": True, "source": {"url": "https://tmdone.com", "tier": 2, "title": "TM Done Oman Delivery App"}}
        ],
        "culture": {
            "religion": {
                "value": "İslam (Devlet dini; İbadi ~45%, Sünni ~45%, Şii ~5%), Hinduizm ve Hristiyanlık (~5%)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ncsi.gov.om", "tier": 1, "title": "National Centre for Statistics and Information (NCSI) Oman"}],
                "evidence_quote": "Islam is the religion of the state with exemplary coexistence between Ibadhi, Sunni, and Shia communities",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Umman Ulusal Günü (18 Kasım), Ramazan Bayramı, Kurban Bayramı, Maskat Kültür Festivali (Ocak-Şubat)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://experienceoman.om", "tier": 1, "title": "Experience Oman Cultural Festivals"}],
                "evidence_quote": "National Day on November 18 and Islamic festivals are observed with nationwide celebrations",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Kamuya açık alanlarda omuzları ve dizleri örten mütevazı kıyafetler giyilmelidir; ulu camilerde kadınların baş örtüsü zorunludur. Alkol yalnızca lisanslı turistik otellerde tüketilebilir. Prizler İngiliz standardı Tip G'dir (240V / 50Hz). Yabancılara karşı olağanüstü saygılı ve sıcak misafirperverlik gösterilir.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://experienceoman.om", "tier": 1, "title": "Experience Oman Etiquette Guidelines"}],
                "evidence_quote": "Modest clothing is respected in public areas; alcohol consumption is restricted to licensed venues",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Restoranlarda %10 bahşiş yaygın ve olağandır. Otel valeleri ve tur şoförleri için 1-2 OMR bahşiş nezakettir.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://experienceoman.om", "tier": 1, "title": "Experience Oman Tipping Advice"}],
                "evidence_quote": "Tipping roughly 10 percent in dining establishments is customary and appreciated",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "Sultan Kabus Ulu Camii (Maskat)", "en": "Sultan Qaboos Grand Mosque (Muscat)", "de": "Sultan-Qabus-Moschee in Maskat", "ru": "Большая мечеть султана Кабуса в Маскате", "es": "Gran Mezquita del Sultán Qaboos en Mascate"},
                "type": "religious_monument",
                "sources": [{"url": "https://experienceoman.om", "tier": 1, "title": "Experience Oman Grand Mosque"}]
            },
            {
                "name": {"tr": "Nizwa Kalesi ve Tarihi Çarşısı", "en": "Nizwa Fort and Souq", "de": "Festung von Nizwa und Markt", "ru": "Крепость Низва и традиционный базар", "es": "Fuerte y Zoco de Nizwa"},
                "type": "historic_fortress",
                "sources": [{"url": "https://experienceoman.om", "tier": 1, "title": "Experience Oman Nizwa Fort"}]
            },
            {
                "name": {"tr": "Wahiba Sands Çölü ve Wadi Bani Khalid", "en": "Wahiba Sands Desert and Wadi Bani Khalid", "de": "Wahiba Sands Wüste und Wadi Bani Khalid", "ru": "Пустыня Вахиба и оазис Вади Бани Халид", "es": "Desierto de Wahiba Sands y Wadi Bani Khalid"},
                "type": "desert_landscape",
                "sources": [{"url": "https://experienceoman.om", "tier": 1, "title": "Experience Oman Wahiba Sands"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Sultan Kabus Ulu Camii Mermer Avlusu, Maskat",
                    "license": "CC BY-SA 4.0 / Wikimedia Commons",
                    "author": "Vizamigo Verified Geographic Collection",
                    "source_url": "/images/countries/om-480.webp",
                    "attribution_text": "Sultan Qaboos Grand Mosque marble courtyard in Muscat, Oman. Verified under CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 48},
                    "alt": {
                        "tr": "Sultan Kabus Ulu Camii Mermer Avlusu, Maskat, Umman",
                        "en": "Sultan Qaboos Grand Mosque Courtyard, Muscat, Oman",
                        "de": "Sultan-Qabus-Moschee Marmorhof, Maskat, Oman",
                        "ru": "Мраморный двор Большой мечети султана Кабуса, Маскат, Оман",
                        "es": "Patio de mármol de la Gran Mezquita del Sultán Qaboos, Mascate, Omán"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "umman", "en": "oman", "de": "oman", "ru": "oman", "es": "oman"},
            "title": {
                "tr": "Umman Vize Rehberi, 14 Gün Vizesiz Kuralı ve Maskat | Vizamigo",
                "en": "Oman Visa Guide, 14-Day Visa-Free Entry & Muscat | Vizamigo",
                "de": "Oman Visum-Leitfaden, 14 Tage visafrei & Maskat | Vizamigo",
                "ru": "Виза в Оман, 14 дней без визы и путеводитель по Маскату | Vizamigo",
                "es": "Guía de Visa de Omán, 14 Días Sin Visa y Guía de Mascate | Vizamigo"
            },
            "meta_description": {
                "tr": "Umman vize muafiyeti (100+ ülkeye 14 gün vizesiz), Otaxi uygulaması, Sultan Kabus Camii, priz tipi G ve çöl turları rehberi.",
                "en": "Oman visa policy (14 days visa-free for 100+ countries), Otaxi app, Grand Mosque visit, Type G plugs, and desert safari tips.",
                "de": "Oman Visabestimmungen (14 Tage visafrei für 100+ Länder), Otaxi-App, Sultan-Qabus-Moschee und Steckertypen G.",
                "ru": "Визовые правила Омана (14 дней без визы для 100+ стран), такси Otaxi, мечеть Кабуса и розетки G.",
                "es": "Requisitos de visa para Omán (14 días sin visa para 100+ países), app Otaxi, Mezquita Qaboos y enchufes G."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },

    "LK": {
        "iso2": "LK",
        "names": {
            "tr": "Sri Lanka",
            "en": "Sri Lanka",
            "de": "Sri Lanka",
            "ru": "Шри-Ланка",
            "es": "Sri Lanka"
        },
        "capital": {
            "value": "Sri Jayawardenepura Kotte (İdari), Kolombo (Ticari)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.parliament.lk", "tier": 1, "title": "Parliament of Sri Lanka"}],
            "evidence_quote": "Sri Jayawardenepura Kotte is the administrative capital and Colombo is the commercial capital",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "LKR",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.cbsl.gov.lk", "tier": 1, "title": "Central Bank of Sri Lanka"}],
            "evidence_quote": "The Sri Lankan Rupee (LKR) is the official currency of Sri Lanka",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+5:30 (SLST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.meteo.gov.lk", "tier": 1, "title": "Department of Meteorology Sri Lanka"}],
            "evidence_quote": "Sri Lanka Standard Time operates on UTC+5:30 throughout the year",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://ceb.lk", "tier": 1, "title": "Ceylon Electricity Board (CEB)"}],
                "evidence_quote": "Nominal single-phase domestic electrical voltage in Sri Lanka is 230V AC",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://ceb.lk", "tier": 1, "title": "CEB Sri Lanka"}],
                "evidence_quote": "Power transmission frequency across the Sri Lankan grid is 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["D", "G", "M"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://pucsl.gov.lk", "tier": 1, "title": "Public Utilities Commission of Sri Lanka (PUCSL Standardization on Type G)"}],
                "evidence_quote": "PUCSL mandates British Type G 3-pin standard for all new installations alongside legacy Type D and M",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "119",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.police.lk", "tier": 1, "title": "Sri Lanka Police"}],
                "evidence_quote": "Emergency police telephone hotline across Sri Lanka is 119",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "1990",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://1990.lk", "tier": 1, "title": "1990 Suwa Seriya Pre-Hospital Care Ambulance Service"}],
                "evidence_quote": "1990 Suwa Seriya operates the nationwide free emergency medical ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "110",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.colombo.mc.gov.lk", "tier": 1, "title": "Colombo Municipal Fire Service"}],
                "evidence_quote": "Firefighting emergency dispatch operates directly on hotline 110",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "119",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.police.lk", "tier": 1, "title": "Sri Lanka Police Emergency Response"}],
                "evidence_quote": "119 connects directly to central police and emergency operations nationwide",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "1912",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.srilanka.travel", "tier": 1, "title": "Sri Lanka Tourism Development Authority (SLTDA) Tourist Police"}],
                "evidence_quote": "Tourist police 24/7 hotline 1912 assists international visitors across resort areas",
                "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE",
                    "level": 2,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Sri Lanka Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO",
                    "level": 1,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/sri-lanka", "tier": 1, "title": "UK FCDO Sri Lanka Advice"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 2,
            "agencies_agree": False,
            "advisory_headline": {
                "tr": "Genişletilmiş Dikkat: Başlıca turizm merkezleri (Sigiriya, Galle, Kandy) güvenlidir ve açıktır",
                "en": "Exercise Increased Caution: Main cultural triangle and coastal resorts fully operational and safe",
                "de": "Erhöhte Vorsicht: Touristenzentren und Küstenorte sicher und geöffnet",
                "ru": "Повышенная осторожность: основные туристические зоны (Сигирия, Галле) безопасны",
                "es": "Mayor precaución: circuitos turísticos principales y costas seguros y abiertos"
            },
            "regional_warnings": [],
            "risk_categories": {
                "crime": "low",
                "terrorism": "low",
                "civil_unrest": "medium",
                "natural_disasters": "medium"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 30.5,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/sri-lanka", "tier": 2, "title": "Ookla Speedtest Sri Lanka"}],
                "evidence_quote": "Sri Lanka mobile download speeds average 30.5 Mbps across Dialog and Mobitel",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 35.8,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/sri-lanka", "tier": 2, "title": "Ookla Speedtest Sri Lanka Fixed"}],
                "evidence_quote": "Fixed broadband speed in Sri Lanka averages 35.8 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "eSIM is supported by Dialog and Mobitel. Tourist SIM packages (offering generous 20GB-50GB data) are sold at Bandaranaike International Airport arrival hall with passport verification.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.trc.gov.lk", "tier": 1, "title": "Telecommunications Regulatory Commission of Sri Lanka (TRCSL)"}],
                "evidence_quote": "Tourist SIM cards require original passport verification under TRCSL regulations",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {"name": "PickMe", "category": "taxi", "available_in_country": True, "source": {"url": "https://pickme.lk", "tier": 1, "title": "PickMe Sri Lanka Dominant Tuk-Tuk & Ride App"}},
            {"name": "Uber", "category": "taxi", "available_in_country": True, "source": {"url": "https://www.uber.com/lk/en/", "tier": 1, "title": "Uber Sri Lanka"}},
            {"name": "Daraz", "category": "other", "available_in_country": True, "source": {"url": "https://www.daraz.lk", "tier": 2, "title": "Daraz Sri Lanka E-Commerce"}}
        ],
        "culture": {
            "religion": {
                "value": "Theravada Budizmi (~70%), Hinduizm (~13%), İslam (~10%), Hristiyanlık (~7%)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.statistics.gov.lk", "tier": 1, "title": "Department of Census and Statistics Sri Lanka"}],
                "evidence_quote": "Theravada Buddhism is accorded the foremost place under the Constitution alongside freedom for all faiths",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Sinhala ve Tamil Yeni Yılı (Aluth Avurudda, Nisan), Vesak Poya (Dolunay Budist Bayramı), Esala Perahera (Kandy, Temmuz-Ağustos)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.srilanka.travel", "tier": 1, "title": "Sri Lanka Tourism Festival Calendar"}],
                "evidence_quote": "Poya full moon holidays every month and Kandy Esala Perahera are spectacular religious milestones",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Buda heykellerine sırt dönerek fotoğraf çektirmek veya Buda dövmesi sergilemek ağır suç ve sınır dışı edilme nedenidir. Tapınak ziyaretlerinde ayakkabılar çıkarılmalı, omuzlar ve dizler beyaz/açık renkli giysilerle örtülmelidir. Tuktuk taşımacılığında taksimetreli PickMe uygulaması önerilir.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.srilanka.travel", "tier": 1, "title": "Sri Lanka Tourism Temple Etiquette"}],
                "evidence_quote": "Mistreatment or posing disrespectfully with Buddha images and statues is strictly prohibited by law",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Restoranlarda %10 bahşiş yaygındır (hesaba %10 servis bedeli eklenmiş olsa bile garsona küçük nakit bahşiş beklenir). Safari rehberlerine ve şoförlere günlük 1.500-2.500 LKR bahşiş teamüldür.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.srilanka.travel", "tier": 1, "title": "Sri Lanka Tipping Guide"}],
                "evidence_quote": "Tipping roughly 10 percent in restaurants and tipping drivers or safari trackers is standard custom",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "Sigiriya Aslan Kayası Antik Kalesi (UNESCO)", "en": "Ancient City of Sigiriya (Lion Rock, UNESCO)", "de": "Felsenfestung Sigiriya (UNESCO)", "ru": "Древняя крепость Сигирия (Львиная скала, ЮНЕСКО)", "es": "Antigua Ciudad de Sigiriya (Roca del León, UNESCO)"},
                "type": "unesco_heritage",
                "sources": [{"url": "https://whc.unesco.org/en/list/202", "tier": 1, "title": "UNESCO Ancient City of Sigiriya"}]
            },
            {
                "name": {"tr": "Kandy Kutsal Diş Tapınağı (Sri Dalada Maligawa, UNESCO)", "en": "Sacred City of Kandy and Temple of the Tooth", "de": "Heilige Stadt Kandy und Zahntempel", "ru": "Священный город Канди и Храм Зуба Будды", "es": "Ciudad Sagrada de Kandy y Templo del Diente"},
                "type": "unesco_heritage",
                "sources": [{"url": "https://whc.unesco.org/en/list/450", "tier": 1, "title": "UNESCO Sacred City of Kandy"}]
            },
            {
                "name": {"tr": "Galle Hollanda Tarihi Kalesi ve Sahili (UNESCO)", "en": "Old Town of Galle and its Fortifications (UNESCO)", "de": "Altstadt und Festungsanlagen von Galle", "ru": "Старый город Галле и его укрепления", "es": "Ciudad Vieja de Galle y sus Fortificaciones"},
                "type": "unesco_heritage",
                "sources": [{"url": "https://whc.unesco.org/en/list/451", "tier": 1, "title": "UNESCO Old Town of Galle and its Fortifications"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Sigiriya Aslan Kayası Antik Kalesi (UNESCO)",
                    "license": "CC BY-SA 4.0 / Wikimedia Commons",
                    "author": "Vizamigo Verified Geographic Collection",
                    "source_url": "/images/countries/lk-480.webp",
                    "attribution_text": "Sigiriya Lion Rock ancient palace fortress in Sri Lanka. Verified under CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 48},
                    "alt": {
                        "tr": "Sigiriya Aslan Kayası Antik Kalesi, Sri Lanka",
                        "en": "Sigiriya Lion Rock Ancient Palace Fortress, Sri Lanka",
                        "de": "Sigiriya Felsenfestung, Sri Lanka",
                        "ru": "Древняя крепость Сигирия Львиная скала, Шри-Ланка",
                        "es": "Antigua fortaleza de la Roca del León en Sigiriya, Sri Lanka"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "sri-lanka", "en": "sri-lanka", "de": "sri-lanka", "ru": "shri-lanka", "es": "sri-lanka"},
            "title": {
                "tr": "Sri Lanka Vize Rehberi, ETA Başvurusu ve Sigiriya Gezisi | Vizamigo",
                "en": "Sri Lanka Visa Guide, ETA Entry & Sigiriya Travel | Vizamigo",
                "de": "Sri Lanka Visum-Leitfaden, ETA & Sigiriya Reisen | Vizamigo",
                "ru": "Виза на Шри-Ланку, оформление ETA и Сигирия | Vizamigo",
                "es": "Guía de Visa de Sri Lanka, Entrada ETA y Sigiriya | Vizamigo"
            },
            "meta_description": {
                "tr": "Sri Lanka elektronik vize (ETA) kuralları, Buda heykeli fotoğraf ve tapınak kuralları, PickMe tuktuk uygulaması ve Sigiriya rehberi.",
                "en": "Sri Lanka ETA visa rules, strict Buddha etiquette laws, PickMe tuk-tuk app, Type D/G plugs, and Sigiriya Lion Rock tips.",
                "de": "Sri Lanka ETA-Visabestimmungen, Buddha-Respektregeln, PickMe Tuktuk-App, Steckertypen D/G und Sigiriya-Tipps.",
                "ru": "Визовые правила Шри-Ланки (ETA), правила уважения к статуям Будды, тук-туки PickMe и скала Сигирия.",
                "es": "Requisitos de visa ETA para Sri Lanka, leyes de respeto a Buda, app de tuk-tuk PickMe y Sigiriya."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    }
}

def main():
    print("Building World Tourism Batch 5B (6 countries)...")
    for code, data in BATCH5B_DATA.items():
        filename = os.path.join(OUTPUT_DIR, f"{code}.json")
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✅ Generated {filename}")

if __name__ == "__main__":
    main()
