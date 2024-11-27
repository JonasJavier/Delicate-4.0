import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styled from 'styled-components';
import LoginImage from '../assets/images/RegisterLogin/login.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

const LoginContainer = styled.div`
  background: ${(props) => (props.theme === 'dark' ? '#121212' : '#f5f5f5')};
  color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#000000')};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginCard = styled.div`
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
  position: relative;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }

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

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { handleGoogleLoginSuccess } = useGoogleAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', { email, password });
      if (response.data) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        login({ email, access_token: response.data.access, refresh_token: response.data.refresh });
        navigate('/');
      } else {
        setError('Unexpected error: Invalid response from server.');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setError('Invalid credentials. Please check your email and password.');
            break;
          case 401:
            setError('Unauthorized access. Please try logging in again.');
            break;
          case 500:
            setError('Server error. Please try again later.');
            break;
          default:
            setError('An unexpected error occurred. Please try again later.');
        }
      } else {
        setError('Network error. Please check your internet connection.');
      }
    }
  };

  return (
    <GoogleOAuthProvider clientId="***REMOVED***.apps.googleusercontent.com">
      <LoginContainer theme={theme}>
        <LoginCard theme={theme}>
          <CardBody>
            <Title>Login</Title>
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
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <Button theme={theme} type="submit">
                Login
              </Button>
            </form>
            <div className="text-center my-4">or</div>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => setError('Google login failed. Please try again.')}
              render={(renderProps) => (
                <GoogleButton theme={theme} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  <FontAwesomeIcon icon={faGoogle} /> Login with Google
                </GoogleButton>
              )}
            />
          </CardBody>
          <CardImage theme={theme}>
            <img src={LoginImage} alt="Login" />
            <a href="/register">I am not a member yet</a>
          </CardImage>
        </LoginCard>
      </LoginContainer>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
