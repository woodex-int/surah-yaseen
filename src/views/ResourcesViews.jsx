import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ARTWORK_GUIDELINES, TEMPLATES, MATERIALS, FAQS, BLOG_POSTS, REVIEWS } from '../data/inprintData';
import { 
  Download, FileCheck, Layers, BookOpen, MessageSquare, 
  HelpCircle, ArrowRight, ShieldCheck, CheckCircle2, ChevronDown 
} from 'lucide-react';

/* -------------------------------------------------------------
   1. ARTWORK GUIDELINES VIEW
   ------------------------------------------------------------- */
export function ArtworkGuideView() {
  const { navigate } = useApp();

  return (
    <div className="pt-8 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 font-sans bg-black">
      <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-red-brand font-bold">Artwork Guidelines</span>
      </nav>

      <div className="space-y-4 max-w-3xl">
        <span className="pill-badge-red text-[11px] uppercase">
          PRE-FLIGHT SPECIFICATIONS
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          How to prepare your files for flawless print.
        </h1>
        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
          Follow these standards to avoid production delays, color shifts and trimming discrepancies. Our prepress team verifies every file before press setup.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARTWORK_GUIDELINES.map((item, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-[#0D0E12] border border-white/10 space-y-3">
            <span className="text-2xl font-mono font-bold text-red-brand/40 block">
              0{idx + 1}
            </span>
            <h3 className="font-display font-bold text-lg text-white">
              {item.title}
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-[#0D0E12] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-display font-black text-xl text-white">Unsure if your artwork is print-ready?</h3>
          <p className="text-xs text-neutral-400 font-sans mt-1">Send us your file via WhatsApp or email. Our prepress desk will check it free of charge.</p>
        </div>
        <a
          href="https://wa.me/923213656096?text=Hi%20INPRINT,%20can%20you%20pre-flight%20check%20my%20artwork?"
          target="_blank"
          rel="noreferrer"
          className="btn-pill-red text-xs font-bold shrink-0"
        >
          Free Pre-Flight Check on WhatsApp
        </a>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   2. TEMPLATES & DIELINES VIEW
   ------------------------------------------------------------- */
export function TemplatesView() {
  const { navigate, showToast } = useApp();
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'Stationery', 'Packaging', 'Marketing', 'Signage'];

  const filtered = filter === 'all' 
    ? TEMPLATES 
    : TEMPLATES.filter((t) => t.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="pt-8 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 font-sans bg-black">
      <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-red-brand font-bold">Templates & Dielines</span>
      </nav>

      <div className="space-y-4 max-w-3xl">
        <span className="pill-badge-red text-[11px] uppercase">
          VECTOR DIELINES & GUIDES
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          Download exact production templates.
        </h1>
        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
          Standardized template files formatted with bleed lines, safe margins, score lines and fold marks. Compatible with Adobe Illustrator, InDesign and CorelDraw.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none font-mono">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition border ${
              filter === c
                ? 'bg-red-brand text-white border-red-brand'
                : 'bg-white/5 text-neutral-300 border-white/10 hover:text-white'
            }`}
          >
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tpl) => (
          <div key={tpl.id} className="p-5 rounded-2xl bg-[#0D0E12] border border-white/10 flex flex-col justify-between space-y-4 hover:border-red-brand transition">
            <div className="space-y-2">
              <span className="text-[10px] text-red-brand font-bold uppercase font-mono">{tpl.category}</span>
              <h3 className="font-display font-bold text-base text-white">{tpl.title}</h3>
              <p className="text-xs text-neutral-400 font-mono">Dimensions: {tpl.dimensions}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <span className="text-[10px] text-neutral-400 font-mono">{tpl.format}</span>
              <button
                onClick={() => showToast(`Downloading ${tpl.title} template...`)}
                className="btn-pill-white text-xs font-bold flex items-center gap-1.5 py-1.5 px-3"
              >
                <Download className="w-3.5 h-3.5 text-red-brand" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   3. MATERIAL GUIDE VIEW
   ------------------------------------------------------------- */
export function MaterialGuideView() {
  const { navigate } = useApp();

  return (
    <div className="pt-8 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 font-sans bg-black">
      <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-red-brand font-bold">Material Guide</span>
      </nav>

      <div className="space-y-4 max-w-3xl">
        <span className="pill-badge-red text-[11px] uppercase">
          SUBSTRATES & PAPERS
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          Explore paper stocks, cards & rigid boards.
        </h1>
        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
          The tactile quality of your print speaks before a single word is read. Understand weights, textures, rigid boards and outdoor vinyl options.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MATERIALS.map((mat) => (
          <div key={mat.id} className="p-6 rounded-2xl bg-[#0D0E12] border border-white/10 space-y-4">
            <div className="space-y-1">
              <span className="text-red-brand font-bold uppercase text-[10px] font-mono">{mat.category}</span>
              <h3 className="font-display font-bold text-lg text-white">{mat.name}</h3>
              <div className="text-xs text-neutral-400 font-mono">Weight / Caliper: {mat.weight}</div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed font-sans">{mat.description}</p>

            <div className="pt-3 border-t border-white/5 space-y-1 text-xs">
              <span className="text-neutral-500 font-mono text-[10px] uppercase">Best Recommended For:</span>
              <p className="text-white font-medium">{mat.recommendedFor}</p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate('products')}
                className="text-xs text-red-brand hover:underline flex items-center gap-1 font-bold font-mono"
              >
                Find products using this stock →
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-[#0D0E12] border border-white/10 space-y-3">
        <h3 className="font-display font-black text-xl text-white">Want to feel our physical sample swatch book?</h3>
        <p className="text-xs text-neutral-400 max-w-2xl font-sans">
          We provide branded material swatch boxes to advertising agencies, corporate procurement teams and interior architects in Lahore.
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigate('get-a-quote')}
            className="btn-pill-red text-xs font-bold"
          >
            Request Swatch Box to Your Office
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   4. FAQS VIEW
   ------------------------------------------------------------- */
export function FaqsView() {
  const { navigate } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const filtered = FAQS.filter((f) => {
    const matchesSearch = f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === 'all' || f.category.toLowerCase() === selectedCat.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="pt-8 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 font-sans bg-black">
      <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-red-brand font-bold">Frequently Asked Questions</span>
      </nav>

      <div className="space-y-4 max-w-3xl">
        <span className="pill-badge-red text-[11px] uppercase">
          KNOWLEDGE BASE
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          Common production & order questions.
        </h1>
        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
          Clear answers about turnaround times, print-ready files, proof approvals, payment terms and nationwide delivery.
        </p>
      </div>

      {/* Search & Categories */}
      <div className="space-y-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search question keywords (e.g. turnaround, bleed, delivery, payment)..."
          className="w-full pl-5 pr-4 py-3 bg-[#0D0E12] border border-white/10 rounded-full text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-brand font-mono"
        />

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none font-mono">
          {['all', 'General', 'Production', 'Artwork', 'Delivery', 'Signage'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition border ${
                selectedCat === cat
                  ? 'bg-red-brand text-white border-red-brand'
                  : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, i) => (
          <div key={i} className="p-6 rounded-2xl bg-[#0D0E12] border border-white/10 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-white/5 text-red-brand font-mono text-[10px] uppercase font-bold">
                {item.category}
              </span>
            </div>
            <h3 className="font-display font-bold text-base text-white">{item.question}</h3>
            <p className="text-xs text-neutral-300 leading-relaxed font-sans pl-2 border-l-2 border-red-brand/40">
              {item.answer}
            </p>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-[#0D0E12] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Have a question not listed here?</h4>
          <p className="text-xs text-neutral-400 font-sans">Our Lahore production desk answers enquiries 24/7 on WhatsApp.</p>
        </div>
        <a
          href="https://wa.me/923213656096?text=Hi%20INPRINT,%20I%20have%20a%20question%20about%20a%20print%20order."
          target="_blank"
          rel="noreferrer"
          className="btn-pill-red text-xs font-bold"
        >
          Ask on WhatsApp
        </a>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   5. BLOG & INSIGHTS VIEW
   ------------------------------------------------------------- */
export function BlogView() {
  const { navigate } = useApp();

  return (
    <div className="pt-8 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 font-sans bg-black">
      <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-red-brand font-bold">Agency Blog</span>
      </nav>

      <div className="space-y-4 max-w-3xl">
        <span className="pill-badge-red text-[11px] uppercase">
          PRINT PRODUCTION & BRANDING INSIGHTS
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          Articles on fabrication, substrates & branding.
        </h1>
        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-sans">
          Expert guides written by our production engineers and brand designers in Lahore.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BLOG_POSTS.map((post) => (
          <div key={post.id} className="p-6 rounded-3xl bg-[#0D0E12] border border-white/10 flex flex-col justify-between space-y-4 group hover:border-red-brand transition">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span className="text-red-brand font-bold">{post.category}</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="font-display font-bold text-lg text-white group-hover:text-red-brand transition">
                {post.title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                {post.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-500">{post.date}</span>
              <span className="text-white font-bold group-hover:text-red-brand flex items-center gap-1">
                Read article →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   6. VERIFIED REVIEWS VIEW
   ------------------------------------------------------------- */
export function ReviewsView() {
  const { navigate } = useApp();

  return (
    <div className="pt-8 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 font-sans bg-black">
      <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-red-brand font-bold">Client Reviews</span>
      </nav>

      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-3">
          <div className="flex text-red-brand text-base font-bold">★★★★★</div>
          <span className="pill-badge-red text-xs font-mono">
            4.9 / 5.0 VERIFIED GOOGLE RATING
          </span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          What founders, brand managers & agencies say.
        </h1>
        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-sans">
          Every review represents a real production delivery in Lahore and across Pakistan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REVIEWS.map((rev) => (
          <div key={rev.id} className="p-6 rounded-2xl bg-[#0D0E12] border border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-red-brand text-xs font-bold">★★★★★</div>
                <span className="text-[10px] font-mono text-neutral-500">{rev.date}</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans italic">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white font-display">{rev.author}</h4>
                <div className="text-[10px] text-neutral-400 font-sans">{rev.role}, {rev.company}</div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400">
                {rev.product}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-3xl bg-[#0D0E12] border border-white/10 text-center space-y-4">
        <h3 className="font-display font-black text-2xl text-white">Ready to experience verified print excellence?</h3>
        <p className="text-xs text-neutral-400 max-w-md mx-auto font-sans">
          Send us your next project brief or place an order through our catalog.
        </p>
        <button
          onClick={() => navigate('get-a-quote')}
          className="btn-pill-red text-xs font-bold"
        >
          Start a Project with INPRINT
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   7. TRADE & AGENCY ACCOUNTS VIEW
   ------------------------------------------------------------- */
export function TradeAccountView() {
  const { navigate, showToast } = useApp();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Trade account application submitted! Our team will contact you.');
  };

  return (
    <div className="pt-8 pb-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 font-sans bg-black">
      <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-red-brand font-bold">Trade Account</span>
      </nav>

      <div className="space-y-4 max-w-3xl">
        <span className="pill-badge-red text-[11px] uppercase">
          B2B PARTNERSHIP PROGRAM
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          Wholesale rates & dedicated support for agencies.
        </h1>
        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-sans">
          Are you a design agency, interior architect, event manager or marketing director? Get pre-negotiated wholesale pricing, priority press slots and blind drop-shipping to your clients.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-[#0D0E12] border border-white/10 space-y-2">
          <CheckCircle2 className="w-5 h-5 text-red-brand" />
          <h4 className="font-display font-bold text-white text-base">Trade Discounts</h4>
          <p className="text-xs text-neutral-400 font-sans">Tiered volume pricing up to 25% off catalog retail for regular production accounts.</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#0D0E12] border border-white/10 space-y-2">
          <CheckCircle2 className="w-5 h-5 text-red-brand" />
          <h4 className="font-display font-bold text-white text-base">Dedicated Manager</h4>
          <p className="text-xs text-neutral-400 font-sans">Direct line to a single senior production coordinator in Lahore.</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#0D0E12] border border-white/10 space-y-2">
          <CheckCircle2 className="w-5 h-5 text-red-brand" />
          <h4 className="font-display font-bold text-white text-base">Blind White-Label</h4>
          <p className="text-xs text-neutral-400 font-sans">We deliver direct to your end-client in unbranded packaging with your delivery notes.</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#0D0E12] border border-white/10 space-y-2">
          <CheckCircle2 className="w-5 h-5 text-red-brand" />
          <h4 className="font-display font-bold text-white text-base">Priority Fast-Track</h4>
          <p className="text-xs text-neutral-400 font-sans">Guaranteed next-on-press scheduling for urgent campaign deadlines.</p>
        </div>
      </div>

      {/* Application Form */}
      <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-[#0D0E12] border border-white/10 space-y-6">
        <div className="text-center space-y-2">
          <h3 className="font-display font-black text-2xl text-white">Apply for a Trade Account</h3>
          <p className="text-xs text-neutral-400 font-sans">Verification takes less than 24 hours.</p>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-red-brand mx-auto" />
            <h4 className="text-lg font-bold text-white font-display">Application Received</h4>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto font-sans">
              Our B2B team will review your business credentials and contact you within 24 hours to activate your trade pricing tier.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-neutral-400">Agency / Business Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pixel Studio Lahore"
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans"
                />
              </div>
              <div className="space-y-1">
                <label className="text-neutral-400">Primary Contact Person *</label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-neutral-400">Business Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="03XX XXXXXXX"
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans"
                />
              </div>
              <div className="space-y-1">
                <label className="text-neutral-400">Work Email *</label>
                <input
                  type="email"
                  required
                  placeholder="contact@agency.pk"
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400">Business Type</label>
              <select className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans">
                <option>Creative / Branding Agency</option>
                <option>Interior Architect / Spatial Designer</option>
                <option>Event Management Company</option>
                <option>Corporate Procurement / Marketing Team</option>
                <option>Franchise Operator / Multi-branch Retail</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400">City & Office Address</label>
              <input
                type="text"
                placeholder="Lahore / Karachi / Islamabad"
                className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans"
              />
            </div>

            <div className="space-y-1">
              <label className="text-neutral-400">Estimated Monthly Print Spend</label>
              <select className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans">
                <option>Under Rs. 100,000 / month</option>
                <option>Rs. 100,000 – Rs. 500,000 / month</option>
                <option>Rs. 500,000 – Rs. 2,000,000 / month</option>
                <option>Rs. 2,000,000+ / month (Enterprise)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full btn-pill-red text-xs font-bold uppercase tracking-wider"
            >
              Submit Trade Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
