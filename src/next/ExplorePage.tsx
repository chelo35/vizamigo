import { enArticle } from '../utils/passportBrief';
import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { useI18n } from '../data/i18n';
import { LiveStrip, loadDestination } from '../components/redesign/LiveStrip';
import { PassportCover } from '../components/redesign/PassportCover';
import { getPassportItems } from '../utils/calculator';
import { getCountryName } from '../data/passportData';
import { Btn, OpenRequest, SecHead, Segmented, Tile, TileGrid } from './ui';
import { SmartSearch } from './SmartSearch';
import { wtgIdFor, wtgCountries, buildWhereToGo } from '../data/whereToGo';
import { QuickDeals } from './QuickDeals';
import { HomeBooking } from './HomeBooking';
import { HomeHero, CheapFlights, DayTours, PackEasy, ChangesGuides, TrustStrip } from './explore/home2';
import type { TabKey } from '../components/Navigation';
const V = () => import('./explore/views');
const WhereView = lazy(() => V().then((m) => ({ default: m.WhereView })));
const CountriesView = lazy(() => V().then((m) => ({ default: m.CountriesView })));
const CompareView = lazy(() => V().then((m) => ({ default: m.CompareView })));
const PopularView = lazy(() => V().then((m) => ({ default: m.PopularView })));
const ChangesView = lazy(() => V().then((m) => ({ default: m.ChangesView })));
const EasyTripView = lazy(() => V().then((m) => ({ default: m.EasyTripView })));
const RadarView = lazy(() => V().then((m) => ({ default: m.RadarView })));
const WM = () => import('./WorldMap');
const VisaWorldMap = lazy(() => WM().then((m) => ({ default: m.VisaWorldMap })));
const RadarWorldMap = lazy(() => WM().then((m) => ({ default: m.RadarWorldMap })));
const HomeRails = lazy(() => import('./explore/rails').then((m) => ({ default: m.HomeRails })));

export interface ExploreProps {
  currentPassport: string;
  secondaryPassport: string;
  openRequest: OpenRequest;
  searchRequest: { q: string; nonce: number } | null;
  onOpenCountry: (code: string) => void;
  onOpenPassport: () => void;
  onOpenAudit: () => void;
  onReport: () => void;
  onOpenRadar: (mode?: 'all' | 'clock' | 'weather' | 'currency', city?: string) => void;
  onOpenAssistant: () => void;
  onOpenRoute: () => void;
  onOpenTool: (tab: TabKey, tile: string) => void;
  onOpenInfo?: (page: string) => void;
}

export const ExplorePage: React.FC<ExploreProps> = (p) => {
  const { l, language } = useI18n();
  const [destination, setDestination] = useState(() => loadDestination());
  const [req, setReq] = useState<OpenRequest>(null);
  const [query, setQuery] = useState('');
  const openTile = (id: string, tab?: string) => setReq({ id, tab, nonce: Date.now() });

  useEffect(() => {
    if (p.openRequest) setReq(p.openRequest);
  }, [p.openRequest?.nonce]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (p.searchRequest) {
      setQuery(p.searchRequest.q);
      openTile('countries');
    }
  }, [p.searchRequest?.nonce]); // eslint-disable-line react-hooks/exhaustive-deps

  const changeDest = (c: string) => {
    setDestination(c);
    try {
      localStorage.setItem('vz_destination_v1', c);
    } catch {}
  };

  const counts = useMemo(() => {
    let free = 0, easy = 0, visa = 0;
    const items = getPassportItems(p.currentPassport);
    items.forEach((it) => {
      if (it.cat === 'free' || it.id) free++;
      else if (it.cat === 'evisa' || it.cat === 'voa' || it.cat === 'eta') easy++;
      else if (it.cat === 'visa') visa++;
    });
    return { free, easy, visa, total: items.length || 1 };
  }, [p.currentPassport]);
  const pct = (n: number) => `${Math.round((n / counts.total) * 100)}%`;
  const passName = getCountryName(p.currentPassport, language);

  // "Bu ay nereye gidilir?" (içinde bulunulan ay)
  const curM = new Date().getMonth() + 1;
  const monthId = wtgIdFor(curM);
  const openMonth = () => {
    if (p.onOpenInfo) p.onOpenInfo(monthId);
    else window.location.href = `/${language}/info/${monthId}`;
  };
  const monthTitle = buildWhereToGo(language, curM).short;

  const tiles: Tile[] = [
    {
      id: 'where', icon: 'pin', photo: 'x-where',
      title: l('Nereye gidebilirim?', 'Where can I go?', 'Wohin kann ich?', '¿Dónde puedo ir?', 'Куда можно?', 'Para onde posso ir?'),
      desc: l('Vizesiz, e-vize, kapıda vize', 'Visa-free, eVisa, on arrival', 'Visumfrei, eVisum, bei Ankunft', 'Sin visado, eVisa, a la llegada', 'Без визы, eVisa, по прилёте', 'Sem visto, e-Visa, na chegada'),
      badge: `${counts.free}`,
      render: () => <WhereView passport={p.currentPassport} onOpenCountry={p.onOpenCountry} />
    },
    {
      id: 'month', icon: 'sun', photo: 'x-month',
      title: monthTitle,
      desc: l(`En iyi dönemindeki ${wtgCountries(curM).length} ülke ve festivaller`, `${wtgCountries(curM).length} countries in season, plus festivals`, `${wtgCountries(curM).length} Länder in Saison und Feste`, `${wtgCountries(curM).length} países en temporada y fiestas`, `${wtgCountries(curM).length} стран в сезон и праздники`, `${wtgCountries(curM).length} países em alta temporada e festas`),
      onOpen: openMonth
    },
    {
      id: 'countries', icon: 'globe', photo: 'x-globe',
      title: l('Ülkeler', 'Countries', 'Länder', 'Países', 'Страны', 'Países'),
      desc: l('199 ülke, ara ve filtrele', 'All 199, search and filter', 'Alle 199 Länder', 'Los 199 países', 'Все 199 стран', 'Os 199 países'),
      render: () => <CountriesView key={query} passport={p.currentPassport} initialQuery={query} onOpenCountry={p.onOpenCountry} />
    },
    {
      id: 'compare', icon: 'scale', photo: 'x-compare',
      title: l('Pasaport karşılaştır', 'Compare passports', 'Pässe vergleichen', 'Comparar pasaportes', 'Сравнить паспорта', 'Comparar passaportes'),
      desc: l('İki pasaport yan yana', 'Two passports side by side', 'Zwei Pässe nebeneinander', 'Dos pasaportes', 'Два паспорта рядом', 'Dois passaportes'),
      render: () => <CompareView passportA={p.currentPassport} passportB={p.secondaryPassport} onOpenCountry={p.onOpenCountry} />
    },
    {
      id: 'popular', icon: 'star', photo: 'x-routes',
      title: l('Popüler rotalar', 'Popular trips', 'Beliebte Ziele', 'Destinos populares', 'Популярное', 'Destinos populares'),
      desc: l('Gezginlerin sevdikleri', 'Travellers’ favourites', 'Lieblingsziele', 'Favoritos', 'Любимые места', 'Favoritos'),
      render: () => <PopularView passport={p.currentPassport} onOpenCountry={p.onOpenCountry} />
    },
    {
      id: 'radar', icon: 'radar', photo: 'x-radar',
      title: l('Dünya radarı', 'World radar', 'Weltradar', 'Radar mundial', 'Мировой радар', 'Radar mundial'),
      desc: l('Saat, hava, kur bir arada', 'Time, weather, currency', 'Zeit, Wetter, Kurse', 'Hora, tiempo, divisas', 'Время, погода, курсы', 'Hora, clima, câmbio'),
      render: () => <RadarView passport={p.currentPassport} destination={destination} onOpenCountry={p.onOpenCountry} />
    },
    {
      id: 'changes', icon: 'bell', photo: 'x-bell',
      title: l('Kural değişiklikleri', 'Rule changes', 'Regeländerungen', 'Cambios de reglas', 'Изменения правил', 'Mudanças nas regras'),
      desc: l('Son değişen vize kuralları', 'Latest visa rule changes', 'Neueste Änderungen', 'Últimos cambios', 'Последние изменения', 'Últimas mudanças'),
      render: () => <ChangesView passport={p.currentPassport} onOpenAudit={p.onOpenAudit} onReport={p.onReport} onOpenCountry={p.onOpenCountry} />
    },
    {
      id: 'trip', icon: 'plane', photo: 'x-planner',
      title: l('Seyahat planlayıcı', 'Trip planner', 'Reiseplaner', 'Planificador de viaje', 'Планировщик поездки', 'Planejador de viagem'),
      desc: l('Uçuş fiyatı, otel, toplam bütçe', 'Flight price, stay, total budget', 'Flugpreis, Hotel, Budget', 'Vuelo, hotel, presupuesto', 'Билеты, отель, бюджет', 'Voo, hotel, orçamento'),
      onOpen: () => p.onOpenTool('nomad', 'trip')
    },
    {
      id: 'easy', icon: 'sun', photo: 'x-easy',
      title: l('Kolay tatil', 'Easy trip', 'Einfache Reise', 'Viaje fácil', 'Лёгкая поездка', 'Viagem sem complicação'),
      desc: l('Uçuş, otel, ulaşım, sigorta', 'Flights, stay, transfer, insurance', 'Flug, Hotel, Transfer', 'Vuelo, hotel, traslado', 'Перелёт, отель, трансфер', 'Voo, hotel, transfer'),
      render: () => <EasyTripView passport={p.currentPassport} destination={destination} onDestination={changeDest} onOpenCountry={p.onOpenCountry} />
    },
    {
      id: 'nomad', icon: 'laptop', photo: 'x-nomad',
      title: l('Dijital göçebe', 'Digital nomads', 'Digitale Nomaden', 'Nómadas digitales', 'Цифровые кочевники', 'Nômades digitais'),
      desc: l('Vizeler, aylık maliyet, şehirler', 'Visas, monthly costs, cities', 'Visa, Kosten, Städte', 'Visados, costes, ciudades', 'Визы, расходы, города', 'Vistos, custos, cidades'),
      onOpen: () => p.onOpenTool('plan', 'nomad')
    }
  ];

  return (
    <div className="vz-page">
      <div className="rd-home vz-home2">
        <HomeHero
          search={
            <SmartSearch
              id="rd-q"
              variant="hero"
              passport={p.currentPassport}
              placeholder={l('Vize kuralı, ülke ya da rehber ara…', 'Search visa rules, countries, guides…', 'Visaregeln, Länder, Ratgeber suchen…', 'Busca visados, países, guías…', 'Поиск: визы, страны, гиды…', 'Busque vistos, países, guias…')}
              onOpenCountry={p.onOpenCountry}
              onOpenTool={(tab, tile) => (tab === 'explore' ? openTile(tile) : p.onOpenTool(tab, tile))}
              onQuery={(q) => {
                setQuery(q);
                openTile('countries');
              }}
            />
          }
          chips={[
            { label: monthTitle, onClick: openMonth },
            { label: l('Nereye gidebilirim?', 'Where can I go?', 'Wohin kann ich?', '¿Dónde puedo ir?', 'Куда можно?', 'Para onde posso ir?'), onClick: () => openTile('where') },
            { label: l('Pasaport karşılaştır', 'Compare passports', 'Pässe vergleichen', 'Comparar', 'Сравнить', 'Comparar'), onClick: () => openTile('compare') },
            { label: l('Popüler rotalar', 'Popular trips', 'Beliebte Ziele', 'Populares', 'Популярное', 'Populares'), onClick: () => openTile('popular') }
          ]}
        />
        <div className="rd-wrap vz-hb-lift">
          <HomeBooking passport={p.currentPassport} onOpenCountry={p.onOpenCountry} destination={destination} onDestination={changeDest} onEasy={() => openTile('easy')} />
        </div>
      </div>

      <div className="vz-wrap vz-page-body" style={{ paddingTop: 28 }}>
        <section className="vz-tripcard" aria-label={l('Seçili ülke', 'Selected country', 'Gewähltes Land', 'País elegido', 'Выбранная страна', 'País escolhido')}>
          <LiveStrip passport={p.currentPassport} destination={destination} onDestinationChange={changeDest} onOpenRoutePlanner={p.onOpenRoute} />
          <QuickDeals passport={p.currentPassport} destination={destination} />
        </section>
        <CheapFlights passport={p.currentPassport} onOpenCountry={p.onOpenCountry} />
        <DayTours passport={p.currentPassport} />
        <PackEasy onEasy={() => openTile('easy')} onPlanner={() => p.onOpenTool('nomad', 'trip')} />

        <section className="vz-home-sec" aria-labelledby="vz-h-tools">
          <SecHead
            id="vz-h-tools"
            eyebrow={l('Keşfet', 'Explore', 'Entdecken', 'Explorar', 'Обзор', 'Explorar')}
            title={l('Ne yapmak istersin?', 'What would you like to do?', 'Was möchtest du tun?', '¿Qué quieres hacer?', 'Что хотите сделать?', 'O que você quer fazer?')}
            sub={l('Kutucuğa dokun, içeriği hemen altında açılsın.', 'Tap a tile and it opens right below.', 'Kachel antippen, sie öffnet sich darunter.', 'Toca una tarjeta y se abre debajo.', 'Нажмите — откроется ниже.', 'Toque em um cartão para abri-lo logo abaixo.')}
          />
          <TileGrid list tiles={tiles} openRequest={req} label={l('Keşfet araçları', 'Explore tools', 'Werkzeuge', 'Herramientas', 'Инструменты', 'Ferramentas')} />
        </section>

        <HomeMaps passport={p.currentPassport} onOpenCountry={p.onOpenCountry} />
        <ChangesGuides />

        <Deferred minHeight={isNarrow() ? 1210 : 915} id="rails">
          <Suspense fallback={null}>
            <HomeRails passport={p.currentPassport} onOpenCountry={p.onOpenCountry} onOpenTile={(id) => openTile(id)} />
          </Suspense>
        </Deferred>

        <section className="rd-pass" aria-label={l('Pasaportum', 'My passport', 'Mein Pass', 'Mi pasaporte', 'Мой паспорт', 'Meu passaporte')}>
          <PassportCover code={p.currentPassport} onClick={p.onOpenPassport} />
          <div className="rd-pass-info">
            <span className="vz-eyebrow">{l('Pasaportum', 'My passport', 'Mein Pass', 'Mi pasaporte', 'Мой паспорт', 'Meu passaporte')}</span>
            <h2>{l(`${passName} pasaportuyla dünya`, `The world with ${enArticle(passName)} ${passName} passport`, `Die Welt mit Pass: ${passName}`, `El mundo con pasaporte de ${passName}`, `Мир с паспортом: ${passName}`, `O mundo com passaporte de ${passName}`)}</h2>
            <p className="rd-sub">{l('Kapağa dokunarak pasaportunu değiştir; bütün sayfalar yeniden hesaplanır.', 'Tap the cover to change passport; every page recalculates.', 'Tippe auf den Pass, um ihn zu wechseln.', 'Toca la portada para cambiar de pasaporte.', 'Нажмите на обложку, чтобы сменить паспорт.', 'Toque na capa para trocar de passaporte.')}</p>
            <div className="rd-bars">
              <div className="rd-bar"><span>{l('Vizesiz / kimlikle', 'Visa-free / ID', 'Visumfrei / Ausweis', 'Sin visado / DNI', 'Без визы', 'Sem visto / RG')}</span><div className="rd-tr"><div className="rd-fl" style={{ width: pct(counts.free) }} /></div><b>{counts.free}</b></div>
              <div className="rd-bar"><span>{l('E-vize / kapıda', 'eVisa / on arrival', 'eVisum / Ankunft', 'eVisa / llegada', 'eVisa / по прилёте', 'e-Visa / na chegada')}</span><div className="rd-tr"><div className="rd-fl sun" style={{ width: pct(counts.easy) }} /></div><b>{counts.easy}</b></div>
              <div className="rd-bar"><span>{l('Vize gerekli', 'Visa required', 'Visum nötig', 'Visado necesario', 'Нужна виза', 'Visto necessário')}</span><div className="rd-tr"><div className="rd-fl mute" style={{ width: pct(counts.visa) }} /></div><b>{counts.visa}</b></div>
            </div>
            <div className="vz-actions">
              <Btn onClick={() => openTile('where')}>{l('Nereye gidebilirim?', 'Where can I go?', 'Wohin kann ich?', '¿Dónde puedo ir?', 'Куда можно?', 'Para onde posso ir?')}</Btn>
              <Btn variant="soft" onClick={() => openTile('compare')}>{l('Pasaport karşılaştır', 'Compare passports', 'Pässe vergleichen', 'Comparar', 'Сравнить', 'Comparar')}</Btn>
            </div>
          </div>
        </section>
        <TrustStrip />
      </div>
    </div>
  );
};


/** Ana sayfada doğrudan görünen harita bölümü; ekrana yaklaşınca yüklenir. */
const HomeMaps: React.FC<{ passport: string; onOpenCountry: (c: string) => void }> = ({ passport, onOpenCountry }) => {
  const { l } = useI18n();
  const [kind, setKind] = useState<'visa' | 'radar'>('visa');
  const ref = React.useRef<HTMLElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (!('IntersectionObserver' in window)) {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && setNear(true), { rootMargin: '1200px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [near]);
  const mapH = typeof window !== 'undefined' && window.innerWidth < 640 ? 360 : 500;
  return (
    <section ref={ref} className="vz-home-sec vz-maps-sec" aria-labelledby="vz-h-maps">
      <SecHead
        id="vz-h-maps"
        eyebrow={l('Haritalar', 'Maps', 'Karten', 'Mapas', 'Карты', 'Mapas')}
        title={kind === 'visa' ? l('Pasaportunla dünya haritası', 'The world map for your passport', 'Weltkarte für deinen Pass', 'El mapa del mundo para tu pasaporte', 'Карта мира для вашего паспорта', 'O mapa-múndi para o seu passaporte') : l('Dünyada şu an: saat, hava, döviz', 'Right now: time, weather, currency', 'Gerade jetzt: Zeit, Wetter, Kurse', 'Ahora: hora, tiempo y divisas', 'Сейчас: время, погода, валюта', 'Agora: hora, clima e câmbio')}
        action={
          <Segmented
            label={l('Harita', 'Map', 'Karte', 'Mapa', 'Карта', 'Mapa')}
            value={kind}
            onChange={setKind}
            options={[
              { id: 'visa', label: l('Vize', 'Visa', 'Visum', 'Visado', 'Визы', 'Visto') },
              { id: 'radar', label: l('Saat · hava · döviz', 'Time · weather · FX', 'Zeit · Wetter · Kurs', 'Hora · tiempo · divisa', 'Время · погода · курс', 'Hora · clima · câmbio') }
            ]}
          />
        }
      />
      {near ? (
        <Suspense fallback={<div className="vz-skel" style={{ height: mapH }} />}>
          {kind === 'visa' ? <VisaWorldMap passport={passport} onOpenCountry={onOpenCountry} height={mapH} /> : <RadarWorldMap passport={passport} onOpenCountry={onOpenCountry} height={mapH} />}
        </Suspense>
      ) : (
        <div className="vz-skel" style={{ height: mapH }} />
      )}
    </section>
  );
};

const isNarrow = () => typeof window !== 'undefined' && window.innerWidth < 640;

/** Ekrana yaklaşınca ya da sayfa yüklendikten sonra tarayıcı boşalınca çizer; ilk açılışı hafifletir.
 *  Kullanıcı hızlı kaydırdığında boş alan görmesin diye içerik, ilk yüklemeden kısa süre sonra arka planda da hazırlanır. */
const Deferred: React.FC<{ children: React.ReactNode; minHeight?: number; id?: string }> = ({ children, minHeight = 600, id }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (show) return;
    const el = ref.current;
    let io: IntersectionObserver | null = null;
    let idle: number | undefined;
    let t: number | undefined;
    const go = () => setShow(true);
    if (el && 'IntersectionObserver' in window) {
      io = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && go(), { rootMargin: '1400px 0px' });
      io.observe(el);
    } else go();
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (n: number) => void };
    const later = () => { t = window.setTimeout(() => { if (w.requestIdleCallback) idle = w.requestIdleCallback(go, { timeout: 3000 }); else go(); }, 1200); };
    if (document.readyState === 'complete') later(); else window.addEventListener('load', later, { once: true });
    return () => { io?.disconnect(); window.removeEventListener('load', later); if (t) clearTimeout(t); if (idle && w.cancelIdleCallback) w.cancelIdleCallback(idle); };
  }, [show]);
  return <div ref={ref} data-defer={id} style={show ? undefined : { minHeight }}>{show ? children : null}</div>;
};
