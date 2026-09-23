import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ARTWORK_RULES, TEMPLATES_CATALOG, MATERIALS_DB, FAQS, 
  BLOG_POSTS, REVIEWS, createWhatsAppUrl 
} from '../data/inprintData';
import { 
  Download, ShieldCheck, CheckCircle2, Search, ArrowRight, 
  MessageSquare, Layers, FileText, Star, Briefcase, HelpCircle, 
  Send, ExternalLink 
} from 'lucide-react';

/* =========================================================================
   17.1 ARTWORK GUIDELINES
   ========================================================================= */
export function ArtworkGuideView() {
  const { navigate, showToast } = useApp();

  return (
    <div className="pt-8 pb-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-12">
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-lime-brand">Artwork Guidelines</span>
      </nav>

      <div className="space-y-4 max-w-3xl">
        <span className="agency-pill text-lime-brand border-lime-brand/30 text-[11px] font-mono uppercase">
          PRE-PRESS SPECIFICATIONS
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          Prepare artwork for production.
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Follow our 6 essential rules to ensure crisp lines, accurate color calibration, and flawless cutting on every job.
        </p>
      </div>

      {/* Six Master Rules from Section 17 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ARTWORK_RULES.map((rule) => (
          <div key={rule.number} className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/10 space-y-3">
            <span className="text-2xl font-mono font-bold text-lime-brand/40 block">
              {rule.number}
            </span>
            <h3 className="font-display font-bold text-lg text-white">{rule.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {rule.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-lime-brand/10 to-dark-850 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-display font-bold text-xl text-white">Not sure if your file is ready?</h3>
          <p className="text-xs text-slate-400 mt-1">Our pre-flight technicians will verify your PDF bleeds and resolution free of charge.</p>
        </div>
        <button
          onClick={() => {
            navigate('get-a-quote');
          }}
          className="px-6 py-3 rounded-full btn-primary text-xs font-bold shrink-0 shadow-glow-lime"
        >
          Upload Artwork for Review
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   17.2 TEMPLATES & DIELINES
   ========================================================================= */
export function TemplatesView() {
  const { navigate, showToast } = useApp();
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'Business Cards', 'Flyers', 'Packaging', 'Bags', 'Roll-Up Banners', 'Labels'];

  const filtered = selectedCat === 'All'
    ? TEMPLATES_CATALOG
    : TEMPLATES_CATALOG.filter((t) => t.category === selectedCat);

  return (
    <div className="pt-8 pb-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-lime-brand">Templates & Dielines</span>
      </nav>

      <div className="space-y-4 max-w-3xl">
        <span className="agency-pill text-lime-brand border-lime-brand/30 text-[11px] font-mono uppercase">
          VECTOR PRESS MASTERS
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          Download templates before you design.
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Always confirm the template version before sending final artwork. All files include bleed margins and safety boundaries.
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
              selectedCat === cat
                ? 'bg-lime-brand text-black border-lime-brand shadow-glow-lime'
                : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* File Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tpl) => (
          <div key={tpl.id} className="p-6 rounded-3xl bg-dark-900 border border-white/10 flex flex-col justify-between space-y-4 font-mono text-xs">
            <div className="space-y-2">
              <span className="text-[10px] text-lime-brand font-bold uppercase">{tpl.category}</span>
              <h3 className="font-display font-bold text-base text-white font-sans">{tpl.name}</h3>
              <div className="text-slate-400 text-[11px] space-y-1">
                <div>Dimensions: <span className="text-slate-200">{tpl.size}</span></div>
                <div>Formats: <span className="text-slate-200">{tpl.fileFormat}</span></div>
                <div className="text-slate-500 text-[10px]">Updated: {tpl.lastUpdated}</div>
              </div>
            </div>

            <button
              onClick={() => showToast(`Downloaded vector template: ${tpl.name}`)}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <Download className="w-3.5 h-3.5 text-lime-brand" />
              <span>Download Vector Dieline</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   17.3 MATERIAL GUIDE
   ========================================================================= */
export function MaterialGuideView() {
  const { navigate } = useApp();

  return (
    <div className="pt-8 pb-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-lime-brand">Material Guide</span>
      </nav>

      <div className="space-y-4 max-w-3xl">
        <span className="agency-pill text-lime-brand border-lime-brand/30 text-[11px] font-mono uppercase">
          SUBSTRATES & FINISHES
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          Choose the right material for the job.
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          From textured cotton business cards to UV-resistant outdoor polymeric vinyl, explore how different substrates perform in Pakistan's climate.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MATERIALS_DB.map((mat, idx) => (
          <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/10 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <span className="text-lime-brand font-bold uppercase">{mat.category}</span>
              <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300 text-[10px]">{mat.indoorOutdoor}</span>
            </div>

            <h3 className="font-display font-bold text-lg text-white font-sans">{mat.name}</h3>

            <div className="space-y-2 text-slate-300">
              <div><strong className="text-slate-400">Best for:</strong> {mat.bestFor}</div>
              <div><strong className="text-slate-400">Appearance:</strong> {mat.appearance}</div>
              <div><strong className="text-slate-400">Durability:</strong> {mat.durability}</div>
              <div><strong className="text-slate-400">Typical Applications:</strong> {mat.typicalApps}</div>
            </div>

            <div className="pt-3 border-t border-white/5">
              <a
                href={`https://wa.me/923213656096?text=Hi%20INPRINT,%20I%20am%20asking%20about%20substrate:%20${encodeURIComponent(mat.name)}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-lime-brand hover:underline flex items-center gap-1 font-bold"
              >
                Request a Sample or Recommendation →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   17.4 FAQS VIEW
   ========================================================================= */
export function FaqsView() {
  const { navigate } = useApp();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Ordering', 'Artwork', 'Production', 'Delivery', 'Installation', 'Payments'];

  const filteredFaqs = FAQS.filter((f) => {
    const matchesCat = activeCategory === 'All' || f.category === activeCategory;
    const matchesSearch = !search.trim() || f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-8 pb-24 px-4 sm:px-6 max-w-4xl mx-auto space-y-12">
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-lime-brand">Frequently Asked Questions</span>
      </nav>

      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="agency-pill text-lime-brand border-lime-brand/30 text-[11px] font-mono uppercase">
          HELP & SUPPORT DESK
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          How can we help?
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          Find answers on ordering, artwork specs, turnaround times, and delivery across Pakistan.
        </p>

        {/* Search */}
        <div className="relative max-w-md mx-auto pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs (e.g. proof, minimum quantity, delivery)..."
            className="w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-white/10 rounded-full text-xs text-white placeholder-slate-500 focus:outline-none focus:border-lime-brand font-mono"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
              activeCategory === c
                ? 'bg-lime-brand text-black border-lime-brand'
                : 'bg-white/5 text-slate-300 border-white/10'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* FAQs List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, i) => (
          <div key={i} className="p-6 rounded-2xl bg-dark-900 border border-white/10 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-white/5 text-lime-brand font-mono text-[10px] uppercase">
                {faq.category}
              </span>
              <h3 className="font-display font-bold text-base text-white">{faq.question}</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans pl-2 border-l-2 border-lime-brand/30">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>

      {/* Contact box */}
      <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-2">
        <h4 className="font-display font-bold text-base text-white">Have a question not listed here?</h4>
        <p className="text-xs text-slate-400">Speak directly to our Lahore production specialists.</p>
        <div className="pt-2">
          <a
            href="https://wa.me/923213656096?text=Hi%20INPRINT,%20I%20have%20a%20question%20not%20in%20your%20FAQ."
            target="_blank"
            rel="noreferrer"
            className="agency-pill text-emerald-400 border-emerald-500/30"
          >
            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp 0321 3656096
          </a>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   17.5 BLOG VIEW
   ========================================================================= */
export function BlogView() {
  const { navigate } = useApp();

  return (
    <div className="pt-8 pb-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-lime-brand">Agency Blog</span>
      </nav>

      <div className="space-y-4 max-w-3xl">
        <span className="agency-pill text-lime-brand border-lime-brand/30 text-[11px] font-mono uppercase">
          PRODUCTION INSIGHTS
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          Printing tips, guides & design principles.
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Tactical advice from our printing press and fabrication floor in Lahore to help you avoid production blunders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BLOG_POSTS.map((post) => (
          <div key={post.id} className="p-6 rounded-3xl bg-dark-900 border border-white/10 flex flex-col justify-between space-y-4 group hover:border-lime-brand/40 transition">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                <span className="text-lime-brand">{post.category}</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="font-display font-bold text-lg text-white group-hover:text-lime-brand transition">
                {post.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {post.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">{post.date}</span>
              <span className="text-white font-bold group-hover:text-lime-brand flex items-center gap-1">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   18. REVIEWS VIEW (Verified Google Reviews)
   ========================================================================= */
export function ReviewsView() {
  const { navigate } = useApp();

  return (
    <div className="pt-8 pb-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-12">
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-lime-brand">Client Reviews</span>
      </nav>

      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2">
          <div className="flex text-amber-400 text-base">★★★★★</div>
          <span className="agency-pill text-lime-brand border-lime-brand/30 text-xs font-mono">
            ★ 4.9 on Google Business Profile
          </span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          What clients say about working with INPRINT.
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Read verified feedback from customers who have worked with us on print, branding, signage, packaging and production projects in Lahore and across Pakistan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REVIEWS.map((rev) => (
          <div key={rev.id} className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400 text-xs">★★★★★</div>
                <span className="text-[10px] font-mono text-slate-400">{rev.date}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                "{rev.text}"
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-xs">
              <div>
                <h4 className="text-white font-bold">{rev.name}</h4>
                <div className="text-slate-400 text-[11px]">{rev.company}</div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                {rev.service}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-6">
        <button
          onClick={() => navigate('get-a-quote')}
          className="px-8 py-3.5 rounded-full btn-primary text-xs font-bold shadow-glow-lime"
        >
          Start Your Project
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   19. TRADE ACCOUNT PAGE (Agencies & Resellers)
   ========================================================================= */
export function TradeAccountView() {
  const { navigate, showToast } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    company: '',
    contact: '',
    phone: '',
    email: '',
    businessType: 'Design Studio / Branding Agency',
    monthlyVolume: 'Rs. 200,000 - 500,000',
    products: 'Signage, Packaging, Corporate Print',
    cities: 'Lahore, Karachi, Islamabad',
    website: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Trade account application submitted!');
  };

  return (
    <div className="pt-8 pb-24 px-4 sm:px-6 max-w-4xl mx-auto space-y-12">
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-lime-brand">Trade Account</span>
      </nav>

      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="agency-pill text-lime-brand border-lime-brand/30 text-[11px] font-mono uppercase">
          B2B AGENCY PARTNERSHIP
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          Production support for agencies, designers and resellers.
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Use INPRINT as your dedicated physical production back-office for print, packaging, signage, displays and branded materials.
        </p>
      </div>

      {/* Benefits list from Section 19 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
          <CheckCircle2 className="w-4 h-4 text-lime-brand" />
          <div className="text-white font-bold">Dedicated Contact</div>
          <p className="text-[10px] text-slate-400">Direct producer in Lahore</p>
        </div>
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
          <CheckCircle2 className="w-4 h-4 text-lime-brand" />
          <div className="text-white font-bold">Production Pricing</div>
          <p className="text-[10px] text-slate-400">Agency discount tiers</p>
        </div>
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
          <CheckCircle2 className="w-4 h-4 text-lime-brand" />
          <div className="text-white font-bold">White-Label Dispatch</div>
          <p className="text-[10px] text-slate-400">Shipped under your agency name</p>
        </div>
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
          <CheckCircle2 className="w-4 h-4 text-lime-brand" />
          <div className="text-white font-bold">Priority Press Turn</div>
          <p className="text-[10px] text-slate-400">Fast-track queue</p>
        </div>
      </div>

      {/* Trade Application Form */}
      <div className="p-8 sm:p-12 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl">
        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-lime-brand mx-auto" />
            <h3 className="font-display font-bold text-2xl text-white">Application Received</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Our trade partnerships director will review your agency details and activate your B2B account with custom pricing.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="font-display font-bold text-xl text-white">Apply for a Trade Account</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <label className="text-slate-400 block mb-1">Company / Studio Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Studio Pixel Lahore"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-lime-brand"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Contact Person *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zeeshan Ali"
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-lime-brand"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="0321 3656096"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-lime-brand"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="agency@studio.pk"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-lime-brand"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Business Type</label>
                <select
                  value={form.businessType}
                  onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                  className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-lime-brand"
                >
                  <option value="Design Studio / Branding Agency">Design Studio / Branding Agency</option>
                  <option value="Event Management Company">Event Management Company</option>
                  <option value="Print Reseller / Broker">Print Reseller / Broker</option>
                  <option value="Architectural / Interior Firm">Architectural / Interior Firm</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Expected Monthly Volume</label>
                <select
                  value={form.monthlyVolume}
                  onChange={(e) => setForm({ ...form, monthlyVolume: e.target.value })}
                  className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-lime-brand"
                >
                  <option value="Rs. 100,000 - 300,000">Rs. 100,000 - 300,000</option>
                  <option value="Rs. 300,000 - 800,000">Rs. 300,000 - 800,000</option>
                  <option value="Rs. 800,000+ (High Volume)">Rs. 800,000+ (High Volume)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-400 block mb-1">Main Products Required</label>
                <input
                  type="text"
                  placeholder="e.g. Rigid boxes, 3D channel letters, roll-up standees"
                  value={form.products}
                  onChange={(e) => setForm({ ...form, products: e.target.value })}
                  className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-lime-brand"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-400 block mb-1">Website or Portfolio Link</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-lime-brand"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl btn-primary text-xs font-bold uppercase tracking-wider shadow-glow-lime"
              >
                Apply for a Trade Account
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
