import React from 'react';
import { useApp } from '../context/AppContext';
import { BRAND, PRODUCT_CATEGORIES } from '../data/inprintData';
import { 
  ArrowUpRight, MapPin, Phone, MessageSquare, Globe, 
  ShieldCheck, Heart, Sparkles 
} from 'lucide-react';

export default function Footer() {
  const { navigate } = useApp();

  return (
    <footer className="bg-dark-950 border-t border-white/10 text-slate-400 font-sans pt-16 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top agency headline & CTA */}
        <div className="pb-12 mb-12 border-b border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-lime-brand flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Lahore's Creative Production Agency
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              From idea to brand launch. Design to delivery.
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('get-a-quote')}
              className="px-5 py-3 rounded-full btn-primary text-xs font-bold shadow-glow-lime flex items-center gap-1.5"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/923213656096?text=Hi%20INPRINT,%20I%20have%20an%20enquiry."
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center gap-2 transition"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp 0321 3656096</span>
            </a>
          </div>
        </div>

        {/* 4 Main Footer Columns + Intro */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Intro & Contact */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-lime-brand text-black font-extrabold text-xs flex items-center justify-center font-display">
                IN
              </div>
              <span className="font-display font-black text-lg text-white tracking-wider">
                INPRINT
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              INPRINT is a creative production agency in Lahore. We develop brands, design campaigns, produce print and physical brand assets, and deliver complete brand experiences for businesses across Pakistan.
            </p>

            <div className="pt-2 space-y-2 text-xs font-mono">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-lime-brand shrink-0 mt-0.5" />
                <span>M-71, Zainab Tower, Model Town Link Road, Lahore, 54700</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-lime-brand shrink-0" />
                <a href="tel:03213656096" className="hover:text-white transition">0321 3656096</a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Globe className="w-4 h-4 text-lime-brand shrink-0" />
                <span>inprint.pk</span>
              </div>
            </div>
          </div>

          {/* Col 2: Products */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-200 mb-4">
              Products
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('products', { category: 'business-essentials' })} className="hover:text-lime-brand transition">
                  Business Essentials
                </button>
              </li>
              <li>
                <button onClick={() => navigate('products', { category: 'marketing-print' })} className="hover:text-lime-brand transition">
                  Marketing Print
                </button>
              </li>
              <li>
                <button onClick={() => navigate('products', { category: 'flex-large-format' })} className="hover:text-lime-brand transition">
                  Flex & Large Format
                </button>
              </li>
              <li>
                <button onClick={() => navigate('products', { category: 'signage' })} className="hover:text-lime-brand transition">
                  Signage
                </button>
              </li>
              <li>
                <button onClick={() => navigate('products', { category: 'packaging' })} className="hover:text-lime-brand transition">
                  Packaging
                </button>
              </li>
              <li>
                <button onClick={() => navigate('products', { category: 'exhibition-retail' })} className="hover:text-lime-brand transition">
                  Exhibition & Retail
                </button>
              </li>
              <li>
                <button onClick={() => navigate('products', { category: 'merchandise-gifts' })} className="hover:text-lime-brand transition">
                  Merchandise & Gifts
                </button>
              </li>
              <li>
                <button onClick={() => navigate('products', { category: 'apparel-uniforms' })} className="hover:text-lime-brand transition">
                  Apparel & Uniforms
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-200 mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('services', { serviceId: 'brand-identity-branding' })} className="hover:text-lime-brand transition">
                  Brand Identity
                </button>
              </li>
              <li>
                <button onClick={() => navigate('services', { serviceId: 'advertising-campaign-production' })} className="hover:text-lime-brand transition">
                  Advertising Production
                </button>
              </li>
              <li>
                <button onClick={() => navigate('services', { serviceId: 'signage-fabrication' })} className="hover:text-lime-brand transition">
                  Signage & Fabrication
                </button>
              </li>
              <li>
                <button onClick={() => navigate('services', { serviceId: 'packaging-systems' })} className="hover:text-lime-brand transition">
                  Packaging Systems
                </button>
              </li>
              <li>
                <button onClick={() => navigate('services', { serviceId: 'exhibition-stalls' })} className="hover:text-lime-brand transition">
                  Exhibition Stalls
                </button>
              </li>
              <li>
                <button onClick={() => navigate('services', { serviceId: 'corporate-printing' })} className="hover:text-lime-brand transition">
                  Corporate Printing
                </button>
              </li>
              <li>
                <button onClick={() => navigate('franchise')} className="hover:text-lime-brand transition text-lime-brand font-medium">
                  Franchise Rollout
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-200 mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('artwork-guide')} className="hover:text-lime-brand transition">
                  Artwork Guidelines
                </button>
              </li>
              <li>
                <button onClick={() => navigate('templates')} className="hover:text-lime-brand transition">
                  Templates & Dielines
                </button>
              </li>
              <li>
                <button onClick={() => navigate('material-guide')} className="hover:text-lime-brand transition">
                  Material Guide
                </button>
              </li>
              <li>
                <button onClick={() => navigate('faqs')} className="hover:text-lime-brand transition">
                  FAQs
                </button>
              </li>
              <li>
                <button onClick={() => navigate('our-work')} className="hover:text-lime-brand transition">
                  Our Work
                </button>
              </li>
              <li>
                <button onClick={() => navigate('reviews')} className="hover:text-lime-brand transition">
                  Google Reviews (4.9★)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('track-order')} className="hover:text-lime-brand transition text-slate-300 font-medium">
                  Track Order
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Company */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-200 mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('home')} className="hover:text-lime-brand transition">
                  About INPRINT
                </button>
              </li>
              <li>
                <button onClick={() => navigate('book-site-visit')} className="hover:text-lime-brand transition">
                  Book a Site Visit (Lahore)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('trade-account')} className="hover:text-lime-brand transition text-lime-brand">
                  Trade Account (Resellers)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('account')} className="hover:text-lime-brand transition">
                  Client Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigate('faqs')} className="hover:text-lime-brand transition">
                  Delivery Information
                </button>
              </li>
              <li>
                <button onClick={() => navigate('faqs')} className="hover:text-lime-brand transition">
                  Returns & Reprints
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Safe Operational Disclosure & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2 text-center md:text-left">
            <ShieldCheck className="w-4 h-4 text-lime-brand shrink-0" />
            <span>
              Online enquiries accepted 24/7. Production and dispatch times vary by product and project.
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>© 2026 INPRINT Lahore. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-slate-400">Model Town Link Road</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
