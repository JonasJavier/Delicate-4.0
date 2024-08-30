import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { getCookie, setCookie, deleteCookie } from '../utils/cookies';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getCookie('access_token');

        if (token) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            axiosInstance.get('/profile/')
                .then(response => {
                    const userData = response.data;
                    setUser(userData);
                    setIsAdmin(userData.email === 'redacted@example.com'); // Verifica que sea admin
                    console.log('User authenticated:', userData); // Log para depurar
                })
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                    if (error.response && error.response.status === 401) {
                        logout();
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
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
    };

    return (
        <AuthContext.Provider value={{ user, isAdmin, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
