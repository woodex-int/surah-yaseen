import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BRAND, PRODUCT_CATEGORIES, SERVICES, SOLUTIONS, INDUSTRIES } from '../data/inprintData';
import { 
  Search, ShoppingBag, MessageSquare, ChevronDown, Menu, X, ArrowUpRight, 
  Sparkles, Layers, ShieldCheck, MapPin, Truck, Phone, Award, Compass, ArrowRight 
} from 'lucide-react';

export default function Header() {
  const { currentView, navigate, setIsSearchOpen, cart, setIsCartOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.length;

  const handleNavClick = (view, params = {}) => {
    navigate(view, params);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* 3.1 Desktop Utility Bar */}
      <div className="hidden lg:block bg-dark-950/90 border-b border-white/5 backdrop-blur-sm py-1.5 px-6 text-xs text-slate-400 font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-lime-brand font-medium">
              <span className="text-amber-400">★</span> 4.9 on Google
            </span>
            <span className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 cursor-pointer" onClick={() => handleNavClick('artwork-guide')}>
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" /> Artwork support
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-500" /> Lahore pickup
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Truck className="w-3.5 h-3.5 text-slate-500" /> Nationwide delivery
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-500 text-[11px]">Online enquiries 24/7</span>
            <a 
              href={`https://wa.me/923213656096?text=Hi%20INPRINT,%20I%20have%20an%20enquiry.`}
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 text-slate-300 hover:text-lime-brand transition"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: 0321 3656096</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className={`transition-all duration-300 ${isScrolled ? 'bg-dark-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5' : 'bg-dark-950/80 backdrop-blur-md border-b border-white/5 py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-dark-800 border border-white/15 flex items-center justify-center relative overflow-hidden group-hover:border-lime-brand transition">
                <div className="absolute inset-0 bg-lime-brand/10 opacity-0 group-hover:opacity-100 transition" />
                <span className="font-display font-extrabold text-sm tracking-tighter text-white group-hover:text-lime-brand transition">
                  IN
                </span>
              </div>
              <div>
                <span className="font-display font-black tracking-wider text-xl text-white group-hover:text-lime-brand transition">
                  INPRINT
                </span>
                <span className="hidden sm:inline-block text-[9px] font-mono tracking-widest text-slate-400 uppercase ml-2 px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                  Lahore
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
              
              {/* Products Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('products')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => handleNavClick('products')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full transition ${currentView === 'products' ? 'text-lime-brand bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
                >
                  Products
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'products' ? 'rotate-180 text-lime-brand' : 'text-slate-500'}`} />
                </button>

                {/* Mega Menu Dropdown */}
                {activeDropdown === 'products' && (
                  <div className="absolute top-full left-0 pt-2 w-[580px] animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="glass-panel-elevated p-5 rounded-2xl shadow-2xl border border-white/10">
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                        <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                          Product Categories
                        </span>
                        <button 
                          onClick={() => handleNavClick('products')}
                          className="text-xs text-lime-brand hover:underline flex items-center gap-1"
                        >
                          View All 60+ Products <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {PRODUCT_CATEGORIES.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => handleNavClick('products', { category: cat.slug })}
                            className="flex items-start gap-3 p-2.5 rounded-xl text-left hover:bg-white/5 border border-transparent hover:border-white/10 transition group"
                          >
                            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-white/10">
                              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-200 group-hover:text-lime-brand transition">
                                {cat.name}
                              </div>
                              <div className="text-[11px] text-slate-400 line-clamp-1">
                                {cat.intro}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('services')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => handleNavClick('services')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full transition ${currentView === 'services' ? 'text-lime-brand bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
                >
                  Services
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180 text-lime-brand' : 'text-slate-500'}`} />
                </button>

                {activeDropdown === 'services' && (
                  <div className="absolute top-full left-0 pt-2 w-[520px] animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="glass-panel-elevated p-5 rounded-2xl shadow-2xl border border-white/10">
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                        <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                          Agency & Production Services
                        </span>
                        <button 
                          onClick={() => handleNavClick('franchise')}
                          className="text-xs text-lime-brand hover:underline flex items-center gap-1"
                        >
                          Franchise Rollout <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {SERVICES.map((srv) => (
                          <button
                            key={srv.id}
                            onClick={() => handleNavClick('services', { serviceId: srv.id })}
                            className="p-2.5 rounded-lg text-left hover:bg-white/5 border border-transparent hover:border-white/10 transition group"
                          >
                            <div className="text-xs font-semibold text-slate-200 group-hover:text-lime-brand transition">
                              {srv.name}
                            </div>
                            <div className="text-[10px] text-slate-500 line-clamp-1">{srv.deliverables.slice(0, 2).join(' · ')}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Solutions Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('solutions')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => handleNavClick('solutions')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full transition ${currentView === 'solutions' ? 'text-lime-brand bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
                >
                  Solutions
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'solutions' ? 'rotate-180 text-lime-brand' : 'text-slate-500'}`} />
                </button>

                {activeDropdown === 'solutions' && (
                  <div className="absolute top-full left-0 pt-2 w-[460px] animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="glass-panel-elevated p-4 rounded-2xl shadow-2xl border border-white/10">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 px-2">
                        What are you looking to do?
                      </span>
                      <div className="grid grid-cols-2 gap-1">
                        {SOLUTIONS.map((sol) => (
                          <button
                            key={sol.id}
                            onClick={() => handleNavClick('solutions', { solutionId: sol.id })}
                            className="p-2 rounded-lg text-left hover:bg-white/5 text-xs font-medium text-slate-300 hover:text-lime-brand transition"
                          >
                            {sol.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Industries Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('industries')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => handleNavClick('industries')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full transition ${currentView === 'industries' ? 'text-lime-brand bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
                >
                  Industries
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'industries' ? 'rotate-180 text-lime-brand' : 'text-slate-500'}`} />
                </button>

                {activeDropdown === 'industries' && (
                  <div className="absolute top-full left-0 pt-2 w-[420px] animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="glass-panel-elevated p-4 rounded-2xl shadow-2xl border border-white/10">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 px-2">
                        Sectors We Produce For
                      </span>
                      <div className="grid grid-cols-2 gap-1">
                        {INDUSTRIES.map((ind) => (
                          <button
                            key={ind.id}
                            onClick={() => handleNavClick('industries', { industryId: ind.id })}
                            className="p-2 rounded-lg text-left hover:bg-white/5 text-xs font-medium text-slate-300 hover:text-lime-brand transition"
                          >
                            {ind.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Our Work */}
              <button 
                onClick={() => handleNavClick('our-work')}
                className={`px-3.5 py-2 rounded-full transition ${currentView === 'our-work' ? 'text-lime-brand bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
              >
                Our Work
              </button>

              {/* Resources Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('resources')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition"
                >
                  Resources
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180 text-lime-brand' : 'text-slate-500'}`} />
                </button>

                {activeDropdown === 'resources' && (
                  <div className="absolute top-full right-0 pt-2 w-[340px] animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="glass-panel-elevated p-4 rounded-2xl shadow-2xl border border-white/10 space-y-1">
                      <button onClick={() => handleNavClick('artwork-guide')} className="w-full text-left p-2 rounded-lg text-xs font-medium text-slate-300 hover:text-lime-brand hover:bg-white/5">
                        Artwork Guidelines (6 Rules)
                      </button>
                      <button onClick={() => handleNavClick('templates')} className="w-full text-left p-2 rounded-lg text-xs font-medium text-slate-300 hover:text-lime-brand hover:bg-white/5">
                        Templates & Dielines
                      </button>
                      <button onClick={() => handleNavClick('material-guide')} className="w-full text-left p-2 rounded-lg text-xs font-medium text-slate-300 hover:text-lime-brand hover:bg-white/5">
                        Material Guide & Substrates
                      </button>
                      <button onClick={() => handleNavClick('faqs')} className="w-full text-left p-2 rounded-lg text-xs font-medium text-slate-300 hover:text-lime-brand hover:bg-white/5">
                        FAQs & Ordering Help
                      </button>
                      <button onClick={() => handleNavClick('blog')} className="w-full text-left p-2 rounded-lg text-xs font-medium text-slate-300 hover:text-lime-brand hover:bg-white/5">
                        Agency Blog & Printing Insights
                      </button>
                      <button onClick={() => handleNavClick('reviews')} className="w-full text-left p-2 rounded-lg text-xs font-medium text-slate-300 hover:text-lime-brand hover:bg-white/5">
                        Client Reviews (4.9★ Google)
                      </button>
                      <button onClick={() => handleNavClick('track-order')} className="w-full text-left p-2 rounded-lg text-xs font-medium text-slate-300 hover:text-lime-brand hover:bg-white/5">
                        Track Order Status
                      </button>
                      <button onClick={() => handleNavClick('trade-account')} className="w-full text-left p-2 rounded-lg text-xs font-medium text-lime-brand hover:bg-white/5 border-t border-white/10 pt-2.5 mt-1">
                        Trade Account (Agencies & Resellers)
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </nav>
          </div>

          {/* Right Action Icons & CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Trigger */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition flex items-center gap-2 group"
              title="Search (Cmd+K)"
            >
              <Search className="w-4 h-4 text-slate-400 group-hover:text-lime-brand transition" />
              <span className="hidden md:inline text-xs text-slate-400 group-hover:text-slate-200">
                Search
              </span>
              <kbd className="hidden lg:inline text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* WhatsApp Quick Order button */}
            <a 
              href="https://wa.me/923213656096?text=Hi%20INPRINT,%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 text-xs font-medium transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Trigger */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white transition group"
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4 text-slate-300 group-hover:text-lime-brand transition" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-lime-brand text-black text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Start a Project Primary CTA */}
            <button 
              onClick={() => handleNavClick('get-a-quote')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full btn-primary text-xs font-semibold shadow-glow-lime"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (3.2 Mobile Header) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-dark-950/98 backdrop-blur-2xl border-t border-white/10 overflow-y-auto p-6 z-50 animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-6">
            
            <div className="flex gap-2">
              <button 
                onClick={() => { setIsSearchOpen(true); setMobileMenuOpen(false); }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300"
              >
                <Search className="w-4 h-4 text-lime-brand" /> Search INPRINT
              </button>
              <button 
                onClick={() => { setIsCartOpen(true); setMobileMenuOpen(false); }}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-lime-brand" /> ({totalCartCount})
              </button>
            </div>

            <div className="space-y-1">
              <button 
                onClick={() => handleNavClick('products')}
                className="w-full text-left py-3 px-4 rounded-xl text-base font-semibold text-white hover:bg-white/5 flex items-center justify-between"
              >
                Products <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>
              <button 
                onClick={() => handleNavClick('services')}
                className="w-full text-left py-3 px-4 rounded-xl text-base font-semibold text-white hover:bg-white/5 flex items-center justify-between"
              >
                Services <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>
              <button 
                onClick={() => handleNavClick('solutions')}
                className="w-full text-left py-3 px-4 rounded-xl text-base font-semibold text-white hover:bg-white/5 flex items-center justify-between"
              >
                Solutions <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>
              <button 
                onClick={() => handleNavClick('industries')}
                className="w-full text-left py-3 px-4 rounded-xl text-base font-semibold text-white hover:bg-white/5 flex items-center justify-between"
              >
                Industries <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>
              <button 
                onClick={() => handleNavClick('our-work')}
                className="w-full text-left py-3 px-4 rounded-xl text-base font-semibold text-white hover:bg-white/5"
              >
                Our Work
              </button>
              <button 
                onClick={() => handleNavClick('franchise')}
                className="w-full text-left py-3 px-4 rounded-xl text-base font-semibold text-lime-brand hover:bg-white/5"
              >
                Franchise Rollout
              </button>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <p className="text-xs font-mono uppercase tracking-wider text-slate-400 px-4">
                Resources
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => handleNavClick('artwork-guide')} className="p-3 rounded-xl bg-white/[0.03] text-xs text-left text-slate-300">
                  Artwork Guidelines
                </button>
                <button onClick={() => handleNavClick('templates')} className="p-3 rounded-xl bg-white/[0.03] text-xs text-left text-slate-300">
                  Templates & Dielines
                </button>
                <button onClick={() => handleNavClick('material-guide')} className="p-3 rounded-xl bg-white/[0.03] text-xs text-left text-slate-300">
                  Material Guide
                </button>
                <button onClick={() => handleNavClick('track-order')} className="p-3 rounded-xl bg-white/[0.03] text-xs text-left text-slate-300">
                  Track My Order
                </button>
                <button onClick={() => handleNavClick('reviews')} className="p-3 rounded-xl bg-white/[0.03] text-xs text-left text-slate-300">
                  Reviews (4.9★)
                </button>
                <button onClick={() => handleNavClick('faqs')} className="p-3 rounded-xl bg-white/[0.03] text-xs text-left text-slate-300">
                  FAQs & Support
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <button 
                onClick={() => handleNavClick('get-a-quote')}
                className="w-full py-3.5 rounded-xl btn-primary text-sm font-bold flex items-center justify-center gap-2"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <a 
                href="https://wa.me/923213656096?text=Hi%20INPRINT,%20I%20have%20an%20enquiry."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-sm font-semibold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp: 0321 3656096
              </a>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
