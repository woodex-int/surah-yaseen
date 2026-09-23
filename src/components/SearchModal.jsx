import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, SERVICES, SOLUTIONS, INDUSTRIES, PRODUCT_CATEGORIES } from '../data/inprintData';
import { Search, X, ArrowRight, CornerDownLeft, Sparkles, Layers, Package, Store } from 'lucide-react';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, navigate, setSelectedProduct, setSelectedServiceId } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const filteredProducts = trimmed
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.shortDesc.toLowerCase().includes(trimmed) ||
          p.categoryName.toLowerCase().includes(trimmed)
      )
    : [];

  const filteredServices = trimmed
    ? SERVICES.filter(
        (s) =>
          s.name.toLowerCase().includes(trimmed) ||
          s.shortDesc.toLowerCase().includes(trimmed) ||
          s.deliverables.some((d) => d.toLowerCase().includes(trimmed))
      )
    : [];

  const filteredSolutions = trimmed
    ? SOLUTIONS.filter(
        (sol) =>
          sol.title.toLowerCase().includes(trimmed) ||
          sol.shortDesc.toLowerCase().includes(trimmed)
      )
    : [];

  const suggestions = [
    "Business Cards",
    "Custom Boxes",
    "Shop Signage",
    "Packaging",
    "Exhibition Stalls",
    "Brand Identity",
    "Vehicle Branding",
    "Franchise Rollout"
  ];

  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod);
    navigate('product-detail', { slug: prod.slug });
    setIsSearchOpen(false);
  };

  const handleSelectService = (srv) => {
    setSelectedServiceId(srv.id);
    navigate('services');
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md transition-opacity">
      <div 
        className="w-full max-w-2xl bg-dark-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-white/10 gap-3 bg-dark-850">
          <Search className="w-5 h-5 text-excited-coral shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to print, design or build?"
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2.5 py-1 text-xs font-mono uppercase tracking-wider text-slate-400 bg-white/5 border border-white/10 rounded hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Content area */}
        <div className="max-h-[60vh] overflow-y-auto p-5 space-y-6">
          {!trimmed ? (
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-excited-coral" /> Suggested Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(item)}
                    className="pill-badge pill-badge-dark text-xs hover:border-white/40"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-white/5">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Browse by Category
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        navigate('products', { category: cat.slug });
                        setIsSearchOpen(false);
                      }}
                      className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/20 text-left transition group"
                    >
                      <div className="text-xs font-medium text-slate-200 group-hover:text-lime-brand truncate">
                        {cat.name}
                      </div>
                      <div className="text-[10px] text-slate-500">{cat.count} items</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProducts.length === 0 &&
              filteredServices.length === 0 &&
              filteredSolutions.length === 0 ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-400">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-semibold text-white">We could not find an exact match.</h4>
                  <p className="text-sm text-slate-400 max-w-sm mx-auto">
                    Try another product name, category or service, or speak to our team directly.
                  </p>
                  <div className="flex justify-center gap-2 pt-2">
                    <button
                      onClick={() => {
                        navigate('get-a-quote');
                        setIsSearchOpen(false);
                      }}
                      className="agency-pill text-lime-brand border-lime-brand/30"
                    >
                      Request a Custom Quote
                    </button>
                    <button
                      onClick={() => {
                        window.open('https://wa.me/923213656096?text=Hi%20INPRINT,%20I%20am%20looking%20for%20' + encodeURIComponent(trimmed), '_blank');
                        setIsSearchOpen(false);
                      }}
                      className="agency-pill bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    >
                      Ask on WhatsApp
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {filteredProducts.length > 0 && (
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                        <Package className="w-3.5 h-3.5 text-lime-brand" /> Products ({filteredProducts.length})
                      </p>
                      <div className="space-y-1.5">
                        {filteredProducts.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => handleSelectProduct(p)}
                            className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-lime-brand/40 hover:bg-white/[0.06] cursor-pointer transition group"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-10 h-10 rounded-lg object-cover border border-white/10"
                              />
                              <div>
                                <h4 className="text-sm font-semibold text-slate-100 group-hover:text-lime-brand transition">
                                  {p.name}
                                </h4>
                                <p className="text-xs text-slate-400 truncate max-w-xs sm:max-w-md">
                                  {p.shortDesc}
                                </p>
                              </div>
                            </div>
                            <div className="text-right shrink-0 pl-2">
                              <span className="text-xs font-mono text-lime-brand font-semibold block">
                                Rs. {p.basePrice.toLocaleString()}
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono">
                                {p.turnaround}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredServices.length > 0 && (
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-lime-brand" /> Services ({filteredServices.length})
                      </p>
                      <div className="space-y-1.5">
                        {filteredServices.map((srv) => (
                          <div
                            key={srv.id}
                            onClick={() => handleSelectService(srv)}
                            className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-lime-brand/40 hover:bg-white/[0.06] cursor-pointer transition group"
                          >
                            <div>
                              <h4 className="text-sm font-semibold text-slate-100 group-hover:text-lime-brand transition">
                                {srv.name}
                              </h4>
                              <p className="text-xs text-slate-400 line-clamp-1">{srv.shortDesc}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-lime-brand group-hover:translate-x-1 transition" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredSolutions.length > 0 && (
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                        <Store className="w-3.5 h-3.5 text-lime-brand" /> Solutions ({filteredSolutions.length})
                      </p>
                      <div className="space-y-1.5">
                        {filteredSolutions.map((sol) => (
                          <div
                            key={sol.id}
                            onClick={() => {
                              navigate('solutions');
                              setIsSearchOpen(false);
                            }}
                            className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-lime-brand/40 hover:bg-white/[0.06] cursor-pointer transition group"
                          >
                            <div>
                              <h4 className="text-sm font-semibold text-slate-100 group-hover:text-lime-brand transition">
                                {sol.title}
                              </h4>
                              <p className="text-xs text-slate-400 line-clamp-1">{sol.shortDesc}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-lime-brand group-hover:translate-x-1 transition" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-3 bg-dark-950 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[10px]">↵</span> to select
            </span>
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[10px]">esc</span> to close
            </span>
          </div>
          <span className="text-slate-500">Press ⌘K anytime</span>
        </div>
      </div>
    </div>
  );
}
