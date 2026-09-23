import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CASE_STUDIES } from '../data/inprintData';
import { ArrowUpRight, ArrowRight, X, Sparkles, CheckCircle2, MessageSquare, MapPin, Calendar, Layers } from 'lucide-react';

export default function PortfolioView() {
  const { navigate, activeCaseStudy, setActiveCaseStudy } = useApp();
  const [filter, setFilter] = useState('All');

  const filterTabs = [
    'All',
    'Branding',
    'Packaging',
    'Signage',
    'Retail',
    'Exhibition',
    'Large Format',
    'Corporate Print',
    'Franchise'
  ];

  const filteredProjects = filter === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((c) =>
        c.services.some((s) => s.toLowerCase().includes(filter.toLowerCase())) ||
        c.projectType.toLowerCase().includes(filter.toLowerCase()) ||
        c.industry.toLowerCase().includes(filter.toLowerCase())
      );

  return (
    <div className="pt-8 pb-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-lime-brand">Our Work</span>
      </nav>

      {/* Hero */}
      <div className="max-w-3xl space-y-4">
        <span className="agency-pill text-lime-brand border-lime-brand/30 text-[11px] font-mono uppercase">
          PROJECT ARCHIVE
        </span>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight">
          Our work in the <br />
          <span className="text-gradient-lime">real world.</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Explore selected identity, print, packaging, signage, retail, exhibition and production projects delivered across Pakistan.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
              filter === tab
                ? 'bg-lime-brand text-black border-lime-brand shadow-glow-lime'
                : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Projects Grid (Excited.agency Dark Card Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((study) => (
          <div
            key={study.id}
            onClick={() => setActiveCaseStudy(study)}
            className="group relative rounded-3xl overflow-hidden bg-dark-900 border border-white/10 hover:border-lime-brand/50 transition-all duration-300 cursor-pointer shadow-2xl flex flex-col justify-between"
          >
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

      {/* Case Study Detail Modal (CS01 - CS07) */}
      {activeCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div 
            className="w-full max-w-4xl bg-dark-900 border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-dark-850 sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <span className="agency-pill text-lime-brand border-lime-brand/30 text-[10px] font-mono">
                  {activeCaseStudy.industry}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {activeCaseStudy.location}
                </span>
              </div>
              <button
                onClick={() => setActiveCaseStudy(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
              
              {/* CS01 — Hero */}
              <div className="space-y-4">
                <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
                  {activeCaseStudy.title}
                </h2>
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src={activeCaseStudy.heroImage}
                    alt={activeCaseStudy.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* CS02 — The Brief */}
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <span className="text-xs font-mono text-lime-brand uppercase tracking-wider block">
                  CS02 · The Brief
                </span>
                <h3 className="font-display font-bold text-lg text-white">Client Requirements</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeCaseStudy.brief}
                </p>
              </div>

              {/* CS03 — Scope of Work */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-lime-brand uppercase tracking-wider block">
                  CS03 · Deliverables & Scope
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeCaseStudy.scope.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-dark-850 border border-white/5 flex items-center gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-lime-brand shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CS04 — Process */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-lime-brand uppercase tracking-wider block">
                  CS04 · Process Stages
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  {activeCaseStudy.process.map((p, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-lime-brand font-bold block mb-1">0{idx + 1}</span>
                      <span className="text-white font-medium">{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CS05 — Gallery */}
              {activeCaseStudy.gallery && (
                <div className="space-y-3">
                  <span className="text-xs font-mono text-lime-brand uppercase tracking-wider block">
                    CS05 · Production & Finished Shots
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {activeCaseStudy.gallery.map((img, i) => (
                      <div key={i} className="aspect-square rounded-xl overflow-hidden border border-white/10">
                        <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CS06 — Verified Results */}
              <div className="p-6 rounded-2xl bg-dark-950 border border-white/10 space-y-4 font-mono text-xs">
                <span className="text-lime-brand uppercase tracking-wider block font-bold">
                  CS06 · Verified Facts & Performance
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <span className="text-slate-500 block mb-0.5">Timeline:</span>
                    <span className="text-white font-bold">{activeCaseStudy.verifiedResult.timeline}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-0.5">Locations:</span>
                    <span className="text-white font-bold">{activeCaseStudy.verifiedResult.locations}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-0.5">Deliverables:</span>
                    <span className="text-white font-bold">{activeCaseStudy.verifiedResult.deliverables}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-0.5">Scope:</span>
                    <span className="text-lime-brand font-bold">{activeCaseStudy.verifiedResult.scope}</span>
                  </div>
                </div>
              </div>

              {/* CS07 — CTA */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-lime-brand/10 to-dark-850 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-display font-bold text-base text-white">Need something similar for your brand?</h4>
                  <p className="text-xs text-slate-400">Discuss custom dimensions, substrate samples and pricing with our team.</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setActiveCaseStudy(null);
                      navigate('get-a-quote');
                    }}
                    className="px-5 py-2.5 rounded-full btn-primary text-xs font-bold"
                  >
                    Start a Project
                  </button>
                  <a
                    href={`https://wa.me/923213656096?text=Hi%20INPRINT,%20I%20saw%20your%20case%20study%20for%20${encodeURIComponent(activeCaseStudy.title)}%20and%20want%20something%20similar.`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
