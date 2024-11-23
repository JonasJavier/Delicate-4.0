import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Enable cookies for cross-origin requests
});

// Request interceptor to add the authentication token to headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to request headers
      console.log('Authorization header set:', config.headers.Authorization);
    } else {
      console.warn('Authorization header missing: no token found');
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error); // Log request errors
    return Promise.reject(error);
  }
);

// Response interceptor to handle global error scenarios
API.interceptors.response.use(
  (response) => response, // Pass successful responses as is
  async (error) => {
    if (error.response) {
      const { status } = error.response;
      console.error('API error:', status, error.response.data);

      // Handle unauthorized error (401) by clearing tokens and redirecting to login
      if (status === 401) {
        console.warn('Token expired or unauthorized. Redirecting to login...');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    } else if (error.request) {
      console.error('Network error:', error.request); // Handle network issues
    } else {
      console.error('Error:', error.message); // Log unexpected errors
    }
    return Promise.reject(error);
  }
);

export default API;

// Fetch all products
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
    return response.data; // Return cart data
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

// Add a product to the cart
export const addToCart = async (product_id, quantity) => {
  try {
    const response = await API.post('/cart/add/', { product_id, quantity });
    return response.data; // Return updated cart data
  } catch (error) {
    console.error('Error adding to cart:', error);
    if (error.response && error.response.status === 401) {
      window.location.href = '/login'; // Redirect to login if unauthorized
    }
    throw error;
  }
};

// Remove an item from the cart
export const removeFromCart = async (cart_item_id) => {
  try {
    const response = await API.delete(`/cart/remove/${cart_item_id}/`);
    return response.data; // Return updated cart data
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// Update the quantity of an item in the cart
export const updateCartItem = async (cart_item_id, quantity) => {
  try {
    const response = await API.post('/cart/update/', { cart_item_id, quantity });
    return response.data; // Return updated cart data
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
        'Content-Type': 'multipart/form-data', // Set correct content type for file uploads
      },
    });
    return response.data; // Return new product data
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Delete a product by ID
export const deleteProductAPI = async (productId) => {
  try {
    const response = await API.delete(`/products/delete/${productId}/`);
    return response.data; // Return confirmation
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Fetch a single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await API.get(`/products/${id}/`);
    return response.data; // Return product data
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

// Fetch user profile details
export const fetchUserProfile = async () => {
  try {
    const response = await API.get('/profile/');
    return response.data; // Return user profile data
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Update user profile information
export const updateUserProfile = async (profileData) => {
  try {
    const response = await API.put('/profile/', profileData);
    return response.data; // Return updated profile data
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Change user password
export const changePassword = async (passwordData) => {
  try {
    const response = await API.post('/change-password/', passwordData);
    return response.data; // Return confirmation
  } catch (error) {
    console.error('Error details:', error);
    if (error.response) {
      throw error.response.data; // Handle server error
    } else if (error.request) {
      throw new Error('No response received from server. Please check your network.');
    } else {
      throw new Error('An unexpected error occurred while trying to change the password.');
    }
  }
};

export const fetchReviews = async (productId) => {
  try {
    const response = await API.get(`/products/${productId}/reviews/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const addReview = async (productId, reviewData) => {
  try {
    const response = await API.post(`/products/${productId}/reviews/`, reviewData);
    return response.data;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};
