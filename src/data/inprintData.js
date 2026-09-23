// INPRINT — Phase 2 Master Data & Business Logic
// Platform: Creative Production Agency in Lahore

export const BRAND = {
  name: "INPRINT",
  tagline: "Creative Production Agency · Lahore",
  headline: "From idea to brand launch.",
  supportingLine: "We develop brands, design campaigns, produce print and physical brand assets, and deliver complete brand experiences—from one business card to a multi-location rollout.",
  corePromise: "From idea to brand launch. Design to delivery.",
  phone: "0321 3656096",
  phoneRaw: "03213656096",
  phoneIntl: "+923213656096",
  whatsapp: "0321 3656096",
  email: "hello@inprint.pk",
  website: "inprint.pk",
  address: "M-71, Zainab Tower, Model Town Link Road, Lahore, 54700",
  city: "Lahore",
  country: "Pakistan",
  rating: 4.9,
  ratingTotal: "Verified Google Rating",
  safeTrustWording: "Online enquiries accepted 24/7. Production and dispatch times vary by product and project.",
  trustBullets: [
    "Artwork checked before production.",
    "Clear pricing for standard products.",
    "Production support from Lahore.",
    "Nationwide delivery available.",
    "Design, production and installation under one roof."
  ]
};

// WhatsApp template generator based on Section 26
export function createWhatsAppUrl(templateType, data = {}) {
  let message = "";
  if (templateType === "product") {
    message = `Hi INPRINT, I am interested in:\n\nProduct: ${data.productName || "Product"}\nQuantity: ${data.quantity || "100"}\nMaterial: ${data.material || "Standard"}\nFinish: ${data.finish || "Matte"}\nDelivery city: ${data.city || "Lahore"}\n\nPlease confirm price and production time.`;
  } else if (templateType === "custom") {
    message = `Hi INPRINT, I want to discuss a project.\n\nProject type: ${data.projectType || "Branding / Production"}\nBrand/company: ${data.company || "My Brand"}\nCity: ${data.city || "Lahore"}\nRequired date: ${data.deadline || "Within 2 weeks"}\nDetails: ${data.details || "Requesting quotation and timeline"}\n\nI can share reference files and site photos here.`;
  } else if (templateType === "order") {
    message = `INPRINT order update\n\nOrder: #${data.orderNumber || "INP-8492"}\nStatus: ${data.status || "In Production"}\nNext step: ${data.nextStep || "Finishing & Packaging"}\nExpected date: ${data.expectedDate || "Tomorrow"}\n\nFor support, reply to this message.`;
  } else if (templateType === "cart") {
    message = `Hi INPRINT, I would like to place an order from my cart:\n\n${data.cartSummary || "Cart items"}\nTotal: Rs. ${data.total || "0"}\nDelivery city: ${data.city || "Lahore"}\n\nPlease review my order.`;
  } else {
    message = `Hi INPRINT, I would like to enquire about your design, print and fabrication services in Lahore.`;
  }
  return `https://wa.me/923213656096?text=${encodeURIComponent(message)}`;
}

// 8 Master Product Categories
export const PRODUCT_CATEGORIES = [
  {
    id: "business-essentials",
    name: "Business Essentials",
    slug: "business-essentials",
    h1: "Business print for every working day.",
    intro: "Business cards, letterheads, folders, profiles, forms and stationery produced with consistent brand application.",
    count: 10,
    icon: "Briefcase",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "marketing-print",
    name: "Marketing Print",
    slug: "marketing-print",
    h1: "Print that helps your campaign get noticed.",
    intro: "Flyers, brochures, posters, catalogues, menus, vouchers and promotional materials for launches, offers and everyday marketing.",
    count: 8,
    icon: "Megaphone",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "flex-large-format",
    name: "Flex & Large Format",
    slug: "flex-large-format",
    h1: "Large-format printing with visual impact.",
    intro: "Produce banners, backdrops, flex, vinyl, flags, wall graphics and promotional displays for events, retail and outdoor campaigns.",
    count: 11,
    icon: "Maximize",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "signage",
    name: "Signage",
    slug: "signage",
    h1: "Signage designed to be seen.",
    intro: "From reception signs to illuminated shop fronts, we help businesses create clear, durable and visible signage.",
    count: 11,
    icon: "Layers",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "packaging",
    name: "Packaging",
    slug: "packaging",
    h1: "Packaging that carries your brand.",
    intro: "Boxes, bags, labels, sleeves and inserts designed and produced for retail, food, e-commerce and gifting.",
    count: 9,
    icon: "Package",
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "exhibition-retail",
    name: "Exhibition & Retail",
    slug: "exhibition-retail",
    h1: "Physical spaces that attract attention.",
    intro: "Exhibition stalls, counters, product displays, POS units and retail branding for events and customer-facing spaces.",
    count: 5,
    icon: "Store",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "merchandise-gifts",
    name: "Merchandise & Gifts",
    slug: "merchandise-gifts",
    h1: "Branded products people remember.",
    intro: "Corporate gifts, promotional items, executive sets and event merchandise with your identity applied consistently.",
    count: 7,
    icon: "Gift",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "apparel-uniforms",
    name: "Apparel & Uniforms",
    slug: "apparel-uniforms",
    h1: "Put your brand on the team.",
    intro: "T-shirts, polos, caps, uniforms, aprons, safety wear and workwear with printing or embroidery.",
    count: 5,
    icon: "Shirt",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
  }
];

// Product Matrix matching Section 7 & Section 4
export const PRODUCTS = [
  {
    id: "business-cards",
    slug: "business-cards",
    name: "Business Cards",
    category: "business-essentials",
    categoryName: "Business Essentials",
    shortDesc: "Professional cards for meetings, sales and everyday networking.",
    h1: "Business Cards",
    intro: "Make a professional first impression with well-finished business cards printed to your brand specifications.",
    basePrice: 1850,
    priceUnit: "per 100 pcs",
    turnaround: "24-48 hrs",
    featured: true,
    rating: 4.9,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
    ],
    primaryCta: "Configure Business Cards",
    quantities: [100, 250, 500, 1000, 2500],
    materials: [
      { id: "art-card-350", name: "350gsm Premium Art Card", priceMultiplier: 1.0 },
      { id: "velvet-soft-touch", name: "400gsm Velvet Soft Touch", priceMultiplier: 1.35 },
      { id: "cotton-textured", name: "300gsm Textured Linen / Cotton", priceMultiplier: 1.5 },
      { id: "recycled-kraft", name: "350gsm Eco Kraft Recycled", priceMultiplier: 1.2 }
    ],
    finishes: [
      { id: "matte", name: "Matte Lamination", addCost: 350 },
      { id: "gloss", name: "Gloss Lamination", addCost: 300 },
      { id: "spot-uv", name: "Spot UV + Matte", addCost: 1100 },
      { id: "gold-foil", name: "Gold / Silver Foil Stamping", addCost: 1800 },
      { id: "embossing", name: "Blind Embossing", addCost: 1500 }
    ],
    printSides: [
      { id: "single", name: "Single-sided", multiplier: 1.0 },
      { id: "double", name: "Double-sided", multiplier: 1.3 }
    ],
    specs: {
      standardSize: "3.5\" x 2.0\" (89mm x 51mm)",
      bleed: "3mm on all sides",
      printMethod: "Digital Offset / High Precision HP Indigo",
      resolution: "300 DPI CMYK",
      minQty: "100 pcs"
    }
  },
  {
    id: "flyers",
    slug: "flyers",
    name: "Flyers",
    category: "marketing-print",
    categoryName: "Marketing Print",
    shortDesc: "Deliver an offer, announcement or campaign message quickly and clearly.",
    h1: "Campaign Flyers",
    intro: "High-speed promotional flyers in vibrant full-colour printing to launch your offer or event across Lahore.",
    basePrice: 3200,
    priceUnit: "per 500 pcs",
    turnaround: "24-48 hrs",
    featured: true,
    rating: 4.8,
    reviewsCount: 98,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    primaryCta: "Print Flyers",
    quantities: [250, 500, 1000, 2500, 5000],
    materials: [
      { id: "128gsm-gloss", name: "128gsm Gloss Art Paper", priceMultiplier: 1.0 },
      { id: "150gsm-art", name: "150gsm Semi-Gloss Card", priceMultiplier: 1.2 },
      { id: "300gsm-card", name: "300gsm Heavy Card", priceMultiplier: 1.6 }
    ],
    finishes: [
      { id: "none", name: "No Coating", addCost: 0 },
      { id: "matte", name: "Matte Lamination", addCost: 650 },
      { id: "gloss", name: "Gloss Lamination", addCost: 600 }
    ],
    printSides: [
      { id: "single", name: "Single-sided", multiplier: 1.0 },
      { id: "double", name: "Double-sided", multiplier: 1.45 }
    ],
    specs: {
      standardSize: "A5 (148 x 210mm) / A4",
      bleed: "3mm bleed required",
      printMethod: "Offset 4-Colour Process",
      resolution: "300 DPI CMYK",
      minQty: "250 pcs"
    }
  },
  {
    id: "panna-flex",
    slug: "panna-flex",
    name: "Panna Flex",
    category: "flex-large-format",
    categoryName: "Flex & Large Format",
    shortDesc: "Cost-effective large-format printing for outdoor and promotional use.",
    h1: "Panna Flex Printing",
    intro: "Durable Star & Chinese flex printing with vivid outdoor UV inks, eyelets and seam stitching for high-visibility campaigns.",
    basePrice: 28,
    priceUnit: "per sq. ft.",
    turnaround: "Same-day / 24 hrs",
    featured: true,
    rating: 4.9,
    reviewsCount: 215,
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80",
    primaryCta: "Price Panna Flex",
    quantities: [50, 100, 250, 500, 1000],
    materials: [
      { id: "frontlit-star", name: "Star Korea Frontlit 320g", priceMultiplier: 1.0 },
      { id: "backlit-flex", name: "Backlit Illuminated Flex", priceMultiplier: 1.5 },
      { id: "blackout-flex", name: "Blackout Opaque Flex (No Shadow)", priceMultiplier: 1.35 }
    ],
    finishes: [
      { id: "eyelets", name: "Brass Eyelets every 2ft", addCost: 150 },
      { id: "hemming", name: "Reinforced Folded Hemming", addCost: 200 },
      { id: "pole-pockets", name: "Top & Bottom Pole Pockets", addCost: 350 }
    ],
    printSides: [
      { id: "single", name: "Front Only", multiplier: 1.0 }
    ],
    specs: {
      standardSize: "Custom width up to 10.5 ft seamless",
      bleed: "1 inch margin recommended",
      printMethod: "Konica Minolta / Roland Outdoor Solvent",
      resolution: "150-300 DPI CMYK",
      minQty: "20 sq. ft."
    }
  },
  {
    id: "roll-up-banners",
    slug: "roll-up-banners",
    name: "Roll-Up Banners",
    category: "flex-large-format",
    categoryName: "Flex & Large Format",
    shortDesc: "Portable display graphics for exhibitions, receptions and promotions.",
    h1: "Roll-Up Standees & Banners",
    intro: "Sleek aluminium retractable cassette standees with non-curling greyback PET graphic media and carrying bag.",
    basePrice: 3800,
    priceUnit: "complete stand",
    turnaround: "24 hrs",
    featured: true,
    rating: 4.9,
    reviewsCount: 160,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    primaryCta: "Order a Roll-Up",
    quantities: [1, 2, 5, 10, 25],
    materials: [
      { id: "greyback-pet", name: "Anti-Curl Greyback Film (Blockout)", priceMultiplier: 1.0 },
      { id: "fabric-matte", name: "Tension Fabric Matte", priceMultiplier: 1.25 }
    ],
    finishes: [
      { id: "matte-coat", name: "Matte Anti-Glare Shield", addCost: 0 },
      { id: "heavy-base", name: "Luxury Teardrop Heavy Aluminium Base", addCost: 1400 }
    ],
    printSides: [
      { id: "single", name: "Single-sided 2.5 x 6.5 ft", multiplier: 1.0 },
      { id: "double", name: "Double-sided Standee", multiplier: 1.8 }
    ],
    specs: {
      standardSize: "2.5 x 6.5 ft (76 x 200 cm) or 3 x 6.5 ft",
      bleed: "Bottom 2 inches hidden inside base",
      printMethod: "Eco-Solvent / UV Flatbed",
      resolution: "200-300 DPI CMYK",
      minQty: "1 unit"
    }
  },
  {
    id: "custom-product-boxes",
    slug: "custom-product-boxes",
    name: "Custom Product Boxes",
    category: "packaging",
    categoryName: "Packaging",
    shortDesc: "Protect and present your product with packaging designed around your brand.",
    h1: "Custom Product Packaging Boxes",
    intro: "Precision die-cut folding cartons, tuck-end boxes and bespoke retail packaging produced with food-safe or luxury stock.",
    basePrice: 45,
    priceUnit: "per box (from 500 pcs)",
    turnaround: "4-6 days",
    featured: true,
    rating: 4.9,
    reviewsCount: 110,
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80",
    primaryCta: "Design Product Boxes",
    quantities: [250, 500, 1000, 2500, 5000],
    materials: [
      { id: "350gsm-bleached", name: "350gsm Solid Bleached Board (SBB)", priceMultiplier: 1.0 },
      { id: "400gsm-duplex", name: "400gsm Greyback Duplex Board", priceMultiplier: 0.85 },
      { id: "kraft-virgin", name: "350gsm Virgin Kraft Eco Board", priceMultiplier: 1.15 },
      { id: "rigid-greyboard", name: "1000gsm Rigid Greyboard + Wrapped Sheet", priceMultiplier: 2.8 }
    ],
    finishes: [
      { id: "matte", name: "Soft Matte Lamination", addCost: 8 },
      { id: "spot-uv", name: "Matte + Raised Spot UV", addCost: 18 },
      { id: "gold-foil", name: "Metallic Gold/Silver Foil Stamp", addCost: 22 },
      { id: "emboss", name: "Registered Deboss / Emboss", addCost: 15 }
    ],
    printSides: [
      { id: "outer", name: "Outer 4C Process Only", multiplier: 1.0 },
      { id: "both", name: "Inside & Outside Printing", multiplier: 1.45 }
    ],
    specs: {
      standardSize: "Custom to dieline specifications",
      bleed: "5mm dieline bleed",
      printMethod: "Heidelberg Speedmaster 5-Colour",
      resolution: "350 DPI CMYK",
      minQty: "250 pcs"
    }
  },
  {
    id: "stickers-labels",
    slug: "stickers-labels",
    name: "Stickers & Labels",
    category: "packaging",
    categoryName: "Packaging",
    shortDesc: "Add branding, information or security to products and packaging.",
    h1: "Custom Die-Cut Stickers & Labels",
    intro: "Waterproof vinyl, clear transparent, metallic, or paper labels custom cut to any outline or delivered on rolls.",
    basePrice: 1200,
    priceUnit: "per 250 pcs",
    turnaround: "24-48 hrs",
    featured: true,
    rating: 4.8,
    reviewsCount: 184,
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
    primaryCta: "Order Stickers",
    quantities: [100, 250, 500, 1000, 5000],
    materials: [
      { id: "gloss-vinyl", name: "Gloss Waterproof Vinyl", priceMultiplier: 1.0 },
      { id: "matte-vinyl", name: "Matte Vinyl (Scratch-Resistant)", priceMultiplier: 1.1 },
      { id: "clear-transparent", name: "Clear Transparent Film", priceMultiplier: 1.3 },
      { id: "holographic", name: "Rainbow Holographic Vinyl", priceMultiplier: 1.6 },
      { id: "paper-uncoated", name: "Uncoated Textured Paper Label", priceMultiplier: 0.85 }
    ],
    finishes: [
      { id: "kiss-cut", name: "Kiss Cut on Sheet", addCost: 0 },
      { id: "die-cut-single", name: "Individual Custom Die-Cut Shape", addCost: 350 },
      { id: "roll", name: "Machine-Applicable Roll Format", addCost: 750 }
    ],
    printSides: [
      { id: "front", name: "Front Adhesive Face", multiplier: 1.0 }
    ],
    specs: {
      standardSize: "Any custom shape / 2\"x2\", 3\"x3\", 4\"x2\"",
      bleed: "2mm safety margin",
      printMethod: "Mimaki High-Res Digital Latex",
      resolution: "300 DPI CMYK + White Ink",
      minQty: "100 pcs"
    }
  },
  {
    id: "3d-letter-signage",
    slug: "3d-letter-signage",
    name: "3D Letter Signage",
    category: "signage",
    categoryName: "Signage",
    shortDesc: "Give your business name depth, visibility and a stronger presence.",
    h1: "3D Architectural & Letter Signage",
    intro: "Dimensional signage fabricated from acrylic, stainless steel, brass, or aluminium with front-lit, halo-backlit, or exposed Edison illumination.",
    basePrice: 18500,
    priceUnit: "starting base estimate",
    turnaround: "5-7 days",
    featured: true,
    rating: 5.0,
    reviewsCount: 76,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    primaryCta: "Request Signage Quote",
    quantities: [1, 2, 4, 10],
    materials: [
      { id: "acrylic-led", name: "Cast Acrylic 3D + Samsung LED Modules", priceMultiplier: 1.0 },
      { id: "stainless-steel", name: "Laser-Cut Stainless Steel (Gold / Silver)", priceMultiplier: 1.45 },
      { id: "solid-brass", name: "Polished Solid Brass Architectural", priceMultiplier: 1.85 },
      { id: "aluminium-composite", name: "Aluminium Composite Box Cladding", priceMultiplier: 0.9 }
    ],
    finishes: [
      { id: "halo-lit", name: "Halo Backlit Warm White (3000K)", addCost: 4500 },
      { id: "front-lit", name: "Direct Front-lit Cool White (6500K)", addCost: 3500 },
      { id: "rgb-lit", name: "Dynamic Smart RGB Programmable", addCost: 7500 },
      { id: "non-lit", name: "Architectural Non-Illuminated", addCost: 0 }
    ],
    printSides: [
      { id: "single-face", name: "Single Facade Mount", multiplier: 1.0 },
      { id: "double-projecting", name: "Double-Sided Projecting Blade Sign", multiplier: 1.7 }
    ],
    specs: {
      standardSize: "Custom site dimensions (Site visit recommended)",
      bleed: "Vector CAD / AI dieline required",
      printMethod: "CNC Routing + Fiber Laser Fabrication",
      resolution: "Industrial CAD / Vector",
      minQty: "1 installation"
    }
  },
  {
    id: "shopping-bags",
    slug: "shopping-bags",
    name: "Shopping Bags",
    category: "packaging",
    categoryName: "Packaging",
    shortDesc: "Carry your brand beyond the store, event or delivery point.",
    h1: "Luxury & Retail Shopping Bags",
    intro: "Art card luxury shopping bags with cotton rope or satin handles, reinforced card base, and precision offset branding.",
    basePrice: 65,
    priceUnit: "per bag (min 500)",
    turnaround: "5-7 days",
    featured: true,
    rating: 4.8,
    reviewsCount: 92,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    primaryCta: "Order Shopping Bags",
    quantities: [250, 500, 1000, 2500],
    materials: [
      { id: "250gsm-art-card", name: "250gsm Coated Bleached Art Card", priceMultiplier: 1.0 },
      { id: "virgin-kraft", name: "180gsm Brown Virgin Kraft Paper", priceMultiplier: 0.75 },
      { id: "white-kraft", name: "200gsm Premium White Ribbed Kraft", priceMultiplier: 0.95 }
    ],
    finishes: [
      { id: "matte-rope", name: "Matte Finish + Twisted Cotton Cord", addCost: 0 },
      { id: "satin-ribbon", name: "Matte + Silk Satin Ribbon Handles", addCost: 12 },
      { id: "gold-foil-stamped", name: "Metallic Foil Stamped Logo", addCost: 16 }
    ],
    printSides: [
      { id: "all-sides", name: "Full Exterior 4-Side Print", multiplier: 1.0 }
    ],
    specs: {
      standardSize: "Small (8x10x3\"), Medium (10x14x4\"), Large (16x12x5\")",
      bleed: "Standard bag fold dielines",
      printMethod: "High Precision Offset Printing",
      resolution: "300 DPI CMYK",
      minQty: "250 bags"
    }
  },
  {
    id: "corporate-gift-sets",
    slug: "corporate-gift-sets",
    name: "Corporate Gift Sets",
    category: "merchandise-gifts",
    categoryName: "Merchandise & Gifts",
    shortDesc: "Combine selected products into a branded presentation-ready set.",
    h1: "Executive Corporate Gift Sets",
    intro: "Curated gift boxes combining premium metal pens, leather organizers, thermal bottles, and wireless power accessories customized with your corporate logo.",
    basePrice: 3850,
    priceUnit: "per box set",
    turnaround: "3-5 days",
    featured: true,
    rating: 4.9,
    reviewsCount: 65,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    primaryCta: "Build a Gift Set",
    quantities: [25, 50, 100, 250, 500],
    materials: [
      { id: "luxury-matte-box", name: "Hardcover Magnetic Gift Box + EVA Foam Cutout", priceMultiplier: 1.0 },
      { id: "wood-crate", name: "Handcrafted Pine Wood Executive Crate", priceMultiplier: 1.45 }
    ],
    finishes: [
      { id: "laser-engraved", name: "Laser Engraved Metal + Hot Stamped Lid", addCost: 0 },
      { id: "uv-print", name: "Full Colour Raised UV Logo", addCost: 450 }
    ],
    printSides: [
      { id: "complete-set", name: "Box + 4 Branded Items Included", multiplier: 1.0 }
    ],
    specs: {
      standardSize: "Includes thermal flask, metal pen, notebook & cardholder",
      bleed: "Logo vector format AI/EPS",
      printMethod: "Fiber Laser Engraving + UV Silk Screen",
      resolution: "Vector Only",
      minQty: "25 sets"
    }
  },
  {
    id: "company-profiles",
    slug: "company-profiles",
    name: "Company Profiles",
    category: "business-essentials",
    categoryName: "Business Essentials",
    shortDesc: "Present your business clearly with a structured, professional company profile.",
    h1: "Corporate Company Profiles & Booklets",
    intro: "High-impact saddle-stitched or wire-o bound profile brochures with velvety covers, spot UV highlights, and high-fidelity paper stocks.",
    basePrice: 450,
    priceUnit: "per copy (12-16 pages, min 50)",
    turnaround: "3-4 days",
    featured: true,
    rating: 4.9,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    primaryCta: "Print Company Profiles",
    quantities: [50, 100, 250, 500, 1000],
    materials: [
      { id: "standard-150-300", name: "300gsm Cover + 150gsm Inner Art Paper", priceMultiplier: 1.0 },
      { id: "luxury-heavy", name: "350gsm Soft-Touch Cover + 170gsm Silk Inners", priceMultiplier: 1.3 }
    ],
    finishes: [
      { id: "saddle-stitch", name: "Saddle-Stitched (2 staples)", addCost: 0 },
      { id: "perfect-bound", name: "Perfect Bound (Spine book finish)", addCost: 45 },
      { id: "spot-uv-cover", name: "Cover Spot UV + Matte Coat", addCost: 35 }
    ],
    printSides: [
      { id: "12-pages", name: "12 Pages (Cover + 8 Inners)", multiplier: 1.0 },
      { id: "16-pages", name: "16 Pages (Cover + 12 Inners)", multiplier: 1.25 },
      { id: "24-pages", name: "24 Pages (Cover + 20 Inners)", multiplier: 1.55 }
    ],
    specs: {
      standardSize: "A4 Portrait (210 x 297mm) or Landscape",
      bleed: "3mm bleed with PDF printer marks",
      printMethod: "Heidelberg 4-Colour Offset",
      resolution: "300 DPI CMYK",
      minQty: "50 copies"
    }
  },
  {
    id: "mugs",
    slug: "mugs",
    name: "Mugs",
    category: "merchandise-gifts",
    categoryName: "Merchandise & Gifts",
    shortDesc: "Turn a practical everyday item into a visible brand reminder.",
    h1: "Custom Branded Ceramic Mugs",
    intro: "Dishwasher-safe ceramic coffee mugs with full-wrap vibrant sublimation printing for daily office use and promotions.",
    basePrice: 420,
    priceUnit: "per mug (min 24 pcs)",
    turnaround: "24-48 hrs",
    featured: true,
    rating: 4.7,
    reviewsCount: 130,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    primaryCta: "Order Branded Mugs",
    quantities: [24, 48, 96, 250, 500],
    materials: [
      { id: "white-ceramic-11oz", name: "11oz Grade-A White Ceramic", priceMultiplier: 1.0 },
      { id: "black-inner-color", name: "11oz Dual-Tone (Black / Red Interior)", priceMultiplier: 1.2 },
      { id: "magic-color-change", name: "Heat Reveal Magic Mug", priceMultiplier: 1.5 }
    ],
    finishes: [
      { id: "individual-box", name: "Included White Box Packaging", addCost: 0 },
      { id: "custom-printed-box", name: "Custom Printed Individual Gift Box", addCost: 95 }
    ],
    printSides: [
      { id: "full-wrap", name: "Full Panoramic Wrap (8.5\" x 3.5\")", multiplier: 1.0 }
    ],
    specs: {
      standardSize: "11oz (325ml) / 15oz available",
      bleed: "Full wrap template provided",
      printMethod: "High-Temperature Dye Sublimation",
      resolution: "300 DPI RGB / CMYK",
      minQty: "24 pcs"
    }
  },
  {
    id: "corporate-uniforms",
    slug: "corporate-uniforms",
    name: "Corporate Uniforms",
    category: "apparel-uniforms",
    categoryName: "Apparel & Uniforms",
    shortDesc: "Create a consistent appearance across your team and customer touchpoints.",
    h1: "Corporate Uniforms & Polo Shirts",
    intro: "Premium honeycomb pique cotton polo shirts and workwear tailored for teams, front-desk staff, and operational crews with embroidery or screen print.",
    basePrice: 1250,
    priceUnit: "per polo shirt (min 20 pcs)",
    turnaround: "3-5 days",
    featured: true,
    rating: 4.9,
    reviewsCount: 82,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    primaryCta: "Plan Uniforms",
    quantities: [20, 50, 100, 250, 500],
    materials: [
      { id: "pique-cotton-220", name: "220gsm 100% Combed Pique Cotton", priceMultiplier: 1.0 },
      { id: "poly-cotton-dri-fit", name: "Dri-Fit Breathable Microfiber", priceMultiplier: 0.95 },
      { id: "heavy-fleece", name: "320gsm Heavy Winter Fleece Sweatshirt", priceMultiplier: 1.8 }
    ],
    finishes: [
      { id: "chest-embroidery", name: "High-Density Chest Embroidery (Up to 8,000 stitches)", addCost: 0 },
      { id: "chest-plus-back-print", name: "Chest Embroidery + Screen Printed Back", addCost: 280 }
    ],
    printSides: [
      { id: "front-back", name: "Standard Placement", multiplier: 1.0 }
    ],
    specs: {
      standardSize: "Sizes S, M, L, XL, XXL (Assorted breakdown)",
      bleed: "Vector logo required for digitizing",
      printMethod: "Tajima Multi-Head Embroidery / Plastisol Screen",
      resolution: "Vector AI / PDF",
      minQty: "20 pieces"
    }
  }
];

// 10 Master Services (Section 8)
export const SERVICES = [
  {
    id: "advertising-campaign-production",
    slug: "advertising-campaign-production",
    name: "Advertising & Campaign Production",
    h1: "Campaigns people can see.",
    shortDesc: "We design and produce physical campaign assets for launches, promotions, events, retail spaces and outdoor visibility.",
    deliverables: [
      "Indoor advertising",
      "Outdoor advertising",
      "Billboard graphics",
      "Wall and window graphics",
      "Vehicle branding",
      "Promotional displays",
      "Point-of-sale graphics",
      "Backdrops and banners",
      "Campaign rollout materials"
    ],
    process: ["Brief", "Creative direction", "Artwork", "Production", "Delivery or installation"],
    cta: "Plan a Campaign",
    heroImage: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "brand-identity-branding",
    slug: "brand-identity-branding",
    name: "Brand Identity & Branding",
    h1: "A consistent brand at every touchpoint.",
    shortDesc: "We help businesses create or improve the visual systems they use across print, packaging, signage, spaces and communication materials.",
    deliverables: [
      "Logo development",
      "Colour and typography system",
      "Brand guidelines",
      "Corporate stationery",
      "Office branding",
      "Retail branding",
      "Glass and wall branding",
      "Reception branding",
      "POS branding",
      "Brand implementation"
    ],
    process: ["Discovery", "Concept Exploration", "System Design", "Production Specs", "Rollout Library"],
    cta: "Build My Brand",
    heroImage: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "signage-fabrication",
    slug: "signage-fabrication",
    name: "Signage & Fabrication",
    h1: "Signage designed to be seen. Built for the space.",
    shortDesc: "From shop fronts to reception areas, we design, fabricate and coordinate signage for businesses, offices, retail spaces and events.",
    deliverables: [
      "3D letters",
      "LED signage",
      "Channel letters",
      "Acrylic signage",
      "Metal signage",
      "Light boxes",
      "Reception signs",
      "Directional signs",
      "Safety signs",
      "Shopfront signage"
    ],
    uxFeatures: [
      "Request measurements",
      "Upload site photos",
      "Book a site visit",
      "View material options",
      "Request a signage quote"
    ],
    process: ["Site Audit & Measurement", "3D CAD Visualization", "Material Fabrication", "On-Site Installation"],
    cta: "Request a Signage Quote",
    heroImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "packaging-systems",
    slug: "packaging-systems",
    name: "Packaging Systems",
    h1: "Packaging that carries your brand beyond the product.",
    shortDesc: "We help businesses design and produce packaging that protects the product, explains the offer and creates a consistent customer experience.",
    deliverables: [
      "Product boxes",
      "Food packaging",
      "Mailer boxes",
      "Shopping bags",
      "Paper bags",
      "Sleeves",
      "Labels",
      "Stickers",
      "Inserts",
      "Dieline preparation"
    ],
    process: ["Structural Dieline Engineering", "Surface Design", "Physical Mockup & Proofing", "Offset Production & Die-cutting"],
    cta: "Start a Packaging Project",
    heroImage: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "exhibition-stalls",
    slug: "exhibition-stalls",
    name: "Exhibition Stalls",
    h1: "Make your next exhibition space work harder.",
    shortDesc: "We design, fabricate and install branded exhibition stalls, counters, backdrops and display environments.",
    deliverables: [
      "Custom 3D exhibition stalls",
      "Modular shell-scheme upgrades",
      "Interactive reception counters",
      "Illuminated product display towers",
      "Tension fabric backdrops",
      "Brochure stands and pop-up units"
    ],
    process: ["Brief", "3D concept", "Design approval", "Fabrication", "Installation", "Dismantling"],
    cta: "Request an Exhibition Quote",
    heroImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "corporate-printing",
    slug: "corporate-printing",
    name: "Corporate Printing",
    h1: "Professional print for everyday business.",
    shortDesc: "Produce the stationery, documents and presentation materials your team uses to communicate professionally.",
    deliverables: [
      "Business cards",
      "Letterheads",
      "Envelopes",
      "Company profiles",
      "Presentation folders",
      "Brochures",
      "NCR books",
      "Certificates",
      "Diaries",
      "Calendars"
    ],
    process: ["Paper & Stock Selection", "Pre-Flight Artwork Verification", "Offset Printing", "Special Finishes & Binding"],
    cta: "Order Corporate Print",
    heroImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "large-format-printing",
    slug: "large-format-printing",
    name: "Large-Format Printing",
    h1: "Make your message visible at scale.",
    shortDesc: "Produce large-format graphics for events, retail, outdoor advertising, campaigns, offices and public spaces.",
    deliverables: [
      "Panna flex",
      "Vinyl",
      "Posters",
      "Backdrops",
      "Roll-up banners",
      "X-banners",
      "Flags",
      "Fabric graphics",
      "Wall graphics",
      "Floor graphics"
    ],
    process: ["High-Res File Preparation", "Substrate Calibration", "Eco-Solvent / UV Flatbed Printing", "Finishing & Eyeleting"],
    cta: "Get a Large-Format Quote",
    heroImage: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "merchandise-corporate-gifts",
    slug: "merchandise-corporate-gifts",
    name: "Merchandise & Corporate Gifts",
    h1: "Branded products people remember.",
    shortDesc: "Select and customise useful products for your customers, teams, events and business relationships.",
    deliverables: [
      "Corporate gifts",
      "Mugs",
      "Bottles",
      "Tumblers",
      "Pens",
      "Keychains",
      "Diaries",
      "Gift sets",
      "Awards",
      "Executive gifts"
    ],
    process: ["Item Curation", "Digital Visual Mockup", "Sample Approval", "Batch Personalization & Gift Packing"],
    cta: "Build a Gift Set",
    heroImage: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "apparel-uniforms",
    slug: "apparel-uniforms",
    name: "Apparel & Uniforms",
    h1: "Put your brand on the team.",
    shortDesc: "Create consistent staff clothing, promotional apparel, uniforms and event wear with printing or embroidery.",
    deliverables: [
      "T-shirts",
      "Polo shirts",
      "Caps",
      "Aprons",
      "Corporate uniforms",
      "Safety vests",
      "Embroidery",
      "Screen printing"
    ],
    process: ["Fabric & Pattern Fitting", "Embroidery Digitizing", "Screen Print Sample", "Bulk Production & Sizing QC"],
    cta: "Plan Team Apparel",
    heroImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "franchise-rollout",
    slug: "franchise-rollout",
    name: "Franchise & Multi-Location Rollout",
    h1: "One brand. Many locations. One production system.",
    shortDesc: "We help growing businesses create repeatable brand assets, production specifications and rollout support for new locations.",
    deliverables: [
      "Brand identity systems",
      "Store branding standards",
      "Signage specifications",
      "Packaging templates",
      "Installation guides",
      "Multi-location production",
      "Brand asset libraries",
      "Reprint and maintenance support"
    ],
    process: ["Discovery", "Brand & Space Audit", "Concept Development", "Production Specifications", "Pilot Location", "Rollout & Installation", "Handover & Maintenance"],
    cta: "Book a Franchise Consultation",
    heroImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
  }
];

// 10 Master Solutions (Section 9)
export const SOLUTIONS = [
  {
    id: "promote-a-business",
    slug: "promote-a-business",
    h1: "Give your next promotion more places to appear.",
    title: "Promote a Business",
    shortDesc: "Combine print, outdoor graphics, promotional displays and branded materials into one coordinated campaign.",
    recommendedProducts: ["Flyers", "Posters", "Flex", "Backdrops", "Vehicle branding", "POS displays", "Branded gifts"],
    cta: "Plan My Promotion"
  },
  {
    id: "build-a-brand",
    slug: "build-a-brand",
    h1: "Build a brand people can recognise.",
    title: "Build a Brand",
    shortDesc: "Start with your visual identity, then apply it consistently across stationery, packaging, spaces and promotional materials.",
    recommendedProducts: ["Logo and identity", "Brand guidelines", "Stationery", "Company profile", "Social templates", "Packaging", "Signage"],
    cta: "Start My Brand"
  },
  {
    id: "open-a-shop",
    slug: "open-a-shop",
    h1: "Open with a shop that looks ready for business.",
    title: "Open a Shop",
    shortDesc: "Bring your storefront, interior, menus, packaging and promotional materials together before opening day.",
    recommendedProducts: ["Shopfront signage", "Window graphics", "Interior branding", "Menus", "Packaging", "Staff uniforms", "Opening campaign materials"],
    cta: "Plan My Shop Opening"
  },
  {
    id: "package-a-product",
    slug: "package-a-product",
    h1: "Turn a product into a complete customer experience.",
    title: "Package a Product",
    shortDesc: "Design and produce the boxes, bags, labels, sleeves and inserts that help your product arrive professionally.",
    recommendedProducts: ["Product boxes", "Bags", "Labels", "Sleeves", "Inserts", "Mailer boxes"],
    cta: "Start Packaging Project"
  },
  {
    id: "exhibit-your-brand",
    slug: "exhibit-your-brand",
    h1: "Create an exhibition space people want to enter.",
    title: "Exhibit Your Brand",
    shortDesc: "From the first 3D concept to the final installation, we produce branded event environments that support your goals.",
    recommendedProducts: ["Stall design", "Fabrication", "Pop-up counters", "Roll-up standees", "Lighting", "Brochure racks"],
    cta: "Request Stall Quote"
  },
  {
    id: "print-corporate-material",
    slug: "print-corporate-material",
    h1: "Keep every business document on brand.",
    title: "Print Corporate Material",
    shortDesc: "Order consistent stationery, profiles, folders, forms, brochures and presentation materials for your team.",
    recommendedProducts: ["Stationery", "Profiles", "Folders", "Business essentials", "Certificates", "NCR books"],
    cta: "Order Corporate Print"
  },
  {
    id: "print-large",
    slug: "print-large",
    h1: "Take your message beyond the page.",
    title: "Print Large",
    shortDesc: "Produce large-format graphics for campaigns, events, retail spaces, offices and outdoor visibility.",
    recommendedProducts: ["Flex", "Vinyl", "Backdrops", "Flags", "Wall graphics", "Floor decals"],
    cta: "Price Large-Format Printing"
  },
  {
    id: "promote-with-gifts",
    slug: "promote-with-gifts",
    h1: "Give people something useful to remember you by.",
    title: "Promote with Gifts",
    shortDesc: "Build a branded gift set for clients, teams, events, launches or seasonal campaigns.",
    recommendedProducts: ["Branded gifts", "Uniforms", "Executive gift sets", "Mugs", "Pens", "Tech accessories"],
    cta: "Build a Gift Set"
  },
  {
    id: "brand-a-vehicle",
    slug: "brand-a-vehicle",
    h1: "Turn every journey into brand visibility.",
    title: "Brand a Vehicle",
    shortDesc: "Design and install vehicle graphics for cars, vans, trucks, delivery fleets and promotional vehicles.",
    recommendedProducts: ["Vehicle wraps", "Fleet decals", "Reflective safety graphics", "Magnetic signs"],
    cta: "Request Vehicle Branding Quote"
  },
  {
    id: "roll-out-a-franchise",
    slug: "roll-out-a-franchise",
    h1: "Make every location feel like the same brand.",
    title: "Roll Out a Franchise",
    shortDesc: "Create the brand standards, production templates and installation process needed for consistent multi-location growth.",
    recommendedProducts: ["Brand systems", "Multi-location production", "Signage manual", "Packaging dielines", "Turnkey store fit"],
    cta: "Book Franchise Consultation"
  }
];

// 9 Master Industries (Section 10)
export const INDUSTRIES = [
  {
    id: "restaurants-cafes",
    name: "Restaurants & Cafés",
    h1: "Branding and print for restaurants and cafés.",
    shortDesc: "From food packaging and waterproof menus to storefront 3D letters and aprons, create an appetizing brand experience.",
    services: ["Menus", "Food packaging", "Shop signage", "Interior graphics", "Staff uniforms", "Opening campaigns", "Gift cards and vouchers"],
    cta: "Plan Restaurant Branding"
  },
  {
    id: "retail-fashion",
    name: "Retail & Fashion",
    h1: "Create a retail brand customers recognise.",
    shortDesc: "Complete retail brand presence: illuminated signs, luxury shopping bags, hang tags, window graphics, and POS displays.",
    services: ["Shopfront signage", "Bags", "Tags", "Labels", "POS displays", "Window graphics", "Packaging", "Staff uniforms"],
    cta: "Plan Retail Branding"
  },
  {
    id: "real-estate",
    name: "Real Estate",
    h1: "Make every property presentation look professional.",
    shortDesc: "Outdoor hoardings, architectural site boards, premium project brochures, and presentation folders for luxury developments.",
    services: ["Hoardings", "Site boards", "Brochures", "Presentation folders", "Directional signage", "Vehicle branding", "Office branding"],
    cta: "Request Real Estate Print"
  },
  {
    id: "education",
    name: "Education",
    h1: "Clear, consistent communication for education brands.",
    shortDesc: "Prospectuses, certificates, campus wayfinding signage, event backdrops, and team apparel for schools, colleges and universities.",
    services: ["Prospectuses", "Certificates", "Banners", "Wayfinding", "Event branding", "Stationery", "Signage", "Uniforms"],
    cta: "Plan Education Materials"
  },
  {
    id: "healthcare-pharma",
    name: "Healthcare & Pharma",
    h1: "Professional brand communication for healthcare environments.",
    shortDesc: "Clear hygienic signage, patient folders, pharmaceutical packaging boxes, and directional wayfinding systems.",
    services: ["Reception signage", "Wayfinding", "Safety signage", "Brochures", "Packaging", "Office branding", "Vehicle graphics"],
    cta: "Request Healthcare Project"
  },
  {
    id: "corporate-banking",
    name: "Corporate & Banking",
    h1: "Consistent brand production for corporate teams.",
    shortDesc: "Enterprise stationery, high-security financial documents, branch signage standards, and executive event pavilions.",
    services: ["Corporate stationery", "Branch branding", "Reception signs", "Presentation material", "Events", "POS displays", "Multi-location rollouts"],
    cta: "Discuss a Corporate Project"
  },
  {
    id: "telecom-fmcg",
    name: "Telecom & FMCG",
    h1: "Produce campaigns at the scale your market demands.",
    shortDesc: "High-volume retail displays, outdoor billboard print, promotional packaging, and nationwide branch dispatches.",
    services: ["POS material", "Retail displays", "Outdoor graphics", "Promotional campaigns", "Packaging", "Event branding", "Nationwide dispatch"],
    cta: "Plan a Campaign"
  },
  {
    id: "events-agencies",
    name: "Events & Agencies",
    h1: "Production support for events and agencies.",
    shortDesc: "White-label print and fabrication partnership with rapid turnaround, stage backdrops, trade stalls, and VIP merchandise.",
    services: ["Backdrops", "Stalls", "Banners", "Displays", "Signage", "Giveaways", "White-label production"],
    cta: "Open a Trade Account"
  },
  {
    id: "startups-ecommerce",
    name: "Startups & E-commerce",
    h1: "Launch your product with a brand customers trust.",
    shortDesc: "Custom mailer boxes, unboxing inserts, branded stickers, and complete brand identity packages for fast-growing ventures.",
    services: ["Logo and identity", "Product boxes", "Stickers", "Mailer packaging", "Thank-you cards", "Product photography assets", "Promotional merchandise"],
    cta: "Start My Product Brand"
  }
];

// Portfolio & Case Studies (CS01 - CS07)
export const CASE_STUDIES = [
  {
    id: "monal-retail",
    slug: "monal-retail",
    title: "Monal Hospitality & Dine",
    client: "Monal Group Lahore",
    industry: "Restaurants & Cafés",
    projectType: "Full Hospitality Branding & Packaging",
    location: "Gulberg & DHA, Lahore",
    services: ["Brand Identity", "Food Packaging", "Shop Signage", "Staff Uniforms"],
    heroImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    brief: "Develop an end-to-end physical brand experience for their premium takeaway and restaurant flagship, requiring grease-resistant food packaging and bespoke 3D brass signage.",
    scope: ["Custom burger and takeout boxes", "3D illuminated brass letter facade", "Waterproof synthetic menus", "Embroidered chef coats and aprons"],
    process: ["Brand Touchpoint Audit", "CAD Signage Modeling", "Food-Grade Paper Certification", "Production & Night Installation"],
    verifiedResult: {
      timeline: "3 weeks from brief to opening",
      locations: "2 Flagship branches in Lahore",
      deliverables: "15,000 packaging units + complete facade signage",
      scope: "Turnkey Design, Fabrication & Installation"
    },
    gallery: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "chai-kapi-franchise",
    slug: "chai-kapi-franchise",
    title: "Chai Kapi Franchise System",
    client: "Chai Kapi Coffee Co.",
    industry: "Franchise & Retail",
    projectType: "Multi-Location Franchise Production Rollout",
    location: "Lahore, Islamabad, Rawalpindi",
    services: ["Franchise Rollout", "Signage & Fabrication", "Packaging Systems", "Uniforms"],
    heroImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    brief: "Standardize the brand assets and store fabrication guidelines across 14 new franchise outlets so every new city opens with zero variation in colors, materials or quality.",
    scope: ["Store branding manual", "Modular acrylic LED signs", "Kraft coffee sleeves & custom cups", "Staff polo uniforms & aprons"],
    process: ["Pilot Store in Model Town", "Dieline Standardization", "Centralized Batch Manufacturing", "Regional Dispatch & Fitting"],
    verifiedResult: {
      timeline: "60-day rapid rollout",
      locations: "14 franchise locations",
      deliverables: "Turnkey signage and packaging kits for all branches",
      scope: "Full Brand System & Ongoing Reprints"
    },
    gallery: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "indus-tech-summit",
    slug: "indus-tech-summit",
    title: "Indus Tech Expo Pavilion",
    client: "Indus Innovations",
    industry: "Events & Agencies",
    projectType: "Exhibition Stall & Event Graphics",
    location: "Expo Centre, Lahore",
    services: ["Exhibition Stalls", "Large-Format Printing", "Merchandise & Gifts"],
    heroImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    brief: "Design and build a 60 sqm two-story exhibition pavilion featuring high-resolution illuminated lightboxes, an interactive VR station, and 2,000 branded tech gift bags.",
    scope: ["Custom wooden and aluminium frame structure", "Seamless backlit fabric graphics", "Custom executive gift sets", "VIP lounge setup"],
    process: ["3D Concept & Walkthrough", "Modular Prefabrication at Factory", "Overnight Expo Centre Installation", "Live On-Site Standby"],
    verifiedResult: {
      timeline: "5 days fabrication, 24 hr installation",
      locations: "Expo Centre Lahore Hall 2",
      deliverables: "60 sqm pavilion + 2,000 delegate gift sets",
      scope: "Design, Fabrication, Dismantling"
    },
    gallery: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "zameen-urban-towers",
    slug: "zameen-urban-towers",
    title: "Zameen Urban Towers Real Estate",
    client: "Zameen Urban Developments",
    industry: "Real Estate",
    projectType: "Architectural Signage & Marketing Suites",
    location: "Main Boulevard Gulberg, Lahore",
    services: ["Signage & Fabrication", "Large-Format Printing", "Corporate Printing"],
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    brief: "Transform construction perimeter into a high-visibility marketing asset with 250 feet of illuminated site hoardings, luxury hardcover sales folios, and reception signage.",
    scope: ["250ft weather-proof hoardings", "Hardcover gold foil property portfolios", "Executive boardroom 3D stainless steel logo"],
    process: ["Wind-load Structural Engineering", "UV Sublimation Printing", "High-End Bookbinding", "Heavy Anchor Mounting"],
    verifiedResult: {
      timeline: "14 working days",
      locations: "1 Site Hoarding + Sales Center",
      deliverables: "250ft outdoor hoarding + 500 hardcover books",
      scope: "Engineering, Printing & Site Installation"
    },
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

// Verified Google Reviews (Section 11 & Section 18)
export const REVIEWS = [
  {
    id: 1,
    name: "Hamza Tariq",
    company: "Artisan Roasters Lahore",
    service: "Packaging & Coffee Bags",
    rating: 5,
    date: "August 2026",
    text: "INPRINT managed our complete packaging overhaul. The dielines were exact, the matte finish was velvety smooth, and the turn-around was faster than any other printer in Lahore. 10/10.",
    source: "Google Review"
  },
  {
    id: 2,
    name: "Dr. Ayesha Malik",
    company: "CarePoint Healthcare Clinics",
    service: "Interior Acrylic & LED Signage",
    rating: 5,
    date: "July 2026",
    text: "We needed reception signage and directional wayfinding installed before our clinic inauguration in Model Town. INPRINT's team conducted the site visit, took exact laser measurements, and completed installation with flawless wiring.",
    source: "Google Review"
  },
  {
    id: 3,
    name: "Bilal Raza",
    company: "Nexus Logistics PK",
    service: "Fleet Vehicle Branding",
    rating: 5,
    date: "September 2026",
    text: "Wrapped 8 delivery vans with high-durability reflective vinyl. Even in heavy monsoon rains and sunlight, the print colours are razor sharp. Highly recommended for corporate fleets.",
    source: "Google Review"
  },
  {
    id: 4,
    name: "Zainab Farooq",
    company: "Velvet Couture",
    service: "Luxury Shopping Bags & Tags",
    rating: 5,
    date: "June 2026",
    text: "The gold foil hot stamping on our shopping bags looks identical to luxury European fashion houses. They checked all artwork bleeds beforehand and gave us physical samples first.",
    source: "Google Review"
  },
  {
    id: 5,
    name: "Usman Ghani",
    company: "TechValley Summit",
    service: "Expo Stall & Standees",
    rating: 5,
    date: "May 2026",
    text: "From 3D concept to live expo setup at Expo Centre Lahore. Not a single wrinkle on the tension fabric backdrops and our roll-ups stood out across the hall.",
    source: "Google Review"
  }
];

// Artwork Guidelines (Section 17)
export const ARTWORK_RULES = [
  {
    number: "01",
    title: "Use CMYK Color Mode",
    rule: "Use CMYK where required.",
    description: "Convert all RGB and Pantone spot colors to CMYK to prevent unexpected color shifts during 4-color process printing. Target Fogra 39 or Coated GRACoL."
  },
  {
    number: "02",
    title: "Supply Artwork at 100% Scale",
    rule: "Supply artwork at the correct size.",
    description: "Provide files at 1:1 scale (100% final dimensions). For extreme large-format billboard files over 5 meters, supply at 1:10 scale with 300+ DPI."
  },
  {
    number: "03",
    title: "Add 3mm Required Bleed",
    rule: "Add the required bleed.",
    description: "Include a minimum 3mm bleed on all four outer edges for trimmed print, and 5mm for packaging dielines, to prevent white edges after mechanical guillotine cutting."
  },
  {
    number: "04",
    title: "Keep Content Inside Safe Margin",
    rule: "Keep important content inside the safe area.",
    description: "Keep all critical text, barcodes, and logos at least 4mm inside the trim line to prevent accidental trimming or binding truncation."
  },
  {
    number: "05",
    title: "Outline / Convert Fonts to Curves",
    rule: "Outline or embed fonts.",
    description: "Convert all typography to vector outlines (Create Outlines / Ctrl+Shift+O) or embed fonts completely in print-ready PDF/X-1a files."
  },
  {
    number: "06",
    title: "Export to Recommended File Formats",
    rule: "Export using the recommended file format.",
    description: "We accept high-resolution Press-Quality PDF, Adobe Illustrator (.AI), CorelDRAW (.CDR), PSD, and high-res TIFF. Always flatten transparencies."
  }
];

// Material Guide database
export const MATERIALS_DB = [
  {
    category: "Paper and Card",
    name: "350gsm Premium Art Card",
    bestFor: "Business cards, luxury flyers, product tags, invitations",
    appearance: "Silky, smooth, high opacity and crisp ink holdout",
    durability: "High rigidity with lamination",
    indoorOutdoor: "Indoor only",
    typicalApps: "Corporate stationery, retail swing tags, folders"
  },
  {
    category: "Paper and Card",
    name: "Virgin Kraft Board",
    bestFor: "Artisanal packaging, eco bags, coffee roasters",
    appearance: "Organic earthy brown texture with natural fiber flecks",
    durability: "Tear-resistant unbleached kraft fibers",
    indoorOutdoor: "Indoor / dry goods",
    typicalApps: "Food boxes, cosmetic cartons, gift packaging"
  },
  {
    category: "Vinyl & Films",
    name: "High-Tack Polymeric Vinyl",
    bestFor: "Vehicles, outdoor windows, shop decals, floor graphics",
    appearance: "Ultra-gloss or satin matte with gray opaque adhesive",
    durability: "3-5 years exterior UV and rain resistance",
    indoorOutdoor: "Outdoor & indoor",
    typicalApps: "Fleet branding, storefront windows, exhibition graphics"
  },
  {
    category: "Large Format Flex",
    name: "Star Korea Frontlit 320g",
    bestFor: "Roadside billboards, shop fascia banners, event backdrops",
    appearance: "Bright white matte surface minimizing harsh glare",
    durability: "High tensile strength, wind-slit ready",
    indoorOutdoor: "Heavy outdoor use",
    typicalApps: "Panna flex signs, stage backdrops, hoarding wraps"
  },
  {
    category: "Signage & Rigid",
    name: "Cast Acrylic & LED Modules",
    bestFor: "3D letter signs, illuminated reception logos, awards",
    appearance: "Crystal clear or dyed vibrant color with polished flame edge",
    durability: "10+ years non-yellowing acrylic with IP67 LEDs",
    indoorOutdoor: "Indoor & exterior weather-proof",
    typicalApps: "Retail storefront signs, clinic fascia, office logos"
  },
  {
    category: "Signage & Rigid",
    name: "Stainless Steel & Brushed Brass",
    bestFor: "Executive directory signs, bank facades, luxury boutique letters",
    appearance: "Mirror polish, brushed hairline gold, silver or rose",
    durability: "Corrosion-proof marine grade architectural metal",
    indoorOutdoor: "Severe outdoor exposure & luxury interiors",
    typicalApps: "Embassies, corporate headquarters, jewelry storefronts"
  }
];

// Templates and Dielines catalog
export const TEMPLATES_CATALOG = [
  {
    id: "temp-bc-standard",
    name: "Standard Business Card (3.5 x 2 in)",
    category: "Business Cards",
    size: "3.5\" x 2.0\" (89 x 51mm) + 3mm Bleed",
    fileFormat: "AI, PDF, CDR, PSD",
    lastUpdated: "Sept 2026",
    downloadUrl: "#download"
  },
  {
    id: "temp-fl-a5",
    name: "A5 Campaign Flyer",
    category: "Flyers",
    size: "148 x 210mm + 3mm Bleed",
    fileFormat: "AI, PDF, INDD",
    lastUpdated: "August 2026",
    downloadUrl: "#download"
  },
  {
    id: "temp-pkg-tuck",
    name: "Straight Tuck End Product Box",
    category: "Packaging",
    size: "Parametric Vector Dieline with Crease Marks",
    fileFormat: "AI, PDF, DXF",
    lastUpdated: "Sept 2026",
    downloadUrl: "#download"
  },
  {
    id: "temp-bag-med",
    name: "Medium Luxury Shopping Bag",
    category: "Bags",
    size: "10 x 14 x 4 inches with fold flaps",
    fileFormat: "AI, PDF",
    lastUpdated: "July 2026",
    downloadUrl: "#download"
  },
  {
    id: "temp-rollup-std",
    name: "Roll-Up Standee Cassette Media",
    category: "Roll-Up Banners",
    size: "800 x 2000mm (Bottom 50mm bleed)",
    fileFormat: "AI, PDF, PSD",
    lastUpdated: "August 2026",
    downloadUrl: "#download"
  },
  {
    id: "temp-sticker-circle",
    name: "Round & Custom Shape Sticker",
    category: "Labels",
    size: "2\", 3\", 4\" diameter with cut contours",
    fileFormat: "AI, EPS",
    lastUpdated: "Sept 2026",
    downloadUrl: "#download"
  }
];

// Reusable FAQ items (Section 17 & Section 6)
export const FAQS = [
  {
    category: "Ordering",
    question: "How do I place an order?",
    answer: "You can place a quick order directly through our website product pages, configure quantity and finish, upload your artwork, or place your order directly via WhatsApp with our Lahore production desk (0321 3656096)."
  },
  {
    category: "Ordering",
    question: "Can I order through WhatsApp?",
    answer: "Yes! WhatsApp is one of our primary ordering and proofing channels in Pakistan. You can send your files, discuss custom dimensions, approve digital proofs, and receive delivery updates directly at 0321 3656096."
  },
  {
    category: "Artwork",
    question: "Can you design or fix my artwork?",
    answer: "Yes. Every file submitted undergoes our Free Artwork Pre-Flight Check. If you don't have artwork, our in-house Lahore creative studio can design your branding, packaging dielines, or marketing layouts from scratch."
  },
  {
    category: "Production",
    question: "Do you offer urgent / same-day production?",
    answer: "Selected products such as roll-up banners, urgent flyers, stickers, and panna flex support same-day or 24-hour dispatch for Lahore clients when artwork is confirmed before 12:00 PM."
  },
  {
    category: "Delivery",
    question: "Can I collect from Lahore or get nationwide delivery?",
    answer: "Both! You can collect orders from our facility at M-71, Zainab Tower, Model Town Link Road, Lahore, or choose nationwide tracked door-to-door delivery across Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, and all cities in Pakistan."
  },
  {
    category: "Installation",
    question: "Do you provide on-site signage and retail installation?",
    answer: "Yes. Our fabrication and installation teams handle on-site measurements, structural welding, facade mounting, and electrical lighting hookup for shops, corporate towers, and exhibitions across Punjab and major cities."
  },
  {
    category: "Payments",
    question: "What payment methods do you accept?",
    answer: "We accept Online Bank Transfers (IBFT), JazzCash, EasyPaisa, corporate cross-cheques, and Cash on Delivery / Lahore counter collection for standard qualifying items."
  }
];

// Blog articles matching Section 17
export const BLOG_POSTS = [
  {
    id: "file-preparation-printing",
    title: "How to prepare a file for professional printing: The Complete Pre-Flight Guide",
    category: "Printing Tips",
    readTime: "6 min read",
    date: "September 2026",
    summary: "Avoid common color shifts, blurry text, and cut-off margins by setting up CMYK, bleeds, and font outlines before sending your files to the press.",
    slug: "how-to-prepare-a-file-for-professional-printing"
  },
  {
    id: "business-cards-materials",
    title: "Business cards: choosing paper, weights and finishing for maximum impression",
    category: "Branding",
    readTime: "5 min read",
    date: "August 2026",
    summary: "From 350gsm art cards to soft-touch velvet lamination and raised spot UV: how to select the exact tactile feel that reflects your company caliber.",
    slug: "business-cards-choosing-paper-and-finishing"
  },
  {
    id: "shop-signage-guide",
    title: "What to consider before ordering shop signage in Lahore",
    category: "Signage",
    readTime: "8 min read",
    date: "August 2026",
    summary: "Local municipal guidelines, sun exposure, day-vs-night visibility, and choosing between front-lit acrylic letters and halo-backlit stainless steel.",
    slug: "what-to-consider-before-ordering-shop-signage"
  },
  {
    id: "packaging-mistakes-small-biz",
    title: "Packaging design mistakes small businesses should avoid",
    category: "Packaging",
    readTime: "7 min read",
    date: "July 2026",
    summary: "Why standard stock sizes matter, moisture considerations in Pakistan's climate, and the crucial difference between outer shipping and primary unboxing.",
    slug: "packaging-design-mistakes-small-businesses-should-avoid"
  },
  {
    id: "franchise-brand-kit",
    title: "What should be included in a franchise brand kit for nationwide rollout?",
    category: "Franchise",
    readTime: "9 min read",
    date: "June 2026",
    summary: "How fast-growing brands in Pakistan prevent brand dilution when licensing new branches across Lahore, Islamabad and Karachi.",
    slug: "what-should-be-included-in-a-franchise-brand-kit"
  }
];

// Mock Order tracking data with 9 stages from Section 23
export const ORDER_STAGES = [
  "Order received",
  "Payment confirmed",
  "Artwork under review",
  "Artwork approved",
  "In production",
  "Finishing",
  "Ready for dispatch",
  "Dispatched",
  "Delivered"
];

export const SAMPLE_ORDERS = {
  "INP-8492": {
    orderNumber: "INP-8492",
    clientName: "Shahid Khan",
    company: "Apex Tech",
    product: "1,000 Business Cards + Spot UV",
    currentStageIndex: 4, // "In production"
    orderDate: "2026-09-21",
    estimatedDate: "2026-09-24",
    city: "Lahore",
    method: "Lahore Counter Pickup (Model Town)",
    artworkStatus: "Approved by client"
  },
  "INP-9021": {
    orderNumber: "INP-9021",
    clientName: "Fatima Noor",
    company: "Luxe Candles",
    product: "500 Custom Product Boxes (350gsm SBB)",
    currentStageIndex: 6, // "Ready for dispatch"
    orderDate: "2026-09-18",
    estimatedDate: "2026-09-23",
    city: "Karachi",
    method: "TCS Express Courier (Tracking: TCS-99210)",
    artworkStatus: "Approved by client"
  },
  "INP-7740": {
    orderNumber: "INP-7740",
    clientName: "Omer Sheikh",
    company: "Urban Diner",
    product: "3D LED Signage & Facade Box",
    currentStageIndex: 7, // "Dispatched"
    orderDate: "2026-09-15",
    estimatedDate: "2026-09-23",
    city: "Lahore",
    method: "INPRINT Installation Team Vehicle",
    artworkStatus: "Site Verified & Approved"
  }
};
