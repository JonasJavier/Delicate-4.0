import React, { useState, useEffect, memo, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts, deleteProductAPI } from '../services/api';
import '../assets/css/ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';

const ProductsShop = memo(function ProductsShop() {
  const [products, setProducts] = useState([]);
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

  const handleDelete = async (productId) => {
    try {
      await deleteProductAPI(productId);
      setProducts(products.filter(product => product.id !== productId));
      alert('Product deleted successfully!');
      navigate('/shop');
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
                  onError={(e) => e.target.src = '/assets/images/img-1.png'}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-price">{product.price}</p>
                  <button className="btn btn-primary">Add to Cart</button>
                  <div className="icon-overlay">
                    <div className="icon-container">
                      <FontAwesomeIcon icon={faHeart} className="icon-heart" />
                      <span className="icon-text">Add to Wishlist</span>
                    </div>
                    <div className="icon-container">
                      <FontAwesomeIcon icon={faEye} className="icon-eye" />
                      <span className="icon-text">Quick View</span>
                    </div>
                    {isAdmin && (
                      <div className="icon-container delete-icon" onClick={() => handleDelete(product.id)}>
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
    </div>
  );
});

export default ProductsShop;
