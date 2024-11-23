// src/utils/syncCart.js
import axiosInstance from '../axiosInstance';
import { getCart, clearCart, saveCart } from './cart'; // Ensure saveCart handles localStorage

// Queue to store failed sync operations
let failedSyncQueue = [];

// Synchronize the local cart with the server
export const syncCartWithServer = async () => {
  const cart = getCart(); // Retrieve local cart
  if (cart.length > 0) {
    try {
      // Send local cart data to the server
      const response = await axiosInstance.post('/cart/sync/', { items: cart });
      console.info('Cart synced successfully:', response.data);
      clearCart(); // Clear the local cart after successful sync
    } catch (error) {
      console.error('Error syncing cart:', error);
      // Add cart to the queue if sync fails
      failedSyncQueue.push(cart);
      handleSyncError(error); // Handle the sync error
    }
  }
};

// Retry failed sync operations from the queue
export const retryFailedSync = async () => {
  if (failedSyncQueue.length > 0) {
    const failedCart = failedSyncQueue.shift(); // Remove the first failed cart from the queue
    try {
      // Retry syncing the failed cart
      await axiosInstance.post('/cart/sync/', { items: failedCart });
      console.info('Failed cart retried and synced successfully.');
    } catch (error) {
      console.error('Error retrying cart sync:', error);
      // Re-add to the queue if it fails again for future retries
      failedSyncQueue.push(failedCart);
    }
  }
};

// Handle errors during cart synchronization
const handleSyncError = (error) => {
  if (error.response) {
    // Handle server-related errors
    if (error.response.status >= 500) {
      console.error('Server error occurred while syncing cart:', error.response.data);
    } else if (error.response.status === 400) {
      console.warn('Bad request. Check cart data:', error.response.data);
    } else if (error.response.status === 401) {
      console.warn('Unauthorized. User needs to log in again.');
      window.location.href = '/login'; // Optionally redirect to login
    } else {
      console.warn('Error syncing cart:', error.response.status, error.response.data);
    }
  } else if (error.request) {
    // Handle network issues
    console.error('Network error: No response received for cart sync:', error.request);
  } else {
    // Handle unexpected errors
    console.error('Unexpected error occurred during cart sync:', error.message);
  }
};
