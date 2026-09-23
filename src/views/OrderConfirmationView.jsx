import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, MessageSquare, ArrowRight, ShieldCheck, Truck, Package } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderConfirmationView() {
  const { lastOrder, navigate } = useApp();

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4FF00', '#FFFFFF', '#00E5FF']
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const orderNumber = lastOrder?.orderNumber || 'INP-8492';
  const estimatedDate = lastOrder?.estimatedDate || 'Within 48 hours';
  const paymentStatus = lastOrder?.paymentStatus || 'Awaiting pre-press confirmation';
  const deliveryMethod = lastOrder?.delivery?.method === 'delivery' ? `TCS Tracked Courier (${lastOrder?.delivery?.city || 'Nationwide'})` : 'Model Town Lahore Facility Pickup';

  return (
    <div className="pt-12 pb-24 px-4 sm:px-6 max-w-2xl mx-auto space-y-8 text-center">
      
      <div className="w-20 h-20 rounded-full bg-lime-brand/10 border border-lime-brand/30 flex items-center justify-center mx-auto text-lime-brand shadow-glow-lime">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-3">
        <span className="agency-pill text-lime-brand border-lime-brand/30 text-[11px] font-mono uppercase">
          SUCCESSFULLY BOOKED
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
          Your order has been received.
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed max-w-md mx-auto">
          We have generated your job bag at our Lahore facility. Our pre-flight artwork team will review your files and send digital proofs.
        </p>
      </div>

      {/* Order Summary Receipt Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/10 text-left font-mono text-xs space-y-4 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <span className="text-slate-400 block mb-0.5">Order Number</span>
            <span className="text-lg font-bold text-lime-brand">{orderNumber}</span>
          </div>
          <span className="px-2.5 py-1 rounded bg-lime-brand/10 text-lime-brand border border-lime-brand/20">
            Order Received
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-slate-400 block mb-0.5">Payment Status</span>
            <span className="text-slate-200">{paymentStatus}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Artwork Status</span>
            <span className="text-slate-200">Pre-flight Review in progress</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Estimated Production Date</span>
            <span className="text-white font-bold">{estimatedDate}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Delivery Method</span>
            <span className="text-slate-200">{deliveryMethod}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 text-[11px] text-slate-400 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-lime-brand shrink-0 mt-0.5" />
          <span>
            Online enquiries accepted 24/7. Our team will ping you on WhatsApp with production proofs before physical press run.
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={() => navigate('track-order')}
          className="px-7 py-3.5 rounded-full btn-primary text-xs font-bold uppercase tracking-wider shadow-glow-lime flex items-center gap-2"
        >
          <span>Track Order</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <a
          href={`https://wa.me/923213656096?text=Hi%20INPRINT,%20I%20just%20placed%20order%20%23${orderNumber}`}
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 transition"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WhatsApp Order Support</span>
        </a>

        <button
          onClick={() => navigate('products')}
          className="px-6 py-3.5 rounded-full btn-secondary text-xs font-semibold"
        >
          Continue Shopping
        </button>
      </div>

    </div>
  );
}
