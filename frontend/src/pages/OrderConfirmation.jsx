import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/OrderConfirmation.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails } = location.state || {};
  const { name, address, email, phone, paymentMethod, items, total } = orderDetails;

  const handleConfirmOrder = () => {
    navigate('/thank-you', { state: { orderDetails } });
  };

  return (
    <div className="container confirm-order-container my-3">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card p-5">
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
                <li className="list-group-item d-flex justify-content-between lh-condensed" key={item.id}>
                  <div className="order-item">
                    <img src={item.image} alt={item.name} className="order-item-img" />
                    <div>
                      <h5 className="my-0">{item.name}</h5>
                      <small className="text-muted">x{item.quantity}</small>
                    </div>
                  </div>
                  <span className="text-muted">${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between">
              <strong>Total:</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-primary btn-block" onClick={handleConfirmOrder}>Confirm Order</button>
              <Link to="/thank-you">
                <button className="btn btn-secondary btn-block cancel-button">Cancel Order</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
