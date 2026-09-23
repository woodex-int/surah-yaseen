import React from 'react';
import { useApp } from '../context/AppContext';
import { INDUSTRIES } from '../data/inprintData';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function IndustriesView() {
  const { viewParams, navigate, selectedIndustryId, setSelectedIndustryId } = useApp();

  const activeId = viewParams.industryId || selectedIndustryId || INDUSTRIES[0].id;
  const currentIndustry = INDUSTRIES.find((i) => i.id === activeId) || INDUSTRIES[0];

  return (
    <div className="pt-8 pb-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-16 font-sans bg-black">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-neutral-400">Industries</span>
        <span>/</span>
        <span className="text-red-brand font-bold">{currentIndustry.name}</span>
      </nav>

      {/* Industries Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-mono">
        {INDUSTRIES.map((ind) => (
          <button
            key={ind.id}
            onClick={() => setSelectedIndustryId(ind.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
              currentIndustry.id === ind.id
                ? 'bg-red-brand text-white border-red-brand font-bold'
                : 'bg-white/5 text-neutral-300 border-white/10 hover:border-white/30'
            }`}
          >
            {ind.name}
          </button>
        ))}
      </div>

      {/* Hero */}
      <div className="p-8 sm:p-14 rounded-3xl bg-[#0D0E12] border border-white/10 shadow-2xl space-y-5">
        <span className="pill-badge-red text-[11px] uppercase">
          INDUSTRY TAILORED PRODUCTION
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
          {currentIndustry.h1}
        </h1>
        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
          {currentIndustry.shortDesc}
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() => navigate('get-a-quote')}
            className="px-7 py-3 rounded-full btn-pill-red text-xs font-bold flex items-center gap-2"
          >
            <span>{currentIndustry.cta}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('our-work')}
            className="px-6 py-3 rounded-full btn-pill-white text-xs font-bold"
          >
            View Real-World Case Studies
          </button>
        </div>
      </div>

      {/* Recommended Services for this Industry */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-red-brand block mb-1">
            KEY PRODUCTION TOUCHPOINTS
          </span>
          <h2 className="font-display font-black text-2xl text-white">
            Essential materials produced for {currentIndustry.name}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentIndustry.services.map((srv, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0D0E12] border border-white/10 flex items-center gap-3 group hover:border-red-brand transition"
            >
              <CheckCircle2 className="w-4 h-4 text-red-brand shrink-0" />
              <span className="text-xs font-semibold text-white group-hover:text-red-brand transition font-sans">
                {srv}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* All 9 Industries Grid */}
      <div className="space-y-6 pt-12 border-t border-white/10">
        <h3 className="font-display font-black text-2xl text-white">
          Sectors we produce for across Pakistan
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.id}
              onClick={() => setSelectedIndustryId(ind.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition ${
                currentIndustry.id === ind.id
                  ? 'bg-black border-red-brand'
                  : 'bg-[#0D0E12] border-white/10 hover:border-white/30'
              }`}
            >
              <h4 className="text-sm font-bold text-white mb-1.5 font-display">{ind.name}</h4>
              <p className="text-xs text-neutral-400 line-clamp-2 font-sans">{ind.shortDesc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
