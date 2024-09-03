import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../axiosInstance';
import { getCookie, setCookie, deleteCookie } from '../utils/cookies';
import { jwtDecode } from 'jwt-decode'; // Manteniendo la importación como está

// Crear contexto de autenticación
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cargar el perfil del usuario y verificar la autenticación al montar el componente
  useEffect(() => {
    const token = getCookie('access_token');
    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < Date.now()) {
        logout();
        return;
      }

      // Configurar el token en el header para futuras solicitudes
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axiosInstance.get('/profile/')
        .then(response => {
          const userData = response.data;
          setUser(userData);
          setIsAdmin(userData.email === 'redacted@example.com');
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            logout();
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Manejo de login, guarda los tokens y establece el estado del usuario
  const login = (userData) => {
    setUser(userData);
    setIsAdmin(userData.email === 'redacted@example.com');
    setCookie('access_token', userData.access_token);
    setCookie('refresh_token', userData.refresh_token);
  };

  // Manejo de logout, limpia el estado y redirige al usuario
  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    deleteCookie('access_token');
    deleteCookie('refresh_token');
    delete axiosInstance.defaults.headers.common['Authorization'];
    window.location.href = '/login'; // Redirige después de cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Definición de tipos para las props
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
