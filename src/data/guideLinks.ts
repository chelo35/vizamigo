// Ana sayfa ve menü için hafif rehber listesi (tam metin guides.ts içinde, ayrı yüklenir)
export const GUIDE_LINKS: { id: string; icon: string }[] = [{"id": "visa_fees", "icon": "wallet"}, {"id": "visa_appointments", "icon": "cal"}, {"id": "visa_free_tr", "icon": "globe"}, {"id": "id_card_travel", "icon": "user"}, {"id": "schengen_documents", "icon": "doc"}, {"id": "etias", "icon": "passport"}, {"id": "uk_eta", "icon": "passport"}, {"id": "esta", "icon": "passport"}, {"id": "greek_islands_visa", "icon": "ship"}];
export const GUIDE_LABELS: Record<string, Record<string, { t: string; d: string }>> = {
 "tr": {
  "visa_fees": {
   "t": "Vize ücretleri 2026",
   "d": "Schengen 90 €, İngiltere 135 £, Amerika 185 $, Kanada, Çin: ülke ülke ücret ve hizmet bedelleri."
  },
  "visa_appointments": {
   "t": "Vize randevusu ve takip",
   "d": "Hangi ülke hangi merkezle çalışır (VFS, iDATA, BLS, Kosmos), randevu ve takip adresleri."
  },
  "id_card_travel": {
   "t": "Kimlikle gidilen ülkeler",
   "d": "Çipli T.C. kimlikle pasaportsuz gidilebilen ülkeler ve koşulları; Bosna ve Sırbistan'ın durumu."
  },
  "visa_free_tr": {
   "t": "Vizesiz ülkeler 2026",
   "d": "Bordo pasaportla vizesiz, kimlikle, kapıda vize ve e-vizeyle gidilebilen ülkelerin güncel listesi."
  },
  "schengen_documents": {
   "t": "Schengen evrak listesi",
   "d": "Schengen vizesi için gereken evraklar: çalışan, şirket sahibi, öğrenci, emekli ve…"
  },
  "etias": {
   "t": "ETIAS",
   "d": "ETIAS 2026'nın son çeyreğinde başlıyor: kimler başvurmalı, ücreti 20 €, 3 yıl geçerli.…"
  },
  "uk_eta": {
   "t": "İngiltere ETA",
   "d": "İngiltere ETA 25 Şubat 2026'dan beri zorunlu, ücreti 20 £, 2 yıl geçerli. Türk…"
  },
  "esta": {
   "t": "ABD ESTA",
   "d": "ESTA, ABD'nin vize muafiyet programındaki 42 ülke için çevrim içi izni: ücret yaklaşık 40…"
  },
  "greek_islands_visa": {
   "t": "Yunan adaları kapıda vize",
   "d": "Yunan adalarına kapıda (ekspres) vize: Rodos, Kos, Sisam, Midilli, Sakız dahil 12 ada, 7…"
  }
 },
 "en": {
  "visa_fees": {
   "t": "Visa fees 2026",
   "d": "Schengen €90, UK £135, US $185, Canada, China: fees and service charges."
  },
  "visa_appointments": {
   "t": "Visa appointments",
   "d": "Which centre handles each country from Türkiye, booking and tracking addresses."
  },
  "id_card_travel": {
   "t": "Travel with an ID card",
   "d": "Where the Turkish and EU ID cards are accepted instead of a passport, with conditions."
  },
  "visa_free_tr": {
   "t": "Visa-free for Türkiye",
   "d": "Countries Turkish passport holders can visit visa-free, by ID card, on arrival or with an eVisa."
  },
  "schengen_documents": {
   "t": "Schengen document checklist",
   "d": "Documents for a Schengen visa: separate lists for employees, business owners, students,…"
  },
  "etias": {
   "t": "ETIAS",
   "d": "ETIAS starts in the last quarter of 2026: who must apply, the €20 fee, 3-year validity,…"
  },
  "uk_eta": {
   "t": "UK ETA",
   "d": "The UK ETA has been mandatory since 25 February 2026. It costs £20, lasts 2 years and…"
  },
  "esta": {
   "t": "US ESTA",
   "d": "ESTA is the online authorisation for the 42 Visa Waiver Program countries: about $40,…"
  },
  "greek_islands_visa": {
   "t": "Greek islands express visa",
   "d": "Turkish citizens can visit 12 Greek islands with an express visa: up to 7 days, €60 state…"
  }
 },
 "de": {
  "id_card_travel": {
   "t": "Reisen mit Personalausweis",
   "d": "Welche Länder den Personalausweis akzeptieren: EU, Balkan, Türkei, Montenegro 30 Tage."
  },
  "visa_free_tr": {
   "t": "Visumfrei mit türkischem Pass",
   "d": "Visumfreie Länder für türkische Staatsbürger, mit Ausweis, bei Ankunft oder per eVisum."
  },
  "schengen_documents": {
   "t": "Schengen-Dokumentenliste",
   "d": "Unterlagen für das Schengen-Visum: eigene Listen für Angestellte, Unternehmer,…"
  },
  "etias": {
   "t": "ETIAS",
   "d": "ETIAS startet im letzten Quartal 2026: Wer sich anmelden muss, 20 € Gebühr, 3 Jahre…"
  },
  "uk_eta": {
   "t": "UK ETA",
   "d": "Die UK ETA ist seit dem 25. Februar 2026 Pflicht. Sie kostet 20 £, gilt 2 Jahre und deckt…"
  },
  "esta": {
   "t": "US-ESTA",
   "d": "ESTA für die 42 Visa-Waiver-Länder: etwa 40 $, 2 Jahre gültig, Aufenthalt bis 90 Tage. So…"
  },
  "greek_islands_visa": {
   "t": "Express-Visum für griechische Inseln",
   "d": "Türkische Staatsbürger können 12 griechische Inseln mit Express-Visum besuchen: bis zu 7…"
  }
 },
 "es": {
  "id_card_travel": {
   "t": "Viajar con DNI",
   "d": "Países que aceptan el DNI en lugar del pasaporte, con condiciones."
  },
  "visa_free_tr": {
   "t": "Sin visado con pasaporte turco",
   "d": "Países sin visado, con DNI, a la llegada o con eVisa para ciudadanos turcos."
  },
  "schengen_documents": {
   "t": "Documentos del visado Schengen",
   "d": "Documentos para el visado Schengen: listas para empleados, empresarios, estudiantes,…"
  },
  "etias": {
   "t": "ETIAS",
   "d": "ETIAS arranca en el último trimestre de 2026: quién debe solicitarlo, tasa de 20 €,…"
  },
  "uk_eta": {
   "t": "ETA del Reino Unido",
   "d": "La ETA británica es obligatoria desde el 25 de febrero de 2026. Cuesta 20 £, dura 2 años…"
  },
  "esta": {
   "t": "ESTA de EE. UU.",
   "d": "El ESTA para los 42 países del Programa de Exención de Visado: unos 40 $, válido 2 años,…"
  },
  "greek_islands_visa": {
   "t": "Visado exprés para las islas griegas",
   "d": "Los ciudadanos turcos pueden visitar 12 islas griegas con un visado exprés: hasta 7 días,…"
  }
 },
 "ru": {
  "id_card_travel": {
   "t": "Поездки по ID-карте",
   "d": "Куда можно по ID-карте вместо паспорта: турецкая карта и карты ЕС."
  },
  "visa_free_tr": {
   "t": "Безвиз для граждан Турции",
   "d": "Страны без визы, по ID-карте, с визой по прилёте или eVisa для граждан Турции."
  },
  "schengen_documents": {
   "t": "Документы на шенгенскую визу",
   "d": "Документы на шенгенскую визу: отдельные списки для сотрудников, владельцев бизнеса,…"
  },
  "etias": {
   "t": "ETIAS",
   "d": "ETIAS стартует в IV квартале 2026 года: кому нужно оформлять, сбор 20 €, срок действия 3…"
  },
  "uk_eta": {
   "t": "ETA для Великобритании",
   "d": "ETA для Великобритании обязательна с 25 февраля 2026 г. Стоит 20 £, действует 2 года,…"
  },
  "esta": {
   "t": "ESTA для США",
   "d": "ESTA — онлайн-разрешение для 42 стран Программы безвизового въезда: около 40 $, действует…"
  },
  "greek_islands_visa": {
   "t": "Экспресс-виза на греческие острова",
   "d": "Граждане Турции могут посетить 12 греческих островов по экспресс-визе: до 7 дней,…"
  }
 }
};
