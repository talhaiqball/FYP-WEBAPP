import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

function VerifyTemporarilyEnrolledStudents() {
    const [studentData, setStudentData] = useState([]);

    useEffect(() => {
        // Fetch student data from a file
        const dummyData = [
            {
                rollNo: 20140001,
                name: "John Doe",
                email: "john.doe@example.com",
                program: "BS Software Engineering Fall 2020",
                eligible: true,
                seOoad: "Yes",
                db: "Yes",
                cgpa3_3_creditHr88: "Yes",
                cgpa3_0_creditHr89: "Yes"
            },
            {
                rollNo: 20140003,
                name: "Jane Smith",
                email: "jane.smith@example.com",
                program: "BS Software Engineering Fall 2020",
                eligible: false,
                seOoad: "No",
                db: "Yes",
                cgpa3_3_creditHr88: "No",
                cgpa3_0_creditHr89: "Yes"
            },
            {
                rollNo: 20140003,
                name: "Jane Smith",
                email: "jane.smith@example.com",
                program: "BS Software Engineering Fall 2020",
                eligible: false,
                seOoad: "No",
                db: "Yes",
                cgpa3_3_creditHr88: "No",
                cgpa3_0_creditHr89: "Yes"
            },
            {
                rollNo: 20140003,
                name: "Jane Smith",
                email: "jane.smith@example.com",
                program: "BS Software Engineering Fall 2020",
                eligible: false,
                seOoad: "No",
                db: "Yes",
                cgpa3_3_creditHr88: "No",
                cgpa3_0_creditHr89: "Yes"
            },
            {
                rollNo: 20140003,
                name: "Jane Smith",
                email: "jane.smith@example.com",
                program: "BS Software Engineering Fall 2020",
                eligible: false,
                seOoad: "No",
                db: "Yes",
                cgpa3_3_creditHr88: "No",
                cgpa3_0_creditHr89: "Yes"
            },
            {
                rollNo: 20140003,
                name: "Jane Smith",
                email: "jane.smith@example.com",
                program: "BS Software Engineering Fall 2020",
                eligible: false,
                seOoad: "No",
                db: "Yes",
                cgpa3_3_creditHr88: "No",
                cgpa3_0_creditHr89: "Yes"
            },
            {
                rollNo: 20140003,
                name: "Jane Smith",
                email: "jane.smith@example.com",
                program: "BS Software Engineering Fall 2020",
                eligible: false,
                seOoad: "No",
                db: "Yes",
                cgpa3_3_creditHr88: "No",
                cgpa3_0_creditHr89: "Yes"
            },
        ];
        setStudentData(dummyData);
    }, []);

    // const handleSubmit = () => {
    //     navigate('/')
    // }Verify Temporarily Enrolled Students

    return (
        <div className='conatiner'>
            <div className="shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row ">
                    <div className="mb-4 mt-2 text-gred text-center">
                        <h2><b>Verify Temporarily Enrolled Students</b></h2>
                    </div>
                </div>
                <div className="row">
                    <div className="table-responsive">
                        <Table className='table table-striped table-hover text-center table-sm'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Roll No</th>
                                    <th>Name</th>
                                    <th>Email ID</th>
                                    <th>Program</th>
                                    <th>Eligible</th>
                                    <th>SE/OOAD</th>
                                    <th>DB</th>
                                    <th>CGPA: 3.3<br />Credit hr: 88</th>
                                    <th>CGPA: 3.0<br />Credit hr: 89</th>
                                    <th>
                                        <label>Select All Eligible</label>
                                        <input type="checkbox" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: '13px' }}>
                                {studentData.map((student, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{student.rollNo}</td>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td>{student.program}</td>
                                        <td>{student.eligible ? "Yes" : "No"}</td>
                                        <td>{student.seOoad}</td>
                                        <td>{student.db}</td>
                                        <td>{student.cgpa3_3_creditHr88}</td>
                                        <td>{student.cgpa3_0_creditHr89}</td>
                                        <td>
                                            <input type="checkbox" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div>
                        <button type="button" className="btn mt-3" style={{ backgroundColor: '#0496FF', color: 'white' }}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerifyTemporarilyEnrolledStudents;
