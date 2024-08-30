// src/utils/auth.js
import axiosInstance from '../axiosInstance';
import { setCookie, deleteCookie } from './cookies';

export const handleTokenRefresh = async () => {
    try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
            const response = await axiosInstance.post('/token/refresh/', { refresh: refreshToken });
            const newAccessToken = response.data.access;
            setCookie('access_token', newAccessToken); // Update access token in cookies
            return newAccessToken;
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
        return null;
    }
};

export const handleUnauthorized = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    deleteCookie('access_token'); // Remove access token from cookies
    deleteCookie('refresh_token'); // Remove refresh token from cookies
    window.location.href = '/login';
};
