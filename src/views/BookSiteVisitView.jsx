import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Calendar, Clock, Camera, CheckCircle2, ShieldCheck, Send, Phone } from 'lucide-react';

export default function BookSiteVisitView() {
  const { navigate, showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    projectType: '3D Storefront Signage & Facade',
    address: '',
    preferredDate: '',
    preferredTime: 'Morning (11:00 AM - 2:00 PM)',
    notes: '',
    photos: []
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Site visit request received! We will confirm by phone.');
  };

  return (
    <div className="pt-8 pb-24 px-4 sm:px-6 max-w-4xl mx-auto space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <button onClick={() => navigate('services')} className="hover:text-white transition">Services</button>
        <span>/</span>
        <span className="text-lime-brand">Book a Site Visit</span>
      </nav>

      {/* Hero */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="agency-pill text-lime-brand border-lime-brand/30 text-[11px] font-mono uppercase">
          LAHORE ON-SITE RECONNAISSANCE
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          Let us see the space before we plan the production.
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Site visits help us understand dimensions, surfaces, access, installation requirements and the practical conditions of your project.
        </p>
      </div>

      {/* Information reassurance card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-xs font-mono text-amber-200/90 flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p>
          Site visits in Lahore (Model Town, Gulberg, DHA, Johar Town, Bahria, etc.) may be free or chargeable depending on location and project scope. Our engineering team will confirm details before scheduling.
        </p>
      </div>

      {/* Booking Form */}
      <div className="p-8 sm:p-12 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl">
        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-14 h-14 text-lime-brand mx-auto" />
            <h2 className="font-display font-bold text-2xl text-white">Site Visit Requested</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              Thank you {formData.name}. Our survey engineer will call you at {formData.phone} to confirm the appointment time and technician dispatch.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setSubmitted(false)}
                className="agency-pill text-lime-brand border-lime-brand/30"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <label className="text-slate-400 block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asad Qureshi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-lime-brand"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="0321 3656096"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-lime-brand"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Company / Brand Name</label>
                <input
                  type="text"
                  placeholder="e.g. Cafe Bistro Lahore"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-lime-brand"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Project Type</label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-lime-brand"
                >
                  <option value="3D Storefront Signage & Facade">3D Storefront Signage & Facade</option>
                  <option value="Office Wall & Glass Branding">Office Wall & Glass Branding</option>
                  <option value="Retail Outlet Full Fit-out">Retail Outlet Full Fit-out</option>
                  <option value="Building Exterior Hoarding">Building Exterior Hoarding</option>
                  <option value="Exhibition Stall Setup">Exhibition Stall Setup</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-400 block mb-1">Site Address (Lahore area & landmark) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shop 4B, Main Boulevard, Gulberg III, near MM Alam Road"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-lime-brand"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-lime-brand"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Preferred Time Window</label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-lime-brand"
                >
                  <option value="Morning (11:00 AM - 2:00 PM)">Morning (11:00 AM - 2:00 PM)</option>
                  <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                  <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-400 block mb-1">Additional Project Notes / Dimensions</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Height restrictions, electrical power source status, scaffolding requirements, etc."
                  className="w-full bg-dark-850 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-lime-brand"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl btn-primary text-xs font-bold uppercase tracking-wider shadow-glow-lime flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Request a Site Visit</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
