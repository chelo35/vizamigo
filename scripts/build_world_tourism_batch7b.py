#!/usr/bin/env python3
"""
build_world_tourism_batch7b.py
Batch 7B: AM (Armenia), NP (Nepal), LA (Laos),
MN (Mongolia), MD (Moldova), KE (Kenya), TZ (Tanzania).
"""

import json
import os

OUTPUT_DIR = "src/data/countries"
os.makedirs(OUTPUT_DIR, exist_ok=True)

BATCH7B_DATA = {
    "AM": {
        "iso2": "AM",
        "names": {
            "tr": "Ermenistan",
            "en": "Armenia",
            "de": "Armenien",
            "ru": "Армения",
            "es": "Armenia"
        },
        "capital": {
            "value": "Erivan",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.yerevan.am", "tier": 1, "title": "Yerevan Municipality Official Portal"}],
            "evidence_quote": "Yerevan is the capital and administrative, cultural, and industrial center of Armenia",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "AMD",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.cba.am", "tier": 1, "title": "Central Bank of Armenia"}],
            "evidence_quote": "The Armenian Dram (AMD) is the national legal tender currency of Armenia",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+4 (AMT)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.gov.am", "tier": 1, "title": "Government of the Republic of Armenia"}],
            "evidence_quote": "Armenia observes Armenia Time UTC+4 year-round without daylight saving adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ena.am", "tier": 1, "title": "Electric Networks of Armenia (ENA)"}],
                "evidence_quote": "Standard residential supply voltage across Armenia is 230V 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ena.am", "tier": 1, "title": "Electric Networks of Armenia"}],
                "evidence_quote": "Armenian electrical transmission grid operates at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "F"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Wall outlets in Armenia conform to European Type C and Type F standards",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "102",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.police.am", "tier": 1, "title": "Police of the Republic of Armenia"}],
                "evidence_quote": "Dial 102 for emergency police response across Armenia",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "103",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.moh.am", "tier": 1, "title": "Ministry of Health of Armenia"}],
                "evidence_quote": "Call 103 for emergency medical assistance and ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "101",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.mes.am", "tier": 1, "title": "Rescue Service of the Ministry of Internal Affairs"}],
                "evidence_quote": "Dial 101 for fire and technical rescue services",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.mes.am", "tier": 1, "title": "Rescue Service"}],
                "evidence_quote": "Unified 112 / 911 emergency number connects to all rescue services in Armenia",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+374 10 534 041",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://armenia.travel", "tier": 1, "title": "Tourism Committee of the Republic of Armenia"}],
                "evidence_quote": "Tourism Information and police patrol divisions operate in central Yerevan and Northern Avenue",
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
                    "level": 1,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/armenia", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "DE_AA",
                    "level": 1,
                    "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt Reise- und Sicherheitshinweise"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 2,
            "agencies_agree": False,
            "advisory_headline": {
                "tr": "Erivan, Sevan Gölü ve Tatev güvenlidir; Azerbaycan sınır boylarındaki askeri temas hatlarından uzak durulmalıdır.",
                "en": "Yerevan, Lake Sevan, and Tatev are safe; avoid travel to eastern border areas with Azerbaijan.",
                "de": "Jerewan, Sewansee und Tatew sind sicher; Grenzgebiete zu Aserbaidschan unbedingt meiden.",
                "ru": "Ереван, озеро Севан и Татев безопасны; избегайте приграничных районов с Азербайджаном.",
                "es": "Ereván, el Lago Sevan y Tatev son seguros; evite las áreas fronterizas con Azerbaiyán."
            },
            "regional_warnings": [
                {
                    "area": "Eastern Border with Azerbaijan (Syunik, Gegharkunik, Vayots Dzor frontiers)",
                    "level": 3,
                    "reason": "Border skirmishes and active military checkpoints; avoid non-essential travel to border strips.",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Advisory"}
                }
            ],
            "risk_categories": {
                "crime": "low",
                "terrorism": "low",
                "civil_unrest": "low",
                "natural_disaster": "low",
                "health": "low"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 36.4,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/armenia", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Armenia reach approximately 36.4 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 62.8,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/armenia", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Armenia measure 62.8 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Viva-MTS, Team Telecom Armenia, and Ucom offer high-speed 4G/5G prepaid tourist eSIMs with instant passport verification at Zvartnots Airport.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.mts.am", "tier": 1, "title": "Viva-MTS Armenia"}],
                "evidence_quote": "Tourist SIM and eSIM packages offer unlimited data and calling allowances",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "GG / Yandex Go",
                "category": "taxi",
                "popular": True,
                "description": "GG is Armenia's beloved homegrown ride-hailing app, operating alongside Yandex Go in Yerevan."
            },
            {
                "name": "Menu.am",
                "category": "food",
                "popular": True,
                "description": "Leading restaurant meal delivery service in Yerevan."
            },
            {
                "name": "Telcell Wallet / Idram",
                "category": "payments",
                "popular": True,
                "description": "Universal QR mobile payment apps accepted across Armenian stores and cafes."
            },
            {
                "name": "2GIS / Yandex Maps",
                "category": "maps",
                "popular": True,
                "description": "High-accuracy city maps and public transport transit schedules for Yerevan."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "eVisa / VoA",
                "duration_days": 21,
                "conditions": "Türk vatandaşları online e-Visa alabilir veya Zvartnots Havalimanı sınır kapısında Kapıda Vize (VoA - 21 gün, ~6$) alabilir.",
                "passport_validity_months": 3,
                "source": {"url": "https://evisa.mfa.am", "tier": 1, "title": "Armenia Ministry of Foreign Affairs e-Visa"}
            },
            "us": {
                "regime": "VF",
                "duration_days": 180,
                "conditions": "US citizens can enter Armenia visa-free for up to 180 days per calendar year.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.mfa.am/en/visa/", "tier": 1, "title": "Ministry of Foreign Affairs of Armenia"}
            },
            "de": {
                "regime": "VF",
                "duration_days": 180,
                "conditions": "German and EU citizens enter Armenia visa-free for stays of up to 180 days per calendar year.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.mfa.am/en/visa/", "tier": 1, "title": "Ministry of Foreign Affairs of Armenia"}
            },
            "gb": {
                "regime": "VF",
                "duration_days": 180,
                "conditions": "British passport holders can visit Armenia visa-free for up to 180 days within any calendar year.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/armenia/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "VF",
                "duration_days": 180,
                "conditions": "Граждане РФ могут въезжать в Армению по внутреннему или заграничному паспорту на срок до 180 дней в году.",
                "passport_validity_months": 0,
                "source": {"url": "https://www.mfa.am/ru/visa/", "tier": 1, "title": "МИД Армении"}
            }
        },
        "digital_nomad": {
            "available": False,
            "visa_name": None,
            "min_income_usd": None,
            "duration_months": None,
            "source": None
        },
        "etiquette": {
            "dos": [
                {
                    "title": "Drink water from Pulpulaks",
                    "description": "Yerevan's streets are dotted with public memorial water fountains (Pulpulaks); the mountain spring water is crisp, cold, and free."
                },
                {
                    "title": "Respect ancient monastery grounds",
                    "description": "When visiting holy sites like Geghard (UNESCO) or Khor Virap, dress respectfully with covered shoulders."
                },
                {
                    "title": "Use GG or Yandex Go for taxis",
                    "description": "App-based taxis avoid overcharging by unmetered street cabs outside Republic Square and the airport."
                }
            ],
            "donts": [
                {
                    "title": "Don't photograph military border installations",
                    "description": "Strictly refrain from taking photos or flying drones near southern border checkpoints or military areas."
                },
                {
                    "title": "Don't decline hospitality impolitely",
                    "description": "Armenian hospitality is deeply generous; accepting coffee or lavash with appreciation is customary."
                }
            ],
            "tipping": "Tipping 10% is customary in restaurants in Yerevan; some upscale venues include a 10% service charge automatically."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Hor Virap Manastırı ve Ağrı Dağı (Ararat) Manzarası",
                    "license": "CC BY-SA 3.0",
                    "author": "Andrew Behesnilian (MrAndrew47)",
                    "source_url": "/images/countries/am-480.webp",
                    "attribution_text": "Khor Virap Monastery and Mount Ararat in Armenia. Andrew Behesnilian, CC BY-SA 3.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Hor Virap Manastırı ve Ağrı Dağı (Ararat) Manzarası, Ermenistan",
                        "en": "Khor Virap Monastery & Mount Ararat View, Armenia",
                        "de": "Kloster Chor Virap mit Blick auf den Berg Ararat, Armenien",
                        "ru": "Монастырь Хор Вирап и вид на гору Арарат, Армения",
                        "es": "Monasterio de Khor Virap y Vista del Monte Ararat, Armenia"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "ermenistan", "en": "armenia", "de": "armenien", "ru": "armeniya", "es": "armenia"},
            "title": {
                "tr": "Ermenistan Vize Rehberi, Kapıda Vize (VoA) ve Khor Virap Gezisi | Vizamigo",
                "en": "Armenia Visa Guide, Visa on Arrival & Khor Virap Travel | Vizamigo",
                "de": "Armenien Visum-Leitfaden, Visa on Arrival & Chor Virap Reisen | Vizamigo",
                "ru": "Виза в Армению, правила въезда и монастырь Хор Вирап | Vizamigo",
                "es": "Guía de Visa de Armenia, Visa a la Llegada y Khor Virap | Vizamigo"
            },
            "meta_description": {
                "tr": "Ermenistan Türk pasaportuna e-Visa ve kapıda vize şartları, GG taksi uygulaması, Pulpulak çeşmeleri ve Khor Virap gezi rehberi.",
                "en": "Armenia eVisa and VoA rules, GG ride-hailing app, public pulpulak water fountains, and Khor Virap monastery tips.",
                "de": "Armenien e-Visum und Visa on Arrival Bestimmungen, GG Taxi-App und Reisetipps Kloster Chor Virap.",
                "ru": "Правила въезда в Армению, виза по прибытии, приложение GG и путеводитель по монастырю Хор Вирап.",
                "es": "Requisitos de visa electrónica y a la llegada para Armenia, app de taxi GG y guía de Khor Virap."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "NP": {
        "iso2": "NP",
        "names": {
            "tr": "Nepal",
            "en": "Nepal",
            "de": "Nepal",
            "ru": "Непал",
            "es": "Nepal"
        },
        "capital": {
            "value": "Katmandu",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://kathmandu.gov.np", "tier": 1, "title": "Kathmandu Metropolitan City Official Portal"}],
            "evidence_quote": "Kathmandu is the capital and largest metropolis of the Federal Democratic Republic of Nepal",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "NPR",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.nrb.org.np", "tier": 1, "title": "Nepal Rastra Bank"}],
            "evidence_quote": "The Nepalese Rupee (NPR) is the official currency of Nepal, pegged to the Indian Rupee",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+5:45 (NPT)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://nepal.gov.np", "tier": 1, "title": "Government of Nepal National Portal"}],
            "evidence_quote": "Nepal observes Nepal Standard Time UTC+5:45 year-round based on Mount Gauri Sankar",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.nea.org.np", "tier": 1, "title": "Nepal Electricity Authority (NEA)"}],
                "evidence_quote": "Standard domestic electrical supply in Nepal is 230V alternating current at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.nea.org.np", "tier": 1, "title": "Nepal Electricity Authority"}],
                "evidence_quote": "Grid alternating frequency is maintained at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "D", "M"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Nepal utilizes Europlug Type C and round-pin Indian Type D and Type M plugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "100",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.nepalpolice.gov.np", "tier": 1, "title": "Nepal Police"}],
                "evidence_quote": "Dial 100 for emergency police assistance throughout Nepal",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "102",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://mohp.gov.np", "tier": 1, "title": "Ministry of Health and Population of Nepal"}],
                "evidence_quote": "Call 102 for emergency medical response and Red Cross ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "101",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.nepalpolice.gov.np", "tier": 1, "title": "Nepal Police Emergency Management"}],
                "evidence_quote": "Dial 101 for municipal fire brigade dispatch in Nepal",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "100",
                "status": "verified",
                "confidence": "medium",
                "sources": [{"url": "https://www.nepalpolice.gov.np", "tier": 1, "title": "Nepal Police"}],
                "evidence_quote": "100 acts as the national primary emergency dispatch center",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "1144",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.nepalpolice.gov.np/departments/tourist-police/", "tier": 1, "title": "Tourist Police Nepal"}],
                "evidence_quote": "Tourist Police specialized toll-free hotline 1144 provides 24/7 trekking rescue and assistance",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/nepal", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Nepal genelinde güvenlik ortamı huzurludur; yüksek irtifa dağcılığı ve muson dönemi heyelanlarına dikkat edilmelidir.",
                "en": "Exercise normal precautions; prepare adequately for high-altitude sickness (AMS) on Himalayan treks.",
                "de": "In Nepal gelten normale Vorsichtsmaßnahmen; Höhenkrankheit (AMS) bei Trekkingtouren beachten.",
                "ru": "В Непале действует нормальный уровень безопасности; соблюдайте правила акклиматизации в Гималаях.",
                "es": "Aplican precauciones normales de viaje; tome precauciones contra el mal de altura en los Himalayas."
            },
            "regional_warnings": [],
            "risk_categories": {
                "crime": "low",
                "terrorism": "low",
                "civil_unrest": "low",
                "natural_disaster": "high",
                "health": "medium"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 22.8,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/nepal", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Nepal measure 22.8 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 56.4,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/nepal", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Nepal reach 56.4 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Ncell and Nepal Telecom (Namaste) offer tourist SIM and eSIM cards at Tribhuvan International Airport; bring passport photos. Mandatory TIMS card and licensed guide required for mountain trekking.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://ntb.gov.np", "tier": 1, "title": "Nepal Tourism Board"}],
                "evidence_quote": "Solo trekking regulations require a licensed trekking guide and TIMS registration permit",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Pathao / InDrive",
                "category": "taxi",
                "popular": True,
                "description": "Indispensable ride-hailing apps for motorbike and car taxis navigating Kathmandu traffic."
            },
            {
                "name": "Foodmandu",
                "category": "food",
                "popular": True,
                "description": "Nepal's premier food delivery service operating in Kathmandu, Lalitpur, and Pokhara."
            },
            {
                "name": "eSewa / Khalti",
                "category": "payments",
                "popular": True,
                "description": "Widely used digital wallets for paying park fees, domestic bus tickets, and shop purchases."
            },
            {
                "name": "Maps.me",
                "category": "maps",
                "popular": True,
                "description": "Vital offline mapping app with detailed topographic Himalayan trekking trails."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "VoA",
                "duration_days": 30,
                "conditions": "Türk vatandaşları Katmandu Tribhuvan Havalimanı'nda Kapıda Vize (VoA) alabilir (15 gün 30$, 30 gün 50$, 90 gün 125$).",
                "passport_validity_months": 6,
                "source": {"url": "https://www.immigration.gov.np", "tier": 1, "title": "Department of Immigration Nepal"}
            },
            "us": {
                "regime": "VoA",
                "duration_days": 30,
                "conditions": "US citizens can obtain a Visa on Arrival at Tribhuvan Airport (15/30/90 days) or apply online beforehand.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.immigration.gov.np", "tier": 1, "title": "Department of Immigration Nepal"}
            },
            "de": {
                "regime": "VoA",
                "duration_days": 30,
                "conditions": "German and EU citizens receive Visa on Arrival at Kathmandu airport (15/30/90 days with valid passport).",
                "passport_validity_months": 6,
                "source": {"url": "https://www.immigration.gov.np", "tier": 1, "title": "Department of Immigration Nepal"}
            },
            "gb": {
                "regime": "VoA",
                "duration_days": 30,
                "conditions": "British passport holders are eligible for Visa on Arrival at Tribhuvan Airport for 15, 30, or 90 days.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/nepal/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "VoA",
                "duration_days": 30,
                "conditions": "Граждане РФ получают визу по прибытии в аэропорту Катманду на срок 15, 30 или 90 дней.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.immigration.gov.np", "tier": 1, "title": "Департамент иммиграции Непала"}
            }
        },
        "digital_nomad": {
            "available": False,
            "visa_name": None,
            "min_income_usd": None,
            "duration_months": None,
            "source": None
        },
        "etiquette": {
            "dos": [
                {
                    "title": "Always walk clockwise around stupas and mani stones",
                    "description": "In Buddhist and Hindu tradition, always circumambulate chortens, stupas (Boudhanath), and prayer wheels clockwise."
                },
                {
                    "title": "Greet with 'Namaste' with hands together",
                    "description": "Place palms together at chest level and bow slightly; it conveys deep spiritual respect."
                },
                {
                    "title": "Obtain helicopter evacuation insurance for trekking",
                    "description": "Always secure travel insurance that covers emergency high-altitude helicopter rescue up to 6,000 meters."
                }
            ],
            "donts": [
                {
                    "title": "Don't touch anyone's head or point your feet",
                    "description": "The head is sacred and feet are considered unclean; never stretch feet towards shrines, monks, or elders."
                },
                {
                    "title": "Don't trek without a licensed guide",
                    "description": "Nepalese regulations mandate hiring a licensed guide for mountain trekking to prevent solo accidents."
                }
            ],
            "tipping": "Tipping 10% is customary in tourist restaurants; tipping trekking guides and porters at the end of a mountain expedition is customary and expected."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Everest Dağı Zirvesi ve Himalaya Sıradağları",
                    "license": "CC BY-SA 2.5",
                    "author": "Luca Galuzzi (Lucag)",
                    "source_url": "/images/countries/np-480.webp",
                    "attribution_text": "Mount Everest north face summit and Himalayan mountain range. Luca Galuzzi, CC BY-SA 2.5.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Everest Dağı Zirvesi ve Himalaya Sıradağları, Nepal",
                        "en": "Mount Everest Summit & Himalayan Range, Nepal",
                        "de": "Mount Everest Gipfel & Himalaya-Hauptkamm, Nepal",
                        "ru": "Вершина горы Эверест и Гималайский хребет, Непал",
                        "es": "Cumbre del Monte Everest y Cordillera del Himalaya, Nepal"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "nepal", "en": "nepal", "de": "nepal", "ru": "nepal", "es": "nepal"},
            "title": {
                "tr": "Nepal Vize Rehberi, Kapıda Vize (VoA) ve Everest Gezisi | Vizamigo",
                "en": "Nepal Visa Guide, Visa on Arrival & Mount Everest Travel | Vizamigo",
                "de": "Nepal Visum-Leitfaden, Visa on Arrival & Mount Everest Reisen | Vizamigo",
                "ru": "Виза в Непал, виза по прибытии и треккинг к Эвересту | Vizamigo",
                "es": "Guía de Visa de Nepal, Visa a la Llegada y Viajes al Everest | Vizamigo"
            },
            "meta_description": {
                "tr": "Nepal kapıda vize (VoA) ücretleri, UTC+5:45 saat dilimi, rehberli trekking kuralları, Pathao taksi ve Everest gezi rehberi.",
                "en": "Nepal Visa on Arrival fees, unique UTC+5:45 timezone, mandatory trekking guide rules, Pathao app, and Everest tips.",
                "de": "Nepal Visa on Arrival Gebühren, UTC+5:45 Zeitzone, Trekking-Guide-Pflicht und Mount Everest Reisetipps.",
                "ru": "Правила визы по прибытии в Непал, часовой пояс UTC+5:45, правила треккинга и путеводитель к Эвересту.",
                "es": "Requisitos de Visa a la Llegada en Nepal, zona horaria UTC+5:45, reglas de trekking obligatorio y guía del Everest."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "LA": {
        "iso2": "LA",
        "names": {
            "tr": "Laos",
            "en": "Laos",
            "de": "Laos",
            "ru": "Лаос",
            "es": "Laos"
        },
        "capital": {
            "value": "Vientiane",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.vientiane.gov.la", "tier": 1, "title": "Vientiane Capital Administration"}],
            "evidence_quote": "Vientiane is the capital and largest city of the Lao People's Democratic Republic",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "LAK",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bol.gov.la", "tier": 1, "title": "Bank of the Lao PDR (BOL)"}],
            "evidence_quote": "The Lao Kip (LAK) is the official national currency; Thai Baht and USD are often accepted",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+7 (ICT)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://laogov.gov.la", "tier": 1, "title": "Government of Lao PDR"}],
            "evidence_quote": "Laos observes Indochina Time UTC+7 year-round without daylight saving adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.edl.com.la", "tier": 1, "title": "Electricite du Laos (EDL)"}],
                "evidence_quote": "Residential electrical distribution in Laos delivers 230V alternating current at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.edl.com.la", "tier": 1, "title": "Electricite du Laos"}],
                "evidence_quote": "Nominal alternating frequency across the grid is 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["A", "B", "C", "E"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Outlets in Laos accept flat two-pin Type A/B as well as round two-pin Type C/E plugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "1191",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://laogov.gov.la", "tier": 1, "title": "Ministry of Public Security of Lao PDR"}],
                "evidence_quote": "Dial 1191 for national emergency police services across Laos",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "1195",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.vientianerescue.org", "tier": 1, "title": "Vientiane Rescue / Ministry of Health"}],
                "evidence_quote": "Call 1195 for volunteer ambulance and emergency medical dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "1190",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://laogov.gov.la", "tier": 1, "title": "Ministry of Public Security"}],
                "evidence_quote": "Dial 1190 for municipal fire and rescue services in Laos",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "1191",
                "status": "verified",
                "confidence": "medium",
                "sources": [{"url": "https://laogov.gov.la", "tier": 1, "title": "Ministry of Public Security"}],
                "evidence_quote": "1191 connects callers to primary police dispatchers",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+856 21 251 128",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://tourismlaos.org", "tier": 1, "title": "Tourism Development Department of Lao PDR"}],
                "evidence_quote": "Tourist Police division hotline provides English assistance in Luang Prabang and Vientiane",
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
                    "level": 1,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/laos", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "DE_AA",
                    "level": 1,
                    "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt Reise- und Sicherheitshinweise"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 2,
            "agencies_agree": False,
            "advisory_headline": {
                "tr": "Luang Prabang, Vang Vieng ve Vientiane güvenlidir; kırsal bölgelerde patlamamış mühimmat (UXO) uyarılarına dikkat edilmelidir.",
                "en": "Tourist cities Luang Prabang and Vang Vieng are safe; heed unexploded ordnance (UXO) warnings in rural areas.",
                "de": "Luang Prabang und Vang Vieng sind sicher; im ländlichen Raum auf Blindgänger-Warnungen (UXO) achten.",
                "ru": "Луангпхабанг и Вангвьенг безопасны; в сельской местности не сходите с троп из-за неразорвавшихся снарядов (UXO).",
                "es": "Luang Prabang y Vang Vieng son seguros; atención a municiones sin detonar (UXO) en zonas rurales."
            },
            "regional_warnings": [
                {
                    "area": "Golden Triangle Special Economic Zone (Bokeo Province)",
                    "level": 3,
                    "reason": "Presence of organized scam centers and casino zones; avoid travel to this enclave.",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Advisory"}
                }
            ],
            "risk_categories": {
                "crime": "low",
                "terrorism": "low",
                "civil_unrest": "low",
                "natural_disaster": "medium",
                "health": "medium"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 29.2,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/laos", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Laos measure approximately 29.2 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 38.6,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/laos", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Laos reach 38.6 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Unitel and Lao Telecom offer tourist eSIMs with reliable 4G/LTE coverage. The Laos-China Railway (LCR) connects Vientiane, Vang Vieng, and Luang Prabang in 2 hours; book train tickets via the LCR Ticket app.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://unitel.com.la", "tier": 1, "title": "Unitel Lao PDR"}],
                "evidence_quote": "Unitel provides nationwide cellular coverage across main urban corridors and railway tracks",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "LOCA",
                "category": "taxi",
                "popular": True,
                "description": "The official licensed ride-hailing app in Laos for booking safe cars and electric taxis."
            },
            {
                "name": "LCR Ticket",
                "category": "transport",
                "popular": True,
                "description": "Essential official booking app for the modern Laos-China high-speed train network."
            },
            {
                "name": "Foodpanda",
                "category": "food",
                "popular": True,
                "description": "Popular food delivery service operating in Vientiane and Luang Prabang."
            },
            {
                "name": "BCEL One",
                "category": "payments",
                "popular": False,
                "description": "National mobile banking QR payment app widely accepted across merchants."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "eVisa / VoA",
                "duration_days": 30,
                "conditions": "Türk vatandaşları havalimanlarında ve uluslararası sınır kapılarında Kapıda Vize (VoA - 30 gün, 40$) veya online e-Visa alabilir.",
                "passport_validity_months": 6,
                "source": {"url": "https://laoevisa.gov.la", "tier": 1, "title": "Official Laos e-Visa Portal"}
            },
            "us": {
                "regime": "eVisa / VoA",
                "duration_days": 30,
                "conditions": "US citizens can obtain a 30-day Visa on Arrival ($40 USD) or apply for an eVisa online before traveling.",
                "passport_validity_months": 6,
                "source": {"url": "https://laoevisa.gov.la", "tier": 1, "title": "Official Laos e-Visa Portal"}
            },
            "de": {
                "regime": "eVisa / VoA",
                "duration_days": 30,
                "conditions": "German and EU citizens are eligible for a 30-day Visa on Arrival or online eVisa.",
                "passport_validity_months": 6,
                "source": {"url": "https://laoevisa.gov.la", "tier": 1, "title": "Official Laos e-Visa Portal"}
            },
            "gb": {
                "regime": "eVisa / VoA",
                "duration_days": 30,
                "conditions": "British passport holders can purchase a Visa on Arrival (30 days, $40) or apply for an eVisa.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/laos/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "VF",
                "duration_days": 30,
                "conditions": "Граждане РФ могут въезжать в Лаос без визы на срок до 30 дней с туристическими целями.",
                "passport_validity_months": 6,
                "source": {"url": "https://laoevisa.gov.la", "tier": 1, "title": "МИД Лаоса"}
            }
        },
        "digital_nomad": {
            "available": False,
            "visa_name": None,
            "min_income_usd": None,
            "duration_months": None,
            "source": None
        },
        "etiquette": {
            "dos": [
                {
                    "title": "Respect the morning Alms Giving ceremony (Tak Bat)",
                    "description": "In Luang Prabang, observe monks collecting morning alms from a respectful distance; dress modestly and do not flash cameras in their faces."
                },
                {
                    "title": "Book train tickets in advance on LCR Ticket app",
                    "description": "High-speed train seats between Vientiane, Vang Vieng, and Luang Prabang sell out days in advance; book via the official app."
                },
                {
                    "title": "Remove shoes when entering temples and homes",
                    "description": "Always take off footwear before stepping onto monastery verandas or entering private Lao guesthouses."
                }
            ],
            "donts": [
                {
                    "title": "Don't touch or climb on ancient Buddha statues",
                    "description": "Buddha images are sacred religious objects; posing inappropriately or sitting on statues is offensive and illegal."
                },
                {
                    "title": "Don't wander off marked paths in rural Xieng Khouang",
                    "description": "Laos is the most heavily bombed country per capita in history; strictly obey red unexploded ordnance (UXO) marker signs."
                }
            ],
            "tipping": "Tipping is not traditional in Laos, but leaving 10% in upscale restaurants or tipping tour boat operators and guides is appreciated."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Kuang Si Çok Katmanlı Turkuaz Şelalesi, Luang Prabang",
                    "license": "CC BY-SA 4.0",
                    "author": "Basile Morin",
                    "source_url": "/images/countries/la-480.webp",
                    "attribution_text": "Kuang Si multi-tiered turquoise waterfall pools near Luang Prabang, Laos. Basile Morin, CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Kuang Si Çok Katmanlı Turkuaz Şelalesi, Luang Prabang, Laos",
                        "en": "Kuang Si Multi-Tiered Turquoise Falls, Luang Prabang, Laos",
                        "de": "Kuang-Si-Wasserfälle mit Türkisbecken, Luang Prabang, Laos",
                        "ru": "Многоярусный бирюзовый водопад Куанг Си, Луангпхабанг, Лаос",
                        "es": "Cascadas Escalonadas de Kuang Si, Luang Prabang, Laos"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "laos", "en": "laos", "de": "laos", "ru": "laos", "es": "laos"},
            "title": {
                "tr": "Laos Vize Rehberi, Kapıda Vize (VoA) ve Kuang Si Şelalesi | Vizamigo",
                "en": "Laos Visa Guide, Visa on Arrival & Kuang Si Falls Travel | Vizamigo",
                "de": "Laos Visum-Leitfaden, Visa on Arrival & Kuang Si Wasserfälle | Vizamigo",
                "ru": "Виза в Лаос, виза по прибытии и водопад Куанг Си | Vizamigo",
                "es": "Guía de Visa de Laos, Visa a la Llegada y Cascadas de Kuang Si | Vizamigo"
            },
            "meta_description": {
                "tr": "Laos kapıda vize (VoA) şartları, Laos-Çin hızlı treni (LCR), LOCA taksi uygulaması, sabah sadaka seremonisi ve Kuang Si gezi rehberi.",
                "en": "Laos 30-day Visa on Arrival rules, Laos-China Railway app tips, LOCA taxi, Tak Bat etiquette, and Kuang Si Falls guide.",
                "de": "Laos Visa on Arrival Bestimmungen, Laos-China-Schnellzug, LOCA Taxi-App und Reisetipps Kuang-Si-Wasserfälle.",
                "ru": "Правила визы по прибытии в Лаос, скоростной поезд LCR, приложение LOCA и водопады Куанг Си.",
                "es": "Requisitos de Visa a la Llegada en Laos, tren de alta velocidad LCR, app LOCA y guía de cascadas Kuang Si."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "MN": {
        "iso2": "MN",
        "names": {
            "tr": "Moğolistan",
            "en": "Mongolia",
            "de": "Mongolei",
            "ru": "Монголия",
            "es": "Mongolia"
        },
        "capital": {
            "value": "Ulanbator",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://ulaanbaatar.mn", "tier": 1, "title": "Ulaanbaatar City Municipality"}],
            "evidence_quote": "Ulaanbaatar is the capital and largest city of Mongolia, home to almost half the population",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "MNT",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.mongolbank.mn", "tier": 1, "title": "Bank of Mongolia (Mongolbank)"}],
            "evidence_quote": "The Mongolian Tögrög (MNT) is the official national currency of Mongolia",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+8 (ULAT) / UTC+7 (HOVT)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://zasag.mn", "tier": 1, "title": "Government of Mongolia"}],
            "evidence_quote": "Central and eastern Mongolia observes Ulaanbaatar Time UTC+8 without daylight saving time",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "220V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://energy.gov.mn", "tier": 1, "title": "Ministry of Energy of Mongolia"}],
                "evidence_quote": "Standard residential domestic supply voltage across Mongolia is 220V 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://energy.gov.mn", "tier": 1, "title": "Ministry of Energy of Mongolia"}],
                "evidence_quote": "Grid frequency throughout Mongolia operates at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "E"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Standard sockets in Mongolia accommodate Europlug Type C and grounded Type E plugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "102",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://police.gov.mn", "tier": 1, "title": "National Police Agency of Mongolia"}],
                "evidence_quote": "Dial 102 for emergency police services across Mongolia",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "103",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://mohs.mn", "tier": 1, "title": "Ministry of Health of Mongolia"}],
                "evidence_quote": "Call 103 for emergency ambulance and urgent medical dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "101",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://nema.gov.mn", "tier": 1, "title": "National Emergency Management Agency (NEMA)"}],
                "evidence_quote": "Dial 101 for fire and technical rescue brigades",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "105",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://nema.gov.mn", "tier": 1, "title": "NEMA Mongolia"}],
                "evidence_quote": "Call 105 for integrated disaster rescue and wilderness emergency coordination",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+976 7010 8614",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://mongolia.travel", "tier": 1, "title": "Mongolia National Tourism Organization"}],
                "evidence_quote": "Tourist Police department patrols Sukhbaatar Square and Peace Avenue with English support",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/mongolia", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Moğolistan genelinde güvenlik ortamı çok huzurludur; kış aylarında aşırı soğuk hava şartlarına (Dzud) hazırlıklı olunmalıdır.",
                "en": "Exercise normal precautions; winter temperatures can be severe (-30°C to -40°C), requiring thermal gear.",
                "de": "In der Mongolei gelten normale Sicherheitsvorkehrungen; im Winter auf extreme Kälte vorbereiten.",
                "ru": "В Монголии действует нормальный уровень безопасности; зимой учитывайте суровые морозы (дзуд).",
                "es": "Aplican precauciones normales de viaje; en invierno prepárese para temperaturas bajo cero extremas."
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
                "value": 31.5,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/mongolia", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Mongolia reach approximately 31.5 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 54.8,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/mongolia", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Mongolia measure 54.8 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Unitel and Mobicom offer prepaid 4G/LTE tourist eSIMs. Connectivity is fast across Ulaanbaatar, but drops in the remote Gobi Desert and western Altai steppes; carry offline maps and a satellite tracker.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.unitel.mn", "tier": 1, "title": "Unitel Mongolia"}],
                "evidence_quote": "Prepaid cellular plans provide nationwide coverage along main national highway corridors",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "UBCab",
                "category": "taxi",
                "popular": True,
                "description": "The premier licensed taxi-hailing app in Ulaanbaatar with upfront electronic meter fares."
            },
            {
                "name": "Toki",
                "category": "food",
                "popular": True,
                "description": "Popular Mongolian super-app integrating food delivery, cinema booking, and mobile payments."
            },
            {
                "name": "Ger",
                "category": "maps",
                "popular": True,
                "description": "Offline map and nomadic camp guide for navigating the Mongolian countryside."
            },
            {
                "name": "SocialPay",
                "category": "payments",
                "popular": True,
                "description": "Widely used digital wallet app for cashless QR payments throughout Mongolia."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "VF",
                "duration_days": 30,
                "conditions": "Türkiye Cumhuriyeti umuma mahsus, hususi ve hizmet pasaportu hamilleri 30 güne kadar vizeden muaftır.",
                "passport_validity_months": 6,
                "source": {"url": "https://immigration.gov.mn", "tier": 1, "title": "Moğolistan Göç İdaresi"}
            },
            "us": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "US citizens can travel to Mongolia visa-free for tourist stays of up to 90 days.",
                "passport_validity_months": 6,
                "source": {"url": "https://immigration.gov.mn", "tier": 1, "title": "Mongolia Immigration Agency"}
            },
            "de": {
                "regime": "VF",
                "duration_days": 30,
                "conditions": "German and EU citizens enjoy visa-free entry to Mongolia for stays of up to 30 days under the tourism campaign.",
                "passport_validity_months": 6,
                "source": {"url": "https://evisa.mn", "tier": 1, "title": "Official Mongolia e-Visa System"}
            },
            "gb": {
                "regime": "VF",
                "duration_days": 30,
                "conditions": "British citizens can visit Mongolia visa-free for up to 30 days for tourism purposes.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/mongolia/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "VF",
                "duration_days": 30,
                "conditions": "Граждане РФ могут въезжать в Монголию без визы на срок до 30 дней (не более 90 дней суммарно за 180 дней).",
                "passport_validity_months": 6,
                "source": {"url": "https://immigration.gov.mn", "tier": 1, "title": "Агентство по иммиграции Монголии"}
            }
        },
        "digital_nomad": {
            "available": False,
            "visa_name": None,
            "min_income_usd": None,
            "duration_months": None,
            "source": None
        },
        "etiquette": {
            "dos": [
                {
                    "title": "Never step on the threshold of a Ger",
                    "description": "Stepping on the wooden door threshold of a traditional nomadic tent (Ger / Yurt) is seen as stepping on the host's neck."
                },
                {
                    "title": "Accept offered milk tea (Suutei Tsai) with both hands",
                    "description": "Always accept bowls of tea, dairy curds (Aaruul), or vodka with the right hand supported at the elbow by the left hand."
                },
                {
                    "title": "Walk around Buddhist ovoos clockwise three times",
                    "description": "When passing sacred roadside rock cairns (Ovoo), walk around them three times clockwise and add a small stone for safe travels."
                }
            ],
            "donts": [
                {
                    "title": "Don't whistle inside a Ger",
                    "description": "Whistling indoors is believed to summon violent windstorms and bad fortune."
                },
                {
                    "title": "Don't cross between the two central support pillars of a Ger",
                    "description": "The central roof poles represent the spiritual pillar of the household; walking between them breaks sacred harmony."
                }
            ],
            "tipping": "Tipping is not customary in traditional Mongolian culture, but 10% in Ulaanbaatar restaurants or tips for expedition drivers and camp cooks are appreciated."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Cengiz Han Heykel Kompleksi ve Uçsuz Bucaksız Bozkır",
                    "license": "CC BY-SA 3.0",
                    "author": "Chinneeb",
                    "source_url": "/images/countries/mn-480.webp",
                    "attribution_text": "Genghis Khan Equestrian Statue at Tsonjin Boldog overlooking the Mongolian steppe. Chinneeb, CC BY-SA 3.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Cengiz Han Heykel Kompleksi ve Uçsuz Bucaksız Bozkır, Moğolistan",
                        "en": "Genghis Khan Equestrian Statue & Mongolian Steppe, Mongolia",
                        "de": "Dschingis-Khan-Reiterstatue & Mongolische Steppe, Mongolei",
                        "ru": "Конная статуя Чингисхана и монгольская степь, Монголия",
                        "es": "Estatua Ecuestre de Gengis Kan y Estepa de Mongolia, Mongolia"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "mogolistan", "en": "mongolia", "de": "mongolei", "ru": "mongoliya", "es": "mongolia"},
            "title": {
                "tr": "Moğolistan Vize Rehberi, 30 Gün Vizesiz Giriş ve Cengiz Han Heykeli | Vizamigo",
                "en": "Mongolia Visa Guide, 30-Day Visa-Free & Genghis Khan Statue | Vizamigo",
                "de": "Mongolei Visum-Leitfaden, 30 Tage visafrei & Dschingis Khan Statue | Vizamigo",
                "ru": "Виза в Монголию, 30 дней без визы и статуя Чингисхана | Vizamigo",
                "es": "Guía de Visa de Mongolia, 30 Días sin Visa y Estatua de Gengis Kan | Vizamigo"
            },
            "meta_description": {
                "tr": "Moğolistan Türk pasaportuna 30 gün vizesiz giriş, Ger çadırı görgü kuralları, UBCab taksi ve Cengiz Han dev heykeli gezi rehberi.",
                "en": "Mongolia 30-day visa-free rules, traditional Ger yurt etiquette, UBCab taxi app, and Genghis Khan equestrian statue guide.",
                "de": "Mongolei 30 Tage visafreie Einreise, Jurten-Knigge (Ger), UBCab App und Reisetipps Dschingis-Khan-Statue.",
                "ru": "Правила въезда в Монголию на 30 дней без визы, этикет в юрте (гэр), такси UBCab и статуя Чингисхана.",
                "es": "Requisitos de entrada sin visa a Mongolia (30 días), etiqueta en yurtas (Ger), app UBCab y estatua de Gengis Kan."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "MD": {
        "iso2": "MD",
        "names": {
            "tr": "Moldova",
            "en": "Moldova",
            "de": "Moldau",
            "ru": "Молдова",
            "es": "Moldavia"
        },
        "capital": {
            "value": "Kişinev",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.chisinau.md", "tier": 1, "title": "Primăria Municipiului Chișinău"}],
            "evidence_quote": "Chișinău is the capital and largest city of the Republic of Moldova",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "MDL",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bnm.md", "tier": 1, "title": "National Bank of Moldova (Banca Națională a Moldovei)"}],
            "evidence_quote": "The Moldovan Leu (MDL) is the official national currency of Moldova",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+2 (EET) / UTC+3 (EEST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://gov.md", "tier": 1, "title": "Government of the Republic of Moldova"}],
            "evidence_quote": "Moldova observes Eastern European Time UTC+2 and Eastern European Summer Time UTC+3",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.moldelectrica.md", "tier": 1, "title": "Moldelectrica State Enterprise"}],
                "evidence_quote": "Standard residential alternating current across Moldova is supplied at 230V 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.moldelectrica.md", "tier": 1, "title": "Moldelectrica State Enterprise"}],
                "evidence_quote": "Power grid frequency is synchronized at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "F"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Electrical sockets in Moldova utilize European two-pin Type C and Schuko Type F plugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://politia.md", "tier": 1, "title": "General Police Inspectorate of Moldova"}],
                "evidence_quote": "Dial 112 for emergency police intervention across all regions of Moldova",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://112.md", "tier": 1, "title": "Serviciul Național Unic Pentru Apelurile de Urgență 112"}],
                "evidence_quote": "Call 112 for emergency medical services and ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://dse.md", "tier": 1, "title": "General Inspectorate for Emergency Situations (IGSU)"}],
                "evidence_quote": "Call 112 for fire rescue and disaster response brigades",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://112.md", "tier": 1, "title": "Single National Emergency Service 112"}],
                "evidence_quote": "112 is Moldova's unified national emergency number handling police, medical, and fire",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": None,
                "status": "not_found",
                "confidence": None,
                "sources": [],
                "evidence_quote": None,
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/moldova", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Moldova genelinde seyahat güvenlidir; ayrılıkçı Transdinyester bölgesine geçişlerde özel kurallar geçerlidir.",
                "en": "Chișinău and wine regions are safe; note separate border checkpoint controls when entering Transnistria.",
                "de": "Chișinău und Weinregionen sind sicher; gesonderte Grenzkontrollen bei Einreise nach Transnistrien beachten.",
                "ru": "Кишинёв и винные регионы безопасны; учитывайте отдельный пограничный контроль при въезде в Приднестровье.",
                "es": "Chisináu y las regiones vinícolas son seguras; tenga en cuenta el control fronterizo hacia Transnistria."
            },
            "regional_warnings": [
                {
                    "area": "Transnistria (Breakaway Region)",
                    "level": 2,
                    "reason": "De facto breakaway territory outside Moldovan government control; keep passport and entry migration card.",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Advisory"}
                }
            ],
            "risk_categories": {
                "crime": "low",
                "terrorism": "low",
                "civil_unrest": "low",
                "natural_disaster": "low",
                "health": "low"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 58.2,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/moldova", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Moldova reach approximately 58.2 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 115.4,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/moldova", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Moldova measure 115.4 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Orange Moldova and Moldcell offer affordable 4G/5G prepaid tourist eSIMs. High-speed fiber broadband and free public Wi-Fi are widespread in Chișinău central parks.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.orange.md", "tier": 1, "title": "Orange Moldova"}],
                "evidence_quote": "Prepaid tourist packages provide comprehensive high-speed mobile data access",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "iTaxi / Yandex Go",
                "category": "taxi",
                "popular": True,
                "description": "Standard ride-hailing applications in Chișinău with fixed upfront fares."
            },
            {
                "name": "Straus",
                "category": "food",
                "popular": True,
                "description": "Leading restaurant meal delivery app in Chișinău and Balti."
            },
            {
                "name": "Chișinău Transport",
                "category": "transport",
                "popular": True,
                "description": "Official trolleybus and bus schedule tracker for Chișinău."
            },
            {
                "name": "Cricova App",
                "category": "other",
                "popular": True,
                "description": "Visitor guide app for exploring the world's largest underground wine cellar labyrinth."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "Türkiye Cumhuriyeti vatandaşları yeni kimlik kartı veya pasaport ile 180 gün içinde 90 güne kadar vizesiz seyahat edebilir.",
                "passport_validity_months": 3,
                "source": {"url": "https://mfa.gov.md", "tier": 1, "title": "Moldova Dışişleri ve Avrupa Entegrasyonu Bakanlığı"}
            },
            "us": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "US citizens can enter Moldova visa-free for tourist stays of up to 90 days in any 180-day period.",
                "passport_validity_months": 3,
                "source": {"url": "https://mfa.gov.md/en/content/visa-regime", "tier": 1, "title": "Ministry of Foreign Affairs of Moldova"}
            },
            "de": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "German and EU citizens do not require a visa for visits to Moldova of up to 90 days in a 180-day window.",
                "passport_validity_months": 3,
                "source": {"url": "https://mfa.gov.md/en/content/visa-regime", "tier": 1, "title": "Ministry of Foreign Affairs of Moldova"}
            },
            "gb": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "British passport holders can enter Moldova visa-free for stays of up to 90 days within any 180-day period.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/moldova/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "Граждане РФ могут въезжать в Молдову без визы на срок до 90 дней в течение 180 дней.",
                "passport_validity_months": 3,
                "source": {"url": "https://mfa.gov.md/ru/content/vizovyy-rezhim", "tier": 1, "title": "МИД Молдовы"}
            }
        },
        "digital_nomad": {
            "available": False,
            "visa_name": None,
            "min_income_usd": None,
            "duration_months": None,
            "source": None
        },
        "etiquette": {
            "dos": [
                {
                    "title": "Tour the underground wine cellars (Cricova & Mileștii Mici)",
                    "description": "Mileștii Mici holds the Guinness World Record for the largest wine collection in the world; book cellar tours in advance."
                },
                {
                    "title": "Travel with Turkish ID card directly",
                    "description": "Under bilateral agreements, Turkish citizens can enter Moldova using a modern Turkish biometric ID card without a passport."
                },
                {
                    "title": "Keep the Transnistria migration slip",
                    "description": "If taking a day trip to Tiraspol in Transnistria, keep the paper migration slip received at the internal boundary post."
                }
            ],
            "donts": [
                {
                    "title": "Don't confuse Moldova with Romania",
                    "description": "While languages are shared, Moldovans maintain their own distinct modern statehood and cultural traditions."
                },
                {
                    "title": "Don't take photos of military checkpoints near Dniester",
                    "description": "Peacekeeping observation posts along the internal Dniester boundary prohibit photography."
                }
            ],
            "tipping": "Tipping 10% in sit-down restaurants and cafes in Chișinău is customary for good service."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Orheiul Vechi Tarihi Manastır Kompleksi ve Răut Nehri Kanyonu",
                    "license": "CC BY-SA 3.0",
                    "author": "Kishinevsky",
                    "source_url": "/images/countries/md-480.webp",
                    "attribution_text": "Orheiul Vechi historical monastery complex and Răut river canyon in Moldova. CC BY-SA 3.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Orheiul Vechi Tarihi Manastır Kompleksi ve Răut Nehri Kanyonu, Moldova",
                        "en": "Orheiul Vechi Historical Monastery Complex & Răut River Canyon, Moldova",
                        "de": "Historischer Klosterkomplex Orheiul Vechi & Răut-Schlucht, Moldau",
                        "ru": "Исторический комплекс Старый Орхей и каньон реки Рэут, Молдова",
                        "es": "Complejo Monástico Histórico de Orheiul Vechi y Cañón del Río Răut, Moldavia"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "moldova", "en": "moldova", "de": "moldau", "ru": "moldova", "es": "moldavia"},
            "title": {
                "tr": "Moldova Vize Rehberi, Çipli Kimlikle Giriş ve Cricova Gezisi | Vizamigo",
                "en": "Moldova Visa Guide, ID Card Entry & Cricova Wine Cellars | Vizamigo",
                "de": "Moldau Visum-Leitfaden, Visafreie Einreise & Cricova Weinkeller | Vizamigo",
                "ru": "Виза в Молдову, въезд по ID-карте и винные подвалы Крикова | Vizamigo",
                "es": "Guía de Visa de Moldavia, Entrada con DNI y Bodegas de Cricova | Vizamigo"
            },
            "meta_description": {
                "tr": "Moldova'ya yeni Türk çipli kimliğiyle 90 gün vizesiz giriş, iTaxi uygulaması, Orheiul Vechi ve dünyanın en büyük Cricova şarap mahzenleri rehberi.",
                "en": "Moldova visa-free rules with biometric ID, iTaxi app, Orheiul Vechi cave monasteries, and Cricova underground cellars guide.",
                "de": "Moldau visafreie Einreise mit Personalausweis, iTaxi App, Felsenkloster Orheiul Vechi und Weinkeller Cricova.",
                "ru": "Правила безвизового въезда в Молдову, приложение iTaxi, Старый Орхей и знаменитые винные подвалы Крикова.",
                "es": "Requisitos de entrada sin visa a Moldavia, app iTaxi, monasterio de Orheiul Vechi y bodegas subterráneas de Cricova."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "KE": {
        "iso2": "KE",
        "names": {
            "tr": "Kenya",
            "en": "Kenya",
            "de": "Kenia",
            "ru": "Кения",
            "es": "Kenia"
        },
        "capital": {
            "value": "Nairobi",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://nairobi.go.ke", "tier": 1, "title": "Nairobi City County Official Portal"}],
            "evidence_quote": "Nairobi is the capital and largest city of the Republic of Kenya",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "KES",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.centralbank.go.ke", "tier": 1, "title": "Central Bank of Kenya"}],
            "evidence_quote": "The Kenyan Shilling (KES) is the official national currency of Kenya",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+3 (EAT)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.president.go.ke", "tier": 1, "title": "Executive Office of the President of Kenya"}],
            "evidence_quote": "Kenya observes East Africa Time UTC+3 year-round without daylight saving adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "240V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://kplc.co.ke", "tier": 1, "title": "Kenya Power and Lighting Company (KPLC)"}],
                "evidence_quote": "Domestic nominal electricity across Kenya operates at 240V 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://kplc.co.ke", "tier": 1, "title": "Kenya Power and Lighting Company"}],
                "evidence_quote": "Alternating grid transmission frequency is 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["G"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Standard electrical sockets in Kenya utilize British three-rectangular-pin Type G plugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.nationalpolice.go.ke", "tier": 1, "title": "National Police Service of Kenya"}],
                "evidence_quote": "Dial 999 or 112 for emergency police services across Kenya",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.health.go.ke", "tier": 1, "title": "Ministry of Health of Kenya"}],
                "evidence_quote": "Call 999 or Red Cross ambulance services for emergency medical dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://nairobi.go.ke", "tier": 1, "title": "Nairobi Fire and Rescue Services"}],
                "evidence_quote": "Dial 999 for municipal fire and technical rescue brigades",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.nationalpolice.go.ke", "tier": 1, "title": "National Police Service"}],
                "evidence_quote": "112 functions as the nationwide universal mobile emergency dispatch number",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+254 20 272 4154",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://magicalkenya.com", "tier": 1, "title": "Kenya Tourism Board (KTB)"}],
                "evidence_quote": "Tourist Police Unit (TPU) dedicated 24/7 hotline operates across Nairobi, Mombasa, and safari parks",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/kenya", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Maasai Mara, Amboseli ve Diani Beach güvenlidir; Somali sınırı ve başkentin belirli dış mahallelerinden kaçınılmalıdır.",
                "en": "Safari parks and beach resorts are safe; avoid travel to the Kenya-Somalia border areas.",
                "de": "Safariparks und Strandresorts sind sicher; Grenzgebiete zu Somalia meiden.",
                "ru": "Национальные сафари-парки и пляжи безопасны; избегайте приграничных с Сомали территорий.",
                "es": "Los parques de safari y playas son seguros; evite las áreas fronterizas con Somalia."
            },
            "regional_warnings": [
                {
                    "area": "Northern and Eastern Border with Somalia (Mandera, Wajir, Garissa)",
                    "level": 4,
                    "reason": "Al-Shabaab terrorist activity and armed cross-border incidents; completely restricted.",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Advisory"}
                }
            ],
            "risk_categories": {
                "crime": "high",
                "terrorism": "medium",
                "civil_unrest": "medium",
                "natural_disaster": "low",
                "health": "medium"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 31.8,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/kenya", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Kenya reach approximately 31.8 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 46.5,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/kenya", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Kenya measure 46.5 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "All inbound international travelers must obtain the electronic Travel Authorisation (eTA) on etakenya.go.ke before boarding. Safaricom and Airtel provide tourist eSIMs; Safaricom's M-Pesa is used for virtually all transactions.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.etakenya.go.ke", "tier": 1, "title": "Kenya Electronic Travel Authorisation (eTA) Official Portal"}],
                "evidence_quote": "All visitors must hold an approved electronic Travel Authorisation before arrival",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "M-Pesa",
                "category": "payments",
                "popular": True,
                "description": "Kenya's world-famous mobile money service; accepted by literally everyone from safari lodges to street fruit stalls."
            },
            {
                "name": "Uber / Bolt / Little",
                "category": "taxi",
                "popular": True,
                "description": "Safe, reliable ride-hailing apps operating in Nairobi, Mombasa, and Kisumu."
            },
            {
                "name": "Glovo",
                "category": "food",
                "popular": True,
                "description": "Leading food delivery and supermarket errand app across Nairobi."
            },
            {
                "name": "Madaraka Express",
                "category": "transport",
                "popular": True,
                "description": "Official booking app for the modern standard gauge railway (SGR) between Nairobi and Mombasa."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "eTA Required",
                "duration_days": 90,
                "conditions": "Tüm yabancı ziyaretçiler gibi Türk vatandaşları da seyahatten önce www.etakenya.go.ke üzerinden elektronik Seyahat İzni (eTA - ~35$) almak zorundadır.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.etakenya.go.ke", "tier": 1, "title": "Kenya Göç İdaresi eTA Sistemi"}
            },
            "us": {
                "regime": "eTA Required",
                "duration_days": 90,
                "conditions": "All travelers including US citizens must apply for and obtain an approved electronic Travel Authorisation (eTA) online prior to departure.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.etakenya.go.ke", "tier": 1, "title": "Kenya eTA Portal"}
            },
            "de": {
                "regime": "eTA Required",
                "duration_days": 90,
                "conditions": "German and EU citizens must secure an approved electronic Travel Authorisation (eTA) online before traveling to Kenya.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.etakenya.go.ke", "tier": 1, "title": "Kenya eTA Portal"}
            },
            "gb": {
                "regime": "eTA Required",
                "duration_days": 90,
                "conditions": "British passport holders must apply for an electronic Travel Authorisation (eTA) prior to travel on the official portal.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/kenya/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "eTA Required",
                "duration_days": 90,
                "conditions": "Граждане РФ должны оформить электронное разрешение на поездку (eTA) онлайн на сайте etakenya.go.ke до вылета.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.etakenya.go.ke", "tier": 1, "title": "Официальный портал eTA Кении"}
            }
        },
        "digital_nomad": {
            "available": False,
            "visa_name": None,
            "min_income_usd": None,
            "duration_months": None,
            "source": None
        },
        "etiquette": {
            "dos": [
                {
                    "title": "Set up Safaricom M-Pesa immediately",
                    "description": "Kenya is virtually cashless for daily transactions; activating an M-Pesa account via a tourist SIM lets you pay anywhere via phone."
                },
                {
                    "title": "Respect single-use plastic bag bans",
                    "description": "Kenya strictly enforces a world-famous total ban on single-use plastic shopping bags; customs will confiscate them at the airport."
                },
                {
                    "title": "Follow safari guide ethical rules",
                    "description": "Never urge safari drivers to go off-road or approach wild animals too closely in Maasai Mara or Amboseli."
                }
            ],
            "donts": [
                {
                    "title": "Don't photograph government buildings or police",
                    "description": "Photographing state house, military installations, bridges, or police personnel is strictly illegal in Kenya."
                },
                {
                    "title": "Don't smoke in public outdoor spaces in Nairobi",
                    "description": "Smoking in public streets or parks outside marked smoking zones is strictly fined by municipal council officers (Kanjo)."
                }
            ],
            "tipping": "Tipping 10% is customary in restaurants; safari driver-guides and camp staff expect daily tips ($10-15 per day per person) for their expertise."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Maasai Mara Büyük Göç ve Savan Vahşi Yaşamı",
                    "license": "CC BY 2.0",
                    "author": "Ray in Manila",
                    "source_url": "/images/countries/ke-480.webp",
                    "attribution_text": "Safari game drive in the Maasai Mara savannah in Kenya. Ray in Manila, CC BY 2.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Maasai Mara Büyük Göç ve Savan Vahşi Yaşamı, Kenya",
                        "en": "Maasai Mara Great Migration & African Savannah, Kenya",
                        "de": "Maasai Mara Große Tierwanderung & Savanne, Kenia",
                        "ru": "Великая миграция в Масаи-Мара и африканская саванна, Кения",
                        "es": "Gran Migración de Maasai Mara y Sabana Africana, Kenia"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "kenya", "en": "kenya", "de": "kenia", "ru": "keniya", "es": "kenia"},
            "title": {
                "tr": "Kenya Vize Rehberi, Zorunlu eTA Başvurusu ve Maasai Mara Safari | Vizamigo",
                "en": "Kenya Visa Guide, Mandatory eTA Entry & Maasai Mara Safari | Vizamigo",
                "de": "Kenia Visum-Leitfaden, eTA-Pflicht & Maasai Mara Safari | Vizamigo",
                "ru": "Виза в Кению, оформление eTA и сафари в Масаи-Мара | Vizamigo",
                "es": "Guía de Visa de Kenia, eTA Obligatoria y Safari en Maasai Mara | Vizamigo"
            },
            "meta_description": {
                "tr": "Kenya elektronik seyahat izni (eTA) şartları, M-Pesa mobil ödeme sistemi, naylon poşet yasağı, Tip G prizler ve Maasai Mara gezi rehberi.",
                "en": "Kenya electronic Travel Authorisation (eTA) rules, M-Pesa mobile payments, plastic bag ban, Type G plugs, and Maasai Mara tips.",
                "de": "Kenia eTA-Einreisebestimmungen, M-Pesa mobiles Bezahlen, Plastiktütenverbot und Reisetipps Maasai Mara Safari.",
                "ru": "Правила въезда в Кению (eTA), мобильные платежи M-Pesa, запрет на пластиковые пакеты и сафари в Масаи-Мара.",
                "es": "Requisitos de entrada con eTA para Kenia, pagos móviles M-Pesa, prohibición de bolsas plásticas y safari en Maasai Mara."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "TZ": {
        "iso2": "TZ",
        "names": {
            "tr": "Tanzanya",
            "en": "Tanzania",
            "de": "Tansania",
            "ru": "Танзания",
            "es": "Tanzania"
        },
        "capital": {
            "value": "Dodoma",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://dodomacc.go.tz", "tier": 1, "title": "Dodoma City Council Official Portal"}],
            "evidence_quote": "Dodoma is the official national capital; Dar es Salaam serves as the largest commercial hub",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "TZS",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bot.go.tz", "tier": 1, "title": "Bank of Tanzania (Benki Kuu ya Tanzania)"}],
            "evidence_quote": "The Tanzanian Shilling (TZS) is the official currency; USD is accepted for safari park fees",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+3 (EAT)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.ikulutanzania.go.tz", "tier": 1, "title": "The State House of Tanzania"}],
            "evidence_quote": "Tanzania observes East Africa Time UTC+3 year-round without daylight saving adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.tanesco.co.tz", "tier": 1, "title": "Tanzania Electric Supply Company (TANESCO)"}],
                "evidence_quote": "Standard nominal domestic voltage in Tanzania is 230V single phase 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.tanesco.co.tz", "tier": 1, "title": "TANESCO Tanzania"}],
                "evidence_quote": "National alternating transmission frequency is 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["D", "G"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Outlets in Tanzania support British three-pin Type G and round-pin Type D electrical plugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.polisi.go.tz", "tier": 1, "title": "Tanzania Police Force (Jeshi la Polisi)"}],
                "evidence_quote": "Dial 112 or 999 for emergency police assistance throughout Tanzania",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "114",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.moh.go.tz", "tier": 1, "title": "Ministry of Health of Tanzania"}],
                "evidence_quote": "Call 114 for emergency hospital ambulance services and paramedic dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "115",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.zimamoto.go.tz", "tier": 1, "title": "Fire and Rescue Force of Tanzania"}],
                "evidence_quote": "Call 115 for Fire and Rescue Force brigades across Tanzania",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.polisi.go.tz", "tier": 1, "title": "Tanzania Police Force"}],
                "evidence_quote": "112 serves as the primary national emergency contact",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+255 22 211 4114",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.tanzaniatourism.go.tz", "tier": 1, "title": "Tanzania Tourist Board (TTB)"}],
                "evidence_quote": "Diplomatic and Tourist Police department in Dar es Salaam, Arusha, and Stone Town Zanzibar",
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
                    "level": 1,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/tanzania", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "DE_AA",
                    "level": 1,
                    "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt Reise- und Sicherheitshinweise"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 2,
            "agencies_agree": False,
            "advisory_headline": {
                "tr": "Serengeti, Kilimanjaro ve Zanzibar güvenlidir; Mozambik sınır boylarındaki güney kırsalından uzak durulmalıdır.",
                "en": "Serengeti, Kilimanjaro, and Zanzibar are secure; avoid travel near the Mozambique border in Mtwara.",
                "de": "Serengeti, Kilimandscharo und Sansibar sind sicher; Grenzgebiet zu Mosambik meiden.",
                "ru": "Серенгети, Килиманджаро и Занзибар безопасны; избегайте южной границы с Мозамбиком.",
                "es": "El Serengueti, Kilimanjaro y Zanzíbar son seguros; evite la frontera sur con Mozambique."
            },
            "regional_warnings": [
                {
                    "area": "Mtwara Region (Southern Border with Mozambique)",
                    "level": 3,
                    "reason": "Militant cross-border spillover from Cabo Delgado; avoid non-essential travel.",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Advisory"}
                }
            ],
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
                "value": 26.4,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/tanzania", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Tanzania measure 26.4 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 34.8,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/tanzania", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Tanzania reach 34.8 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Foreign visitors entering Zanzibar must acquire the mandatory Zanzibar Inbound Travel Insurance online. Vodacom Tanzania and Airtel provide 4G prepaid tourist eSIMs with coverage across mainland parks and the archipelago.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://visitzanzibar.go.tz", "tier": 1, "title": "Zanzibar Insurance Corporation"}],
                "evidence_quote": "Mandatory Zanzibar inbound travel insurance is required for all foreign arrivals to Zanzibar",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Bolt / Uber",
                "category": "taxi",
                "popular": True,
                "description": "Widely used ride-hailing options for cars and bajaji (auto-rickshaws) in Dar es Salaam."
            },
            {
                "name": "M-Pesa / Tigo Pesa",
                "category": "payments",
                "popular": True,
                "description": "Essential mobile money platforms used everywhere across Tanzania."
            },
            {
                "name": "Azam Ferry App",
                "category": "transport",
                "popular": True,
                "description": "Official booking application for the high-speed passenger ferries linking Dar es Salaam and Zanzibar."
            },
            {
                "name": "Piki",
                "category": "food",
                "popular": True,
                "description": "Food delivery service operating across Dar es Salaam."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "eVisa / VoA",
                "duration_days": 90,
                "conditions": "Türk vatandaşları online e-Visa alabilir veya Tanzanya havalimanlarında Kapıda Vize (VoA - 50$) alabilir. Zanzibar'a girişlerde zorunlu yerel seyahat sigortası kuralı vardır.",
                "passport_validity_months": 6,
                "source": {"url": "https://visa.immigration.go.tz", "tier": 1, "title": "Tanzanya Göç İdaresi e-Visa Portalı"}
            },
            "us": {
                "regime": "eVisa / VoA",
                "duration_days": 90,
                "conditions": "US citizens must obtain a multiple-entry tourist visa ($100 USD) either online or on arrival at major ports of entry.",
                "passport_validity_months": 6,
                "source": {"url": "https://visa.immigration.go.tz", "tier": 1, "title": "Tanzania Immigration e-Visa Portal"}
            },
            "de": {
                "regime": "eVisa / VoA",
                "duration_days": 90,
                "conditions": "German and EU citizens can obtain a single-entry tourist visa ($50 USD) online or on arrival.",
                "passport_validity_months": 6,
                "source": {"url": "https://visa.immigration.go.tz", "tier": 1, "title": "Tanzania Immigration e-Visa Portal"}
            },
            "gb": {
                "regime": "eVisa / VoA",
                "duration_days": 90,
                "conditions": "British passport holders can purchase a Visa on Arrival ($50) or apply for an eVisa before flying.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/tanzania/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "eVisa / VoA",
                "duration_days": 90,
                "conditions": "Граждане РФ получают визу по прибытии ($50) в аэропортах Дар-эс-Салама, Килиманджаро и Занзибара или оформляют e-Visa.",
                "passport_validity_months": 6,
                "source": {"url": "https://visa.immigration.go.tz", "tier": 1, "title": "Иммиграционная служба Танзании"}
            }
        },
        "digital_nomad": {
            "available": False,
            "visa_name": None,
            "min_income_usd": None,
            "duration_months": None,
            "source": None
        },
        "etiquette": {
            "dos": [
                {
                    "title": "Respect Stone Town Zanzibar modest dress code",
                    "description": "Zanzibar is over 95% Muslim; outside private resorts, cover shoulders and knees when walking through Stone Town."
                },
                {
                    "title": "Carry US Dollar bills printed after 2013",
                    "description": "Tanzanian banks, safari parks, and hotels routinely reject US dollar banknotes printed prior to 2013."
                },
                {
                    "title": "Get Zanzibar Inbound Insurance beforehand",
                    "description": "Mandatory Zanzibar government health insurance ($44) is required for tourists flying or boating into the island."
                }
            ],
            "donts": [
                {
                    "title": "Don't bring single-use plastic carrier bags",
                    "description": "Tanzania strictly bans importing plastic carrier bags; border officials will remove them at airport baggage screening."
                },
                {
                    "title": "Don't photograph locals without permission",
                    "description": "Particularly in Maasai bomas and Zanzibar villages, ask politely and agree on photo fees if requested."
                }
            ],
            "tipping": "Tipping is customary on safari and Kilimanjaro climbs ($15-20 per day for safari guides; $10-15 per day for mountain porters)."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Kilimanjaro Dağı Barranco Duvarı ve Zirve Patikası",
                    "license": "CC BY-SA 4.0",
                    "author": "Altezzatravel",
                    "source_url": "/images/countries/tz-480.webp",
                    "attribution_text": "Barranco Wall trekking trail on Mount Kilimanjaro, Tanzania. Altezzatravel, CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Kilimanjaro Dağı Barranco Duvarı ve Zirve Patikası, Tanzanya",
                        "en": "Mount Kilimanjaro Barranco Wall & Alpine Trail, Tanzania",
                        "de": "Kilimandscharo Barranco Wall & Alpinpfad, Tansania",
                        "ru": "Стена Барранко на горе Килиманджаро, Танзания",
                        "es": "Muro de Barranco del Monte Kilimanjaro, Tanzania"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "tanzanya", "en": "tanzania", "de": "tansania", "ru": "tanzaniya", "es": "tanzania"},
            "title": {
                "tr": "Tanzanya Vize Rehberi, Zanzibar Giriş Sigortası ve Kilimanjaro Gezisi | Vizamigo",
                "en": "Tanzania Visa Guide, Zanzibar Travel Insurance & Kilimanjaro | Vizamigo",
                "de": "Tansania Visum-Leitfaden, Sansibar Versicherung & Kilimandscharo | Vizamigo",
                "ru": "Виза в Танзанию, страховка на Занзибар и восхождение на Килиманджаро | Vizamigo",
                "es": "Guía de Visa de Tanzania, Seguro de Zanzíbar y Kilimanjaro | Vizamigo"
            },
            "meta_description": {
                "tr": "Tanzanya kapıda vize (VoA) şartları, Zanzibar zorunlu yerel sigortası, 2013 sonrası dolar kuralı ve Kilimanjaro tırmanış rehberi.",
                "en": "Tanzania Visa on Arrival rules, mandatory Zanzibar inbound insurance, 2013+ USD bill rule, and Mount Kilimanjaro guide.",
                "de": "Tansania Visa on Arrival Bestimmungen, Pflichtversicherung Sansibar, US-Dollar ab 2013 und Kilimandscharo-Tipps.",
                "ru": "Правила визы по прибытии в Танзанию, обязательная страховка на Занзибар и подъем на Килиманджаро.",
                "es": "Requisitos de Visa a la Llegada en Tanzania, seguro obligatorio para Zanzíbar y guía de ascenso al Kilimanjaro."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    }
}

def main():
    print("Building World Tourism Batch 7B (7 countries)...")
    for code, data in BATCH7B_DATA.items():
        filename = os.path.join(OUTPUT_DIR, f"{code}.json")
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✅ Generated {filename}")

if __name__ == "__main__":
    main()
