import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import './index.css';
import './styles/redesign.css';
import './styles/redesign-pages.css';
import './next/next.css';

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
