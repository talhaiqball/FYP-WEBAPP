import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import AddStudentsFile from '../../../../components/AddStudentsFile/AddStudentsFile';

function ViewAppliedStudents() {
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/viewAppliedStudentList');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const responseData = await response.json();
            console.log("Fetched data:", responseData.data); // Log fetched data
            if (Array.isArray(responseData.data)) {
                setStudentData(responseData.data);
            } else {
                console.error('Data is not an array:', responseData.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleVerify = async () => {
        try {
            navigate('/coordinator/VerifyAppliedStudents', { state: { studentData } });
        } catch (error) {
            console.error('Error navigating:', error);
        }
    };

    return (
        <div className='conatiner'>
            <div className="shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row ">
                    <div className="mb-4 mt-2 text-gred text-center">
                        <h2><b>Applied Students</b></h2>
                    </div>
                </div>
                <AddStudentsFile fetchData={fetchData} />
                <div className="row" style={{ marginLeft: '10px' }}>
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
                        <button type="button" className="btn" style={{ backgroundColor: '#0496FF', color: 'white' }} onClick={handleVerify}>Verify</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewAppliedStudents;