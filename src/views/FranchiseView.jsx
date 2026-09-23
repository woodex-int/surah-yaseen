import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, ArrowRight, Send } from 'lucide-react';

export default function FranchiseView() {
  const { navigate, showToast } = useApp();

  // F05 Qualification Form state
  const [formData, setFormData] = useState({
    currentLocations: '1-3',
    plannedLocations: '5-10',
    industry: 'Restaurants & Cafés',
    hasIdentity: 'Yes, existing identity needing standardization',
    targetDate: 'Within 3 months',
    cities: 'Lahore, Islamabad, Rawalpindi',
    issues: 'Color inconsistency between different regional signage fabricators',
    budget: 'Rs. 1M - 3M',
    fullName: '',
    company: '',
    phone: '',
    email: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Franchise consultation request submitted!');
  };

  return (
    <div className="pt-8 pb-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-20 font-sans bg-black">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <button onClick={() => navigate('services')} className="hover:text-white transition">Services</button>
        <span>/</span>
        <span className="text-red-brand font-bold">Franchise Rollout</span>
      </nav>

      {/* F01 — Hero */}
      <div className="relative rounded-3xl p-8 sm:p-14 lg:p-20 bg-[#0D0E12] border border-white/10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-brand/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-5">
          <span className="pill-badge-red text-[11px] uppercase">
            MULTI-LOCATION PRODUCTION ARCHITECTURE
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight">
            One brand. <br />
            <span className="text-red-brand">Many locations.</span>
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
            We create the brand system, production files and rollout support needed to make every location feel consistent across Pakistan.
          </p>

          <div className="pt-2">
            <a
              href="#qualification-form"
              className="px-8 py-3.5 rounded-full btn-pill-red text-xs sm:text-sm font-bold inline-flex items-center gap-2"
            >
              <span>Book a Franchise Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* F02 — Problem Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-8 sm:p-12 rounded-3xl bg-[#0D0E12] border border-white/10">
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-red-brand block">
            THE MULTI-UNIT CHALLENGE
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
            Growth becomes difficult when every location is produced differently.
          </h2>
          <p className="text-neutral-300 text-sm leading-relaxed font-sans">
            A growing brand needs more than a logo. It needs clear signage specifications, packaging files, store branding standards, installation guidance and a reliable production partner.
          </p>
          <p className="text-neutral-400 text-xs leading-relaxed font-sans">
            When franchisees source printing from random local street shops, colors drift, acrylics fade, and customer trust erodes. INPRINT centralizes your design engineering and fabrication under one unified SLA.
          </p>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="p-4 rounded-xl bg-black border border-white/10 text-neutral-300 space-y-1">
            <div className="text-neutral-400 font-bold flex items-center gap-2">
              ✕ Without a Standardized Production Partner:
            </div>
            <p className="text-[11px] text-neutral-500 font-sans">Different signage lighting shades, mismatched cups, delayed store launches, no vector files.</p>
          </div>
          <div className="p-4 rounded-xl bg-black border border-red-brand/40 text-neutral-200 space-y-1">
            <div className="text-red-brand font-bold flex items-center gap-2 font-mono">
              ✓ With INPRINT Centralized Rollout:
            </div>
            <p className="text-[11px] text-neutral-300 font-sans">Pre-approved factory dielines, exact Pantone & RAL color matching, turn-key delivery across all Pakistani cities.</p>
          </div>
        </div>
      </div>

      {/* F03 — Deliverables List (10 Items) */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-red-brand block mb-1">
            STANDARDIZED ASSET SUITE
          </span>
          <h2 className="font-display font-black text-3xl text-white">
            Franchise deliverables
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { title: "Brand Identity System", desc: "Vector masters, color recipes, and typography rules" },
            { title: "Store Branding Guidelines", desc: "Wall graphics, POS placement and entrance standards" },
            { title: "Signage Specifications", desc: "CAD mechanical blueprints, LED lumens, acrylic specs" },
            { title: "Packaging Templates", desc: "Standardized dielines for cups, boxes, bags and wraps" },
            { title: "Production Artwork", desc: "Press-ready files formatted for instant batch reprinting" },
            { title: "Installation Instructions", desc: "Step-by-step contractor fitting and wiring manuals" },
            { title: "Multi-Location Coordination", desc: "Simultaneous scheduling for regional branch openings" },
            { title: "Brand Asset Library", desc: "Cloud repository accessible to approved franchisees" },
            { title: "Uniform Specifications", desc: "Thread colors, fabric weights and embroidery sizing" },
            { title: "Reorder & Maintenance SLA", desc: "Guaranteed reprint turnaround and replacement parts" },
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#0D0E12] border border-white/5 space-y-2">
              <CheckCircle2 className="w-5 h-5 text-red-brand" />
              <h4 className="text-sm font-bold text-white font-display">{item.title}</h4>
              <p className="text-xs text-neutral-400 font-sans">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* F04 — 7-Step Process */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#0D0E12] border border-white/10 space-y-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-red-brand block mb-1">
            ROADMAP TO MULTI-UNIT SCALE
          </span>
          <h2 className="font-display font-black text-3xl text-white">
            7-Stage franchise rollout process
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 text-xs font-mono">
          {[
            "1. Discovery",
            "2. Brand & Space Audit",
            "3. Concept Development",
            "4. Production Specs",
            "5. Pilot Location",
            "6. Rollout & Installation",
            "7. Handover & Maintenance"
          ].map((st, i) => (
            <div key={i} className="p-4 rounded-xl bg-black border border-white/5 space-y-2">
              <span className="text-red-brand font-bold text-sm block">0{i + 1}</span>
              <div className="text-white font-bold">{st.split('. ')[1]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* F05 — Interactive Franchise Qualification Form */}
      <div id="qualification-form" className="p-8 sm:p-12 rounded-3xl bg-[#0D0E12] border border-white/10 space-y-8 max-w-4xl mx-auto shadow-2xl">
        <div className="text-center space-y-2">
          <span className="pill-badge-red text-[11px] uppercase">
            QUALIFICATION & AUDIT
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
            Tell us where your brand is going next.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto font-sans">
            Fill out your expansion parameters and our franchise production director in Lahore will schedule a discovery consultation.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-black border border-red-brand/40 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-red-brand mx-auto" />
            <h3 className="font-display font-black text-xl text-white">Consultation Request Received!</h3>
            <p className="text-xs text-neutral-300 max-w-md mx-auto font-sans">
              Thank you {formData.fullName}. Our franchise production lead will review your details for {formData.company || 'your brand'} and reach out on WhatsApp/phone within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-pill-red text-xs"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              
              <div>
                <label className="text-neutral-400 block mb-1">Current number of locations</label>
                <select
                  value={formData.currentLocations}
                  onChange={(e) => setFormData({ ...formData, currentLocations: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand"
                >
                  <option value="1 (Single Pilot Store)">1 (Single Pilot Store)</option>
                  <option value="2-4 Locations">2-4 Locations</option>
                  <option value="5-10 Locations">5-10 Locations</option>
                  <option value="10+ Locations">10+ Locations</option>
                </select>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Planned locations (next 12-18 mos)</label>
                <select
                  value={formData.plannedLocations}
                  onChange={(e) => setFormData({ ...formData, plannedLocations: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand"
                >
                  <option value="2-5 New Outlets">2-5 New Outlets</option>
                  <option value="6-12 New Outlets">6-12 New Outlets</option>
                  <option value="15+ Nationwide Outlets">15+ Nationwide Outlets</option>
                </select>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Industry / Sector</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  placeholder="e.g. Specialty Coffee, Apparel, Clinic"
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans"
                  required
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Target Opening Date</label>
                <input
                  type="text"
                  value={formData.targetDate}
                  onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                  placeholder="e.g. Q4 2026 or Dec 2026"
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-neutral-400 block mb-1">Target Cities Involved</label>
                <input
                  type="text"
                  value={formData.cities}
                  onChange={(e) => setFormData({ ...formData, cities: e.target.value })}
                  placeholder="e.g. Lahore, Islamabad, Faisalabad, Karachi"
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-neutral-400 block mb-1">Existing supplier or production pain points</label>
                <textarea
                  rows={2}
                  value={formData.issues}
                  onChange={(e) => setFormData({ ...formData, issues: e.target.value })}
                  placeholder="Describe inconsistencies, delayed handovers, or packaging quality issues you face currently"
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Daniyal Butt"
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans"
                  required
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Brand / Company Name *</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Roast & Co."
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans"
                  required
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0321 3656096"
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans"
                  required
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Work Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="founder@brand.pk"
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans"
                />
              </div>

            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-full btn-pill-red text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Request Franchise Consultation</span>
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
}
