import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

function vizamigoSeoEnginePlugin(): Plugin {
  return {
    name: 'vizamigo-seo-sitemap-engine',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next();

        const [pathname, search] = req.url.split('?');

        // 1. Dynamic real-time /sitemap.xml endpoint
        if (pathname === '/sitemap.xml') {
          const mod = await server.ssrLoadModule('/scripts/generate-sitemap.ts');
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          res.setHeader('Cache-Control', 'public, max-age=3600');
          res.end(mod.generateSitemapXml());
          return;
        }

        // 2. Dynamic real-time /robots.txt endpoint
        if (pathname === '/robots.txt') {
          const mod = await server.ssrLoadModule('/scripts/generate-sitemap.ts');
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end(mod.generateRobotsTxt());
          return;
        }

        // 3. 301 Permanent Redirects for query-based language switch or legacy unprefixed routes
        if (pathname === '/' && search) {
          const params = new URLSearchParams(search);
          const langParam = (params.get('lang') || params.get('hl') || '').toLowerCase();
          if (['tr', 'en', 'de', 'ru', 'es'].includes(langParam)) {
            res.statusCode = 301;
            res.setHeader('Location', `/${langParam}`);
            res.end();
            return;
          }
        }

        if (/^\/(plan|track|nomad|profile|consular)\/?$/i.test(pathname)) {
          const cleanTab = pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
          res.statusCode = 301;
          res.setHeader('Location', `/en/${cleanTab}`);
          res.end();
          return;
        }

        const legacyCountryMatch = pathname.match(/^\/country\/([A-Za-z]{2})\/?$/);
        if (legacyCountryMatch) {
          res.statusCode = 301;
          res.setHeader('Location', `/en/country/${legacyCountryMatch[1].toUpperCase()}`);
          res.end();
          return;
        }

        // 4. Validate country codes on /:lang/country/:code
        next();
      });
    },
  };
}

function vizamigoNonBlockingCssPlugin(): Plugin {
  return {
    name: 'vizamigo-non-blocking-css',
    transformIndexHtml(html) {
      return html.replace(
        /<link\s+rel="stylesheet"\s+crossorigin\s+href="(\/assets\/index-[^"]+\.css)">/g,
        '<link rel="preload" href="$1" as="style" onload="this.onload=null;this.rel=\'stylesheet\'"><noscript><link rel="stylesheet" href="$1"></noscript>'
      );
    }
  };
}

export default defineConfig(() => {
  return {
    base: '/',
    plugins: [
      react(),
      tailwindcss(),
      vizamigoSeoEnginePlugin(),
      vizamigoNonBlockingCssPlugin(),
      visualizer({
        filename: 'dist/stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
      visualizer({
        filename: 'dist/stats.json',
        open: false,
        template: 'raw-data',
      }),
    ],
    build: {
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('passportData.ts')) {
              return 'data-passports';
            }
            if (id.includes('countryGeography.ts') || id.includes('geoData.ts')) {
              return 'data-geography';
            }
            if (id.includes('countryInsights.ts') || id.includes('countryTravelIntelligence.ts')) {
              return 'data-insights';
            }
            if (id.includes('countryVisuals.ts')) {
              return 'data-visuals';
            }
            if (id.includes('rideAndDeliveryApps.ts') || id.includes('travelConciergeEngine.ts')) {
              return 'data-nomad-apps';
            }
            if (id.includes('BentoSubWidgetModal.tsx')) {
              return 'bento-subwidgets-modal';
            }
            if (id.includes('BentoSecondaryWidgets.tsx')) {
              return 'bento-secondary-widgets';
            }
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || '.', '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
