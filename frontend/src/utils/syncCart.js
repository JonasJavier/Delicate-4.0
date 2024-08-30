// src/utils/syncCart.js
import axiosInstance from '../axiosInstance';
import { getCart, clearCart } from './cart';

export const syncCartWithServer = async () => {
  const cart = getCart();
  if (cart.length > 0) {
    try {
      const response = await axiosInstance.post('/cart/sync/', { items: cart });
      console.info('Cart synced successfully:', response.data);
      clearCart();
    } catch (error) {
      handleSyncError(error);
    }
  }
};

const handleSyncError = (error) => {
  if (error.response) {
    // Server responded with a status other than 2xx
    if (error.response.status >= 500) {
      console.error('Server error occurred while syncing cart:', error.response.data);
    } else if (error.response.status === 400) {
      console.warn('Bad request. Check cart data:', error.response.data);
    } else if (error.response.status === 401) {
      console.warn('Unauthorized. User needs to log in again.');
      // Optionally, you can redirect to login
    } else {
      console.warn('Error syncing cart:', error.response.status, error.response.data);
    }
  } else if (error.request) {
    // Request was made, but no response was received
    console.error('Network error: No response received for cart sync:', error.request);
  } else {
    // Something else happened
    console.error('Unexpected error occurred during cart sync:', error.message);
  }
};
