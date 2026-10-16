import React, { useState } from 'react';
import {
  Compass,
  ShieldCheck,
  Globe,
  Award,
  Sparkles,
  Lock,
  ExternalLink,
  Users,
  HelpCircle,
  MapPin,
  Clock,
  CloudSun,
  ChevronRight,
  Plane,
  FileCheck2,
  BookmarkCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../../data/i18n';

interface Props {
  onSelectCountry?: (countryCode: string) => void;
  onOpenLegalModal: (tab?: string) => void;
  setActiveTab?: (tab: string) => void;
  onOpenPackingList?: () => void;
  onOpenTippingCalc?: () => void;
  onOpenTimezoneOverlap?: () => void;
  onOpenGlobalRadar?: () => void;
}

type PopularCategory = 'visa_free' | 'national_id' | 'schengen' | 'metropolises' | 'digital_nomad' | 'evisa';

interface DestinationChip {
  city: string;
  country: string;
  code: string;
  flag: string;
  badge: {
    tr: string;
    en: string;
    de: string;
    es: string;
    ru: string;
  };
  highlight?: boolean;
}

const POPULAR_DESTINATIONS: Record<PopularCategory, DestinationChip[]> = {
  visa_free: [
    { city: 'Belgrad', country: 'Sırbistan', code: 'RS', flag: '🇷🇸', badge: { tr: '90 Gün Vizesiz', en: '90 Days Visa-Free', de: '90 Tage Visafrei', es: '90 Días Sin Visa', ru: '90 дней без визы' }, highlight: true },
    { city: 'Saraybosna', country: 'Bosna-Hersek', code: 'BA', flag: '🇧🇦', badge: { tr: '90 Gün Vizesiz', en: '90 Days Visa-Free', de: '90 Tage Visafrei', es: '90 Días Sin Visa', ru: '90 дней без визы' }, highlight: true },
    { city: 'Üsküp', country: 'Kuzey Makedonya', code: 'MK', flag: '🇲🇰', badge: { tr: '90 Gün Vizesiz', en: '90 Days Visa-Free', de: '90 Tage Visafrei', es: '90 Días Sin Visa', ru: '90 дней без визы' } },
    { city: 'Tiran', country: 'Arnavutluk', code: 'AL', flag: '🇦🇱', badge: { tr: '90 Gün Vizesiz', en: '90 Days Visa-Free', de: '90 Tage Visafrei', es: '90 Días Sin Visa', ru: '90 дней без визы' } },
    { city: 'Podgorica & Budva', country: 'Karadağ', code: 'ME', flag: '🇲🇪', badge: { tr: '90 Gün Vizesiz', en: '90 Days Visa-Free', de: '90 Tage Visafrei', es: '90 Días Sin Visa', ru: '90 дней без визы' }, highlight: true },
    { city: 'Priştine', country: 'Kosova', code: 'XK', flag: '🇽🇰', badge: { tr: '90 Gün Vizesiz', en: '90 Days Visa-Free', de: '90 Tage Visafrei', es: '90 Días Sin Visa', ru: '90 дней без визы' } },
    { city: 'Kişinev', country: 'Moldova', code: 'MD', flag: '🇲🇩', badge: { tr: '90 Gün Vizesiz', en: '90 Days Visa-Free', de: '90 Tage Visafrei', es: '90 Días Sin Visa', ru: '90 дней без визы' } },
    { city: 'Beyrut', country: 'Lübnan', code: 'LB', flag: '🇱🇧', badge: { tr: '90 Gün Vizesiz', en: '90 Days Visa-Free', de: '90 Tage Visafrei', es: '90 Días Sin Visa', ru: '90 дней без визы' } },
    { city: 'Tunus', country: 'Tunus', code: 'TN', flag: '🇹🇳', badge: { tr: '90 Gün Vizesiz', en: '90 Days Visa-Free', de: '90 Tage Visafrei', es: '90 Días Sin Visa', ru: '90 дней без визы' } },
    { city: 'Şarm El-Şeyh', country: 'Mısır', code: 'EG', flag: '🇪🇬', badge: { tr: '15 Gün Sinai Vizesiz', en: '15 Days Sinai Visa-Free', de: '15 Tage Sinai Visafrei', es: '15 Días Sinaí Sin Visa', ru: '15 дней Синай без визы' }, highlight: true },
    { city: 'Bangkok & Phuket', country: 'Tayland', code: 'TH', flag: '🇹🇭', badge: { tr: '30 Gün Vizesiz', en: '30 Days Visa-Free', de: '30 Tage Visafrei', es: '30 Días Sin Visa', ru: '30 дней без визы' } },
    { city: 'Kuala Lumpur', country: 'Malezya', code: 'MY', flag: '🇲🇾', badge: { tr: '90 Gün Vizesiz', en: '90 Days Visa-Free', de: '90 Tage Visafrei', es: '90 Días Sin Visa', ru: '90 дней без визы' } }
  ],
  national_id: [
    { city: 'Tiflis & Batum', country: 'Gürcistan', code: 'GE', flag: '🇬🇪', badge: { tr: 'Çipli Kimlikle Giriş', en: 'National ID Entry', de: 'Mit Personalausweis', es: 'Entrada con DNI', ru: 'Въезд по ID-карте' }, highlight: true },
    { city: 'Bakü', country: 'Azerbaycan', code: 'AZ', flag: '🇦🇿', badge: { tr: 'Çipli Kimlikle Giriş', en: 'National ID Entry', de: 'Mit Personalausweis', es: 'Entrada con DNI', ru: 'Въезд по ID-карте' }, highlight: true },
    { city: 'Lefkoşa & Girne', country: 'KKTC', code: 'CY', flag: '🇹🇷', badge: { tr: 'Çipli Kimlikle Giriş', en: 'National ID Entry', de: 'Mit Personalausweis', es: 'Entrada con DNI', ru: 'Въезд по ID-карте' }, highlight: true },
    { city: 'Belgrad & Novi Sad', country: 'Sırbistan', code: 'RS', flag: '🇷🇸', badge: { tr: 'Protokol Hazır / Kimlik', en: 'ID Protocol Approved', de: 'ID-Protokoll Genehmigt', es: 'Protocolo DNI Aprobado', ru: 'Протокол по ID-карте' } },
    { city: 'Saraybosna & Mostar', country: 'Bosna-Hersek', code: 'BA', flag: '🇧🇦', badge: { tr: 'Kimlikle Geçiş Anlaşması', en: 'ID Agreement Signed', de: 'ID-Abkommen Unterzeichnet', es: 'Acuerdo DNI Firmado', ru: 'Соглашение по ID' } },
    { city: 'Kişinev', country: 'Moldova', code: 'MD', flag: '🇲🇩', badge: { tr: 'Çipli Kimlikle Giriş', en: 'National ID Entry', de: 'Mit Personalausweis', es: 'Entrada con DNI', ru: 'Въезд по ID-карте' } }
  ],
  schengen: [
    { city: 'Roma & Floransa', country: 'İtalya', code: 'IT', flag: '🇮🇹', badge: { tr: 'Schengen Vizesi', en: 'Schengen Visa', de: 'Schengen-Visum', es: 'Visa Schengen', ru: 'Шенгенская виза' }, highlight: true },
    { city: 'Paris & Nice', country: 'Fransa', code: 'FR', flag: '🇫🇷', badge: { tr: 'Schengen Vizesi', en: 'Schengen Visa', de: 'Schengen-Visum', es: 'Visa Schengen', ru: 'Шенгенская виза' } },
    { city: 'Madrid & Barselona', country: 'İspanya', code: 'ES', flag: '🇪🇸', badge: { tr: 'Schengen Vizesi', en: 'Schengen Visa', de: 'Schengen-Visum', es: 'Visa Schengen', ru: 'Шенгенская виза' }, highlight: true },
    { city: 'Berlin & Münih', country: 'Almanya', code: 'DE', flag: '🇩🇪', badge: { tr: 'Schengen Vizesi', en: 'Schengen Visa', de: 'Schengen-Visum', es: 'Visa Schengen', ru: 'Шенгенская виza' } },
    { city: 'Amsterdam', country: 'Hollanda', code: 'NL', flag: '🇳🇱', badge: { tr: 'Schengen Vizesi', en: 'Schengen Visa', de: 'Schengen-Visum', es: 'Visa Schengen', ru: 'Шенгенская виза' } },
    { city: 'Viyana', country: 'Avusturya', code: 'AT', flag: '🇦🇹', badge: { tr: 'Schengen Vizesi', en: 'Schengen Visa', de: 'Schengen-Visum', es: 'Visa Schengen', ru: 'Шенгенская виза' } },
    { city: 'Prag', country: 'Çekya', code: 'CZ', flag: '🇨🇿', badge: { tr: 'Schengen Vizesi', en: 'Schengen Visa', de: 'Schengen-Visum', es: 'Visa Schengen', ru: 'Шенгенская виза' } },
    { city: 'Atina & Rodos', country: 'Yunanistan', code: 'GR', flag: '🇬🇷', badge: { tr: 'Schengen / Kapıda Ada Vizesi', en: 'Schengen / Island VOA', de: 'Schengen / Insel-Visum', es: 'Schengen / Visa de Isla', ru: 'Шенген / Островная виза' }, highlight: true },
    { city: 'Budapeşte', country: 'Macaristan', code: 'HU', flag: '🇭🇺', badge: { tr: 'Schengen Vizesi', en: 'Schengen Visa', de: 'Schengen-Visum', es: 'Visa Schengen', ru: 'Шенгенская виза' } },
    { city: 'Lizbon & Porto', country: 'Portekiz', code: 'PT', flag: '🇵🇹', badge: { tr: 'Schengen Vizesi', en: 'Schengen Visa', de: 'Schengen-Visum', es: 'Visa Schengen', ru: 'Шенгенская виза' } }
  ],
  metropolises: [
    { city: 'Londra', country: 'Birleşik Krallık', code: 'GB', flag: '🇬🇧', badge: { tr: 'Standart Ziyaretçi Vizesi', en: 'Standard Visitor Visa', de: 'Besuchervisum', es: 'Visa de Visitante', ru: 'Туристическая виза' }, highlight: true },
    { city: 'Tokyo', country: 'Japonya', code: 'JP', flag: '🇯🇵', badge: { tr: '90 Gün Vizesiz', en: '90 Days Visa-Free', de: '90 Tage Visafrei', es: '90 Días Sin Visa', ru: '90 дней без визы' }, highlight: true },
    { city: 'New York', country: 'Amerika Birleşik Devletleri', code: 'US', flag: '🇺🇸', badge: { tr: 'B1/B2 Vizesi (10 Yıl)', en: 'B1/B2 Visa (10 Years)', de: 'B1/B2 Visum', es: 'Visa B1/B2', ru: 'Виза B1/B2 (10 лет)' } },
    { city: 'Dubai & Abu Dabi', country: 'Birleşik Arap Emirlikleri', code: 'AE', flag: '🇦🇪', badge: { tr: 'e-Vize Kolaylığı', en: 'Online eVisa', de: 'Online e-Visum', es: 'eVisa en Línea', ru: 'Электронная виза' }, highlight: true },
    { city: 'Seul', country: 'Güney Kore', code: 'KR', flag: '🇰🇷', badge: { tr: 'K-ETA İzni', en: 'K-ETA Required', de: 'K-ETA Erforderlich', es: 'K-ETA Requerida', ru: 'Разрешение K-ETA' } },
    { city: 'Singapur', country: 'Singapur', code: 'SG', flag: '🇸🇬', badge: { tr: '30 Gün Vizesiz / SGAC', en: '30 Days Visa-Free / SGAC', de: '30 Tage Visafrei', es: '30 Días Sin Visa', ru: '30 дней без визы' } },
    { city: 'Toronto', country: 'Kanada', code: 'CA', flag: '🇨🇦', badge: { tr: 'Kanada Vizesi (10 Yıl)', en: 'Canada Visitor Visa', de: 'Kanada Visum', es: 'Visa de Canadá', ru: 'Виза в Канаду' } },
    { city: 'Sidney', country: 'Avustralya', code: 'AU', flag: '🇦🇺', badge: { tr: 'eVisitor / Turist Vizesi', en: 'Visitor Visa (Subclass 600)', de: 'Besuchervisum 600', es: 'Visa de Turista 600', ru: 'Виза подкласс 600' } }
  ],
  digital_nomad: [
    { city: 'Bali (Canggu & Ubud)', country: 'Endonezya', code: 'ID', flag: '🇮🇩', badge: { tr: 'E33G Dijital Göçebe Vizesi', en: 'Remote Worker Visa E33G', de: 'Remote-Worker-Visum', es: 'Visa Nómade Digital', ru: 'Виза цифрового кочевника' }, highlight: true },
    { city: 'Lizbon & Madeira', country: 'Portekiz', code: 'PT', flag: '🇵🇹', badge: { tr: 'D8 Dijital Göçebe Vizesi', en: 'D8 Digital Nomad Visa', de: 'D8 Digital Nomad Visum', es: 'Visa D8 Nómada Digital', ru: 'D8 виза кочевника' }, highlight: true },
    { city: 'Valensiya & Barselona', country: 'İspanya', code: 'ES', flag: '🇪🇸', badge: { tr: 'İspanya Göçebe Vizesi', en: 'Spain Nomad Visa', de: 'Spanien Nomad-Visum', es: 'Visa Nómada España', ru: 'Виза кочевника Испании' } },
    { city: 'Tiflis', country: 'Gürcistan', code: 'GE', flag: '🇬🇪', badge: { tr: '365 Gün Vizesiz Kalış', en: '365 Days Visa-Free Stay', de: '365 Tage Visafrei', es: '365 Días Sin Visa', ru: '365 дней без визы' }, highlight: true },
    { city: 'Bansko & Sofya', country: 'Bulgaristan', code: 'BG', flag: '🇧🇬', badge: { tr: 'Düşük Vergi & Hızlı İnternet', en: 'Low Tax & Fast Fiber', de: 'Niedrige Steuern', es: 'Impuestos Bajos', ru: 'Низкие налоги' } },
    { city: 'Dubai', country: 'BAE', code: 'AE', flag: '🇦🇪', badge: { tr: '1 Yıllık Uzaktan Çalışma', en: '1-Year Remote Work', de: '1-Jahr Remote Work', es: '1 Año Trabajo Remoto', ru: '1 год удаленной работы' } },
    { city: 'Medellin', country: 'Kolombiya', code: 'CO', flag: '🇨🇴', badge: { tr: 'V Nómadas Digitales', en: 'V Digital Nomad Visa', de: 'V Digital Nomad Visum', es: 'Visa V Nómada', ru: 'Виза кочевника V' } },
    { city: 'Chiang Mai', country: 'Tayland', code: 'TH', flag: '🇹🇭', badge: { tr: 'DTV Göçebe Vizesi (5 Yıl)', en: 'DTV Nomad Visa (5 Years)', de: 'DTV Nomad Visum', es: 'Visa DTV Nómada (5 Años)', ru: 'DTV виза на 5 лет' }, highlight: true }
  ],
  evisa: [
    { city: 'Kahire & Hurgada', country: 'Mısır', code: 'EG', flag: '🇪🇬', badge: { tr: 'Kapıda Vize / e-Vize 25$', en: 'VOA / eVisa $25', de: 'Visum bei Ankunft $25', es: 'Visa a la Llegada $25', ru: 'Виза по прилету $25' }, highlight: true },
    { city: 'Dubai & Şarika', country: 'BAE', code: 'AE', flag: '🇦🇪', badge: { tr: 'Hızlı Online e-Vize', en: 'Fast Online eVisa', de: 'Schnelles e-Visum', es: 'eVisa Rápida Online', ru: 'Быстрая электронная виза' }, highlight: true },
    { city: 'Doha', country: 'Katar', code: 'QA', flag: '🇶🇦', badge: { tr: '90 Gün Kapıda Ücretsiz Vize', en: '90 Days Free VOA', de: '90 Tage Kostenloses VOA', es: '90 Días Gratis Llegada', ru: '90 дней бесплатно по прилету' }, highlight: true },
    { city: 'Muskat', country: 'Umman', code: 'OM', flag: '🇴🇲', badge: { tr: '14 Gün Vizesiz / e-Vize', en: '14 Days Visa-Free / eVisa', de: '14 Tage Visafrei', es: '14 Días Sin Visa', ru: '14 дней без визы' } },
    { city: 'Nairobi', country: 'Kenya', code: 'KE', flag: '🇰🇪', badge: { tr: 'eTA Seyahat Yetkisi', en: 'eTA Authorization', de: 'eTA Reisegenehmigung', es: 'Autorización eTA', ru: 'Разрешение eTA' } },
    { city: 'Cakarta & Bali', country: 'Endonezya', code: 'ID', flag: '🇮🇩', badge: { tr: 'e-VOA Kapıda Elektronik Vize', en: 'Electronic VOA (e-VOA)', de: 'Elektronisches VOA', es: 'e-VOA Electrónica', ru: 'Электронная e-VOA' } },
    { city: 'Tanzanya & Zanzibar', country: 'Tanzanya', code: 'TZ', flag: '🇹🇿', badge: { tr: 'Kapıda Vize 50$', en: 'VOA $50', de: 'Visum bei Ankunft $50', es: 'Visa Llegada $50', ru: 'Виза по прилету $50' } },
    { city: 'Yeni Delhi', country: 'Hindistan', code: 'IN', flag: '🇮🇳', badge: { tr: 'Hindistan e-Turist Vizesi', en: 'Indian e-Tourist Visa', de: 'Indisches e-Visum', es: 'eVisa India', ru: 'Индийская e-виза' } }
  ]
};

export const GlobalFooter: React.FC<Props> = ({
  onSelectCountry,
  onOpenLegalModal,
  setActiveTab,
  onOpenPackingList,
  onOpenTippingCalc,
  onOpenTimezoneOverlap,
  onOpenGlobalRadar
}) => {
  const { language, l } = useI18n();
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<PopularCategory>('visa_free');

  const categories: { key: PopularCategory; label: { tr: string; en: string; de: string; es: string; ru: string }; count: number }[] = [
    { key: 'visa_free', label: { tr: 'Vizesiz Rotalar', en: 'Visa-Free Routes', de: 'Visafreie Routen', es: 'Rutas Sin Visa', ru: 'Безвизовые маршруты' }, count: 12 },
    { key: 'national_id', label: { tr: 'Kimlikle Giriş', en: 'National ID Entry', de: 'Mit Personalausweis', es: 'Entrada con DNI', ru: 'По ID-карте' }, count: 6 },
    { key: 'schengen', label: { tr: 'Schengen & Avrupa', en: 'Schengen & Europe', de: 'Schengen & Europa', es: 'Schengen y Europa', ru: 'Шенген и Европа' }, count: 10 },
    { key: 'metropolises', label: { tr: 'Küresel Metropoller', en: 'Global Metropolises', de: 'Weltmetropolen', es: 'Metrópolis Mundiales', ru: 'Мировые мегаполисы' }, count: 8 },
    { key: 'digital_nomad', label: { tr: 'Dijital Göçebe Rotaları', en: 'Digital Nomad Hubs', de: 'Digital Nomad Hubs', es: 'Hubs Nómadas Digitales', ru: 'Для цифровых кочевников' }, count: 8 },
    { key: 'evisa', label: { tr: 'e-Vize & Kapıda Vize', en: 'eVisa & Visa on Arrival', de: 'e-Visum & VOA', es: 'eVisa y Llegada', ru: 'e-Виза и по прилету' }, count: 8 }
  ];

  const currentDestinations = POPULAR_DESTINATIONS[selectedCategory];

  return (
    <footer className="mt-16 w-full space-y-10 rounded-3xl p-6 sm:p-10 bento-lagoon-card text-slate-800 dark:text-slate-100 shadow-xl backdrop-blur-2xl">
      {/* ======================================================== */}
      {/* 1. VALUE / PERKS BANNER (Single Surface Lagoon Style) */}
      {/* ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white shadow-md border-2 border-teal-500/25 dark:border-teal-400/30">
        {/* Ambient Glows */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#2DD4BF]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-32 -bottom-20 w-72 h-72 bg-[#0284C7]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-800 dark:text-[#5EEAD4] text-xs font-black tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{l('Vizamigo Gezgin Kulübü', 'Vizamigo Traveler Club', 'Vizamigo Reiseclub', 'Club de Viajeros Vizamigo', 'Клуб путешественников Vizamigo')}</span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-slate-900 dark:text-white drop-shadow-xs">
              {l('Daha fazla seyahat, daha bilinçli rotalar', 'Travel more, travel smarter & hassle-free', 'Mehr reisen, smarter unterwegs', 'Viaja más, planifica con certeza', 'Путешествуйте больше и увереннее')}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-teal-100 font-medium leading-relaxed">
              {isAuthenticated ? (
                <span>
                  {l('Hoş geldiniz, seyahat profiliniz ve kayıtlı pasaportlarınız senkronize ediliyor.', 'Welcome back! Your traveler profile and saved passport routes are synced across devices.', 'Willkommen zurück! Ihr Reiseprofil und gespeicherte Routen sind synchronisiert.', '¡Bienvenido! Tu perfil y rutas guardadas están sincronizados.', 'Добро пожаловать! Ваш профиль и сохраненные маршруты синхронизированы.')}
                </span>
              ) : (
                <span>
                  {l(
                    'Giriş yapın veya ücretsiz hesap açın: Pasaportlarınızı güvenle kaydedin, vize bitiş alarmları alın, favori rotalarınızı tüm cihazlarınızda anında senkronize edin.',
                    'Sign in or register for free: Securely store your passports, receive visa expiry reminders, and sync your favorite routes seamlessly across all devices.',
                    'Anmelden oder kostenlos registrieren: Speichern Sie Ihre Pässe sicher, erhalten Sie Visa-Erinnerungen und synchronisieren Sie Ihre Routen.',
                    'Inicia sesión o regístrate gratis: Guarda tus pasaportes de forma segura, recibe alertas de vencimiento de visa y sincroniza tus rutas.',
                    'Войдите или зарегистрируйтесь бесплатно: сохраняйте паспорта, получайте уведомления об окончании виз и синхронизируйте маршруты.'
                  )}
                </span>
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto flex-shrink-0">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab('profile')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#0D9488] to-[#14B8A6] hover:brightness-110 text-white font-black text-xs sm:text-sm shadow-lg shadow-teal-900/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <BookmarkCheck className="w-4 h-4" />
                <span>{l('Profilimi & Pasaportlarımı Gör', 'View My Profile & Passports', 'Mein Profil & Pässe', 'Ver Mi Perfil', 'Мой профиль и паспорта')}</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#0D9488] hover:bg-[#14B8A6] text-white font-black text-xs sm:text-sm shadow-lg shadow-teal-700/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>{l('Giriş Yap', 'Sign In', 'Anmelden', 'Iniciar Sesión', 'Войти')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModal('register')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-white/10 hover:bg-slate-50 dark:hover:bg-white/20 border border-teal-500/30 dark:border-[#2DD4BF]/40 text-slate-800 dark:text-white font-bold text-xs sm:text-sm backdrop-blur-md transition-all cursor-pointer shadow-xs"
                >
                  <Users className="w-4 h-4" />
                  <span>{l('Ücretsiz Kaydol', 'Register Free', 'Kostenlos Registrieren', 'Registrarse Gratis', 'Регистрация')}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. TABBED POPULAR DESTINATIONS SECTION (Booking.com Explorer) */}
      {/* ======================================================== */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-teal-500/20 dark:border-[#2DD4BF]/30 pb-4">
          <div>
            <div className="flex items-center gap-2 text-teal-800 dark:text-[#5EEAD4] text-xs font-black uppercase tracking-wider mb-1">
              <Globe className="w-3.5 h-3.5 text-[#0D9488] dark:text-[#2DD4BF]" />
              <span>{l('Küresel Keşif & Rota Ağları', 'Global Discovery & Route Networks', 'Globale Entdeckung & Routen', 'Descubrimiento Global y Rutas', 'Глобальная сеть маршрутов')}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {l("Türkiye'den ve Dünyadan Gezginler Arasında Popüler", 'Popular Among Global Travelers', 'Beliebt bei Reisenden weltweit', 'Popular entre los viajeros', 'Популярно среди путешественников')}
            </h2>
          </div>
          <span className="text-xs text-teal-800 dark:text-teal-200 font-bold">
            {l('2026 Resmî Konsolosluk & IATA Verileri', '2026 Official Consular & IATA Data', '2026 Offizielle IATA-Daten', 'Datos Oficiales Consulares 2026', 'Официальные данные IATA 2026')}
          </span>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none touch-pan-x">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            const labelText = cat.label[language as 'tr' | 'en' | 'de' | 'es' | 'ru'] || cat.label.en;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0D9488] to-[#14B8A6] text-white shadow-md shadow-teal-900/20 border border-[#5EEAD4]/60'
                    : 'bg-white/80 dark:bg-white/10 text-slate-700 dark:text-white/90 hover:bg-white dark:hover:bg-white/20 border border-teal-500/20 dark:border-[#2DD4BF]/30'
                }`}
              >
                <span>{labelText}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-black ${
                  isActive ? 'bg-black/25 text-[#5EEAD4]' : 'bg-slate-100 dark:bg-white/15 text-slate-600 dark:text-white'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Clickable Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {currentDestinations.map((dest) => {
            const badgeText = dest.badge[language as 'tr' | 'en' | 'de' | 'es' | 'ru'] || dest.badge.en;
            return (
              <button
                key={`${dest.code}-${dest.city}`}
                type="button"
                onClick={() => onSelectCountry && onSelectCountry(dest.code)}
                className="group flex items-center justify-between p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/80 hover:bg-white border border-teal-500/20 dark:border-[#2DD4BF]/35 hover:border-teal-400 dark:hover:border-[#5EEAD4] transition-all text-left cursor-pointer shadow-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl leading-none flex-shrink-0 group-hover:scale-110 transition-transform">
                    {dest.flag}
                  </span>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate group-hover:text-teal-700 dark:group-hover:text-[#5EEAD4] transition-colors">
                      {dest.city}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-teal-200 font-semibold truncate">
                      {dest.country}
                    </div>
                    <div className="mt-1">
                      <span className={`inline-block text-xs font-black px-2 py-0.5 rounded-md ${
                        dest.highlight
                          ? 'bg-teal-500/15 text-teal-800 dark:text-[#5EEAD4] border border-teal-500/30 dark:border-[#2DD4BF]/60'
                          : 'bg-slate-100 dark:bg-white/15 text-slate-700 dark:text-white/90'
                      }`}>
                        {badgeText}
                      </span>
                    </div>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-teal-600 dark:text-[#2DD4BF] group-hover:text-teal-800 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </button>
            );
          })}
        </div>

        {/* Quick Links & Internal SEO Taxonomy Cloud (like Booking.com's breadcrumb cloud) */}
        <div className="pt-4 border-t border-teal-500/20 dark:border-[#2DD4BF]/30">
          <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-teal-100 text-center sm:text-left flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1">
            <span className="font-black text-slate-900 dark:text-white">{l('Popüler Rehberler:', 'Popular Guides:', 'Beliebte Ratgeber:', 'Guías Populares:', 'Популярные гиды:')}</span>
            <button type="button" onClick={() => onSelectCountry && onSelectCountry('GE')} className="inline-flex items-center px-1.5 py-1 text-slate-700 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline cursor-pointer font-semibold">{l('Kimlikle Gürcistan', 'Georgia with National ID', 'Georgien mit Personalausweis', 'Georgia con DNI', 'Грузия по ID')}</button>
            <span className="text-teal-400">·</span>
            <button type="button" onClick={() => onSelectCountry && onSelectCountry('RS')} className="inline-flex items-center px-1.5 py-1 text-slate-700 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline cursor-pointer font-semibold">{l('Sırbistan Vizesiz Seyahat', 'Serbia Visa-Free', 'Serbien Visafrei', 'Serbia Sin Visa', 'Сербия без визы')}</button>
            <span className="text-teal-400">·</span>
            <button type="button" onClick={() => onSelectCountry && onSelectCountry('BA')} className="inline-flex items-center px-1.5 py-1 text-slate-700 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline cursor-pointer font-semibold">{l('Bosna-Hersek Rehberi', 'Bosnia Travel Guide', 'Bosnien Ratgeber', 'Guía Bosnia', 'Гид по Боснии')}</button>
            <span className="text-teal-400">·</span>
            <button type="button" onClick={() => onSelectCountry && onSelectCountry('ME')} className="inline-flex items-center px-1.5 py-1 text-slate-700 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline cursor-pointer font-semibold">{l('Karadağ Tatil Şartları', 'Montenegro Requirements', 'Montenegro Regeln', 'Condiciones Montenegro', 'Черногория правила')}</button>
            <span className="text-teal-400">·</span>
            <button type="button" onClick={() => onSelectCountry && onSelectCountry('JP')} className="inline-flex items-center px-1.5 py-1 text-slate-700 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline cursor-pointer font-semibold">{l('Japonya 90 Gün Vizesiz', 'Japan 90-Day Free', 'Japan 90 Tage Visafrei', 'Japón 90 Días', 'Япония 90 дней')}</button>
            <span className="text-teal-400">·</span>
            <button type="button" onClick={() => onSelectCountry && onSelectCountry('EG')} className="inline-flex items-center px-1.5 py-1 text-slate-700 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline cursor-pointer font-semibold">{l('Mısır Kapıda Vize Şartları', 'Egypt Visa on Arrival', 'Ägypten Visum', 'Egipto Visa Llegada', 'Египет по прилету')}</button>
            <span className="text-teal-400">·</span>
            <button type="button" onClick={() => onSelectCountry && onSelectCountry('ID')} className="inline-flex items-center px-1.5 py-1 text-slate-700 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline cursor-pointer font-semibold">{l('Bali Dijital Göçebe Vizesi', 'Bali Digital Nomad Visa', 'Bali Nomad Visum', 'Visa Nómada Bali', 'Виза кочевника Бали')}</button>
            <span className="text-teal-400">·</span>
            <button type="button" onClick={() => setActiveTab && setActiveTab('plan')} className="inline-flex items-center px-1.5 py-1 text-slate-700 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline cursor-pointer font-semibold">{l('Rota Maliyet Hesaplayıcı', 'Route Cost Calculator', 'Routenrechner', 'Calculadora de Rutas', 'Калькулятор маршрута')}</button>
            <span className="text-teal-400">·</span>
            <button type="button" onClick={() => setActiveTab && setActiveTab('consular')} className="inline-flex items-center px-1.5 py-1 text-slate-700 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline cursor-pointer font-semibold">{l('Konsolosluk Kriz Masası', 'Consular Crisis Desk', 'Krisenzentrum', 'Mesa de Crisis', 'Кризисный центр')}</button>
            <span className="text-teal-400">·</span>
            <button type="button" onClick={() => setActiveTab && setActiveTab('nomad')} className="inline-flex items-center px-1.5 py-1 text-slate-700 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline cursor-pointer font-semibold">{l('Tüm Dijital Göçebe Vizeleri', 'All Digital Nomad Visas', 'Alle Nomad-Visa', 'Todas las Visas Nómada', 'Все визы кочевников')}</button>
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. 5-COLUMN CORPORATE FOOTER */}
      {/* ======================================================== */}
      <div className="pt-8 border-t border-teal-500/20 dark:border-[#2DD4BF]/30 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-xs sm:text-sm text-slate-600 dark:text-teal-100">
        {/* Column 1: Destek & Acil Kriz */}
        <div className="space-y-3">
          <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#0D9488] dark:text-[#2DD4BF]" />
            <span>{l('Destek & Kriz Masası', 'Support & Crisis Desk', 'Support & Krisenhilfe', 'Soporte y Crisis', 'Поддержка и кризис')}</span>
          </h3>
          <ul className="space-y-2">
            <li>
              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab('consular')}
                className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline text-left cursor-pointer transition-colors font-medium"
              >
                {l('Konsolosluk Kriz Masası', 'Consular Crisis Desk', 'Konsularische Krisenhilfe', 'Mesa de Crisis Consular', 'Консульский кризисный стол')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenLegalModal('passport_lost')}
                className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline text-left cursor-pointer transition-colors font-medium"
              >
                {l('Pasaport Kayıp / Çalıntı Kılavuzu', 'Lost/Stolen Passport Protocol', 'Pass verloren / gestohlen', 'Pasaporte Perdido o Robado', 'Утеря/кража паспорта')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenLegalModal('crisis')}
                className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline text-left cursor-pointer transition-colors font-medium"
              >
                {l('Acil Durum & Polis Numaraları', 'Emergency & Police Contacts', 'Notruf & Polizeinummern', 'Teléfonos de Emergencia', 'Экстренные службы')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenLegalModal('appeals')}
                className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline text-left cursor-pointer transition-colors font-medium"
              >
                {l('Vize Reddi İtiraz Prosedürü', 'Visa Refusal Appeal Guide', 'Visum-Ablehnung Einspruch', 'Apelación Denegación de Visa', 'Апелляция при отказе')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenLegalModal('standards')}
                className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline text-left cursor-pointer transition-colors font-medium"
              >
                {l('Güvenlik Kaynak Merkezi', 'Security Resource Center', 'Sicherheitszentrum', 'Centro de Recursos de Seguridad', 'Центр безопасности')}
              </button>
            </li>
          </ul>
        </div>

        {/* Column 2: Gezgin Araçları & Keşif */}
        <div className="space-y-3">
          <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#0D9488] dark:text-[#2DD4BF]" />
            <span>{l('Keşfet & Gezgin Araçları', 'Explore & Travel Tools', 'Tools & Entdecken', 'Herramientas de Viaje', 'Инструменты')}</span>
          </h3>
          <ul className="space-y-2">
            <li>
              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab('explore')}
                className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline text-left cursor-pointer transition-colors font-medium"
              >
                {l('199 Ülke Pasaport Güç Endeksi', '199 Passports Power Index', '199 Pässe Macht-Index', 'Índice de Poder de Pasaportes', 'Индекс силы паспортов')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab('plan')}
                className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline text-left cursor-pointer transition-colors font-medium"
              >
                {l('Rota & Bütçe Planlayıcı', 'Route & Budget Planner', 'Routen- & Budgetplaner', 'Planificador de Rutas', 'Планировщик маршрута')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab('nomad')}
                className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline text-left cursor-pointer transition-colors font-medium"
              >
                {l('Dijital Göçebe Vize Veritabanı', 'Digital Nomad Visa Database', 'Digital Nomad Datenbank', 'Base de Visas Nómada', 'База виз кочевников')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab('track')}
                className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline text-left cursor-pointer transition-colors font-medium"
              >
                {l('Schengen 90/180 Gün Takibi', 'Schengen 90/180 Day Tracker', 'Schengen 90/180 Tage Tracker', 'Calculadora Schengen 90/180', 'Калькулятор Шенгена 90/180')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setActiveTab && setActiveTab('profile')}
                className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline text-left cursor-pointer transition-colors font-medium"
              >
                {l('Pasaport Defterim & Seyahatlerim', 'My Passport Wallet & Trips', 'Mein Passetui & Reisen', 'Mi Cartera de Pasaportes', 'Мой паспортный кошелек')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={onOpenPackingList}
                className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline text-left cursor-pointer transition-colors font-medium"
              >
                🎒 {l('Akıllı Bavul Hazırlık Listesi', 'Smart Packing Checklist', 'Smarte Packliste', 'Lista de Equipaje', 'Список вещей')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={onOpenTippingCalc}
                className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline text-left cursor-pointer transition-colors font-medium"
              >
                💵 {l('Akıllı Bahşiş & Masraf Bölüşücü', 'Smart Tipping & Bill Splitter', 'Trinkgeld-Rechner', 'Calculadora de Propinas', 'Расчет чаевых')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={onOpenTimezoneOverlap}
                className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline text-left cursor-pointer transition-colors font-medium"
              >
                ⚡ {l('Zaman Dilimi & Toplantı Çakışması', 'Timezone Meeting Overlap', 'Meeting-Zeitzonen-Planer', 'Superposición Horaria', 'Совпадение времени')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={onOpenGlobalRadar}
                className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline text-left cursor-pointer transition-colors font-medium"
              >
                🛰️ {l('Küresel Seyahat Radarı & Dünya Haritası', 'Global Travel Radar & World Map', 'Reiseradar & Weltkarte', 'Radar de Viajes y Mapa', 'Глобальный Радар и Карта')}
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Şartlar ve Yasal Bildirimler */}
        <div className="space-y-3">
          <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
            <FileCheck2 className="w-4 h-4 text-[#0D9488] dark:text-[#2DD4BF]" />
            <span>{l('Şartlar & Yasal Bilgiler', 'Terms & Legal Compliance', 'Rechtliches & Richtlinien', 'Términos y Legal', 'Условия и правила')}</span>
          </h3>
          <ul className="space-y-2">
            <li>
              <button
                type="button"
                onClick={() => onOpenLegalModal('privacy')}
                className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline text-left cursor-pointer transition-colors font-medium"
              >
                {l('Gizlilik & Çerez Politikası', 'Privacy Policy & Cookies', 'Datenschutz & Cookies', 'Política de Privacidad', 'Конфиденциальность')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenLegalModal('terms')}
                className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline text-left cursor-pointer transition-colors font-medium"
              >
                {l('Hizmet Kullanım Koşulları', 'Terms of Service', 'Nutzungsbedingungen', 'Términos de Servicio', 'Условия использования')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenLegalModal('disclaimer')}
                className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline text-left cursor-pointer transition-colors font-medium"
              >
                {l('Yasal Sorumluluk Reddi (Disclaimer)', 'Legal Disclaimer', 'Rechtlicher Haftungsausschluss', 'Descargo de Responsabilidad', 'Отказ от ответственности')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenLegalModal('kvkk_gdpr')}
                className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline text-left cursor-pointer transition-colors font-medium"
              >
                {l('KVKK & GDPR Aydınlatma Beyanı', 'GDPR / KVKK Disclosure', 'DSGVO Erklärung', 'Declaración RGPD / KVKK', 'Положение о защите данных')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenLegalModal('standards')}
                className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline text-left cursor-pointer transition-colors font-medium"
              >
                {l('Resmi Mevzuat & Kaynak Bildirimi', 'Official Immigration & MFA Source Standards', 'Offizielle Einreisequellen & Standards', 'Estándares de Inmigración Oficial', 'Официальные стандарты иммиграции')}
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Ortaklar & Ekosistem */}
        <div className="space-y-3">
          <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[#0D9488] dark:text-[#2DD4BF]" />
            <span>{l('Ortaklar & Topluluk', 'Partners & Community', 'Partner & Community', 'Socios y Comunidad', 'Партнеры и сообщество')}</span>
          </h3>
          <ul className="space-y-2">
            <li>
              <span className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] cursor-pointer transition-colors font-medium">
                {l('Vize Danışmanlık Acenteleri Masası', 'Visa Agencies Portal', 'Agentur-Portal für Visa', 'Portal de Agencias de Visas', 'Портал визовых агентств')}
              </span>
            </li>
            <li>
              <span className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] cursor-pointer transition-colors font-medium">
                {l('Havayolu & Sınır Entegrasyonu', 'Airline & Border Feeds', 'Airlines & Grenzkontrollen', 'Integración de Aerolíneas', 'Интеграция с авиакомпаниями')}
              </span>
            </li>
            <li>
              <span className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] cursor-pointer transition-colors font-medium">
                {l('Seyahat Sağlık Sigortası Ortakları', 'Travel Health Insurance Partners', 'Reiseversicherungs-Partner', 'Seguro Médico de Viaje', 'Туристическая страховка')}
              </span>
            </li>
            <li>
              <span className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] cursor-pointer transition-colors font-medium">
                {l('Gezgin Katkı & Kural Düzeltme', 'Community Contribution Desk', 'Gezgin-Korrekturportal', 'Reporte de Correcciones', 'Сообщество путешественников')}
              </span>
            </li>
            <li>
              <span className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] cursor-pointer transition-colors font-medium">
                {l('Kurumsal API & Veri Lisansı', 'Enterprise API & Data Licensing', 'Enterprise API & Datenlizenz', 'API Corporativa', 'Корпоративный API')}
              </span>
            </li>
          </ul>
        </div>

        {/* Column 5: Vizamigo Hakkında */}
        <div className="space-y-3">
          <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#0D9488] dark:text-[#2DD4BF]" />
            <span>{l('Vizamigo Hakkında', 'About Vizamigo', 'Über Vizamigo', 'Acerca de Vizamigo', 'О Vizamigo')}</span>
          </h3>
          <ul className="space-y-2">
            <li>
              <button
                type="button"
                onClick={() => onOpenLegalModal('mission')}
                className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline text-left cursor-pointer transition-colors font-medium"
              >
                {l('Vizamigo Misyonu & Hikayesi', 'Our Mission & Story', 'Unsere Mission & Geschichte', 'Nuestra Misión', 'Наша миссия')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenLegalModal('standards')}
                className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline text-left cursor-pointer transition-colors font-medium"
              >
                {l('Veri Doğrulama İlkelerimiz', 'Data Verification Principles', 'Verifizierungsprinzipien', 'Verificación de Datos', 'Принципы проверки данных')}
              </button>
            </li>
            <li>
              <span className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] cursor-pointer transition-colors font-medium">
                {l('Sürdürülebilir Seyahat İlkeleri', 'Sustainable Travel Standards', 'Nachhaltiges Reisen', 'Viajes Sostenibles', 'Устойчивый туризм')}
              </span>
            </li>
            <li>
              <span className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] cursor-pointer transition-colors font-medium">
                {l('Kariyer & Ekip', 'Careers & Team', 'Karriere & Team', 'Carreras y Equipo', 'Карьера')}
              </span>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onOpenLegalModal('press')}
                className="text-slate-600 dark:text-teal-100 hover:text-teal-800 dark:hover:text-[#5EEAD4] hover:underline text-left cursor-pointer transition-colors font-medium"
              >
                {l('Basın Kiti & İletişim', 'Press Center & Contact', 'Pressezentrum & Kontakt', 'Centro de Prensa', 'Пресс-центр')}
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. BOTTOM BAR & TRUST BADGES */}
      {/* ======================================================== */}
      <div className="pt-6 pb-2 border-t border-teal-500/20 dark:border-[#2DD4BF]/30 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
        {/* Currency / Language indicator badge */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-white/10 border border-teal-500/25 dark:border-[#2DD4BF]/40 font-black text-slate-800 dark:text-white shadow-xs">
            <span>🇹🇷</span>
            <span>TRY (₺)</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-white/10 border border-teal-500/25 dark:border-[#2DD4BF]/40 font-bold text-slate-800 dark:text-white shadow-xs">
            <Globe className="w-3.5 h-3.5 text-teal-700 dark:text-[#5EEAD4]" />
            <span className="uppercase">{language}</span>
          </div>
        </div>

        {/* Verification & Trust Standards */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-black text-teal-800 dark:text-[#5EEAD4]">
          <span className="flex items-center gap-1.5" title="Resmi Dışişleri ve Göçmenlik Veri Standartları">
            <FileCheck2 className="w-4 h-4 text-[#0D9488] dark:text-[#2DD4BF]" />
            <span className="text-slate-700 dark:text-teal-100 font-bold">Official Feeds Synced</span>
          </span>
          <span className="text-teal-400">·</span>
          <span className="flex items-center gap-1.5" title="Dışişleri Bakanlıkları Konsolosluk Duyuruları">
            <ShieldCheck className="w-4 h-4 text-[#0D9488] dark:text-[#2DD4BF]" />
            <span className="text-slate-700 dark:text-teal-100 font-bold">MFA Consular Alerts</span>
          </span>
          <span className="text-teal-400">·</span>
          <span className="flex items-center gap-1.5" title="256-Bit SSL Uçtan Uca Güvenli İletişim">
            <Lock className="w-4 h-4 text-[#0D9488] dark:text-[#2DD4BF]" />
            <span className="text-slate-700 dark:text-teal-100 font-bold">256-Bit SSL Secured</span>
          </span>
        </div>
      </div>

      {/* Copyright Disclaimer Notice */}
      <div className="text-center text-xs sm:text-sm text-slate-500 dark:text-teal-100/90 space-y-1.5 pb-2">
        <p className="leading-relaxed max-w-4xl mx-auto">
          {l(
            'Vizamigo, küresel seyahat serbestisi, pasaport endeksleri ve sınır geçiş protokollerinde bağımsız bilgi sağlayıcıdır.',
            'Vizamigo is an independent platform for global travel freedom, passport indices, and consular border protocols.',
            'Vizamigo ist eine unabhängige Plattform für globale Reisefreiheit, Passindizes und Konsularprotokolle.',
            'Vizamigo es una plataforma independiente de libertad de viaje, índices de pasaportes y protocolos consulares.',
            'Vizamigo — независимая платформа о свободе путешествий, паспортах и консульских протоколах.'
          )}
        </p>
        <p className="font-bold text-slate-800 dark:text-white pt-1">
          Telif hakkı © 1996–2026 Vizamigo™. {l('Tüm hakları saklıdır.', 'All rights reserved.', 'Alle Rechte vorbehalten.', 'Todos los derechos reservados.', 'Все права защищены.')}
        </p>
      </div>
    </footer>
  );
};
