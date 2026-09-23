import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/inprintData';
import { 
  Package, Bookmark, FolderArchive, RotateCcw, MapPin, 
  FileText, User, Headphones, MessageSquare 
} from 'lucide-react';

export default function AccountView() {
  const { navigate, savedQuotes, addToCart, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('orders');
  const [reorderConfirmItem, setReorderConfirmItem] = useState(null);

  const mockPastOrders = [
    {
      orderNumber: "INP-8492",
      orderDate: "2026-09-21",
      product: PRODUCTS[0], // Business cards
      quantity: 500,
      material: "400gsm Velvet Soft Touch",
      finish: "Spot UV + Matte",
      sides: "Double-sided",
      totalPrice: 4200,
      currentStatus: "In production",
      delivery: "Lahore Pickup"
    },
    {
      orderNumber: "INP-8104",
      orderDate: "2026-08-14",
      product: PRODUCTS[4], // Product boxes
      quantity: 1000,
      material: "350gsm Solid Bleached Board",
      finish: "Soft Matte + Foil",
      sides: "Outer 4C Process Only",
      totalPrice: 45000,
      currentStatus: "Delivered",
      delivery: "TCS to Gulberg, Lahore"
    }
  ];

  const handleConfirmReorder = (order) => {
    addToCart({
      product: order.product,
      quantity: order.quantity,
      material: order.material,
      finish: order.finish,
      sides: order.sides,
      artworkStatus: 'Reorder from Previous File (Approved)',
      turnaround: 'Standard 24-48 hrs',
      unitPrice: order.totalPrice,
      totalPrice: order.totalPrice,
      artworkFileName: 'archived_press_file.pdf'
    });
    setReorderConfirmItem(null);
    showToast('Reorder added to cart with identical previous specifications!');
  };

  return (
    <div className="pt-8 pb-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-10 font-sans bg-black">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">Home</button>
        <span>/</span>
        <span className="text-red-brand font-bold">Client Dashboard</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="pill-badge-red text-[11px] uppercase">
            CLIENT WORKSPACE
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
            Customer Account & Reorders
          </h1>
        </div>
        <div className="text-xs font-mono text-neutral-400">
          Account: <span className="text-white font-bold">Client Partner #4802</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar (3 cols) */}
        <div className="lg:col-span-3 p-4 rounded-3xl bg-[#0D0E12] border border-white/10 space-y-1 text-xs font-mono">
          {[
            { id: 'orders', label: 'Orders', icon: Package },
            { id: 'quotes', label: 'Saved Quotes', icon: Bookmark },
            { id: 'artwork', label: 'Artwork Library', icon: FolderArchive },
            { id: 'reorder', label: '1-Click Reorder', icon: RotateCcw },
            { id: 'addresses', label: 'Delivery Addresses', icon: MapPin },
            { id: 'invoices', label: 'GST Invoices', icon: FileText },
            { id: 'profile', label: 'Company Profile', icon: User },
            { id: 'support', label: 'Dedicated Producer', icon: Headphones },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 transition font-mono ${
                  activeTab === tab.id
                    ? 'bg-red-brand text-white font-bold'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area (9 cols) */}
        <div className="lg:col-span-9 p-6 sm:p-8 rounded-3xl bg-[#0D0E12] border border-white/10 space-y-6">
          
          {/* Tab: Orders & Reorder */}
          {(activeTab === 'orders' || activeTab === 'reorder') && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <h3 className="font-display font-black text-xl text-white">
                  {activeTab === 'reorder' ? 'Quick Reorder from Past Jobs' : 'Your Order History'}
                </h3>
                <span className="text-xs font-mono text-neutral-400">
                  {mockPastOrders.length} records found
                </span>
              </div>

              <div className="space-y-4">
                {mockPastOrders.map((ord) => (
                  <div
                    key={ord.orderNumber}
                    className="p-6 rounded-2xl bg-black border border-white/10 space-y-4 font-mono text-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/5 gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-400">Order:</span>
                        <span className="text-red-brand font-bold">{ord.orderNumber}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-red-brand/10 text-red-brand border border-red-brand/20 font-bold">
                          {ord.currentStatus}
                        </span>
                      </div>
                      <span className="text-neutral-500">Date: {ord.orderDate}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-display font-bold text-base text-white">
                          {ord.product.name}
                        </h4>
                        <div className="text-neutral-400 text-[11px] space-y-0.5 mt-1 font-sans">
                          <div>Qty: {ord.quantity} · {ord.material}</div>
                          <div>Finish: {ord.finish}</div>
                          <div>Fulfilment: {ord.delivery}</div>
                        </div>
                      </div>

                      <div className="text-right sm:text-right">
                        <div className="text-sm font-bold text-red-brand mb-2 font-mono">
                          Rs. {ord.totalPrice.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => navigate('track-order')}
                            className="btn-pill-white text-xs py-1.5 px-3"
                          >
                            Track
                          </button>
                          <button
                            onClick={() => setReorderConfirmItem(ord)}
                            className="btn-pill-red text-xs py-1.5 px-3 font-bold"
                          >
                            Reorder Specs
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Saved Quotes */}
          {activeTab === 'quotes' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <h3 className="font-display font-black text-xl text-white">Saved Project Quotes</h3>
                <span className="text-xs font-mono text-neutral-400">{savedQuotes.length} saved</span>
              </div>

              {savedQuotes.length === 0 ? (
                <p className="text-xs text-neutral-400 py-6 font-sans">No saved quotes yet.</p>
              ) : (
                <div className="space-y-3 font-mono text-xs">
                  {savedQuotes.map((q) => (
                    <div key={q.id} className="p-4 rounded-xl bg-black border border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-white font-bold">{q.productName}</div>
                        <div className="text-neutral-400 text-[11px] font-sans">{q.specs}</div>
                        <div className="text-neutral-500 text-[10px] mt-1">Saved on {q.date} · Ref: {q.id}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-red-brand font-bold text-sm mb-2">
                          Rs. {q.estimatedPrice.toLocaleString()}
                        </div>
                        <button
                          onClick={() => {
                            navigate('get-a-quote');
                          }}
                          className="btn-pill-red text-xs py-1 px-3"
                        >
                          Book Production
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab: Artwork Library */}
          {activeTab === 'artwork' && (
            <div className="space-y-4 font-mono text-xs">
              <h3 className="font-display font-black text-xl text-white">Artwork & Vector Master Library</h3>
              <p className="text-neutral-400 font-sans">Pre-approved print-ready artwork archived for your account.</p>
              <div className="space-y-2 pt-2">
                <div className="p-4 rounded-xl bg-black border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-white font-bold">inprint_corporate_card_vector.pdf</div>
                    <div className="text-[10px] text-neutral-500">CMYK Fogra39 · Outlined Fonts · 3mm Bleed</div>
                  </div>
                  <span className="text-red-brand font-bold font-mono">Verified Print-Ready</span>
                </div>
                <div className="p-4 rounded-xl bg-black border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-white font-bold">custom_folding_box_dieline_v3.ai</div>
                    <div className="text-[10px] text-neutral-500">Structural Packaging Dieline · Crease lines active</div>
                  </div>
                  <span className="text-red-brand font-bold font-mono">Verified Print-Ready</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-4 font-mono text-xs">
              <h3 className="font-display font-black text-xl text-white">Registered Delivery Destinations</h3>
              <div className="p-4 rounded-xl bg-black border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">Primary Corporate Office</span>
                  <span className="text-red-brand font-bold">Default</span>
                </div>
                <p className="text-neutral-300 font-sans">Office 402, Block L, Gulberg III, Lahore, Pakistan</p>
                <div className="text-neutral-500">Contact: 0321 3656096</div>
              </div>
            </div>
          )}

          {/* Tab: Invoices */}
          {activeTab === 'invoices' && (
            <div className="space-y-4 font-mono text-xs">
              <h3 className="font-display font-black text-xl text-white">Tax & Payment Invoices</h3>
              <div className="p-4 rounded-xl bg-black border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold">INV-2026-0891 (Order INP-8492)</div>
                  <div className="text-neutral-400">Rs. 4,200 · Paid via IBFT</div>
                </div>
                <button onClick={() => showToast('Downloading PDF invoice...')} className="btn-pill-white text-xs py-1 px-3">
                  Download PDF
                </button>
              </div>
            </div>
          )}

          {/* Tab: Dedicated Producer Support */}
          {activeTab === 'support' && (
            <div className="p-6 rounded-2xl bg-black border border-white/10 space-y-4">
              <h3 className="font-display font-black text-xl text-white">Your Dedicated Lahore Production Producer</h3>
              <p className="text-xs text-neutral-300 font-sans">
                You have an assigned technical account executive at Zainab Tower, Model Town. For custom substrate trials, bulk order schedules, or site visits, message directly:
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://wa.me/923213656096?text=Hi%20INPRINT,%20I%20am%20contacting%20my%20dedicated%20producer."
                  target="_blank"
                  rel="noreferrer"
                  className="btn-pill-red text-xs font-bold flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Producer: 0321 3656096</span>
                </a>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* 24.3 Reorder UX Confirmation Modal */}
      {reorderConfirmItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#0D0E12] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <h3 className="font-display font-black text-xl text-white">
              Reorder previous specifications
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed font-sans">
              This order will be added using the previous specifications. Please review price, delivery time and artwork before submitting.
            </p>

            <div className="p-4 rounded-xl bg-black border border-white/10 font-mono text-xs space-y-1">
              <div className="text-white font-bold">{reorderConfirmItem.product.name}</div>
              <div className="text-neutral-400">Qty: {reorderConfirmItem.quantity} · {reorderConfirmItem.material}</div>
              <div className="text-neutral-400">Finish: {reorderConfirmItem.finish}</div>
              <div className="text-red-brand font-bold pt-1">Total: Rs. {reorderConfirmItem.totalPrice.toLocaleString()}</div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setReorderConfirmItem(null)}
                className="btn-pill-white text-xs py-2 px-4"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmReorder(reorderConfirmItem)}
                className="btn-pill-red text-xs py-2 px-4 font-bold"
              >
                Confirm & Reorder
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
