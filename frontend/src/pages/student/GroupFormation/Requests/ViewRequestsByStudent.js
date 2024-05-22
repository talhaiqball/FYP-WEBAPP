import React, { useState } from 'react';
import './ViewRequestsByStudent.css';
import { Link } from 'react-router-dom';

const ViewRequestsByStudent = () => {
    // Dummy data for requests (replace with actual data or fetch from API)
    const [requests] = useState([
        { id: 1, title: 'Talha Iqbal', description: ' send you group request', sender: 'Group A' },
        { id: 1, title: 'Talha Iqbal', description: ' send you group request', sender: 'Group A' },
        // Add more requests as needed
    ]);

    const handleViewSender = (sender) => {
        alert(`Viewing group: ${sender}`);
        // Add logic to view the sender group
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className="col-md-9" style={{ zIndex: 0 }} responsive>
                <fieldset className="form-container py-9 fs-6" style={{ width: '50%' }}>
                    <legend style={{ fontWeight: 'bold', paddingTop: '2%' }}>Requests</legend>
                    <hr width="100%"></hr>
                    {/* Displaying requests */}
                    {requests.map(request => (
                        <div className='requestdiv' key={request.id}>
                            
                            <p>{request.title}{request.description}</p>

                            <button className='button-85' onClick={() => handleViewSender(request.sender)}>View Group</button>
                        </div>
                    ))}
                </fieldset>
            </div>
        </div>
    );
}


export default ViewRequestsByStudent;
