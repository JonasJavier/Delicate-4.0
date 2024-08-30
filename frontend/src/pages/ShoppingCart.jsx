import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCart, updateCartItem as updateCartItemAPI, removeFromCart as removeFromCartAPI } from '../services/api';
import '../assets/css/ShoppingCart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { getCart, updateCartItem, removeItemFromCart } from '../utils/cart';
import { getCookie } from '../utils/cookies';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = getCookie('access_token'); // Check if user is authenticated

  useEffect(() => {
    const getCartItems = async () => {
      if (token) {
        try {
          const data = await fetchCart();
          setCartItems(data.items || []);
        } catch (error) {
          setError('There was an issue fetching your cart. Please try again later.');
          setCartItems([]);
        }
      } else {
        setCartItems(getCart());
      }
      setLoading(false);
    };

    getCartItems();
  }, [token]);

  const handleUpdateQuantity = async (cartItemId, quantity) => {
    if (quantity < 1) return;  // Prevent setting quantity below 1
  
    if (token) {
      try {
        const { data } = await updateCartItemAPI(cartItemId, quantity);
        setCartItems(data.items);  // Refresh cart with updated quantities
      } catch (error) {
        setError('Failed to update cart item quantity. Please try again.');
      }
    } else {
      updateCartItem(cartItemId, quantity);
      setCartItems(getCart());  // Update the local cart state immediately
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    if (token) {
      try {
        const { data } = await removeFromCartAPI(cartItemId);
        setCartItems(data.items);  // Update cart items based on the response data
      } catch (error) {
        setError('Failed to remove item from the cart. Please try again.');
      }
    } else {
      removeItemFromCart(cartItemId);
      setCartItems(getCart());  // Refresh the cart state after removing item
    }
  };

  const total = cartItems.reduce((acc, item) => acc + (typeof item.product.price === 'number' ? item.product.price : 0) * item.quantity, 0);

  if (loading) return <p>Loading...</p>;

  if (!token) {
    return (
      <div className="container70 my-5 page-content">
        <div className="empty-cart-message text-center">
          <FontAwesomeIcon icon={faShoppingCart} size="6x" className="mb-3" />
          <h4>Please sign in to access your cart</h4>
          <p>You need to be signed in to add items to your cart and view your cart.&rsquo;</p>
          <Link to="/login">
            <button className="btn btn-dark return-button">Sign In</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container70 my-5 page-content">
      {error && <p className="text-danger">{error}</p>}
      {cartItems.length > 0 && <h2 className="mb-4 page-title70">My Shopping Cart</h2>}
      {cartItems.length === 0 ? (
        <div className="empty-cart-message text-center">
          <FontAwesomeIcon icon={faShoppingCart} size="6x" className="mb-3" />
          <h4>Your cart is empty</h4>
          <p>It seems you haven't added anything to your cart yet.</p>
          <Link to="/shop">
            <button className="btn btn-dark return-button">Return to shop</button>
          </Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8 col-md-12 mb-4">
            <table className="table table-bordered table-responsive">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Subtotal</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.product.image} alt={item.product.name} className="product-img" />
                      {item.product.name}
                    </td>
                    <td>${typeof item.product.price === 'number' ? item.product.price.toFixed(2) : 'N/A'}</td>
                    <td>
                      <div className="quantity-control">
                        <button className="circle-button" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                        <input type="text" className="form-control text-center" value={item.quantity} readOnly style={{ border: 'none', textAlign: 'center', width: '50px' }} />
                        <button className="circle-button" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                    </td>
                    <td>${typeof item.product.price === 'number' ? (item.product.price * item.quantity).toFixed(2) : 'N/A'}</td>
                    <td>
                      <button className="btn btn-outline-danger danger" onClick={() => handleRemoveItem(item.id)}>×</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/shop">
              <button className="btn btn-secondary">Return to shop</button>
            </Link>
            <button className="btn btn-primary ms-3">Update Cart</button>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="card70">
              <div className="card-body70">
                <h5 className="card-title70">Cart Total</h5>
                <p className="card-text70">Subtotal: ${total.toFixed(2)}</p>
                <p className="card-text70">Shipping: Free</p>
                <h5 className="card-text70">Total: ${total.toFixed(2)}</h5>
                <Link to="/Checkout">
                  <button className="btn btn-success w-100 mb-2">CHECK OUT</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
