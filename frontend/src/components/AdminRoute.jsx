import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader'; // Assuming you have a Loader component
import { getCookie } from '../utils/cookies'; // Ensure this is correctly imported

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state
  const [isAdmin, setIsAdmin] = useState(false); // Admin state
  const navigate = useNavigate();
  const token = getCookie('access_token');  // Retrieve access token

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
        setError('Failed to verify admin status.'); // Set error message
        navigate('/login');
      } finally {
        setLoading(false); // End loading state
      }
    };

    checkAdminStatus();
  }, [token, navigate]);

  if (loading) {
    return <Loader />; // Show loader while checking
  }

  if (error) {
    return <div>{error}</div>; // Optionally display the error
  }

  return token && isAdmin ? children : null;  // Render children if authenticated and admin
};

export default AdminRoute;
