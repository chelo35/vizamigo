import React, { useEffect, useState } from 'react';

import { useI18n } from '../data/i18n';
import { Btn, Card } from './ui';

let ready: Promise<boolean> | null = null;
const alertsReady = () => (ready ||= fetch('/api/alerts?a=ping').then((r) => r.json()).then((j) => !!j.ok).catch(() => false));

/** "Bu ülkeyi takip et": vize kuralı ya da resmî uyarı değişince ücretsiz e-posta. */
export const FollowCountry: React.FC<{ code: string; name: string; passport: string }> = ({ code, name, passport }) => {
  const { l, language } = useI18n();
  const [email, setEmail] = useState(() => {
    try {
      return localStorage.getItem('vz_follow_email') || '';
    } catch {
      return '';
    }
  });
  const [state, setState] = useState<'idle' | 'busy' | 'sent' | 'already' | 'err'>('idle');
  const [on, setOn] = useState(false);
  useEffect(() => {
    alertsReady().then(setOn);
  }, []);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === 'busy') return;
    setState('busy');
    try {
      const r = await fetch('/api/alerts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, country: code, passport, lang: language }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error();
      try {
        localStorage.setItem('vz_follow_email', email);
      } catch {}
      setState(j.confirmed ? 'already' : 'sent');
    } catch {
      setState('err');
    }
  };
  if (!on) return null; // sunucu tarafı kurulmadıysa gösterme
  return (
    <Card icon="bell" title={l(`${name} için değişiklik olunca haber ver`, `Get notified when ${name} changes`, `Benachrichtigen, wenn sich ${name} ändert`, `Avísame si cambia ${name}`, `Сообщить об изменениях: ${name}`)}>
      {state === 'sent' ? (
        <p role="status">{l('Onay e-postası gönderdik. E-postadaki düğmeye basınca takip başlar.', 'We sent a confirmation email. Tap the button in it to start.', 'Bestätigungs-E-Mail gesendet. Bitte den Button darin antippen.', 'Te enviamos un correo de confirmación. Pulsa el botón para activar.', 'Мы отправили письмо. Нажмите кнопку в нём, чтобы подтвердить.')}</p>
      ) : state === 'already' ? (
        <p role="status">{l('Bu ülkeyi zaten takip ediyorsun.', 'You already follow this country.', 'Du folgst diesem Land bereits.', 'Ya sigues este país.', 'Вы уже подписаны.')}</p>
      ) : (
        <form className="vz-follow" onSubmit={submit}>
          <p className="vz-muted">{l('Vize kuralı ya da resmî seyahat uyarısı değişince ücretsiz e-posta gönderelim. İstediğin zaman tek tıkla bırakabilirsin.', 'We email you for free when the visa rule or official travel advisory changes. Unsubscribe anytime in one click.', 'Kostenlose E-Mail bei Änderung von Visumregel oder Reisehinweis. Jederzeit abbestellbar.', 'Te avisamos gratis si cambian el visado o el aviso oficial. Cancela cuando quieras.', 'Бесплатно напишем при изменении визы или предупреждения. Отписка в один клик.')}</p>
          <div className="vz-follow-row">
            <label htmlFor={`vz-follow-${code}`} className="sr-only">{l('E-posta adresin', 'Your email', 'Deine E-Mail', 'Tu email', 'Ваш email')}</label>
            <input id={`vz-follow-${code}`} type="email" required className="vz-input" placeholder={l('E-posta adresin', 'Your email', 'Deine E-Mail', 'Tu email', 'Ваш email')} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            <Btn type="submit" icon="bell" disabled={state === 'busy'}>{state === 'busy' ? '…' : l('Takip et', 'Follow', 'Folgen', 'Seguir', 'Следить')}</Btn>
          </div>
          {state === 'err' && <p className="vz-muted" role="alert">{l('Şu an kaydedemedik, birazdan tekrar dener misin?', 'Could not save right now, please try again shortly.', 'Gerade nicht möglich, bitte später erneut.', 'No se pudo guardar, inténtalo luego.', 'Не удалось сохранить, попробуйте позже.')}</p>}
        </form>
      )}
    </Card>
  );
};
