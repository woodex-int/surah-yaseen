import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, BRAND, SAMPLE_ORDERS } from '../data/inprintData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation / View State synchronized with URL path & search
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const cleanPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
      return cleanPath || 'home';
    }
    return 'home';
  });

  const [viewParams, setViewParams] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return Object.fromEntries(params.entries());
    }
    return {};
  });

  // Search modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Cart state with localStorage fallback
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('inprint_cart');
        if (stored) return JSON.parse(stored);
      } catch (e) {
        // Fallback to default
      }
    }
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

  // Persist cart to localStorage on changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('inprint_cart', JSON.stringify(cart));
      } catch (e) {
        // Ignore storage quotas
      }
    }
  }, [cart]);

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Active product for detail page
  const [selectedProduct, setSelectedProduct] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get('slug');
      if (slug) {
        const found = PRODUCTS.find((p) => p.slug === slug);
        if (found) return found;
      }
    }
    return PRODUCTS[0];
  });

  // Active case study for modal
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);

  // Active service or solution
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedSolutionId, setSelectedSolutionId] = useState(null);
  const [selectedIndustryId, setSelectedIndustryId] = useState(null);

  // Last confirmed order
  const [lastOrder, setLastOrder] = useState(null);

  // Saved quotes with localStorage persistence
  const [savedQuotes, setSavedQuotes] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('inprint_saved_quotes');
        if (stored) return JSON.parse(stored);
      } catch (e) {}
    }
    return [
      {
        id: 'QUOTE-491',
        date: '2026-09-22',
        productName: '3D Letter Signage Facade',
        specs: 'Cast Acrylic + Halo LED, 12ft width, Model Town, Lahore',
        estimatedPrice: 38500
      }
    ];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('inprint_saved_quotes', JSON.stringify(savedQuotes));
      } catch (e) {}
    }
  }, [savedQuotes]);

  // Notifications
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Synchronized Navigation helper with HTML5 History
  const navigate = (view, params = {}, replace = false) => {
    setCurrentView(view);
    setViewParams(params);

    if (typeof window !== 'undefined') {
      try {
        const query = new URLSearchParams(params).toString();
        const targetPath = view === 'home' ? '/' : `/${view}`;
        const targetUrl = `${targetPath}${query ? `?${query}` : ''}`;

        if (replace) {
          window.history.replaceState({ view, params }, '', targetUrl);
        } else {
          window.history.pushState({ view, params }, '', targetUrl);
        }
      } catch (e) {
        // Sandboxed iframes may restrict pushState
      }

      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (e) {}
    }
  };

  // Handle browser Back / Forward navigation
  useEffect(() => {
    const handlePopState = (e) => {
      try {
        if (e.state && e.state.view) {
          setCurrentView(e.state.view);
          setViewParams(e.state.params || {});
        } else {
          const cleanPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
          setCurrentView(cleanPath || 'home');
          const p = new URLSearchParams(window.location.search);
          setViewParams(Object.fromEntries(p.entries()));
        }
      } catch (err) {}
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
