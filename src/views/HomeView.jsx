import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BRAND, PRODUCTS, SERVICES, SOLUTIONS, CASE_STUDIES, REVIEWS, PRODUCT_CATEGORIES 
} from '../data/inprintData';
import { 
  ArrowUpRight, ArrowRight, Play, Sparkles, CheckCircle2, ShieldCheck, 
  MapPin, Truck, Phone, MessageSquare, ChevronRight, Eye, Layers, 
  Box, Award, Star, Compass, Check, ExternalLink, Zap
} from 'lucide-react';

export default function HomeView() {
  const { navigate, setIsSearchOpen, setSelectedProduct, setActiveCaseStudy, setSelectedServiceId } = useApp();

  // 3D Stage interactive simulation state
  const [activeFinish, setActiveFinish] = useState('gold-foil'); // 'gold-foil', 'spot-uv', 'emboss', 'acrylic-led'
  const [lightingMode, setLightingMode] = useState('halo-warm'); // 'halo-warm', 'frontlit-white', 'neon-amber'
  const [isStagePlaying, setIsStagePlaying] = useState(false);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const handleSelectProject = (study) => {
    setActiveCaseStudy(study);
  };

  return (
    <div className="bg-black text-white overflow-hidden">
      
      {/* =========================================================================
          HERO SECTION (Deep Black — Excited.agency Iconic Layout)
          ========================================================================= */}
      <section className="relative pt-12 sm:pt-20 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="max-w-5xl">
          
          {/* Main Huge Editorial Headline */}
          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.08] mb-6">
            Designing physical brand assets that are easy to love, <br className="hidden sm:inline" />
            <span className="text-white">hard to ignore</span>
          </h1>

          {/* Subheading with signature Excited-style pill badge */}
          <div className="flex flex-wrap items-center gap-2 text-base sm:text-xl text-neutral-300 font-normal leading-relaxed mb-8">
            <span>Brand Identity, Packaging Systems and 3D Signage that</span>
            <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-excited-coral text-white font-mono text-xs sm:text-sm font-bold tracking-wide shadow-glow-coral">
              delivers 🇵🇰
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-14">
            <button
              onClick={() => navigate('our-work')}
              className="px-7 py-3 rounded-full btn-pill-white text-xs sm:text-sm font-bold flex items-center gap-2"
            >
              <span>View our works</span>
            </button>

            <button
              onClick={() => {
                const stage = document.getElementById('fabrication-stage');
                if (stage) stage.scrollIntoView({ behavior: 'smooth' });
                setIsStagePlaying(!isStagePlaying);
              }}
              className="px-6 py-3 rounded-full btn-pill-dark text-xs sm:text-sm flex items-center gap-2 text-neutral-200"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Watch showreel</span>
            </button>
          </div>

        </div>

        {/* =========================================================================
            3D HERO CENTERPIECE: Interactive Brand Fabrication Stage
            (Replicating the iconic laptop/viewport frame in the screenshot)
            ========================================================================= */}
        <div 
          id="fabrication-stage"
          className="relative rounded-[32px] sm:rounded-[40px] bg-[#0E0F12] border border-white/10 p-4 sm:p-8 shadow-2xl overflow-hidden"
        >
          {/* Top Stage Bar */}
          <div className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-white/10 gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-excited-coral animate-pulse" />
              <span className="text-white font-bold">INPRINT Interactive Fabrication Lab</span>
              <span className="text-neutral-500 hidden sm:inline">· Model Town Studio, Lahore</span>
            </div>

            {/* Interactive Mode Selectors */}
            <div className="flex items-center gap-1.5 bg-black/60 p-1 rounded-full border border-white/10">
              <button
                onClick={() => setActiveFinish('gold-foil')}
                className={`px-3 py-1 rounded-full text-[11px] transition ${activeFinish === 'gold-foil' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
              >
                Gold Foil Stamping
              </button>
              <button
                onClick={() => setActiveFinish('spot-uv')}
                className={`px-3 py-1 rounded-full text-[11px] transition ${activeFinish === 'spot-uv' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
              >
                Raised Spot UV
              </button>
              <button
                onClick={() => setActiveFinish('acrylic-led')}
                className={`px-3 py-1 rounded-full text-[11px] transition ${activeFinish === 'acrylic-led' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}
              >
                3D Halo LED
              </button>
            </div>
          </div>

          {/* Main Visual Display inside Device Frame */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#181A20] via-[#101217] to-[#0A0B0E] border border-white/10 flex items-center justify-center p-6 text-center">
            
            {/* Dynamic visual ambient lighting */}
            <div 
              className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                activeFinish === 'gold-foil' ? 'bg-amber-400/10' : activeFinish === 'acrylic-led' ? 'bg-excited-coral/15' : 'bg-cyan-400/10'
              }`} 
            />

            {/* 3D Dimensional Composition */}
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="pill-badge pill-badge-dark font-mono text-[11px] text-neutral-300">
                {activeFinish === 'gold-foil' ? '✦ 24K Hot Stamping Die · Kurz German Foil' : activeFinish === 'spot-uv' ? '✦ Polymer Screen Gloss · UV Cure 395nm' : '✦ 10mm Cast Acrylic · IP67 Samsung LED Module'}
              </span>

              <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight drop-shadow-2xl">
                {activeFinish === 'acrylic-led' ? (
                  <span className="text-white drop-shadow-[0_0_35px_rgba(255,69,58,0.7)]">
                    INPRINT<span className="text-excited-coral">!</span> SIGNAGE
                  </span>
                ) : activeFinish === 'gold-foil' ? (
                  <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-100 bg-clip-text text-transparent">
                    LUXURY FOIL EMBELLISHMENT
                  </span>
                ) : (
                  <span className="text-white">
                    VELVET SOFT-TOUCH & SPOT UV
                  </span>
                )}
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 font-normal max-w-lg mx-auto">
                Getting your brand presence on the right track with precision die-cutting, architectural fabrication, and verified offset standards.
              </p>

              {/* Action buttons inside stage */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => navigate('products')}
                  className="px-5 py-2 rounded-full btn-pill-white text-xs font-bold"
                >
                  Configure This Finish
                </button>
                <button
                  onClick={() => navigate('material-guide')}
                  className="px-4 py-2 rounded-full btn-pill-dark text-xs"
                >
                  Inspect Material Specs
                </button>
              </div>
            </div>

            {/* Stage bottom technical badges */}
            <div className="absolute bottom-4 left-6 right-6 hidden md:flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span>Heidelberg Speedmaster 5C</span>
              <span>Fogra 39 CMYK Match</span>
              <span>Model Town Fabrication Unit M-71</span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 1: PURE WHITE CANVAS SHEET (Featured Projects)
          (Exact visual translation of Excited.agency screenshot Section 2)
          ========================================================================= */}
      <section className="sheet-white -mt-8 sm:-mt-12 relative z-10 pt-16 sm:pt-24 pb-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-black tracking-tight">
                Featured projects
              </h2>
            </div>
          </div>

          {/* 2-Column Grid of High-Impact Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Vibrant Yellow Background (like Me app in screenshot!) */}
            <div 
              onClick={() => handleSelectProject(CASE_STUDIES[0])}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-[#F9C922] p-8 sm:p-10 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5 shadow-xl"
            >
              <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-amber-400/20 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
                  alt="Monal Hospitality"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-black/70">
                  <span className="w-2 h-2 rounded-full bg-black" />
                  <span>Monal Hospitality</span>
                  <span>·</span>
                  <span>Lahore, Pakistan</span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-black tracking-tight leading-tight group-hover:opacity-80 transition">
                  Designing an unboxing & dining packaging system for Pakistan's premier hospitality group
                </h3>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {['Food Packaging', 'Signage', 'Hospitality', 'B2C', 'Custom Dielines'].map((tag, i) => (
                    <span key={i} className="pill-badge bg-black/10 text-black text-[11px] font-mono">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3 text-xs font-mono font-bold text-black flex items-center gap-1 group-hover:underline">
                  View case study <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Card 2: Deep Dark Cyan/Marine Background (like Aceplace in screenshot!) */}
            <div 
              onClick={() => handleSelectProject(CASE_STUDIES[1])}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-[#0C353F] text-white p-8 sm:p-10 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5 shadow-xl"
            >
              <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-black/30 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80"
                  alt="Chai Kapi Franchise"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Chai Kapi Coffee Co.</span>
                  <span>·</span>
                  <span>Lahore, Islamabad, Rawalpindi</span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-tight group-hover:text-cyan-200 transition">
                  14-Location franchise store branding, modular acrylic signage and packaging rollout
                </h3>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {['Franchise Rollout', '3D Signage', 'Store Guidelines', 'Packaging'].map((tag, i) => (
                    <span key={i} className="pill-badge bg-white/10 text-white text-[11px] font-mono">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3 text-xs font-mono font-bold text-cyan-300 flex items-center gap-1 group-hover:underline">
                  View case study <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Card 3: Deep Dark Card with Lanyards & Badges (like AppLinks in screenshot!) */}
            <div 
              onClick={() => handleSelectProject(CASE_STUDIES[2])}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-[#111215] text-white p-8 sm:p-10 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5 shadow-xl border border-white/5"
            >
              <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-black/40 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"
                  alt="Indus Tech Summit"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-excited-coral">
                  <span className="w-2 h-2 rounded-full bg-excited-coral" />
                  <span>Indus Tech Expo</span>
                  <span>·</span>
                  <span>Expo Centre, Lahore</span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-tight group-hover:text-neutral-200 transition">
                  60 sqm double-deck exhibition pavilion, backlit tension fabrics and 2,000 delegate gift sets
                </h3>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {['Exhibition Stalls', 'Backdrops', 'Corporate Gifts', 'Events'].map((tag, i) => (
                    <span key={i} className="pill-badge bg-white/10 text-white text-[11px] font-mono">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3 text-xs font-mono font-bold text-excited-coral flex items-center gap-1 group-hover:underline">
                  View case study <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Card 4: Light Cool Gray/Zinc Card (like ClubReady in screenshot!) */}
            <div 
              onClick={() => handleSelectProject(CASE_STUDIES[3])}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-[#EAECEF] text-black p-8 sm:p-10 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5 shadow-xl"
            >
              <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-white shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                  alt="Zameen Urban Towers"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-600">
                  <span className="w-2 h-2 rounded-full bg-black" />
                  <span>Zameen Urban Towers</span>
                  <span>·</span>
                  <span>Main Boulevard Gulberg</span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-black tracking-tight leading-tight group-hover:opacity-80 transition">
                  Architectural facade signage, 250ft outdoor weather-proof hoardings and sales folios
                </h3>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {['Real Estate', 'Large Format', 'Architectural Signs', 'Hardcover Folios'].map((tag, i) => (
                    <span key={i} className="pill-badge bg-black/10 text-black text-[11px] font-mono">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3 text-xs font-mono font-bold text-black flex items-center gap-1 group-hover:underline">
                  View case study <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

          </div>

          {/* Centered Pill Button */}
          <div className="pt-8 text-center">
            <button
              onClick={() => navigate('our-work')}
              className="px-8 py-3.5 rounded-full border border-black/20 text-black text-xs sm:text-sm font-bold hover:bg-black hover:text-white transition"
            >
              View all projects
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: DEEP BLACK CANVAS (Awards and Recognition)
          (Exact visual translation of Excited.agency screenshot Section 3)
          ========================================================================= */}
      <section className="sheet-black -mt-8 sm:-mt-12 relative z-20 pt-20 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Top Row Title & Narrative */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
                Awards and recognition
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                We bring physical brand touchpoints to a whole new standard. The verified metrics and client trust below are proof.
              </p>
            </div>

            <button
              onClick={() => navigate('reviews')}
              className="text-xs font-mono text-neutral-400 hover:text-white transition self-start md:self-auto"
            >
              Explore all metrics & certifications →
            </button>
          </div>

          {/* 8 Minimalist Dark Cards Grid (Exact Excited format) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
            
            <div className="p-6 rounded-2xl bg-[#111216] border border-white/10 hover:border-white/20 transition space-y-3">
              <div className="text-neutral-500 text-[10px] uppercase tracking-wider">Google Business</div>
              <div className="font-display font-extrabold text-2xl text-white">★ 4.9 Rating</div>
              <div className="text-neutral-400 text-[11px] font-sans">Verified client reviews across Lahore and Pakistan</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#111216] border border-white/10 hover:border-white/20 transition space-y-3">
              <div className="text-neutral-500 text-[10px] uppercase tracking-wider">Production Scope</div>
              <div className="font-display font-extrabold text-2xl text-white">60+ Categories</div>
              <div className="text-neutral-400 text-[11px] font-sans">Print, packaging, signage, retail & apparel under one roof</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#111216] border border-white/10 hover:border-white/20 transition space-y-3">
              <div className="text-neutral-500 text-[10px] uppercase tracking-wider">On-Time Reliability</div>
              <div className="font-display font-extrabold text-2xl text-white">99.2% Dispatch</div>
              <div className="text-neutral-400 text-[11px] font-sans">Guaranteed 24-48hr turnaround for standard print lines</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#111216] border border-white/10 hover:border-white/20 transition space-y-3">
              <div className="text-neutral-500 text-[10px] uppercase tracking-wider">Pre-Press Rigor</div>
              <div className="font-display font-extrabold text-2xl text-white">100% Pre-Flight</div>
              <div className="text-neutral-400 text-[11px] font-sans">Free pre-press check: bleeds, CMYK curve and vector proofing</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#111216] border border-white/10 hover:border-white/20 transition space-y-3">
              <div className="text-neutral-500 text-[10px] uppercase tracking-wider">Franchise Scale</div>
              <div className="font-display font-extrabold text-2xl text-white">14+ Cities</div>
              <div className="text-neutral-400 text-[11px] font-sans">Multi-location store rollouts delivered with unified brand SLA</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#111216] border border-white/10 hover:border-white/20 transition space-y-3">
              <div className="text-neutral-500 text-[10px] uppercase tracking-wider">Substrate Quality</div>
              <div className="font-display font-extrabold text-2xl text-white">ISO Certified</div>
              <div className="text-neutral-400 text-[11px] font-sans">Food-safe packaging boards, cast acrylic and UV exterior films</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#111216] border border-white/10 hover:border-white/20 transition space-y-3">
              <div className="text-neutral-500 text-[10px] uppercase tracking-wider">Site Engineering</div>
              <div className="font-display font-extrabold text-2xl text-white">500+ Signages</div>
              <div className="text-neutral-400 text-[11px] font-sans">On-site laser surveys, structural fabrication and mounting</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#111216] border border-white/10 hover:border-white/20 transition space-y-3">
              <div className="text-neutral-500 text-[10px] uppercase tracking-wider">Trade Partners</div>
              <div className="font-display font-extrabold text-2xl text-white">80+ Agencies</div>
              <div className="text-neutral-400 text-[11px] font-sans">Dedicated white-label production back-office for studios</div>
            </div>

          </div>

          {/* Callout Strip (Matching Excited.agency's callout bar in screenshot!) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#111216] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-excited-coral animate-pulse" />
              <span className="text-sm sm:text-base font-bold text-white font-sans">
                Not sure what you need? Let's talk.
              </span>
            </div>
            <button
              onClick={() => navigate('get-a-quote')}
              className="px-6 py-2.5 rounded-full btn-pill-white text-xs font-bold"
            >
              Contact us
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: PURE WHITE CANVAS SHEET (Services & Approach)
          (Exact visual translation of Excited.agency screenshot Section 4)
          ========================================================================= */}
      <section className="sheet-white -mt-8 sm:-mt-12 relative z-30 pt-20 pb-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Top Row: Label Left, Big Narrative Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                Services & approach
              </span>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <p className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-black tracking-tight leading-snug">
                We're more than just print order takers. We immerse ourselves in your brand physical touchpoints to help create brand assets customers touch, carry, and admire. This approach results in tangible brand elements that handle half your marketing, build customer trust, and make physical finish your competitive edge.
              </p>
              <button
                onClick={() => navigate('services')}
                className="px-6 py-2.5 rounded-full border border-black/20 text-black text-xs font-bold hover:bg-black hover:text-white transition"
              >
                Learn more
              </button>
            </div>
          </div>

          {/* 3 Pillar Cards (Exact Excited layout: Product Design / Web / Branding) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1: Print & Packaging */}
            <div className="p-8 rounded-3xl bg-[#F6F7F9] border border-black/5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="font-display font-black text-2xl text-black">
                  Print & Packaging
                </h3>

                <div className="flex flex-wrap gap-1.5">
                  {['Business Essentials', 'Packaging Systems', 'Luxury Boxes', 'Food Cartons', 'Shopping Bags', 'Stickers & Labels', 'Dielines'].map((tag, i) => (
                    <span key={i} className="pill-badge bg-white text-neutral-700 text-[10px] font-mono border border-black/5">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Dieline wireframe illustration */}
                <div className="h-32 rounded-2xl bg-white/70 border border-black/5 p-4 flex items-center justify-center">
                  <div className="w-24 h-20 border-2 border-dashed border-black/20 rounded-lg flex items-center justify-center text-neutral-400 font-mono text-[9px]">
                    STRUCTURAL DIELINE
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                Whether you're printing 100 executive business cards or 50,000 retail folding cartons, we ensure millimeter accuracy from die-cutting to velvety lamination.
              </p>
            </div>

            {/* Pillar 2: Signage & Fabrication */}
            <div className="p-8 rounded-3xl bg-[#F6F7F9] border border-black/5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="font-display font-black text-2xl text-black">
                  Signage & Fabrication
                </h3>

                <div className="flex flex-wrap gap-1.5">
                  {['3D Channel Letters', 'Halo LED Backlit', 'Acrylic Signage', 'Metal Laser Cut', 'Panna Flex', 'Lightboxes', 'Site Installation'].map((tag, i) => (
                    <span key={i} className="pill-badge bg-white text-neutral-700 text-[10px] font-mono border border-black/5">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 3D Signage wireframe illustration */}
                <div className="h-32 rounded-2xl bg-white/70 border border-black/5 p-4 flex items-center justify-center">
                  <div className="font-display font-black text-3xl tracking-wider text-black/20">
                    3D LED
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                From reception walls to highway visibility, we fabricate illuminated architectural signage engineered to withstand Lahore's intense summer sun and monsoon rains.
              </p>
            </div>

            {/* Pillar 3: Brand Spaces & Franchise */}
            <div className="p-8 rounded-3xl bg-[#F6F7F9] border border-black/5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="font-display font-black text-2xl text-black">
                  Spaces & Franchise Rollout
                </h3>

                <div className="flex flex-wrap gap-1.5">
                  {['Exhibition Stalls', 'Storefront Standards', 'Franchise Manuals', 'Staff Uniforms', 'Executive Gift Sets', 'Trade Accounts'].map((tag, i) => (
                    <span key={i} className="pill-badge bg-white text-neutral-700 text-[10px] font-mono border border-black/5">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Floorplan wireframe illustration */}
                <div className="h-32 rounded-2xl bg-white/70 border border-black/5 p-4 flex items-center justify-center">
                  <div className="w-28 h-20 border border-black/20 rounded grid grid-cols-2 p-1 gap-1">
                    <div className="border border-dashed border-black/20" />
                    <div className="border border-dashed border-black/20" />
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                Multi-location consistency across Pakistan. We build turnkey branch guidelines and fabricate standardized store assets for rapid scale without quality drift.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: DEEP BLACK CANVAS (What Our Clients Say)
          (Exact visual translation of Excited.agency screenshot Section 5)
          ========================================================================= */}
      <section className="sheet-black -mt-8 sm:-mt-12 relative z-40 pt-20 pb-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex items-center justify-between">
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
              What our clients say
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveReviewIndex((prev) => (prev > 0 ? prev - 1 : REVIEWS.length - 1))}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition"
              >
                ←
              </button>
              <button
                onClick={() => setActiveReviewIndex((prev) => (prev < REVIEWS.length - 1 ? prev + 1 : 0))}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition"
              >
                →
              </button>
            </div>
          </div>

          {/* Testimonial Cards Carousel Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.slice(0, 2).map((rev) => (
              <div key={rev.id} className="p-8 rounded-3xl bg-[#111216] border border-white/10 space-y-6 flex flex-col justify-between">
                <p className="font-sans text-base sm:text-lg text-neutral-200 leading-relaxed">
                  "{rev.text}"
                </p>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                      {rev.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white font-sans">{rev.name}</div>
                      <div className="text-xs text-neutral-400 font-mono">{rev.company}</div>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-neutral-400">
                    {rev.service}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Callout Strip (Matching Excited.agency in screenshot!) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#111216] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-excited-coral animate-pulse" />
              <span className="text-sm sm:text-base font-bold text-white font-sans">
                Looking for help defining what you need?
              </span>
            </div>
            <button
              onClick={() => navigate('get-a-quote')}
              className="px-6 py-2.5 rounded-full btn-pill-white text-xs font-bold"
            >
              Contact us
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: PURE WHITE CANVAS SHEET (Our News & Articles)
          (Exact visual translation of Excited.agency screenshot Section 6)
          ========================================================================= */}
      <section className="sheet-white -mt-8 sm:-mt-12 relative z-50 pt-20 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <h2 className="font-display font-black text-3xl sm:text-5xl text-black tracking-tight">
            Our news and articles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Article 1 */}
            <div 
              onClick={() => navigate('blog')}
              className="group cursor-pointer rounded-3xl p-6 bg-[#F6F7F9] border border-black/5 hover:shadow-xl transition-all space-y-4"
            >
              <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-[#0A0A0C] p-6 flex items-center justify-center text-white relative">
                <div className="w-16 h-16 rounded-2xl bg-excited-coral flex items-center justify-center text-white shadow-glow-coral">
                  <Box className="w-8 h-8" />
                </div>
              </div>

              <div className="text-xs font-mono text-neutral-500">
                September 9, 2026 · 6 min read
              </div>

              <h3 className="font-display font-bold text-lg text-black group-hover:text-excited-coral transition leading-snug">
                How to prepare a file for professional printing: The Complete Pre-Flight Guide
              </h3>

              <div className="flex gap-2 pt-2">
                <span className="pill-badge bg-white text-neutral-600 text-[10px] font-mono">
                  Printing Tips
                </span>
                <span className="pill-badge bg-white text-neutral-600 text-[10px] font-mono">
                  Pre-Press
                </span>
              </div>
            </div>

            {/* Article 2 */}
            <div 
              onClick={() => navigate('blog')}
              className="group cursor-pointer rounded-3xl p-6 bg-[#F6F7F9] border border-black/5 hover:shadow-xl transition-all space-y-4"
            >
              <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-[#0A0A0C] p-6 flex items-center justify-center text-white relative">
                <div className="w-16 h-16 rounded-2xl bg-excited-coral flex items-center justify-center text-white shadow-glow-coral">
                  <Layers className="w-8 h-8" />
                </div>
              </div>

              <div className="text-xs font-mono text-neutral-500">
                September 7, 2026 · 8 min read
              </div>

              <h3 className="font-display font-bold text-lg text-black group-hover:text-excited-coral transition leading-snug">
                What to consider before ordering shop signage in Lahore: Municipal & Weather Realities
              </h3>

              <div className="flex gap-2 pt-2">
                <span className="pill-badge bg-white text-neutral-600 text-[10px] font-mono">
                  Signage
                </span>
                <span className="pill-badge bg-white text-neutral-600 text-[10px] font-mono">
                  Fabrication
                </span>
              </div>
            </div>

            {/* Article 3 */}
            <div 
              onClick={() => navigate('blog')}
              className="group cursor-pointer rounded-3xl p-6 bg-[#F6F7F9] border border-black/5 hover:shadow-xl transition-all space-y-4"
            >
              <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-[#0A0A0C] p-6 flex items-center justify-center text-white relative">
                <div className="w-16 h-16 rounded-2xl bg-excited-coral flex items-center justify-center text-white shadow-glow-coral">
                  <ShieldCheck className="w-8 h-8" />
                </div>
              </div>

              <div className="text-xs font-mono text-neutral-500">
                August 25, 2026 · 7 min read
              </div>

              <h3 className="font-display font-bold text-lg text-black group-hover:text-excited-coral transition leading-snug">
                Packaging design mistakes small businesses in Pakistan should avoid
              </h3>

              <div className="flex gap-2 pt-2">
                <span className="pill-badge bg-white text-neutral-600 text-[10px] font-mono">
                  Packaging
                </span>
                <span className="pill-badge bg-white text-neutral-600 text-[10px] font-mono">
                  E-Commerce
                </span>
              </div>
            </div>

          </div>

          <div className="pt-6 text-center">
            <button
              onClick={() => navigate('blog')}
              className="px-8 py-3.5 rounded-full border border-black/20 text-black text-xs font-bold hover:bg-black hover:text-white transition"
            >
              Explore more
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          BOTTOM STICKY CALLOUT BANNER (Electric Coral Bar like in Excited screenshot!)
          ========================================================================= */}
      <div className="bg-excited-coral text-white py-3 px-6 sticky bottom-0 z-40 flex items-center justify-between text-xs sm:text-sm font-bold shadow-2xl">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>Talk to a world-class production expert in Lahore</span>
        </div>
        <button
          onClick={() => navigate('get-a-quote')}
          className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-bold hover:bg-neutral-100 transition shadow"
        >
          Contact us
        </button>
      </div>

    </div>
  );
}
