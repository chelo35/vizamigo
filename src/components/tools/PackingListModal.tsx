import React, { useState, useEffect } from 'react';
import {
  X,
  CheckSquare,
  Square,
  Sparkles,
  Plus,
  Trash2,
  RotateCcw,
  Luggage,
  ShieldAlert,
  Sun,
  Snowflake,
  Building2,
  Laptop,
  Compass
} from 'lucide-react';
import { useI18n } from '../../data/i18n';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type TripStyle = 'beach' | 'winter' | 'city' | 'nomad' | 'backpack';

interface PackingItem {
  id: string;
  text: {
    tr: string;
    en: string;
  };
  category: 'docs' | 'tech' | 'health' | 'clothes' | 'nomad';
  styles: TripStyle[];
  isCustom?: boolean;
}

const DEFAULT_PACKING_ITEMS: PackingItem[] = [
  // Belgeler & Finans
  { id: 'doc-pass', text: { tr: 'Pasaport (En az 6 ay geçerlilik süresi kontrol edildi)', en: 'Passport (Checked with at least 6 months validity)' }, category: 'docs', styles: ['beach', 'winter', 'city', 'nomad', 'backpack'] },
  { id: 'doc-id', text: { tr: 'Çipli Kimlik Kartı & Ehliyet', en: 'National ID & Driver’s License' }, category: 'docs', styles: ['beach', 'winter', 'city', 'nomad', 'backpack'] },
  { id: 'doc-visa', text: { tr: 'Vize / e-Vize Çıktısı veya Giriş Onay Belgesi', en: 'Visa / eVisa Printout or Entry Approval' }, category: 'docs', styles: ['beach', 'winter', 'city', 'nomad', 'backpack'] },
  { id: 'doc-ins', text: { tr: 'Yurt Dışı Seyahat Sağlık Sigortası Poliçesi', en: 'Travel Health Insurance Policy' }, category: 'docs', styles: ['beach', 'winter', 'city', 'nomad', 'backpack'] },
  { id: 'doc-cards', text: { tr: 'Yurt dışı kullanımına açık 2 Farklı Kredi/Banka Kartı', en: 'Two different international-enabled Credit/Debit cards' }, category: 'docs', styles: ['beach', 'winter', 'city', 'nomad', 'backpack'] },
  { id: 'doc-cash', text: { tr: 'Acil durum için 100-200 $ / € Nakit', en: 'Emergency cash $100-200 in clean bills' }, category: 'docs', styles: ['beach', 'winter', 'city', 'nomad', 'backpack'] },

  // Elektronik & Donanım
  { id: 'tech-adapter', text: { tr: 'Evrensel Priz Adaptörü (Universal Travel Plug)', en: 'Universal Travel Plug Adapter' }, category: 'tech', styles: ['beach', 'winter', 'city', 'nomad', 'backpack'] },
  { id: 'tech-pb', text: { tr: 'Powerbank (Maks. 20.000 mAh - Kabin bagajına konulmalı!)', en: 'Powerbank (Max 20,000mAh - Cabin baggage only!)' }, category: 'tech', styles: ['beach', 'winter', 'city', 'nomad', 'backpack'] },
  { id: 'tech-cables', text: { tr: 'Yedek Type-C / Lightning ve Hızlı Şarj Başlığı', en: 'Fast charging cables and multi-port charging brick' }, category: 'tech', styles: ['beach', 'winter', 'city', 'nomad', 'backpack'] },
  { id: 'tech-esim', text: { tr: 'eSIM QR Kodu Ekran Görüntüsü veya Çıktısı', en: 'eSIM activation QR code screenshot / printout' }, category: 'tech', styles: ['beach', 'winter', 'city', 'nomad', 'backpack'] },
  { id: 'tech-anc', text: { tr: 'Gürültü Önleyici Kulaklık (Uçak & çalışma için ANC)', en: 'Noise cancelling headphones (ANC for flights & work)' }, category: 'tech', styles: ['beach', 'winter', 'city', 'nomad', 'backpack'] },

  // Sağlık & İlaçlar
  { id: 'health-pers', text: { tr: 'Kişisel Reçeteli İlaçlar (+ İngilizce Reçete/Rapor)', en: 'Personal prescription medications (+ English doctor letter)' }, category: 'health', styles: ['beach', 'winter', 'city', 'nomad', 'backpack'] },
  { id: 'health-stomach', text: { tr: 'Mide Koruyucu, Probiyotik ve İshal Önleyici', en: 'Stomach relief pills, probiotics & anti-diarrhea' }, category: 'health', styles: ['beach', 'winter', 'city', 'nomad', 'backpack'] },
  { id: 'health-pain', text: { tr: 'Ağrı Kesici ve Ateş Düşürücü (Parasetamol)', en: 'Painkiller and fever relief (Paracetamol)' }, category: 'health', styles: ['beach', 'winter', 'city', 'nomad', 'backpack'] },
  { id: 'health-band', text: { tr: 'Yara Bandı ve Dezenfektan Mendil', en: 'Bandages and antiseptic wipes' }, category: 'health', styles: ['beach', 'winter', 'city', 'nomad', 'backpack'] },

  // Dijital Göçebe (Nomad Tech)
  { id: 'nomad-stand', text: { tr: 'Ergonomik Katlanır Laptop Standı (Roost / Nexstand)', en: 'Ergonomic portable laptop stand' }, category: 'nomad', styles: ['nomad'] },
  { id: 'nomad-mouse', text: { tr: 'Kablosuz Mouse ve Mini Bluetooth Klavye', en: 'Wireless mouse and compact bluetooth keyboard' }, category: 'nomad', styles: ['nomad'] },
  { id: 'nomad-multi', text: { tr: 'Çoklu Priz / Seyahat Tipi USB Çoklayıcı Hub', en: 'Travel power strip with multiple USB ports' }, category: 'nomad', styles: ['nomad'] },
  { id: 'nomad-vpn', text: { tr: 'Güvenilir VPN Uygulaması (Seyahatten önce yüklendi)', en: 'Reliable VPN app installed before takeoff' }, category: 'nomad', styles: ['nomad'] },

  // Kıyafet & Aksesuar
  { id: 'wear-shoes', text: { tr: 'Konforlu Yürüyüş Ayakkabısı (Günde 15.000+ adım)', en: 'Comfortable walking sneakers (15,000+ steps/day)' }, category: 'clothes', styles: ['beach', 'winter', 'city', 'nomad', 'backpack'] },
  { id: 'wear-swim', text: { tr: 'Mayo / Şort ve Güneş Kremi (50+ SPF)', en: 'Swimwear and high-protection sunscreen (50+ SPF)' }, category: 'clothes', styles: ['beach'] },
  { id: 'wear-thermal', text: { tr: 'Termal İçlik, Eldiven ve Rüzgar Geçirmez Mont', en: 'Thermal base layers, gloves & windproof parka' }, category: 'clothes', styles: ['winter'] },
  { id: 'wear-rain', text: { tr: 'Hafif Yağmurluk veya Kompakt Şemsiye', en: 'Packable rain jacket or compact umbrella' }, category: 'clothes', styles: ['city', 'backpack', 'nomad'] },
  { id: 'wear-lock', text: { tr: 'TSA Onaylı Bavul Kilidi', en: 'TSA-approved luggage lock' }, category: 'clothes', styles: ['beach', 'winter', 'city', 'nomad', 'backpack'] }
];

export const PackingListModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { language, l } = useI18n();
  const [activeStyle, setActiveStyle] = useState<TripStyle>('city');
  const [checkedIds, setCheckedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('vizamigo_packing_checked');
      if (saved) return new Set(JSON.parse(saved));
    } catch {}
    return new Set(['doc-pass']);
  });
  const [customItems, setCustomItems] = useState<PackingItem[]>(() => {
    try {
      const saved = localStorage.getItem('vizamigo_packing_custom');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });
  const [newCustomText, setNewCustomText] = useState('');

  // Persist checkmarks
  useEffect(() => {
    try {
      localStorage.setItem('vizamigo_packing_checked', JSON.stringify(Array.from(checkedIds)));
    } catch {}
  }, [checkedIds]);

  // Persist custom items
  useEffect(() => {
    try {
      localStorage.setItem('vizamigo_packing_custom', JSON.stringify(customItems));
    } catch {}
  }, [customItems]);

  if (!isOpen) return null;

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addCustomItem = () => {
    if (!newCustomText.trim()) return;
    const newItem: PackingItem = {
      id: `custom-${Date.now()}`,
      text: { tr: newCustomText.trim(), en: newCustomText.trim() },
      category: 'tech',
      styles: ['beach', 'winter', 'city', 'nomad', 'backpack'],
      isCustom: true
    };
    setCustomItems((prev) => [...prev, newItem]);
    setNewCustomText('');
  };

  const removeCustomItem = (id: string) => {
    setCustomItems((prev) => prev.filter((i) => i.id !== id));
    setCheckedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const checkAll = () => {
    const allIds = activeItems.map((i) => i.id);
    setCheckedIds(new Set(allIds));
  };

  const clearAll = () => {
    setCheckedIds(new Set());
  };

  // Filter items matching active trip style
  const allAvailableItems = [...DEFAULT_PACKING_ITEMS, ...customItems];
  const activeItems = allAvailableItems.filter((i) => i.styles.includes(activeStyle));
  const completedCount = activeItems.filter((i) => checkedIds.has(i.id)).length;
  const progressPercent = activeItems.length > 0 ? Math.round((completedCount / activeItems.length) * 100) : 0;

  const categories = [
    { key: 'docs', label: { tr: '📄 Belgeler & Finans', en: '📄 Documents & Money' } },
    { key: 'tech', label: { tr: '⚡ Elektronik & Güç', en: '⚡ Electronics & Power' } },
    { key: 'nomad', label: { tr: '💻 Dijital Göçebe & Ofis', en: '💻 Nomad Workstation' } },
    { key: 'health', label: { tr: '💊 Sağlık & İlaçlar', en: '💊 Health & Pharmacy' } },
    { key: 'clothes', label: { tr: '👕 Giyim & Aksesuar', en: '👕 Clothing & Gear' } }
  ];

  const handlePrintPdf = () => {
    const isTr = language === 'tr';
    const styleLabels: Record<TripStyle, string> = {
      beach: isTr ? 'Plaj & Deniz Tatili' : 'Beach & Resort',
      winter: isTr ? 'Kış & Kayak Tatili' : 'Winter & Ski',
      city: isTr ? 'Şehir Gezisi & Kültür' : 'City Break & Culture',
      nomad: isTr ? 'Dijital Göçebe & Çalışma' : 'Digital Nomad & Work',
      backpack: isTr ? 'Sırt Çantası & Macera' : 'Backpacking & Trekking'
    };

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Vizamigo - ${isTr ? 'Akıllı Bavul Kontrol Listesi' : 'Smart Packing Checklist'}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 36px; color: #0F172A; max-width: 820px; margin: 0 auto; line-height: 1.5; background: #FFF; }
    .header { border-bottom: 3px solid #0D9488; padding-bottom: 18px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end; }
    .logo { font-size: 26px; font-weight: 900; color: #0D9488; letter-spacing: -0.5px; }
    .title { font-size: 20px; font-weight: 800; margin: 4px 0 0; color: #042F2E; }
    .meta { font-size: 13px; color: #64748B; margin-top: 6px; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; background: #CCFBF1; color: #042F2E; }
    .category { margin-top: 22px; margin-bottom: 8px; font-size: 14px; font-weight: 800; color: #0F766E; border-bottom: 1.5px solid #CCFBF1; padding-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
    .item { display: flex; align-items: flex-start; gap: 12px; padding: 7px 0; font-size: 13px; border-bottom: 1px dashed #E2E8F0; }
    .box { width: 15px; height: 15px; border: 2px solid #0D9488; border-radius: 4px; display: inline-block; margin-top: 2px; flex-shrink: 0; box-sizing: border-box; }
    .checked .box { background: #0D9488; position: relative; }
    .checked .box::after { content: '✓'; color: white; font-size: 11px; position: absolute; top: -3px; left: 2px; font-weight: bold; }
    .text { flex: 1; font-weight: 500; }
    .checked .text { color: #94A3B8; text-decoration: line-through; }
    .notice { margin-top: 28px; padding: 14px 18px; background: #FEF3C7; border-left: 4px solid #F59E0B; border-radius: 8px; font-size: 12px; color: #92400E; }
    @media print { body { padding: 16px; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">Vizamigo ✈️</div>
      <div class="title">${isTr ? 'Akıllı Bavul Kontrol Listesi' : 'Smart Packing Checklist'}</div>
      <div class="meta">${isTr ? 'Seyahat Stili:' : 'Trip Style:'} <strong>${styleLabels[activeStyle]}</strong> · ${isTr ? 'Durum:' : 'Status:'} <strong>${completedCount}/${activeItems.length} ${isTr ? 'Hazır' : 'Packed'} (%${progressPercent})</strong></div>
    </div>
    <div style="text-align: right;">
      <span class="badge">${new Date().toLocaleDateString(isTr ? 'tr-TR' : 'en-US')}</span>
    </div>
  </div>

  ${categories.map(cat => {
    const catItems = activeItems.filter(i => i.category === cat.key);
    if (catItems.length === 0) return '';
    return `
      <div class="category">${isTr ? cat.label.tr : cat.label.en}</div>
      ${catItems.map(item => {
        const isDone = checkedIds.has(item.id);
        const itemText = isTr ? item.text.tr : item.text.en;
        return `
          <div class="item ${isDone ? 'checked' : ''}">
            <div class="box"></div>
            <div class="text">${itemText}</div>
          </div>
        `;
      }).join('')}
    `;
  }).join('')}

  <div class="notice">
    <strong>⚠️ ${isTr ? 'Havacılık & Güvenlik Hatırlatmaları:' : 'Aviation & Baggage Regulations:'}</strong><br/>
    • ${isTr ? 'Powerbank ve lityum piller kesinlikle uçak altı bagaja verilemez; kabin (el) bagajında taşınmalıdır (Maksimum 20.000 - 27.000 mAh).' : 'Powerbanks and lithium batteries must be kept in cabin hand luggage, never in checked baggage (Max 20,000-27,000 mAh).'}<br/>
    • ${isTr ? 'Kabin bagajı sıvı kuralı: Her kap maksimum 100 ml olmalı ve şeffaf 1 litrelik kilitli torbaya sığmalıdır.' : 'Cabin liquid rule: Each container max 100ml, fitting in a single 1L transparent zip bag.'}<br/>
    • ${isTr ? 'Pasaport geçerlilik süresi gidilecek ülkeye göre en az 6 ay olmalıdır.' : 'Passport must be valid for at least 6 months depending on destination entry rules.'}
  </div>
</body>
</html>`;

    const printWin = window.open('', '_blank');
    if (printWin) {
      printWin.document.write(html);
      printWin.document.close();
      printWin.focus();
      setTimeout(() => printWin.print(), 350);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Luggage className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                  {l('Akıllı Bavul Hazırlık Kontrol Listesi', 'Smart Packing Checklist', 'Smarte Packliste', 'Lista de Equipaje Inteligente', 'Умный список вещей')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {l('Seyahat tipine özel liste, ilerleme çubuğu ve kalıcı hafıza', 'Customized by trip style, progress tracker & auto-saved', 'Individuell nach Reisestil, Fortschrittsbalken', 'Personalizado por tipo de viaje', 'Сохраняется автоматически')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrintPdf}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black bg-gradient-to-r from-[#F97316] to-[#FB7185] text-white hover:brightness-110 shadow-sm cursor-pointer transition-all"
                title={l('PDF Olarak İndir / Yazdır', 'Print / Save as PDF')}
              >
                <span>📄</span>
                <span>{l('PDF / Yazdır', 'PDF / Print')}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                title={l('Kapat', 'Close')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Trip Style Filters */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'city', icon: Building2, label: { tr: '🏛️ Şehir Turu', en: 'City Break' } },
              { id: 'beach', icon: Sun, label: { tr: '🏖️ Deniz & Tatil', en: 'Beach / Summer' } },
              { id: 'winter', icon: Snowflake, label: { tr: '❄️ Kış & Kayak', en: 'Winter / Snow' } },
              { id: 'nomad', icon: Laptop, label: { tr: '💻 Dijital Göçebe', en: 'Digital Nomad' } },
              { id: 'backpack', icon: Compass, label: { tr: '🎒 Sırt Çantalı', en: 'Backpacker' } }
            ].map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => setActiveStyle(style.id as TripStyle)}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeStyle === style.id
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 hover:bg-slate-100'
                }`}
              >
                {style.label[language === 'tr' ? 'tr' : 'en']}
              </button>
            ))}
          </div>

          {/* Progress Bar & Actions */}
          <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-700 dark:text-slate-300">
                  {completedCount} / {activeItems.length} {l('Madde Tamamlandı', 'Items Packed', 'Gepackt', 'Empacado', 'Собрано')}
                </span>
                <span className="text-teal-600 dark:text-teal-400 font-mono font-black">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                type="button"
                onClick={checkAll}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800/40 hover:bg-teal-100 transition-colors cursor-pointer"
              >
                {l('Tümünü Seç', 'Check All', 'Alle wählen', 'Marcar Todo', 'Все')}
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                {l('Temizle', 'Clear', 'Leeren', 'Limpiar', 'Сброс')}
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Checklist */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {categories.map((cat) => {
            const catItems = activeItems.filter((i) => i.category === cat.key);
            if (catItems.length === 0) return null;

            return (
              <div key={cat.key} className="space-y-2.5">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {cat.label[language === 'tr' ? 'tr' : 'en']}
                </h4>

                <div className="space-y-1.5">
                  {catItems.map((item) => {
                    const isChecked = checkedIds.has(item.id);
                    const itemText = item.text[language === 'tr' ? 'tr' : 'en'];

                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleCheck(item.id)}
                        className={`group flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-teal-50/60 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800/40 text-slate-500 dark:text-slate-400 line-through'
                            : 'bg-slate-50/70 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-100/80 dark:hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-2">
                          <div className="text-teal-600 dark:text-teal-400 flex-shrink-0">
                            {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-400" />}
                          </div>
                          <span className="text-xs font-semibold leading-relaxed truncate">{itemText}</span>
                        </div>

                        {item.isCustom && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCustomItem(item.id);
                            }}
                            className="p-1 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Custom Item Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] flex items-center gap-2">
          <input
            type="text"
            value={newCustomText}
            onChange={(e) => setNewCustomText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCustomItem()}
            placeholder={l('Özel eşya ekle... (örn: Drone, Dalış maskesi)', 'Add custom item... (e.g. Drone, Snorkel mask)', 'Eigenen Gegenstand hinzufügen...', 'Añadir elemento...', 'Добавить вещь...')}
            className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          <button
            type="button"
            onClick={addCustomItem}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{l('Ekle', 'Add', 'Hinzufügen', 'Añadir', 'Добавить')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
