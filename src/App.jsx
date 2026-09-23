import React from 'react';
import { useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileStickyBar from './components/MobileStickyBar';
import SearchModal from './components/SearchModal';
import CartDrawer from './components/CartDrawer';
import HomeView from './views/HomeView';
import ProductsView from './views/ProductsView';
import ProductDetailView from './views/ProductDetailView';
import ServicesView from './views/ServicesView';
import FranchiseView from './views/FranchiseView';
import SolutionsView from './views/SolutionsView';
import IndustriesView from './views/IndustriesView';
import PortfolioView from './views/PortfolioView';
import GetAQuoteView from './views/GetAQuoteView';
import BookSiteVisitView from './views/BookSiteVisitView';
import TrackOrderView from './views/TrackOrderView';
import CartView from './views/CartView';
import CheckoutView from './views/CheckoutView';
import OrderConfirmationView from './views/OrderConfirmationView';
import AccountView from './views/AccountView';
import { 
  ArtworkGuideView, TemplatesView, MaterialGuideView, 
  FaqsView, BlogView, ReviewsView, TradeAccountView 
} from './views/ResourcesViews';
import { MessageSquare, CheckCircle2 } from 'lucide-react';

export default function App() {
  const { currentView, toastMessage } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'products':
        return <ProductsView />;
      case 'product-detail':
        return <ProductDetailView />;
      case 'services':
        return <ServicesView />;
      case 'franchise':
        return <FranchiseView />;
      case 'solutions':
        return <SolutionsView />;
      case 'industries':
        return <IndustriesView />;
      case 'our-work':
        return <PortfolioView />;
      case 'get-a-quote':
        return <GetAQuoteView />;
      case 'book-site-visit':
        return <BookSiteVisitView />;
      case 'track-order':
        return <TrackOrderView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'order-confirmation':
        return <OrderConfirmationView />;
      case 'account':
        return <AccountView />;
      case 'artwork-guide':
        return <ArtworkGuideView />;
      case 'templates':
        return <TemplatesView />;
      case 'material-guide':
        return <MaterialGuideView />;
      case 'faqs':
        return <FaqsView />;
      case 'blog':
        return <BlogView />;
      case 'reviews':
        return <ReviewsView />;
      case 'trade-account':
        return <TradeAccountView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-950 text-slate-100 font-sans selection:bg-lime-brand selection:text-black">
      {/* Global Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderView()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Overlays & Modals */}
      <SearchModal />
      <CartDrawer />

      {/* Mobile Sticky Bar (Section 3.2) - Product page manages its own or uses global */}
      {currentView !== 'product-detail' && <MobileStickyBar />}

      {/* WhatsApp Floating Action Button */}
      <a
        href="https://wa.me/923213656096?text=Hi%20INPRINT,%20I%20have%20an%20enquiry%20regarding%20production."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-20 lg:bottom-8 right-6 z-30 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black shadow-2xl flex items-center justify-center transition hover:scale-105 active:scale-95 group"
        title="WhatsApp Support (0321 3656096)"
      >
        <MessageSquare className="w-6 h-6 text-black fill-black" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-dark-900 border border-white/10 text-white text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition shadow-2xl pointer-events-none">
          WhatsApp 0321 3656096
        </span>
      </a>

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-dark-900 border border-lime-brand/40 text-white text-xs font-mono shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <CheckCircle2 className="w-4 h-4 text-lime-brand shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
