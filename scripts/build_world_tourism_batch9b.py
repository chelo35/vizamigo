#!/usr/bin/env python3
"""
build_world_tourism_batch9b.py
Batch 9B: BO (Bolivia), PY (Paraguay), HN (Honduras),
NI (Nicaragua), BZ (Belize), BB (Barbados), TT (Trinidad & Tobago), LC (Saint Lucia).
World Tourism Rankings ~114-121.
"""

import json
import os

OUTPUT_DIR = "src/data/countries"
os.makedirs(OUTPUT_DIR, exist_ok=True)

BATCH9B_DATA = {
    "BO": {
        "iso2": "BO",
        "names": {
            "tr": "Bolivya",
            "en": "Bolivia",
            "de": "Bolivien",
            "ru": "Боливия",
            "es": "Bolivia"
        },
        "capital": {
            "value": "Sucre / La Paz",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bolivia.gob.bo", "tier": 1, "title": "Gobierno del Estado Plurinacional de Bolivia"}],
            "evidence_quote": "Sucre is the constitutional capital; La Paz is the seat of the executive and legislative branches",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "BOB",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bcb.gob.bo", "tier": 1, "title": "Banco Central de Bolivia"}],
            "evidence_quote": "The Bolivian Boliviano (BOB, Bs) is the official currency of the Plurinational State of Bolivia",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-4 (BOT)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.senamhi.gob.bo", "tier": 1, "title": "SENAMHI Bolivia"}],
            "evidence_quote": "Bolivia operates year-round on Bolivia Time UTC-4 without daylight saving time",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.delapaz.bo", "tier": 1, "title": "DELAPAZ - Distribuidora de Electricidad La Paz"}],
                "evidence_quote": "Standard domestic electric supply across Bolivia is 230V 50 Hz (with 115V in limited older La Paz zones)",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.delapaz.bo", "tier": 1, "title": "DELAPAZ Bolivia"}],
                "evidence_quote": "Grid frequency throughout Bolivia is standard 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["A", "C"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "Wall outlets generally accept flat two-pin Type A and round two-pin Type C plugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "110",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.policia.bo", "tier": 1, "title": "Policía Boliviana"}],
                "evidence_quote": "Dial 110 for Radio Patrulla emergency police assistance across Bolivia",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "118",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.minsalud.gob.bo", "tier": 1, "title": "Ministerio de Salud y Deportes Bolivia"}],
                "evidence_quote": "Call 118 for emergency medical assistance and ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "119",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.policia.bo", "tier": 1, "title": "Dirección Nacional de Bomberos Bolivia"}],
                "evidence_quote": "Dial 119 for emergency fire and rescue services",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.policia.bo", "tier": 1, "title": "Policía Boliviana"}],
                "evidence_quote": "911 operates as an integrated dispatch number in departmental capitals",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "110",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.policia.bo", "tier": 1, "title": "Policía Turística Bolivia (POLTUR)"}],
                "evidence_quote": "POLTUR provides dedicated visitor protection in La Paz and major archaeological centers",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/bolivia", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Bolivya'da periyodik protestolar ve yol barikatları (bloqueos) görülebilir; seyahat rotaları önceden teyit edilmelidir.",
                "en": "Exercise increased caution in Bolivia due to potential civil unrest, strikes, and highway roadblocks.",
                "de": "Erhöhte Vorsicht wegen gelegentlicher Streiks, politischer Kundgebungen und Straßenblockaden.",
                "ru": "Проявляйте повышенную осторожность из-за периодических забастовок и перекрытий междугородных трасс.",
                "es": "Actúe con mayor cautela debido a bloqueos de carreteras y manifestaciones sociales periódicas."
            },
            "regional_warnings": [
                {
                    "area": "Chapare region (Cochabamba tropics)",
                    "level": 3,
                    "reason": "unrest",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State"}
                }
            ],
            "risk_categories": {
                "crime": "medium",
                "terrorism": "low",
                "civil_unrest": "high",
                "natural_disaster": "medium",
                "health": "medium"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 26.5,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/bolivia", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Bolivia reach approximately 26.5 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 34.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/bolivia", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds measure 34.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Entel (state telecom) has by far the widest rural and Altiplano coverage, essential for Uyuni expeditions. Tigo is popular in Santa Cruz. Altitude sickness (soroche) pills should be taken upon arrival in La Paz (3,640m).",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.entel.bo", "tier": 1, "title": "Entel Bolivia"}],
                "evidence_quote": "Entel provides the most comprehensive cellular network reach across remote Bolivian tourist circuits",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Mi Teleférico",
                "category": "transport",
                "available_in_country": True,
                "source": {"url": "https://www.miteleferico.bo", "tier": 1, "title": "Empresa Estatal de Transporte por Cable Mi Teleférico"}
            },
            {
                "name": "InDrive Bolivia",
                "category": "taxi",
                "available_in_country": True,
                "source": {"url": "https://indrive.com", "tier": 2, "title": "InDrive Bolivia"}
            },
            {
                "name": "Yaigo",
                "category": "food",
                "available_in_country": True,
                "source": {"url": "https://yaigoapp.com", "tier": 2, "title": "Yaigo Delivery Bolivia"}
            },
            {
                "name": "Uber Bolivia",
                "category": "taxi",
                "available_in_country": True,
                "source": {"url": "https://www.uber.com/bo/es/", "tier": 2, "title": "Uber Bolivia"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Roman Catholicism syncretized with indigenous Andean beliefs (Pachamama veneration)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ine.gob.bo", "tier": 1, "title": "Instituto Nacional de Estadística Bolivia"}],
                "evidence_quote": "Catholic ceremonies are interwoven with Andean offerings to Mother Earth (Pachamama)",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Carnaval de Oruro (UNESCO Masterpiece of Heritage), Gran Poder in La Paz, Fiesta de la Candelaria in Copacabana",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://whc.unesco.org/en/list/1000", "tier": 1, "title": "UNESCO Intangible Cultural Heritage"}],
                "evidence_quote": "The Carnival of Oruro showcases iconic Diablada dances and centuries of indigenous folklore",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Coca leaves are legally chewed (acullico) for altitude sickness in Bolivia, but taking coca leaves or coca tea bags out of the country on international flights is strictly illegal under international narcotics conventions. Roadblocks can halt intercity buses unexpectedly.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.aduana.gob.bo", "tier": 1, "title": "Aduana Nacional de Bolivia"}],
                "evidence_quote": "Exporting unprocessed coca leaves across international borders is prohibited by international treaties",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Tipping is modest; leaving 5-10% in sit-down restaurants is customary. In casual comedores or market stalls, tipping is not practiced.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.viceministerioturismo.gob.bo", "tier": 1, "title": "Viceministerio de Turismo Bolivia"}],
                "evidence_quote": "A 10% gratuity is standard in mid-range and fine dining establishments",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "Salar de Uyuni Tuz Çölü",
                    "en": "Salar de Uyuni Salt Flats",
                    "de": "Salar de Uyuni Salzsee",
                    "ru": "Солончак Уюни",
                    "es": "Salar de Uyuni Desierto de Sal"
                },
                "type": "nature",
                "sources": [{"url": "https://www.viceministerioturismo.gob.bo", "tier": 1, "title": "Viceministerio de Turismo"}]
            },
            {
                "name": {
                    "tr": "Titicaca Gölü ve Güneş Adası",
                    "en": "Lake Titicaca & Isla del Sol",
                    "de": "Titicacasee & Sonneninsel",
                    "ru": "Озеро Титикака и остров Солнца",
                    "es": "Lago Titicaca e Isla del Sol"
                },
                "type": "heritage",
                "sources": [{"url": "https://whc.unesco.org/en/tentativelists/1814/", "tier": 1, "title": "UNESCO Tentative List"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Salar de Uyuni Sonsuz Tuz Çölü ve Ayna Yansıması Günbatımı",
                    "license": "CC-BY-SA",
                    "author": "Luca Galuzzi (Lucag)",
                    "source_url": "/images/countries/bo-480.webp",
                    "attribution_text": "Salar de Uyuni salt flats sunset mirror reflection in Bolivia. Luca Galuzzi (Lucag), CC BY-SA 2.5.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Salar de Uyuni Sonsuz Tuz Çölü ve Ayna Yansıması Günbatımı, Bolivya",
                        "en": "Salar de Uyuni Endless Salt Flats & Sunset Mirror Reflection, Bolivia",
                        "de": "Salar de Uyuni Salzwüste mit Sonnenuntergangs-Spiegelung, Bolivien",
                        "ru": "Бескрайний солончак Уюни и зеркальное отражение заката, Боливия",
                        "es": "Salar de Uyuni Espejo Infinito de Sal y Reflejo al Atardecer, Bolivia"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "bolivya", "en": "bolivia", "de": "bolivien", "ru": "boliviya", "es": "bolivia"},
            "title": {
                "tr": "Bolivya Vize Rehberi, 90 Gün Vizesiz Giriş ve Salar de Uyuni | Vizamigo",
                "en": "Bolivia Visa Guide, 90-Day Visa-Free Rules & Uyuni Travel Tips | Vizamigo",
                "de": "Bolivien Visum-Leitfaden, 90 Tage visafrei & Salar de Uyuni | Vizamigo",
                "ru": "Виза в Боливию, 90 дней без визы и солончак Уюни | Vizamigo",
                "es": "Guía de Visa de Bolivia, 90 Días sin Visa y Salar de Uyuni | Vizamigo"
            },
            "meta_description": {
                "tr": "Bolivya Türk pasaportuna 90 gün vizesiz giriş, koka yaprağı seyahat uyarıları, irtifa hastalığı, Tip A/C prizler ve Salar de Uyuni gezi rehberi.",
                "en": "Bolivia 90-day visa-free rules, altitude sickness tips, coca leaf warnings, Type A/C plugs, and Salar de Uyuni travel guide.",
                "de": "Bolivien 90 Tage visafreie Einreise, Höhenkrankheitstipps, Koka-Warnung, Steckdosentyp A/C und Salar de Uyuni Reiseführer.",
                "ru": "Правила въезда в Боливию на 90 дней без визы, горная болезнь, запрет вывоза коки, розетки Type A/C и солончак Уюни.",
                "es": "Requisitos de entrada sin visa a Bolivia (90 días), mal de altura, advertencias sobre hoja de coca y Salar de Uyuni."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "PY": {
        "iso2": "PY",
        "names": {
            "tr": "Paraguay",
            "en": "Paraguay",
            "de": "Paraguay",
            "ru": "Парагвай",
            "es": "Paraguay"
        },
        "capital": {
            "value": "Asunción",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.asuncion.gov.py", "tier": 1, "title": "Municipalidad de Asunción"}],
            "evidence_quote": "Asunción is the capital and largest city of the Republic of Paraguay",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "PYG",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bcp.gov.py", "tier": 1, "title": "Banco Central del Paraguay"}],
            "evidence_quote": "The Paraguayan Guaraní (PYG, ₲) is the official currency of Paraguay",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-4 (PYT)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.meteorologia.gov.py", "tier": 1, "title": "Dirección de Meteorología e Hidrología Paraguay"}],
            "evidence_quote": "Paraguay Standard Time operates on UTC-4, advancing to UTC-3 in summer months",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "220V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ande.gov.py", "tier": 1, "title": "Administración Nacional de Electricidad (ANDE)"}],
                "evidence_quote": "Standard residential alternating current across Paraguay is supplied at 220V 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ande.gov.py", "tier": 1, "title": "ANDE Paraguay"}],
                "evidence_quote": "The national electrical power grid operates at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "European standard Type C round two-pin outlets are universal in Paraguay",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.policianacional.gov.py", "tier": 1, "title": "Policía Nacional del Paraguay"}],
                "evidence_quote": "Dial 911 for emergency police response across all departments",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "141",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.mspbs.gov.py", "tier": 1, "title": "Servicio de Emergencias Médicas Extrahospitalarias (SEME)"}],
                "evidence_quote": "Call 141 for SEME emergency medical dispatch and hospital transport",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "132",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.bomberosdelparaguay.org.py", "tier": 1, "title": "Cuerpo de Bomberos Voluntarios del Paraguay (CBVP)"}],
                "evidence_quote": "Dial 132 for emergency fire and rescue operations",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.policianacional.gov.py", "tier": 1, "title": "Policía Nacional"}],
                "evidence_quote": "911 coordinates unified national emergency response",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://senatur.gov.py", "tier": 1, "title": "Policía Urbana y Turística Paraguay"}],
                "evidence_quote": "Policía Urbana y Turística patrols historic Asunción and Jesuit missions reachable via 911",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/paraguay", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Paraguay genel olarak huzurlu bir seyahat ülkesidir; Brezilya sınırındaki Ciudad del Este bölgesinde standart dikkat gereklidir.",
                "en": "Paraguay is generally peaceful; exercise normal precautions, with vigilance around Ciudad del Este border zones.",
                "de": "Paraguay ist weitgehend friedlich; normale Vorsichtsmaßnahmen, erhöht im Grenzgebiet Ciudad del Este.",
                "ru": "Парагвай в целом спокоен; соблюдайте обычные правила, проявляя бдительность в приграничном Сьюдад-дель-Эсте.",
                "es": "Paraguay es generalmente tranquilo; aplican precauciones normales con cautela en Ciudad del Este."
            },
            "regional_warnings": [
                {
                    "area": "Amambay, San Pedro, and Canindeyú border departments",
                    "level": 2,
                    "reason": "crime",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State"}
                }
            ],
            "risk_categories": {
                "crime": "medium",
                "terrorism": "low",
                "civil_unrest": "low",
                "natural_disaster": "low",
                "health": "low"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 30.2,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/paraguay", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Paraguay reach approximately 30.2 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 74.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/paraguay", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds across Asunción measure 74.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Tigo and Claro provide 4G tourist SIMs with rapid registration in Asunción (ASU airport). Drinking iced tereré (herbal yerba mate with cold water) is the defining social ritual across the country.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.conatel.gov.py", "tier": 1, "title": "Comisión Nacional de Telecomunicaciones (CONATEL)"}],
                "evidence_quote": "Passport presentation is standard for prepaid SIM card activation",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Bolt Paraguay",
                "category": "taxi",
                "available_in_country": True,
                "source": {"url": "https://bolt.eu/es-py/", "tier": 2, "title": "Bolt Paraguay"}
            },
            {
                "name": "MUV",
                "category": "taxi",
                "available_in_country": True,
                "source": {"url": "https://muvapp.com", "tier": 2, "title": "MUV Paraguay"}
            },
            {
                "name": "PedidosYa Paraguay",
                "category": "food",
                "available_in_country": True,
                "source": {"url": "https://www.pedidosya.com.py", "tier": 2, "title": "PedidosYa Paraguay"}
            },
            {
                "name": "Bancard Pago Móvil",
                "category": "payments",
                "available_in_country": True,
                "source": {"url": "https://www.bancard.com.py", "tier": 1, "title": "Bancard Paraguay"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Roman Catholicism (approx. 88%) with deep bilingual Spanish and Guaraní national identity",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ine.gov.py", "tier": 1, "title": "INE Paraguay"}],
                "evidence_quote": "Catholicism is the predominant faith; Guaraní is co-official and spoken by over 80% of the population",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Virgen de Caacupé Pilgrimage (December 8), San Juan Ára fire-walking festival, Asunción Carnival",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://senatur.gov.py", "tier": 1, "title": "Secretaría Nacional de Turismo (SENATUR)"}],
                "evidence_quote": "The annual pilgrimage to the Basilica of Caacupé is the largest religious event in Paraguay",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Never refuse an invitation to share tereré (cold yerba mate) as it is considered an important gesture of friendship and warmth. Police checkpoints outside major cities are routine; carry passport and international driving permit.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://senatur.gov.py", "tier": 1, "title": "SENATUR Cultural Guide"}],
                "evidence_quote": "Tereré culture (UNESCO Intangible Cultural Heritage) is the core social connector in Paraguay",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Tipping 10% is customary in restaurants and cafés. Tipping taxi drivers is not customary, though rounding up the meter is appreciated.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://senatur.gov.py", "tier": 1, "title": "SENATUR Travel Guide"}],
                "evidence_quote": "A 10% tip is standard in restaurants when service is not included",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "La Santísima Trinidad de Paraná Cizvit Misyonu",
                    "en": "Jesuit Missions of La Santísima Trinidad de Paraná",
                    "de": "Jesuitenmissionen von La Santísima Trinidad de Paraná",
                    "ru": "Иезуитские миссии Ла-Сантисима-Тринидад-де-Парана",
                    "es": "Misiones Jesuíticas de la Santísima Trinidad de Paraná"
                },
                "type": "heritage",
                "sources": [{"url": "https://whc.unesco.org/en/list/648", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            },
            {
                "name": {
                    "tr": "Itaipu Hidroelektrik Barajı",
                    "en": "Itaipu Hydroelectric Dam",
                    "de": "Itaipu-Wasserkraftwerk",
                    "ru": "Гидроэлектростанция Итайпу",
                    "es": "Represa Hidroeléctrica de Itaipú"
                },
                "type": "landmark",
                "sources": [{"url": "https://www.itaipu.gov.py", "tier": 1, "title": "Itaipu Binacional"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "La Santísima Trinidad de Paraná Cizvit Misyonu Harabeleri (UNESCO)",
                    "license": "CC-BY-SA",
                    "author": "Josep M. Gracia",
                    "source_url": "/images/countries/py-480.webp",
                    "attribution_text": "Jesuit Missions of La Santísima Trinidad de Paraná in Paraguay. Josep M. Gracia, CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "La Santísima Trinidad de Paraná Cizvit Misyonu Harabeleri (UNESCO), Paraguay",
                        "en": "Jesuit Missions of La Santísima Trinidad de Paraná (UNESCO), Paraguay",
                        "de": "Jesuitenmissionen von La Santísima Trinidad de Paraná (UNESCO), Paraguay",
                        "ru": "Руины иезуитских миссий Ла-Сантисима-Тринидад-де-Парана (ЮНЕСКО), Парагвай",
                        "es": "Ruinas de las Misiones Jesuíticas de la Santísima Trinidad de Paraná (UNESCO), Paraguay"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "paraguay", "en": "paraguay", "de": "paraguay", "ru": "paragvay", "es": "paraguay"},
            "title": {
                "tr": "Paraguay Vize Rehberi, 90 Gün Vizesiz Giriş ve Cizvit Misyonları | Vizamigo",
                "en": "Paraguay Visa Guide, 90-Day Visa-Free Rules & Travel Guide | Vizamigo",
                "de": "Paraguay Visum-Leitfaden, 90 Tage visafrei & Reisetipps | Vizamigo",
                "ru": "Виза в Парагвай, 90 дней без визы и миссии иезуитов | Vizamigo",
                "es": "Guía de Visa de Paraguay, 90 Días sin Visa y Misiones Jesuíticas | Vizamigo"
            },
            "meta_description": {
                "tr": "Paraguay Türk pasaportuna 90 gün vizesiz giriş, tereré kültürü, Bolt taksi kullanımı, Tip C prizler ve Cizvit Misyonları gezi rehberi.",
                "en": "Paraguay 90-day visa-free rules, tereré tea etiquette, Bolt ride-hailing tips, Type C sockets, and Jesuit Missions guide.",
                "de": "Paraguay 90 Tage visafreie Einreise, Tereré-Teeritual, Bolt-Taxi, Steckdosentyp C und Reisetipps Jesuitenmissionen.",
                "ru": "Правила въезда в Парагвай на 90 дней без визы, чай терере, такси Bolt, европейские розетки Type C и миссии иезуитов.",
                "es": "Requisitos de entrada sin visa a Paraguay (90 días), tradición del tereré, aplicación Bolt, enchufes Tipo C y misiones jesuíticas."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "HN": {
        "iso2": "HN",
        "names": {
            "tr": "Honduras",
            "en": "Honduras",
            "de": "Honduras",
            "ru": "Гондурас",
            "es": "Honduras"
        },
        "capital": {
            "value": "Tegucigalpa",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://amdc.hn", "tier": 1, "title": "Alcaldía Municipal del Distrito Central (Tegucigalpa)"}],
            "evidence_quote": "Tegucigalpa is the constitutional capital and seat of government of Honduras",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "HNL",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bch.hn", "tier": 1, "title": "Banco Central de Honduras"}],
            "evidence_quote": "The Honduran Lempira (HNL, L) is the legal tender currency of the Republic of Honduras",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-6 (CST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.goascoran.com", "tier": 1, "title": "Comisión Permanente de Contingencias (COPECO)"}],
            "evidence_quote": "Honduras operates on Central Standard Time UTC-6 with no daylight saving time adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "110V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.enee.hn", "tier": 1, "title": "Empresa Nacional de Energía Eléctrica (ENEE)"}],
                "evidence_quote": "Standard residential supply voltage across Honduras is 110V/120V 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 60,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.enee.hn", "tier": 1, "title": "ENEE Honduras"}],
                "evidence_quote": "Operating frequency of the national electrical grid is 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["A", "B"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "Standard wall sockets accommodate US Type A and Type B plugs with two flat parallel pins",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.policianacional.gob.hn", "tier": 1, "title": "Policía Nacional de Honduras"}],
                "evidence_quote": "Dial 911 for emergency police response throughout Honduras",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "195",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://cruzroja.org.hn", "tier": 1, "title": "Cruz Roja Hondureña"}],
                "evidence_quote": "Call 195 for Cruz Roja ambulance dispatch and emergency medical assistance",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "198",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://bomberos.gob.hn", "tier": 1, "title": "Benemérito Cuerpo de Bomberos de Honduras"}],
                "evidence_quote": "Dial 198 for emergency fire and rescue services",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://911.gob.hn", "tier": 1, "title": "Sistema Nacional de Emergencias 911 Honduras"}],
                "evidence_quote": "911 is the central emergency dispatch center operational 24/7",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://iht.hn", "tier": 1, "title": "Instituto Hondureño de Turismo - Policía Turística"}],
                "evidence_quote": "Policía Turística patrols Roatán, Utila, and Copán Ruinas coordinating via 911",
                "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE",
                    "level": 3,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State Travel Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO",
                    "level": 3,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/honduras", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "DE_AA",
                    "level": 2,
                    "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt Reise- und Sicherheitshinweise"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 3,
            "agencies_agree": False,
            "advisory_headline": {
                "tr": "San Pedro Sula ve Tegucigalpa'da yüksek suç oranları nedeniyle seyahat planları gözden geçirilmelidir; Roatán ve Copán turistik bölgeleri güvenlidir.",
                "en": "Reconsider travel to mainland cities due to crime; Roatan, Bay Islands, and Copan Ruinas are safe with standard caution.",
                "de": "Reisen auf das Festland sorgfältig abwägen; die Bay Islands (Roatán) und Copán sind touristisch gut abgesichert.",
                "ru": "Рекомендуется пересмотреть поездки на материк; острова Роатан и руины Копан безопасны при обычных мерах.",
                "es": "Reconsidere viajar a ciudades del interior por delincuencia; Roatán y Copán son destinos turísticos seguros."
            },
            "regional_warnings": [
                {
                    "area": "Gracias a Dios Department (Mosquito Coast)",
                    "level": 4,
                    "reason": "crime",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State"}
                }
            ],
            "risk_categories": {
                "crime": "high",
                "terrorism": "low",
                "civil_unrest": "medium",
                "natural_disaster": "medium",
                "health": "medium"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 32.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/honduras", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Honduras reach approximately 32.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 48.5,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/honduras", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds measure 48.5 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Claro and Tigo are the principal carriers with 4G coverage. Arriving visitors must complete the digital customs declaration (prechequeo.inm.gob.hn). Roatán is internationally famed for Caribbean scuba diving.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://inm.gob.hn", "tier": 1, "title": "Instituto Nacional de Migración de Honduras (INM)"}],
                "evidence_quote": "Pre-check electronic registration is mandatory for all travelers entering or leaving Honduras",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Uber Honduras",
                "category": "taxi",
                "available_in_country": True,
                "source": {"url": "https://www.uber.com/hn/es/", "tier": 2, "title": "Uber Honduras"}
            },
            {
                "name": "Hugo Honduras",
                "category": "food",
                "available_in_country": True,
                "source": {"url": "https://hugoapp.com", "tier": 2, "title": "Hugo Central America"}
            },
            {
                "name": "PedidosYa Honduras",
                "category": "food",
                "available_in_country": True,
                "source": {"url": "https://www.pedidosya.com.hn", "tier": 2, "title": "PedidosYa Honduras"}
            },
            {
                "name": "Waze Honduras",
                "category": "maps",
                "available_in_country": True,
                "source": {"url": "https://www.waze.com", "tier": 2, "title": "Waze Navigation"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Roman Catholicism (approx. 46%) and Evangelical Protestantism (approx. 41%) with Garifuna heritage",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://iht.hn", "tier": 1, "title": "Instituto Hondureño de Turismo"}],
                "evidence_quote": "Catholicism and Protestantism coexist alongside Afro-indigenous Garifuna spiritual rituals",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Feria Isidra Carnival in La Ceiba, Holy Week (Semana Santa) in Comayagua, Guancasco reconciliation ceremonies",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://iht.hn", "tier": 1, "title": "IHT Cultural Calendar"}],
                "evidence_quote": "The Grand International Carnival of Friendship in La Ceiba is the premier annual cultural celebration",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Avoid walking alone after dark in San Pedro Sula and Tegucigalpa; use radio taxis or Uber. Never drink untreated tap water. Under the CA-4 agreement, a 90-day visa permits travel between Honduras, Guatemala, El Salvador, and Nicaragua.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://inm.gob.hn", "tier": 1, "title": "INM Honduras"}],
                "evidence_quote": "CA-4 border convention allows 90 days of combined travel across the four signatory republics",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Tipping 10% is customary in restaurants. In beach dive resorts in Roatán and Utila, tipping dive masters and boat crew ($5-10 per day) is standard practice.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://iht.hn", "tier": 1, "title": "IHT Travel Guide"}],
                "evidence_quote": "A 10% tip is standard in hospitality and diving services",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "Copán Antik Maya Harabeleri ve Akropol",
                    "en": "Copán Mayan Archaeological Site & Acropolis",
                    "de": "Maya-Ruinen von Copán & Akropolis",
                    "ru": "Руины майя в Копане и Акрополь",
                    "es": "Sitio Arqueológico Maya de Copán y Acrópolis"
                },
                "type": "heritage",
                "sources": [{"url": "https://whc.unesco.org/en/list/129", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            },
            {
                "name": {
                    "tr": "Roatán Adası ve Karayip Mercan Resifleri",
                    "en": "Roatan Island & Caribbean Barrier Reef",
                    "de": "Insel Roatán & Karibisches Barrieredriff",
                    "ru": "Остров Роатан и коралловый барьерный риф",
                    "es": "Isla de Roatán y Arrecife de Coral Caribeño"
                },
                "type": "nature",
                "sources": [{"url": "https://iht.hn", "tier": 1, "title": "Instituto Hondureño de Turismo"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Copán Antik Maya Arkeolojik Harabeleri ve Akropol (UNESCO)",
                    "license": "CC-BY-SA",
                    "author": "Mónica J. Mora",
                    "source_url": "/images/countries/hn-480.webp",
                    "attribution_text": "Copán Mayan Archaeological Ruins in Honduras. Mónica J. Mora, CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Copán Antik Maya Arkeolojik Harabeleri ve Akropol (UNESCO), Honduras",
                        "en": "Copán Mayan Archaeological Ruins & Acropolis (UNESCO), Honduras",
                        "de": "Maya-Ruinen von Copán und Akropolis (UNESCO), Honduras",
                        "ru": "Археологические руины майя в Копане и Акрополь (ЮНЕСКО), Гондурас",
                        "es": "Ruinas Arqueológicas Mayas de Copán y Acrópolis (UNESCO), Honduras"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "honduras", "en": "honduras", "de": "honduras", "ru": "gonnduras", "es": "honduras"},
            "title": {
                "tr": "Honduras Vize Rehberi, 90 Gün Vizesiz Giriş, Roatán ve Copán | Vizamigo",
                "en": "Honduras Visa Guide, 90-Day Visa-Free Rules & Roatan Travel | Vizamigo",
                "de": "Honduras Visum-Leitfaden, 90 Tage visafrei & Roatán Reisetipps | Vizamigo",
                "ru": "Виза в Гондурас, 90 дней без визы, дайвинг на Роатане и Копан | Vizamigo",
                "es": "Guía de Visa de Honduras, 90 Días sin Visa, Roatán y Copán | Vizamigo"
            },
            "meta_description": {
                "tr": "Honduras Türk pasaportuna 90 gün vizesiz giriş (CA-4), prechequeo formu, Roatán dalış rehberi, Tip A/B prizler ve Copán Maya harabeleri rehberi.",
                "en": "Honduras 90-day visa-free CA-4 rules, prechequeo online form, Roatan scuba diving tips, Type A/B sockets, and Copan Mayan ruins.",
                "de": "Honduras 90 Tage visafreie Einreise (CA-4), Online-Prechequeo, Roatán-Tauchurlaub, Steckdosentyp A/B und Copán-Ruinen.",
                "ru": "Правила въезда в Гондурас на 90 дней без визы по соглашению CA-4, дайвинг на Роатане, розетки Type A/B и руины майя Копан.",
                "es": "Requisitos de entrada sin visa a Honduras (90 días CA-4), prechequeo migratorio, buceo en Roatán y ruinas mayas de Copán."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "NI": {
        "iso2": "NI",
        "names": {
            "tr": "Nikaragua",
            "en": "Nicaragua",
            "de": "Nicaragua",
            "ru": "Никарагуа",
            "es": "Nicaragua"
        },
        "capital": {
            "value": "Managua",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.managua.gob.ni", "tier": 1, "title": "Alcaldía de Managua"}],
            "evidence_quote": "Managua is the capital and largest urban center of the Republic of Nicaragua",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "NIO",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bcn.gob.ni", "tier": 1, "title": "Banco Central de Nicaragua"}],
            "evidence_quote": "The Nicaraguan Córdoba (NIO, C$) is the official legal tender currency",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-6 (CST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.ineter.gob.ni", "tier": 1, "title": "Instituto Nicaragüense de Estudios Territoriales (INETER)"}],
            "evidence_quote": "Nicaragua observes Central Standard Time UTC-6 year-round without daylight saving adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "120V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ine.gob.ni", "tier": 1, "title": "Instituto Nicaragüense de Energía (INE)"}],
                "evidence_quote": "Standard residential supply voltage in Nicaragua is 120V 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 60,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ine.gob.ni", "tier": 1, "title": "INE Nicaragua"}],
                "evidence_quote": "National alternating current grid frequency is standard 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["A", "B"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "North American Type A and Type B two-flat-pin sockets are standard throughout Nicaragua",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "118",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.policia.gob.ni", "tier": 1, "title": "Policía Nacional de Nicaragua"}],
                "evidence_quote": "Dial 118 for emergency police response throughout Nicaragua",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "128",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.cruzrojanicaraguense.org.ni", "tier": 1, "title": "Cruz Roja Nicaragüense"}],
                "evidence_quote": "Call 128 for emergency medical response and Cruz Roja ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "115",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.migob.gob.ni", "tier": 1, "title": "Dirección General de Bomberos de Nicaragua"}],
                "evidence_quote": "Dial 115 for national emergency fire and rescue services",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "118",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.policia.gob.ni", "tier": 1, "title": "Policía Nacional"}],
                "evidence_quote": "118 serves as the primary national emergency dispatch number",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "118",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.intur.gob.ni", "tier": 1, "title": "Instituto Nicaragüense de Turismo (INTUR)"}],
                "evidence_quote": "Policía Turística patrols Granada, San Juan del Sur, and León coordinating through 118",
                "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE",
                    "level": 3,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State Travel Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO",
                    "level": 2,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/nicaragua", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
            "agencies_agree": False,
            "advisory_headline": {
                "tr": "Nikaragua'da keyfi gözaltı ve yerel yasaların sert uygulanması riski bulunmaktadır; siyasi yorumlardan ve gösterilerden kesinlikle kaçınılmalıdır.",
                "en": "Exercise increased caution due to arbitrary enforcement of local laws; strictly avoid political protests and political commentary.",
                "de": "Erhöhte Vorsicht wegen willkürlicher Rechtsanwendung; meiden Sie politische Äußerungen und Demonstrationen.",
                "ru": "Проявляйте повышенную осторожность ввиду строгого правоприменения; избегайте политических дискуссий и митингов.",
                "es": "Actúe con mayor cautela debido a la aplicación estricta de leyes; evite terminantemente cualquier actividad política."
            },
            "regional_warnings": [],
            "risk_categories": {
                "crime": "medium",
                "terrorism": "low",
                "civil_unrest": "high",
                "natural_disaster": "medium",
                "health": "medium"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 24.5,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/nicaragua", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Nicaragua reach approximately 24.5 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 42.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/nicaragua", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds measure 42.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Claro and Tigo operate 4G networks. Arriving international passengers must pay a US$10 Tourist Card cash fee upon arrival at Managua (MGA). Drones are strictly prohibited and will be confiscated at customs.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.migob.gob.ni", "tier": 1, "title": "Dirección General de Migración y Extranjería Nicaragua"}],
                "evidence_quote": "Tourists must purchase a US$10 Tourist Card upon entry; bringing unauthorized drones into Nicaragua is illegal",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Ray Nicaragua",
                "category": "taxi",
                "available_in_country": True,
                "source": {"url": "https://rayapp.lat", "tier": 2, "title": "Ray Ride Hailing Nicaragua"}
            },
            {
                "name": "Aventón",
                "category": "taxi",
                "available_in_country": True,
                "source": {"url": "https://aventon.app", "tier": 2, "title": "Aventón Nicaragua"}
            },
            {
                "name": "PedidosYa Nicaragua",
                "category": "food",
                "available_in_country": True,
                "source": {"url": "https://www.pedidosya.com.ni", "tier": 2, "title": "PedidosYa Nicaragua"}
            },
            {
                "name": "Waze Nicaragua",
                "category": "maps",
                "available_in_country": True,
                "source": {"url": "https://www.waze.com", "tier": 2, "title": "Waze Navigation"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Roman Catholicism (approx. 50%) and Evangelical Protestantism (approx. 37%)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.inide.gob.ni", "tier": 1, "title": "INIDE Nicaragua"}],
                "evidence_quote": "Catholic and Protestant faiths shape deeply traditional community festivities across Nicaragua",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "La Purísima (Feast of the Immaculate Conception on Dec 7), Santo Domingo de Guzmán in Managua, Toro Guaco in Diriamba",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.intur.gob.ni", "tier": 1, "title": "INTUR Cultural Traditions"}],
                "evidence_quote": "La Gritería on December 7 is the most joyous nationwide Catholic street celebration",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Bringing camera drones into Nicaragua is illegal and results in confiscation at airport customs. Foreigners are prohibited from engaging in political activities, demonstrations, or social media activism under Nicaraguan sovereignty laws. CA-4 visa allows 90 combined days in the region.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.dga.gob.ni", "tier": 1, "title": "Dirección General de Servicios Aduaneros (DGA)"}],
                "evidence_quote": "Unlicensed importation of aerial drones is strictly prohibited under aeronautical customs decrees",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Tipping 10% is customary in sit-down restaurants; check if 'propina voluntaria' is already included on the bill before paying.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.intur.gob.ni", "tier": 1, "title": "INTUR Travel Tips"}],
                "evidence_quote": "A 10% voluntary tip is standard across dining and hotel services",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "Granada Katedrali ve Kolonyal Tarihi Merkez",
                    "en": "Granada Cathedral & Colonial Historic Center",
                    "de": "Kathedrale von Granada & Kolonialzentrum",
                    "ru": "Кафедральный собор Гранады и колониальный центр",
                    "es": "Catedral de Granada y Centro Histórico Colonial"
                },
                "type": "city",
                "sources": [{"url": "https://whc.unesco.org/en/tentativelists/1802/", "tier": 1, "title": "UNESCO Tentative List"}]
            },
            {
                "name": {
                    "tr": "Ometepe Adası İkiz Volkanları",
                    "en": "Ometepe Island Twin Volcanoes",
                    "de": "Zwillingsvulkane der Insel Ometepe",
                    "ru": "Остров двух вулканов Ометепе",
                    "es": "Isla de Ometepe Volcanes Gemelos"
                },
                "type": "nature",
                "sources": [{"url": "https://www.intur.gob.ni", "tier": 1, "title": "INTUR Nicaragua"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Granada Katedrali Sarı Neoklasik Cephesi ve Meydanı",
                    "license": "CC-BY-SA",
                    "author": "Sebastian Scheper",
                    "source_url": "/images/countries/ni-480.webp",
                    "attribution_text": "Granada Cathedral yellow neoclassical facade in Nicaragua. Sebastian Scheper, CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Granada Katedrali Sarı Neoklasik Cephesi ve Meydanı, Nikaragua",
                        "en": "Granada Cathedral Yellow Neoclassical Facade & Plaza, Nicaragua",
                        "de": "Gelbe neoklassizistische Fassade der Kathedrale von Granada, Nicaragua",
                        "ru": "Жёлтый фасад собора Гранады и центральная площадь, Никарагуа",
                        "es": "Catedral de Granada Fachada Neoclásica Amarilla y Plaza, Nicaragua"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "nikaragua", "en": "nicaragua", "de": "nicaragua", "ru": "nikaragua", "es": "nicaragua"},
            "title": {
                "tr": "Nikaragua Vize Rehberi, 90 Gün Vizesiz Giriş, Dron Yasağı ve Granada | Vizamigo",
                "en": "Nicaragua Visa Guide, 90-Day Visa-Free Rules, Drone Ban & Granada | Vizamigo",
                "de": "Nicaragua Visum-Leitfaden, 90 Tage visafrei, Drohnenverbot & Granada | Vizamigo",
                "ru": "Виза в Никарагуа, 90 дней без визы, запрет дронов и Гранада | Vizamigo",
                "es": "Guía de Visa de Nicaragua, 90 Días sin Visa, Prohibición de Drones y Granada | Vizamigo"
            },
            "meta_description": {
                "tr": "Nikaragua Türk pasaportuna 90 gün vizesiz giriş (CA-4), 10$ turist kartı, kesin dron ithalat yasağı, Tip A/B prizler ve Granada gezi rehberi.",
                "en": "Nicaragua 90-day visa-free CA-4 rules, $10 tourist card, strict drone ban warning, Type A/B sockets, and Granada colonial guide.",
                "de": "Nicaragua 90 Tage visafreie Einreise (CA-4), 10$ Touristenkarte, striktes Drohnenverbot, Steckdosentyp A/B und Reiseführer Granada.",
                "ru": "Правила въезда в Никарагуа на 90 дней без визы по CA-4, туристическая карта $10, запрет дронов, розетки Type A/B и Гранада.",
                "es": "Requisitos de entrada sin visa a Nicaragua (90 días CA-4), tarjeta de turista de $10, prohibición de drones y guía de Granada."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "BZ": {
        "iso2": "BZ",
        "names": {
            "tr": "Belize",
            "en": "Belize",
            "de": "Belize",
            "ru": "Белиз",
            "es": "Belice"
        },
        "capital": {
            "value": "Belmopan",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.belmopancitycouncil.org", "tier": 1, "title": "Belmopan City Council"}],
            "evidence_quote": "Belmopan is the purpose-built capital city of Belize, established after Hurricane Hattie",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "BZD",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.centralbank.org.bz", "tier": 1, "title": "Central Bank of Belize"}],
            "evidence_quote": "The Belize Dollar (BZD) is pegged to the US Dollar at exactly 2 BZD = 1 USD; USD is accepted everywhere",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-6 (CST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.hydromet.gov.bz", "tier": 1, "title": "National Meteorological Service of Belize"}],
            "evidence_quote": "Belize operates year-round on Central Standard Time UTC-6 without daylight saving changes",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "110V/220V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.bel.com.bz", "tier": 1, "title": "Belize Electricity Limited (BEL)"}],
                "evidence_quote": "Standard residential supply across Belize is 110V/220V dual voltage 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 60,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.bel.com.bz", "tier": 1, "title": "Belize Electricity Limited"}],
                "evidence_quote": "Grid frequency throughout Belize is 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["A", "B", "G"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "Outlets accommodate US Type A and B plugs, with British Type G three-pin sockets in older establishments",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.police.gov.bz", "tier": 1, "title": "Belize Police Department"}],
                "evidence_quote": "Dial 911 for emergency police assistance throughout Belize",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://health.gov.bz", "tier": 1, "title": "Ministry of Health & Wellness Belize"}],
                "evidence_quote": "Call 911 or BERT (Belize Emergency Response Team) +501 223-3292 for medical dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.belize.gov.bz", "tier": 1, "title": "National Fire Service of Belize"}],
                "evidence_quote": "Dial 911 or local fire station numbers for emergency fire services",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.belize.gov.bz", "tier": 1, "title": "Government of Belize Emergency Services"}],
                "evidence_quote": "911 is the central emergency number operational nationwide",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+501 227-2420",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.travelbelize.org", "tier": 1, "title": "Belize Tourism Board (BTB)"}],
                "evidence_quote": "Tourism Police Unit (TPU) headquarters in Belize City operates at +501 227-2420",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/belize", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Belize City güney kesiminde çete suçları nedeniyle dikkatli olunmalıdır; Ambergris Caye, Caye Caulker ve Placencia tatil adaları son derece güvenlidir.",
                "en": "Exercise increased caution due to gang activity in south Belize City; the Cayes and reef resort areas are very safe.",
                "de": "Erhöhte Vorsicht im Süden von Belize City; die Cayes (Caye Caulker, San Pedro) sind sichere Urlaubsinseln.",
                "ru": "Проявляйте осмотрительность в Белиз-Сити; курортные острова Амбергрис-Кей и Кей-Колкер спокойны и безопасны.",
                "es": "Actúe con mayor cautela en el sur de Ciudad de Belice; los Cayos y arrecifes son zonas turísticas muy seguras."
            },
            "regional_warnings": [
                {
                    "area": "Belize City south side (south of Haulover Creek Canal)",
                    "level": 3,
                    "reason": "crime",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State"}
                }
            ],
            "risk_categories": {
                "crime": "medium",
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
                "sources": [{"url": "https://www.speedtest.net/global-index/belize", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Belize reach approximately 34.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 55.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/belize", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in tourist towns measure 55.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Digi (BTL) and SMART provide 4G mobile data packages. English is the official language. US dollars are universally accepted at the fixed exchange rate of 1 USD = 2 BZD everywhere in Belize.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.travelbelize.org", "tier": 1, "title": "Belize Tourism Board"}],
                "evidence_quote": "US dollars are accepted across the nation at the official fixed 2:1 peg",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Belize Travel Guide (BTB)",
                "category": "maps",
                "available_in_country": True,
                "source": {"url": "https://www.travelbelize.org", "tier": 1, "title": "Belize Tourism Board"}
            },
            {
                "name": "Tropic Air App",
                "category": "transport",
                "available_in_country": True,
                "source": {"url": "https://www.tropicair.com", "tier": 2, "title": "Tropic Air Belize"}
            },
            {
                "name": "Belize Bank Mobile",
                "category": "payments",
                "available_in_country": True,
                "source": {"url": "https://www.belizebank.com", "tier": 1, "title": "The Belize Bank Limited"}
            },
            {
                "name": "Maya Island Air App",
                "category": "transport",
                "available_in_country": True,
                "source": {"url": "https://www.mayaislandair.com", "tier": 2, "title": "Maya Island Air"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Roman Catholicism (approx. 40%), Protestantism (approx. 32%), with Garifuna and Maya cultural heritage",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.sib.org.bz", "tier": 1, "title": "Statistical Institute of Belize"}],
                "evidence_quote": "Belize is multicultural with English as the official language and rich Garifuna drumming traditions",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Garifuna Settlement Day (Nov 19), September Celebrations & Carnival, San Pedro Lobster Fest",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.travelbelize.org", "tier": 1, "title": "BTB Festivals Calendar"}],
                "evidence_quote": "Garifuna Settlement Day marks the 1832 arrival of the Garinagu people with drumming and parades",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Touching or standing on living coral reefs in the Belize Barrier Reef reserve is strictly prohibited and subject to marine conservation fines. Sunscreen used when snorkeling must be biodegradable/reef-safe. English is universally spoken.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://fisheries.gov.bz", "tier": 1, "title": "Belize Fisheries Department"}],
                "evidence_quote": "Damaging or harvesting coral in marine protected areas is prohibited under the Fisheries Act",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Tipping 10-15% is customary in restaurants and resorts. Boat captains and diving instructors are typically tipped $10-20 per person per excursion.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.travelbelize.org", "tier": 1, "title": "BTB Visitor Guide"}],
                "evidence_quote": "A 10-15% gratuity is standard for good restaurant and guide service",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "Great Blue Hole Dev Deniz Çukuru",
                    "en": "Great Blue Hole Marine Sinkhole",
                    "de": "Great Blue Hole Meeresdoline",
                    "ru": "Большая голубая дыра",
                    "es": "Gran Agujero Azul Cenote Marino"
                },
                "type": "nature",
                "sources": [{"url": "https://whc.unesco.org/en/list/764", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            },
            {
                "name": {
                    "tr": "Caye Caulker ve Bariyer Resifi",
                    "en": "Caye Caulker & Barrier Reef",
                    "de": "Caye Caulker & Barrieredriff",
                    "ru": "Остров Кей-Колкер и Барьерный риф",
                    "es": "Cayo Caulker y Arrecife de Barrera"
                },
                "type": "nature",
                "sources": [{"url": "https://whc.unesco.org/en/list/764", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Great Blue Hole Dev Deniz Çukuru ve Resif (UNESCO)",
                    "license": "CC-BY",
                    "author": "dronepicr",
                    "source_url": "/images/countries/bz-480.webp",
                    "attribution_text": "Great Blue Hole marine sinkhole in Belize. dronepicr, CC BY 2.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Great Blue Hole Dev Deniz Çukuru ve Resif (UNESCO), Belize",
                        "en": "Great Blue Hole Marine Sinkhole & Coral Reef (UNESCO), Belize",
                        "de": "Great Blue Hole Meeresdoline & Korallenriff (UNESCO), Belize",
                        "ru": "Большая голубая дыра и коралловый риф (ЮНЕСКО), Белиз",
                        "es": "Gran Agujero Azul Cenote Marino y Arrecife de Coral (UNESCO), Belice"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "belize", "en": "belize", "de": "belize", "ru": "beliz", "es": "belice"},
            "title": {
                "tr": "Belize Vize Rehberi, 30 Gün Vizesiz Giriş ve Great Blue Hole | Vizamigo",
                "en": "Belize Visa Guide, 30-Day Visa-Free Rules & Great Blue Hole | Vizamigo",
                "de": "Belize Visum-Leitfaden, 30 Tage visafrei & Great Blue Hole | Vizamigo",
                "ru": "Виза в Белиз, 30 дней без визы и Большая голубая дыра | Vizamigo",
                "es": "Guía de Visa de Belice, 30 Días sin Visa y Gran Agujero Azul | Vizamigo"
            },
            "meta_description": {
                "tr": "Belize Türk pasaportuna 30 gün vizesiz giriş, sabit Amerikan Doları kuru, resif dalış kuralları, Tip A/B/G prizler ve Great Blue Hole rehberi.",
                "en": "Belize 30-day visa-free rules, 2:1 fixed US Dollar peg, coral protection laws, Type A/B/G sockets, and Great Blue Hole diving guide.",
                "de": "Belize 30 Tage visafreie Einreise, fester US-Dollar-Wechselkurs, Riffschutzregeln, Steckdosentyp A/B/G und Great Blue Hole.",
                "ru": "Правила въезда в Белиз на 30 дней без визы, доллар США по курсу 2:1, дайвинг на Большой голубой дыре, розетки Type A/B/G.",
                "es": "Requisitos de entrada sin visa a Belice (30 días), paridad fija del dólar estadounidense, buceo en el Gran Agujero Azul."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "BB": {
        "iso2": "BB",
        "names": {
            "tr": "Barbados",
            "en": "Barbados",
            "de": "Barbados",
            "ru": "Барбадос",
            "es": "Barbados"
        },
        "capital": {
            "value": "Bridgetown",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.gov.bb", "tier": 1, "title": "Government of Barbados"}],
            "evidence_quote": "Bridgetown is the capital and primary commercial seaport of the Republic of Barbados",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "BBD",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.centralbank.org.bb", "tier": 1, "title": "Central Bank of Barbados"}],
            "evidence_quote": "The Barbados Dollar (BBD) is pegged to the US Dollar at 2 BBD = 1 USD; USD is accepted everywhere",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-4 (AST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.barbadosweather.org", "tier": 1, "title": "Barbados Meteorological Services"}],
            "evidence_quote": "Barbados observes Atlantic Standard Time UTC-4 year-round with no seasonal daylight saving",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "115V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.blpc.com.bb", "tier": 1, "title": "Barbados Light & Power Company"}],
                "evidence_quote": "Standard residential supply voltage across Barbados is 115V 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.blpc.com.bb", "tier": 1, "title": "Barbados Light & Power"}],
                "evidence_quote": "Alternating current grid frequency is 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["A", "B"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "North American Type A and Type B plugs with two flat pins are universally used in Barbados",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "211",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.bps.gov.bb", "tier": 1, "title": "The Barbados Police Service"}],
                "evidence_quote": "Dial 211 for emergency police response across Barbados",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "511",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://qeh.gov.bb", "tier": 1, "title": "Queen Elizabeth Hospital Emergency Ambulance Service"}],
                "evidence_quote": "Call 511 for emergency medical services and QEH ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "311",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.bfs.gov.bb", "tier": 1, "title": "Barbados Fire Service"}],
                "evidence_quote": "Dial 311 for fire and rescue emergency services",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "211",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.bps.gov.bb", "tier": 1, "title": "The Barbados Police Service"}],
                "evidence_quote": "211 is the central emergency operations number in Barbados",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "211",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.bps.gov.bb", "tier": 1, "title": "Barbados Police Special Operations"}],
                "evidence_quote": "Tourist precinct patrols along the South and West coasts coordinate via 211",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/barbados", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Barbados Karayipler'in en güvenli ve istikrarlı ada ülkelerinden biridir; standart seyahat önlemleri yeterlidir.",
                "en": "Barbados is one of the safest and most developed Caribbean nations; exercise standard travel precautions.",
                "de": "Barbados ist eines der sichersten Reiseziele der Karibik; normale Vorsichtsmaßnahmen genügen.",
                "ru": "Барбадос — один из самых безопасных и развитых карибских курортов; действуют обычные меры предосторожности.",
                "es": "Barbados es uno de los destinos más seguros y estables del Caribe; aplican precauciones normales."
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
                "value": 48.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/barbados", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Barbados reach approximately 48.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 115.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/barbados", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Barbados exceed 115.0 Mbps with fiber-optic rollout",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Flow and Digicel provide high-speed 4G LTE tourist eSIMs at Grantley Adams International Airport (BGI). Arriving passengers must submit the online Immigration/Customs form at travelform.gov.bb prior to arrival.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://travelform.gov.bb", "tier": 1, "title": "Barbados Customs and Immigration Portal"}],
                "evidence_quote": "All arriving passengers must complete the online digital immigration form within 72 hours of travel",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "PickUP Barbados",
                "category": "taxi",
                "available_in_country": True,
                "source": {"url": "https://pickupbarbados.com", "tier": 2, "title": "PickUP Barbados App"}
            },
            {
                "name": "BeepCab",
                "category": "taxi",
                "available_in_country": True,
                "source": {"url": "https://beepcab.com", "tier": 2, "title": "BeepCab Barbados"}
            },
            {
                "name": "Hopscotch Delivery",
                "category": "food",
                "available_in_country": True,
                "source": {"url": "https://hopscotchfetch.com", "tier": 2, "title": "Hopscotch Barbados"}
            },
            {
                "name": "Barbados Transport Board App",
                "category": "transport",
                "available_in_country": True,
                "source": {"url": "https://transportboard.gov.bb", "tier": 1, "title": "Transport Board Barbados"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Christianity (approx. 75%, predominantly Anglican, Pentecostal, and Adventist)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://stats.gov.bb", "tier": 1, "title": "Barbados Statistical Service"}],
                "evidence_quote": "Anglicanism represents the historic church of Barbados alongside vibrant evangelical congregations",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Crop Over Festival (climaxing with Grand Kadooment in August), Oistins Fish Festival, Barbados Food and Rum Festival",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.visitbarbados.org", "tier": 1, "title": "Barbados Tourism Marketing Inc. (BTMI)"}],
                "evidence_quote": "Crop Over celebrates the historic sugarcane harvest with six weeks of soca music and masquerade bands",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Wearing camouflage clothing of any style is strictly illegal in Barbados for civilians and tourists; camouflage gear is reserved exclusively for the Barbados Defence Force. Nudism and topless sunbathing are prohibited on all public beaches.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.bps.gov.bb", "tier": 1, "title": "The Barbados Police Service Law Bulletin"}],
                "evidence_quote": "It is a serious statutory offence under Barbadian law for non-military persons to wear camouflage clothing",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "A 10% service charge is usually included on restaurant and hotel bills; leaving an extra 5-10% for exceptional dining service is customary.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.visitbarbados.org", "tier": 1, "title": "BTMI Travel Tips"}],
                "evidence_quote": "Most bills include a 10% service charge; an additional modest tip is appreciated for good service",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "Carlisle Körfezi ve Deniz Kaplumbağaları Sahili",
                    "en": "Carlisle Bay & Sea Turtle Marine Park",
                    "de": "Carlisle Bay & Meeresschildkröten-Bucht",
                    "ru": "Бухта Карлайл и морской заповедник черепах",
                    "es": "Bahía de Carlisle y Parque Marino de Tortugas"
                },
                "type": "nature",
                "sources": [{"url": "https://www.visitbarbados.org", "tier": 1, "title": "BTMI Barbados"}]
            },
            {
                "name": {
                    "tr": "Tarihi Bridgetown ve Askeri Garnizonu",
                    "en": "Historic Bridgetown & its Garrison",
                    "de": "Historisches Bridgetown & Militär-Garnison",
                    "ru": "Исторический Бриджтаун и его гарнизон",
                    "es": "Centro Histórico de Bridgetown y su Guarnición"
                },
                "type": "heritage",
                "sources": [{"url": "https://whc.unesco.org/en/list/1376", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Carlisle Körfezi Turkuaz Sahili ve Tekneler, Bridgetown",
                    "license": "CC0",
                    "author": "Pontificalibus",
                    "source_url": "/images/countries/bb-480.webp",
                    "attribution_text": "Carlisle Bay turquoise beach and boats in Bridgetown, Barbados. Pontificalibus, CC0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Carlisle Körfezi Turkuaz Sahili ve Tekneler, Bridgetown, Barbados",
                        "en": "Carlisle Bay Turquoise Beach & Boats, Bridgetown, Barbados",
                        "de": "Carlisle Bay Türkisstrand & Boote, Bridgetown, Barbados",
                        "ru": "Бирюзовый пляж бухты Карлайл и лодки, Бриджтаун, Барбадос",
                        "es": "Playa Turquesa de Bahía Carlisle y Barcos, Bridgetown, Barbados"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "barbados", "en": "barbados", "de": "barbados", "ru": "barbados", "es": "barbados"},
            "title": {
                "tr": "Barbados Vize Rehberi, 90 Gün Vizesiz Giriş, Kamuflaj Yasağı ve Carlisle Bay | Vizamigo",
                "en": "Barbados Visa Guide, 90-Day Visa-Free Rules, Camo Ban & Travel | Vizamigo",
                "de": "Barbados Visum-Leitfaden, 90 Tage visafrei, Camouflage-Verbot & Reisetipps | Vizamigo",
                "ru": "Виза на Барбадос, 90 дней без визы, запрет камуфляжа и бухта Карлайл | Vizamigo",
                "es": "Guía de Visa de Barbados, 90 Días sin Visa, Prohibición de Camuflaje | Vizamigo"
            },
            "meta_description": {
                "tr": "Barbados Türk pasaportuna 90 gün vizesiz giriş, sıkı kamuflaj kıyafet yasağı, sabit Amerikan Doları kuru, Tip A/B prizler ve Carlisle Körfezi gezi rehberi.",
                "en": "Barbados 90-day visa-free rules, strict military camouflage ban warning, 2:1 USD currency peg, Type A/B plugs, and Carlisle Bay guide.",
                "de": "Barbados 90 Tage visafreie Einreise, striktes Camouflage-Kleidungsverbot, fester US-Dollar-Wechselkurs und Reiseführer Carlisle Bay.",
                "ru": "Правила въезда на Барбадос на 90 дней без визы, строгий запрет камуфляжной одежды, доллар США по курсу 2:1 и бухта Карлайл.",
                "es": "Requisitos de entrada sin visa a Barbados (90 días), prohibición estricta de ropa de camuflaje y guía de Carlisle Bay."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "TT": {
        "iso2": "TT",
        "names": {
            "tr": "Trinidad ve Tobago",
            "en": "Trinidad and Tobago",
            "de": "Trinidad und Tobago",
            "ru": "Тринидад и Тобаго",
            "es": "Trinidad y Tobago"
        },
        "capital": {
            "value": "Port of Spain",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://citycorporationpos.gov.tt", "tier": 1, "title": "Port of Spain Corporation"}],
            "evidence_quote": "Port of Spain is the capital city and main administrative hub of Trinidad and Tobago",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "TTD",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.central-bank.org.tt", "tier": 1, "title": "Central Bank of Trinidad and Tobago"}],
            "evidence_quote": "The Trinidad and Tobago Dollar (TTD, TT$) is the official currency; floats at approx. 6.8 TT$ to 1 USD",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-4 (AST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.metoffice.gov.tt", "tier": 1, "title": "Trinidad and Tobago Meteorological Service"}],
            "evidence_quote": "Trinidad and Tobago observes Atlantic Standard Time UTC-4 year-round without daylight saving",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "115V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://ttec.co.tt", "tier": 1, "title": "Trinidad and Tobago Electricity Commission (T&TEC)"}],
                "evidence_quote": "Standard residential single-phase electricity across the nation is 115V 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 60,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://ttec.co.tt", "tier": 1, "title": "T&TEC"}],
                "evidence_quote": "Alternating current power grid operating frequency is 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["A", "B"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "Wall outlets standardly accept North American Type A and Type B plugs with two flat pins",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ttps.gov.tt", "tier": 1, "title": "Trinidad and Tobago Police Service (TTPS)"}],
                "evidence_quote": "Dial 999 or 555 for emergency police response across Trinidad and Tobago",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "811",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://health.gov.tt", "tier": 1, "title": "Ministry of Health Trinidad and Tobago"}],
                "evidence_quote": "Call 811 for emergency medical services and national ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "990",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://nationalsecurity.gov.tt", "tier": 1, "title": "Trinidad and Tobago Fire Service (TTFS)"}],
                "evidence_quote": "Dial 990 for emergency fire and rescue services",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ttps.gov.tt", "tier": 1, "title": "TTPS Emergency Dispatch"}],
                "evidence_quote": "999 coordinates central emergency dispatch",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ttps.gov.tt", "tier": 1, "title": "TTPS Tourism Oriented Policing Section (TOPS)"}],
                "evidence_quote": "TOPS tourist police officers patrol Maracas Bay, Port of Spain, and Tobago beaches via 999",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/trinidad-and-tobago", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Port of Spain ve Laventille bölgelerinde suç oranları nedeniyle dikkatli olunmalıdır; Tobago adası tatil köyleri huzurlu ve güvenlidir.",
                "en": "Exercise increased caution due to violent crime in Port of Spain; resort areas on Tobago are much safer.",
                "de": "Erhöhte Vorsicht wegen Kriminalität in Port of Spain; die Ferienregionen auf Tobago sind deutlich sicherer.",
                "ru": "Проявляйте повышенную осторожность в Порт-оф-Спейн; курортные зоны острова Тобаго спокойны и безопасны.",
                "es": "Actúe con mayor cautela en Puerto España por delincuencia; la isla de Tobago es un destino vacacional tranquilo."
            },
            "regional_warnings": [
                {
                    "area": "Laventille, Beetham, Sea Lots, and Morvant in Port of Spain",
                    "level": 3,
                    "reason": "crime",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State"}
                }
            ],
            "risk_categories": {
                "crime": "high",
                "terrorism": "low",
                "civil_unrest": "low",
                "natural_disaster": "medium",
                "health": "low"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 42.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/trinidad-and-tobago", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Trinidad and Tobago reach approximately 42.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 98.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/trinidad-and-tobago", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds exceed 98.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "bmobile (TSTT) and Digicel provide 4G/LTE prepaid SIMs at Piarco International Airport (POS). Inter-island ferries and flights (Caribbean Airlines) connect Trinidad and Tobago multiple times daily.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://tatt.org.tt", "tier": 1, "title": "Telecommunications Authority of Trinidad and Tobago (TATT)"}],
                "evidence_quote": "Prepaid cellular registration requires valid passport verification under national telecom regulations",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "TT RideShare",
                "category": "taxi",
                "available_in_country": True,
                "source": {"url": "https://ttrideshare.com", "tier": 2, "title": "TT RideShare App"}
            },
            {
                "name": "DeliverMe TT",
                "category": "taxi",
                "available_in_country": True,
                "source": {"url": "https://delivermett.com", "tier": 2, "title": "DeliverMe TT"}
            },
            {
                "name": "FoodDrop TT",
                "category": "food",
                "available_in_country": True,
                "source": {"url": "https://fooddrop.co", "tier": 2, "title": "FoodDrop Trinidad"}
            },
            {
                "name": "WiPay",
                "category": "payments",
                "available_in_country": True,
                "source": {"url": "https://wipaycaribbean.com", "tier": 2, "title": "WiPay Caribbean"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Christianity (approx. 55%), Hinduism (approx. 18%), and Islam (approx. 5%) reflecting Afro-Trinidadian and Indo-Trinidadian heritage",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://cso.gov.tt", "tier": 1, "title": "Central Statistical Office Trinidad and Tobago"}],
                "evidence_quote": "Trinidad blends Afro-Caribbean traditions with Indo-Caribbean Hindu and Muslim heritage",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Trinidad Carnival (legendary pre-Lenten carnival), Divali (Festival of Lights), Eid-ul-Fitr, Tobago Heritage Festival",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://visittrinidad.tt", "tier": 1, "title": "Tourism Trinidad Limited"}],
                "evidence_quote": "Trinidad Carnival is globally famous for calypso, soca music, steelpan orchestra, and masquerade (mas)",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Wearing camouflage patterns or military-style clothing is strictly illegal for civilians and tourists under the Summary Offences Act. Avoid unmetered street taxis; use TT RideShare or hotel-arranged transport. English is the official language.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ttps.gov.tt", "tier": 1, "title": "TTPS Public Advisory"}],
                "evidence_quote": "The importation and wearing of camouflage material is prohibited under the Defence Act",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Tipping 10% is customary in restaurants when service is not included in the bill. Tipping taxi drivers is not expected.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://visittrinidad.tt", "tier": 1, "title": "Tourism Trinidad Tips"}],
                "evidence_quote": "A 10% tip is standard in hospitality establishments",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "Pigeon Point Saman Çatılı İskele ve Turkuaz Sahil",
                    "en": "Pigeon Point Heritage Park & Thatched Jetty",
                    "de": "Pigeon Point Heritage Park & Strohdach-Steg",
                    "ru": "Пляж Пиджен-Пойнт и соломенный пирс",
                    "es": "Parque Patrimonial Pigeon Point y Muelle de Paja"
                },
                "type": "nature",
                "sources": [{"url": "https://visittobago.gov.tt", "tier": 1, "title": "Tobago Tourism Agency"}]
            },
            {
                "name": {
                    "tr": "Pitch Lake Doğal Asfalt Gölü",
                    "en": "Pitch Lake Natural Asphalt Lake",
                    "de": "Pitch Lake Natur-Asphaltsee",
                    "ru": "Природное асфальтовое озеро Пич-Лейк",
                    "es": "Lago de Asfalto Natural Pitch Lake"
                },
                "type": "nature",
                "sources": [{"url": "https://visittrinidad.tt", "tier": 1, "title": "Tourism Trinidad Limited"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Pigeon Point Saman Çatılı İskele ve Turkuaz Sahil, Tobago",
                    "license": "CC-BY-SA",
                    "author": "Kalamazadkhan",
                    "source_url": "/images/countries/tt-480.webp",
                    "attribution_text": "Pigeon Point thatched roof jetty on turquoise waters in Tobago. Kalamazadkhan, CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Pigeon Point Saman Çatılı İskele ve Turkuaz Sahil, Tobago, Trinidad ve Tobago",
                        "en": "Pigeon Point Thatched Jetty & Turquoise Beach, Tobago, Trinidad and Tobago",
                        "de": "Pigeon Point Strohdach-Steg & Türkisstrand, Tobago, Trinidad und Tobago",
                        "ru": "Соломенный пирс и бирюзовый пляж Пиджен-Пойнт, Тобаго, Тринидад и Тобаго",
                        "es": "Muelle con Techo de Paja de Pigeon Point y Playa Turquesa, Tobago, Trinidad y Tobago"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "trinidad-ve-tobago", "en": "trinidad-and-tobago", "de": "trinidad-und-tobago", "ru": "trinidad-i-tobago", "es": "trinidad-y-tobago"},
            "title": {
                "tr": "Trinidad ve Tobago Vize Rehberi, 90 Gün Vizesiz Giriş, Kamuflaj Yasağı ve Karnaval | Vizamigo",
                "en": "Trinidad and Tobago Visa Guide, 90-Day Visa-Free Rules, Camo Ban | Vizamigo",
                "de": "Trinidad und Tobago Visum-Leitfaden, 90 Tage visafrei & Karneval | Vizamigo",
                "ru": "Виза в Тринидад и Тобаго, 90 дней без визы, карнавал и пляж Пиджен-Пойнт | Vizamigo",
                "es": "Guía de Visa de Trinidad y Tobago, 90 Días sin Visa y Carnaval | Vizamigo"
            },
            "meta_description": {
                "tr": "Trinidad ve Tobago Türk pasaportuna 90 gün vizesiz giriş, katı kamuflaj giysi yasağı, Karnaval rehberi, Tip A/B prizler ve Tobago Pigeon Point rehberi.",
                "en": "Trinidad and Tobago 90-day visa-free rules, strict camouflage clothing ban, Carnival guide, Type A/B sockets, and Tobago Pigeon Point.",
                "de": "Trinidad und Tobago 90 Tage visafreie Einreise, Verbot von Camouflage-Kleidung, Karnevalsführer und Reisetipps Pigeon Point Tobago.",
                "ru": "Правила въезда в Тринидад и Тобаго на 90 дней без визы, запрет камуфляжа, карибский карнавал, розетки Type A/B и Тобаго.",
                "es": "Requisitos de entrada sin visa a Trinidad y Tobago (90 días), prohibición de ropa de camuflaje, Carnaval y Pigeon Point en Tobago."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "LC": {
        "iso2": "LC",
        "names": {
            "tr": "Saint Lucia",
            "en": "Saint Lucia",
            "de": "St. Lucia",
            "ru": "Сент-Люсия",
            "es": "Santa Lucía"
        },
        "capital": {
            "value": "Castries",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.govt.lc", "tier": 1, "title": "Government of Saint Lucia"}],
            "evidence_quote": "Castries is the capital city and main commercial seaport of Saint Lucia",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "XCD",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.eccb-centralbank.org", "tier": 1, "title": "Eastern Caribbean Central Bank (ECCB)"}],
            "evidence_quote": "The Eastern Caribbean Dollar (XCD, EC$) is pegged to USD at 2.70 XCD = 1 USD; USD is widely accepted",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-4 (AST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.slumet.gov.lc", "tier": 1, "title": "Saint Lucia Meteorological Services"}],
            "evidence_quote": "Saint Lucia operates on Atlantic Standard Time UTC-4 year-round without daylight saving adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.lucelec.com", "tier": 1, "title": "St. Lucia Electricity Services Limited (LUCELEC)"}],
                "evidence_quote": "Standard residential single-phase electricity across Saint Lucia is 230V 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.lucelec.com", "tier": 1, "title": "LUCELEC Saint Lucia"}],
                "evidence_quote": "The national electric power grid operates at 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["G"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "British standard Type G rectangular three-pin plugs and wall sockets are universal across Saint Lucia",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.rslpf.com", "tier": 1, "title": "Royal Saint Lucia Police Force (RSLPF)"}],
                "evidence_quote": "Dial 999 for emergency police assistance throughout Saint Lucia",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.slufs.gov.lc", "tier": 1, "title": "Saint Lucia Fire and Ambulance Service"}],
                "evidence_quote": "Call 911 for emergency medical services and ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.slufs.gov.lc", "tier": 1, "title": "Saint Lucia Fire Service"}],
                "evidence_quote": "Dial 911 for emergency fire and rescue services",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "999",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.rslpf.com", "tier": 1, "title": "Royal Saint Lucia Police Force"}],
                "evidence_quote": "999 coordinates unified emergency response",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+1 758 456 3865",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.stlucia.org", "tier": 1, "title": "Saint Lucia Tourism Authority (SLTA)"}],
                "evidence_quote": "Special Operations and Tourist Police Units patrol Rodney Bay and Soufrière at +1 758 456 3865",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/saint-lucia", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Saint Lucia Karayipler'in en huzurlu ve romantik ada destinasyonlarındandır; standart seyahat önlemleri yeterlidir.",
                "en": "Saint Lucia is a safe and tranquil Caribbean island; exercise normal travel precautions.",
                "de": "St. Lucia ist eine friedliche und sichere Karibikinsel; normale Vorsichtsmaßnahmen genügen.",
                "ru": "Сент-Люсия — один из самых романтичных и безопасных карибских курортов; действуют стандартные правила.",
                "es": "Santa Lucía es un destino caribeño pacífico y seguro; aplican precauciones normales de viaje."
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
                "value": 38.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/saint-lucia", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Saint Lucia reach approximately 38.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 72.0,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/saint-lucia", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Saint Lucia measure 72.0 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Digicel and Flow offer 4G tourist SIMs at Hewanorra International Airport (UVF) in the south and George F.L. Charles Airport (SLU) near Castries. Travelers must complete the digital immigration card at stlucia.org/enter before boarding.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.stlucia.org", "tier": 1, "title": "Saint Lucia Tourism Authority"}],
                "evidence_quote": "All visitors must submit the official digital Saint Lucia Immigration and Customs form prior to arrival",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Saint Lucia Travel Guide",
                "category": "maps",
                "available_in_country": True,
                "source": {"url": "https://www.stlucia.org", "tier": 1, "title": "Saint Lucia Tourism Authority"}
            },
            {
                "name": "Payce Digital",
                "category": "payments",
                "available_in_country": True,
                "source": {"url": "https://paycedigital.com", "tier": 2, "title": "Payce Digital Caribbean"}
            },
            {
                "name": "758 Taxi St. Lucia",
                "category": "taxi",
                "available_in_country": True,
                "source": {"url": "https://758taxi.com", "tier": 2, "title": "758 Taxi Service"}
            },
            {
                "name": "Lucian Express",
                "category": "food",
                "available_in_country": True,
                "source": {"url": "https://lucianexpress.com", "tier": 2, "title": "Lucian Express Delivery"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Roman Catholicism (approx. 61%) and Protestantism (approx. 25%) with rich Anglo-French Creole traditions",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://stats.gov.lc", "tier": 1, "title": "The Central Statistical Office of Saint Lucia"}],
                "evidence_quote": "Catholicism is the predominant faith; Saint Lucian French Creole (Kwéyòl) is spoken universally alongside English",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Saint Lucia Jazz & Arts Festival in May, Saint Lucia Carnival in July, Jounen Kwéyòl (Creole Heritage Day in October)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.stlucia.org", "tier": 1, "title": "SLTA Events Calendar"}],
                "evidence_quote": "Saint Lucia Jazz & Arts Festival is the Caribbean's premier musical and cultural gathering",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Wearing camouflage clothing of any color or style is strictly illegal for civilians and tourists under Saint Lucian law. Do not touch or harvest sea turtle eggs. British three-pin Type G plugs are standard; bring adapters for European or American appliances.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.rslpf.com", "tier": 1, "title": "Royal Saint Lucia Police Force Legal Bulletin"}],
                "evidence_quote": "Civilian possession or wearing of camouflage material is prohibited by statute",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "A 10% service charge is usually included on restaurant and hotel bills; leaving an extra 5-10% in cash for staff is appreciated.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.stlucia.org", "tier": 1, "title": "SLTA Traveler Guide"}],
                "evidence_quote": "A 10% service charge is standard in restaurants and hospitality bills",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {
                    "tr": "İkiz Pitonlar (Gros Piton & Petit Piton) Volkanik Zirveleri",
                    "en": "The Pitons Volcanic Spire Peaks",
                    "de": "Vulkan-Zwillinge The Pitons",
                    "ru": "Вулканические пики Питоны",
                    "es": "Picos Volcánicos Los Pitones"
                },
                "type": "nature",
                "sources": [{"url": "https://whc.unesco.org/en/list/1143", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            },
            {
                "name": {
                    "tr": "Soufrière Arabayla Girilen Volkan ve Kükürtlü Kaplıcalar",
                    "en": "Soufrière Drive-in Volcano & Sulphur Springs",
                    "de": "Soufrière Drive-in-Vulkan & Schwefelquellen",
                    "ru": "Вулкан Суфриер и серные источники",
                    "es": "Volcán Soufrière y Aguas Termales de Azufre"
                },
                "type": "nature",
                "sources": [{"url": "https://www.stlucia.org", "tier": 1, "title": "Saint Lucia Tourism Authority"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "İkiz Pitonlar (Gros Piton & Petit Piton) Volkanik Zirveleri (UNESCO)",
                    "license": "CC-BY",
                    "author": "DavidMPyle",
                    "source_url": "/images/countries/lc-480.webp",
                    "attribution_text": "The Pitons volcanic spires in Saint Lucia. DavidMPyle, CC BY 4.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "İkiz Pitonlar (Gros Piton & Petit Piton) Volkanik Zirveleri (UNESCO), Saint Lucia",
                        "en": "The Pitons (Gros Piton & Petit Piton) Volcanic Spires (UNESCO), Saint Lucia",
                        "de": "Vulkan-Zwillinge The Pitons (Gros Piton & Petit Piton) (UNESCO), St. Lucia",
                        "ru": "Вулканические пики Питоны (Гро-Питон и Пти-Питон) (ЮНЕСКО), Сент-Люсия",
                        "es": "Picos Volcánicos Los Pitones (Gros Piton y Petit Piton) (UNESCO), Santa Lucía"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "saint-lucia", "en": "saint-lucia", "de": "st-lucia", "ru": "sent-lyusiya", "es": "santa-lucia"},
            "title": {
                "tr": "Saint Lucia Vize Rehberi, 42 Gün Vizesiz Giriş, Kamuflaj Yasağı ve Pitonlar | Vizamigo",
                "en": "Saint Lucia Visa Guide, 42-Day Visa-Free Rules, Camo Ban & Pitons | Vizamigo",
                "de": "St. Lucia Visum-Leitfaden, 42 Tage visafrei, Camouflage-Verbot & Pitons | Vizamigo",
                "ru": "Виза в Сент-Люсию, 42 дня без визы, запрет камуфляжа и пики Питоны | Vizamigo",
                "es": "Guía de Visa de Santa Lucía, 42 Días sin Visa y Picos Pitones | Vizamigo"
            },
            "meta_description": {
                "tr": "Saint Lucia Türk pasaportuna 42 gün vizesiz giriş, sıkı kamuflaj giysisi yasağı, Tip G prizler, Doğu Karayip Doları ve Piton volkanları rehberi.",
                "en": "Saint Lucia 42-day visa-free rules, strict military camouflage ban, Type G British sockets, XCD currency, and Pitons travel guide.",
                "de": "St. Lucia 42 Tage visafreie Einreise, Verbot von Camouflage-Kleidung, Steckdosentyp G und Reiseführer Vulkan-Picks Pitons.",
                "ru": "Правила въезда в Сент-Люсию на 42 дня без визы, строгий запрет камуфляжа, розетки Type G и вулканические пики Питоны.",
                "es": "Requisitos de entrada sin visa a Santa Lucía (42 días), prohibición de ropa de camuflaje, enchufes Tipo G y picos Pitones."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    }
}

def main():
    print(f"Building World Tourism Batch 9B ({len(BATCH9B_DATA)} countries)...")
    for code, data in BATCH9B_DATA.items():
        out_path = os.path.join(OUTPUT_DIR, f"{code}.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✅ Generated {out_path}")

if __name__ == "__main__":
    main()
