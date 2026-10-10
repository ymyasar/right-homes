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

// Photographs. The files are in photos-src/ under these names; see tools/photos.py.
// They are computer-generated illustrations, not real properties, and the
// footer of every page says they are illustrative.
export const images = {
  hero:     { alt: 'Red-brick detached house with a navy front door, lawn and block-paved path under a blue sky' },
  semi:     { alt: 'Cream rendered detached house at dusk with its windows lit' },
  terrace:  { alt: 'Row of modern red-brick terraced houses with small front gardens' },
  keys:     { alt: 'Hand holding out house keys on a blue house keyring in front of a red-brick home' },
  living:   { alt: 'Bright living room with a grey corner sofa, navy cushions and a large window' },
  park:     { alt: 'Tree-lined street of brick semi-detached houses behind trimmed hedges' },
  postbox:  { alt: 'View across streets of red-brick houses, gardens and a park, with hills beyond' },
  wisteria: { alt: 'Red-brick semi-detached house with bay windows, a navy front door and a hedged front garden' },
  kitchen:  { alt: 'White kitchen with a wooden worktop and a round dining table by the window' },
  bay:      { alt: 'Three-storey red-brick apartment building with balconies and a landscaped garden' },
  model:    { alt: 'Open hand holding a small blue model house' },
};
