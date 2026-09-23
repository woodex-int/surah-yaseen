import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ORDER_STAGES, SAMPLE_ORDERS } from '../data/inprintData';
import { Search, MessageSquare } from 'lucide-react';

export default function TrackOrderView() {
  const { navigate } = useApp();
  const [orderQuery, setOrderQuery] = useState('INP-8492');
  const [phoneQuery, setPhoneQuery] = useState('0321 3656096');
  const [trackedOrder, setTrackedOrder] = useState(SAMPLE_ORDERS['INP-8492']);

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
  };

  return (
    <div className="pt-8 pb-24 px-4 sm:px-6 max-w-4xl mx-auto space-y-12 font-sans bg-black">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-red-brand font-bold">Track Order</span>
      </nav>

      {/* Hero */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="pill-badge-red text-[11px] uppercase">
          LIVE PRODUCTION RADAR
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
          Track your order.
        </h1>
        <p className="text-neutral-300 text-sm leading-relaxed font-sans">
          Check live press status, artwork proofing approval, and courier transit stages in real-time.
        </p>
      </div>

      {/* Lookup Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0E12] border border-white/10 shadow-2xl">
        <form onSubmit={handleTrack} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
          <div className="sm:col-span-5 text-xs font-mono">
            <label className="text-neutral-400 block mb-1">Order Number (e.g. INP-8492)</label>
            <input
              type="text"
              required
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="INP-8492"
              className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white font-mono uppercase focus:outline-none focus:border-red-brand"
            />
          </div>

          <div className="sm:col-span-4 text-xs font-mono">
            <label className="text-neutral-400 block mb-1">Phone or Email</label>
            <input
              type="text"
              value={phoneQuery}
              onChange={(e) => setPhoneQuery(e.target.value)}
              placeholder="0321 3656096"
              className="w-full bg-black border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-red-brand font-sans"
            />
          </div>

          <div className="sm:col-span-3">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl btn-pill-red text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              <span>Track Order</span>
            </button>
          </div>
        </form>

        <div className="flex gap-2 pt-3 text-[11px] font-mono text-neutral-400">
          <span>Try sample orders:</span>
          <button onClick={() => { setOrderQuery('INP-8492'); }} className="text-red-brand hover:underline font-bold">
            INP-8492
          </button>
          <span>·</span>
          <button onClick={() => { setOrderQuery('INP-9021'); }} className="text-red-brand hover:underline font-bold">
            INP-9021
          </button>
          <span>·</span>
          <button onClick={() => { setOrderQuery('INP-7740'); }} className="text-red-brand hover:underline font-bold">
            INP-7740
          </button>
        </div>
      </div>

      {/* 23.2 Order Status Timeline & Details */}
      {trackedOrder && (
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0D0E12] border border-white/10 space-y-8 animate-in fade-in duration-300">
          
          {/* Order Header Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-neutral-400">Order ID:</span>
                <span className="text-base font-mono font-bold text-red-brand">{trackedOrder.orderNumber}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-brand/10 text-red-brand border border-red-brand/20 font-bold">
                  {ORDER_STAGES[trackedOrder.currentStageIndex]}
                </span>
              </div>
              <h3 className="font-display font-black text-lg text-white mt-1">
                {trackedOrder.product}
              </h3>
              <p className="text-xs text-neutral-400 font-sans">Client: {trackedOrder.clientName} ({trackedOrder.company})</p>
            </div>

            <div className="text-right text-xs font-mono space-y-1">
              <div className="text-neutral-400">Ordered: <span className="text-white">{trackedOrder.orderDate}</span></div>
              <div className="text-neutral-400">Expected: <span className="text-red-brand font-bold">{trackedOrder.estimatedDate}</span></div>
              <div className="text-neutral-400">Fulfilment: <span className="text-white">{trackedOrder.method}</span></div>
            </div>
          </div>

          {/* 9-Stage Visual Progress Timeline */}
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
              Production Lifecycle Progress (Stage {trackedOrder.currentStageIndex + 1} of 9)
            </span>

            <div className="space-y-3 font-mono">
              {ORDER_STAGES.map((stageName, idx) => {
                const isPassed = idx < trackedOrder.currentStageIndex;
                const isCurrent = idx === trackedOrder.currentStageIndex;

                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-4 p-3 rounded-xl border transition ${
                      isCurrent
                        ? 'bg-red-brand/10 border-red-brand text-white'
                        : isPassed
                        ? 'bg-white/[0.02] border-white/20 text-white'
                        : 'bg-transparent border-white/5 text-neutral-600'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                        isPassed
                          ? 'bg-white text-black'
                          : isCurrent
                          ? 'bg-red-brand text-white animate-pulse'
                          : 'bg-white/5 text-neutral-600'
                      }`}
                    >
                      {isPassed ? '✓' : idx + 1}
                    </div>

                    <div className="flex-1 flex items-center justify-between text-xs font-mono">
                      <span className={isCurrent ? 'font-bold text-red-brand' : isPassed ? 'text-white' : 'text-neutral-500'}>
                        {stageName}
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        {isPassed ? 'Completed' : isCurrent ? 'Active In Progress' : 'Pending'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick WhatsApp Support for this order */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div className="text-xs text-neutral-400 font-sans">
              Need to alter instructions or check delivery van timing?
            </div>
            <a
              href={`https://wa.me/923213656096?text=Hi%20INPRINT,%20I%20am%20checking%20status%20for%20order%20%23${trackedOrder.orderNumber}`}
              target="_blank"
              rel="noreferrer"
              className="btn-pill-white text-xs py-2 px-4 flex items-center gap-2 font-bold"
            >
              <MessageSquare className="w-4 h-4 text-red-brand" />
              <span>WhatsApp Order Desk</span>
            </a>
          </div>

        </div>
      )}

    </div>
  );
}
