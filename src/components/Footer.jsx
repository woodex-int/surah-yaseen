import React from 'react';
import { useApp } from '../context/AppContext';
import { BRAND, PRODUCT_CATEGORIES } from '../data/inprintData';
import { ArrowUpRight, MapPin, Phone, MessageSquare, Globe, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const { navigate } = useApp();

  return (
    <footer className="bg-black border-t border-white/10 text-neutral-400 font-sans pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-14">
        
        {/* Top Agency Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand Wordmark */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-brand" />
              <span className="font-display font-black text-2xl text-white tracking-tight">
                INPRINT<span className="text-red-brand">!</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Creative production agency in Lahore. We develop brands, design campaigns, produce print and physical brand assets, and deliver complete brand experiences across Pakistan.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2 text-xs font-mono">
            <div className="text-white font-bold mb-3 uppercase tracking-wider font-display">Directory</div>
            <div>
              <button onClick={() => navigate('our-work')} className="hover:text-white transition">Works</button>
            </div>
            <div>
              <button onClick={() => navigate('services')} className="hover:text-white transition">Services</button>
            </div>
            <div>
              <button onClick={() => navigate('products')} className="hover:text-white transition">Products (60+)</button>
            </div>
            <div>
              <button onClick={() => navigate('franchise')} className="text-red-brand hover:underline transition font-bold">Franchise Rollout</button>
            </div>
            <div>
              <button onClick={() => navigate('get-a-quote')} className="hover:text-white transition">Contact us</button>
            </div>
          </div>

          {/* Col 3: Resources */}
          <div className="space-y-2 text-xs font-mono">
            <div className="text-white font-bold mb-3 uppercase tracking-wider font-display">Resources</div>
            <div>
              <button onClick={() => navigate('artwork-guide')} className="hover:text-white transition">Artwork Guidelines</button>
            </div>
            <div>
              <button onClick={() => navigate('templates')} className="hover:text-white transition">Templates & Dielines</button>
            </div>
            <div>
              <button onClick={() => navigate('material-guide')} className="hover:text-white transition">Material Guide</button>
            </div>
            <div>
              <button onClick={() => navigate('track-order')} className="hover:text-white transition">Track Order</button>
            </div>
            <div>
              <button onClick={() => navigate('blog')} className="hover:text-white transition">Blog & Insights</button>
            </div>
          </div>

          {/* Col 4: Verified Lahore Location */}
          <div className="space-y-3 text-xs font-mono">
            <div className="text-white font-bold mb-3 uppercase tracking-wider font-display">Atelier & Plant</div>
            <div className="flex items-start gap-2 text-neutral-300">
              <MapPin className="w-4 h-4 text-red-brand shrink-0 mt-0.5" />
              <span>M-71, Zainab Tower, Model Town Link Road, Lahore, 54700</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <Phone className="w-4 h-4 text-red-brand shrink-0" />
              <a href="tel:03213656096" className="hover:text-white transition">0321 3656096</a>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <Globe className="w-4 h-4 text-red-brand shrink-0" />
              <span>inprint.pk</span>
            </div>
          </div>

          {/* Col 5: Google Rating Badge in strict White, Black & Red */}
          <div className="p-5 rounded-2xl bg-[#0D0E12] border border-white/10 space-y-2 text-xs font-mono">
            <div className="text-red-brand text-xs font-bold flex items-center gap-1">
              ★★★★★ 4.9 RATING
            </div>
            <div className="text-white font-bold font-sans">Verified Google Reviews</div>
            <p className="text-[11px] text-neutral-400 font-sans">
              Highest rated creative print and architectural signage partner in Lahore.
            </p>
            <button
              onClick={() => navigate('reviews')}
              className="text-[11px] text-red-brand hover:underline block pt-1 font-bold"
            >
              Read all verified reviews →
            </button>
          </div>

        </div>

        {/* All Services Horizontal Pill List */}
        <div className="pt-8 border-t border-white/10 space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
            All Production Services
          </span>
          <div className="flex flex-wrap gap-2 text-[11px] font-mono text-neutral-400">
            {[
              'Brand Identity', 'Packaging Systems', 'Luxury Boxes', 'Food Packaging',
              '3D Letter Signage', 'Halo LED Backlit', 'Acrylic Fabrication', 'Channel Letters',
              'Panna Flex Printing', 'Vehicle Branding', 'Exhibition Stalls', 'Tension Backdrops',
              'Business Cards', 'Corporate Stationery', 'Company Profiles', 'Diaries & Notebooks',
              'Shopping Bags', 'Stickers & Labels', 'Uniforms & Apparel', 'Franchise Rollout'
            ].map((service, i) => (
              <span key={i} className="hover:text-white cursor-pointer transition">
                {service} {i < 19 && '·'}
              </span>
            ))}
          </div>
        </div>

        {/* Safe Operational Disclosure & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-2 text-center md:text-left">
            <ShieldCheck className="w-4 h-4 text-red-brand shrink-0" />
            <span>
              Online enquiries accepted 24/7. Production and dispatch times vary by product and project.
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>© 2026 INPRINT Lahore. All rights reserved.</span>
            <span>·</span>
            <button onClick={() => navigate('trade-account')} className="hover:text-white">Trade Accounts</button>
          </div>
        </div>

      </div>
    </footer>
  );
}
