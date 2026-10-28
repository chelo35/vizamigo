import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { useI18n } from '../data/i18n';
import { SeaHero } from '../components/redesign/SeaHero';
import { LiveStrip, loadDestination } from '../components/redesign/LiveStrip';
import { PassportCover } from '../components/redesign/PassportCover';
import { getPassportItems } from '../utils/calculator';
import { getCountryName } from '../data/passportData';
import { Btn, OpenRequest, SecHead, Segmented, Tile, TileGrid } from './ui';
import { SmartSearch } from './SmartSearch';
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

  const tiles: Tile[] = [
    {
      id: 'where', icon: 'pin',
      title: l('Nereye gidebilirim?', 'Where can I go?', 'Wohin kann ich?', '¿Dónde puedo ir?', 'Куда можно?'),
      desc: l('Vizesiz, e-vize, kapıda vize', 'Visa-free, eVisa, on arrival', 'Visumfrei, eVisum, bei Ankunft', 'Sin visado, eVisa, a la llegada', 'Без визы, eVisa, по прилёте'),
      badge: `${counts.free}`,
      render: () => <WhereView passport={p.currentPassport} onOpenCountry={p.onOpenCountry} />
    },
    {
      id: 'countries', icon: 'globe',
      title: l('Ülkeler', 'Countries', 'Länder', 'Países', 'Страны'),
      desc: l('199 ülke, ara ve filtrele', 'All 199, search and filter', 'Alle 199 Länder', 'Los 199 países', 'Все 199 стран'),
      render: () => <CountriesView key={query} passport={p.currentPassport} initialQuery={query} onOpenCountry={p.onOpenCountry} />
    },
    {
      id: 'compare', icon: 'scale',
      title: l('Pasaport karşılaştır', 'Compare passports', 'Pässe vergleichen', 'Comparar pasaportes', 'Сравнить паспорта'),
      desc: l('İki pasaport yan yana', 'Two passports side by side', 'Zwei Pässe nebeneinander', 'Dos pasaportes', 'Два паспорта рядом'),
      render: () => <CompareView passportA={p.currentPassport} passportB={p.secondaryPassport} onOpenCountry={p.onOpenCountry} />
    },
    {
      id: 'popular', icon: 'star',
      title: l('Popüler rotalar', 'Popular trips', 'Beliebte Ziele', 'Destinos populares', 'Популярное'),
      desc: l('Gezginlerin sevdikleri', 'Travellers’ favourites', 'Lieblingsziele', 'Favoritos', 'Любимые места'),
      render: () => <PopularView passport={p.currentPassport} onOpenCountry={p.onOpenCountry} />
    },
    {
      id: 'radar', icon: 'radar',
      title: l('Dünya radarı', 'World radar', 'Weltradar', 'Radar mundial', 'Мировой радар'),
      desc: l('Saat, hava, kur bir arada', 'Time, weather, currency', 'Zeit, Wetter, Kurse', 'Hora, tiempo, divisas', 'Время, погода, курсы'),
      render: () => <RadarView passport={p.currentPassport} destination={destination} onOpenCountry={p.onOpenCountry} />
    },
    {
      id: 'changes', icon: 'bell',
      title: l('Kural değişiklikleri', 'Rule changes', 'Regeländerungen', 'Cambios de reglas', 'Изменения правил'),
      desc: l('Son değişen vize kuralları', 'Latest visa rule changes', 'Neueste Änderungen', 'Últimos cambios', 'Последние изменения'),
      render: () => <ChangesView passport={p.currentPassport} onOpenAudit={p.onOpenAudit} onReport={p.onReport} onOpenCountry={p.onOpenCountry} />
    },
    {
      id: 'easy', icon: 'sun',
      title: l('Kolay tatil', 'Easy trip', 'Einfache Reise', 'Viaje fácil', 'Лёгкая поездка'),
      desc: l('Uçuş, otel, ulaşım, sigorta', 'Flights, stay, transfer, insurance', 'Flug, Hotel, Transfer', 'Vuelo, hotel, traslado', 'Перелёт, отель, трансфер'),
      render: () => <EasyTripView passport={p.currentPassport} destination={destination} onDestination={changeDest} onOpenCountry={p.onOpenCountry} />
    },
    {
      id: 'nomad', icon: 'laptop',
      title: l('Dijital göçebe', 'Digital nomads', 'Digitale Nomaden', 'Nómadas digitales', 'Цифровые кочевники'),
      desc: l('Vizeler, aylık maliyet, şehirler', 'Visas, monthly costs, cities', 'Visa, Kosten, Städte', 'Visados, costes, ciudades', 'Визы, расходы, города'),
      onOpen: () => p.onOpenTool('plan', 'nomad')
    },
    {
      id: 'assistant', icon: 'spark',
      title: l('Vizamigo asistan', 'Vizamigo assistant', 'Vizamigo-Assistent', 'Asistente', 'Ассистент'),
      desc: l('Yaz ya da sesli sor', 'Type or speak', 'Schreiben oder sprechen', 'Escribe o habla', 'Пишите или говорите'),
      onOpen: p.onOpenAssistant
    }
  ];

  return (
    <div className="vz-page">
      <div className="rd-home">
        <SeaHero
          searchSlot={
            <SmartSearch
              id="rd-q"
              variant="hero"
              passport={p.currentPassport}
              placeholder={l('Tayland, Japonya, Schengen…', 'Thailand, Japan, Schengen…', 'Thailand, Japan, Schengen…', 'Tailandia, Japón, Schengen…', 'Таиланд, Япония, Шенген…')}
              onOpenCountry={p.onOpenCountry}
              onOpenTool={(tab, tile) => (tab === 'explore' ? openTile(tile) : p.onOpenTool(tab, tile))}
              onQuery={(q) => {
                setQuery(q);
                openTile('countries');
              }}
            />
          }
          onSearch={(q) => {
            setQuery(q);
            openTile('countries');
          }}
          chips={[
            { label: l('Nereye gidebilirim?', 'Where can I go?', 'Wohin kann ich?', '¿Dónde puedo ir?', 'Куда можно?'), onClick: () => openTile('where') },
            { label: l('Pasaport karşılaştır', 'Compare passports', 'Pässe vergleichen', 'Comparar', 'Сравнить'), onClick: () => openTile('compare') },
            { label: l('Popüler rotalar', 'Popular trips', 'Beliebte Ziele', 'Populares', 'Популярное'), onClick: () => openTile('popular') }
          ]}
        />
        <div className="rd-wrap">
          <LiveStrip passport={p.currentPassport} destination={destination} onDestinationChange={changeDest} onOpenRoutePlanner={p.onOpenRoute} />
        </div>
      </div>

      <div className="vz-wrap vz-page-body" style={{ paddingTop: 36 }}>
        <section className="vz-home-sec" aria-labelledby="vz-h-tools">
          <SecHead
            id="vz-h-tools"
            eyebrow={l('Keşfet', 'Explore', 'Entdecken', 'Explorar', 'Обзор')}
            title={l('Ne yapmak istersin?', 'What would you like to do?', 'Was möchtest du tun?', '¿Qué quieres hacer?', 'Что хотите сделать?')}
            sub={l('Kutucuğa dokun, içeriği hemen altında açılsın.', 'Tap a tile and it opens right below.', 'Kachel antippen, sie öffnet sich darunter.', 'Toca una tarjeta y se abre debajo.', 'Нажмите — откроется ниже.')}
          />
          <TileGrid tiles={tiles} openRequest={req} label={l('Keşfet araçları', 'Explore tools', 'Werkzeuge', 'Herramientas', 'Инструменты')} />
        </section>

        <HomeMaps passport={p.currentPassport} onOpenCountry={p.onOpenCountry} />

        <Deferred>
          <Suspense fallback={null}>
            <HomeRails passport={p.currentPassport} onOpenCountry={p.onOpenCountry} onOpenTile={(id) => openTile(id)} />
          </Suspense>
        </Deferred>

        <section className="rd-pass" aria-label={l('Pasaportum', 'My passport', 'Mein Pass', 'Mi pasaporte', 'Мой паспорт')}>
          <PassportCover code={p.currentPassport} onClick={p.onOpenPassport} />
          <div className="rd-pass-info">
            <span className="vz-eyebrow">{l('Pasaportum', 'My passport', 'Mein Pass', 'Mi pasaporte', 'Мой паспорт')}</span>
            <h2>{l(`${passName} pasaportuyla dünya`, `The world with a ${passName} passport`, `Die Welt mit Pass: ${passName}`, `El mundo con pasaporte de ${passName}`, `Мир с паспортом: ${passName}`)}</h2>
            <p className="rd-sub">{l('Kapağa dokunarak pasaportunu değiştir; bütün sayfalar yeniden hesaplanır.', 'Tap the cover to change passport; every page recalculates.', 'Tippe auf den Pass, um ihn zu wechseln.', 'Toca la portada para cambiar de pasaporte.', 'Нажмите на обложку, чтобы сменить паспорт.')}</p>
            <div className="rd-bars">
              <div className="rd-bar"><span>{l('Vizesiz / kimlikle', 'Visa-free / ID', 'Visumfrei / Ausweis', 'Sin visado / DNI', 'Без визы')}</span><div className="rd-tr"><div className="rd-fl" style={{ width: pct(counts.free) }} /></div><b>{counts.free}</b></div>
              <div className="rd-bar"><span>{l('E-vize / kapıda', 'eVisa / on arrival', 'eVisum / Ankunft', 'eVisa / llegada', 'eVisa / по прилёте')}</span><div className="rd-tr"><div className="rd-fl sun" style={{ width: pct(counts.easy) }} /></div><b>{counts.easy}</b></div>
              <div className="rd-bar"><span>{l('Vize gerekli', 'Visa required', 'Visum nötig', 'Visado necesario', 'Нужна виза')}</span><div className="rd-tr"><div className="rd-fl mute" style={{ width: pct(counts.visa) }} /></div><b>{counts.visa}</b></div>
            </div>
            <div className="vz-actions">
              <Btn onClick={() => openTile('where')}>{l('Nereye gidebilirim?', 'Where can I go?', 'Wohin kann ich?', '¿Dónde puedo ir?', 'Куда можно?')}</Btn>
              <Btn variant="soft" onClick={() => openTile('compare')}>{l('Pasaport karşılaştır', 'Compare passports', 'Pässe vergleichen', 'Comparar', 'Сравнить')}</Btn>
            </div>
          </div>
        </section>
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
    const io = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && setNear(true), { rootMargin: '400px' });
    io.observe(el);
    return () => io.disconnect();
  }, [near]);
  const mapH = typeof window !== 'undefined' && window.innerWidth < 640 ? 360 : 500;
  return (
    <section ref={ref} className="vz-home-sec vz-maps-sec" aria-labelledby="vz-h-maps">
      <SecHead
        id="vz-h-maps"
        eyebrow={l('Haritalar', 'Maps', 'Karten', 'Mapas', 'Карты')}
        title={kind === 'visa' ? l('Pasaportunla dünya haritası', 'The world map for your passport', 'Weltkarte für deinen Pass', 'El mapa del mundo para tu pasaporte', 'Карта мира для вашего паспорта') : l('Dünyada şu an: saat, hava, döviz', 'Right now: time, weather, currency', 'Gerade jetzt: Zeit, Wetter, Kurse', 'Ahora: hora, tiempo y divisas', 'Сейчас: время, погода, валюта')}
        action={
          <Segmented
            label={l('Harita', 'Map', 'Karte', 'Mapa', 'Карта')}
            value={kind}
            onChange={setKind}
            options={[
              { id: 'visa', label: l('Vize', 'Visa', 'Visum', 'Visado', 'Визы') },
              { id: 'radar', label: l('Saat · hava · döviz', 'Time · weather · FX', 'Zeit · Wetter · Kurs', 'Hora · tiempo · divisa', 'Время · погода · курс') }
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

/** Ekrana yaklaşınca (ya da tarayıcı boşalınca) çizer; ilk açılışı hafifletir. */
const Deferred: React.FC<{ children: React.ReactNode; minHeight?: number }> = ({ children, minHeight = 600 }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (show) return;
    const el = ref.current;
    let io: IntersectionObserver | null = null;
    if (el && 'IntersectionObserver' in window) {
      io = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && setShow(true), { rootMargin: '600px' });
      io.observe(el);
    } else setShow(true);
    return () => io?.disconnect();
  }, [show]);
  return show ? <>{children}</> : <div ref={ref} style={{ minHeight }} aria-hidden="true" />;
};
