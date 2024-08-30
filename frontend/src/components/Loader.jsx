// src/components/Loader.js
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(0.5);
    opacity: 0.7;
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
`;

const Circle = styled.div`
  width: 30px;
  height: 30px;
  margin: 6px;
  border-radius: 50%;
  background-color: ${props => props.color};
  animation: ${bounce} 0.6s infinite alternate;
  animation-delay: ${props => props.delay};
`;

const Loader = ({ minLoadTime = 2000 }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), minLoadTime);
    return () => clearTimeout(timer);
  }, [minLoadTime]);

  if (!loading) return null;

  return (
    <LoaderWrapper>
      <Circle color="#fff" delay="0s" />
      <Circle color="#cd8532" delay="0.1s" />
      <Circle color="#fff" delay="0.2s" />
      <Circle color="#cd8532" delay="0.3s" />
    </LoaderWrapper>
  );
};

export default Loader;
