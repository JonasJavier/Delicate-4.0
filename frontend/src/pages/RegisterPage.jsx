import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/RegisterPage.css';
import RegisterImage from '../assets/images/RegisterLogin/register.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', {
        email: email,
        password: password,
      });
      navigate('/login');
    } catch (error) {
      console.error('Register error:', error);

      if (error.response && error.response.data) {
        const errorData = error.response.data;
        setError(errorData.error || 'An error occurred. Please try again later.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const { credential } = response;
      const result = await axios.post('http://127.0.0.1:8000/api/google-login/', {
        access_token: credential,
      });
      console.log('Google login successful:', result);
      navigate('/');  // Navigate to dashboard or any other page
    } catch (error) {
      console.error('Google login error:', error);
      setError('Google login failed. Please try again.');
    }
  };

  return (
    <GoogleOAuthProvider clientId="***REMOVED***.apps.googleusercontent.com">
      <div className="register-container vh-100 d-flex justify-content-center align-items-center">
        <div className="register-card p-5">
          <div className="row g-0">
            <div className="col-md-6">
              <div className="card-body">
                <h2 className="card-title text-center mb-5">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4 input-group">
                    <span className="input-group-text"><FontAwesomeIcon icon={faEnvelope} /></span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4 input-group">
                    <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4 input-group">
                    <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && <p className="text-danger">{error}</p>}
                  <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
                <div className="text-center my-4">or</div>
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => setError('Google login failed. Please try again.')}
                  useOneTap
                />
                <button className="btn btn-facebook w-100 mt-3">
                  <FontAwesomeIcon icon={faFacebook} /> Register with Facebook
                </button>
              </div>
            </div>
            <div className="col-md-6 d-none d-md-block position-relative">
              <img src={RegisterImage} alt="Register" className="img-fluid rounded-end" />
              <a href="/login" className="text-decoration-none mt-4 d-block text-center position-absolute bottom-0 mb-4 w-100">I am already a member</a>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default RegisterPage;
