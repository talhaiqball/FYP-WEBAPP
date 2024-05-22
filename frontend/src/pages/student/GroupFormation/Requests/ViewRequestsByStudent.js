import React, { useContext, useEffect, useState } from 'react';
import './ViewRequestsByStudent.css';
import {  useNavigate } from 'react-router-dom';
import { StudentContext } from '../../../../context/StudentContext';
import axios from 'axios';


const ViewRequestsByStudent = () => {
const [requests, setRequests] = useState([]);
const {userid} = useContext(StudentContext);
const navigate = useNavigate()
console.log(userid)
useEffect(() => {
    const fetchRequests = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/viewGroupInvitesByMember/${userid}`);
            
            if (Array.isArray(response.data.invites)) {
                setRequests(response.data.invites);
            } else {
                console.error('Invalid response format:', response.data);
            }
        } catch (error) {
            console.error('Error fetching pending requests:', error);
        }
    };

    fetchRequests();
    
}, [userid]);

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className="col-md-9" style={{ zIndex: 0 }} responsive>
                <fieldset className="form-container py-9 fs-6" style={{ width: '50%' }}>
                    <legend style={{ fontWeight: 'bold', paddingTop: '2%' }}>Requests</legend>
                    <hr width="100%"></hr>
                    {/* Displaying requests */}
                    {requests.map(request => (
                        <div className='requestdiv' key={request._id}>
                            
                            <p>Invited By {request.leaderid}</p>

                            <button className='button-85' onClick={async()=>{

                                navigate('/student/ViewGroupByStudent', { state: { userid: request.leaderid } });
                            }} >View Group</button>
                        </div>
                    ))}
                </fieldset>
            </div>
        </div>
    );
}


export default ViewRequestsByStudent;
