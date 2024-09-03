import axios from 'axios';
import { getCookie, setCookie } from './utils/cookies';
import { handleTokenRefresh, handleUnauthorized } from './utils/auth';
import { jwtDecode } from 'jwt-decode';  // Corrección en la importación, ahora como función nombrada


const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', 
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Refrescar el token si es necesario
const refreshTokenIfNeeded = async () => {
  const token = getCookie('access_token');
  if (!token) return;

  try {
    const tokenPayload = jwtDecode(token);  // Usar jwtDecode correctamente como una función nombrada
    const expirationTime = tokenPayload.exp * 1000;
    const currentTime = Date.now();

    // Si el token va a expirar en los próximos 5 minutos, refrescarlo
    if (expirationTime - currentTime < 5 * 60 * 1000) {
      const newAccessToken = await handleTokenRefresh();
      if (newAccessToken) {
        setCookie('access_token', newAccessToken);
        return newAccessToken;
      }
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    handleUnauthorized(); // Manejo de errores de autorización
  }
};

// Interceptor de solicitudes
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await refreshTokenIfNeeded();  // Refrescar el token antes de cada solicitud
    const accessToken = token || getCookie('access_token');
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuestas
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
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
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
