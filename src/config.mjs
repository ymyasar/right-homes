// ---------------------------------------------------------------------------
// Every business fact on the site comes from this file.
// Change it here, run `node build.mjs`, commit, push. Nothing else to edit.
// Leave a value as '' (or []) and the site simply leaves that detail out.
// ---------------------------------------------------------------------------

export const site = {
  name: 'Right Homes',
  legalName: 'Right Homes Sales & Lettings',
  url: 'https://righthomesestates.com',
  buildDate: '2026-10-10',

  // Office landline: the main number shown everywhere.
  phoneDisplay: '01582 349155',
  phoneE164: '+441582349155',
  // Mobile: shown alongside the office number, and used for WhatsApp.
  mobileDisplay: '07902 859191',
  mobileE164: '+447902859191',

  address: {
    street: 'Suite 5, 74 George Street',
    town: 'Luton',
    county: 'Bedfordshire',
    postcode: 'LU1 2BD',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=74+George+Street+Luton+LU1+2BD',
  },

  // ADD when known. Each of these appears on the site as soon as it is filled.
  email: '',              // e.g. 'hello@righthomesestates.com'
  hours: [],              // e.g. [['Monday to Saturday', '10am to 4pm'], ['Sunday', 'Closed']]
  companyNumber: '',      // Companies House number
  googleReviewsUrl: '',   // link to the Google Business Profile reviews
  whatsapp: false,        // true adds a WhatsApp button using the mobile number above

  // Claims carried over from the previous site.
  yearsEstablished: '15+',
  propertiesManaged: '500+',

  // No public rating is shown. The GetAgent rating used before belonged to the
  // Cheapside branch, not this office. Fill these in only with this office's own.
  rating: { value: '', count: 0, source: '', url: '', checked: '' },

  // Paste real client reviews here and a reviews section appears on the homepage.
  // { quote: '...', name: 'First name + initial', role: 'Landlord, LU2' }
  reviews: [],

  // Legally required disclosures for a letting agent in England. When ALL of
  // redress, cmp and the two fee lists are filled in, the /fees/ page is
  // built and linked from the footer of every page.
  compliance: {
    redress: '',          // 'The Property Ombudsman' or 'Property Redress'
    redressNumber: '',
    cmp: '',              // client money protection scheme name, or 'We do not hold client money'
    cmpNumber: '',
    landlordFees: [],     // [['Full management', '10% of rent + VAT (12% inc. VAT)'], ...]
    tenantFees: [],       // [['Holding deposit', 'One week’s rent'], ...]
  },
};

// Free-to-use photographs from Unsplash, served from Unsplash's image CDN.
// They are illustrative only and are labelled as such in the footer.
export const images = {
  hero:     { id: '1604775567578-712a3acce497', alt: 'Terraced houses stepping down a hillside street in early evening light', by: 'Super Straho' },
  semi:     { id: '1666560900588-324c2b398117', alt: 'Tree-lined residential street with semi-detached houses in autumn', by: 'Ben Elliott' },
  terrace:  { id: '1773665230660-161c58f76c5f', alt: 'Row of gabled red-brick terraced houses with cars parked outside', by: 'Andri Aeschlimann' },
  keys:     { id: '1741156386380-0236c72eb6f9', alt: 'Hand holding a set of house keys in a bright hallway', by: 'Jakub Żerdzicki' },
  living:   { id: '1656122381069-9ec666d95cf1', alt: 'Bright living room with tall shuttered windows and pale sofas', by: 'Jake Goossen' },
  park:     { id: '1692812957559-841d4d921698', alt: 'Low morning sun through mature trees in a park', by: 'Gordie Jackson' },
  postbox:  { id: '1759403478100-92a1acc2d07e', alt: 'Red pillar box on a street of brick terraced houses', by: 'William V' },
  wisteria: { id: '1623241187960-4a57f68560ea', alt: 'Red-brick corner house with a turret and wisteria in flower', by: 'Dan Loftus' },
  kitchen:  { id: '1583845112239-97ef1341b271', alt: 'Kitchen with a round dining table, wooden chairs and open shelving', by: 'shche_ team' },
  bay:      { id: '1676802584541-dc901dcaa815', alt: 'Bay-fronted Victorian terraced houses on a residential street', by: 'Alex' },
};
