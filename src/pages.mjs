import { site } from './config.mjs';
import {
  page, picture, preloadImage, crumbs, ticks, steps, faqList, ratingLine, enquiryForm, contactPanel, ctaBand, telMobile,
  crumbSchema, faqSchema, serviceSchema, icon, tel, abs, esc, hasFees, addressLine,
} from './layout.mjs';

const P = site.phoneDisplay;
const HERO_IMG = { ratio: 1.25, sizes: '(min-width: 960px) 40vw, 86vw' };
const SIDE_IMG = { ratio: 1.25, sizes: '(min-width: 960px) 36vw, 86vw' };
const ROW_IMG = { ratio: 0.8, sizes: '(min-width: 960px) 44vw, 100vw' };

// -------------------------------------------------------------- FAQ data ---
const FAQ = {
  sellers: [
    ['How much does a valuation cost?', 'Nothing. A market appraisal is free and you are under no obligation to instruct us afterwards. We visit the property, look at what has sold nearby and tell you the price we would put it on at and why.'],
    ['What do I need before my home can go on the market?', 'A valid Energy Performance Certificate (EPC), proof of your identity and address for the anti-money-laundering checks every estate agent must carry out, and proof that you own the property. If your EPC has expired we can arrange a new one.'],
    ['How long does it take to sell a house in Luton?', 'It depends on the price, the property and the chain. Finding a buyer is usually the quicker part. The legal work after an offer is accepted commonly takes around three months, and longer if the chain is complicated. Pricing correctly on day one is what shortens it most.'],
    ['What will it cost me to sell?', 'Our fee depends on the property and is confirmed in writing before you commit to anything. You will also need to budget for a solicitor or conveyancer and, if you do not have a valid one, an EPC. Call us and we will give you a figure for your property.'],
    ['Do I have to be at the viewings?', 'No. We accompany viewings, so you do not need to take time off work or show strangers round your home yourself.'],
  ],
  landlords: [
    ['What does a landlord legally need before letting a property?', 'At minimum: a gas safety certificate renewed every year if there is gas, an electrical installation condition report (EICR) no more than five years old, an EPC rated E or above unless exempt, working smoke alarms on every storey, carbon monoxide alarms in rooms with a fixed combustion appliance, and the tenant’s deposit protected in a government-approved scheme within 30 days. Some shared houses also need a licence from Luton Council. We check all of this with you before a tenant moves in.'],
    ['What is the difference between let only and full management?', 'With let only we find and reference the tenant and set up the tenancy, then you manage it yourself. With full management we also collect the rent, deal with repairs, carry out inspections and keep the safety certificates in date, so the tenant calls us and not you.'],
    ['What is guaranteed rent?', 'A fixed monthly payment to you for an agreed term, whether or not the property is occupied and whether or not the occupier has paid. In exchange the figure is normally below the full market rent. <a href="/guides/guaranteed-rent-vs-managed-lettings/">Our guide compares it with managed lettings</a>.'],
    ['How do you vet tenants?', 'Every applicant is referenced before a tenancy is offered. That covers identity and right to rent, income and employment, and previous landlord references where there are any. You see the result and you make the final decision.'],
    ['How much do you charge landlords?', 'It depends on the service and the property. We give you the fee in writing before you sign anything, and the initial rental appraisal is free.'],
  ],
  tenants: [
    ['What do I need to rent a property?', 'Photo ID and proof of your right to rent in the UK, proof of income such as payslips or an employment contract, and details for a previous landlord if you have one. Having these ready is the quickest way to secure a property you like.'],
    ['Will I be charged fees as a tenant?', 'Agents in England cannot charge tenants for viewings, referencing or administration. You pay the rent and a refundable tenancy deposit, which is capped by law at five weeks’ rent where the annual rent is under £50,000. A refundable holding deposit of up to one week’s rent can be taken to reserve a property.'],
    ['How do I hear about properties?', 'Join the tenant register. Tell us the area, size and budget you are looking for and we will call you when something suitable comes in, often before it is advertised anywhere else.'],
    ['Is my deposit protected?', 'Yes. Tenancy deposits have to be protected in a government-approved scheme and you must be told which one within 30 days of paying.'],
  ],
};
const ALL_FAQS = [...FAQ.sellers, ...FAQ.landlords, ...FAQ.tenants];

// ----------------------------------------------------- inner page template ---
function pageHero({ trail, h1, lede, image, primary, secondary }) {
  return `<section class="page-hero">
  <div class="wrap page-hero-grid">
    <div>
      ${crumbs(trail)}
      <h1>${h1}</h1>
      <p class="lede">${lede}</p>
      <div class="btn-row">
        <a class="btn btn-gold" href="${primary[0]}">${primary[1]}</a>
        <a class="btn btn-outline" href="${secondary ? secondary[0] : tel}">${secondary ? secondary[1] : `${icon.phone}Call ${P}`}</a>
      </div>
      ${ratingLine('rating-dark')}
    </div>
    ${image ? `<div class="arch arch-sm">${picture(image, { ...SIDE_IMG, eager: true })}</div>` : ''}
  </div>
</section>`;
}

function formSection({ title, text, type, button, pagePath, points = [] }) {
  return `<section class="band band-stone" id="enquire">
  <div class="wrap form-grid">
    <div>
      <h2>${title}</h2>
      <p class="lede">${text}</p>
      ${points.length ? ticks(points) : ''}
      ${contactPanel()}
    </div>
    ${enquiryForm({ heading: button, type, button, page: pagePath })}
  </div>
</section>`;
}

const related = (items) => `<section class="band">
  <div class="wrap">
    <h2>Related</h2>
    <ul class="link-cards">${items.map(([href, h, p]) => `<li><a href="${href}"><strong>${h}</strong><span>${p}</span></a></li>`).join('')}</ul>
  </div>
</section>`;

// ================================================================== HOME ===
function home() {
  const path = '/';
  const title = 'Estate & Letting Agents in Luton | Right Homes';
  const description = `Independent estate and letting agents on George Street, Luton. Free valuations, lettings, management and guaranteed rent across LU1 to LU4. Call ${P}.`;
  const r = site.rating;

  const reviews = site.reviews.length ? `<section class="band">
  <div class="wrap">
    <h2>What clients say</h2>
    <ul class="reviews">${site.reviews.map((v) => `<li><blockquote><p>${esc(v.quote)}</p></blockquote><p class="review-by"><strong>${esc(v.name)}</strong>${v.role ? `<span>${esc(v.role)}</span>` : ''}</p></li>`).join('')}</ul>
    ${ratingLine('rating-dark')}
  </div>
</section>` : '';

  const body = `<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <h1>Estate and letting agents in Luton</h1>
      <p class="hero-lede">Right Homes sells, lets and manages homes across Luton from an office on George Street. Tell us what you need and you will speak to someone who knows your street.</p>
      <ul class="routes">
        <li><a href="/free-valuation/"><strong>I want to sell</strong><span>Book a free valuation</span></a></li>
        <li><a href="/letting-agents-luton/"><strong>I am a landlord</strong><span>Let or manage a property</span></a></li>
        <li><a href="/tenants/"><strong>I want to rent</strong><span>Join the tenant register</span></a></li>
      </ul>
      <p class="hero-call">Or call <a href="${tel}">${P}</a> or <a href="${telMobile}">${site.mobileDisplay}</a></p>
    </div>
    <div class="hero-art">
      <div class="arch">${picture('hero', { ...HERO_IMG, eager: true })}</div>
      ${r.value ? `<a class="hero-plaque" href="${esc(r.url)}" rel="noopener">${icon.star}<span><strong>${r.value} out of 5</strong>${r.count} reviews on ${esc(r.source)}</span></a>` : ''}
    </div>
  </div>
</section>

<section class="facts" aria-label="About Right Homes">
  <dl class="wrap facts-row">
    <div><dt>${site.yearsEstablished} years</dt><dd>in Luton property</dd></div>
    <div><dt>${site.propertiesManaged}</dt><dd>properties managed</dd></div>
    <div><dt>LU1 to LU4</dt><dd>every Luton postcode</dd></div>
    <div><dt>George Street</dt><dd>town centre office</dd></div>
  </dl>
</section>

<section class="band" id="services">
  <div class="wrap">
    <div class="section-head">
      <h2>What we do</h2>
      <p class="lede">Sales, lettings and management from one office, so you deal with the same people whichever you need.</p>
    </div>
    <div class="rows">
      <article class="row">
        <div class="row-img">${picture('semi', ROW_IMG)}</div>
        <div class="row-copy">
          <h3><a href="/sell-your-home-luton/">Selling your home</a></h3>
          <p>A price based on what has sold near you, marketing that shows the property properly, and someone negotiating on your side until the keys change hands.</p>
          ${ticks(['Free valuation with no obligation', 'Accompanied viewings', 'One point of contact through to completion'])}
          <a class="text-link" href="/sell-your-home-luton/">How we sell homes in Luton</a>
        </div>
      </article>
      <article class="row row-flip">
        <div class="row-img">${picture('keys', ROW_IMG)}</div>
        <div class="row-copy">
          <h3><a href="/letting-agents-luton/">Letting your property</a></h3>
          <p>We find the tenant, reference them and set up the tenancy correctly, so the rent arrives and the paperwork stands up.</p>
          ${ticks(['Fully referenced tenants', 'Tenancy set up and deposit protected', 'Guaranteed rent available'])}
          <a class="text-link" href="/letting-agents-luton/">Lettings for Luton landlords</a>
        </div>
      </article>
      <article class="row">
        <div class="row-img">${picture('terrace', ROW_IMG)}</div>
        <div class="row-copy">
          <h3><a href="/property-management-luton/">Managing it for you</a></h3>
          <p>Rent collection, repairs, inspections and safety certificates handled from our office. Your tenant calls us, not you.</p>
          ${ticks(['Repairs and maintenance arranged', 'Regular inspections', 'Compliance kept in date'])}
          <a class="text-link" href="/property-management-luton/">Property management in Luton</a>
        </div>
      </article>
    </div>
  </div>
</section>

<section class="band band-brand split-band">
  <div class="wrap split">
    <div class="split-col">
      <h2>Landlord register</h2>
      <p>Put your property in front of referenced tenants who are already looking across Luton and Bedfordshire.</p>
      ${ticks(['Guaranteed rent options', 'Strict tenant vetting', 'Free initial rental appraisal'], 'ticks-light')}
      <a class="btn btn-gold" href="/letting-agents-luton/#enquire">Register as a landlord</a>
    </div>
    <div class="split-col">
      <h2>Tenant register</h2>
      <p>Hear about homes before they reach the portals. Tell us what you need and we will call when it comes in.</p>
      ${ticks(['Priority property alerts', 'Accompanied, flexible viewings', 'Clear referencing with no hidden fees'], 'ticks-light')}
      <a class="btn btn-ghost" href="/tenants/#enquire">Register as a tenant</a>
    </div>
  </div>
</section>

<section class="band band-stone">
  <div class="wrap">
    <div class="section-head">
      <h2>How a valuation works</h2>
      <p class="lede">It usually takes about half an hour at the property and costs nothing.</p>
    </div>
    ${steps([
      ['Tell us about the property', 'Call or send the form. We ask a few questions and agree a time to visit that suits you.'],
      ['We visit and price it', 'We look round, compare it with recent sales and lets on nearby streets, and explain the figure.'],
      ['You decide what happens next', 'Sell, let, or do nothing. The valuation is yours either way and nobody chases you.'],
    ])}
    <div class="btn-row"><a class="btn btn-brand" href="/free-valuation/">Book a free valuation</a></div>
  </div>
</section>

<section class="band" id="areas">
  <div class="wrap areas-grid">
    <div class="areas-art">
      <div class="areas-a">${picture('postbox', { ratio: 0.8, sizes: '(min-width: 960px) 30vw, 60vw' })}</div>
      <div class="areas-b">${picture('park', { ratio: 1, sizes: '(min-width: 960px) 20vw, 40vw' })}</div>
    </div>
    <div>
      <h2>Across Luton, street by street</h2>
      <p class="lede">A terrace off Dunstable Road, a semi in Stopsley and a flat by the station are three different markets. We work in all of them.</p>
      <ul class="area-list">
        <li><strong>LU1</strong> Town centre, Bury Park, Farley Hill, Park Town</li>
        <li><strong>LU2</strong> High Town, Round Green, Stopsley, Wigmore</li>
        <li><strong>LU3</strong> Biscot, Limbury, Bramingham, Sundon Park</li>
        <li><strong>LU4</strong> Leagrave, Challney, Lewsey</li>
      </ul>
      <a class="text-link" href="/areas/">See the areas we cover</a>
    </div>
  </div>
</section>

${reviews}

<section class="band band-stone">
  <div class="wrap faq-grid">
    <div>
      <h2>Questions people ask first</h2>
      <p class="lede">Straight answers for sellers, landlords and tenants.</p>
      <a class="text-link" href="/faq/">All questions and answers</a>
    </div>
    ${faqList([FAQ.sellers[0], FAQ.sellers[2], FAQ.landlords[2], FAQ.tenants[1]])}
  </div>
</section>

<section class="band" id="contact">
  <div class="wrap form-grid">
    <div>
      <h2>Talk to the office</h2>
      <p class="lede">Selling, letting or looking for somewhere to live. Call, or leave your number and we will ring you back.</p>
      ${contactPanel()}
    </div>
    ${enquiryForm({ heading: 'Request a call back', button: 'Request a call back', page: path })}
  </div>
</section>`;

  return page({ path, title, description, body, preload: preloadImage('hero', HERO_IMG), bodyClass: 'home' });
}

// ================================================================== SELL ===
function sell() {
  const path = '/sell-your-home-luton/';
  const title = 'Sell Your Home in Luton | Estate Agents | Right Homes';
  const description = 'Selling a house or flat in Luton? Right Homes gives you an evidence-based price, accompanied viewings and one contact through to completion. Free valuation.';
  const trail = [['/', 'Home'], [path, 'Sell your home in Luton']];
  const body = `${pageHero({ trail, h1: 'Sell your home in Luton', lede: 'A sale goes well when the price is right on day one and someone keeps hold of it until completion. That is the job we do.', image: 'wisteria', primary: ['/free-valuation/', 'Book a free valuation'] })}

<section class="band">
  <div class="wrap prose-grid">
    <div class="prose">
      <h2>Priced on evidence, not optimism</h2>
      <p>The agent who quotes the highest figure is not always the one who gets you the most money. An overpriced home sits, gets reduced, and buyers start asking what is wrong with it.</p>
      <p>We price from what has actually sold on your street and the streets around it, adjusted for condition, parking, extensions and how the market is moving this month. You see the comparables we used, so you can judge the figure for yourself.</p>
      <h2>Marketing that does the property justice</h2>
      <p>Buyers decide whether to view from the first photograph and the first two lines. We present the property clearly, describe it accurately and put it in front of the buyers already registered with us as well as the wider market.</p>
      <h2>Someone on your side of the negotiation</h2>
      <p>Every offer is put to you with what we know about the buyer: whether they have a mortgage agreed, whether they have a property to sell, how quickly they can move. A slightly lower offer from a buyer who can complete is often worth more than a higher one that falls through.</p>
      <h2>Chased through to completion</h2>
      <p>Most sales that collapse do so after the offer is accepted. We stay in contact with both solicitors and the rest of the chain, so problems are found and dealt with early.</p>
    </div>
    <aside class="aside-card">
      <h2>What is included</h2>
      ${ticks(['Free, no-obligation valuation', 'Comparable sales evidence for your street', 'Accompanied viewings', 'Buyers checked before offers are recommended', 'Regular updates from one named contact', 'Sale progression through to completion'])}
      <a class="btn btn-brand btn-block" href="/free-valuation/">Book a free valuation</a>
    </aside>
  </div>
</section>

<section class="band band-stone">
  <div class="wrap">
    <div class="section-head"><h2>From valuation to completion</h2><p class="lede">The stages every sale goes through, in order.</p></div>
    ${steps([
      ['Valuation', 'We visit, look at the property and agree an asking price with you.'],
      ['Preparing to market', 'ID checks, the EPC and the details are sorted so nothing holds up a buyer later.'],
      ['Viewings and offers', 'We show buyers round and bring you each offer with the buyer’s position.'],
      ['Sale agreed', 'Solicitors are instructed on both sides and the buyer’s survey and mortgage are arranged.'],
      ['Exchange and completion', 'Contracts are exchanged, a date is fixed, and the keys are handed over.'],
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap faq-grid">
    <div><h2>Selling questions</h2><p class="lede">What sellers in Luton ask us most.</p><a class="text-link" href="/faq/">All questions and answers</a></div>
    ${faqList(FAQ.sellers)}
  </div>
</section>

${formSection({ title: 'Find out what your home is worth', text: 'Leave your details and we will call to arrange a visit.', type: 'Free valuation', button: 'Book my free valuation', pagePath: path })}
${related([['/free-valuation/', 'Free valuation', 'What happens at the visit and what to have ready.'], ['/areas/', 'Areas we cover', 'Luton neighbourhoods by postcode.'], ['/faq/', 'Questions and answers', 'Costs, timescales and paperwork.']])}`;
  return page({ path, title, description, body, schema: [crumbSchema(trail), serviceSchema('Residential property sales in Luton', description, path)] });
}

// ============================================================= VALUATION ===
function valuation() {
  const path = '/free-valuation/';
  const title = 'Free House Valuation in Luton | Right Homes';
  const description = 'Book a free, no-obligation valuation of your Luton house or flat. We visit, compare recent sales nearby and tell you what it should sell or let for.';
  const trail = [['/', 'Home'], [path, 'Free valuation']];
  const body = `<section class="page-hero">
  <div class="wrap form-grid">
    <div>
      ${crumbs(trail)}
      <h1>Free house valuation in Luton</h1>
      <p class="lede">Find out what your property should sell or let for. We visit, compare it with what has gone on nearby and give you a figure you can rely on.</p>
      ${ticks(['Free, with no obligation to instruct us', 'Usually about half an hour at the property', 'Sales and rental figures if you want both', 'Covers every Luton postcode, LU1 to LU4'])}
      ${contactPanel()}
    </div>
    ${enquiryForm({ heading: 'Book your valuation', intro: 'Leave your number and we will call to agree a time.', type: 'Free valuation', button: 'Book my free valuation', page: path })}
  </div>
</section>

<section class="band band-stone">
  <div class="wrap">
    <div class="section-head"><h2>What happens</h2></div>
    ${steps([
      ['We call you back', 'A quick conversation about the property and a time to visit that suits you.'],
      ['We look round', 'Room sizes, condition, improvements, parking, the garden and anything else a buyer or tenant would weigh up.'],
      ['You get a figure and the reasoning', 'A realistic price with the nearby sales or lets it is based on, and our view on how to market it.'],
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap prose-grid">
    <div class="prose">
      <h2>Why an online estimate is not enough</h2>
      <p>Automated valuations work from averages. They cannot see a new kitchen, a loft conversion, a damp problem or the fact that one side of a road sells for more than the other. In a town with as much variety as Luton, that can move the figure by tens of thousands of pounds.</p>
      <p>An agent who has stood in the property and knows what similar homes have just achieved will get much closer, and can tell you what would add to the price before you market.</p>
      <h2>Useful to have ready</h2>
      <p>None of this is essential for the visit, but it helps:</p>
      ${ticks(['Details of any extensions or major work, with approvals if you have them', 'Lease length, ground rent and service charge for a flat', 'Your EPC if you have a recent one', 'An idea of when you would like to move'])}
    </div>
    <div class="arch arch-sm">${picture('living', SIDE_IMG)}</div>
  </div>
</section>

${ctaBand({ title: 'Rather talk it through first?', text: 'Call the office and ask whatever you need to.', primary: ['#enquiry', 'Book a valuation'] })}`;
  return page({ path, title, description, body, schema: [crumbSchema(trail), serviceSchema('Free property valuation in Luton', description, path)] });
}

// ============================================================= LANDLORDS ===
function lettings() {
  const path = '/letting-agents-luton/';
  const title = 'Letting Agents in Luton for Landlords | Right Homes';
  const description = 'Luton letting agents for landlords. Referenced tenants, tenancies set up correctly, full management and guaranteed rent options. Free rental appraisal.';
  const trail = [['/', 'Home'], [path, 'Letting agents in Luton']];
  const body = `${pageHero({ trail, h1: 'Letting agents in Luton', lede: 'We find tenants who pay and stay, set the tenancy up properly, and manage it for you if you would rather not take the calls.', image: 'keys', primary: ['#enquire', 'Get a free rental appraisal'] })}

<section class="band">
  <div class="wrap">
    <div class="section-head"><h2>Three ways to work with us</h2><p class="lede">Choose how involved you want to be. You can move between them as your circumstances change.</p></div>
    <ul class="options">
      <li>
        <h3>Let only</h3>
        <p>We market the property, carry out viewings, reference the tenant and set up the tenancy. You manage it from there.</p>
        ${ticks(['Marketing and accompanied viewings', 'Full tenant referencing', 'Tenancy agreement and deposit registration'])}
      </li>
      <li>
        <h3><a href="/property-management-luton/">Full management</a></h3>
        <p>Everything in let only, then we run the tenancy: rent, repairs, inspections and certificates.</p>
        ${ticks(['Rent collected and paid over to you', 'Repairs arranged with your approval', 'Inspections and compliance kept up to date'])}
        <a class="text-link" href="/property-management-luton/">Property management</a>
      </li>
      <li>
        <h3><a href="/guaranteed-rent-luton/">Guaranteed rent</a></h3>
        <p>A fixed payment every month for an agreed term, whether the property is occupied or not.</p>
        ${ticks(['No void periods to cover', 'No arrears to chase', 'A known income for the whole term'])}
        <a class="text-link" href="/guaranteed-rent-luton/">Guaranteed rent in Luton</a>
      </li>
    </ul>
  </div>
</section>

<section class="band band-stone">
  <div class="wrap prose-grid">
    <div class="prose">
      <h2>The tenant is the investment</h2>
      <p>A property let to the wrong person costs more than one left empty for a month. Every applicant is referenced before we recommend them: identity and right to rent, income and employment, and previous landlord references where they exist. You see the results and the decision is yours.</p>
      <h2>A register of people already looking</h2>
      <p>Tenants join our register and tell us what they need before a property is available. When yours comes up we can often arrange viewings the same week, which keeps the gap between tenancies short.</p>
      <h2>Paperwork that stands up</h2>
      <p>Letting law in England has changed a great deal, most recently with the Renters’ Rights Act, and the penalties for getting it wrong fall on the landlord. We make sure the tenancy, the deposit protection, the safety certificates and the information the tenant must be given are all in order before anyone moves in.</p>
    </div>
    <aside class="aside-card">
      <h2>Before you let, you need</h2>
      ${ticks(['Gas safety certificate, renewed yearly', 'Electrical report (EICR) under five years old', 'EPC rated E or above', 'Smoke alarms on every storey', 'Carbon monoxide alarms where required', 'A licence, if the property is a licensable HMO'])}
      <p class="aside-note">Not sure where you stand? We will check it with you at the appraisal.</p>
    </aside>
  </div>
</section>

<section class="band">
  <div class="wrap faq-grid">
    <div><h2>Landlord questions</h2><p class="lede">Asked at almost every appraisal.</p><a class="text-link" href="/faq/">All questions and answers</a></div>
    ${faqList(FAQ.landlords)}
  </div>
</section>

${formSection({ title: 'Find out what your property should let for', text: 'A free rental appraisal, with a clear recommendation on which service suits you.', type: 'Letting or managing a property', button: 'Request a rental appraisal', pagePath: path, points: ['Free and without obligation', 'Rent figure based on current lets nearby', 'Fees confirmed in writing before you commit'] })}
${related([['/property-management-luton/', 'Property management', 'What full management covers day to day.'], ['/guaranteed-rent-luton/', 'Guaranteed rent', 'How a fixed monthly payment works.'], ['/guides/guaranteed-rent-vs-managed-lettings/', 'Guide: guaranteed rent or managed?', 'The trade-offs, and the questions to ask.']])}`;
  return page({ path, title, description, body, schema: [crumbSchema(trail), serviceSchema('Residential lettings in Luton', description, path)] });
}

// ============================================================ MANAGEMENT ===
function management() {
  const path = '/property-management-luton/';
  const title = 'Property Management in Luton | Right Homes';
  const description = 'Full property management for Luton landlords: rent collection, repairs, inspections and safety compliance from a local office, with one point of contact.';
  const trail = [['/', 'Home'], ['/letting-agents-luton/', 'Letting agents in Luton'], [path, 'Property management']];
  const body = `${pageHero({ trail, h1: 'Property management in Luton', lede: 'Your tenant calls us, not you. We collect the rent, fix what breaks and keep the property legal, and you hear from one person who knows the file.', image: 'terrace', primary: ['#enquire', 'Ask about management'] })}

<section class="band">
  <div class="wrap">
    <div class="section-head"><h2>What we take off your hands</h2></div>
    <ul class="options">
      <li><h3>Rent</h3><p>Collected each month and paid over to you with a statement. Late payments are followed up straight away, before they become arrears.</p></li>
      <li><h3>Repairs and maintenance</h3><p>Tenants report problems to us. We get them assessed, tell you what it will cost and arrange the work once you agree.</p></li>
      <li><h3>Inspections</h3><p>Regular visits to check the property is being looked after, with anything that needs attention reported to you.</p></li>
      <li><h3>Safety and compliance</h3><p>Gas, electrical and energy certificates renewed before they lapse, alarms checked, and records kept in case you ever need them.</p></li>
      <li><h3>Tenancy changes</h3><p>Renewals, rent reviews, notices and check-outs handled correctly under the current rules.</p></li>
      <li><h3>End of tenancy</h3><p>Check-out, deposit return and re-letting lined up so the property is not sitting empty.</p></li>
    </ul>
  </div>
</section>

<section class="band band-stone">
  <div class="wrap prose-grid">
    <div class="prose">
      <h2>Who full management suits</h2>
      <p>Landlords who work full time, live away from Luton, own more than one property, or simply do not want a phone call about a boiler on a Sunday evening. It also suits anyone who is not confident keeping up with the rules, because the liability for a missed certificate or an unprotected deposit sits with the landlord.</p>
      <h2>A portfolio, or a single flat</h2>
      <p>We manage single properties and portfolios in the same way: one contact, one set of records and a clear account of what has been spent and why.</p>
      <h2>Already let, or with another agent?</h2>
      <p>We can take over the management of a property that already has a tenant in it. Tell us who manages it now and when the agreement ends, and we will explain how the handover works.</p>
    </div>
    <div class="arch arch-sm">${picture('bay', SIDE_IMG)}</div>
  </div>
</section>

${formSection({ title: 'Hand over the day-to-day', text: 'Tell us about the property and we will come back with what management would cost.', type: 'Letting or managing a property', button: 'Ask about management', pagePath: path, points: ['One point of contact', 'Fees confirmed in writing first', 'Existing tenancies welcome'] })}
${related([['/letting-agents-luton/', 'Letting agents in Luton', 'Let only, managed and guaranteed rent compared.'], ['/guaranteed-rent-luton/', 'Guaranteed rent', 'A fixed income with no voids.'], ['/faq/', 'Questions and answers', 'Legal requirements and fees.']])}`;
  return page({ path, title, description, body, schema: [crumbSchema(trail), serviceSchema('Property management in Luton', description, path)] });
}

// ======================================================= GUARANTEED RENT ===
function guaranteed() {
  const path = '/guaranteed-rent-luton/';
  const title = 'Guaranteed Rent in Luton for Landlords | Right Homes';
  const description = 'Guaranteed rent for Luton landlords: a fixed monthly payment for an agreed term, with no voids to cover and no arrears to chase. Ask for a figure.';
  const trail = [['/', 'Home'], ['/letting-agents-luton/', 'Letting agents in Luton'], [path, 'Guaranteed rent']];
  const body = `${pageHero({ trail, h1: 'Guaranteed rent in Luton', lede: 'A fixed payment into your account every month for an agreed term, whether the property is occupied or not.', image: 'model', primary: ['#enquire', 'Ask for a guaranteed rent figure'] })}

<section class="band">
  <div class="wrap prose-grid">
    <div class="prose">
      <h2>How it works</h2>
      <p>With an ordinary let, your income depends on the property being occupied and the tenant paying. With guaranteed rent, we agree a monthly figure and a term with you at the start, and that figure is what you receive.</p>
      <p>The trade-off is simple. In return for certainty, the guaranteed figure is normally lower than the full market rent you might achieve by letting it yourself in a good year.</p>
      <h2>When it makes sense</h2>
      ${ticks(['You have a mortgage payment to meet and cannot carry an empty month', 'You live away from Luton or abroad', 'You have had a bad experience with arrears', 'You own several properties and want predictable income', 'You want no day-to-day involvement at all'])}
      <h2>What to ask any provider, including us</h2>
      <p>Guaranteed rent agreements vary, so get the answers in writing:</p>
      ${ticks(['Who is my contract with, and for how long?', 'Who will live in the property, and how are they chosen?', 'Who pays for repairs, and up to what amount?', 'In what condition will the property be returned?', 'How can either side end the agreement early?', 'Do my mortgage lender and insurer allow this arrangement?'])}
      <p>We go through each of these with you before you sign anything. <a href="/guides/guaranteed-rent-vs-managed-lettings/">Read our full comparison of guaranteed rent and managed lettings</a>.</p>
    </div>
    <aside class="aside-card">
      <h2>In short</h2>
      ${ticks(['Fixed monthly payment', 'Agreed term', 'No void periods to cover', 'No arrears to chase', 'No tenant calls'])}
      <a class="btn btn-brand btn-block" href="#enquire">Ask for a figure</a>
      <p class="aside-note">The figure depends on the property, its condition and the area. We confirm it after seeing it.</p>
    </aside>
  </div>
</section>

${formSection({ title: 'Ask for a guaranteed rent figure', text: 'Tell us the address and we will come back with a monthly figure and the terms.', type: 'Guaranteed rent', button: 'Ask for a figure', pagePath: path, points: ['No obligation', 'Terms explained in plain English', 'Compared honestly with a managed let'] })}
${related([['/guides/guaranteed-rent-vs-managed-lettings/', 'Guide: guaranteed rent or managed?', 'The trade-offs in detail.'], ['/property-management-luton/', 'Property management', 'Full market rent, with the work done for you.'], ['/letting-agents-luton/', 'Letting agents in Luton', 'All three services side by side.']])}`;
  return page({ path, title, description, body, schema: [crumbSchema(trail), serviceSchema('Guaranteed rent in Luton', description, path)] });
}

// =============================================================== TENANTS ===
function tenants() {
  const path = '/tenants/';
  const title = 'Houses & Flats to Rent in Luton | Right Homes';
  const description = 'Looking to rent in Luton? Join the Right Homes tenant register and hear about houses and flats before they are advertised. No tenant fees.';
  const trail = [['/', 'Home'], [path, 'Renting in Luton']];
  const body = `${pageHero({ trail, h1: 'Find a home to rent in Luton', lede: 'Good rentals in Luton go quickly. Join the register, tell us what you need, and we will call you when the right place comes in.', image: 'kitchen', primary: ['#enquire', 'Join the tenant register'] })}

<section class="band">
  <div class="wrap">
    <div class="section-head"><h2>How renting through us works</h2></div>
    ${steps([
      ['Join the register', 'Tell us the area, number of bedrooms, budget and when you need to move.'],
      ['We call when something fits', 'Often before the property is advertised anywhere else.'],
      ['View it with us', 'We accompany every viewing and fit round your working hours where we can.'],
      ['Referencing', 'ID and right to rent, proof of income and a previous landlord reference if you have one.'],
      ['Move in', 'Sign the tenancy, pay the deposit and first rent, collect the keys.'],
    ])}
  </div>
</section>

<section class="band band-stone">
  <div class="wrap prose-grid">
    <div class="prose">
      <h2>What it costs</h2>
      <p>Agents in England are not allowed to charge tenants for viewings, referencing or admin, and we do not. You pay:</p>
      ${ticks(['The rent', 'A refundable tenancy deposit, capped by law at five weeks’ rent where the yearly rent is under £50,000', 'A refundable holding deposit of up to one week’s rent, if you ask us to reserve a property'])}
      <p>Your tenancy deposit is protected in a government-approved scheme, and you are told which one.</p>
      <h2>Have these ready</h2>
      ${ticks(['Passport or other photo ID, and proof of your right to rent', 'Recent payslips or proof of income', 'Your current address and landlord’s details', 'A guarantor’s details, if you are likely to need one'])}
      <h2>Already renting from us?</h2>
      <p>For repairs or anything about your tenancy, call the office on <a href="${tel}">${P}</a>. If you smell gas, call the National Gas Emergency Service on 0800 111 999 first.</p>
    </div>
    <div class="arch arch-sm">${picture('living', SIDE_IMG)}</div>
  </div>
</section>

<section class="band">
  <div class="wrap faq-grid">
    <div><h2>Tenant questions</h2><a class="text-link" href="/faq/">All questions and answers</a></div>
    ${faqList(FAQ.tenants)}
  </div>
</section>

${formSection({ title: 'Join the tenant register', text: 'Tell us what you are looking for. In the last box, give us the area, bedrooms, monthly budget and when you want to move.', type: 'Looking to rent', button: 'Join the tenant register', pagePath: path, points: ['No fees to register', 'Hear about homes early', 'Accompanied viewings'] })}`;
  return page({ path, title, description, body, schema: [crumbSchema(trail)] });
}

// ================================================================= AREAS ===
function areas() {
  const path = '/areas/';
  const title = 'Areas We Cover in Luton: LU1, LU2, LU3, LU4 | Right Homes';
  const description = 'Right Homes sells and lets property across Luton: town centre, Bury Park, High Town, Stopsley, Wigmore, Limbury, Bramingham, Leagrave and more.';
  const trail = [['/', 'Home'], [path, 'Areas we cover']];
  const district = (code, names, text) => `<article class="district"><h3><span class="plaque plaque-wide" aria-hidden="true">${code}</span><span class="vh">${code}: </span>${names}</h3><p>${text}</p></article>`;
  const body = `${pageHero({ trail, h1: 'Areas we cover in Luton', lede: 'From our office on George Street we sell, let and manage homes in every Luton postcode and the surrounding parts of Bedfordshire.', image: 'postbox', primary: ['/free-valuation/', 'Book a free valuation'] })}

<section class="band">
  <div class="wrap">
    <div class="section-head"><h2>Luton by postcode</h2><p class="lede">Prices and rents change from one side of town to the other, and sometimes from one end of a road to the other.</p></div>
    <div class="districts">
      ${district('LU1', 'Town centre, Bury Park, Farley Hill, Park Town', 'The centre of town, with flats and apartments close to Luton station and the University of Bedfordshire, and rows of Victorian and Edwardian terraces running out along Dunstable Road and towards Farley Hill. Strong rental demand from commuters, students and families. Stockwood Park is on the southern edge.')}
      ${district('LU2', 'High Town, Round Green, Stopsley, Wigmore', 'North and east of the centre. High Town has terraces a short walk from the station. Round Green and Stopsley are known for 1930s semi-detached family houses, and Wigmore for more modern estates near the airport. Wardown Park and the larger houses around it are here too.')}
      ${district('LU3', 'Biscot, Limbury, Bramingham, Sundon Park', 'The north of the town. Older terraces and semis around Biscot and Limbury, post-war housing at Sundon Park, and newer family homes on the Bramingham estates near the edge of the countryside.')}
      ${district('LU4', 'Leagrave, Challney, Lewsey', 'West Luton, with its own station at Leagrave on the Thameslink line, the Luton and Dunstable Hospital, and a wide mix of terraces, semis and estate housing. Close to junction 11 of the M1 and to Dunstable.')}
    </div>
  </div>
</section>

<section class="band band-stone">
  <div class="wrap prose-grid">
    <div class="prose">
      <h2>Why people buy and rent here</h2>
      <p>Luton has three railway stations on the line into London St Pancras, the M1 at junctions 10 and 11, and an international airport on its doorstep. That brings a steady supply of buyers and tenants who work in London, at the airport, at the hospital or at the university, alongside families who have lived in the town for generations.</p>
      <p>For a seller, it means the right buyer could be local or could be moving out of London for more space. For a landlord, it means demand for everything from a studio near the station to a four-bedroom family house.</p>
      <h2>Outside Luton</h2>
      <p>We also help clients in nearby parts of Bedfordshire. If you are not sure whether we cover your address, call and ask.</p>
    </div>
    <div class="arch arch-sm">${picture('park', SIDE_IMG)}</div>
  </div>
</section>

${ctaBand({ title: 'What is your property worth on your street?', text: 'A free valuation based on what has sold and let nearby.' })}
${related([['/sell-your-home-luton/', 'Sell your home in Luton', 'How we price, market and negotiate.'], ['/letting-agents-luton/', 'Letting agents in Luton', 'Services for landlords.'], ['/tenants/', 'Find a home to rent', 'Join the tenant register.']])}`;
  return page({ path, title, description, body, schema: [crumbSchema(trail)] });
}

// ================================================================ GUIDES ===
const GUIDE = {
  path: '/guides/guaranteed-rent-vs-managed-lettings/',
  h1: 'Guaranteed rent or a managed let: which suits a Luton landlord?',
  title: 'Guaranteed Rent vs Managed Lettings in Luton',
  description: 'How guaranteed rent compares with a fully managed let for Luton landlords: income, risk, control, and the questions to ask before signing either.',
  summary: 'The trade-off between certainty and income, and the questions to ask before you sign either agreement.',
};

function guidesIndex() {
  const path = '/guides/';
  const title = 'Property Guides for Luton Landlords & Sellers | Right Homes';
  const description = 'Plain-English property guides from Right Homes, estate and letting agents in Luton. Advice for landlords, sellers and tenants.';
  const trail = [['/', 'Home'], [path, 'Guides']];
  const body = `<section class="page-hero">
  <div class="wrap">
    ${crumbs(trail)}
    <h1>Guides</h1>
    <p class="lede">Plain-English advice on selling, letting and renting in Luton, written by the people who do it every day.</p>
  </div>
</section>
<section class="band">
  <div class="wrap">
    <ul class="link-cards link-cards-lg">
      <li><a href="${GUIDE.path}"><strong>${GUIDE.h1}</strong><span>${GUIDE.summary}</span></a></li>
      <li><a href="/faq/"><strong>Questions and answers</strong><span>Short answers on costs, timescales, legal requirements and tenant fees.</span></a></li>
      <li><a href="/areas/"><strong>Luton by postcode</strong><span>What each part of town offers buyers, landlords and tenants.</span></a></li>
    </ul>
  </div>
</section>
${ctaBand({ title: 'Have a question we have not answered?', text: 'Call the office. It is quicker than searching.', primary: ['/contact/', 'Contact us'] })}`;
  return page({ path, title, description, body, schema: [crumbSchema(trail)] });
}

function guide() {
  const { path, h1, title, description } = GUIDE;
  const trail = [['/', 'Home'], ['/guides/', 'Guides'], [path, 'Guaranteed rent or a managed let']];
  const body = `<article>
<section class="page-hero">
  <div class="wrap article-head">
    ${crumbs(trail)}
    <h1>${h1}</h1>
    <p class="lede">Both take the work off your hands. The difference is who carries the risk of an empty property or an unpaid month, and what that costs you.</p>
    <p class="byline">By the Right Homes lettings team. Last reviewed <time datetime="${site.buildDate}">October 2026</time>.</p>
  </div>
</section>
<section class="band">
  <div class="wrap article-grid">
    <div class="prose">
      <h2>The short version</h2>
      <p>With a <strong>managed let</strong>, you receive the full market rent less a management fee, but only while there is a tenant in the property who is paying. With <strong>guaranteed rent</strong>, you receive a fixed sum every month for an agreed term regardless, and that sum is normally lower than the market rent.</p>
      <p>You are choosing between a higher income that can vary and a lower income that does not.</p>

      <h2>How a managed let works</h2>
      <p>The tenancy is between you and the tenant. The agent finds and references the tenant, collects the rent, arranges repairs and keeps the property compliant, and charges a percentage of the rent for doing so.</p>
      <p>You remain the landlord. You decide who moves in and whether to approve a repair, and you benefit when rents rise. You also carry the risks: if the property is empty between tenancies you receive nothing for that period, and if the tenant stops paying, the arrears are yours until they are recovered.</p>

      <h2>How guaranteed rent works</h2>
      <p>Your agreement is with the company providing the guarantee, not with the person living in the property. You are paid the agreed figure each month for the length of the term. The provider finds the occupiers, collects from them and deals with them day to day.</p>
      <p>The provider makes its money on the difference between what it pays you and what it collects, which is why the guaranteed figure is below the open-market rent. In return you have no voids, no arrears and no tenant calls.</p>

      <h2>Side by side</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th scope="col"></th><th scope="col">Managed let</th><th scope="col">Guaranteed rent</th></tr></thead>
          <tbody>
            <tr><th scope="row">Monthly income</th><td>Market rent, less a fee</td><td>Fixed figure, usually below market rent</td></tr>
            <tr><th scope="row">Empty months</th><td>You receive nothing</td><td>You are still paid</td></tr>
            <tr><th scope="row">Unpaid rent</th><td>Your loss until recovered</td><td>The provider’s problem</td></tr>
            <tr><th scope="row">Who chooses the occupier</th><td>You do</td><td>The provider does</td></tr>
            <tr><th scope="row">Your contract is with</th><td>The tenant</td><td>The provider</td></tr>
            <tr><th scope="row">Rent rises during the term</th><td>You benefit</td><td>Fixed until the term ends or is reviewed</td></tr>
            <tr><th scope="row">Your involvement</th><td>Low</td><td>Almost none</td></tr>
          </tbody>
        </table>
      </div>

      <h2>When guaranteed rent tends to suit</h2>
      <ul>
        <li>You rely on the rent to cover a mortgage and cannot absorb an empty month.</li>
        <li>You live a long way from Luton or abroad.</li>
        <li>You own several properties and value predictable income over squeezing out every pound.</li>
        <li>You have been through a difficult tenancy and do not want to repeat it.</li>
      </ul>

      <h2>When a managed let tends to suit</h2>
      <ul>
        <li>The property is in a part of Luton where it will let quickly, so the risk of a long void is small.</li>
        <li>You want a say in who lives there.</li>
        <li>You can cover the mortgage for a month or two if you had to.</li>
        <li>You want the benefit when rents go up.</li>
      </ul>

      <h2>Six questions to ask before signing a guaranteed rent agreement</h2>
      <ol>
        <li><strong>Who exactly is my contract with, and for how long?</strong> A guarantee is only as good as the company behind it.</li>
        <li><strong>Who will live in the property?</strong> Ask how occupiers are chosen and whether the property will be let to a single household or shared.</li>
        <li><strong>Who pays for repairs?</strong> Agreements differ on what the provider covers and what comes back to you.</li>
        <li><strong>What condition will it be returned in?</strong> Look for a clear commitment, with an inventory at the start.</li>
        <li><strong>How can it be ended early?</strong> Check the notice either side has to give.</li>
        <li><strong>Do my lender and insurer allow it?</strong> Many buy-to-let mortgages and landlord insurance policies have conditions about this kind of arrangement. Get consent before you sign.</li>
      </ol>

      <h2>Which costs more?</h2>
      <p>On paper, guaranteed rent usually does: the gap between the guaranteed figure and the market rent is normally wider than a management fee. In practice it depends on how the tenancy goes. One empty month costs a twelfth of a year’s rent, and a period of arrears can cost far more.</p>
      <p>The sensible way to decide is to get both figures for your actual property and compare them against how much risk you are comfortable carrying.</p>

      <h2>Get both figures for your property</h2>
      <p>We offer both services, so we have no reason to push you towards one. Ask for a rental appraisal and we will give you the market rent, our management fee and a guaranteed rent figure, so you can compare them properly.</p>
      <p><a class="btn btn-brand" href="/letting-agents-luton/#enquire">Request a rental appraisal</a></p>
      <p class="small-print">This guide is general information, not legal or financial advice. Rules for landlords change, so check the current position for your property before acting.</p>
    </div>
    <aside class="aside-card aside-sticky">
      <h2>Talk it through</h2>
      <p>Ten minutes on the phone will usually tell you which option fits.</p>
      <a class="btn btn-brand btn-block" href="${tel}">${icon.phone}${P}</a>
      <a class="text-link" href="/guaranteed-rent-luton/">Guaranteed rent in Luton</a>
      <a class="text-link" href="/property-management-luton/">Property management in Luton</a>
    </aside>
  </div>
</section>
</article>`;
  const article = {
    '@type': 'Article',
    headline: h1,
    description,
    datePublished: site.buildDate,
    dateModified: site.buildDate,
    inLanguage: 'en-GB',
    mainEntityOfPage: abs(path),
    image: abs('/assets/og.png'),
    author: { '@id': abs('/#agent') },
    publisher: { '@id': abs('/#agent') },
  };
  return page({ path, title: `${title} | Right Homes`, description, body, schema: [crumbSchema(trail), article], ogType: 'article' });
}

// =================================================================== FAQ ===
function faq() {
  const path = '/faq/';
  const title = 'Selling, Letting & Renting in Luton: FAQs | Right Homes';
  const description = 'Answers for Luton sellers, landlords and tenants: valuation costs, how long a sale takes, landlord legal requirements, guaranteed rent and tenant fees.';
  const trail = [['/', 'Home'], [path, 'Questions and answers']];
  const body = `<section class="page-hero">
  <div class="wrap">
    ${crumbs(trail)}
    <h1>Questions and answers</h1>
    <p class="lede">The things sellers, landlords and tenants ask us most. If yours is not here, call <a href="${tel}">${P}</a>.</p>
  </div>
</section>
<section class="band">
  <div class="wrap faq-page">
    <h2 id="selling">Selling</h2>
    ${faqList(FAQ.sellers)}
    <h2 id="landlords">Landlords</h2>
    ${faqList(FAQ.landlords)}
    <h2 id="tenants">Tenants</h2>
    ${faqList(FAQ.tenants)}
  </div>
</section>
${ctaBand({ title: 'Still have a question?', text: 'Ask the office directly.', primary: ['/contact/', 'Contact us'] })}`;
  return page({ path, title, description, body, schema: [crumbSchema(trail), faqSchema(ALL_FAQS)] });
}

// =============================================================== CONTACT ===
function contact() {
  const path = '/contact/';
  const title = 'Contact Right Homes | Estate Agents, George Street, Luton';
  const description = `Call Right Homes on ${P} or ${site.mobileDisplay}, or visit ${addressLine}. Estate and letting agents for sales, lettings and property management in Luton.`;
  const trail = [['/', 'Home'], [path, 'Contact']];
  const body = `<section class="page-hero">
  <div class="wrap form-grid">
    <div>
      ${crumbs(trail)}
      <h1>Contact Right Homes</h1>
      <p class="lede">The quickest way to reach us is by phone. If you would rather we called you, leave your number.</p>
      ${contactPanel()}
    </div>
    ${enquiryForm({ heading: 'Request a call back', button: 'Request a call back', page: path })}
  </div>
</section>
<section class="band band-stone">
  <div class="wrap">
    <h2>Finding the office</h2>
    <p class="lede">We are at ${esc(addressLine)}, in the town centre and a few minutes’ walk from Luton railway station and The Mall. <a href="${esc(site.address.mapsUrl)}" rel="noopener">Open in Google Maps</a>.</p>
    <ul class="link-cards">
      <li><a href="/free-valuation/"><strong>Selling?</strong><span>Book a free valuation.</span></a></li>
      <li><a href="/letting-agents-luton/"><strong>Landlord?</strong><span>Get a free rental appraisal.</span></a></li>
      <li><a href="/tenants/"><strong>Looking to rent?</strong><span>Join the tenant register.</span></a></li>
    </ul>
  </div>
</section>`;
  return page({ path, title, description, body, schema: [crumbSchema(trail), { '@type': 'ContactPage', url: abs(path), name: title }] });
}

// =============================================================== PRIVACY ===
function privacy() {
  const path = '/privacy/';
  const title = 'Privacy Notice | Right Homes';
  const description = 'How Right Homes uses the personal information you send through this website.';
  const trail = [['/', 'Home'], [path, 'Privacy']];
  const body = `<section class="page-hero">
  <div class="wrap article-head">
    ${crumbs(trail)}
    <h1>Privacy notice</h1>
    <p class="lede">What we collect through this website, why, and what you can ask us to do with it.</p>
  </div>
</section>
<section class="band">
  <div class="wrap">
    <div class="prose">
      <h2>Who we are</h2>
      <p>${esc(site.legalName)}, ${esc(addressLine)}. We are the data controller for information sent through this website. To ask about your data, call <a href="${tel}">${P}</a>${site.email ? ` or email <a href="mailto:${esc(site.email)}">${esc(site.email)}</a>` : ''}, or write to us at the address above.</p>
      <h2>What we collect</h2>
      <p>When you send an enquiry form we receive what you type into it: your name, phone number, and, if you provide them, your email address, a property address and your message. We also record which page the form was sent from.</p>
      <p>This website does not use advertising or analytics cookies and does not track you across other sites.</p>
      <h2>Why we use it</h2>
      <p>To reply to your enquiry and, if you ask us to, to arrange a valuation, register you as a landlord or tenant, or provide our services. Our lawful basis is our legitimate interest in responding to people who contact us, and taking steps at your request before entering into a contract.</p>
      <p>We do not sell your information or pass it to anyone for their marketing.</p>
      <h2>Who processes it for us</h2>
      <p>The website and its enquiry forms are hosted by Netlify, Inc., which stores form submissions on our behalf and may process them in the United States under appropriate safeguards.</p>
      <h2>How long we keep it</h2>
      <p>We keep enquiries only for as long as we need to deal with them. If you become a client, we keep records for as long as the law and our professional obligations require.</p>
      <h2>Your rights</h2>
      <p>You can ask us for a copy of the information we hold about you, ask us to correct or delete it, or object to how we use it. If you are unhappy with how we have handled your information you can complain to the Information Commissioner’s Office at <a href="https://ico.org.uk/make-a-complaint/" rel="noopener">ico.org.uk</a>.</p>
      <p class="small-print">Last updated <time datetime="${site.buildDate}">October 2026</time>.</p>
    </div>
  </div>
</section>`;
  return page({ path, title, description, body, schema: [crumbSchema(trail)] });
}

// ================================================================== FEES ===
function fees() {
  const c = site.compliance;
  const path = '/fees/';
  const title = 'Fees & Client Protection | Right Homes';
  const description = 'Right Homes landlord and tenant fees, redress scheme membership and client money protection.';
  const trail = [['/', 'Home'], [path, 'Fees and client protection']];
  const table = (rows) => `<div class="table-wrap"><table><tbody>${rows.map(([a, b]) => `<tr><th scope="row">${esc(a)}</th><td>${esc(b)}</td></tr>`).join('')}</tbody></table></div>`;
  const body = `<section class="page-hero"><div class="wrap article-head">${crumbs(trail)}<h1>Fees and client protection</h1><p class="lede">What we charge, and the schemes that protect you.</p></div></section>
<section class="band"><div class="wrap"><div class="prose">
<h2>Redress scheme</h2><p>${esc(site.legalName)} is a member of ${esc(c.redress)}${c.redressNumber ? `, membership number ${esc(c.redressNumber)}` : ''}.</p>
<h2>Client money protection</h2><p>${esc(c.cmp)}${c.cmpNumber ? `, membership number ${esc(c.cmpNumber)}` : ''}.</p>
<h2>Landlord fees</h2>${table(c.landlordFees)}
<h2>Tenant fees</h2>${table(c.tenantFees)}
</div></div></section>`;
  return page({ path, title, description, body, schema: [crumbSchema(trail)] });
}

// ======================================================= THANKS AND 404 ===
function thanks() {
  const path = '/thank-you/';
  const body = `<section class="page-hero page-hero-tall">
  <div class="wrap article-head">
    <h1>Thank you. We have your enquiry.</h1>
    <p class="lede">Someone from the office will call you back. If it is urgent, ring us on <a href="${tel}">${P}</a>.</p>
    <div class="btn-row"><a class="btn btn-brand" href="/">Back to the homepage</a><a class="btn btn-outline" href="/guides/">Read our guides</a></div>
  </div>
</section>`;
  return page({ path, title: 'Enquiry received | Right Homes', description: 'Thank you for contacting Right Homes.', body, noindex: true });
}

function notFound() {
  const body = `<section class="page-hero page-hero-tall">
  <div class="wrap article-head">
    <h1>That page has moved or does not exist</h1>
    <p class="lede">Try one of these, or call us on <a href="${tel}">${P}</a>.</p>
    <ul class="link-cards">
      <li><a href="/free-valuation/"><strong>Free valuation</strong><span>For sellers and landlords.</span></a></li>
      <li><a href="/letting-agents-luton/"><strong>Landlords</strong><span>Lettings, management and guaranteed rent.</span></a></li>
      <li><a href="/tenants/"><strong>Tenants</strong><span>Join the register.</span></a></li>
    </ul>
  </div>
</section>`;
  return page({ path: '/404.html', title: 'Page not found | Right Homes', description: 'Page not found.', body, noindex: true });
}

// ---------------------------------------------------------------------------
export function buildPages() {
  const out = [
    ['/', home(), { priority: '1.0' }],
    ['/sell-your-home-luton/', sell(), { priority: '0.9' }],
    ['/free-valuation/', valuation(), { priority: '0.9' }],
    ['/letting-agents-luton/', lettings(), { priority: '0.9' }],
    ['/property-management-luton/', management(), { priority: '0.8' }],
    ['/guaranteed-rent-luton/', guaranteed(), { priority: '0.8' }],
    ['/tenants/', tenants(), { priority: '0.8' }],
    ['/areas/', areas(), { priority: '0.7' }],
    ['/guides/', guidesIndex(), { priority: '0.6' }],
    [GUIDE.path, guide(), { priority: '0.7' }],
    ['/faq/', faq(), { priority: '0.6' }],
    ['/contact/', contact(), { priority: '0.7' }],
    ['/privacy/', privacy(), { priority: '0.2' }],
    ['/thank-you/', thanks(), { sitemap: false }],
    ['/404.html', notFound(), { sitemap: false }],
  ];
  if (hasFees) out.push(['/fees/', fees(), { priority: '0.4' }]);
  return out;
}
