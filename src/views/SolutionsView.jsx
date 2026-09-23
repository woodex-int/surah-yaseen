import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SOLUTIONS, PRODUCTS } from '../data/inprintData';
import { ArrowRight, CheckCircle2, Store, Sparkles, ArrowUpRight } from 'lucide-react';

export default function SolutionsView() {
  const { viewParams, navigate, selectedSolutionId, setSelectedSolutionId } = useApp();
  
  const activeId = viewParams.solutionId || selectedSolutionId || SOLUTIONS[0].id;
  const currentSolution = SOLUTIONS.find((s) => s.id === activeId) || SOLUTIONS[0];

  return (
    <div className="pt-8 pb-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-slate-400">Solutions</span>
        <span>/</span>
        <span className="text-lime-brand">{currentSolution.title}</span>
      </nav>

      {/* Solutions Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {SOLUTIONS.map((sol) => (
          <button
            key={sol.id}
            onClick={() => setSelectedSolutionId(sol.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
              currentSolution.id === sol.id
                ? 'bg-lime-brand text-black border-lime-brand shadow-glow-lime'
                : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20'
            }`}
          >
            {sol.title}
          </button>
        ))}
      </div>

      {/* Hero */}
      <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-dark-900 via-dark-850 to-dark-950 border border-white/10 shadow-2xl space-y-5">
        <span className="agency-pill text-lime-brand border-lime-brand/30 text-[11px] font-mono uppercase">
          SOLUTION OBJECTIVE
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
          {currentSolution.h1}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
          {currentSolution.shortDesc}
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={() => navigate('get-a-quote')}
            className="px-7 py-3 rounded-full btn-primary text-xs font-bold shadow-glow-lime flex items-center gap-2"
          >
            <span>{currentSolution.cta}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate('products')}
            className="px-6 py-3 rounded-full btn-secondary text-xs font-semibold"
          >
            Browse Matching Products
          </button>
        </div>
      </div>

      {/* Recommended Products & Deliverables */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-lime-brand block mb-1">
            RECOMMENDED ASSETS
          </span>
          <h2 className="font-display font-extrabold text-2xl text-white">
            What is included in this solution
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentSolution.recommendedProducts.map((prod, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3 group hover:border-lime-brand/30 transition"
            >
              <CheckCircle2 className="w-4 h-4 text-lime-brand shrink-0" />
              <span className="text-xs font-semibold text-white group-hover:text-lime-brand transition">
                {prod}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* All 10 Solutions Grid Overview */}
      <div className="space-y-6 pt-12 border-t border-white/10">
        <h3 className="font-display font-extrabold text-2xl text-white">
          Explore all 10 production solutions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SOLUTIONS.map((sol, idx) => (
            <div
              key={sol.id}
              onClick={() => setSelectedSolutionId(sol.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition ${
                currentSolution.id === sol.id
                  ? 'bg-lime-brand/10 border-lime-brand'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}
            >
              <span className="text-[10px] font-mono text-lime-brand block mb-1">0{idx + 1}</span>
              <h4 className="text-xs font-bold text-white mb-1">{sol.title}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">{sol.shortDesc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
