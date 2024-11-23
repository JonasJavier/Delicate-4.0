import React from 'react';
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

export default CartModal;
