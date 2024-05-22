import React, { useContext, useEffect, useState } from 'react';
import './ViewPendingRequestByLeader.css';
import axios from 'axios';
import { StudentContext } from '../../../../context/StudentContext';

const ViewPendingRequestByLeader = () => {
    const { userid } = useContext(StudentContext);
    const [pendingRequests, setPendingRequests] = useState([]);

    useEffect(() => {
        const fetchPendingRequests = async () => {
            try {
                console.log("No pending req found");
                const response = await axios.get(`http://localhost:3001/viewGroupInvitesByLeader/${userid}`);
                console.log("No pending req found");
                if (Array.isArray(response.data.invites)) {
                    setPendingRequests(response.data.invites);
                } else {
                    console.error('Invalid response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching pending requests:', error);
            }
        };

        fetchPendingRequests();
    }, [userid]);

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className="col-md-9" style={{ zIndex: 0 }} responsive>
                <fieldset className="form-container py-9 fs-6" style={{ width: '50%' }}>
                    <legend style={{ fontWeight: 'bold', paddingTop: '2%' }}>Pending Requests</legend>
                    <hr width="100%"></hr>
                    {/* Displaying pending requests */}
                    {pendingRequests.map(request => (
                        <div className='requestdiv' key={request.id}>
                            <p>{request.memberid}</p>
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
