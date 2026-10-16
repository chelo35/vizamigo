import React, { useState } from 'react';
import {
  FileText,
  Plane,
  ShieldCheck,
  Wallet,
  Calendar,
  ExternalLink,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Wifi,
  Search
} from 'lucide-react';
import { useI18n } from '../data/i18n';
import { getFlag, getCountryName } from '../data/passportData';

interface WalletTabProps {
  currentPassport: string;
  secondaryPassport?: string;
  onChangePassport: () => void;
  onSelectStayTracker: () => void;
}

export const WalletTab: React.FC<WalletTabProps> = ({
  currentPassport,
  secondaryPassport,
  onChangePassport,
  onSelectStayTracker
}) => {
  const { language, l } = useI18n();
  const [subTab, setSubTab] = useState<'docs' | 'tickets' | 'validity' | 'budget'>('docs');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Uçak Bileti (İstanbul ➔ Bangkok)', category: 'Uçuş', amount: 640, currency: 'EUR' },
    { id: 2, title: 'Lagoon Resort Konaklama (6 Gece)', category: 'Otel', amount: 420, currency: 'EUR' },
    { id: 3, title: 'Airalo Asya Bölgesel eSIM (10 GB)', category: 'İletişim', amount: 24, currency: 'EUR' },
    { id: 4, title: '30.000€ Seyahat Sağlık Sigortası', category: 'Sigorta', amount: 18, currency: 'EUR' }
  ]);
  const [newExpTitle, setNewExpTitle] = useState('');
  const [newExpAmount, setNewExpAmount] = useState('');

  const totalSpent = expenses.reduce((acc, e) => acc + e.amount, 0);

  return (
    <div className="space-y-6">
      {/* Top Lagoon Header Card */}
      <div className="rounded-[28px] bento-lagoon-card p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-teal-500/15 text-[#0F766E] dark:text-[#2DD4BF] border border-teal-500/25">
            <Wallet className="w-3.5 h-3.5" />
            {l('Dijital Seyahat Kasası · %100 Cihaz İçi Şifreli', 'Digital Travel Vault · 100% On-Device Private')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            {l('Cüzdanım & Belge Kasası', 'My Wallet & Document Vault')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            {l(
              'Pasaport geçerlilik süreleri, e-vizeler, uçuş biniş kartları, seyahat sigortası ve tatil bütçeniz tek ekranda.',
              'Passport validity trackers, e-visas, boarding passes, travel insurance, and trip budget in one place.'
            )}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onSelectStayTracker}
            className="px-4 py-2.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-[#0D9488] to-[#0EA5E9] text-white shadow-sm hover:opacity-95 cursor-pointer flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{l('90/180 Gün Sayacını Aç', 'Open 90/180 Day Counter')}</span>
          </button>
        </div>
      </div>

      {/* Sub-Tabs + Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'docs' as const, label: l('🛂 Belgelerim', '🛂 Documents') },
            { id: 'tickets' as const, label: l('🎫 Bilet & Rezervasyon', '🎫 Tickets & Bookings') },
            { id: 'validity' as const, label: l('⏳ Süre Takibi', '⏳ Validity Tracker') },
            { id: 'budget' as const, label: l('💰 Tatil Bütçem', '💰 Trip Budget') }
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSubTab(t.id)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap cursor-pointer transition-all ${
                subTab === t.id
                  ? 'bg-gradient-to-r from-[#0D9488] to-[#0EA5E9] text-white shadow-xs'
                  : 'bento-lagoon-card text-slate-800 dark:text-slate-200 hover:bg-teal-500/15'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#0F766E] dark:text-[#2DD4BF] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={l('Cüzdanda belge veya bilet ara...', 'Search wallet...')}
            className="w-full pl-9 pr-3 py-2 rounded-full text-xs font-semibold bg-white/90 dark:bg-white/[0.06] border border-teal-500/25 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
          />
        </div>
      </div>

      {/* SUB-TAB 1: DOCUMENTS */}
      {subTab === 'docs' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Primary Passport Card */}
          <div className="p-5 rounded-[24px] bento-lagoon-card flex flex-col justify-between space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{getFlag(currentPassport)}</span>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F766E] dark:text-[#2DD4BF]">
                    {l('Birincil Pasaport', 'Primary Passport')}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {getCountryName(currentPassport, language)} ({currentPassport})
                  </h3>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300">
                {l('Aktif', 'Active')}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>{l('6 Ay Geçerlilik Kalkanı', '6-Month Validity Shield')}</span>
                <span className="text-emerald-700 dark:text-emerald-300">{l('Güvende (4 Yıl 2 Ay)', 'Safe (4Y 2M)')}</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-teal-500/15 overflow-hidden">
                <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-[#0D9488] to-[#10B981]" />
              </div>
            </div>

            <button
              type="button"
              onClick={onChangePassport}
              className="w-full py-2 rounded-xl text-xs font-extrabold bg-teal-500/15 text-[#0F766E] dark:text-[#2DD4BF] hover:bg-[#0D9488] hover:text-white transition-all cursor-pointer"
            >
              {l('Pasaportu Değiştir', 'Switch Passport')}
            </button>
          </div>

          {/* Visa & Entry Approvals Card */}
          <div className="p-5 rounded-[24px] bento-lagoon-card flex flex-col justify-between space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/15 text-sky-700 dark:text-sky-300 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-800 dark:text-sky-300">
                    {l('Vize & ETA Onayları', 'Visas & ETA Approvals')}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {l('Schengen & E-Vizeler', 'Schengen & eVisas')}
                  </h3>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-sky-500/15 text-sky-800 dark:text-sky-300">
                42 / 90 {l('Gün', 'Days')}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              {l(
                'Son 180 günlük pencerede 48 gün daha vizesiz/Schengen kalış hakkınız bulunuyor.',
                'You have 48 remaining days in the current 180-day rolling window.'
              )}
            </p>

            <button
              type="button"
              onClick={onSelectStayTracker}
              className="w-full py-2 rounded-xl text-xs font-extrabold bg-sky-500/15 text-sky-800 dark:text-sky-300 hover:bg-sky-600 hover:text-white transition-all cursor-pointer"
            >
              {l('Gün Sayacı Detaylarını Gör →', 'View Day Counter Details →')}
            </button>
          </div>

          {/* Travel Health Insurance & eSIM Partner Card */}
          <div className="p-5 rounded-[24px] bento-lagoon-card flex flex-col justify-between space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    {l('Zorunlu Sınır Güvencesi', 'Mandatory Border Protection')}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {l('Sigorta Poliçesi & eSIM', 'Insurance Policy & eSIM')}
                  </h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://safetywing.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/80 dark:bg-white/[0.05] border border-teal-500/20 hover:border-teal-500 flex items-center justify-between no-underline"
              >
                <div>
                  <div className="text-xs font-extrabold text-slate-900 dark:text-white">SafetyWing</div>
                  <div className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">{l('Poliçe Al', 'Get Policy')}</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#0F766E] dark:text-[#2DD4BF]" />
              </a>
              <a
                href="https://www.airalo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/80 dark:bg-white/[0.05] border border-teal-500/20 hover:border-teal-500 flex items-center justify-between no-underline"
              >
                <div>
                  <div className="text-xs font-extrabold text-slate-900 dark:text-white">Airalo eSIM</div>
                  <div className="text-[10px] font-semibold text-sky-700 dark:text-sky-300">{l('5G Paket', '5G Data')}</div>
                </div>
                <Wifi className="w-3.5 h-3.5 text-[#0F766E] dark:text-[#2DD4BF]" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: TICKETS & BOOKINGS */}
      {subTab === 'tickets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-[24px] bento-lagoon-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-teal-500/15 text-[#0F766E] dark:text-[#2DD4BF]">
                ✈️ {l('Yaklaşan Uçuş', 'Upcoming Flight')}
              </span>
              <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-300">PNR: VZ2026</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">IST</div>
                <div className="text-xs text-slate-500">İstanbul · 01:45</div>
              </div>
              <div className="flex-1 px-4 flex flex-col items-center">
                <Plane className="w-5 h-5 text-[#0D9488]" />
                <div className="w-full h-0.5 bg-teal-500/30 my-1" />
                <span className="text-[10px] font-bold text-slate-500">{l('Direkt · 9s 30dk', 'Direct · 9h 30m')}</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-slate-900 dark:text-white">BKK</div>
                <div className="text-xs text-slate-500">Bangkok · 15:15</div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-[24px] bento-lagoon-card flex flex-col justify-between space-y-3">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300">
                🏨 {l('Sınır Kontrolü İçin Hazır Rezervasyonlar', 'Border-Ready Bookings')}
              </span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-2">
                {l('Otel, Dönüş Bileti & Havalimanı Transferi', 'Hotel, Return Ticket & Airport Transfer')}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                {l('Henüz otel veya dönüş bileti almadıysanız vize kontrolü öncesi hemen tamamlayın:', 'Complete missing bookings before passport control:')}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="https://www.agoda.com" target="_blank" rel="noopener noreferrer" className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-[#0D9488] text-white no-underline">
                🏨 Agoda / Booking →
              </a>
              <a href="https://wayaway.io" target="_blank" rel="noopener noreferrer" className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-[#0EA5E9] text-white no-underline">
                ✈️ WayAway / Trip.com →
              </a>
              <a href="https://kiwitaxi.com" target="_blank" rel="noopener noreferrer" className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-emerald-600 text-white no-underline">
                🚕 Kiwitaxi →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: VALIDITY TRACKER */}
      {subTab === 'validity' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-[24px] bento-lagoon-card space-y-3">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-extrabold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>{l('Pasaport 6 Ay Kuralı Kontrolü', 'Passport 6-Month Rule Check')}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {l(
                'Avrupa (Schengen), Tayland, Singapur ve Japonya dahil 140+ ülke pasaportunuzun dönüş tarihinden itibaren en az 6 ay daha geçerli olmasını şart koşar.',
                'Over 140 countries require at least 6 months of remaining passport validity beyond your planned departure.'
              )}
            </p>
          </div>
          <div className="p-5 rounded-[24px] bento-lagoon-card space-y-3">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-extrabold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>{l('Boş Vize Sayfası Hatırlatması', 'Blank Visa Pages Reminder')}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {l(
                'Kapıda vize (VoA) veya fiziksel vize basılan ülkelere giderken pasaportunuzda yan yana en az 2 boş sayfa bulunduğundan emin olun.',
                'Ensure you have at least 2 adjacent blank pages when traveling to Visa-on-Arrival destinations.'
              )}
            </p>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: BUDGET */}
      {subTab === 'budget' && (
        <div className="space-y-4">
          <div className="p-5 rounded-[24px] bento-lagoon-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-slate-600 dark:text-slate-400">{l('Toplam Planlanan Seyahat Harcaması', 'Total Planned Trip Spend')}</div>
              <div className="text-3xl font-black font-mono text-[#0F766E] dark:text-[#2DD4BF]">€{totalSpent}</div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                value={newExpTitle}
                onChange={(e) => setNewExpTitle(e.target.value)}
                placeholder={l('Harcama adı (Örn: Müze)', 'Expense title')}
                className="px-3 py-2 rounded-full text-xs font-semibold bg-white dark:bg-white/10 border border-teal-500/25 text-slate-900 dark:text-white"
              />
              <input
                type="number"
                value={newExpAmount}
                onChange={(e) => setNewExpAmount(e.target.value)}
                placeholder="EUR (€)"
                className="w-24 px-3 py-2 rounded-full text-xs font-semibold bg-white dark:bg-white/10 border border-teal-500/25 text-slate-900 dark:text-white"
              />
              <button
                type="button"
                onClick={() => {
                  const val = parseFloat(newExpAmount);
                  if (newExpTitle.trim() && !isNaN(val) && val > 0) {
                    setExpenses(prev => [...prev, { id: Date.now(), title: newExpTitle.trim(), category: 'Ekstra', amount: val, currency: 'EUR' }]);
                    setNewExpTitle('');
                    setNewExpAmount('');
                  }
                }}
                className="px-4 py-2 rounded-full text-xs font-extrabold bg-[#0D9488] text-white cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> {l('Ekle', 'Add')}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {expenses.map((exp) => (
              <div key={exp.id} className="p-4 rounded-2xl bento-lagoon-card flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-[#0F766E] dark:text-[#2DD4BF]">{exp.category}</span>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white">{exp.title}</div>
                </div>
                <span className="text-base font-black font-mono text-slate-900 dark:text-white">€{exp.amount}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
