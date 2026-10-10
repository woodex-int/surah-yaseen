import React, { Suspense, lazy } from 'react';
import { useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileStickyBar from './components/MobileStickyBar';
import SearchModal from './components/SearchModal';
import CartDrawer from './components/CartDrawer';
import { MessageSquare, CheckCircle2 } from 'lucide-react';

// Eager load primary landing view for instant LCP
import HomeView from './views/HomeView';

// Code-split all secondary routes for optimal bundle distribution
const ProductsView = lazy(() => import('./views/ProductsView'));
const ProductDetailView = lazy(() => import('./views/ProductDetailView'));
const ServicesView = lazy(() => import('./views/ServicesView'));
const FranchiseView = lazy(() => import('./views/FranchiseView'));
const SolutionsView = lazy(() => import('./views/SolutionsView'));
const IndustriesView = lazy(() => import('./views/IndustriesView'));
const PortfolioView = lazy(() => import('./views/PortfolioView'));
const GetAQuoteView = lazy(() => import('./views/GetAQuoteView'));
const BookSiteVisitView = lazy(() => import('./views/BookSiteVisitView'));
const TrackOrderView = lazy(() => import('./views/TrackOrderView'));
const CartView = lazy(() => import('./views/CartView'));
const CheckoutView = lazy(() => import('./views/CheckoutView'));
const OrderConfirmationView = lazy(() => import('./views/OrderConfirmationView'));
const AccountView = lazy(() => import('./views/AccountView'));

// Resources Views (Split by component)
const ArtworkGuideView = lazy(() => import('./views/ResourcesViews').then((m) => ({ default: m.ArtworkGuideView })));
const TemplatesView = lazy(() => import('./views/ResourcesViews').then((m) => ({ default: m.TemplatesView })));
const MaterialGuideView = lazy(() => import('./views/ResourcesViews').then((m) => ({ default: m.MaterialGuideView })));
const FaqsView = lazy(() => import('./views/ResourcesViews').then((m) => ({ default: m.FaqsView })));
const BlogView = lazy(() => import('./views/ResourcesViews').then((m) => ({ default: m.BlogView })));
const ReviewsView = lazy(() => import('./views/ResourcesViews').then((m) => ({ default: m.ReviewsView })));
const TradeAccountView = lazy(() => import('./views/ResourcesViews').then((m) => ({ default: m.TradeAccountView })));

const ViewLoadingSkeleton = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-black">
    <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
      <span className="w-2.5 h-2.5 rounded-full bg-red-brand animate-ping" />
      <span>Loading INPRINT Module...</span>
    </div>
  </div>
);

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
    <div className="min-h-screen flex flex-col bg-black text-white font-sans selection:bg-red-brand selection:text-white">
      {/* Global Minimalist Header */}
      <Header />

      {/* Main Content Area with Code-Splitting Suspense */}
      <main className="flex-1">
        <Suspense fallback={<ViewLoadingSkeleton />}>
          {renderView()}
        </Suspense>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Overlays & Modals */}
      <SearchModal />
      <CartDrawer />

      {/* Mobile Sticky Bar - on product page, let product page manage or use global */}
      {currentView !== 'product-detail' && <MobileStickyBar />}

      {/* WhatsApp Quick Trigger Button */}
      <a
        href="https://wa.me/923213656096?text=Hi%20INPRINT,%20I%20have%20an%20enquiry%20regarding%20production."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-14 lg:bottom-16 right-6 z-30 w-12 h-12 rounded-full bg-white text-black shadow-2xl flex items-center justify-center transition hover:scale-105 active:scale-95 group border border-white/20"
        title="WhatsApp Support (0321 3656096)"
      >
        <MessageSquare className="w-5 h-5 text-black fill-black" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition shadow-2xl pointer-events-none">
          WhatsApp 0321 3656096
        </span>
      </a>

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-20 lg:bottom-10 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-[#181920] border border-white/15 text-white text-xs font-mono shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <CheckCircle2 className="w-4 h-4 text-red-brand shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
