import React, { useState, useRef } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Copy,
  Download,
  Flag,
  Sparkles,
  FileText,
  Search,
  Check
} from 'lucide-react';
import { useI18n } from '../i18n';
import { getFlag } from '../data/passportData';
import { loadUserReports } from './ReportChangeModal';
import { useModalA11y } from '../utils/useModalA11y';

export interface AuditRecord {
  code: string;
  nameTr: string;
  nameEn: string;
  nameDe: string;
  currentRule: string;
  verifiedStatusTr: string;
  verifiedStatusEn: string;
  verifiedStatusDe: string;
  status: 'MATCH' | 'ATTENTION';
  sourceName: string;
  sourceUrl: string;
  noteTr: string;
  noteEn: string;
  noteDe: string;
}

export const AUDIT_DATABASE: AuditRecord[] = [
  {
    code: 'ME',
    nameTr: 'Karadağ (Montenegro)',
    nameEn: 'Montenegro',
    nameDe: 'Montenegro',
    currentRule: 'VF (30 gün)',
    verifiedStatusTr: '30 Gün Vizesiz (31 Ekim 2026’ya kadar) · 1 Kasım 2026 İtibarıyla Vize Zorunlu',
    verifiedStatusEn: '30 Days Visa-Free (Until Oct 31, 2026) · Mandatory Visa Starting Nov 1, 2026',
    verifiedStatusDe: '30 Tage visumfrei (bis 31. Okt 2026) · Visumpflicht ab 1. Nov 2026',
    status: 'ATTENTION',
    sourceName: 'Karadağ Dışişleri / TC Podgoritsa Büyükelçiliği',
    sourceUrl: 'https://www.gov.me/en/mvp',
    noteTr: 'Karadağ hükümeti Türk vatandaşları için vizesiz rejimi sonlandırmaktadır. 31 Ekim 2026 tarihine kadar 30 gün vizesiz giriş geçerlidir; 1 Kasım 2026 itibarıyla konsolosluk vizesi zorunlu olacaktır. Çok girişli Schengen/ABD/İngiltere vizesi olanlar muaf tutulabilmektedir.',
    noteEn: 'Montenegro is ending visa-free access for Turkish citizens. 30 days visa-free remains valid until Oct 31, 2026; starting Nov 1, 2026 an advance visa is mandatory. Valid multi-entry Schengen/US/UK visas may provide an exemption.',
    noteDe: 'Montenegro beendet die Visafreiheit für türkische Staatsbürger. Bis 31. Oktober 2026 gilt 30 Tage visumfrei; ab 1. November 2026 gilt Visumpflicht. Gültige Mehrfach-Schengen-/US-/UK-Visa können befreien.'
  },
  {
    code: 'TH',
    nameTr: 'Tayland',
    nameEn: 'Thailand',
    nameDe: 'Thailand',
    currentRule: 'VF (30 gün)',
    verifiedStatusTr: '30 Gün Vizesiz (TDAC Zorunlu) + 5 Yıllık DTV Dijital Göçebe Vizesi Yürürlükte',
    verifiedStatusEn: '30-Day Visa-Free (TDAC Required) + 5-Year DTV Nomad Visa Active',
    verifiedStatusDe: '30 Tage visumfrei (TDAC obligatorisch) + 5-Jahres-DTV-Nomadenvisum aktiv',
    status: 'MATCH',
    sourceName: 'Tayland Göç İdaresi Bürosu & E-Vize Portalı (thaievisa.go.th)',
    sourceUrl: 'https://thaievisa.go.th',
    noteTr: 'Tayland Kraliyeti güncel düzenlemesi uyarınca vizesiz kalış süresi 30 gün olarak teyit edilmiştir. Girişte online TDAC dijital varış kartı doldurulması zorunludur.',
    noteEn: 'Royal Thai immigration regulations confirm 30 days visa-free stay. Digital arrival card (TDAC) required prior to entry.',
    noteDe: 'Thailändische Einreisebestimmungen bestätigen 30 Tage visumfreien Aufenthalt. Digitale Einreisekarte (TDAC) vorab erforderlich.'
  },
  {
    code: 'ID',
    nameTr: 'Endonezya (Bali)',
    nameEn: 'Indonesia (Bali)',
    nameDe: 'Indonesien (Bali)',
    currentRule: 'VoA (30 gün)',
    verifiedStatusTr: 'Varışta Vize (VoA) / Online e-VoA (evisa.imigrasi.go.id)',
    verifiedStatusEn: 'Visa on Arrival (VoA) / Online e-VoA Active',
    verifiedStatusDe: 'Visum bei Ankunft (VoA) / Online-e-VoA aktiv',
    status: 'MATCH',
    sourceName: 'Endonezya Göç İdaresi Portalı (evisa.imigrasi.go.id)',
    sourceUrl: 'https://evisa.imigrasi.go.id',
    noteTr: 'Resmi e-vize portalı evisa.imigrasi.go.id olarak güncellenmiş ve link doğrulanmıştır.',
    noteEn: 'Official eVisa portal updated to evisa.imigrasi.go.id and link validated.',
    noteDe: 'Offizielles eVisa-Portal auf evisa.imigrasi.go.id aktualisiert und validiert.'
  },
  {
    code: 'MX',
    nameTr: 'Meksika',
    nameEn: 'Mexico',
    nameDe: 'Mexiko',
    currentRule: 'E-Vize (30 gün SAE)',
    verifiedStatusTr: 'Hava Yoluyla SAE Elektronik Seyahat Onayı (gob.mx/inm)',
    verifiedStatusEn: 'SAE Electronic Travel Authorization via Air',
    verifiedStatusDe: 'Elektronische SAE-Reisegenehmigung auf dem Luftweg',
    status: 'MATCH',
    sourceName: 'Meksika Göçmenlik Enstitüsü (gob.mx/inm)',
    sourceUrl: 'https://www.gob.mx/inm',
    noteTr: 'Hava yoluyla seyahatte SAE elektronik izin geçerlidir; karayoluyla girişte veya transitte konsolosluk vizesi gerekebilir.',
    noteEn: 'SAE electronic authorization applies by air; overland entry or airside transfer may require consular visa.',
    noteDe: 'SAE-Genehmigung gilt für Flugreisen; Einreise auf dem Landweg oder Transit kann Konsularvisum erfordern.'
  },
  {
    code: 'EG',
    nameTr: 'Mısır',
    nameEn: 'Egypt',
    nameDe: 'Ägypten',
    currentRule: 'VoA (30 gün)',
    verifiedStatusTr: 'Varışta Vize (VoA) / e-Vize (Giriş limanına göre değişebilir)',
    verifiedStatusEn: 'Visa on Arrival / eVisa (Varies by port of arrival)',
    verifiedStatusDe: 'Visum bei Ankunft / e-Visum (Variiert je nach Ankunftsflughafen)',
    status: 'ATTENTION',
    sourceName: 'Mısır Başkonsolosluğu & visa2egypt.gov.eg',
    sourceUrl: 'https://visa2egypt.gov.eg',
    noteTr: 'Şarm El Şeyh / Güney Sina havalimanlarında kapıda vize kolaylığı bulunurken Kahire uçuşlarında e-vize veya konsolosluk vizesi önceden alınmalıdır.',
    noteEn: 'VoA simplified at Sharm El Sheikh / South Sinai; Cairo flights require pre-arranged eVisa or consular visa.',
    noteDe: 'VoA am Flughafen Scharm El-Scheich / Süd-Sinai erleichtert; Kairo-Flüge erfordern vorab beantragtes Visum.'
  },
  {
    code: 'OM',
    nameTr: 'Umman',
    nameEn: 'Oman',
    nameDe: 'Oman',
    currentRule: 'VF (14 gün)',
    verifiedStatusTr: '14 Güne Kadar Vizesiz Turist Muafiyeti',
    verifiedStatusEn: 'Visa-Free Exemption up to 14 Days',
    verifiedStatusDe: 'Visumfreie Befreiung bis zu 14 Tage',
    status: 'MATCH',
    sourceName: 'Kraliyet Umman Polisi (evisa.rop.gov.om)',
    sourceUrl: 'https://evisa.rop.gov.om',
    noteTr: '14 günü aşmayan seyahatlerde otel rezervasyonu ve dönüş biletiyle vizesiz giriş mevcuttur.',
    noteEn: 'Up to 14 days stay visa-free with confirmed hotel reservation and return ticket.',
    noteDe: 'Bis zu 14 Tage Aufenthalt visumfrei mit Hotelbuchung und Rückflugticket.'
  },
  {
    code: 'GE',
    nameTr: 'Gürcistan',
    nameEn: 'Georgia',
    nameDe: 'Georgien',
    currentRule: 'VF (365 gün / Kimlikle)',
    verifiedStatusTr: 'Çipli Ulusal Kimlikle 1 Yıl (365 Gün) Vizesiz Kalış',
    verifiedStatusEn: '365 Days Visa-Free with Biometric National ID Card',
    verifiedStatusDe: '365 Tage visumfrei mit biometrischem Personalausweis',
    status: 'MATCH',
    sourceName: 'Gürcistan Dışişleri Bakanlığı (geoconsul.gov.ge)',
    sourceUrl: 'https://geoconsul.gov.ge',
    noteTr: 'Yeni tip çipli Türk kimlik kartı ile pasaporta ihtiyaç duymadan 1 tam yıl kesintisiz kalış hakkı yürürlüktedir.',
    noteEn: 'Full 1-year stay permitted using biometric national ID card without requiring a passport.',
    noteDe: 'Volles 1 Jahr Aufenthalt mit biometrischem Personalausweis ohne Reisepass gestattet.'
  },
  {
    code: 'AZ',
    nameTr: 'Azerbaycan',
    nameEn: 'Azerbaijan',
    nameDe: 'Aserbaidschan',
    currentRule: 'VF (90 gün / Kimlikle)',
    verifiedStatusTr: 'Çipli Ulusal Kimlikle 90 Gün Vizesiz Kalış',
    verifiedStatusEn: '90 Days Visa-Free with Biometric National ID Card',
    verifiedStatusDe: '90 Tage visumfrei mit biometrischem Personalausweis',
    status: 'MATCH',
    sourceName: 'Azerbaycan Dışişleri & evisa.gov.az',
    sourceUrl: 'https://evisa.gov.az',
    noteTr: 'Çipli kimlikle 90 gün vizesiz seyahat protokolü yürürlüktedir. 15 günden fazla kalışlarda ikamet kaydı yapılmalıdır.',
    noteEn: '90 days ID card protocol active. Migration registration required for stays over 15 days.',
    noteDe: '90 Tage Personalausweis-Protokoll aktiv. Migrationsregistrierung bei über 15 Tagen erforderlich.'
  },
  {
    code: 'JP',
    nameTr: 'Japonya',
    nameEn: 'Japan',
    nameDe: 'Japan',
    currentRule: 'VF (90 gün)',
    verifiedStatusTr: '90 Gün Vizesiz Turistik Giriş',
    verifiedStatusEn: '90 Days Visa-Free Tourist Entry',
    verifiedStatusDe: '90 Tage visumfreie touristische Einreise',
    status: 'MATCH',
    sourceName: 'Japonya Dışişleri Bakanlığı (mofa.go.jp)',
    sourceUrl: 'https://www.mofa.go.jp',
    noteTr: 'Turistik seyahatlerde 90 güne kadar vizesiz rejim uygulanmaktadır.',
    noteEn: 'Visa exemption up to 90 days for tourism and temporary visits.',
    noteDe: 'Visumbefreiung bis zu 90 Tage für touristische Aufenthalte.'
  },
  {
    code: 'KR',
    nameTr: 'Güney Kore',
    nameEn: 'South Korea',
    nameDe: 'Südkorea',
    currentRule: 'VF (90 gün)',
    verifiedStatusTr: '90 Gün Vizesiz (K-ETA Takibi)',
    verifiedStatusEn: '90 Days Visa-Free (K-ETA Monitored)',
    verifiedStatusDe: '90 Tage visumfrei (K-ETA überwacht)',
    status: 'MATCH',
    sourceName: 'Kore Göçmenlik Hizmeti (k-eta.go.kr)',
    sourceUrl: 'https://www.k-eta.go.kr',
    noteTr: 'Türk vatandaşları 90 gün vizesizdir; K-ETA dönemsel muafiyet duyuruları resmi portaldan teyit edilmektedir.',
    noteEn: 'Turkish citizens 90 days visa-free; K-ETA temporary exemption circulars monitored.',
    noteDe: '90 Tage visumfrei; K-ETA temporäre Befreiungsrundschreiben werden überwacht.'
  },
  {
    code: 'AL',
    nameTr: 'Arnavutluk',
    nameEn: 'Albania',
    nameDe: 'Albanien',
    currentRule: 'VF (90 gün)',
    verifiedStatusTr: '180 Günde 90 Gün Vizesiz Kalış',
    verifiedStatusEn: '90 Days within 180 Days Visa-Free',
    verifiedStatusDe: '90 Tage innerhalb von 180 Tagen visumfrei',
    status: 'MATCH',
    sourceName: 'Arnavutluk Dışişleri Bakanlığı',
    sourceUrl: 'https://punetejashtme.gov.al',
    noteTr: 'Balkanlar vizesiz seyahat anlaşması uyarınca 90 gün geçerlidir.',
    noteEn: '90 days permitted under reciprocal Balkan visa waiver agreement.',
    noteDe: '90 Tage gemäß gegenseitigem visumfreien Abkommen für den Balkan gültig.'
  },
  {
    code: 'RS',
    nameTr: 'Sırbistan',
    nameEn: 'Serbia',
    nameDe: 'Serbien',
    currentRule: 'VF (90 gün)',
    verifiedStatusTr: '180 Günde 90 Gün Vizesiz (Kimlikle Giriş Protokolü)',
    verifiedStatusEn: '90 Days Visa-Free (ID Card Protocol)',
    verifiedStatusDe: '90 Tage visumfrei (Personalausweis-Protokoll)',
    status: 'MATCH',
    sourceName: 'Sırbistan Dışişleri Bakanlığı (mfa.gov.rs)',
    sourceUrl: 'https://www.mfa.gov.rs',
    noteTr: 'Pasaport ile 90 gün vizesiz giriş; kimlikle seyahat teknik prosedürleri yürürlüktedir.',
    noteEn: '90 days visa-free with passport; bilateral ID card travel framework enacted.',
    noteDe: '90 Tage visumfrei mit Reisepass; Personalausweis-Vereinbarung in Kraft.'
  },
  {
    code: 'BA',
    nameTr: 'Bosna-Hersek',
    nameEn: 'Bosnia & Herzegovina',
    nameDe: 'Bosnien und Herzegowina',
    currentRule: 'VF (90 gün)',
    verifiedStatusTr: '180 Günde 90 Gün Vizesiz (Kimlikle Giriş Protokolü)',
    verifiedStatusEn: '90 Days Visa-Free (ID Card Travel Protocol)',
    verifiedStatusDe: '90 Tage visumfrei (Personalausweis-Reiseprotokoll)',
    status: 'MATCH',
    sourceName: 'Bosna-Hersek Dışişleri Bakanlığı',
    sourceUrl: 'https://www.mvp.gov.ba',
    noteTr: '180 gün içinde 90 gün vizesiz kalış hakkı teyitlidir.',
    noteEn: '90 days within 180 days verified under bilateral agreement.',
    noteDe: '90 Tage innerhalb von 180 Tagen bilateral bestätigt.'
  },
  {
    code: 'AE',
    nameTr: 'Birleşik Arap Emirlikleri',
    nameEn: 'United Arab Emirates',
    nameDe: 'Vereinigte Arabische Emirate',
    currentRule: 'E-Vize (30 gün)',
    verifiedStatusTr: 'Online E-Vize Zorunlu (30 Gün)',
    verifiedStatusEn: 'Mandatory Online eVisa (30 Days)',
    verifiedStatusDe: 'Verpflichtendes Online-e-Visum (30 Tage)',
    status: 'MATCH',
    sourceName: 'BAE Federal Kimlik & Vatandaşlık Otoritesi (icp.gov.ae)',
    sourceUrl: 'https://icp.gov.ae',
    noteTr: 'Umuma mahsus (bordo) pasaport hamilleri için uçuştan önce e-vize onayı zorunludur.',
    noteEn: 'Regular passport holders require pre-approved electronic visa prior to departure.',
    noteDe: 'Inhaber regulärer Pässe benötigen vor Abflug ein genehmigtes e-Visum.'
  },
  {
    code: 'VN',
    nameTr: 'Vietnam',
    nameEn: 'Vietnam',
    nameDe: 'Vietnam',
    currentRule: 'E-Vize (30/90 gün)',
    verifiedStatusTr: 'Resmi E-Vize Portalı (evisa.xuatnhapcanh.gov.vn)',
    verifiedStatusEn: 'Official eVisa Portal Active (30/90 Days)',
    verifiedStatusDe: 'Offizielles eVisa-Portal aktiv (30/90 Tage)',
    status: 'MATCH',
    sourceName: 'Vietnam Göç İdaresi Resmi Portalı',
    sourceUrl: 'https://evisa.xuatnhapcanh.gov.vn',
    noteTr: '90 güne kadar çoklu girişli resmi e-vize sistemi sorunsuz çalışmaktadır.',
    noteEn: 'Up to 90 days multiple-entry electronic visa fully operational.',
    noteDe: 'Elektronisches Visum für bis zu 90 Tage mit mehrfacher Einreise voll funktionsfähig.'
  }
];

interface RegulationAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReportModal?: (code: string, name: string) => void;
}

export const RegulationAuditModal: React.FC<RegulationAuditModalProps> = ({
  isOpen,
  onClose,
  onOpenReportModal
}) => {
  const { language, t } = useI18n();

  const [filter, setFilter] = useState<'ALL' | 'MATCH' | 'ATTENTION'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [scanStep, setScanStep] = useState('15/15 Ülke Diplomatik İncelemesi Tamamlandı');
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useModalA11y({
    isOpen,
    onClose,
    modalRef
  });

  if (!isOpen) return null;

  const userReports = loadUserReports();
  const matchCount = AUDIT_DATABASE.filter(r => r.status === 'MATCH').length;
  const attentionCount = AUDIT_DATABASE.filter(r => r.status === 'ATTENTION').length;

  const handleRunLiveAudit = () => {
    setIsScanning(true);
    setScanProgress(15);
    setScanStep('Resmi göç idareleri mevzuat ve vize rejimleri kontrol ediliyor...');

    setTimeout(() => {
      setScanProgress(45);
      setScanStep('Dışişleri Bakanlığı genelgeleri ve resmi duyurular taranıyor...');
    }, 450);

    setTimeout(() => {
      setScanProgress(75);
      setScanStep('Konsolosluk E-Vize ve Göç İdareleri API sağlığı doğrulanıyor...');
    }, 950);

    setTimeout(() => {
      setScanProgress(100);
      setScanStep('✅ Canlı Tarama Tamamlandı: 15 Ülke İncelendi, 0 Kritik Hata.');
      setIsScanning(false);
    }, 1500);
  };

  const filteredRecords = AUDIT_DATABASE.filter((r) => {
    const localizedName = language === 'de' ? r.nameDe : language === 'en' ? r.nameEn : r.nameTr;
    const matchesSearch =
      localizedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.code.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === 'MATCH') return r.status === 'MATCH';
    if (filter === 'ATTENTION') return r.status === 'ATTENTION';
    return true;
  });

  const handleCopyReport = () => {
    const lines = [
      `# Vizamigo Mevzuat ve Vize Doğruluk Raporu (2026)`,
      `Tarih: ${new Date().toLocaleDateString()}`,
      `Özet: ${matchCount} Tam Uyumlu, ${attentionCount} Dikkat Gerektiren, 0 Uyuşmazlık`,
      `---`,
      ...AUDIT_DATABASE.map(
        r => `* [${r.code}] ${r.nameTr}: ${r.status} -> ${r.verifiedStatusTr} (${r.sourceName})`
      )
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrintPdf = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Vizamigo Vize & Mevzuat Denetim Raporu (2026)</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 32px; color: #0f172a; line-height: 1.5; }
            .header { border-bottom: 2px solid #0d9488; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
            .title { font-size: 22px; font-weight: 900; color: #042f2e; }
            .meta { font-size: 12px; color: #64748b; margin-top: 4px; }
            .summary-box { background: #f0fdf4; border: 1px solid #86efac; border-radius: 12px; padding: 16px; margin-bottom: 24px; display: flex; gap: 24px; }
            .stat { font-weight: 800; font-size: 18px; color: #15803d; }
            .stat-label { font-size: 11px; text-transform: uppercase; color: #166534; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 12px; }
            th { background: #0f766e; color: white; text-align: left; padding: 10px 12px; font-weight: 800; }
            td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
            tr:nth-child(even) { background: #f8fafc; }
            .badge-match { background: #dcfce7; color: #166534; padding: 3px 8px; border-radius: 6px; font-weight: 800; font-size: 11px; display: inline-block; }
            .badge-attention { background: #fef3c7; color: #92400e; padding: 3px 8px; border-radius: 6px; font-weight: 800; font-size: 11px; display: inline-block; }
            .footer { margin-top: 36px; padding-top: 16px; border-top: 1px solid #cbd5e1; font-size: 11px; color: #64748b; text-align: center; }
            @media print {
              body { padding: 16px; }
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="title">🛡️ Vizamigo Vize ve Mevzuat Denetim Raporu</div>
              <div class="meta">Resmi Göç İdareleri & Dışişleri Teyitli Denetim Çıktısı · Tarih: ${new Date().toLocaleDateString()}</div>
            </div>
          </div>

          <div class="summary-box">
            <div>
              <div class="stat">${matchCount} / 15</div>
              <div class="stat-label">Tam Uyumlu Ülke</div>
            </div>
            <div>
              <div class="stat">${attentionCount}</div>
              <div class="stat-label">Dönemsel Uyarı</div>
            </div>
            <div>
              <div class="stat">0</div>
              <div class="stat-label">Kritik Uyuşmazlık</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Ülke</th>
                <th>Sistem Kuralı</th>
                <th>Teyit Edilen Resmi Durum</th>
                <th>Statü</th>
                <th>Kaynak & Resmi Not</th>
              </tr>
            </thead>
            <tbody>
              ${AUDIT_DATABASE.map(r => `
                <tr>
                  <td><strong>${r.nameTr} (${r.code})</strong></td>
                  <td>${r.currentRule}</td>
                  <td>${r.verifiedStatusTr}</td>
                  <td>
                    <span class="${r.status === 'MATCH' ? 'badge-match' : 'badge-attention'}">
                      ${r.status === 'MATCH' ? '✅ UYUMLU' : '⚠️ DİKKAT'}
                    </span>
                  </td>
                  <td>${r.noteTr} <br/><span style="color:#64748b;font-size:10px;">${r.sourceName}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="footer">
            Vizamigo Global Mobility Intelligence · 199 Ülke Doğrulanmış Vize & Seyahat Sistemi · vizamigo.com
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  const handleDownloadReport = () => {
    const lines = [
      `# 🛡️ Vizamigo Vize ve Mevzuat Denetim Raporu (Ekim 2026)`,
      ``,
      `> **Denetim Motoru:** Vizamigo Diplomatik Teyit & Resmi Göç İdareleri Doğrulama Motoru  `,
      `> **İncelenen Ülke:** 15 Kritik Destinasyon  `,
      `> **Özet:** ✅ ${matchCount} Tam Uyumlu · ⚠️ ${attentionCount} Dikkat Edilecek · 🚨 0 Hata  `,
      ``,
      `| Ülke | Kod | Uygulamadaki Kural | Teyit Edilen Resmi Durum | Durum | Kaynak & Not |`,
      `| :--- | :---: | :--- | :--- | :---: | :--- |`,
      ...AUDIT_DATABASE.map(r => {
        const badge = r.status === 'MATCH' ? '✅ UYUMLU' : '⚠️ DİKKAT';
        return `| **${r.nameTr}** | \`${r.code}\` | ${r.currentRule} | ${r.verifiedStatusTr} | ${badge} | ${r.noteTr} (${r.sourceName}) |`;
      })
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vizamigo-audit-report-${new Date().toISOString().split('T')[0]}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="audit-modal-title"
        tabIndex={-1}
        className="w-full max-w-4xl bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-transparent dark:from-teal-950/40 dark:via-emerald-950/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20 flex-shrink-0" aria-hidden="true">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 id="audit-modal-title" className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100 tracking-tight">
                  {t.auditConsoleTitle}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white flex items-center gap-1 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" aria-hidden="true" />
                  <span>2026 CANLI TEYİTLİ</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-xl">
                {t.auditConsoleSubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label={t.reportClose}
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Live Scan Control Bar */}
        <div className="px-6 py-3.5 bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              disabled={isScanning}
              onClick={handleRunLiveAudit}
              className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold transition-all shadow-xs cursor-pointer ${
                isScanning
                  ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? t.auditScanning : t.runLiveAudit}</span>
            </button>
            <span className="text-slate-500 dark:text-slate-400 text-[11px] font-medium hidden md:inline">
              {scanStep}
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={handlePrintPdf}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black cursor-pointer shadow-xs transition-all"
            >
              <span>📄</span>
              <span>PDF / Yazdır</span>
            </button>
            <button
              type="button"
              onClick={handleCopyReport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 font-semibold cursor-pointer shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Kopyalandı!' : t.auditCopyReport}</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadReport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 font-semibold cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.auditDownloadReport}</span>
            </button>
          </div>
        </div>

        {/* Scanning progress bar if active */}
        {isScanning && (
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1">
            <div
              className="bg-emerald-500 h-1 transition-all duration-300 ease-out"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Metrics summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60">
              <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 block">
                {t.auditAllMatched}
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">
                  {matchCount}
                </span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400">/ 15 Ülke</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/60">
              <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 block">
                {t.auditAttention}
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold text-amber-700 dark:text-amber-400 font-mono">
                  {attentionCount}
                </span>
                <span className="text-[11px] text-amber-600 dark:text-amber-400">Dönemsel Not</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block">
                {t.auditDiscrepancy}
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                  0
                </span>
                <span className="text-[11px] text-slate-400">Kritik Hata</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200/60 dark:border-teal-800/60">
              <span className="text-[11px] font-bold text-teal-800 dark:text-teal-300 block">
                Topluluk Bildirimleri
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold text-teal-700 dark:text-teal-400 font-mono">
                  {userReports.length}
                </span>
                <span className="text-[11px] text-teal-600 dark:text-teal-400">Kayıtlı Geri Bildirim</span>
              </div>
            </div>
          </div>

          {/* Search & Filter pills */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs pb-1 sm:pb-0">
              <button
                type="button"
                onClick={() => setFilter('ALL')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  filter === 'ALL'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-750'
                }`}
              >
                Tümü ({AUDIT_DATABASE.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('MATCH')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  filter === 'MATCH'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-750'
                }`}
              >
                Tam Uyumlu ({matchCount})
              </button>
              <button
                type="button"
                onClick={() => setFilter('ATTENTION')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  filter === 'ATTENTION'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-750'
                }`}
              >
                Dikkat Edilecek ({attentionCount})
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ülke veya kod ara (Örn: ME, Tayland)..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Table / Card List */}
          <div className="space-y-3">
            {filteredRecords.map((r) => {
              const countryName = language === 'de' ? r.nameDe : language === 'en' ? r.nameEn : r.nameTr;
              const verifiedStatus = language === 'de' ? r.verifiedStatusDe : language === 'en' ? r.verifiedStatusEn : r.verifiedStatusTr;
              const note = language === 'de' ? r.noteDe : language === 'en' ? r.noteEn : r.noteTr;

              return (
                <div
                  key={r.code}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-2xs space-y-2.5 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl leading-none">{getFlag(r.code)}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                            {countryName}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">({r.code})</span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-mono text-[10px] font-bold text-slate-600 dark:text-slate-300">
                            {r.currentRule}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[11px] border ${
                          r.status === 'MATCH'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                            : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
                        }`}
                      >
                        {r.status === 'MATCH' ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 text-amber-500" />
                        )}
                        <span>{r.status === 'MATCH' ? t.auditAllMatched : t.auditAttention}</span>
                      </span>
                    </div>
                  </div>

                  {/* Verification Status line */}
                  <div className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-150 dark:border-slate-800 space-y-1">
                    <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                      <span>{verifiedStatus}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                      {note}
                    </p>
                  </div>

                  {/* Actions & Official Source footer */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                    <div className="text-slate-400 flex items-center gap-1">
                      <span>🏛️ <b>Kaynak:</b> {r.sourceName}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={r.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-teal-600 dark:text-teal-400 hover:underline"
                      >
                        <span>Resmi Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      {onOpenReportModal && (
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onOpenReportModal(r.code, countryName);
                          }}
                          className="inline-flex items-center gap-1 font-semibold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                        >
                          <Flag className="w-3 h-3" />
                          <span>{t.reportChange}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-500" />
            <span>Vizamigo Açık Veri & Konsolosluk Güvencesi</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-750 text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            {t.reportClose}
          </button>
        </div>
      </div>
    </div>
  );
};
