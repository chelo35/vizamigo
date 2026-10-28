import React, { useEffect } from 'react';
import { useI18n } from '../data/i18n';
import { LegalInfoModal } from '../components/LegalInfoModal';
import { Chip, Chips, Page } from './ui';
import { Icon } from './Icon';

export function useInfoGroups() {
  const { l } = useI18n();
  return [
    { id: 'legal', icon: 'shield', label: l('Yasal', 'Legal', 'Rechtliches', 'Legal', 'Правовое'), items: [['terms', l('Kullanım koşulları', 'Terms', 'Nutzungsbedingungen', 'Términos', 'Условия')], ['privacy', l('Gizlilik', 'Privacy', 'Datenschutz', 'Privacidad', 'Конфиденциальность')], ['disclaimer', l('Sorumluluk reddi', 'Disclaimer', 'Haftung', 'Descargo', 'Отказ')], ['kvkk_gdpr', 'KVKK & GDPR'], ['standards', l('Kaynaklar', 'Sources', 'Quellen', 'Fuentes', 'Источники')], ['attributions', l('Görseller', 'Photos', 'Bilder', 'Fotos', 'Фото')]] },
    { id: 'help', icon: 'sos', label: l('Destek', 'Support', 'Hilfe', 'Ayuda', 'Помощь'), items: [['appeals', l('Vize reddi itirazı', 'Visa appeals', 'Widerspruch', 'Apelación', 'Апелляция')], ['passport_lost', l('Pasaport kaybı', 'Lost passport', 'Passverlust', 'Pasaporte perdido', 'Утеря')], ['crisis', l('Kriz masası', 'Crisis desk', 'Krisenstab', 'Crisis', 'Кризис')], ['transit', l('Transit', 'Transit', 'Transit', 'Tránsito', 'Транзит')]] },
    { id: 'partners', icon: 'people', label: l('İş ortakları', 'Partners', 'Partner', 'Socios', 'Партнёры'), items: [['partners', l('Acenteler', 'Agencies', 'Agenturen', 'Agencias', 'Агентства')], ['airlines', l('Havayolları', 'Airlines', 'Airlines', 'Aerolíneas', 'Авиа')], ['insurance', l('Sigorta', 'Insurance', 'Versicherung', 'Seguro', 'Страховка')], ['community', l('Topluluk', 'Community', 'Community', 'Comunidad', 'Сообщество')], ['api', l('Kurumsal API', 'Business API', 'Business-API', 'API empresas', 'API')]] },
    { id: 'about', icon: 'info', label: l('Hakkımızda', 'About', 'Über uns', 'Nosotros', 'О нас'), items: [['mission', l('Misyon', 'Mission', 'Mission', 'Misión', 'Миссия')], ['sustainability', l('Sürdürülebilirlik', 'Sustainability', 'Nachhaltigkeit', 'Sostenibilidad', 'Экология')], ['careers', l('Kariyer', 'Careers', 'Karriere', 'Empleo', 'Карьера')], ['press', l('İletişim', 'Contact', 'Kontakt', 'Contacto', 'Контакты')], ['backup', l('Veri yedeği', 'Backup', 'Backup', 'Copia', 'Копия')]] }
  ] as { id: string; icon: string; label: string; items: [string, string][] }[];
}

/** Bilgi merkezi: her konu kendi adresinde (/:dil/info/:sayfa), solda içindekiler. */
export const InfoPage: React.FC<{ page: string; onPage: (p: string) => void; onBack: () => void; onDataChanged: () => void }> = ({ page, onPage, onBack, onDataChanged }) => {
  const { l } = useI18n();
  const groups = useInfoGroups();
  const grp = groups.find((g) => g.items.some(([id]) => id === page)) || groups[0];
  const title = grp.items.find(([id]) => id === page)?.[1] || grp.label;
  useEffect(() => {
    try {
      document.title = `${title} | Vizamigo`;
    } catch {}
  }, [title]);
  return (
    <Page
      eyebrow={`${l('Bilgi merkezi', 'Help centre', 'Hilfezentrum', 'Centro de ayuda', 'Справка')} · ${grp.label}`}
      title={title}
      words={['Help', 'Privacy', 'Sources', 'Support']}
      back={{ label: l('Keşfet', 'Explore', 'Entdecken', 'Explorar', 'Обзор'), onClick: onBack }}
    >
      <div className="vz-info">
        <nav className="vz-info-nav" aria-label={l('Bilgi merkezi içindekiler', 'Help centre contents', 'Inhalt', 'Contenido', 'Содержание')}>
          {groups.map((g) => (
            <div key={g.id} className="vz-info-grp">
              <span className="vz-info-grp-h"><Icon name={g.icon} size={16} />{g.label}</span>
              {g.items.map(([id, t]) => (
                <a
                  key={id}
                  href={`info/${id}`}
                  className={id === page ? 'on' : undefined}
                  aria-current={id === page ? 'page' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    onPage(id);
                  }}
                >
                  {t}
                </a>
              ))}
            </div>
          ))}
        </nav>
        <div className="vz-info-mnav">
          <Chips scroll>
            {grp.items.map(([id, t]) => <Chip key={id} on={id === page} onClick={() => onPage(id)}>{t}</Chip>)}
          </Chips>
          <Chips scroll>
            {groups.filter((g) => g.id !== grp.id).map((g) => <Chip key={g.id} icon={g.icon} onClick={() => onPage(g.items[0][0])}>{g.label}</Chip>)}
          </Chips>
        </div>
        <article className="vz-card vz-info-body">
          <LegalInfoModal key={page} isOpen embedded onClose={onBack} initialTab={page} onDataResetOrImported={onDataChanged} />
        </article>
      </div>
    </Page>
  );
};
