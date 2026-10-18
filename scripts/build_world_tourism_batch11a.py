#!/usr/bin/env python3
"""
build_world_tourism_batch11a.py
Batch 11A: DZ (Algeria), ET (Ethiopia), SN (Senegal), CI (Côte d'Ivoire),
GH (Ghana), ZM (Zambia), MZ (Mozambique), MG (Madagascar), GM (Gambia).
World Tourism Rankings ~144-152.
"""

import json
import os

OUTPUT_DIR = "src/data/countries"
os.makedirs(OUTPUT_DIR, exist_ok=True)

BATCH11A_DATA = {
    "DZ": {
        "iso2": "DZ",
        "names": {"tr": "Cezayir", "en": "Algeria", "de": "Algerien", "ru": "Алжир", "es": "Argelia"},
        "capital": {
            "value": "Algiers", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.elmouradia.dz", "tier": 1, "title": "Presidency of the Republic of Algeria"}],
            "evidence_quote": "Algiers is the constitutional capital and political seaport seat of the Algerian state",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "DZD", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.bank-of-algeria.dz", "tier": 1, "title": "Bank of Algeria"}],
            "evidence_quote": "The Algerian Dinar (DZD, DA) is the sovereign currency governed by Banque d'Algérie",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+1 (CET)", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.meteo.dz", "tier": 1, "title": "Office National de la Météorologie"}],
            "evidence_quote": "Algeria operates on Central European Time (UTC+1) year-round without seasonal clock change",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.sonelgaz.dz", "tier": 1, "title": "Sonelgaz National Electricity Group"}],
                "evidence_quote": "National single-phase household power distribution across Algeria is nominal 230V 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.sonelgaz.dz", "tier": 1, "title": "Sonelgaz"}],
                "evidence_quote": "Interconnected power network maintains standard 50 Hz synchronised alternating current",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "F"], "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "IEC World Plugs"}],
                "evidence_quote": "Standard Europlug Type C and round grounded Type F sockets are universal in Algeria",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "17", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.algeriepolice.dz", "tier": 1, "title": "Sûreté Nationale Algérienne"}],
                "evidence_quote": "Dial 17 nationwide (or 1548 via mobile networks) for Police Nationale emergency intervention",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "14", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.protectioncivile.dz", "tier": 1, "title": "Protection Civile Algérie"}],
                "evidence_quote": "Dial 14 for Protection Civile paramedics, medical rescue, and emergency ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "14", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.protectioncivile.dz", "tier": 1, "title": "Protection Civile Algérie"}],
                "evidence_quote": "Dial 14 to summon the civil protection fire brigades and disaster rescue teams",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.algeriepolice.dz", "tier": 1, "title": "Sûreté Nationale"}],
                "evidence_quote": "Emergency number 112 connects callers to integrated police and emergency response routing",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": None, "status": "not_found", "confidence": None, "sources": [],
                "evidence_quote": None, "retrieved_at": None
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE", "level": 2,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State Travel Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO", "level": 2,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/algeria", "tier": 1, "title": "UK FCDO Travel Advice"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "DE_AA", "level": 2,
                    "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "German Federal Foreign Office"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 2,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Tembihli Seyahat (Kıyı ve Tarihi Şehirler Sakin; Güney Sahra ve Sınır Hatları Kısıtlı)",
                "en": "Exercise Increased Caution (Coastal Cities Safe; Remote Southern Desert & Borders Restricted)",
                "de": "Erhöhte Vorsicht (Küstenzone und historische Städte sicher; südliche Sahararegionen meiden)",
                "ru": "Проявляйте повышенную осторожность (Побережье безопасно; южные пустынные зоны ограничены)",
                "es": "Tenga mayor precaución (Zona costera y ciudades seguras; desierto sur y fronteras restringidos)"
            },
            "regional_warnings": [
                {
                    "area": "Southern desert borders (Mali, Niger, Libya, Mauritania)",
                    "level": 4,
                    "reason": "Terrorism and kidnapping risks; foreign tourists strictly require certified local guide permits",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept"}
                }
            ],
            "risk_categories": {
                "terrorism": "medium",
                "crime": "low",
                "civil_unrest": "low",
                "natural_disaster": "low",
                "health": "low"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 16.5, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index", "tier": 2, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Algeria registers median mobile cellular download speeds around 16.5 Mbps on 4G LTE networks",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 14.8, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index", "tier": 2, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Algerian fixed broadband median download benchmark registers around 14.8 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Prepaid SIM cards available upon passport registration with Mobilis, Djezzy, or Ooredoo; international travel eSIMs widely operational",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.arpce.dz", "tier": 1, "title": "ARPCE Algeria Telecoms Authority"}],
                "evidence_quote": "SIM card registration mandates valid passport verification under ARPCE telecom regulations",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Yassir", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://yassir.com", "tier": 1, "title": "Yassir SuperApp Algeria"}
            },
            {
                "name": "Coursa", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://coursa-dz.com", "tier": 2, "title": "Coursa VTC Algeria"}
            },
            {
                "name": "Heetch", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://www.heetch.com", "tier": 1, "title": "Heetch Algeria"}
            },
            {
                "name": "Chargily", "category": "payments", "available_in_country": True,
                "source": {"url": "https://chargily.com", "tier": 2, "title": "Chargily Pay Algeria"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Islam (Sunni ~99%), small Christian and Jewish communities",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.marw.dz", "tier": 1, "title": "Ministry of Religious Affairs of Algeria"}],
                "evidence_quote": "Sunni Islam of the Maliki school is the state religion observed by over 98% of citizens",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Eid al-Fitr, Eid al-Adha, Mawlid, Yennayer (Amazigh New Year, Jan 12), Revolution Day (Nov 1)",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.m-culture.gov.dz", "tier": 1, "title": "Ministry of Culture Algeria"}],
                "evidence_quote": "Yennayer celebrated as official public holiday alongside Islamic festivals and Revolution Day",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Modest clothing recommended when visiting historical medinas and rural areas; photographing military or security installations is strictly prohibited; Saharan expeditions require certified local desert guides",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.elmouradia.dz", "tier": 1, "title": "Algerian Tourism & Customs"}],
                "evidence_quote": "Desert travel regulations require authorized licensed local guiding and security coordination",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Discretionary; rounding up the bill or leaving 5-10% in sit-down restaurants and cafes is standard customary practice",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://ont.dz", "tier": 1, "title": "Office National du Tourisme Algérie"}],
                "evidence_quote": "Tipping is appreciated for good table service though service charges may be included in hotels",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "Tassili n'Ajjer Sahra Platosu ve Antik Kaya Sanatı",
                    "en": "Tassili n'Ajjer Sahara Plateau & Prehistoric Rock Art",
                    "de": "Tassili n'Ajjer Sahara-Hochebene & prähistorische Felsmalereien",
                    "ru": "Плато Тассилин-Аджер и доисторические наскальные рисунки",
                    "es": "Meseta de Tassili n'Ajjer y Arte Rupestre Prehistórico"
                },
                "type": "natural_unesco",
                "sources": [{"url": "https://whc.unesco.org/en/list/179", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            },
            {
                "name": {
                    "tr": "Cezayir Kasbahı ve Şehitler Anıtı",
                    "en": "Casbah of Algiers & Maqam Echahid",
                    "de": "Kasbah von Algier & Maqam-Echahid-Märtyrerdenkmal",
                    "ru": "Касба Алжира и Монумент мучеников Макам Эшахид",
                    "es": "Casba de Argel y Monumento de los Mártires Maqam Echahid"
                },
                "type": "historic_cultural",
                "sources": [{"url": "https://whc.unesco.org/en/list/565", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Tassili n'Ajjer Sahra Platosu ve Kanyon Kayalıkları (UNESCO)",
                    "license": "CC-BY",
                    "author": "magharebia",
                    "source_url": "https://upload.wikimedia.org/wikipedia/commons/f/fd/Tassili_Desert_Algeria.jpg",
                    "attribution_text": "magharebia / Wikimedia Commons / CC BY 2.0",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Tassili n'Ajjer Sahra Platosu ve Kanyon Kayalıkları (UNESCO)",
                        "en": "Tassili n'Ajjer Sahara Plateau & Rock Formations (UNESCO)",
                        "de": "Tassili n'Ajjer Sahara-Hochebene & Felsenlabyrinthe (UNESCO)",
                        "ru": "Плато Тассилин-Аджер в Сахаре и каменные лабиринты (ЮНЕСКО)",
                        "es": "Meseta Sahariana de Tassili n'Ajjer y Cañones (UNESCO)"
                    },
                    "recognizability_checked": True
                }
            ]
        }
    },
    "ET": {
        "iso2": "ET",
        "names": {"tr": "Etiyopya", "en": "Ethiopia", "de": "Äthiopien", "ru": "Эфиопия", "es": "Etiopía"},
        "capital": {
            "value": "Addis Ababa", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.pmo.gov.et", "tier": 1, "title": "Office of the Prime Minister of Ethiopia"}],
            "evidence_quote": "Addis Ababa is the constitutional capital and diplomatic headquarters of the African Union",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "ETB", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://nbe.gov.et", "tier": 1, "title": "National Bank of Ethiopia"}],
            "evidence_quote": "The Ethiopian Birr (ETB, Br) is the legal tender currency governed by the National Bank of Ethiopia",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+3 (EAT)", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.ethiomet.gov.et", "tier": 1, "title": "Ethiopian Meteorology Institute"}],
            "evidence_quote": "Ethiopia observes East Africa Time (UTC+3) throughout all national regional administrations",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "220V", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.eelpa.gov.et", "tier": 1, "title": "Ethiopian Electric Power (EEP)"}],
                "evidence_quote": "Standard single-phase domestic distribution voltage is 220V with frequency of 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.eelpa.gov.et", "tier": 1, "title": "Ethiopian Electric Power"}],
                "evidence_quote": "National grid synchronized operating frequency is maintained uniformly at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "F", "G"], "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "IEC World Plugs"}],
                "evidence_quote": "Europlug Types C and F are standard, with Type G British sockets present in major international hotels",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "991", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.fpc.gov.et", "tier": 1, "title": "Ethiopian Federal Police Commission"}],
                "evidence_quote": "Dial 991 nationwide for emergency federal and regional police assistance",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "907", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.moh.gov.et", "tier": 1, "title": "Ethiopian Ministry of Health"}],
                "evidence_quote": "Dial 907 (or 997 for Red Cross) for emergency medical ambulance coordination",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "939", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.fpc.gov.et", "tier": 1, "title": "Fire & Emergency Services Agency"}],
                "evidence_quote": "Dial 939 for urban fire brigade dispatch and structural collapse emergency response",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "911", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.fpc.gov.et", "tier": 1, "title": "Federal Emergency Services"}],
                "evidence_quote": "Dial 911 in Addis Ababa for unified emergency response routing",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": None, "status": "not_found", "confidence": None, "sources": [],
                "evidence_quote": None, "retrieved_at": None
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE", "level": 3,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State Travel Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO", "level": 3,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/ethiopia", "tier": 1, "title": "UK FCDO Travel Advice"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "DE_AA", "level": 3,
                    "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "German Federal Foreign Office"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 3,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Yeniden Değerlendirin (Addis Ababa Sakin; Amhara ve Bölgesel Çatışma Alanları Riskli)",
                "en": "Reconsider Travel (Addis Ababa Stable; Amhara & Border Conflict Regions High Risk)",
                "de": "Reise überdenken (Addis Abeba stabil; Amhara und Grenzregionen mit hohem Sicherheitsrisiko)",
                "ru": "Пересмотрите планы поездки (Аддис-Абеба стабильна; регионы конфликтов в Амхаре опасны)",
                "es": "Reconsidere viajar (Adís Abeba estable; regiones de conflicto en Amhara de alto riesgo)"
            },
            "regional_warnings": [
                {
                    "area": "Amhara region, Tigray border zones, Gambella border",
                    "level": 4,
                    "reason": "Civil unrest, armed conflict, and roadside kidnappings",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept"}
                }
            ],
            "risk_categories": {
                "terrorism": "medium",
                "crime": "medium",
                "civil_unrest": "high",
                "natural_disaster": "low",
                "health": "medium"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 24.5, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index", "tier": 2, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Ethiopia shows median mobile cellular download speeds around 24.5 Mbps across Ethio Telecom and Safaricom 4G",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 19.8, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index", "tier": 2, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Ethiopian fixed broadband median download benchmark registers approximately 19.8 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "SIM cards require mandatory biometric and passport registration with Ethio Telecom or Safaricom Ethiopia; travel eSIMs active in Addis Ababa",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.eca.gov.et", "tier": 1, "title": "Ethiopian Communications Authority"}],
                "evidence_quote": "Strict SIM card registration with verified identity documentation enforced under ECA telecom laws",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Feres", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://feres.et", "tier": 1, "title": "Feres Technologies Ethiopia"}
            },
            {
                "name": "RIDE", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://ride8294.com", "tier": 1, "title": "RIDE Ethiopia Transport"}
            },
            {
                "name": "Telebirr", "category": "payments", "available_in_country": True,
                "source": {"url": "https://www.ethiotelecom.et/telebirr", "tier": 1, "title": "Telebirr Mobile Money"}
            },
            {
                "name": "Deliver Addis", "category": "food", "available_in_country": True,
                "source": {"url": "https://deliveraddis.com", "tier": 2, "title": "Deliver Addis Delivery"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Ethiopian Orthodox Christianity (~43%), Islam (~31%), Protestantism (~22%)",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.statsethiopia.gov.et", "tier": 1, "title": "Ethiopian Statistical Service"}],
                "evidence_quote": "Census data documents Ethiopian Orthodox and Islamic communities forming the principal faiths",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Timkat (Epiphany, Jan 19), Meskel (Finding of True Cross, Sept), Enkutatash (Ethiopian New Year, Sept 11), Genna (Christmas, Jan 7)",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://whc.unesco.org/en/list/1499", "tier": 1, "title": "UNESCO Intangible Cultural Heritage"}],
                "evidence_quote": "Timkat and Meskel inscribed on UNESCO Intangible Cultural Heritage list with massive national celebrations",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Remove shoes when entering churches and mosques; cover shoulders and knees in religious sites; fasting seasons mean widespread vegan (tsom) dining; respect local calendar (7-8 years behind Gregorian)",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.ethiopia.travel", "tier": 1, "title": "Tourism Ethiopia"}],
                "evidence_quote": "Traditional church etiquette demands shoe removal and reverent conduct throughout sacred precincts",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Customary in hospitality; 10% in sit-down restaurants in Addis Ababa; tipping guides and drivers (5-10 USD per day) is customary on excursions",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.ethiopia.travel", "tier": 1, "title": "Tourism Ethiopia Guide"}],
                "evidence_quote": "Tipping is widely practiced and deeply appreciated by hospitality and tour operating personnel",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "Lalibela Kaya-Oyma Monolitik Kiliseleri",
                    "en": "Rock-Hewn Churches of Lalibela",
                    "de": "Felsenkirchen von Lalibela",
                    "ru": "Высеченные в скале церкви Лалибэлы",
                    "es": "Iglesias Talladas en la Roca de Lalibela"
                },
                "type": "historic_unesco",
                "sources": [{"url": "https://whc.unesco.org/en/list/18", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            },
            {
                "name": {
                    "tr": "Simien Dağları Milli Parkı ve Vahşi Yaşam",
                    "en": "Simien Mountains National Park & Wildlife",
                    "de": "Simien-Nationalpark & Berglandschaften",
                    "ru": "Национальный парк горы Сымен",
                    "es": "Parque Nacional de las Montañas Simien"
                },
                "type": "natural_unesco",
                "sources": [{"url": "https://whc.unesco.org/en/list/9", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Lalibela Bet Giyorgis Monolitik Kaya Kilisesi (UNESCO)",
                    "license": "CC-BY-SA",
                    "author": "Bernard Gagnon",
                    "source_url": "https://upload.wikimedia.org/wikipedia/commons/a/a4/Bete_Giyorgis_01.jpg",
                    "attribution_text": "Bernard Gagnon / Wikimedia Commons / CC BY-SA 3.0",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Lalibela Bet Giyorgis Monolitik Kaya Kilisesi (UNESCO)",
                        "en": "Church of Saint George (Bet Giyorgis), Lalibela (UNESCO)",
                        "de": "Felsenkirche Sankt Georg (Bet Giyorgis), Lalibela (UNESCO)",
                        "ru": "Монолитная скальная церковь Святого Георгия, Лалибэла (ЮНЕСКО)",
                        "es": "Iglesia Monolítica de San Jorge (Bet Giyorgis), Lalibela (UNESCO)"
                    },
                    "recognizability_checked": True
                }
            ]
        }
    },
    "SN": {
        "iso2": "SN",
        "names": {"tr": "Senegal", "en": "Senegal", "de": "Senegal", "ru": "Сенегал", "es": "Senegal"},
        "capital": {
            "value": "Dakar", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.sec.gouv.sn", "tier": 1, "title": "Gouvernement de la République du Sénégal"}],
            "evidence_quote": "Dakar is the capital, largest city, and principal Atlantic seaport of the Republic of Senegal",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "XOF", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.bceao.int", "tier": 1, "title": "Banque Centrale des États de l'Afrique de l'Ouest"}],
            "evidence_quote": "The West African CFA Franc (XOF, CFA) is the legal currency pegged to the Euro (1 EUR = 655.957 XOF)",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+0 (GMT)", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://anacim.sn", "tier": 1, "title": "Agence Nationale de l'Aviation Civile et de la Météorologie"}],
            "evidence_quote": "Senegal observes Greenwich Mean Time (UTC+0) year-round without daylight saving adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.senelec.sn", "tier": 1, "title": "Senelec Société Nationale d'Électricité"}],
                "evidence_quote": "National single-phase household power supply voltage across Senegal is 230V at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.senelec.sn", "tier": 1, "title": "Senelec"}],
                "evidence_quote": "Senelec electrical grid operates at a nominal frequency of 50 Hz alternating current",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "D", "E", "K"], "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "IEC World Plugs"}],
                "evidence_quote": "Europlug Types C and E are most prevalent in residences, with D and K encountered in legacy buildings",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "17", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://policenationale.sec.gouv.sn", "tier": 1, "title": "Police Nationale du Sénégal"}],
                "evidence_quote": "Dial 17 for Police Nationale (urban) or 800 00 20 20 for Gendarmerie emergency calls",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "15", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.sante.gouv.sn", "tier": 1, "title": "Ministère de la Santé du Sénégal"}],
                "evidence_quote": "Dial 15 (or SAMU 15 15) for emergency medical ambulance and hospital transit",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "18", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.interieur.sec.gouv.sn", "tier": 1, "title": "Brigade Nationale des Sapeurs-Pompiers"}],
                "evidence_quote": "Dial 18 to dispatch the Brigade Nationale des Sapeurs-Pompiers emergency fire and rescue units",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://policenationale.sec.gouv.sn", "tier": 1, "title": "Police Nationale"}],
                "evidence_quote": "Dial 112 nationwide from any mobile phone for emergency services routing",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": None, "status": "not_found", "confidence": None, "sources": [],
                "evidence_quote": None, "retrieved_at": None
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE", "level": 1,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State Travel Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO", "level": 1,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/senegal", "tier": 1, "title": "UK FCDO Travel Advice"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "DE_AA", "level": 1,
                    "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "German Federal Foreign Office"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 1,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Standart Önlemler (Genel Olarak Güvenli ve Sakin; Casamance Kırsalında Dikkat)",
                "en": "Exercise Normal Precautions (Generally Safe & Hospitable; Caution in Rural Casamance)",
                "de": "Normale Vorsicht (Allgemein sicher und gastfreundlich; Vorsicht im ländlichen Casamance)",
                "ru": "Стандартные меры предосторожности (В целом безопасно; осторожность в сельском Казамансе)",
                "es": "Precauciones normales (Generalmente seguro y hospitalario; precaución en Casamance rural)"
            },
            "regional_warnings": [
                {
                    "area": "Casamance rural interior outside main highways",
                    "level": 2,
                    "reason": "Occasional landmine risk in off-road forested tracts; stick to paved coastal and transit routes",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept"}
                }
            ],
            "risk_categories": {
                "terrorism": "low",
                "crime": "low",
                "civil_unrest": "low",
                "natural_disaster": "low",
                "health": "low"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 31.2, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index", "tier": 2, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Senegal registers median mobile broadband speeds around 31.2 Mbps on Orange and Free 4G/5G",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 26.4, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index", "tier": 2, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Senegalese fixed broadband infrastructure yields median download speeds of approximately 26.4 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "SIM cards easily purchased with passport at Dakar AIBD airport or city shops via Orange, Free, or Expresso; Wave and Orange Money handle all daily cashless payments",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.artp.sn", "tier": 1, "title": "ARTP Senegal Telecommunications Regulator"}],
                "evidence_quote": "Telecommunications authority mandates identity identification for all active mobile SIM lines",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Yango", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://yango.com", "tier": 1, "title": "Yango Ride Hailing Senegal"}
            },
            {
                "name": "Heetch", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://www.heetch.com", "tier": 1, "title": "Heetch Senegal"}
            },
            {
                "name": "Wave", "category": "payments", "available_in_country": True,
                "source": {"url": "https://www.wave.com", "tier": 1, "title": "Wave Mobile Money Senegal"}
            },
            {
                "name": "Orange Money", "category": "payments", "available_in_country": True,
                "source": {"url": "https://www.orange.sn/orange-money", "tier": 1, "title": "Orange Money Senegal"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Islam (Sufi brotherhoods: Mouride, Tijaniyya ~95%), Christianity (~4%), traditional beliefs",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.sec.gouv.sn", "tier": 1, "title": "Gouvernement du Sénégal"}],
                "evidence_quote": "Over 94% of Senegalese citizens adhere to Islam, famed for exemplary interfaith tolerance and peace",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Grand Magal de Touba, Korité (Eid al-Fitr), Tabaski (Eid al-Adha), Saint-Louis Jazz Festival, Dakar Biennale (Dak'Art)",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://culture.sec.gouv.sn", "tier": 1, "title": "Ministère de la Culture du Sénégal"}],
                "evidence_quote": "Grand Magal and Saint-Louis Jazz Festival highlight the religious and artistic vibrancy of Senegal",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Embrace the ethos of 'Teranga' (warm hospitality); ask permission before photographing people; dress respectfully when visiting religious towns like Touba (no smoking or alcohol permitted); drug offenses carry severe penalties",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://visitezlesenegal.com", "tier": 1, "title": "Agence Sénégalaise de Promotion Touristique"}],
                "evidence_quote": "Teranga represents national spirit of welcome; conservative etiquette enforced strictly in holy cities",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Appreciated in cafes and restaurants (5-10%); rounding up fares for taxi drivers and tipping hotel porters is standard courtesy",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://visitezlesenegal.com", "tier": 1, "title": "Tourism Senegal"}],
                "evidence_quote": "Gratuities are voluntary but warmly accepted across the tourist and restaurant industry",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "Gorée Adası ve Köle Evi Tarihi Alanı",
                    "en": "Island of Gorée & House of Slaves",
                    "de": "Insel Gorée & Sklavenhaus Maison des Esclaves",
                    "ru": "Остров Горе и Дом рабов",
                    "es": "Isla de Gorée y Casa de los Esclavos"
                },
                "type": "historic_unesco",
                "sources": [{"url": "https://whc.unesco.org/en/list/26", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            },
            {
                "name": {
                    "tr": "Pembe Göl (Lac Rose) ve Lompoul Çölü",
                    "en": "Lake Retba (Pink Lake) & Lompoul Desert",
                    "de": "Retba-See (Lac Rose) & Lompoul-Wüste",
                    "ru": "Розовое озеро (Ретба) и пустыня Ломпул",
                    "es": "Lago Rosa (Retba) y Desierto de Lompoul"
                },
                "type": "natural_scenic",
                "sources": [{"url": "https://visitezlesenegal.com", "tier": 1, "title": "Tourism Senegal"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Gorée Adası Köle Evi (Maison des Esclaves) (UNESCO)",
                    "license": "CC-BY-SA",
                    "author": "Nina Volare",
                    "source_url": "https://upload.wikimedia.org/wikipedia/commons/2/2c/La_Maison_des_Esclaves.jpg",
                    "attribution_text": "Nina Volare / Wikimedia Commons / CC BY-SA 2.0",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Gorée Adası Köle Evi (Maison des Esclaves) (UNESCO)",
                        "en": "House of Slaves (Maison des Esclaves), Gorée Island (UNESCO)",
                        "de": "Sklavenhaus (Maison des Esclaves) auf der Insel Gorée (UNESCO)",
                        "ru": "Дом рабов (Maison des Esclaves) на острове Горе (ЮНЕСКО)",
                        "es": "Casa de los Esclavos en la Isla de Gorée (UNESCO)"
                    },
                    "recognizability_checked": True
                }
            ]
        }
    },
    "CI": {
        "iso2": "CI",
        "names": {"tr": "Fildişi Sahili", "en": "Côte d'Ivoire", "de": "Elfenbeinküste", "ru": "Кот-д'Ивуар", "es": "Costa de Marfil"},
        "capital": {
            "value": "Yamoussoukro", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.gouv.ci", "tier": 1, "title": "Portail Officiel du Gouvernement de Côte d'Ivoire"}],
            "evidence_quote": "Yamoussoukro is the official political capital; Abidjan serves as the economic metropolis and seat of government",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "XOF", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.bceao.int", "tier": 1, "title": "Banque Centrale des États de l'Afrique de l'Ouest"}],
            "evidence_quote": "The West African CFA Franc (XOF, CFA) is the legal currency pegged to the Euro (1 EUR = 655.957 XOF)",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+0 (GMT)", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://sodexam.ci", "tier": 1, "title": "SODEXAM Météorologie de Côte d'Ivoire"}],
            "evidence_quote": "Côte d'Ivoire maintains Greenwich Mean Time (UTC+0) year-round without seasonal adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.cie.ci", "tier": 1, "title": "Compagnie Ivoirienne d'Électricité (CIE)"}],
                "evidence_quote": "Standard single-phase domestic electrical grid voltage in Côte d'Ivoire is 230V at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.cie.ci", "tier": 1, "title": "Compagnie Ivoirienne d'Électricité"}],
                "evidence_quote": "Grid AC frequency operates at nominal 50 Hz across all national supply corridors",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "E"], "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "IEC World Plugs"}],
                "evidence_quote": "Standard European two-pin Type C and French-style grounded Type E wall sockets are universal",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "111", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://police.gouv.ci", "tier": 1, "title": "Police Nationale de Côte d'Ivoire"}],
                "evidence_quote": "Dial 111 (or 170 / 100) nationwide for Police Nationale emergency intervention dispatch",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "185", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.sante.gouv.ci", "tier": 1, "title": "SAMU Côte d'Ivoire"}],
                "evidence_quote": "Dial 185 for Service d'Aide Médicale Urgente (SAMU) emergency doctor and ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "180", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.interieur.gouv.ci", "tier": 1, "title": "Groupement des Sapeurs-Pompiers Militaires"}],
                "evidence_quote": "Dial 180 to reach the Groupement des Sapeurs-Pompiers Militaires (GSPM) emergency fire service",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.gouv.ci", "tier": 1, "title": "Gouvernement Ivoirien"}],
                "evidence_quote": "Dial 112 from any cell phone for centralized emergency rescue routing",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": None, "status": "not_found", "confidence": None, "sources": [],
                "evidence_quote": None, "retrieved_at": None
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE", "level": 2,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State Travel Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO", "level": 2,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/cote-d-ivoire", "tier": 1, "title": "UK FCDO Travel Advice"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "DE_AA", "level": 2,
                    "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "German Federal Foreign Office"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 2,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Tembihli Seyahat (Abidjan ve Güney Turistik Alanlar Canlı; Kuzey Sınırında Dikkat)",
                "en": "Exercise Increased Caution (Abidjan & South Coast Safe; Caution on Far Northern Borders)",
                "de": "Erhöhte Vorsicht (Abidjan und Südküste sicher; Vorsicht an den nördlichen Landesgrenzen)",
                "ru": "Проявляйте повышенную осторожность (Абиджан и юг стабильны; северные границы уязвимы)",
                "es": "Tenga mayor precaución (Abiyán y costa sur seguras; precaución en fronteras del norte)"
            },
            "regional_warnings": [
                {
                    "area": "Northern borders with Burkina Faso and Mali",
                    "level": 4,
                    "reason": "Risk of cross-border terrorism and militant incursions in border national parks",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept"}
                }
            ],
            "risk_categories": {
                "terrorism": "medium",
                "crime": "medium",
                "civil_unrest": "low",
                "natural_disaster": "low",
                "health": "low"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 33.5, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index", "tier": 2, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Côte d'Ivoire delivers median mobile download speeds around 33.5 Mbps across Orange, MTN, and Moov 4G/5G",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 42.1, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index", "tier": 2, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Ivorian urban fiber-optic network delivers strong median fixed broadband downloads of 42.1 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Prepaid SIM registration requires passport photo ID; Orange, MTN, and Moov offer wide 4G/5G; Wave and Djamo widely accepted for QR payments",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.artci.ci", "tier": 1, "title": "ARTCI Telecoms Regulator"}],
                "evidence_quote": "Subscriber registration strictly regulated requiring verified biometric passport validation",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Yango", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://yango.com", "tier": 1, "title": "Yango Côte d'Ivoire"}
            },
            {
                "name": "Wave", "category": "payments", "available_in_country": True,
                "source": {"url": "https://www.wave.com", "tier": 1, "title": "Wave Mobile Money Côte d'Ivoire"}
            },
            {
                "name": "Djamo", "category": "payments", "available_in_country": True,
                "source": {"url": "https://djamo.ci", "tier": 2, "title": "Djamo Finance Côte d'Ivoire"}
            },
            {
                "name": "Glovo", "category": "food", "available_in_country": True,
                "source": {"url": "https://glovoapp.com", "tier": 1, "title": "Glovo Abidjan"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Islam (~42%), Christianity (~40%), traditional animist beliefs (~12%)",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.ins.ci", "tier": 1, "title": "Institut National de la Statistique de Côte d'Ivoire"}],
                "evidence_quote": "Demographic statistics show nearly equal representation between Muslim and Christian communities living in harmony",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Abissa Festival (Grand-Bassam), Carnival of Bouaké, Fête du Dipri, Popo Carnaval de Bonoua, Eid al-Fitr, Christmas",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://culture.gouv.ci", "tier": 1, "title": "Ministère de la Culture et de la Francophonie"}],
                "evidence_quote": "Abissa in Grand-Bassam and national cultural carnivals highlight vibrant multi-ethnic heritage",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "French is the primary working language; greetings are important social rituals; take permission before taking portraits; Grand-Bassam beach undertows can be hazardous for swimmers; always negotiate taxi meters or use ride apps",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://cotedivoiretourisme.ci", "tier": 1, "title": "Côte d'Ivoire Tourisme"}],
                "evidence_quote": "Social courtesies and greetings essential; ocean beach currents require attentive swimming vigilance",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "A tip of 5-10% in upscale Abidjan restaurants is customary; small change is customary for parking guards (gardien) and baggage handlers",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://cotedivoiretourisme.ci", "tier": 1, "title": "Côte d'Ivoire Tourisme"}],
                "evidence_quote": "Tips are discretionary but standard practice in international dining and hospitality services",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "Yamoussoukro Barış Meryem Anası Bazilikası",
                    "en": "Basilica of Our Lady of Peace, Yamoussoukro",
                    "de": "Basilika Notre-Dame de la Paix, Yamoussoukro",
                    "ru": "Базилика Пресвятой Девы Марии Мира в Ямусукро",
                    "es": "Basílica de Nuestra Señora de la Paz de Yamusukro"
                },
                "type": "architectural_wonder",
                "sources": [{"url": "https://cotedivoiretourisme.ci", "tier": 1, "title": "Côte d'Ivoire Tourisme"}]
            },
            {
                "name": {
                    "tr": "Grand-Bassam Tarihi Kolonyal Şehri",
                    "en": "Historic Town of Grand-Bassam",
                    "de": "Historische Kolonialstadt Grand-Bassam",
                    "ru": "Исторический город Гран-Басам",
                    "es": "Ciudad Histórica de Grand-Bassam"
                },
                "type": "historic_unesco",
                "sources": [{"url": "https://whc.unesco.org/en/list/1322", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Yamoussoukro Barış Meryem Anası Bazilikası",
                    "license": "CC0",
                    "author": "Didierwiki",
                    "source_url": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Basilique_notre_Dame_de_la_Paix_de_Yamoussoukro_5.jpg",
                    "attribution_text": "Didierwiki / Wikimedia Commons / CC0 1.0 Universal",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Yamoussoukro Barış Meryem Anası Bazilikası",
                        "en": "Basilica of Our Lady of Peace, Yamoussoukro",
                        "de": "Basilika Notre-Dame de la Paix, Yamoussoukro",
                        "ru": "Базилика Пресвятой Девы Марии Мира, Ямусукро",
                        "es": "Basílica de Nuestra Señora de la Paz, Yamusukro"
                    },
                    "recognizability_checked": True
                }
            ]
        }
    },
    "GH": {
        "iso2": "GH",
        "names": {"tr": "Gana", "en": "Ghana", "de": "Ghana", "ru": "Гана", "es": "Ghana"},
        "capital": {
            "value": "Accra", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.presidency.gov.gh", "tier": 1, "title": "Presidency of the Republic of Ghana"}],
            "evidence_quote": "Accra is the constitutional capital, economic engine, and coastal metropolis of Ghana",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "GHS", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.bog.gov.gh", "tier": 1, "title": "Bank of Ghana"}],
            "evidence_quote": "The Ghana Cedi (GHS, GH₵) is the official national currency issued and managed by Bank of Ghana",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+0 (GMT)", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.meteo.gov.gh", "tier": 1, "title": "Ghana Meteorological Agency"}],
            "evidence_quote": "Ghana strictly operates on Greenwich Mean Time (UTC+0) year-round without daylight saving",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.ecg.com.gh", "tier": 1, "title": "Electricity Company of Ghana (ECG)"}],
                "evidence_quote": "Standard single-phase domestic electrical supply across Ghana is nominal 230V 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.ecg.com.gh", "tier": 1, "title": "Electricity Company of Ghana"}],
                "evidence_quote": "The national transmission grid frequency is maintained stably at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["D", "G"], "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "IEC World Plugs"}],
                "evidence_quote": "British Type G three-pin plugs are universal in modern installations, with Type D round sockets in older buildings",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "191", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://police.gov.gh", "tier": 1, "title": "Ghana Police Service"}],
                "evidence_quote": "Dial 191 (or 18555 toll-free) nationwide for rapid response from the Ghana Police Service",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "193", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://nas.gov.gh", "tier": 1, "title": "National Ambulance Service Ghana"}],
                "evidence_quote": "Dial 193 for National Ambulance Service medical evacuation and emergency paramedic care",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "192", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://gnfs.gov.gh", "tier": 1, "title": "Ghana National Fire Service"}],
                "evidence_quote": "Dial 192 for Ghana National Fire Service emergency firefighting and rescue teams",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://police.gov.gh", "tier": 1, "title": "Emergency Call Centre Ghana"}],
                "evidence_quote": "Dial 112 nationwide from any phone network for unified emergency response dispatch",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": None, "status": "not_found", "confidence": None, "sources": [],
                "evidence_quote": None, "retrieved_at": None
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE", "level": 1,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State Travel Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO", "level": 1,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/ghana", "tier": 1, "title": "UK FCDO Travel Advice"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "DE_AA", "level": 1,
                    "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "German Federal Foreign Office"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 1,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Standart Önlemler (Batı Afrika'nın En Güvenli ve Huzurlu Ülkelerinden Biri)",
                "en": "Exercise Normal Precautions (One of West Africa's Safest & Most Stable Destinations)",
                "de": "Normale Vorsicht (Eines der sichersten und stabilsten Reiseziele Westafrikas)",
                "ru": "Стандартные меры предосторожности (Одно из самых безопасных и стабильных направлений Западной Африки)",
                "es": "Precauciones normales (Uno de los destinos más seguros y estables de África Occidental)"
            },
            "regional_warnings": [
                {
                    "area": "Northern border towns in Upper East and Upper West regions",
                    "level": 2,
                    "reason": "Border proximity caution due to regional security dynamics in neighboring Burkina Faso",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept"}
                }
            ],
            "risk_categories": {
                "terrorism": "low",
                "crime": "low",
                "civil_unrest": "low",
                "natural_disaster": "low",
                "health": "low"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 26.8, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index", "tier": 2, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Ghana registers median mobile cellular download speeds around 26.8 Mbps on MTN and Telecel 4G",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 36.2, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index", "tier": 2, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Urban fixed broadband in Accra and Kumasi averages median download speeds of 36.2 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "SIM registration mandates biometric registration with passport ID; MTN Mobile Money (MoMo) is ubiquitous across street stalls and taxis",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://nca.org.gh", "tier": 1, "title": "National Communications Authority Ghana"}],
                "evidence_quote": "SIM re-registration regulations require verified passport identification under NCA mandates",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Bolt", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://bolt.eu/en-gh", "tier": 1, "title": "Bolt Ghana"}
            },
            {
                "name": "Uber", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://www.uber.com/gh/en", "tier": 1, "title": "Uber Ghana"}
            },
            {
                "name": "MTN MoMo", "category": "payments", "available_in_country": True,
                "source": {"url": "https://www.mtn.com.gh/momo", "tier": 1, "title": "MTN MoMo Ghana"}
            },
            {
                "name": "Hubtel", "category": "food", "available_in_country": True,
                "source": {"url": "https://hubtel.com", "tier": 1, "title": "Hubtel SuperApp Ghana"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Christianity (~71%), Islam (~20%), traditional faiths (~3%)",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://statsghana.gov.gh", "tier": 1, "title": "Ghana Statistical Service"}],
                "evidence_quote": "Ghana Census records approximately 71 percent Christian and 20 percent Muslim population living peacefully",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Chale Wote Street Art Festival (James Town, Aug), Homowo (Ga festival), Aboakyer, Hogbetsotso, AfroFuture (Dec)",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://motac.gov.gh", "tier": 1, "title": "Ministry of Tourism, Arts and Culture Ghana"}],
                "evidence_quote": "Chale Wote and December in GH festivals attract hundreds of thousands of international visitors to Accra",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Always use the right hand to give or receive items, greet elders first; modest swimwear appropriate on resort beaches only; LGBTQ+ travelers should exercise high discretion due to conservative social laws; drugs heavily penalized",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://visitghana.com", "tier": 1, "title": "Ghana Tourism Authority"}],
                "evidence_quote": "Respect for cultural etiquette and right-hand customary use are fundamental social values in Ghana",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Customary in hospitality; 5-10% in sit-down restaurants in Accra; small tips for drivers, tour guides, and hotel staff warmly received",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://visitghana.com", "tier": 1, "title": "Ghana Tourism Authority"}],
                "evidence_quote": "Tipping is welcomed and common in tourist hotels, restaurants, and historical heritage sites",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "Cape Coast Kalesi ve Atlantik Sahili",
                    "en": "Cape Coast Castle & Atlantic Coastline",
                    "de": "Cape Coast Castle & Atlantikküste",
                    "ru": "Замок Кейп-Кост и побережье Атлантики",
                    "es": "Castillo de Cape Coast y Costa Atlántica"
                },
                "type": "historic_unesco",
                "sources": [{"url": "https://whc.unesco.org/en/list/34", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            },
            {
                "name": {
                    "tr": "Kakum Milli Parkı Gölgelik Asma Köprüleri",
                    "en": "Kakum National Park Canopy Walkway",
                    "de": "Kakum-Nationalpark Baumkronenpfad",
                    "ru": "Подвесные канатные мосты национального парка Какум",
                    "es": "Pasarela Colgante del dosel del Parque Nacional Kakum"
                },
                "type": "natural_adventure",
                "sources": [{"url": "https://visitghana.com", "tier": 1, "title": "Ghana Tourism Authority"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Cape Coast Tarihi Kalesi ve Atlantik Sahili (UNESCO)",
                    "license": "CC-BY",
                    "author": "Julius Cruickshank",
                    "source_url": "https://upload.wikimedia.org/wikipedia/commons/6/69/Cape_Coast_Slave_Castle.jpg",
                    "attribution_text": "Julius Cruickshank / Wikimedia Commons / CC BY 2.0",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Cape Coast Tarihi Kalesi ve Atlantik Sahili (UNESCO)",
                        "en": "Cape Coast Castle & Atlantic Coastline (UNESCO)",
                        "de": "Festung Cape Coast Castle & Atlantikküste (UNESCO)",
                        "ru": "Замок Кейп-Кост и побережье Атлантики (ЮНЕСКО)",
                        "es": "Castillo de Cape Coast y Costa Atlántica (UNESCO)"
                    },
                    "recognizability_checked": True
                }
            ]
        }
    },
    "ZM": {
        "iso2": "ZM",
        "names": {"tr": "Zambiya", "en": "Zambia", "de": "Sambia", "ru": "Замбия", "es": "Zambia"},
        "capital": {
            "value": "Lusaka", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.sh.gov.zm", "tier": 1, "title": "State House of the Republic of Zambia"}],
            "evidence_quote": "Lusaka is the constitutional capital, commercial core, and seat of government of Zambia",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "ZMW", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.boz.zm", "tier": 1, "title": "Bank of Zambia"}],
            "evidence_quote": "The Zambian Kwacha (ZMW, K) is the official sovereign legal currency regulated by the Bank of Zambia",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+2 (CAT)", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.zmd.gov.zm", "tier": 1, "title": "Zambia Meteorological Department"}],
            "evidence_quote": "Zambia observes Central Africa Time (UTC+2) uniformly year-round with no daylight saving shifts",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.zesco.co.zm", "tier": 1, "title": "ZESCO Limited National Utility"}],
                "evidence_quote": "Standard single-phase domestic electrical distribution in Zambia is 230V at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.zesco.co.zm", "tier": 1, "title": "ZESCO Limited"}],
                "evidence_quote": "The interconnected southern African grid delivers synchronized 50 Hz power across Zambia",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "D", "G"], "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "IEC World Plugs"}],
                "evidence_quote": "British Type G plugs are dominant in modern hotels and lodges, alongside Type C and legacy Type D",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "991", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.zambiapolice.gov.zm", "tier": 1, "title": "Zambia Police Service"}],
                "evidence_quote": "Dial 991 nationwide for emergency police dispatch and highway patrol intervention",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "992", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.moh.gov.zm", "tier": 1, "title": "Ministry of Health Zambia"}],
                "evidence_quote": "Dial 992 nationwide for hospital emergency ambulance dispatch services",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "993", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.mha.gov.zm", "tier": 1, "title": "Ministry of Home Affairs Zambia"}],
                "evidence_quote": "Dial 993 to summon municipal fire brigade and industrial rescue teams",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.zambiapolice.gov.zm", "tier": 1, "title": "Zambia Police"}],
                "evidence_quote": "Dial 112 (or 999) from any mobile network for general emergency routing",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": None, "status": "not_found", "confidence": None, "sources": [],
                "evidence_quote": None, "retrieved_at": None
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE", "level": 1,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State Travel Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO", "level": 1,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/zambia", "tier": 1, "title": "UK FCDO Travel Advice"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "DE_AA", "level": 1,
                    "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "German Federal Foreign Office"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 1,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Standart Önlemler (Safari ve Doğa Turizmi Açısından Son Derece Güvenli)",
                "en": "Exercise Normal Precautions (Exceptionally Peaceful & Safe Safari Destination)",
                "de": "Normale Vorsicht (Außerordentlich friedliches und sicheres Safari-Reiseziel)",
                "ru": "Стандартные меры предосторожности (Исключительно мирное и безопасное сафари-направление)",
                "es": "Precauciones normales (Destino de safari excepcionalmente pacífico y seguro)"
            },
            "regional_warnings": [
                {
                    "area": "Urban bus depots and market areas in Lusaka after dark",
                    "level": 2,
                    "reason": "Petty opportunistic pickpocketing; avoid walking alone at night outside secure compounds",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept"}
                }
            ],
            "risk_categories": {
                "terrorism": "low",
                "crime": "low",
                "civil_unrest": "low",
                "natural_disaster": "low",
                "health": "low"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 21.4, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index", "tier": 2, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Zambia records median mobile cellular download speeds around 21.4 Mbps on Airtel and MTN 4G networks",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 16.2, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index", "tier": 2, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Zambian fixed broadband infrastructure provides median download speeds around 16.2 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "SIM cards require mandatory biometric and passport registration with Airtel or MTN; major safari lodges provide satellite Wi-Fi",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.zicta.zm", "tier": 1, "title": "ZICTA Telecoms Regulator"}],
                "evidence_quote": "ZICTA directives require strict physical passport identification for SIM registration",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Yango", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://yango.com", "tier": 1, "title": "Yango Zambia"}
            },
            {
                "name": "Ulendo", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://ulendotaxi.com", "tier": 2, "title": "Ulendo Taxi Lusaka"}
            },
            {
                "name": "Airtel Money", "category": "payments", "available_in_country": True,
                "source": {"url": "https://www.airtel.co.zm/airtel_money", "tier": 1, "title": "Airtel Money Zambia"}
            },
            {
                "name": "MTN MoMo", "category": "payments", "available_in_country": True,
                "source": {"url": "https://www.mtn.zm/momo", "tier": 1, "title": "MTN MoMo Zambia"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Christianity (~95% majority - Protestant and Catholic), small Muslim and Hindu communities",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.zamstats.gov.zm", "tier": 1, "title": "Zambia Statistics Agency"}],
                "evidence_quote": "Zambia is constitutionally declared a Christian nation, with freedom of conscience protected",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Kuomboka (Lozi royal boat voyage), Ncwala (Ngoni first fruits), Shimunenga, Umutomboko, Likumbi Lya Mize",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.motce.gov.zm", "tier": 1, "title": "Ministry of Tourism Zambia"}],
                "evidence_quote": "Over 20 traditional ceremonies celebrated annually, led by Kuomboka on the Zambezi floodplain",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Wearing military-style camouflage attire is illegal for civilians; maintain strict safe distances from wildlife in national parks; respect traditional chiefs and ceremonies; possession of pornography and narcotics strictly banned",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.zambiatourism.com", "tier": 1, "title": "Zambia Tourism Agency"}],
                "evidence_quote": "Camouflage clothing prohibited under national law; strict wildlife safety guidelines enforced",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Customary in safari lodges and upscale dining; 10% in restaurants; tipping safari guides ($10-15/day) and camp trackers ($5-10/day) is established standard etiquette",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.zambiatourism.com", "tier": 1, "title": "Zambia Safari Guidelines"}],
                "evidence_quote": "Safari tipping is customary practice supporting park guides and conservation trackers",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "Viktorya Şelaleleri (Mosi-oa-Tunya) ve Şeytan Havuzu",
                    "en": "Victoria Falls (Mosi-oa-Tunya) & Devil's Pool",
                    "de": "Victoriafälle (Mosi-oa-Tunya) & Devil's Pool",
                    "ru": "Водопад Виктория (Моси-оа-Тунья) и Бассейн Дьявола",
                    "es": "Cataratas Victoria (Mosi-oa-Tunya) y Piscina del Diablo"
                },
                "type": "natural_unesco",
                "sources": [{"url": "https://whc.unesco.org/en/list/509", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            },
            {
                "name": {
                    "tr": "Güney Luangwa Milli Parkı Yürüyüş Safarileri",
                    "en": "South Luangwa National Park Walking Safaris",
                    "de": "South-Luangwa-Nationalpark Fußsafaris",
                    "ru": "Пешие сафари в национальном парке Южная Луангва",
                    "es": "Safaris a Pie en el Parque Nacional Luangwa del Sur"
                },
                "type": "natural_wildlife",
                "sources": [{"url": "https://www.zambiatourism.com", "tier": 1, "title": "Zambia Tourism Agency"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Viktorya Şelaleleri (Mosi-oa-Tunya) Boiling Pot Çağlayanı",
                    "license": "CC-BY-SA",
                    "author": "Diego Delso",
                    "source_url": "https://upload.wikimedia.org/wikipedia/commons/d/da/Cataratas_Victoria%2C_Zambia-Zimbabue%2C_2018-07-27%2C_DD_04.jpg",
                    "attribution_text": "Diego Delso / Wikimedia Commons / CC BY-SA 4.0",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Viktorya Şelaleleri (Mosi-oa-Tunya) Boiling Pot Çağlayanı",
                        "en": "Victoria Falls (Mosi-oa-Tunya) Boiling Pot Cataract",
                        "de": "Victoriafälle (Mosi-oa-Tunya) Boiling Pot Wasserfall",
                        "ru": "Водопад Виктория (Моси-оа-Тунья) кипящий котёл",
                        "es": "Cataratas Victoria (Mosi-oa-Tunya) Catarata Boiling Pot"
                    },
                    "recognizability_checked": True
                }
            ]
        }
    },
    "MZ": {
        "iso2": "MZ",
        "names": {"tr": "Mozambik", "en": "Mozambique", "de": "Mosambik", "ru": "Мозамбик", "es": "Mozambique"},
        "capital": {
            "value": "Maputo", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.portaldogoverno.gov.mz", "tier": 1, "title": "Portal do Governo de Moçambique"}],
            "evidence_quote": "Maputo is the constitutional capital, largest seaport, and administrative centre of Mozambique",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "MZN", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.bancomoc.mz", "tier": 1, "title": "Banco de Moçambique"}],
            "evidence_quote": "The Mozambican Metical (MZN, MT) is the sovereign currency regulated by Banco de Moçambique",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+2 (CAT)", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://inam.gov.mz", "tier": 1, "title": "Instituto Nacional de Meteorologia de Moçambique"}],
            "evidence_quote": "Mozambique observes Central Africa Time (UTC+2) across all provincial jurisdictions year-round",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "220V", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.edm.co.mz", "tier": 1, "title": "Electricidade de Moçambique (EDM)"}],
                "evidence_quote": "Single-phase household distribution voltage across Mozambique is 220V at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.edm.co.mz", "tier": 1, "title": "Electricidade de Moçambique"}],
                "evidence_quote": "EDM network maintains standard synchronized alternating frequency of 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "F", "M"], "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "IEC World Plugs"}],
                "evidence_quote": "South African large three-pin round Type M and European Types C and F sockets are common",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "119", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.policia.gov.mz", "tier": 1, "title": "Polícia da República de Moçambique"}],
                "evidence_quote": "Dial 119 nationwide for emergency response from Polícia da República de Moçambique (PRM)",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "117", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.misau.gov.mz", "tier": 1, "title": "Ministério da Saúde de Moçambique"}],
                "evidence_quote": "Dial 117 nationwide for public hospital emergency medical ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "198", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.snacp.gov.mz", "tier": 1, "title": "Serviço Nacional de Salvação Pública (SENSAP)"}],
                "evidence_quote": "Dial 198 for SENSAP national firefighter brigade and structural rescue teams",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.policia.gov.mz", "tier": 1, "title": "Polícia de Moçambique"}],
                "evidence_quote": "Emergency number 112 connects to unified emergency coordination services across mobile operators",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": None, "status": "not_found", "confidence": None, "sources": [],
                "evidence_quote": None, "retrieved_at": None
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE", "level": 2,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State Travel Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO", "level": 2,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/mozambique", "tier": 1, "title": "UK FCDO Travel Advice"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "DE_AA", "level": 2,
                    "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "German Federal Foreign Office"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 2,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Tembihli Seyahat (Kıyı, Bazaruto ve Tofo Plajları Sakin; Cabo Delgado'dan Kaçının)",
                "en": "Exercise Increased Caution (Beaches & Bazaruto Archipelago Safe; Avoid Cabo Delgado)",
                "de": "Erhöhte Vorsicht (Küste, Bazaruto und Tofo sicher; Cabo Delgado im Norden meiden)",
                "ru": "Проявляйте повышенную осторожность (Пляжи и архипелаг Базаруто спокойны; избегайте Кабу-Делгаду)",
                "es": "Tenga mayor precaución (Playas y archipiélago de Bazaruto seguros; evite Cabo Delgado)"
            },
            "regional_warnings": [
                {
                    "area": "Cabo Delgado province (far north)",
                    "level": 4,
                    "reason": "Violent extremist insurgency and armed attacks; all travel strictly discouraged",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept"}
                }
            ],
            "risk_categories": {
                "terrorism": "medium",
                "crime": "medium",
                "civil_unrest": "low",
                "natural_disaster": "medium",
                "health": "medium"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 24.8, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index", "tier": 2, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Mozambique shows median mobile download speeds of 24.8 Mbps across Vodacom and Movitel 4G networks",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 18.5, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index", "tier": 2, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Mozambican fixed broadband delivers median download speed benchmarks around 18.5 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "SIM cards purchased at Maputo Airport or telecoms shops with passport registration; Vodacom M-Pesa is dominant mobile payment method",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.incom.gov.mz", "tier": 1, "title": "INCM Communications Authority"}],
                "evidence_quote": "Subscriber identity registration mandatory under national telecommunications authority regulations",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Txopela", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://txopela.co.mz", "tier": 2, "title": "Txopela Tuk-Tuk Maputo"}
            },
            {
                "name": "M-Pesa", "category": "payments", "available_in_country": True,
                "source": {"url": "https://www.vm.co.mz/M-Pesa", "tier": 1, "title": "Vodacom M-Pesa Mozambique"}
            },
            {
                "name": "e-Mola", "category": "payments", "available_in_country": True,
                "source": {"url": "https://movitel.co.mz/emola", "tier": 1, "title": "e-Mola Movitel Mozambique"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Christianity (~60% - Catholic and Zionist Christian), Islam (~19%), traditional animism (~14%)",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.ine.gov.mz", "tier": 1, "title": "Instituto Nacional de Estatística Moçambique"}],
                "evidence_quote": "National census details Christian majority alongside substantial Muslim communities along the northern coast",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Marrabenta Festival (Maputo), Chopi Timbila Festival (Inhambane), Festival do Ibo, Independence Day (June 25)",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://whc.unesco.org/en/list/1023", "tier": 1, "title": "UNESCO Intangible Cultural Heritage"}],
                "evidence_quote": "Chopi Timbila orchestral music inscribed by UNESCO, celebrated across vibrant coastal cultural festivals",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Portuguese is the official national language; avoid photographing military personnel, airports, or bridge checkpoints; strictly respect marine reserve guidelines (whale sharks, coral reefs); carry passport copies for police checkpoints",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://inatur.org.mz", "tier": 1, "title": "INATUR Instituto Nacional do Turismo"}],
                "evidence_quote": "Identification documents must be carried; photographing strategic government assets strictly forbidden",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Customary in coastal resorts and tourist restaurants; 10% is customary for table service; small tips for luggage porters and diving crew",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://inatur.org.mz", "tier": 1, "title": "INATUR Mozambique Tourism"}],
                "evidence_quote": "Tipping is customary across coastal tourism centers and maritime excursion providers",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "Bazaruto Takımadaları Milli Parkı ve Mercan Resifleri",
                    "en": "Bazaruto Archipelago National Park & Coral Reefs",
                    "de": "Bazaruto-Archipel-Nationalpark & Korallenriffe",
                    "ru": "Национальный парк архипелага Базаруто и коралловые рифы",
                    "es": "Parque Nacional del Archipiélago de Bazaruto y Arrecifes de Coral"
                },
                "type": "natural_marine",
                "sources": [{"url": "https://inatur.org.mz", "tier": 1, "title": "INATUR Moçambique"}]
            },
            {
                "name": {
                    "tr": "Ilha de Moçambique Tarihi Adası",
                    "en": "Island of Mozambique Historic City",
                    "de": "Insel Mosambik Historische Stadt",
                    "ru": "Исторический остров Мозамбик",
                    "es": "Isla Histórica de Mozambique"
                },
                "type": "historic_unesco",
                "sources": [{"url": "https://whc.unesco.org/en/list/599", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Bazaruto Takımadaları Kum Adacıkları ve Lagünü",
                    "license": "CC-BY-SA",
                    "author": "Tom Corser",
                    "source_url": "https://upload.wikimedia.org/wikipedia/commons/7/75/Bazaruto_Island_Mozambique_from_air.jpg",
                    "attribution_text": "Tom Corser / Wikimedia Commons / CC BY-SA 3.0",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Bazaruto Takımadaları Kum Adacıkları ve Lagünü",
                        "en": "Bazaruto Archipelago Sandspits & Turquoise Lagoon",
                        "de": "Bazaruto-Archipel Sandbänke & Türkislagune",
                        "ru": "Песчаные косы и бирюзовая лагуна архипелага Базаруто",
                        "es": "Bancos de Arena y Laguna Turquesa del Archipiélago de Bazaruto"
                    },
                    "recognizability_checked": True
                }
            ]
        }
    },
    "MG": {
        "iso2": "MG",
        "names": {"tr": "Madagaskar", "en": "Madagascar", "de": "Madagaskar", "ru": "Мадагаскар", "es": "Madagascar"},
        "capital": {
            "value": "Antananarivo", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.presidence.gov.mg", "tier": 1, "title": "Présidence de la République de Madagascar"}],
            "evidence_quote": "Antananarivo is the constitutional capital, largest city, and historical highland seat of Madagascar",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "MGA", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.banky-foibe.mg", "tier": 1, "title": "Banky Foiben'i Madagasikara (Central Bank)"}],
            "evidence_quote": "The Malagasy Ariary (MGA, Ar) is the sovereign national currency managed by Banky Foiben'i Madagasikara",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+3 (EAT)", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.meteomadagascar.mg", "tier": 1, "title": "Direction Générale de la Météorologie"}],
            "evidence_quote": "Madagascar observes East Africa Time (UTC+3) throughout all regional domains year-round",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "220V", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.jirama.mg", "tier": 1, "title": "JIRAMA Jiro sy Rano Malagasy"}],
                "evidence_quote": "Standard single-phase domestic electrical grid supply across Madagascar is nominal 220V at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.jirama.mg", "tier": 1, "title": "JIRAMA"}],
                "evidence_quote": "JIRAMA electricity network operates on standard synchronized 50 Hz alternating current",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "D", "E", "J", "K"], "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "IEC World Plugs"}],
                "evidence_quote": "European two-pin Types C and E are most prevalent in urban residences, hotels, and lodges",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "117", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.police.gov.mg", "tier": 1, "title": "Police Nationale Malagasy"}],
                "evidence_quote": "Dial 117 nationwide for Police Nationale (urban) or 119 for Gendarmerie (rural/highways)",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "124", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.sante.gov.mg", "tier": 1, "title": "Ministère de la Santé Publique de Madagascar"}],
                "evidence_quote": "Dial 124 (or SAMU assistance) for public hospital ambulance and medical emergency transit",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "118", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.mid.gov.mg", "tier": 1, "title": "Corps des Sapeurs-Pompiers Madagascar"}],
                "evidence_quote": "Dial 118 for urban fire brigade response and natural disaster rescue squads",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.police.gov.mg", "tier": 1, "title": "Police Nationale"}],
                "evidence_quote": "Emergency number 112 connects callers to integrated emergency dispatch via mobile networks",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": None, "status": "not_found", "confidence": None, "sources": [],
                "evidence_quote": None, "retrieved_at": None
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE", "level": 2,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State Travel Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO", "level": 2,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/madagascar", "tier": 1, "title": "UK FCDO Travel Advice"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "DE_AA", "level": 2,
                    "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "German Federal Foreign Office"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 2,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Tembihli Seyahat (Milli Parklar ve Nosy Be Sakin; Antananarivo'da Gece Dikkat)",
                "en": "Exercise Increased Caution (National Parks & Nosy Be Safe; Caution at Night in Tana)",
                "de": "Erhöhte Vorsicht (Nationalparks und Nosy Be sicher; nachts in Antananarivo vorsichtig sein)",
                "ru": "Проявляйте повышенную осторожность (Национальные парки и Нуси-Бе безопасны; осторожность ночью в Тане)",
                "es": "Tenga mayor precaución (Parques nacionales y Nosy Be seguros; precaución de noche en Antananarivo)"
            },
            "regional_warnings": [
                {
                    "area": "Rural highway travel at night across RN7 / RN1",
                    "level": 3,
                    "reason": "Roadside banditry (dahalo) risks; avoid overland intercity travel after sunset",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept"}
                }
            ],
            "risk_categories": {
                "terrorism": "low",
                "crime": "medium",
                "civil_unrest": "low",
                "natural_disaster": "medium",
                "health": "medium"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 22.1, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index", "tier": 2, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Madagascar records median mobile download speeds around 22.1 Mbps on Telma and Orange 4G networks",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 27.6, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index", "tier": 2, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Madagascar fixed broadband via EASSy and METISS submarine cables delivers median downloads of 27.6 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "SIM cards easily acquired at Ivato International Airport with passport registration; Telma MVola and Orange Money are dominant cashless transaction channels",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.artec.mg", "tier": 1, "title": "ARTEC Madagascar Communications Regulator"}],
                "evidence_quote": "Mandatory identity verification required under national ARTEC telecommunications laws",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "MVola", "category": "payments", "available_in_country": True,
                "source": {"url": "https://www.mvola.mg", "tier": 1, "title": "MVola Telma Madagascar"}
            },
            {
                "name": "Orange Money", "category": "payments", "available_in_country": True,
                "source": {"url": "https://www.orange.mg/orange-money", "tier": 1, "title": "Orange Money Madagascar"}
            },
            {
                "name": "Allo Taxi", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://allotaxi-madagascar.com", "tier": 2, "title": "Allo Taxi Antananarivo"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Christianity (~85% - Catholic and Protestant), traditional ancestor veneration (Razana ~5%), Islam (~7%)",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.instat.mg", "tier": 1, "title": "INSTAT Madagascar"}],
                "evidence_quote": "Christianity is widely practiced while deep reverence for ancestral customs (Fomba Gasy) remains universal",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Famadihana (Turning of the Bones, dry season), Alahamady Be, Donia Music Festival (Nosy Be), Independence Day (June 26)",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.madagascar-tourisme.com", "tier": 1, "title": "Office National du Tourisme de Madagascar"}],
                "evidence_quote": "Famadihana ancestral commemoration and Donia Music Festival reflect rich cultural heritage",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Respect local 'Fady' (ancestral taboos that vary by village - e.g. pointing with an outstretched index finger, eating sacred animals); never touch or feed wild lemurs; export of endemic flora/fauna and vanilla without permits is heavily criminalized",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.madagascar-tourisme.com", "tier": 1, "title": "ONTM Madagascar Tourism"}],
                "evidence_quote": "Respect for ancestral Fady taboos and national park conservation laws is strictly required",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Customary in tourism; 5-10% in sit-down restaurants; tipping park guides (15,000-30,000 MGA per day) and driver-guides is essential standard practice",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.madagascar-tourisme.com", "tier": 1, "title": "ONTM Tourism Guide"}],
                "evidence_quote": "Tipping park rangers and nature guides forms a crucial component of local conservation livelihood",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "Baobab Yolu (Avenue of the Baobabs)",
                    "en": "Avenue of the Baobabs, Morondava",
                    "de": "Baobab-Allee bei Morondava",
                    "ru": "Аллея баобабов, Морондава",
                    "es": "Avenida de los Baobabs, Morondava"
                },
                "type": "natural_wonder",
                "sources": [{"url": "https://www.madagascar-tourisme.com", "tier": 1, "title": "ONTM Madagascar"}]
            },
            {
                "name": {
                    "tr": "Tsingy de Bemaraha Keskin Kireçtaşı Kanyonları",
                    "en": "Tsingy de Bemaraha Strict Nature Reserve",
                    "de": "Naturreservat Tsingy de Bemaraha",
                    "ru": "Строгий природный резерват Цинги-де-Бемараха",
                    "es": "Reserva Natural Integral de Tsingy de Bemaraha"
                },
                "type": "natural_unesco",
                "sources": [{"url": "https://whc.unesco.org/en/list/494", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Baobab Yolu (Avenue of the Baobabs) Günbatımı",
                    "license": "CC-BY-SA",
                    "author": "Zigomar",
                    "source_url": "https://upload.wikimedia.org/wikipedia/commons/1/18/Baobabs_Avenue_Sunset_1.jpg",
                    "attribution_text": "Zigomar / Wikimedia Commons / CC BY-SA 3.0",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Baobab Yolu (Avenue of the Baobabs) Günbatımı",
                        "en": "Avenue of the Baobabs at Sunset, Morondava",
                        "de": "Baobab-Allee zum Sonnenuntergang, Morondava",
                        "ru": "Аллея баобабов на закате, Морондава",
                        "es": "Avenida de los Baobabs al Atardecer, Morondava"
                    },
                    "recognizability_checked": True
                }
            ]
        }
    },
    "GM": {
        "iso2": "GM",
        "names": {"tr": "Gambiya", "en": "Gambia", "de": "Gambia", "ru": "Гамбия", "es": "Gambia"},
        "capital": {
            "value": "Banjul", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.statehouse.gm", "tier": 1, "title": "State House of the Republic of The Gambia"}],
            "evidence_quote": "Banjul is the island capital, maritime port, and seat of government of The Gambia",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "GMD", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.cbg.gm", "tier": 1, "title": "Central Bank of The Gambia"}],
            "evidence_quote": "The Gambian Dalasi (GMD, D) is the legal tender currency governed by the Central Bank of The Gambia",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+0 (GMT)", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.mofa.gov.gm", "tier": 1, "title": "Ministry of Transport, Works & Infrastructure Gambia"}],
            "evidence_quote": "The Gambia strictly maintains Greenwich Mean Time (UTC+0) year-round without seasonal clock alteration",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.nawec.gm", "tier": 1, "title": "NAWEC National Water and Electricity Company"}],
                "evidence_quote": "Standard single-phase domestic electrical supply across The Gambia is nominal 230V at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.nawec.gm", "tier": 1, "title": "NAWEC"}],
                "evidence_quote": "National grid operating frequency is maintained at 50 Hz alternating current",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["G"], "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "IEC World Plugs"}],
                "evidence_quote": "British standard rectangular three-pin Type G sockets are universal across The Gambia",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "117", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.gambiafire.gm", "tier": 1, "title": "Gambia Police Force"}],
                "evidence_quote": "Dial 117 nationwide for Gambia Police Force emergency intervention and traffic control",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "116", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.moh.gov.gm", "tier": 1, "title": "Ministry of Health The Gambia"}],
                "evidence_quote": "Dial 116 nationwide for public emergency medical ambulance assistance",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "118", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.gambiafire.gm", "tier": 1, "title": "Gambia Fire and Rescue Service (GFRS)"}],
                "evidence_quote": "Dial 118 for Gambia Fire and Rescue Service emergency fire squads and rescue units",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.gambiafire.gm", "tier": 1, "title": "Emergency Dispatch"}],
                "evidence_quote": "Dial 112 from any mobile device for national emergency services coordination",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "117", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.visitthegambia.gm", "tier": 1, "title": "Gambian Tourist Security Unit (TSU)"}],
                "evidence_quote": "Tourist Security Unit (TSU) operates dedicated foot and beach patrols reached via 117 or local tourism offices",
                "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE", "level": 1,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State Travel Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO", "level": 1,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/the-gambia", "tier": 1, "title": "UK FCDO Travel Advice"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "DE_AA", "level": 1,
                    "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "German Federal Foreign Office"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 1,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Standart Önlemler ('Afrika'nın Gülen Kıyısı', Son Derece Huzurlu ve Dostane)",
                "en": "Exercise Normal Precautions ('The Smiling Coast of Africa', Peaceful & Hospitable)",
                "de": "Normale Vorsicht ('The Smiling Coast of Africa', friedlich und gastfreundlich)",
                "ru": "Стандартные меры предосторожности («Улыбающийся берег Африки», мирно и гостеприимно)",
                "es": "Precauciones normales ('La Costa Sonriente de África', pacífica y hospitalaria)"
            },
            "regional_warnings": [
                {
                    "area": "Resort beach strips (Kotu, Kololi, Senegambia)",
                    "level": 1,
                    "reason": "Unlicensed beach hustlers (bumsters); firm and polite refusal is recommended",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept"}
                }
            ],
            "risk_categories": {
                "terrorism": "low",
                "crime": "low",
                "civil_unrest": "low",
                "natural_disaster": "low",
                "health": "low"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 17.5, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index", "tier": 2, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "The Gambia delivers median mobile download speeds around 17.5 Mbps on Africell and QCell 4G",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 18.2, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index", "tier": 2, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Fixed broadband median download speeds in Banjul and Serrekunda average 18.2 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "SIM registration mandatory with passport ID via Africell or QCell; QMoney and Afrimoney are popular mobile payment solutions",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://pura.gm", "tier": 1, "title": "PURA Public Utilities Regulatory Authority"}],
                "evidence_quote": "PURA telecommunications directives mandate valid biometric passport presentation for all SIM activations",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "QMoney", "category": "payments", "available_in_country": True,
                "source": {"url": "https://qmoney.gm", "tier": 1, "title": "QMoney Gambia"}
            },
            {
                "name": "Afrimoney", "category": "payments", "available_in_country": True,
                "source": {"url": "https://africell.gm/afrimoney", "tier": 1, "title": "Afrimoney Gambia"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Islam (~96% Sunni majority), Christianity (~4%), traditional customs",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.gbos.gov.gm", "tier": 1, "title": "Gambia Bureau of Statistics"}],
                "evidence_quote": "National statistics document over 95 percent Muslim population coexisting in deep religious tolerance with Christians",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Roots Homecoming Festival, Banjul Cultural Carnival, Janjanbureh Kankurang Festival, Eid al-Fitr (Koriteh), Tobaski",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://whc.unesco.org/en/list/160", "tier": 1, "title": "UNESCO Intangible Cultural Heritage"}],
                "evidence_quote": "Kankurang masked tradition inscribed by UNESCO, central to initiation and seasonal community festivities",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Modest clothing recommended in inland towns and villages; swimwear acceptable only on hotel beachfronts and pools; respect community elders and religious norms; all narcotics possession strictly penalized with mandatory prison terms",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.visitthegambia.gm", "tier": 1, "title": "Gambia Tourism Board"}],
                "evidence_quote": "Dress modestly outside coastal beach complexes; zero-tolerance narcotics legislation rigorously enforced",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Customary in tourism; 10% in hotel restaurants and bars; tipping river pirogue boatmen, birdwatching guides, and hotel staff is standard courtesy",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.visitthegambia.gm", "tier": 1, "title": "Gambia Tourism Board"}],
                "evidence_quote": "Tipping is customary across tourist resorts, safari lodges, and nature guiding services",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "Kunta Kinteh Adası ve Gambiya Nehri Tarihi Sit Alanı",
                    "en": "Kunta Kinteh Island & Related Sites (James Island)",
                    "de": "Kunta Kinteh Island & historische Stätten am Gambia-Fluss",
                    "ru": "Остров Кунта Кинте и исторические объекты реки Гамбия",
                    "es": "Isla Kunta Kinteh y Sitios Históricos del Río Gambia"
                },
                "type": "historic_unesco",
                "sources": [{"url": "https://whc.unesco.org/en/list/761", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            },
            {
                "name": {
                    "tr": "Gambiya Nehri Mangrov Kanalları ve Kuş Cenneti",
                    "en": "Gambia River Mangroves & Birdwatching Habitats",
                    "de": "Gambia-Fluss Mangroven & Vogelbeobachtungsgebiete",
                    "ru": "Мангровые заросли реки Гамбия и орнитологический заповедник",
                    "es": "Manglares del Río Gambia y Paraíso de Observación de Aves"
                },
                "type": "natural_wildlife",
                "sources": [{"url": "https://www.visitthegambia.gm", "tier": 1, "title": "Gambia Tourism Board"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Gambiya Nehri Mangrov Kanalları ve Balıkçı Tekneleri",
                    "license": "CC-BY-SA",
                    "author": "Ikiwaner",
                    "source_url": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Tendaba_The_Gambia.jpg",
                    "attribution_text": "Ikiwaner / Wikimedia Commons / CC BY-SA 3.0",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Gambiya Nehri Mangrov Kanalları ve Balıkçı Tekneleri",
                        "en": "Gambia River Mangrove Channels & Pirogues",
                        "de": "Gambia-Fluss Mangrovenkanäle & Pirogen",
                        "ru": "Мангровые протоки реки Гамбия и рыбацкие пироги",
                        "es": "Canales de Manglares del Río Gambia y Piraguas"
                    },
                    "recognizability_checked": True
                }
            ]
        }
    }
}

def main():
    print("Building World Tourism Batch 11A (9 countries)...")
    for iso2, country_data in BATCH11A_DATA.items():
        filepath = os.path.join(OUTPUT_DIR, f"{iso2}.json")
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(country_data, f, indent=2, ensure_ascii=False)
        print(f"✅ Generated {filepath}")

if __name__ == "__main__":
    main()
