import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { createWhatsAppUrl } from '../data/inprintData';
import { X, Trash2, ArrowRight, MessageSquare, ShieldCheck, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, cartSubtotal, navigate } = useApp();
  const [deliveryType, setDeliveryType] = useState('lahore-pickup'); // 'lahore-pickup' or 'nationwide'

  if (!isCartOpen) return null;

  const deliveryFee = deliveryType === 'nationwide' ? 450 : 0;
  const grandTotal = cartSubtotal + deliveryFee;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('checkout');
  };

  const handleSendToWhatsApp = () => {
    const summary = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} (Qty: ${item.quantity}, Mat: ${item.material}, Finish: ${item.finish}, Sides: ${item.sides}) - Rs. ${item.totalPrice.toLocaleString()}`
      )
      .join('\n');

    const url = createWhatsAppUrl('cart', {
      cartSummary: summary,
      total: grandTotal.toLocaleString(),
      city: deliveryType === 'lahore-pickup' ? 'Lahore (Pickup)' : 'Nationwide Courier'
    });
    window.open(url, '_blank');
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-black border-l border-white/10 shadow-2xl flex flex-col font-sans">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-red-brand" />
              <h3 className="font-display font-bold text-base text-white">Your Print Cart</h3>
              <span className="text-xs font-mono bg-red-brand text-white px-2.5 py-0.5 rounded-full font-bold">
                {cart.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-neutral-500">
                  <ShoppingBag className="w-8 h-8 text-neutral-400" />
                </div>
                <h4 className="text-base font-bold text-white font-display">Your cart is empty.</h4>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto font-sans">
                  Browse our products or send us a custom project brief to get started.
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      navigate('products');
                      setIsCartOpen(false);
                    }}
                    className="btn-pill-red py-2.5 text-xs font-bold"
                  >
                    Browse Products
                  </button>
                  <button
                    onClick={() => {
                      navigate('get-a-quote');
                      setIsCartOpen(false);
                    }}
                    className="btn-pill-white py-2.5 text-xs font-bold"
                  >
                    Start a Project Brief
                  </button>
                </div>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-[#0D0E12] border border-white/10 space-y-3 relative group"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-white truncate font-display">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-500 hover:text-red-brand p-1 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      <div className="text-[11px] text-neutral-400 space-y-0.5 mt-1 font-mono">
                        <div>Qty: <span className="text-white font-bold">{item.quantity}</span> · {item.material}</div>
                        <div>Finish: <span className="text-white">{item.finish}</span></div>
                        <div className="text-red-brand flex items-center gap-1 mt-1 text-[10px] font-bold">
                          <ShieldCheck className="w-3 h-3 text-red-brand" /> Pre-flight verified
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs font-mono">
                    <span className="text-neutral-400">{item.turnaround}</span>
                    <span className="text-white font-bold text-sm">
                      Rs. {item.totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Delivery & Summary footer */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#0a0a0a] border-t border-white/10 space-y-4">
              
              {/* Delivery method switch */}
              <div className="bg-black p-2 rounded-2xl border border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block px-1">
                  Fulfilment Method
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setDeliveryType('lahore-pickup')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-mono transition text-left flex items-center justify-between ${
                      deliveryType === 'lahore-pickup'
                        ? 'bg-red-brand text-white font-bold'
                        : 'bg-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>Lahore Pickup</span>
                    <span className="text-[10px]">FREE</span>
                  </button>
                  <button
                    onClick={() => setDeliveryType('nationwide')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-mono transition text-left flex items-center justify-between ${
                      deliveryType === 'nationwide'
                        ? 'bg-red-brand text-white font-bold'
                        : 'bg-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>Nationwide TCS</span>
                    <span className="text-[10px]">Rs. 450</span>
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span>Rs. {cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between text-white text-base font-bold pt-2 border-t border-white/10 font-sans">
                  <span>Total</span>
                  <span className="text-red-brand font-mono">Rs. {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 rounded-full btn-pill-red text-xs font-bold flex items-center justify-center gap-2"
                >
                  <span>Continue to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleSendToWhatsApp}
                  className="w-full py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  <MessageSquare className="w-4 h-4 text-red-brand" />
                  <span>Send Cart to WhatsApp (0321 3656096)</span>
                </button>
              </div>

              <p className="text-[10px] text-center text-neutral-500 font-mono">
                Artwork pre-flighted before production. You approve before we print.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
