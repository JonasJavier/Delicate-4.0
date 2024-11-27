import axios from 'axios';
import { getCookie, setCookie } from './utils/cookies';
import { handleTokenRefresh, handleUnauthorized } from './utils/auth';
import { jwtDecode } from 'jwt-decode'; 

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Encapsular lógica de actualización de token
const refreshTokenIfNeeded = async () => {
  const token = getCookie('access_token');
  if (!token) return null;

  try {
    const tokenPayload = jwtDecode(token);
    const expirationTime = tokenPayload.exp * 1000;
    const currentTime = Date.now();

    // Si el token está cerca de expirar (en los próximos 5 minutos), refrescarlo
    if (expirationTime - currentTime < 5 * 60 * 1000) {
      const newAccessToken = await handleTokenRefresh();
      if (newAccessToken) {
        setCookie('access_token', newAccessToken);
        return newAccessToken;
      }
    }
  } catch (error) {
    console.error('Error decoding token or refreshing:', error.message);
    handleUnauthorized();
    return null;
  }
};

// Interceptor de solicitudes
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await refreshTokenIfNeeded();
      const accessToken = token || getCookie('access_token');

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    } catch (error) {
      console.error('Request interceptor error:', error.message);
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuestas
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Marcar la solicitud como reintentada

      try {
        const newAccessToken = await handleTokenRefresh();
        if (newAccessToken) {
          setCookie('access_token', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest); // Reintentar la solicitud con el nuevo token
        }
      } catch (refreshError) {
        console.error('Error refreshing token on 401:', refreshError.message);
        handleUnauthorized(); // Redirigir o manejar usuario no autenticado
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
