import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

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

        // 4. Validate country codes on /:lang/country/:code to return true 404 status for non-existent countries
        const localizedCountryMatch = pathname.match(/^\/(tr|en|de|ru|es)\/country\/([A-Za-z0-9_-]+)\/?$/i);
        if (localizedCountryMatch) {
          const mod = await server.ssrLoadModule('/scripts/generate-sitemap.ts');
          const code = localizedCountryMatch[2].toUpperCase();
          const validCodes = new Set(mod.getAllIndexedCountryCodes());
          if (!validCodes.has(code)) {
            res.statusCode = 404;
            const notFoundPath = path.resolve(__dirname, 'public/404.html');
            if (fs.existsSync(notFoundPath)) {
              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.end(fs.readFileSync(notFoundPath, 'utf-8'));
              return;
            }
          }
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), vizamigoSeoEnginePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
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
