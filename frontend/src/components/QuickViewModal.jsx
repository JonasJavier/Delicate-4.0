// QuickViewModal.jsx
import React from 'react';
import { Modal, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faTwitter, faPinterest, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/ProductDetail.css';

const QuickViewModal = ({ show, handleClose, product }) => {
  if (!product) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <Zoom>
              <img src={product.imgSrc} alt={product.title} className="product-image" />
            </Zoom>
          </Col>
          <Col md={6}>
            <h1 className="product-title">{product.title}</h1>
            <p className="text-success stock-status">In Stock</p>
            <div className="product-price">
              <span className="original-price">$48.00</span>
              <span className="discounted-price">{product.price}</span>
              <span className="discount-percentage">64% Off</span>
            </div>
            <p className="product-description">{product.description}</p>
            <InputGroup className="quantity-selector">
              <Button variant="outline-secondary">-</Button>
              <FormControl aria-label="Quantity" value="1" readOnly className="text-center" />
              <Button variant="outline-secondary">+</Button>
            </InputGroup>
            <div className="action-buttons">
              <Button variant="success" className="add-to-cart-button">Add to Cart</Button>
              <Button variant="outline-secondary" className="wishlist-button">
                <FontAwesomeIcon icon={faHeart} className="wishlist-icon" />
              </Button>
            </div>
            <div className="share-item">
              <span>Share item: </span>
              <FontAwesomeIcon icon={faFacebook} size="2x" />
              <FontAwesomeIcon icon={faTwitter} size="2x" />
              <FontAwesomeIcon icon={faPinterest} size="2x" />
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default QuickViewModal;
