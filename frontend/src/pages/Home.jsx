import React, { useState } from 'react';
import { Suspense, lazy } from 'react';
import QuickViewModal from '../components/QuickViewModal';

const Hero = lazy(() => import('../components/Hero'));
const FeatureCard = lazy(() => import('../components/FeatureCard'));
const ProductCard = lazy(() => import('../components/Products'));
const MiniAbout = lazy(() => import('../components/MiniAbout'));
const TestimonialItem = lazy(() => import('../components/TestimonialItem'));
const NewsSection = lazy(() => import('../components/NewsSection'));
const InstagramSection = lazy(() => import('../components/Instagram'));
const Footer = lazy(() => import('../components/Footer'));

const Home = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setShowQuickView(true);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
    setShowQuickView(false);
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Hero />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <FeatureCard />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductCard onQuickView={handleQuickView} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <MiniAbout />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <TestimonialItem />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <NewsSection />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <InstagramSection />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        show={showQuickView}
        onClose={handleCloseQuickView}
      />
    </>
  );
};

export default Home;
