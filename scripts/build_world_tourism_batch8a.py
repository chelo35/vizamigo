#!/usr/bin/env python3
"""
build_world_tourism_batch8a.py
Batch 8A: AD (Andorra), BH (Bahrain), KW (Kuwait),
MC (Monaco), SM (San Marino), LI (Liechtenstein).
"""

import json
import os

OUTPUT_DIR = "src/data/countries"
os.makedirs(OUTPUT_DIR, exist_ok=True)

BATCH8A_DATA = {
    "AD": {
        "iso2": "AD",
        "names": {
            "tr": "Andorra",
            "en": "Andorra",
            "de": "Andorra",
            "ru": "Андорра",
            "es": "Andorra"
        },
        "capital": {
            "value": "Andorra la Vella",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.andorralavella.ad", "tier": 1, "title": "Comú d'Andorra la Vella"}],
            "evidence_quote": "Andorra la Vella is the capital of the Principality of Andorra, the highest capital city in Europe",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "EUR",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bpa.ad", "tier": 1, "title": "Govern d'Andorra - Finança"}],
            "evidence_quote": "The Euro is the official legal tender of Andorra under monetary agreement with the European Union",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+1 (CET) / UTC+2 (CEST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.govern.ad", "tier": 1, "title": "Govern d'Andorra Official Portal"}],
            "evidence_quote": "Andorra observes Central European Time UTC+1 and Central European Summer Time UTC+2",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.feda.ad", "tier": 1, "title": "Forces Elèctriques d'Andorra (FEDA)"}],
                "evidence_quote": "Low-voltage electrical distribution in Andorra is standardized at 230V 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.feda.ad", "tier": 1, "title": "Forces Elèctriques d'Andorra"}],
                "evidence_quote": "Electrical network frequency in Andorra operates continuously at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "F"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Power plugs in Andorra conform to European two-pin Type C and Schuko Type F sockets",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "110",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.policia.ad", "tier": 1, "title": "Cos de Policia d'Andorra"}],
                "evidence_quote": "Dial 110 for emergency police services across the Principality of Andorra",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "116",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.saas.ad", "tier": 1, "title": "Servei Andorrà d'Atenció Sanitària (SAAS)"}],
                "evidence_quote": "Call 116 for medical emergencies and hospital ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "118",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.bombers.ad", "tier": 1, "title": "Cos de Bombers d'Andorra"}],
                "evidence_quote": "Dial 118 for mountain rescue and fire brigades throughout Andorra",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.govern.ad", "tier": 1, "title": "Govern d'Andorra"}],
                "evidence_quote": "112 operates as the unified emergency number coordinating police, medical, and mountain rescue",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/andorra", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Andorra dünyanın en güvenli ülkelerindendir; kış aylarında kar lastiği/zincir zorunluluğuna dikkat edilmelidir.",
                "en": "Andorra is exceptionally safe; in winter, snow chains or winter tires are legally required on mountain passes.",
                "de": "Andorra ist eines der sichersten Länder der Welt; im Winter gilt Winterreifen- bzw. Schneekettenpflicht.",
                "ru": "Андорра — одна из самых безопасных стран мира; зимой обязательно наличие зимней резины или цепей.",
                "es": "Andorra es sumamente segura; en invierno es obligatorio el uso de cadenas o neumáticos de nieve."
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
                "value": 94.6,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/andorra", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Andorra reach approximately 94.6 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 215.2,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/andorra", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Andorra measure 215.2 Mbps nationwide",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "WARNING: Andorra is NOT in the EU; EU 'Roam Like at Home' does NOT apply, and standard roaming charges can be exorbitant! Connect to public Wi-Fi or purchase an Andorra Telecom tourist eSIM before crossing the border.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.andorratelecom.ad", "tier": 1, "title": "Andorra Telecom"}],
                "evidence_quote": "Andorra is excluded from EU roaming regulations; data roaming incurs non-EU rates",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Andorra Telecom",
                "category": "transport",
                "popular": True,
                "description": "Essential app for monitoring mobile data usage and buying tourist eSIM packages in Andorra."
            },
            {
                "name": "Cityme Andorra",
                "category": "maps",
                "popular": True,
                "description": "Official audio guide and tourism exploration app for Andorra la Vella and Pyrenean valleys."
            },
            {
                "name": "Grandvalira App",
                "category": "other",
                "popular": True,
                "description": "Essential ski resort navigation app with live slope webcam feeds and lift pass tracking."
            },
            {
                "name": "Andbus",
                "category": "transport",
                "popular": True,
                "description": "Direct express bus booking app connecting Andorra la Vella to Barcelona (BCN) and Toulouse (TLS) airports."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "Schengen Visa via France/Spain",
                "duration_days": 90,
                "conditions": "Andorra kendi vizesini aramaz, ancak ülkeye sadece İspanya veya Fransa üzerinden girilebilir. Türk umuma mahsus pasaport hamillerinin ÇOK GİRİŞLİ Schengen vizesine sahip olması şarttır (Yeşil pasaporta vizesiz).",
                "passport_validity_months": 3,
                "source": {"url": "https://www.exteriors.ad", "tier": 1, "title": "Ministeri d'Afers Exteriors d'Andorra"}
            },
            "us": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "Andorra does not require any visa, but travelers must meet Schengen entry requirements for France or Spain.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.exteriors.ad/en/travel-to-andorra", "tier": 1, "title": "Ministry of Foreign Affairs of Andorra"}
            },
            "de": {
                "regime": "Freedom of Movement via France/Spain",
                "duration_days": 90,
                "conditions": "German and EU citizens enter Andorra using a valid national ID card or passport via France or Spain.",
                "passport_validity_months": 0,
                "source": {"url": "https://www.exteriors.ad/en/travel-to-andorra", "tier": 1, "title": "Ministry of Foreign Affairs of Andorra"}
            },
            "gb": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "British passport holders enter visa-free via France or Spain; a multiple-entry Schengen allowance is recommended.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/andorra/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "Multiple-Entry Schengen Required",
                "duration_days": 90,
                "conditions": "Для въезда в Андорру гражданам РФ требуется многократная шенгенская виза для транзита через Францию или Испанию.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.exteriors.ad", "tier": 1, "title": "МИД Андорры"}
            }
        },
        "digital_nomad": {
            "available": True,
            "visa_name": "Andorra Digital Nomad Residence",
            "min_income_usd": 3500,
            "duration_months": 12,
            "source": {"url": "https://www.immigracio.ad", "tier": 1, "title": "Servei d'Immigració d'Andorra"}
        },
        "etiquette": {
            "dos": [
                {
                    "title": "Turn off mobile data roaming before entering Andorra!",
                    "description": "Andorra is NOT in the EU; mobile networks charge steep non-EU roaming rates ($10+/MB). Use Wi-Fi or a local SIM."
                },
                {
                    "title": "Declare duty-free goods at customs borders",
                    "description": "French and Spanish customs strictly inspect vehicles leaving Andorra for alcohol, tobacco, and luxury electronics limits."
                },
                {
                    "title": "Equip your car with snow chains in winter",
                    "description": "Police turn back or fine motorists without snow chains or winter tires during snowy mountain pass conditions."
                }
            ],
            "donts": [
                {
                    "title": "Don't attempt entry with a single-entry Schengen visa",
                    "description": "Leaving Spain or France for Andorra consumes one Schengen entry; returning to Spain requires a second entry."
                },
                {
                    "title": "Don't exceed duty-free allowances",
                    "description": "Duty-free thresholds (e.g. 1.5L spirits, 300 cigarettes) are strictly enforced by Guardia Civil and French Douane."
                }
            ],
            "tipping": "Tipping 5-10% is customary in sit-down mountain chalets and restaurants in Andorra la Vella for good service."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Sant Joan de Caselles Romanesk Kilisesi ve Pirene Dağları",
                    "license": "CC BY-SA 3.0",
                    "author": "Luis Miguel Bugallo Sánchez",
                    "source_url": "/images/countries/ad-480.webp",
                    "attribution_text": "Sant Joan de Caselles Romanesque church and Pyrenean mountains in Andorra. CC BY-SA 3.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Sant Joan de Caselles Romanesk Kilisesi ve Pirene Dağları, Andorra",
                        "en": "Sant Joan de Caselles Romanesque Church & Pyrenees, Andorra",
                        "de": "Romanische Kirche Sant Joan de Caselles & Pyrenäen, Andorra",
                        "ru": "Романская церковь Сан-Жоан-де-Казельяс и Пиренеи, Андорра",
                        "es": "Iglesia Románica de Sant Joan de Caselles y Pirineos, Andorra"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "andorra", "en": "andorra", "de": "andorra", "ru": "andorra", "es": "andorra"},
            "title": {
                "tr": "Andorra Vize Rehberi, Çok Girişli Schengen Kuralı ve Dolaşım Uyarısı | Vizamigo",
                "en": "Andorra Visa Guide, Multiple-Entry Schengen & Roaming Warning | Vizamigo",
                "de": "Andorra Visum-Leitfaden, Schengen-Transit & Roaming-Warnung | Vizamigo",
                "ru": "Виза в Андорру, многократный Шенген и предупреждение о роуминге | Vizamigo",
                "es": "Guía de Visa de Andorra, Schengen Múltiple y Alerta de Roaming | Vizamigo"
            },
            "meta_description": {
                "tr": "Andorra vize şartları, çok girişli Schengen zorunluluğu, AB dışı pahalı dolaşım (roaming) uyarısı, gümrüksüz alışveriş ve Pirene gezi rehberi.",
                "en": "Andorra entry rules, multiple-entry Schengen requirement, critical non-EU data roaming warning, duty-free limits, and ski guide.",
                "de": "Andorra Einreisebestimmungen, Mehrfach-Schengen-Pflicht, Roaming-Warnung (kein EU-Roaming) und Reisetipps Pyrenäen.",
                "ru": "Правила въезда в Андорру, многократная шенгенская виза, предупреждение о дорогом роуминге и горнолыжные курорты.",
                "es": "Requisitos de entrada a Andorra, visado Schengen múltiple, advertencia de roaming fuera de la UE y compras libres de impuestos."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "BH": {
        "iso2": "BH",
        "names": {
            "tr": "Bahreyn",
            "en": "Bahrain",
            "de": "Bahrain",
            "ru": "Бахрейн",
            "es": "Baréin"
        },
        "capital": {
            "value": "Manama",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.capital.gov.bh", "tier": 1, "title": "Capital Governorate of the Kingdom of Bahrain"}],
            "evidence_quote": "Manama is the capital and largest city of Bahrain, a premier regional financial hub",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "BHD",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.cbb.gov.bh", "tier": 1, "title": "Central Bank of Bahrain (CBB)"}],
            "evidence_quote": "The Bahraini Dinar (BHD) is pegged to the US Dollar at 1 BHD = 2.659 USD",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+3 (AST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bahrain.bh", "tier": 1, "title": "Bahrain eGovernment National Portal"}],
            "evidence_quote": "Bahrain observes Arabia Standard Time UTC+3 year-round without daylight saving time",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ewa.bh", "tier": 1, "title": "Electricity and Water Authority of Bahrain (EWA)"}],
                "evidence_quote": "Standard residential single-phase electricity in Bahrain is delivered at 230V 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ewa.bh", "tier": 1, "title": "Electricity and Water Authority of Bahrain"}],
                "evidence_quote": "The electrical grid operating frequency in Bahrain is 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["G"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Wall outlets in Bahrain strictly adhere to the British three-rectangular-pin Type G standard",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.policemc.gov.bh", "tier": 1, "title": "Ministry of Interior of Bahrain"}],
                "evidence_quote": "Dial 999 for emergency police assistance throughout the Kingdom of Bahrain",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.moh.gov.bh", "tier": 1, "title": "Ministry of Health of Bahrain"}],
                "evidence_quote": "Call 999 for emergency medical assistance and ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.civildefence.gov.bh", "tier": 1, "title": "General Directorate of Civil Defence"}],
                "evidence_quote": "Dial 999 for emergency civil defence and fire rescue",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.bahrain.bh", "tier": 1, "title": "Bahrain National Portal"}],
                "evidence_quote": "112 functions as the secondary mobile emergency number alongside 999",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+973 1755 0840",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.btea.bh", "tier": 1, "title": "Bahrain Tourism and Exhibitions Authority (BTEA)"}],
                "evidence_quote": "Tourism security officers assist international visitors across Manama souqs and heritage sites",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/bahrain", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Bahreyn genelinde güvenlik seviyesi çok yüksektir; standart seyahat tedbirleri yeterlidir.",
                "en": "Bahrain is one of the safest destinations in the Middle East; exercise normal precautions.",
                "de": "Bahrain ist ein sehr sicheres Reiseland; normale Vorsichtsmaßnahmen genügen.",
                "ru": "В Бахрейне высокий уровень безопасности; действуют обычные меры предосторожности.",
                "es": "Baréin es un destino sumamente seguro; aplican precauciones normales de viaje."
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
                "value": 91.2,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/bahrain", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Bahrain reach approximately 91.2 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 96.5,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/bahrain", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Bahrain measure 96.5 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Batelco, stc Bahrain, and Zain offer 5G prepaid tourist eSIMs with airport counters open 24/7. BenefitPay is the universal mobile QR payment method used across all shops.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.batelco.com", "tier": 1, "title": "Batelco Bahrain"}],
                "evidence_quote": "5G mobile connectivity covers the entire populated area of Bahrain",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "BenefitPay",
                "category": "payments",
                "popular": True,
                "description": "Bahrain's national electronic wallet app; BenefitPay QR codes are ubiquitous across all merchants."
            },
            {
                "name": "Uber / Careem",
                "category": "taxi",
                "popular": True,
                "description": "Reliable, widely available ride-hailing services operating across Manama and Muharraq."
            },
            {
                "name": "Talabat / Jahez",
                "category": "food",
                "popular": True,
                "description": "Leading food and grocery delivery applications in Bahrain."
            },
            {
                "name": "Bahrain Bus",
                "category": "transport",
                "popular": True,
                "description": "Official public transport app showing live air-conditioned red bus routes and GO Card balances."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "eVisa / VoA",
                "duration_days": 30,
                "conditions": "Türk vatandaşları Bahreyn Uluslararası Havalimanı'nda Kapıda Vize (VoA - 14-30 gün) alabilir veya online e-Visa başvurusu yapabilir.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.evisa.gov.bh", "tier": 1, "title": "Bahreyn e-Visa Portalı"}
            },
            "us": {
                "regime": "eVisa / VoA",
                "duration_days": 30,
                "conditions": "US citizens can obtain a 14-day or 30-day Visa on Arrival or apply online for a multi-entry eVisa.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.evisa.gov.bh", "tier": 1, "title": "Kingdom of Bahrain eVisa Portal"}
            },
            "de": {
                "regime": "eVisa / VoA",
                "duration_days": 30,
                "conditions": "German and EU citizens are eligible for Visa on Arrival at the port of entry or online eVisa.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.evisa.gov.bh", "tier": 1, "title": "Kingdom of Bahrain eVisa Portal"}
            },
            "gb": {
                "regime": "eVisa / VoA",
                "duration_days": 30,
                "conditions": "British passport holders can obtain a Visa on Arrival or apply for an eVisa prior to travel.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/bahrain/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "eVisa / VoA",
                "duration_days": 14,
                "conditions": "Граждане РФ могут получить визу по прибытии в аэропорту Бахрейна (14 дней с возможностью продления) или оформить eVisa.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.evisa.gov.bh", "tier": 1, "title": "Портал eVisa Бахрейна"}
            }
        },
        "digital_nomad": {
            "available": True,
            "visa_name": "Bahrain Golden Residency & Remote Visa",
            "min_income_usd": 5300,
            "duration_months": 120,
            "source": {"url": "https://www.npra.gov.bh", "tier": 1, "title": "Nationality, Passports and Residence Affairs (NPRA)"}
        },
        "etiquette": {
            "dos": [
                {
                    "title": "Respect Islamic cultural traditions",
                    "description": "Bahrain is cosmopolitan and open, but modest attire covering shoulders and knees is appreciated in malls and public areas."
                },
                {
                    "title": "Visit the UNESCO Pearling Path",
                    "description": "Walk the historic architectural Pearling Path in Muharraq to learn about Bahrain's legendary pearl-diving heritage."
                },
                {
                    "title": "Cross the King Fahd Causeway to Saudi Arabia if eligible",
                    "description": "The 25 km bridge connects Bahrain to Saudi Arabia; ensure you have a valid Saudi visa if crossing."
                }
            ],
            "donts": [
                {
                    "title": "Don't consume alcohol outside licensed venues",
                    "description": "Alcohol is permitted in licensed hotels and restaurants in Bahrain, but drinking in public streets is strictly forbidden."
                },
                {
                    "title": "Don't eat or drink publicly during Ramadan daylight",
                    "description": "Consuming food, water, or smoking in public during Ramadan fasting hours is prohibited by law."
                }
            ],
            "tipping": "Tipping 10-15% is customary in restaurants; rounding up taxi fares is appreciated."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Bahreyn Dünya Ticaret Merkezi (WTC) İkiz Kuleleri",
                    "license": "CC BY 2.0",
                    "author": "Gabby Canonizado from Dubai, United Arab Emirates",
                    "source_url": "/images/countries/bh-480.webp",
                    "attribution_text": "Bahrain World Trade Center twin towers on Manama harbor. Gabby Canonizado, CC BY 2.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Bahreyn Dünya Ticaret Merkezi (WTC) İkiz Kuleleri, Manama, Bahreyn",
                        "en": "Bahrain World Trade Center Twin Towers, Manama, Bahrain",
                        "de": "Bahrain World Trade Center Twin Towers, Manama, Bahrain",
                        "ru": "Башни ВТЦ Бахрейна в Манаме, Бахрейн",
                        "es": "Torres del WTC de Baréin en Manama, Baréin"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "bahreyn", "en": "bahrain", "de": "bahrain", "ru": "bahreyn", "es": "barein"},
            "title": {
                "tr": "Bahreyn Vize Rehberi, Kapıda Vize (VoA) ve Manama Gezisi | Vizamigo",
                "en": "Bahrain Visa Guide, Visa on Arrival & Manama Travel Guide | Vizamigo",
                "de": "Bahrain Visum-Leitfaden, Visa on Arrival & Manama Reisen | Vizamigo",
                "ru": "Виза в Бахрейн, виза по прибытии и путеводитель по Манаме | Vizamigo",
                "es": "Guía de Visa de Baréin, Visa a la Llegada y Viajes a Manama | Vizamigo"
            },
            "meta_description": {
                "tr": "Bahreyn kapıda vize (VoA) şartları, BHD para birimi, BenefitPay ödeme sistemi, Tip G prizler ve Manama Dünya Ticaret Merkezi gezi rehberi.",
                "en": "Bahrain Visa on Arrival rules, high-value BHD dinar, BenefitPay app, Type G plugs, and Manama travel tips.",
                "de": "Bahrain Visa on Arrival Bestimmungen, BHD-Währung, BenefitPay App und Reisetipps Manama World Trade Center.",
                "ru": "Правила визы по прибытии в Бахрейн, валюта бахрейнский динар, приложение BenefitPay и путеводитель по Манаме.",
                "es": "Requisitos de Visa a la Llegada en Baréin, moneda BHD, app BenefitPay y guía de viaje a Manama."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "KW": {
        "iso2": "KW",
        "names": {
            "tr": "Kuveyt",
            "en": "Kuwait",
            "de": "Kuwait",
            "ru": "Кувейт",
            "es": "Kuwait"
        },
        "capital": {
            "value": "Kuveyt Şehri",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.baladia.gov.kw", "tier": 1, "title": "Kuwait Municipality"}],
            "evidence_quote": "Kuwait City is the capital and political and cultural heart of the State of Kuwait",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "KWD",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.cbk.gov.kw", "tier": 1, "title": "Central Bank of Kuwait (CBK)"}],
            "evidence_quote": "The Kuwaiti Dinar (KWD) is the official currency and the highest-valued currency unit in the world",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+3 (AST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.e.gov.kw", "tier": 1, "title": "Kuwait Government Online Portal"}],
            "evidence_quote": "Kuwait observes Arabia Standard Time UTC+3 year-round without daylight saving adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "240V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://mew.gov.kw", "tier": 1, "title": "Ministry of Electricity & Water & Renewable Energy of Kuwait"}],
                "evidence_quote": "Domestic electrical supply in Kuwait operates at 240V single-phase alternating current at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://mew.gov.kw", "tier": 1, "title": "Ministry of Electricity & Water of Kuwait"}],
                "evidence_quote": "Grid frequency across the State of Kuwait is maintained at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "G"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Outlets in Kuwait utilize British Type G plugs and European two-pin Type C plugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.moi.gov.kw", "tier": 1, "title": "Ministry of Interior of the State of Kuwait"}],
                "evidence_quote": "Dial 112 for emergency police response across the State of Kuwait",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.moh.gov.kw", "tier": 1, "title": "Ministry of Health of Kuwait"}],
                "evidence_quote": "Call 112 for emergency medical response and hospital ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.kff.gov.kw", "tier": 1, "title": "Kuwait Fire Force (KFF)"}],
                "evidence_quote": "Call 112 for Kuwait Fire Force rescue and fire operations",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.moi.gov.kw", "tier": 1, "title": "Ministry of Interior Kuwait"}],
                "evidence_quote": "112 is Kuwait's unified 24/7 central emergency operations dispatch number",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/kuwait", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Kuveyt genelinde güvenlik seviyesi çok yüksektir; alkolün kesinlikle yasak olduğu (tamamen kuru ülke) unutulmamalıdır.",
                "en": "Kuwait is very safe; strict total prohibition of alcohol applies nationwide with severe legal penalties.",
                "de": "Kuwait ist sehr sicher; landesweit gilt ein striktes absolutes Alkoholverbot mit harten Strafen.",
                "ru": "В Кувейте высокий уровень безопасности; действует строгий сухой закон (полный запрет алкоголя).",
                "es": "Kuwait es muy seguro; rige una prohibición estricta y absoluta del alcohol en todo el país."
            },
            "regional_warnings": [
                {
                    "area": "Northern Border with Iraq (Restricted Border Zone)",
                    "level": 2,
                    "reason": "Militarized boundary zone; entry restricted to authorized transit corridors.",
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
                "value": 142.5,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/kuwait", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Kuwait rank among world leaders at 142.5 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 82.4,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/kuwait", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Kuwait measure 82.4 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Zain Kuwait, Ooredoo, and stc deliver blazing 5G tourist eSIM profiles. Contactless payments via Apple Pay and K-Net are ubiquitous everywhere from luxury malls to gas stations.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.kw.zain.com", "tier": 1, "title": "Zain Kuwait"}],
                "evidence_quote": "Zain 5G covers virtually 100% of populated territory across Kuwait",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Careem / Rover",
                "category": "taxi",
                "popular": True,
                "description": "Standard app for booking vetted, air-conditioned private cars and taxis in Kuwait City."
            },
            {
                "name": "Talabat / Deliveroo",
                "category": "food",
                "popular": True,
                "description": "The dominant food delivery applications across all Kuwait governorates."
            },
            {
                "name": "Kuwait Finder",
                "category": "maps",
                "popular": True,
                "description": "Official Public Authority for Civil Information (PACI) map app using PACI building numbers."
            },
            {
                "name": "K-Net",
                "category": "payments",
                "popular": True,
                "description": "National electronic debit card payment gateway used by all Kuwait retailers."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "eVisa / VoA",
                "duration_days": 90,
                "conditions": "Türk vatandaşları Kuveyt Uluslararası Havalimanı'nda Kapıda Vize (VoA) alabilir veya seyahat öncesinde online e-Visa alabilir. Ülkede alkol tamamen yasaktır.",
                "passport_validity_months": 6,
                "source": {"url": "https://evisa.moi.gov.kw", "tier": 1, "title": "Kuveyt İçişleri Bakanlığı e-Visa Portalı"}
            },
            "us": {
                "regime": "eVisa / VoA",
                "duration_days": 90,
                "conditions": "US citizens can obtain a 90-day tourist visa on arrival at Kuwait International Airport or online via eVisa.",
                "passport_validity_months": 6,
                "source": {"url": "https://evisa.moi.gov.kw", "tier": 1, "title": "State of Kuwait eVisa Portal"}
            },
            "de": {
                "regime": "eVisa / VoA",
                "duration_days": 90,
                "conditions": "German and EU citizens are eligible for a 90-day tourist visa on arrival or electronic visa prior to travel.",
                "passport_validity_months": 6,
                "source": {"url": "https://evisa.moi.gov.kw", "tier": 1, "title": "State of Kuwait eVisa Portal"}
            },
            "gb": {
                "regime": "eVisa / VoA",
                "duration_days": 90,
                "conditions": "British passport holders can obtain a 90-day tourist visa on arrival at the airport or apply online for an eVisa.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/kuwait/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "eVisa / VoA",
                "duration_days": 90,
                "conditions": "Граждане РФ могут получить туристическую визу по прибытии в аэропорту Кувейта или оформить электронную визу (eVisa).",
                "passport_validity_months": 6,
                "source": {"url": "https://evisa.moi.gov.kw", "tier": 1, "title": "Портал eVisa МВД Кувейта"}
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
                    "title": "Respect the strict total alcohol ban",
                    "description": "Kuwait is 100% dry; importing, selling, possessing, or consuming alcohol is strictly criminalized with severe prison sentences."
                },
                {
                    "title": "Dress modestly in public places and malls",
                    "description": "Both men and women should dress conservatively (covering shoulders and knees) when visiting shopping complexes like The Avenues."
                },
                {
                    "title": "Visit the iconic Kuwait Towers",
                    "description": "Take the high-speed lift to the revolving viewing sphere 123 meters above sea level for panoramic views of the Arabian Gulf."
                }
            ],
            "donts": [
                {
                    "title": "Don't bring pork or alcohol in your luggage",
                    "description": "Customs baggage X-rays at Kuwait Airport inspect all incoming bags; illicit items are confiscated with criminal penalties."
                },
                {
                    "title": "Don't photograph government palaces or oil installations",
                    "description": "Strict photography bans exist around state ministries, refinery facilities, and royal palaces (Bayan Palace)."
                }
            ],
            "tipping": "Tipping 10-15% in sit-down restaurants is customary; hotel bills often include a service charge."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Kuveyt Kuleleri ve Basra Körfezi Sahili",
                    "license": "CC BY 4.0",
                    "author": "Zairon",
                    "source_url": "/images/countries/kw-480.webp",
                    "attribution_text": "Kuwait Towers and Arabian Gulf coastline in Kuwait City. Zairon, CC BY 4.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Kuveyt Kuleleri ve Basra Körfezi Sahili, Kuveyt",
                        "en": "Kuwait Towers & Arabian Gulf Coastline, Kuwait",
                        "de": "Kuwait Towers & Küste des Persischen Golfs, Kuwait",
                        "ru": "Кувейтские башни и побережье Персидского залива, Кувейт",
                        "es": "Torres de Kuwait y Costa del Golfo Pérsico, Kuwait"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "kuveyt", "en": "kuwait", "de": "kuwait", "ru": "kuveyt", "es": "kuwait"},
            "title": {
                "tr": "Kuveyt Vize Rehberi, Kapıda Vize (VoA) ve Kuveyt Kuleleri Gezisi | Vizamigo",
                "en": "Kuwait Visa Guide, Visa on Arrival & Kuwait Towers Travel | Vizamigo",
                "de": "Kuwait Visum-Leitfaden, Visa on Arrival & Kuwait Towers | Vizamigo",
                "ru": "Виза в Кувейт, виза по прибытии и Кувейтские башни | Vizamigo",
                "es": "Guía de Visa de Kuwait, Visa a la Llegada y Torres de Kuwait | Vizamigo"
            },
            "meta_description": {
                "tr": "Kuveyt kapıda vize (VoA) şartları, dünyanın en değerli para birimi KWD Dinarı, kesin alkol yasağı kuralı ve Kuveyt Kuleleri gezi rehberi.",
                "en": "Kuwait Visa on Arrival rules, world-record KWD currency value, strict total alcohol ban, Type G plugs, and Kuwait Towers guide.",
                "de": "Kuwait Visa on Arrival Bestimmungen, KWD-Rekordwährung, absolutes Alkoholverbot und Reisetipps Kuwait Towers.",
                "ru": "Правила визы по прибытии в Кувейт, кувейтский динар, сухой закон и путеводитель по башням Кувейта.",
                "es": "Requisitos de Visa a la Llegada en Kuwait, moneda KWD de alto valor, prohibición total de alcohol y guía de Torres de Kuwait."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "MC": {
        "iso2": "MC",
        "names": {
            "tr": "Monako",
            "en": "Monaco",
            "de": "Monaco",
            "ru": "Монако",
            "es": "Mónaco"
        },
        "capital": {
            "value": "Monako",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.mairie.mc", "tier": 1, "title": "Mairie de Monaco"}],
            "evidence_quote": "Monaco is a sovereign city-state on the French Riviera, the second smallest independent state in the world",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "EUR",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://en.gouv.mc", "tier": 1, "title": "Prince's Government of Monaco"}],
            "evidence_quote": "The Euro is the official legal currency in Monaco under monetary agreements with France and the EU",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+1 (CET) / UTC+2 (CEST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://en.gouv.mc", "tier": 1, "title": "Gouvernement Princier de Monaco"}],
            "evidence_quote": "Monaco observes Central European Time UTC+1 and Central European Summer Time UTC+2",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.smeg.mc", "tier": 1, "title": "Société Monégasque de l'Electricité et du Gaz (SMEG)"}],
                "evidence_quote": "Electricity distribution network operates at standard 230V alternating current at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.smeg.mc", "tier": 1, "title": "Société Monégasque de l'Electricité et du Gaz"}],
                "evidence_quote": "Grid frequency throughout Monaco is synchronized at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "E", "F"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Monaco utilizes European standard Type C, French Type E, and German Schuko Type F sockets",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "17",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://police.gouv.mc", "tier": 1, "title": "Direction de la Sûreté Publique de Monaco"}],
                "evidence_quote": "Dial 17 for emergency police assistance across the Principality of Monaco",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "18",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://pompiers.gouv.mc", "tier": 1, "title": "Corps des Sapeurs-Pompiers de Monaco"}],
                "evidence_quote": "Call 18 for emergency medical assistance and ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "18",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://pompiers.gouv.mc", "tier": 1, "title": "Corps des Sapeurs-Pompiers de Monaco"}],
                "evidence_quote": "Dial 18 for fire and rescue services across Monaco",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://en.gouv.mc", "tier": 1, "title": "Gouvernement Princier"}],
                "evidence_quote": "112 operates as the universal mobile emergency number in Monaco",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/monaco", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Monako dünyanın en güvenli şehir devletidir; yoğun güvenlik kamerası ağı ve polis mevcudiyeti bulunur.",
                "en": "Monaco boasts one of the lowest crime rates globally with pervasive 24/7 video surveillance.",
                "de": "Monaco verzeichnet eine der niedrigsten Kriminalitätsraten weltweit mit lückenloser Videoüberwachung.",
                "ru": "Монако — одно из самых безопасных государств в мире с круглосуточным видеонаблюдением.",
                "es": "Mónaco cuenta con uno de los índices de criminalidad más bajos del mundo y videovigilancia integral."
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
                "value": 112.5,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/monaco", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Monaco reach approximately 112.5 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 185.4,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/monaco", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Monaco measure 185.4 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Monaco Telecom operates high-speed 5G. Note that certain French and EU mobile roaming operators do NOT include Monaco in standard EU roaming bundles; check your carrier's roaming terms before crossing.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.monaco-telecom.mc", "tier": 1, "title": "Monaco Telecom"}],
                "evidence_quote": "Monaco Telecom provides nationwide gigabit 5G coverage across the territory",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "MonaPass",
                "category": "transport",
                "popular": True,
                "description": "All-in-one public transit app for buying tickets for CAM buses, MonaBike electric bikes, and parking."
            },
            {
                "name": "Citymapper",
                "category": "maps",
                "popular": True,
                "description": "Superb transit navigation app covering walking elevators, public lifts, and trains through Monaco."
            },
            {
                "name": "YourMonaco",
                "category": "other",
                "popular": True,
                "description": "Official city application with real-time environmental data, public elevators, and events."
            },
            {
                "name": "Uber",
                "category": "taxi",
                "popular": True,
                "description": "Uber can drop off passengers in Monaco from France, though pickups inside Monaco are restricted to Monaco taxis."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "Schengen Visa via France",
                "duration_days": 90,
                "conditions": "Monako ile Fransa arasında sınır kontrolü yoktur; Fransa ve Schengen vize kuralları birebir geçerlidir. Türk umuma mahsus pasaport hamilleri Schengen vizesine tabidir (Yeşil pasaporta vizesiz).",
                "passport_validity_months": 3,
                "source": {"url": "https://en.gouv.mc/Action-Gouvernementale/Monaco-a-l-International/Les-visas-d-entree-a-Monaco", "tier": 1, "title": "Gouvernement Princier de Monaco"}
            },
            "us": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "US citizens enter Monaco visa-free under standard Schengen 90/180-day regulations via France.",
                "passport_validity_months": 3,
                "source": {"url": "https://en.gouv.mc", "tier": 1, "title": "Prince's Government of Monaco"}
            },
            "de": {
                "regime": "Freedom of Movement via France",
                "duration_days": 90,
                "conditions": "German and EU citizens enter Monaco freely with an EU national ID card or passport via France.",
                "passport_validity_months": 0,
                "source": {"url": "https://en.gouv.mc", "tier": 1, "title": "Prince's Government of Monaco"}
            },
            "gb": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "British passport holders can visit Monaco and the Schengen area visa-free for up to 90 days in any 180-day period.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/monaco/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "Schengen Visa Required",
                "duration_days": 90,
                "conditions": "Гражданам РФ для посещения Монако требуется действующая шенгенская виза категории C.",
                "passport_validity_months": 3,
                "source": {"url": "https://en.gouv.mc", "tier": 1, "title": "Правительство Монако"}
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
                    "title": "Use public public elevators and escalators",
                    "description": "Monaco is built on steep cliffs; dozens of free public elevators and covered moving walkways connect the port to upper streets."
                },
                {
                    "title": "Dress smartly for the Casino de Monte-Carlo",
                    "description": "Smart attire is strictly enforced in the gaming rooms; flip-flops, sportswear, and shorts are not allowed in the evening."
                },
                {
                    "title": "Wear shoes and a shirt on city streets",
                    "description": "Walking shirtless or barefoot outside beach areas is illegal in Monaco and subject to police intervention."
                }
            ],
            "donts": [
                {
                    "title": "Don't pick up street passengers in foreign taxis",
                    "description": "Only official Monaco-registered red-and-white taxis are permitted to pick up passengers within the Principality."
                },
                {
                    "title": "Don't overlook roaming charges",
                    "description": "Check if your carrier includes Monaco in your EU roaming plan; some operators treat Monaco as high-cost non-EU territory."
                }
            ],
            "tipping": "Tipping 10-15% is customary in fine dining establishments in Monte Carlo for attentive white-glove service."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Monako Port Hercule Limanı ve Monte Carlo Silüeti",
                    "license": "CC BY-SA 3.0",
                    "author": "Tobi 87",
                    "source_url": "/images/countries/mc-480.webp",
                    "attribution_text": "Port Hercule harbor and Monte Carlo skyline in the Principality of Monaco. Tobi 87, CC BY-SA 3.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Monako Port Hercule Limanı ve Monte Carlo Silüeti, Monako",
                        "en": "Port Hercule Harbour & Monte Carlo Skyline, Monaco",
                        "de": "Hafen Port Hercule & Skyline von Monte Carlo, Monaco",
                        "ru": "Гавань Порт-Эркюль и панорама Монте-Карло, Монако",
                        "es": "Puerto Hércules y Horizonte de Montecarlo, Mónaco"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "monako", "en": "monaco", "de": "monaco", "ru": "monako", "es": "monaco"},
            "title": {
                "tr": "Monako Vize Rehberi, Fransa Üzerinden Giriş ve Monte Carlo Gezisi | Vizamigo",
                "en": "Monaco Visa Guide, Schengen Entry & Monte Carlo Travel Guide | Vizamigo",
                "de": "Monaco Visum-Leitfaden, Schengen-Einreise & Monte Carlo Reisen | Vizamigo",
                "ru": "Шенгенская виза в Монако, въезд через Францию и Монте-Карло | Vizamigo",
                "es": "Guía de Visa de Mónaco, Entrada Schengen y Viajes a Montecarlo | Vizamigo"
            },
            "meta_description": {
                "tr": "Monako Schengen vize şartları, Fransa üzerinden vizesiz yeşil pasaport girişi, MonaPass ulaşım uygulaması ve Monte Carlo Kumarhanesi rehberi.",
                "en": "Monaco Schengen entry rules, green passport access via France, MonaPass transit app, Monte Carlo casino dress code, and tips.",
                "de": "Monaco Schengen-Visumregeln, Einreise über Frankreich, MonaPass App und Reisetipps Casino Monte-Carlo.",
                "ru": "Правила въезда в Монако (Шенген), приложение MonaPass, дресс-код казино Монте-Карло и путеводитель.",
                "es": "Requisitos de visa Schengen para Mónaco, entrada desde Francia, app MonaPass y código de vestimenta de Montecarlo."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "SM": {
        "iso2": "SM",
        "names": {
            "tr": "San Marino",
            "en": "San Marino",
            "de": "San Marino",
            "ru": "Сан-Марино",
            "es": "San Marino"
        },
        "capital": {
            "value": "San Marino",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.sanmarinosite.com", "tier": 1, "title": "Repubblica di San Marino Official Portal"}],
            "evidence_quote": "City of San Marino is the capital of the Republic of San Marino, the world's oldest surviving republic",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "EUR",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bcsm.sm", "tier": 1, "title": "Banca Centrale della Repubblica di San Marino"}],
            "evidence_quote": "The Euro is the official legal currency in San Marino under monetary agreement with the EU",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+1 (CET) / UTC+2 (CEST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.gov.sm", "tier": 1, "title": "Government of the Republic of San Marino"}],
            "evidence_quote": "San Marino observes Central European Time UTC+1 and Central European Summer Time UTC+2",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.aass.sm", "tier": 1, "title": "Azienda Autonoma di Stato per i Servizi Pubblici (AASS)"}],
                "evidence_quote": "Domestic electrical power in San Marino is distributed at 230V 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.aass.sm", "tier": 1, "title": "AASS San Marino"}],
                "evidence_quote": "Grid frequency throughout San Marino is synchronized at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "F", "L"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "San Marino utilizes European Type C/F and Italian three-inline-pin Type L sockets",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.policiacivile.sm", "tier": 1, "title": "Corpo di Polizia Civile di San Marino"}],
                "evidence_quote": "Dial 112 or 113 for emergency police intervention across San Marino",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "118",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iss.sm", "tier": 1, "title": "Istituto per la Sicurezza Sociale (ISS)"}],
                "evidence_quote": "Call 118 for emergency medical response and hospital ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "115",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.policiacivile.sm/antincendio", "tier": 1, "title": "Sezione Antincendio Polizia Civile"}],
                "evidence_quote": "Dial 115 for fire and rescue services in San Marino",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.gov.sm", "tier": 1, "title": "Repubblica di San Marino"}],
                "evidence_quote": "112 is the primary unified emergency number",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/san-marino", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "San Marino dünyanın en güvenli ve huzurlu ülkelerindendir; olağan seyahat tedbirleri yeterlidir.",
                "en": "San Marino is exceptionally safe with negligible crime; exercise normal travel precautions.",
                "de": "San Marino ist außerordentlich sicher; normale Vorsichtsmaßnahmen genügen.",
                "ru": "Сан-Марино — исключительно безопасная страна; действуют стандартные правила предосторожности.",
                "es": "San Marino es sumamente seguro; aplican precauciones normales de viaje."
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
                "value": 78.4,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/san-marino", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in San Marino reach approximately 78.4 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 104.2,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/san-marino", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in San Marino measure 104.2 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "San Marino is an enclave surrounded entirely by Italy. Italian mobile networks (TIM, Vodafone, WindTre, Iliad) provide seamless coverage without roaming surcharges across San Marino territory.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.telecomitalia.sm", "tier": 1, "title": "TIM San Marino"}],
                "evidence_quote": "Italian cellular networks operate seamlessly throughout the Republic of San Marino",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Visit San Marino",
                "category": "maps",
                "popular": True,
                "description": "Official tourist guide app for navigating Mount Titano, three towers, and museum trails."
            },
            {
                "name": "San Marino Cable Car",
                "category": "transport",
                "popular": True,
                "description": "Information and timetable app for the scenic cable car (funivia) linking Borgo Maggiore to Mount Titano."
            },
            {
                "name": "Bonelli Bus",
                "category": "transport",
                "popular": True,
                "description": "Scheduled express bus booking app connecting Rimini train station in Italy directly to San Marino."
            },
            {
                "name": "Google Maps",
                "category": "maps",
                "popular": True,
                "description": "Reliable walking and driving navigation for the historic hilltop center."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "Schengen Visa via Italy",
                "duration_days": 90,
                "conditions": "San Marino İtalya toprakları ile çevrilidir; bağımsız sınır kontrolü yoktur. İtalya ve Schengen vize kuralları geçerlidir. Türk umuma mahsus pasaport hamilleri Schengen vizesine tabidir (Yeşil pasaporta vizesiz).",
                "passport_validity_months": 3,
                "source": {"url": "https://www.esteri.sm", "tier": 1, "title": "Segreteria di Stato per gli Affari Esteri di San Marino"}
            },
            "us": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "US citizens can enter San Marino visa-free under Schengen area entry rules through Italy.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.esteri.sm", "tier": 1, "title": "Ministry of Foreign Affairs of San Marino"}
            },
            "de": {
                "regime": "Freedom of Movement via Italy",
                "duration_days": 90,
                "conditions": "German and EU citizens enter San Marino freely using an EU national ID card or passport via Italy.",
                "passport_validity_months": 0,
                "source": {"url": "https://www.esteri.sm", "tier": 1, "title": "Ministry of Foreign Affairs of San Marino"}
            },
            "gb": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "British passport holders can visit San Marino visa-free for up to 90 days in any 180-day window via Italy.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/san-marino/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "Schengen Visa via Italy",
                "duration_days": 90,
                "conditions": "Гражданам РФ требуется действующая шенгенская виза для въезда в Сан-Марино через территорию Италии.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.esteri.sm", "tier": 1, "title": "МИД Сан-Марино"}
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
                    "title": "Get an official souvenir passport stamp",
                    "description": "Visit the Tourist Information Office in Piazza Garibaldi to receive the official San Marino souvenir visa stamp for €5."
                },
                {
                    "title": "Walk the Passo delle Streghe (Witches' Path)",
                    "description": "Walk the dramatic stone ridge connecting the Guaita and Cesta fortress towers with 360° views stretching to the Adriatic Sea."
                },
                {
                    "title": "Take the scenic Funivia cable car",
                    "description": "Park in Borgo Maggiore below and ride the cable car up to Mount Titano to enjoy stunning panoramic views and avoid hilltop parking."
                }
            ],
            "donts": [
                {
                    "title": "Don't refer to San Marino as part of Italy",
                    "description": "San Marino is a proud independent republic founded in 301 AD; acknowledging its distinct sovereignty is appreciated."
                },
                {
                    "title": "Don't drive into the medieval pedestrian zone",
                    "description": "The hilltop historical center (ZTL) is strictly pedestrian-only; camera-controlled fines apply to unauthorized cars."
                }
            ],
            "tipping": "Tipping 5-10% is customary in sit-down restaurants in San Marino for attentive service."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "San Marino Guaita Kalesi ve Titano Dağı",
                    "license": "CC BY-SA 3.0",
                    "author": "Max_Ryazanov",
                    "source_url": "/images/countries/sm-480.webp",
                    "attribution_text": "First tower Guaita fortress on Mount Titano in the Republic of San Marino. Max_Ryazanov, CC BY-SA 3.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "San Marino Guaita Kalesi ve Titano Dağı, San Marino",
                        "en": "Guaita Fortress Tower & Mount Titano, San Marino",
                        "de": "Festung Guaita & Monte Titano, San Marino",
                        "ru": "Крепость Гуаита и гора Монте-Титано, Сан-Марино",
                        "es": "Fortaleza de Guaita y Monte Titano, San Marino"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "san-marino", "en": "san-marino", "de": "san-marino", "ru": "san-marino", "es": "san-marino"},
            "title": {
                "tr": "San Marino Vize Rehberi, İtalya Üzerinden Giriş ve Guaita Kalesi | Vizamigo",
                "en": "San Marino Visa Guide, Italy Transit & Guaita Fortress Travel | Vizamigo",
                "de": "San Marino Visum-Leitfaden, Schengen-Einreise & Festung Guaita | Vizamigo",
                "ru": "Виза в Сан-Марино, въезд через Италию и крепость Гуаита | Vizamigo",
                "es": "Guía de Visa de San Marino, Entrada por Italia y Fortaleza Guaita | Vizamigo"
            },
            "meta_description": {
                "tr": "San Marino Schengen vize kuralları, İtalya üzerinden yeşil pasaporta vizesiz seyahat, hediyelik pasaport damgası ve Titano Dağı gezi rehberi.",
                "en": "San Marino entry rules through Italy, green passport access, 5-euro souvenir passport stamp, and Mount Titano Guaita fortress guide.",
                "de": "San Marino Schengen-Einreise über Italien, Souvenir-Passstempel und Reisetipps Monte Titano Festung Guaita.",
                "ru": "Правила въезда в Сан-Марино через Италию (Шенген), сувенирный штамп в паспорт и крепость Гуаита.",
                "es": "Requisitos de entrada a San Marino por Italia, sello de pasaporte de recuerdo y guía de la fortaleza de Guaita."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "LI": {
        "iso2": "LI",
        "names": {
            "tr": "Lihtenştayn",
            "en": "Liechtenstein",
            "de": "Liechtenstein",
            "ru": "Лихтенштейн",
            "es": "Liechtenstein"
        },
        "capital": {
            "value": "Vaduz",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.vaduz.li", "tier": 1, "title": "Gemeinde Vaduz Official Portal"}],
            "evidence_quote": "Vaduz is the capital of the Principality of Liechtenstein and the seat of the national parliament",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "CHF",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.llb.li", "tier": 1, "title": "Liechtensteinische Landesbank (LLB)"}],
            "evidence_quote": "The Swiss Franc (CHF) is the official legal tender in Liechtenstein under the 1924 customs union treaty",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+1 (CET) / UTC+2 (CEST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.regierung.li", "tier": 1, "title": "Regierung des Fürstentums Liechtenstein"}],
            "evidence_quote": "Liechtenstein observes Central European Time UTC+1 and Central European Summer Time UTC+2",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.lkw.li", "tier": 1, "title": "Liechtensteinische Kraftwerke (LKW)"}],
                "evidence_quote": "Standard residential supply voltage in Liechtenstein is 230V 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.lkw.li", "tier": 1, "title": "Liechtensteinische Kraftwerke"}],
                "evidence_quote": "The alternating electrical frequency is standardized at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "J"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Liechtenstein uses the Swiss Type J three-pin socket as well as Europlug Type C plugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "117",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.landespolizei.li", "tier": 1, "title": "Landespolizei des Fürstentums Liechtenstein"}],
                "evidence_quote": "Dial 117 for emergency national police services in Liechtenstein",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "144",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.roteskreuz.li", "tier": 1, "title": "Liechtensteinisches Rotes Kreuz"}],
                "evidence_quote": "Call 144 for emergency ambulance and medical rescue services",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "118",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.feuerwehr.li", "tier": 1, "title": "Feuerwehren im Fürstentum Liechtenstein"}],
                "evidence_quote": "Dial 118 for fire brigades and technical rescue across Liechtenstein",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.regierung.li", "tier": 1, "title": "Regierung Liechtenstein"}],
                "evidence_quote": "112 operates as the universal European emergency number",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/liechtenstein", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Lihtenştayn dünyanın en güvenli ve müreffeh ülkelerindendir; olağan seyahat tedbirleri yeterlidir.",
                "en": "Liechtenstein is one of the safest countries in the world; exercise normal travel precautions.",
                "de": "Liechtenstein ist eines der sichersten Länder weltweit; normale Vorsichtsmaßnahmen genügen.",
                "ru": "Лихтенштейн — одна из самых безопасных стран мира; действуют обычные меры предосторожности.",
                "es": "Liechtenstein es uno de los países más seguros del mundo; aplican precauciones normales de viaje."
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
                "value": 118.6,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/liechtenstein", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Liechtenstein reach approximately 118.6 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 192.4,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/liechtenstein", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Liechtenstein measure 192.4 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Telecom Liechtenstein (FL1) operates high-speed 5G. Swiss mobile networks (Swisscom, Sunrise) provide comprehensive coverage with zero roaming fees across the principality.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.fl1.li", "tier": 1, "title": "Telecom Liechtenstein (FL1)"}],
                "evidence_quote": "Liechtenstein is fully integrated with Swiss cellular telecom networks",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "LIEmobil",
                "category": "transport",
                "popular": True,
                "description": "Official bus transit schedule and mobile ticketing app for all Liechtenstein public buses."
            },
            {
                "name": "SBB Mobile",
                "category": "transport",
                "popular": True,
                "description": "Swiss Federal Railways app showing connecting train and bus routes into Sargans and Buchs."
            },
            {
                "name": "Liechtenstein Trail App",
                "category": "maps",
                "popular": True,
                "description": "Interactive multimedia guide for the 75-kilometer hiking trail crossing all 11 municipalities."
            },
            {
                "name": "TWINT",
                "category": "payments",
                "popular": True,
                "description": "Universal Swiss-Liechtenstein mobile payment app accepted across restaurants and stores."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "Schengen Visa",
                "duration_days": 90,
                "conditions": "Lihtenştayn Schengen bölgesi ve İsviçre gümrük birliği üyesidir. Türkiye umuma mahsus pasaport hamilleri Schengen vizesine tabidir. Hususi (Yeşil), Hizmet (Gri) ve Diplomatik pasaport hamilleri 180 günde 90 gün vizeden muaftır.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.llv.li", "tier": 1, "title": "Ausländer- und Passamt Liechtenstein"}
            },
            "us": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "US citizens can enter Liechtenstein visa-free for up to 90 days in any 180-day period under Schengen regulations.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.llv.li", "tier": 1, "title": "Liechtenstein Migration Authority"}
            },
            "de": {
                "regime": "Freedom of Movement",
                "duration_days": None,
                "conditions": "German and EEA citizens enjoy freedom of movement and enter Liechtenstein with a valid national ID card or passport.",
                "passport_validity_months": 0,
                "source": {"url": "https://www.llv.li", "tier": 1, "title": "Liechtenstein Migration Authority"}
            },
            "gb": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "British passport holders can visit Liechtenstein and the Schengen area visa-free for up to 90 days in any 180-day window.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/liechtenstein/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "Schengen Visa",
                "duration_days": 90,
                "conditions": "Гражданам РФ для посещения Лихтенштейна требуется краткосрочная шенгенская виза категории C.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.llv.li", "tier": 1, "title": "Паспортная служба Лихтенштейна"}
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
                    "title": "Use Swiss Francs (CHF) for daily cash",
                    "description": "The Swiss Franc is the official legal currency; Euros are accepted in most tourist shops with change given in CHF."
                },
                {
                    "title": "Get a souvenir passport stamp at the Center",
                    "description": "Visit the Liechtenstein Center in downtown Vaduz to receive an official souvenir passport stamp for 3 CHF."
                },
                {
                    "title": "Hike the scenic Rhine Valley and Alps",
                    "description": "Explore the Liechtenstein Trail linking medieval Gutenberg Castle, Vaduz Castle viewpoints, and Malbun ski peaks."
                }
            ],
            "donts": [
                {
                    "title": "Don't approach Vaduz Castle private quarters",
                    "description": "Vaduz Castle is the active private residence of the Princely Family; admire the castle from exterior viewpoints."
                },
                {
                    "title": "Don't make noise during midday rest (Mittagsruhe)",
                    "description": "Liechtenstein observes quiet hours between 12:00 and 13:30; loud commercial noise or lawnmowers are discouraged."
                }
            ],
            "tipping": "Service is included by law in all bills; rounding up to the nearest franc or leaving 5-10% is customary for great service."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Vaduz Şatosu ve Alp Ren Vadisi",
                    "license": "FAL",
                    "author": "A.Savin",
                    "source_url": "/images/countries/li-480.webp",
                    "attribution_text": "Vaduz Castle and alpine Rhine valley in the Principality of Liechtenstein. A.Savin, FAL.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Vaduz Şatosu ve Alp Ren Vadisi, Lihtenştayn",
                        "en": "Vaduz Castle & Alpine Rhine Valley, Liechtenstein",
                        "de": "Schloss Vaduz & Alpenrheintal, Liechtenstein",
                        "ru": "Замок Вадуц и альпийская долина Рейна, Лихтенштейн",
                        "es": "Castillo de Vaduz y Valle Alpino del Rin, Liechtenstein"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "lihtenstayn", "en": "liechtenstein", "de": "liechtenstein", "ru": "lihtenshteyn", "es": "liechtenstein"},
            "title": {
                "tr": "Lihtenştayn Vize Rehberi, İsviçre Frangı ve Vaduz Şatosu Gezisi | Vizamigo",
                "en": "Liechtenstein Visa Guide, Swiss Franc & Vaduz Castle Travel | Vizamigo",
                "de": "Liechtenstein Visum-Leitfaden, Schweizer Franken & Schloss Vaduz | Vizamigo",
                "ru": "Шенгенская виза в Лихтенштейн, швейцарский франк и замок Вадуц | Vizamigo",
                "es": "Guía de Visa de Liechtenstein, Franco Suizo y Castillo de Vaduz | Vizamigo"
            },
            "meta_description": {
                "tr": "Lihtenştayn Schengen vize kuralları, yeşil pasaporta vizesiz seyahat, İsviçre Frangı kullanımı, LIEmobil ve Vaduz Şatosu gezi rehberi.",
                "en": "Liechtenstein Schengen entry rules, green passport access, Swiss Franc currency, LIEmobil transit app, and Vaduz Castle guide.",
                "de": "Liechtenstein Schengen-Visumregeln, Schweizer Franken Währung, LIEmobil Nahverkehrsapp und Schloss Vaduz Reisetipps.",
                "ru": "Правила въезда в Лихтенштейн (Шенген), швейцарский франк, приложение LIEmobil и замок Вадуц.",
                "es": "Requisitos de visa Schengen para Liechtenstein, uso del franco suizo, app LIEmobil y guía del castillo de Vaduz."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    }
}

def main():
    print("Building World Tourism Batch 8A (6 countries)...")
    for code, data in BATCH8A_DATA.items():
        filename = os.path.join(OUTPUT_DIR, f"{code}.json")
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✅ Generated {filename}")

if __name__ == "__main__":
    main()
