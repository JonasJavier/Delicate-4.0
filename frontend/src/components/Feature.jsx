import React, { memo } from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext'; // Importa el contexto del tema

const Container = styled.div`
  background-color: ${(props) => (props.theme === 'dark' ? '#1e1e1e' : '#ffffff')};
  color: ${(props) => (props.theme === 'dark' ? '#e0e0e0' : '#000000')};
  margin-top: 7%;
  padding: 5rem 0;
`;

const InnerContainer = styled.div`
  &.animate__animated.animate__fadeInUp {
    animation-duration: 1s;
    animation-fill-mode: both;
  }
`;

const TextCenter = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
`;

const Title = styled.p`
  color: #f7941d !important;
  text-transform: uppercase;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Subtitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 5rem;
  color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#1a1a1a')} !important;
  font-family: Pro-text;
  font-weight: 500;

  @media (max-width: 1200px) {
    font-size: 3.5rem;
  }

  @media (max-width: 1050px) {
    font-size: 3rem;
  }

  @media (max-width: 900px) {
    font-size: 2.5rem;
  }

  @media (max-width: 800px) {
    font-size: 2rem;
  }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  flex: 1;

  @media (max-width: 1000px) {
    min-width: 100%;
  }
`;

const FactItem = styled.div`
  background-color: ${(props) => (props.theme === 'dark' ? '#333' : '#f8f9fa')};
  color: ${(props) => (props.theme === 'dark' ? '#e0e0e0' : '#000000')};
  text-align: center;
  padding: 3rem;
  height: 100%;
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s, margin-top 0.3s;

  &:hover {
    background-color: ${(props) => (props.theme === 'dark' ? '#F28123' : '#F28123')} !important;
    color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#ffffff')} !important;
    box-shadow: 0 0 45px rgba(0, 0, 0, 0.1);
    margin-top: -10px;
  }

  .Number {
    font-size: 4rem;
    color: ${(props) => (props.theme === 'dark' ? '#ffcc00' : '#e39251')} !important;
    margin-bottom: 2rem;
    font-family: Pro-text;
  }

  h4 {
    margin-bottom: 2rem;
    color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#343a40')} !important;
    font-family: Poppins-Light;
  }

  .Text {
    color: ${(props) => (props.theme === 'dark' ? '#e0e0e0' : '#343a40')} !important;
    font-family: Poppins-Light;
  }

  &:hover h1,
  &:hover h4,
  &:hover span {
    color: #ffffff !important;
  }
`;

const Feature = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { theme } = useTheme(); // Obtener el tema actual

  return (
    <Container ref={ref} theme={theme}>
      <InnerContainer className={`container ${inView ? 'animate__animated animate__fadeInUp' : ''}`}>
        <TextCenter>
          <Title>Why Choose Us!</Title>
          <Subtitle theme={theme}>The pioneering company of handcrafted soaps in the country</Subtitle>
        </TextCenter>
        <Row>
          {[
            { end: 50, duration: 6, prefix: '+', title: 'Happy Clients', text: 'Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo' },
            { end: 5, duration: 7, prefix: '+', title: 'Years Experience', text: 'Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo' },
            { end: 1000, duration: 6, prefix: '+', title: 'Soaps sold', text: 'Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo' }
          ].map((fact, index) => (
            <Column key={index}>
              <FactItem theme={theme}>
                <h1 className="Number">{inView && <CountUp end={fact.end} duration={fact.duration} prefix={fact.prefix} />}</h1>
                <h4>{fact.title}</h4>
                <span className="Text">{fact.text}</span>
              </FactItem>
            </Column>
          ))}
        </Row>
      </InnerContainer>
    </Container>
  );
};

export default memo(Feature);
