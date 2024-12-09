import React from 'react';
import PropTypes from 'prop-types'; 
import { Modal, Button } from 'react-bootstrap';

const CartModal = ({ show, onHide, title, message, onRedirect, redirectLabel }) => {
  return (
    <Modal show={show} onHide={onHide} centered dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        {onRedirect ? (
          <Button variant="primary" onClick={onRedirect}>
            {redirectLabel || 'Go'}
          </Button>
        ) : null}
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Definir los tipos de propiedades esperadas
CartModal.propTypes = {
  show: PropTypes.bool.isRequired, // Propiedad obligatoria
  onHide: PropTypes.func.isRequired, // Propiedad obligatoria
  title: PropTypes.string, // Propiedad opcional
  message: PropTypes.string, // Propiedad opcional
  onRedirect: PropTypes.func, // Propiedad opcional
  redirectLabel: PropTypes.string, // Propiedad opcional
};


CartModal.defaultProps = {
  title: '',
  message: '',
  onRedirect: null,
  redirectLabel: 'Go',
};

export default CartModal;
