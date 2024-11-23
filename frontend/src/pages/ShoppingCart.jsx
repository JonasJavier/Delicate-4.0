import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCart, updateCartItem as updateCartItemAPI, removeFromCart as removeFromCartAPI } from '../services/api';
import { getCart, updateCartItem, removeItemFromCart } from '../utils/cart';
import { getCookie } from '../utils/cookies';
import '../assets/css/ShoppingCart.css';
import { FaShoppingCart } from 'react-icons/fa';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]); // State to hold cart items
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state for notifications

  const token = getCookie('access_token'); // Get access token from cookies

  // Load cart items on component mount
  useEffect(() => {
    const getCartItems = async () => {
      setLoading(true);
      try {
        if (token) {
          // Fetch cart items from API if logged in
          const data = await fetchCart();
          setCartItems(data.items || []); // Ensure `data.items` exists
        } else {
          // Load cart items from localStorage if not logged in
          setCartItems(getCart());
        }
      } catch (error) {
        setError('There was an issue fetching your cart. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getCartItems();
  }, [token]);

  // Update cart item quantity and validate input
  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    const cartItem = cartItems.find(item => item.id === cartItemId); // Find the cart item

    // Validate minimum quantity and stock availability
    if (newQuantity < 1) {
      setError('Quantity cannot be less than 1');
      return;
    }
    if (newQuantity > cartItem.product.stock) {
      setError(`Only ${cartItem.product.stock} items available in stock.`);
      return;
    }

    try {
      if (token) {
        // Update cart via API if logged in
        const { data } = await updateCartItemAPI(cartItemId, newQuantity);
        if (data && data.items) {
          setCartItems(data.items); // Update state with new cart items
        }
      } else {
        // Update cart in localStorage if not logged in
        updateCartItem(cartItemId, newQuantity);
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.id === cartItemId ? { ...item, quantity: newQuantity } : item
          )
        );
      }
      window.location.reload(); // Refresh page to reflect changes
    } catch (error) {
      console.error('Error updating cart item:', error);
      setError('Failed to update cart item quantity. Please try again.');
    }
  };

  // Remove an item from the cart
  const handleRemoveItem = async (cartItemId) => {
    try {
      if (token) {
        // Remove item via API if logged in
        const data = await removeFromCartAPI(cartItemId);
        if (data && data.items) {
          setCartItems(data.items);
        }
      } else {
        // Remove item from localStorage if not logged in
        removeItemFromCart(cartItemId);
        setCartItems(getCart());
      }
    } catch (error) {
      setError('Failed to remove item from the cart. Please try again.');
    }
  };

  // Calculate total price for the cart
  const total = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.product.price) * item.quantity,
    0
  );

  // Render loading state
  if (loading) return <p>Loading...</p>;

  // Render empty cart message
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-container">
        <FaShoppingCart className="empty-cart-icon" />
        <h4>Your cart is empty</h4>
        <p>It seems you haven't added anything to your cart yet.</p>
        <Link to="/shop">
          <button className="btn btn-attractive">Return to shop</button>
        </Link>
      </div>
    );
  }

  // Render shopping cart items and total
  return (
    <div className="container21 my-5">
      {error && <p className="text-danger">{error}</p>}
      <h2 className="mb-4 text-center">My Shopping Cart</h2>
      <div className="row align-items-center justify-content-center">
        <div className="col-lg-8 col-md-12 mb-4">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
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
                  <td className="cart-item">
                    <img
                      src={`http://127.0.0.1:8000${item.product.image}`}
                      alt={item.product.name}
                      className="cart-item-image img-fluid"
                    />
                    <div className="ms-3">
                      <h6>{item.product.name}</h6>
                    </div>
                  </td>
                  <td>${parseFloat(item.product.price).toFixed(2)}</td>
                  <td>
                    <div className="input-group quantity-control">
                      <button
                        className="btn btn-quantity-control"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="form-control text-center"
                        value={item.quantity}
                        readOnly
                        style={{ width: '50px' }}
                      />
                      <button
                        className="btn btn-quantity-control"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/shop">
            <button className="btn btn-attractive w-100">Return to shop</button>
          </Link>
        </div>

        <div className="col-lg-4 col-md-12">
          <div className="card21">
            <div className="card-body21">
              <div className="cart-total">
                <h5>Subtotal:</h5>
                <p className="price">${total.toFixed(2)}</p>
              </div>
              <div className="cart-total">
                <h5>Shipping:</h5>
                <p className="price">Free</p>
              </div>
              <div className="cart-total">
                <h5>Total:</h5>
                <p className="price">${total.toFixed(2)}</p>
              </div>
              <div className="checkout-container">
                <Link to="/Checkout">
                  <button className="btn btn-dark">CHECK OUT</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
