import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const AddPanelMember = ({ show, onHide, onConfirm }) => {
    const [userid, setUserid] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/addPanelMember', { userid, name, email });
            onHide();
            setUserid('');
            setName('');
            setEmail('');
            if (onConfirm) {
                onConfirm();
                console.log("Successfully Added")
            }
        } catch (error) {
            console.error('Error adding Panel Member:', error);
        }
    };

    return (
        <Modal centered show={show} onHide={onHide} backdrop="static" keyboard={false}>
            <Modal.Header>
                <Modal.Title>Add Panel Member</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="userid">User ID</label>
                        <input type="text" className="form-control" id="userid" value={userid} onChange={(e) => setUserid(e.target.value)} />
                    </div>
                    <div className="form-group pt-3">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group pt-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="d-inline mt-3">
                        <Button className="mt-3" variant="secondary" onClick={onHide}>
                            Cancel
                        </Button>
                        <Button className="mt-3" type="submit" variant="primary" style={{ backgroundColor: '#0496FF', borderColor: '#0496FF', marginLeft: '10px' }}>
                            Add
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default AddPanelMember;