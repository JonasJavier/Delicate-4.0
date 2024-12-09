import React, { useState, useEffect, memo, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts, deleteProductAPI, addToCart } from '../services/api'; 
import '../assets/css/ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import { getCookie } from '../utils/cookies'; 
import CartModal from '../components/CartModal'; 
import QuickViewModal from '../components/QuickViewModal'; 

const ProductsShop = memo(function ProductsShop() {
  const [products, setProducts] = useState([]);
  const [modalData, setModalData] = useState({
    show: false,
    title: '',
    message: '',
    redirect: null,
    redirectLabel: '',
  });
  const [quickViewProduct, setQuickViewProduct] = useState(null); // Estado para Quick View
  const [showQuickView, setShowQuickView] = useState(false); // Controla el modal de Quick View
  const { isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    const token = getCookie('access_token');

    if (!token) {
      setModalData({
        show: true,
        title: 'Login Required',
        message: 'Please log in to add items to your cart.',
        redirect: () => navigate('/login'),
        redirectLabel: 'Go to Login',
      });
      return;
    }

    try {
      await addToCart(productId, 1); // Agrega 1 unidad del producto
      setModalData({
        show: true,
        title: 'Success',
        message: 'Product added to cart successfully!',
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setModalData({
        show: true,
        title: 'Error',
        message: 'Failed to add product to cart.',
      });
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProductAPI(productId);
      setProducts(products.filter((product) => product.id !== productId));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product.');
    }
  };

  return (
    <div className="container py-4">
      <h2 className="section-title">Our <span>Products</span></h2>

      {products.length === 0 ? (
        <div className="text-center">
          <p>There are no products available at the moment. Please check back later.</p>
        </div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <Link to={`/product/${product.id}`} className="card product-card">
                <img
                  src={`http://127.0.0.1:8000${product.image}`}
                  alt={product.name}
                  className="card-img-top"
                  onError={(e) => (e.target.src = '/assets/images/img-1.png')}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-price">{product.price}</p>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault(); // Previene redirección por el enlace
                      handleAddToCart(product.id);
                    }}
                  >
                    Add to Cart
                  </button>
                  <div className="icon-overlay">
                    <div
                      className="icon-container"
                      onClick={(e) => {
                        e.preventDefault(); // Previene redirección al usar Quick View
                        setQuickViewProduct(product);
                        setShowQuickView(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faEye} className="icon-eye" />
                      <span className="icon-text">Quick View</span>
                    </div>
                    {isAdmin && (
                      <div
                        className="icon-container delete-icon"
                        onClick={(e) => {
                          e.preventDefault(); // Previene la redirección al hacer clic en eliminar
                          handleDelete(product.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} className="icon-trash" />
                        <span className="icon-text">Delete</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          show={showQuickView}
          onClose={() => setShowQuickView(false)}
          onAddToCart={(productId) => {
            handleAddToCart(productId);
            setShowQuickView(false); // Cierra el modal después de agregar al carrito
          }}
        />
      )}

      {/* Cart Modal */}
      <CartModal
        show={modalData.show}
        onHide={() => setModalData({ ...modalData, show: false })}
        title={modalData.title}
        message={modalData.message}
        onRedirect={modalData.redirect}
        redirectLabel={modalData.redirectLabel}
      />
    </div>
  );
});

export default ProductsShop;
