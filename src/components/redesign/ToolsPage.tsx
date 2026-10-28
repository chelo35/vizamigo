import React, { useMemo, useState } from 'react';
import { useI18n } from '../../data/i18n';
import { TabPage } from './TabPage';
import { HubGrid } from './HubGrid';
import { buildHubs, HubActions, Ic } from './toolHubs';
import { loadDestination } from './LiveStrip';
import { getPassportItems } from '../../utils/calculator';
import { getCountryName } from '../../data/passportData';
import { ALL_WORLD_HUBS, flagToIso } from '../../data/worldHubs';
import { GEO_DATA } from '../../data/geoData';

interface Props extends HubActions {
  onOpenAssistant: () => void;
}

interface ToolItem {
  title: string;
  text: string;
  icon: string;
  hub?: [string, string];
  run?: () => void;
}

/** Araçlar sekmesi: aynı panolar + her aracın ne işe yaradığını anlatan tam liste. */
export const ToolsPage: React.FC<Props> = (p) => {
  const { l, language } = useI18n();
  const [req, setReq] = useState<{ id: string; tab?: string; nonce: number } | null>(null);
  const openHub = (id: string, tab?: string) => setReq({ id, tab, nonce: Date.now() });
  const destination = useMemo(() => loadDestination(), []);

  const counts = useMemo(() => {
    let free = 0;
    getPassportItems(p.currentPassport).forEach((it) => {
      if (it.cat === 'free' || it.id) free++;
    });
    return { free };
  }, [p.currentPassport]);

  const destCity = useMemo(() => {
    const geo = GEO_DATA[destination];
    const hubs = ALL_WORLD_HUBS.filter((h) => (h.iso || flagToIso(h.flag)) === destination);
    return (hubs.find((h) => geo && h.city === geo.capital) || hubs[0])?.city;
  }, [destination]);

  const hubs = buildHubs({
    l,
    p,
    counts,
    passName: getCountryName(p.currentPassport, language),
    destName: getCountryName(destination, language),
    destination,
    destCity,
    openHub
  });

  const I = {
    pin: 'M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
    scale: 'M12 4v16M5 8h14M7 8l-3 7h6zM17 8l-3 7h6zM8 20h8',
    clock: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 7.5V12l3.2 2',
    card: 'M4 6h16v12H4zM4 10h16M8 15h3',
    bell: 'M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15zM10 20a2 2 0 0 0 4 0',
    doc: 'M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5',
    bag: 'M6 8h12a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3zM9 8V6a3 3 0 0 1 6 0v2',
    globe: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z',
    sos: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 8v5M12 16.5v.01',
    tip: 'M5 4h14v16l-3-2-2 2-2-2-2 2-2-2-3 2zM9 9h6M9 13h4',
    fx: 'M4 8h13l-3-3M20 16H7l3 3',
    route: 'm3 7 6-3 6 3 6-3v13l-6 3-6-3-6 3zM9 4v13M15 7v13',
    tz: 'M8 3a7 7 0 1 1 0 14A7 7 0 0 1 8 3zM8 6v4l2.5 1.5M16 10a6 6 0 1 1-5 9.3',
    laptop: 'M6 5h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM2 19h20',
    spark: 'M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z'
  };

  const tools: ToolItem[] = [
    { icon: I.pin, hub: ['passport', 'where'], title: l('Nereye gidebilirim?', 'Where can I go?', 'Wohin kann ich?', '¿Dónde puedo ir?', 'Куда можно?'), text: l('Pasaportunla vizesiz, e-vizeyle ya da kapıda vizeyle girebileceğin ülkeler, kalış süreleriyle birlikte.', 'Countries you can enter visa-free, with an eVisa or on arrival, with stay limits.', 'Länder ohne Visum, mit eVisum oder bei Ankunft.', 'Países sin visado, con eVisa o a la llegada.', 'Страны без визы, с eVisa или по прилёте.') },
    { icon: I.scale, hub: ['passport', 'compare'], title: l('Pasaport karşılaştır', 'Compare passports', 'Pässe vergleichen', 'Comparar pasaportes', 'Сравнить паспорта'), text: l('İki pasaportu ülke ülke yan yana koy; çifte vatandaşlıkta hangisiyle gireceğini gör.', 'Put two passports side by side; see which one to use with dual citizenship.', 'Zwei Pässe nebeneinander vergleichen.', 'Compara dos pasaportes país por país.', 'Сравните два паспорта по странам.') },
    { icon: I.clock, hub: ['stay', 'schengen'], title: l('Schengen 90/180 sayacı', 'Schengen 90/180 counter', 'Schengen-90/180-Rechner', 'Contador Schengen 90/180', 'Счётчик Шенгена 90/180'), text: l('Giriş-çıkış tarihlerini ekle; kalan gününü ve bir sonraki güvenli giriş tarihini hesaplar.', 'Add entry and exit dates; it counts remaining days and the next safe entry date.', 'Ein- und Ausreisen eintragen, Resttage sehen.', 'Añade fechas y ve los días restantes.', 'Добавьте даты и узнайте остаток дней.') },
    { icon: I.card, hub: ['stay', 'wallet'], title: l('Vizelerim & süreler', 'My visas & dates', 'Meine Visa & Fristen', 'Mis visados y plazos', 'Мои визы и сроки'), text: l('Vize, pasaport ve sigorta bitiş tarihlerini sakla; yaklaşınca uyarı al.', 'Keep visa, passport and insurance expiry dates; get reminded in time.', 'Ablaufdaten speichern und erinnert werden.', 'Guarda fechas de caducidad y recibe avisos.', 'Храните сроки и получайте напоминания.') },
    { icon: I.bell, run: p.onOpenAuditConsole, title: l('Kural değişiklikleri', 'Rule changes', 'Regeländerungen', 'Cambios de reglas', 'Изменения правил'), text: l('Son değişen vize kuralları, resmî kaynakları ve doğrulama tarihleri.', 'Recently changed visa rules with official sources and check dates.', 'Geänderte Regeln mit Quellen.', 'Reglas cambiadas con fuentes oficiales.', 'Изменения с официальными источниками.') },
    { icon: I.doc, hub: ['prep', 'docs'], title: l('Evrak listesi', 'Document checklist', 'Dokumenten-Checkliste', 'Lista de documentos', 'Список документов'), text: l('Hedef ülkeye göre gereken belgeler: pasaport geçerliliği, vize, sigorta, bilet, konaklama.', 'Documents your destination asks for: passport validity, visa, insurance, tickets, stay.', 'Nötige Dokumente je Zielland.', 'Documentos según el destino.', 'Документы для страны назначения.') },
    { icon: I.bag, run: p.onOpenPackingList, title: l('Akıllı bavul listesi', 'Smart packing list', 'Smarte Packliste', 'Maleta inteligente', 'Умный список вещей'), text: l('Hedefe, mevsime ve yolculuk tipine göre liste; işaretlediklerin bu cihazda kalır.', 'A list for destination, season and trip type; ticks stay on this device.', 'Liste nach Ziel und Saison.', 'Lista según destino y temporada.', 'Список по стране и сезону.') },
    { icon: I.globe, run: () => p.onOpenGlobalRadar('all', destCity), title: l('Dünya radarı', 'World radar', 'Weltradar', 'Radar mundial', 'Мировой радар'), text: l('Şehir şehir canlı saat, hava durumu ve döviz kuru tek ekranda.', 'Live time, weather and exchange rates city by city.', 'Live-Zeit, Wetter und Kurse je Stadt.', 'Hora, tiempo y cambio por ciudad.', 'Время, погода и курсы по городам.') },
    { icon: I.sos, hub: ['onroad', 'sos'], title: l('Acil durum & konsolosluk', 'Emergency & consulate', 'Notfall & Konsulat', 'Emergencias y consulado', 'Экстренные и консульство'), text: l('Polis, ambulans, itfaiye numaraları ve en yakın büyükelçilik/konsolosluk bilgisi.', 'Police, ambulance and fire numbers plus your nearest embassy or consulate.', 'Notrufnummern und Botschaften.', 'Números de emergencia y embajadas.', 'Экстренные номера и посольства.') },
    { icon: I.tip, run: p.onOpenTippingCalc, title: l('Bahşiş hesaplayıcı', 'Tipping calculator', 'Trinkgeldrechner', 'Calculadora de propinas', 'Калькулятор чаевых'), text: l('Ülkeye göre restoran, taksi ve otelde ne kadar bahşiş bırakılır.', 'How much to tip at restaurants, taxis and hotels in each country.', 'Trinkgeld je Land.', 'Cuánto dejar de propina en cada país.', 'Сколько оставлять чаевых.') },
    { icon: I.fx, run: () => p.onOpenGlobalRadar('currency'), title: l('Döviz çevirici', 'Currency converter', 'Währungsrechner', 'Conversor de divisas', 'Конвертер валют'), text: l('Canlı kurlarla 150’den fazla para birimi arasında çevirme.', 'Convert between 150+ currencies at live rates.', '150+ Währungen zu Live-Kursen.', 'Más de 150 monedas en vivo.', '150+ валют по живым курсам.') },
    { icon: I.route, hub: ['explore', 'route'], title: l('Rota planlayıcı', 'Route planner', 'Routenplaner', 'Planificador de ruta', 'Планировщик маршрута'), text: l('Birden çok ülkeli yolculuğu tarihleriyle kur; her durakta vize ve kalış kuralını kontrol eder.', 'Build a multi-country trip with dates; checks visa and stay rules at each stop.', 'Mehrländerreise mit Visaprüfung.', 'Viaje multipaís con control de visados.', 'Маршрут по странам с проверкой виз.') },
    { icon: I.tz, run: p.onOpenTimezoneOverlap, title: l('Saat dilimi çakışması', 'Time-zone overlap', 'Zeitzonen-Überschneidung', 'Solape horario', 'Пересечение часовых поясов'), text: l('Evdekilerle ya da iş ekibinle ortak uyanık saatleri bul.', 'Find shared waking hours with family or your team.', 'Gemeinsame Zeiten mit Familie oder Team.', 'Horas comunes con familia o equipo.', 'Общие часы с семьёй или командой.') },
    { icon: I.laptop, hub: ['nomad', 'visas'], title: l('Dijital göçebe vizeleri', 'Digital nomad visas', 'Digitale Nomadenvisa', 'Visados de nómada digital', 'Визы цифровых кочевников'), text: l('Uzaktan çalışma vizeleri, gelir şartları, süreleri ve 183 gün vergi kuralı.', 'Remote-work visas, income rules, lengths and the 183-day tax rule.', 'Remote-Visa, Einkommen, 183-Tage-Regel.', 'Visados remotos, ingresos y regla de 183 días.', 'Визы для удалённой работы и правило 183 дней.') },
    { icon: I.spark, run: p.onOpenAssistant, title: l('Vizamigo asistan', 'Vizamigo assistant', 'Vizamigo-Assistent', 'Asistente Vizamigo', 'Ассистент Vizamigo'), text: l('Sorunu yaz ya da sesli sor: vize, rota, belge ve bütçe için anında yanıt.', 'Type or speak your question: instant answers on visas, routes, documents and budget.', 'Frag per Text oder Stimme.', 'Pregunta por texto o voz.', 'Спросите текстом или голосом.') }
  ];

  return (
    <TabPage
      eyebrow={l('Araçlar', 'Tools', 'Werkzeuge', 'Herramientas', 'Инструменты')}
      title={l('Yolculuğun için her şey', 'Everything for your trip', 'Alles für deine Reise', 'Todo para tu viaje', 'Всё для поездки')}
      sub={l('İlgili araçlar panolarda bir arada. Karta dokun, sekmeleriyle altında açılsın; aşağıda her aracın ne işe yaradığı yazıyor.', 'Related tools grouped into panels. Tap a card to open it below with tabs; every tool is explained further down.', 'Zusammengehörige Werkzeuge in Bereichen; unten alle erklärt.', 'Herramientas agrupadas en paneles; abajo se explica cada una.', 'Инструменты сгруппированы; ниже описание каждого.')}
      words={['Thailand', 'USA', 'Brazil', 'Egypt']}
    >
      <section className="rd-hubs">
        <HubGrid hubs={hubs} openRequest={req} />
      </section>
      <section className="rd-catalog" aria-label={l('Tüm araçlar', 'All tools', 'Alle Werkzeuge', 'Todas las herramientas', 'Все инструменты')}>
        <div className="rd-sec-head">
          <div>
            <span className="rd-eyebrow">{l('Tüm araçlar', 'All tools', 'Alle Werkzeuge', 'Todas', 'Все инструменты')}</span>
            <h2>{l('Hangisi ne işe yarar?', 'What does each one do?', 'Was macht welches?', '¿Para qué sirve cada una?', 'Что для чего?')}</h2>
          </div>
          <span className="rd-sub">{tools.length} {l('araç', 'tools', 'Werkzeuge', 'herramientas', 'инструментов')}</span>
        </div>
        <div className="rd-cat-grid">
          {tools.map((t) => (
            <button key={t.title} type="button" className="rd-cat" onClick={() => (t.hub ? openHub(t.hub[0], t.hub[1]) : t.run?.())}>
              <span className="rd-tile-ic"><Ic d={t.icon} /></span>
              <span className="rd-cat-b">
                <span className="rd-cat-t">{t.title}</span>
                <span className="rd-cat-s">{t.text}</span>
              </span>
              <svg className="rd-cat-go" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
            </button>
          ))}
        </div>
      </section>
    </TabPage>
  );
};
