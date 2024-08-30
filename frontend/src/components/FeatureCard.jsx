import React from 'react';
import styled from 'styled-components';

const ContainerFluid = styled.div`
  background-color: #ffffff;
  margin-top: 2rem; 
`;

const FeatureRow = styled.div`
  .col-md-6:last-child,
  .col-lg-3:last-child {
    border-right: none;
  }
`;

const Col = styled.div`
  &.mb-3 {
    margin-bottom: 3rem;
  }
`;

const Card = styled.div`
  border: none;
  transition: background-color 0.3s ease, color 0.3s ease, padding 0.3s ease;
  background-color: #ffffff;
  text-align: center;
  height: 100%;
  padding: 10px; /* Ajusta el padding según sea necesario */
  &:hover {
    background-color: #11ab17;
    color: white;
    padding: 20px; /* Ajusta el padding en hover según sea necesario */
  }
  &:hover .card-title,
  &:hover .card-text {
    color: white !important; /* Asegura que el color de los iconos cambie */
  }
  &:hover .icon-wrapper {
    background-color: white; 
    border-color: white; 
  }
`;

const CardBody = styled.div``;

const IconWrapper = styled.div`
  display: inline-block;
  width: 70px;
  height: 70px;
  border: 2px solid #dcdcdc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

const CardTitle = styled.h5`
  font-family: 'Poppins', sans-serif;
`;

const CardText = styled.p`
  font-family: 'Poppins', sans-serif;
`;

const features = [
  {
    icon: 'fa-shipping-fast',
    title: 'Free Shipping',
    description: 'Free shipping with discount',
  },
  {
    icon: 'fa-headset',
    title: 'Great Support 24/7',
    description: 'Instant access to Contact',
  },
  {
    icon: 'fa-lock',
    title: '100% Secure Payment',
    description: 'We ensure your money is save',
  },
  {
    icon: 'fa-undo-alt',
    title: 'Money-Back Guarantee',
    description: '30 days money-back guarantee',
  },
];

const FeatureCard = () => {
  return (
    <ContainerFluid className="container-fluid py-4">
      <FeatureRow className="row feature-row">
        {features.map((feature, index) => (
          <Col key={index} className="col-13 col-md-6 col-lg-3 mb-3">
            <Card className={`card feature-card ${index < features.length - 1 ? 'border-right' : ''}`}>
              <CardBody className="card-body3">
                <IconWrapper className="icon-wrapper">
                  <i className={`fas ${feature.icon} fa-2x text-success`}></i>
                </IconWrapper>
                <CardTitle className="card-title3">{feature.title}</CardTitle>
                <CardText className="card-text3">{feature.description}</CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </FeatureRow>
    </ContainerFluid>
  );
};

export default FeatureCard;
