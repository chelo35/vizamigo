import React, { useRef, useState, useEffect } from 'react';
import {
  X,
  ArrowLeft,
  ShieldCheck,
  Download,
  Upload,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  FileCheck,
  FileText,
  Scale,
  Lock,
  PhoneCall,
  Plane,
  Building,
  Mail,
  Award,
  Users,
  Briefcase,
  HeartHandshake,
  Globe2,
  Leaf,
  Code2,
  Camera,
  Search,
  ExternalLink
} from 'lucide-react';
import { exportAppData, importAppData, clearAllAppData } from '../utils/storage';
import { getInfoPage } from '../data/infoPages';
import { useI18n } from '../data/i18n';
import { useModalA11y } from '../utils/useModalA11y';
import { COUNTRY_VISUALS_LIST } from '../data/countryVisualsData';
import { getFlag, getCountryName } from '../data/passportData';

interface LegalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataResetOrImported?: () => void;
  initialTab?: string;
  /** Yeni arayüz: sadece içerik gövdesini döndürür (pencere çerçevesi yok). */
  embedded?: boolean;
}

export const LegalInfoModal: React.FC<LegalInfoModalProps> = ({
  isOpen,
  onClose,
  onDataResetOrImported,
  initialTab = 'terms',
  embedded = false,
}) => {
  const { language, l } = useI18n();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [importStatus, setImportStatus] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [attributionSearch, setAttributionSearch] = useState<string>('');

  useModalA11y({
    isOpen: isOpen && !embedded,
    onClose,
    modalRef
  });

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  const handleExport = () => {
    const data = exportAppData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Vizamigo_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportStatus('');
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const success = importAppData(json);
        if (success) {
          setImportStatus(
            l(
              'Veriler başarıyla içe aktarıldı ve geri yüklendi!',
              'Data restored and imported successfully!',
              'Daten erfolgreich importiert und wiederhergestellt!',
              '¡Datos restaurados e importados con éxito!',
              'Данные успешно импортированы и восстановлены!'
            )
          );
          if (onDataResetOrImported) onDataResetOrImported();
        } else {
          setImportStatus(l('Yedek dosyası formatı geçersiz.', 'Invalid backup file format.', 'Ungültiges Sicherungsformat.', 'Formato de copia no válido.', 'Неверный формат резервной копии.'));
        }
      } catch {
        setImportStatus(l('JSON dosyası okunamadı veya bozuk.', 'Could not read or parse JSON file.', 'Die JSON-Datei konnte nicht gelesen werden.', 'No se pudo leer el archivo JSON.', 'Не удалось прочитать файл JSON.'));
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    const confirmMsg = l(
      'Tüm kayıtlı seyahatleriniz, rotalarınız ve kontrol listeleriniz bu cihazdan silinecektir. Onaylıyor musunuz?',
      'All your saved trips, itineraries, and preparation checklists will be permanently cleared from this device. Are you sure?',
      'Alle Ihre gespeicherten Reisen, Reiserouten und Checklisten werden von diesem Gerät gelöscht. Bestätigen?',
      'Se borrarán todos sus viajes guardados, itinerarios y listas de este dispositivo. ¿Desea confirmar?',
      'Все ваши сохраненные поездки, маршруты и списки будут удалены с этого устройства. Подтверждаете?'
    );
    if (window.confirm(confirmMsg)) {
      clearAllAppData();
      if (onDataResetOrImported) onDataResetOrImported();
      onClose();
    }
  };

  const tabGroups = [
    {
      groupTitle: l('Yasal & Şartlar', 'Legal & Terms', 'Rechtliches', 'Legal y Términos', 'Юридическая инфо'),
      items: [
        { id: 'terms', label: l('Kullanım Koşulları', 'Terms of Service', 'Nutzungsbedingungen', 'Términos', 'Условия'), icon: Scale },
        { id: 'privacy', label: l('Gizlilik Politikası', 'Privacy Policy', 'Datenschutz', 'Privacidad', 'Конфиденциальность'), icon: Lock },
        { id: 'disclaimer', label: l('Sorumluluk Reddi', 'Disclaimer', 'Haftungsausschluss', 'Descargo', 'Отказ от ответственности'), icon: AlertTriangle },
        { id: 'kvkk_gdpr', label: l('KVKK & GDPR', 'GDPR / Privacy', 'DSGVO', 'RGPD', 'Защита данных'), icon: FileText },
        { id: 'standards', label: l('Mevzuat & Standartlar', 'Source Standards', 'Quellenstandards', 'Estándares', 'Стандарты'), icon: FileCheck },
        { id: 'attributions', label: l('Görsel Lisansları & Atıflar', 'Photo Credits & Attributions', 'Bildnachweise & Lizenzen', 'Créditos de Fotos', 'Лицензии и авторство фото'), icon: Camera },
      ]
    },
    {
      groupTitle: l('Seyahat & Konsolosluk', 'Travel & Consular', 'Reise & Konsular', 'Viajes y Consular', 'Консульские вопросы'),
      items: [
        { id: 'appeals', label: l('Vize Ret İtirazı', 'Visa Appeals', 'Visum-Widerspruch', 'Apelación de Visa', 'Апелляция визы'), icon: Scale },
        { id: 'passport_lost', label: l('Pasaport Kaybı', 'Passport Lost', 'Passverlust', 'Pérdida de Pasaporte', 'Утеря паспорта'), icon: PhoneCall },
        { id: 'crisis', label: l('Konsolosluk Kriz Masası', 'Crisis Desk', 'Krisenzentrum', 'Mesa de Crisis', 'Кризисный центр'), icon: Building },
        { id: 'transit', label: l('Transit Kuralları', 'Transit Rules', 'Transitregeln', 'Reglas de Tránsito', 'Правила транзита'), icon: Plane },
      ]
    },
    {
      groupTitle: l('Ortaklar & Ekosistem', 'Partners & Ecosystem', 'Partner & Ökosystem', 'Socios y Ecosistema', 'Партнеры и экосистема'),
      items: [
        { id: 'partners', label: l('Acente Masası', 'Agencies Desk', 'Agentur-Portal', 'Mesa de Agencias', 'Визовые агентства'), icon: Briefcase },
        { id: 'airlines', label: l('Havayolu Entegrasyonu', 'Airline Integration', 'Airlines & Grenzen', 'Integración Aérea', 'Авиакомпании'), icon: Plane },
        { id: 'insurance', label: l('Sağlık Sigortası', 'Health Insurance', 'Reiseversicherung', 'Seguro Médico', 'Страхование'), icon: HeartHandshake },
        { id: 'community', label: l('Gezgin Katkı Masası', 'Community Desk', 'Gezgin-Portal', 'Comunidad', 'Сообщество'), icon: Users },
        { id: 'api', label: l('Kurumsal API', 'Enterprise API', 'Enterprise API', 'API Corporativa', 'Корпоративный API'), icon: Code2 },
      ]
    },
    {
      groupTitle: l('Kurumsal & Ekip', 'Company & Team', 'Unternehmen & Team', 'Empresa y Equipo', 'О компании'),
      items: [
        { id: 'mission', label: l('Misyonumuz', 'Our Mission', 'Unsere Mission', 'Nuestra Misión', 'Наша миссия'), icon: Award },
        { id: 'sustainability', label: l('Sürdürülebilir Seyahat', 'Sustainability', 'Nachhaltigkeit', 'Sostenibilidad', 'Экология'), icon: Leaf },
        { id: 'careers', label: l('Kariyer & Ekip', 'Careers & Team', 'Karriere', 'Carreras', 'Карьера'), icon: Users },
        { id: 'press', label: l('Basın & İletişim', 'Press & Contact', 'Presse & Kontakt', 'Prensa y Contacto', 'Пресса и контакты'), icon: Mail },
        { id: 'backup', label: l('Veri Yönetimi & Yedek', 'Data Backup', 'Datensicherung', 'Copia de Seguridad', 'Резервное копирование'), icon: RotateCcw }
      ]
    }
  ];

  const allTabs = tabGroups.flatMap(g => g.items);
  const currentTabObj = allTabs.find(t => t.id === activeTab) || allTabs[0];

  const body = (
    <>
          {/* Sade, doğru metinli bilgi sayfaları (src/data/infoPages.ts) */}
          {(() => {
            const pg = getInfoPage(activeTab, language);
            if (!pg) return null;
            return (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{pg.title}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{pg.sub}</p>
                </div>
                {pg.blocks.map((b, i) => (
                  <div key={i} className="space-y-2">
                    {b.h && <h3 className="text-base font-bold text-slate-900 dark:text-white">{b.h}</h3>}
                    {b.p && <p>{b.p}</p>}
                    {b.li && (
                      <ul className="list-disc pl-5 space-y-1">
                        {b.li.map((x) => <li key={x}>{x}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            );
          })()}

          {/* TAB: PHOTO CREDITS & ATTRIBUTIONS */}
          {activeTab === 'attributions' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 shrink-0">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      {l('Görsel Lisansları & Fotoğrafçı Atıfları', 'Destination Photography & Creative Commons Attributions', 'Bildnachweise & Creative-Commons-Lizenzen', 'Créditos de Imágenes y Licencias', 'Лицензии и авторство фото')}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {l('199 Dünya Ülkesi · Creative Commons, Public Domain & Doğrulanmış Açık Lisans Envanteri', '199 countries · Creative Commons, public domain and open licences', '199 Länder · Creative Commons, gemeinfrei und offene Lizenzen', '199 países · Creative Commons, dominio público y licencias abiertas', '199 стран · Creative Commons, общественное достояние и открытые лицензии')}
                    </p>
                  </div>
                </div>

                {/* Filter / Search Bar */}
                <div className="relative w-full sm:w-64 shrink-0">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={attributionSearch}
                    onChange={(e) => setAttributionSearch(e.target.value)}
                    placeholder={l('Ülke veya fotoğrafçı ara...', 'Search destination or photographer...', 'Land oder Fotograf suchen…', 'Buscar país o fotógrafo…', 'Поиск страны или фотографа…')}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/40 text-xs sm:text-sm text-teal-900 dark:text-teal-200 space-y-2">
                <p className="font-bold">
                  {l('Lisanslama & Fikri Mülkiyet İlkeleri:', 'Licensing and attribution:', 'Lizenzen und Namensnennung:', 'Licencias y atribución:', 'Лицензии и указание авторства:')}
                </p>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {l(
                    'Ülke sayfalarındaki fotoğraflar Wikimedia Commons ve benzeri açık lisanslı ya da kamu malı kaynaklardan alınmıştır. Her fotoğrafın sahibi, kaynağı ve lisansı aşağıda yazar. Rezervasyon bölümlerindeki bazı süsleme görselleri yapay zekâ yardımıyla üretilmiştir.',
                    'Photos on country pages come from Wikimedia Commons and similar openly licensed or public-domain sources. Each photo’s author, source and licence are listed below. Some decorative images in the booking sections were made with the help of AI.',
                    'Die Fotos auf den Länderseiten stammen aus Wikimedia Commons und ähnlichen offen lizenzierten oder gemeinfreien Quellen. Urheber, Quelle und Lizenz jedes Fotos stehen unten. Einige Schmuckbilder in den Buchungsbereichen wurden mit Hilfe von KI erstellt.',
                    'Las fotos de las páginas de países proceden de Wikimedia Commons y fuentes similares con licencia abierta o de dominio público. El autor, la fuente y la licencia de cada foto figuran abajo. Algunas imágenes decorativas de las secciones de reserva se crearon con ayuda de IA.',
                    'Фотографии на страницах стран взяты из Wikimedia Commons и похожих источников с открытой лицензией или в общественном достоянии. Автор, источник и лицензия каждого фото указаны ниже. Некоторые декоративные изображения в разделах бронирования созданы с помощью ИИ.'
                  )}
                </p>
              </div>

              {/* Responsive Grid of Countries */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[550px] overflow-y-auto pr-1">
                {COUNTRY_VISUALS_LIST
                  .filter((item) => {
                    if (!attributionSearch.trim()) return true;
                    const q = attributionSearch.toLowerCase();
                    const countryName = getCountryName(item.code, language).toLowerCase();
                    return (
                      item.code.toLowerCase().includes(q) ||
                      countryName.includes(q) ||
                      item.author.toLowerCase().includes(q) ||
                      item.landmark.toLowerCase().includes(q) ||
                      (item.landmarkI18n?.en || '').toLowerCase().includes(q)
                    );
                  })
                  .map((item) => {
                    const countryName = getCountryName(item.code, language);
                    const flag = getFlag(item.code);
                    const localizedLandmark =
                      item.landmarkI18n?.[language as keyof typeof item.landmarkI18n] ||
                      item.landmark;

                    return (
                      <div
                        key={item.code}
                        className="flex items-center gap-3.5 p-3 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/10 hover:border-teal-500/40 transition-colors"
                      >
                        <img
                          src={`/images/countries/${item.code.toLowerCase()}-240.webp`}
                          alt={`${countryName} - ${localizedLandmark}`}
                          className="w-16 h-14 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-white/10"
                          loading="lazy"
                        />
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex items-center justify-between gap-1.5">
                            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                              {flag} {countryName} ({item.code})
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 shrink-0">
                              {item.license}
                            </span>
                          </div>
                          <div className="text-[11px] text-teal-700 dark:text-teal-300 font-medium truncate">
                            📍 {localizedLandmark}
                          </div>
                          <div className="flex items-center justify-between gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                            <span className="truncate">
                              📷 {item.author || 'Creative Commons Contributor'}
                            </span>
                            <a
                              href={item.sourcePageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-0.5 text-teal-600 dark:text-teal-400 hover:underline shrink-0 font-medium"
                              title={l('Orijinal Kaynağı Görüntüle', 'View original source', 'Originalquelle ansehen', 'Ver fuente original', 'Открыть источник')}
                            >
                              <span>{l('Kaynak', 'Source', 'Quelle', 'Fuente', 'Источник')}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* TAB: BACKUP */}
          {activeTab === 'backup' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {l('Veri Yedekleme, Dışa Aktarma & Cihaz Sıfırlama', 'Data backup, export and reset', 'Datensicherung, Export und Zurücksetzen', 'Copia de seguridad, exportación y restablecimiento', 'Резервная копия, экспорт и сброс')}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {l('Cihaz Değişikliği İçin Yerel JSON Arşivi ve Tam Temizleme', 'A local JSON file for switching devices, or a full reset', 'Lokale JSON-Datei für den Gerätewechsel oder vollständiges Zurücksetzen', 'Archivo JSON local para cambiar de dispositivo o borrado completo', 'Локальный файл JSON для смены устройства или полный сброс')}
                  </p>
                </div>
              </div>

              <p>
                {l('Cihaz değiştirdiğinizde veya verilerinizi arşivlemek istediğinizde JSON dosyası indirebilir veya mevcut bir yedeği yükleyebilirsiniz.', 'Download a JSON file when you switch devices or want an archive, or upload an existing backup.', 'Lade eine JSON-Datei herunter, wenn du das Gerät wechselst oder archivieren willst, oder spiele eine vorhandene Sicherung ein.', 'Descarga un archivo JSON al cambiar de dispositivo o para archivar, o sube una copia existente.', 'Скачайте файл JSON при смене устройства или для архива либо загрузите существующую копию.')}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleExport}
                  className="px-5 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" /> {l('Yedeği İndir (.json)', 'Download backup (.json)', 'Sicherung herunterladen (.json)', 'Descargar copia (.json)', 'Скачать копию (.json)')}
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-5 py-3 rounded-2xl bg-white dark:bg-white/10 border border-teal-300 dark:border-white/20 hover:border-teal-500 text-slate-800 dark:text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Upload className="w-4 h-4" /> {l('Yedeği Geri Yükle', 'Restore backup', 'Sicherung wiederherstellen', 'Restaurar copia', 'Восстановить копию')}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-3 rounded-2xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-200 transition-colors font-bold text-xs flex items-center gap-2 ml-auto cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" /> {l('Tümünü Sıfırla', 'Reset all data', 'Alles zurücksetzen', 'Restablecer todo', 'Сбросить всё')}
                </button>
              </div>

              {importStatus && (
                <p className={`p-4 rounded-2xl text-xs font-semibold ${
                  importStatus.includes('başarıyla') || importStatus.includes('successfully') || importStatus.includes('erfolgreich')
                    ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-500/10 text-rose-800 dark:text-rose-300 border border-rose-500/30'
                }`}>
                  {importStatus}
                </p>
              )}
            </div>
          )}
    </>
  );

  if (embedded) return <div className="vz-prose">{body}</div>;

  return (
    <div
      ref={modalRef}
      role="region"
      aria-labelledby="legal-page-title"
      tabIndex={-1}
      className="fixed inset-0 z-50 bg-[#F8FAFC] dark:bg-[#0B0F17] flex flex-col overflow-hidden text-slate-900 dark:text-slate-100 animate-in fade-in duration-150"
    >
      {/* 1. TOP EXECUTIVE APP BAR (CLEAN AIRBNB / APPLE STYLE - ZERO WINDOW BUTTONS) */}
      <header className="sticky top-0 z-30 shrink-0 px-4 sm:px-8 py-3 bg-white/95 dark:bg-[#0B0F17]/95 border-b border-slate-200/80 dark:border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: [ ← Keşfet'e Dön ] + Icon + Title */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 transition-all cursor-pointer shrink-0"
              title={l('Keşfet\'e Dön', 'Back to Explore', 'Zurück', 'Volver', 'Назад')}
            >
              <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span>{l('Keşfet\'e Dön', 'Back to Explore', 'Zurück', 'Volver', 'Назад')}</span>
            </button>

            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 rounded-xl bg-teal-600 text-white shadow-xs shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h1 id="legal-page-title" className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight truncate">
                  {l('Vizamigo Hukuki, Kurumsal & Mevzuat Merkezi', 'Vizamigo information centre', 'Vizamigo Infozentrum', 'Centro de información de Vizamigo', 'Информационный центр Vizamigo')}
                </h1>
                <p className="text-xs font-semibold text-teal-700 dark:text-teal-300 truncate hidden sm:block">
                  {l('Resmi Mevzuat, Güvenlik Standartları, Ekosistem Ortaklıkları & Gezgin Hakları', 'Legal pages, sources and help', 'Rechtliches, Quellen und Hilfe', 'Avisos legales, fuentes y ayuda', 'Правовая информация, источники и помощь')}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Close button */}
          <button
            type="button"
            onClick={onClose}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer shrink-0 inline-flex items-center gap-1.5"
            title={l('Kapat', 'Close', 'Schließen', 'Cerrar', 'Закрыть')}
          >
            <X className="w-5 h-5" />
            <span className="text-xs font-bold hidden sm:inline">{l('Kapat', 'Close', 'Schließen', 'Cerrar', 'Закрыть')}</span>
          </button>
        </div>
      </header>

      {/* Mobile Horizontal Quick Navigation */}
      <div className="md:hidden shrink-0 px-4 py-2.5 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B0F17] overflow-x-auto scrollbar-none flex items-center gap-1.5 whitespace-nowrap">
        {allTabs.map((t) => {
          const isActive = activeTab === t.id;
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-teal-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. MAIN BODY (SIDEBAR ON DESKTOP + SCROLLABLE CONTENT) */}
      <div className="flex-1 flex overflow-hidden max-w-7xl mx-auto w-full">
        {/* Left Sidebar (Desktop Only) */}
        <aside className="hidden md:block w-72 shrink-0 border-r border-slate-200 dark:border-white/10 overflow-y-auto p-5 space-y-6 bg-slate-50/50 dark:bg-white/[0.01]">
          {tabGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 py-1">
                {group.groupTitle}
              </div>
              <div className="space-y-1">
                {group.items.map((tab) => {
                  const isActive = activeTab === tab.id;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all text-left cursor-pointer ${
                        isActive
                          ? 'bg-teal-600 text-white shadow-sm ring-1 ring-teal-500/50'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                      <span className="truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quick Trust Badge in Sidebar */}
          <div className="pt-4 border-t border-slate-200 dark:border-white/10 text-[11px] font-bold text-slate-400 space-y-1 px-3">
            <div>Vizamigo™ Global Mobility</div>
            <div>Official Feeds Synced · 256-Bit SSL</div>
          </div>
        </aside>

        {/* Right Article Scroll Pane */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-10 space-y-8 max-w-4xl leading-relaxed text-slate-700 dark:text-slate-300 text-sm">
          {body}
        </main>
      </div>

      {/* 3. Bottom Sticky Bar */}
      <footer className="shrink-0 px-4 sm:px-8 py-3 border-t border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#0B0F17]/95 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="font-semibold text-teal-800 dark:text-teal-300">
          Vizamigo™ · 256-Bit SSL Secured · Official Feeds Synced
        </span>
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs shadow-sm transition-colors cursor-pointer"
        >
          {l('Kapat', 'Close', 'Schließen', 'Cerrar', 'Закрыть')}
        </button>
      </footer>
    </div>
  );
};
