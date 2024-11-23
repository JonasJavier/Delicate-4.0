import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axiosInstance from '../axiosInstance';
import { getCookie, setCookie, deleteCookie } from '../utils/cookies';
import { jwtDecode } from 'jwt-decode';

// Create authentication context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user information
  const [isAdmin, setIsAdmin] = useState(false); // Flag for admin access
  const [loading, setLoading] = useState(true); // Loading state

  // Check and load user profile if token is present and valid
  useEffect(() => {
    const token = getCookie('access_token'); // Get token from cookies
    if (token) {
      const decodedToken = jwtDecode(token);

      // Logout if token is expired
      if (decodedToken.exp * 1000 < Date.now()) {
        logout();
        return;
      }

      // Set token in request headers and fetch user profile
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axiosInstance.get('/profile/')
        .then(response => {
          const userData = response.data;
          setUser(userData); // Store user data
          setIsAdmin(userData.email === 'redacted@example.com'); // Check admin status
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            logout(); // Logout on unauthorized error
          }
        })
        .finally(() => setLoading(false)); // End loading
    } else {
      setLoading(false); // End loading if no token
    }
  }, []);

  // Handle login with user data and tokens
  const handleLogin = ({ userData, access_token, refresh_token }) => {
    setUser(userData); // Set user info
    setIsAdmin(userData.email === 'redacted@example.com'); // Determine admin
    setCookie('access_token', access_token); // Save tokens in cookies
    setCookie('refresh_token', refresh_token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`; // Add token to headers
  };

  // Login using backend data
  const login = (userData) => {
    handleLogin({
      userData,
      access_token: userData.access_token,
      refresh_token: userData.refresh_token,
    });
  };

  // Login using Google data
  const googleLogin = (googleData) => {
    handleLogin({
      userData: googleData.user,
      access_token: googleData.access_token,
      refresh_token: googleData.refresh_token,
    });
  };

  // Logout and clear session
  const logout = () => {
    setUser(null); // Clear user state
    setIsAdmin(false); // Reset admin flag
    deleteCookie('access_token'); // Remove tokens from cookies
    deleteCookie('refresh_token');
    delete axiosInstance.defaults.headers.common['Authorization']; // Clear token from headers
    window.location.href = '/login'; // Redirect to login
  };

  // Provide authentication state and actions
  return (
    <AuthContext.Provider value={{ user, isAdmin, login, googleLogin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate children prop
};

export default AuthProvider;
