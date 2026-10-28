import React, { useState } from 'react';
import { Icon } from './Icon';
import { useI18n } from '../data/i18n';
import { useAuth } from '../context/AuthContext';
import { getCountryName } from '../data/passportData';
import { Btn, Flag, SearchInput } from './ui';
import type { TabKey } from '../components/Navigation';

export type MainTab = 'explore' | 'plan' | 'nomad' | 'track' | 'profile';

export function useNavItems() {
  const { l } = useI18n();
  return [
    { key: 'explore' as MainTab, label: l('Keşfet', 'Explore', 'Entdecken', 'Explorar', 'Обзор'), icon: 'compass' },
    { key: 'plan' as MainTab, label: l('Rota', 'Route', 'Route', 'Ruta', 'Маршрут'), icon: 'route' },
    { key: 'nomad' as MainTab, label: l('Araçlar', 'Tools', 'Tools', 'Herramientas', 'Инструменты'), icon: 'tools' },
    { key: 'track' as MainTab, label: l('Cüzdan', 'Wallet', 'Wallet', 'Cartera', 'Кошелёк'), icon: 'wallet' },
    { key: 'profile' as MainTab, label: l('Profil', 'Profile', 'Profil', 'Perfil', 'Профиль'), icon: 'user' }
  ];
}

const activeMain = (t: TabKey): MainTab => (t === 'consular' ? 'nomad' : (t as MainTab));

interface TopProps {
  activeTab: TabKey;
  onSelectTab: (t: TabKey) => void;
  currentPassport: string;
  visaFreeCount: number;
  onOpenPassport: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onSearch: (q: string) => void;
  onHome: () => void;
}

export const TopBar: React.FC<TopProps> = (p) => {
  const { l, language, setLanguage, languages } = useI18n();
  const { isAuthenticated, user, openAuthModal } = useAuth();
  const items = useNavItems();
  const [q, setQ] = useState('');
  const [drawer, setDrawer] = useState(false);
  const cur = activeMain(p.activeTab);

  return (
    <>
      <header className="vz-top">
        <div className="vz-wrap vz-top-in">
          <button type="button" className="vz-logo" onClick={p.onHome} aria-label="Vizamigo">
            <picture>
              <source srcSet="/logo.webp" type="image/webp" />
              <img src="/logo.png" alt="" width={36} height={36} />
            </picture>
            <b>Vizamigo</b>
          </button>
          <nav className="vz-topnav" aria-label={l('Ana menü', 'Main menu', 'Hauptmenü', 'Menú', 'Меню')}>
            {items.map((it) => (
              <button key={it.key} type="button" aria-current={cur === it.key ? 'page' : undefined} onClick={() => p.onSelectTab(it.key)}>
                {it.label}
              </button>
            ))}
          </nav>
          <span className="vz-top-sp" />
          <form
            className="vz-topsearch"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              p.onSearch(q.trim());
            }}
          >
            <SearchInput id="vz-topq" value={q} onChange={setQ} placeholder={l('Ülke ara…', 'Search a country…', 'Land suchen…', 'Buscar país…', 'Найти страну…')} />
          </form>
          <div className="vz-topact">
            <button type="button" className="vz-pchip" onClick={p.onOpenPassport} aria-label={l('Pasaportu değiştir', 'Change passport', 'Pass wechseln', 'Cambiar pasaporte', 'Сменить паспорт')}>
              <Flag code={p.currentPassport} size="sm" />
              <span className="name">{p.currentPassport}</span>
              <em>{p.visaFreeCount}</em>
            </button>
            <button type="button" className="vz-iconbtn" onClick={p.onToggleTheme} aria-label={p.isDark ? l('Açık tema', 'Light theme', 'Hell', 'Claro', 'Светлая') : l('Koyu tema', 'Dark theme', 'Dunkel', 'Oscuro', 'Тёмная')}>
              <Icon name={p.isDark ? 'sun' : 'moon'} size={19} />
            </button>
            <span className="vz-langsel vz-login">
              <label htmlFor="vz-lang" className="sr-only">{l('Dil', 'Language', 'Sprache', 'Idioma', 'Язык')}</label>
              <select id="vz-lang" value={language} onChange={(e) => setLanguage(e.target.value as typeof language)}>
                {languages.map((x) => (
                  <option key={x.code} value={x.code}>{x.code.toUpperCase()}</option>
                ))}
              </select>
            </span>
            {isAuthenticated ? (
              <Btn variant="soft" small className="vz-login" icon="user" onClick={() => p.onSelectTab('profile')}>
                {user?.name?.split(' ')[0] || l('Hesabım', 'Account', 'Konto', 'Cuenta', 'Аккаунт')}
              </Btn>
            ) : (
              <Btn variant="primary" small className="vz-login" onClick={() => openAuthModal('login')}>
                {l('Giriş yap', 'Sign in', 'Anmelden', 'Entrar', 'Войти')}
              </Btn>
            )}
            <button type="button" className="vz-iconbtn" onClick={() => setDrawer(true)} aria-label={l('Menü', 'Menu', 'Menü', 'Menú', 'Меню')} data-mobile-only>
              <Icon name="menu" size={19} duo={false} />
            </button>
          </div>
        </div>
      </header>

      {drawer && (
        <>
          <div className="vz-drawer-bg" onClick={() => setDrawer(false)} />
          <aside className="vz-drawer" role="dialog" aria-modal="true" aria-label={l('Menü', 'Menu', 'Menü', 'Menú', 'Меню')}>
            <div className="vz-row-flex" style={{ justifyContent: 'space-between' }}>
              <b style={{ fontSize: 18 }}>{l('Menü', 'Menu', 'Menü', 'Menú', 'Меню')}</b>
              <button type="button" className="vz-iconbtn" onClick={() => setDrawer(false)} aria-label={l('Kapat', 'Close', 'Schließen', 'Cerrar', 'Закрыть')}>
                <Icon name="close" size={18} duo={false} />
              </button>
            </div>
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                setDrawer(false);
                p.onSearch(q.trim());
              }}
            >
              <SearchInput id="vz-drawerq" value={q} onChange={setQ} placeholder={l('Ülke ara…', 'Search a country…', 'Land suchen…', 'Buscar país…', 'Найти страну…')} />
            </form>
            <div className="vz-list">
              <button type="button" className="vz-row link" onClick={() => { setDrawer(false); p.onOpenPassport(); }}>
                <Flag code={p.currentPassport} size="sm" />
                <span className="vz-row-b"><span className="vz-row-t">{getCountryName(p.currentPassport, language)}</span><span className="vz-row-s">{l('Pasaportu değiştir', 'Change passport', 'Pass wechseln', 'Cambiar pasaporte', 'Сменить паспорт')}</span></span>
                <Icon name="next" size={18} duo={false} className="vz-row-go" />
              </button>
              <div className="vz-row">
                <span className="vz-ic sm"><Icon name="lang" size={18} /></span>
                <span className="vz-row-b"><span className="vz-row-t">{l('Dil', 'Language', 'Sprache', 'Idioma', 'Язык')}</span></span>
                <select className="vz-select" style={{ width: 'auto', minHeight: 38 }} value={language} onChange={(e) => setLanguage(e.target.value as typeof language)} aria-label={l('Dil', 'Language', 'Sprache', 'Idioma', 'Язык')}>
                  {languages.map((x) => (
                    <option key={x.code} value={x.code}>{x.nativeName}</option>
                  ))}
                </select>
              </div>
              <button type="button" className="vz-row link" onClick={p.onToggleTheme}>
                <span className="vz-ic sm"><Icon name={p.isDark ? 'sun' : 'moon'} size={18} /></span>
                <span className="vz-row-b"><span className="vz-row-t">{p.isDark ? l('Açık temaya geç', 'Switch to light', 'Helles Design', 'Tema claro', 'Светлая тема') : l('Koyu temaya geç', 'Switch to dark', 'Dunkles Design', 'Tema oscuro', 'Тёмная тема')}</span></span>
              </button>
            </div>
            {isAuthenticated ? (
              <Btn variant="soft" block icon="user" onClick={() => { setDrawer(false); p.onSelectTab('profile'); }}>{user?.name || l('Hesabım', 'Account', 'Konto', 'Cuenta', 'Аккаунт')}</Btn>
            ) : (
              <Btn variant="primary" block onClick={() => { setDrawer(false); openAuthModal('login'); }}>{l('Giriş yap', 'Sign in', 'Anmelden', 'Entrar', 'Войти')}</Btn>
            )}
          </aside>
        </>
      )}
    </>
  );
};

export const BottomNav: React.FC<{ activeTab: TabKey; onSelectTab: (t: TabKey) => void }> = ({ activeTab, onSelectTab }) => {
  const items = useNavItems();
  const { l } = useI18n();
  const cur = activeMain(activeTab);
  return (
    <nav className="vz-bnav" aria-label={l('Alt menü', 'Bottom menu', 'Untere Navigation', 'Menú inferior', 'Нижнее меню')}>
      <div className="vz-bnav-in">
        {items.map((it) => (
          <button key={it.key} type="button" aria-current={cur === it.key ? 'page' : undefined} onClick={() => onSelectTab(it.key)}>
            <Icon name={it.icon} size={22} />
            <span>{it.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export const Footer: React.FC<{ onSelectTab: (t: TabKey) => void; onOpenInfo: (page: string) => void; onOpenTool: (tab: TabKey, tile: string) => void }> = ({ onSelectTab, onOpenInfo, onOpenTool }) => {
  const { l, language, setLanguage, languages } = useI18n();
  const cols: { h: string; items: { label: string; go: () => void }[] }[] = [
    {
      h: l('Keşfet', 'Explore', 'Entdecken', 'Explorar', 'Обзор'),
      items: [
        { label: l('Nereye gidebilirim?', 'Where can I go?', 'Wohin kann ich?', '¿Dónde puedo ir?', 'Куда можно?'), go: () => onOpenTool('explore', 'where') },
        { label: l('Pasaport karşılaştır', 'Compare passports', 'Pässe vergleichen', 'Comparar pasaportes', 'Сравнить паспорта'), go: () => onOpenTool('explore', 'compare') },
        { label: l('Rota planlayıcı', 'Route planner', 'Routenplaner', 'Planificador', 'Маршрут'), go: () => onOpenTool('plan', 'planner') },
        { label: l('Schengen 90/180', 'Schengen 90/180', 'Schengen 90/180', 'Schengen 90/180', 'Шенген 90/180'), go: () => onOpenTool('track', 'days') }
      ]
    },
    {
      h: l('Destek', 'Support', 'Hilfe', 'Ayuda', 'Помощь'),
      items: [
        { label: l('Acil durum', 'Emergency', 'Notfall', 'Emergencia', 'Экстренно'), go: () => onOpenTool('nomad', 'sos') },
        { label: l('Pasaport kaybı', 'Lost passport', 'Passverlust', 'Pasaporte perdido', 'Утеря паспорта'), go: () => onOpenInfo('passport_lost') },
        { label: l('Vize reddine itiraz', 'Visa appeals', 'Visum-Widerspruch', 'Apelación', 'Апелляция'), go: () => onOpenInfo('appeals') },
        { label: l('İletişim', 'Contact', 'Kontakt', 'Contacto', 'Контакты'), go: () => onOpenInfo('press') }
      ]
    },
    {
      h: l('Vizamigo', 'Vizamigo', 'Vizamigo', 'Vizamigo', 'Vizamigo'),
      items: [
        { label: l('Hakkımızda', 'About us', 'Über uns', 'Sobre nosotros', 'О нас'), go: () => onOpenInfo('mission') },
        { label: l('Kullanım koşulları', 'Terms', 'Nutzungsbedingungen', 'Términos', 'Условия'), go: () => onOpenInfo('terms') },
        { label: l('Gizlilik', 'Privacy', 'Datenschutz', 'Privacidad', 'Конфиденциальность'), go: () => onOpenInfo('privacy') },
        { label: l('Kaynaklarımız', 'Our sources', 'Quellen', 'Fuentes', 'Источники'), go: () => onOpenInfo('standards') }
      ]
    }
  ];
  return (
    <footer className="vz-foot">
      <div className="vz-wrap vz-foot-in">
        <div className="vz-stack" style={{ gap: 10 }}>
          <button type="button" className="vz-logo" onClick={() => onSelectTab('explore')}>
            <picture>
              <source srcSet="/logo.webp" type="image/webp" />
              <img src="/logo.png" alt="" width={36} height={36} loading="lazy" />
            </picture>
            <b>Vizamigo</b>
          </button>
          <p className="vz-muted" style={{ fontSize: 14, maxWidth: '38ch' }}>
            {l('199 ülkenin vize kuralları, kalış süreleri ve yolculuk hazırlığı. Resmî kaynaklardan, tarihleriyle, beş dilde.', 'Visa rules, stay limits and trip prep for 199 countries. From official sources, dated, in five languages.', 'Visaregeln und Reisevorbereitung für 199 Länder, amtlich belegt, in fünf Sprachen.', 'Reglas de visado y preparación de viajes para 199 países, con fuentes oficiales, en cinco idiomas.', 'Визовые правила и подготовка к поездке для 199 стран, по официальным источникам, на пяти языках.')}
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <h4>{c.h}</h4>
            <ul>
              {c.items.map((it) => (
                <li key={it.label}><button type="button" onClick={it.go}>{it.label}</button></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="vz-wrap">
        <div className="vz-foot-bottom">
          <span>© {new Date().getFullYear()} Vizamigo</span>
          <div className="vz-chips">
            {languages.map((x) => (
              <button key={x.code} type="button" className={`vz-chip${language === x.code ? ' on' : ''}`} onClick={() => setLanguage(x.code)} aria-pressed={language === x.code}>
                {x.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export const AssistantFab: React.FC<{ onClick: () => void; hidden?: boolean }> = ({ onClick, hidden }) => {
  const { l } = useI18n();
  if (hidden) return null;
  return (
    <button type="button" className="vz-fab" onClick={onClick} aria-label={l('Vizamigo asistanına sor', 'Ask the Vizamigo assistant', 'Vizamigo-Assistent fragen', 'Preguntar al asistente', 'Спросить ассистента')}>
      <Icon name="spark" size={24} />
      <span>{l('Sor', 'Ask', 'Fragen', 'Preguntar', 'Спросить')}</span>
    </button>
  );
};
