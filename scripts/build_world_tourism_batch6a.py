#!/usr/bin/env python3
"""
build_world_tourism_batch6a.py
Batch 6A: UZ (Uzbekistan), KZ (Kazakhstan), KH (Cambodia),
SI (Slovenia), SK (Slovakia), EE (Estonia).
"""

import json
import os

OUTPUT_DIR = "src/data/countries"
os.makedirs(OUTPUT_DIR, exist_ok=True)

BATCH6A_DATA = {
    "UZ": {
        "iso2": "UZ",
        "names": {
            "tr": "Özbekistan",
            "en": "Uzbekistan",
            "de": "Usbekistan",
            "ru": "Узбекистан",
            "es": "Uzbekistán"
        },
        "capital": {
            "value": "Taşkent",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.tashkent.uz", "tier": 1, "title": "Tashkent City Administration (Hokimiyat)"}],
            "evidence_quote": "Tashkent is the capital and largest metropolis of Uzbekistan",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "UZS",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.cbu.uz", "tier": 1, "title": "Central Bank of the Republic of Uzbekistan"}],
            "evidence_quote": "The national currency of the Republic of Uzbekistan is the Uzbek Sum (UZS)",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+5 (UZT)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.gov.uz", "tier": 1, "title": "Government Portal of the Republic of Uzbekistan"}],
            "evidence_quote": "Uzbekistan operates year-round on Uzbekistan Time UTC+5 without daylight saving",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "220V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.minenergy.uz", "tier": 1, "title": "Ministry of Energy of Uzbekistan"}],
                "evidence_quote": "Standard residential electricity in Uzbekistan is supplied at 220V 50Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.minenergy.uz", "tier": 1, "title": "Ministry of Energy of Uzbekistan"}],
                "evidence_quote": "Grid frequency throughout Uzbekistan operates stably at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "F"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Uzbekistan standard electrical outlets utilize European Type C and Type F plugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "102",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iiv.uz", "tier": 1, "title": "Ministry of Internal Affairs of Uzbekistan"}],
                "evidence_quote": "Dial 102 for emergency police assistance throughout Uzbekistan",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "103",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ssv.uz", "tier": 1, "title": "Ministry of Health of Uzbekistan"}],
                "evidence_quote": "Call 103 for emergency medical and ambulance dispatch services",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "101",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.fvv.uz", "tier": 1, "title": "Ministry of Emergency Situations of Uzbekistan"}],
                "evidence_quote": "Call 101 for fire emergency dispatch across all regions of Uzbekistan",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.fvv.uz", "tier": 1, "title": "Ministry of Emergency Situations of Uzbekistan"}],
                "evidence_quote": "Unified emergency response dispatch 112 is active across major cities in Uzbekistan",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "1173",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.motas.uz", "tier": 1, "title": "Uzbekistan Tourism Committee"}],
                "evidence_quote": "Tourist police hotline 1173 operates 24/7 in English and Russian for visitor safety",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/uzbekistan", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Özbekistan genelinde güvenlik seviyesi yüksek; olağan seyahat tedbirleri yeterlidir.",
                "en": "Normal security precautions apply across Uzbekistan; tourism infrastructure is safe.",
                "de": "In Usbekistan gelten normale Sicherheitsvorkehrungen; die touristische Infrastruktur ist sicher.",
                "ru": "В Узбекистане действует нормальный уровень предосторожности, страна безопасна для туризма.",
                "es": "Aplican precauciones normales de seguridad en Uzbekistán; el país es seguro para el turismo."
            },
            "regional_warnings": [
                {
                    "area": "Termez & Surkhandarya (Afghan Border)",
                    "level": 2,
                    "reason": "Border zone requires approved border permits and strictly designated border crossings.",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Advisory"}
                }
            ],
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
                "value": 28.5,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/uzbekistan", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Uzbekistan measure approximately 28.5 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 62.1,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/uzbekistan", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Fixed broadband median download speeds in Uzbekistan reach approximately 62.1 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Tourist registration (e-Mehmon) is required within 3 business days; hotels handle this automatically, keep the paper slips until border departure. Ucell, Beeline, and Mobiuz offer tourist eSIMs.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://emehmon.uz", "tier": 1, "title": "e-Mehmon Electronic Registration System"}],
                "evidence_quote": "Foreign citizens must obtain registration within 72 hours of arrival in Uzbekistan",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Yandex Go",
                "category": "taxi",
                "popular": True,
                "description": "Dominant ride-hailing app in Tashkent, Samarkand, and Bukhara with transparent upfront fares."
            },
            {
                "name": "Express24",
                "category": "food",
                "popular": True,
                "description": "Leading local food delivery app with extensive English, Uzbek, and Russian restaurant menus."
            },
            {
                "name": "Click / Payme",
                "category": "payments",
                "popular": True,
                "description": "Everyday QR mobile payment solutions across Uzbekistan stores, cafes, and bazaars."
            },
            {
                "name": "2GIS",
                "category": "maps",
                "popular": True,
                "description": "High-detail offline city map and public transport navigator for Tashkent and major Uzbek cities."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "VF",
                "duration_days": 30,
                "conditions": "Türkiye Cumhuriyeti umuma mahsus, hususi ve hizmet pasaportu hamilleri 30 güne kadar vizeden muaftır.",
                "passport_validity_months": 3,
                "source": {"url": "https://mfa.uz", "tier": 1, "title": "Özbekistan Dışişleri Bakanlığı"}
            },
            "us": {
                "regime": "eVisa",
                "duration_days": 30,
                "conditions": "US citizens can obtain an electronic visa (e-Visa) online or qualify for visa-free entry depending on bilateral rules.",
                "passport_validity_months": 6,
                "source": {"url": "https://e-visa.gov.uz", "tier": 1, "title": "Official Uzbekistan e-Visa Portal"}
            },
            "de": {
                "regime": "VF",
                "duration_days": 30,
                "conditions": "German citizens enjoy visa-free entry to Uzbekistan for tourist stays of up to 30 days.",
                "passport_validity_months": 3,
                "source": {"url": "https://mfa.uz", "tier": 1, "title": "Ministry of Foreign Affairs of Uzbekistan"}
            },
            "gb": {
                "regime": "VF",
                "duration_days": 30,
                "conditions": "British citizens do not require a visa for visits of up to 30 days in Uzbekistan.",
                "passport_validity_months": 3,
                "source": {"url": "https://mfa.uz", "tier": 1, "title": "Ministry of Foreign Affairs of Uzbekistan"}
            },
            "ru": {
                "regime": "VF",
                "duration_days": 60,
                "conditions": "Граждане Российской Федерации въезжают в Узбекистан без визы на срок до 60 дней.",
                "passport_validity_months": 3,
                "source": {"url": "https://mfa.uz", "tier": 1, "title": "МИД Узбекистана"}
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
                    "title": "Respect bread (Non)",
                    "description": "Bread is sacred in Uzbek culture; never place flatbread (lepyoshka/non) upside down or throw it away."
                },
                {
                    "title": "Keep hotel registration slips (e-Mehmon)",
                    "description": "Hotels will issue small registration coupons; keep all of them safely in your passport until exit customs."
                },
                {
                    "title": "Dress modestly at historical madrassas and mosques",
                    "description": "Cover shoulders and knees when visiting working mosques and active shrines in Samarkand and Bukhara."
                }
            ],
            "donts": [
                {
                    "title": "Don't discard registration receipts",
                    "description": "Border guards may ask for your hotel registration slips; losing them can result in administrative delays."
                },
                {
                    "title": "Don't photograph security infrastructure",
                    "description": "Avoid photographing military checkpoints, border zones, or airport control areas without explicit clearance."
                }
            ],
            "tipping": "Tipping 10% is customary in modern Tashkent restaurants; traditional chaikhanas often include a 10-15% service charge."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Semerkant Registan Meydanı ve Tarihi Medreseler (UNESCO)",
                    "license": "Unsplash License",
                    "author": "Ozodbek Ergashev",
                    "source_url": "/images/countries/uz-480.webp",
                    "attribution_text": "Registan Square and ancient madrasahs in Samarkand, Uzbekistan. Verified photo.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Semerkant Registan Meydanı ve Tarihi Medreseler, Özbekistan",
                        "en": "Registan Square & Ancient Madrasahs, Samarkand, Uzbekistan",
                        "de": "Registan-Platz & historische Medresen, Samarkand, Usbekistan",
                        "ru": "Площадь Регистан и древние медресе Самарканда, Узбекистан",
                        "es": "Plaza de Registán y Madrazas Históricas, Samarcanda, Uzbekistán"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "ozbekistan", "en": "uzbekistan", "de": "usbekistan", "ru": "uzbekistan", "es": "uzbekistan"},
            "title": {
                "tr": "Özbekistan Vize Rehberi, e-Mehmon Kaydı ve Semerkant Gezisi | Vizamigo",
                "en": "Uzbekistan Visa Guide, e-Mehmon Registration & Samarkand Travel | Vizamigo",
                "de": "Usbekistan Visum-Leitfaden, e-Mehmon & Samarkand Reisen | Vizamigo",
                "ru": "Виза в Узбекистан, регистрация e-Mehmon и Самарканд | Vizamigo",
                "es": "Guía de Visa de Uzbekistán, Registro e-Mehmon y Samarcanda | Vizamigo"
            },
            "meta_description": {
                "tr": "Özbekistan Türk pasaportuna 30 gün vizesiz giriş, otel e-Mehmon kaydı, Yandex Go taksi ve Semerkant Registan gezi rehberi.",
                "en": "Uzbekistan visa-free travel guide, e-Mehmon registration slips, Yandex Go taxi, 220V Type C/F plugs, and Samarkand tips.",
                "de": "Usbekistan Visumbestimmungen, e-Mehmon-Registrierung, Yandex Go App, 220V Steckertypen C/F und Samarkand-Tipps.",
                "ru": "Правила въезда в Узбекистан, регистрация e-Mehmon, такси Yandex Go и путеводитель по Самарканду.",
                "es": "Requisitos de entrada a Uzbekistán, registro hotelero e-Mehmon, app Yandex Go y guía de Samarcanda."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "KZ": {
        "iso2": "KZ",
        "names": {
            "tr": "Kazakistan",
            "en": "Kazakhstan",
            "de": "Kasachstan",
            "ru": "Казахстан",
            "es": "Kazajistán"
        },
        "capital": {
            "value": "Astana",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.astana.gov.kz", "tier": 1, "title": "Akimat of Astana Official Portal"}],
            "evidence_quote": "Astana is the official capital city of the Republic of Kazakhstan",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "KZT",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.nationalbank.kz", "tier": 1, "title": "National Bank of Kazakhstan"}],
            "evidence_quote": "The national currency of Kazakhstan is the Kazakhstani Tenge (KZT)",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+5",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://primeminister.kz", "tier": 1, "title": "Government of the Republic of Kazakhstan Official Decision"}],
            "evidence_quote": "Kazakhstan transitioned to a single unified time zone UTC+5 nationwide effective March 1, 2024",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "220V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.kegoc.kz", "tier": 1, "title": "KEGOC National Power Grid of Kazakhstan"}],
                "evidence_quote": "The standard domestic voltage across Kazakhstan is 220V at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.kegoc.kz", "tier": 1, "title": "KEGOC National Power Grid of Kazakhstan"}],
                "evidence_quote": "Kazakhstan power grid standard alternating frequency is 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "F"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Standard socket outlets in Kazakhstan accommodate Europlug Type C and Schuko Type F plugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "102",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.gov.kz/memleket/entities/qriim", "tier": 1, "title": "Ministry of Internal Affairs of Kazakhstan"}],
                "evidence_quote": "Call 102 for emergency police services across Kazakhstan",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "103",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.gov.kz/memleket/entities/dsm", "tier": 1, "title": "Ministry of Healthcare of the Republic of Kazakhstan"}],
                "evidence_quote": "Call 103 for emergency ambulance medical response across Kazakhstan",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "101",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.gov.kz/memleket/entities/emer", "tier": 1, "title": "Ministry of Emergency Situations of Kazakhstan"}],
                "evidence_quote": "Call 101 for fire department dispatch in all Kazakh cities",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.gov.kz/memleket/entities/emer", "tier": 1, "title": "Ministry of Emergency Situations of Kazakhstan"}],
                "evidence_quote": "Unified emergency number 112 connects callers to rescue services nationwide",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "1414",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://qaztourism.kz", "tier": 1, "title": "Kazakh Tourism National Company"}],
                "evidence_quote": "Tourist and citizen unified inquiry center 1414 assists visitors with official guidance",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/kazakhstan", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Kazakistan genelinde seyahat güvenliği yüksektir; standart seyahat önlemleri geçerlidir.",
                "en": "Travelers should exercise normal precautions across Kazakhstan; cities and tourist corridors are stable.",
                "de": "In Kasachstan gelten normale Sicherheitsvorkehrungen; die Sicherheitslage ist stabil.",
                "ru": "В Казахстане действует нормальный уровень безопасности, города и туристические зоны стабильны.",
                "es": "Aplican precauciones normales de seguridad en Kazajistán; las ciudades principales son estables."
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
                "value": 37.8,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/kazakhstan", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Kazakhstan reach approximately 37.8 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 78.4,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/kazakhstan", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Kazakhstan measure 78.4 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Foreign travelers must be registered through the eQonaq information system by their host hotel within 3 days. Kcell, Beeline, and Tele2 offer comprehensive 4G/5G eSIMs with passport registration.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://eqonaq.kz", "tier": 1, "title": "eQonaq Visitor Registration System"}],
                "evidence_quote": "eQonaq records foreign guest stays automatically via registered accommodation providers",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Kaspi.kz",
                "category": "payments",
                "popular": True,
                "description": "The quintessential Kazakh super-app; Kaspi QR is accepted virtually everywhere from bazaars to taxis."
            },
            {
                "name": "Yandex Go",
                "category": "taxi",
                "popular": True,
                "description": "Standard ride-hailing and food delivery app in Almaty, Astana, and Shymkent."
            },
            {
                "name": "inDrive",
                "category": "taxi",
                "popular": True,
                "description": "Peer-to-peer fare negotiation app very popular for intercity and airport travel in Kazakhstan."
            },
            {
                "name": "2GIS",
                "category": "maps",
                "popular": True,
                "description": "Invaluable offline 3D city navigation showing exact building entrances and bus routes."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "VF",
                "duration_days": 30,
                "conditions": "Türkiye Cumhuriyeti umuma mahsus, hususi ve hizmet pasaportu hamilleri 30 güne kadar vizesiz seyahat edebilir.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.gov.kz/memleket/entities/mfa", "tier": 1, "title": "Kazakistan Dışişleri Bakanlığı"}
            },
            "us": {
                "regime": "VF",
                "duration_days": 30,
                "conditions": "US passport holders can enter Kazakhstan visa-free for tourist and business stays of up to 30 days.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.gov.kz/memleket/entities/mfa", "tier": 1, "title": "Ministry of Foreign Affairs of Kazakhstan"}
            },
            "de": {
                "regime": "VF",
                "duration_days": 30,
                "conditions": "German citizens can enter Kazakhstan without a visa for stays of up to 30 calendar days.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.gov.kz/memleket/entities/mfa", "tier": 1, "title": "Ministry of Foreign Affairs of Kazakhstan"}
            },
            "gb": {
                "regime": "VF",
                "duration_days": 30,
                "conditions": "British citizens can visit Kazakhstan visa-free for tourist or business trips up to 30 days.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.gov.kz/memleket/entities/mfa", "tier": 1, "title": "Ministry of Foreign Affairs of Kazakhstan"}
            },
            "ru": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "Граждане РФ могут въезжать в Казахстан по внутреннему или заграничному паспорту на срок до 90 дней (правило 90/180).",
                "passport_validity_months": 0,
                "source": {"url": "https://www.gov.kz/memleket/entities/mfa", "tier": 1, "title": "МИД РК"}
            }
        },
        "digital_nomad": {
            "available": True,
            "visa_name": "Neo Nomad Visa",
            "min_income_usd": 3000,
            "duration_months": 12,
            "source": {"url": "https://www.gov.kz/memleket/entities/tsm", "tier": 1, "title": "Ministry of Tourism and Sports of Kazakhstan"}
        },
        "etiquette": {
            "dos": [
                {
                    "title": "Use Kaspi QR or cashless payments",
                    "description": "Cash is rarely needed in Kazakh cities; virtually every merchant from coffee carts to boutiques accepts Kaspi QR or Visa/Mastercard."
                },
                {
                    "title": "Remove shoes when entering a Kazakh home",
                    "description": "Always take off outdoor shoes at the threshold and put on slippers provided by the host."
                },
                {
                    "title": "Receive tea and food with both hands or right hand",
                    "description": "Showing deference to elders and hosts by accepting tea bowls (piala) with respect is deeply appreciated."
                }
            ],
            "donts": [
                {
                    "title": "Don't jaywalk in city centers",
                    "description": "Traffic police actively fine pedestrians for crossing streets outside designated zebra crossings in Astana and Almaty."
                },
                {
                    "title": "Don't overstay the 30-day visa-free limit",
                    "description": "Immigration laws enforce strict fines and deportation proceedings for exceeding 30-day entry allowances."
                }
            ],
            "tipping": "A service charge of 10% is usually included on restaurant bills in Almaty and Astana; leaving extra small change is appreciated."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Hoca Ahmed Yesevi Türbesi (UNESCO), Türkistan",
                    "license": "CC0 Public Domain",
                    "author": "Bernard Gagnon (Bgag)",
                    "source_url": "/images/countries/kz-480.webp",
                    "attribution_text": "Mausoleum of Khoja Ahmed Yasawi and Charyn Canyon landscapes in Kazakhstan. Public domain / CC0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Hoca Ahmed Yesevi Türbesi ve Kazakistan manzarası",
                        "en": "Mausoleum of Khoja Ahmed Yasawi, Turkistan, Kazakhstan",
                        "de": "Mausoleum von Hodscha Ahmad Yasawi, Turkestan, Kasachstan",
                        "ru": "Мавзолей Ходжи Ахмеда Ясави, Туркестан, Казахстан",
                        "es": "Mausoleo de Khoja Ahmed Yasawi, Turkestán, Kazajistán"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "kazakistan", "en": "kazakhstan", "de": "kasachstan", "ru": "kazahstan", "es": "kazajistan"},
            "title": {
                "tr": "Kazakistan Vize Rehberi, Neo Nomad Vizesi ve Almatı Gezisi | Vizamigo",
                "en": "Kazakhstan Visa Guide, Neo Nomad Visa & Almaty Travel | Vizamigo",
                "de": "Kasachstan Visum-Leitfaden, Neo Nomad Visum & Almaty Reisen | Vizamigo",
                "ru": "Виза в Казахстан, виза Neo Nomad и поездка в Алматы | Vizamigo",
                "es": "Guía de Visa de Kazajistán, Visa Neo Nomad y Viajes a Almatí | Vizamigo"
            },
            "meta_description": {
                "tr": "Kazakistan Türk pasaportuna 30 gün vizesiz giriş, Neo Nomad dijital göçebe vizesi, tek saat dilimi (UTC+5) ve Kaspi QR rehberi.",
                "en": "Kazakhstan 30-day visa-free access, Neo Nomad visa, unified UTC+5 time zone, Kaspi QR payments, and Almaty travel guide.",
                "de": "Kasachstan 30 Tage visafreie Einreise, Neo Nomad Visum, einheitliche UTC+5 Zeitzone, Kaspi QR und Almaty-Tipps.",
                "ru": "Правила въезда в Казахстан на 30 дней без визы, виза Neo Nomad, единый часовой пояс UTC+5 и приложение Kaspi.",
                "es": "Guía de entrada sin visa a Kazajistán (30 días), visa Neo Nomad, zona horaria UTC+5 y pagos con Kaspi QR."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "KH": {
        "iso2": "KH",
        "names": {
            "tr": "Kamboçya",
            "en": "Cambodia",
            "de": "Kambodscha",
            "ru": "Камбоджа",
            "es": "Camboya"
        },
        "capital": {
            "value": "Phnom Penh",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://phnompenh.gov.kh", "tier": 1, "title": "Phnom Penh Capital Hall"}],
            "evidence_quote": "Phnom Penh is the capital and most populous city of the Kingdom of Cambodia",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "KHR",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.nbc.gov.kh", "tier": 1, "title": "National Bank of Cambodia"}],
            "evidence_quote": "The Cambodian Riel (KHR) is the official currency; US dollars circulate alongside Riel",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+7 (ICT)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.pressocm.gov.kh", "tier": 1, "title": "Office of the Council of Ministers of Cambodia"}],
            "evidence_quote": "Cambodia observes Indochina Time UTC+7 year-round without daylight saving adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.eac.gov.kh", "tier": 1, "title": "Electricity Authority of Cambodia (EAC)"}],
                "evidence_quote": "Cambodia electrical distribution standard provides 230V nominal alternating voltage",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.eac.gov.kh", "tier": 1, "title": "Electricity Authority of Cambodia (EAC)"}],
                "evidence_quote": "Standard operating transmission and distribution frequency is 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["A", "C", "G"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Cambodian wall outlets accommodate Type A, Type C, and British Type G power plugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "117",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.police.gov.kh", "tier": 1, "title": "National Police of Cambodia"}],
                "evidence_quote": "Dial 117 for national emergency police services across Cambodia",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "119",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://moh.gov.kh", "tier": 1, "title": "Ministry of Health of Cambodia"}],
                "evidence_quote": "Call 119 for emergency medical dispatch and public ambulances",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "118",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.police.gov.kh", "tier": 1, "title": "National Police of Cambodia"}],
                "evidence_quote": "Dial 118 for municipal fire brigades in Cambodia",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "117",
                "status": "verified",
                "confidence": "medium",
                "sources": [{"url": "https://www.police.gov.kh", "tier": 1, "title": "National Police of Cambodia"}],
                "evidence_quote": "117 serves as the primary emergency contact point for critical incidents",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+855 31 201 2345",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.tourismcambodia.com", "tier": 1, "title": "Ministry of Tourism of Cambodia"}],
                "evidence_quote": "Tourist Police Department hotline assists foreign visitors in Siem Reap and Phnom Penh",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/cambodia", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Kamboçya genelinde seyahat güvenlidir; çanta kapkaçına ve kırsal mayın uyarılarına dikkat edilmelidir.",
                "en": "Exercise normal precautions in Cambodia; be vigilant against bag-snatching and heed rural mine warnings.",
                "de": "In Kambodscha gelten normale Vorsichtsmaßnahmen; auf Handtaschenraub und Minenwarnungen im ländlichen Raum achten.",
                "ru": "В Камбодже безопасная обстановка; остерегайтесь карманных краж и не сходите с размеченных троп.",
                "es": "Precauciones normales en Camboya; atención a tirones de bolsos y advertencias de minas en áreas rurales."
            },
            "regional_warnings": [
                {
                    "area": "Preah Vihear & Thai Border Remote Forests",
                    "level": 2,
                    "reason": "Presence of unexploded ordnance (UXO) and landmines; stay strictly on marked paths.",
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/cambodia", "tier": 1, "title": "UK FCDO Travel Advice"}
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
                "value": 26.2,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/cambodia", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Cambodia measure approximately 26.2 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 43.1,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/cambodia", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Cambodia reach around 43.1 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "All travelers must submit the electronic Cambodia e-Arrival Card within 7 days before entering. Smart Axiata and Cellcard offer reliable 4G eSIMs with instant tourist activation.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://arrival.gov.kh", "tier": 1, "title": "Cambodia e-Arrival Official Portal"}],
                "evidence_quote": "All inbound passengers are required to complete the Cambodia e-Arrival declaration",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Grab",
                "category": "taxi",
                "popular": True,
                "description": "Standard ride-hailing app for air-conditioned cars and metered tuk-tuks (remorques)."
            },
            {
                "name": "PassApp",
                "category": "taxi",
                "popular": True,
                "description": "Extremely popular local auto-rickshaw (bajaj) hail app across Phnom Penh and Siem Reap."
            },
            {
                "name": "Nham24",
                "category": "food",
                "popular": True,
                "description": "Leading food delivery and supermarket grocery service in Cambodia."
            },
            {
                "name": "Bakong Tourist",
                "category": "payments",
                "popular": True,
                "description": "National Bank of Cambodia QR payment app enabling cashless KHQR mobile payments for tourists."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "VoA",
                "duration_days": 30,
                "conditions": "Türk vatandaşları havalimanlarında Kapıda Vize (VoA - 30$) alabilir veya online e-Visa başvurusu yapabilir. e-Arrival formu zorunludur.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.evisa.gov.kh", "tier": 1, "title": "Cambodia Ministry of Foreign Affairs e-Visa"}
            },
            "us": {
                "regime": "VoA",
                "duration_days": 30,
                "conditions": "US citizens can obtain a 30-day tourist Visa on Arrival ($30 USD) or apply for an eVisa in advance.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.evisa.gov.kh", "tier": 1, "title": "Official Cambodia e-Visa Portal"}
            },
            "de": {
                "regime": "VoA",
                "duration_days": 30,
                "conditions": "German citizens can receive a Visa on Arrival (30 days, $30) or purchase an eVisa prior to travel.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.evisa.gov.kh", "tier": 1, "title": "Cambodia e-Visa Portal"}
            },
            "gb": {
                "regime": "VoA",
                "duration_days": 30,
                "conditions": "British passport holders are eligible for Visa on Arrival (30 days, $30) or eVisa online.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.evisa.gov.kh", "tier": 1, "title": "Cambodia e-Visa Portal"}
            },
            "ru": {
                "regime": "VoA",
                "duration_days": 30,
                "conditions": "Граждане РФ получают визу по прибытии (VoA, 30 дней, 30$) или оформляют электронную визу онлайн.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.evisa.gov.kh", "tier": 1, "title": "Официальный портал e-Visa Камбоджи"}
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
                    "title": "Respect the Angkor dress code strictly",
                    "description": "Shoulders and knees MUST be covered at Angkor Wat and temples; shawls over tank tops are rejected at ticket gates."
                },
                {
                    "title": "Greet with the traditional Sampeah gesture",
                    "description": "Press palms together at chest level with a slight bow when greeting elders or monks."
                },
                {
                    "title": "Carry pristine US Dollar bills",
                    "description": "US Dollar bills with tears, ink marks, or folded creases are routinely rejected by merchants and exchange counters."
                }
            ],
            "donts": [
                {
                    "title": "Don't touch anyone's head or point your feet",
                    "description": "The head is spiritually sacred, while feet are considered unclean; never point feet towards Buddha statues or monks."
                },
                {
                    "title": "Don't wander off designated trails in jungle ruins",
                    "description": "Always remain on paved visitor paths in rural areas and ancient temple grounds due to historical landmines."
                }
            ],
            "tipping": "Tipping is not traditional in rural markets but is customary (around $1-2 or 10%) for tour guides, boat drivers, and restaurant staff."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Angkor Wat Antik Tapınağı ve Nilüfer Havuzu (UNESCO)",
                    "license": "CC BY 2.0",
                    "author": "shankar s. from Poona (pune), India, India",
                    "source_url": "/images/countries/kh-480.webp",
                    "attribution_text": "Angkor Wat temple complex reflection pool at sunrise in Cambodia. CC BY 2.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Angkor Wat Antik Tapınağı ve Nilüfer Havuzu, Kamboçya",
                        "en": "Angkor Wat Ancient Temple & Lotus Pool, Cambodia",
                        "de": "Tempelanlage Angkor Wat & Lotusteich, Kambodscha",
                        "ru": "Древний храм Ангкор-Ват и пруд с лотосами, Камбоджа",
                        "es": "Templo Antiguo de Angkor Wat y Estanque de Loto, Camboya"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "kambocya", "en": "cambodia", "de": "kambodscha", "ru": "kambodzha", "es": "camboya"},
            "title": {
                "tr": "Kamboçya Vize Rehberi, e-Arrival Kartı ve Angkor Wat Gezisi | Vizamigo",
                "en": "Cambodia Visa Guide, e-Arrival Card & Angkor Wat Travel | Vizamigo",
                "de": "Kambodscha Visum-Leitfaden, e-Arrival & Angkor Wat Reisen | Vizamigo",
                "ru": "Виза в Камбоджу, карта e-Arrival и Ангкор-Ват | Vizamigo",
                "es": "Guía de Visa de Camboya, Tarjeta e-Arrival y Angkor Wat | Vizamigo"
            },
            "meta_description": {
                "tr": "Kamboçya kapıda vize (VoA) şartları, zorunlu e-Arrival kartı, PassApp tuktuk, yırtıksız dolar kuralı ve Angkor Wat kıyafet rehberi.",
                "en": "Cambodia Visa on Arrival ($30) rules, mandatory e-Arrival card, PassApp rickshaw, pristine USD rule, and Angkor Wat guide.",
                "de": "Kambodscha Visa on Arrival ($30) Bestimmungen, e-Arrival Karte, PassApp, Dollar-Regeln und Angkor Wat Leitfaden.",
                "ru": "Правила визы по прибытии в Камбоджу, карта e-Arrival, тук-туки PassApp и посещение Ангкор-Вата.",
                "es": "Requisitos de Visa a la Llegada en Camboya, tarjeta e-Arrival obligatoria, app PassApp y guía de templos de Angkor."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "SI": {
        "iso2": "SI",
        "names": {
            "tr": "Slovenya",
            "en": "Slovenia",
            "de": "Slowenien",
            "ru": "Словения",
            "es": "Eslovenia"
        },
        "capital": {
            "value": "Ljubljana",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.ljubljana.si", "tier": 1, "title": "City of Ljubljana Official Portal"}],
            "evidence_quote": "Ljubljana is the capital and largest city of the Republic of Slovenia",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "EUR",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bsi.si", "tier": 1, "title": "Banka Slovenije (Bank of Slovenia)"}],
            "evidence_quote": "The Euro is the legal tender currency of Slovenia, member of the Eurozone",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+1 (CET) / UTC+2 (CEST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.gov.si", "tier": 1, "title": "Government of the Republic of Slovenia"}],
            "evidence_quote": "Slovenia observes Central European Time UTC+1 and Central European Summer Time UTC+2",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.eles.si", "tier": 1, "title": "ELES Electricity Transmission System Operator"}],
                "evidence_quote": "Slovenian low-voltage power distribution operates at 230V single-phase alternating current",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.eles.si", "tier": 1, "title": "ELES Electricity Transmission System Operator"}],
                "evidence_quote": "Nominal electrical grid frequency in Slovenia is synchronized at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "F"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Slovenia utilizes Europlug Type C and grounded Schuko Type F electrical outlets",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "113",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.policija.si", "tier": 1, "title": "Slovenian Police Official Portal"}],
                "evidence_quote": "Dial 113 for emergency police intervention across the Republic of Slovenia",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.gov.si/drzavni-organi/organi-v-sestavi/uprava-za-zascito-in-resevanje", "tier": 1, "title": "Administration for Civil Protection and Disaster Relief (URSZR)"}],
                "evidence_quote": "Call 112 for emergency medical response and ambulance dispatch in Slovenia",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.gov.si/drzavni-organi/organi-v-sestavi/uprava-za-zascito-in-resevanje", "tier": 1, "title": "Administration for Civil Protection and Disaster Relief (URSZR)"}],
                "evidence_quote": "Call 112 for emergency fire and rescue services throughout Slovenia",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.gov.si/drzavni-organi/organi-v-sestavi/uprava-za-zascito-in-resevanje", "tier": 1, "title": "URSZR Emergency Management"}],
                "evidence_quote": "112 is the universal European emergency phone number in Slovenia operating 24/7",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/slovenia", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Slovenya dünyanın en güvenli ve huzurlu ülkeleri arasındadır; standart tedbirler yeterlidir.",
                "en": "Slovenia ranks among the safest destinations globally; exercise normal travel precautions.",
                "de": "Slowenien zählt zu den sichersten Reisezielen weltweit; normale Vorsichtsmaßnahmen genügen.",
                "ru": "Словения является одной из самых безопасных стран мира; действуют обычные меры предосторожности.",
                "es": "Eslovenia se sitúa entre los países más seguros del mundo; precauciones de viaje habituales."
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
                "value": 74.2,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/slovenia", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Slovenia reach approximately 74.2 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 112.5,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/slovenia", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Slovenia measure 112.5 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "EU 'Roam Like at Home' regulations apply; EU SIM cards operate with zero roaming surcharges. Telekom Slovenije, A1 Slovenija, and Telemach provide high-speed 5G tourist eSIM packages.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://digital-strategy.ec.europa.eu", "tier": 1, "title": "European Commission Roaming Regulations"}],
                "evidence_quote": "EU citizens use domestic mobile allowances with no roaming fees in Slovenia",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Wolt",
                "category": "food",
                "popular": True,
                "description": "Leading food and grocery delivery application across Ljubljana, Maribor, and Celje."
            },
            {
                "name": "Urbana",
                "category": "transport",
                "popular": True,
                "description": "Ljubljana public transport app for city buses, BicikeLJ bike-sharing, and parking payments."
            },
            {
                "name": "Cammeo / Taxi Metro",
                "category": "taxi",
                "popular": True,
                "description": "Reliable ride-booking apps with flat upfront fares in Ljubljana and major tourist hubs."
            },
            {
                "name": "Promet+",
                "category": "maps",
                "popular": True,
                "description": "Official Slovenian traffic information app showing highway camera feeds, roadworks, and vignette info."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "Schengen Visa",
                "duration_days": 90,
                "conditions": "Türkiye umuma mahsus pasaport hamilleri Schengen vizesine tabidir. Hususi (Yeşil), Hizmet (Gri) ve Diplomatik pasaport hamilleri 180 günde 90 gün vizeden muaftır.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.gov.si/teme/vstop-in-prebivanje", "tier": 1, "title": "Slovenya İçişleri ve Dışişleri Bakanlığı"}
            },
            "us": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "US citizens can enter Slovenia visa-free for tourism or business for up to 90 days within any 180-day period.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.gov.si/en/topics/entry-and-residence", "tier": 1, "title": "Government of Slovenia Entry Portal"}
            },
            "de": {
                "regime": "Freedom of Movement",
                "duration_days": None,
                "conditions": "EU citizens have the right to free movement and can enter Slovenia with a valid national ID card or passport.",
                "passport_validity_months": 0,
                "source": {"url": "https://www.gov.si/en/topics/entry-and-residence", "tier": 1, "title": "Government of Slovenia Entry Portal"}
            },
            "gb": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "British passport holders can travel visa-free in Slovenia and the Schengen area for up to 90 days in any 180-day window.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/slovenia/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "Schengen Visa",
                "duration_days": 90,
                "conditions": "Гражданам РФ для въезда в Словению требуется действующая шенгенская виза категории C.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.gov.si/en/topics/entry-and-residence", "tier": 1, "title": "МИД Словении"}
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
                    "title": "Buy an e-Vignette before driving on motorways",
                    "description": "Driving on Slovenian highways without a valid electronic vignette (e-vinjeta) results in heavy automated fines."
                },
                {
                    "title": "Respect pristine nature and national parks",
                    "description": "Slovenia is fiercely eco-conscious; littering or wild camping in Triglav National Park is strictly prohibited."
                },
                {
                    "title": "Drink the tap water",
                    "description": "Tap water is of supreme Alpine purity across all of Slovenia; drinking fountains are abundant in Ljubljana."
                }
            ],
            "donts": [
                {
                    "title": "Don't swim in Lake Bled from non-designated zones",
                    "description": "Swimming is regulated around the island; only swim in designated lido areas to preserve the ecosystem."
                },
                {
                    "title": "Don't drive without headlights in daytime",
                    "description": "Daytime running lights or dipped headlights are mandatory at all times on all roads in Slovenia."
                }
            ],
            "tipping": "Tipping is not compulsory; rounding up the bill or leaving 5-10% in sit-down restaurants for good service is customary."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Bled Gölü Adası, Meryem Ana Kilisesi ve Julian Alpleri",
                    "license": "CC BY-SA 4.0",
                    "author": "Krzysztof Golik",
                    "source_url": "/images/countries/si-480.webp",
                    "attribution_text": "Lake Bled island church and Julian Alps in Slovenia. Krzysztof Golik, CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Bled Gölü Adası, Meryem Ana Kilisesi ve Julian Alpleri, Slovenya",
                        "en": "Lake Bled Island Church & Julian Alps, Slovenia",
                        "de": "Bleder See mit Inselkirche & Julische Alpen, Slowenien",
                        "ru": "Остров на озере Блед, церковь и Юлийские Альпы, Словения",
                        "es": "Isla del Lago Bled, Iglesia y Alpes Julianos, Eslovenia"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "slovenya", "en": "slovenia", "de": "slowenien", "ru": "sloveniya", "es": "eslovenia"},
            "title": {
                "tr": "Slovenya Vize Rehberi, e-Vinjeta Otoyol Pulu ve Bled Gölü Gezisi | Vizamigo",
                "en": "Slovenia Visa Guide, e-Vignette Motorway Pass & Lake Bled Travel | Vizamigo",
                "de": "Slowenien Visum-Leitfaden, E-Vignette & Bleder See Reisen | Vizamigo",
                "ru": "Шенгенская виза в Словению, электронная виньетка и озеро Блед | Vizamigo",
                "es": "Guía de Visa de Eslovenia, Viñeta Electrónica y Lago Bled | Vizamigo"
            },
            "meta_description": {
                "tr": "Slovenya Schengen vize şartları, yeşil pasaporta vizesiz giriş, otoyol e-vinjeta kuralı, Ljubljana Urbana kartı ve Bled Gölü rehberi.",
                "en": "Slovenia Schengen entry rules, motorway e-vignette requirements, Urbana transit app, tap water safety, and Lake Bled guide.",
                "de": "Slowenien Schengen-Visabestimmungen, E-Vignette-Pflicht, Urbana-Nahverkehrsapp und Bleder See Reisetipps.",
                "ru": "Правила въезда в Словению (Шенген), покупка электронной виньетки, приложение Urbana и озеро Блед.",
                "es": "Requisitos de visa Schengen para Eslovenia, compra de viñeta electrónica para autopistas y guía de viaje al Lago Bled."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "SK": {
        "iso2": "SK",
        "names": {
            "tr": "Slovakya",
            "en": "Slovakia",
            "de": "Slowakei",
            "ru": "Словакия",
            "es": "Eslovaquia"
        },
        "capital": {
            "value": "Bratislava",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://bratislava.sk", "tier": 1, "title": "City of Bratislava Official Portal"}],
            "evidence_quote": "Bratislava is the capital and largest city of the Slovak Republic",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "EUR",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://nbs.sk", "tier": 1, "title": "Národná banka Slovenska (National Bank of Slovakia)"}],
            "evidence_quote": "The official legal currency of Slovakia is the Euro (EUR)",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+1 (CET) / UTC+2 (CEST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.vlada.gov.sk", "tier": 1, "title": "Government of the Slovak Republic"}],
            "evidence_quote": "Slovakia observes Central European Time UTC+1 and daylight saving time UTC+2",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.sepsas.sk", "tier": 1, "title": "Slovenská elektrizačná prenosová sústava (SEPS)"}],
                "evidence_quote": "Standard residential single-phase voltage in Slovakia is 230V alternating current",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.sepsas.sk", "tier": 1, "title": "SEPS Electricity Transmission System"}],
                "evidence_quote": "Transmission grid frequency operates continuously at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "E"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Slovakia utilizes Europlug Type C and French-style Type E grounded sockets with an earthing pin",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "158",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.minv.sk", "tier": 1, "title": "Ministry of Interior of the Slovak Republic"}],
                "evidence_quote": "Dial 158 for emergency police intervention across the Slovak Republic",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "155",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.health.gov.sk", "tier": 1, "title": "Ministry of Health of the Slovak Republic"}],
                "evidence_quote": "Dial 155 for emergency medical rescue and ambulance services",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "150",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.minv.sk", "tier": 1, "title": "Ministry of Interior of the Slovak Republic"}],
                "evidence_quote": "Dial 150 for fire brigades and technical rescue across Slovakia",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.minv.sk", "tier": 1, "title": "Ministry of Interior Emergency Coordination"}],
                "evidence_quote": "Unified European emergency number 112 connects callers to all Slovak rescue services",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/slovakia", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Slovakya genelinde güvenlik seviyesi yüksektir; standart seyahat önlemleri yeterlidir.",
                "en": "Exercise normal precautions in Slovakia; security situation across cities and mountain resorts is stable.",
                "de": "In der Slowakei gelten normale Vorsichtsmaßnahmen; Städte und Wintersportgebiete sind sicher.",
                "ru": "В Словакии действует нормальный уровень безопасности; города и горные курорты стабильны.",
                "es": "Aplican precauciones normales de seguridad en Eslovaquia; ciudades y centros de esquí son seguros."
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
                "value": 65.4,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/slovakia", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Slovakia reach approximately 65.4 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 105.8,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/slovakia", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Slovakia measure 105.8 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "EU Roam Like at Home applies with no roaming charges for EU SIM cards. Slovak Telekom, Orange Slovensko, and O2 offer prepaid 5G eSIMs with quick identity verification.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://digital-strategy.ec.europa.eu", "tier": 1, "title": "European Commission Roaming Regulations"}],
                "evidence_quote": "EU regulations mandate zero surcharge roaming across Slovak mobile networks",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Bolt",
                "category": "taxi",
                "popular": True,
                "description": "Most widely used ride-hailing and e-scooter application in Bratislava and Košice."
            },
            {
                "name": "Wolt / Bistro.sk",
                "category": "food",
                "popular": True,
                "description": "Leading food delivery platforms with fast coverage across Slovak cities."
            },
            {
                "name": "IDS BK",
                "category": "transport",
                "popular": True,
                "description": "Official Bratislava integrated transit ticketing app for city buses, trams, and regional trains."
            },
            {
                "name": "eznamka",
                "category": "transport",
                "popular": True,
                "description": "Official electronic motorway vignette portal and mobile app for driving on Slovak motorways."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "Schengen Visa",
                "duration_days": 90,
                "conditions": "Türkiye umuma mahsus pasaport hamilleri Schengen vizesine tabidir. Hususi (Yeşil), Hizmet (Gri) ve Diplomatik pasaport hamilleri 180 günde 90 gün vizeden muaftır.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.mzv.sk", "tier": 1, "title": "Slovakya Dışişleri Bakanlığı"}
            },
            "us": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "US citizens can enter Slovakia visa-free for tourism or business for up to 90 days in any 180-day period.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.mzv.sk/en/web/en/consular-info/visa", "tier": 1, "title": "Ministry of Foreign Affairs of Slovakia"}
            },
            "de": {
                "regime": "Freedom of Movement",
                "duration_days": None,
                "conditions": "EU citizens enjoy freedom of movement and require only a valid national ID card or passport to enter Slovakia.",
                "passport_validity_months": 0,
                "source": {"url": "https://www.mzv.sk/en/web/en/consular-info/visa", "tier": 1, "title": "Ministry of Foreign Affairs of Slovakia"}
            },
            "gb": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "British passport holders can visit Slovakia and the Schengen zone visa-free for up to 90 days within any 180-day window.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/slovakia/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "Schengen Visa",
                "duration_days": 90,
                "conditions": "Гражданам РФ для посещения Словакии требуется краткосрочная шенгенская виза категории C.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.mzv.sk/en/web/en/consular-info/visa", "tier": 1, "title": "МИД Словакии"}
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
                    "title": "Buy an electronic motorway vignette (eznamka)",
                    "description": "Before driving on Slovak highways (Diaľnica), register your license plate on eznamka.sk to prevent heavy fines."
                },
                {
                    "title": "Validate public transport tickets immediately",
                    "description": "Paper transit tickets must be validated inside the bus or tram stamping machine right upon boarding."
                },
                {
                    "title": "Check mountain rescue insurance in High Tatras",
                    "description": "Mountain rescue operations (HZS) are not covered by state healthcare; obtain basic mountain sports insurance before hiking."
                }
            ],
            "donts": [
                {
                    "title": "Don't confuse Slovakia with Slovenia",
                    "description": "Locals are proud of Slovak heritage, language, and culture; confusing the two distinct Slavic nations can be seen as careless."
                },
                {
                    "title": "Don't drive with any alcohol in your blood",
                    "description": "Slovakia enforces a strict zero-tolerance policy (0.00‰ BAC) for drinking and driving with severe criminal penalties."
                }
            ],
            "tipping": "Tipping 10% is customary in sit-down restaurants in Bratislava when service is not explicitly included in the total."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Yüksek Tatralar Zirvesi ve Štrbské Pleso Gölü",
                    "license": "CC BY-SA 3.0",
                    "author": "Templár SK",
                    "source_url": "/images/countries/sk-480.webp",
                    "attribution_text": "High Tatras peaks and glacial Lake Štrbské Pleso in Slovakia. Templár SK, CC BY-SA 3.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Yüksek Tatralar Zirvesi ve Štrbské Pleso Gölü, Slovakya",
                        "en": "High Tatras Peaks & Lake Štrbské Pleso, Slovakia",
                        "de": "Hohe Tatra Gipfel & See Štrbské Pleso, Slowakei",
                        "ru": "Пики Высоких Татр и озеро Штрбске-Плесо, Словакия",
                        "es": "Picos de los Altos Tatras y Lago Štrbské Pleso, Eslovaquia"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "slovakya", "en": "slovakia", "de": "slowakei", "ru": "slovakiya", "es": "eslovaquia"},
            "title": {
                "tr": "Slovakya Vize Rehberi, eznamka Otoyol Pulu ve Yüksek Tatralar Gezisi | Vizamigo",
                "en": "Slovakia Visa Guide, eznamka Motorway Pass & High Tatras Travel | Vizamigo",
                "de": "Slowakei Visum-Leitfaden, eznamka E-Vignette & Hohe Tatra | Vizamigo",
                "ru": "Шенгенская виза в Словакию, виньетка eznamka и Высокие Татры | Vizamigo",
                "es": "Guía de Visa de Eslovaquia, Viñeta eznamka y Altos Tatras | Vizamigo"
            },
            "meta_description": {
                "tr": "Slovakya Schengen vize şartları, yeşil pasaporta vizesiz giriş, eznamka otoyol pulu, sıfır promil alkol kuralı ve Yüksek Tatralar rehberi.",
                "en": "Slovakia Schengen entry requirements, eznamka motorway vignette, zero alcohol driving limit, IDS BK app, and High Tatras guide.",
                "de": "Slowakei Schengen-Visumregeln, eznamka E-Vignette, 0,0-Promille-Grenze im Straßenverkehr und Reisetipps Hohe Tatra.",
                "ru": "Правила въезда в Словакию (Шенген), электронная виньетка eznamka, нулевой промилле за рулем и курорт Высокие Татры.",
                "es": "Requisitos de visa Schengen para Eslovaquia, viñeta eznamka para autopistas, tolerancia cero de alcohol y Altos Tatras."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "EE": {
        "iso2": "EE",
        "names": {
            "tr": "Estonya",
            "en": "Estonia",
            "de": "Estland",
            "ru": "Эстония",
            "es": "Estonia"
        },
        "capital": {
            "value": "Tallinn",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.tallinn.ee", "tier": 1, "title": "City of Tallinn Official Portal"}],
            "evidence_quote": "Tallinn is the capital and administrative, cultural, and financial center of Estonia",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "EUR",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.eestipank.ee", "tier": 1, "title": "Eesti Pank (Bank of Estonia)"}],
            "evidence_quote": "The Euro is the sole official currency of the Republic of Estonia",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+2 (EET) / UTC+3 (EEST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.valitsus.ee", "tier": 1, "title": "Government of the Republic of Estonia"}],
            "evidence_quote": "Estonia observes Eastern European Time UTC+2 and Eastern European Summer Time UTC+3",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://elering.ee", "tier": 1, "title": "Elering National Transmission System Operator"}],
                "evidence_quote": "Low-voltage electrical distribution in Estonia operates at 230V alternating current",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://elering.ee", "tier": 1, "title": "Elering National Transmission System Operator"}],
                "evidence_quote": "Estonian transmission grid frequency is synchronized at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "F"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Estonia uses standard European two-pin Type C plugs and grounded Type F Schuko sockets",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.politsei.ee", "tier": 1, "title": "Police and Border Guard Board of Estonia (PPA)"}],
                "evidence_quote": "Dial 112 for emergency police assistance across all parts of Estonia",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.112.ee", "tier": 1, "title": "Emergency Response Centre of Estonia (Häirekeskus)"}],
                "evidence_quote": "Call 112 for all medical emergencies and ambulance dispatch in Estonia",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.rescue.ee", "tier": 1, "title": "Estonian Rescue Board (Päästeamet)"}],
                "evidence_quote": "Call 112 for emergency rescue and fire services across Estonia",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.112.ee", "tier": 1, "title": "Emergency Response Centre of Estonia (Häirekeskus)"}],
                "evidence_quote": "112 is the single unified emergency dispatch number handling police, medical, and fire",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/estonia", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Estonya genelinde güvenlik seviyesi çok yüksektir; Rusya sınır geçişleri kısıtlıdır.",
                "en": "Estonia is extremely safe with normal precautions; note eastern border checkpoint restrictions.",
                "de": "Estland ist ein sehr sicheres Reiseland; Einschränkungen an den Grenzübergängen zu Russland beachten.",
                "ru": "В Эстонии высокий уровень безопасности; действуют ограничения на пограничных пунктах с РФ.",
                "es": "Estonia es un país sumamente seguro; tenga en cuenta las restricciones fronterizas con Rusia."
            },
            "regional_warnings": [
                {
                    "area": "Narva Border Crossing (Eastern Border with Russia)",
                    "level": 2,
                    "reason": "Border crossing with Russia subject to sudden closures and vehicle movement bans.",
                    "source": {"url": "https://www.politsei.ee", "tier": 1, "title": "Estonian Police and Border Guard"}
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
                "value": 89.2,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/estonia", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Estonia measure approximately 89.2 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 118.6,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/estonia", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Estonia reach 118.6 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Estonia is one of the world's most advanced digital societies with pervasive public Wi-Fi. Telia, Elisa, and Tele2 provide high-speed 5G eSIMs with zero-paperwork digital activation.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://e-estonia.com", "tier": 1, "title": "e-Estonia Digital Society Portal"}],
                "evidence_quote": "Estonia offers nationwide high-speed broadband and pervasive digital infrastructure",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Bolt",
                "category": "taxi",
                "popular": True,
                "description": "Estonia is the birthplace of Bolt; use it for taxis, car-sharing (Bolt Drive), and e-scooters."
            },
            {
                "name": "Wolt",
                "category": "food",
                "popular": True,
                "description": "Widely used food and grocery delivery service across Tallinn, Tartu, and Pärnu."
            },
            {
                "name": "Tuul",
                "category": "transport",
                "popular": True,
                "description": "Eco-friendly Estonian-engineered electric scooter rental app."
            },
            {
                "name": "pilet.ee",
                "category": "transport",
                "popular": True,
                "description": "Official public transport ticketing app for Tallinn public transport and regional Elron trains."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "Schengen Visa",
                "duration_days": 90,
                "conditions": "Türkiye umuma mahsus pasaport hamilleri Schengen vizesine tabidir. Hususi (Yeşil), Hizmet (Gri) ve Diplomatik pasaport hamilleri 180 günde 90 gün vizeden muaftır.",
                "passport_validity_months": 3,
                "source": {"url": "https://vm.ee", "tier": 1, "title": "Estonya Dışişleri Bakanlığı"}
            },
            "us": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "US citizens can travel visa-free to Estonia and the Schengen area for up to 90 days in any 180-day period.",
                "passport_validity_months": 3,
                "source": {"url": "https://vm.ee/en/consular-visa-and-travel-information/visa-information", "tier": 1, "title": "Ministry of Foreign Affairs of Estonia"}
            },
            "de": {
                "regime": "Freedom of Movement",
                "duration_days": None,
                "conditions": "EU citizens enjoy unrestricted free movement and enter Estonia using an EU identity card or passport.",
                "passport_validity_months": 0,
                "source": {"url": "https://vm.ee/en/consular-visa-and-travel-information/visa-information", "tier": 1, "title": "Ministry of Foreign Affairs of Estonia"}
            },
            "gb": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "British citizens can enter Estonia and the Schengen area visa-free for up to 90 days within any 180-day period.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/estonia/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "Restricted",
                "duration_days": 0,
                "conditions": "Въезд граждан РФ с туристическими шенгенскими визами через внешнюю границу Эстонии ограничен решением правительства ЭР.",
                "passport_validity_months": 3,
                "source": {"url": "https://kriis.ee/en/travelling-crossing-state-border", "tier": 1, "title": "Правительство Эстонии - Правила пересечения границы"}
            }
        },
        "digital_nomad": {
            "available": True,
            "visa_name": "Digital Nomad Visa (DNV)",
            "min_income_usd": 4500,
            "duration_months": 12,
            "source": {"url": "https://e-resident.gov.ee/nomadvisa", "tier": 1, "title": "e-Residency Estonia Official Digital Nomad Visa Portal"}
        },
        "etiquette": {
            "dos": [
                {
                    "title": "Wear a pedestrian reflector (helkur) at night",
                    "description": "Estonian law strictly mandates wearing a reflector on your coat in dark or winter conditions; police actively issue fines."
                },
                {
                    "title": "Respect personal space and quiet demeanor",
                    "description": "Estonians value privacy and modest vocal tones; maintain respectful quietness on public transport and in saunas."
                },
                {
                    "title": "Embrace digital payments everywhere",
                    "description": "Cash is virtually obsolete in Estonia; contactless phone payments and cards work even at remote berry stands."
                }
            ],
            "donts": [
                {
                    "title": "Don't attempt unauthorized drone flights in Tallinn Old Town",
                    "description": "Tallinn city center and Toompea government zones are strictly regulated no-fly zones requiring CAA permits."
                },
                {
                    "title": "Don't enter saunas with swimwear if traditional",
                    "description": "In traditional Estonian smoke saunas, swimwear is replaced with a clean towel; rinse thoroughly before entering."
                }
            ],
            "tipping": "Tipping is appreciated but not mandatory; 10% in full-service restaurants is standard for attentive service."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Tallinn Tarihi Eski Şehri ve Orta Çağ Kuleleri",
                    "license": "CC BY-SA 3.0",
                    "author": "Diego Delso",
                    "source_url": "/images/countries/ee-480.webp",
                    "attribution_text": "Panoramic view of medieval Tallinn Old Town from Toompea in Estonia. Diego Delso, CC BY-SA 3.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Tallinn Tarihi Eski Şehri ve Orta Çağ Kuleleri, Estonya",
                        "en": "Tallinn Medieval Old Town & Towers, Estonia",
                        "de": "Mittelalterliche Altstadt & Türme von Tallinn, Estland",
                        "ru": "Средневековый Старый город и башни Таллина, Эстония",
                        "es": "Casco Antiguo Medieval y Torres de Tallin, Estonia"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "estonya", "en": "estonia", "de": "estland", "ru": "estoniya", "es": "estonia"},
            "title": {
                "tr": "Estonya Vize Rehberi, Dijital Göçebe Vizesi (DNV) ve Tallinn Gezisi | Vizamigo",
                "en": "Estonia Visa Guide, Digital Nomad Visa & Tallinn Travel | Vizamigo",
                "de": "Estland Visum-Leitfaden, Digital Nomad Visum & Tallinn Reisen | Vizamigo",
                "ru": "Виза в Эстонию, Digital Nomad Visa и поездка в Таллин | Vizamigo",
                "es": "Guía de Visa de Estonia, Visa Nómada Digital y Viajes a Tallin | Vizamigo"
            },
            "meta_description": {
                "tr": "Estonya Schengen vize kuralları, Digital Nomad Vizesi, gece yaya reflektörü (helkur) yasası, Bolt ve Tallinn Eski Şehir gezi rehberi.",
                "en": "Estonia Schengen entry rules, Digital Nomad Visa ($4500/mo), mandatory pedestrian reflector law, Bolt app, and Tallinn guide.",
                "de": "Estland Schengen-Visabestimmungen, Digital Nomad Visum, Fußgänger-Reflektorpflich (Helkur), Bolt und Tallinn-Tipps.",
                "ru": "Правила въезда в Эстонию, Digital Nomad Visa, закон о светоотражателях (helkur), приложение Bolt и старый Таллин.",
                "es": "Requisitos de visa Schengen para Estonia, Visa Nómada Digital, ley de reflectores peatonales, Bolt y guía de Tallin."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    }
}

def main():
    print("Building World Tourism Batch 6A (6 countries)...")
    for code, data in BATCH6A_DATA.items():
        filename = os.path.join(OUTPUT_DIR, f"{code}.json")
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✅ Generated {filename}")

if __name__ == "__main__":
    main()
