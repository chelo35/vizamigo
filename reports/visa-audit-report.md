# 🛡️ Vizamigo Vize ve Mevzuat Denetim Raporu

> **Denetim Tarihi:** 2026-10-10  
> **Denetim Motoru:** Yerel Mevzuat ve Diplomatik Veri Tabanı Kural Motoru  
> **İncelenen Ülke Sayısı:** 15  
> **Özet:** ✅ **13 Tam Uyumlu** · ⚠️ **2 Dikkat Gerektiren** · 🚨 **0 Değişiklik Tespit Edildi**

---

## 📊 Ülke Bazlı Denetim ve Doğrulama Matrisi

| Ülke | Kod | Uygulamadaki Kural | Teyit Edilen Resmi Durum | Durum | Kaynak & Öneri |
| :--- | :---: | :--- | :--- | :---: | :--- |
| **Karadağ (Montenegro)** | `ME` | VF (90 gün) | Vizesiz 90 gün (Kayan 180 günde 90 gün; dönemsel genelge uyarıları kontrol edilmeli) | ⚠️ DİKKAT | Karadağ hükümeti bazı dönemlerde turizm sezonu dışı kalış sürelerine ilişkin düzenlemeler yapabilmektedir. <br/>*Öneri:* Kullanıcı kartında "Resmi Teyitli" notu ile kayan 180 gün kuralı vurgulanmalıdır. |
| **Tayland** | `TH` | VF (60 gün) | 60 Gün Vizesiz + 5 Yıllık DTV Dijital Göçebe Vizesi | ✅ UYUMLU | Tayland hükümeti Türk vatandaşlarına 60 gün vizesiz giriş ve DTV uzaktan çalışma vizesini teyit etmiştir. <br/>*Öneri:* thaievisa.go.th portal linki doğrulanmıştır. |
| **Endonezya (Bali)** | `ID` | VOA (30 gün (Uzatılabilir)) | Varışta Vize (VoA) / Online e-VoA (evisa.imigrasi.go.id) | ✅ UYUMLU | Resmi göçmenlik adresi evisa.imigrasi.go.id olarak güncellenmiştir. <br/>*Öneri:* Molina eski linki yerine yeni portal bağlantısı korunmalıdır. |
| **Meksika** | `MX` | EVISA (30 gün (SAE)) | EVISA · 30 gün (SAE) | ✅ UYUMLU | Hava yoluyla SAE elektronik onay & transit vize kuralları <br/>*Öneri:* Mevcut veri tutarlı ve aktif takip altında. |
| **Mısır** | `EG` | VOA (30 gün (Şarm El Şeyh / Kapıda vize)) | Varışta Vize (VoA) / e-Vize (Giriş limanına göre değişebilir) | ⚠️ DİKKAT | Şarm El Şeyh / Güney Sina için vizesiz veya kapıda vize, Kahire için e-vize gereksinimi uygulanmaktadır. <br/>*Öneri:* Havalimanı varış noktası şartları kart detayında açık tutulmalıdır. |
| **Umman** | `OM` | VF (14 gün) | VF · 14 gün | ✅ UYUMLU | 14 güne kadar vizesiz turist muafiyeti <br/>*Öneri:* Mevcut veri tutarlı ve aktif takip altında. |
| **Gürcistan** | `GE` | VF (365 gün (1 Yıl)) | VF · 365 gün (1 Yıl) | ✅ UYUMLU | Çipli Kimlikle giriş serbest <br/>*Öneri:* Mevcut veri tutarlı ve aktif takip altında. |
| **Azerbaycan** | `AZ` | VF (90 gün) | VF · 90 gün | ✅ UYUMLU | Çipli Kimlikle giriş serbest <br/>*Öneri:* Mevcut veri tutarlı ve aktif takip altında. |
| **Japonya** | `JP` | VF (90 gün) | VF · 90 gün | ✅ UYUMLU | Standart turist vizesiz giriş <br/>*Öneri:* Mevcut veri tutarlı ve aktif takip altında. |
| **Güney Kore** | `KR` | VF (90 gün) | VF · 90 gün | ✅ UYUMLU | K-ETA gereksinimi ve güncel muafiyet durumları <br/>*Öneri:* Mevcut veri tutarlı ve aktif takip altında. |
| **Arnavutluk** | `AL` | VF (90 gün) | VF · 90 gün | ✅ UYUMLU | Balkanlar vizesiz rejim <br/>*Öneri:* Mevcut veri tutarlı ve aktif takip altında. |
| **Sırbistan** | `RS` | VF (90 gün) | VF · 90 gün | ✅ UYUMLU | Kimlikle giriş protokolü & pasaport <br/>*Öneri:* Mevcut veri tutarlı ve aktif takip altında. |
| **Bosna-Hersek** | `BA` | VF (90 gün) | VF · 90 gün | ✅ UYUMLU | Kimlikle giriş protokolü & pasaport <br/>*Öneri:* Mevcut veri tutarlı ve aktif takip altında. |
| **Birleşik Arap Emirlikleri** | `AE` | EVISA (30 gün) | EVISA · 30 gün | ✅ UYUMLU | E-vize zorunluluğu <br/>*Öneri:* Mevcut veri tutarlı ve aktif takip altında. |
| **Vietnam** | `VN` | EVISA (30 / 90 gün) | EVISA · 30 / 90 gün | ✅ UYUMLU | Resmi e-vize portalı güncellemeleri <br/>*Öneri:* Mevcut veri tutarlı ve aktif takip altında. |

---

## 🚀 Önerilen Eylemler & Sonraki Adımlar
1. **Topluluk Bildirimleri Takibi:** Gezginlerin bildirdiği değişiklikler `localStorage` (`vr_user_reports`) üzerinden periyodik olarak incelenmeli.
2. **Resmi Portallar:** Dışişleri Bakanlığı ve ilgili ülkelerin resmi göçmenlik portalları (örn. `evisa.imigrasi.go.id`, `thaievisa.go.th`, `gob.mx/inm`) bağlantı sağlıkları haftalık otomatik test edilmeli.
3. **Kayan Süre Hatırlatmaları:** Schengen ve Karadağ gibi kayan dönem kuralı uygulayan ülkeler için hesaplayıcıdaki 90/180 takip aracı aktif tutulmalı.

---
*Rapor otomatik olarak Vizamigo Kalite Güvence Sistemi tarafından oluşturulmuştur.*