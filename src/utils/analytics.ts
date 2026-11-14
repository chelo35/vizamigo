/**
 * Google Analytics 4 (G-EF7BYQ70BG) — yalnızca çerez izni olan ziyaretçilerde yüklenir
 * (AB/İngiltere'de "Kabul et" sonrası; diğer ülkelerde doğrudan). Otomasyon tarayıcıları
 * (navigator.webdriver) sayılmaz. Ortak sitelere giden her tıklama "partner_click" olayıdır.
 */
import { thirdPartyAllowed } from './consent';

const GA_ID = 'G-EF7BYQ70BG';
type W = Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
let loaded = false;

const bot = (): boolean => {
  try {
    return !!navigator.webdriver || /bot|crawl|spider|headless|lighthouse|pagespeed/i.test(navigator.userAgent);
  } catch {
    return true;
  }
};

function load(): void {
  if (loaded || bot() || !thirdPartyAllowed()) return;
  loaded = true;
  const w = window as W;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag('js', new Date());
  w.gtag('config', GA_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

/** Ortak adını adresten çıkar (ör. stay22.com/allez/booking → stay22:booking). */
function partnerOf(u: URL): string {
  const h = u.hostname.replace(/^www\./, '');
  const seg = u.pathname.split('/').filter(Boolean);
  if (h.endsWith('stay22.com')) return `stay22:${seg[1] || seg[0] || ''}`;
  if (h === 'tp.media' || h.endsWith('.tp.st') || h === 'tp.st') return `travelpayouts:${u.searchParams.get('campaign_id') || u.searchParams.get('p') || ''}`;
  if (h.endsWith('ad.admitad.com') || h.endsWith('admitad.com')) return 'admitad';
  if (h.endsWith('awin1.com')) return `awin:${u.searchParams.get('awinmid') || ''}`;
  if (isTp(h)) return `travelpayouts:${h}`;
  return h;
}

/* ---- Travelpayouts ortaklık bağlantıları (Drive betiği yerine) ----
 * Drive betiği sayfayı sürekli tarayıp ana iş parçacığını yarım saniyeye kadar kilitliyordu; hızlı kaydırınca sayfa boş görünüyordu.
 * Artık bağlantı yalnızca dokunulduğu anda /api/tp üzerinden ortaklık bağlantısına çevrilir. */
const TP_HOSTS = ['aviasales.com', 'kiwi.com', 'klook.com', 'yesim.app', 'kiwitaxi.com', 'localrent.com', 'welcomepickups.com', 'tiqets.com', 'gigsky.com', 'airalo.com', 'gettransfer.com', 'drimsim.com', 'getrentacar.com', 'airhelp.com', 'gocity.com', 'economybookings.com', 'bikesbooking.com', 'qeeq.com', 'wegotrip.com', 'autoeurope.eu', 'radicalstorage.com', 'intui.travel', 'compensair.com', 'saily.com', 'kkday.com'];
const isTp = (h: string) => TP_HOSTS.some((d) => h === d || h.endsWith(`.${d}`));
function toAff(e: Event): void {
  const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
  if (!a || a.dataset.vzAff) return;
  let u: URL;
  try {
    u = new URL(a.href, location.href);
  } catch {
    return;
  }
  if (u.protocol !== 'https:' || !isTp(u.hostname)) return;
  const seg = location.pathname.split('/').filter(Boolean);
  a.dataset.vzAff = u.toString();
  a.href = `/api/tp?u=${encodeURIComponent(u.toString())}&c=${encodeURIComponent(`vz_${seg[1] || 'home'}`.slice(0, 40))}`;
}

function onClick(e: MouseEvent): void {
  toAff(e);
  const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
  if (!a) return;
  let u: URL;
  try {
    u = new URL(a.dataset.vzAff || a.href, location.href);
  } catch {
    return;
  }
  if (!/^https?:$/.test(u.protocol) || u.hostname.endsWith('vizamigo.com') || u.hostname === location.hostname) return;
  const g = (window as W).gtag;
  if (!g) return;
  const seg = location.pathname.split('/').filter(Boolean);
  g('event', 'partner_click', {
    partner: partnerOf(u).slice(0, 100),
    link_domain: u.hostname.replace(/^www\./, ''),
    page_lang: seg[0] || '',
    page_section: seg[1] || 'home',
    link_text: (a.textContent || '').trim().slice(0, 80),
    transport_type: 'beacon'
  });
}

export function initAnalytics(): void {
  load();
  window.addEventListener('vz:consent', (e) => {
    if ((e as CustomEvent).detail === 'all') load();
  });
  document.addEventListener('click', onClick, true);
  document.addEventListener('auxclick', onClick as EventListener, true);
  // bağlantı yeni sekmede / uzun basışla açılsa da ortaklık bağlantısı olsun
  for (const ev of ['pointerdown', 'contextmenu', 'keydown', 'focusin']) document.addEventListener(ev, toAff, true);
}
