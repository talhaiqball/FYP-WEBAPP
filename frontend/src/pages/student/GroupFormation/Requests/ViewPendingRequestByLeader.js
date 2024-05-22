import React, { useState } from 'react';
import './ViewPendingRequestByLeader.css';

const ViewPendingRequestByLeader = () => {
    // Dummy data for pending requests (replace with actual data or fetch from API)
    const [pendingRequests] = useState([
        { id: 1, sender: 'Group A', status: 'Pending' },
        { id: 2, sender: 'Group B', status: 'Accepted' },
        // Add more pending requests as needed
    ]);

    const handleViewSender = (sender) => {
        alert(`Viewing group: ${sender}`);
        // Add logic to view the sender group
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className="col-md-9" style={{ zIndex: 0 }} responsive>
                <fieldset className="form-container py-9 fs-6" style={{ width: '50%' }}>
                    <legend style={{ fontWeight: 'bold', paddingTop: '2%' }}>Pending Requests</legend>
                    <hr width="100%"></hr>
                    {/* Displaying pending requests */}
                    {pendingRequests.map(request => (
                        <div className='requestdiv' key={request.id}>
                            <p>{request.sender}</p>
                            <div className='status'>
                                <p>{request.status}</p>
                            </div>
                        </div>
                    ))}
                    {/* If there are no pending requests */}
                    {pendingRequests.length === 0 && (
                        <p>No pending requests</p>
                    )}
                </fieldset>
            </div>
        </div>
    );
}


export default ViewPendingRequestByLeader;
