import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from '../data/i18n';
import { useAuth } from '../context/AuthContext';
import { useModalA11y } from '../utils/useModalA11y';
import { Icon, IconName } from './Icon';
import { Btn, Card, Chip, Chips, Empty, Field, Flag, LinkBtn, List, Row, SearchInput, Segmented } from './ui';
import { D, getCountryName } from '../data/passportData';
import { getPassportItems } from '../utils/calculator';
import { GEO_DATA } from '../data/geoData';
import { saveUserReport, loadUserReports, deleteUserReport } from '../components/ReportChangeModal';
import { getSupabase, GOOGLE_ENABLED } from '../context/AuthContext';
import { AUDIT_DATABASE } from '../components/RegulationAuditModal';
import { LegalInfoModal } from '../components/LegalInfoModal';
import { processAssistantQuery, AssistantMessage, AssistantActionPill, isSpeechRecognitionSupported, startVoiceRecognition, stopVoiceRecognition } from '../services/aiAssistantEngine';

const norm = (s: string) => s.toLocaleLowerCase('tr').normalize('NFD').replace(/[̀-ͯ]/g, '');

/* ------------------------------------------------------------------ */
/* Ortak alt sayfa: mobilde aşağıdan kayar, masaüstünde ortada panel   */
/* ------------------------------------------------------------------ */
export const Sheet: React.FC<{ open: boolean; onClose: () => void; title: string; icon?: IconName; wide?: boolean; children: React.ReactNode }> = ({ open, onClose, title, icon, wide, children }) => {
  const { l } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  useModalA11y({ isOpen: open, onClose, modalRef: ref });
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
  if (!open) return null;
  return (
    <div className="vz-sheet-wrap vz-app-portal">
      <div className="vz-sheet-bg" onClick={onClose} />
      <div ref={ref} className={`vz-sheet${wide ? ' wide' : ''}`} role="dialog" aria-modal="true" aria-label={title}>
        <header className="vz-sheet-h">
          <span className="vz-sheet-grab" aria-hidden="true" />
          {icon && <span className="vz-ic sm"><Icon name={icon} size={18} /></span>}
          <h2>{title}</h2>
          <button type="button" className="vz-iconbtn" onClick={onClose} aria-label={l('Kapat', 'Close', 'Schließen', 'Cerrar', 'Закрыть')}>
            <Icon name="close" size={18} duo={false} />
          </button>
        </header>
        <div className="vz-sheet-b">{children}</div>
      </div>
    </div>
  );
};

/* ---------------- Pasaport seç ---------------- */
const POPULAR = ['TR', 'DE', 'GB', 'US', 'NL', 'FR', 'AZ', 'RU', 'UA', 'IR', 'SA', 'AE', 'IN', 'PK', 'EG'];
export const PassportSheet: React.FC<{ open: boolean; onClose: () => void; selected: string; onSelect: (c: string) => void }> = ({ open, onClose, selected, onSelect }) => {
  const { l, language } = useI18n();
  const [q, setQ] = useState('');
  const all = useMemo(() => Object.keys(D).map((c) => ({ c, n: getCountryName(c, language), en: getCountryName(c, 'en') })).sort((a, b) => a.n.localeCompare(b.n, language)), [language]);
  const counts = useMemo(() => new Map(all.map((x) => [x.c, getPassportItems(x.c).filter((it) => it.cat === 'free' || it.id).length])), [all]);
  const nq = norm(q.trim());
  const list = all.filter((x) => !nq || norm(x.n).includes(nq) || norm(x.en).includes(nq) || x.c.toLowerCase() === nq);
  const pick = (c: string) => {
    onSelect(c);
    onClose();
  };
  return (
    <Sheet open={open} onClose={onClose} title={l('Pasaportunu seç', 'Choose your passport', 'Pass wählen', 'Elige tu pasaporte', 'Выберите паспорт')} icon="passport">
      <SearchInput id="vz-pp-q" value={q} onChange={setQ} placeholder={l('Ülke adı yaz…', 'Type a country…', 'Land eingeben…', 'Escribe un país…', 'Введите страну…')} autoFocus />
      {!nq && (
        <Chips>
          {POPULAR.filter((c) => D[c]).map((c) => (
            <Chip key={c} on={c === selected} onClick={() => pick(c)}>{getCountryName(c, language)}</Chip>
          ))}
        </Chips>
      )}
      <List>
        {list.map((x) => (
          <Row
            key={x.c}
            lead={<Flag code={x.c} />}
            title={x.n}
            sub={l(`${counts.get(x.c)} ülkeye vizesiz / kimlikle`, `Visa-free / ID to ${counts.get(x.c)} countries`, `${counts.get(x.c)} Länder visumfrei`, `${counts.get(x.c)} países sin visado`, `${counts.get(x.c)} стран без визы`)}
            right={x.c === selected ? <span className="vz-badge tone-ok"><Icon name="check" size={14} duo={false} />{l('Seçili', 'Selected', 'Gewählt', 'Elegido', 'Выбран')}</span> : undefined}
            onClick={() => pick(x.c)}
          />
        ))}
      </List>
      {list.length === 0 && <Empty icon="search" title={l('Bulunamadı', 'Not found', 'Nicht gefunden', 'No encontrado', 'Не найдено')} />}
    </Sheet>
  );
};

/* ---------------- Giriş / kayıt ---------------- */
export const AuthSheet: React.FC = () => {
  const { l } = useI18n();
  const { isAuthModalOpen, closeAuthModal, authModalTab, setAuthModalTab, loginWithGoogle, loginWithEmail, registerWithEmail, resetPassword, setNewPassword, recoveryMode, authReady } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [info, setInfo] = useState('');
  const [busy, setBusy] = useState(false);
  const [forgot, setForgot] = useState(false);
  const isReg = authModalTab === 'register';
  const run = async (fn: () => Promise<{ success: boolean; error?: string; info?: string }>) => {
    setBusy(true);
    setErr('');
    setInfo('');
    try {
      const r = await fn();
      if (!r.success) setErr(r.error || l('Bir şeyler ters gitti, tekrar dene.', 'Something went wrong, try again.', 'Fehler, bitte erneut versuchen.', 'Algo falló, inténtalo de nuevo.', 'Ошибка, попробуйте снова.'));
      else if (r.info) setInfo(r.info);
    } finally {
      setBusy(false);
    }
  };
  const msgs = (
    <>
      {err && <div className="vz-note" style={{ color: 'var(--vz-warn)', borderColor: 'var(--vz-warn)' }}><Icon name="alert" size={18} duo={false} /><span>{err}</span></div>}
      {info && <div className="vz-note" style={{ borderColor: 'var(--vz-ok)' }}><Icon name="check" size={18} duo={false} /><span>{info}</span></div>}
    </>
  );
  // şifre sıfırlama bağlantısından gelindi: yeni şifre
  if (recoveryMode) {
    return (
      <Sheet open={isAuthModalOpen} onClose={closeAuthModal} title={l('Yeni şifre belirle', 'Set a new password', 'Neues Passwort', 'Nueva contraseña', 'Новый пароль')} icon="lock">
        <form className="vz-stack" style={{ gap: 12 }} onSubmit={(e) => { e.preventDefault(); run(() => setNewPassword(pw)); }}>
          <Field label={l('Yeni şifre', 'New password', 'Neues Passwort', 'Nueva contraseña', 'Новый пароль')} htmlFor="vz-au-np" hint={l('En az 6 karakter', 'At least 6 characters', 'Mind. 6 Zeichen', 'Mín. 6 caracteres', 'Мин. 6 символов')}><input id="vz-au-np" type="password" className="vz-input" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="new-password" minLength={6} required /></Field>
          {msgs}
          <Btn type="submit" block disabled={busy}>{l('Kaydet', 'Save', 'Speichern', 'Guardar', 'Сохранить')}</Btn>
        </form>
      </Sheet>
    );
  }
  return (
    <Sheet open={isAuthModalOpen} onClose={closeAuthModal} title={forgot ? l('Şifremi unuttum', 'Forgot password', 'Passwort vergessen', 'Olvidé mi contraseña', 'Забыли пароль') : isReg ? l('Ücretsiz hesap aç', 'Create a free account', 'Kostenloses Konto', 'Crear cuenta gratis', 'Создать аккаунт') : l('Giriş yap', 'Sign in', 'Anmelden', 'Iniciar sesión', 'Войти')} icon="user">
      {!authReady && <div className="vz-note"><Icon name="info" size={18} duo={false} /><span>{l('Hesaplar çok yakında açılıyor. Uygulamanın tamamını hesapsız kullanabilirsin; verilerin bu cihazda saklanır.', 'Accounts are coming soon. Everything works without one; your data stays on this device.', 'Konten kommen bald.', 'Las cuentas llegan pronto.', 'Аккаунты скоро.')}</span></div>}
      {forgot ? (
        <form className="vz-stack" style={{ gap: 12 }} onSubmit={(e) => { e.preventDefault(); run(() => resetPassword(email)); }}>
          <p className="vz-muted">{l('Hesabının e-postasını yaz; şifreni yenilemen için bir bağlantı gönderelim.', 'Enter your account email and we will send a reset link.', 'E-Mail eingeben, wir senden einen Link.', 'Escribe tu email y te enviamos un enlace.', 'Введите email, пришлём ссылку.')}</p>
          <Field label={l('E-posta', 'Email', 'E-Mail', 'Email', 'Email')} htmlFor="vz-au-fe"><input id="vz-au-fe" type="email" className="vz-input" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required /></Field>
          {msgs}
          <Btn type="submit" block disabled={busy || !authReady}>{l('Bağlantı gönder', 'Send link', 'Link senden', 'Enviar enlace', 'Отправить')}</Btn>
          <Btn variant="ghost" block onClick={() => { setForgot(false); setErr(''); setInfo(''); }}>{l('Girişe dön', 'Back to sign in', 'Zurück', 'Volver', 'Назад')}</Btn>
        </form>
      ) : (
        <>
          <Segmented label={l('Giriş türü', 'Mode', 'Modus', 'Modo', 'Режим')} value={authModalTab} onChange={(v) => { setAuthModalTab(v); setErr(''); setInfo(''); }} options={[{ id: 'login', label: l('Giriş yap', 'Sign in', 'Anmelden', 'Entrar', 'Вход') }, { id: 'register', label: l('Kaydol', 'Sign up', 'Registrieren', 'Registrarse', 'Регистрация') }]} />
          {GOOGLE_ENABLED && (
            <>
              <Btn variant="ghost" block icon="globe" disabled={busy || !authReady} onClick={() => run(loginWithGoogle)}>{l('Google ile devam et', 'Continue with Google', 'Weiter mit Google', 'Continuar con Google', 'Войти через Google')}</Btn>
              <div className="vz-or"><span>{l('ya da e-posta ile', 'or with email', 'oder mit E-Mail', 'o con email', 'или по email')}</span></div>
            </>
          )}
          <form
            className="vz-stack"
            style={{ gap: 12 }}
            onSubmit={(e) => {
              e.preventDefault();
              run(() => (isReg ? registerWithEmail(name, email, pw) : loginWithEmail(email, pw)));
            }}
          >
            {isReg && <Field label={l('Adın', 'Your name', 'Dein Name', 'Tu nombre', 'Имя')} htmlFor="vz-au-n"><input id="vz-au-n" className="vz-input" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required /></Field>}
            <Field label={l('E-posta', 'Email', 'E-Mail', 'Email', 'Email')} htmlFor="vz-au-e"><input id="vz-au-e" type="email" className="vz-input" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required /></Field>
            <Field label={l('Şifre', 'Password', 'Passwort', 'Contraseña', 'Пароль')} htmlFor="vz-au-p" hint={isReg ? l('En az 6 karakter', 'At least 6 characters', 'Mind. 6 Zeichen', 'Mín. 6 caracteres', 'Мин. 6 символов') : undefined}><input id="vz-au-p" type="password" className="vz-input" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete={isReg ? 'new-password' : 'current-password'} minLength={6} required /></Field>
            {msgs}
            <Btn type="submit" block disabled={busy || !authReady}>{isReg ? l('Hesabı oluştur', 'Create account', 'Konto erstellen', 'Crear cuenta', 'Создать') : l('Giriş yap', 'Sign in', 'Anmelden', 'Entrar', 'Войти')}</Btn>
            {!isReg && <Btn variant="ghost" small onClick={() => { setForgot(true); setErr(''); setInfo(''); }}>{l('Şifremi unuttum', 'Forgot password?', 'Passwort vergessen?', '¿Olvidaste la contraseña?', 'Забыли пароль?')}</Btn>}
          </form>
          <p className="vz-muted" style={{ fontSize: 12.5 }}>{l('Devam ederek kullanım koşullarını ve gizlilik politikasını kabul etmiş olursun.', 'By continuing you accept the terms and privacy policy.', 'Mit dem Fortfahren akzeptierst du die AGB.', 'Al continuar aceptas los términos.', 'Продолжая, вы принимаете условия.')}</p>
        </>
      )}
    </Sheet>
  );
};

/* ---------------- Hata bildir ---------------- */
export const ReportSheet: React.FC<{ open: boolean; onClose: () => void; code?: string; passport: string }> = ({ open, onClose, code, passport }) => {
  const { l, language } = useI18n();
  const opts = useMemo(() => Object.keys(GEO_DATA).map((c) => ({ c, n: getCountryName(c, language) })).sort((a, b) => a.n.localeCompare(b.n, language)), [language]);
  const [view, setView] = useState<'form' | 'mine'>('form');
  const [country, setCountry] = useState(code || 'TH');
  const [cat, setCat] = useState('vf');
  const [notes, setNotes] = useState('');
  const [src, setSrc] = useState('');
  const [contact, setContact] = useState('');
  const [sent, setSent] = useState(false);
  const [mine, setMine] = useState(() => loadUserReports());
  useEffect(() => {
    if (code) setCountry(code);
  }, [code]);
  const cats: [string, string][] = [
    ['vf', l('Vizesiz süre değişti', 'Visa-free days changed', 'Visumfreie Tage geändert', 'Cambió la estancia', 'Изменился срок')],
    ['ev', l('E-vize / ETA kuralı', 'eVisa / ETA rule', 'eVisum / ETA', 'eVisa / ETA', 'eVisa / ETA')],
    ['v', l('Artık vize gerekiyor', 'Visa now required', 'Jetzt Visum nötig', 'Ahora requiere visado', 'Теперь нужна виза')],
    ['info', l('Diğer bilgi hatası', 'Other wrong info', 'Andere falsche Info', 'Otro error', 'Другая ошибка')]
  ];
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notes.trim() && !src.trim()) return;
    const rep = { id: `rep_${Date.now()}`, createdAt: new Date().toISOString(), countryCode: country, countryName: getCountryName(country, language), passportCode: passport, category: cat, sourceUrl: src.trim() || undefined, notes: notes.trim(), reporterContact: contact.trim() || undefined };
    saveUserReport(rep);
    // Supabase bağlıysa bildirimi sunucuya da gönder (sana e-postayla ulaşması için)
    getSupabase()?.then((sb) => sb.from('reports').insert({ country_code: rep.countryCode, passport_code: rep.passportCode, category: rep.category, source_url: rep.sourceUrl || null, notes: rep.notes, contact: rep.reporterContact || null, lang: language, page: window.location.pathname })).catch(() => {});
    setMine(loadUserReports());
    setSent(true);
    setNotes(''); setSrc('');
  };
  return (
    <Sheet open={open} onClose={() => { setSent(false); onClose(); }} title={l('Hata bildir', 'Report an error', 'Fehler melden', 'Reportar un error', 'Сообщить об ошибке')} icon="flag">
      <Segmented label={l('Görünüm', 'View', 'Ansicht', 'Vista', 'Вид')} value={view} onChange={setView} options={[{ id: 'form', label: l('Yeni bildirim', 'New report', 'Neue Meldung', 'Nuevo', 'Новое') }, { id: 'mine', label: l(`Bildirimlerim (${mine.length})`, `My reports (${mine.length})`, `Meine (${mine.length})`, `Mis reportes (${mine.length})`, `Мои (${mine.length})`) }]} />
      {view === 'form' ? (
        sent ? (
          <Card tone="ok" icon="check" title={l('Teşekkürler, bildirimin alındı', 'Thanks, we got your report', 'Danke, Meldung erhalten', 'Gracias, recibido', 'Спасибо, получено')}>
            <p>{l('Ekibimiz resmî kaynaktan kontrol edip güncelleyecek.', 'Our team will check the official source and update it.', 'Wir prüfen die offizielle Quelle.', 'Lo verificaremos con la fuente oficial.', 'Проверим по официальному источнику.')}</p>
            <Btn variant="soft" onClick={() => setSent(false)}>{l('Bir tane daha bildir', 'Report another', 'Weitere melden', 'Reportar otro', 'Ещё одно')}</Btn>
          </Card>
        ) : (
          <form className="vz-stack" style={{ gap: 12 }} onSubmit={submit}>
            <div className="vz-formgrid">
              <Field label={l('Ülke', 'Country', 'Land', 'País', 'Страна')} htmlFor="vz-rp-cc"><select id="vz-rp-cc" className="vz-select" value={country} onChange={(e) => setCountry(e.target.value)}>{opts.map((o) => <option key={o.c} value={o.c}>{o.n}</option>)}</select></Field>
              <Field label={l('Ne değişti?', 'What changed?', 'Was ist anders?', '¿Qué cambió?', 'Что изменилось?')} htmlFor="vz-rp-cat"><select id="vz-rp-cat" className="vz-select" value={cat} onChange={(e) => setCat(e.target.value)}>{cats.map(([k, t]) => <option key={k} value={k}>{t}</option>)}</select></Field>
            </div>
            <Field label={l('Açıklama', 'Details', 'Details', 'Detalles', 'Подробности')} htmlFor="vz-rp-n"><textarea id="vz-rp-n" className="vz-input" style={{ minHeight: 110, paddingBlock: 12 }} value={notes} onChange={(e) => setNotes(e.target.value)} /></Field>
            <Field label={l('Resmî kaynak bağlantısı', 'Official source link', 'Offizielle Quelle', 'Fuente oficial', 'Ссылка на источник')} htmlFor="vz-rp-s"><input id="vz-rp-s" type="url" className="vz-input" value={src} onChange={(e) => setSrc(e.target.value)} placeholder="https://" /></Field>
            <Field label={l('E-postan (isteğe bağlı)', 'Your email (optional)', 'E-Mail (optional)', 'Tu email (opcional)', 'Email (необяз.)')} htmlFor="vz-rp-e"><input id="vz-rp-e" type="email" className="vz-input" value={contact} onChange={(e) => setContact(e.target.value)} /></Field>
            <Btn type="submit" block icon="flag">{l('Bildirimi gönder', 'Send report', 'Meldung senden', 'Enviar', 'Отправить')}</Btn>
          </form>
        )
      ) : mine.length === 0 ? (
        <Empty icon="flag" title={l('Henüz bildirim göndermedin', 'No reports yet', 'Noch keine Meldungen', 'Sin reportes', 'Пока нет')} />
      ) : (
        <List>
          {mine.map((r) => <Row key={r.id} lead={<Flag code={r.countryCode} size="sm" />} title={r.countryName} sub={`${new Date(r.createdAt).toLocaleDateString(language)} · ${r.notes.slice(0, 80)}`} right={<button type="button" className="vz-iconbtn" onClick={() => setMine(deleteUserReport(r.id))} aria-label={l('Sil', 'Delete', 'Löschen', 'Borrar', 'Удалить')}><Icon name="trash" size={16} duo={false} /></button>} />)}
        </List>
      )}
    </Sheet>
  );
};

/* ---------------- Doğrulama masası ---------------- */
export const AuditSheet: React.FC<{ open: boolean; onClose: () => void; onReport: (code: string) => void; onOpenCountry: (c: string) => void }> = ({ open, onClose, onReport, onOpenCountry }) => {
  const { l, language } = useI18n();
  const [f, setF] = useState<'ALL' | 'MATCH' | 'ATTENTION'>('ALL');
  const [q, setQ] = useState('');
  const nm = (r: (typeof AUDIT_DATABASE)[number]) => (language === 'tr' ? r.nameTr : language === 'de' ? r.nameDe : r.nameEn);
  const st = (r: (typeof AUDIT_DATABASE)[number]) => (language === 'tr' ? r.verifiedStatusTr : language === 'de' ? r.verifiedStatusDe : r.verifiedStatusEn);
  const nt = (r: (typeof AUDIT_DATABASE)[number]) => (language === 'tr' ? r.noteTr : language === 'de' ? r.noteDe : r.noteEn);
  const list = AUDIT_DATABASE.filter((r) => f === 'ALL' || r.status === f).filter((r) => !q || norm(nm(r)).includes(norm(q)));
  return (
    <Sheet open={open} onClose={onClose} title={l('Doğrulama masası', 'Verification desk', 'Prüfpult', 'Mesa de verificación', 'Проверка правил')} icon="shield" wide>
      <p className="vz-muted">{l('En çok sorulan ülkelerin kuralları resmî kaynaklarla karşılaştırıldı. Dikkat gerektirenler üstte.', 'Rules for the most-asked countries checked against official sources. Ones needing attention are marked.', 'Mit offiziellen Quellen abgeglichen.', 'Comparado con fuentes oficiales.', 'Сверено с официальными источниками.')}</p>
      <div className="vz-row-flex" style={{ justifyContent: 'space-between' }}>
        <Segmented label={l('Filtre', 'Filter', 'Filter', 'Filtro', 'Фильтр')} value={f} onChange={setF} options={[{ id: 'ALL', label: l('Hepsi', 'All', 'Alle', 'Todos', 'Все') }, { id: 'ATTENTION', label: l('Dikkat', 'Attention', 'Achtung', 'Atención', 'Внимание') }, { id: 'MATCH', label: l('Doğru', 'Confirmed', 'Bestätigt', 'Confirmado', 'Подтверждено') }]} />
        <div style={{ minWidth: 200, flex: 1, maxWidth: 320 }}><SearchInput id="vz-aud-q" value={q} onChange={setQ} placeholder={l('Ülke ara', 'Search', 'Suchen', 'Buscar', 'Поиск')} /></div>
      </div>
      <div className="vz-grid two">
        {list.map((r) => (
          <Card key={r.code} tone={r.status === 'ATTENTION' ? 'sun' : 'plain'} icon={r.status === 'ATTENTION' ? 'alert' : 'check'} eyebrow={st(r)} title={nm(r)} actions={<Flag code={r.code} size="sm" />}>
            <p>{nt(r)}</p>
            <div className="vz-actions">
              <Btn variant="soft" small onClick={() => { onClose(); onOpenCountry(r.code); }}>{l('Ülke sayfası', 'Country page', 'Länderseite', 'País', 'Страна')}</Btn>
              <LinkBtn href={r.sourceUrl} small variant="ghost">{r.sourceName}</LinkBtn>
              <Btn variant="link" small onClick={() => onReport(r.code)}>{l('Hata bildir', 'Report', 'Melden', 'Reportar', 'Сообщить')}</Btn>
            </div>
          </Card>
        ))}
      </div>
    </Sheet>
  );
};


/* ---------------- Bilgi merkezi sayfaları ---------------- */
export const InfoSheet: React.FC<{ open: boolean; onClose: () => void; page: string; onPage: (p: string) => void; onDataChanged: () => void }> = ({ open, onClose, page, onPage, onDataChanged }) => {
  const { l } = useI18n();
  const groups: { id: string; label: string; items: [string, string][] }[] = [
    { id: 'legal', label: l('Yasal', 'Legal', 'Rechtliches', 'Legal', 'Правовое'), items: [['terms', l('Kullanım koşulları', 'Terms', 'Nutzungsbedingungen', 'Términos', 'Условия')], ['privacy', l('Gizlilik', 'Privacy', 'Datenschutz', 'Privacidad', 'Конфиденциальность')], ['disclaimer', l('Sorumluluk reddi', 'Disclaimer', 'Haftung', 'Descargo', 'Отказ')], ['kvkk_gdpr', 'KVKK & GDPR'], ['standards', l('Kaynaklar', 'Sources', 'Quellen', 'Fuentes', 'Источники')], ['attributions', l('Görseller', 'Photos', 'Bilder', 'Fotos', 'Фото')]] },
    { id: 'help', label: l('Destek', 'Support', 'Hilfe', 'Ayuda', 'Помощь'), items: [['appeals', l('Vize reddi itirazı', 'Visa appeals', 'Widerspruch', 'Apelación', 'Апелляция')], ['passport_lost', l('Pasaport kaybı', 'Lost passport', 'Passverlust', 'Pasaporte perdido', 'Утеря')], ['crisis', l('Kriz masası', 'Crisis desk', 'Krisenstab', 'Crisis', 'Кризис')], ['transit', l('Transit', 'Transit', 'Transit', 'Tránsito', 'Транзит')]] },
    { id: 'partners', label: l('İş ortakları', 'Partners', 'Partner', 'Socios', 'Партнёры'), items: [['partners', l('Acenteler', 'Agencies', 'Agenturen', 'Agencias', 'Агентства')], ['airlines', l('Havayolları', 'Airlines', 'Airlines', 'Aerolíneas', 'Авиа')], ['insurance', l('Sigorta', 'Insurance', 'Versicherung', 'Seguro', 'Страховка')], ['community', l('Topluluk', 'Community', 'Community', 'Comunidad', 'Сообщество')], ['api', 'API']] },
    { id: 'about', label: l('Hakkımızda', 'About', 'Über uns', 'Nosotros', 'О нас'), items: [['mission', l('Misyon', 'Mission', 'Mission', 'Misión', 'Миссия')], ['sustainability', l('Sürdürülebilirlik', 'Sustainability', 'Nachhaltigkeit', 'Sostenibilidad', 'Экология')], ['careers', l('Kariyer', 'Careers', 'Karriere', 'Empleo', 'Карьера')], ['press', l('İletişim', 'Contact', 'Kontakt', 'Contacto', 'Контакты')], ['backup', l('Veri yedeği', 'Backup', 'Backup', 'Copia', 'Копия')]] }
  ];
  const grp = groups.find((g) => g.items.some(([id]) => id === page)) || groups[0];
  const title = grp.items.find(([id]) => id === page)?.[1] || grp.label;
  return (
    <Sheet open={open} onClose={onClose} title={l('Bilgi merkezi', 'Help centre', 'Hilfezentrum', 'Centro de ayuda', 'Справка')} icon="info" wide>
      <Segmented label={l('Bölüm', 'Section', 'Bereich', 'Sección', 'Раздел')} value={grp.id} onChange={(id) => onPage(groups.find((g) => g.id === id)!.items[0][0])} options={groups.map((g) => ({ id: g.id, label: g.label }))} />
      <Chips scroll>{grp.items.map(([id, t]) => <Chip key={id} on={id === page} onClick={() => onPage(id)}>{t}</Chip>)}</Chips>
      <div aria-label={title}>
        <LegalInfoModal isOpen embedded onClose={onClose} initialTab={page} onDataResetOrImported={onDataChanged} />
      </div>
    </Sheet>
  );
};

/* ---------------- Vizamigo asistan ---------------- */

const stripEmoji = (s: string) => s.replace(/^[\p{Extended_Pictographic}\p{Regional_Indicator}️‍\s]+/u, '').trim();

/** Asistan metnindeki **kalın**, madde ve satırları sade biçimde gösterir. */
const RichText: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');
  const inline = (s: string, k: number) => {
    const parts = stripEmoji(s).replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1$2').split(/(\*\*[^*]+\*\*)/g);
    return <React.Fragment key={k}>{parts.map((p, i) => (p.startsWith('**') && p.endsWith('**') ? <b key={i}>{p.slice(2, -2)}</b> : p))}</React.Fragment>;
  };
  return (
    <div className="vz-msg-text">
      {lines.map((ln, i) => {
        const t = ln.trim();
        if (!t) return null;
        if (/^([-•*]|\d+\.)\s/.test(t)) return <p key={i} className="li">{inline(t.replace(/^([-•*]|\d+\.)\s/, ''), i)}</p>;
        return <p key={i}>{inline(t, i)}</p>;
      })}
    </div>
  );
};

export const AssistantSheet: React.FC<{
  open: boolean;
  onClose: () => void;
  passport: string;
  onOpenCountry: (c: string) => void;
  onSelectTab: (t: 'explore' | 'plan' | 'track' | 'nomad' | 'profile') => void;
  onOpenTool: (tab: 'explore' | 'plan' | 'track' | 'nomad' | 'profile', tile: string) => void;
}> = ({ open, onClose, passport, onOpenCountry, onSelectTab, onOpenTool }) => {
  const { l, language } = useI18n();
  const [msgs, setMsgs] = useState<AssistantMessage[]>([]);
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  // sesli cevap (tarayıcının kendi sesi); tercih cihazda saklanır
  const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const [speak, setSpeak] = useState(() => {
    try {
      return localStorage.getItem('vz_assistant_voice') === '1';
    } catch {
      return false;
    }
  });
  const toggleSpeak = () => {
    const n = !speak;
    setSpeak(n);
    try {
      localStorage.setItem('vz_assistant_voice', n ? '1' : '0');
    } catch {}
    if (!n && canSpeak) window.speechSynthesis.cancel();
  };
  const say = (text: string) => {
    if (!canSpeak) return;
    const plain = text.replace(/\*\*|[#*_>`]/g, '').replace(/https?:\/\/\S+/g, '').slice(0, 900);
    const u = new SpeechSynthesisUtterance(plain);
    u.lang = ({ tr: 'tr-TR', en: 'en-GB', de: 'de-DE', es: 'es-ES', ru: 'ru-RU' } as Record<string, string>)[language] || 'en-GB';
    u.rate = 1.02;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };
  useEffect(() => () => { if (canSpeak) window.speechSynthesis.cancel(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [msgs, busy]);
  const send = async (text?: string) => {
    const t = (text ?? q).trim();
    if (!t || busy) return;
    setQ('');
    setMsgs((m) => [...m, { id: `u-${Date.now()}`, sender: 'user', text: t, timestamp: new Date() }]);
    setBusy(true);
    try {
      const r = await processAssistantQuery(t, passport, language);
      setMsgs((m) => [...m, r]);
      if (speak) say(r.text);
    } catch {
      setMsgs((m) => [...m, { id: `e-${Date.now()}`, sender: 'assistant', text: l('Şu an yanıt veremedim, birazdan tekrar dener misin?', 'I couldn’t answer just now, try again in a moment?', 'Gerade keine Antwort möglich.', 'No pude responder ahora.', 'Не удалось ответить.'), timestamp: new Date() }]);
    } finally {
      setBusy(false);
    }
  };
  const act = (a: AssistantActionPill) => {
    if (a.type === 'open_country' && a.countryCode) { onClose(); onOpenCountry(a.countryCode); }
    else if (a.type === 'switch_tab' && a.tabKey) { onClose(); onSelectTab((a.tabKey === 'consular' ? 'nomad' : a.tabKey) as 'explore'); }
    else if (a.type === 'open_tool') {
      onClose();
      if (a.toolKey === 'packing') onOpenTool('nomad', 'pack');
      else if (a.toolKey === 'tipping') onOpenTool('nomad', 'tip');
      else if (a.toolKey === 'overlap') onOpenTool('plan', 'tz');
      else onOpenTool('explore', 'radar');
    } else if (a.type === 'affiliate' && a.url) window.open(a.url, '_blank', 'noopener,noreferrer');
  };
  const mic = () => {
    if (listening) { stopVoiceRecognition(); setListening(false); return; }
    setListening(true);
    startVoiceRecognition({ lang: language, onResult: (tx, fin) => { setQ(tx); if (fin) { setListening(false); send(tx); } }, onError: () => setListening(false), onEnd: () => setListening(false) });
  };
  const ideas = [
    l('Türk pasaportuyla Japonya’da kaç gün kalabilirim?', 'How long can I stay in Japan?', 'Wie lange darf ich in Japan bleiben?', '¿Cuánto puedo quedarme en Japón?', 'Сколько можно в Японии?'),
    l('Tayland için ne hazırlamalıyım?', 'What do I need for Thailand?', 'Was brauche ich für Thailand?', '¿Qué necesito para Tailandia?', 'Что нужно для Таиланда?'),
    l('Pasaportumu kaybettim, ne yapmalıyım?', 'I lost my passport, what now?', 'Pass verloren – was tun?', 'Perdí el pasaporte', 'Потерял паспорт'),
    l('Schengen 90/180 nasıl hesaplanır?', 'How does Schengen 90/180 work?', 'Wie funktioniert 90/180?', '¿Cómo funciona 90/180?', 'Как считать 90/180?')
  ];
  return (
    <Sheet open={open} onClose={onClose} title={l('Vizamigo asistan', 'Vizamigo assistant', 'Vizamigo-Assistent', 'Asistente Vizamigo', 'Ассистент Vizamigo')} icon="spark">
      <div className="vz-chat">
        {msgs.length === 0 && (
          <div className="vz-stack" style={{ gap: 12 }}>
            <p className="vz-muted">{l('Vize, kalış süresi, belge ya da rota hakkında soru sor. Örneğin:', 'Ask about visas, stays, documents or routes. For example:', 'Frag zu Visa, Aufenthalt, Dokumenten, Routen:', 'Pregunta sobre visados, estancias o rutas:', 'Спросите о визах, сроках, маршрутах:')}</p>
            <div className="vz-stack" style={{ gap: 8 }}>{ideas.map((x) => <button key={x} type="button" className="vz-idea" onClick={() => send(x)}><Icon name="spark" size={16} duo={false} />{x}</button>)}</div>
          </div>
        )}
        {msgs.map((m) => (
          <div key={m.id} className={`vz-msg ${m.sender}`}>
            {m.sender === 'assistant' ? <RichText text={m.text} /> : <p>{m.text}</p>}
            {m.actions && m.actions.length > 0 && (
              <div className="vz-actions">
                {m.actions.slice(0, 4).map((a) => (
                  <Btn key={a.id} variant="soft" small icon={a.type === 'open_country' ? 'globe' : a.type === 'affiliate' ? 'external' : 'next'} onClick={() => act(a)}>{stripEmoji(a.label)}</Btn>
                ))}
              </div>
            )}
          </div>
        ))}
        {busy && <div className="vz-msg assistant"><span className="vz-typing"><i /><i /><i /></span></div>}
        <div ref={endRef} />
      </div>
      <form className="vz-chat-in" onSubmit={(e) => { e.preventDefault(); send(); }}>
        <label htmlFor="vz-chat-q" className="sr-only">{l('Sorunu yaz', 'Type your question', 'Frage eingeben', 'Escribe tu pregunta', 'Ваш вопрос')}</label>
        <input id="vz-chat-q" className="vz-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder={l('Sorunu yaz…', 'Type your question…', 'Frage eingeben…', 'Escribe tu pregunta…', 'Ваш вопрос…')} autoComplete="off" />
        {canSpeak && (
          <button type="button" className={`vz-iconbtn${speak ? ' on' : ''}`} onClick={toggleSpeak} aria-pressed={speak} aria-label={speak ? l('Sesli cevabı kapat', 'Turn off spoken replies', 'Sprachausgabe aus', 'Desactivar voz', 'Выключить голос') : l('Cevapları sesli oku', 'Read replies aloud', 'Antworten vorlesen', 'Leer en voz alta', 'Озвучивать ответы')} title={speak ? l('Sesli cevap açık', 'Spoken replies on', 'Sprachausgabe an', 'Voz activada', 'Голос включён') : l('Sesli cevap kapalı', 'Spoken replies off', 'Sprachausgabe aus', 'Voz desactivada', 'Голос выключен')}>
            <Icon name="sound" size={18} duo={false} />
          </button>
        )}
        {isSpeechRecognitionSupported() && (
          <button type="button" className={`vz-iconbtn${listening ? ' on' : ''}`} onClick={mic} aria-label={listening ? l('Dinlemeyi durdur', 'Stop listening', 'Stopp', 'Detener', 'Стоп') : l('Sesle sor', 'Ask by voice', 'Per Stimme fragen', 'Preguntar por voz', 'Голосом')}>
            <Icon name="mic" size={18} duo={false} />
          </button>
        )}
        <Btn type="submit" icon="next" disabled={busy || !q.trim()} aria-label={l('Gönder', 'Send', 'Senden', 'Enviar', 'Отправить')} />
      </form>
    </Sheet>
  );
};
