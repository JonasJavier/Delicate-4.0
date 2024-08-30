import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/ThankYou.css';

const ThankYou = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const orderDetails = location.state?.orderDetails;

    return (
        <div className="container mt-5">
            <div className="card p-4">
                <h2 className="mb-4">Thank You for Your Order!</h2>
                <p>We have received your order and a confirmation email has been sent to you.</p>
                <h4>Order Summary</h4>
                <p>Name: {orderDetails?.name}</p>
                <p>Email: {orderDetails?.email}</p>
                <h4>Items Ordered</h4>
                {orderDetails?.items.map((item, index) => (
                    <div key={index}>
                        <p>{item.name} x {item.quantity} - ${item.price}</p>
                    </div>
                ))}
                <h4>Total: ${orderDetails?.total}</h4>
                <button className="btn btn-primary mt-3" onClick={() => navigate('/shop')}>Return to Shop</button>
            </div>
        </div>
    );
};

export default ThankYou;
