import React from 'react';
import styled from 'styled-components';
import aboutImage from '../assets/images/mini-about/mini-about.jpg';

// Styled Components
const Container = styled.div`
  padding: 4rem 2rem;
  font-family: 'Pro-text', sans-serif;
  background-color: #f9f9f9;
  text-align: left !important;

  @media (max-width: 1000px) {
    padding: 3.5rem 1.5rem;
  }

  @media (max-width: 800px) {
    padding: 3rem 1rem;
  }

  @media (max-width: 600px) {
    padding: 2.5rem 1rem;
  }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  text-align: left;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const ColumnLeft = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  justify-content: center;
  

  img {
    width: 100%;
    height: auto;
    border-radius: 15px;

    @media (max-width: 1000px) {
      width: 80%;
    }

    @media (max-width: 600px) {
      width: 90%;
    }
  }
`;

const ColumnRight = styled.div`
  flex: 1;
  padding: 1rem;

  @media (max-width: 1000px) {
    text-align: center;
    padding-top: 2rem;
  }
`;

const SinceYear = styled.span`
  font-size: 1.4rem;
  color: #888;
  display: block;
  margin-bottom: 1rem;
`;

const AboutTitle = styled.h2`
  font-size: 3rem;
  margin: 0.5rem 0;
  font-weight: 700;
  color: #333;

  span {
    color: #f28123;
  }

  @media (max-width: 1000px) {
    font-size: 2.5rem;
  }

  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const AboutText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  max-width: 90%;

  @media (max-width: 1000px) {
    max-width: 95%;
    margin: 0 auto 1.5rem;
  }

  @media (max-width: 800px) {
    max-width: 100%;
  }

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const AboutButton = styled.button`
  background-color: #f28123;
  border: none;
  color: white;
  padding: 0.8rem 2.5rem;
  font-size: 1.2rem;
  border-radius: 50px;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #ffffff;
    color: #f28123;
    transform: scale(1.05);
  }

  @media (max-width: 1000px) {
    font-size: 1rem;
    padding: 0.7rem 2rem;
  }

  @media (max-width: 800px) {
    font-size: 0.9rem;
    padding: 0.6rem 1.8rem;
  }

  @media (max-width: 600px) {
    font-size: 0.8rem;
    padding: 0.5rem 1.6rem;
  }
`;

const MiniAbout = () => {
  return (
    <Container>
      <Row>
        <ColumnLeft>
          <img src={aboutImage} alt="About Me" />
        </ColumnLeft>
        <ColumnRight>
          <SinceYear>Since Year 2022</SinceYear>
          <AboutTitle>We are <span>Delicate</span></AboutTitle>
          <AboutText>
            Etiam vulputate ut augue vel sodales. In sollicitudin neque et massa porttitor vestibulum ac vel nisi. Vestibulum placerat eget dolor sit amet posuere. In ut dolor aliquet, aliquet sapien sed, interdum velit. Nam eu molestie lorem.
          </AboutText>
          <AboutText>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente facilis illo repellat veritatis minus, et labore minima mollitia qui ducimus.
          </AboutText>
          <AboutButton>Know More</AboutButton>
        </ColumnRight>
      </Row>
    </Container>
  );
};

export default MiniAbout;
