import React, { useState, useMemo, lazy, Suspense } from 'react';
import QuickViewModal from '../components/QuickViewModal';

const HeroShop = lazy(() => import('../components/HeroShop'));
const ProductsShop = lazy(() => import('../components/ProductsShop'));
const Pagination = lazy(() => import('../components/Paginations'));
const Footer = lazy(() => import('../components/Footer'));

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);

  const itemsPerPage = 8;
  const totalProducts = 8;

  const totalPages = useMemo(() => Math.ceil(totalProducts / itemsPerPage), [totalProducts, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setShowQuickView(true);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
    setShowQuickView(false);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeroShop />
      <ProductsShop
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onQuickView={handleQuickView}
      />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <Footer />
      <QuickViewModal
        product={quickViewProduct}
        show={showQuickView}
        onClose={handleCloseQuickView}
      />
    </Suspense>
  );
};

export default Shop;
