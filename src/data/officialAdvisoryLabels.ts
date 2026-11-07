/** Resmî seyahat uyarıları için türler ve 5 dilde etiketler (veri dosyasını içermez; istemcide hafif) */
export type AdvisoryAgency = 'us' | 'uk' | 'ca';
export interface OfficialAdvisory {
  agency: AdvisoryAgency;
  level: 1 | 2 | 3 | 4;
  /** Kanada: bölgesel uyarı da var */
  regional?: boolean;
  date: string;
  url: string;
}
export interface OfficialAdvisorySet {
  fetched: string;
  items: OfficialAdvisory[];
  /** kurumların en yüksek seviyesi (en temkinli olan) */
  max: number | null;
}


const AGENCY: Record<AdvisoryAgency, Record<string, string>> = {
  us: { tr: 'ABD Dışişleri Bakanlığı', en: 'US Department of State', de: 'US-Außenministerium', es: 'Departamento de Estado de EE. UU.', ru: 'Госдепартамент США' },
  uk: { tr: 'Birleşik Krallık Dışişleri (FCDO)', en: 'UK Foreign Office (FCDO)', de: 'Britisches Außenministerium (FCDO)', es: 'Ministerio de Exteriores británico (FCDO)', ru: 'МИД Великобритании (FCDO)' },
  ca: { tr: 'Kanada Hükümeti', en: 'Government of Canada', de: 'Regierung von Kanada', es: 'Gobierno de Canadá', ru: 'Правительство Канады' }
};

const LABEL: Record<AdvisoryAgency, Record<string, [string, string, string, string]>> = {
  us: {
    tr: ['Normal önlemler', 'Daha dikkatli olun', 'Seyahati yeniden düşünün', 'Seyahat etmeyin'],
    en: ['Exercise normal precautions', 'Exercise increased caution', 'Reconsider travel', 'Do not travel'],
    de: ['Normale Vorsicht', 'Erhöhte Vorsicht', 'Reise überdenken', 'Nicht reisen'],
    es: ['Precauciones normales', 'Mayor precaución', 'Reconsidere el viaje', 'No viaje'],
    ru: ['Обычные меры предосторожности', 'Повышенная осторожность', 'Пересмотрите поездку', 'Не путешествуйте']
  },
  uk: {
    tr: ['Özel bir uyarı yok', 'Bazı bölgelere gidilmemesi önerilir', 'Zorunlu olmayan seyahat önerilmez', 'Ülkeye hiç gidilmemesi önerilir'],
    en: ['No travel warning', 'Advises against travel to some areas', 'Advises against all but essential travel', 'Advises against all travel'],
    de: ['Keine Reisewarnung', 'Rät von Reisen in einige Gebiete ab', 'Rät von nicht notwendigen Reisen ab', 'Rät von allen Reisen ab'],
    es: ['Sin advertencia', 'Desaconseja viajar a algunas zonas', 'Desaconseja los viajes no esenciales', 'Desaconseja todo viaje'],
    ru: ['Нет предупреждений', 'Не рекомендует поездки в некоторые районы', 'Не рекомендует поездки без крайней необходимости', 'Не рекомендует любые поездки']
  },
  ca: {
    tr: ['Normal güvenlik önlemleri', 'Yüksek dikkat gösterin', 'Zorunlu olmayan seyahatten kaçının', 'Tüm seyahatten kaçının'],
    en: ['Exercise normal security precautions', 'Exercise a high degree of caution', 'Avoid non-essential travel', 'Avoid all travel'],
    de: ['Normale Sicherheitsvorkehrungen', 'Hohe Vorsicht', 'Nicht notwendige Reisen vermeiden', 'Alle Reisen vermeiden'],
    es: ['Precauciones normales', 'Alto grado de precaución', 'Evite los viajes no esenciales', 'Evite todo viaje'],
    ru: ['Обычные меры безопасности', 'Высокая степень осторожности', 'Избегайте поездок без необходимости', 'Избегайте любых поездок']
  }
};
const REGIONAL: Record<string, string> = { tr: 'bazı bölgeler için ayrıca uyarı var', en: 'with regional advisories', de: 'mit regionalen Warnungen', es: 'con avisos regionales', ru: 'есть региональные предупреждения' };

export function advisoryAgencyName(a: AdvisoryAgency, lang: string): string {
  return AGENCY[a][lang] || AGENCY[a].en;
}
export function advisoryLabel(a: OfficialAdvisory, lang: string): string {
  const t = (LABEL[a.agency][lang] || LABEL[a.agency].en)[a.level - 1];
  return a.regional ? `${t} (${REGIONAL[lang] || REGIONAL.en})` : t;
}

