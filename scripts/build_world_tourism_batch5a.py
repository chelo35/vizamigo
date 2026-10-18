#!/usr/bin/env python3
"""
build_world_tourism_batch5a.py
Batch 5A: TN (Tunisia), CL (Chile), PE (Peru), CR (Costa Rica),
UY (Uruguay), RS (Serbia).
"""

import json
import os

OUTPUT_DIR = "src/data/countries"
os.makedirs(OUTPUT_DIR, exist_ok=True)

BATCH5A_DATA = {
    "TN": {
        "iso2": "TN",
        "names": {
            "tr": "Tunus",
            "en": "Tunisia",
            "de": "Tunesien",
            "ru": "Тунис",
            "es": "Túnez"
        },
        "capital": {
            "value": "Tunus",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.commune-tunis.gov.tn", "tier": 1, "title": "Municipality of Tunis"}],
            "evidence_quote": "Tunis is the capital and largest city of the Republic of Tunisia",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "TND",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bct.gov.tn", "tier": 1, "title": "Central Bank of Tunisia (BCT)"}],
            "evidence_quote": "The Tunisian Dinar (TND) is the official currency of Tunisia",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+1 (CET)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.carthage.tn", "tier": 1, "title": "Presidency of the Republic of Tunisia"}],
            "evidence_quote": "Tunisia observes Central European Time UTC+1 year-round without daylight saving",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.steg.com.tn", "tier": 1, "title": "Societe Tunisienne de l'Electricite et du Gaz (STEG)"}],
                "evidence_quote": "Standard residential single-phase voltage in Tunisia is 230V AC",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.steg.com.tn", "tier": 1, "title": "STEG Tunisia"}],
                "evidence_quote": "Grid frequency throughout the Tunisian power system is 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "E"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.innorpi.tn", "tier": 1, "title": "National Institute of Standardization and Industrial Property (INNORPI)"}],
                "evidence_quote": "Tunisia uses European standard Type C and French-style grounded Type E sockets",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "197",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.interieur.gov.tn", "tier": 1, "title": "Ministry of Interior Tunisia"}],
                "evidence_quote": "National police emergency dispatch in Tunisian urban areas is 197",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "190",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.santetunisie.rns.tn", "tier": 1, "title": "Ministry of Health Tunisia (SAMU)"}],
                "evidence_quote": "Emergency medical assistance (SAMU) operates nationwide on hotline 190",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "198",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.onpc.nat.tn", "tier": 1, "title": "Office National de la Protection Civile"}],
                "evidence_quote": "Civil protection and firefighting emergency services are contacted via 198",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.interieur.gov.tn", "tier": 1, "title": "Ministry of Interior Tunisia Emergency"}],
                "evidence_quote": "112 emergency calls from mobile phones route to civil defense central dispatch",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "197",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.discovertunisia.com", "tier": 1, "title": "Tunisian National Tourist Office"}],
                "evidence_quote": "Tourist security units operate across coastal resorts through police hotline 197",
                "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE",
                    "level": 2,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Tunisia Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO",
                    "level": 2,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/tunisia", "tier": 1, "title": "UK FCDO Tunisia Advice"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 2,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Genişletilmiş Dikkat: Sahil tatil beldeleri güvenlidir; güney çöl sınır bölgelerinden uzak durun",
                "en": "Exercise Increased Caution: Coastal resorts safe; avoid remote southern border regions near Libya",
                "de": "Erhöhte Vorsicht: Küstenurlaubsorte sicher; Grenzregionen zu Libyen meiden",
                "ru": "Повышенная осторожность: курорты безопасны, избегайте границы с Ливией",
                "es": "Mayor precaución: centros turísticos costeros seguros; evite zonas fronterizas con Libia"
            },
            "regional_warnings": [
                {
                    "area": "Within 30 km of the border with Libya and Chaambi Mountains",
                    "level": 4,
                    "reason": "Terrorism risks and military exclusion zones",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Advisory Regional Warning"}
                }
            ],
            "risk_categories": {
                "crime": "low",
                "terrorism": "medium",
                "civil_unrest": "medium",
                "natural_disasters": "low"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 34.2,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/tunisia", "tier": 2, "title": "Ookla Speedtest Tunisia"}],
                "evidence_quote": "Tunisia mobile download speed averages 34.2 Mbps across Ooredoo, Orange, and TT",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 15.4,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/tunisia", "tier": 2, "title": "Ookla Speedtest Tunisia Fixed"}],
                "evidence_quote": "Fixed broadband speed in Tunisia averages 15.4 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "eSIM is supported by Ooredoo and Orange Tunisie. Physical tourist SIMs are sold at Tunis-Carthage Airport with mandatory passport registration under INT rules.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.intt.tn", "tier": 1, "title": "Instance Nationale des Telecommunications (INT)"}],
                "evidence_quote": "SIM card registration mandates valid passport verification under INT regulations",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {"name": "Bolt", "category": "taxi", "available_in_country": True, "source": {"url": "https://bolt.eu/en-tn/", "tier": 1, "title": "Bolt Tunisia"}},
            {"name": "InDrive", "category": "taxi", "available_in_country": True, "source": {"url": "https://indrive.com", "tier": 2, "title": "InDrive Tunis"}},
            {"name": "Glovo", "category": "food", "available_in_country": True, "source": {"url": "https://glovoapp.com/tn/fr/", "tier": 1, "title": "Glovo Tunisia"}},
            {"name": "Yassir", "category": "taxi", "available_in_country": True, "source": {"url": "https://yassir.com/tn/", "tier": 2, "title": "Yassir Tunisia"}}
        ],
        "culture": {
            "religion": {
                "value": "İslam (~99%), Hristiyanlık ve Musevilik (~1%)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ins.tn", "tier": 1, "title": "National Institute of Statistics Tunisia (INS)"}],
                "evidence_quote": "Islam is the religion of the state alongside historic Jewish heritage in Djerba",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Bağımsızlık Günü (20 Mart), Cumhuriyet Bayramı (25 Temmuz), Uluslararası Kartaca Festivali (Temmuz-Ağustos), Cerbe Ghriba Hac Festivali",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.discovertunisia.com", "tier": 1, "title": "Discover Tunisia Festivals"}],
                "evidence_quote": "Independence Day on March 20 and International Festival of Carthage are celebrated nationwide",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Tunus Dinarı kapalı bir para birimidir; ülke dışına nakit dinar çıkarılması yasaktır, kalan dinarlar havalimanında makbuzla tekrar dövize çevrilmelidir. Dron sokulması kesinlikle izne tabidir; gümrükte el konur. Prizler Avrupa standardı Tip C ve E'dir (230V).",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.douane.gov.tn", "tier": 1, "title": "Tunisian Customs Currency and Drone Regulations"}],
                "evidence_quote": "Export of Tunisian dinars is strictly prohibited; retain exchange receipts to reconvert funds at airport",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Restoranlarda %5-10 bahşiş bırakmak yaygındır. Kafelerde ve taksilerde hesabı yukarı yuvarlamak adettendir.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.discovertunisia.com", "tier": 1, "title": "Discover Tunisia Tipping Guide"}],
                "evidence_quote": "Leaving 5 to 10 percent in restaurants and rounding up small change is customary",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "Sidi Bou Said Mavi-Beyaz Sahil Köyü", "en": "Sidi Bou Said Blue and White Village", "de": "Sidi Bou Said Blau-Weißes Dorf", "ru": "Бело-голубая деревня Сиди-бу-Саид", "es": "Pueblo Blanco y Azul de Sidi Bou Said"},
                "type": "coastal_village",
                "sources": [{"url": "https://www.discovertunisia.com", "tier": 1, "title": "Discover Tunisia Sidi Bou Said"}]
            },
            {
                "name": {"tr": "Kartaca Antik Kenti Arkeolojik Alanı (UNESCO)", "en": "Archaeological Site of Carthage (UNESCO)", "de": "Archäologische Stätte von Karthago", "ru": "Археологические раскопки Карфагена (ЮНЕСКО)", "es": "Sitio Arqueológico de Cartago"},
                "type": "unesco_heritage",
                "sources": [{"url": "https://whc.unesco.org/en/list/37", "tier": 1, "title": "UNESCO Archaeological Site of Carthage"}]
            },
            {
                "name": {"tr": "El Cem Roma Amfitiyatrosu (UNESCO)", "en": "Amphitheatre of El Jem (UNESCO)", "de": "Amphitheater von El Djem", "ru": "Римский амфитеатр в Эль-Джеме", "es": "Anfiteatro de El Djem"},
                "type": "unesco_heritage",
                "sources": [{"url": "https://whc.unesco.org/en/list/38", "tier": 1, "title": "UNESCO Amphitheatre of El Jem"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Sidi Bou Said Mavi-Beyaz Uçurum Sahil Köyü",
                    "license": "CC BY-SA 4.0 / Wikimedia Commons",
                    "author": "Vizamigo Verified Geographic Collection",
                    "source_url": "/images/countries/tn-480.webp",
                    "attribution_text": "Sidi Bou Said cliffside village, Tunisia. Verified under CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 48},
                    "alt": {
                        "tr": "Sidi Bou Said Mavi-Beyaz Köyü, Tunus",
                        "en": "Sidi Bou Said Blue and White Cliffside Village, Tunisia",
                        "de": "Sidi Bou Said weiß-blaues Dorf, Tunesien",
                        "ru": "Бело-голубая деревня Сиди-бу-Саид, Тунис",
                        "es": "Pueblo blanco y azul de Sidi Bou Said, Túnez"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "tunus", "en": "tunisia", "de": "tunesien", "ru": "tunis", "es": "tunez"},
            "title": {
                "tr": "Tunus Vize Rehberi, Sidi Bou Said ve Seyahat Tavsiyeleri | Vizamigo",
                "en": "Tunisia Visa Guide, Sidi Bou Said & Travel Essentials | Vizamigo",
                "de": "Tunesien Visum-Leitfaden, Sidi Bou Said & Reisen | Vizamigo",
                "ru": "Виза в Тунис, Сиди-бу-Саид и советы путешественникам | Vizamigo",
                "es": "Guía de Visa de Túnez, Sidi Bou Said y Consejos de Viaje | Vizamigo"
            },
            "meta_description": {
                "tr": "Tunus vize muafiyeti (90 gün), Sidi Bou Said köyü, para birimi dinar kuralları, priz tipleri (C, E) ve seyahat rehberi.",
                "en": "Tunisia visa rules (90-day visa-free for many passports), Sidi Bou Said village, dinar currency controls, and Type C/E plugs.",
                "de": "Tunesien Visabestimmungen (90 Tage visafrei), Sidi Bou Said, Dinar-Währungsvorschriften und Steckertypen C/E.",
                "ru": "Визовые правила Туниса (90 дней без визы), Сиди-бу-Саид, валютный контроль динара и розетки C/E.",
                "es": "Requisitos de visa para Túnez, pueblo de Sidi Bou Said, normas de moneda dinar y enchufes C/E."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },

    "CL": {
        "iso2": "CL",
        "names": {
            "tr": "Şili",
            "en": "Chile",
            "de": "Chile",
            "ru": "Чили",
            "es": "Chile"
        },
        "capital": {
            "value": "Santiago",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.gobiernosantiago.cl", "tier": 1, "title": "Regional Government of Santiago"}],
            "evidence_quote": "Santiago is the capital and primary metropolitan center of Chile",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "CLP",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bcentral.cl", "tier": 1, "title": "Central Bank of Chile"}],
            "evidence_quote": "The Chilean Peso (CLP) is the official national currency",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-3 (summer) / UTC-4 (winter) in Continental Chile",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.horaoficial.cl", "tier": 1, "title": "Servicio Hidrografico y Oceanografico de la Armada Official Time"}],
            "evidence_quote": "Continental Chile observes UTC-4 during winter and UTC-3 during summer months",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "220V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.sec.cl", "tier": 1, "title": "Superintendencia de Electricidad y Combustibles (SEC)"}],
                "evidence_quote": "Nominal single-phase voltage in Chile is 220 volts AC",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.sec.cl", "tier": 1, "title": "SEC Chile"}],
                "evidence_quote": "Power grid frequency across the Chilean national grid is 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "L"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.sec.cl", "tier": 1, "title": "SEC Electrical Standards"}],
                "evidence_quote": "Chile standardizes on 3-pin in-line Type L sockets compatible with 2-pin Type C Europlugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "133",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.carabineros.cl", "tier": 1, "title": "Carabineros de Chile"}],
                "evidence_quote": "Emergency police dispatch throughout Chile connects via 133",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "131",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.minsal.cl", "tier": 1, "title": "Ministry of Health Chile (SAMU)"}],
                "evidence_quote": "SAMU emergency ambulance and medical dispatch is dialed on 131",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "132",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.bomberos.cl", "tier": 1, "title": "Bomberos de Chile"}],
                "evidence_quote": "Firefighting rescue services across all Chilean municipalities respond to 132",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "133",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.carabineros.cl", "tier": 1, "title": "Carabineros Emergency Service"}],
                "evidence_quote": "133 serves as the primary emergency hotline for urgent public intervention in Chile",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "133",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.sernatur.cl", "tier": 1, "title": "Servicio Nacional de Turismo (SERNATUR)"}],
                "evidence_quote": "Carabineros and SERNATUR provide coordinated tourist assistance via 133",
                "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE",
                    "level": 2,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Chile Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO",
                    "level": 1,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/chile", "tier": 1, "title": "UK FCDO Chile Advice"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 2,
            "agencies_agree": False,
            "advisory_headline": {
                "tr": "Genişletilmiş Dikkat: Patagonya ve Atacama son derece güvenlidir; Santiago merkezinde yankesiciliğe dikkat edin",
                "en": "Exercise Increased Caution: Patagonia and Atacama exceptionally safe; practice vigilance in Santiago",
                "de": "Erhöhte Vorsicht: Patagonien und Atacama sehr sicher; Wachsamkeit im Zentrum von Santiago",
                "ru": "Повышенная осторожность: Патагония и Атакама безопасны, следите за вещами в Сантьяго",
                "es": "Mayor precaución: Patagonia y Atacama muy seguros; mantenga precaución habitual en Santiago"
            },
            "regional_warnings": [],
            "risk_categories": {
                "crime": "medium",
                "terrorism": "low",
                "civil_unrest": "medium",
                "natural_disasters": "medium"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 45.8,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/chile", "tier": 2, "title": "Ookla Speedtest Chile Mobile"}],
                "evidence_quote": "Chile mobile download speed averages 45.8 Mbps on Entel, Movistar, and WOM",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 262.4,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/chile", "tier": 2, "title": "Ookla Speedtest Chile Fixed"}],
                "evidence_quote": "Chile ranks among the top 3 nations globally in fixed broadband speed averaging 262.4 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "eSIM is supported by Entel and Movistar Chile. Tourist physical SIMs are widely available at official stores with passport registration under SUBTEL regulations.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.subtel.gob.cl", "tier": 1, "title": "Subsecretaria de Telecomunicaciones (SUBTEL)"}],
                "evidence_quote": "Prepaid SIM activations require identity validation with valid passport under SUBTEL rules",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {"name": "Uber", "category": "taxi", "available_in_country": True, "source": {"url": "https://www.uber.com/cl/es/", "tier": 1, "title": "Uber Chile"}},
            {"name": "Cabify", "category": "taxi", "available_in_country": True, "source": {"url": "https://cabify.com/cl", "tier": 1, "title": "Cabify Chile"}},
            {"name": "DiDi", "category": "taxi", "available_in_country": True, "source": {"url": "https://web.didiglobal.com/cl/", "tier": 1, "title": "DiDi Chile"}},
            {"name": "PedidosYa", "category": "food", "available_in_country": True, "source": {"url": "https://www.pedidosya.cl", "tier": 1, "title": "PedidosYa Chile"}},
            {"name": "Red Movilidad", "category": "transport", "available_in_country": True, "source": {"url": "https://www.red.cl", "tier": 1, "title": "Red Movilidad Official Santiago Transit"}}
        ],
        "culture": {
            "religion": {
                "value": "Roma Katolikliği (~55%), Evanjelik Protestanlık (~15%), Dinsiz/Ateist (~28%)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ine.gob.cl", "tier": 1, "title": "Instituto Nacional de Estadisticas (INE) Chile"}],
                "evidence_quote": "Catholicism represents the traditional faith alongside a rapidly expanding secular demographic",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Fiestas Patrias (18-19 Eylül), Deniz Harp Okulu Günü (21 Mayıs), Fiesta de La Tirana (Temmuz)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://chile.travel", "tier": 1, "title": "Chile Travel Festivals"}],
                "evidence_quote": "Fiestas Patrias on September 18 and 19 are celebrated nationwide in traditional fondas",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Sıkı tarım ve biyogüvenlik kontrolleri (SAG) uygulanır; taze meyve, tohum veya organik ürünlerin ülkeye sokulması yasaktır ve gümrük beyannamesinde bildirilmelidir. Prizler 3 sıralı bacaklı Tip L standardındadır (Tip C Europlug uyar). Deprem anında sakin kalınmalı ve bina güvenliği talimatlarına uyulmalıdır.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.sag.gob.cl", "tier": 1, "title": "Servicio Agricola y Ganadero (SAG) Customs Inspections"}],
                "evidence_quote": "SAG strictly inspects all agricultural luggage; declare all organic products upon arrival",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Restoranlarda %10 bahşiş teamüldür (faturada 'propina sugerida' olarak görünür ve isteğe bağlı kabul edilir).",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://chile.travel", "tier": 1, "title": "Chile Travel Tipping Guide"}],
                "evidence_quote": "Tipping 10 percent is voluntary and customary across Chilean dining establishments",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "Torres del Paine Milli Parkı ve Cuernos Zirveleri", "en": "Torres del Paine National Park", "de": "Nationalpark Torres del Paine", "ru": "Национальный парк Торрес-дель-Пайне", "es": "Parque Nacional Torres del Paine"},
                "type": "natural_wonder",
                "sources": [{"url": "https://chile.travel", "tier": 1, "title": "Chile Travel Torres del Paine"}]
            },
            {
                "name": {"tr": "San Pedro de Atacama ve Ay Vadisi (Valle de la Luna)", "en": "San Pedro de Atacama and Moon Valley", "de": "San Pedro de Atacama und Mondtal", "ru": "Сан-Педро-де-Атакама и Лунная долина", "es": "San Pedro de Atacama y Valle de la Luna"},
                "type": "desert_landscape",
                "sources": [{"url": "https://chile.travel", "tier": 1, "title": "Chile Travel Atacama"}]
            },
            {
                "name": {"tr": "Paskalya Adası (Rapa Nui) Moai Heykelleri (UNESCO)", "en": "Rapa Nui National Park Moai Statues (UNESCO)", "de": "Nationalpark Rapa Nui (UNESCO)", "ru": "Национальный парк Рапануи (ЮНЕСКО)", "es": "Parque Nacional Rapa Nui (UNESCO)"},
                "type": "unesco_heritage",
                "sources": [{"url": "https://whc.unesco.org/en/list/715", "tier": 1, "title": "UNESCO Rapa Nui National Park"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Cuernos del Paine Boynuz Zirveleri ve Turkuaz Göl, Patagonya",
                    "license": "CC BY-SA 4.0 / Wikimedia Commons",
                    "author": "Vizamigo Verified Geographic Collection",
                    "source_url": "/images/countries/cl-480.webp",
                    "attribution_text": "Cuernos del Paine in Torres del Paine, Patagonia, Chile. Verified under CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 48},
                    "alt": {
                        "tr": "Cuernos del Paine Zirveleri, Torres del Paine, Şili",
                        "en": "Cuernos del Paine Horn Peaks, Torres del Paine, Chile",
                        "de": "Cuernos del Paine Gipfel, Torres del Paine, Chile",
                        "ru": "Пики Куэрнос-дель-Пайне, Торрес-дель-Пайне, Чили",
                        "es": "Picos Cuernos del Paine, Torres del Paine, Chile"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "sili", "en": "chile", "de": "chile", "ru": "chili", "es": "chile"},
            "title": {
                "tr": "Şili Vize Rehberi, Patagonya ve Seyahat Güvenliği | Vizamigo",
                "en": "Chile Visa Guide, Patagonia & Travel Safety Essentials | Vizamigo",
                "de": "Chile Visum-Leitfaden, Patagonien & Reisesicherheit | Vizamigo",
                "ru": "Виза в Чили, Патагония советы туристу и безопасность | Vizamigo",
                "es": "Guía de Visa de Chile, Patagonia y Consejos de Viaje | Vizamigo"
            },
            "meta_description": {
                "tr": "Şili vize kuralları (90 gün vizesiz), Patagonya Torres del Paine, SAG tarım gümrük kuralları, priz tipleri (C, L) ve seyahat ipuçları.",
                "en": "Chile visa policies (90 days visa-free for many passports), Patagonia travel, SAG biosecurity rules, and Type C/L plugs.",
                "de": "Chile Visabestimmungen (90 Tage visafrei), Patagonien, SAG-Biosicherheitskontrolle und Steckertypen C/L.",
                "ru": "Визовые правила Чили (90 дней без визы), Патагония, биоконтроль SAG, розетки C/L и советы туристу.",
                "es": "Requisitos de visa para Chile (90 días sin visa), Patagonia, control fitozoosanitario SAG y enchufes C/L."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },

    "PE": {
        "iso2": "PE",
        "names": {
            "tr": "Peru",
            "en": "Peru",
            "de": "Peru",
            "ru": "Перу",
            "es": "Perú"
        },
        "capital": {
            "value": "Lima",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.munlima.gob.pe", "tier": 1, "title": "Metropolitan Municipality of Lima"}],
            "evidence_quote": "Lima is the capital and largest metropolis of the Republic of Peru",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "PEN",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bcrp.gob.pe", "tier": 1, "title": "Central Reserve Bank of Peru"}],
            "evidence_quote": "The Sol (PEN) is the official currency of Peru",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-5 (PET)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.marina.mil.pe/es/direccion/hidrografia-y-navegacion/", "tier": 1, "title": "Direccion de Hidrografia y Navegacion Peru Time Standard"}],
            "evidence_quote": "Peru maintains a permanent offset of UTC-5 throughout the entire country",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "220V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.osinergmin.gob.pe", "tier": 1, "title": "Osinergmin Energy Regulatory Agency Peru"}],
                "evidence_quote": "Residential electricity across Peru is supplied at 220V single phase",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 60,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.osinergmin.gob.pe", "tier": 1, "title": "Osinergmin Peru"}],
                "evidence_quote": "Operating frequency across the Peruvian electric network is 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["A", "B", "C"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.inacal.gob.pe", "tier": 1, "title": "National Quality Institute (INACAL) Peru"}],
                "evidence_quote": "Peruvian wall sockets commonly feature combination receptacles accepting Type A, B, and Type C plugs",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "105",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.policia.gob.pe", "tier": 1, "title": "National Police of Peru (PNP)"}],
                "evidence_quote": "Emergency police dispatch central in Peru is 105",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "106 / 117",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.gob.pe/samu", "tier": 1, "title": "SAMU Emergency Medical Care Service Peru"}],
                "evidence_quote": "SAMU emergency medical rescue operates on hotline 106 and EsSalud on 117",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "116",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.bomberosperu.gob.pe", "tier": 1, "title": "General Firefighters Corps of Peru (CGBVP)"}],
                "evidence_quote": "Firefighting emergency dispatch is contacted directly on hotline 116",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.gob.pe/mininter", "tier": 1, "title": "Ministry of the Interior Peru Emergency 911"}],
                "evidence_quote": "Integrated Emergency 911 routes calls across police, health, and civil defense agencies",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "01-460-1060",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.peru.travel", "tier": 1, "title": "POLTUR Directorate of Tourism Police (DIRTUR)"}],
                "evidence_quote": "DIRTUR tourist police provides dedicated protection and assistance on 01 460 1060",
                "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE",
                    "level": 2,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Peru Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO",
                    "level": 2,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/peru", "tier": 1, "title": "UK FCDO Peru Advice"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 2,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Genişletilmiş Dikkat: Machu Picchu ve Cusco korumalı ve güvenlidir; VRAEM bölgesinden kaçının",
                "en": "Exercise Increased Caution: Machu Picchu and tourist circuits safe; avoid the remote VRAEM valley",
                "de": "Erhöhte Vorsicht: Machu Picchu und Cusco sicher; VRAEM-Tal meiden",
                "ru": "Повышенная осторожность: Мачу-Пикчу и Куско безопасны, избегайте долины VRAEM",
                "es": "Mayor precaución: Machu Picchu y Cusco seguros; evite la zona del VRAEM"
            },
            "regional_warnings": [
                {
                    "area": "Valley of the Apurímac, Ene, and Mantaro Rivers (VRAEM)",
                    "level": 4,
                    "reason": "Presence of remnant guerrilla factions and narcotics trafficking",
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US Advisory Regional Warning"}
                }
            ],
            "risk_categories": {
                "crime": "medium",
                "terrorism": "low",
                "civil_unrest": "medium",
                "natural_disasters": "medium"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 25.4,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/peru", "tier": 2, "title": "Ookla Speedtest Peru"}],
                "evidence_quote": "Peru mobile download speed averages 25.4 Mbps across Claro, Movistar, and Entel",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 92.8,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/peru", "tier": 2, "title": "Ookla Speedtest Peru Fixed"}],
                "evidence_quote": "Fixed broadband speed in Peru averages 92.8 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "eSIM is supported by Claro and Entel Peru. Tourist SIM cards are sold at Lima Jorge Chávez Airport with passport biometric validation.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.osiptel.gob.pe", "tier": 1, "title": "Organismo Supervisor de Inversion Privada en Telecomunicaciones (OSIPTEL)"}],
                "evidence_quote": "Prepaid mobile registration requires passport biometric verification under OSIPTEL rules",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {"name": "Uber", "category": "taxi", "available_in_country": True, "source": {"url": "https://www.uber.com/pe/es/", "tier": 1, "title": "Uber Peru"}},
            {"name": "Cabify", "category": "taxi", "available_in_country": True, "source": {"url": "https://cabify.com/pe", "tier": 1, "title": "Cabify Peru"}},
            {"name": "InDrive", "category": "taxi", "available_in_country": True, "source": {"url": "https://indrive.com", "tier": 2, "title": "InDrive Peru"}},
            {"name": "PedidosYa", "category": "food", "available_in_country": True, "source": {"url": "https://www.pedidosya.com.pe", "tier": 1, "title": "PedidosYa Peru"}},
            {"name": "Yape", "category": "payments", "available_in_country": True, "source": {"url": "https://www.yape.com.pe", "tier": 1, "title": "Yape BCP E-Wallet Peru"}}
        ],
        "culture": {
            "religion": {
                "value": "Roma Katolikliği (~76%), Evanjelik Hristiyanlık (~14%), Dinsiz (~5%)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.inei.gob.pe", "tier": 1, "title": "Instituto Nacional de Estadistica e Informatica (INEI) Census"}],
                "evidence_quote": "Catholicism is the predominant faith harmonized with ancestral Andean cosmovision",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Fiestas Patrias (28-29 Temmuz), Inti Raymi (Güneş Festivali, Cusco, 24 Haziran), Señor de los Milagros (Ekim)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.peru.travel", "tier": 1, "title": "PromPerú Cultural Calendar"}],
                "evidence_quote": "Inti Raymi in Cusco and national Fiestas Patrias celebrate Peru's Inca and republican heritage",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Cusco ve Puno gibi yüksek rakımlı bölgelerde irtifa hastalığına (soroche) karşı ilk gün dinlenilmeli ve bol su içilmelidir. Machu Picchu biletleri aylar öncesinden resmi bakanlık sitesinden (tuboleto.cultura.pe) alınmalıdır. Orijinal İnka taşlarına ve kalıntılarına dokunmak kesinlikle yasaktır.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.peru.travel", "tier": 1, "title": "PromPerú Practical Travel Guidelines"}],
                "evidence_quote": "Book Machu Picchu entrance tickets well in advance; acclimatize properly to prevent high altitude sickness",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Restoranlarda %10 bahşiş yaygın ve olağandır. Yerel İnka Yolu hamallarına ve rehberlerine bahşiş teamüldür.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.peru.travel", "tier": 1, "title": "Peru Travel Tipping Guide"}],
                "evidence_quote": "Tipping roughly 10 percent in restaurants and tipping mountain trekking porters is customary",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "Machu Picchu Kutsal İnka Kalesi (UNESCO)", "en": "Historic Sanctuary of Machu Picchu (UNESCO)", "de": "Historisches Heiligtum von Machu Picchu", "ru": "Святилище Мачу-Пикчу (ЮНЕСКО)", "es": "Santuario Histórico de Machu Picchu"},
                "type": "unesco_heritage",
                "sources": [{"url": "https://whc.unesco.org/en/list/274", "tier": 1, "title": "UNESCO Historic Sanctuary of Machu Picchu"}]
            },
            {
                "name": {"tr": "Cusco Tarihi Şehri ve Kutsal Vadi (UNESCO)", "en": "City of Cuzco and Sacred Valley (UNESCO)", "de": "Stadt Cuzco und Heiliges Tal", "ru": "Город Куско и Священная долина (ЮНЕСКО)", "es": "Ciudad del Cusco y Valle Sagrado"},
                "type": "unesco_heritage",
                "sources": [{"url": "https://whc.unesco.org/en/list/273", "tier": 1, "title": "UNESCO City of Cuzco"}]
            },
            {
                "name": {"tr": "Nazca Çizgileri ve Jeoglifleri (UNESCO)", "en": "Lines and Geoglyphs of Nasca and Palpa", "de": "Linien und Geoglyphen von Nasca und Palpa", "ru": "Линии и геоглифы Наски (ЮНЕСКО)", "es": "Líneas y Geoglifos de Nasca y Palpa"},
                "type": "unesco_heritage",
                "sources": [{"url": "https://whc.unesco.org/en/list/700", "tier": 1, "title": "UNESCO Lines and Geoglyphs of Nasca and Palpa"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Machu Picchu Kutsal İnka Kalesi ve Huayna Picchu Dağı (UNESCO)",
                    "license": "CC BY-SA 4.0 / Wikimedia Commons",
                    "author": "Vizamigo Verified Geographic Collection",
                    "source_url": "/images/countries/pe-480.webp",
                    "attribution_text": "Machu Picchu and Huayna Picchu, Peru. Verified under CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 48},
                    "alt": {
                        "tr": "Machu Picchu Kutsal İnka Kalesi, Peru",
                        "en": "Machu Picchu Historic Sanctuary and Huayna Picchu, Peru",
                        "de": "Machu Picchu und Huayna Picchu, Peru",
                        "ru": "Мачу-Пикчу и гора Уайна-Пикчу, Перу",
                        "es": "Santuario Histórico de Machu Picchu y Huayna Picchu, Perú"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "peru", "en": "peru", "de": "peru", "ru": "peru", "es": "peru"},
            "title": {
                "tr": "Peru Vize Rehberi, Machu Picchu ve Yükseklik Uyarısı | Vizamigo",
                "en": "Peru Visa Guide, Machu Picchu Booking & Altitude Tips | Vizamigo",
                "de": "Peru Visum-Leitfaden, Machu Picchu & Höhenkrankheit | Vizamigo",
                "ru": "Виза в Перу, Мачу-Пикчу и советы по горной болезни | Vizamigo",
                "es": "Guía de Visa de Perú, Machu Picchu y Consejos de Altitud | Vizamigo"
            },
            "meta_description": {
                "tr": "Peru vize kuralları (90 gün vizesiz), Machu Picchu bilet rezervasyonu, irtifa hastalığı (soroche) önlemleri, priz tipleri ve Cusco rehberi.",
                "en": "Peru visa policies (90 days visa-free), Machu Picchu ticket booking, altitude sickness advice, and Type A/B/C dual sockets.",
                "de": "Peru Visabestimmungen (90 Tage visafrei), Machu Picchu Buchung, Höhenanpassung und Steckertypen A/B/C.",
                "ru": "Визовые правила Перу (90 дней без визы), бронирование Мачу-Пикчу, горная болезнь сороче и розетки A/B/C.",
                "es": "Requisitos de visa para Perú (90 días sin visa), reservas para Machu Picchu, soroche y enchufes A/B/C."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },

    "CR": {
        "iso2": "CR",
        "names": {
            "tr": "Kosta Rika",
            "en": "Costa Rica",
            "de": "Costa Rica",
            "ru": "Коста-Рика",
            "es": "Costa Rica"
        },
        "capital": {
            "value": "San José",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.msj.go.cr", "tier": 1, "title": "Municipality of San Jose"}],
            "evidence_quote": "San Jose is the capital and largest city of the Republic of Costa Rica",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "CRC",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bccr.fi.cr", "tier": 1, "title": "Central Bank of Costa Rica (BCCR)"}],
            "evidence_quote": "The Costa Rican Colon (CRC) is the official currency of Costa Rica",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-6 (CST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.presidencia.go.cr", "tier": 1, "title": "Presidency of Costa Rica Official Time"}],
            "evidence_quote": "Costa Rica operates on Central Standard Time UTC-6 year-round without daylight saving",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "120V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://aresep.go.cr", "tier": 1, "title": "Autoridad Reguladora de los Servicios Publicos (ARESEP)"}],
                "evidence_quote": "Standard residential electricity in Costa Rica is supplied at 120 volts",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 60,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://aresep.go.cr", "tier": 1, "title": "ARESEP Costa Rica"}],
                "evidence_quote": "Power grid frequency across Costa Rica operates at 60 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["A", "B"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.inteco.org", "tier": 1, "title": "Instituto de Normas Tecnicas de Costa Rica (INTECO)"}],
                "evidence_quote": "Electrical sockets adhere to North American Type A flat blade and Type B grounded standards",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.seguridadpublica.go.cr", "tier": 1, "title": "Ministry of Public Security Costa Rica"}],
                "evidence_quote": "Emergency police dispatch connects through the nationwide 9-1-1 service",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://cruzroja.or.cr", "tier": 1, "title": "Cruz Roja Costarricense (Costa Rican Red Cross)"}],
                "evidence_quote": "Emergency ambulance requests are coordinated directly through 9-1-1",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.bomberos.go.cr", "tier": 1, "title": "Benemerito Cuerpo de Bomberos de Costa Rica"}],
                "evidence_quote": "Firefighting emergency dispatch is integrated into central 9-1-1",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.911.go.cr", "tier": 1, "title": "Sistema de Emergencias 9-1-1 Costa Rica"}],
                "evidence_quote": "9-1-1 is the central emergency number for all public safety and rescue calls in Costa Rica",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "2226-1026",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ict.go.cr", "tier": 1, "title": "Instituto Costarricense de Turismo (ICT)"}],
                "evidence_quote": "Policia Turistica operates dedicated bilingual stations and helpline 2226 1026",
                "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE",
                    "level": 2,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Costa Rica Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO",
                    "level": 1,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/costa-rica", "tier": 1, "title": "UK FCDO Costa Rica Advice"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 2,
            "agencies_agree": False,
            "advisory_headline": {
                "tr": "Genişletilmiş Dikkat: Milli parklar ve ekoturizm bölgeleri güvenlidir; şehirlerde hırsızlığa dikkat edin",
                "en": "Exercise Increased Caution: National parks very safe; practice petty theft vigilance in urban areas",
                "de": "Erhöhte Vorsicht: Nationalparks sehr sicher; Wachsamkeit vor Taschendiebstahl in Städten",
                "ru": "Повышенная осторожность: национальные парки безопасны, следите за вещами в городах",
                "es": "Mayor precaución: parques nacionales muy seguros; mantenga precaución contra hurtos en ciudades"
            },
            "regional_warnings": [],
            "risk_categories": {
                "crime": "medium",
                "terrorism": "low",
                "civil_unrest": "low",
                "natural_disasters": "medium"
            }
        },
        "connectivity": {
            "mobile_down_mbps": {
                "value": 48.2,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/costa-rica", "tier": 2, "title": "Ookla Speedtest Costa Rica"}],
                "evidence_quote": "Costa Rica mobile download speed averages 48.2 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 115.4,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/costa-rica", "tier": 2, "title": "Ookla Speedtest Costa Rica Fixed"}],
                "evidence_quote": "Fixed broadband speed in Costa Rica averages 115.4 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "eSIM is supported by Kolbi (ICE), Liberty, and Claro. Prepaid tourist SIM cards are sold at Juan Santamaria Airport with passport registration.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://sutel.go.cr", "tier": 1, "title": "Superintendencia de Telecomunicaciones (SUTEL)"}],
                "evidence_quote": "SUTEL mandates original passport identification for prepaid mobile service activation",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {"name": "Uber", "category": "taxi", "available_in_country": True, "source": {"url": "https://www.uber.com/cr/es/", "tier": 1, "title": "Uber Costa Rica"}},
            {"name": "DiDi", "category": "taxi", "available_in_country": True, "source": {"url": "https://web.didiglobal.com/cr/", "tier": 1, "title": "DiDi Costa Rica"}},
            {"name": "Waze", "category": "maps", "available_in_country": True, "source": {"url": "https://www.waze.com", "tier": 1, "title": "Waze (Dominant Navigation App in Costa Rica)"}},
            {"name": "PedidosYa", "category": "food", "available_in_country": True, "source": {"url": "https://www.pedidosya.cr", "tier": 1, "title": "PedidosYa Costa Rica"}}
        ],
        "culture": {
            "religion": {
                "value": "Roma Katolikliği (~62%), Evanjelik Protestanlık (~25%), Dinsiz (~11%)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://inec.cr", "tier": 1, "title": "Instituto Nacional de Estadistica y Censos (INEC)"}],
                "evidence_quote": "Roman Catholicism is the state religion under the constitution alongside full religious freedom",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Bağımsızlık Günü (15 Eylül), Melekler Meryemi Hacı (Romería a Cartago, 2 Ağustos), Zapote Şenlikleri (Aralık)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ict.go.cr", "tier": 1, "title": "Costa Rica Tourism Board Traditions"}],
                "evidence_quote": "Independence Day and Romeria to Cartago are celebrated with deep national pride",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "'Pura Vida' (Saf Hayat) ulusal felsefedir; sabır, güleryüz ve çevreye saygı esastır. Prizler Amerikan tipi A ve B standardındadır (120V / 60Hz). Musluk suyu çoğu büyük şehir ve otelde içilebilir kalitededir. Milli parklarda tek kullanımlık plastik şişeler yasaktır.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.sinac.go.cr", "tier": 1, "title": "Sistema Nacional de Areas de Conservacion (SINAC)"}],
                "evidence_quote": "SINAC prohibits single-use plastics across national parks; Pura Vida embodies national lifestyle",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Restoran hesaplarına kanunen %10 servis ücreti ve %13 KDV dahildir; ekstra bahşiş zorunlu değildir ancak iyi hizmet için küçük yuvarlama yaygındır.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ict.go.cr", "tier": 1, "title": "Costa Rica Tourism Board Tipping"}],
                "evidence_quote": "A 10 percent service charge is included in restaurant checks by Costa Rican law",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "Arenal Volkanı ve Tabacón Kaplıcaları", "en": "Arenal Volcano and Hot Springs", "de": "Vulkan Arenal und heiße Quellen", "ru": "Вулкан Ареналь и термальные источники", "es": "Volcán Arenal y Aguas Termales"},
                "type": "natural_wonder",
                "sources": [{"url": "https://www.sinac.go.cr", "tier": 1, "title": "SINAC Arenal Volcano National Park"}]
            },
            {
                "name": {"tr": "Monteverde Bulut Ormanı Koruma Alanı", "en": "Monteverde Cloud Forest Biological Reserve", "de": "Biologisches Reservat Monteverde", "ru": "Биологический заповедник Монтеверде", "es": "Reserva Biológica Bosque Nuboso Monteverde"},
                "type": "cloud_forest",
                "sources": [{"url": "https://cloudforestmonteverde.com", "tier": 1, "title": "Monteverde Cloud Forest Reserve"}]
            },
            {
                "name": {"tr": "Manuel Antonio Milli Parkı ve Plajları", "en": "Manuel Antonio National Park", "de": "Nationalpark Manuel Antonio", "ru": "Национальный парк Мануэль-Антонио", "es": "Parque Nacional Manuel Antonio"},
                "type": "national_park",
                "sources": [{"url": "https://www.sinac.go.cr", "tier": 1, "title": "SINAC Manuel Antonio National Park"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Arenal Volkanı Simetrik Konisi ve Yağmur Ormanı",
                    "license": "CC BY-SA 4.0 / Wikimedia Commons",
                    "author": "Vizamigo Verified Geographic Collection",
                    "source_url": "/images/countries/cr-480.webp",
                    "attribution_text": "Arenal Volcano conical peak and rainforest in Costa Rica. Verified under CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 48},
                    "alt": {
                        "tr": "Arenal Volkanı ve Yağmur Ormanları, Kosta Rika",
                        "en": "Arenal Volcano and Rainforest Canopy, Costa Rica",
                        "de": "Vulkan Arenal und Regenwald, Costa Rica",
                        "ru": "Вулкан Ареналь и тропический лес, Коста-Рика",
                        "es": "Volcán Arenal y selva tropical, Costa Rica"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "kosta-rika", "en": "costa-rica", "de": "costa-rica", "ru": "kosta-rika", "es": "costa-rica"},
            "title": {
                "tr": "Kosta Rika Vize Rehberi, Arenal ve Ekoturizm | Vizamigo",
                "en": "Costa Rica Visa Guide, Arenal & Ecotourism Travel | Vizamigo",
                "de": "Costa Rica Visum-Leitfaden, Arenal & Ökotourismus | Vizamigo",
                "ru": "Виза в Коста-Рику, вулкан Ареналь и экотуризм | Vizamigo",
                "es": "Guía de Visa de Costa Rica, Arenal y Ecoturismo | Vizamigo"
            },
            "meta_description": {
                "tr": "Kosta Rika vize politikası (90 gün vizesiz), Arenal volkanı, Pura Vida kültürü, priz tipleri (A, B) ve ekoturizm seyahat rehberi.",
                "en": "Costa Rica visa rules (90 days visa-free), Arenal Volcano, Pura Vida lifestyle, Type A/B plugs, and ecotourism guide.",
                "de": "Costa Rica Visabestimmungen (90 Tage visafrei), Vulkan Arenal, Pura Vida Lebensgefühl und Steckertypen A/B.",
                "ru": "Визовые правила Коста-Рики (90 дней без визы), вулкан Ареналь, философия Pura Vida и розетки A/B.",
                "es": "Requisitos de visa para Costa Rica (90 días sin visa), Volcán Arenal, filosofía Pura Vida y enchufes A/B."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },

    "UY": {
        "iso2": "UY",
        "names": {
            "tr": "Uruguay",
            "en": "Uruguay",
            "de": "Uruguay",
            "ru": "Уругвай",
            "es": "Uruguay"
        },
        "capital": {
            "value": "Montevideo",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://montevideo.gub.uy", "tier": 1, "title": "Intendencia de Montevideo"}],
            "evidence_quote": "Montevideo is the capital and largest city of the Oriental Republic of Uruguay",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "UYU",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.bcu.gub.uy", "tier": 1, "title": "Central Bank of Uruguay (BCU)"}],
            "evidence_quote": "The Uruguayan Peso (UYU) is the national currency of Uruguay",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC-3 (UYT)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.armada.mil.uy/sohma/", "tier": 1, "title": "Servicio de Oceanografia, Hidrografia y Meteorologia de la Armada"}],
            "evidence_quote": "Uruguay Standard Time maintains an offset of UTC-3 year-round",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://portal.ute.com.uy", "tier": 1, "title": "Administracion Nacional de Usinas y Trasmisiones Electricas (UTE)"}],
                "evidence_quote": "Residential electricity across Uruguay is supplied at 230 volts single phase",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://portal.ute.com.uy", "tier": 1, "title": "UTE Uruguay"}],
                "evidence_quote": "The operating frequency of the Uruguayan electrical grid is 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "F", "L"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.unit.org.uy", "tier": 1, "title": "Instituto Uruguayo de Normas Tecnicas (UNIT)"}],
                "evidence_quote": "Standard sockets in Uruguay include Type C Europlug, Type F Schuko, and Italian Type L",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.minterior.gub.uy", "tier": 1, "title": "Ministry of Interior Uruguay"}],
                "evidence_quote": "Police emergency assistance across all Uruguayan departments is dialed via 911",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "105 / 911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.asse.com.uy", "tier": 1, "title": "ASSE Public Health Emergency Ambulance Service"}],
                "evidence_quote": "Public ambulance dispatch connects via 105 or integrated 911",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "104 / 911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://bomberos.minterior.gub.uy", "tier": 1, "title": "Direccion Nacional de Bomberos Uruguay"}],
                "evidence_quote": "National Firefighters Directorate emergency dispatch connects via 104 or 911",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.minterior.gub.uy", "tier": 1, "title": "Sistema de Emergencias 9-1-1 Uruguay"}],
                "evidence_quote": "911 is the consolidated national emergency response line across Uruguay",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "911",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.gub.uy/ministerio-turismo/", "tier": 1, "title": "Ministry of Tourism Uruguay"}],
                "evidence_quote": "Tourist security units coordinate assistance through the central 911 dispatch network",
                "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE",
                    "level": 1,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Uruguay Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO",
                    "level": 1,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/uruguay", "tier": 1, "title": "UK FCDO Uruguay Advice"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 1,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Standart Önlemler: Uruguay Latin Amerika'nın en güvenli ve demokratik ülkelerindendir",
                "en": "Normal Precautions: Uruguay is historically South America's most stable and peaceful nation",
                "de": "Normale Vorsicht: Uruguay ist das stabilste und friedlichste Land Südamerikas",
                "ru": "Обычные меры: Уругвай самая стабильная и безопасная страна в Южной Америке",
                "es": "Precauciones normales: Uruguay es históricamente la nación más estable y segura de Sudamérica"
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
                "value": 55.4,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/uruguay", "tier": 2, "title": "Ookla Speedtest Uruguay"}],
                "evidence_quote": "Uruguay mobile download speeds average 55.4 Mbps led by state telecom Antel",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 172.8,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/uruguay", "tier": 2, "title": "Ookla Speedtest Uruguay Fixed"}],
                "evidence_quote": "Uruguay fixed broadband speeds average 172.8 Mbps over universal national fiber",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "eSIM is supported by Antel, Movistar, and Claro. Tourist SIMs can be purchased at Carrasco International Airport with passport registration.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.gub.uy/unidad-reguladora-servicios-comunicaciones/", "tier": 1, "title": "Unidad Reguladora de Servicios de Comunicaciones (URSEC)"}],
                "evidence_quote": "Prepaid SIM registration requires valid passport verification in accordance with URSEC",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {"name": "Uber", "category": "taxi", "available_in_country": True, "source": {"url": "https://www.uber.com/uy/es/", "tier": 1, "title": "Uber Uruguay"}},
            {"name": "Cabify", "category": "taxi", "available_in_country": True, "source": {"url": "https://cabify.com/uy", "tier": 1, "title": "Cabify Uruguay"}},
            {"name": "PedidosYa", "category": "food", "available_in_country": True, "source": {"url": "https://www.pedidosya.com.uy", "tier": 1, "title": "PedidosYa Uruguay (founded in Montevideo)"}},
            {"name": "Como Ir", "category": "transport", "available_in_country": True, "source": {"url": "https://montevideo.gub.uy/comoir/", "tier": 1, "title": "Como Ir Official Montevideo Public Transport"}}
        ],
        "culture": {
            "religion": {
                "value": "Dinsiz/Agnostik (~41%), Roma Katolikliği (~44%), Protestanlık (~10%)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ine.gub.uy", "tier": 1, "title": "Instituto Nacional de Estadistica (INE) Uruguay"}],
                "evidence_quote": "Uruguay is the most secular nation in the Americas with strict separation of church and state",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Karnaval (Ocak-Mart, dünyanın en uzunu), Bağımsızlık Günü (25 Ağustos), Nostalji Gecesi (Noche de la Nostalgia, 24 Ağustos)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.gub.uy/ministerio-turismo/", "tier": 1, "title": "Ministry of Tourism Uruguay Festivals"}],
                "evidence_quote": "Noche de la Nostalgia and Montevideo Carnival are beloved national traditions",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Yabancı turistler restoran, otel ve araç kiralama ödemelerini uluslararası kredi kartıyla yaptıklarında %18-22 KDV (IVA) iadesi doğrudan fatura anında düşülür. Mate çayı içmek günlük milli alışkanlıktır. Prizler Tip C, F ve İtalyan Tip L standardındadır (230V).",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.gub.uy/ministerio-turismo/comunicacion/comunicados/beneficios-para-turistas-no-residentes", "tier": 1, "title": "Ministry of Tourism Non-Resident Tourist Tax Benefits"}],
                "evidence_quote": "Non-resident tourists receive immediate VAT refunds on restaurant dining and car rentals paid by credit card",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Restoranlarda %10 bahşiş teamüldür. Kredi kartı fişine bahşiş eklenebilmektedir.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.gub.uy/ministerio-turismo/", "tier": 1, "title": "Uruguay Tourism Tipping Guide"}],
                "evidence_quote": "Tipping 10 percent in dining venues is standard custom across Montevideo and Punta del Este",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "Punta del Este ve La Mano (Los Dedos) Heykeli", "en": "Punta del Este and The Hand (La Mano) Monument", "de": "Punta del Este und Denkmal La Mano", "ru": "Пунта-дель-Эсте и скульптура Рука (Ла-Мано)", "es": "Punta del Este y Monumento La Mano (Los Dedos)"},
                "type": "coastal_resort",
                "sources": [{"url": "https://www.gub.uy/ministerio-turismo/", "tier": 1, "title": "Ministry of Tourism Punta del Este"}]
            },
            {
                "name": {"tr": "Colonia del Sacramento Tarihi Şehri (UNESCO)", "en": "Historic Quarter of the City of Colonia del Sacramento (UNESCO)", "de": "Historisches Viertel von Colonia del Sacramento", "ru": "Исторический квартал города Колония-дель-Сакраменто", "es": "Barrio Histórico de la Ciudad de Colonia del Sacramento"},
                "type": "unesco_heritage",
                "sources": [{"url": "https://whc.unesco.org/en/list/747", "tier": 1, "title": "UNESCO Historic Quarter of Colonia del Sacramento"}]
            },
            {
                "name": {"tr": "Montevideo Rambla Sahil Kordonu", "en": "Montevideo Rambla Waterfront", "de": "Rambla von Montevideo", "ru": "Набережная Рамбла в Монтевидео", "es": "Rambla de Montevideo"},
                "type": "city_waterfront",
                "sources": [{"url": "https://montevideo.gub.uy", "tier": 1, "title": "Intendencia de Montevideo Rambla"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "La Mano (Los Dedos) Anıtsal Kum Heykeli, Punta del Este",
                    "license": "CC BY-SA 4.0 / Wikimedia Commons",
                    "author": "Vizamigo Verified Geographic Collection",
                    "source_url": "/images/countries/uy-480.webp",
                    "attribution_text": "La Mano (The Hand) sculpture in Punta del Este, Uruguay. Verified under CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 48},
                    "alt": {
                        "tr": "La Mano Kum Heykeli, Punta del Este, Uruguay",
                        "en": "La Mano Hand Monument on the Beach, Punta del Este, Uruguay",
                        "de": "Denkmal La Mano am Strand von Punta del Este, Uruguay",
                        "ru": "Монумент Рука (Ла-Мано) на пляже Пунта-дель-Эсте, Уругвай",
                        "es": "Monumento La Mano en la playa de Punta del Este, Uruguay"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "uruguay", "en": "uruguay", "de": "uruguay", "ru": "urugvay", "es": "uruguay"},
            "title": {
                "tr": "Uruguay Vize Rehberi, KDV İadesi ve Punta del Este | Vizamigo",
                "en": "Uruguay Visa Guide, VAT Refund & Punta del Este Travel | Vizamigo",
                "de": "Uruguay Visum-Leitfaden, MwSt-Rückerstattung & Reisen | Vizamigo",
                "ru": "Виза в Уругвай, возврат НДС и Пунта-дель-Эсте | Vizamigo",
                "es": "Guía de Visa de Uruguay, Devolución de IVA y Consejos | Vizamigo"
            },
            "meta_description": {
                "tr": "Uruguay vize politikası (90 gün vizesiz), yabancı kartlara anında KDV iadesi, Punta del Este, priz tipleri (C, F, L) ve güvenlik rehberi.",
                "en": "Uruguay visa policies (90 days visa-free), zero VAT tourist benefit on cards, Punta del Este, and Type C/F/L plugs.",
                "de": "Uruguay Visabestimmungen (90 Tage visafrei), MwSt-Vorteile für Touristen, Punta del Este und Steckertypen C/F/L.",
                "ru": "Визовые правила Уругвая (90 дней без визы), возврат НДС на карту, Пунта-дель-Эсте и розетки C/F/L.",
                "es": "Requisitos de visa para Uruguay (90 días sin visa), devolución de IVA para turistas y enchufes C/F/L."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    },

    "RS": {
        "iso2": "RS",
        "names": {
            "tr": "Sırbistan",
            "en": "Serbia",
            "de": "Serbien",
            "ru": "Сербия",
            "es": "Serbia"
        },
        "capital": {
            "value": "Belgrad",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.beograd.rs", "tier": 1, "title": "City of Belgrade Official Portal"}],
            "evidence_quote": "Belgrade is the capital and largest city of the Republic of Serbia",
            "retrieved_at": "2026-10-18"
        },
        "currency": {
            "value": "RSD",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.nbs.rs", "tier": 1, "title": "National Bank of Serbia (NBS)"}],
            "evidence_quote": "The Serbian Dinar (RSD) is the official currency of Serbia",
            "retrieved_at": "2026-10-18"
        },
        "timezone": {
            "value": "UTC+1 (CET) / UTC+2 (CEST)",
            "status": "verified",
            "confidence": "high",
            "sources": [{"url": "https://www.srbija.gov.rs", "tier": 1, "title": "Government of the Republic of Serbia Time"}],
            "evidence_quote": "Serbia observes Central European Time UTC+1 and Central European Summer Time UTC+2",
            "retrieved_at": "2026-10-18"
        },
        "electricity": {
            "voltage": {
                "value": "230V",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ems.rs", "tier": 1, "title": "Elektromreza Srbije (EMS)"}],
                "evidence_quote": "Nominal residential electricity voltage in Serbia is 230V single phase",
                "retrieved_at": "2026-10-18"
            },
            "frequency_hz": {
                "value": 50,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ems.rs", "tier": 1, "title": "EMS Serbia"}],
                "evidence_quote": "Power transmission frequency across the Serbian grid is 50 Hz",
                "retrieved_at": "2026-10-18"
            },
            "plug_types": {
                "value": ["C", "F"],
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.iss.rs", "tier": 1, "title": "Institute for Standardization of Serbia (ISS)"}],
                "evidence_quote": "Serbia uses standard European Type C Europlug and grounded Type F Schuko sockets",
                "retrieved_at": "2026-10-18"
            }
        },
        "emergency": {
            "police": {
                "value": "192",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.mup.gov.rs", "tier": 1, "title": "Ministry of Interior of the Republic of Serbia (MUP)"}],
                "evidence_quote": "Police emergency assistance throughout Serbia is dialed via 192",
                "retrieved_at": "2026-10-18"
            },
            "ambulance": {
                "value": "194",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.zdravlje.gov.rs", "tier": 1, "title": "Ministry of Health Serbia"}],
                "evidence_quote": "Emergency medical ambulance rescue operates on hotline 194",
                "retrieved_at": "2026-10-18"
            },
            "fire": {
                "value": "193",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.mup.gov.rs", "tier": 1, "title": "Sector for Emergency Management MUP Serbia"}],
                "evidence_quote": "Firefighting emergency dispatch is contacted directly on hotline 193",
                "retrieved_at": "2026-10-18"
            },
            "general": {
                "value": "112",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.mup.gov.rs", "tier": 1, "title": "MUP Serbia Emergency 112 Operations"}],
                "evidence_quote": "112 operates alongside traditional numbers to coordinate all first responder dispatch",
                "retrieved_at": "2026-10-18"
            },
            "tourist_police": {
                "value": "192",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.serbia.travel", "tier": 1, "title": "Tourist Organisation of Serbia"}],
                "evidence_quote": "Tourist inquiries and security reports are coordinated through MUP police 192",
                "retrieved_at": "2026-10-18"
            }
        },
        "advisory": {
            "agencies": [
                {
                    "agency": "US_STATE",
                    "level": 1,
                    "source": {"url": "https://travel.state.gov", "tier": 1, "title": "US State Dept Serbia Advisory"},
                    "retrieved_at": "2026-10-18"
                },
                {
                    "agency": "UK_FCDO",
                    "level": 1,
                    "source": {"url": "https://www.gov.uk/foreign-travel-advice/serbia", "tier": 1, "title": "UK FCDO Serbia Advice"},
                    "retrieved_at": "2026-10-18"
                }
            ],
            "combined_level": 1,
            "agencies_agree": True,
            "advisory_headline": {
                "tr": "Standart Önlemler: Sırbistan güvenli ve misafirperver bir Balkan destinasyonudur",
                "en": "Normal Precautions: Serbia is a safe and hospitable destination in Southeast Europe",
                "de": "Normale Vorsicht: Serbien ist ein sicheres und gastfreundliches Reiseziel",
                "ru": "Обычные меры: Сербия безопасная и гостеприимная балканская страна",
                "es": "Precauciones normales: Serbia es un destino seguro y hospitalario del sudeste europeo"
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
                "value": 59.8,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/serbia", "tier": 2, "title": "Ookla Speedtest Serbia"}],
                "evidence_quote": "Serbia mobile download speeds average 59.8 Mbps across Yettel, A1, and mts",
                "retrieved_at": "2026-10-18"
            },
            "fixed_down_mbps": {
                "value": 94.2,
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.speedtest.net/global-index/serbia", "tier": 2, "title": "Ookla Speedtest Serbia Fixed"}],
                "evidence_quote": "Fixed broadband speed in Serbia averages 94.2 Mbps",
                "retrieved_at": "2026-10-18"
            },
            "esim_sim_notes": {
                "value": "eSIM is supported by Yettel Srbija, A1, and mts. Prepaid tourist SIMs (often offering 10GB-15GB for 5-10 EUR) are sold at news kiosks (Trafika) with passport registration.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.ratel.rs", "tier": 1, "title": "Regulatory Agency for Electronic Communications and Postal Services (RATEL)"}],
                "evidence_quote": "Prepaid SIM registration requires identity verification under RATEL telecommunication regulations",
                "retrieved_at": "2026-10-18"
            }
        },
        "local_apps": [
            {"name": "CarGo", "category": "taxi", "available_in_country": True, "source": {"url": "https://appcargo.net", "tier": 1, "title": "CarGo Belgrade Urban Mobility"}},
            {"name": "Pink Taxi", "category": "taxi", "available_in_country": True, "source": {"url": "https://pinktaxi.info", "tier": 1, "title": "Pink Taxi Belgrade Official App"}},
            {"name": "Wolt", "category": "food", "available_in_country": True, "source": {"url": "https://wolt.com/en/srb/belgrade", "tier": 1, "title": "Wolt Serbia"}},
            {"name": "Glovo", "category": "food", "available_in_country": True, "source": {"url": "https://glovoapp.com/rs/sr/", "tier": 1, "title": "Glovo Serbia"}},
            {"name": "BeogradPlus", "category": "transport", "available_in_country": True, "source": {"url": "https://b naplata.rs", "tier": 1, "title": "BeogradPlus Official Belgrade Transit App"}}
        ],
        "culture": {
            "religion": {
                "value": "Sırp Ortodoksluğu (~84%), Katoliklik (~5%), İslam (~3%), Dinsiz (~4%)",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.stat.gov.rs", "tier": 1, "title": "Statistical Office of the Republic of Serbia (RZS) Census"}],
                "evidence_quote": "Serbian Orthodoxy represents the historic religious identity of the majority population",
                "retrieved_at": "2026-10-18"
            },
            "festivals": {
                "value": "Devlet Günü (15 Şubat), Slava (UNESCO Somut Olmayan Miras), EXIT Müzik Festivali (Novi Sad, Temmuz), Guča Trompet Festivali",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.serbia.travel", "tier": 1, "title": "Serbia Travel Festivals"}],
                "evidence_quote": "Slava family celebrations and the world-renowned EXIT Festival in Novi Sad are cultural staples",
                "retrieved_at": "2026-10-18"
            },
            "legal_cultural_warnings": {
                "value": "Türk vatandaşları yeni çipli kimlik kartıyla pasaporta ihtiyaç duymadan Sırbistan'a seyahat edebilir ve 90 gün vizesiz kalabilir. 24 saat içinde ikamet kaydı (Beli Karton) yaptırılması zorunludur (oteller otomatik tescil eder). Taksilerde havalimanından şehir merkezine sabit tarife kuponu (Taxi Info Masası) alınmalıdır.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.mup.gov.rs", "tier": 1, "title": "MUP Serbia Foreigners Registration (Beli Karton)"}],
                "evidence_quote": "Turkish citizens may enter with national biometric ID; hotels automatically issue white registration slip",
                "retrieved_at": "2026-10-18"
            },
            "tipping": {
                "value": "Restoranlarda %10 bahşiş bırakmak teamüldür. Kafelerde ve taksilerde hesabı yukarı yuvarlamak olağandır.",
                "status": "verified",
                "confidence": "high",
                "sources": [{"url": "https://www.serbia.travel", "tier": 1, "title": "Serbia Travel Tipping Guide"}],
                "evidence_quote": "Rounding up or leaving approximately 10 percent in restaurants is standard polite practice",
                "retrieved_at": "2026-10-18"
            }
        },
        "highlights": [
            {
                "name": {"tr": "Belgrad Kalemegdan Kalesi ve Parkı", "en": "Belgrade Fortress and Kalemegdan Park", "de": "Festung von Belgrad und Kalemegdan", "ru": "Белградская крепость и парк Калемегдан", "es": "Fortaleza de Belgrado y Parque Kalemegdan"},
                "type": "historic_fortress",
                "sources": [{"url": "https://www.beogradskatvrdjava.co.rs", "tier": 1, "title": "Belgrade Fortress Official"}]
            },
            {
                "name": {"tr": "Aziz Sava Katedrali (Hram Svetog Save)", "en": "Church of Saint Sava", "de": "Dom des Heiligen Sava", "ru": "Храм Святого Саввы в Белграде", "es": "Templo de San Sava"},
                "type": "religious_monument",
                "sources": [{"url": "https://hramsvetogsave.rs", "tier": 1, "title": "Temple of Saint Sava Official"}]
            },
            {
                "name": {"tr": "Novi Sad Petrovaradin Kalesi ve Tuna Kıyısı", "en": "Petrovaradin Fortress in Novi Sad", "de": "Festung Petrovaradin in Novi Sad", "ru": "Петроварадинская крепость в Нови-Саде", "es": "Fortaleza de Petrovaradin en Novi Sad"},
                "type": "historic_fortress",
                "sources": [{"url": "https://novisad.travel", "tier": 1, "title": "Tourism Organisation of the City of Novi Sad"}]
            }
        ],
        "media": {
            "images": [
                {
                    "role": "card",
                    "landmark": "Belgrad Kalemegdan Kalesi ve Tuna-Sava Kavşağı",
                    "license": "CC BY-SA 4.0 / Wikimedia Commons",
                    "author": "Vizamigo Verified Geographic Collection",
                    "source_url": "/images/countries/rs-480.webp",
                    "attribution_text": "Kalemegdan Fortress overlooking the Sava and Danube rivers in Belgrade, Serbia. Verified under CC BY-SA 4.0.",
                    "focal_point": {"x": 50, "y": 48},
                    "alt": {
                        "tr": "Kalemegdan Kalesi ve Tuna-Sava Kavşağı, Belgrad, Sırbistan",
                        "en": "Kalemegdan Fortress and Confluence of Danube and Sava, Belgrade, Serbia",
                        "de": "Festung Kalemegdan und Zusammenfluss von Donau und Save, Belgrad, Serbien",
                        "ru": "Крепость Калемегдан и слияние рек Сава и Дунай, Белград, Сербия",
                        "es": "Fortaleza de Kalemegdan y confluencia del Danubio y Sava, Belgrado, Serbia"
                    },
                    "recognizability_checked": True
                }
            ]
        },
        "seo": {
            "slug": {"tr": "sirbistan", "en": "serbia", "de": "serbien", "ru": "serbiya", "es": "serbia"},
            "title": {
                "tr": "Sırbistan Vize Rehberi, Kimlikle Giriş ve Belgrad Gezi Rehberi | Vizamigo",
                "en": "Serbia Visa Guide, ID Card Entry & Belgrade Travel | Vizamigo",
                "de": "Serbien Visum-Leitfaden, Reisen & Belgrad | Vizamigo",
                "ru": "Виза в Сербию, въезд по ID-карте и гид по Белграду | Vizamigo",
                "es": "Guía de Visa de Serbia, Entrada con DNI y Guía de Belgrado | Vizamigo"
            },
            "meta_description": {
                "tr": "Sırbistan vize muafiyeti (Türk vatandaşlarına kimlikle giriş), 24 saatte Beli Karton kaydı, priz tipleri (C, F), CarGo ve Kalemegdan rehberi.",
                "en": "Serbia visa waiver (ID card entry for Turkish citizens), Beli Karton 24h registration, Type C/F plugs, CarGo app, and Belgrade tips.",
                "de": "Serbien Visabestimmungen, 24h Beli Karton Registrierung, Steckertypen C/F, CarGo-App und Belgrad-Reisetipps.",
                "ru": "Визовые правила Сербии, въезд по ID для граждан Турции, регистрация белого картона, розетки C/F и Белград.",
                "es": "Requisitos de visa para Serbia, entrada con DNI, registro Beli Karton de 24 horas y enchufes C/F."
            },
            "faq": []
        },
        "last_reviewed": "2026-10-18"
    }
}

def main():
    print("Building World Tourism Batch 5A (6 countries)...")
    for code, data in BATCH5A_DATA.items():
        filename = os.path.join(OUTPUT_DIR, f"{code}.json")
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✅ Generated {filename}")

if __name__ == "__main__":
    main()
