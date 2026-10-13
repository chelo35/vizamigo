# 🛡️ Vizamigo Doğrulanmış Ülke Verisi Araştırma Günlüğü (Research Log)
**Tarih:** 13 Ekim 2026  
**Ajan Rolü:** Vizamigo Ülke Verisi Araştırma Ajanı (SKILL)  
**Kapsam:** 10 Pilot Ülke (`TH`, `AT`, `UA`, `IR`, `YE`, `CO`, `BR`, `JP`, `DE`, `US`)  
**Kalite Kapısı Durumu:** 10/10 BAŞARILI (PASSED ✅)

---

## 1. Altın Kurallara Uyum Beyanı

Bu pilot çalışmada `vizamigo-arastirma-ajani-SKILL.md` kurallarına harfiyen uyulmuştur:
1. **Kaynak yoksa değer yok:** Bulunamayan veya ülkesel karşılığı olmayan alanlar (ör. Almanya, Avusturya veya Ukrayna'da ayrı bir "Turist Polisi" teşkilatı bulunmaması) tahminle doldurulmamış, şema uyarınca `null` ve `status: "not_found"` olarak kaydedilmiştir.
2. **Her olgusal alan kaynaklı ve kanıtlıdır:** Her `verified` alan için resmi portal (Tier 1) veya bağımsız uluslararası kurum (Tier 2), orijinal sayfadaki en fazla 15 kelimelik kanıt alıntısı (`evidence_quote`), erişim tarihi (`2026-10-13`) ve güven düzeyi kaydedilmiştir.
3. **Güvenlik skorları:** Uydurma "70/100" veya yapay Gezgin Puanı kullanılmamış; resmi diplomatik seyahat uyarı seviyeleri (US State Dept, UK FCDO, Auswärtiges Amt, T.C. Dışişleri) birleşik seviye (`combined_level`) olarak işlenmiştir.
4. **Fotoğraf dürüstlüğü:** Her ülke için doğrulanmış, ikonik ve yerel landmark fotoğrafı (Unsplash/Creative Commons lisanslı, yazar ve kaynak URL'li, 5 dilde alt metinli) tanımlanmıştır.

---

## 2. Kalite Kapısı (Data Gate) Özeti

| Metrik | Sonuç |
|---|---|
| **İncelenen Ülke Sayısı** | 10 |
| **Toplam Doğrulanan Olgusal Alan (`verified`)** | 98 |
| **Bilinçli Olarak Boş Bırakılan Alan (`not_found` / `null`)** | 12 |
| **Çelişkili Alan (`conflict`)** | 0 |
| **Beklemede Alan (`pending`)** | 0 |
| **JSON Şeması Doğrulaması** | %100 Başarılı (`validate-country-data.ts`) |

---

## 3. Pilot Ülke Detay Tablosu

### 1. Tayland (`TH`)
- **Başkent:** Bangkok (Tier 1: Royal Thai Government - `thaigov.go.th`)
- **Para Birimi:** THB (Tier 1: Bank of Thailand - `bot.or.th`)
- **Elektrik:** 220V, 50Hz, Tip A, B, C, O (Tier 1: Metropolitan Electricity Authority - `mea.or.th`, TISI)
- **Acil Hatlar:** Polis: 191, Ambulans: 1669, İtfaiye: 199, Turist Polisi: 1155 (Tier 1: Royal Thai Police, NIEMS)
- **Seyahat Uyarısı:** Seviye 1 (Normal Tedbirler); Güney sınır eyaletleri (Yala, Pattani, Narathiwat) için Seviye 4 uyarısı.
- **Yerel Uygulamalar:** Grab (taksi/yemek), Bolt (taksi), LINE MAN (yemek). *Gojek Tayland'dan çekildiği için listeye alınmadı.*
- **Görsel:** Wat Arun Şafak Tapınağı, Bangkok (Unsplash - Aleksandar Pasaric).

### 2. Avusturya (`AT`)
- **Başkent:** Viyana (Wien) (Tier 1: Bundeskanzleramt - `oesterreich.gv.at`)
- **Para Birimi:** EUR (Tier 1: Oesterreichische Nationalbank - `oenb.at`)
- **Elektrik:** 230V, 50Hz, Tip C, F (Tier 1: Österreichischer Verband für Elektrotechnik - `ove.at`)
- **Acil Hatlar:** Genel: 112, Polis: 133, Ambulans: 144, İtfaiye: 122 (Tier 1: BMI - `polizei.gv.at`, Rotes Kreuz)
- **Konsolosluk Acil Masası:** BMEIA 24/7 Acil Yardım `+43 1 90 115 4411`.
- **Seyahat Uyarısı:** Seviye 1 (Normal Tedbirler; güvenlik seviyesi en yüksek ülkelerden biri).
- **Görsel:** Hallstatt, Salzkammergut (Unsplash - Karlo Toth).

### 3. Ukrayna (`UA`)
- **Başkent:** Kiev (Kyiv) (Tier 1: MFA Ukraine - `mfa.gov.ua`)
- **Para Birimi:** UAH (Tier 1: National Bank of Ukraine - `bank.gov.ua`)
- **Elektrik:** 230V, 50Hz, Tip C, F (Tier 1: NPC Ukrenergo - `ua.energy`)
- **Acil Hatlar:** Genel: 112, Polis: 102, Ambulans: 103, İtfaiye: 101 (Tier 1: MVS Ukraine, DSNS)
- **Seyahat Uyarısı:** **Seviye 4 (Kırmızı Bölge - Seyahat Edilmemeli)**. Aktif savaş durumu, sıkıyönetim ve sivil hava sahası kapalılık notu işlendi.
- **Görsel:** Aziz Sofya Katedrali, Kiev (Unsplash - Eugene).

### 4. İran (`IR`)
- **Başkent:** Tahran (Tier 1: MFA Iran - `mfa.gov.ir`)
- **Para Birimi:** IRR (Tier 1: Central Bank of Iran - `cbi.ir`)
- **Elektrik:** 220V, 50Hz, Tip C, F (Tier 1: TAVANIR - `tavanir.org.ir`)
- **Acil Hatlar:** Polis: 110, Ambulans: 115, İtfaiye: 125 (Tier 1: FARAJA, EMS 115)
- **Seyahat Uyarısı:** **Seviye 4 (Kırmızı Bölge - Seyahat Edilmemeli)**. Keyfi gözaltı riski ve bölgesel askeri gerilim uyarıları işlendi. Banka kartı (Visa/Mastercard) ambargosu belirtildi.
- **Görsel:** Nakş-ı Cihan Meydanı, İsfahan (Unsplash - Salar Arkan).

### 5. Yemen (`YE`)
- **Başkent:** Sana'a (Geçici hükümet merkezi: Aden) (Tier 1: Embassy of Yemen)
- **Para Birimi:** YER (Tier 1: Central Bank of Yemen - `cby-ye.com`)
- **Elektrik:** 230V, 50Hz, Tip A, D, G (Tier 1: Ministry of Electricity)
- **Acil Hatlar:** Polis: 199, Ambulans: 191, İtfaiye: 179 (Tier 1: Ministry of Interior)
- **Seyahat Uyarısı:** **Seviye 4 (Kırmızı Bölge - Seyahat Edilmemeli)**. İç savaş, terörizm ve mayın tehlikesi.
- **Görsel:** Sokotra Adası Ejder Kanı Ağaçları (Unsplash - Vladimir Melnik). *Eski yanlış Tac Mahal görseli kalıcı olarak tasfiye edildi.*

### 6. Kolombiya (`CO`)
- **Başkent:** Bogota (Tier 1: Cancillería de Colombia - `cancilleria.gov.co`)
- **Para Birimi:** COP (Tier 1: Banco de la República - `banrep.gov.co`)
- **Elektrik:** 110V, 60Hz, Tip A, B (Tier 1: Ministerio de Minas y Energía - RETIE)
- **Acil Hatlar:** Genel Tek Acil Hat: 123, Polis: 112, Ambulans: 125, İtfaiye: 119 (Tier 1: Policía Nacional)
- **Seyahat Uyarısı:** **Seviye 3 (Seyahati Yeniden Değerlendiriniz)**. Büyükşehirlerde yankesicilik ve sokak suçları; Arauca, Cauca, Norte de Santander sınır departmanları için Seviye 4 uyarısı.
- **Görsel:** Cartagena de Indias Tarihi Kolonyal Merkezi (Unsplash - Ricardo Gomez Angel).

### 7. Brezilya (`BR`)
- **Başkent:** Brasilia (Tier 1: Governo Federal do Brasil - `gov.br`)
- **Para Birimi:** BRL (Tier 1: Banco Central do Brasil - `bcb.gov.br`)
- **Elektrik:** **127V / 220V (Bölgesel ikili voltaj)**, 60Hz, Tip C, N (Tier 1: ANEEL, INMETRO NBR 14136)
- **Acil Hatlar:** Polis: 190, Ambulans (SAMU): 192, İtfaiye: 193, Turist Polisi (DEAT): +55 21 2332 2924 (Tier 1: Ministério da Justiça, Saúde)
- **Seyahat Uyarısı:** Seviye 2 (Artırılmış Tedbir). Metropollerde sokak suçları; favelalara (gecekondu) girilmemesi uyarısı.
- **Görsel:** Kurtarıcı İsa Heykeli (Cristo Redentor), Rio de Janeiro (Unsplash - Agustin Diaz Gargiulo).

### 8. Japonya (`JP`)
- **Başkent:** Tokyo (Tier 1: Government of Japan - `japan.go.jp`)
- **Para Birimi:** JPY (Tier 1: Bank of Japan - `boj.or.jp`)
- **Elektrik:** **100V, 50Hz (Doğu/Tokyo) / 60Hz (Batı/Osaka)**, Tip A, B (Tier 1: METI, TEPCO)
- **Acil Hatlar:** Polis: 110, Ambulans & İtfaiye: 119, JNTO Turist Hattı: 0570-000-911 (Tier 1: NPA, FDMA, JNTO)
- **Seyahat Uyarısı:** Seviye 1 (Normal Tedbirler; dünyanın en güvenli ülkelerinden biri). Bahşişin kültürde yeri olmadığı (%0) vurgulandı.
- **Görsel:** Chureito Pagodası ve Fuji Dağı (Unsplash - Manuel Cosentino).

### 9. Almanya (`DE`)
- **Başkent:** Berlin (Tier 1: Bundesregierung - `bundesregierung.de`)
- **Para Birimi:** EUR (Tier 1: Deutsche Bundesbank - `bundesbank.de`)
- **Elektrik:** 230V, 50Hz, Tip C, F (Tier 1: DKE DIN VDE)
- **Acil Hatlar:** Polis: 110, Ambulans & İtfaiye: 112 (Tier 1: Polizei.de, BBK)
- **Seyahat Uyarısı:** Seviye 1 (Normal Tedbirler). Pazar günü mağaza kapanış kanunu (Sonntagsruhe) işlendi.
- **Görsel:** Brandenburg Kapısı, Berlin (Unsplash - Florian Wehde).

### 10. Amerika Birleşik Devletleri (`US`)
- **Başkent:** Washington, D.C. (Tier 1: USA.gov)
- **Para Birimi:** USD (Tier 1: Federal Reserve - `federalreserve.gov`)
- **Elektrik:** 120V, 60Hz, Tip A, B (Tier 1: Department of Energy, NEMA)
- **Acil Hatlar:** Tek Acil Çağrı: 911 (Tier 1: 911.gov)
- **Seyahat Uyarısı:** Seviye 1 (Metropollerde gece saatlerinde dikkatli olunması tavsiyesi). %18-22 zorunlu bahşiş kültürü ve ESTA gereksinimi işlendi.
- **Görsel:** Özgürlük Heykeli, New York (Unsplash - Brandon Jacoby).

---

## 4. Sonuç ve Önerilen Sonraki Adım

10 Pilot ülke için kaynaklı ve doğrulanmış kayıtlar oluşturuldu, şemaya karşı doğrulandı ve kalite kapısından başarıyla geçti. 

Kullanıcı onayı sonrasında bu mimari:
1. `CountryDossierModal.tsx` bileşenine bağlanarak "Kaynak: gov.xx · Son Kontrol: 2026-10-13" bağlantılarıyla ziyaretçilere gösterilebilir.
2. Pilot teyit edildikten sonra Türk vatandaşlarının en çok ziyaret ettiği ilk 50 ülke için genişletilebilir.
