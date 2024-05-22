import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteGroup = ({ show, onHide, onConfirm, message }) => {
    return (
        <Modal centered show={show} onHide={onHide} backdrop="static" keyboard={false}>
            <Modal.Header>
                <Modal.Title>Delete Group?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div dangerouslySetInnerHTML={{ __html: message }} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteGroup;
