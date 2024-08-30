import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  // Aplicar token de autenticación a todas las solicitudes excepto a las que son públicas
  const token = localStorage.getItem('access_token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Authorization header set:', config.headers.Authorization);
  } else {
    console.warn('Authorization header missing: no token found');
  }
  
  return config;
}, (error) => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Network error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const fetchProducts = async () => {
  try {
    const response = await API.get('/products/');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Fetch cart details
export const fetchCart = async () => {
  try {
    const response = await API.get('/cart/');
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

// Add a product to the cart
export const addToCart = async (product_id, quantity) => {
  try {
    const response = await API.post('/cart/add/', { product_id, quantity });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
    }
    throw error;
  }
};

// Remove an item from the cart
export const removeFromCart = async (cart_item_id) => {
  try {
    const response = await API.post('/cart/remove/', { cart_item_id });
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// Update a cart item quantity
export const updateCartItem = async (cart_item_id, quantity) => {
  try {
    const response = await API.post('/cart/update/', { cart_item_id, quantity });
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

// Add a new product to the inventory
export const addProductAPI = async (productData) => {
  try {
    const response = await API.post('/products/add/', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Delete a product from the backend
export const deleteProductAPI = async (productId) => {
  try {
    const response = await API.delete(`/products/delete/${productId}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Fetch a single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await API.get(`/products/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

// Obtener el perfil del usuario
export const fetchUserProfile = async () => {
  try {
    const response = await API.get('/profile/');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Actualizar el perfil del usuario
export const updateUserProfile = async (profileData) => {
  try {
    const response = await API.put('/profile/', profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};