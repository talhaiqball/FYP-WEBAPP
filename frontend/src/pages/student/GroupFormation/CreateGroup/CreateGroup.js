import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StudentContext } from '../../../../context/StudentContext';
import axios from 'axios';

const CreateGroup = ({ show, onHide }) => {

    const navigate = useNavigate()
    const {userid} = useContext(StudentContext)
    const handleGroupCreation = async () => {
        console.log('Group creation initiated');
        try {
            const result = await axios.post('http://localhost:3001/createGroup', { userid });
         
        } catch (error) {
            // Handle error scenario
            console.error('Error creating group:', error);
            navigate('/student/ViewGroupByLeader');
        }
    }
    

    return (
        <div>
            {show &&
                <div className="modal-backdrop fade show"></div>
            }
            <div className={`modal fade ${show ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-danger text-white">
                            <h5 className="modal-title">Attention!</h5>
                        </div>
                        <div className="modal-body">
                            <p><strong>If you create a group:</strong></p>
                            <ul>
                                <li>No other group will be able to invite you to their group.</li>
                                <li>You will be responsible for all the submissions.</li>
                                <li>You will be the group leader.</li>
                            </ul>
                            <p>Click “Proceed” to continue or “Cancel” to go back.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onHide}>Cancel</button>
                            <button onClick={()=>handleGroupCreation()} className="btn btn-danger">Proceed</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateGroup;
