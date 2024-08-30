import React from 'react';
import '../assets/css/ProductCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import strawberryImg from '../assets/images/products/img-2.png';
import lemonImg from '../assets/images/products/img-3.png';
import appleImg from '../assets/images/products/img-4.png';
import berryImg from '../assets/images/products/img-5.png';
import orangeImg from '../assets/images/products/img-6.png';
import grapesImg from '../assets/images/products/img-2.png';
import kiwiImg from '../assets/images/products/img-1.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEye, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const products = [
  { title: 'Strawberry', price: '85$', imgSrc: strawberryImg, className: 'product-1' },
  { title: 'Berry', price: '70$', imgSrc: berryImg, className: 'product-2' },
  { title: 'Lemon', price: '35$', imgSrc: lemonImg, className: 'product-3' },
  { title: 'Apple', price: '50$', imgSrc: appleImg, className: 'product-4' },
  { title: 'Banana', price: '25$', imgSrc: lemonImg, className: 'product-5' },
  { title: 'Orange', price: '40$', imgSrc: orangeImg, className: 'product-6' },
  { title: 'Grapes', price: '65$', imgSrc: grapesImg, className: 'product-7' },
  { title: 'Kiwi', price: '90$', imgSrc: kiwiImg, className: 'product-8' },
];

const ProductCard = ({ onQuickView }) => {
  return (
    <div className="container py-4">
      <h2 className="section-title"> Our <span>Products</span> </h2>
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className={`col-12 col-md-6 col-lg-3 mb-4 ${product.className}`}>
            <div className="card product-card">
              <img src={product.imgSrc} alt={product.title} className="card-img-top" />
              <div className="card-body text-center">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-price">{product.price}</p>
                <button className="btn btn-primary">Add to Cart</button>
                <div className="icon-overlay">
                  <div className="icon-container">
                    <FontAwesomeIcon icon={faHeart} className="icon-heart" />
                    <span className="icon-text">Add to Wishlist</span>
                  </div>
                  <div className="icon-container" onClick={() => onQuickView(product)}>
                    <FontAwesomeIcon icon={faEye} className="icon-eye" />
                    <span className="icon-text">Quick View</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-5">
        <button className="btn btn-primary view-all-btn">
          View All <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
