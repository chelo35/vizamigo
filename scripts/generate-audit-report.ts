import fs from 'fs';
import path from 'path';

interface AuditRawRecord {
  code: string;
  nameTr: string;
  nameEn: string;
  landmark: string;
  url: string;
  photoId: string;
  httpStatus: number;
  contentType: string;
  byteSize: number;
  width: number;
  height: number;
  dHash: string;
  dupGroupId: string;
  dupCount: number;
  dupCountries: string[];
}

interface ClassifiedRecord extends AuditRawRecord {
  classification: 'OK' | 'YANLIŞ_YER' | 'ALAKASIZ' | 'TEKRAR' | 'ÖLÜ' | 'DÜŞÜK_KALİTE' | 'BELİRSİZ';
  reason: string;
}

// 1. Load raw data
const rawData: AuditRawRecord[] = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'audit_raw.json'), 'utf-8')
);

// Map of unique country classifications and justifications
const UNIQUE_CLASSIFICATIONS: Record<string, { cls: 'OK' | 'YANLIŞ_YER' | 'ALAKASIZ' | 'DÜŞÜK_KALİTE' | 'BELİRSİZ'; reason: string }> = {
  AD: { cls: 'ALAKASIZ', reason: 'Kadehler tokuşturan parti ortamı (içki bardağı yakın plan çekim; Andorra veya sembol dağ manzarası değil)' },
  AF: { cls: 'YANLIŞ_YER', reason: 'Maldivler tarzı tropik deniz üstü su villaları (Denize kıyısı olmayan dağlık Afganistan için tamamen yanlış yer)' },
  AG: { cls: 'YANLIŞ_YER', reason: 'Bahamalar Nassau kruvaziyer limanı ve dev yolcu gemileri (Antigua ve Barbuda koyu değil)' },
  AL: { cls: 'YANLIŞ_YER', reason: 'İsviçre Alpleri "Null Stern" açık hava yatağı enstalasyonu (Arnavutluk değil)' },
  AM: { cls: 'OK', reason: 'Ermenistan tarihi taş manastırı/katedrali (Hovhannavank / Saghmosavank mimarisi)' },
  AT: { cls: 'OK', reason: 'Hallstatt gölü ve tarihi Alpler köyü manzarası' },
  AZ: { cls: 'ALAKASIZ', reason: 'Kafeterya / restoran içi boş masalar ve sandalyeler (Bakü Alev Kuleleri veya Hazar kıyısı değil)' },
  BA: { cls: 'OK', reason: 'Mostar Tarihi Köprüsü ve Neretva Nehri' },
  BD: { cls: 'ALAKASIZ', reason: 'Vintage Olympia daktilo ve üzerinde "News" yazan kâğıt (Bangladeş Sundarbans deltası değil)' },
  BE: { cls: 'OK', reason: 'Brugge tarihi kanalları ve Orta Çağ mimarisi' },
  BG: { cls: 'ALAKASIZ', reason: 'Asfalt yolda duran modifiyeli Nissan GT-R spor araba (Bulgaristan tarihi/doğası değil)' },
  BR: { cls: 'OK', reason: 'Rio de Janeiro Sugarloaf Dağı ve Guanabara Körfezi' },
  BT: { cls: 'YANLIŞ_YER', reason: 'Horseshoe Bend, Arizona, ABD ve sırt çantalı turist (Himalaya krallığı Butan ve Kaplan Yuvası değil)' },
  BY: { cls: 'ALAKASIZ', reason: 'Üzerinde "404" yazan otel kapısı ve elektronik tuşlu kilit' },
  CA: { cls: 'OK', reason: 'Banff Ulusal Parkı Moraine Gölü ve Kanada Kayalık Dağları yansıması' },
  CH: { cls: 'OK', reason: 'Lauterbrunnen vadisi, Staubbach şelalesi ve İsviçre ahşap dağ evleri' },
  CN: { cls: 'OK', reason: 'Çin Seddi ve sonbahar tepeleri' },
  CO: { cls: 'OK', reason: 'Cartagena de Indias tarihi rengarenk kolonyal evleri ve sokakları' },
  CU: { cls: 'YANLIŞ_YER', reason: 'Nevada/Utah çöl vadisi otoyolu (Havana Malecón veya Viñales vadisi değil)' },
  CY: { cls: 'ALAKASIZ', reason: 'Quebec rock festivali açık hava konseri sahnesi ve kalabalık (Cape Greco kıyıları değil)' },
  CZ: { cls: 'OK', reason: 'Prag Karl Köprüsü ve tarihi Prag Kalesi manzarası' },
  DE: { cls: 'OK', reason: 'Berlin Brandenburg Kapısı ve Pariser Platz' },
  DK: { cls: 'OK', reason: 'Kopenhag Nyhavn tarihi limanı ve renkli cepheli evleri' },
  EE: { cls: 'ALAKASIZ', reason: 'Havaalanı apronunda park halinde Airbus A340 yolcu uçağı (Tallinn Eski Şehri değil)' },
  ES: { cls: 'OK', reason: 'Barselona Sagrada Familia Bazilikası' },
  ET: { cls: 'DÜŞÜK_KALİTE', reason: 'Tamamen odak dışı bulanık mavi-turuncu bokeh lekesi (hiçbir nesne görünmüyor)' },
  FI: { cls: 'OK', reason: 'Laponya karlı çam ormanı ve parlayan Kuzey Işıkları (Aurora)' },
  FR: { cls: 'OK', reason: 'Paris Eyfel Kulesi ve Seine Nehri manzarası' },
  GB: { cls: 'OK', reason: 'Londra Big Ben saat kulesi ve kırmızı çift katlı otobüs' },
  GE: { cls: 'ALAKASIZ', reason: 'Vinçlerin çalıştığı jenerik yüksek katlı inşaat şantiyesi (Gergeti Trinity Kilisesi ve Kazbek Dağı değil)' },
  GR: { cls: 'OK', reason: 'Santorini Oia beyaz evleri, mavi kubbeler ve kaldera manzarası' },
  HR: { cls: 'OK', reason: 'Dubrovnik tarihi şehir surları ve Adriyatik Denizi' },
  HU: { cls: 'OK', reason: 'Budapeşte Parlamento Binası ve Tuna Nehri' },
  ID: { cls: 'OK', reason: 'Bali Ulun Danu Beratan Su Tapınağı ve göl yansıması' },
  IE: { cls: 'OK', reason: 'Moher Falezleri ve Atlantik Okyanusu' },
  IN: { cls: 'OK', reason: 'Tac Mahal, Agra (Hindistan için doğru orijinal kayıt)' },
  IR: { cls: 'OK', reason: 'İsfahan Hacı Köprüsü (Si-o-se-pol) gece ışıklandırması' },
  IS: { cls: 'ALAKASIZ', reason: 'İpe dizilmiş plastik oyuncak maymunlar (Barrel of Monkeys; İzlanda doğası değil)' },
  IT: { cls: 'OK', reason: 'Roma Kolezyumu ve Amalfi Kıyıları' },
  JO: { cls: 'ALAKASIZ', reason: 'Muz soyan maymun yakın plan çekimi (Petra Hazine Binası El-Hazne veya Wadi Rum değil)' },
  JP: { cls: 'OK', reason: 'Kyoto Yasaka Pagodası ve geleneksel kimono giymiş kadınlar' },
  KH: { cls: 'OK', reason: 'Angkor Wat tapınak kompleksi ve göl yansıması (Kamboçya için doğru orijinal kayıt)' },
  KR: { cls: 'BELİRSİZ', reason: 'Korece neon tabelalı Seul gece sokağı (Modern Seul atmosferi taşıyor ancak landmark Gyeongbokgung Sarayı değil)' },
  KZ: { cls: 'YANLIŞ_YER', reason: 'Tropik palmiyeli lüks otel havuzu ve gökdelen (Kazakistan bozkır veya Charyn kanyonu değil)' },
  LK: { cls: 'ALAKASIZ', reason: 'Sonsuzluk havuzunda yüzen kahvaltı tepsileri (Sigiriya Aslan Kayası değil)' },
  LT: { cls: 'YANLIŞ_YER', reason: 'Marakeş Cemaa el-Fnaa medinası, Fas (Litvanya Trakai Kalesi değil)' },
  LU: { cls: 'YANLIŞ_YER', reason: 'CEC Sarayı, Bükreş, Romanya (Lüksemburg Grund vadisi değil)' },
  LV: { cls: 'OK', reason: 'Riga Karabaşlar Evi (House of the Blackheads) meydanı' },
  MA: { cls: 'OK', reason: 'Geleneksel Fas zellij mozaikli duvar çeşmesi' },
  MC: { cls: 'YANLIŞ_YER', reason: 'Moskova City gökdelenleri, Rusya (Monako Monte Carlo limanı değil)' },
  ME: { cls: 'OK', reason: 'Kotor Körfezi fiyordu ve Sveti Stefan kıyıları' },
  MK: { cls: 'YANLIŞ_YER', reason: 'Mount Cook / Aoraki, Yeni Zelanda (Kuzey Makedonya Ohri Gölü değil)' },
  MN: { cls: 'YANLIŞ_YER', reason: 'Berlin Fernsehturm TV kulesi ve gece şehir silüeti, Almanya (Moğolistan Gobi çölü değil)' },
  MO: { cls: 'ALAKASIZ', reason: 'Yıldızlı samanyolu ve ayna gibi göl üzerinde yelkenli illüstrasyonu (Makao değil)' },
  MT: { cls: 'ALAKASIZ', reason: 'Paris Louvre Müzesi iç galeri salonu (Malta Valletta Limanı değil)' },
  MV: { cls: 'OK', reason: 'Maldivler atolü ve turkuaz lagünde Soneva su villaları' },
  MY: { cls: 'YANLIŞ_YER', reason: 'Bali Ulun Danu Beratan Su Tapınağı, Endonezya (Malezya Petronas Kuleleri değil)' },
  NL: { cls: 'OK', reason: 'Amsterdam tarihi kanalları ve bisikletler' },
  NO: { cls: 'OK', reason: 'Norveç Geirangerfjord fiyortları ve dağları' },
  NZ: { cls: 'YANLIŞ_YER', reason: 'Arches Ulusal Parkı, Utah, ABD ve sarı karavan (Yeni Zelanda Milford Sound fiyordu değil)' },
  PE: { cls: 'OK', reason: 'Machu Picchu Antik İnka Kenti ve And Dağları' },
  PL: { cls: 'OK', reason: 'Krakow Ana Pazar Meydanı ve Meryem Ana Bazilikası' },
  PT: { cls: 'YANLIŞ_YER', reason: 'Sevilla Katedrali ve Giralda Kulesi, İspanya (Lizbon Belem Kulesi veya Algarve değil)' },
  RO: { cls: 'OK', reason: 'Peleș Şatosu ve Karpat Dağları' },
  RU: { cls: 'OK', reason: 'Moskova Kızıl Meydan ve Aziz Vasil Katedrali kubbeleri' },
  SE: { cls: 'OK', reason: 'Stockholm Gamla Stan renkli binaları ve sahil' },
  SK: { cls: 'ALAKASIZ', reason: 'Modern beyaz mutfak adası, tabureler ve saksı bitkisi (Slovakya Yüksek Tatralar değil)' },
  SM: { cls: 'OK', reason: 'San Marino Titano Dağı üzerindeki Guaita Kalesi kulesi' },
  TR: { cls: 'OK', reason: 'İstanbul Galata Kulesi, uçuşan martılar ve tarihi yarımada' },
  UA: { cls: 'OK', reason: 'Kiev Peçersk Lavrası Büyük Çan Kulesi ve akşam şehir silüeti' },
  US: { cls: 'YANLIŞ_YER', reason: 'Odaiba, Tokyo, Japonya sahilindeki replika Özgürlük Heykeli (New York, ABD orijinali değil)' },
  UZ: { cls: 'OK', reason: 'Semerkant Registan Meydanı ve tarihi medreseler' },
  VA: { cls: 'YANLIŞ_YER', reason: 'Pisa Kulesi, İtalya (Vatikan Aziz Petrus Bazilikası değil)' },
  XK: { cls: 'DÜŞÜK_KALİTE', reason: 'Soluk, karanlık varoş yerleşimi ve boş futbol sahası (Prizren Kalesi veya Sinan Paşa Camii değil)' },
  YE: { cls: 'OK', reason: 'Sokotra Adası Ejderha Kanı Ağaçları (Dragon Blood Trees) günbatımı' }
};

// Map of duplicate group justifications
const DUP_GROUP_REASONS: Record<string, string> = {
  'TEKRAR-01': 'Jenerik turkuaz deniz dalgası fotoğrafı; 24 ülkede kopyalanmış (Karayip adalarının yanı sıra denize kıyısı olmayan Burundi, Malavi ve Alplerdeki Slovenya için bile kullanılmış!)',
  'TEKRAR-02': 'Jenerik savan ağacı günbatımı silüeti; 22 farklı Afrika ülkesinde birebir kopyalanmış',
  'TEKRAR-03': 'Tac Mahal, Agra, Hindistan fotoğrafı; Türkmenistan, Irak, Katar, Tunus ve 11 Afrika ülkesinde (toplam 15 ülke) kopyalanmış!',
  'TEKRAR-04': 'Sisli kuzey çam ormanı manzarası; Sahra çölü (Cezayir, Libya, Çad, Nijer), Atacama çölü (Şili), Salar de Uyuni (Bolivya) ve Kuzey Kore dahil 14 ülkede kopyalanmış',
  'TEKRAR-05': 'Kozmetik şampuan/losyon şişesi, havlu ve mum içeren spa banyo fotoğrafı; 9 Pasifik ada ülkesinde (Fiji, Kiribati, Tuvalu vb.) kopyalanmış',
  'TEKRAR-06': 'Angkor Wat tapınağı yansıma havuzu (Kamboçya); Laos, Filipinler ve Doğu Timor için kopyalanmış',
  'TEKRAR-07': 'Angkor Wat tapınağı yansıma havuzu (Kamboçya); Doğu Timor ve Laos için tekrar',
  'TEKRAR-08': 'Halong Körfezi karst adaları (Vietnam); Tayland ve Myanmar için kopyalanmış',
  'TEKRAR-09': 'Yosemite Vadisi, Kaliforniya, ABD; Lihtenştayn, Myanmar ve Tacikistan için kopyalanmış',
  'TEKRAR-10': 'Ağaç dalında sarkan kırmızı elmalar; Bahreyn, Umman ve Brunei için kopyalanmış',
  'TEKRAR-11': 'Soyut boya lekesi ve çizik tuval dokusu; İsrail, Kuveyt ve Filistin için kopyalanmış',
  'TEKRAR-12': 'Yağmurlu havada yol bisikleti yarışı (Tour de France stili); Arjantin, Paraguay ve Uruguay için kopyalanmış',
  'TEKRAR-13': '1924 Montreal "Winter Sports" vintage turizm afişi; Sırbistan ve Moldova için kopyalanmış',
  'TEKRAR-14': 'Bulutlu jenerik dağ zirveleri; Kırgızistan ve Moğolistan için tekrar',
  'TEKRAR-15': 'Tikal Maya piramidi (Guatemala); Guatemala ve Honduras için kopyalanmış',
  'TEKRAR-16': 'Panama City modern körfez silüeti; Panama ve Nikaragua için kopyalanmış',
  'TEKRAR-17': 'Tropik yağmur ormanı nehir manzarası; Surinam ve Fransız Guyanası için tekrar',
  'TEKRAR-18': 'Günbatımında çöl kum tepeleri; Suudi Arabistan ve Umman için tekrar',
  'TEKRAR-19': 'Plastik anime figürü oyuncağı (Evangelion robotu); Lübnan ve Nijerya için kopyalanmış!',
  'TEKRAR-20': 'Lahor Padişah Camii (Pakistan); Pakistan ve Bangladeş için tekrar',
  'TEKRAR-21': 'Sidney Opera Binası (Avustralya); Avustralya ve Güney Afrika için kopyalanmış!'
};

// 2. Classify each record
const classifiedRecords: ClassifiedRecord[] = rawData.map((rec) => {
  if (rec.httpStatus === 0 || rec.httpStatus >= 400) {
    return {
      ...rec,
      classification: 'ÖLÜ',
      reason: `HTTP ${rec.httpStatus} hatası, görsel yüklenemedi.`
    };
  }

  // Duplicate group handling
  if (rec.dupCount > 1) {
    const grpReason = DUP_GROUP_REASONS[rec.dupGroupId] || `${rec.dupCount} ülkede aynı görsel kopyalanmış.`;
    return {
      ...rec,
      classification: 'TEKRAR',
      reason: `[${rec.dupGroupId} Grubu]: ${grpReason} (Tekrar eden ülkeler: ${rec.dupCountries.join(', ')})`
    };
  }

  // Unique country handling
  const uniqueInfo = UNIQUE_CLASSIFICATIONS[rec.code];
  if (uniqueInfo) {
    return {
      ...rec,
      classification: uniqueInfo.cls,
      reason: uniqueInfo.reason
    };
  }

  return {
    ...rec,
    classification: 'BELİRSİZ',
    reason: 'Görsel içeriği şüpheli veya tam doğrulanamadı.'
  };
});

// 3. Tally counts
const tally: Record<string, number> = {
  OK: 0,
  TEKRAR: 0,
  YANLIŞ_YER: 0,
  ALAKASIZ: 0,
  DÜŞÜK_KALİTE: 0,
  BELİRSİZ: 0,
  ÖLÜ: 0
};

classifiedRecords.forEach((r) => {
  tally[r.classification] = (tally[r.classification] || 0) + 1;
});

console.log('📊 Sınıflandırma Özeti (199 Ülke):');
console.table(tally);

// 4. Generate audit.csv
const csvHeader = 'Ülke Kodu,Ülke Adı (TR),Ülke Adı (EN),Belirlenen Sembol,Görsel URL,HTTP Durumu,Boyut (px),Perceptual Hash (dHash),Sınıf,Tekrar Grubu,Tekrar Sayısı,Gerekçe\n';
const csvRows = classifiedRecords.map((r) => {
  const cleanReason = r.reason.replace(/"/g, '""');
  const cleanLandmark = r.landmark.replace(/"/g, '""');
  return `"${r.code}","${r.nameTr}","${r.nameEn}","${cleanLandmark}","${r.url}",${r.httpStatus},"${r.width}x${r.height}","${r.dHash}","${r.classification}","${r.dupGroupId}",${r.dupCount},"${cleanReason}"`;
}).join('\n');

const csvPath = path.join(process.cwd(), 'audit.csv');
fs.writeFileSync(csvPath, '\uFEFF' + csvHeader + csvRows, 'utf-8'); // UTF-8 with BOM for Excel
console.log(`✅ audit.csv yazıldı (${classifiedRecords.length} satır): ${csvPath}`);

// 5. Generate audit.html
const htmlContent = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vizamigo 199 Ülke Görsel Denetimi (Faz 0 Raporu)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #090d16;
      --card-bg: #111827;
      --border: #1f2937;
      --text: #f3f4f6;
      --text-muted: #9ca3af;
      --ok: #10b981;
      --tekrar: #3b82f6;
      --yanlis: #f59e0b;
      --alakasiz: #ef4444;
      --kalite: #8b5cf6;
      --belirsiz: #6b7280;
      --olu: #dc2626;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background: var(--bg);
      color: var(--text);
      padding: 32px 24px;
      line-height: 1.5;
    }
    .header {
      max-width: 1400px;
      margin: 0 auto 32px;
    }
    .badge-top {
      display: inline-block;
      padding: 4px 12px;
      background: rgba(59, 130, 246, 0.15);
      color: #60a5fa;
      border: 1px solid rgba(59, 130, 246, 0.3);
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    h1 {
      font-size: 32px;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 8px;
    }
    .subtitle {
      color: var(--text-muted);
      font-size: 15px;
      max-width: 900px;
    }
    
    /* Stats Cards */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
      max-width: 1400px;
      margin: 0 auto 32px;
    }
    .stat-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 18px 20px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .stat-card:hover, .stat-card.active {
      transform: translateY(-2px);
      border-color: rgba(255, 255, 255, 0.2);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
    }
    .stat-num {
      font-size: 28px;
      font-weight: 800;
      margin-bottom: 4px;
    }
    .stat-label {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-muted);
    }
    .stat-pct {
      font-size: 12px;
      color: var(--text-muted);
      margin-top: 4px;
    }

    /* Filters Bar */
    .controls {
      max-width: 1400px;
      margin: 0 auto 24px;
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
      justify-content: space-between;
    }
    .search-input {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 10px 16px;
      color: var(--text);
      font-size: 14px;
      width: 320px;
      outline: none;
      transition: border-color 0.2s;
    }
    .search-input:focus {
      border-color: #3b82f6;
    }
    .filter-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .pill {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 6px 14px;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.15s;
    }
    .pill:hover, .pill.active {
      color: #fff;
      background: #1f2937;
      border-color: #374151;
    }
    .pill.active[data-filter="OK"] { background: var(--ok); color: #000; border-color: var(--ok); }
    .pill.active[data-filter="TEKRAR"] { background: var(--tekrar); color: #fff; border-color: var(--tekrar); }
    .pill.active[data-filter="YANLIŞ_YER"] { background: var(--yanlis); color: #000; border-color: var(--yanlis); }
    .pill.active[data-filter="ALAKASIZ"] { background: var(--alakasiz); color: #fff; border-color: var(--alakasiz); }
    .pill.active[data-filter="DÜŞÜK_KALİTE"] { background: var(--kalite); color: #fff; border-color: var(--kalite); }
    .pill.active[data-filter="BELİRSİZ"] { background: var(--belirsiz); color: #fff; border-color: var(--belirsiz); }

    /* Table */
    .table-container {
      max-width: 1400px;
      margin: 0 auto;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    }
    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 14px;
    }
    th {
      background: #0d131f;
      padding: 14px 18px;
      font-size: 12px;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid var(--border);
    }
    td {
      padding: 16px 18px;
      border-bottom: 1px solid #1a2234;
      vertical-align: middle;
    }
    tr:hover td {
      background: rgba(255, 255, 255, 0.02);
    }
    
    .country-cell {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .country-code {
      font-size: 13px;
      font-weight: 800;
      background: #1e293b;
      padding: 3px 8px;
      border-radius: 6px;
      color: #93c5fd;
      letter-spacing: 0.05em;
    }
    .country-name {
      font-weight: 700;
      color: #fff;
    }
    .country-en {
      font-size: 12px;
      color: var(--text-muted);
    }
    
    .img-preview {
      width: 100px;
      height: 65px;
      object-fit: cover;
      border-radius: 8px;
      background: #000;
      border: 1px solid var(--border);
      transition: transform 0.2s;
    }
    .img-preview:hover {
      transform: scale(2.2);
      z-index: 100;
      box-shadow: 0 10px 30px rgba(0,0,0,0.8);
      position: relative;
    }

    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .badge-OK { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); }
    .badge-TEKRAR { background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }
    .badge-YANLIŞ_YER { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3); }
    .badge-ALAKASIZ { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.3); }
    .badge-DÜŞÜK_KALİTE { background: rgba(139, 92, 246, 0.15); color: #c084fc; border: 1px solid rgba(139, 92, 246, 0.3); }
    .badge-BELİRSİZ { background: rgba(107, 114, 128, 0.15); color: #9ca3af; border: 1px solid rgba(107, 114, 128, 0.3); }
    .badge-ÖLÜ { background: rgba(220, 38, 38, 0.2); color: #fca5a5; border: 1px solid rgba(220, 38, 38, 0.4); }

    .reason-text {
      font-size: 13px;
      color: #e5e7eb;
      max-width: 420px;
    }
    .landmark-tag {
      font-size: 11px;
      color: #9ca3af;
      margin-top: 4px;
      display: block;
    }
    .dup-tag {
      font-size: 11px;
      font-weight: 700;
      color: #60a5fa;
      background: rgba(59, 130, 246, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
      display: inline-block;
      margin-top: 4px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="badge-top">Vizamigo Ülke Görselleri Denetimi — Faz 0</div>
    <h1>199 Ülke Fotoğrafı Kalite, Tekrar ve Doğruluk Raporu</h1>
    <p class="subtitle">
      <code>src/data/countryVisuals.ts</code> içindeki tüm 199 ülke fotoğrafı; HTTP başlıkları, perceptual dHash (farklılık özetleme), kopya kümeleme ve görsel içerik analiziyle taranmıştır.
    </p>
  </div>

  <div class="stats-grid">
    <div class="stat-card" data-filter="ALL">
      <div class="stat-num" style="color: #fff;">199</div>
      <div class="stat-label">Toplam Ülke</div>
      <div class="stat-pct">%100 Tam Kapsam</div>
    </div>
    <div class="stat-card" data-filter="OK" style="border-left: 4px solid var(--ok);">
      <div class="stat-num" style="color: var(--ok);">${tally.OK}</div>
      <div class="stat-label">✅ Doğru & Geçerli (OK)</div>
      <div class="stat-pct">%${((tally.OK / 199) * 100).toFixed(1)} Başarı</div>
    </div>
    <div class="stat-card" data-filter="TEKRAR" style="border-left: 4px solid var(--tekrar);">
      <div class="stat-num" style="color: var(--tekrar);">${tally.TEKRAR}</div>
      <div class="stat-label">🔄 Tekrar / Kopya Kümesi</div>
      <div class="stat-pct">%${((tally.TEKRAR / 199) * 100).toFixed(1)} Tekrar Eden</div>
    </div>
    <div class="stat-card" data-filter="YANLIŞ_YER" style="border-left: 4px solid var(--yanlis);">
      <div class="stat-num" style="color: var(--yanlis);">${tally.YANLIŞ_YER}</div>
      <div class="stat-label">📍 Yanlış Ülke / Şehir</div>
      <div class="stat-pct">%${((tally.YANLIŞ_YER / 199) * 100).toFixed(1)} Hatalı Konum</div>
    </div>
    <div class="stat-card" data-filter="ALAKASIZ" style="border-left: 4px solid var(--alakasiz);">
      <div class="stat-num" style="color: var(--alakasiz);">${tally.ALAKASIZ}</div>
      <div class="stat-label">❌ Alakasız (Afiş, Eşya, Araç)</div>
      <div class="stat-pct">%${((tally.ALAKASIZ / 199) * 100).toFixed(1)} Uygunsuz</div>
    </div>
    <div class="stat-card" data-filter="DÜŞÜK_KALİTE" style="border-left: 4px solid var(--kalite);">
      <div class="stat-num" style="color: var(--kalite);">${tally.DÜŞÜK_KALİTE}</div>
      <div class="stat-label">⚠️ Düşük Kalite / Bulanık</div>
      <div class="stat-pct">%${((tally.DÜŞÜK_KALİTE / 199) * 100).toFixed(1)}</div>
    </div>
    <div class="stat-card" data-filter="BELİRSİZ" style="border-left: 4px solid var(--belirsiz);">
      <div class="stat-num" style="color: var(--belirsiz);">${tally.BELİRSİZ}</div>
      <div class="stat-label">❓ Belirsiz</div>
      <div class="stat-pct">%${((tally.BELİRSİZ / 199) * 100).toFixed(1)}</div>
    </div>
  </div>

  <div class="controls">
    <input type="text" id="searchInput" class="search-input" placeholder="Ülke kodu veya adı ile filtrele...">
    <div class="filter-pills">
      <button class="pill active" data-filter="ALL">Tümü (199)</button>
      <button class="pill" data-filter="OK">OK (${tally.OK})</button>
      <button class="pill" data-filter="TEKRAR">Tekrar (${tally.TEKRAR})</button>
      <button class="pill" data-filter="YANLIŞ_YER">Yanlış Yer (${tally.YANLIŞ_YER})</button>
      <button class="pill" data-filter="ALAKASIZ">Alakasız (${tally.ALAKASIZ})</button>
      <button class="pill" data-filter="DÜŞÜK_KALİTE">Düşük Kalite (${tally.DÜŞÜK_KALİTE})</button>
      <button class="pill" data-filter="BELİRSİZ">Belirsiz (${tally.BELİRSİZ})</button>
    </div>
  </div>

  <div class="table-container">
    <table id="auditTable">
      <thead>
        <tr>
          <th>Ülke</th>
          <th>Önizleme</th>
          <th>Durum & Sınıf</th>
          <th>Belirlenen Landmark & Gerekçe</th>
          <th>Teknik Detay</th>
        </tr>
      </thead>
      <tbody>
        ${classifiedRecords.map((r) => `
        <tr data-class="${r.classification}" data-text="${r.code} ${r.nameTr.toLowerCase()} ${r.nameEn.toLowerCase()} ${r.landmark.toLowerCase()}">
          <td>
            <div class="country-cell">
              <span class="country-code">${r.code}</span>
              <div>
                <div class="country-name">${r.nameTr}</div>
                <div class="country-en">${r.nameEn}</div>
              </div>
            </div>
          </td>
          <td>
            <a href="${r.url}" target="_blank" rel="noreferrer">
              <img src="${r.url}&w=160&q=70" class="img-preview" alt="${r.nameTr}" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%2265%22><rect width=%22100%22 height=%2265%22 fill=%22%23222%22/><text x=%2250%22 y=%2235%22 fill=%22%23777%22 font-size=%2210%22 text-anchor=%22middle%22>Yüklenemedi</text></svg>'">
            </a>
          </td>
          <td>
            <span class="badge badge-${r.classification}">${r.classification.replace('_', ' ')}</span>
            ${r.dupGroupId ? `<br><span class="dup-tag">${r.dupGroupId} (${r.dupCount} Ülke)</span>` : ''}
          </td>
          <td>
            <div class="reason-text">${r.reason}</div>
            <span class="landmark-tag">🎯 Hedeflenen: ${r.landmark}</span>
          </td>
          <td style="font-size: 12px; color: var(--text-muted); font-family: monospace;">
            HTTP: <strong style="color: ${r.httpStatus === 200 ? '#34d399' : '#f87171'}">${r.httpStatus}</strong><br>
            Boyut: ${r.width}x${r.height}<br>
            dHash: ${r.dHash.substring(0, 8)}...
          </td>
        </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <script>
    const searchInput = document.getElementById('searchInput');
    const pills = document.querySelectorAll('.pill, .stat-card');
    const rows = document.querySelectorAll('#auditTable tbody tr');
    let currentFilter = 'ALL';

    function filterTable() {
      const q = searchInput.value.toLowerCase().trim();
      rows.forEach(row => {
        const rowClass = row.getAttribute('data-class');
        const rowText = row.getAttribute('data-text');
        const matchesFilter = currentFilter === 'ALL' || rowClass === currentFilter;
        const matchesSearch = !q || rowText.includes(q);
        if (matchesFilter && matchesSearch) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    }

    searchInput.addEventListener('input', filterTable);

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        const filter = pill.getAttribute('data-filter');
        if (!filter) return;
        currentFilter = filter;
        document.querySelectorAll('.pill').forEach(p => {
          if (p.getAttribute('data-filter') === filter) {
            p.classList.add('active');
          } else {
            p.classList.remove('active');
          }
        });
        filterTable();
      });
    });
  </script>
</body>
</html>`;

const htmlPath = path.join(process.cwd(), 'audit.html');
fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
console.log(`✅ audit.html yazıldı: ${htmlPath}`);
