import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const StyledContainer = styled.div`
  background-color: ${({ theme }) => theme === 'dark' ? '#1e1e1e' : '#fff'};
  color: ${({ theme }) => theme === 'dark' ? '#f5f5f5' : '#000'};
  padding: 3% 0;
`;

const StyledCard = styled.div`
  background-color: ${({ theme }) => theme === 'dark' ? '#2e2e2e' : '#fff'};
  border: 1px solid ${({ theme }) => theme === 'dark' ? '#444' : '#ddd'};
  border-radius: 0.25rem;
  padding: 2rem;
  color: ${({ theme }) => theme === 'dark' ? '#f5f5f5' : '#000'};
`;

const StyledOrderItem = styled.div`
  display: flex;
  align-items: center;

  .order-item-img {
    width: 50px;
    height: auto;
    margin-right: 15px;
  }

  h5 {
    color: ${({ theme }) => theme === 'dark' ? '#fff' : '#000'};
  }

  small {
    color: ${({ theme }) => theme === 'dark' ? '#ccc' : '#6c757d'};
  }
`;

const StyledButton = styled.button`
  background-color: ${({ theme, primary }) => primary ? (theme === 'dark' ? '#007bff' : '#007bff') : (theme === 'dark' ? '#555' : '#6c757d')};
  color: ${({ theme }) => theme === 'dark' ? '#fff' : '#fff'};
  border: none;
  padding: 0.75rem 1.25rem;
  width: 100%;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, primary }) => primary ? (theme === 'dark' ? '#0056b3' : '#0056b3') : (theme === 'dark' ? '#333' : '#5a6268')};
  }
`;

const OrderConfirmation = () => {
  const { theme } = useTheme(); // Obtiene el tema actual (oscuro o claro)
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails } = location.state || {};
  const { name, address, email, phone, paymentMethod, items, total } = orderDetails;

  const handleConfirmOrder = () => {
    navigate('/thank-you', { state: { orderDetails } });
  };

  return (
    <StyledContainer theme={theme} className="container confirm-order-container my-3">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <StyledCard theme={theme} className="card p-5">
            <h3 className="mb-4">Shipping Information</h3>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Address:</strong> {address}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone:</strong> {phone}</p>

            <h3 className="mt-4 mb-4">Payment Method</h3>
            <p>{paymentMethod}</p>

            <h3 className="mt-4 mb-4">Order Summary</h3>
            <ul className="list-group mb-3">
              {items.map(item => (
                <li className="list-group-item d-flex justify-content-between lh-condensed" key={item.id} style={{ backgroundColor: theme === 'dark' ? '#1e1e1e' : '#fff' }}>
                  <StyledOrderItem theme={theme}>
                    <img src={item.image} alt={item.name} className="order-item-img" />
                    <div>
                      <h5 className="my-0">{item.name}</h5>
                      <small className="text-muted">x{item.quantity}</small>
                    </div>
                  </StyledOrderItem>
                  <span className="text-muted">${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between">
              <strong>Total:</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <StyledButton theme={theme} primary onClick={handleConfirmOrder}>Confirm Order</StyledButton>
              <Link to="/thank-you">
                <StyledButton theme={theme} className="cancel-button">Cancel Order</StyledButton>
              </Link>
            </div>
          </StyledCard>
        </div>
      </div>
    </StyledContainer>
  );
};

export default OrderConfirmation;
