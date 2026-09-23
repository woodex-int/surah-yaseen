import React from 'react';
import { useApp } from '../context/AppContext';
import { INDUSTRIES } from '../data/inprintData';
import { ArrowRight, ArrowUpRight, CheckCircle2, Building, Sparkles } from 'lucide-react';

export default function IndustriesView() {
  const { viewParams, navigate, selectedIndustryId, setSelectedIndustryId } = useApp();

  const activeId = viewParams.industryId || selectedIndustryId || INDUSTRIES[0].id;
  const currentIndustry = INDUSTRIES.find((i) => i.id === activeId) || INDUSTRIES[0];

  return (
    <div className="pt-8 pb-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-slate-400">Industries</span>
        <span>/</span>
        <span className="text-lime-brand">{currentIndustry.name}</span>
      </nav>

      {/* Industries Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {INDUSTRIES.map((ind) => (
          <button
            key={ind.id}
            onClick={() => setSelectedIndustryId(ind.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
              currentIndustry.id === ind.id
                ? 'bg-lime-brand text-black border-lime-brand shadow-glow-lime'
                : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20'
            }`}
          >
            {ind.name}
          </button>
        ))}
      </div>

      {/* Hero */}
      <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-dark-900 via-dark-850 to-dark-950 border border-white/10 shadow-2xl space-y-5">
        <span className="agency-pill text-lime-brand border-lime-brand/30 text-[11px] font-mono uppercase">
          INDUSTRY TAILORED PRODUCTION
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
          {currentIndustry.h1}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
          {currentIndustry.shortDesc}
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() => navigate('get-a-quote')}
            className="px-7 py-3 rounded-full btn-primary text-xs font-bold shadow-glow-lime flex items-center gap-2"
          >
            <span>{currentIndustry.cta}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('our-work')}
            className="px-6 py-3 rounded-full btn-secondary text-xs font-semibold"
          >
            View Real-World Case Studies
          </button>
        </div>
      </div>

      {/* Recommended Services for this Industry */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-lime-brand block mb-1">
            KEY PRODUCTION TOUCHPOINTS
          </span>
          <h2 className="font-display font-extrabold text-2xl text-white">
            Essential materials produced for {currentIndustry.name}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentIndustry.services.map((srv, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3 group hover:border-lime-brand/30 transition"
            >
              <CheckCircle2 className="w-4 h-4 text-lime-brand shrink-0" />
              <span className="text-xs font-semibold text-white group-hover:text-lime-brand transition">
                {srv}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* All 9 Industries Grid */}
      <div className="space-y-6 pt-12 border-t border-white/10">
        <h3 className="font-display font-extrabold text-2xl text-white">
          Sectors we produce for across Pakistan
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.id}
              onClick={() => setSelectedIndustryId(ind.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition ${
                currentIndustry.id === ind.id
                  ? 'bg-lime-brand/10 border-lime-brand'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}
            >
              <h4 className="text-sm font-bold text-white mb-1.5">{ind.name}</h4>
              <p className="text-xs text-slate-400 line-clamp-2">{ind.shortDesc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
