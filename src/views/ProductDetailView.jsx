import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, createWhatsAppUrl, FAQS } from '../data/inprintData';
import { 
  ShieldCheck, MapPin, UploadCloud, MessageSquare, 
  ShoppingBag, Check, Bookmark 
} from 'lucide-react';
import MobileStickyBar from '../components/MobileStickyBar';
import { validatePrintFile } from '../utils/fileValidator';

export default function ProductDetailView() {
  const { selectedProduct, navigate, addToCart, showToast, setSavedQuotes } = useApp();
  const product = selectedProduct || PRODUCTS[0];

  // Active gallery image
  const [activeImage, setActiveImage] = useState(product.gallery ? product.gallery[0] : product.image);

  // Configuration options state
  const [quantity, setQuantity] = useState(product.quantities ? product.quantities[1] || product.quantities[0] : 100);
  const [customQty, setCustomQty] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState(product.materials ? product.materials[0] : null);
  const [selectedFinish, setSelectedFinish] = useState(product.finishes ? product.finishes[0] : null);
  const [selectedSide, setSelectedSide] = useState(product.printSides ? product.printSides[0] : null);
  const [artworkOption, setArtworkOption] = useState('upload'); // 'upload', 'design', 'later'
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [speedOption, setSpeedOption] = useState('standard'); // 'standard' or 'rush'
  const [deliveryCity, setDeliveryCity] = useState('Lahore');
  const [deliveryType, setDeliveryType] = useState('pickup'); // 'pickup' or 'courier'

  // Dynamic price calculation
  const calculatedPrice = useMemo(() => {
    const actualQty = customQty ? parseInt(customQty, 10) || quantity : quantity;
    const baseQty = product.quantities ? product.quantities[0] : 1;
    
    // Scale unit pricing
    const qtyRatio = actualQty / baseQty;
    // Volume discount curve
    const volumeFactor = actualQty > 1000 ? 0.8 : actualQty > 500 ? 0.9 : 1.0;

    let unitBase = product.basePrice;
    if (selectedMaterial) unitBase *= selectedMaterial.priceMultiplier;
    if (selectedSide) unitBase *= selectedSide.multiplier;

    let finishCost = selectedFinish ? selectedFinish.addCost : 0;
    if (actualQty > baseQty && finishCost > 0) {
      finishCost = finishCost * (1 + (actualQty / baseQty - 1) * 0.4);
    }

    let sub = (unitBase * qtyRatio * volumeFactor) + finishCost;

    if (speedOption === 'rush') {
      sub *= 1.25; // 25% urgent production fee
    }

    if (artworkOption === 'design') {
      sub += 1500; // Flat design support fee
    }

    return Math.round(sub / 50) * 50; // Rounded to nearest 50 Rs.
  }, [product, quantity, customQty, selectedMaterial, selectedFinish, selectedSide, speedOption, artworkOption]);

  // Dynamic dispatch date calculation
  const estimatedDispatch = useMemo(() => {
    const date = new Date();
    const daysToAdd = speedOption === 'rush' ? 1 : 2;
    date.setDate(date.getDate() + daysToAdd);
    return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  }, [speedOption]);

  const handleAddToCart = () => {
    const item = {
      product: product,
      quantity: customQty ? parseInt(customQty, 10) : quantity,
      material: selectedMaterial ? selectedMaterial.name : 'Standard',
      finish: selectedFinish ? selectedFinish.name : 'Standard',
      sides: selectedSide ? selectedSide.name : 'Single',
      artworkStatus: artworkOption === 'upload' ? (uploadedFileName || 'File Uploaded') : artworkOption === 'design' ? 'Design Support Requested' : 'Will Send Later',
      turnaround: speedOption === 'rush' ? 'Urgent Rush' : 'Standard Turnaround',
      delivery: deliveryType === 'pickup' ? 'Lahore Pickup' : `TCS to ${deliveryCity}`,
      unitPrice: calculatedPrice,
      totalPrice: calculatedPrice,
      artworkFileName: uploadedFileName || null
    };
    addToCart(item);
  };

  const handleOrderWhatsApp = () => {
    const url = createWhatsAppUrl('product', {
      productName: product.name,
      quantity: customQty ? customQty : quantity,
      material: selectedMaterial ? selectedMaterial.name : 'Standard',
      finish: selectedFinish ? selectedFinish.name : 'Standard',
      city: deliveryCity
    });
    window.open(url, '_blank');
  };

  const handleSaveQuote = () => {
    const quote = {
      id: `QUOTE-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      productName: product.name,
      specs: `${quantity} pcs, ${selectedMaterial?.name || ''}, ${selectedFinish?.name || ''}`,
      estimatedPrice: calculatedPrice
    };
    setSavedQuotes((prev) => [quote, ...prev]);
    showToast(`Quote saved for ${product.name}! View in Account.`);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validatePrintFile(file);
    if (!validation.valid) {
      showToast(validation.error);
      e.target.value = '';
      return;
    }

    setUploadedFileName(`${file.name} (${validation.fileSizeMB} MB)`);
    showToast(`Pre-flight file validated: ${file.name}`);
  };

  return (
    <div className="pt-6 pb-24 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 font-sans bg-black">
      
      {/* P01 — Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
        <button onClick={() => navigate('home')} className="hover:text-white transition">
          Home
        </button>
        <span>/</span>
        <button onClick={() => navigate('products')} className="hover:text-white transition">
          Products
        </button>
        <span>/</span>
        <button 
          onClick={() => navigate('products', { category: product.category })} 
          className="hover:text-white transition"
        >
          {product.categoryName}
        </button>
        <span>/</span>
        <span className="text-red-brand font-bold">{product.name}</span>
      </nav>

      {/* Main Product Layout: Gallery + Live Configurator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* P03 — Product Gallery Left (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#0D0E12] border border-white/10 shadow-2xl">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/15 text-[11px] font-mono">
                {product.categoryName}
              </span>
              <span className="px-3 py-1 rounded-full bg-red-brand text-white text-[11px] font-mono font-bold">
                {product.turnaround}
              </span>
            </div>
          </div>

          {/* Gallery Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-3">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border transition ${
                    activeImage === img ? 'border-red-brand scale-105' : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Trust points card */}
          <div className="p-5 rounded-2xl bg-[#0D0E12] border border-white/10 space-y-3 text-xs text-neutral-300 font-mono">
            <div className="flex items-center gap-2.5 text-white">
              <ShieldCheck className="w-4 h-4 text-red-brand shrink-0" />
              <span>Artwork checked by print technicians before production</span>
            </div>
            <div className="flex items-center gap-2.5 text-neutral-300">
              <Check className="w-4 h-4 text-red-brand shrink-0" />
              <span>Digital PDF soft proof sent for client approval</span>
            </div>
            <div className="flex items-center gap-2.5 text-neutral-300">
              <MapPin className="w-4 h-4 text-red-brand shrink-0" />
              <span>Model Town Lahore pickup or Tracked TCS dispatch</span>
            </div>
          </div>
        </div>

        {/* P02 & P04 — Live Configuration Panel Right (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Header */}
          <div className="space-y-2 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="pill-badge-red text-[10px]">
                {product.categoryName}
              </span>
              <div className="flex items-center gap-1 text-red-brand text-xs font-mono font-bold">
                <span>★ {product.rating}</span>
                <span className="text-neutral-400 font-normal">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
              {product.name}
            </h1>
            <p className="text-neutral-300 text-sm leading-relaxed">
              {product.intro || product.shortDesc}
            </p>
          </div>

          {/* Configuration Options */}
          <div className="space-y-6 bg-[#0D0E12] p-6 sm:p-8 rounded-3xl border border-white/10">
            
            {/* 1. Quantity Selector */}
            {product.quantities && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-neutral-400 uppercase tracking-wider">
                    Select Quantity:
                  </span>
                  <span className="font-mono text-red-brand font-bold">
                    {customQty ? `${customQty} pcs (Custom)` : `${quantity} pcs`}
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {product.quantities.map((qty) => (
                    <button
                      key={qty}
                      onClick={() => { setQuantity(qty); setCustomQty(''); }}
                      className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition border ${
                        quantity === qty && !customQty
                          ? 'bg-red-brand text-white border-red-brand'
                          : 'bg-white/5 text-neutral-300 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {qty.toLocaleString()}
                    </button>
                  ))}
                  <div className="col-span-3 sm:col-span-1">
                    <input
                      type="number"
                      placeholder="Custom"
                      value={customQty}
                      onChange={(e) => setCustomQty(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl text-xs font-mono text-center bg-black border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-red-brand"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2. Material Selector */}
            {product.materials && (
              <div className="space-y-2">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                  Material Stock:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.materials.map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => setSelectedMaterial(mat)}
                      className={`p-3 rounded-xl text-left border transition flex items-center justify-between ${
                        selectedMaterial?.id === mat.id
                          ? 'bg-white/10 border-red-brand text-white'
                          : 'bg-white/[0.02] border-white/10 text-neutral-300 hover:border-white/20'
                      }`}
                    >
                      <span className="text-xs font-medium">{mat.name}</span>
                      {selectedMaterial?.id === mat.id && (
                        <Check className="w-4 h-4 text-red-brand shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Printing Sides */}
            {product.printSides && product.printSides.length > 1 && (
              <div className="space-y-2">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                  Printing Sides:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {product.printSides.map((side) => (
                    <button
                      key={side.id}
                      onClick={() => setSelectedSide(side)}
                      className={`p-3 rounded-xl text-center text-xs font-mono border transition ${
                        selectedSide?.id === side.id
                          ? 'bg-red-brand text-white border-red-brand font-bold'
                          : 'bg-white/5 border-white/10 text-neutral-300 hover:border-white/20'
                      }`}
                    >
                      {side.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Finishes */}
            {product.finishes && (
              <div className="space-y-2">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                  Finishing & Embellishment:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.finishes.map((fin) => (
                    <button
                      key={fin.id}
                      onClick={() => setSelectedFinish(fin)}
                      className={`p-3 rounded-xl text-left text-xs border transition flex items-center justify-between ${
                        selectedFinish?.id === fin.id
                          ? 'bg-white/10 border-red-brand text-white'
                          : 'bg-white/[0.02] border-white/10 text-neutral-300 hover:border-white/20'
                      }`}
                    >
                      <span>{fin.name}</span>
                      {fin.addCost > 0 ? (
                        <span className="text-[10px] font-mono text-red-brand font-bold">+Rs. {fin.addCost}</span>
                      ) : (
                        <span className="text-[10px] font-mono text-neutral-400">Included</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Artwork Upload / Support Option */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                Artwork Provision:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setArtworkOption('upload')}
                  className={`p-2.5 rounded-xl text-xs text-center border transition font-mono ${
                    artworkOption === 'upload'
                      ? 'bg-red-brand text-white border-red-brand font-bold'
                      : 'bg-white/5 border-white/10 text-neutral-300 hover:border-white/20'
                  }`}
                >
                  Upload Artwork
                </button>
                <button
                  onClick={() => setArtworkOption('design')}
                  className={`p-2.5 rounded-xl text-xs text-center border transition font-mono ${
                    artworkOption === 'design'
                      ? 'bg-red-brand text-white border-red-brand font-bold'
                      : 'bg-white/5 border-white/10 text-neutral-300 hover:border-white/20'
                  }`}
                >
                  Need Design (+1.5k)
                </button>
                <button
                  onClick={() => setArtworkOption('later')}
                  className={`p-2.5 rounded-xl text-xs text-center border transition font-mono ${
                    artworkOption === 'later'
                      ? 'bg-red-brand text-white border-red-brand font-bold'
                      : 'bg-white/5 border-white/10 text-neutral-300 hover:border-white/20'
                  }`}
                >
                  Send on WhatsApp
                </button>
              </div>

              {/* Upload Dropzone if 'upload' selected */}
              {artworkOption === 'upload' && (
                <div className="mt-3 p-4 rounded-xl border border-dashed border-white/20 bg-black text-center space-y-2 relative">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept=".pdf,.ai,.psd,.cdr,.jpg,.png"
                  />
                  <UploadCloud className="w-6 h-6 text-red-brand mx-auto" />
                  <div className="text-xs text-neutral-300 font-sans">
                    {uploadedFileName ? (
                      <span className="text-red-brand font-mono font-bold">{uploadedFileName}</span>
                    ) : (
                      <span>Drag & drop print-ready PDF / AI or click to browse</span>
                    )}
                  </div>
                  <div className="text-[10px] text-neutral-500 font-mono">
                    Supported: PDF, AI, CDR, TIFF, PSD up to 100MB
                  </div>
                </div>
              )}
            </div>

            {/* 6. Turnaround Speed */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                Production Turnaround:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSpeedOption('standard')}
                  className={`p-3 rounded-xl text-left border transition flex items-center justify-between ${
                    speedOption === 'standard'
                      ? 'bg-white/10 border-white text-white'
                      : 'bg-white/5 border-white/10 text-neutral-300'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold">Standard Schedule</div>
                    <div className="text-[10px] text-neutral-400 font-mono">{product.turnaround}</div>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">Standard</span>
                </button>

                <button
                  onClick={() => setSpeedOption('rush')}
                  className={`p-3 rounded-xl text-left border transition flex items-center justify-between ${
                    speedOption === 'rush'
                      ? 'bg-red-brand/10 border-red-brand text-white'
                      : 'bg-white/5 border-white/10 text-neutral-300'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-red-brand">Urgent Rush (+25%)</div>
                    <div className="text-[10px] text-neutral-400 font-mono">Fast-Track Press Queue</div>
                  </div>
                  <span className="text-[10px] font-mono text-red-brand font-bold">Urgent</span>
                </button>
              </div>
            </div>

            {/* 7. Fulfilment: Lahore Pickup vs City Courier */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                Dispatch & Delivery City:
              </span>
              <div className="flex gap-2">
                <select
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  className="flex-1 bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-brand font-mono"
                >
                  <option value="Lahore">Lahore (Model Town Pickup / Local Van)</option>
                  <option value="Karachi">Karachi (TCS Tracked Courier)</option>
                  <option value="Islamabad">Islamabad (TCS Tracked Courier)</option>
                  <option value="Rawalpindi">Rawalpindi (TCS Tracked Courier)</option>
                  <option value="Faisalabad">Faisalabad (TCS Tracked Courier)</option>
                  <option value="Multan">Multan (TCS Tracked Courier)</option>
                  <option value="Sialkot">Sialkot (TCS Tracked Courier)</option>
                  <option value="Peshawar">Peshawar (TCS Tracked Courier)</option>
                  <option value="Quetta">Quetta (TCS Tracked Courier)</option>
                </select>
              </div>
            </div>

            {/* P05 — Price Summary & CTA Actions */}
            <div className="p-6 rounded-2xl bg-black border border-white/10 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-neutral-400 font-mono block">Calculated Price</span>
                  <span className="font-display font-black text-3xl sm:text-4xl text-red-brand font-mono">
                    Rs. {calculatedPrice.toLocaleString()}
                  </span>
                </div>
                <div className="text-right text-xs font-mono text-neutral-400">
                  <div>Estimated Dispatch:</div>
                  <div className="text-white font-bold">{estimatedDispatch}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="col-span-1 sm:col-span-2 py-3.5 rounded-full btn-pill-red text-xs font-bold flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleOrderWhatsApp}
                  className="py-3.5 rounded-full btn-pill-white text-xs font-bold flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-red-brand" />
                  <span>WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-neutral-400">
                <button
                  onClick={handleSaveQuote}
                  className="hover:text-white flex items-center gap-1.5 transition"
                >
                  <Bookmark className="w-3.5 h-3.5 text-red-brand" /> Save This Quote
                </button>
                <span>Call 0321 3656096 for custom specs</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* P06 — Product Overview & Benefits */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#0D0E12] border border-white/10 space-y-4">
        <h3 className="font-display font-black text-2xl text-white">Product overview</h3>
        <p className="text-sm text-neutral-300 leading-relaxed max-w-3xl font-sans">
          This product is produced according to the options selected above. Choose your quantity, material and finish to create an order that matches your brand, audience and deadline. Our production team reviews every file before press setup to ensure razor-sharp clarity and perfect color reproduction.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-red-brand" /> Clear Specifications
            </h4>
            <p className="text-[11px] text-neutral-400 font-sans">Standardized sizes and verified substrates suitable for repeat commercial reorders.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-red-brand" /> Pre-Flight File Review
            </h4>
            <p className="text-[11px] text-neutral-400 font-sans">We inspect CMYK color curves, resolution, and bleeds before printing.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-red-brand" /> Flexible Batch Quantities
            </h4>
            <p className="text-[11px] text-neutral-400 font-sans">Order trial pilot batches or full commercial runs with volume economies of scale.</p>
          </div>
        </div>
      </div>

      {/* P07 — Specifications Table */}
      {product.specs && (
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0D0E12] border border-white/10 space-y-4">
          <h3 className="font-display font-black text-2xl text-white">Technical specifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-black border border-white/5">
              <span className="text-neutral-500 block mb-1">Standard Size</span>
              <span className="text-white font-semibold">{product.specs.standardSize}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-black border border-white/5">
              <span className="text-neutral-500 block mb-1">Bleed Requirement</span>
              <span className="text-white font-semibold">{product.specs.bleed}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-black border border-white/5">
              <span className="text-neutral-500 block mb-1">Print Method</span>
              <span className="text-white font-semibold">{product.specs.printMethod}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-black border border-white/5">
              <span className="text-neutral-500 block mb-1">Resolution</span>
              <span className="text-white font-semibold">{product.specs.resolution}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-black border border-white/5">
              <span className="text-neutral-500 block mb-1">Minimum Order Qty</span>
              <span className="text-white font-semibold">{product.specs.minQty}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-black border border-white/5">
              <span className="text-neutral-500 block mb-1">Delivery / Pickup</span>
              <span className="text-white font-semibold">Lahore Pickup + Nationwide TCS</span>
            </div>
          </div>
        </div>
      )}

      {/* P08 — Artwork Section */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#0D0E12] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="font-display font-black text-2xl text-white">
            Send artwork or ask us to help.
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
            Upload a print-ready file, send your existing artwork or request design support. Our team will review the file and contact you if anything needs to be adjusted before production.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <button 
            onClick={() => navigate('artwork-guide')}
            className="btn-pill-white text-xs font-bold"
          >
            Download Artwork Guidelines
          </button>
          <button 
            onClick={() => setArtworkOption('design')}
            className="btn-pill-red text-xs font-bold"
          >
            Request Design Support
          </button>
        </div>
      </div>

      {/* P10 — FAQs */}
      <div className="space-y-4">
        <h3 className="font-display font-black text-2xl text-white">
          Frequently asked questions about {product.name}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS.slice(0, 4).map((faq, i) => (
            <div key={i} className="p-5 rounded-2xl bg-[#0D0E12] border border-white/10 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-red-brand font-mono text-xs">Q.</span> {faq.question}
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* P11 — Related Products */}
      <div className="space-y-6 pt-6 border-t border-white/10">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-red-brand block mb-1">
              COMPLEMENTARY ITEMS
            </span>
            <h3 className="font-display font-black text-2xl text-white">
              Related products
            </h3>
          </div>
          <button
            onClick={() => navigate('products')}
            className="text-xs text-red-brand hover:underline font-mono"
          >
            View All Catalog →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4).map((p) => (
            <div
              key={p.id}
              onClick={() => {
                navigate('product-detail', { slug: p.slug });
              }}
              className="group p-4 rounded-2xl bg-[#0D0E12] border border-white/10 hover:border-red-brand transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-black">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-red-brand transition font-display">
                  {p.name}
                </h4>
                <p className="text-xs text-neutral-400 line-clamp-2 mt-1 font-sans">{p.shortDesc}</p>
              </div>
              <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-red-brand font-bold">Rs. {p.basePrice.toLocaleString()}</span>
                <span className="text-neutral-400 group-hover:text-white">Configure →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Sticky Bar for Product Page */}
      <MobileStickyBar 
        productPrice={calculatedPrice}
        onAddToCart={handleAddToCart}
      />

    </div>
  );
}
