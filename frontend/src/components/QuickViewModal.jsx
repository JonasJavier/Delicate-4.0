import React from 'react';
import PropTypes from 'prop-types'; 
import { Modal, Button, Row, Col } from 'react-bootstrap';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';

const StyledModal = styled(Modal)`
  .modal-content {
    background-color: ${(props) => (props.theme === 'dark' ? '#1e1e1e' : '#ffffff')};
    color: ${(props) => (props.theme === 'dark' ? '#e0e0e0' : '#000000')};
    border-radius: 10px;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .modal-header {
    border-bottom: ${(props) => (props.theme === 'dark' ? '1px solid #444' : '1px solid #dee2e6')};
  }

  .modal-footer {
    border-top: ${(props) => (props.theme === 'dark' ? '1px solid #444' : '1px solid #dee2e6')};
  }

  .text-primary {
    color: ${(props) => (props.theme === 'dark' ? '#F28123' : '#007bff')} !important;
  }

  .text-success {
    color: ${(props) => (props.theme === 'dark' ? '#44c767' : '#28a745')} !important;
  }

  .text-muted {
    color: ${(props) => (props.theme === 'dark' ? '#cccccc' : '#6c757d')} !important;
  }

  .btn-success {
    background-color: ${(props) => (props.theme === 'dark' ? '#444' : '#28a745')};
    border: none;

    &:hover {
      background-color: ${(props) => (props.theme === 'dark' ? '#F28123' : '#218838')};
    }
  }

  .btn-outline-secondary {
    color: ${(props) => (props.theme === 'dark' ? '#cccccc' : '#6c757d')};
    border-color: ${(props) => (props.theme === 'dark' ? '#444' : '#dee2e6')};

    &:hover {
      background-color: ${(props) => (props.theme === 'dark' ? '#444' : '#e9ecef')};
    }
  }
`;

const StyledImage = styled.img`
  border-radius: 10px;
  max-height: 300px;
  box-shadow: 0 4px 8px ${(props) => (props.theme === 'dark' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.1)')};
`;

const QuickViewModal = ({ product, show, onClose, onAddToCart }) => {
  const { theme } = useTheme();

  if (!product) return null;

  return (
    <StyledModal show={show} onHide={onClose} centered theme={theme}>
      <Modal.Header closeButton>
        <Modal.Title>Quick View: {product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <Zoom>
              <StyledImage
                src={`http://127.0.0.1:8000${product.image}`}
                alt={product.name}
                className="img-fluid"
                theme={theme}
              />
            </Zoom>
          </Col>
          <Col md={6}>
            <h5 className="text-primary">${product.price}</h5>
            <p className="text-success">{product.stock ? 'In Stock' : 'Out of Stock'}</p>
            <p>{product.description || 'No description available for this product.'}</p>
            <div className="d-flex justify-content-start align-items-center gap-2 mt-4">
              <Button
                variant="success"
                onClick={() => {
                  onAddToCart(product.id);
                  onClose();
                }}
              >
                <FontAwesomeIcon icon={faCartPlus} className="me-2" />
                Add to Cart
              </Button>
              <Button variant="outline-secondary" onClick={onClose}>
                Close
              </Button>
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="justify-content-start">
        <p className="text-muted">
          <FontAwesomeIcon icon={faCheckCircle} className="me-2 text-success" />
          View more details on the product page.
        </p>
      </Modal.Footer>
    </StyledModal>
  );
};

// Validación de PropTypes
QuickViewModal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    description: PropTypes.string,
  }).isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default QuickViewModal;
