import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BRAND, PRODUCTS, SERVICES, SOLUTIONS, CASE_STUDIES, REVIEWS, PRODUCT_CATEGORIES 
} from '../data/inprintData';
import { 
  ArrowUpRight, ArrowRight, Search, MessageSquare, ShieldCheck, MapPin, 
  Truck, CheckCircle2, Sparkles, Star, ChevronRight, Layers, Box, Cpu, 
  Store, Phone, FileText, Check, Award, Eye
} from 'lucide-react';

export default function HomeView() {
  const { navigate, setIsSearchOpen, setSelectedProduct, setActiveCaseStudy, setSelectedServiceId } = useApp();
  const [howItWorksTab, setHowItWorksTab] = useState('quick'); // 'quick' or 'agency'
  const [heroSearchInput, setHeroSearchInput] = useState('');

  const popularProducts = PRODUCTS.slice(0, 12);

  const searchSuggestions = [
    "Business Cards",
    "Custom Boxes",
    "Shop Signage",
    "Packaging",
    "Exhibition Stalls",
    "Brand Identity",
    "Vehicle Branding",
    "Franchise Rollout"
  ];

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    if (heroSearchInput.trim()) {
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(true);
    }
  };

  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod);
    navigate('product-detail', { slug: prod.slug });
  };

  return (
    <div className="space-y-24 lg:space-y-36 pb-20 overflow-hidden">
      
      {/* =========================================================================
          H01 — Hero Section (Excited.agency Dark Futuristic Editorial Layout)
          ========================================================================= */}
      <section className="relative pt-12 lg:pt-20 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-lime-brand/10 blur-[130px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-start max-w-4xl">
          
          {/* Eyebrow badge */}
          <div className="agency-pill text-lime-brand border-lime-brand/30 mb-6 py-1 px-3.5 tracking-wider font-mono text-[11px] uppercase">
            <span className="w-2 h-2 rounded-full bg-lime-brand animate-pulse mr-1" />
            CREATIVE PRODUCTION AGENCY · LAHORE
          </div>

          {/* H1 Headline */}
          <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.08] mb-6">
            From idea to <br className="hidden sm:inline" />
            <span className="text-gradient-lime">brand launch.</span>
          </h1>

          {/* Supporting line */}
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mb-8">
            We develop brands, design campaigns, produce print and physical brand assets, and deliver complete brand experiences—from one business card to a multi-location rollout.
          </p>

          {/* Interactive Search Bar (H01 Search) */}
          <form 
            onSubmit={handleHeroSearchSubmit}
            className="w-full max-w-2xl mb-4"
          >
            <div className="relative flex items-center p-1.5 rounded-2xl bg-white/[0.05] border border-white/15 backdrop-blur-xl focus-within:border-lime-brand transition shadow-2xl">
              <Search className="w-5 h-5 text-slate-400 ml-3.5 shrink-0" />
              <input 
                type="text"
                value={heroSearchInput}
                onChange={(e) => setHeroSearchInput(e.target.value)}
                placeholder="What do you want to print, design or build?"
                className="w-full bg-transparent px-3 py-2.5 text-slate-100 placeholder-slate-400 text-sm sm:text-base focus:outline-none"
                onClick={() => setIsSearchOpen(true)}
              />
              <button 
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="px-5 py-2.5 rounded-xl btn-primary text-xs font-bold shrink-0 flex items-center gap-1.5 shadow-glow-lime"
              >
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Search Suggestions Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-10 text-xs">
            <span className="text-slate-400 text-[11px] font-mono mr-1">Popular:</span>
            {searchSuggestions.slice(0, 5).map((sugg, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsSearchOpen(true);
                }}
                className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition text-xs"
              >
                {sugg}
              </button>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate('products')}
              className="px-7 py-3.5 rounded-full btn-primary text-sm font-bold flex items-center gap-2 shadow-glow-lime"
            >
              <span>Start a Quick Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('get-a-quote')}
              className="px-7 py-3.5 rounded-full btn-secondary text-sm font-semibold flex items-center gap-2"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </button>

            <a
              href="https://wa.me/923213656096?text=Hi%20INPRINT,%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 text-emerald-400 text-sm font-medium flex items-center gap-2 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp 0321 3656096</span>
            </a>
          </div>

        </div>

        {/* Excited.agency Visual Reel / Showcase Grid Preview */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-lime-brand/40 transition group">
            <span className="text-[10px] font-mono text-lime-brand uppercase tracking-wider block mb-1">01 · Identity</span>
            <h4 className="text-sm font-bold text-white group-hover:text-lime-brand transition">Brand Systems</h4>
            <p className="text-xs text-slate-400 mt-1">Logos, visual guides & physical stationery</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-lime-brand/40 transition group">
            <span className="text-[10px] font-mono text-lime-brand uppercase tracking-wider block mb-1">02 · Packaging</span>
            <h4 className="text-sm font-bold text-white group-hover:text-lime-brand transition">Custom Cartons & Bags</h4>
            <p className="text-xs text-slate-400 mt-1">Food-safe, rigid greyboard & foil finishes</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-lime-brand/40 transition group">
            <span className="text-[10px] font-mono text-lime-brand uppercase tracking-wider block mb-1">03 · Signage</span>
            <h4 className="text-sm font-bold text-white group-hover:text-lime-brand transition">3D Letters & Facades</h4>
            <p className="text-xs text-slate-400 mt-1">Illuminated Samsung LED acrylic & steel</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-lime-brand/40 transition group">
            <span className="text-[10px] font-mono text-lime-brand uppercase tracking-wider block mb-1">04 · Rollout</span>
            <h4 className="text-sm font-bold text-white group-hover:text-lime-brand transition">Franchise Production</h4>
            <p className="text-xs text-slate-400 mt-1">Multi-location consistency across Pakistan</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          H02 — Trust Strip (Section 4)
          ========================================================================= */}
      <section className="border-y border-white/10 bg-dark-900/60 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center text-center sm:text-left">
            
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
                ★
              </div>
              <div>
                <div className="text-xs font-bold text-white font-mono">4.9 Google rating</div>
                <div className="text-[10px] text-slate-400">Verified Client Reviews</div>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-lime-brand/10 border border-lime-brand/20 flex items-center justify-center text-lime-brand shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white font-mono">Artwork support</div>
                <div className="text-[10px] text-slate-400">Checked before printing</div>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white font-mono">Lahore production</div>
                <div className="text-[10px] text-slate-400">Model Town facility</div>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white font-mono">Nationwide delivery</div>
                <div className="text-[10px] text-slate-400">TCS & cargo to all cities</div>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center justify-center sm:justify-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white font-mono">WhatsApp ordering</div>
                <div className="text-[10px] text-slate-400">Direct proofing 24/7</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          H03 — Two Customer Paths (Card A & Card B)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-lime-brand block mb-2">
            TAILORED ONBOARDING
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            How can we help you today?
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Choose the fastest route for what you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card A — Quick Print & Promo */}
          <div 
            onClick={() => navigate('products')}
            className="group relative p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/10 hover:border-lime-brand/50 transition-all duration-300 cursor-pointer shadow-glow-card flex flex-col justify-between"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="agency-pill text-xs font-mono text-lime-brand border-lime-brand/30">
                  QUICK PRINT & PROMO
                </span>
                <span className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-black group-hover:bg-lime-brand transition-all">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </div>

              <div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white group-hover:text-lime-brand transition">
                  Need something printed?
                </h3>
                <p className="text-slate-300 text-sm sm:text-base mt-2.5 leading-relaxed">
                  Choose a product, configure your order, upload your artwork and receive a clear price before production.
                </p>
              </div>

              <div className="pt-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">
                  Best for:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-lime-brand" /> Business cards
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-lime-brand" /> Flyers and brochures
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-lime-brand" /> Flex and banners
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-lime-brand" /> Stickers and labels
                  </li>
                  <li className="flex items-center gap-2 sm:col-span-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-lime-brand" /> Mugs, gifts and uniforms
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Instant online configuration</span>
              <button 
                onClick={(e) => { e.stopPropagation(); navigate('products'); }}
                className="px-6 py-2.5 rounded-full btn-primary text-xs font-bold"
              >
                Shop Products
              </button>
            </div>
          </div>

          {/* Card B — Agency & Branding Project */}
          <div 
            onClick={() => navigate('get-a-quote')}
            className="group relative p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/10 hover:border-lime-brand/50 transition-all duration-300 cursor-pointer shadow-glow-card flex flex-col justify-between"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="agency-pill text-xs font-mono text-lime-brand border-lime-brand/30">
                  AGENCY & BRANDING PROJECT
                </span>
                <span className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-black group-hover:bg-lime-brand transition-all">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </div>

              <div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white group-hover:text-lime-brand transition">
                  Building something bigger?
                </h3>
                <p className="text-slate-300 text-sm sm:text-base mt-2.5 leading-relaxed">
                  Tell us about your brand, space, campaign or rollout. We will help you plan the creative and production work.
                </p>
              </div>

              <div className="pt-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">
                  Best for:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-lime-brand" /> Brand identity
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-lime-brand" /> Shop & office branding
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-lime-brand" /> Packaging systems
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-lime-brand" /> Signage and fabrication
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-lime-brand" /> Exhibition stalls
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-lime-brand" /> Franchise rollouts
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Dedicated production producer</span>
              <button 
                onClick={(e) => { e.stopPropagation(); navigate('get-a-quote'); }}
                className="px-6 py-2.5 rounded-full btn-secondary text-xs font-bold"
              >
                Start a Project
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          H04 — Popular Products Grid (12 Items)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-lime-brand block mb-2">
              CATALOG HIGHLIGHTS
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Popular products
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Standard products with clear options, production details and online ordering.
            </p>
          </div>
          <button
            onClick={() => navigate('products')}
            className="agency-pill text-lime-brand border-lime-brand/30 self-start md:self-auto py-2 px-4"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 12 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {popularProducts.map((prod) => (
            <div
              key={prod.id}
              onClick={() => handleSelectProduct(prod)}
              className="group p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-lime-brand/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-dark-900 border border-white/5">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-dark-950/80 backdrop-blur-md text-[10px] font-mono text-slate-300 border border-white/10">
                      {prod.categoryName}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-dark-950/80 backdrop-blur-md text-[10px] font-mono text-lime-brand border border-lime-brand/20">
                      {prod.turnaround}
                    </span>
                  </div>
                </div>

                <h3 className="font-display font-bold text-base text-white group-hover:text-lime-brand transition">
                  {prod.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                  {prod.shortDesc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Starting from</span>
                  <span className="text-sm font-bold text-lime-brand font-mono">
                    Rs. {prod.basePrice.toLocaleString()}
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-300 group-hover:text-white flex items-center gap-1">
                  Configure <ChevronRight className="w-3.5 h-3.5 text-lime-brand group-hover:translate-x-1 transition" />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('products')}
            className="px-8 py-3.5 rounded-full btn-secondary text-sm font-semibold inline-flex items-center gap-2"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          H05 — What We Do (6 Service Cards)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-lime-brand block mb-2">
            INTEGRATED CAPABILITY
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            One partner for every brand touchpoint.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            We bring creative thinking and physical production together, so your brand stays consistent from the first idea to the final installation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-lime-brand/30 transition group">
            <span className="text-2xl font-mono font-bold text-lime-brand/40 group-hover:text-lime-brand transition block mb-4">
              01
            </span>
            <h3 className="font-display font-bold text-xl text-white mb-2">1. Create</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Brand identity, campaign concepts and visual direction tailored for real-world application.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-lime-brand/30 transition group">
            <span className="text-2xl font-mono font-bold text-lime-brand/40 group-hover:text-lime-brand transition block mb-4">
              02
            </span>
            <h3 className="font-display font-bold text-xl text-white mb-2">2. Design</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Print artwork, packaging dielines, architectural signage, 3D displays and digital-ready assets.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-lime-brand/30 transition group">
            <span className="text-2xl font-mono font-bold text-lime-brand/40 group-hover:text-lime-brand transition block mb-4">
              03
            </span>
            <h3 className="font-display font-bold text-xl text-white mb-2">3. Print</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Corporate stationery, marketing materials, large-format graphics and offset folding cartons.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-lime-brand/30 transition group">
            <span className="text-2xl font-mono font-bold text-lime-brand/40 group-hover:text-lime-brand transition block mb-4">
              04
            </span>
            <h3 className="font-display font-bold text-xl text-white mb-2">4. Fabricate</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Signage, acrylic, metal, retail display units, counters and exhibition stall structures.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-lime-brand/30 transition group">
            <span className="text-2xl font-mono font-bold text-lime-brand/40 group-hover:text-lime-brand transition block mb-4">
              05
            </span>
            <h3 className="font-display font-bold text-xl text-white mb-2">5. Install</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Site branding, illuminated signage installation, store displays and provincial rollout support.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-lime-brand/30 transition group">
            <span className="text-2xl font-mono font-bold text-lime-brand/40 group-hover:text-lime-brand transition block mb-4">
              06
            </span>
            <h3 className="font-display font-bold text-xl text-white mb-2">6. Deliver</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Lahore facility pickup, fast local delivery and nationwide tracked courier dispatch across Pakistan.
            </p>
          </div>

        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('services')}
            className="agency-pill text-lime-brand border-lime-brand/30 py-2 px-5"
          >
            <span>Explore Our Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          H06 — Solutions (10 Solution Cards)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-lime-brand block mb-2">
            GOAL-BASED PRODUCTION
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            What are you looking to do?
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Start with your goal. We will recommend the right products, services and production path.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SOLUTIONS.map((sol, idx) => (
            <div
              key={sol.id}
              onClick={() => navigate('solutions', { solutionId: sol.id })}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-lime-brand/40 hover:bg-white/[0.05] transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-mono text-slate-400 group-hover:text-lime-brand transition">
                  Goal 0{idx + 1}
                </span>
                <h3 className="font-display font-bold text-base text-white group-hover:text-lime-brand transition mt-1.5 mb-2">
                  {sol.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {sol.shortDesc}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 group-hover:text-white">
                <span className="text-[11px] font-semibold">{sol.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 text-lime-brand group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          H07 — Featured Work (Portfolio Cards with Case Study Trigger)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-lime-brand block mb-2">
              REAL-WORLD PROOF
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Work that exists in the real world.
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              See how ideas become physical brand experiences.
            </p>
          </div>
          <button
            onClick={() => navigate('our-work')}
            className="agency-pill text-lime-brand border-lime-brand/30 self-start md:self-auto py-2 px-4"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Excited.agency Large Aspect Case Study Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              onClick={() => {
                setActiveCaseStudy(study);
              }}
              className="group relative rounded-3xl overflow-hidden bg-dark-900 border border-white/10 hover:border-lime-brand/50 transition-all duration-300 cursor-pointer shadow-2xl flex flex-col justify-between"
            >
              {/* Media banner */}
              <div className="relative aspect-[16/10] overflow-hidden bg-dark-950">
                <img
                  src={study.heroImage}
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="agency-pill bg-dark-950/90 text-slate-200 border-white/15 text-[11px]">
                    {study.industry}
                  </span>
                  <span className="agency-pill bg-dark-950/90 text-lime-brand border-lime-brand/30 text-[11px]">
                    {study.location}
                  </span>
                </div>
              </div>

              {/* Information bottom */}
              <div className="p-6 sm:p-8 space-y-4">
                <div>
                  <h3 className="font-display font-black text-2xl text-white group-hover:text-lime-brand transition">
                    {study.title}
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 line-clamp-2">
                    {study.brief}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {study.services.map((srv, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                      {srv}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">{study.verifiedResult.timeline}</span>
                  <span className="text-lime-brand font-bold flex items-center gap-1 group-hover:underline">
                    View Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('our-work')}
            className="px-8 py-3.5 rounded-full btn-secondary text-sm font-semibold inline-flex items-center gap-2"
          >
            <span>View Our Work</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          H08 — Franchise and Multi-Location CTA (Section 4 & Section 11)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-white/[0.07] via-dark-900 to-dark-950 border border-white/15 overflow-hidden shadow-2xl">
          {/* Decorative neon ambient accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-lime-brand/10 blur-[100px] pointer-events-none rounded-full" />
          
          <div className="relative z-10 max-w-3xl">
            <span className="agency-pill text-lime-brand border-lime-brand/30 text-[11px] font-mono uppercase mb-4">
              MULTIPLE BRANCHES · ONE STANDARD
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-4">
              One brand. Many locations. <br className="hidden sm:inline" />
              <span className="text-gradient-lime">One production partner.</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              We help growing businesses create the identity, packaging, signage and production standards needed to open consistently across multiple locations in Lahore, Islamabad, Karachi and nationwide.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 text-xs font-mono text-slate-300">
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5">
                <Check className="w-4 h-4 text-lime-brand mb-1" />
                Brand identity system
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5">
                <Check className="w-4 h-4 text-lime-brand mb-1" />
                Store branding standards
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5">
                <Check className="w-4 h-4 text-lime-brand mb-1" />
                Signage specifications
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5">
                <Check className="w-4 h-4 text-lime-brand mb-1" />
                Packaging templates
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5">
                <Check className="w-4 h-4 text-lime-brand mb-1" />
                Production artwork
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5">
                <Check className="w-4 h-4 text-lime-brand mb-1" />
                Installation instructions
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5">
                <Check className="w-4 h-4 text-lime-brand mb-1" />
                Multi-location coordination
              </div>
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5">
                <Check className="w-4 h-4 text-lime-brand mb-1" />
                Brand asset library
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('franchise')}
                className="px-7 py-3.5 rounded-full btn-primary text-xs sm:text-sm font-bold shadow-glow-lime flex items-center gap-2"
              >
                <span>Book a Franchise Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('services', { serviceId: 'franchise-rollout' })}
                className="px-6 py-3.5 rounded-full btn-secondary text-xs sm:text-sm font-semibold"
              >
                View Franchise Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          H09 — Production Capabilities (6 Cards)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-lime-brand block mb-2">
            FACTORY & STUDIO DEPTH
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Creative thinking backed by production capability.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Design is only useful when it can be produced accurately, consistently and on time. Our process connects creative development with physical production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-lime-brand/30 transition">
            <h3 className="font-display font-bold text-lg text-white mb-2">Design</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Brand identity, artwork, packaging dielines, campaign design and 3D architectural visualisation.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-lime-brand/30 transition">
            <h3 className="font-display font-bold text-lg text-white mb-2">Print</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Corporate print, high-speed digital print, Heidelberg offset print and large-format graphics.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-lime-brand/30 transition">
            <h3 className="font-display font-bold text-lg text-white mb-2">Fabrication</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Signage, acrylic routing, metal laser cutting, retail displays, counters and exhibition structures.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-lime-brand/30 transition">
            <h3 className="font-display font-bold text-lg text-white mb-2">Finishing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Guillotine cutting, rigid mounting, soft-touch lamination, die-cutting, foil stamping and binding.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-lime-brand/30 transition">
            <h3 className="font-display font-bold text-lg text-white mb-2">Installation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Site facade signage, retail store branding, corporate office branding and event setup crews.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-lime-brand/30 transition">
            <h3 className="font-display font-bold text-lg text-white mb-2">Delivery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Lahore pickup, dedicated local logistics delivery and nationwide tracked courier dispatch.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('services')}
            className="agency-pill text-lime-brand border-lime-brand/30 py-2 px-5"
          >
            <span>See How We Work</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          H10 — How It Works (Toggle A: Quick Order vs Toggle B: Agency Project)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-lime-brand block mb-2">
            STEP-BY-STEP PROCESS
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            How it works
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Predictable, transparent steps whether you need 100 business cards or a complete store buildout.
          </p>

          {/* Interactive Toggle Switch */}
          <div className="mt-6 p-1 rounded-full bg-white/5 border border-white/10 flex items-center">
            <button
              onClick={() => setHowItWorksTab('quick')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition ${
                howItWorksTab === 'quick'
                  ? 'bg-lime-brand text-black shadow-glow-lime'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Toggle A: Quick Order
            </button>
            <button
              onClick={() => setHowItWorksTab('agency')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition ${
                howItWorksTab === 'agency'
                  ? 'bg-lime-brand text-black shadow-glow-lime'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Toggle B: Agency Project
            </button>
          </div>
        </div>

        {/* 4 Steps Grid */}
        {howItWorksTab === 'quick' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <span className="w-8 h-8 rounded-full bg-lime-brand/10 border border-lime-brand/30 flex items-center justify-center text-xs font-mono font-bold text-lime-brand">
                1
              </span>
              <h3 className="font-display font-bold text-base text-white">Choose a product</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Select quantity, material, size and finish with live instant pricing.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <span className="w-8 h-8 rounded-full bg-lime-brand/10 border border-lime-brand/30 flex items-center justify-center text-xs font-mono font-bold text-lime-brand">
                2
              </span>
              <h3 className="font-display font-bold text-base text-white">Upload your artwork</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Send a print-ready file or request in-house design support from Lahore.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <span className="w-8 h-8 rounded-full bg-lime-brand/10 border border-lime-brand/30 flex items-center justify-center text-xs font-mono font-bold text-lime-brand">
                3
              </span>
              <h3 className="font-display font-bold text-base text-white">Approve the details</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Review the digital proof, price and production timeline before press run.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <span className="w-8 h-8 rounded-full bg-lime-brand/10 border border-lime-brand/30 flex items-center justify-center text-xs font-mono font-bold text-lime-brand">
                4
              </span>
              <h3 className="font-display font-bold text-base text-white">Receive your order</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Collect in Model Town, receive courier delivery or arrange site installation.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <span className="w-8 h-8 rounded-full bg-lime-brand/10 border border-lime-brand/30 flex items-center justify-center text-xs font-mono font-bold text-lime-brand">
                1
              </span>
              <h3 className="font-display font-bold text-base text-white">Tell us the idea</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Share your business, space, campaign or rollout requirements via brief builder.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <span className="w-8 h-8 rounded-full bg-lime-brand/10 border border-lime-brand/30 flex items-center justify-center text-xs font-mono font-bold text-lime-brand">
                2
              </span>
              <h3 className="font-display font-bold text-base text-white">Develop the direction</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We prepare a creative direction, material scope and scheduled production plan.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <span className="w-8 h-8 rounded-full bg-lime-brand/10 border border-lime-brand/30 flex items-center justify-center text-xs font-mono font-bold text-lime-brand">
                3
              </span>
              <h3 className="font-display font-bold text-base text-white">Approve the design</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                You review the concept, physical samples, and CAD specs before fabrication.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <span className="w-8 h-8 rounded-full bg-lime-brand/10 border border-lime-brand/30 flex items-center justify-center text-xs font-mono font-bold text-lime-brand">
                4
              </span>
              <h3 className="font-display font-bold text-base text-white">Produce and deliver</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We print, fabricate, mount on-site or dispatch the complete brand assets.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* =========================================================================
          H11 — Reviews (Section 4 & Section 18)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-amber-400 text-sm">★★★★★</div>
              <span className="text-xs font-mono text-lime-brand">★ 4.9 on Google</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Trusted by businesses that need the work done properly.
            </h2>
          </div>
          <button
            onClick={() => navigate('reviews')}
            className="agency-pill text-lime-brand border-lime-brand/30 self-start md:self-auto py-2 px-4"
          >
            <span>Read Google Reviews</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 text-xs">★★★★★</div>
                  <span className="text-[10px] font-mono text-slate-400">{rev.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{rev.name}</h4>
                  <div className="text-[11px] text-slate-400">{rev.company}</div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                  {rev.service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          H12 — Final CTA
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-lime-brand/10 via-white/[0.04] to-dark-900 border border-white/15 text-center max-w-4xl mx-auto space-y-6">
          <span className="agency-pill text-lime-brand border-lime-brand/30 text-[11px] font-mono uppercase">
            LET'S BUILD TOGETHER
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Have a project in mind?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Send us the details. We will help you decide what to design, produce and deliver next.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('get-a-quote')}
              className="px-8 py-3.5 rounded-full btn-primary text-sm font-bold shadow-glow-lime flex items-center gap-2"
            >
              <span>Get a Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href="https://wa.me/923213656096?text=Hi%20INPRINT,%20I%20have%20a%20project%20in%20mind."
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-sm font-semibold flex items-center gap-2 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp INPRINT</span>
            </a>

            <a
              href="tel:03213656096"
              className="px-6 py-3.5 rounded-full btn-secondary text-sm font-semibold flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-lime-brand" />
              <span>Call 0321 3656096</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
