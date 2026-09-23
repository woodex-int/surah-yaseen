import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderConfirmationView() {
  const { lastOrder, navigate } = useApp();

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF2D20', '#FFFFFF', '#000000']
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
    <div className="pt-12 pb-24 px-4 sm:px-6 max-w-2xl mx-auto space-y-8 text-center font-sans bg-black">
      
      <div className="w-20 h-20 rounded-full bg-red-brand/10 border border-red-brand/40 flex items-center justify-center mx-auto text-red-brand">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-3">
        <span className="pill-badge-red text-[11px] uppercase">
          SUCCESSFULLY BOOKED
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
          Your order has been received.
        </h1>
        <p className="text-neutral-300 text-sm leading-relaxed max-w-md mx-auto font-sans">
          We have generated your job bag at our Lahore facility. Our pre-flight artwork team will review your files and send digital proofs.
        </p>
      </div>

      {/* Order Summary Receipt Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0E12] border border-white/10 text-left font-mono text-xs space-y-4 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <span className="text-neutral-400 block mb-0.5">Order Number</span>
            <span className="text-lg font-bold text-red-brand font-mono">{orderNumber}</span>
          </div>
          <span className="px-2.5 py-1 rounded bg-red-brand/10 text-red-brand border border-red-brand/30 font-bold">
            Order Received
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-neutral-400 block mb-0.5">Payment Status</span>
            <span className="text-neutral-200">{paymentStatus}</span>
          </div>
          <div>
            <span className="text-neutral-400 block mb-0.5">Artwork Status</span>
            <span className="text-neutral-200">Pre-flight Review in progress</span>
          </div>
          <div>
            <span className="text-neutral-400 block mb-0.5">Estimated Production Date</span>
            <span className="text-white font-bold">{estimatedDate}</span>
          </div>
          <div>
            <span className="text-neutral-400 block mb-0.5">Delivery Method</span>
            <span className="text-neutral-200">{deliveryMethod}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 text-[11px] text-neutral-400 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-red-brand shrink-0 mt-0.5" />
          <span className="font-sans">
            Online enquiries accepted 24/7. Our team will ping you on WhatsApp with production proofs before physical press run.
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={() => navigate('track-order')}
          className="px-7 py-3.5 rounded-full btn-pill-red text-xs font-bold uppercase tracking-wider flex items-center gap-2"
        >
          <span>Track Order</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <a
          href={`https://wa.me/923213656096?text=Hi%20INPRINT,%20I%20just%20placed%20order%20%23${orderNumber}`}
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3.5 rounded-full btn-pill-white text-xs font-bold flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4 text-red-brand" />
          <span>WhatsApp Order Support</span>
        </a>

        <button
          onClick={() => navigate('products')}
          className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 text-xs font-semibold transition"
        >
          Continue Shopping
        </button>
      </div>

    </div>
  );
}
