import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const ServicesContainer = styled.div`
  padding: 20px;
  background-color: ${(props) => (props.theme === 'dark' ? '#1e1e1e' : '#ffffff')};
  color: ${(props) => (props.theme === 'dark' ? '#e0e0e0' : '#333')};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const ServicesTitle = styled.h2`
  text-align: center;
  font-size: 4rem;
  color: ${(props) => (props.theme === 'dark' ? '#F28123' : '#333')};
  margin-bottom: 5%;
  margin-top: -5%;
  font-family: 'Pro-text', sans-serif;
  font-weight: bold;

  span {
    color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#333')};
  }
`;

const ServiceCard = styled.div`
  border: 1px solid ${(props) => (props.theme === 'dark' ? '#444' : '#ddd')};
  border-radius: 8px;
  text-align: center;
  padding: 20px;
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
  min-height: 205px;
  box-shadow: 0 4px 20px ${(props) => (props.theme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)')};

  &:hover {
    background-color: ${(props) => (props.theme === 'dark' ? '#444' : '#28a745')};
    color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#ffffff')};
    box-shadow: 0 8px 16px ${(props) => (props.theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')};
  }

  i {
    color: ${(props) => (props.theme === 'dark' ? '#F28123' : '#28a745')};
    transition: color 0.3s;
  }

  &:hover i {
    color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#ffffff')};
  }

  h5 {
    font-size: 1.5rem;
    color: ${(props) => (props.theme === 'dark' ? '#e0e0e0' : '#333')};
    transition: color 0.3s;
  }

  &:hover h5 {
    color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#ffffff')};
  }
`;

const Services = () => {
  const { theme } = useTheme();

  return (
    <ServicesContainer theme={theme} className="container my-5">
      <ServicesTitle theme={theme}>
        Our <span>Services</span>
      </ServicesTitle>
      <div className="row">
        {[
          { icon: 'fas fa-truck', title: 'Delivery Services' },
          { icon: 'fas fa-exchange-alt', title: 'Shipping & Return' },
          { icon: 'fas fa-percent', title: 'Promotion' },
          { icon: 'fas fa-user-clock', title: '24 Hours Service' },
        ].map((service, index) => (
          <div className="col-md-3 col-sm-6 mb-4" key={index}>
            <ServiceCard theme={theme}>
              <i className={`${service.icon} fa-4x mb-3`}></i>
              <h5>{service.title}</h5>
            </ServiceCard>
          </div>
        ))}
      </div>
    </ServicesContainer>
  );
};

export default Services;
