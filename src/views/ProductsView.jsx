import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, PRODUCT_CATEGORIES, FAQS } from '../data/inprintData';
import { 
  Search, ArrowUpDown, ChevronRight, MessageSquare, ArrowRight, 
  Package
} from 'lucide-react';

export default function ProductsView() {
  const { viewParams, navigate, setSelectedProduct } = useApp();
  
  // Category filter state
  const initialCategory = viewParams.category || 'all';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'price-low', 'price-high', 'fastest'
  const [filterTurnaround, setFilterTurnaround] = useState('all'); // 'all', 'fast' (24 hrs)
  const [searchQuery, setSearchQuery] = useState('');

  // Current category data
  const currentCategoryData = useMemo(() => {
    if (selectedCategory === 'all') return null;
    return PRODUCT_CATEGORIES.find((c) => c.slug === selectedCategory);
  }, [selectedCategory]);

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q)
      );
    }

    if (filterTurnaround === 'fast') {
      list = list.filter((p) => p.turnaround.toLowerCase().includes('24') || p.turnaround.toLowerCase().includes('same-day'));
    }

    // Sort
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortBy === 'fastest') {
      list.sort((a, b) => (a.turnaround.includes('24') || a.turnaround.includes('Same') ? -1 : 1));
    }

    return list;
  }, [selectedCategory, searchQuery, filterTurnaround, sortBy]);

  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod);
    navigate('product-detail', { slug: prod.slug });
  };

  return (
    <div className="pt-8 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 font-sans bg-black">
      
      {/* C01 — Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">
          Home
        </button>
        <span>/</span>
        <button 
          onClick={() => { setSelectedCategory('all'); }} 
          className={selectedCategory === 'all' ? 'text-red-brand font-bold' : 'hover:text-white transition'}
        >
          Products
        </button>
        {currentCategoryData && (
          <>
            <span>/</span>
            <span className="text-red-brand font-bold">{currentCategoryData.name}</span>
          </>
        )}
      </nav>

      {/* C02 — Category Hero Banner */}
      <div className="relative rounded-3xl p-8 sm:p-12 bg-[#0D0E12] border border-white/10 overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="pill-badge-red text-[11px] uppercase">
            {currentCategoryData ? currentCategoryData.name : 'COMPLETE PRODUCTION CATALOG'}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            {currentCategoryData ? currentCategoryData.h1 : 'Creative print & branding production.'}
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            {currentCategoryData 
              ? currentCategoryData.intro 
              : 'Print the materials your business uses every day—from business cards and letterheads to custom packaging boxes, illuminated signage and promotional flex.'}
          </p>
        </div>

        {/* Ambient subtle glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-brand/10 blur-[90px] rounded-full pointer-events-none" />
      </div>

      {/* Category Pills Slider / Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-mono">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${
            selectedCategory === 'all'
              ? 'bg-red-brand text-white font-bold'
              : 'bg-white/5 text-neutral-300 hover:text-white border border-white/10'
          }`}
        >
          All Products ({PRODUCTS.length})
        </button>

        {PRODUCT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat.slug
                ? 'bg-red-brand text-white font-bold'
                : 'bg-white/5 text-neutral-300 hover:text-white border border-white/10'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Search, Filter & Sort Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0D0E12] border border-white/10">
        
        {/* Search inside catalog */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter products (e.g. card, acrylic, flex)..."
            className="w-full pl-9 pr-4 py-2 bg-black border border-white/10 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-brand font-sans"
          />
        </div>

        {/* Filter & Sort toggles */}
        <div className="flex items-center gap-3">
          {/* Turnaround filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-neutral-400 text-[11px] font-mono hidden md:inline">Speed:</span>
            <select
              value={filterTurnaround}
              onChange={(e) => setFilterTurnaround(e.target.value)}
              className="bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-red-brand font-mono"
            >
              <option value="all">All Turnarounds</option>
              <option value="fast">Same-day / 24-hr Urgent</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-red-brand font-mono"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="fastest">Fastest Turnaround</option>
            </select>
          </div>
        </div>

      </div>

      {/* C03 — Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 p-8 rounded-3xl bg-[#0D0E12] border border-white/10 space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-neutral-400">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-lg text-white">No products found matching filters</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto font-sans">
            Try resetting your filters or search keywords, or send us a custom production brief.
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setFilterTurnaround('all'); }}
            className="btn-pill-red text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              onClick={() => handleSelectProduct(prod)}
              className="group p-4 rounded-2xl bg-[#0D0E12] border border-white/10 hover:border-red-brand transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-black border border-white/5">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono text-neutral-300 border border-white/10">
                      {prod.categoryName}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono text-white border border-red-brand/40 bg-red-brand/20">
                      {prod.turnaround}
                    </span>
                  </div>
                </div>

                <h3 className="font-display font-bold text-base text-white group-hover:text-red-brand transition">
                  {prod.name}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2 mt-1">
                  {prod.shortDesc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-400 block font-mono">From</span>
                  <span className="text-sm font-bold text-red-brand font-mono">
                    Rs. {prod.basePrice.toLocaleString()}
                  </span>
                  <span className="text-[9px] text-neutral-400 block font-mono">{prod.priceUnit}</span>
                </div>
                <span className="text-xs font-semibold text-neutral-300 group-hover:text-white flex items-center gap-1 font-mono">
                  Configure <ChevronRight className="w-3.5 h-3.5 text-red-brand group-hover:translate-x-1 transition" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* C04 — Category Guide */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#0D0E12] border border-white/10 space-y-4">
        <span className="pill-badge-red text-[11px] uppercase">
          PRODUCTION ADVICE
        </span>
        <h3 className="font-display font-black text-2xl text-white">
          Choose the right print for the job.
        </h3>
        <p className="text-sm text-neutral-300 leading-relaxed max-w-3xl">
          Everyday corporate materials should be clear, consistent and easy to reorder. Select the product, quantity and finish that match your brand and deadline. If you are unsure, send us your requirements and our team will recommend the right option.
        </p>

        {/* C05 — Related Categories */}
        <div className="pt-6 border-t border-white/10">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-3">
            Related Categories:
          </span>
          <div className="flex flex-wrap gap-2">
            {PRODUCT_CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.slug)}
                className="px-3 py-1.5 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-white hover:border-red-brand transition"
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* C06 — Category FAQ */}
      <div className="space-y-4">
        <h3 className="font-display font-black text-2xl text-white">
          Frequently asked questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS.slice(0, 4).map((faq, i) => (
            <div key={i} className="p-5 rounded-2xl bg-[#0D0E12] border border-white/10 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-red-brand font-mono text-xs">Q.</span> {faq.question}
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* C07 — WhatsApp CTA Banner */}
      <div className="p-6 rounded-2xl bg-[#0D0E12] border border-red-brand/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-brand/10 border border-red-brand/30 flex items-center justify-center text-red-brand shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white font-display">Need help choosing a product or sizing?</h4>
            <p className="text-xs text-neutral-400 font-sans">Our Lahore production desk can advise on materials and quotes on WhatsApp.</p>
          </div>
        </div>
        <a
          href="https://wa.me/923213656096?text=Hi%20INPRINT,%20I%20need%20help%20choosing%20the%20right%20print%20product."
          target="_blank"
          rel="noreferrer"
          className="btn-pill-red text-xs font-bold"
        >
          WhatsApp INPRINT (0321 3656096)
        </a>
      </div>

    </div>
  );
}
