import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader'; 
import { getCookie } from '../utils/cookies';
import PropTypes from 'prop-types';

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const token = getCookie('access_token');

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/profile/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = response.data;

        if (user.email === 'redacted@example.com') {
          setIsAdmin(true);
        } else {
          navigate('/');
        }
      } catch (error) {
        setError('Failed to verify admin status.');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [token, navigate]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return token && isAdmin ? children : null;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
