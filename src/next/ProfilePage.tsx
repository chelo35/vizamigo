import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from '../data/i18n';
import { useAuth } from '../context/AuthContext';
import { Icon } from './Icon';
import { Btn, Card, Chip, Chips, Empty, Field, Flag, LinkBtn, List, Page, Row, Stat, Tile, TileGrid, OpenRequest } from './ui';
import { PassportCover } from '../components/redesign/PassportCover';
import { getCountryName, AFFILIATE_PARTNERS, getLocalizedPartner, D } from '../data/passportData';
import { PartnerLogo } from './PartnerLogo';
import { VISA_CHANGE_ALERTS } from '../data/changeLog';
import { getPassportItems } from '../utils/calculator';
import { exportAppData, importAppData, clearAllAppData, loadStoredRouteStops } from '../utils/storage';

interface Props {
  passport: string;
  secondary: string;
  openRequest: OpenRequest;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenPassport: () => void;
  onSetSecondary: (c: string) => void;
  onOpenInfo: (p: string) => void;
  onReport: () => void;
  onDataChanged: () => void;
  onOpenCountry: (c: string) => void;
}

const AccountView: React.FC = () => {
  const { l } = useI18n();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  if (!isAuthenticated || !user)
    return (
      <Card tone="sea" icon="user" title={l('Gezgin kulübüne katıl', 'Join the traveller club', 'Dem Reiseclub beitreten', 'Únete al club', 'Вступите в клуб')}>
        <p>{l('Hesap açarsan pasaportların, rotan ve belgelerin cihazlar arasında seninle gelir. Ücretsiz.', 'With an account your passports, route and documents follow you across devices. Free.', 'Mit Konto auf allen Geräten. Kostenlos.', 'Con cuenta, todo en tus dispositivos. Gratis.', 'С аккаунтом — на всех устройствах. Бесплатно.')}</p>
        <div className="vz-actions">
          <Btn onClick={() => openAuthModal('register')}>{l('Ücretsiz kaydol', 'Sign up free', 'Kostenlos registrieren', 'Regístrate gratis', 'Регистрация')}</Btn>
          <Btn variant="soft" onClick={() => openAuthModal('login')}>{l('Giriş yap', 'Sign in', 'Anmelden', 'Entrar', 'Войти')}</Btn>
        </div>
      </Card>
    );
  return (
    <div className="vz-stack">
      <Card icon="user" title={user.name} eyebrow={user.email} actions={user.isPro ? <span className="vz-badge tone-sun">PRO</span> : undefined}>
        <p className="vz-muted">{l('Giriş yöntemi', 'Signed in with', 'Angemeldet mit', 'Acceso con', 'Вход через')}: {(user.providers?.length ? user.providers : [user.provider]).map((p) => (p === 'google' ? 'Google' : p === 'facebook' ? 'Facebook' : l('E-posta', 'Email', 'E-Mail', 'Correo', 'Эл. почта'))).join(' + ')}</p>
        <Btn variant="ghost" icon="back" onClick={logout} style={{ alignSelf: 'flex-start' }}>{l('Çıkış yap', 'Sign out', 'Abmelden', 'Cerrar sesión', 'Выйти')}</Btn>
      </Card>
    </div>
  );
};

const PassportsView: React.FC<{ passport: string; secondary: string; onOpenPassport: () => void; onSetSecondary: (c: string) => void }> = ({ passport, secondary, onOpenPassport, onSetSecondary }) => {
  const { l, language } = useI18n();
  const opts = useMemo(() => Object.keys(D).map((c) => ({ c, n: getCountryName(c, language) })).sort((a, b) => a.n.localeCompare(b.n, language)), [language]);
  const count = (c: string) => getPassportItems(c).filter((it) => it.cat === 'free' || it.id).length;
  return (
    <div className="vz-grid two">
      <Card eyebrow={l('Birincil pasaport', 'Main passport', 'Hauptpass', 'Pasaporte principal', 'Основной')} title={getCountryName(passport, language)}>
        <div className="vz-row-flex" style={{ gap: 18, alignItems: 'center' }}>
          <PassportCover code={passport} size="sm" onClick={onOpenPassport} />
          <div className="vz-stack" style={{ gap: 8 }}>
            <Stat value={count(passport)} label={l('Vizesiz / kimlikle', 'Visa-free / ID', 'Visumfrei', 'Sin visado', 'Без визы')} tone="ok" />
            <Btn variant="soft" small onClick={onOpenPassport}>{l('Değiştir', 'Change', 'Ändern', 'Cambiar', 'Сменить')}</Btn>
          </div>
        </div>
      </Card>
      <Card eyebrow={l('İkinci pasaport', 'Second passport', 'Zweitpass', 'Segundo pasaporte', 'Второй')} title={secondary && secondary !== passport ? getCountryName(secondary, language) : l('Eklenmedi', 'Not added', 'Nicht hinzugefügt', 'No añadido', 'Не добавлен')}>
        <p className="vz-muted">{l('Çifte vatandaşlığın varsa ekle; karşılaştırma ve öneriler ikisini birden hesaba katar.', 'If you hold two citizenships, add it; comparisons use both.', 'Bei doppelter Staatsbürgerschaft hinzufügen.', 'Si tienes doble nacionalidad, añádelo.', 'Если есть второе гражданство — добавьте.')}</p>
        <Field label={l('İkinci pasaport', 'Second passport', 'Zweitpass', 'Segundo pasaporte', 'Второй паспорт')} htmlFor="vz-sec">
          <select id="vz-sec" className="vz-select" value={secondary && secondary !== passport ? secondary : ''} onChange={(e) => onSetSecondary(e.target.value)}>
            <option value="">—</option>
            {opts.filter((o) => o.c !== passport).map((o) => <option key={o.c} value={o.c}>{o.n}</option>)}
          </select>
        </Field>
        {secondary && secondary !== passport && <Stat value={count(secondary)} label={l('Vizesiz / kimlikle', 'Visa-free / ID', 'Visumfrei', 'Sin visado', 'Без визы')} tone="ok" />}
      </Card>
    </div>
  );
};

const FOLLOW_KEY = 'vz_follow_v1';
const AlertsView: React.FC<{ passport: string; onOpenCountry: (c: string) => void }> = ({ passport, onOpenCountry }) => {
  const { l, language } = useI18n();
  const [follow, setFollow] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(FOLLOW_KEY) || '[]');
    } catch {
      return [];
    }
  });
  const save = (n: string[]) => {
    setFollow(n);
    try {
      localStorage.setItem(FOLLOW_KEY, JSON.stringify(n));
    } catch {}
  };
  const toggle = (c: string) => save(follow.includes(c) ? follow.filter((x) => x !== c) : [...follow, c]);
  const suggestions = Array.from(new Set(VISA_CHANGE_ALERTS.map((a) => a.countryCode))).concat(['TH', 'JP', 'GB', 'US', 'AE']).filter((c, i, a) => a.indexOf(c) === i && c !== passport).slice(0, 14);
  const hits = VISA_CHANGE_ALERTS.filter((a) => follow.includes(a.countryCode) && (a.impactPassport.length === 0 || a.impactPassport.includes(passport)));
  return (
    <div className="vz-stack">
      <p className="vz-muted">{l('Takip ettiğin ülkelerde pasaportunu etkileyen bir kural değişirse burada görünür.', 'When a rule changes for your passport in a country you follow, it shows up here.', 'Änderungen in gefolgten Ländern erscheinen hier.', 'Los cambios en países seguidos aparecen aquí.', 'Изменения в отслеживаемых странах появятся здесь.')}</p>
      <Chips>
        {suggestions.map((c) => <Chip key={c} on={follow.includes(c)} onClick={() => toggle(c)} icon={follow.includes(c) ? 'check' : 'plus'}>{getCountryName(c, language)}</Chip>)}
      </Chips>
      {follow.length === 0 ? (
        <Empty icon="bell" title={l('Henüz ülke takip etmiyorsun', 'You’re not following any country yet', 'Noch keinen Ländern gefolgt', 'Aún no sigues países', 'Пока нет стран')} />
      ) : hits.length === 0 ? (
        <Card tone="ok" icon="check" title={l('Takip ettiklerinde yeni değişiklik yok', 'No new changes in countries you follow', 'Keine neuen Änderungen', 'Sin cambios nuevos', 'Нет изменений')}><p className="vz-muted">{follow.map((c) => getCountryName(c, language)).join(', ')}</p></Card>
      ) : (
        <List>
          {hits.map((a) => <Row key={a.id} lead={<Flag code={a.countryCode} />} title={language === 'tr' ? a.title : a.titleEn || a.title} sub={language === 'tr' ? a.effectiveDate : a.effectiveDateEn || a.effectiveDate} onClick={() => onOpenCountry(a.countryCode)} />)}
        </List>
      )}
    </div>
  );
};

const MembershipView: React.FC = () => {
  const { l } = useI18n();
  const { user, openAuthModal } = useAuth();
  const rows: [string, boolean, boolean][] = [
    [l('199 ülke vize kuralları', 'Visa rules for 199 countries', 'Visaregeln für 199 Länder', 'Visados de 199 países', 'Визы 199 стран'), true, true],
    [l('Rota planlayıcı ve gün sayacı', 'Route planner and day counter', 'Routenplaner & Tagezähler', 'Planificador y contador', 'Маршрут и счётчик'), true, true],
    [l('Cüzdan ve uyarılar', 'Wallet and alerts', 'Wallet & Hinweise', 'Cartera y avisos', 'Кошелёк и уведомления'), true, true],
    [l('Cihazlar arası senkron', 'Sync across devices', 'Geräte-Sync', 'Sincronización', 'Синхронизация'), false, true],
    [l('Kural değişikliği e-posta bildirimi', 'Email alerts for rule changes', 'E-Mail-Hinweise', 'Avisos por email', 'Уведомления на email'), false, true],
    [l('Sınırsız asistan sorusu', 'Unlimited assistant questions', 'Unbegrenzte Assistenten-Fragen', 'Preguntas ilimitadas', 'Безлимит вопросов'), false, true],
    [l('Çevrimdışı ülke dosyaları', 'Offline country files', 'Offline-Länderdateien', 'Fichas sin conexión', 'Офлайн-досье'), false, true]
  ];
  return (
    <div className="vz-stack">
      <div className="vz-list">
        <div className="vz-row" style={{ fontWeight: 700 }}>
          <span className="vz-row-b">{l('Özellik', 'Feature', 'Funktion', 'Función', 'Функция')}</span>
          <span className="vz-row-r" style={{ width: 130, justifyContent: 'space-between' }}><span>{l('Ücretsiz', 'Free', 'Gratis', 'Gratis', 'Бесплатно')}</span><span>PRO</span></span>
        </div>
        {rows.map(([t, f, p]) => (
          <div className="vz-row" key={t}>
            <span className="vz-row-b"><span className="vz-row-t" style={{ fontWeight: 500 }}>{t}</span></span>
            <span className="vz-row-r" style={{ width: 130, justifyContent: 'space-between', paddingInline: 12 }}>
              <span style={{ color: f ? 'var(--vz-ok)' : 'var(--rd-muted)' }}><Icon name={f ? 'check' : 'minus'} size={18} duo={false} /></span>
              <span style={{ color: p ? 'var(--vz-ok)' : 'var(--rd-muted)' }}><Icon name={p ? 'check' : 'minus'} size={18} duo={false} /></span>
            </span>
          </div>
        ))}
      </div>
      {!user?.isPro && <Btn onClick={() => openAuthModal('register')} style={{ alignSelf: 'flex-start' }}>{l('PRO’yu yakında haber ver', 'Notify me about PRO', 'Über PRO informieren', 'Avísame de PRO', 'Сообщить о PRO')}</Btn>}
    </div>
  );
};

const DealsView: React.FC = () => {
  const { language, l } = useI18n();
  return (
    <div className="vz-stack">
      <div className="vz-grid">
        {AFFILIATE_PARTNERS.map((a) => {
          const x = getLocalizedPartner(a, language);
          return (
            <Card key={a.url + a.title} eyebrow={x.category} title={x.title} lead={<PartnerLogo url={a.url} size={40} />} actions={<span className="vz-badge tone-sea">{x.badge}</span>}>
              <p className="vz-muted">{x.desc}</p>
              <LinkBtn href={a.url} small variant="primary">{x.linkText}</LinkBtn>
            </Card>
          );
        })}
      </div>
      <p className="vz-muted" style={{ fontSize: 12 }}>{l('Bunlar iş ortağı bağlantılarıdır; fiyat senin için değişmez.', 'These are partner links; your price stays the same.', 'Partnerlinks; der Preis bleibt gleich.', 'Enlaces de socios; el precio no cambia.', 'Партнёрские ссылки; цена та же.')}</p>
    </div>
  );
};

const SettingsView: React.FC<{ isDark: boolean; onToggleTheme: () => void; onDataChanged: () => void }> = ({ isDark, onToggleTheme, onDataChanged }) => {
  const { l, language, setLanguage, languages } = useI18n();
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState('');
  const [confirmClear, setConfirmClear] = useState(false);
  const doExport = () => {
    try {
      const blob = new Blob([JSON.stringify(exportAppData(), null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `vizamigo-yedek-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      setMsg(l('Yedek dosyası indirildi.', 'Backup downloaded.', 'Backup heruntergeladen.', 'Copia descargada.', 'Копия скачана.'));
    } catch {}
  };
  const doImport = (f?: File) => {
    if (!f) return;
    const rd = new FileReader();
    rd.onload = () => {
      try {
        const ok = importAppData(JSON.parse(String(rd.result)));
        setMsg(ok ? l('Yedek geri yüklendi.', 'Backup restored.', 'Backup wiederhergestellt.', 'Copia restaurada.', 'Копия восстановлена.') : l('Bu dosya bir Vizamigo yedeği değil.', 'That file is not a Vizamigo backup.', 'Keine Vizamigo-Sicherung.', 'No es una copia de Vizamigo.', 'Это не копия Vizamigo.'));
        if (ok) onDataChanged();
      } catch {
        setMsg(l('Dosya okunamadı.', 'Could not read the file.', 'Datei nicht lesbar.', 'No se pudo leer.', 'Не удалось прочитать.'));
      }
    };
    rd.readAsText(f);
  };
  return (
    <div className="vz-stack">
      <Card title={l('Dil', 'Language', 'Sprache', 'Idioma', 'Язык')} icon="lang">
        <Chips>{languages.map((x) => <Chip key={x.code} on={language === x.code} onClick={() => setLanguage(x.code)}>{x.nativeName}</Chip>)}</Chips>
      </Card>
      <Card title={l('Tema', 'Theme', 'Design', 'Tema', 'Тема')} icon={isDark ? 'moon' : 'sun'}>
        <Chips>
          <Chip on={!isDark} onClick={() => isDark && onToggleTheme()} icon="sun">{l('Açık', 'Light', 'Hell', 'Claro', 'Светлая')}</Chip>
          <Chip on={isDark} onClick={() => !isDark && onToggleTheme()} icon="moon">{l('Koyu', 'Dark', 'Dunkel', 'Oscuro', 'Тёмная')}</Chip>
        </Chips>
      </Card>
      <Card title={l('Verilerin', 'Your data', 'Deine Daten', 'Tus datos', 'Ваши данные')} icon="lock">
        <p className="vz-muted">{l('Pasaport, rota, yolculuk ve belgelerin yalnızca bu cihazda. Yedek alıp başka cihaza taşıyabilirsin.', 'Passports, routes, trips and documents live on this device. Back them up to move them.', 'Alles nur auf diesem Gerät; Backup zum Umziehen.', 'Todo en este dispositivo; haz copia para moverlo.', 'Всё на этом устройстве; сделайте копию.')}</p>
        <div className="vz-actions">
          <Btn variant="soft" icon="download" onClick={doExport}>{l('Yedek indir', 'Download backup', 'Backup laden', 'Descargar copia', 'Скачать копию')}</Btn>
          <Btn variant="soft" icon="upload" onClick={() => fileRef.current?.click()}>{l('Yedekten geri yükle', 'Restore backup', 'Wiederherstellen', 'Restaurar', 'Восстановить')}</Btn>
          <input ref={fileRef} type="file" accept="application/json" hidden onChange={(e) => doImport(e.target.files?.[0])} />
          {!confirmClear ? (
            <Btn variant="ghost" icon="trash" onClick={() => setConfirmClear(true)}>{l('Her şeyi sil', 'Erase everything', 'Alles löschen', 'Borrar todo', 'Стереть всё')}</Btn>
          ) : (
            <span className="vz-row-flex">
              <span className="vz-muted" style={{ fontSize: 13 }}>{l('Emin misin? Geri alınamaz.', 'Sure? This can’t be undone.', 'Sicher? Nicht umkehrbar.', '¿Seguro? No se puede deshacer.', 'Уверены? Необратимо.')}</span>
              <Btn variant="primary" small onClick={() => { clearAllAppData(); setConfirmClear(false); setMsg(l('Bütün veriler silindi.', 'All data erased.', 'Alle Daten gelöscht.', 'Datos borrados.', 'Данные удалены.')); onDataChanged(); }}>{l('Evet, sil', 'Yes, erase', 'Ja, löschen', 'Sí, borrar', 'Да, стереть')}</Btn>
              <Btn variant="ghost" small onClick={() => setConfirmClear(false)}>{l('Vazgeç', 'Cancel', 'Abbrechen', 'Cancelar', 'Отмена')}</Btn>
            </span>
          )}
        </div>
        {msg && <div className="vz-note"><Icon name="check" size={18} duo={false} />{msg}</div>}
      </Card>
    </div>
  );
};

export const InfoList: React.FC<{ onOpenInfo: (p: string) => void }> = ({ onOpenInfo }) => {
  const { l } = useI18n();
  const groups: { h: string; icon: string; items: [string, string][] }[] = [
    { h: l('Yasal', 'Legal', 'Rechtliches', 'Legal', 'Правовое'), icon: 'scale', items: [['terms', l('Kullanım koşulları', 'Terms of use', 'Nutzungsbedingungen', 'Términos', 'Условия')], ['privacy', l('Gizlilik', 'Privacy', 'Datenschutz', 'Privacidad', 'Конфиденциальность')], ['disclaimer', l('Sorumluluk reddi', 'Disclaimer', 'Haftungsausschluss', 'Descargo', 'Отказ')], ['kvkk_gdpr', 'KVKK & GDPR'], ['standards', l('Kaynak standartlarımız', 'Our source standards', 'Quellenstandards', 'Estándares', 'Стандарты')], ['attributions', l('Görsel lisansları', 'Photo credits', 'Bildnachweise', 'Créditos', 'Фото')]] },
    { h: l('Destek', 'Support', 'Hilfe', 'Ayuda', 'Помощь'), icon: 'sos', items: [['appeals', l('Vize reddine itiraz', 'Visa appeals', 'Visum-Widerspruch', 'Apelación', 'Апелляция')], ['passport_lost', l('Pasaport kaybı', 'Lost passport', 'Passverlust', 'Pasaporte perdido', 'Утеря паспорта')], ['crisis', l('Kriz masası', 'Crisis desk', 'Krisenstab', 'Mesa de crisis', 'Кризисный центр')], ['transit', l('Transit kuralları', 'Transit rules', 'Transitregeln', 'Tránsito', 'Транзит')]] },
    { h: l('İş ortakları', 'Partners', 'Partner', 'Socios', 'Партнёры'), icon: 'handshake', items: [['partners', l('Acente masası', 'Agencies', 'Agenturen', 'Agencias', 'Агентства')], ['airlines', l('Havayolları', 'Airlines', 'Airlines', 'Aerolíneas', 'Авиакомпании')], ['insurance', l('Sağlık sigortası', 'Health insurance', 'Krankenversicherung', 'Seguro médico', 'Страхование')], ['community', l('Gezgin katkısı', 'Community', 'Community', 'Comunidad', 'Сообщество')], ['api', l('Kurumsal API', 'Business API', 'Business-API', 'API', 'API')]] },
    { h: l('Hakkımızda', 'About', 'Über uns', 'Sobre nosotros', 'О нас'), icon: 'info', items: [['mission', l('Misyonumuz', 'Our mission', 'Mission', 'Misión', 'Миссия')], ['sustainability', l('Sürdürülebilir seyahat', 'Sustainable travel', 'Nachhaltig reisen', 'Viaje sostenible', 'Экология')], ['careers', l('Kariyer', 'Careers', 'Karriere', 'Empleo', 'Карьера')], ['press', l('Basın ve iletişim', 'Press & contact', 'Presse & Kontakt', 'Prensa y contacto', 'Пресса')], ['backup', l('Veri yedeği', 'Data backup', 'Datensicherung', 'Copia de datos', 'Резервная копия')]] }
  ];
  return (
    <div className="vz-grid two">
      {groups.map((g) => (
        <Card key={g.h} title={g.h} icon={g.icon}>
          <List>{g.items.map(([id, t]) => <Row key={id} title={t} onClick={() => onOpenInfo(id)} />)}</List>
        </Card>
      ))}
    </div>
  );
};

export const ProfilePage: React.FC<Props> = (p) => {
  const { l, language } = useI18n();
  const { user, isAuthenticated } = useAuth();
  const [req, setReq] = useState<OpenRequest>(null);
  useEffect(() => {
    if (p.openRequest) setReq(p.openRequest);
  }, [p.openRequest?.nonce]); // eslint-disable-line react-hooks/exhaustive-deps

  const tiles: Tile[] = [
    { id: 'account', icon: 'user', title: l('Hesabım', 'My account', 'Mein Konto', 'Mi cuenta', 'Аккаунт'), desc: isAuthenticated ? user?.name || '' : l('Giriş yap ya da kaydol', 'Sign in or sign up', 'Anmelden', 'Entrar o registrarse', 'Войти'), render: () => <AccountView /> },
    { id: 'passports', icon: 'passport', title: l('Pasaportlarım', 'My passports', 'Meine Pässe', 'Mis pasaportes', 'Паспорта'), desc: l('Birincil ve ikinci pasaport', 'Main and second passport', 'Haupt- und Zweitpass', 'Principal y segundo', 'Основной и второй'), render: () => <PassportsView passport={p.passport} secondary={p.secondary} onOpenPassport={p.onOpenPassport} onSetSecondary={p.onSetSecondary} /> },
    { id: 'alerts', icon: 'bell', title: l('Uyarılar', 'Alerts', 'Hinweise', 'Avisos', 'Уведомления'), desc: l('Takip ettiğin ülkeler', 'Countries you follow', 'Gefolgte Länder', 'Países que sigues', 'Отслеживаемые страны'), render: () => <AlertsView passport={p.passport} onOpenCountry={p.onOpenCountry} /> },
    { id: 'pro', icon: 'star', title: l('Üyelik', 'Membership', 'Mitgliedschaft', 'Membresía', 'Подписка'), desc: l('Ücretsiz ve PRO', 'Free and PRO', 'Gratis und PRO', 'Gratis y PRO', 'Бесплатно и PRO'), badge: user?.isPro ? 'PRO' : undefined, render: () => <MembershipView /> },
    { id: 'deals', icon: 'handshake', title: l('Fırsatlar', 'Deals', 'Angebote', 'Ofertas', 'Предложения'), desc: l('Sigorta, eSIM, otel', 'Insurance, eSIM, hotels', 'Versicherung, eSIM', 'Seguro, eSIM', 'Страховка, eSIM'), render: () => <DealsView /> },
    { id: 'settings', icon: 'gear', title: l('Dil, tema & yedek', 'Language, theme & backup', 'Sprache, Design, Backup', 'Idioma, tema y copia', 'Язык, тема, копия'), desc: l('Ayarlar ve verilerin', 'Settings and your data', 'Einstellungen', 'Ajustes y datos', 'Настройки'), render: () => <SettingsView isDark={p.isDark} onToggleTheme={p.onToggleTheme} onDataChanged={p.onDataChanged} /> },
    { id: 'info', icon: 'info', title: l('Bilgi merkezi', 'Help centre', 'Hilfezentrum', 'Centro de ayuda', 'Справка'), desc: l('Yasal, destek, hakkımızda', 'Legal, support, about', 'Recht, Hilfe, Über uns', 'Legal, ayuda', 'Право, помощь'), render: () => <InfoList onOpenInfo={p.onOpenInfo} /> },
    { id: 'report', icon: 'flag', title: l('Hata bildir', 'Report an error', 'Fehler melden', 'Reportar error', 'Сообщить'), desc: l('Yanlış bilgi gördüm', 'I found wrong info', 'Falsche Info gefunden', 'Vi un error', 'Нашёл ошибку'), onOpen: p.onReport }
  ];

  const mine = useMemo(() => {
    let stops = 0, docs = 0, nextDoc: number | null = null;
    try {
      stops = loadStoredRouteStops().length;
      const d = JSON.parse(localStorage.getItem('vz_wallet_docs_v1') || '[]') as { expiry: string }[];
      docs = d.length;
      const today = Date.parse(new Date().toISOString().slice(0, 10));
      const future = d.map((x) => Math.round((Date.parse(x.expiry) - today) / 86400000)).filter((n) => n >= 0).sort((a, b) => a - b);
      if (future.length) nextDoc = future[0];
    } catch {}
    return { stops, docs, nextDoc };
  }, []);

  return (
    <Page
      eyebrow={l('Profil', 'Profile', 'Profil', 'Perfil', 'Профиль')}
      title={isAuthenticated && user ? l(`Merhaba ${user.name.split(' ')[0]}`, `Hi ${user.name.split(' ')[0]}`, `Hallo ${user.name.split(' ')[0]}`, `Hola ${user.name.split(' ')[0]}`, `Привет, ${user.name.split(' ')[0]}`) : l('Senin Vizamigo’n', 'Your Vizamigo', 'Dein Vizamigo', 'Tu Vizamigo', 'Ваш Vizamigo')}
      sub={l('Hesap, pasaportlar, ayarlar ve yardım.', 'Account, passports, settings and help.', 'Konto, Pässe, Einstellungen, Hilfe.', 'Cuenta, pasaportes, ajustes y ayuda.', 'Аккаунт, паспорта, настройки, помощь.')}
      words={['Türkiye', 'Canada', 'Australia', 'Morocco']}
      summary={
        <div className="vz-cfacts">
          <Stat value={<span className="vz-row-flex" style={{ gap: 8 }}><Flag code={p.passport} size="sm" />{p.passport}</span>} label={l('Pasaportun', 'Your passport', 'Dein Pass', 'Tu pasaporte', 'Паспорт')} icon="passport" />
          <Stat value={getPassportItems(p.passport).filter((it) => it.cat === 'free' || it.id).length} label={l('Vizesiz ülke', 'Visa-free countries', 'Visumfreie Länder', 'Sin visado', 'Без визы')} icon="globe" tone="ok" />
          <Stat value={mine.stops} label={l('Rotandaki durak', 'Stops on your route', 'Stopps in deiner Route', 'Paradas en tu ruta', 'Остановок в маршруте')} icon="route" />
          <Stat
            value={mine.nextDoc === null ? mine.docs : `${mine.nextDoc} ${l('gün', 'days', 'Tage', 'días', 'дн.')}`}
            label={mine.nextDoc === null ? l('Cüzdandaki belge', 'Documents in wallet', 'Dokumente', 'Documentos', 'Документы') : l('En yakın belge bitişi', 'Next document expiry', 'Nächster Ablauf', 'Próxima caducidad', 'Ближайший срок')}
            icon="wallet"
            tone={mine.nextDoc !== null && mine.nextDoc < 180 ? 'warn' : 'sun'}
          />
        </div>
      }
    >
      <TileGrid tiles={tiles} openRequest={req} label={l('Profil', 'Profile', 'Profil', 'Perfil', 'Профиль')} />
    </Page>
  );
};
