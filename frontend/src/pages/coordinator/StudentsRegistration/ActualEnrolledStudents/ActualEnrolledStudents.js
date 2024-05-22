import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ActualEnrolledStudents() {
    const navigate = useNavigate();
    const location = useLocation;
    const [studentData, setStudentData] = useState(location.state?.eligibleStudents || []);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/verifyAppliedStudentList');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const responseData = await response.json();
            if (Array.isArray(responseData.data)) {
                setStudentData(responseData.data);
            } else {
                console.error('Data is not an array:', responseData.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:3001/registerEligibleStudents');
            if (response.status === 200) {
                // If registration is successful, update the student data
                setStudentData(response.data);
                // Optionally, navigate to a different page or show a success message
                navigate('/successPage');
            } else {
                console.error('Failed to register students:', response.statusText);
            }
        } catch (error) {
            console.error('Error registering students:', error);
        }
    };

    return (
        <div className='container'>
            <div className="shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row ">
                    <div className="mb-4 mt-2 text-gred text-center">
                        <h2><b>Actual Enrolled Students</b></h2>
                    </div>
                </div>
                <div className="row">
                    <div className="table-responsive">
                        <Table className='table table-striped table-hover text-center table-sm' style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Roll No</th>
                                    <th>Name</th>
                                    <th>Enrollment Date</th>
                                    <th>Status</th>
                                    <th>Credited</th>
                                    <th>Entry Date</th>
                                    <th>Program</th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: '13px' }}>
                                {studentData.map((student, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{student['Roll No.']}</td>
                                        <td>{student.Name}</td>
                                        <td>{student['Enrollment Date']}</td>
                                        <td>{student.Status}</td>
                                        <td>{student.Credited}</td>
                                        <td>{student['Entry Date']}</td>
                                        <td>{student.Program}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div>
                        <button type="button" className="btn mt-3" style={{ backgroundColor: '#0496FF', color: 'white' }} onClick={handleRegister}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActualEnrolledStudents;