// src/axiosInstance.jsx
import axios from 'axios';
import { getCookie, setCookie, deleteCookie } from './utils/cookies';
import { handleTokenRefresh, handleUnauthorized } from './utils/auth';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

const refreshTokenIfNeeded = async () => {
  const token = getCookie('access_token');
  if (!token) return;

  try {
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = tokenPayload.exp * 1000;
    const currentTime = new Date().getTime();

    if (expirationTime - currentTime < 5 * 60 * 1000) {
      const newAccessToken = await handleTokenRefresh();
      if (newAccessToken) {
        setCookie('access_token', newAccessToken);
      }
    }
  } catch (error) {
    console.error('Error decoding token:', error);
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    console.debug('Making request to', config.url);
    await refreshTokenIfNeeded();
    const token = getCookie('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Error in request:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.debug('Received response from', response.config.url);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newAccessToken = await handleTokenRefresh();
          if (newAccessToken) {
            setCookie('access_token', newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          handleUnauthorized();
        }
      } else if (error.response.status >= 500) {
        console.error('Server error:', error.response.status, error.response.data);
      } else {
        console.warn('Request failed:', error.response.status, error.response.data);
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request setup failed:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
