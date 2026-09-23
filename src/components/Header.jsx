import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BRAND, PRODUCT_CATEGORIES, SERVICES, SOLUTIONS, INDUSTRIES } from '../data/inprintData';
import { 
  Search, ShoppingBag, MessageSquare, ChevronDown, Menu, X, ArrowUpRight, 
  Sparkles, Layers, ShieldCheck, MapPin, Truck, Phone, Globe, ArrowRight 
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
      
      {/* Utility Bar (Minimalist Dark) */}
      <div className="hidden lg:block bg-black/95 border-b border-white/[0.06] backdrop-blur-md py-1.5 px-6 text-xs text-neutral-400 font-mono">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-white font-medium">
              <span className="text-amber-400">★</span> 4.9 on Google (Lahore)
            </span>
            <span className="flex items-center gap-1.5 text-neutral-400 hover:text-white cursor-pointer transition" onClick={() => handleNavClick('artwork-guide')}>
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" /> Free artwork pre-flight check
            </span>
            <span className="flex items-center gap-1.5 text-neutral-400">
              <MapPin className="w-3.5 h-3.5 text-neutral-500" /> Model Town facility
            </span>
            <span className="flex items-center gap-1.5 text-neutral-400">
              <Truck className="w-3.5 h-3.5 text-neutral-500" /> Nationwide delivery
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-neutral-500 text-[11px]">Online enquiries 24/7</span>
            <a 
              href="https://wa.me/923213656096?text=Hi%20INPRINT,%20I%20have%20an%20enquiry."
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp: 0321 3656096</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Minimalist Header (Excited.agency style) */}
      <div className={`transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl py-3.5' : 'bg-black/80 backdrop-blur-md border-b border-white/[0.05] py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo (Excited! inspired clean wordmark) */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 text-left group"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-excited-coral group-hover:scale-125 transition-transform" />
              <span className="font-display font-black tracking-tight text-2xl text-white">
                INPRINT<span className="text-excited-coral font-bold">!</span>
              </span>
            </button>

            {/* Desktop Navigation Links (Excited.agency style pill tabs) */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
              
              <button 
                onClick={() => handleNavClick('our-work')}
                className={`px-3.5 py-1.5 rounded-full transition ${currentView === 'our-work' ? 'text-white bg-white/10' : 'text-neutral-300 hover:text-white hover:bg-white/5'}`}
              >
                Works
              </button>

              {/* Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('services')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => handleNavClick('services')}
                  className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full transition ${currentView === 'services' ? 'text-white bg-white/10' : 'text-neutral-300 hover:text-white hover:bg-white/5'}`}
                >
                  Services
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>

                {activeDropdown === 'services' && (
                  <div className="absolute top-full left-0 pt-2 w-[520px] animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="bg-[#111216] p-5 rounded-3xl shadow-2xl border border-white/10">
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                        <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                          Services & Approach
                        </span>
                        <button 
                          onClick={() => handleNavClick('franchise')}
                          className="text-xs text-excited-coral hover:underline flex items-center gap-1"
                        >
                          Franchise Rollout <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {SERVICES.map((srv) => (
                          <button
                            key={srv.id}
                            onClick={() => handleNavClick('services', { serviceId: srv.id })}
                            className="p-2.5 rounded-xl text-left hover:bg-white/5 border border-transparent hover:border-white/10 transition group"
                          >
                            <div className="text-xs font-semibold text-neutral-200 group-hover:text-white transition">
                              {srv.name}
                            </div>
                            <div className="text-[10px] text-neutral-500 line-clamp-1">{srv.deliverables.slice(0, 2).join(' · ')}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Products Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('products')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => handleNavClick('products')}
                  className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full transition ${currentView === 'products' ? 'text-white bg-white/10' : 'text-neutral-300 hover:text-white hover:bg-white/5'}`}
                >
                  Products
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>

                {activeDropdown === 'products' && (
                  <div className="absolute top-full left-0 pt-2 w-[580px] animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="bg-[#111216] p-5 rounded-3xl shadow-2xl border border-white/10">
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                        <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                          Production Catalog
                        </span>
                        <button 
                          onClick={() => handleNavClick('products')}
                          className="text-xs text-excited-coral hover:underline flex items-center gap-1"
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
                              <div className="text-xs font-semibold text-neutral-200 group-hover:text-white transition">
                                {cat.name}
                              </div>
                              <div className="text-[11px] text-neutral-400 line-clamp-1">
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

              {/* Solutions */}
              <button 
                onClick={() => handleNavClick('solutions')}
                className={`px-3.5 py-1.5 rounded-full transition ${currentView === 'solutions' ? 'text-white bg-white/10' : 'text-neutral-300 hover:text-white hover:bg-white/5'}`}
              >
                Solutions
              </button>

              {/* Franchise */}
              <button 
                onClick={() => handleNavClick('franchise')}
                className={`px-3.5 py-1.5 rounded-full transition ${currentView === 'franchise' ? 'text-white bg-white/10' : 'text-neutral-300 hover:text-white hover:bg-white/5'}`}
              >
                Franchise
              </button>

              {/* Resources Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('resources')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-neutral-300 hover:text-white hover:bg-white/5 transition"
                >
                  Resources
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>

                {activeDropdown === 'resources' && (
                  <div className="absolute top-full right-0 pt-2 w-[320px] animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="bg-[#111216] p-4 rounded-3xl shadow-2xl border border-white/10 space-y-1">
                      <button onClick={() => handleNavClick('artwork-guide')} className="w-full text-left p-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/5">
                        Artwork Guidelines (6 Rules)
                      </button>
                      <button onClick={() => handleNavClick('templates')} className="w-full text-left p-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/5">
                        Templates & Dielines
                      </button>
                      <button onClick={() => handleNavClick('material-guide')} className="w-full text-left p-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/5">
                        Material Guide
                      </button>
                      <button onClick={() => handleNavClick('track-order')} className="w-full text-left p-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/5">
                        Track Order Status
                      </button>
                      <button onClick={() => handleNavClick('reviews')} className="w-full text-left p-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/5">
                        Google Reviews (4.9★)
                      </button>
                      <button onClick={() => handleNavClick('faqs')} className="w-full text-left p-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/5">
                        FAQs & Ordering Help
                      </button>
                      <button onClick={() => handleNavClick('trade-account')} className="w-full text-left p-2 rounded-xl text-xs font-medium text-excited-coral hover:bg-white/5 border-t border-white/10 pt-2.5 mt-1">
                        Trade Account (Agencies)
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </nav>
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Trigger */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition flex items-center gap-2"
              title="Search (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden md:inline text-xs text-neutral-400">
                Search
              </span>
              <kbd className="hidden lg:inline text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-neutral-400">
                ⌘K
              </kbd>
            </button>

            {/* Cart Trigger */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition flex items-center gap-1.5"
              title="View Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-xs font-mono">({totalCartCount})</span>
            </button>

            {/* Language / Region indicator */}
            <div className="hidden xl:flex items-center gap-1 text-xs font-mono text-neutral-400 px-2">
              <span>PK / En</span>
            </div>

            {/* Contact Us (Excited.agency style pill button) */}
            <button 
              onClick={() => handleNavClick('get-a-quote')}
              className="px-5 py-2 rounded-full btn-pill-white text-xs font-bold"
            >
              Contact us
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-black/98 backdrop-blur-2xl border-t border-white/10 overflow-y-auto p-6 z-50 animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-6">
            
            <div className="flex gap-2">
              <button 
                onClick={() => { setIsSearchOpen(true); setMobileMenuOpen(false); }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-neutral-300"
              >
                <Search className="w-4 h-4 text-excited-coral" /> Search
              </button>
              <button 
                onClick={() => { setIsCartOpen(true); setMobileMenuOpen(false); }}
                className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-neutral-300 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-excited-coral" /> ({totalCartCount})
              </button>
            </div>

            <div className="space-y-1">
              <button onClick={() => handleNavClick('our-work')} className="w-full text-left py-3 px-4 rounded-xl text-base font-semibold text-white hover:bg-white/5">
                Works
              </button>
              <button onClick={() => handleNavClick('services')} className="w-full text-left py-3 px-4 rounded-xl text-base font-semibold text-white hover:bg-white/5">
                Services
              </button>
              <button onClick={() => handleNavClick('products')} className="w-full text-left py-3 px-4 rounded-xl text-base font-semibold text-white hover:bg-white/5">
                Products
              </button>
              <button onClick={() => handleNavClick('solutions')} className="w-full text-left py-3 px-4 rounded-xl text-base font-semibold text-white hover:bg-white/5">
                Solutions
              </button>
              <button onClick={() => handleNavClick('franchise')} className="w-full text-left py-3 px-4 rounded-xl text-base font-semibold text-excited-coral hover:bg-white/5">
                Franchise Rollout
              </button>
              <button onClick={() => handleNavClick('track-order')} className="w-full text-left py-3 px-4 rounded-xl text-base font-semibold text-neutral-300 hover:bg-white/5">
                Track Order Status
              </button>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <button 
                onClick={() => handleNavClick('get-a-quote')}
                className="w-full py-3.5 rounded-full btn-pill-white text-xs font-bold uppercase tracking-wider"
              >
                Contact us
              </button>
              <a 
                href="https://wa.me/923213656096?text=Hi%20INPRINT,%20I%20have%20an%20enquiry."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" /> WhatsApp: 0321 3656096
              </a>
            </div>

          </div>
        </div>
      )}

    </header>
  );
}
