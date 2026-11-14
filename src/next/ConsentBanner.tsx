import React, { useEffect, useState } from 'react';
import { useI18n } from '../data/i18n';
import { consentRegion, consentValue, setConsent } from '../utils/consent';

/** AB/İngiltere ziyaretçileri için kısa çerez izni. Seçim yapılana kadar ortaklık izleme ve gömülü vitrinler yüklenmez. */
export const ConsentBanner: React.FC = () => {
  const { l } = useI18n();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (consentRegion() && !consentValue()) setShow(true);
  }, []);
  if (!show) return null;
  const pick = (v: 'all' | 'essential') => {
    setConsent(v);
    setShow(false);
  };
  return (
    <div className="vz-consent" role="dialog" aria-live="polite" aria-label={l('Çerez tercihi', 'Cookie choice', 'Cookie-Auswahl', 'Preferencia de cookies', 'Выбор cookies')}>
      <p>
        {l(
          'Vizamigo ücretsizdir; iş ortaklarımızın (otel, uçak, tur siteleri) çerezleriyle ayakta kalıyoruz. Bunlara ve anonim ziyaret istatistiklerine (Google Analytics) izin verirsen fiyat vitrinleri ve ortak bağlantıları tam çalışır. Reklam profili çıkarmıyoruz.',
          'Vizamigo is free and supported by partner sites (hotels, flights, tours) that use cookies. Allow them and anonymous visit statistics (Google Analytics) to see live price widgets and partner links. We do not build ad profiles.',
          'Vizamigo ist kostenlos und wird von Partnerseiten (Hotels, Flüge, Touren) mit Cookies unterstützt. Erlaube sie und anonyme Besuchsstatistiken (Google Analytics), um Live-Preise und Partnerlinks zu nutzen. Wir erstellen keine Werbeprofile.',
          'Vizamigo es gratis y se financia con socios (hoteles, vuelos, tours) que usan cookies. Permítelas, junto con estadísticas anónimas de visitas (Google Analytics), para ver precios en vivo y enlaces de socios. No creamos perfiles publicitarios.',
          'Vizamigo бесплатен и работает благодаря партнёрам (отели, авиабилеты, туры), которые используют cookies. Разрешите их и анонимную статистику посещений (Google Analytics), чтобы видеть живые цены. Рекламных профилей мы не создаём.'
        )}
      </p>
      <div className="vz-consent-b">
        <button type="button" className="vz-btn vz-btn-ghost sm" onClick={() => pick('essential')}>{l('Sadece gerekli', 'Essential only', 'Nur notwendige', 'Solo necesarias', 'Только необходимые')}</button>
        <button type="button" className="vz-btn vz-btn-primary sm" onClick={() => pick('all')}>{l('Kabul et', 'Accept', 'Akzeptieren', 'Aceptar', 'Принять')}</button>
      </div>
    </div>
  );
};
