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
import { useI18n } from '../data/i18n';
import { useModalA11y } from '../utils/useModalA11y';
import { COUNTRY_VISUALS_LIST } from '../data/countryVisualsData';
import { getFlag, getCountryName } from '../data/passportData';

interface LegalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataResetOrImported?: () => void;
  initialTab?: string;
}

export const LegalInfoModal: React.FC<LegalInfoModalProps> = ({
  isOpen,
  onClose,
  onDataResetOrImported,
  initialTab = 'terms',
}) => {
  const { language, l } = useI18n();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [importStatus, setImportStatus] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [attributionSearch, setAttributionSearch] = useState<string>('');

  useModalA11y({
    isOpen,
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
          setImportStatus(l('Yedek dosyası formatı geçersiz.', 'Invalid backup file format.', 'Ungültiges Backup-Dateiformat.'));
        }
      } catch {
        setImportStatus(l('JSON dosyası okunamadı veya bozuk.', 'Could not read or parse JSON file.', 'JSON-Datei konnte nicht gelesen werden.'));
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
              title={l("Keşfet'e Dön", 'Back to Explore', 'Zurück')}
            >
              <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span>{l("Keşfet'e Dön", 'Back', 'Zurück')}</span>
            </button>

            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 rounded-xl bg-teal-600 text-white shadow-xs shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h1 id="legal-page-title" className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight truncate">
                  {l('Vizamigo Hukuki, Kurumsal & Mevzuat Merkezi', 'Vizamigo Legal, Regulatory & Corporate Portal', 'Vizamigo Rechts-, Regulierungs- & Unternehmensportal')}
                </h1>
                <p className="text-xs font-semibold text-teal-700 dark:text-teal-300 truncate hidden sm:block">
                  {l('Resmi Mevzuat, Güvenlik Standartları, Ekosistem Ortaklıkları & Gezgin Hakları', 'Immigration Protocols, Verification Standards & Global Partnerships')}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Close button */}
          <button
            type="button"
            onClick={onClose}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer shrink-0 inline-flex items-center gap-1.5"
            title={l('Kapat', 'Close')}
          >
            <X className="w-5 h-5" />
            <span className="text-xs font-bold hidden sm:inline">{l('Kapat', 'Close')}</span>
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
          {/* TAB: TERMS */}
          {activeTab === 'terms' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {l('Hizmet Kullanım Koşulları (Terms of Service)', 'Terms of Service', 'Allgemeine Nutzungsbedingungen')}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {l('Yürürlük Tarihi: 2026 · Vizamigo Bağımsız Küresel Hareketlilik Platformu', 'Effective: 2026 · Vizamigo Independent Global Mobility Platform')}
                  </p>
                </div>
              </div>

              <p>
                {l(
                  'Vizamigo platformunu kullanarak, bu sözleşmede yer alan tüm şart ve kuralları gayrikabili rücu kabul etmiş sayılırsınız. Vizamigo, kullanıcılara küresel seyahat serbestisi, pasaport vize rejimleri, sınır kontrolleri, transit kuralları ve dijital göçebe rotaları hakkında analitik ve bilgilendirici içerik sunan bağımsız bir dijital seyahat rehberidir.',
                  'By accessing and using the Vizamigo platform, you irrevocably agree to comply with and be bound by these Terms of Service. Vizamigo operates as an independent digital travel intelligence platform providing data on visa regimes, border entry criteria, transit rules, and nomad programs.',
                  'Durch den Zugriff auf Vizamigo akzeptieren Sie diese Nutzungsbedingungen vollumfänglich. Vizamigo ist eine unabhängige Plattform zur Recherche von Visabestimmungen, Einreisevorschriften und Nomadenprogrammen.'
                )}
              </p>

              <div className="p-5 rounded-3xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                  {l('1. Bilgilendirmenin Niteliği & Taahhütsüzlük', '1. Nature of Information & Non-Binding Notice', '1. Informationscharakter & Unverbindlichkeit')}
                </h3>
                <p>
                  {l(
                    'Vizamigo resmi bir vize onay mercii, büyükelçilik veya göç idaresi değildir. Platformumuzda sunulan vize süreleri, harçlar, asgari banka bakiyeleri ve kabul protokolleri yalnızca seyahat planlaması için genel rehber niteliğindedir. Egemen devletlerin sınır ve gümrük muhafaza memurları (Border Guard) herhangi bir gerekçe göstermeksizin ülkeye kabul etmeme veya vizeyi iptal etme hakkına haizdir.',
                    'Vizamigo is not a governmental authority, embassy, or border agency. All stated durations, financial requirements, and visa rules are indicative references for travel planning only. Sovereign immigration officers retain full legal discretion to grant or deny entry.',
                    'Vizamigo ist keine staatliche Behörde oder Botschaft. Alle Angaben zu Aufenthaltsdauern und Gebühren dienen ausschließlich der unverbindlichen Orientierung. Grenzbeamte entscheiden souverän über die tatsächliche Einreise.'
                  )}
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                  {l('2. Fikri Mülkiyet & Ticari Kullanım Sınırları', '2. Intellectual Property Rights', '2. Geistiges Eigentum')}
                </h3>
                <p>
                  {l(
                    'Sitedeki tüm arayüz bileşenleri, özel seyahat hesaplama algoritmaları, coğrafi veri haritaları ve metinler Vizamigo mülkiyetindedir. Önceden yazılı izin alınmaksızın kopyalanamaz, otomatik botlarla taranamaz (scraping) ve ticari ürünlerde kaynak gösterilmeden kullanılamaz.',
                    'All interface designs, custom calculation algorithms, and synthesized datasets are the exclusive intellectual property of Vizamigo and protected under global copyright treaties.',
                    'Sämtliche Layouts, Algorithmen und Datensätze sind urheberrechtlich geschützt und dürfen ohne Genehmigung nicht kopiert oder gescrapt werden.'
                  )}
                </p>
              </div>
            </div>
          )}

          {/* TAB: PRIVACY */}
          {activeTab === 'privacy' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {l('Gizlilik & Çerez Mimarisi', 'Privacy & Cookie Architecture', 'Datenschutz & Cookie-Richtlinie')}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {l('Sıfır Sunucu İletimi (Zero Remote Telemetry) İlkesi', 'Zero Remote Telemetry Guarantee')}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-950 dark:text-emerald-100 space-y-2">
                <div className="font-black text-sm sm:text-base flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  {l('Verileriniz Sadece Cihazınızda Kalır', 'Your Data Stays Exclusively On Your Device', 'Ihre Daten bleiben ausschließlich auf Ihrem Gerät')}
                </div>
                <p>
                  {l(
                    'Vizamigo seyahat tercihlerinizi, seçtiğiniz vatandaşlığı, planladığınız seyahat rotalarını ve pasaport bilgilerinizi ASLA harici sunuculara göndermez. Tüm veriler yalnızca kullandığınız cihazın tarayıcısında (LocalStorage) güvenli ve yerel olarak tutulur.',
                    'Vizamigo strictly does NOT transmit your logged trips, selected citizenships, dates, or checklists to any central server. All data remains exclusively within your local browser LocalStorage.',
                    'Vizamigo übermittelt Ihre Reisedaten, Pässe oder Checklisten zu keinem Zeitpunkt an externe Server. Sämtliche Daten verbleiben lokal in Ihrem Browser.'
                  )}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                  {l('Çerezler (Cookies) ve Yerel Bellek', 'Cookies & LocalStorage Usage', 'Cookies und LocalStorage')}
                </h3>
                <p>
                  {l(
                    'Sitemiz yalnızca tema tercihi (Açık/Koyu mod) ve aktif dil seçimini hatırlamak amacıyla minimum sistem çerezleri kullanır. Reklam hedeflemesi veya üçüncü taraf çapraz site takip çerezleri (Third-party tracking cookies) kesinlikle barındırılmaz.',
                    'Only essential technical cookies are utilized for maintaining theme settings (Dark/Light) and language preferences. Third-party advertising or cross-site tracking cookies are fully excluded.',
                    'Es werden lediglich technisch notwendige Cookies zur Speicherung von Sprache und Dark-Mode eingesetzt. Kein Drittanbieter-Tracking.'
                  )}
                </p>
              </div>
            </div>
          )}

          {/* TAB: DISCLAIMER */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {l('Yasal Sorumluluk Reddi (Disclaimer)', 'Legal Disclaimer', 'Rechtlicher Haftungsausschluss')}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {l('Diplomatik ve Konsolosluk Teyit Bildirimi', 'Consular & Diplomatic Verification Notice')}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-950 dark:text-amber-100 space-y-3">
                <p className="font-semibold">
                  {l(
                    'ÖNEMLİ: Vizamigo üzerinde sunulan tüm bilgiler (vize serbestisi gün sayıları, sınır kapısı gereksinimleri, aşı ve sigorta şartları, havalimanı transit muafiyetleri) iyi niyetle ve resmi kaynaklar taranarak derlenmiştir. Ancak ülkeler arası diplomatik krizler, sınır rejimi değişiklikleri veya hava yolu kuralları anlık olarak değişebilir.',
                    'IMPORTANT NOTICE: All information on Vizamigo is compiled in good faith from verified consular and diplomatic publications. However, border regimes, health mandates, and bilateral reciprocity agreements can alter rapidly without prior diplomatic circular.',
                    'WICHTIGER HINWEIS: Alle Angaben auf Vizamigo wurden nach bestem Wissen zusammengestellt. Einreise- und Visabestimmungen können sich jedoch jederzeit kurzfristig ändern.'
                  )}
                </p>
                <p>
                  {l(
                    'Kullanıcıların seyahat öncesinde nihai teyidi ilgili ülkenin Dışişleri Bakanlığı, yetkili vize aracı kurumu (VFS Global, TLScontact, BLS) veya resmi konsolosluğundan bizzat alması zorunludur. Vizamigo ve geliştiricileri, eksik veya değişen bilgilere dayalı uçağa alınmama, sınır dışı edilme, maddi veya manevi zararlardan sorumlu tutulamaz.',
                    'Travelers bear personal responsibility to confirm binding requirements with official consulates, embassies, or accredited application centers prior to departure. Vizamigo disclaims any liability for denied boarding, entry refusal, or financial losses.',
                    'Reisende sind verpflichtet, sich vor Abreise bei den zuständigen Behörden rückzuversichern. Vizamigo übernimmt keine Haftung für verweigerte Beförderung oder Einreise.'
                  )}
                </p>
              </div>
            </div>
          )}

          {/* TAB: KVKK & GDPR */}
          {activeTab === 'kvkk_gdpr' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {l('KVKK (6698) & GDPR (AB 2016/679) Aydınlatma Beyanı', 'KVKK & GDPR Compliance Statement', 'DSGVO- & KVKK-Datenschutzerklärung')}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {l('Kişisel Verilerin Korunması ve Tüketici Hakları', 'Data Subject Rights & Compliance')}
                  </p>
                </div>
              </div>

              <p>
                {l(
                  '6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Birliği Genel Veri Koruma Tüzüğü (GDPR) kapsamında veri sorumlusu sıfatıyla hareket eden Vizamigo, kişisel gizliliği birincil hak kabul eder.',
                  'In accordance with Law No. 6698 (KVKK) and the European Union General Data Protection Regulation (GDPR), Vizamigo guarantees full protection of personal rights.',
                  'Im Einklang mit der EU-Datenschutz-Grundverordnung (DSGVO) und dem KVKK gewährleistet Vizamigo den Schutz Ihrer Privatsphäre.'
                )}
              </p>

              <div className="p-5 rounded-3xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-3">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                  {l('Haklarınız (İlgili Kişi Hakları):', 'Your Statutory Rights:', 'Ihre Rechte:')}
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>{l('Verilerinizin sunucularda saklanıp saklanmadığını öğrenme (Platformumuzda uzak veri tutulmaz).', 'Right of access: No personal data is stored on remote servers.', 'Auskunftsrecht über gespeicherte Daten (keine externen Server).')}</li>
                  <li>{l('Tüm yerel verilerinizi tek tıkla cihazınızdan silme (Unutulma Hakkı / Veri Sıfırlama).', 'Right to erasure: Wipe all device data with one click.', 'Recht auf Löschung sämtlicher lokaler Daten.')}</li>
                  <li>{l('Verilerinizi taşınabilir JSON formatında dışa aktarma (Veri Taşınabilirliği).', 'Right to data portability: Export standalone JSON files.', 'Recht auf Datenübertragbarkeit via JSON-Export.')}</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB: STANDARDS */}
          {activeTab === 'standards' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {l('Resmi Mevzuat & Veri Doğrulama Standartlarımız', 'Official Immigration & Verification Standards', 'Einreisequellen & Verifizierungsstandards')}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {l('199 Egemen Pasaport ve 230+ Varış Noktası İçin Denetim Katmanları', 'Audit Layers for 199 Sovereign Passports and 230+ Destinations')}
                  </p>
                </div>
              </div>

              <p>
                {l(
                  'Vizamigo veri mimarisi, dünya genelinde 199 egemen pasaport ve 230+ varış noktası için aşağıdaki standartlara göre denetlenir:',
                  'Vizamigo synthesizes border criteria for 199 sovereign passports and 230+ destinations following strict audit layers:',
                  'Die Vizamigo-Datenbank stützt sich auf folgende standardisierte Prüfquellen:'
                )}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-3xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
                  <b className="text-teal-700 dark:text-teal-300 block text-sm">
                    {l('1. Dışişleri Bakanlıkları Diplomatik Tebliğleri', '1. Foreign Ministry Circulars')}
                  </b>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {l('T.C. Dışişleri Bakanlığı (MFA), ABD Dışişleri, Birleşik Krallık FCDO ve AB Dış İlişkiler Servisi (EEAS) seyahat uyarıları.', 'Official diplomatic bulletins from MFA Turkey, UK FCDO, US State Dept, and EEAS.')}
                  </p>
                </div>
                <div className="p-5 rounded-3xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
                  <b className="text-teal-700 dark:text-teal-300 block text-sm">
                    {l('2. Resmi Göç İdareleri & E-Vize Portalları', '2. National Immigration Authorities')}
                  </b>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {l('Tayland E-Vize, Endonezya Göç, Şengen Sınır Kodu, ABD CBP ve Körfez E-Vize sistemleri.', 'Primary portals including Thai eVisa, Indonesia Immigration, Schengen border code, US CBP, and GCC eVisa feeds.')}
                  </p>
                </div>
              </div>
            </div>
          )}

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
                      {l('199 Dünya Ülkesi · Creative Commons, Public Domain & Doğrulanmış Açık Lisans Envanteri', '199 World Destinations · CC-BY, CC-BY-SA, Public Domain & Verified Open Licenses')}
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
                    placeholder={l('Ülke veya fotoğrafçı ara...', 'Search destination or photographer...', 'Suchen...')}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/40 text-xs sm:text-sm text-teal-900 dark:text-teal-200 space-y-2">
                <p className="font-bold">
                  {l('Lisanslama & Fikri Mülkiyet İlkeleri:', 'Licensing & Attribution Standards:')}
                </p>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {l(
                    'Vizamigo platformundaki tüm ülke tanıtım görselleri; Wikimedia Commons, CC-BY, CC-BY-SA ve Kamu Malı (Public Domain) lisans kuralları çerçevesinde derlenmiş ve doğrulanmıştır. Her bir eser sahibinin adı, orijinal kaynak sayfası ve geçerli lisans koşulları aşağıda eksiksiz listelenmiştir.',
                    'All destination visuals on Vizamigo are curated from verified Creative Commons (CC BY, CC BY-SA), Public Domain, and open-access repositories. Every creator name, direct source repository page, and corresponding license terms are published below in compliance with Section 3(a)(1) of the Creative Commons Public License.'
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
                              title={l('Orijinal Kaynağı Görüntüle', 'View Original Source Page')}
                            >
                              <span>{l('Kaynak', 'Source')}</span>
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

          {/* TAB: APPEALS */}
          {activeTab === 'appeals' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {l('Schengen & Konsolosluk Vize Retlerine İtiraz Kılavuzu', 'Schengen & Consular Visa Appeals Protocol', 'Widerspruchsverfahren bei Visumablehnungen')}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {l('Şengen Vize Kodu Madde 32 Hukuki İtiraz Süreci', 'Article 32 Remonstration & Appeal Rights')}
                  </p>
                </div>
              </div>

              <p>
                {l(
                  'Konsolosluk vize başvurunuz reddedildiğinde, Şengen Vize Kodu (Madde 32) ve idari yargı usulleri uyarınca resmi itiraz (Remonstration / Appeal) hakkınız bulunmaktadır.',
                  'When a visa application is refused, Article 32 of the EU Visa Code guarantees your statutory right to submit an appeal (Remonstration).',
                  'Bei einer Visumablehnung haben Sie nach Art. 32 des EU-Visakodex das Recht auf formellen Widerspruch (Remonstration).'
                )}
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-white/[0.03] border border-rose-500/30 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-rose-500 text-white flex items-center justify-center font-black shrink-0 text-sm">1</span>
                  <div>
                    <b className="text-slate-900 dark:text-white text-sm">{l('Ret Gerekçesi Kodunu Belirleyin (Madde 1-16):', 'Identify the Refusal Reason Code:', 'Ablehnungsgrund identifizieren:')}</b>{' '}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">{l('En sık karşılaşılan ret gerekçeleri Madde 10 (Geri dönüş niyetinin kanıtlanamaması) ve Madde 8 (Maddi yetersizlik).', 'Most frequent reasons: Item 10 (intent to return not established) and Item 8 (insufficient financial proof).')}</p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-white/[0.03] border border-rose-500/30 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-rose-500 text-white flex items-center justify-center font-black shrink-0 text-sm">2</span>
                  <div>
                    <b className="text-slate-900 dark:text-white text-sm">{l('Yasal Süre İçinde İtiraz Dilekçesi Hazırlayın:', 'Submit Appeal Within Legal Window:', 'Widerspruchsfrist einhalten:')}</b>{' '}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">{l('Ret mektubunun tebliğ edildiği tarihten itibaren 30 gün içinde doğrudan konsolosluğa ıslak imzalı itiraz dilekçesi (Remonstrationsbrief) sunulmalıdır.', 'You have strictly 30 days from notification to deliver a signed remonstration letter addressing each objection.')}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PASSPORT LOST */}
          {activeTab === 'passport_lost' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {l('Yurt Dışında Pasaport Kaybı ve Çalınması Acil Durum Protokolü', 'Lost or Stolen Passport Emergency Protocol', 'Notfallprotokoll bei Passverlust im Ausland')}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {l('Adım Adım Konsolosluk Seyahat Belgesi Başvuru Rehberi', 'Emergency Travel Document (ETD) Guide')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-3xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
                  <b className="text-teal-700 dark:text-teal-300 flex items-center gap-1.5 text-sm">
                    <span>1.</span> {l('Polis Karakoluna Gidin & Tutanak Alın', '1. Obtain Police Report')}
                  </b>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{l('En yakın yerel polis merkezine giderek pasaport kaybı/çalıntı tutanağı (Police Report) tutturun. Bu belge konsoloslukta ve havalimanında zorunludur.', 'File a formal theft/loss report with local police. This certificate is mandatory for consular processing.')}</p>
                </div>
                <div className="p-5 rounded-3xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
                  <b className="text-teal-700 dark:text-teal-300 flex items-center gap-1.5 text-sm">
                    <span>2.</span> {l('Geçici Pasaport (Seyahat Belgesi) Başvurusu', '2. Emergency Travel Document')}
                  </b>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{l('Başkonsolosluğumuza 2 adet biyometrik fotoğraf ve T.C. kimlik kartınızla giderek yalnızca Türkiye’ye dönüşte geçerli Geçici Pasaport düzenletin.', 'Visit the Consulate General with national ID and 2 photos to obtain an Emergency Travel Document.')}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CRISIS DESK */}
          {activeTab === 'crisis' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {l('7/24 Dışişleri Konsolosluk Kriz Masası & Acil Yardım Hatları', '24/7 Consular Crisis Center & Emergency Hotlines', '24/7 Konsularischer Krisenstab & Notrufnummern')}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {l('Yurt Dışı Afet, Tahliye ve Diplomatik Acil Müdahale', 'Consular Evacuation, Disaster & Emergency Assistance')}
                  </p>
                </div>
              </div>

              <p>
                {l(
                  'Yurt dışında acil durum, kaza, tutuklanma, doğal afet veya savaş hallerinde ulusal acil diplomatik çağrı merkezleriyle doğrudan irtibata geçebilirsiniz:',
                  'In case of accidents, arrests, natural disasters, or consular emergencies abroad, contact official 24/7 hotlines directly:',
                  'Bei Notfällen im Ausland wenden Sie sich an die offiziellen konsularischen Notrufzentralen:'
                )}
              </p>

              <div className="p-5 rounded-3xl bg-teal-500/10 border-2 border-teal-500 space-y-3">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <div className="text-base font-black text-slate-900 dark:text-white">🇹🇷 {l('T.C. Dışişleri Bakanlığı Konsolosluk Çağrı Merkezi', 'Turkish MFA Consular Call Center')}</div>
                    <div className="text-xs text-teal-700 dark:text-teal-300 font-bold">{l('Yılın 365 günü 24 saat kesintisiz hizmet', '24/7/365 uninterrupted global service')}</div>
                  </div>
                  <a
                    href="tel:+903122922929"
                    className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-sm flex items-center gap-2 shadow-sm transition-colors"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>+90 312 292 29 29</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB: TRANSIT */}
          {activeTab === 'transit' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                  <Plane className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {l('Uluslararası Havalimanı Transit Geçiş Kuralları', 'International Airport Transit Rules', 'Internationale Transit- & Umsteigeregeln')}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {l('Transit Without Visa (TWOV) ve Havalimanı Transit Vizesi (ATV)', 'Airside Transit Without Visa (TWOV) & ATV Criteria')}
                  </p>
                </div>
              </div>

              <p>
                {l(
                  'Aktarmalı uçuşlarda transit salonundan (Airside) çıkmadan ve pasaport kontrolünden geçmeden 24 saate kadar kalınabilir. Ancak bazı ülkeler (Almanya, Fransa, Birleşik Krallık) belirli vatandaşlıklardan Havalimanı Transit Vizesi (ATV) talep etmektedir.',
                  'International transit without entering border control (Airside) is normally permitted up to 24 hours. Certain destinations (Schengen transit hubs, UK, USA) require Airport Transit Visas (ATV) depending on passport.',
                  'Der Transit im internationalen Bereich ist meist bis zu 24 Stunden ohne Visum gestattet. Prüfen Sie jedoch gesonderte Transitvisum-Pflichten (z. B. ATV für Schengen-Airside).'
                )}
              </p>
            </div>
          )}

          {/* TAB: PARTNERS (Column 4 Link 1) */}
          {activeTab === 'partners' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {l('Vize Danışmanlık Acenteleri Masası (B2B Ortaklık)', 'Visa Agencies & B2B Partner Portal', 'Visumagenturen & B2B Partnerportal')}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {l('TÜRSAB ve Uluslararası Seyahat Acenteleri İçin Doğrulanmış Veri Erişimi', 'Verified Consular Data Feeds for Travel Agencies')}
                  </p>
                </div>
              </div>

              <p>
                {l(
                  'Vizamigo, akredite vize danışmanlık firmaları, seyahat acenteleri ve kurumsal tur operatörleri için gerçek zamanlı mevzuat akışları ve müşteri yönlendirme altyapısı sunar.',
                  'Vizamigo provides real-time immigration feeds, checklist templates, and verified routing for accredited travel agencies and corporate tour operators.',
                  'Vizamigo bietet akkreditierten Visaagenturen und Reisebüros strukturierte Einreisedaten und Checklisten.'
                )}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-3xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
                  <b className="text-slate-900 dark:text-white text-sm">{l('Acente Başvuru & Entegrasyon', 'Agency Application & Integration')}</b>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {l('Kurumsal müşterilerinizin vize süreçlerini Vizamigo API ve güncel harç matrisleriyle optimize edin.', 'Optimize client visa processing with automated fee matrices and document checklists.')}
                  </p>
                </div>
                <div className="p-5 rounded-3xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
                  <b className="text-slate-900 dark:text-white text-sm">{l('İletişim & B2B Talep', 'B2B Contact')}</b>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {l('Acente anlaşmaları için: partners@vizamigo.com adresinden başvuru formunu talep edebilirsiniz.', 'For agency partnership inquiries: partners@vizamigo.com')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: AIRLINES (Column 4 Link 2) */}
          {activeTab === 'airlines' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <Plane className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {l('Havayolu & Sınır Entegrasyonu', 'Airline & Border Control Feeds', 'Airlines & Grenzkontroll-Feeds')}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {l('IATA Timatic ve Sınır Rejimi Uyumluluk Mimarisi', 'IATA Timatic Cross-Verification Architecture')}
                  </p>
                </div>
              </div>

              <p>
                {l(
                  'Hava yolu firmaları ve yer hizmetleri yer personeli, yolcuların uçağa biniş (Boarding) uygunluğunu IATA Timatic veri tabanına göre denetler. Vizamigo algoritmaları bu kurallarla eş zamanlı teyit mekanizmaları içerir.',
                  'Airlines verify boarding eligibility using IATA Timatic standards. Vizamigo architecture is tailored to reflect real-world airport check-in and boarding gate criteria.',
                  'Airlines prüfen Boarding-Kriterien anhand internationaler Standards wie IATA Timatic. Vizamigo orientiert sich an diesen praktischen Check-in-Anforderungen.'
                )}
              </p>

              <div className="p-5 rounded-3xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                  {l('Uçağa Kabul Edilmeme (Denied Boarding) Riskini Önleme', 'Preventing Denied Boarding Incidents')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {l(
                    'Dönüş bileti, otel rezervasyonu, pasaport geçerlilik süresi (en az 6 ay kuralı) ve transit vize şartları eksik olduğunda havayolları yolcuları uçağa kabul etmeme hakkına sahiptir. Kontrol listelerimiz bu riskleri sıfırlamak üzere tasarlanmıştır.',
                    'Airlines may deny boarding if return tickets, accommodation proofs, or passport validity thresholds (min 6 months) are not met. Our checklists prevent these setbacks.'
                  )}
                </p>
              </div>
            </div>
          )}

          {/* TAB: INSURANCE (Column 4 Link 3) */}
          {activeTab === 'insurance' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {l('Seyahat Sağlık Sigortası Ortakları & Standartları', 'Travel Health Insurance Standards', 'Reisekrankenversicherung Standards')}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {l('Schengen 30.000 € Teminatı ve Küresel Tıbbi Tahliye Gereksinimleri', 'Schengen €30,000 Minimum Coverage & Medical Repatriation')}
                  </p>
                </div>
              </div>

              <p>
                {l(
                  'Yurt dışı seyahatlerinde sağlık sigortası çoğu ülke için zorunlu yasal gerekliliktir. Schengen ülkeleri en az 30.000 € teminatlı, acil tıbbi bakım ve ülkeye nakil masraflarını kapsayan poliçe talep eder.',
                  'Travel health insurance is legally required by many sovereign states. Schengen members mandate minimum €30,000 coverage including emergency treatment and repatriation.',
                  'Eine Auslandskrankenversicherung ist für viele Staaten gesetzlich vorgeschrieben (z. B. Schengen-Mindestdeckung 30.000 € inkl. Rücktransport).'
                )}
              </p>

              <div className="p-5 rounded-3xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                  {l('Akredite Sigorta Sağlayıcıları İle Entegrasyon', 'Insurance Provider Verification')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {l(
                    'Vizamigo, uluslararası geçerliliği onaylı sigorta kuruluşlarıyla çalışır. Sigorta sağlayıcıları iş birliği için: insurance@vizamigo.com',
                    'Vizamigo collaborates with internationally recognized insurers. Inquiries: insurance@vizamigo.com'
                  )}
                </p>
              </div>
            </div>
          )}

          {/* TAB: COMMUNITY (Column 4 Link 4) */}
          {activeTab === 'community' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {l('Gezgin Katkı & Kural Düzeltme Masası', 'Community Contribution & Rule Correction Desk', 'Gezgin-Korrekturportal')}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {l('Sınır Kapılarından Canlı Gezgin Deneyimleri ve Bildirimler', 'Crowdsourced Field Reports & Consular Updates')}
                  </p>
                </div>
              </div>

              <p>
                {l(
                  'Sınır kapılarında karşılaştığınız güncel uygulamaları, yeni harç tutarlarını veya mevzuat değişikliklerini topluluğumuzla paylaşarak milyonlarca gezgine destek olabilirsiniz.',
                  'Help fellow travelers by reporting real-time border experiences, updated fees, or newly introduced consular requirements directly from the field.',
                  'Helfen Sie Reisenden, indem Sie aktuelle Erfahrungen an Grenzübergängen oder Gebührenänderungen melden.'
                )}
              </p>

              <div className="p-5 rounded-3xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                  {l('Hızlı Düzeltme & Katkı Bildirimi', 'Direct Reporting')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {l(
                    'Her ülke sayfasındaki "Mevzuat Bildir" butonunu kullanabilir veya doğrudan community@vizamigo.com adresine pasaport, tarih ve sınır kapısı detaylarıyla e-posta gönderebilirsiniz. Moderatör ekibimiz 24 saat içinde resmi kaynaklarla karşılaştırarak yayına alır.',
                    'Use the "Report Change" button on any country dossier or email community@vizamigo.com. Our editorial desk verifies every submission within 24 hours.'
                  )}
                </p>
              </div>
            </div>
          )}

          {/* TAB: API (Column 4 Link 5) */}
          {activeTab === 'api' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <Code2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {l('Kurumsal API & Veri Lisansı', 'Enterprise API & Data Licensing', 'Enterprise API & Datenlizenz')}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {l('OTA, Havayolu ve Seyahat Fintech Çözümleri İçin Yüksek Performanslı API', 'High-Performance Travel Mobility APIs for OTAs & Airlines')}
                  </p>
                </div>
              </div>

              <p>
                {l(
                  'Vizamigo 199 pasaport ve 230+ varış noktası arasındaki vize ilişkilerini, diplomatik protokolleri ve dijital göçebe programlarını JSON tabanlı RESTful API üzerinden sunar.',
                  'Vizamigo provides real-time JSON RESTful APIs covering bilateral visa relationships, entry protocols, and nomad programs across 199 passports and 230+ destinations.',
                  'Vizamigo stellt Visa- und Einreisedaten für 199 Pässe über moderne REST-APIs für Unternehmen bereit.'
                )}
              </p>

              <div className="p-5 rounded-3xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                  {l('Geliştirici & Kurumsal Lisans Talebi', 'Enterprise Licensing')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {l(
                    'Özel API anahtarları, SLA garantileri ve toplu veri lisansları için api@vizamigo.com adresinden teknik ekibimizle iletişime geçebilirsiniz.',
                    'For dedicated API keys, custom endpoints, and SLA agreements: api@vizamigo.com'
                  )}
                </p>
              </div>
            </div>
          )}

          {/* TAB: MISSION */}
          {activeTab === 'mission' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {l('Vizamigo Misyonu, Vizyonu & Bağımsızlık İlkeleri', 'Our Mission, Vision & Editorial Independence', 'Unsere Mission & Leitwerte')}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {l('Küresel Seyahat Özgürlüğü ve Şeffaf Bilgiye Erişim', 'Democratizing Global Travel Freedom')}
                  </p>
                </div>
              </div>

              <p>
                {l(
                  'Vizamigo, küresel seyahat serbestisinin evrensel bir hak olduğuna inanan bağımsız araştırmacılar ve yazılımcılar tarafından kurulmuştur. Misyonumuz; karmaşık bürokratik vize mevzuatlarını, konsolosluk genelgelerini ve seyahat şartlarını her gezginin saniyeler içinde anlayabileceği şeffaf, tarafsız ve güvenilir bir arayüze dönüştürmektir.',
                  'Vizamigo was founded on the belief that global mobility and hassle-free travel are universal aspirations. Our mission is to transform labyrinthine consular directives and border codes into transparent, actionable, and impartial travel intelligence.',
                  'Vizamigo wurde mit dem Ziel gegründet, bürokratische Visa- und Einreisevorschriften in verständliche, transparente und verlässliche Informationen für Reisende zu übersetzen.'
                )}
              </p>
            </div>
          )}

          {/* TAB: SUSTAINABILITY (Column 5 Link 3) */}
          {activeTab === 'sustainability' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {l('Sürdürülebilir Seyahat ve Karbon Ayak İzi İlkelerimiz', 'Sustainable Travel & Carbon Stewardship', 'Nachhaltiges Reisen & Klimaschutz')}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {l('Duyarlı Turizm, Yerel Ekonomiye Destek ve Çevresel Sorumluluk', 'Eco-Conscious Tourism & Local Community Respect')}
                  </p>
                </div>
              </div>

              <p>
                {l(
                  'Vizamigo, hızlı tüketim turizmi yerine doğaya saygılı, yerel toplulukları destekleyen ve kültürel mirası koruyan seyahat tarzını teşvik eder. Rota planlayıcılarımızda demiryolu ve düşük emisyonlu toplu taşıma alternatiflerini önceliklendiriyoruz.',
                  'Vizamigo champions slow, respectful, and ecologically conscious travel. We prioritize rail, bus, and low-carbon transport alternatives across our itineraries to minimize environmental footprint.',
                  'Vizamigo fördert nachhaltigen, umweltschonenden Tourismus und unterstützt lokale Gemeinschaften sowie umweltfreundliche Reisealternativen wie Bahnstrecken.'
                )}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-3xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
                  <b className="text-slate-900 dark:text-white text-sm">{l('Yerel Esnafı ve Kültürü Destekleme', 'Supporting Local Economies')}</b>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {l('Büyük zincir oteller yerine butik yerel işletmeleri, mahalle pazarlarını ve yerel rehberleri tercih etmenizi öneriyoruz.', 'We encourage dining at local eateries and hiring local guides to ensure tourism benefits resident communities.')}
                  </p>
                </div>
                <div className="p-5 rounded-3xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
                  <b className="text-slate-900 dark:text-white text-sm">{l('Sıfır Atık & Plastik Azaltımı', 'Plastic Reduction')}</b>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    {l('Bavul listemizde yeniden kullanılabilir su şişeleri, bez torbalar ve katı sabun alternatifleri standart olarak önerilmektedir.', 'Our packing lists include reusable water flasks and minimal single-use plastics guidance.')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CAREERS (Column 5 Link 4) */}
          {activeTab === 'careers' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {l('Kariyer & Ekip', 'Careers & Team', 'Karriere & Team')}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {l('Küresel Seyahat Özgürlüğünü Kodlayan Ekibe Katılın', 'Join the Remote-First Team Building Global Mobility')}
                  </p>
                </div>
              </div>

              <p>
                {l(
                  'Vizamigo tamamen uzaktan çalışan (Remote-First), dünyanın farklı saat dilimlerinden mühendis, veri analisti, araştırmacı ve seyahat yazarlarından oluşan çok kültürlü bir ekiptir.',
                  'Vizamigo is a fully distributed, remote-first team of engineers, data researchers, cartographers, and writers passionate about borders and travel.',
                  'Vizamigo ist ein dezentrales, internationales Team aus Entwicklern, Analysten und Reisebegeisterten.'
                )}
              </p>

              <div className="p-5 rounded-3xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-3">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                  {l('Açık Pozisyonlar & Başvuru', 'Open Positions & Contact')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {l(
                    'Full-stack TypeScript geliştiricileri, coğrafi veri uzmanları ve seyahat araştırmacıları için açık rollerimiz bulunmaktadır. Özgeçmişinizi veya GitHub profilinizi careers@vizamigo.com adresine gönderebilirsiniz.',
                    'We are hiring full-stack TypeScript engineers, geo-data specialists, and consular researchers. Send your CV or GitHub profile to careers@vizamigo.com.'
                  )}
                </p>
              </div>
            </div>
          )}

          {/* TAB: PRESS */}
          {activeTab === 'press' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {l('Basın Kiti, Kurumsal İletişim & Medya İlişkileri', 'Press Kit & Corporate Communications', 'Pressezentrum & Medienkontakt')}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {l('Medya Talepleri, Röportajlar ve Pasaport İndeksi Raporları', 'Media Queries, Passport Freedom Reports & Press Kit')}
                  </p>
                </div>
              </div>

              <p>
                {l(
                  'Medya mensupları, seyahat araştırmacıları ve kurumsal ortaklık talepleri için iletişim kanallarımız:',
                  'For press inquiries, editorial quotes, passport index statistics, and enterprise partnerships:',
                  'Für Presseanfragen, Gastbeiträge und Kooperationen kontaktieren Sie uns unter:'
                )}
              </p>

              <div className="p-5 rounded-3xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-3">
                <div><b>{l('Kurumsal E-Posta:', 'Corporate Email:')}</b> <span className="font-mono text-teal-700 dark:text-teal-300">press@vizamigo.com</span></div>
                <div><b>{l('Merkez & Ar-Ge:', 'HQ & Labs:')}</b> <span>Vizamigo Global Mobility Labs, Tallinn & İstanbul</span></div>
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
                    {l('Veri Yedekleme, Dışa Aktarma & Cihaz Sıfırlama', 'Data Backup, Export & Reset', 'Datensicherung, Export & Gerätezurücksetzung')}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {l('Cihaz Değişikliği İçin Yerel JSON Arşivi ve Tam Temizleme', 'Local JSON Migration & Device Purge')}
                  </p>
                </div>
              </div>

              <p>
                {l(
                  'Cihaz değiştirdiğinizde veya verilerinizi arşivlemek istediğinizde JSON dosyası indirebilir veya mevcut bir yedeği yükleyebilirsiniz.',
                  'Export a standalone JSON file when transferring devices or creating local offline archives.',
                  'Exportieren Sie eine JSON-Datei für einen Gerätewechsel oder lokale Offline-Archive.'
                )}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleExport}
                  className="px-5 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" /> {l('Yedeği İndir (.json)', 'Download Backup (.json)', 'Backup herunterladen (.json)')}
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-5 py-3 rounded-2xl bg-white dark:bg-white/10 border border-teal-300 dark:border-white/20 hover:border-teal-500 text-slate-800 dark:text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Upload className="w-4 h-4" /> {l('Yedeği Geri Yükle', 'Restore Backup', 'Backup wiederherstellen')}
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
                  <RotateCcw className="w-4 h-4" /> {l('Tümünü Sıfırla', 'Reset All Data', 'Alle Daten zurücksetzen')}
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
          {l('Kapat', 'Close', 'Schließen')}
        </button>
      </footer>
    </div>
  );
};
