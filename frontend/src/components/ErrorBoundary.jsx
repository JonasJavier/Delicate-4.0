import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Styles for the ErrorBoundary
const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8d7da;
  color: #721c24;
  text-align: center;
  padding: 20px;
`;

const ErrorTitle = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  font-size: 1.2em;
  margin-bottom: 30px;
`;

const BackButton = styled.button`
  background-color: #721c24;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f5c6cb;
  }
`;

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  handleBackToHome = () => {
    window.location.href = '/';
  };

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorWrapper>
          <ErrorTitle>Oops! Something went wrong.</ErrorTitle>
          <ErrorMessage>We encountered an unexpected error. Please try again later or return to the homepage.</ErrorMessage>
          <BackButton onClick={this.handleBackToHome}>Go to Homepage</BackButton>
          <BackButton onClick={this.handleRetry} style={{ marginTop: '10px' }}>Retry</BackButton>
        </ErrorWrapper>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
