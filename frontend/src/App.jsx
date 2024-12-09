import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/css/App.css';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import ErrorBoundary from './components/ErrorBoundary';
import PrivateRoute from './components/PrivateRoute'; 
import CreateBlogPost from './pages/CreateBlogPost';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ProductManagement from './pages/ProductManagement'; 
import ThemeToggleButton from './components/ThemeToggleButton';
import './assets/css/global.css'; 
import PropTypes from 'prop-types';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Shop = lazy(() => import('./pages/Shop'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const ShoppingCart = lazy(() => import('./pages/ShoppingCart'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'));
const OrderHistoryPage = lazy(() => import('./pages/OrderHistoryPage'));
const OrderDetailsPage = lazy(() => import('./pages/OrderDetailsPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const AppWrapper = styled.div`
  animation: ${fadeIn} 1s ease-in-out;
  background-color: ${(props) => (props.theme === 'dark' ? '#121212' : '#ffffff')};
  color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#000000')};
  min-height: 100vh;
  transition: all 0.3s ease;
`;

function ThemedAppWrapper({ children }) {
  const { theme } = useTheme();
  return <AppWrapper theme={theme}>{children}</AppWrapper>;
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader minLoadTime={2000} />;
  }

  return (
    <ThemeProvider>
      <ThemedAppWrapper>
        <AuthProvider>
          <Router>
            <ErrorBoundary>
              <Suspense fallback={<Loader />}>
                <Navbar />
                <ThemeToggleButton />
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogDetail />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/shoppingcart" element={<ShoppingCart />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogDetail />} />

                  {/* Private Routes */}
                  <Route element={<PrivateRoute />}>
                    <Route path="/orderhistorypage" element={<OrderHistoryPage />} />
                    <Route path="/createblogpost" element= {<CreateBlogPost/>}/>
                    <Route path="/orderdetails/:id" element={<OrderDetailsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/thankyoupage" element={<ThankYouPage />} />
                    <Route path="/orderconfirmation" element={<OrderConfirmation />} />
                    <Route path="/admin/product-management" element={<ProductManagement />} />
                  </Route>
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </Router>
        </AuthProvider>
      </ThemedAppWrapper>
    </ThemeProvider>
  );
}
ThemedAppWrapper.propTypes = {
  children: PropTypes.node.isRequired, // children es obligatorio y puede ser cualquier elemento React
};

export default App;
