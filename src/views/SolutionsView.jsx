import React from 'react';
import { useApp } from '../context/AppContext';
import { SOLUTIONS } from '../data/inprintData';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function SolutionsView() {
  const { viewParams, navigate, selectedSolutionId, setSelectedSolutionId } = useApp();
  
  const activeId = viewParams.solutionId || selectedSolutionId || SOLUTIONS[0].id;
  const currentSolution = SOLUTIONS.find((s) => s.id === activeId) || SOLUTIONS[0];

  return (
    <div className="pt-8 pb-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-16 font-sans bg-black">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-neutral-400">Solutions</span>
        <span>/</span>
        <span className="text-red-brand font-bold">{currentSolution.title}</span>
      </nav>

      {/* Solutions Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-mono">
        {SOLUTIONS.map((sol) => (
          <button
            key={sol.id}
            onClick={() => setSelectedSolutionId(sol.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
              currentSolution.id === sol.id
                ? 'bg-red-brand text-white border-red-brand font-bold'
                : 'bg-white/5 text-neutral-300 border-white/10 hover:border-white/30'
            }`}
          >
            {sol.title}
          </button>
        ))}
      </div>

      {/* Hero */}
      <div className="p-8 sm:p-14 rounded-3xl bg-[#0D0E12] border border-white/10 shadow-2xl space-y-5">
        <span className="pill-badge-red text-[11px] uppercase">
          SOLUTION OBJECTIVE
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
          {currentSolution.h1}
        </h1>
        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
          {currentSolution.shortDesc}
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() => navigate('get-a-quote')}
            className="px-7 py-3 rounded-full btn-pill-red text-xs font-bold flex items-center gap-2"
          >
            <span>{currentSolution.cta}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('products')}
            className="px-6 py-3 rounded-full btn-pill-white text-xs font-bold"
          >
            Browse Matching Products
          </button>
        </div>
      </div>

      {/* Recommended Products & Deliverables */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-red-brand block mb-1">
            RECOMMENDED ASSETS
          </span>
          <h2 className="font-display font-black text-2xl text-white">
            What is included in this solution
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentSolution.recommendedProducts.map((prod, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0D0E12] border border-white/10 flex items-center gap-3 group hover:border-red-brand transition"
            >
              <CheckCircle2 className="w-4 h-4 text-red-brand shrink-0" />
              <span className="text-xs font-semibold text-white group-hover:text-red-brand transition">
                {prod}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* All 10 Solutions Grid Overview */}
      <div className="space-y-6 pt-12 border-t border-white/10">
        <h3 className="font-display font-black text-2xl text-white">
          Explore all 10 production solutions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SOLUTIONS.map((sol, idx) => (
            <div
              key={sol.id}
              onClick={() => setSelectedSolutionId(sol.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition ${
                currentSolution.id === sol.id
                  ? 'bg-black border-red-brand'
                  : 'bg-[#0D0E12] border-white/10 hover:border-white/30'
              }`}
            >
              <span className="text-[10px] font-mono text-red-brand block mb-1 font-bold">0{idx + 1}</span>
              <h4 className="text-xs font-bold text-white mb-1 font-display">{sol.title}</h4>
              <p className="text-[11px] text-neutral-400 line-clamp-2 font-sans">{sol.shortDesc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
