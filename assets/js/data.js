/* ==========================================================================
   PosterWala — catalogue + commercial data (single source of truth)
   Prices are in PKR (Rs). Every page reads from this file; nothing is
   hard-coded elsewhere so the shop grid, PDP, studio and basket always agree.
   ========================================================================== */
window.PW = window.PW || {};

PW.data = {
  brand: {
    name: 'PosterWala',
    domain: 'posterwala.pk',
    tagline: 'Design it. Print it. Stick it up.',
    urdu: 'آپ کا اپنا پوسٹر — پورے پاکستان میں ڈیلیوری',
    phone: '+92 300 842 7755',
    whatsapp: '923008427755',
    email: 'hello@posterwala.pk',
    studios: [
      { city: 'Lahore', addr: 'Unit 4, Emporium Arcade, Block 5, Gulberg III', hours: 'Mon–Sat, 10am–8pm' },
      { city: 'Karachi', addr: 'Shop 12, Empress Market Lane, Saddar', hours: 'Mon–Sat, 10am–9pm' }
    ],
    rating: 4.9,
    reviews: 12438,
    freeDeliveryOver: 5000,
    deliveryFlat: 250,
    gstRate: 0.17,
    promo: { code: 'POSTER10', off: 0.10, label: '10% off your first order' }
  },

  /* ---- Substrate + size pricing model ---------------------------------- */
  pricing: {
    roundTo: 10,
    // Rs per square metre of printed material, before size minimums
    rates: {
      'silk170': 2600,
      'silk250': 3770,
      'pvc220': 4680,
      'pvc400': 6240,
      'rag310': 7900
    },
    finishes: {
      'none': { rate: 0 },
      'matt': { rate: 240 },
      'gloss': { rate: 240 },
      'soft': { rate: 520 }
    },
    mounts: {
      'none': { rate: 0, min: 0 },
      'foam': { rate: 2400, min: 450 },
      'snap': { rate: 3200, min: 900 },
      'canvas': { rate: 5600, min: 1700 }
    },
    rush: {
      'std': 0,
      'exp': 0.15,
      'same': 0.35
    }
  },

  sizes: [
    { id: 'a4', label: 'A4', short: 'A4', w: 210, h: 297, min: 190, note: 'Notice-board size', blurb: 'Shop offers, menus, classroom and office notices.', tag: 'Cheapest', orientation: 'portrait' },
    { id: 'a3', label: 'A3', short: 'A3', w: 297, h: 420, min: 350, note: 'Window size', blurb: 'The workhorse — readable from 3 metres in a shop window.', tag: 'Most ordered', orientation: 'portrait' },
    { id: 'a2', label: 'A2', short: 'A2', w: 420, h: 594, min: 650, note: 'Statement size', blurb: 'Big enough for a corridor, a stand or a café wall.', tag: '', orientation: 'portrait' },
    { id: 'a1', label: 'A1', short: 'A1', w: 594, h: 841, min: 1300, note: 'Event size', blurb: 'Gigs, exhibitions and launch parties. Stops people walking past.', tag: 'Best seller', orientation: 'portrait' },
    { id: 'a0', label: 'A0', short: 'A0', w: 841, h: 1189, min: 2600, note: 'Wall size', blurb: 'Nearly a metre wide — exhibition back walls and building hoardings.', tag: '', orientation: 'portrait' },
    { id: 'i2030', label: '20" × 30"', short: '20×30', w: 508, h: 762, min: 1400, note: 'Frame-ready', blurb: 'Standard poster-frame size, sold in bulk to cafés and galleries.', tag: '', orientation: 'portrait' },
    { id: 'i4030', label: '40" × 30"', short: '40×30', w: 762, h: 1016, min: 2400, note: 'Cinema size', blurb: 'Classic movie-poster proportions for lobbies and stairwells.', tag: 'Cinema', orientation: 'landscape' },
    { id: 'i6040', label: '60" × 40"', short: '60×40', w: 1524, h: 1016, min: 3900, note: 'Bus-stop size', blurb: 'Fits a standard outdoor display case. Weatherproof stock advised.', tag: '', orientation: 'landscape' },
    {
        id: 'custom', label: 'Custom size', short: 'Custom', w: 0, h: 0, min: 190,
        note: 'Cut to your mm', blurb: 'Send your own width and height — we cut on the Kongsberg table.',
        tag: '', orientation: 'portrait', custom: true, rateBoost: 1.15,
        defW: 420, defH: 594,          // what the configurator starts on (an A2-ish sheet)
        minCut: { w: 150, h: 200 }     // smallest legal cut, which is where "from Rs" comes from
      }
  ],

  stocks: [
    {
      id: 'silk170', label: '170gsm Value Silk', from: 0, badge: '',
      blurb: 'Thin, affordable poster paper. Perfect for temporary promos and indoor notices with a short life.',
      best: 'Indoor · short campaigns', life: '4–8 weeks indoors', outdoor: false
    },
    {
      id: 'silk250', label: '250gsm Classic Silk', from: 0, badge: 'Recommended',
      blurb: 'Sturdier sheet with a proper premium hand-feel. The stock we print on when a brand cares about the detail.',
      best: 'Indoor · retail, events, framed', life: '6–12 months indoors', outdoor: false, laminate: true
    },
    {
      id: 'rag310', label: '310gsm Fine-Art Rag', from: 0, badge: 'Premium',
      blurb: 'Textured museum paper for art prints, wedding signage and gallery editions. Colour-critical and beautiful.',
      best: 'Framed art · limited editions', life: '10+ years, indoors', outdoor: false
    },
    {
      id: 'pvc220', label: '220mic Waterproof PVC', from: 0, badge: 'Outdoor',
      blurb: 'Tear-resistant, wipe-clean synthetic. The right choice for A-frames and shop-front windows.',
      best: 'Outdoor · A-frames', life: '6–12 months outside', outdoor: true
    },
    {
      id: 'pvc400', label: '400mic Heavy PVC', from: 0, badge: 'Long life',
      blurb: 'Thick blockout PVC for hoardings, construction fencing and anything that has to survive a monsoon.',
      best: 'Outdoor · long run', life: '2–3 years outside', outdoor: true
    }
  ],

  finishes: [
    { id: 'none', label: 'No laminate', note: 'As-pressed surface', from: 0 },
    { id: 'matt', label: 'Matt lam', note: 'Smooth, no glare, softens colours', from: 0 },
    { id: 'gloss', label: 'Gloss lam', note: 'High shine, punchier colours', from: 0 },
    { id: 'soft', label: 'Soft-touch lam', note: 'Velvet hand-feel, premium retail look', from: 0 }
  ],

  mounts: [
    { id: 'none', label: 'Poster only', note: 'Rolled in a tube, or flat-packed', from: 0 },
    { id: 'foam', label: '5mm foamboard mount', note: 'Rigid, ready to hang with tape or pins', from: 0 },
    { id: 'snap', label: 'Snap frame (black or silver)', note: 'Aluminium open-ease frame, poster swaps in seconds', from: 0 },
    { id: 'canvas', label: 'Stretched canvas', note: 'Hand-stretched on 38mm kiln-dried pine', from: 0 }
  ],

  rush: [
    { id: 'std', label: 'Standard', days: 3, note: 'Dispatch in 3 working days', add: 0 },
    { id: 'exp', label: 'Express 48h', days: 2, note: 'On the press within 2 working days', add: 0.15 },
    { id: 'same', label: 'Same day (Lahore)', days: 0, note: 'Order before 11am, collect by 8pm', add: 0.35, lahoreOnly: true }
  ],

  qtyBreaks: [
    { min: 1, off: 0, label: '1–4' },
    { min: 5, off: 0.08, label: '5–9' },
    { min: 10, off: 0.15, label: '10–24' },
    { min: 25, off: 0.22, label: '25–49' },
    { min: 50, off: 0.30, label: '50+' }
  ],

  /* ---- Presses (instantprint-style "what machine prints it" section) ---- */
  presses: [
    {
      range: 'A2 and below',
      machine: 'HP Indigo 12000',
      copy: 'ElectroInk litho-digital hybrid. 2,400 sheets an hour, G7-calibrated, and colour that matches across a re-order six months later — which is the whole point for a brand with 40 outlets.'
    },
    {
      range: 'A1 and larger',
      machine: 'EFI VUTEk h5',
      copy: 'Hybrid sheet-fed large format at up to 1200 DPI with 6-colour ink plus white. Vinyl, PVC, banner and rigid board all run on the same table without a media changeover.'
    },
    {
      range: 'Finishing',
      machine: 'Kongsberg C24 + Polar 95i',
      copy: 'Digital-cut contour shapes, kiss-cut stickers and square-cut posters all come off the same bed, then a guillotine trim to your exact millimetre before packing.'
    }
  ],

  /* ---- Shop-by-size grid copy ------------------------------------------- */
  accessories: [
    {
      slug: 'a-frames', name: 'A-Frames', sub: 'Includes 2 waterproof posters', from: 12500, img: 'assets/img/aframe.jpg',
      note: 'Galvanised or aluminium, sand- or water-fillable', badge: 'Winter deal'
    },
    {
      slug: 'snap-frames', name: 'Snap Frames', sub: 'Black, silver or waterproof', from: 1650, img: '',
      note: 'Open-ease aluminium, wall or ceiling hooks', badge: ''
    },
    {
      slug: 'flex-banner', name: 'Flex Banners', sub: '510gsm, eyelets every 50cm', from: 185, img: '',
      note: 'Priced per square foot — scaffolding, hoardings, openings', badge: 'Per sq ft'
    },
    {
      slug: 'vinyl-stickers', name: 'Vinyl Stickers', sub: 'Die-cut, kiss-cut or sheets', from: 450, img: '',
      note: 'Laminated floor-safe option for retail entrances', badge: ''
    },
    {
      slug: 'roll-up-standee', name: 'Roll-Up Standees', sub: '850 × 2000mm with case', from: 8900, img: '',
      note: 'Aluminium cassette, 3-year mechanism warranty', badge: 'Exhibitions'
    },
    {
      slug: 'canvas-prints', name: 'Canvas Prints', sub: '38mm pine frame, hand-stretched', from: 3200, img: '',
      note: 'Gallery-wrapped, ready to hang, museum coating', badge: ''
    }
  ],

  /* ---- Product catalogue (rendered as cards, filterable) --------------- */
  products: [
    { slug: 'a4-poster', name: 'A4 Poster Print', sizeId: 'a4', stockId: 'silk170', art: 'sale', rating: 4.8, count: 2142, badge: 'Lowest price', turnaround: '3 days', tags: ['value', 'indoor', 'event'] },
    { slug: 'a3-poster', name: 'A3 Poster Print', sizeId: 'a3', stockId: 'silk170', art: 'gig', rating: 4.9, count: 5310, badge: 'Most ordered', turnaround: '3 days', tags: ['value', 'indoor', 'menu'] },
    { slug: 'a2-poster', name: 'A2 Poster Print', sizeId: 'a2', stockId: 'silk250', art: 'eid', rating: 4.9, count: 3188, badge: '', turnaround: '3 days', tags: ['classic', 'indoor', 'event'] },
    { slug: 'a1-event-poster', name: 'A1 Event Poster', sizeId: 'a1', stockId: 'silk250', art: 'open', rating: 5.0, count: 4701, badge: 'Best seller', turnaround: '48 hours', tags: ['classic', 'indoor', 'event', 'laminate'] },
    { slug: 'a0-wall-poster', name: 'A0 Wall Poster', sizeId: 'a0', stockId: 'pvc400', art: 'cricket', rating: 4.8, count: 1204, badge: '', turnaround: '3 days', tags: ['outdoor', 'event', 'pvc'] },
    { slug: 'movie-20x30', name: '20×30 Cinema Poster', sizeId: 'i2030', stockId: 'silk250', art: 'cinema', rating: 4.9, count: 878, badge: 'Frame ready', turnaround: '3 days', tags: ['classic', 'indoor', 'laminate', 'art'] },
    { slug: 'movie-40x30', name: '40×30 Movie Poster', sizeId: 'i4030', stockId: 'silk250', art: 'cinema-dark', rating: 4.7, count: 612, badge: '', turnaround: '3 days', tags: ['classic', 'indoor', 'event', 'art'] },
    { slug: 'busstop-60x40', name: '60×40 Bus-Stop Poster', sizeId: 'i6040', stockId: 'pvc220', art: 'realty', rating: 4.8, count: 331, badge: 'Outdoor', turnaround: '48 hours', tags: ['outdoor', 'pvc', 'event'] },
    { slug: 'waterproof-pvc-poster', name: 'Waterproof PVC Poster', sizeId: 'a2', stockId: 'pvc220', art: 'menu', rating: 4.9, count: 1975, badge: 'Rainproof', turnaround: '2 days', tags: ['outdoor', 'pvc', 'menu'] },
    { slug: 'gloss-lam-a1', name: 'Gloss Laminated A1 Poster', sizeId: 'a1', stockId: 'silk250', finishId: 'gloss', art: 'festival', rating: 4.9, count: 1440, badge: '', turnaround: '48 hours', tags: ['classic', 'indoor', 'laminate', 'event'] },
    { slug: 'fine-art-310', name: 'Fine-Art Rag Print 310gsm', sizeId: 'i2030', stockId: 'rag310', art: 'abstract', rating: 5.0, count: 297, badge: 'Museum grade', turnaround: '4 days', tags: ['art', 'indoor', 'premium'] },
    { slug: 'custom-size-poster', name: 'Custom Size Poster', sizeId: 'custom', stockId: 'silk250', art: 'grid', rating: 4.8, count: 1108, badge: 'Any millimetre', turnaround: '3 days', tags: ['classic', 'indoor', 'custom'] }
  ],

  /* ---- Wall of work / gallery ------------------------------------------ */
  gallery: [
    { img: 'assets/img/hero-wall.jpg', cap: 'A1 · 250gsm Classic Silk · matt lam', city: 'Gulberg III, Lahore' },
    { img: 'assets/img/gallery-wall.jpg', cap: 'Nine framed 20×30 prints, one wall', city: 'Frere Gallery, Karachi' },
    { img: 'assets/img/shop-window.jpg', cap: 'A1 snap frame, window-facing', city: 'Burns Road, Karachi' },
    { img: 'assets/img/aframe.jpg', cap: 'A-frame + 2 × 220mic PVC', city: 'DHA Phase 6, Lahore' },
    { img: 'assets/img/paper-stack.jpg', cap: '310gsm rag sheets, trimmed and sleeved', city: 'Our press room' },
    { img: 'assets/img/large-format-press.jpg', cap: '60×40 on the VUTEk h5', city: 'Sunrise Park, Lahore' },
    { img: 'assets/img/rolled-posters.jpg', cap: 'Tube-packed, courier-ready', city: 'Every order we ship' }
  ],

  /* ---- Steps / how it works -------------------------------------------- */
  steps: [
    { n: 1, t: 'Pick your size and stock', c: 'A4 to 60×40, or send your own millimetres. Paper for indoors, PVC for the monsoon, fine-art rag when it has to be beautiful.' },
    { n: 2, t: 'Upload artwork or design online', c: 'Drag in a PDF, PNG or JPG — or open the Design Studio and build it from a template in about four minutes.' },
    { n: 3, t: 'We check your file, free', c: 'A human looks at bleed, resolution and colour, then WhatsApps you a proof. We will not print a mistake we could have caught.' },
    { n: 4, t: 'Press, cut, dispatch', c: 'Into the Indigo or the VUTEk, cut on the Kongsberg, tube-packed and off to TCS the same evening. Pay on delivery if you like.' }
  ],

  /* ---- Reviews --------------------------------------------------------- */
  testimonials: [
    { name: 'Hina Rafique', role: 'Owner, Chaiyaan Coffee', city: 'Lahore', stars: 5, product: 'A3 menu posters × 40', copy: 'We re-order the same menu poster every quarter and the red has not shifted once in two years. That never happened with my old printer on Hall Road.' },
    { name: 'Bilal Anwar', role: 'Brand lead, Bolt Gym', city: 'Karachi', stars: 5, product: 'A0 PVC for 9 clubs', copy: 'Nine clubs, 36 outdoor posters, delivered to each site before a Monday launch. The proof-on-WhatsApp step meant nothing went wrong.' },
    { name: 'Sana Iqbal', role: 'Events, LUMS Arts Society', city: 'Lahore', stars: 5, product: 'A1 event posters × 120', copy: 'Ordered Friday night for a Wednesday show, express 48h. They called when the courier stalled and upgraded us to a same-day van. 120 posters, zero creases.' },
    { name: 'Usman Tariq', role: 'Director, Graphene Studio', city: 'Islamabad', stars: 4, product: 'Fine-art rag editions', copy: 'Beautiful paper and honest colour. Knocking one star off only because I wanted a deckle edge option — please add one.' },
    { name: 'Areeba Khan', role: 'Founder, Zevaa Apparel', city: 'Faisalabad', stars: 5, product: 'A-frames + window posters', copy: 'I designed the sale poster in your studio app on a taxi ride, uploaded it, and it was in my shop window the next afternoon.' },
    { name: 'Zeeshan Haider', role: 'Manager, Saffron Cycles', city: 'Multan', stars: 5, product: 'Custom 70×100cm posters', copy: 'Nobody else would print a non-standard size without a 500-unit minimum. These people cut 12 at exactly 70×100 and charged me per square foot.' }
  ],

  brands: ['Chaiyaan Coffee', 'Zevaa Apparel', 'Bolt Gym', 'Graphene Studio', 'Alif Realty', 'Saffron Cycles', 'Ravi Social', 'Bunneer Studio'],

  stats: [
    { v: 2400000, suffix: '+', label: 'posters printed', note: 'Since 2016, across 74 cities' },
    { v: 1200, suffix: ' DPI', label: 'large-format max', note: 'EFI VUTEk h5, 6-colour + white' },
    { v: 45, prefix: '< ', suffix: ' min', label: 'proof turnaround', note: 'Human artwork check, every order' },
    { v: 74, suffix: '', label: 'cities delivered', note: 'TCS, Leopards and our own Lahore vans' }
  ],

  /* ---- Guarantees ------------------------------------------------------ */
  promises: [
    { t: 'Free artwork check', c: 'Every file is looked at by a press operator before it prints. Bleed, DPI, fonts, colour.' },
    { t: 'Reprint, on us', c: 'If it left our building wrong, we reprint and re-courier it free. No forms, no argument.' },
    { t: 'Colour you can trust', c: 'G7-calibrated presses, profiling every morning. Your red in Lahore is your red in Multan.' },
    { t: 'Cash on delivery', c: 'Pay the rider, or JazzCash, Easypaisa, bank transfer, card — all fine, no extra charge.' }
  ],

  /* ---- FAQ (long-tail SEO copy, instantprint-style) ------------------- */
  faqs: [
    {
      q: 'What file should I send, and how do I make it print-ready?',
      a: 'PDF is best — export as PDF/X-1a with fonts embedded and images at 300 DPI at final size. A high-resolution JPG or PNG works too (Flattened, no transparency). Add 3mm of bleed on every side and keep anything important 5mm inside the trim line. Print in CMYK, not RGB: your screen red is brighter than an ink red, so we convert and send you a proof before pressing. If your file is short on resolution or missing bleed, we will tell you before you pay, not after.'
    },
    {
      q: 'How long does printing and delivery take anywhere in Pakistan?',
      a: 'Standard is three working days from proof approval. Express 48 hours costs 15% more and gets you on the press within two working days. Lahore customers can add same-day (order before 11am, collect from Gulberg by 8pm) for 35% more. Karachi is usually next-day by our own van, and everywhere else travels by TCS or Leopards at two to three days. Delivery is a flat Rs 250 and free above Rs 5,000.'
    },
    {
      q: 'Which poster stock should I choose for outdoors?',
      a: 'Never paper. Use 220mic waterproof PVC for windows, A-frames and anything covered, or 400mic heavy PVC for hoardings, fencing and open exposure — that is the one that survives a monsoon and a dust storm. Both are wipe-clean and will not curl at the corners in humidity. Laminating a PVC poster adds another two or three seasons of life against UV.'
    },
    {
      q: 'Can you print a size that is not on your list?',
      a: 'Yes. Choose Custom Size, type your width and height in millimetres and we cut it on the Kongsberg table. Custom sizes are priced per square metre with a 15% set-up uplift and a Rs 190 minimum, so a 70×100cm poster costs less than most people expect. Odd shapes and contour cuts are also possible — ask for a quote for die-cut work.'
    },
    {
      q: 'Do you offer design help if I have nothing ready?',
      a: 'Two options, both free. The Design Studio lets you build a poster in the browser from ten templates and download it instantly. Or send us a rough sketch and a brand colour and our in-house team will set it up for you — usually returned within a few hours with one round of changes included.'
    },
    {
      q: 'How does pricing work for bulk and repeat orders?',
      a: 'The price break is automatic on the product page: five or more is 8% off, ten or more 15%, twenty-five 22% and fifty-plus 30%. Agencies and chains can open a trade account for net-30 terms, stored artwork and a named account manager who handles re-orders over WhatsApp.'
    },
    {
      q: 'Is GST added, and do you issue a tax invoice?',
      a: 'Prices shown are exclusive of GST, which is added at checkout at the applicable provincial rate (we show 17%). A printed tax invoice with your NTN goes in every box, and a PDF copy is emailed when the order ships. Businesses in Punjab get a PRA invoice; Sindh customers get SRB.'
    },
    {
      q: 'What happens if the posters arrive damaged?',
      a: 'Tubes and flat packs are courier-insured, but things happen. Photograph the parcel before opening, keep the packaging, and WhatsApp us within 48 hours. We reprint and re-dispatch at our cost — no return freight needed, keep the damaged ones.'
    }
  ],

  cities: [
    { id: 'lhr', name: 'Lahore', eta: 'Same day or next day', zone: 'Zone 1' },
    { id: 'khi', name: 'Karachi', eta: 'Next day', zone: 'Zone 1' },
    { id: 'isb', name: 'Islamabad', eta: '2 working days', zone: 'Zone 2' },
    { id: 'rwd', name: 'Rawalpindi', eta: '2 working days', zone: 'Zone 2' },
    { id: 'fia', name: 'Faisalabad', eta: '2 working days', zone: 'Zone 2' },
    { id: 'mul', name: 'Multan', eta: '2–3 working days', zone: 'Zone 2' },
    { id: 'pes', name: 'Peshawar', eta: '2–3 working days', zone: 'Zone 3' },
    { id: 'hyd', name: 'Hyderabad', eta: '2 working days', zone: 'Zone 2' },
    { id: 'skl', name: 'Sialkot', eta: '2–3 working days', zone: 'Zone 3' },
    { id: 'qta', name: 'Quetta', eta: '3–4 working days', zone: 'Zone 3' }
  ],

  payments: ['Cash on delivery', 'JazzCash', 'Easypaisa', 'Bank transfer', 'Visa / Mastercard'],

  artworkRules: {
    minDpi: 150,
    idealDpi: 300,
    bleedMm: 3,
    maxUploadMb: 200,
    formats: ['PDF', 'PNG', 'JPG', 'TIFF', 'AI', 'PSD']
  },

  /* ---- Design Studio templates ---------------------------------------- */
  templates: [
    {
      id: 'grand-opening', name: 'Grand opening', ratio: 'portrait',
      bg: '#F5F2EC', ink: '#0C0C0D', accent: '#E4002B', layout: 'stack',
      lines: [
        { t: 'GRAND', k: 'display' },
        { t: 'OPENING', k: 'display' },
        { t: 'Saffron Cycles · MM Alam Road', k: 'body' },
        { t: 'Saturday 4 October, 11am', k: 'body' },
        { t: '15% OFF EVERY BIKE, ALL WEEK', k: 'flag' }
      ]
    },
    {
      id: 'eid', name: 'Eid greeting', ratio: 'portrait',
      bg: '#0C0C0D', ink: '#F5F2EC', accent: '#E4002B', layout: 'centred',
      lines: [
        { t: 'EID', k: 'display' },
        { t: 'MUBARAK', k: 'display' },
        { t: 'From all of us at Bunneer Studio', k: 'body' },
        { t: 'Showroom closed 21–23 June', k: 'flag' }
      ]
    },
    {
      id: 'gig', name: 'Gig night', ratio: 'portrait',
      bg: '#E4002B', ink: '#0C0C0D', accent: '#F5F2EC', layout: 'stack',
      lines: [
        { t: 'LIVE', k: 'display' },
        { t: 'AT THE', k: 'mid' },
        { t: 'ROUND ROOM', k: 'display' },
        { t: 'Coke Studio Sessions · 8pm', k: 'body' },
        { t: 'Tickets Rs 800 · door Rs 1,200', k: 'flag' }
      ]
    },
    {
      id: 'sale', name: 'Sale 50% off', ratio: 'portrait',
      bg: '#F5F2EC', ink: '#E4002B', accent: '#0C0C0D', layout: 'band',
      lines: [
        { t: 'END OF', k: 'mid' },
        { t: 'SEASON', k: 'mid' },
        { t: '50%', k: 'huge' },
        { t: 'ALL LAWN KURTA · NO CODE NEEDED', k: 'flag' },
        { t: 'Zevaa Apparel · till Sunday', k: 'body' }
      ]
    },
    {
      id: 'cricket', name: 'Cricket tournament', ratio: 'landscape',
      bg: '#0C0C0D', ink: '#F5F2EC', accent: '#E4002B', layout: 'split',
      lines: [
        { t: 'SIXER CUP', k: 'display' },
        { t: '2026', k: 'display' },
        { t: 'Gaddafi turf · 14 teams · free entry', k: 'body' },
        { t: 'FINAL SUNDAY 5PM', k: 'flag' }
      ]
    },
    {
      id: 'rent', name: 'Property to let', ratio: 'portrait',
      bg: '#FFFFFF', ink: '#0C0C0D', accent: '#E4002B', layout: 'stack',
      lines: [
        { t: 'FLAT', k: 'display' },
        { t: 'TO LET', k: 'display' },
        { t: '5 marla · 3 bed · DHA Phase 5', k: 'body' },
        { t: 'Rs 145,000 / month', k: 'mid' },
        { t: 'Call 0300 842 7755', k: 'flag' }
      ]
    },
    {
      id: 'festival', name: 'Food festival', ratio: 'portrait',
      bg: '#F5F2EC', ink: '#0C0C0D', accent: '#E4002B', layout: 'band',
      lines: [
        { t: 'STREET', k: 'display' },
        { t: 'FOOD', k: 'display' },
        { t: 'WEEKEND', k: 'display' },
        { t: '42 stalls · DHA Civic Centre', k: 'body' },
        { t: 'ENTRANCE FREE · 4PM–MIDNIGHT', k: 'flag' }
      ]
    },
    {
      id: 'wedding', name: 'Wedding invite', ratio: 'portrait',
      bg: '#F5F2EC', ink: '#0C0C0D', accent: '#E4002B', layout: 'centred',
      lines: [
        { t: 'THE', k: 'mid' },
        { t: 'WALIMA', k: 'display' },
        { t: 'of Areeba & Zeeshan', k: 'body' },
        { t: 'Sunday 19 October · 7pm', k: 'body' },
        { t: 'Pearl Continental, Lahore', k: 'flag' }
      ]
    },
    {
      id: 'admissions', name: 'Academy admissions', ratio: 'portrait',
      bg: '#0C0C0D', ink: '#F5F2EC', accent: '#E4002B', layout: 'stack',
      lines: [
        { t: 'ADMISSIONS', k: 'display' },
        { t: 'OPEN', k: 'display' },
        { t: 'Matric · FSc · O/A Levels', k: 'body' },
        { t: 'Scholarships up to 75%', k: 'flag' },
        { t: 'Alif Academy · Johar Town', k: 'body' }
      ]
    },
    {
      id: 'lost', name: 'Lost & found', ratio: 'a4',
      bg: '#FFFFFF', ink: '#0C0C0D', accent: '#E4002B', layout: 'centred',
      lines: [
        { t: 'LOST', k: 'huge' },
        { t: 'CAT', k: 'huge' },
        { t: 'Grey tabby, green collar, Model Town', k: 'body' },
        { t: 'REWARD Rs 10,000', k: 'flag' },
        { t: '0300 842 7755', k: 'body' }
      ]
    }
  ],

  studioFonts: [
    { id: 'archivo', label: 'Archivo Black', css: '900 %spx Archivo, sans-serif' },
    { id: 'space', label: 'Space Grotesk', css: '700 %spx "Space Grotesk", sans-serif' },
    { id: 'mono', label: 'Plex Mono', css: '500 %spx "IBM Plex Mono", monospace' },
    { id: 'inter', label: 'Inter', css: '500 %spx Inter, sans-serif' }
  ],

  footer: {
    cols: [
      {
        h: 'Posters', links: [
          ['A4 Posters', 'posters.html?size=a4'], ['A3 Posters', 'posters.html?size=a3'], ['A2 Posters', 'posters.html?size=a2'],
          ['A1 Posters', 'posters.html?size=a1'], ['A0 Posters', 'posters.html?size=a0'], ['20×30 Posters', 'posters.html?size=i2030'],
          ['40×30 Posters', 'posters.html?size=i4030'], ['60×40 Posters', 'posters.html?size=i6040'], ['Custom Size', 'posters.html?size=custom'],
          ['Waterproof PVC', 'posters.html?stock=pvc220']
        ]
      },
      {
        h: 'Frames & display', links: [
          ['Snap Frames', 'posters.html?cat=accessory'], ['A-Frames', 'posters.html?cat=accessory'],
          ['Foamboard Mounting', 'product.html?p=a1-event-poster&mount=foam'], ['Stretched Canvas', 'product.html?p=a1-event-poster&mount=canvas'],
          ['Roll-Up Standees', 'posters.html?cat=accessory'], ['Flex Banners', 'posters.html?cat=accessory'],
          ['Vinyl Stickers', 'posters.html?cat=accessory']
        ]
      },
      {
        h: 'Tools', links: [
          ['Design Studio', 'design-studio.html'], ['Poster templates (10)', 'design-studio.html'],
          ['Artwork checker', 'design-studio.html?tab=check'], ['Size comparison', 'posters.html#sizes'],
          ['Bulk price table', 'posters.html#prices'], ['Track my order', 'basket.html#track']
        ]
      },
      {
        h: 'Help', links: [
          ['How to make a poster', 'posters.html#faq'], ['Paper stock guide', 'index.html#stocks'],
          ['Delivery across Pakistan', 'index.html#delivery'], ['Returns & reprints', 'posters.html#faq'],
          ['Trade accounts', 'index.html#trade'], ['Contact us', 'index.html#contact']
        ]
      }
    ]
  }
};
