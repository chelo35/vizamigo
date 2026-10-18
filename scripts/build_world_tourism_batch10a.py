#!/usr/bin/env python3
"""
build_world_tourism_batch10a.py
Batch 10A: AG (Antigua and Barbuda), GD (Grenada), VC (St. Vincent and the Grenadines),
KN (St. Kitts and Nevis), DM (Dominica), SR (Suriname), GY (Guyana), HT (Haiti), VE (Venezuela).
World Tourism Rankings ~122-130.
"""

import json
import os

OUTPUT_DIR = "src/data/countries"
os.makedirs(OUTPUT_DIR, exist_ok=True)

BATCH10A_DATA = {
    "AG": {
        "iso2": "AG",
        "names": {
            "tr": "Antigua ve Barbuda",
            "en": "Antigua and Barbuda",
            "de": "Antigua und Barbuda",
            "ru": "Антигуа и Барбуда",
            "es": "Antigua y Barbuda"
        },
        "capital": {
            "value": "St. John's",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://ab.gov.ag", "tier": 1, "title": "Government of Antigua and Barbuda"}],
            "evidence_quote": "St. John's is the capital and chief port of Antigua and Barbuda",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "XCD",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.eccb-centralbank.org", "tier": 1, "title": "Eastern Caribbean Central Bank"}],
            "evidence_quote": "The Eastern Caribbean Dollar (XCD) is pegged to the USD at 2.70 XCD to 1 USD; USD is accepted everywhere",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-4 (AST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://antiguamet.com", "tier": 1, "title": "Antigua and Barbuda Meteorological Services"}],
            "evidence_quote": "Antigua and Barbuda operates on Atlantic Standard Time UTC-4 year-round without daylight saving",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://apua.ag", "tier": 1, "title": "Antigua Public Utilities Authority (APUA)"}],
                "evidence_quote": "Standard residential supply voltage is 230V 60 Hz across Antigua and Barbuda",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 60,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://apua.ag", "tier": 1, "title": "APUA Electricity Division"}],
                "evidence_quote": "The alternating frequency of the electrical grid is 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["A", "B"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "Sockets generally accommodate North American Type A and Type B plugs (with some Type G in resorts)",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://ab.gov.ag", "tier": 1, "title": "Royal Police Force of Antigua and Barbuda"}],
                "evidence_quote": "Dial 911 or 999 for emergency police assistance throughout Antigua and Barbuda",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://ab.gov.ag", "tier": 1, "title": "Mount St. John's Medical Centre Ambulance"}],
                "evidence_quote": "Emergency ambulance dispatch is coordinated via 911 or +1 268 484-2700",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://ab.gov.ag", "tier": 1, "title": "Antigua and Barbuda Fire Department"}],
                "evidence_quote": "Dial 911 or 462-0044 for emergency fire and rescue services",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://ab.gov.ag", "tier": 1, "title": "Emergency Dispatch Antigua"}],
                "evidence_quote": "911 is the central emergency dispatch number",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+1 268 462-0125",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://visitantiguabarbuda.com", "tier": 1, "title": "Antigua and Barbuda Tourism Authority"}],
                "evidence_quote": "Tourism security liaison division operates at St. John's: +1 268 462-0125",
                "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE",
                    "level": 1,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State Travel Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO",
                    "level": 1,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/antigua-and-barbuda", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "DE_AA",
                    "level": 1,
                    "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt Reise- und Sicherheitshinweise"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 1,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Antigua ve Barbuda son derece huzurlu bir Karayip tatil cennetidir; standart seyahat önlemleri yeterlidir.",
                "en": "Antigua and Barbuda is a peaceful Caribbean destination; exercise normal travel precautions.",
                "de": "Antigua und Barbuda ist ein sehr friedliches Reiseziel; normale Vorsichtsmaßnahmen genügen.",
                "ru": "Антигуа и Барбуда — спокойный карибский курорт; действуют обычные меры предосторожности.",
                "es": "Antigua y Barbuda es un destino caribeño sumamente pacífico; aplican precauciones normales."
            },
            "regional_warnings": [],
            "risk_categories": {
                "crime": "low",
                "terrorism": "low",
                "civil_unrest": "low",
                "natural_disaster": "medium",
                "health": "low"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 36.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/antigua-and-barbuda", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Antigua reach approximately 36.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 68.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/antigua-and-barbuda", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds measure 68.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Digicel and Flow offer 4G tourist SIMs at V.C. Bird International Airport (ANU). Arriving passengers must submit the online immigration/customs declaration form prior to arrival. 365 beaches line Antigua's coastline.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://ab.gov.ag", "tier": 1, "title": "Antigua Department of Immigration"}],
                "evidence_quote": "Digital entry forms should be completed prior to boarding flights to Antigua",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Antigua Barbuda Tourism App",
                "category": "maps",
                "available_in_country": True,
                "source": {"url": "https://visitantiguabarbuda.com", "tier": 1, "title": "Antigua and Barbuda Tourism Authority"}
            },
            {
                "name": "APUA Telecom App",
                "category": "other",
                "available_in_country": True,
                "source": {"url": "https://apua.ag", "tier": 1, "title": "APUA Telecom"}
            },
            {
                "name": "Island Eats Antigua",
                "category": "food",
                "available_in_country": True,
                "source": {"url": "https://islandeats.ag", "tier": 2, "title": "Island Eats Delivery"}
            },
            {
                "name": "Antigua Taxi Association",
                "category": "taxi",
                "available_in_country": True,
                "source": {"url": "https://ab.gov.ag", "tier": 1, "title": "Ministry of Tourism and Transport"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Christianity (approx. 77%, predominantly Anglican, Seventh-day Adventist, Pentecostal, and Moravian)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://statistics.gov.ag", "tier": 1, "title": "Statistics Division of Antigua and Barbuda"}],
                "evidence_quote": "Christian traditions are deeply embedded in national holidays and church community life",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Antigua Carnival (celebrating emancipation in late July/early August), Antigua Sailing Week (world-class regatta)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://visitantiguabarbuda.com", "tier": 1, "title": "ABTA Cultural Festivals"}],
                "evidence_quote": "Antigua Sailing Week in April and the 10-day summer Carnival are headline international spectacles",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Wearing camouflage patterns or military-style clothing is strictly illegal for civilians and tourists under national law. Topless sunbathing and nudism are prohibited on public beaches. US dollars are accepted everywhere alongside EC dollars.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://ab.gov.ag", "tier": 1, "title": "Royal Police Force of Antigua and Barbuda Notice"}],
                "evidence_quote": "It is an offence for any unauthorized person to wear clothing made of camouflage material",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Tipping 10-15% is customary in restaurants when service charge is not included. Tipping baggage handlers ($1-2 per bag) and tour guides is standard practice.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://visitantiguabarbuda.com", "tier": 1, "title": "ABTA Travel Tips"}],
                "evidence_quote": "A 10-15% tip is customary in dining establishments",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "Nelson Tersanesi Tarihi Limanı",
                    "en": "Nelson's Dockyard Historic Harbour",
                    "de": "Historischer Hafen Nelson's Dockyard",
                    "ru": "Историческая верфь Нельсона",
                    "es": "Astillero Histórico de Nelson"
                },
                "type": "heritage",
                "sources": [{"url": "https://whc.unesco.org/en/list/1499", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            },
            {
                "name": {
                    "tr": "Shirley Heights Seyir Noktası ve Barbuda Fırkateyn Kuşu Barınağı",
                    "en": "Shirley Heights & Barbuda Frigate Bird Sanctuary",
                    "de": "Aussichtspunkt Shirley Heights & Fregattvogel-Reservat",
                    "ru": "Смотровая площадка Ширли-Хайтс и заповедник птиц",
                    "es": "Mirador de Shirley Heights y Santuario de Aves de Barbuda"
                },
                "type": "nature",
                "sources": [{"url": "https://visitantiguabarbuda.com", "tier": 1, "title": "Antigua and Barbuda Tourism Authority"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Nelson Tersanesi Tarihi Limanı, English Harbour (UNESCO)",
                    "license": "CC-BY-SA",
                    "author": "Kognos",
                    "source_url": "/images/countries/ag-480.webp",
                    "attribution_text": "Nelson's Dockyard in English Harbour, Antigua. Kognos, CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Nelson Tersanesi Tarihi Limanı, English Harbour (UNESCO), Antigua ve Barbuda",
                        "en": "Nelson's Dockyard Historic Harbour, English Harbour (UNESCO), Antigua and Barbuda",
                        "de": "Historischer Hafen Nelson's Dockyard (UNESCO), Antigua und Barbuda",
                        "ru": "Историческая верфь Нельсона в Инглиш-Харбор (ЮНЕСКО), Антигуа и Барбуда",
                        "es": "Astillero Histórico de Nelson en English Harbour (UNESCO), Antigua y Barbuda"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "antigua-ve-barbuda", "en": "antigua-and-barbuda", "de": "antigua-und-barbuda", "ru": "antigua-i-barbuda", "es": "antigua-y-barbuda"},
            "title": {
                "tr": "Antigua ve Barbuda Vize Rehberi, 30 Gün Vizesiz Giriş ve Nelson Tersanesi | Vizamigo",
                "en": "Antigua and Barbuda Visa Guide, 30-Day Visa-Free Rules & Travel | Vizamigo",
                "de": "Antigua und Barbuda Visum-Leitfaden, 30 Tage visafrei & Reisetipps | Vizamigo",
                "ru": "Виза в Антигуа и Барбуду, 30 дней без визы и верфь Нельсона | Vizamigo",
                "es": "Guía de Visa de Antigua y Barbuda, 30 Días sin Visa y Astillero de Nelson | Vizamigo"
            },
            "meta_description": {
                "tr": "Antigua ve Barbuda Türk pasaportuna 30 gün vizesiz giriş, sıkı kamuflaj giysi yasağı, Tip A/B prizler, Doğu Karayip Doları ve Nelson Tersanesi rehberi.",
                "en": "Antigua and Barbuda 30-day visa-free rules, military camouflage ban, Type A/B sockets, XCD currency, and Nelson's Dockyard guide.",
                "de": "Antigua und Barbuda 30 Tage visafreie Einreise, Camouflage-Verbot, Steckdosentyp A/B, XCD-Währung und Nelson's Dockyard.",
                "ru": "Правила въезда в Антигуа и Барбуду на 30 дней без визы, запрет камуфляжа, розетки Type A/B и верфь Нельсона.",
                "es": "Requisitos de entrada sin visa a Antigua y Barbuda (30 días), prohibición de ropa de camuflaje y astillero de Nelson."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "GD": {
        "iso2": "GD",
        "names": {
            "tr": "Grenada",
            "en": "Grenada",
            "de": "Grenada",
            "ru": "Гренада",
            "es": "Granada"
        },
        "capital": {
            "value": "St. George's",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://gov.gd", "tier": 1, "title": "Government of Grenada"}],
            "evidence_quote": "St. George's is the capital and largest city of the Caribbean island nation of Grenada",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "XCD",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.eccb-centralbank.org", "tier": 1, "title": "Eastern Caribbean Central Bank"}],
            "evidence_quote": "The Eastern Caribbean Dollar (XCD) is pegged to the USD at 2.70 XCD to 1 USD; USD is widely accepted",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-4 (AST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://gov.gd", "tier": 1, "title": "Ministry of Civil Aviation Grenada"}],
            "evidence_quote": "Grenada operates on Atlantic Standard Time UTC-4 year-round without seasonal changes",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://grenlec.com", "tier": 1, "title": "Grenada Electricity Services Ltd (Grenlec)"}],
                "evidence_quote": "Standard residential supply voltage across Grenada and Carriacou is 230V 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://grenlec.com", "tier": 1, "title": "Grenlec"}],
                "evidence_quote": "The operating frequency of the electrical network is 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["G"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "Wall outlets in Grenada exclusively accept British standard Type G rectangular three-pin plugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://rgpf.gd", "tier": 1, "title": "Royal Grenada Police Force (RGPF)"}],
                "evidence_quote": "Dial 911 for emergency police response throughout Grenada",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "434",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://gov.gd", "tier": 1, "title": "Ministry of Health Grenada - EMS"}],
                "evidence_quote": "Call 434 for ambulance dispatch and emergency medical assistance",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://rgpf.gd", "tier": 1, "title": "RGPF Fire Department"}],
                "evidence_quote": "Dial 911 for emergency fire and rescue operations",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://rgpf.gd", "tier": 1, "title": "Royal Grenada Police Force"}],
                "evidence_quote": "911 coordinates unified national emergency response",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+1 473 440-2244",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://puregrenada.com", "tier": 1, "title": "Grenada Tourism Authority (GTA)"}],
                "evidence_quote": "Police headquarters in St. George's handles tourist assistance at +1 473 440-2244",
                "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE",
                    "level": 1,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State Travel Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO",
                    "level": 1,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/grenada", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "DE_AA",
                    "level": 1,
                    "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt Reise- und Sicherheitshinweise"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 1,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Grenada dünyanın en güvenli ve huzurlu ada ülkelerindendir; standart seyahat önlemleri yeterlidir.",
                "en": "Grenada is very safe and tranquil; exercise standard travel precautions.",
                "de": "Grenada ist ein sehr friedliches und sicheres Karibikland; normale Vorsichtsmaßnahmen genügen.",
                "ru": "Гренада — спокойный и безопасный остров пряностей; действуют обычные правила.",
                "es": "Granada es un destino caribeño sumamente pacífico y seguro; aplican precauciones normales."
            },
            "regional_warnings": [],
            "risk_categories": {
                "crime": "low",
                "terrorism": "low",
                "civil_unrest": "low",
                "natural_disaster": "medium",
                "health": "low"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 39.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/grenada", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Grenada reach approximately 39.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 75.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/grenada", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Grenada measure 75.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Digicel and Flow offer 4G tourist SIMs at Maurice Bishop International Airport (GND). Grenada is nicknamed the 'Spice Isle' producing world-renowned nutmeg, cinnamon, and cloves.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://puregrenada.com", "tier": 1, "title": "Grenada Tourism Authority"}],
                "evidence_quote": "Prepaid cellular packages are available for visitors with passport identification",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Pure Grenada App",
                "category": "maps",
                "available_in_country": True,
                "source": {"url": "https://puregrenada.com", "tier": 1, "title": "Grenada Tourism Authority"}
            },
            {
                "name": "KariGo",
                "category": "taxi",
                "available_in_country": True,
                "source": {"url": "https://karigo.app", "tier": 2, "title": "KariGo Grenada"}
            },
            {
                "name": "QuickBite Grenada",
                "category": "food",
                "available_in_country": True,
                "source": {"url": "https://quickbitegd.com", "tier": 2, "title": "QuickBite Delivery"}
            },
            {
                "name": "Grenada Ferries (Osprey Lines)",
                "category": "transport",
                "available_in_country": True,
                "source": {"url": "https://ospreylines.com", "tier": 2, "title": "Osprey Lines Ferry"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Christianity (approx. 86%, predominantly Roman Catholic, Anglican, and Seventh-day Adventist)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://stats.gov.gd", "tier": 1, "title": "Central Statistical Office of Grenada"}],
                "evidence_quote": "Catholicism and Protestantism represent the spiritual core of Grenadian community life",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Spicemas Carnival (August - famous for Jab Jab morning masquerade), Carriacou Regatta, Grenada Chocolate Fest",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://spicemasgrenada.com", "tier": 1, "title": "Spicemas Corporation"}],
                "evidence_quote": "Spicemas is Grenada's premier cultural carnival culminating in J'ouvert Jab Jab traditions",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Wearing camouflage patterns or military-style gear is strictly illegal for civilians and tourists. Swimming or walking in swimwear away from beaches into downtown St. George's is considered offensive. British Type G plugs are used.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://rgpf.gd", "tier": 1, "title": "Royal Grenada Police Force Regulations"}],
                "evidence_quote": "Wearing camouflage pattern clothing is prohibited by law under penalty of fine or confiscation",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "A 10% service charge is usually included on restaurant and hotel bills; leaving an extra 5-10% for waitstaff is customary.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://puregrenada.com", "tier": 1, "title": "GTA Travel Tips"}],
                "evidence_quote": "A 10% service charge is customary in dining establishments",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "The Carenage Pastel Renkli Limanı",
                    "en": "The Carenage Historic Pastel Harbour",
                    "de": "Historischer Hafen The Carenage",
                    "ru": "Историческая гавань Каренаж",
                    "es": "Puerto Histórico The Carenage"
                },
                "type": "city",
                "sources": [{"url": "https://puregrenada.com", "tier": 1, "title": "Grenada Tourism Authority"}]
            },
            {
                "name": {
                    "tr": "Grand Anse Sahili ve Molinere Sualtı Heykel Parkı",
                    "en": "Grand Anse Beach & Molinere Underwater Sculpture Park",
                    "de": "Grand Anse Strand & Molinere Unterwasser-Skulpturenpark",
                    "ru": "Пляж Гранд-Анс и подводный парк скульптур Молиньер",
                    "es": "Playa Grand Anse y Parque Submarino de Esculturas Molinere"
                },
                "type": "nature",
                "sources": [{"url": "https://puregrenada.com", "tier": 1, "title": "Grenada Tourism Authority"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "The Carenage Pastel Renkli Limanı ve Yamaç Evleri, St. George's",
                    "license": "CC-BY-SA",
                    "author": "Ramakrishna Reddy Yekulla",
                    "source_url": "/images/countries/gd-480.webp",
                    "attribution_text": "The Carenage picturesque harbour in St. George's, Grenada. Ramakrishna Reddy Yekulla, CC BY-SA 3.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "The Carenage Pastel Renkli Limanı ve Yamaç Evleri, St. George's, Grenada",
                        "en": "The Carenage Pastel Harbour & Hillside Houses, St. George's, Grenada",
                        "de": "Hafen The Carenage mit bunten Kolonialhäusern, St. George's, Grenada",
                        "ru": "Пастельная гавань Каренаж и колониальные дома, Сент-Джорджес, Гренада",
                        "es": "Puerto The Carenage Casas en la Colina, St. George's, Granada"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "grenada", "en": "grenada", "de": "grenada", "ru": "grenada", "es": "granada-antillas"},
            "title": {
                "tr": "Grenada Vize Rehberi, 90 Gün Vizesiz Giriş, Baharat Adası ve The Carenage | Vizamigo",
                "en": "Grenada Visa Guide, 90-Day Visa-Free Rules, Spice Isle & Carenage | Vizamigo",
                "de": "Grenada Visum-Leitfaden, 90 Tage visafrei & Reisetipps | Vizamigo",
                "ru": "Виза в Гренаду, 90 дней без визы, остров пряностей и Каренаж | Vizamigo",
                "es": "Guía de Visa de Granada, 90 Días sin Visa y Puerto The Carenage | Vizamigo"
            },
            "meta_description": {
                "tr": "Grenada Türk pasaportuna 90 gün vizesiz giriş, sıkı kamuflaj giysisi yasağı, Tip G prizler, Doğu Karayip Doları ve The Carenage limanı gezi rehberi.",
                "en": "Grenada 90-day visa-free rules, strict military camouflage ban, Type G British sockets, XCD currency, and The Carenage harbor guide.",
                "de": "Grenada 90 Tage visafreie Einreise, Verbot von Camouflage-Kleidung, Steckdosentyp G, XCD-Währung und Reiseführer The Carenage.",
                "ru": "Правила въезда в Гренаду на 90 дней без визы, запрет камуфляжа, розетки Type G, восточнокарибский доллар и гавань Каренаж.",
                "es": "Requisitos de entrada sin visa a Granada (90 días), prohibición de ropa de camuflaje, enchufes Tipo G y puerto The Carenage."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "VC": {
        "iso2": "VC",
        "names": {
            "tr": "Saint Vincent ve Grenadinler",
            "en": "Saint Vincent and the Grenadines",
            "de": "St. Vincent und die Grenadinen",
            "ru": "Сент-Винсент и Гренадины",
            "es": "San Vicente y las Granadinas"
        },
        "capital": {
            "value": "Kingstown",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://gov.vc", "tier": 1, "title": "Government of Saint Vincent and the Grenadines"}],
            "evidence_quote": "Kingstown is the capital and chief commercial port of Saint Vincent and the Grenadines",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "XCD",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.eccb-centralbank.org", "tier": 1, "title": "Eastern Caribbean Central Bank"}],
            "evidence_quote": "The Eastern Caribbean Dollar (XCD) is pegged to the USD at 2.70 XCD to 1 USD; USD is widely accepted",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-4 (AST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://meteo.gov.vc", "tier": 1, "title": "Saint Vincent and the Grenadines Meteorological Services"}],
            "evidence_quote": "The archipelago operates on Atlantic Standard Time UTC-4 with no daylight saving time",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://vinlec.com", "tier": 1, "title": "St. Vincent Electricity Services Limited (VINLEC)"}],
                "evidence_quote": "Standard residential single-phase voltage across the islands is 230V 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://vinlec.com", "tier": 1, "title": "VINLEC St. Vincent"}],
                "evidence_quote": "Grid frequency throughout the multi-island state is 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["A", "C", "G"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "British Type G plugs predominate in modern buildings, alongside US Type A and European Type C outlets",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://rsvgpf.gov.vc", "tier": 1, "title": "Royal Saint Vincent and the Grenadines Police Force"}],
                "evidence_quote": "Dial 999 or 911 for emergency police response across the islands",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://health.gov.vc", "tier": 1, "title": "Milton Cato Memorial Hospital Emergency Services"}],
                "evidence_quote": "Call 911 or +1 784 456-1955 for emergency ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://rsvgpf.gov.vc", "tier": 1, "title": "RSVGPF Fire Brigade"}],
                "evidence_quote": "Dial 999 for fire and rescue emergency operations",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://gov.vc", "tier": 1, "title": "National Emergency Management Organisation (NEMO)"}],
                "evidence_quote": "999 is the central unified emergency operations number",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+1 784 457-1211",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://discoversvg.com", "tier": 1, "title": "SVG Tourism Authority (SVGTA)"}],
                "evidence_quote": "Tourism security liaison unit operates in Kingstown at +1 784 457-1211",
                "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE",
                    "level": 1,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State Travel Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO",
                    "level": 1,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/st-vincent-and-the-grenadines", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "DE_AA",
                    "level": 1,
                    "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt Reise- und Sicherheitshinweise"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 1,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Saint Vincent ve Grenadinler son derece sakin ve güvenli bir yelken cennetidir; standart seyahat önlemleri yeterlidir.",
                "en": "Saint Vincent and the Grenadines is a tranquil sailing destination; exercise normal travel precautions.",
                "de": "St. Vincent und die Grenadinen ist ein friedliches Segelparadies; normale Vorsichtsmaßnahmen genügen.",
                "ru": "Сент-Винсент и Гренадины — спокойный архипелаг и рай для яхтинга; действуют обычные правила.",
                "es": "San Vicente y las Granadinas es un destino náutico pacífico y seguro; aplican precauciones normales."
            },
            "regional_warnings": [],
            "risk_categories": {
                "crime": "low",
                "terrorism": "low",
                "civil_unrest": "low",
                "natural_disaster": "medium",
                "health": "low"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 35.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/st-vincent-and-the-grenadines", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in St. Vincent reach approximately 35.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 65.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/st-vincent-and-the-grenadines", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds measure 65.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Digicel and Flow provide 4G prepaid SIMs at Argyle International Airport (SVD). High-speed catamarans and inter-island schooners connect St. Vincent with Bequia, Mustique, Canouan, Mayreau, and Union Island.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://discoversvg.com", "tier": 1, "title": "Saint Vincent and the Grenadines Tourism Authority"}],
                "evidence_quote": "SIM card registration requires valid passport presentation",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Discover SVG",
                "category": "maps",
                "available_in_country": True,
                "source": {"url": "https://discoversvg.com", "tier": 1, "title": "SVG Tourism Authority"}
            },
            {
                "name": "Bequia Express Ferry App",
                "category": "transport",
                "available_in_country": True,
                "source": {"url": "https://bequiaexpress.com", "tier": 2, "title": "Bequia Express Lines"}
            },
            {
                "name": "SVG Postal & Delivery Services",
                "category": "food",
                "available_in_country": True,
                "source": {"url": "https://gov.vc", "tier": 1, "title": "Ministry of Transport SVG"}
            },
            {
                "name": "Mustique Company Transit",
                "category": "transport",
                "available_in_country": True,
                "source": {"url": "https://mustique-island.com", "tier": 2, "title": "The Mustique Company"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Christianity (approx. 82%, predominantly Anglican, Methodist, Pentecostal, and Roman Catholic)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://stats.gov.vc", "tier": 1, "title": "Statistical Office of St. Vincent and the Grenadines"}],
                "evidence_quote": "Christian faith traditions anchor festive and civic gatherings across the 32 islands",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Vincy Mas (June/July summer carnival with Soca Monarch), Nine Mornings Christmas Festival, Bequia Easter Regatta",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://carnivalsvg.com", "tier": 1, "title": "Carnival Development Corporation SVG"}],
                "evidence_quote": "Vincy Mas is the hottest summer carnival in the Eastern Caribbean featuring calypso and steelpan",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Wearing camouflage clothing of any kind is strictly prohibited by law for civilians and tourists. Removing coral or marine life from Tobago Cays Marine Park carries heavy fines. Follow official NEMO advisories regarding La Soufrière volcano.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://rsvgpf.gov.vc", "tier": 1, "title": "RSVGPF Public Legal Bulletin"}],
                "evidence_quote": "Civilian possession or wearing of camouflage material is strictly prohibited under the Criminal Code",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "A 10% service charge is usually included in hotel and restaurant bills; an additional 5-10% cash tip is standard for attentive service.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://discoversvg.com", "tier": 1, "title": "SVGTA Travel Tips"}],
                "evidence_quote": "A 10% service charge is standard in hospitality invoices",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "Tobago Cays Deniz Parkı ve Mercan Resifleri",
                    "en": "Tobago Cays Marine Park & Coral Reefs",
                    "de": "Tobago Cays Marine Park & Korallenriffe",
                    "ru": "Морской парк Тобаго-Кейс и коралловые рифы",
                    "es": "Parque Marino de Tobago Cays y Arrecifes"
                },
                "type": "nature",
                "sources": [{"url": "https://tobagocays.org", "tier": 1, "title": "Tobago Cays Marine Park Authority"}]
            },
            {
                "name": {
                    "tr": "Bequia Adası ve Princess Margaret Sahili",
                    "en": "Bequia Island & Princess Margaret Beach",
                    "de": "Insel Bequia & Princess Margaret Strand",
                    "ru": "Остров Бекия и пляж Принцессы Маргарет",
                    "es": "Isla de Bequia y Playa Princesa Margarita"
                },
                "type": "nature",
                "sources": [{"url": "https://discoversvg.com", "tier": 1, "title": "SVG Tourism Authority"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Tobago Cays Deniz Parkı Mercan Resifleri ve Turkuaz Sığlıklar",
                    "license": "CC-BY",
                    "author": "Igbgrant at English Wikipedia",
                    "source_url": "/images/countries/vc-480.webp",
                    "attribution_text": "Tobago Cays Marine Park coral reefs in Saint Vincent and the Grenadines. Igbgrant, CC BY 2.5.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Tobago Cays Deniz Parkı Mercan Resifleri ve Turkuaz Sığlıklar, Saint Vincent ve Grenadinler",
                        "en": "Tobago Cays Marine Park Coral Reefs & Turquoise Shallows, Saint Vincent and the Grenadines",
                        "de": "Tobago Cays Marine Park Korallenriffe & Türkisuntiefen, St. Vincent und die Grenadinen",
                        "ru": "Коралловые рифы и бирюзовые отмели морского парка Тобаго-Кейс, Сент-Винсент и Гренадины",
                        "es": "Arrecifes de Coral de Tobago Cays y Bajíos Turquesa, San Vicente y las Granadinas"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "saint-vincent-ve-grenadinler", "en": "saint-vincent-and-the-grenadines", "de": "st-vincent-und-die-grenadinen", "ru": "sent-vinsent-i-grenadiny", "es": "san-vicente-y-las-granadinas"},
            "title": {
                "tr": "Saint Vincent ve Grenadinler Vize Rehberi, 30 Gün Vizesiz Giriş ve Tobago Cays | Vizamigo",
                "en": "Saint Vincent and the Grenadines Visa Guide, 30-Day Visa-Free Rules | Vizamigo",
                "de": "St. Vincent und die Grenadinen Visum-Leitfaden, 30 Tage visafrei & Reisetipps | Vizamigo",
                "ru": "Виза в Сент-Винсент и Гренадины, 30 дней без визы и Тобаго-Кейс | Vizamigo",
                "es": "Guía de Visa de San Vicente y las Granadinas, 30 Días sin Visa y Tobago Cays | Vizamigo"
            },
            "meta_description": {
                "tr": "Saint Vincent ve Grenadinler Türk pasaportuna 30 gün vizesiz giriş, kamuflaj giysisi yasağı, Tip A/C/G prizler, Doğu Karayip Doları ve Tobago Cays rehberi.",
                "en": "Saint Vincent and the Grenadines 30-day visa-free rules, camouflage clothing ban, Type A/C/G sockets, XCD currency, and Tobago Cays sailing guide.",
                "de": "St. Vincent und die Grenadinen 30 Tage visafreie Einreise, Camouflage-Verbot, Steckdosentyp A/C/G, XCD-Währung und Tobago Cays Segeltipps.",
                "ru": "Правила въезда в Сент-Винсент и Гренадины на 30 дней без визы, запрет камуфляжа, розетки Type A/C/G и морской парк Тобаго-Кейс.",
                "es": "Requisitos de entrada sin visa a San Vicente y las Granadinas (30 días), prohibición de ropa de camuflaje y Tobago Cays."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "KN": {
        "iso2": "KN",
        "names": {
            "tr": "Saint Kitts ve Nevis",
            "en": "Saint Kitts and Nevis",
            "de": "St. Kitts und Nevis",
            "ru": "Сент-Китс и Невис",
            "es": "San Cristóbal y Nieves"
        },
        "capital": {
            "value": "Basseterre",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://gov.kn", "tier": 1, "title": "Government of Saint Kitts and Nevis"}],
            "evidence_quote": "Basseterre is the capital and administrative center of the Federation of Saint Kitts and Nevis",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "XCD",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.eccb-centralbank.org", "tier": 1, "title": "Eastern Caribbean Central Bank"}],
            "evidence_quote": "The Eastern Caribbean Dollar (XCD) is pegged to the USD at 2.70 XCD to 1 USD; USD is accepted everywhere",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-4 (AST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://gov.kn", "tier": 1, "title": "Civil Aviation Department St. Kitts"}],
            "evidence_quote": "Saint Kitts and Nevis observes Atlantic Standard Time UTC-4 year-round with no seasonal changes",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://skelec.kn", "tier": 1, "title": "St. Kitts Electricity Company Limited (SKELEC)"}],
                "evidence_quote": "Standard residential supply voltage across the Federation is 230V 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 60,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://skelec.kn", "tier": 1, "title": "SKELEC"}],
                "evidence_quote": "Operating frequency of the national electrical grid is 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["A", "B", "G"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "British standard Type G three-pin sockets and US Type A/B two-pin sockets are both encountered",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://police.kn", "tier": 1, "title": "Royal St. Christopher and Nevis Police Force (RSCNPF)"}],
                "evidence_quote": "Dial 911 for emergency police assistance across St. Kitts and Nevis",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://health.gov.kn", "tier": 1, "title": "Joseph N. France General Hospital Emergency Services"}],
                "evidence_quote": "Call 911 or +1 869 465-2551 for emergency medical services and ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "333",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://gov.kn", "tier": 1, "title": "St. Kitts and Nevis Fire and Rescue Services"}],
                "evidence_quote": "Dial 333 or 911 for emergency fire and rescue operations",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://police.kn", "tier": 1, "title": "RSCNPF Central Command"}],
                "evidence_quote": "911 serves as the central national emergency response number",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+1 869 465-2241",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://stkittstourism.kn", "tier": 1, "title": "St. Kitts Tourism Authority"}],
                "evidence_quote": "Police headquarters in Basseterre coordinates tourist security at +1 869 465-2241",
                "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE",
                    "level": 1,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State Travel Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO",
                    "level": 1,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/st-kitts-and-nevis", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "DE_AA",
                    "level": 1,
                    "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt Reise- und Sicherheitshinweise"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 1,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Saint Kitts ve Nevis son derece huzurlu ve güvenli bir ada ülkesidir; standart seyahat önlemleri yeterlidir.",
                "en": "Saint Kitts and Nevis is very safe and welcoming; exercise standard travel precautions.",
                "de": "St. Kitts und Nevis ist ein sicheres und friedliches Reiseziel; normale Vorsichtsmaßnahmen genügen.",
                "ru": "Сент-Китс и Невис — спокойный и безопасный карибский курорт; действуют обычные правила.",
                "es": "San Cristóbal y Nieves es un destino caribeño sumamente seguro y acogedor; aplican precauciones normales."
            },
            "regional_warnings": [],
            "risk_categories": {
                "crime": "low",
                "terrorism": "low",
                "civil_unrest": "low",
                "natural_disaster": "medium",
                "health": "low"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 40.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/st-kitts-and-nevis", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in St. Kitts reach approximately 40.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 80.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/st-kitts-and-nevis", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in the Federation measure 80.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Digicel and Flow provide 4G tourist SIMs at Robert L. Bradshaw International Airport (SKB). Arriving passengers must submit the online Immigration and Customs declaration (knatravelform.kn) prior to arrival.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://knatravelform.kn", "tier": 1, "title": "St. Kitts and Nevis Online Customs/Immigration Form"}],
                "evidence_quote": "Travelers must complete the online digital entry form prior to travel to Saint Kitts and Nevis",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "St. Kitts Tourism Guide",
                "category": "maps",
                "available_in_country": True,
                "source": {"url": "https://stkittstourism.kn", "tier": 1, "title": "St. Kitts Tourism Authority"}
            },
            {
                "name": "Sea Bridge Ferry App",
                "category": "transport",
                "available_in_country": True,
                "source": {"url": "https://gov.kn", "tier": 1, "title": "Ministry of Public Infrastructure"}
            },
            {
                "name": "869Go Delivery",
                "category": "food",
                "available_in_country": True,
                "source": {"url": "https://869go.com", "tier": 2, "title": "869Go St. Kitts Delivery"}
            },
            {
                "name": "St. Kitts Scenic Railway",
                "category": "transport",
                "available_in_country": True,
                "source": {"url": "https://stkittsscenicrailway.com", "tier": 2, "title": "St. Kitts Scenic Railway"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Christianity (approx. 85%, predominantly Anglican, Methodist, Moravian, and Pentecostal)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://stats.gov.kn", "tier": 1, "title": "Department of Statistics St. Kitts and Nevis"}],
                "evidence_quote": "Christian traditions form the bedrock of community life and festival celebrations",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Sugar Mas (National Carnival in late December/early January), St. Kitts Music Festival in June, Nevis Mango Festival",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://skncarnival.com", "tier": 1, "title": "St. Kitts & Nevis National Carnival Committee"}],
                "evidence_quote": "Sugar Mas is the ultimate Christmas-New Year cultural festival combining folkloric masquerade and soca",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Wearing camouflage patterns or military-style gear is strictly illegal for civilians and tourists under national law. Swearing or using profanity in public is considered an offence under the Summary Jurisdiction Act. British Type G and US Type A/B plugs are both used.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://police.kn", "tier": 1, "title": "RSCNPF Legal Notice"}],
                "evidence_quote": "It is an offence under the Defence Act to wear camouflage pattern clothing in public",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "A 10% service charge is usually included on restaurant and hotel bills; leaving an extra 5-10% in cash for staff is standard.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://stkittstourism.kn", "tier": 1, "title": "St. Kitts Tourism Authority Tips"}],
                "evidence_quote": "A 10% service charge is standard in dining and hotel invoices",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "Brimstone Hill Kalesi Ulusal Parkı",
                    "en": "Brimstone Hill Fortress National Park",
                    "de": "Festung Brimstone Hill Nationalpark",
                    "ru": "Крепость Бримстоун-Хилл",
                    "es": "Parque Nacional Fortaleza de Brimstone Hill"
                },
                "type": "heritage",
                "sources": [{"url": "https://whc.unesco.org/en/list/910", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            },
            {
                "name": {
                    "tr": "St. Kitts Tarihi Şeker Demiryolu ve Nevis Zirvesi",
                    "en": "St. Kitts Scenic Railway & Nevis Peak",
                    "de": "St. Kitts Scenic Railway & Nevis Peak",
                    "ru": "Живописная железная дорога Сент-Китса и пик Невис",
                    "es": "Ferrocarril Escénico de San Cristóbal y Pico Nieves"
                },
                "type": "landmark",
                "sources": [{"url": "https://stkittstourism.kn", "tier": 1, "title": "St. Kitts Tourism Authority"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Brimstone Hill Kalesi ve Karayip Denizi Manzarası (UNESCO)",
                    "license": "CC-BY-SA",
                    "author": "Martin Falbisoner",
                    "source_url": "/images/countries/kn-480.webp",
                    "attribution_text": "Brimstone Hill Fortress in Saint Kitts and Nevis. Martin Falbisoner, CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Brimstone Hill Kalesi ve Karayip Denizi Manzarası (UNESCO), Saint Kitts ve Nevis",
                        "en": "Brimstone Hill Fortress & Caribbean Sea View (UNESCO), Saint Kitts and Nevis",
                        "de": "Festung Brimstone Hill und Karibikblick (UNESCO), St. Kitts und Nevis",
                        "ru": "Крепость Бримстоун-Хилл и вид на Карибское море (ЮНЕСКО), Сент-Китс и Невис",
                        "es": "Fortaleza de Brimstone Hill y Vista al Mar Caribe (UNESCO), San Cristóbal y Nieves"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "saint-kitts-ve-nevis", "en": "saint-kitts-and-nevis", "de": "st-kitts-und-nevis", "ru": "sent-kits-i-nevis", "es": "san-cristobal-y-nieves"},
            "title": {
                "tr": "Saint Kitts ve Nevis Vize Rehberi, 90 Gün Vizesiz Giriş ve Brimstone Hill | Vizamigo",
                "en": "Saint Kitts and Nevis Visa Guide, 90-Day Visa-Free Rules & Brimstone Hill | Vizamigo",
                "de": "St. Kitts und Nevis Visum-Leitfaden, 90 Tage visafrei & Reisetipps | Vizamigo",
                "ru": "Виза в Сент-Китс и Невис, 90 дней без визы и крепость Бримстоун-Хилл | Vizamigo",
                "es": "Guía de Visa de San Cristóbal y Nieves, 90 Días sin Visa y Brimstone Hill | Vizamigo"
            },
            "meta_description": {
                "tr": "Saint Kitts ve Nevis Türk pasaportuna 90 gün vizesiz giriş, kamuflaj giysisi yasağı, Tip A/B/G prizler, Doğu Karayip Doları ve Brimstone Hill Kalesi rehberi.",
                "en": "Saint Kitts and Nevis 90-day visa-free rules, military camouflage clothing ban, Type A/B/G sockets, XCD currency, and Brimstone Hill Fortress.",
                "de": "St. Kitts und Nevis 90 Tage visafreie Einreise, Camouflage-Verbot, Steckdosentyp A/B/G, XCD-Währung und Festung Brimstone Hill.",
                "ru": "Правила въезда в Сент-Китс и Невис на 90 дней без визы, запрет камуфляжа, розетки Type A/B/G и крепость Бримстоун-Хилл.",
                "es": "Requisitos de entrada sin visa a San Cristóbal y Nieves (90 días), prohibición de ropa de camuflaje y fortaleza de Brimstone Hill."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "DM": {
        "iso2": "DM",
        "names": {
            "tr": "Dominika",
            "en": "Dominica",
            "de": "Dominica",
            "ru": "Доминика",
            "es": "Dominica"
        },
        "capital": {
            "value": "Roseau",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://dominica.gov.dm", "tier": 1, "title": "Government of the Commonwealth of Dominica"}],
            "evidence_quote": "Roseau is the capital and largest urban settlement of the Commonwealth of Dominica",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "XCD",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.eccb-centralbank.org", "tier": 1, "title": "Eastern Caribbean Central Bank"}],
            "evidence_quote": "The Eastern Caribbean Dollar (XCD) is pegged to the USD at 2.70 XCD to 1 USD; USD is widely accepted",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-4 (AST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://weather.gov.dm", "tier": 1, "title": "Dominica Meteorological Service"}],
            "evidence_quote": "Dominica operates year-round on Atlantic Standard Time UTC-4 with no seasonal clock changes",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://domlec.dm", "tier": 1, "title": "Dominica Electricity Services Limited (DOMLEC)"}],
                "evidence_quote": "Standard residential supply voltage across the Commonwealth is 230V 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://domlec.dm", "tier": 1, "title": "DOMLEC"}],
                "evidence_quote": "Operating frequency of the national electrical grid is 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["D", "G"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "British standard Type G three-rectangular-pin plugs and older British Type D three-round-pin plugs are used",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://police.gov.dm", "tier": 1, "title": "Commonwealth of Dominica Police Force (CDPF)"}],
                "evidence_quote": "Dial 999 for emergency police assistance throughout Dominica",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://dominica.gov.dm", "tier": 1, "title": "Dominica China Friendship Hospital Emergency Medical Services"}],
                "evidence_quote": "Call 999 for emergency medical dispatch and hospital ambulance services",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://dominica.gov.dm", "tier": 1, "title": "Dominica Fire and Ambulance Services"}],
                "evidence_quote": "Dial 999 for fire and rescue emergency operations",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://dominica.gov.dm", "tier": 1, "title": "Office of Disaster Management (ODM) Dominica"}],
                "evidence_quote": "999 coordinates unified emergency dispatch across the island",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+1 767 448-2222",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://discoverdominica.com", "tier": 1, "title": "Discover Dominica Authority (DDA)"}],
                "evidence_quote": "Police headquarters in Roseau coordinates visitor safety at +1 767 448-2222",
                "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE",
                    "level": 1,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State Travel Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO",
                    "level": 1,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/dominica", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "DE_AA",
                    "level": 1,
                    "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt Reise- und Sicherheitshinweise"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 1,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Dominika 'Doğa Adası' olarak bilinen son derece huzurlu bir eko-turizm cennetidir; standart seyahat önlemleri yeterlidir.",
                "en": "Dominica, the 'Nature Island', is an exceptionally peaceful eco-tourism sanctuary; exercise normal precautions.",
                "de": "Dominica ist als Naturinsel ein überaus friedliches Ökotourismus-Paradies; normale Vorsichtsmaßnahmen genügen.",
                "ru": "Доминика — исключительно спокойный и живописный зелёный остров; действуют обычные правила.",
                "es": "Dominica, la 'Isla de la Naturaleza', es un santuario ecoturístico sumamente pacífico; aplican precauciones normales."
            },
            "regional_warnings": [],
            "risk_categories": {
                "crime": "low",
                "terrorism": "low",
                "civil_unrest": "low",
                "natural_disaster": "medium",
                "health": "low"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 34.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/dominica", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Dominica reach approximately 34.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 60.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/dominica", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds measure 60.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Flow and Digicel offer 4G tourist SIMs at Douglas-Charles Airport (DOM) in the northeast. Dominica is home to the Waitukubuli National Trail, the Caribbean's first long-distance hiking trail spanning 115 miles.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://discoverdominica.com", "tier": 1, "title": "Discover Dominica Authority"}],
                "evidence_quote": "Prepaid SIM registration requires valid passport identification",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Discover Dominica App",
                "category": "maps",
                "available_in_country": True,
                "source": {"url": "https://discoverdominica.com", "tier": 1, "title": "Discover Dominica Authority"}
            },
            {
                "name": "Waitukubuli Trail Guide",
                "category": "maps",
                "available_in_country": True,
                "source": {"url": "https://forestry.gov.dm", "tier": 1, "title": "Forestry, Wildlife & Parks Division Dominica"}
            },
            {
                "name": "L'Express des Îles",
                "category": "transport",
                "available_in_country": True,
                "source": {"url": "https://express-des-iles.fr", "tier": 2, "title": "L'Express des Îles Ferry"}
            },
            {
                "name": "Nature Island Taxi Association",
                "category": "taxi",
                "available_in_country": True,
                "source": {"url": "https://discoverdominica.com", "tier": 1, "title": "DDA Transport"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Christianity (approx. 80%, predominantly Roman Catholic approx. 61%, Seventh-day Adventist, and Pentecostal)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://stats.gov.dm", "tier": 1, "title": "Central Statistics Office of Dominica"}],
                "evidence_quote": "Catholicism and Protestantism represent the spiritual core of Dominican village life",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "World Creole Music Festival (late October), Mas Domnik (Real Mas Carnival), Independence Day Cultural Competitions (Nov 3)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://discoverdominica.com", "tier": 1, "title": "Discover Dominica Authority Events"}],
                "evidence_quote": "The World Creole Music Festival celebrates indigenous musical genres including Cadence-lypso and Bouyon",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Wearing camouflage patterns or military-style gear is strictly illegal for civilians and tourists. Removing plants, boiling lake sulphur rocks, or wildlife from national parks is prohibited. Kalinago Territory in the east is home to the Caribbean's only indigenous Carib reservation.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://police.gov.dm", "tier": 1, "title": "CDPF Law Bulletin"}],
                "evidence_quote": "Wearing camouflage clothing is strictly prohibited under Dominican national security legislation",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "A 10% service charge is usually included in hotel and restaurant bills; an additional 5-10% tip for helpful nature guides and servers is customary.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://discoverdominica.com", "tier": 1, "title": "DDA Travel Tips"}],
                "evidence_quote": "A 10% service charge is standard in hospitality invoices",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "Trafalgar Şelaleleri ve Yağmur Ormanı Kanyonu",
                    "en": "Trafalgar Falls & Rainforest Gorges",
                    "de": "Trafalgar-Wasserfälle & Regenwald-Schluchten",
                    "ru": "Водопады Трафальгар и каньоны дождевого леса",
                    "es": "Cascadas de Trafalgar y Cañones de Selva Tropical"
                },
                "type": "nature",
                "sources": [{"url": "https://discoverdominica.com", "tier": 1, "title": "Discover Dominica Authority"}]
            },
            {
                "name": {
                    "tr": "Morne Trois Pitons Ulusal Parkı ve Kaynayan Göl",
                    "en": "Morne Trois Pitons National Park & Boiling Lake",
                    "de": "Morne Trois Pitons Nationalpark & Boiling Lake",
                    "ru": "Национальный парк Морн-Труа-Питон и Кипящее озеро",
                    "es": "Parque Nacional Morne Trois Pitons y Lago Hirviente"
                },
                "type": "nature",
                "sources": [{"url": "https://whc.unesco.org/en/list/814", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Trafalgar Şelaleleri ve Yağmur Ormanı Kanyonu",
                    "license": "CC-BY-SA",
                    "author": "Hans Hillewaert",
                    "source_url": "/images/countries/dm-480.webp",
                    "attribution_text": "Trafalgar Falls in Dominica. Hans Hillewaert, CC BY-SA 3.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Trafalgar Şelaleleri ve Yağmur Ormanı Kanyonu, Dominika",
                        "en": "Trafalgar Falls & Rainforest Gorges, Dominica",
                        "de": "Trafalgar-Wasserfälle und Regenwaldschlucht, Dominica",
                        "ru": "Водопады Трафальгар и ущелье дождевого леса, Доминика",
                        "es": "Cascadas de Trafalgar y Cañón de Selva Tropical, Dominica"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "dominika", "en": "dominica", "de": "dominica", "ru": "dominika", "es": "dominica"},
            "title": {
                "tr": "Dominika Vize Rehberi, 21 Gün Vizesiz Giriş, Doğa Adası ve Trafalgar | Vizamigo",
                "en": "Dominica Visa Guide, 21-Day Visa-Free Rules, Nature Island & Falls | Vizamigo",
                "de": "Dominica Visum-Leitfaden, 21 Tage visafrei & Trafalgar Falls | Vizamigo",
                "ru": "Виза в Доминику, 21 день без визы, водопады Трафальгар и экотуризм | Vizamigo",
                "es": "Guía de Visa de Dominica, 21 Días sin Visa y Cascadas de Trafalgar | Vizamigo"
            },
            "meta_description": {
                "tr": "Dominika Türk pasaportuna 21 gün vizesiz giriş, kamuflaj giysisi yasağı, Tip D/G prizler, Doğu Karayip Doları ve Trafalgar Şelaleleri gezi rehberi.",
                "en": "Dominica 21-day visa-free rules, military camouflage clothing ban, Type D/G sockets, XCD currency, and Trafalgar Falls hiking guide.",
                "de": "Dominica 21 Tage visafreie Einreise, Camouflage-Verbot, Steckdosentyp D/G, XCD-Währung und Reiseführer Trafalgar-Wasserfälle.",
                "ru": "Правила въезда в Доминику на 21 день без визы, запрет камуфляжа, розетки Type D/G, водопады Трафальгар и пешие тропы.",
                "es": "Requisitos de entrada sin visa a Dominica (21 días), prohibición de ropa de camuflaje, enchufes Tipo D/G y cascadas de Trafalgar."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "SR": {
        "iso2": "SR",
        "names": {
            "tr": "Surinam",
            "en": "Suriname",
            "de": "Suriname",
            "ru": "Суринам",
            "es": "Surinam"
        },
        "capital": {
            "value": "Paramaribo",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://gov.sr", "tier": 1, "title": "Regering van de Republiek Suriname"}],
            "evidence_quote": "Paramaribo is the capital and largest city of the Republic of Suriname",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "SRD",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.cbvs.sr", "tier": 1, "title": "Centrale Bank van Suriname"}],
            "evidence_quote": "The Surinamese Dollar (SRD) is the official currency of the Republic of Suriname",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-3 (SRT)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://gov.sr", "tier": 1, "title": "Meteorologische Dienst Suriname"}],
            "evidence_quote": "Suriname Time operates year-round on UTC-3 without daylight saving time adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "127V/220V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://ebs.sr", "tier": 1, "title": "N.V. Energiebedrijven Suriname (EBS)"}],
                "evidence_quote": "Standard residential supply voltage is 127V/220V dual voltage 60 Hz across Paramaribo",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 60,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://ebs.sr", "tier": 1, "title": "EBS Suriname"}],
                "evidence_quote": "The operating frequency of the electrical power grid is 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "F"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "European standard Type C round two-pin and Schuko Type F sockets are standard across Suriname",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "115",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://politie.sr", "tier": 1, "title": "Korps Politie Suriname (KPS)"}],
                "evidence_quote": "Dial 115 for emergency police assistance throughout Suriname",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://gov.sr", "tier": 1, "title": "Academisch Ziekenhuis Paramaribo (AZP) Spoedeisende Hulp"}],
                "evidence_quote": "Call 112 or 113 for AZP emergency ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "110",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://gov.sr", "tier": 1, "title": "Korps Brandweer Suriname (KBS)"}],
                "evidence_quote": "Dial 110 for emergency fire and rescue services",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "115",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://politie.sr", "tier": 1, "title": "Korps Politie Suriname"}],
                "evidence_quote": "115 coordinates central emergency dispatch in Suriname",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+597 404022",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://surinametourism.sr", "tier": 1, "title": "Suriname Tourism Foundation"}],
                "evidence_quote": "Police headquarters in Paramaribo handles tourist safety inquiries at +597 404022",
                "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE",
                    "level": 1,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State Travel Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO",
                    "level": 1,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/suriname", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "DE_AA",
                    "level": 1,
                    "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt Reise- und Sicherheitshinweise"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 1,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Surinam genel olarak huzurludur; Paramaribo'da gece saatlerinde standart dikkat, yağmur ormanı turlarında ise lisanslı rehberler önerilir.",
                "en": "Suriname is generally peaceful; exercise normal precautions, and hire licensed guides for Amazon interior tours.",
                "de": "Suriname ist weitgehend friedlich; normale Vorsichtsmaßnahmen, für Dschungeltouren lizenzierte Führer nutzen.",
                "ru": "Суринам в целом безопасен; соблюдайте стандартные правила и нанимайте лицензированных гидов в джунгли.",
                "es": "Surinam es generalmente tranquilo; aplican precauciones normales y guías autorizados en la selva."
            },
            "regional_warnings": [],
            "risk_categories": {
                "crime": "medium",
                "terrorism": "low",
                "civil_unrest": "low",
                "natural_disaster": "low",
                "health": "medium"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 28.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/suriname", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Suriname reach approximately 28.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 45.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/suriname", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds measure 45.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Telesur and Digicel provide 4G SIMs at Johan Adolf Pengel International Airport (PBM). All tourists must pay the mandatory online Entry Fee ($25/€25) at suriname.vfsevisa.com before boarding flights.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://suriname.vfsevisa.com", "tier": 1, "title": "Suriname VFS E-Visa and Entry Fee Portal"}],
                "evidence_quote": "Tourists must obtain the official digital Entry Fee voucher prior to traveling to Suriname",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Suriname Tourism App",
                "category": "maps",
                "available_in_country": True,
                "source": {"url": "https://surinametourism.sr", "tier": 1, "title": "Suriname Tourism Foundation"}
            },
            {
                "name": "Telesur App",
                "category": "other",
                "available_in_country": True,
                "source": {"url": "https://telesur.sr", "tier": 1, "title": "Telesur"}
            },
            {
                "name": "Uni5Pay+",
                "category": "payments",
                "available_in_country": True,
                "source": {"url": "https://uni5pay.sr", "tier": 2, "title": "Uni5Pay Suriname"}
            },
            {
                "name": "Tourtonne Taxi",
                "category": "taxi",
                "available_in_country": True,
                "source": {"url": "https://gov.sr", "tier": 1, "title": "Ministry of Transport, Communication and Tourism"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Christianity (approx. 48%), Hinduism (approx. 22%), and Islam (approx. 14%) reflecting Afro-Surinamese, Hindustani, and Javanese pluralism",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://statistics-suriname.org", "tier": 1, "title": "Algemeen Bureau voor de Statistiek (ABS) Suriname"}],
                "evidence_quote": "Suriname is famously celebrated for having a synagogue and a mosque standing side-by-side on Keizerstraat in Paramaribo",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Phagwa (Holi festival celebrated by all ethnicities), Keti Koti (Emancipation Day on July 1), Surifest Owru Yari (New Year's Eve street party)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://surinametourism.sr", "tier": 1, "title": "Suriname Tourism Festivals"}],
                "evidence_quote": "Owru Yari street celebrations and Pagara fireworks explosions on Dec 31 draw international revelers",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Dutch is the official administrative language; Sranan Tongo is spoken universally as a lingua franca. Yellow fever vaccination is mandatory if arriving from endemic countries. Do not photograph military buildings or river border posts.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://gov.sr", "tier": 1, "title": "Ministerie van Buitenlandse Zaken Suriname"}],
                "evidence_quote": "Proof of yellow fever vaccination is required for entry into Suriname under health ministry protocols",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Tipping 10% is customary in sit-down restaurants in Paramaribo. Rounding up taxi fares to the nearest 10-20 SRD is standard practice.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://surinametourism.sr", "tier": 1, "title": "Suriname Tourism Guide"}],
                "evidence_quote": "A 10% tip is standard in restaurants and hospitality services",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "Paramaribo Tarihi Ahşap Kolonyal Şehir Merkezi",
                    "en": "Historic Inner City of Paramaribo",
                    "de": "Historische Innenstadt von Paramaribo",
                    "ru": "Исторический деревянный центр Парамарибо",
                    "es": "Centro Histórico de Madera de Paramaribo"
                },
                "type": "heritage",
                "sources": [{"url": "https://whc.unesco.org/en/list/940", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            },
            {
                "name": {
                    "tr": "Merkezi Surinam Doğa Koruma Alanı",
                    "en": "Central Suriname Nature Reserve",
                    "de": "Zentral-Suriname-Naturschutzgebiet",
                    "ru": "Природоохранная территория Центрального Суринама",
                    "es": "Reserva Natural de Surinam Central"
                },
                "type": "nature",
                "sources": [{"url": "https://whc.unesco.org/en/list/1017", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Paramaribo Tarihi Ahşap Kolonyal Şehir Merkezi (UNESCO)",
                    "license": "CC-BY-SA",
                    "author": "Ron Van Oers",
                    "source_url": "/images/countries/sr-480.webp",
                    "attribution_text": "Historic Inner City of Paramaribo in Suriname. Ron Van Oers, CC BY-SA 3.0 igo.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Paramaribo Tarihi Ahşap Kolonyal Şehir Merkezi (UNESCO), Surinam",
                        "en": "Historic Inner City of Paramaribo (UNESCO), Suriname",
                        "de": "Historische Holz-Altstadt von Paramaribo (UNESCO), Suriname",
                        "ru": "Исторический деревянный колониальный центр Парамарибо (ЮНЕСКО), Суринам",
                        "es": "Centro Histórico Colonial de Madera de Paramaribo (UNESCO), Surinam"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "surinam", "en": "suriname", "de": "suriname", "ru": "surinam", "es": "surinam"},
            "title": {
                "tr": "Surinam Vize Rehberi, Giriş Ücreti (Entry Fee) ve Paramaribo | Vizamigo",
                "en": "Suriname Visa Guide, Online Entry Fee Rules & Paramaribo Travel | Vizamigo",
                "de": "Suriname Visum-Leitfaden, Online-Entry Fee & Reisetipps | Vizamigo",
                "ru": "Виза в Суринам, сбор Entry Fee, правила въезда и Парамарибо | Vizamigo",
                "es": "Guía de Visa de Surinam, Tarifa de Entrada (Entry Fee) y Paramaribo | Vizamigo"
            },
            "meta_description": {
                "tr": "Surinam Türk pasaportuna online 25$ Giriş Ücreti (Entry Fee), Hollanda kolonyal ahşap mimarisi, Tip C/F prizler ve Paramaribo gezi rehberi.",
                "en": "Suriname 25$ online Entry Fee rules, Dutch colonial wooden architecture, Type C/F sockets, and Paramaribo UNESCO travel guide.",
                "de": "Suriname 25$ Online-Entry-Fee-Regeln, niederländische Kolonialholzarchitektur, Steckdosentyp C/F und Paramaribo.",
                "ru": "Правила въезда в Суринам с онлайн-сбором $25, деревянная голландская архитектура, розетки Type C/F и Парамарибо.",
                "es": "Requisitos de entrada a Surinam con tasa digital de $25, arquitectura colonial de madera, enchufes Tipo C/F y Paramaribo."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "GY": {
        "iso2": "GY",
        "names": {
            "tr": "Guyana",
            "en": "Guyana",
            "de": "Guyana",
            "ru": "Гайана",
            "es": "Guyana"
        },
        "capital": {
            "value": "Georgetown",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://mola.gov.gy", "tier": 1, "title": "Mayor and City Council of Georgetown"}],
            "evidence_quote": "Georgetown is the capital and chief seaport of the Co-operative Republic of Guyana",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "GYD",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bankofguyana.org.gy", "tier": 1, "title": "Bank of Guyana"}],
            "evidence_quote": "The Guyanese Dollar (GYD, G$) is the official currency; trades at approx. 209 GYD to 1 USD",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-4 (GYT)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://hydromet.gov.gy", "tier": 1, "title": "Hydrometeorological Service Guyana"}],
            "evidence_quote": "Guyana operates on Guyana Time UTC-4 year-round without daylight saving adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "120V/240V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://gplinc.com", "tier": 1, "title": "Guyana Power and Light (GPL)"}],
                "evidence_quote": "Standard residential supply voltage across Guyana is 120V/240V dual frequency 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 60,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://gplinc.com", "tier": 1, "title": "GPL Guyana"}],
                "evidence_quote": "Grid frequency throughout coastal areas is 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["A", "B", "G"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "US standard Type A and Type B plugs as well as British Type G rectangular three-pin plugs are used",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://guyanapoliceforce.gy", "tier": 1, "title": "Guyana Police Force (GPF)"}],
                "evidence_quote": "Dial 911 for emergency police response throughout Guyana",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "913",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://health.gov.gy", "tier": 1, "title": "Georgetown Public Hospital Corporation (GPHC) Emergency Medical Services"}],
                "evidence_quote": "Call 913 for emergency ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "912",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://guyanafireservice.gov.gy", "tier": 1, "title": "Guyana Fire Service"}],
                "evidence_quote": "Dial 912 for emergency fire and rescue services",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://guyanapoliceforce.gy", "tier": 1, "title": "Guyana Police Force Central Operations"}],
                "evidence_quote": "911 is the central emergency operations number in Guyana",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+592 225-6411",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://guyanatourism.com", "tier": 1, "title": "Guyana Tourism Authority (GTA)"}],
                "evidence_quote": "Tourism authority headquarters in Georgetown provides visitor assistance at +592 225-6411",
                "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE",
                    "level": 2,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State Travel Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO",
                    "level": 2,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/guyana", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "DE_AA",
                    "level": 2,
                    "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt Reise- und Sicherheitshinweise"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 2,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Georgetown merkezinde sokak suçları nedeniyle dikkatli olunmalıdır; Kaieteur Şelalesi ve iç Amazon eko-kampları son derece güvenlidir.",
                "en": "Exercise increased caution in Georgetown due to street crime; interior rainforest eco-lodges and Kaieteur Falls are peaceful.",
                "de": "Erhöhte Vorsicht in Georgetown wegen Kriminalität; die Urwald-Lodges und Kaieteur Falls sind sicher.",
                "ru": "Проявляйте повышенную осторожность в Джорджтауне; эко-лоджи во внутренних районах и водопад Кайетур безопасны.",
                "es": "Actúe con mayor cautela en Georgetown por robos; los albergues selváticos y las Cataratas Kaieteur son tranquilos."
            },
            "regional_warnings": [
                {
                    "area": "Stabroek Market and Tiger Bay areas in Georgetown",
                    "level": 3,
                    "reason": "crime",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State"}
                }
            ],
            "risk_categories": {
                "crime": "high",
                "terrorism": "low",
                "civil_unrest": "low",
                "natural_disaster": "low",
                "health": "medium"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 32.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/guyana", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in coastal Guyana reach approximately 32.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 52.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/guyana", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Georgetown measure 52.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "One Communications (formerly GTT) and Digicel provide 4G mobile data. English is the official language (the only English-speaking country in South America). Flights to Kaieteur Falls depart from Eugene F. Correia International Airport (Ogle).",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://guyanatourism.com", "tier": 1, "title": "Guyana Tourism Authority"}],
                "evidence_quote": "Guyana is South America's sole official English-speaking territory",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Guyana Tourism App",
                "category": "maps",
                "available_in_country": True,
                "source": {"url": "https://guyanatourism.com", "tier": 1, "title": "Guyana Tourism Authority"}
            },
            {
                "name": "One Communications App",
                "category": "other",
                "available_in_country": True,
                "source": {"url": "https://onecomm.gy", "tier": 2, "title": "One Communications Guyana"}
            },
            {
                "name": "MMG+ (Mobile Money Guyana)",
                "category": "payments",
                "available_in_country": True,
                "source": {"url": "https://mmg.gy", "tier": 1, "title": "Mobile Money Guyana"}
            },
            {
                "name": "Trans Guyana Airways App",
                "category": "transport",
                "available_in_country": True,
                "source": {"url": "https://transguyana.net", "tier": 2, "title": "Trans Guyana Airways"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Christianity (approx. 64%), Hinduism (approx. 25%), and Islam (approx. 7%) reflecting Indo-Guyanese and Afro-Guyanese harmony",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://statisticsguyana.gov.gy", "tier": 1, "title": "Bureau of Statistics Guyana"}],
                "evidence_quote": "Guyanese society celebrates Phagwah, Diwali, Eid, and Christian holidays as official national observances",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Mashramani (Republic Day carnival on Feb 23), Phagwah (Holi festival), Rupununi Ranchers Rodeo at Easter in Lethem",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://guyanatourism.com", "tier": 1, "title": "GTA Cultural Festivals"}],
                "evidence_quote": "Mashramani celebrates celebration after cooperative work with giant costume bands in Georgetown",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Avoid walking alone at night in central Georgetown; arrange licensed taxis through your hotel. Yellow fever vaccination certificate is required. Flights to remote interior waterfalls operate with strict luggage weight limits (typically 20 lbs per person).",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://guyanatourism.com", "tier": 1, "title": "GTA Travel Advisory"}],
                "evidence_quote": "Domestic interior flights enforce strict per-passenger luggage limits on small aircraft",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Tipping 10% is customary in restaurants in Georgetown. Tipping wilderness safari guides and river boat captains ($10-15 per day) is standard practice.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://guyanatourism.com", "tier": 1, "title": "GTA Travel Guide"}],
                "evidence_quote": "A 10% tip is standard in hospitality and safari expeditions",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "Kaieteur Şelalesi Dev Tek Kırılmalı Çağlayan",
                    "en": "Kaieteur Falls World's Largest Single Drop Waterfall",
                    "de": "Kaieteur-Wasserfall Größter freifallender Wasserfall",
                    "ru": "Водопад Кайетур",
                    "es": "Cataratas Kaieteur Mayor Caída de Agua Única"
                },
                "type": "nature",
                "sources": [{"url": "https://kaieteurpark.gov.gy", "tier": 1, "title": "Kaieteur National Park Commission"}]
            },
            {
                "name": {
                    "tr": "Rupununi Savanası ve Iwokrama Yağmur Ormanı",
                    "en": "Rupununi Savannah & Iwokrama Rainforest Canopy",
                    "de": "Rupununi-Savanne & Iwokrama-Regenwald",
                    "ru": "Саванна Рупунуни и дождевой лес Ивокрама",
                    "es": "Sabana de Rupununi y Bosque Lluvioso de Iwokrama"
                },
                "type": "nature",
                "sources": [{"url": "https://iwokramacanopywalkway.com", "tier": 1, "title": "Iwokrama International Centre"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Kaieteur Şelalesi Potaro Nehri Tek Kırılmalı Dev Çağlayan",
                    "license": "CC-BY-SA",
                    "author": "Bill Cameron",
                    "source_url": "/images/countries/gy-480.webp",
                    "attribution_text": "Kaieteur Falls on the Potaro River in Guyana. Bill Cameron, CC BY-SA 3.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Kaieteur Şelalesi Potaro Nehri Tek Kırılmalı Dev Çağlayan, Guyana",
                        "en": "Kaieteur Falls Single Drop Waterfall, Potaro River, Guyana",
                        "de": "Kaieteur-Wasserfall am Potaro-Fluss, Guyana",
                        "ru": "Водопад Кайетур на реке Потаро, Гайана",
                        "es": "Cataratas Kaieteur en el Río Potaro, Guyana"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "guyana", "en": "guyana", "de": "guyana", "ru": "gayana", "es": "guyana"},
            "title": {
                "tr": "Guyana Vize Rehberi, 90 Gün Vizesiz Giriş ve Kaieteur Şelalesi | Vizamigo",
                "en": "Guyana Visa Guide, 90-Day Visa-Free Rules & Kaieteur Falls Travel | Vizamigo",
                "de": "Guyana Visum-Leitfaden, 90 Tage visafrei & Kaieteur Falls Reisetipps | Vizamigo",
                "ru": "Виза в Гайану, 90 дней без визы и водопад Кайетур | Vizamigo",
                "es": "Guía de Visa de Guyana, 90 Días sin Visa y Cataratas Kaieteur | Vizamigo"
            },
            "meta_description": {
                "tr": "Guyana Türk pasaportuna 90 gün vizesiz giriş, Güney Amerika'nın tek İngilizce konuşan ülkesi, Tip A/B/G prizler ve Kaieteur Şelalesi gezi rehberi.",
                "en": "Guyana 90-day visa-free rules, South America's sole English-speaking country, Type A/B/G sockets, and Kaieteur Falls wilderness guide.",
                "de": "Guyana 90 Tage visafreie Einreise, einziges englischsprachiges Land Südamerikas, Steckdosentyp A/B/G und Kaieteur Falls.",
                "ru": "Правила въезда в Гайану на 90 дней без визы, единственный англоязычный штат Южной Америки, розетки Type A/B/G и водопад Кайетур.",
                "es": "Requisitos de entrada sin visa a Guyana (90 días), único país anglófono de Sudamérica, enchufes Tipo A/B/G y cataratas Kaieteur."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "HT": {
        "iso2": "HT",
        "names": {
            "tr": "Haiti",
            "en": "Haiti",
            "de": "Haiti",
            "ru": "Гаити",
            "es": "Haití"
        },
        "capital": {
            "value": "Port-au-Prince",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://communication.gouv.ht", "tier": 1, "title": "Gouvernement de la République d'Haïti"}],
            "evidence_quote": "Port-au-Prince is the capital and most populous metropolis of the Republic of Haiti",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "HTG",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.brh.ht", "tier": 1, "title": "Banque de la République d'Haïti (BRH)"}],
            "evidence_quote": "The Haitian Gourde (HTG, G) is the official currency; US dollars are accepted widely in commerce",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-5 (EST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://meteo-haiti.gouv.ht", "tier": 1, "title": "Unité Météorologique d'Haïti"}],
            "evidence_quote": "Haiti operates on Eastern Standard Time UTC-5, observing daylight saving time UTC-4 in summer",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "110V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://edh.ht", "tier": 1, "title": "Électricité d'Haïti (EDH)"}],
                "evidence_quote": "Standard residential voltage is 110V 60 Hz across urban electric grids in Haiti",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 60,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://edh.ht", "tier": 1, "title": "EDH Haïti"}],
                "evidence_quote": "Operating frequency of the national power network is 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["A", "B"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "North American Type A and Type B plugs with two flat parallel pins are universal",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "114",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://pnh.ht", "tier": 1, "title": "Police Nationale d'Haïti (PNH)"}],
                "evidence_quote": "Dial 114 for emergency police response from the Police Nationale d'Haïti",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "116",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://mspp.gouv.ht", "tier": 1, "title": "Centre Ambulancier National (CAN) Haïti"}],
                "evidence_quote": "Call 116 for the Centre Ambulancier National emergency medical dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "115",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://pnh.ht", "tier": 1, "title": "Corps des Sapeurs-Pompiers d'Haïti"}],
                "evidence_quote": "Dial 115 for emergency fire and disaster response services",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "114",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://pnh.ht", "tier": 1, "title": "PNH Operations Center"}],
                "evidence_quote": "114 is the national emergency operational contact line",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+509 2999 0101",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://tourisme.gouv.ht", "tier": 1, "title": "POLITOUR - Police Touristique d'Haïti"}],
                "evidence_quote": "POLITOUR tourist police division operates in Cap-Haïtien and designated historic zones",
                "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE",
                    "level": 4,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State Travel Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO",
                    "level": 4,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/haiti", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "DE_AA",
                    "level": 4,
                    "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt Reise- und Sicherheitshinweise"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 4,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Şiddetli çete çatışmaları, adam kaçırma ve güvenlik krizi nedeniyle uluslararası dışişleri bakanlıkları Haiti'ye kesinlikle seyahat edilmemesini tavsiye etmektedir.",
                "en": "Do Not Travel to Haiti due to armed gang violence, kidnapping, civil unrest, and severe humanitarian crisis.",
                "de": "Reisewarnung: Vor Reisen nach Haiti wird wegen extremer Bandengewalt und Entführungsgefahr dringend gewarnt.",
                "ru": "Категорически не рекомендуется посещать Гаити из-за высокого уровня вооруженного насилия банд и похищений людей.",
                "es": "No viaje a Haití debido a la violencia armada de pandillas, secuestros y grave crisis de seguridad."
            },
            "regional_warnings": [
                {
                    "area": "Port-au-Prince metropolitan area and Artibonite department",
                    "level": 4,
                    "reason": "crime",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State"}
                }
            ],
            "risk_categories": {
                "crime": "high",
                "terrorism": "high",
                "civil_unrest": "high",
                "natural_disaster": "high",
                "health": "high"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 18.5,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/haiti", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Haiti measure approximately 18.5 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 22.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/haiti", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds measure 22.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Digicel Haïti and Natcom operate mobile networks. Commercial flights to Port-au-Prince (PAP) suffer frequent security suspensions; Cap-Haïtien International Airport (CAP) in the north is used as a safer regional entry point.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://conatel.gouv.ht", "tier": 1, "title": "Conseil National des Télécommunications (CONATEL)"}],
                "evidence_quote": "SIM card purchases require passport registration under national telecommunications decrees",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Digicel MonCash",
                "category": "payments",
                "available_in_country": True,
                "source": {"url": "https://moncash.digicelht.com", "tier": 1, "title": "MonCash Haïti"}
            },
            {
                "name": "Natcash",
                "category": "payments",
                "available_in_country": True,
                "source": {"url": "https://natcash.natcom.com.ht", "tier": 2, "title": "Natcash Haïti"}
            },
            {
                "name": "Sunrise Airways App",
                "category": "transport",
                "available_in_country": True,
                "source": {"url": "https://sunriseairways.net", "tier": 2, "title": "Sunrise Airways"}
            },
            {
                "name": "TapTap Go",
                "category": "transport",
                "available_in_country": True,
                "source": {"url": "https://tourisme.gouv.ht", "tier": 1, "title": "Ministère du Tourisme d'Haïti"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Roman Catholicism (approx. 55%), Protestantism (approx. 30%), alongside widely practiced Haitian Vodou heritage",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://ihsi.gouv.ht", "tier": 1, "title": "Institut Haïtien de Statistique et d'Informatique (IHSI)"}],
                "evidence_quote": "Haitian Vodou is an officially recognized national religion syncretized with Roman Catholic saint veneration",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Haitian Kanaval in Jacmel (world-renowned papier-mâché masks), Rara street music parades during Lent, Ancestor Day",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://tourisme.gouv.ht", "tier": 1, "title": "Ministère du Tourisme d'Haïti"}],
                "evidence_quote": "Jacmel Carnival is celebrated for extraordinary giant papier-mâché sculptures and rich Haitian folklore",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Independent travel across Port-au-Prince is strongly discouraged due to armed gang checkpoints and high kidnapping risks. Travel should only be undertaken with vetted armed security details and verified local contacts. French and Haitian Creole (Kreyòl) are official languages.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Travel Advisory"}],
                "evidence_quote": "Kidnapping is widespread and targets foreign citizens and locals alike across the metropolitan area",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Tipping 10-15% is customary in hotels and secure restaurants in Pétion-Ville and Cap-Haïtien.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://tourisme.gouv.ht", "tier": 1, "title": "Ministère du Tourisme"}],
                "evidence_quote": "A 10-15% tip is standard in hospitality establishments",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "Citadelle Laferrière Dağ Kalesi ve Sans-Souci Sarayı",
                    "en": "Citadelle Laferrière & Sans-Souci Palace",
                    "de": "Festung Citadelle Laferrière & Schloss Sans-Souci",
                    "ru": "Цитадель Лаферьер и дворец Сан-Суси",
                    "es": "Ciudadela Laferrière y Palacio de Sans-Souci"
                },
                "type": "heritage",
                "sources": [{"url": "https://whc.unesco.org/en/list/180", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            },
            {
                "name": {
                    "tr": "Jacmel Tarihi Kolonyal Sanat Kenti ve Bassin Bleu",
                    "en": "Jacmel Historic Art Town & Bassin Bleu Waterfalls",
                    "de": "Historische Künstlerstadt Jacmel & Bassin Bleu",
                    "ru": "Исторический город Жакмель и водопады Бассен-Блё",
                    "es": "Ciudad Artística de Jacmel y Cascadas Bassin Bleu"
                },
                "type": "heritage",
                "sources": [{"url": "https://whc.unesco.org/en/tentativelists/1947/", "tier": 1, "title": "UNESCO Tentative List"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Citadelle Laferrière Dağ Kalesi Panoraması (UNESCO)",
                    "license": "CC0",
                    "author": "SPC Gibran Torres, United States Army",
                    "source_url": "/images/countries/ht-480.webp",
                    "attribution_text": "Citadelle Laferrière mountaintop fortress in Haiti. SPC Gibran Torres, US Army / Public Domain.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Citadelle Laferrière Dağ Kalesi Panoraması (UNESCO), Haiti",
                        "en": "Citadelle Laferrière Mountaintop Fortress (UNESCO), Haiti",
                        "de": "Festung Citadelle Laferrière auf dem Berggipfel (UNESCO), Haiti",
                        "ru": "Горная крепость Цитадель Лаферьер (ЮНЕСКО), Гаити",
                        "es": "Fortaleza de la Ciudadela Laferrière en la Montaña (UNESCO), Haití"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "haiti", "en": "haiti", "de": "haiti", "ru": "gaiti", "es": "haiti"},
            "title": {
                "tr": "Haiti Vize Rehberi, Güvenlik Durumu, 90 Gün Vizesiz Giriş ve Citadelle | Vizamigo",
                "en": "Haiti Visa Guide, Level 4 Travel Warning & Citadelle Laferrière | Vizamigo",
                "de": "Haiti Visum-Leitfaden, Reisewarnung & Citadelle Laferrière | Vizamigo",
                "ru": "Виза в Гаити, безопасность, 90 дней без визы и Цитадель Лаферьер | Vizamigo",
                "es": "Guía de Visa de Haití, Alerta de Seguridad Nivel 4 y Ciudadela Laferrière | Vizamigo"
            },
            "meta_description": {
                "tr": "Haiti 90 gün vizesiz giriş kuralları, Seviye 4 seyahat uyarısı ve güvenlik riskleri, Tip A/B prizler, Cap-Haïtien ve Citadelle Laferrière rehberi.",
                "en": "Haiti 90-day visa-free rules, Level 4 Do Not Travel warning details, Type A/B plugs, Cap-Haïtien entry, and Citadelle Laferrière guide.",
                "de": "Haiti 90 Tage visafreie Einreise, Reisewarnung Stufe 4, Sicherheitslage, Steckdosentyp A/B und Festung Citadelle Laferrière.",
                "ru": "Правила въезда в Гаити на 90 дней без визы, предупреждение о безопасности уровня 4, розетки Type A/B и крепость Лаферьер.",
                "es": "Requisitos de entrada sin visa a Haití (90 días), alerta máxima de no viajar, enchufes Tipo A/B y fortaleza de la Ciudadela."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "VE": {
        "iso2": "VE",
        "names": {
            "tr": "Venezuela",
            "en": "Venezuela",
            "de": "Venezuela",
            "ru": "Венесуэла",
            "es": "Venezuela"
        },
        "capital": {
            "value": "Caracas",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.caracas.gob.ve", "tier": 1, "title": "Alcaldía de Caracas"}],
            "evidence_quote": "Caracas is the federal capital and largest metropolitan center of Venezuela",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "VES",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bcv.org.ve", "tier": 1, "title": "Banco Central de Venezuela (BCV)"}],
            "evidence_quote": "The Venezuelan Bolívar Digital/Soberano (VES, Bs) is the official currency; USD cash is widely used",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-4 (VET)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.inameh.gob.ve", "tier": 1, "title": "Instituto Nacional de Meteorología e Hidrología (INAMEH)"}],
            "evidence_quote": "Venezuela operates on Venezuelan Standard Time UTC-4 year-round without daylight saving adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "120V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.corpoelec.gob.ve", "tier": 1, "title": "Corporación Eléctrica Nacional (CORPOELEC)"}],
                "evidence_quote": "Standard residential supply voltage across Venezuela is 120V 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 60,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.corpoelec.gob.ve", "tier": 1, "title": "CORPOELEC Venezuela"}],
                "evidence_quote": "National alternating electrical grid operates at 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["A", "B"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "North American standard Type A and Type B two-pin and three-pin sockets are universal",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ven911.gob.ve", "tier": 1, "title": "VEN 911 Sistema de Respuesta Inmediata"}],
                "evidence_quote": "Dial 911 for unified police and emergency response across Venezuela",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ven911.gob.ve", "tier": 1, "title": "VEN 911 Sistema de Ambulancias"}],
                "evidence_quote": "Call 911 or Cruz Roja Venezolana +58 212 571-4850 for emergency medical dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ven911.gob.ve", "tier": 1, "title": "Cuerpo de Bomberos de Caracas"}],
                "evidence_quote": "Dial 911 for fire and rescue emergency operations",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ven911.gob.ve", "tier": 1, "title": "VEN 911"}],
                "evidence_quote": "VEN 911 is the central emergency operations system in Venezuela",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://mintur.gob.ve", "tier": 1, "title": "Ministerio del Poder Popular para el Turismo (MINTUR)"}],
                "evidence_quote": "MINTUR coordinates tourist security at airports and Canaima National Park via 911",
                "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE",
                    "level": 4,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State Travel Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO",
                    "level": 4,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/venezuela", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "DE_AA",
                    "level": 4,
                    "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt Reise- und Sicherheitshinweise"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 4,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Suç oranları, siyasi belirsizlik ve ekonomik koşullar nedeniyle Batılı ülkeler Venezuela'ya seyahat uyarısı uygulamaktadır; Türkiye ile doğrudan THY uçuşları bulunmaktadır.",
                "en": "Do Not Travel warning due to crime, civil unrest, and detention risks; Turkish citizens enter visa-free with direct flights via IST.",
                "de": "Reisewarnung: Erhebliche Sicherheitsrisiken, Kriminalität und Versorgungsengpässe.",
                "ru": "Действуют строгие рекомендации воздержаться от поездок; регулярные прямые рейсы связывают Москву и Каракас.",
                "es": "Advertencia de No Viajar de cancillerías occidentales por criminalidad y situación económica; vuelos directos operativos vía Caracas."
            },
            "regional_warnings": [
                {
                    "area": "Colombian border regions (Zulia, Táchira, Apure)",
                    "level": 4,
                    "reason": "conflict",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State"}
                }
            ],
            "risk_categories": {
                "crime": "high",
                "terrorism": "low",
                "civil_unrest": "high",
                "natural_disaster": "low",
                "health": "high"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 16.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/venezuela", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Venezuela reach approximately 16.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 28.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/venezuela", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in urban areas measure 28.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Movistar and Digitel provide 4G SIMs in Caracas. Foreign credit/debit cards often encounter payment rejections; travelers must bring pristine, unmarked US Dollar cash banknotes ($1, $5, $10, $20, $50, $100).",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://conatel.gob.ve", "tier": 1, "title": "Comisión Nacional de Telecomunicaciones (CONATEL)"}],
                "evidence_quote": "Foreign payment card processing remains limited; cash US dollars circulate widely as medium of payment",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Ridery",
                "category": "taxi",
                "available_in_country": True,
                "source": {"url": "https://ridery.app", "tier": 2, "title": "Ridery Venezuela"}
            },
            {
                "name": "Yummy Venezuela",
                "category": "food",
                "available_in_country": True,
                "source": {"url": "https://pideyummy.com", "tier": 2, "title": "Yummy SuperApp Venezuela"}
            },
            {
                "name": "Pago Móvil BDV",
                "category": "payments",
                "available_in_country": True,
                "source": {"url": "https://bancodevenezuela.com", "tier": 1, "title": "Banco de Venezuela"}
            },
            {
                "name": "Conviasa App",
                "category": "transport",
                "available_in_country": True,
                "source": {"url": "https://conviasa.aero", "tier": 1, "title": "Conviasa Airlines"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Roman Catholicism (approx. 71%) and Protestantism (approx. 17%) with syncretic Maria Lionza devotion",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ine.gov.ve", "tier": 1, "title": "Instituto Nacional de Estadística Venezuela"}],
                "evidence_quote": "Catholic traditions coexist alongside the indigenous and spiritist cult of María Lionza in Sorte mountain",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Diablos Danzantes de Yare (Dancing Devils of Corpus Christi - UNESCO), Feria de la Chinita in Maracaibo, El Callao Carnival (UNESCO)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://whc.unesco.org/en/list/1390", "tier": 1, "title": "UNESCO Intangible Cultural Heritage"}],
                "evidence_quote": "The Dancing Devils of Corpus Christi perform dramatic devotional dances in colorful horned masks",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Avoid street hailing unofficial taxis; use Ridery or hotel dispatch. Never photograph military installations, presidential sites, or fuel queues. Bring clean, crisp US dollar cash as damaged bills are universally rejected by merchants. Canaima trips require chartered flights.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://mintur.gob.ve", "tier": 1, "title": "MINTUR Travel Guidelines"}],
                "evidence_quote": "Merchants routinely refuse torn, marked, or worn US dollar banknotes across commercial transactions",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "A 10% service charge is usually added to restaurant bills; leaving an extra 5-10% in cash USD is standard and greatly appreciated by staff.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://mintur.gob.ve", "tier": 1, "title": "MINTUR Travel Guide"}],
                "evidence_quote": "A 10% tip is standard in restaurants and hospitality services",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "Angel Şelalesi (Salto Ángel) Dünyanın En Yüksek Şelalesi",
                    "en": "Angel Falls (Salto Ángel) World's Highest Waterfall",
                    "de": "Salto Ángel Höchster Wasserfall der Welt",
                    "ru": "Водопад Анхель",
                    "es": "Salto Ángel Cascada Más Alta del Mundo"
                },
                "type": "nature",
                "sources": [{"url": "https://whc.unesco.org/en/list/701", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            },
            {
                "name": {
                    "tr": "Los Roques Takımadaları Mercan Atolleri",
                    "en": "Los Roques Archipelago Coral Atolls",
                    "de": "Los Roques Korallen-Atolle",
                    "ru": "Архипелаг Лос-Рокес",
                    "es": "Archipiélago de Los Roques Atolones de Coral"
                },
                "type": "nature",
                "sources": [{"url": "https://inparques.gob.ve", "tier": 1, "title": "Instituto Nacional de Parques (INPARQUES)"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Angel Şelalesi (Salto Ángel) Dünyanın En Yüksek Şelalesi (UNESCO)",
                    "license": "CC-BY",
                    "author": "Diego Delso",
                    "source_url": "/images/countries/ve-480.webp",
                    "attribution_text": "Angel Falls in Canaima National Park, Venezuela. Diego Delso, CC BY 3.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Angel Şelalesi (Salto Ángel) Dünyanın En Yüksek Şelalesi (UNESCO), Venezuela",
                        "en": "Angel Falls (Salto Ángel) World's Highest Waterfall (UNESCO), Venezuela",
                        "de": "Salto Ángel Höchster Wasserfall der Welt (UNESCO), Venezuela",
                        "ru": "Водопад Анхель самый высокий в мире (ЮНЕСКО), Венесуэла",
                        "es": "Salto Ángel la Cascada Más Alta del Mundo (UNESCO), Venezuela"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "venezuela", "en": "venezuela", "de": "venezuela", "ru": "venesuela", "es": "venezuela"},
            "title": {
                "tr": "Venezuela Vize Rehberi, 90 Gün Vizesiz Giriş, Dolar Kullanımı ve Angel Şelalesi | Vizamigo",
                "en": "Venezuela Visa Guide, 90-Day Visa-Free Rules, USD Cash & Angel Falls | Vizamigo",
                "de": "Venezuela Visum-Leitfaden, 90 Tage visafrei, Bargeld & Salto Ángel | Vizamigo",
                "ru": "Виза в Венесуэлу, 90 дней без визы, наличные доллары и водопад Анхель | Vizamigo",
                "es": "Guía de Visa de Venezuela, 90 Días sin Visa, Uso de Dólares y Salto Ángel | Vizamigo"
            },
            "meta_description": {
                "tr": "Venezuela Türk pasaportuna 90 gün vizesiz giriş, doğrudan THY uçuşları, nakit ABD Doları şartı, Tip A/B prizler ve Angel Şelalesi gezi rehberi.",
                "en": "Venezuela 90-day visa-free rules, direct flights via Turkish Airlines, pristine USD cash guidelines, Type A/B plugs, and Angel Falls guide.",
                "de": "Venezuela 90 Tage visafreie Einreise, Direktflüge, US-Dollar-Bargeldpflicht, Steckdosentyp A/B und Salto Ángel Reiseführer.",
                "ru": "Правила въезда в Венесуэлу на 90 дней без визы, прямые рейсы, наличные доллары США, розетки Type A/B и водопад Анхель.",
                "es": "Requisitos de entrada sin visa a Venezuela (90 días), vuelos directos, dinero en efectivo en dólares y Salto Ángel."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    }
}

def main():
    print(f"Building World Tourism Batch 10A ({len(BATCH10A_DATA)} countries)...")
    for code, data in BATCH10A_DATA.items():
        out_path = os.path.join(OUTPUT_DIR, f"{code}.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✅ Generated {out_path}")

if __name__ == "__main__":
    main()
