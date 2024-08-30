import axiosInstance from '../axiosInstance';
import { setCookie, deleteCookie } from './cookies';

export const handleTokenRefresh = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      const response = await axiosInstance.post('/token/refresh/', { refresh: refreshToken });
      const newAccessToken = response.data.access;
      setCookie('access_token', newAccessToken);
      return newAccessToken;
    }
    return null;
  } catch (error) {
    console.error('Error refreshing token:', error.message || 'Unknown error');
    return null;
  }
};

export const handleUnauthorized = () => {
  localStorage.clear();
  deleteCookie('access_token');
  deleteCookie('refresh_token');
  window.location.href = '/login';
};
