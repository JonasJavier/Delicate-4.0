import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RegisterImage from '../assets/images/RegisterLogin/register.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axiosInstance from '../axiosInstance';
import { useTheme } from '../context/ThemeContext';

const RegisterContainer = styled.div`
  background: ${(props) => (props.theme === 'dark' ? '#121212' : '#f5f5f5')};
  color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#000000')};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegisterCard = styled.div`
  background: ${(props) => (props.theme === 'dark' ? '#1e1e1e' : '#ffffff')};
  border-radius: 20px;
  box-shadow: ${(props) =>
    props.theme === 'dark' ? '0px 15px 30px rgba(255, 255, 255, 0.1)' : '0px 15px 16.83px 0.17px rgba(0, 0, 0, 0.05)'};
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const CardBody = styled.div`
  padding: 2rem;
  flex: 1;
`;

const CardImage = styled.div`
  flex: 1;
  display: none;

  @media (min-width: 768px) {
    display: block;
    position: relative;

    img {
      width: 100%;
      height: auto;
      border-radius: 0 20px 20px 0;
    }

    a {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#007bff')};
      text-decoration: none;

      &:hover {
        color: ${(props) => (props.theme === 'dark' ? '#f28123' : '#0056b3')};
      }
    }
  }
`;

const Title = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 42px;
  text-align: center;
  margin-bottom: 2rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => (props.theme === 'dark' ? '#444444' : '#ced4da')};
  border-radius: 5px;
  background: ${(props) => (props.theme === 'dark' ? '#2c2c2c' : '#ffffff')};

  .input-group-text {
    background: ${(props) => (props.theme === 'dark' ? '#2c2c2c' : '#ffffff')};
    border: none;
    padding: 0.5rem;
    color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#000000')};
  }

  input {
    border: none;
    border-left: 1px solid ${(props) => (props.theme === 'dark' ? '#444444' : '#ced4da')};
    flex: 1;
    padding: 0.5rem;
    background: transparent;
    color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#000000')};
    font-family: 'Poppins', sans-serif;

    &:focus {
      outline: none;
    }
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 5px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  background: ${(props) => (props.theme === 'dark' ? '#f28123' : '#007bff')};
  color: ${(props) => (props.theme === 'dark' ? '#000000' : '#ffffff')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.theme === 'dark' ? '#e06b00' : '#0056b3')};
    transform: scale(1.05);
  }
`;

const GoogleButton = styled(Button)`
  background: #db4437;
  color: #ffffff;

  &:hover {
    background: #c23321;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-align: center;
`;

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { theme } = useTheme();
  const navigate = useNavigate();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password || !confirmPassword) {
      setError('All fields are required.');
      return false;
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) return;

    try {
      const response = await axiosInstance.post('/register/', { email, password });
      if (response.data) {
        navigate('/login');
      } else {
        setError('Unexpected error: Invalid response from server.');
      }
    } catch (error) {
      console.error('Register error:', error);
      setError(error.response?.data?.error || 'An unexpected error occurred.');
    }
  };

  return (
    <GoogleOAuthProvider clientId="***REMOVED***.apps.googleusercontent.com">
      <RegisterContainer theme={theme}>
        <RegisterCard theme={theme}>
          <CardBody>
            <Title>Sign Up</Title>
            <form onSubmit={handleSubmit}>
              <InputGroup theme={theme}>
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
              <InputGroup theme={theme}>
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputGroup>
              <InputGroup theme={theme}>
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </InputGroup>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <Button theme={theme} type="submit">
                Register
              </Button>
            </form>
            <div className="text-center my-4">or</div>
            <GoogleLogin
              onSuccess={(response) => console.log(response)}
              onError={() => setError('Google login failed. Please try again.')}
            />
          </CardBody>
          <CardImage theme={theme}>
            <img src={RegisterImage} alt="Register" />
            <a href="/login">I am already a member</a>
          </CardImage>
        </RegisterCard>
      </RegisterContainer>
    </GoogleOAuthProvider>
  );
};

export default RegisterPage;
