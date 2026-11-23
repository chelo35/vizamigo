# Vizamigo ortaklık beyni (affiliate + fenomen programı)

> Bu dosya Vizamigo'nun bütün ortaklıklarının, fenomen (influencer) programının ve satış takibinin **tek doğru kaynağıdır**.
> Yeni bir oturum ortaklık, fenomen, komisyon, panel ya da ödeme işine başlamadan ÖNCE bunu okur; iş bitince günceller.
> Son büyük denetim: **24 Kasım 2026** (kodun tamamı tarandı: `src/data/tpPartners.ts`, `src/utils/refTracking.ts`, `src/utils/analytics.ts`, `api/tp.ts`, `api/_catalog.ts`, `src/data/transferRoutes.ts`, `src/data/esimFlexi.json`).

## 1. Fenomen programı kuralları (Çelebi'nin kararları)

- Pay: bize gelen komisyonun **%50'si** (sabit ücret yok). `ref_partners.share = 0.5`.
- Ödeme: her ayın **15'ine kadar**, **TL**, fenomenin **IBAN**'ına. En az **1.000 TL**; altı sonraki aya devreder.
- Yalnızca ağın **onayladığı** satıştan pay ödenir (beklemede / iptal ödenmez).
- **Hariç:** SafetyWing (sigorta) ve VisaHQ (vize) — ortak bağlantılarında alt kimlik yok, fenomene yazılamaz. Fenomenlere böyle söylendi.
- Hangi videoya link koyacaklarını biz yönlendirmiyoruz.
- Başvurular **otomatik onaylanmaz**: `/ortak/basvuru` → `ref_applications` + Çelebi'ye e-posta; Claude başvuranı araştırır, uygun olmasa bile Çelebi'ye raporlar.
- Fenomenlere cevap gelmezse 20 Ocak 2027'ye kadar hatırlatma maili atılmaz.
- Çelebi: "fenomen ortaklıkları çok önemli, buradan kâr gelecek" — cevapsız fenomen maili olursa sürekli uyar (zamanlanmış görev var, bkz. §6). "Sitede bir şey satıldığında insanların parasını mutlaka yatıralım, sıkıntı yaşamayalım."

## 2. Akış (fenomen linkinden ödemeye)

1. Fenomen linki: `https://www.vizamigo.com/?ref=<kod>` (kod `ref_partners.ref`, `^[a-z0-9][a-z0-9_-]{1,29}$`).
2. `captureRef` kodu **30 gün** `localStorage.vz_ref`'te tutar, `/api/ref-hit`'e `visit` gönderir.
3. Ziyaretçi bir ortak firmaya tıklayınca `tagRef` bağlantıya `r-<kod>` ekler (alan ağa göre, §3) ve `/api/ref-hit`'e `out` gönderir.
4. Her gece **04:23** (`vercel.json` cron) `api/ortak-sync.ts` her ağın API'sinden son 120 günün satışlarını çeker, alt kimlikte `r-<kod>` olanları `ref_bookings`'e yazar (EUR'ya çevirir, `fx_try` saklar).
   - **Yeni satış / durum değişikliği → Çelebi'ye e-posta.**
   - **Bir ağ hata verirse → Çelebi'ye e-posta** (anahtar eksikliği hariç).
   - Elle "paid" yapılmış satır korunur.
5. Fenomen kendi panelini görür: `/ortak` (e-postayla giriş linki) → `/ortak/<token>` (6 dil, tarih aralığı, gün detayı, hizmet/firma/sayfa kırılımı).
6. Çelebi yönetim panelini görür: `/ortak/yonetim` (giriş linki yalnızca `REPORT_TO`'ya gider; anahtar `ref_secrets.admin_token`). Bütün fenomenler, ağ/firma kırılımı, bütün satışlar, **ödenecekler listesi** ve "Ödendi" düğmesi.
7. **Her ayın 10'u** (`/api/ortak-admin?cron=payout`) Çelebi'ye "bu ay kime ne kadar ödenecek" e-postası gider. Çelebi IBAN'a öder → yönetim panelinde "Ödendi" → satırlar `paid` + `paid_at`.

## 3. Ortaklık envanteri (hangi firma → hangi ağ → otomatik mi)

Durum: ✅ otomatik çekiliyor · ⏳ anahtar/cevap bekleniyor · 🔒 kilitli (komisyon yok) · ⛔ fenomen programı dışı

### Ağlar

| Ağ | Hesap / kimlik | Fenomen kodu alanı | Satış çekme (ortak-sync) | Vercel env | Durum |
|---|---|---|---|---|---|
| Travelpayouts | proje 586306, marker 788708 | `sub_id` (`/api/tp` linki tıklamada üretir) | statistics API (`campaign_name_en`) | `TRAVELPAYOUTS_TOKEN` | ✅ |
| Stay22 | aid `vizamigo` | `campaign` (`…-r-<kod>`) | reporting/transactions (en fazla 364 gün) | `STAY22_API_KEY` | ✅ |
| Admitad | reklam alanı 3019244 | `subid` (`/g/<kod>/` linkleri) | OAuth `statistics` → `/statistics/actions/` | `ADMITAD_CLIENT_ID/SECRET` | ✅ |
| CJ | yayıncı 7817772, site 101926414 | `sid` | GraphQL `publisherCommissions` | `CJ_API_TOKEN` (+`CJ_CURRENCY`) | ✅ |
| Viator (doğrudan) | `pid` | `campaign` | `bookings/modified-since` (komisyon = tutar × `VIATOR_RATE` 0,08 tahmini) | `VIATOR_API_KEY` | ✅ |
| Daisycon | medya `wi=442794`; yayıncı ID API'den otomatik | `ws` | OAuth (PKCE) → `/publishers/<id>/transactions`; refresh token `ref_secrets.daisycon_refresh` | `DAISYCON_CLIENT_ID/SECRET` | ✅ (24 Kas 2026 bağlandı; alan adları ilk satışta doğrulanmalı) |
| Awin | yayıncı 3138284 | `clickref` | `/publishers/3138284/transactions/` | `AWIN_API_TOKEN` | ⏳ Awin'in API sayfası 404 veriyor; düzelince token eklenecek |
| 12Go (doğrudan) | ajans `z=17478120` | `sub_id` | API yok | — | ⏳ 23 Kas 2026 affiliate@12go.asia'ya API/CSV/postback soruldu |
| TourRadar (doğrudan, elçi) | `partner-traveller-1458560` | `utm_campaign` | API yok | — | ⏳ 23 Kas 2026 partners@tourradar.com'a soruldu |
| SafetyWing | referenceID 26626704 | yok | — | — | ⛔ program dışı |
| VisaHQ | vizamigo.visahq.net | yok | — | — | ⛔ program dışı |

### Firmalar (sitede bağlantısı olan bütün markalar)

| Firma | Hizmet | Ağ | Durum |
|---|---|---|---|
| Aviasales, Kiwi.com | uçak | Travelpayouts | ✅ |
| Kayak, Expedia (uçuş) | uçak | Stay22 (link) | ✅ |
| Booking.com, Agoda, Expedia, Hotels.com, Vrbo | otel | Stay22 | ✅ |
| **GetYourGuide** | tur | **Stay22** (GYG `partner_id=ZM6TN20` Stay22'nin kimliği; Türkiye'de doğrudan gyg/tr-tr + `cmp`, diğer ülkelerde Stay22 allez linki). Doğrudan GYG ortaklığımız YOK; Travelpayouts'ta kilitli. | ✅ (Stay22 raporundan; ilk satışta raporda göründüğü doğrulanmalı) |
| Viator | tur | Viator doğrudan (pid) | ✅ |
| Klook, Fever, Rayna Tours | tur | Admitad | ✅ |
| Tiqets, Go City, WeGoTrip, KKday | tur | Travelpayouts | ✅ |
| TourRadar | paket tur | doğrudan | ⏳ |
| Kiwitaxi, Welcome Pickups, GetTransfer, intui.travel | transfer | Travelpayouts | ✅ |
| AvitoVIP | transfer | Admitad | ✅ |
| Daytrip | transfer | CJ (%13) | ✅ |
| DiscoverCars, WoopDrive | araç | Admitad | ✅ |
| Localrent, EconomyBookings, GetRentacar, QEEQ, AutoEurope | araç | Travelpayouts | ✅ |
| Booking.com Cars, Expedia Cars | araç | Stay22 | ✅ |
| BikesBooking | bisiklet/motor | Travelpayouts | ✅ |
| Rentalmotorbike (partners.rentalmotorbike.com) | motor | Daisycon | ✅ |
| 12Go | tren/otobüs/feribot (Asya) | doğrudan | ⏳ |
| Italiarail | tren | Admitad | ✅ |
| Ferryhopper | feribot | Awin | ⏳ (Awin) |
| Airalo, Yesim, Saily, GigSky, Drimsim | eSIM | Travelpayouts | ✅ |
| Nomad eSIM, FlexiRoam | eSIM | Daisycon | ✅ |
| HelloSafe | sigorta | Awin | ⏳ (Awin) |
| SafetyWing | sigorta | doğrudan elçi | ⛔ |
| AirHelp | uçuş tazminatı | Travelpayouts | ✅ |
| Compensair, Lennuabi | uçuş tazminatı | Admitad | ✅ |
| Radical Storage | bagaj | Travelpayouts | ✅ |
| Sanatoriums | sağlık turizmi | Admitad | ✅ |
| Stay22 Retail (seyahat ürünleri) | ekstra | Stay22 | ✅ |
| VisaHQ | vize | doğrudan | ⛔ |
| **Hostelworld** | hostel | Travelpayouts'ta **🔒 kilitli** (`LOCKED`) — doğrudan ortaklık YOK. Bağlantı düz hostelworld.com'a gider, **şu an hiç komisyon yok** | 🔒 |
| Trip.com, Omio | uçak/otel, tren | Travelpayouts'ta 🔒 kilitli | 🔒 |
| Uber, Bolt, Grab, Careem, inDrive, Wolt, Glovo… | ulaşım/yemek uygulamaları | ortaklık değil (bilgi linki) | — |

Kilit açılınca (Travelpayouts "3 ay düzenli trafik" sonrası "Submit for review"): `LOCKED`'dan çıkar **ve** `api/tp.ts` `HOSTS` listesine alan adını ekle (yoksa link ortaklık linkine çevrilmez).

## 4. Yeni ortaklık eklerken kontrol listesi (bunu atlama)

1. `src/data/tpPartners.ts`: `TpId`, `TP` (ad, alan adı, oran), link üretici.
2. `src/utils/refTracking.ts` `tagRef`: ağın alt kimlik alanına `r-<kod>` yazan dal (yoksa satış fenomene yazılamaz!).
3. `src/utils/analytics.ts` / `tpIdFromUrl`: tıklamanın firmaya eşlenmesi.
4. `api/_catalog.ts` `PARTNERS`: ad + hizmet kategorisi (panelde görünsün); alt kimlik yoksa `tracked: false`.
5. `api/ortak-sync.ts`: ağ yeniyse satış çekme fonksiyonu + env anahtarı. API yoksa ağa mail at (API / CSV / postback sor) ve bu dosyaya ⏳ olarak yaz.
6. `npx tsc --noEmit -p .` + `npx vite build --outDir /tmp/vz-build-check`, yayın, `GET /api/ortak-sync?debug=1&net=<ağ>` ile test.
7. Bu dosyadaki tabloları güncelle.

## 5. Teknik harita

- Supabase `utlnjyquflfcvjhmgopq` tabloları: `ref_partners` (ref, name, token, share, lang, email, active), `ref_events` (ref, kind visit|out, target, path, lang, country, ts), `ref_bookings` (id, ref, network, partner, category, page, booked_at, amount_eur, commission_eur, fx_try, status pending|approved|cancelled|paid, paid_at), `ref_applications`, `ref_secrets` (daisycon_refresh, admin_token). RLS açık, politika yok → yalnız service role.
- Uç noktalar: `/api/ref-hit`, `/api/tp`, `/api/ortak` (`/ortak`, `/ortak/<token>`), `/api/ortak-basvuru` (`/ortak/basvuru`), `/api/ortak-admin` (`/ortak/yonetim`, aylık cron), `/api/ortak-sync` (gece cron; `?debug=1`, `?net=`, `?days=`), `/api/daisycon-auth` (tek seferlik bağlantı; yeniden bağlamak için `ref_secrets.daisycon_refresh` silinir).
- E-posta: Resend (`RESEND_API_KEY`, `REPORT_TO`, `ALERTS_FROM`/`REPORT_FROM`).
- Kur: Frankfurter (EUR tabanlı), satış tarihindeki TRY kuru `fx_try`.
- Yayın: `git push origin redesign/deniz && git push origin redesign/deniz:main` → Vercel `vizamigo-83kj` (takım chelo35).
- Demo panel: `ornek-panel` (sahte veri, e-posta Çelebi). Gerçek kullanımda silinebilir.

## 6. Takip ve hatırlatmalar (zamanlanmış görevler)

- "Fenomen mailleri: cevapsız kalan uyarısı" — günde 3 kez, cevapsız fenomen maili varsa bildirim.
- "Ortak ağ takibi: Awin API sayfası + 12Go/TourRadar cevapları" — her gün 11:47; Awin sayfası düzelince ya da 12Go/TourRadar cevap verince bildirim; üçü bitince kendini kapatır.
- Kod içinde: gece senkronu (yeni satış + ağ hatası e-postası), her ayın 10'u ödeme listesi e-postası.

## 7. Açık işler

- [ ] Awin: API sayfası düzelince `AWIN_API_TOKEN` → yayın → `?debug=1&net=awin` testi (Ferryhopper, HelloSafe).
- [ ] 12Go cevabı → API/CSV/postback'e göre `ortak-sync`'e kaynak ekle. O zamana kadar 12Go satışları 12Go panelinden `sub_id`'ye bakılarak elle `ref_bookings`'e girilir.
- [ ] TourRadar cevabı → aynı şekilde.
- [ ] İlk gerçek satışta: Daisycon, Stay22 (GYG dahil) ve Viator alan adlarının (alt kimlik, komisyon) doğru okunduğunu kontrol et.
- [ ] "Claude'un kendi sitesi %50/%20" diye hatırlanan ortaklık bulunamadı (Hostelworld %40 rev share olabilir); Çelebi netleştirecek.
- [ ] Demo panel `ornek-panel` gerçek kullanım öncesi silinsin mi? (Çelebi'ye soruldu.)
