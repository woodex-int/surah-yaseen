import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, BRAND, SAMPLE_ORDERS } from '../data/inprintData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation / View State
  // routes: 'home', 'products', 'product-detail', 'services', 'service-detail', 'solutions', 'industries', 'our-work', 'franchise', 'get-a-quote', 'book-site-visit', 'track-order', 'cart', 'checkout', 'order-confirmation', 'account', 'artwork-guide', 'templates', 'material-guide', 'faqs', 'blog', 'reviews', 'trade-account'
  const [currentView, setCurrentView] = useState('home');
  const [viewParams, setViewParams] = useState({});

  // Search modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Cart state
  const [cart, setCart] = useState(() => {
    // default with 1 standard sample or empty
    return [
      {
        id: 'cart-item-1',
        product: PRODUCTS[0], // Business cards
        quantity: 500,
        material: PRODUCTS[0].materials[1].name,
        finish: PRODUCTS[0].finishes[0].name,
        sides: PRODUCTS[0].printSides[1].name,
        artworkStatus: 'Upload my artwork',
        turnaround: 'Standard 24-48 hrs',
        unitPrice: 4200,
        totalPrice: 4200,
        artworkFileName: 'inprint_brand_card_v2.pdf'
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Active product for detail page
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);

  // Active case study for modal
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);

  // Active service or solution
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedSolutionId, setSelectedSolutionId] = useState(null);
  const [selectedIndustryId, setSelectedIndustryId] = useState(null);

  // Last confirmed order
  const [lastOrder, setLastOrder] = useState(null);

  // Saved quotes for user account
  const [savedQuotes, setSavedQuotes] = useState([
    {
      id: 'QUOTE-491',
      date: '2026-09-22',
      productName: '3D Letter Signage Facade',
      specs: 'Cast Acrylic + Halo LED, 12ft width, Model Town, Lahore',
      estimatedPrice: 38500
    }
  ]);

  // Notifications
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Navigate helper
  const navigate = (view, params = {}) => {
    setCurrentView(view);
    setViewParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut for Cmd+K search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cart operations
  const addToCart = (item) => {
    setCart((prev) => [...prev, { ...item, id: `cart-${Date.now()}` }]);
    showToast(`Added ${item.product.name} to cart!`);
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    showToast('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.totalPrice || 0), 0);

  return (
    <AppContext.Provider
      value={{
        currentView,
        viewParams,
        navigate,
        isSearchOpen,
        setIsSearchOpen,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        clearCart,
        cartSubtotal,
        selectedProduct,
        setSelectedProduct,
        activeCaseStudy,
        setActiveCaseStudy,
        selectedServiceId,
        setSelectedServiceId,
        selectedSolutionId,
        setSelectedSolutionId,
        selectedIndustryId,
        setSelectedIndustryId,
        lastOrder,
        setLastOrder,
        savedQuotes,
        setSavedQuotes,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
