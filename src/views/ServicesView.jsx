import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SERVICES, CASE_STUDIES } from '../data/inprintData';
import { 
  ArrowUpRight, CheckCircle2, Layers, MapPin, 
  Camera, Ruler, Calendar, MessageSquare 
} from 'lucide-react';

export default function ServicesView() {
  const { viewParams, navigate, selectedServiceId, setSelectedServiceId, setActiveCaseStudy } = useApp();

  const activeId = viewParams.serviceId || selectedServiceId || SERVICES[0].id;
  const currentService = SERVICES.find((s) => s.id === activeId) || SERVICES[0];

  const relevantCaseStudies = CASE_STUDIES.filter((c) =>
    c.services.some((s) => s.toLowerCase().includes(currentService.name.toLowerCase().split(' ')[0]))
  );

  return (
    <div className="pt-8 pb-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-16 font-sans bg-black">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-neutral-400">Services</span>
        <span>/</span>
        <span className="text-red-brand font-bold">{currentService.name}</span>
      </nav>

      {/* Services Switcher Tabs (Excited pill format) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-mono">
        {SERVICES.map((srv) => (
          <button
            key={srv.id}
            onClick={() => setSelectedServiceId(srv.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
              currentService.id === srv.id
                ? 'bg-red-brand text-white border-red-brand font-bold'
                : 'bg-white/5 text-neutral-300 border-white/10 hover:border-white/30'
            }`}
          >
            {srv.name}
          </button>
        ))}
      </div>

      {/* Hero Section for Service */}
      <div className="relative rounded-[32px] sm:rounded-[40px] p-8 sm:p-14 bg-[#0D0E12] border border-white/10 overflow-hidden shadow-2xl">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <span className="pill-badge-red text-[11px] uppercase">
              CREATIVE PRODUCTION SERVICE
            </span>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              {currentService.h1}
            </h1>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-xl font-sans">
              {currentService.shortDesc}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigate('get-a-quote')}
                className="px-7 py-3 rounded-full btn-pill-red text-xs font-bold shadow flex items-center gap-2"
              >
                <span>{currentService.cta}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {currentService.id === 'signage-fabrication' && (
                <button
                  onClick={() => navigate('book-site-visit')}
                  className="px-6 py-3 rounded-full btn-pill-white text-xs font-bold flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-red-brand" />
                  <span>Book Site Visit (Lahore)</span>
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={currentService.heroImage}
                alt={currentService.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
          </div>

        </div>
      </div>

      {/* Signage & Fabrication Specific Tool Bar */}
      {currentService.id === 'signage-fabrication' && (
        <div className="p-6 rounded-3xl bg-[#0D0E12] border border-white/10 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-red-brand block font-bold">
            SIGNAGE PROJECT WORKFLOW TOOLS (LAHORE)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <button 
              onClick={() => navigate('book-site-visit')}
              className="p-4 rounded-2xl bg-black border border-white/10 hover:border-red-brand text-left space-y-1 transition group"
            >
              <Ruler className="w-4 h-4 text-red-brand group-hover:scale-110 transition" />
              <div className="text-white font-bold">Request Measurements</div>
              <div className="text-[10px] text-neutral-500 font-sans">Laser survey in Model Town & Gulberg</div>
            </button>
            <button 
              onClick={() => navigate('book-site-visit')}
              className="p-4 rounded-2xl bg-black border border-white/10 hover:border-red-brand text-left space-y-1 transition group"
            >
              <Camera className="w-4 h-4 text-red-brand group-hover:scale-110 transition" />
              <div className="text-white font-bold">Upload Site Photos</div>
              <div className="text-[10px] text-neutral-500 font-sans">Facade & mounting surfaces</div>
            </button>
            <button 
              onClick={() => navigate('book-site-visit')}
              className="p-4 rounded-2xl bg-black border border-white/10 hover:border-red-brand text-left space-y-1 transition group"
            >
              <Calendar className="w-4 h-4 text-red-brand group-hover:scale-110 transition" />
              <div className="text-white font-bold">Book a Site Visit</div>
              <div className="text-[10px] text-neutral-500 font-sans">Schedule engineer walkthrough</div>
            </button>
            <button 
              onClick={() => navigate('material-guide')}
              className="p-4 rounded-2xl bg-black border border-white/10 hover:border-red-brand text-left space-y-1 transition group"
            >
              <Layers className="w-4 h-4 text-red-brand group-hover:scale-110 transition" />
              <div className="text-white font-bold">View Material Options</div>
              <div className="text-[10px] text-neutral-500 font-sans">Acrylic, steel, halo LEDs</div>
            </button>
          </div>
        </div>
      )}

      {/* Deliverables Grid */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-red-brand block mb-1">
            WHAT WE FABRICATE & DELIVER
          </span>
          <h2 className="font-display font-black text-3xl text-white">
            Comprehensive production deliverables
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentService.deliverables.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#0D0E12] border border-white/5 flex items-center gap-3 group hover:border-white/20 transition"
            >
              <CheckCircle2 className="w-4 h-4 text-red-brand shrink-0" />
              <span className="text-xs font-semibold text-neutral-200 group-hover:text-white transition font-sans">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5-Stage Process Timeline */}
      <div className="p-8 sm:p-12 rounded-[32px] bg-[#0D0E12] border border-white/10 space-y-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-red-brand block mb-1">
            EXECUTION RIGOR
          </span>
          <h2 className="font-display font-black text-3xl text-white">
            Our 5-stage production process
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {currentService.process.map((step, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-black border border-white/10 space-y-3 font-mono">
              <span className="w-7 h-7 rounded-full bg-red-brand text-white flex items-center justify-center text-xs font-bold">
                {idx + 1}
              </span>
              <h4 className="text-sm font-bold text-white font-display">{step}</h4>
              <p className="text-[11px] text-neutral-400 font-sans">
                Stage {idx + 1} of quality control & client sign-off before manufacturing.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Work for this Service */}
      {relevantCaseStudies.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-red-brand block mb-1">
                CASE STUDIES
              </span>
              <h2 className="font-display font-black text-3xl text-white">
                Work produced in this category
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relevantCaseStudies.map((cs) => (
              <div
                key={cs.id}
                onClick={() => setActiveCaseStudy(cs)}
                className="p-6 rounded-3xl bg-[#0D0E12] border border-white/10 hover:border-red-brand transition cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-black">
                    <img src={cs.heroImage} alt={cs.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-red-brand transition">
                    {cs.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 font-sans">{cs.brief}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-500">{cs.location}</span>
                  <span className="text-white font-bold flex items-center gap-1">
                    View Project <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quote Callout Box */}
      <div className="p-8 sm:p-12 rounded-[32px] bg-[#0D0E12] border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center sm:text-left">
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
            Ready to produce your {currentService.name.toLowerCase()}?
          </h3>
          <p className="text-neutral-300 text-xs sm:text-sm font-sans">
            Share your brief, architectural drawings or project schedule. We will prepare a production proposal and estimate within 24 hours.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <button
            onClick={() => navigate('get-a-quote')}
            className="px-7 py-3 rounded-full btn-pill-red text-xs font-bold"
          >
            Start a Project Brief
          </button>
          <a
            href="https://wa.me/923213656096?text=Hi%20INPRINT,%20I%20want%20to%20discuss%20a%20service%20project."
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full btn-pill-white text-xs font-bold flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-red-brand" />
            <span>WhatsApp 0321 3656096</span>
          </a>
        </div>
      </div>

    </div>
  );
}
