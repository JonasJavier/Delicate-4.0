import React, { useState, useMemo, lazy, Suspense } from 'react';

const HeroShop = lazy(() => import('../components/HeroShop'));
const ProductsShop = lazy(() => import('../components/ProductsShop'));
const Pagination = lazy(() => import('../components/Paginations'));
const Footer = lazy(() => import('../components/Footer'));

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Cambia este valor según sea necesario
  const totalProducts = 8; // Actualiza esto con el número total de productos que tienes

  const totalPages = useMemo(() => Math.ceil(totalProducts / itemsPerPage), [totalProducts, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeroShop />
      <ProductsShop currentPage={currentPage} itemsPerPage={itemsPerPage} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <Footer />
    </Suspense>
  );
};

export default Shop;
