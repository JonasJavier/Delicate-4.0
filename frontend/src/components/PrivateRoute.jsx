import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ErrorBoundary from './ErrorBoundary';
import Loader from './Loader'; // Asegúrate de tener un componente Loader

const PrivateRoute = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        console.error("AuthContext is not available.");
        return <Navigate to="/error" />;
    }

    const { user, loading } = authContext;

    if (loading) {
        return <Loader />;
    }

    return (
        <ErrorBoundary>
            {user ? <Outlet /> : <Navigate to="/login" />}
        </ErrorBoundary>
    );
};

export default PrivateRoute;
