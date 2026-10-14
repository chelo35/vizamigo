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

export default defineConfig(() => {
  return {
    base: '/',
    plugins: [
      react(),
      tailwindcss(),
      vizamigoSeoEnginePlugin(),
      visualizer({
        filename: 'dist/stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
      visualizer({
        filename: 'dist/stats.json',
        open: false,
        json: true,
      }),
    ],
    build: {
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/scheduler/')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('src/data/countryEncyclopedia') || id.includes('src/data/countryHeritage')) {
              return 'data-encyclopedia';
            }
            if (id.includes('src/data/countryItineraries')) {
              return 'data-itineraries';
            }
            if (id.includes('src/data/countryInsights')) {
              return 'data-insights';
            }
            if (id.includes('src/data/countryGeography')) {
              return 'data-geography';
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
