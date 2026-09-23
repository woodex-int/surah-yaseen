import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { createWhatsAppUrl } from '../data/inprintData';
import { Trash2, ShoppingBag, ArrowRight, MessageSquare, ShieldCheck, Tag } from 'lucide-react';

export default function CartView() {
  const { cart, removeFromCart, cartSubtotal, navigate } = useApp();
  const [deliveryMethod, setDeliveryMethod] = useState('pickup'); // 'pickup' or 'tcs'
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const deliveryCost = deliveryMethod === 'tcs' ? 450 : 0;
  const grandTotal = Math.max(0, cartSubtotal - discount + deliveryCost);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'INPRINT10') {
      setDiscount(Math.round(cartSubtotal * 0.1));
    } else {
      setDiscount(0);
    }
  };

  const handleSendToWhatsApp = () => {
    const summary = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} (Qty: ${item.quantity}, Mat: ${item.material}, Finish: ${item.finish}) - Rs. ${item.totalPrice.toLocaleString()}`
      )
      .join('\n');

    const url = createWhatsAppUrl('cart', {
      cartSummary: summary,
      total: grandTotal.toLocaleString(),
      city: deliveryMethod === 'pickup' ? 'Lahore Pickup (Model Town)' : 'Nationwide TCS Delivery'
    });
    window.open(url, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="pt-16 pb-24 px-4 sm:px-6 max-w-xl mx-auto text-center space-y-5">
        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-display font-black text-3xl text-white">Your cart is empty.</h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          Browse our products or send us a custom project brief to configure and order.
        </p>
        <div className="flex justify-center gap-3 pt-3">
          <button
            onClick={() => navigate('products')}
            className="px-6 py-3 rounded-full btn-primary text-xs font-bold"
          >
            Browse Products
          </button>
          <button
            onClick={() => navigate('get-a-quote')}
            className="px-6 py-3 rounded-full btn-secondary text-xs font-semibold"
          >
            Start a Project
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-10">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-lime-brand">Shopping Cart</span>
      </nav>

      <div className="space-y-1">
        <span className="text-xs font-mono uppercase tracking-widest text-lime-brand">
          ORDER SUMMARY
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
          Review your order.
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Line Items (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-dark-900 border border-white/10 space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-white/10 shrink-0"
                  />
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-white">
                      {item.product.name}
                    </h3>
                    <div className="text-xs text-slate-400 font-mono space-y-0.5 mt-1">
                      <div>Quantity: <span className="text-white font-semibold">{item.quantity} units</span></div>
                      <div>Material: <span className="text-white">{item.material}</span> · Finish: <span className="text-white">{item.finish}</span></div>
                      <div>Artwork: <span className="text-lime-brand">{item.artworkStatus}</span></div>
                    </div>
                  </div>
                </div>

                <div className="text-right sm:text-right w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-0 pt-3 sm:pt-0 border-white/5">
                  <div className="text-base sm:text-lg font-bold text-lime-brand font-mono">
                    Rs. {item.totalPrice.toLocaleString()}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-red-400/80 hover:text-red-400 flex items-center gap-1 font-mono transition mt-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Promo code box */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Tag className="w-4 h-4 text-lime-brand" />
              <span>Have an agency trade code? (Try: <strong className="text-lime-brand">INPRINT10</strong>)</span>
            </div>
            <form onSubmit={handleApplyPromo} className="flex gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="bg-dark-850 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white uppercase font-mono focus:outline-none focus:border-lime-brand"
              />
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl btn-secondary text-xs font-semibold"
              >
                Apply
              </button>
            </form>
          </div>
        </div>

        {/* Right: Side Summary (4 cols) */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/10 space-y-6 sticky top-24">
          <h3 className="font-display font-bold text-lg text-white pb-3 border-b border-white/10">
            Cart Summary
          </h3>

          {/* Delivery Method Choice */}
          <div className="space-y-2 text-xs font-mono">
            <span className="text-slate-400 block uppercase tracking-wider">Fulfilment</span>
            <div className="space-y-1.5">
              <label
                onClick={() => setDeliveryMethod('pickup')}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                  deliveryMethod === 'pickup'
                    ? 'bg-lime-brand/15 border-lime-brand text-white'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                <span>Lahore Model Town Pickup</span>
                <span className="font-bold text-lime-brand">FREE</span>
              </label>

              <label
                onClick={() => setDeliveryMethod('tcs')}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                  deliveryMethod === 'tcs'
                    ? 'bg-lime-brand/15 border-lime-brand text-white'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                <span>Nationwide TCS Courier</span>
                <span>Rs. 450</span>
              </label>
            </div>
          </div>

          {/* Pricing Totals */}
          <div className="space-y-2 pt-2 border-t border-white/10 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span>Rs. {cartSubtotal.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Trade Discount (10%)</span>
                <span>- Rs. {discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-400">
              <span>Delivery</span>
              <span>{deliveryCost === 0 ? 'FREE' : `Rs. ${deliveryCost}`}</span>
            </div>
            <div className="flex justify-between text-white text-base font-bold pt-3 border-t border-white/10">
              <span>Total Price</span>
              <span className="text-lime-brand font-mono">Rs. {grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => navigate('checkout')}
              className="w-full py-3.5 rounded-xl btn-primary text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-lime"
            >
              <span>Continue to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleSendToWhatsApp}
              className="w-full py-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Cart to WhatsApp</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] font-mono text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-lime-brand shrink-0" />
            <span>Artwork checked before production. You approve before we print.</span>
          </div>

        </div>

      </div>

    </div>
  );
}
