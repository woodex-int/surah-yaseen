import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ORDER_STAGES, SAMPLE_ORDERS, createWhatsAppUrl } from '../data/inprintData';
import { 
  Search, CheckCircle2, Clock, Truck, ShieldCheck, 
  MessageSquare, Package, AlertCircle 
} from 'lucide-react';

export default function TrackOrderView() {
  const { navigate } = useApp();
  const [orderQuery, setOrderQuery] = useState('INP-8492');
  const [phoneQuery, setPhoneQuery] = useState('0321 3656096');
  const [trackedOrder, setTrackedOrder] = useState(SAMPLE_ORDERS['INP-8492']);
  const [hasSearched, setHasSearched] = useState(true);

  const handleTrack = (e) => {
    e.preventDefault();
    const cleanId = orderQuery.trim().toUpperCase();
    if (SAMPLE_ORDERS[cleanId]) {
      setTrackedOrder(SAMPLE_ORDERS[cleanId]);
    } else {
      // Generate synthetic valid order for demo if arbitrary order number entered
      setTrackedOrder({
        orderNumber: cleanId,
        clientName: "Client Partner",
        company: "Verified Order",
        product: "Custom Production Order",
        currentStageIndex: 4, // In production
        orderDate: "2026-09-22",
        estimatedDate: "2026-09-25",
        city: "Lahore",
        method: "Model Town Facility Dispatch",
        artworkStatus: "Approved by pre-press"
      });
    }
    setHasSearched(true);
  };

  return (
    <div className="pt-8 pb-24 px-4 sm:px-6 max-w-4xl mx-auto space-y-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-lime-brand">Track Order</span>
      </nav>

      {/* Hero */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="agency-pill text-lime-brand border-lime-brand/30 text-[11px] font-mono uppercase">
          LIVE PRODUCTION RADAR
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          Track your order.
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          Check live press status, artwork proofing approval, and courier transit stages in real-time.
        </p>
      </div>

      {/* Lookup Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/10 shadow-2xl">
        <form onSubmit={handleTrack} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-5 text-xs font-mono">
            <label className="text-slate-400 block mb-1">Order Number (e.g. INP-8492)</label>
            <input
              type="text"
              required
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="INP-8492"
              className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2.5 text-white font-mono uppercase focus:outline-none focus:border-lime-brand"
            />
          </div>

          <div className="sm:col-span-4 text-xs font-mono">
            <label className="text-slate-400 block mb-1">Phone or Email</label>
            <input
              type="text"
              value={phoneQuery}
              onChange={(e) => setPhoneQuery(e.target.value)}
              placeholder="0321 3656096"
              className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-lime-brand"
            />
          </div>

          <div className="sm:col-span-3">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl btn-primary text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-glow-lime"
            >
              <Search className="w-4 h-4" />
              <span>Track Order</span>
            </button>
          </div>
        </form>

        <div className="flex gap-2 pt-3 text-[11px] font-mono text-slate-400">
          <span>Try sample orders:</span>
          <button onClick={() => { setOrderQuery('INP-8492'); }} className="text-lime-brand hover:underline">
            INP-8492
          </button>
          <span>·</span>
          <button onClick={() => { setOrderQuery('INP-9021'); }} className="text-lime-brand hover:underline">
            INP-9021
          </button>
          <span>·</span>
          <button onClick={() => { setOrderQuery('INP-7740'); }} className="text-lime-brand hover:underline">
            INP-7740
          </button>
        </div>
      </div>

      {/* 23.2 Order Status Timeline & Details */}
      {trackedOrder && (
        <div className="p-8 sm:p-10 rounded-3xl bg-dark-900 border border-white/10 space-y-8 animate-in fade-in duration-300">
          
          {/* Order Header Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Order ID:</span>
                <span className="text-base font-mono font-bold text-lime-brand">{trackedOrder.orderNumber}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lime-brand/10 text-lime-brand border border-lime-brand/20">
                  {ORDER_STAGES[trackedOrder.currentStageIndex]}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg text-white mt-1">
                {trackedOrder.product}
              </h3>
              <p className="text-xs text-slate-400">Client: {trackedOrder.clientName} ({trackedOrder.company})</p>
            </div>

            <div className="text-right text-xs font-mono space-y-1">
              <div className="text-slate-400">Ordered: <span className="text-white">{trackedOrder.orderDate}</span></div>
              <div className="text-slate-400">Expected: <span className="text-lime-brand font-bold">{trackedOrder.estimatedDate}</span></div>
              <div className="text-slate-400">Fulfilment: <span className="text-white">{trackedOrder.method}</span></div>
            </div>
          </div>

          {/* 9-Stage Visual Progress Timeline */}
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
              Production Lifecycle Progress (Stage {trackedOrder.currentStageIndex + 1} of 9)
            </span>

            <div className="space-y-3">
              {ORDER_STAGES.map((stageName, idx) => {
                const isPassed = idx < trackedOrder.currentStageIndex;
                const isCurrent = idx === trackedOrder.currentStageIndex;
                const isFuture = idx > trackedOrder.currentStageIndex;

                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-4 p-3 rounded-xl border transition ${
                      isCurrent
                        ? 'bg-lime-brand/10 border-lime-brand text-white shadow-glow-card'
                        : isPassed
                        ? 'bg-white/[0.02] border-emerald-500/30 text-slate-300'
                        : 'bg-transparent border-white/5 text-slate-600'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                        isPassed
                          ? 'bg-emerald-500 text-black'
                          : isCurrent
                          ? 'bg-lime-brand text-black animate-pulse'
                          : 'bg-white/5 text-slate-600'
                      }`}
                    >
                      {isPassed ? '✓' : idx + 1}
                    </div>

                    <div className="flex-1 flex items-center justify-between text-xs font-mono">
                      <span className={isCurrent ? 'font-bold text-lime-brand' : isPassed ? 'text-slate-200' : 'text-slate-500'}>
                        {stageName}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {isPassed ? 'Completed' : isCurrent ? 'Active In Progress' : 'Pending'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick WhatsApp Support for this order */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Need to alter instructions or check delivery van timing?
            </div>
            <a
              href={`https://wa.me/923213656096?text=Hi%20INPRINT,%20I%20am%20checking%20status%20for%20order%20%23${trackedOrder.orderNumber}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Order Desk</span>
            </a>
          </div>

        </div>
      )}

    </div>
  );
}
