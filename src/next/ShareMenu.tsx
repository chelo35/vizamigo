import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '../data/i18n';
import { Btn } from './ui';

/** Paylaş menüsü: WhatsApp, Telegram, Facebook, Instagram, TikTok, X, e-posta, bağlantıyı kopyala. */
export const ShareMenu: React.FC<{ title: string; text?: string; url?: string }> = ({ title, text, url }) => {
  const { l } = useI18n();
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const off = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', off);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', off); document.removeEventListener('keydown', esc); };
  }, [open]);
  const link = () => url || window.location.href;
  const msg = () => `${text || title} ${link()}`;
  const go = (u: string) => window.open(u, '_blank', 'noopener,noreferrer');
  const copy = async (after?: string) => {
    try {
      await navigator.clipboard.writeText(link());
      setNote(after || l('Bağlantı kopyalandı', 'Link copied', 'Link kopiert', 'Enlace copiado', 'Ссылка скопирована'));
    } catch {
      setNote(link());
    }
    setTimeout(() => setNote(''), 3500);
  };
  // Instagram ve TikTok'un web paylaşım adresi yok: telefonda sistem paylaşım menüsü açılır, bilgisayarda bağlantı kopyalanır
  const app = async (name: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: text || title, url: link() });
        return;
      } catch {
        return;
      }
    }
    await copy(l(`Bağlantı kopyalandı, ${name}'da yapıştırabilirsin`, `Link copied, paste it in ${name}`, `Link kopiert – in ${name} einfügen`, `Enlace copiado, pégalo en ${name}`, `Ссылка скопирована, вставьте в ${name}`));
  };
  const items: Array<[string, string, () => void]> = [
    ['WhatsApp', '#25D366', () => go(`https://wa.me/?text=${encodeURIComponent(msg())}`)],
    ['Telegram', '#229ED9', () => go(`https://t.me/share/url?url=${encodeURIComponent(link())}&text=${encodeURIComponent(text || title)}`)],
    ['Facebook', '#1877F2', () => go(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link())}`)],
    ['Instagram', '#E1306C', () => void app('Instagram')],
    ['TikTok', '#111111', () => void app('TikTok')],
    ['X', '#111111', () => go(`https://x.com/intent/post?text=${encodeURIComponent(text || title)}&url=${encodeURIComponent(link())}`)],
    [l('E-posta', 'Email', 'E-Mail', 'Email', 'Email'), '#0d6e78', () => { window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(msg())}`; }],
    [l('Bağlantıyı kopyala', 'Copy link', 'Link kopieren', 'Copiar enlace', 'Копировать ссылку'), '#5b6b73', () => void copy()]
  ];
  return (
    <div className="vz-share" ref={ref}>
      <Btn variant="soft" icon="share" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="menu">
        {l('Paylaş', 'Share', 'Teilen', 'Compartir', 'Поделиться')}
      </Btn>
      {open && (
        <div className="vz-share-pop" role="menu">
          {items.map(([n, c, fn]) => (
            <button key={n} type="button" role="menuitem" onClick={() => { fn(); if (!/Instagram|TikTok|kopyala|Copy|kopieren|Copiar|Копировать/.test(n)) setOpen(false); }}>
              <i style={{ background: c }} aria-hidden="true" />
              {n}
            </button>
          ))}
          {note && <p className="vz-share-note" role="status">{note}</p>}
        </div>
      )}
    </div>
  );
};
