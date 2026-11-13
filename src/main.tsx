import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';
import './styles/redesign.css';
import './styles/redesign-pages.css';
import './next/next.css';
import { routeLink } from './data/tpPartners';
import { captureRef, tagRef } from './utils/refTracking';
import { watchToolbarInset } from './utils/toolbarInset';

// Fenomen bağlantısıyla gelindiyse (?ref=kod) kodu 30 gün sakla
captureRef();

// Kilitli (komisyon getirmeyen) marka bağlantılarını tıklama anında bağlı alternatife çevir (eski bileşenler dahil)
if (typeof document !== 'undefined') {
  const fix = (e: Event) => {
    const a = (e.target as Element | null)?.closest?.('a[href^="http"]') as HTMLAnchorElement | null;
    if (!a) return;
    // kilitli markayı bağlı alternatife çevir, sonra varsa fenomen kodunu ekle
    const to = tagRef(routeLink(a.href));
    if (to !== a.href) a.href = to;
  };
  document.addEventListener('pointerdown', fix, true);
  document.addEventListener('click', fix, true);
}

// Register PWA service worker for offline in-flight access
if (typeof window !== 'undefined' && 'serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

// Yeni sürüm yayınlanınca açık sekmedeki eski kod artık olmayan parçaları ister; sayfayı bir kez yenile
if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', (e) => {
    e.preventDefault();
    try {
      const last = Number(sessionStorage.getItem('vz_chunk_reload') || 0);
      if (Date.now() - last < 20000) return;
      sessionStorage.setItem('vz_chunk_reload', String(Date.now()));
    } catch {}
    window.location.reload();
  });
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

try {
  watchToolbarInset();
} catch {}
