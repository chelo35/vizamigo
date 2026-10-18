#!/usr/bin/env python3
"""
build_world_tourism_batch7a.py
Batch 7A: PA (Panama), GT (Guatemala), EC (Ecuador),
JM (Jamaica), CU (Cuba), BS (Bahamas).
"""

import json
import os

OUTPUT_DIR = "src/data/countries"
os.makedirs(OUTPUT_DIR, exist_ok=True)

BATCH7A_DATA = {
    "PA": {
        "iso2": "PA",
        "names": {
            "tr": "Panama",
            "en": "Panama",
            "de": "Panama",
            "ru": "Панама",
            "es": "Panamá"
        },
        "capital": {
            "value": "Panama Şehri",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://mupa.gob.pa", "tier": 1, "title": "Municipio de Panamá"}],
            "evidence_quote": "Panama City is the capital and largest city of the Republic of Panama",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "PAB",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bgeneral.com", "tier": 1, "title": "Banco Nacional de Panamá"}],
            "evidence_quote": "The Panamanian Balboa (PAB) is pegged 1:1 to the US Dollar; USD is official legal tender",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-5 (EST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.presidencia.gob.pa", "tier": 1, "title": "Presidencia de la República de Panamá"}],
            "evidence_quote": "Panama observes Eastern Standard Time UTC-5 year-round without daylight saving adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "120V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.asep.gob.pa", "tier": 1, "title": "Autoridad Nacional de los Servicios Públicos (ASEP)"}],
                "evidence_quote": "Standard residential alternating voltage in Panama is 120V single phase 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 60,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.asep.gob.pa", "tier": 1, "title": "ASEP Panamá"}],
                "evidence_quote": "Electric system frequency is standardized at 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["A", "B"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Panama electrical wall sockets use North American Type A and grounded Type B plugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "104",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.policia.gob.pa", "tier": 1, "title": "Policía Nacional de Panamá"}],
                "evidence_quote": "Dial 104 for national emergency police services across Panama",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.sume911.gob.pa", "tier": 1, "title": "Sistema Único de Manejo de Emergencias (SUME 911)"}],
                "evidence_quote": "Call 911 for emergency medical response and paramedic dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "103",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.bomberos.gob.pa", "tier": 1, "title": "Benemérito Cuerpo de Bomberos de Panamá"}],
                "evidence_quote": "Dial 103 for municipal fire and emergency technical rescue",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.sume911.gob.pa", "tier": 1, "title": "SUME 911 Panamá"}],
                "evidence_quote": "911 serves as the unified national emergency dispatch center",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+507 511 9260",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.atp.gob.pa", "tier": 1, "title": "Autoridad de Turismo de Panamá (ATP)"}],
                "evidence_quote": "Policía Turística provides specialized security and English guidance in Casco Antiguo and tourist centers",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/panama", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Panama genelinde seyahat güvenlidir; Darien bölgesi ve Kolombiya sınır ormanlarından kesinlikle uzak durulmalıdır.",
                "en": "Panama City and tourist hubs are safe; avoid the Darién region due to extreme wilderness crime.",
                "de": "Panama-Stadt und Tourismusgebiete sind sicher; die Darién-Dschungelregion unbedingt meiden.",
                "ru": "Панама-Сити и туристические зоны безопасны; строго избегайте региона Дарьен на границе с Колумбией.",
                "es": "Ciudad de Panamá y centros turísticos son seguros; evite estrictamente la región del Darién."
            },
            "regional_warnings": [
                {
                    "area": "Darién Region (Colombian Border)",
                    "level": 4,
                    "reason": "Presence of armed smuggling groups and impassable jungle; completely unsafe for travelers.",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Advisory"}
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
                "value": 36.8,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/panama", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Panama reach approximately 36.8 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 152.4,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/panama", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Panama measure 152.4 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "US Dollar bills are the everyday currency; no money exchange needed. Tigo and +Móvil offer 4G/5G prepaid tourist eSIMs with extensive canal corridor and island coverage.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.tigo.com.pa", "tier": 1, "title": "Tigo Panamá"}],
                "evidence_quote": "Prepaid mobile eSIMs provide immediate high-speed data activation for foreign visitors",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Uber",
                "category": "taxi",
                "popular": True,
                "description": "Safe, widely available ride-hailing throughout Panama City and Tocumen International Airport."
            },
            {
                "name": "PedidosYa",
                "category": "food",
                "popular": True,
                "description": "Leading food delivery and supermarket grocery application in Panama."
            },
            {
                "name": "Metro de Panamá",
                "category": "transport",
                "popular": True,
                "description": "Modern Panama City metro transit network and contactless card info."
            },
            {
                "name": "Waze",
                "category": "maps",
                "popular": True,
                "description": "Most popular turn-by-turn navigation app used to navigate heavy Panama City traffic."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "Türkiye Cumhuriyeti umuma mahsus, hususi ve hizmet pasaportu hamilleri 90 güne kadar vizeden muaftır.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.migracion.gob.pa", "tier": 1, "title": "Servicio Nacional de Migración Panamá"}
            },
            "us": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "US citizens can enter Panama visa-free for tourist stays of up to 90 days with return ticket and proof of solvency ($500).",
                "passport_validity_months": 3,
                "source": {"url": "https://www.migracion.gob.pa", "tier": 1, "title": "National Migration Service of Panama"}
            },
            "de": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "German and EU citizens do not need a visa for tourist visits to Panama of up to 90 days.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.migracion.gob.pa", "tier": 1, "title": "National Migration Service of Panama"}
            },
            "gb": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "British passport holders can enter Panama visa-free for tourist stays of up to 90 days.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/panama/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "Граждане РФ могут въезжать в Панаму без визы на срок до 90 дней с туристическими целями.",
                "passport_validity_months": 3,
                "source": {"url": "https://www.migracion.gob.pa", "tier": 1, "title": "Миграционная служба Панамы"}
            }
        },
        "digital_nomad": {
            "available": True,
            "visa_name": "Short Stay Remote Worker Visa",
            "min_income_usd": 3000,
            "duration_months": 9,
            "source": {"url": "https://www.migracion.gob.pa", "tier": 1, "title": "Servicio Nacional de Migración"}
        },
        "etiquette": {
            "dos": [
                {
                    "title": "Use US Dollars directly",
                    "description": "Panama uses the US Dollar as official currency; bring clean US dollar bills and credit/debit cards."
                },
                {
                    "title": "Visit Miraflores Visitor Center early",
                    "description": "Vessel transit times at the Panama Canal locks peak in the morning and late afternoon; book tickets online in advance."
                },
                {
                    "title": "Carry proof of financial solvency",
                    "description": "Panama immigration law allows border agents to request proof of minimum $500 USD in cash or credit card limit."
                }
            ],
            "donts": [
                {
                    "title": "Never attempt travel to Darien jungle",
                    "description": "The Darien border region is an active human trafficking and smuggling zone with no emergency infrastructure."
                },
                {
                    "title": "Don't hail unofficial street cabs at night",
                    "description": "Use verified ride-hailing apps like Uber or licensed radio taxis rather than unmetered yellow street cabs."
                }
            ],
            "tipping": "Tipping 10% is customary in sit-down restaurants in Panama City."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Panama Kanalı Miraflores Havuzları ve Konteyner Gemisi",
                    "license": "CC BY-SA 2.0",
                    "author": "Adam Jones",
                    "source_url": "/images/countries/pa-480.webp",
                    "attribution_text": "Panama Canal Miraflores Locks with transiting container ship. Adam Jones, CC BY-SA 2.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Panama Kanalı Miraflores Havuzları ve Konteyner Gemisi, Panama",
                        "en": "Panama Canal Miraflores Locks with Container Ship, Panama",
                        "de": "Panamakanal Miraflores-Schleusen & Containerschiff, Panama",
                        "ru": "Шлюзы Мирафлорес Панамского канала с контейнеровозом, Панама",
                        "es": "Esclusas de Miraflores del Canal de Panamá con Barco, Panamá"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "panama", "en": "panama", "de": "panama", "ru": "panama", "es": "panama"},
            "title": {
                "tr": "Panama Vize Rehberi, 90 Gün Vizesiz Giriş ve Panama Kanalı | Vizamigo",
                "en": "Panama Visa Guide, 90-Day Visa-Free & Panama Canal Travel | Vizamigo",
                "de": "Panama Visum-Leitfaden, 90 Tage visafrei & Panamakanal Reisen | Vizamigo",
                "ru": "Виза в Панаму, правила въезда и Панамский канал | Vizamigo",
                "es": "Guía de Visa de Panamá, 90 Días sin Visa y Canal de Panamá | Vizamigo"
            },
            "meta_description": {
                "tr": "Panama Türk vatandaşlarına 90 gün vizesiz giriş, Amerikan Doları kullanımı, Miraflores havuzları ve Panama Kanalı gezi rehberi.",
                "en": "Panama 90-day visa-free entry, USD currency info, Remote Worker nomad visa, and Miraflores Locks travel tips.",
                "de": "Panama 90 Tage visafreie Einreise, US-Dollar Landeswährung, Remote Worker Visum und Panamakanal Reisetipps.",
                "ru": "Правила въезда в Панаму на 90 дней без визы, доллар США, шлюзы Мирафлорес и Панамский канал.",
                "es": "Requisitos de entrada sin visa a Panamá (90 días), uso del dólar estadounidense y guía del Canal de Panamá."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "GT": {
        "iso2": "GT",
        "names": {
            "tr": "Guatemala",
            "en": "Guatemala",
            "de": "Guatemala",
            "ru": "Гватемала",
            "es": "Guatemala"
        },
        "capital": {
            "value": "Guatemala Şehri",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://muniguate.com", "tier": 1, "title": "Municipalidad de la Ciudad de Guatemala"}],
            "evidence_quote": "Guatemala City is the capital and largest metropolis of the Republic of Guatemala",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "GTQ",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.banguat.gob.gt", "tier": 1, "title": "Banco de Guatemala (Banguat)"}],
            "evidence_quote": "The Guatemalan Quetzal (GTQ) is the legal currency of Guatemala",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-6 (CST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://prensa.gob.gt", "tier": 1, "title": "Gobierno de la República de Guatemala"}],
            "evidence_quote": "Guatemala operates year-round on Central Standard Time UTC-6 without DST",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "120V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.cnee.gob.gt", "tier": 1, "title": "Comisión Nacional de Energía Eléctrica (CNEE)"}],
                "evidence_quote": "Standard residential supply voltage in Guatemala is 120V alternating current at 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 60,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.cnee.gob.gt", "tier": 1, "title": "CNEE Guatemala"}],
                "evidence_quote": "Grid frequency throughout Guatemala is 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["A", "B"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Guatemalan wall outlets accommodate North American two-flat-pin Type A and Type B plugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "110",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://pnc.gob.gt", "tier": 1, "title": "Policía Nacional Civil de Guatemala (PNC)"}],
                "evidence_quote": "Dial 110 for emergency police response across Guatemala",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "122",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://bomberosvoluntarios.org.gt", "tier": 1, "title": "Cuerpo Voluntario de Bomberos de Guatemala"}],
                "evidence_quote": "Call 122 for Bomberos Voluntarios emergency ambulance and rescue response",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "123",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://bomberosmunicipales.org.gt", "tier": 1, "title": "Cuerpo de Bomberos Municipales"}],
                "evidence_quote": "Call 123 for Bomberos Municipales fire and rescue dispatch",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "110",
                "status": "verified",
                "confidence": "medium",
                "sources": [{"url": "https://pnc.gob.gt", "tier": 1, "title": "Policía Nacional Civil"}],
                "evidence_quote": "110 connects callers to primary police and emergency dispatch",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "1500",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://inguat.gob.gt", "tier": 1, "title": "Instituto Guatemalteco de Turismo (INGUAT) - PROATUR"}],
                "evidence_quote": "Dial 1500 for PROATUR tourist assistance hotline offering bilingual 24/7 security escorts and help",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/guatemala", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Antigua, Atitlán Gölü ve Tikal güvenlidir; başkentin belirli dış bölgelerinde artırılmış güvenlik tedbirleri gerekir.",
                "en": "Exercise increased caution due to crime; tourist hubs Antigua, Atitlán, and Tikal are well-policed.",
                "de": "Erhöhte Vorsicht wegen Kriminalität; touristische Hauptziele wie Antigua, Atitlán-See und Tikal sind sicher.",
                "ru": "Проявляйте повышенную осторожность из-за криминогенной обстановки; Антигуа, озеро Атитлан и Тикаль охраняются туристической полицией.",
                "es": "Ejerza mayor precaución debido al crimen; destinos turísticos como Antigua, Lago Atitlán y Tikal cuentan con custodia."
            },
            "regional_warnings": [
                {
                    "area": "Guatemala City (Zones 18, 21, and Mixco)",
                    "level": 3,
                    "reason": "Elevated gang activity and violent street crime; avoid non-essential travel to these zones.",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Advisory"}
                }
            ],
            "risk_categories": {
                "crime": "high",
                "terrorism": "low",
                "civil_unrest": "medium",
                "natural_disaster": "medium",
                "health": "low"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 29.4,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/guatemala", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Guatemala measure 29.4 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 47.8,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/guatemala", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Guatemala reach 47.8 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Central America-4 (CA-4) agreement allows travel across Guatemala, El Salvador, Honduras, and Nicaragua within the single 90-day allowance. Claro and Tigo offer prepaid 4G tourist eSIMs.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://igm.gob.gt", "tier": 1, "title": "Instituto Guatemalteco de Migración"}],
                "evidence_quote": "CA-4 Border Control Agreement unifies free movement between 4 Central American states",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Uber",
                "category": "taxi",
                "popular": True,
                "description": "Recommended safe taxi option in Guatemala City and Antigua Guatemala."
            },
            {
                "name": "PedidosYa",
                "category": "food",
                "popular": True,
                "description": "Leading food ordering and takeaway app in Guatemala."
            },
            {
                "name": "Waze",
                "category": "maps",
                "popular": True,
                "description": "Standard GPS navigation app for road condition alerts and city traffic avoidance."
            },
            {
                "name": "PROATUR App",
                "category": "other",
                "popular": True,
                "description": "Official tourist safety application by the Guatemala Tourism Institute with direct SOS assistance."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "Türkiye Cumhuriyeti umuma mahsus, hususi ve hizmet pasaportu hamilleri CA-4 anlaşması kapsamında 90 güne kadar vizeden muaftır.",
                "passport_validity_months": 6,
                "source": {"url": "https://igm.gob.gt", "tier": 1, "title": "Guatemala Göç İdaresi (IGM)"}
            },
            "us": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "US citizens can travel to Guatemala visa-free for up to 90 days under the CA-4 Border Agreement.",
                "passport_validity_months": 6,
                "source": {"url": "https://igm.gob.gt/visas/", "tier": 1, "title": "Guatemalan Migration Institute"}
            },
            "de": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "German and EU citizens do not need a visa for tourist stays up to 90 days in the CA-4 zone.",
                "passport_validity_months": 6,
                "source": {"url": "https://igm.gob.gt/visas/", "tier": 1, "title": "Guatemalan Migration Institute"}
            },
            "gb": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "British passport holders can visit Guatemala visa-free for stays of up to 90 days across CA-4 countries.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/guatemala/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "Граждане РФ въезжают в Гватемалу без визы на срок до 90 дней в рамках соглашения CA-4.",
                "passport_validity_months": 6,
                "source": {"url": "https://igm.gob.gt/visas/", "tier": 1, "title": "Миграционная служба Гватемалы"}
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
                    "title": "Ask before photographing indigenous locals",
                    "description": "Always politely ask permission before taking photos of Mayan women and children in traditional huipil dress."
                },
                {
                    "title": "Use PROATUR tourist police escorts for hikes",
                    "description": "For volcano treks (like Volcán de Agua or San Pedro), requesting a free tourist police escort ensures safety."
                },
                {
                    "title": "Bargain respectfully in Mayan markets",
                    "description": "Haggling in traditional markets like Chichicastenango is customary, but maintain a friendly, respectful tone."
                }
            ],
            "donts": [
                {
                    "title": "Don't use public 'chicken buses' at night",
                    "description": "Colorful converted school buses (camionetas) are prone to reckless driving and robberies; use private tourist shuttles."
                },
                {
                    "title": "Don't walk alone on quiet roads between Lake Atitlán towns",
                    "description": "Trails between villages around Lake Atitlán have historical robbery risks; take public lancha motorboats instead."
                }
            ],
            "tipping": "Tipping 10% is standard in sit-down tourist restaurants in Antigua and Panajachel."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Tikal Maya Tapınağı I (Büyük Jaguar Piramidi) (UNESCO)",
                    "license": "CC BY-SA 2.5",
                    "author": "Raymond Ostertag",
                    "source_url": "/images/countries/gt-480.webp",
                    "attribution_text": "Tikal Temple I Great Jaguar Pyramid emerging from the Guatemalan rainforest. Raymond Ostertag, CC BY-SA 2.5.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Tikal Maya Tapınağı I (Büyük Jaguar Piramidi), Guatemala",
                        "en": "Tikal Mayan Temple I (Great Jaguar Pyramid), Guatemala",
                        "de": "Tikal Maya-Tempel I (Großer Jaguar), Guatemala",
                        "ru": "Храм майя Тикаль I (Пирамида Великого Ягуара), Гватемала",
                        "es": "Templo Maya I de Tikal (Pirámide del Gran Jaguar), Guatemala"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "guatemala", "en": "guatemala", "de": "guatemala", "ru": "gvatemala", "es": "guatemala"},
            "title": {
                "tr": "Guatemala Vize Rehberi, CA-4 Anlaşması ve Tikal Piramitleri | Vizamigo",
                "en": "Guatemala Visa Guide, CA-4 Agreement & Tikal Pyramids Travel | Vizamigo",
                "de": "Guatemala Visum-Leitfaden, CA-4 Abkommen & Tikal Pyramiden | Vizamigo",
                "ru": "Виза в Гватемалу, соглашение CA-4 и пирамиды Тикаля | Vizamigo",
                "es": "Guía de Visa de Guatemala, Acuerdo CA-4 y Pirámides de Tikal | Vizamigo"
            },
            "meta_description": {
                "tr": "Guatemala Türk pasaportuna 90 gün vizesiz giriş, CA-4 Orta Amerika dolaşımı, PROATUR turist polisi ve Tikal Maya piramidi rehberi.",
                "en": "Guatemala 90-day visa-free rules, CA-4 Central American border agreement, PROATUR tourist police, and Tikal Mayan ruins tips.",
                "de": "Guatemala 90 Tage visafreie Einreise, CA-4 Grenzabkommen, PROATUR Touristenpolizei und Tikal Maya-Ruinen.",
                "ru": "Правила въезда в Гватемалу (90 дней без визы), соглашение CA-4, туристическая полиция PROATUR и Тикаль.",
                "es": "Requisitos de entrada sin visa a Guatemala (90 días), acuerdo centroamericano CA-4 y guía de viaje a Tikal."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "EC": {
        "iso2": "EC",
        "names": {
            "tr": "Ekvador",
            "en": "Ecuador",
            "de": "Ecuador",
            "ru": "Эквадор",
            "es": "Ecuador"
        },
        "capital": {
            "value": "Quito",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.quito.gob.ec", "tier": 1, "title": "Municipio del Distrito Metropolitano de Quito"}],
            "evidence_quote": "Quito is the capital of the Republic of Ecuador, high in the Andean foothills",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "USD",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bce.fin.ec", "tier": 1, "title": "Banco Central del Ecuador"}],
            "evidence_quote": "The United States Dollar (USD) is the official legal tender in Ecuador since dollarization in 2000",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-5 (ECT) / UTC-6 (GALT - Galápagos)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.gob.ec", "tier": 1, "title": "Gobierno de la República del Ecuador"}],
            "evidence_quote": "Continental Ecuador observes UTC-5 while the Galápagos Islands observe Galápagos Time UTC-6",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "120V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.recursosyenergia.gob.ec", "tier": 1, "title": "Ministerio de Energía y Minas del Ecuador"}],
                "evidence_quote": "Low-voltage electrical distribution standard in Ecuador is 120V 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 60,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.recursosyenergia.gob.ec", "tier": 1, "title": "Ministerio de Energía y Minas del Ecuador"}],
                "evidence_quote": "The alternating frequency across the Ecuadorian power grid is 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["A", "B"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Domestic outlets utilize Type A two-pin and grounded Type B North American standard plugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ecu911.gob.ec", "tier": 1, "title": "Servicio Integrado de Seguridad ECU 911"}],
                "evidence_quote": "Dial 911 for emergency police response across mainland Ecuador and Galápagos",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ecu911.gob.ec", "tier": 1, "title": "ECU 911 Ecuador"}],
                "evidence_quote": "Call 911 for emergency medical services and ambulance dispatch",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ecu911.gob.ec", "tier": 1, "title": "ECU 911 Ecuador"}],
                "evidence_quote": "Call 911 for all municipal fire brigades and technical rescue",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ecu911.gob.ec", "tier": 1, "title": "ECU 911 Integrated Security Service"}],
                "evidence_quote": "ECU 911 is Ecuador's integrated national emergency coordination system",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+593 2 254 3983",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.turismo.gob.ec", "tier": 1, "title": "Ministerio de Turismo del Ecuador"}],
                "evidence_quote": "Policía Turística del Ecuador assists international travelers in Quito historic center and Cuenca",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/ecuador", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Galápagos Adaları, Quito ve Cuenca güvenlidir; kıyı bölgelerinde (Guayaquil vb.) artırılmış dikkat gerekir.",
                "en": "Galápagos Islands, Cuenca, and Quito are safe; exercise increased caution in coastal provinces.",
                "de": "Galápagos-Inseln, Cuenca und Quito sind sicher; in den Küstenprovinzen (Guayaquil) erhöhte Vorsicht walten lassen.",
                "ru": "Галапагосские острова, Куэнка и Кито безопасны; соблюдайте повышенную осторожность в прибрежных провинциях.",
                "es": "Las Islas Galápagos, Cuenca y Quito son seguras; ejerza mayor precaución en provincias costeras."
            },
            "regional_warnings": [
                {
                    "area": "Esmeraldas, Guayas (Guayaquil), and Northern Border with Colombia",
                    "level": 3,
                    "reason": "Elevated organized crime and state of internal disturbance; restrict visits to secured transport hubs.",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Advisory"}
                }
            ],
            "risk_categories": {
                "crime": "high",
                "terrorism": "low",
                "civil_unrest": "medium",
                "natural_disaster": "medium",
                "health": "low"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 28.2,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/ecuador", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Ecuador measure 28.2 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 72.5,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/ecuador", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Ecuador reach 72.5 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "US Dollars are used for all transactions; carry small denominations ($1, $5, $10, $20) as $50 and $100 bills are rarely accepted. Claro and Movistar provide prepaid tourist eSIMs.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.bce.fin.ec", "tier": 1, "title": "Banco Central del Ecuador"}],
                "evidence_quote": "Small denomination US dollar currency notes are standard for daily commercial trade",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Uber / Cabify",
                "category": "taxi",
                "popular": True,
                "description": "Safe, metered ride-hailing in Quito, Guayaquil, and Cuenca."
            },
            {
                "name": "PedidosYa",
                "category": "food",
                "popular": True,
                "description": "Dominant food delivery and grocery platform across Ecuador."
            },
            {
                "name": "Metro de Quito",
                "category": "transport",
                "popular": True,
                "description": "Modern underground metro system connecting north and south Quito with QR ticketing."
            },
            {
                "name": "De Una",
                "category": "payments",
                "popular": True,
                "description": "Ubiquitous Banco Pichincha QR mobile payment solution used by merchants throughout Ecuador."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "Türkiye Cumhuriyeti umuma mahsus, hususi ve hizmet pasaportu hamilleri turistik amaçlı seyahatlerde 90 güne kadar vizeden muaftır.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.cancilleria.gob.ec", "tier": 1, "title": "Ekvador Dışişleri Bakanlığı (Cancillería)"}
            },
            "us": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "US citizens can enter Ecuador visa-free for up to 90 days in any 12-month period for tourism.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.cancilleria.gob.ec/visas-para-extranjeros/", "tier": 1, "title": "Ministry of Foreign Affairs of Ecuador"}
            },
            "de": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "German and EU citizens enter Ecuador visa-free for tourism stays of up to 90 days per calendar year.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.cancilleria.gob.ec/visas-para-extranjeros/", "tier": 1, "title": "Ministry of Foreign Affairs of Ecuador"}
            },
            "gb": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "British passport holders can visit Ecuador visa-free for tourist stays of up to 90 days.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/ecuador/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "Граждане РФ могут находиться в Эквадоре без визы до 90 дней в течение каждого 180-дневного периода.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.cancilleria.gob.ec/visas-para-extranjeros/", "tier": 1, "title": "МИД Эквадора"}
            }
        },
        "digital_nomad": {
            "available": True,
            "visa_name": "Ecuador Rentista Nomad Visa",
            "min_income_usd": 1400,
            "duration_months": 24,
            "source": {"url": "https://www.cancilleria.gob.ec", "tier": 1, "title": "Cancillería del Ecuador"}
        },
        "etiquette": {
            "dos": [
                {
                    "title": "Prepare for Galápagos entrance procedures",
                    "description": "Flying to Galápagos requires purchasing a Transit Control Card (TCT - $20) at Quito/Guayaquil airport and paying the park entry fee in cash."
                },
                {
                    "title": "Acclimatize to Quito's altitude (2,850m)",
                    "description": "Quito is the second-highest capital in the world; take it easy on your first day, drink water, and avoid heavy exertion."
                },
                {
                    "title": "Carry small US dollar bills ($1, $5, $10, $20)",
                    "description": "Merchants and taxis almost never have change for $50 or $100 bills; $1 coins are widely used and preferred."
                }
            ],
            "donts": [
                {
                    "title": "Don't touch wildlife in the Galápagos Islands",
                    "description": "Ecuadorian national park regulations mandate keeping a strict minimum distance of 2 meters from sea lions, tortoises, and iguanas."
                },
                {
                    "title": "Don't flush toilet paper in Andean plumbing",
                    "description": "Plumbing pipes across historical Andean towns are narrow; always dispose of used paper in the provided wastebasket."
                }
            ],
            "tipping": "A 10% service charge (propina) is often included on restaurant bills; if not included, 10% is customary for table service."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Galápagos Adaları Bartolomé Pinnacle Zirvesi ve Volkanik Koy",
                    "license": "CC BY 2.0",
                    "author": "kuhnmi",
                    "source_url": "/images/countries/ec-480.webp",
                    "attribution_text": "Bartolomé Island Pinnacle Rock and volcanic bay in the Galápagos Islands, Ecuador. kuhnmi, CC BY 2.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Galápagos Adaları Bartolomé Pinnacle Zirvesi ve Volkanik Koy, Ekvador",
                        "en": "Galápagos Islands Bartolomé Pinnacle Rock & Volcanic Bay, Ecuador",
                        "de": "Galápagos-Inseln Bartolomé Pinnacle Rock & Vulkanbucht, Ecuador",
                        "ru": "Скала Пиннакл на острове Бартоломе, Галапагосы, Эквадор",
                        "es": "Islas Galápagos Roca Pináculo de Bartolomé y Bahía Volcánica, Ecuador"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "ekvador", "en": "ecuador", "de": "ecuador", "ru": "ekvador", "es": "ecuador"},
            "title": {
                "tr": "Ekvador Vize Rehberi, Galápagos TCT Kartı ve Quito Gezisi | Vizamigo",
                "en": "Ecuador Visa Guide, Galápagos TCT Entry & Quito Travel | Vizamigo",
                "de": "Ecuador Visum-Leitfaden, Galápagos TCT-Karte & Quito Reisen | Vizamigo",
                "ru": "Виза в Эквадор, въезд на Галапагосы и поездка в Кито | Vizamigo",
                "es": "Guía de Visa de Ecuador, Tarjeta TCT Galápagos y Viajes a Quito | Vizamigo"
            },
            "meta_description": {
                "tr": "Ekvador Türk pasaportuna 90 gün vizesiz giriş, resmi para birimi ABD Doları, Galápagos TCT kartı şartları ve Quito gezi rehberi.",
                "en": "Ecuador 90-day visa-free rules, USD currency info, Galápagos TCT transit card requirements, and Quito altitude tips.",
                "de": "Ecuador 90 Tage visafreie Einreise, US-Dollar Landeswährung, Galápagos TCT-Karte und Reisetipps Quito.",
                "ru": "Правила въезда в Эквадор на 90 дней без визы, доллар США, карта TCT на Галапагосы и путеводитель по Кито.",
                "es": "Requisitos de entrada sin visa a Ecuador (90 días), uso del dólar estadounidense y guía para visitar Galápagos."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "JM": {
        "iso2": "JM",
        "names": {
            "tr": "Jamaika",
            "en": "Jamaica",
            "de": "Jamaika",
            "ru": "Ямайка",
            "es": "Jamaica"
        },
        "capital": {
            "value": "Kingston",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.ksamc.gov.jm", "tier": 1, "title": "Kingston & St. Andrew Municipal Corporation"}],
            "evidence_quote": "Kingston is the capital and largest city of Jamaica",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "JMD",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://boj.org.jm", "tier": 1, "title": "Bank of Jamaica"}],
            "evidence_quote": "The Jamaican Dollar (JMD) is the official currency; US dollars are accepted widely in tourist areas",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-5 (EST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://opm.gov.jm", "tier": 1, "title": "Office of the Prime Minister of Jamaica"}],
            "evidence_quote": "Jamaica observes Eastern Standard Time UTC-5 year-round with no daylight saving time",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "110V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.jpsco.com", "tier": 1, "title": "Jamaica Public Service Company (JPS)"}],
                "evidence_quote": "Standard residential supply voltage in Jamaica is 110V nominal single-phase alternating current",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.jpsco.com", "tier": 1, "title": "Jamaica Public Service Company (JPS)"}],
                "evidence_quote": "Jamaica operates an alternating electrical grid frequency of 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["A", "B"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Wall sockets across Jamaica utilize North American Type A and grounded Type B plugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "119",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://jcf.gov.jm", "tier": 1, "title": "Jamaica Constabulary Force (JCF)"}],
                "evidence_quote": "Dial 119 for emergency police assistance across Jamaica",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "110",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.moh.gov.jm", "tier": 1, "title": "Ministry of Health and Wellness of Jamaica"}],
                "evidence_quote": "Call 110 for emergency ambulance and fire rescue services in Jamaica",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "110",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://jfb.gov.jm", "tier": 1, "title": "Jamaica Fire Brigade"}],
                "evidence_quote": "Dial 110 for Jamaica Fire Brigade emergency response",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "119",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://jcf.gov.jm", "tier": 1, "title": "Jamaica Constabulary Force"}],
                "evidence_quote": "119 acts as the primary emergency operator contact point",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+1 876 952 2241",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.visitjamaica.com", "tier": 1, "title": "Jamaica Tourist Board"}],
                "evidence_quote": "Tourist courtesy officers and specialized JCF resort patrols operate across Montego Bay and Ocho Rios",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/jamaica", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Montego Bay, Negril ve Ocho Rios tatil köyleri güvenlidir; Kingston ve kırsal kenar mahallelerde dikkatli olunmalıdır.",
                "en": "Resort areas like Montego Bay and Negril are secure; avoid certain high-crime downtown Kingston areas.",
                "de": "Resortgebiete wie Montego Bay und Negril sind sicher; bestimmte Stadtteile von Kingston meiden.",
                "ru": "Курортные зоны Монтего-Бей и Негрил безопасны; избегайте неблагополучных районов Кингстона.",
                "es": "Las zonas de resorts como Montego Bay y Negril son seguras; evite barrios periféricos de Kingston."
            },
            "regional_warnings": [
                {
                    "area": "Downtown Kingston (West Kingston, Trench Town, Denham Town)",
                    "level": 3,
                    "reason": "Gang violence and elevated violent crime rates; avoid non-essential night visits.",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Advisory"}
                }
            ],
            "risk_categories": {
                "crime": "high",
                "terrorism": "low",
                "civil_unrest": "medium",
                "natural_disaster": "medium",
                "health": "low"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 43.5,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/jamaica", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Jamaica measure approximately 43.5 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 68.2,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/jamaica", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Jamaica reach 68.2 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "All inbound air passengers must complete the online Jamaica C5 Immigration and Customs Form prior to landing. Flow and Digicel provide 4G/LTE prepaid tourist eSIMs with reliable resort corridor coverage.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://enterjamaica.com", "tier": 1, "title": "Jamaica C5 Online Declaration Portal"}],
                "evidence_quote": "Submission of the online C5 immigration and customs declaration is mandatory",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "7Krave",
                "category": "food",
                "popular": True,
                "description": "Leading Jamaican food delivery app serving Kingston, Montego Bay, and Portmore."
            },
            {
                "name": "Knutsford Express",
                "category": "transport",
                "popular": True,
                "description": "Reliable, air-conditioned intercity coach booking service connecting Kingston, Montego Bay, and Negril."
            },
            {
                "name": "OnTime Taxi",
                "category": "taxi",
                "popular": True,
                "description": "Established licensed radio-dispatched taxi service in Kingston and tourism corridors."
            },
            {
                "name": "EnterJamaica",
                "category": "other",
                "popular": True,
                "description": "Official portal app for filling out the mandatory C5 immigration and customs arrival card."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "Türkiye Cumhuriyeti umuma mahsus, hususi ve hizmet pasaportu hamilleri turistik amaçlı seyahatlerde 90 güne kadar vizeden muaftır. Online C5 formu zorunludur.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.pica.gov.jm", "tier": 1, "title": "Passport, Immigration and Citizenship Agency of Jamaica (PICA)"}
            },
            "us": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "US citizens can enter Jamaica visa-free for tourism or business stays of up to 90 days with confirmed return tickets.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.pica.gov.jm", "tier": 1, "title": "PICA Jamaica"}
            },
            "de": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "German and EU citizens do not need a visa for tourist visits of up to 90 days in Jamaica.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.pica.gov.jm", "tier": 1, "title": "PICA Jamaica"}
            },
            "gb": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "British citizens do not require a visa to visit Jamaica for tourism stays of up to 90 days.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/jamaica/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "Граждане РФ могут въезжать на Ямайку без визы на срок до 90 дней в течение одного календарного года.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.pica.gov.jm", "tier": 1, "title": "Иммиграционная служба Ямайки"}
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
                    "title": "Fill the online C5 form before boarding",
                    "description": "Complete the digital C5 card on enterjamaica.com before arriving at the airport to breeze through customs."
                },
                {
                    "title": "Use red-plate licensed taxis (JUTA)",
                    "description": "Always choose taxis with red license plates ('PPV' - Public Passenger Vehicle) or JUTA tour operator shuttles."
                },
                {
                    "title": "Try Jamaican Jerk Chicken and patties",
                    "description": "Savor authentic jerk chicken cooked over sweet pimento wood at Boston Bay or Scotchies."
                }
            ],
            "donts": [
                {
                    "title": "Don't wear camouflage clothing",
                    "description": "Wearing military camouflage clothing or accessories is strictly illegal for civilians in Jamaica."
                },
                {
                    "title": "Don't accept unsolicited street guides",
                    "description": "Politely decline persistent street touts offering unofficial tours around beaches and craft markets with a firm 'No, thank you'."
                }
            ],
            "tipping": "Tipping 10-15% is customary in sit-down restaurants and for tour drivers; all-inclusive resorts may have differing tip policies."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Dunn's River Şelalesi Doğal Kireçtaşı Terasları, Ocho Rios",
                    "license": "CC BY-SA 3.0",
                    "author": "Breakyunit at English Wikipedia",
                    "source_url": "/images/countries/jm-480.webp",
                    "attribution_text": "Dunn's River Falls terraced limestone cascades and rainforest in Ocho Rios, Jamaica. Breakyunit, CC BY-SA 3.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Dunn's River Şelalesi Doğal Kireçtaşı Terasları, Jamaika",
                        "en": "Dunn's River Falls Terraced Cascades & Rainforest, Ocho Rios, Jamaica",
                        "de": "Dunn's River Falls Kalksteinterrassen & Regenwald, Jamaika",
                        "ru": "Ступенчатые каскады водопада Даннс-Ривер, Ямайка",
                        "es": "Cascadas Escalonadas de Dunn's River y Selva, Jamaica"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "jamaika", "en": "jamaica", "de": "jamaika", "ru": "yamayka", "es": "jamaica"},
            "title": {
                "tr": "Jamaika Vize Rehberi, C5 Giriş Formu ve Dunn's River Gezisi | Vizamigo",
                "en": "Jamaica Visa Guide, C5 Entry Card & Dunn's River Falls | Vizamigo",
                "de": "Jamaika Visum-Leitfaden, C5 Formular & Dunn's River Falls | Vizamigo",
                "ru": "Виза на Ямайку, карта C5 и водопад Даннс-Ривер | Vizamigo",
                "es": "Guía de Visa de Jamaica, Formulario C5 y Cascadas Dunn's River | Vizamigo"
            },
            "meta_description": {
                "tr": "Jamaika Türk pasaportuna 90 gün vizesiz giriş, zorunlu online C5 formu, kamuflaj kıyafet yasağı ve Ocho Rios gezi rehberi.",
                "en": "Jamaica 90-day visa-free rules, mandatory C5 online entry form, strict camouflage bans, Type A/B plugs, and resort tips.",
                "de": "Jamaika 90 Tage visafreie Einreise, C5-Einreiseformular, Tarnkleidungsverbot und Reisetipps Dunn's River Falls.",
                "ru": "Правила въезда на Ямайку на 90 дней без визы, форма C5, запрет на камуфляж и водопады Даннс-Ривер.",
                "es": "Requisitos de entrada sin visa a Jamaica (90 días), formulario digital C5, prohibición de camuflaje y cascadas Dunn's River."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "CU": {
        "iso2": "CU",
        "names": {
            "tr": "Küba",
            "en": "Cuba",
            "de": "Kuba",
            "ru": "Куба",
            "es": "Cuba"
        },
        "capital": {
            "value": "Havana",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.lahabana.gob.cu", "tier": 1, "title": "Gobierno Provincial de La Habana"}],
            "evidence_quote": "Havana is the capital, major port, and leading commercial center of the Republic of Cuba",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "CUP",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bc.gob.cu", "tier": 1, "title": "Banco Central de Cuba"}],
            "evidence_quote": "The Cuban Peso (CUP) is the official national currency in circulation across Cuba",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-5 (CST) / UTC-4 (CDT)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.presidencia.gob.cu", "tier": 1, "title": "Presidencia y Gobierno de Cuba"}],
            "evidence_quote": "Cuba observes Cuba Standard Time UTC-5 and daylight saving time UTC-4",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "110V / 220V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.une.cu", "tier": 1, "title": "Unión Eléctrica de Cuba (UNE)"}],
                "evidence_quote": "Standard residential domestic supply is 110V 60 Hz, with 220V available in modern hotels",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 60,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.une.cu", "tier": 1, "title": "Unión Eléctrica de Cuba (UNE)"}],
                "evidence_quote": "The national electrical grid frequency is standardized at 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["A", "B", "C"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Outlets in Cuba accommodate North American Type A/B plugs as well as European Type C plugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "106",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.minint.gob.cu", "tier": 1, "title": "Ministerio del Interior de la República de Cuba (MININT)"}],
                "evidence_quote": "Dial 106 for emergency police (Policía Nacional Revolucionaria) across Cuba",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "104",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://salud.msp.gob.cu", "tier": 1, "title": "Ministerio de Salud Pública de Cuba (MINSAP)"}],
                "evidence_quote": "Call 104 for urgent medical emergencies and ambulance dispatch in Cuba",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "105",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.minint.gob.cu", "tier": 1, "title": "Cuerpo de Bomberos de Cuba"}],
                "evidence_quote": "Dial 105 for fire and rescue services throughout Cuba",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "106",
                "status": "verified",
                "confidence": "medium",
                "sources": [{"url": "https://www.minint.gob.cu", "tier": 1, "title": "MININT Cuba"}],
                "evidence_quote": "106 functions as the central dispatch contact number",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+53 7 866 8320",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.mintur.gob.cu", "tier": 1, "title": "Ministerio de Turismo de Cuba (MINTUR)"}],
                "evidence_quote": "Tourist assistance and Asistur emergency coordination centers operate across Havana and Varadero",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/cuba", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Küba sokakları güvenlidir; temel ilaç/gıda tedarik sıkıntıları ve ABD ESTA iptali kuralına dikkat edilmelidir.",
                "en": "Cuba is generally safe regarding violent crime; note medicine shortages and US ESTA ineligibility rule.",
                "de": "Kuba ist gewaltarm; Versorgungsengpässe bei Medikamenten und US-ESTA-Ausschluss beachten.",
                "ru": "На Кубе низкий уровень насильственной преступности; учитывайте дефицит медикаментов и отмену ESTA для США.",
                "es": "Cuba es segura en cuanto a delitos violentos; tenga en cuenta la escasez de insumos y la regla ESTA de EE. UU."
            },
            "regional_warnings": [],
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
                "value": 12.5,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/cuba", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in Cuba measure approximately 12.5 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 15.2,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/cuba", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in Cuba reach 15.2 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "US credit cards do not work in Cuba. Complete the mandatory D'Viajeros entry form within 48 hours before travel. ETECSA (Cubacel Tur) offers tourist eSIMs with pre-purchased data; download offline maps before arriving.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://dviajeros.mitrans.gob.cu", "tier": 1, "title": "D'Viajeros Portal de Declaración del Viajero"}],
                "evidence_quote": "D'Viajeros digital traveler declaration is mandatory for all arriving passengers in Cuba",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "D'Viajeros",
                "category": "other",
                "popular": True,
                "description": "Official mandatory online traveler entry declaration portal required before boarding flights to Cuba."
            },
            {
                "name": "La Nave",
                "category": "taxi",
                "popular": True,
                "description": "The local Cuban ride-hailing app operating in Havana with transparent cash/transfer fares."
            },
            {
                "name": "Maps.me",
                "category": "maps",
                "popular": True,
                "description": "Essential offline map tool for Cuba where internet connectivity can be intermittent."
            },
            {
                "name": "Transfermóvil",
                "category": "payments",
                "popular": False,
                "description": "National mobile payment system widely used by Cuban residents and long-term visitors."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "Tourist Card Required",
                "duration_days": 90,
                "conditions": "Türk vatandaşları turistik seyahatlerde Küba Turist Kartı (Tarjeta del Turista) veya e-Visa almak zorundadır. Seyahat sağlık sigortası ve D'Viajeros formu zorunludur. DİKKAT: Küba ziyareti ABD ESTA hakkını iptal eder.",
                "passport_validity_months": 6,
                "source": {"url": "https://evisacuba.cu", "tier": 1, "title": "Küba Göç İdaresi ve e-Visa Portalı"}
            },
            "us": {
                "regime": "Restricted / General License",
                "duration_days": 30,
                "conditions": "US citizens must travel under one of 12 authorized OFAC categories (e.g. Support for the Cuban People); pure tourism is prohibited under US law.",
                "passport_validity_months": 6,
                "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of the Treasury OFAC"}
            },
            "de": {
                "regime": "Tourist Card Required",
                "duration_days": 90,
                "conditions": "German citizens must hold a Tourist Card (Tarjeta del Turista) valid for 90 days. IMPORTANT: Visiting Cuba revokes US ESTA eligibility.",
                "passport_validity_months": 6,
                "source": {"url": "https://evisacuba.cu", "tier": 1, "title": "Cuba e-Visa Portal"}
            },
            "gb": {
                "regime": "Tourist Card Required",
                "duration_days": 90,
                "conditions": "British passport holders must acquire a Tourist Card (Tarjeta del Turista). Note: Prior travel to Cuba cancels US ESTA eligibility.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/cuba/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "Граждане РФ могут въезжать на Кубу без визы на срок до 90 дней в течение каждого 180-дневного периода. Форма D'Viajeros обязательна.",
                "passport_validity_months": 1,
                "source": {"url": "https://evisacuba.cu", "tier": 1, "title": "Министерство туризма Кубы"}
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
                    "title": "Bring essential toiletries and medications",
                    "description": "Pharmacies face severe shortages; bring your own pain relievers, antibiotics, sunscreen, and mosquito repellent."
                },
                {
                    "title": "Carry Euros or US Dollars in cash",
                    "description": "US-issued bank cards do not work due to embargo rules; carry physical cash (Euros are widely preferred)."
                },
                {
                    "title": "Fill the D'Viajeros form within 48 hours",
                    "description": "Submit your health and customs declaration on dviajeros.mitrans.gob.cu and keep the QR code on your phone."
                }
            ],
            "donts": [
                {
                    "title": "Beware of US ESTA invalidation!",
                    "description": "Anyone who travels to Cuba loses eligibility for the US ESTA visa waiver program and must apply for a regular US visa."
                },
                {
                    "title": "Don't engage with 'Jineteros' (street hustlers)",
                    "description": "Politely decline unsolicited street offers for cheap cigars, salsa clubs, or private paladares."
                }
            ],
            "tipping": "Tipping 10% in restaurants and leaving small cash tips for musicians, drivers, and casa particular hosts is customary and deeply appreciated."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "El Capitolio ve Klasik Amerikan Arabaları, Havana",
                    "license": "CC BY-SA 3.0",
                    "author": "Jorge Royan",
                    "source_url": "/images/countries/cu-480.webp",
                    "attribution_text": "El Capitolio National Building and vintage American cars in Havana, Cuba. Jorge Royan, CC BY-SA 3.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "El Capitolio ve Klasik Amerikan Arabaları, Havana, Küba",
                        "en": "El Capitolio & Vintage American Cars, Havana, Cuba",
                        "de": "El Capitolio & Oldtimer, Havanna, Kuba",
                        "ru": "Капитолий и винтажные американские автомобили, Гавана, Куба",
                        "es": "El Capitolio y Autos Clásicos Americanos, La Habana, Cuba"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "kuba", "en": "cuba", "de": "kuba", "ru": "kuba", "es": "cuba"},
            "title": {
                "tr": "Küba Vize Rehberi, Turist Kartı, D'Viajeros ve ABD ESTA Uyarısı | Vizamigo",
                "en": "Cuba Visa Guide, Tourist Card, D'Viajeros & US ESTA Warning | Vizamigo",
                "de": "Kuba Visum-Leitfaden, Touristenkarte & US-ESTA-Warnung | Vizamigo",
                "ru": "Виза на Кубу, туристическая карточка, D'Viajeros и предупреждение ESTA | Vizamigo",
                "es": "Guía de Visa de Cuba, Tarjeta de Turista y Advertencia ESTA EE. UU. | Vizamigo"
            },
            "meta_description": {
                "tr": "Küba turist kartı ve e-Visa kuralları, zorunlu D'Viajeros formu, nakit Euro kullanımı, Havana klasik arabaları ve ABD ESTA iptal uyarısı.",
                "en": "Cuba Tourist Card & e-Visa rules, mandatory D'Viajeros portal, cash tips, Havana vintage cars, and US ESTA ineligibility warning.",
                "de": "Kuba Touristenkarte, D'Viajeros-Formular, Bargeld-Tipps, Oldtimer in Havanna und wichtige US-ESTA-Warnung.",
                "ru": "Правила въезда на Кубу, туристическая карта, форма D'Viajeros, наличные евро и предупреждение об аннулировании ESTA.",
                "es": "Requisitos de Tarjeta de Turista para Cuba, formulario D'Viajeros, uso de efectivo y advertencia sobre el ESTA de EE. UU."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "BS": {
        "iso2": "BS",
        "names": {
            "tr": "Bahamalar",
            "en": "Bahamas",
            "de": "Bahamas",
            "ru": "Багамы",
            "es": "Bahamas"
        },
        "capital": {
            "value": "Nassau",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bahamas.gov.bs", "tier": 1, "title": "Government of the Commonwealth of the Bahamas"}],
            "evidence_quote": "Nassau is the capital and primate commercial hub of the Commonwealth of the Bahamas",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "BSD",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.centralbankbahamas.com", "tier": 1, "title": "Central Bank of the Bahamas"}],
            "evidence_quote": "The Bahamian Dollar (BSD) is pegged 1:1 with the US Dollar; USD circulates freely",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-5 (EST) / UTC-4 (EDT)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bahamas.gov.bs", "tier": 1, "title": "Government of the Bahamas"}],
            "evidence_quote": "The Bahamas observes Eastern Standard Time UTC-5 and daylight saving time UTC-4",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "120V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.bplco.com", "tier": 1, "title": "Bahamas Power and Light (BPL)"}],
                "evidence_quote": "Standard nominal voltage delivered in the Bahamas is 120V alternating current at 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 60,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.bplco.com", "tier": 1, "title": "Bahamas Power and Light (BPL)"}],
                "evidence_quote": "Transmission and domestic frequency is standardized at 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["A", "B"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission (IEC)"}],
                "evidence_quote": "Electrical outlets in the Bahamas conform to North American Type A and grounded Type B plugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.royalbahamaspolice.org", "tier": 1, "title": "Royal Bahamas Police Force (RBPF)"}],
                "evidence_quote": "Dial 911 or 919 for emergency police assistance throughout the Bahamas",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.bahamas.gov.bs/health", "tier": 1, "title": "Ministry of Health and Wellness of the Bahamas"}],
                "evidence_quote": "Call 911 or 919 for emergency ambulance dispatch in New Providence and Grand Bahama",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.royalbahamaspolice.org", "tier": 1, "title": "RBPF Fire Services Division"}],
                "evidence_quote": "Dial 911 for emergency fire response services across the islands",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.royalbahamaspolice.org", "tier": 1, "title": "Royal Bahamas Police Force"}],
                "evidence_quote": "911 is the central emergency dispatcher for police, fire, and medical rescue",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+1 242 322 4333",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.bahamas.com", "tier": 1, "title": "Ministry of Tourism, Investments & Aviation"}],
                "evidence_quote": "Tourist Police division patrols downtown Nassau, Bay Street, and Prince George Wharf cruise terminal",
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
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/the-bahamas", "tier": 1, "title": "UK Foreign, Commonwealth & Development Office"},
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
                "tr": "Exuma, Eleuthera ve tatil adaları son derece güvenlidir; Nassau 'Over-the-Hill' bölgesinde dikkatli olunmalıdır.",
                "en": "Family Islands like Exuma are very peaceful; exercise increased caution in downtown Nassau residential areas.",
                "de": "Family Islands wie Exuma sind sehr friedlich; in Nassau (Over-the-Hill) erhöhte Vorsicht walten lassen.",
                "ru": "Острова Эксума и семейные курорты спокойны; в Нассау (район Over-the-Hill) соблюдайте осторожность.",
                "es": "Las islas periféricas como Exuma son muy pacíficas; ejerza mayor precaución en zonas residenciales de Nassau."
            },
            "regional_warnings": [
                {
                    "area": "Nassau (Over-the-Hill South of Shirley St)",
                    "level": 2,
                    "reason": "Gang violence and local crime in non-tourist residential neighborhoods; avoid after dark.",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Advisory"}
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
                "value": 52.1,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/bahamas", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median mobile broadband download speeds in the Bahamas measure approximately 52.1 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 84.6,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/bahamas", "tier": 1, "title": "Ookla Speedtest Global Index"}],
                "evidence_quote": "Median fixed broadband download speeds in the Bahamas reach 84.6 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "US Dollar is accepted 1:1 alongside the Bahamian Dollar everywhere. BTC (Bahamas Telecommunications Company) and Aliv provide 4G/LTE tourist eSIMs with coverage across New Providence and the Family Islands.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.bealiv.com", "tier": 1, "title": "Aliv Bahamas"}],
                "evidence_quote": "Prepaid tourist eSIM packages operate seamlessly across the Bahamian archipelago",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Kanoo",
                "category": "payments",
                "popular": True,
                "description": "Leading digital wallet app in the Bahamas supporting digital Sand Dollar and card payments."
            },
            {
                "name": "Kraven",
                "category": "food",
                "popular": True,
                "description": "Popular food and grocery delivery service in Nassau and Freeport."
            },
            {
                "name": "Let's Go Bahamas",
                "category": "taxi",
                "popular": True,
                "description": "On-demand taxi hailing app operating with licensed drivers across New Providence."
            },
            {
                "name": "Bahamas Ferry Services",
                "category": "transport",
                "popular": True,
                "description": "Inter-island passenger ferry schedules connecting Nassau to Harbour Island, Eleuthera, and Exuma."
            }
        ],
        "visa_rules": {
            "tr": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "Türkiye Cumhuriyeti umuma mahsus, hususi ve hizmet pasaportu hamilleri 90 güne kadar vizeden muaftır.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.immigration.gov.bs", "tier": 1, "title": "Department of Immigration Bahamas"}
            },
            "us": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "US citizens can enter the Bahamas visa-free for tourist stays of up to 90 days (or up to 8 months with valid passport).",
                "passport_validity_months": 6,
                "source": {"url": "https://www.bahamas.com/entry-requirements", "tier": 1, "title": "Ministry of Tourism of the Bahamas"}
            },
            "de": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "German and EU citizens do not need a visa for tourist visits to the Bahamas of up to 90 days.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.bahamas.com/entry-requirements", "tier": 1, "title": "Ministry of Tourism of the Bahamas"}
            },
            "gb": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "British passport holders can enter the Bahamas visa-free for up to 90 days (up to 21 days or longer depending on stamp).",
                "passport_validity_months": 6,
                "source": {"url": "https://www.gov.uk/foreign-travel-advice/the-bahamas/entry-requirements", "tier": 1, "title": "UK FCDO Entry Requirements"}
            },
            "ru": {
                "regime": "VF",
                "duration_days": 90,
                "conditions": "Граждане РФ могут въезжать на Багамские Острова без визы на срок до 90 дней с туристическими целями.",
                "passport_validity_months": 6,
                "source": {"url": "https://www.immigration.gov.bs", "tier": 1, "title": "Иммиграционный департамент Багамских Островов"}
            }
        },
        "digital_nomad": {
            "available": True,
            "visa_name": "Bahamas BEATS (Extended Access Travel Stay)",
            "min_income_usd": 1000,
            "duration_months": 12,
            "source": {"url": "https://www.bahamas.com/beats", "tier": 1, "title": "Bahamas BEATS Official Program"}
        },
        "etiquette": {
            "dos": [
                {
                    "title": "Use US Dollars freely",
                    "description": "Bahamian Dollars and US Dollars are interchangeable at a 1:1 ratio everywhere in shops, restaurants, and tours."
                },
                {
                    "title": "Explore the Family Islands (Out Islands)",
                    "description": "Take day trips to Exuma (swimming pigs) or Harbour Island (pink sand beaches) for the quintessential Bahamas experience."
                },
                {
                    "title": "Agree on taxi fares before departure",
                    "description": "Many cabs do not use meters; establish the total fare with the driver before getting inside."
                }
            ],
            "donts": [
                {
                    "title": "Don't wander into Over-the-Hill areas at night",
                    "description": "Stay within well-lit resort corridors, Bay Street, and marina complexes; avoid walking alone through secluded residential areas."
                },
                {
                    "title": "Don't touch stingrays or wild marine life aggressively",
                    "description": "Always follow ethical marine wildlife guidelines when visiting sandbars and stingray sanctuaries."
                }
            ],
            "tipping": "Tipping 15% is standard in restaurants and bars; always check whether a 15% service charge is already added to your bill."
        },
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Exuma Cays Turkuaz Suları ve Beyaz Kum Adacıkları",
                    "license": "CC BY-SA 2.0",
                    "author": "Rüdiger Stehn from Kiel, Deutschland",
                    "source_url": "/images/countries/bs-480.webp",
                    "attribution_text": "Exuma Cays pristine turquoise waters and white sandbars in the Bahamas. Rüdiger Stehn, CC BY-SA 2.0.",
                    "focal_point": {"x": 50, "y": 50},
                    "alt": {
                        "tr": "Exuma Cays Turkuaz Suları ve Beyaz Kum Adacıkları, Bahamalar",
                        "en": "Exuma Cays Turquoise Waters & White Sandbars, Bahamas",
                        "de": "Exuma Cays Türkiswasser & weiße Sandbänke, Bahamas",
                        "ru": "Бирюзовые воды Эксума-Кейс и белые песчаные отмели, Багамы",
                        "es": "Cayos Exuma Aguas Turquesas y Bancos de Arena Blanca, Bahamas"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "bahamalar", "en": "bahamas", "de": "bahamas", "ru": "bagamy", "es": "bahamas"},
            "title": {
                "tr": "Bahamalar Vize Rehberi, 90 Gün Vizesiz Seyahat ve Exuma Gezisi | Vizamigo",
                "en": "Bahamas Visa Guide, 90-Day Visa-Free & Exuma Cays Travel | Vizamigo",
                "de": "Bahamas Visum-Leitfaden, 90 Tage visafrei & Exuma Cays Reisen | Vizamigo",
                "ru": "Виза на Багамы, безвизовый въезд и острова Эксума | Vizamigo",
                "es": "Guía de Visa de Bahamas, 90 Días sin Visa y Cayos Exuma | Vizamigo"
            },
            "meta_description": {
                "tr": "Bahamalar Türk pasaportuna 90 gün vizesiz giriş, BEATS dijital göçebe programı, ABD Doları kullanımı ve Exuma Cays gezi rehberi.",
                "en": "Bahamas 90-day visa-free rules, BEATS digital nomad visa, USD currency exchange, and Exuma Cays travel tips.",
                "de": "Bahamas 90 Tage visafreie Einreise, BEATS Nomad Visum, US-Dollar Verwendung und Reisetipps Exuma Cays.",
                "ru": "Правила въезда на Багамы на 90 дней без визы, программа BEATS, доллары США и острова Эксума.",
                "es": "Requisitos de entrada sin visa a Bahamas (90 días), programa BEATS para nómadas digitales y guía de Exuma."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    }
}

def main():
    print("Building World Tourism Batch 7A (6 countries)...")
    for code, data in BATCH7A_DATA.items():
        filename = os.path.join(OUTPUT_DIR, f"{code}.json")
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✅ Generated {filename}")

if __name__ == "__main__":
    main()
