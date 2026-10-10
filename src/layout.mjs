import { site, images } from './config.mjs';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const abs = (path) => site.url + path;
export const tel = `tel:${site.phoneE164}`;
export const telMobile = `tel:${site.mobileE164}`;
export const addressLine = `${site.address.street}, ${site.address.town} ${site.address.postcode}`;

const c = site.compliance;
export const hasFees = Boolean(c.redress && c.cmp && c.landlordFees.length && c.tenantFees.length);

// ---------------------------------------------------------------- images ---
const CROPS = { postbox: 'left' };

export function imgUrl(key, w, ratio) {
  const im = images[key];
  const h = Math.round(w * ratio);
  const crop = CROPS[key] ? `&crop=${CROPS[key]}` : '';
  return `https://images.unsplash.com/photo-${im.id}?auto=format&fit=crop${crop}&w=${w}&h=${h}&q=70`;
}

/** ratio = height / width. widths = candidate pixel widths for srcset. */
export function picture(key, { ratio = 0.8, widths = [480, 720, 960, 1280], sizes = '(min-width: 960px) 45vw, 100vw', cls = '', eager = false } = {}) {
  const im = images[key];
  const srcset = widths.map((w) => `${esc(imgUrl(key, w, ratio))} ${w}w`).join(', ');
  const base = widths[Math.min(1, widths.length - 1)];
  return `<img${cls ? ` class="${cls}"` : ''} src="${esc(imgUrl(key, base, ratio))}" srcset="${srcset}" sizes="${sizes}" width="${base}" height="${Math.round(base * ratio)}" alt="${esc(im.alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;
}

export function preloadImage(key, { ratio, widths, sizes }) {
  const srcset = widths.map((w) => `${esc(imgUrl(key, w, ratio))} ${w}w`).join(', ');
  return `<link rel="preload" as="image" imagesrcset="${srcset}" imagesizes="${sizes}" fetchpriority="high">`;
}

// ----------------------------------------------------------------- icons ---
export const icon = {
  phone: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 16.5v3a2 2 0 0 1-2.2 2A19 19 0 0 1 2.5 5.2 2 2 0 0 1 4.500 3h3a2 2 0 0 1 2 1.700c.1.900.300 1.800.600 2.600a2 2 0 0 1-.4 2.100L8.400 10.700a15 15 0 0 0 5 5l1.300-1.300a2 2 0 0 1 2.100-.4c.8.300 1.700.500 2.600.600a2 2 0 0 1 1.600 1.900z"/></svg>',
  pin: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5.500-8 12-8 12s-8-6.500-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.800"/></svg>',
  tick: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
  clock: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  mail: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  star: '<svg class="i star" viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2.500 2.900 6 6.600.900-4.800 4.600 1.200 6.500L12 17.400 6.100 20.500l1.200-6.500L2.500 9.400l6.600-.9z"/></svg>',
};
const mark = '<svg class="mark" viewBox="0 0 32 40" aria-hidden="true"><path d="M3 38V15a13 13 0 0 1 26 0v23z"/><path class="mark-in" d="M10 38V16a6 6 0 0 1 12 0v22"/><circle class="mark-dot" cx="18.500" cy="27" r="1.500"/></svg>';

// ------------------------------------------------------------------- nav ---
export const NAV = [
  ['/sell-your-home-luton/', 'Sell'],
  ['/letting-agents-luton/', 'Landlords'],
  ['/tenants/', 'Tenants'],
  ['/areas/', 'Areas'],
  ['/guides/', 'Guides'],
  ['/contact/', 'Contact'],
];

const navLinks = (current) => NAV.map(([href, label]) => `<a href="${href}"${current === href || (href !== '/' && current.startsWith(href)) ? ' aria-current="page"' : ''}>${label}</a>`).join('');

function header(current) {
  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap header-row">
    <a class="logo" href="/" aria-label="${esc(site.name)} home">${mark}<span>${esc(site.name)}</span></a>
    <nav class="nav-desk" aria-label="Main">${navLinks(current)}</nav>
    <div class="header-cta">
      <a class="header-phone" href="${tel}">${icon.phone}<span>${site.phoneDisplay}</span></a>
      <a class="btn btn-gold btn-sm" href="/free-valuation/">Free valuation</a>
    </div>
    <details class="nav-mob">
      <summary aria-label="Menu"><span></span><span></span><span></span></summary>
      <nav aria-label="Mobile">${navLinks(current)}<a href="/free-valuation/">Free valuation</a><a href="${tel}">Call ${site.phoneDisplay}</a><a href="${telMobile}">Mobile ${site.mobileDisplay}</a></nav>
    </details>
  </div>
</header>`;
}

function footer() {
  const a = site.address;
  const hours = site.hours.length ? `<p class="foot-hours">${site.hours.map(([d, t]) => `${esc(d)}: ${esc(t)}`).join('<br>')}</p>` : '';
  return `<footer class="site-footer">
  <div class="wrap foot-grid">
    <div class="foot-brand">
      <a class="logo logo-light" href="/">${mark}<span>${esc(site.name)}</span></a>
      <p>Independent estate and letting agents in Luton town centre. Sales, lettings and property management across LU1 to LU4.</p>
      <address>
        ${esc(a.street)}<br>${esc(a.town)}, ${esc(a.county)}<br>${esc(a.postcode)}
      </address>
      <p><a class="foot-phone" href="${tel}">${site.phoneDisplay}</a><br><a class="foot-phone" href="${telMobile}">${site.mobileDisplay}</a>${site.email ? `<br><a href="mailto:${esc(site.email)}">${esc(site.email)}</a>` : ''}</p>
      ${hours}
    </div>
    <nav aria-label="Selling">
      <h2>Selling</h2>
      <ul>
        <li><a href="/sell-your-home-luton/">Sell your home in Luton</a></li>
        <li><a href="/free-valuation/">Free valuation</a></li>
        <li><a href="/areas/">Areas we cover</a></li>
      </ul>
    </nav>
    <nav aria-label="Landlords and tenants">
      <h2>Letting</h2>
      <ul>
        <li><a href="/letting-agents-luton/">Letting agents in Luton</a></li>
        <li><a href="/property-management-luton/">Property management</a></li>
        <li><a href="/guaranteed-rent-luton/">Guaranteed rent</a></li>
        <li><a href="/tenants/">Find a home to rent</a></li>
      </ul>
    </nav>
    <nav aria-label="Help">
      <h2>Help</h2>
      <ul>
        <li><a href="/guides/">Guides</a></li>
        <li><a href="/faq/">Questions and answers</a></li>
        <li><a href="/contact/">Contact</a></li>
        ${hasFees ? '<li><a href="/fees/">Fees and client protection</a></li>' : ''}
        <li><a href="/privacy/">Privacy</a></li>
      </ul>
    </nav>
  </div>
  <div class="wrap foot-base">
    <p>&copy; <span data-year>2026</span> ${esc(site.legalName)}.${site.companyNumber ? ` Registered in England and Wales, company number ${esc(site.companyNumber)}.` : ''}</p>
    <p>Photographs on this site are illustrative and do not show properties for sale or to let.</p>
  </div>
</footer>
<div class="action-bar">
  <a href="${tel}">${icon.phone}Call us</a>
  <a class="gold" href="/free-valuation/">Free valuation</a>
</div>`;
}

// ---------------------------------------------------------------- schema ---
export const agentSchema = () => {
  const a = site.address;
  const s = {
    '@type': 'RealEstateAgent',
    '@id': abs('/#agent'),
    name: site.name,
    alternateName: site.legalName,
    url: abs('/'),
    telephone: site.phoneE164,
    image: abs('/assets/og.png'),
    logo: abs('/assets/icon-512.png'),
    address: { '@type': 'PostalAddress', streetAddress: a.street.replace('–', '-'), addressLocality: a.town, addressRegion: a.county, postalCode: a.postcode, addressCountry: 'GB' },
    areaServed: [
      { '@type': 'City', name: 'Luton' },
      { '@type': 'AdministrativeArea', name: 'Bedfordshire' },
    ],
    knowsAbout: ['Residential property sales', 'Residential lettings', 'Property management', 'Guaranteed rent'],
  };
  if (site.email) s.email = site.email;
  if (site.hours.length) s.openingHours = site.hours.map(([d, t]) => `${d} ${t}`);
  const same = [site.rating.url, site.googleReviewsUrl].filter(Boolean);
  if (same.length) s.sameAs = same;
  return s;
};

export const crumbSchema = (crumbs) => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map(([href, name], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(href) })),
});

export const faqSchema = (faqs) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })),
});

export const serviceSchema = (name, description, path) => ({
  '@type': 'Service',
  name,
  description,
  url: abs(path),
  serviceType: name,
  provider: { '@id': abs('/#agent') },
  areaServed: { '@type': 'City', name: 'Luton' },
});

// ------------------------------------------------------------ components ---
export const crumbs = (list) => `<nav class="crumbs" aria-label="Breadcrumb"><ol>${list.map(([href, name], i) => i === list.length - 1 ? `<li aria-current="page">${esc(name)}</li>` : `<li><a href="${href}">${esc(name)}</a></li>`).join('')}</ol></nav>`;

export const ticks = (items, cls = '') => `<ul class="ticks ${cls}">${items.map((t) => `<li>${icon.tick}<span>${t}</span></li>`).join('')}</ul>`;

export const steps = (items) => `<ol class="steps">${items.map(([h, p], i) => `<li><span class="plaque" aria-hidden="true">${i + 1}</span><div><h3>${h}</h3><p>${p}</p></div></li>`).join('')}</ol>`;

export const faqList = (faqs) => `<div class="faqs">${faqs.map(([q, a]) => `<details><summary>${q}</summary><div class="faq-a"><p>${a}</p></div></details>`).join('')}</div>`;

export function ratingLine(cls = '') {
  const r = site.rating;
  if (!r.value) return '';
  return `<a class="rating ${cls}" href="${esc(r.url)}" rel="noopener">${icon.star}<span><strong>${r.value} out of 5</strong> from ${r.count} reviews on ${esc(r.source)}</span></a>`;
}

/**
 * The one enquiry form used everywhere (a single Netlify form called "enquiry").
 * `type` preselects the enquiry type; `showProperty` adds the address field.
 */
export function enquiryForm({ heading = 'Send an enquiry', intro = '', type = '', button = 'Send enquiry', id = 'enquiry', page = '' } = {}) {
  const types = ['Selling a property', 'Free valuation', 'Letting or managing a property', 'Guaranteed rent', 'Looking to rent', 'Looking to buy', 'Something else'];
  return `<form class="form" id="${id}" name="enquiry" method="POST" action="/thank-you/" data-netlify="true" netlify-honeypot="company-website" data-enquiry>
  <input type="hidden" name="form-name" value="enquiry">
  <input type="hidden" name="page" value="${esc(page)}">
  <h2 class="form-title">${heading}</h2>
  ${intro ? `<p class="form-intro">${intro}</p>` : ''}
  <p class="hp"><label>Leave this empty <input name="company-website" tabindex="-1" autocomplete="off"></label></p>
  <div class="field-row">
    <div class="field"><label for="${id}-name">Your name</label><input id="${id}-name" name="name" type="text" autocomplete="name" required></div>
    <div class="field"><label for="${id}-phone">Phone number</label><input id="${id}-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required></div>
  </div>
  <div class="field-row">
    <div class="field"><label for="${id}-email">Email <span class="opt">optional</span></label><input id="${id}-email" name="email" type="email" autocomplete="email"></div>
    <div class="field"><label for="${id}-type">What do you need?</label>
      <select id="${id}-type" name="enquiry-type" required>
        <option value=""${type ? '' : ' selected'} disabled>Choose one</option>
        ${types.map((t) => `<option${t === type ? ' selected' : ''}>${t}</option>`).join('')}
      </select>
    </div>
  </div>
  <div class="field"><label for="${id}-property">Property address or postcode <span class="opt">optional</span></label><input id="${id}-property" name="property" type="text" autocomplete="street-address"></div>
  <div class="field"><label for="${id}-message">Anything we should know? <span class="opt">optional</span></label><textarea id="${id}-message" name="message" rows="4"></textarea></div>
  <button class="btn btn-brand btn-block" type="submit">${button}</button>
  <p class="form-note">We reply by phone. Your details are only used to answer this enquiry. <a href="/privacy/">Privacy</a></p>
  <p class="form-status" role="status" aria-live="polite" hidden></p>
</form>`;
}

export function contactPanel() {
  const a = site.address;
  return `<div class="contact-panel">
  <a class="contact-phone" href="${tel}">${icon.phone}<span><small>Call the office</small>${site.phoneDisplay}</span></a>
  <p class="contact-line">${icon.phone}<span>Mobile <a href="${telMobile}">${site.mobileDisplay}</a></span></p>
  <p class="contact-line">${icon.pin}<span>${esc(a.street)}, ${esc(a.town)} ${esc(a.postcode)}<br><a href="${esc(a.mapsUrl)}" rel="noopener">Get directions</a></span></p>
  ${site.email ? `<p class="contact-line">${icon.mail}<span><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></span></p>` : ''}
  ${site.hours.length ? `<p class="contact-line">${icon.clock}<span>${site.hours.map(([d, t]) => `${esc(d)}: ${esc(t)}`).join('<br>')}</span></p>` : ''}
  ${site.whatsapp ? `<p class="contact-line"><a class="btn btn-outline btn-sm" href="https://wa.me/${site.mobileE164.replace('+', '')}" rel="noopener">Message us on WhatsApp</a></p>` : ''}
  ${ratingLine('rating-dark')}
</div>`;
}

export function ctaBand({ title, text, primary = ['/free-valuation/', 'Book a free valuation'] }) {
  return `<section class="band band-brand cta-band">
  <div class="wrap cta-row">
    <div><h2>${title}</h2><p>${text}</p></div>
    <div class="cta-actions"><a class="btn btn-gold" href="${primary[0]}">${primary[1]}</a><a class="btn btn-ghost" href="${tel}">${icon.phone}${site.phoneDisplay}</a></div>
  </div>
</section>`;
}

// ------------------------------------------------------------------ page ---
export function page({ path, title, description, body, schema = [], bodyClass = '', noindex = false, preload = '', ogType = 'website' }) {
  const canonical = abs(path);
  const graph = { '@context': 'https://schema.org', '@graph': [agentSchema(), { '@type': 'WebSite', '@id': abs('/#website'), url: abs('/'), name: site.name, inLanguage: 'en-GB', publisher: { '@id': abs('/#agent') } }, { '@type': 'WebPage', '@id': canonical + '#page', url: canonical, name: title, description, inLanguage: 'en-GB', isPartOf: { '@id': abs('/#website') }, about: { '@id': abs('/#agent') } }, ...schema] };
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex, follow">' : `<link rel="canonical" href="${canonical}">`}
<meta name="theme-color" content="#143f7a">
<meta name="format-detection" content="telephone=no">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="en_GB">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${abs('/assets/og.png')}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(site.name)}, estate and letting agents in Luton">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/assets/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/fonts/cabin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/caslon-display.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preconnect" href="https://images.unsplash.com" crossorigin>
${preload}
<link rel="stylesheet" href="/assets/styles.css?v=${site.buildDate.replace(/-/g, '')}">
<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
${header(path)}
<main id="main">
${body}
</main>
${footer()}
<script src="/assets/main.js?v=${site.buildDate.replace(/-/g, '')}" defer></script>
</body>
</html>
`;
}
