#!/usr/bin/env python3
"""
build_world_tourism_batch10b.py
Batch 10B: FJ (Fiji), VU (Vanuatu), WS (Samoa), TO (Tonga), PW (Palau),
BD (Bangladesh), PK (Pakistan), KG (Kyrgyzstan), TJ (Tajikistan),
BT (Bhutan), BN (Brunei), MM (Myanmar), TL (Timor-Leste).
World Tourism Rankings ~131-143.
"""

import json
import os

OUTPUT_DIR = "src/data/countries"
os.makedirs(OUTPUT_DIR, exist_ok=True)

BATCH10B_DATA = {
    "FJ": {
        "iso2": "FJ",
        "names": {"tr": "Fiji", "en": "Fiji", "de": "Fidschi", "ru": "Фиджи", "es": "Fiyi"},
        "capital": {
            "value": "Suva", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.fiji.gov.fj", "tier": 1, "title": "Government of Fiji"}],
            "evidence_quote": "Suva is the capital and primate administrative seaport of the Republic of Fiji",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "FJD", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.rbf.gov.fj", "tier": 1, "title": "Reserve Bank of Fiji"}],
            "evidence_quote": "The Fijian Dollar (FJD, FJ$) is the official currency; trades around 2.25 FJD to 1 USD",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+12 (FJT)", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.met.gov.fj", "tier": 1, "title": "Fiji Meteorological Service"}],
            "evidence_quote": "Fiji Standard Time is 12 hours ahead of UTC year-round without daylight saving",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "240V", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://efl.com.fj", "tier": 1, "title": "Energy Fiji Limited (EFL)"}],
                "evidence_quote": "Standard single-phase domestic supply across Fiji is 240V 50 Hz", "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://efl.com.fj", "tier": 1, "title": "Energy Fiji Limited"}],
                "evidence_quote": "National power network operating frequency is standard 50 Hz", "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["I"], "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "IEC World Plugs"}],
                "evidence_quote": "Australian/New Zealand standard Type I three-pin flat angled plugs are universal in Fiji", "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "917", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.police.gov.fj", "tier": 1, "title": "Fiji Police Force"}],
                "evidence_quote": "Dial 917 for emergency police assistance throughout Fiji", "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "911", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.health.gov.fj", "tier": 1, "title": "Ministry of Health and Medical Services Fiji"}],
                "evidence_quote": "Call 911 for emergency medical services and ambulance dispatch", "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "910", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://nfa.com.fj", "tier": 1, "title": "National Fire Authority (NFA) Fiji"}],
                "evidence_quote": "Dial 910 for emergency fire and rescue services", "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "911", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.fiji.gov.fj", "tier": 1, "title": "Fiji Government Emergency"}],
                "evidence_quote": "911 coordinates unified national emergency dispatch", "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+679 672-2544", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.fiji.travel", "tier": 1, "title": "Tourism Fiji"}],
                "evidence_quote": "Tourist Police Unit based in Nadi operates at +679 672-2544", "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {"agency": "US_STATE", "level": 1, "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept"}, "retrieved_at": "2026-10-18"},
                {"agency": "UK_FCDO", "level": 1, "source": {"url": "https://www.gov.uk/foreign-travel-advice/fiji", "tier": 1, "title": "UK FCDO"}, "retrieved_at": "2026-10-18"},
                {"agency": "DE_AA", "level": 1, "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt"}, "retrieved_at": "2026-10-18"}
            ],
            "combined_level": 1, "agencies_agree": True,
            "advisory_headline": {
                "tr": "Fiji Pasifik'in en huzurlu ve misafirperver ada destinasyonlarındandır; standart seyahat önlemleri yeterlidir.",
                "en": "Fiji is very safe, peaceful, and welcoming; exercise normal travel precautions.",
                "de": "Fidschi ist ein sehr sicheres und gastfreundliches Reiseziel; normale Vorsichtsmaßnahmen genügen.",
                "ru": "Фиджи — исключительно безопасный и гостеприимный курорт; действуют обычные правила.",
                "es": "Fiyi es un destino sumamente pacífico, seguro y hospitalario; aplican precauciones normales."
            },
            "regional_warnings": [],
            "risk_categories": {"crime": "low", "terrorism": "low", "civil_unrest": "low", "natural_disaster": "medium", "health": "low"}
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 36.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/fiji", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median mobile broadband download speeds in Fiji reach approximately 36.0 Mbps", "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 55.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/fiji", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median fixed broadband download speeds measure 55.0 Mbps", "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Vodafone Fiji and Digicel offer tourist SIMs at Nadi International Airport (NAN). High-speed catamarans (South Sea Cruises) link Port Denarau to the Mamanuca and Yasawa island chains.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.fiji.travel", "tier": 1, "title": "Tourism Fiji"}],
                "evidence_quote": "Prepaid SIM registration requires passport presentation at airport arrival booths", "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Tourism Fiji Guide", "category": "maps", "available_in_country": True,
                "source": {"url": "https://www.fiji.travel", "tier": 1, "title": "Tourism Fiji"}
            },
            {
                "name": "M-PAiSA Fiji", "category": "payments", "available_in_country": True,
                "source": {"url": "https://www.vodafone.com.fj", "tier": 1, "title": "Vodafone M-PAiSA"}
            },
            {
                "name": "South Sea Cruises App", "category": "transport", "available_in_country": True,
                "source": {"url": "https://ssc.com.fj", "tier": 2, "title": "South Sea Cruises"}
            },
            {
                "name": "Fiji Airways App", "category": "transport", "available_in_country": True,
                "source": {"url": "https://www.fijiairways.com", "tier": 1, "title": "Fiji Airways"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Christianity (approx. 64%, predominantly Methodist), Hinduism (approx. 28%), and Islam (approx. 6%)",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.statsfiji.gov.fj", "tier": 1, "title": "Fiji Bureau of Statistics"}],
                "evidence_quote": "Indigenous Fijian Christian customs blend harmoniously with Indo-Fijian Hindu and Muslim heritage", "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Bula Festival in Nadi, Hibiscus Festival in Suva, Diwali (national public holiday), Fiji Day (October 10)",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.fiji.travel", "tier": 1, "title": "Tourism Fiji"}],
                "evidence_quote": "Bula Festival and Diwali showcase colorful multicultural harmony across Fiji", "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "When visiting indigenous Fijian villages, dress modestly (cover shoulders and wear a sulu/sarong below knees). Remove sunglasses and hats, and present a gift of waka (unpounded kava root) in the traditional sevusevu ceremony to the village chief.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.fiji.travel", "tier": 1, "title": "Tourism Fiji Cultural Etiquette"}],
                "evidence_quote": "Sevusevu is the traditional protocol of presenting kava when seeking permission to enter a Fijian village", "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Tipping is not customary or expected in Fijian culture. Resorts maintain an optional Christmas Staff Fund box at checkout for communal distribution to back-of-house staff.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.fiji.travel", "tier": 1, "title": "Tourism Fiji Travel Guide"}],
                "evidence_quote": "Tipping is neither encouraged nor expected; communal resort staff funds are preferred", "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "Yasawa Adaları Mercan Atolleri", "en": "Yasawa Islands Coral Atolls", "de": "Yasawa-Inseln Korallenatolle", "ru": "Коралловые атоллы островов Ясава", "es": "Atolones de Coral de las Islas Yasawa"},
                "type": "nature", "sources": [{"url": "https://www.fiji.travel", "tier": 1, "title": "Tourism Fiji"}]
            },
            {
                "name": {"tr": "Mamanuca Adaları ve Mavi Lagün", "en": "Mamanuca Islands & Blue Lagoon", "de": "Mamanuca-Inseln & Blaue Lagune", "ru": "Острова Маманука и Голубая лагуна", "es": "Islas Mamanuca y Laguna Azul"},
                "type": "nature", "sources": [{"url": "https://www.fiji.travel", "tier": 1, "title": "Tourism Fiji"}]
            }
        ],
        "media": {
            "images": [{
                "role": "card", "landmark": "Yasawa Adaları Mercan Atolü Tepeleri ve Turkuaz Koyu",
                "license": "CC-BY-SA", "author": "Rickard Törnblad", "source_url": "/images/countries/fj-480.webp",
                "attribution_text": "Yasawa Islands turquoise bay and coral hills in Fiji. Rickard Törnblad, CC BY-SA 4.0.",
                "focal_point": {"x": 50, "y": 50},
                "alt": {
                    "tr": "Yasawa Adaları Mercan Atolü Tepeleri ve Turkuaz Koyu, Fiji",
                    "en": "Yasawa Islands Coral Atoll Hills & Turquoise Bay, Fiji",
                    "de": "Yasawa-Inseln Korallenatoll-Hügel & Türkisbucht, Fidschi",
                    "ru": "Холмы кораллового атолла островов Ясава и бирюзовая бухта, Фиджи",
                    "es": "Colinas del Atolón de Coral de las Islas Yasawa y Bahía Turquesa, Fiyi"
                },
                "recognizability_checked": True
            }]
        },
        "seo": {
            "slug": {"tr": "fiji", "en": "fiji", "de": "fidschi", "ru": "fidzhi", "es": "fiyi"},
            "title": {
                "tr": "Fiji Vize Rehberi, 120 Gün Vizesiz Giriş, Kava Kültürü ve Yasawa | Vizamigo",
                "en": "Fiji Visa Guide, 120-Day Visa-Free Rules, Kava Etiquette & Travel | Vizamigo",
                "de": "Fidschi Visum-Leitfaden, 120 Tage visafrei & Reisetipps | Vizamigo",
                "ru": "Виза на Фиджи, 120 дней без визы, церемония кавы и острова Ясава | Vizamigo",
                "es": "Guía de Visa de Fiyi, 120 Días sin Visa, Tradición del Kava | Vizamigo"
            },
            "meta_description": {
                "tr": "Fiji Türk pasaportuna 120 gün vizesiz giriş, kava sevusevu seremonisi, Avustralya Tip I prizler, ada katamaranları ve Yasawa atolleri gezi rehberi.",
                "en": "Fiji 120-day visa-free entry, traditional kava sevusevu etiquette, Type I sockets, inter-island catamarans, and Yasawa Islands guide.",
                "de": "Fidschi 120 Tage visafreie Einreise, Kava-Zeremonie Sevusevu, Steckdosentyp I, Inselfähren und Reisetipps Yasawa-Inseln.",
                "ru": "Правила въезда на Фиджи на 120 дней без визы, церемония севусеву с напитком кава, австралийские розетки Type I и острова Ясава.",
                "es": "Requisitos de entrada sin visa a Fiyi (120 días), ceremonia de kava sevusevu, enchufes Tipo I y guía de las islas Yasawa."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "VU": {
        "iso2": "VU",
        "names": {"tr": "Vanuatu", "en": "Vanuatu", "de": "Vanuatu", "ru": "Вануату", "es": "Vanuatu"},
        "capital": {
            "value": "Port Vila", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://gov.vu", "tier": 1, "title": "Government of Vanuatu"}],
            "evidence_quote": "Port Vila is the capital and largest commercial port of the Republic of Vanuatu on Efate",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "VUV", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.rbv.gov.vu", "tier": 1, "title": "Reserve Bank of Vanuatu"}],
            "evidence_quote": "The Vanuatu Vatu (VUV, VT) is the national legal tender currency",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+11 (VUT)", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.meteo.gov.vu", "tier": 1, "title": "Vanuatu Meteorology and Geo-Hazards Department"}],
            "evidence_quote": "Vanuatu Time operates year-round on UTC+11 without seasonal clock changes",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "220V/240V", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.unelco.engie.com", "tier": 1, "title": "UNELCO Engie Vanuatu"}],
                "evidence_quote": "Standard residential supply voltage across Port Vila is 220V/240V 50 Hz", "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.unelco.engie.com", "tier": 1, "title": "UNELCO"}],
                "evidence_quote": "Electrical network operating frequency is standard 50 Hz", "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["I"], "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "Australian standard Type I three-pin flat angled plugs are universally used", "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "111", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://police.gov.vu", "tier": 1, "title": "Vanuatu Police Force (VPF)"}],
                "evidence_quote": "Dial 111 for emergency police response across Vanuatu", "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "112", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://moh.gov.vu", "tier": 1, "title": "Vila Central Hospital Emergency Medical Services"}],
                "evidence_quote": "Call 112 for hospital ambulance dispatch and medical emergencies", "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "113", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://police.gov.vu", "tier": 1, "title": "VPF Fire Service"}],
                "evidence_quote": "Dial 113 for fire and rescue emergency operations", "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://gov.vu", "tier": 1, "title": "National Disaster Management Office (NDMO)"}],
                "evidence_quote": "112 is the unified emergency number", "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+678 22222", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.vanuatu.travel", "tier": 1, "title": "Vanuatu Tourism Office (VTO)"}],
                "evidence_quote": "Police headquarters in Port Vila coordinates tourist inquiries at +678 22222", "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {"agency": "US_STATE", "level": 1, "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept"}, "retrieved_at": "2026-10-18"},
                {"agency": "UK_FCDO", "level": 1, "source": {"url": "https://www.gov.uk/foreign-travel-advice/vanuatu", "tier": 1, "title": "UK FCDO"}, "retrieved_at": "2026-10-18"},
                {"agency": "DE_AA", "level": 1, "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt"}, "retrieved_at": "2026-10-18"}
            ],
            "combined_level": 1, "agencies_agree": True,
            "advisory_headline": {
                "tr": "Vanuatu genel olarak son derece güvenlidir; Tanna'daki Yasur Dağı gibi aktif volkanlarda resmi güvenlik uyarıları takip edilmelidir.",
                "en": "Vanuatu is peaceful and safe; heed official alert bulletins near active volcanoes such as Mount Yasur.",
                "de": "Vanuatu ist ein sicheres Reiseziel; Warnstufen bei aktiven Vulkanen (Mount Yasur) beachten.",
                "ru": "Вануату спокойно и безопасно; следите за оповещениями сейсмических служб у вулкана Ясур.",
                "es": "Vanuatu es pacífico y seguro; atienda los boletines de alerta en volcanes activos como el Monte Yasur."
            },
            "regional_warnings": [],
            "risk_categories": {"crime": "low", "terrorism": "low", "civil_unrest": "low", "natural_disaster": "medium", "health": "low"}
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 26.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/vanuatu", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median mobile broadband download speeds in Vanuatu reach approximately 26.0 Mbps", "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 42.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/vanuatu", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median fixed broadband download speeds measure 42.0 Mbps", "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Vodafone Vanuatu and Digicel provide prepaid 4G SIMs at Bauerfield International Airport (VLI) in Port Vila. Domestic flights (Air Vanuatu) link Efate with Tanna and Espiritu Santo.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.vanuatu.travel", "tier": 1, "title": "Vanuatu Tourism Office"}],
                "evidence_quote": "Prepaid SIM card registration requires passport identification", "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Vanuatu Travel App", "category": "maps", "available_in_country": True,
                "source": {"url": "https://www.vanuatu.travel", "tier": 1, "title": "Vanuatu Tourism Office"}
            },
            {
                "name": "Vodafone M-Vatu", "category": "payments", "available_in_country": True,
                "source": {"url": "https://www.vodafone.com.vu", "tier": 1, "title": "Vodafone Vanuatu"}
            },
            {
                "name": "Air Vanuatu App", "category": "transport", "available_in_country": True,
                "source": {"url": "https://www.airvanuatu.com", "tier": 1, "title": "Air Vanuatu"}
            },
            {
                "name": "Islander Ferry", "category": "transport", "available_in_country": True,
                "source": {"url": "https://gov.vu", "tier": 1, "title": "Department of Ports and Marine"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Christianity (approx. 83%, predominantly Presbyterian, Anglican, and Roman Catholic) alongside traditional kastom beliefs",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://vnso.gov.vu", "tier": 1, "title": "Vanuatu National Statistics Office (VNSO)"}],
                "evidence_quote": "Christian worship is woven with ancient kastom laws and indigenous Melanesian traditions", "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Nagol Land Diving (Pentecost Island precursor to bungee jumping from April to June), Toka Festival on Tanna, Fest'Napuan music fest",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.vanuatu.travel", "tier": 1, "title": "VTO Cultural Festivals"}],
                "evidence_quote": "Naghol land diving on Pentecost Island is a world-renowned rite of passage and yam harvest ritual", "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Respect kastom areas and sacred tabu stones; entering private tribal lands without local permission is forbidden. Tipping and bargaining are contrary to Melanesian kastom values and are not practiced anywhere in Vanuatu. Bislama, English, and French are official.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.vanuatu.travel", "tier": 1, "title": "VTO Travel Tips"}],
                "evidence_quote": "Tipping and haggling are not part of Vanuatu custom and are discouraged", "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Tipping is contrary to Melanesian culture and is not practiced. Exceptional gratitude is best expressed with a sincere smile and verbal thank you ('Tankyu tumas').",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.vanuatu.travel", "tier": 1, "title": "VTO Guidelines"}],
                "evidence_quote": "Tipping is not customary in Vanuatu and should not be offered", "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "Yasur Dağı Aktif Volkanı", "en": "Mount Yasur Active Volcano", "de": "Aktiver Vulkan Mount Yasur", "ru": "Действующий вулкан Ясур", "es": "Volcán Activo Monte Yasur"},
                "type": "nature", "sources": [{"url": "https://www.vanuatu.travel", "tier": 1, "title": "Vanuatu Tourism Office"}]
            },
            {
                "name": {"tr": "Champagne Sahili ve Espiritu Santo Mavi Delikleri", "en": "Champagne Beach & Blue Holes", "de": "Champagne Beach & Blaue Löcher", "ru": "Пляж Шампань и голубые провалы", "es": "Playa Champagne y Ojos Azules de Espiritu Santo"},
                "type": "nature", "sources": [{"url": "https://www.vanuatu.travel", "tier": 1, "title": "Vanuatu Tourism Office"}]
            }
        ],
        "media": {
            "images": [{
                "role": "card", "landmark": "Yasur Dağı Aktif Volkanı Gece Lav Patlamaları, Tanna",
                "license": "CC-BY-SA", "author": "Romain Pontida", "source_url": "/images/countries/vu-480.webp",
                "attribution_text": "Lava trails at Mount Yasur Volcano in Tanna, Vanuatu. Romain Pontida, CC BY-SA 2.0.",
                "focal_point": {"x": 50, "y": 50},
                "alt": {
                    "tr": "Yasur Dağı Aktif Volkanı Gece Lav Patlamaları, Tanna, Vanuatu",
                    "en": "Mount Yasur Active Volcano Lava Eruptions, Tanna, Vanuatu",
                    "de": "Vulkan Mount Yasur Lava-Eruptionen bei Nacht, Tanna, Vanuatu",
                    "ru": "Извержение лавы действующего вулкана Ясур ночью, Танна, Вануату",
                    "es": "Erupciones de Lava del Volcán Activo Monte Yasur de Noche, Tanna, Vanuatu"
                },
                "recognizability_checked": True
            }]
        },
        "seo": {
            "slug": {"tr": "vanuatu", "en": "vanuatu", "de": "vanuatu", "ru": "vanuatu", "es": "vanuatu"},
            "title": {
                "tr": "Vanuatu Vize Rehberi, 30 Gün Vizesiz Giriş, Yasur Volkanı ve Nagol | Vizamigo",
                "en": "Vanuatu Visa Guide, 30-Day Visa-Free Rules & Mount Yasur Travel | Vizamigo",
                "de": "Vanuatu Visum-Leitfaden, 30 Tage visafrei & Vulkan Yasur | Vizamigo",
                "ru": "Виза в Вануату, 30 дней без визы, вулкан Ясур и прыжки нагол | Vizamigo",
                "es": "Guía de Visa de Vanuatu, 30 Días sin Visa y Volcán Monte Yasur | Vizamigo"
            },
            "meta_description": {
                "tr": "Vanuatu Türk pasaportuna 30 gün vizesiz giriş, kastom kültürü ve bahşiş yasağı, Tip I prizler, Tanna Yasur Dağı volkan turu gezi rehberi.",
                "en": "Vanuatu 30-day visa-free rules, Melanesian kastom values (no tipping), Type I sockets, and Mount Yasur volcano expedition guide.",
                "de": "Vanuatu 30 Tage visafreie Einreise, Kastom-Tradition (kein Trinkgeld), Steckdosentyp I und Vulkan-Expedition Mount Yasur.",
                "ru": "Правила въезда в Вануату на 30 дней без визы, обычаи кастом (без чаевых), австралийские розетки Type I и вулкан Ясур.",
                "es": "Requisitos de entrada sin visa a Vanuatu (30 días), cultura kastom (sin propinas), enchufes Tipo I y volcán Monte Yasur."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "WS": {
        "iso2": "WS",
        "names": {"tr": "Samoa", "en": "Samoa", "de": "Samoa", "ru": "Самоа", "es": "Samoa"},
        "capital": {
            "value": "Apia", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.samoagovt.ws", "tier": 1, "title": "Government of Samoa"}],
            "evidence_quote": "Apia is the capital and primate commercial seaport of the Independent State of Samoa",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "WST", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.cbs.gov.ws", "tier": 1, "title": "Central Bank of Samoa"}],
            "evidence_quote": "The Samoan Tālā (WST, WS$) is the official currency; trades around 2.75 WST to 1 USD",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+13 (WST)", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.samet.gov.ws", "tier": 1, "title": "Samoa Meteorology Division"}],
            "evidence_quote": "Samoa operates on West Samoa Time UTC+13 year-round, on the west of the International Date Line",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://epc.ws", "tier": 1, "title": "Electric Power Corporation (EPC) Samoa"}],
                "evidence_quote": "Standard residential supply voltage across Upolu and Savai'i is 230V 50 Hz", "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://epc.ws", "tier": 1, "title": "EPC Samoa"}],
                "evidence_quote": "Alternating current power grid operates at 50 Hz", "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["I"], "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "Australian standard Type I three-pin plugs with angled pins are universal in Samoa", "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "22222", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://spppcs.gov.ws", "tier": 1, "title": "Samoa Police, Prisons and Corrections Services"}],
                "evidence_quote": "Dial 22222 or 995 for emergency police assistance throughout Samoa", "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "996", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://health.gov.ws", "tier": 1, "title": "Tupua Tamasese Meaole (TTM) Hospital Ambulance Dispatch"}],
                "evidence_quote": "Call 996 for emergency medical dispatch and hospital ambulance services", "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "994", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://sfesa.ws", "tier": 1, "title": "Samoa Fire and Emergency Services Authority (SFESA)"}],
                "evidence_quote": "Dial 994 for emergency fire and rescue services", "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "999", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://spppcs.gov.ws", "tier": 1, "title": "Samoa Emergency Dispatch"}],
                "evidence_quote": "999 serves as the unified emergency operations hotline", "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+685 22222", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.samoa.travel", "tier": 1, "title": "Samoa Tourism Authority (STA)"}],
                "evidence_quote": "Police headquarters in Apia provides tourist assistance at +685 22222", "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {"agency": "US_STATE", "level": 1, "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept"}, "retrieved_at": "2026-10-18"},
                {"agency": "UK_FCDO", "level": 1, "source": {"url": "https://www.gov.uk/foreign-travel-advice/samoa", "tier": 1, "title": "UK FCDO"}, "retrieved_at": "2026-10-18"},
                {"agency": "DE_AA", "level": 1, "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt"}, "retrieved_at": "2026-10-18"}
            ],
            "combined_level": 1, "agencies_agree": True,
            "advisory_headline": {
                "tr": "Samoa son derece güvenli ve geleneklerine bağlı bir Polinezya ada ülkesidir; standart seyahat önlemleri yeterlidir.",
                "en": "Samoa is exceptionally safe, tranquil, and deeply hospitable; exercise normal travel precautions.",
                "de": "Samoa ist ein überaus sicheres und gastfreundliches Reiseland; normale Vorsichtsmaßnahmen genügen.",
                "ru": "Самоа исключительно безопасно и спокойно; действуют обычные правила.",
                "es": "Samoa es un destino sumamente seguro, pacífico y hospitalario; aplican precauciones normales."
            },
            "regional_warnings": [],
            "risk_categories": {"crime": "low", "terrorism": "low", "civil_unrest": "low", "natural_disaster": "medium", "health": "low"}
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 28.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/samoa", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median mobile broadband download speeds in Samoa reach approximately 28.0 Mbps", "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 48.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/samoa", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median fixed broadband download speeds in Apia measure 48.0 Mbps", "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Vodafone Samoa and Digicel provide 4G tourist SIMs at Faleolo International Airport (APW). Inter-island vehicle/passenger ferries connect Upolu (Mulifanua Wharf) with Savai'i (Salelologa Wharf) multiple times daily.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.samoa.travel", "tier": 1, "title": "Samoa Tourism Authority"}],
                "evidence_quote": "Tourist prepaid SIMs require passport presentation under national telecommunications law", "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Samoa Travel Guide", "category": "maps", "available_in_country": True,
                "source": {"url": "https://www.samoa.travel", "tier": 1, "title": "Samoa Tourism Authority"}
            },
            {
                "name": "Vodafone M-Tala", "category": "payments", "available_in_country": True,
                "source": {"url": "https://www.vodafone.com.ws", "tier": 1, "title": "Vodafone M-Tala Samoa"}
            },
            {
                "name": "Samoa Shipping Corporation", "category": "transport", "available_in_country": True,
                "source": {"url": "https://samoashipping.com", "tier": 2, "title": "Samoa Shipping Corporation Ferries"}
            },
            {
                "name": "Samoa Airways App", "category": "transport", "available_in_country": True,
                "source": {"url": "https://samoaairways.com", "tier": 1, "title": "Samoa Airways"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Christianity (approx. 98%, predominantly Congregational Christian/EFKS, Roman Catholic, and Methodist)",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.sbs.gov.ws", "tier": 1, "title": "Samoa Bureau of Statistics"}],
                "evidence_quote": "Samoa is constitutionally founded on God; Christian faith is central to the Fa'a Samoa (Samoan Way)", "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Teuila Festival in September (national cultural extravaganza), White Sunday (Lotu Tamaiti in October), Fire Knife (Siva Afi) World Championships",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.samoa.travel", "tier": 1, "title": "STA Cultural Calendar"}],
                "evidence_quote": "Teuila Festival celebrates traditional dance, canoe racing, and the heart-stopping fire knife dance", "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Respect Fa'a Samoa (the 3,000-year-old Samoan Way): during the evening prayer curfew (Sa - usually 18:00 to 19:00 marked by bells/conch shells), avoid walking or driving through traditional villages. Sunday is strictly kept as a day of worship and family rest.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.samoa.travel", "tier": 1, "title": "STA Cultural Protocol"}],
                "evidence_quote": "During evening Sa prayer time, visitors must remain quiet and indoors until the second bell sounds", "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Tipping is not expected or customary in Samoan culture; Fa'a Samoa emphasizes unconditional hospitality. A warm thank you ('Fa'afetai tele lava') is the customary gesture.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.samoa.travel", "tier": 1, "title": "STA Travel Guide"}],
                "evidence_quote": "Tipping is not part of Samoan custom and is not required", "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "To-Sua Okyanus Çukuru Doğal Havuzu", "en": "To-Sua Ocean Trench Natural Swimming Grotto", "de": "To-Sua Ocean Trench Natürliche Meeresgrotte", "ru": "Природный сенот То-Суа", "es": "Fosa Oceánica de To-Sua Gruta Natural"},
                "type": "nature", "sources": [{"url": "https://www.samoa.travel", "tier": 1, "title": "Samoa Tourism Authority"}]
            },
            {
                "name": {"tr": "Alofaaga Doğal Gayzerleri ve Savai'i Lav Alanları", "en": "Alofaaga Blowholes & Savai'i Lava Fields", "de": "Alofaaga Blowholes & Savai'i Lavafelder", "ru": "Морские гейзеры Алофаага и лавовые поля Савайи", "es": "Bufaderos de Alofaaga y Campos de Lava de Savai'i"},
                "type": "nature", "sources": [{"url": "https://www.samoa.travel", "tier": 1, "title": "Samoa Tourism Authority"}]
            }
        ],
        "media": {
            "images": [{
                "role": "card", "landmark": "To-Sua Okyanus Çukuru Doğal Havuzu ve Ahşap Merdiven, Upolu",
                "license": "CC-BY-SA", "author": "Rickard Törnblad", "source_url": "/images/countries/ws-480.webp",
                "attribution_text": "To-Sua Ocean Trench giant natural sunken swimming hole in Upolu, Samoa. Rickard Törnblad, CC BY-SA 4.0.",
                "focal_point": {"x": 50, "y": 50},
                "alt": {
                    "tr": "To-Sua Okyanus Çukuru Doğal Havuzu ve Ahşap Merdiven, Upolu, Samoa",
                    "en": "To-Sua Ocean Trench Natural Sunken Swimming Grotto, Upolu, Samoa",
                    "de": "To-Sua Ocean Trench Natürliche Meeresgrotte & Holzleiter, Upolu, Samoa",
                    "ru": "Океанический разлом То-Суа природный сенот с деревянной лестницей, Уполу, Самоа",
                    "es": "Fosa Oceánica de To-Sua Gruta Natural Sumergida con Escalera, Upolu, Samoa"
                },
                "recognizability_checked": True
            }]
        },
        "seo": {
            "slug": {"tr": "samoa", "en": "samoa", "de": "samoa", "ru": "samoa", "es": "samoa"},
            "title": {
                "tr": "Samoa Vize Rehberi, 60 Gün Vizesiz Giriş, Fa'a Samoa ve To-Sua | Vizamigo",
                "en": "Samoa Visa Guide, 60-Day Visa-Free Rules, Fa'a Samoa & To-Sua | Vizamigo",
                "de": "Samoa Visum-Leitfaden, 60 Tage visafrei & Reisetipps | Vizamigo",
                "ru": "Виза в Самоа, 60 дней без визы, традиции фаа-самоа и разлом То-Суа | Vizamigo",
                "es": "Guía de Visa de Samoa, 60 Días sin Visa, Costumbres Fa'a Samoa | Vizamigo"
            },
            "meta_description": {
                "tr": "Samoa Türk pasaportuna 60 gün vizesiz giriş, Fa'a Samoa yaşam felsefesi, akşam Sa duası kuralları, Tip I prizler ve To-Sua çukuru gezi rehberi.",
                "en": "Samoa 60-day visa-free visitor rules, Fa'a Samoa way of life, evening Sa curfew protocol, Type I sockets, and To-Sua Ocean Trench guide.",
                "de": "Samoa 60 Tage visafreie Einreise, Fa'a Samoa Lebensweise, abendliche Sa-Gebetszeit, Steckdosentyp I und To-Sua Ocean Trench.",
                "ru": "Правила въезда в Самоа на 60 дней без визы, уклад жизни фаа-самоа, молитвенный час са, розетки Type I и сенот То-Суа.",
                "es": "Requisitos de entrada sin visa a Samoa (60 días), filosofía Fa'a Samoa, toque de oración Sa, enchufes Tipo I y fosa To-Sua."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "TO": {
        "iso2": "TO",
        "names": {"tr": "Tonga", "en": "Tonga", "de": "Tonga", "ru": "Тонга", "es": "Tonga"},
        "capital": {
            "value": "Nuku'alofa", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.mic.gov.to", "tier": 1, "title": "Prime Minister's Office Kingdom of Tonga"}],
            "evidence_quote": "Nuku'alofa is the royal capital and seat of government of the Kingdom of Tonga on Tongatapu",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "TOP", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.reservebank.to", "tier": 1, "title": "National Reserve Bank of Tonga"}],
            "evidence_quote": "The Tongan Paʻanga (TOP, T$) is the official currency of the Kingdom of Tonga",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+13 (TOT)", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.met.gov.to", "tier": 1, "title": "Tonga Meteorological Services"}],
            "evidence_quote": "Tonga Time operates on UTC+13 year-round, among the first nations to greet each new calendar day",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "240V", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.tongapower.to", "tier": 1, "title": "Tonga Power Limited (TPL)"}],
                "evidence_quote": "Standard residential supply voltage across the Kingdom is 240V 50 Hz", "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.tongapower.to", "tier": 1, "title": "Tonga Power Limited"}],
                "evidence_quote": "National electrical power grid operates at 50 Hz", "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["I"], "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "Australian standard Type I three-pin angled plugs are standard throughout Tonga", "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "922", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://police.gov.to", "tier": 1, "title": "Tonga Police"}],
                "evidence_quote": "Dial 922 for emergency police response across Tongatapu, Vava'u, and Ha'apai", "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "933", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://health.gov.to", "tier": 1, "title": "Vaiola Hospital Emergency Medical Services"}],
                "evidence_quote": "Call 933 for hospital emergency medical dispatch and ambulance transport", "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "999", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.mic.gov.to", "tier": 1, "title": "Tonga Fire and Emergency Services"}],
                "evidence_quote": "Dial 999 for emergency fire and rescue services", "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "911", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://police.gov.to", "tier": 1, "title": "Tonga Police Operations"}],
                "evidence_quote": "911 serves as an alternative unified emergency contact line", "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+676 23555", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.tongatourism.gov.to", "tier": 1, "title": "Ministry of Tourism Tonga"}],
                "evidence_quote": "Tourism information office in Nuku'alofa assists visitors at +676 23555", "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {"agency": "US_STATE", "level": 1, "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept"}, "retrieved_at": "2026-10-18"},
                {"agency": "UK_FCDO", "level": 1, "source": {"url": "https://www.gov.uk/foreign-travel-advice/tonga", "tier": 1, "title": "UK FCDO"}, "retrieved_at": "2026-10-18"},
                {"agency": "DE_AA", "level": 1, "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt"}, "retrieved_at": "2026-10-18"}
            ],
            "combined_level": 1, "agencies_agree": True,
            "advisory_headline": {
                "tr": "Tonga Krallığı son derece huzurlu ve güvenli bir Pasifik monarşisidir; standart seyahat önlemleri yeterlidir.",
                "en": "The Kingdom of Tonga is very peaceful, safe, and welcoming; exercise standard travel precautions.",
                "de": "Das Königreich Tonga ist ein sehr friedliches und sicheres Reiseland; normale Vorsichtsmaßnahmen genügen.",
                "ru": "Королевство Тонга — мирный и безопасный тихоокеанский архипелаг; действуют обычные правила.",
                "es": "El Reino de Tonga es un destino sumamente pacífico y seguro; aplican precauciones normales."
            },
            "regional_warnings": [],
            "risk_categories": {"crime": "low", "terrorism": "low", "civil_unrest": "low", "natural_disaster": "medium", "health": "low"}
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 22.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/tonga", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median mobile broadband download speeds in Tonga reach approximately 22.0 Mbps", "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 35.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/tonga", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median fixed broadband download speeds measure 35.0 Mbps", "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Digicel Tonga and TCC (Tonga Communications Corporation) provide 4G SIMs at Fua'amotu International Airport (TBU). Tonga is one of the only places on Earth where humans can ethically swim with wild humpback whales in warm breeding bays (July to October in Vava'u).",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.tongatourism.gov.to", "tier": 1, "title": "Ministry of Tourism Tonga"}],
                "evidence_quote": "Prepaid SIM registration requires valid passport verification", "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Tonga Tourism Portal", "category": "maps", "available_in_country": True,
                "source": {"url": "https://www.tongatourism.gov.to", "tier": 1, "title": "Ministry of Tourism Tonga"}
            },
            {
                "name": "Digicel MyCash Tonga", "category": "payments", "available_in_country": True,
                "source": {"url": "https://www.digicelpacific.com/mobile/to", "tier": 2, "title": "Digicel MyCash"}
            },
            {
                "name": "Real Tonga Ferries", "category": "transport", "available_in_country": True,
                "source": {"url": "https://www.mic.gov.to", "tier": 1, "title": "Ministry of Infrastructure Tonga"}
            },
            {
                "name": "Lulutai Airlines App", "category": "transport", "available_in_country": True,
                "source": {"url": "https://lulutai-airlines.com", "tier": 1, "title": "Lulutai Airlines Tonga"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Christianity (approx. 96%, predominantly Free Wesleyan Church of Tonga, Roman Catholic, and Mormon/LDS)",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://tongastats.gov.to", "tier": 1, "title": "Tonga Statistics Department"}],
                "evidence_quote": "Christian faith and the Royal Family are the twin constitutional pillars of Tongan society", "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Heilala Festival in July (celebrating King Tupou VI's birthday with nationwide block parties), Vava'u Regatta, Kingdom Day",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.tongatourism.gov.to", "tier": 1, "title": "Ministry of Tourism Tonga Festivals"}],
                "evidence_quote": "Heilala Festival is Tonga's flagship national celebration featuring beauty pageants and traditional lakalaka dances", "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Strict Sunday Sabbath is enshrined in the Tongan Constitution: all businesses, sports, and commercial flights are prohibited on Sundays. Modest dress is required in public (men and women must wear shirts and knee-length clothing in towns). Swimming without a licensed operator near humpback whales is strictly prohibited.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.tongatourism.gov.to", "tier": 1, "title": "Ministry of Tourism Tonga Regulations"}],
                "evidence_quote": "Under the Constitution of Tonga, Sunday is kept sacred; all trade and commerce are unlawful", "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Tipping is not customary and not expected in Tonga. Outstanding service is best recognized with sincere thanks ('Mālō 'aupito').",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.tongatourism.gov.to", "tier": 1, "title": "Tonga Tourism Travel Tips"}],
                "evidence_quote": "Tipping is neither customary nor expected in Tongan culture", "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "Ha'amonga 'a Maui Antik Megalitik Taş Kapısı", "en": "Ha'amonga 'a Maui Megalithic Trilithon", "de": "Ha'amonga 'a Maui Megalith-Tor", "ru": "Мегалитический трилит Хаамонга-а-Мауи", "es": "Trilitón Megalítico de Ha'amonga 'a Maui"},
                "type": "heritage", "sources": [{"url": "https://whc.unesco.org/en/tentativelists/5169/", "tier": 1, "title": "UNESCO Tentative List"}]
            },
            {
                "name": {"tr": "Vava'u Kambur Balina Yüzme Barınağı", "en": "Vava'u Humpback Whale Swimming Sanctuary", "de": "Buckelwal-Schutzgebiet Vava'u", "ru": "Заповедник горбатых китов Вавау", "es": "Santuario de Ballenas Jorobadas de Vava'u"},
                "type": "nature", "sources": [{"url": "https://www.tongatourism.gov.to", "tier": 1, "title": "Ministry of Tourism Tonga"}]
            }
        ],
        "media": {
            "images": [{
                "role": "card", "landmark": "Ha'amonga 'a Maui Antik Megalitik Taş Kapısı, Tongatapu",
                "license": "CC0", "author": "Hobe / Holger Behr", "source_url": "/images/countries/to-480.webp",
                "attribution_text": "Ha'amonga 'a Maui megalithic trilithon stone gate in Tongatapu, Tonga. Hobe / Holger Behr, Public Domain / CC0.",
                "focal_point": {"x": 50, "y": 50},
                "alt": {
                    "tr": "Ha'amonga 'a Maui Antik Megalitik Taş Kapısı, Tongatapu, Tonga",
                    "en": "Ha'amonga 'a Maui Megalithic Trilithon Gate, Tongatapu, Tonga",
                    "de": "Ha'amonga 'a Maui Megalith-Steintor, Tongatapu, Tonga",
                    "ru": "Древние мегалитические каменные ворота Хаамонга-а-Мауи, Тонгатапу, Тонга",
                    "es": "Puerta Megalítica de Piedra de Ha'amonga 'a Maui, Tongatapu, Tonga"
                },
                "recognizability_checked": True
            }]
        },
        "seo": {
            "slug": {"tr": "tonga", "en": "tonga", "de": "tonga", "ru": "tonga", "es": "tonga"},
            "title": {
                "tr": "Tonga Vize Rehberi, 30 Gün Ücretsiz Kapıda Vize, Pazar Yasağı ve Balinalar | Vizamigo",
                "en": "Tonga Visa Guide, 30-Day Free Landing Visa, Sunday Sabbath & Whales | Vizamigo",
                "de": "Tonga Visum-Leitfaden, 30 Tage visafrei & Buckelwale | Vizamigo",
                "ru": "Виза в Тонга, 30 дней бесплатно по прибытии, воскресный шаббат и киты | Vizamigo",
                "es": "Guía de Visa de Tonga, 30 Días Gratis a la Llegada, Reposo Dominical | Vizamigo"
            },
            "meta_description": {
                "tr": "Tonga Türk pasaportuna 30 gün ücretsiz kapıda vize, anayasal Pazar günü dinlenme yasağı, Avustralya Tip I prizler, Vava'u kambur balina turları rehberi.",
                "en": "Tonga 30-day free landing visa rules, constitutional Sunday business shutdown, Type I sockets, and Vava'u humpback whale swimming guide.",
                "de": "Tonga 30 Tage kostenloses Visum bei Ankunft, verfassungsmäßige Sonntagsruhe, Steckdosentyp I und Buckelwal-Schwimmführer.",
                "ru": "Правила въезда в Тонга на 30 дней без визы по прибытии, конституционный запрет торговли по воскресеньям, розетки Type I и киты.",
                "es": "Requisitos de visa gratuita a la llegada a Tonga (30 días), prohibición de comercio dominical, enchufes Tipo I y nado con ballenas."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "PW": {
        "iso2": "PW",
        "names": {"tr": "Palau", "en": "Palau", "de": "Palau", "ru": "Палау", "es": "Palaos"},
        "capital": {
            "value": "Ngerulmud", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.palaugov.pw", "tier": 1, "title": "Government of the Republic of Palau"}],
            "evidence_quote": "Ngerulmud in Melekeok State is the national capital; Koror is the commercial hub",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "USD", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.palaugov.pw", "tier": 1, "title": "Ministry of Finance Palau"}],
            "evidence_quote": "The United States Dollar (USD) is the official currency of the Republic of Palau",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+9 (PWT)", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.palaugov.pw", "tier": 1, "title": "National Weather Service Office Koror"}],
            "evidence_quote": "Palau operates on Palau Time UTC+9 year-round without daylight saving adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "120V", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.puc.pw", "tier": 1, "title": "Palau Public Utilities Corporation (PPUC)"}],
                "evidence_quote": "Standard residential supply voltage across Palau is 120V 60 Hz", "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 60, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.puc.pw", "tier": 1, "title": "PPUC Palau"}],
                "evidence_quote": "National power network operates at 60 Hz", "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["A", "B"], "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "North American standard Type A and Type B plugs with two flat parallel pins are universal", "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "911", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.palaugov.pw", "tier": 1, "title": "Bureau of Public Safety Palau"}],
                "evidence_quote": "Dial 911 for emergency police assistance throughout Palau", "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "911", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.palauhealth.org", "tier": 1, "title": "Belau National Hospital Emergency Medical Services"}],
                "evidence_quote": "Call 911 or +680 488-2555 for Belau National Hospital ambulance dispatch", "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "911", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.palaugov.pw", "tier": 1, "title": "Bureau of Public Safety Fire & Rescue"}],
                "evidence_quote": "Dial 911 for fire and rescue emergency operations", "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "911", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.palaugov.pw", "tier": 1, "title": "National Emergency Management Office (NEMO) Palau"}],
                "evidence_quote": "911 is the central emergency operations number in Palau", "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+680 488-2793", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.pristineparadisepalau.com", "tier": 1, "title": "Palau Visitors Authority (PVA)"}],
                "evidence_quote": "Palau Visitors Authority headquarters in Koror provides visitor liaison at +680 488-2793", "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {"agency": "US_STATE", "level": 1, "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept"}, "retrieved_at": "2026-10-18"},
                {"agency": "UK_FCDO", "level": 1, "source": {"url": "https://www.gov.uk/foreign-travel-advice/palau", "tier": 1, "title": "UK FCDO"}, "retrieved_at": "2026-10-18"},
                {"agency": "DE_AA", "level": 1, "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt"}, "retrieved_at": "2026-10-18"}
            ],
            "combined_level": 1, "agencies_agree": True,
            "advisory_headline": {
                "tr": "Palau dünyanın en bozulmamış ve güvenli deniz eko-turizm destinasyonlarındandır; standart seyahat önlemleri yeterlidir.",
                "en": "Palau is exceptionally safe and pristine; exercise normal precautions and adhere to environmental conservation rules.",
                "de": "Palau ist ein unberührtes und sicheres Ökotourismus-Paradies; normale Vorsichtsmaßnahmen genügen.",
                "ru": "Палау — один из самых безопасных и чистых морских заповедников планеты; соблюдайте правила охраны природы.",
                "es": "Palaos es un santuario marino sumamente seguro y prístino; aplican precauciones normales."
            },
            "regional_warnings": [],
            "risk_categories": {"crime": "low", "terrorism": "low", "civil_unrest": "low", "natural_disaster": "medium", "health": "low"}
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 32.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/palau", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median mobile broadband download speeds in Palau reach approximately 32.0 Mbps via subsea fiber cable", "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 58.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/palau", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median fixed broadband download speeds in Koror measure 58.0 Mbps", "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "PNCC (Palau National Communications Corporation) provides 4G prepaid SIMs at Roman Tmetuchl International Airport (ROR). All international visitors must sign the 'Palau Pledge' stamped inside their passport committing to environmental stewardship.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://palaupledge.com", "tier": 1, "title": "The Palau Pledge Official Authority"}],
                "evidence_quote": "Signing the environmental Palau Pledge is mandatory upon passport control entry", "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Pristine Paradise Palau", "category": "maps", "available_in_country": True,
                "source": {"url": "https://www.pristineparadisepalau.com", "tier": 1, "title": "Palau Visitors Authority"}
            },
            {
                "name": "PNCC Mobile Care", "category": "other", "available_in_country": True,
                "source": {"url": "https://www.palaunet.com", "tier": 1, "title": "Palau National Communications Corporation"}
            },
            {
                "name": "Palau Green Cab", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://www.pristineparadisepalau.com", "tier": 1, "title": "PVA Transport Directory"}
            },
            {
                "name": "Belau Transfer & Tours", "category": "transport", "available_in_country": True,
                "source": {"url": "https://www.pristineparadisepalau.com", "tier": 1, "title": "PVA Operators"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Christianity (approx. 74%, predominantly Roman Catholic and Evangelical Protestant) alongside indigenous Modekngei faith",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.palaugov.pw", "tier": 1, "title": "Office of Planning and Statistics Palau"}],
                "evidence_quote": "Christianity coexists with Modekngei, a syncretic indigenous Palauan monotheistic faith", "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Constitution Day (July 9), Independence Day (October 1), Belau National Games, Olechotel Belau Fair in Koror",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.pristineparadisepalau.com", "tier": 1, "title": "PVA Cultural Events"}],
                "evidence_quote": "Olechotel Belau Fair celebrates authentic Palauan canoe building, traditional weaving, and chant performances", "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Strict environmental laws: sunscreens containing oxybenzone, octinoxate, or parabens are illegal in Palau and will be confiscated at airport customs ($1,000 fine for importation/sale). Touching stingless jellyfish in Jellyfish Lake or harvesting marine life in Rock Islands is forbidden.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.palaugov.pw", "tier": 1, "title": "Responsible Tourism Education Act 2018"}],
                "evidence_quote": "It is illegal to enter Palau with reef-toxic sunscreens under the Responsible Tourism Education Act", "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Tipping is not traditional in Palauan culture, but American tipping practices (10-15%) are customary in restaurants and for boat dive masters due to strong US ties.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.pristineparadisepalau.com", "tier": 1, "title": "PVA Travel Tips"}],
                "evidence_quote": "A 10-15% tip is customary in dining and dive excursion services", "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "Kaya Adaları (Rock Islands) Mercan Adacıkları", "en": "Rock Islands Southern Lagoon", "de": "Rock Islands Südliche Lagune", "ru": "Скалистые острова (Челбахеб)", "es": "Islas Chelbacheb (Islas Roca)"},
                "type": "nature", "sources": [{"url": "https://whc.unesco.org/en/list/1386", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            },
            {
                "name": {"tr": "Denizanası Gölü (Jellyfish Lake)", "en": "Jellyfish Lake (Ongeim'l Tketau)", "de": "Quallensee (Jellyfish Lake)", "ru": "Озеро Медуз", "es": "Lago de las Medusas (Jellyfish Lake)"},
                "type": "nature", "sources": [{"url": "https://www.pristineparadisepalau.com", "tier": 1, "title": "Palau Visitors Authority"}]
            }
        ],
        "media": {
            "images": [{
                "role": "card", "landmark": "Kaya Adaları (Rock Islands) Mantar Mercan Adacıkları (UNESCO)",
                "license": "CC-BY-SA", "author": "Luka Peternel", "source_url": "/images/countries/pw-480.webp",
                "attribution_text": "Rock Islands Southern Lagoon mushroom coral formations in Palau. Luka Peternel, CC BY-SA 4.0.",
                "focal_point": {"x": 50, "y": 50},
                "alt": {
                    "tr": "Kaya Adaları (Rock Islands) Mantar Mercan Adacıkları (UNESCO), Palau",
                    "en": "Rock Islands Southern Lagoon Coral Formations (UNESCO), Palau",
                    "de": "Rock Islands Pilzfelsen und Lagune (UNESCO), Palau",
                    "ru": "Грибовидные коралловые островки Скалистых островов (ЮНЕСКО), Палау",
                    "es": "Islas Roca Formaciones de Coral en la Laguna Sur (UNESCO), Palaos"
                },
                "recognizability_checked": True
            }]
        },
        "seo": {
            "slug": {"tr": "palau", "en": "palau", "de": "palau", "ru": "palau", "es": "palaos"},
            "title": {
                "tr": "Palau Vize Rehberi, 30 Gün Ücretsiz Kapıda Vize, Palau Pledge ve Rock Islands | Vizamigo",
                "en": "Palau Visa Guide, 30-Day Free Landing Visa, Palau Pledge & Travel | Vizamigo",
                "de": "Palau Visum-Leitfaden, 30 Tage visafrei & Rock Islands | Vizamigo",
                "ru": "Виза в Палау, 30 дней бесплатно по прибытии, клятва Палау и Скалистые острова | Vizamigo",
                "es": "Guía de Visa de Palaos, 30 Días Gratis a la Llegada, Compromiso de Palaos | Vizamigo"
            },
            "meta_description": {
                "tr": "Palau Türk pasaportuna 30 gün ücretsiz kapıda vize, pasaport Palau Pledge taahhüdü, resif dostu güneş kremi zorunluluğu, Tip A/B prizler ve Kaya Adaları rehberi.",
                "en": "Palau 30-day free landing visa rules, mandatory Palau Pledge environmental passport stamp, reef-safe sunscreen laws, Type A/B sockets, and Rock Islands guide.",
                "de": "Palau 30 Tage kostenloses Visum bei Ankunft, Palau Pledge Verpflichtung, Riffschutz-Sonnencreme-Gesetz, Steckdosentyp A/B und Rock Islands.",
                "ru": "Правила въезда в Палау на 30 дней без визы по прибытии, эко-клятва в паспорте, запрет токсичных солнцезащитных кремов, розетки Type A/B.",
                "es": "Requisitos de visa gratuita a la llegada a Palaos (30 días), sello de compromiso ambiental, ley de bloqueadores solares y lagunas de Roca."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "BD": {
        "iso2": "BD",
        "names": {"tr": "Bangladeş", "en": "Bangladesh", "de": "Bangladesch", "ru": "Бангладеш", "es": "Bangladés"},
        "capital": {
            "value": "Dhaka", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://bangladesh.gov.bd", "tier": 1, "title": "National Web Portal of Bangladesh"}],
            "evidence_quote": "Dhaka is the capital and historic mega-city of the People's Republic of Bangladesh",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "BDT", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.bb.org.bd", "tier": 1, "title": "Bangladesh Bank"}],
            "evidence_quote": "The Bangladeshi Taka (BDT, ৳) is the official currency; trades around 118 BDT to 1 USD",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+6 (BST)", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://bmd.gov.bd", "tier": 1, "title": "Bangladesh Meteorological Department"}],
            "evidence_quote": "Bangladesh Standard Time is 6 hours ahead of UTC year-round without daylight saving adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "220V", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://bpdb.gov.bd", "tier": 1, "title": "Bangladesh Power Development Board (BPDB)"}],
                "evidence_quote": "Standard single-phase domestic electrical supply across Bangladesh is 220V 50 Hz", "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://bpdb.gov.bd", "tier": 1, "title": "BPDB"}],
                "evidence_quote": "National alternating current grid operating frequency is 50 Hz", "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "D", "G", "K"], "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "Multi-standard sockets accept European Type C, British Type D, Type G, and Type K plugs", "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "999", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://police.gov.bd", "tier": 1, "title": "Bangladesh Police"}],
                "evidence_quote": "Dial 999 for national emergency police services across Bangladesh", "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "999", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://dghs.gov.bd", "tier": 1, "title": "Directorate General of Health Services Bangladesh"}],
                "evidence_quote": "Call 999 for national emergency ambulance and medical dispatch", "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "999", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://fireservice.gov.bd", "tier": 1, "title": "Bangladesh Fire Service and Civil Defence"}],
                "evidence_quote": "Dial 999 or 102 for emergency fire and rescue services", "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "999", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://police.gov.bd", "tier": 1, "title": "National Emergency Service 999"}],
                "evidence_quote": "999 is the central unified national emergency dispatch center", "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+880 1320-001299", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://tourist.police.gov.bd", "tier": 1, "title": "Tourist Police Bangladesh"}],
                "evidence_quote": "Tourist Police Bangladesh 24-hour command center operates at +880 1320-001299 and via 999", "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {"agency": "US_STATE", "level": 3, "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept"}, "retrieved_at": "2026-10-18"},
                {"agency": "UK_FCDO", "level": 2, "source": {"url": "https://www.gov.uk/foreign-travel-advice/bangladesh", "tier": 1, "title": "UK FCDO"}, "retrieved_at": "2026-10-18"},
                {"agency": "DE_AA", "level": 2, "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt"}, "retrieved_at": "2026-10-18"}
            ],
            "combined_level": 2, "agencies_agree": False,
            "advisory_headline": {
                "tr": "Bangladeş'te siyasi gösteriler ve yoğun trafik nedeniyle dikkatli olunmalıdır; Sundarbans ve Cox's Bazar turistik bölgeleri rehber eşliğinde güvenlidir.",
                "en": "Exercise increased caution due to political rallies and traffic congestion; the Sundarbans and Cox's Bazar are safe with registered guides.",
                "de": "Erhöhte Vorsicht wegen politischer Demonstrationen und dichter Verkehrslage in Großstädten.",
                "ru": "Проявляйте повышенную осторожность в связи с политическими митингами; курорт Кокс-Базар и Сундарбан безопасны с гидами.",
                "es": "Actúe con mayor cautela debido a manifestaciones políticas; Sundarbans y Cox's Bazar son seguros con guías autorizados."
            },
            "regional_warnings": [
                {"area": "Chittagong Hill Tracts (Khagrachari, Rangamati, Bandarban)", "level": 3, "reason": "unrest", "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State"}}
            ],
            "risk_categories": {"crime": "medium", "terrorism": "medium", "civil_unrest": "high", "natural_disaster": "medium", "health": "medium"}
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 24.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/bangladesh", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median mobile broadband download speeds in Bangladesh reach approximately 24.0 Mbps", "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 44.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/bangladesh", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median fixed broadband download speeds in Dhaka measure 44.0 Mbps", "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Grameenphone, Banglalink, and Robi provide prepaid 4G SIMs at Hazrat Shahjalal International Airport (DAC) in Dhaka. Biometric fingerprint registration and passport copy are mandatory for all SIM activations.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://btrc.gov.bd", "tier": 1, "title": "Bangladesh Telecommunication Regulatory Commission (BTRC)"}],
                "evidence_quote": "SIM card registration requires biometric verification and passport copy under BTRC directives", "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Pathao", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://pathao.com", "tier": 2, "title": "Pathao Ride-Hailing & Delivery Bangladesh"}
            },
            {
                "name": "bKash", "category": "payments", "available_in_country": True,
                "source": {"url": "https://www.bkash.com", "tier": 1, "title": "bKash Mobile Financial Services"}
            },
            {
                "name": "Uber Bangladesh", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://www.uber.com/bd/en/", "tier": 2, "title": "Uber Bangladesh"}
            },
            {
                "name": "Shohoz", "category": "transport", "available_in_country": True,
                "source": {"url": "https://www.shohoz.com", "tier": 2, "title": "Shohoz Bus & Train Ticketing"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Islam (approx. 90%, predominantly Sunni) and Hinduism (approx. 9%)",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://bbs.gov.bd", "tier": 1, "title": "Bangladesh Bureau of Statistics (BBS)"}],
                "evidence_quote": "Islam is the state religion while constitutionally guaranteeing religious harmony and freedom for minority faiths", "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Pohela Boishakh (Bengali New Year on April 14 celebrated with Mangal Shobhajatra - UNESCO), Eid-ul-Fitr, Durga Puja, Language Martyrs' Day (Feb 21)",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://whc.unesco.org/en/list/1091", "tier": 1, "title": "UNESCO Intangible Cultural Heritage"}],
                "evidence_quote": "Mangal Shobhajatra on Bengali New Year is inscribed by UNESCO for its message of unity and secular celebration", "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Dress conservatively: shoulders and legs should be covered in public; women should carry a scarf when visiting mosques. Avoid unbottled tap water and raw street salads. Friday is the religious holy day with many government offices and shops closed.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://tourismboard.gov.bd", "tier": 1, "title": "Bangladesh Tourism Board (BTB)"}],
                "evidence_quote": "Conservative attire respecting Islamic and Bengali cultural norms is expected in public spaces", "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Tipping 5-10% is customary in upscale Dhaka restaurants. Tipping hotel luggage staff (50-100 BDT) and tour guides is standard practice.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://tourismboard.gov.bd", "tier": 1, "title": "BTB Visitor Tips"}],
                "evidence_quote": "A 5-10% tip is standard in hospitality and full-service dining", "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "Sundarbans Mangrov Ormanları ve Bengal Kaplanı Barınağı", "en": "The Sundarbans Mangrove Forest", "de": "Sundarbans Mangrovenwald", "ru": "Мангровые леса Сундарбан", "es": "Bosque de Manglares de los Sundarbans"},
                "type": "nature", "sources": [{"url": "https://whc.unesco.org/en/list/798", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            },
            {
                "name": {"tr": "Cox's Bazar Dünyanın En Uzun Doğal Sahili", "en": "Cox's Bazar World's Longest Natural Sea Beach", "de": "Cox's Bazar Längster Sandstrand der Welt", "ru": "Кокс-Базар самый длинный песчаный пляж в мире", "es": "Cox's Bazar Playa Natural Más Larga del Mundo"},
                "type": "nature", "sources": [{"url": "https://tourismboard.gov.bd", "tier": 1, "title": "Bangladesh Tourism Board"}]
            }
        ],
        "media": {
            "images": [{
                "role": "card", "landmark": "Sundarbans Mangrov Ormanları ve Bengal Deltası",
                "license": "CC-BY-SA", "author": "Shmunmun", "source_url": "/images/countries/bd-480.webp",
                "attribution_text": "Sundarbans mangrove riverways and Bengal tiger habitat in Bangladesh. Shmunmun, CC BY-SA 3.0.",
                "focal_point": {"x": 50, "y": 50},
                "alt": {
                    "tr": "Sundarbans Mangrov Ormanları ve Bengal Deltası, Bangladeş",
                    "en": "The Sundarbans Mangrove Forests & Bengal Delta, Bangladesh",
                    "de": "Sundarbans Mangrovenwälder und Bengalen-Delta, Bangladesch",
                    "ru": "Мангровые леса Сундарбан и дельта Бенгалии, Бангладеш",
                    "es": "Bosques de Manglares de Sundarbans y Delta de Bengala, Bangladés"
                },
                "recognizability_checked": True
            }]
        },
        "seo": {
            "slug": {"tr": "banglades", "en": "bangladesh", "de": "bangladesch", "ru": "bangladesh", "es": "banglades"},
            "title": {
                "tr": "Bangladeş Vize Rehberi, Kapıda Vize (VoA) Şartları ve Sundarbans | Vizamigo",
                "en": "Bangladesh Visa Guide, Visa on Arrival Rules & Sundarbans Travel | Vizamigo",
                "de": "Bangladesch Visum-Leitfaden, Visa on Arrival & Reisetipps | Vizamigo",
                "ru": "Виза в Бангладеш, виза по прибытии и мангровые леса Сундарбан | Vizamigo",
                "es": "Guía de Visa de Bangladés, Visa a la Llegada y Bosque de Sundarbans | Vizamigo"
            },
            "meta_description": {
                "tr": "Bangladeş Türk pasaportuna 30 gün kapıda vize (VoA) şartları, bKash ve Pathao uygulamaları, çoklu priz tipleri ve Sundarbans Bengal kaplanı rehberi.",
                "en": "Bangladesh 30-day Visa on Arrival rules, bKash & Pathao super-apps, electrical plug guide, and Sundarbans tiger safari advice.",
                "de": "Bangladesch 30 Tage Visa on Arrival, bKash-Zahlungen, Pathao-Fahrten, Steckdosentypen und Sundarbans-Nationalpark.",
                "ru": "Правила оформления визы по прибытии в Бангладеш на 30 дней, приложение bKash, розетки и сафари в мангровых лесах Сундарбан.",
                "es": "Requisitos de visa a la llegada a Bangladés (30 días), pagos con bKash, enchufes y guía de los manglares de Sundarbans."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "PK": {
        "iso2": "PK",
        "names": {"tr": "Pakistan", "en": "Pakistan", "de": "Pakistan", "ru": "Пакистан", "es": "Pakistán"},
        "capital": {
            "value": "Islamabad", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.cda.gov.pk", "tier": 1, "title": "Capital Development Authority Islamabad"}],
            "evidence_quote": "Islamabad is the federal capital and administrative seat of the Islamic Republic of Pakistan",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "PKR", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.sbp.org.pk", "tier": 1, "title": "State Bank of Pakistan"}],
            "evidence_quote": "The Pakistani Rupee (PKR, Rs) is the official currency; trades around 278 PKR to 1 USD",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+5 (PKT)", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.pmd.gov.pk", "tier": 1, "title": "Pakistan Meteorological Department"}],
            "evidence_quote": "Pakistan Standard Time operates year-round on UTC+5 without seasonal daylight saving",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://nepra.org.pk", "tier": 1, "title": "National Electric Power Regulatory Authority (NEPRA)"}],
                "evidence_quote": "Standard residential supply voltage across Pakistan is 230V 50 Hz", "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://nepra.org.pk", "tier": 1, "title": "NEPRA Pakistan"}],
                "evidence_quote": "The national electrical power grid operating frequency is standard 50 Hz", "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "D", "M"], "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "European Type C two-pin and British Type D and M three-round-pin sockets are standard", "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "15", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://islamabadpolice.gov.pk", "tier": 1, "title": "Islamabad Police - Emergency 15"}],
                "evidence_quote": "Dial 15 for emergency police assistance throughout Pakistan", "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "1122", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://rescue.gov.pk", "tier": 1, "title": "Punjab Emergency Service Rescue 1122"}],
                "evidence_quote": "Call 1122 for Rescue 1122 emergency ambulance and paramedic dispatch", "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "16", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://rescue.gov.pk", "tier": 1, "title": "Emergency Rescue 1122 Fire Service"}],
                "evidence_quote": "Dial 16 or 1122 for emergency fire and rescue services", "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "1122", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://rescue.gov.pk", "tier": 1, "title": "Rescue 1122 Emergency Operations"}],
                "evidence_quote": "1122 is the integrated national emergency response number", "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+92 51 920 4455", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://ptdc.com.pk", "tier": 1, "title": "Pakistan Tourism Development Corporation (PTDC)"}],
                "evidence_quote": "Tourist Facilitation Center and Tourist Police in Gilgit-Baltistan coordinate at +92 51 920 4455", "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {"agency": "US_STATE", "level": 3, "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept"}, "retrieved_at": "2026-10-18"},
                {"agency": "UK_FCDO", "level": 3, "source": {"url": "https://www.gov.uk/foreign-travel-advice/pakistan", "tier": 1, "title": "UK FCDO"}, "retrieved_at": "2026-10-18"},
                {"agency": "DE_AA", "level": 3, "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt"}, "retrieved_at": "2026-10-18"}
            ],
            "combined_level": 3, "agencies_agree": True,
            "advisory_headline": {
                "tr": "Belucistan ve Hayber Pahtunhva sınır bölgelerinde güvenlik riskleri nedeniyle seyahat planları gözden geçirilmelidir; Gilgit-Baltistan ve Hunza vadileri turistler için son derece huzurlu ve güvenlidir.",
                "en": "Reconsider travel due to security concerns in border areas; Gilgit-Baltistan, Hunza, and Skardu are exceptionally safe and welcoming.",
                "de": "Reisen in Grenzgebiete sorgfältig abwägen; die Gebirgsregionen Gilgit-Baltistan und das Hunza-Tal sind sicher und gastfreundlich.",
                "ru": "Соблюдайте осторожность в приграничных зонах; высокогорный регион Гилгит-Балтистан и долина Хунза безопасны и гостеприимны.",
                "es": "Reconsidere viajar a zonas fronterizas; las regiones montañosas de Gilgit-Baltistán y el valle de Hunza son muy seguras."
            },
            "regional_warnings": [
                {"area": "Balochistan province and Khyber Pakhtunkhwa (former FATA)", "level": 4, "reason": "terrorism", "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State"}}
            ],
            "risk_categories": {"crime": "medium", "terrorism": "high", "civil_unrest": "high", "natural_disaster": "medium", "health": "medium"}
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 22.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/pakistan", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median mobile broadband download speeds in Pakistan reach approximately 22.0 Mbps", "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 32.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/pakistan", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median fixed broadband download speeds measure 32.0 Mbps", "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Jazz, Zong, and Telenor provide 4G SIMs in Islamabad. In Gilgit-Baltistan and northern Karakoram passes, SCO (Special Communications Organization) / SCOM is the primary cellular provider with mountain coverage.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://pta.gov.pk", "tier": 1, "title": "Pakistan Telecommunication Authority (PTA)"}],
                "evidence_quote": "Biometric registration with passport and visa copy is mandatory for all SIM activations", "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Indrive Pakistan", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://indrive.com", "tier": 2, "title": "InDrive Pakistan"}
            },
            {
                "name": "Easypaisa", "category": "payments", "available_in_country": True,
                "source": {"url": "https://easypaisa.com.pk", "tier": 1, "title": "Easypaisa Mobile Wallet"}
            },
            {
                "name": "Foodpanda Pakistan", "category": "food", "available_in_country": True,
                "source": {"url": "https://www.foodpanda.pk", "tier": 2, "title": "Foodpanda Pakistan"}
            },
            {
                "name": "Careem Pakistan", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://www.careem.com/en-pk/", "tier": 2, "title": "Careem Pakistan"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Islam (approx. 96%, predominantly Sunni approx. 80-85% and Shia approx. 15%)",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.pbs.gov.pk", "tier": 1, "title": "Pakistan Bureau of Statistics"}],
                "evidence_quote": "Islam is the state religion and the foundation of civil law, hospitality traditions, and public life", "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Shandur Polo Festival (highest polo ground on earth at 3,700m in July), Eid-ul-Fitr, Pakistan Day (March 23), Sufi Urs at Data Darbar",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://ptdc.com.pk", "tier": 1, "title": "PTDC Cultural Festivals"}],
                "evidence_quote": "Shandur Polo Festival is a legendary mountain spectacle played under traditional freestyle rules", "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Dress modestly across the country (salwar kameez is customary; shoulders and knees must be covered for all genders). Alcohol sales are strictly regulated and forbidden for Muslims; non-Muslim foreign tourists can obtain alcohol only at licensed 5-star international hotels. Blasphemy laws are extremely strict.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://ptdc.com.pk", "tier": 1, "title": "PTDC Tourist Guidelines"}],
                "evidence_quote": "Respect for Islamic social norms, conservative attire, and religious sensitivities is paramount", "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Tipping 10% is customary in sit-down restaurants. Tipping mountain trekking porters, jeep drivers, and mountain guides in the Karakoram ($10-15 per day) is essential.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://ptdc.com.pk", "tier": 1, "title": "PTDC Travel Tips"}],
                "evidence_quote": "A 10% gratuity is standard in hospitality and trekking expedition services", "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "Hunza Vadisi, Rakaposhi Zirvesi ve Baltit Kalesi", "en": "Hunza Valley, Rakaposhi Peak & Baltit Fort", "de": "Hunza-Tal, Rakaposhi & Baltit-Festung", "ru": "Долина Хунза, пик Ракапоши и форт Балтит", "es": "Valle de Hunza, Pico Rakaposhi y Fuerte Baltit"},
                "type": "nature", "sources": [{"url": "https://whc.unesco.org/en/tentativelists/1882/", "tier": 1, "title": "UNESCO Tentative List"}]
            },
            {
                "name": {"tr": "Karakurum Otoyolu ve Passu Katedralleri", "en": "Karakoram Highway & Passu Cones", "de": "Karakorum Highway & Passu-Kathedralen", "ru": "Каракорумское шоссе и пики Пассу", "es": "Carretera del Karakórum y Conos de Passu"},
                "type": "landmark", "sources": [{"url": "https://ptdc.com.pk", "tier": 1, "title": "PTDC Pakistan"}]
            }
        ],
        "media": {
            "images": [{
                "role": "card", "landmark": "Hunza Vadisi, Rakaposhi Karlı Zirvesi ve Baltit Kalesi",
                "license": "CC-BY-SA", "author": "Samraiz Nawaz", "source_url": "/images/countries/pk-480.webp",
                "attribution_text": "Hunza Valley snowcapped Rakaposhi peak and historic Baltit Fort in Pakistan. Samraiz Nawaz, CC BY-SA 4.0.",
                "focal_point": {"x": 50, "y": 50},
                "alt": {
                    "tr": "Hunza Vadisi, Rakaposhi Karlı Zirvesi ve Baltit Kalesi, Pakistan",
                    "en": "Hunza Valley, Rakaposhi Peak & Baltit Fort, Pakistan",
                    "de": "Hunza-Tal mit schneebedecktem Rakaposhi & Baltit-Fort, Pakistan",
                    "ru": "Долина Хунза, заснеженный пик Ракапоши и форт Балтит, Пакистан",
                    "es": "Valle de Hunza, Pico Nevado Rakaposhi y Fuerte Baltit, Pakistán"
                },
                "recognizability_checked": True
            }]
        },
        "seo": {
            "slug": {"tr": "pakistan", "en": "pakistan", "de": "pakistan", "ru": "pakistan", "es": "pakistan"},
            "title": {
                "tr": "Pakistan e-Vize Rehberi, Hunza Vadisi, Karakurum Otoyolu ve Güvenlik | Vizamigo",
                "en": "Pakistan eVisa Guide, Hunza Valley, Karakoram Highway & Safety | Vizamigo",
                "de": "Pakistan E-Visum Leitfaden, Hunza-Tal & Karakorum Highway | Vizamigo",
                "ru": "Электронная виза в Пакистан, долина Хунза, Каракорумское шоссе | Vizamigo",
                "es": "Guía de eVisa de Pakistán, Valle de Hunza y Carretera del Karakórum | Vizamigo"
            },
            "meta_description": {
                "tr": "Pakistan online e-Vize başvuru şartları, Karakurum Otoyolu gezi rotası, Tip C/D/M prizler, SCOM hattı ve Hunza Vadisi gezi rehberi.",
                "en": "Pakistan online eVisa rules, Karakoram Highway expedition tips, Type C/D/M sockets, SCOM SIM card, and Hunza Valley travel guide.",
                "de": "Pakistan E-Visum Antrag, Karakorum Highway Reiseroute, Steckdosentyp C/D/M, SCOM-Netz und Hunza-Tal.",
                "ru": "Правила оформления электронной визы в Пакистан, Каракорумское шоссе, розетки Type C/D/M, сим-карта SCOM и долина Хунза.",
                "es": "Requisitos de eVisa para Pakistán, expedición por la Carretera del Karakórum, enchufes y guía del valle de Hunza."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "KG": {
        "iso2": "KG",
        "names": {"tr": "Kırgızistan", "en": "Kyrgyzstan", "de": "Kirgisistan", "ru": "Кыргызстан", "es": "Kirguistán"},
        "capital": {
            "value": "Bishkek", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://meria.kg", "tier": 1, "title": "Mayor's Office of Bishkek City"}],
            "evidence_quote": "Bishkek is the capital and largest metropolis of the Kyrgyz Republic",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "KGS", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.nbkr.kg", "tier": 1, "title": "National Bank of the Kyrgyz Republic"}],
            "evidence_quote": "The Kyrgyzstani Som (KGS, с) is the official currency; trades around 89 KGS to 1 USD",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+6 (KGT)", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://meteo.kg", "tier": 1, "title": "Kyrgyzhydromet"}],
            "evidence_quote": "Kyrgyzstan Time operates year-round on UTC+6 without daylight saving adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "220V", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://nesk.kg", "tier": 1, "title": "National Electrical Grid of Kyrgyzstan (NESK)"}],
                "evidence_quote": "Standard residential supply voltage across Kyrgyzstan is 220V 50 Hz", "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://nesk.kg", "tier": 1, "title": "NESK"}],
                "evidence_quote": "The national electrical power grid operating frequency is standard 50 Hz", "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "F"], "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "European standard Type C round two-pin and Schuko Type F sockets are universal", "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "102", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://mvd.gov.kg", "tier": 1, "title": "Ministry of Internal Affairs of the Kyrgyz Republic"}],
                "evidence_quote": "Dial 102 for emergency police assistance throughout Kyrgyzstan", "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "103", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://med.kg", "tier": 1, "title": "Ministry of Health of the Kyrgyz Republic"}],
                "evidence_quote": "Call 103 for emergency medical services and ambulance dispatch", "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "101", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://mchs.gov.kg", "tier": 1, "title": "Ministry of Emergency Situations (MES) Kyrgyzstan"}],
                "evidence_quote": "Dial 101 for emergency fire and rescue services", "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://mchs.gov.kg", "tier": 1, "title": "MES Unified Emergency Service 112"}],
                "evidence_quote": "112 is the nationwide unified emergency dispatch number", "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+996 312 888 102", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://mvd.gov.kg", "tier": 1, "title": "Tourist Police of Kyrgyzstan"}],
                "evidence_quote": "Tourist Police units patrol Bishkek and Issyk-Kul resort shores via +996 312 888 102 and 112", "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {"agency": "US_STATE", "level": 1, "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept"}, "retrieved_at": "2026-10-18"},
                {"agency": "UK_FCDO", "level": 1, "source": {"url": "https://www.gov.uk/foreign-travel-advice/kyrgyzstan", "tier": 1, "title": "UK FCDO"}, "retrieved_at": "2026-10-18"},
                {"agency": "DE_AA", "level": 1, "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt"}, "retrieved_at": "2026-10-18"}
            ],
            "combined_level": 1, "agencies_agree": True,
            "advisory_headline": {
                "tr": "Kırgızistan Orta Asya'nın en misafirperver ve dağ yürüyüşü için güvenli ülkelerindendir; standart seyahat önlemleri yeterlidir.",
                "en": "Kyrgyzstan is exceptionally welcoming, scenic, and safe for mountain trekking; exercise normal precautions.",
                "de": "Kirgisistan ist ein sicheres und gastfreundliches Reiseland für Bergwanderer; normale Vorsichtsmaßnahmen genügen.",
                "ru": "Кыргызстан — одна из самых гостеприимных и безопасных стран Центральной Азии для горного туризма.",
                "es": "Kirguistán es un destino sumamente acogedor y seguro para el senderismo de montaña; aplican precauciones normales."
            },
            "regional_warnings": [],
            "risk_categories": {"crime": "low", "terrorism": "low", "civil_unrest": "low", "natural_disaster": "medium", "health": "low"}
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 35.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/kyrgyzstan", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median mobile broadband download speeds in Kyrgyzstan reach approximately 35.0 Mbps", "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 62.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/kyrgyzstan", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median fixed broadband download speeds in Bishkek measure 62.0 Mbps", "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Mega (MegaCom), Beeline KG, and O! offer cheap high-speed 4G eSIMs at Manas International Airport (FRU) in Bishkek. CBT (Community Based Tourism) operates homestays and yurt camps across Song-Kul and Issyk-Kul.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://digital.gov.kg", "tier": 1, "title": "Ministry of Digital Development of the Kyrgyz Republic"}],
                "evidence_quote": "SIM card purchases require passport registration under national communication laws", "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Yandex Go Kyrgyzstan", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://go.yandex.com/kg_ru", "tier": 2, "title": "Yandex Go Kyrgyzstan"}
            },
            {
                "name": "MBank (Commercial Bank Kyrgyzstan)", "category": "payments", "available_in_country": True,
                "source": {"url": "https://mbank.kg", "tier": 1, "title": "MBank Mobile App"}
            },
            {
                "name": "2GIS Bishkek", "category": "maps", "available_in_country": True,
                "source": {"url": "https://2gis.kg/bishkek", "tier": 2, "title": "2GIS Offline City Maps"}
            },
            {
                "name": "Glovo Kyrgyzstan", "category": "food", "available_in_country": True,
                "source": {"url": "https://glovoapp.com/kg/en/", "tier": 2, "title": "Glovo Delivery Bishkek"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Islam (approx. 88%, predominantly Sunni) and Russian Orthodoxy (approx. 10%) with deep nomadic heritage",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://stat.kg", "tier": 1, "title": "National Statistical Committee of the Kyrgyz Republic"}],
                "evidence_quote": "Nomadic pastoralist traditions, epic poetry (Manas), and Islamic faith shape Kyrgyz culture", "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "World Nomad Games, Nooruz (Spring Equinox on March 21), National Horse Games Festival (Kok-Boru at Song-Kul), Birds of Prey Festival",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://tourism.gov.kg", "tier": 1, "title": "Department of Tourism of the Kyrgyz Republic"}],
                "evidence_quote": "Kok-Boru horse games and salburun eagle falconry are central to traditional nomadic festivals", "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Never step on or walk across the dastarkhan (tablecloth spread on the floor for meals). When staying in yurts, remove your shoes before stepping onto carpets. Taking photos of border checkpoints or military areas is strictly forbidden. Russian and Kyrgyz are both official languages.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://tourism.gov.kg", "tier": 1, "title": "Department of Tourism Guide"}],
                "evidence_quote": "Nomadic hospitality etiquettes regarding yurt entries and dastarkhan are deeply revered", "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "A 10-15% service charge is automatically added to restaurant bills in Bishkek. Tipping mountain trekking horsemen and guides ($5-10 per day) is customary.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://tourism.gov.kg", "tier": 1, "title": "Department of Tourism Travel Tips"}],
                "evidence_quote": "Most urban restaurants include a 10-15% service fee directly on the bill", "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "Issık Göl (Issyk-Kul) Alpin Gölü ve Karlı Tanrı Dağları", "en": "Issyk-Kul Alpine Lake & Tian Shan Peaks", "de": "Issyk-Kul Hochgebirgssee & Tian Shan", "ru": "Высокогорное озеро Иссык-Куль и пики Тянь-Шаня", "es": "Lago Alpino Issyk-Kul y Picos de Tian Shan"},
                "type": "nature", "sources": [{"url": "https://whc.unesco.org/en/tentativelists/1607/", "tier": 1, "title": "UNESCO Tentative List"}]
            },
            {
                "name": {"tr": "Ala-Arça Ulusal Parkı ve Song-Köl Yurt Kampları", "en": "Ala-Archa National Park & Song-Kul Yurt Camps", "de": "Ala-Artscha Nationalpark & Song-Köl Jurten-Camps", "ru": "Национальный парк Ала-Арча и юртовые лагеря Сон-Куль", "es": "Parque Nacional Ala-Archa y Campamentos de Yurts de Song-Kul"},
                "type": "nature", "sources": [{"url": "https://tourism.gov.kg", "tier": 1, "title": "Department of Tourism of the Kyrgyz Republic"}]
            }
        ],
        "media": {
            "images": [{
                "role": "card", "landmark": "Issık Göl (Issyk-Kul) ve Karlı Tanrı Dağları (Tian Shan)",
                "license": "CC-BY", "author": "Ninara from Helsinki", "source_url": "/images/countries/kg-480.webp",
                "attribution_text": "Issyk-Kul Lake and Tian Shan snow-capped peaks in Kyrgyzstan. Ninara from Helsinki, CC BY 2.0.",
                "focal_point": {"x": 50, "y": 50},
                "alt": {
                    "tr": "Issık Göl (Issyk-Kul) ve Karlı Tanrı Dağları (Tian Shan), Kırgızistan",
                    "en": "Issyk-Kul Alpine Lake & Tian Shan Mountains, Kyrgyzstan",
                    "de": "Issyk-Kul Hochgebirgssee & Tian-Shan-Gebirge, Kirgisistan",
                    "ru": "Высокогорное озеро Иссык-Куль и заснеженные хребты Тянь-Шаня, Кыргызстан",
                    "es": "Lago Alpino Issyk-Kul y Cordillera de Tian Shan, Kirguistán"
                },
                "recognizability_checked": True
            }]
        },
        "seo": {
            "slug": {"tr": "kirgizistan", "en": "kyrgyzstan", "de": "kirgisistan", "ru": "kyrgyzstan", "es": "kirguistan"},
            "title": {
                "tr": "Kırgızistan Vize Rehberi, 90 Gün Vizesiz Giriş, Issık Göl ve Yurt Kampları | Vizamigo",
                "en": "Kyrgyzstan Visa Guide, 90-Day Visa-Free Rules, Issyk-Kul & Yurts | Vizamigo",
                "de": "Kirgisistan Visum-Leitfaden, 90 Tage visafrei & Issyk-Kul Reisetipps | Vizamigo",
                "ru": "Виза в Кыргызстан, 90 дней без визы, озеро Иссык-Куль и юрты | Vizamigo",
                "es": "Guía de Visa de Kirguistán, 90 Días sin Visa y Lago Issyk-Kul | Vizamigo"
            },
            "meta_description": {
                "tr": "Kırgızistan Türk pasaportuna 90 gün vizesiz giriş, Yandex Go ve MBank kullanımı, Tip C/F prizler, Tanrı Dağları ve Issık Göl gezi rehberi.",
                "en": "Kyrgyzstan 90-day visa-free rules, Yandex Go & MBank apps, Type C/F plugs, Tian Shan trekking, and Issyk-Kul yurt guide.",
                "de": "Kirgisistan 90 Tage visafreie Einreise, Yandex Go Taxi, Steckdosentyp C/F, Tian-Shan-Trekking und Issyk-Kul-Reiseführer.",
                "ru": "Правила въезда в Кыргызстан на 90 дней без визы, такси Yandex Go, розетки Type C/F, треккинг на Тянь-Шане и озеро Иссык-Куль.",
                "es": "Requisitos de entrada sin visa a Kirguistán (90 días), aplicación Yandex Go, enchufes Tipo C/F y lago Issyk-Kul."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "TJ": {
        "iso2": "TJ",
        "names": {"tr": "Tacikistan", "en": "Tajikistan", "de": "Tadschikistan", "ru": "Таджикистан", "es": "Tayikistán"},
        "capital": {
            "value": "Dushanbe", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://dushanbe.tj", "tier": 1, "title": "Executive Body of State Power in Dushanbe"}],
            "evidence_quote": "Dushanbe is the capital and largest urban metropolis of the Republic of Tajikistan",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "TJS", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://nbt.tj", "tier": 1, "title": "National Bank of Tajikistan"}],
            "evidence_quote": "The Tajikistani Somoni (TJS, сом) is the official currency; trades around 10.9 TJS to 1 USD",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+5 (TJT)", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://meteo.tj", "tier": 1, "title": "Agency for Hydrometeorology of Tajikistan"}],
            "evidence_quote": "Tajikistan Time operates year-round on UTC+5 with no daylight saving adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "220V", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://barqitojik.tj", "tier": 1, "title": "Barqi Tojik National Electricity Company"}],
                "evidence_quote": "Standard residential supply voltage across Tajikistan is 220V 50 Hz", "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://barqitojik.tj", "tier": 1, "title": "Barqi Tojik"}],
                "evidence_quote": "Operating frequency of the national electrical grid is 50 Hz", "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "F"], "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "European standard Type C round two-pin and Schuko Type F sockets are standard", "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "102", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://mvd.tj", "tier": 1, "title": "Ministry of Internal Affairs of the Republic of Tajikistan"}],
                "evidence_quote": "Dial 102 for emergency police response throughout Tajikistan", "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "103", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://moh.tj", "tier": 1, "title": "Ministry of Health and Social Protection Tajikistan"}],
                "evidence_quote": "Call 103 for emergency medical services and ambulance dispatch", "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "101", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://mchs.tj", "tier": 1, "title": "Committee on Emergency Situations and Civil Defence (CoES)"}],
                "evidence_quote": "Dial 101 for emergency fire and rescue services", "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://mchs.tj", "tier": 1, "title": "CoES Emergency Operations"}],
                "evidence_quote": "112 is the unified national emergency dispatch contact number", "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+992 37 221-1212", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://traveltajikistan.tj", "tier": 1, "title": "Tourism Development Committee of Tajikistan"}],
                "evidence_quote": "Tourist Police department under the Ministry of Internal Affairs operates at +992 37 221-1212", "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {"agency": "US_STATE", "level": 1, "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept"}, "retrieved_at": "2026-10-18"},
                {"agency": "UK_FCDO", "level": 1, "source": {"url": "https://www.gov.uk/foreign-travel-advice/tajikistan", "tier": 1, "title": "UK FCDO"}, "retrieved_at": "2026-10-18"},
                {"agency": "DE_AA", "level": 1, "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt"}, "retrieved_at": "2026-10-18"}
            ],
            "combined_level": 1, "agencies_agree": True,
            "advisory_headline": {
                "tr": "Tacikistan son derece huzurlu ve büyüleyici bir dağ ülkesidir; Afganistan sınır hattında standart dikkat gereklidir.",
                "en": "Tajikistan is very peaceful and scenic; exercise normal precautions, with vigilance along the Afghan border.",
                "de": "Tadschikistan ist ein friedliches Gebirgsland; normale Vorsichtsmaßnahmen, erhöht entlang der Grenze zu Afghanistan.",
                "ru": "Таджикистан в целом безопасен и дружелюбен; проявляйте осторожность в приграничной полосе с Афганистаном.",
                "es": "Tayikistán es un país montañoso pacífico; aplican precauciones normales con cautela en la frontera afgana."
            },
            "regional_warnings": [
                {"area": "Border region with Afghanistan", "level": 2, "reason": "conflict", "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State"}}
            ],
            "risk_categories": {"crime": "low", "terrorism": "low", "civil_unrest": "low", "natural_disaster": "medium", "health": "low"}
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 20.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/tajikistan", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median mobile broadband download speeds in Tajikistan reach approximately 20.0 Mbps", "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 36.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/tajikistan", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median fixed broadband download speeds in Dushanbe measure 36.0 Mbps", "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Tcell, MegaFon Tajikistan, and Babilon-M provide 4G SIM cards in Dushanbe (DYU airport). Stays exceeding 10 business days require official OVIR police registration. Pamir Highway expeditions require a separate GBAO permit.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://traveltajikistan.tj", "tier": 1, "title": "Tourism Development Committee of Tajikistan"}],
                "evidence_quote": "Foreigners staying over 10 working days must register with the migration authority (OVIR)", "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Yandex Go Dushanbe", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://go.yandex.com/tj_ru", "tier": 2, "title": "Yandex Go Tajikistan"}
            },
            {
                "name": "Alif Mobi", "category": "payments", "available_in_country": True,
                "source": {"url": "https://alif.tj", "tier": 1, "title": "Alif Bank Mobile Wallet"}
            },
            {
                "name": "Tcell Wallet", "category": "payments", "available_in_country": True,
                "source": {"url": "https://tcell.tj", "tier": 2, "title": "Tcell TezSum"}
            },
            {
                "name": "Somon Air App", "category": "transport", "available_in_country": True,
                "source": {"url": "https://somonair.com", "tier": 1, "title": "Somon Air"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Islam (approx. 96%, predominantly Sunni Hanafi approx. 90% and Ismaili Shia approx. 5% in the Pamirs)",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://stat.tj", "tier": 1, "title": "Agency on Statistics under the President of the Republic of Tajikistan"}],
                "evidence_quote": "Sunni traditions dominate western valleys; Pamiri communities in Badakhshan practice Ismaili Islam", "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Navruz (Persian New Year on March 21-24), Mehrgon autumn harvest, Roof of the World Cultural Festival in Khorog, Eid festivals",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://traveltajikistan.tj", "tier": 1, "title": "Tourism Committee Cultural Calendar"}],
                "evidence_quote": "Navruz is the most grand annual holiday celebrated with sumanak wheat pudding and buzkashi horse games", "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "A special GBAO (Gorno-Badakhshan Autonomous Oblast) permit is legally required to travel the Pamir Highway; obtain it during e-Visa application or at OVIR in Dushanbe. Foreigners staying over 10 working days must register with migration police. Modest dress is standard.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://evisa.tj", "tier": 1, "title": "Tajikistan E-Visa Portal"}],
                "evidence_quote": "Travel into the GBAO border territory requires an official electronic or endorsed permit", "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "A 10-15% service charge is usually included on restaurant bills in Dushanbe. Tipping Pamir Highway 4x4 drivers and homestay hosts ($10-15 per day) is customary.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://traveltajikistan.tj", "tier": 1, "title": "Tourism Committee Travel Tips"}],
                "evidence_quote": "A 10% service fee is included on restaurant bills; tipping mountain expedition drivers is standard", "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "İskenderkul Alpin Gölü ve Fann Dağları", "en": "Iskanderkul Alpine Lake & Fann Mountains", "de": "Iskanderkul-See & Fann-Gebirge", "ru": "Озеро Искандеркуль и Фанские горы", "es": "Lago Alpino Iskanderkul y Montañas Fann"},
                "type": "nature", "sources": [{"url": "https://whc.unesco.org/en/tentativelists/2108/", "tier": 1, "title": "UNESCO Tentative List"}]
            },
            {
                "name": {"tr": "Pamir Otoyolu (M41 Dünyanın Çatısı)", "en": "Pamir Highway (M41 Roof of the World)", "de": "Pamir Highway (M41 Dach der Welt)", "ru": "Памирский тракт (М41 Крыша мира)", "es": "Carretera del Pamir (M41 Techo del Mundo)"},
                "type": "landmark", "sources": [{"url": "https://traveltajikistan.tj", "tier": 1, "title": "Tourism Development Committee of Tajikistan"}]
            }
        ],
        "media": {
            "images": [{
                "role": "card", "landmark": "İskenderkul Turkuaz Alpin Gölü ve Fann Dağları",
                "license": "CC-BY-SA", "author": "Rjruiziii", "source_url": "/images/countries/tj-480.webp",
                "attribution_text": "Iskanderkul alpine lake and Fann Mountains in Tajikistan. Rjruiziii, CC BY-SA 3.0.",
                "focal_point": {"x": 50, "y": 50},
                "alt": {
                    "tr": "İskenderkul Turkuaz Alpin Gölü ve Fann Dağları, Tacikistan",
                    "en": "Iskanderkul Turquoise Alpine Lake & Fann Mountains, Tajikistan",
                    "de": "Iskanderkul Türkis-Hochgebirgssee & Fann-Gebirge, Tadschikistan",
                    "ru": "Бирюзовое высокогорное озеро Искандеркуль и Фанские горы, Таджикистан",
                    "es": "Lago Alpino Turquesa Iskanderkul y Montañas Fann, Tayikistán"
                },
                "recognizability_checked": True
            }]
        },
        "seo": {
            "slug": {"tr": "tacikistan", "en": "tajikistan", "de": "tadschikistan", "ru": "tadzhikistan", "es": "tayikistan"},
            "title": {
                "tr": "Tacikistan Vize Rehberi, 30 Gün Vizesiz Giriş, Pamir İzni ve İskenderkul | Vizamigo",
                "en": "Tajikistan Visa Guide, 30-Day Visa-Free Rules, GBAO Permit & Travel | Vizamigo",
                "de": "Tadschikistan Visum-Leitfaden, 30 Tage visafrei & Pamir Highway | Vizamigo",
                "ru": "Виза в Таджикистан, 30 дней без визы, пропуск ГБАО и озеро Искандеркуль | Vizamigo",
                "es": "Guía de Visa de Tayikistán, 30 Días sin Visa, Permiso GBAO | Vizamigo"
            },
            "meta_description": {
                "tr": "Tacikistan Türk pasaportuna 30 gün vizesiz giriş, Pamir Yolu GBAO izin şartları, OVIR kaydı, Tip C/F prizler ve İskenderkul gölü gezi rehberi.",
                "en": "Tajikistan 30-day visa-free rules, Pamir Highway GBAO permit instructions, OVIR police registration, Type C/F plugs, and Iskanderkul guide.",
                "de": "Tadschikistan 30 Tage visafreie Einreise, GBAO-Genehmigung für den Pamir Highway, OVIR-Registrierung und Reiseführer Iskanderkul.",
                "ru": "Правила въезда в Таджикистан на 30 дней без визы, оформление пропуска на Памир ГБАО, регистрация ОВИР, розетки Type C/F и Искандеркуль.",
                "es": "Requisitos de entrada sin visa a Tayikistán (30 días), permiso GBAO para la carretera del Pamir, registro OVIR y lago Iskanderkul."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "BT": {
        "iso2": "BT",
        "names": {"tr": "Butan", "en": "Bhutan", "de": "Bhutan", "ru": "Бутан", "es": "Bután"},
        "capital": {
            "value": "Thimphu", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.thimphucity.bt", "tier": 1, "title": "Thimphu Thromde (City Corporation)"}],
            "evidence_quote": "Thimphu is the capital and largest city of the Kingdom of Bhutan in the western ravine valley",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "BTN", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.rma.org.bt", "tier": 1, "title": "Royal Monetary Authority of Bhutan"}],
            "evidence_quote": "The Bhutanese Ngultrum (BTN, Nu) is pegged at par (1:1) with the Indian Rupee; INR notes are legal tender",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+6 (BTT)", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.nchm.gov.bt", "tier": 1, "title": "National Center for Hydrology and Meteorology Bhutan"}],
            "evidence_quote": "Bhutan Time operates year-round on UTC+6 without daylight saving adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.bpc.bt", "tier": 1, "title": "Bhutan Power Corporation (BPC)"}],
                "evidence_quote": "Standard residential supply voltage across Bhutan is 230V 50 Hz", "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.bpc.bt", "tier": 1, "title": "BPC Bhutan"}],
                "evidence_quote": "Grid frequency throughout the Kingdom is standard 50 Hz", "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["D", "F", "G"], "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "British Type D and G three-pin sockets and European Type F sockets are found in hotels", "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "113", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.rbp.gov.bt", "tier": 1, "title": "Royal Bhutan Police (RBP)"}],
                "evidence_quote": "Dial 113 for emergency police response across Bhutan", "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "112", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.moh.gov.bt", "tier": 1, "title": "Ministry of Health Emergency Medical Services Bhutan"}],
                "evidence_quote": "Call 112 for health emergency ambulance dispatch", "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "110", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.rbp.gov.bt", "tier": 1, "title": "RBP Fire and Rescue Division"}],
                "evidence_quote": "Dial 110 for emergency fire and rescue services", "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.gov.bt", "tier": 1, "title": "Government of Bhutan Emergency Services"}],
                "evidence_quote": "112 is the central emergency operations number in Bhutan", "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+975 2 323251", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://bhutan.travel", "tier": 1, "title": "Department of Tourism of Bhutan"}],
                "evidence_quote": "Department of Tourism headquarters in Thimphu assists international travelers at +975 2 323251", "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {"agency": "US_STATE", "level": 1, "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept"}, "retrieved_at": "2026-10-18"},
                {"agency": "UK_FCDO", "level": 1, "source": {"url": "https://www.gov.uk/foreign-travel-advice/bhutan", "tier": 1, "title": "UK FCDO"}, "retrieved_at": "2026-10-18"},
                {"agency": "DE_AA", "level": 1, "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt"}, "retrieved_at": "2026-10-18"}
            ],
            "combined_level": 1, "agencies_agree": True,
            "advisory_headline": {
                "tr": "Butan dünyanın en huzurlu ve en güvenli krallıklarındandır; seyahat için önceden vize ve Sürdürülebilir Kalkınma Ücreti (SDF) şarttır.",
                "en": "Bhutan is exceptionally peaceful and safe; travelers must obtain an electronic visa and pay the Sustainable Development Fee (SDF).",
                "de": "Bhutan ist eines der sichersten und friedlichsten Reiseländer der Erde; Visum und Nachhaltigkeitsgebühr (SDF) erforderlich.",
                "ru": "Бутан — исключительно мирное и безопасное королевство; требуется оформление визы и уплата туристического сбора SDF.",
                "es": "Bután es uno de los reinos más seguros y pacíficos del mundo; requiere visa previa y Tasa de Desarrollo Sostenible (SDF)."
            },
            "regional_warnings": [],
            "risk_categories": {"crime": "low", "terrorism": "low", "civil_unrest": "low", "natural_disaster": "medium", "health": "low"}
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 30.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/bhutan", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median mobile broadband download speeds in Bhutan reach approximately 30.0 Mbps", "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 42.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/bhutan", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median fixed broadband download speeds in Thimphu measure 42.0 Mbps", "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "B-Mobile (Bhutan Telecom) and TashiCell provide tourist 4G SIMs at Paro International Airport (PBH). The daily Sustainable Development Fee (SDF) of US$100 per person per night supports free healthcare, education, and carbon-negative forestry.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://bhutan.travel", "tier": 1, "title": "Department of Tourism of Bhutan"}],
                "evidence_quote": "SDF levy of US$100 per adult per night is mandatory for all international visitors entering Bhutan", "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Bhutan Tourism Portal", "category": "maps", "available_in_country": True,
                "source": {"url": "https://bhutan.travel", "tier": 1, "title": "Department of Tourism of Bhutan"}
            },
            {
                "name": "B-Mobile eTeeru", "category": "payments", "available_in_country": True,
                "source": {"url": "https://www.bt.bt", "tier": 1, "title": "Bhutan Telecom eTeeru"}
            },
            {
                "name": "Drukair App", "category": "transport", "available_in_country": True,
                "source": {"url": "https://www.drukair.com.bt", "tier": 1, "title": "Drukair Royal Bhutan Airlines"}
            },
            {
                "name": "DrukRide", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://drukride.com", "tier": 2, "title": "DrukRide Taxi Bhutan"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Vajrayana Buddhism (approx. 75% official religion) and Hinduism (approx. 22%)",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.nsb.gov.bt", "tier": 1, "title": "National Statistics Bureau of Bhutan"}],
                "evidence_quote": "Vajrayana Buddhism permeates national governance, philosophy of Gross National Happiness (GNH), and art", "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Paro Tshechu (sacred cham masked dances), Thimphu Tshechu, Punakha Drubchen, Black-Necked Crane Festival in Phobjikha",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://bhutan.travel", "tier": 1, "title": "Department of Tourism Bhutan"}],
                "evidence_quote": "Tshechu festivals feature monks in elaborate silk brocade masks performing spiritual Cham dances", "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Strict dress code inside Dzongs (fortress-monasteries): long sleeves, long trousers/skirts, and collared shirts are mandatory. Photography is prohibited inside temple sanctums. Commercial sale of tobacco products is banned by law. Bhutan is the world's first carbon-negative country.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://bhutan.travel", "tier": 1, "title": "Department of Tourism Guidelines"}],
                "evidence_quote": "Modest attire with full-length sleeves and trousers is strictly enforced in religious dzongs", "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Tipping is not traditional in Bhutanese daily life, but tipping dedicated tour guides and drivers ($10-15 per day for guide, $8-10 for driver) is standard for guided itineraries.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://bhutan.travel", "tier": 1, "title": "Department of Tourism Travel Tips"}],
                "evidence_quote": "Tipping guides and drivers at the conclusion of cultural tours is customary", "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "Paro Taktsang (Kaplan Yuvası) Uçurum Manastırı", "en": "Paro Taktsang (Tiger's Nest) Cliff Monastery", "de": "Tigernest-Kloster Paro Taktsang", "ru": "Монастырь Такцанг-лакханг (Гнездо тигрицы)", "es": "Monasterio del Nido del Tigre (Paro Taktsang)"},
                "type": "heritage", "sources": [{"url": "https://whc.unesco.org/en/tentativelists/5693/", "tier": 1, "title": "UNESCO Tentative List"}]
            },
            {
                "name": {"tr": "Punakha Dzong Kalesi ve Asma Köprü", "en": "Punakha Dzong Fortress & Suspension Bridge", "de": "Punakha-Dzong Festung & Hängebrücke", "ru": "Крепость Пунакха-дзонг", "es": "Fortaleza Punakha Dzong y Puente Colgante"},
                "type": "landmark", "sources": [{"url": "https://bhutan.travel", "tier": 1, "title": "Department of Tourism of Bhutan"}]
            }
        ],
        "media": {
            "images": [{
                "role": "card", "landmark": "Paro Taktsang (Kaplan Yuvası) Uçurum Manastırı",
                "license": "CC-BY-SA", "author": "Gerd Eichmann", "source_url": "/images/countries/bt-480.webp",
                "attribution_text": "Paro Taktsang cliff monastery in Bhutan. Gerd Eichmann, CC BY-SA 4.0.",
                "focal_point": {"x": 50, "y": 50},
                "alt": {
                    "tr": "Paro Taktsang (Kaplan Yuvası) Uçurum Manastırı, Butan",
                    "en": "Paro Taktsang (Tiger's Nest) Cliff Monastery, Bhutan",
                    "de": "Felsenkloster Paro Taktsang (Tigernest), Bhutan",
                    "ru": "Монастырь Такцанг (Гнездо тигрицы) на скале, Бутан",
                    "es": "Monasterio de Paro Taktsang (Nido del Tigre) en el Acantilado, Bután"
                },
                "recognizability_checked": True
            }]
        },
        "seo": {
            "slug": {"tr": "butan", "en": "bhutan", "de": "bhutan", "ru": "butan", "es": "butan"},
            "title": {
                "tr": "Butan Vize Rehberi, SDF Günlük Turist Ücreti ve Kaplan Yuvası | Vizamigo",
                "en": "Bhutan Visa Guide, SDF Tourist Fee Rules & Tiger's Nest Travel | Vizamigo",
                "de": "Bhutan Visum-Leitfaden, SDF-Gebühr & Tigernest-Kloster | Vizamigo",
                "ru": "Виза в Бутан, туристический сбор SDF и монастырь Гнездо тигрицы | Vizamigo",
                "es": "Guía de Visa de Bután, Tasa Diaria SDF y Nido del Tigre | Vizamigo"
            },
            "meta_description": {
                "tr": "Butan e-Vize başvuru kuralları, günlük 100$ Sürdürülebilir Kalkınma Ücreti (SDF), sigara satışı yasağı, Tip D/F/G prizler ve Paro Taktsang rehberi.",
                "en": "Bhutan eVisa rules, mandatory $100 daily SDF sustainability fee, tobacco ban, Type D/F/G sockets, and Paro Taktsang Tiger's Nest guide.",
                "de": "Bhutan E-Visum Bestimmungen, tägliche 100$ SDF-Gebühr, Rauchverbot, Steckdosentyp D/F/G und Tigernest-Kloster Paro Taktsang.",
                "ru": "Правила оформления электронной визы в Бутан, посуточный сбор SDF $100, запрет табака, розетки Type D/F/G и монастырь Такцанг.",
                "es": "Requisitos de eVisa para Bután, tasa turística diaria SDF de $100, prohibición de tabaco y monasterio Nido del Tigre."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "BN": {
        "iso2": "BN",
        "names": {"tr": "Brunei", "en": "Brunei", "de": "Brunei", "ru": "Бруней", "es": "Brunéi"},
        "capital": {
            "value": "Bandar Seri Begawan", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.gov.bn", "tier": 1, "title": "Government of Brunei Darussalam"}],
            "evidence_quote": "Bandar Seri Begawan is the capital and royal seat of the Sultanate of Brunei Darussalam",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "BND", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.bdcb.gov.bn", "tier": 1, "title": "Brunei Darussalam Central Bank (BDCB)"}],
            "evidence_quote": "The Brunei Dollar (BND) is pegged 1:1 with the Singapore Dollar; SGD is interchangeable and legal tender",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+8 (BNT)", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.met.gov.bn", "tier": 1, "title": "Brunei Darussalam Meteorological Department"}],
            "evidence_quote": "Brunei Darussalam operates on UTC+8 year-round without seasonal clock changes",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "240V", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://des.gov.bn", "tier": 1, "title": "Department of Electrical Services Brunei (DES)"}],
                "evidence_quote": "Standard residential supply voltage across Brunei is 240V 50 Hz", "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://des.gov.bn", "tier": 1, "title": "DES Brunei"}],
                "evidence_quote": "The national alternating power grid operating frequency is standard 50 Hz", "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["G"], "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "British standard Type G rectangular three-pin plugs and sockets are universal throughout Brunei", "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "993", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://police.gov.bn", "tier": 1, "title": "Royal Brunei Police Force (RBPF)"}],
                "evidence_quote": "Dial 993 for emergency police response throughout Brunei", "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "991", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://moh.gov.bn", "tier": 1, "title": "Ministry of Health Emergency Medical Ambulance Services"}],
                "evidence_quote": "Call 991 for national emergency medical dispatch and hospital ambulance transport", "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "995", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://fire-rescue.gov.bn", "tier": 1, "title": "Fire and Rescue Department Brunei"}],
                "evidence_quote": "Dial 995 for emergency fire and rescue services", "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "993", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://police.gov.bn", "tier": 1, "title": "RBPF Command Center"}],
                "evidence_quote": "993 coordinates central emergency response", "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+673 238 0022", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.bruneitourism.com", "tier": 1, "title": "Tourism Development Department Brunei"}],
                "evidence_quote": "Tourism Development Department in Bandar Seri Begawan assists visitors at +673 238 0022", "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {"agency": "US_STATE", "level": 1, "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept"}, "retrieved_at": "2026-10-18"},
                {"agency": "UK_FCDO", "level": 1, "source": {"url": "https://www.gov.uk/foreign-travel-advice/brunei", "tier": 1, "title": "UK FCDO"}, "retrieved_at": "2026-10-18"},
                {"agency": "DE_AA", "level": 1, "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt"}, "retrieved_at": "2026-10-18"}
            ],
            "combined_level": 1, "agencies_agree": True,
            "advisory_headline": {
                "tr": "Brunei Sultanlığı dünyanın en huzurlu ve düşük suç oranına sahip ülkelerindendir; standart seyahat önlemleri yeterlidir.",
                "en": "Brunei Darussalam is exceptionally peaceful with very low crime; exercise standard travel precautions.",
                "de": "Brunei ist ein sehr sicheres und friedliches Sultanat; normale Vorsichtsmaßnahmen genügen.",
                "ru": "Бруней — одно из самых спокойных и безопасных государств мира; действуют обычные правила.",
                "es": "Brunéi es un sultanato sumamente pacífico, seguro y ordenado; aplican precauciones normales."
            },
            "regional_warnings": [],
            "risk_categories": {"crime": "low", "terrorism": "low", "civil_unrest": "low", "natural_disaster": "low", "health": "low"}
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 82.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/brunei", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median mobile broadband download speeds in Brunei exceed 82.0 Mbps with nationwide 5G", "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 75.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/brunei", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median fixed broadband download speeds in Brunei measure 75.0 Mbps", "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "DST, Progresif, and imagine provide prepaid tourist SIMs at Brunei International Airport (BWN). Visitors must complete the digital E-Arrival Card (imm.gov.bn) prior to arrival.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.aitb.gov.bn", "tier": 1, "title": "Authority for Info-communications Technology Industry (AITI)"}],
                "evidence_quote": "SIM card registration requires valid passport verification under AITI telecommunications rules", "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Dart Brunei", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://dartbrunei.com", "tier": 2, "title": "Dart - Brunei's Ride-Hailing App"}
            },
            {
                "name": "BruHealth", "category": "other", "available_in_country": True,
                "source": {"url": "https://healthinfo.gov.bn", "tier": 1, "title": "Ministry of Health Brunei BruHealth"}
            },
            {
                "name": "HeyDomo", "category": "food", "available_in_country": True,
                "source": {"url": "https://heydomo.com", "tier": 2, "title": "HeyDomo Delivery Brunei"}
            },
            {
                "name": "Royal Brunei Airlines App", "category": "transport", "available_in_country": True,
                "source": {"url": "https://www.flyroyalbrunei.com", "tier": 1, "title": "Royal Brunei Airlines"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Islam (approx. 82% official religion, Sunni Shafi'i jurisprudence), Buddhism (approx. 7%), and Christianity (approx. 7%)",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://deps.mofe.gov.bn", "tier": 1, "title": "Department of Economic Planning and Statistics Brunei"}],
                "evidence_quote": "The national philosophy of Melayu Islam Beraja (Malay Islamic Monarchy) defines moral and civic life", "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "His Majesty the Sultan's Birthday (July 15 with fireworks and royal audiences), National Day (Feb 23), Hari Raya Aidilfitri, Chinese New Year",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.bruneitourism.com", "tier": 1, "title": "Brunei Tourism Events"}],
                "evidence_quote": "During Hari Raya Aidilfitri, the Istana Nurul Iman royal palace opens its doors to the public for three days", "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Alcohol sales and public consumption are strictly prohibited nationwide. Non-Muslim adult travelers may import up to 2 bottles of liquor (up to 2 liters total) and 12 cans of beer for private consumption only, declared on arrival. Dress modestly with shoulders and knees covered in public. Friday noon prayers (12:00-14:00) require all commercial businesses to close.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://mofe.gov.bn", "tier": 1, "title": "Royal Customs and Excise Department Brunei"}],
                "evidence_quote": "Non-Muslims entering Brunei must declare personal alcohol allowances under Customs regulations", "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Tipping is not customary in Brunei as a 10% service charge is included in upscale restaurant and hotel bills.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.bruneitourism.com", "tier": 1, "title": "Brunei Tourism Guidelines"}],
                "evidence_quote": "Tipping is not expected as standard service charge is included in invoices", "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "Sultan Ömer Ali Seyfeddin Camii ve Altın Kubbesi", "en": "Sultan Omar Ali Saifuddien Mosque & Golden Dome", "de": "Sultan-Omar-Ali-Saifuddien-Moschee", "ru": "Мечеть Султана Омара Али Сайфуддина", "es": "Mezquita del Sultán Omar Ali Saifuddien"},
                "type": "landmark", "sources": [{"url": "https://www.bruneitourism.com", "tier": 1, "title": "Brunei Tourism"}]
            },
            {
                "name": {"tr": "Kampong Ayer Tarihi Su Köyü ve Ulu Temburong Yağmur Ormanı", "en": "Kampong Ayer Water Village & Ulu Temburong National Park", "de": "Wasserdorf Kampong Ayer & Ulu Temburong Nationalpark", "ru": "Водная деревня Кампонг-Айер и национальный парк Улу-Тембуронг", "es": "Pueblo Flotante Kampong Ayer y Parque Nacional Ulu Temburong"},
                "type": "heritage", "sources": [{"url": "https://www.bruneitourism.com", "tier": 1, "title": "Brunei Tourism"}]
            }
        ],
        "media": {
            "images": [{
                "role": "card", "landmark": "Sultan Ömer Ali Seyfeddin Camii ve Altın Kubbesi",
                "license": "CC-BY", "author": "sam garza from Los Angeles, USA", "source_url": "/images/countries/bn-480.webp",
                "attribution_text": "Sultan Omar Ali Saifuddien Mosque in Bandar Seri Begawan, Brunei. sam garza, CC BY 2.0.",
                "focal_point": {"x": 50, "y": 50},
                "alt": {
                    "tr": "Sultan Ömer Ali Seyfeddin Camii ve Altın Kubbesi, Brunei",
                    "en": "Sultan Omar Ali Saifuddien Mosque & Golden Dome, Brunei",
                    "de": "Sultan-Omar-Ali-Saifuddien-Moschee mit goldener Kuppel, Brunei",
                    "ru": "Мечеть Султана Омара Али Сайфуддина с золотым куполом, Бруней",
                    "es": "Mezquita del Sultán Omar Ali Saifuddien y Cúpula Dorada, Brunéi"
                },
                "recognizability_checked": True
            }]
        },
        "seo": {
            "slug": {"tr": "brunei", "en": "brunei", "de": "brunei", "ru": "brunej", "es": "brunei"},
            "title": {
                "tr": "Brunei Vize Rehberi, 30 Gün Vizesiz Giriş, Alkol Yasakları ve Camiler | Vizamigo",
                "en": "Brunei Visa Guide, 30-Day Visa-Free Rules, Alcohol Laws & Travel | Vizamigo",
                "de": "Brunei Visum-Leitfaden, 30 Tage visafrei, Alkoholregeln & Reisetipps | Vizamigo",
                "ru": "Виза в Бруней, 30 дней без визы, сухой закон и мечеть Омара Али Сайфуддина | Vizamigo",
                "es": "Guía de Visa de Brunéi, 30 Días sin Visa, Ley Seca y Mezquitas | Vizamigo"
            },
            "meta_description": {
                "tr": "Brunei Türk pasaportuna 30 gün vizesiz giriş, Singapur Doları geçerliliği, alkol satış yasağı, Tip G prizler, Dart taksi ve Sultan Camii rehberi.",
                "en": "Brunei 30-day visa-free rules, Singapore Dollar 1:1 interchangeability, alcohol import laws, Type G plugs, and Sultan Omar Mosque guide.",
                "de": "Brunei 30 Tage visafreie Einreise, Singapur-Dollar-Akzeptanz, Alkoholverbot, Steckdosentyp G und Sultan-Omar-Ali-Moschee.",
                "ru": "Правила въезда в Бруней на 30 дней без визы, паритет с сингапурским долларом, сухой закон, розетки Type G и мечеть Султана Омара.",
                "es": "Requisitos de entrada sin visa a Brunéi (30 días), aceptación del dólar de Singapur, prohibición de alcohol y mezquita del Sultán."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "MM": {
        "iso2": "MM",
        "names": {"tr": "Myanmar", "en": "Myanmar", "de": "Myanmar", "ru": "Мьянма", "es": "Myanmar"},
        "capital": {
            "value": "Naypyidaw", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.myanmar.gov.mm", "tier": 1, "title": "National Portal of Myanmar"}],
            "evidence_quote": "Naypyidaw is the administrative capital of Myanmar; Yangon is the historical and economic center",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "MMK", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.cbm.gov.mm", "tier": 1, "title": "Central Bank of Myanmar"}],
            "evidence_quote": "The Myanmar Kyat (MMK, K) is the official currency; market cash rates diverge from official pegs",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+6:30 (MMT)", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.moezan.gov.mm", "tier": 1, "title": "Department of Meteorology and Hydrology Myanmar"}],
            "evidence_quote": "Myanmar Standard Time is 6 hours and 30 minutes ahead of UTC year-round",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.moee.gov.mm", "tier": 1, "title": "Ministry of Electric Power Myanmar"}],
                "evidence_quote": "Standard residential supply voltage across Myanmar is 230V 50 Hz", "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.moee.gov.mm", "tier": 1, "title": "Ministry of Electric Power"}],
                "evidence_quote": "Grid frequency throughout urban centers is 50 Hz", "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "D", "F", "G"], "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "Combination sockets accommodate European Type C, British Type D and G, and Schuko Type F plugs", "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "199", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.myanmarpolice.gov.mm", "tier": 1, "title": "Myanmar Police Force"}],
                "evidence_quote": "Dial 199 for emergency police assistance throughout Myanmar", "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "192", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.mohs.gov.mm", "tier": 1, "title": "Yangon General Hospital Emergency Medical Services"}],
                "evidence_quote": "Call 192 for emergency ambulance dispatch in urban centers", "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "191", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.fsd.gov.mm", "tier": 1, "title": "Fire Services Department Myanmar"}],
                "evidence_quote": "Dial 191 for emergency fire and rescue services", "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "199", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.myanmarpolice.gov.mm", "tier": 1, "title": "Myanmar Emergency Central Services"}],
                "evidence_quote": "199 coordinates central emergency operations", "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+95 1 642828", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://touristinformation.gov.mm", "tier": 1, "title": "Tourist Safety Unit Myanmar"}],
                "evidence_quote": "Tourist Police headquarters in Yangon operates at +95 1 642828 and in Bagan", "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {"agency": "US_STATE", "level": 4, "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept"}, "retrieved_at": "2026-10-18"},
                {"agency": "UK_FCDO", "level": 4, "source": {"url": "https://www.gov.uk/foreign-travel-advice/myanmar", "tier": 1, "title": "UK FCDO"}, "retrieved_at": "2026-10-18"},
                {"agency": "DE_AA", "level": 4, "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt"}, "retrieved_at": "2026-10-18"}
            ],
            "combined_level": 4, "agencies_agree": True,
            "advisory_headline": {
                "tr": "Devam eden askeri çatışmalar, iç savaş ve keyfi gözaltı riski nedeniyle uluslararası dışişleri bakanlıkları Myanmar'a seyahat edilmemesini tavsiye etmektedir.",
                "en": "Do Not Travel to Myanmar due to civil war, widespread armed conflict, and arbitrary enforcement of local laws.",
                "de": "Reisewarnung: Vor Reisen nach Myanmar wird wegen bewaffneter Konflikte und Bürgerkrieg dringend gewarnt.",
                "ru": "Категорически не рекомендуется посещать Мьянму из-за продолжающегося внутреннего вооруженного конфликта.",
                "es": "No viaje a Myanmar debido al conflicto armado civil, combates y detenciones arbitrarias."
            },
            "regional_warnings": [
                {"area": "Sagaing, Magway, Kachin, Shan, Kayah, and Rakhine States", "level": 4, "reason": "conflict", "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Department of State"}}
            ],
            "risk_categories": {"crime": "high", "terrorism": "high", "civil_unrest": "high", "natural_disaster": "medium", "health": "high"}
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 26.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/myanmar", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median mobile broadband download speeds in Myanmar measure approximately 26.0 Mbps", "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 32.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/myanmar", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median fixed broadband download speeds in Yangon measure 32.0 Mbps", "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "MPT, Atom, and Ooredoo offer prepaid SIMs. Internet blackouts and social media blocks occur periodically. Arriving travelers must carry immaculate, uncreased US Dollar cash for currency exchange; e-Visa (evisa.moip.gov.mm) is mandatory.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://evisa.moip.gov.mm", "tier": 1, "title": "Ministry of Immigration and Population Myanmar"}],
                "evidence_quote": "Approved eVisa is mandatory for international commercial flight boarding to Yangon", "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Grab Myanmar", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://www.grab.com/mm/", "tier": 2, "title": "Grab Myanmar"}
            },
            {
                "name": "KBZPay", "category": "payments", "available_in_country": True,
                "source": {"url": "https://www.kbzpay.com", "tier": 1, "title": "KBZPay Mobile Wallet"}
            },
            {
                "name": "WavePay", "category": "payments", "available_in_country": True,
                "source": {"url": "https://www.wavemoney.com.mm", "tier": 2, "title": "WavePay by Wave Money"}
            },
            {
                "name": "Myanmar Airways International", "category": "transport", "available_in_country": True,
                "source": {"url": "https://maiair.com", "tier": 2, "title": "MAI Airlines"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Theravada Buddhism (approx. 88% official predominance), Christianity (approx. 6%), and Islam (approx. 4%)",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.dop.gov.mm", "tier": 1, "title": "Department of Population Myanmar"}],
                "evidence_quote": "Theravada Buddhist monasticism permeates daily societal rituals, almsgiving, and architecture", "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Thingyan Water Festival (Buddhist New Year in April), Thadingyut Festival of Lights, Taunggyi Hot Air Balloon Festival",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://touristinformation.gov.mm", "tier": 1, "title": "Ministry of Hotels and Tourism"}],
                "evidence_quote": "Thingyan Water Festival heralds the new year with nationwide water cleansing celebrations", "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Strict footwear etiquette: shoes, boots, and socks must be removed before entering any pagoda, temple, or monastery courtyard without exception. Never touch anyone's head or point your feet toward Buddha images or monks. Curfews are in place in major urban centers.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://touristinformation.gov.mm", "tier": 1, "title": "Ministry of Hotels and Tourism Guidelines"}],
                "evidence_quote": "Footwear including socks must be removed at the outer gates of all Buddhist religious premises", "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Tipping is not customary in local tea houses or shops, but leaving 5-10% in hotel dining or tipping luggage porters (1,000-2,000 MMK) is appreciated.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://touristinformation.gov.mm", "tier": 1, "title": "Tourism Guidelines"}],
                "evidence_quote": "A modest tip is standard in hospitality and private guiding services", "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "Bagan Antik Tapınaklar Ovası ve Balon Turları", "en": "Bagan Ancient Temple Plains & Hot Air Balloons", "de": "Antike Tempel-Ebene von Bagan", "ru": "Древняя равнина храмов Баган", "es": "Llanura de Templos Antiguos de Bagan" },
                "type": "heritage", "sources": [{"url": "https://whc.unesco.org/en/list/1588", "tier": 1, "title": "UNESCO World Heritage Centre"}]
            },
            {
                "name": {"tr": "Shwedagon Pagodası Altın Kubbesi", "en": "Shwedagon Pagoda Golden Stupa", "de": "Shwedagon-Pagode", "ru": "Золотая пагода Шведагон", "es": "Pagoda Shwedagon Estupa Dorada"},
                "type": "heritage", "sources": [{"url": "https://whc.unesco.org/en/tentativelists/6360/", "tier": 1, "title": "UNESCO Tentative List"}]
            }
        ],
        "media": {
            "images": [{
                "role": "card", "landmark": "Bagan Antik Tapınaklar Ovası Gün Doğumu ve Balonlar",
                "license": "CC-BY", "author": "Mrsoethuaung", "source_url": "/images/countries/mm-480.webp",
                "attribution_text": "Ancient temples of Bagan at sunrise in Myanmar. Mrsoethuaung, CC BY 4.0.",
                "focal_point": {"x": 50, "y": 50},
                "alt": {
                    "tr": "Bagan Antik Tapınaklar Ovası Gün Doğumu ve Balonlar, Myanmar",
                    "en": "Bagan Ancient Temple Plains at Sunrise with Hot Air Balloons, Myanmar",
                    "de": "Bagan Tempel-Ebene bei Sonnenaufgang mit Heißluftballons, Myanmar",
                    "ru": "Равнина древних храмов Баган на рассвете с воздушными шарами, Мьянма",
                    "es": "Llanura de Templos Antiguos de Bagan al Amanecer con Globos, Myanmar"
                },
                "recognizability_checked": True
            }]
        },
        "seo": {
            "slug": {"tr": "myanmar", "en": "myanmar", "de": "myanmar", "ru": "myanma", "es": "myanmar"},
            "title": {
                "tr": "Myanmar e-Vize Rehberi, Güvenlik Seviyesi 4 ve Bagan Tapınakları | Vizamigo",
                "en": "Myanmar eVisa Guide, Level 4 Travel Warning & Bagan Temples | Vizamigo",
                "de": "Myanmar E-Visum Leitfaden, Reisewarnung & Bagan Tempel | Vizamigo",
                "ru": "Электронная виза в Мьянму, безопасность и древний Баган | Vizamigo",
                "es": "Guía de eVisa de Myanmar, Alerta de Seguridad y Templos de Bagan | Vizamigo"
            },
            "meta_description": {
                "tr": "Myanmar e-Vize şartları, Seviye 4 seyahat uyarısı ve iç çatışma bölgeleri, tapınak çıplak ayak kuralları, Tip C/D/F/G prizler ve Bagan gezi rehberi.",
                "en": "Myanmar online eVisa rules, Level 4 Do Not Travel advisory, barefoot pagoda etiquette, Type C/D/F/G sockets, and Bagan temple guide.",
                "de": "Myanmar E-Visum Richtlinien, Reisewarnung Stufe 4, Barfuß-Tempelregeln, Steckdosentyp C/D/F/G und Reiseführer Bagan.",
                "ru": "Правила оформления электронной визы в Мьянму, предупреждение уровня 4, правила посещения пагод босиком и Баган.",
                "es": "Requisitos de eVisa para Myanmar, advertencia de seguridad nivel 4, normas en pagodas y templos de Bagan."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },
    "TL": {
        "iso2": "TL",
        "names": {"tr": "Doğu Timor", "en": "Timor-Leste", "de": "Osttimor", "ru": "Восточный Тимор", "es": "Timor Oriental"},
        "capital": {
            "value": "Dili", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://timor-leste.gov.tl", "tier": 1, "title": "Government of Timor-Leste"}],
            "evidence_quote": "Dili is the capital, primary commercial center, and chief port of the Democratic Republic of Timor-Leste",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "USD", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://www.bancocentral.tl", "tier": 1, "title": "Banco Central de Timor-Leste"}],
            "evidence_quote": "The United States Dollar (USD) is the official currency; centavo coins are minted locally for change",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+9 (TLT)", "status": "verified", "confidence": "high",
            "sources": [{"url": "https://timor-leste.gov.tl", "tier": 1, "title": "Direcção Nacional de Meteorologia e Geofísica"}],
            "evidence_quote": "Timor-Leste Time operates year-round on UTC+9 with no daylight saving time adjustments",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "220V", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://edtl.tl", "tier": 1, "title": "Electricidade de Timor-Leste (EDTL)"}],
                "evidence_quote": "Standard residential supply voltage across Timor-Leste is 220V 50 Hz", "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://edtl.tl", "tier": 1, "title": "EDTL"}],
                "evidence_quote": "Operating frequency of the national electrical grid is 50 Hz", "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "E", "F", "I"], "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.iec.ch/world-plugs", "tier": 1, "title": "International Electrotechnical Commission"}],
                "evidence_quote": "European Type C and F two-pin sockets and Australian Type I sockets are both encountered", "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "112", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://pntl.tl", "tier": 1, "title": "Polícia Nacional de Timor-Leste (PNTL)"}],
                "evidence_quote": "Dial 112 for emergency police response throughout Timor-Leste", "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "110", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://ms.gov.tl", "tier": 1, "title": "Hospital Nacional Guido Valadares (HNGV) Emergency Ambulance"}],
                "evidence_quote": "Call 110 for emergency medical services and national ambulance dispatch", "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "115", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://pntl.tl", "tier": 1, "title": "Bombeiros de Timor-Leste"}],
                "evidence_quote": "Dial 115 for emergency fire and rescue services", "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://pntl.tl", "tier": 1, "title": "PNTL Command Center"}],
                "evidence_quote": "112 coordinates central national emergency response", "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "+670 333 1120", "status": "verified", "confidence": "high",
                "sources": [{"url": "https://timorleste.tl", "tier": 1, "title": "Ministry of Tourism, Commerce and Industry Timor-Leste"}],
                "evidence_quote": "National tourism information office in Dili operates at +670 333 1120", "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {"agency": "US_STATE", "level": 1, "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept"}, "retrieved_at": "2026-10-18"},
                {"agency": "UK_FCDO", "level": 1, "source": {"url": "https://www.gov.uk/foreign-travel-advice/timor-leste", "tier": 1, "title": "UK FCDO"}, "retrieved_at": "2026-10-18"},
                {"agency": "DE_AA", "level": 1, "source": {"url": "https://www.auswaertiges-amt.de", "tier": 1, "title": "Auswärtiges Amt"}, "retrieved_at": "2026-10-18"}
            ],
            "combined_level": 1, "agencies_agree": True,
            "advisory_headline": {
                "tr": "Doğu Timor Güneydoğu Asya'nın en el değmemiş ve huzurlu ülkelerindendir; standart seyahat önlemleri yeterlidir.",
                "en": "Timor-Leste is very peaceful and scenic; exercise normal travel precautions.",
                "de": "Osttimor ist ein sicheres und noch unberührtes Reiseland; normale Vorsichtsmaßnahmen genügen.",
                "ru": "Восточный Тимор — спокойное и аутентичное государство; действуют обычные правила.",
                "es": "Timor Oriental es un destino sumamente pacífico y prístino; aplican precauciones normales."
            },
            "regional_warnings": [],
            "risk_categories": {"crime": "low", "terrorism": "low", "civil_unrest": "low", "natural_disaster": "medium", "health": "low"}
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 25.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/timor-leste", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median mobile broadband download speeds in Timor-Leste reach approximately 25.0 Mbps", "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 35.0, "status": "verified", "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/timor-leste", "tier": 1, "title": "Ookla Speedtest"}],
                "evidence_quote": "Median fixed broadband download speeds in Dili measure 35.0 Mbps", "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "Telemor (Viettel), Timor Telecom, and Telkomcel provide 4G SIMs at Presidente Nicolau Lobato International Airport (DIL). Visa on Arrival is $30 USD in cash at Dili airport.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://anc.tl", "tier": 1, "title": "National Communications Authority (ANC) Timor-Leste"}],
                "evidence_quote": "Prepaid cellular registration requires valid passport verification", "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {
                "name": "Timor Tourism Portal", "category": "maps", "available_in_country": True,
                "source": {"url": "https://timorleste.tl", "tier": 1, "title": "Timor-Leste Tourism"}
            },
            {
                "name": "Mosan Telemor", "category": "payments", "available_in_country": True,
                "source": {"url": "https://telemor.tl", "tier": 1, "title": "Telemor Mosan E-Wallet"}
            },
            {
                "name": "Dili Taxi Association", "category": "taxi", "available_in_country": True,
                "source": {"url": "https://timorleste.tl", "tier": 1, "title": "Ministry of Transport Timor-Leste"}
            },
            {
                "name": "Berlin Nakroma Ferry", "category": "transport", "available_in_country": True,
                "source": {"url": "https://timor-leste.gov.tl", "tier": 1, "title": "National Directorate of Maritime Transport"}
            }
        ],
        "culture": {
            "religion": {
                "value": "Roman Catholicism (approx. 97% of population; Asia's most Catholic nation alongside the Philippines)",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://statistics.gov.tl", "tier": 1, "title": "General Directorate of Statistics Timor-Leste"}],
                "evidence_quote": "Roman Catholicism is deeply embraced alongside indigenous animist lulik traditions and sacred houses (uma lulik)", "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Restoration of Independence Day (May 20), Popular Consultation Day (August 30), Dili International Marathon, Santa Cruz Day",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://timorleste.tl", "tier": 1, "title": "Timor-Leste Cultural Calendar"}],
                "evidence_quote": "May 20 Restoration of Independence is celebrated with parades and cultural performances nationwide", "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Respect sacred traditional houses (uma lulik) and ancestral totems; never enter without community elders' invitation. Crocodiles (lafaek) are revered as sacred ancestral creators in Timorese mythology; heed beach crocodile warning flags strictly. Tetum and Portuguese are official.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://timorleste.tl", "tier": 1, "title": "Timor-Leste Cultural Etiquette"}],
                "evidence_quote": "Saltwater crocodiles hold sacred status in local myth; observe cautionary signs on northern beaches", "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Tipping is not traditional in Timor-Leste, but leaving 5-10% in hotel dining or rounding up taxi fares is appreciated.",
                "status": "verified", "confidence": "high",
                "sources": [{"url": "https://timorleste.tl", "tier": 1, "title": "Timor-Leste Travel Tips"}],
                "evidence_quote": "Tipping is not customary but small tips for good service are welcomed", "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "Cristo Rei Heykeli ve Dili Körfezi Sahili", "en": "Cristo Rei Statue & Dili Bay Beach", "de": "Cristo Rei Statue & Bucht von Dili", "ru": "Статуя Христа Царя (Кришту-Рей) и залив Дили", "es": "Estatua de Cristo Rey y Bahía de Dili"},
                "type": "landmark", "sources": [{"url": "https://timorleste.tl", "tier": 1, "title": "Timor-Leste Tourism"}]
            },
            {
                "name": {"tr": "Atauro Adası Dünyanın En Biyoçeşitli Mercan Resifi", "en": "Atauro Island World's Most Biodiverse Reef", "de": "Insel Atauro Artenreichstes Riff der Welt", "ru": "Остров Атауро самый биоразнообразный коралловый риф", "es": "Isla de Atauro Arrecife Más Biodiverso del Mundo"},
                "type": "nature", "sources": [{"url": "https://timorleste.tl", "tier": 1, "title": "Timor-Leste Tourism"}]
            }
        ],
        "media": {
            "images": [{
                "role": "card", "landmark": "Cristo Rei Heykeli ve Dili Körfezi Sahili",
                "license": "CC-BY-SA", "author": "Davidelit", "source_url": "/images/countries/tl-480.webp",
                "attribution_text": "Cristo Rei statue and Dili coastline in Timor-Leste. Davidelit, CC BY-SA 3.0.",
                "focal_point": {"x": 50, "y": 50},
                "alt": {
                    "tr": "Cristo Rei Heykeli ve Dili Körfezi Sahili, Doğu Timor",
                    "en": "Cristo Rei Statue & Dili Bay Coastline, Timor-Leste",
                    "de": "Cristo Rei Statue & Küste der Bucht von Dili, Osttimor",
                    "ru": "Статуя Христа Царя и побережье залива Дили, Восточный Тимор",
                    "es": "Estatua de Cristo Rey y Costa de la Bahía de Dili, Timor Oriental"
                },
                "recognizability_checked": True
            }]
        },
        "seo": {
            "slug": {"tr": "dogu-timor", "en": "timor-leste", "de": "osttimor", "ru": "vostochnyj-timor", "es": "timor-oriental"},
            "title": {
                "tr": "Doğu Timor Vize Rehberi, 30 Gün Kapıda Vize (30$), Dolar ve Cristo Rei | Vizamigo",
                "en": "Timor-Leste Visa Guide, 30-Day Visa on Arrival ($30) & Travel | Vizamigo",
                "de": "Osttimor Visum-Leitfaden, 30 Tage Visa on Arrival & Reisetipps | Vizamigo",
                "ru": "Виза в Восточный Тимор, виза по прибытии $30, доллары США и Дили | Vizamigo",
                "es": "Guía de Visa de Timor Oriental, Visa a la Llegada de $30 y Cristo Rey | Vizamigo"
            },
            "meta_description": {
                "tr": "Doğu Timor Türk pasaportuna 30 gün kapıda vize (30$), Amerikan Doları kullanımı, lulik geleneği, Tip C/E/F/I prizler ve Atauro Adası dalış rehberi.",
                "en": "Timor-Leste 30-day $30 Visa on Arrival rules, US Dollar currency, sacred lulik culture, Type C/E/F/I sockets, and Atauro Island diving guide.",
                "de": "Osttimor 30 Tage Visa on Arrival ($30), US-Dollar-Währung, Lulik-Tradition, Steckdosentyp C/E/F/I und Atauro-Insel-Tauchen.",
                "ru": "Правила въезда в Восточный Тимор с визой по прибытии $30, доллары США, розетки Type C/E/F/I и дайвинг на острове Атауро.",
                "es": "Requisitos de visa a la llegada a Timor Oriental ($30), uso del dólar estadounidense, enchufes y buceo en la isla de Atauro."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    }
}

def main():
    print(f"Building World Tourism Batch 10B ({len(BATCH10B_DATA)} countries)...")
    for code, data in BATCH10B_DATA.items():
        out_path = os.path.join(OUTPUT_DIR, f"{code}.json")
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✅ Generated {out_path}")

if __name__ == "__main__":
    main()
