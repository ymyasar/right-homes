// Builds the static site into ./site  ->  node build.mjs
// No dependencies. Edit src/config.mjs for facts, src/pages.mjs for copy.
import { mkdirSync, writeFileSync, copyFileSync, rmSync, readdirSync, existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from './src/config.mjs';
import { buildPages } from './src/pages.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'site');
const write = (rel, content) => {
  const file = join(out, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
};

// Clear generated HTML but keep binary assets (fonts, icons, social image).
for (const entry of readdirSync(out)) {
  if (entry !== 'assets' && entry !== 'favicon.ico') rmSync(join(out, entry), { recursive: true, force: true });
}

// Stamp CSS and JS links with a hash of their contents, so browsers fetch the
// new file the moment it changes and can cache it for a long time otherwise.
const hash = (file) => createHash('sha256').update(readFileSync(join(root, file))).digest('hex').slice(0, 10);
const versions = { 'styles.css': hash('src/styles.css'), 'main.js': hash('src/main.js') };
const stamp = (html) => html.replace(/\/assets\/(styles\.css|main\.js)\?v=\w+/g, (_, f) => `/assets/${f}?v=${versions[f]}`);

const pages = buildPages();
for (const [path, html] of pages) {
  write(path.endsWith('/') ? `${path}index.html` : path, stamp(html));
}

copyFileSync(join(root, 'src/styles.css'), join(out, 'assets/styles.css'));
copyFileSync(join(root, 'src/main.js'), join(out, 'assets/main.js'));

// sitemap.xml
const urls = pages.filter(([, , o]) => o.sitemap !== false);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([path, , o]) => `  <url><loc>${site.url}${path}</loc><lastmod>${site.buildDate}</lastmod><priority>${o.priority}</priority></url>`).join('\n')}
</urlset>
`);

write('robots.txt', `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap.xml
`);

write('site.webmanifest', JSON.stringify({
  name: `${site.name} | Estate and letting agents in Luton`,
  short_name: site.name,
  start_url: '/',
  display: 'browser',
  background_color: '#ffffff',
  theme_color: '#1a3b7b',
  icons: [
    { src: '/assets/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/assets/icon-512.png', sizes: '512x512', type: 'image/png' },
  ],
}, null, 2));

// Netlify: security headers, long cache for versioned assets.
const csp = [
  "default-src 'self'",
  "img-src 'self' data:",
  "style-src 'self'",
  "script-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
].join('; ');
write('_headers', `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Content-Security-Policy: ${csp}

/assets/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/assets/*
  Cache-Control: public, max-age=2592000
`);

// Old one-page anchors and likely guesses, sent to the right page.
write('_redirects', `
/services                /                              301
/sell                    /sell-your-home-luton/         301
/selling                 /sell-your-home-luton/         301
/valuation               /free-valuation/               301
/landlords               /letting-agents-luton/         301
/lettings                /letting-agents-luton/         301
/management              /property-management-luton/    301
/guaranteed-rent         /guaranteed-rent-luton/        301
/rent                    /tenants/                      301
/renting                 /tenants/                      301
/about                   /contact/                      301
/blog                    /guides/                       301
/blog/*                  /guides/                       301
`);

const missing = ['assets/og.png', 'assets/logo.png', 'assets/logo@2x.png', 'assets/icon-192.png', 'assets/icon-512.png', 'assets/apple-touch-icon.png', 'favicon.ico'].filter((f) => !existsSync(join(out, f)));
console.log(`Built ${pages.length} pages into site/` + (missing.length ? `\nMissing binary assets: ${missing.join(', ')}` : ''));
