import { toursPath } from '../data/tours';
import { siteFeatures, visaLine } from '../services/assistantCommerce';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useI18n, lText } from '../data/i18n';
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
import { canSpeak as canSpeakFn, loadVoices, voicesFor, savedVoice, saveVoice, speak, stopSpeech, unlockAudio, NATURAL_KEY, NATURAL_VOICES, naturalSupported, prepareNatural, onNaturalStatus, naturalStatus } from '../utils/speech';
import { processAssistantQuery, AssistantMessage, AssistantActionPill, isSpeechRecognitionSupported, startVoiceRecognition, stopVoiceRecognition } from '../services/aiAssistantEngine';

const norm = (s: string) => s.toLocaleLowerCase('tr').normalize('NFD').replace(/[̀-ͯ]/g, '');

/* ------------------------------------------------------------------ */
/* Ortak alt sayfa: mobilde aşağıdan kayar, masaüstünde ortada panel   */
/* ------------------------------------------------------------------ */
export const Sheet: React.FC<{ open: boolean; onClose: () => void; title: string; icon?: IconName; wide?: boolean; children: React.ReactNode; footer?: React.ReactNode }> = ({ open, onClose, title, icon, wide, children, footer }) => {
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
          <button type="button" className="vz-iconbtn" onClick={onClose} aria-label={l('Kapat', 'Close', 'Schließen', 'Cerrar', 'Закрыть', 'Fechar')}>
            <Icon name="close" size={18} duo={false} />
          </button>
        </header>
        <div className={`vz-sheet-b${footer ? ' has-f' : ''}`}>{children}</div>
        {footer && <div className="vz-sheet-f">{footer}</div>}
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
    <Sheet open={open} onClose={onClose} title={l('Pasaportunu seç', 'Choose your passport', 'Pass wählen', 'Elige tu pasaporte', 'Выберите паспорт', 'Escolha seu passaporte')} icon="passport">
      <SearchInput id="vz-pp-q" value={q} onChange={setQ} placeholder={l('Ülke adı yaz…', 'Type a country…', 'Land eingeben…', 'Escribe un país…', 'Введите страну…', 'Digite um país…')} autoFocus />
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
            sub={l(`${counts.get(x.c)} ülkeye vizesiz / kimlikle`, `Visa-free / ID to ${counts.get(x.c)} countries`, `${counts.get(x.c)} Länder visumfrei`, `${counts.get(x.c)} países sin visado`, `${counts.get(x.c)} стран без визы`, `${counts.get(x.c)} países sem visto`)}
            right={x.c === selected ? <span className="vz-badge tone-ok"><Icon name="check" size={14} duo={false} />{l('Seçili', 'Selected', 'Gewählt', 'Elegido', 'Выбран', 'Escolhido')}</span> : undefined}
            onClick={() => pick(x.c)}
          />
        ))}
      </List>
      {list.length === 0 && <Empty icon="search" title={l('Bulunamadı', 'Not found', 'Nicht gefunden', 'No encontrado', 'Не найдено', 'Não encontrado')} />}
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
      if (!r.success) setErr(r.error || l('Bir şeyler ters gitti, tekrar dene.', 'Something went wrong, try again.', 'Fehler, bitte erneut versuchen.', 'Algo falló, inténtalo de nuevo.', 'Ошибка, попробуйте снова.', 'Algo deu errado. Tente de novo.'));
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
      <Sheet open={isAuthModalOpen} onClose={closeAuthModal} title={l('Yeni şifre belirle', 'Set a new password', 'Neues Passwort', 'Nueva contraseña', 'Новый пароль', 'Nova senha')} icon="lock">
        <form className="vz-stack" style={{ gap: 12 }} onSubmit={(e) => { e.preventDefault(); run(() => setNewPassword(pw)); }}>
          <Field label={l('Yeni şifre', 'New password', 'Neues Passwort', 'Nueva contraseña', 'Новый пароль', 'Nova senha')} htmlFor="vz-au-np" hint={l('En az 6 karakter', 'At least 6 characters', 'Mind. 6 Zeichen', 'Mín. 6 caracteres', 'Мин. 6 символов', 'Mín. 6 caracteres')}><input id="vz-au-np" type="password" className="vz-input" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="new-password" minLength={6} required /></Field>
          {msgs}
          <Btn type="submit" block disabled={busy}>{l('Kaydet', 'Save', 'Speichern', 'Guardar', 'Сохранить', 'Salvar')}</Btn>
        </form>
      </Sheet>
    );
  }
  return (
    <Sheet open={isAuthModalOpen} onClose={closeAuthModal} title={forgot ? l('Şifremi unuttum', 'Forgot password', 'Passwort vergessen', 'Olvidé mi contraseña', 'Забыли пароль', 'Esqueci minha senha') : isReg ? l('Ücretsiz hesap aç', 'Create a free account', 'Kostenloses Konto', 'Crear cuenta gratis', 'Создать аккаунт', 'Criar conta grátis') : l('Giriş yap', 'Sign in', 'Anmelden', 'Iniciar sesión', 'Войти', 'Entrar')} icon="user">
      {!authReady && <div className="vz-note"><Icon name="info" size={18} duo={false} /><span>{l('Hesaplar çok yakında açılıyor. Uygulamanın tamamını hesapsız kullanabilirsin; verilerin bu cihazda saklanır.', 'Accounts are coming soon. Everything works without one; your data stays on this device.', 'Konten kommen bald.', 'Las cuentas llegan pronto.', 'Аккаунты скоро.', 'As contas chegam em breve.')}</span></div>}
      {forgot ? (
        <form className="vz-stack" style={{ gap: 12 }} onSubmit={(e) => { e.preventDefault(); run(() => resetPassword(email)); }}>
          <p className="vz-muted">{l('Hesabının e-postasını yaz; şifreni yenilemen için bir bağlantı gönderelim.', 'Enter your account email and we will send a reset link.', 'E-Mail eingeben, wir senden einen Link.', 'Escribe tu email y te enviamos un enlace.', 'Введите email, пришлём ссылку.', 'Digite seu e-mail e enviaremos um link.')}</p>
          <Field label={l('E-posta', 'Email', 'E-Mail', 'Email', 'Email', 'E-mail')} htmlFor="vz-au-fe"><input id="vz-au-fe" type="email" className="vz-input" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required /></Field>
          {msgs}
          <Btn type="submit" block disabled={busy || !authReady}>{l('Bağlantı gönder', 'Send link', 'Link senden', 'Enviar enlace', 'Отправить', 'Enviar link')}</Btn>
          <Btn variant="ghost" block onClick={() => { setForgot(false); setErr(''); setInfo(''); }}>{l('Girişe dön', 'Back to sign in', 'Zurück', 'Volver', 'Назад', 'Voltar')}</Btn>
        </form>
      ) : (
        <>
          <Segmented label={l('Giriş türü', 'Mode', 'Modus', 'Modo', 'Режим', 'Modo')} value={authModalTab} onChange={(v) => { setAuthModalTab(v); setErr(''); setInfo(''); }} options={[{ id: 'login', label: l('Giriş yap', 'Sign in', 'Anmelden', 'Entrar', 'Вход', 'Entrar') }, { id: 'register', label: l('Kaydol', 'Sign up', 'Registrieren', 'Registrarse', 'Регистрация', 'Criar conta') }]} />
          {GOOGLE_ENABLED && (
            <>
              <Btn variant="ghost" block icon="globe" disabled={busy || !authReady} onClick={() => run(loginWithGoogle)}>{l('Google ile devam et', 'Continue with Google', 'Weiter mit Google', 'Continuar con Google', 'Войти через Google', 'Continuar com Google')}</Btn>
              <div className="vz-or"><span>{l('ya da e-posta ile', 'or with email', 'oder mit E-Mail', 'o con email', 'или по email', 'ou com e-mail')}</span></div>
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
            {isReg && <Field label={l('Adın', 'Your name', 'Dein Name', 'Tu nombre', 'Имя', 'Seu nome')} htmlFor="vz-au-n"><input id="vz-au-n" className="vz-input" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required /></Field>}
            <Field label={l('E-posta', 'Email', 'E-Mail', 'Email', 'Email', 'E-mail')} htmlFor="vz-au-e"><input id="vz-au-e" type="email" className="vz-input" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required /></Field>
            <Field label={l('Şifre', 'Password', 'Passwort', 'Contraseña', 'Пароль', 'Senha')} htmlFor="vz-au-p" hint={isReg ? l('En az 6 karakter', 'At least 6 characters', 'Mind. 6 Zeichen', 'Mín. 6 caracteres', 'Мин. 6 символов', 'Mín. 6 caracteres') : undefined}><input id="vz-au-p" type="password" className="vz-input" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete={isReg ? 'new-password' : 'current-password'} minLength={6} required /></Field>
            {msgs}
            <Btn type="submit" block disabled={busy || !authReady}>{isReg ? l('Hesabı oluştur', 'Create account', 'Konto erstellen', 'Crear cuenta', 'Создать', 'Criar conta') : l('Giriş yap', 'Sign in', 'Anmelden', 'Entrar', 'Войти', 'Entrar')}</Btn>
            {!isReg && <Btn variant="ghost" small onClick={() => { setForgot(true); setErr(''); setInfo(''); }}>{l('Şifremi unuttum', 'Forgot password?', 'Passwort vergessen?', '¿Olvidaste la contraseña?', 'Забыли пароль?', 'Esqueceu a senha?')}</Btn>}
          </form>
          <p className="vz-muted" style={{ fontSize: 12.5 }}>{l('Devam ederek kullanım koşullarını ve gizlilik politikasını kabul etmiş olursun.', 'By continuing you accept the terms and privacy policy.', 'Mit dem Fortfahren akzeptierst du die AGB.', 'Al continuar aceptas los términos.', 'Продолжая, вы принимаете условия.', 'Ao continuar, você aceita os termos.')}</p>
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
    ['vf', l('Vizesiz süre değişti', 'Visa-free days changed', 'Visumfreie Tage geändert', 'Cambió la estancia', 'Изменился срок', 'O tempo de permanência mudou')],
    ['ev', l('E-vize / ETA kuralı', 'eVisa / ETA rule', 'eVisum / ETA', 'eVisa / ETA', 'eVisa / ETA', 'e-Visa / ETA')],
    ['v', l('Artık vize gerekiyor', 'Visa now required', 'Jetzt Visum nötig', 'Ahora requiere visado', 'Теперь нужна виза', 'Agora exige visto')],
    ['info', l('Diğer bilgi hatası', 'Other wrong info', 'Andere falsche Info', 'Otro error', 'Другая ошибка', 'Outro erro')]
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
    <Sheet open={open} onClose={() => { setSent(false); onClose(); }} title={l('Hata bildir', 'Report an error', 'Fehler melden', 'Reportar un error', 'Сообщить об ошибке', 'Reportar um erro')} icon="flag">
      <Segmented label={l('Görünüm', 'View', 'Ansicht', 'Vista', 'Вид', 'Visualização')} value={view} onChange={setView} options={[{ id: 'form', label: l('Yeni bildirim', 'New report', 'Neue Meldung', 'Nuevo', 'Новое', 'Novo') }, { id: 'mine', label: l(`Bildirimlerim (${mine.length})`, `My reports (${mine.length})`, `Meine (${mine.length})`, `Mis reportes (${mine.length})`, `Мои (${mine.length})`, `Meus relatos (${mine.length})`) }]} />
      {view === 'form' ? (
        sent ? (
          <Card tone="ok" icon="check" title={l('Teşekkürler, bildirimin alındı', 'Thanks, we got your report', 'Danke, Meldung erhalten', 'Gracias, recibido', 'Спасибо, получено', 'Obrigado, recebemos')}>
            <p>{l('Ekibimiz resmî kaynaktan kontrol edip güncelleyecek.', 'Our team will check the official source and update it.', 'Wir prüfen die offizielle Quelle.', 'Lo verificaremos con la fuente oficial.', 'Проверим по официальному источнику.', 'Vamos verificar na fonte oficial.')}</p>
            <Btn variant="soft" onClick={() => setSent(false)}>{l('Bir tane daha bildir', 'Report another', 'Weitere melden', 'Reportar otro', 'Ещё одно', 'Reportar outro')}</Btn>
          </Card>
        ) : (
          <form className="vz-stack" style={{ gap: 12 }} onSubmit={submit}>
            <div className="vz-formgrid">
              <Field label={l('Ülke', 'Country', 'Land', 'País', 'Страна', 'País')} htmlFor="vz-rp-cc"><select id="vz-rp-cc" className="vz-select" value={country} onChange={(e) => setCountry(e.target.value)}>{opts.map((o) => <option key={o.c} value={o.c}>{o.n}</option>)}</select></Field>
              <Field label={l('Ne değişti?', 'What changed?', 'Was ist anders?', '¿Qué cambió?', 'Что изменилось?', 'O que mudou?')} htmlFor="vz-rp-cat"><select id="vz-rp-cat" className="vz-select" value={cat} onChange={(e) => setCat(e.target.value)}>{cats.map(([k, t]) => <option key={k} value={k}>{t}</option>)}</select></Field>
            </div>
            <Field label={l('Açıklama', 'Details', 'Details', 'Detalles', 'Подробности', 'Detalhes')} htmlFor="vz-rp-n"><textarea id="vz-rp-n" className="vz-input" style={{ minHeight: 110, paddingBlock: 12 }} value={notes} onChange={(e) => setNotes(e.target.value)} /></Field>
            <Field label={l('Resmî kaynak bağlantısı', 'Official source link', 'Offizielle Quelle', 'Fuente oficial', 'Ссылка на источник', 'Fonte oficial')} htmlFor="vz-rp-s"><input id="vz-rp-s" type="url" className="vz-input" value={src} onChange={(e) => setSrc(e.target.value)} placeholder="https://" /></Field>
            <Field label={l('E-postan (isteğe bağlı)', 'Your email (optional)', 'E-Mail (optional)', 'Tu email (opcional)', 'Email (необяз.)', 'Seu e-mail (opcional)')} htmlFor="vz-rp-e"><input id="vz-rp-e" type="email" className="vz-input" value={contact} onChange={(e) => setContact(e.target.value)} /></Field>
            <Btn type="submit" block icon="flag">{l('Bildirimi gönder', 'Send report', 'Meldung senden', 'Enviar', 'Отправить', 'Enviar')}</Btn>
          </form>
        )
      ) : mine.length === 0 ? (
        <Empty icon="flag" title={l('Henüz bildirim göndermedin', 'No reports yet', 'Noch keine Meldungen', 'Sin reportes', 'Пока нет', 'Nenhum relato')} />
      ) : (
        <List>
          {mine.map((r) => <Row key={r.id} lead={<Flag code={r.countryCode} size="sm" />} title={r.countryName} sub={`${new Date(r.createdAt).toLocaleDateString(language)} · ${r.notes.slice(0, 80)}`} right={<button type="button" className="vz-iconbtn" onClick={() => setMine(deleteUserReport(r.id))} aria-label={l('Sil', 'Delete', 'Löschen', 'Borrar', 'Удалить', 'Excluir')}><Icon name="trash" size={16} duo={false} /></button>} />)}
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
  const nm = (r: (typeof AUDIT_DATABASE)[number]) => (language === 'tr' ? r.nameTr : language === 'de' ? r.nameDe : lText(language, r.nameTr, r.nameEn, r.nameDe));
  const st = (r: (typeof AUDIT_DATABASE)[number]) => (language === 'tr' ? r.verifiedStatusTr : language === 'de' ? r.verifiedStatusDe : lText(language, r.verifiedStatusTr, r.verifiedStatusEn, r.verifiedStatusDe));
  const nt = (r: (typeof AUDIT_DATABASE)[number]) => (language === 'tr' ? r.noteTr : language === 'de' ? r.noteDe : lText(language, r.noteTr, r.noteEn, r.noteDe));
  const list = AUDIT_DATABASE.filter((r) => f === 'ALL' || r.status === f).filter((r) => !q || norm(nm(r)).includes(norm(q)));
  return (
    <Sheet open={open} onClose={onClose} title={l('Doğrulama masası', 'Verification desk', 'Prüfpult', 'Mesa de verificación', 'Проверка правил', 'Central de verificação')} icon="shield" wide>
      <p className="vz-muted">{l('En çok sorulan ülkelerin kuralları resmî kaynaklarla karşılaştırıldı. Dikkat gerektirenler üstte.', 'Rules for the most-asked countries checked against official sources. Ones needing attention are marked.', 'Mit offiziellen Quellen abgeglichen.', 'Comparado con fuentes oficiales.', 'Сверено с официальными источниками.', 'Comparado com fontes oficiais.')}</p>
      <div className="vz-row-flex" style={{ justifyContent: 'space-between' }}>
        <Segmented label={l('Filtre', 'Filter', 'Filter', 'Filtro', 'Фильтр', 'Filtro')} value={f} onChange={setF} options={[{ id: 'ALL', label: l('Hepsi', 'All', 'Alle', 'Todos', 'Все', 'Todos') }, { id: 'ATTENTION', label: l('Dikkat', 'Attention', 'Achtung', 'Atención', 'Внимание', 'Atenção') }, { id: 'MATCH', label: l('Doğru', 'Confirmed', 'Bestätigt', 'Confirmado', 'Подтверждено', 'Confirmado') }]} />
        <div style={{ minWidth: 200, flex: 1, maxWidth: 320 }}><SearchInput id="vz-aud-q" value={q} onChange={setQ} placeholder={l('Ülke ara', 'Search', 'Suchen', 'Buscar', 'Поиск', 'Buscar')} /></div>
      </div>
      <div className="vz-grid two">
        {list.map((r) => (
          <Card key={r.code} tone={r.status === 'ATTENTION' ? 'sun' : 'plain'} icon={r.status === 'ATTENTION' ? 'alert' : 'check'} eyebrow={st(r)} title={nm(r)} actions={<Flag code={r.code} size="sm" />}>
            <p>{nt(r)}</p>
            <div className="vz-actions">
              <Btn variant="soft" small onClick={() => { onClose(); onOpenCountry(r.code); }}>{l('Ülke sayfası', 'Country page', 'Länderseite', 'País', 'Страна', 'País')}</Btn>
              <LinkBtn href={r.sourceUrl} small variant="ghost">{r.sourceName}</LinkBtn>
              <Btn variant="link" small onClick={() => onReport(r.code)}>{l('Hata bildir', 'Report', 'Melden', 'Reportar', 'Сообщить', 'Reportar')}</Btn>
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
    { id: 'legal', label: l('Yasal', 'Legal', 'Rechtliches', 'Legal', 'Правовое', 'Jurídico'), items: [['terms', l('Kullanım koşulları', 'Terms', 'Nutzungsbedingungen', 'Términos', 'Условия', 'Termos')], ['privacy', l('Gizlilik', 'Privacy', 'Datenschutz', 'Privacidad', 'Конфиденциальность', 'Privacidade')], ['disclaimer', l('Sorumluluk reddi', 'Disclaimer', 'Haftung', 'Descargo', 'Отказ', 'Isenção')], ['kvkk_gdpr', 'KVKK & GDPR'], ['standards', l('Kaynaklar', 'Sources', 'Quellen', 'Fuentes', 'Источники', 'Fontes')], ['attributions', l('Görseller', 'Photos', 'Bilder', 'Fotos', 'Фото', 'Fotos')]] },
    { id: 'help', label: l('Destek', 'Support', 'Hilfe', 'Ayuda', 'Помощь', 'Ajuda'), items: [['appeals', l('Vize reddi itirazı', 'Visa appeals', 'Widerspruch', 'Apelación', 'Апелляция', 'Recurso')], ['passport_lost', l('Pasaport kaybı', 'Lost passport', 'Passverlust', 'Pasaporte perdido', 'Утеря', 'Passaporte perdido')], ['crisis', l('Kriz masası', 'Crisis desk', 'Krisenstab', 'Crisis', 'Кризис', 'Crises')], ['transit', l('Transit', 'Transit', 'Transit', 'Tránsito', 'Транзит', 'Trânsito')]] },
    { id: 'partners', label: l('İş ortakları', 'Partners', 'Partner', 'Socios', 'Партнёры', 'Parceiros'), items: [['partners', l('Acenteler', 'Agencies', 'Agenturen', 'Agencias', 'Агентства', 'Agências')], ['airlines', l('Havayolları', 'Airlines', 'Airlines', 'Aerolíneas', 'Авиа', 'Companhias aéreas')], ['insurance', l('Sigorta', 'Insurance', 'Versicherung', 'Seguro', 'Страховка', 'Seguro')], ['community', l('Topluluk', 'Community', 'Community', 'Comunidad', 'Сообщество', 'Comunidade')], ['api', 'API']] },
    { id: 'about', label: l('Hakkımızda', 'About', 'Über uns', 'Nosotros', 'О нас', 'Quem somos'), items: [['mission', l('Hakkımızda', 'About Vizamigo', 'Über Vizamigo', 'Sobre Vizamigo', 'О Vizamigo', 'Sobre a Vizamigo')], ['standards', l('Bilgileri nasıl doğruluyoruz', 'How we verify', 'So prüfen wir', 'Cómo verificamos', 'Как мы проверяем', 'Como verificamos')], ['sustainability', l('Sürdürülebilirlik', 'Sustainability', 'Nachhaltigkeit', 'Sostenibilidad', 'Экология', 'Sustentabilidade')], ['careers', l('Kariyer', 'Careers', 'Karriere', 'Empleo', 'Карьера', 'Vagas')], ['press', l('İletişim', 'Contact', 'Kontakt', 'Contacto', 'Контакты', 'Contato')], ['backup', l('Veri yedeği', 'Backup', 'Backup', 'Copia', 'Копия', 'Backup')]] }
  ];
  const grp = groups.find((g) => g.items.some(([id]) => id === page)) || groups[0];
  const title = grp.items.find(([id]) => id === page)?.[1] || grp.label;
  return (
    <Sheet open={open} onClose={onClose} title={l('Bilgi merkezi', 'Help centre', 'Hilfezentrum', 'Centro de ayuda', 'Справка', 'Central de ajuda')} icon="info" wide>
      <Segmented label={l('Bölüm', 'Section', 'Bereich', 'Sección', 'Раздел', 'Seção')} value={grp.id} onChange={(id) => onPage(groups.find((g) => g.id === id)!.items[0][0])} options={groups.map((g) => ({ id: g.id, label: g.label }))} />
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

/** /api/chat: sitenin kendi cevabını (vize, ülke verisi, düğmeler) bilgi olarak verip doğal bir cevap ister. Anahtar yoksa ya da hata olursa null. */
async function askAI(q: string, r: AssistantMessage, prev: AssistantMessage[], passport: string, lang: string): Promise<string | null> {
  try {
    if (sessionStorage.getItem('vz_ai_off') === '1') return null;
  } catch {}
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 35000);
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      signal: ctl.signal,
      body: JSON.stringify({
        q,
        lang,
        passport: getCountryName(passport, 'en'),
        today: new Date().toISOString().slice(0, 10),
        facts: [r.detectedCountry ? visaLine(r.detectedCountry.code, passport, lang).replace(/\*\*/g, '') : '', r.text].filter(Boolean).join('\n\n'),
        buttons: (r.actions || []).map((a) => stripEmoji(a.label) + (a.type === 'affiliate' ? ' [partner]' : '')),
        features: siteFeatures(lang).map((f) => f.text.replace(/\*\*/g, '')),
        history: prev.slice(-8).map((m) => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text }))
      })
    });
    if (res.status === 503 || res.status === 404 || res.status === 405) {
      try { sessionStorage.setItem('vz_ai_off', '1'); } catch {}
      return null;
    }
    if (!res.ok) return null;
    const j = (await res.json()) as { text?: string };
    return j.text && j.text.trim() ? j.text.trim() : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export const AssistantSheet: React.FC<{
  open: boolean;
  onClose: () => void;
  passport: string;
  onOpenCountry: (c: string) => void;
  onSelectTab: (t: 'explore' | 'plan' | 'track' | 'nomad' | 'profile') => void;
  onOpenTool: (tab: 'explore' | 'plan' | 'track' | 'nomad' | 'profile', tile: string) => void;
}> = ({ open, onClose, passport, onOpenCountry, onSelectTab, onOpenTool }) => {
  const { l, language } = useI18n();
  const LANGS = ['tr', 'en', 'de', 'es', 'ru', 'pt'] as const;
  type CL = (typeof LANGS)[number];
  // sohbet dili: mikrofon, sesli okuma ve cevaplar bu dilde; varsayılan site dili, seçim cihazda saklanır
  const [chatLang, setChatLangState] = useState<CL>(() => {
    try {
      const v = localStorage.getItem('vz_assistant_lang') as CL | null;
      if (v && (LANGS as readonly string[]).includes(v)) return v;
    } catch {}
    return ((LANGS as readonly string[]).includes(language) ? language : 'en') as CL;
  });
  const setChatLang = (v: CL) => {
    setChatLangState(v);
    try {
      localStorage.setItem('vz_assistant_lang', v);
    } catch {}
  };
  const cl = (tr: string, en: string, de: string, es: string, ru: string, pt: string) => ({ tr, en, de, es, ru, pt })[chatLang];
  const [msgs, setMsgs] = useState<AssistantMessage[]>([]);
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  // sesli cevap (cihazın en iyi sesi); tercih cihazda saklanır
  const natOk = naturalSupported();
  const ttsOk = canSpeakFn() || natOk;
  const [nat, setNat] = useState(() => naturalStatus(chatLang));
  useEffect(() => {
    setNat(naturalStatus(chatLang));
    return onNaturalStatus((st) => { if (st.lang === chatLang) setNat(st); });
  }, [chatLang]);
  const [speakOn, setSpeakOn] = useState(() => {
    try {
      return localStorage.getItem('vz_assistant_voice') === '1';
    } catch {
      return false;
    }
  });
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceName, setVoiceName] = useState('');
  useEffect(() => {
    if (!ttsOk || !open) return;
    let alive = true;
    loadVoices().then((all) => {
      if (!alive) return;
      const list = voicesFor(all, chatLang);
      setVoices(list);
      const sv = savedVoice(chatLang);
      setVoiceName(sv && sv !== NATURAL_KEY ? sv : `n:${NATURAL_VOICES[chatLang][0][0]}`);
    });
    return () => {
      alive = false;
    };
  }, [chatLang, open, ttsOk]);
  useEffect(() => {
    if (open && speakOn && natOk && (savedVoice(chatLang) || NATURAL_KEY) === NATURAL_KEY) void prepareNatural(chatLang);
  }, [open, speakOn, chatLang, natOk]);
  const toggleSpeak = () => {
    const n = !speakOn;
    setSpeakOn(n);
    try {
      localStorage.setItem('vz_assistant_voice', n ? '1' : '0');
    } catch {}
    if (!n) stopSpeech();
  };
  const say = (text: string, lang: string) => speak(text, ((LANGS as readonly string[]).includes(lang) ? lang : chatLang) as CL);
  useEffect(() => () => stopSpeech(), []);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [msgs, busy]);
  const send = async (text?: string, viaVoice = false) => {
    const t = (text ?? q).trim();
    if (!t || busy) return;
    setQ('');
    stopSpeech();
    if (speakOn) unlockAudio();
    setMsgs((m) => [...m, { id: `u-${Date.now()}`, sender: 'user', text: t, timestamp: new Date() }]);
    setBusy(true);
    try {
      // sesle sorulduysa seçili dilde cevap; yazıldıysa yazılan dil algılanır ve sohbet dili ona geçer
      const lastCountry = [...msgs].reverse().find((m) => m.detectedCountry)?.detectedCountry?.code;
      let r = await processAssistantQuery(t, passport, chatLang, false, lastCountry);
      const rl = (r.detectedLang || chatLang) as CL;
      // Yapay zekâ katmanı (sunucuda anahtar varsa): sitenin cevabını bilgi olarak kullanıp sohbet tadında yazar
      const ai = await askAI(t, r, msgs, passport, rl);
      if (ai) r = { ...r, text: ai };
      if (rl !== chatLang && (LANGS as readonly string[]).includes(rl)) setChatLang(rl);
      setMsgs((m) => [...m, r]);
      if (speakOn) say(r.text, rl);
    } catch {
      setMsgs((m) => [...m, { id: `e-${Date.now()}`, sender: 'assistant', text: cl('Şu an yanıt veremedim, birazdan tekrar dener misin?', 'I couldn’t answer just now, try again in a moment?', 'Gerade keine Antwort möglich.', 'No pude responder ahora.', 'Не удалось ответить.', 'Não consegui responder agora.'), timestamp: new Date() }]);
    } finally {
      setBusy(false);
    }
  };
  const act = (a: AssistantActionPill) => {
    if (a.type === 'open_country' && a.countryCode) {
      if (a.view) { try { sessionStorage.setItem('vz_cview', a.view); } catch {} }
      onClose(); onOpenCountry(a.countryCode);
    }
    else if (a.type === 'open_tile' && a.tab && a.tile) { onClose(); onOpenTool(a.tab, a.tile); }
    else if (a.type === 'goto' && a.path === 'tours') { onClose(); window.location.assign(toursPath(language)); }
    else if (a.type === 'goto' && a.path?.startsWith('/')) { onClose(); window.location.assign(a.path); }
    else if (a.type === 'switch_tab' && a.tabKey) { onClose(); onSelectTab((a.tabKey === 'consular' ? 'nomad' : a.tabKey) as 'explore'); }
    else if (a.type === 'open_tool') {
      onClose();
      if (a.toolKey === 'packing') onOpenTool('nomad', 'pack');
      else if (a.toolKey === 'tipping') onOpenTool('nomad', 'tip');
      else if (a.toolKey === 'overlap') onOpenTool('plan', 'tz');
      else onOpenTool('explore', 'radar');
    } else if (a.type === 'affiliate' && a.url) window.open(a.url, '_blank', 'noopener,noreferrer');
  };
  // mikrofon: kısa duraklamada kesmez; 2,5 sn sessizlikten sonra ya da tekrar basınca gönderir
  const heard = useRef('');
  const silence = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finishMic = () => {
    if (silence.current) clearTimeout(silence.current);
    silence.current = null;
    stopVoiceRecognition();
    setListening(false);
    const t = heard.current.trim();
    heard.current = '';
    if (t) send(t, true);
  };
  const mic = () => {
    if (listening) { finishMic(); return; }
    stopSpeech();
    unlockAudio();
    heard.current = '';
    setQ('');
    setListening(true);
    startVoiceRecognition({
      lang: chatLang,
      continuous: true,
      onResult: (tx) => {
        heard.current = tx;
        setQ(tx);
        if (silence.current) clearTimeout(silence.current);
        silence.current = setTimeout(finishMic, 2500);
      },
      onError: () => { if (silence.current) clearTimeout(silence.current); setListening(false); },
      onEnd: () => { if (heard.current.trim()) finishMic(); else setListening(false); }
    });
  };
  const ideas = [
    cl('Gürcistan’a kimlikle gidilir mi?', 'Do I need a visa for Japan?', 'Brauche ich ein Visum für Japan?', '¿Necesito visado para Japón?', 'Нужна ли виза в Японию?', 'Preciso de visto para o Japão?'),
    cl('İtalya’ya 7 günlük rota', '7-day Italy itinerary', '7 Tage Italien Route', 'Ruta de 7 días por Italia', 'Маршрут по Италии на 7 дней', 'Roteiro de 7 dias pela Itália'),
    cl('Roma’ya en ucuz hangi gün uçarım?', 'Cheapest day to fly to Rome?', 'Günstigster Tag nach Rom?', '¿Día más barato para volar a Roma?', 'Самый дешёвый день до Рима?', 'Dia mais barato para voar para Roma?'),
    cl('Bali’de nerede kalmalıyım?', 'Where should I stay in Bali?', 'Wo übernachten auf Bali?', '¿Dónde alojarme en Bali?', 'Где остановиться на Бали?', 'Onde me hospedar em Bali?'),
    cl('Pasaportumu kaybettim, ne yapmalıyım?', 'I lost my passport, what now?', 'Pass verloren – was tun?', 'Perdí el pasaporte, ¿qué hago?', 'Потерял паспорт, что делать?', 'Perdi o passaporte, o que eu faço?')
  ];
  return (
    <Sheet open={open} onClose={onClose} title={l('Vizamigo asistan', 'Vizamigo assistant', 'Vizamigo-Assistent', 'Asistente Vizamigo', 'Ассистент Vizamigo', 'Assistente Vizamigo')} icon="spark" footer={<>
      {listening && <p className="vz-listen" aria-live="polite">{cl('Dinliyorum… Bitirince 2-3 saniye bekle ya da mikrofona tekrar bas.', 'Listening… When you finish, pause 2–3 seconds or tap the mic again.', 'Ich höre zu… Danach 2–3 Sekunden warten oder erneut tippen.', 'Escuchando… Al terminar, espera 2-3 segundos o pulsa otra vez.', 'Слушаю… Закончив, подождите 2–3 секунды или нажмите ещё раз.', 'Ouvindo… Quando terminar, espere 2-3 segundos ou toque de novo.')}</p>}
      <form className="vz-chat-in" onSubmit={(e) => { e.preventDefault(); if (listening) finishMic(); else send(); }}>
        <label htmlFor="vz-chat-q" className="sr-only">{cl('Sorunu yaz', 'Type your question', 'Frage eingeben', 'Escribe tu pregunta', 'Ваш вопрос', 'Digite sua pergunta')}</label>
        <input id="vz-chat-q" className="vz-input" value={q} onChange={(e) => setQ(e.target.value)} placeholder={cl('Sorunu yaz…', 'Type your question…', 'Frage eingeben…', 'Escribe tu pregunta…', 'Ваш вопрос…', 'Digite sua pergunta…')} autoComplete="off" lang={chatLang} />
        {ttsOk && (
          <button type="button" className={`vz-iconbtn${speakOn ? ' on' : ''}`} onClick={toggleSpeak} aria-pressed={speakOn} aria-label={speakOn ? cl('Sesli cevabı kapat', 'Turn off spoken replies', 'Sprachausgabe aus', 'Desactivar voz', 'Выключить голос', 'Desativar voz') : cl('Cevapları sesli oku', 'Read replies aloud', 'Antworten vorlesen', 'Leer en voz alta', 'Озвучивать ответы', 'Ler em voz alta')} title={speakOn ? cl('Sesli cevap açık', 'Spoken replies on', 'Sprachausgabe an', 'Voz activada', 'Голос включён', 'Voz ativada') : cl('Sesli cevap kapalı', 'Spoken replies off', 'Sprachausgabe aus', 'Voz desactivada', 'Голос выключен', 'Voz desativada')}>
            <Icon name="sound" size={18} duo={false} />
          </button>
        )}
        {isSpeechRecognitionSupported() && (
          <button type="button" className={`vz-iconbtn${listening ? ' on rec' : ''}`} onClick={mic} aria-pressed={listening} aria-label={listening ? cl('Bitti, gönder', 'Done, send', 'Fertig, senden', 'Listo, enviar', 'Готово, отправить', 'Pronto, enviar') : cl('Sesle sor', 'Ask by voice', 'Per Stimme fragen', 'Preguntar por voz', 'Спросить голосом', 'Perguntar por voz')}>
            <Icon name="mic" size={18} duo={false} />
          </button>
        )}
        <Btn type="submit" icon="next" disabled={busy || !q.trim()} aria-label={cl('Gönder', 'Send', 'Senden', 'Enviar', 'Отправить', 'Enviar')} />
      </form>
      </>}>
      <div className="vz-chatbar">
        <div className="vz-langs" role="radiogroup" aria-label={cl('Konuşma dili', 'Conversation language', 'Gesprächssprache', 'Idioma de la conversación', 'Язык разговора', 'Idioma da conversa')}>
          {LANGS.map((x) => (
            <button key={x} type="button" role="radio" aria-checked={chatLang === x} className={chatLang === x ? 'on' : ''} onClick={() => setChatLang(x)}>{x.toUpperCase()}</button>
          ))}
        </div>
        {ttsOk && speakOn && (
          <select className="vz-voice" value={voiceName} aria-label={cl('Ses', 'Voice', 'Stimme', 'Voz', 'Голос', 'Voz')} onChange={(e) => { setVoiceName(e.target.value); saveVoice(chatLang, e.target.value); speak(cl('Merhaba, ben Vizamigo asistanı. Size nasıl yardımcı olabilirim?', 'Hello, I am the Vizamigo assistant. How can I help?', 'Hallo, ich bin der Vizamigo-Assistent. Wie kann ich helfen?', 'Hola, soy el asistente de Vizamigo. ¿En qué puedo ayudarte?', 'Здравствуйте, я ассистент Vizamigo. Чем могу помочь?', 'Olá, sou o assistente da Vizamigo. Como posso ajudar?'), chatLang); }}>
            <optgroup label={cl('Doğal sesler', 'Natural voices', 'Natürliche Stimmen', 'Voces naturales', 'Естественные голоса', 'Vozes naturais')}>
              {NATURAL_VOICES[chatLang].map(([k, n]) => <option key={k} value={`n:${k}`}>{n}</option>)}
            </optgroup>
            {voices.length > 0 && (
              <optgroup label={cl('Cihaz sesleri', 'Device voices', 'Gerätestimmen', 'Voces del dispositivo', 'Голоса устройства', 'Vozes do dispositivo')}>
                {voices.map((v) => <option key={v.name} value={v.name}>{v.name.replace(/^(Microsoft|Google)\s+/, '').replace(/\s*\(.*$/, '').replace(/ - .*$/, '').trim()}</option>)}
              </optgroup>
            )}
          </select>
        )}
      </div>
      <div className="vz-chat">
        {msgs.length === 0 && (
          <div className="vz-stack" style={{ gap: 12 }}>
            <p className="vz-muted">{cl('Vize, rota, uçuş, otel, tur ya da sitedeki araçlar hakkında sor; yazabilir ya da mikrofona basabilirsin. Örneğin:', 'Ask about visas, routes, flights, hotels, tours or the site’s tools; type or tap the microphone. For example:', 'Frag nach Visum, Route, Flügen, Hotels, Touren oder Tools; tippen oder Mikrofon. Zum Beispiel:', 'Pregunta por visados, rutas, vuelos, hoteles, tours o herramientas; escribe o usa el micrófono. Por ejemplo:', 'Спрашивайте о визах, маршрутах, билетах, отелях, экскурсиях и инструментах сайта. Например:', 'Pergunte sobre vistos, roteiros, voos, hotéis, tours ou ferramentas; digite ou use o microfone. Por exemplo:')}</p>
            <div className="vz-stack" style={{ gap: 8 }}>{ideas.map((x) => <button key={x} type="button" className="vz-idea" onClick={() => send(x)}><Icon name="spark" size={16} duo={false} />{x}</button>)}</div>
          </div>
        )}
        {msgs.map((m) => (
          <div key={m.id} className={`vz-msg ${m.sender}`}>
            {m.sender === 'assistant' ? <RichText text={m.text} /> : <p>{m.text}</p>}
            {m.actions && m.actions.length > 0 && (
              <div className="vz-actions">
                {m.actions.slice(0, 4).map((a) => (
                  <Btn key={a.id} variant="soft" small icon={a.type === 'open_country' ? (a.view === 'book' ? 'bed' : 'globe') : a.type === 'affiliate' ? 'external' : 'next'} onClick={() => act(a)}>{stripEmoji(a.label)}{a.type === 'affiliate' && <span className="vz-adtag-s">{cl('reklam', 'ad', 'Anzeige', 'anuncio', 'реклама', 'anúncio')}</span>}</Btn>
                ))}
              </div>
            )}
          </div>
        ))}
        {busy && <div className="vz-msg assistant"><span className="vz-typing"><i /><i /><i /></span></div>}
        <div ref={endRef} />
      </div>
    </Sheet>
  );
};
