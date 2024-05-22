import React from 'react';
import { useLocation } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

function ActualEnrolledStudents() {
    const location = useLocation();
    const { eligibleStudents } = location.state || { eligibleStudents: [] };

    console.log('Eligible students passed:', eligibleStudents);

    return (
        <div className='container'>
            <div className="shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row">
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
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Credited</th>
                                    <th>Program</th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: '13px' }}>
                                {eligibleStudents.map((student, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{student.userid}</td>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td>{student.Status}</td>
                                        <td>{student.Credited}</td>
                                        <td>{student.program}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ActualEnrolledStudents;