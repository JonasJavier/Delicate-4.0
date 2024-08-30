import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import heroImage from '../assets/images/hero/2.jpg'; // Importar la imagen

const HeroSection = styled.div`
  width: 100%;
  height: 60vh;
  background-image: url(${heroImage}); 
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  margin-bottom: 5%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 606px) {
    height: 80vh;
  }

  @media (max-width: 500px) {
    height: 70vh;
  }

  @media (max-width: 401px) {
    height: 60vh;
  }

  @media (max-width: 325px) {
    height: 50vh;
  }
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.648);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  z-index: 1;
  color: white;
  position: relative;
`;

const SmallTitle = styled.p`
  color: #ff9924;
  font-size: 1.7rem !important;
  margin-top: 50%;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);

  @media (max-width: 1081px) {
    font-size: 2.5rem;
  }

  @media (max-width: 940px) {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem !important;
  }

  @media (max-width: 606px) {
    font-size: 1.5rem;
  }

  @media (max-width: 500px) {
    font-size: 1.5rem !important;
  }

  @media (max-width: 401px) {
    font-size: 1.5rem !important;
  }

  @media (max-width: 325px) {
    font-size: 1.2rem !important;
  }
`;

const MainTitle = styled.h1`
  color: #fff;
  font-weight: bold;
  font-size: 3.7rem;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  font-family: Pro-text;

  @media (max-width: 1081px) {
    font-size: 5rem;
  }

  @media (max-width: 940px) {
    font-size: 4rem;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 606px) {
    font-size: 2.5rem;
  }

  @media (max-width: 500px) {
    font-size: 2rem;
  }

  @media (max-width: 401px) {
    font-size: 1.8rem;
  }

  @media (max-width: 325px) {
    font-size: 1.5rem;
  }
`;

const HeroShop = React.memo(() => {
  return (
    <HeroSection>
      <Overlay />
      <Content>
        <SmallTitle>Fresh & Organic</SmallTitle>
        <MainTitle>Shop</MainTitle>
      </Content>
    </HeroSection>
  );
});

export default HeroShop;
