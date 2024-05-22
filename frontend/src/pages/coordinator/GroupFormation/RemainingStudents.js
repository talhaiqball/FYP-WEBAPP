import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

const RemainingStudents = () => {

    // const [selectedGroup, setSelectedGroup] = useState(null);
    // const [showConfirmation, setShowConfirmation] = useState(false);
    const [unassignedStudents, setUnassignedStudents] = useState([]);

    useEffect(() => {
        // Dummy data for unassigned students
        const dummyUnassignedStudents = [
            {
                rollNo: 20140001,
                name: "John Doe",
                email: "john.doe@example.com",
                program: "BS Software Engineering Fall 2020",
            },
            {
                rollNo: 20140002,
                name: "John Doe",
                email: "john.doe@example.com",
                program: "BS Software Engineering Fall 2020",
            },
            {
                rollNo: 20140003,
                name: "John Doe",
                email: "john.doe@example.com",
                program: "BS Software Engineering Fall 2020",
            }
        ];
        setUnassignedStudents(dummyUnassignedStudents);
    }, []);

    const handleViewStudentDetails = (studentId) => {
        // Handle viewing student details
        // Example: navigate(`/student-details/${studentId}`);
    };

    return (
        <div>
            <div className="row ">
                <div className="col-sm-6 offset-sm-3 mb-4 text-gred text-center">
                    <h2><b>Remaining Students</b></h2>
                </div>
            </div>
            <div className="row">
                <div className="table-responsive " >
                    <Table className='table table-striped table-hover text-center table-sm' style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Roll No</th>
                                <th>Name</th>
                                <th>Program</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '13px' }}>
                            {unassignedStudents.map(student => (
                                <tr key={student.rollNo}>
                                    <td>{student.rollNo}</td>
                                    <td>{student.name}</td>
                                    <td>{student.program}</td>
                                    <td>
                                        <span onClick={() => handleViewStudentDetails(student.id)} style={{ color: '#0496FF', cursor: 'pointer', marginRight: '5px' }}>View Profile</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default RemainingStudents;