import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const PromotionModal = ({ show, onHide, onConfirm, message }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header>
                <Modal.Title>Confirm Promotion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p dangerouslySetInnerHTML={{ __html: message }}></p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onConfirm} style={{ backgroundColor: '#0496FF', borderColor: '#0496FF' }}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PromotionModal;