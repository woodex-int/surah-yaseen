import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, ArrowRight, CreditCard, CheckCircle2, Lock, Building, Truck } from 'lucide-react';

export default function CheckoutView() {
  const { cart, cartSubtotal, clearCart, navigate, setLastOrder, showToast } = useApp();

  const [contact, setContact] = useState({
    name: '',
    phone: '',
    email: '',
    whatsappConsent: true
  });

  const [delivery, setDelivery] = useState({
    method: 'pickup', // 'pickup' or 'delivery'
    city: 'Lahore',
    address: '',
    instructions: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('bank-transfer'); // 'card', 'bank-transfer', 'jazzcash', 'easypaisa', 'cod'

  const deliveryFee = delivery.method === 'delivery' ? 450 : 0;
  const totalAmount = cartSubtotal + deliveryFee;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!contact.name || !contact.phone) {
      showToast('Please fill out name and phone number.');
      return;
    }

    const orderId = `INP-${Math.floor(8000 + Math.random() * 1900)}`;
    const newOrder = {
      orderNumber: orderId,
      items: cart,
      contact: contact,
      delivery: delivery,
      paymentMethod: paymentMethod,
      total: totalAmount,
      date: new Date().toISOString().split('T')[0],
      estimatedDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      artworkStatus: 'Under review by pre-press',
      paymentStatus: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Awaiting confirmation'
    };

    setLastOrder(newOrder);
    clearCart();
    navigate('order-confirmation');
  };

  return (
    <div className="pt-8 pb-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-10">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <button onClick={() => navigate('cart')} className="hover:text-white transition">Cart</button>
        <span>/</span>
        <span className="text-lime-brand">Checkout</span>
      </nav>

      <div className="space-y-1">
        <span className="text-xs font-mono uppercase tracking-widest text-lime-brand">
          SECURE CHECKOUT
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
          Complete your order.
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Sections 1-4 (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. Contact Details */}
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-lime-brand text-black font-mono text-xs flex items-center justify-center font-bold">1</span>
              Contact Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <label className="text-slate-400 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mehmood"
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-lime-brand"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="0321 3656096"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-lime-brand"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-400 block mb-1">Email (for digital invoice & proofs)</label>
                <input
                  type="email"
                  placeholder="client@company.com"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-lime-brand"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={contact.whatsappConsent}
                    onChange={(e) => setContact({ ...contact, whatsappConsent: e.target.checked })}
                    className="rounded bg-dark-850 border-white/20 text-lime-brand"
                  />
                  <span>Send digital PDF proof & dispatch tracking via WhatsApp</span>
                </label>
              </div>
            </div>
          </div>

          {/* 2. Delivery / Fulfilment */}
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-lime-brand text-black font-mono text-xs flex items-center justify-center font-bold">2</span>
              Fulfilment & Delivery
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <button
                type="button"
                onClick={() => setDelivery({ ...delivery, method: 'pickup' })}
                className={`p-4 rounded-2xl border text-left transition ${
                  delivery.method === 'pickup'
                    ? 'bg-lime-brand/15 border-lime-brand text-white'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                <div className="font-bold text-white mb-1">Pickup from Lahore Facility</div>
                <div className="text-[11px] text-slate-400">M-71, Zainab Tower, Model Town Link Rd</div>
                <div className="text-lime-brand font-bold mt-2">FREE</div>
              </button>

              <button
                type="button"
                onClick={() => setDelivery({ ...delivery, method: 'delivery' })}
                className={`p-4 rounded-2xl border text-left transition ${
                  delivery.method === 'delivery'
                    ? 'bg-lime-brand/15 border-lime-brand text-white'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                <div className="font-bold text-white mb-1">Nationwide Tracked Courier</div>
                <div className="text-[11px] text-slate-400">TCS / Local Lahore cargo delivery</div>
                <div className="text-lime-brand font-bold mt-2">Rs. 450</div>
              </button>
            </div>

            {delivery.method === 'delivery' && (
              <div className="space-y-3 pt-2 text-xs font-mono">
                <div>
                  <label className="text-slate-400 block mb-1">City</label>
                  <select
                    value={delivery.city}
                    onChange={(e) => setDelivery({ ...delivery, city: e.target.value })}
                    className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-lime-brand"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Sialkot">Sialkot</option>
                    <option value="Peshawar">Peshawar</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Full Shipping Address</label>
                  <input
                    type="text"
                    required
                    placeholder="Street, Building, Area"
                    value={delivery.address}
                    onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
                    className="w-full bg-dark-850 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-lime-brand"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 3. Payment Method */}
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-lime-brand text-black font-mono text-xs flex items-center justify-center font-bold">3</span>
              Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <button
                type="button"
                onClick={() => setPaymentMethod('bank-transfer')}
                className={`p-3.5 rounded-xl border text-left transition ${
                  paymentMethod === 'bank-transfer'
                    ? 'bg-lime-brand/15 border-lime-brand text-white'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                <div className="font-bold text-white">Online Bank Transfer (IBFT)</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Meezan Bank / HBL Corporate</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('jazzcash')}
                className={`p-3.5 rounded-xl border text-left transition ${
                  paymentMethod === 'jazzcash'
                    ? 'bg-lime-brand/15 border-lime-brand text-white'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                <div className="font-bold text-white">JazzCash / EasyPaisa</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Mobile wallet instant transfer</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3.5 rounded-xl border text-left transition ${
                  paymentMethod === 'card'
                    ? 'bg-lime-brand/15 border-lime-brand text-white'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                <div className="font-bold text-white">Credit / Debit Card</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Visa, Mastercard & PayPak</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3.5 rounded-xl border text-left transition ${
                  paymentMethod === 'cod'
                    ? 'bg-lime-brand/15 border-lime-brand text-white'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                <div className="font-bold text-white">Cash on Delivery / Pickup</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Pay at Lahore facility upon inspection</div>
              </button>
            </div>
          </div>

        </div>

        {/* Right: Order Review & Place CTA (4 cols) */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-dark-900 border border-white/10 space-y-6 sticky top-24">
          <h3 className="font-display font-bold text-lg text-white pb-3 border-b border-white/10">
            Order Review
          </h3>

          <div className="space-y-3 text-xs font-mono">
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start pb-2 border-b border-white/5">
                <div>
                  <span className="text-white font-bold block">{item.product.name}</span>
                  <span className="text-[11px] text-slate-400">Qty: {item.quantity} · {item.material}</span>
                </div>
                <span className="text-lime-brand font-bold">Rs. {item.totalPrice.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-2 text-xs font-mono">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span>Rs. {cartSubtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Fulfilment ({delivery.method === 'pickup' ? 'Lahore Pickup' : 'Courier'})</span>
              <span>{deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}</span>
            </div>
            <div className="flex justify-between text-white text-base font-bold pt-3 border-t border-white/10">
              <span>Total Payable</span>
              <span className="text-lime-brand font-mono">Rs. {totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] font-mono text-slate-400 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-lime-brand shrink-0 mt-0.5" />
            <span>
              Your order will not enter production until the required artwork and specifications have been confirmed.
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl btn-primary text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-glow-lime"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Place Order</span>
          </button>
        </div>

      </form>

    </div>
  );
}
