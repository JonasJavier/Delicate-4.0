import React from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/User.css';
import strawberryImg from '../assets/images/products/img-2.png';
import lemonImg from '../assets/images/products/img-3.png';

const OrderDetailsPage = () => {
  const { id } = useParams();

  const orderDetails = {
    '738': {
      date: '8 Sep, 2020',
      products: [
        { name: 'Strawberry', price: '$14.00', quantity: 'x5', subtotal: '$70.00', image: strawberryImg },
        { name: 'Lemon', price: '$14.00', quantity: 'x2', subtotal: '$28.00', image: lemonImg },
        { name: 'Green Chili', price: '$26.70', quantity: 'x10', subtotal: '$267.00', image: lemonImg }
      ],
      orderId: '738',
      paymentMethod: 'Paypal',
      subtotal: '$365.00',
      discount: '20%',
      shipping: 'Free',
      total: '$84.00'
    },
    // Add details for other orders as needed
  };

  const order = orderDetails[id];

  if (!order) {
    return <div>Order not found.</div>;
  }

  return (
    <div className="user-page-container p-4">
      <div className="row">
        <div className="col-lg-3">
          <Navigation />
        </div>
        <div className="col-lg-9">
          <div className="order-details-container">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5>Order Details</h5>
              <a href="/OrderHistoryPage">Back to List</a>
            </div>
            <div className="order-summary mb-4">
              <div className="row">
                <div className="col-md-4">
                  <div className="card p-3 mb-3">
                    <h6>Billing Address</h6>
                    <hr />
                    <p><strong>Dianne Russell</strong></p>
                    <p>4140 Parker Rd. Allentown, New Mexico 31134</p>
                    <p><span className="text-muted">Email:</span> redacted@example.com</p>
                    <p><span className="text-muted">Phone:</span> (671) 555-0110</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card p-3 mb-3">
                    <h6>Shipping Address</h6>
                    <hr />
                    <p><strong>Dianne Russell</strong></p>
                    <p>4140 Parker Rd. Allentown, New Mexico 31134</p>
                    <p><span className="text-muted">Email:</span> redacted@example.com</p>
                    <p><span className="text-muted">Phone:</span> (671) 555-0110</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card p-3 mb-3">
                    <h6>Order Summary</h6>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <p><strong>Order ID:</strong></p>
                      <p>{order.orderId}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p><strong>Payment Method:</strong></p>
                      <p>{order.paymentMethod}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p><strong>Subtotal:</strong></p>
                      <p>{order.subtotal}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p><strong>Shipping:</strong></p>
                      <p>{order.shipping}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p><strong>Total:</strong></p>
                      <p>{order.total}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-status mt-4">
                <div className="d-flex align-items-center">
                  <div className="status-circle completed">
                    <i className="fas fa-check"></i>
                  </div>
                  <div className="status-line completed"></div>
                  <div className="status-circle completed">
                    <span>02</span>
                  </div>
                  <div className="status-line"></div>
                  <div className="status-circle">
                    <span>03</span>
                  </div>
                  <div className="status-line"></div>
                  <div className="status-circle">
                    <span>04</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <span>Order received</span>
                  <span>Processing</span>
                  <span>On the way</span>
                  <span>Delivered</span>
                </div>
              </div>
            </div>
            <div className="order-items">
              <table className="table">
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product, index) => (
                    <tr key={index}>
                      <td>
                        <img src={product.image} alt={product.name} className="product-img" />
                        <span>{product.name}</span>
                      </td>
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>{product.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
