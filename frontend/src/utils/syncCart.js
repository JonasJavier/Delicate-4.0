// src/utils/syncCart.js
import axiosInstance from '../axiosInstance';
import { getCart, clearCart, saveCart } from './cart'; // Asegúrate de tener una función saveCart para manejar localStorage

// Cola para operaciones fallidas
let failedSyncQueue = [];

export const syncCartWithServer = async () => {
  const cart = getCart(); // Obtener el carrito local
  if (cart.length > 0) {
    try {
      const response = await axiosInstance.post('/cart/sync/', { items: cart });
      console.info('Cart synced successfully:', response.data);
      clearCart(); // Limpiar el carrito local después de sincronizar con éxito
    } catch (error) {
      console.error('Error syncing cart:', error);
      // Almacenar en la cola si ocurre un error
      failedSyncQueue.push(cart);
      handleSyncError(error);
    }
  }
};

// Intentar reintentar las operaciones fallidas
export const retryFailedSync = async () => {
  if (failedSyncQueue.length > 0) {
    const failedCart = failedSyncQueue.shift(); // Extraer el primer carrito fallido en la cola
    try {
      await axiosInstance.post('/cart/sync/', { items: failedCart });
      console.info('Failed cart retried and synced successfully.');
    } catch (error) {
      console.error('Error retrying cart sync:', error);
      // Si falla nuevamente, reinsertar en la cola para reintentar más tarde
      failedSyncQueue.push(failedCart);
    }
  }
};

// Manejo de errores al sincronizar el carrito
const handleSyncError = (error) => {
  if (error.response) {
    if (error.response.status >= 500) {
      console.error('Server error occurred while syncing cart:', error.response.data);
    } else if (error.response.status === 400) {
      console.warn('Bad request. Check cart data:', error.response.data);
    } else if (error.response.status === 401) {
      console.warn('Unauthorized. User needs to log in again.');
      window.location.href = '/login'; // Opcional: redirigir al login
    } else {
      console.warn('Error syncing cart:', error.response.status, error.response.data);
    }
  } else if (error.request) {
    console.error('Network error: No response received for cart sync:', error.request);
  } else {
    console.error('Unexpected error occurred during cart sync:', error.message);
  }
};
