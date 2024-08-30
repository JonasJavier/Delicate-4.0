import axios from 'axios';
import { getCookie, setCookie } from './utils/cookies';
import { handleTokenRefresh, handleUnauthorized } from './utils/auth';
import { jwtDecode } from 'jwt-decode';  // Corrección en la importación

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
    const tokenPayload = jwtDecode(token);  // Usar jwtDecode correctamente
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
    handleUnauthorized(); // Desencadenar flujo de no autorizado si falla la decodificación del token
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    await refreshTokenIfNeeded();
    const token = getCookie('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
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
          handleUnauthorized();
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
