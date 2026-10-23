// src/data/sourceMap.ts
// Bu dosya, ülke veri alanları için kullanılacak kaynak URL'lerini tutar.
// Her alan (hotline247, visa_rules, culture, highlights) için ülke ISO2 koduna göre
// bir URL haritası tanımlanır. Gerçek veri toplama script'leri bu haritadan faydalanır.

export interface SourceEntry {
  /** Veri kaynağının URL'i */
  url: string;
  /** Kaynağın güvenilirlik seviyesi (1=temel, 2=ortalama, 3=yüksek) */
  tier: 1 | 2 | 3;
  /** Kaynak başlığı / açıklaması */
  title: string;
}

/**
 * Her veri alanı için ülke bazlı URL haritası.
 * İleride yeni alan eklenirse burada tanımlanır ve script'ler bu haritayı okur.
 */
export const sourceMap: Record<string, Record<string, SourceEntry>> = {
  // Konsolosluk 24/7 acil telefon numarası (hotline247)
  hotline247: {
    // Örnek: Türkiye – dışişleri bakanlığı konsolosluk numarası
    TR: {
      url: "https://www.mfa.gov.tr/overseas-consular-contacts",
      tier: 3,
      title: "Türkiye Dışişleri Bakanlığı Konsolosluk Acil İletişim",
    },
    FR: {
      url: "https://www.diplomatie.gouv.fr/en/consular-services/overseas-consular-contact",
      tier: 3,
      title: "France Consular Emergency Contact",
    },
    // Diğer ülkeler için placeholder kullanılabilir; gerçek URL'ler burada doldurulacak.
    // ...
  },
  // Vize kuralları (visa_rules)
  visa_rules: {
    FR: {
      url: "https://france-visas.gouv.fr/en",
      tier: 3,
      title: "Fransa Vize Bilgi Portalı",
    },
    // ... diğer ülkeler
  },
  // Kültürel bilgiler (culture)
  culture: {
    IT: {
      url: "https://www.italia.it/en/travel/italian-culture",
      tier: 2,
      title: "İtalya Kültür Rehberi",
    },
    // ...
  },
  // Turistik öne çıkan yerler (highlights)
  highlights: {
    ES: {
      url: "https://www.spain.info/en/places-of-interest/",
      tier: 2,
      title: "İspanya Turistik Noktalar",
    },
    // ...
  },
};

/**
 * Belirli bir ülke ve alan için kaynak bilgisi alınır.
 */
export function getSource(iso2: string, field: string): SourceEntry | undefined {
  const fieldMap = sourceMap[field];
  if (!fieldMap) return undefined;
  return fieldMap[iso2.toUpperCase()];
}
