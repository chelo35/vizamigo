# 🏝️ Vizamigo — Token Dostu Tasarım Güncelleme Planı & Hazır Devam Promptu

Bu dosya, tokenınız bittiğinde veya yeni bir sohbet açtığınızda **hiçbir detayı tekrar anlatmak zorunda kalmadan, en az token harcayarak** kaldığınız yerden devam edebilmeniz için hazırlanmıştır.

---

## ⚡ Token Tasarrufu İçin 3 Altın Kural (%85 Daha Az Token Harcar)

1. **Uzun Sohbet Yerine `/compact` veya Yeni Sohbet Kullanın:**
   - Mevcut sohbet çok uzadığı için her mesajınızda geçmiş bağlam tekrar okunur ve çok token harcar.
   - Sohbet ekranına **`/compact`** yazarak geçmişi sıkıştırabilir VEYA **yeni bir sohbet** açıp sadece aşağıdaki **"Hazır Başlangıç Promptu"**nu yapıştırabilirsiniz.
2. **Görsel Ürettirmek Yerine Doğrudan Kod Üzerinde Nokta Atışı Değişiklik Yapın:**
   - Yapay zekaya yeni resim/mockup çizdirmek (`image-generator`) normal kod yazmaktan 5-10 kat fazla token tüketir.
   - Bunun yerine beğenmediğiniz yerleri doğrudan bileşen adı vererek (örneğin *"Üst bardaki arama çubuğu"*, *"1. Kart: Dünya Radarı"*, *"Arka plan rengi"*) tek seferde kodda değiştirtin.
3. **Değişiklikleri Tek Tek Değil, "Tek Mesajda Maddeler Halinde" Yazın:**
   - 5 ayrı mesajda 1'er düzeltme istemek yerine, **tek bir mesajda 5-10 maddeyi alt alta** yazın. Böylece tüm dosyalar tek seferde düzenlenir ve tek bir `npm run build` ile canlıya çıkar.

---

## 📂 Hangi Görsel Parça Hangi Dosyada? (Nokta Atışı Müdahale Haritası)

Yeni sohbette sadece ilgili dosyayı okutarak token tasarrufu sağlamak için bu haritayı kullanabilirsiniz:

| Değiştirmek İstediğiniz Alan | İlgili Dosya Yolu |
| :--- | :--- |
| **Genel Arka Plan Rengi & Kart Cam (Glass) Rengi** | `/Users/celebi/Desktop/vizamigo/src/index.css` (Satır 70–140) ve `/Users/celebi/Desktop/vizamigo/src/App.tsx` (Satır 200–225) |
| **Üst Bar (Logo, 5 Sekme, Pasaport, TR, ☀️/🌙 ve Arama Çubuğu)** | `/Users/celebi/Desktop/vizamigo/src/components/Header.tsx` |
| **Mobil Alt Yüzen Bar (5 Sekme)** | `/Users/celebi/Desktop/vizamigo/src/components/Navigation.tsx` |
| **Ana Ekran 8'li/10'lu Widget Kartları & Tıklanınca Açılan Alt Pencere** | `/Users/celebi/Desktop/vizamigo/src/components/bento/BentoDashboardGrid.tsx` |
| **Kartların İçindeki 3D Çizimler (Pasaport, Dünya, Valiz, Altın Paralar, Telefon)** | `/Users/celebi/Desktop/vizamigo/src/components/bento/BentoIllustrations.tsx` |
| **199 Ülke Tam Liste & Filtreler** | `/Users/celebi/Desktop/vizamigo/src/components/ExploreTab.tsx` |

---

## 📋 Yeni Sohbette Kopyalayıp Yapıştıracağınız "Hazır Devam Promptu"

Yeni bir sohbet açtığınızda (veya tokenınız yenilendiğinde) sadece şu metni kopyalayıp altındaki maddelere beğenmediğiniz yerleri yazmanız yeterlidir:

```text
Proje dizini: /Users/celebi/Desktop/vizamigo
Tüm projeyi tarama, sadece belirteceğim dosyaları oku ve düzenle (token tasarrufu için).

Şu anda Vizamigo'da Turkuaz Lagün & 3D Widget Sistemi (Header.tsx, BentoDashboardGrid.tsx, BentoIllustrations.tsx, ExploreTab.tsx, index.css) yayında.
Görsel/mockup üretme, doğrudan kodda şu maddeleri tek seferde güncelle, npm run build ile test et ve git push origin main ile canlıya gönder:

Beğenmediğim ve hemen değişmesini istediğim noktalar:
1. [Arka plan / renk tonu ile ilgili istediğiniz değişiklik]
2. [Üst bar veya arama çubuğu ile ilgili istediğiniz değişiklik]
3. [Ana widget kartları (boyut, fotoğraf, yazı veya yerleşim) ile ilgili istediğiniz değişiklik]
4. [Tıklanınca açılan alt pencere ile ilgili istediğiniz değişiklik]
5. [Varsa kaldırılmasını veya eklenmesini istediğiniz bölüm]
```
