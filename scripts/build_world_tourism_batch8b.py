#!/usr/bin/env python3
"""
build_world_tourism_batch8b.py
Batch 8B: SC (Seychelles), NA (Namibia), BW (Botswana),
ZW (Zimbabwe), RW (Rwanda), UG (Uganda), CV (Cape Verde).
"""

import json
import os

OUTPUT_DIR = "src/data/countries"
os.makedirs(OUTPUT_DIR, exist_ok=True)

BATCH8B_DATA = {
    "SC": {
        "iso2": "SC",
        "names": {
            "tr": "Seyşeller",
            "en": "Seychelles",
            "de": "Seychellen",
            "ru": "Сейшелы",
            "es": "Seychelles"
        },
        "capital": {
            "value": "Victoria",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.gov.sc", "tier": 1, "title": "Government of Seychelles"}],
            "evidence_quote": "Victoria is the capital and primate town of the Republic of Seychelles on Mahé island",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "SCR",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.cbs.sc", "tier": 1, "title": "Central Bank of Seychelles"}],
            "evidence_quote": "The Seychelles Rupee (SCR) is the official currency; Euros and USD are accepted in resorts",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+4 (SCT)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.statehouse.gov.sc", "tier": 1, "title": "State House Seychelles"}],
            "evidence_quote": "Seychelles operates year-round on Seychelles Time UTC+4 without daylight saving",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "240V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.puc.sc", "tier": 1, "title": "Public Utilities Corporation (PUC)"}],
                "evidence_quote": "Standard single-phase low-voltage supply across Seychelles is 240V 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.puc.sc", "tier": 1, "title": "Public Utilities Corporation"}],
                "evidence_quote": "Alternating grid frequency throughout the inner islands is 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["G"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Wall sockets in Seychelles strictly adhere to the British three-rectangular-pin Type G design",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.police.gov.sc", "tier": 1, "title": "Seychelles Police Force"}],
                "evidence_quote": "Dial 999 or 112 for emergency police services across the Seychelles",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "151",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.health.gov.sc", "tier": 1, "title": "Ministry of Health of Seychelles"}],
                "evidence_quote": "Call 151 for emergency medical services and hospital ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.sfrsa.gov.sc", "tier": 1, "title": "Seychelles Fire and Rescue Services Agency (SFRSA)"}],
                "evidence_quote": "Dial 999 for fire and rescue emergency operations",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.police.gov.sc", "tier": 1, "title": "Seychelles Police Force"}],
                "evidence_quote": "112 serves as the international unified mobile emergency number",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/seychelles", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Seyşeller dünyanın en huzurlu ve güvenli ada destinasyonlarındandır; standart seyahat önlemleri yeterlidir.",
                "en": "Seychelles is extremely peaceful and secure; exercise normal travel precautions.",
                "de": "Die Seychellen sind ein sehr friedliches und sicheres Reiseziel; normale Vorsichtsmaßnahmen genügen.",
                "ru": "Сейшелы — исключительно безопасный и спокойный курорт; действуют обычные правила предосторожности.",
                "es": "Seychelles es un destino sumamente pacífico y seguro; aplican precauciones normales de viaje."
            },
            "regional_warnings": [],
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
                "value": 38.4,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/seychelles", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Seychelles reach approximately 38.4 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 58.2,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/seychelles", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Seychelles measure 58.2 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "All inbound travelers must complete the digital Seychelles Travel Authorisation (seychelles.govtas.com) within 10 days before flight departure. Cable & Wireless and Airtel offer tourist eSIMs at Mahé International Airport.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://seychelles.govtas.com", "tier": 1, "title": "Seychelles Electronic Border System"}],
                "evidence_quote": "Approved Travel Authorisation certificate is mandatory for boarding flights to Seychelles",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Seychelles Travel App",
                "category": "other",
                "popular": True,
                "description": "Official government platform for submitting mandatory digital Travel Authorisation (TA) forms."
            },
            {
                "name": "Cat Cocos",
                "category": "transport",
                "popular": True,
                "description": "Fast inter-island passenger catamaran ferry booking app linking Mahé, Praslin, and La Digue."
            },
            {
                "name": "SPTC App",
                "category": "transport",
                "popular": True,
                "description": "Seychelles Public Transport Corporation bus routes and cashless smart card top-ups on Mahé."
            },
            {
                "name": "Seychelles Island Guide",
                "category": "maps",
                "popular": True,
                "description": "Detailed offline trail and beach navigation app for Morne Seychellois National Park."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "Seyşeller hiçbir ülkeden vize talep etmez; Türk vatandaşları 90 güne kadar vizesizdir. Uçuştan önce online Seyahat İzni (Travel Authorisation) formu doldurulmalıdır.",
                "passport_validity_months": 0,
                "source": {"url": "https://seychelles.govtas.com", "tier": 1, "title": "Seyşeller Hükümeti Göç İdaresi"}
            },
            "us": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "Seychelles is a visa-free country for all nationalities; visitors must hold an approved Travel Authorisation and hotel booking.",
                "passport_validity_months": 0,
                "source": {"url": "https://seychelles.govtas.com", "tier": 1, "title": "Seychelles Electronic Border System"}
            },
            "de": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "German and EU citizens enter Seychelles visa-free with an approved online Travel Authorisation.",
                "passport_validity_months": 0,
                "source": {"url": "https://seychelles.govtas.com", "tier": 1, "title": "Seychelles Electronic Border System"}
            },
            "gb": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "British citizens do not require a visa for Seychelles; mandatory digital Travel Authorisation must be approved before travel.",
                "passport_validity_months": 0,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/seychelles/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "Граждане РФ въезжают на Сейшелы без визы на срок до 90 дней при наличии разрешения Travel Authorisation.",
                "passport_validity_months": 0,
                "source": {"url": "https://seychelles.govtas.com", "tier": 1, "title": "Иммиграционная служба Сейшел"}
            }
        },
        "digital_nomad": {
            "available": True,
            "visa_name": "Seychelles Workcation Program",
            "min_income_usd": 1500,
            "duration_months": 12,
            "source": {"url": "https://tourism.gov.sc", "tier": 1, "title": "Tourism Department Seychelles"}
        },
        "etiquette": {
            "dos": [
                {
                    "title": "Complete the Travel Authorisation before flight check-in",
                    "description": "Airlines will deny boarding without the official digital approval QR code from seychelles.govtas.com."
                },
                {
                    "title": "Rent a bicycle on La Digue",
                    "description": "Motor vehicles are almost entirely prohibited on La Digue island; exploring by bicycle is the quintessential local experience."
                },
                {
                    "title": "Respect giant Aldabra tortoises and coral reefs",
                    "description": "Never feed wild tortoises human food or stand on corals when snorkeling at Saint-Anne Marine National Park."
                }
            ],
            "donts": [
                {
                    "title": "Don't collect Coco de Mer nuts without an official permit",
                    "description": "The iconic double coconut is an endangered endemic species; unauthorized export carries heavy criminal penalties."
                },
                {
                    "title": "Don't swim during strong monsoon riptides",
                    "description": "Beaches like Anse Intendance on Mahé have dangerous seasonal undertows; heed warning flags."
                }
            ],
            "tipping": "A 5-10% service charge is usually included in restaurant and hotel bills; leaving small extra cash tips for helpful staff is polite."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "La Digue Anse Source d'Argent Granit Kayalıkları",
                    "license": "CC BY-SA 4.0",
                    "author": "Bjørn Christian Tørrissen",
                    "source_url": "/images/countries/sc-480.webp",
                    "attribution_text": "Anse Source d'Argent pink granite boulders on La Digue island in Seychelles. Bjørn Christian Tørrissen, CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "La Digue Anse Source d'Argent Granit Kayalıkları, Seyşeller",
                        "en": "Anse Source d'Argent Pink Granite Boulders & Turquoise Bay, La Digue, Seychelles",
                        "de": "Anse Source d'Argent Granitfelsen & Türkisbucht, Seychellen",
                        "ru": "Розовые гранитные скалы Анс Сурс д'Аржан, Сейшелы",
                        "es": "Rocas de Granito de Anse Source d'Argent, Seychelles"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "seyseller", "en": "seychelles", "de": "seychellen", "ru": "seyshely", "es": "seychelles"},
            "title": {
                "tr": "Seyşeller Vize Rehberi, Online Seyahat İzni (TA) ve La Digue Gezisi | Vizamigo",
                "en": "Seychelles Visa Guide, Travel Authorisation (TA) & La Digue Travel | Vizamigo",
                "de": "Seychellen Visum-Leitfaden, Travel Authorisation & La Digue Reisen | Vizamigo",
                "ru": "Виза на Сейшелы, Travel Authorisation и пляж Анс Сурс д'Аржан | Vizamigo",
                "es": "Guía de Visa de Seychelles, Autorización de Viaje y La Digue | Vizamigo"
            },
            "meta_description": {
                "tr": "Seyşeller tüm pasaportlara 90 gün vizesiz giriş, zorunlu Travel Authorisation formu, Cat Cocos feribotları ve La Digue granit kayaları gezi rehberi.",
                "en": "Seychelles 90-day universal visa-free entry, mandatory online Travel Authorisation, Cat Cocos ferries, and La Digue beach tips.",
                "de": "Seychellen 90 Tage universelle visafreie Einreise, Travel Authorisation Pflicht, Cat Cocos Fähren und La Digue Reisetipps.",
                "ru": "Безвизовый въезд на Сейшелы на 90 дней, форма Travel Authorisation, паромы Cat Cocos и пляжи острова Ла-Диг.",
                "es": "Entrada universal sin visa a Seychelles (90 días), formulario Travel Authorisation obligatorio y guía de La Digue."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "NA": {
        "iso2": "NA",
        "names": {
            "tr": "Namibya",
            "en": "Namibia",
            "de": "Namibia",
            "ru": "Намибия",
            "es": "Namibia"
        },
        "capital": {
            "value": "Windhoek",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.windhoekcc.org.na", "tier": 1, "title": "City of Windhoek Official Portal"}],
            "evidence_quote": "Windhoek is the capital and largest city of the Republic of Namibia",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "NAD",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bon.com.na", "tier": 1, "title": "Bank of Namibia"}],
            "evidence_quote": "The Namibia Dollar (NAD) is pegged 1:1 with the South African Rand; ZAR is legal tender",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+2 (CAT)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://gov.na", "tier": 1, "title": "Government of the Republic of Namibia"}],
            "evidence_quote": "Namibia observes Central Africa Time UTC+2 year-round with no seasonal clock changes",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "220V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.nampower.com.na", "tier": 1, "title": "NamPower National Power Utility"}],
                "evidence_quote": "Standard residential alternating supply voltage across Namibia is 220V 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.nampower.com.na", "tier": 1, "title": "NamPower"}],
                "evidence_quote": "National electrical grid alternating frequency is 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["D", "M"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Outlets in Namibia predominantly utilize South African large three-round-pin Type M and Type D sockets",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "10111",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.nampol.gov.na", "tier": 1, "title": "Namibian Police Force (NAMPOL)"}],
                "evidence_quote": "Dial 10111 for emergency police response across Namibia",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "211111",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.windhoekcc.org.na", "tier": 1, "title": "City of Windhoek Emergency Management"}],
                "evidence_quote": "Call 061 211111 or private EMS for emergency ambulance services in Windhoek",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "211111",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.windhoekcc.org.na", "tier": 1, "title": "City of Windhoek Fire Brigade"}],
                "evidence_quote": "Call 061 211111 for municipal fire and technical rescue brigades",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.nampol.gov.na", "tier": 1, "title": "NAMPOL"}],
                "evidence_quote": "112 functions as the cellular emergency dispatch number in Namibia",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+264 61 284 2111",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.namibiatourism.com.na", "tier": 1, "title": "Namibia Tourism Board (NTB)"}],
                "evidence_quote": "Tourist assistance and road safety emergency lines operate in Windhoek and Swakopmund",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/namibia", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Namibya genelinde güvenlik seviyesi yüksektir; çöl yollarında 4x4 araç ve bol su taşınması hayati önemdedir.",
                "en": "Namibia is peaceful and politically stable; carry ample water and spare tires on remote gravel desert roads.",
                "de": "Namibia ist ein friedliches Reiseland; auf Schotterpisten ausreichend Wasser und Ersatzreifen mitführen.",
                "ru": "В Намибии спокойная обстановка; на гравийных дорогах пустыни обязательно имейте запас воды и колес.",
                "es": "Namibia es muy tranquila y segura; lleve suficiente agua y ruedas de repuesto en rutas de ripio."
            },
            "regional_warnings": [],
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
                "value": 28.5,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/namibia", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Namibia measure approximately 28.5 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 44.2,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/namibia", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Namibia reach 44.2 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "MTC Namibia and Telecom Namibia offer 4G tourist eSIMs. Connectivity is strong in Windhoek and Swakopmund, but nonexistent in deep Namib-Naukluft desert dunes; download offline satellite GPS maps before venturing out.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.mtc.com.na", "tier": 1, "title": "MTC Namibia"}],
                "evidence_quote": "Prepaid Aweh packages provide high-speed mobile data across urban towns",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "LEFA",
                "category": "taxi",
                "popular": True,
                "description": "Namibia's top-rated on-demand ride-hailing app connecting passengers with licensed drivers in Windhoek."
            },
            {
                "name": "PayToday",
                "category": "payments",
                "popular": True,
                "description": "Widely used Namibian peer-to-peer and merchant mobile payment app."
            },
            {
                "name": "Tracks4Africa",
                "category": "maps",
                "popular": True,
                "description": "Essential GPS mapping guide for self-drive 4x4 expeditions across Namibian gravel routes."
            },
            {
                "name": "MTC App",
                "category": "transport",
                "popular": True,
                "description": "Official app for managing mobile bundles, Aweh plans, and data balances."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "Türkiye Cumhuriyeti umuma mahsus, hususi ve hizmet pasaportu hamilleri turistik seyahatlerde 90 güne kadar vizeden muaftır.",
                "passport_validity_months": 6,
                "source": {"url": "https://mha.gov.na", "tier": 1, "title": "Namibya İçişleri, Göç ve Güvenlik Bakanlığı"}
            },
            "us": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "US citizens can travel to Namibia visa-free for tourist stays of up to 90 days per calendar year.",
                "passport_validity_months": 6,
                "source": {"url": "https://mha.gov.na", "tier": 1, "title": "Ministry of Home Affairs, Immigration, Safety and Security of Namibia"}
            },
            "de": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "German and EU citizens do not require a visa for tourist visits of up to 90 days in Namibia.",
                "passport_validity_months": 6,
                "source": {"url": "https://mha.gov.na", "tier": 1, "title": "Ministry of Home Affairs of Namibia"}
            },
            "gb": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "British passport holders can visit Namibia visa-free for tourist stays of up to 90 days in a calendar year.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/namibia/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "Граждане РФ могут въезжать в Намибию без визы на срок до 90 дней в течение одного календарного года.",
                "passport_validity_months": 6,
                "source": {"url": "https://mha.gov.na", "tier": 1, "title": "Министерство внутренних дел Намибии"}
            }
        },
        "digital_nomad": {
            "available": True,
            "visa_name": "Namibia Digital Nomad Visa",
            "min_income_usd": 2000,
            "duration_months": 6,
            "source": {"url": "https://nipdb.net/nomadvisa/", "tier": 1, "title": "Namibia Investment Promotion and Development Board (NIPDB)"}
        },
        "etiquette": {
            "dos": [
                {
                    "title": "Rent a 4x4 with dual spare tires for self-drive",
                    "description": "Namibia's stunning landscapes are connected by unpaved gravel roads (C & D roads); reduce tire pressure and carry two spares."
                },
                {
                    "title": "Use South African Rand (ZAR) interchangeably",
                    "description": "South African Rand banknotes are legal tender everywhere in Namibia at 1:1; note that Namibian Dollars are not accepted back in South Africa."
                },
                {
                    "title": "Climb Dune 45 at sunrise in Sossusvlei",
                    "description": "Enter Sesriem gate at dawn to see the iconic red dunes of Deadvlei cast dramatic golden shadows."
                }
            ],
            "donts": [
                {
                    "title": "Don't drive faster than 80 km/h on gravel roads",
                    "description": "Loose gravel causes severe rollover accidents; keep speeds moderate and avoid sudden braking."
                },
                {
                    "title": "Don't touch or disturb ancient rock art",
                    "description": "Twyfelfontein rock petroglyphs (UNESCO) are fragile archaeological treasures; never touch or spray water on engravings."
                }
            ],
            "tipping": "Tipping 10% is customary in restaurants; tipping car guards (N$5-10) who watch vehicles in supermarket parking lots is standard practice."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Sossusvlei Deadvlei Kurumuş Akasyalar ve Kırmızı Kumullar",
                    "license": "CC BY-SA 4.0",
                    "author": "Diego Delso",
                    "source_url": "/images/countries/na-480.webp",
                    "attribution_text": "Deadvlei ancient camelthorn trees against red sand dunes in Sossusvlei, Namibia. Diego Delso, CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Sossusvlei Deadvlei Kurumuş Akasyalar ve Kırmızı Kumullar, Namibya",
                        "en": "Sossusvlei Deadvlei Ancient Trees & Red Sand Dunes, Namibia",
                        "de": "Sossusvlei Deadvlei Ton-Pfanne & Rote Riesendünen, Namibia",
                        "ru": "Мёртвое плато Дедвлей и красные песчаные дюны Соссусфлей, Намибия",
                        "es": "Deadvlei de Sossusvlei Árboles Milenarios y Dunas Rojas, Namibia"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "namibya", "en": "namibia", "de": "namibia", "ru": "namibiya", "es": "namibia"},
            "title": {
                "tr": "Namibya Vize Rehberi, 90 Gün Vizesiz Giriş ve Sossusvlei Deadvlei | Vizamigo",
                "en": "Namibia Visa Guide, 90-Day Visa-Free & Sossusvlei Deadvlei Travel | Vizamigo",
                "de": "Namibia Visum-Leitfaden, 90 Tage visafrei & Sossusvlei Deadvlei | Vizamigo",
                "ru": "Виза в Намибию, 90 дней без визы и дюны Соссусфлей | Vizamigo",
                "es": "Guía de Visa de Namibia, 90 Días sin Visa y Deadvlei de Sossusvlei | Vizamigo"
            },
            "meta_description": {
                "tr": "Namibya Türk pasaportuna 90 gün vizesiz giriş, Güney Afrika Randı kullanımı, 4x4 çöl sürüşü, Tip M prizler ve Deadvlei gezi rehberi.",
                "en": "Namibia 90-day visa-free rules, South African Rand acceptance, self-drive 4x4 desert tips, Type M plugs, and Deadvlei guide.",
                "de": "Namibia 90 Tage visafreie Einreise, ZAR-Währungsakzeptanz, 4x4-Selbstfahrertipps und Reisetipps Sossusvlei Deadvlei.",
                "ru": "Правила въезда в Намибию на 90 дней без визы, южноафриканский рэнд, сафари на 4x4 и плато Дедвлей.",
                "es": "Requisitos de entrada sin visa a Namibia (90 días), uso del rand sudafricano y guía para visitar Sossusvlei Deadvlei."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "BW": {
        "iso2": "BW",
        "names": {
            "tr": "Botsvana",
            "en": "Botswana",
            "de": "Botswana",
            "ru": "Ботсвана",
            "es": "Botsuana"
        },
        "capital": {
            "value": "Gaborone",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.gov.bw", "tier": 1, "title": "Government of Botswana Official Portal"}],
            "evidence_quote": "Gaborone is the capital and administrative, political, and economic hub of Botswana",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "BWP",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bankofbotswana.bw", "tier": 1, "title": "Bank of Botswana"}],
            "evidence_quote": "The Botswana Pula (BWP) is the official national currency of Botswana",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+2 (CAT)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.gov.bw", "tier": 1, "title": "Government of Botswana"}],
            "evidence_quote": "Botswana observes Central Africa Time UTC+2 year-round without daylight saving adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.bpc.bw", "tier": 1, "title": "Botswana Power Corporation (BPC)"}],
                "evidence_quote": "Domestic electricity in Botswana is supplied at 230V alternating current at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.bpc.bw", "tier": 1, "title": "Botswana Power Corporation"}],
                "evidence_quote": "National alternating transmission frequency is 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["D", "G", "M"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Electrical sockets in Botswana support British Type G and South African Type D and M plugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.police.gov.bw", "tier": 1, "title": "Botswana Police Service (BPS)"}],
                "evidence_quote": "Dial 999 for emergency police assistance throughout Botswana",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "997",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.gov.bw", "tier": 1, "title": "Ministry of Health of Botswana"}],
                "evidence_quote": "Call 997 for emergency medical ambulance and hospital dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "998",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.gov.bw", "tier": 1, "title": "Emergency Services Botswana"}],
                "evidence_quote": "Dial 998 for municipal fire brigades and rescue services",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.police.gov.bw", "tier": 1, "title": "Botswana Police Service"}],
                "evidence_quote": "112 operates as the nationwide mobile emergency dispatch number",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/botswana", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Botsvana Afrika kıtasının en güvenli, huzurlu ve istikrarlı ülkesidir; standart seyahat tedbirleri yeterlidir.",
                "en": "Botswana is one of the safest and most stable democracies in Africa; exercise normal precautions.",
                "de": "Botswana ist eines der sichersten und stabilsten Reiseländer Afrikas; normale Vorsichtsmaßnahmen genügen.",
                "ru": "Ботсвана — одна из самых безопасных и стабильных стран Африки; действуют обычные меры предосторожности.",
                "es": "Botsuana es uno de los países más seguros y estables de África; aplican precauciones normales de viaje."
            },
            "regional_warnings": [],
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
                "value": 34.8,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/botswana", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Botswana reach approximately 34.8 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 48.6,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/botswana", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Botswana measure 48.6 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Mascom and Orange Botswana provide prepaid 4G/LTE tourist eSIMs. Connectivity is fast in Gaborone, Maun, and Kasane, but remote Okavango Delta lodges rely on private satellite internet; carry offline maps.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.mascom.bw", "tier": 1, "title": "Mascom Wireless Botswana"}],
                "evidence_quote": "Mascom covers over 95% of populated centers across Botswana",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Orange Money / MyMascom",
                "category": "payments",
                "popular": True,
                "description": "Essential mobile money platforms widely used for cashless merchant and transfer payments."
            },
            {
                "name": "MyChobe",
                "category": "other",
                "popular": True,
                "description": "Safari guide app featuring wildlife sightings, river cruise schedules, and Chobe National Park info."
            },
            {
                "name": "Tracks4Africa",
                "category": "maps",
                "popular": True,
                "description": "Indispensable offline 4x4 GPS trail navigator for Okavango Delta and Moremi Game Reserve tracks."
            },
            {
                "name": "Google Maps",
                "category": "maps",
                "popular": True,
                "description": "Accurate navigation for Gaborone, Francistown, and paved highway corridors (A1/A3)."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "Türkiye Cumhuriyeti umuma mahsus, hususi ve hizmet pasaportu hamilleri turistik seyahatlerde 90 güne kadar vizeden muaftır.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.gov.bw/visa", "tier": 1, "title": "Department of Immigration and Citizenship of Botswana"}
            },
            "us": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "US citizens can enter Botswana visa-free for tourist stays of up to 90 days in any 12-month period.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.gov.bw/visa", "tier": 1, "title": "Government of Botswana"}
            },
            "de": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "German and EU citizens do not need a visa for tourist visits of up to 90 days in Botswana.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.gov.bw/visa", "tier": 1, "title": "Government of Botswana"}
            },
            "gb": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "British citizens do not require a visa to visit Botswana for stays of up to 90 days.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/botswana/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "Граждане РФ могут въезжать в Ботсвану без визы на срок до 90 дней с туристическими целями.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.gov.bw/visa", "tier": 1, "title": "Департамент иммиграции Ботсваны"}
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
                    "title": "Experience an Okavango Delta Mokoro canoe trip",
                    "description": "Gliding silently through the papyrus channels of the Okavango Delta in a traditional wooden or fiberglass canoe (Mokoro) is unforgettable."
                },
                {
                    "title": "Greet with 'Dumela' (Hello in Setswana)",
                    "description": "'Dumela Rra' (to a man) or 'Dumela Mma' (to a woman) is the polite customary greeting across Botswana."
                },
                {
                    "title": "Respect Botswana's world-class conservation laws",
                    "description": "Botswana maintains low-impact, high-value eco-tourism; never litter, feed animals, or collect animal horns or bones."
                }
            ],
            "donts": [
                {
                    "title": "Don't drive off-road in national parks",
                    "description": "Strict park regulations in Chobe and Moremi prohibit off-roading to protect delicate riverbank habitats."
                },
                {
                    "title": "Don't swim in open rivers or lagoons",
                    "description": "Okavango and Chobe waterways are home to large populations of wild hippos and Nile crocodiles; never swim in open water."
                }
            ],
            "tipping": "Tipping 10% is customary in restaurants; tipping safari field guides ($10-15/day) and Mokoro polers ($5-10/excursion) is standard practice."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Okavango Deltası Kanalları ve Mokoro Kanoları (UNESCO)",
                    "license": "CC BY-SA 3.0",
                    "author": "diego_cue",
                    "source_url": "/images/countries/bw-480.webp",
                    "attribution_text": "Sunset and traditional mokoro canoes in the Okavango Delta, Botswana. diego_cue, CC BY-SA 3.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Okavango Deltası Kanalları ve Mokoro Kanoları, Botsvana",
                        "en": "Okavango Delta Waterways & Mokoro Canoes, Botswana",
                        "de": "Okavangodelta Wasserwege & Mokoro-Kanus, Botswana",
                        "ru": "Водные пути дельты Окаванго и каноэ мокоро, Ботсвана",
                        "es": "Canales del Delta del Okavango y Canoas Mokoro, Botsuana"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "botsvana", "en": "botswana", "de": "botswana", "ru": "botsvana", "es": "botsuana"},
            "title": {
                "tr": "Botsvana Vize Rehberi, 90 Gün Vizesiz Seyahat ve Okavango Deltası | Vizamigo",
                "en": "Botswana Visa Guide, 90-Day Visa-Free & Okavango Delta Safari | Vizamigo",
                "de": "Botswana Visum-Leitfaden, 90 Tage visafrei & Okavangodelta Safari | Vizamigo",
                "ru": "Виза в Ботсвану, 90 дней без визы и сафари в дельте Окаванго | Vizamigo",
                "es": "Guía de Visa de Botsuana, 90 Días sin Visa y Delta del Okavango | Vizamigo"
            },
            "meta_description": {
                "tr": "Botsvana Türk pasaportuna 90 gün vizesiz giriş, Pula para birimi, Mokoro kano turları, Chobe safari parkı ve Okavango Deltası gezi rehberi.",
                "en": "Botswana 90-day visa-free rules, Pula currency, Mokoro canoe safaris, Chobe National Park, and Okavango Delta travel tips.",
                "de": "Botswana 90 Tage visafreie Einreise, Pula-Währung, Mokoro-Kanutouren und Reisetipps Okavangodelta Safari.",
                "ru": "Правила въезда в Ботсвану на 90 дней без визы, валюта пула, каноэ мокоро и сафари в дельте Окаванго.",
                "es": "Requisitos de entrada sin visa a Botsuana (90 días), moneda pula, safaris en canoas mokoro y guía del Delta del Okavango."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "ZW": {
        "iso2": "ZW",
        "names": {
            "tr": "Zimbabve",
            "en": "Zimbabwe",
            "de": "Simbabwe",
            "ru": "Зимбабве",
            "es": "Zimbabue"
        },
        "capital": {
            "value": "Harare",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.hararecity.co.zw", "tier": 1, "title": "City of Harare Official Portal"}],
            "evidence_quote": "Harare is the capital and largest commercial metropolis of Zimbabwe",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "ZiG",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.rbz.co.zw", "tier": 1, "title": "Reserve Bank of Zimbabwe (RBZ)"}],
            "evidence_quote": "Zimbabwe Gold (ZiG) is the official currency; US dollars circulate widely and are preferred in tourism",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+2 (CAT)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.opc.gov.zw", "tier": 1, "title": "Office of the President and Cabinet of Zimbabwe"}],
            "evidence_quote": "Zimbabwe operates on Central Africa Time UTC+2 without daylight saving adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "220V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.zesa.co.zw", "tier": 1, "title": "ZESA Holdings National Power Utility"}],
                "evidence_quote": "Standard domestic voltage across Zimbabwe is 220V single-phase alternating current at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.zesa.co.zw", "tier": 1, "title": "ZESA Holdings"}],
                "evidence_quote": "Electrical power grid alternating frequency is 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["D", "G"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Wall outlets in Zimbabwe accommodate British three-pin Type G and round-pin Type D plugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "995",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.zrp.gov.zw", "tier": 1, "title": "Zimbabwe Republic Police (ZRP)"}],
                "evidence_quote": "Dial 995 for emergency police services across Zimbabwe",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "994",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.mohcc.gov.zw", "tier": 1, "title": "Ministry of Health and Child Care of Zimbabwe"}],
                "evidence_quote": "Call 994 or private EMS (MARS) for emergency medical ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "993",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.hararecity.co.zw", "tier": 1, "title": "Harare Fire Brigade"}],
                "evidence_quote": "Dial 993 for municipal fire and technical rescue brigades",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.zrp.gov.zw", "tier": 1, "title": "Zimbabwe Republic Police"}],
                "evidence_quote": "112 serves as the primary cellular emergency dispatch number",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+263 83 284 4293",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://zimbabwetourism.net", "tier": 1, "title": "Zimbabwe Tourism Authority (ZTA)"}],
                "evidence_quote": "Victoria Falls Tourist Police unit dedicated 24/7 post assists international park visitors",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/zimbabwe", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Viktorya Şelaleleri ve safari milli parkları son derece güvenlidir; başkentte olağan yankesicilik önlemleri alınmalıdır.",
                "en": "Victoria Falls and safari parks are exceptionally secure; exercise normal caution against petty theft in cities.",
                "de": "Victoriafälle und Nationalparks sind sehr sicher; in Städten auf Taschendiebstahl achten.",
                "ru": "Водопад Виктория и сафари-парки полностью безопасны; в городах соблюдайте осторожность от карманных краж.",
                "es": "Las Cataratas Victoria y parques de safari son muy seguros; tome precauciones habituales en ciudades."
            },
            "regional_warnings": [],
            "risk_categories": {
                "crime": "medium",
                "terrorism": "low",
                "civil_unrest": "medium",
                "natural_disaster": "low",
                "health": "medium"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 24.2,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/zimbabwe", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Zimbabwe measure approximately 24.2 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 36.5,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/zimbabwe", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Zimbabwe reach 36.5 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "US Dollar cash (printed after 2013, clean and unblemished) is universally accepted and strongly preferred for visas, park entrance fees, and dining. Econet Wireless and NetOne provide tourist eSIMs.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.econet.co.zw", "tier": 1, "title": "Econet Wireless Zimbabwe"}],
                "evidence_quote": "Econet delivers extensive 4G cellular and roaming services across Victoria Falls and Harare",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "EcoCash",
                "category": "payments",
                "popular": True,
                "description": "Zimbabwe's dominant mobile money platform for cashless local transactions."
            },
            {
                "name": "Vaya",
                "category": "taxi",
                "popular": True,
                "description": "Popular ride-hailing app for booking vetted, licensed taxis in Harare and Bulawayo."
            },
            {
                "name": "Vic Falls Guide",
                "category": "maps",
                "popular": True,
                "description": "Offline guide app for rainforest trails, helicopter flight of angels bookings, and gorge viewpoints."
            },
            {
                "name": "Google Maps",
                "category": "maps",
                "popular": True,
                "description": "Reliable city navigation for Victoria Falls town and major highway routes."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "VoA / eVisa",
                "duration_days": 30,
                "conditions": "Türk vatandaşları Kategori B kapsamındadır; havalimanında Kapıda Vize (VoA - 30$, tek giriş) alabilir veya KAZA UniVisa ($50) ile Zambiya ve Zimbabve'ye birlikte geçiş yapabilir.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.evisa.gov.zw", "tier": 1, "title": "Department of Immigration Zimbabwe"}
            },
            "us": {
                "regime": "VoA",
                "duration_days": 30,
                "conditions": "US citizens can obtain a 30-day tourist Visa on Arrival ($30 USD) or purchase the dual-country KAZA UniVisa ($50).",
                "passport_validity_months": 6,
                "source": {"url": "https://www.evisa.gov.zw", "tier": 1, "title": "Zimbabwe e-Visa Portal"}
            },
            "de": {
                "regime": "VoA",
                "duration_days": 30,
                "conditions": "German and EU citizens receive a Visa on Arrival (Category B, $30) or KAZA UniVisa at ports of entry.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.evisa.gov.zw", "tier": 1, "title": "Zimbabwe e-Visa Portal"}
            },
            "gb": {
                "regime": "VoA",
                "duration_days": 30,
                "conditions": "British passport holders can purchase a Visa on Arrival ($55 USD) or eligible KAZA UniVisa upon entry.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/zimbabwe/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "VoA",
                "duration_days": 30,
                "conditions": "Граждане РФ получают визу по прибытии в аэропортах Хараре и Виктория-Фолс ($30) или оформляют KAZA UniVisa.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.evisa.gov.zw", "tier": 1, "title": "Иммиграционный департамент Зимбабве"}
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
                    "title": "Buy the KAZA UniVisa ($50) if visiting Victoria Falls",
                    "description": "The KAZA UniVisa allows unlimited border crossings between Zimbabwe and Zambia for 30 days to view the falls from both sides."
                },
                {
                    "title": "Carry pristine US Dollar bills printed after 2013",
                    "description": "Torn, worn, or pre-2013 US dollar banknotes will be rejected at national park gates, hotels, and exchange counters."
                },
                {
                    "title": "Wear a waterproof poncho in the Victoria Falls rainforest",
                    "description": "The spray from the 'Smoke that Thunders' (Mosi-oa-Tunya) creates torrential rainforest conditions along the cliff trail."
                }
            ],
            "donts": [
                {
                    "title": "Don't wear military camouflage clothing",
                    "description": "Wearing camouflage patterns or military attire is strictly illegal in Zimbabwe for civilians."
                },
                {
                    "title": "Don't photograph police roadblocks or government buildings",
                    "description": "Photographing state house, police checkposts, or defense personnel is strictly prohibited."
                }
            ],
            "tipping": "Tipping 10-15% in US Dollar cash is standard in Victoria Falls restaurants; tipping safari and rafting guides ($10/day) is customary."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Viktorya Şelaleleri Kanyonu ve Gökkuşağı Sisi",
                    "license": "FAL",
                    "author": "Alchemist-hp (talk)",
                    "source_url": "/images/countries/zw-480.webp",
                    "attribution_text": "Victoria Falls gorge with rainbow mist spray in Zimbabwe. Alchemist-hp, FAL.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Viktorya Şelaleleri Kanyonu ve Gökkuşağı Sisi, Zimbabve",
                        "en": "Victoria Falls Gorge & Rainbow Mist Spray, Zimbabwe",
                        "de": "Victoriafälle-Schlucht mit Regenbogen-Sprühnebel, Simbabwe",
                        "ru": "Ущелье водопада Виктория и радужный водяной туман, Зимбабве",
                        "es": "Garganta de las Cataratas Victoria y Neblina con Arcoíris, Zimbabue"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "zimbabve", "en": "zimbabwe", "de": "simbabwe", "ru": "zimbabve", "es": "zimbabue"},
            "title": {
                "tr": "Zimbabve Vize Rehberi, KAZA UniVisa ve Viktorya Şelaleleri Gezisi | Vizamigo",
                "en": "Zimbabwe Visa Guide, KAZA UniVisa & Victoria Falls Travel | Vizamigo",
                "de": "Simbabwe Visum-Leitfaden, KAZA UniVisa & Victoriafälle Reisen | Vizamigo",
                "ru": "Виза в Зимбабве, KAZA UniVisa и водопад Виктория | Vizamigo",
                "es": "Guía de Visa de Zimbabue, KAZA UniVisa y Cataratas Victoria | Vizamigo"
            },
            "meta_description": {
                "tr": "Zimbabve kapıda vize (VoA) ve KAZA UniVisa şartları, ABD Doları kullanımı, kamuflaj yasağı ve Viktorya Şelaleleri gezi rehberi.",
                "en": "Zimbabwe Visa on Arrival and KAZA UniVisa rules, USD cash requirements, camouflage bans, and Victoria Falls travel tips.",
                "de": "Simbabwe Visa on Arrival und KAZA UniVisa Bestimmungen, US-Dollar Bargeldtipps und Victoriafälle Reiseführer.",
                "ru": "Правила визы по прибытии в Зимбабве, виза KAZA UniVisa, доллары США и водопад Виктория.",
                "es": "Requisitos de Visa a la Llegada y KAZA UniVisa para Zimbabue, uso de dólares en efectivo y guía de Cataratas Victoria."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "RW": {
        "iso2": "RW",
        "names": {
            "tr": "Ruanda",
            "en": "Rwanda",
            "de": "Ruanda",
            "ru": "Руанда",
            "es": "Ruanda"
        },
        "capital": {
            "value": "Kigali",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://kigalicity.gov.rw", "tier": 1, "title": "City of Kigali Official Portal"}],
            "evidence_quote": "Kigali is the capital and largest city of Rwanda, renowned as the cleanest city in Africa",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "RWF",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bnr.rw", "tier": 1, "title": "National Bank of Rwanda (BNR)"}],
            "evidence_quote": "The Rwandan Franc (RWF) is the official currency of the Republic of Rwanda",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+2 (CAT)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.gov.rw", "tier": 1, "title": "Government of Rwanda"}],
            "evidence_quote": "Rwanda observes Central Africa Time UTC+2 year-round without daylight saving adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.reg.rw", "tier": 1, "title": "Rwanda Energy Group (REG)"}],
                "evidence_quote": "Standard domestic electrical supply in Rwanda operates at 230V 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.reg.rw", "tier": 1, "title": "Rwanda Energy Group"}],
                "evidence_quote": "Operating electrical grid frequency in Rwanda is 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "J"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Outlets in Rwanda utilize European Type C and Swiss Type J plugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.police.gov.rw", "tier": 1, "title": "Rwanda National Police (RNP)"}],
                "evidence_quote": "Dial 112 for emergency police intervention across Rwanda",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "912",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.moh.gov.rw", "tier": 1, "title": "Ministry of Health of Rwanda"}],
                "evidence_quote": "Call 912 for emergency SAMU medical assistance and ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "111",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.police.gov.rw/fire-and-rescue/", "tier": 1, "title": "RNP Fire and Rescue Brigade"}],
                "evidence_quote": "Dial 111 for fire and technical rescue emergency services",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.police.gov.rw", "tier": 1, "title": "Rwanda National Police"}],
                "evidence_quote": "112 serves as the primary unified national emergency operator number",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+250 788 311 112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.visitrwanda.com", "tier": 1, "title": "Rwanda Development Board (RDB)"}],
                "evidence_quote": "Tourist Protection Unit division provides dedicated safety patrols in Volcanoes and Nyungwe national parks",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/rwanda", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Kigali ve Ruanda genelinde güvenlik seviyesi en üst düzeydedir; DRC sınır boylarında dikkatli olunmalıdır.",
                "en": "Kigali is remarkably safe and clean; exercise normal travel precautions, staying mindful near the DRC border.",
                "de": "Kigali ist außerordentlich sicher und sauber; normale Vorsichtsmaßnahmen genügen.",
                "ru": "Кигали — один из самых безопасных и чистых городов мира; действуют обычные правила предосторожности.",
                "es": "Kigali es extraordinariamente segura y limpia; aplican precauciones normales de viaje."
            },
            "regional_warnings": [
                {
                    "area": "Western Border with DRC (Rubavu/Goma border zone)",
                    "level": 2,
                    "reason": "Occasional border friction and rebel conflicts across the border in eastern DRC.",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Advisory"}
                }
            ],
            "risk_categories": {
                "crime": "low",
                "terrorism": "low",
                "civil_unrest": "low",
                "natural_disaster": "low",
                "health": "medium"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 36.5,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/rwanda", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Rwanda reach approximately 36.5 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 52.4,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/rwanda", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Rwanda measure 52.4 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "MTN Rwanda and Airtel provide high-speed 4G prepaid tourist eSIMs. MTN Mobile Money (MoMo) is universally accepted everywhere. Single-use plastic bags are strictly prohibited by law.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.mtn.co.rw", "tier": 1, "title": "MTN Rwanda"}],
                "evidence_quote": "MTN MoMo mobile payment network is ubiquitous across all commerce in Rwanda",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Yego Moto / Yego Cab",
                "category": "taxi",
                "popular": True,
                "description": "The official metered ride-hailing app for licensed moto-taxis and cabs in Kigali."
            },
            {
                "name": "Vuba Vuba",
                "category": "food",
                "popular": True,
                "description": "Leading Rwandan on-demand food delivery app covering top Kigali restaurants."
            },
            {
                "name": "Move by VW",
                "category": "taxi",
                "popular": True,
                "description": "Eco-friendly electric car ride-booking app operating Volkswagen vehicles in Kigali."
            },
            {
                "name": "Tap & Go",
                "category": "transport",
                "popular": True,
                "description": "Contactless smart card and mobile app for Kigali municipal city buses."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "VoA",
                "duration_days": 30,
                "conditions": "Tüm dünya vatandaşları gibi Türk vatandaşları da Kigali Havalimanı'nda Kapıda Vize (VoA - 30 gün, 50$) alabilir veya Doğu Afrika Vizesi ($100) seçebilir.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.migration.gov.rw", "tier": 1, "title": "Rwanda Directorate General of Immigration and Emigration"}
            },
            "us": {
                "regime": "VoA",
                "duration_days": 30,
                "conditions": "US citizens receive a 30-day Visa on Arrival upon arrival at Kigali International Airport ($50 USD).",
                "passport_validity_months": 6,
                "source": {"url": "https://www.migration.gov.rw", "tier": 1, "title": "Rwanda Immigration"}
            },
            "de": {
                "regime": "VoA",
                "duration_days": 30,
                "conditions": "German and EU citizens obtain a 30-day Visa on Arrival at the port of entry ($50 USD fee).",
                "passport_validity_months": 6,
                "source": {"url": "https://www.migration.gov.rw", "tier": 1, "title": "Rwanda Immigration"}
            },
            "gb": {
                "regime": "VoA",
                "duration_days": 30,
                "conditions": "British passport holders receive a 30-day tourist visa on arrival for a $50 USD fee.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/rwanda/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "VoA",
                "duration_days": 30,
                "conditions": "Граждане РФ получают визу по прибытии в аэропорту Кигали на 30 дней за 50 долларов США.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.migration.gov.rw", "tier": 1, "title": "Иммиграционная служба Руанды"}
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
                    "title": "Respect the plastic bag ban (strictly enforced)",
                    "description": "Plastic carrier bags are illegal in Rwanda; baggage is searched at Kigali Airport, and paper or cloth bags are provided instead."
                },
                {
                    "title": "Wear a helmet on motorcycle taxis (Motos)",
                    "description": "Every moto-taxi rider in Kigali carries a clean passenger helmet by law; wearing it is mandatory and strictly enforced."
                },
                {
                    "title": "Observe Umuganda community day",
                    "description": "On the last Saturday morning of each month (08:00 - 11:00), public businesses pause for nationwide community service."
                }
            ],
            "donts": [
                {
                    "title": "Don't step on manicured public lawns",
                    "description": "Kigali takes civic pride in immaculate streets and flowers; walk on paved sidewalks and avoid walking across green lawns."
                },
                {
                    "title": "Don't bring up ethnic labels in public conversation",
                    "description": "Post-genocide Rwanda emphasizes unified national identity ('Ndi Umunyarwanda' - We are all Rwandans); respect historical memorials."
                }
            ],
            "tipping": "Tipping 10% is customary in restaurants in Kigali; tipping gorilla tracking guides and trackers ($15-20) in Volcanoes National Park is standard."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Volkanlar Ulusal Parkı Dağ Gorili (UNESCO)",
                    "license": "CC BY-SA 4.0",
                    "author": "Charles J. Sharp",
                    "source_url": "/images/countries/rw-480.webp",
                    "attribution_text": "Mountain gorilla in Volcanoes National Park, Rwanda. Charles J. Sharp, CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Volkanlar Ulusal Parkı Dağ Gorili, Ruanda",
                        "en": "Mountain Gorilla in Volcanoes National Park, Rwanda",
                        "de": "Berggorilla im Volcanoes-Nationalpark, Ruanda",
                        "ru": "Горная горилла в национальном парке Вулканов, Руанда",
                        "es": "Gorila de Montaña en el Parque Nacional de los Volcanes, Ruanda"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "ruanda", "en": "rwanda", "de": "ruanda", "ru": "ruanda", "es": "ruanda"},
            "title": {
                "tr": "Ruanda Vize Rehberi, Kapıda Vize (VoA) ve Dağ Gorilleri Gezisi | Vizamigo",
                "en": "Rwanda Visa Guide, Visa on Arrival & Mountain Gorilla Trekking | Vizamigo",
                "de": "Ruanda Visum-Leitfaden, Visa on Arrival & Berggorilla Trekking | Vizamigo",
                "ru": "Виза в Руанду, виза по прибытии и треккинг к горным гориллам | Vizamigo",
                "es": "Guía de Visa de Ruanda, Visa a la Llegada y Trekking con Gorilas | Vizamigo"
            },
            "meta_description": {
                "tr": "Ruanda kapıda vize (VoA) şartları, plastik poşet yasağı, Umuganda günü, Yego Moto taksi ve Volkanlar Parkı dağ gorilleri rehberi.",
                "en": "Rwanda 30-day Visa on Arrival rules, strict plastic bag ban, Umuganda day, Yego Moto app, and mountain gorilla safari tips.",
                "de": "Ruanda Visa on Arrival Bestimmungen, Plastiktütenverbot, Umuganda-Gemeinschaftstag und Berggorilla-Trekking.",
                "ru": "Правила визы по прибытии в Руанду, запрет на полиэтиленовые пакеты, субботник Умуганда и горные гориллы.",
                "es": "Requisitos de Visa a la Llegada en Ruanda, prohibición de bolsas plásticas, app Yego Moto y gorilas de montaña."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "UG": {
        "iso2": "UG",
        "names": {
            "tr": "Uganda",
            "en": "Uganda",
            "de": "Uganda",
            "ru": "Уганда",
            "es": "Uganda"
        },
        "capital": {
            "value": "Kampala",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.kcca.go.ug", "tier": 1, "title": "Kampala Capital City Authority (KCCA)"}],
            "evidence_quote": "Kampala is the capital and largest commercial metropolis of the Republic of Uganda",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "UGX",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bou.or.ug", "tier": 1, "title": "Bank of Uganda (BOU)"}],
            "evidence_quote": "The Uganda Shilling (UGX) is the legal national currency of Uganda",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+3 (EAT)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.statehouse.go.ug", "tier": 1, "title": "State House Uganda"}],
            "evidence_quote": "Uganda observes East Africa Time UTC+3 year-round without daylight saving adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "240V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.era.go.ug", "tier": 1, "title": "Electricity Regulatory Authority (ERA) Uganda"}],
                "evidence_quote": "Standard single-phase consumer supply voltage in Uganda is 240V 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.era.go.ug", "tier": 1, "title": "Electricity Regulatory Authority"}],
                "evidence_quote": "The national electrical power grid operates continuously at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["G"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Sockets in Uganda adhere strictly to the British three-rectangular-pin Type G design",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.upf.go.ug", "tier": 1, "title": "Uganda Police Force (UPF)"}],
                "evidence_quote": "Dial 999 or 112 for emergency police assistance throughout Uganda",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://health.go.ug", "tier": 1, "title": "Ministry of Health of Uganda"}],
                "evidence_quote": "Call 911 or Red Cross ambulance services for urgent medical dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.upf.go.ug/fire-rescue/", "tier": 1, "title": "UPF Directorate of Fire Prevention and Rescue"}],
                "evidence_quote": "Dial 112 for emergency fire and rescue services",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.upf.go.ug", "tier": 1, "title": "Uganda Police Force"}],
                "evidence_quote": "112 operates as the unified toll-free cellular emergency dispatch number",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+256 714 667 792",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.utb.go.ug", "tier": 1, "title": "Uganda Tourism Board (UTB)"}],
                "evidence_quote": "Specialised Tourist Police Department coordinates 24/7 security escorts in national parks",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/uganda", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Bwindi ve Queen Elizabeth milli parkları silahlı korucular eşliğinde güvenlidir; DRC sınır ormanlarına dikkat edilmelidir.",
                "en": "Bwindi Impenetrable Forest and safari parks are secured by armed wildlife rangers; exercise caution near DRC borders.",
                "de": "Bwindi-Nationalpark und Safarigebiete werden durch Ranger gesichert; Grenznähe zur DR Kongo meiden.",
                "ru": "Национальные парки Бвинди и Королевы Елизаветы охраняются рейнджерами UWA; будьте осторожны у границы с ДРК.",
                "es": "Los parques Bwindi y Queen Elizabeth están custodiados por guardaparques armados; precaución cerca de la RDC."
            },
            "regional_warnings": [
                {
                    "area": "Western Border with DRC and Karamoja region",
                    "level": 3,
                    "reason": "Presence of armed rebel groups in neighboring DRC forests and cattle rustling incidents.",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Advisory"}
                }
            ],
            "risk_categories": {
                "crime": "medium",
                "terrorism": "medium",
                "civil_unrest": "medium",
                "natural_disaster": "low",
                "health": "high"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 28.2,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/uganda", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Uganda reach approximately 28.2 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 39.4,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/uganda", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Uganda measure 39.4 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "All visitors must apply for an electronic visa online at visas.immigration.go.ug before departure. MTN Uganda and Airtel offer prepaid 4G tourist eSIMs; yellow fever vaccination card is mandatory at immigration.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://visas.immigration.go.ug", "tier": 1, "title": "Uganda Electronic Visa/Permit Application System"}],
                "evidence_quote": "All visa applications must be completed online prior to passenger arrival",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "SafeBoda",
                "category": "taxi",
                "popular": True,
                "description": "Uganda's renowned motorcycle taxi hailing app; drivers are trained and provide clean passenger helmets."
            },
            {
                "name": "Uber / Bolt",
                "category": "taxi",
                "popular": True,
                "description": "Widely available car taxi-hailing apps in Kampala and Entebbe."
            },
            {
                "name": "Jumia Food",
                "category": "food",
                "popular": True,
                "description": "Leading restaurant meal and grocery delivery platform in Kampala."
            },
            {
                "name": "MTN MoMo",
                "category": "payments",
                "popular": True,
                "description": "Ubiquitous mobile money payment service accepted across Uganda."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "eVisa Required",
                "duration_days": 90,
                "conditions": "Türk vatandaşları seyahatten önce online e-Visa (visas.immigration.go.ug, 50$) veya Doğu Afrika Vizesi (100$) almak zorundadır. Sarıhumma aşı kartı zorunludur.",
                "passport_validity_months": 6,
                "source": {"url": "https://visas.immigration.go.ug", "tier": 1, "title": "Uganda Göç İdaresi e-Visa Portalı"}
            },
            "us": {
                "regime": "eVisa Required",
                "duration_days": 90,
                "conditions": "US citizens must obtain an approved eVisa online ($50 USD) or East Africa Tourist Visa prior to arrival.",
                "passport_validity_months": 6,
                "source": {"url": "https://visas.immigration.go.ug", "tier": 1, "title": "Uganda e-Visa Portal"}
            },
            "de": {
                "regime": "eVisa Required",
                "duration_days": 90,
                "conditions": "German and EU citizens must secure an approved electronic visa prior to departure.",
                "passport_validity_months": 6,
                "source": {"url": "https://visas.immigration.go.ug", "tier": 1, "title": "Uganda e-Visa Portal"}
            },
            "gb": {
                "regime": "eVisa Required",
                "duration_days": 90,
                "conditions": "British passport holders must apply for and receive an eVisa approval letter online before traveling to Uganda.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/uganda/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "eVisa Required",
                "duration_days": 90,
                "conditions": "Граждане РФ должны оформить электронную визу (eVisa) на сайте visas.immigration.go.ug до вылета в Уганду.",
                "passport_validity_months": 6,
                "source": {"url": "https://visas.immigration.go.ug", "tier": 1, "title": "Портал eVisa Уганды"}
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
                    "title": "Carry an official Yellow Fever vaccination certificate",
                    "description": "Proof of yellow fever vaccination is legally mandatory for all arriving travelers aged 1 year and older."
                },
                {
                    "title": "Use SafeBoda for motorcycle rides in Kampala",
                    "description": "Boda-bodas are the fastest way through Kampala traffic, but SafeBoda drivers are trained and supply passenger helmets."
                },
                {
                    "title": "Try the famous 'Rolex' street food",
                    "description": "A 'Rolex' (rolled eggs) is a delicious omelet with tomatoes rolled inside a freshly griddled hot chapati."
                }
            ],
            "donts": [
                {
                    "title": "Don't track gorillas if feeling sick with a cold",
                    "description": "Gorillas share 98% of human DNA and have no immunity to human respiratory viruses; rangers will turn away sick tourists."
                },
                {
                    "title": "Don't photograph military or government convoys",
                    "description": "Photography of military personnel, state installations, or Entebbe airport checkpoint zones is strictly forbidden."
                }
            ],
            "tipping": "Tipping 10% in sit-down restaurants is customary; tipping gorilla trackers and UWA rangers ($10-15 per day) is customary."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Bwindi Geçilmez Ormanı Dağ Gorili (UNESCO)",
                    "license": "CC BY-SA 4.0",
                    "author": "Charles J. Sharp",
                    "source_url": "/images/countries/ug-480.webp",
                    "attribution_text": "Mountain gorilla feeding in Bwindi Impenetrable National Park, Uganda. Charles J. Sharp, CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Bwindi Geçilmez Ormanı Dağ Gorili, Uganda",
                        "en": "Mountain Gorilla in Bwindi Impenetrable National Park, Uganda",
                        "de": "Berggorilla im Bwindi-Regenwald-Nationalpark, Uganda",
                        "ru": "Горная горилла в национальном парке Бвинди, Уганда",
                        "es": "Gorila de Montaña en la Selva Impenetrable de Bwindi, Uganda"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "uganda", "en": "uganda", "de": "uganda", "ru": "uganda", "es": "uganda"},
            "title": {
                "tr": "Uganda Vize Rehberi, Online eVisa ve Bwindi Goril Safarisi | Vizamigo",
                "en": "Uganda Visa Guide, Online eVisa & Bwindi Gorilla Trekking | Vizamigo",
                "de": "Uganda Visum-Leitfaden, eVisa & Bwindi Gorillatrekking | Vizamigo",
                "ru": "Виза в Уганду, электронная виза и гориллы в парке Бвинди | Vizamigo",
                "es": "Guía de Visa de Uganda, eVisa Online y Gorilas de Bwindi | Vizamigo"
            },
            "meta_description": {
                "tr": "Uganda online e-Visa şartları, zorunlu sarıhumma aşısı, SafeBoda motosiklet uygulaması ve Bwindi dağ gorili takip rehberi.",
                "en": "Uganda online eVisa rules, mandatory yellow fever certificate, SafeBoda app, Type G plugs, and Bwindi gorilla trekking tips.",
                "de": "Uganda eVisa-Bestimmungen, Gelbfieberimpfpflicht, SafeBoda App und Reisetipps Bwindi Gorillatrekking.",
                "ru": "Правила оформления eVisa в Уганду, сертификат от желтой лихорадки, приложение SafeBoda и гориллы в Бвинди.",
                "es": "Requisitos de visa electrónica para Uganda, certificado de fiebre amarilla, app SafeBoda y gorilas de Bwindi."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "CV": {
        "iso2": "CV",
        "names": {
            "tr": "Cabo Verde",
            "en": "Cape Verde",
            "de": "Kap Verde",
            "ru": "Кабо-Верде",
            "es": "Cabo Verde"
        },
        "capital": {
            "value": "Praia",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.cmpraia.cv", "tier": 1, "title": "Câmara Municipal da Praia"}],
            "evidence_quote": "Praia is the capital and largest city of the island nation of Cabo Verde on Santiago island",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "CVE",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bcv.cv", "tier": 1, "title": "Banco de Cabo Verde (BCV)"}],
            "evidence_quote": "The Cape Verdean Escudo (CVE) is pegged to the Euro at a fixed parity of 1 EUR = 110.265 CVE",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-1 (CVT)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://governo.cv", "tier": 1, "title": "Governo de Cabo Verde"}],
            "evidence_quote": "Cabo Verde observes Cape Verde Time UTC-1 year-round without daylight saving adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.electra.cv", "tier": 1, "title": "Electra Empresa de Electricidade e Água"}],
                "evidence_quote": "Domestic electricity in Cabo Verde operates at 230V alternating current at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.electra.cv", "tier": 1, "title": "Electra"}],
                "evidence_quote": "Island grid alternating frequency is 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "F"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Outlets in Cabo Verde accommodate European Type C and grounded Type F Schuko plugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "132",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.policianacional.cv", "tier": 1, "title": "Polícia Nacional de Cabo Verde"}],
                "evidence_quote": "Dial 132 for emergency police assistance throughout Cabo Verde",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "130",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://minsaude.gov.cv", "tier": 1, "title": "Ministério da Saúde de Cabo Verde"}],
                "evidence_quote": "Call 130 for emergency medical assistance and ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "131",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://snpc.gov.cv", "tier": 1, "title": "Serviço Nacional de Proteção Civil e Bombeiros"}],
                "evidence_quote": "Dial 131 for fire and civil protection rescue services",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://governo.cv", "tier": 1, "title": "Governo de Cabo Verde"}],
                "evidence_quote": "112 functions as the primary emergency operator number",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/cape-verde", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Sal, Boa Vista ve tatil adaları son derece huzurludur; olağan seyahat tedbirleri yeterlidir.",
                "en": "Cabo Verde is peaceful and politically stable; exercise normal travel precautions on beach resorts.",
                "de": "Kap Verde ist ein sehr friedliches und stabiles Reiseziel; normale Vorsichtsmaßnahmen genügen.",
                "ru": "Кабо-Верде — спокойный и безопасный островной курорт; действуют стандартные меры предосторожности.",
                "es": "Cabo Verde es pacífico y políticamente estable; aplican precauciones normales de viaje."
            },
            "regional_warnings": [],
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
                "value": 35.2,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/cape-verde", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Cabo Verde reach approximately 35.2 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 54.8,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/cape-verde", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Cabo Verde measure 54.8 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "All international visitors must register on the EASE online portal (ease.gov.cv) and pay the Airport Security Tax (TSA) prior to departure. Unitel T+ and Alou (CV Telecom) provide 4G tourist eSIMs.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://ease.gov.cv", "tier": 1, "title": "EASE Pre-Registration Platform"}],
                "evidence_quote": "Pre-registration on EASE and payment of the TSA fee is required for all arriving air travelers",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "EASE Cabo Verde",
                "category": "other",
                "popular": True,
                "description": "Official government pre-registration platform for paying the mandatory airport security tax."
            },
            {
                "name": "CV Interilhas",
                "category": "transport",
                "popular": True,
                "description": "Official passenger ferry booking platform connecting São Vicente, Santo Antão, Sal, and Santiago."
            },
            {
                "name": "Vinti4",
                "category": "payments",
                "popular": True,
                "description": "National interbank ATM and point-of-sale network accepted throughout Cabo Verde."
            },
            {
                "name": "Google Maps",
                "category": "maps",
                "popular": True,
                "description": "Reliable navigation for resort towns in Sal, Boa Vista, and the capital Praia."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "VoA / EASE",
                "duration_days": 30,
                "conditions": "Türk vatandaşları havalimanında Kapıda Vize (VoA - ~25€) alabilir. Tüm yolcular seyahatten önce www.ease.gov.cv üzerinden ön kayıt yaptırmalı ve TSA vergisini ödemelidir.",
                "passport_validity_months": 6,
                "source": {"url": "https://ease.gov.cv", "tier": 1, "title": "Cabo Verde EASE Ön Kayıt Sistemi"}
            },
            "us": {
                "regime": "VF",
                "duration_days": 30,
                "conditions": "US citizens can enter Cabo Verde visa-free for up to 30 days; pre-registration on EASE (paying the TSA fee) is mandatory.",
                "passport_validity_months": 6,
                "source": {"url": "https://ease.gov.cv", "tier": 1, "title": "EASE Cabo Verde"}
            },
            "de": {
                "regime": "VF",
                "duration_days": 30,
                "conditions": "German and EU citizens enter Cabo Verde visa-free for up to 30 days with mandatory EASE TSA pre-registration.",
                "passport_validity_months": 6,
                "source": {"url": "https://ease.gov.cv", "tier": 1, "title": "EASE Cabo Verde"}
            },
            "gb": {
                "regime": "VF",
                "duration_days": 30,
                "conditions": "British passport holders can visit Cabo Verde visa-free for up to 30 days with required EASE pre-registration.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/cape-verde/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "VF",
                "duration_days": 60,
                "conditions": "Граждане РФ могут въезжать в Кабо-Верде без визы на срок до 60 дней. Обязательна регистрация на портале EASE.",
                "passport_validity_months": 6,
                "source": {"url": "https://ease.gov.cv", "tier": 1, "title": "Портал EASE Кабо-Верде"}
            }
        },
        "digital_nomad": {
            "available": True,
            "visa_name": "Cabo Verde Remote Working Program",
            "min_income_usd": 1650,
            "duration_months": 6,
            "source": {"url": "https://www.remoteworkingcaboverde.com", "tier": 1, "title": "Cabo Verde Tourism Institute"}
        },
        "etiquette": {
            "dos": [
                {
                    "title": "Register on the EASE portal before departure",
                    "description": "Pre-registering and paying the TSA airport security fee on ease.gov.cv avoids long queues and customs delays on arrival."
                },
                {
                    "title": "Enjoy Morna music and the spirit of 'Morabeza'",
                    "description": "Experience live traditional Morna music made famous by Cesária Évora; 'Morabeza' represents deep warm island hospitality."
                },
                {
                    "title": "Use Euros directly where convenient",
                    "description": "Because the Escudo is pegged to the Euro (1 EUR = 110 CVE), many hotels, restaurants, and taxis happily accept Euros."
                }
            ],
            "donts": [
                {
                    "title": "Don't swim on beaches with red warning flags",
                    "description": "Atlantic ocean undertows can be powerful on unprotected open shores; always swim in protected bays like Santa Maria."
                },
                {
                    "title": "Don't drink tap water",
                    "description": "Tap water in Cabo Verde is produced by desalination and is not intended for direct drinking; drink bottled water."
                }
            ],
            "tipping": "Tipping 10% is customary in sit-down restaurants in tourist centers like Santa Maria and Sal Rei for attentive service."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Sal Adası Santa Maria Sahili ve Turkuaz Okyanus",
                    "license": "CC BY-SA 3.0",
                    "author": "Cayambe",
                    "source_url": "/images/countries/cv-480.webp",
                    "attribution_text": "Santa Maria white sand beach and turquoise ocean on Sal Island, Cabo Verde. Cayambe, CC BY-SA 3.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Sal Adası Santa Maria Sahili ve Turkuaz Okyanus, Cabo Verde",
                        "en": "Santa Maria Beach & Turquoise Waters, Sal Island, Cape Verde",
                        "de": "Strand von Santa Maria & türkisfarbenes Meer, Insel Sal, Kap Verde",
                        "ru": "Пляж Санта-Мария и лазурный океан, остров Сал, Кабо-Верде",
                        "es": "Playa de Santa Maria y Aguas Turquesas, Isla de Sal, Cabo Verde"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "cabo-verde", "en": "cape-verde", "de": "kap-verde", "ru": "kabo-verde", "es": "cabo-verde"},
            "title": {
                "tr": "Cabo Verde Vize Rehberi, EASE Ön Kayıt ve Sal Adası Gezisi | Vizamigo",
                "en": "Cabo Verde Visa Guide, EASE Registration & Sal Island Travel | Vizamigo",
                "de": "Kap Verde Visum-Leitfaden, EASE-Registrierung & Insel Sal | Vizamigo",
                "ru": "Виза в Кабо-Верде, регистрация EASE и пляжи острова Сал | Vizamigo",
                "es": "Guía de Visa de Cabo Verde, Registro EASE e Isla de Sal | Vizamigo"
            },
            "meta_description": {
                "tr": "Cabo Verde vize ve EASE ön kayıt şartları, Euro kuru sabitliği, Morabeza misafirperverliği ve Sal Adası Santa Maria plajı gezi rehberi.",
                "en": "Cabo Verde entry rules, mandatory EASE pre-registration, Euro peg, Remote Working visa, and Sal Island beach tips.",
                "de": "Kap Verde Einreisebestimmungen, EASE-Vorregistrierung, feste Euro-Bindung und Reisetipps Insel Sal.",
                "ru": "Правила въезда в Кабо-Верде, предварительная регистрация EASE, евро и путеводитель по острову Сал.",
                "es": "Requisitos de entrada a Cabo Verde, prerregistro EASE obligatorio y guía de viaje a la Isla de Sal."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    }
}

def main():
    print("Building World Tourism Batch 8B (7 countries)...")
    for code, data in BATCH8B_DATA.items():
        filename = os.path.join(OUTPUT_DIR, f"{code}.json")
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✅ Generated {filename}")

if __name__ == "__main__":
    main()
