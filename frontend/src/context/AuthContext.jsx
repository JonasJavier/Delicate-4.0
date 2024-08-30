import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../axiosInstance';
import { getCookie, setCookie, deleteCookie } from '../utils/cookies';
import { jwtDecode } from 'jwt-decode'; // Ajusta la importación

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getCookie('access_token');
    if (token) {
      const decodedToken = jwtDecode(token); 
      if (decodedToken.exp * 1000 < Date.now()) {
        logout();
        return;
      }

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

  const login = (userData) => {
    setUser(userData);
    setIsAdmin(userData.email === 'redacted@example.com');
    setCookie('access_token', userData.access_token);
    setCookie('refresh_token', userData.refresh_token);
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    deleteCookie('access_token');
    deleteCookie('refresh_token');
    delete axiosInstance.defaults.headers.common['Authorization'];
    window.location.href = '/login'; // Redirect after logout
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
