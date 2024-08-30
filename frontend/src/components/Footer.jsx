import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Footer.css';
import logo from '../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h2 className='Logo'>Delicaté</h2>
          </div>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </div>
          <div className="footer-newsletter">
            <h4>Subscribe to our Newsletter</h4>
            <form>
              <input type="email" placeholder="Enter your email" aria-label="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Delicaté. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
