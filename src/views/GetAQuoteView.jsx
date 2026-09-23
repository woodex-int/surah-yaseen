import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { createWhatsAppUrl } from '../data/inprintData';
import { 
  Check, ArrowRight, ArrowLeft, UploadCloud, ShieldCheck, 
  CheckCircle2, MessageSquare, FileText 
} from 'lucide-react';

export default function GetAQuoteView() {
  const { navigate, showToast } = useApp();

  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(1);
  const [referenceId, setReferenceId] = useState('');

  // Step 1: Selected needs
  const [selectedNeeds, setSelectedNeeds] = useState(['Brand Identity', 'Custom Packaging & Boxes']);

  // Step 2: Project details
  const [projectDetails, setProjectDetails] = useState({
    description: '',
    quantityOrLocations: '',
    dimensions: '',
    deadline: '',
    budgetRange: 'Rs. 150,000 - 500,000',
    needDesign: 'Yes, full design needed',
    needInstallation: 'Yes, installation in Lahore'
  });

  // Step 3: Files
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Step 4: Contact details
  const [contactInfo, setContactInfo] = useState({
    fullName: '',
    company: '',
    phone: '',
    email: '',
    city: 'Lahore',
    preferredContact: 'WhatsApp',
    consent: true
  });

  const projectNeedsList = [
    "Brand Identity & Logo Design",
    "Commercial Stationery (Cards, Letterheads)",
    "Custom Packaging & Boxes",
    "Food & Beverage Packaging",
    "Signage & Shop Front Letters (3D / Neon)",
    "Indoor Office Branding & Acrylic Plaques",
    "Panna Flex & Vinyl Printing",
    "Vehicle Fleet Branding",
    "Exhibition Stalls & Tension Displays",
    "Corporate Gifts & Diaries",
    "Staff Uniforms & Embroidery",
    "Franchise Rollout Across Multiple Cities"
  ];

  const toggleNeed = (need) => {
    if (selectedNeeds.includes(need)) {
      setSelectedNeeds(selectedNeeds.filter((n) => n !== need));
    } else {
      setSelectedNeeds([...selectedNeeds, need]);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFiles((prev) => [...prev, file.name]);
      showToast(`Uploaded: ${file.name}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ref = `INP-REF-${Math.floor(1000 + Math.random() * 9000)}`;
    setReferenceId(ref);
    setCurrentStep(5); // Show confirmation
    showToast(`Project brief submitted! Reference: ${ref}`);
  };

  const handleWhatsAppForward = () => {
    const message = `Hi INPRINT! I just submitted an enquiry (#${referenceId}) on your website:\n\n*Name:* ${contactInfo.fullName}\n*Brand:* ${contactInfo.company}\n*Needs:* ${selectedNeeds.join(', ')}\n*City:* ${contactInfo.city}\n*Budget:* ${projectDetails.budgetRange}`;
    window.open(`https://wa.me/923213656096?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="pt-8 pb-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-10 font-sans bg-black">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-red-brand font-bold">Agency Brief Builder</span>
      </nav>

      {/* Q01 — Hero */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="pill-badge-red text-[11px] uppercase">
          PROJECT DISCOVERY BRIEF
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          Tell us what you are building.
        </h1>
        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-sans">
          Share the project details and our team will recommend the right creative and production path.
        </p>
        <p className="text-xs font-mono text-neutral-400 flex items-center justify-center gap-1.5 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-red-brand" /> No obligation. Your information is used only to respond to your enquiry.
        </p>
      </div>

      {/* Progress Step Bar (Steps 1 to 4) */}
      {currentStep <= 4 && (
        <div className="flex items-center justify-between max-w-xl mx-auto px-4 font-mono">
          {[
            { num: 1, label: 'Needs' },
            { num: 2, label: 'Details' },
            { num: 3, label: 'Uploads' },
            { num: 4, label: 'Contact' }
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition ${
                  currentStep === s.num
                    ? 'bg-red-brand text-white'
                    : currentStep > s.num
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-neutral-400'
                }`}
              >
                {currentStep > s.num ? '✓' : s.num}
              </div>
              <span className={`text-xs font-mono hidden sm:inline ${currentStep === s.num ? 'text-white font-bold' : 'text-neutral-500'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Wizard Step Container */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#0D0E12] border border-white/10 shadow-2xl">
        
        {/* Q02 — Step 1: What do you need? */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono text-red-brand uppercase tracking-wider block mb-1">
                Step 1 of 4
              </span>
              <h3 className="font-display font-black text-2xl text-white">
                What do you need help producing?
              </h3>
              <p className="text-xs text-neutral-400 mt-1 font-sans">Select all services and deliverables that apply to this project.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {projectNeedsList.map((need) => {
                const isSelected = selectedNeeds.includes(need);
                return (
                  <button
                    key={need}
                    type="button"
                    onClick={() => toggleNeed(need)}
                    className={`p-4 rounded-2xl text-left border transition flex items-center justify-between group ${
                      isSelected
                        ? 'bg-red-brand/10 border-red-brand text-white'
                        : 'bg-white/[0.03] border-white/10 text-neutral-300 hover:border-white/25'
                    }`}
                  >
                    <span className="text-xs font-medium font-sans">{need}</span>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] ${
                      isSelected ? 'bg-red-brand border-red-brand text-white font-bold' : 'border-white/20 text-transparent'
                    }`}>
                      ✓
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-end">
              <button
                type="button"
                disabled={selectedNeeds.length === 0}
                onClick={() => setCurrentStep(2)}
                className="px-8 py-3 rounded-full btn-pill-red text-xs font-bold flex items-center gap-2 disabled:opacity-50"
              >
                <span>Continue to Project Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Q03 — Step 2: Project Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono text-red-brand uppercase tracking-wider block mb-1">
                Step 2 of 4
              </span>
              <h3 className="font-display font-black text-2xl text-white">
                Project scope & specifications
              </h3>
              <p className="text-xs text-neutral-400 mt-1 font-sans">
                If you are unsure about the specifications, describe the outcome you want. We can help define the production requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="sm:col-span-2">
                <label className="text-neutral-400 block mb-1">Describe your project & expectations</label>
                <textarea
                  rows={3}
                  value={projectDetails.description}
                  onChange={(e) => setProjectDetails({ ...projectDetails, description: e.target.value })}
                  placeholder="e.g. Opening a new retail flagship in Gulberg Lahore. Need 3D front-lit channel letter signage, 5,000 branded paper shopping bags, and interior window graphics."
                  className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-brand text-xs font-sans"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Quantity or number of locations</label>
                <input
                  type="text"
                  value={projectDetails.quantityOrLocations}
                  onChange={(e) => setProjectDetails({ ...projectDetails, quantityOrLocations: e.target.value })}
                  placeholder="e.g. 500 boxes or 2 retail branches"
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Approximate dimensions / sizes</label>
                <input
                  type="text"
                  value={projectDetails.dimensions}
                  onChange={(e) => setProjectDetails({ ...projectDetails, dimensions: e.target.value })}
                  placeholder="e.g. 15ft x 4ft facade or custom box dieline"
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Required deadline / launch date</label>
                <input
                  type="text"
                  value={projectDetails.deadline}
                  onChange={(e) => setProjectDetails({ ...projectDetails, deadline: e.target.value })}
                  placeholder="e.g. October 15, 2026"
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Approximate budget range</label>
                <select
                  value={projectDetails.budgetRange}
                  onChange={(e) => setProjectDetails({ ...projectDetails, budgetRange: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-mono"
                >
                  <option value="Under Rs. 50,000">Under Rs. 50,000</option>
                  <option value="Rs. 50,000 - 150,000">Rs. 50,000 - 150,000</option>
                  <option value="Rs. 150,000 - 500,000">Rs. 150,000 - 500,000</option>
                  <option value="Rs. 500,000 - 1.5M">Rs. 500,000 - 1.5M</option>
                  <option value="Rs. 1.5M+ (Franchise/Enterprise)">Rs. 1.5M+ (Franchise/Enterprise)</option>
                </select>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Do you need design support?</label>
                <select
                  value={projectDetails.needDesign}
                  onChange={(e) => setProjectDetails({ ...projectDetails, needDesign: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans"
                >
                  <option value="Yes, full design needed">Yes, full creative design needed</option>
                  <option value="No, have print-ready files">No, we have print-ready vector artwork</option>
                  <option value="Minor formatting / adjustments">Minor resizing & prepress check only</option>
                </select>
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Do you need on-site installation?</label>
                <select
                  value={projectDetails.needInstallation}
                  onChange={(e) => setProjectDetails({ ...projectDetails, needInstallation: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans"
                >
                  <option value="Yes, installation in Lahore">Yes, on-site installation in Lahore</option>
                  <option value="Installation in other city">Installation in another city</option>
                  <option value="No, delivery/dispatch only">No, dispatch & delivery only</option>
                </select>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="btn-pill-white text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="btn-pill-red text-xs py-2.5 px-6 flex items-center gap-2"
              >
                <span>Continue to Uploads</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Q04 — Step 3: Uploads */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono text-red-brand uppercase tracking-wider block mb-1">
                Step 3 of 4
              </span>
              <h3 className="font-display font-black text-2xl text-white">
                Upload files, site photos & references
              </h3>
              <p className="text-xs text-neutral-400 mt-1 font-sans">
                Accepted formats: JPG, PNG, PDF, AI, PSD, CDR. Maximum file size: 100MB.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl border border-dashed border-white/20 bg-black text-center space-y-2 relative">
                <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                <UploadCloud className="w-8 h-8 text-red-brand mx-auto" />
                <h4 className="text-xs font-bold text-white font-display">Upload Site Photos & Facade</h4>
                <p className="text-[10px] text-neutral-500 font-mono">Photos of walls, storefront or exhibition space</p>
              </div>

              <div className="p-6 rounded-2xl border border-dashed border-white/20 bg-black text-center space-y-2 relative">
                <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                <UploadCloud className="w-8 h-8 text-red-brand mx-auto" />
                <h4 className="text-xs font-bold text-white font-display">Upload Artwork / Logo Master</h4>
                <p className="text-[10px] text-neutral-500 font-mono">Vector AI, PDF, CDR or existing brand guides</p>
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 text-xs font-mono">
                <span className="text-neutral-400 text-[10px] uppercase">Attached Files:</span>
                {uploadedFiles.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-red-brand">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-6 border-t border-white/10 flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="btn-pill-white text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="btn-pill-red text-xs py-2.5 px-6 flex items-center gap-2"
              >
                <span>Continue to Contact</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Q05 — Step 4: Contact Details */}
        {currentStep === 4 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <span className="text-xs font-mono text-red-brand uppercase tracking-wider block mb-1">
                Step 4 of 4
              </span>
              <h3 className="font-display font-black text-2xl text-white">
                Where should we send your production plan?
              </h3>
              <p className="text-xs text-neutral-400 mt-1 font-sans">Our Lahore production desk will respond with an estimate and advice.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <label className="text-neutral-400 block mb-1">Full Name *</label>
                <input
                  type="text"
                  value={contactInfo.fullName}
                  onChange={(e) => setContactInfo({ ...contactInfo, fullName: e.target.value })}
                  placeholder="e.g. Usman Sheikh"
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans"
                  required
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Company / Brand Name</label>
                <input
                  type="text"
                  value={contactInfo.company}
                  onChange={(e) => setContactInfo({ ...contactInfo, company: e.target.value })}
                  placeholder="e.g. Chai Kapi / Urban Retail"
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  placeholder="0321 3656096"
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans"
                  required
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  placeholder="contact@brand.pk"
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">City *</label>
                <input
                  type="text"
                  value={contactInfo.city}
                  onChange={(e) => setContactInfo({ ...contactInfo, city: e.target.value })}
                  placeholder="e.g. Lahore"
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans"
                  required
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1">Preferred Contact Method</label>
                <select
                  value={contactInfo.preferredContact}
                  onChange={(e) => setContactInfo({ ...contactInfo, preferredContact: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-mono"
                >
                  <option value="WhatsApp">WhatsApp (Fastest)</option>
                  <option value="Phone Call">Phone Call</option>
                  <option value="Email">Official Email</option>
                </select>
              </div>

              <div className="sm:col-span-2 pt-2">
                <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer font-sans">
                  <input
                    type="checkbox"
                    checked={contactInfo.consent}
                    onChange={(e) => setContactInfo({ ...contactInfo, consent: e.target.checked })}
                    className="rounded bg-black border-white/20 text-red-brand accent-red-brand focus:ring-0"
                    required
                  />
                  <span>I agree to be contacted by INPRINT regarding this enquiry.</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="btn-pill-white text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                type="submit"
                className="px-9 py-3 rounded-full btn-pill-red text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <span>Submit My Project</span>
                <Check className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Q06 — Confirmation State */}
        {currentStep === 5 && (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-red-brand/10 border border-red-brand/30 flex items-center justify-center mx-auto text-red-brand">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                Your project enquiry has been received.
              </h2>
              <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed font-sans">
                We have received your information. Our team will review the details and contact you through {contactInfo.preferredContact}.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black border border-white/10 inline-block font-mono text-xs">
              <span className="text-neutral-400">Enquiry reference: </span>
              <span className="text-red-brand font-bold font-mono">{referenceId}</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={handleWhatsAppForward}
                className="btn-pill-red text-xs py-3 px-6 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp INPRINT Directly</span>
              </button>

              <button
                onClick={() => navigate('products')}
                className="btn-pill-white text-xs py-3 px-6"
              >
                Explore Product Catalog
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
