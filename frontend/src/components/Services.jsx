import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/css/Services.css';

const Services = () => {
    return (
        <div className="container my-5 services-container">
            <div className="text-center mb-4">
                <h2 className="services-title">Our <span>Services</span></h2>
            </div>
            <div className="row">
                {[
                    { icon: 'fas fa-truck', title: 'Delivery Services' },
                    { icon: 'fas fa-exchange-alt', title: 'Shipping & Return' },
                    { icon: 'fas fa-percent', title: 'Promotion' },
                    { icon: 'fas fa-user-clock', title: '24 Hours Service' }
                ].map((service, index) => (
                    <div className="col-md-3 col-sm-6 mb-4" key={index}>
                        <div className="service-card text-center p-4">
                            <i className={`${service.icon} fa-4x mb-3`}></i>
                            <h5>{service.title}</h5>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
