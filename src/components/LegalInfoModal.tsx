import React, { useRef, useState } from 'react';
import {
  X,
  ShieldCheck,
  Download,
  Upload,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  FileCheck,
  FileText
} from 'lucide-react';
import { exportAppData, importAppData, clearAllAppData } from '../utils/storage';
import { useI18n } from '../data/i18n';

interface LegalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataResetOrImported: () => void;
}

export const LegalInfoModal: React.FC<LegalInfoModalProps> = ({
  isOpen,
  onClose,
  onDataResetOrImported,
}) => {
  const { language, l } = useI18n();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<string>('');

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
              'Daten erfolgreich importiert und wiederhergestellt!'
            )
          );
          onDataResetOrImported();
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
      'Alle Ihre gespeicherten Reisen, Reiserouten und Checklisten werden von diesem Gerät gelöscht. Bestätigen?'
    );
    if (window.confirm(confirmMsg)) {
      clearAllAppData();
      onDataResetOrImported();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base tracking-[-0.02em]">
                {l('Veri Güveni, Hukuki Uyarı & Veri Yönetimi', 'Data Integrity, Legal Notice & Data Management', 'Datensicherheit, rechtliche Hinweise & Datenverwaltung')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#8E9DBE]">
                {l('Aşama 0 Veri Denetim Raporu & Gizlilik', 'Dataset Verification Audit & Privacy Statement', 'Datensatz-Prüfbericht & Datenschutzerklärung')}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6 text-xs text-slate-600 dark:text-slate-300">
          {/* Stage 0 Status Table */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-teal-600" />
              {l('Aşama 0: Veri Güveni ve Çapraz Kontrol Metodolojisi', 'Data Integrity & Cross-Verification Methodology', 'Stufe 0: Datenintegrität & Kreuzverifikations-Methodik')}
            </h4>
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
              <div className="p-3 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <b className="text-slate-800 dark:text-slate-200">
                    {l('Üç Veri Setiyle Çapraz Kontrol:', 'Tri-Dataset Cross Check:', 'Kreuzprüfung mit drei Datensätzen:')}
                  </b>{' '}
                  {l(
                    '5.622 çelişkili çift taranmış ve açık veri setleri doğrultusunda mutabakat sağlananlar sisteme işlenmiştir.',
                    'Cross-validated against Passport Index open repositories and verified consular publications.',
                    'Gegen offene Repositories und verifizierte konsularische Veröffentlichungen abgeglichen.'
                  )}
                </div>
              </div>
              <div className="p-3 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <b className="text-slate-800 dark:text-slate-200">
                    {l('Doğrulama ve Kaynak Etiketleri:', 'Source Badges & Audit Tags:', 'Verifizierungs- & Quellen-Tags:')}
                  </b>{' '}
                  {l(
                    'Türk pasaportu için her ülke kartında özel doğrulama durumu (3 veri seti mutabık / resmi kaynak teyidi bekliyor) gösterilir.',
                    'Every destination card features audit badges indicating consensus across 3 datasets or pending diplomatic circulars.',
                    'Jede Länderkarte enthält Status-Tags zum Abgleich von 3 Datensätzen oder offizieller Prüfung.'
                  )}
                </div>
              </div>
              <div className="p-3 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <b className="text-slate-800 dark:text-slate-200">
                    {l('Karadağ Kural Bildirimi:', 'Montenegro 2026 Transition:', 'Montenegro-Regeländerung 2026:')}
                  </b>{' '}
                  {l(
                    "31 Ekim 2026'ya kadar 30 gün vizesiz; 1 Kasım 2026 itibarıyla vize zorunluluğu sisteme işlenmiştir.",
                    'Visa-free stay permitted through Oct 31, 2026; mandatory visa regime effective starting Nov 1, 2026.',
                    'Visumfreier Aufenthalt bis 31. Okt. 2026 gestattet; Visumpflicht ab 1. Nov. 2026 hinterlegt.'
                  )}
                </div>
              </div>
              <div className="p-3 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <b className="text-slate-800 dark:text-slate-200">
                    {l('Tayland Güncellemesi:', 'Thailand Entry Guidelines:', 'Thailand-Einreisebestimmungen:')}
                  </b>{' '}
                  {l(
                    '15 Eylül 2026 tarihli 30 gün kuralı ve TDAC dijital varış kartı yönergesi eklenmiştir.',
                    'Reflects the standard 30-day exemption and TDAC electronic arrival portal directives.',
                    'Beinhaltet die reguläre Befreiung sowie Vorgaben zum elektronischen TDAC-Ankunftsportal.'
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 space-y-2">
            <div className="font-bold flex items-center gap-2 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              {l('Yasal Uyarı & Sorumluluk Reddi (Disclaimer)', 'Legal Disclaimer & Non-Binding Notice', 'Haftungsausschluss & unverbindlicher Hinweis')}
            </div>
            <p className="leading-relaxed">
              {l(
                'Bu uygulama yalnızca kişisel seyahat planlama, rota analizi ve genel bilgilendirme amacıyla hazırlanmıştır. Ülkelerin vize rejimleri, e-vize kuralları, transit geçiş şartları ve sınır kabul koşulları mütekabiliyet ve ikili anlaşmalara bağlı olarak anlık değişebilmektedir. Nihai ve bağlayıcı bilgi için seyahat öncesinde mutlaka ilgili ülkenin diplomatik misyonu (Büyükelçilik/Başkonsolosluk) veya T.C. Dışişleri Bakanlığı resmi kaynaklarından teyit alınız.',
                'This application is provided exclusively for personal travel planning, route simulation and general informational reference. National visa regulations, eVisa mandates, transit visa exemptions, and border entry requirements can change without prior warning due to bilateral treaties and reciprocity rules. Always confirm final binding requirements directly with diplomatic missions (Embassies/Consulates) or official government immigration portals before embarking.',
                'Diese Anwendung dient ausschließlich der persönlichen Reiseplanung, Routensimulation und allgemeinen Information. Nationale Visabestimmungen, e-Visa, Transitvisa und Einreisebedingungen können sich kurzfristig ändern. Bitte prüfen Sie verbindliche Bestimmungen vor der Reise immer bei den offiziellen diplomatischen Vertretungen (Botschaften/Konsulate) oder Einwanderungsbehörden.'
              )}
            </p>
          </div>

          {/* KVKK / Privacy */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-600" />
              {l('Gizlilik Politikası & KVKK / GDPR Uyumu', 'Privacy Architecture & GDPR / KVKK Compliance', 'Datenschutz & DSGVO-Konformität')}
            </h4>
            <p className="leading-relaxed">
              {l(
                'VizeRehberi uygulaması %100 istemci tarafında (Client-Side) çalışır. Kaydettiğiniz seyahat tarihleri, duraklar, seçtiğiniz vatandaşlıklar ve hazırlık kontrol listesi kutuları yalnızca tarayıcınızın yerel hafızasında (LocalStorage) şifresiz ve anonim olarak saklanır. Hiçbir kişisel veri uzak bir sunucuya iletilmez, analiz şirketleriyle paylaşılmaz veya satılmaz.',
                'This web application operates 100% on the client side (in your local browser). Your logged trip dates, itineraries, selected citizenship, and preparation checklist items are stored strictly in your browser LocalStorage. No personal data is transmitted to external telemetry servers, shared with advertisers, or stored in remote databases.',
                'Diese Webanwendung läuft zu 100 % clientseitig (in Ihrem Browser). Reisedaten, Zwischenstopps, Staatsangehörigkeiten und Checklisten werden ausschließlich im lokalen Speicher (LocalStorage) Ihres Browsers gesichert. Es werden keinerlei personenbezogene Daten an externe Server gesendet oder weitergegeben.'
              )}
            </p>
          </div>

          {/* Backup / Restore Section */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              {l('Veri Yedekleme & Geri Yükleme (JSON)', 'Data Backup & Restore (JSON)', 'Datensicherung & Wiederherstellung (JSON)')}
            </h4>
            <p className="text-slate-500 dark:text-slate-400">
              {l(
                'Cihaz değiştirdiğinizde veya verilerinizi yedeklemek istediğinizde JSON dosyası indirebilir veya mevcut bir yedeği yükleyebilirsiniz.',
                'Export a standalone JSON file when transferring devices or creating local offline archives.',
                'Exportieren Sie eine JSON-Datei für einen Gerätewechsel oder lokale Offline-Archive.'
              )}
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={handleExport}
                className="btn-nubair-primary text-xs inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> {l('Yedeği İndir (.json)', 'Download Backup (.json)', 'Backup herunterladen (.json)')}
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn-nubair-secondary text-xs inline-flex items-center gap-2"
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
                className="px-4 py-2.5 rounded-full text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-200 transition-colors font-bold text-xs flex items-center gap-2 ml-auto cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> {l('Tümünü Sıfırla', 'Reset All Data', 'Alle Daten zurücksetzen')}
              </button>
            </div>

            {importStatus && (
              <p className={`p-2.5 rounded-xl text-xs font-semibold ${
                importStatus.includes('başarıyla') || importStatus.includes('successfully') || importStatus.includes('erfolgreich')
                  ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                  : 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300'
              }`}>
                {importStatus}
              </p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/60 dark:bg-white/[0.02] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn-nubair-primary text-xs"
          >
            {l('Kapat', 'Close', 'Schließen')}
          </button>
        </div>
      </div>
    </div>
  );
};
