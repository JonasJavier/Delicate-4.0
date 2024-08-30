import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import organicFoodImage from '../assets/images/About/main1.png';

const Container = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  padding: 2rem;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const Column = styled.div`
  flex: 1;
  padding: 1rem;

  @media (max-width: 992px) {
    flex-basis: 100%;
    max-width: 100%;
  }
`;

const Title = styled.h1`
  font-weight: bold;
  color: #343a40;
  font-size: 3.9rem;
  margin-bottom: 1.5rem;
  font-family: Pro-text;

  @media (max-width: 1200px) {
    font-size: 3.5rem;
  }

  @media (max-width: 992px) {
    font-size: 3rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 500px) {
    font-size: 2rem;
  }
`;

const Text = styled.p`
  color: #343a40;
  font-size: 1.3rem;
  margin-bottom: 2rem;
  font-family: Poppings-Light;

span {
  color: #f28123;
}

  @media (max-width: 1200px) {
    font-size: 1.3rem;
  }

  @media (max-width: 992px) {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

const Image = styled.img`
  max-height: 400px;
  width: 100%;
  object-fit: cover;
  border-radius: 0.25rem;
`;

const Information = () => {
  return (
    <Container className="container">
      <Row className="row">
        <Column className="col-lg-6 col-md-12">
          <Title> <span>100%</span> Trusted Organic </Title>
          <Text>
            Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac, cursus vitae eros. Cras quis ultricies elit. Proin ac lectus arcu. Maecenas aliquet vel tellus at accumsan. Donec a eros non massa vulputate ornare. Vivamus ornare commodo ante, at commodo felis congue vitae.
          </Text>
        </Column>
        <Column className="col-lg-6 col-md-12">
          <Image src={organicFoodImage} alt="Organic Food" />
        </Column>
      </Row>
    </Container>
  );
};

export default Information;
