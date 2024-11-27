import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container as BootstrapContainer } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import strawberryImg from '../assets/images/products/img-2.png';
import lemonImg from '../assets/images/products/img-3.png';
import { useTheme } from '../context/ThemeContext';

const StyledContainer = styled.div`
  margin: 3% 0;
  padding: 0 5%;
  background-color: ${({ theme }) => theme === 'dark' ? '#1e1e1e' : '#fff'};
  color: ${({ theme }) => theme === 'dark' ? '#f5f5f5' : '#000'};

  .page-title {
    font-size: 3rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 4rem;
    color: ${({ theme }) => theme === 'dark' ? '#f5f5f5' : '#000'};
    
    @media (max-width: 1200px) {
      font-size: 1.75rem;
    }
    @media (max-width: 1000px) {
      font-size: 1.5rem;
    }
    @media (max-width: 800px) {
      font-size: 1.25rem;
    }
    @media (max-width: 600px) {
      font-size: 1rem;
    }
    @media (max-width: 400px) {
      font-size: 0.875rem;
    }
    @media (max-width: 300px) {
      font-size: 0.75rem;
    }
  }
`;

const StyledFormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const StyledFormControl = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid ${({ theme }) => theme === 'dark' ? '#555' : '#ccc'};
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme === 'dark' ? '#2e2e2e' : '#fff'};
  color: ${({ theme }) => theme === 'dark' ? '#fff' : '#000'};
`;

const StyledFormSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid ${({ theme }) => theme === 'dark' ? '#555' : '#ccc'};
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme === 'dark' ? '#2e2e2e' : '#fff'};
  color: ${({ theme }) => theme === 'dark' ? '#fff' : '#000'};
`;

const StyledFormCheck = styled.div`
  margin-top: 0.5rem;

  .form-check-input {
    margin-right: 0.5rem;
  }

  label {
    color: ${({ theme }) => theme === 'dark' ? '#fff' : '#000'};
  }
`;

const StyledCard = styled.div`
  border: 1px solid ${({ theme }) => theme === 'dark' ? '#555' : '#ddd'};
  border-radius: 0.5rem;
  margin-top: 1.5rem;
  background-color: ${({ theme }) => theme === 'dark' ? '#2e2e2e' : '#fff'};
  color: ${({ theme }) => theme === 'dark' ? '#fff' : '#000'};

  .card-body {
    padding: 1.5rem;

    @media (max-width: 600px) {
      text-align: center;
    }
    @media (max-width: 400px) {
      font-size: 0.875rem;
    }
    @media (max-width: 300px) {
      font-size: 0.75rem;
    }
  }

  .card-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const ProductImg = styled.img`
  width: 50px;
  margin-right: 10px;

  @media (max-width: 1000px) {
    width: 45px;
  }
  @media (max-width: 800px) {
    width: 40px;
  }
  @media (max-width: 600px) {
    width: 35px;
  }
  @media (max-width: 400px) {
    width: 30px;
  }
  @media (max-width: 300px) {
    width: 25px;
  }
`;

const PaymentButton = styled.button`
  width: 100%;
  margin-bottom: 10px;
  padding: 0.5rem;
  border: 1px solid transparent;
  background-color: ${({ selected, theme }) => selected ? '#007bff' : theme === 'dark' ? '#555' : 'transparent'};
  color: ${({ selected, theme }) => selected ? '#fff' : theme === 'dark' ? '#f5f5f5' : '#007bff'};
  border-color: #007bff;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ selected, theme }) => selected ? '#0056b3' : theme === 'dark' ? '#333' : '#e6f2ff'};
    color: ${({ selected, theme }) => selected ? '#fff' : theme === 'dark' ? '#f5f5f5' : '#0056b3'};
  }
`;

const AcceptedCards = styled.div`
  margin-top: 1rem;

  img {
    width: 40px;
    margin-right: 10px;
  }
`;

const Checkout = () => {
  const { theme } = useTheme(); // Access current theme (dark/light)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    email: '',
    country: '',
    state: '',
    zip: '',
    phone: '',
    shipDifferent: false,
    notes: '',
    paymentMethod: '',
  });
  const [cartItems] = useState([
    { id: 1, name: 'Green Capsicum', price: 14.00, quantity: 5, image: strawberryImg },
    { id: 2, name: 'Red Capsicum', price: 14.00, quantity: 1, image: lemonImg },
  ]);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePaymentChange = (method) => {
    setFormData({ ...formData, paymentMethod: method });
  };

  return (
    <StyledContainer theme={theme}>
      <h2 className="page-title">Checkout</h2>
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <BillingInfo formData={formData} handleInputChange={handleInputChange} theme={theme} />
          <AdditionalInfo formData={formData} handleInputChange={handleInputChange} theme={theme} />
        </div>
        <div className="col-lg-4 col-md-12">
          <OrderSummary cartItems={cartItems} total={total} formData={formData} handlePaymentChange={handlePaymentChange} theme={theme} />
        </div>
      </div>
    </StyledContainer>
  );
};

const BillingInfo = ({ formData, handleInputChange, theme }) => (
  <>
    <h5>Billing Information</h5>
    <StyledFormGroup>
      <StyledFormControl type="text" name="firstName" placeholder="Your first name" onChange={handleInputChange} value={formData.firstName} theme={theme} />
      <StyledFormControl type="text" name="lastName" placeholder="Your last name" onChange={handleInputChange} value={formData.lastName} className="mt-2" theme={theme} />
      <StyledFormControl type="text" name="company" placeholder="Company name (optional)" onChange={handleInputChange} value={formData.company} className="mt-2" theme={theme} />
      <StyledFormControl type="text" name="address" placeholder="Street Address" onChange={handleInputChange} value={formData.address} className="mt-2" theme={theme} />
      <StyledFormControl type="email" name="email" placeholder="Email" onChange={handleInputChange} value={formData.email} className="mt-2" theme={theme} />
      <StyledFormSelect name="country" onChange={handleInputChange} value={formData.country} className="mt-2" theme={theme}>
        <option value="">Country / Region</option>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
      </StyledFormSelect>
      <StyledFormControl type="text" name="state" placeholder="State" onChange={handleInputChange} value={formData.state} className="mt-2" theme={theme} />
      <StyledFormControl type="text" name="zip" placeholder="Zip Code" onChange={handleInputChange} value={formData.zip} className="mt-2" theme={theme} />
      <StyledFormControl type="text" name="phone" placeholder="Phone number" onChange={handleInputChange} value={formData.phone} className="mt-2" theme={theme} />
      <StyledFormCheck theme={theme}>
        <input className="form-check-input" type="checkbox" name="shipDifferent" id="shipDifferent" onChange={handleInputChange} checked={formData.shipDifferent} />
        <label className="form-check-label" htmlFor="shipDifferent">Ship to a different address</label>
      </StyledFormCheck>
    </StyledFormGroup>
  </>
);

const AdditionalInfo = ({ formData, handleInputChange, theme }) => (
  <>
    <h5 className="mt-4">Additional Info</h5>
    <StyledFormGroup>
      <textarea className="form-control" rows="3" name="notes" placeholder="Notes about your order, e.g. special notes for delivery" onChange={handleInputChange} value={formData.notes} theme={theme}></textarea>
    </StyledFormGroup>
  </>
);

const OrderSummary = ({ cartItems, total, formData, handlePaymentChange, theme }) => (
  <StyledCard theme={theme}>
    <div className="card-body">
      <h5 className="card-title">Order Summary</h5>
      {cartItems.map(item => (
        <div className="d-flex justify-content-between" key={item.id}>
          <div>
            <ProductImg src={item.image} alt={item.name} />
            {item.name} x{item.quantity}
          </div>
          <div>${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      ))}
      <hr />
      <p className="card-text">Subtotal: ${total.toFixed(2)}</p>
      <p className="card-text">Shipping: Free</p>
      <h5 className="card-text">Total: ${total.toFixed(2)}</h5>

      <h5 className="mt-4">Payment Method</h5>
      <div className="payment-methods">
        <PaymentButton selected={formData.paymentMethod === 'credit'} onClick={() => handlePaymentChange('credit')} theme={theme}>
          <i className="fa fa-credit-card"></i> Add Credit/Debit Card
        </PaymentButton>
        <p className="text-center my-2">OR</p>
        <PaymentButton selected={formData.paymentMethod === 'paypal'} onClick={() => handlePaymentChange('paypal')} theme={theme}>
          <i className="fa fa-paypal"></i> PayPal
        </PaymentButton>
      </div>
      <AcceptedCards>
        <p>WE ACCEPT:</p>
        <img src="visa.png" alt="Visa" />
        <img src="mastercard.png" alt="MasterCard" />
        <img src="paypal.png" alt="PayPal" />
        <img src="amex.png" alt="American Express" />
        <img src="visa-electron.png" alt="Visa Electron" />
      </AcceptedCards>
      <Link to="/OrderConfirmation" state={{ orderDetails: { ...formData, items: cartItems, total } }}>
        <button className="btn btn-success w-100 mt-3">Confirm Order</button>
      </Link>
      <button className="btn btn-secondary w-100 mt-2">Save for later</button>
    </div>
  </StyledCard>
);

export default Checkout;
