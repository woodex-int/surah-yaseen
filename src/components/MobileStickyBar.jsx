import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Phone, ArrowUpRight, ShoppingBag } from 'lucide-react';

export default function MobileStickyBar({ productPrice, onAddToCart }) {
  const { currentView, navigate } = useApp();

  const isProductPage = currentView === 'product-detail';

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-black/95 backdrop-blur-xl border-t border-white/10 px-4 py-2.5 shadow-2xl">
      {isProductPage ? (
        /* 3.2 Product Page Variant: [Total Price] [Add to Cart] [WhatsApp] */
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 shrink-0">
            <span className="text-[10px] text-neutral-400 block font-mono uppercase">Price</span>
            <span className="text-sm font-bold text-white font-mono">
              Rs. {productPrice ? productPrice.toLocaleString() : '1,850'}
            </span>
          </div>

          <button
            onClick={onAddToCart}
            className="flex-1 py-2.5 px-3 rounded-full btn-pill-coral text-xs font-bold flex items-center justify-center gap-1.5 shadow-glow-coral"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>

          <a
            href="https://wa.me/923213656096?text=Hi%20INPRINT,%20I%20am%20interested%20in%20this%20product."
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-full bg-white/10 text-white border border-white/15 flex items-center justify-center shrink-0"
            title="Order via WhatsApp"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
          </a>
        </div>
      ) : (
        /* 3.2 Global Mobile Bar: [WhatsApp] [Call] [Get Quote] */
        <div className="grid grid-cols-3 gap-2">
          <a
            href="https://wa.me/923213656096?text=Hi%20INPRINT,%20I%20have%20an%20enquiry."
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-white/5 border border-white/10 text-neutral-200 text-xs font-medium"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
            <span>WhatsApp</span>
          </a>

          <a
            href="tel:03213656096"
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-white/5 border border-white/10 text-neutral-200 text-xs font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-white" />
            <span>Call</span>
          </a>

          <button
            onClick={() => navigate('get-a-quote')}
            className="flex items-center justify-center gap-1 py-2.5 rounded-full btn-pill-white text-xs font-bold"
          >
            <span>Get Quote</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
