import React, { useRef, useState, useEffect } from 'react';
import {
  X,
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
  HelpCircle,
  ExternalLink,
  Award
} from 'lucide-react';
import { exportAppData, importAppData, clearAllAppData } from '../utils/storage';
import { useI18n } from '../data/i18n';

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
  const [importStatus, setImportStatus] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>(initialTab);

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

  const tabs = [
    { id: 'terms', label: l('Kullanım Koşulları', 'Terms of Service', 'Nutzungsbedingungen', 'Términos', 'Условия') },
    { id: 'privacy', label: l('Gizlilik Politikası', 'Privacy Policy', 'Datenschutz', 'Privacidad', 'Конфиденциальность') },
    { id: 'disclaimer', label: l('Sorumluluk Reddi', 'Disclaimer', 'Haftungsausschluss', 'Descargo', 'Отказ от ответственности') },
    { id: 'kvkk_gdpr', label: l('KVKK & GDPR', 'GDPR / Privacy', 'DSGVO', 'RGPD', 'Защита данных') },
    { id: 'standards', label: l('Mevzuat & Standartlar', 'Source Standards', 'Quellenstandards', 'Estándares', 'Стандарты') },
    { id: 'appeals', label: l('Vize Ret İtirazı', 'Visa Appeals', 'Visum-Widerspruch', 'Apelación de Visa', 'Апелляция визы') },
    { id: 'passport_lost', label: l('Pasaport Kaybı', 'Passport Lost', 'Passverlust', 'Pérdida de Pasaporte', 'Утеря паспорта') },
    { id: 'crisis', label: l('Konsolosluk Kriz Masası', 'Crisis Desk', 'Krisenzentrum', 'Mesa de Crisis', 'Кризисный центр') },
    { id: 'transit', label: l('Transit Kuralları', 'Transit Rules', 'Transitregeln', 'Reglas de Tránsito', 'Правила транзита') },
    { id: 'mission', label: l('Misyonumuz', 'Our Mission', 'Unsere Mission', 'Nuestra Misión', 'Наша миссия') },
    { id: 'press', label: l('Basın & İletişim', 'Press & Contact', 'Presse & Kontakt', 'Prensa y Contacto', 'Пресса и контакты') },
    { id: 'backup', label: l('Veri Yönetimi', 'Data Backup', 'Datensicherung', 'Copia de Seguridad', 'Резервное копирование') }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#F0FDFA] dark:bg-[#062634] border-2 border-[#5EEAD4] dark:border-[#2DD4BF]/50 rounded-3xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-slate-800 dark:text-slate-100">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#5EEAD4]/40 dark:border-[#2DD4BF]/30 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-teal-600 text-white shadow-sm shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-base sm:text-lg tracking-tight">
                {l('Vizamigo Hukuki, Mevzuat & Tüketici Bilgilendirme Merkezi', 'Vizamigo Legal, Regulatory & Consumer Protection Portal', 'Vizamigo Rechts-, Regulierungs- & Verbraucherportal')}
              </h3>
              <p className="text-xs font-bold text-teal-700 dark:text-teal-300">
                {l('Uluslararası Seyahat Hukuku, Diplomatik Mevzuat & Veri Güvenliği', 'International Travel Law, Diplomatic Conventions & Data Security', 'Internationales Reiserecht, Diplomatenrecht & Datensicherheit')}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Chips */}
        <div className="p-2.5 border-b border-[#5EEAD4]/30 bg-teal-50/50 dark:bg-slate-900/40 overflow-x-auto scrollbar-none flex items-center gap-1.5 text-xs font-bold whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-teal-600 text-white shadow-xs font-black'
                  : 'bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-teal-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {/* TAB: TERMS */}
          {activeTab === 'terms' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-teal-600" />
                <h4 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                  {l('Hizmet Kullanım Koşulları (Terms of Service)', 'Terms of Service', 'Allgemeine Nutzungsbedingungen')}
                </h4>
              </div>
              <p>
                {l(
                  'Vizamigo platformunu kullanarak, bu sözleşmede yer alan tüm şart ve kuralları gayrikabili rücu kabul etmiş sayılırsınız. Vizamigo, kullanıcılara küresel seyahat serbestisi, pasaport vize rejimleri, sınır kontrolleri, transit kuralları ve dijital göçebe rotaları hakkında analitik ve bilgilendirici içerik sunan bağımsız bir dijital seyahat rehberidir.',
                  'By accessing and using the Vizamigo platform, you irrevocably agree to comply with and be bound by these Terms of Service. Vizamigo operates as an independent digital travel intelligence platform providing data on visa regimes, border entry criteria, transit rules, and nomad programs.',
                  'Durch den Zugriff auf Vizamigo akzeptieren Sie diese Nutzungsbedingungen vollumfänglich. Vizamigo ist eine unabhängige Plattform zur Recherche von Visabestimmungen, Einreisevorschriften und Nomadenprogrammen.'
                )}
              </p>
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-teal-200 dark:border-slate-800 space-y-2">
                <h5 className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">
                  {l('1. Bilgilendirmenin Niteliği & Taahhütsüzlük', '1. Nature of Information & Non-Binding Notice', '1. Informationscharakter & Unverbindlichkeit')}
                </h5>
                <p>
                  {l(
                    'Vizamigo resmi bir vize onay mercii, büyükelçilik veya göç idaresi değildir. Platformumuzda sunulan vize süreleri, harçlar, asgari banka bakiyeleri ve kabul protokolleri yalnızca seyahat planlaması için genel rehber niteliğindedir. Egemen devletlerin sınır ve gümrük muhafaza memurları (Border Guard) herhangi bir gerekçe göstermeksizin ülkeye kabul etmeme veya vizeyi iptal etme hakkına haizdir.',
                    'Vizamigo is not a governmental authority, embassy, or border agency. All stated durations, financial requirements, and visa rules are indicative references for travel planning only. Sovereign immigration officers retain full legal discretion to grant or deny entry.',
                    'Vizamigo ist keine staatliche Behörde oder Botschaft. Alle Angaben zu Aufenthaltsdauern und Gebühren dienen ausschließlich der unverbindlichen Orientierung. Grenzbeamte entscheiden souverän über die tatsächliche Einreise.'
                  )}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-teal-200 dark:border-slate-800 space-y-2">
                <h5 className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">
                  {l('2. Fikri Mülkiyet & Ticari Kullanım Yasağı', '2. Intellectual Property Rights', '2. Geistiges Eigentum')}
                </h5>
                <p>
                  {l(
                    'Sitedeki tüm arayüz bileşenleri, patentli seyahat hesaplama algoritmaları, veri haritaları ve metinler Vizamigo mülkiyetindedir. Önceden yazılı izin alınmaksızın kopyalanamaz, otomatik botlarla taranamaz (scraping) ve ticari ürünlerde kaynak gösterilmeden kullanılamaz.',
                    'All interface designs, custom calculation algorithms, and synthesized datasets are the exclusive intellectual property of Vizamigo and protected under global copyright treaties.',
                    'Sämtliche Layouts, Algorithmen und Datensätze sind urheberrechtlich geschützt und dürfen ohne Genehmigung nicht kopiert oder gescrapt werden.'
                  )}
                </p>
              </div>
            </div>
          )}

          {/* TAB: PRIVACY */}
          {activeTab === 'privacy' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-teal-600" />
                <h4 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                  {l('Gizlilik & Çerez Politikası', 'Privacy & Cookie Architecture', 'Datenschutz & Cookie-Richtlinie')}
                </h4>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 space-y-2">
                <div className="font-black text-emerald-900 dark:text-emerald-200 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {l('Sıfır Sunucu İletimi (Zero Remote Telemetry)', 'Zero Remote Telemetry Architecture', 'Zero-Remote-Telemetrie-Garantie')}
                </div>
                <p className="text-emerald-950 dark:text-emerald-100">
                  {l(
                    'Vizamigo seyahat tercihlerinizi, seçtiğiniz vatandaşlığı, planladığınız seyahat rotalarını ve pasaport bilgilerinizi ASLA harici sunuculara göndermez. Tüm veriler yalnızca kullandığınız cihazın tarayıcısında (LocalStorage) şifreli ve yerel olarak tutulur.',
                    'Vizamigo strictly does NOT transmit your logged trips, selected citizenships, dates, or checklists to any central server. All data remains exclusively within your local browser LocalStorage.',
                    'Vizamigo übermittelt Ihre Reisedaten, Pässe oder Checklisten zu keinem Zeitpunkt an externe Server. Sämtliche Daten verbleiben lokal in Ihrem Browser.'
                  )}
                </p>
              </div>
              <div className="space-y-2">
                <h5 className="font-extrabold text-slate-900 dark:text-white">
                  {l('Çerezler (Cookies) ve Yerel Bellek', 'Cookies & LocalStorage Usage', 'Cookies und LocalStorage')}
                </h5>
                <p>
                  {l(
                    'Sitemiz yalnızca tema tercihi (Açık/Koyu mod) ve aktif dil seçimini hatırlamak amacıyla minimum sistem çerezleri kullanır. Üçüncü taraf takip çerezleri (Third-party tracking cookies) kesinlikle barındırılmaz.',
                    'Only essential technical cookies are utilized for maintaining theme settings (Dark/Light) and language preferences. Third-party advertising or cross-site tracking cookies are fully excluded.',
                    'Es werden lediglich technisch notwendige Cookies zur Speicherung von Sprache und Dark-Mode eingesetzt. Kein Drittanbieter-Tracking.'
                  )}
                </p>
              </div>
            </div>
          )}

          {/* TAB: DISCLAIMER */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h4 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                  {l('Yasal Sorumluluk Reddi (Disclaimer)', 'Legal Disclaimer', 'Rechtlicher Haftungsausschluss')}
                </h4>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-100 space-y-2">
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
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-600" />
                <h4 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                  {l('KVKK (6698) & GDPR (AB 2016/679) Aydınlatma Beyanı', 'KVKK & GDPR Compliance Statement', 'DSGVO- & KVKK-Datenschutzerklärung')}
                </h4>
              </div>
              <p>
                {l(
                  '6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Birliği Genel Veri Koruma Tüzüğü (GDPR) kapsamında veri sorumlusu sıfatıyla hareket eden Vizamigo, kişisel gizliliği birincil hak kabul eder.',
                  'In accordance with Law No. 6698 (KVKK) and the European Union General Data Protection Regulation (GDPR), Vizamigo guarantees full protection of personal rights.',
                  'Im Einklang mit der EU-Datenschutz-Grundverordnung (DSGVO) und dem KVKK gewährleistet Vizamigo den Schutz Ihrer Privatsphäre.'
                )}
              </p>
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-teal-200 dark:border-slate-800 space-y-2">
                <h5 className="font-extrabold text-slate-900 dark:text-white">
                  {l('Haklarınız (İlgili Kişi Hakları):', 'Your Statutory Rights:', 'Ihre Rechte:')}
                </h5>
                <ul className="list-disc pl-5 space-y-1">
                  <li>{l('Verilerinizin sunucularda saklanıp saklanmadığını öğrenme (Platformumuzda uzak veri tutulmaz).', 'Right of access: No personal data is stored on remote servers.', 'Auskunftsrecht über gespeicherte Daten (keine externen Server).')}</li>
                  <li>{l('Tüm yerel verilerinizi tek tıkla cihazınızdan silme (Unutulma Hakkı / Veri Sıfırlama).', 'Right to erasure: Wipe all device data with one click.', 'Recht auf Löschung sämtlicher lokaler Daten.')}</li>
                  <li>{l('Verilerinizi taşınabilir JSON formatında dışa aktarma (Veri Taşınabilirliği).', 'Right to data portability: Export standalone JSON files.', 'Recht auf Datenübertragbarkeit via JSON-Export.')}</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB: STANDARDS */}
          {activeTab === 'standards' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-teal-600" />
                <h4 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                  {l('Resmi Mevzuat & Veri Doğrulama Standartlarımız', 'Official Immigration & Verification Standards', 'Einreisequellen & Verifizierungsstandards')}
                </h4>
              </div>
              <p>
                {l(
                  'Vizamigo veri mimarisi, dünya genelinde 199 egemen pasaport ve 230+ varış noktası için aşağıdaki standartlara göre denetlenir:',
                  'Vizamigo synthesizes border criteria for 199 sovereign passports and 230+ destinations following strict audit layers:',
                  'Die Vizamigo-Datenbank stützt sich auf folgende standardisierte Prüfquellen:'
                )}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-teal-200 dark:border-slate-800 space-y-1">
                  <b className="text-teal-800 dark:text-teal-300 block">{l('1. Dışişleri Bakanlıkları Diplomatik Tebliğleri', '1. Foreign Ministry Circulars')}</b>
                  <p className="text-slate-600 dark:text-slate-400">
                    {l('T.C. Dışişleri Bakanlığı (MFA), ABD Dışişleri, Birleşik Krallık FCDO ve AB Dış İlişkiler Servisi (EEAS) seyahat uyarıları.', 'Official diplomatic bulletins from MFA Turkey, UK FCDO, US State Dept, and EEAS.')}
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-teal-200 dark:border-slate-800 space-y-1">
                  <b className="text-teal-800 dark:text-teal-300 block">{l('2. Resmi Göç İdareleri & E-Vize Portalları', '2. National Immigration Authorities')}</b>
                  <p className="text-slate-600 dark:text-slate-400">
                    {l('Tayland E-Vize (thaievisa.go.th), Endonezya Göç (evisa.imigrasi.go.id), Şengen Göç Kuralları ve Körfez E-Vize sistemleri.', 'Primary portals including Thai eVisa, Indonesia Immigration, Schengen border code, and GCC eVisa feeds.')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: APPEALS */}
          {activeTab === 'appeals' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-rose-500" />
                <h4 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                  {l('Schengen & Konsolosluk Vize Retlerine İtiraz Kılavuzu', 'Schengen & Consular Visa Appeals Protocol', 'Widerspruchsverfahren bei Visumablehnungen')}
                </h4>
              </div>
              <p>
                {l(
                  'Konsolosluk vize başvurunuz reddedildiğinde, Şengen Vize Kodu (Madde 32) ve idari yargı usulleri uyarınca resmi itiraz (Remonstration / Appeal) hakkınız bulunmaktadır.',
                  'When a visa application is refused, Article 32 of the EU Visa Code guarantees your statutory right to submit an appeal (Remonstration).',
                  'Bei einer Visumablehnung haben Sie nach Art. 32 des EU-Visakodex das Recht auf formellen Widerspruch (Remonstration).'
                )}
              </p>
              <div className="space-y-2">
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-rose-200 dark:border-slate-800 flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 flex items-center justify-center font-black shrink-0">1</span>
                  <div>
                    <b className="text-slate-900 dark:text-white">{l('Ret Gerekçesi Kodunu Belirleyin (Madde 1-16):', 'Identify the Refusal Reason Code:', 'Ablehnungsgrund identifizieren:')}</b>{' '}
                    <span>{l('En sık karşılaşılan ret gerekçeleri Madde 10 (Geri dönüş niyetinin kanıtlanamaması) ve Madde 8 (Maddi yetersizlik).', 'Most frequent reasons: Item 10 (intent to return not established) and Item 8 (insufficient financial proof).')}</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-rose-200 dark:border-slate-800 flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 flex items-center justify-center font-black shrink-0">2</span>
                  <div>
                    <b className="text-slate-900 dark:text-white">{l('Yasal Süre İçinde İtiraz Dilekçesi Hazırlayın:', 'Submit Appeal Within Legal Window:', 'Widerspruchsfrist einhalten:')}</b>{' '}
                    <span>{l('Ret mektubunun tebliğ edildiği tarihten itibaren 30 gün içinde doğrudan konsolosluğa ıslak imzalı itiraz dilekçesi (Remonstrationsbrief) sunulmalıdır.', 'You have strictly 30 days from notification to deliver a signed remonstration letter addressing each objection.')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PASSPORT LOST */}
          {activeTab === 'passport_lost' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-amber-500" />
                <h4 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                  {l('Yurt Dışında Pasaport Kaybı ve Çalınması Acil Durum Protokolü', 'Lost or Stolen Passport Emergency Protocol', 'Notfallprotokoll bei Passverlust im Ausland')}
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-teal-200 dark:border-slate-800 space-y-1.5">
                  <b className="text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                    <span>1.</span> {l('Polis Karakoluna Gidin & Tutanak Alın', '1. Obtain Police Report')}
                  </b>
                  <p>{l('En yakın yerel polis merkezine giderek pasaport kaybı/çalıntı tutanağı (Police Report) tutturun. Bu belge konsoloslukta ve havalimanında zorunludur.', 'File a formal theft/loss report with local police. This certificate is mandatory for consular processing.')}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-teal-200 dark:border-slate-800 space-y-1.5">
                  <b className="text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                    <span>2.</span> {l('Geçici Pasaport (Seyahat Belgesi) Başvurusu', '2. Emergency Travel Document')}
                  </b>
                  <p>{l('Başkonsolosluğumuza 2 adet biyometrik fotoğraf ve T.C. kimlik kartınızla giderek yalnızca Türkiye’ye dönüşte geçerli Geçici Pasaport düzenletin.', 'Visit the Consulate General with national ID and 2 photos to obtain an Emergency Travel Document.')}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CRISIS DESK */}
          {activeTab === 'crisis' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-rose-500" />
                <h4 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                  {l('7/24 Dışişleri Konsolosluk Kriz Masası & Acil Yardım Hatları', '24/7 Consular Crisis Center & Emergency Hotlines', '24/7 Konsularischer Krisenstab & Notrufnummern')}
                </h4>
              </div>
              <p>
                {l(
                  'Yurt dışında acil durum, kaza, tutuklanma, doğal afet veya savaş hallerinde ulusal acil diplomatik çağrı merkezleriyle doğrudan irtibata geçebilirsiniz:',
                  'In case of accidents, arrests, natural disasters, or consular emergencies abroad, contact official 24/7 hotlines directly:',
                  'Bei Notfällen im Ausland wenden Sie sich an die offiziellen konsularischen Notrufzentralen:'
                )}
              </p>
              <div className="p-4 rounded-2xl bg-teal-50 dark:bg-slate-900 border-2 border-teal-500 space-y-3">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <div className="text-sm font-black text-slate-900 dark:text-white">🇹🇷 {l('T.C. Dışişleri Bakanlığı Konsolosluk Çağrı Merkezi', 'Turkish MFA Consular Call Center')}</div>
                    <div className="text-xs text-teal-700 dark:text-teal-300 font-bold">{l('Yılın 365 günü 24 saat kesintisiz hizmet', '24/7/365 uninterrupted global service')}</div>
                  </div>
                  <a
                    href="tel:+903122922929"
                    className="px-4 py-2 rounded-xl bg-teal-600 text-white font-black text-sm flex items-center gap-1.5 shadow-sm"
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
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-sky-500" />
                <h4 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                  {l('Uluslararası Havalimanı Transit Geçiş Kuralları', 'International Airport Transit Rules', 'Internationale Transit- & Umsteigeregeln')}
                </h4>
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

          {/* TAB: MISSION */}
          {activeTab === 'mission' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-teal-600" />
                <h4 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                  {l('Vizamigo Misyonu, Vizyonu & Bağımsızlık İlkeleri', 'Our Mission, Vision & Editorial Independence', 'Unsere Mission & Leitwerte')}
                </h4>
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

          {/* TAB: PRESS */}
          {activeTab === 'press' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-teal-600" />
                <h4 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                  {l('Basın Kiti, Kurumsal İletişim & Medya İlişkileri', 'Press Kit & Corporate Communications', 'Pressezentrum & Medienkontakt')}
                </h4>
              </div>
              <p>
                {l(
                  'Medya mensupları, seyahat araştırmacıları ve kurumsal ortaklık talepleri için iletişim kanallarımız:',
                  'For press inquiries, editorial quotes, passport index statistics, and enterprise partnerships:',
                  'Für Presseanfragen, Gastbeiträge und Kooperationen kontaktieren Sie uns unter:'
                )}
              </p>
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-teal-200 dark:border-slate-800 space-y-2">
                <div><b>{l('Kurumsal E-Posta:', 'Corporate Email:')}</b> <span className="font-mono text-teal-700 dark:text-teal-300">press@vizamigo.com</span></div>
                <div><b>{l('Merkez:', 'Headquarters:')}</b> <span>Vizamigo Global Mobility Labs, Tallinn & İstanbul</span></div>
              </div>
            </div>
          )}

          {/* TAB: BACKUP */}
          {activeTab === 'backup' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-teal-600" />
                <h4 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                  {l('Veri Yedekleme, Dışa Aktarma & Cihaz Sıfırlama', 'Data Backup, Export & Reset', 'Datensicherung, Export & Gerätezurücksetzung')}
                </h4>
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
                  className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-teal-300 dark:border-slate-700 hover:border-teal-500 text-slate-800 dark:text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
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
                <p className={`p-3 rounded-xl text-xs font-semibold ${
                  importStatus.includes('başarıyla') || importStatus.includes('successfully') || importStatus.includes('erfolgreich')
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                    : 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300'
                }`}>
                  {importStatus}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#5EEAD4]/30 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md flex items-center justify-between">
          <span className="text-xs font-bold text-teal-800 dark:text-teal-300">
            Vizamigo™ · 256-Bit SSL Secured · Official Feeds Synced
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs shadow-sm transition-colors cursor-pointer"
          >
            {l('Kapat', 'Close', 'Schließen')}
          </button>
        </div>
      </div>
    </div>
  );
};
