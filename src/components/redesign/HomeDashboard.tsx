import React, { lazy, useMemo, useState } from 'react';
import { useI18n } from '../../data/i18n';
import { SeaHero } from './SeaHero';
import { LiveStrip, loadDestination } from './LiveStrip';
import { PassportCover } from './PassportCover';
import { HubGrid, Hub } from './HubGrid';
import { getPassportItems } from '../../utils/calculator';
import { getCountryName } from '../../data/passportData';
import { ALL_WORLD_HUBS, flagToIso } from '../../data/worldHubs';
import { GEO_DATA } from '../../data/geoData';

const WhereCanIGoTab = lazy(() => import('../WhereCanIGoTab').then((m) => ({ default: m.WhereCanIGoTab })));
const CompareTab = lazy(() => import('../CompareTab').then((m) => ({ default: m.CompareTab })));
const DayCounterTab = lazy(() => import('../DayCounterTab').then((m) => ({ default: m.DayCounterTab })));
const WalletTab = lazy(() => import('../WalletTab').then((m) => ({ default: m.WalletTab })));
const RoutePlannerTab = lazy(() => import('../RoutePlannerTab').then((m) => ({ default: m.RoutePlannerTab })));
const NomadToolsTab = lazy(() => import('../NomadToolsTab').then((m) => ({ default: m.NomadToolsTab })));

interface Props {
  currentPassport: string;
  secondaryPassport: string;
  onSearch: (q: string) => void;
  onOpenPassportSelector: () => void;
  onOpenCountry: (code: string) => void;
  onOpenAuditConsole: () => void;
  onOpenPackingList: () => void;
  onOpenTippingCalc: () => void;
  onOpenTimezoneOverlap: () => void;
  onOpenGlobalRadar: (mode?: 'all' | 'clock' | 'weather' | 'currency', city?: string) => void;
}

const Ic = ({ d, fill }: { d: string; fill?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {fill && <path d={fill} className="rd-ic-fill" stroke="none" />}
    <path d={d} />
  </svg>
);

const Launcher: React.FC<{ title: string; text: string; cta: string; onClick: () => void }> = ({ title, text, cta, onClick }) => (
  <div className="rd-launch">
    <div>
      <div className="rd-launch-t">{title}</div>
      <p className="rd-sub">{text}</p>
    </div>
    <button type="button" className="rd-btn" onClick={onClick}>{cta}</button>
  </div>
);

export const HomeDashboard: React.FC<Props> = (p) => {
  const { l, language } = useI18n();
  const [destination, setDestination] = useState<string>(() => loadDestination());
  const [openReq, setOpenReq] = useState<{ id: string; tab?: string; nonce: number } | null>(null);
  const openHub = (id: string, tab?: string) => setOpenReq({ id, tab, nonce: Date.now() });

  const changeDest = (c: string) => {
    setDestination(c);
    try {
      localStorage.setItem('vz_destination_v1', c);
    } catch {}
  };

  const counts = useMemo(() => {
    const items = getPassportItems(p.currentPassport);
    let free = 0, easy = 0, visa = 0;
    items.forEach((it) => {
      if (it.cat === 'free' || it.id) free++;
      else if (it.cat === 'evisa' || it.cat === 'voa' || it.cat === 'eta') easy++;
      else if (it.cat === 'visa') visa++;
    });
    return { free, easy, visa, total: items.length || 1 };
  }, [p.currentPassport]);

  const destCity = useMemo(() => {
    const geo = GEO_DATA[destination];
    const hubs = ALL_WORLD_HUBS.filter((h) => (h.iso || flagToIso(h.flag)) === destination);
    return (hubs.find((h) => geo && h.city === geo.capital) || hubs[0])?.city;
  }, [destination]);

  const passName = getCountryName(p.currentPassport, language);
  const destName = getCountryName(destination, language);

  const hubs: Hub[] = [
    {
      id: 'passport',
      title: l('Pasaportum', 'My passport', 'Mein Pass', 'Mi pasaporte', 'Мой паспорт'),
      sub: l('Nereye gidebilirim · Karşılaştır · Çifte pasaport', 'Where can I go · Compare · Dual passport', 'Wohin · Vergleich · Doppelpass', 'Dónde ir · Comparar · Doble pasaporte', 'Куда можно · Сравнить · Два паспорта'),
      badge: `${counts.free} ${l('vizesiz', 'visa-free', 'visumfrei', 'sin visado', 'без визы')}`,
      icon: <Ic fill="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM9 10h6M8.5 17h7" />,
      tabs: [
        { id: 'where', label: l('Nereye gidebilirim', 'Where can I go', 'Wohin kann ich', 'Dónde puedo ir', 'Куда можно'), render: () => <WhereCanIGoTab currentPassport={p.currentPassport} /> },
        { id: 'compare', label: l('Pasaport karşılaştır', 'Compare passports', 'Pässe vergleichen', 'Comparar pasaportes', 'Сравнить паспорта'), render: () => <CompareTab initialPassportA={p.currentPassport} initialPassportB={p.secondaryPassport} /> },
        {
          id: 'change',
          label: l('Pasaportu değiştir', 'Change passport', 'Pass ändern', 'Cambiar pasaporte', 'Сменить паспорт'),
          render: () => (
            <Launcher
              title={l(`Şu an: ${passName}`, `Current: ${passName}`, `Aktuell: ${passName}`, `Actual: ${passName}`, `Сейчас: ${passName}`)}
              text={l('Pasaportunu değiştirdiğinde bütün panolar, kapak ve vize sayıları yeniden hesaplanır. Çifte pasaportun varsa ikincisini Profil’den ekle.', 'Changing your passport recalculates every panel, the cover and the visa counts. Add a second passport in Profile.', 'Beim Wechsel werden alle Bereiche neu berechnet.', 'Al cambiarlo se recalculan todos los paneles.', 'При смене паспорта всё пересчитывается.')}
              cta={l('Pasaport seç', 'Choose passport', 'Pass wählen', 'Elegir pasaporte', 'Выбрать паспорт')}
              onClick={p.onOpenPassportSelector}
            />
          )
        }
      ]
    },
    {
      id: 'stay',
      title: l('Vize & Süreler', 'Visas & stays', 'Visa & Aufenthalt', 'Visados y estancias', 'Визы и сроки'),
      sub: l('Schengen 90/180 · Geri sayım · Kural değişiklikleri', 'Schengen 90/180 · Countdowns · Rule changes', 'Schengen 90/180 · Fristen · Änderungen', 'Schengen 90/180 · Plazos · Cambios', 'Шенген 90/180 · Сроки · Изменения'),
      icon: <Ic fill="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z" d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 7.5V12l3.2 2" />,
      tabs: [
        { id: 'schengen', label: l('Schengen 90/180', 'Schengen 90/180', 'Schengen 90/180', 'Schengen 90/180', 'Шенген 90/180'), render: () => <DayCounterTab /> },
        { id: 'wallet', label: l('Vizelerim & süreler', 'My visas & dates', 'Meine Visa', 'Mis visados', 'Мои визы'), render: () => <WalletTab currentPassport={p.currentPassport} secondaryPassport={p.secondaryPassport} onChangePassport={p.onOpenPassportSelector} onSelectStayTracker={() => openHub('stay', 'schengen')} /> },
        {
          id: 'rules',
          label: l('Kural değişiklikleri', 'Rule changes', 'Regeländerungen', 'Cambios de reglas', 'Изменения правил'),
          render: () => (
            <Launcher
              title={l('Denetim masası', 'Regulation audit desk', 'Prüfpult', 'Mesa de auditoría', 'Проверка правил')}
              text={l('Son değişen vize kuralları, kaynakları ve doğrulama tarihleri. Bir hata görürsen buradan bildirebilirsin.', 'Recently changed visa rules with sources and verification dates. Report a mistake from here.', 'Geänderte Visaregeln mit Quellen.', 'Reglas cambiadas con fuentes.', 'Изменения правил с источниками.')}
              cta={l('Değişiklikleri gör', 'See changes', 'Änderungen ansehen', 'Ver cambios', 'Смотреть')}
              onClick={p.onOpenAuditConsole}
            />
          )
        }
      ]
    },
    {
      id: 'prep',
      title: l('Yolculuk Hazırlığı', 'Trip prep', 'Reisevorbereitung', 'Preparar viaje', 'Подготовка'),
      sub: l('Evrak listesi · Bavul · Priz, para, eSIM', 'Documents · Packing · Plugs, money, eSIM', 'Dokumente · Packliste · Stecker, Geld', 'Documentos · Maleta · Enchufes, dinero', 'Документы · Багаж · Розетки, деньги'),
      icon: <Ic fill="M6 8h12a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3z" d="M6 8h12a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3zM9 8V6a3 3 0 0 1 6 0v2M3 13h18" />,
      tabs: [
        {
          id: 'docs',
          label: l('Evrak listesi', 'Documents', 'Dokumente', 'Documentos', 'Документы'),
          render: () => (
            <Launcher
              title={l(`${destName} için evrak listesi`, `Documents for ${destName}`, `Dokumente für ${destName}`, `Documentos para ${destName}`, `Документы: ${destName}`)}
              text={l('Pasaport geçerliliği, vize/e-vize, bilet, konaklama, sigorta ve ülkeye özel şartlar; ülke dosyasındaki kontrol listesinden işaretleyerek ilerle.', 'Passport validity, visa, tickets, accommodation, insurance and country-specific rules — tick them off in the country file.', 'Pass, Visum, Tickets, Unterkunft, Versicherung.', 'Pasaporte, visado, billetes, alojamiento, seguro.', 'Паспорт, виза, билеты, жильё, страховка.')}
              cta={l('Kontrol listesini aç', 'Open checklist', 'Checkliste öffnen', 'Abrir lista', 'Открыть список')}
              onClick={() => p.onOpenCountry(destination)}
            />
          )
        },
        {
          id: 'pack',
          label: l('Bavul listesi', 'Packing list', 'Packliste', 'Lista de maleta', 'Список вещей'),
          render: () => (
            <Launcher
              title={l('Akıllı bavul', 'Smart packing list', 'Smarte Packliste', 'Maleta inteligente', 'Умный список')}
              text={l('Hedefe, mevsime ve yolculuk tipine göre hazırlanan liste; işaretlediklerin bu cihazda saklanır.', 'A list built for your destination, season and trip type; ticks are saved on this device.', 'Liste nach Ziel und Saison.', 'Lista según destino y temporada.', 'Список по стране и сезону.')}
              cta={l('Bavulu aç', 'Open packing list', 'Packliste öffnen', 'Abrir maleta', 'Открыть')}
              onClick={p.onOpenPackingList}
            />
          )
        },
        {
          id: 'arrive',
          label: l('Varışta', 'On arrival', 'Bei Ankunft', 'Al llegar', 'По прилёте'),
          render: () => (
            <Launcher
              title={l(`${destName}: saat, hava, kur`, `${destName}: time, weather, money`, `${destName}: Zeit, Wetter, Geld`, `${destName}: hora, tiempo, dinero`, `${destName}: время, погода, деньги`)}
              text={l('Şehir şehir canlı saat, hava ve döviz; varmadan bakman gerekenler tek ekranda.', 'Live time, weather and currency city by city.', 'Live-Zeit, Wetter und Währung.', 'Hora, tiempo y moneda en vivo.', 'Время, погода и валюта онлайн.')}
              cta={l('Dünya radarını aç', 'Open world radar', 'Weltradar öffnen', 'Abrir radar', 'Открыть радар')}
              onClick={() => p.onOpenGlobalRadar('all', destCity)}
            />
          )
        }
      ]
    },
    {
      id: 'onroad',
      title: l('Yoldayken', 'On the road', 'Unterwegs', 'En ruta', 'В пути'),
      sub: l('Acil hatlar · Konsolosluk · Bahşiş · Döviz', 'Emergency · Consulate · Tipping · Currency', 'Notruf · Konsulat · Trinkgeld', 'Emergencias · Consulado · Propinas', 'Экстренные · Консульство · Чаевые'),
      icon: <Ic fill="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z" d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 3v5M12 16v5M3 12h5M16 12h5" />,
      tabs: [
        { id: 'sos', label: l('Acil & konsolosluk', 'Emergency & consulate', 'Notfall & Konsulat', 'Emergencias', 'Экстренные'), render: () => <NomadToolsTab defaultSubTab="emergency" currentPassport={p.currentPassport} /> },
        {
          id: 'tip',
          label: l('Bahşiş', 'Tipping', 'Trinkgeld', 'Propinas', 'Чаевые'),
          render: () => (
            <Launcher
              title={l('Bahşiş hesaplayıcı', 'Tipping calculator', 'Trinkgeldrechner', 'Calculadora de propinas', 'Калькулятор чаевых')}
              text={l('Ülkeye göre restoran, taksi ve otel bahşiş alışkanlıkları ve tutar hesabı.', 'Restaurant, taxi and hotel tipping norms by country.', 'Trinkgeldregeln je Land.', 'Costumbres de propina por país.', 'Нормы чаевых по странам.')}
              cta={l('Hesapla', 'Calculate', 'Berechnen', 'Calcular', 'Рассчитать')}
              onClick={p.onOpenTippingCalc}
            />
          )
        },
        {
          id: 'fx',
          label: l('Döviz', 'Currency', 'Währung', 'Divisas', 'Валюта'),
          render: () => (
            <Launcher
              title={l('Döviz çevirici', 'Currency converter', 'Währungsrechner', 'Conversor', 'Конвертер')}
              text={l('Canlı kurlarla 150’den fazla para birimi.', 'Live rates for 150+ currencies.', 'Live-Kurse für 150+ Währungen.', 'Tipos en vivo para 150+ monedas.', 'Курсы 150+ валют.')}
              cta={l('Çeviriciyi aç', 'Open converter', 'Öffnen', 'Abrir', 'Открыть')}
              onClick={() => p.onOpenGlobalRadar('currency')}
            />
          )
        }
      ]
    },
    {
      id: 'explore',
      title: l('Keşfet & Rota', 'Explore & route', 'Entdecken & Route', 'Explorar y ruta', 'Маршрут'),
      sub: l('Rota planı · Transit · Dünya saatleri', 'Route planner · Transit · World clocks', 'Routenplaner · Transit · Weltzeit', 'Ruta · Tránsito · Relojes', 'Маршрут · Транзит · Часы'),
      badge: l('199 ülke', '199 countries', '199 Länder', '199 países', '199 стран'),
      icon: <Ic fill="m3 7 6-3 6 3 6-3v13l-6 3-6-3-6 3z" d="m3 7 6-3 6 3 6-3v13l-6 3-6-3-6 3zM9 4v13M15 7v13" />,
      tabs: [
        { id: 'route', label: l('Rota planı', 'Route planner', 'Routenplaner', 'Planificador', 'Маршрут'), render: () => <RoutePlannerTab currentPassport={p.currentPassport} /> },
        {
          id: 'clocks',
          label: l('Dünya saatleri', 'World clocks', 'Weltzeit', 'Relojes', 'Часы мира'),
          render: () => (
            <Launcher
              title={l('Saat dilimi çakışması', 'Time-zone overlap', 'Zeitzonen-Überschneidung', 'Solape horario', 'Пересечение поясов')}
              text={l('Evdekilerle ya da iş ekibinle ortak uyanık saatleri bul.', 'Find shared waking hours with home or your team.', 'Gemeinsame Zeiten finden.', 'Encuentra horas comunes.', 'Найдите общие часы.')}
              cta={l('Karşılaştır', 'Compare', 'Vergleichen', 'Comparar', 'Сравнить')}
              onClick={p.onOpenTimezoneOverlap}
            />
          )
        }
      ]
    },
    {
      id: 'nomad',
      title: l('Dijital Göçebe', 'Digital nomad', 'Digitale Nomaden', 'Nómada digital', 'Цифровой кочевник'),
      sub: l('Göçebe vizeleri · 183 gün · Maliyet', 'Nomad visas · 183 days · Costs', 'Nomadenvisa · 183 Tage · Kosten', 'Visados nómada · 183 días · Costes', 'Визы · 183 дня · Расходы'),
      icon: <Ic fill="M6 5h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" d="M6 5h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM2 19h20M9 16v3M15 16v3" />,
      tabs: [{ id: 'visas', label: l('Göçebe vizeleri', 'Nomad visas', 'Nomadenvisa', 'Visados nómada', 'Визы'), render: () => <NomadToolsTab defaultSubTab="nomad" currentPassport={p.currentPassport} /> }]
    }
  ];

  const pct = (n: number) => `${Math.round((n / counts.total) * 100)}%`;

  return (
    <div className="rd-home">
      <SeaHero
        onSearch={p.onSearch}
        chips={[
          { label: l('Nereye gidebilirim?', 'Where can I go?', 'Wohin kann ich?', '¿Dónde puedo ir?', 'Куда можно?'), onClick: () => openHub('passport', 'where') },
          { label: l('Schengen gün sayacı', 'Schengen day counter', 'Schengen-Rechner', 'Contador Schengen', 'Счётчик Шенгена'), onClick: () => openHub('stay', 'schengen') },
          { label: l('Bavul listesi', 'Packing list', 'Packliste', 'Maleta', 'Багаж'), onClick: () => openHub('prep', 'pack') }
        ]}
      />
      <div className="rd-wrap">
        <LiveStrip passport={p.currentPassport} destination={destination} onDestinationChange={changeDest} onOpenRoutePlanner={() => openHub('explore', 'route')} />

        <section className="rd-pass" aria-label={l('Pasaportum', 'My passport', 'Mein Pass', 'Mi pasaporte', 'Мой паспорт')}>
          <PassportCover code={p.currentPassport} onClick={p.onOpenPassportSelector} />
          <div className="rd-pass-info">
            <span className="rd-eyebrow">{l('Pasaportum', 'My passport', 'Mein Pass', 'Mi pasaporte', 'Мой паспорт')}</span>
            <h2>{l(`${passName} pasaportuyla dünya`, `The world with a ${passName} passport`, `Die Welt mit Pass: ${passName}`, `El mundo con pasaporte de ${passName}`, `Мир с паспортом: ${passName}`)}</h2>
            <p className="rd-sub">{l('Kapağa dokunarak pasaportunu değiştir; bütün panolar yeniden hesaplanır.', 'Tap the cover to change passport; every panel recalculates.', 'Tippe auf den Pass, um ihn zu wechseln.', 'Toca la portada para cambiar de pasaporte.', 'Нажмите на обложку, чтобы сменить паспорт.')}</p>
            <div className="rd-bars">
              <div className="rd-bar"><span>{l('Vizesiz / kimlikle', 'Visa-free / ID', 'Visumfrei / Ausweis', 'Sin visado / DNI', 'Без визы')}</span><div className="rd-tr"><div className="rd-fl" style={{ width: pct(counts.free) }} /></div><b>{counts.free}</b></div>
              <div className="rd-bar"><span>{l('E-vize / kapıda', 'eVisa / on arrival', 'eVisum / bei Ankunft', 'eVisa / a la llegada', 'eVisa / по прилёте')}</span><div className="rd-tr"><div className="rd-fl sun" style={{ width: pct(counts.easy) }} /></div><b>{counts.easy}</b></div>
              <div className="rd-bar"><span>{l('Vize gerekli', 'Visa required', 'Visum nötig', 'Visado necesario', 'Нужна виза')}</span><div className="rd-tr"><div className="rd-fl mute" style={{ width: pct(counts.visa) }} /></div><b>{counts.visa}</b></div>
            </div>
            <div className="rd-actions">
              <button type="button" className="rd-btn" onClick={() => openHub('passport', 'where')}>{l('Nereye gidebilirim?', 'Where can I go?', 'Wohin kann ich?', '¿Dónde puedo ir?', 'Куда можно?')}</button>
              <button type="button" className="rd-btn ghost" onClick={() => openHub('passport', 'compare')}>{l('Pasaport karşılaştır', 'Compare passports', 'Pässe vergleichen', 'Comparar', 'Сравнить')}</button>
            </div>
          </div>
        </section>

        <section className="rd-hubs" aria-label={l('Panolar', 'Panels', 'Bereiche', 'Paneles', 'Разделы')}>
          <div className="rd-sec-head">
            <div>
              <span className="rd-eyebrow">{l('Panolar', 'Panels', 'Bereiche', 'Paneles', 'Разделы')}</span>
              <h2>{l('İlgili araçlar bir arada', 'Related tools together', 'Zusammengehörige Werkzeuge', 'Herramientas relacionadas', 'Связанные инструменты')}</h2>
            </div>
            <span className="rd-sub">{l('Karta dokun: altında sekmeleriyle açılır', 'Tap a card: it opens below with tabs', 'Karte antippen: öffnet sich darunter', 'Toca una tarjeta: se abre debajo', 'Нажмите: откроется ниже')}</span>
          </div>
          <HubGrid hubs={hubs} openRequest={openReq} />
        </section>
      </div>
    </div>
  );
};
